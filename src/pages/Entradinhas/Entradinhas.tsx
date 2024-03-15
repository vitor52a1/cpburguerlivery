import React, { useEffect, useState } from "react";
import { Button, CategoryList, Layout, ProductCard } from "../../components";
import { ProductCategories, ProductWrapper } from "../Hamburgers/Hamburgers.style";
import {
  ProductCardContent,
  ProductCardPrice,
} from "../../components/ProductCard/ProductCard.style";

export default function Entradinhas() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const priceFormat = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const getCategories = async () => {
    const url = "http://localhost:8000/categories";
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEntradinhas = async () => {
    const url = "http://localhost:8000/appetizers";
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      const initializedProducts = data.map((product) => ({
        ...product,
        selectedSize: null,
      }));
      setProducts(initializedProducts);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false)
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getEntradinhas();
  }, []);

  const handleSizeChange = (productId, size) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, selectedSize: size } : product
      )
    );
  };

  const handleAddToCart = (productId) => {
    
  };

  return (
    <Layout>
      <h1>Entradinhas</h1>
      <ProductCategories>
        {isLoading ? (
          <p>Carregando</p>
        ) : (
          categories.map((item, index) => (
            <CategoryList key={index} data={item} />
          ))
        )}
      </ProductCategories>
      <ProductWrapper>
        {isLoading ? (
          <p>Carregando</p>
        ) : (
          products.map((product, index) => (
            <ProductCard key={index}>
              <ProductCardContent>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`size_${product.id}`}
                      value="pequeno"
                      checked={product.selectedSize === "pequeno"}
                      onChange={() => handleSizeChange(product.id, "pequeno")}
                    />
                    Pequeno
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`size_${product.id}`}
                      value="grande"
                      checked={product.selectedSize === "grande"}
                      onChange={() => handleSizeChange(product.id, "grande")}
                    />
                    Grande
                  </label>
                </div>
                <Button onClick={() => handleAddToCart(product.id)}>Adicionar</Button>
              </ProductCardContent>
              <ProductCardPrice>{priceFormat(product.values)}</ProductCardPrice>
              <img src={product.image} alt={product.title} />
            </ProductCard>
          ))
        )}
      </ProductWrapper>
    </Layout>
  );
}
