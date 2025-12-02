

import React, { useEffect, useState } from "react";
import img1 from "../image/mainslideimage1.jpeg";
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

  return (
    <>
      <div
        className="container-fluid body my-auto"
        style={{ height: isMobile ? "auto" : "90vh" }}
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
                style={{ marginTop: "6vh", marginLeft: "2vh", marginRight: "2vh" }}
              >
                Find The Local Doctors Who Can Help
              </h1>
              <p style={{ marginTop: "4vh", marginBottom: "4vh" }}>
                Discover top local doctors and healthcare providers in your area
                just a click away on <b>TRUST YOU DOCTORS</b>.
              </p>

              {/* --- Fixed Responsive Search & Button Layout --- */}
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

          {/* ===== Right Carousel Section ===== */}
          <div className="col-sm-10 col-md-7 col-lg-8 col-xl-8 mt-3">
            <div className="row">
              <Carousel controls={false} indicators={false} style={{ width: "95%" }}>
                <Carousel.Item interval={2000}>
                  <div className="row">
                    <div className="col-6">
                      <img
                        className="d-block w-100"
                        onClick={() => handleImageClick(img1)}
                        style={{
                          height: isMobile ? "22vh" : "30vh",
                          borderRadius: "25px",
                        }}
                        src={img1}
                        alt="First slide"
                      />
                    </div>
                    <div className="col-6">
                      <img
                        className="d-block w-100"
                        onClick={() => handleImageClick(img2)}
                        style={{
                          height: isMobile ? "22vh" : "30vh",
                          borderRadius: "25px",
                        }}
                        src={img2}
                        alt="Second slide"
                      />
                    </div>
                  </div>
                </Carousel.Item>

                <Carousel.Item interval={2000}>
                  <div className="row">
                    <div className="col-6">
                      <img
                        className="d-block w-100"
                        style={{
                          height: isMobile ? "22vh" : "30vh",
                          borderRadius: "25px",
                        }}
                        src={img3}
                        onClick={() => handleImageClick(img3)}
                        alt="Third slide"
                      />
                    </div>
                    <div className="col-6">
                      <img
                        className="d-block w-100"
                        style={{
                          height: isMobile ? "22vh" : "30vh",
                          borderRadius: "25px",
                        }}
                        src={img4}
                        onClick={() => handleImageClick(img4)}
                        alt="Fourth slide"
                      />
                    </div>
                  </div>
                </Carousel.Item>

                <Carousel.Item interval={2000}>
                  <div className="row">
                    <div className="col-6">
                      <img
                        className="d-block w-100"
                        style={{
                          height: isMobile ? "22vh" : "30vh",
                          borderRadius: "25px",
                        }}
                        src={img5}
                        onClick={() => handleImageClick(img5)}
                        alt="Fifth slide"
                      />
                    </div>
                    <div className="col-6">
                      <img
                        className="d-block w-100"
                        style={{
                          height: isMobile ? "22vh" : "30vh",
                          borderRadius: "25px",
                        }}
                        src={img6}
                        onClick={() => handleImageClick(img6)}
                        alt="Sixth slide"
                      />
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </div>

            {/* ===== Swiper Video Section (Hidden on Mobile) ===== */}
            {!isMobile && (
              <div className="col-xl-12 d-flex justify-content-center align-items-center m-5">
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
