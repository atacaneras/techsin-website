import express from "express";
import cors from "cors";
import path from "path";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import blogRoutes from "./routes/blog.js";
import authRoutes from "./routes/auth.js";
import protectedRoutes from "./routes/protected.js";
import uploadRoutes from "./routes/upload.js";

// Config
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

// Enhanced CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'], // Add your frontend URLs
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`);
  if (req.method === 'POST' && req.path.includes('upload')) {
    console.log('📁 Upload request detected');
  }
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "atacaneras@gmail.com", // your Gmail
    pass: "aeka atpo lghj rrby",  // app password
  },
});

// Contact Form Endpoint
app.post("/api/contact", async (req, res) => {
  const { isim, eposta, telefon, sehir, sirket, mesaj } = req.body;

  if (!isim || !eposta || !mesaj) {
    return res.status(400).json({ message: "Lütfen isim, eposta ve mesajı doldurun." });
  }

  const mailOptions = {
    from: eposta,
    to: "info@techsin.com.tr",
    subject: `Yeni iletişim formu mesajı - ${isim}`,
    text: `
      İsim: ${isim}
      E-posta: ${eposta}
      Telefon: ${telefon || "-"}
      Şehir: ${sehir || "-"}
      Şirket: ${sirket || "-"}
      Mesaj:
      ${mesaj}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Mesajınız başarıyla gönderildi." });
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    res.status(500).json({ message: "Mesaj gönderilirken hata oluştu." });
  }
});

app.use("/api/blog", blogRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use("/logos", express.static(path.join(__dirname, "public/logos")));
app.use("/news", express.static(path.join(__dirname, "public/news")));
app.use("/services", express.static(path.join(__dirname, "public/services")));
app.use("/products", express.static(path.join(__dirname, "public/products")));
app.use("/blog", express.static(path.join(__dirname, "public/blog")));

// Logos and References
const BASE_URL = `http://localhost:${port}`;

// Update your backend logos array to include both languages:
const logos = [
  {
    logoUrl: "/logos/ata.jpg",
    quote: {
      TR: `ATA Holding birçok alanda faaliyet gösteren bir şirketler topluluğu; özellikle finansal konularda rekabetçi yapımız çerçevesinde çok önemli olduğuna inandığımız veri/bilgi güvenliği hususunda bir bilişim ortağına ihtiyaç duyduk ve TechSİN ile bu noktada tanıştık. İhtiyacımız olan güvenlik açıklarının tespiti ve sızma testlerinin gerçekleştirilmesi konularında TechSİN'in uzman kadrosuna ve bilgi birikimine güvendik. 2014 ve 2015 yılları için şirketimizin "Bilgi Güvenliği, Sızma Testleri ve Raporlanması" işinin ortağı TechSİN'e bizi güvende hissettirdiği için teşekkür ediyoruz.`,
      EN: `ATA Holding is a group of companies operating in many fields; especially in financial matters, within the framework of our competitive structure, we needed an IT partner regarding data/information security, which we believe is very important, and we met TechSİN at this point. We trusted TechSİN's expert staff and knowledge in identifying the security vulnerabilities we needed and conducting penetration tests. We thank TechSİN, our partner for our company's "Information Security, Penetration Testing and Reporting" business for 2014 and 2015, for making us feel secure.`
    },
    company: {
      TR: "ATA Finans Grubu",
      EN: "ATA Finance Group"
    },
    title: {
      TR: "Artık güvenlik endişesi yaşamayacağız!",
      EN: "We will no longer have security concerns!"
    },
  },
  {
    logoUrl: "/logos/assistt.png",
    quote: {
      TR: `Tüm Oracle veritabanı yönetim işlerimizi TechSiN Bilişim Çözümleri'nden destek alarak gerçekleştiriyoruz. Oracle veritabanları konusundaki tecrübelerini bize aktarıp, ilgili uygulamalarımızın kesintisiz bir şekilde hizmet sunmasını sağlayan TechSiN'e tüm hizmetleri için teşekkür ederiz...`,
      EN: `We carry out all our Oracle database management operations with support from TechSiN Information Solutions. We thank TechSiN for all their services, who share their experience in Oracle databases with us and ensure that our related applications provide uninterrupted service...`
    },
    company: {
      TR: "AssisTT",
      EN: "AssisTT"
    },
    title: {
      TR: "Veritabanı Çözümleri ve Desteği TechSİN'den...",
      EN: "Database Solutions and Support from TechSİN..."
    },
  },
  {
    logoUrl: "/logos/aegon.jpg",
    quote: {
      TR: `Satış ekibimiz için uzun zamandır gerek motivasyonlarını arttırmaya yönelik gerekse rakiplerimizden farklılaşmak amacıyla yapabileceklerimizi görüşüyor, teknolojiyi bu alanda nasıl kullanabileceğimizi araştırıyorduk. Burada TechSiN devreye girdi; profesyonel ve çözüm odaklı yaklaşımı, hızlı projelendirme, uygun bütçeleme ve anahtar teslimiyle bugün bizi rakiplerimizden farklı bir noktaya taşıyan ve satış gücümüzün motivasyonunu maksimize eden "Prim-Komisyon Yazılımı" ile çalışıyoruz.
Aegon Ailesi olarak, TechSiN ile birlikte gerçekleştirdiğimiz bir başka proje ise Bireysel Emeklilik ve Hayat Sigortacılığı sektöründe bir ilk olarak kabul edilebilecek olan, internetten birikimli ve birikimsiz hayat sigortası satış sitesi projesi. Aegon Direkt olarak isimlendirdiğimiz web sitemizin tüm entegrasyon, algoritmik arka plan yazılım ve kodlamaları TechSiN tarafından gerçekleştirilmiştir.
İleriye dönük olarak başka projelerde de birlikte olacağımıza inandığımız TechSiN ve ekibine teşekkür ederiz.`,
      EN: `For our sales team, we have been discussing what we can do both to increase their motivation and to differentiate ourselves from our competitors for a long time, researching how we can use technology in this field. This is where TechSiN came into play; we work with the "Premium-Commission Software" that takes us to a different point from our competitors today and maximizes the motivation of our sales force with its professional and solution-oriented approach, fast project planning, appropriate budgeting and turnkey delivery.
As the Aegon Family, another project we carried out together with TechSiN is the online cumulative and non-cumulative life insurance sales site project, which can be considered a first in the Individual Pension and Life Insurance sector. All integration, algorithmic background software and coding of our website, which we call Aegon Direct, was carried out by TechSiN.
We thank TechSiN and its team, who we believe we will work together on other projects in the future.`
    },
    company: {
      TR: "AEGON Emeklilik ve Hayat A.Ş.",
      EN: "AEGON Pension and Life Inc."
    },
    title: {
      TR: "TechSİN ile inovatif çözümler sağladık.",
      EN: "We provided innovative solutions with TechSİN."
    },
  },
];

const references = [
  { logoUrl: `${BASE_URL}/logos/ak-sigorta.jpg`, company: "AK Sigorta" },
  { logoUrl: `${BASE_URL}/logos/assistt.png`, company: "AssisTT" },
  { logoUrl: `${BASE_URL}/logos/arvato.jpg`, company: "Arvato" },
  { logoUrl: `${BASE_URL}/logos/ata.jpg`, company: "ATA Finans Grubu" },
  { logoUrl: `${BASE_URL}/logos/bulutistan.png`, company: "Bulutistan" },
  { logoUrl: `${BASE_URL}/logos/dehatech.png`, company: "Dehatech" },
  { logoUrl: `${BASE_URL}/logos/Deik.jpg`, company: "DEİK" },
  { logoUrl: `${BASE_URL}/logos/deka.png`, company: "Deka" },
  { logoUrl: `${BASE_URL}/logos/dunya-varlik.png`, company: "Dünya Varlık" },
  { logoUrl: `${BASE_URL}/logos/InterPartnerAssistance.jpg`, company: "Inter Partner Assistance" },
  { logoUrl: `${BASE_URL}/logos/kardokmak.png`, company: "Kardokmak" },
  { logoUrl: `${BASE_URL}/logos/kora.png`, company: "Kora" },
  { logoUrl: `${BASE_URL}/logos/kron.png`, company: "Kron" },
  { logoUrl: `${BASE_URL}/logos/Marmara-Uzmanlar.jpg`, company: "Marmara Uzmanlar" },
  { logoUrl: `${BASE_URL}/logos/netmarble-turkey.png`, company: "Netmarble Turkey" },
  { logoUrl: `${BASE_URL}/logos/Prometeia.jpg`, company: "Prometeia" },
  { logoUrl: `${BASE_URL}/logos/tubitak.jpg`, company: "TÜBİTAK" },
  { logoUrl: `${BASE_URL}/logos/turk-telekom.png`, company: "Türk Telekom" },
  { logoUrl: `${BASE_URL}/logos/Taaleri.jpg`, company: "Taaleri" },
  { logoUrl: `${BASE_URL}/logos/Tradesoft.jpg`, company: "Tradesoft" },
  { logoUrl: `${BASE_URL}/logos/veribox.png`, company: "Veribox" },
  { logoUrl: `${BASE_URL}/logos/viennalife.png`, company: "Vienna Life" },
];

const company = { logoUrl: `${BASE_URL}/logos/techsin.png`, company: "Techsin" };

const partners = [
  { logoUrl: `${BASE_URL}/logos/Arena.png` },
  { logoUrl: `${BASE_URL}/logos/Beinformed.png` },
  { logoUrl: `${BASE_URL}/logos/Emakin.png` },
  { logoUrl: `${BASE_URL}/logos/EMC.png` },
  { logoUrl: `${BASE_URL}/logos/Idera.png` },
  { logoUrl: `${BASE_URL}/logos/Oracle.png` },
  { logoUrl: `${BASE_URL}/logos/penta.png` },
  { logoUrl: `${BASE_URL}/logos/Zti.png` },
];

const news = [
  { logoUrl: `${BASE_URL}/news/1.png` },
  { logoUrl: `${BASE_URL}/news/2.png` },
  { logoUrl: `${BASE_URL}/news/3.png` },
  { logoUrl: `${BASE_URL}/news/4.jpg` },
  { logoUrl: `${BASE_URL}/news/5.jpg` },
  { logoUrl: `${BASE_URL}/news/6.jpg` },
];

const services = [
  { logoUrl: `${BASE_URL}/services/1.jpg` },
  { logoUrl: `${BASE_URL}/services/2.jpg` },
  { logoUrl: `${BASE_URL}/services/3.jpg` },
  { logoUrl: `${BASE_URL}/services/4.jpg` },
  { logoUrl: `${BASE_URL}/services/5.jpg` },
  { logoUrl: `${BASE_URL}/services/6.jpg` },
  { logoUrl: `${BASE_URL}/services/7.jpg` },
  { logoUrl: `${BASE_URL}/services/8.jpg` },
  { logoUrl: `${BASE_URL}/services/Beinformed-2.png` },
  { logoUrl: `${BASE_URL}/services/Emakin-2.png` },
];

const products = [
  { logoUrl: `${BASE_URL}/products/1.jpg` },
  { logoUrl: `${BASE_URL}/products/2.jpg` },
  { logoUrl: `${BASE_URL}/products/3.png` },
  { logoUrl: `${BASE_URL}/products/4.jpg` },
  { logoUrl: `${BASE_URL}/products/5.jpg` },
  { logoUrl: `${BASE_URL}/products/6.jpg` },
  { logoUrl: `${BASE_URL}/products/7.jpg` },
  { logoUrl: `${BASE_URL}/products/8.png` },
  { logoUrl: `${BASE_URL}/products/9.jpg` },
];

const blog = [
  { logoUrl: `${BASE_URL}/blog/1.png` },
  { logoUrl: `${BASE_URL}/blog/2.png` },
  { logoUrl: `${BASE_URL}/blog/3.png` },
  { logoUrl: `${BASE_URL}/blog/4.png` },
  { logoUrl: `${BASE_URL}/blog/5.png` },
  { logoUrl: `${BASE_URL}/blog/6.jpg` },
  { logoUrl: `${BASE_URL}/blog/7.png` },
  { logoUrl: `${BASE_URL}/blog/8.png` },
  { logoUrl: `${BASE_URL}/blog/9.png` },
  { logoUrl: `${BASE_URL}/blog/10.png` },
];

app.get("/api/company", (req, res) => res.json(company));
app.get("/api/logos", (req, res) => {
  const lang = req.query.lang || 'TR';
  
  const localizedLogos = logos.map(logo => ({
    logoUrl: logo.logoUrl,
    quote: typeof logo.quote === 'object' ? logo.quote[lang] || logo.quote.TR : logo.quote,
    company: typeof logo.company === 'object' ? logo.company[lang] || logo.company.TR : logo.company,
    title: typeof logo.title === 'object' ? logo.title[lang] || logo.title.TR : logo.title,
  }));
  
  res.json(localizedLogos);
});
app.get("/api/references", (req, res) => res.json(references));
app.get("/api/partners", (req, res) => res.json(partners));
app.get("/api/news", (req, res) => res.json(news));
app.get("/api/services", (req, res) => res.json(services));
app.get("/api/products", (req, res) => res.json(products));
app.get("/api/blog-images", (req, res) => res.json(blog));

// Routes - order matters!
console.log("🔧 Mounting routes...");

// Upload routes - MUST come before blog routes since it has /api prefix
app.use("/api/upload", uploadRoutes);

// Auth routes
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api", protectedRoutes);

// Blog routes
app.use("/api/blog", blogRoutes);

console.log("✅ All routes mounted");

// Catch-all 404 handler
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: "Route not found",
    method: req.method,
    url: req.originalUrl,
    availableRoutes: [
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/admin-data",
      "POST /api/contact",
      "POST /api/upload",
      "GET /api/company",
      "GET /api/logos",
      "GET /api/references",
      "GET /api/partners",
      "GET /api/news",
      "GET /api/services",
      "GET /api/products",
    ]
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📋 Available routes:`);
  console.log(`   POST http://localhost:${port}/api/auth/register`);
  console.log(`   POST http://localhost:${port}/api/auth/login`);
  console.log(`   POST http://localhost:${port}/api/upload`);
  console.log(`   GET  http://localhost:${port}/api/admin-data`);
});