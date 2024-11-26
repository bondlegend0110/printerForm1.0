(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[649],{4967:function(e,t,r){Promise.resolve().then(r.bind(r,78101))},78101:function(e,t,r){"use strict";r.r(t);var i,n,a=r(57437),o=r(16463),l=r(2265),s=r(97776),d=r(77413),h=r(97501);let c="CURVED_FORM_TEMPLATE.jpg";(i=n||(n={}))[i.FOUR_SIDED_CUBE=0]="FOUR_SIDED_CUBE",i[i.SIX_SIDED_CUBE=1]="SIX_SIDED_CUBE",i[i.CURVED=2]="CURVED",i[i.CURVED_SIDE_VIEW=3]="CURVED_SIDE_VIEW";class m{async initializeRenderEnvironment(){this.modelDimensions=await this.loadModel(),this.createLights(350,this.cameraOffsetsFromModelDimensions(this.modelDimensions)),this.configureCamera(this.modelDimensions),this.configureRenderer(null),this.renderer.render(this.scene,this.camera)}appropriateCameraDistance(e){return Math.max(e.height,e.length,e.width)}producePrintable(e,t,r){switch(e){case 0:this.produceCubedPrintable(t,r);return;case 1:this.produceSixPrintable(t,r);return;case 2:this.produceCurvedPrintable(t,r);return;case 3:this.produceCurvedSideViewPrintable(t,r);return;default:throw Error("Invalid projection kind provided: ".concat(e,". Available options are ").concat(Object.keys(n)))}}produceRevolvedPrintable(e,t){let r=this.renderer.domElement.width,i=new h.kH({orientation:"landscape",unit:"mm",format:"a4"}),n=document.createElement("canvas");n.width=this.renderer.domElement.width,n.height=this.renderer.domElement.height;let a=n.getContext("2d");if(null===a)return;let o=0,l=()=>{let d=new Date().getTime();for(;o<r&&new Date().getTime()-d<=10;){let t=this.renderer.domElement.width/r,i=this.renderer.domElement.width/2-t/2,n=this.renderer.domElement.height;this.positionCamera(this.camera,this.modelDimensions,{phi:Math.PI/2,theta:2*Math.PI*o/r,radius:this.appropriateCameraDistance(this.modelDimensions)}),this.scene.background=new s.Color(16777215),this.scene.background.setHex(16777215*Math.random()),this.renderer.render(this.scene,this.camera);let l=this.renderer.domElement.getContext("webgl2");if(null===l)return;let d=new Uint8Array(t*n*4);l.readPixels(i,0,t,n,l.RGBA,l.UNSIGNED_BYTE,d);let h=new ImageData(t,n);d.forEach((e,t)=>h.data[t]=e),a.putImageData(h,o*t,0),e((o+1)/r),++o}if(o===r){let e=n.toDataURL("image/png");i.addImage(e,"PNG",0,0,297,210),t(i.output("dataurlstring"))}o<r&&setTimeout(l,1)};l(),document.body.appendChild(n)}produceCubedPrintable(e,t){let r=new h.kH({orientation:"landscape",unit:"mm",format:"a4"}),i=Math.floor(1122.5196850527),n=Math.floor(793.700787411),a=document.createElement("canvas");a.width=i,a.height=n;let o=a.getContext("2d");if(null===o)return;let l=0,s=[{theta:0,phi:Math.PI/2},{theta:0,phi:Math.PI},{theta:Math.PI,phi:Math.PI/2},{theta:0,phi:0}],d=new Image;d.src="FOUR_SIDED_BOX.jpg",d.onload=()=>{o.drawImage(d,0,0,i,n);let h=()=>{let d=new Date().getTime();for(;l<4&&new Date().getTime()-d<=10;){let t=this.renderer.domElement.width,r=this.renderer.domElement.height,{theta:a,phi:d}=s[l];this.positionCamera(this.camera,this.modelDimensions,{phi:d,theta:a,radius:this.appropriateCameraDistance(this.modelDimensions)});let h=this.renderer.domElement.getContext("webgl2",{preserveDrawingBuffer:!0,alpha:!0});if(null!==h&&(h.clearColor(0,0,0,0),h.clear(h.COLOR_BUFFER_BIT)),this.renderer.render(this.scene,this.camera),null===h)return;let c=Math.min(t,r),m=(t-c)/2,u=(r-c)/2,g=new Uint8Array(c*c*4);h.readPixels(m,u,c,c,h.RGBA,h.UNSIGNED_BYTE,g);let p=new ImageData(new Uint8ClampedArray(g),c,c),w=document.createElement("canvas");w.width=c,w.height=c;let x=w.getContext("2d");if(null===x)return;x.putImageData(p,0,0);let f=i/5,b=Math.min(f/c,n/c),D=c*b,v=c*b,C=l%5*f+(f-D)/2,I=(n-v)/2;o.drawImage(w,0,0,c,c,C+f,I,D,v),e((l+1)/4),++l}if(4===l){let e=a.toDataURL("image/png");r.addImage(e,"PNG",0,0,297,210),t(r.output("dataurlstring"))}l<4&&setTimeout(h,1)};h()},d.onerror=e=>{console.error("Error loading template image:",e)}}produceCurvedPrintable(e,t){let r=new Image;r.src=c,r.onload=()=>{var e=this;let i=r.width,n=r.height,a=document.createElement("canvas");a.width=i,a.height=n;let o=a.getContext("2d");if(null===o)return;o.drawImage(r,0,0,i,n);let l=function(t,a,l,s){let d=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,h=arguments.length>5?arguments[5]:void 0;e.positionCamera(e.camera,e.modelDimensions,{phi:t,theta:0,radius:e.appropriateCameraDistance(e.modelDimensions)});let c=e.renderer.domElement.getContext("webgl2");if(null!==c&&(c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT)),e.renderer.render(e.scene,e.camera),c){let e=new Uint8Array(i*n*4);c.readPixels(0,0,i,n,c.RGBA,c.UNSIGNED_BYTE,e);let t=new ImageData(new Uint8ClampedArray(e),i,n),m=document.createElement("canvas");m.width=i,m.height=n;let u=m.getContext("2d");if(null===u)return;u.putImageData(t,0,0),o.save(),a&&(o.translate(i,0),o.scale(-1,1)),l&&(o.translate(0,n),o.scale(1,-1));let g=i*h,p=n/2*h;o.drawImage(m,0,0,i,n/2,(i-g)/2+d,s,g,p),console.log(r.height),console.log(r.width),console.log(n),console.log(i),o.restore()}else console.error("Renderer context is null. Couldn't read pixels.")};l(0,!0,!1,80,360,.9),l(Math.PI,!1,!0,80,360,.9);let s=new h.kH({orientation:"portrait",unit:"px",format:[i,n],putOnlyUsedFonts:!0,floatPrecision:16}),d=a.toDataURL("image/png");s.addImage(d,"PNG",0,0,i,n),t(s.output("dataurlstring"))},r.onerror=e=>{console.error("Error loading image:",e)}}produceCurvedSideViewPrintable(e,t){let r=new Image;r.src=c,r.onload=()=>{var e=this;let i=r.width,n=r.height,a=document.createElement("canvas");a.width=i,a.height=n;let o=a.getContext("2d");if(null===o)return;o.drawImage(r,0,0,i,n);let l=function(t,a,l,s){let d=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,h=arguments.length>5?arguments[5]:void 0;e.positionCamera(e.camera,e.modelDimensions,{phi:t,theta:0,radius:e.appropriateCameraDistance(e.modelDimensions)});let c=e.renderer.domElement.getContext("webgl2");if(null!==c&&(c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT)),e.renderer.render(e.scene,e.camera),c){let e=new Uint8Array(i*n*4);c.readPixels(0,0,i,n,c.RGBA,c.UNSIGNED_BYTE,e);let t=new ImageData(new Uint8ClampedArray(e),i,n),m=document.createElement("canvas");m.width=i,m.height=n;let u=m.getContext("2d");if(null===u)return;u.putImageData(t,0,0),o.save(),a&&(o.translate(i,0),o.scale(-1,1)),l&&(o.translate(0,n),o.scale(1,-1));let g=i*h,p=n/2*h;o.drawImage(m,0,0,i,n/2,(i-g)/2+d,s,g,p),console.log(r.height),console.log(r.width),console.log(n),console.log(i),o.restore()}else console.error("Renderer context is null. Couldn't read pixels.")};l(0,!0,!1,80,360,.9),l(Math.PI,!1,!0,80,360,.9);let s=new h.kH({orientation:"portrait",unit:"px",format:[i,n],putOnlyUsedFonts:!0,floatPrecision:16}),d=a.toDataURL("image/png");s.addImage(d,"PNG",0,0,i,n),t(s.output("dataurlstring"))},r.onerror=e=>{console.error("Error loading image:",e)}}produceSixPrintable(e,t){let r=new h.kH({orientation:"landscape",unit:"mm",format:"a4"}),i=Math.floor(1122.5196850527),n=Math.floor(793.700787411),a=document.createElement("canvas");a.width=i,a.height=n;let o=a.getContext("2d");if(null===o)return;let l=0,s=[{theta:0,phi:Math.PI/2},{theta:0,phi:Math.PI},{theta:Math.PI,phi:Math.PI/2},{theta:0,phi:0},{theta:3*Math.PI/2,phi:Math.PI/2},{theta:Math.PI/2,phi:Math.PI/2}],d=new Image;d.src="SIX_SIDE_TEMPLATE1.jpg",d.onload=()=>{o.drawImage(d,0,0,i,n);let h=()=>{let d=new Date().getTime();for(;l<6&&new Date().getTime()-d<=10;){let t=this.renderer.domElement.width,r=this.renderer.domElement.height,{theta:a,phi:d}=s[l];this.positionCamera(this.camera,this.modelDimensions,{phi:d,theta:a,radius:this.appropriateCameraDistance(this.modelDimensions)});let h=this.renderer.domElement.getContext("webgl2",{preserveDrawingBuffer:!0,alpha:!0});if(null!==h&&(h.clearColor(0,0,0,0),h.clear(h.COLOR_BUFFER_BIT)),this.renderer.render(this.scene,this.camera),null===h)return;let c=Math.min(t,r),m=(t-c)/2,u=(r-c)/2,g=new Uint8Array(c*c*4);h.readPixels(m,u,c,c,h.RGBA,h.UNSIGNED_BYTE,g);let p=new ImageData(new Uint8ClampedArray(g),c,c),w=document.createElement("canvas");w.width=c,w.height=c;let x=w.getContext("2d");if(null===x)return;x.putImageData(p,0,0);let f=i/4,b=n/3,D=Math.min(f/c,b/c),v=c*D,C=c*D,I=0,E=0;l<4?(I=l*f+(f-v)/2,E=b):4==l?(I=3*f+(f-v)/2,E=0):5==l&&(I=3*f+(f-v)/2,E=2*b),o.drawImage(w,0,0,c,c,I,E,v,C),e((l+1)/6),++l}if(6===l){let e=a.toDataURL("image/png");r.addImage(e,"PNG",0,0,297,210),t(r.output("dataurlstring"))}l<6&&setTimeout(h,1)};h()},d.onerror=e=>{console.error("Error loading template image:",e)}}positionCamera(e,t,r){let i=function(e){let t=Math.max(0,e.phi),r=e.theta%(2*Math.PI);return[e.radius*Math.sin(t)*Math.cos(r),e.radius*Math.cos(t),e.radius*Math.sin(t)*Math.sin(r)]}(r);e.position.set(i[0]+0,i[1]+0,i[2]+0),e.lookAt(0,0,0)}configureCamera(e){this.camera.up.applyAxisAngle(new s.Vector3(1,0,0),Math.PI/2),this.positionCamera(this.camera,e,{phi:Math.PI/2,theta:-Math.PI,radius:this.appropriateCameraDistance(e)})}cameraOffsetsFromModelDimensions(e){return[1*e.width/2,1*e.length/2,0]}configureRenderer(e){this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setAnimationLoop(e),this.renderer.shadowMap.enabled=!0}createLights(e,t){let[r,i,n]=t;[[-e+r,i,e+n],[r,-e+i,e+n],[r,e+i,n]].map(e=>{let t=new s.DirectionalLight(16777215,2);t.position.set(e[0],e[1],e[2]),this.scene.add(t)}),this.scene.add(new s.AmbientLight),new s.SpotLight().position.set(r,i,e+n),this.scene.add(new s.SpotLight)}async loadModel(){let e=new d.j,t=await e.loadAsync(this.modelInfo.modelUrl),r=new s.MeshStandardMaterial({color:this.modelInfo.modelColor,side:2}),i=new s.Mesh(t,r);return i.castShadow=!0,i.receiveShadow=!0,this.scene.add(i),this.getModelDimensions(i,t)}getModelDimensions(e,t){var r;new s.Box3().setFromObject(e);let{min:i,max:n}=null!==(r=t.boundingBox)&&void 0!==r?r:{min:{x:0,y:0,z:0},max:{x:0,y:0,z:0}};t.computeVertexNormals(),t.computeBoundingSphere();let a={width:n.x-i.x,length:n.y-i.y,height:n.z-i.z};return t.applyMatrix4(new s.Matrix4().makeTranslation(-i.x-a.width/2,-i.y-a.length/2,-i.z-a.height/2)),{...a,boundingRadius:t.boundingSphere.radius}}constructor(e){this.modelInfo=e,this.modelDimensions={width:0,length:0,height:0,boundingRadius:0},this.scene=new s.Scene,this.camera=new s.PerspectiveCamera(75,window.innerWidth/window.innerHeight),this.renderer=new s.WebGLRenderer({antialias:!0,preserveDrawingBuffer:!0})}}let u=[{key:0,previewThumbnailImgSrc:"four_side_2.jpg",projectionDescription:"Suits a variety of geometries well",projectionTitle:"Four Sided Cube Projection"},{key:1,previewThumbnailImgSrc:"six_side_2.jpg",projectionDescription:"Suits a variety of geometries well",projectionTitle:"Six Sided Cube Projection"},{key:2,previewThumbnailImgSrc:"curved_2.jpg",projectionDescription:"Front and back of the model printed in a curved form",projectionTitle:"Curved Volume Form"},{key:3,previewThumbnailImgSrc:"curved_2.jpg",projectionDescription:"Side view of the model printed in a curved form",projectionTitle:"Curved Volume Form - Side View"}],g=()=>{let e=(0,o.useSearchParams)(),[t,r]=(0,l.useState)([]),[i,n]=(0,l.useState)({remainingProjections:0,numTotalQueuedProjections:0}),[s,d]=(0,l.useState)(0),h=(0,l.useRef)(null),[c,g]=(0,l.useState)(null),p=(0,l.useRef)(null),[w,x]=(0,l.useState)(!1),[f,b]=(0,l.useState)(!1),D=(0,o.useRouter)(),v=(e,t)=>{let r=t[0];e.producePrintable(r.key,e=>{h.current&&d(100*e)},r=>{c&&URL.revokeObjectURL(c);let i=atob(r.split(",")[1]),a=new Uint8Array(i.length);for(let e=0;e<i.length;e++)a[e]=i.charCodeAt(e);{let e=new Blob([a],{type:"application/pdf"});g(URL.createObjectURL(e)),x(!0)}let o=[...t.slice(1)];n(e=>({...e,remainingProjections:o.length})),d(0),o.length>0&&v(e,o)})},C=async()=>{var i;b(!0),c&&(URL.revokeObjectURL(c),g(null)),x(!1),n({remainingProjections:t.length,numTotalQueuedProjections:t.length}),r([]);let a=e.get("modelUrl");if(null===a)return;let o=new m({modelUrl:a,modelColor:null!==(i=e.get("modelColor"))&&void 0!==i?i:"#dedede"});await o.initializeRenderEnvironment(),v(o,t)},I=s>0;return(0,a.jsx)(l.Suspense,{fallback:(0,a.jsx)("div",{children:"Loading..."}),children:(0,a.jsxs)("div",{className:"flex flex-col h-screen w-full ",children:[(0,a.jsxs)("div",{className:"bg-[#1e1e1e] h-full overflow-scroll",children:[(0,a.jsxs)("div",{className:"flex flex-row items-center sticky h-16 top-0 bg-[#1e1e1e]",children:[(0,a.jsx)("div",{className:"px-8 w-full",children:(0,a.jsx)("h1",{className:"font-bold text-3xl text-white",children:"Select Model Projection(s)"})}),(0,a.jsx)("button",{type:"button",className:"bg-[#2c2c2c] px-4 h-full text-white",onClick:()=>{localStorage.setItem("returningToUpload","true"),D.push("/upload")},children:"Return to Editor"})]}),(0,a.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-8 pr-8 pb-8",children:u.map(e=>(0,a.jsxs)("div",{className:"rounded-md overflow-hidden ".concat(t.find(t=>t.key===e.key)?"border-blue-600":"border-[#2c2c2c] hover:border-blue-300"," transition duration-200 border-2 h-96"),onClick:()=>{t.find(t=>t.key===e.key)?r(t.filter(t=>t.key!==e.key)):r(t=>[...t,e])},children:[(0,a.jsx)("img",{src:e.previewThumbnailImgSrc,className:"h-52 w-full"}),(0,a.jsxs)("div",{className:"w-full h-full bg-[#222222] p-4 flex flex-col gap-y-2",children:[(0,a.jsx)("h2",{className:"text-xl font-bold text-white",children:e.projectionTitle}),(0,a.jsx)("p",{style:{color:"#D3D3D3"},children:e.projectionDescription})]})]},e.key))}),(0,a.jsxs)("div",{className:"bg-[#1e1e1e] px-5 py-3 flex flex-row justify-between items-center",children:[(0,a.jsx)("button",{type:"button",className:"bg-gray-500 hover:bg-gray-600 text-white transition duration-200 rounded-md p-5",onClick:()=>D.push("/upload"),children:"Reupload"}),(0,a.jsx)("button",{type:"button",className:"".concat(0===t.length||I?"bg-light-gray-300 text-gray-500 cursor-not-allowed":"bg-light-gray-500 hover:bg-light-gray-300 text-white"," transition duration-200 rounded-md p-5"),onClick:0===t.length||I?void 0:C,style:{backgroundColor:(t.length,"#8E2929")},children:"Next"})]}),w&&(0,a.jsxs)("div",{ref:p,style:{marginTop:"50px"},className:"bg-[#1e1e1e] px-8",children:[(0,a.jsx)("h2",{className:"text-2xl font-bold text-white mb-4",children:"PDF Preview"}),(0,a.jsx)("iframe",{id:"pdfPreview",src:c||"hi",width:"100%",height:"500px",title:"PDF Preview",style:{border:"1px solid black"}}),(0,a.jsx)("button",{type:"button",className:"transition duration-200 rounded-md p-5 mt-5 bg-light-gray-500 text-white",style:{backgroundColor:"#8E2929"},onClick:()=>{if(!c)return;let e=document.createElement("a");e.href=c,e.download="form.pdf",e.click()},children:"Download Final PDF"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"h-2 w-full ".concat(!I&&"bg-[#1e1e1e]"),children:(0,a.jsx)("div",{className:"relative h-full overflow-hidden bg-[#222222]",children:(0,a.jsx)("div",{id:"progress-bar",ref:h,className:"h-full bg-blue-500 transition-all duration-200",style:{width:"".concat(s,"%")}})})}),(0,a.jsx)("div",{className:"bg-[#2c2c2c] px-5 py-3 flex flex-row justify-between items-center",children:0===i.remainingProjections?(0,a.jsxs)("p",{className:"text-xl",children:[(0,a.jsx)("span",{className:"font-bold transition duration-200 ".concat(0===t.length?"text-red-600":"text-blue-500"),children:t.length})," Projections Selected"]}):(0,a.jsxs)("div",{className:"flex flex-row items-center gap-x-4",children:[(0,a.jsxs)("p",{className:"text-xl",children:["Producing Projection Printable ",i.numTotalQueuedProjections-i.remainingProjections+1,"/",i.numTotalQueuedProjections]}),(0,a.jsx)("p",{children:"|"}),(0,a.jsxs)("p",{className:"font-bold text-2xl text-blue-400",children:[Math.round(s),"%"]})]})})]})]})})};t.default=()=>(0,a.jsx)(l.Suspense,{children:(0,a.jsx)(g,{})})}},function(e){e.O(0,[689,505,842,971,23,744],function(){return e(e.s=4967)}),_N_E=e.O()}]);