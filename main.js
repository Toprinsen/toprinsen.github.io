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

const projectsTags = document.querySelectorAll(".project-tags span");

let filtersTab = ["all"];

projectsTags.forEach(tag => {
    const classes = Array.from(tag.classList);
    const filterClass = classes.find(cls => cls !== 'project-tag');

    if (filterClass && !filtersTab.includes(filterClass))
    {
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
    // Retirer la classe active de tous les boutons
    document.querySelectorAll(".project-filter-tag").forEach(btn => {
        btn.classList.remove("active");
    });
    // Ajouter la classe active au bouton cliqué
    clickedElement.classList.add("active");

    // Filtrer les cartes de projets avec animation
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

// Activer le filtre "All" par défaut
const allFilter = document.querySelector(".project-filters-container .project-filter-tag");
if (allFilter) {
    allFilter.classList.add("active");
}
