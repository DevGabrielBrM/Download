"use client";

import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const sentimentTrendData = [
  { name: "Mon", positive: 42, negative: 8, neutral: 15 },
  { name: "Tue", positive: 38, negative: 12, neutral: 18 },
  { name: "Wed", positive: 55, negative: 6, neutral: 12 },
  { name: "Thu", positive: 48, negative: 10, neutral: 20 },
  { name: "Fri", positive: 62, negative: 5, neutral: 14 },
  { name: "Sat", positive: 35, negative: 7, neutral: 10 },
  { name: "Sun", positive: 45, negative: 9, neutral: 16 },
];

const platformData = [
  { name: "Trustpilot", positive: 78, negative: 12, neutral: 10 },
  { name: "Google Reviews", positive: 65, negative: 20, neutral: 15 },
  { name: "App Store", positive: 82, negative: 8, neutral: 10 },
];

const weeklyComparisonData = [
  { name: "Week 1", reviews: 420, sentiment: 3.8 },
  { name: "Week 2", reviews: 510, sentiment: 4.1 },
  { name: "Week 3", reviews: 380, sentiment: 3.9 },
  { name: "Week 4", reviews: 650, sentiment: 4.3 },
  { name: "This Week", reviews: 580, sentiment: 4.2 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function SentimentTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg shadow-elevated p-3 text-sm">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-muted-foreground">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span>{p.name}:</span>
          <span className="font-medium text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

function ReviewTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg shadow-elevated p-3 text-sm">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-muted-foreground">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span>{p.name}:</span>
          <span className="font-medium text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export function SentimentTrendChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={sentimentTrendData}
          margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="neutralGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<SentimentTooltip />} />
          <Area
            type="monotone"
            dataKey="positive"
            stackId="1"
            stroke="#22c55e"
            fill="url(#positiveGradient)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="neutral"
            stackId="1"
            stroke="#f59e0b"
            fill="url(#neutralGradient)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="negative"
            stackId="1"
            stroke="#ef4444"
            fill="url(#negativeGradient)"
            strokeWidth={2}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "var(--muted-foreground)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PlatformComparisonChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={platformData}
          margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
          barGap={2}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<ReviewTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "var(--muted-foreground)" }}
          />
          <Bar dataKey="positive" name="Positive" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="negative" name="Negative" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="neutral" name="Neutral" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WeeklyReviewChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={weeklyComparisonData}
          margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="reviewsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            domain={[3, 5]}
          />
          <Tooltip content={<ReviewTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "var(--muted-foreground)" }}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="reviews"
            stroke="#6366f1"
            fill="url(#reviewsGradient)"
            strokeWidth={2}
            name="Reviews"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="sentiment"
            stroke="#f59e0b"
            fill="none"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Avg Sentiment"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}