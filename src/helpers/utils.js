export function formatDate(dateStr="") {
    return dateStr.slice(0, 10)
}

export function stringTrimmer(string, length) {
    return `${string.slice(0, length)}...`
}