import React from 'react';
import PropTypes from "prop-types";
import {Button, Jumbotron} from "reactstrap";
import copyToClipboard from 'copy-to-clipboard';
import FilterPane from "./FilterPane";

class ProfileHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            profileCopied: false,
            filters: props.filters
        };
        this.bindMethods();

    }

    bindMethods(){
        this.onCopyProfileUrlClick = this.onCopyProfileUrlClick.bind(this);
        this.onFiltersChanged = this.onFiltersChanged.bind(this);
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

    /**
     * Called by the filter pane when the filters change
     * @param filters
     */
    onFiltersChanged(filters){
        const {onFiltersChanged} = this.props;
        this.setState({
            filters: filters
        }, function () {
            // Call onFiltersChanged from props (for the home module to deal with it)
            onFiltersChanged(this.state.filters);
        });
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


        return <div className={"profileHeader"}>
            <Jumbotron>
                <h1 className="display-3"><strong>{usernameLabel}</strong> WaniKani Learning Progress</h1>{imagePortion}
                <Button color="primary" onClick={this.onCopyProfileUrlClick}>Copy Profile URL</Button>
                {
                    this.state.profileCopied &&
                    <span className={"ml-2"}>A link to this page has been copied!</span>
                }
                <FilterPane onFiltersChanged={this.onFiltersChanged} filters={this.props.filters}/>
            </Jumbotron>
        </div>
    }
}
ProfileHeader.defaultProps = {
    extraClassName: "",
};

ProfileHeader.propTypes = {
    apiKey: PropTypes.string,
    radicalsLoaded: PropTypes.bool.isRequired,
    radicalsData: PropTypes.object.isRequired,
    kanjiLoaded: PropTypes.bool.isRequired,
    kanjiData: PropTypes.object.isRequired,
    vocabularyLoaded: PropTypes.bool.isRequired,
    vocabularyData: PropTypes.object.isRequired,
    onFiltersChanged: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired // Default filters in props
};

export default ProfileHeader;
