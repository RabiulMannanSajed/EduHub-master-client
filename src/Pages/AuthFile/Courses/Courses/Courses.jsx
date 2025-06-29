import React from "react";
import CreateCourse from "../CreateCourse/CreateCourse";
import useCourses from "../../../../hooks/useCourses";
import { NavLink } from "react-router-dom";

const Courses = () => {
  const [courses] = useCourses();
  const corsesData = courses?.data || [];
  console.log("corsesData", corsesData);
  return (
    <div className="w-[80%] mx-auto mt-5 h-screen">
      <CreateCourse />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {corsesData.length > 0 ? (
          corsesData.map((course) => (
            <div key={course._id} className="border p-4 rounded-lg shadow">
              <img
                src={course.courseImage || "/img/default-course.jpg"}
                alt={course.title}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{course.title}</h2>
              <p className="text-gray-700 mt-1">${course.price}</p>
              <NavLink
                to={`/course-details/${course._id}`}
                className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                See Course
              </NavLink>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600">
            No courses found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Courses;
