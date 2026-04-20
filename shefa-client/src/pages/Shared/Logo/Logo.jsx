import logo from "../../../assets/logo.png";
import "animate.css";
const Logo = () => {
  return (
    <div className="flex items-center gap-2 hover:scale-103 transition-transform duration-300 cursor-pointer">

      {/* Logo Image */}
      <div className="w-11 h-11 rounded-xl overflow-hidden shadow-lg">
        <img
          src={logo}
          alt="Shefa Logo"
          className="w-full h-full object-cover animate__animated animate__fadeInDown duration-400 "
        />
      </div>

      {/* App Name */}
      <h1 className="hidden sm:block text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent ">
        শেফা
      </h1>

    </div>
  );
};

export default Logo;