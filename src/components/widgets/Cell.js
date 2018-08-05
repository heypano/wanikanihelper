import React from 'react';
import PropTypes from 'prop-types';

// Class Component
class Cell extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        const {cellData, extraClassName} = this.props;
        const {character, meaning} = cellData;
        return <div  className={`wordCell ${extraClassName}`}>
            {character || `${meaning}`}
        </div>
    }
}

Cell.propTypes = {
    cellData: PropTypes.object,
    label: PropTypes.string
};

export default Cell;
