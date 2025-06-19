
        // Generate stars dynamically
        const starContainer = document.querySelector('.stars');
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            starContainer.appendChild(star);
        }

        // Add shooting stars
        setInterval(() => {
            const shootingStar = document.createElement('div');
            shootingStar.classList.add('shooting-star');
            shootingStar.style.top = `${Math.random() * window.innerHeight}px`;
            shootingStar.style.left = `${Math.random() * window.innerWidth}px`;
            starContainer.appendChild(shootingStar);

            setTimeout(() => {
                shootingStar.remove();
            }, 5000);
        }, 3000);

        

        // MUCH REDUCED scroll opacity effect
        const sections = document.querySelectorAll('section');
        window.addEventListener('scroll', () => {
            const viewportHeight = window.innerHeight;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionCenter = rect.top + rect.height / 2;
                const viewportCenter = viewportHeight / 2;
                const distance = Math.abs(sectionCenter - viewportCenter);
                const maxDistance = viewportHeight;
                const opacity = Math.max(0.8, 1 - (distance / maxDistance) * 0.4); // MUCH REDUCED effect
                
                section.style.opacity = opacity.toFixed(2);
            });
        });

        // MUCH REDUCED mousemove effect for name outline
        document.addEventListener("mousemove", (event) => {
            const nameOutline = document.querySelector(".name-outline");
            if (!nameOutline) return;

            const { clientX: x, clientY: y } = event;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const offsetX = (x - centerX) / 80; // MUCH REDUCED from 60 to 80
            const offsetY = (y - centerY) / 80; // MUCH REDUCED from 60 to 80

            nameOutline.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // REMOVED parallax effect on cards to prevent interference with hover animations
    