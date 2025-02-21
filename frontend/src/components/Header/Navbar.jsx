import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <div className="menuIcon">
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul className={`navbar-list ${isOpen ? "open" : ""}`}>
          <li>
            <NavLink className="navbar-link" to="/" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
          </li>
          <li className="dropdown">
            <NavLink className="navbar-link" to="#">
              Menu
            </NavLink>
            <ul className="dropdown-content">
              <li>
                <NavLink className="navbar-link" to="/menu/juice" onClick={() => setIsOpen(false)}>
                  Juice
                </NavLink>
              </li>
              <li>
                <NavLink className="navbar-link" to="/menu/snacks" onClick={() => setIsOpen(false)}>
                  Snacks
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink className="navbar-link" to="/blog" onClick={() => setIsOpen(false)}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/about" onClick={() => setIsOpen(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" to="/account" onClick={() => setIsOpen(false)}>
              Account
            </NavLink>
          </li>
        </ul>
      </div>
    </Nav>
  );
};

const Nav = styled.nav`
  .menuIcon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  .hamburger {
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.white};
  }

  .navbar-list {
    list-style: none;
    display: none;
    flex-direction: column;
    gap: 1.5rem;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.bg};
    padding: 1rem;
    z-index: 100;
  }

  .navbar-list.open {
    display: flex;
  }

  .navbar-link {
    font-size: 1.7rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;

    &:hover {
      color: ${({ theme }) => theme.colors.helper};
      transition: all 0.3s linear;
    }
  }

  .dropdown {
    position: relative;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: ${({ theme }) => theme.colors.bg};
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  @media only screen and (min-width: ${({ theme }) => theme.media.tab}) {
    .hamburger {
      display: none;
    }

    .navbar-list {
      display: flex;
      flex-direction: row;
      position: static;
      background: none;
    }
  }
`;

export default Navbar;
