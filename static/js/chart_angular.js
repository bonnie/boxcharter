// Boxchart code for editing charts

// create angular module with ui.bootstrap extension
app = angular.module('boxcharts', ['ui.bootstrap', 'xeditable']);
    
app.controller('ChartEditController', function ($scope, $uibModal, $http, $log) {

    // somehow get a chart ID here...
    var chart_id = false;

    $scope.chart_saved = false;

    if (chart_id) {
        $http.get("getchart/" . chart_id)
        .then(function(response) {
            $scope.sections = response.data;
        });
    } else {
        $scope.sections = [];
    }

     // new section modal window
   $scope.openNewSectionModal = function() {
       var newSectionModal = $uibModal.open({
          // animation: $scope.animationsEnabled,
          templateUrl: 'newSectionModal.html',
          controller: 'newSectionModalCtrl',
          // size: size,
        });

        newSectionModal.result.then(function (newSectionData)  {
            // give a temp ID until the chart is saved
            newSectionData.section_id = 'temp' + String($scope.sections.length);
            newSectionData.section_index = $scope.sections.length;

            // measures
            newSectionData.measures = Array();
            for (i=0; i<newSectionData.measure_count; i++) {
                    measure = {measure_index: i};
                    measure.measure_id = newSectionData.section_id + '.' + String(i);
                    measure.chords = {};
                    measure.lyrics = {};
                    newSectionData.measures.push(measure);
            }

            // finally, add section to the scope sections array
            $scope.sections.push(newSectionData);
        });

    };

    $scope.createNewMeasure = function(section_index) {
        section = $scope.sections[section_index];
        newMeasure = {};

        // give a temp ID until the chart is saved
        newMeasure.measure_id = section.section_id + '.' + String(section.measures.length);

        newMeasure.measure_index = section.measures.length;

        // newMeasure.chords = {};
        newMeasure.chords = {0:'A', 2:'E'};

        // newMeasure.lyrics = {}
        newMeasure.lyrics = {0:'on the valley', 1:'in a manger', 3:'holy holy'};

        $scope.sections[section_index].measures.push(newMeasure);

    };

    // for chord popover
    $scope.chordEditTemplate = "chordEdit.html";

    $scope.editChord = function(section_index, measure_index, chord_index) {

        $scope.sections[section_index].measures[measure_index].chords[chord_index] = 'A';

    };


    // for iterating through chords and lyrics without having to pad the arrays
    // from http://stackoverflow.com/questions/16824853/way-to-ng-repeat-defined-number-of-times-instead-of-repeating-over-array
    $scope.getNumber = function(num) {
        return new Array(num);
    };

});

// for new selection modal
app.controller('newSectionModalCtrl', function ($scope, $uibModalInstance) {

    // easy new-section-making for debugging
    $scope.newSection = {beat_count: 4,
                         verse_count: 4,
                         measure_count: 20,
                         measure_width: 4};

    $scope.ok = function () {
        $uibModalInstance.close($scope.newSection);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

// set app appearance
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

// once all the angular has loaded, un-hide the angular content
$(".hide-on-load").removeClass("hide-on-load");

