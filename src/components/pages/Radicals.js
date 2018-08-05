import React from 'react';
import {getRadicals} from "../../api/radicals";
import {isApiKey} from "../../util/apiKey";
import _ from 'lodash';
import Cell from "../widgets/Cell";

class Radicals extends React.Component {
    constructor (props) {
        const {apiKey} = props;
        super(props);

        this.state = {
            apiKey: apiKey,
            radicals: []
        };

        this.uniqueId = _.uniqueId("Radicals_");

        // this.bindMethods();

        if(isApiKey(this.state.apiKey)){
            this.callGetRadicalsService();
        }
    }

    /**
     * Call the service to get the radicals for this user
     */
    callGetRadicalsService() {
        const {apiKey} = this.state;

        getRadicals(apiKey).then(response => {
            const perLevel = {};
            response.requested_information.forEach(radical => {
                const {level} = radical;
                if(Array.isArray(perLevel[level])){
                    perLevel[level].push(radical)
                } else {
                    perLevel[level] = [radical];
                }
            });
            this.setState({
                radicals: perLevel
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
        const {radicals} = this.state;
        return (
            <div className="jumbotron">
                <h2>Radicals</h2>
                {Object.keys(radicals).map((level, index) => {
                    const radicalsForLevel = radicals[level].filter(radical => {
                        // Only list items where the user has gotten the meaning correct at least once
                        return (radical.user_specific && radical.user_specific.meaning_correct > 0);
                    });
                    const uniqueLevelId = _.uniqueId(`${this.uniqueId}_level_`);
                    if(radicalsForLevel.length > 0){
                        return (
                            <div key={uniqueLevelId}>
                                <h3>Level {level}</h3>
                                <div className={"radicalContainer"}>
                                    {radicalsForLevel.map((radical, index) => {
                                            const uniqueRadicalId = _.uniqueId(`${uniqueLevelId}_radical_`);
                                            return (
                                                <Cell key={uniqueRadicalId} extraClassName={"radicalCell"} cellData={radical}></Cell>
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

export default Radicals;
