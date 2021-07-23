var stl_viewerTop = new StlViewer ( document.getElementById("stl_contTop") );
var stl_viewerButton = new StlViewer ( document.getElementById("stl_contButton") );

stl_viewerTop.add_model ( {
    id: 1,
    filename:"/Resource/stlFiles/Stanford_Bunny.stl",
    rotationx: 0.5 * 3.14,
    rotationy: 0,
    rotationz: 0,
    auto_resize: true,
});

stl_viewerButton.add_model ( {
    id: 1,
    filename:"/Resource/stlFiles/Stanford_Bunny.stl",
    rotationx: -0.5 * 3.14,
    rotationy: 0,
    rotationz: 0,
});