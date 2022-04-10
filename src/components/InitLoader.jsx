import { BoxesLoader } from "react-awesome-loaders";

export const InitLoader = () => {
  return (
    <>
      <BoxesLoader
        boxColor={"rgb(0, 75, 124)"}
        shadowColor={"#6082B6"}
        style={{ marginBottom: "20px" }}
        desktopSize={"128px"}
        mobileSize={"80px"}
      />
    </>
  );
};