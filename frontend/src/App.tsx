import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BizeUlasin from "./pages/BizeUlasin";
import Kariyer from "./pages/Kariyer";
import Kurumsal from "./pages/Kurumsal";
import Referanslar from "./pages/Referanslar";
import Blog from "./pages/Blog/Blog";
import AdminBlog from "./pages/AdminBlog";
import NewsDetail from "./pages/NewsDetail";
import Kvkk from "./pages/Kvkk";
import Urunlerimiz from "./pages/Urunlerimiz/Urunlerimiz";
import ProductDetail from "./pages/Urunlerimiz/ProductDetail";
import SubProductDetail from "./pages/Urunlerimiz/SubProductDetail";
import Hizmetlerimiz from "./pages/Hizmetlerimiz/Hizmetlerimiz";
import ServiceDetail from "./pages/Hizmetlerimiz/ServiceDetail";
import TechnicalSolutions from "./pages/Blog/TechnicalSolutions";
import TechnicalSolutionsDetail from "./pages/Blog/TechnicalSolutionsDetail";
import Articles from "./pages/Blog/Articles";
import ArticlesDetail from "./pages/Blog/ArticlesDetail";
import NavbarOnlyLayout from "./components/NavbarOnlyLayout";

function App() {
  return (
    <Routes>
      {/* Turkish routes */}
      <Route path="/admin" element={<NavbarOnlyLayout />}>
        <Route index element={<AdminBlog />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="kurumsal" element={<Kurumsal />} />
        <Route path="/hizmetlerimiz" element={<Hizmetlerimiz />} />
        <Route path="/urunlerimiz" element={<Urunlerimiz />} />
        <Route path="kariyer" element={<Kariyer />} />
        <Route path="referanslar" element={<Referanslar />} />
        <Route path="bizeulasin" element={<BizeUlasin />} />
        <Route path="kvkk" element={<Kvkk />} />
        <Route path="haberler/:slug" element={<NewsDetail />} />
        <Route path="blog" element={<Blog />} />

        <Route path="urunlerimiz/:parentSlug/:subSlug" element={<SubProductDetail />} />
        <Route path="urunlerimiz/:slug" element={<ProductDetail />} />

        <Route path="hizmetlerimiz/:slug" element={<ServiceDetail />} />
        <Route path="/teknik-cozumler" element={<TechnicalSolutions />} />
        <Route path="teknik-cozumler/:slug" element={<TechnicalSolutionsDetail />} />
        <Route path="/makaleler" element={<Articles />} />
        <Route path="makeler/:slug" element={<ArticlesDetail />} />
      </Route>

      {/* English routes */}
      <Route path="/en" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="corporate" element={<Kurumsal />} />
        <Route path="career" element={<Kariyer />} />
        <Route path="references" element={<Referanslar />} />
        <Route path="contact" element={<BizeUlasin />} />
        <Route path="kvkk" element={<Kvkk />} />
        <Route path="news/:slug" element={<NewsDetail />} />
        <Route path="blog" element={<Blog />} />
        <Route path="technical-solutions" element={<TechnicalSolutions />} />
        <Route path="technical-solutions/:slug" element={<TechnicalSolutionsDetail />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:slug" element={<ArticlesDetail />} />
        <Route path="our-services" element={<Hizmetlerimiz />} />
        <Route path="our-services/:slug" element={<ServiceDetail />} />
        <Route path="our-products" element={<Urunlerimiz />} />

        <Route path="our-products/:parentSlug/:subSlug" element={<SubProductDetail />} />
        <Route path="our-products/:slug" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;