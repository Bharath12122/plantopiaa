import { 
  Sprout, Crown, Leaf, Heart, 
  Sparkles, Globe, Timer, MortarPestle 
} from "lucide-react";

interface BadgeIconProps {
  badgeName: string;
  className?: string;
}

export const BadgeIcon = ({ badgeName, className = "h-6 w-6" }: BadgeIconProps) => {
  switch (badgeName) {
    case "Sprout Starter":
      return <Sprout className={className} />;
    case "Garden Guru":
      return <Crown className={className} />;
    case "Disease Detective":
      return <Leaf className={className} />;
    case "Herbal Healer":
      return <MortarPestle className={className} />;
    case "Companion Planter":
      return <Heart className={className} />;
    case "Exotic Explorer":
      return <Sparkles className={className} />;
    case "Sustainability Hero":
      return <Globe className={className} />;
    case "Blossom Booster":
      return <Timer className={className} />;
    default:
      return <Leaf className={className} />;
  }
};