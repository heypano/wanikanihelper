import React from 'react';
import Cell from "../widgets/Cell";
import PropTypes from "prop-types";

class VocabularyCell extends Cell {
    constructor(props) {
        super(props);
    }
}

VocabularyCell.defaultProps = {
    extraClassName: "vocabularyCell",
};

VocabularyCell.propTypes = {
    cellData: PropTypes.object
};

export default VocabularyCell;
