
(async function() {
    const authControls = document.getElementById('auth-controls');

    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        const loginLink = document.createElement('a');

        loginLink.href = 'user.html';

        loginLink.textContent = 'Log in';

        loginLink.className = 'btn btn-outline-dark';

        authControls.appendChild(loginLink);
    } else {
       
        const logoutButton = document.createElement('button');

        logoutButton.textContent = 'Log out';

        logoutButton.className = 'btn btn-outline-dark';

        logoutButton.addEventListener('click', async function() {
            await supabaseClient.auth.signOut();

            window.location.href = 'index.html';
        });

        authControls.appendChild(logoutButton);
        
    }
})();