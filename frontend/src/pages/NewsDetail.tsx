import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Helmet } from "react-helmet-async";

interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishDate?: string;
  category: string;
}

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [otherNews, setOtherNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const articleRef = useRef<HTMLDivElement | null>(null);

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "TR" ? "tr-TR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (article && articleRef.current) {
      articleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [article]);

  useEffect(() => {
    if (!slug) return;
    const slugLang = slug.startsWith("en-") ? "EN" : "TR";

    if (slugLang !== language) {
      const baseSlug = slug.substring(3);
      const newSlug = language === "EN" ? `en-${baseSlug}` : `tr-${baseSlug}`;
      const newPath = language === "EN" ? "/en/news" : "/haberler";
      navigate(`${newPath}/${newSlug}`, { replace: true });
    }
  }, [slug, language, navigate]);

  useEffect(() => {
    if (!slug) return;
    const slugLang = slug.startsWith("en-") ? "EN" : "TR";

    if (slugLang !== language) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setArticle(null);
    setError(null);
    setOtherNews([]);

    fetch(
      `https://api.techsin.com.tr/api/blog/${slug}?lang=${language.toLowerCase()}`,
      { signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Article not found");
        return res.json();
      })
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
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
  }, [slug, language]);

  useEffect(() => {
    if (!article) return;

    const controller = new AbortController();
    const signal = controller.signal;
    const category = language === "TR" ? "haberler" : "news";

    fetch(
      `https://api.techsin.com.tr/api/blog?category=${category}&lang=${language.toLowerCase()}`,
      { signal }
    )
      .then((res) => res.json())
      .then((allNews) => {
        const filteredNews = allNews.filter(
          (news: NewsArticle) => news._id !== article._id
        );

        const sortedAndLimited = filteredNews
          .sort(
            (a: NewsArticle, b: NewsArticle) =>
              new Date(b.publishDate || b.createdAt).getTime() -
              new Date(a.publishDate || a.createdAt).getTime()
          )
          .slice(0, 3);

        setOtherNews(sortedAndLimited);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch related news:", err);
        }
      });

    return () => {
      controller.abort();
    };
  }, [article, language]);

  const handleRelatedNewsClick = (slug: string) => {
    const basePath = language === "EN" ? "/en/news" : "/haberler";
    navigate(`${basePath}/${slug}`);
    window.scrollTo(0, 0); 
  };

  const extractImageFromContent = (htmlContent: string): string | null => {
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    const img = doc.querySelector("img");
    return img ? img.src : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {t("loading") || "Haber yükleniyor..."}
          </p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("articleNotFound") || "Haber Bulunamadı"}
          </h1>
          <p className="text-gray-600 mb-4">
            {error || "The content could not be loaded."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {t("home") || "Ana Sayfaya Dön"}
          </button>
        </div>
      </div>
    );
  }

return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>TechSİN Solutions | {article?.title}</title>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div
          ref={articleRef} // 👈 attach ref here
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          {/* Main article content */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {t("news") || "Haberler"}
              </span>
              <time className="text-gray-500 text-sm">
                {article && (article.publishDate || article.createdAt)
                  ? new Date(article.publishDate || article.createdAt).toLocaleDateString(
                      language === "TR" ? "tr-TR" : "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )
                  : ""}
              </time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {article?.title}
            </h1>
          </div>
          <div className="p-6 md:p-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article?.content || "" }}
            />
          </div>
        </div>

        {otherNews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
              {t("otherNews") || "Diğer Haberler"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherNews.map((newsItem) => {
                const imageUrl = extractImageFromContent(newsItem.content);
                return (
                  <div
                    key={newsItem._id}
                    onClick={() => handleRelatedNewsClick(newsItem.slug)}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-40 w-full bg-gray-200">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={newsItem.title}
                          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span>No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {newsItem.title}
                      </h3>
                      <time className="text-gray-500 text-sm">
                        {formatDate(
                          newsItem.publishDate || newsItem.createdAt
                        )}
                      </time>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}