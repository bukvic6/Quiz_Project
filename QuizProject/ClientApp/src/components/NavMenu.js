import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
        collapsed: true,
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed

    });
    }
    handleLogout = () => {
        localStorage.clear();
        this.props.updateLoginStatus(false);
        window.location.href = '/';
    };

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/home">QuizProject</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                <ul className="navbar-nav flex-grow">
                {this.state.isLoggedIn && (
                <NavItem>
                 <NavLink tag={Link} className="text-dark" to="/Home">Home</NavLink>
                </NavItem>)}
                <NavItem>
                {this.props.isLoggedIn && (
                <NavLink tag={Link} className="text-dark" to="/results">Results</NavLink>)}
                </NavItem>
                <NavItem>
                    {this.props.isLoggedIn ?(
                        <NavLink tag={Link} className="text-dark" to="/" onClick={this.handleLogout}>Logout</NavLink>
                    ) : (
                        <NavLink tag={Link} className="text-dark" to="/">Login</NavLink>
                    )}
                </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
