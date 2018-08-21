import React from 'react';
import Cell from "../widgets/Cell";
import PropTypes from "prop-types";

class KanjiCell extends Cell {
    constructor(props) {
        super(props);
    }

    /**
     * Override from Cell - return a link to the WaniKani page for this Kanji
     * @returns {string}
     */
    getWaniKaniLink(){
        const {cellData} = this.props;
        const {character} = cellData;
        const url = `https://www.wanikani.com/kanji/${character}`;
        return url;
    }
}

KanjiCell.defaultProps = {
    extraClassName: "kanjiCell",
};

KanjiCell.propTypes = {
    cellData: PropTypes.object
};

export default KanjiCell;
