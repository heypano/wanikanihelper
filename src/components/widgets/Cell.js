import React from 'react';
import PropTypes from 'prop-types';

// Class Component
class Cell extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        const {extraClassName} = this.props;
        return <div  className={`wordCell ${extraClassName}`}>
            {this.getMainLabel()}
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
    cellData: PropTypes.object
};

export default Cell;
