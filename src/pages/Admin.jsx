import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { productState } from '../stores/products/atom';
import { authState, userState, } from '../stores/auth/atom';
import '../style/Admin.css';

function Admin() {
    const productList = useRecoilValue(productState);
    const userList = useRecoilValue(userState);
    const { userId } = useRecoilValue(authState);
    const resetAuth = useResetRecoilState(authState);
    const navigate = useNavigate();
    const user = userList.find(
        (user) => user.id === userId);
    console.log(userList)

    const products = productList.map((product) => (
        <section className="list-item-admin" key={product.id}>
            <Link to={`/products/${product.id}`}>
                <div className='image-container-admin'>
                    <img src={product.image} />
                    <h5 className='h2-admin'>{product.title} {product.price}$</h5>
                </div></Link>
        </section>
    ))

    const users = userList.map((user) => (
        <section className="user-list" key={user.id}>
            <h3 className='h3-admin'>👨 {user.name.firstname} {user.name.lastname} ({user.username})</h3>
            <h3 className='h3-admin'>🏠 {user.address.street} {user.address.number}, {user.address.zipcode} {user.address.city}</h3>
            <h3 className='h3-admin'>📧 {user.email}</h3>
            <h3 className='h3-admin'>📞 {user.phone}</h3>
        </section>

    ))

    useEffect(() => {
        if (!user || user.role != "admin") {
            navigate("/login")
        }
    })

    function logout() {
        resetAuth()
        navigate(`/`)
    }

    return (
        <div>
            <main className='main-admin'>
                <div className='admin-headline'>
                    <h1 className='h1-admin'>Alla produkter</h1>
                    <button className='admin-logout-button' onClick={() => logout()}>Logga ut</button>
                </div>
                <div className="admin-products">
                    {products}
                </div>
                <h1 className='h1-admin'>Alla användare</h1>
                <div className="admin-users">
                    {users}
                </div>
            </main>
        </div>
    )
}

export default Admin