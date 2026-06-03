import { socialProofBar } from "@/data/scentmason";

export default function SocialProofBar() {
  return (
    <section className="bg-[var(--primary)] px-4 py-5">
      <div className="mx-auto w-full max-w-[430px]">
        <p className="text-center text-sm font-black leading-6 text-[var(--background)]">
          ✨ {socialProofBar.text}
        </p>
      </div>
    </section>
  );
}
