import React from 'react';
import CellGrid from "../widgets/CellGrid";
import PropTypes from "prop-types";

class Kanji extends CellGrid {
    constructor (props) {
        super(props);
    }
}

Kanji.defaultProps = {
    topLabel: "Kanji",
    extraClassName: "kanjiContainer",
    cellClassName: "kanjiCell",
    groupedByLabel: "Level",
    getArrayPath :  ((data) => data.requested_information)
};

Kanji.propTypes = {
    itemArray: PropTypes.object.isRequired, // The list of items to render
    groupFunction: PropTypes.func // The function to group things by
};

export default Kanji;
