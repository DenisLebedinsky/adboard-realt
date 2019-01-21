import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItemByID, addItemToBasket } from './../../actions';
import { getItemById } from './../../selectors';
import { Sidebar } from './sidebar';
import Field from './fields';

class Item extends Component {
  componentDidMount() {
    this.props.fetchItemByID(this.props.params.id);
  }

  render() {
    const { item } = this.props;
    return (
      <div className="container mt-5 pt-5">
        <div className="row ">
          <div className="col-md-9">{item && <Field item={item} />}</div>
          <div className="col-md-3">{item && <Sidebar item={item} />}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    item: getItemById(state, state.itemPage.id),
  };
};

const mapDispatchToProps = {
  fetchItemByID,
  addItemToBasket,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
