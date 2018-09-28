import React from 'react';
import Cell from "../widgets/Cell";
import PropTypes from "prop-types";
import DOMPurify from 'dompurify'
import Parser from 'html-react-parser';

class VocabularyCell extends Cell {
    constructor(props) {
        super(props);
        this.state.updatedLabel = "";
        this.fetchFurigana = this.fetchFurigana.bind(this);
    }

    componentDidMount(){
        this.fetchFurigana();
    }

    async fetchFurigana(){
        const {cellData, kuroshiro} = this.props;
        const {character} = cellData;
        if(kuroshiro) {
            const furigana = await kuroshiro.convert(character, {
                to: "hiragana",
                mode: "furigana"
            });
            this.setState({
                updatedLabel: Parser(DOMPurify.sanitize(furigana))
            });
        } else {
            setTimeout(this.fetchFurigana, 500);
        }
    }

    /**
     * Returns the main content for the label (no styling)
     * @returns {*}
     */
    getMainLabelContent () {
        const {cellData} = this.props;
        const {updatedLabel} = this.state;
        const {character} = cellData;
        const label = updatedLabel || character ; // If for some reason there is no character, show the meaning instead
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
