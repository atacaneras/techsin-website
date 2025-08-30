import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  excerpt: string;
  createdAt: string;
}

// Card component with the design you want
function ProductCard({ post, onClick }: { post: Blog; onClick: () => void }) {
  const { language } = useLanguage();
  return (
    <div
      className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition cursor-pointer group h-full"
      onClick={onClick}
    >
      <div className="h-48 relative overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-amber-50">
            <span className="text-amber-600 font-semibold text-sm">TechSİN Product</span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">
          {post.excerpt || post.content?.replace(/<[^>]+>/g, "").slice(0, 120)}
        </p>
        <button className="text-blue-600 font-semibold hover:underline flex items-center mt-auto">
          {language === "EN" ? "Read More" : "Devamını Oku"}
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Main component with corrected logic and structure
export default function Products() {
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categoryMap: Record<string, string> = {
    TR: "urunlerimiz",
    EN: "our-products",
  };

  // This useEffect correctly refetches data when the language changes.
  useEffect(() => {
    setPosts([]);
    setLoading(true);
    const category = categoryMap[language];

    fetch(`http://localhost:4000/api/blog?category=${category}`)
      .then(res => res.json())
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [language]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <span className="text-gray-600">
            {t("productsTitle")}{" "}
            {language === "TR" ? "yükleniyor..." : "loading..."}
          </span>
        </div>
      </div>
    );
  }

  // Animation variants for the container and items
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <>
      <Helmet>
        <title>
          {language === "EN"
            ? "TechSİN Solutions | Our Products"
            : "TechSİN Solutions | Ürünlerimiz"}
        </title>
      </Helmet>

      <main className="bg-gray-50">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-28 px-6 text-center">
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl font-extrabold mb-4">
              {language === "EN" ? "Our Products" : "Ürünlerimiz"}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              {language === "EN"
                ? "Discover software and hardware products tailored to your needs."
                : "İhtiyaçlarınıza uygun yazılım ve donanım ürünlerini keşfedin."}
            </p>
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
        </section>

        {/* Products Grid */}
        <motion.section
          className="max-w-6xl mx-auto py-20 px-6"
          variants={containerVariants}
          initial="hidden"
          // Using animate="show" for reliability on initial load and language change
          animate="show"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">
                  {language === "EN"
                    ? "No products found."
                    : "Ürün bulunamadı."}
                </p>
              </div>
            ) : (
              posts.map(post => (
                <motion.div key={post._id} variants={itemVariants}>
                  <ProductCard
                    post={post}
                    onClick={() =>
                      navigate(
                        language === "EN"
                          ? `/en/our-products/${post.slug}`
                          : `/urunlerimiz/${post.slug}`
                      )
                    }
                  />
                </motion.div>
              ))
            )}
          </div>
        </motion.section>
      </main>
    </>
  );
}