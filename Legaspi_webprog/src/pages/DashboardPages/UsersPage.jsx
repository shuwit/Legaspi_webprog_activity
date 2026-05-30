import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser } from '../../services/UserService';

const glassCardClasses = "animate-fade-in-up bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-[2rem] p-6 sm:p-8 transition-all duration-300 hover:bg-white/60 hover:shadow-xl";

const dataGridStyles = {
    border: 'none',
    '& .MuiDataGrid-cell': { borderColor: 'rgba(255, 255, 255, 0.4)', outline: 'none' },
    '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(255, 255, 255, 0.5)', borderBottom: '1px solid rgba(255,255,255,0.6)', outline: 'none' },
    '& .MuiDataGrid-footerContainer': { borderTop: 'none' },
    '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
    '& .MuiDataGrid-withBorderColor': { borderColor: 'rgba(255, 255, 255, 0.4)' },
    '& .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
    '& .MuiDataGrid-cell:focus-within': { outline: 'none' }
};

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: 'editor',
    username: '',
    password: '',
    address: '',
    isActive: true,
};

const labelize = (value) =>
    value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const UsersPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState({ ...blankForm });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    
    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ role: 'all', gender: 'all', status: 'all' });
    const navigate = useNavigate();

    const loadUsersFromApi = async () => {
        try {
            setLoading(true);
            const { data } = await fetchUsers();
            setUsers(data.users || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userType = localStorage.getItem('type');
        if (userType === 'editor') {
            navigate('/dashboard'); // Kick editors out of the UsersPage
        } else {
            loadUsersFromApi();
        }
    }, [navigate]);

    const filteredUsers = users.filter((user) => {
        const matchesSearch = !searchQuery || [user.firstName, user.lastName, user.email, user.username]
            .some(val => String(val || '').toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesRole = filters.role === 'all' || user.type === filters.role || user.role === filters.role;
        const matchesGender = filters.gender === 'all' || user.gender === filters.gender;
        const matchesStatus = filters.status === 'all' || 
            (filters.status === 'active' ? user.isActive : !user.isActive);

        return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });

    const resetForm = () => {
        setForm({ ...blankForm });
        setErrors({});
    };

    const openModal = (user) => {
        const userId = user?._id || user?.id || null;
        setModal({ open: true, id: userId });
        setForm(user ? { ...blankForm, ...user, password: '' } : { ...blankForm });
        setErrors({});
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
        setShowPassword(false);
        resetForm();
    };

    const handleChange = ({ target: { name, value, checked, type } }) => {
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const nextErrors = {};
        const email = form.email.trim().toLowerCase();
        const username = form.username.trim().toLowerCase();

        [
            ['firstName', 'First name'],
            ['lastName', 'Last name'],
            ['age', 'Age'],
            ['contactNumber', 'Contact number'],
            ['email', 'Email'],
            ['role', 'Role'],
            ['username', 'Username'],
            ['address', 'Address'],
        ].forEach(([key, label]) => {
            if (!String(form[key]).trim()) {
                nextErrors[key] = `${label} is required.`;
            }
        });

        // Password is required only when creating a new user
        if (!modal.id && !String(form.password).trim()) {
            nextErrors.password = 'Password is required.';
        }

        if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = 'Enter a valid email address.';
        }

        if (
            !nextErrors.email &&
            users.some((user) => (user._id || user.id) !== modal.id && user.email === email)
        ) {
            nextErrors.email = 'Email address already exists.';
        }

        if (!nextErrors.username && /\s/.test(form.username)) {
            nextErrors.username = 'Username must not contain spaces.';
        }

        if (
            !nextErrors.username &&
            users.some((user) => (user._id || user.id) !== modal.id && user.username === username)
        ) {
            nextErrors.username = 'Username already exists.';
        }

        // Only validate password length if the user has typed something
        if (!nextErrors.password && form.password && form.password.length < 8) {
            nextErrors.password = 'Password must be at least 8 characters.';
        }

        if (!nextErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber)) {
            nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
        }

        if (!nextErrors.age && !/^\d+$/.test(form.age)) {
            nextErrors.age = 'Age must be a number only.';
        }

        return nextErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nextErrors = validate();

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        const nextUser = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            age: form.age.trim(),
            gender: form.gender.trim().toLowerCase(),
            contactNumber: form.contactNumber.trim(),
            email: form.email.trim().toLowerCase(),
            type: form.role.trim().toLowerCase(), // The backend model uses 'type' instead of 'role'
            username: form.username.trim().toLowerCase(),
            password: form.password,
            address: form.address.trim(),
            isActive: form.isActive,
        };

        try {
            if (modal.id) {
                // Update user
                if (!nextUser.password) {
                    delete nextUser.password; // Exclude password if it's empty
                }
                await updateUser(modal.id, nextUser);
            } else {
                // Add new user
                await createUser(nextUser);
            }
            loadUsersFromApi(); // Reload users
            closeModal();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const toggleStatus = async (user) => {
        try {
            const userId = user._id || user.id;
            await updateUser(userId, { isActive: !user.isActive });
            loadUsersFromApi(); // Reload users after toggling
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };

    const fieldProps = (name, label, extra = {}) => ({
        name,
        label,
        value: form[name],
        onChange: handleChange,
        error: Boolean(errors[name]),
        helperText: errors[name],
        fullWidth: true,
        ...extra,
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 88 },
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            minWidth: 170,
            valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
        },
        { field: 'username', headerName: 'Username', minWidth: 150 },
        {
            field: 'gender',
            headerName: 'Gender',
            minWidth: 110,
            valueGetter: (_, row) => labelize(row.gender),
        },
        { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
        { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 120,
            valueGetter: (_, row) => labelize(row.type || row.role),
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 120,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => (
                <Chip
                    size="small"
                    label={row.isActive ? 'Active' : 'Inactive'}
                    color={row.isActive ? 'success' : 'default'}
                    variant={row.isActive ? 'filled' : 'outlined'}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 220,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => openModal(row)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color={row.isActive ? 'warning' : 'success'}
                        onClick={() => toggleStatus(row)}
                    >
                        {row.isActive ? 'Disable' : 'Activate'}
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="animate-fade-in-up mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4" style={{ animationDelay: '0.1s' }}>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Users Overview</h1>
                    <p className="mt-2 text-sm text-zinc-600">Manage your system users, roles, and account statuses.</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                    Add User
                </button>
            </div>
            <div className={`${glassCardClasses} !p-4 sm:!p-6`} style={{ animationDelay: '0.2s' }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                    <TextField
                        placeholder="Search users by name, email or username..."
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ flexGrow: 1, minWidth: { xs: '100%', md: '250px' } }}
                    />
                    <TextField
                        select
                        label="Role"
                        variant="outlined"
                        size="small"
                        value={filters.role}
                        onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                        sx={{ minWidth: { xs: '100%', md: 140 } }}
                    >
                        <MenuItem value="all">All Roles</MenuItem>
                        {roles.map(role => <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>)}
                    </TextField>
                    <TextField
                        select
                        label="Gender"
                        variant="outlined"
                        size="small"
                        value={filters.gender}
                        onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                        sx={{ minWidth: { xs: '100%', md: 140 } }}
                    >
                        <MenuItem value="all">All Genders</MenuItem>
                        {genders.map(g => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                    </TextField>
                    <TextField
                        select
                        label="Status"
                        variant="outlined"
                        size="small"
                        value={filters.status}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        sx={{ minWidth: { xs: '100%', md: 140 } }}
                    >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>
                </Stack>
            </div>

            <div className={`${glassCardClasses} !p-4 sm:!p-6`} style={{ animationDelay: '0.3s' }}>
                {filteredUsers.length ? (
                    <div style={{ height: 520, width: '100%' }}>
                        <DataGrid
                            rows={filteredUsers}
                            columns={columns}
                            getRowId={(row) => row._id || row.id}
                            loading={loading}
                            disableRowSelectionOnClick
                            pageSizeOptions={[5, 10, 20, 50]}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 5, page: 0 } },
                            }}
                            sx={dataGridStyles}
                        />
                    </div>
                ) : users.length ? (
                    <Alert severity="info">
                        No users match your current search or filter criteria.
                    </Alert>
                ) : (
                    <Alert severity="info">
                        No users found. Use Add User to create your first record.
                    </Alert>
                )}
            </div>

            <Dialog
                open={modal.open}
                onClose={closeModal}
                fullWidth
                fullScreen={isMobile}
                maxWidth="md"
            >
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
                    <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
                        <Stack spacing={2} sx={{ pt: 1 }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('firstName', 'First Name')} />
                                <TextField {...fieldProps('lastName', 'Last Name')} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('age', 'Age')} />
                                <TextField
                                    {...fieldProps('gender', 'Gender', { select: true })}
                                >
                                    {genders.map((gender) => (
                                        <MenuItem key={gender} value={gender}>
                                            {labelize(gender)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    {...fieldProps('contactNumber', 'Contact Number')}
                                />
                                <TextField
                                    {...fieldProps('email', 'Email Address', { type: 'email' })}
                                />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    {...fieldProps('role', 'Role', { select: true })}
                                >
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {labelize(role)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField {...fieldProps('username', 'Username')} />
                            </Stack>
                            <TextField
                                {...fieldProps('password', 'Password', {
                                    type: showPassword ? 'text' : 'password',
                                    slotProps: {
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                        onMouseDown={(event) => event.preventDefault()}
                                                        aria-label={
                                                            showPassword ? 'Hide password' : 'Show password'
                                                        }
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    },
                                })}
                            />
                            <TextField
                                {...fieldProps('address', 'Address', {
                                    multiline: true,
                                    rows: 3,
                                })}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="isActive"
                                        checked={form.isActive}
                                        onChange={handleChange}
                                    />
                                }
                                label={
                                    form.isActive
                                        ? 'User status: Active'
                                        : 'User status: Inactive'
                                }
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, py: 2 }}>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            {modal.id ? 'Update User' : 'Save User'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
};

export default UsersPage;   