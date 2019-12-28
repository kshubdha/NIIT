function UploadImageController($scope, $element, $attrs,$http){
  $scope.uploadFile = function() {
    var file = $scope.myFile;
      var fd = new FormData();
      // Set the form params
      fd.append('file', file);
      fd.append('name','my static name');
      // Post Request to upload the image through PHP Call
      $http.post("api.php", fd, {
         transformRequest: angular.identity,
         headers: {'Content-Type': undefined}
      }).then(function(response){
        console.log(response);
      })
   }
 
}

angular.module('niitTest').component('uploadImage', {
    templateUrl: './components/upload-image-component/upload-image.html',
    controller: UploadImageController
  }).directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function() {
             scope.$apply(function() {
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }])