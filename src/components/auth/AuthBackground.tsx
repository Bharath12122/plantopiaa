import { Leaf } from "lucide-react";

const AuthBackground = () => {
  return (
    <>
      <div className="absolute -top-3 -left-3 text-green-200/30">
        <Leaf className="h-8 w-8 sm:h-10 sm:w-10 animate-float" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute -bottom-3 -right-3 text-green-200/30">
        <Leaf className="h-8 w-8 sm:h-10 sm:w-10 animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </>
  );
};

export default AuthBackground;