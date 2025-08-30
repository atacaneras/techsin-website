import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../models/Blog.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const BASE_API_URL = "http://localhost:4000";
const AUTHOR_ID = "689effab8bfc2e922d776e39";

const news = [
  {
    order: 1,
    slugTR: "tr-devfest-istanbul-2024",
    slugEN: "en-devfest-istanbul-2024",
    titleTR: "Kasım 2024 - Devfest İstanbul 2024 Etkinliğine Katıldık",
    titleEN: "November 2024 - We Participated in Devfest Istanbul 2024",
    excerptTR: "Google Developer Groups (GDG) İstanbul tarafından düzenlenen Devfest İstanbul 2024 etkinliğine katıldık.",
    excerptEN: "We participated in Devfest Istanbul 2024, organized by Google Developer Groups (GDG) Istanbul.",
    image: `${BASE_API_URL}/news/1.png`,
    categoryTR: "haberler",
    categoryEN: "news",
    publishDate: new Date("2024-11-09"),
    contentTR: `
      <div class="my-8">
        <img src="${BASE_API_URL}/news/1.png" class="w-full h-auto mx-auto" />
      </div>
      <p>9 Kasım 2024’te UNIQ İstanbul’da gerçekleştirilen bu etkinlik, Google Developer Groups (GDG) İstanbul tarafından organize edildi. Etkinlikte yapay zeka, yazılım geliştirme ve bulut çözümleri gibi konular ele alındı.</p>
    `,
    contentEN: `
      <div class="my-8">
        <img src="${BASE_API_URL}/news/1.png" class="w-full h-auto mx-auto" />
      </div>
      <p>On November 9, 2024, the event was held at UNIQ Istanbul and organized by Google Developer Groups (GDG) Istanbul. Topics such as artificial intelligence, software development, and cloud solutions were discussed.</p>
    `
  },
  {
    order: 2,
    slugTR: "tr-digital-age-tech-summit-2024",
    slugEN: "en-digital-age-tech-summit-2024",
    titleTR: "Mayıs 2024 – Digital Age Tech Summit 2024 etkinliğine katıldık",
    titleEN: "May 2024 – We Participated in Digital Age Tech Summit 2024",
    excerptTR: "‘Yarının Zekâsı’ temasıyla yapay zeka ve dijital pazarlama konularına odaklanıldı.",
    excerptEN: "The event focused on artificial intelligence and digital marketing under the theme 'The Intelligence of Tomorrow'.",
    image: `${BASE_API_URL}/news/2.png`,
    categoryTR: "haberler",
    categoryEN: "news",
    publishDate: new Date("2024-05-06"),
    contentTR: `
      <div class="my-8">
        <img src="${BASE_API_URL}/news/2.png" class="w-full h-auto mx-auto" />
      </div>
      <p>6 Mayıs 2024’te Divan Kuruçeşme’de gerçekleştirilen etkinlik, ‘Yarının Zekâsı’ temasıyla yapay zeka ve dijital pazarlama konularına odaklanıldı.</p>
    `,
    contentEN: `
      <div class="my-8">
        <img src="${BASE_API_URL}/news/2.png" class="w-full h-auto mx-auto" />
      </div>
      <p>On May 6, 2024, the event was held at Divan Kuruçeşme under the theme 'The Intelligence of Tomorrow', focusing on artificial intelligence and digital marketing.</p>
    `
  },
  {
    order: 3,
    slugTR: "tr-international-technology-software-summit-2024",
    slugEN: "en-international-technology-software-summit-2024",
    titleTR: "Mart 2024 – Uluslararası Teknoloji ve Yazılım Zirvesi’ne katıldık",
    titleEN: "March 2024 – We Participated in the International Technology and Software Summit",
    excerptTR: "TÜYAFED Yazılımcılar Federasyonu tarafından organize edilen zirveye katıldık.",
    excerptEN: "We attended the summit organized by TÜYAFED Software Developers Federation.",
    image: `${BASE_API_URL}/news/3.png`,
    categoryTR: "haberler",
    categoryEN: "news",
    publishDate: new Date("2024-03-02"),
    contentTR: `
      <div class="my-8">
        <img src="${BASE_API_URL}/news/3.png" class="w-full h-auto mx-auto" />
      </div>
      <p>2 Mart 2024’te Elite World Florya’da düzenlenen zirve, TÜYAFED Yazılımcılar Federasyonu tarafından organize edildi. Etkinlikte uluslararası yazılım ve teknoloji firmaları ile bir araya geldik.</p>
    `,
    contentEN: `
      <div class="my-8">
        <img src="${BASE_API_URL}/news/3.png" class="w-full h-auto mx-auto" />
      </div>
      <p>On March 2, 2024, the summit was held at Elite World Florya and organized by the TÜYAFED Software Developers Federation. We met with international software and technology companies at the event.</p>
    `
  },
  {
    order: 4,
    slugTR: "tr-informatics-summit-2023",
    slugEN: "en-informatics-summit-2023",
    titleTR: "Kasım 2023 – Bilişim Zirvesi 2023‘e katıldık",
    titleEN: "November 2023 – We Participated in Informatics Summit 2023",
    excerptTR: "Bilişim teknolojilerinde yaşanan ve yaşanacak gelişmeleri iş dünyasının gündemine taşıyan Bilişim Zirvesine katıldık.",
    excerptEN: "We attended the Informatics Summit, which brings the past and future of IT technologies to the business world agenda.",
    image: `${BASE_API_URL}/news/4.png`,
    categoryTR: "haberler",
    categoryEN: "news",
    publishDate: new Date("2023-11-25"),
    contentTR: `
      <div class="my-8">
        <img src="${BASE_API_URL}/news/4.jpg" class="w-full h-auto mx-auto" />
      </div>
      <p>Bilişim teknolojilerinde yaşanan ve yaşanacak olan gelişmeleri gelenekselden geleceğe uzanan geniş ve zengin bir perspektifle iş dünyasının gündemine taşıyan Bilişim Zirvesine katıldık.</p>
    `,
    contentEN: `
      <div class="my-8">
        <img src="${BASE_API_URL}/news/4.jpg" class="w-full h-auto mx-auto" />
      </div>
      <p>We participated in the Informatics Summit, which brought the developments in IT technologies, both past and future, to the business world with a broad and rich perspective.</p>
    `
  },
{
    order: 5,
    slugTR: "tr-developer-summit-2023",
    slugEN: "en-developer-summit-2023",
    titleTR: "Ekim 2023 – Developer Summit 2023‘e katıldık",
    titleEN: "October 2023 – We Participated in Developer Summit 2023",
    excerptTR: "Türkiye'nin en önemli yazılım geliştirici konferanslarından biri olan Developer Summit‘e katıldık.",
    excerptEN: "We joined Developer Summit, one of Turkey’s most important software developer conferences.",
    image: `${BASE_API_URL}/news/5.png`,
    categoryTR: "haberler",
    categoryEN: "news",
    publishDate: new Date("2023-10-09"),
    contentTR: `
      <div class="my-8">
        <img src="${BASE_API_URL}/news/5.jpg" class="w-full h-auto mx-auto" />
      </div>
      <p>Devnot tarafından organize edilen Türkiye'nin en önemli yazılım geliştirici konferanslarından biri olan Developer Summit‘e katıldık.</p>
    `,
    contentEN: `
      <div class="my-8">
        <img src="${BASE_API_URL}/news/5.jpg" class="w-full h-auto mx-auto" />
      </div>
      <p>Organized by Devnot, Developer Summit is one of Turkey’s most important software developer conferences, and we were excited to be part of it.</p>
    `
  },
{
    order: 6,
    slugTR: "tr-developer-meetups-2023",
    slugEN: "en-developer-meetups-2023",
    titleTR: "Eylül 2023 – Yazılımcı Buluşmaları Etkinliğine katıldık",
    titleEN: "September 2023 – We Participated in Developer Meetups",
    excerptTR: "Sektörden meslektaşlarımızla online buluşma gerçekleştirdik.",
    excerptEN: "We held an online meeting with colleagues from the industry on September 28, 2023.",
    image: `${BASE_API_URL}/news/6.png`,
    categoryTR: "haberler",
    categoryEN: "news",
    publishDate: new Date("2023-09-30"),
    contentTR: `
      <div class="my-8">
        <img src="${BASE_API_URL}/news/6.jpg" class="w-full h-auto mx-auto" />
      </div>
      <p>28 Eylül 2023 tarihinde sektörden meslektaşlarımızla online buluşma gerçekleştirdik.</p>
    `,
    contentEN: `
      <div class="my-8">
        <img src="${BASE_API_URL}/news/6.jpg" class="w-full h-auto mx-auto" />
      </div>
      <p>On September 28, 2023, we held an online meeting with our colleagues from the industry.</p>
    `
  },
];

const seedNews = async () => {
  try {
    await connectDB();
    await Blog.deleteMany({ category: { $in: ["haberler", "news"] } });

const docs = news.flatMap(item => {
  const groupId = new mongoose.Types.ObjectId(); // shared ID for TR+EN version
  return [
    {
      groupId,
      order: item.order,
      title: item.titleTR,
      slug: item.slugTR,
      excerpt: item.excerptTR,
      content: item.contentTR,
      image: item.image,
      category: item.categoryTR,
      publishDate: item.publishDate,
      lang: "tr",
      author: AUTHOR_ID,
    },
    {
      groupId,
      order: item.order,
      title: item.titleEN,
      slug: item.slugEN,
      excerpt: item.excerptEN,
      content: item.contentEN,
      image: item.image,
      category: item.categoryEN,
      publishDate: item.publishDate,
      lang: "en",
      author: AUTHOR_ID,
    }
  ];
});

    const inserted = await Blog.insertMany(docs);
    console.log(`✅ Inserted ${inserted.length} news`);

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
    mongoose.disconnect();
  }
};
seedNews();