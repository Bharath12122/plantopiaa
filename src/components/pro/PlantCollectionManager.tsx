import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, Plus, List } from "lucide-react";

export const PlantCollectionManager = () => {
  const [collections] = useState([
    { name: "Medicinal Plants", count: 12 },
    { name: "Rare Species", count: 8 },
    { name: "Indoor Garden", count: 15 },
  ]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Plant Collection Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Card className="p-6 bg-[#1A1F2C] border-[#9b87f5]/20">
              <div className="flex items-center space-x-4">
                <Folder className="w-8 h-8 text-[#9b87f5]" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Organize Your Plants</h3>
                  <p className="text-gray-400">Create custom collections and categories</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-[#1A1F2C] border-[#9b87f5]/20">
              <div className="flex items-center space-x-4">
                <List className="w-8 h-8 text-[#9b87f5]" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Track Growth</h3>
                  <p className="text-gray-400">Monitor progress and development</p>
                </div>
              </div>
            </Card>
            <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create New Collection
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {collections.map((collection, index) => (
              <Card
                key={index}
                className="p-6 bg-[#1A1F2C] border-[#9b87f5]/20 hover:border-[#9b87f5]/40 transition-colors"
              >
                <h4 className="text-lg font-semibold text-white mb-2">{collection.name}</h4>
                <p className="text-gray-400">{collection.count} plants</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};