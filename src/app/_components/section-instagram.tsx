import Image from "next/image";

const instagramPhotos = [
  {
    id: 0,
    images: [
      "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770903225/Get_spoiled_by_nyiiit_s_collection_-_Shop_now_on_your_favorite_e-commerce_mxeifa.jpg",
      "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770903225/Get_spoiled_by_nyiiit_s_collection_-_Shop_now_on_your_favorite_e-commerce_1_m7sybt.jpg",
    ],
  },
  {
    id: 1,
    images: [
      "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770903226/it_s_past_working_hours_but_this_was_too_cute_not_to_post_uihazo.jpg",
    ],
  },
  {
    id: 2,
    images: [
      "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770903227/Me_Mini_me_paxtonjaury_.._paxtonjaury_5monthsold_cutebaby_babyboy_1_suyf40.jpg",
      "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770903226/Me_Mini_me_paxtonjaury_.._paxtonjaury_5monthsold_cutebaby_babyboy_wxfqjh.jpg",
    ],
  },
  {
    id: 3,
    images: [
      "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770903225/I_think_someone_is_peeping._oh_it_s_our_Facegrid_Case_thsjaj.jpg",
    ],
  },
  {
    id: 4,
    images: [
      "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770904684/SnapInsta.to_470919034_1120616686443885_2590512095233953591_n_s7gxf2.jpg",
      "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770904684/SnapInsta.to_470937794_1128760572110210_7115421089464733897_n_l4e84b.jpg",
      "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770904684/SnapInsta.to_470901262_2173278613073485_1378731344008912565_n_aybd3p.jpg",
    ],
  },
  {
    id: 5,
    images: [
      "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770903227/not_just_a_custom.it_s_a_memory_you_can_hold_baby_gemas_belsfoodies_bellywardhani_fydq9r.jpg",
      "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770905158/SnapInsta.to_626455846_18073172555575465_450816634720407945_n_lqfx72.jpg",
    ],
  },
  {
    id: 6,
    images: [
      "https://res.cloudinary.com/dy9gtwsh7/image/upload/v1770903225/Essentials_things_can_be_different_for_each_person_what_about_youSpotted_our_Bumper_Impact_prin_cvhxwb.jpg",
    ],
  },
];

export const SectionInstagram = () => {
  return (
    <div className="h-[60vh] w-screen flex gap-1 overflow-x-auto">
      <div className="flex-shrink-0 w-1/3 h-full flex flex-col">
        {instagramPhotos[0].images.map((image, index) => (
          <div key={index} className="w-full h-1/2 relative">
            <Image
              src={image}
              alt={`Instagram Photo`}
              className="w-full h-full object-cover"
              fill
            />
          </div>
        ))}
      </div>
      <div className="w-1/3 shrink-0 h-full relative">
        <Image
          src={instagramPhotos[1].images[0]}
          alt="Instagram Photo"
          fill
          className="object-center object-cover"
        ></Image>
      </div>
      <div className="w-1/3 shrink-0 h-full flex">
        {instagramPhotos[2].images.map((image, index) => (
          <div
            key={index}
            className={`w-1/2 h-full relative ${index === 1 && "grayscale"}`}
          >
            <Image
              src={image}
              alt={`Instagram Photo`}
              className="w-full h-full object-cover"
              fill
            />
          </div>
        ))}
      </div>
      <div className="w-1/3 shrink-0 h-full flex flex-wrap">
        {instagramPhotos[4].images.map((image, index) => (
          <div
            key={index}
            className={`relative ${
              index === 2 ? "w-full h-1/2" : "w-1/2 h-1/2"
            } ${index === 1 && "grayscale"}`}
          >
            <Image
              src={image}
              alt={`Instagram Photo`}
              fill
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="w-1/3 shrink-0 h-full relative">
        <Image
          src={instagramPhotos[3].images[0]}
          alt="Instagram Photo"
          fill
          className="object-center object-cover"
        ></Image>
      </div>
      <div className="w-1/3 shrink-0 h-full flex">
        {instagramPhotos[5].images.map((image, index) => (
          <div
            key={index}
            className={`w-1/2 h-full relative ${index === 1 && "grayscale"}`}
          >
            <Image
              src={image}
              alt={`Instagram Photo`}
              className="w-full h-full object-cover"
              fill
            />
          </div>
        ))}
      </div>
      <div className="w-1/3 shrink-0 relative">
        <Image
          src={instagramPhotos[6].images[0]}
          alt="Instagram Photo"
          fill
          className="object-center object-cover"
        ></Image>
      </div>
    </div>
  );
};
