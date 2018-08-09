import React from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";
import Cell from "./Cell";

// Class to render a Grid of cells
class CellGrid extends React.Component {
    constructor (props) {
        super(props);
    }

    /**
     * Prepare the data based on props before rendering
     * @param {Array} itemArray
     *
     * @returns {Object} itemCollection
     */
    prepareData(itemArray){
        let {sortFunction, filterFunction, groupFunction, extraClassName, getArrayPath} = this.props;
        let itemCollection = _.keyBy(getArrayPath(itemArray), () => {
            return _.uniqueId(`CellGrid_${extraClassName}_hash`);
        });

        if(filterFunction){
            itemCollection = _.filter(itemCollection, filterFunction);
        }
        if(sortFunction){
            itemCollection = _.sort(itemCollection, sortFunction);
        }
        if(groupFunction){
            itemCollection = _.groupBy(itemCollection, groupFunction);
        }
        return itemCollection
    }
    getList(itemCollection){
        let {groupFunction, groupedByLabel, cellClass} = this.props;
        let CellClass = cellClass || Cell;
        if(groupFunction){
            return _.map(itemCollection, (group, groupName) => {
                const uniqueGroupId = _.uniqueId(groupName);
                const groupItems = itemCollection[groupName];
                return(
                    <div key={uniqueGroupId} className={"cellGridGroup"}>
                        <h3>{groupedByLabel} {groupName}</h3>
                        {_.map(groupItems, (item, key) => this.getCell(CellClass, key, item))}
                    </div>
                    );
            })
        } else {
            return _.map(itemCollection, (item, key) => this.getCell(CellClass, key, item));
        }
    }

    /**
     *
     * @param CellClass - the specific Cell class e.g. KanjiCell
     * @param key - the key (for map)
     * @param cellData - the data for the cell
     * @returns {Element} - The react element from JSX / React.createElement
     */
    getCell (CellClass, key, cellData) {
        return <CellClass key={key} cellData={cellData}></CellClass>
    }

    render() {
        let {extraClassName, itemArray, topLabel, groupFunction} = this.props;
        const itemCollection = this.prepareData(itemArray);
        return (
            <div className="jumbotron">
                <h2>{topLabel}</h2>
                <div className={`CellGrid ${extraClassName}`}>
                    {this.getList(itemCollection)}
                </div>
            </div>
        );
    }
}

CellGrid.propTypes = {
    itemArray: PropTypes.object.isRequired, // The list of items to render
    extraClassName: PropTypes.string.isRequired, // Extra CSS class
    cellClass: PropTypes.func, // React Component class for the cell
    topLabel: PropTypes.string.isRequired, // The top label to use
    getArrayPath: PropTypes.func, // Function that returns the array of items from the data
    sortFunction: PropTypes.func,
    filterFunction: PropTypes.func,
    groupFunction: PropTypes.func,
    groupedByLabel: PropTypes.string, // What is the type of thing being grouped (e.g. "Level")s
    showMeaning: PropTypes.bool // Show the meaning of the items?
};

export default CellGrid;