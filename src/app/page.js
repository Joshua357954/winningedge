"use client";
import Image from "next/image";
import TheHead from "@/components/theHead";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <>
      <TheHead />
      <header>
        <nav className="navbar navbar-expand-xl">
          <div className="container">
            <a className="navbar-brand" href="/dashboard">
              <img src="assets/images/logo.png" alt="Logo" className="logo" />
            </a>
          </div>
        </nav>
      </header>

      {/* Section 1 */}
      <section
        class="hero"
        style={{
          "padding-bottom": "0px !important;",
          backgroundRepeat:"no-repeat"
        }} data-background="assets/images/ready/line-bg.png"
      >
        <div class="container">
          <div class="hero__area" >
            <div class="row d-flex align-items-center">
              <div class="col-lg-6 col-xl-6">
                <div class="hero__content">
                  {/* <p>Hell</p> */}
                  <h1 class="mb-25">Sports Investment With Winning Edge</h1>
                  <p class="primary mb-38">
                    Low-risk investments with consistent returns
                  </p>
                  <div class="hero__cta">
                    <a href="/login" class="button">
                      Get Started !
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-xl-5 offset-xl-1">
                <div class="hero__illustration d-none d-lg-block">
                  <img
                    src="assets/images/hero/illustration.png"
                    alt="Hero Illustration"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="investment invest__alt section__space bg__img pos__rel over__hi"
        data-background="assets/images/investment/investment-bg.png"
      >
        <div class="container">
          <div class="investment__area">
            <div class="section__header mb-50">
              <h3 class="mb-23 text-center green">About Us</h3>
              {/* <h2 class="mb-18"></h2> */}
              <p>
                At WinningEdge, we redefine sports betting by turning it into a
                low-risk investment opportunity with consistent returns. Our
                expert-driven strategies and advanced analytics ensure that you
                bet with confidence, maximizing profits while minimizing risks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      {/* <!-- ==== invest section start ==== --> */}
      <section
        class="invest invest__alt section__space bg__img pos__rel over__hi"
        style={{ borderTop: "10px solid redd" }}
      >
        <div class="container">
          <div class="invest__area">
            <div class="section__header mb-55">
              <h2 class="content__space green">How It Works </h2>
              <p class="text-center fw-bold">
                Deposit funds and choose your amount. <br />
                Receive <span class="green">2% daily</span> for 30 days. <br />
                Cash out earnings anytime.
              </p>
            </div>
            <div class="row">
              <div class="col-sm-6 col-lg-4">
                <div class="invest__items column__space ">
                  <div class="invest__img__group cta__space">
                    <img
                      src="assets/images/invest/register.png"
                      alt="register"
                    />
                    <span>01</span>
                  </div>
                  <h4 className="text-center">Invest</h4>
                </div>
              </div>
              <div class="col-sm-6 col-lg-4">
                <div class="invest__items column__space ">
                  <div class="invest__img__group cta__space">
                    <img src="assets/images/invest/invest.png" alt="Invest" />
                    <span>02</span>
                  </div>
                  <h4 className="text-center">Earn</h4>
                </div>
              </div>
              <div class="col-sm-6 col-lg-4">
                <div class="invest__items ">
                  <div class="invest__img__group cta__space">
                    <img src="assets/images/invest/profit.png" alt="Profit" />
                    <span>03</span>
                  </div>
                  <h4 className="text-center">Withdraw</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section class="payment section__space invest__alt section__space bg__img pos__rel over__hi">
        <div class="container">
          <div class="payment__area">
            <div class=" d-flex align-items-center">
              {/* <div class="col-lg-5 d-none d-lg-block">
                <div class="payment__thumb thumb__rtl ">
                  <img
                    src="assets/images/currency/currency.png"
                    alt="Wide Payment"
                  />
                </div>
              </div> */}
              <div class="payment__content">
                <div class="section__header section__header__space ">
                  <h2 class="text-start" style={{textAlign:"start !important"}}>Benefits</h2>
                </div>
                <div class="payment__item content__space ">
                  <div class="payment__item__inner">
                    <img
                      src="assets/images/currency/no-limit.png"
                      alt="No Limit"
                    />
                    <div>
                      <h4 class="content__space--small">Low Risk </h4>
                      <p>
                        Our expert team manages risk to ensure consistent
                        returns.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="payment__item content__space ">
                  <div class="payment__item__inner">
                    <img
                      src="assets/images/currency/conversion.png"
                      alt="Conversion"
                    />
                    <div>
                      <h4 class="content__space--small">High Returns</h4>
                      <p>
                        Earn 1% daily for 30 days, totaling a 30% return on
                        investment.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="payment__item ">
                  <div class="payment__item__inner">
                    <img
                      src="assets/images/currency/minimize.png"
                      alt="Minimize"
                    />
                    <div>
                      <h4 class="content__space--small">Flexibility</h4>
                      <p>
                        Invest as little or as much as you like, and withdraw
                        your earnings at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}

      <section class="profit pos__rel">
        <div class="container">
          <div
            class="profit__area bg__img"
            data-background="assets/images/ready/line-bg.png"
          >
            <div class="row d-flex align-items-center">
              <div class="col-lg-6">
                <div class="profit__content ">
                  <h5 class="content__space">Get Started Today</h5>
                  <h3 class="mb-38">
                    Join our community of savvy investors and start earning
                    daily returns on your investment
                  </h3>
                  <div class="button__group">
                    <a href="/register" class="button">
                      {" "}
                      Join Us Now !
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 d-none d-lg-block">
                <div class="profit__illustration">
                  <img
                    src="assets/images/ready/ready-illustration.png"
                    alt="Illustration"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
