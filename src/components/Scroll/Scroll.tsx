import { ReactNode } from 'react';
import './scroll.styles.css';

const Scroll = ({ children }: { children: ReactNode }) => (
    <div className="scroll-container">
        {
            children
        }
    </div>
);

export default Scroll;