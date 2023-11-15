var stl_viewer_front;
var stl_viewer_back;
var stl_viewer_right;
var stl_viewer_left;
var b =
[[0,0,0],
[0,0,0],
[0,0,0],
[0,0,0]]

function stlLoadCurve(file){

    var canvasList = document.getElementsByTagName("canvas");

    for (var i = 0, len = canvasList.length; i < len; i++) {
        canvasList[0].remove();
    }

    // the views are front or back. The divs that hold them are on the left or right side.
    stl_viewer_front = new StlViewer ( document.getElementById("stl_view1") );
    stl_viewer_front.add_model ( {
        id: 0,
        local_file:file,
        rotationx:-0.40 * 3.14,
        rotationy: 0,
        rotationz:-0.15 * 3.14,
        auto_resize: true,
    });
    stl_viewer_front.set_auto_resize(true);

    stl_viewer_back = new StlViewer ( document.getElementById("stl_view2") );
    stl_viewer_back.add_model ( {
        id: 0,
        local_file:file,
        rotationx: 0.40 * 3.14,
        rotationy: 1 * 3.14,
        rotationz: 0.15 * 3.14,
        auto_resize: true,
    });
    
     stl_viewer_right = new StlViewer ( document.getElementById("stl_view3"));
    stl_viewer_right.add_model ( {
        id: 0,
        local_file:file,
        rotationx:-0.5 * 3.14,
        rotationy: 0,
        rotationz:-0.5 * 3.14,
        auto_resize: true,
    });

    stl_viewer_left = new StlViewer ( document.getElementById("stl_view4"));
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

function stlViewRotate(a){
        stl_viewer_front.rotate(0,a[0][0],a[0][1],a[0][2]);
        b[0]=[a[0][0]+b[0][0],a[0][1]+b[0][1],a[0][2]+b[0][2]];
        stl_viewer_back.rotate(0,a[1][0],a[1][1],a[1][2]);
        b[1]=[a[1][0]+b[1][0],a[1][1]+b[1][1],a[1][2]+b[1][2]];
        stl_viewer_left.rotate(0,a[2][0],a[2][1],a[2][2]);
        b[2]=[a[2][0]+b[2][0],a[2][1]+b[2][1],a[2][2]+b[2][2]];
        stl_viewer_right.rotate(0,a[3][0],a[3][1],a[3][2]);
        b[3]=[a[3][0]+b[3][0],a[3][1]+[3][1],a[3][2]+b[3][2]];
}

function stlViewsetRotation(a){
    stl_viewer_front.rotate(0,a[0][0]-b[0][0],a[0][1]-b[0][1],a[0][2]-b[0][2]);
    b[0]=a[0];
    stl_viewer_back.rotate(0,a[1][0]-b[1][0],a[1][1]-b[1][1],a[1][2]-b[1][2]);
    b[1]=a[1];
    stl_viewer_left.rotate(0,a[2][0]-b[2][0],a[2][1]-b[2][1],a[2][2]-b[2][2]);
    b[2]=a[2];
    stl_viewer_right.rotate(0,a[3][0]-b[3][0],a[3][1]-[3][1],a[3][2]-b[3][2]);
    b[3]=a[3];
}

// $( function() {
//     $( "#stl_contTop" ).draggable({ axis: "y" });
//     $( "#stl_contButton" ).draggable({ axis: "y" , containment: "#printPreview"});
//     $( "#annoDisplay" ).draggable({containment: "#printPreview"});
//   } );