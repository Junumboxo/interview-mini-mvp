export default defineNuxtPlugin(() => {
    const { startCacheCleanup } = useTranslation();
    startCacheCleanup();

    console.log('Translation plugin initialized');
});