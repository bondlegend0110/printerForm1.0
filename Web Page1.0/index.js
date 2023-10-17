var popup = document.getElementById('DSApopup');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    popup.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}

// Check localStorage and show modal if needed
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem('doNotShow') !== 'true') {
        popup.style.display = 'block';
    }

    // Handle "Don't Show Again" checkbox
    document.getElementById('doNotShow').addEventListener('change', function() {
        localStorage.setItem('doNotShow', this.checked ? 'true' : 'false');
    });
});

//Start page Button
document.getElementById('openUploadPopupBtn').addEventListener('click', function() {
    document.getElementById('uploadPopup').style.display = 'block';
});

//JavaScript for the Upload Popup buttons
//Open Directory Button
document.getElementById('openDirectoryBtn').addEventListener('click', function() {
    uploadFile();
});

function uploadFile() {
    document.getElementById("lFile").click();
    //document.getElementById('uploadLink').setAttribute("class", "");
    document.getElementById("dummyDisplay").remove();
    
}

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

}




//Back Button
document.getElementById('closeUploadPopupBtn').addEventListener('click', function() {
    document.getElementById('uploadPopup').style.display = 'none';
});
//Next Button
document.getElementById('nextUploadPopupBtn').addEventListener('click', function() {
    document.getElementById('uploadPopup').style.display = 'none';
    document.getElementById('previewPopup').style.display = 'block';
    //TODO Next Button Functionality
});

//JavaScript for the Preview button
//Close Button
document.getElementById('closePreviewPopupBtn').addEventListener('click', function() {
    document.getElementById('previewPopup').style.display = 'none';
});
//Back Button
document.getElementById('backPreviewPopupBtn').addEventListener('click', function() {
    document.getElementById('previewPopup').style.display = 'none';
    document.getElementById('uploadPopup').style.display = 'block';
});
//Next Button
document.getElementById('nextPreviewPopupBtn').addEventListener('click', function() {
    document.getElementById('previewPopup').style.display = 'none';
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
    document.getElementById('previewPopup').style.display = 'block';
});
//Next Button
document.getElementById('nextFormSelectionPopupBtn').addEventListener('click', function() {
    document.getElementById('formSelectionPopup').style.display = 'none';
    // Navigate to the desired HTML file
    window.location.href = './edit.html';
});

$( function() {
    $( "#stl_contTop" ).draggable({ axis: "y" });
    $( "#stl_contButton" ).draggable({ axis: "y" , containment: "#printPreview"});
    $( "#annoDisplay" ).draggable({containment: "#printPreview"});
  } );