// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('auth_token')

    console.log('Middleware running:', {
        path: to.path,
        tokenExists: !!token.value,
        tokenValue: token.value
    })

    const isAuthenticated = token.value && token.value.trim() !== ''

    if (!isAuthenticated && to.path !== '/login') {
        console.log('Redirecting to login')
        return navigateTo('/login')
    }

    if (isAuthenticated && to.path === '/login') {
        console.log('Redirecting to home')
        return navigateTo('/')
    }
})