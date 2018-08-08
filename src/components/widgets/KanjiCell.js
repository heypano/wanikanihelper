import React from 'react';
import Cell from "../widgets/Cell";
import PropTypes from "prop-types";

class KanjiCell extends Cell {
    constructor(props) {
        super(props);
    }
}

KanjiCell.defaultProps = {
    extraClassName: "kanjiCell",
};

KanjiCell.propTypes = {
    cellData: PropTypes.object
};

export default KanjiCell;
