// Boxchart code for editing charts

// create angular module
angular.module('boxcharts', [])
    .controller('ChartEditController', function ($scope, $http) {

        // somehow get a chart ID here...

        var chart_id = false;

        if (chart_id) {
            $http.get("getchart/" . chart_id)
            .then(function(response) {
                $scope.sections = response.data.sections;
            });
        } else {
            $scope.sections = [];
        }

        $scope.makeNewSection = function () {
            // var new_section = {section_name:'',
            //                     section_instructions:'',
            //                     measure_width:4,
            //                     measures:[]};
            var new_section = {section_name:'My New Section',
                                section_instructions:'Sing with feeling',
                                section_id:0,
                                measure_width:4,
                                measures:[
                                    {measure_id:1,
                                     chords:{
                                        1:'A',
                                        3:'D'
                                    },
                                    lyrics:[
                                        'Say you love me']}
                                ]

                                };
            $scope.sections.push(new_section);
        };

    });


