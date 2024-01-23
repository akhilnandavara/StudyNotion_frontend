import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import 'swiper/css/free-mode';
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { fetchAllReviews } from "../services/operations/courseDetailsApi";
import RatingStars from "../components/common/ReviewStars";

export default function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const turncateWords = 15;
  const turncateTitle=5;

  useEffect(() => {
    (async () => {
      const res = await fetchAllReviews();
      setReviews(res);
    })();
  }, []);

  return (
    <div className="text-white mx-auto">
      <div className="lg:my-[50px] lg:h-[184px]">
        <Swiper
         modules={[Autoplay]}
          className="w-full"
          slidesPerView={"auto"}
          spaceBetween={50}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            // when window width is >= 640px
            380: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-2 bg-richblack-800 py-4 px-6 min-h-[10rem] justify-center min-w-[14rem] text-[14px]  text-richblack-25">
                <div className="flex flex-row items-center gap-4">
                  <img
                    loading="lazy"
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="userImage"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </h1>
                    <p className="text-[12px] font-medium text-richblack-500">
                      {review?.course?.courseName.split(" ").length>turncateTitle
                      ?(review?.course?.courseName.split(" ").slice(0,turncateTitle).join(" "))
                      :(review?.course?.courseName)}
                    </p>
                  </div>
                </div>
                <div className="font-medium text-richblack-25">
                  {review?.review.split(" ").length > turncateWords
                    ? `${review?.review
                        .split(" ")
                        .slice(0, turncateWords)
                        .join(" ")} ...`
                    : `${review?.review}`}
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-yellow-100">
                    {" "}
                    {review?.rating.toFixed(1)}
                  </h3>
                  <RatingStars Review_Count={review.rating} Star_Size={20} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
