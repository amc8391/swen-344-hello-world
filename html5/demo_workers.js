function timedCount() {
    postMessage(new Date().toLocaleString());
    setTimeout("timedCount()",500);
}

timedCount();
