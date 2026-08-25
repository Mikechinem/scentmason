"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/tracking/attribution";

import StoryHero from "@/components/scentmason/StoryHero";
import WallOrTable from "@/components/scentmason/WallOrTable";
import StoryExperience from "@/components/scentmason/StoryExperience";
import StoryConvenience from "@/components/scentmason/StoryConvenience";
import StoryBattery from "@/components/scentmason/StoryBattery";
import StorySocialProof from "@/components/scentmason/StorySocialProof";
import StoryOffer from "@/components/scentmason/StoryOffer";
import StoryOrderForm from "@/components/scentmason/StoryOrderForm";

export default function StoryPage() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <main>
      <StoryHero />
      <WallOrTable />
      <StoryExperience />


      <StoryConvenience />

      <StoryBattery />

      <StorySocialProof />

      <StoryOffer />

      <StoryOrderForm />

      {/* Contact */}
      <section className="mx-4 my-10 rounded-[2rem] bg-white px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5 sm:mx-10 sm:px-10 sm:py-16">
  <p className="mx-auto max-w-3xl text-[24px] font-semibold leading-[1.25] text-black sm:text-[34px]">
    For more enquiries, call us on{" "}
    <a
      href="tel:07064969603"
      className="inline-block font-black text-black underline decoration-black/30 underline-offset-4 transition hover:scale-[1.03]"
    >
      0706 496 9603
    </a>
  </p>
</section>

      {/* Facebook disclaimer */}
      <p className="mx-auto max-w-[720px] px-4 pb-14 text-center text-[11px] font-medium leading-5 text-black/40">
        This site is not part of the Facebook website, Facebook Inc, the
        Google website, or Alphabet Inc, and is not endorsed by Facebook or
        Google in any way. FACEBOOK and GOOGLE are trademarks of Facebook Inc
        and Alphabet Inc respectively.
      </p>
    </main>
  );
}