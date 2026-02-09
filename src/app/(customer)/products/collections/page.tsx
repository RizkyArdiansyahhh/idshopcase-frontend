import { Suspense } from "react";
import { Collections } from "./components/collections";

const CollectionsPage = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Collections></Collections>
      </Suspense>
    </>
  );
};

export default CollectionsPage;
