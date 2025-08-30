import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../models/Blog.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const BASE_API_URL = "https://api.techsin.com.tr";
const AUTHOR_ID = "689effab8bfc2e922d776e39";

const products = [
  {
    order: 1,
    id: "tr-smartsales",
    title: "SmartSales®",
    slug: "tr-smartsales",
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
    order: 2,
    id: "tr-insurance-e-sales",
    title: "Sigortacılıkta E-Satış",
    slug: "tr-insurance-e-sales",
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
    order: 3,
    id: "tr-terrarium-performance-management-software",
    title: "Terrarium Performans Yönetimi Yazılımı",
    slug: "tr-terrarium-performance-management-software",
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
    order: 4,
    id: "tr-sales-management-system-optimatch-sales",
    title: "Satış Yönetim Sistemi (OPTIMATCH – Sales)",
    slug: "tr-sales-management-system-optimatch-sales",
    excerpt: "Veri analizi ve makine öğrenmesi ile satış temsilcisi-ürün-müşteri arasında optimal eşleştirme yapan, satış verimliliğini ve karlılığı maksimuma çıkaran akıllı sistem.",
    image: `${BASE_API_URL}/products/4.JPG`,
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
      <div class="w-full md:w-1/2 flex justify-center items-start">
        <img src="${BASE_API_URL}/products/4.jpg" 
             alt="OPTIMATCH – Sales" 
             class="h-auto w-auto max-w-full max-h-96 rounded-lg shadow-md">
      </div>
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
        <br>– <a href="/urunlerimiz/tr-sales-management-system-optimatch-sales/tr-insurance" class="text-blue-600">OPTIMATCH – Insurance</a>
        <br>– <a href="/urunlerimiz/tr-sales-management-system-optimatch-sales/tr-callcenter" class="text-blue-600">OPTIMATCH – CallCenter</a>
      </p>
      <p>
        Eğer OPTIMATCH’in yeteneklerini bu sürümler dışında kendi iş akışınıza özelleştirmek, OPTIMATCH’in sağladığı avantajlardan faydalanmak istiyorsanız, demo ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a> adresinden iletişime geçiniz.
      </p>
    </div>
    `,
    subProducts: [
      {
        id: "tr-insurance",
        title: "Sigorta İçin Danışman Satış Yönetim Sistemi (OPTIMATCH-Insurance)",
        slug: "tr-insurance",
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
          <div class="w-full md:w-1/2 flex justify-center items-stretch">
            <img src="${BASE_API_URL}/products/7.jpg" 
                 alt="OPTIMATCH – Insurance" 
                 class="object-cover w-full h-full rounded-lg shadow-md">
          </div>
          <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug space-y-2">
            <p>
              Hızla büyüyen sigortacılık pazarında satış ekiplerini etkin olarak kullanabilen firmalar daha çok müşteriye ulaşabilmektedir. Sigorta danışmanlarının etkin şekilde kullanabilmesi için mevcut satış verilerinden çıkarımlar yapılması önemlidir. Bu bağlamda danışmanların doğru ürün ile doğru müşterilere yönlendirilerek satışlarının artması ve devamlılığı sağlanabilmektedir.
            </p>
            <p>
             Danışman Satış Yönetim Sistemi (OPTIMATCH-Insurance) yazılımı, bireysel emeklilik, hayat ve taşıt sigortası alanlarında hizmet veren sigorta firmalarının, ofis içinde veya dışında, satış ekiplerinin performanslarını izlemek ve yönetmek, müşteri – ürün ve danışman eşleştirmesi yaparak maksimum verim ile çalışmayı sağlamak amacı ile tasarlanmıştır.
            </p>
          </div>
        </div>
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
            OPTIMATCH-Insurance, <a href="/urunlerimiz/tr-sales-management-system-optimatch-sales" class="text-blue-600">OPTIMATCH-Sales</a> yazılım çözümünün sigortacılık sektörüne yönelik özelleştirilmiş ürünüdür.
          </p>
          <p>
            Eğer ilgi duyarsanız çağrı merkezlerine özel <a href="/urunlerimiz/tr-sales-management-system-optimatch-sales/tr-callcenter" class="text-blue-600">OPTIMATCH-CallCenter</a>  ürünümüze de göz atabilirsiniz.
          </p>
          <p>
            Siz de OPTIMATCH-Insurance’in sağladığı avantajlardan faydalanmak istiyorsanız, demo ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a> adresinden iletişime geçiniz.
          </p>
        </div>
        `    
      },
      {
        id: "tr-callcenter",
        title: "Çağrı Merkezi İçin Temsilci Müşteri Eşleştirme Sistemi (OPTIMATCH-CallCenter)",
        slug: "tr-callcenter",
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
          <div class="w-full md:w-1/2 flex">
            <img src="${BASE_API_URL}/products/6.jpg" 
                 alt="OPTIMATCH – CallCenter"
                 class="w-full h-full max-h-[300px] object-cover rounded-lg shadow-md">
          </div>
          <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug space-y-2 max-h-[300px] overflow-y-auto">
            <p>Müşteriye temas etmenin en hızlı yollarından biri olan çağrı merkezi mimarisinde Müşteri Temsilcilerini etkin olarak kullanabilen firmalar daha çok müşteriye ulaşabilmektedir.</p>
            <p>Temsilci Müşteri Eşleştirme Sistemi (OPTIMATCH-CallCenter) yazılımı, satış ekiplerinin çağrı başarımlarını satış düzeyinde izlemek ve yönetmek için tasarlanmıştır.</p>
            <p>OPTIMATCH-CallCenter, temsilcilere, müşterileri için en uygun ürünleri önererek desteklemektedir.</p>
            <p>Eşleştirmeler, veri madenciliği tabanlı uygulama ve kitle kaynak yönetimi yaklaşımı ile sizlere en doğru çıkarımları yapabileceğiniz çözümler sunar.</p>
          </div>
        </div>
        <div class="flex flex-col gap-3 text-sm leading-snug mb-8">
          <p>OPTIMATCH-CallCenter’in çağrı merkezi sektöründe kullanılmasıyla:</p>
          <ul class="list-disc list-inside space-y-1">
            <li>Müşteri temsilcilerinin zamanlarının doğru yönetilmesi,</li>
            <li>Hedef satış öngörülerinin yapılabilmesi,</li>
            <li>Satış adedi ve karlılığın yükseltilmesi,</li>
            <li>Müşteri memnuniyetinin artırılmasıyla satış iptallerinin ve diğer şirketlere geçişlerin önlenmesi gibi faydalar sağlanmaktadır.</li>
          </ul>
          <p>
            OPTIMATCH-CallCenter, <a href="/urunlerimiz/tr-sales-management-system-optimatch-sales" class="text-blue-600">OPTIMATCH-Sales</a> yazılım çözümünün çağrı merkezlerine yönelik özelleştirilmiş bir ürünüdür.
          </p>
          <p>
            Eğer ilgi duyarsanız sigortacılık sektörüne özel <a href="/urunlerimiz/tr-sales-management-system-optimatch-sales/tr-insurance" class="text-blue-600">OPTIMATCH-Insurance</a>  ürünümüze de göz atabilirsiniz.
          </p>
          <p>
            Siz de OPTIMATCH-CallCenter’in sağladığı avantajlardan faydalanmak istiyorsanız, demo ve fiyat teklifi için lütfen <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a> adresinden iletişime geçiniz.
          </p>
        </div>
        `
      }
    ]      
  },
  {
    order: 5,
    id: "tr-muze-asist",
    title: "MÜZE ASİST",
    slug: "tr-muze-asist",
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
    order: 6,
    id: "tr-bebi",
    title: "BeBI",
    slug: "tr-bebi",
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
    order: 7,
    id: "tr-smartact",
    title: "SmartAct",
    slug: "tr-smartact",
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

const englishProducts = [
  {
    order: 1,
    id: "en-smartsales",
    title: "SmartSales®",
    slug: "en-smartsales",
    excerpt: `SmartSales® digitizes your sales processes and maximizes your sales efficiency by managing all sales stages on a single platform, from reference management to policy issuance.`,
    image: `${BASE_API_URL}/products/9.jpg`,
    category: "our-products",
    features: [
      "Reference and appointment tracking system",
      "Map-based address verification",
      "Financial planning analysis and product calculations",
      "Identity verification via MERNIS integration",
      "Digital signature and SMS confirmation system",
      "Instant medical evaluation",
      "Immediate collection with Virtual POS integration",
      "Real-time policy issuance",
      "Detailed process tracking reports",
      "Multi-platform access (tablet, desktop, mobile)",
      "Core system integration",
      "User-friendly interface design"
    ],
    content: `
<div class="video-container-large my-12">
  <div class="video-wrapper">
    <iframe 
      width="640" 
      height="360" 
      src="https://www.youtube.com/embed/B06TZBhywrE?si=2O-UddAcAZETIlbr" 
      title="Business Intelligence Solutions" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>
</div>

<p class="mb-2 text-sm leading-snug">It is an end-to-end sales process solution developed considering the needs and dynamics of the industry.</p>
<p class="mb-2 text-sm leading-snug">With a brief implementation, SmartSales can be integrated with your core software and other systems, becoming ready for use. Afterward, you can start using SmartSales from any internet-connected device (tablet, desktop, laptop) and make your sales process more efficient.</p>
<p class="mb-2 text-sm leading-snug">With SmartSales, you can:</p>
<ul class="list-disc text-sm list-inside space-y-1">
  <li>Add references and appointments and track them</li>
  <li>Ensure appointments are correctly added and tracked on the map with the address verification feature</li>
  <li>Perform Financial Planning Analysis and Product Calculations</li>
  <li>Collect application forms through the system and transfer the information to the core system</li>
  <li>Verify identity via the MERNIS system</li>
  <li>Sign the application digitally using Image Signature</li>
  <li>Verify via SMS code</li>
  <li>Perform instant medical evaluation</li>
  <li>Collect payments immediately via Virtual POS</li>
  <li>Issue policies instantly</li>
  <li>Access report pages to monitor the entire process</li>
</ul>
<p class="mb-2 text-sm leading-snug">If you want to benefit from the advantages provided by TechSiN’s expert team, please contact <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> for inquiries and price quotes.</p>
`
  },

  {
    order: 2,
    id: "en-insurance-e-sales",
    title: "E-Sales in Insurance",
    slug: "en-insurance-e-sales",
    excerpt: "Offer your customers 24/7 access with a direct online insurance sales platform. Enjoy a secure e-commerce experience with SSL security, MERNIS verification, and instant policy issuance.",
    image: `${BASE_API_URL}/products/1.jpg`,
    category: "our-products",
    features: [
      "Direct online insurance sales system",
      "MERNIS identity verification integration",
      "SMS approval and security system",
      "Instant credit card collection",
      "SSL-certified secure infrastructure",
      "Responsive design (compatible with all devices)",
      "User-friendly sales flow",
      "Automatic policy generation",
      "Customer notification system",
      "Address verification technology",
      "Multilingual support infrastructure",
      "Real-time transaction tracking"
    ],
    content: `
<div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
  <div class="w-full md:w-1/2 flex">
     <img src="${BASE_API_URL}/products/1.jpg" alt="Business Intelligence Solutions" class="rounded-lg shadow-md w-full h-full object-cover m-0">
  </div>
  <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug">
    <p class="mb-3">Our E-Sales platform in insurance allows you to reach people interested in your products without needing an intermediary and enables online insurance sales.</p>
    <p class="mb-3">With its engaging and guiding design, it ensures that all necessary steps in the sales process are completed without overwhelming the customer, who instantly receives their insurance policy.</p>
    <p class="mb-3">During the process, the customer’s declared address and identity information are verified (MERNIS – NVI), customer approval can be obtained via SMS, and payment is processed instantly through the customer’s credit card.</p>
    <p class="mb-3">All these operations are conducted securely on a system validated with an SSL certificate.</p>
  </div>
</div>

<p class="mb-2 text-sm leading-snug">Thanks to its responsive design, the E-Sales platform displays and functions flawlessly across all mobile devices.</p>

<p class="mb-2 text-sm leading-snug">If you want to benefit from the advantages provided by TechSiN’s expert team, please contact <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> for inquiries and price quotes.</p>

<div class="video-container-large my-12">
  <div class="video-wrapper">
    <iframe 
      width="640" 
      height="360" 
      src="https://www.youtube.com/embed/x9hixdbso6Q?si=hDoCM9E4s3DpLdvs" 
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
    order: 3,
    id: "en-terrarium-performance-management-software",
    title: "Terrarium Performance Management Software",
    slug: "en-terrarium-performance-management-software",
    excerpt: "A flexible software solution that calculates sales teams’ commissions and rewards with dynamic formulas, simplifies performance management, and boosts competition.",
    image: `${BASE_API_URL}/products/2.jpg`,
    category: "our-products",
    features: [
      "Dynamic commission calculation system",
      "Flexible reward and campaign management",
      "Customizable performance rules",
      "Automatic payment calculations",
      "Multi-criteria filtering system",
      "Detailed performance reporting",
      "Agent and consultant-based analysis",
      "Competition-enhancing gamification",
      "System integration support",
      "User-friendly management panel",
      "Real-time performance tracking",
      "Customizable dashboard"
    ],
    content: `
<div class="flex flex-col items-center gap-3 mb-12 text-sm leading-snug">
  <img src="${BASE_API_URL}/products/2.jpg" alt="Software Solutions" class="rounded-lg shadow-md w-full md:w-1/2 object-cover">
  
  <p class="mb-2">Terrarium is a dynamic, flexible, and user-friendly performance management software that allows you to calculate your sales teams’ commissions and rewards based on the campaigns and formulas you create.</p>
  <p class="mb-2">Relevant business units can quickly and easily determine the commissions, rewards, and payments of eligible personnel according to their own rules. Based on the flexible rules you define, it performs commission and reward calculations according to desired filters and displays various reports.</p>
  <p class="mb-2">Thus, Terrarium fosters competition among agents and consultants within your company, creating significant potential for sales growth.</p>
  <p class="mb-2">If you need a software with an easy-to-use interface, capable of integration with other systems, fast and secure, Terrarium is perfect for you!</p>
  <p class="mb-2">Additionally, if your company has special requirements, we are happy to customize the application for your needs.</p>
  <p class="mb-2">If you want to benefit from the advantages provided by TechSiN’s expert team, please contact <a href="mailto:satis@techsin.com.tr" style="color: blue;">satis@techsin.com.tr</a> for inquiries and price quotes.</p>

  <div class="video-container-large my-12">
    <div class="video-wrapper">
      <iframe 
        width="640" 
        height="360" 
        src="https://www.youtube.com/embed/XSVRcgOLwaU?si=iPvW5DFM0QrXxpY0" 
        title="Software Solutions" 
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
    id: "en-sales-management-system-optimatch-sales",
    title: "Sales Management System (OPTIMATCH – Sales)",
    slug: "en-sales-management-system-optimatch-sales",
    excerpt: "An intelligent system that uses data analysis and machine learning to optimally match sales representatives, products, and customers, maximizing sales efficiency and profitability.",
    image: `${BASE_API_URL}/products/4.jpg`,
    category: "our-products",
    features: [
      "Intelligent sales rep–customer matching",
      "Data mining-based analysis",
      "Optimal product–customer fit",
      "Sales forecasting and target setting",
      "Performance optimization algorithms",
      "Crowd-sourcing management approach",
      "Time management optimization",
      "Profit maximization",
      "Improved customer satisfaction",
      "Sales process analysis",
      "Modular and scalable architecture",
      "Industry-specific customization support"
    ],
 content: `
    <div class="flex flex-col md:flex-row gap-4 items-stretch mb-8">
      <div class="w-full md:w-1/2 flex justify-center items-start">
        <img src="${BASE_API_URL}/products/4.jpg" 
             alt="OPTIMATCH – Sales" 
             class="h-auto w-auto max-w-full max-h-96 rounded-lg shadow-md">
      </div>
      <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug space-y-2">
        <h2 class="text-2xl font-semibold">WHAT IS OPTIMATCH?</h2>
        <p>
          OPTIMATCH brings together the three key actors in sales—sales representatives, products, and customers—into a single software solution. It ensures the most suitable and profitable match for the company. By connecting the right product with the right sales representative for the right customer, OPTIMATCH generates optimal results for key sales performance criteria.
        </p>
        <p>
          Matches are provided using a data mining-based application and a crowd-sourcing management approach, giving you solutions for the most accurate insights.
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-3 text-sm leading-snug mb-8">
      <h2 class="text-xl font-semibold">DO I NEED OPTIMATCH?</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>My sales representatives’ performance is not sufficient.</li>
        <li>I know not everyone can sell every product, but I cannot manage my reps accordingly.</li>
        <li>Sometimes I worry I miss opportunities by offering the wrong product to a customer.</li>
        <li>I cannot manage my customer references effectively.</li>
        <li>I want to forecast weekly, monthly, and periodic sales rates.</li>
        <li>I’m working on a new product but worry it might not fit my customer profile.</li>
      </ul>
      <p>If any of the above applies, OPTIMATCH can provide a solution.</p>
      <h2 class="text-xl font-semibold">WHAT DOES OPTIMATCH PROVIDE?</h2>
      <p>By using OPTIMATCH in sales:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Sales teams’ time can be managed efficiently.</li>
        <li>Sales forecasts and targets can be updated.</li>
        <li>The number of successful sales meetings can be increased.</li>
        <li>Customer satisfaction can be improved, minimizing cancellations and customer churn.</li>
      </ul>
      <h2 class="text-xl font-semibold">IS OPTIMATCH CUSTOMIZABLE?</h2>
      <p>
        Developed by TechSiN R&D, OPTIMATCH offers flexible solutions for organizations with its modular and scalable architecture.
      </p>
      <p>
        There are industry-specific versions of OPTIMATCH – Sales:
        <br>– <a href="/en/our-products/en-sales-management-system-optimatch-sales/en-insurance" class="text-blue-600">OPTIMATCH – Insurance</a>
        <br>– <a href="/en/our-products/en-sales-management-system-optimatch-sales/en-callcenter" class="text-blue-600">OPTIMATCH – CallCenter</a>
      </p>
      <p>
        To customize OPTIMATCH for your workflows or request a demo and pricing, please contact <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a>.
      </p>
    </div>
    `,    
    subProducts: [
      {
        id: "en-insurance",
        title: "Sales Management System for Insurance Advisors (OPTIMATCH-Insurance)",
        slug: "en-insurance",
        excerpt: "A system with special algorithms that matches insurance advisors with the right products and customers, increasing policy profitability and reducing cancellations.",
        category: "our-products",
        features: [
          "Advisor–customer–product optimal matching",
          "Policy profitability optimization",
          "Cancellation reduction algorithms",
          "Fraud detection",
          "Customer transfer strategies",
          "Reference pool management",
          "Sales capability analysis",
          "Support for life & retirement insurance"
        ],
content: `
        <div class="flex flex-col md:flex-row gap-4 items-stretch mb-8">
          <div class="w-full md:w-1/2 flex justify-center items-stretch">
            <img src="${BASE_API_URL}/products/7.jpg" 
                 alt="OPTIMATCH – Insurance" 
                 class="object-cover w-full h-full rounded-lg shadow-md">
          </div>
          <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug space-y-2">
            <p>
              Firms that effectively utilize sales teams in the rapidly growing insurance market can reach more customers. It is important for insurance advisors to leverage existing sales data to guide their efforts. This ensures advisors are matched with the right products and customers, improving sales and continuity.
            </p>
            <p>
              The Advisor Sales Management System (OPTIMATCH-Insurance) is designed for insurance companies in individual retirement, life, and vehicle insurance sectors to monitor and manage their sales teams’ performance in-office or remotely while maximizing efficiency through customer–product–advisor matching.
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-3 text-sm leading-snug mb-8">
          <p>OPTIMATCH-Insurance supports advisors by recommending the most suitable products. Reference pools are used to match advisors with customers for the most profitable sales.</p>
          <p>Matches are provided using data mining and crowd-sourcing approaches for accurate insights.</p>
          <p>By using OPTIMATCH-Insurance in insurance:</p>
          <ul class="list-disc list-inside space-y-1">
            <li>Increase sold policy numbers and profitability,</li>
            <li>Prevent policy cancellations and customer churn,</li>
            <li>Reduce fraudulent policies,</li>
            <li>Attract customers from competitors with attractive offers.</li>
          </ul>
          <p>OPTIMATCH-Insurance is the insurance-focused version of <a href="/en/our-products/en-sales-management-system-optimatch-sales" class="text-blue-600">OPTIMATCH-Sales</a>.</p>
          <p>For call center applications, see <a href="/en/our-products/en-sales-management-system-optimatch-sales/en-callcenter" class="text-blue-600">OPTIMATCH-CallCenter</a>.</p>
          <p>For a demo or pricing, contact <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a>.</p>
        </div>
        `
      },      
      {
        id: "en-callcenter",
        title: "Representative–Customer Matching System for Call Centers (OPTIMATCH-CallCenter)",
        slug: "en-callcenter",
        excerpt: "An intelligent system that matches call center agents with the right customers, improving call success rates and optimizing sales efficiency.",
        category: "our-products",
        features: [
          "Agent–customer optimal matching",
          "Call success rate optimization",
          "Sales performance tracking system",
          "Data-driven recommendations",
          "Real-time performance analysis",
          "Sales target forecasting",
          "Customer satisfaction improvement",
          "Time management optimization"
        ],
 content: `
        <div class="flex flex-col md:flex-row gap-4 mb-8">
          <div class="w-full md:w-1/2 flex">
            <img src="${BASE_API_URL}/products/6.jpg" 
                 alt="OPTIMATCH – CallCenter"
                 class="w-full h-full max-h-[300px] object-cover rounded-lg shadow-md">
          </div>
          <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-snug space-y-2 max-h-[300px] overflow-y-auto">
            <p>In call center architectures, firms that efficiently use customer representatives can reach more clients.</p>
            <p>The Representative–Customer Matching System (OPTIMATCH-CallCenter) is designed to monitor and manage sales team performance at the call level.</p>
            <p>OPTIMATCH-CallCenter supports agents by recommending the most suitable products for their customers.</p>
            <p>Matches are provided using data mining and crowd-sourcing approaches for accurate insights.</p>
          </div>
        </div>
        <div class="flex flex-col gap-3 text-sm leading-snug mb-8">
          <p>By using OPTIMATCH-CallCenter in call centers:</p>
          <ul class="list-disc list-inside space-y-1">
            <li>Representatives’ time can be managed effectively,</li>
            <li>Sales target forecasts can be created,</li>
            <li>Sales volume and profitability can be increased,</li>
            <li>Customer satisfaction can improve, minimizing cancellations and churn.</li>
          </ul>
          <p>OPTIMATCH-CallCenter is a call center-specific version of <a href="/en/our-products/en-sales-management-system-optimatch-sales" class="text-blue-600">OPTIMATCH-Sales</a>.</p>
          <p>For insurance-specific applications, see <a href="/en/our-products/en-sales-management-system-optimatch-sales/en-insurance" class="text-blue-600">OPTIMATCH-Insurance</a>.</p>
          <p>For a demo or pricing, contact <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a>.</p>
        </div>
        `
      }
    ]
  },

  {
    order: 5,
    id: "en-muze-asist",
    title: "MÜZE ASİST",
    slug: "en-muze-asist",
    excerpt: "A multilingual audio guide mobile app using Bluetooth Low Energy technology, providing museum visitors with a contactless and interactive experience.",
    image: `${BASE_API_URL}/products/5.jpg`,
    category: "our-products",
    features: [
      "Bluetooth Low Energy (BLE) positioning",
      "Contactless interaction technology",
      "Multilingual audio guide system",
      "Visual and auditory presentation support",
      "Interactive exhibit information",
      "Dynamic content management",
      "Gamification and engagement",
      "Social media integration",
      "Secure museum navigation",
      "Mobile platform compatibility",
      "Memory retention enhancing features",
      "Flexible content update system"
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
    <h2 class="text-2xl font-normal">WHAT IS MÜZE ASİST?</h2>
    <p>
      MüzeAsist is a fully locally developed application for museums by Kodar and TechSiN, running on mobile platforms. Our application provides visual, auditory, and interactive contactless experiences through a specially designed electronic module.
    </p>
    <p>
      It aims to integrate cutting-edge technology with museum experiences by enabling visual and auditory presentations in any language and an interactive operation system. With this system, visitors can obtain information about exhibits through their mobile devices when near them, and interact with the exhibit and its context through various scenarios. Our content management system also includes social media and viral promotion features for promoting the exhibits and the museum.
    </p>
    <p>
      The interaction between the visitor and the exhibit is based on Bluetooth® Low Energy (BLE) Smart Hub technology, which ensures the museum visit remains free from distractions while complying with safety rules.
    </p>

    <!-- HEADER 2 -->
    <h2 class="text-xl font-normal">INNOVATION</h2>
    <p>
      The system is based on contactless positioning technology for museums via the mobile app.
    </p>
    <p>
      This positioning structure works on the principle of transmitting information visually and audibly to users, based on data from our electronic devices placed near exhibits, either downloaded through the app by visitors or provided pre-installed.
    </p>
    <p>
      This allows users to move beyond static experiences like pre-recorded audio tours and access flexible and diverse functions on smart devices. Combined with Bluetooth® Smart Ready technology, it ensures a seamless and contactless experience.
    </p>
    <p>
      MüzeAsist supports multiple language options, and museum content, audio, and visual data can be updated dynamically. Optional gamification techniques can also be applied to enhance memorability within the mobile app.
    </p>
  </div>
</div>
`
  },
  {
    order: 6,
    id: "en-bebi",
    title: "BeBI",
    slug: "en-bebi",
    excerpt: "A business intelligence solution that tracks your production processes in real time and boosts manufacturing efficiency with an intelligent decision support system in the Industry 4.0 era.",
    image: `${BASE_API_URL}/products/3.png`,
    category: "our-products",
    features: [
      "Real-time production tracking",
      "Intelligent decision support system",
      "Live production data analysis",
      "Target achievement forecasts",
      "Industry 4.0 compatible infrastructure",
      "Remote factory management",
      "Dynamic performance reporting",
      "ERP integration support",
      "Production line monitoring",
      "Clear and accurate information delivery",
      "Planning optimization",
      "Mobile access"
    ],
    content: `
<div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
  <!-- TEXT FIRST -->
  <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-relaxed">
    <p><strong>Choose the Smart Path in Manufacturing: BeBI, Business Intelligence Software for Production</strong></p>
    <p class="mt-4 text-sm leading-relaxed">
      BeBI, presented as a step to embrace Industry 4.0, is a business intelligence solution for the manufacturing sector developed by TechSiN’s R&D team.
    </p>
  </div>

  <!-- IMAGE SECOND (RIGHT SIDE) -->
  <div class="w-full md:w-1/2 flex justify-center items-center">
    <img 
      src="${BASE_API_URL}/products/3.png" 
      alt="Consulting Services" 
      class="h-auto w-auto max-w-full max-h-96 rounded-lg shadow-md"
    >
  </div>
</div>

<ul class="list-disc text-sm list-relaxed">
  <li>You can monitor your factory as if walking along the production lines or from the comfort of your manager’s chair.</li>
  <li>Forecasts for achieving your targets are available in real time using live production data, rather than waiting until the end of the month or relying on historical data.</li>
  <li>Instead of static multi-page reports typical of traditional ERP solutions, BeBI delivers the exact information you actually need, clearly and accurately.</li>
  <li>The intelligent decision support system provided by BeBI is your closest assistant in planning, execution, and management.</li>
</ul>

<p class="mt-4 text-sm leading-relaxed">
  If you want to customize BeBI’s capabilities to your own workflow beyond the standard versions and benefit from its advantages, please contact <a href="mailto:satis@techsin.com.tr" class="text-blue-600">satis@techsin.com.tr</a> for a demo and price quote.
</p>
`
  },
  {
    order: 7,
    id: "en-smartact",
    title: "SmartAct",
    slug: "en-smartact",
    excerpt: "An intelligent activity management system that tracks field sales teams in real time, verifies their location, and optimizes pre-sales processes.",
    image: `${BASE_API_URL}/products/8.png`,
    category: "our-products",
    features: [
      "Real-time field team tracking",
      "GPS location verification and control",
      "Pre-sales process management",
      "Detailed performance reporting",
      "Electronic activity logging",
      "Platform-independent usage",
      "Lead management system",
      "Sales meeting outcome tracking",
      "Data mining integration",
      "BI analysis support",
      "Error prevention controls",
      "Sales strategy forecasting"
    ],
    content: `
<div class="flex flex-col md:flex-row gap-8 items-stretch mb-12">
  <!-- TEXT FIRST -->
  <div class="w-full md:w-1/2 flex flex-col justify-center text-sm leading-relaxed">
    <p><strong>SmartAct: Pre-Sales Activity Management</strong></p>
    <p class="mt-4 text-sm leading-relaxed">
      SmartAct is a software product designed for the insurance sector and any industry with field sales teams. It enables real-time tracking of sales staff, performance reporting, and guiding sales teams toward leads with higher likelihood of success. This allows companies to better manage their teams and become more competitive in the market.
    </p>
  </div>

  <!-- IMAGE SECOND (RIGHT SIDE) -->
  <div class="w-full md:w-1/2 flex justify-center items-center">
    <img 
      src="${BASE_API_URL}/products/8.png" 
      alt="Consulting Services" 
      class="h-auto w-auto max-w-full max-h-96 rounded-lg shadow-md"
    >
  </div>
</div>

<p class="mt-4 text-sm leading-relaxed">
  It helps utilize the workforce efficiently. All pre-sales activities are carried out digitally, sales meeting outcomes are recorded, potential input errors are prevented through system checks, and companies gain a more effective sales force. Additionally, recording all data throughout the process contributes significantly to reporting, data mining, and BI-based process improvement methods.
</p>

<p class="mt-4 text-sm leading-relaxed">
  Companies struggling to track and measure the performance of field teams can overcome this challenge, and detailed reports provided by SmartAct allow for insights into sales strategies. Its unique location verification feature ensures that sales representatives are physically present at the meeting location.
</p>

<p class="mt-4 text-sm leading-relaxed">
  SmartAct is platform-independent, meaning it can be used on tablets, desktops, and laptops regardless of the operating system.
</p>
`
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Blog.deleteMany({ category: { $in: ["urunlerimiz", "our-products"] } });

    const withAuthor = products.map(t => ({ ...t, author: AUTHOR_ID }));
    const enWithAuthor = englishProducts.map(t => ({ ...t, author: AUTHOR_ID }));

    const inserted = await Blog.insertMany([...withAuthor, ...enWithAuthor]);
    console.log(`✅ Inserted ${inserted.length} products`);

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
    mongoose.disconnect();
  }
};

seedProducts();