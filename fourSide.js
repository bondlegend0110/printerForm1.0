var stl_viewer1 = new StlViewer ( document.getElementById("stl_cont1") );
var stl_viewer2 = new StlViewer ( document.getElementById("stl_cont2") );
var stl_viewer3 = new StlViewer ( document.getElementById("stl_cont3") );
var stl_viewer4 = new StlViewer ( document.getElementById("stl_cont4") );



stl_viewer1.add_model ( {
    id: 1,
    filename:"Stanford_Bunny.stl",
    rotationx: 0,
    rotationy: 0.5 * 3.14,
    rotationz: 0,
});

stl_viewer2.add_model ( {
    id: 1,
    filename:"Stanford_Bunny.stl",
    rotationx: 0,
    rotationy: 0.5 * 3.14,
    rotationz: 0,
});

stl_viewer3.add_model ( {
    id: 1,
    filename:"Stanford_Bunny.stl",
    rotationx: 0,
    rotationy: 0.5 * 3.14,
    rotationz: 0,
});

stl_viewer4.add_model ( {
    id: 1,
    filename:"Stanford_Bunny.stl",
    rotationx: 0,
    rotationy: 0.5 * 3.14,
    rotationz: 0,
});

window.jsPDF = window.jspdf.jsPDF;

function screenShot(){

    //alert(document.getElementById("printPreview"));
    var doc = new jsPDF();
    
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return false
        }
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case

    //alert(document.getElementById("printPreview"));

    doc.html(document.body
    , {
        callback: function (doc) {
          doc.save();
        },
     }
     
     );

    var string = doc.output('datauristring');

    var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
    //doc.save();

    
}

