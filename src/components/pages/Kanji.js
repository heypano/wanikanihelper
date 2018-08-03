import React from 'react';
import {getKanji} from "../../api/kanji";
import {isApiKey} from "../../util/apiKey";
import _ from 'lodash';

class Kanjis extends React.Component {
    constructor (props) {
        const {apiKey} = props;
        super(props);

        this.state = {
            apiKey: apiKey,
            kanjis: []
        };

        this.uniqueId = _.uniqueId("Kanjis_");

        // this.bindMethods();

        if(isApiKey(this.state.apiKey)){
            this.callGetKanjisService();
        }
    }

    /**
     * Call the service to get the kanjis for this user
     */
    callGetKanjisService() {
        const {apiKey} = this.state;

        getKanji(apiKey).then(response => {
            const perLevel = {};
            response.requested_information.forEach(kanji => {
                const {level} = kanji;
                if(Array.isArray(perLevel[level])){
                    perLevel[level].push(kanji)
                } else {
                    perLevel[level] = [kanji];
                }
            });
            this.setState({
                kanjis: perLevel
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
        const {kanjis} = this.state;
        return (
            <div className="jumbotron">
                <h2>Kanjis</h2>
                {Object.keys(kanjis).map((level, index) => {
                    const kanjisForLevel = kanjis[level];
                    const uniqueLevelId = _.uniqueId(`${this.uniqueId}_level_`);
                    return (
                        <div key={uniqueLevelId}>
                            <h3>Level {level}</h3>
                            <div>
                                {kanjisForLevel.map((kanji, index) => {
                                        const uniqueKanjiId = _.uniqueId(`${uniqueLevelId}_kanji_`);
                                        const {character, meaning, userdata} = kanji;
                                        return (
                                            <span key={uniqueKanjiId} className={"mr-2"}>
                                                {character || `N/A: ${meaning}`}
                                            </span>
                                        )
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Kanjis;
