export default defineNuxtRouteMiddleware(() => {
    const user = '';
    // TODO: auth logic here
    if (!user) {
        return navigateTo('/login');
    }
});