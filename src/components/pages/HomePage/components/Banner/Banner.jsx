import { Container, Row, Col } from 'reactstrap';
import React from 'react';

export const Banner = () => {
  return (
    <div className="relative bg-center text-white py-20" style={{ backgroundImage: 'url(src/assets/image/slider-bg.jpg)'}}>
      <Container>
        <Row className="items-center">
          <Col xs="12" md="6" className="order-1 md:order-1 text-center md:text-left">
            <div className="p-5 md:p-10 rounded-lg bg-black bg-opacity-50">
              <h4 className="text-lg font-medium mb-2">Exquisite Jewelry</h4>
              <h1 className="text-4xl font-bold mb-4">Discover Our Premium Gemstones</h1>
              <p className="mb-6">
                Explore our exclusive collection of finely crafted gemstones. Our pieces are meticulously designed to bring out the inner sparkle in you.
              </p>
              <a
                className="inline-block border border-white rounded-full font-medium px-8 py-3 bg-white text-[#1e3c72] transition duration-300 hover:bg-transparent hover:text-white"
                href="/shop-category"
              >
                Shop Now
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
