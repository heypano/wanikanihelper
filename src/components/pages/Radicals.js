import React from 'react';
import CellGrid from "../widgets/CellGrid";
import PropTypes from "prop-types";
import {meaningCorrectAtLeastOnce} from "../../util/filters";
import RadicalCell from "../widgets/RadicalCell";

class Radicals extends CellGrid {
    constructor (props) {
        super(props);
    }
}

Radicals.defaultProps = {
    topLabel: "Radicals",
    extraClassName: "radicalContainer",
    groupedByLabel: "Level",
    filterFunction: meaningCorrectAtLeastOnce,
    getArrayPath :  ((data) => data.requested_information),
    cellClass: RadicalCell
};

Radicals.propTypes = {
    itemArray: PropTypes.object.isRequired, // The list of items to render
    groupFunction: PropTypes.func // The function to group things by
};

export default Radicals;
