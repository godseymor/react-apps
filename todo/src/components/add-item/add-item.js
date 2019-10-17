import React, { Component } from "react";

import "./add-item.css";

export default class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            label: ""
        };

        this.onLabelChange = e => {
            this.setState({
                label: e.target.value
            });
        };

        this.onSubmit = e => {
            e.preventDefault();
            this.props.onButtonClick(this.state.label);
            this.setState({
                label: ''
            });
        };
    }

    render() {
        return (
            <form className="add-item d-flex" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    className="form-control"
                    onChange={this.onLabelChange}
                    placeholder="What needs to be done"
                    // делаем элемент контролируемым, навешивая велью из стейта
                    value={this.state.label}
                />
                <button className="btn btn-outline-primary">Add Item</button>
            </form>
        );
    }
}
