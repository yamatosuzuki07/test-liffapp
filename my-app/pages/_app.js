import "../styles/globals.css";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff").then((liff) => {
      console.log("LIFF init...");
      // liff
      //   .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
      //   .then(() => {
      //     console.log("LIFF init succeeded.");
      //     setLiffObject(liff);
      //   })
      //   .catch((error) => {
      //     console.log("LIFF init failed.");
      //     setLiffError(error.toString());
      //   });
      liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }
      })
      .catch((error) => {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.liffId) {
          console.info(
            "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
          );
        }
      });




    });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
