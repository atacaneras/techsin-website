import React, { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

interface Partner {
  id?: number;
  logoUrl: string;
  name?: string;
}

interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  publishDate?: string;
  category: string;
}

interface ApiService {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  excerpt: string;
  publishDate: string;
}

export default function Home() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0);
    const [apiServices, setApiServices] = useState<ApiService[]>([]);

  const categoryMap: Record<string, string> = {
    TR: "haberler",
    EN: "news"
  };

  useEffect(() => {
  setApiServices([]);
  setLoading(true);

  const category = categoryMap[language]; // TR/EN

  fetch(`http://localhost:4000/api/blog?category=${category}`)
    .then(res => res.json())
    .then(data => {
      setApiServices(data);
      setNewsArticles(data); // if you are using newsArticles state
      setNewsLoading(false);
    })
    .catch(err => {
      console.error(err);
      setNewsLoading(false);
    })
    .finally(() => setLoading(false));
}, [language]);

  // Responsive slides configuration
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const getSlidesToShow = (width: number, isNews = false) => {
    if (isNews) {
      if (width < 768) return 1; // Mobile: 1 slide
      if (width < 1024) return 2; // Tablet: 2 slides  
      return 3; // Desktop: 3 slides
    } else {
      if (width < 640) return 1; // Mobile: 1 slide
      if (width < 768) return 2; // Small tablet: 2 slides
      if (width < 1024) return 3; // Tablet: 3 slides
      return 4; // Desktop: 4 slides
    }
  };

  const SLIDES_TO_SHOW = getSlidesToShow(windowWidth);
  const NEWS_SLIDES_TO_SHOW = getSlidesToShow(windowWidth, true);
  const ANIMATION_DURATION = 500;
  const AUTO_PLAY_DELAY = 4000;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Extract image from HTML content
  const extractImageFromContent = (htmlContent: string): string | null => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const img = doc.querySelector('img');
    return img ? img.src : null;
  };

  // Extract text preview from HTML content
  const extractTextPreview = (htmlContent: string, maxLength: number = 120): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const text = doc.body.textContent || "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/partners");
        if (!response.ok) throw new Error("Failed to fetch partners");

        const data = await response.json();
        setPartners(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
        setPartners([
          { logoUrl: "/logos/Arena.png", name: "Arena" },
          { logoUrl: "/logos/Beinformed.png", name: "Be Informed" },
          { logoUrl: "/logos/Emakin.png", name: "Emakin" },
          { logoUrl: "/logos/EMC.png", name: "EMC" },
          { logoUrl: "/logos/Idera.png", name: "Idera" },
          { logoUrl: "/logos/Oracle.png", name: "Oracle" },
          { logoUrl: "/logos/penta.png", name: "Penta" },
          { logoUrl: "/logos/Zti.png", name: "ZTI" },
        ]);
      }
    };

    fetchPartners();
  }, []);

  const totalSlides = Math.max(0, partners.length - SLIDES_TO_SHOW + 1);
  const totalNewsSlides = Math.max(0, newsArticles.length - NEWS_SLIDES_TO_SHOW + 1);

  const nextSlide = useCallback(() => {
    if (isAnimating || partners.length <= SLIDES_TO_SHOW) return;
    setIsAnimating(true);
    setCurrentSlide(prev => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
  }, [isAnimating, partners.length, totalSlides, SLIDES_TO_SHOW]);

  const prevSlide = useCallback(() => {
    if (isAnimating || partners.length <= SLIDES_TO_SHOW) return;
    setIsAnimating(true);
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
  }, [isAnimating, partners.length, totalSlides, SLIDES_TO_SHOW]);

  const goToSlide = useCallback((slideIndex: number) => {
    if (isAnimating || slideIndex === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(slideIndex);
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
  }, [isAnimating, currentSlide]);

  // News navigation functions
  const nextNewsSlide = useCallback(() => {
    if (newsArticles.length <= NEWS_SLIDES_TO_SHOW) return;
    setCurrentNewsSlide(prev => (prev + 1) % totalNewsSlides);
  }, [newsArticles.length, totalNewsSlides, NEWS_SLIDES_TO_SHOW]);

  // Auto-play functionality for partners
  useEffect(() => {
    if (isPaused || partners.length <= SLIDES_TO_SHOW) return;

    const interval = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused, partners.length, SLIDES_TO_SHOW]);

  // Auto-play functionality for news
  useEffect(() => {
    if (newsArticles.length <= NEWS_SLIDES_TO_SHOW) return;

    const interval = setInterval(() => {
      nextNewsSlide();
    }, AUTO_PLAY_DELAY + 1000); // Slightly different timing

    return () => clearInterval(interval);
  }, [nextNewsSlide, newsArticles.length, NEWS_SLIDES_TO_SHOW]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  
const handleNewsClick = (slug: string) => {
  const basePath = language === "EN" ? "/en/news" : "/haberler";
  navigate(`${basePath}/${slug}`);
};

  if (loading && newsLoading) {
    return (
      <div className="flex items-center justify-center py-12 min-h-screen px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <span className="text-gray-600">{t("contentLoading")}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>TechSİN Solutions | {t("homeHelmet")}</title>
      </Helmet>

      <div className="bg-gray-50">
        {/* Main content container with proper width and centering */}
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl mb-8 sm:mb-12 lg:mb-16 p-4 sm:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
                {t("techsinSolutions")}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block sm:inline mt-2 sm:mt-0">
                  {t("welcome")}
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2 max-w-2xl mx-auto">
                {t("welcomeText")}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
                <a
                  href="#services"
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-center"
                >
                  {t("ourServices")}
                </a>
                <a
                  href="/bizeulasin"
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 font-medium text-center"
                >
                  {t("contactUs")}
                </a>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-12 sm:pb-16 lg:pb-20">
            <section id="services" className="mb-12 sm:mb-16">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">{t("ourServices")}</h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                  {t("servicesText")}
                </p>
              </div>
              <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 sm:px-0">
                <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">{t("servicesTitleWeb")}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {t("servicesTextWeb")}
                  </p>
                </div>

                <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-green-200">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">{t("servicesTitleMobile")}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {t("servicesTextMobile")}
                  </p>
                </div>

                <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-purple-200 md:col-span-2 lg:col-span-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">{t("servicesTitleCloud")}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {t("servicesTextCloud")}
                  </p>
                </div>
              </div>
            </section>

            {/* News Section */}
            {newsArticles.length > 0 && (
              <section id="news" className="mb-12 sm:mb-16">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">{t("newsFromUs")}</h2>
                  <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                    {t("newsText")}
                  </p>
                </div>

                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 sm:px-0">
                  {newsArticles.map((news) => {
                    const imageUrl = extractImageFromContent(news.content);
                    const textPreview = extractTextPreview(news.content);

                    return (
                      <div
                        key={news._id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
                        onClick={() => handleNewsClick(news.slug)}
                      >
                        {/* Image */}
                        <div className="h-40 sm:h-48 w-full bg-gray-200 overflow-hidden relative">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={news.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <svg
                                className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12z"
                                />
                              </svg>
                            </div>
                          )}
                          {/* Date Badge */}
                          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                            {news.publishDate
                              ? new Date(news.publishDate).toLocaleDateString('tr-TR')
                              : new Date(news.createdAt).toLocaleDateString('tr-TR')}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-3 sm:p-4">
                          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                            {news.title}
                          </h3>
                          <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-3">{textPreview}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              Haber
                            </span>
                            <span className="text-blue-600 text-xs sm:text-sm font-medium group-hover:underline">
                              Oku →
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Partners Section */}
            <section id="partners" className="mb-12 sm:mb-16">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">{t("partners")}</h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                  {t("partnersText")}
                </p>
              </div>
              <div
                className="relative px-2 sm:px-0"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Main Carousel Container */}
                <div className="relative overflow-hidden rounded-2xl bg-white p-4 sm:p-6 shadow-lg border border-gray-100">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: partners.length > SLIDES_TO_SHOW
                        ? `translateX(-${currentSlide * (100 / SLIDES_TO_SHOW)}%)`
                        : 'translateX(0)'
                    }}
                  >
                    {partners.map((partner, index) => (
                      <div
                        key={`partner-${index}`}
                        className="flex-shrink-0 px-2 sm:px-4"
                        style={{
                          width: partners.length <= SLIDES_TO_SHOW
                            ? `${100 / partners.length}%`
                            : `${100 / SLIDES_TO_SHOW}%`
                        }}
                      >
                        <div className="bg-gray-50 hover:bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 h-20 sm:h-24 flex items-center justify-center group border border-gray-100 hover:border-blue-200">
                          <img
                            src={partner.logoUrl.startsWith('http')
                              ? partner.logoUrl
                              : `http://localhost:4000${partner.logoUrl}`
                            }
                            alt={partner.name || `Partner ${index + 1}`}
                            className="max-h-8 sm:max-h-12 max-w-full w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;base64,...'; // fallback
                            }}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows - moved inside the relative container */}
                  {partners.length > SLIDES_TO_SHOW && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-200 z-20 border border-gray-200 hover:border-gray-300 group"
                        aria-label="Previous partners"
                      >
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 group-hover:text-blue-600 transition-colors"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      <button
                        onClick={nextSlide}
                        className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-200 z-20 border border-gray-200 hover:border-gray-300 group"
                        aria-label="Next partners"
                      >
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 group-hover:text-blue-600 transition-colors"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Dots Indicator */}
                {partners.length > SLIDES_TO_SHOW && (
                  <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${currentSlide === index
                          ? 'w-6 sm:w-8 h-2 sm:h-3 bg-gradient-to-r from-blue-600 to-blue-700'
                          : 'w-2 sm:w-3 h-2 sm:h-3 bg-gray-300 hover:bg-gray-400'
                          }`}
                        aria-label={`Go to partners slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Contact CTA */}
            <div className="mt-16 sm:mt-20 lg:mt-24 px-2 sm:px-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 text-center">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 px-2">{t("ctaTitle")}</h2>
                <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 px-2 max-w-2xl mx-auto">{t("ctaText")}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
                  <a
                    href="/bizeulasin"
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-center"
                  >
                    {t("sendApplication")}
                  </a>
                  <a
                    href="/kurumsal"
                    className="px-6 py-3 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 font-medium text-center"
                  >
                    {t("seeDetails")}
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}