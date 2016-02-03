angular.module('todoApp'[]);
.factory('Todo', function($http){
	var o = {};
	o.getTodos = function(){
		return $http.get('/api/todos').success(function(data){
			return data;
		});
	}

	o.addTask = function(item){
		return $http.post('/api/todo', {name: item}).success(function(data){
			return data;
		});
	}

	o.remove = function(item){
		return $http.delete('/api/todo').success(function(data){
			return data;
		});
	}

	

});

.controller('TodoCntrl', function($scope, todo){
	$scope.refresh = function(){
		Todo.gettodos().success(function(data){
			$scope.todos = data;
		}).error(function(err){
			console.log(err);
		});
	}
	$scope.refresh();

	$scope.addTask = function(item){
		Todo.addTask(item).success(function(data){
			$scope.refresh();

		}).error(function(err){

		});
	}

	$scope.removeTask = function(item){
		Todo.remove(item).success(function(data){
			$scope.refresh();
		}).error(function(err){

		});
	}

});