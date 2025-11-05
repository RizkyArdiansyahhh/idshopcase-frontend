import { SectionLayout } from "@/components/layouts/section-layout";

export const SectionHero = () => {
  return (
    <>
      <SectionLayout
        title="Hero Section"
        image="/images/image-section-1.jpg"
        alt="image-section-1"
        isLeft={true}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio facere
        est commodi cumque, illum sit eveniet, fugit quam doloribus debitis,
        iure vel laboriosam corporis earum minima? Non facilis a modi expedita
        impedit enim doloribus quaerat iure minima iste vitae laudantium
        voluptates consequuntur aliquid, commodi deserunt quod odit atque nihil
        ipsa veritatis! Tempora iusto amet repellat iste neque, quod
        voluptatibus inventore nulla saepe pariatur animi hic harum sed
        reiciendis ullam aperiam perferendis aut vel quibusdam numquam
        repellendus nostrum architecto in. Illum corporis maiores, inventore in
        quisquam illo autem qui veritatis aliquam cum voluptatum alias, ipsum
        repudiandae quam voluptatibus repellat. Corporis, ea.
      </SectionLayout>
      <SectionLayout
        title="Show Off Your Personality With a Custom Case"
        image="/images/product-3.jpeg"
        alt="image-section-2"
        isLeft={false}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ratione
        soluta, modi odit debitis ut a ipsa qui accusantium nulla vel reiciendis
        eaque eum, harum at obcaecati ex quas. Quae non recusandae possimus ab,
        similique cum corporis consequatur totam laudantium ratione aliquam
        velit unde minima earum, laboriosam nemo ullam soluta eius illo nostrum!
        Ut autem fugiat sit delectus suscipit nemo odit quis similique ratione,
        sint provident, nostrum recusandae earum reprehenderit!
      </SectionLayout>
    </>
  );
};
