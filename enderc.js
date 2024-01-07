// DOM yüklendikten sonra çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
  // Blogger feed URL'si
  const feedUrl = 'https://www.bilgierdemdir.com/feeds/posts/default?max-results=10';

  // Feed'den verileri al
  fetch(feedUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      // Entry'leri al
      const entries = xmlDoc.getElementsByTagName('entry');

      // Başlıkları ve linkleri topla
      let titlesHtml = '';
      for (let entry of entries) {
        const title = entry.getElementsByTagName('title')[0].textContent;
        // Doğru linki bul
        const links = entry.getElementsByTagName('link');
        let postLink = "";
        for (let link of links) {
          if (link.getAttribute('rel') === 'alternate') {
            postLink = link.getAttribute('href');
            break;
          }
        }
        // Eğer bir link bulunduysa, HTML'e ekle
        if (postLink) {
          titlesHtml += '<a href="' + postLink + '" style="padding-right: 50px; color: inherit; text-decoration: none;">' + title + '</a>';
        }
      }

      // Marquee içeriğini doldur
      document.getElementById('marquee-content').innerHTML = titlesHtml;

      // Marquee efekti için CSS ve JavaScript tanımları
      const marqueeContainer = document.getElementById('marquee-container');
      const marqueeContent = document.getElementById('marquee-content');
      let marqueeWidth = marqueeContent.offsetWidth;
      let containerWidth = marqueeContainer.offsetWidth;
      let currentPosition = containerWidth;

      // Marquee animasyonu
      function animateMarquee() {
        currentPosition -= 1; // Hızı ayarlayabilirsiniz.
        if (currentPosition < -marqueeWidth) {
          currentPosition = containerWidth;
        }
        marqueeContent.style.transform = 'translateX(' + currentPosition + 'px)';
        requestAnimationFrame(animateMarquee);
      }

      // Animasyonu başlat
      requestAnimationFrame(animateMarquee);
    });
});
