// Function to load partial content
function loadSection(containerId, url, selector) {
    fetch(url)
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = selector ? doc.querySelector(selector).innerHTML : doc.body.innerHTML;
            document.getElementById(containerId).innerHTML = content;

            console.log('Content loaded for:', containerId);
            
            // Dispatch custom event when about section is loaded
            if (containerId === 'about-section') {
                console.log('Dispatching aboutSectionLoaded event');
                // Add a small delay to ensure DOM is fully rendered
                setTimeout(() => {
                    window.dispatchEvent(new Event('aboutSectionLoaded'));
                }, 100);
            }
            
            // Dispatch custom event when work section is loaded
            if (containerId === 'works-section') {
                console.log('Dispatching workSectionLoaded event');
                setTimeout(() => {
                    window.dispatchEvent(new Event('workSectionLoaded'));
                }, 100);
            }
        })
        .catch((err) => console.error('Error loading section:', err));
}

// Load About and Contact partials into containers
loadSection('about-section', 'about.html', '#about');
loadSection('service-section', 'Services.html', '#services');
loadSection('works-section', 'Works.html', '#work');
loadSection('reviews-section', 'Testimonials.html', '#review');
loadSection('contact-section', 'Contact.html', '#contact');

// Active nav logic
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.menu li a');
    
    // Click handler - only clicked item gets background
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Remove active from ALL
            document.querySelectorAll('.menu li').forEach(listItem => {
                listItem.classList.remove('active');
            });
            
            // Add active ONLY to the clicked one
            this.closest('li').classList.add('active');
        });
    });
});

// Active nav on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id$="-section"], .main-content');
    const navLinks = document.querySelectorAll('.menu li a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            const sectionId = section.getAttribute('id');
            if (sectionId) {
                current = `#${sectionId}`;
            } else if (section.classList.contains('main-content')) {
                current = '#home-section';
            }
        }
    });
    
    // Remove active from all, add only to current
    navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.parentElement.classList.add('active');
        }
    });
});