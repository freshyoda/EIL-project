import { MapPin, Calendar, Users, Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Statistics() {

  return (
    <section className="bg-parallax py-20 text-white relative h-[400px]" style={{ backgroundImage: `url("./src/assets/blueBackground.png")` }}>
      <div className=" flex justify-center items-center h-full gap-[150px] text-white">
        <div className = "flex flex-col items-center border-r-2 pr-[100px] border-white">
          <img src="./src/assets/icon_globe.png" alt="" className="w-[100px] h-auto"/>
          <p className="text-[40px]">27</p>
          <p>OVERSEAS LOCATIONS</p>
        </div>
        <div className = "flex flex-col items-center border-r-2 pr-[100px] border-white">
          <img src="./src/assets/icon2_operations.png" alt="" className="w-[100px] h-auto"/>
          <p className="text-[40px]">60</p>
          <p>Years In Operations</p>
        </div>
        <div className = "flex flex-col items-center border-r-2 pr-[100px] border-white">
          <img src="./src/assets/icon3_employee.png" alt="" className="w-[100px] h-auto"/>
          <p className="text-[40px]">2800</p>
          <p>Employees</p>
        </div>
        <div className = "flex flex-col items-center">
          <img src="./src/assets/icon4_assignments.png" alt="" className="w-[100px] h-auto"/>
          <p className="text-[40px]">7000+</p>
          <p>Assignments</p>
        </div>
      </div>
    </section>
  );
}