import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Building, MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface FormFields {
  name: string;
  email: string;
  phone: string;
  city: string;
  company: string;
  message: string;
}

const ContactForm = () => {
  const { t } = useLanguage();

  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    phone: "",
    city: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert(`${t("error")}: ${t("name")}, ${t("emailLabel")}, ${t("message")}`);
      return;
    }

    try {
      const response = await fetch("https://api.techsin.com.tr/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert(t("send") + " ✅");
        setForm({
          name: "",
          email: "",
          phone: "",
          city: "",
          company: "",
          message: "",
        });
      } else {
        const data = await response.json();
        alert(t("error") + ": " + (data.message || "Try again."));
      }
    } catch (error) {
      alert(t("error") + ": Server error.");
    }
  };

  const handleClear = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      city: "",
      company: "",
      message: "",
    });
  };

  const InputWithIcon = ({
    name,
    type,
    placeholder,
    value,
    required = false,
    icon: Icon,
  }: {
    name: keyof FormFields;
    type: string;
    placeholder: string;
    value: string;
    required?: boolean;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }) => (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <Icon
        size={20}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-xl font-medium mb-1">{t("formTitle")}</h2>
      <p className="text-gray-600 text-sm mb-4">{t("formDesc")}</p>

      <InputWithIcon
        name="name"
        type="text"
        placeholder={t("name")}
        value={form.name}
        required
        icon={User}
      />

      <InputWithIcon
        name="email"
        type="email"
        placeholder={t("emailLabel")}
        value={form.email}
        required
        icon={Mail}
      />

      <InputWithIcon
        name="phone"
        type="tel"
        placeholder={t("phoneLabel")}
        value={form.phone}
        icon={Phone}
      />

      <InputWithIcon
        name="city"
        type="text"
        placeholder={t("city")}
        value={form.city}
        icon={MapPin}
      />

      <InputWithIcon
        name="company"
        type="text"
        placeholder={t("company")}
        value={form.company}
        icon={Building}
      />

      <div className="relative">
        <textarea
          name="message"
          placeholder={t("message")}
          value={form.message}
          onChange={handleChange}
          rows={5}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
        />
        <MessageCircle
          size={20}
          className="absolute right-3 top-3 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition"
        >
          {t("clear")}
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {t("send")}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
