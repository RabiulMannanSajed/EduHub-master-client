import video from "../../../assets/images/learn earn grow.mp4";
import nsu from "../../../assets/images/aiub_logo.png";
import brac from "../../../assets/images/brac_logo.png";
import daffodil from "../../../assets/images/daffodil_logo.png";
import eastwest from "../../../assets/images/daffodil_logo.png";
import "./home.css";
const Home = () => {
  return (
    <div>
      <section className="relative mx-auto w-5/6 h-screen text-white p-10">
        <div className="relative rounded-[50px] overflow-hidden w-full h-full">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -2,
            }}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.7)",
              zIndex: -1,
            }}
          ></div>

          {/* Content */}
          <div className="flex items-center justify-center h-full text-center p-5 my-auto relative z-10">
            <div className="my-auto">
              {/* Heading and Search */}
              <div className="flex flex-col items-center justify-center pb-20 pt-20">
                <h1 className="text-5xl font-semibold fade-in-text mb-5">
                  Learn, Earn and Grow by NextGen Learner
                </h1>

                {/* Search Bar */}
                <div className="relative w-full max-w-2xl mx-auto mb-6">
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    className="w-full px-6 py-3 text-lg rounded-full bg-white text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="absolute right-1 top-1/2 transform -translate-y-1/2 p-3 bg-purple-500 rounded-full text-white -mr-0.5 hover:bg-purple-700 hover:rounded-l">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 5.65a7.5 7.5 0 010 10.6z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Categories */}
                <div className="flex justify-center space-x-5">
                  <a href="#" className="glow-button">
                    Online Marketplace <span className="text-gray-100">→</span>
                  </a>
                  <a href="#" className="glow-button">
                    Online Courses <span className="text-gray-100">→</span>
                  </a>
                  <a href="#" className="glow-button">
                    Blood Donation <span className="text-gray-100">→</span>
                  </a>
                </div>
              </div>

              {/* Trusted Logos */}
              <div className="mt-10 text-lg text-gray-100">
                <p className="mb-2 pr-8 pb-4">Trusted by:</p>
                <div className="flex justify-center space-x-10">
                  <img src={nsu} alt="NSU" className="h-[60px]" />
                  <img src={brac} alt="BRAC" className="h-[60px]" />
                  <img src={daffodil} alt="Daffodil" className="h-[60px]" />
                  <img src={eastwest} alt="East West" className="h-[60px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
