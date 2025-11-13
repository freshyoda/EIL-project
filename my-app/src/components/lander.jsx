import Header from "../components/Header_lander.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import BusinessAreas from "../components/BusinessAreas.jsx";
import GlobalPresence from "../components/GlobalPresence.jsx";
import Statistics from "../components/Statistics.jsx";
import NewsSection from "../components/NewsSection.jsx";
import CSRGallery from "../components/CSRGallery.jsx";
import Footer from "../components/Footer_lander.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-white min-w-[100vw] text-black">
      <Header/>
      <div id = "start" className="w-full mx-auto">
        <video
          className="w-full"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="./src/assets/banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <BusinessAreas />
      <div>
        <img src="./src/assets/refinery.svg" alt="REFINERY" className = "pb-4 mb-4"/>
      </div>
      <GlobalPresence />
      <Statistics />
      <NewsSection />
      <CSRGallery />
      <Footer />
    </div>
  );
}