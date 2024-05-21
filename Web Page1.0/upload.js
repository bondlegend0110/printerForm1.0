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
const slideWidth = 800; // Width of each slide

function adjustStlViewerSize() {
    var square = "700px"; // Default width

    if (window.innerWidth <= 768) {
        // Tablet
        square = "450px";
        slideWidth = 550; //width + 100
    } else if (window.innerWidth <= 480) {
        // Mobile
        square = "250px";
        slideWidth = 350;
    }

    var stlViewerElement = document.getElementById(".stl_cont");
    stlViewerElement.style.width = square;
    stlViewerElement.style.height = square;
}

// Adjust size on page load
window.onload = adjustStlViewerSize;

document.getElementById('openFileDirectoryBtn').addEventListener('click', function() {
    document.getElementById("open-directory_container").style.display = 'none';
    document.getElementById('printPreview').scrollIntoView({
        behavior: 'smooth'
    });    
    document.getElementById("fileInput").click();
    document.getElementById('reopenFileDirectoryBtn').style.display = 'block';
});

document.getElementById('reopenFileDirectoryBtn').addEventListener('click', function() {
    document.getElementById('printPreview').scrollIntoView({
        behavior: 'smooth'
    });
    document.getElementById("fileInput").click();
});

//Next Button
document.getElementById('nextStartPageBtn').addEventListener('click', function() {
    document.getElementById('formSelectionPopup').style.display = 'block';
});


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

    const selected = document.getElementsByClassName('selected').item(0);
    //console.log(selected);
    if (selected!=null){
        createAndDisplayPDF(pdfName,selected);
    } else {
        console.error('No Form Selected', error);
    }

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
    constructor(element, viewArray, viewPositions, template, generateObjectsFunction){
        this.element = element;
        this.viewArray = viewArray;
        this.viewPositions = viewPositions;
        this.template = template;
        this.generateObjects = generateObjectsFunction;
    }
}


//Input the formating parameters of each form.
document.getElementById('fs-curvedvolume').customElementInstance =
new ModelForm(document.getElementById('fs-curvedvolume'),   
    //front, back
    ['stl_view1','stl_view2'],
    [   {x: 105, y: 400, width: 400, height: 400, rotation: 0 },
        {x: -100, y: 0, width: 400, height: 400, rotation: 180 }
    ], 
    './pictures/templates/CURVED_FORM_TEMPLATE.jpg'
);

document.getElementById('fs-foursidedcube').customElementInstance = 
new ModelForm(document.getElementById('fs-foursidedcube'),   
    ['stl_view1','stl_view2','stl_view3','stl_view4'],
    [   
        {y: 200, x:-280, width: 150, height: 150, rotation: 270}, 
        {y: 200, x: -650, width: 150, height: 150, rotation: 270},
        {y: 200, x: -110, width: 150, height: 150, rotation: 270},
        {y: 200, x: -450, width: 150, height: 150, rotation: 270}
        
    ], 
    './pictures/templates/FOUR_SIDE_TEMPLATE.jpg'
);

document.getElementById('fs-sixsidedfourflapscube').customElementInstance =
new ModelForm(document.getElementById('fs-sixsidedfourflapscube'),   
    //top,front,bottom,back,right,left
    ['stl_view5','stl_view1','stl_view6','stl_view2','stl_view3','stl_view4'],
    [/*top*/    {x: 205, y:   0, width: 190, height: 190, rotation: 0},
    /*front*/   {x: 205, y: 200, width: 190, height: 190, rotation: 0},
    /*bottom*/  {x:-205, y:-400, width: 190, height: 190, rotation: 180},
    /*back*/    {x:-205, y:-600, width: 190, height: 190, rotation: 180},
    /*left*/    {x: 405, y: 200, width: 190, height: 190, rotation: 0},
    /*right*/   {x:   5, y: 200, width: 190, height: 190, rotation: 0}
    ], 
    './pictures/templates/SIX_SIDE_TEMPLATE.jpg'
);

document.getElementById('fs-sixsidedtwoflapscube').customElementInstance =
new ModelForm(document.getElementById('fs-sixsidedtwoflapscube'),   
    //top,front,bottom,back,right,left
    ['stl_view5','stl_view1','stl_view6','stl_view2','stl_view3','stl_view4'],
    [/*top*/    {x: 205, y: 600, width: 190, height: 190, rotation: 0},
    /*front*/   {x: 205, y:   0, width: 190, height: 190, rotation: 0},
    /*bottom*/  {x:-205, y:-200, width: 190, height: 190, rotation: 180},
    /*back*/    {x:-205, y:-400, width: 190, height: 190, rotation: 180},
    /*left*/    {x: 405, y:   0, width: 190, height: 190, rotation: 0},
    /*right*/   {x:   5, y:   0, width: 190, height: 190, rotation: 0}
    ], 
    './pictures/templates/SIX_SIDE_TEMPLATE1.jpg'
);

// The function to add elements to the viewArray
function addElementsUntilYReachesTarget(itemElement, yChange, targetY) {
    // Get the last element of the array to start calculations
    let lastElement = itemElement.viewArray[itemElement.viewArray.length - 1];
    
    // Loop until the y value of the last element reaches 300
    while (lastElement.y + yChange <= targetY) {
        // Create a new element based on the last one, modifying the y value
        let newElement = {x: 105, y:lastElement.y + yChange, width: 200, height: 200, rotation: 0};
        
        // Add the new element to the viewArray
        itemElement.viewArray.push(newElement);
        
        // Update the last element reference to the one just added
        lastElement = newElement;
    }
}

async function generateObjectsCylinder (itemElement){
    let promises = []; // Use let for variables that will be reassigned, and an array to hold promises
    itemElement.viewArray.forEach (elementId =>  {
        // Push the promise returned by captureElement into the promises array
        promises.push(captureElement(elementId));
    });
    addElementsUntilYReachesTarget(itemElement, 50, 300);
}
// pass the value directly to the html elements so that they can't be accessed in console
document.getElementById('fs-cylinderelement').customElementInstance = 
new ModelForm(document.getElementById('fs-cylinderelement'),   
    /*front*/ ['stl_view1'], 
    [/*back*/ {x: 105, y:-300, width: 200, height: 200, rotation: 0}], 
    './pictures/templates/FOUR_SIDE_TEMPLATE.jpg'
);
