import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";

type NavbarProps = {
  isBlur: boolean;
};

export const Navbar = ({ isBlur = false }: NavbarProps) => {
  return (
    <nav
      className={` 
      ${
        isBlur
          ? "bg-black/25 backdrop-blur fixed z-20  top-5"
          : "bg-secondary-foreground"
      } w-[93%]
     -lg rounded-[12px] border-white border-2 `}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 ">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse text-white"
        >
          <span className="self-center text-2xl font-bold whitespace-nowrap">
            Idshop
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto lg:flex lg:gap-6"
          id="navbar-default"
        >
          <Link href={"/account/profile"}>
            <FaUser size={24} color="background" />
          </Link>
          <div className="relative">
            <Link href={"/cart"}>
              <FaCartArrowDown size={24} color="background" />
            </Link>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              3
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};
