import React from "react";

const Slide = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black">
      <div className="flex space-x-4 p-4">
        <div className="w-1/4 flex-shrink-0 bg-opacity-50 bg-black p-2">
          <img className="w-full h-auto max-w-full" src="src/assets/image/p1.png" alt="" />
        </div>
        <div className="w-1/4 flex-shrink-0 bg-opacity-50 bg-black p-2 mt-2 sm:mt-0">
          <img className="w-full h-auto max-w-full" src="src/assets/image/p2.png" alt="" />
        </div>
        <div className="w-1/4 flex-shrink-0 bg-opacity-50 bg-black p-2 mt-2 sm:mt-0">
          <img className="w-full h-auto max-w-full" src="src/assets/image/p3.png" alt="" />
        </div>
        <div className="w-1/4 flex-shrink-0 bg-opacity-50 bg-black p-2">
          <img className="w-full h-auto max-w-full" src="src/assets/image/p1.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Slide;
