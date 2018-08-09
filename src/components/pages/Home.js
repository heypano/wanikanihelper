import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import {Link} from "react-router-dom";
import APIKeyInput from "../inputs/APIKeyInput";
import {isApiKey} from "../../util/apiKey";
import Radicals from "./Radicals";
import Kanji from "./Kanji";
import Vocabulary from "./Vocabulary";
import copy from 'copy-to-clipboard';
import {decodeApiKeyFromUrlParam, encodeApiKeyForUrl, defaultErrorHandler} from "../../api/util";
import {getRadicals} from "../../api/radicals";
import {getVocabulary} from "../../api/vocabulary";
import {getKanji} from "../../api/kanji";
import CellGrid from "../widgets/CellGrid";

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
        this.onCopyProfileUrlClick = this.onCopyProfileUrlClick.bind(this);
    }

    /**
     * Called when the button "Copy profile URL" is clicked
     * @param e
     */
    onCopyProfileUrlClick(e){
        const url = window.location.toString();
        copy(url);
        this.setState({
            profileCopied: true
        })
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

    /**
     * Render the component based on the state and props (will be called every time state changes with setState)
     * @returns {*}
     */
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Share your Progress on WaniKani</h1>
                    <hr className="my-2"/>
                    <p>
                        The goal of this app is to show you what <strong>Radicals</strong>, <strong>Kanji</strong> and <strong>Vocabulary</strong> you have learned on <a href="https://www.wanikani.com/" target={"_blank"}>WaniKani</a>, and to allow you to simply share this progress with a link.
                    </p>
                    <p>
                        This app was made by <a href="https://www.heypano.com/" target={"_blank"}>Pano Papadatos</a> and is open source
                        (<a href="https://github.com/heypano/wanikanihelper" target={"_blank"}>Source here</a>)
                    </p>
                    <APIKeyInput apiKey={this.state.apiKey} onAPIKeySet={this.onAPIKeySet}/>
                    {/* Show stuff only if we have an API key */}
                    {this.hasAPIKey() &&
                        <div>
                            <Button color="primary" onClick={this.onCopyProfileUrlClick}>Copy Profile URL</Button>
                            {
                                this.state.profileCopied &&
                                <span className={"ml-2"}>A link to this page has been copied!</span>
                            }
                        </div>
                    }

                </Jumbotron>
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
