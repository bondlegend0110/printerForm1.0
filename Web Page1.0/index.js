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
