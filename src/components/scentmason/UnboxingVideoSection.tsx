"use client";

export default function UnboxingVideoSection() {
  return (
    <section className="w-full bg-white px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        {/* Eyebrow */}
        <p
          className="
            text-[25px]
            font-extrabold
            uppercase
            tracking-[0.22em]
            text-[#000000]

            sm:text-[25px]
          "
        >
          See It In Action
        </p>

        {/* Video */}
        <div
          className="
            mx-auto
            mt-5
            w-full
            max-w-[520px]
            overflow-hidden
            rounded-2xl
            border
            border-black/10
            bg-black
            shadow-[0_20px_50px_rgba(0,0,0,0.12)]

            sm:mt-6
          "
        >
          <video
            controls
            playsInline
            preload="metadata"
            poster="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/prd_image_dark.png?updatedAt=1780838530529"
            className="block h-auto w-full"
          >
            <source
              src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/diffus_unbox_woman.MOV/ik-video.mp4?updatedAt=1781957688695"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}