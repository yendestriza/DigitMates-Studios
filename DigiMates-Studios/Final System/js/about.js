console.log('about.js loaded');

window.addEventListener('aboutSectionLoaded', function() {
    console.log('aboutSectionLoaded event received');
    initializeSlider();
});

function initializeSlider() {
    console.log('initializeSlider called');
    
    const slider = document.querySelector('.slider');
    const slideLeft = document.getElementById('slide-left');
    const slideRight = document.getElementById('slide-right');

    console.log('slider:', slider);
    console.log('slideLeft:', slideLeft);
    console.log('slideRight:', slideRight);

    if (!slider || !slideLeft || !slideRight) {
        console.error('Slider elements not found!');
        return;
    }

    let currentIndex = 0;
    const cardWidth = 330;

    function updateArrows() {
        const visibleCards = Math.floor(slider.parentElement.offsetWidth / cardWidth);
        const maxScroll = Math.max(0, slider.children.length - visibleCards);
        
        slideLeft.style.display = currentIndex === 0 ? 'none' : 'block';
        slideRight.style.display = currentIndex >= maxScroll ? 'none' : 'block';
    }

    slideRight.addEventListener('click', () => {
        console.log('Right arrow clicked');
        const visibleCards = Math.floor(slider.parentElement.offsetWidth / cardWidth);
        const maxScroll = Math.max(0, slider.children.length - visibleCards);
        
        if (currentIndex < maxScroll) {
            currentIndex++;
            slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            updateArrows();
        }
    });

    slideLeft.addEventListener('click', () => {
        console.log('Left arrow clicked');
        if (currentIndex > 0) {
            currentIndex--;
            slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            updateArrows();
        }
    });

    updateArrows();
    console.log('Slider initialized successfully');
}