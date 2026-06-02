document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('animate-fadeIn');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Category Tabs Switcher (for meni.html)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuGrids = document.querySelectorAll('.menu-grid');

    if (tabButtons.length > 0 && menuGrids.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');
                
                // Hide all grids
                menuGrids.forEach(grid => {
                    grid.classList.add('hidden');
                });
                
                // Show target grid
                const targetGrid = document.getElementById(targetId);
                if (targetGrid) {
                    targetGrid.classList.remove('hidden');
                    targetGrid.classList.add('fade-in');
                }

                // Reset button styles
                tabButtons.forEach(btn => {
                    btn.className = 'tab-btn font-label-caps text-label-caps text-on-surface-variant hover:text-secondary pb-2 whitespace-nowrap uppercase transition-colors duration-300';
                });

                // Set active button style
                button.className = 'tab-btn font-label-caps text-label-caps text-secondary border-b-2 border-secondary pb-2 whitespace-nowrap uppercase transition-colors duration-300';
            });
        });
    }

    // Contact Form Validation & localStorage storage
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showToast('Molimo vas da popunite sva polja.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showToast('Molimo vas da unesete validnu email adresu.', 'error');
                return;
            }

            // Save submission to localStorage
            const submissions = JSON.parse(localStorage.getItem('caffe_fransiza_contacts') || '[]');
            submissions.push({ name, email, subject, message, date: new Date().toISOString() });
            localStorage.setItem('caffe_fransiza_contacts', JSON.stringify(submissions));

            showToast('Poruka je uspešno poslata! Kontaktiraćemo vas uskoro.', 'success');
            contactForm.reset();
        });
    }

    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showToast(message, type) {
        // Remove existing toast if present
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast elements
        const toast = document.createElement('div');
        toast.className = `toast-notification fixed bottom-8 right-8 z-[9999] px-6 py-4 rounded shadow-lg border text-sm font-semibold transition-all duration-300 translate-y-10 opacity-0 flex items-center gap-2 ${
            type === 'success' 
                ? 'bg-surface-container text-[#7D5700] border-[#7D5700]/30' 
                : 'bg-error-container text-[#BA1A1A] border-[#BA1A1A]/30'
        }`;

        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined text-xl';
        icon.textContent = type === 'success' ? 'check_circle' : 'error';
        
        const text = document.createElement('span');
        text.textContent = message;

        toast.appendChild(icon);
        toast.appendChild(text);
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
        }, 10);

        // Animate out
        setTimeout(() => {
            toast.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    }
});
