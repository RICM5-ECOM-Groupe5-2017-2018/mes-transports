//Controller for child agency view
agency.controller("childAgencyView",function($scope,$http,$cookies,$rootScope,$routeParams,$location){

    //get selected agency data
	$scope.currentIdAgency = $routeParams.idA

    if($rootScope.listChildAgencies) {
        $scope.currentAgency = $rootScope.listChildAgencies[$scope.currentIdAgency];
    }
    else{
        $location.path('agency/');
    }

    //init graph
    $rootScope.updateGaphBenefitByDate();

    //Change location to the update view
    $scope.changeLocationToUpdatePage=function(){
        $location.path('/agency/update/'+$scope.currentIdAgency);
    };

    //responsive graph
    window.onresize = function()
    {
        var d3 = Plotly.d3;

        var gd3 = d3.select('#benefitGlobal');
        var gd = gd3.node();
        Plotly.Plots.resize(gd);
    };

    //Date Range Piker init
    $('input[name="daterange"]').daterangepicker({
        "startDate": $rootScope.start,
        "endDate": $rootScope.end,
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 30,
        "showWeekNumbers": true,
        locale: {
            format: 'DD/MM/YYYY H:mm'
        }
    }, function(start, end, label) {
        $rootScope.start = start;
        $rootScope.end = end;
        $rootScope.loadRendAndProfits(true,$scope.currentIdAgency);
    });

    /**Function which erased the selected agency*/
    $scope.eraseAgency = function(){

        var config = {headers: {'Authorization': 'Bearer ' + $rootScope.user.token,}};
        $http.delete('api/agency/delete/'+$scope.currentIdAgency,config).then(
            function(response){

                if($rootScope.listeVehicules){
                    $rootScope.listeVehicules = $rootScope.listeVehicules.filter(function(vehicle) {
                        return vehicle.idAgency != $scope.currentIdAgency;
                    });
                }
                $rootScope.filtredVehicules = $rootScope.listeVehicules



                var newListAgency={};
                for (var i=0;i<Object.keys($rootScope.listChildAgencies).length;i++){
                    var key = Object.keys($rootScope.listChildAgencies)[i];
                    if(key!=$scope.currentIdAgency){
                        newListAgency[key] = $rootScope.listChildAgencies[key];
                    }
                }
                $rootScope.listChildAgencies=newListAgency;

                $rootScope.reloadSubAgencyMenu();
                $location.path('/agency');
            },
            function(response){}
        );

        //agencyByCity
        //listChildAgencies

    }




});
