(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[649],{4967:function(e,t,r){Promise.resolve().then(r.bind(r,78101))},78101:function(e,t,r){"use strict";r.r(t);var n,i,a=r(57437),l=r(16463),o=r(2265),s=r(97776),d=r(77413),h=r(97501);let c="CURVED_FORM_TEMPLATE.jpg";(n=i||(i={}))[n.FOUR_SIDED_CUBE=0]="FOUR_SIDED_CUBE",n[n.SIX_SIDED_CUBE=1]="SIX_SIDED_CUBE",n[n.CURVED=2]="CURVED",n[n.CURVED_SIDE_VIEW=3]="CURVED_SIDE_VIEW";class m{async initializeRenderEnvironment(){this.modelDimensions=await this.loadModel(),this.createLights(350,this.cameraOffsetsFromModelDimensions(this.modelDimensions)),this.configureCamera(this.modelDimensions),this.configureRenderer(null),this.renderer.render(this.scene,this.camera)}appropriateCameraDistance(e){return Math.max(e.height,e.length,e.width)}producePrintable(e,t,r){switch(e){case 0:this.produceCubedPrintable(t,r);return;case 1:this.produceSixPrintable(t,r);return;case 2:this.produceCurvedPrintable(t,r);return;case 3:this.produceCurvedSideViewPrintable(t,r);return;default:throw Error("Invalid projection kind provided: ".concat(e,". Available options are ").concat(Object.keys(i)))}}produceRevolvedPrintable(e,t){let r=this.renderer.domElement.width,n=new h.kH({orientation:"landscape",unit:"mm",format:"a4"}),i=document.createElement("canvas");i.width=this.renderer.domElement.width,i.height=this.renderer.domElement.height;let a=i.getContext("2d");if(null===a)return;let l=0,o=()=>{let d=new Date().getTime();for(;l<r&&new Date().getTime()-d<=10;){let t=this.renderer.domElement.width/r,n=this.renderer.domElement.width/2-t/2,i=this.renderer.domElement.height;this.positionCamera(this.camera,this.modelDimensions,{phi:Math.PI/2,theta:2*Math.PI*l/r,radius:this.appropriateCameraDistance(this.modelDimensions)}),this.scene.background=new s.Color(16777215),this.scene.background.setHex(16777215*Math.random()),this.renderer.render(this.scene,this.camera);let o=this.renderer.domElement.getContext("webgl2");if(null===o)return;let d=new Uint8Array(t*i*4);o.readPixels(n,0,t,i,o.RGBA,o.UNSIGNED_BYTE,d);let h=new ImageData(t,i);d.forEach((e,t)=>h.data[t]=e),a.putImageData(h,l*t,0),e((l+1)/r),++l}if(l===r){let e=i.toDataURL("image/png");n.addImage(e,"PNG",0,0,297,210),t(n.output("dataurlstring"))}l<r&&setTimeout(o,1)};o(),document.body.appendChild(i)}produceCubedPrintable(e,t){let r=new h.kH({orientation:"landscape",unit:"mm",format:"a4"}),n=Math.floor(1122.5196850527),i=Math.floor(793.700787411),a=document.createElement("canvas");a.width=n,a.height=i;let l=a.getContext("2d");if(null===l)return;let o=0,s=[{theta:0,phi:Math.PI/2},{theta:0,phi:Math.PI},{theta:Math.PI,phi:Math.PI/2},{theta:0,phi:0}],d=new Image;d.src="FOUR_SIDED_BOX.jpg",d.onload=()=>{l.drawImage(d,0,0,n,i);let h=()=>{let d=new Date().getTime();for(;o<4&&new Date().getTime()-d<=10;){let t=this.renderer.domElement.width,r=this.renderer.domElement.height,{theta:a,phi:d}=s[o];this.positionCamera(this.camera,this.modelDimensions,{phi:d,theta:a,radius:this.appropriateCameraDistance(this.modelDimensions)});let h=this.renderer.domElement.getContext("webgl2",{preserveDrawingBuffer:!0,alpha:!0});if(null!==h&&(h.clearColor(0,0,0,0),h.clear(h.COLOR_BUFFER_BIT)),this.renderer.render(this.scene,this.camera),null===h)return;let c=Math.min(t,r),m=(t-c)/2,u=(r-c)/2,g=new Uint8Array(c*c*4);h.readPixels(m,u,c,c,h.RGBA,h.UNSIGNED_BYTE,g);let p=new ImageData(new Uint8ClampedArray(g),c,c),w=document.createElement("canvas");w.width=c,w.height=c;let x=w.getContext("2d");if(null===x)return;x.putImageData(p,0,0);let f=n/5,b=Math.min(f/c,i/c),C=c*b,D=c*b,I=o%5*f+(f-C)/2,v=(i-D)/2;l.drawImage(w,0,0,c,c,I+f,v,C,D),e((o+1)/4),++o}if(4===o){let e=a.toDataURL("image/png");r.addImage(e,"PNG",0,0,297,210),t(r.output("dataurlstring"))}o<4&&setTimeout(h,1)};h()},d.onerror=e=>{console.error("Error loading template image:",e)}}produceCurvedPrintable(e,t){let r=new Image;r.src=c,r.onload=()=>{let e=r.width,n=r.height,i=document.createElement("canvas");i.width=e,i.height=n;let a=i.getContext("2d");if(null===a)return;a.drawImage(r,0,0,e,n);let l=(t,r,i,l,o)=>{this.positionCamera(this.camera,this.modelDimensions,{phi:t,theta:0,radius:this.appropriateCameraDistance(this.modelDimensions)});let s=this.renderer.domElement.getContext("webgl2");if(null!==s&&(s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT)),this.renderer.render(this.scene,this.camera),s){let t=new Uint8Array(e*n*4);s.readPixels(0,0,e,n,s.RGBA,s.UNSIGNED_BYTE,t);let d=new ImageData(new Uint8ClampedArray(t),e,n),h=document.createElement("canvas");h.width=e,h.height=n;let c=h.getContext("2d");if(null===c)return;c.putImageData(d,0,0),a.save(),r&&(a.translate(e,0),a.scale(-1,1)),i&&(a.translate(0,n),a.scale(1,-1));let m=e*o,u=n/2*o,g=e/2;a.drawImage(h,0,0,e,n/2,g-m/2,l,m,u),a.restore()}else console.error("Renderer context is null. Couldn't read pixels.")};l(0,!0,!1,80,.9),l(Math.PI,!1,!0,n/2+80,.9);let o=new h.kH({orientation:"portrait",unit:"px",format:[e,n],putOnlyUsedFonts:!0,floatPrecision:16}),s=i.toDataURL("image/png");o.addImage(s,"PNG",0,0,e,n),t(o.output("dataurlstring"))},r.onerror=e=>{console.error("Error loading image:",e)}}produceCurvedPrintable2(e,t){let r=new Image;r.src=c,r.onload=()=>{let e=r.width,n=r.height,i=document.createElement("canvas");i.width=e,i.height=n;let a=i.getContext("2d");if(null===a)return;a.drawImage(r,0,0,e,n);let l=(t,r,i,l,o)=>{this.positionCamera(this.camera,this.modelDimensions,{phi:t,theta:0,radius:this.appropriateCameraDistance(this.modelDimensions)});let s=this.renderer.domElement.getContext("webgl2");if(null!==s&&(s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT)),this.renderer.render(this.scene,this.camera),s){let t=new Uint8Array(e*n*4);s.readPixels(0,0,e,n,s.RGBA,s.UNSIGNED_BYTE,t);let d=new ImageData(new Uint8ClampedArray(t),e,n),h=document.createElement("canvas");h.width=e,h.height=n;let c=h.getContext("2d");if(null===c)return;c.putImageData(d,0,0),a.save(),r&&(a.translate(e,0),a.scale(-1,1)),i&&(a.translate(0,n),a.scale(1,-1));let m=e*o,u=n/2*o,g=(e-m)/2;a.drawImage(h,0,0,e,n/2,g,l,m,u),a.restore()}else console.error("Renderer context is null. Couldn't read pixels.")};l(0,!0,!1,80,.9),l(Math.PI,!1,!0,80,.9);let o=new h.kH({orientation:"portrait",unit:"px",format:[e,n],putOnlyUsedFonts:!0,floatPrecision:16}),s=i.toDataURL("image/png");o.addImage(s,"PNG",0,0,e,n),t(o.output("dataurlstring"))},r.onerror=e=>{console.error("Error loading image:",e)}}produceCurvedPrintable1(e,t){let r=new Image;r.src=c,r.onload=()=>{var e=this;let n=r.width,i=r.height,a=document.createElement("canvas");a.width=n,a.height=i;let l=a.getContext("2d");if(null===l)return;l.drawImage(r,0,0,n,i);let o=function(t,a,o,s){let d=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,h=arguments.length>5?arguments[5]:void 0;e.positionCamera(e.camera,e.modelDimensions,{phi:t,theta:0,radius:e.appropriateCameraDistance(e.modelDimensions)});let c=e.renderer.domElement.getContext("webgl2");if(null!==c&&(c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT)),e.renderer.render(e.scene,e.camera),c){let e=new Uint8Array(n*i*4);c.readPixels(0,0,n,i,c.RGBA,c.UNSIGNED_BYTE,e);let t=new ImageData(new Uint8ClampedArray(e),n,i),m=document.createElement("canvas");m.width=n,m.height=i;let u=m.getContext("2d");if(null===u)return;u.putImageData(t,0,0),l.save(),a&&(l.translate(n,0),l.scale(-1,1)),o&&(l.translate(0,i),l.scale(1,-1));let g=n*h,p=i/2*h;l.drawImage(m,0,0,n,i/2,(n-g)/2+d,s,g,p),console.log(r.height),console.log(r.width),console.log(i),console.log(n),l.restore()}else console.error("Renderer context is null. Couldn't read pixels.")};o(0,!0,!1,80,360,.9),o(Math.PI,!1,!0,80,360,.9);let s=new h.kH({orientation:"portrait",unit:"px",format:[n,i],putOnlyUsedFonts:!0,floatPrecision:16}),d=a.toDataURL("image/png");s.addImage(d,"PNG",0,0,n,i),t(s.output("dataurlstring"))},r.onerror=e=>{console.error("Error loading image:",e)}}produceCurvedSideViewPrintable(e,t){let r=new Image;r.src=c,r.onload=()=>{var e=this;let n=r.width,i=r.height,a=document.createElement("canvas");a.width=n,a.height=i;let l=a.getContext("2d");if(null===l)return;l.drawImage(r,0,0,n,i);let o=function(t,a,o,s){let d=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,h=arguments.length>5?arguments[5]:void 0;e.positionCamera(e.camera,e.modelDimensions,{phi:t,theta:0,radius:e.appropriateCameraDistance(e.modelDimensions)});let c=e.renderer.domElement.getContext("webgl2");if(null!==c&&(c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT)),e.renderer.render(e.scene,e.camera),c){let e=new Uint8Array(n*i*4);c.readPixels(0,0,n,i,c.RGBA,c.UNSIGNED_BYTE,e);let t=new ImageData(new Uint8ClampedArray(e),n,i),m=document.createElement("canvas");m.width=n,m.height=i;let u=m.getContext("2d");if(null===u)return;u.putImageData(t,0,0),l.save(),a&&(l.translate(n,0),l.scale(-1,1)),o&&(l.translate(0,i),l.scale(1,-1));let g=n*h,p=i/2*h;l.drawImage(m,0,0,n,i/2,(n-g)/2+d,s,g,p),console.log(r.height),console.log(r.width),console.log(i),console.log(n),l.restore()}else console.error("Renderer context is null. Couldn't read pixels.")};o(Math.PI/2,!0,!1,80,360,.9),o(-Math.PI/2,!1,!0,80,360,.9);let s=new h.kH({orientation:"portrait",unit:"px",format:[n,i],putOnlyUsedFonts:!0,floatPrecision:16}),d=a.toDataURL("image/png");s.addImage(d,"PNG",0,0,n,i),t(s.output("dataurlstring"))},r.onerror=e=>{console.error("Error loading image:",e)}}produceSixPrintable(e,t){let r=new h.kH({orientation:"landscape",unit:"mm",format:"a4"}),n=Math.floor(1122.5196850527),i=Math.floor(793.700787411),a=document.createElement("canvas");a.width=n,a.height=i;let l=a.getContext("2d");if(null===l)return;let o=0,s=[{theta:0,phi:Math.PI/2},{theta:0,phi:Math.PI},{theta:Math.PI,phi:Math.PI/2},{theta:0,phi:0},{theta:3*Math.PI/2,phi:Math.PI/2},{theta:Math.PI/2,phi:Math.PI/2}],d=new Image;d.src="SIX_SIDE_TEMPLATE1.jpg",d.onload=()=>{l.drawImage(d,0,0,n,i);let h=()=>{let d=new Date().getTime();for(;o<6&&new Date().getTime()-d<=10;){let t=this.renderer.domElement.width,r=this.renderer.domElement.height,{theta:a,phi:d}=s[o];this.positionCamera(this.camera,this.modelDimensions,{phi:d,theta:a,radius:this.appropriateCameraDistance(this.modelDimensions)});let h=this.renderer.domElement.getContext("webgl2",{preserveDrawingBuffer:!0,alpha:!0});if(null!==h&&(h.clearColor(0,0,0,0),h.clear(h.COLOR_BUFFER_BIT)),this.renderer.render(this.scene,this.camera),null===h)return;let c=Math.min(t,r),m=(t-c)/2,u=(r-c)/2,g=new Uint8Array(c*c*4);h.readPixels(m,u,c,c,h.RGBA,h.UNSIGNED_BYTE,g);let p=new ImageData(new Uint8ClampedArray(g),c,c),w=document.createElement("canvas");w.width=c,w.height=c;let x=w.getContext("2d");if(null===x)return;x.putImageData(p,0,0);let f=n/4,b=i/3,C=Math.min(f/c,b/c),D=c*C,I=c*C,v=0,E=0;o<4?(v=o*f+(f-D)/2,E=b):4==o?(v=3*f+(f-D)/2,E=0):5==o&&(v=3*f+(f-D)/2,E=2*b),l.drawImage(w,0,0,c,c,v,E,D,I),e((o+1)/6),++o}if(6===o){let e=a.toDataURL("image/png");r.addImage(e,"PNG",0,0,297,210),t(r.output("dataurlstring"))}o<6&&setTimeout(h,1)};h()},d.onerror=e=>{console.error("Error loading template image:",e)}}positionCamera(e,t,r){let n=function(e){let t=Math.max(0,e.phi),r=e.theta%(2*Math.PI);return[e.radius*Math.sin(t)*Math.cos(r),e.radius*Math.cos(t),e.radius*Math.sin(t)*Math.sin(r)]}(r);e.position.set(n[0]+0,n[1]+0,n[2]+0),e.lookAt(0,0,0)}configureCamera(e){this.camera.up.applyAxisAngle(new s.Vector3(1,0,0),Math.PI/2),this.positionCamera(this.camera,e,{phi:Math.PI/2,theta:-Math.PI,radius:this.appropriateCameraDistance(e)})}cameraOffsetsFromModelDimensions(e){return[1*e.width/2,1*e.length/2,0]}configureRenderer(e){this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setAnimationLoop(e),this.renderer.shadowMap.enabled=!0}createLights(e,t){let[r,n,i]=t;[[-e+r,n,e+i],[r,-e+n,e+i],[r,e+n,i]].map(e=>{let t=new s.DirectionalLight(16777215,2);t.position.set(e[0],e[1],e[2]),this.scene.add(t)}),this.scene.add(new s.AmbientLight),new s.SpotLight().position.set(r,n,e+i),this.scene.add(new s.SpotLight)}async loadModel(){let e=new d.j,t=await e.loadAsync(this.modelInfo.modelUrl),r=new s.MeshStandardMaterial({color:this.modelInfo.modelColor,side:2}),n=new s.Mesh(t,r);return n.castShadow=!0,n.receiveShadow=!0,this.scene.add(n),this.getModelDimensions(n,t)}getModelDimensions(e,t){var r;new s.Box3().setFromObject(e);let{min:n,max:i}=null!==(r=t.boundingBox)&&void 0!==r?r:{min:{x:0,y:0,z:0},max:{x:0,y:0,z:0}};t.computeVertexNormals(),t.computeBoundingSphere();let a={width:i.x-n.x,length:i.y-n.y,height:i.z-n.z};return t.applyMatrix4(new s.Matrix4().makeTranslation(-n.x-a.width/2,-n.y-a.length/2,-n.z-a.height/2)),{...a,boundingRadius:t.boundingSphere.radius}}constructor(e){this.modelInfo=e,this.modelDimensions={width:0,length:0,height:0,boundingRadius:0},this.scene=new s.Scene,this.camera=new s.PerspectiveCamera(75,window.innerWidth/window.innerHeight),this.renderer=new s.WebGLRenderer({antialias:!0,preserveDrawingBuffer:!0})}}let u=[{key:0,previewThumbnailImgSrc:"four_side_2.jpg",projectionDescription:"Suits a variety of geometries well",projectionTitle:"Four Sided Cube Projection"},{key:1,previewThumbnailImgSrc:"six_side_2.jpg",projectionDescription:"Suits a variety of geometries well",projectionTitle:"Six Sided Cube Projection"},{key:2,previewThumbnailImgSrc:"curved_2.jpg",projectionDescription:"Front and back of the model printed in a curved form",projectionTitle:"Curved Volume Form"},{key:3,previewThumbnailImgSrc:"curved_2.jpg",projectionDescription:"Side view of the model printed in a curved form",projectionTitle:"Curved Volume Form - Side View"}],g=()=>{let e=(0,l.useSearchParams)(),[t,r]=(0,o.useState)([]),[n,i]=(0,o.useState)({remainingProjections:0,numTotalQueuedProjections:0}),[s,d]=(0,o.useState)(0),h=(0,o.useRef)(null),[c,g]=(0,o.useState)(null),p=(0,o.useRef)(null),[w,x]=(0,o.useState)(!1),[f,b]=(0,o.useState)(!1),C=(0,l.useRouter)(),D=(e,t)=>{let r=t[0];e.producePrintable(r.key,e=>{h.current&&d(100*e)},r=>{c&&URL.revokeObjectURL(c);let n=atob(r.split(",")[1]),a=new Uint8Array(n.length);for(let e=0;e<n.length;e++)a[e]=n.charCodeAt(e);{let e=new Blob([a],{type:"application/pdf"});g(URL.createObjectURL(e)),x(!0)}let l=[...t.slice(1)];i(e=>({...e,remainingProjections:l.length})),d(0),l.length>0&&D(e,l)})},I=async()=>{var n;b(!0),c&&(URL.revokeObjectURL(c),g(null)),x(!1),i({remainingProjections:t.length,numTotalQueuedProjections:t.length}),r([]);let a=e.get("modelUrl");if(null===a)return;let l=new m({modelUrl:a,modelColor:null!==(n=e.get("modelColor"))&&void 0!==n?n:"#dedede"});await l.initializeRenderEnvironment(),D(l,t)},v=s>0;return(0,a.jsx)(o.Suspense,{fallback:(0,a.jsx)("div",{children:"Loading..."}),children:(0,a.jsxs)("div",{className:"flex flex-col h-screen w-full ",children:[(0,a.jsxs)("div",{className:"bg-[#1e1e1e] h-full overflow-scroll",children:[(0,a.jsxs)("div",{className:"flex flex-row items-center sticky h-16 top-0 bg-[#1e1e1e]",children:[(0,a.jsx)("div",{className:"px-8 w-full",children:(0,a.jsx)("h1",{className:"font-bold text-3xl text-white",children:"Select Model Projection(s)"})}),(0,a.jsx)("button",{type:"button",className:"bg-[#2c2c2c] px-4 h-full text-white",onClick:()=>{localStorage.setItem("returningToUpload","true"),C.push("/upload")},children:"Return to Editor"})]}),(0,a.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-8 pr-8 pb-8",children:u.map(e=>(0,a.jsxs)("div",{className:"rounded-md overflow-hidden ".concat(t.find(t=>t.key===e.key)?"border-blue-600":"border-[#2c2c2c] hover:border-blue-300"," transition duration-200 border-2 h-96"),onClick:()=>{t.find(t=>t.key===e.key)?r(t.filter(t=>t.key!==e.key)):r(t=>[...t,e])},children:[(0,a.jsx)("img",{src:e.previewThumbnailImgSrc,className:"h-52 w-full"}),(0,a.jsxs)("div",{className:"w-full h-full bg-[#222222] p-4 flex flex-col gap-y-2",children:[(0,a.jsx)("h2",{className:"text-xl font-bold text-white",children:e.projectionTitle}),(0,a.jsx)("p",{style:{color:"#D3D3D3"},children:e.projectionDescription})]})]},e.key))}),(0,a.jsxs)("div",{className:"bg-[#1e1e1e] px-5 py-3 flex flex-row justify-between items-center",children:[(0,a.jsx)("button",{type:"button",className:"bg-gray-500 hover:bg-gray-600 text-white transition duration-200 rounded-md p-5",onClick:()=>C.push("/upload"),children:"Reupload"}),(0,a.jsx)("button",{type:"button",className:"".concat(0===t.length||v?"bg-light-gray-300 text-gray-500 cursor-not-allowed":"bg-light-gray-500 hover:bg-light-gray-300 text-white"," transition duration-200 rounded-md p-5"),onClick:0===t.length||v?void 0:I,style:{backgroundColor:(t.length,"#8E2929")},children:"Next"})]}),w&&(0,a.jsxs)("div",{ref:p,style:{marginTop:"50px"},className:"bg-[#1e1e1e] px-8",children:[(0,a.jsx)("h2",{className:"text-2xl font-bold text-white mb-4",children:"PDF Preview"}),(0,a.jsx)("iframe",{id:"pdfPreview",src:c||"hi",width:"100%",height:"500px",title:"PDF Preview",style:{border:"1px solid black"}}),(0,a.jsx)("button",{type:"button",className:"transition duration-200 rounded-md p-5 mt-5 bg-light-gray-500 text-white",style:{backgroundColor:"#8E2929"},onClick:()=>{if(!c)return;let e=document.createElement("a");e.href=c,e.download="form.pdf",e.click()},children:"Download Final PDF"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"h-2 w-full ".concat(!v&&"bg-[#1e1e1e]"),children:(0,a.jsx)("div",{className:"relative h-full overflow-hidden bg-[#222222]",children:(0,a.jsx)("div",{id:"progress-bar",ref:h,className:"h-full bg-blue-500 transition-all duration-200",style:{width:"".concat(s,"%")}})})}),(0,a.jsx)("div",{className:"bg-[#2c2c2c] px-5 py-3 flex flex-row justify-between items-center",children:0===n.remainingProjections?(0,a.jsxs)("p",{className:"text-xl",children:[(0,a.jsx)("span",{className:"font-bold transition duration-200 ".concat(0===t.length?"text-red-600":"text-blue-500"),children:t.length})," Projections Selected"]}):(0,a.jsxs)("div",{className:"flex flex-row items-center gap-x-4",children:[(0,a.jsxs)("p",{className:"text-xl",children:["Producing Projection Printable ",n.numTotalQueuedProjections-n.remainingProjections+1,"/",n.numTotalQueuedProjections]}),(0,a.jsx)("p",{children:"|"}),(0,a.jsxs)("p",{className:"font-bold text-2xl text-blue-400",children:[Math.round(s),"%"]})]})})]})]})})};t.default=()=>(0,a.jsx)(o.Suspense,{children:(0,a.jsx)(g,{})})}},function(e){e.O(0,[689,505,842,971,23,744],function(){return e(e.s=4967)}),_N_E=e.O()}]);