/**
 * Created by chenyulu on 15/10/16.
 */
$(document)
    .ready(function() {

        // fix menu when passed
        $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function() {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function() {
                    $('.fixed.menu').transition('fade out');
                }
            })
        ;

        // create sidebar and attach to menu open
        $('.ui.sidebar')
            .sidebar('attach events', '.toc.item')
        ;

    })
;

$(document)
    .ready(function(){
        $('.ui.accordion')
            .accordion()
        ;
        $('.ui.checkbox')
            .checkbox()
        ;
        $('select.dropdown')
            .dropdown()
        ;
    })
;

