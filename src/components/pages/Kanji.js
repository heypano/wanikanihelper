import React from 'react';
import CellGrid from "../widgets/CellGrid";
import PropTypes from "prop-types";
import {meaningCorrectAtLeastOnce} from "../../util/filters";
import KanjiCell from "../widgets/KanjiCell";

class Kanji extends CellGrid {
    constructor (props) {
        super(props);
    }
}

Kanji.defaultProps = {
    topLabel: "Kanji",
    extraClassName: "kanjiContainer",
    groupedByLabel: "Level",
    filterFunction: meaningCorrectAtLeastOnce,
    getArrayPath :  ((data) => data.requested_information),
    cellClass: KanjiCell
};

Kanji.propTypes = {
    itemArray: PropTypes.object.isRequired, // The list of items to render
    groupFunction: PropTypes.func // The function to group things by
};

export default Kanji;
