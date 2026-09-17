document.addEventListener("DOMContentLoaded", function() {

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Navbar Scroll Effect ---
    // Change navbar color when scrolling down
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 150) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        });
    }


    // --- Scroll to Top Button ---
    // Show button on scroll and scroll up on click
    const scrollTopBtn = document.getElementById("scroll-to-top");
    if (scrollTopBtn) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }
        });

        scrollTopBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // --- Scroll Reveal Animations ---
    // Show elements when they appear on screen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-pill')) {
                    entry.target.classList.add('show-pill');
                }
                else if (entry.target.classList.contains('polaroid')) {
                    entry.target.classList.add('show-polaroid');
                }
                else if (entry.target.classList.contains('edu-img-wrapper')) {
                    entry.target.classList.add('show-edu-img');
                }
                else {
                    entry.target.classList.add('active');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    const elementsToAnimate = document.querySelectorAll('.skill-pill, .reveal-left, .reveal-right, .reveal-up, .polaroid, .edu-img-wrapper');
    elementsToAnimate.forEach((el) => observer.observe(el));


    // --- Project Slider ---
    // Move projects left and right on button click
    const track = document.getElementById('project-track');
    const prevBtnSlider = document.getElementById('prev-btn'); 
    const nextBtnSlider = document.getElementById('next-btn');
    
    if (track && prevBtnSlider && nextBtnSlider) {
        let isAnimating = false; 

        nextBtnSlider.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
            track.style.transform = 'translateX(-100%)';

            setTimeout(() => {
                track.style.transition = 'none'; 
                track.appendChild(track.firstElementChild); 
                track.style.transform = 'translateX(0)'; 
                isAnimating = false;
            }, 600); 
        });

        prevBtnSlider.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            track.style.transition = 'none';
            track.prepend(track.lastElementChild);
            track.style.transform = 'translateX(-100%)';

            setTimeout(() => {
                track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                track.style.transform = 'translateX(0)';
            }, 10);

            setTimeout(() => {
                isAnimating = false;
            }, 610);
        });
    }


    // --- Certification Pagination ---
    // Show 6 certificates per page
    const cards = document.querySelectorAll('.cert-card');
    const prevBtnCert = document.getElementById('cert-prev'); 
    const nextBtnCert = document.getElementById('cert-next');
    const dotsContainer = document.getElementById('cert-dots');

    if (cards.length > 0 && prevBtnCert && nextBtnCert && dotsContainer) {
        const itemsPerPage = 6;
        const totalPages = Math.ceil(cards.length / itemsPerPage);
        let currentPage = 1;

        // Create dots
        for(let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dotsContainer.appendChild(dot);
        }
        const dots = document.querySelectorAll('.dot');

        function showPage(page) {
            cards.forEach(card => {
                card.classList.remove('show-card');
                card.style.display = 'none'; 
            });

            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            for(let i = start; i < end && i < cards.length; i++) {
                cards[i].style.display = 'flex'; 

                setTimeout(() => {
                    cards[i].classList.add('show-card');
                }, 10);
            }
            
            prevBtnCert.disabled = page === 1;
            nextBtnCert.disabled = page === totalPages;

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === page - 1);
            });
        }

        prevBtnCert.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });

        nextBtnCert.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });

        showPage(1);
    }


    // --- PDF Modal Popup ---
    // Open and close PDF viewer for certificates
    const modal = document.getElementById('cert-modal');
    const modalPdf = document.getElementById('modal-pdf');
    const closeBtn = document.getElementById('modal-close-btn');
    const openBtns = document.querySelectorAll('.open-cert');

    if (modal && modalPdf && closeBtn) {
        openBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault(); 
                const pdfSrc = this.getAttribute('data-cert');
                if(pdfSrc) {
                    modalPdf.src = pdfSrc;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            setTimeout(() => modalPdf.src = '', 400);
        }

        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

});