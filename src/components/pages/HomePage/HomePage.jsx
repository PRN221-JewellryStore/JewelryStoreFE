import React from "react";
import {Banner, ProductList, Slide} from "src/components"

const HomePage = () => {
  return (
    <main className="home-page">
      <Banner />
      <Slide />
      <ProductList />
      <ProductList />
      <ProductList />
    </main>
  );
};

export default HomePage;
