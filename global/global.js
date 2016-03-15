var common = {
    getById: function(id) {
        return document.getElementById(id);
    },

    getByClass: function(sClass, oParent) {
        oParent = oParent || document;
        var elements = oParent.getElementsByTagName('*');
        var result = [];
        var reg = new RegExp('(^|\\s)' + sClass + '(\\s|$)');
        var i = 0;
        var len = elements.length;

        for (i = 0; i < len; i++) {
            if (reg.test(elements[i].className)) {
                result.push(elements[i]);
            }
        }

        return result;
    },

    getStyle: function(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
    },

    addEvent: function(obj, eventName, fn) {
        if(obj.addEventListener){
            obj.addEventListener(eventName, fn, false);
        }else{
            obj.attachEvent('on'+eventName, function() {
                fn.call(obj);
            });
        }
    },

    getDate: function() {
        var oDate = new Date(),
            iYear = oDate.getFullYear(),
            iMonth = toDouble(oDate.getMonth() + 1),
            iDay = toDouble(oDate.getDate()),
            iWeek = oDate.getDay(),
            iHour = toDouble(oDate.getHours()),
            iMinute = toDouble(oDate.getMinutes()),
            iSecond = toDouble(oDate.getSeconds());

        switch (iWeek) {
            case 0:
                iWeek = '星期天';
                break;
            case 1:
                iWeek = '星期一';
                break;
            case 2:
                iWeek = '星期二';
                break;
            case 3:
                iWeek = '星期三';
                break;
            case 4:
                iWeek = '星期四';
                break;
            case 5:
                iWeek = '星期五';
                break;
            case 6:
                iWeek = '星期六';
                break;
        }

        function toDouble(n) {
            return n < 10 ? '0' + n : '' + n;
        }
        return {
            year: iYear,
            month: iMonth,
            day: iDay,
            week: iWeek,
            hour: iHour,
            minute: iMinute,
            second: iSecond
        }
    },

    getRandom: function(x, y) {
        return Math.round( Math.random() * (y-x) + x );
    },

    starMove: function(obj, json, endFn) {
        var _this = this;
        clearInterval(obj.timer);

        obj.timer = setInterval(function() {
            var bStop = true;

            for (var attr in json) {
                var cur = 0;

                if (attr == 'opacity') {
                    cur = Math.round(parseFloat(_this.getStyle(obj, attr)) * 100);
                } else {
                    cur = parseInt(_this.getStyle(obj, attr));
                }

                var speed = (json[attr] - cur) / 6;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if (cur != json[attr]) {
                    bStop = false;
                }

                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity=' + (cur + speed) + ')';
                    obj.style.opacity = (cur + speed) / 100;
                } else {
                    obj.style[attr] = cur + speed + 'px';
                }
            }

            if (bStop) {
                clearInterval(obj.timer);
                if (typeof endFn == 'function') {
                    endFn();
                }
            }

        }, 30);
    },

    doMove: function(obj, attr, dir, target, endFn) {
        var _this = this;
        dir = parseInt(_this.getStyle(obj, attr)) < target ? dir : -dir;

        clearInterval(obj.timer);

        obj.timer = setInterval(function() {
            var speed = parseInt(_this.getStyle(obj, attr)) + dir;

            if (speed > target && dir > 0 || speed < target && dir < 0) {
                speed = target;
            }

            obj.style[attr] = speed + 'px';

            if (speed == target) {
                clearInterval(obj.timer);

                if (typeof endFn == 'function') {
                    endFn();
                }
            }
        }, 30);
    },

    shake: function(obj, attr, endFn) {   
        var _this = this;
        if(obj.onOff){
            return;
        }
        obj.onOff = true;

        var pos = parseInt(_this.getStyle(obj, attr));            
        var arrNum = [];
        var num = 0;        
        
        for (var i = 20; i > 0; i -= 2) {
            arrNum.push(i, -i);
        }
        arrNum.push(0);

        clearInterval(obj.shake);
        obj.shake = setInterval(function() {
            obj.style[attr] = pos + arrNum[num] + 'px';
            num++;
            if (num > arrNum.length) {
                clearInterval(obj.shake);
                if(typeof endFn == 'function'){
                  endFn();
                }
                obj.onOff = false;
            }
        }, 30);
    }
};
