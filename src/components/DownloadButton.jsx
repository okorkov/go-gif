import Button from "@mui/material/Button";

export default function DownloadButton({ gif, download, videoName }) {
  return (
    <div>
      <Button
        variant="contained"
        href={gif}
        download={`${videoName}.gif`}
        style={{ background: "rgb(0, 75, 124)" }}
        onClick={(e) => download(e)}
      >
        Looks Good! Download Gif
      </Button>
    </div>
  );
}
