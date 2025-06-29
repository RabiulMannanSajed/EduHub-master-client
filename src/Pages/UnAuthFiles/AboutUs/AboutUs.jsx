const AboutUs = () => {
  return (
    <div className="w-[80%] mx-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            About NextGen Learner
          </h1>
        </header>

        {/* Introduction Section */}
        <section className="mb-12">
          <p className="text-lg text-gray-600">
            At [Your Platform Name], we're on a mission to simplify and enhance
            the student experience. Our platform serves as a one-stop solution
            where students can access a wide range of services—from finding
            tuition help and buying or selling items, to enrolling in courses,
            donating blood, and chatting with friends. Whether you're looking to
            improve your academics, connect with peers, or give back to the
            community, we’ve got you covered.
          </p>
        </section>

        {/* What We Do Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            What We Do
          </h2>
          <ul className="space-y-4">
            <li className="text-lg text-gray-700">
              <strong>Tuition Assistance:</strong> Get the academic help you
              need or help others by posting and finding tuition services across
              a variety of subjects.
            </li>
            <li className="text-lg text-gray-700">
              <strong>Buy and Sell Items:</strong> Need textbooks, electronics,
              or furniture? Our secure marketplace lets you easily buy and sell
              items within the student community.
            </li>
            <li className="text-lg text-gray-700">
              <strong>Enroll in Courses:</strong> Browse a variety of courses
              designed to help you advance your education and career. Enrollment
              is quick and simple.
            </li>
            <li className="text-lg text-gray-700">
              <strong>Donate Blood:</strong> Join our efforts to save lives by
              finding and signing up for blood donation drives right from the
              platform.
            </li>
            <li className="text-lg text-gray-700">
              <strong>Chat with Friends:</strong> Stay in touch with friends and
              classmates through our integrated chat feature, whether it's for
              study sessions or socializing.
            </li>
          </ul>
        </section>

        {/* Meet Our Developer Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Meet Our Developer Team
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We have an incredible team of passionate developers dedicated to
            innovating new features and ensuring an intuitive, secure, and
            enjoyable experience for every user.
          </p>
          <ul className="space-y-4">
            {[
              {
                name: "Alice Johnson",
                role: "Lead Developer",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
                details: "",
              },
              {
                name: "Bob Smith",
                role: "Backend Developer",
                img: "https://randomuser.me/api/portraits/men/46.jpg",
                details: "",
              },
              {
                name: "Catherine Lee",
                role: "Frontend Developer",
                img: "https://randomuser.me/api/portraits/women/47.jpg",
                details: "",
              },
              {
                name: "David Brown",
                role: "UI/UX Designer",
                img: "https://randomuser.me/api/portraits/men/48.jpg",
                details: "",
              },
              {
                name: "Emily Davis",
                role: "DevOps Engineer",
                img: "https://randomuser.me/api/portraits/women/49.jpg",
                details: "",
              },
              {
                name: "Frank Wilson",
                role: "QA Specialist",
                img: "https://randomuser.me/api/portraits/men/50.jpg",
                details: "",
              },
            ].map((dev) => (
              <li
                key={dev.name}
                className="flex items-center space-x-4 bg-[#f6f6f9] p-4 rounded-lg"
              >
                <img
                  src={dev.img}
                  alt={dev.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg text-black font-semibold">{dev.name}</p>
                  <p className="text-black italic">{dev.role}</p>
                  <p className="text-black italic mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    consequat.
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact Us Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Have a question or need assistance? We’re here to help!
          </p>
          <ul className="space-y-4">
            <li className="text-lg text-gray-700">
              <strong>Email:</strong> [contact@yourplatform.com]
            </li>
            <li className="text-lg text-gray-700">
              <strong>Phone:</strong> [Your Phone Number]
            </li>
            <li className="text-lg text-gray-700">
              <strong>Office Address:</strong> [Your Office Address, if
              applicable]
            </li>
          </ul>
        </section>

        {/* Get Involved Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Get Involved
          </h2>
          <p className="text-lg text-gray-600">
            Join the [Your Platform Name] community today! Whether you're
            looking to study, connect, sell, buy, or help save lives, we’re
            excited to have you on board. Let’s work together to build a
            stronger, supportive student network!
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
