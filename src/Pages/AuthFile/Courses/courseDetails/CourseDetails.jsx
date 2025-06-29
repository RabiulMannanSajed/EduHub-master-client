import React from "react";
import { useParams } from "react-router";
import useCourses from "../../../../hooks/useCourses";
import VideoChat from "../../VideoChat/VideoChat";
import { NavLink } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();
  const [courses] = useCourses();

  // Check data exists
  if (!courses?.data) return <div>No courses found.</div>;

  // Find the course by _id
  const course = courses?.data.find((c) => c._id === id);

  if (!course) return <div>Course not found.</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <NavLink to="/videoChat">
        <p className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
          Create Video Chat{" "}
        </p>
      </NavLink>
      <h1 className="text-2xl font-bold mb-2">{course?.title}</h1>
      <p className="text-gray-700 mb-2">Price: ${course?.price}</p>
      <p className="text-gray-700 mb-2">Duration: {course?.hour} hours</p>
      {course?.courseImage ? (
        <img
          src={course?.courseImage}
          alt={course?.title}
          className="w-full rounded mb-4"
        />
      ) : (
        <div className="bg-gray-200 w-full h-48 flex items-center justify-center mb-4">
          No image
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Meet Info</h2>
      <p className="mb-4">{course.meet}</p>

      <h2 className="text-xl font-semibold mb-2">Videos</h2>
      {course.videos?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {course.videos.map((video) => {
            // Extract the video ID robustly
            let videoId = "";

            // If it's a YouTube link with "watch?v="
            if (video.video.includes("watch?v=")) {
              videoId = video.video.split("watch?v=")[1]?.split("&")[0];
            }
            // If it's already an embed link
            else if (video.video.includes("embed/")) {
              videoId = video.video.split("embed/")[1]?.split("?")[0];
            }
            // Fallback
            else {
              videoId = video.video;
            }

            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            return (
              <div
                key={video._id}
                className="w-full relative pb-[56.25%] h-0 overflow-hidden rounded"
              >
                <iframe
                  src={embedUrl}
                  title={`Course Video ${video._id}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p>No videos.</p>
      )}
    </div>
  );
};

export default CourseDetails;
