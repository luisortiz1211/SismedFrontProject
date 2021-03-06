import First from "@/components/First";
import Container from "@material-ui/core/Container";
import Head from "next/head";
import React from "react";

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>SISMED</title>
          <meta name="description" content="Generated by sismed" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/*<SignInSide />*/}
      </div>
      <Container maxWidth="lg">
        <First />
      </Container>
    </>
  );
}
