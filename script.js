document.addEventListener('DOMContentLoaded', function () {

    // ── Smooth scroll for nav buttons ──────────────────────────────────────
    document.querySelectorAll('.nav-button').forEach(function (button) {
        button.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                var target = document.getElementById(href.substring(1));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ── Back to top button ─────────────────────────────────────────────────
    var backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function () {
        backToTop.classList.toggle('visible', window.pageYOffset > 300);
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── Close modal on backdrop click ──────────────────────────────────────
    document.getElementById('docModal').addEventListener('click', function (e) {
        if (e.target === this) closeDoc();
    });

    // ── Close modal on Escape key ──────────────────────────────────────────
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDoc();
    });
});


// ── openDoc ────────────────────────────────────────────────────────────────
// Handles both PDFs (native browser rendering) and .docx files
// (Google Docs Viewer — requires a publicly accessible URL, i.e. deployed site).
function openDoc(filePath) {
    var modal     = document.getElementById('docModal');
    var frame     = document.getElementById('docFrame');
    var fallback  = document.getElementById('docxFallback');
    var titleEl   = document.getElementById('modalTitle');

    // Derive a friendly title from the filename
    var fileName = filePath.split('/').pop();                     // e.g. "security-plus.pdf"
    var baseName = fileName.replace(/\.[^.]+$/, '')               // strip extension
                           .replace(/[-_]/g, ' ')                 // dashes/underscores → spaces
                           .replace(/\b\w/g, function (c) {       // title-case
                               return c.toUpperCase();
                           });
    titleEl.textContent = baseName;

    var isDocx = fileName.toLowerCase().endsWith('.docx');

    if (isDocx) {
        // Google Docs Viewer needs an absolute, publicly reachable URL.
        // Works perfectly on GitHub Pages / Vercel / any live host.
        // Will show the fallback message when running from a local file://.
        var absoluteUrl = new URL(filePath, window.location.href).href;
        var isLocal     = window.location.protocol === 'file:';

        frame.style.display   = isLocal ? 'none' : 'block';
        fallback.style.display = isLocal ? 'flex'  : 'none';

        if (!isLocal) {
            frame.src = 'https://docs.google.com/viewer?url='
                        + encodeURIComponent(absoluteUrl)
                        + '&embedded=true';
        }
    } else {
        // PDFs render natively in every modern browser.
        frame.style.display    = 'block';
        fallback.style.display = 'none';
        frame.src = filePath;
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent background scroll
}


// ── closeDoc ───────────────────────────────────────────────────────────────
function closeDoc() {
    var modal = document.getElementById('docModal');
    modal.classList.remove('open');
    document.getElementById('docFrame').src = '';
    document.body.style.overflow = '';
}


// ── Legacy aliases (keeps any old onclick="openCert(...)" calls working) ───
var openCert  = openDoc;
var closeCert = closeDoc;