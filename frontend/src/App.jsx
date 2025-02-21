import React, { useState } from "react";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Menu from "./components/Menu/Menu";
import Blog from "./components/Blog/Blog";
import Header from "./components/Header/Header";
import Newsletter from "./components/Footer/Newsletter";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import Account from "./components/Account/Account";
import Error from "./components/Error/Error";
import Context from "./Context";
import Admin from "./components/Admin/Admin"
import Amenu from "./components/Admin/Amenu";
import Orders from "./components/Admin/Orders";
import JMenu from "./components/Menu/JMenu"
import Login from "./components/Account/Login";
import AdminOrderDashboard from "./components/Account/AdminOrderDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24, 24, 29)",
      text: "rgb(24, 24, 29)",
      white: "#fff",
      black: "#212529",
      helper: "#EDE42F",
      bg: "#B8001F",
      btn: "#4c9a2a",
      btnHover: "#3b811c",
      footer_bg: "#0a1435",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#fff",
      gradient:
        "linear-gradient(0deg, rgb(132, 144, 255) 0%, rgb(98, 189, 252) 100%)",
      shadow:
        "rgba(0,0,0,0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: "rgba(0,0,0,0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  const [context, setContext] = useState({ cart: [] });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Context.Provider value={{ context, setContext }}>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
            <Route path="/admin" element={<AdminOrderDashboard/>} />
            {/* <Route path="/admin/menu" element={<Amenu />} /> */}
            {/* <Route path="/admin/orders" element={<Orders />} /> */}
            <Route path="/menu/snacks" element={<Menu />} />
            <Route path="/menu/juice" element={<JMenu />} />
            


          </Routes>
          <Newsletter />
          <Footer />
        </Context.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
