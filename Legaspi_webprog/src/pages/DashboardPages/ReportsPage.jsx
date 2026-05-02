import React, { useRef } from 'react';
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150, editable: true },
    { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
    { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
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

const glassCardClasses = "glass-card animate-fade-in-up bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-[2rem] p-6 sm:p-8 transition-all duration-300 hover:bg-white/60 hover:shadow-xl";

const dataGridStyles = {
    border: 'none',
    '& .MuiDataGrid-cell': { borderColor: 'rgba(255, 255, 255, 0.4)' },
    '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(255, 255, 255, 0.5)', borderBottom: '1px solid rgba(255,255,255,0.6)' },
    '& .MuiDataGrid-footerContainer': { borderTop: 'none' },
    '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
    '& .MuiDataGrid-withBorderColor': { borderColor: 'rgba(255, 255, 255, 0.4)' },
};

const ReportsPage = () => {
    const printRef = useRef(null);

    const handlePrint = () => {
        const printContent = printRef.current;

        if (!printContent) return;

        const printWindow = window.open('', '_blank', 'width=1200,height=900');

        if (!printWindow) return;

        const headMarkup = Array.from(
            document.querySelectorAll('style, link[rel="stylesheet"]')
        )
            .map((node) => node.outerHTML)
            .join('');

        const exportedAt = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(new Date());

        printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            @page {
              size: A4;
              margin: 16mm;
            }

            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #fff;
              color: #1f2937;
            }

            .report-shell {
              padding: 28px;
            }

            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 1px solid #d1d5db;
            }

            .report-header h1 {
              margin: 0 0 6px;
              font-size: 28px;
              font-weight: 700;
            }

            .report-header p {
              margin: 0;
              font-size: 14px;
              color: #6b7280;
              line-height: 1.5;
            }

            .report-content .glass-card {
              box-shadow: none !important;
              border: 1px solid #e5e7eb !important;
              background: #fff !important;
              break-inside: avoid;
              page-break-inside: avoid;
              margin-bottom: 24px;
              border-radius: 12px !important;
              backdrop-filter: none !important;
            }

            .report-content svg {
              max-width: 100%;
            }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="animate-fade-in-up mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4" style={{ animationDelay: '0.1s' }}>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Reports</h1>
                    <p className="mt-2 text-sm text-zinc-600">Report analytics overview showing generated reports, category breakdown, and performance.</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95">
                        Generate
                    </button>
                    <button onClick={handlePrint} className="px-4 py-2 bg-white/50 hover:bg-white/80 backdrop-blur-md border border-white/60 shadow-sm rounded-xl text-sm font-semibold text-zinc-800 transition-all active:scale-95">
                        Export
                    </button>
                    <button className="px-4 py-2 bg-white/50 hover:bg-white/80 backdrop-blur-md border border-white/60 shadow-sm rounded-xl text-sm font-semibold text-zinc-800 transition-all active:scale-95">
                        Filter
                    </button>
                </div>
            </div>

            <div ref={printRef} className="space-y-6">
                {/* Main Bar Chart */}
                <div className={`${glassCardClasses} flex flex-col`} style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-lg font-bold text-zinc-800 mb-2">Monthly Report Output</h2>
                    <p className="text-sm text-zinc-500 mb-6">This chart compares how many reports were generated and how many were completed across the last four months.</p>
                    <div className="flex-grow w-full flex items-center justify-center">
                        <BarChart
                            series={[
                                { data: [18, 24, 20, 27], label: "Generated", color: '#3b82f6' },
                                { data: [12, 19, 17, 23], label: "Completed", color: '#8b5cf6' },
                            ]}
                            height={300}
                            xAxis={[
                                {
                                    data: ["January", "February", "March", "April"],
                                    scaleType: "band",
                                    label: "Months",
                                }
                            ]}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                            slotProps={{
                                legend: { hidden: false }
                            }}
                        />
                    </div>
                </div>

                {/* Secondary Charts */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Pie Chart */}
                    <div className={`${glassCardClasses} flex flex-col`} style={{ animationDelay: '0.3s' }}>
                        <h2 className="text-lg font-bold text-zinc-800 mb-2">Report Category Share</h2>
                        <p className="text-sm text-zinc-500 mb-6">Distribution of report requests by category for the current reporting period.</p>
                        <div className="flex-grow flex items-center justify-center">
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 14, label: "Sales", color: '#3b82f6' },
                                            { id: 1, value: 10, label: "Users", color: '#8b5cf6' },
                                            { id: 2, value: 8, label: "Inventory", color: '#06b6d4' },
                                            { id: 3, value: 6, label: "Finance", color: '#10b981' },
                                        ],
                                        innerRadius: 30,
                                        outerRadius: 90,
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                    },
                                ]}
                                width={350}
                                height={220}
                                margin={{ right: 5 }}
                            />
                        </div>
                    </div>

                    {/* Gauge */}
                    <div className={`${glassCardClasses} flex flex-col`} style={{ animationDelay: '0.4s' }}>
                        <h2 className="text-lg font-bold text-zinc-800 mb-2">Completion Rate</h2>
                        <p className="text-sm text-zinc-500 mb-6">Current percentage of reports completed on time based on the latest reporting cycle.</p>
                        <div className="flex-grow flex items-center justify-center py-4">
                            <Gauge 
                                width={180} 
                                height={180} 
                                value={78} 
                                sx={{ 
                                    [`& .${gaugeClasses.valueText}`]: { fontSize: 32, fontWeight: 'bold' },
                                    [`& .${gaugeClasses.valueArc}`]: { fill: '#8b5cf6' }
                                }} 
                            />
                        </div>
                    </div>
                </div>

                {/* DataGrid */}
                <div className={glassCardClasses} style={{ animationDelay: '0.5s' }}>
                    <h2 className="text-lg font-bold text-zinc-800 mb-6">Recent Reports Details</h2>
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
                            sx={dataGridStyles}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;