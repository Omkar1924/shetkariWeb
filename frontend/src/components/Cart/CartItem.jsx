import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import styled from "styled-components";
import Context from "../../Context";

const CartProduct = ({ id, imgsrc, pname, price, quantity }) => {
  const { context, setContext } = useContext(Context);

  const updateQuantity = (type) => {
    if (type === "forward") {
      for (let i = 0; i < context.cart.length; i++) {
        if (context.cart[i].id === id) {
          let updatedCart = context.cart;
          updatedCart[i].quantity++;
          setContext({ ...context, cart: updatedCart });
          return;
        }
      }
    } else if (type === "backward") {
      for (let i = 0; i < context.cart.length; i++) {
        if (context.cart[i].id === id) {
          let updatedCart = context.cart;
          updatedCart[i].quantity--;
          if (updatedCart[i].quantity === 0) {
            updatedCart.splice(i, 1);
          }
          setContext({ ...context, cart: updatedCart });
          return;
        }
      }
    }
  };

  const removeItem = () => {
    let updatedCart = context.cart.filter((item) => item.id !== id);
    setContext({ ...context, cart: updatedCart });
  };

  return (
    <div className="cart-product">
      <div className="img-container">
        <img src={imgsrc} alt="" />
      </div>
      <div className="prod-details">
        <span className="name">{pname}</span>
        <MdClose className="close-btn" onClick={removeItem} />
        <div className="quantity-buttons">
          <span onClick={() => updateQuantity("backward")}>-</span>
          <span>{quantity}</span>
          <span onClick={() => updateQuantity("forward")}>+</span>
        </div>
        <div className="text">
          <span>{quantity}</span>
          <span>x</span>
          <span className="highlight">₹{price}</span>
        </div>
      </div>
    </div>
  );
};

const CartItem = () => {
  const { context } = useContext(Context);

  return (
    <Wrapper>
      <div className="cart-products">
        {context.cart.length > 0 ? (
          <>
            {context.cart.map((item, index) => (
              <CartProduct key={index} {...item} />
            ))}
          </>
        ) : (
          <p>No items in cart</p>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex-grow: 1;
  .cart-products {
    flex-grow: 1;
    .cart-product {
      padding: 20px 15px;
      display: flex;
      gap: 10px;
      .img-container {
        background-color: rgba(0, 0, 0, 0.05);
        width: 80px;
        height: 80px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        img {
          width: 90%;
          border-radius: 0.5rem;
        }
      }
      .prod-details {
        overflow: hidden;
        position: relative;
        .name {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 10px;
          font-weight: 600;
          display: block;
          padding-right: 25px;
        }
        .text {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          .highlight {
            color: ${({ theme }) => theme.colors.bg};
          }
        }
        svg {
          position: absolute;
          top: 0;
          right: 0;
          cursor: pointer;
          font-size: 1.5rem;
        }
        .quantity-buttons {
          width: fit-content;
          display: flex;
          border: 1px solid rgba(0, 0, 0, 0.2);
          height: 30px;
          margin-bottom: 8px;
          span {
            font-size: 14px;
            width: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #6b6b6b;
            &:nth-child(1) {
              font-size: 18px;
              border-right: 1px solid rgba(0, 0, 0, 0.2);
            }
            &:nth-child(2) {
              width: 40px;
            }
            &:nth-child(3) {
              font-size: 18px;
              border-left: 1px solid rgba(0, 0, 0, 0.2);
            }
          }
        }
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
`;

export default CartItem;
