var stl_viewerMain = new StlViewer ( document.getElementById("stl_contMain"));

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
    screenShot();
});









window.jsPDF = window.jspdf.jsPDF;

function screenShot() {
    document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera


    // document.getElementById('output').setAttribute("width", "800px");
    // document.getElementById('output').setAttribute("height", "900px");
    
    if( document.getElementById("myCanvas") != null){
        var blank = document.getElementById("myCanvas");

        blank.remove();
    }
    
    let div =
        document.getElementById('printPreview');

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
    
        setTimeout(() => { downloadPDF(); }, 2000);

        /*
    html2canvas(document.querySelector("#stlCube")).then(canvas => {
        document.body.appendChild(canvas)
        });
        */
};




function downloadPDF() {
    // only jpeg is supported by jsPDF

    //alert("Printing");

    var canvas = document.getElementById('myCanvas');

    let width = canvas.width; 
    let height = canvas.height;

    var pdf = null;

    //set the orientation

    pdf = new jsPDF('p', 'px', [620*2, 800*2]);
    //then we get the dimensions from the 'pdf' file itself
    //width = pdf.internal.pageSize.getWidth();
    //height = pdf.internal.pageSize.getHeight();
    pdf.addImage(canvas, 'JPEG', 0, 0,width,height);

    alert("width: " + width + " \n Height: " + height);
    pdf.save("download.pdf");

    //setTimeout(() => { downloadPDF(); }, 200);
    document.getElementById("myCanvas").remove();
    document.getElementById('output').setAttribute("width", "0px");
    document.getElementById('output').setAttribute("height", "0px");
};

function loadBasic(){
    stl_viewerMain.remove_model(1);
    stl_viewerMain.add_model({id:1, filename:"Stanford_Bunny.stl",  animation:{delta:{rotationx:1,rotationy:0.5, msec:1000, loop:true}}});

}

// $( function() {
//     $( "#stl_contTop" ).draggable({ axis: "y" });
//     $( "#stl_contButton" ).draggable({ axis: "y" , containment: "#printPreview"});
//     $( "#annoDisplay" ).draggable({containment: "#printPreview"});
//   } );