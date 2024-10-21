import Image from "next/image";
import React from "react";

const AuthBackground = ({authType}:{authType:string}) => {
  return (
    <div >
      <div className="absolute left-1/2 -translate-x-1/2 z-10 bg-white flex flex-col justify-center items-center rounded-lg top-1/2 -translate-y-[90%] overflow-hidden gap-2 py-3">
        <div className="flex flex-col justify-center items-center gap-1 min-w-[300px] bg-white shadow-md p-2 py-4">
          <Image
            src={"/assets/sharedata.png"}
            alt={"sharedataicone"}
            width={100}
            height={30}
          />
          <h2 className="text-2xl text-gray-700 font-bold">
            Connect authi to link
          </h2>
          <p className="text-center text-gray-400">
            connect with google github and credentials authentication system
          </p>
        </div>

        <div className="flex flex-col gap-1 items-start px-4 py-2 w-full shadow-md bg-white">
          <h3 className="text-gray-800 font-semibold">Authi would be like</h3>
          <div className="flex flex-col text-[14px] gap-1 text-gray-500">
            <div className="flex flex-row gap-1">
              <Image
                src={"/assets/circle-tick.svg"}
                alt=""
                width={20}
                height={20}
              />
              <p>2fa code</p>
            </div>
            <div className="flex flex-row gap-1">
              <Image
                src={"/assets/circle-tick.svg"}
                alt=""
                width={20}
                height={20}
              />
              <p>different user role</p>
            </div>
            <div className="flex flex-row gap-1">
              <Image
                src={"/assets/circle-tick.svg"}
                alt=""
                width={20}
                height={20}
              />
              <p>user access management</p>
            </div>
          </div>
        </div>
        <div className="w-full px-4 flex items-end justify-end">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors duration-300">
            {authType}
          </button>
        </div>
      </div>
      <Image
        fill
        src={"/assets/authi-overview.jpg"}
        alt={"authi-overview"}
        className="rounded-lg"
      />
      <p className="absolute -translate-x-1/2 left-1/2 bottom-28 text-white text-3xl text-center font-bold drop-shadow-md z-10">
        Authi is a simple web app with high security{" "}
      </p>
    </div>
  );
};
export default AuthBackground;
