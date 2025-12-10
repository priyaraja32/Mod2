
function togglePassword(id) {
  const input = document.getElementById(id);
  const toggle = input.nextElementSibling;
  if (input.type === "password") {
    input.type = "text";
    toggle.textContent = "Hide";
  } else {
    input.type = "password";
    toggle.textContent = "Show";
  }
}

// Signup validation
function validateSignupForm() {
  let valid = true;

  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const city = document.getElementById('city').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  const cityRegex = /^[A-Za-z\s]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // Clear errors
  ['fullnameError','emailError','phoneError','cityError','passwordError','confirmPasswordError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });

  if (!fullname) {
    document.getElementById('fullnameError').textContent = 'Full Name is required.';
    valid = false;
  }
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Enter a valid email.';
    valid = false;
  }
  if (!phoneRegex.test(phone)) {
    document.getElementById('phoneError').textContent = 'Phone must be 10 digits.';
    valid = false;
  }
  if (!cityRegex.test(city)) {
    document.getElementById('cityError').textContent = 'City must contain only letters.';
    valid = false;
  }
  if (!passwordRegex.test(password)) {
    document.getElementById('passwordError').textContent = 'Password must be 8+ chars with letters and numbers.';
    valid = false;
  }
  if (password !== confirmPassword) {
    document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
    valid = false;
  }

  return valid;
}

// Signin validation
function validateSigninForm() {
  let valid = true;

  const email = document.getElementById('signinEmail').value.trim();
  const password = document.getElementById('signinPassword').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  document.getElementById('signinEmailError').textContent = '';
  document.getElementById('signinPasswordError').textContent = '';

  if (!emailRegex.test(email)) {
    document.getElementById('signinEmailError').textContent = 'Enter a valid email.';
    valid = false;
  }
  if (!password) {
    document.getElementById('signinPasswordError').textContent = 'Password is required.';
    valid = false;
  }

  return valid;
}

// Signup form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateSignupForm()) {
      const user = {
        fullname: document.getElementById('fullname').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        city: document.getElementById('city').value.trim(),
        password: document.getElementById('password').value
      };
      localStorage.setItem('registeredUser', JSON.stringify(user));
      alert('Registration successful! Please sign in.');
      window.location.href = 'signin.html';
    }
  });
}

// Signin form submission
const signinForm = document.getElementById('signinForm');
if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateSigninForm()) {
      const email = document.getElementById('signinEmail').value.trim();
      const password = document.getElementById('signinPassword').value;

      const storedUserStr = localStorage.getItem('registeredUser');
      if (!storedUserStr) {
        alert('No registered user found. Please sign up.');
        window.location.href = 'signup.html';
        return;
      }
      const storedUser = JSON.parse(storedUserStr);

      if (storedUser.email === email && storedUser.password === password) {
        window.location.href = 'tourist.html';
      } else {
        alert('Invalid email or password.');
      }
    }
  });
}
