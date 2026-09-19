document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formLogin');

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const email = document.getElementById('emailLogin').value.trim();
            const password = document.getElementById('passwordLogin').value.trim();

            if (email === '') {
                alert('Por favor, ingresa tu correo electrónico.');
                return;
            }

            if (!validarEmail(email)) {
                alert('Ingresa un correo electrónico válido (ejemplo@dominio.com).');
                return;
            }

            if (password === '') {
                alert('Por favor, ingresa tu contraseña.');
                return;
            }

            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            
            alert('¡Inicio de sesión exitoso!');
            window.location.href = 'index.html'; 
        });
    }
});

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}