// JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const feedUrl = 'https://www.bilgierdemdir.com/feeds/posts/default?max-results=10';

    fetch(feedUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const entries = xmlDoc.getElementsByTagName('entry');
            let titlesHtml = '';

            for (let entry of entries) {
                const title = entry.getElementsByTagName('title')[0].textContent;
                let links = Array.from(entry.getElementsByTagName('link'));
                let postLink = links.find(link => link.getAttribute('rel') === 'alternate')?.getAttribute('href');

                if (postLink) {
                    titlesHtml += `<a href="${postLink}" style="padding-right: 50px; color: inherit; text-decoration: none;">${title}</a>`;
                }
            }

            const marqueeContent = document.getElementById('marquee-content');
            marqueeContent.innerHTML = titlesHtml;

            const marqueeContainer = document.getElementById('marquee-container');
            let currentPosition = marqueeContainer.offsetWidth;

            function animateMarquee() {
                currentPosition -= 2;  // Adjust speed as needed
                if (currentPosition + marqueeContent.offsetWidth < 0) {
                    currentPosition = marqueeContainer.offsetWidth;
                }
                marqueeContent.style.transform = `translateX(${currentPosition}px)`;
                requestAnimationFrame(animateMarquee);
            }

            animateMarquee();  // Start animation
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
        });
});
