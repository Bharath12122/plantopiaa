import { Leaf } from "lucide-react";

const AuthLogo = () => {
  return (
    <div className="text-center mb-4 sm:mb-6 relative z-10">
      <div className="flex justify-center items-center gap-1.5 mb-2">
        <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 animate-float" />
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
          Plantopiaa
        </h1>
      </div>
      <p className="text-xs sm:text-sm text-gray-600">Your personal plant care assistant</p>
    </div>
  );
};

export default AuthLogo;