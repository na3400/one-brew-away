// Get saved cart
let cart = JSON.parse(localStorage.getItem("obaCart")) || [];


// =========================
// ADD PRODUCT
// =========================

function addToCart(name, price) {

    const existingItem =
        cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    saveCart();

    showCartMessage(name + " added to your cart");
}

function showCartMessage(message) {

    const notification = document.createElement("div");

    notification.className = "cart-notification";

    notification.innerHTML = `
        <span>✓</span>
        ${message}
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show");
    }, 10);

    setTimeout(() => {
        notification.classList.remove("show");

        setTimeout(() => {
            notification.remove();
        }, 300);

    }, 2500);
}


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem(
        "obaCart",
        JSON.stringify(cart)
    );

    updateCartCount();
    displayCart();
}


// =========================
// CART NUMBER
// =========================

function updateCartCount() {

    const counters =
        document.querySelectorAll(".cart-count");

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    counters.forEach(counter => {

        counter.textContent = totalItems;

    });
}


// =========================
// SHOW CART
// =========================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");

    const emptyCart =
        document.getElementById("empty-cart");

    const summary =
        document.querySelector(".cart-summary");


    // If we are not on cart.html
    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        emptyCart.style.display = "block";
        summary.style.display = "none";

        return;
    }


    emptyCart.style.display = "none";
    summary.style.display = "block";


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-product">

                    <h3>${item.name}</h3>

                    <p>${item.price} AED each</p>

                </div>


                <div class="quantity-controls">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>


                <div class="item-total">

                    ${itemTotal} AED

                </div>


                <button
                    class="remove-button"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    cartTotal.textContent = total;

}


// =========================
// INCREASE
// =========================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();
}


// =========================
// DECREASE
// =========================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();
}


// =========================
// REMOVE
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
}


// =========================
// CHECKOUT
// =========================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert(
        "Checkout and secure payment will be connected next."
    );
}


// START

updateCartCount();
displayCart();