webAppFactory.OauthService= function(ApiService){
    return {

        base:"oauth",
        login:function(){
            return ApiService.rest(this.base,{
                Session:{method:"POST", params:{}}
            });
        },
        logout:function(){
            return ApiService.rest(this.base+"/logout", {
                Session:{method:"GET", params:{}}
            });
        },
        role:function(){
            return ApiService.rest(this.base+"/role/:role", {
                  check:{method:"GET", params:{role:"@role"}},
            });
        },        
        categories:function(){
            return ApiService.rest(this.base+"/category/",{
                list:{method:"GET", params:{}}
            });
        },
        forgotPassword:function(){
            return ApiService.rest(this.base+"/forgot_password",{
                set:{method:"POST", params:{}}
            });
        },
        resetPassword:function(){
            return ApiService.rest(this.base+"/reset_password",{
                reset:{method:"POST", params:{}}
            });
        }
    };
};


