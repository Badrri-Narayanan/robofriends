import React from 'react';
import './scroll.styles.css';

const Scroll = ({children}) => (
    <div className="scroll-container">
        {
            children
        }
    </div>
);

export default Scroll;