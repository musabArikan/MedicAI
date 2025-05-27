import intro_medicai from "../assets/intro_medicai.mp4";
const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap  rounded-lg ">
      <div className="w-full flex flex-col items-center justify-center relative">
        <video
          className="w-full rounded-lg shadow-lg object-cover  md:max-h-[500px]"
          src={intro_medicai}
          autoPlay
          muted
          loop
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Header;
