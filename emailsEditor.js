
var app = angular.module("editEmailsApp", []);

app.controller("controller", function($scope){
    $scope.emailsString="";
    $scope.eMails = [];
	$scope.getEmailsCount = function(){
		alert("e-mails count is: " + $scope.eMails.length);
	};
    $scope.change = function(){
        if($scope.emailsString.charAt($scope.emailsString.length-1)==",")
        {
            $scope.eMails = $scope.eMails.concat(
                $scope.emailsString.substr(
                    0,$scope.emailsString.length-1
                ).split(",")
            );
            $scope.emailsString="";
            for (it in $scope.eMails)
            {
                it.trim();
            }
        }
    };
});
app.directive("emailsEditor", function() {
	var templ = ' <div onclick="this.getElementsByTagName(\'input\')[0].focus();">'+
        '{{eMails.toString()}}'+
        '<input id="input" type="text" ng-model="emailsString" ng-change="change()" placeholder="add more people...">'+
        '</div>';
    return {
        template : templ,
        scope:{}
    };
});