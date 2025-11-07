class ScrollAnimator {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            ...options
        };

        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
        this.targets = document.querySelectorAll('.scroll-animate');
        this.init();
    }

    init() {
        this.targets.forEach(el => {
            if (el.dataset.animation) {
                this.observer.observe(el);
            }
        });
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const animation = el.dataset.animation;
            const delay = parseFloat(el.dataset.delay) || 0;

            el.style.animationDelay = `${delay}s`;
            el.classList.add('animate__animated', animation);

            this.observer.unobserve(el);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimator();
});