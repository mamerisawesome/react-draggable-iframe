import { useState } from "react";
import { Box, Button, Icon, Paper, Typography, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Rnd } from "react-rnd";

const styles = () => ({
  window: {
    minWidth: "100%",
    minHeight: "100%",
  },
  menu: {
    height: "45px",
    "& p": {
      textAlign: "left",
      paddingLeft: "12px",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
    "& .MuiButton-contained": {
      minWidth: "unset",
      width: "24px",
      position: "absolute",
      top: "8px",
      right: "8px",
      boxShadow: "unset",
      borderRadius: "30px",
      "& .material-icons": {
        color: grey[500],
        fontSize: "1.25em",
      },
    },
  },
});

const Window = ({ classes, defaults: { url, ...defaults }, isMenuHidden, onClose, children }) => {
  const defaultConfig = {
    x: 10,
    y: 10,
    width: 300,
    height: 200,
    ...defaults,
  };
  const defaultDims = { width: defaultConfig.width, height: defaultConfig.height };
  const defaultPos = { x: defaultConfig.x, y: defaultConfig.y };

  const [dimensions, setDimensions] = useState(defaultDims);
  const [position, setPosition] = useState(defaultPos);

  return (
    <Rnd
      bounds="window"
      size={{ width: dimensions.width,  height: dimensions.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(event, d) => { setPosition({ x: d.x, y: d.y }) }}
      onResizeStop={(event, direction, ref, delta, position) => {
        setDimensions({
          width: ref.style.width,
          height: ref.style.height,
          ...position,
        });
      }}
    >
      <Paper
        className={classes.window}
        elevation={3}
        component={Box}
      >
        {!isMenuHidden
          ? (
            <Box className={classes.menu}>
              {url
                ? (
                  <Typography>{url}</Typography>
                ) : ""
              }
              <Button variant="contained" onClick={onClose}>
                <Icon>delete</Icon>
              </Button>
            </Box>
          ) : ""
        }
        {children({
          ...dimensions,
          height: `${Number(String(dimensions.height).replace("px", "")) + (isMenuHidden ? 45 : 0)}px`,
        })}
      </Paper>
    </Rnd>
  );
};

export default withStyles(styles)(Window);
