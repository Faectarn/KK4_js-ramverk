import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { cartListStatsState } from '../stores/products/atom';
import { authState, userState } from "../stores/auth/atom";
import '../style/Navbar.css';

function Navbar() {
  const { itemsInCart, totalItemsInCart } = useRecoilValue(cartListStatsState);
  const { userId } = useRecoilValue(authState);
  const users = useRecoilValue(userState);
  const userData = users.find(
    (user) => user.id === userId)

  function changeNavPage() {
    if (userId === null) {
      return (
        <Link to="/login">LOGIN</Link>
      )
    }
    else if (userData.role === "admin") {
      return (
        <Link to="/admin">ADMIN</Link>
      )
    }
    else {
      return (
        <Link to="/profile">PROFIL</Link>
      )
    }
  }

  return (
    <header className="navbar">
      <h1 className="h1-navbar">WEBGIGANTEN</h1>
      <div className="navmenu">
        <Link to="/">HEM</Link>
        <Link to="/products">PRODUKTER</Link>
        <Link to="/cart">VARUKORG <small>{itemsInCart > 0 && `${totalItemsInCart}`}</small></Link>
        {changeNavPage()}
      </div>
    </header>
  );
}

export default Navbar;