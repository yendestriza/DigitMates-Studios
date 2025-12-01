console.log('work.js loaded');

window.addEventListener('workSectionLoaded', function() {
    console.log('workSectionLoaded event received');
    initializeWorkShowcase();
});

function initializeWorkShowcase() {
    console.log('initializeWorkShowcase called');
    
    const headings = document.querySelectorAll('.showcase-content h3');
    const cards = document.querySelectorAll('.showcase-card');
    const container = document.querySelector('.container-photo');
    
    console.log('headings:', headings);
    console.log('cards:', cards);
    console.log('container:', container);
    
    if (!headings.length || !cards.length || !container) {
        console.error('Work showcase elements not found!');
        return;
    }

    console.log('Initializing work showcase');
    
    // Set initial background from first card's data-bg attribute
    const firstCardBg = cards[0].getAttribute('data-bg');
    if (firstCardBg) {
        container.style.backgroundImage = `url('${firstCardBg}')`;
        console.log('Initial background set to:', firstCardBg);
    }
    
    // Set initial active state for first heading
    headings[0].classList.add('active');

    headings.forEach(heading => {
        heading.addEventListener('click', () => {
            console.log('Heading clicked:', heading.textContent);
            const index = heading.dataset.index;

            // Update headings active state
            headings.forEach(h => h.classList.remove('active'));
            heading.classList.add('active');

            // Update cards active state
            cards.forEach(card => card.classList.remove('active'));
            cards[index].classList.add('active');

            // Change background to match the active card's data-bg attribute
            const activeCard = cards[index];
            const bgImage = activeCard.getAttribute('data-bg');
            if (bgImage) {
                container.style.backgroundImage = `url('${bgImage}')`;
                console.log('Background changed to:', bgImage);
            }
        });
    });
    
    console.log('Work showcase initialized successfully');
}