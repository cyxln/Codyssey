import Link from "next/link";

type JoinUsBtnProps = {
  buttonText: string;
};

export default function JoinUsBtn({ buttonText }: JoinUsBtnProps) {
  return (
    <Link
      href="/get-involved"
      className="glass-pill glass-pill--cta mt-4 flex items-center gap-3 px-10 py-3 cursor-pointer"
    >
      <span className="text-[clamp(1rem,2.2vw,1.4rem)] font-semibold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
        {buttonText}
      </span>
      <svg
        aria-hidden="true"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M5 12h13m0 0l-5-5m5 5l-5 5"
          stroke="#1f6b1c"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
