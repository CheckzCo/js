const adUrls = [
    "https://static.cloudflareinsights.com/beacon.min.js",
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
    "https://ssl.google-analytics.com",
    "https://pagead2.googleadservices.com",
    "https://stats.g.doubleclick.net",
    "https://stats.wp.com",
    "https://static.media.net"
];

function createAdblockModal() {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal', 'is-active');

    const modalBackground = document.createElement('div');
    modalBackground.classList.add('modal-background');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    modalContent.innerHTML = `
        <div class="box has-background-warning">
            <h1 class="subtitle has-text-black">Ads Blocker Detected!!!</h1>
            <p class="description">It looks like you're using an ad blocker. That's okay. Who doesn't?<br><br>
            But without advertising-income, we can't keep making this site awesome.</p>
            <button class="button" onclick="window.location.reload()">I understand, I have disabled my ad blocker. Let me in!</button>
        </div>
    `;

    modalContainer.appendChild(modalBackground);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    // Add no-scroll class to body
    document.body.classList.add('no-scroll');
}

function adBlocker() {
    setTimeout(async () => {
        let adblockDetected = false; // Assume no adblocker is detected

        for (const url of adUrls) {
            try {
                const response = await fetch(url, { mode: 'no-cors' });
                if (response.ok) {
                    adblockDetected = true; // Adblocker detected
                    break;
                }
            } catch {
                continue;
            }
        }

        if (adblockDetected) {
            createAdblockModal();
        }
    }, 2000);
}

document.addEventListener("DOMContentLoaded", adBlocker);
