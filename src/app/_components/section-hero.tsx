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
        Ciptakan popsocket unik yang mencerminkan dirimu. Clean, personal, dan
        dibuat khusus untuk melengkapi gaya ponselmu yang bikin HP-mu makin
        standout dan personal.
      </SectionLayout>
      <SectionLayout
        title="Show Off Your Personality With a Custom Case"
        image="/images/product-3.jpeg"
        alt="image-section-2"
        isLeft={false}
      >
        Ciptakan popsocket unik yang mencerminkan dirimu. Clean, personal, dan
        dibuat khusus untuk melengkapi gaya ponselmu yang bikin HP-mu makin
        standout dan personal.
      </SectionLayout>
    </>
  );
};
