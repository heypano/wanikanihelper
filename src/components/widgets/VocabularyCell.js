import React from 'react';
import Cell from "../widgets/Cell";
import PropTypes from "prop-types";
import Parser from 'html-react-parser';

class VocabularyCell extends Cell {
    constructor(props) {
        super(props);
    }

    /**
     * Returns the main content for the label (no styling)
     * @returns {*}
     */
    getMainLabelContent () {
        const {cellData} = this.props;
        const {character, withFurigana} = cellData;
        const label = withFurigana ? Parser(withFurigana) : character;
        return <span>{label}</span>
    }

        /**
     * Override from Cell - return a link to the WaniKani page for this Vocabulary
     * @returns {string}
     */
    getWaniKaniLink(){
        const {cellData} = this.props;
        const {character} = cellData;
        const url = `https://www.wanikani.com/vocabulary/${character}`;
        return url;
    }
}

VocabularyCell.defaultProps = {
    extraClassName: "vocabularyCell",
};

VocabularyCell.propTypes = {
    cellData: PropTypes.object
};

export default VocabularyCell;
