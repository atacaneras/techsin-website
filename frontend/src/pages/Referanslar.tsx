import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext";

interface LogoData {
  logoUrl: string;
  company: string;
}

export default function Referanslar() {
  const { t } = useLanguage();
  const [logos, setLogos] = useState<LogoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/references")
      .then((res) => res.json())
      .then((data) => {
        setLogos(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Logo yüklenirken hata:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>TechSİN Solutions | {t("references")}</title>
      </Helmet>

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-28 px-6 text-center">
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl font-extrabold mb-4">{t("references")}</h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              {t("referencesHero")}
            </p>
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
        </section>

        {/* Logos Grid */}
        <section className="max-w-6xl mx-auto py-20 px-6">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-2xl h-32 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {logos.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center justify-center border border-gray-100 hover:border-blue-200"
                >
                  <div className="relative w-full h-20 flex items-center justify-center">
                    <img
                      src={item.logoUrl}
                      alt={item.company}
                      className="max-h-16 max-w-[120px] object-contain transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-4 text-gray-700 text-sm font-medium text-center">
                    {item.company}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="text-center pb-20">
          <p className="text-gray-600 text-lg">
            {t("moreReferences")}{" "}
            <a
              href="/bizeulasin"
              className="text-blue-600 font-semibold hover:underline"
            >
              {t("contactUs")}
            </a>
            .
          </p>
        </section>
      </main>
    </>
  );
}
