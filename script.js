document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when a navigation link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
      });
    });
  }

  // 2. Make Membership Plan Buttons Clickable & Interactive
  const planButtons = document.querySelectorAll('#membership .btn');
  const trialForm = document.getElementById('trialForm');
  const trialResult = document.getElementById('trialResult');

  planButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.pricing-card');
      const planName = card ? card.querySelector('h3').textContent : 'Selected Plan';

      if (trialResult && trialForm) {
        trialResult.style.display = 'block';
        trialResult.innerHTML = `Selected Plan: <strong>${planName}</strong>. Complete the form below to lock in your rate and free trial.`;
        
        // Focus the name input after scrolling
        setTimeout(() => {
          const nameInput = document.getElementById('fullName');
          if (nameInput) nameInput.focus();
        }, 500);
      }
    });
  });

  // 3. Interactive BMI Calculator
  const bmiForm = document.getElementById('bmiForm');
  const bmiResult = document.getElementById('bmiResult');

  if (bmiForm && bmiResult) {
    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const weight = parseFloat(document.getElementById('weight').value);
      const heightCm = parseFloat(document.getElementById('height').value);

      if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
        bmiResult.style.display = 'block';
        bmiResult.innerHTML = 'Please enter valid positive numbers for weight and height.';
        return;
      }

      const heightM = heightCm / 100;
      const bmi = (weight / (heightM * heightM)).toFixed(1);

      let category = '';
      let advice = '';

      if (bmi < 18.5) {
        category = 'Underweight';
        advice = 'Recommended: Strength & Hypertrophy program with a calorie surplus.';
      } else if (bmi < 25) {
        category = 'Normal weight';
        advice = 'Recommended: Strength & Powerlifting or Athletic Conditioning.';
      } else if (bmi < 30) {
        category = 'Overweight';
        advice = 'Recommended: HIIT & Conditioning paired with progressive strength training.';
      } else {
        category = 'Obese';
        advice = 'Recommended: 1-on-1 Personal Coaching for sustainable fat loss.';
      }

      bmiResult.style.display = 'block';
      bmiResult.innerHTML = `
        <strong>Your BMI: ${bmi} (${category})</strong><br>
        <span style="color: #9aa4b2; font-size: 0.88rem;">${advice}</span>
      `;
    });
  }

  // 4. Free Trial Booking Form with Validation & Local Storage
  if (trialForm && trialResult) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const goal = document.getElementById('goal').value;

      if (phone.length < 10) {
        trialResult.style.display = 'block';
        trialResult.innerHTML = '<span style="color: #ff4d24;">Please enter a valid 10-digit phone number.</span>';
        return;
      }

      // Save booking locally so data persists in browser
      const booking = {
        name,
        phone,
        goal,
        bookedAt: new Date().toLocaleString()
      };
      localStorage.setItem('ironpulse_trial_booking', JSON.stringify(booking));

      trialResult.style.display = 'block';
      trialResult.innerHTML = `
        ✓ Pass Confirmed for <strong>${name}</strong>!<br>
        <span style="color: #9aa4b2; font-size: 0.88rem;">Goal: ${goal} • We will contact ${phone} shortly.</span>
      `;
      trialForm.reset();
    });
  }

  // 5. Highlight Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.style.color = '#ff4d24';
        } else {
          navItem.style.color = '';
        }
      }
    });
  });
});
