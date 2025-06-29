import React from "react";
import CreateCourse from "../CreateCourse/CreateCourse";
import useCourses from "../../../../hooks/useCourses";
import { NavLink } from "react-router-dom";
import useBloodDonors from "../../../../hooks/useBloodDonners";

const Courses = () => {
  const [courses] = useCourses();
  const [users] = useBloodDonors();

  const corsesData = courses?.data || [];
  console.log("corsesData", corsesData);
  return (
    <div className="w-[80%] mx-auto mt-5">
      <CreateCourse />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {corsesData.length > 0 ? (
          corsesData.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={course.courseImage || "/img/default-course.jpg"}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {course.title}
                </h3>

                {/* Author */}

                {/* Price & Status */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-red-600 font-bold">
                    ${course.price}
                  </span>
                  <span className=" font-bold">
                    Duration {course.hour} Hours
                  </span>
                  {course.status && (
                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {course.status}
                    </span>
                  )}
                </div>

                {/* Duration */}
                {course.duration && (
                  <div className="mt-2 text-sm text-gray-600">
                    {course.duration} Class Hours
                  </div>
                )}

                {/* Rating */}
                <div className="mt-2 flex items-center text-yellow-500">
                  {"⭐".repeat(course.rating || 4)}{" "}
                  <span className="text-gray-600 text-xs ml-2">
                    ({course.reviews || 0} reviews)
                  </span>
                </div>

                {/* View Button */}
                <NavLink
                  to={`/course-details/${course._id}`}
                  className="mt-4 w-full inline-block bg-red-600 text-white py-2 rounded-md hover:bg-red-700 text-sm font-semibold text-center"
                >
                  View Course
                </NavLink>
              </div>
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
