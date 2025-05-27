import intro_medicai from "../assets/intro_medicai.mp4";
const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap rounded-lg">
      <div className="w-full flex flex-col items-center  relative">
        <video
          className="w-full rounded-2xl object-cover md:max-h-[500px]"
          src={intro_medicai}
          autoPlay
          muted
          loop
          playsInline
        >
          Your browser does not support the video tag.
        </video>

        <div
          className="absolute inset-0 rounded-2xl backdrop-blur-xs bg-white/20 "
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.10) 20%, rgba(0,0,0,0.38) 60%)",
          }}
        ></div>

        <div className="absolute inset-0 flex flex-col items-center justify-end z-10 px-4 max-sm:w-[100%] w-[60%] sm:pb-14 sm:ps-10  pb-6 ps-5 ">
          <h1 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg text-center mb-4 animate-fadeIn">
            Your Health, <span className="text-[#5f6fff]">Our AI Care</span>
          </h1>
          <p className="text-white text-[12px] sm:text-lg md:text-xl font-medium drop-shadow text-center animate-fadeIn delay-200">
            Fast, smart and reliable healthcare guidance powered by artificial
            intelligence. Describe your symptoms, get instant direction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
