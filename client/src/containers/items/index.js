import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import OneItem from './oneitem';

import {
  fetchItems,
  loadMoreItems,
  fetchCategories,
} from './../../actions';
import { getItems } from './../../selectors';

class Items extends Component {
  componentDidMount() {
    this.props.fetchItems();
    this.props.fetchCategories();
  }

  render() {
    const { items, loadMoreItems } = this.props;
    return (
      <div className="mt-5">
        <div className="row">
          {items.map((item, index) => (
            <OneItem item={item} key={index} />
          ))}
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <button
              onClick={loadMoreItems}
              className="btn btn-outline-success mt-3"
            >
              Загрузить еще
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: getItems(state, ownProps),
  };
};

const mapDispatchToProps = {
  fetchItems,
  loadMoreItems,
  fetchCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
