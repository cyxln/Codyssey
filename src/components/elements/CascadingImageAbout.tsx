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
        <img src={topSrc} alt={topAlt} className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="about-card about-card--bottom">
        <img
          src={bottomSrc}
          alt={bottomAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
