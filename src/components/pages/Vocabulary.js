import React from 'react';
import {getVocabulary} from "../../api/vocabulary";
import {isApiKey} from "../../util/apiKey";
import _ from 'lodash';
import Cell from "../widgets/Cell";

class Vocabulary extends React.Component {
    constructor (props) {
        const {apiKey} = props;
        super(props);

        this.state = {
            apiKey: apiKey,
            vocabularies: []
        };

        this.uniqueId = _.uniqueId("Vocabularies_");

        // this.bindMethods();

        if(isApiKey(this.state.apiKey)){
            this.callGetVocabularysService();
        }
    }

    /**
     * Call the service to get the vocabularys for this user
     */
    callGetVocabularysService() {
        const {apiKey} = this.state;

        getVocabulary(apiKey).then(response => {
            const perLevel = {};
            response.requested_information.general.forEach(vocabulary => {
                const {level} = vocabulary;
                if(Array.isArray(perLevel[level])){
                    perLevel[level].push(vocabulary)
                } else {
                    perLevel[level] = [vocabulary];
                }
            });
            this.setState({
                vocabularies: perLevel
            });
        }).then(error => {
            if(error){
                console.log("PError!", error);
            }
        })
    }

    /**
     * Render the component based on the state and props (will be called every time state changes with setState)
     * @returns {*}
     */
    render () {
        const {vocabularies} = this.state;
        return (
            <div className="jumbotron">
                <h2>Vocabulary</h2>
                {Object.keys(vocabularies).map((level, index) => {
                    const vocabulariesForLevel = vocabularies[level].filter(vocabulary => {
                        // Only list items where the user has gotten the meaning correct at least once
                        return (vocabulary.user_specific && vocabulary.user_specific.meaning_correct > 0);
                    });
                    const uniqueLevelId = _.uniqueId(`${this.uniqueId}_level_`);
                    if(vocabulariesForLevel.length > 0){
                        return (
                            <div key={uniqueLevelId}>
                                <h3>Level {level}</h3>
                                <div className={"vocabularyContainer"}>
                                    {vocabulariesForLevel.map((vocabulary, index) => {
                                            const uniqueVocabularyId = _.uniqueId(`${uniqueLevelId}_vocabulary_`);
                                            return (
                                                <Cell key={uniqueVocabularyId} extraClassName={"vocabularyCell"} cellData={vocabulary}></Cell>
                                            )
                                    })}
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        );
    }
}

export default Vocabulary;
