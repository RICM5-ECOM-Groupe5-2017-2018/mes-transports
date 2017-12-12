agency.controller("childAgencyView",function($scope,$http,$cookies,$rootScope,$routeParams,$location){

	$scope.currentIdAgency = $routeParams.idA
    $scope.currentAgency = $rootScope.listChildAgencies[$scope.currentIdAgency];


	$scope.changeLocationToUpdatePage=function(){
		$location.path('/agency/update/'+$scope.currentIdAgency);
	};

    $scope.start = new Date();
    $scope.end = new Date($scope.start.getFullYear(),$scope.start.getMonth(),$scope.start.getDate()+7);

    $scope.BenefitByDate={};

    $scope.setIDParam=function(id){
        $routeParams.idA = id;
    }


    $('input[name="daterange"]').daterangepicker({
        "startDate": $scope.start,
        "endDate": $scope.end,
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 30,
        "showWeekNumbers": true,
        locale: {
            format: 'DD/MM/YYYY H:mm'
        }
    }, function(start, end, label) {
        $scope.start = start;
        $scope.end = end;
        loadAgenciesProfits();
    });

    function updateGaphBenefitByDate(){

        var graph = document.getElementById('benefitGlobal');


        var data = [
            {
                x: Object.keys($scope.BenefitByDate)?Object.keys($scope.BenefitByDate):[],
                y: Object.values($scope.BenefitByDate)?Object.values($scope.BenefitByDate):[],
                type: 'scatter',
                line: {
                    color: 'rgb(183, 221, 110)',
                }
            }
        ];

        var layout = {
            title: 'Bénéfice en fonction du jour',
            xaxis: {
                title: 'Date',
            },
            yaxis: {
                title: 'Bénéfice en euros',
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
        };

        Plotly.newPlot(graph, data, layout);
        resizePlots();

        //hide useless button
        hideSomeFunctionInPloty(['a[data-title="Save and edit plot in cloud"]',
            'a[data-title="Produced with Plotly"]',
            'a[data-title="Toggle Spike Lines"]',
            'a[data-title="Download plot as a png"]',
            'a[data-title="Box Select"]',
            'a[data-title="Lasso Select"]']);
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



        Promise.all(promises).then(values => {
            formatBenefitByDate(rents);
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
            $scope.BenefitByDate[moment(new Date(s)).format('HH:mm:ss')] = 0;

            while( s.getHours() < e.getHours() ) {
                s.setHours(s.getHours() + 1);
                console.log(s.getHours());
                $scope.BenefitByDate[moment(new Date(s)).format('HH:mm:ss')] = 0;
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

    function hideSomeFunctionInPloty(eltmToHide){
        for(var i = 0 ; i<eltmToHide.length; i++ ){$(eltmToHide[i]).addClass("hidden");}
    }

    function resizePlots(){
        //responsive graph
        window.onresize = function()
        {
            Plotly.Plots.resize('#benefitGlobal');
            Plotly.Plots.resize('#benefitByAgency');
        };
    }



    updateGaphBenefitByDate();


});
