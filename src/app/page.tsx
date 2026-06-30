import HeroCarousel from "@/components/scentmason/HeroCarousel";
import PainSection from "@/components/scentmason/PainSection";
import SocialProofBar from "@/components/scentmason/SocialProofBar";
import ProductIntro from "@/components/scentmason/ProductIntro";
import HowItWorks from "@/components/scentmason/HowItWorks";
import DiffuserGraveyard from "@/components/scentmason/DiffuserGraveyard";
import WhatsInTheBox from "@/components/scentmason/WhatsInTheBox";
import FragranceCard from "@/components/scentmason/FragranceCard";
import ComparisonTable from "@/components/scentmason/ComparisonTable";
import OrderForm from "@/components/scentmason/OrderForm";
import FulfilmentTrust from "@/components/scentmason/FulfilmentTrust";
import FAQSection from "@/components/scentmason/FAQSection";
import StickyBottomBar from "@/components/scentmason/StickyBottomBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] pb-28">
      <HeroCarousel />
      <PainSection />
      <SocialProofBar />
      <ProductIntro />
      <HowItWorks />
      <DiffuserGraveyard />
      <WhatsInTheBox />
      <ComparisonTable />
      <FragranceCard/>
      <OrderForm />
      <FulfilmentTrust />
      <FAQSection />
      <StickyBottomBar />
    </main>
  );
}