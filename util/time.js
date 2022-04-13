export let utcTimestampToCurrentTZTime = function(timestamp) {
    const time = new Date();
    time.setTime(timestamp);
    return time;
}