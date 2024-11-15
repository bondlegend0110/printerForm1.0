//JavaScript for the Preview button
//Back Button
document.getElementById('backPreviewBtn').addEventListener('click', function() {
    sessionStorage.setItem('showUploadPopup', 'true');
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
});

