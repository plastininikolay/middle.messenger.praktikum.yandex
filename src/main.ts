const PAGE_NAMES = [
    '404',
    '500',
    'auth',
    'chats',
    'profile',
    'profile-edit',
    'registration'
]

addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === '/') {
        window.location.replace("/src/pages/registration.html");
    } else if (PAGE_NAMES.some((page) => page !== window.location.pathname) ) {
        window.location.replace("/src/pages/404.html");
    }
})
