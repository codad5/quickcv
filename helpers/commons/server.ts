import { headers } from "next/headers"

export function getIp() {
    let forwardFor = headers().get('x-forwarded-for')
    let ip = headers().get('x-real-ip')

    if (forwardFor) {
        return forwardFor.split(',')[0].trim()
    }
    if (ip) {
        return ip.trim()
    }
    return null
}