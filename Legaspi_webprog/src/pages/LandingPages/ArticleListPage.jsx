import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import articles from '../../assets/styles/article-content.js';

const ArticleListPage = () => {
    return (
        <div className="flex w-full flex-col gap-6 bg-zinc-50 min-h-screen">
            <section className="px-4 py-16 sm:px-6 lg:px-8 text-center">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">Articles</p>
                <h1 className="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
                    Featured articles in a glassy card grid
                </h1>
                <div className="mt-8 flex justify-center">
                    <Button to="/">Back Home</Button>
                </div>
            </section>

            <section className="px-4 py-12 sm:px-6 lg:px-8">
                <ArticleList articles={articles} />
            </section>
        </div>
    );
}

export default ArticleListPage;