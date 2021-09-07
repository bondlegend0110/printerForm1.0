
function canvas3(){
 
    var canvas = document.getElementById("canvas3");
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

        img.src = "bunny.jpg"

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

setTimeout(function(){canvas3()} ,1000);
