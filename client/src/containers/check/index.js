import React, { Component } from 'react';
import { connect } from 'react-redux';
import OneCheckItem from './OneCheckItem';
import { fetchItemsCheck } from './../../actions';
import { getcheckItems, getToken } from './../../selectors';
import EditCategory from '../editCategory';

class Check extends Component {
  componentDidMount() {
    this.props.fetchItemsCheck(this.props.token);
  }

  render() {
    const { items } = this.props;
    return (
      <div className="container mt-5">
        <div className="books row pt-2">
          {items.map((item, index) => (
            <OneCheckItem item={item} key={index} />
          ))}
        </div>
        <div className="row">
          <div className="col-md-12">
              <EditCategory />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: getcheckItems(state, ownProps),
    token: getToken(state),
  };
};

const mapDispatchToProps = {
  fetchItemsCheck,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Check);
