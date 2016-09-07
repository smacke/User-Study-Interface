/**
 * Created by Steven on 9/1/16.
 */

$(function() {
    $( "#accordion" ).accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });

    $(".tools").change(function() {
        if (this.value === "other") {
            $("#other-text").toggle();
        }
    });

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
                    function(e){
                        var x = e.clientX,
                            y = e.clientY;
                        $(" #full img")[0].src = $(this).attr('src');
                        if ( ( 2 * x ) > $("#container").width() ) {
                            $(" #full").css({top:y+1, left: (x-300-1) }).show();
                        }
                        else {
                            $(" #full").css({top:y+1, left:x+1}).show();
                        }
                    },
                    // Mouse Out
                    function(){
                        $('#full').stop(true,true).hide();
                    });
            }
        },
    }).disableSelection();

    $( "#freeze" ).click(function( event ) {
        event.preventDefault();
        var tsOfDataCollection = $(".ts-dc").length;

        if (tsOfDataCollection != 0) {
            alert("All time series in Data collection must be classified!");
        }
        else {
            $( "#DataCollection, #level1, #level2, #level3, #level4, #level5" ).sortable( "option", "disabled", true );
            $("#Questions").css("display", "block");
            $( "#freeze" ).button().hide();

            $(".level-set").each(function(i,obj){
                var idOfThis = obj.id;
                var set = $("#".concat(idOfThis)).sortable("toArray");
                var idOfSet = "".concat(idOfThis, "_set");
                $("#".concat(idOfSet)).val(set.join(";"));
            });

        }
    });

    $( "#submit" ).click(function(event) {
        $("#other-checkbox").val(document.getElementById("other-text").value);
        var toolsList = [];
        $.each($("input[name='tools']:checked"), function(){
            toolsList.push($(this).val());
        });
        $("#tools_answer").val(toolsList.join(";"));

        var features = document.forms["Questions"]["features"].value;
        if( $('input[name=difficulty]:checked').length == 0 ||
            $('input[name=confidence]:checked').length == 0 ||
            features == null || features == "" ||
            $('input[name=gender]:checked').length == 0 ||
            $('input[name=experience]:checked').length == 0 ||
            $('input[name=tools]:checked').length == 0 ) {
            alert("All questions and survey must be answered!");
            event.preventDefault();
        }
    });

});
