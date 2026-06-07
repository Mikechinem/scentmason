import HeroCarousel from "@/components/scentmason/HeroCarousel";
import PainSection from "@/components/scentmason/PainSection";
import SocialProofBar from "@/components/scentmason/SocialProofBar";
import ProductIntro from "@/components/scentmason/ProductIntro";
import HowItWorks from "@/components/scentmason/HowItWorks";
import WhatsInTheBox from "@/components/scentmason/WhatsInTheBox";
import ComparisonTable from "@/components/scentmason/ComparisonTable";
import OrderForm from "@/components/scentmason/OrderForm";
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
      <WhatsInTheBox />
      <ComparisonTable />
      <OrderForm />
      <FAQSection />
      <StickyBottomBar />
    </main>
  );
}