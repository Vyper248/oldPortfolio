import React from 'react';

const Scroll = (props) => {
    return (
        <div style={{overflowY: 'scroll'}}>
            {props.children}
        </div>
    )
}

export default Scroll;