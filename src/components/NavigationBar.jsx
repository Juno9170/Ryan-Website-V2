import React from "react";
import { useState, useRef } from "react";
const NavigationBar = () => {
  return (
    <div className="w-full fixed h-14 py-2 px-8">
      <div className="bg-[#EAEAEABF] h-full w-full rounded-full flex justify-between px-4 py-1">
        <div className="bg-lightGreen h-full items-center px-8 text-center justify-center rounded-full"></div>
        <div className="flex justify-between">
          <div className="flex items-center justify-center px-10">Home</div>
          <div className="flex items-center justify-center px-10">
            Experiences
          </div>
          <div className="flex items-center justify-center px-10">Contact</div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
