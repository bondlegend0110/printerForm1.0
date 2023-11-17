var stl_viewer_front;
var stl_viewer_back;
var stl_viewer_right;
var stl_viewer_left;
var b =
[[0,0,0],
[0,0,0],
[0,0,0],
[0,0,0]]

function stlLoadCurve(file){

    var canvasList = document.getElementsByTagName("canvas");

    for (var i = 0, len = canvasList.length; i < len; i++) {
        canvasList[0].remove();
    }

    // the views are front or back. The divs that hold them are on the left or right side.
    stl_viewer_front = new StlViewer ( document.getElementById("stl_view1") );
    stl_viewer_front.add_model ( {
        id: 0,
        local_file:file,
        rotationx:-0.40 * 3.14,
        rotationy: 0,
        rotationz:-0.15 * 3.14,
        auto_resize: true,
    });
    stl_viewer_front.set_auto_resize(true);

    stl_viewer_back = new StlViewer ( document.getElementById("stl_view2") );
    stl_viewer_back.add_model ( {
        id: 0,
        local_file:file,
        rotationx: 0.40 * 3.14,
        rotationy: 1 * 3.14,
        rotationz: 0.15 * 3.14,
        auto_resize: true,
    });
    
     stl_viewer_right = new StlViewer ( document.getElementById("stl_view3"));
    stl_viewer_right.add_model ( {
        id: 0,
        local_file:file,
        rotationx:-0.5 * 3.14,
        rotationy: 0,
        rotationz:-0.5 * 3.14,
        auto_resize: true,
    });

    stl_viewer_left = new StlViewer ( document.getElementById("stl_view4"));
    stl_viewer_left.add_model ( {
        id: 0,
        local_file:file,
        rotationx:-0.5 * 3.14,
        rotationy: 0,
        rotationz: 0.5 * 3.14,
        auto_resize: true,
    });

}

function loadBasic(){
    stl_viewerMain.remove_model(1);
    stl_viewerMain.add_model({id:1, filename:"Stanford_Bunny.stl", animation:{delta:{rotationx:1,rotationy:0.5, msec:1000, loop:true}}});

}

function stlViewRotate(a){
        stl_viewer_front.rotate(0,a[0][0],a[0][1],a[0][2]);
        b[0]=[a[0][0]+b[0][0],a[0][1]+b[0][1],a[0][2]+b[0][2]];
        stl_viewer_back.rotate(0,a[1][0],a[1][1],a[1][2]);
        b[1]=[a[1][0]+b[1][0],a[1][1]+b[1][1],a[1][2]+b[1][2]];
        stl_viewer_left.rotate(0,a[2][0],a[2][1],a[2][2]);
        b[2]=[a[2][0]+b[2][0],a[2][1]+b[2][1],a[2][2]+b[2][2]];
        stl_viewer_right.rotate(0,a[3][0],a[3][1],a[3][2]);
        b[3]=[a[3][0]+b[3][0],a[3][1]+[3][1],a[3][2]+b[3][2]];
}

function stlViewsetRotation(a){
    stl_viewer_front.rotate(0,a[0][0]-b[0][0],a[0][1]-b[0][1],a[0][2]-b[0][2]);
    b[0]=a[0];
    stl_viewer_back.rotate(0,a[1][0]-b[1][0],a[1][1]-b[1][1],a[1][2]-b[1][2]);
    b[1]=a[1];
    stl_viewer_left.rotate(0,a[2][0]-b[2][0],a[2][1]-b[2][1],a[2][2]-b[2][2]);
    b[2]=a[2];
    stl_viewer_right.rotate(0,a[3][0]-b[3][0],a[3][1]-[3][1],a[3][2]-b[3][2]);
    b[3]=a[3];
}

function stlViewZoom(integer){
    alert(`Zoom: ${integer}`);
    stl_viewer_front.zoom(integer);
    stl_viewer_back.zoom(integer);
    stl_viewer_right.zoom(integer);
    stl_viewer_left.zoom(integer);
}

//magnification slider and value
document.getElementById('magnification').addEventListener('input', function() {
    stlViewZoom(value);
    document.getElementById('magnification-value').value = this.value;//doesn't work
});
  
document.getElementById('magnification-value').addEventListener('input', function() {
const value = parseFloat(this.value);
if(!isNaN(value) && value >= 0.1 && value <= 2) {
    stlViewZoom(value);// works
    document.getElementById('magnification').value = value; //doesn't work
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

//rotationZ slider and value
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


// $( function() {
//     $( "#stl_contTop" ).draggable({ axis: "y" });
//     $( "#stl_contButton" ).draggable({ axis: "y" , containment: "#printPreview"});
//     $( "#annoDisplay" ).draggable({containment: "#printPreview"});
//   } );