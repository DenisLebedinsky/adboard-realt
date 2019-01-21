import React, { Component } from 'react';
import * as R from 'ramda';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getToken } from '../../selectors';
import { browserHistory } from 'react-router';

class OneItem extends Component {
  handleClickAbout(e) {
    browserHistory.push(`/items/${this.props.item.id}`);
    e.preventDefault();
  }

  render() {
    const shortDescription = `${R.take(60, this.props.item.description)}...`;
    return (
      <div className="col-lg-4 item_card_container">
        <div className="card item_card">
          <div onClick={e => this.handleClickAbout(e)}>
            <img
              className="card-img-top"
              src={this.props.item.image}
              alt={this.props.item.name}
            />
            <div className="card-body">
              <h5 className="card-title">{this.props.item.name}</h5>
              <p className="card-text">{shortDescription}</p>
            </div>
            <div className="card-body">
              <p className="card-text text_price">
                Цена: {this.props.item.price + ' '} руб.
              </p>
            </div>
          </div>
          <div className="card-body d-flex justify-content-center">
            {this.props.token && (
              <Link
                to={`/edititems/${this.props.item.id}`}
                className="btn btn-default"
              >
                изменить
              </Link>
            )}

            <Link
              to={`/items/${this.props.item.id}`}
              className="btn btn-default"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: getToken(state),
  };
};
export default connect(
  mapStateToProps,
  null
)(OneItem);
