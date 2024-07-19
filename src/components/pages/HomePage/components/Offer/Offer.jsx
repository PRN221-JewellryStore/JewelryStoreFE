export const Offer = () => {
  return (
    <div
      className="offer bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(src/assets/image/b2.jpg)` }}
    >
      <div className="flex justify-center">
        <div className="text-center max-w-full py-12 px-4">
          <h3 className="text-5xl mb-6">
            <span className="text-red-600">Up To 50%</span> Off
          </h3>
          <h4 className="text-3xl mb-4">Winter Sale</h4>
          <p className="text-yellow-400 mb-4">Him she'd let them sixth saw light</p>
          <button className="border border-black rounded-full font-medium px-12 py-3 bg-black text-white transition duration-400 hover:bg-transparent hover:text-black mt-3 md:mt-4">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};
