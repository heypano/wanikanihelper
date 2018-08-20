import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// Class Component
class Checkbox extends React.Component {
    constructor (props) {
        super(props);
        this.bindMethods();
    }
    bindMethods(){
        this.onChangeWrapped = this.onChangeWrapped.bind(this);
    }
    /**
     * Handles the initial onChange event
     * @param {SyntheticEvent} event
     */
    onChangeWrapped(event){
        const newValue = event.target.checked;
        // Call the ovverrideable onChange function
        this.onChange(newValue);

    }
    /**
     * Handles the onChange event (override in subclasses)
     * @param {boolean} newValue
     */
    onChange(newValue){
        const {onChangeFromProps} = this.props;
        onChangeFromProps(newValue);
    }

    render() {
        const {extraClassName, label, value} = this.props;
        const uniqueId = _.uniqueId("checkbox");
        return <FormGroup check className={`filterCheckbox ${extraClassName}`}>
            <Input id={uniqueId} type="checkbox" onChange={this.onChangeWrapped} checked={value}/>{' '}
            <Label for={uniqueId}>
                {label}
            </Label>
        </FormGroup>

    }
}

Checkbox.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    label: PropTypes.string,
    extraClassName: PropTypes.string
};

export default Checkbox;
