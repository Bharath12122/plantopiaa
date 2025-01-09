import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

interface Collection {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

interface CollectionEntry {
  id: string;
  plant_id: string;
  notes: string;
  category: string;
  growth_stage: string;
}

export const PlantCollection = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const { data, error } = await supabase
        .from('plant_collections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
      toast.error('Failed to load collections');
    } finally {
      setIsLoading(false);
    }
  };

  const createCollection = async () => {
    if (!newCollectionName.trim()) {
      toast.error('Please enter a collection name');
      return;
    }

    try {
      const { error } = await supabase
        .from('plant_collections')
        .insert([{ name: newCollectionName.trim() }]);

      if (error) throw error;

      toast.success('Collection created successfully');
      setNewCollectionName('');
      fetchCollections();
    } catch (error) {
      console.error('Error creating collection:', error);
      toast.error('Failed to create collection');
    }
  };

  const deleteCollection = async (id: string) => {
    try {
      const { error } = await supabase
        .from('plant_collections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Collection deleted successfully');
      fetchCollections();
    } catch (error) {
      console.error('Error deleting collection:', error);
      toast.error('Failed to delete collection');
    }
  };

  if (isLoading) {
    return <div>Loading collections...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          placeholder="New collection name"
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={createCollection}>
          <Plus className="w-4 h-4 mr-2" />
          Create Collection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <Card key={collection.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{collection.name}</h3>
                <p className="text-sm text-gray-500">{collection.description || 'No description'}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteCollection(collection.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};