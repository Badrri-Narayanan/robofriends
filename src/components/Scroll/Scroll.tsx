import React from 'react';
import './scroll.styles.css';

const Scroll: React.FC<{children: React.ReactNode}> = ({children}) => (
    <div className="scroll-container">
        {
            children
        }
    </div>
);

export default Scroll;