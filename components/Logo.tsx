import Image from "next/image";
import React from "react";
// import xd from "../public/assets/Logo.png"

type logoProps = {
  height: number;
  width: number;
};

const Logo = ({ width, height }: logoProps) => {
  return (
    <div className="">
      <Image
      className=""
        src={"/assets/Logo.png"}
        height={height}
        width={width}
        alt="logo"
      />
    </div>
  );
};

export default Logo;
