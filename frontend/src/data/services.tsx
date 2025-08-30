export interface Service {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    content: string;
    features: string[];
    category: string;
}

const BASE_API_URL = "http://localhost:4000";

// Service data array
export const services: Service[] = [
    {
        id: "is-zekasi-cozumleri",
        title: "İş Zekası Çözümleri",
        slug: "is-zekasi-cozumleri",
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
        id: "veri-madenciligi-calismalari",
        title: "Veri Madenciliği Çalışmaları",
        slug: "veri-madenciligi-calismalari",
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
        id: "veri-replikasyonu-cozumleri",
        title: "Veri Replikasyonu Çözümleri",
        slug: "veri-replikasyonu-cozumleri",
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
        id: "veritabani-cozumleri",
        title: "Veritabanı Çözümleri",
        slug: "veritabani-cozumleri",
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
        id: "yazilim-cozumleri",
        title: "Yazılım Çözümleri",
        slug: "yazilim-cozumleri",
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
        id: "bilgi-guvenligi",
        title: "Bilgi Güvenliği",
        slug: "bilgi-guvenligi",
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
        id: "surec-yonetimi-cozumleri",
        title: "Süreç Yönetimi Çözümleri",
        slug: "surec-yonetimi-cozumleri",
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
        id: "danismanlik-hizmetleri",
        title: "Danışmanlık Hizmetleri",
        slug: "danismanlik-hizmetleri",
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

// Helper functions
export const getServiceBySlug = (slug: string): Service | undefined => {
    return services.find(service => service.slug === slug);
};

export const getServicesByCategory = (category: string): Service[] => {
    return services.filter(service => service.category === category);
};

// Export the services array as well if needed
export default services;