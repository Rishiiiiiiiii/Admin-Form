function forgotPassword(){
    var email=$("#loginmail").val();
    var jsonStr={
        email:email
    };
    var getRequest=createGET_BY_KEYRequest(connToken,empDBName,userRelationName,JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async:false});
    var jsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(jsonObj.status===200){
        var record=(JSON.parse(jsonObj.data)).record;
        var pwd=record.password;
        console.log(pwd);
    
    var JsonMail={
        emailTo: email,
        emailSubject: "Password Requested",
        emailContent: "Password is: "+pwd
    }
    var mailRequest=createEmailToSendReq(connToken, JSON.stringify(JsonMail))
    jQuery.ajaxSetup({async:false});
    var jsonObj=executeCommand(mailRequest,"/serverless/send_email");
    jQuery.ajaxSetup({async:true});
        
    }
    else{
        alert("Email not found!")
    }
}


function createEmailToSendReq(token, jsonStr) {
    var sendEmailRequest = "{\n"
            + "\"token\" : \""
            + token
            + "\",\n"
            + "\"jsonStr\" : \n"
            + jsonStr
            + "\n"
            + "}";
    return sendEmailRequest;
}