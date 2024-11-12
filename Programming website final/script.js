document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    //validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            this.querySelectorAll('input, textarea').forEach(field => {
                if (field.value.trim() === '') {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            if (isValid) {
                alert('Form submitted successfully!');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    });

    // Project page modal functionality
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalDetails = document.getElementById('modal-details');
    const closeModal = document.querySelector('.close');

    // Function to open the modal
    function openProjectModal(card, showDetails = false) {
        modalTitle.textContent = card.querySelector('h3').textContent;
        modalImage.src = card.querySelector('img').src;
        modalDescription.textContent = card.querySelector('p').textContent;
        
        if (showDetails) {
            const projectId = card.querySelector('.btn-small').getAttribute('href').split('#')[1];
            const details = getProjectDetails(projectId);
            modalDetails.innerHTML = details;
        } else {
            modalDetails.innerHTML = '<p>Click "Learn More" for additional project details.</p>';
        }
        
        modal.style.display = 'block';
    }

    // Event listener for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn-small')) {
                openProjectModal(this);
            }
        });
    });

    // Event listener for "Learn More" buttons
    document.querySelectorAll('.project-card .btn-small').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent the card click event from firing
            openProjectModal(this.closest('.project-card'), true);
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

});

function getProjectDetails(projectId) {
    
    const details = {
        'education': `
            <h4>Education for All Project Details</h4>
            <ul>
                <li>Established 15 new schools in rural areas</li>
                <li>Provided scholarships to 500+ underprivileged students</li>
                <li>Trained 200 teachers in modern teaching methods</li>
                <li>Implemented e-learning programs in 50 schools</li>
            </ul>
        `,
        'health': `
            <h4>Community Health Project Details</h4>
            <ul>
                <li>Set up 10 mobile health clinics</li>
                <li>Conducted health awareness campaigns reaching 100,000 people</li>
                <li>Provided free health check-ups to 50,000 individuals</li>
                <li>Distributed essential medicines in 100 villages</li>
            </ul>
        `,
        'environment': `
            <h4>Green Initiatives Project Details</h4>
            <ul>
                <li>Planted 100,000 trees across 50 communities</li>
                <li>Implemented recycling programs in 30 neighborhoods</li>
                <li>Conducted 100 workshops on sustainable living</li>
                <li>Cleaned up 20 km of coastline</li>
            </ul>
        `
    };
    
    return details[projectId] || '<p>No additional details available for this project.</p>';
}

let slideIndex = 0;
let timeoutId = null;
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");

// Initialize the slideshow
showSlides();

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        dots[i].classList.remove("active");
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
    
    // Change image every 5 seconds
    clearTimeout(timeoutId);
    timeoutId = setTimeout(showSlides, 5000);
}

function changeSlide(direction) {
    slideIndex += direction - 1;
    showSlides();
}

function currentSlide(index) {
    slideIndex = index;
    showSlides();
}

// Add touch support
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slideshow-container').addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

document.querySelector('.slideshow-container').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchEndX - touchStartX;
    
    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            // Swiped right
            changeSlide(-1);
        } else {
            // Swiped left
            changeSlide(1);
        }
    }
}