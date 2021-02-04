import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-details.css';

const Record = ({ item, field, label }) => {
    return (
        <li className='list-group-item'>
            <span className='term'>{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export { Record };

export default class ItemDetails extends Component {
    swapiService = new SwapiService();

    state = {
        item: null,
        image: null,
        loading: true,
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl
        ) {
            this.setState({ loading: true });
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId).then((item) => this.setState({ item, image: getImageUrl(itemId), loading: false }));
    }

    render() {
        const { loading, item, image } = this.state;
        if (!item) {
            return <span>Select a item from a list</span>;
        }

        return (
            <div className='item-details card'>
                {loading ? (
                    <Spinner />
                ) : (
                    <ItemDetailsView
                        item={item}
                        image={image}
                        records={React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, { item });
                        })}
                    />
                )}
            </div>
        );
    }
}

const ItemDetailsView = ({ item, image, records }) => {
    const { name } = item;
    return (
        <React.Fragment>
            <img className='item-image' alt={name} src={image} />

            <div className='card-body'>
                <h4>{name}</h4>
                <ul className='list-group list-group-flush'>{records}</ul>
            </div>
        </React.Fragment>
    );
};
