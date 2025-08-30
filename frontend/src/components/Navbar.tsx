import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { slugMapping } from "../i18n/slugMapping";

interface CompanyLogo {
  logoUrl: string;
  company: string;
}

interface SubItem {
  title: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  subProducts?: SubItem[];
}

interface Service {
  title: string;
  slug: string;
  subServices?: SubItem[];
}

interface NavLinkItem {
  id?: string;
  path: string;
  label: string;
  hasDropdown?: boolean;
  subLinks?: NavSubLink[];
}

interface NavSubLink {
  path: string;
  label: string;
  subLinks?: NavSubLink[];
  subItems?: SubItem[];
  subProducts?: SubItem[];
}

const Navbar = () => {
  const location = useLocation();
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [logo, setLogo] = useState<CompanyLogo | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const isChildActive = (subs: NavSubLink[]): boolean => {
    return subs.some(sub =>
      location.pathname === sub.path ||
      (sub.subLinks && isChildActive(sub.subLinks))
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

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://api.techsin.com.tr/api/blog/products/list?lang=${language.toLowerCase()}`);
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`https://api.techsin.com.tr/api/blog/services/list?lang=${language.toLowerCase()}`);
      const data = await response.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching services:', err);
      setServices([]);
    }
  };

  const navLinks = React.useMemo(
    () => {
      const links: NavLinkItem[] = [
        { id: "corporate", path: getSlugForNav("kurumsal"), label: t("corporate") },
        {
          id: "products",
          path: getSlugForNav("urunlerimiz"),
          label: t("products"),
          hasDropdown: true,
          subLinks: products.map((product) => {
            const productsPath = getSlugForNav("urunlerimiz");
            const productSlug = getBaseSlug(product.slug);
            return {
              path: `${productsPath}/${productSlug}`,
              label: language === "EN" ? translateToEnglishProducts(product.title) : product.title,
              subLinks: product.subProducts?.map((subProduct) => ({
                path: `${productsPath}/${productSlug}/${getBaseSlug(subProduct.slug)}`,
                label: language === "EN" ? translateToEnglishProducts(subProduct.title) : subProduct.title,
              })),
            };
          }),
        },
        {
          id: "services",
          path: getSlugForNav("hizmetlerimiz"),
          label: t("services"),
          hasDropdown: true,
          subLinks: services.map((service) => {
            const servicesPath = getSlugForNav("hizmetlerimiz");
            const serviceSlug = getBaseSlug(service.slug);
            return {
              path: `${servicesPath}/${serviceSlug}`,
              label: language === "EN" ? translateToEnglishServices(service.title) : service.title,
              subLinks: service.subServices?.map((subService) => ({
                path: `${servicesPath}/${serviceSlug}/${getBaseSlug(subService.slug)}`,
                label: language === "EN" ? translateToEnglishServices(subService.title) : subService.title,
              })),
            };
          }),
        },
        { id: "references", path: getSlugForNav("referanslar"), label: t("references") },
        {
          id: "blog",
          path: getSlugForNav("blog"),
          label: t("blog"),
          subLinks: [
            { path: getSlugForNav("makaleler"), label: t("articles") },
            { path: getSlugForNav("teknik-cozumler"), label: t("technicalSolutions") }
          ]
        },
        { id: "career", path: getSlugForNav("kariyer"), label: t("career") },
        { id: "contact", path: getSlugForNav("bizeulasin"), label: t("contact") },
      ];
      return links;
    },
    [products, services, t, language]
  );

  useEffect(() => {
    fetch("https://api.techsin.com.tr/api/company")
      .then((res) => res.json())
      .then((data) => setLogo(data))
      .catch((err) => console.error("Logo yüklenirken hata:", err));

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchServices();
  }, [language]);

  return (
    <nav className={`bg-white shadow-md w-full transition-all duration-300 ${isScrolled
      ? 'bg-opacity-95 -translate-y-1 shadow-lg'
      : 'bg-opacity-100 translate-y-0'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        <NavLink to={getSlugForNav("home")} className="flex items-center pr-8">
          {logo?.logoUrl ? (
            <img
              src={logo.logoUrl}
              alt={logo.company || "Company Logo"}
              className={`h-12 object-contain hover:scale-105 transition-transform duration-200 ${isScrolled ? 'h-10' : 'h-12'}`}
            />
          ) : (
            <span className="text-2xl font-bold text-blue-600">Techsin</span>
          )}
        </NavLink>

        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <div
              key={link.path}
              className="relative group"
              onMouseEnter={() => {
                if (link.id === "blog") setBlogOpen(true);
                if (link.id === "products") setProductsOpen(true);
                if (link.id === "services") setServicesOpen(true);
              }}
              onMouseLeave={() => {
                if (link.id === "blog") setBlogOpen(false);
                if (link.id === "products") setProductsOpen(false);
                if (link.id === "services") setServicesOpen(false);
              }}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) => {
                  const childIsActive = link.subLinks && isChildActive(link.subLinks);
                  return `flex items-center px-4 py-2 rounded-lg transition-all ${isActive || childIsActive
                    ? "bg-blue-50 text-blue-600 font-medium shadow-inner"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`;
                }}
              >
                <span>{link.label}</span>
                {link.subLinks && link.subLinks.length > 0 && (
                  <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform" />
                )}
              </NavLink>

              {link.id === "products" && productsOpen && link.subLinks && link.subLinks.length > 0 && (
                <div className="absolute left-0 top-full mt-1 bg-white shadow-xl rounded-lg py-2 z-50 min-w-[300px] border border-gray-100">
                  {link.subLinks.map((sub) => (
                    <div key={sub.path} className="group/item relative">
                      <NavLink
                        to={sub.path}
                        className={({ isActive }) => {
                          const childIsActive = sub.subLinks && isChildActive(sub.subLinks);
                          return `flex items-center justify-between px-4 py-3 mx-2 rounded-md transition-all ${isActive || childIsActive
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                            }`;
                        }}
                      >
                        <span>{sub.label}</span>
                        {sub.subLinks && sub.subLinks.length > 0 && (
                          <ChevronDown size={14} className="ml-2 -rotate-90" />
                        )}
                      </NavLink>

                      {sub.subLinks && sub.subLinks.length > 0 && (
                        <div className="absolute left-full top-0 ml-1 bg-white shadow-xl rounded-lg py-2 min-w-[280px] border border-gray-100 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200">
                          {sub.subLinks.map(subSub => (
                            <NavLink
                              key={subSub.path}
                              to={subSub.path}
                              className={({ isActive }) => {
                                const childIsActive = subSub.subLinks && isChildActive(subSub.subLinks);
                                return `block px-4 py-3 mx-2 rounded-md text-sm transition-all ${isActive || childIsActive ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                  }`;
                              }}
                            >
                              {subSub.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {link.id === "services" && servicesOpen && link.subLinks && link.subLinks.length > 0 && (
                <div className="absolute left-0 top-full mt-1 bg-white shadow-xl rounded-lg py-2 z-50 min-w-[300px] border border-gray-100">
                  {link.subLinks.map((sub) => (
                    <div key={sub.path} className="group/item relative">
                      <NavLink
                        to={sub.path}
                        className={({ isActive }) => {
                          const childIsActive = sub.subLinks && isChildActive(sub.subLinks);
                          return `flex items-center justify-between px-4 py-3 mx-2 rounded-md transition-all ${isActive || childIsActive
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                            }`;
                        }}
                      >
                        <span>{sub.label}</span>
                        {sub.subLinks && sub.subLinks.length > 0 && (
                          <ChevronDown size={14} className="ml-2 -rotate-90" />
                        )}
                      </NavLink>

                      {sub.subLinks && sub.subLinks.length > 0 && (
                        <div className="absolute left-full top-0 ml-1 bg-white shadow-xl rounded-lg py-2 min-w-[280px] border border-gray-100 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200">
                          {sub.subLinks.map((subSub) => (
                            <NavLink
                              key={subSub.path}
                              to={subSub.path}
                              className={({ isActive }) => {
                                const childIsActive = subSub.subLinks && isChildActive(subSub.subLinks);
                                return `block px-4 py-3 mx-2 rounded-md text-sm transition-all ${isActive || childIsActive
                                  ? "bg-blue-100 text-blue-600 font-medium"
                                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                  }`;
                              }}
                            >
                              {subSub.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {link.id === "blog" && blogOpen && link.subLinks && (
                <div className="absolute left-0 top-full mt-1 bg-white shadow-xl rounded-lg py-2 z-50 min-w-[220px] border border-gray-100">
                  {link.subLinks.map((sub) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      className={({ isActive }) =>
                        `block px-4 py-3 mx-2 rounded-md transition-all ${isActive
                          ? "bg-blue-100 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-xl">
          {navLinks.map((link) => (
            <div key={link.path} className="border-b border-gray-100">
              {link.subLinks && link.subLinks.length > 0 ? (
                <>
                  <button
                    className="w-full text-left px-6 py-4 flex justify-between items-center text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    onClick={() => {
                      if (link.id === "blog") setBlogOpen(!blogOpen);
                      if (link.id === "products") setProductsOpen(!productsOpen);
                      if (link.id === "services") setServicesOpen(!servicesOpen);
                    }}
                  >
                    <span className="font-medium">{link.label}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${(link.id === "blog" && blogOpen) ||
                        (link.id === "products" && productsOpen) ||
                        (link.id === "services" && servicesOpen)
                        ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {((link.id === "blog" && blogOpen) ||
                    (link.id === "products" && productsOpen) ||
                    (link.id === "services" && servicesOpen)) && (
                      <div className="bg-gray-50">
                        {link.subLinks.map((sub) => (
                          <div key={sub.path}>
                            <NavLink
                              to={sub.path}
                              className={({ isActive }) =>
                                `block px-8 py-3 transition-all ${isActive
                                  ? "bg-blue-100 text-blue-600 font-medium"
                                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                }`
                              }
                              onClick={() => setIsOpen(false)}
                            >
                              {sub.label}
                            </NavLink>
                            {sub.subLinks && sub.subLinks.length > 0 && (
                              <div className="bg-gray-100">
                                {sub.subLinks.map((subSub) => (
                                  <NavLink
                                    key={subSub.path}
                                    to={subSub.path}
                                    className={({ isActive }) =>
                                      `block px-12 py-2 text-sm transition-all ${isActive
                                        ? "bg-blue-100 text-blue-600 font-medium"
                                        : "text-gray-600 hover:bg-gray-200 hover:text-blue-600"
                                      }`
                                    }
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subSub.label}
                                  </NavLink>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                </>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-6 py-4 transition-all ${isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;