import { useState } from "react";
import { Box, Button, FormControlLabel, Icon, Switch, TextField, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import Window from "../components/Window";

const styles = () => ({
  container: {
    overflowY: "hidden",
    "& iframe": {
      zoom: "0.25",
      "-moz-transform": "scale(0.75)",
      "-moz-transform-origin": "0 0",
    },
  },
  windowContent: {
    height: "100%",
  },
  input: {
    width: "100%",
  },
  options: {
    zIndex: "1000",
    position: "fixed",
    right: "20px",
    bottom: "20px",
  },
  addButton: {
    borderRadius: "60px",
    height: "45px",
    color: "#EEEEEE",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[300],
    },
  },
});

const WindowScreen = ({ classes }) => {
  const [windows, setWindows] = useState([{}]);
  const [isMenuHidden, setIsMenuHidden] = useState(true);

  const clearWindow = (id) => {
    const temp = [...windows];
    temp.splice(id, 1);
    setWindows(temp);
  };

  const setIframeUrl = (id, rawUrl) => {
    const temp = [...windows];
    const url = rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
      ? rawUrl
      : `https://${rawUrl}`;
    temp[id] = { ...temp[id], url };
    setWindows(temp);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.options}>
        <FormControlLabel
          className={classes.hideToggle}
          control={<Switch checked={isMenuHidden} onChange={() => setIsMenuHidden(!isMenuHidden)} />}
          label={`${isMenuHidden ? "Show" : "Hide"} Menu`}
        />
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
          onClick={() =>
            setWindows([
              ...windows,
              { x: 20 * windows.length, y: 20 * windows.length },
            ])
          }
        >
          <Icon>add</Icon> Add New Window
        </Button>
      </Box>
      {windows.map((window, idx) => (
        <Window
          isMenuHidden={isMenuHidden}
          key={idx}
          defaults={window}
          onClose={() => clearWindow(idx)}
        >
          {({ width, height }) => (
            window.url
              ? (
                <Box marginLeft="-1px" marginBottom="-7px" px="2px">
                  <iframe
                    title={window.url}
                    src={window.url}
                    height={`${Number(String(height).replace("px", "")) * 4 - 20}px`}
                    width={`${Number(String(width).replace("px", "")) * 4 - 20}px`}
                  />
                </Box>
              ) : (
                <Box className={classes.windowContent} display="flex" pt="80px" px="20px">
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    label="Enter URL to open"
                    size="small"
                    onKeyDown={
                      ({ target: { value }, key }) => key === "Enter" && setIframeUrl(idx, value)
                    }
                  />
                </Box>
              )
          )}
        </Window>
      ))}
    </Box>
  );
};

export default withStyles(styles)(WindowScreen);
