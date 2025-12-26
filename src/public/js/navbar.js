class Navbar {
    constructor() {
        this.element = null;
        this.user = null;
    }

    setUser(userData) {
        this.user = userData;
    }

    getInitials(name) {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    render() {
        const nav = document.createElement('nav');
        nav.className = 'flex w-full glass-effect justify-between items-center px-6 py-4 sticky top-0 z-50';

        const authSection = this.user
            ? `<div class="flex items-center gap-3">
                <span class="text-white font-medium">${this.user.name}</span>
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-80">
                    ${this.getInitials(this.user.name)}
                </div>
                <button onclick="handleLogout()" class="rounded-xl glass-effect border border-red-400/30 px-4 py-2 cursor-pointer hover:bg-red-500/20 font-medium text-red-400 hover:text-red-300">
                    Logout
                </button>
               </div>`
            : `<a href="/auth/login"
                class="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-2 cursor-pointer neon-glow font-medium">
                Login
              </a>
              <a href="/auth/register"
                class="rounded-xl glass-effect border border-blue-400/30 px-5 py-2 cursor-pointer hover:bg-white/10 font-medium text-white">
                Register
              </a>`;

        nav.innerHTML = `
            <section>
            <a href="/" class="no-underline">
                <h1 class="font-bold text-3xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Feedbacks App
                </h1>
            </a>
            </section>
            <section class="flex gap-4 items-center">
                ${authSection}
            </section>
        `;

        this.element = nav;
        return nav;
    }
}

function initNavbar(targetSelector = 'body', userData = null) {
    const navbar = new Navbar();
    if (userData) {
        navbar.setUser(userData);
    }
    const target = document.querySelector(targetSelector);

    if (target) {
        target.insertBefore(navbar.render(), target.firstChild);
    }
}

async function checkLoginStatus() {
    try {
        const response = await fetch('/api/v1/user/me', {
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

async function handleLogout() {
    try {
        const response = await fetch('/api/v1/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        
        if (response.ok) {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        const user = await checkLoginStatus();
        initNavbar('body', user);
    });
} else {
    checkLoginStatus().then(user => {
        initNavbar('body', user);
    });
}