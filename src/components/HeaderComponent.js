import React, { Component } from 'react';
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem,
    // NavbarText
} from 'reactstrap';


class Header extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     isOpen: false
        // };

        // this.toggle = this.toggle.bind(this);
    }

    // toggle() {
    //     this.setState({
    //       isOpen: !this.state.isOpen
    //     });
    //   }

    render() {
        return (
            <div className="header">
                <Navbar className="navbar-expand-md sticky-top py-0 px-8">
                    {/* <!-- <img className="img-fluid py-1" src="images/favicon_crop.png" id="logo"
                        alt="ACI logo, a pyramid of stacked gold bars"> --> */}

                    {/* <img src="img/icon.svg" height="50px" className="m-1" /> */}

                    <NavbarBrand className="mb-2" href="index.html">
                        <div id="logoText">
                            iForager
                        </div>
                    </NavbarBrand>


                    <NavbarToggler onClick={this.props.toggle} type="Button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation" id="toggler">
                        <span>MENU</span>
                    </NavbarToggler>

                    <Collapse isOpen={this.props.isOpen} className="navbar-collapse" id="navbarSupportedContent" navbar>
                        <Nav className="w-100 nav-justified" navbar>

                            <NavItem className="topLinks">
                                <NavLink href="index.html">
                                    <Button className="btn btn-lg btn-block text-nowrap navBtn">
                                        HOME
                                    </Button>
                                </NavLink>
                            </NavItem>

                            <NavItem className="topLinks">
                                <NavLink href="mushrooms.html">
                                    <Button className="btn btn-lg btn-block text-nowrap navBtn">
                                        {/* <img height="35px" width="35px" src="img/mushroom.svg" /> */}
                                        MUSHROOMS
                                    </Button>
                                </NavLink>
                            </NavItem>

                            <NavItem className="topLinks">
                                <NavLink href="fruit.html">
                                    <Button className="btn btn-lg btn-block text-nowrap navBtn">
                                        {/* <img height="35px" width="35px" src="img/fruit.svg" /> */}
                                        FRUIT
                                    </Button>
                                </NavLink>
                            </NavItem>

                            <NavItem className="topLinks">
                                <NavLink href="berries.html">
                                    <Button className="btn btn-lg btn-block text-nowrap navBtn">
                                        {/* <Img height="35px" width="35px" src="img/berry.svg" /> */}
                                        BERRIES
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