import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";
import { NavLink, useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersStart, searchUserStart } from "../redux/actions";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { users } = useSelector((state: any) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = dispatch(searchUserStart(searchTerm));
    const options = {
      pathname: "/",
    };
    setSearchTerm("");
    console.log(search);
    navigate(options, { replace: true });
  };

  return (
    <>
      <MDBNavbar expand='lg' light bgColor='primary'>
        <MDBContainer fluid>
          <MDBNavbarBrand className='text-white'>
            <span style={{ marginRight: "10px" }}>
              <MDBIcon fas icon='book-open' />
            </span>
            Contact
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls='navbar'
            aria-expanded='false'
            aria-label='Toggle navigation'
            className='text-white'
            onClick={() => setShowNav(!showNav)}
          >
            <MDBIcon fas icon='bars' />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNav}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink className='nav-link'>
                  <NavLink to='/' className='text-white'>
                    Home
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className='nav-link'>
                  <NavLink to='/addUser' className='text-white'>
                    Add User
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className='nav-link'>
                  <NavLink to='/about' className='text-white'>
                    About
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
              <input
                type='text'
                className='form-control'
                placeholder='Search Name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MDBBtn color='dark' type='submit'>
                Search
              </MDBBtn>
            </form>
            <MDBBtn
              color='info'
              style={{ marginLeft: "5px" }}
              onClick={() => dispatch(loadUsersStart())}
            >
              Reset
            </MDBBtn>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
