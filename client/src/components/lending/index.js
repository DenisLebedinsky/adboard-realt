import React, { Component } from 'react';
import { serviceList } from './../../ServiceList';
import ListGroupService from './ListGroupService';

class LendingPage extends Component {
  render() {
    return (
      <div className="header">
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="gerb" />
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon fill="white" points="0,100 100,0 100,100" />
        </svg>

        <div className="service_block">
          <div className="container">
            <div className="row service_block">
              <div className="col-lg-12 d-flex justify-content-center">
                <h2 className="service_h2">
                  Услуги которые мы предоставляем:{' '}
                </h2>
              </div>
              <div>
                {serviceList &&
                  serviceList.map(list => (
                    <ListGroupService
                      dataList={list}
                      key={Math.floor(Math.random() * 10000)}
                    />
                  ))}
              </div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon fill="#001400" points="0,100 0,0 100,100" />
          </svg>
        </div>
        <div className="footer">
          <div className="container">
            <div className="row col-lg-4">
              <h2>Контакты</h2>
              <hr />
            </div>
            <div className="row">
              <div className="col-lg-4">
                <span>
                  Телефон:
                  <a href="tel:+79388655515"> +79388655515</a>
                </span>
                <br />
                <span>
                  E-mail:
                  <a href="mail"> mir-zakona@mail.ru</a>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <a href="https://www.instagram.com/metlinvv/?utm_source=ig_profile_share&igshid=akwyw405hyyd">
                  <i className="fa fa-instagram" aria-hidden="true" />
                </a>
                <a href="https://vk.com/id186450957">
                  <i className="fa fa-vk" aria-hidden="true" />
                </a>
                <a href="tel:+79388655515">
                  <i className="fa fa-whatsapp" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LendingPage;
