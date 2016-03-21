
var app = angular.module("editEmailsApp", []);

app.directive("emailsEditor", function() {
	var templ = ' <div onclick="this.getElementsByTagName(\'input\')[0].focus();">'+
        '{{eMails.toString()}}'+
        '<input id="input" type="text" ng-model="emailsString" ng-change="change()" ng-keyup="keyUp($event)" ng-blur="blur()" placeholder="add more people...">'+
        '</div>';
    return {
        template : templ/*,
        scope:{
            emailsString:"@",
            eMails:"="
        }*/
    };
});

app.controller("controller", function($scope){
    $scope.emailsString="";
    $scope.eMails = [];
	$scope.getEmailsCount = function(){
		alert("e-mails count is: " + $scope.eMails.length);
	};
    $scope.addEmails = function(){
        var charSet="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        var sample="";
        var len=Math.floor(Math.random()*8+3);
        for(i=0; i<len; i++)
            {
                sample+=charSet[Math.floor(Math.random()*charSet.length)];
            }
        sample+="@";
        len=Math.floor(Math.random()*8+3);
        for(i=0; i<len; i++)
            {
                sample+=charSet[Math.floor(Math.random()*charSet.length)];
            }
        sample+=".";
        len=Math.floor(Math.random()*2+2);
        for(i=0; i<len; i++)
            {
                sample+=charSet[Math.floor(Math.random()*charSet.length)].toLowerCase();
            }
        $scope.emailsString=sample;
        addEmails($scope);        
    };
    $scope.change = function(){
        if($scope.emailsString.indexOf(",")>=0 )
        {
            addEmails($scope);
        }
    };
    $scope.keyUp = function($event){
        if($event.keyCode==13)
        {
            addEmails($scope);
        }
    };
    $scope.blur = function(){
            addEmails($scope);
    };
});

function addEmails($scope){
    var tmpEmails = $scope.emailsString.split(",");
    var i=0;
    while(i<tmpEmails.length)
        {
            tmpEmails[i]=tmpEmails[i].trim();
            if(tmpEmails[i]=="")
                tmpEmails.splice(i,1);
            else
                i++;
        }
    $scope.eMails = $scope.eMails.concat(tmpEmails);
    $scope.emailsString="";
}