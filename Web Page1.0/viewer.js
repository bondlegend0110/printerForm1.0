//no rotation on z for the six sides
function stlLoad(file,stlName,number){

    var canvasList = document.getElementsByTagName("canvas");

    for (var i = 0, len = canvasList.length; i < len; i++) {
        canvasList[number].remove();
    }

    var stl_viewer = new StlViewer ( document.getElementById(stlName) );

    stl_viewer.add_model ( {
        id: number,
        local_file:file,
        rotationx: 0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
        auto_resize: true,
    });
}

function loadBasic(){
    stl_viewerMain.remove_model(1);
    stl_viewerMain.add_model({id:1, filename:"Stanford_Bunny.stl", animation:{delta:{rotationx:1,rotationy:0.5, msec:1000, loop:true}}});

}

// $( function() {
//     $( "#stl_contTop" ).draggable({ axis: "y" });
//     $( "#stl_contButton" ).draggable({ axis: "y" , containment: "#printPreview"});
//     $( "#annoDisplay" ).draggable({containment: "#printPreview"});
//   } );