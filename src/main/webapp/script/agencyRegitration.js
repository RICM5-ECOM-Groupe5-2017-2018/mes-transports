angular.module('MainModel').controller("Resgistration",function($scope,$http){
	
	var data = $.param({
        fName: "blop",
        lName: "blop"
    });

    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }
    
    $http.get('api/user/structure')
    .success(function (data, status, headers, config) {
        //$scope.Details = data;
        createForm(data);
    })
    .error(function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
            "<br />status: " + status +
            "<br />headers: " + jsonFilter(header) +
            "<br />config: " + jsonFilter(config);
    });
	
    
    function createForm(data){
    	var form = "<div>";
    	$.each(data, function(i, val) {
    		/*default:"null"
			key:"PRI"
			name:"id"
			nullabble:"NO"
			type:"int(11)"*/
    		
    		if(val.extra!="auto_increment")
			{
    			form+="<div class=\"form-group\">\n"
	    		form+="<label for=\""+val.id+"\">"+val.name+"</label>\n"
	    		if(val.nullabble="NO"){
	    			form+="<input type=\"text\" class=\"form-control\" id=\""+val.id+"\" value=\""+val.defaultVal==NULL?"":val.defaultVal+"\" required>\n"
	    		}
	    		else{
	    			form+="<input type=\"text\" class=\"form-control\" id=\""+val.id+"\">\n"
	    		}
	    		
	    		form+="</div>\n"
			}
    		
    		  //$("#" + i).append(document.createTextNode(" - " + val));
    		console.log(val);
    	});
    	
    	form += "</div>";
    	//document.getElementById("#mainContainer").innerHTML = form;
    	//angular.element('#mainContainer').append(form);
    	$('#mainContainer').append(form);
    	
    }
    
	$scope.getRegistrationStructure = function () {

//         $http.post('/structure', data, config)
//         .success(function (data, status, headers, config) {
//             //$scope.PostDataResponse = data;
//         })
//         .error(function (data, status, header, config) {
//             /*$scope.ResponseDetails = "Data: " + data +
//                 "<hr />status: " + status +
//                 "<hr />headers: " + header +
//                 "<hr />config: " + config;*/
//         });
     };
	
	
});