import { ListProducts } from "@/features/products/components/list-products";

export const SectionProducts = () => {
  return (
    <>
      <section className="h-[75vh] w-screen flex flex-col justify-center">
        <h1 className="font-black text-3xl mb-20 text-center">
          IDSHOP Customization
        </h1>
        <div className="w-full px-10">
          <ListProducts></ListProducts>
        </div>
      </section>
    </>
  );
};
