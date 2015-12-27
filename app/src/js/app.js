/* globals bl */

var app = angular.module('MedApplication', []);

app.controller('requestsCtrl', function($scope, $http, $location, $anchorScroll){
	
	$scope.user = { username: "", password: ""};
	$scope.loggeduser={};
	$scope.invalidcombo=false;


	$scope.firstpage=true;
	$scope.secondpage=false;
	$scope.thirdpage=false;

	$scope.reimburseList = [];

	$scope.rows = [];

	$scope.counter = 0;

	$scope.addRow = function() {

		$scope.rows.push($scope.counter);
		$scope.counter++;
	}

	$scope.removeRow = function(number) {

		var indextoremove = 50;
		for(i=0; i < $scope.rows.length; i++){
			if ($scope.rows[i]==number){
				indextoremove=i;
			}
		}

		$scope.rows.splice(indextoremove, 1);

	}

	$scope.selpatient = function (patient){
		$scope.selectedpatient = patient;


		$http.post("http://localhost:9000/selpat", {
			policytype: $scope.selectedpatient.policy_type
		}).then(
		function(response) {
			$scope.policy_name = response.data;
			$scope.secondpage=false;
			$scope.thirdpage=true;
			$location.hash('top');
			$anchorScroll();
		}, function(err) {

		});
		
		$http.get("http://localhost:9000/acts")
		.then(
			function(response){
				$scope.acts = response.data;
			})
	}


	$scope.login = function() {
		$http.post("http://localhost:9000/login", {
			username: $scope.user.username, password: $scope.user.password
		}).then(
		function(response) {
			$scope.loginresult = response.data;
			if($scope.loginresult[0]){
				$scope.loggeduser = $scope.loginresult[1];
				$scope.invalidcombo=false;
				$scope.firstpage=false;
				$scope.secondpage=true;


				$http.post("http://localhost:9000/pats", { docID: $scope.loggeduser.docID }
				).then(
				function(response) {
					$scope.patients = response.data;
				}, function(err){
				});

				$http.post("http://localhost:9000/reqs", {
			docID: $scope.loggeduser.docID
		}).then(
			function(response) {
				$scope.requests = response.data;
			}, function(err){
			});

			} else {
				$scope.invalidcombo = true;
			}

		}, function(err) {

		});

				
			};

			$scope.logout = function () {
				$scope.loggeduser = {};
				$scope.rows = [];
				$scope.thirdpage = false;
				$scope.secondpage = false;
				$scope.firstpage = true;
			}

			$scope.chooseAct = function (aID, index) {
				console.log(aID);
				$http.post("http://localhost:9000/reimburse", {
					actID: aID, policytype: $scope.selectedpatient.policy_type
				}).then(
				function(response) {
					$scope.reimburseList.push({ 'reimbID': index, 'reimbursement': response.data});
				}, function(err) {
				});
			}

			$scope.gotosecond = function(){
				$scope.firstpage=false;
				$scope.secondpage=true;
			}

			$scope.backtosecond = function(){
				$scope.rows = [];
				$location.hash('top');
				$anchorScroll();
				$scope.thirdpage=false;
				$scope.secondpage=true;
			}


		});
