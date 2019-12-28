function SearchImageController($scope,$http){
 var ctrl = this ;

//  Get request to fetch all images through PHP Call
  $http.get("api.php")
  .then(function(response) {
    console.log(response.data);
   
  
    $scope.imageList = response.data; 
    $scope.imageSize = "300";
  });
  socket.on("new_image",function (data){
    $scope.imageList = '';
    $scope.imageList = data; 
    $scope.imageSize = "300";
  })
}

angular.module('niitTest').component('searchImage', {
    templateUrl: './components/search-image-component/search-image.html',
    controller: SearchImageController
  });