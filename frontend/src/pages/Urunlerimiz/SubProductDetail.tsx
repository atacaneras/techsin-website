import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

// The data structure for a sub-product is the same as a main product
interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  features?: string[];
}

export default function SubProductDetail() {
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { parentSlug, subSlug } = useParams<{ parentSlug: string; subSlug: string }>();

  const navigate = useNavigate();
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!parentSlug || !subSlug) return;

    // Determine the language from the sub-product's slug in the URL
    const slugLang = subSlug.startsWith("en-") ? "EN" : "TR";

    // **LOGIC APPLIED**: If the URL's language mismatches the context language, redirect immediately.
    if (slugLang !== language) {
      const newBasePath = language === "EN" ? "/en/our-products" : "/urunlerimiz";

      // Reconstruct parent slug for the new language
      const baseParentSlug = parentSlug.startsWith("tr-") || parentSlug.startsWith("en-")
        ? parentSlug.substring(3)
        : parentSlug;
      const newParentSlug = language === "EN" ? `en-${baseParentSlug}` : `tr-${baseParentSlug}`;

      // Reconstruct sub-product slug for the new language
      const baseSubSlug = subSlug.substring(3);
      const newSubSlug = language === "EN" ? `en-${baseSubSlug}` : `tr-${baseSubSlug}`;

      navigate(`${newBasePath}/${newParentSlug}/${newSubSlug}`, { replace: true });
      return; // Stop further execution to prevent fetching old data
    }

    // If languages match, proceed with fetching data
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setPost(null);
    setError(null);

    // Fetch the parent product using its slug, then find the sub-product
    fetch(`http://localhost:4000/api/blog/${parentSlug}?lang=${language.toLowerCase()}`, { signal })
      .then(res => {
        if (!res.ok) throw new Error("Parent product not found");
        return res.json();
      })
      .then(data => {
        const subProduct = data.subProducts?.find((sp: any) => sp.slug === subSlug);
        if (!subProduct) {
          throw new Error("Sub-product not found");
        }
        setPost(subProduct);
      })
      .catch(err => {
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
  }, [parentSlug, subSlug, language, navigate]);


  // The "Back" button navigates to the parent product's page
  const handleBack = () => {
    const parentPath = language === "EN" ? "/en/our-products" : "/urunlerimiz";
    navigate(`${parentPath}/${parentSlug}`);
  };

  if (loading) return <LoadingSpinner text={t("loadingProduct")} />;
  if (error || !post) return <NotFound text={t("productNotFound")} link={language === "EN" ? `/en/our-products/${parentSlug}` : `/urunlerimiz/${parentSlug}`} linkText={t("backToProduct")} />;

  return (
    <>
      <Helmet>
        <title>TechSİN Solutions | {post.title}</title>
      </Helmet>

      <main className="pt-20 max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">{post.title}</h1>
          <CustomStyles />

          {post.features && (
            <div className="my-6 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-blue-800 font-semibold mb-3">{t("highlightedFeatures")}</h3>
              <ul className="list-disc pl-5 text-blue-700">
                {post.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div
            className="product-content max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <BackButton onClick={handleBack} text={t("backToProduct")} />

        </div>
      </main>
    </>
  );
}

// Reusable helper components (copied directly from ProductDetail)
const LoadingSpinner = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
      <span className="text-gray-600">{text}</span>
    </div>
  </div>
);

const NotFound = ({ text, link, linkText }: { text: string; link: string; linkText: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-medium text-gray-700">{text}</h3>
        <BackButton onClick={() => navigate(link)} text={linkText} />
      </div>
    </div>
  );
};

const BackButton = ({ onClick, text }: { onClick: () => void; text: string }) => (
  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
    <button
      onClick={onClick}
      className="inline-flex items-center text-blue-600 hover:text-blue-800"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      {text}
    </button>
  </div>
);

// **LOGIC APPLIED**: The full set of custom styles is now included.
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
      /* Image and text alignment */
      .flex.flex-col.md\\:flex-row {
        display: flex;
        flex-direction: column;
      }
      
      @media (min-width: 768px) {
        .flex.flex-col.md\\:flex-row {
          flex-direction: row;
        }
      }
      
      .items-stretch {
        align-items: stretch;
      }
      
      .w-full.md\\:w-1\\/2 {
        width: 100%;
      }
      
      @media (min-width: 768px) {
        .w-full.md\\:w-1\\/2 {
          width: 50%;
        }
      }
      
      .flex {
        display: flex;
      }
      
      .justify-center {
        justify-content: center;
      }
      
      .flex-col {
        flex-direction: column;
      }
      
      .object-cover {
        object-fit: cover;
      }
      
      /* Video container styles */
      .video-container-small, .video-container-medium, 
      .video-container-large, .video-container-extra-large {
        width: 100%;
        margin: 20px 0;
      }
      
      .video-wrapper {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      }
      
      .video-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 8px;
      }
      
      /* Text styling */
      .text-center {
        text-align: center;
      }
      
      .list-none {
        list-style-type: none;
        padding-left: 0;
      }
      
      .list-none li {
        display: flex;
        align-items: flex-start;
        margin-bottom: 0.5rem;
      }
      
      /* Grid layout */
      .grid {
        display: grid;
      }
      
      .grid-cols-1 {
        grid-template-columns: repeat(1, 1fr);
      }
      
      @media (min-width: 768px) {
        .md\\:grid-cols-2 {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (min-width: 1024px) {
        .lg\\:grid-cols-3 {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      .gap-4 {
        gap: 1rem;
      }
      
      /* Responsive adjustments */
      @media (max-width: 767px) {
        .flex.flex-col.md\\:flex-row {
          flex-direction: column;
        }
        
        .w-full.md\\:w-1\\/2 {
          width: 100%;
        }
        
        .video-container-small,
        .video-container-medium,
        .video-container-large,
        .video-container-extra-large {
          margin: 20px 0;
        }
      }
    `
  }} />
);