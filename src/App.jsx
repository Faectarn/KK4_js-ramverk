import React, { Suspense, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { productState, categoryState } from "./stores/products/atom";
import { authState, userState } from "./stores/auth/atom";
import "./App.css";
import Navbar from "./partials/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyErrorBoundary from "./components/MyErrorBoundary";
import Admin from "./pages/Admin";
import Register from "./pages/Register";

function App() {
  const { token } = useRecoilValue(authState);
  const setProducts = useSetRecoilState(productState);
  const setUsers = useSetRecoilState(userState);
  const setCategories = useSetRecoilState(categoryState);

  useEffect(() => {
    fetch("https://k4backend.osuka.dev/products")
      .then((res) => res.json()) 
      .then((json) => setProducts(json));
  }, []);

  useEffect(() => {
    fetch('https://k4backend.osuka.dev/products/categories')
      .then(res => res.json())
      .then((json) => setCategories(json));
  }, []);

  useEffect(() => {
    fetch('https://k4backend.osuka.dev/users')
      .then(res => res.json())
      .then((json) => setUsers(json))
  }, []);

  useEffect(() => {
    if (token) console.log("Användaren är inloggad");
    if (!token) console.log("Användaren är inte inloggad");
  }, [token])

  return (
    <MyErrorBoundary>
      <Suspense fallback={<div>Laddar..</div>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </MyErrorBoundary>
  );
}

export default App;
