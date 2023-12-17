export default defineNuxtRouteMiddleware(() => {
    const user = 'user';
    // TODO: auth logic here
    if (!user) {
        return navigateTo('/login');
    }
});