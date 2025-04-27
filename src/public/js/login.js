document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Simpan token ke localStorage
        localStorage.setItem('token', data.token);
  
        // kee halaman utama 
        window.location.href = '/index.html';  
      } else {
        document.getElementById('errorMessage').innerText = data.message || 'Login gagal!';
      }
  
    } catch (error) {
      console.error(error);
      document.getElementById('errorMessage').innerText = 'Server error';
    }
  });
  