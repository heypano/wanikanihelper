import React from 'react';
import PropTypes from "prop-types";
import {Jumbotron} from "reactstrap";
import FilterCheckbox from "../inputs/Filters/FilterCheckbox";
import _ from 'lodash';
import {meaningCorrectAtLeastOnce, excludeEnlightened, includeThis} from "../../util/filters";

class FilterPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                    "Enlightened": {
                        filterMethodOn: excludeEnlightened,
                        filterMethodOff: includeThis,
                        value: true
                    },
                    "Enlightened2": {
                        filterMethodOn: excludeEnlightened,
                        filterMethodOff: includeThis,
                        value: true
                    }
                }
        };
        this.bindMethods();
    }
    bindMethods(){
        this.onFilterCheckboxChanged = this.onFilterCheckboxChanged.bind(this);
        this.onFilterStateChanged = this.onFilterStateChanged.bind(this);
    }

    /**
     * Called when any of the filter checkboxes in the checkbox fire
     * Will update the state and then call this.onFilterStateChanged
     * @param name
     * @param value
     */
    onFilterCheckboxChanged(name, value){
        // TODO maybe check for whether the value has changed here
        this.setState((prevState, props) => {
                return {
                    filters: {
                        ...prevState.filters, // Old filters array
                        [name]: {
                            ...prevState.filters[name], // Old filter - to make sure to only update the value below
                            value: value
                        }
                    }
                }
            }, this.onFilterStateChanged);
    }

    /**
     * Called when the filter state has changed, will call the function provided in this.props.onFiltersChanged
     */
    onFilterStateChanged() {
        const {onFiltersChanged} = this.props;
        onFiltersChanged(this.state.filters);
    }

    render() {
        return <div className={"filterPane"}>
            <Jumbotron>
                <div>
                    <div>
                        {
                            _.map(this.state.filters, (item, name) => {
                                const uniqueId = _.uniqueId("FilterCheckbox_");
                                const {filterMethodOn, filterMethodOff, value} = item;
                                return <FilterCheckbox
                                            key={uniqueId}
                                            onFilterChange={this.onFilterCheckboxChanged}
                                            name={name}
                                            label={name}
                                            value={value}
                                            filterMethodOn={filterMethodOn}
                                            filterMethodOff={filterMethodOff}></FilterCheckbox>
                            })
                        }
                    </div>
                </div>
            </Jumbotron>
        </div>
    }
}

FilterPane.defaultProps = {
    extraClassName: "",
};

FilterPane.propTypes = {
    onFiltersChanged: PropTypes.func.isRequired
};

export default FilterPane;
