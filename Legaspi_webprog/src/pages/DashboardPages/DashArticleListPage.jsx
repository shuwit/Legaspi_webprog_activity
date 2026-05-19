import { useState, useEffect } from 'react';
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
    Stack,
    Switch,
    TextField,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { fetchArticles, createArticle, updateArticle } from '../../services/ArticleService';

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

const blankForm = {
    title: '',
    slug: '',
    content: '',
    isActive: true,
};

const DashArticleListPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState({ ...blankForm });
    const [errors, setErrors] = useState({});
    
    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState('');

    const loadArticlesFromApi = async () => {
        try {
            setLoading(true);
            const { data } = await fetchArticles();
            setArticles(data.articles || []);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadArticlesFromApi();
    }, []);

    const filteredArticles = articles.filter((article) => {
        const matchesSearch = !searchQuery || [article.title, article.slug]
            .some(val => String(val || '').toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesSearch;
    });

    const resetForm = () => {
        setForm({ ...blankForm });
        setErrors({});
    };

    const openModal = (article) => {
        const articleId = article?._id || article?.id || null;
        setModal({ open: true, id: articleId });
        setForm(article ? { ...blankForm, ...article } : { ...blankForm });
        setErrors({});
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
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
        const slug = form.slug.trim().toLowerCase();

        if (!form.title.trim()) nextErrors.title = 'Title is required.';
        if (!form.slug.trim()) nextErrors.slug = 'Slug is required.';
        if (!form.content.trim()) nextErrors.content = 'Content is required.';

        if (!nextErrors.slug && /\s/.test(slug)) {
            nextErrors.slug = 'Slug must not contain spaces.';
        }

        if (
            !nextErrors.slug &&
            articles.some((article) => article._id !== modal.id && article.slug === slug)
        ) {
            nextErrors.slug = 'Slug already exists.';
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

        const nextArticle = {
            title: form.title.trim(),
            slug: form.slug.trim().toLowerCase(),
            content: form.content.trim(),
            isActive: form.isActive,
        };

        try {
            if (modal.id) {
                await updateArticle(modal.id, nextArticle);
            } else {
                await createArticle(nextArticle);
            }
            loadArticlesFromApi();
            closeModal();
        } catch (error) {
            console.error('Error saving article:', error);
        }
    };

    const toggleStatus = async (article) => {
        try {
            const articleId = article._id || article.id;
            await updateArticle(articleId, { isActive: !article.isActive });
            loadArticlesFromApi();
        } catch (error) {
            console.error('Error toggling article status:', error);
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
        { field: '_id', headerName: 'ID', minWidth: 200 },
        { field: 'slug', headerName: 'Slug', minWidth: 150 },
        { field: 'title', headerName: 'Title', flex: 1, minWidth: 200 },
        {
            field: 'paragraphs',
            headerName: 'Paragraphs',
            minWidth: 100,
            valueGetter: (_, row) => row.content ? row.content.split('\n').filter(p => p.trim() !== '').length : 0,
        },
        {
            field: 'preview',
            headerName: 'Preview',
            flex: 2,
            minWidth: 300,
            valueGetter: (_, row) => row.content ? row.content.substring(0, 100) + '...' : '',
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
                        EDIT
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color={row.isActive ? 'warning' : 'success'}
                        onClick={() => toggleStatus(row)}
                        sx={{
                            backgroundColor: row.isActive ? '#f57c00' : '#4caf50',
                            '&:hover': {
                                backgroundColor: row.isActive ? '#ef6c00' : '#388e3c',
                            }
                        }}
                    >
                        {row.isActive ? 'DISABLE' : 'ACTIVATE'}
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="animate-fade-in-up mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4" style={{ animationDelay: '0.1s' }}>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Articles</h1>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                    ADD ARTICLE
                </button>
            </div>

            <div className={`${glassCardClasses} !p-4 sm:!p-6`} style={{ animationDelay: '0.2s' }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                    <TextField
                        placeholder="Search Articles"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ flexGrow: 1, minWidth: { xs: '100%', md: '250px' } }}
                    />
                </Stack>
            </div>

            <div className={`${glassCardClasses} !p-4 sm:!p-6`} style={{ animationDelay: '0.3s' }}>
                {filteredArticles.length ? (
                    <div style={{ height: 520, width: '100%' }}>
                        <DataGrid
                            rows={filteredArticles}
                            columns={columns}
                            getRowId={(row) => row._id || row.id}
                            loading={loading}
                            disableRowSelectionOnClick
                            pageSizeOptions={[5, 10, 20, 50]}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 10, page: 0 } },
                            }}
                            sx={dataGridStyles}
                        />
                    </div>
                ) : articles.length ? (
                    <Alert severity="info">
                        No articles match your current search.
                    </Alert>
                ) : (
                    <Alert severity="info">
                        No articles found. Use Add Article to create your first record.
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
                    <DialogTitle>{modal.id ? 'Edit Article' : 'Add Article'}</DialogTitle>
                    <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
                        <Stack spacing={2} sx={{ pt: 1 }}>
                            <TextField {...fieldProps('title', 'Title')} />
                            <TextField {...fieldProps('slug', 'Slug (e.g. my-first-article)')} />
                            <TextField
                                {...fieldProps('content', 'Content', {
                                    multiline: true,
                                    rows: 6,
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
                                        ? 'Status: Active'
                                        : 'Status: Inactive'
                                }
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, py: 2 }}>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            {modal.id ? 'Update Article' : 'Save Article'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
};

export default DashArticleListPage;