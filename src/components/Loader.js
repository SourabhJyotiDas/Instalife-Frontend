import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Loader = ({ message }) => {

  return (
    <div className="h-[100vh] w-[100%] flex flex-col items-center justify-center ">
      <AiOutlineLoading className="animate-spin h-5 w-5 " />
      <div className="text-xs md:text-sm">Please wait</div>
    </div>
  );
};

export default Loader;
