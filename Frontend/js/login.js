document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('❌ Please enter both username and password!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    if (data.success) {
      // Store only safe info for frontend
      localStorage.setItem('username', data.username);
      localStorage.setItem('userId', data.userId);

      alert(`✅ Welcome, ${data.username}!`);
      window.location.href = 'level.html';
    } else {
      alert(`❌ Login failed: ${data.message}`);
    }

  } catch (error) {
    console.error('Login error:', error);
    alert('❌ Something went wrong. Please try again later.');
  }
});
