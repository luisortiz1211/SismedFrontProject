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

export default function App(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
