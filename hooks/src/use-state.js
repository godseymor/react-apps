import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return <HookSwitcher />;
};

const HookSwitcher = () => {
    const [color, setColor] = useState('gray');
    const [fontSize, setFontSize] = useState(14);
    return (
        <div style={{ padding: '10px', background: color, fontSize: `${fontSize}px` }}>
            <button onClick={() => setColor('gray')}>Dark</button>
            <button onClick={() => setColor('white')}>Light</button>
            <button
                onClick={() =>
                    setFontSize((s) => {
                        return s + 2;
                    })
                }>
                fontSize + 2
            </button>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
