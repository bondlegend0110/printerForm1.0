
function canvas1(){
 
    var canvas = document.getElementById("stl_cont1");
    var ctx = canvas.getContext("2d");


    var productImg = new Image();
        productImg.onload = function () {
            var iw = productImg.width;
            var ih = productImg.height;
            console.log("height");
    
            canvas.width = 400;
            canvas.height = 400;
    
            ctx.drawImage(productImg, 0, 0, productImg.width, productImg.height,
                          0, 0, iw, ih);
            loadUpperIMage()              
        };

      productImg.src = "CURVED_FORM_TEMPLATE.jpg"

    
    function loadUpperIMage(){
          var img = new Image();

        img.src = "bunny.png"

        img.onload = function()  {

        var iw = img.width;
        var ih = img.height;
        
         //alert(iw)
        
        var xOffset = 102, //left padding
            yOffset = 110; //top padding
        
        var a = 75.0; //image width
        var b = 10; //round ness
        
        var scaleFactor = iw / (4*a);

        // draw vertical slices
        for (var X = 0; X < iw; X+=1) {
          var y = b/a * Math.sqrt(a*a - (X-a)*(X-a)); // ellipsis equation
          ctx.drawImage(img, X * scaleFactor, 0,iw/2 , ih, X + xOffset, y + yOffset, 1, 174);
        }
    };
    }

};


function canvas2(){
 
  var canvas = document.getElementById("stl_cont2");
  var ctx = canvas.getContext("2d");


  var productImg = new Image();
      productImg.onload = function () {
          var iw = productImg.width;
          var ih = productImg.height;
          console.log("height");
  
          canvas.width = 400;
          canvas.height = 400;
  
          ctx.drawImage(productImg, 0, 0, productImg.width, productImg.height,
                        0, 0, iw, ih);
          loadUpperIMage()              
      };

    productImg.src = "CURVED_FORM_TEMPLATE.jpg"

  
  function loadUpperIMage(){
        var img = new Image();

      img.src = "bunny.png"

      img.onload = function()  {

      var iw = img.width;
      var ih = img.height;
      
       //alert(iw)
      
      var xOffset = 102, //left padding
          yOffset = 110; //top padding
      
      var a = 75.0; //image width
      var b = 10; //round ness
      
      var scaleFactor = iw / (4*a);

      // draw vertical slices
      for (var X = 0; X < iw; X+=1) {
        var y = b/a * Math.sqrt(a*a - (X-a)*(X-a)); // ellipsis equation
        ctx.drawImage(img, X * scaleFactor, 0,iw/2 , ih, X + xOffset, y + yOffset, 1, 174);
      }
  };
  }

};



function canvas3(){
 
  var canvas = document.getElementById("stl_cont3");
  var ctx = canvas.getContext("2d");

  loadUpperIMage() ;


  
  function loadUpperIMage(){
        var img = new Image();

      img.src = "bunny.png"

      img.onload = function()  {

      var iw = img.width;
      var ih = img.height;
      
       //alert(iw)
      
      var xOffset = 102, //left padding
          yOffset = 110; //top padding
      
      var a = 75.0; //image width
      var b = 10; //round ness
      
      var scaleFactor = iw / (4*a);

      // draw vertical slices
      for (var X = 0; X < iw; X+=1) {
        var y = b/a * Math.sqrt(a*a - (X-a)*(X-a)); // ellipsis equation
        ctx.drawImage(img, X * scaleFactor, 0,iw/2 , ih, X + xOffset, y + yOffset, 1, 174);
      }
  };
  }

};


setTimeout(function(){canvas1()} ,1000);
setTimeout(function(){canvas2()} ,1000);
setTimeout(function(){canvas3()} ,1000);



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


function stlLoad(files){


  document.getElementById('printPreview').setAttribute("style", "visibility:visible");


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
  stl_viewer1.do_resize();
  stl_viewer2.do_resize();
  stl_viewer3.do_resize();
  stl_viewer4.do_resize();
}


function loadBasic(){
  stl_viewerMain.remove_model(1);
  stl_viewerMain.add_model({id:1, filename:"Stanford_Bunny.stl",  animation:{delta:{rotationx:1,rotationy:0.5, msec:1000, loop:true}}});

}

$( function() {
  $( "#top" ).draggable({ axis: "x" , containment: "parent"});
  $( "#annoDisplay" ).draggable({containment: "parent"});
} );