import { useAuth } from "src/contexts/auth";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Link as MuiLink,
  Typography,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Routes from "../constants/routes";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 30,
    height: 30,
    padding: 5,
    backgroundColor: "#60CCD9",
  },
  logo: {
    display: "none",
    padding: 8,

    maxHeight: 150,
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
    "& a img": {
      maxHeight: 45,
      color: "#fffff",
    },
  },
  btncerrar: {
    display: "flex",
    justifyAlign: "right",
    color: "#BBF0E8",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#f9f9f9",
      color: "#092435",
    },
  },
}));
const Appbar = () => {
  const classes = useStyles();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          style={{
            backgroundColor: "#092435",
            padding: "5px",
          }}
        >
          <Grid item xs={2} md={5}>
            {" "}
            <Box
              className={classes.logo}
              edge="star"
              style={{
                filter: "invert(100%)",
                color: "#fffff",
              }}
            >
              <Link href="/login">
                <MuiLink>
                  <Image
                    src="/logosismed1.png"
                    alt="Sismed"
                    width={100}
                    height={50}
                  />
                </MuiLink>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            {user ? (
              <>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Grid item>
                    <Avatar className={classes.avatar}>A</Avatar>
                  </Grid>
                  <Grid item>
                    <MoreVertIcon style={{ color: "#60CCD9" }} />
                  </Grid>

                  <Grid item style={{ paddingRight: "50px" }}>
                    <Typography component={"span"}>{user.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Link href={Routes.LOGIN}>
                      <Button
                        onClick={handleLogout}
                        color="inherit"
                        edge="end"
                        className={classes.btncerrar}
                      >
                        Cerrar sesión
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid></Grid>
            )}
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
};
export default Appbar;
