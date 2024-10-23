// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//   productId: mongoose.Schema.Types.ObjectId,
//   text: String,
//   rating: Number
// });

// module.exports = mongoose.model('Review', reviewSchema);


  // Default profile picture
  const defaultProfilePic = 'https://via.placeholder.com/60';

  // Function to fetch and display reviews
  async function fetchReviews() {
      try {
          const response = await fetch('http://localhost:5000/api/comments/getComments');
          const reviews = await response.json();
          const reviewsContainer = document.getElementById('reviews');
          reviewsContainer.innerHTML = ''; // Clear current reviews

          reviews.forEach(review => {
              const reviewCard = document.createElement('div');
              reviewCard.classList.add('review-card');

              reviewCard.innerHTML = `
                  <div class="review-left">
                      <img src="${defaultProfilePic}" alt="User Avatar">
                  </div>
                  <div class="review-content">
                      <h3>${review.username}</h3>
                      <p>${review.message.length > 100 ? review.message.substring(0, 100) + '... <span class="read-more">Show more</span>' : review.message}</p>
                      <div class="date">${new Date(review.date).toLocaleDateString()}</div>
                      <div class="actions">
                          <button class="like-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M10 18a1.75 1.75 0 0 1-1.238-.512L3 12.646A5.002 5.002 0 0 1 5 4a5 5 0 0 1 10 0 5.002 5.002 0 0 1-2 8.646l-5.762 4.842A1.75 1.75 0 0 1 10 18z"></path></svg>Like</button>
                          <button class="reply-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M4.293 6.293a1 1 0 0 1 1.414 0L9 9.586V3a1 1 0 1 1 2 0v6.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414z"></path></svg>Reply</button>
                      </div>
                  </div>
              `;

              reviewsContainer.appendChild(reviewCard);

              const readMore = reviewCard.querySelector('.read-more');
              if (readMore) {
                  readMore.addEventListener('click', () => {
                      const fullText = review.message;
                      readMore.parentElement.innerHTML = fullText;
                  });
              }
          });
      } catch (error) {
          console.error('Error fetching reviews:', error);
      }
  }

  // Function to handle form submission and post a new comment
  async function submitReview(event) {
      event.preventDefault(); // Prevent page reload

      const username = document.getElementById('username').value;
      const message = document.getElementById('message').value;

      if (username && message) {
          const review = {
              username: username,
              message: message
          };

          try {
              const response = await fetch('http://localhost:5000/api/comments/addComment', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(review)
              });

              if (response.ok) {
                  document.getElementById('username').value = ''; // Clear the form
                  document.getElementById('message').value = '';
                  fetchReviews(); // Refresh the reviews list
              } else {
                  console.error('Error submitting review:', response.statusText);
              }
          } catch (error) {
              console.error('Error submitting review:', error);
          }
      }
  }

  // Fetch reviews when the page loads
window.onload = fetchReviews;

// Attach form submit event listener
document.getElementById('reviewForm').addEventListener('submit', submitReview);

  