angular.module('todoApp',['ngRoute'])
 .factory('Todo', function($http){
 	var o ={};
 	o.getTodos = function(){
 		return $http.get('/api/todos').success(function(data){
 			return data;
 		});
 	}
 	o.addTask = function(item){
 		return $http.post('/api/todo',{name:item}).success(function(data){
 			return data;
 		});
 	}
 	o.remove = function(_id){
 		return $http.delete('/api/todo/'+_id).success(function(data){
 			return data;
 		});
 	}
 	return o;
 })
 .controller('TodoCtrl', function($scope, Todo){
 	$scope.refresh = function(){
 		Todo.getTodos().success(function(data){
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
 		console.log(item);
 		Todo.remove(item).success(function(data){
 			$scope.refresh();
 		}).error(function(err){
 			console.log(err);
 		});
 	}
 });