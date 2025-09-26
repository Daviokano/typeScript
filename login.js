document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            // Como não há rota de login no backend, vou simular
            // Você precisará criar uma rota POST /auth/login no seu backend
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                alert('Login realizado com sucesso!');
                // Redirecionar para página principal
                window.location.href = 'dashboard.html';
            } else {
                alert('Email ou senha incorretos!');
            }
        } catch (error) {
            alert('Erro de conexão. Verifique se o servidor está rodando na porta 3000.');
        }
    });
});