import assistantIcon from "../assets/assistant_icon.png";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <img
            src={assistantIcon}
            alt="Assistant Loading"
            className="w-28 h-28 z-10 animate-fade-in"
          />
          <span
            className="absolute w-36 h-36 rounded-full border-8 border-primary border-t-transparent animate-spin"
            style={{ borderTopColor: "#fff", borderRightColor: "#5f6fff" }}
          ></span>
        </div>
        <span className="text-lg font-semibold text-primary">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
