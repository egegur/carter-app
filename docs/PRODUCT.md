# Ürün kararları (özet)

Ayrıntılı kayıt: Claude Docs'taki **"Dürtücü – Kapsam ve İş Modeli"** belgesi ve karar günlüğü. Bu dosya kod yazarken gereken özet.

## Ne yapıyoruz

Ertelenen günlük işleri (iş, ders, spor, beslenme, ev işleri…) **bitirten** bir koç uygulaması. Motivasyon videosu değil; gün içinde yanında olan, hesap soran ama cezalandırmayan bir koç.

- Pazar: Türkiye, Türkçe. iOS ve Android aynı anda.
- Koç: **Koç Carter** (çalışma adı). Yüz göstermez; animasyonlu karakter (seçenek C). Karakter gelene kadar "C" avatarı.
- Ton: kullanıcı seçer — Yumuşak / Samimi / Sert. İnsan gibi konuşur.
- Alan sınırı yok; kurulumda **birden fazla alan** seçilebilir ve her alan için ayrı hedef (hedef, sıklık, en küçük adım) girilir.
- Sıklık: her gün, hafta içi, hafta sonu, haftada 1–6 gün ya da belirli günler.
- Serbest metin alanları anlamlı metin ister (en az kelime/harf, işaret ve karalama engeli). Kurallar: `src/utils/validation.ts`.
- İzinler seçilen alanlara göre istenir: bildirim ve Ekran Süresi herkese; adım sayısı sadece Spor veya Sağlıklı beslenme seçildiyse.

## Günlük döngü

1. **Sabah planı** (08:30): ne, ne zaman, nerede + nasıl kanıtlanacak → "Bugünkü sözün".
2. **Sıradaki iş**: Başla → odak seansı / fotoğraf / sözlü onay.
3. **Hesap randevusu**: saat gelince "ne durumda?" (60 saniye).
4. **Kaçırma anı**: suçlama yok → sebep → "şimdi sadece 5 dakika" (en küçük adım) veya joker.
5. **Akşam hesabı** (21:00): günün özeti, emanet teslimi, yarının ilk işi.
6. **Haftalık özet**: en iyi gün, en sık engel, işe yarayan araç, gelecek hafta önerisi.

## Araç kutusu (kullanıcı açar, ceza yok)

- **Neden çapası**: kullanıcının kendi sözü (yazı + en fazla 25 sn ses). Zor anda ona hatırlatılır.
- **Zevk emaneti**: sevdiği bir şey iş bitince "teslim" edilir (kullanıcı izniyle).
- **Kademeli frenleme**: seçilen uygulamalar açılınca önce bugünkü iş görünür; bekleme her seferinde uzar.
- **Hemen 5 dakika**: kaçırmada en küçük adımla başlatma.
- **Takım serisi**, **karakterle bağ**.
- Telefonla arama özelliği **yok**.

## Challenge

Kişisel günlük challenge · Düello (3 gün, kanıtlı iş = 1 puan) · Takım serisi (2 kişi) · Topluluk challenge'ı (aylık ortak hedef).

## Kanıt ve gizlilik

- Kanıt türleri: odak seansı, **anlık** fotoğraf (galeriden değil), adım sayısı (Sağlık), sözlü onay.
- Fotoğraf ve ses kaydı **sadece telefonda** kalır; sunucuya ancak teknik zorunluluk varsa gider.
- Topluluk içeriğinde katmanlı moderasyon: cihaz içi kontrol + bildir düğmesi + inceleme kuyruğu.
- Ekran Süresi verisinde ne izlendiğini göremeyiz (Apple Screen Time API'sinin doğası).
- Adım sayısı sağlık verisi sayılabileceği için **açık rıza** ile alınır (KVKK m.6); onay kutusu varsayılan işaretsiz, rıza vermeyen uygulamanın geri kalanını kullanabilir.
- Hukuki metinler (aydınlatma, açık rıza, kullanım şartları) uygulamada **taslak** olarak var; avukat kontrolü yayından önce.

## İş modeli

- **1 ay ücretsiz deneme**, sonra yıllık / aylık abonelik. Ücretsiz sürüm de var. Fiyatlar henüz belli değil (`[YILLIK FİYAT]`, `[AYLIK FİYAT]`).
- Kendi kaynağımızla başlıyoruz; önce satış, yatırım sonra.
- Pazarlama bütçesi uygulama yayına girince. Kanal: Instagram ve benzerlerinde topluluk; yüz göstermeden animasyonla içerik.
- Şirket gelir gelince kurulacak. Avukat kontrolü üretime çıkmadan önce, en sonda.
- Yapay zekâ sağlayıcısı testle seçilecek.

## Kapsam dışı (şimdilik)

Sınav modülü odak değil. Telefon araması yok. Yüz gösteren video yok.
