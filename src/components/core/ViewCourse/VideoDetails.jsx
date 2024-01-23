import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsApi";
import { setActiveSideBar, updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { BigPlayButton, Player } from "video-react";
import IconBtn from "../../common/IconButton";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
<link rel="stylesheet" href="/css/video-react.css" />;

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();

  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const playerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [previewSource, setPreviewSource] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const { courseSectionData, courseEntireData, activeSideBar,completedLectures } =
    useSelector((state) => state.viewCourse);
    

  useEffect(() => {
    (async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        const filteredData = courseSectionData.filter(
          (section) => section._id === sectionId
        );
        if (filteredData.length !== 0) {
          // console.log("filteredData", filteredData);

          const filteredVideoData = filteredData[0].subSection.filter(
            (data) => data._id === subSectionId
          );

          if (filteredVideoData.length !== 0) {
            setVideoData(filteredVideoData[0]);
            setPreviewSource(courseEntireData.thumbnail);
            setVideoEnded(false);
          } else {
            // Handle the case when filteredVideoData is empty
            console.log("No matching subSection found");
          }
        } else {
          // Handle the case when filteredData is empty
          console.log("No matching section found");
        }
        // console.log(videoData.videoUrl)
      }
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    // get current section index
    if (courseSectionData) {
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId.trim()
      );

      // get current Sub section index
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ].subSection.findIndex((data) => data._id === subSectionId.trim()); //returns index of current clicked subsection or video lecture

      //  Compare section and subsection index
      if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
        return true;
      } else return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSection =
      courseSectionData?.[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSection - 1
    ) {
      return true;
    } else return false;
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);
    

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/subSection/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData?.[currentSectionIndex - 1]._id;
      const noOfSubSection =courseSectionData?.[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =courseSectionData?.[currentSectionIndex - 1].subSection?.[noOfSubSection - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/subSection/${prevSubSectionId}`
      );
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSection =
      courseSectionData?.[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSection - 1) {
      const nextSubSectionId =
        courseSectionData?.[currentSectionIndex].subSection?.[
          currentSubSectionIndex + 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/subSection/${nextSubSectionId}`
      );
    } else {
      //else if current subsection  is a last video in current section then navigate to first video of next section
      const nextSectionId = courseSectionData?.[currentSectionIndex + 1]._id; //get Next section Id
      const nextSubSectionId =
        courseSectionData?.[currentSectionIndex + 1].subSection?.[0]._id; //get next section's first subsection
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/subSection/${nextSubSectionId}`
      ); //Navigate to different section different subsection
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="flex relative mt-4 flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <div  >
          <Player
            ref={playerRef}
            playsInline
            height={"100%"}
            aspectRatio="16:9"
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
           <BigPlayButton position="center" />

      <button className={`${activeSideBar ?"hidden":"absolute"} hover:z-[1000] hover:text-[26px] top-0 -left-6 text-2xl text-richblack-800 bg-richblack-200 rounded-full  transition-all duration-200`} onClick={()=>dispatch(setActiveSideBar(true))} ><MdOutlineKeyboardDoubleArrowRight/></button>
          <div className="">
            
            {videoEnded && (
              <div style = {{backgroundImage:  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)", }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter" >
                {/* Video complete button */}
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    text={!loading ? "Mark as complete" : "Loading"}
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    customClasses="text-xl max-w-max px-4 mx-auto" 
                  />
                )}
                {/* Video rewatch button */}
                <IconBtn
                  disabled={loading}
                  text={"Rewatch"}
                  onclick={() => {
                    if (playerRef?.current) {
                      playerRef?.current.play(); //autoplay video
                      playerRef?.current.seek(0); //restart video
                      setVideoEnded(false);
                    }
                  }}
                  customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                />

                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                  {/* Back buuton */}
                  {!isFirstVideo() && ( <button onClick={goToPrevVideo} disabled={loading} >  Prev </button>)}
                  {/* Next Button */}
                  {!isLastVideo() && (<button   onClick={goToNextVideo}   disabled={loading}   className="blackButton" >Next </button>  )}
                </div>
              </div>
            )}
          </div>
        </Player>
        </div>
      )}
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
}
