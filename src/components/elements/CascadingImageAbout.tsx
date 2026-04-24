import Image from "next/image";

type CascadingImageAboutProps = {
  topSrc: string;
  topAlt: string;
  bottomSrc: string;
  bottomAlt: string;
};

export default function CascadingImageAbout({
  topSrc,
  topAlt,
  bottomSrc,
  bottomAlt,
}: CascadingImageAboutProps) {
  return (
    <div className="about-stack w-full pb-[110%]">
      <div className="about-card about-card--top">
        <Image
          src={topSrc}
          alt={topAlt}
          fill
          sizes="(min-width: 1024px) 32rem, 90vw"
          className="object-cover"
        />
      </div>
      <div className="about-card about-card--bottom">
        <Image
          src={bottomSrc}
          alt={bottomAlt}
          fill
          sizes="(min-width: 1024px) 32rem, 90vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
