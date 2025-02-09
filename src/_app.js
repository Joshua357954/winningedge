import Script from "next/script";
import "@/styles/globals.css"; // Ensure you import your global CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* jQuery */}
      <Script
        src="/assets/vendors/jquery/jquery.min.js"
        strategy="beforeInteractive"
      />

      {/* Bootstrap JS */}
      <Script
        src="/assets/vendors/bootstrap/js/bootstrap.bundle.min.js"
        strategy="lazyOnload"
      />

      {/* Nice Select */}
      <Script
        src="/assets/vendors/nice-select/js/jquery.nice-select.min.js"
        strategy="lazyOnload"
      />

      {/* Magnific Popup */}
      <Script
        src="/assets/vendors/magnific-popup/js/jquery.magnific-popup.min.js"
        strategy="lazyOnload"
      />

      {/* Slick Carousel */}
      <Script src="/assets/vendors/slick/js/slick.js" strategy="lazyOnload" />

      {/* Shuffle JS */}
      <Script
        src="/assets/vendors/shuffle/shuffle.min.js"
        strategy="lazyOnload"
      />

      {/* Plugin JS */}
      <Script src="/assets/js/plugin.js" strategy="lazyOnload" />

      {/* Main JS */}
      <Script src="/assets/js/main.js" strategy="lazyOnload" />

      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          integrity="sha384-whatever"
          crossOrigin="anonymous"
        />
      </Head>

      {/* Render the component */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
