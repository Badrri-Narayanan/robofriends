import React from 'react';

const Scroll = ({children}) => (
    <div style={{overflowY: 'scroll', border: '1px solid black', height: '38 rem'}}>
        {
            children
        }
    </div>
);

export default Scroll;