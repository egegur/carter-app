/**
 * Hukuki metinler — TASLAK.
 * Yayından önce avukat kontrolünden geçecek (docs/TASKS.md). [KÖŞELİ PARANTEZ] alanlar şirket kurulunca doldurulacak.
 * Dayanak: 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) m.5, m.6, m.9, m.10, m.11.
 */

export type LegalDocKey = 'aydinlatma' | 'acik-riza-saglik' | 'kullanim-sartlari';

export type LegalDoc = {
  title: string;
  sections: { heading: string; body: string[] }[];
};

export const LEGAL_DOCS: Record<LegalDocKey, LegalDoc> = {
  aydinlatma: {
    title: 'Aydınlatma Metni',
    sections: [
      {
        heading: 'Veri sorumlusu',
        body: [
          'Kişisel verilerin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla [ŞİRKET UNVANI] ("Carter") tarafından işlenir.',
        ],
      },
      {
        heading: 'Hangi verileri işliyoruz',
        body: [
          'Hesap bilgileri: ad, e-posta adresi, doğum yılı.',
          'Koçluk bilgileri: hedeflerin, nedenin, günlük planların, hesap cevapların, serilerin, challenge ve sohbet mesajların.',
          'İzin verirsen: Sağlık uygulamasından günlük toplam adım sayın.',
          'Ekran Süresi: hangi uygulamaları sınırlamak istediğin bilgisi telefonunda kalır. Hangi uygulamada ne yaptığını göremeyiz.',
          'Fotoğraf kanıtları ve ses kaydın sadece telefonunda saklanır, sunucularımıza gönderilmez.',
        ],
      },
      {
        heading: 'Neden işliyoruz',
        body: [
          'Sana koçluk hizmeti vermek, doğru saatte hatırlatma yapmak, Carter’ın mesajlarını sana göre ayarlamak, hesabını ve hizmetin güvenliğini sağlamak ve yasal yükümlülüklerimizi yerine getirmek için.',
        ],
      },
      {
        heading: 'Hukuki sebep',
        body: [
          'Hesap ve koçluk bilgileri: sözleşmenin kurulması ve ifası (KVKK m.5/2-c), meşru menfaat (m.5/2-f) ve hukuki yükümlülük (m.5/2-ç).',
          'Adım sayısı sağlık verisi sayılabileceği için sadece açık rızanla işlenir (KVKK m.6). Rıza vermesen de uygulamanın diğer özelliklerini kullanabilirsin.',
        ],
      },
      {
        heading: 'Kimlerle paylaşıyoruz',
        body: [
          'Hizmeti çalıştırmak için kullandığımız barındırma ve yapay zekâ hizmet sağlayıcılarıyla: [SAĞLAYICI LİSTESİ]. Bu sağlayıcıların bir kısmı yurt dışında bulunabilir; aktarım KVKK m.9’daki şartlara uygun yapılır.',
          'Kanunen yetkili kurumlarla, talep edilmesi hâlinde.',
        ],
      },
      {
        heading: 'Ne kadar saklıyoruz',
        body: ['Hesabın açık olduğu sürece. Hesabını silersen verilerin [SÜRE] içinde silinir ya da anonim hâle getirilir.'],
      },
      {
        heading: 'Hakların',
        body: [
          'KVKK m.11 uyarınca verilerinin işlenip işlenmediğini öğrenme, bilgi isteme, düzeltilmesini veya silinmesini isteme, aktarıldığı kişileri bilme, itiraz etme ve zararın giderilmesini isteme hakkın var.',
          'Başvuru için: [E-POSTA ADRESİ]',
        ],
      },
    ],
  },
  'acik-riza-saglik': {
    title: 'Açık Rıza Metni: Adım Sayısı',
    sections: [
      {
        heading: 'Neye rıza veriyorsun',
        body: [
          'Telefonumun Sağlık uygulamasındaki günlük toplam adım sayımın, Carter tarafından hareket hedeflerimin takibi ve bana özel hatırlatma yapılması amacıyla işlenmesine açık rıza veriyorum.',
        ],
      },
      {
        heading: 'Neler işlenmez',
        body: ['Konum, kalp atışı, uyku ve diğer sağlık verilerin okunmaz. Sadece günlük toplam adım sayısı kullanılır.'],
      },
      {
        heading: 'Rızanı geri alma',
        body: [
          'Rızanı istediğin zaman Profil → İzinler’den ya da telefonunun ayarlarından geri alabilirsin. Rıza vermemen veya geri alman, uygulamanın diğer özelliklerini kullanmana engel değildir.',
          'Ayrıntılar için Aydınlatma Metni’ni oku.',
        ],
      },
    ],
  },
  'kullanim-sartlari': {
    title: 'Kullanım Şartları',
    sections: [
      {
        heading: 'Hizmet',
        body: [
          'Carter, ertelediğin işleri bitirmen için hatırlatma, plan ve motivasyon desteği veren bir uygulamadır. Tıbbi, psikolojik veya hukuki tavsiye vermez; bu konularda bir uzmana danış.',
        ],
      },
      {
        heading: 'Hesap',
        body: ['Hesabını [YAŞ SINIRI] yaşından büyüksen açabilirsin. Hesap bilgilerinin doğru olmasından ve şifrenin güvenliğinden sen sorumlusun.'],
      },
      {
        heading: 'Topluluk kuralları',
        body: [
          'Saygılı ol, kimseyi aşağılama. Sadece kendi yaptığın işi paylaş. Uygunsuz içerik ve kişisel bilgi paylaşma. Kurallara uymayan içerikleri kaldırabilir, hesabı kapatabiliriz.',
        ],
      },
      {
        heading: 'Deneme ve abonelik',
        body: [
          'İlk ay ücretsizdir. Deneme bitince seçtiğin abonelik App Store veya Google Play üzerinden ücretlendirilir. Aboneliğini istediğin zaman mağaza ayarlarından iptal edebilirsin; iptal, dönemin sonunda geçerli olur.',
        ],
      },
      {
        heading: 'Değişiklikler',
        body: ['Bu şartları değiştirirsek uygulama içinde haber veririz.'],
      },
    ],
  },
};
