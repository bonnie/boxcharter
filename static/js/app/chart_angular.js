// Boxchart code for editing charts

// create angular module with ui.bootstrap extension
app = angular.module('boxcharts', ['ui.bootstrap', 'xeditable'])
  
// main controller
.controller('ChartEditController', function ($uibModal, $http, $log) {

    var self = this;

    // somehow get a chart ID here...
    var chart_id = false;

    self.chart_saved = false;

    if (chart_id) {
        $http.get("getchart/" . chart_id)
        .then(function(response) {
            self.sections = response.data;
        });
    } else {
        self.sections = [];
    }

    // new section modal window
    self.openNewSectionModal = function() {
       var newSectionModal = $uibModal.open({
          // animation: self.animationsEnabled,
          templateUrl: 'newSectionModal.html',
          controller: 'newSectionModalCtrl',
          // size: size,
        });

        newSectionModal.result.then(function (newSectionData)  {
            // give a temp ID until the chart is saved
            newSectionData.section_id = 'temp' + String(self.sections.length);

            // measures
            newSectionData.measures = Array();
            for (i=0; i<newSectionData.measure_count; i++) {
                    measure = {};
                    measure.measure_id = newSectionData.section_id + '.' + String(i);
                    
                    measure.chords = Array();
                    for (j=0; j<newSectionData.beat_count; j++) {
                        chord = {};
                        chord.chord_id = measure.measure_id + '.' + String(j);
                        chord.note = '';
                        measure.chords.push(chord);
                    }

                    measure.lyrics = Array();
                    for (j=0; j<newSectionData.verse_count; j++) {
                        lyric = {};
                        lyric.lyric_id = measure.measure_id + '.' + String(j);
                        lyric.lyric_text = '';
                        measure.lyrics.push(lyric);
                    }

                    newSectionData.measures.push(measure);
            }

            // break measures into rows
            newSectionData = addRowData(newSectionData);

            // finally, add section to the scope sections array
            self.sections.push(newSectionData);
        });

    };

    self.createNewMeasure = function(section_index) {
        this_section = self.sections[section_index];
        newMeasure = {};

        // give a temp ID until the chart is saved
        newMeasure.measure_id = this_section.section_id + '.' + String(section.measures.length);

        // newMeasure.measure_index = section.measures.length;

        newMeasure.chords = {};
        // newMeasure.chords = {0:'A', 2:'E'};

        newMeasure.lyrics = {};
        // newMeasure.lyrics = {0:'on the valley', 1:'in a manger', 3:'holy holy'};

        self.sections[section_index].measures.push(newMeasure);

    };

    // for chord popover
    self.chordEditPopover = {
        templateUrl: 'chordEdit.html',
    };

    self.editChord = function(section_index, measure_index, chord_index) {

        self.sections[section_index].measures[measure_index].chords[chord_index] = 'A';

    };


    // for iterating through chords and lyrics without having to pad the arrays
    // from http://stackoverflow.com/questions/16824853/way-to-ng-repeat-defined-number-of-times-instead-of-repeating-over-array
    self.getNumber = function(num) {
        return new Array(num);
    };

})

// for new selection modal
.controller('newSectionModalCtrl', function ($scope, $uibModalInstance) {

    // easy new-section-making for debugging
    $scope.newSection = {beat_count: 4,
                         verse_count: 4,
                         measure_count: 20,
                         measures_per_line: 4,
                         verse_count: 2};

    $scope.ok = function () {
        $uibModalInstance.close($scope.newSection);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})

// set app appearance
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
