export default function getUTCString(dateObj) {
    const y = dateObj.getUTCFullYear();
    let m = dateObj.getUTCMonth()+1;
    let d = dateObj.getUTCDate();
    let h = dateObj.getUTCHours();
    let min = dateObj.getUTCMinutes();
    if(m < 10) {
       m = '0'+m;
    }
    if(d < 10) {
       d = '0'+d;
    }
    if(h < 10) {
       h = '0'+h;
    }
    if(min < 10) {
       min = '0'+min;
    }

    return `${y}-${m}-${d}T${h}:${min}:00.000Z`;
}