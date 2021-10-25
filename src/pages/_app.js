import Appbar from "@/components/AppBar";
import Footer from "@/components/Footer";
import { AuthProvider } from "src/contexts/auth";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import "../styles/globals.css";
import theme from "../styles/theme";
import { Router } from "next/router";
import { SnackbarProvider } from "notistack";
import NProgress from "nprogress";

/* Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done()); */

function App({ Component, pageProps }) {
  return (
    <>
      <SnackbarProvider>
        <Head>
          <title>SISMED</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Appbar />

            <Component {...pageProps} />
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
/* App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}; */
