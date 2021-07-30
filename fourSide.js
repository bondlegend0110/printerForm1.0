var stl_viewer1 = new StlViewer ( document.getElementById("stl_cont1") );
var stl_viewer2 = new StlViewer ( document.getElementById("stl_cont2") );
var stl_viewer3 = new StlViewer ( document.getElementById("stl_cont3") );
var stl_viewer4 = new StlViewer ( document.getElementById("stl_cont4") );



stl_viewer1.add_model ( {
    id: 1,
    filename:"Stanford_Bunny.stl",
    rotationx: 0,
    rotationy: 0.5 * 3.14,
    rotationz: 0,
});

stl_viewer2.add_model ( {
    id: 1,
    filename:"Stanford_Bunny.stl",
    rotationx: 0,
    rotationy: 0.5 * 3.14,
    rotationz: 0,
});

stl_viewer3.add_model ( {
    id: 1,
    filename:"Stanford_Bunny.stl",
    rotationx: 0,
    rotationy: 0.5 * 3.14,
    rotationz: 0,
});

stl_viewer4.add_model ( {
    id: 1,
    filename:"Stanford_Bunny.stl",
    rotationx: 0,
    rotationy: 0.5 * 3.14,
    rotationz: 0,
});
