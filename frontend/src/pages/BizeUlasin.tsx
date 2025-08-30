import React from "react";
import { Helmet } from "react-helmet-async";
import { Phone, Printer, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Extended translations for contact page
const contactTranslations = {
  "TR": {
    "title": "TechSİN Solutions | Bize Ulaşın",
    "heroTitle": "Bize Ulaşın",
    "heroDesc": "Bizimle iletişime geçmek için ofis adreslerimiz, telefon bilgilerimiz ve haritalarımıza aşağıdan ulaşabilirsiniz.",
    "headquarters": "Merkez",
    "branch": "Şube",
    "headquartersMapTitle": "Merkez Haritası",
    "branchMapTitle": "Şube Haritası"
  },
  "EN": {
    "title": "TechSİN Solutions | Contact Us",
    "heroTitle": "Contact Us",
    "heroDesc": "You can access our office addresses, phone information and maps below to get in touch with us.",
    "headquarters": "Headquarters",
    "branch": "Branch",
    "headquartersMapTitle": "Headquarters Map",
    "branchMapTitle": "Branch Map"
  }
};

export default function BizeUlasin() {
  const { language } = useLanguage();
  const ct = (key) => contactTranslations[language][key] || contactTranslations["TR"][key];

  return (
    <>
      <Helmet>
        <title>{ct("title")}</title>
      </Helmet>

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-28 px-6 text-center">
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl font-extrabold mb-4">{ct("heroTitle")}</h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              {ct("heroDesc")}
            </p>
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
        </section>

        {/* Contact Sections */}
        <section className="max-w-6xl mx-auto py-20 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* HEADQUARTERS */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-6">
                <MapPin className="w-6 h-6 text-blue-600" />
                {ct("headquarters")}
              </h2>
              <address className="not-italic space-y-3 text-gray-700 text-lg leading-relaxed">
                <p>Atatürk Mah. Ertuğrul Gazi Sok.</p>
                <p>
                  Metropol İstanbul A2 {language === "EN" ? "Tower Floor:21 Office:331" : "Kule Kat:21 Daire:331"}
                </p>
                <p>Ataşehir / İSTANBUL</p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>0216 573 0184</span>
                </p>
                <p className="flex items-center gap-3">
                  <Printer className="w-5 h-5 text-blue-600" />
                  <span>0216 573 0187</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a
                    href="mailto:info@techsin.com.tr"
                    className="text-blue-600 hover:underline"
                  >
                    info@techsin.com.tr
                  </a>
                </p>
              </address>
            </div>

            {/* BRANCH */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-6">
                <MapPin className="w-6 h-6 text-blue-600" />
                {ct("branch")}
              </h2>
              <address className="not-italic space-y-3 text-gray-700 text-lg leading-relaxed">
                <p>YTÜ İkitelli {language === "EN" ? "Technopark" : "Teknopark"}</p>
                <p>{language === "EN" ? "Office No: 129" : "Ofis No: 129"}</p>
                <p>34490 Başakşehir / İSTANBUL</p>
              </address>
            </div>
          </div>
        </section>

        {/* Maps */}
        <section className="max-w-6xl mx-auto pb-20 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title={ct("headquartersMapTitle")}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12083.869426775864!2d29.1187859!3d40.9923184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac39b5187b8ed%3A0x54f987c9607b568d!2sMetropol%20Istanbul!5e0!3m2!1str!2str!4v1691700000000!5m2!1str!2str"
              className="w-full h-80 md:h-[360px]"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <iframe
              title={ct("branchMapTitle")}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.665525651569!2d28.809994515108736!3d41.07284510281069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab41e3920f4e1%3A0x3a5963b0db349a4a!2sYT%C3%9C%20%C4%B0kitelli%20Teknopark!5e0!3m2!1str!2str!4v1691700000000!5m2!1str!2str"
              className="w-full h-80 md:h-[360px]"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
    </>
  );
}