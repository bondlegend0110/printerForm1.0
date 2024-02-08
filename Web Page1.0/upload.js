var pdfName = "";
var currentHorseXBasePosition = 0;

/* This is a description of the backend architecture
- Upload 
    - upload.js: takes in the 3D model file and processes them into HTML elements.
- Form selection 
    - upload.js: Dictates how the HTML elements will be recorded and placed.
- Preview popup
    - edit.js: Compiled the HTML elements into one PDF.
    - createAndDisplayPDF
    - 
*/



document.getElementById('openFileDirectoryBtn').addEventListener('click', function() {
    uploadFile();
});

document.getElementById('reopenFileDirectoryBtn').addEventListener('click', function() {
    uploadFile();
});

//Next Button
document.getElementById('nextStartPageBtn').addEventListener('click', function() {
    //TODO Change to incorporate form selection
    const selected = document.getElementsByClassName('selected').item(0)
    if (selected!=null){
        console.log(selected);
        createAndDisplayPDF(pdfName,selected);
    }
    document.getElementById('formSelectionPopup').style.display = 'block';
});

//STL upload code
//uploadFile
function uploadFile() {
    document.getElementById("fileInput").click();
    document.getElementById('reopenFileDirectoryBtn').style.display = 'block';
    document.getElementById("open-directory_container").style.display = 'none';  
}

function inputChange (files){
    //Get the file
    var file = files.files[0];
    // Split the filename into path and name with extension
    const fileName = files.value.split(/(\\|\/)/g).pop();
    // Split the filename into name and extension
    const parts = fileName.split('.');

    // Check if the filename has an extension
    if (parts.length === 2) {
        const name = parts[0];
        // Prepend 'printerForm_' to the name and add the new extension '.pdf'
        pdfName = `printerForm_${name}.pdf`;
    } else {
        // Handle the case where the filename doesn't have a standard format
        console.error('Invalid file name format');
    }

    stlLoadCurve(file)
    //take the full path (value of files which is the text input) 
    //and the take only the last segment(which should be the file name). 
    document.getElementById('fileNameDisplay').value = fileName;
    //change the apperance of the upload section.
}

let slideIndex = 0;
const slideWidth = 500; // Width of each slide
const slideContainer = document.querySelector('.carousel-view');
const slides = document.getElementsByClassName("slide");

// Initial setup
showSlides(slideIndex);

// Event listener for scroll event
slideContainer.addEventListener('scroll', function() {
  const scrollLeft = slideContainer.scrollLeft;
  slideIndex = Math.round(scrollLeft / slideWidth);
});

function moveSlide(n) {
  slideIndex += n;
  if (slideIndex >= slides.length) { slideIndex = 0; }
  if (slideIndex < 0) { slideIndex = slides.length - 1; }

  slideContainer.scrollTo({
    left: slideWidth * slideIndex,
    behavior: 'smooth'
  });
}

function showSlides(n) {
  slideContainer.scrollLeft = slideWidth * n;
}

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
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('public-gallery').style.display = 'none';

    //add to page
    document.getElementById('downloadPopup').style.display = 'block';
    
});

//JavaScript for the Form Selection buttons
var forms = document.querySelectorAll('.fs-item');
var itemIsSelected = false;

forms.forEach(function (item) {
    item.addEventListener('click', function() {
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


class ModelForm {
    constructor(element, viewArray, viewPositions){
        this.element = element;
        this.viewArray = viewArray;
        this.viewPositions = viewPositions;
    }
}

//Input the formating parameters of each form.
var fsCurvedvolumeElement = new ModelForm(document.getElementById('fs-curvedvolume'),   
        ['stl_view1','stl_view2'],
        [{x: 105, y: 400, width: 390, height: 390, rotation: 0 },
            { x: -305, y: -400, width: 390, height: 390,  rotation: 180 }]);
document.getElementById('fs-curvedvolume').customElementInstance = fsCurvedvolumeElement;
var fsFoursidedcubeElement = new ModelForm(document.getElementById('fs-foursidedcube'),   
        ['stl_view1','stl_view2'],
        [{x: 105, y: 400, width: 390, height: 390, rotation: 0 },
            { x: -305, y: -400, width: 390, height: 390,  rotation: 180 }]);
document.getElementById('fs-foursidedcube').customElementInstance = fsFoursidedcubeElement;
var fs3Element = new ModelForm(document.getElementById('fs-3'),   
        ['stl_view1','stl_view2'],
        [{x: 105, y: 400, width: 390, height: 390, rotation: 0 },
            { x: -305, y: -400, width: 390, height: 390,  rotation: 180 }]);
document.getElementById('fs-3').customElementInstance = fs3Element;
