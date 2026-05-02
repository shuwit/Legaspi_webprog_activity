import React from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const glassCardClasses = "animate-fade-in-up bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-[2rem] p-6 sm:p-8 transition-all duration-300 hover:bg-white/60 hover:shadow-xl";

function DashboardPage() {
    const location = useLocation();

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="animate-fade-in-up mb-8" style={{ animationDelay: '0.1s' }}>
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Dashboard Overview</h1>
                <p className="mt-2 text-sm text-zinc-600">A quick glance at your application's analytics and user metrics.</p>
            </div>

            {/* Summary Section */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mb-8">
                <div className={glassCardClasses} style={{ animationDelay: '0.2s' }}>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Total Users</p>
                    <p className="mt-2 text-5xl font-extrabold text-zinc-900">{rows.length}</p>
                </div>
                <div className={glassCardClasses} style={{ animationDelay: '0.3s' }}>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Average Age</p>
                    <p className="mt-2 text-5xl font-extrabold text-zinc-900">
                        {(
                            rows.reduce((sum, row) => sum + (row.age || 0), 0) /
                            rows.filter((row) => row.age !== null).length
                        ).toFixed(1)}
                    </p>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="grid gap-6 lg:grid-cols-2 mb-8">
                {/* Bar Chart */}
                <div className={`${glassCardClasses} flex flex-col`} style={{ animationDelay: '0.4s' }}>
                    <h2 className="text-lg font-bold text-zinc-800 mb-6">Quarterly Sales</h2>
                    <div className="flex-grow w-full flex items-center justify-center">
                        <BarChart
                            series={[
                                { data: [35, 44, 24, 34], label: 'Series 1', color: '#3b82f6' },
                                { data: [51, 6, 49, 30], label: 'Series 2', color: '#8b5cf6' },
                            ]}
                            height={300}
                            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                            slotProps={{
                                legend: { hidden: false }
                            }}
                        />
                    </div>
                </div>

                {/* Pie Chart & Gauges */}
                <div className="grid gap-6 grid-rows-[auto_auto]">
                    {/* Pie Chart */}
                    <div className={`${glassCardClasses} flex flex-col`} style={{ animationDelay: '0.5s' }}>
                        <h2 className="text-lg font-bold text-zinc-800 mb-4">Market Share</h2>
                        <div className="flex-grow flex items-center justify-center">
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, label: 'Series A', color: '#3b82f6' },
                                            { id: 1, value: 15, label: 'Series B', color: '#8b5cf6' },
                                            { id: 2, value: 20, label: 'Series C', color: '#06b6d4' },
                                        ],
                                        innerRadius: 30,
                                        outerRadius: 90,
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                    },
                                ]}
                                width={350}
                                height={200}
                                margin={{ right: 5 }}
                            />
                        </div>
                    </div>

                    {/* Gauges */}
                    <div className={`${glassCardClasses} flex justify-around items-center py-8`} style={{ animationDelay: '0.6s' }}>
                        <div className="flex flex-col items-center">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Performance</h3>
                            <Gauge width={120} height={120} value={50} sx={{ [`& .${gaugeClasses.valueText}`]: { fontSize: 24, fontWeight: 'bold' } }} />
                        </div>
                        <div className="flex flex-col items-center">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Server Load</h3>
                            <Gauge width={120} height={120} value={50} valueMin={10} valueMax={60} sx={{ [`& .${gaugeClasses.valueText}`]: { fontSize: 24, fontWeight: 'bold' } }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Users DataGrid */}
            <div className={glassCardClasses} style={{ animationDelay: '0.7s', paddingBottom: '2rem' }}>
                <h2 className="text-lg font-bold text-zinc-800 mb-6">Users Overview</h2>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        experimentalFeatures={{ newEditingApi: true }}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-cell': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                            '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(255, 255, 255, 0.5)', borderBottom: '1px solid rgba(255,255,255,0.6)' },
                            '& .MuiDataGrid-footerContainer': { borderTop: 'none' },
                            '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
                            '& .MuiDataGrid-withBorderColor': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                        }}
                    />
                </div>
            </div>

            {/* Map */}
            <div className={`${glassCardClasses} !p-0 overflow-hidden relative z-0`} style={{ animationDelay: '0.8s' }}>
                <div className="p-6 sm:p-8 border-b border-white/60 bg-white/20">
                    <h2 className="text-lg font-bold text-zinc-800">Location Map</h2>
                </div>
                <div style={{ height: 400, width: '100%' }}>
                    <MapContainer center={[14.604253, 120.994314]} zoom={13} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[14.604253, 120.994314]}>
                            <Popup>
                                National University-Manila <br />
                                <small>551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila</small>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
