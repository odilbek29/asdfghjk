
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const progress = document.getElementById('progressBar');
    const menu = document.getElementById('menuToggle');
    const nav = document.getElementById('navLinks');
    const theme = document.getElementById('themeToggle');
    const topBtn = document.getElementById('backToTop');
    const modal = document.getElementById('modal');
    const openM = document.getElementById('openModal');
    const closeM = document.querySelector('.modal .close');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const fullImg = document.getElementById('fullImage');
    const overlay = document.getElementById('galleryOverlay');
    const closeG = document.querySelector('.close-gallery');
    const prevImg = document.getElementById('prevImg');
    const nextImg = document.getElementById('nextImg');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const templateCards = document.querySelectorAll('.template-card');
    const galleryFilterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
    const billingToggle = document.getElementById('billingToggle');
    const monthlyPrices = document.querySelectorAll('.monthly');
    const yearlyPrices = document.querySelectorAll('.yearly');
    let currentImgIndex = 0;
    let visibleTemplates = 6;

    setTimeout(() => { preloader.style.display = 'none'; }, 800);

    window.addEventListener('scroll', () => {
        const scroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progress.style.width = `${(scroll / height) * 100}%`;
        topBtn.style.display = scroll > 300 ? 'flex' : 'none';
    });

    menu?.addEventListener('click', () => nav.classList.toggle('active'));
    theme?.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        theme.querySelector('i').classList.toggle('fa-moon');
        theme.querySelector('i').classList.toggle('fa-sun');
    });
    topBtn?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

    openM?.addEventListener('click', e => { e.preventDefault(); modal.style.display = 'flex'; });
    closeM?.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImgIndex = index;
            fullImg.src = img.src;
            overlay.style.display = 'flex';
        });
    });
    closeG?.addEventListener('click', () => overlay.style.display = 'none');
    overlay?.addEventListener('click', e => { if (e.target === overlay) overlay.style.display = 'none'; });
    prevImg?.addEventListener('click', () => {
        currentImgIndex = (currentImgIndex - 1 + galleryItems.length) % galleryItems.length;
        fullImg.src = galleryItems[currentImgIndex].src;
    });
    nextImg?.addEventListener('click', () => {
        currentImgIndex = (currentImgIndex + 1) % galleryItems.length;
        fullImg.src = galleryItems[currentImgIndex].src;
    });


    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            templateCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            document.querySelectorAll('.gallery-item').forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

   
    document.getElementById('loadMoreTemplates')?.addEventListener('click', () => {
        visibleTemplates += 6;
        templateCards.forEach((card, i) => {
            if (i < visibleTemplates) card.style.display = 'block';
        });
    });

  
    billingToggle?.addEventListener('change', () => {
        if (billingToggle.checked) {
            monthlyPrices.forEach(p => p.classList.remove('active'));
            yearlyPrices.forEach(p => p.classList.add('active'));
        } else {
            monthlyPrices.forEach(p => p.classList.add('active'));
            yearlyPrices.forEach(p => p.classList.remove('active'));
        }
    });

 
    const counters = document.querySelectorAll('.counter, .count');
    const speed = 200;
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.getAttribute('data-target') || entry.target.parentElement.getAttribute('data-target');
                const inc = target / speed;
                let count = 0;
                const update = () => {
                    if (count < target) {
                        count = Math.ceil(count + inc);
                        entry.target.textContent = count;
                        setTimeout(update, 20);
                    } else entry.target.textContent = target;
                };
                update();
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    
    document.querySelectorAll('.accordion-header').forEach(h => {
        h.addEventListener('click', () => {
            const item = h.parentElement;
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            content.style.maxHeight = item.classList.contains('active') ? content.scrollHeight + 'px' : '0';
            h.querySelector('i').classList.toggle('fa-plus');
            h.querySelector('i').class.toggle('fa-minus');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    });
    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
});