var jpdbBaseURL='http://api.login2explore.com:5577';
var jpdbIRL='/api/irl';
var jpdbIML='/api/iml';
var empDBName='HR-DEPT-DB';
var userRelationName="UserRel";
var connToken="90939240|-31949294347911379|90942489";

var myName,myStatus;
var EmpId="id";
var UserEmailID="email";
var UserMobileNo=["phone"];

function checkSession(){
    console.log("Checking session");
    jQuery.ajaxSetup({async:false});
    var sessionStatus=isJpdbSessionTokenExists(connToken,empDBName,userRelationName);
    jQuery.ajaxSetup({async:true});
    console.log(" session Status: "+sessionStatus);
    if(sessionStatus===400){
        if(myStatus==="in"){
            window.location.href="login.html";
        }
        else{
            return;
        }
    } else if(sessionStatus===200){
        if(myStatus==="out"){
            window.location.href="home.html";
        }
        else{
            return;
        }
    }
}

function loadName(){
    var email=localStorage.getItem("userID");
 //       alert(email);
    $("#myUser").html(email);
    return;
}

function loadHeader(){
    $("#myHeader").load("resources/header.html");
    currentTab();
    loadName();
}
function loadHeader1(){
    $("#myHeader").load("resources/header1.html");
    currentTab();
    loadName();
}
function currentTab(){
    if(myName==="home"){
        $("#myhome").prop("class","active");
    }
    if(myName==="register"){
        $("#register").prop("class","active");
    }
    if(myName==="change"){
        $("#mychange").prop("class","active");
    }
    if(myName==="form"){
        $("#myform").prop("class","active");
    }
    return;
}

function loadFooter(){
    $("#myFooter").load("resources/footer.html");
}

function deleteSession(){
    jQuery.ajaxSetup({async:false});
    var removeSession=removeSessionTokenFromJPDB(connToken,empDBName,userRelationName);
    jQuery.ajaxSetup({async:true});
    if(removeSession===200){
        alert("Session Removed");
        localStorage.removeItem("userID");
        localStorage.removeItem("jpdbUserSessionToken");
        window.location.replace("login.html");
    }
}
