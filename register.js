function validateData(){
    var name,email,phone,pwd,pwd2;
    name=$("#regname").val();
    email=$("#regmail").val();
    phone=$("#regphone").val();
    pwd=$("#regpwd").val();
    pwd2=$("#regpwd2").val();
    
    var pwdlen=pwd.length;
    if(name===""){
    +    alert("Name Missing");
        $("#regname").focus();
        return "";
    }
    if(email===""){
        alert("Email Missing");
        $("#regmail").focus();
        return "";
    }
    if(phone===""){
        alert("Phone no. Missing");
        $("#regphone").focus();
        return "";
    }
    if(pwd===""|| pwdlen<6){
        alert("Password requires minimum 6 characters");
        $("#regpwd").focus();
        return "";
    }
    if(pwd2!==pwd){
        alert("Password not matching");
        $("#regpwd").val("");
        $("#regpwd2").val("");
        $("#regpwd").focus();
        return "";
    }
    
    var jsonStrObj={
        name:name,
        email:email,
        phone:phone,
        password:pwd
    };
    return JSON.stringify(jsonStrObj);
}

function resetLogin(){
    $("#regmail").val("");
    $("#regname").val("");
    $("#regphone").val("");
    $("#regpwd").val("");
    $("#regpwd2").val("");
    $("#regname").focus();
}

function checkEmail(){
    var mail=$("#regmail").val();
    var jsonStr={
        email:mail
    };
    var getRequest=createGET_BY_KEYRequest(connToken,empDBName,userRelationName,JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async:false});
    var jsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(jsonObj.status===200){
        $("#myRegFormMsg").html("Email ID already registered");
        setInterval(function(){
            $("#myRegFormMsg").html("");
        },3000);
        $("#regmail").val("");
        $("#regmail").focus();
        return "";
    }
    return "ok";
}




function saveData(){
    var jsonStr=validateData();
    if(jsonStr===""){
        return;
    }
    if(checkEmail==="") return;
    
    //var setRequest=createPUTRequest(connToken,jsonStr,empDBName,userRelationName);
    
    var setRequest=createSETRequest(connToken,jsonStr,empDBName,userRelationName,"PUT",UserEmailID,UserMobileNo,undefined);
    console.log(setRequest);
    jQuery.ajaxSetup({async:false});
    var jsonObj=executeCommand(setRequest,"/api/iml/set");
    jQuery.ajaxSetup({async:true});
    if(jsonObj.status===200){
        $("#myRegFormMsg").prop("class","alert-success");
        $("#myRegFormMsg").html("Successfully registered");
        setInterval(function(){
            window.location.replace("login.html");
        },2000);
    }
    else{
        alert("Registering failed")
        $("#myRegFormMsg").html("Unsuccessfully Registerd");
        $("#myRegFormMsg").fadeOut(3000);
        resetLogin();
    }
}


function eDBexecuteCommand(reqString, apiEndPointUrl) {
    var url = baseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}