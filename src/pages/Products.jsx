import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';
import { productState, cartState, categoryState } from '../stores/products/atom';
import '../style/Products.css';

function Products() {
    const productList = useRecoilValue(productState);
    const categoryList = useRecoilValue(categoryState);
    const [cartItems, setCartItems] = useRecoilState(cartState);
    const [selectedCategory, setSelectedCategory] = useState("");

    console.log(productList)

    function addItem(productId) {
        setCartItems((prevCartState) => {
            const newState = [...prevCartState]
            const index = newState.findIndex((value) => value.id == productId);
            if (index == -1) {
                newState.push({ id: productId, amount: 1 })
            }
            else {
                const newAmount = newState[index].amount + 1;
                newState[index] = { ...newState[index], amount: newAmount };
            }
            return newState
        });
    };

    function selectCategory(category) {
        if (category === selectedCategory) {
            setSelectedCategory("");
        }
        else {
            setSelectedCategory(category);
        }
    }

    const categories = categoryList.map((category) => {
        let buttonClass = "category-button"
        if (category === selectedCategory) {
            buttonClass += " selected-category-button"
        }
        return (
            <section key={category}>
                <button className={buttonClass} onClick={() => selectCategory(category)}>{category}</button>
            </section>
        )
    })

    const products = productList.map((product) => {
        if (selectedCategory != "" && selectedCategory != product.category) {
            return null
        }
        return (
            <section className="list-item" key={product.id}>
                <Link to={`/products/${product.id}`}>
                    <img src={product.image} />
                    <div className='headline'>
                        <h2 className='h2-products'>{product.title}</h2>
                        <h3 className='h3-products'>{product.price}$</h3>
                    </div></Link>
                <button className="add" onClick={() => addItem(product.id)}>Lägg till</button>
            </section>
        )
    })

    return (
        <main className='main-product'>
            <h1 className='h1-products'>Våra produkter</h1>
            <div className='categories'>{categories}</div>
            <div className="product-list">
                {products}
            </div>
        </main>
    )
}

export default Products