export const formatTime = (str) => {
    if (str) {
        if (str.indexOf(':') !== -1) {
            return this.formatIso(str);
        }
        else {
            var time = str;
            const h = parseInt(time / 3600);
            const minute = parseInt(time / 60 % 60);
            const second = Math.ceil(time % 60);
            const hours = h < 10 ? '0' + h : h;
            const formatSecond = second > 59 ? 59 : second;
            var str = `${hours > 0 ? `${hours}:` : ''}${minute < 10 ? '0' + minute : minute}:${formatSecond < 10 ? '0' + formatSecond : formatSecond}`;
            return str
        }
    }
}