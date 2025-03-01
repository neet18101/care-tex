import Footer from "./components/common/Footer/Footer";
import AboutSection from "./components/common/HomeSection/AboutSection";
import CounterSection from "./components/common/HomeSection/CounterSection";
import HomeContact from "./components/common/HomeSection/HomeContact ";
import MapSection from "./components/common/HomeSection/MapSection";
import OurPartners from "./components/common/HomeSection/OurPartner";
import ProductCatalogue from "./components/common/HomeSection/ProductCatalogue ";
import ShopByCategory from "./components/common/HomeSection/ShopByCategory";
import HomeSlider from "./components/common/HomeSlider/HomePageSlider";
import Navbar from "./components/common/Navbar/Navbar";


export default function Home() {
  return (
    <>
    <Navbar/>
      <HomeSlider />
      <HomeContact />
      <AboutSection />
      <CounterSection />
      <ShopByCategory />
      <ProductCatalogue />
      <OurPartners/>
      <MapSection/>
      <Footer/>
    </>
  );
}


export const metadata = {
  title: "Welcome to Care-tex",
  description: "Generated by create next app",
};