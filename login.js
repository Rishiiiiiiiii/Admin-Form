function checkUser(){
    var email=$("#loginmail").val();
    var pwd=$("#loginpwd").val();
    var jsonStr={
        email:email,
        password:pwd
    };
    var getRequest=createGET_BY_KEYRequest(connToken,empDBName,userRelationName,JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async:false});
    var jsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(jsonObj.status===400){
        $("#mymsg").html("Incorrect email or password");
        alert("Incorrect email or password")
        $("#mymsg").fadeOut(4000);
        $("#loginmail").val("");
        $("#loginpwd").val("");
        $("#loginmail").focus();
    }
    else if(jsonObj.status===200){
        createSession(email);
    }
}

function createSession(email){
    
    jQuery.ajaxSetup({async:false});
    var sessionTokenStatus=eDBcreateJpdbSessionToken(connToken,1,empDBName,userRelationName,email);
    jQuery.ajaxSetup({async:true});
    
    if(sessionTokenStatus===200){
        if(localStorage.getItem("req-url")!==null){
            window.location.href=localStorage.getItem("req-url");
            localStorage.removeItem("req-url");
        }
        else{
            window.location.replace("home.html");
        }
    }
    else{
        $("#loginmail").val("");
        $("#loginpwd").val("");
        alert("Unable to login");
        return;
    }
    return;
}


function eDBcreateJpdbSessionToken(token, seedValue, dbName, relName, userID) {

    //Creating getSessionToken request 
    var getSessionReq = "{\n"
            + "\"token\":\"" + token + "\",\n"
            + "\"jsonStr\":{\"seedValue\":" + seedValue + "}\n}";

    //Executing getSessionToken request
    var respSessionReq = eDBexecuteCommand(getSessionReq, "/serverless/get_new_session");
    //Checking if session token is created or not by the response of getSessionToken request
    var getSessionTokenStatus = respSessionReq.status;

    if (getSessionTokenStatus === JPDB_SUCCESS_CODE) {
        //Getting session token and setting it on the local storage
        var data = respSessionReq.data;
        var dataObj = JSON.parse(data);
        var jpdbSessionToken = dataObj.sessionToken;

        //Inserting the session token in the relation provided by user
        var dataToPut = {
            jpdbUserSessionToken: jpdbSessionToken,
            email: userID
        };
        var dataPutObj = JSON.stringify(dataToPut);
        var sessionRelName = relName + "_session";
        //creating put request to insert session token of the respective user
        var putReqStr = createPUTRequest(token, dataPutObj, dbName, sessionRelName);
        //Executing put request
        var respPUTReq = executeCommand(putReqStr, "/api/iml");

        var putStatus = respPUTReq.status;
        if (putStatus === 200) {
            localStorage.setItem('jpdbUserSessionToken', jpdbSessionToken);
            localStorage.setItem("userID", userID);  //storing email id as user id in browser local storage
            return JPDB_SUCCESS_CODE;
        }
        return putStatus;
    }
    return getSessionTokenStatus;
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