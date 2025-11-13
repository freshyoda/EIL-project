import { ArrowRight } from "lucide-react";

export default function BusinessAreas() {
  return (
    <section className="pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid md:grid-cols-3 gap-8 justify-items-center">
          <div className="flex-col justify-items-center">
            <img src="./src/assets/sec1_business.png" alt="BUSINESS" className = "h-[150px] w-[150px] border-2 border-[#acc8df] rounded-[15px] p-[30px] mb-[30px]"/>
            <div className="font-bold text-black text-[25px]">BUSINESSES</div>

          </div>
          <div className="flex-col justify-items-center">
            <img src="./src/assets/sec2_projects.png" alt="PROJECTSS" className = "h-[150px] w-[150px] border-2 border-[#acc8df] rounded-[15px] p-[30px] mb-[30px]"/>
            <div className="font-bold text-black text-[25px]">PROJECTS</div>
          </div>
          <div className="flex-col justify-items-center">
            <img src="./src/assets/sec3_services.png" alt="SERVICES"  className = "h-[150px] w-[150px] border-2 border-[#acc8df] rounded-[15px] p-[30px] mb-[30px]"/>
            <div className="font-bold text-black text-[25px]">SERVICES</div>
          </div>
        </div>
      </div>
    </section>
  );
}