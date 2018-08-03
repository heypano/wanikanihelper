import React from 'react';
import {getRadicals} from "../../api/radicals";
import {isApiKey} from "../../util/apiKey";
import _ from 'lodash';

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
            this.setState({
                radicals: response.requested_information
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
                {radicals.map((radical, index) => {
                    const uniqueId = _.uniqueId(`${this.uniqueId}_radical_`);
                    const {character, level, meaning, userdata} = radical;
                    return (
                        <span key={uniqueId} className={"mr-2"}>
                            {character}
                        </span>
                    )
                })}
            </div>
        );
    }
}

export default Radicals;
