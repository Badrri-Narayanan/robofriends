import React from 'react';
import './scroll.styles.css';

const Scroll: React.FC<{children: React.ReactChild}> = ({children}) => (
    <div className="scroll-container">
        {
            children
        }
    </div>
);

export default Scroll;