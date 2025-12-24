
//  PAGE SWITCH 
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// PASSWORD TOGGLE
function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

//  SIGNUP VALIDATION 
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
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  // Clear errors
  ['fullnameError','emailError','phoneError','cityError','passwordError','confirmPasswordError']
    .forEach(id => document.getElementById(id).textContent = '');

  if (!fullname) {
    document.getElementById('fullnameError').textContent = 'Full name required';
    valid = false;
  }

  if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Invalid email';
    valid = false;
  }

  if (!phoneRegex.test(phone)) {
    document.getElementById('phoneError').textContent = 'Enter 10-digit phone number';
    valid = false;
  }

  if (!cityRegex.test(city)) {
    document.getElementById('cityError').textContent = 'City must contain letters only';
    valid = false;
  }

  if (!passwordRegex.test(password)) {
    document.getElementById('passwordError').textContent =
      'Password must be 8+ characters with letters & numbers';
    valid = false;
  }

  if (password !== confirmPassword) {
    document.getElementById('confirmPasswordError').textContent =
      'Passwords do not match';
    valid = false;
  }

  return valid;
}

//  SIGNUP SUBMIT 
document.getElementById('signupForm').addEventListener('submit', function(e) {
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
    showPage('signinPage');
  }
});

//  SIGNIN SUBMIT 
document.getElementById('signinForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('signinEmail').value.trim();
  const password = document.getElementById('signinPassword').value;

  document.getElementById('signinEmailError').textContent = '';
  document.getElementById('signinPasswordError').textContent = '';

  if (!email) {
    document.getElementById('signinEmailError').textContent = 'Email required';
    return;
  }

  if (!password) {
    document.getElementById('signinPasswordError').textContent = 'Password required';
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

  if (!storedUser) {
    alert('No user found. Please sign up.');
    showPage('signupPage');
    return;
  }

  if (storedUser.email === email && storedUser.password === password) {
    showPage('landingPage');
  } else {
    alert('Invalid email or password');
  }
});



