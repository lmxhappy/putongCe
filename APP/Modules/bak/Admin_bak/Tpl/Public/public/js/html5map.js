if (!Html5Map)
    var Html5Map = {};
Html5Map.inheriting = {};
Html5Map.Class = function(a) {
    var b = function() {
        arguments[0] !== Html5Map.inheriting && (this.events = {}, this.construct.apply(this, arguments))
    };
    a.inherits ? (b.prototype = new a.inherits(Html5Map.inheriting), b.base = a.inherits.prototype, delete a.inherits) : (b.prototype.createEvents = function() {
        for (var a = 0, b = arguments.length; a < b; a++)
            this.events[arguments[a]] = []
    }, b.prototype.listenTo = function(a, b, d) {
        a.events[b].push({handler: d,scope: this})
    }, b.prototype.addListener = function(a, b, d) {
        this.events[a].push({handler: b,scope: d})
    }, 
    b.prototype.removeListener = function(a, b, d) {
        a = a.events[b];
        for (b = a.length - 1; 0 <= b; b--)
            a[b].handler === d && a.splice(b, 1)
    }, b.prototype.fire = function(a, b) {
        for (var d = this.events[a], h = 0, i = d.length; h < i; h++) {
            var j = d[h];
            j.handler.call(j.scope, b)
        }
    });
    for (var d in a)
        b.prototype[d] = a[d];
    return b
};
Html5Map.charts = [];
Html5Map.addChart = function(a) {
    Html5Map.charts.push(a)
};
Html5Map.removeChart = function(a) {
    for (var b = Html5Map.charts, d = b.length - 1; 0 <= d; d--)
        b[d] == a && b.splice(d, 1)
};
Html5Map.IEversion = 0;
-1 != navigator.appVersion.indexOf("MSIE") && document.documentMode && (Html5Map.IEversion = Number(document.documentMode));
if (document.addEventListener || window.opera)
    Html5Map.isNN = !0, Html5Map.isIE = !1, Html5Map.dx = 0.5, Html5Map.dy = 0.5;
document.attachEvent && (Html5Map.isNN = !1, Html5Map.isIE = !0, 9 > Html5Map.IEversion && (Html5Map.dx = 0, Html5Map.dy = 0));
window.chrome && (Html5Map.chrome = !0);
Html5Map.handleResize = function() {
    for (var a = Html5Map.charts, b = 0; b < a.length; b++) {
        var d = a[b];
        d && d.div && d.handleResize()
    }
};
Html5Map.handleMouseUp = function(a) {
    for (var b = Html5Map.charts, d = 0; d < b.length; d++) {
        var e = b[d];
        e && e.handleReleaseOutside(a)
    }
};
Html5Map.handleMouseMove = function(a) {
    for (var b = Html5Map.charts, d = 0; d < b.length; d++) {
        var e = b[d];
        e && e.handleMouseMove(a)
    }
};
Html5Map.resetMouseOver = function() {
    for (var a = Html5Map.charts, b = 0; b < a.length; b++) {
        var d = a[b];
        d && (d.mouseIsOver = !1)
    }
};
Html5Map.onReadyArray = [];
Html5Map.ready = function(a) {
    Html5Map.onReadyArray.push(a)
};
Html5Map.handleLoad = function() {
    for (var a = Html5Map.onReadyArray, b = 0; b < a.length; b++)
        (0, a[b])()
};
Html5Map.useUTC = !1;
Html5Map.updateRate = 40;
Html5Map.uid = 0;
Html5Map.getUniqueId = function() {
    Html5Map.uid++;
    return "Html5MapEl-" + Html5Map.uid
};
Html5Map.isNN && (document.addEventListener("mousemove", Html5Map.handleMouseMove, !0), window.addEventListener("resize", Html5Map.handleResize, !0), document.addEventListener("mouseup", Html5Map.handleMouseUp, !0), window.addEventListener("load", Html5Map.handleLoad, !0));
Html5Map.isIE && (document.attachEvent("onmousemove", Html5Map.handleMouseMove), window.attachEvent("onresize", Html5Map.handleResize), document.attachEvent("onmouseup", Html5Map.handleMouseUp), window.attachEvent("onload", Html5Map.handleLoad));
Html5Map.toBoolean = function(a, b) {
    if (void 0 == a)
        return b;
    switch (String(a).toLowerCase()) {
        case "true":
        case "yes":
        case "1":
            return !0;
        case "false":
        case "no":
        case "0":
        case null:
            return !1;
        default:
            return Boolean(a)
    }
};
Html5Map.removeFromArray = function(a, b) {
    for (var d = a.length - 1; 0 <= d; d--)
        a[d] == b && a.splice(d, 1)
};
Html5Map.getStyle = function(a, b) {
    var d = "";
    document.defaultView && document.defaultView.getComputedStyle ? d = document.defaultView.getComputedStyle(a, "").getPropertyValue(b) : a.currentStyle && (b = b.replace(/\-(\w)/g, function(a, b) {
        return b.toUpperCase()
    }), d = a.currentStyle[b]);
    return d
};
Html5Map.removePx = function(a) {
    return Number(a.substring(0, a.length - 2))
};
Html5Map.getURL = function(a, b) {
    if (a)
        if ("_self" == b || !b)
            window.location.href = a;
        else if ("_top" == b && window.top)
            window.top.location.href = a;
        else if ("_parent" == b && window.parent)
            window.parent.location.href = a;
        else {
            var d = document.getElementsByName(b)[0];
            d ? d.src = a : window.open(a)
        }
};
Html5Map.formatMilliseconds = function(a, b) {
    if (-1 != a.indexOf("fff")) {
        var d = b.getMilliseconds(), e = String(d);
        10 > d && (e = "00" + d);
        10 <= d && 100 > d && (e = "0" + d);
        a = a.replace(/fff/g, e)
    }
    return a
};
Html5Map.ifArray = function(a) {
    return a && 0 < a.length ? !0 : !1
};
Html5Map.callMethod = function(a, b) {
    for (var d = 0; d < b.length; d++) {
        var e = b[d];
        if (e) {
            if (e[a])
                e[a]();
            var f = e.length;
            if (0 < f)
                for (var g = 0; g < f; g++) {
                    var h = e[g];
                    if (h && h[a])
                        h[a]()
                }
        }
    }
};
Html5Map.toNumber = function(a) {
    return "number" == typeof a ? a : Number(String(a).replace(/[^0-9\-.]+/g, ""))
};
Html5Map.toColor = function(a) {
    if ("" != a && void 0 != a)
        if (-1 != a.indexOf(","))
            for (var a = a.split(","), b = 0; b < a.length; b++) {
                var d = a[b].substring(a[b].length - 6, a[b].length);
                a[b] = "#" + d
            }
        else
            a = a.substring(a.length - 6, a.length), a = "#" + a;
    return a
};
Html5Map.toCoordinate = function(a, b, d) {
    var e;
    void 0 != a && (a = String(a), d && d < b && (b = d), e = Number(a), -1 != a.indexOf("!") && (e = b - Number(a.substr(1))), -1 != a.indexOf("%") && (e = b * Number(a.substr(0, a.length - 1)) / 100));
    return e
};
Html5Map.fitToBounds = function(a, b, d) {
    a < b && (a = b);
    a > d && (a = d);
    return a
};
Html5Map.isDefined = function(a) {
    return void 0 == a ? !1 : !0
};
Html5Map.stripNumbers = function(a) {
    return a.replace(/[0-9]+/g, "")
};
Html5Map.extractPeriod = function(a) {
    var b = Html5Map.stripNumbers(a), d = 1;
    b != a && (d = Number(a.slice(0, a.indexOf(b))));
    return {period: b,count: d}
};
Html5Map.resetDateToMin = function(a, b, d, e) {
    void 0 == e && (e = 1);
    var f = a.getFullYear(), g = a.getMonth(), h = a.getDate(), i = a.getHours(), j = a.getMinutes(), l = a.getSeconds(), k = a.getMilliseconds(), a = a.getDay();
    switch (b) {
        case "YYYY":
            f = Math.floor(f / d) * d;
            g = 0;
            h = 1;
            k = l = j = i = 0;
            break;
        case "MM":
            g = Math.floor(g / d) * d;
            h = 1;
            k = l = j = i = 0;
            break;
        case "WW":
            0 == a && 0 < e && (a = 7);
            h = h - a + e;
            k = l = j = i = 0;
            break;
        case "DD":
            h = Math.floor(h / d) * d;
            k = l = j = i = 0;
            break;
        case "hh":
            i = Math.floor(i / d) * d;
            k = l = j = 0;
            break;
        case "mm":
            j = Math.floor(j / d) * d;
            k = l = 0;
            break;
        case "ss":
            l = 
            Math.floor(l / d) * d;
            k = 0;
            break;
        case "fff":
            k = Math.floor(k / d) * d
    }
    return a = new Date(f, g, h, i, j, l, k)
};
Html5Map.getPeriodDuration = function(a, b) {
    void 0 == b && (b = 1);
    var d;
    switch (a) {
        case "YYYY":
            d = 316224E5;
            break;
        case "MM":
            d = 26784E5;
            break;
        case "WW":
            d = 6048E5;
            break;
        case "DD":
            d = 864E5;
            break;
        case "hh":
            d = 36E5;
            break;
        case "mm":
            d = 6E4;
            break;
        case "ss":
            d = 1E3;
            break;
        case "fff":
            d = 1
    }
    return d * b
};
Html5Map.roundTo = function(a, b) {
    if (0 > b)
        return a;
    var d = Math.pow(10, b);
    return Math.round(a * d) / d
};
Html5Map.toFixed = function(a, b) {
    var d = String(Math.round(a * Math.pow(10, b)));
    if (0 < b) {
        var e = d.length;
        if (e < b)
            for (var f = 0; f < b - e; f++)
                d = "0" + d;
        e = d.substring(0, d.length - b);
        "" == e && (e = 0);
        return e + "." + d.substring(d.length - b, d.length)
    }
    return String(d)
};
Html5Map.intervals = {s: {nextInterval: "ss",contains: 1E3},ss: {nextInterval: "mm",contains: 60,count: 0},mm: {nextInterval: "hh",contains: 60,count: 1},hh: {nextInterval: "DD",contains: 24,count: 2},DD: {nextInterval: "",contains: Infinity,count: 3}};
Html5Map.getMaxInterval = function(a, b) {
    var d = Html5Map.intervals;
    return a >= d[b].contains ? (a = Math.round(a / d[b].contains), b = d[b].nextInterval, Html5Map.getMaxInterval(a, b)) : "ss" == b ? d[b].nextInterval : b
};
Html5Map.formatDuration = function(a, b, d, e, f, g) {
    var h = Html5Map.intervals, i = g.decimalSeparator;
    if (a >= h[b].contains) {
        var j = a - Math.floor(a / h[b].contains) * h[b].contains;
        "ss" == b && (j = Html5Map.formatNumber(j, g), 1 == j.split(i)[0].length && (j = "0" + j));
        if (("mm" == b || "hh" == b) && 10 > j)
            j = "0" + j;
        d = j + "" + e[b] + "" + d;
        a = Math.floor(a / h[b].contains);
        b = h[b].nextInterval;
        return Html5Map.formatDuration(a, b, d, e, f, g)
    }
    "ss" == b && (a = Html5Map.formatNumber(a, g), 1 == a.split(i)[0].length && (a = "0" + a));
    if (("mm" == b || "hh" == b) && 10 > a)
        a = "0" + a;
    d = a + "" + 
    e[b] + "" + d;
    if (h[f].count > h[b].count)
        for (a = h[b].count; a < h[f].count; a++)
            b = h[b].nextInterval, "ss" == b || "mm" == b || "hh" == b ? d = "00" + e[b] + "" + d : "DD" == b && (d = "0" + e[b] + "" + d);
    ":" == d.charAt(d.length - 1) && (d = d.substring(0, d.length - 1));
    return d
};
Html5Map.formatNumber = function(a, b, d, e, f) {
    a = Html5Map.roundTo(a, b.precision);
    isNaN(d) && (d = b.precision);
    var g = b.decimalSeparator, b = b.thousandsSeparator, h = 0 > a ? "-" : "", a = Math.abs(a), i = String(a), j = !1;
    -1 != i.indexOf("e") && (j = !0);
    0 <= d && (0 != a && !j) && (i = Html5Map.toFixed(a, d));
    if (j)
        j = i;
    else {
        for (var i = i.split("."), j = "", l = String(i[0]), k = l.length; 0 <= k; k -= 3)
            j = k != l.length ? 0 != k ? l.substring(k - 3, k) + b + j : l.substring(k - 3, k) + j : l.substring(k - 3, k);
        void 0 != i[1] && (j = j + g + i[1]);
        void 0 != d && (0 < d && "0" != j) && (j = Html5Map.addZeroes(j, 
        g, d))
    }
    j = h + j;
    "" == h && (!0 == e && 0 != a) && (j = "+" + j);
    !0 == f && (j += "%");
    return j
};
Html5Map.addZeroes = function(a, b, d) {
    a = a.split(b);
    void 0 == a[1] && 0 < d && (a[1] = "0");
    return a[1].length < d ? (a[1] += "0", Html5Map.addZeroes(a[0] + b + a[1], b, d)) : void 0 != a[1] ? a[0] + b + a[1] : a[0]
};
Html5Map.scientificToNormal = function(a) {
    var b, a = String(a).split("e");
    if ("-" == a[1].substr(0, 1)) {
        b = "0.";
        for (var d = 0; d < Math.abs(Number(a[1])) - 1; d++)
            b += "0";
        b += a[0].split(".").join("")
    } else {
        var e = 0;
        b = a[0].split(".");
        b[1] && (e = b[1].length);
        b = a[0].split(".").join("");
        for (d = 0; d < Math.abs(Number(a[1])) - e; d++)
            b += "0"
    }
    return b
};
Html5Map.toScientific = function(a, b) {
    if (0 == a)
        return "0";
    var d = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E);
    Math.pow(10, d);
    mantissa = String(mantissa).split(".").join(b);
    return String(mantissa) + "e" + d
};
Html5Map.randomColor = function() {
    return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6)
};
Html5Map.hitTest = function(a, b, d) {
    var e = !1, f = a.x, g = a.x + a.width, h = a.y, i = a.y + a.height, j = Html5Map.isInRectangle;
    e || (e = j(f, h, b));
    e || (e = j(f, i, b));
    e || (e = j(g, h, b));
    e || (e = j(g, i, b));
    !e && !0 != d && (e = Html5Map.hitTest(b, a, !0));
    return e
};
Html5Map.isInRectangle = function(a, b, d) {
    return a >= d.x - 5 && a <= d.x + d.width + 5 && b >= d.y - 5 && b <= d.y + d.height + 5 ? !0 : !1
};
Html5Map.isPercents = function(a) {
    if (-1 != String(a).indexOf("%"))
        return !0
};
Html5Map.dayNames = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
Html5Map.shortDayNames = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
Html5Map.monthNames = "January February March April May June July August September October November December".split(" ");
Html5Map.shortMonthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
Html5Map.formatDate = function(a, b) {
    var d, e, f, g, h, i, j, l;
    Html5Map.useUTC ? (d = a.getUTCFullYear(), e = a.getUTCMonth(), f = a.getUTCDate(), g = a.getUTCDay(), h = a.getUTCHours(), i = a.getUTCMinutes(), j = a.getUTCSeconds(), l = a.getUTCMilliseconds()) : (d = a.getFullYear(), e = a.getMonth(), f = a.getDate(), g = a.getDay(), h = a.getHours(), i = a.getMinutes(), j = a.getSeconds(), l = a.getMilliseconds());
    var k = String(d).substr(2, 2), m = e + 1;
    9 > e && (m = "0" + m);
    var t = f;
    10 > f && (t = "0" + f);
    var v = "0" + g, q = h;
    24 == q && (q = 0);
    var p = q;
    10 > p && (p = "0" + p);
    b = b.replace(/JJ/g, 
    p);
    b = b.replace(/J/g, q);
    q = h;
    0 == q && (q = 24);
    p = q;
    10 > p && (p = "0" + p);
    b = b.replace(/HH/g, p);
    b = b.replace(/H/g, q);
    q = h;
    11 < q && (q -= 12);
    p = q;
    10 > p && (p = "0" + p);
    b = b.replace(/KK/g, p);
    b = b.replace(/K/g, q);
    q = h;
    0 == q && (q = 12);
    12 < q && (q -= 12);
    p = q;
    10 > p && (p = "0" + p);
    b = b.replace(/LL/g, p);
    b = b.replace(/L/g, q);
    q = i;
    10 > q && (q = "0" + q);
    b = b.replace(/NN/g, q);
    b = b.replace(/N/g, i);
    i = j;
    10 > i && (i = "0" + i);
    b = b.replace(/SS/g, i);
    b = b.replace(/S/g, j);
    j = l;
    10 > j && (j = "00" + j);
    100 > j && (j = "0" + j);
    i = l;
    10 > i && (i = "00" + i);
    b = b.replace(/QQQ/g, j);
    b = b.replace(/QQ/g, i);
    b = b.replace(/Q/g, 
    l);
    b = 12 > h ? b.replace(/A/g, "am") : b.replace(/A/g, "pm");
    b = b.replace(/YYYY/g, "@IIII@");
    b = b.replace(/YY/g, "@II@");
    b = b.replace(/MMMM/g, "@XXXX@");
    b = b.replace(/MMM/g, "@XXX@");
    b = b.replace(/MM/g, "@XX@");
    b = b.replace(/M/g, "@X@");
    b = b.replace(/DD/g, "@RR@");
    b = b.replace(/D/g, "@R@");
    b = b.replace(/EEEE/g, "@PPPP@");
    b = b.replace(/EEE/g, "@PPP@");
    b = b.replace(/EE/g, "@PP@");
    b = b.replace(/E/g, "@P@");
    b = b.replace(/@IIII@/g, d);
    b = b.replace(/@II@/g, k);
    b = b.replace(/@XXXX@/g, Html5Map.monthNames[e]);
    b = b.replace(/@XXX@/g, Html5Map.shortMonthNames[e]);
    b = b.replace(/@XX@/g, m);
    b = b.replace(/@X@/g, e + 1);
    b = b.replace(/@RR@/g, t);
    b = b.replace(/@R@/g, f);
    b = b.replace(/@PPPP@/g, Html5Map.dayNames[g]);
    b = b.replace(/@PPP@/g, Html5Map.shortDayNames[g]);
    b = b.replace(/@PP@/g, v);
    return b = b.replace(/@P@/g, g)
};
Html5Map.findPosX = function(a) {
    var b = a.offsetLeft;
    if (a.offsetParent)
        for (; a = a.offsetParent; )
            b += a.offsetLeft, a != document.body && a != document.documentElement && (b -= a.scrollLeft);
    return b
};
Html5Map.findPosY = function(a) {
    var b = a.offsetTop;
    if (a.offsetParent)
        for (; a = a.offsetParent; )
            b += a.offsetTop, a != document.body && a != document.documentElement && (b -= a.scrollTop);
    return b
};
Html5Map.findIfFixed = function(a) {
    if (a.offsetParent)
        for (; a = a.offsetParent; )
            if ("fixed" == Html5Map.getStyle(a, "position"))
                return !0;
    return !1
};
Html5Map.findIfAuto = function(a) {
    return a.style && "auto" == Html5Map.getStyle(a, "overflow") ? !0 : a.parentNode ? Html5Map.findIfAuto(a.parentNode) : !1
};
Html5Map.findScrollLeft = function(a, b) {
    a.scrollLeft && (b += a.scrollLeft);
    return a.parentNode ? Html5Map.findScrollLeft(a.parentNode, b) : b
};
Html5Map.findScrollTop = function(a, b) {
    a.scrollTop && (b += a.scrollTop);
    return a.parentNode ? Html5Map.findScrollTop(a.parentNode, b) : b
};
Html5Map.formatValue = function(a, b, d, e, f, g, h, i) {
    if (b) {
        void 0 == f && (f = "");
        for (var j = 0; j < d.length; j++) {
            var l = d[j], k = b[l];
            void 0 != k && (k = g ? Html5Map.addPrefix(k, i, h, e) : Html5Map.formatNumber(k, e), a = a.replace(RegExp("\\[\\[" + f + "" + l + "\\]\\]", "g"), k))
        }
    }
    return a
};
Html5Map.formatDataContextValue = function(a, b) {
    if (a)
        for (var d = a.match(/\[\[.*?\]\]/g), e = 0; e < d.length; e++) {
            var f = d[e], f = f.substr(2, f.length - 4);
            void 0 != b[f] && (a = a.replace(RegExp("\\[\\[" + f + "\\]\\]", "g"), b[f]))
        }
    return a
};
Html5Map.massReplace = function(a, b) {
    for (var d in b) {
        var e = b[d];
        void 0 == e && (e = "");
        a = a.replace(d, e)
    }
    return a
};
Html5Map.cleanFromEmpty = function(a) {
    return a.replace(/\[\[[^\]]*\]\]/g, "")
};
Html5Map.addPrefix = function(a, b, d, e) {
    var f = Html5Map.formatNumber(a, e), g = "", h;
    if (0 == a)
        return "0";
    0 > a && (g = "-");
    a = Math.abs(a);
    if (1 < a)
        for (h = b.length - 1; -1 < h; h--) {
            if (a >= b[h].number) {
                a /= b[h].number;
                e = Number(e.precision);
                1 > e && (e = 1);
                a = Html5Map.roundTo(a, e);
                f = g + "" + a + "" + b[h].prefix;
                break
            }
        }
    else
        for (h = 0; h < d.length; h++)
            if (a <= d[h].number) {
                a /= d[h].number;
                e = Math.abs(Math.round(Math.log(a) * Math.LOG10E));
                a = Html5Map.roundTo(a, e);
                f = g + "" + a + "" + d[h].prefix;
                break
            }
    return f
};
Html5Map.remove = function(a) {
    a && a.remove()
};
Html5Map.copyProperties = function(a, b) {
    for (var d in a)
        "events" != d && (void 0 != a[d] && "function" != typeof a[d]) && (b[d] = a[d])
};
Html5Map.recommended = function() {
    var a = "js";
    document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") || swfobject && swfobject.hasFlashPlayerVersion("8") && (a = "flash");
    return a
};
Html5Map.getEffect = function(a) {
    ">" == a && (a = "easeOutSine");
    "<" == a && (a = "easeInSine");
    "elastic" == a && (a = "easeOutElastic");
    return a
};
Html5Map.extend = function(a, b) {
    for (var d in b)
        void 0 == a[d] && (a[d] = b[d])
};
Html5Map.fixNewLines = function(a) {
    9 > Html5Map.IEversion && 0 < Html5Map.IEversion && (a = Html5Map.massReplace(a, {"\n": "\r"}));
    return a
};
Html5Map.AmDraw = Html5Map.Class({construct: function(a, b, d) {
        Html5Map.SVG_NS = "http://www.w3.org/2000/svg";
        Html5Map.SVG_XLINK = "http://www.w3.org/1999/xlink";
        Html5Map.hasSVG = !!document.createElementNS && !!document.createElementNS(Html5Map.SVG_NS, "svg").createSVGRect;
        1 > b && (b = 10);
        1 > d && (d = 10);
        this.div = a;
        this.width = b;
        this.height = d;
        this.rBin = document.createElement("div");
        if (Html5Map.hasSVG) {
            Html5Map.SVG = !0;
            var e = this.createSvgElement("svg");
            e.style.position = "absolute";
            e.style.width = b + "px";
            e.style.height = d + "px";
            e.setAttribute("version", "1.1");
            a.appendChild(e);
            this.container = e;
            this.R = new Html5Map.SVGRenderer(this)
        } else
            Html5Map.isIE && Html5Map.VMLRenderer && (Html5Map.VML = !0, Html5Map.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), b = document.createStyleSheet(), b.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), Html5Map.vmlStyleSheet = b), this.container = a, this.R = new Html5Map.VMLRenderer(this), this.R.disableSelection(a))
    },createSvgElement: function(a) {
        return document.createElementNS(Html5Map.SVG_NS, 
        a)
    },circle: function(a, b, d, e) {
        var f = new Html5Map.AmDObject("circle", this);
        f.attr({r: d,cx: a,cy: b});
        this.addToContainer(f.node, e);
        return f
    },setSize: function(a, b) {
        0 < a && 0 < b && (this.container.style.width = a + "px", this.container.style.height = b + "px")
    },rect: function(a, b, d, e, f, g, h) {
        var i = new Html5Map.AmDObject("rect", this);
        Html5Map.VML && (f = 100 * f / Math.min(d, e), d += 2 * g, e += 2 * g, i.bw = g, i.node.style.marginLeft = -g, i.node.style.marginTop = -g);
        1 > d && (d = 1);
        1 > e && (e = 1);
        i.attr({x: a,y: b,width: d,height: e,rx: f,ry: f,"stroke-width": g});
        this.addToContainer(i.node, h);
        return i
    },image: function(a, b, d, e, f, g) {
        var h = new Html5Map.AmDObject("image", this);
        h.attr({x: b,y: d,width: e,height: f});
        this.R.path(h, a);
        this.addToContainer(h.node, g);
        return h
    },addToContainer: function(a, b) {
        b || (b = this.container);
        b.appendChild(a)
    },text: function(a, b, d) {
        return this.R.text(a, b, d)
    },path: function(a, b, d, e) {
        var f = new Html5Map.AmDObject("path", this);
        e || (e = "100,100");
        f.attr({cs: e});
        d ? f.attr({dd: a}) : f.attr({d: a});
        this.addToContainer(f.node, b);
        return f
    },set: function(a) {
        return this.R.set(a)
    },
    remove: function(a) {
        if (a) {
            var b = this.rBin;
            b.appendChild(a);
            b.innerHTML = ""
        }
    },bounce: function(a, b, d, e, f) {
        return (b /= f) < 1 / 2.75 ? e * 7.5625 * b * b + d : b < 2 / 2.75 ? e * (7.5625 * (b -= 1.5 / 2.75) * b + 0.75) + d : b < 2.5 / 2.75 ? e * (7.5625 * (b -= 2.25 / 2.75) * b + 0.9375) + d : e * (7.5625 * (b -= 2.625 / 2.75) * b + 0.984375) + d
    },easeInSine: function(a, b, d, e, f) {
        return -e * Math.cos(b / f * (Math.PI / 2)) + e + d
    },easeOutSine: function(a, b, d, e, f) {
        return e * Math.sin(b / f * (Math.PI / 2)) + d
    },easeOutElastic: function(a, b, d, e, f) {
        var a = 1.70158, g = 0, h = e;
        if (0 == b)
            return d;
        if (1 == (b /= f))
            return d + 
            e;
        g || (g = 0.3 * f);
        h < Math.abs(e) ? (h = e, a = g / 4) : a = g / (2 * Math.PI) * Math.asin(e / h);
        return h * Math.pow(2, -10 * b) * Math.sin((b * f - a) * 2 * Math.PI / g) + e + d
    },renderFix: function() {
        var a = this.container, b = a.style, d;
        try {
            d = a.getScreenCTM() || a.createSVGMatrix()
        } catch (e) {
            d = a.createSVGMatrix()
        }
        a = 1 - d.e % 1;
        d = 1 - d.f % 1;
        0.5 < a && (a -= 1);
        0.5 < d && (d -= 1);
        a && (b.left = a + "px");
        d && (b.top = d + "px")
    }});
Html5Map.AmDObject = Html5Map.Class({construct: function(a, b) {
        this.D = b;
        this.R = b.R;
        this.node = this.R.create(this, a);
        this.children = [];
        this.y = this.x = 0;
        this.scale = 1
    },attr: function(a) {
        this.R.attr(this, a);
        return this
    },getAttr: function(a) {
        return this.node.getAttribute(a)
    },setAttr: function(a, b) {
        this.R.setAttr(this, a, b);
        return this
    },clipRect: function(a, b, d, e) {
        this.R.clipRect(this, a, b, d, e)
    },translate: function(a, b, d) {
        this.R.move(this, Math.round(a), Math.round(b), d);
        this.x = a;
        this.y = b;
        this.scale = d;
        this.angle && this.rotate(this.angle)
    },
    rotate: function(a) {
        this.R.rotate(this, a);
        this.angle = a
    },animate: function(a, b, d) {
        for (var e in a) {
            var f = e, g = a[e], d = Html5Map.getEffect(d);
            this.R.animate(this, f, g, b, d)
        }
    },push: function(a) {
        if (a) {
            var b = this.node;
            b.appendChild(a.node);
            var d = a.clipPath;
            d && b.appendChild(d);
            (d = a.grad) && b.appendChild(d);
            this.children.push(a)
        }
    },text: function(a) {
        this.R.setText(this, a)
    },remove: function() {
        this.R.remove(this)
    },clear: function() {
        var a = this.node;
        if (a.hasChildNodes())
            for (; 1 <= a.childNodes.length; )
                a.removeChild(a.firstChild)
    },
    hide: function() {
        this.setAttr("visibility", "hidden")
    },show: function() {
        this.setAttr("visibility", "visible")
    },getBBox: function() {
        return this.R.getBBox(this)
    },toFront: function() {
        var a = this.node;
        if (a) {
            var b = a.parentNode;
            b && b.appendChild(a)
        }
    },toBack: function() {
        var a = this.node;
        if (a) {
            var b = a.parentNode;
            if (b) {
                var d = b.firstChild;
                d && b.insertBefore(a, d)
            }
        }
    },mouseover: function(a) {
        this.R.addListener(this, "mouseover", a);
        return this
    },mouseout: function(a) {
        this.R.addListener(this, "mouseout", a);
        return this
    },click: function(a) {
        this.R.addListener(this, 
        "click", a);
        return this
    },dblclick: function(a) {
        this.R.addListener(this, "dblclick", a);
        return this
    },mousedown: function(a) {
        this.R.addListener(this, "mousedown", a);
        return this
    },mouseup: function(a) {
        this.R.addListener(this, "mouseup", a);
        return this
    },touchstart: function(a) {
        this.R.addListener(this, "touchstart", a);
        return this
    },touchend: function(a) {
        this.R.addListener(this, "touchend", a);
        return this
    },stop: function() {
        var a = this.animationX;
        a && Html5Map.removeFromArray(this.R.animations, a);
        (a = this.animationY) && Html5Map.removeFromArray(this.R.animations, 
        a)
    },length: function() {
        return this.node.childNodes.length
    },gradient: function(a, b, d) {
        this.R.gradient(this, a, b, d)
    }});
Html5Map.SVGRenderer = Html5Map.Class({construct: function(a) {
        this.D = a;
        this.animations = []
    },create: function(a, b) {
        return document.createElementNS(Html5Map.SVG_NS, b)
    },attr: function(a, b) {
        for (var d in b)
            this.setAttr(a, d, b[d])
    },setAttr: function(a, b, d) {
        void 0 !== d && a.node.setAttribute(b, d)
    },animate: function(a, b, d, e, f) {
        var g = this, h = a.node;
        "translate" == b ? (h = (h = h.getAttribute("transform")) ? String(h).substring(10, h.length - 1) : "0,0", h = h.split(", ").join(" "), h = h.split(" ").join(","), 0 == h && (h = "0,0")) : h = h.getAttribute(b);
        b = {obj: a,frame: 0,attribute: b,from: h,to: d,time: e,effect: f};
        g.animations.push(b);
        a.animationX = b;
        g.interval || (g.interval = setInterval(function() {
            g.updateAnimations.call(g)
        }, Html5Map.updateRate))
    },updateAnimations: function() {
        for (var a = this.animations.length - 1; 0 <= a; a--) {
            var b = this.animations[a], d = 1E3 * b.time / Html5Map.updateRate, e = b.frame + 1, f = b.obj, g = b.attribute;
            if (e <= d) {
                b.frame++;
                if ("translate" == g)
                    var h = b.from.split(","), g = Number(h[0]), h = Number(h[1]), i = b.to.split(","), j = Number(i[0]), i = Number(i[1]), j = 0 == 
                    j - g ? j : Math.round(this.D[b.effect](0, e, g, j - g, d)), b = 0 == i - h ? i : Math.round(this.D[b.effect](0, e, h, i - h, d)), g = "transform", b = "translate(" + j + "," + b + ")";
                else
                    h = Number(b.from), j = Number(b.to), j -= h, b = this.D[b.effect](0, e, h, j, d), 0 == j && this.animations.splice(a, 1);
                this.setAttr(f, g, b)
            } else
                "translate" == g ? (i = b.to.split(","), j = Number(i[0]), i = Number(i[1]), f.translate(j, i)) : (j = Number(b.to), this.setAttr(f, g, j)), this.animations.splice(a, 1)
        }
    },getBBox: function(a) {
        if (a = a.node)
            try {
                return a.getBBox()
            } catch (b) {
            }
        return {width: 0,
            height: 0,x: 0,y: 0}
    },path: function(a, b) {
        a.node.setAttributeNS(Html5Map.SVG_XLINK, "xlink:href", b)
    },clipRect: function(a, b, d, e, f) {
        var g = a.node, h = a.clipPath;
        h && this.D.remove(h);
        var i = g.parentNode;
        i && (g = document.createElementNS(Html5Map.SVG_NS, "clipPath"), h = Html5Map.getUniqueId(), g.setAttribute("id", h), this.D.rect(b, d, e, f, 0, 0, g), i.appendChild(g), b = "#", Html5Map.baseHref && !Html5Map.isIE && (b = window.location.href + b), this.setAttr(a, "clip-path", "url(" + b + h + ")"), this.clipPathC++, a.clipPath = g)
    },text: function(a, b, 
    d) {
        for (var e = new Html5Map.AmDObject("text", this.D), a = String(a).split("\n"), f = b["font-size"], g = 0; g < a.length; g++) {
            var h = this.create(null, "tspan");
            h.appendChild(document.createTextNode(a[g]));
            h.setAttribute("y", (f + 2) * g + f / 2 + 0);
            h.setAttribute("x", 0);
            e.node.appendChild(h)
        }
        e.node.setAttribute("y", f / 2 + 0);
        this.attr(e, b);
        this.D.addToContainer(e.node, d);
        return e
    },setText: function(a, b) {
        var d = a.node;
        d && (d.removeChild(d.firstChild), d.appendChild(document.createTextNode(b)))
    },move: function(a, b, d, e) {
        b = "translate(" + 
        b + "," + d + ")";
        e && (b = b + " scale(" + e + ")");
        this.setAttr(a, "transform", b)
    },rotate: function(a, b) {
        var d = a.node.getAttribute("transform"), e = "rotate(" + b + ")";
        d && (e = d + " " + e);
        this.setAttr(a, "transform", e)
    },set: function(a) {
        var b = new Html5Map.AmDObject("g", this.D);
        this.D.container.appendChild(b.node);
        if (a)
            for (var d = 0; d < a.length; d++)
                b.push(a[d]);
        return b
    },addListener: function(a, b, d) {
        a.node["on" + b] = d
    },gradient: function(a, b, d, e) {
        var f = a.node, g = a.grad;
        g && this.D.remove(g);
        b = document.createElementNS(Html5Map.SVG_NS, b);
        g = Html5Map.getUniqueId();
        b.setAttribute("id", g);
        if (!isNaN(e)) {
            var h = 0, i = 0, j = 0, l = 0;
            90 == e ? j = 100 : 270 == e ? l = 100 : 180 == e ? h = 100 : 0 == e && (i = 100);
            b.setAttribute("x1", h + "%");
            b.setAttribute("x2", i + "%");
            b.setAttribute("y1", j + "%");
            b.setAttribute("y2", l + "%")
        }
        for (e = 0; e < d.length; e++)
            h = document.createElementNS(Html5Map.SVG_NS, "stop"), i = 100 * e / (d.length - 1), 0 == e && (i = 0), h.setAttribute("offset", i + "%"), h.setAttribute("stop-color", d[e]), b.appendChild(h);
        f.parentNode.appendChild(b);
        d = "#";
        Html5Map.baseHref && !Html5Map.isIE && (d = 
        window.location.href + d);
        f.setAttribute("fill", "url(" + d + g + ")");
        a.grad = b
    },remove: function(a) {
        a.clipPath && this.D.remove(a.clipPath);
        a.grad && this.D.remove(a.grad);
        this.D.remove(a.node)
    }});
Html5Map.AmChart = Html5Map.Class({construct: function() {
        this.version = "2.8.2";
        Html5Map.addChart(this);
        this.createEvents("dataUpdated", "init");
        this.height = this.width = "100%";
        this.dataChanged = !0;
        this.chartCreated = !1;
        this.previousWidth = this.previousHeight = 0;
        this.backgroundColor = "#FFFFFF";
        this.borderAlpha = this.backgroundAlpha = 0;
        this.color = this.borderColor = "#000000";
        this.fontFamily = "Microsoft Yahei";
        this.fontSize = 14;
        this.numberFormatter = {precision: -1,decimalSeparator: ".",thousandsSeparator: ","};
        this.percentFormatter = 
        {precision: 2,decimalSeparator: ".",thousandsSeparator: ","};
        this.labels = [];
        this.allLabels = [];
        this.titles = [];
        this.marginRight = this.marginLeft = this.autoMarginOffset = 0;
        this.timeOuts = [];
        var a = document.createElement("div"), b = a.style;
        b.overflow = "hidden";
        b.position = "relative";
        b.textAlign = "left";
        this.chartDiv = a;
        a = document.createElement("div");
        b = a.style;
        b.overflow = "hidden";
        b.position = "relative";
        this.legendDiv = a;
        this.balloon = new Html5Map.AmBalloon;
        this.balloon.chart = this;
        this.titleHeight = 0;
        this.prefixesOfBigNumbers = 
        [{number: 1E3,prefix: "k"}, {number: 1E6,prefix: "M"}, {number: 1E9,prefix: "G"}, {number: 1E12,prefix: "T"}, {number: 1E15,prefix: "P"}, {number: 1E18,prefix: "E"}, {number: 1E21,prefix: "Z"}, {number: 1E24,prefix: "Y"}];
        this.prefixesOfSmallNumbers = [{number: 1E-24,prefix: "y"}, {number: 1E-21,prefix: "z"}, {number: 1E-18,prefix: "a"}, {number: 1E-15,prefix: "f"}, {number: 1E-12,prefix: "p"}, {number: 1E-9,prefix: "n"}, {number: 1E-6,prefix: "\u03bc"}, {number: 0.001,prefix: "m"}];
        this.panEventsEnabled = !1;
        Html5Map.bezierX = 3;
        Html5Map.bezierY = 
        6;
        this.product = "amcharts"
    },drawChart: function() {
        this.drawBackground();
        this.redrawLabels();
        this.drawTitles()
    },drawBackground: function() {
        var a = this.container, b = this.backgroundColor, d = this.backgroundAlpha, e = this.set, f = this.updateWidth();
        this.realWidth = f;
        var g = this.updateHeight();
        this.realHeight = g;
        this.background = b = Html5Map.polygon(a, [0, f - 1, f - 1, 0], [0, 0, g - 1, g - 1], b, d, 1, this.borderColor, this.borderAlpha);
        e.push(b);
        if (b = this.backgroundImage)
            this.path && (b = this.path + b), this.bgImg = a = a.image(b, 0, 0, f, g), e.push(a)
    },
    drawTitles: function() {
        var a = this.titles;
        if (Html5Map.ifArray(a))
            for (var b = 20, d = 0; d < a.length; d++) {
                var e = a[d], f = e.color;
                void 0 == f && (f = this.color);
                var g = e.size;
                isNaN(e.alpha);
                var h = this.marginLeft, f = Html5Map.text(this.container, e.text, f, this.fontFamily, g);
                f.translate(h + (this.realWidth - this.marginRight - h) / 2, b);
                h = !0;
                void 0 != e.bold && (h = e.bold);
                h && f.attr({"font-weight": "bold"});
                b += g + 6;
                this.freeLabelsSet.push(f)
            }
    },write: function(a) {
        var b = this.balloon;
        b && !b.chart && (b.chart = this);
        a = "object" != typeof a ? document.getElementById(a) : 
        a;
        a.innerHTML = "";
        this.div = a;
        a.style.overflow = "hidden";
        a.style.textAlign = "left";
        var b = this.chartDiv, d = this.legendDiv, e = this.legend, f = d.style, g = b.style;
        this.measure();
        if (e)
            switch (e.position) {
                case "bottom":
                    a.appendChild(b);
                    a.appendChild(d);
                    break;
                case "top":
                    a.appendChild(d);
                    a.appendChild(b);
                    break;
                case "absolute":
                    var h = document.createElement("div"), i = h.style;
                    i.position = "relative";
                    i.width = a.style.width;
                    i.height = a.style.height;
                    a.appendChild(h);
                    f.position = "absolute";
                    g.position = "absolute";
                    void 0 != e.left && 
                    (f.left = e.left + "px");
                    void 0 != e.right && (f.right = e.right + "px");
                    void 0 != e.top && (f.top = e.top + "px");
                    void 0 != e.bottom && (f.bottom = e.bottom + "px");
                    e.marginLeft = 0;
                    e.marginRight = 0;
                    h.appendChild(b);
                    h.appendChild(d);
                    break;
                case "right":
                    h = document.createElement("div");
                    i = h.style;
                    i.position = "relative";
                    i.width = a.style.width;
                    i.height = a.style.height;
                    a.appendChild(h);
                    f.position = "relative";
                    g.position = "absolute";
                    h.appendChild(b);
                    h.appendChild(d);
                    break;
                case "left":
                    h = document.createElement("div"), i = h.style, i.position = "relative", 
                    i.width = a.style.width, i.height = a.style.height, a.appendChild(h), f.position = "absolute", g.position = "relative", h.appendChild(b), h.appendChild(d)
            }
        else
            a.appendChild(b);
        this.listenersAdded || (this.addListeners(), this.listenersAdded = !0);
        this.initChart()
    },createLabelsSet: function() {
        Html5Map.remove(this.labelsSet);
        this.labelsSet = this.container.set();
        this.freeLabelsSet.push(this.labelsSet)
    },initChart: function() {
        this.divIsFixed = Html5Map.findIfFixed(this.chartDiv);
        this.previousHeight = this.realHeight;
        this.previousWidth = 
        this.realWidth;
        this.destroy();
        var a = 0;
        document.attachEvent && !window.opera && (a = 1);
        Html5Map.isNN && Html5Map.findIfAuto(this.chartDiv) && (a = 3);
        this.mouseMode = a;
        this.container = new Html5Map.AmDraw(this.chartDiv, this.realWidth, this.realHeight);
        if (Html5Map.VML || Html5Map.SVG)
            a = this.container, this.set = a.set(), this.gridSet = a.set(), this.graphsBehindSet = a.set(), this.bulletBehindSet = a.set(), this.columnSet = a.set(), this.graphsSet = a.set(), this.trendLinesSet = a.set(), this.axesLabelsSet = a.set(), this.axesSet = a.set(), this.cursorSet = 
            a.set(), this.scrollbarsSet = a.set(), this.bulletSet = a.set(), this.freeLabelsSet = a.set(), this.balloonsSet = a.set(), this.balloonsSet.setAttr("id", "balloons"), this.zoomButtonSet = a.set(), this.linkSet = a.set(), this.drb(), this.renderFix()
    },measure: function() {
        var a = this.div, b = this.chartDiv, d = a.offsetWidth, e = a.offsetHeight, f = this.container;
        a.clientHeight && (d = a.clientWidth, e = a.clientHeight);
        var g = Html5Map.removePx(Html5Map.getStyle(a, "padding-left")), h = Html5Map.removePx(Html5Map.getStyle(a, "padding-right")), i = 
        Html5Map.removePx(Html5Map.getStyle(a, "padding-top")), j = Html5Map.removePx(Html5Map.getStyle(a, "padding-bottom"));
        isNaN(g) || (d -= g);
        isNaN(h) || (d -= h);
        isNaN(i) || (e -= i);
        isNaN(j) || (e -= j);
        g = a.style;
        a = g.width;
        g = g.height;
        -1 != a.indexOf("px") && (d = Html5Map.removePx(a));
        -1 != g.indexOf("px") && (e = Html5Map.removePx(g));
        a = Html5Map.toCoordinate(this.width, d);
        g = Html5Map.toCoordinate(this.height, e);
        if (a != this.previousWidth || g != this.previousHeight)
            b.style.width = a + "px", b.style.height = g + "px", f && f.setSize(a, g), this.balloon.setBounds(2, 
            2, a - 2, g);
        this.realWidth = a;
        this.realHeight = g;
        this.divRealWidth = d;
        this.divRealHeight = e
    },destroy: function() {
        this.chartDiv.innerHTML = "";
        this.clearTimeOuts()
    },clearTimeOuts: function() {
        var a = this.timeOuts;
        if (a)
            for (var b = 0; b < a.length; b++)
                clearTimeout(a[b]);
        this.timeOuts = []
    },clear: function(a) {
        Html5Map.callMethod("clear", [this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor]);
        this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null;
        this.clearTimeOuts();
        this.container && (this.container.remove(this.chartDiv), 
        this.container.remove(this.legendDiv));
        a || Html5Map.removeChart(this)
    },setMouseCursor: function(a) {
        "auto" == a && Html5Map.isNN && (a = "default");
        this.chartDiv.style.cursor = a;
        this.legendDiv.style.cursor = a
    },redrawLabels: function() {
        this.labels = [];
        var a = this.allLabels;
        this.createLabelsSet();
        for (var b = 0; b < a.length; b++)
            this.drawLabel(a[b])
    },drawLabel: function(a) {
        if (this.container) {
            var b = a.y, d = a.text, e = a.align, f = a.size, g = a.color, h = a.rotation, i = a.alpha, j = a.bold, l = Html5Map.toCoordinate(a.x, this.realWidth), b = Html5Map.toCoordinate(b, 
            this.realHeight);
            l || (l = 0);
            b || (b = 0);
            void 0 == g && (g = this.color);
            isNaN(f) && (f = this.fontSize);
            e || (e = "start");
            "left" == e && (e = "start");
            "right" == e && (e = "end");
            "center" == e && (e = "middle", h ? b = this.realHeight - b + b / 2 : l = this.realWidth / 2 - l);
            void 0 == i && (i = 1);
            void 0 == h && (h = 0);
            b += f / 2;
            d = Html5Map.text(this.container, d, g, this.fontFamily, f, e, j, i);
            d.translate(l, b);
            0 != h && d.rotate(h);
            a.url && (d.setAttr("cursor", "pointer"), d.click(function() {
                Html5Map.getURL(a.url)
            }));
            this.labelsSet.push(d);
            this.labels.push(d)
        }
    },addLabel: function(a, 
    b, d, e, f, g, h, i, j, l) {
        a = {x: a,y: b,text: d,align: e,size: f,color: g,alpha: i,rotation: h,bold: j,url: l};
        this.container && this.drawLabel(a);
        this.allLabels.push(a)
    },clearLabels: function() {
        for (var a = this.labels, b = a.length - 1; 0 <= b; b--)
            a[b].remove();
        this.labels = [];
        this.allLabels = []
    },updateHeight: function() {
        var a = this.divRealHeight, b = this.legend;
        if (b) {
            var d = this.legendDiv.offsetHeight, b = b.position;
            if ("top" == b || "bottom" == b)
                a -= d, 0 > a && (a = 0), this.chartDiv.style.height = a + "px"
        }
        return a
    },updateWidth: function() {
        var a = this.divRealWidth, 
        b = this.divRealHeight, d = this.legend;
        if (d) {
            var e = this.legendDiv, f = e.offsetWidth, g = e.offsetHeight, e = e.style, h = this.chartDiv.style, d = d.position;
            if ("right" == d || "left" == d)
                a -= f, 0 > a && (a = 0), h.width = a + "px", "left" == d ? h.left = f + "px" : e.left = a + "px", e.top = (b - g) / 2 + "px"
        }
        return a
    },getTitleHeight: function() {
        var a = 0, b = this.titles;
        if (0 < b.length)
            for (var a = 15, d = 0; d < b.length; d++)
                a += b[d].size + 6;
        return a
    },addTitle: function(a, b, d, e, f) {
        isNaN(b) && (b = this.fontSize + 2);
        a = {text: a,size: b,color: d,alpha: e,bold: f};
        this.titles.push(a);
        return a
    },addListeners: function() {
        var a = this, b = a.chartDiv;
        Html5Map.isNN && (a.panEventsEnabled && "ontouchstart" in document.documentElement && (b.addEventListener("touchstart", function(b) {
            a.handleTouchMove.call(a, b);
            a.handleTouchStart.call(a, b)
        }, !0), b.addEventListener("touchmove", function(b) {
            a.handleTouchMove.call(a, b)
        }, !0), b.addEventListener("touchend", function(b) {
            a.handleTouchEnd.call(a, b)
        }, !0)), b.addEventListener("mousedown", function(b) {
            a.handleMouseDown.call(a, b)
        }, !0), b.addEventListener("mouseover", 
        function(b) {
            a.handleMouseOver.call(a, b)
        }, !0), b.addEventListener("mouseout", function(b) {
            a.handleMouseOut.call(a, b)
        }, !0));
        Html5Map.isIE && (b.attachEvent("onmousedown", function(b) {
            a.handleMouseDown.call(a, b)
        }), b.attachEvent("onmouseover", function(b) {
            a.handleMouseOver.call(a, b)
        }), b.attachEvent("onmouseout", function(b) {
            a.handleMouseOut.call(a, b)
        }))
    },dispDUpd: function() {
        var a;
        this.dispatchDataUpdated && (this.dispatchDataUpdated = !1, a = "dataUpdated", this.fire(a, {type: a,chart: this}));
        this.chartCreated || (a = "init", 
        this.fire(a, {type: a,chart: this}))
    },drb: function() {
    },validateSize: function() {
        var a = this;
        a.measure();
        var b = a.legend;
        if ((a.realWidth != a.previousWidth || a.realHeight != a.previousHeight) && 0 < a.realWidth && 0 < a.realHeight) {
            a.sizeChanged = !0;
            if (b) {
                clearTimeout(a.legendInitTO);
                var d = setTimeout(function() {
                    b.invalidateSize()
                }, 100);
                a.timeOuts.push(d);
                a.legendInitTO = d
            }
            a.marginsUpdated = !1;
            clearTimeout(a.initTO);
            d = setTimeout(function() {
                a.initChart()
            }, 150);
            a.timeOuts.push(d);
            a.initTO = d
        }
        a.renderFix();
        b && b.renderFix()
    },
    invalidateSize: function() {
        var a = this;
        a.previousWidth = NaN;
        a.previousHeight = NaN;
        a.marginsUpdated = !1;
        clearTimeout(a.validateTO);
        var b = setTimeout(function() {
            a.validateSize()
        }, 5);
        a.timeOuts.push(b);
        a.validateTO = b
    },validateData: function(a) {
        this.chartCreated && (this.dataChanged = !0, this.marginsUpdated = !1, this.initChart(a))
    },validateNow: function() {
        this.listenersAdded = !1;
        this.write(this.div)
    },showItem: function(a) {
        a.hidden = !1;
        this.initChart()
    },hideItem: function(a) {
        a.hidden = !0;
        this.initChart()
    },hideBalloon: function() {
        var a = 
        this;
        a.hoverInt = setTimeout(function() {
            a.hideBalloonReal.call(a)
        }, 80)
    },cleanChart: function() {
    },hideBalloonReal: function() {
        var a = this.balloon;
        a && a.hide()
    },showBalloon: function(a, b, d, e, f) {
        var g = this;
        clearTimeout(g.balloonTO);
        g.balloonTO = setTimeout(function() {
            g.showBalloonReal.call(g, a, b, d, e, f)
        }, 1)
    },showBalloonReal: function(a, b, d, e, f) {
        this.handleMouseMove();
        var g = this.balloon;
        g.enabled && (g.followCursor(!1), g.changeColor(b), d || g.setPosition(e, f), g.followCursor(d), a && g.showBalloon(a))
    },handleTouchMove: function(a) {
        this.hideBalloon();
        var b = this.chartDiv;
        a.touches && (a = a.touches.item(0), this.mouseX = a.pageX - Html5Map.findPosX(b), this.mouseY = a.pageY - Html5Map.findPosY(b))
    },handleMouseOver: function() {
        Html5Map.resetMouseOver();
        this.mouseIsOver = !0
    },handleMouseOut: function() {
        Html5Map.resetMouseOver();
        this.mouseIsOver = !1
    },handleMouseMove: function(a) {
        if (this.mouseIsOver) {
            var b = this.chartDiv;
            a || (a = window.event);
            var d, e;
            if (a) {
                switch (this.mouseMode) {
                    case 1:
                        d = a.clientX - Html5Map.findPosX(b);
                        e = a.clientY - Html5Map.findPosY(b);
                        if (!this.divIsFixed) {
                            if (a = 
                            document.body)
                                var f = a.scrollLeft, g = a.scrollTop;
                            if (a = document.documentElement)
                                var h = a.scrollLeft, i = a.scrollTop;
                            f = Math.max(f, h);
                            g = Math.max(g, i);
                            d += f;
                            e += g
                        }
                        break;
                    case 3:
                        d = a.pageX - Html5Map.findPosX(b);
                        e = a.pageY - Html5Map.findPosY(b);
                        break;
                    case 0:
                        this.divIsFixed ? (d = a.clientX - Html5Map.findPosX(b), e = a.clientY - Html5Map.findPosY(b)) : (d = a.pageX - Html5Map.findPosX(b), e = a.pageY - Html5Map.findPosY(b))
                }
                this.mouseX = d;
                this.mouseY = e
            }
        }
    },handleTouchStart: function(a) {
        this.handleMouseDown(a)
    },handleTouchEnd: function(a) {
        Html5Map.resetMouseOver();
        this.handleReleaseOutside(a)
    },handleReleaseOutside: function() {
    },handleMouseDown: function(a) {
        Html5Map.resetMouseOver();
        this.mouseIsOver = !0;
        a && a.preventDefault && a.preventDefault()
    },addLegend: function(a) {
        Html5Map.extend(a, new Html5Map.AmLegend);
        this.legend = a;
        a.chart = this;
        a.div = this.legendDiv;
        var b = this.handleLegendEvent;
        this.listenTo(a, "showItem", b);
        this.listenTo(a, "hideItem", b);
        this.listenTo(a, "clickMarker", b);
        this.listenTo(a, "rollOverItem", b);
        this.listenTo(a, "rollOutItem", b);
        this.listenTo(a, "rollOverMarker", 
        b);
        this.listenTo(a, "rollOutMarker", b);
        this.listenTo(a, "clickLabel", b)
    },removeLegend: function() {
        this.legend = void 0;
        this.legendDiv.innerHTML = ""
    },handleResize: function() {
        (Html5Map.isPercents(this.width) || Html5Map.isPercents(this.height)) && this.invalidateSize();
        this.renderFix()
    },renderFix: function() {
        if (!Html5Map.VML) {
            var a = this.container;
            a && a.renderFix()
        }
    },getSVG: function() {
        if (Html5Map.hasSVG)
            return this.container
    }});
Html5Map.Slice = Html5Map.Class({construct: function() {
    }});
Html5Map.SerialDataItem = Html5Map.Class({construct: function() {
    }});
Html5Map.GraphDataItem = Html5Map.Class({construct: function() {
    }});
Html5Map.Guide = Html5Map.Class({construct: function() {
    }});
Html5Map.AmBalloon = Html5Map.Class({construct: function() {
        this.enabled = !0;
        this.fillColor = "#CC0000";
        this.fillAlpha = 1;
        this.borderThickness = 2;
        this.borderColor = "#FFFFFF";
        this.borderAlpha = 1;
        this.cornerRadius = 6;
        this.maximumWidth = 220;
        this.horizontalPadding = 8;
        this.verticalPadding = 5;
        this.pointerWidth = 10;
        this.pointerOrientation = "V";
        this.color = "#FFFFFF";
        this.textShadowColor = "#000000";
        this.adjustBorderColor = !1;
        this.showBullet = !0;
        this.show = this.follow = !1;
        this.bulletSize = 3;
        this.textAlign = "middle"
    },draw: function() {
        var a = 
        this.pointToX, b = this.pointToY, d = this.textAlign;
        if (!isNaN(a)) {
            var e = this.chart, f = e.container, g = this.set;
            Html5Map.remove(g);
            Html5Map.remove(this.pointer);
            this.set = g = f.set();
            e.balloonsSet.push(g);
            if (this.show) {
                var h = this.l, i = this.t, j = this.r, l = this.b, k = this.textShadowColor;
                this.color == k && (k = void 0);
                var m = this.balloonColor, t = this.fillColor, v = this.borderColor;
                void 0 != m && (this.adjustBorderColor ? v = m : t = m);
                var q = this.horizontalPadding, p = this.verticalPadding, m = this.pointerWidth, r = this.pointerOrientation, w = this.cornerRadius, 
                s = e.fontFamily, u = this.fontSize;
                void 0 == u && (u = e.fontSize);
                e = Html5Map.text(f, this.text, this.color, s, u, d);
                g.push(e);
                if (void 0 != k) {
                    var x = Html5Map.text(f, this.text, k, s, u, d, !1, 0.4);
                    g.push(x)
                }
                s = e.getBBox();
                k = s.height + 2 * p;
                p = s.width + 2 * q;
                window.opera && (k += 2);
                var n, u = u / 2 + 5;
                switch (d) {
                    case "middle":
                        n = p / 2;
                        break;
                    case "left":
                        n = q;
                        break;
                    case "right":
                        n = p - q
                }
                e.translate(n, u);
                x && x.translate(n + 1, u + 1);
                "H" != r ? (n = a - p / 2, d = b < i + k + 10 && "down" != r ? b + m : b - k - m) : (2 * m > k && (m = k / 2), d = b - k / 2, n = a < h + (j - h) / 2 ? a + m : a - p - m);
                d + k >= l && (d = l - k);
                d < i && (d = 
                i);
                n < h && (n = h);
                n + p > j && (n = j - p);
                0 < w || 0 == m ? (v = Html5Map.rect(f, p, k, t, this.fillAlpha, this.borderThickness, v, this.borderAlpha, this.cornerRadius), this.showBullet && (f = Html5Map.circle(f, this.bulletSize, t, this.fillAlpha), f.translate(a, b), this.pointer = f)) : (l = [], w = [], "H" != r ? (h = a - n, h > p - m && (h = p - m), h < m && (h = m), l = [0, h - m, a - n, h + m, p, p, 0, 0], w = b < i + k + 10 && "down" != r ? [0, 0, b - d, 0, 0, k, k, 0] : [k, k, b - d, k, k, 0, 0, k]) : (i = b - d, i > k - m && (i = k - m), i < m && (i = m), w = [0, i - m, b - d, i + m, k, k, 0, 0], l = a < h + (j - h) / 2 ? [0, 0, a - n, 0, 0, p, p, 0] : [p, p, a - n, p, p, 0, 0, p]), v = Html5Map.polygon(f, 
                l, w, t, this.fillAlpha, this.borderThickness, v, this.borderAlpha));
                g.push(v);
                v.toFront();
                x && x.toFront();
                e.toFront();
                a = 1;
                9 > Html5Map.IEversion && this.follow && (a = 6);
                g.translate(n - a, d);
                s = v.getBBox();
                this.bottom = d + s.y + s.height;
                this.yPos = s.y + d
            }
        }
    },followMouse: function() {
        if (this.follow && this.show) {
            var a = this.chart.mouseX, b = this.chart.mouseY - 3;
            this.pointToX = a;
            this.pointToY = b;
            if (a != this.previousX || b != this.previousY)
                if (this.previousX = a, this.previousY = b, 0 == this.cornerRadius)
                    this.draw();
                else {
                    var d = this.set;
                    if (d) {
                        var e = 
                        d.getBBox(), a = a - e.width / 2, f = b - e.height - 10;
                        a < this.l && (a = this.l);
                        a > this.r - e.width && (a = this.r - e.width);
                        f < this.t && (f = b + 10);
                        d.translate(a, f)
                    }
                }
        }
    },changeColor: function(a) {
        this.balloonColor = a
    },setBounds: function(a, b, d, e) {
        this.l = a;
        this.t = b;
        this.r = d;
        this.b = e
    },showBalloon: function(a) {
        this.text = a;
        this.show = !0;
        this.draw()
    },hide: function() {
        this.follow = this.show = !1;
        this.destroy()
    },setPosition: function(a, b, d) {
        this.pointToX = a;
        this.pointToY = b;
        d && (a != this.previousX || b != this.previousY) && this.draw();
        this.previousX = a;
        this.previousY = b
    },followCursor: function(a) {
        var b = this;
        (b.follow = a) ? (b.pShowBullet = b.showBullet, b.showBullet = !1) : void 0 != b.pShowBullet && (b.showBullet = b.pShowBullet);
        clearInterval(b.interval);
        var d = b.chart.mouseX, e = b.chart.mouseY;
        !isNaN(d) && a && (b.pointToX = d, b.pointToY = e - 3, b.interval = setInterval(function() {
            b.followMouse.call(b)
        }, 40))
    },destroy: function() {
        clearInterval(this.interval);
        Html5Map.remove(this.set);
        Html5Map.remove(this.pointer)
    }});
Html5Map.circle = function(a, b, d, e, f, g, h, i) {
    if (void 0 == f || 0 == f)
        f = 1;
    void 0 == g && (g = "#000000");
    void 0 == h && (h = 0);
    e = {fill: d,stroke: g,"fill-opacity": e,"stroke-width": f,"stroke-opacity": h};
    a = a.circle(0, 0, b).attr(e);
    i && a.gradient("radialGradient", [d, Html5Map.adjustLuminosity(d, -0.6)]);
    return a
};
Html5Map.text = function(a, b, d, e, f, g, h, i) {
    g || (g = "middle");
    "right" == g && (g = "end");
    d = {fill: d,"font-family": e,"font-size": f,opacity: i};
    !0 == h && (d["font-weight"] = "bold");
    d["text-anchor"] = g;
    return a.text(b, d)
};
Html5Map.polygon = function(a, b, d, e, f, g, h, i, j) {
    isNaN(g) && (g = 0);
    isNaN(i) && (i = f);
    var l = e, k = !1;
    "object" == typeof l && 1 < l.length && (k = !0, l = l[0]);
    void 0 == h && (h = l);
    for (var f = {fill: l,stroke: h,"fill-opacity": f,"stroke-width": g,"stroke-opacity": i}, g = Html5Map.dx, h = Html5Map.dy, i = Math.round, l = "M" + (i(b[0]) + g) + "," + (i(d[0]) + h), m = 1; m < b.length; m++)
        l += " L" + (i(b[m]) + g) + "," + (i(d[m]) + h);
    a = a.path(l + " Z").attr(f);
    k && a.gradient("linearGradient", e, j);
    return a
};
Html5Map.rect = function(a, b, d, e, f, g, h, i, j, l) {
    isNaN(g) && (g = 0);
    void 0 == j && (j = 0);
    void 0 == l && (l = 270);
    isNaN(f) && (f = 0);
    var k = e, m = !1;
    "object" == typeof k && (k = k[0], m = !0);
    void 0 == h && (h = k);
    void 0 == i && (i = f);
    var b = Math.round(b), d = Math.round(d), t = 0, v = 0;
    0 > b && (b = Math.abs(b), t = -b);
    0 > d && (d = Math.abs(d), v = -d);
    t += Html5Map.dx;
    v += Html5Map.dy;
    f = {fill: k,stroke: h,"fill-opacity": f,"stroke-opacity": i};
    a = a.rect(t, v, b, d, j, g).attr(f);
    m && a.gradient("linearGradient", e, l);
    return a
};
Html5Map.triangle = function(a, b, d, e, f, g, h, i) {
    if (void 0 == g || 0 == g)
        g = 1;
    void 0 == h && (h = "#000");
    void 0 == i && (i = 0);
    var e = {fill: e,stroke: h,"fill-opacity": f,"stroke-width": g,"stroke-opacity": i}, b = b / 2, j;
    0 == d && (j = " M" + -b + "," + b + " L0," + -b + " L" + b + "," + b + " Z");
    180 == d && (j = " M" + -b + "," + -b + " L0," + b + " L" + b + "," + -b + " Z");
    90 == d && (j = " M" + -b + "," + -b + " L" + b + ",0 L" + -b + "," + b + " Z");
    270 == d && (j = " M" + -b + ",0 L" + b + "," + b + " L" + b + "," + -b + " Z");
    return a.path(j).attr(e)
};
Html5Map.line = function(a, b, d, e, f, g, h, i, j) {
    g = {fill: "none","stroke-width": g};
    void 0 != h && 0 < h && (g["stroke-dasharray"] = h);
    isNaN(f) || (g["stroke-opacity"] = f);
    e && (g.stroke = e);
    for (var e = Math.round, f = Html5Map.dx, h = Html5Map.dy, i = "M" + (e(b[0]) + f) + "," + (e(d[0]) + h), l = 1; l < b.length; l++)
        i += " L" + (e(b[l]) + f) + "," + (e(d[l]) + h);
    if (Html5Map.VML)
        return a.path(i, void 0, !0).attr(g);
    j && (i += " M0,0 L0,0");
    return a.path(i).attr(g)
};
Html5Map.wedge = function(a, b, d, e, f, g, h, i, j, l, k) {
    var m = Math.round, g = m(g), h = m(h), i = m(i), t = m(h / g * i), v = Html5Map.VML, q = -359.5 - g / 100;
    -359.95 > q && (q = -359.95);
    f <= q && (f = q);
    var p = 1 / 180 * Math.PI, q = b + Math.cos(e * p) * i, r = d + Math.sin(-e * p) * t, w = b + Math.cos(e * p) * g, s = d + Math.sin(-e * p) * h, u = b + Math.cos((e + f) * p) * g, x = d + Math.sin((-e - f) * p) * h, n = b + Math.cos((e + f) * p) * i, p = d + Math.sin((-e - f) * p) * t, y = {fill: Html5Map.adjustLuminosity(l.fill, -0.2),"stroke-opacity": 0}, D = 0;
    180 < Math.abs(f) && (D = 1);
    var e = a.set(), C;
    v && (q = m(10 * q), w = m(10 * w), u = m(10 * 
    u), n = m(10 * n), r = m(10 * r), s = m(10 * s), x = m(10 * x), p = m(10 * p), b = m(10 * b), j = m(10 * j), d = m(10 * d), g *= 10, h *= 10, i *= 10, t *= 10, 1 > Math.abs(f) && (1 >= Math.abs(u - w) && 1 >= Math.abs(x - s)) && (C = !0));
    f = "";
    if (0 < j) {
        v ? (path = " M" + q + "," + (r + j) + " L" + w + "," + (s + j), C || (path += " A" + (b - g) + "," + (j + d - h) + "," + (b + g) + "," + (j + d + h) + "," + w + "," + (s + j) + "," + u + "," + (x + j)), path += " L" + n + "," + (p + j), 0 < i && (C || (path += " B" + (b - i) + "," + (j + d - t) + "," + (b + i) + "," + (j + d + t) + "," + n + "," + (j + p) + "," + q + "," + (j + r)))) : (path = " M" + q + "," + (r + j) + " L" + w + "," + (s + j), path += " A" + g + "," + h + ",0," + D + ",1," + 
        u + "," + (x + j) + " L" + n + "," + (p + j), 0 < i && (path += " A" + i + "," + t + ",0," + D + ",0," + q + "," + (r + j)));
        path += " Z";
        c = a.path(path, void 0, void 0, "1000,1000").attr(y);
        e.push(c);
        var A = a.path(" M" + q + "," + r + " L" + q + "," + (r + j) + " L" + w + "," + (s + j) + " L" + w + "," + s + " L" + q + "," + r + " Z", void 0, void 0, "1000,1000").attr(y), j = a.path(" M" + u + "," + x + " L" + u + "," + (x + j) + " L" + n + "," + (p + j) + " L" + n + "," + p + " L" + u + "," + x + " Z", void 0, void 0, "1000,1000").attr(y);
        e.push(A);
        e.push(j)
    }
    v ? (C || (f = " A" + m(b - g) + "," + m(d - h) + "," + m(b + g) + "," + m(d + h) + "," + m(w) + "," + m(s) + "," + m(u) + 
    "," + m(x)), g = " M" + m(q) + "," + m(r) + " L" + m(w) + "," + m(s) + f + " L" + m(n) + "," + m(p)) : g = " M" + q + "," + r + " L" + w + "," + s + (" A" + g + "," + h + ",0," + D + ",1," + u + "," + x) + " L" + n + "," + p;
    0 < i && (v ? C || (g += " B" + (b - i) + "," + (d - t) + "," + (b + i) + "," + (d + t) + "," + n + "," + p + "," + q + "," + r) : g += " A" + i + "," + t + ",0," + D + ",0," + q + "," + r);
    a = a.path(g + " Z", void 0, void 0, "1000,1000").attr(l);
    if (k) {
        b = [];
        for (d = 0; d < k.length; d++)
            b.push(Html5Map.adjustLuminosity(l.fill, k[d]));
        0 < b.length && a.gradient("linearGradient", b)
    }
    e.push(a);
    return e
};
Html5Map.adjustLuminosity = function(a, b) {
    a = String(a).replace(/[^0-9a-f]/gi, "");
    6 > a.length && (a = String(a[0]) + String(a[0]) + String(a[1]) + String(a[1]) + String(a[2]) + String(a[2]));
    var b = b || 0, d = "#", e, f;
    for (f = 0; 3 > f; f++)
        e = parseInt(a.substr(2 * f, 2), 16), e = Math.round(Math.min(Math.max(0, e + e * b), 255)).toString(16), d += ("00" + e).substr(e.length);
    return d
};
Html5Map.AmLegend = Html5Map.Class({construct: function() {
        this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "rollOverItem", "rollOutItem", "clickLabel");
        this.position = "bottom";
        this.borderColor = this.color = "#000000";
        this.borderAlpha = 0;
        this.markerLabelGap = 5;
        this.verticalGap = 10;
        this.align = "left";
        this.horizontalGap = 0;
        this.spacing = 10;
        this.markerDisabledColor = "#AAB3B3";
        this.markerType = "square";
        this.markerSize = 16;
        this.markerBorderAlpha;
        this.markerBorderThickness = 
        1;
        this.marginBottom = this.marginTop = 0;
        this.marginLeft = this.marginRight = 20;
        this.autoMargins = !0;
        this.valueWidth = 50;
        this.switchable = !0;
        this.switchType = "x";
        this.switchColor = "#FFFFFF";
        this.rollOverColor = "#CC0000";
        this.selectedColor;
        this.reversedOrder = !1;
        this.labelText = "[[title]]";
        this.valueText = "[[value]]";
        this.useMarkerColorForLabels = !1;
        this.rollOverGraphAlpha = 1;
        this.textClickEnabled = !1;
        this.equalWidths = !0;
        this.dateFormat = "DD-MM-YYYY";
        this.backgroundColor = "#FFFFFF";
        this.backgroundAlpha = 0;
        this.ly;
        this.lx;
        this.showEntries = !0
    },setData: function(a) {
        this.data = a;
        this.invalidateSize()
    },invalidateSize: function() {
        this.destroy();
        this.entries = [];
        this.valueLabels = [];
        Html5Map.ifArray(this.data) && this.drawLegend()
    },drawLegend: function() {
        var a = this.chart, b = this.position, d = this.width, e = a.divRealWidth, f = a.divRealHeight, g = this.div, h = this.data;
        isNaN(this.fontSize) && (this.fontSize = a.fontSize);
        if ("right" == b || "left" == b)
            this.maxColumns = 1, this.marginLeft = this.marginRight = 10;
        else if (this.autoMargins) {
            this.marginRight = a.marginRight;
            this.marginLeft = a.marginLeft;
            var i = a.autoMarginOffset;
            "bottom" == b ? (this.marginBottom = i, this.marginTop = 0) : (this.marginTop = i, this.marginBottom = 0)
        }
        this.divWidth = b = void 0 != d ? Html5Map.toCoordinate(d, e) : a.realWidth;
        g.style.width = b + "px";
        this.container = new Html5Map.AmDraw(g, b, f);
        this.lx = 0;
        this.ly = 8;
        f = this.markerSize;
        f > this.fontSize && (this.ly = f / 2 - 1);
        0 < f && (this.lx += f + this.markerLabelGap);
        this.titleWidth = 0;
        if (f = this.title)
            a = Html5Map.text(this.container, f, this.color, a.fontFamily, this.fontSize, "start", !0), a.translate(0, 
            this.marginTop + this.verticalGap + this.ly + 1), a = a.getBBox(), this.titleWidth = a.width + 15, this.titleHeight = a.height + 6;
        this.index = this.maxLabelWidth = 0;
        if (this.showEntries) {
            for (a = 0; a < h.length; a++)
                this.createEntry(h[a]);
            for (a = this.index = 0; a < h.length; a++)
                this.createValue(h[a])
        }
        this.arrangeEntries();
        this.updateValues()
    },arrangeEntries: function() {
        var a = this.position, b = this.marginLeft + this.titleWidth, d = this.marginRight, e = this.marginTop, f = this.marginBottom, g = this.horizontalGap, h = this.div, i = this.divWidth, j = this.maxColumns, 
        l = this.verticalGap, k = this.spacing, m = i - d - b, t = 0, v = 0, q = this.container, p = q.set();
        this.set = p;
        q = q.set();
        p.push(q);
        for (var r = this.entries, w = 0; w < r.length; w++) {
            var s = r[w].getBBox(), u = s.width;
            u > t && (t = u);
            s = s.height;
            s > v && (v = s)
        }
        for (var x = u = 0, n = g, w = 0; w < r.length; w++) {
            var y = r[w];
            this.reversedOrder && (y = r[r.length - w - 1]);
            var s = y.getBBox(), D;
            this.equalWidths ? D = g + x * (t + k + this.markerLabelGap) : (D = n, n = n + s.width + g + k);
            D + s.width > m && 0 < w && (u++, x = 0, D = g, n = D + s.width + g + k);
            y.translate(D, (v + l) * u);
            x++;
            !isNaN(j) && x >= j && (x = 0, u++);
            q.push(y)
        }
        s = 
        q.getBBox();
        j = s.height + 2 * l - 1;
        "left" == a || "right" == a ? (i = s.width + 2 * g, h.style.width = i + b + d + "px") : i = i - b - d - 1;
        d = Html5Map.polygon(this.container, [0, i, i, 0], [0, 0, j, j], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
        p.push(d);
        p.translate(b, e);
        d.toBack();
        b = g;
        if ("top" == a || "bottom" == a || "absolute" == a)
            "center" == this.align ? b = g + (i - s.width) / 2 : "right" == this.align && (b = g + i - s.width);
        q.translate(b, l + 1);
        this.titleHeight > j && (j = this.titleHeight);
        a = j + e + f + 1;
        0 > a && (a = 0);
        h.style.height = Math.round(a) + 
        "px"
    },createEntry: function(a) {
        if (!1 !== a.visibleInLegend) {
            var b = this.chart, d = a.markerType;
            d || (d = this.markerType);
            var e = a.color, f = a.alpha;
            a.legendKeyColor && (e = a.legendKeyColor());
            a.legendKeyAlpha && (f = a.legendKeyAlpha());
            !0 == a.hidden && (e = this.markerDisabledColor);
            var g = this.createMarker(d, e, f);
            this.addListeners(g, a);
            f = this.container.set([g]);
            this.switchable && f.setAttr("cursor", "pointer");
            var h = this.switchType;
            if (h) {
                var i;
                i = "x" == h ? this.createX() : this.createV();
                i.dItem = a;
                !0 != a.hidden ? "x" == h ? i.hide() : i.show() : 
                "x" != h && i.hide();
                this.switchable || i.hide();
                this.addListeners(i, a);
                a.legendSwitch = i;
                f.push(i)
            }
            h = this.color;
            a.showBalloon && (this.textClickEnabled && void 0 != this.selectedColor) && (h = this.selectedColor);
            this.useMarkerColorForLabels && (h = e);
            !0 == a.hidden && (h = this.markerDisabledColor);
            e = Html5Map.massReplace(this.labelText, {"[[title]]": a.title});
            i = this.fontSize;
            var j = this.markerSize;
            if (g && j < i) {
                var l = 0;
                if ("bubble" == d || "circle" == d)
                    l = j / 2;
                g.translate(l, l + this.ly - i / 2 + (i + 2 - j) / 2)
            }
            if (e) {
                var k = Html5Map.text(this.container, 
                e, h, b.fontFamily, i, "start");
                k.translate(this.lx, this.ly);
                f.push(k);
                b = k.getBBox().width;
                this.maxLabelWidth < b && (this.maxLabelWidth = b)
            }
            this.entries[this.index] = f;
            a.legendEntry = this.entries[this.index];
            a.legendLabel = k;
            this.index++
        }
    },addListeners: function(a, b) {
        var d = this;
        a && a.mouseover(function() {
            d.rollOverMarker(b)
        }).mouseout(function() {
            d.rollOutMarker(b)
        }).click(function() {
            d.clickMarker(b)
        })
    },rollOverMarker: function(a) {
        this.switchable && this.dispatch("rollOverMarker", a);
        this.dispatch("rollOverItem", a)
    },
    rollOutMarker: function(a) {
        this.switchable && this.dispatch("rollOutMarker", a);
        this.dispatch("rollOutItem", a)
    },clickMarker: function(a) {
        this.switchable ? !0 == a.hidden ? this.dispatch("showItem", a) : this.dispatch("hideItem", a) : this.textClickEnabled && this.dispatch("clickMarker", a)
    },rollOverLabel: function(a) {
        a.hidden || (this.textClickEnabled && a.legendLabel && a.legendLabel.attr({fill: this.rollOverColor}), this.dispatch("rollOverItem", a))
    },rollOutLabel: function(a) {
        if (!a.hidden) {
            if (this.textClickEnabled && a.legendLabel) {
                var b = 
                this.color;
                void 0 != this.selectedColor && a.showBalloon && (b = this.selectedColor);
                this.useMarkerColorForLabels && (b = a.lineColor, void 0 == b && (b = a.color));
                a.legendLabel.attr({fill: b})
            }
            this.dispatch("rollOutItem", a)
        }
    },clickLabel: function(a) {
        this.textClickEnabled ? a.hidden || this.dispatch("clickLabel", a) : this.switchable && (!0 == a.hidden ? this.dispatch("showItem", a) : this.dispatch("hideItem", a))
    },dispatch: function(a, b) {
        this.fire(a, {type: a,dataItem: b,target: this,chart: this.chart})
    },createValue: function(a) {
        var b = this, 
        d = b.fontSize;
        if (!1 !== a.visibleInLegend) {
            var e = b.maxLabelWidth;
            b.equalWidths || (b.valueAlign = "left");
            "left" == b.valueAlign && (e = a.legendEntry.getBBox().width);
            var f = e;
            if (b.valueText) {
                var g = b.color;
                b.useMarkerColorForLabels && (g = a.color);
                !0 == a.hidden && (g = b.markerDisabledColor);
                var h = b.valueText, e = e + b.lx + b.markerLabelGap + b.valueWidth, i = "end";
                "left" == b.valueAlign && (e -= b.valueWidth, i = "start");
                g = Html5Map.text(b.container, h, g, b.chart.fontFamily, d, i);
                g.translate(e, b.ly);
                b.entries[b.index].push(g);
                f += b.valueWidth + 
                b.markerLabelGap;
                g.dItem = a;
                b.valueLabels.push(g)
            }
            b.index++;
            g = b.markerSize;
            g < d + 7 && (g = d + 7, Html5Map.VML && (g += 3));
            d = b.container.rect(b.markerSize + b.markerLabelGap, 0, f, g, 0, 0).attr({stroke: "none",fill: "#FFFFFF","fill-opacity": 0.005});
            d.dItem = a;
            b.entries[b.index - 1].push(d);
            d.mouseover(function() {
                b.rollOverLabel(a)
            }).mouseout(function() {
                b.rollOutLabel(a)
            }).click(function() {
                b.clickLabel(a)
            })
        }
    },createV: function() {
        var a = this.markerSize;
        return Html5Map.polygon(this.container, [a / 5, a / 2, a - a / 5, a / 2], [a / 3, a - a / 5, a / 
            5, a / 1.7], this.switchColor)
    },createX: function() {
        var a = this.markerSize - 3, b = {stroke: this.switchColor,"stroke-width": 3}, d = this.container, e = Html5Map.line(d, [3, a], [3, a]).attr(b), a = Html5Map.line(d, [3, a], [a, 3]).attr(b);
        return this.container.set([e, a])
    },createMarker: function(a, b, d) {
        var e = this.markerSize, f = this.container, g, h = this.markerBorderColor;
        h || (h = b);
        var i = this.markerBorderThickness, j = this.markerBorderAlpha;
        switch (a) {
            case "square":
                g = Html5Map.polygon(f, [0, e, e, 0], [0, 0, e, e], b, d, i, h, j);
                break;
            case "circle":
                g = 
                Html5Map.circle(f, e / 2, b, d, i, h, j);
                g.translate(e / 2, e / 2);
                break;
            case "line":
                g = Html5Map.line(f, [0, e], [e / 2, e / 2], b, d, i);
                break;
            case "dashedLine":
                g = Html5Map.line(f, [0, e], [e / 2, e / 2], b, d, i, 3);
                break;
            case "triangleUp":
                g = Html5Map.polygon(f, [0, e / 2, e, e], [e, 0, e, e], b, d, i, h, j);
                break;
            case "triangleDown":
                g = Html5Map.polygon(f, [0, e / 2, e, e], [0, e, 0, 0], b, d, i, h, j);
                break;
            case "bubble":
                g = Html5Map.circle(f, e / 2, b, d, i, h, j, !0), g.translate(e / 2, e / 2)
        }
        return g
    },validateNow: function() {
        this.invalidateSize()
    },updateValues: function() {
        for (var a = 
        this.valueLabels, b = this.chart, d = 0; d < a.length; d++) {
            var e = a[d], f = e.dItem;
            if (void 0 != f.type) {
                var g = f.currentDataItem;
                if (g) {
                    var h = this.valueText;
                    f.legendValueText && (h = f.legendValueText);
                    f = h;
                    f = b.formatString(f, g);
                    e.text(f)
                } else
                    e.text(" ")
            } else
                g = b.formatString(this.valueText, f), e.text(g)
        }
    },renderFix: function() {
        if (!Html5Map.VML) {
            var a = this.container;
            a && a.renderFix()
        }
    },destroy: function() {
        this.div.innerHTML = "";
        Html5Map.remove(this.set)
    }});
Html5Map.maps = {};
Html5Map.AmMap = Html5Map.Class({inherits: Html5Map.AmChart,construct: function() {
        this.version = "3.0.5";
        this.svgNotSupported = "This browser doesn't support SVG. Use Chrome, Firefox, Internet Explorer 9 or later.";
        this.createEvents("rollOverMapObject", "rollOutMapObject", "clickMapObject", "selectedObjectChanged", "homeButtonClicked", "zoomCompleted", "writeDevInfo");
        this.zoomDuration = 1;
        this.zoomControl = new Html5Map.ZoomControl;
        this.fitMapToContainer = !0;
        this.mouseWheelZoomEnabled = this.backgroundZoomsToTop = !1;
        this.useHandCursorOnClickableOjects = this.showBalloonOnSelectedObject = !0;
        this.showObjectsAfterZoom = this.wheelBusy = !1;
        this.zoomOnDoubleClick = this.useObjectColorForBalloon = !0;
        this.allowMultipleDescriptionWindows = !1;
        this.dragMap = this.centerMap = !0;
        this.colorSteps = 5;
        this.showAreasInList = !0;
        this.showLinesInList = this.showImagesInList = !1;
        this.areasProcessor = new Html5Map.AreasProcessor(this);
        this.areasSettings = new Html5Map.AreasSettings;
        this.imagesProcessor = new Html5Map.ImagesProcessor(this);
        this.imagesSettings = 
        new Html5Map.ImagesSettings;
        this.linesProcessor = new Html5Map.LinesProcessor(this);
        this.linesSettings = new Html5Map.LinesSettings;
        this.showDescriptionOnHover = !1;
        Html5Map.AmMap.base.construct.call(this);
        this.product = "ammap";
        Html5Map.bezierX = 3;
        Html5Map.bezierY = 3;
        Html5Map.dx = 0.5;
        Html5Map.dy = 0.5
    },initChart: function() {
        this.zoomInstantly = !0;
        if (this.sizeChanged && Html5Map.hasSVG && this.chartCreated) {
            this.container.setSize(this.realWidth, this.realHeight);
            this.resizeMap();
            this.drawBackground();
            this.redrawLabels();
            this.drawTitles();
            this.processObjects();
            this.rescaleObjects();
            var a = this.container;
            this.zoomControl.init(this, a);
            this.drawBg();
            var b = this.smallMap;
            b && b.init(this, a);
            (b = this.valueLegend) && b.init(this, a);
            this.sizeChanged = !1;
            this.zoomToLongLat(this.zLevelTemp, this.zLongTemp, this.zLatTemp, !0);
            this.previousWidth = this.realWidth;
            this.previousHeight = this.realHeight;
            this.drb();
            this.updateSmallMap();
            this.linkSet.toFront()
        } else if (Html5Map.AmMap.base.initChart.call(this), Html5Map.hasSVG) {
            if (this.dataChanged && 
            (this.parseData(), this.dispatchDataUpdated = !0, this.dataChanged = !1, a = this.legend))
                a.position = "absolute", a.invalidateSize();
            this.addMouseWheel();
            this.createDescriptionsDiv();
            this.svgAreas = [];
            this.svgAreasById = {};
            this.drawChart()
        } else
            document.createTextNode(this.svgNotSupported), this.chartDiv.style.textAlign = "", this.chartDiv.setAttribute("class", "ammapAlert"), this.chartDiv.innerHTML = this.svgNotSupported
    },invalidateSize: function() {
        var a = this.zoomLongitude();
        isNaN(a) || (this.zLongTemp = a);
        a = this.zoomLatitude();
        isNaN(a) || (this.zLatTemp = a);
        a = this.zoomLevel();
        isNaN(a) || (this.zLevelTemp = a);
        Html5Map.AmMap.base.invalidateSize.call(this)
    },addMouseWheel: function() {
        var a = this;
        a.mouseWheelZoomEnabled && (window.addEventListener && window.addEventListener("DOMMouseScroll", function(b) {
            a.handleWheel.call(a, b)
        }, !1), window.onmousewheel && (window.onmousewheel = document.onmousewheel = a.handleWheel.call(a)))
    },handleWheel: function(a) {
        if (this.mouseIsOver) {
            var b = 0;
            a || (a = window.event);
            a.wheelDelta ? b = a.wheelDelta / 120 : a.detail && (b = -a.detail / 
            3);
            b && this.handleWheelReal(b);
            a.preventDefault && a.preventDefault();
            a.returnValue = !1
        }
    },handleWheelReal: function(a) {
        if (!this.wheelBusy) {
            this.stopAnimation();
            var b = this.zoomLevel(), d = this.zoomControl, e = d.zoomFactor;
            this.wheelBusy = !0;
            a = Html5Map.fitToBounds(0 < a ? b * e : b / e, d.minZoomLevel, d.maxZoomLevel);
            e = this.mouseX / this.mapWidth;
            d = this.mouseY / this.mapHeight;
            e = (this.zoomX() - e) * (a / b) + e;
            b = (this.zoomY() - d) * (a / b) + d;
            this.zoomTo(a, e, b)
        }
    },addLegend: function(a) {
        a.position = "absolute";
        a.autoMargins = !1;
        a.valueWidth = 
        0;
        a.switchable = !1;
        Html5Map.AmMap.base.addLegend.call(this, a)
    },handleLegendEvent: function() {
    },createDescriptionsDiv: function() {
        var a = document.createElement("div");
        this.div.appendChild(a);
        this.descriptionsDiv = a
    },drawChart: function() {
        Html5Map.AmMap.base.drawChart.call(this);
        var a = this.dataProvider;
        Html5Map.extend(a, new Html5Map.MapData);
        Html5Map.extend(this.areasSettings, new Html5Map.AreasSettings);
        Html5Map.extend(this.imagesSettings, new Html5Map.ImagesSettings);
        Html5Map.extend(this.linesSettings, new Html5Map.LinesSettings);
        this.mapContainer = this.container.set();
        this.graphsSet.push(this.mapContainer);
        var b = a.mapVar;
        b ? (this.svgData = b.svg, this.getBounds(), this.buildEverything()) : (a = a.mapURL) && this.loadXml(a)
    },drawBg: function() {
        var a = this;
        Html5Map.remove(a.bgSet);
        var b = Html5Map.rect(a.container, a.realWidth, a.realHeight, "#000", 0.001);
        b.click(function() {
            a.handleBackgroundClick()
        });
        a.bgSet = b;
        a.set.push(b)
    },buildEverything: function() {
        var a = this;
        if (0 < a.realWidth && 0 < a.realHeight) {
            var b = a.container;
            a.zoomControl.init(this, b);
            a.drawBg();
            a.buildSVGMap();
            var d = a.smallMap;
            d && d.init(a, b);
            d = a.dataProvider;
            isNaN(d.zoomX) && (isNaN(d.zoomY) && isNaN(d.zoomLatitude) && isNaN(d.zoomLongitude)) && (a.centerMap ? (d.zoomLatitude = a.coordinateToLatitude(a.mapHeight / 2), d.zoomLongitude = a.coordinateToLongitude(a.mapWidth / 2)) : (d.zoomX = 0, d.zoomY = 0), a.zoomInstantly = !0);
            a.selectObject(a.dataProvider);
            a.processAreas();
            (d = a.valueLegend) && d.init(a, b);
            (b = a.objectList) && b.init(a);
            clearInterval(a.interval);
            a.interval = setInterval(function() {
                a.update.call(a)
            }, 
            Html5Map.updateRate);
            a.dispDUpd();
            a.linkSet.toFront();
            a.chartCreated = !0
        } else
            a.cleanChart()
    },hideGroup: function(a) {
        this.showHideGroup(a, !1)
    },showGroup: function(a) {
        this.showHideGroup(a, !0)
    },showHideGroup: function(a, b) {
        this.showHideReal(this.imagesProcessor.allObjects, a, b);
        this.showHideReal(this.areasProcessor.allObjects, a, b);
        this.showHideReal(this.linesProcessor.allObjects, a, b)
    },showHideReal: function(a, b, d) {
        for (var e = 0; e < a.length; e++) {
            var f = a[e];
            f.groupId == b && (d ? f.displayObject.show() : f.displayObject.hide())
        }
    },
    update: function() {
        this.zoomControl.update()
    },animateMap: function() {
        var a = this;
        a.totalFrames = 1E3 * a.zoomDuration / Html5Map.updateRate;
        a.totalFrames += 1;
        a.frame = 0;
        a.tweenPercent = 0;
        setTimeout(function() {
            a.updateSize.call(a)
        }, Html5Map.updateRate)
    },updateSize: function() {
        var a = this, b = a.totalFrames;
        a.frame <= b ? (a.frame++, b = a.container.easeOutSine(0, a.frame, 0, 1, b), 1 <= b ? (b = 1, a.wheelBusy = !1) : setTimeout(function() {
            a.updateSize.call(a)
        }, Html5Map.updateRate), a.tweenPercent = b, a.rescaleMapAndObjects()) : (b = 1, a.wheelBusy = 
        !1)
    },rescaleMapAndObjects: function() {
        var a = this.initialScale, b = this.initialX, d = this.initialY, e = this.tweenPercent;
        this.mapContainer.translate(b + (this.finalX - b) * e, d + (this.finalY - d) * e, a + (this.finalScale - a) * e);
        this.rescaleObjects();
        this.updateSmallMap();
        1 == e && (a = {type: "zoomCompleted",chart: this}, this.fire(a.type, a))
    },updateSmallMap: function() {
        this.smallMap && this.smallMap.update()
    },rescaleObjects: function() {
        var a = this.mapContainer.scale, b = this.imagesProcessor.objectsToResize, d;
        for (d = 0; d < b.length; d++) {
            var e = 
            b[d].image;
            e.translate(e.x, e.y, b[d].scale / a)
        }
        b = this.linesProcessor;
        if (e = b.linesToResize)
            for (d = 0; d < e.length; d++) {
                var f = e[d];
                f.line.setAttr("stroke-width", f.thickness / a)
            }
        b = b.objectsToResize;
        for (d = 0; d < b.length; d++)
            e = b[d], e.translate(e.x, e.y, 1 / a)
    },handleTouchStart: function(a) {
        this.handleMouseMove(a);
        this.handleMouseDown(a)
    },handleTouchEnd: function(a) {
        this.previousDistance = NaN;
        this.handleReleaseOutside(a)
    },handleMouseDown: function(a) {
        if (this.chartCreated && this.mouseIsOver && (Html5Map.resetMouseOver(), this.mouseIsOver = 
        !0, this.dragMap && (this.stopAnimation(), this.isDragging = !0, this.mapContainerClickX = this.mapContainer.x, this.mapContainerClickY = this.mapContainer.y, this.panEventsEnabled || a && a.preventDefault && a.preventDefault()), a || (a = window.event), a.shiftKey && !0 == this.developerMode && this.getDevInfo(), a && a.touches)) {
            var b = this.mouseX, d = this.mouseY, e = a.touches.item(1);
            e && (a = e.pageX - Html5Map.findPosX(this.div), e = e.pageY - Html5Map.findPosY(this.div), this.middleXP = (b + (a - b) / 2) / this.realWidth, this.middleYP = (d + (e - d) / 2) / this.realHeight)
        }
    },
    stopDrag: function() {
        this.isDragging = !1
    },handleReleaseOutside: function() {
        this.isDragging = !1;
        this.zoomControl.draggerUp();
        this.mapWasDragged = !1;
        var a = this.mapContainer, b = this.mapContainerClickX, d = this.mapContainerClickY;
        if (!isNaN(b) && !isNaN(d) && (2 < Math.abs(a.x - b) || Math.abs(a.y - d)))
            this.mapWasDragged = !0;
        this.mapContainerClickY = this.mapContainerClickX = NaN;
        this.objectWasClicked = !1;
        this.zoomOnDoubleClick && this.mouseIsOver && (a = (new Date).getTime(), 200 > a - this.previousClickTime && 20 < a - this.previousClickTime && 
        this.doDoubleClickZoom(), this.previousClickTime = a)
    },handleTouchMove: function(a) {
        this.handleMouseMove(a)
    },resetPinch: function() {
        this.mapWasPinched = !1
    },handleMouseMove: function(a) {
        var b = this;
        Html5Map.AmMap.base.handleMouseMove.call(b, a);
        var d = b.previuosMouseX, e = b.previuosMouseY, f = b.mouseX, g = b.mouseY;
        isNaN(d) && (d = f);
        isNaN(e) && (e = g);
        b.mouse2X = NaN;
        b.mouse2Y = NaN;
        if (a && a.touches) {
            var h = a.touches.item(1);
            h && (b.mouse2X = h.pageX - Html5Map.findPosX(b.div), b.mouse2Y = h.pageY - Html5Map.findPosY(b.div))
        }
        var h = b.mapContainer, 
        i = b.mouse2X, j = b.mouse2Y;
        b.pinchTO && clearTimeout(b.pinchTO);
        b.pinchTO = setTimeout(function() {
            b.resetPinch.call(b)
        }, 1E3);
        if (!isNaN(i)) {
            b.isDragging = !1;
            a.preventDefault && a.preventDefault();
            var i = Math.sqrt(Math.pow(i - f, 2) + Math.pow(j - g, 2)), l = b.previousDistance, j = Math.max(b.realWidth, b.realHeight);
            5 > Math.abs(l - i) && (b.isDragging = !0);
            if (!isNaN(l)) {
                var k = 5 * Math.abs(l - i) / j, j = h.scale, j = l < i ? j + j * k : j - j * k, l = b.zoomLevel(), m = b.middleXP, k = b.middleYP, t = b.realHeight / b.mapHeight, v = b.realWidth / b.mapWidth, m = (b.zoomX() - m * 
                v) * (j / l) + m * v, k = (b.zoomY() - k * t) * (j / l) + k * t;
                0.1 < Math.abs(j - l) && (b.zoomTo(j, m, k, !0), b.mapWasPinched = !0, clearTimeout(b.pinchTO))
            }
            b.previousDistance = i
        }
        b.isDragging && (b.hideBalloon(), h.translate(h.x + (f - d), h.y + (g - e), h.scale), b.updateSmallMap(), a && a.preventDefault && a.preventDefault());
        b.previuosMouseX = f;
        b.previuosMouseY = g
    },selectObject: function(a) {
        var b = this;
        a || (a = b.dataProvider);
        var d = a.linkToObject;
        a.useTargetsZoomValues && d && (a.zoomX = d.zoomX, a.zoomY = d.zoomY, a.zoomLatitude = d.zoomLatitude, a.zoomLongitude = 
        d.zoomLongitude, a.zoomLevel = d.zoomLevel);
        var e = b.selectedObject;
        e && b.returnInitialColor(e);
        b.selectedObject = a;
        var f = !1;
        "MapArea" == a.objectType && a.autoZoomReal && (f = !0);
        if (d && !f && ("string" == typeof d && (d = b.getObjectById(d)), isNaN(a.zoomLevel) && isNaN(a.zoomX) && isNaN(a.zoomY))) {
            if (b.extendMapData(d))
                return;
            b.selectObject(d);
            return
        }
        b.allowMultipleDescriptionWindows || b.closeAllDescriptions();
        clearTimeout(b.selectedObjectTimeOut);
        clearTimeout(b.processObjectsTimeOut);
        d = b.zoomDuration;
        f || !isNaN(a.zoomLevel) || 
        !isNaN(a.zoomX) || !isNaN(a.zoomY) ? (b.selectedObjectTimeOut = setTimeout(function() {
            b.showDescriptionAndGetUrl.call(b)
        }, 1E3 * d + 200), b.showObjectsAfterZoom ? b.processObjectsTimeOut = setTimeout(function() {
            b.processObjects.call(b)
        }, 1E3 * d + 200) : b.processObjects()) : (b.showDescriptionAndGetUrl(), b.processObjects());
        (f = a.displayObject) ? (f.setAttr("stroke", a.outlineColorReal), d = a.selectedColorReal, void 0 != d && f.setAttr("fill", d), a.selectable || (f.setAttr("cursor", "default"), (f = a.imageLabel) && f.setAttr("cursor", "default"))) : 
        b.returnInitialColorReal(a);
        if (f = a.groupId)
            for (var d = b.getGroupById(f), g = 0; g < d.length; g++) {
                var h = d[g];
                if (f = h.displayObject) {
                    var i = h.selectedColorReal;
                    void 0 != i ? f.setAttr("fill", i) : b.returnInitialColor(h)
                }
            }
        b.zoomToSelectedObject();
        e != a && (a = {type: "selectedObjectChanged",chart: b}, b.fire(a.type, a))
    },returnInitialColor: function(a, b) {
        this.returnInitialColorReal(a);
        b && (a.isFirst = !1);
        var d = a.groupId;
        if (d)
            for (var d = this.getGroupById(d), e = 0; e < d.length; e++)
                this.returnInitialColorReal(d[e]), b && (d[e].isFirst = 
                !1)
    },closeAllDescriptions: function() {
        this.descriptionsDiv.innerHTML = ""
    },returnInitialColorReal: function(a) {
        a.isOver = !1;
        var b = a.displayObject;
        if (b) {
            if ("MapImage" == a.objectType) {
                var d = a.tempScale;
                isNaN(d) || b.translate(b.x, b.y, d)
            }
            d = a.colorReal;
            a.showAsSelected && (d = a.selectedColorReal);
            "bubble" == a.type && (d = void 0);
            void 0 != d && b.setAttr("fill", d);
            var e = a.image;
            e && e.setAttr("fill", d);
            b.setAttr("stroke", a.outlineColorReal);
            (b = a.imageLabel) && !a.labelInactive && b.setAttr("fill", a.labelColorReal)
        }
    },zoomToRectangle: function(a, 
    b, d, e) {
        var f = this.realWidth, g = this.realHeight, h = this.mapSet.scale, i = this.zoomControl, f = Html5Map.fitToBounds(d / f > e / g ? 0.8 * f / (d * h) : 0.8 * g / (e * h), i.minZoomLevel, i.maxZoomLevel);
        this.zoomToMapXY(f, (a + d / 2) * h, (b + e / 2) * h)
    },zoomToLatLongRectangle: function(a, b, d, e) {
        var f = this.dataProvider, g = this.zoomControl, h = Math.abs(d - a), i = Math.abs(b - e), j = Math.abs(f.rightLongitude - f.leftLongitude), f = Math.abs(f.topLatitude - f.bottomLatitude), g = Html5Map.fitToBounds(h / j > i / f ? 0.8 * j / h : 0.8 * f / i, g.minZoomLevel, g.maxZoomLevel);
        this.zoomToLongLat(g, 
        a + (d - a) / 2, e + (b - e) / 2)
    },getGroupById: function(a) {
        var b = [];
        this.getGroup(this.imagesProcessor.allObjects, a, b);
        this.getGroup(this.linesProcessor.allObjects, a, b);
        this.getGroup(this.areasProcessor.allObjects, a, b);
        return b
    },zoomToGroup: function(a) {
        for (var a = this.getGroupById(a), b, d, e, f, g = 0; g < a.length; g++) {
            var h = a[g].displayObject.getBBox(), i = h.y, j = h.y + h.height, l = h.x, h = h.x + h.width;
            if (i < b || isNaN(b))
                b = i;
            if (j > f || isNaN(f))
                f = j;
            if (l < d || isNaN(d))
                d = l;
            if (h > e || isNaN(e))
                e = h
        }
        a = this.mapSet.getBBox();
        d -= a.x;
        e -= a.x;
        f -= 
        a.y;
        b -= a.y;
        this.zoomToRectangle(d, b, e - d, f - b)
    },getGroup: function(a, b, d) {
        if (a)
            for (var e = 0; e < a.length; e++) {
                var f = a[e];
                f.groupId == b && d.push(f)
            }
    },zoomToStageXY: function(a, b, d, e) {
        if (!this.objectWasClicked) {
            var f = this.zoomLevel(), d = this.coordinateToLatitude((d - this.mapContainer.y) / f), b = this.coordinateToLongitude((b - this.mapContainer.x) / f);
            this.zoomToLongLat(a, b, d, e)
        }
    },zoomToLongLat: function(a, b, d, e) {
        b = this.longitudeToCoordinate(b);
        d = this.latitudeToCoordinate(d);
        this.zoomToMapXY(a, b, d, e)
    },zoomToMapXY: function(a, 
    b, d, e) {
        var f = this.mapWidth, g = this.mapHeight;
        this.zoomTo(a, -(b / f) * a + this.realWidth / f / 2, -(d / g) * a + this.realHeight / g / 2, e)
    },zoomToSelectedObject: function() {
        var a = this.selectedObject, b = a.zoomLatitude, d = a.zoomLongitude, e = a.zoomLevel, f = this.zoomInstantly, g = a.zoomX, h = a.zoomY, i = this.realWidth, j = this.realHeight;
        isNaN(e) || (!isNaN(b) && !isNaN(d) ? this.zoomToLongLat(e, d, b, f) : this.zoomTo(e, g, h, f));
        this.zoomInstantly = !1;
        "MapImage" == a.objectType && isNaN(a.zoomX) && (isNaN(a.zoomY) && isNaN(a.zoomLatitude) && isNaN(a.zoomLongitude) && 
        !isNaN(a.latitude) && !isNaN(a.longitude)) && this.zoomToLongLat(a.zoomLevel, a.longitude, a.latitude);
        "MapArea" == a.objectType && (g = a.displayObject.getBBox(), b = this.mapScale, d = g.x * b, e = g.y * b, f = g.width * b, g = g.height * b, i = a.autoZoomReal && isNaN(a.zoomLevel) ? f / i > g / j ? 0.8 * i / f : 0.8 * j / g : a.zoomLevel, j = this.zoomControl, i = Html5Map.fitToBounds(i, j.minZoomLevel, j.maxZoomLevel), isNaN(a.zoomX) && (isNaN(a.zoomY) && isNaN(a.zoomLatitude) && isNaN(a.zoomLongitude)) && (a = this.mapSet.getBBox(), this.zoomToMapXY(i, -a.x * b + d + f / 2, -a.y * b + 
        e + g / 2)))
    },zoomTo: function(a, b, d, e) {
        var f = this.zoomControl, a = Html5Map.fitToBounds(a, f.minZoomLevel, f.maxZoomLevel), f = this.zoomLevel();
        isNaN(b) && (b = this.realWidth / this.mapWidth, b = (this.zoomX() - 0.5 * b) * (a / f) + 0.5 * b);
        isNaN(d) && (d = this.realHeight / this.mapHeight, d = (this.zoomY() - 0.5 * d) * (a / f) + 0.5 * d);
        this.stopAnimation();
        isNaN(a) || (f = this.mapContainer, this.initialX = f.x, this.initialY = f.y, this.initialScale = f.scale, this.finalX = this.mapWidth * b, this.finalY = this.mapHeight * d, this.finalScale = a, this.finalX != this.initialX || 
        this.finalY != this.initialY || this.finalScale != this.initialScale ? e ? (this.tweenPercent = 1, this.rescaleMapAndObjects(), this.wheelBusy = !1) : this.animateMap() : this.wheelBusy = !1)
    },loadXml: function(a) {
        var b;
        b = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
        b.overrideMimeType && b.overrideMimeType("text/xml");
        b.open("GET", a, !1);
        b.send();
        this.parseXMLObject(b.responseXML);
        this.svgData && this.buildEverything()
    },stopAnimation: function() {
        this.frame = this.totalFrames
    },processObjects: function() {
        var a = 
        this.container, b = this.stageObjectsContainer;
        b && b.remove();
        this.stageObjectsContainer = b = a.set();
        this.trendLinesSet.push(b);
        var d = this.mapObjectsContainer;
        d && d.remove();
        this.mapObjectsContainer = d = a.set();
        this.mapContainer.push(d);
        d.toFront();
        b.toFront();
        if (a = this.selectedObject)
            this.imagesProcessor.reset(), this.linesProcessor.reset(), this.imagesProcessor.process(a), this.linesProcessor.process(a);
        this.rescaleObjects()
    },processAreas: function() {
        this.areasProcessor.process(this.dataProvider)
    },buildSVGMap: function() {
        var a = 
        this.svgData.g.path, b = this.container, d = b.set();
        void 0 == a.length && (a = [a]);
        for (var e = 0; e < a.length; e++) {
            var f = a[e], g = f.title, h = b.path(f.d);
            h.id = f.id;
            this.svgAreasById[f.id] = {area: h,title: g};
            this.svgAreas.push(h);
            d.push(h)
        }
        this.mapSet = d;
        this.mapContainer.push(d);
        this.resizeMap()
    },addObjectEventListeners: function(a, b) {
        var d = this;
        a.mouseup(function() {
            d.clickMapObject(b)
        }).mouseover(function() {
            d.rollOverMapObject(b)
        }).mouseout(function() {
            d.rollOutMapObject(b)
        }).touchend(function() {
            d.clickMapObject(b)
        }).touchstart(function() {
            d.rollOverMapObject(b)
        })
    },
    checkIfSelected: function(a) {
        var b = this.selectedObject;
        if (b == a)
            return !0;
        if (b = b.groupId)
            for (var b = this.getGroupById(b), d = 0; d < b.length; d++)
                if (b[d] == a)
                    return !0;
        return !1
    },clearMap: function() {
        this.chartDiv.innerHTML = "";
        var a = this.objectList;
        a && (a.div.innerHTML = "")
    },checkIfLast: function(a) {
        if (a) {
            var b = a.parentNode;
            if (b && b.lastChild == a)
                return !0
        }
        return !1
    },showAsRolledOver: function(a) {
        var b = a.displayObject;
        if (!a.showAsSelected && b && !a.isOver) {
            b.node.onmouseout = function() {
            };
            b.node.onmouseover = function() {
            };
            b.node.onclick = 
            function() {
            };
            a.isFirst || (b.toFront(), a.isFirst = !0);
            var d = a.rollOverColorReal;
            if (void 0 != d)
                if ("MapImage" == a.objectType) {
                    var e = a.image;
                    e && e.setAttr("fill", d)
                } else
                    b.setAttr("fill", d);
            if ((e = a.imageLabel) && !a.labelInactive)
                d = a.labelRollOverColorReal, void 0 != d && e.setAttr("fill", d);
            d = a.rollOverOutlineColorReal;
            void 0 != d && ("MapImage" == a.objectType ? (e = a.image) && e.setAttr("stroke", d) : b.setAttr("stroke", d));
            "MapImage" == a.objectType && (e = a.rollOverScaleReal, isNaN(e) || (a.tempScale = b.scale, b.translate(b.x, b.y, 
            b.scale * e)));
            this.useHandCursorOnClickableOjects && (this.checkIfClickable(a) && this.selectedObject != a) && b.setAttr("cursor", "pointer");
            this.addObjectEventListeners(b, a);
            a.isOver = !0
        }
    },rollOverMapObject: function(a, b) {
        if (this.chartCreated) {
            this.handleMouseMove();
            var d = this.previouslyHovered;
            d && d != a && !1 == this.checkIfSelected(d) && (this.returnInitialColor(d, !0), this.previouslyHovered = null);
            if (!1 == this.checkIfSelected(a)) {
                if (d = a.groupId)
                    for (var d = this.getGroupById(d), e = 0; e < d.length; e++)
                        d[e] != a && this.showAsRolledOver(d[e]);
                this.showAsRolledOver(a)
            } else
                (d = a.displayObject) && d.setAttr("cursor", "default");
            if (this.showDescriptionOnHover)
                this.showDescription(a);
            else if ((this.showBalloonOnSelectedObject || !this.checkIfSelected(a)) && !1 !== b)
                if (e = a.balloonTextReal)
                    if (d = this.balloon, (e = this.formatString(e, a)) && "" != e) {
                        var f = a.colorReal;
                        void 0 != f && this.useObjectColorForBalloon || (f = d.fillColor);
                        clearTimeout(this.hoverInt);
                        this.showBalloon(e, f, !0)
                    }
            d = {type: "rollOverMapObject",mapObject: a,chart: this};
            this.fire(d.type, d);
            this.previouslyHovered = 
            a
        }
    },rollOutMapObject: function(a) {
        this.hideBalloon();
        this.chartCreated && a.isOver && (this.checkIfSelected(a) || this.returnInitialColor(a), a = {type: "rollOutMapObject",mapObject: a,chart: this}, this.fire(a.type, a))
    },formatString: function(a, b) {
        var d = this.numberFormatter, e = this.percentFormatter, f = b.title;
        void 0 == f && (f = "");
        var g = b.value, g = isNaN(g) ? "" : Html5Map.formatNumber(g, d), d = b.percents, d = isNaN(d) ? "" : Html5Map.formatNumber(d, e), e = b.description;
        void 0 == e && (e = "");
        var h = b.customData;
        void 0 == h && (h = "");
        return a = 
        Html5Map.massReplace(a, {"[[title]]": f,"[[value]]": g,"[[percent]]": d,"[[description]]": e,"[[customData]]": h})
    },clickMapObject: function(a) {
        this.hideBalloon();
        this.chartCreated && (!this.mapWasDragged && this.checkIfClickable(a) && !this.mapWasPinched) && (this.selectObject(a), a = {type: "clickMapObject",mapObject: a,chart: this}, this.fire(a.type, a), this.objectWasClicked = !0)
    },checkIfClickable: function(a) {
        return !0 == a.selectable ? !0 : this.selectedObject == a ? !1 : "MapArea" == a.objectType && a.autoZoomReal || null != a.url || null != 
        a.linkToObject || (0 < a.images.length || 0 < a.lines.length) || (!isNaN(a.zoomLevel) || !isNaN(a.zoomX) || !isNaN(a.zoomY)) || a.description ? !0 : !1
    },resizeMap: function() {
        var a = this.mapSet;
        if (a)
            if (this.fitMapToContainer) {
                var b = a.getBBox(), d = this.realWidth, e = this.realHeight, f = b.width, g = b.height, d = f / d > g / e ? d / f : e / g;
                a.translate(-b.x * d, -b.y * d, d);
                this.mapScale = d;
                this.mapHeight = g * d;
                this.mapWidth = f * d
            } else
                b = group.transform.match(/([\-]?[\d.]+)/g), a.translate(b[0], b[1], b[2])
    },zoomIn: function() {
        var a = this.zoomLevel() * this.zoomControl.zoomFactor;
        this.zoomTo(a)
    },zoomOut: function() {
        var a = this.zoomLevel() / this.zoomControl.zoomFactor;
        this.zoomTo(a)
    },moveLeft: function() {
        var a = this.zoomX() + this.zoomControl.panStepSize;
        this.zoomTo(this.zoomLevel(), a, this.zoomY())
    },moveRight: function() {
        var a = this.zoomX() - this.zoomControl.panStepSize;
        this.zoomTo(this.zoomLevel(), a, this.zoomY())
    },moveUp: function() {
        var a = this.zoomY() + this.zoomControl.panStepSize;
        this.zoomTo(this.zoomLevel(), this.zoomX(), a)
    },moveDown: function() {
        var a = this.zoomY() - this.zoomControl.panStepSize;
        this.zoomTo(this.zoomLevel(), this.zoomX(), a)
    },zoomX: function() {
        return this.mapSet ? Math.round(1E4 * this.mapContainer.x / this.mapWidth) / 1E4 : NaN
    },zoomY: function() {
        return this.mapSet ? Math.round(1E4 * this.mapContainer.y / this.mapHeight) / 1E4 : NaN
    },goHome: function() {
        this.selectObject(this.dataProvider);
        var a = {type: "homeButtonClicked",chart: this};
        this.fire(a.type, a)
    },zoomLevel: function() {
        return Math.round(1E5 * this.mapContainer.scale) / 1E5
    },showDescriptionAndGetUrl: function() {
        var a = this.selectedObject;
        if (a) {
            this.showDescription();
            var b = a.url;
            if (null != b)
                Html5Map.getURL(b, a.urlTarget);
            else if (b = a.linkToObject) {
                if ("string" == typeof b) {
                    var d = this.getObjectById(b);
                    if (d) {
                        this.selectObject(d);
                        return
                    }
                }
                b && a.passZoomValuesToTarget && (b.zoomLatitude = this.zoomLatitude(), b.zoomLongitude = this.zoomLongitude(), b.zoomLevel = this.zoomLevel());
                this.extendMapData(b) || this.selectObject(b)
            }
        }
    },extendMapData: function(a) {
        var b = a.objectType;
        if ("MapImage" != b && "MapArea" != b && "MapLine" != b)
            return Html5Map.extend(a, new Html5Map.MapData), this.dataProvider = a, 
            this.zoomInstantly = !0, this.validateData(), !0
    },showDescription: function(a) {
        a || (a = this.selectedObject);
        this.allowMultipleDescriptionWindows || this.closeAllDescriptions();
        if (a.description) {
            var b = a.descriptionWindow;
            b && b.close();
            b = new Html5Map.DescriptionWindow;
            a.descriptionWindow = b;
            var d = a.descriptionWindowWidth, e = a.descriptionWindowHeight, f = a.descriptionWindowX, g = a.descriptionWindowY;
            isNaN(f) && (f = this.mouseX, f = f > this.realWidth / 2 ? f - d - 20 : f + 20);
            isNaN(g) && (g = this.mouseY);
            b.maxHeight = e;
            b.show(this, this.descriptionsDiv, 
            a.description, a.title);
            a = b.div.style;
            a.width = d + "px";
            a.maxHeight = e + "px";
            a.left = f + "px";
            a.top = g + "px"
        }
    },parseXMLObject: function(a) {
        var b = {root: {}};
        this.parseXMLNode(b, "root", a);
        this.svgData = b.root.svg;
        this.getBounds()
    },getBounds: function() {
        var a = this.dataProvider;
        try {
            var b = this.svgData.defs["amcharts:ammap"];
            a.leftLongitude = Number(b.leftLongitude);
            a.rightLongitude = Number(b.rightLongitude);
            a.topLatitude = Number(b.topLatitude);
            a.bottomLatitude = Number(b.bottomLatitude);
            a.projection = b.projection
        } catch (d) {
        }
    },
    latitudeToCoordinate: function(a) {
        var b, d = this.dataProvider;
        if (this.mapSet) {
            b = d.topLatitude;
            var e = d.bottomLatitude;
            "mercator" == d.projection && (a = this.mercatorLatitudeToCoordinate(a), b = this.mercatorLatitudeToCoordinate(b), e = this.mercatorLatitudeToCoordinate(e));
            b = (a - b) / (e - b) * this.mapHeight
        }
        return b
    },longitudeToCoordinate: function(a) {
        var b, d = this.dataProvider;
        this.mapSet && (b = d.leftLongitude, b = (a - b) / (d.rightLongitude - b) * this.mapWidth);
        return b
    },mercatorLatitudeToCoordinate: function(a) {
        89.5 < a && (a = 89.5);
        -89.5 > a && (a = -89.5);
        a = Html5Map.degreesToRadians(a);
        a = 0.5 * Math.log((1 + Math.sin(a)) / (1 - Math.sin(a)));
        return Html5Map.radiansToDegrees(a / 2)
    },zoomLatitude: function() {
        return this.coordinateToLatitude((-this.mapContainer.y + this.previousHeight / 2) / this.zoomLevel())
    },zoomLongitude: function() {
        return this.coordinateToLongitude((-this.mapContainer.x + this.previousWidth / 2) / this.zoomLevel())
    },getAreaCenterLatitude: function(a) {
        var a = a.displayObject.getBBox(), b = this.mapScale, a = -this.mapSet.getBBox().y * b + (a.y + a.height / 
        2) * b;
        return this.coordinateToLatitude(a)
    },getAreaCenterLongitude: function(a) {
        var a = a.displayObject.getBBox(), b = this.mapScale, a = -this.mapSet.getBBox().x * b + (a.x + a.width / 2) * b;
        return this.coordinateToLongitude(a)
    },coordinateToLatitude: function(a) {
        var b;
        if (this.mapSet) {
            var d = this.dataProvider, e = d.bottomLatitude, f = d.topLatitude;
            b = this.mapHeight;
            "mercator" == d.projection ? (d = this.mercatorLatitudeToCoordinate(e), f = this.mercatorLatitudeToCoordinate(f), a = 2 * Math.atan(Math.exp(2 * (a * (d - f) / b + f) * Math.PI / 180)) - 0.5 * 
            Math.PI, b = Html5Map.radiansToDegrees(a)) : b = a / b * (e - f) + f
        }
        return Math.round(1E6 * b) / 1E6
    },coordinateToLongitude: function(a) {
        var b, d = this.dataProvider;
        this.mapSet && (b = a / this.mapWidth * (d.rightLongitude - d.leftLongitude) + d.leftLongitude);
        return Math.round(1E6 * b) / 1E6
    },milesToPixels: function(a) {
        var b = this.dataProvider;
        return a * (this.mapWidth / (b.rightLongitude - b.leftLongitude)) / 69.172
    },kilometersToPixels: function(a) {
        var b = this.dataProvider;
        return a * (this.mapWidth / (b.rightLongitude - b.leftLongitude)) / 111.325
    },handleBackgroundClick: function() {
        if (this.backgroundZoomsToTop && 
        !this.mapWasDragged) {
            var a = this.dataProvider;
            if (this.checkIfClickable(a))
                this.clickMapObject(a);
            else {
                var b = a.zoomX, d = a.zoomY, e = a.zoomLongitude, f = a.zoomLatitude, a = a.zoomLevel;
                !isNaN(b) && !isNaN(d) && this.zoomTo(a, b, d);
                !isNaN(e) && !isNaN(f) && this.zoomToLongLat(a, e, f, !0)
            }
        }
    },parseXMLNode: function(a, b, d, e) {
        void 0 == e && (e = "");
        if (d) {
            for (var f = d.childNodes.length, g = 0; g < f; g++) {
                var h = d.childNodes[g], i = h.nodeName, j = h.nodeValue ? this.trim(h.nodeValue) : "", l = !1;
                h.attributes && 0 < h.attributes.length && (l = !0);
                if (!(0 == h.childNodes.length && 
                "" == j && !1 == l))
                    if (3 == h.nodeType || 4 == h.nodeType) {
                        if ("" != j) {
                            var h = 0, k;
                            for (k in a[b])
                                h++;
                            h ? a[b]["#text"] = j : a[b] = j
                        }
                    } else if (1 == h.nodeType) {
                        var m;
                        void 0 != a[b][i] ? void 0 == a[b][i].length ? (m = a[b][i], a[b][i] = [], a[b][i].push(m), a[b][i].push({}), m = a[b][i][1]) : "object" == typeof a[b][i] && (a[b][i].push({}), m = a[b][i][a[b][i].length - 1]) : (a[b][i] = {}, m = a[b][i]);
                        if (h.attributes && h.attributes.length)
                            for (j = 0; j < h.attributes.length; j++)
                                m[h.attributes[j].name] = h.attributes[j].value;
                        void 0 != a[b][i].length ? this.parseXMLNode(a[b][i], 
                        a[b][i].length - 1, h, e + "  ") : this.parseXMLNode(a[b], i, h, e + "  ")
                    }
            }
            h = 0;
            d = "";
            for (k in a[b])
                "#text" == k ? d = a[b][k] : h++;
            0 == h && void 0 == a[b].length && (a[b] = d)
        }
    },doDoubleClickZoom: function() {
        if (!this.mapWasDragged) {
            var a = this.zoomLevel() * this.zoomControl.zoomFactor;
            this.zoomToStageXY(a, this.mouseX, this.mouseY)
        }
    },getDevInfo: function() {
        var a = this.zoomLevel(), a = {chart: this,type: "writeDevInfo",zoomLevel: a,zoomX: this.zoomX(),zoomY: this.zoomY(),zoomLatitude: this.zoomLatitude(),zoomLongitude: this.zoomLongitude(),latitude: this.coordinateToLatitude((this.mouseY - 
            this.mapContainer.y) / a),longitude: this.coordinateToLongitude((this.mouseX - this.mapContainer.x) / a),left: this.mouseX,top: this.mouseY,right: this.realWidth - this.mouseX,bottom: this.realHeight - this.mouseY,percentLeft: Math.round(100 * (this.mouseX / this.realWidth)) + "%",percentTop: Math.round(100 * (this.mouseY / this.realHeight)) + "%",percentRight: Math.round(100 * ((this.realWidth - this.mouseX) / this.realWidth)) + "%",percentBottom: Math.round(100 * ((this.realHeight - this.mouseY) / this.realHeight)) + "%"}, b = "zoomLevel:" + a.zoomLevel + 
        ", zoomLongitude:" + a.zoomLongitude + ", zoomLatitude:" + a.zoomLatitude + "\n", b = b + ("zoomX:" + a.zoomX + ", zoomY:" + a.zoomY + "\n"), b = b + ("latitude:" + a.latitude + ", longitude:" + a.longitude + "\n"), b = b + ("left:" + a.left + ", top:" + a.top + "\n"), b = b + ("right:" + a.right + ", bottom:" + a.bottom + "\n"), b = b + ('left:"' + a.percentLeft + '", top:"' + a.percentTop + '"\n'), b = b + ('right:"' + a.percentRight + '", bottom:"' + a.percentBottom + '"\n');
        a.str = b;
        this.fire(a.type, a)
    },getXY: function(a, b, d) {
        void 0 != a && (-1 != String(a).indexOf("%") ? (a = Number(a.split("%").join("")), 
        d && (a = 100 - a), a = Number(a) * b / 100) : d && (a = b - a));
        return a
    },getObjectById: function(a) {
        var b = this.dataProvider;
        if (b.areas) {
            var d = this.getObject(a, b.areas);
            if (d)
                return d
        }
        if (d = this.getObject(a, b.images))
            return d;
        if (a = this.getObject(a, b.lines))
            return a
    },getObject: function(a, b) {
        if (b)
            for (var d = 0; d < b.length; d++) {
                var e = b[d];
                if (e.id == a)
                    return e;
                if (e.areas) {
                    var f = this.getObject(a, e.areas);
                    if (f)
                        return f
                }
                if (f = this.getObject(a, e.images))
                    return f;
                if (e = this.getObject(a, e.lines))
                    return e
            }
    },parseData: function() {
        var a = this.dataProvider;
        this.processObject(a.areas, a, "area");
        this.processObject(a.images, a, "image");
        this.processObject(a.lines, a, "line")
    },processObject: function(a, b, d) {
        if (a)
            for (var e = 0; e < a.length; e++) {
                var f = a[e];
                f.parentObject = b;
                "area" == d && Html5Map.extend(f, new Html5Map.MapArea);
                "image" == d && Html5Map.extend(f, new Html5Map.MapImage);
                "line" == d && Html5Map.extend(f, new Html5Map.MapLine);
                f.areas && this.processObject(f.areas, f, "area");
                f.images && this.processObject(f.images, f, "image");
                f.lines && this.processObject(f.lines, f, "line")
            }
    },
    getX: function(a, b) {
        return this.getXY(a, this.realWidth, b)
    },getY: function(a, b) {
        return this.getXY(a, this.realHeight, b)
    },trim: function(a) {
        if (a) {
            for (var b = 0; b < a.length; b++)
                if (-1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(b))) {
                    a = a.substring(b);
                    break
                }
            for (b = a.length - 1; 0 <= b; b--)
                if (-1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(b))) {
                    a = 
                    a.substring(0, b + 1);
                    break
                }
            return -1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(0)) ? a : ""
        }
    },drb: function() {
        var a = this.product, b = a + ".com", d = window.location.hostname.split(".");
        if (2 <= d.length)
            var e = d[d.length - 2] + "." + d[d.length - 1];
        Html5Map.remove(this.bbset);
    }});
Html5Map.ZoomControl = Html5Map.Class({construct: function() {
        this.panStepSize = 0.1;
        this.zoomFactor = 2;
        this.maxZoomLevel = 64;
        this.minZoomLevel = 1;
        this.zoomControlEnabled = this.panControlEnabled = 0;
        this.buttonRollOverColor = "#CC0000";
        this.buttonFillColor = "#990000";
        this.buttonFillAlpha = 1;
        this.buttonBorderColor = "#FFFFFF";
        this.buttonBorderThickness = this.buttonBorderAlpha = 1;
        this.buttonIconColor = "#FFFFFF";
        this.buttonColorHover = "#FF0000";
        this.gridColor = this.homeIconColor = "#FFFFFF";
        this.gridBackgroundColor = "#000000";
        this.gridBackgroundAlpha = 0.15;
        this.gridAlpha = 1;
        this.buttonSize = 18;
        this.iconSize = 11;
        this.buttonCornerRadius = 0;
        this.gridHeight = 150;
        this.top = this.left = 10
    },init: function(a, b) {
        var d = this;
        d.chart = a;
        Html5Map.remove(d.set);
        var e = b.set();
        e.translate(a.getX(d.left), a.getY(d.top));
        var f = d.buttonSize, g = d.buttonFillColor, h = d.buttonFillAlpha, i = d.buttonBorderThickness, j = d.buttonBorderColor, l = d.buttonBorderAlpha, k = d.buttonCornerRadius, m = d.buttonRollOverColor, t = d.gridHeight, v = d.zoomFactor, q = d.minZoomLevel, p = d.maxZoomLevel;
        if (d.zoomControlEnabled) {
            var r = b.set();
            e.push(r);
            d.set = e;
            d.zoomSet = r;
            var w = Html5Map.rect(b, f + 6, t + 2 * f + 6, d.gridBackgroundColor, d.gridBackgroundAlpha, 0, 0, 0, 4);
            w.translate(-3, -3);
            w.mouseup(function() {
                d.handleBgUp()
            });
            r.push(w);
            w = new Html5Map.SimpleButton;
            w.setIcon(a.pathToImages + "plus.gif", d.iconSize);
            w.setClickHandler(a.zoomIn, a);
            w.init(b, f, f, g, h, i, j, l, k, m);
            r.push(w.set);
            w = new Html5Map.SimpleButton;
            w.setIcon(a.pathToImages + "minus.gif", d.iconSize);
            w.setClickHandler(a.zoomOut, a);
            w.init(b, f, f, g, h, i, j, l, 
            k, m);
            w.set.translate(0, t + f);
            r.push(w.set);
            for (var s = Math.log(p / q) / Math.log(v) + 1, w = t / s, u = 1; u < s; u++) {
                var x = f + u * w, x = Html5Map.line(b, [1, f - 2], [x, x], d.gridColor, d.gridAlpha, 1);
                r.push(x)
            }
            s = new Html5Map.SimpleButton;
            s.setDownHandler(d.draggerDown, d);
            s.setClickHandler(d.draggerUp, d);
            s.init(b, f, w, g, h, i, j, l, k, m);
            r.push(s.set);
            d.dragger = s.set;
            t -= w;
            q = Math.log(q / 100) / Math.log(v);
            v = Math.log(p / 100) / Math.log(v);
            d.realStepSize = t / (v - q);
            d.realGridHeight = t;
            d.stepMax = v
        }
        d.panControlEnabled && (v = b.set(), e.push(v), r && r.translate(f, 
        4 * f), r = new Html5Map.SimpleButton, r.setIcon(a.pathToImages + "panLeft.gif", d.iconSize), r.setClickHandler(a.moveLeft, a), r.init(b, f, f, g, h, i, j, l, k, m), r.set.translate(0, f), v.push(r.set), r = new Html5Map.SimpleButton, r.setIcon(a.pathToImages + "panRight.gif", d.iconSize), r.setClickHandler(a.moveRight, a), r.init(b, f, f, g, h, i, j, l, k, m), r.set.translate(2 * f, f), v.push(r.set), r = new Html5Map.SimpleButton, r.setIcon(a.pathToImages + "panUp.gif", d.iconSize), r.setClickHandler(a.moveUp, a), r.init(b, f, f, g, h, i, j, l, k, m), r.set.translate(f, 
        0), v.push(r.set), r = new Html5Map.SimpleButton, r.setIcon(a.pathToImages + "panDown.gif", d.iconSize), r.setClickHandler(a.moveDown, a), r.init(b, f, f, g, h, i, j, l, k, m), r.set.translate(f, 2 * f), v.push(r.set), h = new Html5Map.SimpleButton, h.setIcon(a.pathToImages + "homeIcon.gif", d.iconSize), h.setClickHandler(a.goHome, a), h.init(b, f, f, g, 0, 0, j, 0, k, m), h.set.translate(f, f), v.push(h.set), v = b.set(), e.push(v))
    },draggerDown: function() {
        this.chart.stopDrag();
        this.isDragging = !0
    },draggerUp: function() {
        this.isDragging = !1
    },handleBgUp: function() {
        var a = 
        this.chart, b = 100 * Math.pow(this.zoomFactor, this.stepMax - (a.mouseY - this.zoomSet.y - this.set.y - this.buttonSize - this.realStepSize / 2) / this.realStepSize);
        a.zoomTo(b)
    },update: function() {
        var a, b = this.zoomFactor, d = this.realStepSize, e = this.stepMax, f = this.dragger, g = this.buttonSize, h = this.chart;
        this.isDragging ? (h.stopDrag(), a = f.y + (h.mouseY - this.previousY), a = Html5Map.fitToBounds(a, g, this.realGridHeight + g), d = 100 * Math.pow(b, e - (a - g) / d), h.zoomTo(d, NaN, NaN, !0)) : (a = Math.log(h.zoomLevel() / 100) / Math.log(b), a = (e - a) * d + g);
        this.previousY = h.mouseY;
        f && f.translate(0, a)
    }});
Html5Map.SimpleButton = Html5Map.Class({construct: function() {
    },init: function(a, b, d, e, f, g, h, i, j, l) {
        var k = this;
        k.rollOverColor = l;
        k.color = e;
        l = a.set();
        k.set = l;
        e = Html5Map.rect(a, b, d, e, f, g, h, i, j);
        l.push(e);
        if (f = k.iconPath)
            g = k.iconSize, a = a.image(f, (b - g) / 2, (d - g) / 2, g, g), l.push(a), a.mousedown(function() {
                k.handleDown()
            }).mouseup(function() {
                k.handleUp()
            }).mouseover(function() {
                k.handleOver()
            }).mouseout(function() {
                k.handleOut()
            });
        e.mousedown(function() {
            k.handleDown()
        }).mouseup(function() {
            k.handleUp()
        }).mouseover(function() {
            k.handleOver()
        }).mouseout(function() {
            k.handleOut()
        });
        k.bg = e
    },setIcon: function(a, b) {
        this.iconPath = a;
        this.iconSize = b
    },setClickHandler: function(a, b) {
        this.clickHandler = a;
        this.scope = b
    },setDownHandler: function(a, b) {
        this.downHandler = a;
        this.scope = b
    },handleUp: function() {
        var a = this.clickHandler;
        a && a.call(this.scope)
    },handleDown: function() {
        var a = this.downHandler;
        a && a.call(this.scope)
    },handleOver: function() {
        this.bg.setAttr("fill", this.rollOverColor)
    },handleOut: function() {
        this.bg.setAttr("fill", this.color)
    }});
Html5Map.SmallMap = Html5Map.Class({construct: function() {
        this.mapColor = "#e6e6e6";
        this.rectangleColor = "#FFFFFF";
        this.right = 10;
        this.left;
        this.bottom;
        this.top = 10;
        this.minimizeButtonWidth = 16;
        this.backgroundColor = "#9A9A9A";
        this.backgroundAlpha = 1;
        this.borderColor = "#FFFFFF";
        this.borderThickness = 3;
        this.borderAlpha = 1;
        this.size = 0.2
    },init: function(a, b) {
        var d = this;
        d.chart = a;
        d.container = b;
        d.width = a.realWidth * d.size;
        d.height = a.realHeight * d.size;
        Html5Map.remove(d.set);
        var e = b.set();
        d.set = e;
        var f = b.set();
        d.allSet = 
        f;
        e.push(f);
        d.buildSVGMap();
        var g = d.borderThickness, h = d.borderColor, i = Html5Map.rect(b, d.width + g, d.height + g, d.backgroundColor, d.backgroundAlpha, g, h, d.borderAlpha);
        i.translate(-g / 2, -g / 2);
        f.push(i);
        i.toBack();
        var j, l, i = d.minimizeButtonWidth, k = new Html5Map.SimpleButton;
        k.setIcon(a.pathToImages + "arrowDown.gif", i);
        k.setClickHandler(d.minimize, d);
        k.init(b, i, i, h, 1, 1, h, 1);
        k = k.set;
        d.downButtonSet = k;
        e.push(k);
        var m = new Html5Map.SimpleButton;
        m.setIcon(a.pathToImages + "arrowUp.gif", i);
        m.setClickHandler(d.maximize, 
        d);
        m.init(b, i, i, h, 1, 1, h, 1);
        h = m.set;
        d.upButtonSet = h;
        h.hide();
        e.push(h);
        var t, v;
        isNaN(d.top) || (j = a.getY(d.top) + g, v = 0);
        isNaN(d.bottom) || (j = a.getY(d.bottom, !0) - d.height - g, v = d.height - i + g / 2);
        isNaN(d.left) || (l = a.getX(d.left) + g, t = -g / 2);
        isNaN(d.right) || (l = a.getX(d.right, !0) - d.width - g, t = d.width - i + g / 2);
        g = b.set();
        g.clipRect(1, 1, d.width, d.height);
        f.push(g);
        d.rectangleC = g;
        e.translate(l, j);
        k.translate(t, v);
        h.translate(t, v);
        f.mouseup(function() {
            d.handleMouseUp()
        });
        d.drawRectangle()
    },minimize: function() {
        this.downButtonSet.hide();
        this.upButtonSet.show();
        this.allSet.hide()
    },maximize: function() {
        this.downButtonSet.show();
        this.upButtonSet.hide();
        this.allSet.show()
    },buildSVGMap: function() {
        for (var a = this.chart, b = {fill: this.mapColor,stroke: this.mapColor,"stroke-opacity": 1}, d = a.svgData.g.path, e = this.container, f = e.set(), g = 0; g < d.length; g++) {
            path = d[g].d;
            var h = e.path(path).attr(b);
            f.push(h)
        }
        this.allSet.push(f);
        var b = f.getBBox(), d = this.size * a.mapScale, e = -b.x * d, g = -b.y * d, i = h = 0;
        a.centerMap && (h = (this.width - b.width * d) / 2, i = (this.height - b.height * 
        d) / 2);
        this.mapWidth = b.width * d;
        this.mapHeight = b.height * d;
        this.dx = h;
        this.dy = i;
        f.translate(e + h, g + i, d)
    },update: function() {
        var a = this.chart, b = a.zoomLevel(), d = this.width, e = a.mapContainer, a = d / (a.realWidth * b), d = d / b, b = this.height / b, f = this.rectangle;
        f.translate(-e.x * a + this.dx, -e.y * a + this.dy);
        0 < d && 0 < b && (f.setAttr("width", d), f.setAttr("height", b));
        this.rWidth = d;
        this.rHeight = b
    },drawRectangle: function() {
        var a = this.rectangle;
        Html5Map.remove(a);
        a = Html5Map.rect(this.container, 10, 10, "#000", 0, 1, this.rectangleColor, 
        1);
        this.rectangleC.push(a);
        this.rectangle = a
    },handleMouseUp: function() {
        var a = this.chart, b = a.zoomLevel();
        a.zoomTo(b, -((a.mouseX - this.set.x - this.dx - this.rWidth / 2) / this.mapWidth) * b, -((a.mouseY - this.set.y - this.dy - this.rHeight / 2) / this.mapHeight) * b)
    }});
Html5Map.AreasProcessor = Html5Map.Class({construct: function(a) {
        this.chart = a
    },process: function(a) {
        this.updateAllAreas();
        this.allObjects = [];
        var a = a.areas, b = this.chart, d = b.areasSettings, e = a.length, f, g, h = 0, i = 0, j = b.svgAreasById, l = d.color, k = d.alpha, m = d.outlineThickness, t = d.rollOverColor, v = d.selectedColor, q = d.rollOverAlpha, p = d.outlineColor, r = d.outlineAlpha, w = d.balloonText, s = d.rollOverOutlineColor, u = 0;
        for (f = 0; f < e; f++)
            g = a[f], g = Math.abs(g.value), u < g && (u = g), isNaN(g) || (h += g);
        b.maxValue = u;
        for (f = 0; f < e; f++)
            g = a[f], 
            isNaN(g.value) ? g.percents = void 0 : (g.percents = 100 * (g.value / h), i < g.percents && (i = g.percents));
        for (f = 0; f < e; f++) {
            g = a[f];
            this.allObjects.push(g);
            g.chart = b;
            g.baseSettings = d;
            g.autoZoomReal = void 0 == g.autoZoom ? d.autoZoom : g.autoZoom;
            h = g.color;
            void 0 == h && (h = l);
            u = g.alpha;
            isNaN(u) && (u = k);
            var x = g.rollOverAlpha;
            isNaN(x) && (x = q);
            isNaN(x) && (x = u);
            var n = g.rollOverColor;
            void 0 == n && (n = t);
            var y = g.selectedColor;
            void 0 == y && (y = v);
            var D = g.balloonText;
            D || (D = w);
            if (void 0 != d.colorSolid)
                if (isNaN(g.percents))
                    g.colorReal = h;
                else {
                    var C = 
                    g.percents / i, A = 100 / (b.colorSteps - 1), C = Math.ceil(100 * C / A) * A / 100;
                    g.colorReal = Html5Map.getColorFade(h, d.colorSolid, C)
                }
            C = g.outlineColor;
            void 0 == C && (C = p);
            A = g.outlineAlpha;
            isNaN(A) && (A = r);
            var z = g.outlineThickness;
            isNaN(z) && (z = m);
            var B = g.rollOverOutlineColor;
            void 0 == B && (B = s);
            g.alphaReal = u;
            g.rollOverColorReal = n;
            g.rollOverAlphaReal = x;
            g.balloonTextReal = D;
            g.selectedColorReal = y;
            g.outlineColorReal = C;
            g.outlineAlphaReal = A;
            g.rollOverOutlineColorReal = B;
            Html5Map.processDescriptionWindow(d, g);
            if (n = j[g.id]) {
                x = n.area;
                if ((n = n.title) && !g.title)
                    g.title = n;
                if (x) {
                    g.displayObject = x;
                    g.mouseEnabled && b.addObjectEventListeners(x, g);
                    var F;
                    void 0 != h && (F = h);
                    void 0 != g.colorReal && (F = g.showAsSelected || b.selectedObject == g ? g.selectedColorReal : g.colorReal);
                    x.setAttr("fill", F);
                    x.setAttr("stroke", C);
                    x.setAttr("stroke-opacity", A);
                    x.setAttr("stroke-width", z);
                    x.setAttr("fill-opacity", u)
                }
            }
        }
    },updateAllAreas: function() {
        for (var a = this.chart, b = a.areasSettings, d = b.unlistedAreasColor, e = b.unlistedAreasAlpha, f = b.unlistedAreasOutlineColor, g = b.unlistedAreasOutlineAlpha, 
        h = a.svgAreas, a = a.dataProvider, i = a.areas, j = {}, l = 0; l < i.length; l++)
            j[i[l].id] = i[l];
        for (var l = 0; l < h.length; l++)
            if (i = h[l], void 0 != d && i.setAttr("fill", d), isNaN(e) || i.setAttr("fill-opacity", e), void 0 != f && i.setAttr("stroke", f), isNaN(g) || i.setAttr("stroke-opacity", g), i.setAttr("stroke-width", b.outlineThickness), a.getAreasFromMap && !j[i.id]) {
                var k = new Html5Map.MapArea;
                k.parentObject = a;
                k.id = i.id;
                a.areas.push(k)
            }
    }});
Html5Map.AreasSettings = Html5Map.Class({construct: function() {
        this.alpha = 1;
        this.autoZoom = !1;
        this.balloonText = "[[title]]\n访问量：[[value]]";
        this.color = "#86d2e7";
        this.colorSolid = "#3d6aa8";
        this.unlistedAreasAlpha = 1;
        this.unlistedAreasColor = "#DDDDDD";
        this.outlineColor = "#FFFFFF";
        this.outlineAlpha = 1;
        this.outlineThickness = 0.5;
        this.rollOverColor;
        this.selectedColor = this.rollOverOutlineColor = "#0000CC";
        this.unlistedAreasOutlineColor = "#FFFFFF";
        this.unlistedAreasOutlineAlpha = 1;
        this.descriptionWindowWidth = 250
    }});
Html5Map.ImagesProcessor = Html5Map.Class({construct: function(a) {
        this.chart = a;
        this.reset()
    },process: function(a) {
        for (var b = a.images, d = 0; d < b.length; d++)
            this.createImage(b[d], d);
        a.parentObject && a.remainVisible && this.process(a.parentObject)
    },createImage: function(a, b) {
        var d = this.chart, e = d.container, f = d.imagesSettings, g = d.mapObjectsContainer, h = d.stageObjectsContainer, f = d.imagesSettings;
        a.remove();
        var i = f.color, j = f.alpha, l = f.rollOverColor, k = f.selectedColor, m = f.balloonText, t = f.outlineColor, v = f.outlineAlpha, 
        q = f.outlineThickness, p = f.selectedScale, r = f.labelPosition, w = f.labelColor, s = f.labelFontSize, u = f.labelRollOverColor;
        a.index = b;
        a.chart = d;
        a.baseSettings = d.imagesSettings;
        var x = e.set();
        a.displayObject = x;
        var n = a.color;
        void 0 == n && (n = i);
        i = a.alpha;
        isNaN(i) && (i = j);
        j = a.outlineAlpha;
        isNaN(j) && (j = v);
        v = a.rollOverColor;
        void 0 == v && (v = l);
        l = a.selectedColor;
        void 0 == l && (l = k);
        (k = a.balloonText) || (k = m);
        m = a.outlineColor;
        void 0 == m && (m = t);
        void 0 == m && (m = n);
        t = a.outlineThickness;
        isNaN(t) && (t = q);
        (q = a.labelPosition) || (q = r);
        r = a.labelColor;
        void 0 == r && (r = w);
        w = a.labelRollOverColor;
        void 0 == w && (w = u);
        u = a.labelFontSize;
        isNaN(u) && (u = s);
        s = a.selectedScale;
        isNaN(s) && (s = p);
        isNaN(a.rollOverScale);
        a.colorReal = n;
        a.alphaReal = i;
        a.rollOverColorReal = v;
        a.balloonTextReal = k;
        a.selectedColorReal = l;
        a.labelColorReal = r;
        a.labelRollOverColorReal = w;
        a.labelFontSizeReal = u;
        a.labelPositionReal = q;
        a.selectedScaleReal = s;
        a.rollOverScaleReal = s;
        Html5Map.processDescriptionWindow(f, a);
        a.centeredReal = void 0 == a.centered ? f.centered : a.centered;
        w = a.type;
        v = a.imageURL;
        r = a.svgPath;
        s = a.width;
        u = a.height;
        f = a.scale;
        isNaN(a.percentWidth) || (s = a.percentWidth / 100 * d.realWidth);
        isNaN(a.percentHeight) || (u = a.percentHeight / 100 * d.realHeight);
        var y;
        !v && (!w && !r) && (w = "circle", s = 1, j = i = 0);
        p = a.selectedColorReal;
        w ? (isNaN(s) && (s = 10), isNaN(u) && (u = 10), "kilometers" == a.widthAndHeightUnits && (s = d.kilometersToPixels(a.width), u = d.kilometersToPixels(a.height)), "miles" == a.widthAndHeightUnits && (s = d.milesToPixels(a.width), u = d.milesToPixels(a.height)), y = this.createPredefinedImage(n, m, t, w, s, u), t = m = 0, a.centeredReal && 
        (m = isNaN(a.right) ? -s / 2 : s / 2, t = isNaN(a.bottom) ? -u / 2 : u / 2), y.translate(m, t)) : v ? (isNaN(s) && (s = 10), isNaN(u) && (u = 10), y = e.image(v, 0, 0, s, u), y.node.setAttribute("preserveAspectRatio", "none"), y.setAttr("opacity", i), a.centeredReal && (m = isNaN(a.right) ? -s / 2 : s / 2, t = isNaN(a.bottom) ? -u / 2 : u / 2, y.translate(m, t))) : r && (y = e.path(r), t = y.getBBox(), a.centeredReal ? (m = -t.x * f - t.width * f / 2, isNaN(a.right) || (m = -m), t = -t.y * f - t.height * f / 2, isNaN(a.bottom) || (t = -t)) : m = t = 0, y.translate(m, t, f), y.x = m, y.y = t);
        y && (x.push(y), a.image = y, y.setAttr("stroke-opacity", 
        j), y.setAttr("fill-opacity", i), y.setAttr("fill", n));
        (a.showAsSelected || d.selectedObject == a) && void 0 != p && y.setAttr("fill", p);
        n = null;
        a.label && (n = Html5Map.text(e, a.label, a.labelColorReal, d.fontFamily, a.labelFontSizeReal, a.labelAlign), a.imageLabel = n, !a.labelInactive && a.mouseEnabled && d.addObjectEventListeners(n, a), x.push(n));
        !isNaN(a.latitude) && !isNaN(a.longitude) ? g.push(x) : h.push(x);
        x && (x.rotation = a.rotation);
        this.updateSizeAndPosition(a);
        a.mouseEnabled && d.addObjectEventListeners(x, a)
    },updateSizeAndPosition: function(a) {
        var b = 
        this.chart, d = a.displayObject, e = b.getX(a.left), f = b.getY(a.top), g = a.image.getBBox();
        isNaN(a.right) || (e = b.getX(a.right, !0) - g.width * a.scale);
        isNaN(a.bottom) || (f = b.getY(a.bottom, !0) - g.height * a.scale);
        var h = a.longitude, i = a.latitude, g = this.objectsToResize;
        this.allSvgObjects.push(d);
        this.allObjects.push(a);
        var j = a.imageLabel;
        if (!isNaN(e) && !isNaN(f))
            d.translate(e, f);
        else if (!isNaN(i) && !isNaN(h) && (e = b.longitudeToCoordinate(h), f = b.latitudeToCoordinate(i), d.translate(e, f), a.fixedSize)) {
            e = 1;
            if (a.showAsSelected || 
            b.selectedObject == a)
                e = a.selectedScaleReal;
            g.push({image: d,scale: e})
        }
        this.positionLabel(j, a, a.labelPositionReal)
    },positionLabel: function(a, b, d) {
        if (a) {
            var e = b.image, f = 0, g = 0, h = 0, i = 0;
            e && (i = e.getBBox(), g = e.y, f = e.x, h = i.width, i = i.height, b.svgPath && (h *= b.scale, i *= b.scale));
            var j = a.getBBox(), e = j.width, j = j.height;
            "right" == d && (f += h + e / 2 + 5, g += i / 2 - 2);
            "left" == d && (f += -e / 2 - 5, g += i / 2 - 2);
            "top" == d && (g -= j / 2 + 3, f += h / 2);
            "bottom" == d && (g += i + j / 2, f += h / 2);
            "middle" == d && (f += h / 2, g += i / 2);
            a.translate(f + b.labelShiftX, g + b.labelShiftY)
        }
    },
    createPredefinedImage: function(a, b, d, e, f, g) {
        var h = this.chart.container, i;
        switch (e) {
            case "circle":
                i = Html5Map.circle(h, f / 2, a, 1, d, b, 1);
                break;
            case "rectangle":
                i = Html5Map.rect(h, f, g, a, 1, d, b, 1);
                i.translate(-f / 2, -g / 2);
                break;
            case "bubble":
                i = Html5Map.circle(h, f / 2, a, 1, d, b, 1, !0)
        }
        return i
    },reset: function() {
        this.objectsToResize = [];
        this.allSvgObjects = [];
        this.allObjects = [];
        this.allLabels = []
    }});
Html5Map.ImagesSettings = Html5Map.Class({construct: function() {
        this.balloonText = "[[title]]";
        this.alpha = 1;
        this.borderColor;
        this.borderAlpha = 0;
        this.borderThickness = 1;
        this.labelPosition = "right";
        this.labelColor = "#000000";
        this.labelFontSize = 11;
        this.color = "#000000";
        this.labelRollOverColor = "#00CC00";
        this.centered = !0;
        this.rollOverScale = this.selectedScale = 1;
        this.descriptionWindowWidth = 250
    }});
Html5Map.LinesProcessor = Html5Map.Class({construct: function(a) {
        this.chart = a;
        this.reset()
    },process: function(a) {
        for (var b = a.lines, d = this.chart, e = d.linesSettings, f = this.objectsToResize, g = d.mapObjectsContainer, h = d.stageObjectsContainer, i = e.thickness, j = e.dashLength, l = e.arrow, k = e.arrowSize, m = e.arrowColor, t = e.arrowAlpha, v = e.color, q = e.alpha, p = e.rollOverColor, r = e.selectedColor, w = e.rollOverAlpha, s = e.balloonText, u = d.container, x = 0; x < b.length; x++) {
            var n = b[x];
            n.chart = d;
            n.baseSettings = e;
            var y = u.set();
            n.displayObject = 
            y;
            this.allSvgObjects.push(y);
            this.allObjects.push(n);
            n.mouseEnabled && d.addObjectEventListeners(y, n);
            if (n.remainVisible || d.selectedObject == n.parentObject) {
                var D = n.thickness;
                isNaN(D) && (D = i);
                var C = n.dashLength;
                isNaN(C) && (C = j);
                var A = n.color;
                void 0 == A && (A = v);
                var z = n.alpha;
                isNaN(z) && (z = q);
                var B = n.rollOverAlpha;
                isNaN(B) && (B = w);
                isNaN(B) && (B = z);
                var F = n.rollOverColor;
                void 0 == F && (F = p);
                var P = n.selectedColor;
                void 0 == P && (P = r);
                var N = n.balloonText;
                N || (N = s);
                var I = n.arrow;
                I || (I = l);
                var J = n.arrowColor;
                void 0 == J && (J = 
                m);
                void 0 == J && (J = A);
                var K = n.arrowAlpha;
                isNaN(K) && (K = t);
                isNaN(K) && (K = z);
                var H = n.arrowSize;
                isNaN(H) && (H = k);
                n.alphaReal = z;
                n.colorReal = A;
                n.rollOverColorReal = F;
                n.rollOverAlphaReal = B;
                n.balloonTextReal = N;
                n.selectedColorReal = P;
                n.thicknessReal = D;
                Html5Map.processDescriptionWindow(e, n);
                var B = this.processCoordinates(n.x, d.realWidth), F = this.processCoordinates(n.y, d.realHeight), G = n.longitudes, N = n.latitudes, Q = G.length, L;
                if (0 < Q) {
                    B = [];
                    for (L = 0; L < Q; L++)
                        B.push(d.longitudeToCoordinate(G[L]))
                }
                Q = N.length;
                if (0 < Q) {
                    F = [];
                    for (L = 
                    0; L < Q; L++)
                        F.push(d.latitudeToCoordinate(N[L]))
                }
                if (0 < B.length) {
                    Html5Map.dx = 0;
                    Html5Map.dy = 0;
                    C = Html5Map.line(u, B, F, A, 1, D, C);
                    Html5Map.dx = 0.5;
                    Html5Map.dy = 0.5;
                    y.push(C);
                    y.setAttr("opacity", z);
                    if ("none" != I) {
                        var E, M, O;
                        if ("end" == I || "both" == I)
                            z = B[B.length - 1], A = F[F.length - 1], 1 < B.length ? (G = B[B.length - 2], E = F[F.length - 2]) : (G = z, E = A), E = 180 * Math.atan((A - E) / (z - G)) / Math.PI, M = z, O = A, E = 0 > z - G ? E - 90 : E + 90;
                        "both" == I && (z = Html5Map.polygon(u, [-H / 2, 0, H / 2], [1.5 * H, 0, 1.5 * H], J, K, 1, J, K), y.push(z), z.translate(M, O), z.rotate(E), n.fixedSize && 
                        f.push(z));
                        if ("start" == I || "both" == I)
                            z = B[0], O = F[0], 1 < B.length ? (A = B[1], M = F[1]) : (A = z, M = O), E = 180 * Math.atan((O - M) / (z - A)) / Math.PI, M = z, E = 0 > z - A ? E - 90 : E + 90;
                        "middle" == I && (z = B[B.length - 1], A = F[F.length - 1], 1 < B.length ? (G = B[B.length - 2], E = F[F.length - 2]) : (G = z, E = A), M = G + (z - G) / 2, O = E + (A - E) / 2, E = 180 * Math.atan((A - E) / (z - G)) / Math.PI, E = 0 > z - G ? E - 90 : E + 90);
                        z = Html5Map.polygon(u, [-H / 2, 0, H / 2], [1.5 * H, 0, 1.5 * H], J, K, 1, J, K);
                        y.push(z);
                        z.translate(M, O);
                        z.rotate(E);
                        n.fixedSize && f.push(z)
                    }
                    n.fixedSize && C && this.linesToResize.push({line: C,thickness: D});
                    n.showAsSelected && !isNaN(P) && C.setAttr("stroke", P);
                    0 < N.length ? g.push(y) : h.push(y)
                }
            }
        }
        a.parentObject && a.remainVisible && this.process(a.parentObject)
    },processCoordinates: function(a, b) {
        for (var d = [], e = 0; e < a.length; e++) {
            var f = a[e], g = Number(f);
            isNaN(g) && (g = Number(f.replace("%", "")) * b / 100);
            isNaN(g) || d.push(g)
        }
        return d
    },reset: function() {
        this.objectsToResize = [];
        this.allSvgObjects = [];
        this.allObjects = [];
        this.linesToResize = []
    }});
Html5Map.LinesSettings = Html5Map.Class({construct: function() {
        this.balloonText = "[[title]]";
        this.thickness = 1;
        this.dashLength = 0;
        this.arrowSize = 10;
        this.arrowAlpha = 1;
        this.arrowColor;
        this.arrow = "none";
        this.color = "#990000";
        this.descriptionWindowWidth = 250
    }});
Html5Map.MapObject = Html5Map.Class({construct: function() {
        this.fixedSize = this.mouseEnabled = !0;
        this.images = [];
        this.lines = [];
        this.areas = [];
        this.remainVisible = !0;
        this.showInList;
        this.passZoomValuesToTarget = this.selectable = !1
    }});
Html5Map.MapArea = Html5Map.Class({inherits: Html5Map.MapObject,construct: function() {
        this.objectType = "MapArea";
        Html5Map.MapArea.base.construct.call(this)
    }});
Html5Map.MapLine = Html5Map.Class({inherits: Html5Map.MapObject,construct: function() {
        this.longitudes = [];
        this.latitudes = [];
        this.x = [];
        this.y = [];
        this.objectType = "MapLine";
        this.arrow = "none";
        Html5Map.MapLine.base.construct.call(this)
    }});
Html5Map.MapImage = Html5Map.Class({inherits: Html5Map.MapObject,construct: function() {
        this.scale = 1;
        this.widthAndHeightUnits = "pixels";
        this.objectType = "MapImage";
        this.labelShiftY = this.labelShiftX = 0;
        Html5Map.MapImage.base.construct.call(this)
    },remove: function() {
        var a = this.displayObject;
        a && a.remove();
        (a = this.imageLabel) && a.remove()
    }});
Html5Map.degreesToRadians = function(a) {
    return a / 180 * Math.PI
};
Html5Map.radiansToDegrees = function(a) {
    return 180 * (a / Math.PI)
};
Html5Map.getColorFade = function(a, b, d) {
    var e = Html5Map.hex2RGB(b), b = e[0], f = e[1], e = e[2], g = Html5Map.hex2RGB(a), a = g[0], h = g[1], g = g[2], a = a + Math.round((b - a) * d), h = h + Math.round((f - h) * d), g = g + Math.round((e - g) * d);
    return "rgb(" + a + "," + h + "," + g + ")"
};
Html5Map.hex2RGB = function(a) {
    return [parseInt(a.substring(1, 3), 16), parseInt(a.substring(3, 5), 16), parseInt(a.substring(5, 7), 16)]
};
Html5Map.processDescriptionWindow = function(a, b) {
    var d = a.descriptionWindowX, e = a.descriptionWindowY, f = a.descriptionWindowWidth, g = a.descriptionWindowHeight, h = b.descriptionWindowX;
    isNaN(h) && (h = d);
    d = b.descriptionWindowY;
    isNaN(d) && (d = e);
    e = b.descriptionWindowWidth;
    isNaN(e) && (e = f);
    f = b.descriptionWindowHeight;
    isNaN(f) && (f = g);
    b.descriptionWindowX = h;
    b.descriptionWindowY = d;
    b.descriptionWindowWidth = e;
    b.descriptionWindowHeight = f
};
Html5Map.MapData = Html5Map.Class({inherits: Html5Map.MapObject,construct: function() {
        Html5Map.MapData.base.construct.call(this);
        this.projection = "mercator";
        this.topLatitude = 90;
        this.bottomLatitude = -90;
        this.leftLongitude = -180;
        this.rightLongitude = 180;
        this.zoomLevel = 1;
        this.objectType = "MapData";
        this.getAreasFromMap = !1
    }});
Html5Map.DescriptionWindow = Html5Map.Class({construct: function() {
    },show: function(a, b, d, e) {
        var f = this, g = document.createElement("div");
        g.style.position = "absolute";
        g.className = "ammapDescriptionWindow";
        f.div = g;
        b.appendChild(g);
        var h = document.createElement("img");
        h.className = "ammapDescriptionWindowCloseButton";
        h.src = a.pathToImages + "xIcon.gif";
        h.style.cssFloat = "right";
        h.onclick = function() {
            f.close()
        };
        h.onmouseover = function() {
            h.src = a.pathToImages + "xIconH.gif"
        };
        h.onmouseout = function() {
            h.src = a.pathToImages + 
            "xIcon.gif"
        };
        g.appendChild(h);
        b = document.createElement("div");
        b.className = "ammapDescriptionTitle";
        b.onmousedown = function() {
            f.div.style.zIndex = 1E3
        };
        g.appendChild(b);
        e = document.createTextNode(e);
        b.appendChild(e);
        e = b.offsetHeight;
        b = document.createElement("div");
        b.className = "ammapDescriptionText";
        b.style.maxHeight = f.maxHeight - e - 20 + "px";
        g.appendChild(b);
        b.innerHTML = d
    },close: function() {
        try {
            this.div.parentNode.removeChild(this.div)
        } catch (a) {
        }
    }});
Html5Map.ValueLegend = Html5Map.Class({construct: function() {
        this.showAsGradient = !1;
        this.minValue = 0;
        this.maxValue;
        this.height = 12;
        this.width = 200;
        this.right;
        this.bottom = this.left = 10;
        this.top;
        this.borderColor = "#FFFFFF";
        this.borderAlpha = this.borderThickness = 1;
        this.color = "#000000";
        this.fontSize = 11
    },init: function(a, b) {
        var d = a.areasSettings.color, e = a.areasSettings.colorSolid, f = a.colorSteps;
        Html5Map.remove(this.set);
        var g = b.set();
        this.set = g;
        var h = 0, i = this.minValue, j = this.fontSize, l = a.fontFamily, k = this.color;
        void 0 != i && (h = Html5Map.text(b, i, k, l, j, "left"), h.translate(0, j / 2 - 1), g.push(h), h = h.getBBox().height);
        i = this.maxValue;
        void 0 == i && (i = a.maxValue);
        void 0 != i && (h = Html5Map.text(b, i, k, l, j, "right"), h.translate(this.width, j / 2 - 1), g.push(h), h = h.getBBox().height);
        if (this.showAsGradient)
            d = Html5Map.rect(b, this.width, this.height, [d, e], 1, this.borderThickness, this.borderColor, 1, 0, 0), d.translate(0, h), g.push(d);
        else {
            j = this.width / f;
            for (l = 0; l < f; l++)
                k = Html5Map.getColorFade(d, e, 1 * l / (f - 1)), k = Html5Map.rect(b, j, this.height, 
                k, 1, this.borderThickness, this.borderColor, 1), k.translate(j * l, h), g.push(k)
        }
        e = d = 0;
        f = g.getBBox();
        h = a.getY(this.bottom, !0);
        j = a.getY(this.top);
        l = a.getX(this.right, !0);
        k = a.getX(this.left);
        isNaN(j) || (d = j);
        isNaN(h) || (d = h - f.height);
        isNaN(k) || (e = k);
        isNaN(l) || (e = l - f.width);
        g.translate(e, d)
    }});
Html5Map.ObjectList = Html5Map.Class({construct: function(a) {
        this.div = "object" != typeof a ? document.getElementById(a) : a
    },init: function(a) {
        this.chart = a;
        var b = document.createElement("div");
        b.className = "ammapObjectList";
        this.div.appendChild(b);
        this.addObjects(a.dataProvider, b)
    },addObjects: function(a, b) {
        var d = this.chart, e = document.createElement("ul"), f;
        if (a.areas)
            for (f = 0; f < a.areas.length; f++) {
                var g = a.areas[f];
                void 0 == g.showInList && (g.showInList = d.showAreasInList);
                this.addObject(g, e)
            }
        if (a.images)
            for (f = 0; f < 
            a.images.length; f++)
                g = a.images[f], void 0 == g.showInList && (g.showInList = d.showImagesInList), this.addObject(g, e);
        if (a.lines)
            for (f = 0; f < a.lines.length; f++)
                g = a.lines[f], void 0 == g.showInList && (g.showInList = d.showLinesInList), this.addObject(g, e);
        0 < e.childNodes.length && b.appendChild(e)
    },addObject: function(a, b) {
        var d = this;
        if (a.showInList && void 0 != a.title) {
            var e = document.createElement("li"), f = document.createTextNode(a.title), g = document.createElement("a");
            g.appendChild(f);
            e.appendChild(g);
            b.appendChild(e);
            this.addObjects(a, 
            e);
            g.onmouseover = function() {
                d.chart.rollOverMapObject(a, !1)
            };
            g.onmouseout = function() {
                d.chart.rollOutMapObject(a)
            };
            g.onclick = function() {
                d.chart.clickMapObject(a)
            }
        }
    }});
