/**
 * Created by Steven on 9/1/16.
 */

$(function() {
    $(".ts-dc").hover(
        // Mouse Over
        function(){
            $(this).animate({width: 300,height: 200}, 100);
        },
        // Mouse Out
        function(){
            $(this).animate({width: 150,height: 100}, 100);
        });

    $( "#DataCollection, #level1, #level2, #level3, #level4, #level5" ).sortable({
        revert: true,
        connectWith: "#DataCollection, #level1, #level2, #level3, #level4, #level5",
        receive: function(event, ui) {
            if (this.id == "DataCollection") {
                ui.item.removeClass("ts-level");
                ui.item.addClass("ts-dc");
                ui.item.unbind('mouseenter mouseleave');
                ui.item.animate({width: 150,height: 100}, 100);
                ui.item.hover(
                    // Mouse Over
                    function(){
                        $(this).animate({width: 300,height: 200}, 100);
                    },
                    // Mouse Out
                    function(){
                        $(this).animate({width: 150,height: 100}, 100);
                    });
            }
            else {
                ui.item.removeClass("ts-dc");
                ui.item.addClass("ts-level");
                ui.item.unbind('mouseenter mouseleave');
                ui.item.animate({width: 50,height: 34}, 100);
                ui.item.hover(
                    // Mouse Over
                    function(e){
                        var x = e.clientX,
                            y = e.clientY;
                        $(" #full img")[0].src = $(this).attr('src');
                        if ( ( 2 * x ) > $("#container").width() ) {
                            $(" #full").css({top:y, left: (x-300) }).show();
                        }
                        else {
                            $(" #full").css({top:y, left:x}).show();
                        }
                    },
                    // Mouse Out
                    function(){
                        $('#full').stop(true,true).hide();
                    });
            }
        },
    }).disableSelection();

    $( "#freeze" ).button().click(function( event ) {
        event.preventDefault();
        $( "#DataCollection, #level1, #level2, #level3, #level4, #level5" ).sortable( "option", "disabled", true );
        $("#Questions").css("display", "block");
        $( "#freeze" ).button().hide();

        $(".level-set").each(function(i,obj){
            var idOfThis = obj.id;
            var set = $("#".concat(idOfThis)).sortable("toArray");
            var idOfSet = "".concat(idOfThis, "_set");
            $("#".concat(idOfSet)).val(set.join(","));
        });
    });

    // $( "#submit" ).click(function() {
    //     alert("Finished. Thank you!");
    // });

});
