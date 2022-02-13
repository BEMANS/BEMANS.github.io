// // const datetimeDifference = require("datetime-difference");
// import {datetimeDifference} from "./date-diff"
//  /* result is {
//     "years": 0,
//     "months": 2,
//     "days": 3,
//     "hours": 13,
//     "minutes": 48,
//     "seconds": 47,
//     "milliseconds": 0
// } */

"use strict";

function datetimeDifference (from, to) {

    const min = [-Infinity, 1, 1, 0, 0, 0, 0];
    const max = [Infinity, 12, null, 24, 60, 60, 1000];

    if (to < from) {
        const temp = to;
        to = from;
        from = temp;
    }

    let start = [from.getUTCFullYear(), from.getUTCMonth() + 1, from.getUTCDate(), from.getUTCHours(),
            from.getUTCMinutes(), from.getUTCSeconds(), from.getUTCMilliseconds()],
        end = [to.getUTCFullYear(), to.getUTCMonth() + 1, to.getUTCDate(), to.getUTCHours(), to.getUTCMinutes(),
            to.getUTCSeconds(), to.getUTCMilliseconds()],
        i = 7;

    const dec = (i) => {
        --end[i];
        while (end[i] < min[i]) {
            const r = dec(i - 1);
            end[i] += max[i] === null
                ? r
                : max[i];
        }
        return i === 1 ? new Date(Date.UTC(end[0], end[1], 0)).getUTCDate() : max[i + 1];
    };

    while (i > 0) {
        --i;
        let diff = end[i] - start[i];
        while (diff < 0) {
            end[i] += dec(i - 1);
            diff = end[i] - start[i];
        }
        end[i] = diff;
    }

    return {
        years: end[0],
        months: end[1],
        days: end[2],
        hours: end[3],
        minutes: end[4],
        seconds: end[5],
        milliseconds: end[6]
    };

};


const setDate = ()=> {
    const date1 = new Date("05/17/2021, 09:15:00 PM");
    const date2 = new Date();
    const result = datetimeDifference(date1, date2);
    document.getElementById("Year").innerHTML = result.years
    document.getElementById("Month").innerHTML = result.months
    document.getElementById("Day").innerHTML = result.days
    document.getElementById("Hour").innerHTML = result.hours
    document.getElementById("Minute").innerHTML = result.minutes
    document.getElementById("Second").innerHTML = result.seconds
}
setDate()
setInterval(()=>{
    setDate()
    
    
},1000)