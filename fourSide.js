


window.jsPDF = window.jspdf.jsPDF;

function screenShot() {

    
    document.getElementById('output').setAttribute("width", "800px");
    document.getElementById('output').setAttribute("height", "900px");

    var canvasOld = document.getElementById('myCanvas');
    if(canvasOld != null){
        canvasOld.remove();
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
        });
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


    //alert(canvas);

    let width = canvas.width; 
    let height = canvas.height;

    var pdf = null;

    pdf = new jsPDF('p', 'px', [620*2, 800*2]);
    //then we get the dimensions from the 'pdf' file itself
    //width = pdf.internal.pageSize.getWidth();
    //height = pdf.internal.pageSize.getHeight();

    //alert(pdf);
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




    var stl_viewer1 = new StlViewer ( document.getElementById("stl_cont1") );
    var stl_viewer2 = new StlViewer ( document.getElementById("stl_cont2") );
    var stl_viewer3 = new StlViewer ( document.getElementById("stl_cont3") );
    var stl_viewer4 = new StlViewer ( document.getElementById("stl_cont4") );


    stl_viewer1.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 0,
        rotationy: 0,
        rotationz: 0,
    });

    stl_viewer2.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: -0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
    });
        
    stl_viewer3.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 3.14,
        rotationy: 0,
        rotationz: 0,
    });

    stl_viewer4.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
    });
    


    document.getElementById('downloadLink').setAttribute("class", "active");

}

function updateAnno(){
    //alert(document.getElementById("annoText").value);
    document.getElementById("annoDisplay").innerText = document.getElementById("annoText").value;
    //alert(document.getElementById("annoDisplayText").innerText);
}

function updateDimision(){
    //alert(document.getElementById("distanceLeft").value);
    //alert(document.getElementById("distanceRight").value);
    document.getElementById('top').style.width= document.getElementById("distanceRight").value;
}

function loadBasic(){
    stl_viewerMain.remove_model(1);
    stl_viewerMain.add_model({id:1, filename:"Stanford_Bunny.stl",  animation:{delta:{rotationx:1,rotationy:0.5, msec:1000, loop:true}}});

}

$( function() {
    $( "#top" ).draggable({ axis: "x" });
    $( "#annoDisplay" ).draggable();
  } );