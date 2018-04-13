function timedCount() {
    postMessage(new Date().date.toLocaleString());
    setTimeout("timedCount()",500);
}

timedCount();
