import React from 'react';
import PropTypes from "prop-types";
import {Button, Jumbotron} from "reactstrap";
import copyToClipboard from 'copy-to-clipboard';

class WelcomeHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            profileCopied: false
        };
        this.onCopyProfileUrlClick = this.onCopyProfileUrlClick.bind(this);

    }
    /**
     * Called when the button "Copy profile URL" is clicked
     * @param e
     */
    onCopyProfileUrlClick(e){
        const url = window.location.toString();
        copyToClipboard(url);
        this.setState({
            profileCopied: true
        })
    }

    render() {
        let usernameLabel = "";
        let imagePortion = "";

        if(this.props.radicalsLoaded){
            const {user_information} = this.props.radicalsData;
            const {username, gravatar} = user_information;
            usernameLabel = username + "'s";
            // No pics for now
            // if(gravatar){
            //     const url = `https://www.gravatar.com/avatar/${gravatar}`;
            //     imagePortion = <img src={url}></img>
            // }
        }
        usernameLabel = usernameLabel || "Your";


        return <div className={"welcomeHeader"}>
            <Jumbotron>
                <h1 className="display-3"><strong>{usernameLabel}</strong> WaniKani Learning Progress</h1>{imagePortion}
                <Button color="primary" onClick={this.onCopyProfileUrlClick}>Copy Profile URL</Button>
                {
                    this.state.profileCopied &&
                    <span className={"ml-2"}>A link to this page has been copied!</span>
                }
            </Jumbotron>
        </div>
    }
}
WelcomeHeader.defaultProps = {
    extraClassName: "",
};

WelcomeHeader.propTypes = {
    apiKey: PropTypes.string,
    radicalsData: PropTypes.object.isRequired,
    radicalsLoaded: PropTypes.bool.isRequired,
    kanjiLoaded: PropTypes.object.isRequired,
    kanjiData: PropTypes.bool.isRequired,
    vocabularyData: PropTypes.object.isRequired,
    vocabularyLoaded: PropTypes.bool.isRequired,
};

export default WelcomeHeader;
