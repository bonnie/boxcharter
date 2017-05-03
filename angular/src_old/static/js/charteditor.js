// non-angular javascript for chart editor

// function addHoverEffect(selector) {

//     $(selector).hover(function() {
//         $(this).toggleClass('chart-active');
//     });
// }


// for organizing rows based on display data
addRowData = function(section) {

    // to track content of rows
    section.measureRows = Array();

    // to track which row we're on
    var thisRow = Array();

    // add measures to rows
    for (var i=0; i<section.measures.length; i++) {

        thisRow.push(section.measures[i]);

        // time to increment the rownum?
        if ((i + 1) % section.measures_per_line === 0 ) {
            section.measureRows.push(thisRow);
            thisRow = Array();
        }

    }

    return section;
};


$(document).ready(function() {

    // mouseover to indicate editable sections of the chart
    $("#chart_content").on({
        mouseenter:function(){ $(this).addClass('chart-active'); },
        mouseleave:function(){ $(this).removeClass('chart-active'); }
    }, '.chart-editable');

});

// angular.element(document.getElementById('chart-content')).scope().ce.sections[0]