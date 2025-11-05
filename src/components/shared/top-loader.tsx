import NextTopLoader from "nextjs-toploader";
export const TopLoader = () => {
  return (
    <NextTopLoader
      color="#003077"
      initialPosition={3}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={500}
    ></NextTopLoader>
  );
};
