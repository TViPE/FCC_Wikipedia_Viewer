var app = angular.module('WikiApp', []);
app.controller("WikiCtrl", function ($scope, $http){
	$scope.search =  function() {
		var query= $scope.searchTxt;
		var url = "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + query;
		var page = "https://en.wikipedia.org/?curid=";
		console.log(url);
		$http.get(url)
		.success(function(data){
			$scope.resultArray = [];
			var results = data.query.pages;
			angular.forEach(results, function (value, key) {
				$scope.result = {};
				$scope.result.extract = value.extract;
				$scope.result.index = value.index;
				$scope.result.ns = value.ns;
				$scope.result.pageid = value.pageid;
				$scope.result.title = value.title;
				$scope.result.pageUrl = page + $scope.result.pageid;
				$scope.resultArray.push($scope.result);
			});
			$scope.searchTxt = "";
		})	
		.error(function(data, status){
			console.log("Error" + data + status);
		})
	}
	
});