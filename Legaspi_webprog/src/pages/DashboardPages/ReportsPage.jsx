import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

const glassCardClasses = "animate-fade-in-up bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-[2rem] p-6 sm:p-8 transition-all duration-300 hover:bg-white/60 hover:shadow-xl";

// Mock Data
const monthlyData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [4000, 3000, 2000, 2780, 1890, 2390, 3490, 4200, 5100, 4800, 6100, 7500],
    expenses: [2400, 1398, 3800, 3908, 2800, 3800, 4300, 3100, 2500, 3200, 4100, 4500],
};

const scatterData = [
    { x: 100, y: 200, id: 1 }, { x: 120, y: 100, id: 2 }, { x: 170, y: 300, id: 3 },
    { x: 140, y: 250, id: 4 }, { x: 150, y: 400, id: 5 }, { x: 110, y: 280, id: 6 },
    { x: 200, y: 500, id: 7 }, { x: 220, y: 450, id: 8 }, { x: 250, y: 600, id: 9 },
];

const ReportsPage = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="animate-fade-in-up mb-8" style={{ animationDelay: '0.1s' }}>
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Data & Reports</h1>
                <p className="mt-2 text-sm text-zinc-600">Deep dive into performance metrics and trend analysis.</p>
            </div>

            {/* Sparkline Key Metrics */}
            <div className="grid gap-6 sm:grid-cols-3 mb-8">
                <div className={glassCardClasses} style={{ animationDelay: '0.2s' }}>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Revenue (7d)</p>
                    <p className="mt-2 text-4xl font-extrabold text-zinc-900">$24,500</p>
                    <div className="mt-4 h-16 w-full">
                        <SparkLineChart data={[1, 4, 2, 5, 3, 7, 6]} colors={['#3b82f6']} curve="natural" />
                    </div>
                </div>
                <div className={glassCardClasses} style={{ animationDelay: '0.3s' }}>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Active Users (7d)</p>
                    <p className="mt-2 text-4xl font-extrabold text-zinc-900">12,403</p>
                    <div className="mt-4 h-16 w-full">
                        <SparkLineChart data={[10, 8, 14, 12, 18, 15, 22]} colors={['#8b5cf6']} curve="natural" />
                    </div>
                </div>
                <div className={glassCardClasses} style={{ animationDelay: '0.4s' }}>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Conversion Rate</p>
                    <p className="mt-2 text-4xl font-extrabold text-zinc-900">4.2%</p>
                    <div className="mt-4 h-16 w-full">
                        <SparkLineChart data={[3, 3.5, 3.2, 4.0, 3.8, 4.5, 4.2]} colors={['#06b6d4']} curve="natural" />
                    </div>
                </div>
            </div>

            {/* Main Line Chart */}
            <div className={`${glassCardClasses} flex flex-col mb-8`} style={{ animationDelay: '0.5s' }}>
                <h2 className="text-lg font-bold text-zinc-800 mb-6">Financial Overview (YTD)</h2>
                <div className="flex-grow w-full flex items-center justify-center overflow-x-auto">
                    <LineChart
                        xAxis={[{ scaleType: 'point', data: monthlyData.months }]}
                        series={[
                            { data: monthlyData.revenue, label: 'Revenue', color: '#3b82f6', curve: 'natural' },
                            { data: monthlyData.expenses, label: 'Expenses', color: '#ef4444', curve: 'natural' },
                        ]}
                        height={400}
                        margin={{ top: 20, bottom: 30, left: 50, right: 20 }}
                        slotProps={{
                            legend: { hidden: false }
                        }}
                    />
                </div>
            </div>

            {/* Secondary Charts */}
            <div className="grid gap-6 lg:grid-cols-2 mb-8">
                {/* Horizontal Bar Chart */}
                <div className={`${glassCardClasses} flex flex-col`} style={{ animationDelay: '0.6s' }}>
                    <h2 className="text-lg font-bold text-zinc-800 mb-6">Traffic Sources</h2>
                    <div className="flex-grow w-full flex items-center justify-center">
                        <BarChart
                            layout="horizontal"
                            yAxis={[{ scaleType: 'band', data: ['Organic', 'Direct', 'Social', 'Referral'] }]}
                            series={[
                                { data: [4000, 3000, 2000, 1500], label: 'Visitors', color: '#8b5cf6' }
                            ]}
                            height={300}
                            margin={{ top: 10, bottom: 30, left: 80, right: 10 }}
                        />
                    </div>
                </div>

                {/* Scatter Chart */}
                <div className={`${glassCardClasses} flex flex-col`} style={{ animationDelay: '0.7s' }}>
                    <h2 className="text-lg font-bold text-zinc-800 mb-6">Engagement vs Duration</h2>
                    <div className="flex-grow w-full flex items-center justify-center">
                        <ScatterChart
                            series={[
                                {
                                    label: 'User Sessions',
                                    data: scatterData,
                                    color: '#06b6d4',
                                },
                            ]}
                            height={300}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
