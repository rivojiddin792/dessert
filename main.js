let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        
        const name = button.getAttribute('data-name');
        
        const price = parseFloat(button.getAttribute('data-price'));

        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)} 
            <button class="remove-item" data-name="${item.name}">❌</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            cart = cart.filter(item => item.name !== name);
            updateCart();
        });
    });
}

document.getElementById('confirm-order').addEventListener('click', () => {
    if (cart.length > 0) {
        alert(`Order confirmed! Total: $${document.getElementById('cart-total').textContent}`);
        cart = [];
        updateCart();
    } else {
        alert('Your cart is empty!');
    }
});
