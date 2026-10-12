// script.js - North Star Bakery Touchstone 4

// Data structures: Objects and Arrays to manage products and favorites
const bakeryProducts = [
    { id: 1, name: "Artisan Sourdough", category: "Breads" },
    { id: 2, name: "Butter Croissant", category: "Pastries" },
    { id: 3, name: "Honey Cardamom Knot", category: "Pastries" },
    { id: 4, name: "Seasonal Fruit Tart", category: "Pastries" }
];

let userFavorites = JSON.parse(localStorage.getItem("bakeryFavorites")) || [];

// Initialize features on page load
document.addEventListener("DOMContentLoaded", () => {
    setupInteractiveFeature();
    setupFormValidation();
});

// 1. Interactive Feature: Favorite Bakes Tracker
function setupInteractiveFeature() {
    const container = document.getElementById("interactive-feature-container");
    if (!container) return;

    let html = "<h3>Select Your Favorite Bakes</h3><div class='product-list'>";
    bakeryProducts.forEach(product => {
        const isFav = userFavorites.includes(product.name);
        html += `<div class='product-item' style='margin-bottom: 10px;'>
            <span><strong>${product.name}</strong> (${product.category})</span>
            <button class='fav-btn' data-name='${product.name}' style='margin-left: 15px; padding: 5px 10px; cursor: pointer;'>${isFav ? "Remove Favorite" : "Add to Favorites"}</button>
        </div>`;
    });
    html += "</div><div id='fav-output' style='margin-top: 15px;'><h4>Your Saved Favorites:</h4><ul id='fav-list'></ul></div>";
    container.innerHTML = html;

    updateFavoritesDisplay();

    container.addEventListener("click", (e) => {
        if (e.target.classList.contains("fav-btn")) {
            const productName = e.target.getAttribute("data-name");
            toggleFavorite(productName);
        }
    });
}

function toggleFavorite(productName) {
    const index = userFavorites.indexOf(productName);
    if (index > -1) {
        userFavorites.splice(index, 1);
    } else {
        userFavorites.push(productName);
    }
    
    // Save to localStorage
    localStorage.setItem("bakeryFavorites", JSON.stringify(userFavorites));
    setupInteractiveFeature();
}

function updateFavoritesDisplay() {
    const favList = document.getElementById("fav-list");
    if (!favList) return;
    
    favList.innerHTML = "";
    if (userFavorites.length === 0) {
        favList.innerHTML = "<li>No favorites selected yet.</li>";
    } else {
        userFavorites.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            favList.appendChild(li);
        });
    }
}

// 2. Form Validation Feature
function setupFormValidation() {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        let isValid = true;
        clearErrors();

        // Required field check for Name
        const nameInput = document.getElementById("name") || form.querySelector("input[name='name']");
        if (nameInput && nameInput.value.trim() === "") {
            showError(nameInput, "Please enter your name for the pre-order.");
            isValid = false;
        }

        // Email validation check
        const emailInput = document.getElementById("email") || form.querySelector("input[name='email']");
        if (emailInput) {
            const emailValue = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailValue === "") {
                showError(emailInput, "Email address is required.");
                isValid = false;
            } else if (!emailPattern.test(emailValue)) {
                showError(emailInput, "Please enter a valid email address (e.g., name@example.com).");
                isValid = false;
            }
        }

        if (!isValid) {
            e.preventDefault();
        }
    });
}

function showError(inputElement, message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.color = "#d9534f";
    errorDiv.style.fontSize = "0.85rem";
    errorDiv.style.marginTop = "4px";
    errorDiv.textContent = message;
    inputElement.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach(err => err.remove());
}