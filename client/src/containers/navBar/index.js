import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getToken } from '../../selectors';
import { signOut } from './../../actions';

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar fixed-top animated slideInDown">
          <div className="container">
            <ul className="navbar-nav ml-auto sm-ml-auto d-flex flex-row">
              <li className="nav-item ml-4">
                <Link className="nav-link" to="/">
                  Главная
                </Link>
              </li>
              <li className="nav-item ml-4">
                <Link className="nav-link" to="/adboard">
                  Объявления
                </Link>
              </li>

              {this.props.token && (
                <li className="nav-item ml-4">
                  <Link className="nav-link" to="/check">
                    Проверить новые
                  </Link>
                </li>
              )}

              {this.props.token ? (
                <li className="nav-item ml-4">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={this.props.signOut}
                  >
                    Выйти
                  </Link>
                </li>
              ) : (
                <li className="nav-item ml-4">
                  <Link className="nav-link" to="/signin">
                    войти
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: getToken(state),
  };
};

const mapDispatchToProps = {
  signOut,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
