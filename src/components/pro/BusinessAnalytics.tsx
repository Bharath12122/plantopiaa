import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { BarChart, LineChart, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface MetricData {
  metric_date: string;
  revenue: number;
  expenses: number;
  inventory_count: number;
  sales_count: number;
}

export const BusinessAnalytics = () => {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in to view analytics");
        return;
      }

      const { data, error } = await supabase
        .from('business_metrics')
        .select('*')
        .eq('user_id', session.user.id)
        .order('metric_date', { ascending: true });

      if (error) throw error;
      setMetrics(data || []);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      toast.error('Failed to load business metrics');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading analytics...</div>;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Business Analytics
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-[#1A1F2C] border-[#9b87f5]/20">
            <BarChart className="w-12 h-12 text-[#9b87f5] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Revenue Overview</h3>
            <p className="text-2xl font-bold text-[#9b87f5]">
              ${metrics.reduce((sum, m) => sum + (m.revenue || 0), 0).toFixed(2)}
            </p>
          </Card>
          
          <Card className="p-6 bg-[#1A1F2C] border-[#9b87f5]/20">
            <LineChart className="w-12 h-12 text-[#9b87f5] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Total Sales</h3>
            <p className="text-2xl font-bold text-[#9b87f5]">
              {metrics.reduce((sum, m) => sum + (m.sales_count || 0), 0)}
            </p>
          </Card>
          
          <Card className="p-6 bg-[#1A1F2C] border-[#9b87f5]/20">
            <TrendingUp className="w-12 h-12 text-[#9b87f5] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Current Inventory</h3>
            <p className="text-2xl font-bold text-[#9b87f5]">
              {metrics[metrics.length - 1]?.inventory_count || 0}
            </p>
          </Card>
        </div>

        <Card className="p-6 bg-[#1A1F2C] border-[#9b87f5]/20">
          <h3 className="text-xl font-semibold mb-4 text-white">Revenue Trend</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3B1D" />
                <XAxis dataKey="metric_date" stroke="#9b87f5" />
                <YAxis stroke="#9b87f5" />
                <Tooltip contentStyle={{ backgroundColor: '#1A1F2C', border: 'none' }} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#9b87f5" 
                  name="Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#7E69AB" 
                  name="Expenses"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
};