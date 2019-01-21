import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchItem } from './../../actions';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchItem(this.state.value);
  }

  render() {
    return (
      <div className="well blosd">
        <h3 className="lead">Поиск</h3>
        <div className="input-group">
          <form onSubmit={this.handleSubmit} className="btn-group">
            <input
              id="textInput"
              onChange={this.handleChange}
              type="text"
              className="form-control"
            />
            <button className="btn btn-default" onClick={this.handleSubmit}>
              <span className="fa fa-search" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  searchItem,
};

export default connect(
  null,
  mapDispatchToProps
)(Search);
