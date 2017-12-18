//Controller for graphics
agency.controller("graphicsController",function($scope,$http,$cookies,$rootScope,$routeParams,$location){

    //Object that contain the graphic data
    $scope.BenefitByDate={};
    $scope.BenefitByAdgency = {};

    //get selected agency data
    $rootScope.start = new Date();
    $rootScope.end = new Date($scope.start.getFullYear(),$scope.start.getMonth(),$scope.start.getDate()+7);

    /**Hide button in plotly graph*/
    function hideSomeFunctionInPloty(eltmToHide){
        for(var i = 0 ; i<eltmToHide.length; i++ ){$(eltmToHide[i]).addClass("hidden");}
    }

    /**Function that calculate the number of day between two date*/
    function dateDiff(date1, date2){
        var diff = {};
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

    /**Function which create the graphic of benefit depending on the date*/
    $rootScope.updateGaphBenefitByDate=function(){

        var graph = document.getElementById('benefitGlobal');


        var data = [
            {
                x: Object.keys($scope.BenefitByDate).length!=0?Object.keys($scope.BenefitByDate):[],
                y: Object.values($scope.BenefitByDate).length!=0?Object.values($scope.BenefitByDate):[],
                type: 'scatter',
                line: { color: 'rgb(183, 221, 110)',}
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

        //hide useless button
        hideSomeFunctionInPloty(['a[data-title="Save and edit plot in cloud"]',
            'a[data-title="Produced with Plotly"]',
            'a[data-title="Toggle Spike Lines"]',
            'a[data-title="Download plot as a png"]',
            'a[data-title="Box Select"]',
            'a[data-title="Lasso Select"]']);
    }

    /**Function which create the graphic of benefit depending on the agency*/
    $rootScope.updateGaphBenefitByAdgency=function(){

        var graph = document.getElementById('benefitByAgency');

        var data = [{
            values: Object.values($scope.BenefitByAdgency).length!=0?Object.values($scope.BenefitByAdgency):[],
            labels: Object.keys($scope.BenefitByAdgency).length!=0?Object.keys($scope.BenefitByAdgency):[],
            type: 'pie',
            marker: {
                colors: ['rgb(183, 221, 110)','rgb(240, 101, 67)','rgb(142, 188, 86)'],
            },
        }];

        var layout = {
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
        };

        Plotly.newPlot(graph, data, layout);

        //hide useless button
        hideSomeFunctionInPloty(['a[data-title="Save and edit plot in cloud"]',
            'a[data-title="Produced with Plotly"]',
            'a[data-title="Toggle Spike Lines"]',
            'a[data-title="Download plot as a png"]',
            'a[data-title="Box Select"]',
            'a[data-title="Lasso Select"]']);

    }

    $rootScope.loadRendAndProfits=function(isChild,id){
        loadAgenciesProfits(isChild,id,'api/agency/transactions/',true);
        /*loadAgenciesProfits(isChild,id,'api/agency/rents/',false);*/
    };

    /**Function which load all the transition of an agency depending on a date range*/
    function loadAgenciesProfits(isChild,id,endpoint,isTransactions){
        var promises = [];
        var rents = {};
        var config = {headers: {'Authorization': 'Bearer ' + $rootScope.token,}};

        promises.push(new Promise(function(resolve, reject){
            $http.get(endpoint+id+'/'
                + moment($scope.start).format('YYYY-MM-DD HH:mm:ss') + '/'
                + moment($scope.end).format('YYYY-MM-DD HH:mm:ss'),config).then(

                function(response)
                {
                    $.each(response.data, function(key, child){
                        child.date = moment(child.date).format('YYYY-MM-DD HH:mm:ss');
                    });
                    rents[$rootScope.MotherAgency.id] = response.data
                    resolve("success");
                },
                function(response){reject("failed");}
            );
        }));


        $.each($rootScope.listChildAgencies, function(key, child){
            promises.push(new Promise(function(resolve, reject){
                if(child){
                    $http.get(endpoint+child.id+'/'
                        + moment($scope.start).format('YYYY-MM-DD HH:mm:ss') + '/'
                        + moment($scope.end).format('YYYY-MM-DD HH:mm:ss'),config).then(

                        function(response){
                            $.each(response.data, function(key, child){
                                child.date = moment(child.date).format('YYYY-MM-DD HH:mm:ss');
                            });
                            rents[child.id]=response.data;

                            resolve("success");
                        },
                        function(response){reject("failed");}
                    );
                }
            }));
        });

        Promise.all(promises).then(function(){
            if(isTransactions){
                formatBenefitByDate(rents);
                if(!isChild){formatBenefitByAgency(rents);}
            }
            else{
            }
        });
    }

    /**Function which create an array date or hour between the range*/
    function setRangeTimeArray(){

        var s = new Date($scope.start);
        var e = new Date($scope.end);
        var nbDay = dateDiff(s, e);

        if(nbDay.day==0){
            $scope.BenefitByDate[moment(new Date(s)).format('HH:mm:ss')] = 0;

            while( s.getHours() < e.getHours() ) {
                s.setHours(s.getHours() + 1);
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

    /**Create the data object for the graphic benefit by date*/
    function formatBenefitByDate(transactions){
        $scope.BenefitByDate = {};
        var delta = setRangeTimeArray();
        $.each(transactions, function(key, agency){

            if(agency.length!=0){

                $.each(agency, function(key, transac) {
                    var date;
                    if(delta=='day'){
                        date = moment(transac.date).format('YYYY-MM-DD');
                    }
                    else{
                        date = moment(transac.date).format('hh:mm:ss');
                    }
                    $scope.BenefitByDate[date]+=transac.amount;

                });
            }
        });
        $rootScope.updateGaphBenefitByDate();
    }

    /**Create the data object for the graphic benefit by agency*/
    function formatBenefitByAgency(transactions){
        $scope.BenefitByAdgency = {};
        $.each(transactions, function(key, agency){

            if(agency.length>0) {
                $.each(agency, function (idTransac, transac) {
                    var name;
                    if($rootScope.listChildAgencies[key])
                    {
                        name = $rootScope.listChildAgencies[key].name;
                    }
                    else{
                        name = $rootScope.MotherAgency.name;

                    }

                    if (!$scope.BenefitByAdgency[name]) {
                        $scope.BenefitByAdgency[name] = 0
                    }
                    $scope.BenefitByAdgency[name] += transac.amount;

                });
            }
        });
        $rootScope.updateGaphBenefitByAdgency();
    }



});