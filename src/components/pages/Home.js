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

class Home extends React.Component {
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
        };
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
        }).then(defaultErrorHandler);
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
            // Change the URL
            this.props.history.push(`/profile/${encodeApiKeyForUrl(apiKey)}`);
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

    getHeader (){
        return <div className={"homeHeader"}>
            {this.hasAPIKey() &&
                <ProfileHeader
                    apiKey={this.state.apiKey}
                    kanjiData={this.state.kanjiData}
                    kanjiLoaded={this.state.kanjiLoaded}
                    radicalsLoaded={this.state.radicalsLoaded}
                    radicalsData={this.state.radicalsData}
                    vocabularyLoaded={this.state.vocabularyLoaded}
                    vocabularyData={this.state.vocabularyData}
                ></ProfileHeader>
            }
            { !this.hasAPIKey() &&
                <WelcomeHeader onAPIKeySet={this.onAPIKeySet}></WelcomeHeader>
            }
        </div>
    }

    /**
     * Render the component based on the state and props (will be called every time state changes with setState)
     * @returns {*}
     */
    render() {
        return (
            <div>
                {this.getHeader()}
                {/* Show stuff only if we have an API key */}
                {this.haveAllData() &&
                    <div>
                        <Radicals itemArray={this.state.radicalsData}
                                  groupFunction={this.groupFunction}
                        />
                        <Kanji itemArray={this.state.kanjiData}
                               groupFunction={this.groupFunction}
                        />
                        <Vocabulary itemArray={this.state.vocabularyData}
                                    groupFunction={this.groupFunction}
                        />
                    </div>

                }
            </div>
        );
    }
}

export default Home;
