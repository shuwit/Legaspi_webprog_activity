import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import articles from '../../assets/styles/article-content.js';

function ArticlePage() {
    const { name } = useParams();
    const article = articles.find(a => a.name === name);

    if (!article) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50">
                <div className="text-center rounded-[2.5rem] border border-white/60 bg-white/40 p-12 backdrop-blur-xl">
                    <h1 className="text-3xl font-extrabold text-zinc-900">Article Not Found</h1>
                    <Button to="/articles" className="mt-6">Back to Articles</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-12">
            <Button to="/articles" className="mb-8">← Back to Articles</Button>

            <header className="mb-12">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">Article</p>
                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
                    {article.title}
                </h1>
            </header>

            <div className="prose prose-zinc max-w-none">
                {article.content.map((paragraph, index) => (
                    <p key={index} className="mb-6 text-lg leading-relaxed text-zinc-700 whitespace-pre-wrap">
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default ArticlePage;