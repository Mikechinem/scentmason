"use client";

type XVideoUsecaseProps = {
  src: string;
  poster?: string;
  className?: string;
};

export default function XVideoUsecase({
  src,
  poster,
  className = "",
}: XVideoUsecaseProps) {
  return (
    <div
      className={`
        mx-auto
        w-full
        max-w-[220px]
        overflow-hidden
        rounded-2xl
        bg-black
        shadow-md
        sm:max-w-[250px]
        md:max-w-[280px]
        ${className}
      `}
    >
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="
          block
          h-auto
          w-full
          object-contain
        "
        aria-hidden="true"
      />
    </div>
  );
}