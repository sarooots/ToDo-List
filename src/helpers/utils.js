import moment from "moment"
export function formatDate(dateStr="") {
    return dateStr.slice(0, 10)
}
export function formatDate2(date) {
    return moment(date).format("MMM DD YYYY");
}

export function stringTrimmer(string, length) {
    return `${string.slice(0, length)} ${string.length > length && "..."}`
}