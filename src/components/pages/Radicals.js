import React from 'react';
import {Link} from 'react-router-dom';
import {UncontrolledTooltip as Tooltip} from 'reactstrap';
import {getRadicals} from "../../api/radicals";
import {isApiKey} from "../../util/apiKey";

class Radicals extends React.Component {
    constructor (props) {
        const {apiKey} = props;
        super(props);

        this.state = {
            apiKey: apiKey
        };

        // this.bindMethods();

        if(isApiKey(this.state.apiKey)){
            this.getRadicals();
        }
    }

    /**
     * Call the service to get the radicals for this user
     */
    getRadicals() {
        const {apiKey} = this.state;

        getRadicals(apiKey).then(response => {
            console.log("PResponse!", response);
        }). then(error => {
            console.log("PError!", error);
        })
    }

    /**
     * Render the component based on the state and props (will be called every time state changes with setState)
     * @returns {*}
     */
    render () {
        return (
            <div className="radicals">
                Yo
            </div>
        );
    }
}

export default Radicals;
