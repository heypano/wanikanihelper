import React from 'react';
import Checkbox from "../Checkbox";
import PropTypes from "prop-types";

// Base Class for all filter checkboxes

class FilterCheckbox extends Checkbox {
    constructor (props) {
        super(props);
    }
    /**
     * Handles the onChange event (override from Checkbox)
     * @param {boolean} newValue
     */
    onChange(newValue){
        const name = this.props.name || "A checkbox is no-one.";
        const {onFilterChange, filterMethodOn, filterMethodOff} = this.props;
        const filterMethod = newValue ? filterMethodOn : filterMethodOff;
        // Now call the onFilterChange from props however you want
        onFilterChange(name, newValue, filterMethod);
    }
}

FilterCheckbox.defaultProps = {
    label: "A filter checkbox is no-one."
};

FilterCheckbox.propTypes = {
    filterMethodOn: PropTypes.func.isRequired,
    filterMethodOff: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    label: PropTypes.string
};

export default FilterCheckbox;
