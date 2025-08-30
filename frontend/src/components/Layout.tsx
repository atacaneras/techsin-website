import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ContactForm from "./ContactForm";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      {/* Separate fixed containers for TopBar and Navbar */}
      <div className="fixed top-0 w-full z-50">
        <TopBar />
      </div>
      <div className="fixed top-10 w-full z-40"> {/* top = TopBar height */}
        <Navbar />
      </div>

      <div className="pt-28 max-w-7xl mx-auto px-4 min-h-screen flex gap-8">
        <main className="flex-1">
          <Outlet />
          <div className="mt-12 lg:hidden">
            <ContactForm />
            <Sidebar />
          </div>
        </main>

        <aside className="w-[350px] sticky top-[112px] self-start hidden lg:block space-y-12">
          <ContactForm />
          <Sidebar />
        </aside>
      </div>

      <Footer />
    </>
  );
};

export default Layout;