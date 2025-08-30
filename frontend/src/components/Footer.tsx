import React, { useState, useEffect } from "react";
import { ChevronDown, ArrowUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { slugMapping } from "../i18n/slugMapping";
import { NavLink, useLocation } from "react-router-dom";

interface SubItem {
  title: string;
  slug: string;
}

interface SubProduct {
  id: string;
  title: string;
  slug: string;
}

interface Item {
  title: string;
  slug: string;
  subItems?: SubItem[];
  subProducts?: SubProduct[];
}

export default function Footer() {
  const { language, t } = useLanguage();
  const location = useLocation();
  const [products, setProducts] = useState<Item[]>([]);
  const [services, setServices] = useState<Item[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const translateToEnglishServices = (title: string): string => {
    const dictionary: Record<string, string> = {
      "Danışmanlık Hizmetleri": "Consultancy Services",
      "Süreç Yönetimi Çözümleri": "Process Management Solutions",
      "Bilgi Güvenliği": "Information Security",
      "Yazılım Çözümleri": "Software Solutions",
      "Veritabanı Çözümleri": "Database Solutions",
      "Veri Replikasyonu Çözümleri": "Data Replication Solutions",
      "Veri Madenciliği Çalışmaları": "Data Mining Services",
      "İş Zekası Çözümleri": "Business Intelligence Solutions",
    };
    return dictionary[title] || title;
  };

  const translateToEnglishProducts = (title: string): string => {
    const dictionary: Record<string, string> = {
      "SmartAct": "SmartAct",
      "BeBI": "BeBI",
      "MÜZE ASİST": "MÜZE ASİST",
      "SmartSales®": "SmartSales®",
      "Sigortacılıkta E-Satış": "E-Sales in Insurance",
      "Terrarium Performans Yönetimi Yazılımı": "Terrarium Performance Management Software",
      "Satış Yönetim Sistemi (OPTIMATCH – Sales)": "Sales Management System (OPTIMATCH – Sales)",
      "Sigorta İçin Danışman Satış Yönetim Sistemi (OPTIMATCH-Insurance)": "Sales Management System for Insurance Advisors (OPTIMATCH-Insurance)",
      "Çağrı Merkezi İçin Temsilci Müşteri Eşleştirme Sistemi (OPTIMATCH-CallCenter)": "Representative–Customer Matching System for Call Centers (OPTIMATCH-CallCenter)",
    };
    return dictionary[title] || title;
  };

  const isChildActive = (subs: any[]): boolean => {
    return subs.some(sub =>
      location.pathname === sub.path ||
      (sub.subLinks && isChildActive(sub.subLinks)) ||
      (sub.subItems && isChildActive(sub.subItems))
    );
  };

  const getSlugForNav = (slug: string) => {
    if (slug === "home") return language === "TR" ? "/" : "/en";

    const baseSlug =
      language === "TR"
        ? Object.keys(slugMapping).includes(slug)
          ? slug
          : Object.entries(slugMapping).find(([, en]) => en === slug)?.[0] || slug
        : Object.entries(slugMapping).find(([tr]) => tr === slug)?.[1] || slug;

    return language === "TR" ? `/${baseSlug}` : `/en/${baseSlug}`;
  };

  const getBaseSlug = (slug: string) => {
    if (slug.startsWith('tr-') || slug.startsWith('en-')) {
      if (language === "TR") {
        return slug.startsWith('tr-') ? slug : slug.replace('en-', 'tr-');
      } else {
        return slug.startsWith('en-') ? slug : slug.replace('tr-', 'en-');
      }
    }

    return language === "TR"
      ? Object.keys(slugMapping).includes(slug)
        ? slug
        : Object.entries(slugMapping).find(([, en]) => en === slug)?.[0] || slug
      : Object.entries(slugMapping).find(([tr]) => tr === slug)?.[1] || slug;
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/blog/products/list")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]));

    fetch("http://localhost:4000/api/blog/services/list")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          setServices([]);
        }
      })
      .catch(() => setServices([]));

    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [language]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { path: getSlugForNav("home"), label: t("home") },
    { path: getSlugForNav("kvkk"), label: t("kvkk") },
    { path: getSlugForNav("kurumsal"), label: t("corporate") },
    {
      path: getSlugForNav("urunlerimiz"),
      label: t("products"),
      hasDropdown: true,
      subLinks: products.map((s) => {
        const productsPath = getSlugForNav("urunlerimiz");
        const productSlug = getBaseSlug(s.slug);
        return {
          path: `${productsPath}/${productSlug}`,
          label: language === "EN" ? translateToEnglishProducts(s.title) : s.title,
          subItems: s.subItems?.map((sub) => ({
            path: `${productsPath}/${productSlug}/${getBaseSlug(sub.slug)}`,
            label: language === "EN" ? translateToEnglishProducts(sub.title) : sub.title,
          })),
          subProducts: s.subProducts?.map((subProd) => ({
            path: `${productsPath}/${productSlug}/${getBaseSlug(subProd.slug)}`,
            label: language === "EN" ? translateToEnglishProducts(subProd.title) : subProd.title,
          })),
        };
      }),

    },
    {
      path: getSlugForNav("hizmetlerimiz"),
      label: t("services"),
      hasDropdown: true,
      subLinks: services.map((s) => {
        const servicesPath = getSlugForNav("hizmetlerimiz");
        const serviceSlug = getBaseSlug(s.slug);
        return {
          path: `${servicesPath}/${serviceSlug}`,
          label: language === "EN" ? translateToEnglishServices(s.title) : s.title,
          subItems: s.subItems?.map((sub) => ({
            path: `${servicesPath}/${serviceSlug}/${getBaseSlug(sub.slug)}`,
            label: language === "EN" ? translateToEnglishServices(sub.title) : sub.title,
          })),
        };
      }),
    },
    { path: getSlugForNav("referanslar"), label: t("references") },
    {
      path: getSlugForNav("blog"),
      label: t("blog"),
      hasDropdown: true,
      subLinks: [
        { path: getSlugForNav("makaleler"), label: t("articles") },
        { path: getSlugForNav("teknik-cozumler"), label: t("technicalSolutions") },
      ],
    },
    { path: getSlugForNav("kariyer"), label: t("career") },
    { path: getSlugForNav("bizeulasin"), label: t("contactUs") },
  ];

  const renderSubLinks = (subs: any[], isNested = false) =>
    subs.map((sub) => (
      <div key={sub.path} className="mb-1">
        <NavLink
          to={sub.path}
          className={({ isActive }) =>
            `block font-medium text-sm px-2 py-1 rounded transition-colors ${isActive ? "text-blue-400" : "text-gray-200 hover:text-blue-300"}`
          }
        >
          {sub.label}
        </NavLink>
        {(sub.subItems || sub.subLinks || sub.subProducts) && (
          <div className="ml-2 mt-1 space-y-1">
            {sub.subLinks && renderSubLinks(sub.subLinks, true)}
            {sub.subItems && renderSubLinks(sub.subItems, true)}
            {sub.subProducts && renderSubLinks(sub.subProducts, true)}
          </div>
        )}
      </div>
    ));

  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-x-8">
          {navLinks.map((link) => (
            <div key={link.path} className="w-full sm:w-auto sm:relative group">
              {/* Main navigation item */}
              <div
                className="flex items-center justify-between gap-1 text-sm hover:text-white transition-colors cursor-pointer border-b border-gray-800 sm:border-none py-3 sm:py-0"
                onClick={() => {
                  if (isMobile && link.hasDropdown) {
                    setOpenDropdown(openDropdown === link.path ? null : link.path);
                  }
                }}
              >
                <NavLink
                  to={link.path}
                  end={link.path === "/" || link.path === "/en"}
                  onClick={(e) => {
                    if (isMobile && link.hasDropdown) {
                      e.preventDefault();
                    }
                  }}
                  className={({ isActive }) => {
                    const childActive = link.hasDropdown && link.subLinks && isChildActive(link.subLinks);
                    return isActive || childActive ? "text-blue-400" : "text-gray-400";
                  }}
                >
                  {link.label}
                </NavLink>

                {link.hasDropdown && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isMobile && openDropdown === link.path ? "rotate-180" : ""}`}
                  />
                )}
              </div>

              {/* Dropdown Menu */}
              {link.hasDropdown && link.subLinks && (
                <div
                  className={`
      transition-all duration-300 ease-in-out overflow-hidden
      
      /* Mobile accordion styling */
      ${isMobile && openDropdown === link.path ? 'max-h-[500px] py-2' : 'max-h-0'}

      /* Desktop pop-up styling */
      sm:max-h-none /* <--- THIS IS THE FIX */
      sm:p-4 /* This restores the padding for the desktop pop-up */
      sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:bottom-full sm:mb-2 
      sm:bg-gray-800 sm:text-white sm:rounded-lg sm:shadow-lg sm:w-64 sm:z-50 
      sm:opacity-0 sm:invisible sm:translate-y-2 
      group-hover:sm:opacity-100 group-hover:sm:visible group-hover:sm:translate-y-0
    `}
                >
                  {renderSubLinks(link.subLinks)}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500 border-t border-gray-800 pt-4 mt-8">
          © {new Date().getFullYear()} {t("copyright")}
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-transform hover:scale-105"
          aria-label={t("scrollToTop")}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}