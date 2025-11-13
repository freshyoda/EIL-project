import { Globe, Building, Star } from "lucide-react";

export default function GlobalPresence() {
  return (
    <section className="flex justify-around items-center bg-white w-[70vw] m-auto">
      <div className="flex-col ">
        <h2 className="text-[40px] w-[300px] mb-5">Expanding Global <span className="text-[#588fc6]">Presence</span></h2>
        <div className="border-b-[2px] border-[#588fc6] w-[400px] pb-2 mb-3">Significant footprints in MENA Region</div>
        <div className="border-b-[2px] border-[#588fc6] w-[400px] pb-2 mb-3">Engineering Hub in Abu Dhabi</div>
        <div className="border-b-[2px] border-[#588fc6] w-[400px] pb-2 mb-3">Fortune 500 Clients</div>
      </div>
      <img src="./src/assets/map.gif" alt="globe" className="h-[400px]"/>
    </section>
  );
}