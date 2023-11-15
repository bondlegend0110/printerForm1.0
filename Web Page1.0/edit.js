var pdfName = "";
var finalCanvas;

//Edit page Buttons
document.getElementById('backEditPageBtn').addEventListener('click', function() {
    //open popup
    document.getElementById('formSelectionPopup').style.display = 'block';
    //add to page
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('public-gallery').style.display = 'block';
    document.getElementById('start_controls').style.display = 'block';

    document.getElementById('other-forms').style.display = 'none';
    document.getElementById('edit_buttons').style.display = 'none';
});
document.getElementById('openDownloadPopupBtn').addEventListener('click', function() {
    document.getElementById('downloadPopup').style.display = 'block';
});

//magnification slider and value
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

//rotationX slider and value
document.getElementById('rotationX').addEventListener('input', function() {
    document.getElementById('rotation-x-value').value = this.value;
});
  
document.getElementById('rotation-x-value').addEventListener('input', function() {
const value = parseFloat(this.value);
if(!isNaN(value) && value >= 0.1 && value <= 2) {
    document.getElementById('rotationX').value = value;
} else {
    // Handle invalid input if necessary
    alert('Please enter a value between 0.1 and 2');
}
});  

//rotationX slider and value
document.getElementById('rotationY').addEventListener('input', function() {
    document.getElementById('rotation-y-value').value = this.value;
});
  
document.getElementById('rotation-y-value').addEventListener('input', function() {
const value = parseFloat(this.value);
if(!isNaN(value) && value >= 0.1 && value <= 2) {
    document.getElementById('rotationY').value = value;
} else {
    // Handle invalid input if necessary
    alert('Please enter a value between 0.1 and 2');
}
});  

//rotationX slider and value
document.getElementById('rotationZ').addEventListener('input', function() {
    document.getElementById('rotation-z-value').value = this.value;
});
  
document.getElementById('rotation-z-value').addEventListener('input', function() {
const value = parseFloat(this.value);
if(!isNaN(value) && value >= 0.1 && value <= 2) {
    document.getElementById('rotationZ').value = value;
} else {
    // Handle invalid input if necessary
    alert('Please enter a value between 0.1 and 2');
}
});  

// checkbox
document.getElementById('displayPose').addEventListener('change', function() {
    if(this.checked) {
        stlViewRotate(
            [[1,1,0],
            [1,1,0],
            [1,1,0],
            [1,1,0]
        ]);
    } else {
        // Code to handle the checkbox being unchecked
        stlViewZero([1,1,1,1]);
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
    downloadAsPDF(finalCanvas);
});

function captureElement(elementId) {
    return new Promise((resolve, reject) => {
        const element = document.getElementById(elementId);
        if (element) {
            html2canvas(element).then(canvas => {
                resolve(canvas);
            });
        } else {
            reject(`Element with id ${elementId} not found`);
        }
    });
}

function combineImagesOnTemplate(backgroundTemplateSrc, images, positions, templateWidth, imgWidthPx, imgHeightPx) {
    return new Promise((resolve, reject) => {
        // Load the background template image
        let template = new Image();
        template.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = templateWidth;
            canvas.height = templateWidth/imgWidthPx*imgHeightPx;
            let ctx = canvas.getContext('2d');

            ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

            // Draw and rotate each canvas on the template
            images.forEach((imgCanvas, index) => {
                let pos = positions[index];
                ctx.save();
                ctx.translate(pos.x + imgCanvas.width / 2, pos.y + imgCanvas.height / 2);
                ctx.rotate(pos.rotation * Math.PI / 180);
                ctx.drawImage(imgCanvas, -imgCanvas.width / 2, -imgCanvas.height / 2, pos.width, pos.height);
                ctx.restore();
            });

            resolve(canvas);
        };
        template.onerror = reject;
        template.src = backgroundTemplateSrc; // Set the path to your template image
    });
}

function displayFinalProduct(canvas, targetDivId) {
    const targetDiv = document.getElementById(targetDivId);
    if (targetDiv) {
        targetDiv.innerHTML = ''; // Clear any existing content
        targetDiv.appendChild(canvas); // Add the canvas to the div
    } else {
        console.error('Target div not found');
    }
}


async function createAndDisplayPDF(pdfNameString) {
    try {
        const capturedElements = await Promise.all([
            captureElement('stl_view1'),
            captureElement('stl_view2')
        ]);

        const positions = [
            { x: 0, y: 0, width: 200, height: 200, rotation: 0 }, 
            { x: 200, y: 200, width: 200, height: 200, rotation: 0 }
        ];

        finalCanvas = await combineImagesOnTemplate('./pictures/templates/CURVED_FORM_TEMPLATE.jpg', capturedElements, positions, 600, 2511, 3323);

        // Display the final product
        displayFinalProduct(finalCanvas,"print-preview-container");

        pdfName = pdfNameString;
    } catch (error) {
        console.error('Error creating PDF:', error);
    }
}
window.jsPDF = window.jspdf.jsPDF;

function downloadAsPDF(canvas) {
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
    });

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(pdfName);
}