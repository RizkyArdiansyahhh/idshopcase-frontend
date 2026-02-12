import Link from "next/link";

const GradientFillButton = () => {
  return (
    <Link
      href={"/products/collections"}
      className="group/button relative w-fit overflow-hidden rounded-sm border border-foreground bg-white px-4 py-2 text-sm font-semibold text-foreground transition-all duration-150 hover:border-foreground active:scale-95"
    >
      <span className="absolute bottom-0 left-0 z-0 h-0 w-full bg-gradient-to-t from-foreground to-foreground/80 transition-all duration-500 group-hover/button:h-full" />
      <span className="relative z-10 transition-all duration-500 group-hover/button:text-white">
        Lihat Lebih Banyak
      </span>
    </Link>
  );
};

export default GradientFillButton;
