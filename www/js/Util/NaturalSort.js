//https://github.com/Bill4Time/javascript-natural-sort

function naturalSort(a, b) {
    "use strict";
    var re = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
        sre = /(^[ ]*|[ ]*$)/g,
        dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        hre = /^0x[0-9a-f]+$/i,
        ore = /^0/,
        i = function(s) {
            return naturalSort.insensitive && ('' + s).toLowerCase() || '' + s;
        },
        // convert all to strings strip whitespace
        x = i(a).replace(sre, '') || '',
        y = i(b).replace(sre, '') || '',
        // chunk/tokenize
        xN = x.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
        yN = y.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
        // numeric, hex or date detection
        xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && x.match(dre) && Date.parse(x)),
        yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
        oFxNcL, oFyNcL;
    // first try and sort Hex codes or Dates
    if(yD) {
        if(xD < yD) {
            return -1;
        } else if(xD > yD) {
            return 1;
        }
    }
    // natural sorting through split numeric strings and default strings
    for(var cLoc = 0, numS = Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
        // find floats not starting with '0', string or 0 if not defined (Clint Priest)
        oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
        oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
        // handle numeric vs string comparison - number < string - (Kyle Adams)
        if(isNaN(oFxNcL) !== isNaN(oFyNcL)) {
            return(isNaN(oFxNcL)) ? 1 : -1;
        }
        // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
        else if(typeof oFxNcL !== typeof oFyNcL) {
            oFxNcL += '';
            oFyNcL += '';
        }
        if(oFxNcL < oFyNcL) {
            return -1;
        }
        if(oFxNcL > oFyNcL) {
            return 1;
        }
    }
    return 0;
}

function sortByDate(a, b) {
    "use strict";
    if(a.StartTime && a.EndTime) {
        var atime = a.Time?  a.Time.split('-'): ['00:00','23:59'];
        a.StartTime = moment(a.Day + ' ' + atime[0].trim(), 'YYYY-MM-DD HH:mm');
        a.EndTime = moment(a.Day + ' ' + atime[1].trim(), 'YYYY-MM-DD HH:mm');
    }
    
    if(b.StartTime && b.EndTime) {
        var btime = b.Time? b.Time.split('-'): ['00:00','23:59'];
        b.StartTime = moment(b.Day + ' ' + btime[0].trim(), 'YYYY-MM-DD HH:mm');
        b.EndTime = moment(b.Day + ' ' + btime[1].trim(), 'YYYY-MM-DD HH:mm');
    }
    
    if(a.StartTime.isAfter(b.StartTime)) {
        return 1;
    } else if(a.StartTime.isBefore(b.StartTime)) {
        return -1;
    } else {
        if(a.EndTime.isAfter(b.EndTime)) {
            return 1;
        }
        if(a.EndTime.isBefore(b.EndTime)) {
            return -1;
        }
        return 0;
    }
}