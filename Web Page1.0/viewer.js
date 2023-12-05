var stl_viewer_front;
var stl_viewer_back;
var stl_viewer_right;
var stl_viewer_left;
var b =
        [[0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0]]
// [[b[0][0],b[0][1],b[0][2]],
// [b[1][0],b[1][1],b[1][2]],
// [b[2][0],b[2][1],b[2][2]],
// [b[3][0],b[3][1],b[3][2]]]

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
        rotationx:-0.5 * 3.142,
        rotationy: 0,
        rotationz: 0
    });
    stl_viewer_front.set_auto_resize(true);

    stl_viewer_back = new StlViewer ( document.getElementById("stl_view2") );
    stl_viewer_back.add_model ( {
        id: 0,
        local_file:file,
        rotationx: 0.5 * 3.142,
        rotationy: 1 * 3.142,
        rotationz: 0
    });
    
     stl_viewer_right = new StlViewer ( document.getElementById("stl_view3"));
    stl_viewer_right.add_model ( {
        id: 0,
        local_file:file,
        rotationx:-0.5 * 3.142,
        rotationy: 0,
        rotationz:-0.5 * 3.142
    });

    stl_viewer_left = new StlViewer ( document.getElementById("stl_view4"));
    stl_viewer_left.add_model ( {
        id: 0,
        local_file:file,
        rotationx:-0.5 * 3.142,
        rotationy: 0,
        rotationz: 0.5 * 3.142
    });

}

function stlViewRotate(x,y,z){
        stl_viewer_front.rotate(0,x,y,z);
        b[0]=[x+b[0][0],y+b[0][1],z+b[0][2]];
        stl_viewer_back.rotate(0,x,y,z);
        b[1]=[x+b[1][0],y+b[1][1],z+b[1][2]];
        stl_viewer_left.rotate(0,x,y,z);
        b[2]=[x+b[2][0],y+b[2][1],z+b[2][2]];
        stl_viewer_right.rotate(0,x,y,z);
        b[3]=[x+b[3][0],y+b[3][1],z+b[3][2]];
}

function stlViewSetRotation(a){
    stl_viewer_front.rotate(0,a[0][0]-b[0][0],a[0][1]-b[0][1],a[0][2]-b[0][2]);
    stl_viewer_back.rotate(0,-a[1][0]-b[1][0],a[1][1]-b[1][1],a[1][2]-b[1][2]);
    stl_viewer_left.rotate(0,-a[2][0]-b[2][0],a[2][1]-b[2][1],a[2][2]-b[3][2]);
    stl_viewer_right.rotate(0,a[3][0]-b[3][0],-a[3][1]-b[3][1],a[3][2]-b[2][2]);
    b[0]=a[0];
    b[1]=[-a[1][0],a[1][1],a[1][2]];
    b[2]=[-a[2][0],a[2][1],a[2][2]];
    b[3]=[a[3][0],-a[3][1],a[3][2]];
}

function stlViewZoom(value){
    stl_viewer_front.set_zoom(value);
    stl_viewer_back.set_zoom(value);
    stl_viewer_right.set_zoom(value);
    stl_viewer_left.set_zoom(value);
}

//magnification slider and value
document.getElementById('magnification').addEventListener('input', function() {
    const value = parseFloat(this.value);
    stlViewZoom(this.value);
    document.getElementById('magnification-value').value = this.value;
});
  
document.getElementById('magnification-value').addEventListener('keypress', function() {
    if(event.key == 'Enter'){
        const value = parseFloat(this.value);
        if(!isNaN(value) && value >= 0.1 && value <= 2) {
            stlViewZoom(value);
            document.getElementById('magnification').value = value;
        } else {
            // Handle invalid input if necessary
            alert('Please enter a value between 0.1 and 2');
        }
    }

});  

//rotationX slider and value
document.getElementById('rotationX').addEventListener('input', function() {
    document.getElementById('rotation-x-value').value = this.value;
    stlViewSetRotation(
        [[this.value,b[0][1],b[0][2]],
        [this.value,b[1][1],b[1][2]],
        [b[2][0],this.value,b[2][2]],
        [b[3][0],this.value,b[3][2]]]
    );
});
  
document.getElementById('rotation-x-value').addEventListener('input', function() {
const value = parseFloat(this.value);
if(value >= -2 && value <= 2) {
    document.getElementById('rotationX').value = value;
    stlViewSetRotation(
        [[value,b[0][1],b[0][2]],
        [value,b[1][1],b[1][2]],
        [b[2][0],value,b[2][2]],
        [b[3][0],value,b[3][2]]]
    );
} else {
    // Handle invalid input if necessary
    alert('Please enter a value between -2 and 2 radians');
}
});  

//rotationX slider and value
document.getElementById('rotationY').addEventListener('input', function() {
    document.getElementById('rotation-y-value').value = this.value;
    stlViewSetRotation(
        [[b[0][0],this.value,b[0][2]],
        [b[1][0],this.value,b[1][2]],
        [this.value,b[2][1],b[2][2]],
        [this.value,b[3][1],b[3][2]]]
    );
});
  
document.getElementById('rotation-y-value').addEventListener('input', function() {
const value = parseFloat(this.value);
if(value >= -2 && value <= 2) {
    document.getElementById('rotationY').value = value;
    stlViewSetRotation(
        [[b[0][0],value,b[0][2]],
        [b[1][0],value,b[1][2]],
        [value,b[2][1],b[2][2]],
        [value,b[3][1],b[3][2]]]
    );
} else {
    // Handle invalid input if necessary
    alert('Please enter a value between -2 and 2 radians');
}
});  

//rotationZ slider and value
document.getElementById('rotationZ').addEventListener('input', function() {
    document.getElementById('rotation-z-value').value = this.value;
    stlViewSetRotation(
        [[b[0][0],b[0][1],this.value],
        [b[1][0],b[1][1],this.value],
        [b[2][0],b[2][1],this.value],
        [b[3][0],b[3][1],this.value]]
    );
});
  
document.getElementById('rotation-z-value').addEventListener('input', function() {
const value = parseFloat(this.value);
if(value >= -2 && value <= 2) {
    document.getElementById('rotationZ').value = value;
    stlViewSetRotation(
        [[b[0][0],b[0][1],value],
        [b[1][0],b[1][1],value],
        [b[2][0],b[2][1],value],
        [b[3][0],b[3][1],value]]
    );
} else {
    // Handle invalid input if necessary
    alert('Please enter a value between -2 and 2 radians');
}
});  

// Display Pose Button
document.getElementById('sceneRotationZero').addEventListener('click', function() {
    stlViewSetRotation(
        [[0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]);
});

// Display Pose Button
document.getElementById('displayPose').addEventListener('click', function() {
    stlViewSetRotation(
        [[0.1 *3.142,0,-0.15 * 3.142],
        [0.1 *3.142,0,-0.15 * 3.142],
        [-0.1 *3.1420,0,-0.15 * 3.142],
        [0.1 *3.1420,0,-0.15 * 3.142]
    ]);
});


// $( function() {
//     $( "#stl_contTop" ).draggable({ axis: "y" });
//     $( "#stl_contButton" ).draggable({ axis: "y" , containment: "#printPreview"});
//     $( "#annoDisplay" ).draggable({containment: "#printPreview"});
//   } );