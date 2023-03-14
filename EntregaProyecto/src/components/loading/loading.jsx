import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function Loading() {
  return (
    <div align="center">
    <Box sx={{ width: "50%" }}>
      <img className="logo" src="/moba-studio.jpg" alt="MOBA logo" />
      <LinearProgress />
    </Box></div>
  );
}

export default Loading;
