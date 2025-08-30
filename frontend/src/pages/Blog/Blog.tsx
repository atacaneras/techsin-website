import React from "react";
import { Helmet } from "react-helmet-async";
import { BookOpen, ListChecks } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export default function Blog() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>TechSİN Solutions | {t("blog")}</title>
      </Helmet>

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-28 px-6 text-center">
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl font-extrabold mb-4">{t("blog")}</h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              {t("blogHero")}
            </p>
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
        </section>

        {/* Content Section */}
        <section className="max-w-5xl mx-auto py-20 px-6">
          <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
            {/* Welcome Box */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
                {t("blogWelcomeTitle")}
              </h2>
              <p>{t("blogWelcomeText")}</p>
            </div>

            {/* Topics Box */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-4">
                <ListChecks className="w-6 h-6 text-indigo-600" />
                {t("blogTopicsTitle")}
              </h2>
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <span className="text-blue-500">✔</span>
                  {t("blogTopic1")}
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">✔</span>
                  {t("blogTopic2")}
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">✔</span>
                  {t("blogTopic3")}
                </li>
              </ul>
            </div>

            {/* Participation Box */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("blogParticipationTitle")}</h2>
              <p>
                {t("blogParticipationText1")}{" "}
                <a
                  href="mailto:info@techsin.com.tr"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  info@techsin.com.tr
                </a>{" "}
                {t("blogParticipationText2")}{" "}
                <NavLink
                  to="/bizeulasin"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("contactUs")}
                </NavLink>{" "}
                {t("blogParticipationText3")}
              </p>
            </div>

            <p className="text-center text-gray-600 italic">
              {t("blogOutro")} 🚀
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
