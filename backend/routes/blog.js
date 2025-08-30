import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Blog from "../models/Blog.js";

const router = express.Router();

// Get all blog posts (public) - supports category filtering
router.get("/", async (req, res) => {
  try {
    const { category, lang } = req.query;
    let filter = {};

if (category) {
  const categoryMap = {
    haberler: { tr: "haberler", en: "news" },
    urunlerimiz: { tr: "urunlerimiz", en: "our-products" },
    hizmetlerimiz: { tr: "hizmetlerimiz", en: "our-services" },
    makaleler: { tr: "makaleler", en: "articles" },
    "teknik-cozumler": { tr: "teknik-cozumler", en: "technical-solutions" }
  };

  const langKey = lang || "tr";

  if (langKey === "en") {
    // Directly use English category
    filter.category = category;
  } else {
    // Map TR category
    const dbCategoryKey = Object.keys(categoryMap).find(
      key => categoryMap[key]["tr"] === category
    );
    filter.category = dbCategoryKey || category;
  }
}

    const blogs = await Blog.find(filter).sort({ order: 1 });

   const blogsWithExtras = blogs.map((blog) => {
  const blogObj = blog.toObject({ getters: true }); // ensure _id is included
  blogObj._id = blog._id; // explicitly add _id

  if (!blogObj.excerpt || blogObj.excerpt.trim() === "") {
    blogObj.excerpt = blogObj.content
      ? blogObj.content.replace(/<[^>]+>/g, "").slice(0, 150) + "..."
      : "";
  }

  if (!blogObj.image) {
    blogObj.image = `https://api.techsin.com.tr/logos/techsin.png`;
  } else if (!blogObj.image.startsWith("http")) {
    if (["urunlerimiz", "our-products"].includes(blogObj.category)) {
      blogObj.image = `https://api.techsin.com.tr/products/${blogObj.image}`;
    } else {
      blogObj.image = `https://api.techsin.com.tr/services/${blogObj.image}`;
    }
  }

  return blogObj;
});

    res.json(blogsWithExtras);
  } catch (error) {
    console.error("❌ Error in GET /api/blog:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get single blog post by slug (public)
// Get single blog post by slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const lang = req.query.lang || "tr";

    let blog;

    if (lang.toLowerCase() === "en") {
      // Try fetching exact English slug first
      blog = await Blog.findOne({ slug }).populate("author", "username");
      if (!blog) {
        // fallback: remove -en to fetch TR version if English not found
        const slugWithoutEn = slug.replace(/-en$/, "");
        blog = await Blog.findOne({ slug: slugWithoutEn }).populate("author", "username");
      }
    } else {
      // Turkish
      blog = await Blog.findOne({ slug }).populate("author", "username");
    }

    if (!blog) return res.status(404).json({ message: "Content not found" });

    res.json(blog);
  } catch (error) {
    console.error("❌ Error fetching blog by slug:", error);
    res.status(500).json({ error: error.message });
  }
});

// Fixed products list route - now includes order field and proper sorting
router.get('/products/list', async (req, res) => {
  try {
    const products = await Blog.find({ category: 'urunlerimiz' })
      .select('title slug subProducts order _id') // Added 'order' field to selection
      .sort({ order: 1 }); // Sort by order field ascending

    // Transform the data to include subProducts properly
    const transformedProducts = products.map(product => {
      const productObj = product.toObject();

      console.log('🔍 Product subProducts check:', {
        title: productObj.title,
        slug: productObj.slug,
        order: productObj.order, // Log order field
        subProductsExists: !!productObj.subProducts,
        subProductsLength: productObj.subProducts?.length || 0,
        subProducts: productObj.subProducts
      });

      return {
        title: productObj.title,
        slug: productObj.slug,
        order: productObj.order, // Include order in response
        subProducts: productObj.subProducts || [] // Ensure subProducts is always an array
      };
    });

    console.log('📦 Final transformed products:', JSON.stringify(transformedProducts, null, 2));

    res.json(transformedProducts);
  } catch (error) {
    console.error('Error fetching products list:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fixed services list route - now includes order field and proper sorting
router.get("/services/list", async (req, res) => {
  try {
    const services = await Blog.find({ category: "hizmetlerimiz" })
      .select("title slug order -_id") // Added 'order' field to selection
      .sort({ order: 1 }); // Sort by order field ascending
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new blog post (protected)
// Create new blog post (protected)
router.post("/create", protect, async (req, res) => {
  console.log("✅ Creating new content", req.body);
  try {
    const { title, slug, category, content, publishDate } = req.body;

    // Corrected line: Include products and services categories
    const validCategories = [
      "makaleler", "teknik-cozumler", "haberler",
      "urunlerimiz", "hizmetlerimiz",
      "articles", "technical-solutions", "news",
      "our-products", "our-services"
    ];

    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    const blog = new Blog({
      title,
      slug,
      category,
      content,
      author: req.user.id,
      publishDate: category === 'haberler' ? new Date(publishDate) : undefined
    });

    await blog.save();

    const categoryNames = {
      'makaleler': 'Blog post',
      'teknik-cozumler': 'Technical solution',
      'haberler': 'News article',
      'urunlerimiz': 'Product page', // Added for products
      'hizmetlerimiz': 'Service page' // Added for services
    };

    console.log(`✅ ${categoryNames[category]} created successfully:`, title);
    res.status(201).json({
      message: `${categoryNames[category]} created successfully`,
      blog
    });
  } catch (error) {
    console.error("❌ Error creating content:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update blog post (protected)
router.put("/:id", protect, async (req, res) => {
  try {
    const { title, slug, category, content, publishDate } = req.body;

    // You should also validate the category on update
    const validCategories = ["makaleler", "teknik-cozumler", "haberler", "urunlerimiz", "hizmetlerimiz"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const updateData = {
      title,
      slug,
      category,
      content,
      $currentDate: { updatedAt: true }
    };

    // Only update publishDate for news articles
    if (category === 'haberler' && publishDate) {
      updateData.publishDate = new Date(publishDate);
    } else if (category !== 'haberler') {
      updateData.publishDate = undefined; // Ensure publishDate is removed for other categories
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json({ message: "Content updated successfully", blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete blog post (protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Content not found" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get latest news for homepage (public)
router.get("/latest/news", async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    const news = await Blog.find({ category: "haberler" })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('author', 'username');
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;