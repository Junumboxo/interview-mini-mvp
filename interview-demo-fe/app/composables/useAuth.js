export const useAuth = () => {
    const token = useCookie('auth_token', {
        default: () => null,
        httpOnly: false,
        sameSite: 'strict'
    })

    const getAuthHeaders = () => {
        if (!token.value) return {}
        return {
            'Authorization': `Bearer ${token.value}`
        }
    }

    const logout = () => {
        token.value = null
        navigateTo('/login')
    }

    const isAuthenticated = computed(() => {
        if (!token.value) return false

        try {
            // Check if token is expired (basic check)
            const payload = JSON.parse(atob(token.value.split('.')[1]))
            return payload.exp * 1000 > Date.now()
        } catch {
            return false
        }
    })

    return {
        token: readonly(token),
        getAuthHeaders,
        logout,
        isAuthenticated
    }
}