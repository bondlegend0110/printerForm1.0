var stl_viewerMain = new StlViewer ( document.getElementById("stl_contMain"));


function uploadFile() {
    document.getElementById("lFile").click();
}

//no rotation on z for the six sides

function stlLoad(files){


    var canvasList = document.getElementsByTagName("canvas");

    for (var i = 0, len = canvasList.length; i < len; i++) {
        canvasList[0].remove();
    }


    stl_viewerMain = new StlViewer ( document.getElementById("stl_contMain"));

    stl_viewerMain.add_model(
        {
            id:1, 
            local_file:files.files[0],
            animation:{delta:{rotationx:1,rotationy:0.5, msec:1000, loop:true}}
        }
        );
}

function loadBasic(){
    stl_viewerMain.remove_model(1);
    stl_viewerMain.add_model({id:1, filename:"Stanford_Bunny.stl",  animation:{delta:{rotationx:1,rotationy:0.5, msec:1000, loop:true}}});

}



function alertUpload(){
    alert("Please upload file before proceed");
}

