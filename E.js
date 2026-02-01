// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// jQuery smooth scrolling for anchor links
$(document).ready(function () {
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

$(".menu-items a").click(function () {
  $("#checkbox").prop("checked", false);
});

// Check if user is logged in when page loads
document.addEventListener('DOMContentLoaded', function() {
  checkUserLogin();
  
  const contactForm = document.getElementById('contact-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.querySelector('.close-modal');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      
      // Submit form to Formspree
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Show success modal
          showSuccessModal();
          // Reset form
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Show success modal anyway for demo purposes
        showSuccessModal();
        contactForm.reset();
      });
    });
  }

  // Close modal when clicking the X
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside of it
  window.addEventListener('click', function(event) {
    if (event.target === successModal) {
      closeModal();
    }
  });
});

function checkUserLogin() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const authButtons = document.getElementById('auth-buttons');
  
  if (currentUser && authButtons) {
    authButtons.innerHTML = `
      <span style="color: white; margin-right: 15px;">Welcome, ${currentUser.name}!</span>
      <a href="#" onclick="logout()" style="color: #ff3c78;">LOGOUT</a>
    `;
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  location.reload();
}

function showSuccessModal() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeModal() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}