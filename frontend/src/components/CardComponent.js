import React from "react";

const CardComponent = ({ img1, data }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="w-[90%] max-w-[500px] bg-[#023252] rounded-lg shadow-lg overflow-hidden">
        {/* Inner container with black background */}
        <div className="bg-black p-4">
          <div className="flex items-center mb-4">
            <div className="px-2">
              <span className="inline-block w-[15px] h-[15px] p-[2px] rounded-full bg-[#ff605c]"></span>
            </div>
            <div className="px-2">
              <span className="inline-block w-[15px] h-[15px] p-[2px] rounded-full bg-[#ffbd44]"></span>
            </div>
            <div className="px-2">
              <span className="inline-block w-[15px] h-[15px] p-[2px] rounded-full bg-[#00ca4e]"></span>
            </div>
          </div>

          {/* YouTube Video Element */}
          <div className="relative w-full h-[250px]">
            {/* <iframe
              className="w-full h-full object-cover rounded-t-lg"
              src="https://www.youtube.com/embed/Bt6TmXqRCb4?autoplay=1&mute=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe> */}
            <img src={img1} alt="pic"></img>
          </div>

          {/* Card Content */}
          <div className="p-4">
            <h5 className="mb-2 text-xl font-medium text-white">{data}</h5>
            {/* <p className="text-base text-gray-300">{data}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
