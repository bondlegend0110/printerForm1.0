var stl_viewerMain = new StlViewer ( document.getElementById("stl_contMain"));
//JavaScript for the Preview button
//Back Button
document.getElementById('backPreviewBtn').addEventListener('click', function() {
    sessionStorage.setItem('showUploadPopup', 'true');
    window.location.href = './index.html';
});
//Next Button
document.getElementById('nextPreviewBtn').addEventListener('click', function() {
    document.getElementById('formSelectionPopup').style.display = 'block';
});

//JavaScript for the Form Selection buttons

//Close Button
document.getElementById('closeFormSelectionPopupBtn').addEventListener('click', function() {
    document.getElementById('formSelectionPopup').style.display = 'none';
});
//Back Button
document.getElementById('backFormSelectionPopupBtn').addEventListener('click', function() {
    document.getElementById('formSelectionPopup').style.display = 'none';
});
//Next Button
document.getElementById('nextFormSelectionPopupBtn').addEventListener('click', function() {
    document.getElementById('formSelectionPopup').style.display = 'none';
    // Navigate to the desired HTML file
    window.location.href = './edit.html';
});



//Canvas code 

//no rotation on z for the six sides

function stlLoad(files){

    var canvasList = document.getElementsByTagName("canvas");

    for (var i = 0, len = canvasList.length; i < len; i++) {
        canvasList[0].remove();
    }

    document.getElementById('printPreview').setAttribute("style", "visibility:visible");

    var stl_viewerTop = new StlViewer ( document.getElementById("stl_contTop") );
    var stl_viewerButton = new StlViewer ( document.getElementById("stl_contButton") );

    stl_viewerTop.add_model ( {
        id: 1,
        local_file:files.files[0],
        rotationx: 0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
        auto_resize: true,
    });

    stl_viewerButton.add_model ( {
        id: 1,
        local_file:files.files[0],
        rotationx: -0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
    });

    document.getElementById('downloadLink').setAttribute("class", "active");

}

function loadBasic(){
    stl_viewerMain.remove_model(1);
    stl_viewerMain.add_model({id:1, filename:"Stanford_Bunny.stl", animation:{delta:{rotationx:1,rotationy:0.5, msec:1000, loop:true}}});

}