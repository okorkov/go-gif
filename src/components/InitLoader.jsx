import { BoxesLoader } from "react-awesome-loaders";

export const InitLoader = () => {
  return (
    <div className="init-loader">
      <BoxesLoader
        boxColor={"rgb(0, 75, 124)"}
        shadowColor={"#6082B6"}
        style={{ marginBottom: "20px" }}
        desktopSize={"128px"}
        mobileSize={"80px"}
      />
    </div>
  );
};