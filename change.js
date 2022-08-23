function changePassword(){
    jsonChange=validateData();
    if(jsonChange===""){
        return "";
    }
    var updateRequest=createSETRequest(connToken,jsonChange,empDBName,userRelationName,"UPDATE",UserEmailID,UserMobileNo,undefined);
    jQuery.ajaxSetup({async:false});
    var jsonObj=executeCommand(updateRequest,"/api/iml/set");
    jQuery.ajaxSetup({async:true});
    if(jsonObj.status===200){
        alert("Password Changed");
        $("#oldpwd").val("");
        $("#pwd").val("");
        $("#pwd2").val("");
    }
    else{
        alert("Failed");
    }
}

function validateData(){
    var oldpwd,pwd,pwd2;
    oldpwd=$("#oldpwd").val();
    pwd=$("#pwd").val();
    pwd2=$("#pwd2").val();
    
    if(oldpwd===""){
        alert("Password Missing");
        $("#oldpwd").focus()
        return "";
    }
    
    if(pwd===""|| pwd.length<6){
        alert("Password requires minimum 6 characters");
        $("#pwd").focus();
        return "";
    }
    if(pwd2!==pwd){
        alert("Password not matching");
        alert(pwd+"\n"+pwd2);
        $("#pwd").val("");
        $("#pwd2").val("");
        $("#pwd").focus();
        return "";
    }
    var jsonStrObj={
        email:localStorage.getItem("userID"),
        password:pwd
    };
    return JSON.stringify(jsonStrObj);
}