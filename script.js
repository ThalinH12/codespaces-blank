// ==========================================
// NORTH STAR BAKERY - MAIN SCRIPT
// Organized with functions, objects, and localStorage
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    // Initialize all site features on page load
    initPreOrderCalculator();
    initContactFormValidation();
});

// --- 1. INTERACTIVE FEATURE & LOCAL STORAGE ---
// Feature: Custom Pre-Order Calculator with localStorage persistence
function initPreOrderCalculator() {
    const calcForm = document.getElementById("order-calculator");
    if (!calcForm) return;

    const itemSelect = document.getElementById("item-select");
    const quantityInput = document.getElementById("quantity-input");
    const totalDisplay = document.getElementById("total-price-display");

    // Pre-defined menu items with prices
    const menuItems = {
        sourdough: 8.50,
        croissant: 4.00,
        knot: 5.00,
        cake: 35.00
    };

    // Load previously saved data from localStorage if available
    const savedItem = localStorage.getItem("nsb_selected_item");
    const savedQty = localStorage.getItem("nsb_selected_qty");

    if (savedItem && itemSelect) itemSelect.value = savedItem;
    if (savedQty && quantityInput) quantityInput.value = savedQty;

    function calculateTotal() {
        const selectedKey = itemSelect.value;
        const qty = parseInt(quantityInput.value) || 0;
        const unitPrice = menuItems[selectedKey] || 0;
        const total = unitPrice * qty;

        if (totalDisplay) {
            totalDisplay.textContent = `$${total.toFixed(2)}`;
        }

        // Save state to localStorage automatically
        localStorage.setItem("nsb_selected_item", selectedKey);
        localStorage.setItem("nsb_selected_qty", qty);
    }

    // Add event listeners for interaction
    itemSelect.addEventListener("change", calculateTotal);
    quantityInput.addEventListener("input", calculateTotal);

    // Run once on load to display initial calculation
    calculateTotal();
}

// --- 2. FORM VALIDATION & USER FEEDBACK ---
// Feature: Validates user input and provides clear feedback messages
function initContactFormValidation() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    const nameInput = document.getElementById("customer-name");
    const emailInput = document.getElementById("customer-email");
    const feedbackDiv = document.getElementById("form-feedback");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default submission to validate first

        let errors = [];

        // Validate Name
        if (!nameInput.value.trim()) {
            errors.push("Please enter your full name.");
        }

        // Validate Email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
            errors.push("Please enter a valid email address (e.g., name@example.com).");
        }

        // Display Feedback
        if (errors.length > 0) {
            feedbackDiv.style.color = "#d9534f"; // Error red
            feedbackDiv.innerHTML = "<strong>Please fix the following error(s):</strong><br><ul>" + 
                errors.map(err => `<li>${err}</li>`).join("") + "</ul>";
        } else {
            feedbackDiv.style.color = "#5cb85c"; // Success green
            feedbackDiv.innerHTML = "Thank you! Your pre-order request has been validated and saved successfully.";
            
            // Save successful submission state optionally
            localStorage.setItem("nsb_last_submitted_name", nameInput.value.trim());

            // Optionally reset form after short delay
            setTimeout(() => {
                contactForm.reset();
            }, 3000);
        }
    });
}