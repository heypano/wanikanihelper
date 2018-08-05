import React from 'react';
import CellGrid from "../widgets/CellGrid";
import PropTypes from "prop-types";

class Radicals extends CellGrid {
    constructor (props) {
        super(props);
    }
}

Radicals.defaultProps = {
    topLabel: "Radicals",
    extraClassName: "radicalContainer",
    cellClassName: "radicalCell",
    groupedByLabel: "Level",
    getArrayPath :  ((data) => data.requested_information)
};

Radicals.propTypes = {
    itemArray: PropTypes.object.isRequired, // The list of items to render
    groupFunction: PropTypes.func // The function to group things by
};

export default Radicals;
