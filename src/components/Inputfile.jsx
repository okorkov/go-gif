import Button from "./Button";

export default function InputFile({
  setVideo,
  setGif,
  gif,
  convertingProgress,
  video,
  convertToGif,
  setVideoDuration,
  ready,
}) {
  const styles = {
    display: "flex",
    left: "0",
    right: "0",
    margin: "50px auto",
    minWidth: "50%",
    maxWidth: "500px",
    borderRadius: "18px",
    padding: "10px",
  };

  const handleImageChange = (e) => {
    if (e.target.files[0].size > 5e8) {
      // eslint-disable-next-line no-alert
      alert("File is too big, no files over 500 MB");
      document.querySelectorAll("input")[0].value = "";
      return;
    }

    setVideo(e.target.files?.item(0));
    setVideoDuration(0);

    if (gif) {
      setGif(null);
    }
  };

  return (
    <div style={convertingProgress ? { display: "none" } : styles}>
      <div className="input-group mb-3">
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile02"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={(e) => handleImageChange(e)}
          />
          <label className="custom-file-label" htmlFor="inputGroupFile02">
            {video ? "Choose Different Video" : "Click Here To Choose File"}
          </label>
        </div>
        <div className="input-group-append">
          {video && <Button convertToGif={convertToGif} ready={ready} />}
        </div>
      </div>
    </div>
  );
}
