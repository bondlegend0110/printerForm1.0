
//Edit page Buttons
document.getElementById('openDownloadPopupBtn').addEventListener('click', function() {
    document.getElementById('downloadPopup').style.display = 'block';
});

document.getElementById('magnification').addEventListener('input', function() {
document.getElementById('magnification-value').value = this.value;
});
  
document.getElementById('magnification-value').addEventListener('input', function() {
const value = parseFloat(this.value);
if(!isNaN(value) && value >= 0.1 && value <= 2) {
    document.getElementById('magnification').value = value;
} else {
    // Handle invalid input if necessary
    alert('Please enter a value between 0.1 and 2');
}
});  

//JavaScript for the Print Preview Popup buttons
//Close Button
document.getElementById('closeDownloadPopupBtn').addEventListener('click', function() {
    document.getElementById('downloadPopup').style.display = 'none';
});

//Back Button
document.getElementById('backDownloadPopupBtn').addEventListener('click', function() {
    document.getElementById('downloadPopup').style.display = 'none';
});

//Download Button
document.getElementById('downloadPDFbtn').addEventListener('click', function() {
    //
});
