// ==========================================
// NORTH STAR BAKERY - SCRIPT.JS
// Product Favoriting Feature with localStorage
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    initProductFavorites();
});

// --- FAVORITE PRODUCTS INTERACTIVE FEATURE ---
function initProductFavorites() {
    // Select all favorite buttons (assumes buttons have class 'favorite-btn' and a data-product attribute)
    const favoriteButtons = document.querySelectorAll(".favorite-btn");
    
    if (favoriteButtons.length === 0) return;

    // Load saved favorites from localStorage or initialize an empty array
    let savedFavorites = JSON.parse(localStorage.getItem("nsb_favorites")) || [];

    // Apply initial favorited state to buttons on page load
    favoriteButtons.forEach(button => {
        const productId = button.getAttribute("data-product");
        
        if (savedFavorites.includes(productId)) {
            button.classList.add("favorited");
            button.textContent = "★ Favorited";
        } else {
            button.classList.remove("favorited");
            button.textContent = "☆ Favorite";
        }

        // Add click event listener for favoriting / unfavoriting
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-product");
            
            if (savedFavorites.includes(id)) {
                // Unfavorite: Remove from array
                savedFavorites = savedFavorites.filter(item => item !== id);
                this.classList.remove("favorited");
                this.textContent = "☆ Favorite";
            } else {
                // Favorite: Add to array
                savedFavorites.push(id);
                this.classList.add("favorited");
                this.textContent = "★ Favorited";
            }

            // Save updated array to localStorage so it persists on refresh
            localStorage.setItem("nsb_favorites", JSON.stringify(savedFavorites));
        });
    });
}