import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LoginPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginPrompt = ({ open, onOpenChange }: LoginPromptProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Continue Your Plant Journey
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            You've reached the limit for free usage. Sign up or log in to continue exploring more plant insights!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Button
            onClick={() => navigate("/auth")}
            className="bg-gradient-to-r from-purple-600 to-purple-400 hover:opacity-90 text-white"
          >
            Sign Up Now
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/auth")}
            className="border-purple-400 text-purple-600 hover:bg-purple-50"
          >
            Log In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};