export default defineEventHandler((event) => {
    const {test} = event.context.params // get params
    const {id} = getQuery(event)
    // return test
    return id
})