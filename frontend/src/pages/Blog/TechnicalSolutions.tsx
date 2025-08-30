import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { Settings } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  excerpt: string;
  createdAt: string;
}

export default function TechnicalSolutions() {
  const { language, t } = useLanguage();
  const [posts, setApiServices] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categoryMap: Record<string, string> = {
    TR: "teknik-cozumler",
    EN: "technical-solutions"
  };

  useEffect(() => {
    setApiServices([]);
    setLoading(true);

    const category = categoryMap[language];
    console.log('🔍 Fetching category:', category, 'for language:', language);
    
    // Try different endpoints based on available routes
    let endpoint;
    if (category === 'teknik-cozumler' || category === 'technical-solutions') {
      // If you have a specific technical solutions endpoint, use it
      // Otherwise, try with a generic approach
      endpoint = `http://localhost:4000/api/blog?category=${category}`;
    } else {
      endpoint = `http://localhost:4000/api/blog?category=${category}`;
    }
    
    fetch(endpoint)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('📦 Received data:', data);
        if (Array.isArray(data)) {
          console.log('📦 Data IDs:', data.map(item => ({ id: item._id, title: item.title })));
          setApiServices(data);
        } else {
          console.error('❌ Data is not an array:', data);
          setApiServices([]);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [language]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <span className="text-gray-600">
            {t("productsTitle")} {language === "TR" ? "yükleniyor..." : "loading..."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {language === "EN"
            ? "TechSİN Solutions | Technical Solutions"
            : "TechSİN Solutions | Teknik Çözümler"}
        </title>
      </Helmet>

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-600 via-teal-700 to-blue-700 text-white py-28 px-6 text-center">
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl font-extrabold mb-4">
              {language === "EN" ? "Technical Solutions" : "Teknik Çözümler"}
            </h1>
            <p className="text-lg md:text-xl text-green-100 leading-relaxed">
              {language === "EN"
                ? "Explore our technical solutions and guides."
                : "Teknik çözümlerimizi ve rehberlerimizi keşfedin."}
            </p>
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
        </section>

        {/* Content Section */}
        <section className="max-w-6xl mx-auto py-20 px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">
                {language === "EN" ? "No technical solutions found." : "Teknik çözüm bulunamadı."}
              </p>
            </div>
          ) : (
            posts.map((post, index) => (
              <div
                key={post._id || `post-${index}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all p-6 flex flex-col justify-between"
              >
                {/* Accent line */}
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded mb-4"></div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-start gap-2">
                  <Settings className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="flex-1 min-w-0 break-words">{post.title}</span>
                </h2>

                {/* Content preview */}
                <p className="text-gray-600 mb-4 line-clamp-4">
                  {post.content?.replace(/<[^>]+>/g, "").slice(0, 120) || ""}
                </p>

                {/* Read more button */}
                <button
                  onClick={() =>
                    navigate(
                      language === "EN"
                        ? `/en/technical-solutions/${post.slug}`
                        : `/teknik-cozumler/${post.slug}`
                    )
                  }
                  className="mt-auto inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium px-4 py-2 rounded-xl shadow-md hover:shadow-xl transition"
                >
                  {language === "EN" ? "Read More" : "Devamını Oku"}
                </button>
              </div>
            ))
          )}
        </section>
      </main>
    </>
  );
}