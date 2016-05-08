webAppFactory.CompanyService= function(ApiService){
    return {

        base:"company",

        register:function(){
            return ApiService.rest(this.base, {
                  new:{method:"POST", params:{}},
            });
        },
        picks:function(){
            return ApiService.rest(this.base+"/pick/:id",{
                list:{method:"GET", params:{}}
            });
        },
        profile:function(){
        	return ApiService.rest(this.base+"/profile/:id",{
        		get:{method:"GET", params:{}},
                update:{method:"PUT", params:{}}
        	});
        },
        services:function(){
            return ApiService.rest(this.base+"/service/:id",{
                list:{method:"GET", params:{}},
                delete:{method:"DELETE", params:{id:'@id'}},                
                update:{method:"PUT", params:{id:'@id'}}
            });
        },
        service:function(){
            return ApiService.rest(this.base+"/service",{
                create:{method:"POST", params:{}}
            });
        },
        promotion:function(){
            return ApiService.rest(this.base+"/promotion/:id",{
                create:{method:"POST", params:{}},
                get:{method:"GET", params:{id:'@id'}},
                update:{method:"PUT", params:{id:'@id'}},
                delete:{method:"DELETE", params:{id:'@id'}}
            });
        },
         promotions:function(){
            return ApiService.rest(this.base+"/promotion/",{
                get:{method:"GET", params:{}}
            });
        },       
        employees:function(){
             return ApiService.rest(this.base+"/resource/:id",{
                /*list:{method:"GET", params:{}},*/
                get:{method:"GET", params:{}},
                create:{method:"POST", params:{}},
                delete:{method:"DELETE", params:{}},
                update:{method:"PUT", params:{}}
            });
        },
        servicesAsigned:function(){
            return ApiService.rest(this.base+"/serviceAsigned/",{
                list:{method:"GET", params:{}}
            });
        },
        servicesByCategory:function(){
            return ApiService.rest(this.base+"/serviceName/",{
                list:{method:"GET", params:{}}
            });
        },
        resourcesByServices:function(){
            return ApiService.rest(this.base+"/resourcesByService/",{
                list:{method:"GET", params:{}}
            });
        },
        toggleService:function(){
            return ApiService.rest(this.base+"/toggleService/",{
                change:{method:"POST", params:{}}
            });
        },
        timeline:function(){
            return ApiService.rest(this.base+"/timeline/",{
                get:{method:"GET", params:{}}
            });
        },
        
        developer:function(){
            return ApiService.rest(this.base+"/developer/",{
                get:{method:"GET", params:{}},
                updateOrCreate:{method:"POST", params:{}}
            });
        },
        pick:function(){
            return ApiService.rest(this.base+"/pick/",{
                create:{method:"POST", params:{}},
                get:{method:"GET", params:{}}
            });
        },
        nextPick:function(){
            return ApiService.rest(this.base+"/nextPick/",{
                change:{method:"POST", params:{}}
            });
        },
        cancelPick:function(){
            return ApiService.rest(this.base+"/cancelPick/:id",{
                cancel:{method:"PUT", params:{id:'@id'}}
            });
        }
    };
};
