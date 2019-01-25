import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modelOpen: false,
    modelProduct: detailProduct,
    catSubTotal: 0,
    cartTex: 0,
    cartTotal: 0
  };
  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let products = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });
    this.setState({
      products: products
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState({
      detailProduct: product
    });
  };
  addToCart = id => {
    let products = [...this.state.products];
    let index = products.indexOf(this.getItem(id));
    const product = products[index];
    product.inCart = true;
    const price = product.price;
    product.total = price;
    this.setState({
      products: products,
      cart: [...this.state.cart, product]
    });
  };
  openModel = id => {
    const product = this.getItem(id);
    this.setState({
      modelProduct: product,
      modelOpen: true
    });
  };
  closeModel = () => {
    this.setState({
      modelOpen: false
    });
  };
  increment = id => {
    console.log("this is an increment method");
  };
  removeItem = id => {
    console.log("this is removed");
  };
  clearCart = () => {
    console.log("cart is cleared");
  };
  decrement = id => {
    console.log("this is an decrement method");
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModel: this.openModel,
          closeModel: this.closeModel,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
