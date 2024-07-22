import { useEffect, useState } from "react";
import { Container, Input, Row, Col } from "reactstrap";
import { axiosClient } from "src/axios/AxiosClient";
import {
  BannerPath,
  PaginationComponent,
  ProductList,
  SelectBoxCustom,
} from "src/components";
import { RadioList } from "./components";

const sortOptions = [
  { key: "asc", value: "Tăng Dần" },
  { key: "desc", value: "Giảm Dần" },
];

export const ShopCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [productPage, setProductPage] = useState({
    data: [],
    totalElements: 0,
    totalPage: 0,
  });
  const [searchParams, setSearchParams] = useState({
    categoryId: null,
    name: "",
    sortByPrice: null,
    pageIndex: 1,
    pageSize: 6,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await axiosClient.get("/Category/getall");
      const products = await axiosClient.get("/Product/getall");

      const categoryCounts = categories.map((category) => {
        const count = products.filter((product) => product.categoryID === category.id).length;
        return { ...category, count };
      });

      setCategories(categoryCounts);
    };
    fetchCategories();
  }, []);

  const fetchAllProducts = async () => {
    const products = await axiosClient.get("/Product/getall");
    let sortedProducts = products;

    if (searchParams.sortByPrice) {
      sortedProducts = products.sort((a, b) => {
        return searchParams.sortByPrice === "asc" ? a.cost - b.cost : b.cost - a.cost;
      });
    }

    const paginatedProducts = sortedProducts.slice(
      (searchParams.pageIndex - 1) * searchParams.pageSize,
      searchParams.pageIndex * searchParams.pageSize
    );

    setProductPage({
      data: paginatedProducts,
      totalElements: sortedProducts.length,
      totalPage: Math.ceil(sortedProducts.length / searchParams.pageSize),
    });
  };

  const searchProducts = async () => {
    let url = "/Product";
    let params = {
      pageIndex: searchParams.pageIndex,
      pageSize: searchParams.pageSize,
    };
    if (searchParams.name) {
      url += `/search-by-name/${encodeURIComponent(searchParams.name)}`;
    } else if (searchParams.categoryId) {
      url += `/search-by-Category/${searchParams.categoryId}`;
    } else {
      await fetchAllProducts();
      return;
    }
    const products = await axiosClient.get(url, { params });

    let sortedProducts = products;
    if (searchParams.sortByPrice) {
      sortedProducts = products.sort((a, b) => {
        return searchParams.sortByPrice === "asc" ? a.cost - b.cost : b.cost - a.cost;
      });
    }

    const paginatedProducts = sortedProducts.slice(
      (searchParams.pageIndex - 1) * searchParams.pageSize,
      searchParams.pageIndex * searchParams.pageSize
    );

    setProductPage({
      data: paginatedProducts,
      totalElements: sortedProducts.length,
      totalPage: Math.ceil(sortedProducts.length / searchParams.pageSize),
    });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    searchProducts();
  }, [searchParams]);

  return (
    <main className="shop-category-page__main">
      <BannerPath title="Shop Category" path="Home - Shop Category" image="src/assets/image/slider-bg.jpg" />
      <Container className="max-w-[1140px] mt-[98px]">
        <div className="flex">
          <div className="w-1/4">
            <div className="sidebar">
              <div className="leading-[50px] bg-[#384aeb] px-[30px] text-[18px] font-normal text-white">
                Browse Categories
              </div>
              <div className="px-[28px] py-[20px] bg-[#f1f6f7] border-b border-[#eee] last:border-none">
                <RadioList
                  selected={searchParams.categoryId}
                  onSelect={(categoryId) => {
                    setSearchParams({ ...searchParams, categoryId, name: "" });
                  }}
                  data={categories.map(category => ({ id: category.id, name: category.name, count: category.count }))}
                />
              </div>
            </div>
          </div>
          <div className="w-3/4">
            <div className="bg-[#f1f6f7] p-4 mb-4 flex justify-between items-center w-full">
              <SelectBoxCustom
                className="w-1/4"
                data={sortOptions}
                selected={searchParams.sortByPrice}
                onSelectBoxChange={(sortByPrice) => {
                  setSearchParams({ ...searchParams, sortByPrice });
                }}
              />
              <Input
                className="max-w-[200px]"
                type="search"
                placeholder="Search here..."
                value={searchParams.name}
                onChange={(e) => {
                  setSearchParams({ ...searchParams, name: e.target.value });
                }}
              />
            </div>
            <ProductList products={productPage.data} xl="3" />
            <div className="flex justify-center mb-[50px] space-x-5">
              <PaginationComponent
                pageIndex={searchParams.pageIndex}
                onPageChange={(pageIndex) => {
                  setSearchParams({ ...searchParams, pageIndex });
                }}
                totalPage={productPage.totalPage}
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};
