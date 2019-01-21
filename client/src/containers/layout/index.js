import React from 'react';
import Sidebar from './../../components/sidebar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router';
import './style.css';

const Layout = ({ children }) => (
  <div className="view-container">
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">{children}</div>
      </div>
      <div className="floatBtn">
        <Link to="/additems" className="add_new_items">
          <Fab color="primary" aria-label="Add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </div>
  </div>
);

export default Layout;
