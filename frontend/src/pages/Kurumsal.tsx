import React from "react";
import { Helmet } from "react-helmet-async";
import { Target, Rocket, Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Kurumsal() {
  const { t } = useLanguage();

  const values = [
    t("value1"),
    t("value2"),
    t("value3"),
    t("value4"),
    t("value5"),
  ];

  return (
    <>
      <Helmet>
        <title>TechSİN Solutions | {t("corporate")}</title>
      </Helmet>

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-28 px-6 text-center">
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl font-extrabold mb-4">
              {t("corporateTitle")}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              {t("corporateHero")}
            </p>
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
        </section>

        {/* Vision & Mission */}
        <section className="max-w-5xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-2xl transition">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-blue-600 w-8 h-8" />
              <h2 className="text-2xl font-bold text-gray-800">{t("vision")}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{t("visionText")}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-2xl transition">
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="text-indigo-600 w-8 h-8" />
              <h2 className="text-2xl font-bold text-gray-800">{t("mission")}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{t("missionText")}</p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t("values")}
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <Star className="text-yellow-500 w-6 h-6 mt-1" />
                  <p className="text-gray-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video */}
        <section className="max-w-5xl mx-auto py-20 px-6">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.youtube.com/embed/e-r2ROOxbNI"
              title={t("corporateVideo")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </section>
      </main>
    </>
  );
}
