var app = angular.module("insertCompiler", []);
var injtor = angular.injector(['ng','insertCompiler']);
// this does not work
// var scope = injtor.get('$rootScope');
// 		scope.user = { name: "john" }
// var myScope = null;
app.controller('Controller', function($scope) {
	// scope id: 2, parent scope id: 1
	console.log('controller scope:', $scope)
  $scope.user = { 
  	name :"jack"
	 }
});	

angular.element(function(){
	$('#compile').click(function(){

		// bootstrap works with ng-cotroller, bootstrap does not have overloads that take scope parameter
		angular.bootstrap(angular.element('#container'), ['insertCompiler']);
		return;
	})

	$('#insert').click(function(e){
		var compile1, compile2, scope1, scope2;
		$('#container').append('<b>The user is: {{ user.name }}</b>')
		var appElement = angular.element('#container');

		
		var injt1 = appElement.injector()
		injt1.invoke(function($compile, $rootScope){
			//scopeid: 1
			console.log('rootScope id:', $rootScope.$id)
			compile1 = $compile;
			scope1 = $rootScope;
			$compile(appElement)(appElement.scope());
		});
		

		// this also works
		var injtor = angular.injector(['ng', 'insertCompiler']);
		console.log('injtor==', injtor === injt1)
		// create a new scope
		var scope = injtor.get('$rootScope');

		// false
		console.log('scope:', scope === scope1);

		console.log('scope id:', scope.$id)

		// if uncomment below line and remove the ng-Controller on #container element, displaying tom
		scope.user = { name: "tom" }
		injtor.invoke(function($compile, $rootScope){
			// scope === $rootScope true
			compile2 = $compile;
			$compile(appElement.contents())(scope);  //appElement.scope()
		})

		// false
		console.log(compile2 === compile1)
	});


})