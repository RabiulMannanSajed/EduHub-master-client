import { motion } from "framer-motion";
import c from "../../../../assets/images/c.png";
import s from "../../../../assets/images/s.png";
import f from "../../../../assets/images/f.png";

const AuthHome = () => {
  // Animation variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="w-[80%] mx-auto">
      {/* 1 */}
      <motion.div
        className="flex bg-amber-200 items-center justify-center mt-10 mb-10 rounded-2xl"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="ml-10">
          <p className="text-4xl mb-9 font-bold text-gray-500 uppercase">
            Courses
          </p>
          <p className="text-2xl w-[70%] text-gray-500">
            Here You find All Courses of all Subject and find the instructor
          </p>
          <div className="mt-20 bg-amber-600 hover:bg-amber-500 w-[150px] rounded-md transform transition duration-500 hover:scale-105 cursor-pointer">
            <p className="text-center px-5 py-2 text-2xl font-bold text-white hover:text-gray-700 ">
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
      </motion.div>

      {/* 2 */}
      <motion.div
        className="flex bg-[#E4FACF] items-center justify-center mt-10 mb-10 rounded-2xl"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <div>
          <img className="w-[90%] ml-7" src={s} alt="" />
        </div>

        <div className="text-right p-10">
          <p className="text-4xl mb-9 font-bold text-gray-500 uppercase">
            Sell Your Items
          </p>
          <p className="text-2xl text-gray-500">
            What is useless to one person might be valuable to another
          </p>
          <div className="mt-20 ml-[70%] bg-[#75a841] w-[150px] hover:bg-[#8fd14c]  rounded-md transition duration-500 hover:scale-105 cursor-pointer">
            <p
              className="text-center px-5 py-2 text-2xl font-bold text-white hove
            hover:text-gray-800"
            >
              Courses
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3 */}
      <motion.div
        className="flex bg-[#E6CFFA] items-center justify-center mt-10 mb-10 rounded-2xl"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        <div className="ml-10">
          <p className="text-4xl mb-9 font-bold text-gray-500 uppercase">
            Freelancing
          </p>
          <p className="text-2xl w-[70%] text-gray-500">
            Here You find All Courses of all Subject and find the instructor
          </p>
          <div className="mt-20 bg-[#8f40d4] hover:bg-[#aa60eb] w-[150px] rounded-md transition duration-500 hover:scale-105 cursor-pointer">
            <p className="text-center pl-5 pr-5 pt-2 pb-2 text-2xl font-bold text-white hover:text-gray-800">
              Courses
            </p>
            {/* D1A1FB */}
          </div>
        </div>
        <div>
          <img
            src={f}
            className="transform transition-transform duration-800 hover:scale-110"
            alt=""
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthHome;
