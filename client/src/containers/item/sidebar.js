import React from 'react';
import { Link } from 'react-router';

export const Sidebar = ({ item }) => {
  return (
    <div>
      <div className="input-group">
        <h1>{item.name}</h1>
      </div>
      <div className="input-group">
        <p>{item.description}</p>
      </div>
      <div className="input-group">
        <p>Цена:{item.price + ' '} руб.</p>
      </div>

      <Link to="/adboard" className="btn btn-outline-primary btn-block">
        Назад
      </Link>
      <div className="input-group mt-3">
        <a
          href="tel:+79094560614"
          className="btn btn-outline-success btn-block"
          role="button"
          aria-pressed="true"
        >
          Позвонить
        </a>
      </div>
    </div>
  );
};
