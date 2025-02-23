import React from "react";
import Menuitems from "./Menuitems";
import Mdata from "./Mdata";
import styled from "styled-components";

const Menu = ({ innerPage }) => {
  return (
    <Wrapper>
      {!innerPage && (
        <h1 className="menu-heading wrapper-background">
          Snacks <span className="menu-sub-heading">Menu</span>
        </h1>
      )}
      <div className="container">
        <div className="products-container">
          <div className="products">
            {Mdata.map((menu, index) => (
              <Menuitems
                key={index}
                id={menu.id}
                imgsrc={menu.imgsrc}
                pname={menu.pname}
                price={menu.price}
              />
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .menu-heading {
    text-transform: uppercase;
    font-size: 3rem;
    text-align: center;
    .menu-sub-heading {
      color: ${({ theme }) => theme.colors.bg};
    }
  }
  .products-container {
    margin: 5rem 0;
    .sec-heading {
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 500;
      text-transform: uppercase;
    }
    .products {
      display: flex;
      flex-flow: wrap;
      align-items: flex-start;
      justify-content: center;
      row-gap: 3rem;
      column-gap: 1.5rem;
    }
  }
  @media only screen and (min-width: ${({ theme }) => theme.media.tab}) {
    .menu-heading {
      font-size: 4rem;
    }
    .products-container {
      margin: 10rem 0;
      .products {
        display: flex;
        flex-flow: wrap;
        align-items: flex-start;
        justify-content: center;
        column-gap: 3rem;
        row-gap: 4.5rem;
      }
    }
  }
`;

export default Menu;
