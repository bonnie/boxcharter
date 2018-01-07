import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { startLoading, fetchCharts, doneLoading } from '../../actions';

class boxcharterNavbar extends Component {

  // componentWillMount() {
  //   this.props.startLoading();
  //   axios.get('http://localhost:3000/api/learners')
  //   .then(response => response.data)
  //   .then(data => this.props.fetchCharts(data))
  //   .then(() => this.props.doneLoading())
  //   .catch(error => {
  //     console.log('Error fetching and parsing data', error);
  //   });
  // }

  render() {
    return (
      <div>
        <Navbar className="navbar" fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <ul className="navbar-nav list-group">
                <li className="nav-item list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="nav-item list-group-item">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="nav-item list-group-item">
                  <Link to="/charts">Charts</Link>
                </li>
                <li className="nav-item list-group-item">
                  <Link to="/logout">Log Out</Link>
                </li>
              </ul>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startLoading, fetchCharts, doneLoading }, dispatch);
}

export default connect(null, mapDispatchToProps)(boxcharterNavbar);