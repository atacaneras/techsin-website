import React from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Briefcase } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Kariyer() {
  const { t } = useLanguage();

  const qualifications = [
    t("qualification1"),
    t("qualification2"),
    t("qualification3"),
    t("qualification4"),
    t("qualification5"),
    t("qualification6"),
  ];

  return (
    <>
      <Helmet>
        <title>TechSİN Solutions | {t("career")}</title>
      </Helmet>

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-28 px-6 text-center">
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl font-extrabold mb-4">{t("career")}</h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              {t("careerHero")}
            </p>
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
        </section>

        {/* Content Section */}
        <section className="max-w-5xl mx-auto py-20 px-6">
          <div className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-2xl transition">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-8">
              <Briefcase className="w-7 h-7 text-blue-600" />
              {t("qualificationsTitle")}
            </h2>

            <ul className="space-y-4 text-gray-700">
              {qualifications.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 text-center">
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                {t("careerCta")}
              </p>
              <a
                href="mailto:info@techsin.com.tr"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl shadow-md transition duration-300"
              >
                📧 {t("sendApplication")}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
