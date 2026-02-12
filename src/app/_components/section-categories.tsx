import Image from "next/image";

const categories = [
  {
    id: 0,
    title: "Custom Case",
    img: "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770885590/clean_cute_in_every_moments._qiztpy.jpg",
  },
  {
    id: 1,
    title: "Pop Socket",
    img: "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770885590/looks_cute_all_wrapped_in_our_Magsafe_Collection_vlo81k.jpg",
  },
  {
    id: 2,
    title: "Keychain",
    img: "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770885590/Introducing_our_Facegrid_Collection_-_Acrylic_Keychain._bmlkps.jpg",
  },
  {
    id: 3,
    title: "Phone Charm",
    img: "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770885590/A_phone_charm_for_your_bag_or_should_we_call_it_a_bag_charm_lknj9g.jpg",
  },
];

export const SectionCategories = () => {
  return (
    <>
      <div className="h-[46vh] w-screen grid grid-cols-4 gap-2 px-5">
        {categories.map((category) => (
          <div
            key={category.id}
            className="h-full rounded-xs overflow-hidden relative group transition-all duration-300 ease-in-out cursor-pointer"
          >
            <Image
              src={category.img}
              alt={category.title}
              fill
              className="object-cover object-center grayscale-25 contrast-110 saturate-100 brightness-95 hover:grayscale-0 group-hover:contrast-100 group-hover:saturate-100 group-hover:brightness-110"
            />
            <div
              className="
    pointer-events-none
    absolute inset-0
    z-10
    bg-[url('/images/noise-effect.png')]
    bg-repeat
    group-hover:bg-none
    group-hover:bg-no-repeat
  "
            />
            <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center z-20">
              <p
                className="
  text-4xl font-black uppercase text-white
  drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]
"
              >
                {category.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
