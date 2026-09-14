/*! LICENSE: ort.mjs.LICENSE.txt */
let e;var t,i,r,a,s,n,o,u,l,d,p,c,h,f,m,g,_,y,$,b,w,v,x,k,S,I,T,E,z,C,O,B,A,R,M,D,P,q,N,U,V,L,G,W,j,H,F,K,Z,Q,X,Y,J,ee,et,ei,er,ea,es,en,eo,eu,el,ed,ep,ec,eh,ef,em,eg,e_,ey,e$,eb,ew,ev,ex,ek,eS,eI,eT,eE,ez,eC,eO,eB,eA,eR,eM,eD,eP,eq,eN,eU,eV,eL,eG,eW,ej,eH,eF,eK,eZ,eQ,eX,eY,eJ,e0,e1,e2,e3,e4,e6,e8,e5,e7,e9,te,tt,ti,tr,ta,ts,tn,to,tu,tl,td,tp,tc,th,tf,tm,tg,t_,ty,t$,tb,tw,tv,tx,tk,tS,tI,tT,tE,tz,tC,tO,tB,tA,tR,tM,tD,tP,tq,tN,tU,tV,tL,tG,tW,tj,tH,tF,tK,tZ,tQ,tX,tY,tJ,t0,t1,t2,t3,t4,t6,t8,t5,t7,t9,ie,it,ii,ir,ia,is,io,iu,il,id,ip,ic,ih,im,ig,i_,iy,i$,ib,iw,iv,ix,ik,iS,iI,iT,iE,iz,iC,iO,iB,iA,iR,iM,iD,iP,iq,iN,iU,iV,iL,iG,iW,ij,iH,iF,iK,iZ,iQ,iX,iY,iJ,i0,i1,i2,i3,i4,i6,i8,i5,i7,i9,re,rt,ri,rr,ra,rs,rn,ro,ru,rl,rd,rp,rc,rh,rf,rm,rg,r_,ry,r$,rb,rw,rv,rx,rk,rS,rI,rT,rE,rz,rC,rO,rB,rA,rR,rM,rD,rP,rq,rN,rU,rV,rL,rG,rW,rj,rH,rF,rK,rZ,rQ,rX,rY,rJ,r0,r1,r2,r3,r4,r6,r8,r5,r7,r9,ae,at,ai,ar,aa,as,an,ao,au,al,ad,ap,ac,ah,af,am,ag,a_,ay,a$,ab,aw,av,ax,ak,aS,aI,aT,aE,az,aC,aO,aB,aA,aR,aM,aD,aP,aq,aN,aU,aV,aL,aG,aW,aj,aH,aF,aK,aZ,aQ,aX,aY,aJ,a0,a1,a2,a3,a4,a6,a8,a5,a7,a9,se,st,si,sr,sa,ss,sn,so,su,sl,sd,sp,sc,sh,sf=Object.defineProperty,sm=Object.getOwnPropertyDescriptor,sg=Object.getOwnPropertyNames,s_=Object.prototype.hasOwnProperty,sy=(e=function(e){if("u">typeof require)return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')},"u">typeof require?require:"u">typeof Proxy?new Proxy(e,{get:(e,t)=>("u">typeof require?require:e)[t]}):e),s$=(e,t)=>function(){return e&&(t=(0,e[sg(e)[0]])(e=0)),t},sb=(e,t)=>{for(var i in t)sf(e,i,{get:t[i],enumerable:!0})},sw=e=>((e,t,i,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let a of sg(t))s_.call(e,a)||a===i||sf(e,a,{get:()=>t[a],enumerable:!(r=sm(t,a))||r.enumerable});return e})(sf({},"__esModule",{value:!0}),e),sv=s$({"common/dist/esm/backend-impl.js"(){"use strict";t=new Map,i=[],r=(e,r,a)=>{if(r&&"function"==typeof r.init&&"function"==typeof r.createInferenceSessionHandler){let s=t.get(e);if(void 0===s)t.set(e,{backend:r,priority:a});else if(s.priority>a)return;else if(s.priority===a&&s.backend!==r)throw Error(`cannot register backend "${e}" using priority ${a}`);if(a>=0){let r=i.indexOf(e);-1!==r&&i.splice(r,1);for(let r=0;r<i.length;r++)if(t.get(i[r]).priority<=a)return void i.splice(r,0,e);i.push(e)}return}throw TypeError("not a valid backend")},a=async e=>{let i=t.get(e);if(!i)return"backend not found.";if(i.initialized)return i.backend;{if(i.aborted)return i.error;let t=!!i.initPromise;try{return t||(i.initPromise=i.backend.init(e)),await i.initPromise,i.initialized=!0,i.backend}catch(e){return t||(i.error=`${e}`,i.aborted=!0),i.error}finally{delete i.initPromise}}},s=async e=>{let t,r=e.executionProviders||[],s=r.map(e=>"string"==typeof e?e:e.name),n=0===s.length?i:s,o=[],u=new Set;for(let e of n){let i=await a(e);"string"==typeof i?o.push({name:e,err:i}):(t||(t=i),t===i&&u.add(e))}if(!t)throw Error(`no available backend found. ERR: ${o.map(e=>`[${e.name}] ${e.err}`).join(", ")}`);for(let{name:e,err:t}of o)s.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${t}`);let l=r.filter(e=>u.has("string"==typeof e?e:e.name));return[t,new Proxy(e,{get:(e,t)=>"executionProviders"===t?l:Reflect.get(e,t)})]}}}),sx=s$({"common/dist/esm/backend.js"(){"use strict";sv()}}),sk=s$({"common/dist/esm/version.js"(){"use strict";n="1.24.3"}}),sS=s$({"common/dist/esm/env-impl.js"(){"use strict";sk(),o="warning",Object.defineProperty(u={wasm:{},webgl:{},webgpu:{},versions:{common:n},set logLevel(value){if(void 0===value)return;if("string"!=typeof value||-1===["verbose","info","warning","error","fatal"].indexOf(value))throw Error(`Unsupported logging level: ${value}`);o=value},get logLevel(){return o}},"logLevel",{enumerable:!0})}}),sI=s$({"common/dist/esm/env.js"(){"use strict";sS(),l=u}}),sT=s$({"common/dist/esm/tensor-conversion-impl.js"(){"use strict";d=(e,t)=>{let i="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);i.width=e.dims[3],i.height=e.dims[2];let r=i.getContext("2d");if(null!=r){let a,s,n,o;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(a=e.dims[2],s=e.dims[3]):(a=e.dims[3],s=e.dims[2]);let u=t?.format!==void 0?t.format:"RGB",l=t?.norm;void 0===l||void 0===l.mean?n=[255,255,255,255]:"number"==typeof l.mean?n=[l.mean,l.mean,l.mean,l.mean]:(n=[l.mean[0],l.mean[1],l.mean[2],0],void 0!==l.mean[3]&&(n[3]=l.mean[3])),void 0===l||void 0===l.bias?o=[0,0,0,0]:"number"==typeof l.bias?o=[l.bias,l.bias,l.bias,l.bias]:(o=[l.bias[0],l.bias[1],l.bias[2],0],void 0!==l.bias[3]&&(o[3]=l.bias[3]));let d=s*a,p=0,c=d,h=2*d,f=-1;"RGBA"===u?(p=0,c=d,h=2*d,f=3*d):"RGB"===u?(p=0,c=d,h=2*d):"RBG"===u&&(p=0,h=d,c=2*d);for(let t=0;t<s;t++)for(let i=0;i<a;i++)r.fillStyle="rgba("+(e.data[p++]-o[0])*n[0]+","+(e.data[c++]-o[1])*n[1]+","+(e.data[h++]-o[2])*n[2]+","+(-1===f?255:(e.data[f++]-o[3])*n[3])+")",r.fillRect(i,t,1,1);if("toDataURL"in i)return i.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},p=(e,t)=>{let i,r="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d");if(null!=r){let a,s,n,o,u;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(a=e.dims[2],s=e.dims[1],n=e.dims[3]):(a=e.dims[3],s=e.dims[2],n=e.dims[1]);let l=void 0!==t&&void 0!==t.format?t.format:"RGB",d=t?.norm;void 0===d||void 0===d.mean?o=[255,255,255,255]:"number"==typeof d.mean?o=[d.mean,d.mean,d.mean,d.mean]:(o=[d.mean[0],d.mean[1],d.mean[2],255],void 0!==d.mean[3]&&(o[3]=d.mean[3])),void 0===d||void 0===d.bias?u=[0,0,0,0]:"number"==typeof d.bias?u=[d.bias,d.bias,d.bias,d.bias]:(u=[d.bias[0],d.bias[1],d.bias[2],0],void 0!==d.bias[3]&&(u[3]=d.bias[3]));let p=s*a;if(void 0!==t&&(void 0!==t.format&&4===n&&"RGBA"!==t.format||3===n&&"RGB"!==t.format&&"BGR"!==t.format))throw Error("Tensor format doesn't match input tensor dims");let c=0,h=1,f=2,m=3,g=0,_=p,y=2*p,$=-1;"RGBA"===l?(g=0,_=p,y=2*p,$=3*p):"RGB"===l?(g=0,_=p,y=2*p):"RBG"===l&&(g=0,y=p,_=2*p),i=r.createImageData(a,s);for(let t=0;t<s*a;c+=4,h+=4,f+=4,m+=4,t++)i.data[c]=(e.data[g++]-u[0])*o[0],i.data[h]=(e.data[_++]-u[1])*o[1],i.data[f]=(e.data[y++]-u[2])*o[2],i.data[m]=-1===$?255:(e.data[$++]-u[3])*o[3]}else throw Error("Can not access image data");return i}}}),sE=s$({"common/dist/esm/tensor-factory-impl.js"(){"use strict";sO(),c=(e,t)=>{let i,r;if(void 0===e)throw Error("Image buffer must be defined");if(void 0===t.height||void 0===t.width)throw Error("Image height and width must be defined");if("NHWC"===t.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:a,width:s}=t,n=t.norm??{mean:255,bias:0};i="number"==typeof n.mean?[n.mean,n.mean,n.mean,n.mean]:[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],r="number"==typeof n.bias?[n.bias,n.bias,n.bias,n.bias]:[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let o=void 0!==t.format?t.format:"RGBA",u=void 0!==t.tensorFormat&&void 0!==t.tensorFormat?t.tensorFormat:"RGB",l=a*s,d=new Float32Array("RGBA"===u?4*l:3*l),p=4,c=0,h=1,f=2,m=3,g=0,_=l,y=2*l,$=-1;"RGB"===o&&(p=3,c=0,h=1,f=2,m=-1),"RGBA"===u?$=3*l:"RBG"===u?(g=0,y=l,_=2*l):"BGR"===u&&(y=0,_=l,g=2*l);for(let t=0;t<l;t++,c+=p,f+=p,h+=p,m+=p)d[g++]=(e[c]+r[0])/i[0],d[_++]=(e[h]+r[1])/i[1],d[y++]=(e[f]+r[2])/i[2],-1!==$&&-1!==m&&(d[$++]=(e[m]+r[3])/i[3]);return"RGBA"===u?new k("float32",d,[1,4,a,s]):new k("float32",d,[1,3,a,s])},h=async(e,t)=>{let i,r="u">typeof HTMLImageElement&&e instanceof HTMLImageElement,a="u">typeof ImageData&&e instanceof ImageData,s="u">typeof ImageBitmap&&e instanceof ImageBitmap,n="string"==typeof e,o=t??{},u=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},l=e=>"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext("2d"):null;if(r){let r=u();r.width=e.width,r.height=e.height;let a=l(r);if(null!=a){let r=e.height,s=e.width;if(void 0!==t&&void 0!==t.resizedHeight&&void 0!==t.resizedWidth&&(r=t.resizedHeight,s=t.resizedWidth),void 0!==t){if(o=t,void 0!==t.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=r,o.width=s}else o.tensorFormat="RGBA",o.height=r,o.width=s;a.drawImage(e,0,0),i=a.getImageData(0,0,s,r).data}else throw Error("Can not access image data")}else if(a){let r,a;if(void 0!==t&&void 0!==t.resizedWidth&&void 0!==t.resizedHeight?(r=t.resizedHeight,a=t.resizedWidth):(r=e.height,a=e.width),void 0!==t&&(o=t),o.format="RGBA",o.height=r,o.width=a,void 0!==t){let t=u();t.width=a,t.height=r;let s=l(t);if(null!=s)s.putImageData(e,0,0),i=s.getImageData(0,0,a,r).data;else throw Error("Can not access image data")}else i=e.data}else if(s){if(void 0===t)throw Error("Please provide image config with format for Imagebitmap");let r=u();r.width=e.width,r.height=e.height;let a=l(r);if(null!=a){let t=e.height,r=e.width;return a.drawImage(e,0,0,r,t),i=a.getImageData(0,0,r,t).data,o.height=t,o.width=r,c(i,o)}throw Error("Can not access image data")}else if(n)return new Promise((t,i)=>{let r=u(),a=l(r);if(!e||!a)return i();let s=new Image;s.crossOrigin="Anonymous",s.src=e,s.onload=()=>{r.width=s.width,r.height=s.height,a.drawImage(s,0,0,r.width,r.height);let e=a.getImageData(0,0,r.width,r.height);o.height=r.height,o.width=r.width,t(c(e.data,o))}});else throw Error("Input data provided is not supported - aborted tensor creation");if(void 0!==i)return c(i,o);throw Error("Input data provided is not supported - aborted tensor creation")},f=(e,t)=>{let{width:i,height:r,download:a,dispose:s}=t;return new k({location:"texture",type:"float32",texture:e,dims:[1,r,i,4],download:a,dispose:s})},m=(e,t)=>{let{dataType:i,dims:r,download:a,dispose:s}=t;return new k({location:"gpu-buffer",type:i??"float32",gpuBuffer:e,dims:r,download:a,dispose:s})},g=(e,t)=>{let{dataType:i,dims:r,download:a,dispose:s}=t;return new k({location:"ml-tensor",type:i??"float32",mlTensor:e,dims:r,download:a,dispose:s})},_=(e,t,i)=>new k({location:"cpu-pinned",type:e,data:t,dims:i??[t.length]})}}),sz=s$({"common/dist/esm/tensor-impl-type-mapping.js"(){"use strict";y=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),$=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),b=!1,w=()=>{if(!b){b=!0;let e="u">typeof BigInt64Array&&BigInt64Array.from,t="u">typeof BigUint64Array&&BigUint64Array.from,i=globalThis.Float16Array,r=void 0!==i&&i.from;e&&(y.set("int64",BigInt64Array),$.set(BigInt64Array,"int64")),t&&(y.set("uint64",BigUint64Array),$.set(BigUint64Array,"uint64")),r?(y.set("float16",i),$.set(i,"float16")):y.set("float16",Uint16Array)}}}}),sC=s$({"common/dist/esm/tensor-utils-impl.js"(){"use strict";sO(),v=e=>{let t=1;for(let i=0;i<e.length;i++){let r=e[i];if("number"!=typeof r||!Number.isSafeInteger(r))throw TypeError(`dims[${i}] must be an integer, got: ${r}`);if(r<0)throw RangeError(`dims[${i}] must be a non-negative integer, got: ${r}`);t*=r}return t},x=(e,t)=>{switch(e.location){case"cpu":return new k(e.type,e.data,t);case"cpu-pinned":return new k({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new k({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new k({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new k({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}}),sO=s$({"common/dist/esm/tensor-impl.js"(){"use strict";sT(),sE(),sz(),sC(),k=class{constructor(e,t,i){let r,a;if(w(),"object"==typeof e&&"location"in e)switch(this.dataLocation=e.location,r=e.type,a=e.dims,e.location){case"cpu-pinned":{let t=y.get(r);if(!t)throw TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof t))throw TypeError(`buffer should be of type ${t.name}`);this.cpuData=e.data;break}case"texture":if("float32"!==r)throw TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case"gpu-buffer":if("float32"!==r&&"float16"!==r&&"int32"!==r&&"int64"!==r&&"uint32"!==r&&"uint8"!==r&&"bool"!==r&&"uint4"!==r&&"int4"!==r)throw TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case"ml-tensor":if("float32"!==r&&"float16"!==r&&"int32"!==r&&"int64"!==r&&"uint32"!==r&&"uint64"!==r&&"int8"!==r&&"uint8"!==r&&"bool"!==r&&"uint4"!==r&&"int4"!==r)throw TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,n;if("string"==typeof e)if(r=e,n=i,"string"===e){if(!Array.isArray(t))throw TypeError("A string tensor's data must be a string array.");s=t}else{let i=y.get(e);if(void 0===i)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t))if("float16"===e&&i===Uint16Array||"uint4"===e||"int4"===e)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${i.name} as data.`);else s="uint64"===e||"int64"===e?i.from(t,BigInt):i.from(t);else if(t instanceof i)s=t;else if(t instanceof Uint8ClampedArray)if("uint8"===e)s=Uint8Array.from(t);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===e&&t instanceof Uint16Array&&i!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw TypeError(`A ${r} tensor's data must be type of ${i}`)}else if(n=t,Array.isArray(e)){if(0===e.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let t=typeof e[0];if("string"===t)r="string",s=e;else if("boolean"===t)r="bool",s=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${t}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",s=Uint8Array.from(e);else{let t=$.get(e.constructor);if(void 0===t)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=t,s=e}if(void 0===n)n=[s.length];else if(!Array.isArray(n))throw TypeError("A tensor's dims must be a number array");a=n,this.cpuData=s,this.dataLocation="cpu"}let s=v(a);if(this.cpuData&&s!==this.cpuData.length)if(("uint4"===r||"int4"===r)&&Math.ceil(s/2)===this.cpuData.length);else throw Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=a,this.size=s}static async fromImage(e,t){return h(e,t)}static fromTexture(e,t){return f(e,t)}static fromGpuBuffer(e,t){return m(e,t)}static fromMLTensor(e,t){return g(e,t)}static fromPinnedBuffer(e,t,i){return _(e,t,i)}toDataURL(e){return d(this,e)}toImageData(e){return p(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return x(this,e)}}}}),sB=s$({"common/dist/esm/tensor.js"(){"use strict";sO(),S=k}}),sA=s$({"common/dist/esm/trace.js"(){"use strict";sS(),I=(e,t)=>{(void 0===u.trace?u.wasm.trace:u.trace)&&console.timeStamp(`${e}::ORT::${t}`)},T=(e,t)=>{let i=Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let a=0;a<i.length;a++){if(r&&!i[a].includes("TRACE_FUNC")){let r=`FUNC_${e}::${i[a].trim().split(" ")[1]}`;t&&(r+=`::${t}`),I("CPU",r);return}i[a].includes("TRACE_FUNC")&&(r=!0)}},E=e=>{(void 0===u.trace?u.wasm.trace:u.trace)&&T("BEGIN",e)},z=e=>{(void 0===u.trace?u.wasm.trace:u.trace)&&T("END",e)},C=e=>{(void 0===u.trace?u.wasm.trace:u.trace)&&console.time(`ORT::${e}`)},O=e=>{(void 0===u.trace?u.wasm.trace:u.trace)&&console.timeEnd(`ORT::${e}`)}}}),sR=s$({"common/dist/esm/inference-session-impl.js"(){"use strict";sv(),sB(),sA(),B=class e{constructor(e){this.handler=e}async run(e,t,i){E(),C("InferenceSession.run");let r={},a={};if("object"!=typeof e||null===e||e instanceof S||Array.isArray(e))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if("object"==typeof t){if(null===t)throw TypeError("Unexpected argument[1]: cannot be null.");if(t instanceof S)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(t)){if(0===t.length)throw TypeError("'fetches' cannot be an empty array.");for(let e of(s=!1,t)){if("string"!=typeof e)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(e))throw RangeError(`'fetches' contains invalid output name: ${e}.`);r[e]=null}if("object"==typeof i&&null!==i)a=i;else if(void 0!==i)throw TypeError("'options' must be an object.")}else{let e=!1,n=Object.getOwnPropertyNames(t);for(let i of this.outputNames)if(-1!==n.indexOf(i)){let a=t[i];(null===a||a instanceof S)&&(e=!0,s=!1,r[i]=a)}if(e){if("object"==typeof i&&null!==i)a=i;else if(void 0!==i)throw TypeError("'options' must be an object.")}else a=t}}else if(void 0!==t)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let t of this.inputNames)if(void 0===e[t])throw Error(`input '${t}' is missing in 'feeds'.`);if(s)for(let e of this.outputNames)r[e]=null;let n=await this.handler.run(e,r,a),o={};for(let e in n)if(Object.hasOwnProperty.call(n,e)){let t=n[e];t instanceof S?o[e]=t:o[e]=new S(t.type,t.data,t.dims)}return O("InferenceSession.run"),z(),o}async release(){return this.handler.dispose()}static async create(t,i,r,a){let n;E(),C("InferenceSession.create");let o={};if("string"==typeof t){if(n=t,"object"==typeof i&&null!==i)o=i;else if(void 0!==i)throw TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,"object"==typeof i&&null!==i)o=i;else if(void 0!==i)throw TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&t instanceof SharedArrayBuffer){let e=0,s=t.byteLength;if("object"==typeof i&&null!==i)o=i;else if("number"==typeof i){if(!Number.isSafeInteger(e=i))throw RangeError("'byteOffset' must be an integer.");if(e<0||e>=t.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${t.byteLength}).`);if(s=t.byteLength-e,"number"==typeof r){if(!Number.isSafeInteger(s=r))throw RangeError("'byteLength' must be an integer.");if(s<=0||e+s>t.byteLength)throw RangeError(`'byteLength' is out of range (0, ${t.byteLength-e}].`);if("object"==typeof a&&null!==a)o=a;else if(void 0!==a)throw TypeError("'options' must be an object.")}else if(void 0!==r)throw TypeError("'byteLength' must be a number.")}else if(void 0!==i)throw TypeError("'options' must be an object.");n=new Uint8Array(t,e,s)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await s(o),d=await u.createInferenceSessionHandler(n,l);return O("InferenceSession.create"),z(),new e(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}}),sM=s$({"common/dist/esm/inference-session.js"(){"use strict";sR(),A=B}}),sD=s$({"common/dist/esm/tensor-conversion.js"(){}}),sP=s$({"common/dist/esm/tensor-factory.js"(){}}),sq=s$({"common/dist/esm/onnx-model.js"(){}}),sN=s$({"common/dist/esm/onnx-value.js"(){}}),sU={};sb(sU,{InferenceSession:()=>A,TRACE:()=>I,TRACE_EVENT_BEGIN:()=>C,TRACE_EVENT_END:()=>O,TRACE_FUNC_BEGIN:()=>E,TRACE_FUNC_END:()=>z,Tensor:()=>S,env:()=>l,registerBackend:()=>r});var sV=s$({"common/dist/esm/index.js"(){"use strict";sx(),sI(),sM(),sB(),sD(),sP(),sA(),sq(),sN()}}),sL=s$({"web/lib/wasm/wasm-utils-env.ts"(){"use strict";R=!1}}),sG={};sb(sG,{default:()=>D});var sW=s$({"web/lib/wasm/proxy-worker/main.ts"(){"use strict";n1(),sH(),sj(),(M=globalThis.self?.name==="ort-wasm-proxy-worker")&&(self.onmessage=e=>{let{type:t,in:i}=e.data;try{switch(t){case"init-wasm":Y(i.wasm).then(()=>{aG(i).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})})},e=>{postMessage({type:t,err:e})});break;case"init-ep":{let{epName:e,env:r}=i;aW(r,e).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})});break}case"copy-from":{let{buffer:e}=i,r=aF(e);postMessage({type:t,out:r});break}case"create":{let{model:e,options:r}=i;aK(e,r).then(e=>{postMessage({type:t,out:e})},e=>{postMessage({type:t,err:e})});break}case"release":aZ(i),postMessage({type:t});break;case"run":{let{sessionId:e,inputIndices:r,inputs:a,outputIndices:s,options:n}=i;aX(e,r,a,s,Array(s.length).fill(null),n).then(e=>{e.some(e=>"cpu"!==e[3])?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:e},aJ([...a,...e]))},e=>{postMessage({type:t,err:e})});break}case"end-profiling":aY(i),postMessage({type:t})}}catch(e){postMessage({type:t,err:e})}}),D=M?null:e=>new Worker(e??N,{type:"module",name:"ort-wasm-proxy-worker"})}}),sj=s$({"web/lib/wasm/wasm-utils-import.ts"(){"use strict";sL(),P=R||"u"<typeof location?void 0:location.origin,q=import.meta.url>"file:"&&import.meta.url<"file;",N=(()=>{if(!R){if(q){let e=URL;return new URL(new e("ort.mjs",import.meta.url).href,P).href}return import.meta.url}})(),U=()=>{if(N&&!N.startsWith("blob:"))return N.substring(0,N.lastIndexOf("/")+1)},V=(e,t)=>{try{let i=t??N;return(i?new URL(e,i):new URL(e)).origin===P}catch{return!1}},L=async e=>{let t=await fetch(e,{credentials:"same-origin"}),i=await t.blob();return URL.createObjectURL(i)},G=async e=>(await import(e)).default,W=(sW(),sw(sG)).default,j=async()=>{if(!N)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(V(N))return[void 0,W()];let e=await L(N);return[e,W(e)]},H=void 0,F=async(e,t,i,r)=>{let a=H&&!(e||t);if(a)if(N)a=V(N)||r&&!i;else if(r&&!i)a=!0;else throw Error("cannot determine the script source URL.");if(a)return[void 0,H];{let r="ort-wasm-simd-threaded.jsep.mjs",a=e??((e,t)=>{let i=t??N;try{return(i?new URL(e,i):new URL(e)).href}catch{return}})(r,t),s=!R&&i&&a&&!V(a,t),n=s?await L(a):a??`${t??"./"}${r}`;return[s?n:void 0,await G(n)]}}}}),sH=s$({"web/lib/wasm/wasm-factory.ts"(){"use strict";sj(),Z=!1,Q=!1,X=!1,Y=async e=>{if(Z)return Promise.resolve();if(Q)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(X)throw Error("previous call to 'initializeWebAssembly()' failed.");Q=!0;let t=e.initTimeout,i=e.numThreads;if(!1===e.simd);else if("relaxed"===e.simd){if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}})())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}})())throw Error("WebAssembly SIMD is not supported in the current environment.");let r=(()=>{if("u"<typeof SharedArrayBuffer)return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}})();i>1&&!r&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=i=1);let a=e.wasmPaths,s="string"==typeof a?a:void 0,n=a?.mjs,o=n?.href??n,u=a?.wasm,l=u?.href??u,d=e.wasmBinary,[p,c]=await F(o,s,i>1,!!d||!!l),h=!1,f=[];if(t>0&&f.push(new Promise(e=>{setTimeout(()=>{h=!0,e()},t)})),f.push(new Promise((e,t)=>{let r={numThreads:i};if(d)r.wasmBinary=d,r.locateFile=e=>e;else if(l||s)r.locateFile=e=>l??s+e;else if(o&&0!==o.indexOf("blob:"))r.locateFile=e=>new URL(e,o).href;else if(p){let e=U();e&&(r.locateFile=t=>e+t)}c(r).then(t=>{Q=!1,Z=!0,K=t,e(),p&&URL.revokeObjectURL(p)},e=>{Q=!1,X=!0,t(e)})})),await Promise.race(f),h)throw Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},J=()=>{if(Z&&K)return K;throw Error("WebAssembly is not initialized yet.")}}}),sF=s$({"web/lib/wasm/wasm-utils.ts"(){"use strict";sH(),ee=(e,t)=>{let i=J(),r=i.lengthBytesUTF8(e)+1,a=i._malloc(r);return i.stringToUTF8(e,a,r),t.push(a),a},et=(e,t,i,r)=>{if("object"==typeof e&&null!==e)if(i.has(e))throw Error("Circular reference in options");else i.add(e);Object.entries(e).forEach(([e,a])=>{let s=t?t+e:e;if("object"==typeof a)et(a,s+".",i,r);else if("string"==typeof a||"number"==typeof a)r(s,a.toString());else if("boolean"==typeof a)r(s,a?"1":"0");else throw Error(`Can't handle extra config type: ${typeof a}`)})},ei=e=>{let t=J(),i=t.stackSave();try{let i=t.PTR_SIZE,r=t.stackAlloc(2*i);t._OrtGetLastError(r,r+i);let a=Number(t.getValue(r,4===i?"i32":"i64")),s=t.getValue(r+i,"*"),n=s?t.UTF8ToString(s):"";throw Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${n}`)}finally{t.stackRestore(i)}}}}),sK=s$({"web/lib/wasm/run-options.ts"(){"use strict";sH(),sF(),er=e=>{let t=J(),i=0,r=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if("number"!=typeof e.logSeverityLevel||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if("number"!=typeof e.logVerbosityLevel||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let s=0;return e?.tag!==void 0&&(s=ee(e.tag,r)),i=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,s),0===i&&ei("Can't create run options."),e?.extra!==void 0&&et(e.extra,"",new WeakSet,(e,a)=>{let s=ee(e,r),n=ee(a,r);0!==t._OrtAddRunConfigEntry(i,s,n)&&ei(`Can't set a run config entry: ${e} - ${a}.`)}),[i,r]}catch(e){throw 0!==i&&t._OrtReleaseRunOptions(i),r.forEach(e=>t._free(e)),e}}}}),sZ=s$({"web/lib/wasm/session-options.ts"(){"use strict";sH(),sF(),ea=(e,t,i,r)=>{let a=ee(t,r),s=ee(i,r);0!==J()._OrtAddSessionConfigEntry(e,a,s)&&ei(`Can't set a session config entry: ${t} - ${i}.`)},es=async(e,t,i)=>{for(let r of t.executionProviders){let t="string"==typeof r?r:r.name,a=[];switch(t){case"webnn":if(t="WEBNN","string"!=typeof r){let t=r?.deviceType;t&&ea(e,"deviceType",t,i)}break;case"webgpu":if(t="JS","string"!=typeof r&&r?.preferredLayout){if("NCHW"!==r.preferredLayout&&"NHWC"!==r.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${r.preferredLayout}`);ea(e,"preferredLayout",r.preferredLayout,i)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${t}`)}let s=ee(t,i),n=a.length,o=0,u=0;if(n>0){o=J()._malloc(n*J().PTR_SIZE),i.push(o),u=J()._malloc(n*J().PTR_SIZE),i.push(u);for(let e=0;e<n;e++)J().setValue(o+e*J().PTR_SIZE,a[e][0],"*"),J().setValue(u+e*J().PTR_SIZE,a[e][1],"*")}await J()._OrtAppendExecutionProvider(e,s,o,u,n)!==0&&ei(`Can't append execution provider: ${t}.`)}},en=async e=>{let t,i=J(),r=0,a=[],s=e||{};s.extra||(s.extra={}),s.extra.session||(s.extra.session={}),(t=s.extra.session).use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),s.executionProviders&&s.executionProviders.some(e=>("string"==typeof e?e:e.name)==="webgpu")&&(s.enableMemPattern=!1);try{let e=(e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}})(s.graphOptimizationLevel??"all"),t=(e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${e}`)}})(s.executionMode??"sequential"),n="string"==typeof s.logId?ee(s.logId,a):0,o=s.logSeverityLevel??2;if(!Number.isInteger(o)||o<0||o>4)throw Error(`log severity level is not valid: ${o}`);let u=s.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log verbosity level is not valid: ${u}`);let l="string"==typeof s.optimizedModelFilePath?ee(s.optimizedModelFilePath,a):0;if(r=i._OrtCreateSessionOptions(e,!!s.enableCpuMemArena,!!s.enableMemPattern,t,!!s.enableProfiling,0,n,o,u,l),0===r&&ei("Can't create session options."),s.executionProviders&&await es(r,s,a),void 0!==s.enableGraphCapture){if("boolean"!=typeof s.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${s.enableGraphCapture}`);ea(r,"enableGraphCapture",s.enableGraphCapture.toString(),a)}if(s.freeDimensionOverrides)for(let[e,t]of Object.entries(s.freeDimensionOverrides)){if("string"!=typeof e)throw Error(`free dimension override name must be a string: ${e}`);if("number"!=typeof t||!Number.isInteger(t)||t<0)throw Error(`free dimension override value must be a non-negative integer: ${t}`);let s=ee(e,a);0!==i._OrtAddFreeDimensionOverride(r,s,t)&&ei(`Can't set a free dimension override: ${e} - ${t}.`)}return void 0!==s.extra&&et(s.extra,"",new WeakSet,(e,t)=>{ea(r,e,t,a)}),[r,a]}catch(e){throw 0!==r&&0!==i._OrtReleaseSessionOptions(r)&&ei("Can't release session options."),a.forEach(e=>i._free(e)),e}}}}),sQ=s$({"web/lib/wasm/wasm-common.ts"(){"use strict";eo=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${e}`)}},eu=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${e}`)}},el=(e,t)=>{let i=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r="number"==typeof t?t:t.reduce((e,t)=>e*t,1);return i>0?Math.ceil(r*i):void 0},ed=e=>{switch(e){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},ep=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${e}`)}},ec=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,eh=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint64"===e||"int8"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,ef=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${e}`)}}}}),sX=s$({"web/lib/wasm/wasm-utils-load-file.ts"(){"use strict";sL(),em=async e=>{if("string"==typeof e)if(R)try{let{readFile:t}=sy("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if("ERR_FS_FILE_TOO_LARGE"===t.code){let{createReadStream:t}=sy("node:fs"),i=t(e),r=[];for await(let e of i)r.push(e);return new Uint8Array(Buffer.concat(r))}throw t}else{let t=await fetch(e);if(!t.ok)throw Error(`failed to load external data file: ${e}`);let i=t.headers.get("Content-Length"),r=i?parseInt(i,10):0;if(r<0x40000000)return new Uint8Array(await t.arrayBuffer());{let i;if(!t.body)throw Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader();try{i=new ArrayBuffer(r)}catch(e){if(e instanceof RangeError){let e=Math.ceil(r/65536);i=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let s=0;for(;;){let{done:e,value:t}=await a.read();if(e)break;let r=t.byteLength;new Uint8Array(i,s,r).set(t),s+=r}return new Uint8Array(i,0,r)}}return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}}),sY=s$({"web/lib/wasm/jsep/log.ts"(){"use strict";sQ(),eg=["V","I","W","E","F"],e$=(e,t)=>{e_=e,ey=t},eb=(...e)=>{ey&&((e,t)=>{var i;let r=ep(e);r>=ep(e_)&&(i="function"==typeof t?t():t,console.log(`[${eg[r]},${new Date().toISOString()}]${i}`))})(...e)}}}),sJ=s$({"web/lib/wasm/jsep/util.ts"(){"use strict";ew=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},ev=class{static calcShape(e,t,i=!1){let r=e.length,a=t.length;if(0===r)return t;if(0===a)return e;let s=Math.max(e.length,t.length),n=Array(s);if(i){if(r<2||a<2)return;let i=ew.calcMatMulShape([e[r-2],e[r-1]],[t[a-2],t[a-1]]);if(void 0===i)return;[n[s-2],n[s-1]]=i}for(let o=i?3:1;o<=s;o++){let i=r-o<0?1:e[r-o],u=a-o<0?1:t[a-o];if(i!==u&&i>1&&u>1)return;let l=Math.max(i,u);if(i&&u)n[s-o]=Math.max(i,u);else{if(l>1)return;n[s-o]=0}}return n}static isValidBroadcast(e,t){let i=e.length,r=t.length;if(i>r)return!1;for(let a=1;a<=i;a++)if(1!==e[i-a]&&e[i-a]!==t[r-a])return!1;return!0}},ex=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(e,t=4){let i=e.length;if(0===i)return[];let r=Array(i),a=i-1;for(;a>=0;){if(e[a]%t==0){r[a]=e[a]/t;break}if(t%e[a]!=0)throw Error("cannot convert shape");r[a]=1,t/=e[a],a--}for(a--;a>=0;a--)r[a]=e[a];return r}static sizeFromDimension(t,i){if(i<0||i>t.length)throw Error(`invalid dimension of ${i} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,i,t.length)}static sizeToDimension(t,i){if(i<0||i>t.length)throw Error(`invalid dimension of ${i} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,i)}static getSizeFromDimensionRange(e,t,i){let r=1;for(let a=t;a<i;a++){if(e[a]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");r*=Number(e[a])}return r}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let i=Array(t);i[t-1]=1,i[t-2]=e[t-1];for(let r=t-3;r>=0;--r)i[r]=i[r+1]*e[r+1];return i}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(i=>this.normalizeAxis(i,t??e.length))}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let i=e.length;return e.map((e,r)=>e+t[r]+t[r+i])}static areEqual(e,t){return e.length===t.length&&e.every((e,i)=>e===t[i])}},ek=class e{static adjustPoolAttributes(e,t,i,r,a,s){if(!e&&i.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=i.length?i.push(t[e+2]):i[e]=t[e+2];for(let e=0;e<i.length;e++)if(e<r.length){if(r[e]<0)throw Error("strides should be greater than or equal to 1")}else r.push(1);for(let e=0;e<i.length;e++)if(e<a.length){if(a[e]<0)throw Error("dilations should be greater than or equal to 1")}else a.push(1);for(let e=0;e<2*i.length;e++)if(e<s.length){if(s[e]<0)throw Error("pad should be greater than or equal to 1")}else s.push(0);for(let e=0;e<i.length;e++){if(i[e]<=0)throw Error("kernel shapes need to be greater than 0");if(s[e]>=i[e]||s[e+i.length]>=i[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,i,r,a,s,n,o){if(o){if(s.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(i.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+(n?1:2)],i[u],r[u],a[u],s,u,u+t.length-2,o)}}static computePoolOutputShape(t,i,r,a,s,n,o){if(i.length<=0)throw Error("input shape must be of size greater than 0");let u=[i[0],i[1]];return e.computeShapeHelper(t,i,u,r,a,s,n,o),u}static computeConvOutputShape(t,i,r,a,s,n,o){if(t.length<=0||i.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],i[0]];return e.computeShapeHelper(!1,t,u,r,a,s,n,o),u}static computeShapeHelper(t,i,r,a,s,n,o,u){if(t)for(let e=0;e<i.length-2;e++)r.push(1);else for(let t=0;t<i.length-2;t++)r.push(e.adjustPadAndReturnShape(i[t+2],a[t],s[t],n[t],o,t,t+i.length-2,u))}static adjustPadAndReturnShape(e,t,i,r,a,s,n,o){let u=i*(r-1)+1;if(!o||"NOTSET"===o)return Math.floor((e+a[s]+a[n]-u)/t+1);switch(o){case"VALID":return a[s]=0,a[n]=0,Math.floor((e-u)/t+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==i)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let i=((e+t-1)/t-1)*t+r-e;return a[s]="SAME_LOWER"===o?Math.floor((i+1)/2):Math.floor(i/2),a[n]=i-a[s],Math.floor((e+i-r)/t+1)}default:throw Error("Unsupported AutoPad type")}}},eS=class{static getShapeOfGemmResult(e,t,i,r,a){let s,n,o;if(2!==e.length||2!==i.length)throw Error("shape need to be of size 2");t?(s=e[1],n=e[0]):(s=e[0],n=e[1]);let u=-1;if(r?(o=i[0],u=1):(o=i[1],u=0),i[u]!==n)throw Error("dimension mismatch");if(s<=0||o<=0||n<=0)throw Error("invalid shape specified");if(a&&!ev.isValidBroadcast(a,[s,o]))throw Error("gemm: invalid bias shape for broadcast");return[s,o,n]}},eI=-34028234663852886e22,eT=34028234663852886e22}}),s0=s$({"web/lib/wasm/jsep/tensor-view.ts"(){"use strict";sQ(),eE=(e,t)=>new(ed(t))(e)}}),s1=s$({"web/lib/wasm/jsep/webnn/tensor-manager.ts"(){"use strict";sQ(),sY(),ez=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),eC=(e,t)=>{if("int32"===t)return e;let i=ez.get(t);if(!i)throw Error(`WebNN backend does not support data type: ${t}`);let r=i/8;if(e.byteLength%r!=0)throw Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let a=e.byteLength/r,s=new(ed(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let e=new Int32Array(a);for(let t=0;t<a;t++){let i=s[t];if(i>2147483647n||i<-2147483648n)throw Error("Can not convert int64 data to int32 - value out of range.");e[t]=Number(i)}return new Uint8Array(e.buffer)}case"int8":case"uint8":case"uint32":if("uint32"===t&&s.some(e=>e>0x7fffffff))throw Error("Can not convert uint32 data to int32 - value out of range.");return new Uint8Array(Int32Array.from(s,Number).buffer);default:throw Error(`Unsupported data conversion from ${t} to 'int32'`)}},eO=(e,t)=>{if("int32"===t)return e;if(e.byteLength%4!=0)throw Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let i=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,i);switch(t){case"int64":return new Uint8Array(BigInt64Array.from(r,BigInt).buffer);case"uint64":if(r.some(e=>e<0))throw Error("Can not convert int32 data to uin64 - negative value found.");return new Uint8Array(BigUint64Array.from(r,BigInt).buffer);case"int8":if(r.some(e=>e<-128||e>127))throw Error("Can not convert int32 data to int8 - value out of range.");return new Uint8Array(Int8Array.from(r,Number).buffer);case"uint8":if(r.some(e=>e<0||e>255))throw Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number);case"uint32":if(r.some(e=>e<0))throw Error("Can not convert int32 data to uint32 - negative value found.");return new Uint8Array(Uint32Array.from(r,Number).buffer);default:throw Error(`Unsupported data conversion from 'int32' to ${t}`)}},eB=1,eA=()=>eB++,eR=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),eM=(e,t)=>{let i=ez.get(e);if(!i)throw Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((e,t)=>e*t)*i/8):0},eD=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:i,tensor:r,dataType:a,shape:s,fallbackDataType:n}=e;this.sessionId=t,this.mlContext=i,this.mlTensor=r,this.dataType=a,this.tensorShape=s,this.fallbackDataType=n}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return eM(this.dataType,this.tensorShape)}destroy(){eb("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(!this.fallbackDataType)return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor);{let t=eO(new Uint8Array(await this.mlContext.readTensor(this.mlTensor)),this.dataType);return e?void(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(t):t.buffer}}canReuseTensor(e,t,i){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===i.length&&this.tensorShape.every((e,t)=>e===i[t])}setIsDataConverted(e){this.isDataConverted=e}},eP=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,i,r){let a,s=this.tensorManager.getMLContext(e),n=this.tensorManager.getMLOpSupportLimits(e);if(!n?.input.dataTypes.includes(t)){if(!(a=eR.get(t))||n?.input.dataTypes.includes(a))throw Error(`WebNN backend does not support data type: ${t}`);eb("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${a}`)}if(this.wrapper)if(this.wrapper.canReuseTensor(s,t,i))return this.wrapper.tensor;else{if(r){if(this.wrapper.byteLength!==eM(t,i))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o="u"<typeof MLTensorUsage?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,i,o,!0,!0,a),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if("int32"===this.wrapper.fallbackType)t=eC(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength)return void this.wrapper.write(t);eb("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?eO(this.activeUpload,this.wrapper?.type):this.activeUpload;return e?void(e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t)):t.buffer}if(!this.wrapper)throw Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},eq=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=eA();return this.tensorTrackersById.set(e,new eP(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,i,r,a){eb("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${i}, shape: ${r}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(t);if(!s)throw Error("Tensor not found.");return s.ensureTensor(e,i,r,a)}upload(e,t){let i=this.tensorTrackersById.get(e);if(!i)throw Error("Tensor not found.");i.upload(t)}async download(e,t){eb("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let i=this.tensorTrackersById.get(e);if(!i)throw Error("Tensor not found.");return i.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,i,r){let a=this.getMLContext(e),s=eA(),n=new eD({sessionId:e,context:a,tensor:t,dataType:i,shape:r});return this.tensorTrackersById.set(s,new eP(this,n)),this.externalTensors.add(n),s}async getCachedTensor(e,t,i,r,a,s,n){let o=this.getMLContext(e);for(let[r,a]of this.freeTensors.entries())if(a.canReuseTensor(o,t,i)){eb("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${n?`fallbackDataType: ${n},`:""} shape: ${i}`);let a=this.freeTensors.splice(r,1)[0];return a.sessionId=e,a}eb("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${n?`fallbackDataType: ${n},`:""} shape: ${i}}`);let u=await o.createTensor({dataType:n??t,shape:i,dimensions:i,usage:r,writable:a,readable:s});return new eD({sessionId:e,context:o,tensor:u,dataType:t,shape:i,fallbackDataType:n})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},eN=(...e)=>new eq(...e)}}),s2=s$({"web/lib/wasm/jsep/backend-webnn.ts"(){"use strict";sQ(),sH(),s0(),s1(),sY(),eU=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),eV=class{constructor(e){this.tensorManager=eN(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,e$(e.logLevel,!!e.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(e){eb("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){eb("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let e of t)eb("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(t=>t.gpuDevice===e);if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:t}),t}}if(void 0===e){let e=this.mlContextCache.findIndex(e=>void 0===e.options&&void 0===e.gpuDevice);if(-1!==e)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let t=this.mlContextCache.findIndex(t=>((e,t)=>{if(e===t)return!0;if(void 0===e||void 0===t)return!1;let i=Object.keys(e).sort(),r=Object.keys(t).sort();return i.length===r.length&&i.every((i,a)=>i===r[a]&&e[i]===t[i])})(t.options,e));if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let i=this.sessionIdsByMLContext.get(t);i||(i=new Set,this.sessionIdsByMLContext.set(t,i)),i.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let i=this.sessionIdsByMLContext.get(t);if(i.delete(e),0===i.size){this.sessionIdsByMLContext.delete(t);let e=this.mlContextCache.findIndex(e=>e.mlContext===t);-1!==e&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){eb("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,i,r,a){let s=eU.get(i);if(!s)throw Error(`Unsupported ONNX data type: ${i}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,r,a)}async createTemporaryTensor(e,t,i){eb("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${i}}`);let r=eU.get(t);if(!r)throw Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,r,i,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!J().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");eb("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let i=await this.tensorManager.download(e);return eE(i,t)}}registerMLTensor(e,t,i,r){let a=eU.get(i);if(!a)throw Error(`Unsupported ONNX data type: ${i}`);let s=this.tensorManager.registerTensor(e,t,a,r);return eb("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${r}} -> {tensorId: ${s}}`),s}registerMLConstant(e,t,i,r,a,s,n=!1){let o;if(!s)throw Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=s.get(u);if(!l)throw Error(`File with name ${u} not found in preloaded files.`);if(t+i>l.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(t,t+i).buffer;switch(a.dataType){case"float32":o=new Float32Array(d);break;case"float16":o="u">typeof Float16Array&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":o=new Int32Array(d);break;case"uint32":o=new Uint32Array(d);break;case"int64":n?(o=new Int32Array(eC(new Uint8Array(d),"int64").buffer),a.dataType="int32"):o=new BigInt64Array(d);break;case"uint64":o=new BigUint64Array(d);break;case"int8":o=new Int8Array(d);break;case"int4":case"uint4":case"uint8":o=new Uint8Array(d);break;default:throw Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return eb("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${n?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),r.constant(a,o)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let i=this.sessionGraphInputs.get(e);return!!i&&i.includes(t)}isGraphOutput(e,t){let i=this.sessionGraphOutputs.get(e);return!!i&&i.includes(t)}isGraphInputOutputTypeSupported(e,t,i=!0){let r=eU.get(eo(t)),a=this.mlOpSupportLimitsBySessionId.get(e);return void 0!==r&&(i?!!a?.input.dataTypes.includes(r):!!a?.output.dataTypes.includes(r))}flush(){}}}}),s3=s$({"web/lib/wasm/jsep/webgpu/types.ts"(){}}),s4=s$({"web/lib/wasm/jsep/webgpu/gpu-data-manager.ts"(){"use strict";sY(),s3(),eL=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),eG=[],eW=e=>16*Math.ceil(Number(e)/16),ej=1,eH=()=>ej++,eF=async(e,t,i,r)=>{let a=eW(i),s=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let n=e.getCommandEncoder();e.endComputePass(),n.copyBufferToBuffer(t,0,s,0,a),e.flush(),await s.mapAsync(GPUMapMode.READ);let o=s.getMappedRange();if(!r)return new Uint8Array(o.slice(0,i));{let e=r();return e.set(new Uint8Array(o,0,i)),e}}finally{s.destroy()}},eK=class{constructor(e){for(let[t]of(this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,eL))eG.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let i=t.buffer,r=t.byteOffset,a=t.byteLength,s=eW(a),n=this.storageCache.get(e);if(!n)throw Error("gpu data for uploading does not exist");if(Number(n.originalSize)!==a)throw Error(`inconsistent data size. gpu data size=${n.originalSize}, data size=${a}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(o.getMappedRange()).set(new Uint8Array(i,r,a)),o.unmap();let u=this.backend.device.createCommandEncoder();u.copyBufferToBuffer(o,0,n.gpuData.buffer,0,s),this.backend.device.queue.submit([u.finish()]),o.destroy(),eb("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let i=this.storageCache.get(e);if(!i)throw Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw Error("destination gpu data for memcpy does not exist");if(i.originalSize!==r.originalSize)throw Error("inconsistent source and destination gpu data size");let a=eW(i.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(i.gpuData.buffer,0,r.gpuData.buffer,0,a)}registerExternalBuffer(e,t,i){let r;if(i){if(r=i[0],e===i[1])return eb("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=eH();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),eb("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){void 0!==e&&(this.storageCache.delete(e),eb("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let i,r=(e=>{for(let t=0;t<eG.length;t++){let i=eG[t];if(e<=i)return i}return 16*Math.ceil(e/16)})(e),a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let e=(a?this.freeBuffers:this.freeUniformBuffers).get(r);i=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let n={id:eH(),type:0,buffer:i};return this.storageCache.set(n.id,{gpuData:n,originalSize:Number(e)}),eb("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${n.id}`),n}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t="bigint"==typeof e?Number(e):e,i=this.storageCache.get(t);if(!i)if(0===this.storageCache.size)return 0;else throw Error("releasing data does not exist");return eb("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${i.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(i.gpuData.buffer),i.originalSize}async download(e,t){let i=this.storageCache.get(Number(e));if(!i)throw Error("data does not exist");await eF(this.backend,i.gpuData.buffer,i.originalSize,t)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let e of this.buffersPending){let t=eL.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let i=this.freeBuffers.get(e.size)||[];void 0===t||i.length>=t?e.destroy():i.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let i=this.freeUniformBuffers.get(e.size)||[];void 0===t||i.length>=t?e.destroy():i.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let t of(e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e)),this.buffersPending))e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,0===this.sessionCount&&(eb("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},eZ=(...e)=>new eK(...e)}}),s6=s$({"web/lib/wasm/jsep/webgpu/attribute-with-cache-key.ts"(){"use strict";eQ=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},eX=e=>new eQ(e)}}),s8=s$({"web/lib/wasm/jsep/webgpu/ops/common.ts"(){"use strict";sQ(),sJ(),eY=64,eJ=(e,t)=>{if(3===t)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==t)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${e}`)}},e0=(e,t=1)=>{let i=eJ(e,t);return"string"==typeof i?i:i[0]},e1=(e,t=1)=>{let i=eJ(e,t);return"string"==typeof i?i:i[1]},e2=(...e)=>{let t=[];return e.forEach(e=>{0!==e.length&&t.push({type:12,data:e},{type:12,data:ex.computeStrides(e)})}),t},e3=e=>e%4==0?4:e%2==0?2:1,e4=(e="f32",t,i="0")=>t&&1!==t?`vec${t}<${e}>(${i})`:`${e}(${i})`,e6=(e,t,i)=>"f32"===e?i:1===t?`f32(${i})`:`vec${t}<f32>(${i})`,e8=(e,t)=>4===t?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:2===t?`(${e}.x + ${e}.y)`:3===t?`(${e}.x + ${e}.y + ${e}.z)`:e,e5=(e,t,i,r)=>{if(!e.startsWith("uniforms.")||!(i>4))return i>1?`${e}[${t}]`:e;if("string"==typeof t)if("f16"===r)return`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`;else return`${e}[(${t}) / 4][(${t}) % 4]`;return"f16"===r?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`},e7=(e,t,i,r,a)=>{let s,n,o,u,l="number"==typeof i,d=l?i:i.length,p=[...Array(d).keys()],c=d<2?"u32":d<=4?`vec${d}<u32>`:`array<u32, ${d}>`,h=eJ(t,a),f="string"==typeof h?h:h[1],m={indices:c,value:f,storage:"string"==typeof h?h:h[0],tensor:t},g=e=>"string"==typeof e?e:`${e}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},y=l?"uniforms.":"",$=`${y}${e}_shape`,b=`${y}${e}_strides`,w="";for(let e=0;e<d-1;e++)w+=`
    let dim${e} = current / ${e5(b,e,d)};
    let rest${e} = current % ${e5(b,e,d)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;w+=`indices[${d-1}] = current;`;let v=d<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${w}
    return indices;
  }`,x=[];if(d>=2)for(let e=d-1;e>=0;e--)x.push(`${e5(b,e,d)} * (indices[${e}])`);let k=d<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${x.join("+")};
  }`,S=(...e)=>0===d?"0u":`${m.indices}(${e.map(g).join(",")})`,I=(e,t)=>d<2?`${e}`:`${e5(e,t,d)}`,T={},E=(t,i)=>(()=>{if(m.storage===m.value)return`${e}[${t}]=${i};`;if("vec2<u32>"===m.storage&&"i32"===m.value)return`${e}[${t}]=vec2<u32>(u32(${i}), select(0u, 0xFFFFFFFFu, ${i} < 0));`;if("vec2<u32>"===m.storage&&"u32"===m.value)return`${e}[${t}]=vec2<u32>(u32(${i}), 0u);`;if("u32"===m.storage&&"vec4<bool>"===m.value)return`${e}[${t}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${i}));`;throw Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),z=t=>(()=>{if(m.storage===m.value)return`${e}[${t}]`;if("vec2<u32>"===m.storage&&"i32"===m.value)return`i32(${e}[${t}].x)`;if("vec2<u32>"===m.storage&&"u32"===m.value)return`u32(${e}[${t}].x)`;if("u32"===m.storage&&"vec4<bool>"===m.value)return`vec4<bool>(bool(${e}[${t}] & 0xFFu), bool(${e}[${t}] & 0xFF00u), bool(${e}[${t}] & 0xFF0000u), bool(${e}[${t}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),C=d<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${f} {
    return ${z(`i2o_${e}(indices)`)};
  }`,O=d<2?"":(s=p.map(e=>`d${e}: u32`).join(", "),n=p.map(e=>`d${e}`).join(", "),`
  fn get_${e}(${s}) -> ${f} {
    return get_${e}ByIndices(${S(n)});
  }`),B=d<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${f}) {
    ${E(`i2o_${e}(indices)`,"value")}
  }`,A=d<2?"":(o=p.map(e=>`d${e}: u32`).join(", "),u=p.map(e=>`d${e}`).join(", "),`
  fn set_${e}(${o}, value: ${f}) {
    set_${e}ByIndices(${S(u)}, value);
  }`);return{impl:()=>{let e=[],t=!1;return _.offsetToIndices&&(e.push(v),t=!0),_.indicesToOffset&&(e.push(k),t=!0),_.broadcastedIndicesToOffset&&(Object.values(T).forEach(t=>e.push(t)),t=!0),_.set&&(e.push(A),t=!0),_.setByIndices&&(e.push(B),t=!0),_.get&&(e.push(O),t=!0),_.getByIndices&&(e.push(C),t=!0),!l&&t&&e.unshift(`const ${$} = ${m.indices}(${i.join(",")});`,`const ${b} = ${m.indices}(${ex.computeStrides(i).join(",")});`),e.join("\n")},type:m,offsetToIndices:t=>(_.offsetToIndices=!0,d<2?t:`o2i_${e}(${t})`),indicesToOffset:t=>(_.indicesToOffset=!0,d<2?t:`i2o_${e}(${t})`),broadcastedIndicesToOffset:(t,i)=>{_.broadcastedIndicesToOffset=!0;let r=`${i.name}broadcastedIndicesTo${e}Offset`;if(r in T)return`${r}(${t})`;let a=[];for(let e=d-1;e>=0;e--){let t=i.indicesGet("outputIndices",e+i.rank-d);a.push(`${I(b,e)} * (${t} % ${I($,e)})`)}return T[r]=`fn ${r}(outputIndices: ${i.type.indices}) -> u32 {
             return ${a.length>0?a.join("+"):"0u"};
           }`,`${r}(${t})`},indices:S,indicesGet:I,indicesSet:(e,t,i)=>d<2?`${e}=${i};`:`${e5(e,t,d)}=${i};`,set:(...t)=>{if(t.length!==d+1)throw Error(`indices length must be ${d}`);let i=t[d];if("string"!=typeof i)throw Error("value must be string");let r=t.slice(0,d).map(g).join(",");return 0===d?E("0u",i):1===d?E(r[0],i):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${r}, ${i})`)},setByOffset:E,setByIndices:(t,i)=>d<2?E(t,i):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${t}, ${i});`),get:(...t)=>{if(t.length!==d)throw Error(`indices length must be ${d}`);let i=t.map(g).join(",");return 0===d?z("0u"):1===d?z(i[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${i})`)},getByOffset:z,getByIndices:t=>d<2?z(t):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${t})`),usage:r,name:e,strides:b,shape:$,rank:d}},e9=(e,t,i,r=1)=>e7(e,t,i,"input",r),te=(e,t,i,r=1)=>e7(e,t,i,"output",r),tt=(e,t,i)=>e7(e,t,i,"atomicOutput",1),ti=(e,t,i,r=1)=>e7(e,t,i,"internal",r),tr=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){let t="number"==typeof e?`${e}u`:e;return`if (global_idx >= ${t}) { return; }`}mainStart(e=eY){let t="number"==typeof e?e:e[0],i="number"==typeof e?1:e[1],r="number"==typeof e?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||i>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${t}, ${i}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*i*r>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${t}, ${i}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,n=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*i*r}u + local_idx;`;return`@compute @workgroup_size(${t}, ${i}, ${r})
  fn main(${s}) {
    ${n}
  `}appendVariableUniforms(e){0!==e.rank&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if("internal"===e.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let i="input"===e.usage?"read":"read_write",r="atomicOutput"===e.usage?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${i}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(e=>this.declareVariable(e,this.variableIndex++)).join("\n")}registerInternalVariable(e){if("internal"!==e.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(e,t,i=1){return this.uniforms.push({name:e,type:t,length:i}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let e=[];for(let{name:t,type:i,length:r}of this.uniforms)if(r&&r>4)"f16"===i?e.push(`@align(16) ${t}:array<mat2x4<${i}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${i}>, ${Math.ceil(r/4)}>`);else{let a=null==r||1===r?i:`vec${r}<${i}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join("\n")+this.internalVariables.map(e=>e.impl()).join("\n")}get variablesInfo(){if(0!==this.uniforms.length)return this.uniforms.map(e=>[[12,10,1,6][["u32","f16","f32","i32"].indexOf(e.type)],e.length??1])}},ta=(e,t)=>new tr(e,t)}}),s5=s$({"web/lib/wasm/jsep/webgpu/ops/transpose.ts"(){"use strict";sQ(),sJ(),s6(),s8(),ts=(e,t)=>0!==t.length?t:[...Array(e).keys()].reverse(),tn=(e,t)=>{let i,r=e.dataType,a=e.dims.length,s=ts(a,t),n=(i=e.dims,ex.sortBasedOnPerm(i,ts(i.length,s))),o=e.dims,u=n;if(a<2||((e,t)=>{let i=0;for(let r=0;r<e.length;++r)if(1!==t[e[r]]){if(e[r]<i)return!1;i=e[r]}return!0})(s,e.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=ex.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64/4)},programUniforms:[{type:12,data:Math.ceil(t/4)}]}},getShaderSource:e=>{let t=e9("input",r,o,4),i=te("output",r,u,4);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,i)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:l,newPerm:d}=((e,t)=>{let i=[],r=[];for(let a=0;a<e.length;++a)1!==e[a]&&i.push(e[a]),1!==e[t[a]]&&r.push(t[a]);return{newShape:i,newPerm:r}})(e.dims,s),p=ex.areEqual(d,[2,3,1]),c=ex.areEqual(d,[3,1,2]);return 2===l.length||p||c?(u=[(o=p?[l[0],l[1]*l[2]]:c?[l[0]*l[1],l[2]]:l)[1],o[0]],{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=ex.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/16),y:Math.ceil(u[0]/16)},programUniforms:[{type:12,data:t},...e2(o,u)]}},getShaderSource:e=>{let t=e9("a",r,o.length),i=te("output",r,u.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,i)}
  var<workgroup> tile : array<array<${i.type.value}, 17>, 16>;
  ${e.mainStart([16,16,1])}
    let stride = (uniforms.output_shape[1] - 1) / 16 + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * 16u + local_id.x;
    let input_row = workgroup_id_x * 16u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${t.getByIndices(`${t.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * 16u + local_id.x;
    let output_row = workgroup_id_y * 16u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${i.setByIndices(`${i.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`}}):{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let t=ex.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:[{type:12,data:t},...e2(o,u)]}},getShaderSource:e=>{let t=e9("a",r,o.length),i=te("output",r,u.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,i)}

  ${((e,t,i,r)=>{let a=`fn perm(i: ${r.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`;for(let i=0;i<t;++i)a+=`a[${e[i]}]=i[${i}];`;return a+"return a;}"})(s,a,t,i)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${i.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${i.setByOffset("global_idx",t.getByIndices("aIndices"))}
  }`}}},to=(e,t)=>{var i=e.inputs,r=t.perm;if(!i||1!==i.length)throw Error("Transpose requires 1 input.");if(0!==r.length&&r.length!==i[0].dims.length)throw Error(`perm size ${r.length} does not match input rank ${i[0].dims.length}`);e.compute(tn(e.inputs[0],t.perm))},tu=e=>eX({perm:e.perm})}}),s7=s$({"web/lib/wasm/jsep/webgpu/ops/reduce-shared.ts"(){"use strict";sQ(),sJ(),s8(),s9(),s5(),tl={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},td={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},tp={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},tc={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},th=(e,t,i,r)=>{var a,s,n,o;let u,l,d,p,c,h,f,m=1===e.inputs.length?i:tT(e.inputs,i),g=m.axes;0!==g.length||m.noopWithEmptyAxes||(g=e.inputs[0].dims.map((e,t)=>t));let _=ex.normalizeAxes(g,e.inputs[0].dims.length),y=_,$=e.inputs[0],b=((e,t)=>{let i=[];if(!((e,t)=>{for(let i=0;i<e.length;++i)if(e[e.length-i-1]!==t-1-i)return!1;return!0})(e,t)){for(let r=0;r<t;++r)-1===e.indexOf(r)&&i.push(r);e.forEach(e=>i.push(e))}return i})(y,e.inputs[0].dims.length);b.length>0&&($=e.compute(tn(e.inputs[0],b),{inputs:[0],outputs:[-1]})[0],y=((e,t)=>{let i=[];for(let r=t-e;r<t;++r)i.push(r);return i})(y.length,$.dims.length));let[w,v]=((e,t)=>{let i=[],r=e.length;for(let a=0;a<r;a++)-1===t.indexOf(a)&&i.push(e[a]);return[i,t.map(t=>e[t])]})($.dims,y),x=w;m.keepDims&&(x=((e,t)=>{let i=e.length+t.length,r=[],a=0;for(let s=0;s<i;s++)-1===t.indexOf(s)?r.push(e[a++]):r.push(1);return r})(w,_)),e.compute((a=m.cacheKey,s=[$],n=e.inputs[0].dataType,o=x,u=s[0].dims,l=ex.size(o),d=ex.size(v),p=e9("_A",s[0].dataType,u),c=te("output",n,o),h=64,1===l&&(h=256),f=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,{name:t,shaderCache:{hint:`${a};${h}`,inputDependencies:["type"]},getShaderSource:e=>`
        ${e.registerUniform("reduceSize","u32").declareVariables(p,c)}
        ${f}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${e.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${tp[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${p.getByOffset("offset + k")});
           bestValue = ${tl[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${td[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${"mean"===r?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${tc[r]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}),{inputs:[$]})},tf=(e,t)=>{th(e,"ReduceMeanShared",t,"mean")},tm=(e,t)=>{th(e,"ReduceL1Shared",t,"l1")},tg=(e,t)=>{th(e,"ReduceL2Shared",t,"l2")},t_=(e,t)=>{th(e,"ReduceLogSumExpShared",t,"logSumExp")},ty=(e,t)=>{th(e,"ReduceMaxShared",t,"max")},t$=(e,t)=>{th(e,"ReduceMinShared",t,"min")},tb=(e,t)=>{th(e,"ReduceProdShared",t,"prod")},tw=(e,t)=>{th(e,"ReduceSumShared",t,"sum")},tv=(e,t)=>{th(e,"ReduceSumSquareShared",t,"sumSquare")},tx=(e,t)=>{th(e,"ReduceLogSumShared",t,"logSum")}}}),s9=s$({"web/lib/wasm/jsep/webgpu/ops/reduce.ts"(){"use strict";sQ(),sJ(),s6(),s8(),s7(),tk=e=>{if(!e||0===e.length||e.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===e.length&&1!==e[1].dims.length)throw Error("Invalid axes input dims.")},tS=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],tI=(e,t,i,r,a,s,n=!1,o=!1)=>{let u=[],l=i[0].dims,d=l.length,p=ex.normalizeAxes(a,d),c=!o&&0===p.length;l.forEach((e,t)=>{c||p.indexOf(t)>=0?n&&u.push(1):u.push(e)});let h=u.length,f=ex.size(u);return{name:e,shaderCache:t,getShaderSource:e=>{let t=[],a=e9("_A",i[0].dataType,d),o=te("output",s,h),u=r(a,o,p),f=u[2];for(let e=0,i=0;e<d;e++)c||p.indexOf(e)>=0?(n&&i++,f=`for(var j${e}: u32 = 0; j${e} < ${l[e]}; j${e}++) {
                  ${u[2].includes("last_index")?`let last_index = j${e};`:""}
                  ${a.indicesSet("input_indices",e,`j${e}`)}
                  ${f}
                }`):(t.push(`${a.indicesSet("input_indices",e,o.indicesGet("output_indices",i))};`),i++);return`

        ${e.registerUniform("output_size","u32").declareVariables(a,o)}

        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${a.type.indices};
          let output_indices = ${o.offsetToIndices("global_idx")};

          ${t.join("\n")}
          ${u[0]}       // init ops for reduce max/min
          ${u[1]}
          ${f}
          ${u[3]}
          ${4===u.length?o.setByOffset("global_idx","value"):u.slice(4).join("\n")}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:s}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...e2(l,u)]})}},tT=(e,t)=>{let i=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>i.push(Number(e))),eX({axes:i,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},tE=(e,t,i,r)=>{let a=e.inputs,s=1===a.length?i:tT(a,i);e.compute(tI(t,{hint:s.cacheKey,inputDependencies:["rank"]},[a[0]],s.noopWithEmptyAxes&&0===s.axes.length?tS:r,s.axes,a[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},tz=(e,t,i)=>{if(0===t.length)return i;let r=1,a=1;for(let i=0;i<t.length;i++)-1===t.indexOf(i)?r*=e[i]:a*=e[i];return a<32&&r>1024},tC=(e,t)=>{if(tz(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes))tk(e.inputs),tE(e,"ReduceMean",t,(t,i,r)=>{let a=1;for(let i=0;i<t.rank;i++)(r.indexOf(i)>=0||0===r.length)&&(a*=e.inputs[0].dims[i]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${a});`]});else tf(e,t)},tO=(e,t)=>{if(tz(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes))tk(e.inputs),tE(e,"ReduceL1",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += abs(${e.getByIndices("input_indices")});`,""]);else tm(e,t)},tB=(e,t)=>{if(tz(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes))tk(e.inputs),tE(e,"ReduceL2",t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"]);else tg(e,t)},tA=(e,t)=>{if(tz(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes))tk(e.inputs),tE(e,"ReduceLogSumExp",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += exp(${e.getByIndices("input_indices")});`,"value = log(value);"]);else t_(e,t)},tR=(e,t)=>{if(tz(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes))tk(e.inputs),tE(e,"ReduceMax",t,(e,t,i)=>{let r=[];for(let t=0;t<e.rank;t++)(i.indexOf(t)>=0||0===i.length)&&r.push(e.indicesSet("input_indices",t,0));return[`${r.join("\n")}`,`var value = ${e.getByIndices("input_indices")};`,`value = max(value, ${e.getByIndices("input_indices")});`,""]});else ty(e,t)},tM=(e,t)=>{if(tz(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes))tk(e.inputs),tE(e,"ReduceMin",t,(e,t,i)=>{let r=[];for(let t=0;t<e.rank;t++)(i.indexOf(t)>=0||0===i.length)&&r.push(`input_indices[${t}] = 0;`);return[`${r.join("\n")}`,`var value = ${e.getByIndices("input_indices")};`,`value = min(value, ${e.getByIndices("input_indices")});`,""]});else t$(e,t)},tD=(e,t)=>{if(tz(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes))tk(e.inputs),tE(e,"ReduceProd",t,(e,t)=>[`var value = ${t.type.storage}(1);`,"",`value *= ${e.getByIndices("input_indices")};`,""]);else tb(e,t)},tP=(e,t)=>{if(tz(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes))tk(e.inputs),tE(e,"ReduceSum",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,""]);else tw(e,t)},tq=(e,t)=>{if(tz(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes))tk(e.inputs),tE(e,"ReduceSumSquare",t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += t * t;`,""]);else tv(e,t)},tN=(e,t)=>{if(tz(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes))tk(e.inputs),tE(e,"ReduceLogSum",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,"value = log(value);"]);else tx(e,t)}}}),ne=s$({"web/lib/wasm/jsep/webgpu/ops/argminmax.ts"(){"use strict";sQ(),s6(),s9(),tU=e=>{if(!e||0===e.length||e.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==e[0].dataType)throw Error("Invalid input type.")},tV=(e,t)=>{tU(e.inputs),e.compute(tI("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,i,r)=>{let a=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&a.push(`input_indices[${t}] = 0;`);return[`${a.join("\n")}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]},[t.axis],7,t.keepDims),{inputs:[0]})},tL=(e,t)=>{tU(e.inputs),e.compute(tI("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,i,r)=>{let a=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&a.push(`input_indices[${t}] = 0;`);return[`${a.join("\n")}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]},[t.axis],7,t.keepDims),{inputs:[0]})},tG=e=>eX(e)}}),nt=s$({"web/lib/wasm/jsep/webgpu/ops/attention.ts"(){"use strict";sQ(),sJ(),s3(),s8(),tW=(e,t,i)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${i?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,tj=(e,t,i,r,a,s,n,o,u,l,d,p)=>{var c,h,f;let m,g,_,y,$,b,w,v,x,k,S,I,T,E,z,C,O,B,A,R,M,D,P,q,N,U,V,L,G,W,j,H,F,K=Math.min(e.outputCount,1+ +!!n+ +!!o),Z=K>1?l.pastSequenceLength:0,Q=Z+l.kvSequenceLength,X=u&&ex.size(u.dims)>0?u:void 0,Y=[t,i];K>1&&n&&ex.size(n.dims)>0&&Y.push(n),X&&Y.push(X),d&&Y.push(d),p&&Y.push(p);let J=e.compute((m=Z+l.kvSequenceLength,g=[l.batchSize,l.numHeads,l.sequenceLength,m],_=K>1&&n,y=l.kvNumHeads?l.kvNumHeads:l.numHeads,$=_?[l.batchSize,y,m,l.headSize]:void 0,b=l.nReps?l.nReps:1,w=0===l.scale?1/Math.sqrt(l.headSize):l.scale,v=e3(l.headSize),x=l.headSize/v,k={x:Math.ceil(m/12),y:Math.ceil(l.sequenceLength/12),z:l.batchSize*l.numHeads},S=[{type:12,data:l.sequenceLength},{type:12,data:x},{type:12,data:m},{type:12,data:l.numHeads},{type:12,data:l.headSize},{type:1,data:w},{type:12,data:Z},{type:12,data:l.kvSequenceLength},{type:12,data:b}],I=_&&n&&ex.size(n.dims)>0,T=["type","type"],I&&T.push("type"),X&&T.push("type"),d&&T.push("type"),p&&T.push("type"),E=[{dims:g,dataType:t.dataType,gpuDataType:0}],_&&E.push({dims:$,dataType:t.dataType,gpuDataType:0}),{name:"AttentionProbs",shaderCache:{hint:`${v};${void 0!==X};${void 0!==n};${K}`,inputDependencies:T},getRunData:()=>({outputs:E,dispatchGroup:k,programUniforms:S}),getShaderSource:e=>{let r=e9("q",t.dataType,t.dims,v),a=[r,e9("key",i.dataType,i.dims,v)];if(I){let e=e9("past_key",n.dataType,n.dims,v);a.push(e)}X&&a.push(e9("attention_bias",X.dataType,X.dims));let s=d?e9("seq_lens",d.dataType,d.dims):void 0;s&&a.push(s);let o=p?e9("total_sequence_length_input",p.dataType,p.dims):void 0;o&&a.push(o);let u=te("output",t.dataType,g),l=[u];_&&l.push(te("present_key",t.dataType,$,v));let c=e1(1,v);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${r.type.storage}, 144>;
  var<workgroup> tileK: array<${r.type.storage}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...a,...l)}
  ${e.mainStart([12,12,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${1===b?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${1===b?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${tW(s,o,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&_?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${_?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${c}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&_?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${_?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${c}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(v){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw Error(`Unsupported components: ${v}`)}})()};
        output[outputIdx] = ${u.type.value} (sum * uniforms.alpha) + ${X?"attention_bias[outputIdx]":"0.0"};
    }
  }`}}),{inputs:Y,outputs:K>1?[-1,1]:[-1]})[0];e.compute((c=l.batchSize,h=l.numHeads,f=l.sequenceLength,z=e3(d?1:Q),C=64,(O=Q/z)<64&&(C=32),B=[{type:12,data:c},{type:12,data:h},{type:12,data:Z},{type:12,data:f},{type:12,data:O},{type:12,data:Math.ceil(Q/z/C)}],A=e0(J.dataType,z),R=e1(1,z),M=["type"],d&&M.push("type"),p&&M.push("type"),{name:"AttentionProbsSoftmax",shaderCache:{hint:`${C};${A};${z}`,inputDependencies:M},getShaderSource:e=>{let t=te("x",J.dataType,J.dims,z),i=[t],r=d?e9("seq_lens",d.dataType,d.dims):void 0;r&&i.push(r);let a=p?e9("total_sequence_length_input",p.dataType,p.dims):void 0;a&&i.push(a);let s=e1(J.dataType);return`
  var<workgroup> thread_max: array<f32, ${C}>;
  var<workgroup> thread_sum: array<f32, ${C}>;
  ${e.registerUniforms([{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}]).declareVariables(...i)}
  ${e.mainStart([C,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${tW(r,a,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${C}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${d?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${R}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${R}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(z){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw Error(`Unsupported components: ${z}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${C}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${R}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${R}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(z){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw Error(`Unsupported components: ${z}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${C}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${t.type.value}(${s}(1.0) / ${s}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${R}(x[offset + i]);
        x[offset + i] = ${t.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${d?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${t.type.value}(${s}(0));
        }`:""};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:f,z:c*h},programUniforms:B})}),{inputs:d&&p?[J,d,p]:[J],outputs:[]});let ee=[J,r];K>1&&o&&ex.size(o.dims)>0&&ee.push(o),d&&ee.push(d),p&&ee.push(p),e.compute((D=Z+l.kvSequenceLength,P=l.nReps?l.nReps:1,q=l.vHiddenSize*P,N=K>1&&o,U=l.kvNumHeads?l.kvNumHeads:l.numHeads,V=N?[l.batchSize,U,D,l.headSize]:void 0,L=[l.batchSize,l.sequenceLength,q],G={x:Math.ceil(l.vHeadSize/12),y:Math.ceil(l.sequenceLength/12),z:l.batchSize*l.numHeads},W=[{type:12,data:l.sequenceLength},{type:12,data:D},{type:12,data:l.vHeadSize},{type:12,data:l.numHeads},{type:12,data:l.headSize},{type:12,data:q},{type:12,data:Z},{type:12,data:l.kvSequenceLength},{type:12,data:P}],j=N&&o&&ex.size(o.dims)>0,H=["type","type"],j&&H.push("type"),d&&H.push("type"),p&&H.push("type"),F=[{dims:L,dataType:J.dataType,gpuDataType:0}],N&&F.push({dims:V,dataType:J.dataType,gpuDataType:0}),{name:"AttentionScore",shaderCache:{hint:`${void 0!==o};${K}`,inputDependencies:H},getRunData:()=>({outputs:F,dispatchGroup:G,programUniforms:W}),getShaderSource:e=>{let t=e9("probs",J.dataType,J.dims),i=[t,e9("v",r.dataType,r.dims)];j&&i.push(e9("past_value",o.dataType,o.dims));let a=d?e9("seq_lens",d.dataType,d.dims):void 0;d&&i.push(a);let s=p?e9("total_sequence_length_input",p.dataType,p.dims):void 0;p&&i.push(s);let n=[te("output",J.dataType,L)];return N&&n.push(te("present_value",J.dataType,V)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${t.type.value}, 144>;
  var<workgroup> tileV: array<${t.type.value}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...i,...n)}
  ${e.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===P?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===P?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${tW(a,s,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${j&&N?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${N?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${t.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${j&&N?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${N?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`}}),{inputs:ee,outputs:K>1?[0,2]:[0]})},tH=(e,t)=>{let i,r,a,s,n,o,u,l=((e,t)=>{let i=e[0],r=e[1],a=e[2],s=e[3],n=e[4],o=e[5];if(n&&o)throw Error("Attention cannot have both past and attention_bias");if(3!==i.dims.length)throw Error('Input "input" must have 3 dimensions');let u=i.dims[0],l=i.dims[1],d=i.dims[2];if(1!==a.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==r.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==d)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==r.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=a.dims[0]/3,c=p,h=c;if(t.qkvHiddenSizes.length>0){if(3!==t.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let e of t.qkvHiddenSizes)if(e%t.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],c=t.qkvHiddenSizes[1],h=t.qkvHiddenSizes[2]}if(p!==c)throw Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==p+c+h)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let f=0;if(n){if(c!==h)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==n.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==n.dims[0])throw Error('Input "past" first dimension must be 2');if(n.dims[1]!==u)throw Error('Input "past" second dimension must be batch_size');if(n.dims[2]!==t.numHeads)throw Error('Input "past" third dimension must be num_heads');if(n.dims[4]!==c/t.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(f=n.dims[3])}let m=l+f;if(s)throw Error("Mask not supported");if(n)throw Error("past is not supported");if(o){if(4!==o.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==u||o.dims[1]!==t.numHeads||o.dims[2]!==l||o.dims[3]!==m)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:f,kvSequenceLength:l,totalSequenceLength:m,maxSequenceLength:-1,inputHiddenSize:d,hiddenSize:p,vHiddenSize:h,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(h/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}})(e.inputs,t),[d,p,c]=(i=[l.batchSize,l.numHeads,l.sequenceLength,l.headSize],r=l.sequenceLength,a=l.inputHiddenSize,s=l.headSize,n={x:Math.ceil(l.headSize/12),y:Math.ceil(l.sequenceLength/12),z:l.batchSize*l.numHeads},o=[e.inputs[0],e.inputs[1],e.inputs[2]],u=[{type:12,data:r},{type:12,data:a},{type:12,data:s},{type:12,data:l.numHeads},{type:12,data:l.headSize},{type:12,data:l.hiddenSize},{type:12,data:l.hiddenSize+l.hiddenSize+l.vHiddenSize}],e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:n,programUniforms:u}),getShaderSource:e=>{let t=te("output_q",o[0].dataType,i),r=te("output_k",o[0].dataType,i),a=te("output_v",o[0].dataType,i),s=e9("input",o[0].dataType,o[0].dims),n=e9("weight",o[1].dataType,o[1].dims),u=e9("bias",o[2].dataType,o[2].dims),l=s.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${l}, 144>;
  var<workgroup> tileWeightQ: array<${l}, 144>;
  var<workgroup> tileWeightK: array<${l}, 144>;
  var<workgroup> tileWeightV: array<${l}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}]).declareVariables(s,n,u,t,r,a)}
  ${e.mainStart([12,12,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${l}(0);
    var valueK = ${l}(0);
    var valueV = ${l}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`}},{inputs:o,outputs:[-1,-1,-1]}));return tj(e,d,p,c,e.inputs[4],void 0,void 0,void 0,e.inputs[5],l)}}}),ni=s$({"web/lib/wasm/jsep/webgpu/ops/batch-norm.ts"(){"use strict";sV(),sQ(),sJ(),s6(),s8(),tF=(e,t)=>{let i,{inputs:r,outputCount:a}=e,s=(i={...t,outputCount:a},eX(i));if(l.webgpu.validateInputContent&&((e,t)=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs");let i=(e,t,i)=>{let r=t.length;if(r!==e.length)throw Error(`${i}: num dimensions != ${r}`);t.forEach((t,r)=>{if(t!==e[r])throw Error(`${i}: dim[${r}] do not match`)})};if(e[0].dims.length>1){let r="NHWC"===t.format?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);i(e[1].dims,r,"Invalid input scale"),i(e[2].dims,r,"Invalid input B"),i(e[3].dims,r,"Invalid input mean"),i(e[4].dims,r,"Invalid input var")}else i(e[1].dims,[1],"Invalid input scale"),i(e[2].dims,[1],"Invalid input B"),i(e[3].dims,[1],"Invalid input mean"),i(e[4].dims,[1],"Invalid input var")})(r,s),t.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");e.compute(((e,t)=>{let{epsilon:i,spatial:r,format:a}=t,s=e[0].dims,n=r?e3(s[s.length-1]):1,o="NHWC"===a&&s.length>1?n:1,u=ex.size(s)/n,l=r?s.length:s,d=e9("x",e[0].dataType,e[0].dims,n),p=e9("scale",e[1].dataType,e[1].dims,o),c=e9("bias",e[2].dataType,e[2].dims,o),h=e9("inputMean",e[3].dataType,e[3].dims,o),f=e9("inputVar",e[4].dataType,e[4].dims,o),m=te("y",e[0].dataType,l,n);return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${n}`,inputDependencies:r?["rank","type","type","type","type"]:void 0},getShaderSource:e=>`
  const epsilon = ${i};
  ${e.registerUniform("outputSize","u32").declareVariables(d,p,c,h,f,m)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${m.offsetToIndices(`global_idx * ${n}`)};
    ${(()=>{let e="";if(r)e=`let cOffset = ${1===s.length?"0u":"NHWC"===a?`outputIndices[${s.length-1}] / ${n}`:"outputIndices[1]"};`;else if("NCHW"===a)e=`
            ${m.indicesSet("outputIndices","0","0")}
            let cOffset = ${m.indicesToOffset("outputIndices")};`;else{e=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let t=1;t<p.rank;t++)e+=`cIndices[${t}] = outputIndices[${t}];`;e+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return e})()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${c.getByOffset("cOffset")};
    let inputMean = ${h.getByOffset("cOffset")};
    let inputVar = ${f.getByOffset("cOffset")};
    let x = ${d.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${m.setByOffset("global_idx","value")}
  }`,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:r?[{type:12,data:u},...e2(s)]:[{type:12,data:u}]})}})(r,s))}}}),nr=s$({"web/lib/wasm/jsep/webgpu/ops/bias-add.ts"(){"use strict";sJ(),s8(),tK=e=>{let t,i,r,a,s,n,o,u;var l,d=e.inputs;if(3!==d[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(d[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==d[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(d[0].dims[2]!==d[1].dims[0])throw Error("last dimension of input and bias are not the same");e.compute((t=(l=e.inputs)[0].dims,i=l[0].dims[2],r=ex.size(t)/4,a=l[0].dataType,s=e9("input",a,t,4),n=e9("bias",a,[i],4),o=e9("residual",a,t,4),u=te("output",a,t,4),{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:l[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:e=>`
  const channels = ${i}u / 4;
  ${e.declareVariables(s,n,o,u)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${s.getByOffset("global_idx")}
      + ${n.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}))}}}),na=s$({"web/lib/wasm/jsep/webgpu/ops/unary-op.ts"(){"use strict";sQ(),sJ(),s6(),s8(),tZ=(e,t,i,r,a,s=e.dataType,n,o)=>{let u=[{type:12,data:Math.ceil(ex.size(e.dims)/4)}];return n&&u.push(...n),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:t=>{var a,n;let u,l,d,p,c;return a=ex.size(e.dims),n=e.dataType,u=Math.ceil(a/4),l="",l="string"==typeof i?`${i}(a)`:i("a"),d=e9("inputData",n,[u],4),p=te("outputData",s,[u],4),c=[{name:"vec_size",type:"u32"}],o&&c.push(...o),`
      ${t.registerUniforms(c).declareVariables(d,p)}

  ${r??""}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",l)}
  }`},getRunData:t=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(ex.size(t[0].dims)/64/4)},programUniforms:u})}},tQ=e=>{e.compute(tZ(e.inputs[0],"Abs","abs"))},tX=e=>{e.compute(tZ(e.inputs[0],"Acos","acos"))},tY=e=>{e.compute(tZ(e.inputs[0],"Acosh","acosh"))},tJ=e=>{e.compute(tZ(e.inputs[0],"Asin","asin"))},t0=e=>{e.compute(tZ(e.inputs[0],"Asinh","asinh"))},t1=e=>{e.compute(tZ(e.inputs[0],"Atan","atan"))},t2=e=>{e.compute(tZ(e.inputs[0],"Atanh","atanh"))},t3=e=>eX(e),t4=(e,t)=>{let i;switch(t.to){case 10:i="vec4<f16>";break;case 1:i="vec4<f32>";break;case 12:i="vec4<u32>";break;case 6:i="vec4<i32>";break;case 9:i="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(tZ(e.inputs[0],"Cast",i,void 0,t.cacheKey,t.to))},t6=(e,t)=>{let i=t||(e=>{let t,i,r=e.length>=2&&0!==e[1].data,a=e.length>=3&&0!==e[2].data;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,i=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,i=a?e[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return eX({min:t,max:i})})(e.inputs),r=e1(e.inputs[0].dataType);e.compute(tZ(e.inputs[0],"Clip",e=>`clamp(${e}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,i.cacheKey,void 0,[{type:e.inputs[0].dataType,data:i.min},{type:e.inputs[0].dataType,data:i.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},t8=e=>{e.compute(tZ(e.inputs[0],"Ceil","ceil"))},t5=e=>{e.compute(tZ(e.inputs[0],"Cos","cos"))},t7=e=>{e.compute(tZ(e.inputs[0],"Cosh","cosh"))},t9=e=>eX(e),ie=(e,t)=>{let i=e1(e.inputs[0].dataType);e.compute(tZ(e.inputs[0],"Elu",e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${i}(${t.alpha});

  fn elu_f32(a: ${i}) -> ${i} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${i}>) -> vec4<${i}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},it=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,ii=e=>{let t=e1(e.inputs[0].dataType);e.compute(tZ(e.inputs[0],"Erf",e=>`erf_vf32(${e})`,it(t)))},ir=e=>{e.compute(tZ(e.inputs[0],"Exp","exp"))},ia=e=>{e.compute(tZ(e.inputs[0],"Floor","floor"))},is=e=>{let t=e1(e.inputs[0].dataType);e.compute(tZ(e.inputs[0],"Gelu",e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,it(t)))},io=(e,t)=>{let i=e1(e.inputs[0].dataType);e.compute(tZ(e.inputs[0],"LeakyRelu",e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${i}>(0.0))`,`const leaky_relu_alpha_ = ${i}(${t.alpha});`,t.cacheKey))},iu=e=>{e.compute(tZ(e.inputs[0],"Not",e=>`!${e}`))},il=e=>{e.compute(tZ(e.inputs[0],"Neg",e=>`-${e}`))},id=e=>{e.compute(tZ(e.inputs[0],"Reciprocal",e=>`1.0/${e}`))},ip=e=>{let t=e1(e.inputs[0].dataType);e.compute(tZ(e.inputs[0],"Relu",e=>`select(vec4<${t}>(0.0), ${e}, ${e} > vec4<${t}>(0.0))`))},ic=e=>{e.compute(tZ(e.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},ih=e=>eX(e),im=(e,t)=>{let i=e1(e.inputs[0].dataType);e.compute(tZ(e.inputs[0],"HardSigmoid",e=>`max(vec4<${i}>(0.0), min(vec4<${i}>(1.0), ${t.alpha} * ${e} + vec4<${i}>(${t.beta})))`,void 0,t.cacheKey))},ig=e=>{e.compute(tZ(e.inputs[0],"Sin","sin"))},i_=e=>{e.compute(tZ(e.inputs[0],"Sinh","sinh"))},iy=e=>{e.compute(tZ(e.inputs[0],"Sqrt","sqrt"))},i$=e=>{e.compute(tZ(e.inputs[0],"Tan","tan"))},ib=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,iw=e=>{e.compute(tZ(e.inputs[0],"Tanh",ib))},iv=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${ib("v")};
}
`,ix=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,ik=e=>{let t=e1(e.inputs[0].dataType);e.compute(tZ(e.inputs[0],"FastGelu",ix,iv(t),void 0,e.inputs[0].dataType))},iS=(e,t)=>{let i=e1(e.inputs[0].dataType);return e.compute(tZ(e.inputs[0],"ThresholdedRelu",e=>`select(vec4<${i}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${i}>(${t.alpha});`,t.cacheKey)),0},iI=e=>{e.compute(tZ(e.inputs[0],"Log","log"))},iT=e=>`quick_gelu_impl(${e})`,iE=(e,t)=>{let i,r=e1(e.inputs[0].dataType);e.compute(tZ(e.inputs[0],"QuickGelu",iT,(i=t.alpha,`
const alpha = vec4<${r}>(${i});
const one = ${r}(1.0);
const zero = ${r}(0.0);

fn quick_gelu_impl(x: vec4<${r}>) -> vec4<${r}> {
  let v = x *alpha;
  var x1 : vec4<${r}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`),t.cacheKey,e.inputs[0].dataType))}}}),ns=s$({"web/lib/wasm/jsep/webgpu/ops/bias-split-gelu.ts"(){"use strict";sJ(),s8(),na(),iz=e=>{let t,i,r,a,s,n;var o,u=e.inputs;if(3!==u[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(u[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==u[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(u[0].dims[2]!==u[1].dims[0])throw Error("last dimension of input and bias are not the same");e.compute(((t=(o=e.inputs)[0].dims.slice())[2]=t[2]/2,i=e9("input",o[0].dataType,o[0].dims,4),r=e9("bias",o[0].dataType,[o[0].dims[2]],4),a=te("output",o[0].dataType,t,4),s=ex.size(t)/4,n=e0(o[0].dataType),{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:o[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:e=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${o[0].dims[2]/4/2}u;

  ${e.declareVariables(i,r,a)}

  ${it(n)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}))}}}),nn=s$({"web/lib/wasm/jsep/webgpu/ops/binary-op.ts"(){"use strict";sQ(),sJ(),s8(),iC=(e,t,i,r,a,s)=>{e.compute(((e,t,i,r,a,s,n=i.dataType)=>{let o=i.dims.map(Number),u=r.dims.map(Number),l=!ex.areEqual(o,u),d=o,p=ex.size(o),c=!1,h=!1,f=[l];if(l){let e=ev.calcShape(o,u,!1);if(!e)throw Error("Can't perform binary op on the given tensors");d=e.slice(),p=ex.size(d);let t=1===ex.size(o),i=1===ex.size(u),r=o.length>0&&o[o.length-1]%4==0,a=u.length>0&&u[u.length-1]%4==0;f.push(t),f.push(i),f.push(r),f.push(a);let s=1;for(let e=1;e<d.length;e++){let t=o[o.length-e];if(t===u[u.length-e])s*=t;else break}s%4==0?(h=!0,c=!0):(t||i||r||a)&&(c=!0)}else c=!0;return f.push(c),{name:e,shaderCache:{hint:t+f.map(e=>e.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:e=>((e,t,i,r,a,s,n,o,u,l,d,p)=>{let c,h,f;"string"==typeof o?c=h=(e,t)=>`${o}((${e}),(${t}))`:"function"==typeof o?c=h=o:(c=o.scalar,h=o.vector);let m=te("outputData",d,r.length,4),g=e9("aData",u,t.length,4),_=e9("bData",l,i.length,4);if(a)if(s){let e=1===ex.size(t),r=1===ex.size(i),a=t.length>0&&t[t.length-1]%4==0,s=i.length>0&&i[i.length-1]%4==0;f=e||r?m.setByOffset("global_idx",h(e?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),r?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"))):`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${_.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",h(n||a?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,n||s?_.getByOffset("offsetB / 4u"):`${_.type.value}(${_.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else f=m.setByOffset("global_idx",h(g.getByOffset("global_idx"),_.getByOffset("global_idx")));else{if(!s)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let e=(e,t,i="")=>{let r=`aData[indexA${t}][componentA${t}]`,a=`bData[indexB${t}][componentB${t}]`;return`
            let outputIndices${t} = ${m.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offsetA${t} = ${g.broadcastedIndicesToOffset(`outputIndices${t}`,m)};
            let offsetB${t} = ${_.broadcastedIndicesToOffset(`outputIndices${t}`,m)};
            let indexA${t} = offsetA${t} / 4u;
            let indexB${t} = offsetB${t} / 4u;
            let componentA${t} = offsetA${t} % 4u;
            let componentB${t} = offsetB${t} % 4u;
            ${e}[${t}] = ${i}(${c(r,a)});
          `};f=9===d?`
            var data = vec4<u32>(0);
            ${e("data",0,"u32")}
            ${e("data",1,"u32")}
            ${e("data",2,"u32")}
            ${e("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${e("outputData[global_idx]",0)}
            ${e("outputData[global_idx]",1)}
            ${e("outputData[global_idx]",2)}
            ${e("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(g,_,m)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${f}
      }`})(e,o,u,d,c,l,h,a,i.dataType,r.dataType,n,s),getRunData:()=>({outputs:[{dims:d,dataType:n}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(ex.size(d)/4)},...e2(o,u,d)]})}})(t,a??"",e.inputs[0],e.inputs[1],i,r,s))},iO=e=>{iC(e,"Add",(e,t)=>`${e}+${t}`)},iB=e=>{iC(e,"Div",(e,t)=>`${e}/${t}`)},iA=e=>{iC(e,"Equal",{scalar:(e,t)=>`u32(${e}==${t})`,vector:(e,t)=>`vec4<u32>(${e}==${t})`},void 0,void 0,9)},iR=e=>{iC(e,"Mul",(e,t)=>`${e}*${t}`)},iM=e=>{let t=e9("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;iC(e,"Pow",{scalar:(e,t)=>`pow_custom(${e},${t})`,vector:(e,t)=>`pow_vector_custom(${e},${t})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${"i32"===t?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},iD=e=>{iC(e,"Sub",(e,t)=>`${e}-${t}`)},iP=e=>{iC(e,"Greater",{scalar:(e,t)=>`u32(${e}>${t})`,vector:(e,t)=>`vec4<u32>(${e}>${t})`},void 0,void 0,9)},iq=e=>{iC(e,"Less",{scalar:(e,t)=>`u32(${e}<${t})`,vector:(e,t)=>`vec4<u32>(${e}<${t})`},void 0,void 0,9)},iN=e=>{iC(e,"GreaterOrEqual",{scalar:(e,t)=>`u32(${e}>=${t})`,vector:(e,t)=>`vec4<u32>(${e}>=${t})`},void 0,void 0,9)},iU=e=>{iC(e,"LessOrEqual",{scalar:(e,t)=>`u32(${e}<=${t})`,vector:(e,t)=>`vec4<u32>(${e}<=${t})`},void 0,void 0,9)}}}),no=s$({"web/lib/wasm/jsep/webgpu/ops/concat.ts"(){"use strict";sQ(),sJ(),s6(),s8(),iV=(e,t)=>{let i=e.inputs,r=i[0].dims,a=ex.normalizeAxis(t.axis,r.length);if(!i||i.length<1)throw Error("too few inputs");let s=i[0],n=s.dataType,o=s.dims.length;i.forEach((e,t)=>{if(0!==t){if(e.dataType!==n)throw Error("input tensors should be one type");if(e.dims.length!==o)throw Error("input tensors should have the same shape");e.dims.forEach((e,t)=>{if(t!==a&&e!==s.dims[t])throw Error("non concat dimensions must match")})}});let u=r.slice();u[a]=i.reduce((e,t)=>e+(t.dims.length>a?t.dims[a]:0),0);let l=i.filter(e=>ex.size(e.dims)>0);e.compute(((e,t,i,r)=>{let a=ex.size(i),s=Array(e.length),n=Array(e.length),o=0,u=[],l=[],d=[{type:12,data:a}];for(let i=0;i<e.length;++i)o+=e[i].dims[t],s[i]=o,l.push(e[i].dims.length),n[i]=e9(`input${i}`,r,l[i]),u.push("rank"),d.push({type:12,data:s[i]});for(let t=0;t<e.length;++t)d.push(...e2(e[t].dims));d.push(...e2(i));let p=te("output",r,i.length),c=p.indicesGet("indices",t),h=Array.from(Array(s.length).keys()).map(e=>`uniforms.sizeInConcatAxis${e}`).join(",");return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:i,dataType:r}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:t=>{let i;return`

  ${(()=>{t.registerUniform("outputSize","u32");for(let i=0;i<e.length;i++)t.registerUniform(`sizeInConcatAxis${i}`,"u32");return t.declareVariables(...n,p)})()}

  ${i=s.length,`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${i}u>(${h});
    for (var i: u32 = 0u; i < ${i}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${i}u;
  }`}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${c});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${h});
      ${c} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${((e,t)=>{let i=e.length,r=[];for(let a=0;a<i;++a){let s=t.setByOffset("global_idx",e[a].getByIndices("indices"));1===i?r.push(s):0===a?r.push(`if (inputIndex == ${a}u) { ${s} }`):a===i-1?r.push(`else { ${s} }`):r.push(`else if (inputIndex == ${a}) { ${s} }`)}return r.join("\n")})(n,p)}
  }`}}})(l,a,u,i[0].dataType),{inputs:l})},iL=e=>eX({axis:e.axis})}}),nu=s$({"web/lib/wasm/jsep/webgpu/ops/fuse-utils.ts"(){"use strict";sQ(),sJ(),iG=(e,t,i="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${i}(uniforms.clip_min)), ${t}(${i}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${i}(uniforms.alpha) * value + ${i}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${i}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${e.activation}`)}},iW=(e,t)=>{"Clip"===e.activation?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):"HardSigmoid"===e.activation?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):"LeakyRelu"===e.activation&&t.push({type:1,data:e.alpha})},ij=(e,t)=>{"Clip"===e.activation?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===e.activation?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===e.activation&&t.push({name:"alpha",type:"f32"})},iH=e=>{let t=e?.activation||"";if("HardSigmoid"===t){let[i,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:i,beta:r}}if("Clip"===t){let[i,r]=e?.activation_params||[eI,eT];return{activation:t,clipMax:r,clipMin:i}}if("LeakyRelu"===t){let[i]=e?.activation_params||[.01];return{activation:t,alpha:i}}return{activation:t}}}}),nl=s$({"web/lib/wasm/jsep/webgpu/ops/3rd-party/activation_util.ts"(){"use strict";iF=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw Error(`${e}-component is not supported.`)}},iK=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}}),nd=s$({"web/lib/wasm/jsep/webgpu/ops/3rd-party/conv_util.ts"(){"use strict";iZ=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}}),np=s$({"web/lib/wasm/jsep/webgpu/ops/matmul-shaders.ts"(){"use strict";sQ(),sJ(),s8(),nu(),iQ=(e,t,i,r,a)=>{let s=r-i;return`
      ${Array.from({length:i}).map((i,n)=>`
      if (${e5(t.shape,n,t.rank)} != 1) {
        ${t.indicesSet(e,n,e5(a,n+s,r))}
      } else {
        ${t.indicesSet(e,n,0)}
      }`).join("")}
`},iX=(e,t,i,r,a=!1,s)=>{let n=e[0].dims,o=e[1].dims,u=n[n.length-2],l=o[o.length-1],d=n[n.length-1],p=e3(l),c=e3(d),h=e3(u),f=ex.size(i)/p/h,m=e.length>2,g=r?r.slice(0,-2):i.slice(0,-2),_=[ex.size(g),u,l],y=[{type:12,data:f},{type:12,data:u},{type:12,data:l},{type:12,data:d}];return iW(t,y),y.push(...e2(g,n,o)),m&&y.push(...e2(e[2].dims)),y.push(...e2(_)),{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${c};${h};${a}`,inputDependencies:m?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:y}),getShaderSource:r=>{let s=ti("batch_dims",e[0].dataType,g.length),u=e9("a",e[0].dataType,n.length,c),l=e9("b",e[1].dataType,o.length,p),d=te("output",e[0].dataType,_.length,p),f=e0(d.type.tensor),y=iG(t,d.type.value,f),$=[u,l],b="";if(m){let t=a?p:1;$.push(e9("bias",e[2].dataType,e[2].dims.length,t)),b=`${a?`value += bias[col / ${t}];`:`value += ${d.type.value}(bias[row + i]);`}`}let w=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];return ij(t,w),`
  ${r.registerUniforms(w).registerInternalVariables(s).declareVariables(...$,d)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${h};
    let row = (index1 % stride1) * ${h};
    let batch = index1 / stride1;

    ${2===i.length?"":`let batch_indices = ${s.offsetToIndices("batch")};`}

    var a_indices: ${u.type.indices};
    ${iQ("a_indices",u,u.rank-2,s.rank,"batch_indices")}
    ${u.indicesSet("a_indices",u.rank-2,0)}
    ${u.indicesSet("a_indices",u.rank-1,0)}
    let a_offset = ${u.indicesToOffset("a_indices")};

    var b_indices: ${l.type.indices};
    ${iQ("b_indices",l,l.rank-2,s.rank,"batch_indices")}
    ${l.indicesSet("b_indices",l.rank-2,0)}
    ${l.indicesSet("b_indices",l.rank-1,0)}
    let b_offset = ${l.indicesToOffset("b_indices")};
    var values: array<${d.type.value}, ${h}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${c}) {
      ${(()=>{let e=`var a_data: ${u.type.value};`;for(let t=0;t<c;t++)e+=`
              let b_data${t} = b[(b_offset + (k + ${t}) * uniforms.N + col) / ${p}];`;for(let t=0;t<h;t++){e+=`a_data = a[(a_offset + (row + ${t}) * uniforms.K + k) / ${c}];`;for(let i=0;i<c;i++)e+=`
            values[${t}] = fma(${l.type.value}(a_data${1===c?"":`[${i}]`}), b_data${i}, values[${t}]);
`}return e})()}
    }
    for (var i = 0u; i < ${h}u; i++) {
      var value = values[i];
      ${b}
      ${y}
      let cur_indices = ${d.type.indices}(batch, row + i, col);
      let offset = ${d.indicesToOffset("cur_indices")};
      ${d.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `}}}}}),nc=s$({"web/lib/wasm/jsep/webgpu/ops/3rd-party/matmul_packed_webgpu.ts"(){"use strict";sQ(),sJ(),s8(),nu(),np(),nl(),iY=(e,t,i="f32",r,a=!1,s=32,n=!1,o=32)=>{let u=t[1]*e[1],l=t[0]*e[0],d=a?u:s,p=d/t[0],c=s/t[1];if(!((a&&4===p&&4===e[1]||!a&&(3===p||4===p))&&d%t[0]==0&&s%t[1]==0&&4===e[0]))throw Error(`If transposeA ${a} is true, innerElementSize ${p} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${i}>, ${d/p}>, ${a?s:u}>;
var<workgroup> mm_Bsub: array<array<vec4<${i}>, ${l/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${p};
const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${n?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${n?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${n?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${i}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${c};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${a?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${r?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${r?", batchIndices":""});
        `}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${c}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${3===p?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${a?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${3===p?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${3===p?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${3===p?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},iJ=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,i0=(e,t,i="f32",r,a=!1,s=32,n=!1,o=32,u=!1)=>{let l=e[1]*t[1],d=e[0]*t[0],p=a?l:s,c=a?s:l;if(c%t[1]!=0||p%t[0]!=0||s%t[1]!=0)throw Error(`tileAHight ${c} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let h=c/t[1],f=p/t[0],m=s/t[1],g=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${c}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${iJ(a,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${i}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${h};
let tileColA = i32(localId.x) * ${f};
let tileRowB = i32(localId.y) * ${m};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${f}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${iJ(a,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${i}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${a?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];"}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${i}, ${p}>, ${c}>;
  var<workgroup> mm_Bsub : array<array<${i}, ${d}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${n?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${n?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${n?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${i}, colPerThread>, rowPerThread>;
    ${g}
  }
`},i1=(e,t,i,r,a=!1,s)=>{let n=e[0].dims,o=e[1].dims,u=n.slice(0,-2),l=o.slice(0,-2),d=r?r.slice(0,-2):i.slice(0,-2),p=ex.size(d),c=n[n.length-2],h=n[n.length-1],f=o[o.length-1],m=h%4==0&&f%4==0,g=c<=8?[4,1,1]:[4,4,1],_=[8,8,1],y=[Math.ceil(f/_[0]/g[0]),Math.ceil(c/_[1]/g[1]),Math.ceil(p/_[2]/g[2])],$=m?4:1,b=[...u,c,h/$],w=b.length,v=[...l,h,f/$],x=v.length,k=[p,c,f/$],S=[{type:6,data:c},{type:6,data:f},{type:6,data:h}];iW(t,S),S.push(...e2(d,b,v));let I=["rank","rank"],T=e.length>2;return T&&(S.push(...e2(e[2].dims)),I.push("rank")),S.push(...e2(k)),{name:"MatMul",shaderCache:{hint:`${g};${t.activation};${m};${a}`,inputDependencies:I},getRunData:()=>({outputs:[{dims:s?s(i):i,dataType:e[0].dataType}],dispatchGroup:{x:y[0],y:y[1],z:y[2]},programUniforms:S}),getShaderSource:i=>{let r=d.length,s=ti("batchDims",e[0].dataType,r,1),n=e0(e[0].dataType),o=e9("a",e[0].dataType,w,$),u=e9("b",e[1].dataType,x,$),l=te("result",e[0].dataType,k.length,$),p=[o,u];if(T){let t=a?$:1;p.push(e9("bias",e[2].dataType,e[2].dims.length,t))}let c=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];ij(t,c);let h=e0(l.type.tensor),f=((e,t,i,r,a=!1)=>{let[s,n,o,u]=r,l=e0(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${iF(e,l)} {
      var value = ${iF(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${n.type.indices};
        ${iQ("aIndices",n,n.rank-2,s.rank,"batchIndices")}
        ${n.indicesSet("aIndices",n.rank-2,"u32(row)")}
        ${n.indicesSet("aIndices",n.rank-1,"u32(colIn)")}
        value = ${n.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${iF(e,l)} {
      var value = ${iF(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${iQ("bIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${iF(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${iF(e,l)}(bias[row])`};`:""}
        ${i}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `})($,T,iG(t,l.type.value,h),[s,o,u,l],a);return`
  ${i.registerUniforms(c).registerInternalVariables(s).declareVariables(...p,l)}
  ${f}
  ${m?iY(g,_,n,s):i0(g,_,n,s)}
                   `}}}}}),nh=s$({"web/lib/wasm/jsep/webgpu/ops/3rd-party/conv2d_mm_webgpu.ts"(){"use strict";sQ(),sY(),s8(),nu(),nl(),nd(),nc(),i2=(e,t,i,r,a,s,n,o,u)=>{let l="NHWC"===t.format,d=l?e[0].dims[3]:e[0].dims[1],p=i[0],c=l?i[2]:i[3],h=l?i[1]:i[2],f=l?i[3]:i[1],m=l&&(d%4==0||d%3==0)&&f%4==0,g=l?f:c*h,_=l?c*h:f,y=[8,8,1],$=r<=8?[4,1,1]:[4,4,1],b=[Math.ceil(g/y[0]/$[0]),Math.ceil(_/y[1]/$[1]),Math.ceil(p/y[2]/$[2])];eb("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${b}`);let w=m?l&&d%4!=0?3:4:1,v=y[1]*$[1],x=y[0]*$[0],k=Math.max(y[0]*w,y[1]),S=r%v==0,I=a%x==0,T=s%k==0,E=m?[w,4,4]:[1,1,1],z=[{type:6,data:r},{type:6,data:a},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];iW(t,z),z.push(...e2(e[0].dims,e[1].dims));let C=["rank","rank"];return n&&(z.push(...e2(e[2].dims)),C.push("rank")),z.push(...e2(i)),{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${w};${m};${S};${I};${T};${v};${x};${k}`,inputDependencies:C},getRunData:()=>({outputs:[{dims:u?u(i):i,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:z}),getShaderSource:r=>{let a=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];ij(t,a);let s=m?4:1,u=e0(e[0].dataType),d=`
      fn setOutputAtIndex(flatIndex : i32, value : ${m?`vec4<${u}>`:u}) {
        result[flatIndex] = ${m?`vec4<${u}>`:u}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${m?`vec4<${u}>`:u}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${m?"/ 4":""}, value);
      }`,p=[e9("x",e[0].dataType,e[0].dims.length,3===w?1:w),e9("w",e[1].dataType,e[1].dims.length,s)],c=te("result",e[0].dataType,i.length,s);if(n){let t=e9("bias",e[2].dataType,e[2].dims.length,s);p.push(t),d+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${m?`vec4<${u}>`:u} {
          return bias[coords.${l?"w":"y"}${m?"/ 4":""}];
        }`}return`
        ${iZ("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${r.registerUniforms(a).declareVariables(...p,c)}
        ${d}
        ${((e,t,i,r,a=!1,s,n=4,o=4,u=4,l="f32")=>{let d=e=>{switch(e){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${e} is not supported.`)}},p=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,c=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,h=e?"row":"col",f=e?"col":"row",m=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${h} / outWidth;
    let outCol = ${h} % outWidth;

    let WRow = ${f} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${f} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${f} % inChannels;
    var resData = ${iF(n,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])"} && xCol >= 0 && xCol < ${e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])"}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${(e=>{switch(e){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw Error(`innerElementSize ${e} is not supported.`)}})(n)}
    }
    return resData;`,g=e?t&&r?`
    let col = colIn * ${n};
    ${m}`:`
    let col = colIn * ${n};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${m}
    }
    return ${iF(n,l)}(0.0);`:r&&i?`
    let col = colIn * ${n};
    ${m}`:`
    let col = colIn * ${n};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${m}
    }
    return ${iF(n,l)}(0.0);`,_=e?r&&i?d(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${d(o)}
    }
    return ${iF(o,l)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${d(o)}
    }
    return ${iF(o,l)}(0.0);`,y=iF(u,l),$=e?iF(n,l):iF(o,l),b=e?iF(o,l):iF(n,l),w=iG(s,y,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${$} {
      ${e?g:_}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${b} {
      ${e?_:g}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${y}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${c}
      ${iK(a)}
      ${w}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`})(l,S,I,T,n,t,E[0],E[1],E[2],u)}
        ${m?iY($,y,u,void 0,!l,k):i0($,y,u,void 0,!l,k,!1,void 0,o)}`}}}}}),nf=s$({"web/lib/wasm/jsep/webgpu/ops/3rd-party/conv3d_naive_webgpu.ts"(){"use strict";sQ(),sY(),sJ(),s8(),nu(),nl(),i3=e=>"number"==typeof e?[e,e,e]:e,i4=(e,t)=>t<=1?e:e+(e-1)*(t-1),i6=(e,t,i,r,a)=>{null==a&&(a=((e,t,i,r=1)=>{let a=i4(t,r);return Math.floor((e[0]*(i-1)-i+a)/2)})(e,t[0],r[0]));let s=[0,0,0,i];for(let i=0;i<3;i++)e[i]+2*a>=t[i]&&(s[i]=Math.trunc((e[i]-t[i]+2*a)/r[i]+1));return s},i8=(e,t,i,r,a,s=!1,n="channelsLast")=>{let o,u,l,d,p;if("channelsLast"===n)[o,u,l,d,p]=e;else if("channelsFirst"===n)[o,p,u,l,d]=e;else throw Error(`Unknown dataFormat ${n}`);let[c,,h,f,m]=t,[g,_,y]=i3(i),[$,b,w]=i3(r),v=i4(h,$),x=i4(f,b),k=i4(m,w),{padInfo:S,outDepth:I,outHeight:T,outWidth:E}=((e,t,i,r,a,s,n,o,u,l)=>{let d,p,c,h;if("VALID"===e&&(e=0),"number"==typeof e){d={top:e,bottom:e,left:e,right:e,front:e,back:e};let f=i6([t,i,r,1],[o,u,l],1,[a,s,n],e);p=f[0],c=f[1],h=f[2]}else if(Array.isArray(e)){if(!e.every((e,t,i)=>e===i[0]))throw Error(`Unsupported padding parameter: ${e}`);d={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let f=i6([t,i,r,1],[o,u,l],1,[a,s,n],e[0]);p=f[0],c=f[1],h=f[2]}else if("SAME_UPPER"===e){let e=((p=Math.ceil(t/a))-1)*a+o-t,f=((c=Math.ceil(i/s))-1)*s+u-i,m=((h=Math.ceil(r/n))-1)*n+l-r,g=Math.floor(e/2),_=Math.floor(f/2),y=Math.floor(m/2);d={top:_,bottom:f-_,left:y,right:m-y,front:g,back:e-g}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:p,outHeight:c,outWidth:h}})(a,u,l,d,g,_,y,v,x,k),z=s?c*p:c,C=[0,0,0,0,0];return"channelsFirst"===n?C=[o,z,I,T,E]:"channelsLast"===n&&(C=[o,I,T,E,z]),{batchSize:o,dataFormat:n,inDepth:u,inHeight:l,inWidth:d,inChannels:p,outDepth:I,outHeight:T,outWidth:E,outChannels:z,padInfo:S,strideDepth:g,strideHeight:_,strideWidth:y,filterDepth:h,filterHeight:f,filterWidth:m,effectiveFilterDepth:v,effectiveFilterHeight:x,effectiveFilterWidth:k,dilationDepth:$,dilationHeight:b,dilationWidth:w,inShape:e,outShape:C,filterShape:t}},i5=(e,t,i,r,a,s)=>{let n="channelsLast"===s,o=(n?e[0].dims[3]:e[0].dims[1],[Math.ceil((e=>{let t=1;for(let i=0;i<e.length;i++)t*=e[i];return t})(({x:i.map((e,t)=>t)}).x.map(e=>i[e]))/64),1,1]);eb("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${o}`);let u=[{type:12,data:ex.size(i)},{type:12,data:r},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];iW(t,u),u.push(...e2(e[0].dims,e[1].dims));let l=["rank","rank"],d=3===e.length;return d&&(u.push(...e2(e[2].dims)),l.push("rank")),u.push(...e2(i)),{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${n};1;${d}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:o[0],y:o[1],z:o[2]},programUniforms:u}),getShaderSource:s=>{let o=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];ij(t,o);let u=e0(e[0].dataType),l=e9("x",e[0].dataType,e[0].dims.length,1),p=e9("W",e[1].dataType,e[1].dims.length,1),c=[l,p],h=te("result",e[0].dataType,i.length,1),f="";if(d){let t=e9("bias",e[2].dataType,e[2].dims.length,1);c.push(t),f+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u} {
          return bias[${n?e5("coords",4,5):e5("coords",1,5)}];
        }`}let m=iF(1,u),g=iG(t,m,u);return`
            ${f}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${l.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${p.getByIndices("aIndices")};
            }
          ${s.registerUniforms(o).declareVariables(...c,h)}
          ${s.mainStart()}
          ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${h.offsetToIndices("global_idx")};
              let batch = ${e5("coords",0,l.rank)};
              let d2 = ${n?e5("coords",l.rank-1,l.rank):e5("coords",1,l.rank)};
              let xFRCCorner = vec3<u32>(${n?e5("coords",1,l.rank):e5("coords",2,l.rank)},
              ${n?e5("coords",2,l.rank):e5("coords",3,l.rank)},
              ${n?e5("coords",3,l.rank):e5("coords",4,l.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${n?e5("uniforms.x_shape",1,l.rank):e5("uniforms.x_shape",2,l.rank)};
              let xShapeZ = ${n?e5("uniforms.x_shape",2,l.rank):e5("uniforms.x_shape",3,l.rank)};
              let xShapeW = ${n?e5("uniforms.x_shape",3,l.rank):e5("uniforms.x_shape",4,l.rank)};
              let xShapeU = ${n?e5("uniforms.x_shape",4,l.rank):e5("uniforms.x_shape",1,l.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${n?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${n?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${n?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${n?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${d?"value = value + getBiasByOutputCoords(coords)":""};
              ${g}
              result[global_idx] = f32(value);
          }`}}}}}),nm=s$({"web/lib/wasm/jsep/webgpu/ops/conv-grouped.ts"(){"use strict";sQ(),sJ(),s8(),nu(),i7=(e,t,i,r)=>{let a=e.length>2,s=a?"value += b[output_channel];":"",n=e[0].dims,o=e[1].dims,u="NHWC"===t.format,l=u?i[3]:i[1],d=l/t.group,p=u&&d>=4?e3(l):1,c=ex.size(i)/p,h=[{type:12,data:c},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:d}];return iW(t,h),h.push(...e2(n,[o[0],o[1],o[2],o[3]/p])),h.push(...e2([i[0],i[1],i[2],i[3]/p])),{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:a?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:r=>{let l=te("output",e[0].dataType,i.length,p),d=e0(l.type.tensor),c=iG(t,l.type.value,d),h=e9("x",e[0].dataType,n.length),f=e9("w",e[1].dataType,o.length,p),m=[h,f];a&&m.push(e9("b",e[2].dataType,e[2].dims,p));let g=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];ij(t,g);let _=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${h.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${f.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${h.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${f.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${r.registerUniforms(g).declareVariables(...m,l)}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${l.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${l.type.value} = ${l.type.value}(0);
    ${_}
    ${s}
    ${c}
    ${l.setByOffset("global_idx","value")}
  }`}}},i9=(e,t,i,r)=>{let a=e.length>2,s=e3(i[3]),n=e3(i[2]),o=ex.size(i)/s/n,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],d=[i[0],i[1],i[2],i[3]/s],p=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];iW(t,p),p.push(...e2(u,l,d));let c=(n-1)*t.strides[1]+l[1];return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${n};${c};${l[0]};${l[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:i=>{let r=te("output",e[0].dataType,d.length,s),o=e0(r.type.tensor),p=iG(t,r.type.value,o),h=e9("x",e[0].dataType,u.length,s),f=e9("w",e[1].dataType,l.length,s),m=[h,f];a&&m.push(e9("b",e[2].dataType,e[2].dims,s));let g=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return ij(t,g),`
  ${i.registerUniforms(g).declareVariables(...m,r)}
  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${n}u;
    let col = (index1 % width1) * ${n}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${h.type.value}, ${c}>;
    var values: array<${r.type.value}, ${n}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${c}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${h.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${h.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${f.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${n}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${n}u; i++) {
      var value = values[i];
      ${a?"value += b[output_channel];":""}
      ${p}
      ${r.set("batch","row","col + i","output_channel","value")};
    }
  }`}}}}}),ng=s$({"web/lib/wasm/jsep/webgpu/ops/conv.ts"(){"use strict";sJ(),nh(),nf(),nc(),nm(),nu(),np(),s5(),re=[2,3,1,0],rt=(e,t)=>{let i=e.kernelShape.slice();i.length<t[1].dims.length-2&&i.push(...Array(t[1].dims.length-2-i.length).fill(0));for(let e=2;e<t[1].dims.length;++e)0===i[e-2]&&(i[e-2]=t[1].dims[e]);let r=e.pads.slice();ek.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,i,r,"NHWC"===e.format,e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:i,pads:r}),a},ri=e=>{let t=iH(e),i=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,s=e.group,n=e.kernel_shape,o=e.pads;return{autoPad:r,format:i,dilations:a,group:s,kernelShape:n,pads:o,strides:e.strides,wIsConst:e.w_is_const(),...t,cacheKey:`${e.format};${t.activation};`}},rr=(e,t,i,r)=>{var a,s,n,o,u;let l,d,p,c,h,f,m="NHWC"===i.format,g=(a=t[0].dims,s=t[1].dims,n=i.dilations,o=i.pads,u=i.strides,l=a[0],p=(d=a.slice(m?1:2,m?3:4)).length,c=s[0],h=s.slice(2).map((e,t)=>e+(e-1)*(n[t]-1)),(f=d.map((e,t)=>e+o[t]+o[t+p]).map((e,t)=>Math.floor((e-h[t]+u[t])/u[t]))).splice(0,0,l),f.splice(m?3:1,0,c),f);if(1!==i.group){let a=[t[0]];if(m){let r=e.kernelCustomData.wT??e.compute(tn(t[1],re),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=r),a.push(r)}else a.push(t[1]);3===t.length&&a.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&m&&t[1].dims[0]===i.group&&1===t[1].dims[1]&&1===i.dilations[0]&&1===i.dilations[1]?e.compute(i9(a,i,g,r),{inputs:a}):e.compute(i7(a,i,g,r),{inputs:a});return}let _=3===t.length,y=t[0].dims[m?1:2],$=t[0].dims[m?2:3],b=t[0].dims[m?3:1],w=t[1].dims[2],v=t[1].dims[3],x=g[m?1:2],k=g[m?2:3],S=g[m?3:1],I=m&&w===y&&v===$&&0===i.pads[0]&&0===i.pads[1];if(I||1===w&&1===v&&1===i.dilations[0]&&1===i.dilations[1]&&1===i.strides[0]&&1===i.strides[1]&&0===i.pads[0]&&0===i.pads[1]){let a,s,n,o=g[0],u=[];if(m){let r=e.kernelCustomData.wT??e.compute(tn(t[1],re),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];if(i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=r),I){let e=y*$*b;a=t[0].reshape([1,o,e]),s=r.reshape([1,e,S]),n=[1,o,S]}else a=t[0].reshape([o,y*$,b]),s=r.reshape([1,b,S]),n=[o,x*k,S];u.push(a),u.push(s)}else a=t[0].reshape([o,b,y*$]),s=t[1].reshape([1,S,b]),n=[o,S,x*k],u.push(s),u.push(a);_&&u.push(t[2]);let l=n[2],d=u[0].dims[u[0].dims.length-1];l<8&&d<8?e.compute(iX(u,i,g,n,m,r),{inputs:u}):e.compute(i1(u,i,g,n,m,r),{inputs:u});return}let T=e.kernelCustomData.wT??e.compute(tn(t[1],re),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=T);let E=[t[0],T];_&&E.push(t[2]);let z=m?x*k:S,C=m?S:x*k,O=w*v*b;e.compute(i2(E,i,g,z,C,O,_,!0,r),{inputs:E})},ra=(e,t)=>{var i,r=e.inputs;if(!r||2!==r.length&&3!==r.length)throw Error("Conv requires 2 or 3 inputs");if(r[0].dims.length>5)throw Error("greater than 5D is not supported");if(r[0].dims.length!==r[1].dims.length)throw Error("filter does not have same dimension as input");if(r[0].dims["NHWC"===t.format?r[0].dims.length-1:1]!==r[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===r.length&&(1!==r[2].dims.length||r[1].dims[0]!==r[2].dims[0]))throw Error("invalid bias");let a=r[0].dims.length-2;if(t.dilations.length!==a)throw Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw Error(`strides should be ${a}D`);if(t.pads.length!==2*a)throw Error(`pads should be ${2*a}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==r[1].dims.length-2)throw Error("invalid kernel shape");if(3===e.inputs[0].dims.length){let i,r,a,s,n,o,u;i="NHWC"===t.format,r=[e.inputs[0].reshape(i?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])],3===e.inputs.length&&r.push(e.inputs[2]),a=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),n=[1].concat(t.dilations),o=[1].concat(t.kernelShape),u=rt({...t,pads:a,strides:s,dilations:n,kernelShape:o},r),rr(e,r,u,e=>i?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])}else if(5===e.inputs[0].dims.length){let r,a,s,n;i=e.inputs,r="NHWC"===t.format?"channelsLast":"channelsFirst",a=rt(t,i),s="NOTSET"===t.autoPad?t.pads:t.autoPad,n=i8(i[0].dims,i[1].dims,t.strides,t.dilations,s,!1,r),e.compute(i5(i,a,n.outShape,[n.filterDepth,n.filterHeight,n.filterWidth],[n.padInfo.front,n.padInfo.top,n.padInfo.left],r))}else{let i=rt(t,e.inputs);rr(e,e.inputs,i)}}}}),n_=s$({"web/lib/wasm/jsep/webgpu/ops/3rd-party/conv_backprop_webgpu.ts"(){"use strict";sQ(),sY(),sJ(),s8(),rs=(e,t,i)=>{let r=e.length>2,a=t.outputShape,s="NHWC"===t.format,n=t.group,o=e[1].dims,u=o[2]/n,l=o[3],d=s?e3(u):1,p=s&&1===l&&u>=4,c=p?4*Math.floor(u/4):Math.floor(u/d)*d,h=u-c,f=s?e3(l):1,m=s?1===l?d:f:1,g=ex.size(a)/f,_=[Math.ceil(g/64),1,1];eb("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${_}`);let y=["rank","rank"],$=[t.strides[0],t.strides[1]],b=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],w=[t.dilations[0],t.dilations[1]],v=[b[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),b[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],x=[v[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),v[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],k=[{type:12,data:g},{type:12,data:$},{type:12,data:b},{type:12,data:w},{type:12,data:v},{type:6,data:x},{type:12,data:c},{type:12,data:u},{type:12,data:l},...e2(e[0].dims,e[1].dims)];return r&&(k.push(...e2(e[2].dims)),y.push("rank")),k.push(...e2(a)),{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${d}${m}${f}${p}${h}`,inputDependencies:y},getRunData:()=>({dispatchGroup:{x:_[0],y:_[1],z:_[2]},outputs:[{dims:i?i(a):a,dataType:e[0].dataType}],programUniforms:k}),getShaderSource:t=>{let i=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:$.length},{name:"filter_dims",type:"u32",length:b.length},{name:"dilations",type:"u32",length:b.length},{name:"effective_filter_dims",type:"u32",length:v.length},{name:"pads",type:"i32",length:x.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],n=e0(e[0].dataType),o=s?1:2,u=s?2:3,l=s?3:1,c=e9("W",e[1].dataType,e[1].dims.length,m),g=e9("Dy",e[0].dataType,e[0].dims.length,d),_=[g,c];r&&_.push(e9("bias",e[2].dataType,[a[l]].length,f));let y=te("result",e[0].dataType,a.length,f),w=`
            let outputIndices = ${y.offsetToIndices(`global_idx * ${f}`)};
            let batch = ${y.indicesGet("outputIndices",0)};
            let d1 = ${y.indicesGet("outputIndices",l)};
            let r = ${y.indicesGet("outputIndices",o)};
            let c = ${y.indicesGet("outputIndices",u)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${y.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${n}(dyRCorner) + ${n}(wR)) / ${n}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${n}(uniforms.Dy_shape[${o}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${n}(dyCCorner) + ${n}(wC)) / ${n}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${n}(uniforms.Dy_shape[${u}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${g.indicesToOffset(`${g.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d};
                var w_offset = ${c.indicesToOffset(`${c.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${m};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:d}) {
                  ${(()=>{let e="";if(p)4===d?e+=`
        let xValue = ${g.getByOffset("x_offset")};
        let wValue = ${c.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:2===d?e+=`
          dotProd = dotProd + dot(vec4<${n}>(${g.getByOffset("x_offset")}, ${g.getByOffset("x_offset + 1u")}), vec4<${n}>(${c.getByOffset("w_offset")}, ${c.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:1===d&&(e+=`
          dotProd = dotProd + dot(vec4<${n}>(${g.getByOffset("x_offset")}, ${g.getByOffset("x_offset + 1u")}, ${g.getByOffset("x_offset + 2u")}, ${g.getByOffset("x_offset + 3u")}), vec4<${n}>(${c.getByOffset("w_offset")}, ${c.getByOffset("w_offset + 1u")}, ${c.getByOffset("w_offset + 2u")}, ${c.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(e+=`
                  let xValue = ${s?g.getByOffset(`${g.indicesToOffset(`${g.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d}`):g.get("batch","inputChannel","idyR","idyC")};
        `,1===d)e+=`
          let w_offset = ${c.indicesToOffset(`${c.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${c.getByOffset(`w_offset / ${m}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let t=0;t<d;t++)e+=`
            let wValue${t} = ${c.getByOffset(`${c.indicesToOffset(`${c.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${t}, wOutChannel)`)} / ${m}`)};
            dotProd = dotProd + xValue[${t}] * wValue${t};`;return e})()}
                  inputChannel = inputChannel + ${p?4:d};
                }
                ${(()=>{if(0===h)return"";if(!p)throw Error(`packInputAs4 ${p} is not true.`);let e="";if(1===d){e+="dotProd = dotProd";for(let t=0;t<h;t++)e+=`
            + ${g.getByOffset(`x_offset + ${t}`)} * ${c.getByOffset(`w_offset + ${t}`)}`;e+=";"}else if(2===d){if(2!==h)throw Error(`Invalid inputChannelsRemainder ${h}.`);e+=`
          let xValue = ${g.getByOffset("x_offset")};
          let wValue = ${c.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return e})()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${f}]`:""};
            ${y.setByOffset("global_idx","value")};
          `;return`
    ${t.registerUniforms(i).declareVariables(..._,y)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${w}}`}}}}}),ny=s$({"web/lib/wasm/jsep/webgpu/ops/conv-transpose.ts"(){"use strict";n_(),nu(),s5(),rn=(e,t,i,r,a,s)=>(e-1)*t+i+(r-1)*a+1-s,ro=(e,t,i,r,a)=>{let s=Math.floor(e/2);"SAME_UPPER"===t?(i[r]=s,i[a]=e-s):"SAME_LOWER"===t&&(i[r]=e-s,i[a]=s)},ru=(e,t)=>{let i=e.kernelShape.slice();if(0===e.kernelShape.length||0===e.kernelShape.reduce((e,t)=>e*t,1)){i.length=0;for(let e=2;e<t[1].dims.length;++e)i.push(t[1].dims[e])}let r="NHWC"===e.format;i.splice(0,0,t[1].dims[0]),i.splice(r?3:1,0,t[1].dims[1]);let a=e.pads.slice(),s=e.outputShape.slice(),n=e.outputPadding.slice(),o=t[0].dims,u=e.dilations.slice();0===u.reduce((e,t)=>e+t,0)&&(u=Array(t[0].dims.length-2).fill(1));let l=e.strides.slice();0===l.reduce((e,t)=>e+t,0)&&(l=Array(t[0].dims.length-2).fill(1)),((e,t,i,r,a,s,n,o,u,l)=>{let d=e.length-2,p=0===l.length;u.length<d&&u.push(...Array(d-u.length).fill(0));let c=e[0],h=t[o?3:1]*a;for(let a=0,c=e.length-d-!!o;a<d;++a,++c){let o=e[c],h=p?o*n[a]:l[a];ro(rn(o,n[a],s[a],t[c],i[a],h),r,s,a,a+d),p&&l.push(n[a]*(o-1)+u[a]+(t[c]-1)*i[a]+1-s[a]-s[a+d])}l.splice(0,0,c),l.splice(o?3:1,0,h)})(o,i,u,e.autoPad,e.group,a,l,r,n,s);let d=Object.assign({},e);return Object.assign(d,{kernelShape:i,pads:a,outputPadding:n,outputShape:s,dilations:u,strides:l}),d},rl=e=>{let t=iH(e),i=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][void 0===e.autoPad?0:e.autoPad],a=e.dilations,s=e.group??1,n=e.kernelShape,o=e.pads,u=e.strides,l=e.wIsConst();return{autoPad:r,format:i,dilations:a,group:s,kernelShape:n,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:o,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},rd=(e,t,i,r)=>{let a=e.kernelCustomData.wT??e.compute(tn(t[1],[2,3,0,1]),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let s=[t[0],a];3===t.length&&s.push(t[2]),e.compute(rs(s,i,r),{inputs:s})},rp=(e,t)=>{if(((e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length&&3!==e[0].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==i))throw Error("invalid bias");let r=e[0].dims.length-2;if(t.dilations.reduce((e,t)=>e+t,0)>0&&t.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(t.strides.reduce((e,t)=>e+t,0)>0&&t.strides.length!==r)throw Error(`strides should be ${r}D`);if(t.pads.reduce((e,t)=>e+t,0)>0&&t.pads.length!==2*r)throw Error(`pads should be ${2*r}D`);if(t.outputPadding.length!==r&&0!==t.outputPadding.length)throw Error(`output_padding should be ${r}D`);if(t.kernelShape.reduce((e,t)=>e+t,0)>0&&0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape")})(e.inputs,t),3===e.inputs[0].dims.length){let i,r,a,s,n,o,u,l;i="NHWC"===t.format,r=[e.inputs[0].reshape(i?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])],3===e.inputs.length&&r.push(e.inputs[2]),(0===(a=t.kernelShape).length||0===a[0])&&(a=[e.inputs[1].dims[2]]),(0===(s=t.dilations).length||0===s[0])&&(s=[1]),(0===(n=t.strides).length||0===n[0])&&(n=[1]),0===(o=t.pads).length&&(o=[0,0]),o=[0,o[0],0,o[1]],n=[1].concat(n),s=[1].concat(s),a=[1].concat(a),u=[0].concat(u=t.outputPadding),l=ru({...t,pads:o,strides:n,dilations:s,kernelShape:a,outputPadding:u},r),rd(e,r,l,e=>i?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])}else{let i=ru(t,e.inputs);rd(e,e.inputs,i)}}}}),n$=s$({"web/lib/wasm/jsep/webgpu/ops/cumsum.ts"(){"use strict";sQ(),sJ(),s6(),s8(),rc=(e,t)=>{let i,r,a,s,n,o,u=e.inputs[0].dims,l=e.inputs[0].dataType,d=e.inputs[1];e.compute((i=ex.size(u),r=u.length,a=e9("input",l,r),s=te("output",l,r),n=6===d.dataType?d.getInt32Array()[0]:Number(d.getBigInt64Array()[0]),o=ex.normalizeAxis(n,r),{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:u,dataType:l}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:o},...e2(u,u)]}),getShaderSource:e=>{let i=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,n=e5("uniforms.input_shape","uniforms.axis",r),o=t.reverse?i+(t.exclusive?" + 1":""):"0",u=t.reverse?n:i+(t.exclusive?"":" + 1");return`
                ${e.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${o};
                  let last : i32 = ${u};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`}}),{inputs:[0]})},rh=e=>{let t=1===e.exclusive,i=1===e.reverse;return eX({exclusive:t,reverse:i})}}}),nb=s$({"web/lib/wasm/jsep/webgpu/ops/depth-to-space.ts"(){"use strict";sQ(),sJ(),s6(),s8(),rf=(e,t)=>{let i,r,a,s,n,o,u,l,d,p,c,h,f,m;var g,_=e.inputs;if(!_||1!==_.length)throw Error("DepthToSpace requires 1 input.");if(4!==_[0].dims.length)throw Error("DepthToSpace requires 4D input.");e.compute((g=e.inputs[0],u="NHWC"===t.format,l=t.blocksize,d="DCR"===t.mode,u?([i,r,a,s]=g.dims,n=d?[i,r,a,l,l,s/l**2]:[i,r,a,s/l**2,l,l],o=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([i,r,a,s]=[g.dims[0],g.dims[2],g.dims[3],g.dims[1]],n=d?[i,l,l,s/l**2,r,a]:[i,s/l**2,l,l,r,a],o=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]),c=(p=g.reshape(n)).dims.length,h=g.dataType,f=e9("a",h,c),m=te("output",h,c),{name:"DepthToSpace",shaderCache:{hint:`${g.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:e=>{let t=u?[i,r*l,a*l,s/l**2]:[i,s/l**2,r*l,a*l],n=ex.size(t),d=p.dims,c=ex.sortBasedOnPerm(d,o);return{outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...e2(d,c)]}},getShaderSource:e=>`
  ${e.registerUniform("output_size","u32").declareVariables(f,m)}

  ${((e,t,i,r)=>{let a=[];a.push(`fn perm(i: ${r.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`);for(let r=0;r<t;++r)a.push(i.indicesSet("a",e[r],`i[${r}]`));return a.push("return a;}"),a.join("\n")})(o,c,f,m)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",f.getByIndices("aIndices"))}
  }`}))},rm=e=>eX({blocksize:e.blocksize,mode:e.mode,format:e.format})}}),nw=s$({"web/lib/wasm/jsep/webgpu/ops/einsum.ts"(){"use strict";sQ(),sJ(),s6(),s8(),ry="^"+(r_="("+(rg="[a-zA-Z]|\\.\\.\\.")+")+")+"$",r$="^"+("("+r_+",)*")+r_+"$",rb=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let i=this.symbolToIndices.get(e);void 0===i?i=[t]:i.push(t),this.symbolToIndices.set(e,i)}},rw=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[i,r]=t.includes("->")?t.split("->",2):[t,""];if(!i.match(RegExp(r$)))throw Error("Invalid LHS term");if(i.split(",").forEach((t,i)=>{let r=e[i].dims.slice();if(!t.match(RegExp(ry)))throw Error("Invalid LHS term");let a=this.processTerm(t,!0,r,i);this.lhs.push(a)}),""===r)r+=[...this.symbolToInfo.entries()].filter(([e,t])=>1===t.count||"..."===e).map(([e])=>e).join("");else if(!r.match(RegExp(r_)))throw Error("Invalid RHS");let a=r.match(RegExp(rg,"g"));a?.forEach(e=>{if("..."===e)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let t=this.symbolToInfo.get(e);if(void 0===t)throw Error("Invalid RHS symbol");this.outputDims.push(t.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,i){let r=this.symbolToInfo.get(e);if(void 0!==r)if(r.dimValue!==t&&1!==r.count)throw Error("Dimension mismatch");else r.count++,r.inputIndices.push(i);else r={count:1,dimValue:t,inputIndices:[i]};this.symbolToInfo.set(e,r)}processTerm(e,t,i,r=-1){let a=i.length,s=!1,n=[],o=0;if(!e.match(RegExp(ry))&&!t&&""!==e)throw Error("Invalid LHS term");let u=e.match(RegExp(rg,"g")),l=new rb(r);return u?.forEach((e,d)=>{if("..."===e){if(s)throw Error("Only one ellipsis is allowed per input term");s=!0;let e=a-u.length+1;if(e<0)throw Error("Ellipsis out of bounds");if(n=i.slice(o,o+e),this.hasEllipsis){if(this.ellipsisDims.length!==n.length||this.ellipsisDims.toString()!==n.toString())throw Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=n;else throw Error("Ellipsis must be specified in the LHS");for(let e=0;e<n.length;e++){let t=String.fromCharCode(48+e);l.addSymbol(t,d+e),this.addSymbol(t,i[o++],r)}}else l.addSymbol(e,d+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,i[o++],r)}),l}},rv=(e,t)=>{var i;let r,a,s,n,o=new rw(e.inputs,t.equation),u=o.outputDims,l=e.inputs.map((e,t)=>e.dims);e.compute((i=e.inputs[0].dataType,r=l.map(e=>e.length).map((e,t)=>e9(`input${t}`,i,e)),a=ex.size(u),s=te("output",i,u.length),n=[...o.symbolToInfo.keys()].filter(e=>!o.rhs.symbolToIndices.has(e)),{name:"Einsum",shaderCache:{hint:o.equation,inputDependencies:l.map(()=>"rank")},getRunData:()=>{let e=n.filter(e=>o.symbolToInfo.has(e)).map(e=>({type:12,data:o.symbolToInfo.get(e)?.dimValue||0}));e.push({type:12,data:a});let t=l.map((e,t)=>[...e2(e)]).reduce((e,t)=>e.concat(t),e);return t.push(...e2(u)),{outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:t}},getShaderSource:e=>{let t=[],i=[],a=[],u=[],l=[],d=o.symbolToInfo.size===o.rhs.symbolToIndices.size;o.symbolToInfo.forEach((e,n)=>{if(o.rhs.symbolToIndices.has(n)){let i=o.rhs.symbolToIndices.get(n)?.[0];void 0!==i&&o.lhs.forEach((a,o)=>{if(e.inputIndices.includes(o)){let e=a.symbolToIndices.get(n);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{t.push(`${r[o].indicesSet(`input${o}Indices`,e,s.indicesGet("outputIndices",i))}`)})}})}else o.lhs.forEach((t,a)=>{if(e.inputIndices.includes(a)){let e=t.symbolToIndices.get(n);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{i.push(`${r[a].indicesSet(`input${a}Indices`,e,`${n}`)}`)}),l.push(`prod *= ${r[a].getByIndices(`input${a}Indices`)};`)}}),a.push(`for(var ${n}: u32 = 0; ${n} < uniforms.${n+"_max"}; ${n}++) {`),u.push("}")});let p=d?[...t,`let sum = ${r.map((e,t)=>e.getByIndices(`input${t}Indices`)).join(" * ")};`]:[...t,"var sum = 0.0;",...a,...i,"var prod = 1.0;",...l,"sum += prod;",...u];return`
            ${e.registerUniforms(n.map(e=>({name:`${e+"_max"}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...r,s)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${r.map((e,t)=>`var input${t}Indices: ${r[t].type.indices};`).join("\n")}
            ${p.join("\n")};
            ${s.setByOffset("global_idx","sum")};
          }`}}))},rx=e=>{let t=e.equation.replace(/\s+/g,"");return eX({equation:t})}}}),nv=s$({"web/lib/wasm/jsep/webgpu/ops/expand.ts"(){"use strict";sQ(),sJ(),s8(),rk=(e,t)=>{let i=e.length-t.length,r=[];for(let t=0;t<i;++t)r.push(e[t]);for(let a=0;a<t.length;++a)r.push(1===t[a]?e[a+i]:t[a]);return r},rS=e=>{var t;let i,r,a,s,n,o,u,l,d;(e=>{if(!e||2!==e.length)throw Error("Expand requires 2 input.");let t=e[0].dims,i=Array.from(e[1].getBigInt64Array(),Number),r=i.length<t.length?0:i.length-t.length,a=t.length<i.length?0:t.length-i.length;for(;r<i.length&&a<t.length;++r,++a)if(i[r]!==t[a]&&1!==i[r]&&1!==t[a])throw Error("Expand requires shape to be broadcastable to input")})(e.inputs),e.compute((i=(t=e.inputs)[0].dims,r=Array.from(t[1].getBigInt64Array(),Number),a=i.length>r.length?rk(i,r):rk(r,i),n=9===(s=t[0].dataType)||1===ex.size(i),o=9===s||i.length>0&&i[i.length-1]%4==0?4:1,u=n||a.length>0&&a[a.length-1]%4==0?4:1,d=[{type:12,data:l=Math.ceil(ex.size(a)/u)},...e2(i,a)],{name:"Expand",shaderCache:{hint:`${a.length};${o}${u}`,inputDependencies:["rank"]},getShaderSource:e=>{let t,r=e9("input",s,i.length,o),n=te("output",s,a.length,u);if(9===s){let e=(e,t,i="")=>`
          let outputIndices${t} = ${n.offsetToIndices(`outputOffset + ${t}u`)};
          let offset${t} = ${r.broadcastedIndicesToOffset(`outputIndices${t}`,n)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${i}(${r.getByOffset(`index${t}`)}[component${t}]);
        `;t=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${e("data",0,"u32")}
        ${e("data",1,"u32")}
        ${e("data",2,"u32")}
        ${e("data",3,"u32")}
        ${n.setByOffset("global_idx","data")}
      }`}else t=`
        let outputIndices = ${n.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${r.broadcastedIndicesToOffset("outputIndices",n)};
        let data = ${n.type.value}(${r.getByOffset(`inputOffset / ${o}`)});
        ${n.setByOffset("global_idx","data")}
      }`;return`
    ${e.registerUniform("vec_size","u32").declareVariables(r,n)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${t}`},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d})}),{inputs:[0]})}}}),nx=s$({"web/lib/wasm/jsep/webgpu/ops/fast-gelu.ts"(){"use strict";sQ(),sJ(),s8(),na(),rI=e=>{if(e.inputs.length<2||0===ex.size(e.inputs[1].dims))ik(e);else{var t;let i,r,a,s;e.compute((i=(t=e.inputs)[0].dataType,r=ex.size(t[0].dims),s=(a=ex.size(t[1].dims))%4==0,{name:"FastGeluWithBias",shaderCache:{hint:`${s}`,inputDependencies:["type","type"]},getShaderSource:e=>{let t=e9("x",i,[1],4),r=e9("bias",i,[1],4),a=te("y",i,[1],4),n=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${r.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,o=s?`
      let bias = ${r.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${n(0)}${n(1)}${n(2)}${n(3)}
      let bias = ${t.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms([{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}]).declareVariables(t,r,a)}

    ${iv(e1(i))}

    ${e.mainStart(eY)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${t.getByOffset("global_idx")};
      ${o}
      let x_in = x + bias;
      ${a.setByOffset("global_idx",ix("x_in"))}
    }`},getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:a}],dispatchGroup:{x:Math.ceil(r/eY/4)}})}))}}}}),nk=s$({"web/lib/wasm/jsep/webgpu/ops/gather.ts"(){"use strict";sQ(),sJ(),s6(),s8(),rT=e=>eX({axis:e.axis}),rE=(e,t)=>{let i,r,a,s,n,o,u,l,d;var p,c=e.inputs;if(!c||2!==c.length)throw Error("Gather requires 2 inputs.");e.compute((p=e.inputs,i=p[0].dims,r=p[1].dims,a=i.length,s=ex.normalizeAxis(t.axis,a),(n=i.slice(0)).splice(s,1,...r),o=i[s],u=9===p[0].dataType?4:1,d=[{type:12,data:l=Math.ceil(ex.size(n)/u)},{type:6,data:o},{type:12,data:s},...e2(p[0].dims,p[1].dims,n)],{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:e=>{let t,i=e9("data",p[0].dataType,p[0].dims.length,u),o=e9("inputIndices",p[1].dataType,p[1].dims.length),l=te("output",p[0].dataType,n.length,u),d=e=>{let t=r.length,u=`var indicesIndices${e}  = ${o.type.indices}(0);`;for(let i=0;i<t;i++)u+=`${t>1?`indicesIndices${e}[${i}]`:`indicesIndices${e}`} = ${n.length>1?`outputIndices${e}[uniforms.axis + ${i}]`:`outputIndices${e}`};`;u+=`
          var idx${e} = ${o.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${i.type.indices};
        `;for(let i=0,r=0;i<a;i++)i===s?(u+=`${a>1?`dataIndices${e}[${i}]`:`dataIndices${e}`} = u32(idx${e});`,r+=t):(u+=`${a>1?`dataIndices${e}[${i}]`:`dataIndices${e}`} = ${n.length>1?`outputIndices${e}[${r}]`:`outputIndices${e}`};`,r++);return u};if(9===p[0].dataType){let e=(e,t,r="")=>`
          let outputIndices${t} = ${l.offsetToIndices(`outputOffset + ${t}u`)};
          ${d(t)};
          let offset${t} = ${i.indicesToOffset(`dataIndices${t}`)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${r}(${i.getByOffset(`index${t}`)}[component${t}]);
        `;t=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${e("value",0,"u32")}
        ${e("value",1,"u32")}
        ${e("value",2,"u32")}
        ${e("value",3,"u32")}
        ${l.setByOffset("global_idx","value")}
      `}else t=`
      let outputIndices = ${l.offsetToIndices("global_idx")};
      ${d("")};
      let value = ${i.getByIndices("dataIndices")};
      ${l.setByOffset("global_idx","value")};
      `;return`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(i,o,l)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${t}
      }`}}))}}}),nS=s$({"web/lib/wasm/jsep/webgpu/ops/gather-nd.ts"(){"use strict";sQ(),sJ(),s8(),rz=(e,t)=>{var i,r;let a,s,n=e.inputs,o=n[0].dims,u=n[0].dataType,l=n[1].dims,d=l[l.length-1],p=ex.sizeToDimension(l,l.length-1),c=ex.sizeFromDimension(o,t.batchDims+d),h=ex.sizeToDimension(o,t.batchDims),f=ex.sizeFromDimension(o,t.batchDims),m=Array(d),g=c;for(let e=0;e<d;++e)m[d-1-e]=g,g*=o[t.batchDims+d-1-e];let _=(i=n[1],r=t.batchDims,a=[{type:12,data:p},{type:12,data:r},{type:12,data:o},{type:12,data:m},{type:12,data:p/h},{type:12,data:f},{type:12,data:d}],s=[p],a.push(...e2(i.dims,s)),e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${m.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:a}),getShaderSource:e=>{let t=e9("indices_data",i.dataType,i.dims.length),r=te("input_slice_offsets_data",12,1,1),a=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:m.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${e.registerUniforms(a).declareVariables(t,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${1===o.length?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${1===m.length?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[i],outputs:[-1]})[0]),y=t.batchDims+d;if(y>o.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let $=l.slice(0,-1).concat(o.slice(y)),b=ex.size($),w=[{type:12,data:b},{type:12,data:c},...e2(n[0].dims,_.dims,$)];e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:$,dataType:u}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:w}),getShaderSource:e=>{let t=e9("data",n[0].dataType,n[0].dims.length),i=e9("slice_offsets",12,_.dims.length),r=te("output",n[0].dataType,$.length);return`
          ${e.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(t,i,r)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[n[0],_]})},rC=e=>({batchDims:e.batch_dims,cacheKey:""})}}),nI=s$({"web/lib/wasm/jsep/webgpu/ops/gather-block-quantized.ts"(){"use strict";sQ(),sJ(),s6(),s8(),rO=(e,t)=>{var i;let r,a,s,n,o,u,l,d,p,c;((e,t)=>{if(e.length<3||e.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let i=ex.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,a=e[0],s=e[2],n=4===e.length?e[3]:void 0;if(s.dims.length!==a.dims.length||!a.dims.map((e,t)=>t===i?Math.ceil(e/r)===s.dims[t]:e===s.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(n){if(n.dataType!==a.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(n.dims.length!==s.dims.length||!n.dims.map((e,t)=>e===s.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}})(e.inputs,t),e.compute((i=e.inputs,r=i[0].dims,a=i[1].dims,s=r.length,n=ex.normalizeAxis(t.gatherAxis,s),o=ex.normalizeAxis(t.quantizeAxis,s),(u=r.slice(0)).splice(n,1,...a),l=ex.size(u),d=i[2].dataType,p=22===i[0].dataType,c=[{type:12,data:l},{type:12,data:o},{type:12,data:n},{type:12,data:t.blockSize},...e2(...i.map((e,t)=>e.dims),u)],{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${i.filter((e,t)=>1!==t).map(e=>e.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:i.length},(e,t)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:e=>{let t=e9("data",i[0].dataType,i[0].dims.length),s=e9("inputIndices",i[1].dataType,i[1].dims.length),o=e9("scales",i[2].dataType,i[2].dims.length),l=i.length>3?e9("zeroPoint",i[3].dataType,i[3].dims.length):void 0,c=te("output",d,u.length),h=[t,s,o];return l&&h.push(l),`
        ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...h,c)}
        ${e.mainStart()}
        let output_indices = ${c.offsetToIndices("global_idx")};
        var indices_indices = ${s.type.indices}(0);
        ${a.length>1?`
          for (var i: u32 = 0; i < ${a.length}; i++) {
            let index = ${c.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${s.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${c.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${t.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${c.indicesGet("output_indices","i")};
          ${t.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${s.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[n]};
        }
        ${t.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${c.indicesGet("output_indices",`i + ${a.length} - 1`)};
          ${t.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${t.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${t.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${o.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${o.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${o.getByIndices("scale_indices")};
        ${!l?"var zero_point = 0":`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${l.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${l.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`};
        let dequantized_data = ${e1(d)}(quantized_data - zero_point) * scale;
        ${c.setByOffset("global_idx","dequantized_data")};
    }`}}))},rB=e=>eX({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}}),nT=s$({"web/lib/wasm/jsep/webgpu/ops/gather-elements.ts"(){"use strict";sQ(),sJ(),s6(),s8(),rA=e=>eX({axis:e.axis}),rR=(e,t)=>{let i,r,a,s,n,o,u,l,d,p,c,h,f;var m,g=e.inputs;if(!g||2!==g.length)throw Error("GatherElements requires 2 inputs.");if(g[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(g[0].dims.length!==g[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`);e.compute((m=e.inputs,i=m[0].dims,r=m[0].dataType,a=i.length,s=m[1].dims,n=m[1].dataType,u=i[o=ex.normalizeAxis(t.axis,a)],l=s.slice(0),d=ex.size(l),p=e9("input",r,a),c=e9("indicesInput",n,s.length),h=te("output",r,l.length),(f=[{type:12,data:d},{type:6,data:u},{type:12,data:o}]).push(...e2(i,s,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:m[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:e=>`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,c,h)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${h.offsetToIndices("global_idx")};

      var idx = ${c.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${h.setByOffset("global_idx","value")};
  }`}))}}}),nE=s$({"web/lib/wasm/jsep/webgpu/ops/gemm.ts"(){"use strict";sQ(),sJ(),s8(),rM=e=>{let t=e.transA,i=e.transB;return{transA:t,transB:i,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${1===e.alpha}`}},rD=(e,t)=>{var i=e.inputs;if(!i)throw Error("Input is missing");if(i.length<2||i.length>3)throw Error("Invaid input number.");if(3===i.length&&i[2].dims.length>2)throw Error("Invalid input shape of C");if(i[0].dataType!==i[1].dataType||3===i.length&&i[0].dataType!==i[2].dataType)throw Error("Input types are mismatched");e.compute(((e,t)=>{let i=e[0].dims.slice(),r=e[1].dims.slice(),[a,s,n]=eS.getShapeOfGemmResult(i,t.transA,r,t.transB,3===e.length?e[2].dims:void 0),o=[a,s];if(!o)throw Error("Can't use gemm on the given tensors");let u=Math.ceil(s/16),l=Math.ceil(a/16),d=(ex.size(o),[{type:12,data:u},{type:12,data:a},{type:12,data:s},{type:12,data:n},{type:1,data:t.alpha},{type:1,data:t.beta}]),p=["type","type"];return 3===e.length&&(d.push(...e2(e[2].dims)),p.push("rank")),d.push(...e2(o)),{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:u*l},programUniforms:d}),getShaderSource:i=>{let r=e9("a",e[0].dataType,e[0].dims),a=e9("b",e[1].dataType,e[1].dims),s=null,n=[r,a];3===e.length&&(s=e9("c",e[2].dataType,e[2].dims.length),n.push(s));let u=te("output",e[0].dataType,o.length);n.push(u);let l="",d="";t.transA&&t.transB?(d=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${a.type.value}(0);
      }
      `,l="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(d=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${a.type.value}(0);
      }
      `,l="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(d=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${a.type.value}(0);
      }
      `,l="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):t.transA||t.transB||(d=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${a.type.value}(0);
      }
      `,l="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let p=1===t.alpha?"":"value *= uniforms.alpha;";return`
  ${i.registerUniforms([{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}]).declareVariables(...n)}
  var<workgroup> tile_a: array<array<${r.type.storage}, 16>, 16>;
  var<workgroup> tile_b: array<array<${a.type.storage}, 16>, 16>;
  ${i.mainStart([16,16,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * 16;
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * 16;
    let num_tiles = (uniforms.K - 1) / 16 + 1;
    var k_start = 0u;
    var value = ${u.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${d}
      k_start = k_start + 16;
      workgroupBarrier();

      for (var k: u32 = 0u; k < 16; k++) {
        ${l}
      }
      workgroupBarrier();
    }

    ${p}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${null!=s?`let cOffset = ${s.broadcastedIndicesToOffset("vec2(m, n)",u)}; value += ${u.type.value}(uniforms.beta) * ${s.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}}})(e.inputs,t))}}}),nz=s$({"web/lib/wasm/jsep/webgpu/ops/grid-sample.ts"(){"use strict";sQ(),sJ(),s6(),s8(),[rP,rq,rN,rU]=[0,1,2,3],rV=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,rL=(e,t)=>{let i,r,a,s,n,o,u;var l,d=e.inputs;if(4!==d[0].dims.length)throw Error("only 4-D tensor is supported.");if(d[0].dims.length!==d[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(d[0].dims.length-2!==d[1].dims[d[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${d[0].dims.length-2}`);if(d[0].dims[0]!==d[1].dims[0])throw Error("grid batch size must match input batch size");e.compute((l=e.inputs,i=e9("x",l[0].dataType,l[0].dims.length),r=[l[1].dims[0],l[1].dims[1],l[1].dims[2]],a=e9("grid",l[1].dataType,r.length,2),s=[l[0].dims[0],l[0].dims[1],l[1].dims[1],l[1].dims[2]],"NHWC"===t.format&&(s=[l[0].dims[0],l[1].dims[1],l[1].dims[2],l[0].dims[3]],[rP,rq,rN,rU]=[0,3,1,2]),n=te("output",l[0].dataType,s.length),o=i.type.value,u=[{type:12,data:ex.size(s)},...e2(l[0].dims,r,s)],{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:e=>{let t=ex.size(s);return{outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:u}},getShaderSource:e=>`
  ${e.registerUniform("output_size","u32").declareVariables(i,a,n)}
  ${rV}
  
  fn gs_bicubic_interpolate(p: mat4x4<${o}>, x: f32, y: f32) -> ${o} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${o}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }

  
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${0===t.alignCorners?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }

  
  ${"reflection"===t.paddingMode?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}

  ${`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${o} {
     var pixel = ${o}(0);
     var indices = vec4<u32>(0);
     indices[${rP}] = batch;
     indices[${rq}] = channel;`+(()=>{switch(t.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${rN}] = u32(r);
            indices[${rU}] = u32(c);
          } else {
            return ${o}(0);
          }
        `;case"border":return`
          indices[${rN}] = u32(clamp(r, 0, H - 1));
          indices[${rU}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${rN}] = gs_reflect(r, border[1], border[3]);
          indices[${rU}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${t.paddingMode} is not supported`)}})()+`
    return ${i.getByIndices("indices")};
  }
`}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${rN}]);
      let W_in = i32(uniforms.x_shape[${rU}]);

      ${0===t.alignCorners?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${n.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${rP}], indices[${rN}], indices[${rU}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${(()=>{switch(t.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${rP}], indices[${rq}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${rP}], indices[${rq}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${rP}], indices[${rq}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${rP}], indices[${rq}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${rP}], indices[${rq}], border);

          let dx2 = ${o}(f32(x2) - x);
          let dx1 = ${o}(x - f32(x1));
          let dy2 = ${o}(f32(y2) - y);
          let dy1 = ${o}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${o}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${rP}], indices[${rq}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${t.mode} is not supported`)}})()+`${n.setByOffset("global_idx","result")}`}
  }`}))},rG=e=>eX({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}}),nC=s$({"web/lib/wasm/jsep/webgpu/ops/multihead-attention.ts"(){"use strict";sQ(),sJ(),s6(),s3(),nt(),s8(),s5(),rW=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,rj=e=>eX({...e}),rH=eX({perm:[0,2,1,3]}),rF=(e,t,i,r,a,s,n,o)=>{let u=s;if(n&&ex.size(n.dims)>0)if(1===r)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");else{var l;let d,p,c;return(d=[t,r,l=i*a],c=[{type:12,data:p=ex.size(d)},{type:12,data:o},{type:12,data:l}],u=(u=e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:d,dataType:s.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:e=>{let t=te("qkv_with_bias",s.dataType,d),i=e9("qkv",s.dataType,d),r=e9("bias",n.dataType,d);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}]).declareVariables(i,r,t)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[s,n],outputs:[-1]})[0]).reshape([t,r,i,a]),1===i||1===r)?u:e.compute(tn(u,rH.perm),{inputs:[u],outputs:[-1]})[0]}return(3===s.dims.length&&(u=s.reshape([t,r,i,a])),1===i||1===r)?u:e.compute(tn(u,rH.perm),{inputs:[u],outputs:[-1]})[0]},rK=(e,t)=>{let i=((e,t)=>{let i,r=e[0],a=rW(e,1),s=rW(e,2),n=rW(e,3),o=rW(e,4),u=rW(e,5),l=rW(e,6),d=rW(e,7);if(3!==r.dims.length&&5!==r.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let p=r.dims[0],c=r.dims[1],h=3===r.dims.length?r.dims[2]:t.numHeads*r.dims[4],f=c,m=0,g=0,_=Math.floor(h/t.numHeads);if(l&&d&&ex.size(l.dims)&&ex.size(d.dims)){if(4!==l.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==p||l.dims[1]!==t.numHeads||l.dims[3]!==_)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==_)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==d.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');m=l.dims[2],g=l.dims[2]}else if(l&&ex.size(l.dims)||d&&ex.size(d.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(a&&ex.size(a.dims)>0){if(3!==r.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==a.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===a.dims.length){if(a.dims[2]!==r.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');i=2,f=a.dims[1]}else if(5===a.dims.length){if(a.dims[2]!==t.numHeads||2!==a.dims[3]||a.dims[4]!==_)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw Error('Expect "value" be none when "key" has packed kv format.');i=5,f=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==_)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');i=0,f=a.dims[2]}}else{if(5!==r.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||3!==r.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');i=3}if(n&&ex.size(n.dims)>0){if(1!==n.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(a&&5===a.dims.length&&2===a.dims[3])throw Error("bias is not allowed for packed kv.")}let y=m+f,$=0;if(o&&ex.size(o.dims)>0){$=8;let e=o.dims;if(1===e.length?e[0]===p?$=1:e[0]===3*p+2&&($=3):2===e.length&&e[0]===p&&e[1]===y&&($=5),8===$)throw Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)');throw Error("Mask not supported")}let b=!1,w=h;if(s&&ex.size(s.dims)>0){if(3!==s.dims.length&&4!==s.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==s.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===s.dims.length){if(f!==s.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');w=s.dims[2]}else{if(f!==s.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');w=s.dims[1]*s.dims[3],b=!0}}if(o&&ex.size(o.dims)>0)throw Error("Key padding mask is not supported");if(u&&ex.size(u.dims)>0){if(4!==u.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==y)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:c,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:y,maxSequenceLength:g,inputHiddenSize:0,hiddenSize:h,vHiddenSize:w,headSize:_,vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:b,qkvFormat:i}})(e.inputs,t),r=e.inputs[0],a=rW(e.inputs,1),s=rW(e.inputs,2),n=rW(e.inputs,3),o=rW(e.inputs,4),u=rW(e.inputs,5),l=rW(e.inputs,6),d=rW(e.inputs,7);if(5===r.dims.length)throw Error("Packed QKV is not implemented");if(a?.dims.length===5)throw Error("Packed KV is not implemented");let p=a&&s&&4===a.dims.length&&4===s.dims.length,c=rF(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,r,n,0);if(p)return tj(e,c,a,s,o,void 0,l,d,u,i);if(!a||!s)throw Error("key and value must be provided");let h=rF(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.headSize,a,n,i.hiddenSize),f=rF(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.vHeadSize,s,n,2*i.hiddenSize);tj(e,c,h,f,o,void 0,l,d,u,i)}}}),nO=s$({"web/lib/wasm/jsep/webgpu/ops/split.ts"(){"use strict";sQ(),sJ(),s6(),s8(),rZ=(e,t)=>{let i=e[0].dims,r=ex.size(i),a=e[0].dataType,s=ex.normalizeAxis(t.axis,i.length),n=Array(t.numOutputs),o=e9("input",a,i.length),u=Array(t.numOutputs),l=[],d=[],p=0,c=[{type:12,data:r}];for(let r=0;r<t.numOutputs;r++){p+=t.splitSizes[r],u[r]=p;let o=i.slice();o[s]=t.splitSizes[r],d.push(o),n[r]=te(`output${r}`,a,o.length),l.push({dims:d[r],dataType:e[0].dataType})}return c.push({type:12,data:u},...e2(i,...d)),{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:e=>{let t;return`
  ${e.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(o,...n)}
  ${t=u.length,`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${t}u; i += 1u ) {
    if (index < ${e5("uniforms.size_in_split_axis","i",t)}) {
        return i;
    }
    }
    return ${t}u;
}`}
  ${(e=>{let t=e.length,i=[];for(let r=0;r<t;++r){let a=e[r].setByIndices("indices","input[global_idx]");1===t?i.push(a):0===r?i.push(`if (output_number == ${r}u) { ${a} }`):r===t-1?i.push(`else { ${a} }`):i.push(`else if (output_number == ${r}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${i.join("\n")}
      }`})(n)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${e5("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${o.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`},getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:c})}},rQ=(e,t)=>{let i,r;var a,s=e.inputs;if(!s||s.length<1)throw Error("too few inputs");let n=1===e.inputs.length?t:(a=e.inputs,i=[],r=t.numOutputs,a[1].dims[0]>0&&(a[1].getBigInt64Array().forEach(e=>i.push(Number(e))),r=i.length),eX({numOutputs:r,axis:t.axis,splitSizes:i}));e.compute(rZ(e.inputs,n),{inputs:[0]})},rX=e=>{let t=e.axis,i=e.splitSizes,r=e.numOutputs<0?i.length:e.numOutputs;if(r!==i.length)throw Error("numOutputs and splitSizes length must be equal");return eX({axis:t,numOutputs:r,splitSizes:i})}}}),nB=s$({"web/lib/wasm/jsep/webgpu/ops/rotary-embedding.ts"(){"use strict";sQ(),sJ(),s6(),s8(),rY=(e,t)=>{let{interleaved:i,numHeads:r,rotaryEmbeddingDim:a,scale:s}=t,n=e[0].dims[0],o=ex.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],l=o/u,d=e[2].dims[1],p=0===a?2*d:l/r,c=[n,u,l/p,p-d],h=ex.computeStrides(c),f=[{type:1,data:s},{type:12,data:c},{type:12,data:h},...3===e[0].dims.length?Array({type:12,data:[o,l,p,1]}):[],...4===e[0].dims.length?Array({type:12,data:[o,p,u*p,1]}):[],...e2(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)];return{name:"RotaryEmbedding",shaderCache:{hint:eX({interleaved:i}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:t=>{let r=e9("input",e[0].dataType,e[0].dims.length),a=e9("position_ids",e[1].dataType,e[1].dims.length),s=e9("cos_cache",e[2].dataType,e[2].dims.length),n=e9("sin_cache",e[3].dataType,e[3].dims.length),o=te("output",e[0].dataType,e[0].dims.length);return t.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:c.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${t.declareVariables(r,a,s,n,o)}

        ${t.mainStart(eY)}
          let half_rotary_emb_dim = uniforms.${s.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${a.broadcastedIndicesToOffset("bsnh.xy",te("",a.type.tensor,2))};
            let position_id =
                u32(${a.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${i});
            let j = i + select(half_rotary_emb_dim, 1, ${i});
            let re = ${r.getByOffset("i")} * ${s.get("position_id","bsnh[3]")} -
                ${r.getByOffset("j")} * ${n.get("position_id","bsnh[3]")};
            ${o.setByOffset("i","re")}
            let im = ${r.getByOffset("i")} * ${n.get("position_id","bsnh[3]")} +
                ${r.getByOffset("j")} * ${s.get("position_id","bsnh[3]")};
            ${o.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${o.setByOffset("k",r.getByOffset("k"))}
          }
        }`},getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(ex.size(c)/eY)},programUniforms:f})}},rJ=(e,t)=>{((e,t)=>{let[i,r,a,s]=e,{numHeads:n,rotaryEmbeddingDim:o}=t;if(3!==i.dims.length&&4!==i.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${i.dims.length}`);if(!ex.areEqual(r.dims,[])&&!ex.areEqual(r.dims,[1])&&2!==r.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(2!==a.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(2!==s.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!ex.areEqual(a.dims,s.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&0===n)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let u=i.dims[0],l=i.dims[i.dims.length-2],d=a.dims[0],p=ex.sizeFromDimension(i.dims,1)/l,c=0===o?2*a.dims[1]:p/n;if(o>c)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===r.dims.length){if(u!==r.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(l!==r.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(c/2!==a.dims[1]&&o/2!==a.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(l>d)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")})(e.inputs,t),e.compute(rY(e.inputs,t))}}}),nA=s$({"web/lib/wasm/jsep/webgpu/ops/group-query-attention.ts"(){"use strict";s6(),sQ(),nt(),nC(),nO(),s5(),nB(),s8(),r0=eX({perm:[0,2,1,3]}),r1=(e,t,i)=>{let r=t,a=i.kvNumHeads;return 3===t.dims.length&&0!==i.kvSequenceLength&&(r=t.reshape([i.batchSize,i.kvSequenceLength,a,i.headSize]),r=e.compute(tn(r,r0.perm),{inputs:[r],outputs:[-1]})[0]),r},r2=(e,t)=>{let i,r,a=((e,t)=>{if(t.doRotary&&e.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let i=e[0],r=e[1],a=e[2],s=e[3],n=e[4];if(0!==t.doRotary&&e.length<=7)throw Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(-1!==t.localWindowSize)throw Error("Local attention is not supported");if(0!==t.softcap)throw Error("Softcap is not supported");if(0!==t.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==i.dims.length&&5!==i.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let o=i.dims[0],u=i.dims[1],l=3===i.dims.length?i.dims[2]:t.numHeads*i.dims[4],d=u,p=0,c=!r||0===r.dims.length,h=c?Math.floor(l/(t.numHeads+2*t.kvNumHeads)):Math.floor(l/t.numHeads);c&&(l=h*t.numHeads);let f=s&&0!==s.dims.length,m=n&&0!==n.dims.length;if(f&&4===s.dims.length&&s.dims[0]===o&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===h)throw Error("BSNH pastKey/pastValue is not supported");if(f&&m){if(4!==s.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==n.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');p=s.dims[2]}else if(f||m)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let g=1;if(r&&r.dims.length>0){if(3!==i.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==r.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===r.dims.length){if(i.dims[2]%r.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');d=r.dims[1]}else if(5===r.dims.length){if(r.dims[2]!==t.numHeads||2!==r.dims[3]||r.dims[4]!==h)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw Error('Expect "value" be none when "key" has packed kv format.');d=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==h)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');d=r.dims[2]}}else{if(3!==i.dims.length&&5!==i.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===i.dims.length&&(i.dims[2]!==t.numHeads||3!==i.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let _=!1,y=t.kvNumHeads?h*t.kvNumHeads:l;if(a&&a.dims.length>0){if(3!==a.dims.length&&4!==a.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==a.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===a.dims.length){if(d!==a.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');y=a.dims[2]}else{if(d!==a.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');y=a.dims[1]*a.dims[3],_=!0}}let $=e.length>4?e[5]:void 0;if($&&1!==$.dims.length&&$.dims[0]!==o)throw Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:o,sequenceLength:u,pastSequenceLength:p,kvSequenceLength:d,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:l,vHiddenSize:y,headSize:h,vHeadSize:Math.floor(y/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:_,qkvFormat:g}})(e.inputs,t);if(5===e.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let s=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,o=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,u=e.inputs[3]&&0!==e.inputs[3].dims.length?e.inputs[3]:void 0,l=e.inputs[4]&&0!==e.inputs[4].dims.length?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,c=a.kvNumHeads?a.kvNumHeads:a.numHeads,h=eX({axis:2,numOutputs:3,splitSizes:[a.numHeads*a.headSize,c*a.headSize,c*a.headSize]}),[f,m,g]=n||o?[s,n,o]:e.compute(rZ([s],h),{inputs:[s],outputs:[-1,-1,-1]});if(t.doRotary){var _,y;let s,n,o,u=e.compute((_=a.batchSize,y=a.sequenceLength,s=[_*y],o=[{type:12,data:n=_*y},{type:12,data:y},{type:12,data:_}],{name:"GeneratePositionIds",shaderCache:{hint:`${_};${y}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:7}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:o}),getShaderSource:e=>{let t=e9("seq_lens",d.dataType,d.dims),i=e9("total_seq_lens",p.dataType,p.dims),r=te("pos_ids",7,s);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}]).declareVariables(t,i,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${i.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${t.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${r.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${r.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${r.setByOffset("global_idx","seqlen")}
    };
  }
  `}}),{inputs:[d,p],outputs:[-1]})[0],l=e.inputs[7],c=e.inputs[8],h=eX({interleaved:0!==t.rotaryInterleaved,numHeads:a.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),g=[f,u,l,c],$=[-1];i=e.compute(rY(g,h),{inputs:g,outputs:$})[0],g.splice(0,1,m);let b=eX({interleaved:0!==t.rotaryInterleaved,numHeads:a.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});r=e.compute(rY(g,b),{inputs:g,outputs:$})[0]}let $=rF(e,a.batchSize,a.numHeads,a.sequenceLength,a.headSize,t.doRotary?i:f,void 0,0),b=r1(e,t.doRotary?r:m,a),w=r1(e,g,a);tj(e,$,b,w,void 0,void 0,u,l,void 0,a,d,p)}}}),nR=s$({"web/lib/wasm/jsep/webgpu/ops/instance-norm.ts"(){"use strict";sQ(),sJ(),s5(),s8(),r3=(e,t,i,r,a,s,n,o)=>{let u=e3(s),l=1===u?"f32":`vec${u}f`,d=1===u?"vec2f":`mat2x${u}f`,p=a*n,c=64;1===p&&(c=256);let h=[a,n,s/u],f=[a,n,2],m=[];return m.push(...e2(h,f)),e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${o};${c}`,inputDependencies:["rank","type","type"]},getRunData:()=>({outputs:[{dims:f,dataType:1}],dispatchGroup:{x:p},programUniforms:m}),getShaderSource:e=>{let a=e9("x",t.dataType,3,u),s=[a,e9("scale",i.dataType,i.dims),e9("bias",r.dataType,r.dims),te("output",1,3,2)];return`
  var<workgroup> workgroup_shared : array<${d}, ${c}>;
  const workgroup_size = ${c}u;
  ${e.declareVariables(...s)}
  ${e.mainStart(c)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${a.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${d}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${e8("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${e8("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[t,i,r],outputs:[-1]})[0]},r4=(e,t)=>{if("NHWC"===t.format)((e,t,i)=>{let r=t[0].dims,a=r[0],s=r[r.length-1],n=ex.sizeFromDimension(r,1)/s,o=e3(s),u=ex.size(r)/o,l=[{type:12,data:n},{type:12,data:Math.floor(s/o)}],d=!1,p=[0,r.length-1];for(let e=0;e<r.length-2;e++)d=d||1!==r[e+1],p.push(e+1);let c=(d=d&&1!==r[r.length-1])?e.compute(tn(e.inputs[0],p),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(e,t)=>r[p[t]])),h=r3(e,c,t[1],t[2],a,n,s,i.epsilon);e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:e=>{let i=e0(t[0].dataType),a=1===o?"vec2f":`mat${o}x2f`,s=e=>{let t=0===e?"x":"y",r=1===o?"f32":`vec${o}f`;switch(o){case 1:return`${i}(${r}(scale.${t}))`;case 2:return`vec2<${i}>(${r}(scale[0].${t}, scale[1].${t}))`;case 4:return`vec4<${i}>(${r}(scale[0].${t}, scale[1].${t}, scale[2].${t}, scale[3].${t}))`;default:throw Error(`Not supported compoents ${o}`)}},n=e9("input",t[0].dataType,t[0].dims,o),u=te("output",t[0].dataType,r,o);return`
  @group(0) @binding(0) var<storage, read> input : array<${n.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${a}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${u.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${e.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${s(0)}, ${s(1)});
  }`}},{inputs:[t[0],h]})})(e,e.inputs,t);else{var i;let r,a,s,n,o,u,l,d,p;i=e.inputs,a=(r=i[0].dims)[0],s=r[1],n=ex.sizeFromDimension(r,2),o=e3(n),u=ex.size(r)/o,l=r3(e,i[0],i[1],i[2],a,n,s,t.epsilon),d=[a,s,n/o],p=[a,s],e.compute({name:"InstanceNormalization",shaderCache:{hint:`${o}`,inputDependencies:["type","none"]},getRunData:()=>({outputs:[{dims:r,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:[{type:12,data:u},...e2(d,p,d)]}),getShaderSource:e=>{let t=e9("x",i[0].dataType,d.length,o),r=e9("scale_shift",1,p.length,2),a=te("output",i[0].dataType,d.length,o),s=[t,r,a];return`
  ${e.registerUniform("output_size","u32").declareVariables(...s)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${a.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${r.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${t.getByOffset("global_idx")} * ${a.type.value}(scale_shift.x) + ${a.type.value}(scale_shift.y);
      ${a.setByOffset("global_idx","value")};
  }`}},{inputs:[i[0],l]})}}}}),nM=s$({"web/lib/wasm/jsep/webgpu/ops/layer-norm.ts"(){"use strict";sQ(),sJ(),s8(),r6=(e,t)=>{var i=e.inputs;if(!i||i.length<2)throw Error("layerNorm requires at least 2 inputs.");e.compute(((e,t,i)=>{let r=t.simplified,a=e[0].dims,s=e[1],n=!r&&e[2],o=ex.normalizeAxis(t.axis,a.length),u=ex.sizeToDimension(a,o),l=ex.sizeFromDimension(a,o),d=ex.size(s.dims),p=n?ex.size(n.dims):0;if(d!==l||n&&p!==l)throw Error(`Size of X.shape()[axis:] == ${l}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${d} and bias size of ${p}`);let c=[];for(let e=0;e<a.length;++e)e<o?c.push(a[e]):c.push(1);let h=e3(l),f=["type","type"],m=[{type:12,data:u},{type:1,data:l},{type:12,data:Math.floor(l/h)},{type:1,data:t.epsilon}];n&&f.push("type");let g=i>1,_=i>2,y=[{dims:a,dataType:e[0].dataType}];return g&&y.push({dims:c,dataType:1}),_&&y.push({dims:c,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${h};${i};${r}`,inputDependencies:f},getRunData:()=>({outputs:y,dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:t=>{let i=e0(e[0].dataType),o=[e9("x",e[0].dataType,e[0].dims,h),e9("scale",s.dataType,s.dims,h)];return n&&o.push(e9("bias",n.dataType,n.dims,h)),o.push(te("output",e[0].dataType,a,h)),g&&o.push(te("mean_data_output",1,c)),_&&o.push(te("inv_std_output",1,c)),`
  ${t.registerUniforms([{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...o)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${e4("f32",h)};
    var mean_square_vector = ${e4("f32",h)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${e6(i,h,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${e8("mean_vector",h)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${e8("mean_square_vector",h)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${e6(i,h,"x[j + offset]")};
      let f32scale = ${e6(i,h,"scale[j]")};
      output[j + offset] = ${o[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${n?`+ ${e6(i,h,"bias[j]")}`:""}
      );
    }

    ${g?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`}}})(e.inputs,t,e.outputCount))}}}),nD=s$({"web/lib/wasm/jsep/webgpu/ops/matmul.ts"(){"use strict";sJ(),np(),nc(),r8=e=>{var t=e.inputs;if(!t||2!==t.length)throw Error("MatMul requires 2 inputs.");if(t[0].dims[t[0].dims.length-1]!==t[1].dims[t[1].dims.length-2])throw Error("shared dimension does not match.");let i=ev.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!i)throw Error("Can't use matmul on the given tensors");let r=i[i.length-1],a=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&a<8)e.compute(iX(e.inputs,{activation:""},i));else{let t=i[i.length-2],s=ex.size(e.inputs[0].dims.slice(0,-2)),n=ex.size(e.inputs[1].dims.slice(0,-2));if(1!==s&&1===t&&1===n){let t=e.inputs[0].reshape([1,s,a]),n=e.inputs[1].reshape([1,a,r]),o=[1,s,r],u=[t,n];e.compute(i1(u,{activation:""},i,o),{inputs:u})}else e.compute(i1(e.inputs,{activation:""},i))}}}}),nP=s$({"web/lib/wasm/jsep/webgpu/ops/matmulnbits.ts"(){"use strict";sQ(),sJ(),s6(),s8(),r5=(e,t)=>{var i,r;if(((e,t)=>{if(e.length<3||e.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let i=e[0],r=i.dims.length;if(i.dims[r-1]!==t.k)throw Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,n=e[1];if(!ex.areEqual(n.dims,[t.n,a,s]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(ex.size(o)!==t.n*a)throw Error("scales input size error.");if(4===e.length){let i=e[3].dims,r=t.n*(8===t.bits?a:Math.floor((a*t.bits+7)/8));if(ex.size(i)!==r)throw Error("zeroPoints input size error.")}})(e.inputs,t),32===t.blockSize&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")){let r,a,s,n,o,u,l,d,p,c,h,f,m,g,_,y,$,b,w,v,x,k;e.compute((i=e.inputs,a=(r=i[0].dims).length,s=r[a-2],n=t.k,o=t.n,u=r.slice(0,a-2),l=ex.size(u),d=i[1].dims[2]/4,p=i[0].dataType,c=e3(t.k),h=e3(d),f=u.concat([s,o]),y=(_=(g=128/(m=o%8==0?8:o%4==0?4:1))*h*8)/c,$=_/t.blockSize,b=ex.size(f)/m,w=[],v=[l,s,n/c],(x=ex.convertShape(i[1].dims).slice()).splice(-1,1,d/h),w.push(...e2(v)),w.push(...e2(x)),w.push(...e2(i[2].dims)),4===i.length&&w.push(...e2(ex.convertShape(i[3].dims))),k=[l,s,o],w.push(...e2(k)),{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${c};${h};${g};${m}`,inputDependencies:Array(i.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:p}],dispatchGroup:{x:b},programUniforms:w}),getShaderSource:e=>{let r=v.length,a=e9("a",i[0].dataType,r,c),s=e9("b",12,x.length,h),n=e9("scales",i[2].dataType,i[2].dims.length),o=[a,s,n],u=4===i.length?e9("zero_points",12,i[3].dims.length):void 0;u&&o.push(u);let l=k.length,d=te("output",i[0].dataType,l),p=e0(i[0].dataType);return`
        var<workgroup> sub_a: array<${a.type.value}, ${y}>;
        var<workgroup> inter_results: array<array<${d.type.value}, ${g}>, ${m}>;
        ${e.declareVariables(...o,d)}
        ${e.mainStart([g,m,1])}
          let output_indices = ${d.offsetToIndices(`workgroup_index * ${m}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${$} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${y};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${y}; a_offset += 128)
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${a.getByIndices(`${a.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${a.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${$} + local_id.x;
            ${u?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${u.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${p}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${p}(8);`}
            let scale = ${n.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${s.getByIndices(`${s.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/c};
            for (var i: u32 = 0; i < ${h}; i++) {
              ${(()=>{switch(c){case 1:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${c}-component is not supported.`)}})()}
              let b_value = ${1===h?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${p}>(${Array.from({length:4},(e,t)=>`${p}(b_value_lower[${t}]), ${p}(b_value_upper[${t}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${p}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(e,t)=>`dot(a_data${t}, b_dequantized_values[${t}])`).join(" + ")};
              word_offset += ${8/c};
            }
            workgroupBarrier();
          }

          if (local_idx < ${m}) {
            var output_value: ${d.type.value} = ${d.type.value}(0);
            for (var b = 0u; b < ${g}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${d.setByIndices(`${d.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`}}))}else{let i,a,s,n,o,u,l,d,p,c,h,f,m,g,_,y,$,b,w;e.compute((r=e.inputs,a=(i=r[0].dims).length,s=i[a-2],n=t.k,o=t.n,u=i.slice(0,a-2),l=ex.size(u),d=r[1].dims[2]/4,p=r[0].dataType,c=e3(t.k),h=e3(d),f=e3(o),m=u.concat([s,o]),g=s>1&&o/f%2==0?2:1,_=ex.size(m)/f/g,y=[],$=[l,s,n/c],(b=ex.convertShape(r[1].dims).slice()).splice(-1,1,d/h),y.push(...e2($)),y.push(...e2(b)),y.push(...e2(r[2].dims)),4===r.length&&y.push(...e2(ex.convertShape(r[3].dims))),w=[l,s,o/f],y.push(...e2(w)),{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${c};${h};${f};${g};64`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:p}],dispatchGroup:{x:_},programUniforms:y}),getShaderSource:e=>{let i=$.length,a=e9("a",r[0].dataType,i,c),s=e9("b",12,b.length,h),n=e9("scales",r[2].dataType,r[2].dims.length),o=[a,s,n],u=4===r.length?e9("zero_points",12,r[3].dims.length):void 0;u&&o.push(u);let l=w.length,p=te("output",r[0].dataType,l,f),m=e0(r[0].dataType),_=(()=>{switch(c){case 1:return`array<${m}, 8>`;case 2:return`mat4x2<${m}>`;case 4:return`mat2x4<${m}>`;default:throw Error(`${c}-component is not supported.`)}})();return`
        var<workgroup> workgroup_shared: array<${p.type.value}, ${64*g}>;
        ${e.declareVariables(...o,p)}
        ${e.mainStart([64,1,1])}
          let output_indices = ${p.offsetToIndices(`(global_idx / 64) * ${g}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/c};
            ${(()=>{let e=`
            var col_index = col * ${f};
            ${u?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${m}(8);`}
            `;for(let t=0;t<f*g;t++)e+=`
            let scale${t} = ${n.getByOffset("col_index * nBlocksPerCol + block")};
            ${u?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${u.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${t} = ${m}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return e})()}
            for (var word: u32 = 0; word < ${d}; word += ${h}) {
              ${(()=>{let e=`col_index = col * ${f};`;for(let t=0;t<f*g;t++)e+=`
            let b${t}_data = ${s.getByIndices(`${s.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return e+`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${_};
            var b_dequantized_values: ${_};`})()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${(()=>{let e=`
          // reuse a data
            var input_offset = ${a.indicesToOffset(`${a.type.indices}(batch, row, word_offset)`)};
            var a_data: ${_};
            for (var j: u32 = 0; j < ${8/c}; j++) {
              a_data[j] = ${a.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let t=0;t<f*g;t++)e+=`
            b_value = ${1===h?`b${t}_data`:`b${t}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${_}(${Array.from({length:4},(e,t)=>`${m}(b_value_lower[${t}]), ${m}(b_value_upper[${t}])`).join(", ")});
            b_dequantized_values = ${1===c?`${_}(${Array.from({length:8},(e,i)=>`(b_quantized_values[${i}] - ${u?`zero_point${t}`:"zero_point"}) * scale${t}`).join(", ")});`:`(b_quantized_values - ${_}(${Array(8).fill(`${u?`zero_point${t}`:"zero_point"}`).join(",")})) * scale${t};`};
            workgroup_shared[local_id.x * ${g} + ${Math.floor(t/f)}]${f>1?`[${t%f}]`:""} += ${Array.from({length:8/c},(e,t)=>`${1===c?`a_data[${t}] * b_dequantized_values[${t}]`:`dot(a_data[${t}], b_dequantized_values[${t}])`}`).join(" + ")};
          `;return e})()}
                word_offset += ${8/c};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${g}) {
            var output_value: ${p.type.value} = ${p.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${g};
            }
            ${p.setByIndices(`${p.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`}}))}},r7=e=>eX(e)}}),nq=s$({"web/lib/wasm/jsep/webgpu/ops/pad.ts"(){"use strict";sQ(),sJ(),s8(),r9=(e,t)=>{let i,r,a,s;var n,o=e.inputs;if(!o||o.length<1)throw Error("Too few inputs");if(1!==o[0].dataType&&10!==o[0].dataType)throw Error("Input type must be float or float16.");if(o.length>=2){let e=2*o[0].dims.length===o[1].dims[0];if(4===o.length&&(e=2*o[3].dims[0]===o[1].dims[0]),!e)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}let u=((e,t)=>{if(!(e.length>1))return t;{let i=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?10===e[2].dataType?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,s=new Int32Array(2*a).fill(0);if(e.length>=4){let t=e[3].getBigInt64Array();for(let e=0;e<t.length;e++)s[Number(t[e])]=Number(i[e]),s[Number(t[e])+a]=Number(i[e+t.length])}else i.forEach((e,t)=>s[Number(t)]=Number(e));let n=[];return s.forEach(e=>n.push(e)),{mode:t.mode,value:r,pads:n}}})(e.inputs,t);e.compute((n=e.inputs,i=ex.padShape(n[0].dims.slice(),u.pads),r=n[0].dims,a=[{type:12,data:ex.size(i)},{type:6,data:u.pads}],s=n.length>=3&&n[2].data,0===u.mode&&a.push({type:s?n[2].dataType:1,data:u.value}),a.push(...e2(n[0].dims,i)),{name:"Pad",shaderCache:{hint:`${u.mode}${s}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(ex.size(i)/64)},programUniforms:a}),getShaderSource:e=>{let t=te("output",n[0].dataType,i.length),a=e9("x",n[0].dataType,r.length),o=a.type.value,l=((e,t,i)=>{switch(i.mode){case 0:var r=i.pads.length;let a="";for(let i=t-1;i>=0;--i)a+=`
            k = i32(${e.indicesGet("indices",i)}) - ${e5("uniforms.pads",i,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${e5("uniforms.x_shape",i,t)})) {
              break;
            }
            offset += k * i32(${e5("uniforms.x_strides",i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${a}
            value = x[offset];
          }
      `;case 1:var s=i.pads.length;let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${e5("uniforms.pads",i,s)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${e5("uniforms.x_shape",i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${e5("uniforms.x_shape",i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${e5("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `;case 2:var o=i.pads.length;let u="";for(let i=t-1;i>=0;--i)u+=`
                k = i32(${e.indicesGet("indices",i)}) - ${e5("uniforms.pads",i,o)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${e5("uniforms.x_shape",i,t)})) {
                  k = i32(${e5("uniforms.x_shape",i,t)}) - 1;
                }
                offset += k * i32(${e5("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${u}
              value = x[offset];
          `;case 3:var l=i.pads.length;let d="";for(let i=t-1;i>=0;--i)d+=`
                k = i32(${e.indicesGet("indices",i)}) - ${e5("uniforms.pads",i,l)};
                if (k < 0)  {
                  k += i32(${e5("uniforms.x_shape",i,t)}]);
                }
                if (k >= i32(${e5("uniforms.x_shape",i,t)})) {
                  k -= i32(${e5("uniforms.x_shape",i,t)});
                }
                offset += k * i32(${e5("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${d}
              value = x[offset];
          `;default:throw Error("Invalid mode")}})(t,r.length,u),d=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:u.pads.length}];return 0===u.mode&&d.push({name:"constant_value",type:s?o:"f32"}),`
            ${e.registerUniforms(d).declareVariables(a,t)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${t.offsetToIndices("global_idx")};

            var value = ${o}(0);
            ${l}
            output[global_idx] = value;
        }`}}),{inputs:[0]})}}}),nN=s$({"web/lib/wasm/jsep/webgpu/ops/pool.ts"(){"use strict";sV(),sQ(),sJ(),s8(),ae=e=>{if(l.webgpu.validateInputContent&&(!e||1!==e.length))throw Error("Pool ops requires 1 input.")},at=(e,t,i)=>{let r="NHWC"===t.format,a=e.dims.slice();r&&a.splice(1,0,a.pop());let s=Object.hasOwnProperty.call(t,"dilations"),n=t.kernelShape.slice(),o=t.strides.slice(),u=s?t.dilations.slice():[],l=t.pads.slice();ek.adjustPoolAttributes(i,a,n,o,u,l);let d=ek.computePoolOutputShape(i,a,o,u,n,l,t.autoPad),p=Object.assign({},t);s?Object.assign(p,{kernelShape:n,strides:o,pads:l,dilations:u,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:n,strides:o,pads:l,cacheKey:t.cacheKey});let c=d.slice();return c.push(c.splice(1,1)[0]),[p,r?c:d]},ai=(e,t)=>{let i="NHWC"===t.format,r=[{type:12,data:ex.size(e)},{type:12,data:ex.size(t.kernelShape)}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let e=t.kernelShape[t.kernelShape.length-1],i=t.strides[t.strides.length-1],s=t.pads[t.pads.length/2-1],n=t.pads[t.pads.length-1],o=!!(s+n);r.push({type:12,data:e},{type:12,data:i},{type:12,data:s},{type:12,data:n}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let u=!1;if(2===t.kernelShape.length){let e=t.kernelShape[t.kernelShape.length-2],i=t.strides[t.strides.length-2],s=t.pads[t.pads.length/2-2],n=t.pads[t.pads.length-2];u=!!(s+n),r.push({type:12,data:e},{type:12,data:i},{type:12,data:s},{type:12,data:n}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[r,a,!0,o,u]}{if(i)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let e=ex.computeStrides(t.kernelShape);return r.push({type:12,data:e},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:e.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length}),[r,a,!!t.pads.reduce((e,t)=>e+t),!1,!1]}},ar=(e,t,i,r,a,s,n,o,u,l,d,p)=>{let c="NHWC"===a.format,h=t.type.value,f=te("output",t.type.tensor,r);if(a.kernelShape.length<=2){let r="",l="",m="",g=i-(c?2:1);if(r=d?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`,2===a.kernelShape.length){let e=i-(c?3:2);l=p?`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${e}] < 0 || xIndices[${e}] >= uniforms.x_shape[${e}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                `,m=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,f)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var value = ${h}(${o});
              var pad = 0;
              ${l}
              ${r}
              ${m}
              ${n}

              output[global_idx] = value;
            }`}{if(c)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let r=a.kernelShape.length,d=a.pads.length,p="";return p=l?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(u).declareVariables(t,f)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var offsets: array<u32, ${r}>;

              var value = ${h}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${r-1}u; j++) {
                  offsets[j] = offset / ${e5("uniforms.kernelStrides","j",r)};
                  offset -= offsets[j] * ${e5("uniforms.kernelStrides","j",r)};
                }
                offsets[${r-1}] = offset;

                isPad = false;
                for (var j = ${i-r}u; j < ${i}u; j++) {
                  xIndices[j] = indices[j] * ${e5("uniforms.strides",`j - ${i-r}u`,r)}
                    + offsets[j - ${i-r}u] - ${e5("uniforms.pads","j - 2u",d)};
                  ${p}
              }
              ${n}

              output[global_idx] = value;
            }`}},aa=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,as=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),an=(e,t,i,r)=>{let[a,s]=at(t,r,i),n=e9("x",t.dataType,t.dims.length),o=n.type.value,u="";a.countIncludePad?u+=`value /= ${o}(uniforms.kernelSize);`:u+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[l,d,p,c,h]=ai(s,a);return l.push(...e2(t.dims,s)),{name:e,shaderCache:{hint:`${r.cacheKey};${p};${c};${h}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(ex.size(s)/64)},programUniforms:l}),getShaderSource:e=>ar(e,n,t.dims.length,s.length,a,"value += x_val;",u,0,d,p,c,h)}},ao=e=>{let t=0!==e.count_include_pad,i=as(e);if(0!==i.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...i,cacheKey:""};return{...r,cacheKey:`${aa(r)};${r.countIncludePad}`}},au=(e,t)=>{ae(e.inputs),e.compute(an("AveragePool",e.inputs[0],!1,t))},al={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ad=e=>{let t=e.format;return{format:t,...al,cacheKey:t}},ap=(e,t)=>{ae(e.inputs),e.compute(an("GlobalAveragePool",e.inputs[0],!0,t))},ac=(e,t,i,r)=>{let[a,s]=at(t,r,i),n=`
      value = max(x_val, value);
    `,o=e9("x",t.dataType,t.dims.length),[u,l,d,p,c]=ai(s,a);return u.push(...e2(t.dims,s)),{name:e,shaderCache:{hint:`${r.cacheKey};${d};${p};${c}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(ex.size(s)/64)},programUniforms:u}),getShaderSource:e=>ar(e,o,t.dims.length,s.length,a,n,"",10===t.dataType?-65504:-1e5,l,d,p,c)}},ah=(e,t)=>{ae(e.inputs),e.compute(ac("MaxPool",e.inputs[0],!1,t))},af=e=>{let t=e.storage_order,i=e.dilations,r=as(e);if(0!==t)throw Error("column major storage order is not yet supported for MaxPool");if(0!==r.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:i,...r,cacheKey:""};return{...a,cacheKey:`${aa(a)};${a.storageOrder};${a.dilations}`}},am=e=>{let t=e.format;return{format:t,...al,cacheKey:t}},ag=(e,t)=>{ae(e.inputs),e.compute(ac("GlobalMaxPool",e.inputs[0],!0,t))}}}),nU=s$({"web/lib/wasm/jsep/webgpu/ops/quantize-linear.ts"(){"use strict";sQ(),sJ(),s6(),s8(),a_=(e,t)=>{let i,r,a,s,n,o,u,l,d,p,c,h,f,m,g,_,y,$,b,w,v,x,k,S;var I,T=e.inputs;if(T.length<2||T.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===T.length&&T[1].dims===T[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===T.length&&T[0].dataType!==T[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(6===T[0].dataType&&T.length>2)throw Error("In the case of dequantizing int32 there is no zero point.");if(0!==T[1].dims.length&&1!==T[1].dims.length&&T[1].dims.length!==T[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(T.length>2){if(T[0].dataType!==T[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(T[1].dims.length!==T[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!T[1].dims.map((e,t)=>e===T[2].dims[t]).reduce((e,t)=>e&&t,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(0===T[1].dims.length||1===T[1].dims.length&&1===T[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!T[1].dims.map((e,i)=>i===t.axis||e===T[0].dims[i]).reduce((e,t)=>e&&t,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(T[1].dims.length!==T[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let e=T[0].dims[t.axis],i=T[1].dims[t.axis];if(t.blockSize<Math.ceil(e/i)||t.blockSize>Math.ceil(e/(i-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}e.compute((I=e.inputs,i=ex.normalizeAxis(t.axis,I[0].dims.length),a=3===(r=I[0].dataType),s=I[0].dims,n=I[1].dataType,o=ex.size(s),l=(u=3===r||2===r)?[Math.ceil(ex.size(I[0].dims)/4)]:I[0].dims,d=I[1].dims,c=(p=I.length>2?I[2]:void 0)?u?[Math.ceil(ex.size(p.dims)/4)]:p.dims:void 0,f=!1==(h=0===d.length||1===d.length&&1===d[0])&&1===d.length,m=e3(o),_=(g=h&&(!u||4===m))?m:1,y=g&&!u?m:1,$=e9("input",u?12:r,l.length,y),b=e9("scale",n,d.length),w=p?e9("zero_point",u?12:r,c.length):void 0,v=te("output",n,s.length,_),x=[$,b],w&&x.push(w),k=[l,d],p&&k.push(c),S=[{type:12,data:o/_},{type:12,data:i},{type:12,data:t.blockSize},...e2(...k,s)],{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getShaderSource:e=>`
      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...x,v)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${v.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${$.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===_?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${$.getByOffset("global_idx")};`};

          // Set scale input
          ${h?`let scale_value= ${b.getByOffset("0")}`:f?`
            let scale_index = ${v.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${b.getByOffset("scale_index")};`:`
            var scale_indices: ${b.type.indices} = output_indices;
            let index = ${b.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${b.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${b.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${(()=>{if(!w)return`let zero_point_value = ${u?a?"i32":"u32":$.type.value}(0);`;if(h)if(u)return`
                let zero_point_input = ${w.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`;else return`let zero_point_value = ${w.getByOffset("0")}`;if(f)if(u)return`
                let zero_point_index = ${v.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${w.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`;else return`
                let zero_point_index = ${v.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${w.getByOffset("zero_point_index")};`;if(u)return`
                let zero_point_offset = ${b.indicesToOffset("scale_indices")};
                let zero_point_input = ${w.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`;return`let zero_point_value = ${w.getByIndices("scale_indices")};`})()};
      // Compute and write output
      ${v.setByOffset("global_idx",`${v.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(o/_/64),y:1,z:1},programUniforms:S})}))},ay=e=>eX({axis:e.axis,blockSize:e.blockSize})}}),nV=s$({"web/lib/wasm/jsep/webgpu/ops/range.ts"(){"use strict";sV(),sQ(),s8(),a$=e=>{var t,i,r,a;let s,n,o,u=0,d=0,p=0;6===e.inputs[0].dataType?(u=e.inputs[0].getInt32Array()[0],d=e.inputs[1].getInt32Array()[0],p=e.inputs[2].getInt32Array()[0]):1===e.inputs[0].dataType&&(u=e.inputs[0].getFloat32Array()[0],d=e.inputs[1].getFloat32Array()[0],p=e.inputs[2].getFloat32Array()[0]),l.webgpu.validateInputContent&&((e,t,i)=>{if(e===t||e<t&&i<0||e>t&&i>0)throw Error("Range these inputs' contents are invalid.")})(u,d,p),e.compute((t=u,i=d,r=p,a=e.inputs[0].dataType,n=[s=Math.abs(Math.ceil((i-t)/r))],o=[{type:12,data:s},{type:a,data:t},{type:a,data:r},...e2(n)],{name:"Range",shaderCache:{hint:`${a}`},getShaderSource:e=>{let t=te("output",a,n.length),i=t.type.value;return`
        ${e.registerUniforms([{name:"outputSize",type:"u32"},{name:"start",type:i},{name:"delta",type:i}]).declareVariables(t)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${i}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:o})}),{inputs:[]})}}}),nL=s$({"web/lib/wasm/jsep/webgpu/ops/scatter-nd.ts"(){"use strict";sQ(),sJ(),s6(),s8(),ab=e=>eX({reduction:e.reduction}),aw=(e,t)=>{var i;let r,a,s,n,o,u;e.compute((i=e.inputs,r=i[0].dims,a=i[1].dims,s=Math.ceil(ex.sizeToDimension(a,a.length-1)/1),n=a[a.length-1],o=ex.sizeFromDimension(r,n),u=[{type:12,data:s},{type:12,data:n},{type:12,data:o},...e2(i[1].dims,i[2].dims,r)],{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u}),getShaderSource:e=>{let a=e9("indices",i[1].dataType,i[1].dims.length),s=e9("updates",i[2].dataType,i[2].dims.length,1),n="none"!==t.reduction&&""!==t.reduction?tt("output",i[0].dataType,r.length):te("output",i[0].dataType,r.length,1);return`
      ${e.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(a,s,n)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${1===i[0].dims.length?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${((e,t,i,r)=>{if("none"!==e&&"i32"!==r&&"u32"!==r&&"f32"!==r)throw Error(`Input ${r} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${i};`;case"add":if("i32"===r||"u32"===r)return`atomicAdd(&${t}, bitcast<${r}>(${i}));`;return`
              ${a}bitcast<${r}>(oldValue) + (${i})${s}`;case"max":if("i32"===r||"u32"===r)return`atomicMax(&${t}, bitcast<${r}>(${i}));`;return`
                ${a}max(bitcast<f32>(oldValue), (${i}))${s}`;case"min":if("i32"===r||"u32"===r)return`atomicMin(&${t}, bitcast<${r}>(${i}));`;return`${a}min(bitcast<${r}>(oldValue), (${i}))${s}`;case"mul":return`${a}(bitcast<${r}>(oldValue) * (${i}))${s}`;default:throw Error(`Reduction ${e} is not supported.`)}})(t.reduction,"output[data_offset + i]","value",n.type.value)}
  }

      }`}}),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}}),nG=s$({"web/lib/wasm/jsep/webgpu/ops/resize.ts"(){"use strict";sQ(),sJ(),s6(),s8(),av=(e,t,i,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${i}));
  let fract = ${r}(big % (${i})) / ${r}(${i});
  return whole + fract;
`,ax=(e,t,i,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",i,"batch")};
`:"",ak=(e,t)=>{let i,r=[],a=[],s=[],n=new Uint32Array(i=e.customDataBuffer,i.byteOffset,1)[0];if(0!==t.antialias)throw Error("Only default value (0) for Antialias attribute is supported");((e,t,i,r,a,s)=>{let[n,o,u]=i>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(n>0&&e.length>n&&e[n].dims.length>0)e[n].getFloat32Array().forEach(e=>s.push(e));else if("tf_crop_and_resize"===t.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&1===e[o].dims.length&&e[o].dims[0]>0){var d;let a;if(e[o].getFloat32Array().forEach(e=>r.push(e)),0!==r.length&&r.length!==l&&i>=18&&r.length!==t.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");if(r.every(e=>e>0||(()=>{throw Error("Resize requires scales input values to be positive")})),r.length>0){if("linear"===t.mode){if(2!==r.length&&3!==r.length&&(4!==r.length||1!==r[0]||1!==r[1])&&(4!==r.length||1!==r[0]||1!==r[3])&&(5!==r.length||1!==r[0]||1!==r[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===t.mode&&2!==r.length&&(4!==r.length||1!==r[0]||1!==r[1])&&(4!==r.length||1!==r[0]||1!==r[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}t.axes.length>0&&(d=t.axes,d.every(e=>e>=0&&e<l||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")})),a=Array(l).fill(1),d.forEach((e,t)=>a[e]=r[t]),a).forEach((e,t)=>r[t]=e)}if(u>0&&e.length>u&&1===e[u].dims.length&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(e=>a.push(Number(e))),0!==a.length&&a.length!==l&&i>=18&&a.length!==t.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(0!==r.length&&r.length!==t.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==a.length&&a.length!==t.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(void 0!==r&&void 0!==a&&r.length>0&&a.length>l)throw Error("Resize requires only of scales or sizes to be specified")})(e.inputs,t,n,r,a,s),e.compute(((e,t,i,r,a,s)=>{var n,o,u;let l,d,p=e.dims,c=(n=t.axes,l=Array(o=p.length).fill(0).concat(Array(o).fill(1)),d=0===s.length?l:s.slice(),n.length>0?(n.forEach((e,t)=>{l[e]=d[t],l[t+o]=d[n.length+t]}),l):d),h=((e,t,i,r)=>{let a=[];if(i.length>0)if(r.length>0){if(e.forEach(e=>a.push(e)),Math.max(...r)>e.length)throw Error("axes is out of bound");r.forEach((e,t)=>a[e]=i[t])}else i.forEach(e=>a.push(e));else if(0===t.length)throw Error("Resize requires either scales or sizes.");else a=e.map((e,i)=>Math.round(e*t[i]));return a})(p,r,a,t.axes),f=r.slice();if(0===r.length){let e,i;f=p.map((e,t)=>0===e?1:h[t]/e),"stretch"!==t.keepAspectRatioPolicy&&(u=f,e=(()=>{switch(t.keepAspectRatioPolicy){case"not_larger":return t.axes.length>0?Math.min(...t.axes.map(e=>u[e]),Number.MAX_VALUE):Math.min(...u,Number.MAX_VALUE);case"not_smaller":return t.axes.length>0?Math.max(...t.axes.map(e=>u[e]),5e-324):Math.max(...u,5e-324);default:throw Error(`Keep aspect ratio policy ${t.keepAspectRatioPolicy} is not supported`)}})(),u.fill(1,0,u.length),i=p.slice(),t.axes.length>0?(t.axes.forEach(t=>u[t]=e),t.axes.forEach(e=>i[e]=Math.round(p[e]*u[e]))):(u.fill(e,0,u.length),i.forEach((e,t)=>i[t]=Math.round(e*u[t]))),h=i)}let m=te("output",e.dataType,h.length),g=e9("input",e.dataType,p.length),_=ex.size(h),y=p.length===h.length&&p.every((e,t)=>e===h[t]),$="tf_crop_and_resize"===t.coordinateTransformMode,b=t.extrapolationValue,w=g.type.value;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${i}|${f.length>0?"cubic"===t.mode?f:f.length:""}|${a.length>0?a:""}|${c.length>0?c:""}|${y}|${"nearest"===t.mode?p.length:p}`,inputDependencies:["rank"]},getShaderSource:e=>{let r;return`
      ${y?"":`
      ${r=t.coordinateTransformMode,`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${w} { `+(()=>{switch(r){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${w}(xResized) / ${w}(xScale);
          } else {
            ${av("xResized","lengthOriginal","lengthResized",w)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${w}(xResized) + 0.5) / ${w}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${w}(xResized) + 0.5) / ${w}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${av("xResized","lengthOriginal - 1","lengthResized - 1",w)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${w}(roiStart) * ${w}(lengthOriginal - 1) +
                        (${w}(xResized) * ${w}(roiEnd - roiStart) * ${w}(lengthOriginal - 1)) /
                        ${w}(lengthResized - 1);
                  } else {
                    return 0.5 * ${w}(roiStart + roiEnd) * ${w}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${w}xScale * ${w}(lengthResized);
                  const adjustment = ${w}(lengthResized) / outputWidth;
                  const center = ${w}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${w}(xResized) + 0.5) / ${w}(xScale)) - 0.5;`;case"half_pixel":return`return ((${w}(xResized) + 0.5) / ${w}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${r} is not supported`)}})()+"}"};
      ${(()=>{switch(t.mode){case"nearest":let e,r,a,s;return`
              
    fn checkInputIndices(input_indices: ${g.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${p.length}; i++) {
        var input_index = ${g.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${e5("uniforms.input_shape","i",p.length)}) {
          return false;
        }
      }
      return true;
    };
              ${e=t.nearestMode,`fn getNearestPixelFromOriginal(xOriginal: ${w}, isDownSample: bool) -> ${w} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(i<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${e} is not supported`)}})()+"}"};
              ${r=h,a=f.length,s=c.length,`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${m.type.indices}) -> ${g.type.indices} {
      var input_indices: ${g.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${m.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${e5("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${e5("uniforms.roi","i",s)};
          var roi_hi = ${e5("uniforms.roi",`i + ${p.length}`,s)};
          var input_shape_i = ${e5("uniforms.input_shape","i",p.length)};
          var output_shape_i = ${e5("uniforms.output_shape","i",r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${$} || (original_idx >= 0 && original_idx < ${m.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${m.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${g.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`};
              `;case"linear":let n,o,u;return`
              ${n=h,o=f.length,u=c.length,`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${m.type.indices}) -> array<${m.type.value}, ${n.length}> {
      var original_indices: array<${m.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${m.indicesGet("output_indices","i")};
        var scale = ${e5("uniforms.scales","i",o)};
        var roi_low = ${e5("uniforms.roi","i",u)};
        var roi_hi = ${e5("uniforms.roi",`i + ${p.length}`,u)};
        if (scale == 1.0) {
          original_indices[i] = ${m.type.value}(output_index);
        } else {
          var input_shape_i = ${e5("uniforms.input_shape","i",p.length)};
          var output_shape_i = ${e5("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`};
              ${(()=>{if(2===p.length||4===p.length)return`${((e,t,i,r,a)=>{let[s,n,o,u]=2===i.length?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",n,`max(0, min(row, ${i[n]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${i[o]} - 1))`)};
      ${ax(e,u,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${n}];
      var col:${l} = originalIndices[${o}];
      ${r?`if (row < 0 || row > (${i[n]} - 1) || col < 0 || col > (${i[o]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${i[n]} - 1));
      col = max(0, min(col, ${i[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${i.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${i.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`})(g,m,p,$,b)}`;if(3===p.length||5===p.length)return`${((e,t,i,r,a)=>{let[s,n,o,u,l]=3===i.length?[-1,0,1,2,-1]:[0,2,3,4,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",n,`max(0, min(depth, ${i[n]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${i[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${i[u]} - 1))`)};
      ${ax(e,l,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${d} = originalIndices[${n}];
      var height:${d} = originalIndices[${o}];
      var width:${d} = originalIndices[${u}];
      ${r?`if (depth < 0 || depth > (${i[n]} - 1) || height < 0 || height > (${i[o]} - 1) || width < 0 || (width > ${i[u]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${i[n]} - 1));
      height = max(0, min(height, ${i[o]} - 1));
      width = max(0, min(width, ${i[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${i.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${i.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${d} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${d} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${d} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${d} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${d} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${d} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${d} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${d} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${d} = abs(depth - ${d}(depth1));
      var dx2: ${d} = abs(${d}(depth2) - depth);
      var dy1: ${d} = abs(height - ${d}(height1));
      var dy2: ${d} = abs(${d}(height2) - height);
      var dz1: ${d} = abs(width - ${d}(width1));
      var dz2: ${d} = abs(${d}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`})(g,m,p,$,b)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===p.length||4===p.length)return`${((e,t,i,r,a,s,n,o,u,l)=>{let[d,p]=2===i.length?[0,1]:[2,3],c=e.type.value,h=n=>{let p=n===d?"row":"col";return`
      fn ${p}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${c} {
        var output_index = ${t.indicesGet("output_indices",n)};
        var originalIdx: ${c} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[n]},
        ${r[n]}, ${i[n]}, ${s[n]}, ${s[n]} + ${i.length});
        var fractOriginalIdx: ${c} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${i[n]} - 1))) {
          return ${u};
        }
        var data: array<${c}, 4> = array<${c}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${p}: ${c} = originalIdx + ${c}(i);
          if (${p} < 0 || ${p} >= ${i[n]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${u};`:`${p} = max(0, min(${p}, ${i[n]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",n,`u32(${p})`)};
          data[i + 1] = ${n===d?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${h(d)};
    ${h(p)};
  fn getCubicInterpolationCoefs(s: ${c}) -> array<${c}, 4> {
    var absS = abs(s);
    var coeffs: array<${c}, 4> = array<${c}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${c} = 1.0 - absS;
    var twoMinusAbsS: ${c} = 2.0 - absS;
    var onePlusAbsS: ${c} = 1.0 + absS;
    coeffs[0] = ((${n} * onePlusAbsS - 5 * ${n}) * onePlusAbsS + 8 * ${n}) * onePlusAbsS - 4 * ${n};
    coeffs[1] = ((${n} + 2) * absS - (${n} + 3)) * absS * absS + 1;
    coeffs[2] = ((${n} + 2) * oneMinusAbsS - (${n} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${n} * twoMinusAbsS - 5 * ${n}) * twoMinusAbsS + 8 * ${n}) * twoMinusAbsS - 4 * ${n};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${c}, 4>, coefs: array<${c}, 4>) -> ${c} {
    var coefsSum: ${c} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${c} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `})(g,m,p,h,f,c,t.cubicCoeffA,$,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${e.registerUniform("output_size","u32").registerUniform("scales","f32",f.length).registerUniform("roi","f32",c.length).declareVariables(g,m)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y?"output[global_idx] = input[global_idx];":`
        let output_indices = ${m.offsetToIndices("global_idx")};
        var input_indices: ${g.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${g.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${2===p.length||4===p.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`},getRunData:()=>({outputs:[{dims:h,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},{type:1,data:f},{type:1,data:c},...e2(p,h)]})}})(e.inputs[0],t,n,r,a,s),{inputs:[0]})},aS=e=>{let t=e.antialias,i=e.axes,r=e.coordinateTransformMode,a=e.cubicCoeffA,s=0!==e.excludeOutside,n=e.extrapolationValue,o=e.keepAspectRatioPolicy,u=e.mode,l=""===e.nearestMode?"simple":e.nearestMode;return eX({antialias:t,axes:i,coordinateTransformMode:r,cubicCoeffA:a,excludeOutside:s,extrapolationValue:n,keepAspectRatioPolicy:o,mode:u,nearestMode:l})}}}),nW=s$({"web/lib/wasm/jsep/webgpu/ops/skip-layer-norm.ts"(){"use strict";sQ(),sJ(),s8(),aI=(e,t)=>{var i,r;let a,s,n,o,u,l,d,p,c,h,f,m,g;(e=>{if(!e||e.length<3)throw Error("layerNorm requires at least 3 inputs.");let t=e[0],i=e[1],r=e[2];if(t.dataType!==i.dataType||t.dataType!==r.dataType)throw Error("All inputs must have the same data type");if(3!==t.dims.length&&2!==t.dims.length)throw Error("Input must be 2D or 3D");if(3!==i.dims.length&&2!==i.dims.length)throw Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(i.dims[i.dims.length-1]!==a)throw Error("Skip must have the same hidden size as input");if(i.dims[i.dims.length-2]!==s)throw Error("Skip must have the same sequence length as input");if(1!==r.dims.length)throw Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==a)throw Error("Gamma must have the same hidden size as input");if(e.length>3){let t=e[3];if(1!==t.dims.length)throw Error("Beta must be 1D");if(t.dims[t.dims.length-1]!==a)throw Error("Beta must have the same hidden size as input")}if(e.length>4){let t=e[4];if(1!==t.dims.length)throw Error("Bias must be 1D");if(t.dims[t.dims.length-1]!==a)throw Error("Bias must have the same hidden size as input")}})(e.inputs);let _=[0];e.outputCount>1&&_.push(-3),e.outputCount>2&&_.push(-3),e.outputCount>3&&_.push(3),e.compute((i=e.inputs,r=e.outputCount,a=t.simplified,s=i[0].dims,n=ex.size(s),o=s.slice(-1)[0],u=[],l=!a&&i.length>3,d=i.length>4,p=!1,c=!1,h=r>3,m=[{type:12,data:n},{type:12,data:f=e3(o)},{type:12,data:o},{type:1,data:t.epsilon}],g=[{dims:s,dataType:i[0].dataType}],r>1&&g.push({dims:u,dataType:1}),r>2&&g.push({dims:u,dataType:1}),r>3&&g.push({dims:s,dataType:i[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${f};${p};${c};${h}`,inputDependencies:i.map((e,t)=>"type")},getShaderSource:e=>{let t=[e9("x",i[0].dataType,i[0].dims,f),e9("skip",i[1].dataType,i[1].dims,f),e9("gamma",i[2].dataType,i[2].dims,f)];l&&t.push(e9("beta",i[3].dataType,i[3].dims,f)),d&&t.push(e9("bias",i[4].dataType,i[4].dims,f)),t.push(te("output",i[0].dataType,s,f)),p&&t.push(te("mean_output",1,u)),c&&t.push(te("inv_std_output",1,u)),h&&t.push(te("input_skip_bias_sum",i[0].dataType,s,f));let r=e0(i[0].dataType),n=e0(1,f);return`

      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...t)}
      var<workgroup> sum_shared : array<${n}, 64>;
      var<workgroup> sum_squared_shared : array<${n}, 64>;

      ${e.mainStart([64,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / 64;

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / 64;
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == 63) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${d?"bias[offset1d + i]":r+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${e6(r,f,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = 64;
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${e8("sum",f)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${e8("square_sum",f)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${p?"mean_output[global_idx] = mean;":""}
        ${c?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${r}(mean)`}) *
            ${r}(inv_std_dev) * gamma[offset1d + i]
            ${l?"+ beta[offset1d + i]":""};
        }
      }`},getRunData:()=>({outputs:g,dispatchGroup:{x:Math.ceil(n/o)},programUniforms:m})}),{outputs:_})}}}),nj=s$({"web/lib/wasm/jsep/webgpu/ops/slice.ts"(){"use strict";sQ(),sJ(),s6(),s8(),aT=(e,t)=>{let i=[];if(e.length>t)if(7===e[t].dataType)e[t].getBigInt64Array().forEach(e=>i.push(Number(e)));else if(6===e[t].dataType)e[t].getInt32Array().forEach(e=>i.push(Number(e)));else throw Error(`Input ${t} must be an array of int32 or int64`);return i},aE=(e,t,i,r,a)=>{let s=e;return(e<0&&(s+=i[r[t]]),a[t]<0)?Math.max(0,Math.min(s,i[r[t]]-1)):Math.max(0,Math.min(s,i[r[t]]))},az=(e,t)=>{var i=e.inputs;if(!i||i.length<1)throw Error("too few inputs");if(0!==t.axes.length){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw Error("starts and ends must have the same length");i.slice(1).forEach((e,t)=>{if(6!==i[t+1].dataType&&7!==i[t+1].dataType)throw Error(`Input ${t} must be an array of int32 or int64`)});let r=((e,t)=>{if(!(e.length>1))return t;{let t=aT(e,1),i=aT(e,2),r=aT(e,3);return 0===r.length&&(r=[...Array(e[0].dims.length).keys()]),eX({starts:t,ends:i,axes:r})}})(e.inputs,t);e.compute(((e,t)=>{let i=e[0].dims,r=ex.size(i),a=t.axes.length>0?ex.normalizeAxes(t.axes,i.length):[...Array(i.length).keys()],s=aT(e,4);s.forEach(e=>0!==e||(()=>{throw Error("step cannot be 0")})),0===s.length&&(s=Array(a.length).fill(1));let n=t.starts.map((e,t)=>aE(e,t,i,a,s)),o=t.ends.map((e,t)=>aE(e,t,i,a,s));if(a.length!==n.length||a.length!==o.length)throw Error("start, ends and axes should have the same number of elements");if(a.length!==i.length)for(let e=0;e<i.length;++e)a.includes(e)||(n.splice(e,0,0),o.splice(e,0,i[e]),s.splice(e,0,1));let u=s.map(e=>Math.sign(e));s.forEach((e,t,i)=>{if(e<0){let r=(o[t]-n[t])/e,a=n[t],u=a+r*s[t];n[t]=u,o[t]=a,i[t]=-e}});let l=i.slice(0);a.forEach((e,t)=>{l[e]=Math.ceil((o[e]-n[e])/s[e])});let d={dims:l,dataType:e[0].dataType},p=te("output",e[0].dataType,l.length),c=e9("input",e[0].dataType,e[0].dims.length),h=ex.size(l),f=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:n.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:s.length}],m=[{type:12,data:h},{type:12,data:n},{type:6,data:u},{type:12,data:s},...e2(e[0].dims,l)];return{name:"Slice",shaderCache:{hint:`${u.length}_${n.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:e=>`
      ${e.registerUniforms(f).declareVariables(c,p)}
        fn calculateInputIndices(output_indices: ${p.type.indices}) -> ${c.type.indices} {
          var input_indices: ${c.type.indices};
          var carry = 0u;
          for (var i = ${i.length-1}; i >= 0; i--) {
            let input_shape_i = ${e5("uniforms.input_shape","i",i.length)};
            let steps_i = ${e5("uniforms.steps","i",i.length)};
            let signs_i = ${e5("uniforms.signs","i",i.length)};
            let starts_i = ${e5("uniforms.starts","i",i.length)};
            var output_index = ${p.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${c.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }
        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",c.getByIndices("input_indices"))}
      }`,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:m})}})(e.inputs,r),{inputs:[0]})},aC=e=>{let t=e.starts,i=e.ends,r=e.axes;return eX({starts:t,ends:i,axes:r})}}}),nH=s$({"web/lib/wasm/jsep/webgpu/ops/softmax.ts"(){"use strict";sQ(),sJ(),s6(),s5(),s8(),aO=(e,t)=>{let i,r,a,s,n,o,u,l,d,p,c,h,f,m,g,_,y,$,b;var w=e.inputs;if(!w||1!==w.length)throw Error("Softmax op requires 1 input.");a=(r=e.inputs[0]).dims,s=ex.size(a),n=a.length,u=(o=ex.normalizeAxis(t.axis,n))<a.length-1,l=[],u?((l=Array.from({length:n},(e,t)=>t))[o]=n-1,l[n-1]=o,i=e.compute(tn(r,l),{inputs:[r],outputs:[-1]})[0]):i=r,c=s/(p=(d=i.dims)[n-1]),h=e3(p),f=p/h,m=64,1===c&&(m=256),g=e9("x",i.dataType,i.dims,h),_=te("result",i.dataType,i.dims,h),y=g.type.value,$="f32"===e0(i.dataType)?`var threadMax = ${y}(-3.4028234663852886e+38f);`:`var threadMax = ${y}(-65504.0h);`,b=e.compute({name:"Softmax",shaderCache:{hint:`${h};${m}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:d,dataType:i.dataType}],dispatchGroup:{x:c},programUniforms:[{type:6,data:f}]}),getShaderSource:e=>{var t,i;return`
      var<workgroup> rowMaxShared : ${y};
      var<workgroup> rowSumShared : ${y};
      var<workgroup> threadShared : array<${y}, ${m}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${y} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${y}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${e.registerUniform("packedCols","i32").declareVariables(g,_)}
      ${e.mainStart(m)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${m};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${$}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${y}(${t="threadShared[0]",4===(i=h)?`max(max(${t}.x, ${t}.y), max(${t}.z, ${t}.w))`:2===i?`max(${t}.x, ${t}.y)`:3===i?`max(max(${t}.x, ${t}.y), ${t}.z)`:t});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${y}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${y}(${e8("threadShared[0]",h)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${y}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`}},{inputs:[i],outputs:[u?-1:0]})[0],u&&e.compute(tn(b,l),{inputs:[b]})},aB=e=>eX({axis:e.axis})}}),nF=s$({"web/lib/wasm/jsep/webgpu/ops/tile.ts"(){"use strict";sQ(),sJ(),s8(),aA=e=>Array.from(e.getBigInt64Array(),Number),aR=e=>{let t,i,r,a,s,n,o;var u,l,d=e.inputs;if(!d||2!==d.length)throw Error("Tile requires 2 inputs.");if(1!==d[0].dataType&&10!==d[0].dataType&&6!==d[0].dataType&&12!==d[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==d[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==d[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(aA(d[1]).length!==d[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor");e.compute((t=(u=e.inputs)[0].dims,r=((e,t)=>{let i=[];for(let r=0;r<e.length;++r)i.push(e[r]*t[r]);return i})(t,i=null==l?aA(u[1]):l),a=ex.size(r),s=u[0].dataType,n=e9("input",s,t.length),o=te("output",s,r.length),{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:r,dataType:u[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...e2(u[0].dims,r)]}),getShaderSource:e=>`
      const inputShape = ${n.indices(...t)};
      ${e.registerUniform("output_size","u32").declareVariables(n,o)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${o.offsetToIndices("global_idx")};
      var input_indices: ${n.type.indices};
      for (var i = 0; i < ${t.length}; i++) {
        let input_dim_i = ${n.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${o.indicesGet("output_indices","i")}  % input_dim_i;

        ${n.indicesSet("input_indices","i","input_dim_value")}
      }
      ${o.setByOffset("global_idx",n.getByIndices("input_indices"))}
    }`}),{inputs:[0]})}}}),nK=s$({"web/lib/wasm/jsep/webgpu/ops/where.ts"(){"use strict";sQ(),sJ(),s8(),aM=e=>{e.compute((e=>{let t=e[1].dims,i=e[2].dims,r=e[0].dims,a=e[1].dataType,s=!(ex.areEqual(t,i)&&ex.areEqual(i,r)),n=t,o=ex.size(t);if(s){let e=ev.calcShape(ev.calcShape(t,i,!1),r,!1);if(!e)throw Error("Can't perform where op on the given tensors");n=e,o=ex.size(n)}let u=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:t=>((e,t,i,r,a)=>{let s,n=te("output_data",a,i.length,4),o=e9("a_data",t[1].dataType,t[1].dims.length,4),u=e9("b_data",t[2].dataType,t[2].dims.length,4),l=e9("c_data",t[0].dataType,t[0].dims.length,4),d=(e,t,i)=>`select(${t}, ${e}, ${i})`;if(r){let e=(e,t,i="")=>{let r=`a_data[index_a${t}][component_a${t}]`,a=`b_data[index_b${t}][component_b${t}]`,s=`bool(c_data[index_c${t}] & (0xffu << (component_c${t} * 8)))`;return`
            let output_indices${t} = ${n.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offset_a${t} = ${o.broadcastedIndicesToOffset(`output_indices${t}`,n)};
            let offset_b${t} = ${u.broadcastedIndicesToOffset(`output_indices${t}`,n)};
            let offset_c${t} = ${l.broadcastedIndicesToOffset(`output_indices${t}`,n)};
            let index_a${t} = offset_a${t} / 4u;
            let index_b${t} = offset_b${t} / 4u;
            let index_c${t} = offset_c${t} / 4u;
            let component_a${t} = offset_a${t} % 4u;
            let component_b${t} = offset_b${t} % 4u;
            let component_c${t} = offset_c${t} % 4u;
            ${e}[${t}] = ${i}(${d(r,a,s)});
          `};s=9===a?`
            var data = vec4<u32>(0);
            ${e("data",0,"u32")}
            ${e("data",1,"u32")}
            ${e("data",2,"u32")}
            ${e("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${e("output_data[global_idx]",0)}
            ${e("output_data[global_idx]",1)}
            ${e("output_data[global_idx]",2)}
            ${e("output_data[global_idx]",3)}
          `}else s=n.setByOffset("global_idx",d(o.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,o,u,n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${s}
      }`})(t,e,n,s,a),getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:u},...e2(r,t,i,n)]})}})(e.inputs))}}}),nZ=s$({"web/lib/wasm/jsep/webgpu/op-resolve-rules.ts"(){"use strict";ne(),nt(),ni(),nr(),ns(),nn(),no(),ng(),ny(),n$(),nb(),nw(),nv(),nx(),nk(),nS(),nI(),nT(),nE(),nz(),nA(),nR(),nM(),nD(),nP(),nC(),nq(),nN(),nU(),nV(),nL(),s9(),nG(),nB(),nW(),nj(),nH(),nO(),nF(),s5(),na(),nK(),aD=new Map([["Abs",[tQ]],["Acos",[tX]],["Acosh",[tY]],["Add",[iO]],["ArgMax",[tL,tG]],["ArgMin",[tV,tG]],["Asin",[tJ]],["Asinh",[t0]],["Atan",[t1]],["Atanh",[t2]],["Attention",[tH]],["AveragePool",[au,ao]],["BatchNormalization",[tF]],["BiasAdd",[tK]],["BiasSplitGelu",[iz]],["Cast",[t4,t3]],["Ceil",[t8]],["Clip",[t6]],["Concat",[iV,iL]],["Conv",[ra,ri]],["ConvTranspose",[rp,rl]],["Cos",[t5]],["Cosh",[t7]],["CumSum",[rc,rh]],["DepthToSpace",[rf,rm]],["DequantizeLinear",[a_,ay]],["Div",[iB]],["Einsum",[rv,rx]],["Elu",[ie,t9]],["Equal",[iA]],["Erf",[ii]],["Exp",[ir]],["Expand",[rS]],["FastGelu",[rI]],["Floor",[ia]],["FusedConv",[ra,ri]],["Gather",[rE,rT]],["GatherElements",[rR,rA]],["GatherBlockQuantized",[rO,rB]],["GatherND",[rz,rC]],["Gelu",[is]],["Gemm",[rD,rM]],["GlobalAveragePool",[ap,ad]],["GlobalMaxPool",[ag,am]],["Greater",[iP]],["GreaterOrEqual",[iN]],["GridSample",[rL,rG]],["GroupQueryAttention",[r2]],["HardSigmoid",[im,ih]],["InstanceNormalization",[r4]],["LayerNormalization",[r6]],["LeakyRelu",[io,t9]],["Less",[iq]],["LessOrEqual",[iU]],["Log",[iI]],["MatMul",[r8]],["MatMulNBits",[r5,r7]],["MaxPool",[ah,af]],["Mul",[iR]],["MultiHeadAttention",[rK,rj]],["Neg",[il]],["Not",[iu]],["Pad",[r9]],["Pow",[iM]],["QuickGelu",[iE,t9]],["Range",[a$]],["Reciprocal",[id]],["ReduceMin",[tM]],["ReduceMean",[tC]],["ReduceMax",[tR]],["ReduceSum",[tP]],["ReduceProd",[tD]],["ReduceL1",[tO]],["ReduceL2",[tB]],["ReduceLogSum",[tN]],["ReduceLogSumExp",[tA]],["ReduceSumSquare",[tq]],["Relu",[ip]],["Resize",[ak,aS]],["RotaryEmbedding",[rJ]],["ScatterND",[aw,ab]],["Sigmoid",[ic]],["Sin",[ig]],["Sinh",[i_]],["Slice",[az,aC]],["SkipLayerNormalization",[aI]],["Split",[rQ,rX]],["Sqrt",[iy]],["Softmax",[aO,aB]],["Sub",[iD]],["Tan",[i$]],["Tanh",[iw]],["ThresholdedRelu",[iS,t9]],["Tile",[aR]],["Transpose",[to,tu]],["Where",[aM]]])}}),nQ=s$({"web/lib/wasm/jsep/webgpu/program-manager.ts"(){"use strict";sV(),sY(),s8(),aP=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,i,r,a){E(e.programInfo.name);let s=this.backend.device,n=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let o=[];for(let e of t)o.push({binding:o.length,resource:{buffer:e.buffer}});for(let e of i)o.push({binding:o.length,resource:{buffer:e.buffer}});a&&o.push({binding:o.length,resource:a});let u=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if("capturing"===this.backend.sessionStatus){let t={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(t)}n.setPipeline(e.computePipeline),n.setBindGroup(0,u),n.dispatchWorkgroups(...r),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),z(e.programInfo.name)}dispose(){}build(e,t){E(e.name);let i=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(e=>{i.features.has(e.feature)&&r.push(`enable ${e.extension};`)});let a=ta(t,this.backend.device.limits),s=e.getShaderSource(a),n=`${r.join("\n")}
${a.additionalImplementations}
${s}`,o=i.createShaderModule({code:n,label:e.name});eb("verbose",()=>`[WebGPU] ${e.name} shader code: ${n}`);let u=i.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return z(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t="number"==typeof e?e:e.x,i="number"==typeof e?1:e.y||1,r="number"==typeof e?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&i<=a&&r<=a)return[t,i,r];let s=t*i*r,n=Math.ceil(Math.sqrt(s));if(!(n>a))return[n,n,1];if((n=Math.ceil(Math.cbrt(s)))>a)throw Error("Total dispatch size exceeds WebGPU maximum.");return[n,n,n]}}}}),nX={};sb(nX,{WebGpuBackend:()=>aN});var nY=s$({"web/lib/wasm/jsep/backend-webgpu.ts"(){"use strict";sV(),sQ(),sY(),s0(),s4(),nZ(),nQ(),aq=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},aN=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let i=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:i},a=e=>t.features.has(e)&&i.push(e)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(r),this.adapterInfo=new aq(t.info||await t.requestAdapterInfo()),this.gpuDataManager=eZ(this),this.programManager=new aP(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,e$(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){void 0!==this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};"at-passes"===this.queryType&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let e;this.commandEncoder&&(E(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),e=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),i=this.pendingQueries.get(e);for(let e=0;e<t.length/2;e++){let r=i[e],a=r.kernelId,s=this.kernels.get(a),n=s.kernelType,o=s.kernelName,u=r.programName,l=r.inputTensorViews,d=r.outputTensorViews,p=t[2*e],c=t[2*e+1];void 0===this.queryTimeBase&&(this.queryTimeBase=p);let h=Number(p-this.queryTimeBase),f=Number(c-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(f))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:l.map(e=>({dims:e.dims,dataType:eu(e.dataType)})),outputsMetadata:d.map(e=>({dims:e.dims,dataType:eu(e.dataType)})),kernelId:a,kernelType:n,kernelName:o,programName:u,startTime:h,endTime:f});else{let e="";l.forEach((t,i)=>{e+=`input[${i}]: [${t.dims}] | ${eu(t.dataType)}, `});let t="";d.forEach((e,i)=>{t+=`output[${i}]: [${e.dims}] | ${eu(e.dataType)}, `}),console.log(`[profiling] kernel "${a}|${n}|${o}|${u}" ${e}${t}start time: ${h} ns, execution time: ${f-h} ns`)}I("GPU",`${u}::${p}::${c}`)}e.unmap(),this.pendingQueries.delete(e)}),z())}run(e,t,i,r,a,s){let n,o;E(e.name);let u=[];for(let e=0;e<t.length;++e){let i=t[e].data;if(0===i)continue;let r=this.gpuDataManager.get(i);if(!r)throw Error(`no GPU data for input: ${i}`);u.push(r)}let{outputs:l,dispatchGroup:d,programUniforms:p}=e.getRunData(t),c=0===i.length?l.map((e,t)=>t):i;if(c.length!==l.length)throw Error(`Output size ${c.length} must be equal to ${l.length}.`);let h=[],f=[];for(let e=0;e<l.length;++e){if(!Number.isInteger(c[e])||c[e]<-3||c[e]>=s)throw Error(`Invalid output index: ${c[e]}`);if(-3===c[e])continue;let t=-1===c[e],i=-2===c[e],n=t||i?a(l[e].dataType,l[e].dims):r(c[e],l[e].dataType,l[e].dims);if(h.push(n),0===n.data)continue;let o=this.gpuDataManager.get(n.data);if(!o)throw Error(`no GPU data for output: ${n.data}`);if(t&&this.temporaryData.push(o),i){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(o)}f.push(o)}if(u.length!==t.length||f.length!==h.length){if(0===f.length)return z(e.name),h;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(p){let e=0,t=[];p.forEach(i=>{let r,a,s="number"==typeof i.data?[i.data]:i.data;if(0===s.length)return;let n=10===i.type?2:4;10===i.type?(a=s.length>4?16:s.length>2?8:s.length*n,r=s.length>4?16:n*s.length):(a=s.length<=2?s.length*n:16,r=16),e=Math.ceil(e/a)*a,t.push(e);let o=10===i.type?8:4;e+=s.length>4?Math.ceil(s.length/o)*r:s.length*n});let i=new ArrayBuffer(e=16*Math.ceil(e/16));p.forEach((e,r)=>{let a=t[r],s="number"==typeof e.data?[e.data]:e.data;if(6===e.type)new Int32Array(i,a,s.length).set(s);else if(12===e.type)new Uint32Array(i,a,s.length).set(s);else if(10===e.type)new Uint16Array(i,a,s.length).set(s);else if(1===e.type)new Float32Array(i,a,s.length).set(s);else throw Error(`Unsupported uniform type: ${eu(e.type)}`)});let r=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(r.buffer,0,i,0,e),this.gpuDataManager.release(r.id),n={offset:0,size:e,buffer:r.buffer}}let m=this.programManager.normalizeDispatchGroupSize(d),g=1===m[1]&&1===m[2],_=(o=e.name,e.shaderCache?.hint&&(o+="["+e.shaderCache.hint+"]"),o+=":"+g+`:${((e,t)=>{if(t.length!==e.length)throw Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let i=[];for(let r=0;r<e.length;++r){let a=e[r].dataType;switch(t[r]){case"none":i.push("");break;case"type":i.push(`${a}`);break;case"rank":{let t=e[r].dims.length;i.push(`${a};${t}`);break}case"dims":{let t=e[r].dims.join(",");i.push(`${a};${t}`);break}default:throw Error(`unsupported input dependency: ${t[r]}`)}}return i.join("|")})(t,e.shaderCache?.inputDependencies??Array(t.length).fill("dims"))}`),y=this.programManager.getArtifact(_);if(y||(y=this.programManager.build(e,m),this.programManager.setArtifact(_,y),eb("info",()=>`[artifact] key: ${_}, programName: ${e.name}`)),p&&y.uniformVariablesInfo){if(p.length!==y.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${y.uniformVariablesInfo.length}, got ${p.length} in program "${y.programInfo.name}".`);for(let e=0;e<p.length;e++){let t=p[e],i=t.type,r="number"==typeof t.data?1:t.data.length,[a,s]=y.uniformVariablesInfo[e];if(i!==a||r!==s)throw Error(`Uniform variable ${e} mismatch: expect type ${a} with size ${s}, got type ${i} with size ${r} in program "${y.programInfo.name}".`)}}if(eb("info",()=>`[ProgramManager] run "${e.name}" (key=${_}) with ${m[0]}x${m[1]}x${m[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let e={kernelId:this.currentKernelId,programName:y.programInfo.name,inputTensorViews:t,outputTensorViews:h};this.pendingKernels.push(e),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(y,u,f,m,n),z(e.name),h}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,i,r){let a=aD.get(e);if(!a)throw Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:r,kernelEntry:a[0],attributes:[a[1],i]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let e of t)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,i){let r=this.kernels.get(e);if(!r)throw Error(`kernel not created: ${e}`);let a=r.kernelType,s=r.kernelName,n=r.kernelEntry,o=r.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),eb("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),n(t,o[1]),0}catch(e){return i.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${e}`)),1}finally{for(let e of(u&&i.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${a}] ${s}": ${e.message}`:null)),this.temporaryData))this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,i,r){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let s=a.get(t),n=this.gpuDataManager.registerExternalBuffer(i,r,s);return a.set(t,[n,i]),n}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,i){return async()=>{let r=await eF(this,e,t);return eE(r.buffer,i)}}writeTimestamp(e){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(void 0===this.env.trace?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&void 0===this.querySet&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){eb("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){eb("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){eb("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),i=e.length;this.pendingKernels=[];for(let r=0;r<i;r++){let i=this.getComputePassEncoder(),a=e[r];this.writeTimestamp(2*this.pendingDispatchNumber),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}}),nJ={};sb(nJ,{init:()=>aL});var n0=s$({"web/lib/wasm/jsep/init.ts"(){"use strict";sQ(),sY(),sJ(),s2(),aU=class e{constructor(e,t,i,r){this.module=e,this.dataType=t,this.data=i,this.dims=r}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let e=ex.size(this.dims);return 0===e?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let e=ex.size(this.dims);return 0===e?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let e=ex.size(this.dims);return 0===e?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let e=ex.size(this.dims);return 0===e?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(t){if(ex.size(t)!==ex.size(this.dims))throw Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},aV=class{constructor(e,t,i){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,a=i/e.PTR_SIZE,s=4===r?"i32":"i64";this.opKernelContext=Number(e.getValue(r*a++,s));let n=Number(e.getValue(r*a++,s));this.outputCount=Number(e.getValue(r*a++,s)),this.customDataOffset=Number(e.getValue(r*a++,"*")),this.customDataSize=Number(e.getValue(r*a++,s));let o=[];for(let t=0;t<n;t++){let t=Number(e.getValue(r*a++,s)),i=Number(e.getValue(r*a++,"*")),n=Number(e.getValue(r*a++,s)),u=[];for(let t=0;t<n;t++)u.push(Number(e.getValue(r*a++,s)));o.push(new aU(e,t,i,u))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let i=t?.inputs?.map(e=>"number"==typeof e?this.inputs[e]:e)??this.inputs,r=t?.outputs??[],a=(e,t,i)=>new aU(this.module,t,this.output(e,i),i),s=(e,t)=>{let i=el(e,t);if(!i)throw Error(`Unsupported data type: ${e}`);let r=i>0?this.backend.gpuDataManager.create(i).id:0;return new aU(this.module,e,r,t)};return this.backend.run(e,i,r,a,s,this.outputCount)}output(e,t){let i=this.module.stackSave();try{let i=this.module.PTR_SIZE,r=4===i?"i32":"i64",a=this.module.stackAlloc((1+t.length)*i);this.module.setValue(a,t.length,r);for(let e=0;e<t.length;e++)this.module.setValue(a+i*(e+1),t[e],r);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(i){throw Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(i)}}},aL=async(e,t,i,r)=>{let a=t.jsepInit;if(!a)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===e){let e=new(nY(),sw(nX)).WebGpuBackend;await e.initialize(i,r),a("webgpu",[e,t=>e.alloc(Number(t)),t=>e.free(t),(i,r,a,s=!1)=>{if(s)eb("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(i)}, dst=${Number(r)}, size=${Number(a)}`),e.memcpy(Number(i),Number(r));else{eb("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(i)}, gpuDataId=${Number(r)}, size=${Number(a)}`);let s=t.HEAPU8.subarray(Number(i>>>0),Number(i>>>0)+Number(a));e.upload(Number(r),s)}},async(i,r,a)=>{eb("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${i}, dataOffset=${r}, size=${a}`),await e.download(Number(i),()=>t.HEAPU8.subarray(Number(r)>>>0,Number(r+a)>>>0))},(i,r,a)=>e.createKernel(i,Number(r),a,t.UTF8ToString(t._JsepGetNodeName(Number(r)))),t=>e.releaseKernel(t),(i,r,a,s)=>{eb("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${a}, kernel=${i}, contextDataOffset=${r}`);let n=new aV(t,e,Number(r));return e.computeKernel(Number(i),n,s)},()=>e.captureBegin(),()=>e.captureEnd(),()=>e.replay()])}else{let e=new eV(i);a("webnn",[e,()=>e.reserveTensorId(),t=>e.releaseTensorId(t),async(t,i,r,a,s)=>e.ensureTensor(t,i,r,a,s),(t,i)=>{e.uploadTensor(t,i)},async(t,i)=>e.downloadTensor(t,i),(t,i)=>e.registerMLContext(t,i),!!i.trace])}}}}),n1=s$({"web/lib/wasm/wasm-core-impl.ts"(){"use strict";sV(),sK(),sZ(),sQ(),sH(),sF(),sX(),aG=async e=>{var t,i;t=e.wasm.numThreads,i=ep(e.logLevel),0!==J()._OrtInit(t,i)&&ei("Can't initialize onnxruntime.")},aW=async(e,t)=>{J().asyncInit?.();let i=e.webgpu.adapter;if("webgpu"===t){if("u"<typeof navigator||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(i){if("object"!=typeof i.limits||"object"!=typeof i.features||"function"!=typeof i.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=e.webgpu.powerPreference;if(void 0!==t&&"low-power"!==t&&"high-performance"!==t)throw Error(`Invalid powerPreference setting: "${t}"`);let r=e.webgpu.forceFallbackAdapter;if(void 0!==r&&"boolean"!=typeof r)throw Error(`Invalid forceFallbackAdapter setting: "${r}"`);if(!(i=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:r})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===t&&("u"<typeof navigator||!navigator.ml))throw Error("WebNN is not supported in current environment");{let r=(n0(),sw(nJ)).init;"webgpu"===t&&await r("webgpu",J(),e,i),"webnn"===t&&await r("webnn",J(),e)}},aj=new Map,aH=(e,t)=>{let i=J(),r=i.stackSave(),a=0;try{let r=i.PTR_SIZE,s=i.stackAlloc(2*r),n=i._OrtGetInputOutputMetadata(e,t,s,s+r);0!==n&&ei("Can't get session input/output metadata.");let o=Number(i.getValue(s,"*"));a=Number(i.getValue(s+r,"*"));let u=i.HEAP32[a/4];if(0===u)return[o,0];let l=i.HEAPU32[a/4+1],d=[];for(let e=0;e<l;e++){let t=Number(i.getValue(a+8+e*r,"*"));d.push(0!==t?i.UTF8ToString(t):Number(i.getValue(a+8+(e+l)*r,"*")))}return[o,u,d]}finally{i.stackRestore(r),0!==a&&i._OrtFree(a)}},aF=e=>{let t=J(),i=t._malloc(e.byteLength);if(0===i)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,i),[i,e.byteLength]},aK=async(e,t)=>{let i,r,a=J();Array.isArray(e)?[i,r]=e:e.buffer===a.HEAPU8.buffer?[i,r]=[e.byteOffset,e.byteLength]:[i,r]=aF(e);let s=0,n=0,o=0,u=[],l=[],d=[];try{if([n,u]=await en(t),t?.externalData&&a.mountExternalData){let e=[];for(let i of t.externalData){let t="string"==typeof i?i:i.path;e.push(em("string"==typeof i?i:i.data).then(e=>{a.mountExternalData(t,e)}))}await Promise.all(e)}for(let e of t?.executionProviders??[]){let t="string"==typeof e?e:e.name;if("webnn"===t){if(a.shouldTransferToMLTensor=!1,"string"!=typeof e){let t=e?.context,i=e?.gpuDevice,r=e?.deviceType,s=e?.powerPreference;t?a.currentContext=t:i?a.currentContext=await a.webnnCreateMLContext(i):a.currentContext=await a.webnnCreateMLContext({deviceType:r,powerPreference:s})}else a.currentContext=await a.webnnCreateMLContext();break}}s=await a._OrtCreateSession(i,r,n),a.webgpuOnCreateSession?.(s),0===s&&ei("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(s,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[e,p]=(e=>{let t=J(),i=t.stackSave();try{let i=t.PTR_SIZE,r=t.stackAlloc(2*i),a=t._OrtGetInputOutputCount(e,r,r+i);0!==a&&ei("Can't get session input/output count.");let s=4===i?"i32":"i64";return[Number(t.getValue(r,s)),Number(t.getValue(r+i,s))]}finally{t.stackRestore(i)}})(s),c=!!t?.enableGraphCapture,h=[],f=[],m=[],g=[],_=[];for(let t=0;t<e;t++){let[e,i,r]=aH(s,t);0===e&&ei("Can't get an input name."),l.push(e);let n=a.UTF8ToString(e);h.push(n),m.push(0===i?{name:n,isTensor:!1}:{name:n,isTensor:!0,type:eu(i),shape:r})}for(let i=0;i<p;i++){let[r,n,o]=aH(s,i+e);0===r&&ei("Can't get an output name."),d.push(r);let u=a.UTF8ToString(r);f.push(u),g.push(0===n?{name:u,isTensor:!1}:{name:u,isTensor:!0,type:eu(n),shape:o});{if(c&&t?.preferredOutputLocation===void 0){_.push("gpu-buffer");continue}let e="string"==typeof t?.preferredOutputLocation?t.preferredOutputLocation:t?.preferredOutputLocation?.[u]??"cpu",i=a.webnnIsGraphOutput;if("cpu"===e&&i&&i(s,u)){_.push("ml-tensor-cpu-output");continue}if("cpu"!==e&&"cpu-pinned"!==e&&"gpu-buffer"!==e&&"ml-tensor"!==e)throw Error(`Not supported preferred output location: ${e}.`);if(c&&"gpu-buffer"!==e)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push(e)}}let y=null;return _.some(e=>"gpu-buffer"===e||"ml-tensor"===e||"ml-tensor-cpu-output"===e)&&(o=a._OrtCreateBinding(s),0===o&&ei("Can't create IO binding."),y={handle:o,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(e=>"ml-tensor-cpu-output"===e?"ml-tensor":e).map(e=>ef(e))}),aj.set(s,[s,l,d,y,c,!1]),[s,h,f,m,g]}catch(e){throw l.forEach(e=>a._OrtFree(e)),d.forEach(e=>a._OrtFree(e)),0!==o&&0!==a._OrtReleaseBinding(o)&&ei("Can't release IO binding."),0!==s&&0!==a._OrtReleaseSession(s)&&ei("Can't release session."),e}finally{a._free(i),0!==n&&0!==a._OrtReleaseSessionOptions(n)&&ei("Can't release session options."),u.forEach(e=>a._free(e)),a.unmountExternalData?.()}},aZ=e=>{let t=J(),i=aj.get(e);if(!i)throw Error(`cannot release session. invalid session id: ${e}`);let[r,a,s,n,o]=i;n&&(o&&0!==t._OrtClearBoundOutputs(n.handle)&&ei("Can't clear bound outputs."),0!==t._OrtReleaseBinding(n.handle)&&ei("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(e=>t._OrtFree(e)),s.forEach(e=>t._OrtFree(e)),0!==t._OrtReleaseSession(r)&&ei("Can't release session."),aj.delete(e)},aQ=async(e,t,i,r,a,s,n=!1)=>{let o,u;if(!e)return void t.push(0);let l=J(),d=l.PTR_SIZE,p=e[0],c=e[1],h=e[3],f=h;if("string"===p&&("gpu-buffer"===h||"ml-tensor"===h))throw Error("String tensor is not supported on GPU.");if(n&&"gpu-buffer"!==h)throw Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if("gpu-buffer"===h){let t=e[2].gpuBuffer;u=el(eo(p),c);{let e=l.jsepRegisterBuffer;if(!e)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');o=e(r,s,t,u)}}else if("ml-tensor"===h){let t=e[2].mlTensor;u=el(eo(p),c);let i=l.webnnRegisterMLTensor;if(!i)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');o=i(r,t,eo(p),c)}else{let t=e[2];if(Array.isArray(t)){u=d*t.length,o=l._malloc(u),i.push(o);for(let e=0;e<t.length;e++){if("string"!=typeof t[e])throw TypeError(`tensor data at index ${e} is not a string`);l.setValue(o+e*d,ee(t[e],i),"*")}}else{let e=l.webnnIsGraphInput,s=l.webnnIsGraphOutput;if("string"!==p&&e&&s){let n=l.UTF8ToString(a);if(e(r,n)||s(r,n)){let e=eo(p);u=el(e,c),f="ml-tensor";let i=l.webnnCreateTemporaryTensor,a=l.webnnUploadTensor;if(!i||!a)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let s=await i(r,e,c);a(s,new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),o=s}else u=t.byteLength,o=l._malloc(u),i.push(o),l.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,u),o)}else u=t.byteLength,o=l._malloc(u),i.push(o),l.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,u),o)}}let m=l.stackSave(),g=l.stackAlloc(4*c.length);try{c.forEach((e,t)=>l.setValue(g+t*d,e,4===d?"i32":"i64"));let e=l._OrtCreateTensor(eo(p),o,u,g,c.length,ef(f));0===e&&ei(`Can't create tensor for input/output. session=${r}, index=${s}.`),t.push(e)}finally{l.stackRestore(m)}},aX=async(e,t,i,r,a,s)=>{let n=J(),o=n.PTR_SIZE,u=aj.get(e);if(!u)throw Error(`cannot run inference. invalid session id: ${e}`);let l=u[0],d=u[1],p=u[2],c=u[3],h=u[4],f=u[5],m=t.length,g=r.length,_=0,y=[],$=[],b=[],w=[],v=[],x=n.stackSave(),k=n.stackAlloc(m*o),S=n.stackAlloc(m*o),I=n.stackAlloc(g*o),T=n.stackAlloc(g*o);try{let u;[_,y]=er(s),C("wasm prepareInputOutputTensor");for(let r=0;r<m;r++)await aQ(i[r],$,w,e,d[t[r]],t[r],h);for(let t=0;t<g;t++)await aQ(a[t],b,w,e,p[r[t]],m+r[t],h);O("wasm prepareInputOutputTensor");for(let e=0;e<m;e++)n.setValue(k+e*o,$[e],"*"),n.setValue(S+e*o,d[t[e]],"*");for(let e=0;e<g;e++)n.setValue(I+e*o,b[e],"*"),n.setValue(T+e*o,p[r[e]],"*");if(c&&!f){let{handle:i,outputPreferredLocations:s,outputPreferredLocationsEncoded:o}=c;if(d.length!==m)throw Error(`input count from feeds (${m}) is expected to be always equal to model's input count (${d.length}).`);C("wasm bindInputsOutputs");for(let r=0;r<m;r++){let a=t[r],s=await n._OrtBindInput(i,d[a],$[r]);0!==s&&ei(`Can't bind input[${r}] for session=${e}.`)}for(let t=0;t<g;t++){let u=r[t];if(a[t]?.[3]){v.push(b[t]);let r=n._OrtBindOutput(i,p[u],b[t],0);0!==r&&ei(`Can't bind pre-allocated output[${t}] for session=${e}.`)}else{let r=n._OrtBindOutput(i,p[u],0,o[u]);0!==r&&ei(`Can't bind output[${t}] to ${s[t]} for session=${e}.`)}}O("wasm bindInputsOutputs"),aj.set(e,[l,d,p,c,h,!0])}n.jsepOnRunStart?.(l),n.webnnOnRunStart?.(l),u=c?await n._OrtRunWithBinding(l,c.handle,g,I,_):await n._OrtRun(l,S,k,m,T,g,I,_),0!==u&&ei("failed to call OrtRun().");let x=[],E=[];C("wasm ProcessOutputTensor");for(let t=0;t<g;t++){let i=Number(n.getValue(I+t*o,"*"));if(i===b[t]||v.includes(b[t])){x.push(a[t]),i!==b[t]&&0!==n._OrtReleaseTensor(i)&&ei("Can't release tensor.");continue}let s=n.stackSave(),u=n.stackAlloc(4*o),l=!1,d,p=0;try{let a=n._OrtGetTensorData(i,u,u+o,u+2*o,u+3*o);0!==a&&ei(`Can't access output tensor data on index ${t}.`);let s=4===o?"i32":"i64",h=Number(n.getValue(u,s));p=n.getValue(u+o,"*");let f=n.getValue(u+2*o,"*"),m=Number(n.getValue(u+3*o,s)),g=[];for(let e=0;e<m;e++)g.push(Number(n.getValue(f+e*o,s)));0!==n._OrtFree(f)&&ei("Can't free memory for tensor dims.");let _=g.reduce((e,t)=>e*t,1);d=eu(h);let y=c?.outputPreferredLocations[r[t]];if("string"===d){if("gpu-buffer"===y||"ml-tensor"===y)throw Error("String tensor is not supported on GPU.");let e=[];for(let t=0;t<_;t++){let i=n.getValue(p+t*o,"*"),r=n.getValue(p+(t+1)*o,"*"),a=t===_-1?void 0:r-i;e.push(n.UTF8ToString(i,a))}x.push([d,g,e,"cpu"])}else if("gpu-buffer"===y&&_>0){let e=n.jsepGetBuffer;if(!e)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let t=e(p),r=el(h,_);if(void 0===r||!ec(d))throw Error(`Unsupported data type: ${d}`);l=!0,x.push([d,g,{gpuBuffer:t,download:n.jsepCreateDownloader(t,r,d),dispose:()=>{0!==n._OrtReleaseTensor(i)&&ei("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===y&&_>0){let t=n.webnnEnsureTensor,r=n.webnnIsGraphInputOutputTypeSupported;if(!t||!r)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');let a=el(h,_);if(void 0===a||!eh(d))throw Error(`Unsupported data type: ${d}`);if(!r(e,d,!1))throw Error(`preferredLocation "ml-tensor" for ${d} output is not supported by current WebNN Context.`);let s=await t(e,p,h,g,!1);l=!0,x.push([d,g,{mlTensor:s,download:n.webnnCreateMLTensorDownloader(p,d),dispose:()=>{n.webnnReleaseTensorId(p),n._OrtReleaseTensor(i)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===y&&_>0){let e=n.webnnCreateMLTensorDownloader(p,d)(),t=x.length;l=!0,E.push((async()=>{let r=[t,await e];return n.webnnReleaseTensorId(p),n._OrtReleaseTensor(i),r})()),x.push([d,g,[],"cpu"])}else{let e=new(ed(d))(_);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(n.HEAPU8.subarray(p,p+e.byteLength)),x.push([d,g,e,"cpu"])}}finally{n.stackRestore(s),"string"===d&&p&&n._free(p),l||n._OrtReleaseTensor(i)}}for(let[t,i]of(c&&!h&&(0!==n._OrtClearBoundOutputs(c.handle)&&ei("Can't clear bound outputs."),aj.set(e,[l,d,p,c,h,!1])),await Promise.all(E)))x[t][2]=i;return O("wasm ProcessOutputTensor"),x}finally{n.webnnOnRunEnd?.(l),n.stackRestore(x),$.forEach(e=>n._OrtReleaseTensor(e)),b.forEach(e=>n._OrtReleaseTensor(e)),w.forEach(e=>n._free(e)),0!==_&&n._OrtReleaseRunOptions(_),y.forEach(e=>n._free(e))}},aY=e=>{let t=J(),i=aj.get(e);if(!i)throw Error("invalid session id");let r=i[0],a=t._OrtEndProfiling(r);0===a&&ei("Can't get an profile file name."),t._OrtFree(a)},aJ=e=>{let t=[];for(let i of e){let e=i[2];!Array.isArray(e)&&"buffer"in e&&t.push(e.buffer)}return t}}}),n2=s$({"web/lib/wasm/proxy-wrapper.ts"(){"use strict";sV(),n1(),sH(),sj(),a0=()=>!!l.wasm.proxy&&"u">typeof document,a2=!1,a3=!1,a4=!1,a5=new Map,a7=(e,t)=>{let i=a5.get(e);i?i.push(t):a5.set(e,[t])},a9=()=>{if(a2||!a3||a4||!a1)throw Error("worker not ready")},se=e=>{switch(e.data.type){case"init-wasm":a2=!1,e.data.err?(a4=!0,a8[1](e.data.err)):(a3=!0,a8[0]()),a6&&(URL.revokeObjectURL(a6),a6=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=a5.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out)}}},st=async()=>{if(!a3){if(a2)throw Error("multiple calls to 'initWasm()' detected.");if(a4)throw Error("previous call to 'initWasm()' failed.");if(a2=!0,a0())return new Promise((e,t)=>{a1?.terminate(),j().then(([i,r])=>{try{(a1=r).onerror=e=>t(e),a1.onmessage=se,a8=[e,t];let a={type:"init-wasm",in:l};if(!a.in.wasm.wasmPaths&&i){let e=U();e&&(a.in.wasm.wasmPaths=e)}a1.postMessage(a),a6=i}catch(e){t(e)}},t)});try{await Y(l.wasm),await aG(l),a3=!0}catch(e){throw a4=!0,e}finally{a2=!1}}},si=async e=>{if(a0())return a9(),new Promise((t,i)=>{a7("init-ep",[t,i]);let r={type:"init-ep",in:{epName:e,env:l}};a1.postMessage(r)});await aW(l,e)},sr=async e=>a0()?(a9(),new Promise((t,i)=>{a7("copy-from",[t,i]),a1.postMessage({type:"copy-from",in:{buffer:e}},[e.buffer])})):aF(e),sa=async(e,t)=>{if(!a0())return aK(e,t);if(t?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return a9(),new Promise((i,r)=>{a7("create",[i,r]);let a={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),a1.postMessage(a,s)})},ss=async e=>{if(a0())return a9(),new Promise((t,i)=>{a7("release",[t,i]),a1.postMessage({type:"release",in:e})});aZ(e)},sn=async(e,t,i,r,a,s)=>{if(!a0())return aX(e,t,i,r,a,s);if(i.some(e=>"cpu"!==e[3]))throw Error("input tensor on GPU is not supported for proxy.");if(a.some(e=>e))throw Error("pre-allocated output tensor is not supported for proxy.");return a9(),new Promise((a,n)=>{a7("run",[a,n]),a1.postMessage({type:"run",in:{sessionId:e,inputIndices:t,inputs:i,outputIndices:r,options:s}},aJ(i))})},so=async e=>{if(a0())return a9(),new Promise((t,i)=>{a7("end-profiling",[t,i]),a1.postMessage({type:"end-profiling",in:e})});aY(e)}}}),n3=s$({"web/lib/wasm/session-handler-inference.ts"(){"use strict";sV(),n2(),sQ(),sL(),sX(),su=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${e.location} for ${t()}`)}},sl=e=>{switch(e[3]){case"cpu":return new S(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!ec(t))throw Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:i,download:r,dispose:a}=e[2];return S.fromGpuBuffer(i,{dataType:t,dims:e[1],download:r,dispose:a})}case"ml-tensor":{let t=e[0];if(!eh(t))throw Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:i,download:r,dispose:a}=e[2];return S.fromMLTensor(i,{dataType:t,dims:e[1],download:r,dispose:a})}default:throw Error(`invalid data location: ${e[3]}`)}},sd=class{async fetchModelAndCopyToWasmMemory(e){return sr(await em(e))}async loadModel(e,t){let i;E(),i="string"==typeof e?R?await em(e):await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await sa(i,t),z()}async dispose(){return ss(this.sessionId)}async run(e,t,i){E();let r=[],a=[];Object.entries(e).forEach(e=>{let t=e[0],i=e[1],s=this.inputNames.indexOf(t);if(-1===s)throw Error(`invalid input '${t}'`);r.push(i),a.push(s)});let s=[],n=[];Object.entries(t).forEach(e=>{let t=e[0],i=e[1],r=this.outputNames.indexOf(t);if(-1===r)throw Error(`invalid output '${t}'`);s.push(i),n.push(r)});let o=r.map((e,t)=>su(e,()=>`input "${this.inputNames[a[t]]}"`)),u=s.map((e,t)=>e?su(e,()=>`output "${this.outputNames[n[t]]}"`):null),l=await sn(this.sessionId,a,o,n,u,i),d={};for(let e=0;e<l.length;e++)d[this.outputNames[n[e]]]=s[e]??sl(l[e]);return z(),d}startProfiling(){}endProfiling(){so(this.sessionId)}}}}),n4={};sb(n4,{OnnxruntimeWebAssemblyBackend:()=>sc,initializeFlags:()=>sp,wasmBackend:()=>sh});var n6=s$({"web/lib/backend-wasm.ts"(){"use strict";sV(),n2(),n3(),sp=()=>{("number"!=typeof l.wasm.initTimeout||l.wasm.initTimeout<0)&&(l.wasm.initTimeout=0);let e=l.wasm.simd;if("boolean"!=typeof e&&void 0!==e&&"fixed"!==e&&"relaxed"!==e&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),l.wasm.simd=!1),"boolean"!=typeof l.wasm.proxy&&(l.wasm.proxy=!1),"boolean"!=typeof l.wasm.trace&&(l.wasm.trace=!1),"number"!=typeof l.wasm.numThreads||!Number.isInteger(l.wasm.numThreads)||l.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)l.wasm.numThreads=1;else{let e="u"<typeof navigator?sy("node:os").cpus().length:navigator.hardwareConcurrency;l.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},sh=new(sc=class{async init(e){sp(),await st(),await si(e)}async createInferenceSessionHandler(e,t){let i=new sd;return await i.loadModel(e,t),i}})}});sV(),sV(),sV();var n8=sU;{let e=(n6(),sw(n4)).wasmBackend;r("webgpu",e,5),r("webnn",e,5),r("cpu",e,10),r("wasm",e,10)}Object.defineProperty(l.versions,"web",{value:"1.24.3",enumerable:!0});export{A as InferenceSession,I as TRACE,C as TRACE_EVENT_BEGIN,O as TRACE_EVENT_END,E as TRACE_FUNC_BEGIN,z as TRACE_FUNC_END,S as Tensor,n8 as default,l as env,r as registerBackend};