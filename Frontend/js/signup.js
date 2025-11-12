document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  if (!username || !password || !confirmPassword) {
    alert('Please fill all fields!');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  
  try {
    const res = await fetch('http://localhost:3000/register',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed')
    alert(data.message);
    window.location.href = 'login.html';

  } catch (err) {
    console.error(err);
    alert(err.message);
  }

});
