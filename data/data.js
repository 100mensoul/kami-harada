        // 簡単なアニメーション効果
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.stat-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            }, {
                threshold: 0.1
            });

            cards.forEach((card) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });

            // 数字カウントアップ効果
            const bigNumbers = document.querySelectorAll('.big-number');
            bigNumbers.forEach((number) => {
                const finalValue = number.textContent;
                if (!isNaN(parseFloat(finalValue))) {
                    const targetValue = parseFloat(finalValue);
                    let currentValue = 0;
                    const increment = targetValue / 50;
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= targetValue) {
                            number.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            number.textContent = Math.floor(currentValue).toLocaleString();
                        }
                    }, 30);
                }
            });
        });
