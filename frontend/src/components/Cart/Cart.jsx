import React, { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import styled from "styled-components";
import CartItem from "./CartItem";
import Context from "../../Context";
import api from "../../api/api"; // Import the configured Axios instance

function parseCurrency(number) {
  return number.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

const Cart = ({ setShowCart }) => {
  const { context, setContext } = useContext(Context);
  const [total, setTotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < context.cart.length; i++) {
      total += context.cart[i].price * context.cart[i].quantity;
    }
    setTotal(total);
  }, [context]);

  const handleCheckout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        alert("Please login to place an order");
        return;
      }

      const orderData = {
        userId: user.id,
        items: context.cart.map((item) => ({
          menuItemId: item.id,
          name: item.pname,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
      };

      const response = await api.post("/orders", orderData);
      console.log("Order placed:", response.data);
      setOrderPlaced(true);
      setContext(prevContext => ({
        ...prevContext,
        cart: []
      }));
      setTimeout(() => {
        setOrderPlaced(false);
        setShowCart(false);
      }, 3000);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <Wrapper>
      <div className="cart-panel">
        <div className="opac-layer"></div>
        <div className="cart-content">
          <div className="cart-header">
            <span className="heading">Shopping Cart</span>
            <span className="close-btn" onClick={() => setShowCart(false)}>
              <MdClose />
              <span className="text">close</span>
            </span>
          </div>
          <CartItem />
          <div className="cart-footer">
            <div className="subtotal">
              <div className="text">Subtotal:</div>
              <div className="text total">{parseCurrency(total)}</div>
            </div>
            <div className="button">
              <button className="checkout-cta" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      {orderPlaced && (
        <div className="order-placed-popup">
          <div className="popup-content">
            <span>Order Placed Successfully!</span>
          </div>
        </div>
      )}
    </Wrapper>
  );
};


const Wrapper = styled.section`
  .cart-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    z-index: 99;
    width: 100%;
    .opac-layer {
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .cart-content {
      width: 100%;
      height: 100%;
      background: #fff;
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      animation: slideCartWindow 0.3s ease forwards;
      .cart-header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 20px 15px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        .heading {
          flex-grow: 1;
          margin-bottom: 0;
          font-size: 20px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .close-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          svg {
            font-size: 18px;
          }
          .text {
            text-transform: uppercase;
            font-size: 14px;
          }
          &:hover {
            opacity: 0.5;
          }
        }
      }
      .empty-cart {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        margin-top: 100px;
        svg {
          font-size: 100px;
          opacity: 0.1;
        }
        .return-cta {
          outline: 0;
          border: 0;
          height: 40px;
          width: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          font-size: 13px;
          color: #fff;
          background-color: #047352;
          border-bottom: 3px solid #003021;
        }
      }
      .cart-footer {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        .subtotal {
          padding: 20px 15px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          .text {
            margin-bottom: 0;
            font-size: 20px;
            font-weight: 700;
            text-transform: uppercase;
            &.total {
              color: ${({ theme }) => theme.colors.bg};
            }
          }
        }
        .button {
          padding: 20px 15px;
          .checkout-cta {
            outline: 0;
            border: 0;
            height: 50px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            cursor: pointer;
            font-size: 16px;
            color: #fff;
            background-color: ${({ theme }) => theme.colors.bg};
            border-radius: 1rem;
          }
        }
      }
    }
  }

  @keyframes slideCartWindow {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @media only screen and (min-width: ${({ theme }) => theme.media.tab}) {
    .cart-panel {
      .cart-content {
        width: 34rem;
        height: 100%;
      }
    }
  }

  .order-placed-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #4caf50;
    color: white;
    padding: 20px 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: fadeIn 0.3s ease-in-out;
  }

  .popup-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .popup-content span {
    font-size: 18px;
    font-weight: 500;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  /* Optional: Add a checkmark icon */
  .popup-content::before {
    content: "✓";
    font-size: 24px;
    font-weight: bold;
  }
`;

export default Cart;
