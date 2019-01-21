import React, { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { chekingItem } from './../../actions';
import { getToken } from '../../selectors';

class OneCheckItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ok: false,
    };
  }

  handleClick(e, id) {
    this.props.chekingItem(id, this.props.token);
    this.setState({ ok: true });
  }

  render() {
    const shortDescription = `${R.take(60, this.props.item.description)}...`;
    return (
      <div className="col-lg-4 item_card_container">
        <div className="card item_card">
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
            <p className="card-text">Цена: {this.props.item.price}</p>
          </div>

          <div className="card-body">
            <Link
              to={`/edititems/${this.props.item.id}`}
              className="btn btn-default"
            >
              изменить
            </Link>
            {this.state.ok ? (
              <i className="fa fa-check" />
            ) : (
              <span
                className="btn btn-default"
                onClick={e => this.handleClick(e, this.props.item.id)}
              >
                Подтвердить
              </span>
            )}
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

const initMapDispatchToProps = {
  chekingItem,
};

export default connect(
  mapStateToProps,
  initMapDispatchToProps
)(OneCheckItem);
