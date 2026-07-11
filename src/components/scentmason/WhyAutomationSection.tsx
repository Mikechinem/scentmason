export default function WhyAutomationSection() {
  return (
    <section className="px-4 py-10 text-center bg-white">
      <div className="mx-auto max-w-[560px]">
       <h2 className="text-[21px] font-extrabold leading-8 tracking-tight text-[#000000] sm:text-[26px] sm:leading-9">
  You Won&apos;t Always Remember To Spray. This Machine Doesn&apos;t Forget.
</h2>

<p className="mt-4 text-[18px] font-medium leading-relaxed text-black/70 sm:text-[18px]">
  Spray cans run out and get forgotten in a drawer. Plug-ins need a free
  socket by the door and stop the moment light goes. This one just
  works — quietly, automatically, for 60 days straight, whether you
  remember it exists or not.
</p>

        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <div className="rounded-lg border border-[#3B1F0E]/15 bg-[#FAF7F2] px-3 py-3.5">
            <p className="text-[14px] font-semibold text-[#3B1F0E] sm:text-[15px]">
              Set & Forget
            </p>
          </div>
          <div className="rounded-lg border border-[#3B1F0E]/15 bg-[#FAF7F2] px-3 py-3.5">
            <p className="text-[14px] font-semibold text-[#3B1F0E] sm:text-[15px]">
              No Drilling Needed
            </p>
          </div>
          <div className="rounded-lg border border-[#3B1F0E]/15 bg-[#FAF7F2] px-3 py-3.5">
            <p className="text-[14px] font-semibold text-[#3B1F0E] sm:text-[15px]">
              Works Without Nepa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}