import "../styles/globals.css";
import { useState, useEffect } from "react";
import { LiffProvider } from "use-line-liff";
// import liff from '@line/liff';

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
            console.log("成功！！！！！！");
            // initializeApp();
          })
          .catch((err) => {
            console.log('失敗!!');
            console.log(err);
          });
        liff.ready.then(() => {
          
          console.log('readyは成功!!');
          const accessToken = liff.getAccessToken();
          console.log(accessToken);
          liff
            .getProfile()
            .then((profile) => {
              console.log("ここまできた!!");
              console.log("ログインユーザーのid:" + profile.userId);
              console.log("ログインユーザーの名前:" + profile.displayName);
              console.log("ログインユーザーの画像URL:" + profile.pictureUrl);
            })
            .catch((err) => {
              console.log("getProfile失敗!");
              console.log(err);
            });
        });
      })
      .catch((error) => {
        console.log("LIFF init failed.");
        console.log("失敗!!");
        setLiffError(error.toString());
      });

    // liff.ready.then(() => {
    //   liff.getProfile().then((profile) => {
    //     console.log("ログインユーザーのid:" + profile.userId);
    //     console.log("ログインユーザーの名前:" + profile.displayName);
    //     console.log("ログインユーザーの画像URL:" + profile.pictureUrl);
    //   });
    // });

    // function initializeApp() {
    //   if (liff.isLoggedIn()) {
    //     getLineData();
    //   } else {
    //     let result = window.confirm("LINE Loginしますか？");
    //     if (result) {
    //       liff.login();
    //     }
    //   }
    // }

    // function getLineData() {
    //   liff.getProfile().then((profile) => {
    //     console.log("ログインユーザーのid:" + profile.userId);
    //     console.log("ログインユーザーの名前:" + profile.displayName);
    //     console.log("ログインユーザーの画像URL:" + profile.pictureUrl);
    //   });
    // }

    // function getProfile() {
    //   liff
    //     .getProfile()
    //     .then((profile) => {
    //       const name = profile.displayName;
    //       console.log(name);
    //     })
    //     .catch((err) => {
    //       console.log('testtest');
    //       console.log("error", err);
    //     });
    // }

    // liff.ready.then(() => {
    //   // liff.init()完了後に実行される処理
    //   liff.getProfile().then((profile) =>
    //   {
    //     console.log("初期化が終わってから実行されるよ！");
    //   });
    // });
    // liff.ready.then(() => {
    //   if (liff.isLoggedIn()) {
    //     const context = liff.getContext();
    //     const liffToken = liff.getAccessToken();
    //     setUid(context.userId);
    //     setAccessToken(liffToken);
    //     console.log('成功！');
    //   }
    // });
    // liff
    //   .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
    //   .then(() => {
    //     if (!liff.isLoggedIn()) {
    //       liff.login();
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(`liff.init() failed: ${error}`);
    //     if (!process.env.liffId) {
    //       console.info(
    //         "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
    //       );
    //     }
    //   });

    // liff.ready.then(() => {
    //   if (liff.isLoggedIn()) {
    //     const context = liff.getContext();
    //     console.log(context);
    //     const liffToken = liff.getAccessToken();
    //     setUid(context.userId);
    //     setAccessToken(liffToken);
    //   }
    // });

    // if (liff.isApiAvailable("shareTargetPicker")) {
    //   liff
    //     .shareTargetPicker([
    //       {
    //         type: "text",
    //         text: "Hello, World",
    //       },
    //     ])
    //     .then(console.log("ShareTargetPicker was launched"))
    //     .catch(function (res) {
    //       console.log("Failed to launch ShareTargetPicker");
    //     });
    // }
    // });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
