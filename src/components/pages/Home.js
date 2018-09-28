import React from 'react';
import {isApiKey} from "../../util/apiKey";
import Radicals from "./Radicals";
import Kanji from "./Kanji";
import Vocabulary from "./Vocabulary";
import {decodeApiKeyFromUrlParam, encodeApiKeyForUrl, defaultErrorHandler} from "../../api/util";
import {getRadicals} from "../../api/radicals";
import {getVocabulary} from "../../api/vocabulary";
import {getKanji} from "../../api/kanji";
import ProfileHeader from "../widgets/ProfileHeader";
import WelcomeHeader from "../widgets/WelcomeHeader";
import {defaultFiltersConfig, getCombinedFilterFunction} from "../../util/filters";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Kuroshiro from 'kuroshiro';
// import 'node_modules/kuromoji/dict/base.dat.gz';
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import Parser from "html-react-parser";
import DOMPurify from "dompurify";

class Home extends React.Component{
    constructor(props) {
        const {match: {params}} = props;
        const apiKey = params ? decodeApiKeyFromUrlParam(params.apiKey) : null; // API key from URL

        super(props);


        this.bindMethods();

        this.state = {
            apiKey: apiKey,
            profileCopied: false, // To track whether the profile copy button has been clicked
            dataLoaded: false, // Has the data finished loading (radicals + kanji + vocabulary)
            radicalsLoaded: false, // Have the radicals loaded (WK API call)
            radicalsData: null, // The response from the radicals API call
            kanjiLoaded: false, // Have the kanji loaded (WK API call)
            kanjiData: null, // The response from the kanji API call
            vocabularyLoaded: false, // Has the vocabulary loaded (WK API call)
            vocabularyData: null, // The response from the vocabulary API call
            kuroshiro: null,
            filters: defaultFiltersConfig(),
            activeTab: 'Vocabulary'
        };
        this.initKuroshiro();
    }

    async initKuroshiro(){
        const kuroshiro = new Kuroshiro();
        await kuroshiro.init(new KuromojiAnalyzer());
        this.setState({
            kuroshiro: kuroshiro
        });
    }

    componentDidMount () {
        this.updateAPIKeyStuff();
    }

    /**
     * Perform the required API calls
     * @param {string} apiKey
     */
    loadData (apiKey) {
        this.callGetRadicalsService(apiKey);
        this.callGetKanjiService(apiKey);
        this.callGetVocabularyService(apiKey);
    }

    /**
     * Call the service to get the radicals for this user
     * @param {string} apiKey
     */
    callGetRadicalsService(apiKey) {
        getRadicals(apiKey).then(response => {
            this.setState({
                radicalsLoaded: true,
                radicalsData: response
            });
        }).then(defaultErrorHandler);
    }

    /**
     * Call the service to get the kanji for this user
     * @param {string} apiKey
     */
    callGetKanjiService(apiKey) {
        getKanji(apiKey).then(response => {
            this.setState({
                kanjiLoaded: true,
                kanjiData: response
            });
        }).then(defaultErrorHandler);
    }

    /**
     * Call the service to get the vocabulary for this user
     * @param {string} apiKey
     */
    callGetVocabularyService(apiKey) {
        getVocabulary(apiKey).then(response => {
            this.setState({
                vocabularyLoaded: true,
                vocabularyData: response
            });

            // Asynchronously update the data to include the furigana
            this.loadAllFurigana();
        }).then(defaultErrorHandler);
    }

    async loadAllFurigana(){
        const {kuroshiro} = this.state;
        if(kuroshiro){
            let vocData = Object.assign({}, this.state.vocabularyData);
            let items = vocData.requested_information.general;
            vocData.requested_information.general = await this.getFuriganaedItems(items);
            this.setState({
                vocabularyData: vocData
            });
        } else {
            setTimeout(this.loadAllFurigana, 500);
        }
    }

    async getFuriganaedItems(items){
        let newItems = [];
        for(let i=0; i<items.length; i++){
            const newItem = Object.assign({}, items[i])
            newItem.withFurigana = await this.getFurigana(newItem)
            newItems.push(newItem)
        }
        return newItems;
    }

    async getFurigana(item) {
        const {kuroshiro} = this.state;
        const {character} = item;
        let result = character;
        if(kuroshiro) {
            const furigana = await kuroshiro.convert(character, {
                to: "hiragana",
                mode: "furigana"
            });
            result = DOMPurify.sanitize(furigana);
        }

        return result;
    }

    /**
     * Has all the data loaded
     * @returns {boolean}
     */
    haveAllData(){
        return this.state.radicalsLoaded && this.state.kanjiLoaded && this.state.vocabularyLoaded;
    }

    /**
     * Bind the various handlers to make sure they are attached to this class
     */
    bindMethods() {
        this.onAPIKeySet = this.onAPIKeySet.bind(this);
        this.onFiltersChanged = this.onFiltersChanged.bind(this);
        this.toggleSelectedItems = this.toggleSelectedItems.bind(this);
        this.loadAllFurigana = this.loadAllFurigana.bind(this);
    }


    /**
     * Called by the child component APIKeyInput when the API key is successfully set.
     * @param apiKey
     */
    onAPIKeySet(apiKey){
        this.setState((prevState, props) => {
            this.updateAPIKeyStuff(apiKey);
            return {
                apiKey: apiKey
            };
        })
    }

    /**
     * Called to update whatever needs to be updated when the API key is set correctly
     * @param apiKey
     */
    updateAPIKeyStuff(apiKey = this.state.apiKey){
        if(isApiKey(apiKey)){
            const newPath = `/profile/${encodeApiKeyForUrl(apiKey)}`;
            const oldPath = this.props.history.location.pathname;

            if(oldPath !== newPath){
                // Change the URL
                this.props.history.push(`/profile/${encodeApiKeyForUrl(apiKey)}`);
            }
            // Call the services to fetch the data
            this.loadData(apiKey);
        }
    }

    /**
     * Returns whether or not we have an API key
     * @returns {boolean}
     */
    hasAPIKey() {
        return isApiKey(this.state.apiKey);
    }

    /**
     * Function to group all items - will be expanded to allow for other groupings later
     * @param {object} item
     */
    groupFunction (item) {
        return item.level;
    }

    /**
     * Called when the filters change
     * @param filters
     */
    onFiltersChanged(filters){
        this.setState({
            filters: filters
        });
    }

    /**
     * Returns the rendered header
     * @returns {*}
     */
    getHeader (){
        let {apiKey, kanjiLoaded, kanjiData, radicalsLoaded, radicalsData, vocabularyLoaded, vocabularyData} = this.state;
        kanjiData = kanjiData || {};
        radicalsData = radicalsData || {};
        vocabularyData = vocabularyData || {};
        return <div className={"homeHeader"}>
            {this.hasAPIKey() &&
                <ProfileHeader
                    apiKey={apiKey}
                    kanjiData={kanjiData}
                    kanjiLoaded={kanjiLoaded}
                    radicalsLoaded={radicalsLoaded}
                    radicalsData={radicalsData}
                    vocabularyLoaded={vocabularyLoaded}
                    vocabularyData={vocabularyData}
                    onFiltersChanged={this.onFiltersChanged}
                    filters={this.state.filters}
                ></ProfileHeader>
            }
            { !this.hasAPIKey() &&
                <WelcomeHeader onAPIKeySet={this.onAPIKeySet}></WelcomeHeader>
            }
        </div>
    }

    /**
     * Called when a user switched between Radicals / Kanji / Vocabulary
     * @param tab
     */
    toggleSelectedItems (tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    /**
     * Render the component based on the state and props (will be called every time state changes with setState)
     * @returns {*}
     */
    render() {
        let filterFunction = getCombinedFilterFunction(this.state.filters);
        return (
            <div className="pageContent">
                {this.getHeader()}
                {/* Show stuff only if we have an API key */}
                {this.haveAllData() &&
                    <div className="profileContent">
                        <Nav tabs className="navTabs">
                            <NavItem>
                                <NavLink
                                    className={(this.state.activeTab === 'Kanji') ? "active" : ""}
                                    onClick={() => { this.toggleSelectedItems('Kanji'); }}
                                >
                                    Kanji
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={(this.state.activeTab === 'Vocabulary') ? "active" : ""}
                                    onClick={() => { this.toggleSelectedItems('Vocabulary'); }}
                                >
                                    Vocabulary
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={(this.state.activeTab === 'Radicals') ? "active" : ""}
                                    onClick={() => { this.toggleSelectedItems('Radicals'); }}
                                >
                                    Radicals
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <div className="jumbotron tabContent">
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="Kanji">
                                    <Row>
                                        <Col>
                                            <Kanji itemArray={this.state.kanjiData}
                                                   kuroshiro={this.state.kuroshiro}
                                                   filterFunction={filterFunction}
                                                   groupFunction={this.groupFunction}
                                            />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="Vocabulary">
                                    <Row>
                                        <Col>
                                            <Vocabulary itemArray={this.state.vocabularyData}
                                                        kuroshiro={this.state.kuroshiro}
                                                        filterFunction={filterFunction}
                                                        groupFunction={this.groupFunction}
                                            />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="Radicals">
                                    <Row>
                                        <Col>
                                            <Radicals itemArray={this.state.radicalsData}
                                                      kuroshiro={this.state.kuroshiro}
                                                      filterFunction={filterFunction}
                                                      groupFunction={this.groupFunction}
                                            />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>

                }
            </div>
        );
    }
}

export default Home;
