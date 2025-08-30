import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useLanguage } from "../context/LanguageContext"; // Add this import

export default function TestimonialsCarousel() {
  const { t, language } = useLanguage(); // Add language to get current language
  
  const [testimonials, setTestimonials] = useState<
    {
      logoUrl: string;
      quote: string;
      title: string;
      company: string;
    }[]
  >([]);

  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Pass language parameter to the API
        const response = await fetch(`http://localhost:4000/api/logos?lang=${language}`);
        if (!response.ok) throw new Error("Failed to fetch testimonials");

        const data = await response.json();
        setTestimonials(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [language]); // Re-fetch when language changes

  const length = testimonials.length;

  useEffect(() => {
    if (length <= 1) return; // No autoplay if only 1 item

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval); // Cleanup
  }, [length]);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex((i) => (i === length - 1 ? 0 : i + 1)),
    onSwipedRight: () => setIndex((i) => (i === 0 ? length - 1 : i - 1)),
    trackMouse: true,
  });

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md text-center">
        <p>{t("loading")}</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md text-center text-red-600">
        <p>{t("error")}: {error}</p>
      </section>
    );
  }

  if (length === 0) {
    return (
      <section className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md text-center">
        <p>{t("noTestimonials")}</p>
      </section>
    );
  }

  const { logoUrl, quote, title, company } = testimonials[index];

  return (
    <section className="max-w-lg mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-medium mb-4">{t("whoSays")}</h2>

      <div
        {...handlers}
        className="cursor-grab focus:outline-none"
        tabIndex={0}
        role="region"
        aria-label={t("testimonialsCarouselLabel")}
      >
        <div className="flex flex-col items-center text-center space-y-6 px-4">
          <img
            src={`http://localhost:4000${logoUrl}`}
            alt={`${company} logo`}
            className="h-14 object-contain mb-3"
            loading="lazy"
          />

          <blockquote className="relative text-gray-700 whitespace-pre-line italic text-sm leading-relaxed max-w-lg bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-300 shadow-sm">
            <svg
              className="absolute top-2 left-3 w-4 h-4 text-indigo-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M7.17 6A4.17 4.17 0 0 0 3 10.17v7.33A2.5 2.5 0 0 0 5.5 20h2.67a1 1 0 0 0 1-1v-5.5a1 1 0 0 0-1-1H6a1 1 0 0 1-1-1V6Zm10 0A4.17 4.17 0 0 0 13 10.17v7.33A2.5 2.5 0 0 0 15.5 20h2.67a1 1 0 0 0 1-1v-5.5a1 1 0 0 0-1-1h-1.17a1 1 0 0 1-1-1V6Z" />
            </svg>
            {quote}
          </blockquote>

          <p className="mt-1 text-indigo-800 font-semibold text-lg tracking-wide border-b border-indigo-300 pb-1">
            {company}
          </p>

          <p className="mt-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md font-medium text-xs inline-block">
            {title}
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === index
                ? "bg-indigo-700 shadow-md"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}