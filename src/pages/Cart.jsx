import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { productState, cartState } from '../stores/products/atom';
import '../style/Cart.css';

function Cart() {
    const productsList = useRecoilValue(productState);
    const [cartItems, setCartItems] = useRecoilState(cartState);

    function getProductById(id) {
        const product = productsList.find(
            (product) => product.id === id
        );
        return product;
    }

    function removeCartItem(id) {
        setCartItems((prevCartState) => {
            const newState = [...prevCartState]
            const index = newState.findIndex((value) => value.id == id);
            if (index != -1) {
                const newAmount = newState[index].amount - 1;
                if (newAmount === 0) {
                    newState.splice(index, 1)
                }
                else {
                    newState[index] = { ...newState[index], amount: newAmount };
                }
            }
            return newState
        });
    }

    function addCartItem(id) {
        setCartItems((prevCartState) => {
            const newState = [...prevCartState]
            const index = newState.findIndex((value) => value.id == id);
            if (index != -1) {
                const newAmount = newState[index].amount + 1;
                if (newAmount === 0) {
                    newState.splice(index, 1)
                }
                else {
                    newState[index] = { ...newState[index], amount: newAmount };
                }
            }
            return newState
        });
    }

    const products = cartItems.map((item) => {
        const product = getProductById(item.id)
        return (
            <section className="cart-item" key={item.id}>
                <h3 className='h3-cart'>{product.title}</h3>
                <img src={product.image} />
                <h4 className='h4-cart'>{item.amount}x{product.price}={item.amount * product.price}$ </h4>
                <div className="cart-buttons">
                    <button className="cart-button" onClick={() => removeCartItem(item.id)}>-</button>
                    {item.amount}
                    <button className="cart-button" onClick={() => addCartItem(item.id)}>+</button>
                </div>

            </section>
        )
    })

    const getTotalPrice = () => {
        const initialValue = 0;
        const totalPrice = cartItems.reduce((previousValue, currentItem) => {
            const productInfo = getProductById(currentItem.id);
            const productPriceByAmount = currentItem.amount * productInfo.price;
            return previousValue + productPriceByAmount;
        }, initialValue);
        const dollarValue = 9.39; // omvandlat från dollar till kr enligt aktuell valuta
        return (totalPrice * dollarValue);
    };

    const totalPrice = ~~getTotalPrice();

    return (
        <main className='main-cart'>
            <section className='cart-section'>
                <h1 className='h1-cart'>Varukorg</h1>
                <h2 className='h2-cart'>
                    {cartItems.length === 0 && "Din varukorg är tom"}
                    {cartItems.length > 0 && `Produkter i korgen: ${cartItems.length}st`}
                </h2>
                <h2 className='h2-cart'>
                    {cartItems.length > 0 && `Summa att betala: ${totalPrice}kr`}
                </h2>
                <section className='cart-list'>
                    {products}
                </section>
            </section>
        </main>
    )
}

export default Cart