var stl_viewerMain = new StlViewer ( document.getElementById("stl_contMain"));

var stl_viewerRight = new StlViewer ( document.getElementById("stl_contRight") );
var stl_viewerLeft = new StlViewer ( document.getElementById("stl_contLeft") );
var stl_viewerTop = new StlViewer ( document.getElementById("stl_contTop") );
var stl_viewerButton = new StlViewer ( document.getElementById("stl_contButton") );
var stl_viewerFront = new StlViewer ( document.getElementById("stl_contFront") );
var stl_viewerBack = new StlViewer ( document.getElementById("stl_contBack") );


//no rotation on z for the six sides

function stlLoad(files){
    stl_viewerMain.remove_model(1);
    stl_viewerMain.add_model({id:1, local_file:files.files[0],  animation:{delta:{rotationx:1,rotationy:0.5, msec:1000, loop:true}}});
    stl_viewerTop.remove_model(1);
    stl_viewerTop.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
        auto_resize: true,
    });

    
    
    stl_viewerButton.remove_model(1);
    stl_viewerButton.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: -0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
    });


    
    stl_viewerFront.remove_model(1);
    stl_viewerFront.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 0,
        rotationy: 0,
        rotationz: 0,
    });

    
    
    stl_viewerBack.remove_model(1);
    stl_viewerBack.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 3.14,
        rotationy: 0,
        rotationz: 0,
    });


    stl_viewerRight.remove_model(1);
    stl_viewerRight.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 0,
        rotationy: -0.5 * 3.14,
        rotationz: 0,
    });

    
    stl_viewerLeft.remove_model(1);
    stl_viewerLeft.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 0,
        rotationy: 0.5 * 3.14,
        rotationz: 0,
    });
}

function loadBasic(){
    stl_viewerMain.remove_model(1);
    stl_viewerMain.add_model({id:1, filename:"Utah_teapot.stl",  animation:{delta:{rotationx:1,rotationy:0.5, msec:1000, loop:true}}});
    stl_viewerTop.remove_model(1);
    stl_viewerTop.add_model ( {
        id: 1,
        filename:"Utah_teapot.stl",
        rotationx: 0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
        auto_resize: true,
    });

    
    
    stl_viewerButton.remove_model(1);
    stl_viewerButton.add_model ( {
        id: 1,
        filename:"Utah_teapot.stl",
        rotationx: -0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
    });


    
    stl_viewerFront.remove_model(1);
    stl_viewerFront.add_model ( {
        id: 1,
        filename:"Utah_teapot.stl",
        rotationx: 0,
        rotationy: 0,
        rotationz: 0,
    });

    
    
    stl_viewerBack.remove_model(1);
    stl_viewerBack.add_model ( {
        id: 1,
        filename:"Utah_teapot.stl",
        rotationx: 3.14,
        rotationy: 0,
        rotationz: 0,
    });


    stl_viewerRight.remove_model(1);
    stl_viewerRight.add_model ( {
        id: 1,
        filename:"Utah_teapot.stl",
        rotationx: 0,
        rotationy: -0.5 * 3.14,
        rotationz: 0,
    });

    
    stl_viewerLeft.remove_model(1);
    stl_viewerLeft.add_model ( {
        id: 1,
        filename:"Utah_teapot.stl",
        rotationx: 0,
        rotationy: 0.5 * 3.14,
        rotationz: 0,
    });
}

function splitSTL(files){
    resizing("stl_contTop", 2, 0);
    resizing("stl_contButton", 2, 0);
    resizing("stl_contRight", 1, 2);
    resizing("stl_contLeft", 1, 2);
    resizing("stl_contFront", 1, 0);
    resizing("stl_contBack", 1, 0);

    stl_viewerTop.remove_model(1);
    stl_viewerTop.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
        auto_resize: true,
    });

    
    
    stl_viewerButton.remove_model(1);
    stl_viewerButton.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: -0.5 * 3.14,
        rotationy: 0,
        rotationz: 0,
    });


    
    stl_viewerFront.remove_model(1);
    stl_viewerFront.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 0,
        rotationy: 0,
        rotationz: 0,
    });

    
    
    stl_viewerBack.remove_model(1);
    stl_viewerBack.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 3.14,
        rotationy: 0,
        rotationz: 0,
    });


    stl_viewerRight.remove_model(1);
    stl_viewerRight.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 0,
        rotationy: -0.5 * 3.14,
        rotationz: 0,
    });

    
    stl_viewerLeft.remove_model(1);
    stl_viewerLeft.add_model ( {
        id: 1,
        local_file: files.files[0],
        rotationx: 0,
        rotationy: 0.5 * 3.14,
        rotationz: 0,
    });
}

function resizing(divID, dim1, dim2){ // for dim1 and dim2, 0 is xd, 1 is yd, 2 is zd
    const modelInfo = JSON.parse(JSON.stringify(stl_viewerMain.get_model_info(1)));
    //alert(JSON.stringify(modelInfo));
    var xd = modelInfo["dims"]["x"] + "px";
    var yd = modelInfo["dims"]["y"] + "px";
    var zd = modelInfo["dims"]["z"] + "px";
    const dims = [xd, yd, zd]; 



    document.getElementById(divID).style.height = dims[dim1];

    document.getElementById(divID).style.width = dims[dim2];
    
    document.getElementById(divID).style.padding = "20px"; 
    document.getElementById(divID).style.margin = "-4px";
    //alert(document.getElementById(divID).style.height);
}


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


