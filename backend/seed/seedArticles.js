import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../models/Blog.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const BASE_API_URL = "https://api.techsin.com.tr";
const AUTHOR_ID = "689effab8bfc2e922d776e39";

const articles = [
  {
    order: 9,
    id: "tr-data-mining",
    title: "Veri Madenciliği – İş hedefinize ulaşmanız için yüksek çözüm olasılığınız",
    slug: "tr-data-mining",
    category: "makaleler",
    content: `
      <i>“…hiçbir şeyden tamamen emin olamazsın; o zaman tahmin yürütmek için kullanılan denklemler hataları en aza indirgemek içindir, hata payını ortadan kaldırmak için değil.”
      “Neden hataları ortadan kaldırmak istemeyelim ki?” diye sordu siyah saçlı Colleen adlı öğrenci.
      “İstersin. Ama hataları tamamen ortadan kaldırmak mümkün değildir; çünkü hatasız bir tahmin denklemini oluşturmak için gerekli olan tüm bilgileri asla edinmezsin.”
      “Neden olmasın?”
      …
      “Olasılık teorisi, bilim adamlarının bir cevaptan %100 emin olmasalar da doğru olduğunu söyleyebilmelerini sağlar. Çünkü olasılık teorisine göre yanılma payı çok ama çok az olduğu zaman gerçeği buldunuz demektir.”</i>
      – Adam Fawer, Olasılıksız-

      <p>İşte tam da bu aşamada veri madenciliği devreye giriyor. Dilimize veri madenciliği olarak çevrilmiş olsa da bu kavramın, yapılan işte, asıl amacın verinin çıkarılmasındansa bilginin elde edilmesi olduğu için <strong>bilgi madenciliği</strong> olarak aklımızın bir ucunda kalması iyi olur.</p>

      <p>Peki, nedir veri madenciliği? Birbirleriyle ilgisiz verilerden oluşmuş bir yığından işinize yarayacak bilgilerin elde edilmesidir. Madencilik kavramı da buradan geliyor. Taş – toprak arasından altın, gümüş gibi değerli madenin çıkarılması.</p>

      <p>Ne işimize yarar? Örnekle başladık örnekle devam edelim. Misafirlerinize küçük kâselerle çerez ikram ediyorsunuz. Eğer sadece çekirdek veya sadece fındık ikram ediyorsanız misafirlerinizin tabaklarında kalan çerezlerden kimin ikramınızı (örneğin çekirdeği) sevdiğini bilebilirsiniz. Diyelim ki her tür çereziniz var ve misafirlerinizin hangi çerezi daha çok sevdiğini bilmek istiyorsunuz. Her birinin tabağında kalanları çıkarabilirsiniz ama bu size sevilmeyen çerezi verir. Eğer misafirlerinizi izleyebildiğiniz bir kameranız olsaydı hangi çerezi yerken daha keyif aldığını, hangisini önce yiyip hangisini sona sakladığını hatta misafirleriniz arasında değiş tokuş edilerek paylaşılan çerezleri gözlemleyebilirdiniz.</p>

      <p>Misafirinizin hadi daha açık konuşalım müşterinizin memnuniyeti tabii ki önemli ama daha önemlisi sizin bu iş alanındaki kazancınız. Eğer her müşteriye, sadece istediği çerezi sunabiliyor olsaydınız; hangi çerezden ne kadar kullanacağınızı, kime ne sunacağınızı en başından bilirdiniz. Müşterinize sunduğunuz çerez tabağında, gereksiz yere yer kaplayan veya başka müşteriye sunabileceğiniz çerezler olmayacaktır. Müşteriniz, onun ne sevdiğini bilerek sunum yaptığınızda size bağlılık duyacak, öncelikli olarak sizi tercih edebilecektir.</p>

      <p>Belki de siz, müşterinizin en sevdiği çerezin yanında ikinci en sevdiği çerezi de bilip bir adım ileri gitmek veya o çerezle iyi giden içeceği müşterinize sunmak isteyeceksiniz. Bu durumda ne yapabiliriz? Yine veri madenciliği yardımımıza koşacaktır. Hadi örnekten yola çıkarak veri madenciliği kavramlarını ilişkilendirip soluklanalım.</p>

      <p>A veya B tipi çerez seven müşterilerinizin belirlenmesi <strong>kümeleme</strong>, potansiyel müşterinizin A veya B tipi çerez sevdiğinin çıkarılması ise <strong>sınıflandırma</strong> olarak kabul edilebilir. A tipi çerez seven müşterinin X tipi içeceği sevmesi ise <strong>ilişkilendirme</strong> olarak karşımıza çıkar.</p>

      <p>Sizin, potansiyel müşterinizin hangi tür çerezi sevdiğini tahmin ederek o çerezin yanında başka ikincil çerez veya içeceği satmanız ise doğruluk oranı yüksek bir modelde başarılı olarak sınıflandırılmış bir satışta, doğru ilişkilendirilmiş bir ürünle çapraz satış yapmanız demektir. Ki ihtiyaçlarını bildiğiniz ve ona göre ürün sunup gereksiz çerezlerle uğraştırmadığınız bir müşterinin, müşteriniz olarak kalması olasılığı hayli yüksektir.</p>
      <p>Dikkatli okuyucular, aradaki satırları da okuyanlardır. Başarının temelinde o satır arasındaki “doğruluk oranı yüksek bir model” yatmaktadır.</p>

      <p>Veri madenciliğinde elimizdeki tüm verilerden (örnekteki kamera görüntüleri) bir model oluşturulur. Bu model, gerçek verilerle eğitilir ve doğruluk oranı test edilir. Eğer modelin hata payı düşükse (bkz. yukarıdaki Olasılıksız kitabının alıntısı) o zaman model tahmininin doğru olacağı kabul edilir.</p>

      <p>Satır arasında vermediğim ama veri madenciliğinin temel iki sürecini de esirgemeden bu makaledeki son adımları atalım. Elimizdeki tüm verilerden model oluşturmadan önce geçilmesi gereken en önemli süreç bu verilerin temizlenmesidir. <strong>Ön işleme</strong> diye adlandırılan bu işlemde veri istatistiki gözlem ve ölçümler ile fazlalıklarından temizlenir; benzer veriler, kolay işlenmek üzere normalize edilir. Bu aşamayı, örneğimizdeki kamera görüntülerinin düzenlenmesi olarak düşünebiliriz. Müşteriler gelmeden önceki çekimlerin atılması, görüntü bozukluklarının düzeltilmesi ve benzer karelerin sıkıştırılması tam da buna denk gelir.</p>

      <p>Modelin doğruluğu da sabit kalmayacaktır. Davranışlar değiştikçe modelin kendini güncellemesi, yeni verilerle doğruluğun artırılması uzman uygulayıcıların vurgulayacağı son süreçtir. Zaman geçtikçe oluşturduğumuz model, araştırılan probleme daha detaylı bakarak istenilen çözüme doğru adımların atılmasını sağlayacaktır. Bu, hataların azaltılması demektir. Kameramız, zoom yaparak, aslında fıstık seven müşterimizin, o gün parmağı yara olduğu için tuzlu çerezlere uzanmamış olacağını fark edecektir. Onu, fıstık sevmeyenler sınıfına almak yerine, müşterimize kabuksuz fıstık sunmak da modelin başarılı bir sonucu olacaktır.</p>

      <p>TechSiN Bilişim Çözümleri, veri madenciliği ürün ve çözümleri ile başından sonuna sizi hedefinize ulaştırmak için atılacak en doğru adımdır. Neyse ki TechSiN’in bu alanda doğru tercihiniz olduğunu bulmak için bir modele ihtiyacınız yok. Ne de olsa TechSiN, “başarınızın bilişim ortağı”dır. Alanında tecrübeli firmamızla iletişim için <a href="http://www.techsin.com.tr/bize-ulasin/" target="_blank" class="text-blue-600 underline">http://www.techsin.com.tr/bize-ulasin/</a></p>

      <p>Yazıyı bir spoiler ile tamamlayalım. Eğer işinizi ve hedefinizi beraber modellersek müşterinizi size en uygun şekilde yönlendirebiliriz.</p>

      <p><i>“Ağır kokuyu ikinci kez duyduğunda birden çikolatalı dondurma çekmişti canı”</i> – Olasılıksız –</p>
    `,
  },
  {
    order: 8,
    id: "tr-data-mining-preprocessing-all-data-normal",
    title: "Veri Madenciliği – Önişleme veya “tüm veriler normal”",
    slug: "tr-data-mining-preprocessing-all-data-normal",
    category: "makaleler",
    content: `
<p>Herhangi bir durumun kontrol altında olduğu ve beklenilen sonucun alınacağı müjdesini veren bir cümledir “tüm veriler normal” cümlesi. Operasyondan çıkan bir hastanın güncel durum verileri veya havaalanında yurtdışına çıkış yapan yolcunun pasaport kontrolünde aldığı onay gibi. Eğer tüm veriler normal ve istenilen gibiyse devam etmek için bir engel kalmamıştır.</p>

<p>Veri madenciliğinde, verilerin ön işlenmesi ve normalizasyonu da bu örneklerle örtüşmektedir. İçinde değerli bilgi arayacağınız veri yığınınız kullanıma hazır hale getirildiğinde artık arama işine başlayabilirsiniz demektir.</p>

<p>Peki, nedir bu, tüm veriler normal esprisi? Bir ev inşa edeceğimizi hayal edelim. İnşaat için birçok malzeme önümüzde duruyor. Gerçek hayatta böyle olmasa da veri madenciliğinde bu malzemeler (veriler) üst üste yığılmış olarak karşımıza çıkar aslında. Birbirleriyle ilişkili olma potansiyeli olan farklı kaynaklardan toplanmış verileri sonuç üretmek üzere bir araya getiririz. Örnekten çok uzaklaşmadan ev hayalimize geri dönelim. Keresteler, kiremitler, yalıtım malzemeleri, cam ve beton bloklar ve daha niceleri. Hedefimizi biliyoruz malzememiz önümüzde. Eğer bir mimarımız varsa, evimizin planı da hazır inşa edilmeyi bekliyor demektir.</p>

<p>Biraz ileri saralım. Diyelim ki temel atıldı döşemeye geçildi. Zemini oluştururken döşeme tahtaları yığınına gider ve yığından sırayla birer tahta alıp yan yana dizmeye başlayabiliriz. İşimiz bittiğinde güzel bir iş çıkmış olması için şanslı olmamız gerekir. Uzunlukları ve genişlikleri farklı olan malzemelerle ezbere ortaya konulan bir döşeme, sadece macera severleri memnun edecektir. Tüm döşeme tahtalarının en boy ölçülerinin aynı veya uyumlu olması arzu edilen bir döşemeyi karşımıza serecektir.</p>

<p>Sanırım normalizasyon ve önişleme kavramları şimdi biraz daha yerli yerine oturmuştur. Önişleme dediğimiz bu sürecin adımlarını yukarıdaki örnekle pekiştirelim. Eğer döşeme tahtaları arasında çatlak, rengi bozuk ve hatta tahta bile olmayan malzemeler varsa bunların ayıklanıp atılması iyi bir sonuç için kaçınılmazdır. Verilerimizi oluşturan kayıtlar üzerinde gerçekleştirdiğimiz bu işleme veri temizleme denmektedir. Bu işlemde, gözümüze çarpan ayrık malzemeyi (veriyi) atmak, iyi bir usta işi değildir. Pürüzlü malzemeler zımparalanabilir, çatlaklar tamir edilip değerlendirilebilir. Unutmamak gerekir ki yığınla olsa da her veri bizim için değerlidir.</p>

<p><strong>Verinin dönüştürülmesi</strong> de ön işlemede bizi hedefimize taşıyan adımlardan biridir. Diyelim ki o yığınla malzemeniz arasında köşebendiniz çıkmadı ya da tozluklar döşemenizle aynı renkte değil. Ya o kadar malzemenin varlığına rağmen işi bırakıp yeniden alışverişe çıkacaksınız ya da elinizdeki uyumsuz malzemeyle sürekli gözünüze batabilecek bir sonuca ilerleyeceksiniz. Aslında, ustanın çözümü, bu ikisinden farklı olacaktır. Usta, eldeki döşeme malzemesini ihtiyaca göre köşebent veya tozluklara dönüştürebilecektir.</p>

<p>Bir başka açıdan dönüşüm, yığınla duran ahşap malzemenin gruplanarak döşeme, tavan ve mobilya olarak gruplanması olarak gerçekleştirilir. Hızlıca yapılan bu gruplama, hangi malzemeyi nerede kullanacağınızı kolaylaştırır. Bu aşamadan sonra döşeme yaparken çatı malzemeleriyle uğraşmazsınız. Eğer yapboz yaparken parçaları renk veya şekillerine göre ayırıp sonra çözüme geçiyorsanız veri dönüşümü konusunda adım atıyorsunuz demektir. Desenli karoların döşenmesi de yapboz gibidir aslında.</p>

<p><strong>Öznitelik seçimi</strong>ne tam da bu örnekle bir giriş yapabiliriz. Probleminiz ortadaki o üç kenarlı parça ise, üç kenarlı olma özniteliğine sahip karolar (veriler) arasında çözümü aramanız akılcı bir yaklaşımdır. Sonra komşu renklerin uyumluluğuna bakarsınız. Bir kenarı mavi bir kenarı beyaz olma özniteliği olanlar da çözüm kümenize dâhil olur. Sizi sonuca götüren son öznitelikse çizgili karolar olabilir. Seçtiğiniz bu üç öznitelik, bu problemle karşılaştığınızda sizi, uygun olan karolara hızlıca taşıyacaktır. Eğer mermer döşeme yapıyorsanız damarları denk getirmeniz, renk uyumunuz sağlamanız daha zordur. Öznitelik seçiminin yapboz tecrübenizi aşacağı bu durumda, işi uzmanına bırakırsanız sonuçtan memnun kalacağınız açıktır.</p>

<p>Özetle, verinin işlenebilir hale getirilmesi, belirlenen aralıklarca ifade edilerek, veri madenciliği algoritmasının etkinliği ve performansının artırılması ve istenilen analiz sonucuna ulaşılması için yapılan ön işleme normalizasyon diyebiliriz. Bilinen o ki, özetler, kimi zaman asıl işi yansıtmak için yetersiz kalır. Konusunda uzman aramak için madencilik yapmanıza gerek yok. TechSiN Bilişim Çözümleri, veri madenciliği ürün ve çözümleri ile size aradığınızdan fazlasını sunar. Ne de olsa TechSiN, “başarınızın bilişim ortağı”dır. Alanında tecrübeli firmamızla iletişim için <a href="http://www.techsin.com.tr/bize-ulasin/">http://www.techsin.com.tr/bize-ulasin/</a>.</p>

<p>Yazının başındaki hayalinizdeki eve gelince; TechSiN olarak henüz inşaat sektöründe yokuz ama uzmanlığımızla sizi iş hedefinize ulaştırdığımızda zaten hayalleriniz o evin ötesine geçecektir. Hedeflerinizi gerçekleştirebilecek misiniz? Cevabımız: TechSiN ile tüm veriler normal.</p>
`
  },
  {
    order: 7,
    id: "tr-letter-to-computer-engineering-student",
    title: "Bilgisayar Mühendisliği Öğrencisine Mektup",
    slug: "tr-letter-to-computer-engineering-student",
    category: "makaleler",
    content: `
<p>Sevgili Bilgisayar Mühendisi Adayı Arkadaşım,</p>

<p>Biliyorum şu an her şey zor geliyor sana. Öğrenecek o kadar çok konu var ki! Bir de dersler, projeler, sınavlar…</p>

<p>Ama bir yerden başlamak gerekiyor.</p>

<p>Sakın motivasyonunu kaybetme! Mesleğinde ihtiyacın olan ilk şey mo-ti-vas-yon. Öğrenme isteğin azalmaya başladığında kork! Mesleki becerilerin de öğrenme isteğinle birlikte kaybolur. O yüzden sürekli yeni şeyler öğrenmeye çalış, dergileri oku, haber sitelerini takip et. Sevdiğin veya ileride çalışmak istediğin şirketlerin faaliyetlerini yakından takip et.</p>

<p>Sonra, bak bakalım insan kaynakları sitelerine, mezun olup da iş aramaya başladığında neler bilmeni istiyor şirketler. Adını bile ilk kez gördüğün yetenekler istiyorlar senden. Araştır bakalım, neymiş onlar. Bir liste çıkar kendine öğrenmek istediklerin için. Sonra sıraya koy ve başla birinden.</p>

<p>Staj yapmak istediğin, hayalindeki şirketlerin listesini çıkar. Bu şirketlerde hangi konularda çalışma yapıldığını araştır. Senin öğrenmek istediklerine uygun olup olmadığını incele. Stajla ilgili ayrıca yazacağım sana.</p>

<p>Proje fikirlerini araştır mesela. Hiç yapılmamış bir şey bulmaya uğraşma ilk başta. Daha önce bilinmeyen, harika bir kek yapmayı herkes ister ama önce internetten kek tarifi bulup bilinen tarifle başlarsın değil mi? Biraz elin alışınca zihnin de açılacak, meraklanma. Kim bilir, bir süre sonra belki de çok parlak bir fikir bulabilirsin. Bu yüzden, önceden yapılmış proje fikirlerini gerçekleştirmeye çalış. Başka neler olabilir diye düşünmeyi de ihmal etme.</p>

<p>Hep kaynaklar İngilizce diye şikayet ediyorsun, biliyorum. O zaman öğrendiklerini Türkçe olarak paylaş; bir blog oluştur mesela. İngilizce eksiklerini tamamlamayı da ihmal etme. İşe başladığında çoğu yeniliği senin araştırman beklenecek, haliyle Türkçe’sini bulamayacaksın. O yüzden çalış, alt yazısız yabancı film izle, hatta oyun oyna. Tabii oyunda İngilizce öğreniyorum deyip de dersleri aksatma 😉</p>

<p>Küçük küçük araçlar var çalışmalarını süsleyeceğin. Onları araştır, ben bazılarını burada yazacağım. Bakarsın biri işine yarar. Yazacak çok şey var. Ara ara bak buraya, belki sana başka mektuplar bulursun. Diğer yazılara da göz at, fikir olsun.</p>

<p>Aaa, bu arada, bize yazmaktan çekinme lütfen. TechSiN Bilişim Çözümleri olarak, genç meslektaşlarımızı çok seviyoruz. Her sene stajyerlerimiz oluyor. Bazen stajyerlerimiz mezun olduklarında çalışma arkadaşımız oluyor. En güzeli de bu. Sen de staj için olsun olmasın arada yaz bize. Tanışmış oluruz. Birlikte çalışmasak da, ileride sen iş hayatına atıldığında bir iş toplantıda karşılaşabiliriz.</p>

<p>Görüşmek üzere,</p>

<p>Sevgilerimle,</p>

<p>TechSiN’li Meslektaşın</p>
`
  },
  {
    order: 6,
    id: "tr-computer-engineering-intern-letter",
    title: "Bilgisayar Mühendisliği Stajyerine Mektup",
    slug: "tr-computer-engineering-intern-letter",
    category: "makaleler",
    content: `
<p>Sevgili Stajyer,</p>

<p>Daha önce tanışmadıysak önce buradaki yazımı okuyabilirsin. Okumasan da buradan devam edebilirsin.</p>

<p>Genel öneriler yazmıştım sana daha önce. Şimdi de stajla ilgili konuşalım istedim.</p>

<p>Mezun olunca nerede çalışmak istiyorsun? Hayal et… Önce orada staj yapabilir misin, araştır. Birçok firma her sene stajyer alıyor, TechSiN Bilişim Çözümleri gibi. Bu şirketlerin iş ilanlarını kontrol et. Neler bilmen gerekiyor, staj yapınca neler öğrenebilirsin, ipuçlarını kovala.</p>

<p>Genelde stajyer ilanı verilmez, kimse aramadan sen başvuracaksın. Evet, sana iş düşüyor! Şöyle düşün, iş hayatına başlarken kriterler var ama staj yapacaksan çoğunlukla yok 😀 Aklında olsun, bazen sınavla stajyer seçmek zorunda kalabilir şirketler. Çok başvuru olduğunda rastgele seçmemek için mecburen sınav yapmak gerekiyor. Hak vermelisin, herkesi stajyer olarak alamıyor bazı şirketler. Mümkün olduğunca erken başvuru yap, belirli sayıda stajyer alınabiliyor. Elini çabuk tutmalısın.</p>

<p>Hatta staj başvurusu yaparken bir ön yazı hazırla; heyecanını, neler öğrenmek istediğini, kariyer hedeflerini paylaş. Benden sana ipucu: Böyle stajyerler daha sonra işe başlama ihtimali yüksek stajyerler 😉</p>

<p>Sana verilen işler bazen birer sınav olabilir. Senin o işe gösterdiğin ilgi ve özen, senin ileride o şirkette işe başlayıp başlayamayacağınla ilgili sinyalleri verecek. Bu yüzden öğrenci olduğunu unut ve orada bir çalışan olduğunu düşün. Bu sayede belki de daha staj yaparken iş bulmuş bile olabilirsin. Örnekleri var; ben gördüm.</p>

<p>Staja başladığında sana bir iş verilmediyse “Aklımda şöyle bir proje var, yapabilir miyim?” diyebilirsin. Bazen problemleri kendin çözmek zorunda kalacaksın, hemen moralini bozma kimse yardım etmiyor diye. İşe girdiğinde çoğu zaman kendin araştırıp çözmek zorunda kalacaksın zaten. Bunu da stajın bir parçası olarak düşün: Problem çözme becerin gelişiyor.</p>

<p>Staj defterine neler yazacağını günlük olarak not et bir yerlere. Microsoft OneNote, Notepad++, defter, kağıt … Mutlaka yaz. Stajın bittiğinde gün gün ne yaptığını hatırlamayacaksın maalesef. Koskoca bir ay çalıştın; onca şey öğrendin; nasıl hatırlayabilirsin her şeyi? Stajın sonlarına doğru tüm yazdıklarını toparlamak daha kolay olacak, inan bana.</p>

<p>Yapacağın stajların iş hayatının bir provası olduğunu aklından çıkarma. Her zaman gözünü açık tut. Sadece mesleki bilgi edinmek için değil, iş yaşamının kurallarını öğrenmek için de bir fırsattır staj.</p>

<p>TechSiN Bilişim Çözümleri’nde de staj yapabileceğini hatırlatayım. Burada iş hayatını deneyimlemek istersen yaz bize, lütfen çekinme. Seni de aramızda görmek isteriz.</p>

<p>Stajlarında ve iş yaşamında başarılar dilerim.</p>

<p>Görüşmek üzere,</p>

<p>Sevgilerimle,</p>

<p>TechSiN’li Meslektaşın</p>
`
  },
  {
    order: 5,
    id: "tr-plsql-exceptions",
    title: "PL/SQL İstisnaları (Exceptions)",
    slug: "tr-plsql-exceptions",
    category: "makaleler",
    content: `
<p>• Hata mı? Benim kodumda hata olmaz!</p>
<p>• Hayır, bunlar senin yaptığın hatalar değil.</p>
<p>• Oracle mı yapmış hatayı?</p>
<p>• Hayır, o da yapmamış.</p>
<p>• Kim yapmış peki?</p>
<p>• Kullanıcı😀</p>

<p>Merhaba Sevgili Meslektaşım,</p>

<p>Tabii ki kullanıcı da hata yapabilir, geliştiriciler de. Fakat konumuz şu, programımız çalışırken bir hata oluştuğunda sebebini anlayabilir miyiz? Evet, PL/SQL bloklarımızda istisnalar yazarak bunu yapabiliriz. En çok karşılaşılan istisnaları PDF olarak hazırladım. Bir süre gözünün önünde tutarsan faydalı olacağını göreceksin. Sadece isimleri ve hata kodları var. Detaylarını araştırmak için kocaman bir Internet.😀</p>

<p>İstisnaların detayları yoksa bu yazı ne için? Sana istisnaların önemini hatırlatmak, birkaç tane en çok kullanılanı yazmak ve işte bu PDF dosyasını sana ulaştırmak için.😉</p>

<p>Başlıyoruz!</p>

<p>NO_DATA_FOUND en çok kullanacağın istisna olabilir. “Aradığınız kayda şu anda ulaşılamıyor. Lütfen daha sonra tekrar deneyiniz.” Bakma sen tekrar dene dediğime. Yeni kayıt eklenmediyse ne kadar denersen dene aynı istisna ile karşılaşacaksın.</p>

<p>TOO_MANY_ROWS da bir satır okumaya çalışırken bir ordu kaydın seni bulması durumunda işine yarayacaktır.</p>

<p>Sonraaa! En sevdiğim: DUP_VAL_ON_INDEX<br>
Önce kısıtlar (constraints😉) eklersin tabloya, sonra bu kısıtlara uygun olmayan kayıtlar eklemeye çalışırsın. Olmaz! Yapmamalısın! Yaptıysan bu istisna ile yakalamalısın.</p>

<p>ZERO_DIVIDE! Zorro gibi gelmiştir bana hep, elinde kılıcıyla sıfıra karşı savaş açmış bir kahraman! Bu da sıfıra bölmeye çalışıp da bölemeyeceğin zaman gelir başına.</p>

<p>PDF dosyasındaki diğer hataları sen araştırabilirsin. Hatta yukarıda yazdıklarımı da araştır, örnekler yazıp dene. Kendin yazmadan aklına yazılmıyor maalesef.</p>

<p>İstisnalar gözümün önünde dursun diye hazırlamıştım. İşte bak, benim masamda böyle görünüyor mesela😀</p>

<img src="${BASE_API_URL}/blog/11.jpg" alt="Platform 1" class="inline-block mx-2 align-middle max-w-full h-auto">

<p>Umarım senin de işine yarar.</p>

<p>Sevgilerimle,</p>

<p>TechSiN’li meslektaşın</p>
`
  },
  {
    order: 4,
    id: "tr-new-year",
    title: "Yeni Yıl",
    slug: "tr-new-year",
    category: "makaleler",
    content: `
<p>Yeni bir yıl daha yaklaşıyor.</p> <p>Kimine göre diğer günlerden bir farkı yok ama kabul edelim yine de bir başlangıç heyecanı olmuyor değil. Diyete başlamak için de hep Pazartesi başlarım denmez mi? Onun gibi bir şey işte.</p> <p>Güzellikler olsun bu yılda.<br> Arabam olsun. Evim olsun. Yepyeni telefonum olsun. Çok param olsun.<br> Ağaçlar, ormanlar yok olmasın, yanmasın. Adaletli olsun tüm dünya.<br> Kadınlar, çocuklar ölmesin. Gencecik fidanlar solmasın. Terör olmasın. Savaşlar olmasın. Barış olsun tüm dünyada.</p> <p>Ne güzel dilekler…</p> <p>Hepimizin beklentileri oluyor yeni yıldan, sanki yeni gelen yıl bunları beraberinde getirecekmiş gibi. Sonuçta yeni yıl yurt dışından çikolata, oyuncak getiren lüks otomobilli amca değil. Noel Baba da kostüm olarak satıldığına göre öyle evrene mesajları gönderip beklemekle olmaz.</p> <p>Dileklerin gerçekleşmesi için biz ne yapıyoruz diye oturup düşünmek lazım. Dileklerin, hediyelerin listesi yerine, istediklerimizin olması için neler yapmalıyız düşünüp yazmalıyız bir kenara, hatta zihnimize kazımalıyız her an hatırlamak için.</p> <p>Bir de başkalarının dileklerini düşünmek lazım; bazen duymak hatta görmek… Onların dileklerini gerçekleştiren olmak için elimizden bir şeyler gelir mi diye kafa yormalıyız belki de.<br> Eşimizin, annemizin, babamızın, anneannemizin, babaannemizin, dedemizin, sevdiklerimizin sohbete ihtiyacı olabilir.<br> Çocuğumuzun yeni oyuncaklara değil, bizimle oyun oynamaya ihtiyacı olabilir.<br> Çok uzak bir köyde bir öğretmen soğuktan üşüyen öğrencilerine mont istiyor olabilir.<br> Komşumuz yalnız başına kapıları gözlüyor, bir gelen olsa da iki çift laf etsek, tavla oynasak diyor olabilir.<br> Yıllardır gitmediğimiz köyümüzün bize ihtiyacı olabilir.<br> Sokakta yaşayan canların bir kap suya ihtiyacı olabilir.<br> Bindiğimiz asansörde karşılaştığımız insanların sıcak bir günaydına ihtiyacı olabilir.<br> Otobüste ayakta kalan teyzenin, amcanın, engellinin, hamileinin oturmaya ihtiyacı olabilir.<br> Pedallayarak işine giden cesur yüreklerin araçların saygısına ihtiyacı olabilir.<br> Ambulansta hastaneye yetişmeye çalışan hastanın birkaç yıl daha nefes almaya ihtiyacı olabilir.<br> Babası hayatta olmayan çocuklar eğitimleri için destek bekliyor olabilir.</p> <p>Bir düşünün bakalım, bu yıl siz kimlerin dileklerini gerçekleştirebilirsiniz.</p> <p>Yapabiliriz! Herkes bir ucundan tutarsa başarabiliriz!</p> <p>O zaman….</p> <p>Bu yıl da sağlık olsun, huzur olsun, kalplerde ve dillerde güzellikler olsun. Yeni yılınız kutlu olsun.</p> <p>TechSiN’den sevgilerle…</p> <p>Aralık, 2016</p> `
  },
  {
    order: 3,
    id: "tr-being-part-of-a-whole",
    title: "Bir bütünün parçası olmak!",
    slug: "tr-being-part-of-a-whole",
    category: "makaleler",
    content: `
<p>Yazılım geliştirmek… Ekip işi!</p> <p>Peki, koroda şarkı söylemek?</p> <p>Bir ekip içerisinde yer alıp bilgisayar yazılımları geliştirmek ve koroda şarkı söylemek; ne kadar benzer yanı olabilir ki?</p> <p>Oldukça fazla! Sanılandan fazla.</p> <p>Koroda esas olan şey bir bütünü oluşturabilmektir. Farklılıklarla güzele ulaşmak mümkündür, koroda şarkı söylerken. Koristlerin her biri aynı anda tek bir ses çıkarabilirken, dinleyiciler sesleri bütün olarak algılayabilme şansına sahiptir. Güzelliğe ve huzura şahit olurlar.</p> <p>Herkesin sesi, şarkı söyleyiş tarzı farklıdır. Tek başına söylerken kendine özgü olmak, istediğin gibi söylemek mümkün iken, koroda söylerken diğer koristleri dinlemek, şefi takip etmek hayati önem taşır. Birlikte nefes almak, birlikte nefes vermek gerekir.</p> <p>Provalarda düzenli bulunmak, ekip ruhunu yakalamak için önemlidir. Provalara katılmayıp ekip ruhunu kaybetmek sizi koronun bütünüyle aynı enerji seviyesine çıkmaktan alıkoyar.</p> <p>Koroya ayak uydurabilmek için sadece provalarda bulunmak da yetmez. Tek başına çalışmalar da önemli. Kendinizi geliştirmek ve eksik yönlerinizi tespit edip onlar üzerine yoğun çaba göstermeniz gerekir.</p> <p>Çıkardığınız sesler, sözler, koroyla birlikte daha anlamlı hale gelir.</p> <p>Şimdi bunları bir yazılım ekibine uyarlayalım…</p> <p>Hedeflenen şey, arayüzüyle, kullanılabilirliğiyle, kullanıcının görmediği ama sonuçlarından etkilendiği metotlarla, veritabanıyla, sunucusuyla, tekniğiyle, teknolojisiyle bir bütün olacak yazılımı geliştirmek. Her biri ayrı uzmanlık gerektiren ve ürün haline geldiğinde kullanıcısına harika bir deneyim yaşatan bir yazılım.</p> <p>Ekipteki herkesin ayrı becerileri, görev ve sorumlulukları vardır. Her görev ayrı uzmanlığı ve tecrübeyi gerektirse de ekip olmak, ekibin bir parçası olmak gerekir. Ekibin diğer üyeleriyle etkileşimde bulunmak, proje yöneticisine/ekip liderine uymak gerekir. Birlikte çalışmak, birlikte gülmek, zorlukları birlikte göğüsleyebilmek gerekir.</p> <p>Yazılım geliştirirken birlikte çalışmak ekip ruhunu yakalamak için önemlidir. Bu çalışmalardan uzak kalmak sizi ekibin dışında bırakır.</p> <p>Ancak ayak uydurabilmek için sadece bu çalışmalarda bulunmak da yetmez. Yenilikleri takip etmeniz, varsa eksikliklerinizi tamamlamak için ek çalışmalar yapmalısınız.</p> <p>Yaptıklarınız, bütünün parçası olabildiğinde anlamlı hale gelir.</p> <p>Peki, ne yapalım?</p> <p>Ekibinizi toplayıp varsa bir koro festivaline, yoksa bir koro konserine gidin. Göreceksiniz, birlikte çalışmanın sonuçlarına şahit olduğunuzda ekip motivasyonunuz artacak! Çıkışta birlikte kahve içip sohbet etmeyi unutmayın.</p> <p>Birlikteliğin getirdiği güzellikleri paylaşmak dileğiyle.</p> <p>TechSiN’li bir korist</p> `
  },
  {
    order: 2,
    id: "tr-tips-for-new-software-developers",
    title: "Yeni İşe Başlayan Yazılımcılara Öneriler",
    slug: "tr-tips-for-new-software-developers",
    category: "makaleler",
    content: `
<p>Genç insanlar olarak hayatımız hızlıca değişmekte ve gelişmektedir. İlkokul, lise, üniversite derken en sonunda sıra hayatımızı devam ettirmemiz, farklı hedeflerimize ulaşmamız için bize maddi kaynak sağlayacak iş hayatına gelmiştir. Bu silsile birbirini takip ederken büyüklerimiz ve deneyimli olan arkadaşlarımız hep bir sonraki adıma geçtiğimizde rahatlayacağımızı söylerler, fakat bir sonraki adım aynı bilgisayar oyunları gibi bölüm geçtikçe karmaşıklaşıp zor bir hal almaktadır. Söylenen sözleri düşündükçe “Hani rahatlayacaktım?” dersiniz fakat bu sözler size cesaretlendirme ve hedefinize odaklanmanızı sağlayacak avuntu olmaktan ileriye geçemez. Bu hayatın gerçeklerinden biridir.</p> <p>İş hayatımıza geçişin ilk adımı iş aramaktır. Kimi insan için ilk adım kolay, kimileri için uzun ve zorlayıcı olur. Bir bilgisayar mühendisi veya yazılım sektöründe çalışmak isteyen kişiler için bu adımı kolay atlatmanın farklı yöntemleri vardır. Yeni işe başlayacak yazılımcı/mühendis, hayatının her safhasında olduğu gibi iş aramada da kendi hedeflerini belirlemiş olmalı. Böylece bu hedefler iş ararken size kolaylık sağlar ve sizi farklı yönlere savrulmaktan kurtarır. Çoğu firma sizin yeteneklerinize ve kişiliğinize bakmaktadır, bunların istisnası tabii ki var, örneğin sayıları az olmakla birlikte bazı firmalar mezun olduğunuz üniversitenin adıyla da ilgilenir ama yine de önemli olan sizin yeteneklerinizdir. Bu girişten sonra tüm bu süreçlerden geçtiğinizi farz ederek asıl konuma geliyorum.</p> <p><strong>İlk İş Ve Yeni Bir Çevre</strong></p> <p>Yazılım sektöründe iki yıldır çalışmaktayım, işim gereği hem kendi firmamda hem de outsource olarak farklı firmalarda bulundum. Bulunduğum ortamlarda genelde yaş olarak en küçük ben oldum. Bu yaş farkı, bazı meslekler için ortama ayak uydurma konusunda sıkıntı olabilir fakat yazılım sektöründe bu durumu avantaj olarak kullanabilirsiniz. Çünkü yaş ve deneyim arttıkça belli kanallara odaklanmış olma ihtimali daha yüksektir. Bizler genç olarak, .net, java veya farklı diller ile iş ararken otuzlarını yaşayan bir yazılımcı bir dilde iş hayatını devam ettirmeyi tercih eder. Mantık olarak bu dillerin kullanımı aynıdır fakat iş hayatında yaş ilerledikçe bir daldan başka bir dala atlamak pek mantıklı gelmez, çünkü bir alanda kendini geliştirmiş bir kişi yeni bir alana geçiş yapmak değil de deneyim kazandığı alanda devam etmeyi tercih eder.</p> <p>Genç olmanızın yazılım sektöründe sorun olmayacağının başka bir kanıtı da yazılımcıların değişime ve gelişime daima açık insanlar olmalarıdır. Zaten böyle olması zorunludur; çünkü dünyada en hızlı değişen sektör bizim sektörümüzdür.</p> <p>Yeni işe girdiğinizde yapmamanız gerekenlere gelelim. İlki, çalıştığınız ortama uymakta direnmektir. Buna direnmeniz sizin ortamda istenmeyen kişi olmanıza sebep olacaktır. Bu sözlerim karakterinizden ödün vermeniz gerektiği anlamına gelmez aksine işe girdiğinizde üniversitede görmediğiniz karakterlere, düşüncelere sahip insanlarla tanışmanız, onların dünyalarını keşfetme ihtimaliniz oldukça yüksektir, bu da değişime ve gelişime açık insanlar için bir avantajdır.</p> <p>Diğer bir konuda tabii ki hepimizin heyecanla ay başını beklememizi sağlayan maaş meselesidir. Bu konuda oldukça dikkatli olmalısınız. Çünkü yazılım sektöründeki özel firmalarda, devlet dairelerinde çalışan memurlar gibi sabit maaşlar yoktur. Maaşınız sizin bilgi birikiminize, yeteneklerinize, deneyiminize, sorumluluklarınıza ve işe girdiğiniz firmanın standartlarına göre değişecektir. Tüm bu değişkenlerden ötürü maaşlar kişiye özel olacağı için iş arkadaşlarınız ile bu bilgiyi paylaşmak veya iş arkadaşlarınızın sizinle bu bilgisini paylaşması firma içinde anlaşmazlıklara sebep olacağı gibi sizin de huzurunuzu kaçırabilir, işinize olan ilginizi kaybetmenize sebep olabilir.</p> <p>Maaş konusunda devam edecek olursak bir hocamın tavsiyesini sizinle paylaşmak isterim ki hayat felsefeniz içinde olması gereken bir başlıktır: “Hırslarınıza kapılmamak”. Hırslarınız sizi ele geçirirse ne yeni işinizden ne gelirinizden ne de hayatınızdan memnun olamazsınız. Bu sizi farklı yönlere sürükleyecektir ki işin sonunda hem iş yerinde hem de hayatınızda yalnız kalmanıza sebep olacaktır.</p> <p><strong>Yazılımcı Kafası</strong></p> <p>Eğer yazılımcı olarak işe alındıysanız ilk olarak tebrik eder daha sonra geçmiş olsun demek isterim. Yazılımcılık hiçbir mesleğe benzememektedir . Çünkü doktor hasta ile, makine mühendisi bir makine ile, öğretmen öğrenciler ile uğraşırken bizler hem insanlar ile hem de el ile tutulamayacak bir şey ile uğraşmaktayız.</p> <p>İnsanlar ile uğraşmak oldukça zordur. Fakat bu olumsuzluğun yanında insanların olumlu geri dönüşleri sayesinde iş memnuniyetiniz artmaktadır. Bir yazılımcı, müşterinin istediğini yerine getirirse her iki taraf da memnun olacaktır; fakat zor beğenen, kolay memnun olmayan, ince eleyip sık dokuyan müşteri yazılımcıyı oldukça zorlayacak ve yoracaktır. Bu tür durumlarda yapmanız gereken derin bir nefes alıp, yeniden işe koyulmaktır. Unutmayın ki zahmetsiz rahmet olmaz.</p> <p>Sektörde sadece insanlar değil, yazılımı geliştirirken bilgisayarınızla geçirdiğiniz uzun saatler, saatlerce uğraştırıp sonra üstüne hata veren kodlar da canınızı sıkacaktır. O yüzden kendinize iş dışında sizi rahatlatacak, kendinizi motive edecek uğraşlar bulmanız sizin için oldukça önemlidir.</p> <p>Yeni işe giren birisi olarak yazılımcı kafasına ulaşmanız fazla zaman almayacaktır. İlk sorumluluğunuzu aldığınızda karşılaşacağınız hataları bir türlü çözememeniz, süreci yönetirken yaşayacağınız zorluklar sizi yıpratabilir ama zaman ilerledikçe profesyonelleşeceksiniz ve işleriniz ivme kazanacak. Başlangıçta zor duruma düşmeniz olağandır, bu süreçte yapmanız gereken şey sakin olmak ve yardım istemektir. Bazılarımız işi gurur meselesi yaparak “Ben zaten bunu biliyorum”, “Ben yaparım” düşüncesine kapılır, bu durum sizin daha çok hata yapmanıza ve durumun, işin içinden çıkılmaz bir hal almasına sebep olabilir. Atalarımızın dediği gibi, bin bilseniz de bir bilene sormak, kör noktalarınızı görmenizi ve işi daha rahat çözmenizi sağlayacaktır. Sorunları çok iyi bilen birisine sormanız gerekmez, bazen bir arkadaşınıza veya sizin gibi işe yeni girmiş birine sormak bile faydalı olacaktır. Çünkü yazılım, belli kurallar çerçevesinde yapılsa bile kişinin kendi düşünceleri, eğitim aldığınız okulların tarzı farklıdır. Farklı bakış açıları ile olaya yaklaşımlar size fayda sağlayacaktır. Bu durum, her başınız sıkıştığında başka birine sormanız gerektiği anlamına gelmemektedir. Yardım istemeniz yöneticiniz tarafından yadırganmaz fakat her karşınıza çıkacak zorlukta yardım istemek sizin zararınıza olacaktır. Hazıra alışmış olmak yazılımcı olarak farklı olaylar karşısında çözüm üretmenize ve çözüm için gerekli araştırmayı yapma kabiliyetinizi geliştirmeye engel olacaktır.</p> <p>Unutmayın yazılımcı olarak, hele ki yeni başlayan biri olarak, çok farklı durumlar karşınıza çıkacaktır. Bunlardan korkmayın! Problemlerin üzerine gitmek sizi daha çok motive edecek ve geliştirecektir. İşin temel kuralı, işinizi sevmektir. Hangi meslekten olursa olsun; işinizi, çalıştığınız yeri, çalıştığınız arkadaşlarınızı sevmeyi, onlarla ortaya bir şeyler çıkarmayı sevmelisiniz.</p> <p>Hayatta başarılı olmanız dileğiyle, kolay gelsin!</p> `
  },
  {
    order: 1,
    id: "tr-dont-delay-this-year",
    title: "Bu Sene Erteleme",
    slug: "tr-dont-delay-this-year",
    category: "makaleler",
    content: `
<p><strong>Bu Sene Erteleme…</strong></p> <p>Burada olmasam yaşardım dediğin ülkenin dilini öğrenmeyi, almak istediğin o sertifika için harekete geçmeyi, alıp alıp kitaplığa dizdiğin kitapları okumayı erteleme!</p> <p>Kendine özen göstermeyi, hep kararlar alıp bıraktığın diyeti, her sene başlayıp bir türlü düzenli yapamadığın sporu, hep izlerken beğendiğin o dansı öğrenmek için kursa gitmeyi erteleme!</p> <p>Epeydir konuşmadığın arkadaşınla barışmayı, asansörde karşılaştıklarına selam vermeyi, kapı komşuna kek götürmeyi, o çok sevdiğin tatlının tarifini denemeyi, arkadaşlarını yemeğe davet etmeyi, kendine bir hobi edinmeyi, deneyip deneyip yanılarak sürekli yeni şeyler öğrenmeyi erteleme!</p> <p>Sevdiklerini aramayı, onlara sevdiğini söylemeyi, çocuklarla oyun oynamayı, uzaktaki yakınlarını ziyaret etmeyi, arkadaşlarınla vakit geçirmeyi erteleme!</p> <p>İşe kendini kaptırıp çocuklarına ayırmadığın vakti onlara vermeyi, çocuklarına onları ne kadar çok sevdiğini söylemeyi, eşinin gözlerine bakarak ona hala nasıl aşık olduğunu söylemeyi erteleme!</p> <p>Çocukların sana hayali kahve getirdiğinde içmeyi, onlarla seksek oynamayı, çimenlerde birlikte yuvarlanmayı, karlı yokuştan aşağı kaymayı, birlikte gülmeyi, onlara masallar anlatıp anılarına girmeyi erteleme!</p> <p>Hep istediğin o şeyi erteleme! O her neyse senin için önemli olduğu için istiyordun. Ona gereken özeni göster!</p> <p>Hayallerini erteleme!</p> <p>Yeni yılın ilk gününde tekrar kalk ayağa ve ertelediklerini yapmaya başla!</p> <p>Yapabilirsin!</p> `
  }
];

const englishArticles = [
  {
    order: 9,
    id: "en-data-mining",
    title: "Data Mining – Your High Probability Solution to Achieve Business Goals",
    slug: "en-data-mining",
    category: "articles",
    content: `
      <i>“…you can’t be absolutely certain of anything; so the equations used to make predictions are to minimize error, not to eliminate the margin of error.”
      “Why wouldn’t we want to eliminate errors?” asked the black-haired student named Colleen.
      “You do want to. But it is not possible to eliminate errors completely; because you never get all the information needed to create an error-free prediction equation.”
      “Why not?”
      …
      “Probability theory allows scientists to say that an answer is correct even if they are not 100% certain. Because according to probability theory, when the margin of error is very, very small, it means you have found the truth.”</i>
      – Adam Fawer, Improbable-

      <p>This is exactly where data mining comes in. Although it is translated as data mining, it is good to remember that the main purpose of this concept is to obtain knowledge rather than to extract data, so it can be considered knowledge mining.</p>

      <p>So, what is data mining? It is the process of obtaining useful information from a pile of unrelated data. The concept of mining comes from here. The extraction of valuable minerals like gold and silver from rocks and soil.</p>

      <p>What is it for? We started with an example, let's continue with an example. You serve small bowls of snacks to your guests. If you only serve sunflower seeds or hazelnuts, you can tell who likes your treat (e.g., sunflower seeds) from the snacks left on your guests' plates. Let's say you have all kinds of snacks and you want to know which snack your guests like the most. You can take out what's left on each plate, but this will tell you which snack is not liked. If you had a camera that could observe your guests, you could observe which snack they enjoy eating more, which one they eat first and which one they save for last, and even which snacks are exchanged and shared among your guests.</p>

      <p>The satisfaction of your guest, let's be more specific, your customer, is important, but what's more important is your profit in this business area. If you could serve every customer only the snack they want; you would know how much of which snack to use and what to serve to whom from the very beginning. The snack plate you serve your customer will not contain unnecessary items or snacks that you could offer to another customer. When you make a presentation by knowing what your customer likes, they will feel a sense of loyalty to you and will prefer you first.</p>

      <p>Perhaps you will want to go a step further and know the second favorite snack of your customer, or offer the drink that goes well with that snack. What can we do in this case? Again, data mining will come to our rescue. Let's start with an example and relate the concepts of data mining.</p>

      <p>Determining your customers who like type A or B snacks can be considered <strong>clustering</strong>, and inferring that your potential customer likes type A or B snacks can be considered <strong>classification</strong>. The fact that a customer who likes type A snacks also likes type X drinks is an <strong>association</strong>.</p>

      <p>By predicting what kind of snack your potential customer likes and selling another secondary snack or drink with it, you are cross-selling a product that has been correctly classified and correctly associated in a highly accurate model. The probability of a customer who you know the needs of and who you serve products to accordingly and do not bother with unnecessary snacks, remaining your customer is quite high.</p>
      <p>Careful readers are those who also read between the lines. The "highly accurate model" between those lines is at the heart of success.</p>

      <p>In data mining, a model is created from all the data we have (the camera images in the example). This model is trained with real data and its accuracy is tested. If the margin of error of the model is low (see the quote from the book Improbable above), then the model's prediction is accepted as correct.</p>

      <p>Let's take the last steps in this article, without leaving out the two fundamental processes of data mining that I did not mention between the lines. The most important process to go through before creating a model from all the data we have is to clean this data. In this process, called <strong>preprocessing</strong>, the data is cleaned of its redundancies with statistical observations and measurements; similar data is normalized to be easily processed. We can think of this stage as the organization of the camera footage in our example. The discarding of footage before customers arrive, the correction of image distortions, and the compression of similar frames all correspond to this.</p>

      <p>The accuracy of the model will not remain constant either. The last process that expert practitioners will emphasize is that as behaviors change, the model should update itself and its accuracy should be increased with new data. Over time, the model we create will look at the problem being researched in more detail and allow the right steps to be taken towards the desired solution. This means reducing errors. Our camera will zoom in and realize that our customer who actually likes pistachios did not reach for salty snacks that day because their finger was sore. Offering a peeled pistachio to them instead of classifying them as non-pistachio lovers will also be a successful outcome of the model.</p>

      <p>TechSiN Solutions is the right step to take from start to finish to reach your goal with data mining products and solutions. Fortunately, you don't need a model to find out that TechSiN is the right choice in this field. After all, TechSiN is "your IT partner for success". For contact with our experienced company in the field, visit <a href="http://www.techsin.com.tr/bize-ulasin/" target="_blank" class="text-blue-600 underline">http://www.techsin.com.tr/bize-ulasin/</a></p>

      <p>Let's end the article with a spoiler. If we model your business and your goals together, we can guide your customers in the most suitable way for you.</p>

      <p><i>“The second time he smelled the heavy odor, he suddenly craved chocolate ice cream”</i> – Improbable –</p>
    `,
  },
  {
    order: 8,
    id: "en-data-mining-preprocessing-all-data-normal",
    title: "Data Mining – Preprocessing or “All Data Normal”",
    slug: "en-data-mining-preprocessing-all-data-normal",
    category: "articles",
    content: `
<p>The sentence “all data normal” gives the good news that a situation is under control and the expected outcome will be achieved. Like the current condition data of a patient coming out of an operation or the confirmation a passenger receives at passport control when leaving the country at an airport. If all data is normal and as expected, there is no obstacle to proceed.</p>

<p>In data mining, preprocessing and normalization of data also align with these examples. When your data pile, where you will search for valuable information, is ready for use, it means you can start the search.</p>

<p>So, what is this joke about all data being normal? Let’s imagine we are going to build a house. Many materials are in front of us for construction. Although in real life this may not be the case, in data mining these materials (data) appear stacked on top of each other. We combine data collected from different sources that potentially relate to each other to produce results. Without straying too far from the example, let’s return to our house. Timber, tiles, insulation materials, glass and concrete blocks, and many more. We know our goal, the materials are in front of us. If we have an architect, the plan of our house is ready and waiting to be built.</p>

<p>Let’s fast forward a bit. Suppose the foundation is laid and we move to flooring. While creating the floor, we go to the pile of floorboards and start picking them one by one from the pile to place side by side. For a good result, we need some luck. A floor laid out blindly with materials of different lengths and widths will only please adventure seekers. All floorboards having the same or compatible dimensions will present the desired flooring.</p>

<p>I guess the concepts of normalization and preprocessing are now clearer. Let’s reinforce the steps of this preprocessing with the example above. If there are cracked, discolored, or even non-wood materials among the floorboards, removing them is inevitable for a good result. The process performed on the records that make up our data is called data cleaning. In this process, discarding the outlier material (data) is not good craftsmanship. Rough materials can be sanded, cracks repaired and evaluated. It should be remembered that even though there is a pile, every piece of data is valuable to us.</p>

<p><strong>Data transformation</strong> is also one of the steps in preprocessing that leads us toward our goal. Suppose your pile of materials lacks corner pieces or baseboards that match your flooring. Despite having so many materials, you would either stop and go shopping again or proceed with a result that constantly bothers you due to mismatched materials. Actually, the craftsman's solution will be different. The craftsman can convert the available floor material into corner pieces or baseboards as needed.</p>

<p>From another perspective, transformation is carried out by grouping the piled-up wood materials into flooring, ceiling, and furniture. This quick grouping makes it easier to know where to use each material. After this step, you won’t deal with roofing materials while flooring. If you separate puzzle pieces by color or shape before solving it, you are taking a step in data transformation. Laying patterned tiles is actually similar to doing a puzzle.</p>

<p>We can introduce <strong>feature selection</strong> with this example. If your problem is the triangular piece in the middle, searching among tiles (data) that have the triangular feature is a rational approach. Then you check the compatibility of neighboring colors. Tiles with one side blue and one side white also join your solution set. The last feature leading you to the solution might be striped tiles. These three features you select will quickly guide you to the appropriate tiles for the problem you face. If you are doing marble flooring, aligning veins and color matching is more difficult. In this case, if feature selection exceeds your puzzle experience, leaving it to an expert will ensure satisfaction with the result.</p>

<p>In summary, preprocessing, which makes data workable, expressing it in determined ranges, increasing the efficiency and performance of data mining algorithms, and reaching the desired analysis result, can be called normalization. It is known that summaries sometimes fail to reflect the actual work. You don’t need to mine for an expert. TechSiN Information Solutions offers more than you are looking for with data mining products and solutions. After all, TechSiN is “your IT partner for success.” To contact our experienced company in its field: <a href="http://www.techsin.com.tr/bize-ulasin/">http://www.techsin.com.tr/bize-ulasin/</a>.</p>

<p>Coming back to the dream house at the beginning of the article; as TechSiN, we are not yet in the construction sector, but when we take you to your business goal with our expertise, your dreams will already go beyond that house. Will you achieve your goals? Our answer: With TechSiN, all data is normal.</p>
`
  },
  {
    order: 7,
    id: "en-letter-to-computer-engineering-student",
    title: "Letter to a Computer Engineering Student",
    slug: "en-letter-to-computer-engineering-student",
    category: "articles",
    content: `
<p>Dear Aspiring Computer Engineer,</p>

<p>I know everything seems hard for you right now. There are so many topics to learn! And on top of that, classes, projects, exams…</p>

<p>But you have to start somewhere.</p>

<p>Never lose your motivation! The first thing you need in your profession is mo-ti-va-tion. Be afraid when your desire to learn starts to fade! Your professional skills will disappear along with your desire to learn. So, always try to learn new things, read magazines, follow news websites. Keep a close eye on the activities of companies you like or want to work for in the future.</p>

<p>Then, check out HR websites and see what companies want you to know when you graduate and start looking for a job. They expect skills you’ve probably never heard of. Research them, see what they are. Make a list for yourself of what you want to learn. Then prioritize and start with one.</p>

<p>Make a list of the companies you want to intern at or your dream companies. Research what kind of work is done in these companies. Check if it aligns with what you want to learn. I will also write to you separately about internships.</p>

<p>Research project ideas, for example. Don’t try to find something completely new at first. Everyone wants to bake a fantastic cake that’s never been made before, but first, you find a known recipe online and start with it, right? Once your hands get used to it, your mind will open up too, don’t worry. Who knows, maybe after a while you will come up with a brilliant idea. So, try to implement previously done project ideas. Don’t forget to think about what else could be done.</p>

<p>You always complain that the resources are in English, I know. Then share what you learn in Turkish; create a blog, for example. Don’t neglect improving your English skills. When you start working, most innovations will expect your research, so you won’t find the Turkish version. So, work, watch foreign films without subtitles, even play games. Of course, don’t skip your lessons saying “I’m learning English in the game” 😉</p>

<p>There are small tools to embellish your work. Research them; I will write some here. You might find one useful. There’s a lot to write. Check here from time to time, you might find other letters for yourself. Also glance at other articles, for ideas.</p>

<p>Ah, by the way, don’t hesitate to write to us. At TechSiN Information Solutions, we really love our young colleagues. We have interns every year. Sometimes, our interns become our colleagues when they graduate. And that’s the best part. Whether for an internship or not, write to us occasionally. We will meet. Even if we don’t work together, you might run into me at a business meeting in the future.</p>

<p>See you,</p>

<p>With my best regards,</p>

<p>Your Colleague at TechSiN</p>
`
  },
  {
    order: 6,
    id: "en-computer-engineering-intern-letter",
    title: "Letter to a Computer Engineering Intern",
    slug: "en-computer-engineering-intern-letter",
    category: "articles",
    content: `
<p>Dear Intern,</p>

<p>If we haven’t met before, you can first read my previous post here. If not, you can continue from here.</p>

<p>I had given you some general advice before. Now I wanted to talk about your internship.</p>

<p>When you graduate, where do you want to work? Imagine… First, see if you can intern there, research it. Many companies take interns every year, like TechSiN IT Solutions. Check the job postings of these companies. What do you need to know, what can you learn during the internship, follow the clues.</p>

<p>Usually, intern postings aren’t publicly announced, you have to apply without anyone calling. Yes, it’s your responsibility! Think like this: when you start working, there are criteria, but if you’re doing an internship, mostly there aren’t any 😀 Keep in mind, sometimes companies have to select interns through an exam. When there are many applications, to avoid random selection, an exam is necessary. You have to understand that some companies can’t take everyone as an intern. Apply as early as possible, a limited number of interns can be taken. You need to act fast.</p>

<p>Even when applying for an internship, prepare a cover letter; share your excitement, what you want to learn, your career goals. Tip from me: Interns like this are more likely to start working later 😉</p>

<p>The tasks you are given can sometimes be like a test. The attention and care you show to that task will signal whether you might get a job at that company later. So don’t forget you are a student and imagine yourself as an employee there. This way, you might even find a job while still doing your internship. There are examples; I’ve seen it.</p>

<p>If you start your internship and no task is assigned to you, you can ask: “I have this project in mind, can I do it?” Sometimes you will have to solve problems by yourself; don’t get discouraged just because no one is helping. When you start working, most of the time you will have to research and solve problems yourself anyway. Consider this part of your internship: your problem-solving skills develop.</p>

<p>Write down daily what you do in your internship journal. Microsoft OneNote, Notepad++, notebook, paper … Make sure to write. When the internship ends, you won’t remember day by day what you did. You worked a whole month; you learned so many things; how can you remember everything? Towards the end of your internship, it will be easier to compile all your notes, believe me.</p>

<p>Don’t forget that the internships you do are a rehearsal for professional life. Always stay alert. An internship is not only to gain professional knowledge but also to learn the rules of working life.</p>

<p>Let me remind you that you can also intern at TechSiN IT Solutions. If you want to experience working life here, write to us, please don’t hesitate. We would love to see you among us.</p>

<p>I wish you success in your internships and professional life.</p>

<p>See you,</p>

<p>With my regards,</p>

<p>Your Colleague at TechSiN</p>
`
  },
  {
    order: 5,
    id: "en-plsql-exceptions",
    title: "PL/SQL Exceptions",
    slug: "en-plsql-exceptions",
    category: "articles",
    content: `
<p>• An error? There is no error in my code!</p> <p>• No, these are not mistakes you made.</p> <p>• Did Oracle make the error?</p> <p>• No, it didn't either.</p> <p>• Then who made it?</p> <p>• The user 😀</p> <p>Hello Dear Colleague,</p> <p>Of course the user can make mistakes, and developers can too. But our topic is this: when our program runs and an error occurs, can we understand why? Yes, we can do this by writing exceptions in our PL/SQL blocks. I have prepared the most common exceptions as a PDF. If you keep it in front of you for a while, you will see it will be useful. It only contains names and error codes. Use the vast Internet to research the details 😀</p> <p>If the exceptions have no details, what is this article for? To remind you of the importance of exceptions, write a few of the most used ones, and deliver this PDF file to you 😉</p> <p>Let's get started!</p> <p>NO_DATA_FOUND might be the exception you use most. “The record you are looking for is currently unavailable. Please try again later.” Don’t mind me saying try again. If no new record has been added, no matter how much you try, you will encounter the same exception.</p> <p>TOO_MANY_ROWS will help you when you try to read one row but an army of records finds you.</p> <p>Then! My favorite: DUP_VAL_ON_INDEX<br> First, you add constraints 😉 to the table, then you try to add records that do not meet these constraints. No! You should not! If you did, you should catch it with this exception.</p> <p>ZERO_DIVIDE! It always seemed like Zorro to me, a hero wielding his sword fighting against zero! This happens when you try to divide by zero and cannot.</p> <p>You can research the other errors in the PDF file. Even try to research the ones I wrote above, write examples, and test. Unfortunately, nothing comes to mind without writing it yourself.</p> <p>I prepared it so exceptions stay in front of my eyes. Look, this is how it looks on my desk 😀</p> <img src="${BASE_API_URL}/blog/11.jpg" alt="Platform 1" class="inline-block mx-2 align-middle max-w-full h-auto"> <p>I hope it will be useful for you too.</p> <p>Best regards,</p> <p>Your colleague at TechSiN</p> `
  },
  {
    order: 4,
    id: "en-new-year",
    title: "New Year",
    slug: "en-new-year",
    category: "articles",
    content: `
<p>Another new year is approaching.</p> <p>For some, it’s no different from other days, but let’s admit, there is still a certain excitement of a new beginning. Isn’t it said that you always start a diet on Monday? It’s something like that.</p> <p>May there be beauty this year.<br> May I have a car. May I have a house. May I have a brand-new phone. May I have a lot of money.<br> May the trees and forests not disappear, not burn. May the world be just.<br> May women and children not die. May young saplings not wither. May there be no terrorism. May there be no wars. May there be peace in the world.</p> <p>What beautiful wishes…</p> <p>We all have expectations from the new year, as if the incoming year will bring them along. After all, the new year is not an uncle with a luxury car bringing chocolates and toys from abroad. And since Santa Claus is sold as a costume, it doesn’t work to just send messages to the universe and wait.</p> <p>We need to sit and think about what we do to make our wishes come true. Instead of a list of wishes or gifts, we should think about and write down what we need to do to make our desires come true, even engrave it in our minds to remember it at all times.</p> <p>We also need to think about the wishes of others; sometimes to hear them, even to see them… We may need to think whether there is anything we can do to fulfill their wishes.<br> Our spouse, mother, father, grandmother, grandfather, loved ones may need conversation.<br> Our child may not need new toys, but time to play with us.<br> A teacher in a faraway village may want coats for students freezing in the cold.<br> Our neighbor may be watching the doors alone, wishing someone would come so we could exchange a few words or play backgammon.<br> The village we haven’t visited in years may need us.<br> Street animals may need a bowl of water.<br> People we meet in the elevator may need a warm “good morning.”<br> The aunt, uncle, disabled, or pregnant person standing on the bus may need a seat.<br> Brave hearts cycling to work may need respect from drivers.<br> A patient trying to reach the hospital in an ambulance may need a few more years of breath.<br> Children whose father has passed away may be waiting for support for their education.</p> <p>Think about it: whose wishes can you fulfill this year?</p> <p>We can do it! If everyone holds one end, we can succeed!</p> <p>So…</p> <p>May this year also bring health, peace, and beauty in hearts and words. Happy New Year.</p> <p>With love from TechSiN…</p> <p>December, 2016</p> `
  },
  {
    order: 3,
    id: "en-being-part-of-a-whole",
    title: "Being Part of a Whole!",
    slug: "en-being-part-of-a-whole",
    category: "articles",
    content: `
<p>Developing software… A team effort!</p> <p>But what about singing in a choir?</p> <p>Being part of a team to develop computer software and singing in a choir; how similar could they be?</p> <p>Quite a lot! More than you might think.</p> <p>The main thing in a choir is to create a whole. It is possible to achieve beauty through differences while singing in a choir. Each chorister can produce a single voice at the same time, while listeners have the chance to perceive the voices as a whole. They witness beauty and harmony.</p> <p>Everyone's voice and singing style are different. While singing alone, it is possible to be unique and sing as you wish, but in a choir, listening to other choristers and following the conductor is crucial. Breathing together, exhaling together is necessary.</p> <p>Attending rehearsals regularly is important to capture the team spirit. Missing rehearsals and losing the team spirit prevents you from reaching the same energy level as the entire choir.</p> <p>Just attending rehearsals is not enough to keep up with the choir. Individual practice is also important. You need to develop yourself and identify your weaknesses, then work on them intensively.</p> <p>The sounds and words you produce become more meaningful when combined with the choir.</p> <p>Now let’s apply this to a software team…</p> <p>The goal is to develop software that forms a whole with its interface, usability, methods affecting results unseen by the user, database, server, technique, and technology. Each part requires separate expertise, and when the product is complete, it provides the user with a great experience.</p> <p>Everyone in the team has different skills, tasks, and responsibilities. Even though each task requires specific expertise and experience, it is necessary to be part of the team. You need to interact with other team members and follow the project manager/team leader. Working together, laughing together, facing challenges together is essential.</p> <p>Working together while developing software is important to capture the team spirit. Staying away from these activities leaves you outside the team.</p> <p>However, just participating in these activities is not enough to keep up. You need to follow innovations and do extra work to fill any gaps.</p> <p>What you do only becomes meaningful when it can be part of the whole.</p> <p>So, what should we do?</p> <p>Gather your team and go to a choir festival if there is one, or at least a choir concert. You will see that your team motivation increases when you witness the results of working together! Don’t forget to have coffee together and chat afterwards.</p> <p>Wishing to share the beauty that comes from togetherness.</p> <p>A chorister from TechSiN</p> `
  },
  {
    order: 2,
    id: "en-tips-for-new-software-developers",
    title: "Tips for New Software Developers",
    slug: "en-tips-for-new-software-developers",
    category: "articles",
    content: `
<p>As young people, our lives change and develop quickly. From primary school to high school and university, eventually we reach the point where we must continue our lives and enter the workforce that provides the financial resources to achieve our different goals. While this sequence follows, our elders and experienced friends always say that we will feel at ease when we take the next step. However, the next step, like in computer games, becomes more complex and challenging as you advance. Thinking about those words, you may say, “I was supposed to feel at ease?” but those words cannot go beyond being encouragement and comfort to keep you focused on your goals. This is one of the realities of life.</p> <p>The first step in entering the workforce is job hunting. For some people, this step is easy; for others, it is long and challenging. For those who want to work as a computer engineer or in the software sector, there are different ways to make this step easier. A new developer/engineer should set their own goals in every stage of their life, including job searching. These goals will make the job search easier and prevent you from being led astray. Most companies look at your skills and personality. Of course, there are exceptions—for example, a few companies may also care about the university you graduated from—but what matters most are your skills. Assuming you have gone through all these processes, I now move on to the main topic.</p> <p><strong>First Job and a New Environment</strong></p> <p>I have been working in the software sector for two years, both in my own company and outsourced to other companies. In the environments I’ve been in, I was usually the youngest. This age difference can be a challenge in some professions for adapting to the environment, but in software, you can turn it into an advantage. As age and experience increase, there is a higher chance of focusing on specific channels. As young people, when we look for work with .NET, Java, or other languages, a developer in their thirties often prefers to continue their career in one language. The logic of using these languages is similar, but in professional life, switching from one area to another as you get older is usually not practical, as a person prefers to continue in the field they have developed expertise in.</p> <p>Another proof that being young is not a problem in software is that developers are always open to change and development. This is mandatory anyway, as our industry is the fastest-changing sector in the world.</p> <p>Let’s move on to what not to do when starting a new job. The first is resisting adaptation to your work environment. Resistance will make you an unwanted person in that environment. This does not mean you should compromise your character; rather, when you start a job, you will meet people with characteristics and perspectives you didn’t encounter in university, and the possibility of exploring their world is quite high. This is an advantage for people open to change and growth.</p> <p>Another topic is, of course, the salary that makes all of us eagerly await the beginning of the month. You must be very careful here. In private software companies, unlike government offices with fixed salaries, there are no fixed salaries. Your salary will vary according to your knowledge, skills, experience, responsibilities, and the standards of the company you join. Because salaries are individual, sharing this information with coworkers—or having them share theirs with you—can cause disagreements in the workplace and disturb your peace, reducing your interest in your work.</p> <p>Continuing on salaries, I want to share a piece of advice from one of my professors that should be part of your life philosophy: “Do not be consumed by ambition.” If your ambition takes over, you will be dissatisfied with your new job, income, and life. This will lead you in different directions, and in the end, you may end up alone both at work and in life.</p> <p><strong>The Developer Mindset</strong></p> <p>If you have been hired as a developer, first I want to congratulate you and then wish you good luck. Being a developer is unlike any other profession. Doctors deal with patients, mechanical engineers with machines, teachers with students, but we deal both with people and with intangible things.</p> <p>Dealing with people is challenging. However, the positive feedback from people increases your job satisfaction. A developer who fulfills a client’s request will make both parties happy, but a picky client who is hard to please will challenge and tire the developer. In such cases, you must take a deep breath and get back to work. Remember, there is no reward without effort.</p> <p>Not only people, but long hours spent on the computer writing code that gives errors will also frustrate you. Therefore, it is very important to find activities outside work that relax and motivate you.</p> <p>As a newcomer, you will not take long to develop the developer mindset. Initially, you may struggle to solve errors or manage processes, which can be stressful. But over time, you will become more professional, and your work will gain momentum. It is natural to face difficulties at the start; in such cases, remain calm and ask for help. Some may fall into the trap of pride thinking, “I already know this” or “I can do it,” which may lead to more mistakes and make situations seem impossible. As the saying goes, even if you know a thousand things, asking someone knowledgeable will help you see blind spots and solve problems more easily. You don’t always need to ask the most experienced person; sometimes asking a friend or another newcomer can also be helpful. Even if software follows certain rules, people have different perspectives and educational backgrounds, which can give you valuable insights. However, constantly asking for help at every difficulty is not advisable. Asking for help when necessary is fine, but relying too much on others will hinder your problem-solving and research skills as a developer.</p> <p>Remember, as a developer—especially as a newcomer—you will encounter many different situations. Do not fear them! Tackling problems will motivate and develop you. The core rule is to love your work. Regardless of profession, you should love your job, your workplace, your coworkers, and enjoy creating something together.</p> <p>Wishing you success in life, and good luck!</p> `
  },
  {
    order: 1,
    id: "en-dont-delay-this-year",
    title: "Don't Delay This Year",
    slug: "en-dont-delay-this-year",
    category: "articles",
    content: `
    <p><strong>Don't Delay This Year…</strong></p> 
    <p>Don't delay learning the language of the country you always said "if I weren’t here, I would live there," taking action for that certificate you want to get, or reading the books you keep piling on your bookshelf!</p> <p>Don't delay taking care of yourself, sticking to the diet you always start and abandon, doing the sport you can never consistently maintain each year, or going to a course to learn that dance you always admire while watching!</p> <p>Don't delay reconciling with a friend you haven't talked to in a while, greeting people you meet in the elevator, bringing a cake to your neighbor, trying the recipe of that dessert you love, inviting your friends for a meal, picking up a hobby, or constantly learning new things through trial and error!</p> <p>Don't delay calling your loved ones, telling them you love them, playing with children, visiting distant relatives, or spending time with your friends!</p> <p>Don't delay giving your children the time you haven't set aside for them because of work, telling them how much you love them, or looking into your spouse's eyes and telling them how much you still love them!</p> <p>Don't delay drinking the imaginary coffee your children bring you, playing hopscotch with them, rolling on the grass together, sliding down snowy hills, laughing together, or telling them stories and entering their memories!</p> <p>Don't delay that thing you always wanted! Whatever it is, you wanted it because it was important to you. Give it the attention it deserves!</p> <p>Don't delay your dreams!</p> <p>On the first day of the new year, stand up again and start doing what you’ve been delaying!</p> <p>You can do it!</p> `
  }
];

const seedArticles = async () => {
  try {
    await connectDB();
    await Blog.deleteMany({ category: { $in: ["makaleler", "articles"] } });

    const withAuthor = articles.map(t => ({ ...t, author: AUTHOR_ID }));
    const enWithAuthor = englishArticles.map(t => ({ ...t, author: AUTHOR_ID }));

    const inserted = await Blog.insertMany([...withAuthor, ...enWithAuthor]);
    console.log(`✅ Inserted ${inserted.length} articles`);

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
    mongoose.disconnect();
  }
};

seedArticles();