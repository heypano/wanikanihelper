import React from 'react';
import PropTypes from 'prop-types';
import {toRomaji} from 'wanakana';
import Highlight from 'react-highlighter';

// Class Component
class Cell extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            searchExpression: null,
            cellPressed: false
        };
        this.onCellClick = this.onCellClick.bind(this);
    }
    onCellClick (e) {
        e.preventDefault(); // Don't use wanikani link
        const oppositeState = !this.state.cellPressed;
        this.setState({
            cellPressed: oppositeState
        });
    }
    render() {
        const {extraClassName, cellData} = this.props;
        const {character, meaning, kunyomi, onyomi} = cellData;
        const {cellPressed} = this.state;
        const pressedCssClass = cellPressed ? "cellPressed" : "";

        return <div className={`wordCell ${extraClassName} ${pressedCssClass} hvr-float`} onClick={this.onCellClick}>
                    <div className="mainLabel">{this.getMainLabel()}</div>
                    {cellPressed && meaning && <Highlight search={this.state.searchExpression} ignoreDiacritics={true} className="meaning">{meaning}</Highlight>}
                    {cellPressed && kunyomi && <Highlight search={this.state.searchExpression} ignoreDiacritics={true} className="meaning">{kunyomi} - {toRomaji(kunyomi)}</Highlight>}
                    {cellPressed && onyomi && <Highlight search={this.state.searchExpression} ignoreDiacritics={true} className="meaning">{onyomi} - {toRomaji(onyomi)}</Highlight>}
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
