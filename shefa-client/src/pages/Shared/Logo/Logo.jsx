import logo from "../../../assets/logo.png"; 

const Logo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      
      {/* Logo Image */}
      <div className="w-11 h-11 rounded-xl overflow-hidden shadow-lg">
        <img
          src={logo}
          alt="Shefa Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* App Name - hidden on mobile (sm) */}
      <h1 className="hidden sm:block text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        শেফা
      </h1>
    </div>
  );
};

export default Logo;