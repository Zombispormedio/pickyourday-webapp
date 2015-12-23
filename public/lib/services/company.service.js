webAppFactory.CompanyService= function(ApiService){
    return {

        base:"company",
        company:function(){
            return ApiService.rest(this.base+"/:id",{
                list:{method:"GET", params:{}},
                create:{method:"POST", params:{}},
                getByID:{method:"GET", params:{id:"@id"}},
                update:{method:"PUT", params:{id:"@id"}},
                delete:{method:"DELETE", params:{id:"@id"}}

            });
        }




    };
};
