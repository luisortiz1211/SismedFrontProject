import React from "react";
import Image from "next/image";
import { CssBaseline } from "@material-ui/core";

const Logo = () => {
  return (
    <>
      <CssBaseline>
        <Image alt="Logo" src="/public/logosismed1.png" {...props} />
      </CssBaseline>
    </>
  );
};
export default Logo;
