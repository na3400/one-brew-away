let checkoutCart =
    JSON.parse(localStorage.getItem("obaCart")) || [];


function displayCheckout() {

    const itemsContainer =
        document.getElementById("checkout-items");

    const totalElement =
        document.getElementById("checkout-total");

    let total = 0;

    itemsContainer.innerHTML = "";


    checkoutCart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        itemsContainer.innerHTML += `

            <div class="checkout-item">

                <div>
                    <h3>${item.name}</h3>

                    <p>
                        ${item.quantity} ×
                        ${item.price} AED
                    </p>
                </div>

                <span>
                    ${itemTotal} AED
                </span>

            </div>

        `;

    });


    totalElement.textContent = total;
}


function startPayment() {

    const name =
        document.getElementById("customer-name")
            .value.trim();

    const phone =
        document.getElementById("customer-phone")
            .value.trim();

    const carNumber =
        document.getElementById("car-number")
            .value.trim();


    if (!name || !phone || !carNumber) {

        showCheckoutMessage(
            "Please complete all your details."
        );

        return;
    }


    if (checkoutCart.length === 0) {

        showCheckoutMessage(
            "Your cart is empty."
        );

        return;
    }


    let total = 0;

    checkoutCart.forEach(item => {

        total += item.price * item.quantity;

    });


    const order = {

        customer: {
            name: name,
            phone: phone,
            carNumber: carNumber
        },

        items: checkoutCart,

        total: total,

        status: "pending_payment",

        createdAt: new Date().toISOString()

    };


    /*
       NEXT STEP:

       This order will be sent to OUR SECURE BACKEND.

       The backend will:

       1. Create the order.
       2. Calculate/verify the real total.
       3. Create the Ziina payment.
       4. Return the secure payment information.
       5. Ziina confirms whether payment succeeded.

       DO NOT PUT YOUR ZIINA SECRET API KEY HERE.
    */


    console.log("Order ready:", order);


    showCheckoutMessage(
        "Checkout is ready for Ziina connection."
    );

}


function showCheckoutMessage(message) {

    const oldMessage =
        document.querySelector(".checkout-message");

    if (oldMessage) {
        oldMessage.remove();
    }


    const notification =
        document.createElement("div");

    notification.className =
        "checkout-message";

    notification.textContent = message;

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


displayCheckout();