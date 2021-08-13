





window.jsPDF = window.jspdf.jsPDF;

function screenShot() {


    document.getElementById('printPreview').setAttribute("width", "800px");
    document.getElementById('printPreview').setAttribute("height", "900px");
    
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
    if(width > height){
      pdf = new jsPDF('l', 'px', [width, height]);
    }
    else{
      pdf = new jsPDF('p', 'px', [height, width]);
    }
    //then we get the dimensions from the 'pdf' file itself
    //width = pdf.internal.pageSize.getWidth();
    //height = pdf.internal.pageSize.getHeight();
    pdf.addImage(canvas, 'JPEG', 0, 0,width,height);
    pdf.save("download.pdf");

    //setTimeout(() => { downloadPDF(); }, 200);
    document.getElementById("myCanvas").remove();
    document.getElementById('printPreview').setAttribute("width", "0px");
    document.getElementById('printPreview').setAttribute("height", "0px");
};


var stl_viewerMain = new StlViewer ( document.getElementById("stl_contMain"));


function uploadFile() {
    document.getElementById("lFile").click();
    document.getElementById('uploadLink').setAttribute("class", "");
    document.getElementById("dummyDisplay").remove();
    
}

//no rotation on z for the six sides

function stlLoad(files){

    var canvasList = document.getElementsByTagName("canvas");

    for (var i = 0, len = canvasList.length; i < len; i++) {
        canvasList[0].remove();
    }

    document.getElementById('printPreview').setAttribute("style", "visibility:visible");

    var stl_viewerTop = new StlViewer ( document.getElementById("stl_contTop") );
    var stl_viewerButton = new StlViewer ( document.getElementById("stl_contButton") );

    stl_viewerTop.add_model ( {
        id: 1,
        local_file:files.files[0],
        rotationx: 0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
        auto_resize: true,
    });

    stl_viewerButton.add_model ( {
        id: 1,
        local_file:files.files[0],
        rotationx: -0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
    });

    document.getElementById('downloadLink').setAttribute("class", "active");

}

function updateAnno(){
    //alert(document.getElementById("annoText").value);
    document.getElementById("annoDisplayText").innerText = document.getElementById("annoText").value;
    //alert(document.getElementById("annoDisplayText").innerText);
    
}

function loadBasic(){
    stl_viewerMain.remove_model(1);
    stl_viewerMain.add_model({id:1, filename:"Stanford_Bunny.stl",  animation:{delta:{rotationx:1,rotationy:0.5, msec:1000, loop:true}}});

}

