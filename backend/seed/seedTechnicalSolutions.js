import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../models/Blog.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const BASE_API_URL = "https://api.techsin.com.tr";
const AUTHOR_ID = "689effab8bfc2e922d776e39";

const technicalSolutions = [
  {
    order: 6,
    id: "tr-ms-sql-to-oracle-defgen",
    title: "MS SQL Server’dan Oracle replikasyonunda defgen kullanımı",
    slug: "tr-ms-sql-to-oracle-defgen",
    category: "teknik-cozumler",
    content: `
      <p>Bilindiği gibi GoldenGate ile heterojen ortamlar arası replikasyon yapılırken <strong>defgen</strong> kullanarak tablo tanımlarının çıkarılması ve kaynak ile hedef veritabanları arasında paylaşılması gerekmekte.</p>
      <p>MS SQL Server’ dan Oracle veritabanına replikasyon yaparken oluşturulacak tablo tanımlarında <strong>“NOEXTATTR”</strong> parametresinin kullanılması, çıkabilecek bazı sorunları engelleyecektir.</p>
      <p>Örnek: defgen.exe paramfile c:\\GoldenGate\\dirprm\\defgen.prm reportfile c:\\GoldenGate\\dirrpt\\defgen.rpt NOEXTATTR</p>
    `,
  },
  {
    order: 5,
    id: "tr-passthru-nopassthrutr",
    title: "PASSTHRU/NOPASSTHRU kullanımı",
    slug: "tr-passthru-nopassthrutr",
    category: "teknik-cozumler",
    content: `
      <p>GoldenGate replikasyonunda kaynak ve hedef tablo yapıları aynıysa ve herhangi bir filtreleme veya kolon eşlemesi yapılmıyorsa Data pump processinin parametrelerinde <strong>PASSTHRU</strong> kullanılabilir. GoldenGate’ in iki tabloyu aynı yapıda görebilmesi için; kolon isimlerinin, veri tipleri ile boyutlarının aynı olması ve aynı sırada olmaları gerekir. PASSTHRU parametresinin kullanıması, GoldenGate’ in tablo tanımlarını veritabanı veya data-definition dosyalarından aramasını engelleyeceğinden performansı arttıracaktır.</p>
      <p>PASSTHRU ve NOPASSTHRU parameterleri tabloya özeldir. Bir parametre diğerini görene kadar tüm TABLE ifadeleri için aktif kalacaktır. Bu da, veri filtreleme ve diğer veri manipülasyonu kullanılan tablolar ile kullanılmayan tabloların ayrı ayrı pass-through davranışlarının belirlenebilmesine olanak sağlar.</p>
      <p>Örnek:</p>
      <pre>EXTRACT example
USERIDALIAS user1
RMTHOST rmthst, MGRPORT 7809, ENCRYPT AES192 KEYNAME mykey
ENCRYPTTRAIL AES192
RMTTRAIL /ggs/dirdat/ex
PASSTHRU
TABLE fin.acct;
NOPASSTHRU
TABLE fin.sales, WHERE (ACCOUNT-CODE &lt; 100);</pre>
      <p>DDL Replikasyonunda PASSTHRU modu</p>
      <p>DDL ‘ler data pump tarafından otomatik olarak PASSTHRU modda taşınır. Sonuç olarak, kaynak tarafta belli bir tabloda yapılan DDL işlemi (örn. ALTER TABLE TableA…) data pump tarafından aynı isim ile işlenir.</p>
    `,
  },
  {
    order: 4,
    id: "tr-mysql-client-linux-komutlari",
    title: "MySQL command-line client içinde Linux komutlarını çalıştırmak",
    slug: "tr-mysql-client-linux-komutlari",
    category: "teknik-cozumler",
    content: `
      <p>Linux sistemlerde MySQL client programcığı genelde aşağıdaki şekilde açılır:</p>
      <pre># mysql -uuser -p [database]</pre>
      <p>Sonrasında, interactive mysql client programcığı başlar ve sizden MySQL komutları girmenizi bekler. Çalışma sırasında bir noktada Linux komutu girmeniz gerektiğinde mysql client’ı sonlandırmadan komut çalıştırmanın yolu, komutun başına “\\!” koymaktır. Örneğin, bulunduğunuz klasördeki dosyaları şu şekilde görüntüleyebilirsiniz:</p>
      <pre>mysql&gt; \\! ls -al</pre>
      <p>MySQL client içinden çıkmadan (exit ile oturumu sonlandırmadan) Linux bash shell’e düşebilmek için ise aşağıdaki komutu kullanabilirsiniz.</p>
      <pre>mysql&gt; \\! bash</pre>
      <p>Sistem shell ile işiniz bittiğinde “exit” komutunu kullanarak tekrar mysql client içine dönebilmek de mümkün.</p>
    `,
  },
  {
    order: 3,
    id: "tr-sql-server-to-oracle-linked-server",
    title: "64-bit SQL Server üzerinden Oracle’a linked server tanımlamak",
    slug: "tr-sql-server-to-oracle-linked-server",
    category: "teknik-cozumler",
    content: `
      <p>Öncelikle, uygun Oracle driver’ın bulunup, SQL Server’ın olduğu sunucuya yüklenmesi gerekiyor. Oracle’ın 64-bit Oracle Data Access Components (ODAC) sayfasından 64-bit için olan versiyonu (xCopy olan) indirmek ve kurmak oldukça basit. Bu işlem yapıldıktan sonra SQL Server’da Linked Server–> Providers altında “ORAOLEDB.Oracle” görünecektir.</p>
      <p>Sonrasında, linked server aşağıdaki gibi yaratılabilir. TNSNames yerine EZConnect tercih edilmesi çıkabilecek sorunları azaltacaktır. Örneğin, TNS kullanarak yapılan linked server üzerinden Oracle prosedürü çağırmada problemler çıkabiliyor.</p>
      <pre>exec sp_addlinkedserver N’MYLINK’ , ‘Oracle’ , ‘ORAOLEDB.Oracle’ , N’//172.16.1.100/myoracle_SID’ , N’FetchSize=2000′ , ”</pre>
      <p>Linked server üzerinden Oracle prosedürü çağırabilir. Bunun için “RPC Out” özelliğinin true olması gerekiyor.</p>
      <pre>exec master.dbo.sp_serveroption @server=N’MYLINK’ , @optname=N’rpc out’ , @optvalue=N’true’</pre>
      <p>Son olarak login bilgilerini aşağıdaki şekilde vermemiz gerekir.</p>
      <pre>exec sp_addlinkedsrvlogin @rmtsrvname=’N’MYLINK’ , @useself=N’FALSE’ , @rmtuser=N’MY_REMOTE_USER’ , @rmtpassword=’MY_PASSWORD’</pre>
    `,
  },
  {
    order: 2,
    id: "tr-linux-root-password-reset",
    title: "Linux’ta root şifresi sıfırlamak",
    slug: "tr-linux-root-password-reset",
    category: "teknik-cozumler",
    content: `
      <p>Linux makinalarının root şifresini sıfırlamanın birçok yolu vardır. Bu yazıda bu yöntemlerin içinden en performanslı sıfırlama yöntemi olarak bilinen yöntemi anlatacağız. Süreç, boot işlemlerini yarıda kesip emergency moduna geçen ve root şifresini değiştirmeye zorlayan adımlardan oluşuyor.</p>
      <ol>
        <li>Makinayı yeniden başlatıyoruz ve boot menüsüne gidiyoruz.</li>
        <li>Herhangi bir tuşa basıp menünün otomatik seçim yapmasını engelliyoruz.</li>
        <li>Boot menüsünde karşımıza çıkan ekranda işletim sistemine ait seçeneğin üzerine gelip ‘e’ tuşuna basıyoruz. Böylece işletim sisteminin kernel’ini düzenleyebileceğiz.</li>
        <li>Karşımıza gelen ekranda ‘linux16’ ile başlayan metnin en sonuna ilerliyoruz</li>
        <li>‘rd.break’ komutunu linux16 ile başlayan komutun sonuna ekliyoruz</li>
        <li>Komutu ekledikten sonra devam etmek için CRTL + X yapıyoruz.</li>
        <li>Sistem emergency modunda yeniden başlayıp /sysroot salt okunur olarak açılacak.</li>
        <li>Sistem switch_root kullanıcısıyla bizden komut bekleyecek. ‘mount -oremount,rw /sysroot’ komutunu yazarak /sysroot lokasyonuna okuma ve yazma izni veriyoruz.</li>
        <li>‘chroot /sysroot’ komutunu giriyoruz ve böylece /sysroot lokasyonu için ayrı bir dizin tanımlamış olduk.</li>
        <li>‘passwd root’ yazıyoruz ve bize yeni root şifresini soruyor. Şifreyi girdik.</li>
        <li>Bu adımda relabel olarak adlandırılan işlemi yapacağız. ‘touch /.autorelabel’ komutunu yazarak autorelabel dosyasını yaratıyoruz ve şifrenin başarıyla değişmesi için gerekli bir adım.</li>
        <li>‘exit’ komutlarını chroot ve debug shell’den çıkmak için giriyoruz. Yeniden başlattığımız makinada artık yeni şifreyle root kullanıcısı olabiliriz.</li>
      </ol>
      <p>Bu yöntem işe yaramadı mı?</p>
      <ul>
        <li>‘touch /.autorelabel’ komutunu kaçırmadığınızdan ya da düzgün çalıştığından emin olun.</li>
        <li>/sysroot’a okuma/yazma izinleri verilmemiş olabilir, bu durumda yapılan değişiklikler kalıcı olmaz. İzinlerin verildiğinden emin olun.</li>
      </ul>
    `,
  },
{
  order: 1,
  id: "tr-oracle-data-masking",
  title: "Oracle Enterprise Manager 12c Cloud Control ile Veri Maskeleme",
  slug: "tr-oracle-data-masking",
  category: "teknik-cozumler",
  content: `
<p>Bilgi güvenliği, bir varlık türü olan bilginin izinsiz veya yetkisiz bir biçimde erişim, kullanım, değiştirilme, ortadan kaldırılma ve hasar verilmesini önlemek olarak tanımlanır. Gizlilik, bütünlük ve erişilebilirlik olarak üç temel unsurdan oluşur. Bu üç durumdan biri zarar görürse güvenlik zafiyeti oluşur. Bilgi güvenliği ve kişisel verilerin korunması günümüzde en çok ihtiyaç duyulan konulardan biridir.</p>

<p>Kişisel veri, Kişisel Verilerin Korunması Kanunu’nda “kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgi” olarak ifade edilir. Bu anlamda yalnızca gerçek kişilere ait Kişisel Veri kanun kapsamına alınmıştır ve bu kişilerle ilişkilendirilecek her türlü bilgi bu kanun kapsamında korunmaktadır. Gelişen teknoloji ile birlikte kişilerin özel hayat gizliliği her geçen gün zorlaşırken kişisel verilerin korunması ile ilgili gereklilikler bu kanunda açıkça belirtilmiştir. Bu kanun gereğince kişisel verilerin korunması için verilerin silinmesi, yok edilmesi veya anonim haline getirilmesi gerekmektedir. Bu durum, “Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi” yönetmeliğinde açık şekilde belirtilmiştir. Bu yönetmeliğin 10. Maddesinde, kişisel verilerin anonim hale getirilmesi ile ilgili bilgiler aşağıdaki şekilde belirtilmiştir:</p>

 <img src="${BASE_API_URL}/blog/1.png" class="mx-auto my-4" alt="Anonimleştirme örneği" />

<p>Kişisel verilerin anonim hale getirilmesi özellikle test ortamlarında mutlaka uygulanması gereken bir yöntemdir zira test ortamlarında geliştiricilerin geliştirme yapabilmek için canlı ortamlara göre daha geniş yetkilerle erişim yapmaları kişisel verilerin daha korumasız hale gelmesine sebep olur.</p>

<p>Veritabanlarında tutulan hassas verilerin anonim hale getirilebilmesi için kullanılan yöntemlerin en yaygın olanı veri maskelemedir. Veri maskeleme, tablolarda tutulan verilerin çeşitli yöntemler ile değiştirilerek orijinalinden tanınmaz hale getirilmesi işlemidir.</p>

<p>Oracle veritabanları için veri maskeleme işlemini Oracle Enterprise Manager 12c Cloud Control üzerinde sunulan Data Masking eklentisini kullanarak yapacağız. Sürecin tamamını gösterebilmek adına, bu makalede örnek olarak TC Kimlik numarası içeren kolonları maskelemeye çalışacağız.</p>

<p>Veri maskeleme işleminin ilk adımı; hassas bilgi olarak tanımladığımız veri tipini içeren kolonların tespit edilmesidir. Dolayısıyla, öncelikle veritabanında TC Kimlik numarası içeren kolonları tespit etmemiz gerekir. Bu tespitin yapılabilmesi için aşağıda belirtilen adımları sırayla uygulayacağız;</p>

<p>Oracle Enterprise Manager Cloud Control 12c arayüzünden giriş yapıyoruz. Menüden <strong>Enterprise &gt; Quality Management &gt; Application Data Modeling</strong> sayfasına giriyoruz.</p>

 <img src="${BASE_API_URL}/blog/2.png" class="mx-auto my-4" alt="Application Data Modeling" />

<p>Actions &gt; Sensitive Column Types girdiğimizde karşımıza hazır olarak gelen hassas kolon tiplerini göreceğiz. Bu tipler kredi kartı numarası, mail adresi, telefon no, IP adresi, Amerikan sosyal güvenlik numarası gibi birçok veri tipini içermektedir. Bizim örneğimizde kullanacağımız TC Kimlik numarası veri tipi bu hazır gelen veri tipleri arasında bulunmadığından TC Kimlik numarası içeren kolonları bulabilmek için yeni bir hassas kolon tipi yaratmamız gerekiyor. Bunun için <strong>Actions &gt; Sensitive Column Types &gt; Create</strong> adımlarını takip ederek yeni kolon tipi yaratma menüsüne giriyoruz. TC Kimlik Numarası için aşağıda görülen şekilde ayarları yapıyoruz.</p>

 <img src="${BASE_API_URL}/blog/3.png" class="mx-auto my-4" alt="Yeni kolon tipi oluşturma" />

<p>Bu ayarlarda “Search Patterns” kısmında girilmesi gereken alanların kullanım amaçları şu şekildedir:</p>
<ul class="list-disc ml-6">
  <li><strong>Column Name:</strong> “;” ile ayrılmış her bir pattern, veritabanında ilgili kapsamda bulunan tablolarda yer alan kolonların adlarında aranır. Örneğin, kapsamda seçilen şemada bir tabloda “TC_ID” şeklinde bir kolon bulunuyorsa, o kolon detayları aşağıda anlatılacak keşif işleminde potansiyel hassas veri taşıyan kolon olarak değerlendirilir.</li>
  <li><strong>Column Comment:</strong> “;” ile ayrılmış her bir pattern, kolon açıklaması kısımlarında taranır.</li>
  <li><strong>Column Data:</strong> Bu kısımda belirtilen “Oracle Regular Expression” şeklindeki pattern, kapsamdaki tabloların kolon verilerinde aranır. Bizim örneğimizde, TC Kimlik no, tam olarak 11 haneden oluşan bir sayı olduğundan <code>^[0-9]{11}$</code> şeklinde bir regular expression girilmiştir.</li>
</ul>

<p>Sonraki adımda, bu tipteki verilerin hangi veritabanında ve bu veritabanında hangi şemada bulmak istediğimizi ayarlamamız gerekmektedir. Bunun için yeni bir uygulama verisi modeli yaratmalıyız. Bunun için Application Data Modeling kısmına gidiyoruz ve Create diyoruz. Açılan ekranda veri maskelemesi yapılacak kapsamı belirlemek için önce veritabanı ve sonrasında ilgili şemaları seçiyoruz. Belirlediğimiz kapsamda, aradığımız hassas veri tipine ait kolonları bulmak için, oluşturduğumuz uygulama veri modelini seçip Edit’e tıklıyoruz. Açılan sayfada “Sensitive Columns” sekmesine geçerek Actions &gt; Create Sensitive Columns Discovery Job giriyoruz. Açılan ekranda, aşağıdaki gibi, veri modelimizden keşfetmek istediğimiz şemaları ve hassas kolon tiplerini seçiyoruz ve başlatıyoruz.</p>

 <img src="${BASE_API_URL}/blog/4.png" class="mx-auto my-4" alt="Sensitive Columns Discovery" />

<p>Bu job’ın çalışma süresi seçtiğimiz şemadaki veri büyüklüğüne göre değişiklik gösterebilir. Job tamamlandıktan sonra Sensitive Columns &gt; Sensitive Column Discovery Results giriyoruz ve burada sonuçları görüntülüyoruz.</p>

 <img src="${BASE_API_URL}/blog/5.png" class="mx-auto my-4" alt="Sensitive Column Results" />

<p>Gelen ekranda, seçtiğimiz hassas kolon tipine göre, potansiyel hassas veri olarak değerlendirilen kolonlar listelenir. Listelenen kolonların hangi sebeple potansiyel hassas veri içerdiği “Name” ve “Data” kolonlarından anlaşılabilir. “Name” kısmında onay işareti olan kolonlar, belirlediğimiz kolon adı patternlerine uyanlardır. “Data” kısmında beliritlen yüzde değeri ise o kolonda aranan data tipine uyan kayıtların oranıdır. Listede gelen her bir potansiyel kolon konunun uzmanı tarafından incelenir ve hassas bilgi olarak değerlendirilen kolonlar <strong>Set Sensitive Status &gt; Sensitive</strong> olarak işaretlenir.</p>

<p>Hassas bilgi içerdiği belirlenen kolonlarda veri maskeleme işlemi yapılabilmesi için veri maskeleme scriptleri oluşturulması gerekir. Oracle Enterprise Manager ile bu scriptlerin otomatik olarak oluşturulması oldukça kolaydır. Bunun için, Enterprise &gt; Quality Management &gt; Data Masking Definitions kısmından, <strong>Create</strong>’e tıklıyoruz ve aşağıdaki gibi daha önce oluşturduğumuz uygulama veri modelini seçiyoruz.</p>

 <img src="${BASE_API_URL}/blog/6.jpg" class="mx-auto my-4" alt="Data Masking Definitions" />

<p>Şimdi ise daha önceden belirlediğimiz hassas kolonları nasıl maskelemek istediğimizi belirlememiz gerekiyor. Bu yüzden <strong>Columns &gt; Add</strong>’e tıklıyoruz ve uygulamak istediğimiz şemayı ile hassas kolon tipini seçerek Search yapıyoruz. Burada aşağıdaki gibi daha önceden belirlediğimiz hassas kolonlar karşımıza geliyor ve hangi kolonlara veri maskeleme uygulamak istiyorsak onları seçiyoruz. Sonrasında <strong>define format and add</strong>’e tıklıyoruz.</p>

 <img src="${BASE_API_URL}/blog/7.png" class="mx-auto my-4" alt="Columns Add" />

<p>Sonraki adımda, seçilen kolondaki verileri hangi yöntemle maskelemek istediğimizi Format Entry kısmından belirliyoruz. Örneğin, belirlediğimiz TC kimlik no kolonunda tüm kayıtları sabit olarak “11111111111” yapmak istiyorsak, “Fixed Number” seçerek Value bölümüne “11111111111” yazmamız yeterli olacaktır.</p>

 <img src="${BASE_API_URL}/blog/8.png" class="mx-auto my-4" alt="Format Entry" />

<p>Oracle Enterprise Manager ile birlikte gelen Format Entry kütüphanesinde, aşağıda görüleceği üzere, birçok farklı format kullanarak maskeleme scripti oluşturmak mümkün. Birkaç örnek vermek gerekirse;</p>
<ul class="list-disc ml-6">
  <li><strong>Random Numbers:</strong> Rasgele rakamlar üretir</li>
  <li><strong>Shuffle:</strong> Seçilen kolondaki değerleri kendi içinde karıştırır</li>
  <li><strong>Substitute:</strong> Verinin belli bölümlerini başka verilerle yer değiştirtebilir</li>
</ul>

<img src="${BASE_API_URL}/blog/9.png" class="mx-auto my-4" alt="Generate Script1" />

<p>Tüm bu ayarları yaptıktan sonra, maskeleme scriptini yaratmaya geçebiliriz. Enterprise &gt; Quality Management &gt; Data Masking Definitions bölümünden hazırladığımız maskeleme tanımını seçip, <strong>Generate Script</strong> butonuna bastığımızda, Oracle Enterprise Manager bize test ortamında uygulayabileceğimiz ve veriyi veritabanı işleyişini etkilemeyecek şekilde maskeleyebileceğimiz bir script üretecektir.</p>

 <img src="${BASE_API_URL}/blog/10.png" class="mx-auto my-4" alt="Generate Script2" />

<p>Kaynakça:</p>
<ul class="list-disc ml-6">
  <li><a href="http://www.mevzuat.gov.tr/MevzuatMetin/1.5.6698.pdf" target="_blank" class="text-blue-600 underline">6698 sayılı KVKK</a></li>
  <li><a href="http://www.resmigazete.gov.tr/eskiler/2017/10/20171028-10.htm" target="_blank" class="text-blue-600 underline">Resmî Gazete</a></li>
</ul>
`
}
];

const englishTechnicalSolutions = [
  {
    order: 6,
    id: "en-ms-sql-to-oracle-defgen",
    title: "Using defgen in MS SQL Server to Oracle replication",
    slug: "en-ms-sql-to-oracle-defgen",
    category: "technical-solutions",
    content: `
      <p>As known, when performing replication between heterogeneous environments with GoldenGate, it is necessary to use <strong>defgen</strong> to extract table definitions and share them between source and target databases.</p>
      <p>When replicating from MS SQL Server to Oracle, adding the <strong>“NOEXTATTR”</strong> parameter to the generated table definitions will prevent potential issues.</p>
      <p>Example: defgen.exe paramfile c:\\GoldenGate\\dirprm\\defgen.prm reportfile c:\\GoldenGate\\dirrpt\\defgen.rpt NOEXTATTR</p>
    `,
  },
  {
    order: 5,
    id: "en-passthru-nopassthrutr",
    title: "Using PASSTHRU / NOPASSTHRU",
    slug: "en-passthru-nopassthrutr",
    category: "technical-solutions",
    content: `
      <p>If the source and target table structures are identical in GoldenGate replication and no filtering or column mapping is required, the <strong>PASSTHRU</strong> parameter can be used in the Data Pump process. For GoldenGate to recognize two tables as identical, the column names, data types, and sizes must match and be in the same order. Using PASSTHRU improves performance because GoldenGate does not need to search table definitions in the database or data-definition files.</p>
      <p>PASSTHRU and NOPASSTHRU are table-specific parameters. One remains active for all TABLE statements until the other is encountered, allowing different pass-through behavior for tables with and without filtering/manipulation.</p>
      <p>Example:</p>
      <pre>EXTRACT example
USERIDALIAS user1
RMTHOST rmthst, MGRPORT 7809, ENCRYPT AES192 KEYNAME mykey
ENCRYPTTRAIL AES192
RMTTRAIL /ggs/dirdat/ex
PASSTHRU
TABLE fin.acct;
NOPASSTHRU
TABLE fin.sales, WHERE (ACCOUNT-CODE &lt; 100);</pre>
      <p>PASSTHRU mode in DDL Replication:</p>
      <p>DDLs are automatically passed through in PASSTHRU mode by the data pump. As a result, a DDL executed on a source table (e.g., ALTER TABLE TableA…) is processed by the data pump with the same name on the target.</p>
    `,
  },
  {
    order: 4,
    id: "en-mysql-client-linux-commands",
    title: "Running Linux commands inside the MySQL command-line client",
    slug: "en-mysql-client-linux-commands",
    category: "technical-solutions",
    content: `
      <p>On Linux systems, the MySQL client is usually started as follows:</p>
      <pre># mysql -uuser -p [database]</pre>
      <p>After that, the interactive mysql client starts, waiting for you to enter MySQL commands. If at some point you need to run a Linux command without leaving the client, you can prefix the command with “\\!”. For example, to list the files in your current directory:</p>
      <pre>mysql&gt; \\! ls -al</pre>
      <p>To open a bash shell without exiting the MySQL client session, use:</p>
      <pre>mysql&gt; \\! bash</pre>
      <p>Once finished with the shell, type “exit” to return to the MySQL client session.</p>
    `,
  },
  {
    order: 3,
    id: "en-sql-server-to-oracle-linked-server",
    title: "Defining a linked server from 64-bit SQL Server to Oracle",
    slug: "en-sql-server-to-oracle-linked-server",
    category: "technical-solutions",
    content: `
      <p>First, the appropriate Oracle driver must be installed on the SQL Server host. From Oracle’s ODAC page, download and install the 64-bit xCopy version of the Oracle Data Access Components. After installation, under Linked Server–> Providers in SQL Server, you should see “ORAOLEDB.Oracle”.</p>
      <p>Then, the linked server can be created as shown below. Using EZConnect instead of TNSNames helps reduce potential issues. For example, calling Oracle procedures over a linked server created with TNS can sometimes cause problems.</p>
      <pre>exec sp_addlinkedserver N’MYLINK’ , ‘Oracle’ , ‘ORAOLEDB.Oracle’ , N’//172.16.1.100/myoracle_SID’ , N’FetchSize=2000′ , ”</pre>
      <p>To call Oracle procedures via the linked server, “RPC Out” must be set to true.</p>
      <pre>exec master.dbo.sp_serveroption @server=N’MYLINK’ , @optname=N’rpc out’ , @optvalue=N’true’</pre>
      <p>Finally, provide the login credentials as follows:</p>
      <pre>exec sp_addlinkedsrvlogin @rmtsrvname=N’MYLINK’ , @useself=N’FALSE’ , @rmtuser=N’MY_REMOTE_USER’ , @rmtpassword=N’MY_PASSWORD’</pre>
    `,
  },
  {
    order: 2,
    id: "en-linux-root-password-reset",
    title: "Resetting the root password in Linux",
    slug: "en-linux-root-password-reset",
    category: "technical-solutions",
    content: `
      <p>There are several ways to reset the root password on a Linux machine. In this article, we explain the fastest and most common method. It involves interrupting the boot process, entering emergency mode, and forcing a root password change.</p>
      <ol>
        <li>Reboot the machine and enter the boot menu.</li>
        <li>Press a key to stop the menu from auto-selecting.</li>
        <li>Highlight your OS entry and press ‘e’ to edit kernel parameters.</li>
        <li>Find the line starting with ‘linux16’ and go to its end.</li>
        <li>Add <code>rd.break</code> at the end of this line.</li>
        <li>Press CTRL + X to continue booting.</li>
        <li>The system will restart into emergency mode with /sysroot mounted read-only.</li>
        <li>Remount it as read-write: <code>mount -o remount,rw /sysroot</code></li>
        <li>Run <code>chroot /sysroot</code> to change root to /sysroot.</li>
        <li>Type <code>passwd root</code> and set the new root password.</li>
        <li>Create the relabel file: <code>touch /.autorelabel</code> (required to finalize the password change).</li>
        <li>Exit from chroot and debug shell, then reboot. You can now log in with the new root password.</li>
      </ol>
      <p>If it doesn’t work:</p>
      <ul>
        <li>Make sure you didn’t skip <code>touch /.autorelabel</code>.</li>
        <li>Ensure /sysroot was properly remounted read-write, otherwise changes won’t persist.</li>
      </ul>
    `,
  },
{
  order: 1,
  id: "en-oracle-data-masking",
  title: "Data Masking with Oracle Enterprise Manager 12c Cloud Control",
  slug: "en-oracle-data-masking",
  category: "technical-solutions",
 content: `
<p>Information security is defined as the protection of information, a type of asset, from unauthorized or unlawful access, use, modification, destruction, or damage. It consists of three fundamental elements: confidentiality, integrity, and availability. If any of these three elements is compromised, a security vulnerability occurs. Information security and the protection of personal data are among the most essential concerns today.</p>

<p>Personal data is defined in the Personal Data Protection Law as “any information relating to an identified or identifiable natural person.” In this sense, only personal data belonging to real individuals is included under the law, and all information associated with these individuals is protected under this law. As technology evolves, the privacy of individuals becomes increasingly difficult to maintain, and the requirements for protecting personal data are explicitly stated in this law. According to the law, personal data must be deleted, destroyed, or anonymized to ensure its protection. This requirement is clearly stated in the “Regulation on the Deletion, Destruction or Anonymization of Personal Data.” Article 10 of this regulation provides the following information regarding the anonymization of personal data:</p>

 <img src="${BASE_API_URL}/blog/1.png" class="mx-auto my-4" alt="Anonymization example" />

<p>Anonymization of personal data is particularly essential in test environments because developers often have broader access rights compared to production environments, which can make personal data more vulnerable.</p>

<p>The most common method for anonymizing sensitive data stored in databases is data masking. Data masking is the process of altering the data stored in tables in a way that makes it unrecognizable from the original data.</p>

<p>For Oracle databases, we will perform data masking using the Data Masking plugin available in Oracle Enterprise Manager 12c Cloud Control. To demonstrate the process fully, in this article we will attempt to mask columns containing Turkish Identification Numbers (TC Kimlik).</p>

<p>The first step in the data masking process is identifying columns that contain the type of sensitive data we defined. Therefore, we first need to locate columns containing Turkish Identification Numbers in the database. We will follow the steps below in sequence to perform this identification:</p>

<p>Log in to the Oracle Enterprise Manager Cloud Control 12c interface and navigate to <strong>Enterprise &gt; Quality Management &gt; Application Data Modeling</strong>.</p>

 <img src="${BASE_API_URL}/blog/2.png" class="mx-auto my-4" alt="Application Data Modeling" />

<p>When we go to Actions &gt; Sensitive Column Types, we will see the predefined sensitive column types. These include data types such as credit card numbers, email addresses, phone numbers, IP addresses, and U.S. social security numbers. In our example, the Turkish Identification Number is not included among these predefined types, so we need to create a new sensitive column type to find columns containing TC Kimlik numbers. To do this, navigate to <strong>Actions &gt; Sensitive Column Types &gt; Create</strong> and create a new column type with the following settings for TC Kimlik numbers.</p>

 <img src="${BASE_API_URL}/blog/3.png" class="mx-auto my-4" alt="Creating new column type" />

<p>The purpose of the fields in the “Search Patterns” section is as follows:</p>
<ul class="list-disc ml-6">
  <li><strong>Column Name:</strong> Each pattern separated by a semicolon (;) is searched for in column names within tables in the relevant scope. For example, if a table in the selected schema has a column named “TC_ID,” it will be considered a potential sensitive column during the discovery process.</li>
  <li><strong>Column Comment:</strong> Each pattern separated by a semicolon is searched in column comments in a similar manner.</li>
  <li><strong>Column Data:</strong> The pattern specified here, using Oracle Regular Expression, is searched in column data within the tables. In our example, the TC Identification Number is exactly 11 digits, so the regular expression <code>^[0-9]{11}$</code> is used.</li>
</ul>

<p>Next, we need to set in which database and schema we want to locate this type of data. For this, we must create a new application data model. Go to the Application Data Modeling section and click Create. In the opened screen, select the database first and then the relevant schemas to define the scope for data masking. To locate columns of the sensitive data type, select the created application data model and click Edit. In the opened page, go to the “Sensitive Columns” tab and navigate to Actions &gt; Create Sensitive Columns Discovery Job. In the opened screen, select the schemas and sensitive column types to discover from the data model, then start the job.</p>

 <img src="${BASE_API_URL}/blog/4.png" class="mx-auto my-4" alt="Sensitive Columns Discovery" />

<p>The duration of this job may vary depending on the size of the data in the selected schema. Once the job is complete, go to Sensitive Columns &gt; Sensitive Column Discovery Results to view the results.</p>

 <img src="${BASE_API_URL}/blog/5.png" class="mx-auto my-4" alt="Sensitive Column Results" />

<p>On the resulting screen, columns that are potentially sensitive according to the selected sensitive column type are listed. The “Name” and “Data” columns indicate why a column is considered potentially sensitive. Columns with a check mark in the “Name” field match our defined column name patterns. The percentage value in the “Data” column shows the proportion of records in that column that match the searched data type. Each potential column in the list is reviewed by a subject matter expert, and columns confirmed as sensitive are marked as <strong>Set Sensitive Status &gt; Sensitive</strong>.</p>

<p>To perform data masking on columns identified as containing sensitive information, data masking scripts must be created. With Oracle Enterprise Manager, creating these scripts is straightforward. Navigate to Enterprise &gt; Quality Management &gt; Data Masking Definitions, click <strong>Create</strong>, and select the previously created application data model.</p>

 <img src="${BASE_API_URL}/blog/6.jpg" class="mx-auto my-4" alt="Data Masking Definitions" />

<p>Next, we need to define how we want to mask the sensitive columns identified earlier. Click <strong>Columns &gt; Add</strong>, select the schema and sensitive column type to search. The previously identified sensitive columns will appear, and we select the columns we want to mask. Then, click <strong>define format and add</strong>.</p>

 <img src="${BASE_API_URL}/blog/7.png" class="mx-auto my-4" alt="Columns Add" />

<p>Next, we determine the masking method for the selected column in the Format Entry section. For example, if we want to replace all records in the TC Identification Number column with a fixed value “11111111111,” select “Fixed Number” and enter “11111111111” in the Value field.</p>

 <img src="${BASE_API_URL}/blog/8.png" class="mx-auto my-4" alt="Format Entry" />

<p>Using the Format Entry library included with Oracle Enterprise Manager, it is possible to create masking scripts with various formats. A few examples include:</p>
<ul class="list-disc ml-6">
  <li><strong>Random Numbers:</strong> Generates random numbers</li>
  <li><strong>Shuffle:</strong> Shuffles the values within the selected column</li>
  <li><strong>Substitute:</strong> Replaces parts of the data with other values</li>
</ul>

 <img src="${BASE_API_URL}/blog/9.png" class="mx-auto my-4" alt="Generate Script1" />

<p>After completing these settings, we can generate the masking script. Select the prepared masking definition in Enterprise &gt; Quality Management &gt; Data Masking Definitions and click <strong>Generate Script</strong>. Oracle Enterprise Manager will generate a script that can be applied in a test environment, masking the data without affecting database operations.</p>

 <img src="${BASE_API_URL}/blog/10.png" class="mx-auto my-4" alt="Generate Script2" />

<p>References:</p>
<ul class="list-disc ml-6">
  <li><a href="http://www.mevzuat.gov.tr/MevzuatMetin/1.5.6698.pdf" target="_blank" class="text-blue-600 underline">KVKK Law No. 6698</a></li>
  <li><a href="http://www.resmigazete.gov.tr/eskiler/2017/10/20171028-10.htm" target="_blank" class="text-blue-600 underline">Official Gazette</a></li>
</ul>
`
}
];

const seedTechnicalSolutions = async () => {
  try {
    await connectDB();
    await Blog.deleteMany({ category: { $in: ["teknik-cozumler", "technical-solutions"] } });

    const withAuthor = technicalSolutions.map(t => ({ ...t, author: AUTHOR_ID }));
    const enWithAuthor = englishTechnicalSolutions.map(t => ({ ...t, author: AUTHOR_ID }));

    const inserted = await Blog.insertMany([...withAuthor, ...enWithAuthor]);
    console.log(`✅ Inserted ${inserted.length} technical solutions`);

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
    mongoose.disconnect();
  }
};

seedTechnicalSolutions();
