"use client";

import { motion } from "framer-motion";
import { Eye, Clock, Users, TrendingUp, BarChart3, Activity } from "lucide-react";
import { useAnalytics } from "../hooks/useAnalytics";

export function AnalyticsDashboard() {
  const { analytics } = useAnalytics();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const stats = [
    {
      icon: Eye,
      label: "Total Visits",
      value: analytics.totalVisits.toLocaleString(),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      label: "Current Visitors",
      value: analytics.currentVisitors.toString(),
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Clock,
      label: "Avg Session Time",
      value: formatTime(analytics.averageSessionTime),
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Activity,
      label: "Current Session",
      value: formatTime(analytics.currentSessionTime),
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: BarChart3,
      label: "Page Views",
      value: analytics.pageViews.toLocaleString(),
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      icon: TrendingUp,
      label: "Engagement Rate",
      value: `${Math.min(100, Math.floor((analytics.currentSessionTime / 60) * 10))}%`,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-gray-800">Live Analytics</h3>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-xl p-3 border border-gray-100`}
          >
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs font-medium text-gray-600">{stat.label}</span>
            </div>
            <div className={`text-lg font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Real-time data</span>
          <span>Updated live</span>
        </div>
      </div>
    </motion.div>
  );
}