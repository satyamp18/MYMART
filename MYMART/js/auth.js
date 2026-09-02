// js/auth.js
// MYMART Authentication & User Profile Controller

document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();

            const storedUsers = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '[]');
            const user = storedUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

            if (user) {
                if (user.password === password) {
                    // Set Active Session
                    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
                    showToast(`Welcome back, ${user.name}!`);
                    setTimeout(() => {
                        window.location.href = 'profile.html';
                    }, 800);
                } else {
                    showToast("Incorrect password. Please try again.", "error");
                }
            } else {
                // Demo fallback login if user hasn't explicitly registered
                const demoUser = {
                    name: email.split('@')[0].toUpperCase(),
                    email: email,
                    mobile: "9876543210",
                    password: password,
                    registeredAt: new Date().toLocaleDateString('en-IN')
                };
                storedUsers.push(demoUser);
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(storedUsers));
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(demoUser));
                
                showToast(`Logged in successfully as ${demoUser.name}!`);
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 800);
            }
        });
    }

    // 2. Handle Registration Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const mobile = document.getElementById('reg-mobile').value.trim();
            const password = document.getElementById('reg-password').value.trim();
            const confirmPassword = document.getElementById('reg-confirm-password').value.trim();

            if (password !== confirmPassword) {
                showToast("Passwords do not match!", "error");
                return;
            }

            let storedUsers = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '[]');

            // Check existing email
            if (storedUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
                showToast("An account with this email already exists!", "error");
                return;
            }

            const newUser = {
                name: name,
                email: email,
                mobile: mobile,
                password: password,
                registeredAt: new Date().toLocaleDateString('en-IN')
            };

            storedUsers.push(newUser);
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(storedUsers));
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

            showToast("Registration successful! Welcome to MYMART.");
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 800);
        });
    }

    // 3. Handle Profile Page Display
    const profileContainer = document.getElementById('profile-page-container');
    if (profileContainer) {
        const currentUser = getCurrentUser();

        if (!currentUser) {
            profileContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">👤</div>
                    <h3 class="empty-state-title">You are not logged in</h3>
                    <p class="empty-state-text">Please login to view your profile and managing your orders.</p>
                    <div style="display:flex; gap:10px; justify-content:center;">
                        <a href="login.html" class="btn btn-primary">Login Now</a>
                        <a href="register.html" class="btn btn-outline">Create Account</a>
                    </div>
                </div>
            `;
            return;
        }

        profileContainer.innerHTML = `
            <div class="profile-card">
                <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:15px;">
                    <div>
                        <h2 style="font-size:1.6rem; color:var(--primary-color);">Hello, ${currentUser.name}!</h2>
                        <p style="color:var(--text-muted); font-size:0.9rem;">Welcome to your MYMART Account Dashboard</p>
                    </div>
                    <button id="logout-btn" class="btn btn-danger btn-sm">🔒 Logout Account</button>
                </div>

                <div class="profile-info-grid">
                    <div class="profile-item">
                        <div class="profile-label">Full Name</div>
                        <div class="profile-value">${currentUser.name}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">Email Address</div>
                        <div class="profile-value">${currentUser.email}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">Mobile Number</div>
                        <div class="profile-value">${currentUser.mobile || 'Not Provided'}</div>
                    </div>
                </div>

                <div style="margin-top:30px; display:flex; gap:15px; flex-wrap:wrap;">
                    <a href="orders.html" class="btn btn-primary">📦 View My Orders</a>
                    <a href="products.html" class="btn btn-outline">🛒 Continue Shopping</a>
                </div>
            </div>
        `;

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm("Are you sure you want to logout?")) {
                    localStorage.removeItem(CURRENT_USER_KEY);
                    showToast("Logged out successfully!");
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 500);
                }
            });
        }
    }
});
