/**
 * Created by Steven on 9/1/16.
 */

var fullHeight = 300;
var fullWidth = 450;

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

    userID = $("#userID").val();
    console.log("Query Name:" + $("#queryName").val());

    $("#dataset_name").val(dataset_name);
    $("#query_index").val(query_index);

    $( "#submit" ).click(function(event) {

        var features = document.forms["Questions"]["features"].value;
        var bin1_features = document.forms["Questions"]["bin1-features"].value;
        var bin2_features = document.forms["Questions"]["bin2-features"].value;
        var bin3_features = document.forms["Questions"]["bin3-features"].value;
        var bin4_features = document.forms["Questions"]["bin4-features"].value;
        if(
            $('input[name=difficulty]:checked').length == 0 ||
            $('input[name=confidence]:checked').length == 0 ||
            features == null || features == "" ||
            bin1_features == null || bin1_features == "" ||
            bin2_features == null || bin2_features == "" ||
            bin3_features == null || bin3_features == "" ||
            bin4_features == null || bin4_features == "" ) {
            alert("All questions must be answered!");
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
                    $(" #full").css({top:y+10, left: (x-fullWidth-10),height:fullHeight, width:fullWidth }).show();
                    var tsName = $(this).attr("id");
                    largeCharts(tsName, dataset_name, query_index);
                }
                else {
                    $(" #full").css({top:y+10, left:x+10,height:fullHeight, width:fullWidth}).show();
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

    $( "#DataCollection, #level1, #level2, #level3, #level4" ).sortable({
        revert: 10,
        connectWith: "#DataCollection, #level1, #level2, #level3, #level4",

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
                //userID, TSID, From, To, Millisecond from 1970.1.1
                var currentDate1 = new Date();
                var millisecond1 = currentDate1.getTime();
                $("#dragDropLogs").val( $("#dragDropLogs").val() + userID + ',' + $("#queryName").val() + ',' + ui.item[0].id + ',' + bucket2index(ui.sender[0].id) + ',' + bucket2index(this.id) + ',' + millisecond1 + '\n');
                console.log($("#dragDropLogs").val());

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
                            if ( ( 2 * x ) > $("#container").width() ) {
                                $(" #full").css({top:y+10, left: (x-fullWidth-10),height:fullHeight, width:fullWidth }).show();
                                var tsName = $(this).attr("id");
                                largeCharts(tsName, dataset_name, query_index);
                            }
                            else {
                                $(" #full").css({top:y+10, left:x+10,height:fullHeight, width:fullWidth}).show();
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
                //userID, TSID, From, To, Millisecond from 1970.1.1
                var currentDate2 = new Date();
                var millisecond2 = currentDate2.getTime();
                $("#dragDropLogs").val( $("#dragDropLogs").val() + userID + ',' + $("#queryName").val() + ',' + ui.item[0].id + ',' + bucket2index(ui.sender[0].id) + ',' + bucket2index(this.id) + ',' + millisecond2 + '\n');
                console.log($("#dragDropLogs").val());

                ui.item.removeClass("ts-dc");
                ui.item.addClass("ts-level");
                ui.item.unbind('mouseenter mouseleave');
                ui.item.animate({width: 50,height: 50, backgroundColor:'#EEEEEE'}, 10,'swing', function(){
                    var index = tsName2tsIndex(ui.item.attr("id"));
                    // alert(index.toString());
                    tsDygraphs[index].updateOptions({
                        //title:null,
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
                            if ( ( 2 * x ) > $("#container").width() ) {
                                $(" #full").css({top:y+1, left: (x-fullWidth-1),height:fullHeight, width:fullWidth }).show();
                                var tsName = $(this).attr("id");
                                largeCharts(tsName, dataset_name, query_index);
                            }
                            else {
                                $(" #full").css({top:y+1, left:x+1,height:fullHeight, width:fullWidth}).show();
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
            $("#DataCollection, #level1, #level2, #level3, #level4" ).sortable( "option", "disabled", true );
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
            //title: "".concat(dataset_name, "-",query_index),
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
                //title: tsName,
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

function bucket2index(name) {
    if (name == "DataCollection")
        return 0;
    else if(name == "level1")
        return 1;
    else if(name == "level2")
        return 2;
    else if(name == "level3")
        return 3;
    else
        return 4;
}