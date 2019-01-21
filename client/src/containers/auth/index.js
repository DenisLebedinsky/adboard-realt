import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from './../../actions';
import { browserHistory } from 'react-router';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onHandleSabmit = this.onHandleSabmit.bind(this);
    this.fetchAuth = this.props.fetchAuth.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
  }

  onHandleSabmit(e) {
    this.fetchAuth(this.state.username, this.state.password);
    browserHistory.push('/adboard');
    e.preventDefault();
  }

  handleChangeName(e) {
    this.setState({ username: e.target.value });
  }

  handleChangePass(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="container" id="autorizeForm">
          <h1 className="text-center">Авторизация</h1>
          <p className="text-center">
            Доступна только для администраторов и модераторов
          </p>
          <div className="row d-flex justify-content-center">
            <form
              className="form-horizontal col-lg-6"
              onSubmit={this.onHandleSabmit}
            >
              <div className="form-group">
                <label className=" control-label">Имя пользователя</label>
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail3"
                    value={this.state.username}
                    onChange={this.handleChangeName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className=" control-label">Пароль</label>
                <div className="">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword3"
                    value={this.state.password}
                    onChange={this.handleChangePass}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-default">
                    Войти
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAuth,
};
export default connect(
  null,
  mapDispatchToProps
)(Index);
