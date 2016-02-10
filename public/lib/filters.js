webAppFilter.capitalize=function(){
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
};
webAppFilter.image=function(ConfigService){
    return function(input) {
        return ConfigService.cdn + input;
    };
};
