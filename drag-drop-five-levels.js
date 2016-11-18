/**
 * Created by Steven on 9/1/16.
 */


$(function() {

    $("#container").load("template.html",function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success") {
            var dataset_name = $("#DatasetName").val();
            var query_index = $("#QueryIndex").val();

            var path = "data/".concat(dataset_name, "/", query_index, "/TSIndexList.txt");
            $("#DataCollection").load(path,function(responseTxt, statusTxt, xhr){
                if(statusTxt == "success")
                    initialize(dataset_name, query_index);
                if(statusTxt == "error")
                    alert("Error: " + xhr.status + ": " + xhr.statusText);
            });
        }
        if(statusTxt == "error") {
            alert("Error: " + xhr.status + ": " + xhr.statusText);
        }
    });
});

function initialize(dataset_name, query_index) {

    $("#dataset_name").val(dataset_name);
    $("#query_index").val(query_index);

    $(".tools").change(function() {
        if (this.value === "other") {
            $("#other-text").toggle();
        }
    });

    $( "#submit" ).click(function(event) {
        $("#other-checkbox").val("other-".concat($("#other-text").val()));
        var toolsList = [];
        $.each($("input[name='tools']:checked"), function(){
            toolsList.push($(this).val());
        });
        $("#tools_answer").val(toolsList.join(";"));
        $("#other-checkbox").val("other");

        var features = document.forms["Questions"]["features"].value;
        var bin1_features = document.forms["Questions"]["bin1-features"].value;
        var bin2_features = document.forms["Questions"]["bin2-features"].value;
        var bin3_features = document.forms["Questions"]["bin3-features"].value;
        var bin4_features = document.forms["Questions"]["bin4-features"].value;
        var bin5_features = document.forms["Questions"]["bin5-features"].value;
        if( $('input[name=difficulty]:checked').length == 0 ||
            $('input[name=confidence]:checked').length == 0 ||
            features == null || features == "" ||
            bin1_features == null || bin1_features == "" ||
            bin2_features == null || bin2_features == "" ||
            bin3_features == null || bin3_features == "" ||
            bin4_features == null || bin4_features == "" ||
            bin5_features == null || bin5_features == "" ||
            $('input[name=gender]:checked').length == 0 ||
            $('input[name=experience]:checked').length == 0 ||
            $('input[name=tools]:checked').length == 0 ) {
            alert("All questions and survey must be answered!");
            event.preventDefault();
        }
    });

    hoverEnabled = true;

    createDygraphs(dataset_name, query_index);

    $( "#accordion" ).accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });

    $(".ts-dc").hover(
        // Mouse Over
        function(e){

            if (hoverEnabled) {
                var x = e.clientX,
                    y = e.clientY;
                if ( ( 2 * x ) > $("#container").width() ) {
                    $(" #full").css({top:y+10, left: (x-300-10),height:200, width:300 }).show();
                    var tsName = $(this).attr("id");
                    largeCharts(tsName, dataset_name, query_index);
                }
                else {
                    $(" #full").css({top:y+10, left:x+10,height:200, width:300}).show();
                    var tsName = $(this).attr("id");
                    largeCharts(tsName, dataset_name, query_index);
                }
            }
        },
        // Mouse Out
        function(){

            $('#full').stop(true,true).hide();
            $('#full div').hide();
        });

    $( "#DataCollection, #level1, #level2, #level3, #level4, #level5" ).sortable({
        revert: 10,
        connectWith: "#DataCollection, #level1, #level2, #level3, #level4, #level5",

        start: function() {
            // alert("drag begin!");
            $('#full').stop(true,true).hide();
            $('#full div').hide();
            hoverEnabled = false;
        },
        stop: function() {
            hoverEnabled = true;
        },

        receive: function(event, ui) {
            if (this.id == "DataCollection") {
                $('#full').stop(true,true).hide();
                ui.item.removeClass("ts-level");
                ui.item.addClass("ts-dc");
                ui.item.unbind('mouseenter mouseleave');
                ui.item.animate({width: 150,height: 100, backgroundColor: 'white'}, 10, 'swing', function(){
                    var tsName = ui.item.attr("id");
                    var index = tsName2tsIndex(tsName);
                    // alert(index.toString());
                    tsDygraphs[index].updateOptions({
                        // title:tsName,
                        // xAxisLabelWidth:0,
                        // yAxisLabelWidth:0
                        axes: {
                            x: {axisLabelWidth: 0},
                            y: {axisLabelWidth: 0}
                        }
                    });
                    tsDygraphs[index].resize();
                });
                ui.item.hover(
                    // Mouse Over
                    function(e){

                        if (hoverEnabled) {
                            var x = e.clientX,
                                y = e.clientY;
                            // $(" #full img")[0].src = $(this).attr('src');
                            if ( ( 2 * x ) > $("#container").width() ) {
                                // $(" #full").css({top:y+1, left: (x-300-1) }).show();
                                $(" #full").css({top:y+10, left: (x-300-10),height:200, width:300 }).show();
                                var tsName = $(this).attr("id");
                                largeCharts(tsName, dataset_name, query_index);
                            }
                            else {
                                $(" #full").css({top:y+10, left:x+10,height:200, width:300}).show();
                                var tsName = $(this).attr("id");
                                largeCharts(tsName, dataset_name, query_index);
                            }
                        }
                    },
                    // Mouse Out
                    function(){

                        $('#full').stop(true,true).hide();
                        $('#full div').hide();
                    });
            }
            else {
                ui.item.removeClass("ts-dc");
                ui.item.addClass("ts-level");
                ui.item.unbind('mouseenter mouseleave');
                ui.item.animate({width: 50,height: 50, backgroundColor:'#EEEEEE'}, 10,'swing', function(){
                    var index = tsName2tsIndex(ui.item.attr("id"));
                    // alert(index.toString());
                    tsDygraphs[index].updateOptions({
                        title:null,
                        // xAxisLabelWidth:0,
                        // yAxisLabelWidth:0
                        axes: {
                            x: {axisLabelWidth: 0},
                            y: {axisLabelWidth: 0}
                        }
                    });
                    tsDygraphs[index].resize();
                });
                ui.item.hover(
                    // Mouse Over
                    function(e){
                        if (hoverEnabled) {
                            var x = e.clientX,
                                y = e.clientY;
                            // $(" #full img")[0].src = $(this).attr('src');
                            if ( ( 2 * x ) > $("#container").width() ) {
                                // $(" #full").css({top:y+1, left: (x-300-1) }).show();
                                $(" #full").css({top:y+1, left: (x-300-1),height:200, width:300 }).show();
                                var tsName = $(this).attr("id");
                                largeCharts(tsName, dataset_name, query_index);
                            }
                            else {
                                $(" #full").css({top:y+1, left:x+1,height:200, width:300}).show();
                                var tsName = $(this).attr("id");
                                largeCharts(tsName, dataset_name, query_index);
                            }
                        }
                    },
                    // Mouse Out
                    function(){
                        $('#full').stop(true,true).hide();
                        $('#full div').hide();
                    });
            }
        }
    }).disableSelection();

    $( "#freeze" ).click(function( event ) {
        event.preventDefault();
        var tsOfDataCollection = $(".ts-dc").length;

        if (tsOfDataCollection != 0) {
            alert("All time series in Data collection must be classified!");
        }
        else {
            $("#DataCollection, #level1, #level2, #level3, #level4, #level5" ).sortable( "option", "disabled", true );
            $("#Questions").css("display", "block");
            $("#freeze" ).button().hide();
            document.getElementById("DataCollection-container").style.display="none";

            $(".level-set").each(function(i,obj){
                var idOfThis = obj.id;
                var set = $("#".concat(idOfThis)).sortable("toArray");
                var idOfSet = "".concat(idOfThis, "_set");
                $("#".concat(idOfSet)).val(set.join(";"));
            });

        }
    });

}

function createDygraphs(dataset_name, query_index) {

    fullDygraph = new Dygraph(
        document.getElementById("full"),
        "data/".concat(dataset_name, "/", query_index, "/query.csv"),
        {
            drawGrid:false,
            labelsDivWidth:0,
            interactionModel: Dygraph.Interaction.nonInteractiveModel_,
            highlightCircleSize: 0,
            // yAxisLabelWidth:20
            axes: {
                y: {axisLabelWidth: 20}
            }
        }
    );

    tsDygraphs = new Array();
    tsNameArray = new Array();
    tsNameArray[0] = "query-chart";
    tsDygraphs[0] = new Dygraph(
        document.getElementById("query-chart"),
        "data/".concat(dataset_name, "/", query_index, "/query.csv"),
        {
            title: "".concat(dataset_name, "-",query_index),
            drawGrid:false,
            labelsDivWidth:0,
            interactionModel: Dygraph.Interaction.nonInteractiveModel_,
            highlightCircleSize: 0,
            // yAxisLabelWidth:20
            axes: {
                y: {axisLabelWidth: 20}
            }
        }
    );

    $("#DataCollection > div").each(function (index) {
        var tsName = $(this).attr("id");
        tsNameArray[index+1] = tsName;
        tsDygraphs[index+1] = new Dygraph(
            // document.getElementById(tsName),
            this,
            "data/".concat(dataset_name, "/", query_index, "/", tsName, ".csv"),
            {
                // title: tsName,
                // titleHeight: 26,
                drawGrid:false,
                labelsDivWidth:0,
                interactionModel: Dygraph.Interaction.nonInteractiveModel_,
                highlightCircleSize: 0,
                // xAxisLabelWidth:0,
                // yAxisLabelWidth:0
                axes: {
                    x: {axisLabelWidth: 0},
                    y: {axisLabelWidth: 0}
                }
            }
        );
    });
}

function tsName2tsIndex(tsName) {
    for ( var i = 0; i < tsNameArray.length; i++) {
        if (tsName == tsNameArray[i]) {
            return i;
        }
    }
    return 0;
}

function largeCharts(tsName, dataset_name, query_index) {
    // fullDygraph.destroy();
    fullDygraph = new Dygraph(
        document.getElementById("full"),
        "data/".concat(dataset_name, "/", query_index, "/", tsName, ".csv"),
        {
            //title:tsName,
            drawGrid:false,
            labelsDivWidth:0,
            interactionModel: Dygraph.Interaction.nonInteractiveModel_,
            highlightCircleSize: 0,
            // xAxisLabelWidth:30,
            // yAxisLabelWidth:20
            axes: {
                x: {axisLabelWidth: 30},
                y: {axisLabelWidth: 20}
            }
        }
    );
}