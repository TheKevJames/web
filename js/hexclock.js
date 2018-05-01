function hexclock(bgId, timeId) {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (hours <= 9) {
        hours = '0' + hours;
    }
    if (minutes <= 9) {
        minutes = '0' + minutes;
    }
    if (seconds <= 9) {
        seconds = '0' + seconds;
    }

    var color = '#' + hours + minutes + seconds;

    document.getElementById(bgId).style.background = color;
    document.getElementById(timeId).innerHTML = color;

    setTimeout(
        function() { hexclock(bgId, timeId); },
        1000
    );
}
