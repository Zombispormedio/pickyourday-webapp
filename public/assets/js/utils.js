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