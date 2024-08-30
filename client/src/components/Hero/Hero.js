import React from "react";
import book from "../../img/4807.jpg";
const Hero = () => {
  return (
    <div className="flex md:flex-row flex-col md:order-1 order-5 mt-28 md:justify-center md:items-center space-x-7 container mx-auto md:px-20 px-4 text-lg">
      <div className="lg:w-1/2 h-full space-y-12">
        <h1 className="text-4xl font-semibold">
          Hello, welcomes here to learn something{" "}
          <span className="text-pink-400">new EveryDay !!</span>
        </h1>
        <p>
          Welcome to our advanced authentication system, where security and
          simplicity converge. Our platform is designed to ensure that every
          access request is meticulously verified, providing a seamless
          experience while safeguarding sensitive information. With
          state-of-the-art encryption and robust verification processes, we
          guarantee that only authorized users can access your data.
        </p>
      </div>
      <div className="lg:w-1/2 mt-7 md:mt-0  ">
        <img
          src={book}
          className="order-1 rounded-lg"
          alt="book image"
          srcset=""
        />
      </div>
    </div>
  );
};

export default Hero;
