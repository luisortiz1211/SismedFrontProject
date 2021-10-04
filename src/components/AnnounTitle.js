import { Grid } from "@material-ui/core";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import React from "react";

// Mensaje de información en cada página
export default function AnnounTitle({ children }) {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        style={{ position: "relative", left: "10px" }}
      >
        <Grid item>
          {" "}
          <h6>
            {"   _"}
            {children}
          </h6>
        </Grid>
        <Grid item>
          <AnnouncementIcon
            style={{
              color: "#4A92A8",
              border: "5px",
              fontSize: "18px",
            }}
          />
        </Grid>
      </Grid>
      <style jsx>
        {`
          h6 {
            margin: 0;
            font-size: "1px";
            color: #4a92a8;
            borderleft: "20px";
          }
        `}
      </style>
    </>
  );
}
