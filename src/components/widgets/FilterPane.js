import React from 'react';
import PropTypes from "prop-types";
import {Jumbotron} from "reactstrap";
import FilterCheckbox from "../inputs/Filters/FilterCheckbox";
import _ from 'lodash';

class FilterPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: this.props.filters
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
        const {filters} = this.state;
        // Call the onFiltersChanged method that was passed in the props
        onFiltersChanged(filters);
    }

    render() {
        const filtersByCategory = this.getFiltersByCategory();
        return <div className={"filterPaneContainer"}>
            <h3>Filters</h3>
            <div className={"filterPane"}>
                    {
                       _.map(filtersByCategory, (categoryFilters, category) => {
                           const categoryUniqueId = _.uniqueId("filterCategory");
                           return <div key={categoryUniqueId}>
                               <h4>{category}</h4>
                               <div className={"filterCategory"}>
                                  {
                                      _.map(categoryFilters, (item) => {
                                          const uniqueId = _.uniqueId("FilterCheckbox_");
                                          const {filterMethodOn, filterMethodOff, value, cssClass, filterName} = item;
                                          // debugger;
                                          return <FilterCheckbox
                                                      key={uniqueId}
                                                      onFilterChange={this.onFilterCheckboxChanged}
                                                      extraClassName={cssClass}
                                                      name={filterName}
                                                      label={filterName}
                                                      value={value}
                                                      filterMethodOn={filterMethodOn}
                                                      filterMethodOff={filterMethodOff}></FilterCheckbox>;
                                      })
                                  }
                              </div>
                           </div>
                       })
                    }
            </div>
        </div>
    }
}

FilterPane.defaultProps = {
    extraClassName: "",
};

FilterPane.propTypes = {
    onFiltersChanged: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
};

export default FilterPane;
