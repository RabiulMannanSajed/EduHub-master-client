import video from "../../../assets/images/learn earn grow.mp4";
import nsu from "../../../assets/images/aiub_logo.png";
import brac from "../../../assets/images/brac_logo.png";
import daffodil from "../../../assets/images/daffodil_logo.png";

const Home = () => {
  return (
    <div>
      <section className="relative mx-auto w-5/6 h-screen text-white p-10">
        <div className="relative rounded-[50px] overflow-hidden w-full h-full">
          <video autoplay loop muted className="background-video">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="overlay"></div>

          <div className="flex items-center justify-center h-full text-center p-5 my-auto">
            <div className="my-auto">
              <div className="flex flex-col items-center justify-center pb-20 pt-20">
                <h1 className="text-5xl font-semibold fade-in-text mb-5">
                  Learn, Earn and Grow by EduHub
                </h1>

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
                  <a href="#" className="glow-button">
                    Job Feed <span className="text-gray-100">→</span>
                  </a>
                </div>
              </div>
              <div>
                <div className="mt-10 text-lg text-gray-100">
                  <p className="mb-2 pr-8 pb-4">Trusted by:</p>
                  <div className="flex justify-center space-x-10">
                    <img src={nsu} alt="Meta" className="trusted-logo" />
                    <img src={brac} alt="Google" className="trusted-logo" />
                    <img
                      src={daffodil}
                      alt="Netflix"
                      className="trusted-logo"
                    />
                  </div>
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
