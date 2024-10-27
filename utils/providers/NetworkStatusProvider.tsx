"use client";
import { createContext } from "react";
import React, { useEffect } from "react";
import useNetwork from "@/hooks/useNetwork";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

export const NetworkStatusContext = createContext<boolean>(true);

const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const isOnline = useNetwork();

  useEffect(() => {
    let toastId;
    if (!isOnline) {
      toastId = toast.custom(
        <div style={{
          display:"flex",
          flexDirection:'row',
          color:'#d82828',
          gap:'8px',
          background:'#ffe7e7',
          padding:'8px',
          borderRadius:'5px'
        }}>
          <Oval
            width={20}
            height={20}
            color="#d82828"
            strokeWidth={4}
            secondaryColor="#ffe7e7"
          />
          <p>{"You'r offline!"}</p>
        </div>,
        {
          duration: Infinity,
        }
      );
    } else {
      toast.dismiss(toastId);
    }
  }, [isOnline]);

  return (
    <div className="w-full h-full">
      <NetworkStatusContext.Provider value={isOnline}>
        {children}
      </NetworkStatusContext.Provider>
    </div>
  );
};

export default NetworkStatusProvider;
