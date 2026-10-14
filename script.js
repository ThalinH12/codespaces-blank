// ==========================================
// NORTH STAR BAKERY - SCRIPT.JS
// Product Favoriting Feature with localStorage
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded - initializing favorites");
    initProductFavorites();
});

function initProductFavorites() {
    const favoriteButtons = document.querySelectorAll(".favorite-btn");
    console.log("Found favorite buttons:", favoriteButtons.length);
    
    if (favoriteButtons.length === 0) return;

    // Load saved favorites from localStorage or initialize an empty array
    let savedFavorites = JSON.parse(localStorage.getItem("nsb_favorites")) || [];

    favoriteButtons.forEach(button => {
        const productId = button.getAttribute("data-product");
        
        // Set initial state
        if (savedFavorites.includes(productId)) {
            button.classList.add("favorited");
            button.textContent = "★ Favorited";
        } else {
            button.classList.remove("favorited");
            button.textContent = "☆ Favorite";
        }

        // Add click listener
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-product");
            console.log("Clicked product:", id);
            
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
            console.log("Updated favorites:", savedFavorites);
        });
    });
}