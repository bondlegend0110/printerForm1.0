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
    document.getElementById("fileInput").click();
    //document.getElementById('uploadLink').setAttribute("class", "");
    //TODO: Add Feature: Use the Default Bunny
    document.getElementById('fileInput').addEventListener('change', function(e) {
        const selectedFile = e.target.files[0];
        console.log('Selected file:', selectedFile);
    });
});

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