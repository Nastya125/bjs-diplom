"use strict";

const userForm = new UserForm(); 

userForm.loginFormCallback = data => {
    
    ApiConnector.login(data,
        function(responseBody){
            if(!responseBody.success){
                userForm.setLoginErrorMessage(responseBody.error);
                console.log(responseBody);   
            } else {
                location.reload();
            }
        }
    )

}

userForm.registerFormCallback = data => {

    ApiConnector.register(data,
        function(responseBody){
            if(!responseBody.success){
                userForm.setRegisterErrorMessage(responseBody.error)
            } else {
                location.reload()
            }
        }
    )
    
}









