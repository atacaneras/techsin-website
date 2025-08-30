import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../models/Blog.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const BASE_API_URL = "https://api.techsin.com.tr";
const AUTHOR_ID = "689effab8bfc2e922d776e39";

const services = [
    {
        order: 1,
        id: "tr-business-intelligence-solutions",
        title: "İş Zekası Çözümleri",
        slug: "tr-business-intelligence-solutions",
        excerpt: "İş zekası çözümlerimizle kurumların dağınık ve karmaşık verilerini stratejik bilgilere dönüştürerek doğru, hızlı ve etkin karar alma süreçlerini destekliyoruz.",
        image: `${BASE_API_URL}/services/4.jpg`,
        category: "hizmetlerimiz",
        features: [
            "Dağınık verilerin tek merkezde toplanması ve analizi",
            "Gerçek zamanlı raporlama ve görselleştirme",
            "Veri ambarı entegrasyonu",
            "Finansal, operasyonel ve stratejik analiz çözümleri",
            "Performans ölçümleme ve KPI takibi",
            "Karar destek sistemleri",
            "BI ürünleri implementasyonu, eğitim ve danışmanlık",
            "Kurumlara özel özelleştirilebilir iş zekası çözümleri"
        ],
        content: `
    <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
      <div class="w-full md:w-1/2 flex">
         <img src="${BASE_API_URL}/services/4.jpg" alt="İş Zekası Çözümleri" class="rounded-lg shadow-md w-full h-full object-cover m-0">
      </div>
      <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug">
        <p class="mb-3">İş Zekası (BI) çözümleri kurumların analiz ve raporlama ihtiyaçlarını daha hızlı ve efektif bir şekilde gerçekleştirmeleri için özel olarak geliştirilmiş çözümlerdir.</p>
        <p class="mb-3">Kurumların sahip oldukları büyük miktardaki veriler kurum için hem anlık durumu gözlemleme hem de ileriye dönük kararlar almak için büyük önem arz etmektedir. Bu veriler genellikle dağınık ve farklı araçlarda bulunmakta ve bir araya getirilip anlamlı bir analiz çıkarmak çoğu durumda çok kolay olmamaktadır.</p>
      </div>
    </div>

    <p class="mb-2 text-sm leading-snug">TechSiN çeşitli BI çözümleri sunarak müşterilerinin sahip olduğu bu dağınık verileri, değerli ve stratejik bilgilere dönüştürmekte ve kurumların farklı ihtiyaçlarını karşılayan çözümler üretmektedir. Bu kapsamda elde edilen anlamlı ve işletme için kullanılabilir bilgilerle, müşterilerine sağlıklı karar verme imkanı sunmaktadır.</p>
    <p class="mb-2 text-sm leading-snug">TechSiN, sunduğu BI ürünlerinin tüm implementasyon süreçlerini, eğitim, teknik ve fonksiyonel danışmanlık hizmetlerini sağlamaktadır.</p>

    <p class="mb-2 text-sm leading-snug">Siz de TechSiN ‘in uzman kadrosuyla sağladığı avantajlardan faydalanmak isterseniz, talepleriniz ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> adresinden iletişime geçiniz.</p>
    
    <div class="video-container-large my-12">
      <div class="video-wrapper">
        <iframe 
          width="640" 
          height="360" 
          src="https://www.youtube.com/embed/3r2xr7Exw0E?si=xt6rdW0wUtuDbRgc" 
          title="İş Zekası Çözümleri" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
    `
    },
    {
        order: 2,
        id: "tr-data-mining-services",
        title: "Veri Madenciliği Çalışmaları",
        slug: "tr-data-mining-services",
        excerpt: "Veri madenciliği çözümlerimizle şirketlerin büyük veri yığınlarından anlamlı ve değerli bilgiyi keşfetmelerini, stratejik karar süreçlerinde rekabet avantajı sağlamalarını destekliyoruz.",
        image: `${BASE_API_URL}/services/5.jpg`,
        category: "hizmetlerimiz",
        features: [
            "Büyük veri yığınlarından anlamlı bilgi çıkarımı",
            "Müşteri ilişkileri yönetimi (CRM) analizi",
            "Kredi derecelendirme ve risk analizi",
            "Satış tahminleri ve pazar eğilimleri",
            "Finans, bankacılık, perakende ve sigorta sektörlerine özel çözümler",
            "Veri ambarı entegrasyonu ve iş zekası uygulamaları",
            "Tahmine dayalı modelleme ve trend analizi",
            "Uzman danışmanlık ve güçlü iş ortaklıkları"
        ],
        content: `
  <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
    <div class="w-full md:w-1/2 flex">
      <img src="${BASE_API_URL}/services/5.jpg" alt="Veri Madenciliği Çözümleri" class="rounded-lg shadow-md w-full h-full object-cover">
    </div>
    <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug">
      <p class="mb-3">Günümüzde şirketler, stratejik karar alma süreçlerinde sahip oldukları ham veriyi işleyerek yeni bilgi üretmek ve ürettikleri bilgiyi kendi ihtiyaçlarını karşılayacak biçimde kullanmaya gereksinim duymaktadır.</p>
      <p class="mb-3">Veri Madenciliği; finans, bankacılık, perakende, sigortacılık ve iletişim sektörleri başta olmak üzere pek çok sektörde, şirketlerin veri ambarlarında bulunan verilerden geleceğe yönelik tahminler elde etmeye olanak sağlamaktadır.</p>
      <p class="mb-3">Veri Madenciliği tekniklerinin kullanımı ile şirketler, çok büyük veri yığınlarından geçerli ve uygulanabilir değerli bilgiyi kısa sürede kendilerine rekabet avantajı sağlayabilecek biçime dönüştürebilirler.</p>
      <p class="mb-3">Dünyanın önde gelen firmaları, gittikçe yaygınlaşan biçimde, müşteri ilişkileri yönetimi, kredi derecelendirme, satış tahminleri, risk analizi gibi pek çok alanda veri madenciliği tekniklerini başarıyla kullanmaktadırlar.</p>
      <p class="mb-3">TechSİN olarak sizlere veri madenciliği ve iş zekası konularında uzman kadromuz ve güçlü iş ortaklarımızla hizmet vermekten mutluluk duyacağız.</p>
    </div>
  </div>

  <p class="mb-2 text-sm leading-snug">Siz de TechSiN ‘in uzman kadrosuyla sağladığı avantajlardan faydalanmak isterseniz, talepleriniz ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> adresinden iletişime geçiniz.</p>
  
  <div class="video-container-large my-12">
    <div class="video-wrapper">
      <iframe 
        width="640" 
        height="360" 
        src="https://www.youtube.com/embed/QnIv_jVBCd0?si=6oO1xT86xpneccNU" 
        title="Veri Madenciliği Çözümleri" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
  </div>
  `
    },
    {
        order: 3,
        id: "tr-data-replication-solutions",
        title: "Veri Replikasyonu Çözümleri",
        slug: "tr-data-replication-solutions",
        excerpt: "Oracle GoldenGate ile gerçek zamanlı veri replikasyonu, yüksek erişilebilirlik, kesintisiz geçişler ve farklı veritabanları arasında güvenilir senkronizasyon çözümleri sunuyoruz.",
        image: `${BASE_API_URL}/services/3.jpg`,
        category: "hizmetlerimiz",
        features: [
            "Oracle GoldenGate ile gerçek zamanlı veri replikasyonu",
            "İş sürekliliği ve yüksek erişilebilirlik (High Availability)",
            "Sıfır kesinti ile versiyon yükseltme ve veri taşıma",
            "Farklı veritabanları arasında veri entegrasyonu",
            "Veri ambarı ve karar destek sistemleri için replikasyon",
            "GoldenGate kurulumu, konfigürasyonu ve optimizasyonu",
            "Performans iyileştirme ve sorun giderme",
            "GoldenGate yönetimi, bakım ve danışmanlık hizmetleri"
        ],
        content: `
  <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
    <div class="w-full md:w-1/2 flex">
      <img src="${BASE_API_URL}/services/3.jpg" alt="Süreç Yönetimi Çözümleri" class="rounded-lg shadow-md w-full h-full object-cover">
    </div>
    <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug">
      <p class="mb-3">Veri replikasyonu çözümlerini Oracle GoldenGate platformunu kullanarak sizlere sunuyoruz.</p>
      <p class="mb-3">Oracle GoldenGate yazılım platformu gerçek zamanlı veri aktarımı yapabilme ve bir çok farklı veritabanı teknolojisi arasında senkronizasyon sağlayabilme özelliği ile bu alandaki en iyi çözümdür.</p>
      <p class="mb-3">GoldenGate kullanım alanları şu şekilde sıralanabilir:</p>
       <ul class="list-disc list-inside space-y-1">
      <li>İş sürekliliği ve yüksek erişilebilirlik (High availability)</li>
      <li>Sıfır kesinti ile versiyon yükseltme ve veritabanı taşıma</li>
      <li>Veri entegrasyonları</li>
      <li>Veri ambarı ve karar destek sistemleri</li>
    </ul>
    </div>
  </div>

  <div class="flex flex-col gap-4 mb-12 text-sm leading-snug">
    <p class="mb-2 font-semibold">
     GoldenGate ile yapılabilecek replikasyon çeşitleri:
    </p>
    <ul class="list-disc list-inside space-y-1">
      <li>One-to-one ( Unidirectional )</li>
      <li>One-to-many ( Broadcasting )</li>
      <li>Many to one ( Consolidation )</li>
      <li>Cascading</li>
      <li>Bi-directional (active active veya active passive)</li>
    </ul>
    <p class="mb-2 flex items-center">
     GoldenGate platformu, gerçek zamanlı veri replikasyonuna ek olarak hem yönetim ve izleme işlemleri için hem de replikasyon yapılan veritabanlarının karşılaştırılması için ek araçlar sağlamaktadır.
    </p>

    <p class="mb-2 font-semibold">TechSiN olarak GoldenGate platformuyla sizlere:</p>
    
    <ol class="list-disc list-inside space-y-1 mb-3">
      <li>Analiz çalışmaları</li>
      <li>Lisanslama</li>
      <li>GoldenGate platform kurulumu</li>
        <li>GoldenGate replikasyon konfigürasyonu</li>
        <li>GoldenGate performans iyileştirme</li>
        <li>Sorun giderme</li>
        <li>GoldenGate yönetimi (Bakım destek hizmeti, danışmanlık)</li>
    </ol>
    <p class="mb-3">hizmetlerimizi sunuyoruz.</p>

    <p class="mb-2">Siz de TechSiN ‘in uzman kadrosuyla sağladığı avantajlardan faydalanmak isterseniz, talepleriniz ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> adresinden iletişime geçiniz.</p>
    <div class="video-container-large my-12">
        <div class="video-wrapper">
          <iframe 
            width="640" 
            height="360" 
            src="https://www.youtube.com/embed/oqVEAQESV5Q?si=FsGTJWBywHzG9vG9" 
            title="Sistem Kurulumu ve Bakım-Destek Hizmetleri" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
  
    </div>
`
    },
    {
        order: 4,
        id: "tr-database-solutions",
        title: "Veritabanı Çözümleri",
        slug: "tr-database-solutions",
        excerpt: "Kurumsal yazılım ve mobil uygulama çözümleri ile şirketlerin ihtiyaçlerine özel veritabanı yönetimi ve danışmanlık hizmetleri sunuyoruz.",
        image: `${BASE_API_URL}/services/2.jpg`,
        category: "hizmetlerimiz",
        features: [
            "Kurumsal veritabanı çözümleri geliştirme",
            "Veritabanı kurulum ve yönetimi",
            "Performans ayarlama ve optimizasyon",
            "Yedekleme ve felaket kurtarma çözümleri",
            "Lisanslama danışmanlığı",
            "Oracle Database Appliance (ODA) kurulum ve destek",
            "Bakım ve teknik destek danışmanlığı"
        ],
        content: `
  <!-- Image Left, Text Right -->
  <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12 text-sm leading-snug">

    <!-- Image -->
    <div class="w-full md:w-1/2 flex-shrink-0">
      <img src="${BASE_API_URL}/services/2.jpg" alt="Veritabanı Çözümleri" class="rounded-lg shadow-md w-full h-auto max-h-[500px] md:max-h-[600px] object-contain">
    </div>

    <!-- Text -->
    <div class="w-full md:w-1/2 flex flex-col justify-center text-left h-full">
      <p class="mb-3">TechSiN Bilişim Çözümleri olarak; konusunda uzman teknik danışmanlarımızla, şirketinizin ihtiyaç duyduğu DBA hizmetini güvenli ve yüksek performanslı çözümlerle sunmaktayız.</p>
      <p class="mb-3">Şirketimiz; ölçeklenebilir, esnek, yönetilebilir, yüksek performanslı ve güvenli veritabanı çözümleri üretmektedir.</p>
      <p class="mb-3">Bu kriterleri göz önüne alarak ürettiğimiz veritabanı çözümlerinin planlama, yapılandırma ve işletme aşamalarında sizin yanınızda yer alarak her an destek olmaktayız.</p>
    </div>

  </div>

  <!-- Remaining content below -->
  <div class="text-left max-w-3xl w-full mb-12 text-sm leading-snug">
    <h2 class="text-base md:text-lg font-bold mb-3">UZMAN OLDUĞUMUZ VERİTABANLARI:</h2>
    <ul class="list-disc list-inside space-y-1">
      <li>Oracle</li>
      <li>MySQL</li>
      <li>SQL Server</li>
      <li>PostgreSQL</li>
    </ul>

    <h2 class="text-base md:text-lg font-bold mt-5 mb-3">VERİTABANI İLE İLGİLİ NELER YAPIYORUZ?</h2>
    <ul class="list-disc list-inside space-y-1">
      <li>Lisanslama</li>
      <li>Veritabanı kurulumları</li>
      <li>Versiyon güncelleme</li>
      <li>Yedekleme ve yedekten geri dönme</li>
      <li>Felaket kurtarma</li>
      <li>Performans ayarlama</li>
      <li>Sistem kontrolü (Health check)</li>
      <li>Veritabanı yönetimi (bakım, destek, danışmanlık)</li>
      <li>Oracle Database Appliance (ODA) kurulum, bakım ve destek</li>
    </ul>

    <p class="mt-3">Siz de TechSiN ‘in uzman kadrosuyla sağladığı avantajlardan faydalanmak isterseniz, talepleriniz ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a> adresinden iletişime geçiniz.</p>
  </div>

  <div class="video-container-large my-12">
    <div class="video-wrapper">
      <iframe 
        width="640" 
        height="360" 
        src="https://www.youtube.com/embed/rdZrpKR2g1o?si=aaU40BehuZeUiqtb" 
        title="Veritabanı Çözümleri" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
  </div>
`
    },
    {
        order: 5,
        id: "tr-software-solutions",
        title: "Yazılım Çözümleri",
        slug: "tr-software-solutions",
        excerpt: "Kurumsal yazılım ve mobil uygulama çözümleri ile şirketlerin ihtiyaçlarına özel yazılım geliştirme hizmetleri sunuyoruz.",
        image: `${BASE_API_URL}/services/6.jpg`,
        category: "hizmetlerimiz",
        features: [
            "Kurumsal yazılım çözümleri geliştirme",
            "Mobil uygulama geliştirme",
            "Entegrasyon hizmetleri",
            "Müşteri odaklı yazılım süreçleri",
            "İhtiyaca özel paket yazılım geliştirme",
            "Verimlilik ve performans artırıcı çözümler",
            "Teknik destek ve danışmanlık"
        ],
        content: `
    <div class="flex flex-col items-center gap-6 mb-12 text-center text-sm leading-snug">
      <img src="${BASE_API_URL}/services/6.jpg" alt="Yazılım Çözümleri" class="rounded-lg shadow-md w-full md:w-1/2 object-cover">
      <h2 class="text-xl md:text-2xl font-bold mb-4">YAZILIM ÇÖZÜMLERİ</h2>
      <ul class="list-disc list-inside space-y-2 text-left max-w-3xl">
        <li>İş dünyasında ihtiyaç duyulan paket yazılım çözümleri çoğu zaman kurumsal ihtiyaçları tam olarak karşılamamakta ve şirketlerin talepleri karşısında yetersiz kalmaktadır. TechSiN Bilişim Çözümleri olarak; müşterilerimizin ihtiyaçlarına en uygun yazılım çözümlerini geliştirip rekabet güçlerini artırmaktayız.</li>
        <li>Yazılım geliştirme süreci boyunca, müşteri memnuniyeti odaklı çalışma ile ihtiyacınıza en uygun yazılım ve entegrasyon hizmetleri sunmaktayız.</li>
      </ul>

      <h2 class="text-xl md:text-2xl font-bold mt-6 mb-4">MOBİL UYGULAMA ÇÖZÜMLERİ</h2>
      <ul class="list-disc list-inside space-y-2 text-left max-w-3xl">
        <li>Mobil uygulamalarımız sayesinde mekândan bağımsız çalışmanız ve verimliliğinizi artırmanız; parçası olduğunuz sektör ne olursa olsun, ulaşabildiğiniz müşteri sayısını artırmanız mümkün.</li>
        <li>Mekândan bağımsız çalışma imkânı sunan mobil çözümlerimizle birkaç gün süren işlemlerinizi otomatikleştirip birkaç saat içerisinde sonuç alabilir hale getirebilir, performansınızı artırabilirsiniz.</li>
        <li>Mobil uygulamalarda teknik desteğe ihtiyacınız olduğunu düşündüğünüz yeni bilişim fikirlerinizi veya hâlihazırdaki bilişim uygulamalarınızı mobil ortama taşımak için TechSiN Bilişim Hizmetleri’nden destek alabilirsiniz.</li>
      </ul>

      <p class="mt-4">Siz de TechSiN ‘in uzman kadrosuyla sağladığı avantajlardan faydalanmak isterseniz, talepleriniz ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> adresinden iletişime geçiniz.</p>
    </div>

    <div class="video-container-large my-12">
      <div class="video-wrapper">
        <iframe 
          width="640" 
          height="360" 
          src="https://www.youtube.com/embed/fQ7lRytSbm0?si=psj6oIbXzeMVR_8i" 
          title="Yazılım Çözümleri" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
    `
    },
    {
        order: 6,
        id: "tr-information-security",
        title: "Bilgi Güvenliği",
        slug: "tr-information-security",
        excerpt: "Kurumsal bilgi güvenliği çözümleri ve danışmanlık hizmetleri.",
        image: `${BASE_API_URL}/services/8.jpg`,
        category: "hizmetlerimiz",
        features: [
            "Güvenlik analiz ve değerlendirmeleri",
            "Sızma testleri",
            "ISO 27001 danışmanlığı",
            "PCI DSS uyum danışmanlığı",
            "Açıklık yönetimi",
            "UNIX/Linux sıkılaştırma çalışmaları",
            "Kimlik ve erişim yönetimi hizmetleri",
            "Güvenli yazılım geliştirme danışmanlığı",
            "Bilgi güvenliği eğitim çalışmaları"
        ],
        content: `
    <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
      <div class="w-full md:w-1/2 flex">
        <img src="${BASE_API_URL}/services/8.jpg" alt="Bilgi Güvenliği" class="rounded-lg shadow-md w-full h-full object-cover">
      </div>
      <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug">
        <h2 class="text-xl md:text-2xl font-bold mb-4">BİLGİ GÜVENLİĞİ KONUSUNDA NELER YAPIYORUZ?</h2>
        <ul class="list-disc list-inside space-y-1 mb-4">
          <li>Güvenlik analiz ve değerlendirmeleri</li>
          <li>Sızma Testleri</li>
          <li>ISO 27001 danışmanlığı</li>
          <li>PCI DSS uyum danışmanlığı</li>
          <li>Açıklık Yönetimi</li>
          <li>UNIX/Linux sıkılaştırma çalışmaları</li>
          <li>Kimlik ve erişim yönetimi hizmetleri</li>
          <li>Güvenli yazılım geliştirme danışmanlığı</li>
          <li>Bilgi güvenliği eğitim çalışmaları</li>
        </ul>
        <p class="mt-3">Siz de TechSiN ‘in uzman kadrosuyla sağladığı avantajlardan faydalanmak isterseniz, talepleriniz ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> adresinden iletişime geçiniz.</p>
      </div>
    </div>

    <div class="video-container-large my-12">
      <div class="video-wrapper">
        <iframe 
          width="640" 
          height="360" 
          src="https://www.youtube.com/embed/6XJHgXE3ov8?si=sdrstlOxiZO1sHFl" 
          title="Bilgi Güvenliği" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
    `
    },
    {
        order: 7,
        id: "tr-process-management-solutions",
        title: "Süreç Yönetimi Çözümleri",
        slug: "tr-process-management-solutions",
        excerpt: "Büyük organizasyonlarda süreç ve proje yönetimini etkinleştiren çözümler.",
        image: `${BASE_API_URL}/services/1.jpg`,
        category: "hizmetlerimiz",
        features: [
            "Süreçlerin modellenmesi ve standardizasyonu",
            "İşbirliği ve iletişim platformları",
            "Otomasyon ile yönetsel aktivitelerin kolaylaştırılması",
            "Süreçlerin elektronik ortamda takibi ve raporlanması",
            "Görsel süreç modelleri ile aksaklıkların tespiti"
        ],
        content: `
  <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
    <div class="w-full md:w-1/2 flex">
      <img src="${BASE_API_URL}/services/1.jpg" alt="Süreç Yönetimi Çözümleri" class="rounded-lg shadow-md w-full h-full object-cover">
    </div>
    <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug">
      <p class="mb-3">Sistem ve yazılım mühendisliği disiplinlerini kullanarak büyük ve karmaşık ürünler geliştiren organizasyonlarda proje ve süreç yönetimi faaliyetlerinin etkili bir şekilde uygulanması ve yönetilmesi kaçınılmaz olarak zorlaşmaktadır.</p>
      <p class="mb-3">Bununla birlikte günümüzde, ürün geliştirme faaliyetleri genellikle organizasyonun farklı birimlerinin işbirliği ile gerçekleştirilmektedir.</p>
      <p class="mb-3">Bu tür büyük yapıları daha etkin yönetebilmek için süreçlerin tanımlanması, modellenmesi, çalışanlar arasında iletişim ve işbirliği platformunun sağlanması ve mümkün olan tüm yönetsel aktivitelerin otomasyonu gerekir.</p>
      <p class="mb-3">Tam bu noktada iş süreci yönetimi yazılımları, şirketlerin var olan iş akışlarının elektronik ortama aktarılmasını ve böylece bu süreçlerin elektronik ortamda gerçekleştirilmesini, takip edilmesini ve raporlanmasını sağlamaktadırlar. Bu aktarım sırasında iş süreci yazılımları süreçlerin görsel olarak modellenmesini sağlayarak sürecin standart bir yapıya kavuşmasına varsa aksaklıkların tespit edilmesine de yardımcı olmaktadırlar.</p>
    </div>
  </div>

  <div class="flex flex-col gap-4 mb-12 text-sm leading-snug">
    <p class="mb-2 flex items-center">
      TechSiN,
      <img src="${BASE_API_URL}/services/Emakin-2.png" alt="Platform 1" class="inline-block w-24 h-12 mx-2 align-middle">
      ve
      <img src="${BASE_API_URL}/services/Beinformed-2.png" alt="Platform 2" class="inline-block w-24 h-12 mx-2 align-middle">
      süreç platformlarının iş ortağı olarak bu alandaki ihtiyaçlarınıza çözümler sunmakta, ihtiyaçlarınıza uygun olan platformu seçmenize yardım ederek, seçilen süreci kullanarak size özel iş akışlarınızı bu platforma taşımanızı sağlamaktadır.
    </p>
    
    <p class="mb-2 font-semibold">Desteğini verdiğimiz her iki platformda;</p>
    
    <ol class="list-decimal list-inside space-y-1 mb-3">
      <li>Süreçleri görsel olarak modellemeye ve sürecin algoritmasını görsel olarak oluşturmaya imkan vermekte,</li>
      <li>Gelişmiş entegrasyon altyapısıyla mevcut sistemlerinizle kolaylıkla entegre olabilmekte,</li>
      <li>Organizasyon yapınızı esnek bir şekilde tanımlamaya olanak sağlamaktadır.</li>
    </ol>

    <p class="mb-2">TechSiN, en karmaşık süreçlerinizin tasarımı ve uygulama geliştirilmesinde, her zaman yüksek performanslı yazılım ürünleri seçenekleri ve uzman kadrosuyla yanınızdadır.</p>
    <p class="mb-2">Siz de TechSiN ‘in uzman kadrosuyla sağladığı avantajlardan faydalanmak isterseniz, talepleriniz ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> adresinden iletişime geçiniz.</p>
  </div>
`
    },
    {
        order: 8,
        id: "tr-consultancy-services",
        title: "Danışmanlık Hizmetleri",
        slug: "tr-consultancy-services",
        excerpt: "Teknoloji danışmanlığı, dijital dönüşüm danışmanlığı, yazılım danışmanlığı ve IT çözümleri.",
        image: `${BASE_API_URL}/services/7.jpg`,
        category: "hizmetlerimiz",
        features: [
            "Özelleştirilmiş çözümler",
            "Deneyimli uzman kadro",
            "7/24 destek",
            "Uygun maliyetli çözümler",
            "Sektöre özgü yaklaşım"
        ],
        content: `
      <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
        <div class="w-full md:w-1/2 flex">
          <img src="${BASE_API_URL}/services/7.jpg" alt="Danışmanlık Hizmetleri" class="rounded-lg shadow-md w-full h-full object-cover">
        </div>
        <div class="w-full md:w-1/2 flex flex-col justify-center">
          <p>TechSiN Bilişim Çözümleri olarak; müşterilerimize veritabanı yönetimi ve yazılım geliştirme konularında uzman danışmanlar sağlamaktayız. Yerinde hizmet ile müşterilerimizin ihtiyaçlarına anında müdahale eden danışmanlarımız, farklı çalışma ortamlarına kolayca uyum sağlayarak sizden biri gibi çalışmaktadır.</p>
          <p class="mt-4">Yerinde hizmet ile size sürekli destek olabildiğimiz gibi sadece danışmanlık hizmetimiz ile belirli periyotlarla sizinle birlikte çalışarak istediğiniz sonuçlara ulaşmanıza yardımcı olup, çalışmalarınıza değer katmaktayız.</p>
          <p class="mt-4">Siz de TechSiN 'in uzman kadrosuyla sağladığı avantajlardan faydalanmak isterseniz, talepleriniz ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> adresinden iletişime geçiniz.</p>
        </div>
      </div>

      <div class="video-container-large my-12">
        <div class="video-wrapper">
          <iframe 
            width="640" 
            height="360" 
            src="https://www.youtube.com/embed/lbLoAaiQnO4?si=1E49vDiObmirzaPW" 
            title="Danışmanlık Hizmetleri" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </div>

      <div class="text-center my-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Sistem Kurulumu ve Bakım-Destek Hizmetleri</h2>
        <ul class="list-none space-y-3 max-w-2xl mx-auto">
          <li class="flex items-start">
            <span class="text-blue-600 mr-2">•</span>
            <span>Şirketinizin bilişim ihtiyaçlarına yönelik en uygun çözümlerin tespit edilmesi, bu çözümlerin uygulanabilmesi için gereken altyapı, sunucu, yazılım ve diğer ürünlerin belirlenerek temin edilmesi aşamalarında size destek olmaktayız.</span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-600 mr-2">•</span>
            <span>Ayrıca, şirketiniz bünyesinde mevcut olan veya bizim tedarik edeceğimiz yeni ürünler için sistem kurulumu ve kurulum sonrasında bakım-destek hizmetlerimizden yararlanabilirsiniz.</span>
          </li>
        </ul>
      </div>

      <div class="video-container-large my-12">
        <div class="video-wrapper">
          <iframe 
            width="640" 
            height="360" 
            src="https://www.youtube.com/embed/kwfm1as6YbY?si=txEjxQGdlrwhZrwV" 
            title="Sistem Kurulumu ve Bakım-Destek Hizmetleri" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </div>

      <div class="text-center my-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Dış Kaynak Personel Temini</h2>
        <p class="mb-6">TechSİN olarak sizler için, sizin yerinizde çalışacak her seviyede çalışan teminini sağlayabiliriz. Bunlar:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div class="flex items-center">
            <span class="text-blue-600 mr-2">•</span>
            <span>Analist</span>
          </div>
          <div class="flex items-center">
            <span class="text-blue-600 mr-2">•</span>
            <span>Yazılım Geliştirme Uzmanı</span>
          </div>
          <div class="flex items-center">
            <span class="text-blue-600 mr-2">•</span>
            <span>Yazılım Test Uzmanı</span>
          </div>
          <div class="flex items-center">
            <span class="text-blue-600 mr-2">•</span>
            <span>Veritabanı yöneticisi</span>
          </div>
          <div class="flex items-center">
            <span class="text-blue-600 mr-2">•</span>
            <span>Oracle GoldenGate uzmanı</span>
          </div>
        </div>
      </div>

      <div class="video-container-large my-12">
        <div class="video-wrapper">
          <iframe 
            width="640" 
            height="360" 
            src="https://www.youtube.com/embed/s8VuM2kpkjE?si=83qM445A0uxQMirR" 
            title="Dış Kaynak Personel Temini" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </div>

      <div class="bg-gray-50 p-6 rounded-lg mt-8 text-center">
        <h3 class="font-semibold text-lg mb-4">İletişim</h3>
        <p class="mb-4">Danışmanlık hizmetlerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçebilirsiniz.</p>
        <a href="mailto:satis@techsin.com.tr" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          satis@techsin.com.tr
        </a>
      </div>
    `
    },
];

const englishServices = [
    {
        order: 1,
        id: "en-business-intelligence-solutions",
        title: "Business Intelligence Solutions",
        slug: "en-business-intelligence-solutions",
        excerpt: "With our business intelligence solutions, we transform organizations' scattered and complex data into strategic information, supporting accurate, fast, and effective decision-making processes.",
        image: `${BASE_API_URL}/services/4.jpg`,
        category: "our-services",
        features: [
            "Collecting and analyzing scattered data in a single hub",
            "Real-time reporting and visualization",
            "Data warehouse integration",
            "Financial, operational, and strategic analysis solutions",
            "Performance measurement and KPI tracking",
            "Decision support systems",
            "BI product implementation, training, and consultancy",
            "Customizable business intelligence solutions for companies"
        ],
        content: `
    <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
      <div class="w-full md:w-1/2 flex">
         <img src="${BASE_API_URL}/services/4.jpg" alt="Business Intelligence Solutions" class="rounded-lg shadow-md w-full h-full object-cover m-0">
      </div>
      <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug">
        <p class="mb-3">Business Intelligence (BI) solutions are specially developed to help organizations perform their analysis and reporting needs more quickly and effectively.</p>
        <p class="mb-3">The large amount of data that organizations possess is of great importance for both observing the current situation and making forward-looking decisions. This data is often scattered and located in different tools, and it is often not easy to bring it together to extract a meaningful analysis.</p>
      </div>
    </div>

    <p class="mb-2 text-sm leading-snug">TechSiN offers various BI solutions to transform this scattered data into valuable and strategic information for its clients and to produce solutions that meet the different needs of organizations. In this context, it provides its clients with the opportunity to make sound decisions with the meaningful and usable information obtained for the business.</p>
    <p class="mb-2 text-sm leading-snug">TechSiN provides all implementation processes, training, technical and functional consultancy services for the BI products it offers.</p>

    <p class="mb-2 text-sm leading-snug">If you would like to benefit from the advantages provided by TechSiN's expert team, please contact us at <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> for your requests and a price quote.</p>
    
    <div class="video-container-large my-12">
      <div class="video-wrapper">
        <iframe 
          width="640" 
          height="360" 
          src="https://www.youtube.com/embed/3r2xr7Exw0E?si=xt6rdW0wUtuDbRgc" 
          title="Business Intelligence Solutions" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
    `
    },
    {
        order: 2,
        id: "en-data-mining-services",
        title: "Data Mining Services",
        slug: "en-data-mining-services",
        excerpt: "With our data mining solutions, we help companies discover meaningful and valuable information from large data stacks, providing a competitive advantage in strategic decision-making processes.",
        image: `${BASE_API_URL}/services/5.jpg`,
        category: "our-services",
        features: [
            "Extracting meaningful information from large data stacks",
            "Customer Relationship Management (CRM) analysis",
            "Credit rating and risk analysis",
            "Sales forecasts and market trends",
            "Specialized solutions for finance, banking, retail, and insurance sectors",
            "Data warehouse integration and business intelligence applications",
            "Predictive modeling and trend analysis",
            "Expert consultancy and strong partnerships"
        ],
        content: `
  <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
    <div class="w-full md:w-1/2 flex">
      <img src="${BASE_API_URL}/services/5.jpg" alt="Data Mining Solutions" class="rounded-lg shadow-md w-full h-full object-cover">
    </div>
    <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug">
      <p class="mb-3">Today, companies need to process their raw data to produce new knowledge and use the knowledge they produce in a way that meets their needs in strategic decision-making processes.</p>
      <p class="mb-3">Data Mining, especially in the finance, banking, retail, insurance, and communication sectors, allows companies to obtain future-oriented predictions from the data in their data warehouses.</p>
      <p class="mb-3">With the use of Data Mining techniques, companies can quickly transform valid and applicable valuable information from very large data stacks into a form that can provide them with a competitive advantage.</p>
      <p class="mb-3">Leading companies in the world are increasingly and successfully using data mining techniques in many areas such as customer relationship management, credit rating, sales forecasts, and risk analysis.</p>
      <p class="mb-3">As TechSİN, we are happy to serve you with our expert team and strong business partners in data mining and business intelligence.</p>
    </div>
  </div>

  <p class="mb-2 text-sm leading-snug">If you would like to benefit from the advantages provided by TechSiN's expert team, please contact us at <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> for your requests and a price quote.</p>
  
  <div class="video-container-large my-12">
    <div class="video-wrapper">
      <iframe 
        width="640" 
        height="360" 
        src="https://www.youtube.com/embed/QnIv_jVBCd0?si=6oO1xT86xpneccNU" 
        title="Data Mining Solutions" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
  </div>
  `
    },
    {
        order: 3,
        id: "en-data-replication-solutions",
        title: "Data Replication Solutions",
        slug: "en-data-replication-solutions",
        excerpt: "We offer real-time data replication, high availability, seamless migrations, and reliable synchronization solutions between different databases with Oracle GoldenGate.",
        image: `${BASE_API_URL}/services/3.jpg`,
        category: "our-services",
        features: [
            "Real-time data replication with Oracle GoldenGate",
            "Business continuity and high availability",
            "Version upgrades and data migration with zero downtime",
            "Data integration between different databases",
            "Replication for data warehouses and decision support systems",
            "GoldenGate installation, configuration, and optimization",
            "Performance improvement and troubleshooting",
            "GoldenGate management, maintenance, and consultancy services"
        ],
        content: `
  <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
    <div class="w-full md:w-1/2 flex">
      <img src="${BASE_API_URL}/services/3.jpg" alt="Process Management Solutions" class="rounded-lg shadow-md w-full h-full object-cover">
    </div>
    <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug">
      <p class="mb-3">We offer data replication solutions using the Oracle GoldenGate platform.</p>
      <p class="mb-3">The Oracle GoldenGate software platform is the best solution in this area with its ability to perform real-time data transfer and provide synchronization between many different database technologies.</p>
      <p class="mb-3">GoldenGate usage areas can be listed as follows:</p>
       <ul class="list-disc list-inside space-y-1">
      <li>Business continuity and high availability</li>
      <li>Version upgrades and database migration with zero downtime</li>
      <li>Data integrations</li>
      <li>Data warehouse and decision support systems</li>
    </ul>
    </div>
  </div>

  <div class="flex flex-col gap-4 mb-12 text-sm leading-snug">
    <p class="mb-2 font-semibold">
     Replication types that can be performed with GoldenGate:
    </p>
    <ul class="list-disc list-inside space-y-1">
      <li>One-to-one (Unidirectional)</li>
      <li>One-to-many (Broadcasting)</li>
      <li>Many to one (Consolidation)</li>
      <li>Cascading</li>
      <li>Bi-directional (active active or active passive)</li>
    </ul>
    <p class="mb-2 flex items-center">
     In addition to real-time data replication, the GoldenGate platform provides additional tools for both management and monitoring and for comparing replicated databases.
    </p>

    <p class="mb-2 font-semibold">As TechSiN, we offer you the following services with the GoldenGate platform:</p>
    
    <ol class="list-disc list-inside space-y-1 mb-3">
      <li>Analysis studies</li>
      <li>Licensing</li>
      <li>GoldenGate platform installation</li>
        <li>GoldenGate replication configuration</li>
        <li>GoldenGate performance improvement</li>
        <li>Troubleshooting</li>
        <li>GoldenGate management (Maintenance support service, consultancy)</li>
    </ol>
    <p class="mb-3">We offer these services.</p>

    <p class="mb-2">If you would like to benefit from the advantages provided by TechSiN's expert team, please contact us at <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> for your requests and a price quote.</p>
    <div class="video-container-large my-12">
        <div class="video-wrapper">
          <iframe 
            width="640" 
            height="360" 
            src="https://www.youtube.com/embed/oqVEAQESV5Q?si=FsGTJWBywHzG9vG9" 
            title="System Installation and Maintenance-Support Services" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
  
    </div>
`
    },
    {
        order: 4,
        id: "en-database-solutions",
        title: "Database Solutions",
        slug: "en-database-solutions",
        excerpt: "We provide specialized database management and consultancy services with corporate software and mobile application solutions for companies' needs.",
        image: `${BASE_API_URL}/services/2.jpg`,
        category: "our-services",
        features: [
            "Developing corporate database solutions",
            "Database installation and management",
            "Performance tuning and optimization",
            "Backup and disaster recovery solutions",
            "Licensing consultancy",
            "Oracle Database Appliance (ODA) installation and support",
            "Maintenance and technical support consultancy"
        ],
        content: `
  <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12 text-sm leading-snug">

    <div class="w-full md:w-1/2 flex-shrink-0">
      <img src="${BASE_API_URL}/services/2.jpg" alt="Database Solutions" class="rounded-lg shadow-md w-full h-auto max-h-[500px] md:max-h-[600px] object-contain">
    </div>

    <div class="w-full md:w-1/2 flex flex-col justify-center text-left h-full">
      <p class="mb-3">As TechSiN Information Solutions, we provide the DBA service your company needs with secure and high-performance solutions with our expert technical consultants.</p>
      <p class="mb-3">Our company produces scalable, flexible, manageable, high-performance, and secure database solutions.</p>
      <p class="mb-3">Considering these criteria, we are with you during the planning, configuration, and operation stages of the database solutions we produce, providing support at all times.</p>
    </div>

  </div>

  <div class="text-left max-w-3xl w-full mb-12 text-sm leading-snug">
    <h2 class="text-base md:text-lg font-bold mb-3">DATABASES WE ARE EXPERT IN:</h2>
    <ul class="list-disc list-inside space-y-1">
      <li>Oracle</li>
      <li>MySQL</li>
      <li>SQL Server</li>
      <li>PostgreSQL</li>
    </ul>

    <h2 class="text-base md:text-lg font-bold mt-5 mb-3">WHAT WE DO RELATED TO DATABASES:</h2>
    <ul class="list-disc list-inside space-y-1">
      <li>Licensing</li>
      <li>Database installations</li>
      <li>Version upgrades</li>
      <li>Backup and restore</li>
      <li>Disaster recovery</li>
      <li>Performance tuning</li>
      <li>System health check</li>
      <li>Database management (maintenance, support, consultancy)</li>
      <li>Oracle Database Appliance (ODA) installation, maintenance, and support</li>
    </ul>

    <p class="mt-3">If you would like to benefit from the advantages provided by TechSiN's expert team, please contact us at <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a> for your requests and a price quote.</p>
  </div>

  <div class="video-container-large my-12">
    <div class="video-wrapper">
      <iframe 
        width="640" 
        height="360" 
        src="https://www.youtube.com/embed/rdZrpKR2g1o?si=aaU40BehuZeUiqtb" 
        title="Database Solutions" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
  </div>
`
    },
    {
        order: 5,
        id: "en-software-solutions",
        title: "Software Solutions",
        slug: "en-software-solutions",
        excerpt: "We provide custom software development services with corporate software and mobile application solutions for companies' needs.",
        image: `${BASE_API_URL}/services/6.jpg`,
        category: "our-services",
        features: [
            "Developing corporate software solutions",
            "Mobile application development",
            "Integration services",
            "Customer-oriented software processes",
            "Custom package software development",
            "Productivity and performance-enhancing solutions",
            "Technical support and consultancy"
        ],
        content: `
    <div class="flex flex-col items-center gap-6 mb-12 text-center text-sm leading-snug">
      <img src="${BASE_API_URL}/services/6.jpg" alt="Software Solutions" class="rounded-lg shadow-md w-full md:w-1/2 object-cover">
      <h2 class="text-xl md:text-2xl font-bold mb-4">SOFTWARE SOLUTIONS</h2>
      <ul class="list-disc list-inside space-y-2 text-left max-w-3xl">
        <li>The packaged software solutions needed in the business world often do not fully meet corporate needs and fall short of companies' demands. As TechSiN Information Solutions, we develop the most suitable software solutions for our clients' needs and increase their competitive power.</li>
        <li>Throughout the software development process, we provide the most suitable software and integration services for your needs with a customer-satisfaction-oriented approach.</li>
      </ul>

      <h2 class="text-xl md:text-2xl font-bold mt-6 mb-4">MOBILE APPLICATION SOLUTIONS</h2>
      <ul class="list-disc list-inside space-y-2 text-left max-w-3xl">
        <li>Thanks to our mobile applications, it is possible for you to work independently of location and increase your productivity, and increase the number of customers you can reach, regardless of the sector you are in.</li>
        <li>With our mobile solutions that offer location-independent work, you can automate processes that take a few days and get results in a few hours, increasing your performance.</li>
        <li>If you think you need technical support for new IT ideas or want to move your existing IT applications to the mobile environment, you can get support from TechSiN Information Services.</li>
      </ul>

      <p class="mt-4">If you would like to benefit from the advantages provided by TechSiN's expert team, please contact us at <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> for your requests and a price quote.</p>
    </div>

    <div class="video-container-large my-12">
      <div class="video-wrapper">
        <iframe 
          width="640" 
          height="360" 
          src="https://www.youtube.com/embed/fQ7lRytSbm0?si=psj6oIbXzeMVR_8i" 
          title="Software Solutions" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
    `
    },
    {
        order: 6,
        id: "en-information-security",
        title: "Information Security",
        slug: "en-information-security",
        excerpt: "Corporate information security solutions and consultancy services.",
        image: `${BASE_API_URL}/services/8.jpg`,
        category: "our-services",
        features: [
            "Security analysis and assessments",
            "Penetration testing",
            "ISO 27001 consultancy",
            "PCI DSS compliance consultancy",
            "Vulnerability management",
            "UNIX/Linux hardening studies",
            "Identity and access management services",
            "Secure software development consultancy",
            "Information security training"
        ],
        content: `
    <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
      <div class="w-full md:w-1/2 flex">
        <img src="${BASE_API_URL}/services/8.jpg" alt="Information Security" class="rounded-lg shadow-md w-full h-full object-cover">
      </div>
      <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug">
        <h2 class="text-xl md:text-2xl font-bold mb-4">WHAT WE DO IN INFORMATION SECURITY:</h2>
        <ul class="list-disc list-inside space-y-1 mb-4">
          <li>Security analysis and assessments</li>
          <li>Penetration Testing</li>
          <li>ISO 27001 consultancy</li>
          <li>PCI DSS compliance consultancy</li>
          <li>Vulnerability Management</li>
          <li>UNIX/Linux hardening studies</li>
          <li>Identity and access management services</li>
          <li>Secure software development consultancy</li>
          <li>Information security training</li>
        </ul>
        <p class="mt-3">If you would like to benefit from the advantages provided by TechSiN's expert team, please contact us at <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> for your requests and a price quote.</p>
      </div>
    </div>

    <div class="video-container-large my-12">
      <div class="video-wrapper">
        <iframe 
          width="640" 
          height="360" 
          src="https://www.youtube.com/embed/6XJHgXE3ov8?si=sdrstlOxiZO1sHFl" 
          title="Information Security" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
    `
    },
    {
        order: 7,
        id: "en-process-management-solutions",
        title: "Process Management Solutions",
        slug: "en-process-management-solutions",
        excerpt: "Solutions that enable effective process and project management in large organizations.",
        image: `${BASE_API_URL}/services/1.jpg`,
        category: "our-services",
        features: [
            "Process modeling and standardization",
            "Collaboration and communication platforms",
            "Simplifying managerial activities with automation",
            "Tracking and reporting processes electronically",
            "Identifying bottlenecks with visual process models"
        ],
        content: `
  <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
    <div class="w-full md:w-1/2 flex">
      <img src="${BASE_API_URL}/services/1.jpg" alt="Process Management Solutions" class="rounded-lg shadow-md w-full h-full object-cover">
    </div>
    <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug">
      <p class="mb-3">Using system and software engineering disciplines, it becomes inevitably difficult to effectively implement and manage project and process management activities in organizations that develop large and complex products.</p>
      <p class="mb-3">However, today, product development activities are generally carried out in collaboration with different units of the organization.</p>
      <p class="mb-3">To manage such large structures more effectively, processes must be defined, modeled, a platform for communication and collaboration among employees must be provided, and all possible managerial activities must be automated.</p>
      <p class="mb-3">At this point, business process management software enables companies to transfer their existing workflows to the electronic environment, thus allowing these processes to be carried out, tracked, and reported electronically. During this transfer, business process software also helps to standardize the process and identify any bottlenecks by allowing the processes to be modeled visually.</p>
    </div>
  </div>

  <div class="flex flex-col gap-4 mb-12 text-sm leading-snug">
    <p class="mb-2 flex items-center">
      TechSiN, as a business partner of the
      <img src="${BASE_API_URL}/services/Emakin-2.png" alt="Platform 1" class="inline-block w-24 h-12 mx-2 align-middle">
      and
      <img src="${BASE_API_URL}/services/Beinformed-2.png" alt="Platform 2" class="inline-block w-24 h-12 mx-2 align-middle">
      process platforms, offers solutions to your needs in this area, helps you choose the most suitable platform for your needs, and enables you to transfer your specific workflows to this platform using the selected process.
    </p>
    
    <p class="mb-2 font-semibold">In both platforms we support:</p>
    
    <ol class="list-decimal list-inside space-y-1 mb-3">
      <li>They allow visual modeling of processes and creating the process algorithm visually,</li>
      <li>They can easily integrate with your existing systems with an advanced integration infrastructure,</li>
      <li>They allow you to flexibly define your organizational structure.</li>
    </ol>

    <p class="mb-2">TechSiN is always by your side with high-performance software product options and its expert team in the design and application development of your most complex processes.</p>
    <p class="mb-2">If you would like to benefit from the advantages provided by TechSiN's expert team, please contact us at <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> for your requests and a price quote.</p>
  </div>
`
    },
    {
        order: 8,
        id: "en-consultancy-services",
        title: "Consultancy Services",
        slug: "en-consultancy-services",
        excerpt: "Technology consulting, digital transformation consulting, software consulting, and IT solutions.",
        image: `${BASE_API_URL}/services/7.jpg`,
        category: "our-services",
        features: [
            "Customized solutions",
            "Experienced expert staff",
            "24/7 support",
            "Cost-effective solutions",
            "Sector-specific approach"
        ],
        content: `
      <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
        <div class="w-full md:w-1/2 flex">
          <img src="${BASE_API_URL}/services/7.jpg" alt="Consultancy Services" class="rounded-lg shadow-md w-full h-full object-cover">
        </div>
        <div class="w-full md:w-1/2 flex flex-col justify-center">
          <p>As TechSiN Information Solutions, we provide expert consultants to our clients in database management and software development. Our on-site consultants, who immediately respond to our clients' needs, work like one of you, easily adapting to different working environments.</p>
          <p class="mt-4">Just as we can provide continuous support with on-site service, we also help you achieve the results you want and add value to your work by working with you at certain periods with our consultancy service alone.</p>
          <p class="mt-4">If you would like to benefit from the advantages provided by TechSiN's expert team, please contact us at <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> for your requests and a price quote.</p>
        </div>
      </div>

      <div class="video-container-large my-12">
        <div class="video-wrapper">
          <iframe 
            width="640" 
            height="360" 
            src="https://www.youtube.com/embed/lbLoAaiQnO4?si=1E49vDiObmirzaPW" 
            title="Consultancy Services" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </div>

      <div class="text-center my-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">System Installation and Maintenance-Support Services</h2>
        <ul class="list-none space-y-3 max-w-2xl mx-auto">
          <li class="flex items-start">
            <span class="text-blue-600 mr-2">•</span>
            <span>We support you in identifying the most suitable solutions for your company's IT needs, and in determining and procuring the infrastructure, server, software, and other products required to implement these solutions.</span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-600 mr-2">•</span>
            <span>In addition, you can benefit from our system installation and post-installation maintenance-support services for existing products within your company or new products that we will procure.</span>
          </li>
        </ul>
      </div>

      <div class="video-container-large my-12">
        <div class="video-wrapper">
          <iframe 
            width="640" 
            height="360" 
            src="https://www.youtube.com/embed/kwfm1as6YbY?si=txEjxQGdlrwhZrwV" 
            title="System Installation and Maintenance-Support Services" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </div>

      <div class="text-center my-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Outsourced Personnel Supply</h2>
        <p class="mb-6">As TechSİN, we can provide you with personnel at all levels who will work at your location. These include:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div class="flex items-center">
            <span class="text-blue-600 mr-2">•</span>
            <span>Analyst</span>
          </div>
          <div class="flex items-center">
            <span class="text-blue-600 mr-2">•</span>
            <span>Software Development Specialist</span>
          </div>
          <div class="flex items-center">
            <span class="text-blue-600 mr-2">•</span>
            <span>Software Test Specialist</span>
          </div>
          <div class="flex items-center">
            <span class="text-blue-600 mr-2">•</span>
            <span>Database administrator</span>
          </div>
          <div class="flex items-center">
            <span class="text-blue-600 mr-2">•</span>
            <span>Oracle GoldenGate expert</span>
          </div>
        </div>
      </div>

      <div class="video-container-large my-12">
        <div class="video-wrapper">
          <iframe 
            width="640" 
            height="360" 
            src="https://www.youtube.com/embed/s8VuM2kpkjE?si=83qM445A0uxQMirR" 
            title="Outsourced Personnel Supply" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      </div>

      <div class="bg-gray-50 p-6 rounded-lg mt-8 text-center">
        <h3 class="font-semibold text-lg mb-4">Contact</h3>
        <p class="mb-4">You can contact us for more information about our consultancy services.</p>
        <a href="mailto:satis@techsin.com.tr" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          satis@techsin.com.tr
        </a>
      </div>
    `
    },
];

const seedServices = async () => {
  try {
    await connectDB();
    await Blog.deleteMany({ category: { $in: ["hizmetlerimiz", "our-services"] } });

    const withAuthor = services.map(t => ({ ...t, author: AUTHOR_ID }));
    const enWithAuthor = englishServices.map(t => ({ ...t, author: AUTHOR_ID }));

    const inserted = await Blog.insertMany([...withAuthor, ...enWithAuthor]);
    console.log(`✅ Inserted ${inserted.length} services`);

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
    mongoose.disconnect();
  }
};

seedServices();
