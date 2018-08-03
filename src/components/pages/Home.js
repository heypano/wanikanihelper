import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import {Link} from "react-router-dom";
import APIKeyInput from "../inputs/APIKeyInput";
import {isApiKey} from "../../util/apiKey";
import Radicals from "./Radicals";
import Kanjis from "./Kanji";
import Vocabulary from "./Vocabulary";
import copy from 'copy-to-clipboard';

class Home extends React.Component {
    constructor(props) {
        const {match: {params}} = props;
        const apiKey = params ? params.apiKey : null;

        super(props);

        this.bindMethods();

        this.state = {
            apiKey: apiKey,
            profileCopied: false // To track whether the profile copy button has been clicked
        };
    }

    componentDidMount () {
        this.updateAPIKeyStuff();
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
    updateAPIKeyStuff(apiKey){
        if(isApiKey(apiKey)){
            // Change the URL
            this.props.history.push(`/profile/${apiKey}`);
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
     * Render the component based on the state and props (will be called every time state changes with setState)
     * @returns {*}
     */
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Pano&apos;s WaniKani helper!</h1>
                    <p className="lead">This is a very simple helper for <a href="https://www.wanikani.com/">WaniKani</a>. At least for now.</p>
                    <hr className="my-2"/>
                    <p>The goal is to show what <strong>Radicals</strong>, <strong>Kanji</strong> and <strong>Vocabulary</strong> you have learned and be able to share that with the world.</p>
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
                {this.hasAPIKey() &&
                    <div>
                        <Radicals apiKey={this.state.apiKey} />
                        <Kanjis apiKey={this.state.apiKey} />
                        <Vocabulary apiKey={this.state.apiKey} />
                    </div>
                }
            </div>
        );
    }
}

export default Home;
