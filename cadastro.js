document.addEventListener('DOMContentLoaded', async function() {
    const form = document.querySelector('form');
    let defaultRoleId = null;
    
    // Buscar roles disponíveis
    try {
        const rolesResponse = await fetch('http://localhost:3000/roles');
        if (rolesResponse.ok) {
            const roles = await rolesResponse.json();
            console.log('Roles encontrados:', roles);
            if (roles.data && roles.data.length > 0) {
                defaultRoleId = roles.data[0].id;
                console.log('Role ID selecionado:', defaultRoleId);
            } else if (roles.length > 0) {
                defaultRoleId = roles[0].id;
                console.log('Role ID selecionado:', defaultRoleId);
            }
        } else {
            console.log('Erro ao buscar roles:', rolesResponse.status);
        }
    } catch (error) {
        console.log('Erro de conexão ao buscar roles:', error.message);
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        if (!defaultRoleId) {
            alert('Erro: Nenhum role disponível. Verifique o console para mais detalhes.');
            return;
        }
        
        try {
            console.log('Enviando dados:', {
                name: nome,
                email: email,
                password: '***',
                isAdmin: false,
                roleId: defaultRoleId
            });
            
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nome,
                    email: email,
                    password: password,
                    isAdmin: false,
                    roleId: defaultRoleId
                })
            });
            
            if (response.ok) {
                alert('Usuário criado com sucesso!');
                window.location.href = 'login.html';
            } else {
                const error = await response.json();
                console.log('Erro do servidor:', error);
                
                let errorMessage = 'Erro ao criar usuário: ';
                if (error.validation && error.validation.body) {
                    const validationErrors = error.validation.body.details;
                    errorMessage += validationErrors.map(err => err.message).join(', ');
                } else {
                    errorMessage += (error.message || 'Erro desconhecido');
                }
                
                alert(errorMessage);
            }
        } catch (error) {
            console.log('Erro de conexão:', error);
            alert('Erro de conexão: ' + error.message);
        }
    });
});