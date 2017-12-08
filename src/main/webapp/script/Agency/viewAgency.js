agency.controller("agencyMainPageCtrl",function($scope,$http,$cookies,$rootScope,$routeParams,$location){

    $scope.start = new Date();
    $scope.end = new Date($scope.start.getFullYear(),$scope.start.getMonth(),$scope.start.getDate()+7);
    $scope.BenefitByDate={};
    $scope.BenefitByAdgency = {};

	$scope.setIDParam=function(id){
		$routeParams.idA = id;
	}

	$scope.changeLocationToUpdatePage=function(){
		$location.path('/agency/update/'+$rootScope.MotherAgency.id);
	};

    $('input[name="daterange"]').daterangepicker({
        "startDate": $scope.start,
        "endDate": $scope.end,
        timePicker: true,
        timePickerIncrement: 30,
        "showWeekNumbers": true,
        locale: {
            format: 'DD/MM/YYYY h:mm'
        }
    }, function(start, end, label) {
        $scope.start = start;
        $scope.end = end;
        loadAgenciesProfits();
    });

    function updateGaphBenefitByDate(){

        var data = {
            labels: Object.keys($scope.BenefitByDate),
            series: [
                {
                    data: Object.values($scope.BenefitByDate),
                }
            ]
        };

        var options = {
            axisX: {
                labelInterpolationFnc: function(value) {
                    return 'Days ' + value;
                }
            },
            axisY: {
                labelInterpolationFnc: function(value) {
                    return value+' euros';
                }
            }
        };

        var responsiveOptions = [
            ['screen and (min-width: 641px) and (max-width: 1024px)', {
                showPoint: false,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return 'Days ' + value;
                    }
                },
                axisY: {
                    labelInterpolationFnc: function(value) {
                        return value+' euros';
                    }
                }
            }],
            ['screen and (max-width: 640px)', {
                showLine: false,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return 'D ' + value;
                    }
                },
                axisY: {
                    labelInterpolationFnc: function(value) {
                        return value+'E';
                    }
                }
            }]
        ];

        new Chartist.Line('#benefitGlobal', data, options, responsiveOptions);
    }

    function updateGaphBenefitByAdgency(){

        var data = {
            labels: Object.keys($scope.BenefitByAdgency),
            series: Object.values($scope.BenefitByAdgency),
        };

        var sum = function(a, b) { return a + b };

        var options = {
            labelInterpolationFnc: function(value) {
                return value[0];
            }
        };

        var responsiveOptions = [
            ['screen and (min-width: 640px)', {
                chartPadding: 30,
                labelOffset: 100,
                labelDirection: 'explode',
                labelInterpolationFnc: function(value) {
                    return value;
                }
            }],
            ['screen and (min-width: 1024px)', {
                labelOffset: 80,
                chartPadding: 20
            }]
        ];

        new Chartist.Pie('#benefitByAgency', data, options, responsiveOptions);

    }

    function loadAgenciesProfits(){
        console.log("update");
        var promises = [];
        var rents = {};
        var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};

        promises.push(new Promise(function(resolve, reject){
            $http.get('api/agency/transactions/'+$rootScope.MotherAgency.id+'/'
                + moment($scope.start).format('YYYY-MM-DD hh:mm:ss') + '/'
                + moment($scope.end).format('YYYY-MM-DD hh:mm:ss'),config).then(

                function(response)
                {
                    $.each(response.data, function(key, child){
                        child.date = moment(child.date).format('YYYY-MM-DD hh:mm:ss');
                    });
                    rents[$rootScope.MotherAgency.id] = response.data
                    resolve("success");
                },
                function(response){console.log("Mother failed");reject("failed");}
            );
        }));

        $.each($rootScope.listChildAgencies, function(key, child){
            promises.push(new Promise(function(resolve, reject){
            $http.get('api/agency/transactions/'+child.id+'/'
                + moment($scope.start).format('YYYY-MM-DD hh:mm:ss') + '/'
                + moment($scope.end).format('YYYY-MM-DD hh:mm:ss'),config).then(

                    function(response){
                        $.each(response.data, function(key, child){
                            child.date = moment(child.date).format('YYYY-MM-DD hh:mm:ss');
                        });
                        rents[child.id]=response.data;

                        resolve("success");
                    },
                    function(response){console.log("Child "+child.id+" failed");reject("failed");}
                );
            }));
        });

        Promise.all(promises).then(values => {
            formatBenefitByDate(rents);
            formatBenefitByAdgency(rents);
        });

    }

    function dateDiff(date1, date2){
        var diff = {}
        var tmp = date2 - date1;

        tmp = Math.floor(tmp/1000);
        diff.sec = tmp % 60;

        tmp = Math.floor((tmp-diff.sec)/60);
        diff.min = tmp % 60;

        tmp = Math.floor((tmp-diff.min)/60);
        diff.hour = tmp % 24;

        tmp = Math.floor((tmp-diff.hour)/24);
        diff.day = tmp;

        return diff;
    }

    function setRangeTimeArray(){

        var s = new Date($scope.start);
        var e = new Date($scope.end);
        var nbDay = dateDiff(s, e);
        console.log(nbDay)

        if(nbDay.day==0){
            $scope.BenefitByDate[moment(new Date(s)).format('hh:mm:ss')] = 0;

            while( s.getHours() < e.getHours() ) {
                s.setHours(s.getHours() + 1);
                $scope.BenefitByDate[moment(new Date(s)).format('hh:mm:ss')] = 0;
            }
            return 'hour';
        }
        else{
            $scope.BenefitByDate[moment(new Date(s)).format('YYYY-MM-DD')] = 0;
            while( s < e ){
                s.setDate(s.getDate() + 1);
                $scope.BenefitByDate[moment(new Date(s)).format('YYYY-MM-DD')] = 0;
            }
            return 'day';
        }

    }


    function formatBenefitByDate(transactions){
        $scope.BenefitByDate = {};
        var delta = setRangeTimeArray();
        console.log($scope.BenefitByDate);
        console.log(delta);
        $.each(transactions, function(key, agency){

            if(agency.length!=0){

                $.each(agency, function(key, transac) {
                    if(delta=='day'){
                        var date = moment(transac.date).format('YYYY-MM-DD');
                    }
                    else{
                        var date = moment(transac.date).format('hh:mm:ss');
                    }
                  console.log(date);
                  $scope.BenefitByDate[date]+=transac.amount;

                });

            }

        });

        updateGaphBenefitByDate();
    }

    function formatBenefitByAdgency(transactions){
        $scope.BenefitByAdgency = {};
        $.each(transactions, function(key, agency){

            if(agency.length>0) {
                $.each(agency, function (idTransac, transac) {

                    if (!$scope.BenefitByAdgency[key]) {
                        $scope.BenefitByAdgency[key] = 0
                    }
                    $scope.BenefitByAdgency[key] += transac.amount;

                });
            }
        });
        updateGaphBenefitByAdgency();

    }

    //$scope.updateGaphs();
    //loadAgenciesProfits();

});
