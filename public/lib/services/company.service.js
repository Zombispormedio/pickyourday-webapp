webAppFactory.CompanyService= function(ApiService){
    return {

        base:"company",
        picks:function(){
            return ApiService.rest(this.base+"/pick/:id",{
                list:{method:"GET", params:{}},


            });
        },
        
        promotion:function(){
            return ApiService.rest(this.base+"/promotion/:id",{
                create:{method:"POST", params:{}},
                
                });
        }




    };
};
