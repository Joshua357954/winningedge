import Script from "next/script";
import { Toaster, toast } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa"; // Import React Icons for WhatsApp

export default function footer() {
  return (
    <div>
      {/* <!-- ==== footer section start ==== --> */}
      <footer className="footer" style={{ padding: "14px 0" }}>
        <div className="container">
          <div className="footer__nav">
            <a href="index.html" className="logo">
              <img src="assets/images/logo.png" alt="Logo" />
            </a>
          </div>
          <div className="footer__credit">
            <div className="row d-flex align-items-center">
              <div className="col-lg-8">
                <div className="footer__credit__left">
                  <p className="text-center text-lg-start">
                    Copyright © Winning Edge - 2025
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="footer__credit__right">
                  <div className="social text-center text-lg-end">
                    <a href="javascript:void(0)">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="javascript:void(0)">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="javascript:void(0)">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="javascript:void(0)">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    {/* WhatsApp Contact Us Link */}
                  </div>
                </div>
              </div>{" "}
              <br />
              <a
                href="https://wa.me/234XXXXXXXXXX" // Replace with your WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                className=" w d-flex align-items-center mt-3 justify-content-center px-3 py-2 rounded-pill "
                aria-label="Contact us on WhatsApp"
              >
                <span className="social me-2">Any Issues? Contact Us on WhatsApp</span>
                <FaWhatsapp size={24} color="lightgreen" />
              </a>
            </div>
          </div>
          <Toaster position="top-center" />
        </div>
      </footer>
      {/* <!-- ==== #footer section end ==== --> */}
      {/* <!-- Scroll To Top --> */}
      <a href="javascript:void(0)" className="scrollToTop">
        <i className="fas fa-angle-double-up"></i>
      </a>
      {/* <!-- ==== js dependencies start ==== --> */}
      {/* <!-- jquery --> */}
      {/* jQuery */}
      <Script
        src="/assets/vendors/jquery/jquery.min.js"
        strategy="beforeInteractive"
      />
      {/* Bootstrap JS */}
      <Script
        src="/assets/vendors/bootstrap/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />
      {/* Nice Select JS */}
      <Script
        src="/assets/vendors/nice-select/js/jquery.nice-select.min.js"
        strategy="lazyOnload"
      />
      {/* Magnific Popup JS */}
      <Script
        src="/assets/vendors/magnific-popup/js/jquery.magnific-popup.min.js"
        strategy="lazyOnload"
      />
      {/* Slick JS */}
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
    </div>
  );
}
