import React from 'react';
import PropTypes from 'prop-types';
import {toRomaji} from 'wanakana';


// Class Component
class Cell extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    render() {
        const {extraClassName, cellData} = this.props;
        const {character, meaning, kunyomi, onyomi} = cellData;
        return <div className="wordCellLinkContainer">
            <a href={this.getWaniKaniLink()} target={"_blank"}>
                <div  className={`wordCell ${extraClassName}`}>
                    <div className="mainLabel">{this.getMainLabel()}</div>
                    {meaning && <div className="meaning">{meaning}</div>}
                    {kunyomi && <div className="meaning">{kunyomi} - {toRomaji(kunyomi)}</div>}
                    {onyomi && <div className="meaning">{onyomi} - {toRomaji(onyomi)}</div>}
                </div>
            </a>
        </div>
    }

    /**
     * Get the main label for the Cell
     * @returns {Element} - React Element for the Main label of the cell
     */
    getMainLabel () {
        return <div className={"cellLabel"}>{this.getMainLabelContent()}</div>;
    }

    /**
     * Returns the link to wankani given an item
     * Override this in the subclass
     * @returns {string}
     */
    getWaniKaniLink () {
        const {cellData} = this.props;
        const {character, meaning} = cellData;

        return "/Override/in/subclass";
    }

    /**
     * Returns the main content for the label (no styling)
     * @returns {*}
     */
    getMainLabelContent () {
        const {cellData} = this.props;
        const {character, meaning} = cellData;
        const label = character || meaning; // If for some reason there is no character, show the meaning instead
        return <span>{label}</span>
    }
}



Cell.propTypes = {
    extraClassName: PropTypes.string.isRequired, // Extra CSS class
    cellData: PropTypes.object,
    kuroshiro: PropTypes.object
};

export default Cell;
