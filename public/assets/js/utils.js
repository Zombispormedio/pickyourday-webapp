function saveLocal(key, data) {
    localStorage[key] = JSON.stringify(data);
}

function getJSONLocal(key) {

    var result = null;
    try {
        var str_json = localStorage[key];

        if (str_json!==undefined) {

            result = JSON.parse(str_json);
        }

    } catch (e) {

    }

    return result;
}

function deleteLocal(key) {
    localStorage.removeItem(key);
}

function ClosureMessage(message){
    return function(fn){
        return function(){
            fn(message);
        };
    };
}

function emptyOrUndefined(value){
    return value==void 0 || value==="";
}

function HourStringToDate(hour){
    var date= new Date();
    var elems=hour.split(":");
    date.setHours(elems[0]);
    date.setMinutes(elems[1]);
    return date;

}

function compareHourString(a, b){
   
    var date_a=HourStringToDate(a);
    var date_b=HourStringToDate(b);
    
    return date_a<date_b;
}


function RandPosition(v) {
    var range = v || { min: 0, max: 100 };
    var x = chance.floating(range);
    var y = chance.floating(range);
    var z = chance.floating(range);
    return [x, y, z];
}

function RandColor(v) {
    var rangeColor = v || { min: 0, max: 1, fixed: 2 };
    var r = chance.floating(rangeColor);
    var g = chance.floating(rangeColor);
    var b = chance.floating(rangeColor);
    return [r, g, b, 1];
}

function RandSize(v) {
    var range = v || { min: 0.1, max: 2, fixed: 1 };
    var size = chance.floating(range);
    return [size, size, size];
}


function RandRotation(v){
    var range = v || { min: 0, max: 360};
    var x=Number(chance.bool());
    var y=Number(chance.bool());
    var z=Number(chance.bool());
    return  {
        angle:chance.integer({ min: 0, max: 360}),
        axis:[x,y,z]
    }
}


function generate(fn) {
    return function() {
        var count = chance.integer({ min: 0, max: 100 });
        return Array.apply(0, Array(count)).map(fn);
    };
}