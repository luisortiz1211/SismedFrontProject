import { CssBaseline } from "@material-ui/core";
export default function LayoutSecondary({ children }) {
  return (
    <>
      <CssBaseline>
        <main component={"span"}>{children}</main>
        <style jsx>
          {`
            div {
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            main {
              flex: 1;
              display: flex;
              flex-direction: column;
            }
          `}
        </style>
        <style jsx global>
          {`
            html,
            body {
              padding: 0;
              margin: 0;
            }
            * {
              box-sizing: border-box;
            }
          `}
        </style>
      </CssBaseline>
    </>
  );
}
