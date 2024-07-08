import React from "react";

const About = () => {
  const backgroundImageUrl = "/src/assets/image/about-img.jpg"; // Thay đổi đường dẫn đến ảnh của bạn

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        color: "white",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "800px" }}>
        <h1>About Diamond Shop</h1>
        <p>Welcome to our exquisite Diamond Shop, where brilliance meets elegance.</p>
        <p>At Diamond Shop, we are passionate about offering you the finest selection of diamonds, carefully curated to dazzle and delight.</p>
        <p>Our commitment to quality and craftsmanship ensures that each piece in our collection is a testament to timeless beauty and sophistication.</p>
        <p>Explore our range of stunning diamond jewelry, from classic engagement rings to statement necklaces and elegant bracelets.</p>
        <p>Whether you are celebrating a special occasion or simply treating yourself to something extraordinary, Diamond Shop promises a shopping experience like no other.</p>
        <p>Visit us today and discover the allure of diamonds at Diamond Shop.</p>
      </div>
    </div>
  );
};

export default About;
