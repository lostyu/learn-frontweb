function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

function doMove(obj, attr, dir, target, endFn) {
    dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;

    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var speed = parseInt(getStyle(obj, attr)) + dir;

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
}

function starMove(obj, json, endFn) {
    clearInterval(obj.timer);

            obj.timer = setInterval(function() {
                var bStop = true;

                for(var attr in json){
                    var cur = 0;

                    if(attr == 'opacity'){
                        cur = Math.round( parseFloat(getStyle(obj, attr)) * 100 );
                    }else{
                        cur = parseInt( getStyle(obj, attr) );
                    }

                    var speed = (json[attr] - cur)/6;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);                   

                    if(cur != json[attr]){
                        bStop = false;
                    }

                    if(attr == 'opacity'){
                        obj.style.filter = 'alpha(opacity='+ (cur + speed) +')';
                        obj.style.opacity = (cur + speed) / 100;
                    }else{
                        obj.style[attr] = cur + speed + 'px';
                    }                   
                }

                if(bStop){
                    clearInterval(obj.timer);
                    if(typeof endFn == 'function'){
                        endFn();
                    }
                }
                
            }, 30);
}