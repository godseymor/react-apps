import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button onClick={() => setValue((v) => v + 1)}>+</button>
                <button onClick={() => setVisible(false)}>hide</button>
                <ClassCounter value={value} />
                <Notification />
                {/* <HookCounter value={value} /> */}
            </div>
        );
    } else {
        return <button onClick={() => setVisible(true)}>show</button>;
    }
};

const HookCounter = ({ value }) => {
    useEffect(() => {
        console.log('mount');
        return () => console.log('unmount');
    }, []);

    useEffect(() => console.log('update'));
    return <p>{value}</p>;
};

const Notification = () => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const _t = setTimeout(() => {
            setVisible(false);
        }, 1500);
        return () => clearTimeout(_t);
    }, []);
    return <div> {visible && <p>Hello</p>} </div>;
};

class ClassCounter extends Component {
    componentDidMount() {
        console.log('class: mount');
    }

    componentDidUpdate(props) {
        console.log('class: update');
    }

    componentWillUnmount() {
        console.log('class: unmount');
    }

    render() {
        return <p>{this.props.value}</p>;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
