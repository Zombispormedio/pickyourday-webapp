webAppFactory.SystemService= function(ApiService){
	return {

        base:"system",
        images:function(){
            return ApiService.rest(this.base+"/image/:type",{
                upload:{method:"POST", params:{type:'@type'}}
            });
        }
    };
};