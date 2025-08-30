import React, { useState, useEffect, FormEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


interface LoginForm {
  username: string;
  password: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  publishDate?: string;
  language?: "tr" | "en";
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"]
  ]
};

const categories = [
  { key: "haberler", label: "News" },
  { key: "makaleler", label: "Articles" },
  { key: "teknik-cozumler", label: "Technical Solutions" },
  { key: "urunlerimiz", label: "Products" },
  { key: "hizmetlerimiz", label: "Services" },
];

export default function AdminBlog() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState<Partial<Blog>>({});
  const [loadingContent, setLoadingContent] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("haberler");

  const [language, setLanguage] = useState<"tr" | "en">("tr");
  const [listLanguage, setListLanguage] = useState<"tr" | "en">("tr");


  const categoryMap: Record<string, { tr: string; en: string }> = {
    haberler: { tr: "haberler", en: "news" },
    makaleler: { tr: "makaleler", en: "articles" },
    "teknik-cozumler": { tr: "teknik-cozumler", en: "technical-solutions" },
    urunlerimiz: { tr: "urunlerimiz", en: "our-products" },
    hizmetlerimiz: { tr: "hizmetlerimiz", en: "our-services" },
  };

  // Fetch blogs from backend
  const fetchBlogs = async () => {
    if (!token) return;
    setLoadingContent(true);
    try {
      const categoryKey =
        language === "en" ? categoryMap[activeCategory].en : categoryMap[activeCategory].tr;

      const res = await fetch(`https://api.techsin.com.tr/api/blog?category=${categoryKey}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch content");
    }
    setLoadingContent(false);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchBlogs();
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchBlogs();
    }
  }, [token, language, activeCategory]);

  // Login handler
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("https://api.techsin.com.tr/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setIsLoggedIn(true);
        localStorage.setItem("adminToken", data.token);
        setMessage("Login successful!");
        setLoginForm({ username: "", password: "" });
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("adminToken");
    setMessage("Logged out successfully");
  };

  // Select a blog for edit
  const handleSelectBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setFormData(blog);
  };

  // Delete blog
  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!window.confirm("Are you sure you want to delete this content?")) return;
    try {
      const res = await fetch(`https://api.techsin.com.tr/api/blog/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessage(data.message);
      fetchBlogs();
      setSelectedBlog(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete content");
    }
  };

  // Save blog (create or update)
  const handleSave = async () => {
    if (!token) return;

    const payload = { ...formData };

    // Use the blog's own language for slug prefix
    if (formData.language === "en" && !payload.slug?.startsWith("en-")) {
      payload.slug = "en-" + payload.slug;
    }

    const url = selectedBlog
      ? `https://api.techsin.com.tr/api/blog/${selectedBlog._id}`
      : `https://api.techsin.com.tr/api/blog/create`;
    const method = selectedBlog ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setMessage(data.message || "Saved successfully");
      fetchBlogs();
      setSelectedBlog(null);
      setFormData({});
    } catch (err) {
      console.error(err);
      setMessage("Failed to save content");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          {message && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{message}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              value={loginForm.username}
              placeholder="Username"
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="password"
              value={loginForm.password}
              placeholder="Password"
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full p-3 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredBlogs = blogs;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {message && <div className="mb-4 p-3 rounded bg-green-100 text-green-700">{message}</div>}

        {/* Global Language Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded ${language === "tr" ? "bg-blue-600 text-white" : "bg-white border"}`}
            onClick={() => setLanguage("tr")}
          >
            Turkish
          </button>
          <button
            className={`px-3 py-1 rounded ${language === "en" ? "bg-blue-600 text-white" : "bg-white border"}`}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setSelectedBlog(null);
                setFormData({});
              }}
              className={`px-4 py-2 rounded font-semibold ${activeCategory === cat.key ? "bg-blue-600 text-white" : "bg-white border"
                }`}
            >
              {language === "tr" ? categoryMap[cat.key].tr : categoryMap[cat.key].en}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
  {/* Content List */}
  <div className="w-1/3 bg-white p-4 rounded-lg shadow-md overflow-y-auto max-h-[70vh]">
    <h2 className="font-semibold mb-4 text-lg">{categories.find(c => c.key === activeCategory)?.label}</h2>
    {loadingContent ? (
      <p>Loading...</p>
    ) : filteredBlogs.length === 0 ? (
      <p className="text-gray-500">No content</p>
    ) : (
      filteredBlogs.map((blog) => (
        <div
          key={blog._id}
          className="p-3 border-b cursor-pointer hover:bg-gray-50 rounded-md transition"
          onClick={() => handleSelectBlog(blog)}
        >
          <p className="font-semibold">{blog.title}</p>
          {blog.publishDate && <p className="text-sm text-gray-500">{blog.publishDate.slice(0, 10)}</p>}
          <p className="text-xs text-gray-400">Language: {blog.language?.toUpperCase()}</p>
        </div>
      ))
    )}
  </div>

        {/* Content Editor */}
  <div className="flex-1 bg-white p-6 rounded-lg shadow-md flex flex-col">
    <h2 className="font-semibold mb-4 text-xl">{selectedBlog ? "Edit Content" : "Add New Content"}</h2>
    {/* Editor inputs */}
    <div className="flex gap-2 mb-3">
      <label className="font-semibold">Content Language:</label>
      <button
        type="button"
        className={`px-3 py-1 rounded ${formData.language === "tr" ? "bg-blue-600 text-white shadow-md" : "bg-white border"}`}
        onClick={() => setFormData({ ...formData, language: "tr" })}
      >
        TR
      </button>
      <button
        type="button"
        className={`px-3 py-1 rounded ${formData.language === "en" ? "bg-blue-600 text-white shadow-md" : "bg-white border"}`}
        onClick={() => setFormData({ ...formData, language: "en" })}
      >
        EN
      </button>
    </div>

    <input
      type="text"
      placeholder="Title"
      value={formData.title || ""}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      className="w-full mb-3 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      placeholder="Slug"
      value={formData.slug || ""}
      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
      className="w-full mb-3 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <select
  value={formData.category || activeCategory}
  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
  className="w-full mb-3 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  {categories.map((cat) => (
    <option key={cat.key} value={cat.key}> {/* Always send DB key */}
      {language === "tr" ? categoryMap[cat.key].tr : categoryMap[cat.key].en}
    </option>
  ))}
</select>

    {formData.category === "haberler" && (
      <input
        type="date"
        value={formData.publishDate?.slice(0, 10) || ""}
        onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
        className="w-full mb-3 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}

    <div className="flex-1 mb-3">
      <ReactQuill
        theme="snow"
        value={formData.content || ""}
        onChange={(value) => setFormData({ ...formData, content: value })}
        modules={quillModules}
        className="h-[500px] rounded-md shadow-sm"
      />
    </div>

    <div className="flex gap-4 mt-auto">
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition shadow-md"
      >
        {selectedBlog ? "Update" : "Create"}
      </button>
      {selectedBlog && (
        <button
          onClick={() => selectedBlog && handleDelete(selectedBlog._id)}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition shadow-md"
        >
          Delete
        </button>
      )}
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
