// Boxchart code for editing charts

// create angular module with ui.bootstrap extension
ngApp = angular.module('boxcharts', ['ui.bootstrap']);
    
ngApp.controller('ChartEditController', function ($scope, $uibModal, $http) {

    // somehow get a chart ID here...

    var chart_id = false;

    if (chart_id) {
        $http.get("getchart/" . chart_id)
        .then(function(response) {
            $scope.sections = response.data;
        });
    } else {
        $scope.sections = [];
    }

    $scope.makeNewSection = function () {
        // var new_section = {section_name:'',
        //                     section_instructions:'',
        //                     measure_width:4,
        //                     measures:[]};

        var newSectionModal = $uibModal.open({
          // animation: $scope.animationsEnabled,
          templateUrl: 'newSectionModal.html',
          controller: 'newSectionModalCtrl',
          // size: size,
          resolve: {
            new_section: function () {
              return $scope.new_section;
            }
          }
        });

        newSectionModal.result.then(function () {
            $scope.new_section.measures = [];
            $scope.new_section.sect_num = $scope.sections.length();
            $scope.new_section.section_id = 'temp' + str(sections.length());
            $scope.sections.append(new_section);
        });

// ************

    //     // close modal window
    //     $("#newSectionModal").modal('hide');

    //     // debugging
    //     console.log(modal_data);

    //     // assign temporary section ID; 
    //     // will transform into actual section ID when chart is saved

    //     var new_section = {section_name:'My New Section',
    //                         section_instructions:'Sing with feeling',
    //                         section_id:0,
    //                         measure_width:4,
    //                         measures:[
    //                             {measure_id:1,
    //                              chords:{
    //                                 1:'A',
    //                                 3:'D'
    //                             },
    //                             lyrics:[
    //                                 'Say you love me']}
    //                         ]

    //                         };
    //     $scope.sections.push(new_section);
    };

    $scope.makeNewMeasure = function(section_id) {
        section = $scope.sections[section_id];

        // add the new measure to the chart on the server, to get a mesaure_id
        // var new_measure_post = $.post( "", function() {
        //   alert( "success" );
        // })
        //   .done(function() {
        //     alert( "second success" );
        //   })
        //   .fail(function() {
        //     alert( "error" );
        //   })
        //   .always(function() {
        //     alert( "finished" );
        // });
         
        // // Perform other work here ...
         
        // // Set another completion function for the request above
        // new_measure_post.always(function() {
        //   alert( "second finished" );
        // });

        // assign temporary measure ID; 
        // will transform into actual measure ID when chart is saved
        //var new_measure = {measure_id = null}

    };

});

// for new selection modal
ngApp.controller('newSectionModalCtrl', function ($scope, $uibModalInstance) {

  // $scope.items = items;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


