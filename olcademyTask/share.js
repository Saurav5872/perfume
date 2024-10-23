// Fetch product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Fetch product details
async function fetchProductDetails() {
    try {
        const response = await fetch(`/api/products/${productId}`);

        // Check if the response is okay
        if (!response.ok) {
            throw new Error("Failed to fetch product details.");
        }

        const product = await response.json();

        // Select product details container
        const productDetailsDiv = document.querySelector('.product-details');
        if (productDetailsDiv) {
            productDetailsDiv.innerHTML = `
                <h1>${product.name}</h1>
                <p>${product.fullDesc}</p>
                <span>Price: ${product.price}</span>
                <div>Available Sizes: ${product.sizes.join(', ')}</div>
                <div class="image-gallery">
                    ${product.images.map(image => `<img src="${image}" alt="${product.name}">`).join('')}
                </div>
                <div class="reviews-section">
                    <h2>Reviews</h2>
                    ${product.reviews.length > 0 
                        ? product.reviews.map(review => `
                            <div class="review">
                                <p>${review.text}</p>
                                <span>— ${review.user}</span>
                            </div>
                        `).join('')
                        : '<p>No reviews yet.</p>'}
                </div>
            `;
        }

        // Update share links dynamically
        const productURL = window.location.href; // Current page URL
        const shareLinks = {
            whatsapp: document.getElementById('whatsappShare'),
            facebook: document.getElementById('facebookShare'),
            instagram: document.getElementById('instagramShare'),
            email: document.getElementById('emailShare'),
            twitter: document.getElementById('twitterShare'),
            linkedin: document.getElementById('linkedinShare'),
        };

        if (shareLinks.whatsapp) {
            shareLinks.whatsapp.href = `https://wa.me/?text=Check out this product: ${productURL}`;
        }
        if (shareLinks.facebook) {
            shareLinks.facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${productURL}`;
        }
        if (shareLinks.instagram) {
            shareLinks.instagram.href = `https://www.instagram.com/?url=${productURL}`;
        }
        if (shareLinks.email) {
            shareLinks.email.href = `mailto:?subject=Check out this product&body=Check out this product: ${productURL}`;
        }
        if (shareLinks.twitter) {
            shareLinks.twitter.href = `https://twitter.com/intent/tweet?text=Check out this product: ${productURL}`;
        }
        if (shareLinks.linkedin) {
            shareLinks.linkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${productURL}`;
        }

    } catch (error) {
        console.error("Error fetching product details:", error.message);
        const productDetailsDiv = document.querySelector('.product-details');
        if (productDetailsDiv) {
            productDetailsDiv.innerHTML = `<p>Unable to load product details. Please try again later.</p>`;
        }
    }
}

fetchProductDetails();

// Show and hide share options
const shareBtn = document.getElementById('shareBtn');
const shareOptions = document.getElementById('shareOptions');
if (shareBtn && shareOptions) {
    shareBtn.addEventListener('click', () => {
        shareOptions.classList.toggle('show');
    });
}


