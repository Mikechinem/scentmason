export default function GuestMagnetCard() {
  const tickerItems = [
    "😍 They'll ask what smells this good",
    "🚪 \"Just five minutes\" turns into an hour",
    "🏡 Your home becomes the one they remember",
    "💬 \"Can I come back again soon?\"",
    "✨ The compliment you'll hear every single visit",
  ];

  return (
    <div className="px-4">
      <div className="guest-magnet-glow relative mx-auto max-w-[520px] overflow-hidden rounded-2xl border-2 border-[#3B1F0E] bg-gradient-to-br from-[#EFBF04] to-[#BF9903] px-5 py-6 shadow-lg sm:px-7 sm:py-8">

  {/* Eyebrow badge */}
  <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-[#FF0000]/10 px-3 py-1">
    <span className="h-1.5 w-1.5 rounded-full bg-[#FF0000] guest-magnet-dot" />
    <p className="text-[11px] font-bold uppercase tracking-widest text-[#FFFFFF]">
      Fair Warning
    </p>
  </div>

  {/* Headline */}
  <h3 className="mt-3 text-center text-[30px] font-black leading-snug tracking-tight text-[#FF0000] sm:text-[26px]">
    Your Guests May Never Want To Leave
  </h3>

  <p className="mt-2 text-center text-[18.5px] font-medium leading-relaxed text-[#000000]/75 sm:text-[15px]">
    This machine makes your space so inviting, people stay longer
    than planned...and always ask what smells so good.
  </p>

  {/* Scrolling ticker */}
  <div className="guest-magnet-ticker-mask mt-5 overflow-hidden border-y border-[#3B1F0E]/15 py-2.5">
    <div className="guest-magnet-ticker-track flex w-max gap-8">
      {[...tickerItems, ...tickerItems].map((item, index) => (
        <span
          key={index}
          className="whitespace-nowrap text-[15px] font-semibold text-[#3B1F0E] sm:text-[14px]"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
</div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes guestMagnetGlowPulse {
              0%, 100% { box-shadow: 0 0 0 0 rgba(193, 127, 74, 0.35); }
              50% { box-shadow: 0 0 0 8px rgba(193, 127, 74, 0); }
            }
            .guest-magnet-glow {
              animation: guestMagnetGlowPulse 2.4s ease-out infinite;
            }
            @keyframes guestMagnetDotBlink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
            .guest-magnet-dot {
              animation: guestMagnetDotBlink 1.4s ease-in-out infinite;
            }
            @keyframes guestMagnetScroll {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .guest-magnet-ticker-track {
              animation: guestMagnetScroll 18s linear infinite;
            }
            .guest-magnet-ticker-mask {
              mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
            }
          `,
        }}
      />
    </div>
  );
}