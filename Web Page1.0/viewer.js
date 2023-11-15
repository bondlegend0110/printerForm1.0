//no rotation on z for the six sides
function stlLoadCurve(file){

    var canvasList = document.getElementsByTagName("canvas");

    for (var i = 0, len = canvasList.length; i < len; i++) {
        canvasList[0].remove();
    }

    // the views are front or back. The divs that hold them are on the left or right side.
    var stl_viewer_front = new StlViewer ( document.getElementById("stl_view1") );
    stl_viewer_front.add_model ( {
        id: 1,
        local_file:file,
        rotationx:-0.4 * 3.14,
        rotationy: 0,
        rotationz: -0.15 * 3.14,
        auto_resize: true,
    });
    stl_viewer_front.set_auto_resize(true);

    var stl_viewer_back = new StlViewer ( document.getElementById("stl_view2") );
    stl_viewer_back.add_model ( {
        id: 2,
        local_file:file,
        rotationx: 0.4 * 3.14,
        rotationy: 0,
        rotationz: -0.15 * 3.14,
        auto_resize: true,
    });
    
    var stl_viewer_right = new StlViewer ( document.getElementById("stl_view3"));
    stl_viewer_right.add_model ( {
        id: 0,
        local_file:file,
        rotationx:-0.5 * 3.14,
        rotationy: 0,
        rotationz:-0.5 * 3.14,
        auto_resize: true,
    });

    var stl_viewer_left = new StlViewer ( document.getElementById("stl_view4"));
    stl_viewer_left.add_model ( {
        id: 0,
        local_file:file,
        rotationx:-0.5 * 3.14,
        rotationy: 0,
        rotationz: 0.5 * 3.14,
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