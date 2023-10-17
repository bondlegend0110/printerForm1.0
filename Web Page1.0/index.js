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
    if (sessionStorage.getItem('showUploadPopup') === 'true') {
        document.getElementById('uploadPopup').style.display = 'block';
        sessionStorage.removeItem('showUploadPopup');
    }
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



//Back Button
document.getElementById('closeUploadPopupBtn').addEventListener('click', function() {
    document.getElementById('uploadPopup').style.display = 'none';
});
//Next Button
document.getElementById('nextUploadPopupBtn').addEventListener('click', function() {
    document.getElementById('uploadPopup').style.display = 'none';
    window.location.href = './preview.html';
});

//uploadFile
function uploadFile() {
    document.getElementById("lFile").click();
    //document.getElementById('uploadLink').setAttribute("class", "");
    document.getElementById("dummyDisplay").remove();
    
}

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