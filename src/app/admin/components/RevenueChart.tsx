"use client";

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function RevenueChart({ data }: { data: { month: string, revenue: number, students: number }[] }) {
  // We expect data to be sorted chronologically

  return (
    <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col h-[400px]">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
          <TrendingUp size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Revenue Growth</h3>
          <p className="text-white/50 text-sm">Monthly revenue from verified enrollments</p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-white/40">No revenue data available yet.</div>
      ) : (
        <div className="flex-1 w-full min-h-0 relative z-10 -ml-4 mt-4 text-xs font-bold">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                stroke="#ffffff40" 
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#ffffff40" 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `Rs.${value > 0 ? value/1000 + 'k' : 0}`}
                dx={-10}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F1535', borderColor: '#ffffff20', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#22c55e', fontWeight: 'bold' }}
                formatter={(value: any) => [`Rs. ${Number(value).toLocaleString()}`, 'Revenue']}
                labelStyle={{ color: '#ffffff80', marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#22c55e" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                activeDot={{ r: 6, strokeWidth: 0, fill: '#22c55e' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
