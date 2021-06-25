
//no rotation on z for the six sides


var stl_viewerRight = new StlViewer(document.getElementById("stl_contTop"), {
    models: [
        {
            filename: "Stanford_Bunny.stl",
            rotationx: 0.5 * 3.14,
            rotationy: 0,
            rotationz: 0,
        },
    ],
});

var stl_viewerLeft = new StlViewer(document.getElementById("stl_contButton"), {
    models: [
        {
            filename: "Stanford_Bunny.stl",
            rotationx: -0.5 * 3.14,
            rotationy: 0,
            rotationz: 0,
        },
    ],
});


var stl_viewer = new StlViewer(document.getElementById("stl_contFront"), {
    models: [
        {
            filename: "Stanford_Bunny.stl",
            rotationx: 0,
            rotationy: 0,
            rotationz: 0,
        },
    ],
});


var stl_viewerBack = new StlViewer(document.getElementById("stl_contBack"), {
    models: [
        {
            filename: "Stanford_Bunny.stl",
            rotationx: 3.14,
            rotationy: 0,
            rotationz: 0,
        },
    ],
});






var stl_viewerTop = new StlViewer(document.getElementById("stl_contRight"), {
    models: [
        {
            filename: "Stanford_Bunny.stl",
            rotationx: 0,
            rotationy: -0.5 * 3.14,
            rotationz: 0,
        },
    ],
});


var stl_viewerButton = new StlViewer(document.getElementById("stl_contLeft"), {
    models: [
        {
            filename: "Stanford_Bunny.stl",
            rotationx: 0,
            rotationy: 0.5 * 3.14,
            rotationz: 0,
        },
    ],
});


// END of stlView //////////////////////////////////////////////////////////////////



function takeshot() {
    let div =
        document.getElementById('stlCube');

    // Use the html2canvas
    // function to take a screenshot
    // and append it
    // to the output div
    html2canvas(div).then(
        
        function (canvas) {
            canvas.setAttribute("id", "myCanvas");
            document
            .getElementById('output')
            .appendChild(canvas);
        })
};



window.jsPDF = window.jspdf.jsPDF

function downloadPDF() {
    // only jpeg is supported by jsPDF
    var canvas = document.getElementById('myCanvas');
    var imgData = canvas.toDataURL("image/jpeg", 1.0);

    let width = canvas.width; 
    let height = canvas.height;

    //set the orientation
    if(width > height){
      pdf = new jsPDF('l', 'px', [width, height]);
    }
    else{
      pdf = new jsPDF('p', 'px', [height, width]);
    }
    //then we get the dimensions from the 'pdf' file itself
    width = pdf.internal.pageSize.getWidth();
    height = pdf.internal.pageSize.getHeight();
    pdf.addImage(canvas, 'JPEG', 0, 0,width,height);
    pdf.save("download.pdf");
  };