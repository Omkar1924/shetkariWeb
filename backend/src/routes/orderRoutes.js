const express = require("express");
const router = express.Router();
const { Order } = require("../../database/models");

// Constants for order status
const ORDER_STATUS = {
  PLACED: "Placed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

// ✅ Create a new order
router.post("/orders", async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  // Validate request data
  if (!userId || !items.length || !totalAmount) {
    return res.status(400).json({ message: "Missing required fields: userId, items, totalAmount" });
  }

  try {
    const order = await Order.create({
      userId,
      items: JSON.stringify(items), // Store items as JSON since menu is static
      totalAmount,
      status: ORDER_STATUS.PLACED,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get all orders (for admin panel)
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll();
    
    const formattedOrders = orders.map((order) => {
      let parsedItems;
      try {
        parsedItems = typeof order.items === "string" ? JSON.parse(order.items) : order.items; // ✅ Check if it's already an object
      } catch (error) {
        console.error("Error parsing items for order ID:", order.id, error);
        parsedItems = []; // Fallback to empty array
      }

      return {
        ...order.toJSON(),
        items: parsedItems,
      };
    });

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// ✅ Mark an order as completed
router.put("/orders/:id/complete", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = ORDER_STATUS.COMPLETED;
    await order.save();

    res.status(200).json({ message: "Order marked as completed", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Delete an order
router.delete("/orders/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
