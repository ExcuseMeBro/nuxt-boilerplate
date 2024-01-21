export default defineEventHandler((event) => {
    const {test} = event.context.params
    return test
})