// Gestion du modal CV
function openCVModal(event) {
    event.preventDefault();
    document.getElementById('cvModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCVModal() {
    document.getElementById('cvModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.getElementById('cvModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeCVModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCVModal();
    }
});

// Système de filtrage des projets
const projectsTags = document.querySelectorAll(".project-tags span");
let filtersTab = ["all"];

projectsTags.forEach(tag => {
    const classes = Array.from(tag.classList);
    const filterClass = classes.find(cls => cls !== 'project-tag');

    if (filterClass && !filtersTab.includes(filterClass)) {
        filtersTab.push(filterClass);
    }
});

let projetsSection = document.getElementById("projets");
let divFilters = document.createElement("div");
divFilters.classList.add("project-filters-container"); 

const h2 = projetsSection.querySelector('h2');
projetsSection.insertBefore(divFilters, h2.nextElementSibling);

const projectCards = document.querySelectorAll(".project-card");

function filterProjects(filter, clickedElement) {
    document.querySelectorAll(".project-filter-tag").forEach(btn => {
        btn.classList.remove("active");
    });
    clickedElement.classList.add("active");

    projectCards.forEach(card => {
        const tags = card.querySelectorAll(".project-tag");
        let hasFilter = (filter === "all");

        if (filter !== "all") {
            tags.forEach(tag => {
                if (tag.classList.contains(filter)) {
                    hasFilter = true;
                }
            });
        }
        
        if (hasFilter) {
            card.classList.remove("hidden");
            card.classList.add("visible");
        } else {
            card.classList.remove("visible");
            card.classList.add("hidden");
        }
    });
}

filtersTab.forEach(filter => {
    let divFilter = document.createElement("div");
    divFilter.classList.add("project-filter-tag");
    divFilter.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);

    divFilter.addEventListener('click', (event) => {
        filterProjects(filter, event.target);
    });

    divFilters.appendChild(divFilter);
});

const allFilter = document.querySelector(".project-filters-container .project-filter-tag");
if (allFilter) {
    allFilter.classList.add("active");
}

// Gestion du menu hamburger mobile
function createMobileNav() {
    const nav = document.querySelector('nav');
    const navToggle = document.createElement('button');
    navToggle.classList.add('nav-toggle');
    navToggle.textContent = 'Home';
    navToggle.id = 'navToggle';
    
    document.body.appendChild(navToggle);
    
    // Toggle menu
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        if (nav.classList.contains('active')) {
            navToggle.textContent = '✕ Close';
        } else {
            updateNavToggleText();
        }
    });
    
    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Ne pas fermer pour le CV modal
            if (href !== '#' && !href.includes('javascript')) {
                nav.classList.remove('active');
                updateNavToggleText();
            }
        });
    });
    
    // Mettre à jour le texte du bouton selon la section visible
    updateNavToggleText();
}

function updateNavToggleText() {
    const navToggle = document.getElementById('navToggle');
    const sections = document.querySelectorAll('section[id]');
    
    let currentSection = 'Home';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    const sectionNames = {
        'accueil': 'Home',
        'competences': 'Skills',
        'projets': 'Projects',
        'apropos': 'About me',
        'contact': 'Contact'
    };
    
    if (navToggle) {
        navToggle.textContent = sectionNames[currentSection] || 'Home';
    }
}

// Créer le menu mobile au chargement
if (window.innerWidth <= 768) {
    createMobileNav();
}

// Gérer le redimensionnement de la fenêtre
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const existingToggle = document.getElementById('navToggle');
        const nav = document.querySelector('nav');
        
        if (window.innerWidth <= 768 && !existingToggle) {
            createMobileNav();
        } else if (window.innerWidth > 768 && existingToggle) {
            existingToggle.remove();
            nav.classList.remove('active');
        }
    }, 250);
});

// Mettre à jour le texte du bouton lors du scroll
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
        updateNavToggleText();
    }
});
