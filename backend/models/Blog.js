import mongoose from "mongoose";

// Define subProduct schema
const subProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  excerpt: { type: String },
  category: { type: String },
  features: [String],
  content: { type: String }
}, { _id: false }); // _id: false prevents automatic _id generation for subdocuments

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  slugTR: { type: String, trim: true },
  slugEN: { type: String, trim: true },
  category: {
    type: String,
    required: true,
    enum: [
      "makaleler",
      "teknik-cozumler",
      "haberler",
      "urunlerimiz",
      "hizmetlerimiz",
      "news",
      "our-services",
      "our-products",
      "articles",
      "technical-solutions"
    ],
    default: "makaleler"
  },
  content: { type: String, required: true },
  excerpt: { type: String },
  image: { type: String },
  features: [String],
  subProducts: [subProductSchema],
  publishDate: {
    type: Date,
    required: function () { return this.category === 'haberler'; }
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);