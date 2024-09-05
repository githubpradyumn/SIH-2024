import React from 'react';

const TwoCardComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="relative flex items-center justify-center w-[400px] rounded-[24px] transition-transform duration-[0.48s] ease-in-out hover:translate-y-[-16px]">
        <div className="relative flex flex-col items-start gap-[24px] p-[36px] rounded-[22px] text-white bg-[#0a3cff] overflow-hidden transition-all duration-[0.48s] ease-in-out">
          
          {/* Background Styles */}
          <div className="absolute top-[-4%] left-[50%] w-[90%] h-[90%] bg-[#ced8ff] -z-10 rounded-[22px] transition-all duration-[0.48s] ease-in-out transform -translate-x-[50%]"></div>
          <div className="absolute top-[-8%] left-[50%] w-[80%] h-[80%] bg-[#e7ecff] -z-20 rounded-[22px] transition-all duration-[0.48s] ease-in-out transform -translate-x-[50%]"></div>
          
          {/* Content */}
          <svg
            className="w-[48px] h-[48px]"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 9V5H4V9H20ZM20 11H4V19H20V11ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM5 12H8V17H5V12ZM5 6H7V8H5V6ZM9 6H11V8H9V6Z"
            ></path>
          </svg>
          <p className="text-[18px] z-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam
            at voluptas minus culpa deserunt delectus sapiente inventore pariatur
          </p>
          <a
            href="#!"
            className="text-[#fea000] text-[16px] z-10 hover:underline"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}

export default TwoCardComponent;
