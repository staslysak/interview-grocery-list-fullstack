export function decode(value: string) {
    return JSON.parse(Buffer.from(value, 'base64').toString())
}

export function encode(value: object) {
    return Buffer.from(JSON.stringify(value)).toString('base64')
}
