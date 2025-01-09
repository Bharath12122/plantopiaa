import { Check, X } from "lucide-react";

const features = [
  {
    name: "Plant Identifications",
    free: "3 per month",
    pro: "Unlimited",
  },
  {
    name: "Care Guides",
    free: "Basic",
    pro: "Advanced & Personalized",
  },
  {
    name: "Offline Access",
    free: false,
    pro: true,
  },
  {
    name: "Ad-Free Experience",
    free: false,
    pro: true,
  },
  {
    name: "Plant Collection",
    free: "Limited",
    pro: "Unlimited",
  },
  {
    name: "Support",
    free: "Community",
    pro: "Priority",
  },
];

export const ProLandingComparison = () => {
  return (
    <div className="mb-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        Free vs Pro Comparison
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full max-w-4xl mx-auto">
          <thead>
            <tr className="border-b border-[#9b87f5]/20">
              <th className="py-4 px-6 text-left text-gray-400">Feature</th>
              <th className="py-4 px-6 text-center text-gray-400">Free</th>
              <th className="py-4 px-6 text-center text-[#9b87f5]">Pro</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={index}
                className="border-b border-[#9b87f5]/20 hover:bg-[#9b87f5]/5 transition-colors"
              >
                <td className="py-4 px-6 text-white">{feature.name}</td>
                <td className="py-4 px-6 text-center text-gray-400">
                  {typeof feature.free === "boolean" ? (
                    feature.free ? (
                      <Check className="w-5 h-5 mx-auto text-green-500" />
                    ) : (
                      <X className="w-5 h-5 mx-auto text-red-500" />
                    )
                  ) : (
                    feature.free
                  )}
                </td>
                <td className="py-4 px-6 text-center text-[#9b87f5]">
                  {typeof feature.pro === "boolean" ? (
                    feature.pro ? (
                      <Check className="w-5 h-5 mx-auto text-green-500" />
                    ) : (
                      <X className="w-5 h-5 mx-auto text-red-500" />
                    )
                  ) : (
                    feature.pro
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};