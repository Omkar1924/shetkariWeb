import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MdDelete, MdCheckCircle } from "react-icons/md";
import api from "../../api/api"; // Import the configured Axios instance
import Context from "../../Context";

const AdminOrderDashboard = () => {
  const { context, setContext } = useContext(Context);
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Delete an order
  const handleDeleteOrder = async (orderId) => {
    try {
      await api.delete(`/orders/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  // Mark an order as complete
  const handleCompleteOrder = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/complete`);
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: "completed" } : order
        )
      );
      alert("Order marked as complete!");
    } catch (error) {
      console.error("Error completing order:", error);
      alert("Failed to mark order as complete. Please try again.");
    }
  };

  return (
    <Wrapper>
      <h1>Admin Order Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} (Qty: {item.quantity})
                    </li>
                  ))}
                </ul>
              </td>
              <td>{parseCurrency(order.totalAmount)}</td>
              <td>{order.status}</td>
              <td>
                <button
                  className="complete-btn"
                  onClick={() => handleCompleteOrder(order.id)}
                  disabled={order.status === "completed"}
                >
                  <MdCheckCircle />
                  Complete
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  <MdDelete />
                  Delete 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

// Helper function to format currency
function parseCurrency(number) {
  return number.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

// Styled Components
const Wrapper = styled.section`
  padding: 2rem;
  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: ${({ theme }) => theme.colors.bg};
      color: white;
    }
    tr:hover {
      background-color: #f5f5f5;
    }
  }

  .complete-btn,
  .delete-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .complete-btn {
  width:10vw;
    background-color: #4caf50;
    color: white;
    &:hover:not(:disabled) {
      background-color: #45a049;
    }
  }

  .delete-btn {
    width:10vw;
    background-color: #f44336;
    color: white;
    // margin-left: 8px;
    margin-top: 1vh;
    &:hover {
      background-color: #e53935;
    }
  }
`;

export default AdminOrderDashboard;