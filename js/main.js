document.addEventListener('DOMContentLoaded', function () {

    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    function closeMenu() {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.querySelectorAll('.has-dropdown.open').forEach(d => d.classList.remove('open'));
    }

    if (toggle && navLinks) {
        toggle.addEventListener('click', function () {
            var open = navLinks.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {

            link.addEventListener('click', function (e) {

                var parent = this.parentElement;
                var isDropdownToggle = parent.classList.contains('has-dropdown');

                /* =========================
                   MOBILE
                   ========================= */
                if (window.innerWidth <= 980) {

                    if (isDropdownToggle) {

                        e.preventDefault();

                        parent.classList.toggle('open');

                    } else {

                        // Close menu after selecting:
                        // Home / Products / About / Contact
                        closeMenu();
                    }

                }

                /* =========================
                   DESKTOP
                   ========================= */
                else {

                    // Close any previously opened dropdown
                    navLinks
                        .querySelectorAll('.has-dropdown.open')
                        .forEach(function (dropdown) {
                            dropdown.classList.remove('open');
                        });
                }

            });

        });

        document.addEventListener('click', function (e) {
            if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('in'); });
    }

    var yearEl = document.getElementById('year');
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

    var toTop = document.getElementById('to-top');
    if (toTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) { toTop.classList.add('show'); }
            else { toTop.classList.remove('show'); }
        }, { passive: true });
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    var form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var success = document.getElementById('form-success');
            if (success) {
                success.classList.add('show');
                success.setAttribute('role', 'status');
                success.textContent = "Thanks — your message is ready to send. Connect this form to your email or CRM to deliver it automatically.";
            }
            form.reset();
        });
    }
});
