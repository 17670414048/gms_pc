// const userInfo = () => {
//     return JSON.parse(sessionStorage.getItem('user_params') || '{}')
// }
// const registrationInfo = () => {
//     return JSON.parse(localStorage.getItem('registrationInfo') || '{}')
// }
const unixToDate=(unixTime, isFull ,type)=>{
	isFull = isFull || false;
	type = type || '-'
			var time = new Date(unixTime * 1000);
			var ymdhis = "";
			ymdhis += time.getFullYear() + type;
			var month = time.getMonth() + 1;
			if (month <= 9) {
				month = '0' + month;
			}
			ymdhis += month + type;
			var day = time.getDate();
			if (day <= 9) {
				day = '0' + day;
			}
			ymdhis += day;
			if (isFull === true) {
				var h = time.getHours();
				if (h <= 9) {
					h = '0' + h;
				}
				var m = time.getMinutes();
				if (m <= 9) {
					m = '0' + m;
				}
				var s = time.getSeconds();
				if (s <= 9) {
					s = '0' + s;
				}
				ymdhis += " " + h + ":";
				ymdhis += m + ":";
				ymdhis += s;
			}
			return ymdhis;
}
const dateToUnix = (String) => {
    var f = string.split(' ', 2);
    var d = (f[0] ? f[0] : '').split('-', 3);
    var t = (f[1] ? f[1] : '').split(':', 3);
    return (new Date(
        parseInt(d[0], 10) || null,
        (parseInt(d[1], 10) || 1) - 1,
        parseInt(d[2], 10) || null,
        parseInt(t[0], 10) || null,
        parseInt(t[1], 10) || null,
        parseInt(t[2], 10) || null
    )).getTime() / 1000;
}
export {
    // userInfo,
    unixToDate,
    dateToUnix
    // registrationInfo
}