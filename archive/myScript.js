/**
 * Created by Steven on 8/30/16.
 */

$(function() {

    $( "#submit").button().hide();

    $("#DataCollection").sortable({
        revert: true,
        connectWith: "#Top-k"
    });

    $( "#Top-k" ).sortable({
        revert: true,
        connectWith: "#DataCollection",

        receive: function(event, ui) {
            var $this = $(this);
            if ($this.children('div').length > 5) {
                $(ui.sender).sortable('cancel');
            }
        }
    });

    $( "#freeze" ).button().click(function( event ) {
        event.preventDefault();
        $( "#Top-k, #DataCollection" ).sortable( "option", "disabled", true );
        $("#Top-k :input").prop('disabled', true);
        $("#Questions").css("display", "block");
        $( "#freeze" ).button().hide();
        $( "#submit").button().show();
    });

    $( "#submit" ).button().click(function( event ) {
        event.preventDefault();
        alert("Finished. Thank you!");
    });
});