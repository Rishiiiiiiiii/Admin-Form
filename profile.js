function getData(){
var email=localStorage.getItem("userID");
var jsonStr={
        email:email
    };
var putReqStr=createGET_BY_KEYRequest(connToken,empDBName,userRelationName,JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(putReqStr,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    var record=(JSON.parse(resJsonObj.data)).record;
    $("#proemail").val(record.email);
    $("#proname").val(record.name);
    $("#prophone").val(record.phone);
    fillData();
}
    
function fillData(){    
    $("#proemail").prop("disabled",true);
    $("#proname").prop("disabled",true);
    $("#prophone").prop("disabled",true);
    $("#save").prop("disabled",true);
    $("#edit").prop("disabled",false);
}

function saveUserData(){
    jsonChange=validateData();
    if(jsonChange===""){
        return "";
    }      
    var setRequest=createSETRequest(connToken,jsonChange,empDBName,userRelationName,"UPDATE",UserEmailID,UserMobileNo,undefined);
    
    console.log(setRequest);
    jQuery.ajaxSetup({async:false});
    var jsonObj=executeCommand(setRequest,"/api/iml/set");
    jQuery.ajaxSetup({async:true});
    fillData();   
}

function editUserData(){
    $("#proname").prop("disabled",false);
    $("#prophone").prop("disabled",false);
    $("#save").prop("disabled",false);
    $("#edit").prop("disabled",true);
}

function validateData(){
    var name,phone;
    name=$("#proname").val();
    phone=$("#prophone").val();
    
    if(name===""){
        alert("Name Missing");
        $("#proname").focus()
        return "";
    }
    if(phone===""){
        alert("Phone no. Missing");
        $("#prophone").focus()
        return "";
    }
    var jsonStrObj={
        email:localStorage.getItem("userID"),
        name:name,
        phone:phone
    };
    return JSON.stringify(jsonStrObj);
}