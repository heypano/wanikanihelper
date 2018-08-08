import React from 'react';
import CellGrid from "../widgets/CellGrid";
import PropTypes from "prop-types";
import {meaningCorrectAtLeastOnce} from "../../util/filters";
import VocabularyCell from "../widgets/VocabularyCell";

class Vocabulary extends CellGrid {
    constructor (props) {
        super(props);
    }
}

Vocabulary.defaultProps = {
    topLabel: "Vocabulary",
    extraClassName: "vocabularyContainer",
    groupedByLabel: "Level",
    filterFunction: meaningCorrectAtLeastOnce,
    getArrayPath :  ((data) => data.requested_information.general),
    cellClass: VocabularyCell
};

Vocabulary.propTypes = {
    itemArray: PropTypes.object.isRequired, // The list of items to render
    groupFunction: PropTypes.func // The function to group things by
};

export default Vocabulary;
