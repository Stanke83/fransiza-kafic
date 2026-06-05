// Mobile menu toggle - runs immediately when script loads AND on DOMContentLoaded
function initMobileMenu() {
    var btn  = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (btn && menu && !btn._menuInit) {
        btn._menuInit = true;
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.toggle('hidden');
        });
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!btn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add('hidden');
            }
        });
    }
}

// Try immediately (script at bottom of body)
initMobileMenu();
// Also on DOMContentLoaded as fallback
document.addEventListener('DOMContentLoaded', initMobileMenu);

document.addEventListener('DOMContentLoaded', function() {

    // Nav height CSS variable
    function updateNavHeight() {
        var nav = document.querySelector('nav');
        if (nav) {
            document.documentElement.style.setProperty('--nav-h', nav.getBoundingClientRect().height + 'px');
        }
    }
    updateNavHeight();
    window.addEventListener('resize', function() {
        clearTimeout(window._nt);
        window._nt = setTimeout(updateNavHeight, 120);
    });

    // Category Tabs Switcher (for meni.html)
    var tabButtons = document.querySelectorAll('.tab-btn');
    var menuGrids  = document.querySelectorAll('.menu-grid');

    if (tabButtons.length > 0 && menuGrids.length > 0) {
        tabButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var targetId = button.getAttribute('data-target');
                menuGrids.forEach(function(grid) { grid.classList.add('hidden'); });
                var targetGrid = document.getElementById(targetId);
                if (targetGrid) {
                    targetGrid.classList.remove('hidden');
                    targetGrid.classList.add('fade-in');
                }
                tabButtons.forEach(function(btn) {
                    btn.className = 'tab-btn font-label-caps text-label-caps text-on-surface-variant hover:text-secondary pb-2 whitespace-nowrap uppercase transition-colors duration-300';
                });
                button.className = 'tab-btn font-label-caps text-label-caps text-secondary border-b-2 border-secondary pb-2 whitespace-nowrap uppercase transition-colors duration-300';
            });
        });
    }

    // Contact Form
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var name    = document.getElementById('name').value.trim();
            var email   = document.getElementById('email').value.trim();
            var subject = document.getElementById('subject').value.trim();
            var message = document.getElementById('message').value.trim();
            if (!name || !email || !subject || !message) {
                showToast('Molimo vas da popunite sva polja.', 'error'); return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('Molimo vas da unesete validnu email adresu.', 'error'); return;
            }
            showToast('Poruka je uspešno poslata! Kontaktiraćemo vas uskoro.', 'success');
            contactForm.reset();
        });
    }

    function showToast(message, type) {
        var existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();
        var toast = document.createElement('div');
        toast.className = 'toast-notification fixed bottom-8 right-8 z-[9999] px-6 py-4 rounded shadow-lg border text-sm font-semibold transition-all duration-300 translate-y-10 opacity-0 flex items-center gap-2 ' +
            (type === 'success' ? 'bg-surface-container text-[#7D5700] border-[#7D5700]/30' : 'bg-error-container text-[#BA1A1A] border-[#BA1A1A]/30');
        var icon = document.createElement('span');
        icon.className = 'material-symbols-outlined text-xl';
        icon.textContent = type === 'success' ? 'check_circle' : 'error';
        var text = document.createElement('span');
        text.textContent = message;
        toast.appendChild(icon);
        toast.appendChild(text);
        document.body.appendChild(toast);
        setTimeout(function() { toast.classList.remove('translate-y-10', 'opacity-0'); }, 10);
        setTimeout(function() {
            toast.classList.add('translate-y-10', 'opacity-0');
            setTimeout(function() { toast.remove(); }, 300);
        }, 4000);
    }
});
