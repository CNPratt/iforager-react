import React, { Component } from "react";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    // console.log("header rendered");

    return (
      <div className="header sticky-top">
        <Navbar id="navID" className="navbar-expand-md navbar-light py-0">
          <img
            alt="iForager icon"
            src="../imgs/icon.svg"
            height="50px"
            className="m-1"
          />

          <NavbarBrand className="mb-2" href="/">
            <div id="logoText">iForager</div>
          </NavbarBrand>

          <NavbarToggler
            onClick={this.toggle}
            type="Button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            id="toggler"
          >
            <span className="navbar-toggler-icon"></span>
          </NavbarToggler>

          <Collapse
            isOpen={this.state.isOpen}
            className="navbar-collapse"
            id="navbarSupportedContent"
            navbar
          >
            <Nav className="w-100 nav-justified" navbar>
              <NavItem className="topLinks">
                <NavLink className="nav-link" to="/">
                  <Button
                    className="btn btn-lg btn-block text-nowrap navBtn"
                    onClick={this.state.isOpen ? this.toggle : null}
                  >
                    HOME
                  </Button>
                </NavLink>
              </NavItem>

              <NavItem className="topLinks">
                <NavLink className="nav-link" to={`/finder/mushrooms`}>
                  <Button
                    className="btn btn-lg btn-block text-nowrap navBtn"
                    onClick={this.state.isOpen ? this.toggle : null}
                  >
                    {/* <img height="35px" width="35px" src="../imgs/mushrooms.svg" /> */}
                    MUSHROOMS
                  </Button>
                </NavLink>
              </NavItem>

              <NavItem className="topLinks">
                <NavLink className="nav-link" to={`/finder/fruit`}>
                  <Button
                    className="btn btn-lg btn-block text-nowrap navBtn"
                    onClick={this.state.isOpen ? this.toggle : null}
                  >
                    {/* <img height="35px" width="35px" src="../imgs/fruit.svg" /> */}
                    FRUIT
                  </Button>
                </NavLink>
              </NavItem>

              <NavItem className="topLinks">
                <NavLink className="nav-link" to={`/finder/berries`}>
                  <Button
                    className="btn btn-lg btn-block text-nowrap navBtn"
                    onClick={this.state.isOpen ? this.toggle : null}
                  >
                    {/* <img className="" height="35px" width="35px" src="../imgs/berries.svg" /> */}
                    BERRIES
                  </Button>
                </NavLink>
              </NavItem>

              <NavItem className="topLinks">
                <NavLink className="nav-link" to={`/finder/alliums`}>
                  <Button
                    className="btn btn-lg btn-block text-nowrap navBtn"
                    onClick={this.state.isOpen ? this.toggle : null}
                  >
                    {/* <img className="" height="35px" width="35px" src="../imgs/berries.svg" /> */}
                    ALLIUMS
                  </Button>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
