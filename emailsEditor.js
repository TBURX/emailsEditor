
var app = angular.module("editEmailsApp", []);

app.directive("emailsEditor", function() {
	var templ = ' <div onclick="this.getElementsByTagName(\'input\')[0].focus();">'+
        '<span class="email {{email.correct}}" ng-repeat="email in eMails">{{email.name}}<span class="remove" ng-click="remove($index)">&#10006;</span></span>'+
        '<input type="text" id="email-input" ng-model="emailsString" ng-change="change()" ng-keyup="keyUp($event)" ng-blur="blur()" placeholder="add more people...">'+
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
        var charSet="qwertyuiopasdfghjklzxcvbnm";
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
    $scope.remove = function($index){
        $scope.eMails.splice($index,1);
    }
});

function addEmails($scope){
    var tmpEmails = $scope.emailsString.split(",");
    var i=0;
    while(i<tmpEmails.length)
        {
            tmpEmails[i]=tmpEmails[i].trim();
            if(tmpEmails[i]==""||
               findIndexByName($scope.eMails,tmpEmails[i])>=0
              )
                tmpEmails.splice(i,1);
            else
                i++;
        }
    
    var emailRegExp = /^[a-z]+[a-z0-9._-]+@[a-z]+\.[a-z.]{2,5}$/;
    for(i=0;i<tmpEmails.length;i++)
        {
            if(emailRegExp.test(tmpEmails[i]))
                $scope.eMails.push({name: tmpEmails[i], correct:"correct"});
            else
                $scope.eMails.push({name: tmpEmails[i], correct:"wrong"});
        }
    //$scope.eMails = $scope.eMails.concat(tmpEmails);
    $scope.emailsString="";
}

function findIndexByName(source, name){
    for(i=0;i<source.length;i++){
        if(source[i].name === name)
            {
                return i;
            }
    }
    return -1;
}