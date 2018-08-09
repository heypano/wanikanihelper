import React from 'react';
import PropTypes from "prop-types";
import {Button, Jumbotron} from "reactstrap";

class WelcomeHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            profileCopied: false
        };

    }
    render() {
        return <div className={"welcomeHeader"}>
            <Jumbotron>
                <h1 className="display-3">Your Profile</h1>
                {/* Show stuff only if we have an API key */}
                <div>
                    <Button color="primary" onClick={this.onCopyProfileUrlClick}>Copy Profile URL</Button>
                    {
                        this.state.profileCopied &&
                        <span className={"ml-2"}>A link to this page has been copied!</span>
                    }
                </div>
            </Jumbotron>
        </div>
    }
}

WelcomeHeader.defaultProps = {
    extraClassName: "",
};

WelcomeHeader.propTypes = {
    onAPIKeySet: PropTypes.func.isRequired,
};

export default WelcomeHeader;
