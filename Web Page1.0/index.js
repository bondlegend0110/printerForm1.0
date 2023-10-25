var popup = document.getElementById('DSApopup');
var stl_viewerMain = new StlViewer ( document.getElementById("stl_contMain"));

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
document.getElementById('openFileDirectoryBtn').addEventListener('click', function() {
    uploadFile();
});

//Start page Button
document.getElementById('reopenFileDirectoryBtn').addEventListener('click', function() {
    uploadFile();
});

//Next Button
document.getElementById('nextStartPageBtn').addEventListener('click', function() {
    document.getElementById('formSelectionPopup').style.display = 'block';
});

//STL upload code
//uploadFile
function uploadFile() {
    document.getElementById("fileInput").click();
    document.getElementById("dummyDisplay").remove();    
}

function inputChange (files){
    var file = files.files[0];
    var fileName = files.value.split(/(\\|\/)/g).pop();
    stlLoad(file,"stl_preview", 0)
    stlLoad(file,"stl_view1", 1)
    stlLoad(file,"stl_view2", 2)
    //take the full path (value of files which is the text input) 
    //and the take only the last segment(which should be the file name). 
    document.getElementById('fileNameDisplay').value = fileName;
    document.getElementById('printPreview').style.display = 'block';
    document.getElementById('openFileDirectoryBtn').style.display = 'none';
    document.getElementById('reopenFileDirectoryBtn').style.display = 'block';
}



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
    //close popup
    document.getElementById('formSelectionPopup').style.display = 'none';
    //remove from page
    document.getElementById('upload-container').style.display = 'none';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('public-gallery').style.display = 'none';
    //add to page
    document.getElementById('download-container').style.display = 'block';
    document.getElementById('other-forms').style.display = 'block';
    
});
//JavaScript for the Form Selection buttons
var forms = document.querySelectorAll('.fs-item');

forms.forEach(function (item) {
    item.addEventListener('dblclick', function() {

        if (!item.classList.contains('selected')) {
            forms.forEach(function (el) {
                el.classList.remove('selected');
            });
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
});