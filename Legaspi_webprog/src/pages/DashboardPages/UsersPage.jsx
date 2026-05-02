import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Chip, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const glassCardClasses = "animate-fade-in-up bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-[2rem] p-6 sm:p-8 transition-all duration-300 hover:bg-white/60 hover:shadow-xl";

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
    { id: 6, lastName: 'Melisandre', firstName: null, age: 69 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const UsersPage = () => {

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="animate-fade-in-up mb-8" style={{ animationDelay: '0.1s' }}>
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">User Management</h1>
                <p className="mt-2 text-sm text-zinc-600">View, search, and manage all registered users in the system.</p>
            </div>

            {/* Data Grid Container */}
            <div className={glassCardClasses} style={{ animationDelay: '0.2s', paddingBottom: '2rem' }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <h2 className="text-lg font-bold text-zinc-800">All Users</h2>
                </div>

                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 25, 50]}
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
        </div>
    );
};

export default UsersPage;
