import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface Resource {
  id: string;
  title: string;
  content_type: string;
  content_url: string;
  description: string;
}

export const EducationalResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('pro_educational_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load educational resources');
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-8 h-8 text-primary" />;
      case 'document':
        return <FileText className="w-8 h-8 text-primary" />;
      default:
        return <BookOpen className="w-8 h-8 text-primary" />;
    }
  };

  if (isLoading) {
    return <div>Loading resources...</div>;
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Educational Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card key={resource.id} className="p-6">
              <div className="flex items-start space-x-4">
                {getIcon(resource.content_type)}
                <div>
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <Button
                    variant="outline"
                    onClick={() => window.open(resource.content_url, '_blank')}
                  >
                    View Resource
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};