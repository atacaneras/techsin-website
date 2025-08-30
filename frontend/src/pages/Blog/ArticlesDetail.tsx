import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { ArrowLeft, Calendar, User, BookOpen } from "lucide-react";

interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    createdAt: string; 
    publishDate?: string;
}

export default function ArticleDetail() {
    const [post, setPost] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { language, t } = useLanguage();

    useEffect(() => {
        if (!slug) return;

        const slugLang = slug.startsWith('en-') ? 'EN' : 'TR';

        if (slugLang !== language) {
            const baseSlug = slug.substring(3);
            const newSlug = language === 'EN' ? `en-${baseSlug}` : `tr-${baseSlug}`;
            const newPath = language === 'EN' ? '/en/articles' : '/makaleler';
            navigate(`${newPath}/${newSlug}`);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);
        setPost(null);
        setError(null);

        fetch(`http://localhost:4000/api/blog/${slug}?lang=${language.toLowerCase()}`, { signal })

            .then(res => {
                if (!res.ok) throw new Error("Article not found");
                return res.json();
            })
            .then(data => {
                setPost(data);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            })
            .finally(() => {
                if (!signal.aborted) {
                    setLoading(false);
                }
            });

        return () => {
            controller.abort();
        };
    }, [slug, language, navigate]);

    const handleBack = () => {
        navigate(language === "EN" ? "/en/articles" : "/makaleler");
    };

    if (loading) {
        return (
            <main className="bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto py-20 px-6">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">{t("loading") || "Yükleniyor..."}</p>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto py-20 px-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {language === "EN" ? "Content Not Found" : "İçerik Bulunamadı"}
                    </h1>
                    <p className="text-gray-600 mb-8">
                        {error || (language === "EN" ? "The article you're looking for doesn't exist." : "Aradığınız makale mevcut değil.")}
                    </p>
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {language === "EN" ? "Back to Articles" : "Makalelere Dön"}
                    </button>
                </div>
            </main>
        );
    }

    return (
        <>
            <Helmet>
                <title>{post.title} | TechSİN Solutions</title>
                <meta name="description" content={post.content.replace(/<[^>]+>/g, "").slice(0, 160)} />
            </Helmet>
            <main className="bg-gray-50 min-h-screen">
                {/* Header with back button */}
                <section className="bg-gradient-to-br from-green-600 via-teal-700 to-blue-700 text-white py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        <button
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {language === "EN" ? "Back to Articles" : "Makalelere Dön"}
                        </button>
                        <div className="flex items-start gap-3 mb-4">
                            <BookOpen className="w-8 h-8 text-green-300 flex-shrink-0 mt-1" />
                            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                                {post.title}
                            </h1>
                        </div>
                        {/* Meta information */}
                        <div className="flex flex-wrap items-center gap-4 text-green-100">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.publishDate || post.createdAt).toLocaleDateString(language === "EN" ? "en-US" : "tr-TR")}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="max-w-4xl mx-auto py-16 px-4 sm:px-6 md:px-8">
                    <article className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 w-full overflow-x-auto">
                        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded mb-8"></div>
                        <div
                            className="prose prose-sm sm:prose-base md:prose-lg max-w-full w-full break-words prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4 prose-pre:whitespace-pre-wrap prose-pre:break-words prose-ol:text-gray-700 prose-ul:text-gray-700 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:p-4"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </article>
                    <div className="mt-12 text-center">
                        <button
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {language === "EN" ? "Back to All Articles" : "Tüm Makalelere Dön"}
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}