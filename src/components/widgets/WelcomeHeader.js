import React from 'react';
import PropTypes from "prop-types";
import {Button, Jumbotron} from "reactstrap";
import APIKeyInput from "../inputs/APIKeyInput";

class WelcomeHeader extends React.Component {
    constructor(props) {
        const {apiKey} = props;
        super(props);
        this.state = {
            profileCopied: false,
            apiKey: apiKey,
        };
    }
    render() {
        return <div className={"welcomeHeader"}>
            <Jumbotron>
                <h1 className="display-3">WaniKani Profile Share</h1>
                <hr className="my-2"/>
                <p>
                    The goal of this app is to allow you to share with others which <strong>Radicals</strong>, <strong>Kanji</strong> and <strong>Vocabulary</strong> you have learned on
                    <a href="https://www.wanikani.com/" target={"_blank"}>WaniKani</a>.
                </p>
                <p>
                    This app was made by <a href="https://www.heypano.com/" target={"_blank"}>Pano Papadatos</a> and is open source
                    (<a href="https://github.com/heypano/wanikanihelper" target={"_blank"}>Source here</a>)
                </p>

                {/* Show stuff only if we have an API key */}
                <APIKeyInput onAPIKeySet={this.props.onAPIKeySet}/>
            </Jumbotron>
        </div>
    }
}

WelcomeHeader.propTypes = {
    onAPIKeySet: PropTypes.func.isRequired
};

export default WelcomeHeader;
