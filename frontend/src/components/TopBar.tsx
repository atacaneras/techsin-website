import React, { useState } from 'react';
import {
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
  FaFacebookF, FaLinkedinIn, FaTwitter, FaChevronDown
} from 'react-icons/fa';
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const TopBar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => setShowMobileMenu(prev => !prev);

  return (
    <div className="bg-gray-800 text-white text-sm w-full">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-gray-400" />
                <span>{t("address")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-gray-400" />
                <span>{t("phone")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <span>{t("email")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-gray-400" />
                <span>{t("hours")}</span>
              </div>
            </div>

            {/* Language & Social */}
            <div className="flex items-center space-x-4">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setLanguage(language === "TR" ? "EN" : "TR")}
              >
                <span>{language}</span>
                <FaChevronDown className="ml-1 text-xs" />
              </div>
              <div className="flex space-x-3">
                <a href="https://www.facebook.com/TechSiNSolutions/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaFacebookF />
                </a>
                <a href="https://www.linkedin.com/company/3612340/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedinIn />
                </a>
                <a href="https://x.com/TechsinSolution" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-4">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setLanguage(language === "TR" ? "EN" : "TR")}
              >
                <span>{language}</span>
                <FaChevronDown className="ml-1 text-xs" />
              </div>
              <div className="flex space-x-3">
                <a href="https://www.facebook.com/TechSiNSolutions/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaFacebookF />
                </a>
                <a href="https://www.linkedin.com/company/3612340/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedinIn />
                </a>
                <a href="https://x.com/TechsinSolution" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {showMobileMenu && (
            <div className="mt-2 pb-2 space-y-3">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-gray-400" />
                <span>{t("address")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-gray-400" />
                <span>{t("phone")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <span>{t("email")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-gray-400" />
                <span>{t("hours")}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
