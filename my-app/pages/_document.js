import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script charSet="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js" async></script>
      </body>
    </Html>
  )
}
