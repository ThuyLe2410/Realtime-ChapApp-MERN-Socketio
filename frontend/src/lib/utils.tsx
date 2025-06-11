export function formatMessageTime(date:string) {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12:false
    })
}

export function formatMessageDate(date:string) {
    return new Date(date).toDateString()
}