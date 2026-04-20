import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article, index) => (
                <article 
                    key={article.name} 
                    className="group flex flex-col rounded-[2rem] border border-white/60 bg-white/40 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/60"
                >
                    <div className="flex aspect-4/3 items-center justify-center rounded-2xl bg-zinc-200 overflow-hidden">
                        <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100 rounded-lg" />
                    </div>
                    <div className="pt-6 flex flex-col flex-grow">
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-400">
                            Article {String(index + 1).padStart(2, '0')}
                        </p>
                        <h3 className="mt-2 text-xl font-extrabold text-zinc-900 line-clamp-1">
                            {article.title}
                        </h3>
                        <p className="mt-3 flex-grow text-sm leading-relaxed text-zinc-500 line-clamp-2">
                            {article.content[0].substring(0, 100)}...
                        </p>
                        <Link to={`/articles/${article.name}`} className="mt-6">
                            <Button className="w-full">Read More</Button>
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default ArticleList;