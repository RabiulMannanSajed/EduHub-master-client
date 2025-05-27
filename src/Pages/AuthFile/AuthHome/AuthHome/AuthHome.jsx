import c from "../../../../assets/images/c.png";
import s from "../../../../assets/images/s.png";
import f from "../../../../assets/images/f.png";
const AuthHome = () => {
  return (
    <div className="w-[70%] mx-auto">
      <div className="flex  bg-amber-200 items-center justify-center mt-10 mb-10 rounded-2xl">
        <div className="ml-10">
          <p className="text-4xl mb-9 font-bold text-gray-500 uppercase">
            Courses
          </p>
          <p className="text-2xl w-[70%] text-gray-500">
            Here You find All Courses of all Subject and find the instructor{" "}
          </p>
          <div className="mt-20 bg-amber-600 w-[150px] rounded-md">
            <p className="text-center pl-5 pr-5 pt-2 pb-2 text-2xl font-bold">
              Courses
            </p>
          </div>
        </div>
        <div>
          <img
            src={c}
            className="transform transition-transform duration-800 hover:scale-110"
            alt=""
          />
        </div>
      </div>

      {/* 2 */}
      <div>
        <div className="flex  bg-[#E4FACF] items-center justify-center mt-10 mb-10 rounded-2xl">
          <div>
            <img className="w-[90%] ml-7" src={s} alt="" />
          </div>

          <div className="  text-right p-10">
            <p className="text-4xl mb-9 font-bold text-gray-500 uppercase">
              Sell Your Items
            </p>
            <p className="text-2xl  text-gray-500">
              What is useless to one person might be valuable to another
            </p>
            <div className="mt-20 ml-[70%] bg-[#CCFF99] w-[150px] rounded-md">
              <p className="text-center px-5 py-2 text-2xl font-bold">
                Courses
              </p>
            </div>
          </div>
        </div>{" "}
      </div>

      {/* 3 */}
      <div className="flex  bg-[#E6CFFA] items-center justify-center mt-10 mb-10 rounded-2xl">
        <div className="ml-10">
          <p className="text-4xl mb-9 font-bold text-gray-500 uppercase">
            Freelancing
          </p>
          <p className="text-2xl w-[70%] text-gray-500">
            Here You find All Courses of all Subject and find the instructor{" "}
          </p>
          <div className="mt-20 bg-[#D1A1FB] w-[150px] rounded-md">
            <p className="text-center pl-5 pr-5 pt-2 pb-2 text-2xl font-bold">
              Courses
            </p>
          </div>
        </div>
        <div>
          <img
            src={f}
            className="transform transition-transform duration-800 hover:scale-110"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default AuthHome;
