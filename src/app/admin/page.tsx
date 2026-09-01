"use client";

import React from "react";
import { Search, Settings, Bell, User as UserIcon } from "lucide-react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";

const salesData = [
  { name: "Jan", value: 300 },
  { name: "Feb", value: 450 },
  { name: "Mar", value: 300 },
  { name: "Apr", value: 200 },
  { name: "May", value: 350 },
  { name: "Jun", value: 250 },
  { name: "Jul", value: 400 },
  { name: "Aug", value: 350 },
  { name: "Sep", value: 400 },
  { name: "Oct", value: 300 },
  { name: "Nov", value: 500 },
  { name: "Dec", value: 400 },
];

const usersData = [
  { name: "A", users: 400 },
  { name: "B", users: 300 },
  { name: "C", users: 200 },
  { name: "D", users: 500 },
  { name: "E", users: 400 },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top Navbar */}
      <header className="flex justify-between items-center bg-transparent py-2">
        <div>
          <div className="text-white/50 text-xs font-semibold">Pages / Dashboard</div>
          <h2 className="text-lg font-bold text-white tracking-wide">Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
            <input 
              type="text" 
              placeholder="Type here..." 
              className="pl-10 pr-4 py-2 bg-[#0F1535]/80 border border-white/10 rounded-full text-sm text-white focus:outline-none focus:border-blue-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 text-white/70 hover:text-white font-semibold text-sm">
            <UserIcon size={16} /> Sign In
          </button>
          <Settings size={18} className="text-white/70 cursor-pointer hover:text-white" />
          <Bell size={18} className="text-white/70 cursor-pointer hover:text-white" />
        </div>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Today's Money", value: "$53,000", change: "+55%" },
          { title: "Today's Users", value: "2,300", change: "+5%" },
          { title: "New Clients", value: "+3,052", change: "-14%", negative: true },
          { title: "Total Sales", value: "$173,000", change: "+8%" }
        ].map((metric, i) => (
          <div key={i} className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-white/50 text-xs font-bold mb-1">{metric.title}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold">{metric.value}</span>
                <span className={`text-xs font-bold ${metric.negative ? "text-red-500" : "text-green-400"}`}>{metric.change}</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">W</span>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto md:h-[300px]">
        
        {/* Welcome Card */}
        <div className="bg-[#050C24] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between border border-white/5 lg:col-span-1 shadow-[inset_0_0_100px_rgba(0,100,255,0.2)]">
          <div className="absolute right-0 bottom-0 w-[80%] h-[120%] bg-[url('https://images.unsplash.com/photo-1544468266-6a8948003cd7?q=80&w=600')] bg-cover bg-center opacity-40 mix-blend-screen mix-blend-lighten pointer-events-none" style={{ filter: "hue-rotate(45deg) saturate(2)" }} />
          
          <div className="relative z-10">
            <div className="text-white/70 text-sm font-semibold mb-1">Welcome back</div>
            <h3 className="text-3xl font-bold text-white mb-2">Mark Johnson</h3>
            <p className="text-white/60 text-sm max-w-[200px] leading-relaxed">
              Glad to see you again! Ask me anything.
            </p>
          </div>
          <button className="relative z-10 text-white text-sm font-semibold mt-8 text-left hover:text-blue-400 flex items-center gap-1">
            Tap to record <span>→</span>
          </button>
        </div>

        {/* Satisfaction Rate */}
        <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:col-span-1 flex flex-col">
          <h3 className="text-white font-bold mb-1">Satisfaction Rate</h3>
          <p className="text-white/50 text-xs mb-6">From all projects</p>
          <div className="flex-1 flex items-center justify-center relative">
            {/* SVG Circle Graph Fake */}
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#3B82F6" strokeWidth="10" fill="none" strokeDasharray="250" strokeDashoffset="25" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mb-1 shadow-[0_0_15px_rgba(37,99,235,0.8)]">
                  <span className="text-white text-xs text-xl">☺</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 w-full flex justify-between px-2">
              <span className="text-white/50 text-xs">0%</span>
              <div className="text-center">
                <span className="text-2xl font-bold text-white block">95%</span>
                <span className="text-white/50 text-[10px]">Based on likes</span>
              </div>
              <span className="text-white/50 text-xs">100%</span>
            </div>
          </div>
        </div>

        {/* Referral Tracking */}
        <div className="bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:col-span-1 flex justify-between items-center relative overflow-hidden">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-white font-bold mb-8">Referral Tracking</h3>
              
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-4 w-40">
                <div className="text-white/50 text-xs font-bold mb-1">Invited</div>
                <div className="text-white text-xl font-bold">145 people</div>
              </div>
              
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-40">
                <div className="text-white/50 text-xs font-bold mb-1">Bonus</div>
                <div className="text-white text-xl font-bold">1,465</div>
              </div>
            </div>
          </div>
          
          <div className="relative w-40 h-40 mr-4">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
                <circle cx="50" cy="50" r="45" stroke="#10B981" strokeWidth="6" fill="none" strokeDasharray="280" strokeDashoffset="40" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-white/50 text-xs">Safety</span>
                <span className="text-white text-3xl font-bold">9.3</span>
                <span className="text-white/50 text-[10px]">Total Score</span>
              </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Sales Overview */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 backdrop-blur-md border border-white/10 rounded-3xl p-6 relative">
           <h3 className="text-white font-bold mb-1">Sales overview</h3>
           <p className="text-green-400 text-xs font-bold mb-6">(+5) more <span className="text-white/50">in 2021</span></p>
           
           <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={salesData}>
                 <defs>
                   <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5}/>
                     <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                 <Tooltip contentStyle={{ backgroundColor: "#0F1535", borderColor: "rgba(255,255,255,0.1)", borderRadius: "10px" }} />
                 <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Active Users */}
        <div className="lg:col-span-1 bg-gradient-to-br from-[#0F1535]/90 to-[#121A42]/90 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col">
           <div className="h-[180px] w-full mb-4 bg-gradient-to-b from-[#1E293B] to-[#0F1535] rounded-2xl p-4 border border-white/5">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={usersData} barSize={6}>
                 <Bar dataKey="users" fill="#fff" radius={[10, 10, 10, 10]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
           
           <h3 className="text-white font-bold mb-1">Active Users</h3>
           <p className="text-green-400 text-xs font-bold mb-6">(+23) <span className="text-white/50">than last week</span></p>
           
           <div className="grid grid-cols-4 gap-2 mt-auto">
             <div>
               <div className="flex items-center gap-1 text-white/50 text-[10px] mb-1">
                 <div className="w-2 h-2 bg-blue-500 rounded-sm"></div> Users
               </div>
               <div className="text-white font-bold text-sm">32,984</div>
             </div>
             <div>
               <div className="flex items-center gap-1 text-white/50 text-[10px] mb-1">
                 <div className="w-2 h-2 bg-blue-500 rounded-sm"></div> Clicks
               </div>
               <div className="text-white font-bold text-sm">2.42m</div>
             </div>
             <div>
               <div className="flex items-center gap-1 text-white/50 text-[10px] mb-1">
                 <div className="w-2 h-2 bg-blue-500 rounded-sm"></div> Sales
               </div>
               <div className="text-white font-bold text-sm">2,400$</div>
             </div>
             <div>
               <div className="flex items-center gap-1 text-white/50 text-[10px] mb-1">
                 <div className="w-2 h-2 bg-blue-500 rounded-sm"></div> Items
               </div>
               <div className="text-white font-bold text-sm">320</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
