function openCVModal(event) {
    event.preventDefault();
    document.getElementById('cvModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCVModal() {
    document.getElementById('cvModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fermer la modal en cliquant en dehors du contenu
document.getElementById('cvModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeCVModal();
    }
});

// Fermer la modal avec la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCVModal();
    }
});