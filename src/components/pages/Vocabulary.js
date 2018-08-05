import React from 'react';
import CellGrid from "../widgets/CellGrid";
import PropTypes from "prop-types";

class Vocabulary extends CellGrid {
    constructor (props) {
        super(props);
    }
}

Vocabulary.defaultProps = {
    topLabel: "Vocabulary",
    extraClassName: "vocabularyContainer",
    cellClassName: "vocabularyCell",
    groupedByLabel: "Level",
    getArrayPath :  ((data) => data.requested_information.general)
};

Vocabulary.propTypes = {
    itemArray: PropTypes.object.isRequired, // The list of items to render
    groupFunction: PropTypes.func // The function to group things by
};

export default Vocabulary;
