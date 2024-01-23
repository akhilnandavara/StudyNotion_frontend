import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { setCourse } from "../../../../../slices/courseSlice";
import SubSectionModal from "./SubSectionModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsApi";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [addSubSection, setAddSubSection] = useState();
  const [viewSubSection, setViewSubSection] = useState();
  const [editSubSection, setEditSubSection] = useState();
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState();

  const handleSectionDelete = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleSubSectionDelete = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    });

    if (result) {
      const updatedCourse = await course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );

      dispatch(setCourse({ ...course, courseContent: updatedCourse }));
    }
    setConfirmationModal(null);
  };

  return (
    <div>
      <div className="rounded-lg bg-richblack-700 p-6 mt-4 px-4 " id="nestedViewContainer">
        {/* Section DropDown */}
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>

            {/* Section DropDown Content */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-2">
                <RxDropdownMenu className="text-2xl text-richblack-50"/>
                <p className="font-semibold text-richblack-50">{section.sectionName}</p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdModeEdit className="text-xl text-richblack-300"  />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Do You want delete this section",
                      text2:
                        "All the lectures inside this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleSectionDelete(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line  className="text-xl text-richblack-300" />
                </button>
                <span className="text-medium text-richblack-300" >|</span>
                <BiDownArrow className="text-xl text-richblack-300" />
              </div>
            </summary>

            <div className="px-6 pb-4">

            {/* Render all Sub Section within a section */}
            {section?.subSection?.map((data) => (
              <div
                key={data?._id}
                onClick={() => setViewSubSection(data)}
                className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
              >
                <div className="flex items-center gap-x-2">
                  <RxDropdownMenu className="text-2xl text-richblack-50" />
                  <p className="font-semibold text-richblack-50">{data.title}</p>
                </div>

                <div
                onClick={(e)=>e.stopPropagation()}
                  className="flex items-center gap-x-3"
                >
                  <button  onClick={() =>
                    setEditSubSection({...data, sectionId: section._id })
                  }>

                  <MdModeEdit className="text-xl text-richblack-300"/>
                  </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Do You want delete this leture",
                      text2: "This leture  will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () =>
                      handleSubSectionDelete(data._id, section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                </button>
              </div>
              </div>
            ))}

            {/*Add new Lexture to section  */}
            <button
              onClick={() => setAddSubSection(section._id)}
              className="mt-3 flex items-center gap-x-1 text-yellow-50" 
            >
              <AiOutlinePlus className="text-lg"/>
              <p>Add Lecture</p>
            </button>
            </div>
          </details>
        ))}
      </div>

      {/* modal */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal modalData={viewSubSection}  setModalData={setViewSubSection} view={true} />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}

      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NestedView;
