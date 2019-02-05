import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Observer from 'react-intersection-observer';

class ListGroupService extends Component {
  constructor(props) {
    super(props);
    this.state = { classAnimate: '' };
    this.inViewEvent = this.inViewEvent.bind(this);
  }

  inViewEvent() {
    this.setState({ classAnimate: 'animated zoomIn' });
  }

  render() {
    return (
      <div
        className={
          'container block_serviceList_group ' + this.state.classAnimate
        }
      >
        <Observer tag="div" onChange={inView => inView && this.inViewEvent()}>
          <span className="service__title">
            {' '}
            {this.props.dataList && this.props.dataList.title}
          </span>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between list-group-item-info service__list-group__name">
              <span>Наименование</span>
              <span className="list_price">Цена:</span>
            </li>
            {this.props.dataList &&
              this.props.dataList.list.map(data => {
                return (
                  <li
                    className="list-group-item d-flex justify-content-between service__list-group__li"
                    key={Math.floor(Math.random() * 100) + data.name}
                  >
                    <span className="list-group_data">{data.name}</span>
                    <span className="list-group_price">{data.price}</span>
                  </li>
                );
              })}
          </ul>
          <span className="service__footer">
            {this.props.dataList && this.props.dataList.footer}
          </span>
        </Observer>
      </div>
    );
  }
}

ListGroupService.propTypes = {
  dataList: PropTypes.object,
};
export default ListGroupService;
