import { useEffect, useState } from "react";
import { Banner, Offer, ProductListWithIntro, Slide } from "./components";
import { axiosClient } from "src/axios/AxiosClient";

const HomePage = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/Product/getall");
        console.log("API response:", response);
        const productList = response; // Giả sử data chứa danh sách sản phẩm
        setProductList(productList);
        console.log("Fetched product list:", productList);
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="home-page">
      <Banner />
      <Slide />
      <ProductListWithIntro
        description="Popular Item in the market"
        title="Trending"
        name="Product"
        products={productList}
      />
      <Offer />
    </main>
  );
};

export default HomePage;
