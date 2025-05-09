import axios from 'axios';

const handleRegister = async () => {
  let valid = true;
  let errorMessages = { name: '', email: '', phone: '', password: '', confirmPassword: '' };

  if (!name) {
    errorMessages.name = 'Please enter your name';
    valid = false;
  }
  if (!email) {
    errorMessages.email = 'Please enter your email';
    valid = false;
  }
  if (!phone) {
    errorMessages.phone = 'Please enter your phone number';
    valid = false;
  }
  if (!password) {
    errorMessages.password = 'Please enter your password';
    valid = false;
  }
  if (password !== confirmPassword) {
    errorMessages.confirmPassword = 'Passwords do not match';
    valid = false;
  }

  setError(errorMessages);

  if (valid) {
    try {
      await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        phone,
        password,
      });
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
    }
  }
};
