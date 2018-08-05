import React from 'react';

// Class Component
class Cell extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        const {cellData} = this.props;
        const {character, meaning} = cellData;
        return <div  className={`wordCell ${this.props.extraClassName}`}>
            {character || `${meaning}`}
        </div>
    }
}

export default Cell;
