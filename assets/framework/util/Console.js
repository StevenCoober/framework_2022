(function (context) {
    // Only global namespace.
    var Console = {
        //Settings
        settings: {
            debug: {
                alwaysShowURL: false,
                enabled: true,
                showInfo: true
            },
            stackTrace: {
                enabled: true,
                collapsed: true,
                ignoreDebugFuncs: true,
                spacing: false
            }
        }
    };

    function formatDate(template) {
        let map = {
            "M+": (new Date()).getMonth() + 1,
            "d+": (new Date()).getDate(),
            "h+": (new Date()).getHours(),
            "m+": (new Date()).getMinutes(),
            "s+": (new Date()).getSeconds(),
            "q+": Math.floor(((new Date()).getMonth() + 3) / 3),
            "S": (new Date()).getMilliseconds()
        };
        if (/(y+)/.test(template)) {
            template = template.replace(RegExp.$1, ((new Date()).getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in map) {
            if (new RegExp("(" + k + ")").test(template)) {
                template = template.replace(RegExp.$1, (RegExp.$1.length == 1) ? (map[k]) : (("00" + map[k]).substr(("" + map[k]).length)));
            }
        }
        return template;
    }
    // String formatting prototype function.
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var s = this.toString(),
                args = typeof arguments[0],
                args = (("string" == args || "number" == args) ? arguments : arguments[0]);
            if (!arguments.length)
                return s;
            for (arg in args)
                s = s.replace(RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
            return s;
        }
    }

    // String repeating prototype function.
    if (!String.prototype.times) {
        String.prototype.times = function () {
            var s = this.toString(),
                tempStr = "",
                times = arguments[0];
            if (!arguments.length)
                return s;
            for (var i = 0; i < times; i++)
                tempStr += s;
            return tempStr;
        }
    }

    // let specialLog =  Function.prototype.bind.call(console.log, console, formatDate("yyyy年MM月dd日 hh时mm分ss秒:S"));
    // Console.log = function (...args) {
    //     // specialLog(...arguments);
    //     console.log(formatDate("yyyy年MM月dd日 hh时mm分ss秒:S"), ...arguments);
    // }
    Console.log = Function.prototype.bind.call(console.log, console, (()=>{return formatDate("yyyy年MM月dd日 hh时mm分ss秒:S")})());
     
    Console.cline = function () {
        let sUA = navigator.userAgent;
        let currentBrowser = {
            firefox: /(firefox)/gi.test(sUA),
            webkit: /webkit/gi.test(sUA),
        };

        let aLines = Console.stackTrace().split("\n");
        sLine = aLines[3].trim();

        return sLine;
    }

    // Commonly used functions
    Console.debug = function () {
        if (Console.settings.debug.enabled) {
            var args = ((typeof arguments !== 'undefined') ? Array.prototype.slice.call(arguments, 0) : []),
                sUA = navigator.userAgent,
                currentBrowser = {
                    firefox: /(firefox)/gi.test(sUA),
                    webkit: /webkit/gi.test(sUA),
                },
                aLines = Console.stackTrace().split("\n"),
                aCurrentLine,
                iCurrIndex = ((currentBrowser.webkit) ? 3 : 2),
                sCssBlack = "color:black;",
                sCssFormat = "color:{0}; font-weight:bold;",
                sLines = "";

            if (currentBrowser.firefox)
                aCurrentLine = aLines[iCurrIndex].replace(/(.*):/, "$1@").split("@");
            else if (currentBrowser.webkit)
                aCurrentLine = aLines[iCurrIndex].replace("at ", "").replace(")", "").replace(/( \()/gi, "@").replace(/(.*):(\d*):(\d*)/, "$1@$2@$3").split("@");

            // Show info if the setting is true and there's no extra trace (would be kind of pointless).
            if (Console.settings.debug.showInfo && !Console.settings.stackTrace.enabled) {
                var sFunc = aCurrentLine[0].trim(),
                    sURL = aCurrentLine[1].trim(),
                    sURL = ((!Console.settings.debug.alwaysShowURL && context.location.href == sURL) ? "this page" : sURL),
                    sLine = aCurrentLine[2].trim(),
                    sCol;

                if (currentBrowser.webkit)
                    sCol = aCurrentLine[3].trim();

                console.info("%cOn line %c{0}%c{1}%c{2}%c of %c{3}%c inside the %c{4}%c function:".format(sLine, ((currentBrowser.webkit) ? ", column " : ""), ((currentBrowser.webkit) ? sCol : ""), sURL, sFunc),
                    sCssBlack, sCssFormat.format("red"),
                    sCssBlack, sCssFormat.format("purple"),
                    sCssBlack, sCssFormat.format("green"),
                    sCssBlack, sCssFormat.format("blue"),
                    sCssBlack);
            }

            // If the setting permits, get rid of the two obvious debug functions (Console.debug and Console.stackTrace).
            if (Console.settings.stackTrace.ignoreDebugFuncs) {
                // In WebKit (Chrome at least), there's an extra line at the top that says "Error" so adjust for this.
                if (currentBrowser.webkit)
                    aLines.shift();
                aLines.shift();
                aLines.shift();
            }

            sLines = aLines.join(((Console.settings.stackTrace.spacing) ? "\n\n" : "\n")).trim();

            trace = typeof trace !== 'undefined' ? trace : true;
            if (typeof console !== "undefined") {
                for (var arg in args)
                    console.debug(args[arg]);

                if (Console.settings.stackTrace.enabled) {
                    var sCss = "color:red; font-weight: bold;",
                        sTitle = "%c Stack Trace" + " ".times(70);

                    if (Console.settings.stackTrace.collapsed)
                        console.groupCollapsed(sTitle, sCss);
                    else
                        console.group(sTitle, sCss);

                    console.debug("%c" + sLines, "color: #666666; font-style: italic;");

                    console.groupEnd();
                }
            }
        }
    }
    Console.stackTrace = function () {
        var err = new Error();
        return err.stack;
    }

    context.Console = Console;
})(window);