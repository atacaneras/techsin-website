export interface SubProduct {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: string;
    features: string[];
}

export interface Product {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    content: string;
    features: string[];
    category: string;
    subProducts?: SubProduct[];
}

const BASE_API_URL = "http://localhost:4000";

// Product data array
export const products: Product[] = [
    {
        id: "smartsales",
        title: "SmartSales®",
        slug: "smartsales",
        excerpt: `Satış süreçlerinizi dijitalleştiren SmartSales®, referans yönetiminden poliçeleştirmeye kadar tüm satış aşamalarını tek platformda yöneterek satış verimliliğinizi maksimuma çıkarır.`,
        image: `${BASE_API_URL}/products/9.jpg`,
        category: "urunlerimiz",
        features: [
            "Referans ve randevu takip sistemi",
            "Harita tabanlı adres doğrulama",
            "Finansal planlama analizi ve ürün hesaplamaları",
            "MERNIS entegrasyonu ile kimlik doğrulama",
            "Dijital imza ve SMS onay sistemi",
            "Anlık medikal değerlendirme",
            "SanalPOS entegrasyonu ile anında tahsilat",
            "Gerçek zamanlı poliçeleştirme",
            "Detaylı süreç takip raporları",
            "Çok platformlu erişim (tablet, masaüstü, mobil)",
            "Çekirdek sistem entegrasyonu",
            "Kullanıcı dostu arayüz tasarımı"
        ],
        content: `
    <div class="video-container-large my-12">
      <div class="video-wrapper">
        <iframe 
          width="640" 
          height="360" 
          src="https://www.youtube.com/embed/B06TZBhywrE?si=2O-UddAcAZETIlbr" 
          title="İş Zekası Çözümleri" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>

    <p class="mb-2 text-sm leading-snug">Sektörün ihtiyaçları ve dinamikleri göz önünde bulundurularak geliştirilmiş uçtan uca bir satış süreci çözümüdür.</p>
    <p class="mb-2 text-sm leading-snug">Kısa bir çalışmayla çekirdek yazılımınıza ve diğer sistemlerinize entegrasyon sağlanarak SmartSales kullanıma hazır hale getirilmektedir. Sonrasında internet bağlantısı olan herhangi bir bilgisayardan (tablet, masaüstü, dizüstü) SmartSales’i kullanmaya başlayabilir, satış sürecinizi daha efektif bir hale getirebilirsiniz.</p>
    <p class="mb-2 text-sm leading-snug">Smartsales kullanarak yapabilecekleriniz:</p>
    <ul class="list-disc text-sm list-inside space-y-1">
      <li>Referans ve randevu ekleme ve bunların takibi</li>
      <li>Adres doğrulama özelliği ile eklenen randevuların doğru bir şekilde eklenmesi ve harita üzerinden takibi</li>
      <li>Finansal Planlama Analizi ve Ürün Hesaplamaları</li>
      <li>Sistem üzerinden başvuru formu alınması ve alınan bilgilerin çekirdek sisteme aktarılması</li>
      <li>Mernis sistemiyle kimlik doğrulaması</li>
      <li>Resim İmza ile başvurunun imzalanabilmesi</li>
      <li>SMS kodu ile doğrulama</li>
      <li>Anında medikal değerlendirme</li>
      <li>SanalPOS ile anında tahsilat</li>
      <li>Anında Poliçeleştirme</li>
      <li>Tüm bu süreci izlemenizi sağlayacak rapor sayfaları</li>
    </ul>
    <p class="mb-2 text-sm leading-snug">Siz de TechSiN ‘in uzman kadrosuyla sağladığı avantajlardan faydalanmak isterseniz, talepleriniz ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> adresinden iletişime geçiniz.</p>
  `
    },
    {
        id: "sigortacilikta-e-satis",
        title: "Sigortacılıkta E-Satış",
        slug: "sigortacilikta-e-satis",
        excerpt: "Aracısız online sigorta satış platformu ile müşterilerinize 7/24 erişim imkanı sunun. SSL güvenliği, MERNIS doğrulaması ve anında poliçeleştirme ile güvenli e-ticaret deneyimi.",
        image: `${BASE_API_URL}/products/1.jpg`,
        category: "urunlerimiz",
        features: [
            "Aracısız online sigorta satış sistemi",
            "MERNIS kimlik doğrulama entegrasyonu",
            "SMS onay ve güvenlik sistemi",
            "Anında kredi kartı tahsilat",
            "SSL sertifikalı güvenli altyapı",
            "Responsive tasarım (tüm cihazlarda uyumlu)",
            "Kullanıcı dostu satış akışı",
            "Otomatik poliçe üretimi",
            "Müşteri bilgilendirme sistemi",
            "Adres doğrulama teknolojisi",
            "Çok dilli destek altyapısı",
            "Gerçek zamanlı işlem takibi"
        ],
        content: `
    <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
      <div class="w-full md:w-1/2 flex">
         <img src="${BASE_API_URL}/products/1.jpg" alt="İş Zekası Çözümleri" class="rounded-lg shadow-md w-full h-full object-cover m-0">
      </div>
      <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug">
        <p class="mb-3">Sigortacılıkta E-Satış uygulamamız, aracıya ihtiyaç duymadan ürününüze ilgi duyan kişilere ulaşmanızı ve online olarak sigorta satışı yapmanızı sağlayan bir platformdur.</p>
        <p class="mb-3">Etkileyici ve yönlendirici tasarımı ile müşteriyi sıkmadan satış süreci için gerekli adımların tamamlanmasını sağlar ve müşteriniz anında sigorta poliçesine sahip olur.</p>
        <p class="mb-3">Süreç içerisinde müşterinin beyan ettiği adres ve kimlik bilgileri doğrulanmakta (MERNIS – nvi) ve SMS ile müşteri onayı alınabilmekte, tahsilat işlemi müşterinin kredi kartı üzerinden anında yapılabilmektedir.</p>
        <p class="mb-3">Tüm bu işlemler SSL sertifikası ile onaylanmış sistem üzerinde güvenli bir şekilde yapılmaktadır.</p>
      </div>
    </div>

    <p class="mb-2 text-sm leading-snug">E-Satış platformu, sahip olduğu tepkisel tasarım stili sayesinde tüm mobil cihazlarda da sorunsuz görüntülenmekte ve çalışmaktadır.</p>

    <p class="mb-2 text-sm leading-snug">Siz de TechSiN ‘in uzman kadrosuyla sağladığı avantajlardan faydalanmak isterseniz, talepleriniz ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> adresinden iletişime geçiniz.</p>
    
    <div class="video-container-large my-12">
      <div class="video-wrapper">
        <iframe 
          width="640" 
          height="360" 
          src="https://www.youtube.com/embed/x9hixdbso6Q?si=hDoCM9E4s3DpLdvs" 
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
        id: "terrarium-performans-yonetimi-yazilimi",
        title: "Terrarium Performans Yönetimi Yazılımı",
        slug: "terrarium-performans-yonetimi-yazilimi",
        excerpt: "Satış ekiplerinin komisyon ve ödüllerini dinamik formüllerle hesaplayan, performans yönetimini kolaylaştıran ve rekabeti artıran esnek yazılım çözümü.",
        image: `${BASE_API_URL}/products/2.jpg`,
        category: "urunlerimiz",
        features: [
            "Dinamik komisyon hesaplama sistemi",
            "Esnek ödül ve kampanya yönetimi",
            "Özelleştirilebilir performans kuralları",
            "Otomatik ödeme hesaplamaları",
            "Çok kriterli filtreleme sistemi",
            "Detaylı performans raporlaması",
            "Acente ve danışman bazlı analiz",
            "Rekabet artırıcı gamifikasyon",
            "Sistem entegrasyon desteği",
            "Kullanıcı dostu yönetim paneli",
            "Gerçek zamanlı performans takibi",
            "Özelleştirilebilir dashboard"
        ],
        content: `
    <div class="flex flex-col items-center gap-3 mb-12 text-sm leading-snug">
      <img src="${BASE_API_URL}/products/2.jpg" alt="Yazılım Çözümleri" class="rounded-lg shadow-md w-full md:w-1/2 object-cover">
      
        <p class="mb-2">Terrarium, oluşturduğunuz kampanya ve formüllerle satış ekiplerinizin komisyon ve ödüllerini hesaplama imkanı sunan; dinamik, esnek ve kullanıcı dostu bir performans yönetimi yazılımıdır.</p>
        <p class="mb-2">İlgili iş birimleri, hak sahiplerinin komisyonlarını, ödüllerini ve bunların ödemelerini kendi oluşturdukları kurallar ile çok kolay ve hızlı bir şekilde belirler. Esnek tanımlanan kurallar doğrultusunda istenilen filtrelere göre komisyon ve ödül hesaplamalarını yapar ve çeşitli raporları görüntüler.</p>
        <p class="mb-2">Böylece Terrarium firmanız için acenteler ve danışmanlar bazında rekabetin gelişmesini sağlar. Satış artışı için de önemli bir potansiyel oluşturur.</p>
        <p class="mb-2">Siz de bu özelliklerde kolay kullanılabilir bir arayüze sahip, başka sistemler ile entegre edilebilen, hızlı ve güvenli bir yazılıma ihtiyaç duyuyorsanız Terrarium tam size göre !</p>
        <p class="mb-2">Bunlara ek olarak, şirketinizin bu konuda özel ihtiyaçları varsa uygulamayı sizlere özel tasarlamaktan da mutluluk duyarız.</p>
        <p class="mb-2">Siz de TechSiN ‘in uzman kadrosuyla sağladığı avantajlardan faydalanmak isterseniz, talepleriniz ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> adresinden iletişime geçiniz.</p>

    <div class="video-container-large my-12">
      <div class="video-wrapper">
        <iframe 
          width="640" 
          height="360" 
          src="https://www.youtube.com/embed/XSVRcgOLwaU?si=iPvW5DFM0QrXxpY0" 
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
        id: "satis-yonetim-sistemi-optimatch-sales",
        title: "Satış Yönetim Sistemi (OPTIMATCH – Sales)",
        slug: "satis-yonetim-sistemi-optimatch-sales",
        excerpt: "Veri analizi ve makine öğrenmesi ile satış temsilcisi-ürün-müşteri arasında optimal eşleştirme yapan, satış verimliliğini ve karlılığı maksimuma çıkaran akıllı sistem.",
        image: `${BASE_API_URL}/products/4.jpg`,
        category: "urunlerimiz",
        features: [
            "Akıllı satış temsilcisi-müşteri eşleştirmesi",
            "Veri madenciliği tabanlı analiz",
            "Optimal ürün-müşteri uyumu",
            "Satış öngörüsü ve hedef belirleme",
            "Performans optimizasyon algoritmaları",
            "Kitle kaynak yönetimi yaklaşımı",
            "Zaman yönetimi optimizasyonu",
            "Karlılık maksimizasyonu",
            "Müşteri memnuniyeti artırma",
            "Satış süreç analizi",
            "Modüler ve ölçeklenebilir mimari",
            "Sektörel özelleştirme desteği"
        ],
        content: `
<div class="flex flex-col md:flex-row gap-4 items-stretch mb-8">
  <!-- IMAGE LEFT -->
  <div class="w-full md:w-1/2 flex justify-center items-start">
    <img src="${BASE_API_URL}/products/4.jpg" 
         alt="OPTIMATCH – Sales" 
         class="h-auto w-auto max-w-full max-h-96 rounded-lg shadow-md">
  </div>

  <!-- TEXT RIGHT -->
  <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug space-y-2">
    <h2 class="text-2xl font-semibold">OPTIMATCH NEDİR?</h2>
    <p>
      Satış sektörünün temelindeki 3 aktörü tek bir yazılım çözümünde buluşturan OPTIMATCH, satış temsilcisi, ürün ve müşteriler arasında firma için en uygun ve karlı eşleştirmeyi yapmaktadır. Doğru ürünün, doğru satış temsilcisiyle, doğru müşteriye ulaşmasını hedef alan OPTIMATCH yazılımı satış sürecindeki temel performans kriterleri için optimal sonuç üretir.
    </p>
    <p>
      Eşleştirmeler, veri madenciliği tabanlı uygulama ve kitle kaynak yönetimi yaklaşımı ile sizlere en doğru çıkarımları yapabileceğiniz çözümler sunar.
    </p>
  </div>
</div>

<!-- SECTIONS UNDER THE IMAGE -->
<div class="flex flex-col gap-3 text-sm leading-snug mb-8">
  <h2 class="text-xl font-semibold">OPTIMATCH’E İHTİYACIM VAR MI?</h2>
  <ul class="list-disc list-inside space-y-1">
    <li>Temsilcilerimin satış performansı yeterli değil.</li>
    <li>Her ürünü herkes satamaz biliyorum ama temsilcilerimi buna uygun yönetemiyorum.</li>
    <li>Bazen A ürünümü alabilecek bir müşteriye B ürünümle gidip satış fırsatını kaçırdığımı düşünüyorum.</li>
    <li>Müşteri referanslarımı istediğim gibi yönetemiyorum.</li>
    <li>Haftalık, aylık, dönemlik satış oranımı öngörmek istiyorum.</li>
    <li>Yeni bir ürün üzerinde çalışıyorum ama müşteri profilime uymazsa gibi endişelerim var.</li>
  </ul>
  <p>Yukarıdakilerden bir veya daha fazlasına katılıyorsan OPTIMATCH’le çözüm bulabilirsin.</p>

  <h2 class="text-xl font-semibold">OPTIMATCH NE SAĞLAR?</h2>
  <p>OPTIMATCH’in satış sektöründe kullanılmasıyla:</p>
  <ul class="list-disc list-inside space-y-1">
    <li>Satış ekiplerinin zamanlarını doğru yönetebilir.</li>
    <li>Satış öngörüleri ile hedeflerinizi güncelleyebilir.</li>
    <li>Satış ile sonuçlanan görüşmelerin artmasını sağlayabilir.</li>
    <li>Müşteri memnuniyetinin artırılmasıyla satış iptallerini ve diğer şirketlere geçişleri minimize edebilirsiniz.</li>
  </ul>

  <h2 class="text-xl font-semibold">OPTIMATCH ÖZELLEŞTİRİLEBİLİR Mİ?</h2>
  <p>
    TechSiN ARGE çalışmalarının ürünü olan OPTIMATCH ölçeklenebilir ve modüler mimarisiyle kurumlar için esnek çözümler sunmaktadır.
  </p>
  <p>
    OPTIMATCH – Sales yazılım çözümünün sektöre özel sürümleri bulunmaktadır:
    <br>– <a href="/urunlerimiz/satis-yonetim-sistemi-optimatch-sales/sigorta-icin-danisman-satis-yonetim-sistemi-optimatch-insurance" class="text-blue-600">OPTIMATCH – Insurance</a>
    <br>– <a href="/urunlerimiz/satis-yonetim-sistemi-optimatch-sales/cagri-merkezi-icin-temsilci-musteri-eslestirme-sistemi-optimatch-callcenter" class="text-blue-600">OPTIMATCH – CallCenter</a>
  </p>
  <p>
    Eğer OPTIMATCH’in yeteneklerini bu sürümler dışında kendi iş akışınıza özelleştirmek, OPTIMATCH’in sağladığı avantajlardan faydalanmak istiyorsanız, demo ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a> adresinden iletişime geçiniz.
  </p>
</div>
`
        ,
        subProducts: [
            {
                id: "cagri-merkezi-icin-temsilci-musteri-eslestirme-sistemi-optimatch-callcenter",
                title: "Çağrı Merkezi İçin Temsilci Müşteri Eşleştirme Sistemi (OPTIMATCH-CallCenter)",
                slug: "cagri-merkezi-icin-temsilci-musteri-eslestirme-sistemi-optimatch-callcenter",
                excerpt: "Çağrı merkezi temsilcilerinin doğru müşteriler ile eşleştirilmesini sağlayan, çağrı başarı oranını artıran ve satış verimliliğini optimize eden akıllı sistem.",
                category: "urunlerimiz",
                features: [
                    "Temsilci-müşteri optimal eşleştirmesi",
                    "Çağrı başarı oranı optimizasyonu",
                    "Satış performansı takip sistemi",
                    "Veri madenciliği tabanlı öneriler",
                    "Gerçek zamanlı performans analizi",
                    "Hedef satış öngörüleri",
                    "Müşteri memnuniyeti artırma",
                    "Zaman yönetimi optimizasyonu"
                ],
                content: `
            <div class="flex flex-col md:flex-row gap-4 mb-8">
                <!-- IMAGE LEFT -->
                <div class="w-full md:w-1/2 flex">
                    <img src="${BASE_API_URL}/products/6.jpg" 
                         alt="OPTIMATCH – CallCenter"
                         class="w-full h-full max-h-[300px] object-cover rounded-lg shadow-md">
                </div>
                <!-- TEXT RIGHT -->
                <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug space-y-2 max-h-[300px] overflow-y-auto">
                    <p>Müşteriye temas etmenin en hızlı yollarından biri olan çağrı merkezi mimarisinde Müşteri Temsilcilerini etkin olarak kullanabilen firmalar daha çok müşteriye ulaşabilmektedir.</p>
                    <p>Temsilci Müşteri Eşleştirme Sistemi (OPTIMATCH-CallCenter) yazılımı, satış ekiplerinin çağrı başarımlarını satış düzeyinde izlemek ve yönetmek için tasarlanmıştır.</p>
                    <p>OPTIMATCH-CallCenter, temsilcilere, müşterileri için en uygun ürünleri önererek desteklemektedir.</p>
                    <p>Eşleştirmeler, veri madenciliği tabanlı uygulama ve kitle kaynak yönetimi yaklaşımı ile sizlere en doğru çıkarımları yapabileceğiniz çözümler sunar.</p>
                </div>
            </div>
        </div>

<!-- SECTIONS UNDER THE IMAGE -->
<div class="flex flex-col gap-3 text-sm leading-snug mb-8">
  <p>OPTIMATCH-CallCenter’in çağrı merkezi sektöründe kullanılmasıyla:</p>
  <ul class="list-disc list-inside space-y-1">
    <li>Müşteri temsilcilerinin zamanlarının doğru yönetilmesi,</li>
    <li>Hedef satış öngörülerinin yapılabilmesi,</li>
    <li>Satış adedi ve karlılığın yükseltilmesi,</li>
    <li>Müşteri memnuniyetinin artırılmasıyla satış iptallerinin ve diğer şirketlere geçişlerin önlenmesi gibi faydalar sağlanmaktadır.</li>
  </ul>
  <p>
    OPTIMATCH-CallCenter, <a href="/urunlerimiz/satis-yonetim-sistemi-optimatch-sales/" class="text-blue-600">OPTIMATCH-Sales</a> yazılım çözümünün çağrı merkezlerine yönelik özelleştirilmiş bir ürünüdür.
  </p>
  <p>
    Eğer ilgi duyarsanız sigortacılık sektörüne özel <a href="/urunlerimiz/satis-yonetim-sistemi-optimatch-sales/sigorta-icin-danisman-satis-yonetim-sistemi-optimatch-insurance" class="text-blue-600">OPTIMATCH-Insurance</a>  ürünümüze de göz atabilirsiniz.
  </p>
  <p>
    Siz de OPTIMATCH-CallCenter’in sağladığı avantajlardan faydalanmak istiyorsanız, demo ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a> adresinden iletişime geçiniz.
  </p>
</div>
`
            },
            {
                id: "sigorta-icin-danisman-satis-yonetim-sistemi-optimatch-insurance",
                title: "Sigorta İçin Danışman Satış Yönetim Sistemi (OPTIMATCH-Insurance)",
                slug: "sigorta-icin-danisman-satis-yonetim-sistemi-optimatch-insurance",
                excerpt: "Sigorta danışmanlarının doğru ürün ve müşteri ile eşleştirilmesini sağlayan, poliçe karlılığını artıran ve iptal oranlarını azaltan özel algoritmalı sistem.",
                category: "urunlerimiz",
                features: [
                    "Danışman-müşteri-ürün optimal eşleştirmesi",
                    "Poliçe karlılık optimizasyonu",
                    "İptal oranı azaltma algoritmaları",
                    "Hileli poliçe tespiti",
                    "Müşteri transfer stratejileri",
                    "Referans havuzu yönetimi",
                    "Satış kabiliyeti analizi",
                    "Bireysel emeklilik ve hayat sigortası desteği"
                ],
                content: `
<div class="flex flex-col md:flex-row gap-4 items-stretch mb-8">
  <!-- IMAGE LEFT -->
  <div class="w-full md:w-1/2 flex justify-center items-stretch">
  <img src="${BASE_API_URL}/products/7.jpg" 
       alt="OPTIMATCH – Insurance" 
       class="object-cover w-full h-full rounded-lg shadow-md">
</div>

  <!-- TEXT RIGHT -->
  <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug space-y-2">
    <p>
      Hızla büyüyen sigortacılık pazarında satış ekiplerini etkin olarak kullanabilen firmalar daha çok müşteriye ulaşabilmektedir. Sigorta danışmanlarının etkin şekilde kullanabilmesi için mevcut satış verilerinden çıkarımlar yapılması önemlidir. Bu bağlamda danışmanların doğru ürün ile doğru müşterilere yönlendirilerek satışlarının artması ve devamlılığı sağlanabilmektedir.
    </p>
    <p>
     Danışman Satış Yönetim Sistemi (OPTIMATCH-Insurance) yazılımı, bireysel emeklilik, hayat ve taşıt sigortası alanlarında hizmet veren sigorta firmalarının, ofis içinde veya dışında, satış ekiplerinin performanslarını izlemek ve yönetmek, müşteri – ürün ve danışman eşleştirmesi yaparak maksimum verim ile çalışmayı sağlamak amacı ile tasarlanmıştır.
    </p>
  </div>
</div>

<!-- SECTIONS UNDER THE IMAGE -->
<div class="flex flex-col gap-3 text-sm leading-snug mb-8">
  <p>OPTIMATCH-Insurance, sigorta danışmanlarını, müşterileri için en uygun ürünleri önererek desteklemektedir. Referans havuzları içinden danışmanın satış kabiliyetlerine en uygun ve en karlı satışı yapabileceği müşteri-ürün eşleştirmeleri sunulmaktadır.</p>
  <p>Eşleştirmeler, veri madenciliği tabanlı uygulama ve kitle kaynak yönetimi yaklaşımı ile sizlere en doğru çıkarımları yapabileceğiniz çözümler sunar.</p>

  <p>OPTIMATCH-Insurance’in sigortacılık sektöründe kullanılmasıyla:</p>
  <ul class="list-disc list-inside space-y-1">
    <li>Satılan poliçe adedinin ve karlılığın yükseltilmesi,</li>
    <li>Poliçe iptallerinin ve diğer şirketlere geçişlerin önlenmesi,</li>
    <li>Hileli poliçe sayısının azaltılması,</li>
    <li>Cazip poliçe teklifleriyle diğer sigorta şirketlerindeki kişilerin transfer edilmesi gibi faydalar sağlanmaktadır.</li>
  </ul>
  <p>
    OPTIMATCH-Insurance, <a href="/urunlerimiz/satis-yonetim-sistemi-optimatch-sales/" class="text-blue-600">OPTIMATCH-Sales</a> yazılım çözümünün sigortacılık sektörüne yönelik özelleştirilmiş ürünüdür.
  </p>
  <p>
    Eğer ilgi duyarsanız çağrı merkezlerine özel <a href="/urunlerimiz/satis-yonetim-sistemi-optimatch-sales/cagri-merkezi-icin-temsilci-musteri-eslestirme-sistemi-optimatch-callcenter" class="text-blue-600">OPTIMATCH-CallCenter</a>  ürünümüze de göz atabilirsiniz.
  </p>
  <p>
    Siz de OPTIMATCH-Insurance’in sağladığı avantajlardan faydalanmak istiyorsanız, demo ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a> adresinden iletişime geçiniz.
  </p>
</div>
`
            }
        ]
    },
    {
        id: "muze-asist",
        title: "MÜZE ASİST",
        slug: "muze-asist",
        excerpt: "Bluetooth Low Energy teknolojisi ile çalışan, müze ziyaretçilerine temassız ve interaktif deneyim sunan, çok dilli sesli rehber mobil uygulaması.",
        image: `${BASE_API_URL}/products/5.jpg`,
        category: "urunlerimiz",
        features: [
            "Bluetooth Low Energy (BLE) konumlama",
            "Temassız etkileşim teknolojisi",
            "Çok dilli sesli rehber sistemi",
            "Görsel ve işitsel sunum desteği",
            "Interaktif eser bilgilendirmesi",
            "Dinamik içerik yönetimi",
            "Oyunlaştırma ve etkileşim",
            "Sosyal medya entegrasyonu",
            "Güvenli müze gezintisi",
            "Mobil platform uyumluluğu",
            "Akılda kalıcılık artırıcı özellikler",
            "Esnek içerik güncelleme sistemi"
        ],
        content: `
  <div class="flex flex-col gap-6 mb-12">
    <!-- FULL SIZE IMAGE -->
    <div class="w-full">
      <img src="${BASE_API_URL}/products/5.jpg" 
           alt="Müze Asist" 
           class="rounded-lg shadow-md w-full object-contain mx-auto">
    </div>

    <!-- TEXT SECTION -->
    <div class="text-sm leading-relaxed space-y-3">
      
      <!-- HEADER 1 -->
      <h2 class="text-2xl font-normal">MÜZE ASİST NEDİR?</h2>
      <p>
        MüzeAsist; Kodar ve Techsin tarafından %100 yerli Ar-Ge çalışması sonucu müzeler için 
        geliştirilmiş ve mobil platformlarda çalışan bir uygulamadır. Uygulamamız, kendisi için 
        özel olarak tasarlanmış olan elektronik modül ile görsel, işitsel ve interaktivite temelli 
        temassız etkileşim sağlamaktadır.
      </p>
      <p>
        Her dilde görsel ve işitsel sunum yapılabilme ve interaktif çalışma sistemi ile müzeciliği 
        son teknoloji ile uyumlu şekilde buluşturmayı hedeflemektedir. Bu sistem sayesinde ziyaretçiler, 
        sadece eserlerin yakınında mobil cihazlar aracılığı ile onlar hakkında bilgi alabilecek ve 
        geliştirilecek çeşitli senaryolar üzerinden eser ve bağlamı ile ilgili temasa geçebileceklerdir. 
        Eserin ve müzenin tanıtımı için sosyal medya ve viral tanıtıma dayalı çalışmalar da içerik 
        yönetimi sistemimiz içerisinde oluşturulmuştur.
      </p>
      <p>
        Eser ile ziyaretçi arasındaki bu iletişim, müze gezintisini dikkat dağıtıcı her türlü etkiden 
        uzak tutacak ve müzecilik içindeki güvenlik kuralları ile birlikte uygulanabilecek tek protokol 
        olan Bluetooth ® Low Energy (BLE) Smart Hub teknolojisine dayanmaktadır.
      </p>

      <!-- HEADER 2 -->
      <h2 class="text-xl font-normal">YENİLİK</h2>
      <p>
        Sistem, mobil uygulama yoluyla müzeler için temassız konumlama teknolojisine dayanmaktadır.
      </p>
      <p>
        Bu konumlama yapısı, eserlerin yakınlarına yerleştirilen elektronik cihazlarımızdan alınan 
        bilgi doğrultusunda, mobil uygulamamızın ziyaretçiler tarafından yüklenmesi ya da kendilerine 
        hazır olarak sunulmasıyla bilginin görsel / işitsel olarak kullanıcılara aktarılması prensibi 
        üzerine çalışmaktadır.
      </p>
      <p>
        Bu sayede uygulama kullanıcıları, kendilerine önceden hazırlanan sesli tur programları gibi 
        statik yapılardan akıllı cihazlar üzerinde esnek ve çok farklı fonksiyonları da kendilerine 
        sağlayabilecek kullanışlı bir yapıya geçmiş olacaklardır. Bu yenilikler, Bluetooth® Smart Ready 
        teknolojisi ile birleşip kesintisiz ve temassız bir deneyim yaşatacaktır.
      </p>
      <p>
        MüzeAsist uygulamasının her dil seçeneği olabileceği gibi, müze içerikleri, ses ve görsel 
        verilerin de dinamik olarak güncellenmesi kolaydır ve isteğe bağlı olarak oyunlaştırma 
        teknikleri ile akılda kalıcılığının da arttırılabilmesi mobil uygulamamız içinde mümkündür.
      </p>
    </div>
  </div>
`

    },
    {
        id: "bebi",
        title: "BeBI",
        slug: "bebi",
        excerpt: "Endustri 4.0 çağında üretim süreçlerinizi gerçek zamanlı takip eden, akıllı karar destek sistemi ile üretim verimliliğinizi artıran iş zekası çözümü.",
        image: `${BASE_API_URL}/products/3.png`,
        category: "urunlerimiz",
        features: [
            "Gerçek zamanlı üretim takibi",
            "Akıllı karar destek sistemi",
            "Canlı üretim veri analizi",
            "Hedef gerçekleşme öngörüleri",
            "Endustri 4.0 uyumlu altyapı",
            "Uzaktan fabrika yönetimi",
            "Dinamik performans raporlaması",
            "ERP entegrasyon desteği",
            "Üretim bandı izleme",
            "Net ve doğru bilgi sunumu",
            "Planlama optimizasyonu",
            "Mobil erişim imkanı"
        ],
        content: `
    <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
      <!-- TEXT FIRST -->
      <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-relaxed">
        <p><strong>Üretimde Akılcı Yolu Seçin: BeBI, Üretimde İş Zekası Yazılım Çözümü</strong></p>
<p class="mt-4 text-sm leading-relaxed">
  
Endustri 4.0’ı yakalamak için atmanız gereken bir adım olarak sunulan BeBI, Üretim Sektöründe İş Zekası çözümü olarak TechSiN Ar-Ge ekibi tarafından geliştirilmiştir.
</p>

      </div>

      <!-- IMAGE SECOND (RIGHT SIDE) -->
      <div class="w-full md:w-1/2 flex justify-center items-center">
        <img 
          src="${BASE_API_URL}/products/3.png" 
          alt="Danışmanlık Hizmetleri" 
          class="h-auto w-auto max-w-full max-h-96 rounded-lg shadow-md"
        >
      </div>
    </div>

    <ul class="list-disc text-sm list-relaxed ">
          <li>Fabrikanızı yönetici koltuğunuzdan kalkmadan veya aracınızın arka koltuğunda üretim bantları arasında geziyormuş gibi izleyebilirsiniz.</li>
          <li>Hedeflerinizin gerçekleşme öngörülerini, ay sonunu beklemeden; eski veriler yerine canlı üretim verileri ile en doğru şekilde önünüzde bulursunuz.</li>
          <li>Klasik ERP çözümlerinin sunduğu, statik çok sayfalı raporlar yerine, BeBI, size gerçekte ihtiyacınız olan bilgiyi net ve doğru olarak sunar.</li>
          <li>BeBI’nin sunduğu akıllı karar destek sistemi, planlama , gerçekleştirme ve yönetimde en yakın yardımcınız olmaya aday.</li>
        </ul>
       <p class="mt-4 text-sm leading-relaxed">Eğer BeBI’ın yeteneklerini bu sürümler dışında kendi iş akışınıza özelleştirmek ve BeBI’ın sağladığı avantajlardan faydalanmak istiyorsanız, demo ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a> adresinden iletişime geçiniz.</p>

  `
    },
    {
        id: "smartact",
        title: "SmartAct",
        slug: "smartact",
        excerpt: "Saha satış ekiplerinin performansını gerçek zamanlı takip eden, lokasyon doğrulaması yapan ve satış öncesi süreçleri optimize eden akıllı aktivite yönetim sistemi.",
        image: `${BASE_API_URL}/products/8.png`,
        category: "urunlerimiz",
        features: [
            "Gerçek zamanlı saha ekibi takibi",
            "GPS lokasyon kontrolü ve doğrulaması",
            "Satış öncesi süreç yönetimi",
            "Detaylı performans raporlaması",
            "Elektronik aktivite kaydı",
            "Platform bağımsız kullanım",
            "Müşteri adayı yönlendirme sistemi",
            "Satış görüşmesi sonuç takibi",
            "Veri madenciliği entegrasyonu",
            "BI analiz desteği",
            "Hata önleme kontrolleri",
            "Satış stratejisi öngörüleri"
        ],
        content: `
    <div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
      <!-- TEXT FIRST -->
      <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-relaxed">
        <p><strong>SmartAct, Satış Öncesi Aktivite Yönetimi</strong></p>
<p class="mt-4 text-sm leading-relaxed">
  SmartAct; sigortacılık sektörü veya saha satış ekibi olan diğer tüm sektörlerde, 
  satış ekibinin anlık olarak takibi, performanslarının raporlanması, satış ekiplerinin 
  başarılı satış ihtimali daha yüksek olan müşteri adaylarına yönlendirilmesi ile ekibin 
  daha iyi yönetilmesinin sağlanması ve bu sayede şirketlerin pazarda daha rekabetçi 
  olabilmesini mümkün kılan bir yazılım ürünüdür.
</p>

      </div>

      <!-- IMAGE SECOND (RIGHT SIDE) -->
      <div class="w-full md:w-1/2 flex justify-center items-center">
        <img 
          src="${BASE_API_URL}/products/8.png" 
          alt="Danışmanlık Hizmetleri" 
          class="h-auto w-auto max-w-full max-h-96 rounded-lg shadow-md"
        >
      </div>
    </div>

    <p class="mt-4 text-sm leading-relaxed">
      İş gücünün etkin bir şekilde kullanılmasına yardımcı olacaktır. Satış öncesi süreçte yapılan 
      tüm işlemler elektronik ortamda yapılır, satış görüşmesinin sonuçları kaydedilir, olası giriş 
      hataları program üzerindeki kontroller sayesinde engellenir ve bu sayede şirketler daha etkin 
      bir satış gücüne sahip olurlar. Ayrıca süreç boyunca yapılan tüm işlemlere ait verilerin 
      kaydedilmesi de raporlama, veri madenciliği ve BI gibi süreci geliştirici yöntemlere önemli 
      katkı sağlamaktadır.
    </p>

    <p class="mt-4 text-sm leading-relaxed">
      Saha ekiplerini takip edilebilmekte ve performanslarını ölçmekte zorlanan şirketler bu sorunu 
      aşmakla kalmayıp, SmartAct’in sunduğu detaylı raporlar sayesinde satış stratejilerine yönelik 
      öngörülerde bulunma imkanına sahip olurlar. Benzer uygulamalarda bulunmayan lokasyon kontrolü 
      özelliği sayesinde satış danışmanlarının görüşme zamanında gerçekten görüşme yerinde bulunup 
      bulunmadığı takip edebilir.
    </p>

    <p class="mt-4 text-sm leading-relaxed">
      SmartAct platform bağımsızlığı olduğundan, tabletlerde, masaüstü / dizüstü bilgisayarlarda 
      işletim sisteminin ne olduğundan bağımsız olarak kullanılabilir.
    </p>
  `
    },
];

// Helper functions
export const getProductBySlug = (slug: string): Product | undefined => {
    return products.find(product => product.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => product.category === category);
};

// Export the products array as well if needed
export default products;