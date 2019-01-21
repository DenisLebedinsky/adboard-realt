import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { getCategories, getActiveCategoryId } from './../../selectors';
import { loadMoreItems } from '../../actions';
import { compose } from 'redux';
import * as R from 'ramda';
import classNames from 'classnames';

const Categories = ({ categories, activeCategoryId }) => {
  const renderCategory = (category, index) => {
    const getActiveState = R.propEq('id', activeCategoryId);
    const linkClass = classNames({
      'list-group-item': true,
      active: getActiveState(category),
    });
    return (
      <Link to={`/categories/${category.id}`} className={linkClass} key={index}>
        {category.name}
      </Link>
    );
  };

  const renderAllCategory = () => {
    const linkClass = classNames({
      'list-group-item': true,
      active: R.isNil(activeCategoryId),
    });
    return (
      <Link to={'/adboard'} className={linkClass}>
        Все
      </Link>
    );
  };
  return (
    <div className="well">
      <h5>Категории</h5>
      <div className="list-group">
        {renderAllCategory()}
        {categories.map((category, index) => renderCategory(category, index))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  categories: getCategories(state),
  activeCategoryId: getActiveCategoryId(ownProps),
});

const initMapDispatchToProps = {
  loadMoreItems,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    initMapDispatchToProps
  )
)(Categories);
