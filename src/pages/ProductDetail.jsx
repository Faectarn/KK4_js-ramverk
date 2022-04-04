import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { productState } from "./../stores/products/atom";
import '../style/ProductDetail.css';

function ProductDetail() {
  const params = useParams();
  const products = useRecoilValue(productState);
  const product = products.find(
    (product) => product.id === parseInt(params.productId));

  useEffect(() => {
    fetch(`https://k4backend.osuka.dev/products/${params.productId}`)
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  return (
    <main className="main-product-detail">
      <Link to="/products/"><button className="back">Tillbaka</button></Link>
      <h1 className="h1-product-detail">{product.title}</h1>
      <section className="detailed-section">
        <img className="detailed-image" src={product.image} />
        <div className="description">
          <h2 className="h2-product-detail">{product.description}</h2>
          <h2 className="h2-product-detail">Pris: {product.price}$</h2>
          <h2 className="h2-product-detail">Betyg: {product.rating.rate} ({product.rating.count} användare) </h2>
        </div>
      </section>
    </main>
  )
}

export default ProductDetail;