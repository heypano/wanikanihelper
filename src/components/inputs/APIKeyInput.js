import React from 'react';
import {isApiKey} from '../../util/apiKey';
import _ from 'lodash'

class APIKeyInput extends React.Component {
    constructor (props) {
        super(props);
        const {apiKey} = props;
        // Generate a unique ID for id/label "for" attribute purposes
        this.uniqueId = _.uniqueId("APIKeyInput_");
        this.state = {
            // The initial value of the input cannot be null because otherwise react
            // complains about an uncontrolled component becoming controlled
            // More info
            // https://reactjs.org/docs/forms.html#controlled-components
            // https://github.com/twisty/formsy-react-components/issues/66
            apiKey: apiKey || ""
        };
        this.bindMethods();
    }


    /**
     * Bind the various handlers to make sure they are attached to this class
     */
    bindMethods() {
        this.handleAPIInputChange = this.handleAPIInputChange.bind(this);
    }
    /**
     * Function to handle the input change
     * @param event
     */
    handleAPIInputChange (event) {
        const newValue = event.target.value;
        const {onAPIKeySet} = this.props;

        this.setState((prevState, props) => {
            if(isApiKey(newValue)){
                onAPIKeySet(newValue);
            }
            return {
                apiKey: newValue
            };
        });
    }

    /**
     * Render the component based on the state and props (will be called every time state changes with setState)
     * @returns {*}
     */
    render () {
        const {apiKey} = this.state;
        const inputId = this.uniqueId + "_apiInput";

        return (
            <div className="APIKeyInput mb-2">
                <label htmlFor={inputId}></label>
                <input name="apiKey" id={inputId} type="text" value={apiKey} onChangeCapture={this.handleAPIInputChange} placeholder={"Enter API Key here"}/>
            </div>
        );
    }
}

export default APIKeyInput;
