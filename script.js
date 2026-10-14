// ==========================================
// NORTH STAR BAKERY - SCRIPT.JS
// Product Favoriting Feature with Live Favorites Section & localStorage
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    initProductFavorites();
});

function initProductFavorites() {
    const favoriteButtons = document.querySelectorAll(".favorite-btn");
    const favoritesList = document.getElementById("favorites-list");
    
    if (favoriteButtons.length === 0) return;

    // Load saved favorites from localStorage or initialize an empty array
    let savedFavorites = JSON.parse(localStorage.getItem("nsb_favorites")) || [];

    // Helper function to update the separate favorites display section
    function updateFavoritesDisplay() {
        if (!favoritesList) return;
        
        favoritesList.innerHTML = ""; // Clear current list

        if (savedFavorites.length === 0) {
            favoritesList.innerHTML = `<li><em>No favorites selected yet. Click "☆ Favorite" on any item below to add it here!</em></li>`;
            return;
        }

        // Loop through saved favorite IDs and create list elements for them
        savedFavorites.forEach(productId => {
            const matchingBtn = document.querySelector(`.favorite-btn[data-product="${productId}"]`);
            if (matchingBtn) {
                const productLi = matchingBtn.closest("li");
                const strongTag = productLi.querySelector("strong");
                
                if (strongTag) {
                    const li = document.createElement("li");
                    li.textContent = strongTag.textContent;
                    favoritesList.appendChild(li);
                }
            }
        });
    }

    // Initialize button states on page load
    favoriteButtons.forEach(button => {
        const productId = button.getAttribute("data-product");
        
        if (savedFavorites.includes(productId)) {
            button.classList.add("favorited");
            button.textContent = "★ Favorited";
        } else {
            button.classList.remove("favorited");
            button.textContent = "☆ Favorite";
        }

        // Add click listener for toggling favorites
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-product");
            
            if (savedFavorites.includes(id)) {
                savedFavorites = savedFavorites.filter(item => item !== id);
                this.classList.remove("favorited");
                this.textContent = "☆ Favorite";
            } else {
                savedFavorites.push(id);
                this.classList.add("favorited");
                this.textContent = "★ Favorited";
            }

            // Save to localStorage
            localStorage.setItem("nsb_favorites", JSON.stringify(savedFavorites));
            
            // Refresh the separate favorites section dynamically
            updateFavoritesDisplay();
        });
    });

    // Run once on load to populate the favorites section
    updateFavoritesDisplay();
}