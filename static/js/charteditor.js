// non-angular javascript for chart editor

// function addHoverEffect(selector) {

//     $(selector).hover(function() {
//         $(this).toggleClass('chart-active');
//     });
// }


$(document).ready(function() {

    // mouseover to indicate editable sections of the chart
    $("#chart_content").on({
        mouseenter:function(){ $(this).addClass('chart-active'); },
        mouseleave:function(){ $(this).removeClass('chart-active'); }
    }, '.chart-editable');

});