import React, { useEffect, useState } from "react";
import img0 from "../image/mainslideimg6.jpg";
import img2 from "../image/mainsliimage2.jpeg";
import img3 from "../image/Homeopathy Treatment photo.webp";
import img4 from "../image/World Health Organisation Photos.webp";
import img5 from "../image/Nutritius Photo Two_.jpeg";
import img6 from "../image/Pyschologist Specialities Photo 1.png";
import { BsSearch } from "react-icons/bs";
import Carousel from "react-bootstrap/Carousel";
import ReactPlayer from "react-player";
import "../css/MainSlide.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { withRouter, useHistory } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import SearchDoctor from "../SearchDoctor/SearchDoctor";

const MainSlide = () => {
  const history = useHistory();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [doctor, setDoctorName] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRegisterClick = () => {
    history.push("/SDoctor");
  };

  const handleImageClick = (imageSrc) => {
    window.open(imageSrc, "_blank");
  };

  const bannerImgStyle = {
    height: isMobile ? "22vh" : "30vh",
    width: "100%",
    borderRadius: "25px",
    objectFit: "contain",
    backgroundColor: "#f0f4ff",
    display: "block",
    cursor: "pointer",
  };

  const photoImgStyle = {
    height: isMobile ? "22vh" : "30vh",
    width: "100%",
    borderRadius: "25px",
    objectFit: "cover",
    display: "block",
    cursor: "pointer",
  };

  const colStyle = {
    padding: "0 5px",
    overflow: "hidden",
  };

  const rowStyle = {
    margin: "0",
  };

  return (
    <>
      {/* ===== COMING SOON BADGE STYLES — injected directly so nothing can override ===== */}
      <style>{`
        @keyframes cs-blink {
          0%   { background: #4a90d9; box-shadow: none; transform: scale(1); border-color: #4a90d9; }
          25%  { background: #85bef0; box-shadow: 0 0 20px 6px #85bef0aa, 0 0 40px 12px #4a90d933; transform: scale(1.1); border-color: #85bef0; }
          50%  { background: #4a90d9; box-shadow: none; transform: scale(1); border-color: #4a90d9; }
          75%  { background: #a8d4f7; box-shadow: 0 0 18px 5px #a8d4f7aa, 0 0 36px 10px #4a90d933; transform: scale(1.08); border-color: #a8d4f7; }
          100% { background: #4a90d9; box-shadow: none; transform: scale(1); border-color: #4a90d9; }
        }

        @keyframes cs-shimmer {
          0%   { left: -75%; }
          100% { left: 125%; }
        }

        @keyframes cs-star-pop {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50%       { transform: scale(1.6) rotate(180deg); }
        }

        .coming-soon-badge {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
          font-family: 'Arial Black', Arial, sans-serif !important;
          font-size: 1rem !important;
          font-weight: 900 !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          padding: 0.44rem 1.3rem !important;
          border-radius: 50px !important;
          border: 2.5px solid #4a90d9 !important;
          cursor: default !important;
          user-select: none !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          background: #4a90d9 !important;
          background-image: none !important;
          background-clip: unset !important;
          -webkit-background-clip: unset !important;
          position: relative !important;
          overflow: hidden !important;
          animation: cs-blink 1s ease-in-out infinite !important;
        }

        .coming-soon-badge::before {
          content: "" !important;
          position: absolute !important;
          top: 0 !important;
          left: -75% !important;
          width: 50% !important;
          height: 100% !important;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(200, 225, 255, 0.35) 50%,
            transparent 100%
          ) !important;
          animation: cs-shimmer 1.8s infinite !important;
          pointer-events: none !important;
        }

        .cs-star {
          font-size: 0.8em !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          animation: cs-star-pop 1s ease-in-out infinite !important;
          display: inline-block !important;
          flex-shrink: 0 !important;
        }

        .cs-star:last-child {
          animation-delay: 0.5s !important;
          animation-direction: reverse !important;
        }
      `}</style>

      {/* ✅ FIX: Changed fixed height 90vh → auto with minHeight so swiper videos are never clipped */}
      <div
        className="container-fluid body my-auto"
        style={{
          height: "auto",
          minHeight: isMobile ? "auto" : "90vh",
          paddingBottom: isMobile ? "1rem" : "2rem",
        }}
      >
        <div
          className="row h-100"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {/* ===== Left Text Section ===== */}
          <div className="col-sm-10 col-md-4 col-lg-4 col-xl-4 main-body">
            <div className="mx-auto main-text">
              <h1
                className="heading"
                style={{
                  marginTop: "6vh",
                  marginLeft: "2vh",
                  marginRight: "2vh",
                }}
              >
                Find The Local Doctors Who Can Help
              </h1>
              <p style={{ marginTop: "4vh", marginBottom: "2vh" }}>
                Discover top local doctors and healthcare providers in your area
                just a click away on <b>TRUST YOU DOCTORS</b>.
              </p>

              {/* ===== COMING SOON BADGE — between paragraph and search bar ===== */}
              <div className="text-center mb-3">
                <span className="coming-soon-badge">
                  <span className="cs-star">✦</span>
                  Coming Soon
                  <span className="cs-star">✦</span>
                </span>
              </div>
              {/* ===== END COMING SOON BADGE ===== */}

              <div className="row justify-content-center text-center">
                <div className="col-12 mb-3">
                  <div className="search-bar d-flex align-items-center justify-content-center w-100">
                    <BsSearch className="icon" />
                    <input
                      type="text"
                      placeholder="Find Specialists Now..."
                      onChange={(e) => setDoctorName(e.target.value)}
                    />
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={handleRegisterClick}
                    >
                      Search
                    </button>
                  </div>
                </div>

                <div className="col-12 text-center mb-2 d-md-none">OR</div>
                <div className="col-12 col-md-4 text-center">
                  <button
                    className="btn btn-primary appointment-btn"
                    onClick={handleRegisterClick}
                  >
                    Make An Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Right Carousel + Swiper Section ===== */}
          <div className="col-sm-10 col-md-7 col-lg-8 col-xl-8 mt-3">
            <div className="row">
              <Carousel
                controls={false}
                indicators={false}
                style={{ width: "95%" }}
              >
                {/* ===== SLIDE 1: Banner Images ===== */}
                <Carousel.Item interval={2000}>
                  <div className="row" style={rowStyle}>
                    <div className="col-6" style={colStyle}>
                      <img
                        className="d-block w-100"
                        onClick={() => handleImageClick(img0)}
                        style={bannerImgStyle}
                        src={img0}
                        alt="Main slide"
                      />
                    </div>
                    <div className="col-6" style={colStyle}>
                      <img
                        className="d-block w-100"
                        onClick={() => handleImageClick(img2)}
                        style={bannerImgStyle}
                        src={img2}
                        alt="Second slide"
                      />
                    </div>
                  </div>
                </Carousel.Item>

                {/* ===== SLIDE 2: Photo Images ===== */}
                <Carousel.Item interval={2000}>
                  <div className="row" style={rowStyle}>
                    <div className="col-6" style={colStyle}>
                      <img
                        className="d-block w-100"
                        onClick={() => handleImageClick(img3)}
                        style={photoImgStyle}
                        src={img3}
                        alt="Third slide"
                      />
                    </div>
                    <div className="col-6" style={colStyle}>
                      <img
                        className="d-block w-100"
                        onClick={() => handleImageClick(img4)}
                        style={photoImgStyle}
                        src={img4}
                        alt="Fourth slide"
                      />
                    </div>
                  </div>
                </Carousel.Item>

                {/* ===== SLIDE 3: Photo Images ===== */}
                <Carousel.Item interval={2000}>
                  <div className="row" style={rowStyle}>
                    <div className="col-6" style={colStyle}>
                      <img
                        className="d-block w-100"
                        onClick={() => handleImageClick(img5)}
                        style={photoImgStyle}
                        src={img5}
                        alt="Fifth slide"
                      />
                    </div>
                    <div className="col-6" style={colStyle}>
                      <img
                        className="d-block w-100"
                        onClick={() => handleImageClick(img6)}
                        style={photoImgStyle}
                        src={img6}
                        alt="Sixth slide"
                      />
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </div>

            {/* ===== Swiper Video Section (Hidden on Mobile) ===== */}
            {/* ✅ FIX: Removed m-5 (large margin) → replaced with mt-3 mb-2 so videos stay fully visible */}
            {!isMobile && (
              <div className="col-xl-12 d-flex justify-content-center align-items-center mt-3 mb-2">
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  loop={true}
                  slidesPerView={3}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                  }}
                  pagination={{ el: ".swiper-pagination", clickable: true }}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                    clickable: true,
                  }}
                  modules={[EffectCoverflow, Pagination, Navigation]}
                  className="swiper_container small-swiper"
                >
                  <SwiperSlide>
                    <ReactPlayer
                      height="22vh"
                      width="18vw"
                      url="https://www.youtube.com/watch?v=T3a3DWaixis"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ReactPlayer
                      height="22vh"
                      width="18vw"
                      url="https://www.youtube.com/watch?v=V680nMGpeEM"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ReactPlayer
                      height="22vh"
                      width="18vw"
                      url="https://www.youtube.com/watch?v=U5ze_CxSTb8"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ReactPlayer
                      height="22vh"
                      width="18vw"
                      url="https://www.youtube.com/watch?v=5I8YaLbmFeM"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ReactPlayer
                      height="22vh"
                      width="18vw"
                      url="https://www.youtube.com/watch?v=FBdf5kSt8Jo"
                    />
                  </SwiperSlide>

                  <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                      <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(MainSlide);   