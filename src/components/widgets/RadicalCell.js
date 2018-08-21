import React from 'react';
import Cell from "../widgets/Cell";
import PropTypes from "prop-types";

class RadicalCell extends Cell {
    constructor(props) {
        super(props);
    }
    /**
     * Overriding Cell - need to show image if character not available
     * @returns {*}
     */
    getMainLabelContent(){
            const {cellData, extraClassName, getCellContent} = this.props;
            const {character, image, meaning} = cellData;
            let element;

            if (character){
                element = <span>{character}</span>;
            } else if (image){
                element = <img className={"wordCellImage"} src={image} title={"DA IMAGE"}></img>;
            } else {
                element = <span>{meaning}</span>
            }

            return element;
    }

    /**
     * Override from Cell - return a link to the WaniKani page for this Radical
     * @returns {string}
     */
    getWaniKaniLink(){
        const {cellData} = this.props;
        const {meaning} = cellData;
        const url = `https://www.wanikani.com/radicals/${meaning}`;
        return url;
    }
}

RadicalCell.defaultProps = {
    extraClassName: "radicalCell",
};

RadicalCell.propTypes = {
    cellData: PropTypes.object
};

export default RadicalCell;
