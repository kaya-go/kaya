/*! LICENSE: ort.all.bundle.min.56fb80ab1d.mjs.LICENSE.txt */
var li,$r,ar,aI,Vp,Up,Hp,it,pe,jp,Kp,Ds,Zp,Jp,Qp,Yp,ef,Ar,_o,nf,rf,af,sf,dt,St,di,lf,$t,yt,sr,ur,pi,sI,tI=Object.create,ui=Object.defineProperty,nI=Object.getOwnPropertyDescriptor,rI=Object.getOwnPropertyNames,oI=Object.getPrototypeOf,iI=Object.prototype.hasOwnProperty,Ps=(e=>"u">typeof require?require:"u">typeof Proxy?new Proxy(e,{get:(e,t)=>("u">typeof require?require:e)[t]}):e)(function(e){if("u">typeof require)return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),N=(e,t)=>()=>(e&&(t=e(e=0)),t),oe=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Sr=(e,t)=>{for(var r in t)ui(e,r,{get:t[r],enumerable:!0})},Fp=(e,t,r,n)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let i of rI(t))iI.call(e,i)||i===r||ui(e,i,{get:()=>t[i],enumerable:!(n=nI(t,i))||n.enumerable});return e},_e=(e,t,r)=>(r=null!=e?tI(oI(e)):{},Fp(!t&&e&&e.__esModule?r:ui(r,"default",{value:e,enumerable:!0}),e)),Xr=e=>Fp(ui({},"__esModule",{value:!0}),e),Es=N(()=>{"use strict";li=new Map,$r=[],ar=(e,t,r)=>{if(t&&"function"==typeof t.init&&"function"==typeof t.createInferenceSessionHandler){let n=li.get(e);if(void 0===n)li.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let t=$r.indexOf(e);-1!==t&&$r.splice(t,1);for(let t=0;t<$r.length;t++)if(li.get($r[t]).priority<=r)return void $r.splice(t,0,e);$r.push(e)}return}throw TypeError("not a valid backend")},aI=async e=>{let t=li.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(e){return r||(t.error=`${e}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Vp=async e=>{let t=e.executionProviders||[],r=t.map(e=>"string"==typeof e?e:e.name),n=0===r.length?$r:r,i,o=[],a=new Set;for(let e of n){let t=await aI(e);"string"==typeof t?o.push({name:e,err:t}):(i||(i=t),i===t&&a.add(e))}if(!i)throw Error(`no available backend found. ERR: ${o.map(e=>`[${e.name}] ${e.err}`).join(", ")}`);for(let{name:e,err:t}of o)r.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${t}`);let s=t.filter(e=>a.has("string"==typeof e?e:e.name));return[i,new Proxy(e,{get:(e,t)=>"executionProviders"===t?s:Reflect.get(e,t)})]}}),Gp=N(()=>{"use strict";Es()}),Wp=N(()=>{"use strict";Up="1.24.3"}),Cs=N(()=>{"use strict";Wp(),Hp="warning",Object.defineProperty(it={wasm:{},webgl:{},webgpu:{},versions:{common:Up},set logLevel(e){if(void 0!==e){if("string"!=typeof e||-1===["verbose","info","warning","error","fatal"].indexOf(e))throw Error(`Unsupported logging level: ${e}`);Hp=e}},get logLevel(){return Hp}},"logLevel",{enumerable:!0})}),qp=N(()=>{"use strict";Cs(),pe=it}),Xp=N(()=>{"use strict";jp=(e,t)=>{let r="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(null!=n){let i,o;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(i=e.dims[2],o=e.dims[3]):(i=e.dims[3],o=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",s=t?.norm,u,l;void 0===s||void 0===s.mean?u=[255,255,255,255]:"number"==typeof s.mean?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],void 0!==s.mean[3]&&(u[3]=s.mean[3])),void 0===s||void 0===s.bias?l=[0,0,0,0]:"number"==typeof s.bias?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],void 0!==s.bias[3]&&(l[3]=s.bias[3]));let d=o*i,p=0,c=d,h=2*d,f=-1;"RGBA"===a?(p=0,c=d,h=2*d,f=3*d):"RGB"===a?(p=0,c=d,h=2*d):"RBG"===a&&(p=0,h=d,c=2*d);for(let t=0;t<o;t++)for(let r=0;r<i;r++)n.fillStyle="rgba("+(e.data[p++]-l[0])*u[0]+","+(e.data[c++]-l[1])*u[1]+","+(e.data[h++]-l[2])*u[2]+","+(-1===f?255:(e.data[f++]-l[3])*u[3])+")",n.fillRect(r,t,1,1);if("toDataURL"in r)return r.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},Kp=(e,t)=>{let r="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(null!=r){let i,o,a;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(i=e.dims[2],o=e.dims[1],a=e.dims[3]):(i=e.dims[3],o=e.dims[2],a=e.dims[1]);let s=void 0!==t&&void 0!==t.format?t.format:"RGB",u=t?.norm,l,d;void 0===u||void 0===u.mean?l=[255,255,255,255]:"number"==typeof u.mean?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],void 0!==u.mean[3]&&(l[3]=u.mean[3])),void 0===u||void 0===u.bias?d=[0,0,0,0]:"number"==typeof u.bias?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(d[3]=u.bias[3]));let p=o*i;if(void 0!==t&&(void 0!==t.format&&4===a&&"RGBA"!==t.format||3===a&&"RGB"!==t.format&&"BGR"!==t.format))throw Error("Tensor format doesn't match input tensor dims");let c=0,h=1,f=2,m=3,g=0,b=p,y=2*p,_=-1;"RGBA"===s?(g=0,b=p,y=2*p,_=3*p):"RGB"===s?(g=0,b=p,y=2*p):"RBG"===s&&(g=0,y=p,b=2*p),n=r.createImageData(i,o);for(let t=0;t<o*i;c+=4,h+=4,f+=4,m+=4,t++)n.data[c]=(e.data[g++]-d[0])*l[0],n.data[h]=(e.data[b++]-d[1])*l[1],n.data[f]=(e.data[y++]-d[2])*l[2],n.data[m]=-1===_?255:(e.data[_++]-d[3])*l[3]}else throw Error("Can not access image data");return n}}),tf=N(()=>{"use strict";ci(),Ds=(e,t)=>{if(void 0===e)throw Error("Image buffer must be defined");if(void 0===t.height||void 0===t.width)throw Error("Image height and width must be defined");if("NHWC"===t.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,i=t.norm??{mean:255,bias:0},o,a;o="number"==typeof i.mean?[i.mean,i.mean,i.mean,i.mean]:[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],a="number"==typeof i.bias?[i.bias,i.bias,i.bias,i.bias]:[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let s=void 0!==t.format?t.format:"RGBA",u=void 0!==t.tensorFormat&&void 0!==t.tensorFormat?t.tensorFormat:"RGB",l=r*n,d=new Float32Array("RGBA"===u?4*l:3*l),p=4,c=0,h=1,f=2,m=3,g=0,b=l,y=2*l,_=-1;"RGB"===s&&(p=3,c=0,h=1,f=2,m=-1),"RGBA"===u?_=3*l:"RBG"===u?(g=0,y=l,b=2*l):"BGR"===u&&(y=0,b=l,g=2*l);for(let t=0;t<l;t++,c+=p,f+=p,h+=p,m+=p)d[g++]=(e[c]+a[0])/o[0],d[b++]=(e[h]+a[1])/o[1],d[y++]=(e[f]+a[2])/o[2],-1!==_&&-1!==m&&(d[_++]=(e[m]+a[3])/o[3]);return"RGBA"===u?new dt("float32",d,[1,4,r,n]):new dt("float32",d,[1,3,r,n])},Zp=async(e,t)=>{let r="u">typeof HTMLImageElement&&e instanceof HTMLImageElement,n="u">typeof ImageData&&e instanceof ImageData,i="u">typeof ImageBitmap&&e instanceof ImageBitmap,o="string"==typeof e,a,s=t??{},u=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},l=e=>"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext("2d"):null;if(r){let r=u();r.width=e.width,r.height=e.height;let n=l(r);if(null!=n){let r=e.height,i=e.width;if(void 0!==t&&void 0!==t.resizedHeight&&void 0!==t.resizedWidth&&(r=t.resizedHeight,i=t.resizedWidth),void 0!==t){if(s=t,void 0!==t.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=r,s.width=i}else s.tensorFormat="RGBA",s.height=r,s.width=i;n.drawImage(e,0,0),a=n.getImageData(0,0,i,r).data}else throw Error("Can not access image data")}else if(n){let r,n;if(void 0!==t&&void 0!==t.resizedWidth&&void 0!==t.resizedHeight?(r=t.resizedHeight,n=t.resizedWidth):(r=e.height,n=e.width),void 0!==t&&(s=t),s.format="RGBA",s.height=r,s.width=n,void 0!==t){let t=u();t.width=n,t.height=r;let i=l(t);if(null!=i)i.putImageData(e,0,0),a=i.getImageData(0,0,n,r).data;else throw Error("Can not access image data")}else a=e.data}else if(i){if(void 0===t)throw Error("Please provide image config with format for Imagebitmap");let r=u();r.width=e.width,r.height=e.height;let n=l(r);if(null!=n){let t=e.height,r=e.width;return n.drawImage(e,0,0,r,t),a=n.getImageData(0,0,r,t).data,s.height=t,s.width=r,Ds(a,s)}throw Error("Can not access image data")}else{if(o)return new Promise((t,r)=>{let n=u(),i=l(n);if(!e||!i)return r();let o=new Image;o.crossOrigin="Anonymous",o.src=e,o.onload=()=>{n.width=o.width,n.height=o.height,i.drawImage(o,0,0,n.width,n.height);let e=i.getImageData(0,0,n.width,n.height);s.height=n.height,s.width=n.width,t(Ds(e.data,s))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==a)return Ds(a,s);throw Error("Input data provided is not supported - aborted tensor creation")},Jp=(e,t)=>{let{width:r,height:n,download:i,dispose:o}=t;return new dt({location:"texture",type:"float32",texture:e,dims:[1,n,r,4],download:i,dispose:o})},Qp=(e,t)=>{let{dataType:r,dims:n,download:i,dispose:o}=t;return new dt({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:i,dispose:o})},Yp=(e,t)=>{let{dataType:r,dims:n,download:i,dispose:o}=t;return new dt({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:i,dispose:o})},ef=(e,t,r)=>new dt({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),of=N(()=>{"use strict";Ar=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),_o=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),nf=!1,rf=()=>{if(!nf){nf=!0;let e="u">typeof BigInt64Array&&BigInt64Array.from,t="u">typeof BigUint64Array&&BigUint64Array.from,r=globalThis.Float16Array,n="u">typeof r&&r.from;e&&(Ar.set("int64",BigInt64Array),_o.set(BigInt64Array,"int64")),t&&(Ar.set("uint64",BigUint64Array),_o.set(BigUint64Array,"uint64")),n?(Ar.set("float16",r),_o.set(r,"float16")):Ar.set("float16",Uint16Array)}}}),uf=N(()=>{"use strict";ci(),af=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if("number"!=typeof n||!Number.isSafeInteger(n))throw TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},sf=(e,t)=>{switch(e.location){case"cpu":return new dt(e.type,e.data,t);case"cpu-pinned":return new dt({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new dt({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new dt({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new dt({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),ci=N(()=>{"use strict";Xp(),tf(),of(),uf(),dt=class{constructor(e,t,r){let n,i;if(rf(),"object"==typeof e&&"location"in e)switch(this.dataLocation=e.location,n=e.type,i=e.dims,e.location){case"cpu-pinned":{let t=Ar.get(n);if(!t)throw TypeError(`unsupported type "${n}" to create tensor from pinned buffer`);if(!(e.data instanceof t))throw TypeError(`buffer should be of type ${t.name}`);this.cpuData=e.data;break}case"texture":if("float32"!==n)throw TypeError(`unsupported type "${n}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case"gpu-buffer":if("float32"!==n&&"float16"!==n&&"int32"!==n&&"int64"!==n&&"uint32"!==n&&"uint8"!==n&&"bool"!==n&&"uint4"!==n&&"int4"!==n)throw TypeError(`unsupported type "${n}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case"ml-tensor":if("float32"!==n&&"float16"!==n&&"int32"!==n&&"int64"!==n&&"uint32"!==n&&"uint64"!==n&&"int8"!==n&&"uint8"!==n&&"bool"!==n&&"uint4"!==n&&"int4"!==n)throw TypeError(`unsupported type "${n}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,a;if("string"==typeof e)if(n=e,a=r,"string"===e){if(!Array.isArray(t))throw TypeError("A string tensor's data must be a string array.");o=t}else{let r=Ar.get(e);if(void 0===r)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if("float16"===e&&r===Uint16Array||"uint4"===e||"int4"===e)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${r.name} as data.`);o="uint64"===e||"int64"===e?r.from(t,BigInt):r.from(t)}else if(t instanceof r)o=t;else if(t instanceof Uint8ClampedArray)if("uint8"===e)o=Uint8Array.from(t);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===e&&t instanceof Uint16Array&&r!==Uint16Array)o=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw TypeError(`A ${n} tensor's data must be type of ${r}`)}else if(a=t,Array.isArray(e)){if(0===e.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let t=typeof e[0];if("string"===t)n="string",o=e;else if("boolean"===t)n="bool",o=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${t}.`)}else if(e instanceof Uint8ClampedArray)n="uint8",o=Uint8Array.from(e);else{let t=_o.get(e.constructor);if(void 0===t)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);n=t,o=e}if(void 0===a)a=[o.length];else if(!Array.isArray(a))throw TypeError("A tensor's dims must be a number array");i=a,this.cpuData=o,this.dataLocation="cpu"}let o=af(i);if(this.cpuData&&o!==this.cpuData.length&&("uint4"!==n&&"int4"!==n||Math.ceil(o/2)!==this.cpuData.length))throw Error(`Tensor's size(${o}) does not match data length(${this.cpuData.length}).`);this.type=n,this.dims=i,this.size=o}static async fromImage(e,t){return Zp(e,t)}static fromTexture(e,t){return Jp(e,t)}static fromGpuBuffer(e,t){return Qp(e,t)}static fromMLTensor(e,t){return Yp(e,t)}static fromPinnedBuffer(e,t,r){return ef(e,t,r)}toDataURL(e){return jp(this,e)}toImageData(e){return Kp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return sf(this,e)}}}),ks=N(()=>{"use strict";ci(),St=dt}),Ns=N(()=>{"use strict";Cs(),di=(e,t)=>{(typeof it.trace>"u"?it.wasm.trace:it.trace)&&console.timeStamp(`${e}::ORT::${t}`)},lf=(e,t)=>{let r=Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let i=0;i<r.length;i++){if(n&&!r[i].includes("TRACE_FUNC")){let n=`FUNC_${e}::${r[i].trim().split(" ")[1]}`;t&&(n+=`::${t}`),di("CPU",n);return}r[i].includes("TRACE_FUNC")&&(n=!0)}},$t=e=>{(typeof it.trace>"u"?it.wasm.trace:it.trace)&&lf("BEGIN",e)},yt=e=>{(typeof it.trace>"u"?it.wasm.trace:it.trace)&&lf("END",e)},sr=e=>{(typeof it.trace>"u"?it.wasm.trace:it.trace)&&console.time(`ORT::${e}`)},ur=e=>{(typeof it.trace>"u"?it.wasm.trace:it.trace)&&console.timeEnd(`ORT::${e}`)}}),cf=N(()=>{"use strict";Es(),ks(),Ns(),pi=class e{constructor(e){this.handler=e}async run(e,t,r){$t(),sr("InferenceSession.run");let n={},i={};if("object"!=typeof e||null===e||e instanceof St||Array.isArray(e))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let o=!0;if("object"==typeof t){if(null===t)throw TypeError("Unexpected argument[1]: cannot be null.");if(t instanceof St)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(t)){if(0===t.length)throw TypeError("'fetches' cannot be an empty array.");for(let e of(o=!1,t)){if("string"!=typeof e)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(e))throw RangeError(`'fetches' contains invalid output name: ${e}.`);n[e]=null}if("object"==typeof r&&null!==r)i=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else{let e=!1,a=Object.getOwnPropertyNames(t);for(let r of this.outputNames)if(-1!==a.indexOf(r)){let i=t[r];(null===i||i instanceof St)&&(e=!0,o=!1,n[r]=i)}if(e){if("object"==typeof r&&null!==r)i=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else i=t}}else if("u">typeof t)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let t of this.inputNames)if(typeof e[t]>"u")throw Error(`input '${t}' is missing in 'feeds'.`);if(o)for(let e of this.outputNames)n[e]=null;let a=await this.handler.run(e,n,i),s={};for(let e in a)if(Object.hasOwnProperty.call(a,e)){let t=a[e];t instanceof St?s[e]=t:s[e]=new St(t.type,t.data,t.dims)}return ur("InferenceSession.run"),yt(),s}async release(){return this.handler.dispose()}static async create(t,r,n,i){$t(),sr("InferenceSession.create");let o,a={};if("string"==typeof t){if(o=t,"object"==typeof r&&null!==r)a=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(o=t,"object"==typeof r&&null!==r)a=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&t instanceof SharedArrayBuffer){let e=0,s=t.byteLength;if("object"==typeof r&&null!==r)a=r;else if("number"==typeof r){if(!Number.isSafeInteger(e=r))throw RangeError("'byteOffset' must be an integer.");if(e<0||e>=t.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${t.byteLength}).`);if(s=t.byteLength-e,"number"==typeof n){if(!Number.isSafeInteger(s=n))throw RangeError("'byteLength' must be an integer.");if(s<=0||e+s>t.byteLength)throw RangeError(`'byteLength' is out of range (0, ${t.byteLength-e}].`);if("object"==typeof i&&null!==i)a=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if("u">typeof n)throw TypeError("'byteLength' must be a number.")}else if("u">typeof r)throw TypeError("'options' must be an object.");o=new Uint8Array(t,e,s)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await Vp(a),l=await s.createInferenceSessionHandler(o,u);return ur("InferenceSession.create"),yt(),new e(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),df=N(()=>{"use strict";cf(),sI=pi}),pf=N(()=>{}),ff=N(()=>{}),hf=N(()=>{}),mf=N(()=>{}),Ls={};Sr(Ls,{InferenceSession:()=>sI,TRACE:()=>di,TRACE_EVENT_BEGIN:()=>sr,TRACE_EVENT_END:()=>ur,TRACE_FUNC_BEGIN:()=>$t,TRACE_FUNC_END:()=>yt,Tensor:()=>St,env:()=>pe,registerBackend:()=>ar});var pt=N(()=>{"use strict";Gp(),qp(),df(),ks(),pf(),ff(),Ns(),hf(),mf()});function lr(e,t,r,n){if(void 0===t)return lI(e);if(void 0===r)fi(e,t,1);else if("number"==typeof r&&void 0===n)fi(e,t,r);else if("string"==typeof r&&void 0===n)fi(e,r,1,t);else if("string"==typeof r&&"number"==typeof n)fi(e,r,n,t);else throw TypeError("input is valid")}function lI(e){return{verbose:lr.verbose.bind(null,e),info:lr.info.bind(null,e),warning:lr.warning.bind(null,e),error:lr.error.bind(null,e),fatal:lr.fatal.bind(null,e)}}function fi(e,t,r,n){let i=wo[n||""]||wo[""];bf[e]<bf[i.minimalSeverity]||(i.logDateTime&&(t=`${new Date().toISOString()}|${t}`),i.logSourceLocation,uI[i.provider].log(e,t,n))}var Rs,zs,bf,uI,yf,wo,ze,mi,gi,bi,hi,Ct=N(()=>{"use strict";Rs=class{log(e,t,r){}},zs=class{log(e,t,r){console.log(`${this.color(e)} ${r?"\x1b[35m"+r+"\x1b[0m ":""}${t}`)}color(e){switch(e){case"verbose":return"\x1b[34;40mv\x1b[0m";case"info":return"\x1b[32mi\x1b[0m";case"warning":return"\x1b[30;43mw\x1b[0m";case"error":return"\x1b[31;40me\x1b[0m";case"fatal":return"\x1b[101mf\x1b[0m";default:throw Error(`unsupported severity: ${e}`)}}},bf={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},uI={none:new Rs,console:new zs},wo={"":yf={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1}};var e=lr||={};function t(e){wo={},r("",e||{})}function r(e,r){if("*"===e)t(r);else{let t=wo[e]||yf;wo[e]={provider:r.provider||t.provider,minimalSeverity:r.minimalSeverity||t.minimalSeverity,logDateTime:void 0===r.logDateTime?t.logDateTime:r.logDateTime,logSourceLocation:void 0===r.logSourceLocation?t.logSourceLocation:r.logSourceLocation}}}e.verbose=function(t,r){e("verbose",t,r)},e.info=function(t,r){e("info",t,r)},e.warning=function(t,r){e("warning",t,r)},e.error=function(t,r){e("error",t,r)},e.fatal=function(t,r){e("fatal",t,r)},e.reset=t,e.set=r,e.setWithEnv=function(e){let t={};e.logLevel&&(t.minimalSeverity=e.logLevel),r("",t)},ze=lr,mi=class{constructor(e,t,r,n,i,o){this.category=e,this.name=t,this.startTime=r,this.endCallback=n,this.timer=i,this.ctx=o}async end(){return this.endCallback(this)}async checkTimer(){if(void 0===this.ctx||void 0===this.timer)throw Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},gi=class{constructor(e,t,r,n){this.category=e,this.name=t,this.startTime=r,this.endTime=n}},bi=class{constructor(e,t,r){this._started=!1,this._flushPointer=0,this._started=!1,this._maxNumberEvents=void 0===e?1e4:e,this._flushBatchSize=void 0===t?10:t,this._flushIntervalInMilliseconds=void 0===r?5e3:r}static create(e){return void 0===e?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=hi(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,t,r,n){let i=this._started?this.begin(e,t,n):void 0,o=!1,a=r();if(a&&"function"==typeof a.then)return o=!0,new Promise((e,t)=>{a.then(async t=>{i&&await i.end(),e(t)},async e=>{i&&await i.end(),t(e)})});if(!o&&i){let e=i.end();if(e&&"function"==typeof e.then)return new Promise((t,r)=>{e.then(()=>{t(a)},e=>{r(e)})})}return a}begin(e,t,r){if(!this._started)throw Error("profiler is not started yet");if(void 0!==r)return new mi(e,t,0,async e=>this.end(e),r.beginTimer(),r);{let r=hi();return this.flush(r),new mi(e,t,r,e=>this.endSync(e))}}async end(e){let t=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new gi(e.category,e.name,e.startTime,t)),this.flush(t))}endSync(e){let t=hi();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new gi(e.category,e.name,e.startTime,t)),this.flush(t))}logOneEvent(e){ze.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let e=this._flushPointer;this._flushPointer<e+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=hi()}}get started(){return this._started}},hi="u">typeof performance&&performance.now?()=>performance.now():Date.now});function _f(e,t,r){for(let n of r){let r=n[0],i=n[1],o=n[2],a=n[3],s=n[4];if(e.opType===r){for(let e of t)if((e.domain===i||"ai.onnx"===e.domain&&""===i)&&cI(e.version,o))return{opImpl:a,opInit:s}}}throw TypeError(`cannot resolve operator '${e.opType}' with opsets: ${t.map(e=>`${e.domain||"ai.onnx"} v${e.version}`).join(", ")}`)}function cI(e,t){if(t.endsWith("+")){let r=Number.parseInt(t.substring(0,t.length-1),10);return!isNaN(r)&&r<=e}if(2!==t.split("-").length)return Number.parseInt(t,10)===e;{let r=t.split("-"),n=Number.parseInt(r[0],10),i=Number.parseInt(r[1],10);return!isNaN(n)&&!isNaN(i)&&n<=e&&e<=i}}var wf=N(()=>{}),vf=oe(e=>{"use strict";e.__esModule=!0,e.Guid=function(){function e(t){if(!t)throw TypeError("Invalid argument; `value` has no value.");this.value=e.EMPTY,t&&e.isGuid(t)&&(this.value=t)}return e.isGuid=function(t){var r=t.toString();return t&&(t instanceof e||e.validator.test(r))},e.create=function(){return new e([e.gen(2),e.gen(1),e.gen(1),e.gen(1),e.gen(3)].join("-"))},e.createEmpty=function(){return new e("emptyguid")},e.parse=function(t){return new e(t)},e.raw=function(){return[e.gen(2),e.gen(1),e.gen(1),e.gen(1),e.gen(3)].join("-")},e.gen=function(e){for(var t="",r=0;r<e;r++)t+=((1+Math.random())*65536|0).toString(16).substring(1);return t},e.prototype.equals=function(t){return e.isGuid(t)&&this.value===t.toString()},e.prototype.isEmpty=function(){return this.value===e.EMPTY},e.prototype.toString=function(){return this.value},e.prototype.toJSON=function(){return{value:this.value}},e.validator=RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),e.EMPTY="00000000-0000-0000-0000-000000000000",e}()});function He(e,t,r){this.low=0|e,this.high=0|t,this.unsigned=!!r}function mt(e){return(e&&e.__isLong__)===!0}function xf(e){var t=Math.clz32(e&-e);return e?31-t:t}function Or(e,t){var r,n,i;return t?(e>>>=0,(i=0<=e&&e<256)&&(n=If[e])?n:(r=ke(e,0,!0),i&&(If[e]=r),r)):(e|=0,(i=-128<=e&&e<128)&&(n=Tf[e])?n:(r=ke(e,e<0?-1:0,!1),i&&(Tf[e]=r),r))}function kt(e,t){if(isNaN(e))return t?Jn:Ut;if(t){if(e<0)return Jn;if(e>=Of)return Cf}else{if(e<=-$f)return _t;if(e+1>=$f)return Ef}return e<0?kt(-e,t).neg():ke(e%Jr|0,e/Jr|0,t)}function ke(e,t,r){return new He(e,t,r)}function Fs(e,t,r){if(0===e.length)throw Error("empty string");if("number"==typeof t?(r=t,t=!1):t=!!t,"NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return t?Jn:Ut;if((r=r||10)<2||36<r)throw RangeError("radix");if((n=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===n)return Fs(e.substring(1),t,r).neg();for(var n,i=kt(yi(r,8)),o=Ut,a=0;a<e.length;a+=8){var s=Math.min(8,e.length-a),u=parseInt(e.substring(a,a+s),r);if(s<8){var l=kt(yi(r,s));o=o.mul(l).add(kt(u))}else o=(o=o.mul(i)).add(kt(u))}return o.unsigned=t,o}function Wt(e,t){return"number"==typeof e?kt(e,t):"string"==typeof e?Fs(e,t):ke(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}var Dt,Tf,If,yi,Sf,pI,Jr,Of,$f,Af,Ut,Jn,Zr,Pf,Bs,Ef,Cf,_t,H,cr,u$,l$,Ci,Lt,c$,d$,p$,f$,h$,m$,g$,b$,tl,nl,y$,_$,w$,v$,rl,x$,T$,I$,S$,$$,A$,O$,P$,E$,C$,D$,k$,N$,Io,ol,L$,il,R$,Vs=N(()=>{Dt=null;try{Dt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}He.prototype.__isLong__,Object.defineProperty(He.prototype,"__isLong__",{value:!0}),He.isLong=mt,Tf={},If={},He.fromInt=Or,He.fromNumber=kt,He.fromBits=ke,yi=Math.pow,He.fromString=Fs,He.fromValue=Wt,pI=0x1000000,$f=(Of=(Jr=(Sf=65536)*Sf)*Jr)/2,Af=Or(pI),He.ZERO=Ut=Or(0),He.UZERO=Jn=Or(0,!0),He.ONE=Zr=Or(1),He.UONE=Pf=Or(1,!0),He.NEG_ONE=Bs=Or(-1),He.MAX_VALUE=Ef=ke(-1,0x7fffffff,!1),He.MAX_UNSIGNED_VALUE=Cf=ke(-1,-1,!0),He.MIN_VALUE=_t=ke(0,-0x80000000,!1),(H=He.prototype).toInt=function(){return this.unsigned?this.low>>>0:this.low},H.toNumber=function(){return this.unsigned?(this.high>>>0)*Jr+(this.low>>>0):this.high*Jr+(this.low>>>0)},H.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(!this.eq(_t))return"-"+this.neg().toString(e);else{var t=kt(e),r=this.div(t),n=r.mul(t).sub(this);return r.toString(e)+n.toInt().toString(e)}for(var i=kt(yi(e,6),this.unsigned),o=this,a="";;){var s=o.div(i),u=(o.sub(s.mul(i)).toInt()>>>0).toString(e);if((o=s).isZero())return u+a;for(;u.length<6;)u="0"+u;a=""+u+a}},H.getHighBits=function(){return this.high},H.getHighBitsUnsigned=function(){return this.high>>>0},H.getLowBits=function(){return this.low},H.getLowBitsUnsigned=function(){return this.low>>>0},H.getNumBitsAbs=function(){if(this.isNegative())return this.eq(_t)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return 0!=this.high?t+33:t+1},H.isZero=function(){return 0===this.high&&0===this.low},H.eqz=H.isZero,H.isNegative=function(){return!this.unsigned&&this.high<0},H.isPositive=function(){return this.unsigned||this.high>=0},H.isOdd=function(){return(1&this.low)==1},H.isEven=function(){return(1&this.low)==0},H.equals=function(e){return mt(e)||(e=Wt(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&this.high===e.high&&this.low===e.low},H.eq=H.equals,H.notEquals=function(e){return!this.eq(e)},H.neq=H.notEquals,H.ne=H.notEquals,H.lessThan=function(e){return 0>this.comp(e)},H.lt=H.lessThan,H.lessThanOrEqual=function(e){return 0>=this.comp(e)},H.lte=H.lessThanOrEqual,H.le=H.lessThanOrEqual,H.greaterThan=function(e){return this.comp(e)>0},H.gt=H.greaterThan,H.greaterThanOrEqual=function(e){return this.comp(e)>=0},H.gte=H.greaterThanOrEqual,H.ge=H.greaterThanOrEqual,H.compare=function(e){if(mt(e)||(e=Wt(e)),this.eq(e))return 0;var t=this.isNegative(),r=e.isNegative();return t&&!r?-1:!t&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},H.comp=H.compare,H.negate=function(){return!this.unsigned&&this.eq(_t)?_t:this.not().add(Zr)},H.neg=H.negate,H.add=function(e){mt(e)||(e=Wt(e));var t,r,n=this.high>>>16,i=65535&this.high,o=this.low>>>16,a=65535&this.low,s=e.high>>>16,u=65535&e.high,l=e.low>>>16,d=65535&e.low,p=0,c=0;return r=0+((t=0+(a+d))>>>16),t&=65535,r+=o+l,c+=r>>>16,r&=65535,c+=i+u,p+=c>>>16,c&=65535,p+=n+s,ke(r<<16|t,(p&=65535)<<16|c,this.unsigned)},H.subtract=function(e){return mt(e)||(e=Wt(e)),this.add(e.neg())},H.sub=H.subtract,H.multiply=function(e){if(this.isZero())return this;if(mt(e)||(e=Wt(e)),Dt)return ke(Dt.mul(this.low,this.high,e.low,e.high),Dt.get_high(),this.unsigned);if(e.isZero())return this.unsigned?Jn:Ut;if(this.eq(_t))return e.isOdd()?_t:Ut;if(e.eq(_t))return this.isOdd()?_t:Ut;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Af)&&e.lt(Af))return kt(this.toNumber()*e.toNumber(),this.unsigned);var t,r,n=this.high>>>16,i=65535&this.high,o=this.low>>>16,a=65535&this.low,s=e.high>>>16,u=65535&e.high,l=e.low>>>16,d=65535&e.low,p=0,c=0;return r=0+((t=0+a*d)>>>16),t&=65535,r+=o*d,c+=r>>>16,r&=65535,r+=a*l,c+=r>>>16,r&=65535,c+=i*d,p+=c>>>16,c&=65535,c+=o*l,p+=c>>>16,c&=65535,c+=a*u,p+=c>>>16,c&=65535,p+=n*d+i*l+o*u+a*s,ke(r<<16|t,(p&=65535)<<16|c,this.unsigned)},H.mul=H.multiply,H.divide=function(e){if(mt(e)||(e=Wt(e)),e.isZero())throw Error("division by zero");if(Dt){var t,r,n;return this.unsigned||-0x80000000!==this.high||-1!==e.low||-1!==e.high?ke((this.unsigned?Dt.div_u:Dt.div_s)(this.low,this.high,e.low,e.high),Dt.get_high(),this.unsigned):this}if(this.isZero())return this.unsigned?Jn:Ut;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Jn;if(e.gt(this.shru(1)))return Pf;n=Jn}else{if(this.eq(_t))return e.eq(Zr)||e.eq(Bs)?_t:e.eq(_t)?Zr:(t=this.shr(1).div(e).shl(1)).eq(Ut)?e.isNegative()?Zr:Bs:(r=this.sub(e.mul(t)),n=t.add(r.div(e)));if(e.eq(_t))return this.unsigned?Jn:Ut;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();n=Ut}for(r=this;r.gte(e);){t=Math.max(1,Math.floor(r.toNumber()/e.toNumber()));for(var i=Math.ceil(Math.log(t)/Math.LN2),o=i<=48?1:yi(2,i-48),a=kt(t),s=a.mul(e);s.isNegative()||s.gt(r);)t-=o,s=(a=kt(t,this.unsigned)).mul(e);a.isZero()&&(a=Zr),n=n.add(a),r=r.sub(s)}return n},H.div=H.divide,H.modulo=function(e){return(mt(e)||(e=Wt(e)),Dt)?ke((this.unsigned?Dt.rem_u:Dt.rem_s)(this.low,this.high,e.low,e.high),Dt.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},H.mod=H.modulo,H.rem=H.modulo,H.not=function(){return ke(~this.low,~this.high,this.unsigned)},H.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},H.clz=H.countLeadingZeros,H.countTrailingZeros=function(){return this.low?xf(this.low):xf(this.high)+32},H.ctz=H.countTrailingZeros,H.and=function(e){return mt(e)||(e=Wt(e)),ke(this.low&e.low,this.high&e.high,this.unsigned)},H.or=function(e){return mt(e)||(e=Wt(e)),ke(this.low|e.low,this.high|e.high,this.unsigned)},H.xor=function(e){return mt(e)||(e=Wt(e)),ke(this.low^e.low,this.high^e.high,this.unsigned)},H.shiftLeft=function(e){return mt(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?ke(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):ke(0,this.low<<e-32,this.unsigned)},H.shl=H.shiftLeft,H.shiftRight=function(e){return mt(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?ke(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):ke(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},H.shr=H.shiftRight,H.shiftRightUnsigned=function(e){return mt(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?ke(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):32===e?ke(this.high,0,this.unsigned):ke(this.high>>>e-32,0,this.unsigned)},H.shru=H.shiftRightUnsigned,H.shr_u=H.shiftRightUnsigned,H.rotateLeft=function(e){var t;return mt(e)&&(e=e.toInt()),0==(e&=63)?this:32===e?ke(this.high,this.low,this.unsigned):e<32?(t=32-e,ke(this.low<<e|this.high>>>t,this.high<<e|this.low>>>t,this.unsigned)):(e-=32,t=32-e,ke(this.high<<e|this.low>>>t,this.low<<e|this.high>>>t,this.unsigned))},H.rotl=H.rotateLeft,H.rotateRight=function(e){var t;return mt(e)&&(e=e.toInt()),0==(e&=63)?this:32===e?ke(this.high,this.low,this.unsigned):e<32?(t=32-e,ke(this.high<<t|this.low>>>e,this.low<<t|this.high>>>e,this.unsigned)):(e-=32,t=32-e,ke(this.low<<t|this.high>>>e,this.high<<t|this.low>>>e,this.unsigned))},H.rotr=H.rotateRight,H.toSigned=function(){return this.unsigned?ke(this.low,this.high,!1):this},H.toUnsigned=function(){return this.unsigned?this:ke(this.low,this.high,!0)},H.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},H.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},H.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},He.fromBytes=function(e,t,r){return r?He.fromBytesLE(e,t):He.fromBytesBE(e,t)},He.fromBytesLE=function(e,t){return new He(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},He.fromBytesBE=function(e,t){return new He(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)},cr=He}),Gs=oe(e=>{"use strict";var t,r;Object.defineProperty(e,"__esModule",{value:!0}),e.ArgType=void 0,(r=t||(e.ArgType=t={}))[r.INPUT=0]="INPUT",r[r.OUTPUT=1]="OUTPUT"}),Pr=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0,e.SIZEOF_SHORT=2,e.SIZEOF_INT=4,e.FILE_IDENTIFIER_LENGTH=4,e.SIZE_PREFIX_LENGTH=4}),Us=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isLittleEndian=e.float64=e.float32=e.int32=void 0,e.int32=new Int32Array(2),e.float32=new Float32Array(e.int32.buffer),e.float64=new Float64Array(e.int32.buffer),e.isLittleEndian=1===new Uint16Array(new Uint8Array([1,0]).buffer)[0]}),Ws=oe(e=>{"use strict";var t,r;Object.defineProperty(e,"__esModule",{value:!0}),e.Encoding=void 0,(r=t||(e.Encoding=t={}))[r.UTF8_BYTES=1]="UTF8_BYTES",r[r.UTF16_STRING=2]="UTF16_STRING"}),qs=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=void 0;var t=Pr(),r=Us(),n=Ws();e.ByteBuffer=class e{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(t){return new e(new Uint8Array(t))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return r.int32[0]=this.readInt32(e),r.float32[0]}readFloat64(e){return r.int32[+!r.isLittleEndian]=this.readInt32(e),r.int32[+!!r.isLittleEndian]=this.readInt32(e+4),r.float64[0]}writeInt8(e,t){this.bytes_[e]=t}writeUint8(e,t){this.bytes_[e]=t}writeInt16(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8}writeUint16(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8}writeInt32(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8,this.bytes_[e+2]=t>>16,this.bytes_[e+3]=t>>24}writeUint32(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8,this.bytes_[e+2]=t>>16,this.bytes_[e+3]=t>>24}writeInt64(e,t){this.writeInt32(e,Number(BigInt.asIntN(32,t))),this.writeInt32(e+4,Number(BigInt.asIntN(32,t>>BigInt(32))))}writeUint64(e,t){this.writeUint32(e,Number(BigInt.asUintN(32,t))),this.writeUint32(e+4,Number(BigInt.asUintN(32,t>>BigInt(32))))}writeFloat32(e,t){r.float32[0]=t,this.writeInt32(e,r.int32[0])}writeFloat64(e,t){r.float64[0]=t,this.writeInt32(e,r.int32[+!r.isLittleEndian]),this.writeInt32(e+4,r.int32[+!!r.isLittleEndian])}getBufferIdentifier(){if(this.bytes_.length<this.position_+t.SIZEOF_INT+t.FILE_IDENTIFIER_LENGTH)throw Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let r=0;r<t.FILE_IDENTIFIER_LENGTH;r++)e+=String.fromCharCode(this.readInt8(this.position_+t.SIZEOF_INT+r));return e}__offset(e,t){let r=e-this.readInt32(e);return t<this.readInt16(r)?this.readInt16(r+t):0}__union(e,t){return e.bb_pos=t+this.readInt32(t),e.bb=this,e}__string(e,r){e+=this.readInt32(e);let i=this.readInt32(e);e+=t.SIZEOF_INT;let o=this.bytes_.subarray(e,e+i);return r===n.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,t){return"string"==typeof e?this.__string(t):this.__union(e,t)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+t.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=t.FILE_IDENTIFIER_LENGTH)throw Error("FlatBuffers: file identifier must be length "+t.FILE_IDENTIFIER_LENGTH);for(let r=0;r<t.FILE_IDENTIFIER_LENGTH;r++)if(e.charCodeAt(r)!=this.readInt8(this.position()+t.SIZEOF_INT+r))return!1;return!0}createScalarList(e,t){let r=[];for(let n=0;n<t;++n){let t=e(n);null!==t&&r.push(t)}return r}createObjList(e,t){let r=[];for(let n=0;n<t;++n){let t=e(n);null!==t&&r.push(t.unpack())}return r}}}),Lf=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Builder=void 0;var t=qs(),r=Pr();e.Builder=class e{constructor(e){let r;this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder,r=e||1024,this.bb=t.ByteBuffer.allocate(r),this.space=r}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(t,r){t>this.minalign&&(this.minalign=t);let n=~(this.bb.capacity()-this.space+r)+1&t-1;for(;this.space<n+t+r;){let t=this.bb.capacity();this.bb=e.growByteBuffer(this.bb),this.space+=this.bb.capacity()-t}this.pad(n)}pad(e){for(let t=0;t<e;t++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,t,r){(this.force_defaults||t!=r)&&(this.addInt8(t),this.slot(e))}addFieldInt16(e,t,r){(this.force_defaults||t!=r)&&(this.addInt16(t),this.slot(e))}addFieldInt32(e,t,r){(this.force_defaults||t!=r)&&(this.addInt32(t),this.slot(e))}addFieldInt64(e,t,r){(this.force_defaults||t!==r)&&(this.addInt64(t),this.slot(e))}addFieldFloat32(e,t,r){(this.force_defaults||t!=r)&&(this.addFloat32(t),this.slot(e))}addFieldFloat64(e,t,r){(this.force_defaults||t!=r)&&(this.addFloat64(t),this.slot(e))}addFieldOffset(e,t,r){(this.force_defaults||t!=r)&&(this.addOffset(t),this.slot(e))}addFieldStruct(e,t,r){t!=r&&(this.nested(t),this.slot(e))}nested(e){if(e!=this.offset())throw TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){null!==this.vtable&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let r=e.capacity();if(0xc0000000&r)throw Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let n=r<<1,i=t.ByteBuffer.allocate(n);return i.setPosition(n-r),i.bytes().set(e.bytes(),n-r),i}addOffset(e){this.prep(r.SIZEOF_INT,0),this.writeInt32(this.offset()-e+r.SIZEOF_INT)}startObject(e){this.notNested(),null==this.vtable&&(this.vtable=[]),this.vtable_in_use=e;for(let t=0;t<e;t++)this.vtable[t]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(null==this.vtable||!this.isNested)throw Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),t=this.vtable_in_use-1;for(;t>=0&&0==this.vtable[t];t--);let n=t+1;for(;t>=0;t--)this.addInt16(0!=this.vtable[t]?e-this.vtable[t]:0);this.addInt16(e-this.object_start);let i=(n+2)*r.SIZEOF_SHORT;this.addInt16(i);let o=0,a=this.space;e:for(t=0;t<this.vtables.length;t++){let e=this.bb.capacity()-this.vtables[t];if(i==this.bb.readInt16(e)){for(let t=r.SIZEOF_SHORT;t<i;t+=r.SIZEOF_SHORT)if(this.bb.readInt16(a+t)!=this.bb.readInt16(e+t))continue e;o=this.vtables[t];break}}return o?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,o-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,t,n){let i=n?r.SIZE_PREFIX_LENGTH:0;if(t){if(this.prep(this.minalign,r.SIZEOF_INT+r.FILE_IDENTIFIER_LENGTH+i),t.length!=r.FILE_IDENTIFIER_LENGTH)throw TypeError("FlatBuffers: file identifier must be length "+r.FILE_IDENTIFIER_LENGTH);for(let e=r.FILE_IDENTIFIER_LENGTH-1;e>=0;e--)this.writeInt8(t.charCodeAt(e))}this.prep(this.minalign,r.SIZEOF_INT+i),this.addOffset(e),i&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,t){this.finish(e,t,!0)}requiredField(e,t){let r=this.bb.capacity()-e,n=r-this.bb.readInt32(r);if(!(t<this.bb.readInt16(n)&&0!=this.bb.readInt16(n+t)))throw TypeError("FlatBuffers: field "+t+" must be set")}startVector(e,t,n){this.notNested(),this.vector_num_elems=t,this.prep(r.SIZEOF_INT,e*t),this.prep(n,e*t)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let t=this.createString(e);return this.string_maps.set(e,t),t}createString(e){let t;return null==e?0:(t=e instanceof Uint8Array?e:this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,t.length,1),this.bb.setPosition(this.space-=t.length),this.bb.bytes().set(t,this.space),this.endVector())}createByteVector(e){return null==e?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return null===e?0:"string"==typeof e?this.createString(e):e.pack(this)}createObjectOffsetList(e){let t=[];for(let r=0;r<e.length;++r){let n=e[r];if(null!==n)t.push(this.createObjectOffset(n));else throw TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return t}createStructOffsetList(e,t){return t(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}}}),Ne=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=e.Builder=e.Encoding=e.isLittleEndian=e.float64=e.float32=e.int32=e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0;var t=Pr();Object.defineProperty(e,"SIZEOF_SHORT",{enumerable:!0,get:function(){return t.SIZEOF_SHORT}});var r=Pr();Object.defineProperty(e,"SIZEOF_INT",{enumerable:!0,get:function(){return r.SIZEOF_INT}});var n=Pr();Object.defineProperty(e,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return n.FILE_IDENTIFIER_LENGTH}});var i=Pr();Object.defineProperty(e,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return i.SIZE_PREFIX_LENGTH}});var o=Us();Object.defineProperty(e,"int32",{enumerable:!0,get:function(){return o.int32}}),Object.defineProperty(e,"float32",{enumerable:!0,get:function(){return o.float32}}),Object.defineProperty(e,"float64",{enumerable:!0,get:function(){return o.float64}}),Object.defineProperty(e,"isLittleEndian",{enumerable:!0,get:function(){return o.isLittleEndian}});var a=Ws();Object.defineProperty(e,"Encoding",{enumerable:!0,get:function(){return a.Encoding}});var s=Lf();Object.defineProperty(e,"Builder",{enumerable:!0,get:function(){return s.Builder}});var u=qs();Object.defineProperty(e,"ByteBuffer",{enumerable:!0,get:function(){return u.ByteBuffer}})}),Xs=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.ArgTypeAndIndex=void 0;var i=n(Ne()),o=Gs();e.ArgTypeAndIndex=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsArgTypeAndIndex(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsArgTypeAndIndex(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):o.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,t){e.addFieldInt8(0,t,o.ArgType.INPUT)}static addIndex(e,t){e.addFieldInt32(1,t,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(t,r,n){return e.startArgTypeAndIndex(t),e.addArgType(t,r),e.addIndex(t,n),e.endArgTypeAndIndex(t)}}}),Zs=oe(e=>{"use strict";var t,r;Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeType=void 0,(r=t||(e.AttributeType=t={}))[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.INT=2]="INT",r[r.STRING=3]="STRING",r[r.TENSOR=4]="TENSOR",r[r.GRAPH=5]="GRAPH",r[r.FLOATS=6]="FLOATS",r[r.INTS=7]="INTS",r[r.STRINGS=8]="STRINGS",r[r.TENSORS=9]="TENSORS",r[r.GRAPHS=10]="GRAPHS",r[r.SPARSE_TENSOR=11]="SPARSE_TENSOR",r[r.SPARSE_TENSORS=12]="SPARSE_TENSORS"}),Js=oe(e=>{"use strict";var t,r;Object.defineProperty(e,"__esModule",{value:!0}),e.NodeType=void 0,(r=t||(e.NodeType=t={}))[r.Primitive=0]="Primitive",r[r.Fused=1]="Fused"}),Ys=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Node=void 0;var i=n(Ne()),o=eu(),a=Js();e.Node=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNode(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNode(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}domain(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb_pos+t,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):a.NodeType.Primitive}executionProviderType(e){let t=this.bb.__offset(this.bb_pos,18);return t?this.bb.__string(this.bb_pos+t,e):null}inputs(e,t){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,t){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,t){let r=this.bb.__offset(this.bb_pos,24);return r?(t||new o.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readInt32(this.bb.__vector(this.bb_pos+t)+4*e):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,t){let r=this.bb.__offset(this.bb_pos,28);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addDomain(e,t){e.addFieldOffset(2,t,0)}static addSinceVersion(e,t){e.addFieldInt32(3,t,0)}static addIndex(e,t){e.addFieldInt32(4,t,0)}static addOpType(e,t){e.addFieldOffset(5,t,0)}static addType(e,t){e.addFieldInt32(6,t,a.NodeType.Primitive)}static addExecutionProviderType(e,t){e.addFieldOffset(7,t,0)}static addInputs(e,t){e.addFieldOffset(8,t,0)}static createInputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startInputsVector(e,t){e.startVector(4,t,4)}static addOutputs(e,t){e.addFieldOffset(9,t,0)}static createOutputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startOutputsVector(e,t){e.startVector(4,t,4)}static addAttributes(e,t){e.addFieldOffset(10,t,0)}static createAttributesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startAttributesVector(e,t){e.startVector(4,t,4)}static addInputArgCounts(e,t){e.addFieldOffset(11,t,0)}static createInputArgCountsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addInt32(t[r]);return e.endVector()}static startInputArgCountsVector(e,t){e.startVector(4,t,4)}static addImplicitInputs(e,t){e.addFieldOffset(12,t,0)}static createImplicitInputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startImplicitInputsVector(e,t){e.startVector(4,t,4)}static endNode(e){return e.endObject()}static createNode(t,r,n,i,o,a,s,u,l,d,p,c,h,f){return e.startNode(t),e.addName(t,r),e.addDocString(t,n),e.addDomain(t,i),e.addSinceVersion(t,o),e.addIndex(t,a),e.addOpType(t,s),e.addType(t,u),e.addExecutionProviderType(t,l),e.addInputs(t,d),e.addOutputs(t,p),e.addAttributes(t,c),e.addInputArgCounts(t,h),e.addImplicitInputs(t,f),e.endNode(t)}}}),nu=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.EdgeEnd=void 0,e.EdgeEnd=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,t,r,n){return e.prep(4,12),e.writeInt32(n),e.writeInt32(r),e.writeInt32(t),e.offset()}}}),ou=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.NodeEdge=void 0;var i=n(Ne()),o=nu();e.NodeEdge=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNodeEdge(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNodeEdge(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new o.EdgeEnd).__init(this.bb.__vector(this.bb_pos+r)+12*e,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,t){let r=this.bb.__offset(this.bb_pos,8);return r?(t||new o.EdgeEnd).__init(this.bb.__vector(this.bb_pos+r)+12*e,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,t){e.addFieldInt32(0,t,0)}static addInputEdges(e,t){e.addFieldOffset(1,t,0)}static startInputEdgesVector(e,t){e.startVector(12,t,4)}static addOutputEdges(e,t){e.addFieldOffset(2,t,0)}static startOutputEdgesVector(e,t){e.startVector(12,t,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(t,r,n,i){return e.startNodeEdge(t),e.addNodeIndex(t,r),e.addInputEdges(t,n),e.addOutputEdges(t,i),e.endNodeEdge(t)}}}),au=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.NodesToOptimizeIndices=void 0;var i=n(Ne());e.NodesToOptimizeIndices=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNodesToOptimizeIndices(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNodesToOptimizeIndices(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndices(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb.__vector(this.bb_pos+t)+4*e):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return!!e&&!!this.bb.readInt8(this.bb_pos+e)}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return!!e&&!!this.bb.readInt8(this.bb_pos+e)}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,t){e.addFieldOffset(0,t,0)}static createNodeIndicesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addInt32(t[r]);return e.endVector()}static startNodeIndicesVector(e,t){e.startVector(4,t,4)}static addNumInputs(e,t){e.addFieldInt32(1,t,0)}static addNumOutputs(e,t){e.addFieldInt32(2,t,0)}static addHasVariadicInput(e,t){e.addFieldInt8(3,+t,0)}static addHasVariadicOutput(e,t){e.addFieldInt8(4,+t,0)}static addNumVariadicInputs(e,t){e.addFieldInt32(5,t,0)}static addNumVariadicOutputs(e,t){e.addFieldInt32(6,t,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(t,r,n,i,o,a,s,u){return e.startNodesToOptimizeIndices(t),e.addNodeIndices(t,r),e.addNumInputs(t,n),e.addNumOutputs(t,i),e.addHasVariadicInput(t,o),e.addHasVariadicOutput(t,a),e.addNumVariadicInputs(t,s),e.addNumVariadicOutputs(t,u),e.endNodesToOptimizeIndices(t)}}}),uu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecord=void 0;var i=n(Ne()),o=au();e.RuntimeOptimizationRecord=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizationRecord(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizationRecord(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}actionId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}nodesToOptimizeIndices(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new o.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}producedOpIds(e,t){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,t){e.addFieldOffset(0,t,0)}static addNodesToOptimizeIndices(e,t){e.addFieldOffset(1,t,0)}static addProducedOpIds(e,t){e.addFieldOffset(3,t,0)}static createProducedOpIdsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startProducedOpIdsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}}}),cu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecordContainerEntry=void 0;var i=n(Ne()),o=uu();e.RuntimeOptimizationRecordContainerEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizationRecordContainerEntry(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}optimizerName(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}runtimeOptimizationRecords(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new o.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,t){e.addFieldOffset(0,t,0)}static addRuntimeOptimizationRecords(e,t){e.addFieldOffset(1,t,0)}static createRuntimeOptimizationRecordsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizationRecordContainerEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createRuntimeOptimizationRecordContainerEntry(t,r,n){return e.startRuntimeOptimizationRecordContainerEntry(t),e.addOptimizerName(t,r),e.addRuntimeOptimizationRecords(t,n),e.endRuntimeOptimizationRecordContainerEntry(t)}}}),pu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizations=void 0;var i=n(Ne()),o=cu();e.RuntimeOptimizations=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizations(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizations(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}records(e,t){let r=this.bb.__offset(this.bb_pos,4);return r?(t||new o.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,t){e.addFieldOffset(0,t,0)}static createRecordsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startRecordsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(t,r){return e.startRuntimeOptimizations(t),e.addRecords(t,r),e.endRuntimeOptimizations(t)}}}),vo=oe(e=>{"use strict";var t,r;Object.defineProperty(e,"__esModule",{value:!0}),e.TensorDataType=void 0,(r=t||(e.TensorDataType=t={}))[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.UINT8=2]="UINT8",r[r.INT8=3]="INT8",r[r.UINT16=4]="UINT16",r[r.INT16=5]="INT16",r[r.INT32=6]="INT32",r[r.INT64=7]="INT64",r[r.STRING=8]="STRING",r[r.BOOL=9]="BOOL",r[r.FLOAT16=10]="FLOAT16",r[r.DOUBLE=11]="DOUBLE",r[r.UINT32=12]="UINT32",r[r.UINT64=13]="UINT64",r[r.COMPLEX64=14]="COMPLEX64",r[r.COMPLEX128=15]="COMPLEX128",r[r.BFLOAT16=16]="BFLOAT16",r[r.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",r[r.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",r[r.FLOAT8E5M2=19]="FLOAT8E5M2",r[r.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"}),xo=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Tensor=void 0;var i=n(Ne()),o=vo();e.Tensor=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTensor(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTensor(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}dims(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):o.TensorDataType.UNDEFINED}rawData(e){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readUint8(this.bb.__vector(this.bb_pos+t)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,t){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addDims(e,t){e.addFieldOffset(2,t,0)}static createDimsVector(e,t){e.startVector(8,t.length,8);for(let r=t.length-1;r>=0;r--)e.addInt64(t[r]);return e.endVector()}static startDimsVector(e,t){e.startVector(8,t,8)}static addDataType(e,t){e.addFieldInt32(3,t,o.TensorDataType.UNDEFINED)}static addRawData(e,t){e.addFieldOffset(4,t,0)}static createRawDataVector(e,t){e.startVector(1,t.length,1);for(let r=t.length-1;r>=0;r--)e.addInt8(t[r]);return e.endVector()}static startRawDataVector(e,t){e.startVector(1,t,1)}static addStringData(e,t){e.addFieldOffset(5,t,0)}static createStringDataVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startStringDataVector(e,t){e.startVector(4,t,4)}static addExternalDataOffset(e,t){e.addFieldInt64(6,t,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(t,r,n,i,o,a,s,u){return e.startTensor(t),e.addName(t,r),e.addDocString(t,n),e.addDims(t,i),e.addDataType(t,o),e.addRawData(t,a),e.addStringData(t,s),e.addExternalDataOffset(t,u),e.endTensor(t)}}}),mu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.SparseTensor=void 0;var i=n(Ne()),o=xo();e.SparseTensor=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsSparseTensor(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsSparseTensor(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}values(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new o.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}indices(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new o.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}dims(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,t){e.addFieldOffset(0,t,0)}static addIndices(e,t){e.addFieldOffset(1,t,0)}static addDims(e,t){e.addFieldOffset(2,t,0)}static createDimsVector(e,t){e.startVector(8,t.length,8);for(let r=t.length-1;r>=0;r--)e.addInt64(t[r]);return e.endVector()}static startDimsVector(e,t){e.startVector(8,t,8)}static endSparseTensor(e){return e.endObject()}}}),bu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.MapType=void 0;var i=n(Ne()),o=vo(),a=To();e.MapType=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsMapType(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsMapType(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):o.TensorDataType.UNDEFINED}valueType(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new a.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,t){e.addFieldInt32(0,t,o.TensorDataType.UNDEFINED)}static addValueType(e,t){e.addFieldOffset(1,t,0)}static endMapType(e){return e.endObject()}}}),_u=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.SequenceType=void 0;var i=n(Ne()),o=To();e.SequenceType=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsSequenceType(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsSequenceType(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}elemType(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new o.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,t){e.addFieldOffset(0,t,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(t,r){return e.startSequenceType(t),e.addElemType(t,r),e.endSequenceType(t)}}}),wu=oe(e=>{"use strict";var t,r;Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValueType=void 0,(r=t||(e.DimensionValueType=t={}))[r.UNKNOWN=0]="UNKNOWN",r[r.VALUE=1]="VALUE",r[r.PARAM=2]="PARAM"}),xu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValue=void 0;var i=n(Ne()),o=wu();e.DimensionValue=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDimensionValue(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDimensionValue(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):o.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,t){e.addFieldInt8(0,t,o.DimensionValueType.UNKNOWN)}static addDimValue(e,t){e.addFieldInt64(1,t,BigInt("0"))}static addDimParam(e,t){e.addFieldOffset(2,t,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(t,r,n,i){return e.startDimensionValue(t),e.addDimType(t,r),e.addDimValue(t,n),e.addDimParam(t,i),e.endDimensionValue(t)}}}),Iu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Dimension=void 0;var i=n(Ne()),o=xu();e.Dimension=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDimension(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDimension(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}value(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new o.DimensionValue).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}denotation(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}static startDimension(e){e.startObject(2)}static addValue(e,t){e.addFieldOffset(0,t,0)}static addDenotation(e,t){e.addFieldOffset(1,t,0)}static endDimension(e){return e.endObject()}static createDimension(t,r,n){return e.startDimension(t),e.addValue(t,r),e.addDenotation(t,n),e.endDimension(t)}}}),$u=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Shape=void 0;var i=n(Ne()),o=Iu();e.Shape=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsShape(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsShape(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}dim(e,t){let r=this.bb.__offset(this.bb_pos,4);return r?(t||new o.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,t){e.addFieldOffset(0,t,0)}static createDimVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startDimVector(e,t){e.startVector(4,t,4)}static endShape(e){return e.endObject()}static createShape(t,r){return e.startShape(t),e.addDim(t,r),e.endShape(t)}}}),Ou=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.TensorTypeAndShape=void 0;var i=n(Ne()),o=$u(),a=vo();e.TensorTypeAndShape=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTensorTypeAndShape(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTensorTypeAndShape(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):a.TensorDataType.UNDEFINED}shape(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new o.Shape).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,t){e.addFieldInt32(0,t,a.TensorDataType.UNDEFINED)}static addShape(e,t){e.addFieldOffset(1,t,0)}static endTensorTypeAndShape(e){return e.endObject()}}}),Pu=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.unionListToTypeInfoValue=e.unionToTypeInfoValue=e.TypeInfoValue=void 0;var t,r,n=bu(),i=_u(),o=Ou();(t=r||(e.TypeInfoValue=r={}))[t.NONE=0]="NONE",t[t.tensor_type=1]="tensor_type",t[t.sequence_type=2]="sequence_type",t[t.map_type=3]="map_type",e.unionToTypeInfoValue=function(e,t){switch(r[e]){case"NONE":default:return null;case"tensor_type":return t(new o.TensorTypeAndShape);case"sequence_type":return t(new i.SequenceType);case"map_type":return t(new n.MapType)}},e.unionListToTypeInfoValue=function(e,t,a){switch(r[e]){case"NONE":default:return null;case"tensor_type":return t(a,new o.TensorTypeAndShape);case"sequence_type":return t(a,new i.SequenceType);case"map_type":return t(a,new n.MapType)}}}),To=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.TypeInfo=void 0;var i=n(Ne()),o=Pu();e.TypeInfo=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTypeInfo(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTypeInfo(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}denotation(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):o.TypeInfoValue.NONE}value(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__union(e,this.bb_pos+t):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,t){e.addFieldOffset(0,t,0)}static addValueType(e,t){e.addFieldInt8(1,t,o.TypeInfoValue.NONE)}static addValue(e,t){e.addFieldOffset(2,t,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(t,r,n,i){return e.startTypeInfo(t),e.addDenotation(t,r),e.addValueType(t,n),e.addValue(t,i),e.endTypeInfo(t)}}}),Du=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.ValueInfo=void 0;var i=n(Ne()),o=To();e.ValueInfo=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsValueInfo(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsValueInfo(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}type(e){let t=this.bb.__offset(this.bb_pos,8);return t?(e||new o.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addType(e,t){e.addFieldOffset(2,t,0)}static endValueInfo(e){return e.endObject()}}}),Ei=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Graph=void 0;var i=n(Ne()),o=Ys(),a=ou(),s=pu(),u=mu(),l=xo(),d=Du();e.Graph=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsGraph(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsGraph(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}initializers(e,t){let r=this.bb.__offset(this.bb_pos,4);return r?(t||new l.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new d.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,t){let r=this.bb.__offset(this.bb_pos,8);return r?(t||new o.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,t){let r=this.bb.__offset(this.bb_pos,12);return r?(t||new a.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,t){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,t){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,t){let r=this.bb.__offset(this.bb_pos,18);return r?(t||new u.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let t=this.bb.__offset(this.bb_pos,20);return t?(e||new s.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,t){e.addFieldOffset(0,t,0)}static createInitializersVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startInitializersVector(e,t){e.startVector(4,t,4)}static addNodeArgs(e,t){e.addFieldOffset(1,t,0)}static createNodeArgsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startNodeArgsVector(e,t){e.startVector(4,t,4)}static addNodes(e,t){e.addFieldOffset(2,t,0)}static createNodesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startNodesVector(e,t){e.startVector(4,t,4)}static addMaxNodeIndex(e,t){e.addFieldInt32(3,t,0)}static addNodeEdges(e,t){e.addFieldOffset(4,t,0)}static createNodeEdgesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startNodeEdgesVector(e,t){e.startVector(4,t,4)}static addInputs(e,t){e.addFieldOffset(5,t,0)}static createInputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startInputsVector(e,t){e.startVector(4,t,4)}static addOutputs(e,t){e.addFieldOffset(6,t,0)}static createOutputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startOutputsVector(e,t){e.startVector(4,t,4)}static addSparseInitializers(e,t){e.addFieldOffset(7,t,0)}static createSparseInitializersVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startSparseInitializersVector(e,t){e.startVector(4,t,4)}static addRuntimeOptimizations(e,t){e.addFieldOffset(8,t,0)}static endGraph(e){return e.endObject()}}}),eu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Attribute=void 0;var i=n(Ne()),o=Zs(),a=Ei(),s=xo();e.Attribute=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsAttribute(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsAttribute(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):o.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb_pos+t,e):null}t(e){let t=this.bb.__offset(this.bb_pos,16);return t?(e||new s.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}g(e){let t=this.bb.__offset(this.bb_pos,18);return t?(e||new a.Graph).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}floats(e){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readFloat32(this.bb.__vector(this.bb_pos+t)+4*e):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,t){let r=this.bb.__offset(this.bb_pos,24);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,t){let r=this.bb.__offset(this.bb_pos,26);return r?(t||new s.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,t){let r=this.bb.__offset(this.bb_pos,28);return r?(t||new a.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addType(e,t){e.addFieldInt32(2,t,o.AttributeType.UNDEFINED)}static addF(e,t){e.addFieldFloat32(3,t,0)}static addI(e,t){e.addFieldInt64(4,t,BigInt("0"))}static addS(e,t){e.addFieldOffset(5,t,0)}static addT(e,t){e.addFieldOffset(6,t,0)}static addG(e,t){e.addFieldOffset(7,t,0)}static addFloats(e,t){e.addFieldOffset(8,t,0)}static createFloatsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addFloat32(t[r]);return e.endVector()}static startFloatsVector(e,t){e.startVector(4,t,4)}static addInts(e,t){e.addFieldOffset(9,t,0)}static createIntsVector(e,t){e.startVector(8,t.length,8);for(let r=t.length-1;r>=0;r--)e.addInt64(t[r]);return e.endVector()}static startIntsVector(e,t){e.startVector(8,t,8)}static addStrings(e,t){e.addFieldOffset(10,t,0)}static createStringsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startStringsVector(e,t){e.startVector(4,t,4)}static addTensors(e,t){e.addFieldOffset(11,t,0)}static createTensorsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startTensorsVector(e,t){e.startVector(4,t,4)}static addGraphs(e,t){e.addFieldOffset(12,t,0)}static createGraphsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startGraphsVector(e,t){e.startVector(4,t,4)}static endAttribute(e){return e.endObject()}}}),Ru=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedKernelCreateInfos=void 0;var i=n(Ne());e.DeprecatedKernelCreateInfos=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedKernelCreateInfos(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndices(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb.__vector(this.bb_pos+t)+4*e):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,t){e.addFieldOffset(0,t,0)}static createNodeIndicesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addInt32(t[r]);return e.endVector()}static startNodeIndicesVector(e,t){e.startVector(4,t,4)}static addKernelDefHashes(e,t){e.addFieldOffset(1,t,0)}static createKernelDefHashesVector(e,t){e.startVector(8,t.length,8);for(let r=t.length-1;r>=0;r--)e.addInt64(t[r]);return e.endVector()}static startKernelDefHashesVector(e,t){e.startVector(8,t,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(t,r,n){return e.startDeprecatedKernelCreateInfos(t),e.addNodeIndices(t,r),e.addKernelDefHashes(t,n),e.endDeprecatedKernelCreateInfos(t)}}}),th=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedNodeIndexAndKernelDefHash=void 0;var i=n(Ne());e.DeprecatedNodeIndexAndKernelDefHash=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,t){e.addFieldInt32(0,t,0)}static addKernelDefHash(e,t){e.addFieldInt64(1,t,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(t,r,n){return e.startDeprecatedNodeIndexAndKernelDefHash(t),e.addNodeIndex(t,r),e.addKernelDefHash(t,n),e.endDeprecatedNodeIndexAndKernelDefHash(t)}}}),Bu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSubGraphSessionState=void 0;var i=n(Ne()),o=Fu();e.DeprecatedSubGraphSessionState=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedSubGraphSessionState(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}graphId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}sessionState(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new o.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,t){e.addFieldOffset(0,t,0)}static addSessionState(e,t){e.addFieldOffset(1,t,0)}static endDeprecatedSubGraphSessionState(e){let t=e.endObject();return e.requiredField(t,4),t}}}),Fu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSessionState=void 0;var i=n(Ne()),o=Ru(),a=Bu();e.DeprecatedSessionState=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedSessionState(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedSessionState(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}kernels(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new o.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}subGraphSessionStates(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new a.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,t){e.addFieldOffset(0,t,0)}static addSubGraphSessionStates(e,t){e.addFieldOffset(1,t,0)}static createSubGraphSessionStatesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startSubGraphSessionStatesVector(e,t){e.startVector(4,t,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(t,r,n){return e.startDeprecatedSessionState(t),e.addKernels(t,r),e.addSubGraphSessionStates(t,n),e.endDeprecatedSessionState(t)}}}),Uu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrArgsEntry=void 0;var i=n(Ne()),o=Xs();e.KernelTypeStrArgsEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsKernelTypeStrArgsEntry(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}kernelTypeStr(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}args(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new o.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,t){e.addFieldOffset(0,t,0)}static addArgs(e,t){e.addFieldOffset(1,t,0)}static createArgsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startArgsVector(e,t){e.startVector(4,t,4)}static endKernelTypeStrArgsEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createKernelTypeStrArgsEntry(t,r,n){return e.startKernelTypeStrArgsEntry(t),e.addKernelTypeStr(t,r),e.addArgs(t,n),e.endKernelTypeStrArgsEntry(t)}}}),Hu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.OpIdKernelTypeStrArgsEntry=void 0;var i=n(Ne()),o=Uu();e.OpIdKernelTypeStrArgsEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsOpIdKernelTypeStrArgsEntry(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}opId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}kernelTypeStrArgs(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new o.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,t){e.addFieldOffset(0,t,0)}static addKernelTypeStrArgs(e,t){e.addFieldOffset(1,t,0)}static createKernelTypeStrArgsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startKernelTypeStrArgsVector(e,t){e.startVector(4,t,4)}static endOpIdKernelTypeStrArgsEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createOpIdKernelTypeStrArgsEntry(t,r,n){return e.startOpIdKernelTypeStrArgsEntry(t),e.addOpId(t,r),e.addKernelTypeStrArgs(t,n),e.endOpIdKernelTypeStrArgsEntry(t)}}}),ju=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrResolver=void 0;var i=n(Ne()),o=Hu();e.KernelTypeStrResolver=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsKernelTypeStrResolver(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsKernelTypeStrResolver(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}opKernelTypeStrArgs(e,t){let r=this.bb.__offset(this.bb_pos,4);return r?(t||new o.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,t){e.addFieldOffset(0,t,0)}static createOpKernelTypeStrArgsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,t){e.startVector(4,t,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(t,r){return e.startKernelTypeStrResolver(t),e.addOpKernelTypeStrArgs(t,r),e.endKernelTypeStrResolver(t)}}}),Xu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.OperatorSetId=void 0;var i=n(Ne());e.OperatorSetId=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsOperatorSetId(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsOperatorSetId(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}domain(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,t){e.addFieldOffset(0,t,0)}static addVersion(e,t){e.addFieldInt64(1,t,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(t,r,n){return e.startOperatorSetId(t),e.addDomain(t,r),e.addVersion(t,n),e.endOperatorSetId(t)}}}),Ju=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.StringStringEntry=void 0;var i=n(Ne());e.StringStringEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsStringStringEntry(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsStringStringEntry(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}key(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}value(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,t){e.addFieldOffset(0,t,0)}static addValue(e,t){e.addFieldOffset(1,t,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(t,r,n){return e.startStringStringEntry(t),e.addKey(t,r),e.addValue(t,n),e.endStringStringEntry(t)}}}),Yu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Model=void 0;var i=n(Ne()),o=Ei(),a=Xu(),s=Ju();e.Model=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsModel(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsModel(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new a.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}producerVersion(e){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb_pos+t,e):null}domain(e){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__string(this.bb_pos+t,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb_pos+t,e):null}graph(e){let t=this.bb.__offset(this.bb_pos,18);return t?(e||new o.Graph).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}graphDocString(e){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb_pos+t,e):null}metadataProps(e,t){let r=this.bb.__offset(this.bb_pos,22);return r?(t||new s.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,t){e.addFieldInt64(0,t,BigInt("0"))}static addOpsetImport(e,t){e.addFieldOffset(1,t,0)}static createOpsetImportVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startOpsetImportVector(e,t){e.startVector(4,t,4)}static addProducerName(e,t){e.addFieldOffset(2,t,0)}static addProducerVersion(e,t){e.addFieldOffset(3,t,0)}static addDomain(e,t){e.addFieldOffset(4,t,0)}static addModelVersion(e,t){e.addFieldInt64(5,t,BigInt("0"))}static addDocString(e,t){e.addFieldOffset(6,t,0)}static addGraph(e,t){e.addFieldOffset(7,t,0)}static addGraphDocString(e,t){e.addFieldOffset(8,t,0)}static addMetadataProps(e,t){e.addFieldOffset(9,t,0)}static createMetadataPropsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startMetadataPropsVector(e,t){e.startVector(4,t,4)}static endModel(e){return e.endObject()}}}),nh=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.InferenceSession=void 0;var i=n(Ne()),o=ju(),a=Yu();e.InferenceSession=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsInferenceSession(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsInferenceSession(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}model(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new a.Model).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}kernelTypeStrResolver(e){let t=this.bb.__offset(this.bb_pos,10);return t?(e||new o.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,t){e.addFieldOffset(0,t,0)}static addModel(e,t){e.addFieldOffset(1,t,0)}static addKernelTypeStrResolver(e,t){e.addFieldOffset(3,t,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,t){e.finish(t,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,t){e.finish(t,"ORTM",!0)}}}),rh=N(()=>{"use strict";u$=_e(Gs()),l$=_e(Xs()),Ci=_e(eu()),Lt=_e(Zs()),c$=_e(Ru()),d$=_e(th()),p$=_e(Fu()),f$=_e(Bu()),h$=_e(Iu()),m$=_e(xu()),g$=_e(wu()),b$=_e(nu()),tl=_e(Ei()),nl=_e(nh()),y$=_e(Uu()),_$=_e(ju()),w$=_e(bu()),v$=_e(Yu()),rl=_e(Ys()),x$=_e(ou()),T$=_e(Js()),I$=_e(au()),S$=_e(Hu()),$$=_e(Xu()),A$=_e(uu()),O$=_e(cu()),P$=_e(pu()),E$=_e(_u()),C$=_e($u()),D$=_e(mu()),k$=_e(Ju()),N$=_e(xo()),Io=_e(vo()),ol=_e(Ou()),L$=_e(To()),il=_e(Pu()),R$=_e(Du())}),So=N(()=>{"use strict";rh()}),ih=oe((e,t)=>{"use strict";t.exports=function(e,t){for(var r=Array(arguments.length-1),n=0,i=2,o=!0;i<arguments.length;)r[n++]=arguments[i++];return new Promise(function(i,a){r[n]=function(e){if(o)if(o=!1,e)a(e);else{for(var t=Array(arguments.length-1),r=0;r<t.length;)t[r++]=arguments[r];i.apply(null,t)}};try{e.apply(t||null,r)}catch(e){o&&(o=!1,a(e))}})}}),lh=oe(e=>{"use strict";e.length=function(e){var t=e.length;if(!t)return 0;for(var r=0;--t%4>1&&"="===e.charAt(t);)++r;return Math.ceil(3*e.length)/4-r};var t,r=Array(64),n=Array(123);for(t=0;t<64;)n[r[t]=t<26?t+65:t<52?t+71:t<62?t-4:t-59|43]=t++;e.encode=function(e,t,n){for(var i,o=null,a=[],s=0,u=0;t<n;){var l=e[t++];switch(u){case 0:a[s++]=r[l>>2],i=(3&l)<<4,u=1;break;case 1:a[s++]=r[i|l>>4],i=(15&l)<<2,u=2;break;case 2:a[s++]=r[i|l>>6],a[s++]=r[63&l],u=0}s>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,a)),s=0)}return u&&(a[s++]=r[i],a[s++]=61,1===u&&(a[s++]=61)),o?(s&&o.push(String.fromCharCode.apply(String,a.slice(0,s))),o.join("")):String.fromCharCode.apply(String,a.slice(0,s))};var i="invalid encoding";e.decode=function(e,t,r){for(var o,a=r,s=0,u=0;u<e.length;){var l=e.charCodeAt(u++);if(61===l&&s>1)break;if(void 0===(l=n[l]))throw Error(i);switch(s){case 0:o=l,s=1;break;case 1:t[r++]=o<<2|(48&l)>>4,o=l,s=2;break;case 2:t[r++]=(15&o)<<4|(60&l)>>2,o=l,s=3;break;case 3:t[r++]=(3&o)<<6|l,s=0}}if(1===s)throw Error(i);return r-a},e.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}}),dh=oe((e,t)=>{"use strict";function r(){this._listeners={}}t.exports=r,r.prototype.on=function(e,t,r){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:t,ctx:r||this}),this},r.prototype.off=function(e,t){if(void 0===e)this._listeners={};else if(void 0===t)this._listeners[e]=[];else for(var r=this._listeners[e],n=0;n<r.length;)r[n].fn===t?r.splice(n,1):++n;return this},r.prototype.emit=function(e){var t=this._listeners[e];if(t){for(var r=[],n=1;n<arguments.length;)r.push(arguments[n++]);for(n=0;n<t.length;)t[n].fn.apply(t[n++].ctx,r)}return this}}),yh=oe((e,t)=>{"use strict";function r(e){return"u">typeof Float32Array?function(){var t=new Float32Array([-0]),r=new Uint8Array(t.buffer),n=128===r[3];function i(e,n,i){t[0]=e,n[i]=r[0],n[i+1]=r[1],n[i+2]=r[2],n[i+3]=r[3]}function o(e,n,i){t[0]=e,n[i]=r[3],n[i+1]=r[2],n[i+2]=r[1],n[i+3]=r[0]}function a(e,n){return r[0]=e[n],r[1]=e[n+1],r[2]=e[n+2],r[3]=e[n+3],t[0]}function s(e,n){return r[3]=e[n],r[2]=e[n+1],r[1]=e[n+2],r[0]=e[n+3],t[0]}e.writeFloatLE=n?i:o,e.writeFloatBE=n?o:i,e.readFloatLE=n?a:s,e.readFloatBE=n?s:a}():function(){function t(e,t,r,n){var i=+(t<0);if(i&&(t=-t),0===t)e(1/t>0?0:0x80000000,r,n);else if(isNaN(t))e(0x7fc00000,r,n);else if(t>34028234663852886e22)e((i<<31|0x7f800000)>>>0,r,n);else if(t<11754943508222875e-54)e((i<<31|Math.round(t/1401298464324817e-60))>>>0,r,n);else{var o=Math.floor(Math.log(t)/Math.LN2),a=8388607&Math.round(t*Math.pow(2,-o)*8388608);e((i<<31|o+127<<23|a)>>>0,r,n)}}function r(e,t,r){var n=e(t,r),i=(n>>31)*2+1,o=n>>>23&255,a=8388607&n;return 255===o?a?0/0:1/0*i:0===o?1401298464324817e-60*i*a:i*Math.pow(2,o-150)*(a+8388608)}e.writeFloatLE=t.bind(null,n),e.writeFloatBE=t.bind(null,i),e.readFloatLE=r.bind(null,o),e.readFloatBE=r.bind(null,a)}(),"u">typeof Float64Array?function(){var t=new Float64Array([-0]),r=new Uint8Array(t.buffer),n=128===r[7];function i(e,n,i){t[0]=e,n[i]=r[0],n[i+1]=r[1],n[i+2]=r[2],n[i+3]=r[3],n[i+4]=r[4],n[i+5]=r[5],n[i+6]=r[6],n[i+7]=r[7]}function o(e,n,i){t[0]=e,n[i]=r[7],n[i+1]=r[6],n[i+2]=r[5],n[i+3]=r[4],n[i+4]=r[3],n[i+5]=r[2],n[i+6]=r[1],n[i+7]=r[0]}function a(e,n){return r[0]=e[n],r[1]=e[n+1],r[2]=e[n+2],r[3]=e[n+3],r[4]=e[n+4],r[5]=e[n+5],r[6]=e[n+6],r[7]=e[n+7],t[0]}function s(e,n){return r[7]=e[n],r[6]=e[n+1],r[5]=e[n+2],r[4]=e[n+3],r[3]=e[n+4],r[2]=e[n+5],r[1]=e[n+6],r[0]=e[n+7],t[0]}e.writeDoubleLE=n?i:o,e.writeDoubleBE=n?o:i,e.readDoubleLE=n?a:s,e.readDoubleBE=n?s:a}():function(){function t(e,t,r,n,i,o){var a,s=+(n<0);if(s&&(n=-n),0===n)e(0,i,o+t),e(1/n>0?0:0x80000000,i,o+r);else if(isNaN(n))e(0,i,o+t),e(0x7ff80000,i,o+r);else if(n>17976931348623157e292)e(0,i,o+t),e((s<<31|0x7ff00000)>>>0,i,o+r);else if(n<22250738585072014e-324)e((a=n/5e-324)>>>0,i,o+t),e((s<<31|a/0x100000000)>>>0,i,o+r);else{var u=Math.floor(Math.log(n)/Math.LN2);1024===u&&(u=1023),e(0x10000000000000*(a=n*Math.pow(2,-u))>>>0,i,o+t),e((s<<31|u+1023<<20|1048576*a&1048575)>>>0,i,o+r)}}function r(e,t,r,n,i){var o=e(n,i+t),a=e(n,i+r),s=(a>>31)*2+1,u=a>>>20&2047,l=0x100000000*(1048575&a)+o;return 2047===u?l?0/0:1/0*s:0===u?5e-324*s*l:s*Math.pow(2,u-1075)*(l+0x10000000000000)}e.writeDoubleLE=t.bind(null,n,0,4),e.writeDoubleBE=t.bind(null,i,4,0),e.readDoubleLE=r.bind(null,o,0,4),e.readDoubleBE=r.bind(null,a,4,0)}(),e}function n(e,t,r){t[r]=255&e,t[r+1]=e>>>8&255,t[r+2]=e>>>16&255,t[r+3]=e>>>24}function i(e,t,r){t[r]=e>>>24,t[r+1]=e>>>16&255,t[r+2]=e>>>8&255,t[r+3]=255&e}function o(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0}function a(e,t){return(e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3])>>>0}t.exports=r(r)}),_h=oe((exports,module)=>{"use strict";function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(r){}return null}module.exports=inquire}),vh=oe(e=>{"use strict";e.length=function(e){for(var t=0,r=0,n=0;n<e.length;++n)(r=e.charCodeAt(n))<128?t+=1:r<2048?t+=2:(64512&r)==55296&&(64512&e.charCodeAt(n+1))==56320?(++n,t+=4):t+=3;return t},e.read=function(e,t,r){if(r-t<1)return"";for(var n,i=null,o=[],a=0;t<r;)(n=e[t++])<128?o[a++]=n:n>191&&n<224?o[a++]=(31&n)<<6|63&e[t++]:n>239&&n<365?(n=((7&n)<<18|(63&e[t++])<<12|(63&e[t++])<<6|63&e[t++])-65536,o[a++]=55296+(n>>10),o[a++]=56320+(1023&n)):o[a++]=(15&n)<<12|(63&e[t++])<<6|63&e[t++],a>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,o)),a=0);return i?(a&&i.push(String.fromCharCode.apply(String,o.slice(0,a))),i.join("")):String.fromCharCode.apply(String,o.slice(0,a))},e.write=function(e,t,r){for(var n,i,o=r,a=0;a<e.length;++a)(n=e.charCodeAt(a))<128?t[r++]=n:(n<2048?t[r++]=n>>6|192:((64512&n)==55296&&(64512&(i=e.charCodeAt(a+1)))==56320?(n=65536+((1023&n)<<10)+(1023&i),++a,t[r++]=n>>18|240,t[r++]=n>>12&63|128):t[r++]=n>>12|224,t[r++]=n>>6&63|128),t[r++]=63&n|128);return r-o}}),Th=oe((e,t)=>{"use strict";t.exports=function(e,t,r){var n=r||8192,i=n>>>1,o=null,a=n;return function(r){if(r<1||r>i)return e(r);a+r>n&&(o=e(n),a=0);var s=t.call(o,a,a+=r);return 7&a&&(a=(7|a)+1),s}}}),Sh=oe((e,t)=>{"use strict";t.exports=n;var r=fr();function n(e,t){this.lo=e>>>0,this.hi=t>>>0}var i=n.zero=new n(0,0);i.toNumber=function(){return 0},i.zzEncode=i.zzDecode=function(){return this},i.length=function(){return 1};var o=n.zeroHash="\0\0\0\0\0\0\0\0";n.fromNumber=function(e){if(0===e)return i;var t=e<0;t&&(e=-e);var r=e>>>0,o=(e-r)/0x100000000>>>0;return t&&(o=~o>>>0,r=~r>>>0,++r>0xffffffff&&(r=0,++o>0xffffffff&&(o=0))),new n(r,o)},n.from=function(e){if("number"==typeof e)return n.fromNumber(e);if(r.isString(e))if(!r.Long)return n.fromNumber(parseInt(e,10));else e=r.Long.fromString(e);return e.low||e.high?new n(e.low>>>0,e.high>>>0):i},n.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var t=~this.lo+1>>>0,r=~this.hi>>>0;return t||(r=r+1>>>0),-(t+0x100000000*r)}return this.lo+0x100000000*this.hi},n.prototype.toLong=function(e){return r.Long?new r.Long(0|this.lo,0|this.hi,!!e):{low:0|this.lo,high:0|this.hi,unsigned:!!e}};var a=String.prototype.charCodeAt;n.fromHash=function(e){return e===o?i:new n((a.call(e,0)|a.call(e,1)<<8|a.call(e,2)<<16|a.call(e,3)<<24)>>>0,(a.call(e,4)|a.call(e,5)<<8|a.call(e,6)<<16|a.call(e,7)<<24)>>>0)},n.prototype.toHash=function(){return String.fromCharCode(255&this.lo,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,255&this.hi,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)},n.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this},n.prototype.zzDecode=function(){var e=-(1&this.lo);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this},n.prototype.length=function(){var e=this.lo,t=(this.lo>>>28|this.hi<<4)>>>0,r=this.hi>>>24;return 0===r?0===t?e<16384?e<128?1:2:e<2097152?3:4:t<16384?t<128?5:6:t<2097152?7:8:r<128?9:10}}),fr=oe(e=>{"use strict";function t(e,t,r){for(var n=Object.keys(t),i=0;i<n.length;++i)void 0!==e[n[i]]&&r||(e[n[i]]=t[n[i]]);return e}function r(e){function r(e,n){if(!(this instanceof r))return new r(e,n);Object.defineProperty(this,"message",{get:function(){return e}}),Error.captureStackTrace?Error.captureStackTrace(this,r):Object.defineProperty(this,"stack",{value:Error().stack||""}),n&&t(this,n)}return r.prototype=Object.create(Error.prototype,{constructor:{value:r,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return e},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),r}e.asPromise=ih(),e.base64=lh(),e.EventEmitter=dh(),e.float=yh(),e.inquire=_h(),e.utf8=vh(),e.pool=Th(),e.LongBits=Sh(),e.isNode=!!("u">typeof global&&global&&global.process&&global.process.versions&&global.process.versions.node),e.global=e.isNode&&global||"u">typeof window&&window||"u">typeof self&&self||e,e.emptyArray=Object.freeze?Object.freeze([]):[],e.emptyObject=Object.freeze?Object.freeze({}):{},e.isInteger=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},e.isString=function(e){return"string"==typeof e||e instanceof String},e.isObject=function(e){return e&&"object"==typeof e},e.isset=e.isSet=function(e,t){var r=e[t];return!!(null!=r&&e.hasOwnProperty(t))&&("object"!=typeof r||(Array.isArray(r)?r.length:Object.keys(r).length)>0)},e.Buffer=function(){try{var t=e.inquire("buffer").Buffer;return t.prototype.utf8Write?t:null}catch{return null}}(),e._Buffer_from=null,e._Buffer_allocUnsafe=null,e.newBuffer=function(t){return"number"==typeof t?e.Buffer?e._Buffer_allocUnsafe(t):new e.Array(t):e.Buffer?e._Buffer_from(t):typeof Uint8Array>"u"?t:new Uint8Array(t)},e.Array="u">typeof Uint8Array?Uint8Array:Array,e.Long=e.global.dcodeIO&&e.global.dcodeIO.Long||e.global.Long||e.inquire("long"),e.key2Re=/^true|false|0|1$/,e.key32Re=/^-?(?:0|[1-9][0-9]*)$/,e.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,e.longToHash=function(t){return t?e.LongBits.from(t).toHash():e.LongBits.zeroHash},e.longFromHash=function(t,r){var n=e.LongBits.fromHash(t);return e.Long?e.Long.fromBits(n.lo,n.hi,r):n.toNumber(!!r)},e.merge=t,e.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)},e.newError=r,e.ProtocolError=r("ProtocolError"),e.oneOfGetter=function(e){for(var t={},r=0;r<e.length;++r)t[e[r]]=1;return function(){for(var e=Object.keys(this),r=e.length-1;r>-1;--r)if(1===t[e[r]]&&void 0!==this[e[r]]&&null!==this[e[r]])return e[r]}},e.oneOfSetter=function(e){return function(t){for(var r=0;r<e.length;++r)e[r]!==t&&delete this[e[r]]}},e.toJSONOptions={longs:String,enums:String,bytes:String,json:!0},e._configure=function(){var t=e.Buffer;if(!t){e._Buffer_from=e._Buffer_allocUnsafe=null;return}e._Buffer_from=t.from!==Uint8Array.from&&t.from||function(e,r){return new t(e,r)},e._Buffer_allocUnsafe=t.allocUnsafe||function(e){return new t(e)}}}),hl=oe((e,t)=>{"use strict";t.exports=d;var r,n=fr(),i=n.LongBits,o=n.base64,a=n.utf8;function s(e,t,r){this.fn=e,this.len=t,this.next=void 0,this.val=r}function u(){}function l(e){this.head=e.head,this.tail=e.tail,this.len=e.len,this.next=e.states}function d(){this.len=0,this.head=new s(u,0,0),this.tail=this.head,this.states=null}var p=function(){return n.Buffer?function(){return(d.create=function(){return new r})()}:function(){return new d}};function c(e,t,r){t[r]=255&e}function h(e,t){this.len=e,this.next=void 0,this.val=t}function f(e,t,r){for(;e.hi;)t[r++]=127&e.lo|128,e.lo=(e.lo>>>7|e.hi<<25)>>>0,e.hi>>>=7;for(;e.lo>127;)t[r++]=127&e.lo|128,e.lo=e.lo>>>7;t[r++]=e.lo}function m(e,t,r){t[r]=255&e,t[r+1]=e>>>8&255,t[r+2]=e>>>16&255,t[r+3]=e>>>24}d.create=p(),d.alloc=function(e){return new n.Array(e)},n.Array!==Array&&(d.alloc=n.pool(d.alloc,n.Array.prototype.subarray)),d.prototype._push=function(e,t,r){return this.tail=this.tail.next=new s(e,t,r),this.len+=t,this},h.prototype=Object.create(s.prototype),h.prototype.fn=function(e,t,r){for(;e>127;)t[r++]=127&e|128,e>>>=7;t[r]=e},d.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new h((e>>>=0)<128?1:e<16384?2:e<2097152?3:e<0x10000000?4:5,e)).len,this},d.prototype.int32=function(e){return e<0?this._push(f,10,i.fromNumber(e)):this.uint32(e)},d.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)},d.prototype.uint64=function(e){var t=i.from(e);return this._push(f,t.length(),t)},d.prototype.int64=d.prototype.uint64,d.prototype.sint64=function(e){var t=i.from(e).zzEncode();return this._push(f,t.length(),t)},d.prototype.bool=function(e){return this._push(c,1,+!!e)},d.prototype.fixed32=function(e){return this._push(m,4,e>>>0)},d.prototype.sfixed32=d.prototype.fixed32,d.prototype.fixed64=function(e){var t=i.from(e);return this._push(m,4,t.lo)._push(m,4,t.hi)},d.prototype.sfixed64=d.prototype.fixed64,d.prototype.float=function(e){return this._push(n.float.writeFloatLE,4,e)},d.prototype.double=function(e){return this._push(n.float.writeDoubleLE,8,e)};var g=n.Array.prototype.set?function(e,t,r){t.set(e,r)}:function(e,t,r){for(var n=0;n<e.length;++n)t[r+n]=e[n]};d.prototype.bytes=function(e){var t=e.length>>>0;if(!t)return this._push(c,1,0);if(n.isString(e)){var r=d.alloc(t=o.length(e));o.decode(e,r,0),e=r}return this.uint32(t)._push(g,t,e)},d.prototype.string=function(e){var t=a.length(e);return t?this.uint32(t)._push(a.write,t,e):this._push(c,1,0)},d.prototype.fork=function(){return this.states=new l(this),this.head=this.tail=new s(u,0,0),this.len=0,this},d.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new s(u,0,0),this.len=0),this},d.prototype.ldelim=function(){var e=this.head,t=this.tail,r=this.len;return this.reset().uint32(r),r&&(this.tail.next=e.next,this.tail=t,this.len+=r),this},d.prototype.finish=function(){for(var e=this.head.next,t=this.constructor.alloc(this.len),r=0;e;)e.fn(e.val,t,r),r+=e.len,e=e.next;return t},d._configure=function(e){r=e,d.create=p(),r._configure()}}),Nh=oe((e,t)=>{"use strict";t.exports=i;var r=hl();(i.prototype=Object.create(r.prototype)).constructor=i;var n=fr();function i(){r.call(this)}function o(e,t,r){e.length<40?n.utf8.write(e,t,r):t.utf8Write?t.utf8Write(e,r):t.write(e,r)}i._configure=function(){i.alloc=n._Buffer_allocUnsafe,i.writeBytesBuffer=n.Buffer&&n.Buffer.prototype instanceof Uint8Array&&"set"===n.Buffer.prototype.set.name?function(e,t,r){t.set(e,r)}:function(e,t,r){if(e.copy)e.copy(t,r,0,e.length);else for(var n=0;n<e.length;)t[r++]=e[n++]}},i.prototype.bytes=function(e){n.isString(e)&&(e=n._Buffer_from(e,"base64"));var t=e.length>>>0;return this.uint32(t),t&&this._push(i.writeBytesBuffer,t,e),this},i.prototype.string=function(e){var t=n.Buffer.byteLength(e);return this.uint32(t),t&&this._push(o,t,e),this},i._configure()}),bl=oe((e,t)=>{"use strict";t.exports=u;var r,n,i=fr(),o=i.LongBits,a=i.utf8;function s(e,t){return RangeError("index out of range: "+e.pos+" + "+(t||1)+" > "+e.len)}function u(e){this.buf=e,this.pos=0,this.len=e.length}var l="u">typeof Uint8Array?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new u(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new u(e);throw Error("illegal buffer")},d=function(){return i.Buffer?function(e){return(u.create=function(e){return i.Buffer.isBuffer(e)?new n(e):l(e)})(e)}:l};function p(){var e=new o(0,0),t=0;if(this.len-this.pos>4){for(;t<4;++t)if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e;if(e.lo=(e.lo|(127&this.buf[this.pos])<<28)>>>0,e.hi=(e.hi|(127&this.buf[this.pos])>>4)>>>0,this.buf[this.pos++]<128)return e;t=0}else{for(;t<3;++t){if(this.pos>=this.len)throw s(this);if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e}return e.lo=(e.lo|(127&this.buf[this.pos++])<<7*t)>>>0,e}if(this.len-this.pos>4){for(;t<5;++t)if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}else for(;t<5;++t){if(this.pos>=this.len)throw s(this);if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}throw Error("invalid varint encoding")}function c(e,t){return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0}function h(){if(this.pos+8>this.len)throw s(this,8);return new o(c(this.buf,this.pos+=4),c(this.buf,this.pos+=4))}u.create=d(),u.prototype._slice=i.Array.prototype.subarray||i.Array.prototype.slice,u.prototype.uint32=(r=0xffffffff,function(){if(r=(127&this.buf[this.pos])>>>0,this.buf[this.pos++]<128||(r=(r|(127&this.buf[this.pos])<<7)>>>0,this.buf[this.pos++]<128)||(r=(r|(127&this.buf[this.pos])<<14)>>>0,this.buf[this.pos++]<128)||(r=(r|(127&this.buf[this.pos])<<21)>>>0,this.buf[this.pos++]<128)||(r=(r|(15&this.buf[this.pos])<<28)>>>0,this.buf[this.pos++]<128))return r;if((this.pos+=5)>this.len)throw this.pos=this.len,s(this,10);return r}),u.prototype.int32=function(){return 0|this.uint32()},u.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(1&e)},u.prototype.bool=function(){return 0!==this.uint32()},u.prototype.fixed32=function(){if(this.pos+4>this.len)throw s(this,4);return c(this.buf,this.pos+=4)},u.prototype.sfixed32=function(){if(this.pos+4>this.len)throw s(this,4);return 0|c(this.buf,this.pos+=4)},u.prototype.float=function(){if(this.pos+4>this.len)throw s(this,4);var e=i.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e},u.prototype.double=function(){if(this.pos+8>this.len)throw s(this,4);var e=i.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e},u.prototype.bytes=function(){var e=this.uint32(),t=this.pos,r=this.pos+e;if(r>this.len)throw s(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(t,r);if(t===r){var n=i.Buffer;return n?n.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,t,r)},u.prototype.string=function(){var e=this.bytes();return a.read(e,0,e.length)},u.prototype.skip=function(e){if("number"==typeof e){if(this.pos+e>this.len)throw s(this,e);this.pos+=e}else do if(this.pos>=this.len)throw s(this);while(128&this.buf[this.pos++])return this},u.prototype.skipType=function(e){switch(e){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;4!=(e=7&this.uint32());)this.skipType(e);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+e+" at offset "+this.pos)}return this},u._configure=function(e){n=e,u.create=d(),n._configure();var t=i.Long?"toLong":"toNumber";i.merge(u.prototype,{int64:function(){return p.call(this)[t](!1)},uint64:function(){return p.call(this)[t](!0)},sint64:function(){return p.call(this).zzDecode()[t](!1)},fixed64:function(){return h.call(this)[t](!0)},sfixed64:function(){return h.call(this)[t](!1)}})}}),Uh=oe((e,t)=>{"use strict";t.exports=i;var r=bl();(i.prototype=Object.create(r.prototype)).constructor=i;var n=fr();function i(e){r.call(this,e)}i._configure=function(){n.Buffer&&(i.prototype._slice=n.Buffer.prototype.slice)},i.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))},i._configure()}),Hh=oe((e,t)=>{"use strict";t.exports=n;var r=fr();function n(e,t,n){if("function"!=typeof e)throw TypeError("rpcImpl must be a function");r.EventEmitter.call(this),this.rpcImpl=e,this.requestDelimited=!!t,this.responseDelimited=!!n}(n.prototype=Object.create(r.EventEmitter.prototype)).constructor=n,n.prototype.rpcCall=function e(t,n,i,o,a){if(!o)throw TypeError("request must be specified");var s=this;if(!a)return r.asPromise(e,s,t,n,i,o);if(!s.rpcImpl)return void setTimeout(function(){a(Error("already ended"))},0);try{return s.rpcImpl(t,n[s.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(e,r){if(e)return s.emit("error",e,t),a(e);if(null===r)return void s.end(!0);if(!(r instanceof i))try{r=i[s.responseDelimited?"decodeDelimited":"decode"](r)}catch(e){return s.emit("error",e,t),a(e)}return s.emit("data",r,t),a(null,r)})}catch(e){s.emit("error",e,t),setTimeout(function(){a(e)},0);return}},n.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}}),jh=oe(e=>{"use strict";e.Service=Hh()}),Xh=oe((e,t)=>{"use strict";t.exports={}}),Qh=oe(e=>{"use strict";function t(){e.util._configure(),e.Writer._configure(e.BufferWriter),e.Reader._configure(e.BufferReader)}e.build="minimal",e.Writer=hl(),e.BufferWriter=Nh(),e.Reader=bl(),e.BufferReader=Uh(),e.util=fr(),e.rpc=jh(),e.roots=Xh(),e.configure=t,t()}),em=oe((e,t)=>{"use strict";t.exports=Qh()}),Yr=oe((e,t)=>{"use strict";var r,n,i,o,a,s=em(),u=s.Reader,l=s.Writer,d=s.util,p=s.roots.default||(s.roots.default={});r={},(i=Object.create(n={}))[n[0]="_START_VERSION"]=0,i[n[1]="IR_VERSION_2017_10_10"]=1,i[n[2]="IR_VERSION_2017_10_30"]=2,i[n[3]="IR_VERSION_2017_11_3"]=3,i[n[4]="IR_VERSION_2019_1_22"]=4,i[n[5]="IR_VERSION_2019_3_18"]=5,i[n[6]="IR_VERSION_2019_9_19"]=6,i[n[7]="IR_VERSION_2020_5_8"]=7,i[n[8]="IR_VERSION_2021_7_30"]=8,i[n[9]="IR_VERSION"]=9,r.Version=i,r.AttributeProto=function(){var e,t;function r(e){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return r.prototype.name="",r.prototype.refAttrName="",r.prototype.docString="",r.prototype.type=0,r.prototype.f=0,r.prototype.i=d.Long?d.Long.fromBits(0,0,!1):0,r.prototype.s=d.newBuffer([]),r.prototype.t=null,r.prototype.g=null,r.prototype.sparseTensor=null,r.prototype.tp=null,r.prototype.floats=d.emptyArray,r.prototype.ints=d.emptyArray,r.prototype.strings=d.emptyArray,r.prototype.tensors=d.emptyArray,r.prototype.graphs=d.emptyArray,r.prototype.sparseTensors=d.emptyArray,r.prototype.typeProtos=d.emptyArray,r.create=function(e){return new r(e)},r.encode=function(e,t){if(t||(t=l.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.f&&Object.hasOwnProperty.call(e,"f")&&t.uint32(21).float(e.f),null!=e.i&&Object.hasOwnProperty.call(e,"i")&&t.uint32(24).int64(e.i),null!=e.s&&Object.hasOwnProperty.call(e,"s")&&t.uint32(34).bytes(e.s),null!=e.t&&Object.hasOwnProperty.call(e,"t")&&p.onnx.TensorProto.encode(e.t,t.uint32(42).fork()).ldelim(),null!=e.g&&Object.hasOwnProperty.call(e,"g")&&p.onnx.GraphProto.encode(e.g,t.uint32(50).fork()).ldelim(),null!=e.floats&&e.floats.length){t.uint32(58).fork();for(var r=0;r<e.floats.length;++r)t.float(e.floats[r]);t.ldelim()}if(null!=e.ints&&e.ints.length){t.uint32(66).fork();for(var r=0;r<e.ints.length;++r)t.int64(e.ints[r]);t.ldelim()}if(null!=e.strings&&e.strings.length)for(var r=0;r<e.strings.length;++r)t.uint32(74).bytes(e.strings[r]);if(null!=e.tensors&&e.tensors.length)for(var r=0;r<e.tensors.length;++r)p.onnx.TensorProto.encode(e.tensors[r],t.uint32(82).fork()).ldelim();if(null!=e.graphs&&e.graphs.length)for(var r=0;r<e.graphs.length;++r)p.onnx.GraphProto.encode(e.graphs[r],t.uint32(90).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(106).string(e.docString),null!=e.tp&&Object.hasOwnProperty.call(e,"tp")&&p.onnx.TypeProto.encode(e.tp,t.uint32(114).fork()).ldelim(),null!=e.typeProtos&&e.typeProtos.length)for(var r=0;r<e.typeProtos.length;++r)p.onnx.TypeProto.encode(e.typeProtos[r],t.uint32(122).fork()).ldelim();if(null!=e.type&&Object.hasOwnProperty.call(e,"type")&&t.uint32(160).int32(e.type),null!=e.refAttrName&&Object.hasOwnProperty.call(e,"refAttrName")&&t.uint32(170).string(e.refAttrName),null!=e.sparseTensor&&Object.hasOwnProperty.call(e,"sparseTensor")&&p.onnx.SparseTensorProto.encode(e.sparseTensor,t.uint32(178).fork()).ldelim(),null!=e.sparseTensors&&e.sparseTensors.length)for(var r=0;r<e.sparseTensors.length;++r)p.onnx.SparseTensorProto.encode(e.sparseTensors[r],t.uint32(186).fork()).ldelim();return t},r.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},r.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.AttributeProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.name=e.string();break;case 21:n.refAttrName=e.string();break;case 13:n.docString=e.string();break;case 20:n.type=e.int32();break;case 2:n.f=e.float();break;case 3:n.i=e.int64();break;case 4:n.s=e.bytes();break;case 5:n.t=p.onnx.TensorProto.decode(e,e.uint32());break;case 6:n.g=p.onnx.GraphProto.decode(e,e.uint32());break;case 22:n.sparseTensor=p.onnx.SparseTensorProto.decode(e,e.uint32());break;case 14:n.tp=p.onnx.TypeProto.decode(e,e.uint32());break;case 7:if(n.floats&&n.floats.length||(n.floats=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.floats.push(e.float());else n.floats.push(e.float());break;case 8:if(n.ints&&n.ints.length||(n.ints=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.ints.push(e.int64());else n.ints.push(e.int64());break;case 9:n.strings&&n.strings.length||(n.strings=[]),n.strings.push(e.bytes());break;case 10:n.tensors&&n.tensors.length||(n.tensors=[]),n.tensors.push(p.onnx.TensorProto.decode(e,e.uint32()));break;case 11:n.graphs&&n.graphs.length||(n.graphs=[]),n.graphs.push(p.onnx.GraphProto.decode(e,e.uint32()));break;case 23:n.sparseTensors&&n.sparseTensors.length||(n.sparseTensors=[]),n.sparseTensors.push(p.onnx.SparseTensorProto.decode(e,e.uint32()));break;case 15:n.typeProtos&&n.typeProtos.length||(n.typeProtos=[]),n.typeProtos.push(p.onnx.TypeProto.decode(e,e.uint32()));break;default:e.skipType(7&i)}}return n},r.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},r.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!d.isString(e.name))return"name: string expected";if(null!=e.refAttrName&&e.hasOwnProperty("refAttrName")&&!d.isString(e.refAttrName))return"refAttrName: string expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString))return"docString: string expected";if(null!=e.type&&e.hasOwnProperty("type"))switch(e.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:}if(null!=e.f&&e.hasOwnProperty("f")&&"number"!=typeof e.f)return"f: number expected";if(null!=e.i&&e.hasOwnProperty("i")&&!d.isInteger(e.i)&&!(e.i&&d.isInteger(e.i.low)&&d.isInteger(e.i.high)))return"i: integer|Long expected";if(null!=e.s&&e.hasOwnProperty("s")&&!(e.s&&"number"==typeof e.s.length||d.isString(e.s)))return"s: buffer expected";if(null!=e.t&&e.hasOwnProperty("t")){var t=p.onnx.TensorProto.verify(e.t);if(t)return"t."+t}if(null!=e.g&&e.hasOwnProperty("g")){var t=p.onnx.GraphProto.verify(e.g);if(t)return"g."+t}if(null!=e.sparseTensor&&e.hasOwnProperty("sparseTensor")){var t=p.onnx.SparseTensorProto.verify(e.sparseTensor);if(t)return"sparseTensor."+t}if(null!=e.tp&&e.hasOwnProperty("tp")){var t=p.onnx.TypeProto.verify(e.tp);if(t)return"tp."+t}if(null!=e.floats&&e.hasOwnProperty("floats")){if(!Array.isArray(e.floats))return"floats: array expected";for(var r=0;r<e.floats.length;++r)if("number"!=typeof e.floats[r])return"floats: number[] expected"}if(null!=e.ints&&e.hasOwnProperty("ints")){if(!Array.isArray(e.ints))return"ints: array expected";for(var r=0;r<e.ints.length;++r)if(!d.isInteger(e.ints[r])&&!(e.ints[r]&&d.isInteger(e.ints[r].low)&&d.isInteger(e.ints[r].high)))return"ints: integer|Long[] expected"}if(null!=e.strings&&e.hasOwnProperty("strings")){if(!Array.isArray(e.strings))return"strings: array expected";for(var r=0;r<e.strings.length;++r)if(!(e.strings[r]&&"number"==typeof e.strings[r].length||d.isString(e.strings[r])))return"strings: buffer[] expected"}if(null!=e.tensors&&e.hasOwnProperty("tensors")){if(!Array.isArray(e.tensors))return"tensors: array expected";for(var r=0;r<e.tensors.length;++r){var t=p.onnx.TensorProto.verify(e.tensors[r]);if(t)return"tensors."+t}}if(null!=e.graphs&&e.hasOwnProperty("graphs")){if(!Array.isArray(e.graphs))return"graphs: array expected";for(var r=0;r<e.graphs.length;++r){var t=p.onnx.GraphProto.verify(e.graphs[r]);if(t)return"graphs."+t}}if(null!=e.sparseTensors&&e.hasOwnProperty("sparseTensors")){if(!Array.isArray(e.sparseTensors))return"sparseTensors: array expected";for(var r=0;r<e.sparseTensors.length;++r){var t=p.onnx.SparseTensorProto.verify(e.sparseTensors[r]);if(t)return"sparseTensors."+t}}if(null!=e.typeProtos&&e.hasOwnProperty("typeProtos")){if(!Array.isArray(e.typeProtos))return"typeProtos: array expected";for(var r=0;r<e.typeProtos.length;++r){var t=p.onnx.TypeProto.verify(e.typeProtos[r]);if(t)return"typeProtos."+t}}return null},r.fromObject=function(e){if(e instanceof p.onnx.AttributeProto)return e;var t=new p.onnx.AttributeProto;switch(null!=e.name&&(t.name=String(e.name)),null!=e.refAttrName&&(t.refAttrName=String(e.refAttrName)),null!=e.docString&&(t.docString=String(e.docString)),e.type){default:"number"==typeof e.type&&(t.type=e.type);break;case"UNDEFINED":case 0:t.type=0;break;case"FLOAT":case 1:t.type=1;break;case"INT":case 2:t.type=2;break;case"STRING":case 3:t.type=3;break;case"TENSOR":case 4:t.type=4;break;case"GRAPH":case 5:t.type=5;break;case"SPARSE_TENSOR":case 11:t.type=11;break;case"TYPE_PROTO":case 13:t.type=13;break;case"FLOATS":case 6:t.type=6;break;case"INTS":case 7:t.type=7;break;case"STRINGS":case 8:t.type=8;break;case"TENSORS":case 9:t.type=9;break;case"GRAPHS":case 10:t.type=10;break;case"SPARSE_TENSORS":case 12:t.type=12;break;case"TYPE_PROTOS":case 14:t.type=14}if(null!=e.f&&(t.f=Number(e.f)),null!=e.i&&(d.Long?(t.i=d.Long.fromValue(e.i)).unsigned=!1:"string"==typeof e.i?t.i=parseInt(e.i,10):"number"==typeof e.i?t.i=e.i:"object"==typeof e.i&&(t.i=new d.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber())),null!=e.s&&("string"==typeof e.s?d.base64.decode(e.s,t.s=d.newBuffer(d.base64.length(e.s)),0):e.s.length>=0&&(t.s=e.s)),null!=e.t){if("object"!=typeof e.t)throw TypeError(".onnx.AttributeProto.t: object expected");t.t=p.onnx.TensorProto.fromObject(e.t)}if(null!=e.g){if("object"!=typeof e.g)throw TypeError(".onnx.AttributeProto.g: object expected");t.g=p.onnx.GraphProto.fromObject(e.g)}if(null!=e.sparseTensor){if("object"!=typeof e.sparseTensor)throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");t.sparseTensor=p.onnx.SparseTensorProto.fromObject(e.sparseTensor)}if(null!=e.tp){if("object"!=typeof e.tp)throw TypeError(".onnx.AttributeProto.tp: object expected");t.tp=p.onnx.TypeProto.fromObject(e.tp)}if(e.floats){if(!Array.isArray(e.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");t.floats=[];for(var r=0;r<e.floats.length;++r)t.floats[r]=Number(e.floats[r])}if(e.ints){if(!Array.isArray(e.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");t.ints=[];for(var r=0;r<e.ints.length;++r)d.Long?(t.ints[r]=d.Long.fromValue(e.ints[r])).unsigned=!1:"string"==typeof e.ints[r]?t.ints[r]=parseInt(e.ints[r],10):"number"==typeof e.ints[r]?t.ints[r]=e.ints[r]:"object"==typeof e.ints[r]&&(t.ints[r]=new d.LongBits(e.ints[r].low>>>0,e.ints[r].high>>>0).toNumber())}if(e.strings){if(!Array.isArray(e.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");t.strings=[];for(var r=0;r<e.strings.length;++r)"string"==typeof e.strings[r]?d.base64.decode(e.strings[r],t.strings[r]=d.newBuffer(d.base64.length(e.strings[r])),0):e.strings[r].length>=0&&(t.strings[r]=e.strings[r])}if(e.tensors){if(!Array.isArray(e.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");t.tensors=[];for(var r=0;r<e.tensors.length;++r){if("object"!=typeof e.tensors[r])throw TypeError(".onnx.AttributeProto.tensors: object expected");t.tensors[r]=p.onnx.TensorProto.fromObject(e.tensors[r])}}if(e.graphs){if(!Array.isArray(e.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");t.graphs=[];for(var r=0;r<e.graphs.length;++r){if("object"!=typeof e.graphs[r])throw TypeError(".onnx.AttributeProto.graphs: object expected");t.graphs[r]=p.onnx.GraphProto.fromObject(e.graphs[r])}}if(e.sparseTensors){if(!Array.isArray(e.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");t.sparseTensors=[];for(var r=0;r<e.sparseTensors.length;++r){if("object"!=typeof e.sparseTensors[r])throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");t.sparseTensors[r]=p.onnx.SparseTensorProto.fromObject(e.sparseTensors[r])}}if(e.typeProtos){if(!Array.isArray(e.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");t.typeProtos=[];for(var r=0;r<e.typeProtos.length;++r){if("object"!=typeof e.typeProtos[r])throw TypeError(".onnx.AttributeProto.typeProtos: object expected");t.typeProtos[r]=p.onnx.TypeProto.fromObject(e.typeProtos[r])}}return t},r.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.floats=[],r.ints=[],r.strings=[],r.tensors=[],r.graphs=[],r.typeProtos=[],r.sparseTensors=[]),t.defaults){if(r.name="",r.f=0,d.Long){var n=new d.Long(0,0,!1);r.i=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.i=t.longs===String?"0":0;t.bytes===String?r.s="":(r.s=[],t.bytes!==Array&&(r.s=d.newBuffer(r.s))),r.t=null,r.g=null,r.docString="",r.tp=null,r.type=t.enums===String?"UNDEFINED":0,r.refAttrName="",r.sparseTensor=null}if(null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),null!=e.f&&e.hasOwnProperty("f")&&(r.f=t.json&&!isFinite(e.f)?String(e.f):e.f),null!=e.i&&e.hasOwnProperty("i")&&("number"==typeof e.i?r.i=t.longs===String?String(e.i):e.i:r.i=t.longs===String?d.Long.prototype.toString.call(e.i):t.longs===Number?new d.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber():e.i),null!=e.s&&e.hasOwnProperty("s")&&(r.s=t.bytes===String?d.base64.encode(e.s,0,e.s.length):t.bytes===Array?Array.prototype.slice.call(e.s):e.s),null!=e.t&&e.hasOwnProperty("t")&&(r.t=p.onnx.TensorProto.toObject(e.t,t)),null!=e.g&&e.hasOwnProperty("g")&&(r.g=p.onnx.GraphProto.toObject(e.g,t)),e.floats&&e.floats.length){r.floats=[];for(var i=0;i<e.floats.length;++i)r.floats[i]=t.json&&!isFinite(e.floats[i])?String(e.floats[i]):e.floats[i]}if(e.ints&&e.ints.length){r.ints=[];for(var i=0;i<e.ints.length;++i)"number"==typeof e.ints[i]?r.ints[i]=t.longs===String?String(e.ints[i]):e.ints[i]:r.ints[i]=t.longs===String?d.Long.prototype.toString.call(e.ints[i]):t.longs===Number?new d.LongBits(e.ints[i].low>>>0,e.ints[i].high>>>0).toNumber():e.ints[i]}if(e.strings&&e.strings.length){r.strings=[];for(var i=0;i<e.strings.length;++i)r.strings[i]=t.bytes===String?d.base64.encode(e.strings[i],0,e.strings[i].length):t.bytes===Array?Array.prototype.slice.call(e.strings[i]):e.strings[i]}if(e.tensors&&e.tensors.length){r.tensors=[];for(var i=0;i<e.tensors.length;++i)r.tensors[i]=p.onnx.TensorProto.toObject(e.tensors[i],t)}if(e.graphs&&e.graphs.length){r.graphs=[];for(var i=0;i<e.graphs.length;++i)r.graphs[i]=p.onnx.GraphProto.toObject(e.graphs[i],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),null!=e.tp&&e.hasOwnProperty("tp")&&(r.tp=p.onnx.TypeProto.toObject(e.tp,t)),e.typeProtos&&e.typeProtos.length){r.typeProtos=[];for(var i=0;i<e.typeProtos.length;++i)r.typeProtos[i]=p.onnx.TypeProto.toObject(e.typeProtos[i],t)}if(null!=e.type&&e.hasOwnProperty("type")&&(r.type=t.enums===String?void 0===p.onnx.AttributeProto.AttributeType[e.type]?e.type:p.onnx.AttributeProto.AttributeType[e.type]:e.type),null!=e.refAttrName&&e.hasOwnProperty("refAttrName")&&(r.refAttrName=e.refAttrName),null!=e.sparseTensor&&e.hasOwnProperty("sparseTensor")&&(r.sparseTensor=p.onnx.SparseTensorProto.toObject(e.sparseTensor,t)),e.sparseTensors&&e.sparseTensors.length){r.sparseTensors=[];for(var i=0;i<e.sparseTensors.length;++i)r.sparseTensors[i]=p.onnx.SparseTensorProto.toObject(e.sparseTensors[i],t)}return r},r.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},r.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.AttributeProto"},(t=Object.create(e={}))[e[0]="UNDEFINED"]=0,t[e[1]="FLOAT"]=1,t[e[2]="INT"]=2,t[e[3]="STRING"]=3,t[e[4]="TENSOR"]=4,t[e[5]="GRAPH"]=5,t[e[11]="SPARSE_TENSOR"]=11,t[e[13]="TYPE_PROTO"]=13,t[e[6]="FLOATS"]=6,t[e[7]="INTS"]=7,t[e[8]="STRINGS"]=8,t[e[9]="TENSORS"]=9,t[e[10]="GRAPHS"]=10,t[e[12]="SPARSE_TENSORS"]=12,t[e[14]="TYPE_PROTOS"]=14,r.AttributeType=t,r}(),r.ValueInfoProto=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.type&&Object.hasOwnProperty.call(e,"type")&&p.onnx.TypeProto.encode(e.type,t.uint32(18).fork()).ldelim(),null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(26).string(e.docString),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.ValueInfoProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.name=e.string();break;case 2:n.type=p.onnx.TypeProto.decode(e,e.uint32());break;case 3:n.docString=e.string();break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!d.isString(e.name))return"name: string expected";if(null!=e.type&&e.hasOwnProperty("type")){var t=p.onnx.TypeProto.verify(e.type);if(t)return"type."+t}return null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString)?"docString: string expected":null},e.fromObject=function(e){if(e instanceof p.onnx.ValueInfoProto)return e;var t=new p.onnx.ValueInfoProto;if(null!=e.name&&(t.name=String(e.name)),null!=e.type){if("object"!=typeof e.type)throw TypeError(".onnx.ValueInfoProto.type: object expected");t.type=p.onnx.TypeProto.fromObject(e.type)}return null!=e.docString&&(t.docString=String(e.docString)),t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.name="",r.type=null,r.docString=""),null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),null!=e.type&&e.hasOwnProperty("type")&&(r.type=p.onnx.TypeProto.toObject(e.type,t)),null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.ValueInfoProto"},e}(),r.NodeProto=function(){function e(e){if(this.input=[],this.output=[],this.attribute=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.input=d.emptyArray,e.prototype.output=d.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=d.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.input&&e.input.length)for(var r=0;r<e.input.length;++r)t.uint32(10).string(e.input[r]);if(null!=e.output&&e.output.length)for(var r=0;r<e.output.length;++r)t.uint32(18).string(e.output[r]);if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(26).string(e.name),null!=e.opType&&Object.hasOwnProperty.call(e,"opType")&&t.uint32(34).string(e.opType),null!=e.attribute&&e.attribute.length)for(var r=0;r<e.attribute.length;++r)p.onnx.AttributeProto.encode(e.attribute[r],t.uint32(42).fork()).ldelim();return null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(50).string(e.docString),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(58).string(e.domain),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.NodeProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.input&&n.input.length||(n.input=[]),n.input.push(e.string());break;case 2:n.output&&n.output.length||(n.output=[]),n.output.push(e.string());break;case 3:n.name=e.string();break;case 4:n.opType=e.string();break;case 7:n.domain=e.string();break;case 5:n.attribute&&n.attribute.length||(n.attribute=[]),n.attribute.push(p.onnx.AttributeProto.decode(e,e.uint32()));break;case 6:n.docString=e.string();break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t)if(!d.isString(e.input[t]))return"input: string[] expected"}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t)if(!d.isString(e.output[t]))return"output: string[] expected"}if(null!=e.name&&e.hasOwnProperty("name")&&!d.isString(e.name))return"name: string expected";if(null!=e.opType&&e.hasOwnProperty("opType")&&!d.isString(e.opType))return"opType: string expected";if(null!=e.domain&&e.hasOwnProperty("domain")&&!d.isString(e.domain))return"domain: string expected";if(null!=e.attribute&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var t=0;t<e.attribute.length;++t){var r=p.onnx.AttributeProto.verify(e.attribute[t]);if(r)return"attribute."+r}}return null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString)?"docString: string expected":null},e.fromObject=function(e){if(e instanceof p.onnx.NodeProto)return e;var t=new p.onnx.NodeProto;if(e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.NodeProto.input: array expected");t.input=[];for(var r=0;r<e.input.length;++r)t.input[r]=String(e.input[r])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.NodeProto.output: array expected");t.output=[];for(var r=0;r<e.output.length;++r)t.output[r]=String(e.output[r])}if(null!=e.name&&(t.name=String(e.name)),null!=e.opType&&(t.opType=String(e.opType)),null!=e.domain&&(t.domain=String(e.domain)),e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");t.attribute=[];for(var r=0;r<e.attribute.length;++r){if("object"!=typeof e.attribute[r])throw TypeError(".onnx.NodeProto.attribute: object expected");t.attribute[r]=p.onnx.AttributeProto.fromObject(e.attribute[r])}}return null!=e.docString&&(t.docString=String(e.docString)),t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.input=[],r.output=[],r.attribute=[]),t.defaults&&(r.name="",r.opType="",r.docString="",r.domain=""),e.input&&e.input.length){r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=e.input[n]}if(e.output&&e.output.length){r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=e.output[n]}if(null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),null!=e.opType&&e.hasOwnProperty("opType")&&(r.opType=e.opType),e.attribute&&e.attribute.length){r.attribute=[];for(var n=0;n<e.attribute.length;++n)r.attribute[n]=p.onnx.AttributeProto.toObject(e.attribute[n],t)}return null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),null!=e.domain&&e.hasOwnProperty("domain")&&(r.domain=e.domain),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.NodeProto"},e}(),r.TrainingInfoProto=function(){function e(e){if(this.initializationBinding=[],this.updateBinding=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=d.emptyArray,e.prototype.updateBinding=d.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.initialization&&Object.hasOwnProperty.call(e,"initialization")&&p.onnx.GraphProto.encode(e.initialization,t.uint32(10).fork()).ldelim(),null!=e.algorithm&&Object.hasOwnProperty.call(e,"algorithm")&&p.onnx.GraphProto.encode(e.algorithm,t.uint32(18).fork()).ldelim(),null!=e.initializationBinding&&e.initializationBinding.length)for(var r=0;r<e.initializationBinding.length;++r)p.onnx.StringStringEntryProto.encode(e.initializationBinding[r],t.uint32(26).fork()).ldelim();if(null!=e.updateBinding&&e.updateBinding.length)for(var r=0;r<e.updateBinding.length;++r)p.onnx.StringStringEntryProto.encode(e.updateBinding[r],t.uint32(34).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TrainingInfoProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.initialization=p.onnx.GraphProto.decode(e,e.uint32());break;case 2:n.algorithm=p.onnx.GraphProto.decode(e,e.uint32());break;case 3:n.initializationBinding&&n.initializationBinding.length||(n.initializationBinding=[]),n.initializationBinding.push(p.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 4:n.updateBinding&&n.updateBinding.length||(n.updateBinding=[]),n.updateBinding.push(p.onnx.StringStringEntryProto.decode(e,e.uint32()));break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.initialization&&e.hasOwnProperty("initialization")){var t=p.onnx.GraphProto.verify(e.initialization);if(t)return"initialization."+t}if(null!=e.algorithm&&e.hasOwnProperty("algorithm")){var t=p.onnx.GraphProto.verify(e.algorithm);if(t)return"algorithm."+t}if(null!=e.initializationBinding&&e.hasOwnProperty("initializationBinding")){if(!Array.isArray(e.initializationBinding))return"initializationBinding: array expected";for(var r=0;r<e.initializationBinding.length;++r){var t=p.onnx.StringStringEntryProto.verify(e.initializationBinding[r]);if(t)return"initializationBinding."+t}}if(null!=e.updateBinding&&e.hasOwnProperty("updateBinding")){if(!Array.isArray(e.updateBinding))return"updateBinding: array expected";for(var r=0;r<e.updateBinding.length;++r){var t=p.onnx.StringStringEntryProto.verify(e.updateBinding[r]);if(t)return"updateBinding."+t}}return null},e.fromObject=function(e){if(e instanceof p.onnx.TrainingInfoProto)return e;var t=new p.onnx.TrainingInfoProto;if(null!=e.initialization){if("object"!=typeof e.initialization)throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");t.initialization=p.onnx.GraphProto.fromObject(e.initialization)}if(null!=e.algorithm){if("object"!=typeof e.algorithm)throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");t.algorithm=p.onnx.GraphProto.fromObject(e.algorithm)}if(e.initializationBinding){if(!Array.isArray(e.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");t.initializationBinding=[];for(var r=0;r<e.initializationBinding.length;++r){if("object"!=typeof e.initializationBinding[r])throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");t.initializationBinding[r]=p.onnx.StringStringEntryProto.fromObject(e.initializationBinding[r])}}if(e.updateBinding){if(!Array.isArray(e.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");t.updateBinding=[];for(var r=0;r<e.updateBinding.length;++r){if("object"!=typeof e.updateBinding[r])throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");t.updateBinding[r]=p.onnx.StringStringEntryProto.fromObject(e.updateBinding[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.initializationBinding=[],r.updateBinding=[]),t.defaults&&(r.initialization=null,r.algorithm=null),null!=e.initialization&&e.hasOwnProperty("initialization")&&(r.initialization=p.onnx.GraphProto.toObject(e.initialization,t)),null!=e.algorithm&&e.hasOwnProperty("algorithm")&&(r.algorithm=p.onnx.GraphProto.toObject(e.algorithm,t)),e.initializationBinding&&e.initializationBinding.length){r.initializationBinding=[];for(var n=0;n<e.initializationBinding.length;++n)r.initializationBinding[n]=p.onnx.StringStringEntryProto.toObject(e.initializationBinding[n],t)}if(e.updateBinding&&e.updateBinding.length){r.updateBinding=[];for(var n=0;n<e.updateBinding.length;++n)r.updateBinding[n]=p.onnx.StringStringEntryProto.toObject(e.updateBinding[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TrainingInfoProto"},e}(),r.ModelProto=function(){function e(e){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.irVersion=d.Long?d.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=d.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=d.Long?d.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=d.emptyArray,e.prototype.trainingInfo=d.emptyArray,e.prototype.functions=d.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.irVersion&&Object.hasOwnProperty.call(e,"irVersion")&&t.uint32(8).int64(e.irVersion),null!=e.producerName&&Object.hasOwnProperty.call(e,"producerName")&&t.uint32(18).string(e.producerName),null!=e.producerVersion&&Object.hasOwnProperty.call(e,"producerVersion")&&t.uint32(26).string(e.producerVersion),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(34).string(e.domain),null!=e.modelVersion&&Object.hasOwnProperty.call(e,"modelVersion")&&t.uint32(40).int64(e.modelVersion),null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(50).string(e.docString),null!=e.graph&&Object.hasOwnProperty.call(e,"graph")&&p.onnx.GraphProto.encode(e.graph,t.uint32(58).fork()).ldelim(),null!=e.opsetImport&&e.opsetImport.length)for(var r=0;r<e.opsetImport.length;++r)p.onnx.OperatorSetIdProto.encode(e.opsetImport[r],t.uint32(66).fork()).ldelim();if(null!=e.metadataProps&&e.metadataProps.length)for(var r=0;r<e.metadataProps.length;++r)p.onnx.StringStringEntryProto.encode(e.metadataProps[r],t.uint32(114).fork()).ldelim();if(null!=e.trainingInfo&&e.trainingInfo.length)for(var r=0;r<e.trainingInfo.length;++r)p.onnx.TrainingInfoProto.encode(e.trainingInfo[r],t.uint32(162).fork()).ldelim();if(null!=e.functions&&e.functions.length)for(var r=0;r<e.functions.length;++r)p.onnx.FunctionProto.encode(e.functions[r],t.uint32(202).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.ModelProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.irVersion=e.int64();break;case 8:n.opsetImport&&n.opsetImport.length||(n.opsetImport=[]),n.opsetImport.push(p.onnx.OperatorSetIdProto.decode(e,e.uint32()));break;case 2:n.producerName=e.string();break;case 3:n.producerVersion=e.string();break;case 4:n.domain=e.string();break;case 5:n.modelVersion=e.int64();break;case 6:n.docString=e.string();break;case 7:n.graph=p.onnx.GraphProto.decode(e,e.uint32());break;case 14:n.metadataProps&&n.metadataProps.length||(n.metadataProps=[]),n.metadataProps.push(p.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 20:n.trainingInfo&&n.trainingInfo.length||(n.trainingInfo=[]),n.trainingInfo.push(p.onnx.TrainingInfoProto.decode(e,e.uint32()));break;case 25:n.functions&&n.functions.length||(n.functions=[]),n.functions.push(p.onnx.FunctionProto.decode(e,e.uint32()));break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.irVersion&&e.hasOwnProperty("irVersion")&&!d.isInteger(e.irVersion)&&!(e.irVersion&&d.isInteger(e.irVersion.low)&&d.isInteger(e.irVersion.high)))return"irVersion: integer|Long expected";if(null!=e.opsetImport&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var t=0;t<e.opsetImport.length;++t){var r=p.onnx.OperatorSetIdProto.verify(e.opsetImport[t]);if(r)return"opsetImport."+r}}if(null!=e.producerName&&e.hasOwnProperty("producerName")&&!d.isString(e.producerName))return"producerName: string expected";if(null!=e.producerVersion&&e.hasOwnProperty("producerVersion")&&!d.isString(e.producerVersion))return"producerVersion: string expected";if(null!=e.domain&&e.hasOwnProperty("domain")&&!d.isString(e.domain))return"domain: string expected";if(null!=e.modelVersion&&e.hasOwnProperty("modelVersion")&&!d.isInteger(e.modelVersion)&&!(e.modelVersion&&d.isInteger(e.modelVersion.low)&&d.isInteger(e.modelVersion.high)))return"modelVersion: integer|Long expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString))return"docString: string expected";if(null!=e.graph&&e.hasOwnProperty("graph")){var r=p.onnx.GraphProto.verify(e.graph);if(r)return"graph."+r}if(null!=e.metadataProps&&e.hasOwnProperty("metadataProps")){if(!Array.isArray(e.metadataProps))return"metadataProps: array expected";for(var t=0;t<e.metadataProps.length;++t){var r=p.onnx.StringStringEntryProto.verify(e.metadataProps[t]);if(r)return"metadataProps."+r}}if(null!=e.trainingInfo&&e.hasOwnProperty("trainingInfo")){if(!Array.isArray(e.trainingInfo))return"trainingInfo: array expected";for(var t=0;t<e.trainingInfo.length;++t){var r=p.onnx.TrainingInfoProto.verify(e.trainingInfo[t]);if(r)return"trainingInfo."+r}}if(null!=e.functions&&e.hasOwnProperty("functions")){if(!Array.isArray(e.functions))return"functions: array expected";for(var t=0;t<e.functions.length;++t){var r=p.onnx.FunctionProto.verify(e.functions[t]);if(r)return"functions."+r}}return null},e.fromObject=function(e){if(e instanceof p.onnx.ModelProto)return e;var t=new p.onnx.ModelProto;if(null!=e.irVersion&&(d.Long?(t.irVersion=d.Long.fromValue(e.irVersion)).unsigned=!1:"string"==typeof e.irVersion?t.irVersion=parseInt(e.irVersion,10):"number"==typeof e.irVersion?t.irVersion=e.irVersion:"object"==typeof e.irVersion&&(t.irVersion=new d.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber())),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");t.opsetImport=[];for(var r=0;r<e.opsetImport.length;++r){if("object"!=typeof e.opsetImport[r])throw TypeError(".onnx.ModelProto.opsetImport: object expected");t.opsetImport[r]=p.onnx.OperatorSetIdProto.fromObject(e.opsetImport[r])}}if(null!=e.producerName&&(t.producerName=String(e.producerName)),null!=e.producerVersion&&(t.producerVersion=String(e.producerVersion)),null!=e.domain&&(t.domain=String(e.domain)),null!=e.modelVersion&&(d.Long?(t.modelVersion=d.Long.fromValue(e.modelVersion)).unsigned=!1:"string"==typeof e.modelVersion?t.modelVersion=parseInt(e.modelVersion,10):"number"==typeof e.modelVersion?t.modelVersion=e.modelVersion:"object"==typeof e.modelVersion&&(t.modelVersion=new d.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber())),null!=e.docString&&(t.docString=String(e.docString)),null!=e.graph){if("object"!=typeof e.graph)throw TypeError(".onnx.ModelProto.graph: object expected");t.graph=p.onnx.GraphProto.fromObject(e.graph)}if(e.metadataProps){if(!Array.isArray(e.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");t.metadataProps=[];for(var r=0;r<e.metadataProps.length;++r){if("object"!=typeof e.metadataProps[r])throw TypeError(".onnx.ModelProto.metadataProps: object expected");t.metadataProps[r]=p.onnx.StringStringEntryProto.fromObject(e.metadataProps[r])}}if(e.trainingInfo){if(!Array.isArray(e.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");t.trainingInfo=[];for(var r=0;r<e.trainingInfo.length;++r){if("object"!=typeof e.trainingInfo[r])throw TypeError(".onnx.ModelProto.trainingInfo: object expected");t.trainingInfo[r]=p.onnx.TrainingInfoProto.fromObject(e.trainingInfo[r])}}if(e.functions){if(!Array.isArray(e.functions))throw TypeError(".onnx.ModelProto.functions: array expected");t.functions=[];for(var r=0;r<e.functions.length;++r){if("object"!=typeof e.functions[r])throw TypeError(".onnx.ModelProto.functions: object expected");t.functions[r]=p.onnx.FunctionProto.fromObject(e.functions[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.opsetImport=[],r.metadataProps=[],r.trainingInfo=[],r.functions=[]),t.defaults){if(d.Long){var n=new d.Long(0,0,!1);r.irVersion=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.irVersion=t.longs===String?"0":0;if(r.producerName="",r.producerVersion="",r.domain="",d.Long){var n=new d.Long(0,0,!1);r.modelVersion=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.modelVersion=t.longs===String?"0":0;r.docString="",r.graph=null}if(null!=e.irVersion&&e.hasOwnProperty("irVersion")&&("number"==typeof e.irVersion?r.irVersion=t.longs===String?String(e.irVersion):e.irVersion:r.irVersion=t.longs===String?d.Long.prototype.toString.call(e.irVersion):t.longs===Number?new d.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber():e.irVersion),null!=e.producerName&&e.hasOwnProperty("producerName")&&(r.producerName=e.producerName),null!=e.producerVersion&&e.hasOwnProperty("producerVersion")&&(r.producerVersion=e.producerVersion),null!=e.domain&&e.hasOwnProperty("domain")&&(r.domain=e.domain),null!=e.modelVersion&&e.hasOwnProperty("modelVersion")&&("number"==typeof e.modelVersion?r.modelVersion=t.longs===String?String(e.modelVersion):e.modelVersion:r.modelVersion=t.longs===String?d.Long.prototype.toString.call(e.modelVersion):t.longs===Number?new d.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber():e.modelVersion),null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),null!=e.graph&&e.hasOwnProperty("graph")&&(r.graph=p.onnx.GraphProto.toObject(e.graph,t)),e.opsetImport&&e.opsetImport.length){r.opsetImport=[];for(var i=0;i<e.opsetImport.length;++i)r.opsetImport[i]=p.onnx.OperatorSetIdProto.toObject(e.opsetImport[i],t)}if(e.metadataProps&&e.metadataProps.length){r.metadataProps=[];for(var i=0;i<e.metadataProps.length;++i)r.metadataProps[i]=p.onnx.StringStringEntryProto.toObject(e.metadataProps[i],t)}if(e.trainingInfo&&e.trainingInfo.length){r.trainingInfo=[];for(var i=0;i<e.trainingInfo.length;++i)r.trainingInfo[i]=p.onnx.TrainingInfoProto.toObject(e.trainingInfo[i],t)}if(e.functions&&e.functions.length){r.functions=[];for(var i=0;i<e.functions.length;++i)r.functions[i]=p.onnx.FunctionProto.toObject(e.functions[i],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.ModelProto"},e}(),r.StringStringEntryProto=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.key&&Object.hasOwnProperty.call(e,"key")&&t.uint32(10).string(e.key),null!=e.value&&Object.hasOwnProperty.call(e,"value")&&t.uint32(18).string(e.value),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.StringStringEntryProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.key=e.string();break;case 2:n.value=e.string();break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.key&&e.hasOwnProperty("key")&&!d.isString(e.key)?"key: string expected":null!=e.value&&e.hasOwnProperty("value")&&!d.isString(e.value)?"value: string expected":null},e.fromObject=function(e){if(e instanceof p.onnx.StringStringEntryProto)return e;var t=new p.onnx.StringStringEntryProto;return null!=e.key&&(t.key=String(e.key)),null!=e.value&&(t.value=String(e.value)),t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.key="",r.value=""),null!=e.key&&e.hasOwnProperty("key")&&(r.key=e.key),null!=e.value&&e.hasOwnProperty("value")&&(r.value=e.value),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.StringStringEntryProto"},e}(),r.TensorAnnotation=function(){function e(e){if(this.quantParameterTensorNames=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=d.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.tensorName&&Object.hasOwnProperty.call(e,"tensorName")&&t.uint32(10).string(e.tensorName),null!=e.quantParameterTensorNames&&e.quantParameterTensorNames.length)for(var r=0;r<e.quantParameterTensorNames.length;++r)p.onnx.StringStringEntryProto.encode(e.quantParameterTensorNames[r],t.uint32(18).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TensorAnnotation;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.tensorName=e.string();break;case 2:n.quantParameterTensorNames&&n.quantParameterTensorNames.length||(n.quantParameterTensorNames=[]),n.quantParameterTensorNames.push(p.onnx.StringStringEntryProto.decode(e,e.uint32()));break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.tensorName&&e.hasOwnProperty("tensorName")&&!d.isString(e.tensorName))return"tensorName: string expected";if(null!=e.quantParameterTensorNames&&e.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(e.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var t=0;t<e.quantParameterTensorNames.length;++t){var r=p.onnx.StringStringEntryProto.verify(e.quantParameterTensorNames[t]);if(r)return"quantParameterTensorNames."+r}}return null},e.fromObject=function(e){if(e instanceof p.onnx.TensorAnnotation)return e;var t=new p.onnx.TensorAnnotation;if(null!=e.tensorName&&(t.tensorName=String(e.tensorName)),e.quantParameterTensorNames){if(!Array.isArray(e.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");t.quantParameterTensorNames=[];for(var r=0;r<e.quantParameterTensorNames.length;++r){if("object"!=typeof e.quantParameterTensorNames[r])throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");t.quantParameterTensorNames[r]=p.onnx.StringStringEntryProto.fromObject(e.quantParameterTensorNames[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.quantParameterTensorNames=[]),t.defaults&&(r.tensorName=""),null!=e.tensorName&&e.hasOwnProperty("tensorName")&&(r.tensorName=e.tensorName),e.quantParameterTensorNames&&e.quantParameterTensorNames.length){r.quantParameterTensorNames=[];for(var n=0;n<e.quantParameterTensorNames.length;++n)r.quantParameterTensorNames[n]=p.onnx.StringStringEntryProto.toObject(e.quantParameterTensorNames[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorAnnotation"},e}(),r.GraphProto=function(){function e(e){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.node=d.emptyArray,e.prototype.name="",e.prototype.initializer=d.emptyArray,e.prototype.sparseInitializer=d.emptyArray,e.prototype.docString="",e.prototype.input=d.emptyArray,e.prototype.output=d.emptyArray,e.prototype.valueInfo=d.emptyArray,e.prototype.quantizationAnnotation=d.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.node&&e.node.length)for(var r=0;r<e.node.length;++r)p.onnx.NodeProto.encode(e.node[r],t.uint32(10).fork()).ldelim();if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(18).string(e.name),null!=e.initializer&&e.initializer.length)for(var r=0;r<e.initializer.length;++r)p.onnx.TensorProto.encode(e.initializer[r],t.uint32(42).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(82).string(e.docString),null!=e.input&&e.input.length)for(var r=0;r<e.input.length;++r)p.onnx.ValueInfoProto.encode(e.input[r],t.uint32(90).fork()).ldelim();if(null!=e.output&&e.output.length)for(var r=0;r<e.output.length;++r)p.onnx.ValueInfoProto.encode(e.output[r],t.uint32(98).fork()).ldelim();if(null!=e.valueInfo&&e.valueInfo.length)for(var r=0;r<e.valueInfo.length;++r)p.onnx.ValueInfoProto.encode(e.valueInfo[r],t.uint32(106).fork()).ldelim();if(null!=e.quantizationAnnotation&&e.quantizationAnnotation.length)for(var r=0;r<e.quantizationAnnotation.length;++r)p.onnx.TensorAnnotation.encode(e.quantizationAnnotation[r],t.uint32(114).fork()).ldelim();if(null!=e.sparseInitializer&&e.sparseInitializer.length)for(var r=0;r<e.sparseInitializer.length;++r)p.onnx.SparseTensorProto.encode(e.sparseInitializer[r],t.uint32(122).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.GraphProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.node&&n.node.length||(n.node=[]),n.node.push(p.onnx.NodeProto.decode(e,e.uint32()));break;case 2:n.name=e.string();break;case 5:n.initializer&&n.initializer.length||(n.initializer=[]),n.initializer.push(p.onnx.TensorProto.decode(e,e.uint32()));break;case 15:n.sparseInitializer&&n.sparseInitializer.length||(n.sparseInitializer=[]),n.sparseInitializer.push(p.onnx.SparseTensorProto.decode(e,e.uint32()));break;case 10:n.docString=e.string();break;case 11:n.input&&n.input.length||(n.input=[]),n.input.push(p.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 12:n.output&&n.output.length||(n.output=[]),n.output.push(p.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 13:n.valueInfo&&n.valueInfo.length||(n.valueInfo=[]),n.valueInfo.push(p.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 14:n.quantizationAnnotation&&n.quantizationAnnotation.length||(n.quantizationAnnotation=[]),n.quantizationAnnotation.push(p.onnx.TensorAnnotation.decode(e,e.uint32()));break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.node&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var t=0;t<e.node.length;++t){var r=p.onnx.NodeProto.verify(e.node[t]);if(r)return"node."+r}}if(null!=e.name&&e.hasOwnProperty("name")&&!d.isString(e.name))return"name: string expected";if(null!=e.initializer&&e.hasOwnProperty("initializer")){if(!Array.isArray(e.initializer))return"initializer: array expected";for(var t=0;t<e.initializer.length;++t){var r=p.onnx.TensorProto.verify(e.initializer[t]);if(r)return"initializer."+r}}if(null!=e.sparseInitializer&&e.hasOwnProperty("sparseInitializer")){if(!Array.isArray(e.sparseInitializer))return"sparseInitializer: array expected";for(var t=0;t<e.sparseInitializer.length;++t){var r=p.onnx.SparseTensorProto.verify(e.sparseInitializer[t]);if(r)return"sparseInitializer."+r}}if(null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString))return"docString: string expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t){var r=p.onnx.ValueInfoProto.verify(e.input[t]);if(r)return"input."+r}}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t){var r=p.onnx.ValueInfoProto.verify(e.output[t]);if(r)return"output."+r}}if(null!=e.valueInfo&&e.hasOwnProperty("valueInfo")){if(!Array.isArray(e.valueInfo))return"valueInfo: array expected";for(var t=0;t<e.valueInfo.length;++t){var r=p.onnx.ValueInfoProto.verify(e.valueInfo[t]);if(r)return"valueInfo."+r}}if(null!=e.quantizationAnnotation&&e.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(e.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var t=0;t<e.quantizationAnnotation.length;++t){var r=p.onnx.TensorAnnotation.verify(e.quantizationAnnotation[t]);if(r)return"quantizationAnnotation."+r}}return null},e.fromObject=function(e){if(e instanceof p.onnx.GraphProto)return e;var t=new p.onnx.GraphProto;if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.GraphProto.node: array expected");t.node=[];for(var r=0;r<e.node.length;++r){if("object"!=typeof e.node[r])throw TypeError(".onnx.GraphProto.node: object expected");t.node[r]=p.onnx.NodeProto.fromObject(e.node[r])}}if(null!=e.name&&(t.name=String(e.name)),e.initializer){if(!Array.isArray(e.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");t.initializer=[];for(var r=0;r<e.initializer.length;++r){if("object"!=typeof e.initializer[r])throw TypeError(".onnx.GraphProto.initializer: object expected");t.initializer[r]=p.onnx.TensorProto.fromObject(e.initializer[r])}}if(e.sparseInitializer){if(!Array.isArray(e.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");t.sparseInitializer=[];for(var r=0;r<e.sparseInitializer.length;++r){if("object"!=typeof e.sparseInitializer[r])throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");t.sparseInitializer[r]=p.onnx.SparseTensorProto.fromObject(e.sparseInitializer[r])}}if(null!=e.docString&&(t.docString=String(e.docString)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.GraphProto.input: array expected");t.input=[];for(var r=0;r<e.input.length;++r){if("object"!=typeof e.input[r])throw TypeError(".onnx.GraphProto.input: object expected");t.input[r]=p.onnx.ValueInfoProto.fromObject(e.input[r])}}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.GraphProto.output: array expected");t.output=[];for(var r=0;r<e.output.length;++r){if("object"!=typeof e.output[r])throw TypeError(".onnx.GraphProto.output: object expected");t.output[r]=p.onnx.ValueInfoProto.fromObject(e.output[r])}}if(e.valueInfo){if(!Array.isArray(e.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");t.valueInfo=[];for(var r=0;r<e.valueInfo.length;++r){if("object"!=typeof e.valueInfo[r])throw TypeError(".onnx.GraphProto.valueInfo: object expected");t.valueInfo[r]=p.onnx.ValueInfoProto.fromObject(e.valueInfo[r])}}if(e.quantizationAnnotation){if(!Array.isArray(e.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");t.quantizationAnnotation=[];for(var r=0;r<e.quantizationAnnotation.length;++r){if("object"!=typeof e.quantizationAnnotation[r])throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");t.quantizationAnnotation[r]=p.onnx.TensorAnnotation.fromObject(e.quantizationAnnotation[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.node=[],r.initializer=[],r.input=[],r.output=[],r.valueInfo=[],r.quantizationAnnotation=[],r.sparseInitializer=[]),t.defaults&&(r.name="",r.docString=""),e.node&&e.node.length){r.node=[];for(var n=0;n<e.node.length;++n)r.node[n]=p.onnx.NodeProto.toObject(e.node[n],t)}if(null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),e.initializer&&e.initializer.length){r.initializer=[];for(var n=0;n<e.initializer.length;++n)r.initializer[n]=p.onnx.TensorProto.toObject(e.initializer[n],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),e.input&&e.input.length){r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=p.onnx.ValueInfoProto.toObject(e.input[n],t)}if(e.output&&e.output.length){r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=p.onnx.ValueInfoProto.toObject(e.output[n],t)}if(e.valueInfo&&e.valueInfo.length){r.valueInfo=[];for(var n=0;n<e.valueInfo.length;++n)r.valueInfo[n]=p.onnx.ValueInfoProto.toObject(e.valueInfo[n],t)}if(e.quantizationAnnotation&&e.quantizationAnnotation.length){r.quantizationAnnotation=[];for(var n=0;n<e.quantizationAnnotation.length;++n)r.quantizationAnnotation[n]=p.onnx.TensorAnnotation.toObject(e.quantizationAnnotation[n],t)}if(e.sparseInitializer&&e.sparseInitializer.length){r.sparseInitializer=[];for(var n=0;n<e.sparseInitializer.length;++n)r.sparseInitializer[n]=p.onnx.SparseTensorProto.toObject(e.sparseInitializer[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.GraphProto"},e}(),r.TensorProto=function(){var e,t,r,n;function i(e){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return i.prototype.dims=d.emptyArray,i.prototype.dataType=0,i.prototype.segment=null,i.prototype.floatData=d.emptyArray,i.prototype.int32Data=d.emptyArray,i.prototype.stringData=d.emptyArray,i.prototype.int64Data=d.emptyArray,i.prototype.name="",i.prototype.docString="",i.prototype.rawData=d.newBuffer([]),i.prototype.externalData=d.emptyArray,i.prototype.dataLocation=0,i.prototype.doubleData=d.emptyArray,i.prototype.uint64Data=d.emptyArray,i.create=function(e){return new i(e)},i.encode=function(e,t){if(t||(t=l.create()),null!=e.dims&&e.dims.length){t.uint32(10).fork();for(var r=0;r<e.dims.length;++r)t.int64(e.dims[r]);t.ldelim()}if(null!=e.dataType&&Object.hasOwnProperty.call(e,"dataType")&&t.uint32(16).int32(e.dataType),null!=e.segment&&Object.hasOwnProperty.call(e,"segment")&&p.onnx.TensorProto.Segment.encode(e.segment,t.uint32(26).fork()).ldelim(),null!=e.floatData&&e.floatData.length){t.uint32(34).fork();for(var r=0;r<e.floatData.length;++r)t.float(e.floatData[r]);t.ldelim()}if(null!=e.int32Data&&e.int32Data.length){t.uint32(42).fork();for(var r=0;r<e.int32Data.length;++r)t.int32(e.int32Data[r]);t.ldelim()}if(null!=e.stringData&&e.stringData.length)for(var r=0;r<e.stringData.length;++r)t.uint32(50).bytes(e.stringData[r]);if(null!=e.int64Data&&e.int64Data.length){t.uint32(58).fork();for(var r=0;r<e.int64Data.length;++r)t.int64(e.int64Data[r]);t.ldelim()}if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(66).string(e.name),null!=e.rawData&&Object.hasOwnProperty.call(e,"rawData")&&t.uint32(74).bytes(e.rawData),null!=e.doubleData&&e.doubleData.length){t.uint32(82).fork();for(var r=0;r<e.doubleData.length;++r)t.double(e.doubleData[r]);t.ldelim()}if(null!=e.uint64Data&&e.uint64Data.length){t.uint32(90).fork();for(var r=0;r<e.uint64Data.length;++r)t.uint64(e.uint64Data[r]);t.ldelim()}if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(98).string(e.docString),null!=e.externalData&&e.externalData.length)for(var r=0;r<e.externalData.length;++r)p.onnx.StringStringEntryProto.encode(e.externalData[r],t.uint32(106).fork()).ldelim();return null!=e.dataLocation&&Object.hasOwnProperty.call(e,"dataLocation")&&t.uint32(112).int32(e.dataLocation),t},i.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},i.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TensorProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:if(n.dims&&n.dims.length||(n.dims=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.dims.push(e.int64());else n.dims.push(e.int64());break;case 2:n.dataType=e.int32();break;case 3:n.segment=p.onnx.TensorProto.Segment.decode(e,e.uint32());break;case 4:if(n.floatData&&n.floatData.length||(n.floatData=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.floatData.push(e.float());else n.floatData.push(e.float());break;case 5:if(n.int32Data&&n.int32Data.length||(n.int32Data=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.int32Data.push(e.int32());else n.int32Data.push(e.int32());break;case 6:n.stringData&&n.stringData.length||(n.stringData=[]),n.stringData.push(e.bytes());break;case 7:if(n.int64Data&&n.int64Data.length||(n.int64Data=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.int64Data.push(e.int64());else n.int64Data.push(e.int64());break;case 8:n.name=e.string();break;case 12:n.docString=e.string();break;case 9:n.rawData=e.bytes();break;case 13:n.externalData&&n.externalData.length||(n.externalData=[]),n.externalData.push(p.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 14:n.dataLocation=e.int32();break;case 10:if(n.doubleData&&n.doubleData.length||(n.doubleData=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.doubleData.push(e.double());else n.doubleData.push(e.double());break;case 11:if(n.uint64Data&&n.uint64Data.length||(n.uint64Data=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.uint64Data.push(e.uint64());else n.uint64Data.push(e.uint64());break;default:e.skipType(7&i)}}return n},i.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},i.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.dims&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var t=0;t<e.dims.length;++t)if(!d.isInteger(e.dims[t])&&!(e.dims[t]&&d.isInteger(e.dims[t].low)&&d.isInteger(e.dims[t].high)))return"dims: integer|Long[] expected"}if(null!=e.dataType&&e.hasOwnProperty("dataType")&&!d.isInteger(e.dataType))return"dataType: integer expected";if(null!=e.segment&&e.hasOwnProperty("segment")){var r=p.onnx.TensorProto.Segment.verify(e.segment);if(r)return"segment."+r}if(null!=e.floatData&&e.hasOwnProperty("floatData")){if(!Array.isArray(e.floatData))return"floatData: array expected";for(var t=0;t<e.floatData.length;++t)if("number"!=typeof e.floatData[t])return"floatData: number[] expected"}if(null!=e.int32Data&&e.hasOwnProperty("int32Data")){if(!Array.isArray(e.int32Data))return"int32Data: array expected";for(var t=0;t<e.int32Data.length;++t)if(!d.isInteger(e.int32Data[t]))return"int32Data: integer[] expected"}if(null!=e.stringData&&e.hasOwnProperty("stringData")){if(!Array.isArray(e.stringData))return"stringData: array expected";for(var t=0;t<e.stringData.length;++t)if(!(e.stringData[t]&&"number"==typeof e.stringData[t].length||d.isString(e.stringData[t])))return"stringData: buffer[] expected"}if(null!=e.int64Data&&e.hasOwnProperty("int64Data")){if(!Array.isArray(e.int64Data))return"int64Data: array expected";for(var t=0;t<e.int64Data.length;++t)if(!d.isInteger(e.int64Data[t])&&!(e.int64Data[t]&&d.isInteger(e.int64Data[t].low)&&d.isInteger(e.int64Data[t].high)))return"int64Data: integer|Long[] expected"}if(null!=e.name&&e.hasOwnProperty("name")&&!d.isString(e.name))return"name: string expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString))return"docString: string expected";if(null!=e.rawData&&e.hasOwnProperty("rawData")&&!(e.rawData&&"number"==typeof e.rawData.length||d.isString(e.rawData)))return"rawData: buffer expected";if(null!=e.externalData&&e.hasOwnProperty("externalData")){if(!Array.isArray(e.externalData))return"externalData: array expected";for(var t=0;t<e.externalData.length;++t){var r=p.onnx.StringStringEntryProto.verify(e.externalData[t]);if(r)return"externalData."+r}}if(null!=e.dataLocation&&e.hasOwnProperty("dataLocation"))switch(e.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:}if(null!=e.doubleData&&e.hasOwnProperty("doubleData")){if(!Array.isArray(e.doubleData))return"doubleData: array expected";for(var t=0;t<e.doubleData.length;++t)if("number"!=typeof e.doubleData[t])return"doubleData: number[] expected"}if(null!=e.uint64Data&&e.hasOwnProperty("uint64Data")){if(!Array.isArray(e.uint64Data))return"uint64Data: array expected";for(var t=0;t<e.uint64Data.length;++t)if(!d.isInteger(e.uint64Data[t])&&!(e.uint64Data[t]&&d.isInteger(e.uint64Data[t].low)&&d.isInteger(e.uint64Data[t].high)))return"uint64Data: integer|Long[] expected"}return null},i.fromObject=function(e){if(e instanceof p.onnx.TensorProto)return e;var t=new p.onnx.TensorProto;if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.TensorProto.dims: array expected");t.dims=[];for(var r=0;r<e.dims.length;++r)d.Long?(t.dims[r]=d.Long.fromValue(e.dims[r])).unsigned=!1:"string"==typeof e.dims[r]?t.dims[r]=parseInt(e.dims[r],10):"number"==typeof e.dims[r]?t.dims[r]=e.dims[r]:"object"==typeof e.dims[r]&&(t.dims[r]=new d.LongBits(e.dims[r].low>>>0,e.dims[r].high>>>0).toNumber())}if(null!=e.dataType&&(t.dataType=0|e.dataType),null!=e.segment){if("object"!=typeof e.segment)throw TypeError(".onnx.TensorProto.segment: object expected");t.segment=p.onnx.TensorProto.Segment.fromObject(e.segment)}if(e.floatData){if(!Array.isArray(e.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");t.floatData=[];for(var r=0;r<e.floatData.length;++r)t.floatData[r]=Number(e.floatData[r])}if(e.int32Data){if(!Array.isArray(e.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");t.int32Data=[];for(var r=0;r<e.int32Data.length;++r)t.int32Data[r]=0|e.int32Data[r]}if(e.stringData){if(!Array.isArray(e.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");t.stringData=[];for(var r=0;r<e.stringData.length;++r)"string"==typeof e.stringData[r]?d.base64.decode(e.stringData[r],t.stringData[r]=d.newBuffer(d.base64.length(e.stringData[r])),0):e.stringData[r].length>=0&&(t.stringData[r]=e.stringData[r])}if(e.int64Data){if(!Array.isArray(e.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");t.int64Data=[];for(var r=0;r<e.int64Data.length;++r)d.Long?(t.int64Data[r]=d.Long.fromValue(e.int64Data[r])).unsigned=!1:"string"==typeof e.int64Data[r]?t.int64Data[r]=parseInt(e.int64Data[r],10):"number"==typeof e.int64Data[r]?t.int64Data[r]=e.int64Data[r]:"object"==typeof e.int64Data[r]&&(t.int64Data[r]=new d.LongBits(e.int64Data[r].low>>>0,e.int64Data[r].high>>>0).toNumber())}if(null!=e.name&&(t.name=String(e.name)),null!=e.docString&&(t.docString=String(e.docString)),null!=e.rawData&&("string"==typeof e.rawData?d.base64.decode(e.rawData,t.rawData=d.newBuffer(d.base64.length(e.rawData)),0):e.rawData.length>=0&&(t.rawData=e.rawData)),e.externalData){if(!Array.isArray(e.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");t.externalData=[];for(var r=0;r<e.externalData.length;++r){if("object"!=typeof e.externalData[r])throw TypeError(".onnx.TensorProto.externalData: object expected");t.externalData[r]=p.onnx.StringStringEntryProto.fromObject(e.externalData[r])}}switch(e.dataLocation){default:"number"==typeof e.dataLocation&&(t.dataLocation=e.dataLocation);break;case"DEFAULT":case 0:t.dataLocation=0;break;case"EXTERNAL":case 1:t.dataLocation=1}if(e.doubleData){if(!Array.isArray(e.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");t.doubleData=[];for(var r=0;r<e.doubleData.length;++r)t.doubleData[r]=Number(e.doubleData[r])}if(e.uint64Data){if(!Array.isArray(e.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");t.uint64Data=[];for(var r=0;r<e.uint64Data.length;++r)d.Long?(t.uint64Data[r]=d.Long.fromValue(e.uint64Data[r])).unsigned=!0:"string"==typeof e.uint64Data[r]?t.uint64Data[r]=parseInt(e.uint64Data[r],10):"number"==typeof e.uint64Data[r]?t.uint64Data[r]=e.uint64Data[r]:"object"==typeof e.uint64Data[r]&&(t.uint64Data[r]=new d.LongBits(e.uint64Data[r].low>>>0,e.uint64Data[r].high>>>0).toNumber(!0))}return t},i.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.dims=[],r.floatData=[],r.int32Data=[],r.stringData=[],r.int64Data=[],r.doubleData=[],r.uint64Data=[],r.externalData=[]),t.defaults&&(r.dataType=0,r.segment=null,r.name="",t.bytes===String?r.rawData="":(r.rawData=[],t.bytes!==Array&&(r.rawData=d.newBuffer(r.rawData))),r.docString="",r.dataLocation=t.enums===String?"DEFAULT":0),e.dims&&e.dims.length){r.dims=[];for(var n=0;n<e.dims.length;++n)"number"==typeof e.dims[n]?r.dims[n]=t.longs===String?String(e.dims[n]):e.dims[n]:r.dims[n]=t.longs===String?d.Long.prototype.toString.call(e.dims[n]):t.longs===Number?new d.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber():e.dims[n]}if(null!=e.dataType&&e.hasOwnProperty("dataType")&&(r.dataType=e.dataType),null!=e.segment&&e.hasOwnProperty("segment")&&(r.segment=p.onnx.TensorProto.Segment.toObject(e.segment,t)),e.floatData&&e.floatData.length){r.floatData=[];for(var n=0;n<e.floatData.length;++n)r.floatData[n]=t.json&&!isFinite(e.floatData[n])?String(e.floatData[n]):e.floatData[n]}if(e.int32Data&&e.int32Data.length){r.int32Data=[];for(var n=0;n<e.int32Data.length;++n)r.int32Data[n]=e.int32Data[n]}if(e.stringData&&e.stringData.length){r.stringData=[];for(var n=0;n<e.stringData.length;++n)r.stringData[n]=t.bytes===String?d.base64.encode(e.stringData[n],0,e.stringData[n].length):t.bytes===Array?Array.prototype.slice.call(e.stringData[n]):e.stringData[n]}if(e.int64Data&&e.int64Data.length){r.int64Data=[];for(var n=0;n<e.int64Data.length;++n)"number"==typeof e.int64Data[n]?r.int64Data[n]=t.longs===String?String(e.int64Data[n]):e.int64Data[n]:r.int64Data[n]=t.longs===String?d.Long.prototype.toString.call(e.int64Data[n]):t.longs===Number?new d.LongBits(e.int64Data[n].low>>>0,e.int64Data[n].high>>>0).toNumber():e.int64Data[n]}if(null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),null!=e.rawData&&e.hasOwnProperty("rawData")&&(r.rawData=t.bytes===String?d.base64.encode(e.rawData,0,e.rawData.length):t.bytes===Array?Array.prototype.slice.call(e.rawData):e.rawData),e.doubleData&&e.doubleData.length){r.doubleData=[];for(var n=0;n<e.doubleData.length;++n)r.doubleData[n]=t.json&&!isFinite(e.doubleData[n])?String(e.doubleData[n]):e.doubleData[n]}if(e.uint64Data&&e.uint64Data.length){r.uint64Data=[];for(var n=0;n<e.uint64Data.length;++n)"number"==typeof e.uint64Data[n]?r.uint64Data[n]=t.longs===String?String(e.uint64Data[n]):e.uint64Data[n]:r.uint64Data[n]=t.longs===String?d.Long.prototype.toString.call(e.uint64Data[n]):t.longs===Number?new d.LongBits(e.uint64Data[n].low>>>0,e.uint64Data[n].high>>>0).toNumber(!0):e.uint64Data[n]}if(null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),e.externalData&&e.externalData.length){r.externalData=[];for(var n=0;n<e.externalData.length;++n)r.externalData[n]=p.onnx.StringStringEntryProto.toObject(e.externalData[n],t)}return null!=e.dataLocation&&e.hasOwnProperty("dataLocation")&&(r.dataLocation=t.enums===String?void 0===p.onnx.TensorProto.DataLocation[e.dataLocation]?e.dataLocation:p.onnx.TensorProto.DataLocation[e.dataLocation]:e.dataLocation),r},i.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},i.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorProto"},(t=Object.create(e={}))[e[0]="UNDEFINED"]=0,t[e[1]="FLOAT"]=1,t[e[2]="UINT8"]=2,t[e[3]="INT8"]=3,t[e[4]="UINT16"]=4,t[e[5]="INT16"]=5,t[e[6]="INT32"]=6,t[e[7]="INT64"]=7,t[e[8]="STRING"]=8,t[e[9]="BOOL"]=9,t[e[10]="FLOAT16"]=10,t[e[11]="DOUBLE"]=11,t[e[12]="UINT32"]=12,t[e[13]="UINT64"]=13,t[e[14]="COMPLEX64"]=14,t[e[15]="COMPLEX128"]=15,t[e[16]="BFLOAT16"]=16,t[e[17]="FLOAT8E4M3FN"]=17,t[e[18]="FLOAT8E4M3FNUZ"]=18,t[e[19]="FLOAT8E5M2"]=19,t[e[20]="FLOAT8E5M2FNUZ"]=20,i.DataType=t,i.Segment=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.begin=d.Long?d.Long.fromBits(0,0,!1):0,e.prototype.end=d.Long?d.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.begin&&Object.hasOwnProperty.call(e,"begin")&&t.uint32(8).int64(e.begin),null!=e.end&&Object.hasOwnProperty.call(e,"end")&&t.uint32(16).int64(e.end),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TensorProto.Segment;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.begin=e.int64();break;case 2:n.end=e.int64();break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.begin&&e.hasOwnProperty("begin")&&!d.isInteger(e.begin)&&!(e.begin&&d.isInteger(e.begin.low)&&d.isInteger(e.begin.high))?"begin: integer|Long expected":null!=e.end&&e.hasOwnProperty("end")&&!d.isInteger(e.end)&&!(e.end&&d.isInteger(e.end.low)&&d.isInteger(e.end.high))?"end: integer|Long expected":null},e.fromObject=function(e){if(e instanceof p.onnx.TensorProto.Segment)return e;var t=new p.onnx.TensorProto.Segment;return null!=e.begin&&(d.Long?(t.begin=d.Long.fromValue(e.begin)).unsigned=!1:"string"==typeof e.begin?t.begin=parseInt(e.begin,10):"number"==typeof e.begin?t.begin=e.begin:"object"==typeof e.begin&&(t.begin=new d.LongBits(e.begin.low>>>0,e.begin.high>>>0).toNumber())),null!=e.end&&(d.Long?(t.end=d.Long.fromValue(e.end)).unsigned=!1:"string"==typeof e.end?t.end=parseInt(e.end,10):"number"==typeof e.end?t.end=e.end:"object"==typeof e.end&&(t.end=new d.LongBits(e.end.low>>>0,e.end.high>>>0).toNumber())),t},e.toObject=function(e,t){t||(t={});var r={};if(t.defaults){if(d.Long){var n=new d.Long(0,0,!1);r.begin=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.begin=t.longs===String?"0":0;if(d.Long){var n=new d.Long(0,0,!1);r.end=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.end=t.longs===String?"0":0}return null!=e.begin&&e.hasOwnProperty("begin")&&("number"==typeof e.begin?r.begin=t.longs===String?String(e.begin):e.begin:r.begin=t.longs===String?d.Long.prototype.toString.call(e.begin):t.longs===Number?new d.LongBits(e.begin.low>>>0,e.begin.high>>>0).toNumber():e.begin),null!=e.end&&e.hasOwnProperty("end")&&("number"==typeof e.end?r.end=t.longs===String?String(e.end):e.end:r.end=t.longs===String?d.Long.prototype.toString.call(e.end):t.longs===Number?new d.LongBits(e.end.low>>>0,e.end.high>>>0).toNumber():e.end),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorProto.Segment"},e}(),(n=Object.create(r={}))[r[0]="DEFAULT"]=0,n[r[1]="EXTERNAL"]=1,i.DataLocation=n,i}(),r.SparseTensorProto=function(){function e(e){if(this.dims=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=d.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.values&&Object.hasOwnProperty.call(e,"values")&&p.onnx.TensorProto.encode(e.values,t.uint32(10).fork()).ldelim(),null!=e.indices&&Object.hasOwnProperty.call(e,"indices")&&p.onnx.TensorProto.encode(e.indices,t.uint32(18).fork()).ldelim(),null!=e.dims&&e.dims.length){t.uint32(26).fork();for(var r=0;r<e.dims.length;++r)t.int64(e.dims[r]);t.ldelim()}return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.SparseTensorProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.values=p.onnx.TensorProto.decode(e,e.uint32());break;case 2:n.indices=p.onnx.TensorProto.decode(e,e.uint32());break;case 3:if(n.dims&&n.dims.length||(n.dims=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.dims.push(e.int64());else n.dims.push(e.int64());break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.values&&e.hasOwnProperty("values")){var t=p.onnx.TensorProto.verify(e.values);if(t)return"values."+t}if(null!=e.indices&&e.hasOwnProperty("indices")){var t=p.onnx.TensorProto.verify(e.indices);if(t)return"indices."+t}if(null!=e.dims&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var r=0;r<e.dims.length;++r)if(!d.isInteger(e.dims[r])&&!(e.dims[r]&&d.isInteger(e.dims[r].low)&&d.isInteger(e.dims[r].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(e){if(e instanceof p.onnx.SparseTensorProto)return e;var t=new p.onnx.SparseTensorProto;if(null!=e.values){if("object"!=typeof e.values)throw TypeError(".onnx.SparseTensorProto.values: object expected");t.values=p.onnx.TensorProto.fromObject(e.values)}if(null!=e.indices){if("object"!=typeof e.indices)throw TypeError(".onnx.SparseTensorProto.indices: object expected");t.indices=p.onnx.TensorProto.fromObject(e.indices)}if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");t.dims=[];for(var r=0;r<e.dims.length;++r)d.Long?(t.dims[r]=d.Long.fromValue(e.dims[r])).unsigned=!1:"string"==typeof e.dims[r]?t.dims[r]=parseInt(e.dims[r],10):"number"==typeof e.dims[r]?t.dims[r]=e.dims[r]:"object"==typeof e.dims[r]&&(t.dims[r]=new d.LongBits(e.dims[r].low>>>0,e.dims[r].high>>>0).toNumber())}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.dims=[]),t.defaults&&(r.values=null,r.indices=null),null!=e.values&&e.hasOwnProperty("values")&&(r.values=p.onnx.TensorProto.toObject(e.values,t)),null!=e.indices&&e.hasOwnProperty("indices")&&(r.indices=p.onnx.TensorProto.toObject(e.indices,t)),e.dims&&e.dims.length){r.dims=[];for(var n=0;n<e.dims.length;++n)"number"==typeof e.dims[n]?r.dims[n]=t.longs===String?String(e.dims[n]):e.dims[n]:r.dims[n]=t.longs===String?d.Long.prototype.toString.call(e.dims[n]):t.longs===Number?new d.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber():e.dims[n]}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.SparseTensorProto"},e}(),r.TensorShapeProto=function(){function e(e){if(this.dim=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.dim=d.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.dim&&e.dim.length)for(var r=0;r<e.dim.length;++r)p.onnx.TensorShapeProto.Dimension.encode(e.dim[r],t.uint32(10).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TensorShapeProto;e.pos<r;){var i=e.uint32();i>>>3==1?(n.dim&&n.dim.length||(n.dim=[]),n.dim.push(p.onnx.TensorShapeProto.Dimension.decode(e,e.uint32()))):e.skipType(7&i)}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.dim&&e.hasOwnProperty("dim")){if(!Array.isArray(e.dim))return"dim: array expected";for(var t=0;t<e.dim.length;++t){var r=p.onnx.TensorShapeProto.Dimension.verify(e.dim[t]);if(r)return"dim."+r}}return null},e.fromObject=function(e){if(e instanceof p.onnx.TensorShapeProto)return e;var t=new p.onnx.TensorShapeProto;if(e.dim){if(!Array.isArray(e.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");t.dim=[];for(var r=0;r<e.dim.length;++r){if("object"!=typeof e.dim[r])throw TypeError(".onnx.TensorShapeProto.dim: object expected");t.dim[r]=p.onnx.TensorShapeProto.Dimension.fromObject(e.dim[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.dim=[]),e.dim&&e.dim.length){r.dim=[];for(var n=0;n<e.dim.length;++n)r.dim[n]=p.onnx.TensorShapeProto.Dimension.toObject(e.dim[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorShapeProto"},e.Dimension=function(){var e;function t(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return t.prototype.dimValue=null,t.prototype.dimParam=null,t.prototype.denotation="",Object.defineProperty(t.prototype,"value",{get:d.oneOfGetter(e=["dimValue","dimParam"]),set:d.oneOfSetter(e)}),t.create=function(e){return new t(e)},t.encode=function(e,t){return t||(t=l.create()),null!=e.dimValue&&Object.hasOwnProperty.call(e,"dimValue")&&t.uint32(8).int64(e.dimValue),null!=e.dimParam&&Object.hasOwnProperty.call(e,"dimParam")&&t.uint32(18).string(e.dimParam),null!=e.denotation&&Object.hasOwnProperty.call(e,"denotation")&&t.uint32(26).string(e.denotation),t},t.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},t.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TensorShapeProto.Dimension;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.dimValue=e.int64();break;case 2:n.dimParam=e.string();break;case 3:n.denotation=e.string();break;default:e.skipType(7&i)}}return n},t.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},t.verify=function(e){if("object"!=typeof e||null===e)return"object expected";var t={};if(null!=e.dimValue&&e.hasOwnProperty("dimValue")&&(t.value=1,!d.isInteger(e.dimValue)&&!(e.dimValue&&d.isInteger(e.dimValue.low)&&d.isInteger(e.dimValue.high))))return"dimValue: integer|Long expected";if(null!=e.dimParam&&e.hasOwnProperty("dimParam")){if(1===t.value)return"value: multiple values";if(t.value=1,!d.isString(e.dimParam))return"dimParam: string expected"}return null!=e.denotation&&e.hasOwnProperty("denotation")&&!d.isString(e.denotation)?"denotation: string expected":null},t.fromObject=function(e){if(e instanceof p.onnx.TensorShapeProto.Dimension)return e;var t=new p.onnx.TensorShapeProto.Dimension;return null!=e.dimValue&&(d.Long?(t.dimValue=d.Long.fromValue(e.dimValue)).unsigned=!1:"string"==typeof e.dimValue?t.dimValue=parseInt(e.dimValue,10):"number"==typeof e.dimValue?t.dimValue=e.dimValue:"object"==typeof e.dimValue&&(t.dimValue=new d.LongBits(e.dimValue.low>>>0,e.dimValue.high>>>0).toNumber())),null!=e.dimParam&&(t.dimParam=String(e.dimParam)),null!=e.denotation&&(t.denotation=String(e.denotation)),t},t.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.denotation=""),null!=e.dimValue&&e.hasOwnProperty("dimValue")&&("number"==typeof e.dimValue?r.dimValue=t.longs===String?String(e.dimValue):e.dimValue:r.dimValue=t.longs===String?d.Long.prototype.toString.call(e.dimValue):t.longs===Number?new d.LongBits(e.dimValue.low>>>0,e.dimValue.high>>>0).toNumber():e.dimValue,t.oneofs&&(r.value="dimValue")),null!=e.dimParam&&e.hasOwnProperty("dimParam")&&(r.dimParam=e.dimParam,t.oneofs&&(r.value="dimParam")),null!=e.denotation&&e.hasOwnProperty("denotation")&&(r.denotation=e.denotation),r},t.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},t.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorShapeProto.Dimension"},t}(),e}(),r.TypeProto=function(){var e;function t(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return t.prototype.tensorType=null,t.prototype.sequenceType=null,t.prototype.mapType=null,t.prototype.optionalType=null,t.prototype.sparseTensorType=null,t.prototype.denotation="",Object.defineProperty(t.prototype,"value",{get:d.oneOfGetter(e=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:d.oneOfSetter(e)}),t.create=function(e){return new t(e)},t.encode=function(e,t){return t||(t=l.create()),null!=e.tensorType&&Object.hasOwnProperty.call(e,"tensorType")&&p.onnx.TypeProto.Tensor.encode(e.tensorType,t.uint32(10).fork()).ldelim(),null!=e.sequenceType&&Object.hasOwnProperty.call(e,"sequenceType")&&p.onnx.TypeProto.Sequence.encode(e.sequenceType,t.uint32(34).fork()).ldelim(),null!=e.mapType&&Object.hasOwnProperty.call(e,"mapType")&&p.onnx.TypeProto.Map.encode(e.mapType,t.uint32(42).fork()).ldelim(),null!=e.denotation&&Object.hasOwnProperty.call(e,"denotation")&&t.uint32(50).string(e.denotation),null!=e.sparseTensorType&&Object.hasOwnProperty.call(e,"sparseTensorType")&&p.onnx.TypeProto.SparseTensor.encode(e.sparseTensorType,t.uint32(66).fork()).ldelim(),null!=e.optionalType&&Object.hasOwnProperty.call(e,"optionalType")&&p.onnx.TypeProto.Optional.encode(e.optionalType,t.uint32(74).fork()).ldelim(),t},t.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},t.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TypeProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.tensorType=p.onnx.TypeProto.Tensor.decode(e,e.uint32());break;case 4:n.sequenceType=p.onnx.TypeProto.Sequence.decode(e,e.uint32());break;case 5:n.mapType=p.onnx.TypeProto.Map.decode(e,e.uint32());break;case 9:n.optionalType=p.onnx.TypeProto.Optional.decode(e,e.uint32());break;case 8:n.sparseTensorType=p.onnx.TypeProto.SparseTensor.decode(e,e.uint32());break;case 6:n.denotation=e.string();break;default:e.skipType(7&i)}}return n},t.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},t.verify=function(e){if("object"!=typeof e||null===e)return"object expected";var t={};if(null!=e.tensorType&&e.hasOwnProperty("tensorType")){t.value=1;var r=p.onnx.TypeProto.Tensor.verify(e.tensorType);if(r)return"tensorType."+r}if(null!=e.sequenceType&&e.hasOwnProperty("sequenceType")){if(1===t.value)return"value: multiple values";t.value=1;var r=p.onnx.TypeProto.Sequence.verify(e.sequenceType);if(r)return"sequenceType."+r}if(null!=e.mapType&&e.hasOwnProperty("mapType")){if(1===t.value)return"value: multiple values";t.value=1;var r=p.onnx.TypeProto.Map.verify(e.mapType);if(r)return"mapType."+r}if(null!=e.optionalType&&e.hasOwnProperty("optionalType")){if(1===t.value)return"value: multiple values";t.value=1;var r=p.onnx.TypeProto.Optional.verify(e.optionalType);if(r)return"optionalType."+r}if(null!=e.sparseTensorType&&e.hasOwnProperty("sparseTensorType")){if(1===t.value)return"value: multiple values";t.value=1;var r=p.onnx.TypeProto.SparseTensor.verify(e.sparseTensorType);if(r)return"sparseTensorType."+r}return null!=e.denotation&&e.hasOwnProperty("denotation")&&!d.isString(e.denotation)?"denotation: string expected":null},t.fromObject=function(e){if(e instanceof p.onnx.TypeProto)return e;var t=new p.onnx.TypeProto;if(null!=e.tensorType){if("object"!=typeof e.tensorType)throw TypeError(".onnx.TypeProto.tensorType: object expected");t.tensorType=p.onnx.TypeProto.Tensor.fromObject(e.tensorType)}if(null!=e.sequenceType){if("object"!=typeof e.sequenceType)throw TypeError(".onnx.TypeProto.sequenceType: object expected");t.sequenceType=p.onnx.TypeProto.Sequence.fromObject(e.sequenceType)}if(null!=e.mapType){if("object"!=typeof e.mapType)throw TypeError(".onnx.TypeProto.mapType: object expected");t.mapType=p.onnx.TypeProto.Map.fromObject(e.mapType)}if(null!=e.optionalType){if("object"!=typeof e.optionalType)throw TypeError(".onnx.TypeProto.optionalType: object expected");t.optionalType=p.onnx.TypeProto.Optional.fromObject(e.optionalType)}if(null!=e.sparseTensorType){if("object"!=typeof e.sparseTensorType)throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");t.sparseTensorType=p.onnx.TypeProto.SparseTensor.fromObject(e.sparseTensorType)}return null!=e.denotation&&(t.denotation=String(e.denotation)),t},t.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.denotation=""),null!=e.tensorType&&e.hasOwnProperty("tensorType")&&(r.tensorType=p.onnx.TypeProto.Tensor.toObject(e.tensorType,t),t.oneofs&&(r.value="tensorType")),null!=e.sequenceType&&e.hasOwnProperty("sequenceType")&&(r.sequenceType=p.onnx.TypeProto.Sequence.toObject(e.sequenceType,t),t.oneofs&&(r.value="sequenceType")),null!=e.mapType&&e.hasOwnProperty("mapType")&&(r.mapType=p.onnx.TypeProto.Map.toObject(e.mapType,t),t.oneofs&&(r.value="mapType")),null!=e.denotation&&e.hasOwnProperty("denotation")&&(r.denotation=e.denotation),null!=e.sparseTensorType&&e.hasOwnProperty("sparseTensorType")&&(r.sparseTensorType=p.onnx.TypeProto.SparseTensor.toObject(e.sparseTensorType,t),t.oneofs&&(r.value="sparseTensorType")),null!=e.optionalType&&e.hasOwnProperty("optionalType")&&(r.optionalType=p.onnx.TypeProto.Optional.toObject(e.optionalType,t),t.oneofs&&(r.value="optionalType")),r},t.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},t.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto"},t.Tensor=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&t.uint32(8).int32(e.elemType),null!=e.shape&&Object.hasOwnProperty.call(e,"shape")&&p.onnx.TensorShapeProto.encode(e.shape,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TypeProto.Tensor;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.elemType=e.int32();break;case 2:n.shape=p.onnx.TensorShapeProto.decode(e,e.uint32());break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")&&!d.isInteger(e.elemType))return"elemType: integer expected";if(null!=e.shape&&e.hasOwnProperty("shape")){var t=p.onnx.TensorShapeProto.verify(e.shape);if(t)return"shape."+t}return null},e.fromObject=function(e){if(e instanceof p.onnx.TypeProto.Tensor)return e;var t=new p.onnx.TypeProto.Tensor;if(null!=e.elemType&&(t.elemType=0|e.elemType),null!=e.shape){if("object"!=typeof e.shape)throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");t.shape=p.onnx.TensorShapeProto.fromObject(e.shape)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.elemType=0,r.shape=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(r.elemType=e.elemType),null!=e.shape&&e.hasOwnProperty("shape")&&(r.shape=p.onnx.TensorShapeProto.toObject(e.shape,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Tensor"},e}(),t.Sequence=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.elemType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&p.onnx.TypeProto.encode(e.elemType,t.uint32(10).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TypeProto.Sequence;e.pos<r;){var i=e.uint32();i>>>3==1?n.elemType=p.onnx.TypeProto.decode(e,e.uint32()):e.skipType(7&i)}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")){var t=p.onnx.TypeProto.verify(e.elemType);if(t)return"elemType."+t}return null},e.fromObject=function(e){if(e instanceof p.onnx.TypeProto.Sequence)return e;var t=new p.onnx.TypeProto.Sequence;if(null!=e.elemType){if("object"!=typeof e.elemType)throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");t.elemType=p.onnx.TypeProto.fromObject(e.elemType)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.elemType=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(r.elemType=p.onnx.TypeProto.toObject(e.elemType,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Sequence"},e}(),t.Map=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.keyType=0,e.prototype.valueType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.keyType&&Object.hasOwnProperty.call(e,"keyType")&&t.uint32(8).int32(e.keyType),null!=e.valueType&&Object.hasOwnProperty.call(e,"valueType")&&p.onnx.TypeProto.encode(e.valueType,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TypeProto.Map;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.keyType=e.int32();break;case 2:n.valueType=p.onnx.TypeProto.decode(e,e.uint32());break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.keyType&&e.hasOwnProperty("keyType")&&!d.isInteger(e.keyType))return"keyType: integer expected";if(null!=e.valueType&&e.hasOwnProperty("valueType")){var t=p.onnx.TypeProto.verify(e.valueType);if(t)return"valueType."+t}return null},e.fromObject=function(e){if(e instanceof p.onnx.TypeProto.Map)return e;var t=new p.onnx.TypeProto.Map;if(null!=e.keyType&&(t.keyType=0|e.keyType),null!=e.valueType){if("object"!=typeof e.valueType)throw TypeError(".onnx.TypeProto.Map.valueType: object expected");t.valueType=p.onnx.TypeProto.fromObject(e.valueType)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.keyType=0,r.valueType=null),null!=e.keyType&&e.hasOwnProperty("keyType")&&(r.keyType=e.keyType),null!=e.valueType&&e.hasOwnProperty("valueType")&&(r.valueType=p.onnx.TypeProto.toObject(e.valueType,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Map"},e}(),t.Optional=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.elemType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&p.onnx.TypeProto.encode(e.elemType,t.uint32(10).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TypeProto.Optional;e.pos<r;){var i=e.uint32();i>>>3==1?n.elemType=p.onnx.TypeProto.decode(e,e.uint32()):e.skipType(7&i)}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")){var t=p.onnx.TypeProto.verify(e.elemType);if(t)return"elemType."+t}return null},e.fromObject=function(e){if(e instanceof p.onnx.TypeProto.Optional)return e;var t=new p.onnx.TypeProto.Optional;if(null!=e.elemType){if("object"!=typeof e.elemType)throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");t.elemType=p.onnx.TypeProto.fromObject(e.elemType)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.elemType=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(r.elemType=p.onnx.TypeProto.toObject(e.elemType,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Optional"},e}(),t.SparseTensor=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&t.uint32(8).int32(e.elemType),null!=e.shape&&Object.hasOwnProperty.call(e,"shape")&&p.onnx.TensorShapeProto.encode(e.shape,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TypeProto.SparseTensor;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.elemType=e.int32();break;case 2:n.shape=p.onnx.TensorShapeProto.decode(e,e.uint32());break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")&&!d.isInteger(e.elemType))return"elemType: integer expected";if(null!=e.shape&&e.hasOwnProperty("shape")){var t=p.onnx.TensorShapeProto.verify(e.shape);if(t)return"shape."+t}return null},e.fromObject=function(e){if(e instanceof p.onnx.TypeProto.SparseTensor)return e;var t=new p.onnx.TypeProto.SparseTensor;if(null!=e.elemType&&(t.elemType=0|e.elemType),null!=e.shape){if("object"!=typeof e.shape)throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");t.shape=p.onnx.TensorShapeProto.fromObject(e.shape)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.elemType=0,r.shape=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(r.elemType=e.elemType),null!=e.shape&&e.hasOwnProperty("shape")&&(r.shape=p.onnx.TensorShapeProto.toObject(e.shape,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.SparseTensor"},e}(),t}(),r.OperatorSetIdProto=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.domain="",e.prototype.version=d.Long?d.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(10).string(e.domain),null!=e.version&&Object.hasOwnProperty.call(e,"version")&&t.uint32(16).int64(e.version),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.OperatorSetIdProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.domain=e.string();break;case 2:n.version=e.int64();break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.domain&&e.hasOwnProperty("domain")&&!d.isString(e.domain)?"domain: string expected":null!=e.version&&e.hasOwnProperty("version")&&!d.isInteger(e.version)&&!(e.version&&d.isInteger(e.version.low)&&d.isInteger(e.version.high))?"version: integer|Long expected":null},e.fromObject=function(e){if(e instanceof p.onnx.OperatorSetIdProto)return e;var t=new p.onnx.OperatorSetIdProto;return null!=e.domain&&(t.domain=String(e.domain)),null!=e.version&&(d.Long?(t.version=d.Long.fromValue(e.version)).unsigned=!1:"string"==typeof e.version?t.version=parseInt(e.version,10):"number"==typeof e.version?t.version=e.version:"object"==typeof e.version&&(t.version=new d.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber())),t},e.toObject=function(e,t){t||(t={});var r={};if(t.defaults)if(r.domain="",d.Long){var n=new d.Long(0,0,!1);r.version=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.version=t.longs===String?"0":0;return null!=e.domain&&e.hasOwnProperty("domain")&&(r.domain=e.domain),null!=e.version&&e.hasOwnProperty("version")&&("number"==typeof e.version?r.version=t.longs===String?String(e.version):e.version:r.version=t.longs===String?d.Long.prototype.toString.call(e.version):t.longs===Number?new d.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber():e.version),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.OperatorSetIdProto"},e}(),(a=Object.create(o={}))[o[0]="EXPERIMENTAL"]=0,a[o[1]="STABLE"]=1,r.OperatorStatus=a,r.FunctionProto=function(){function e(e){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.name="",e.prototype.input=d.emptyArray,e.prototype.output=d.emptyArray,e.prototype.attribute=d.emptyArray,e.prototype.attributeProto=d.emptyArray,e.prototype.node=d.emptyArray,e.prototype.docString="",e.prototype.opsetImport=d.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.input&&e.input.length)for(var r=0;r<e.input.length;++r)t.uint32(34).string(e.input[r]);if(null!=e.output&&e.output.length)for(var r=0;r<e.output.length;++r)t.uint32(42).string(e.output[r]);if(null!=e.attribute&&e.attribute.length)for(var r=0;r<e.attribute.length;++r)t.uint32(50).string(e.attribute[r]);if(null!=e.node&&e.node.length)for(var r=0;r<e.node.length;++r)p.onnx.NodeProto.encode(e.node[r],t.uint32(58).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(66).string(e.docString),null!=e.opsetImport&&e.opsetImport.length)for(var r=0;r<e.opsetImport.length;++r)p.onnx.OperatorSetIdProto.encode(e.opsetImport[r],t.uint32(74).fork()).ldelim();if(null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(82).string(e.domain),null!=e.attributeProto&&e.attributeProto.length)for(var r=0;r<e.attributeProto.length;++r)p.onnx.AttributeProto.encode(e.attributeProto[r],t.uint32(90).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.FunctionProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.name=e.string();break;case 4:n.input&&n.input.length||(n.input=[]),n.input.push(e.string());break;case 5:n.output&&n.output.length||(n.output=[]),n.output.push(e.string());break;case 6:n.attribute&&n.attribute.length||(n.attribute=[]),n.attribute.push(e.string());break;case 11:n.attributeProto&&n.attributeProto.length||(n.attributeProto=[]),n.attributeProto.push(p.onnx.AttributeProto.decode(e,e.uint32()));break;case 7:n.node&&n.node.length||(n.node=[]),n.node.push(p.onnx.NodeProto.decode(e,e.uint32()));break;case 8:n.docString=e.string();break;case 9:n.opsetImport&&n.opsetImport.length||(n.opsetImport=[]),n.opsetImport.push(p.onnx.OperatorSetIdProto.decode(e,e.uint32()));break;case 10:n.domain=e.string();break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!d.isString(e.name))return"name: string expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t)if(!d.isString(e.input[t]))return"input: string[] expected"}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t)if(!d.isString(e.output[t]))return"output: string[] expected"}if(null!=e.attribute&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var t=0;t<e.attribute.length;++t)if(!d.isString(e.attribute[t]))return"attribute: string[] expected"}if(null!=e.attributeProto&&e.hasOwnProperty("attributeProto")){if(!Array.isArray(e.attributeProto))return"attributeProto: array expected";for(var t=0;t<e.attributeProto.length;++t){var r=p.onnx.AttributeProto.verify(e.attributeProto[t]);if(r)return"attributeProto."+r}}if(null!=e.node&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var t=0;t<e.node.length;++t){var r=p.onnx.NodeProto.verify(e.node[t]);if(r)return"node."+r}}if(null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString))return"docString: string expected";if(null!=e.opsetImport&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var t=0;t<e.opsetImport.length;++t){var r=p.onnx.OperatorSetIdProto.verify(e.opsetImport[t]);if(r)return"opsetImport."+r}}return null!=e.domain&&e.hasOwnProperty("domain")&&!d.isString(e.domain)?"domain: string expected":null},e.fromObject=function(e){if(e instanceof p.onnx.FunctionProto)return e;var t=new p.onnx.FunctionProto;if(null!=e.name&&(t.name=String(e.name)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.FunctionProto.input: array expected");t.input=[];for(var r=0;r<e.input.length;++r)t.input[r]=String(e.input[r])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.FunctionProto.output: array expected");t.output=[];for(var r=0;r<e.output.length;++r)t.output[r]=String(e.output[r])}if(e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");t.attribute=[];for(var r=0;r<e.attribute.length;++r)t.attribute[r]=String(e.attribute[r])}if(e.attributeProto){if(!Array.isArray(e.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");t.attributeProto=[];for(var r=0;r<e.attributeProto.length;++r){if("object"!=typeof e.attributeProto[r])throw TypeError(".onnx.FunctionProto.attributeProto: object expected");t.attributeProto[r]=p.onnx.AttributeProto.fromObject(e.attributeProto[r])}}if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.FunctionProto.node: array expected");t.node=[];for(var r=0;r<e.node.length;++r){if("object"!=typeof e.node[r])throw TypeError(".onnx.FunctionProto.node: object expected");t.node[r]=p.onnx.NodeProto.fromObject(e.node[r])}}if(null!=e.docString&&(t.docString=String(e.docString)),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");t.opsetImport=[];for(var r=0;r<e.opsetImport.length;++r){if("object"!=typeof e.opsetImport[r])throw TypeError(".onnx.FunctionProto.opsetImport: object expected");t.opsetImport[r]=p.onnx.OperatorSetIdProto.fromObject(e.opsetImport[r])}}return null!=e.domain&&(t.domain=String(e.domain)),t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.input=[],r.output=[],r.attribute=[],r.node=[],r.opsetImport=[],r.attributeProto=[]),t.defaults&&(r.name="",r.docString="",r.domain=""),null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),e.input&&e.input.length){r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=e.input[n]}if(e.output&&e.output.length){r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=e.output[n]}if(e.attribute&&e.attribute.length){r.attribute=[];for(var n=0;n<e.attribute.length;++n)r.attribute[n]=e.attribute[n]}if(e.node&&e.node.length){r.node=[];for(var n=0;n<e.node.length;++n)r.node[n]=p.onnx.NodeProto.toObject(e.node[n],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),e.opsetImport&&e.opsetImport.length){r.opsetImport=[];for(var n=0;n<e.opsetImport.length;++n)r.opsetImport[n]=p.onnx.OperatorSetIdProto.toObject(e.opsetImport[n],t)}if(null!=e.domain&&e.hasOwnProperty("domain")&&(r.domain=e.domain),e.attributeProto&&e.attributeProto.length){r.attributeProto=[];for(var n=0;n<e.attributeProto.length;++n)r.attributeProto[n]=p.onnx.AttributeProto.toObject(e.attributeProto[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.FunctionProto"},e}(),p.onnx=r,t.exports=p});function eo(e,t){if(!e)throw Error("string"==typeof t?t:t())}function Eo(e){return new TextDecoder().decode(e)}var je,Dr,_l,gt,zi,ft,xt,te,Po,kr,Nr,Lr,Le=N(()=>{"use strict";Vs(),je=_e(Yr()),Rr(),Dr=class{static arraysEqual(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}},_l=class{static preprocessInputShapes(e,t){return[1===e.length?[1,e[0]]:e,1===t.length?[t[0],1]:t]}static postprocessOutputShape(e,t,r){1===t&&e.splice(e.length-2,1),1===r&&e.pop()}static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},gt=class e{static calcShape(e,t,r=!1){let n=e.length,i=t.length;if(0===n)return t;if(0===i)return e;let o=Math.max(e.length,t.length),a=Array(o);if(r){if(n<2||i<2)return;let r=_l.calcMatMulShape([e[n-2],e[n-1]],[t[i-2],t[i-1]]);if(void 0===r)return;[a[o-2],a[o-1]]=r}for(let s=r?3:1;s<=o;s++){let r=n-s<0?1:e[n-s],u=i-s<0?1:t[i-s];if(r!==u&&r>1&&u>1)return;a[o-s]=Math.max(r,u)}return a}static index(t,r){let n=Array(r.length);return e.fillIndex(t,r,n),n}static fillIndex(e,t,r){let n=e.length-t.length;for(let i=0;i<t.length;i++)r[i]=e[n+i]%t[i]}static calc(t,r,n,i,o){let a=e.calcShape(t.dims,r.dims);if(a){if(i&&!te.areEqual(a,t.dims))return;let s=te.size(a),u=i?t:new rt(a,o||t.type);if(0===a.length)u.set([],n(t.get([]),r.get([])));else{let i,o=Array(a.length),l=Array(t.dims.length),d=Array(r.dims.length),p=0,c=0,h=!1,f=!1;0===t.dims.length&&(p=t.get([]),h=!0),0===r.dims.length&&(c=r.get([]),f=!0);for(let m=0;m<s;m++){i=m;for(let e=a.length-1;e>=0;e--)o[e]=i%a[e],i=Math.floor(i/a[e]);h||(e.fillIndex(o,t.dims,l),p=t.get(l)),f||(e.fillIndex(o,r.dims,d),c=r.get(d)),u.set(o,n(p,c))}}return u}}static isValidBroadcast(e,t){let r=e.length,n=t.length;if(r>n)return!1;for(let i=1;i<=r;i++)if(1!==e[r-i]&&e[r-i]!==t[n-i])return!1;return!0}static getBroadcastDims(e,t){let r=e.length,n=[];for(let i=0;i<r;i++){let o=r-1-i,a=e[o]||1;(t[t.length-1-i]||1)>1&&1===a&&n.unshift(o)}return n}},zi=class{static getShapeOfGemmResult(e,t,r,n,i){let o,a,s;if(2!==e.length||2!==r.length)throw Error("shape need to be of size 2");t?(o=e[1],a=e[0]):(o=e[0],a=e[1]);let u=-1;if(n?(s=r[0],u=1):(s=r[1],u=0),r[u]!==a)throw Error("dimension mismatch");if(o<=0||s<=0||a<=0)throw Error("invalid shape specified");if(i&&!gt.isValidBroadcast(i,[o,s]))throw Error("gemm: invalid bias shape for broadcast");return[o,s,a]}},ft=class e{static tensorDataTypeFromProto(e){switch(e){case je.onnx.TensorProto.DataType.INT8:return"int8";case je.onnx.TensorProto.DataType.UINT8:return"uint8";case je.onnx.TensorProto.DataType.BOOL:return"bool";case je.onnx.TensorProto.DataType.INT16:return"int16";case je.onnx.TensorProto.DataType.UINT16:return"uint16";case je.onnx.TensorProto.DataType.INT32:return"int32";case je.onnx.TensorProto.DataType.UINT32:return"uint32";case je.onnx.TensorProto.DataType.FLOAT:return"float32";case je.onnx.TensorProto.DataType.DOUBLE:return"float64";case je.onnx.TensorProto.DataType.STRING:return"string";case je.onnx.TensorProto.DataType.INT64:return"int32";case je.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw Error(`unsupported data type: ${je.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return je.onnx.TensorProto.DataType.INT8;case"uint8":return je.onnx.TensorProto.DataType.UINT8;case"bool":return je.onnx.TensorProto.DataType.BOOL;case"int16":return je.onnx.TensorProto.DataType.INT16;case"uint16":return je.onnx.TensorProto.DataType.UINT16;case"int32":return je.onnx.TensorProto.DataType.INT32;case"uint32":return je.onnx.TensorProto.DataType.UINT32;case"float32":return je.onnx.TensorProto.DataType.FLOAT;case"float64":return je.onnx.TensorProto.DataType.DOUBLE;case"string":return je.onnx.TensorProto.DataType.STRING;case"int64":return je.onnx.TensorProto.DataType.INT64;case"uint64":return je.onnx.TensorProto.DataType.UINT64;default:throw Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(e=>cr.isLong(e)?e.toNumber():e)}static tensorValueTypeFromProto(t){return{tensorType:e.tensorDataTypeFromProto(t.elemType),shape:{dims:e.tensorDimsFromProto(t.shape.dim.map(e=>e.dimValue))}}}static tensorDimsFromORTFormat(e){let t=[];for(let r=0;r<e.dimsLength();r++)t.push(xt.longToNumber(e.dims(r)));return t}static tensorAttributesFromORTFormat(e){let t=[];for(let r=0;r<e.attributesLength();r++)t.push(e.attributes(r));return t}},xt=class{static longToNumber(e){return cr.isLong(e)?e.toNumber():"bigint"==typeof e?Number(e):e}static isLong(e){return cr.isLong(e)||"bigint"==typeof e}},te=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static sizeFromDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(e,t,r){let n=1;for(let i=t;i<r;i++){if(e[i]<=0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");n*=e[i]}return n}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let r=Array(t);r[t-1]=1,r[t-2]=e[t-1];for(let n=t-3;n>=0;--n)r[n]=r[n+1]*e[n+1];return r}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,t,r){void 0===r&&(r=e.length);let n=0;for(let i=0;i<r;++i)n+=t[i]*e[i];return n}static offsetToIndices(e,t){let r=t.length;if(0===r)return[];if(1===r)return[e*t[0]];let n=Array(t.length);for(let r=0;r<n.length-1;++r)n[r]=Math.floor(e/t[r]),e-=n[r]*t[r];return n[n.length-1]=e,n}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(e=>this.normalizeAxis(e,t))}static incrementIndex(e,t,r){if(0===t.length||0===e.length)throw Error("Index incrementing unsupported for scalar Tensor");if(void 0===r)r=t.length;else if(r<=0||r>t.length)throw Error("Incorrect axis to increment on");for(let n=r-1;n>=0&&(e[n]++,!(e[n]<t[n]));--n)e[n]=0}static calculateReshapedDims(t,r){if(0===r.length){if(0===t.length||1===e.size(t))return[];throw Error("cannot reshape to a scalar Tensor")}let n=r.length,i=Array(n),o=-1,a=1;for(let e=0;e<n;e++){if(r[e]<-1)throw Error("a dimension in shape hints cannot be less than -1");if(-1===r[e]){if(-1!==o)throw Error("at most one dimension in shape hints can be -1");o=e}else{if(0===r[e]){if(e>=t.length)throw Error("the dimension with value zero exceeds the dimension size of the input tensor");i[e]=t[e]}else i[e]=r[e];a*=i[e]}}let s=e.size(t);if(-1!==o){if(s%a!=0)throw Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${t}] Output shape: [${r}]`);i[o]=s/a}else if(a!==s)throw Error("reshapedDims and originalDims don't have matching sizes");return i}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let r=e.length;return e.map((e,n)=>e+t[n]+t[n+r])}static areEqual(e,t){return e.length===t.length&&e.every((e,r)=>e===t[r])}static validateDimsAndCalcSize(e){if(e.length>6)throw TypeError("Only rank 0 to 6 is supported for tensor shape.");let t=1;for(let r of e){if(!Number.isInteger(r))throw TypeError(`Invalid shape: ${r} is not an integer`);if(r<0||r>0x7fffffff)throw TypeError(`Invalid shape: length ${r} is not allowed`);t*=r}return t}static flattenShape(e,t){t<0&&(t+=e.length);let r=e.reduce((e,t)=>e*t,1),n=e.slice(t).reduce((e,t)=>e*t,1);return[r/n,n]}static squeezeShape(t,r){let n=[];r=e.normalizeAxes(r,t.length);for(let e=0;e<t.length;e++){let i=r.indexOf(e)>=0;if(i&&1!==t[e])throw Error("squeeze an axis of size different than 1");(0===r.length&&t[e]>1||r.length>0&&!i)&&n.push(t[e])}return n}static unsqueezeShape(t,r){let n=Array(t.length+r.length);n.fill(0);for(let t=0;t<r.length;t++){let i=e.normalizeAxis(r[t],n.length);if(i>=n.length)throw Error("'axes' has an out of range axis");if(0!==n[i])throw Error("'axes' has a duplicate axis");n[i]=1}let i=0;for(let e=0;e<n.length;e++)0===n[e]&&(n[e]=t[i++]);if(i!==t.length)throw Error("the unsqueezed dimension could not be established");return n}},Po=class e{static splitShape(t,r,n,i){if(0===n.length){if(!i)throw Error("need to know number of outputs when the 'split' attribute is not specified");e.determineSplit(t[r],i,n)}let o=[],a=[0];for(let e=0;e<n.length;++e){0!==e&&a.push(a[e-1]+n[e-1]);let i=t.slice();i[r]=n[e],o.push(i)}return[o,a]}static determineSplit(e,t,r){if(e%t!=0)throw Error("cannot split tensor to equal sized parts");for(let n=0;n<t;++n)r.push(e/t)}},kr=class e{static adjustPoolAttributes(e,t,r,n,i,o){if(!e&&r.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=r.length?r.push(t[e+2]):r[e]=t[e+2];for(let e=0;e<r.length;e++)if(e<n.length){if(n[e]<0)throw Error("strides should be greater than or equal to 1")}else n.push(1);for(let e=0;e<r.length;e++)if(e<i.length){if(i[e]<0)throw Error("dilations should be greater than or equal to 1")}else i.push(1);for(let e=0;e<2*r.length;e++)if(e<o.length){if(o[e]<0)throw Error("pad should be greater than or equal to 1")}else o.push(0);for(let e=0;e<r.length;e++){if(r[e]<=0)throw Error("kernel shapes need to be greater than 0");if(o[e]>=r[e]||o[e+r.length]>=r[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,i,o,a){if(a){if(o.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<t.length-2;s++)e.adjustPadAndReturnShape(t[s+2],r[s],n[s],i[s],o,s,s+t.length-2,a)}}static computePoolOutputShape(t,r,n,i,o,a,s){if(r.length<=0)throw Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return e.computeShapeHelper(t,r,u,n,i,o,a,s),u}static computeConvOutputShape(t,r,n,i,o,a,s){if(t.length<=0||r.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return e.computeShapeHelper(!1,t,u,n,i,o,a,s),u}static computeShapeHelper(t,r,n,i,o,a,s,u){if(t)for(let e=0;e<r.length-2;e++)n.push(1);else for(let t=0;t<r.length-2;t++)n.push(e.adjustPadAndReturnShape(r[t+2],i[t],o[t],a[t],s,t,t+r.length-2,u))}static adjustPadAndReturnShape(e,t,r,n,i,o,a,s){let u=r*(n-1)+1;if(!s||"NOTSET"===s)return Math.floor((e+i[o]+i[a]-u)/t+1);switch(s){case"VALID":return i[o]=0,i[a]=0,Math.floor((e-u)/t+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==r)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let r=((e+t-1)/t-1)*t+n-e;return i[o]=Math.floor("SAME_LOWER"===s?(r+1)/2:r/2),i[a]=r-i[o],Math.floor((e+r-n)/t+1)}default:throw Error("Unsupported AutoPad type")}}},Nr=-34028234663852886e22,Lr=34028234663852886e22});function q$(e){switch(e){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw Error(`cannot calculate sizeof() on type ${e}`)}}function nm(e){switch(e){case Ie.onnx.TensorProto.DataType.UINT8:case Ie.onnx.TensorProto.DataType.INT8:case Ie.onnx.TensorProto.DataType.BOOL:return 1;case Ie.onnx.TensorProto.DataType.UINT16:case Ie.onnx.TensorProto.DataType.INT16:return 2;case Ie.onnx.TensorProto.DataType.FLOAT:case Ie.onnx.TensorProto.DataType.INT32:case Ie.onnx.TensorProto.DataType.UINT32:return 4;case Ie.onnx.TensorProto.DataType.INT64:case Ie.onnx.TensorProto.DataType.DOUBLE:case Ie.onnx.TensorProto.DataType.UINT64:return 8;default:throw Error(`cannot calculate sizeof() on type ${Ie.onnx.TensorProto.DataType[e]}`)}}function j$(e,t){return new(im(t))(e)}function im(e){switch(e){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw Error("unspecified error")}}function wl(e,t){if(t===Ie.onnx.TensorProto.DataType.INT64||t===Io.TensorDataType.INT64){if(e.greaterThanOrEqual(0x80000000)||e.lessThan(-0x80000000))throw TypeError("int64 is not supported")}else if(t===Ie.onnx.TensorProto.DataType.UINT32||t===Io.TensorDataType.UINT32||t===Ie.onnx.TensorProto.DataType.UINT64||t===Io.TensorDataType.UINT64){if(e.greaterThanOrEqual(0x100000000)||e.lessThan(0))throw TypeError("uint64 is not supported")}else throw TypeError(`not a LONG type: ${Ie.onnx.TensorProto.DataType[t]}`);return e.toNumber()}function rm(e,t,r){switch(t){case Ie.onnx.TensorProto.DataType.BOOL:case Ie.onnx.TensorProto.DataType.UINT8:return e.getUint8(r);case Ie.onnx.TensorProto.DataType.INT8:return e.getInt8(r);case Ie.onnx.TensorProto.DataType.UINT16:return e.getUint16(r,!0);case Ie.onnx.TensorProto.DataType.INT16:return e.getInt16(r,!0);case Ie.onnx.TensorProto.DataType.FLOAT:return e.getFloat32(r,!0);case Ie.onnx.TensorProto.DataType.INT32:return e.getInt32(r,!0);case Ie.onnx.TensorProto.DataType.UINT32:return e.getUint32(r,!0);case Ie.onnx.TensorProto.DataType.INT64:return wl(cr.fromBits(e.getUint32(r,!0),e.getUint32(r+4,!0),!1),t);case Ie.onnx.TensorProto.DataType.DOUBLE:return e.getFloat64(r,!0);case Ie.onnx.TensorProto.DataType.UINT64:return wl(cr.fromBits(e.getUint32(r,!0),e.getUint32(r+4,!0),!0),t);default:throw Error(`cannot read from DataView for type ${Ie.onnx.TensorProto.DataType[t]}`)}}var om,Ie,rt,Rr=N(()=>{"use strict";om=_e(vf()),Vs(),So(),Ie=_e(Yr()),Le(),rt=class e{constructor(e,t,r,n,i,o=om.Guid.create()){this.dims=e,this.type=t,this.dataProvider=r,this.asyncDataProvider=n,this.cache=i,this.dataId=o,this.size=te.validateDimsAndCalcSize(e);let a=this.size,s=void 0===r&&void 0===n&&void 0===i;if(void 0!==i&&i.length!==a)throw RangeError("Input dims doesn't match data length.");if("string"===t){if(void 0!==i&&(!Array.isArray(i)||!i.every(e=>"string"==typeof e)))throw TypeError("cache should be a string array");s&&(this.cache=Array(a))}else{if(void 0!==i){let e=im(t);if(!(i instanceof e))throw TypeError(`cache should be type ${e.name}`)}if(s){let e=new ArrayBuffer(a*q$(t));this.cache=j$(e,t)}}}get data(){if(void 0===this.cache){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if("string"!==this.type)throw TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw TypeError("data type is not float (float32, float64)")}}get numberData(){if("string"!==this.type)return this.data;throw TypeError("type cannot be non-number (string)")}get(e){return this.data[te.indicesToOffset(e,this.strides)]}set(e,t){this.data[te.indicesToOffset(e,this.strides)]=t}async getData(){return void 0===this.cache&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=te.computeStrides(this.dims)),this._strides}static fromProto(t){if(!t)throw Error("cannot construct Value from an empty tensor");let r=ft.tensorDataTypeFromProto(t.dataType),n=new e(ft.tensorDimsFromProto(t.dims),r);if("string"===r)t.stringData.forEach((e,t)=>{n.data[t]=Eo(e)});else if(t.rawData&&"number"==typeof t.rawData.byteLength&&t.rawData.byteLength>0){let e=n.data,r=new DataView(t.rawData.buffer,t.rawData.byteOffset,t.rawData.byteLength),i=nm(t.dataType),o=t.rawData.byteLength/i;if(t.rawData.byteLength%i!=0)throw Error("invalid buffer length");if(e.length!==o)throw Error("buffer length mismatch");for(let n=0;n<o;n++){let o=rm(r,t.dataType,n*i);e[n]=o}}else{let e;switch(t.dataType){case Ie.onnx.TensorProto.DataType.FLOAT:e=t.floatData;break;case Ie.onnx.TensorProto.DataType.INT32:case Ie.onnx.TensorProto.DataType.INT16:case Ie.onnx.TensorProto.DataType.UINT16:case Ie.onnx.TensorProto.DataType.INT8:case Ie.onnx.TensorProto.DataType.UINT8:case Ie.onnx.TensorProto.DataType.BOOL:e=t.int32Data;break;case Ie.onnx.TensorProto.DataType.INT64:e=t.int64Data;break;case Ie.onnx.TensorProto.DataType.DOUBLE:e=t.doubleData;break;case Ie.onnx.TensorProto.DataType.UINT32:case Ie.onnx.TensorProto.DataType.UINT64:e=t.uint64Data;break;default:throw Error("unspecific error")}if(null==e)throw Error("failed to populate data from a tensorproto value");let r=n.data;if(r.length!==e.length)throw Error("array length mismatch");for(let n=0;n<e.length;n++){let i=e[n];cr.isLong(i)?r[n]=wl(i,t.dataType):r[n]=i}}return n}static fromData(t,r,n){return new e(r,n,void 0,void 0,t)}static fromOrtTensor(t){if(!t)throw Error("cannot construct Value from an empty tensor");let r=ft.tensorDimsFromORTFormat(t),n=ft.tensorDataTypeFromProto(t.dataType()),i=new e(r,n);if("string"===n)for(let e=0;e<t.stringDataLength();e++)i.data[e]=t.stringData(e);else if(t.rawDataArray()&&"number"==typeof t.rawDataLength()&&t.rawDataLength()>0){let e=i.data,r=new DataView(t.rawDataArray().buffer,t.rawDataArray().byteOffset,t.rawDataLength()),n=nm(t.dataType()),o=t.rawDataLength()/n;if(t.rawDataLength()%n!=0)throw Error("invalid buffer length");if(e.length!==o)throw Error("buffer length mismatch");for(let i=0;i<o;i++){let o=rm(r,t.dataType(),i*n);e[i]=o}}return i}}});function se(e){return 1===e?K$:X$}function am(e){let t=se(e);return`${t.version}
      precision highp float;
      ${t.attribute} vec3 position;
      ${t.attribute} vec2 textureCoord;

      ${t.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function sm(e){let t=se(e);return`${t.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${t.varyingFrag} vec2 TexCoords;
    ${t.outputDeclaration}
    const vec2 halfCR = vec2(0.5, 0.5);

    // Custom vector types to handle higher dimenalities.
    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    `}function um(e,t){let r=se(e);return`
  void main() {
    int indices[${t}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${r.output} = result;
  }
  `}var K$,X$,Ze=N(()=>{"use strict";K$={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},X$={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}}),Ae=N(()=>{});async function vl(e,t=e=>0,r){return new Promise((n,i)=>{let o=0,a=()=>{if(e())return void n();let s=t(++o);null!=r&&o>=r?i():setTimeout(a,s)};a()})}function Mi(e){return eo("u">typeof e&&0!==e.length,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)}function lm(e){return eo("u">typeof e&&0!==e.length,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)+"AtOutCoords"}function to(e,t){return JSON.parse(JSON.stringify(e)),t}function no(e,t){return t.map(t=>e[t]).join(", ")}function bt(e){if(e<=1)return"int";if(2===e)return"ivec2";if(3===e)return"ivec3";if(4===e)return"ivec4";if(5===e)return"ivec5";if(6===e)return"ivec6";throw Error(`GPU for rank ${e} is not yet supported`)}function Kt(e=6){return["x","y","z","w","u","v"].slice(0,e)}var zn=N(()=>{"use strict";Le()});function Z$(e,t){return Kt(t).map(t=>`${e}.${t}`)}function ro(e,t){return 1===t?[e]:Z$(e,t)}function Mn(){return`
    float getChannel(vec4 frag, int dim) {
      int modCoord = imod(dim, 2);
      return modCoord == 0 ? frag.r : frag.g;
    }

    float getChannel(vec4 frag, vec2 innerDims) {
      vec2 modCoord = mod(innerDims, 2.);
      return modCoord.x == 0. ?
        (modCoord.y == 0. ? frag.r : frag.g) :
        (modCoord.y == 0. ? frag.b : frag.a);
    }
  `}var zr=N(()=>{"use strict";zn()});function Q$(e,t,r){if(0===e)return"false";if(1===e)return`rc > ${t[0]}`;let n="";for(let i=e-2;i<e;i++)n+=`${r[i]} >= ${t[i-e+2]}`,i<e-1&&(n+="||");return n}function Y$(e,t){let r=e.length;if(0===r)return"getA(), 0, 0, 0";if(1===r)return`getA(rc),
            rc + 1 >= ${e[0]} ? 0. : getA(rc + 1),
            0, 0`;let n="";if(r>2)for(let e=0;e<r-2;++e)n+=`${t[e]},`;return`getA(${n}r, c),
          rEdge ? 0. : getA(${n}rp1, c),
          cEdge ? 0. : getA(${n}r, cp1),
          rEdge || cEdge ? 0. : getA(${n}rp1, cp1)`}function eA(e,t,r,n){return 0===e||1===e?"":`
    int r = ${t[e-2]};
    int c = ${t[e-1]};
    int rp1 = ${t[e-2]} + 1;
    int cp1 = ${t[e-1]} + 1;
    bool rEdge = rp1 >= ${n};
    bool cEdge = cp1 >= ${r};
    `}var cm,J$,dm,pm=N(()=>{"use strict";Ze(),Ae(),zn(),zr(),cm={name:"pack",inputNames:["A"],inputTypes:[1]},J$=(e,t)=>{let r=se(e.session.backend.glContext.version),n=t.dims,i=n.length,o=t.dims.length,a=bt(o),s=ro("rc",o),u=eA(o,s,n[n.length-2],n[n.length-1]),l;l=0===i?[1,1]:1===i?[n[0],1]:[n[o-1],n[o-2]];let d=Q$(o,l,s),p=Y$(n,s),c=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${d}) {
            ${r.output} = vec4(0);
          } else {
            ${u}

            ${r.output} = vec4(${p});
          }
        }
      `;return{...cm,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:2},shaderSource:c}},dm=(e,t)=>({...cm,get:()=>J$(e,t)})});function xl(e){if(0===e.length)return[1,1,1];let t=1;for(let r=0;r<e.length-2;++r)t*=e[r];return[t,e.length>1?e[e.length-2]:1,e[e.length-1]]}function hm(e,t){return 0===e.length||0===t.length||(e.length<2||t.length<2?e[e.length-1]===t[t.length-1]:e[e.length-1]===t[t.length-1]&&e[e.length-2]===t[t.length-2])}function rA(e){let t=te.computeStrides(e),r=["b","r","c"],n="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t.map((e,i)=>{let o=`int ${r[i]} = ${n} / ${e}`,a=i===t.length-1?`int ${r[i+1]} = ${n} - ${r[i]} * ${e}`:`index -= ${r[i]} * ${e}`;return`${o}; ${a};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function oA(e){let t=te.computeStrides(e);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${t[0]} + coords.z * ${t[1]} + coords.y;
  }
`}var tA,nA,fm,Tl,mm=N(()=>{"use strict";Le(),Ze(),Ae(),zr(),tA=e=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${e}`}),nA=(e,t,r,n)=>{let i=t.dims,o="";for(let e=0;e<4;e++){let t="";switch(e){case 0:t="outputCoords = rc;";break;case 1:t="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:t="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:t="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw Error()}o+=`
        ${t}
        ${e>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${e}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${e>0?"}":""}
      `}let a=se(e.session.backend.glContext.version),s=`
      ${rA(i)}
      ${oA(n)}
      ${Mn()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${n[2]};
        int cols = ${n[1]};

        ${o}
        ${a.output} = result;
      }
    `;return{...r,output:{dims:n,type:t.type,textureType:2},shaderSource:s,hasMain:!0}},fm=(e,t,r)=>{let n=tA(r);return{...n,get:()=>nA(e,t,n,r)}}}),gm=N(()=>{"use strict";Ze(),Ae(),Tl=(e,t)=>{let r=t.shape,n=se(e.session.backend.glContext.version),i=`
    const float FLOAT_MAX = 1.70141184e38;
    const float FLOAT_MIN = 1.17549435e-38;

    bool isNaN(float val) {
      return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;
    }

    highp vec4 encodeAsUint8(highp float v) {
      if (isNaN(v)) {
        return vec4(255, 255, 255, 255);
      }

      highp float av = abs(v);

      if(av < FLOAT_MIN) {
        return vec4(0.0, 0.0, 0.0, 0.0);
      } else if(v > FLOAT_MAX) {
        return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
      } else if(v < -FLOAT_MAX) {
        return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
      }

      highp vec4 c = vec4(0,0,0,0);

      highp float e = floor(log2(av));
      highp float m = exp2(fract(log2(av))) - 1.0;

      c[2] = floor(128.0 * m);
      m -= c[2] / 128.0;
      c[1] = floor(32768.0 * m);
      m -= c[1] / 32768.0;
      c[0] = floor(8388608.0 * m);

      highp float ebias = e + 127.0;
      c[3] = floor(ebias / 2.0);
      ebias -= c[3] * 2.0;
      c[2] += floor(ebias) * 128.0;

      c[3] += 128.0 * step(0.0, -v);

      return c / 255.0;
    }

    void main() {
      float value = ${n.texture2D}(X,TexCoords).r;
      ${n.output} = encodeAsUint8(value);
    }`,o={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:r,type:t.tensor.type,textureType:3},shaderSource:i,hasMain:!0};return e.executeProgram(o,[t.tensor])}});function aA(e,t){if(1===e)return"rc";let r="";for(let n=0;n<e;n++)r+=t[n],n<e-1&&(r+=",");return r}var bm,iA,ym,Bi,Co,Fi,ko,wm,Il,uA,Vi,Sl,ve,Im,Sm,$m,lA,cA,Gi,zt,K,No,Ui,_m=N(()=>{"use strict";Ze(),Ae(),zn(),zr(),bm={name:"unpack",inputNames:["A"],inputTypes:[2]},iA=(e,t)=>{let r=t.dims.length,n=ro("rc",r),i=n.slice(-2),o=bt(r),a=Mn(),s=0===t.dims.length?"":aA(r,n),u=r<=1?"rc":`vec2(${i.join(",")})`,l=se(e.session.backend.glContext.version),d=`
    ${a}
    void main() {
      ${o} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${s});

       ${l.output} = vec4(getChannel(packedInput, ${u}), 0, 0, 0);
     }
   `;return{...bm,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:d}},ym=(e,t)=>({...bm,get:()=>iA(e,t)})}),Do=N(()=>{"use strict";Ct(),Bi=class{constructor(e,t=1){if(1===t)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=t;else if(4===t)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=t;else throw Error(`Invalid number of channels: ${t}`)}encode(e,t){let r,n;return e.constructor!==Float32Array&&(ze.warning("Encoder","data was not of type Float32; creating new Float32Array"),n=new Float32Array(e)),t*this.channelSize>e.length?(ze.warning("Encoder","Source data too small. Allocating larger array"),n=e,r=this.allocate(t*this.channelSize),n.forEach((e,t)=>r[t]=e)):r=n=e,r}allocate(e){return new Float32Array(4*e)}decode(e,t){return 1===this.channelSize?e.filter((e,t)=>t%4==0).subarray(0,t):e.subarray(0,t)}},Co=class{constructor(e,t=1,r){if(1!==t&&4!==t)throw Error(`Invalid number of channels: ${t}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=t,this.textureType=r||e.FLOAT}encode(e,t){let r=e;return 1===this.channelSize&&(ze.verbose("Encoder","Exploding into a larger array"),r=this.allocate(t),e.forEach((e,t)=>r[4*t]=e)),r}allocate(e){return new Float32Array(4*e)}decode(e,t){return 1===this.channelSize?e.filter((e,t)=>t%4==0).subarray(0,t):e.subarray(0,t)}},Fi=class{constructor(e,t=1){if(this.channelSize=4,1===t)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else if(4===t)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else throw Error(`Invalid number of channels: ${t}`)}encode(e,t){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,t){if(e instanceof Uint8Array)return e.subarray(0,t);throw Error(`Invalid array type: ${e.constructor}`)}}}),vm=N(()=>{"use strict";Le(),Ae(),ko=(e,t,r)=>{let n=4===r?t.length-1:void 0,i=4===r?t.map((e,r)=>r===t.length-1?4*e:e):void 0;return Il(e,t,0===r||1===r?1:4,i,{isPacked:2===r,reverseWH:1===r||2===r,breakAxis:n})},wm=(e,t,r)=>{let n=ko(e,t,r);return[n.width,n.height]},Il=(e,t,r=1,n,i)=>{let o=!!(i&&i.isPacked),[a,s]=e.computeTextureWH(o&&n||t,i),u=t.length,l=t.slice(0);if(0===u&&(l=[1]),1===r)n=t;else if(o){if(4!==r)throw Error("a packed texture must be 4-channel");n=t,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!n)throw Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:r,isPacked:o,shape:l,strides:te.computeStrides(l),unpackedShape:n,reversedWH:i&&i.reverseWH}}}),Tm=N(()=>{"use strict";Ct(),Rr(),Le(),pm(),mm(),gm(),_m(),Do(),vm(),Ae(),uA=(e,t)=>{let r=t.map(e=>`${e.unpackedShape.join(",")};${e.width}x${e.height}`).join("_"),n=e.name;return e.cacheHint&&(n+="["+e.cacheHint+"]"),n+=":"+r},Vi=class{constructor(e){this.session=e,this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,t){return wm(this.session.layoutStrategy,e,t)}executeProgram(e,t){if(t.length<e.inputNames.length)throw Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw Error("input names size does not match input types");let r=[];for(let n=0;n<e.inputNames.length;++n)r[n]=this.getOrCreateTextureData(t[n],e.inputTypes[n]);let n=uA(e,r),i=this.session.programManager.getArtifact(n),o=i?i.programInfo:"function"==typeof e.get?e.get():e,a=ko(this.session.layoutStrategy,o.output.dims,o.output.textureType),s=this.createTextureData(a,o.output.type);return i||(i=this.session.programManager.build(o,r,s),this.session.programManager.setArtifact(n,i)),this.runProgram(i,r,s),s}run(e,t){return this.executeProgram(e,t).tensor}runProgram(e,t,r){for(let r=0;r<t.length;++r)if(!!t[r].isPacked!=(2===e.programInfo.inputTypes[r]))throw Error(`input[${r}] property packed inconsistent`);if(!!r.isPacked!=(2===e.programInfo.output.textureType))throw Error("output property packed inconsistent");this.session.programManager.run(e,t,r)}getOrCreateTextureData(e,t){let r=this.getTextureData(e.dataId,2===t);if(!r&&(r=this.getTextureData(e.dataId,2!==t)))return 2===t?this.pack(r):this.unpack(r);if(!r){let n=ko(this.session.layoutStrategy,e.dims,t);if(4===t){let r=e.dims;if(4===r.length){let n=[r[0],Math.ceil(r[1]*r[2]*r[3]/4)],i=ko(this.session.layoutStrategy,n,t),o=e.numberData;if(r[1]*r[2]*r[3]%4!=0){let t=r[0],n=r[1]*r[2]*r[3],i=4*Math.ceil(n/4);o=new Float32Array(t*i);for(let r=0;r<t;++r){let t=r*n,a=r*i+r%1*n;o.set(e.numberData.subarray(t,t+n),a)}}return this.createTextureData(i,e.type,o,e,1)}}if(2===t){let t=Il(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),n=this.createTextureData(t,e.type,e.numberData,e,1);r=this.pack(n)}else r=this.createTextureData(n,e.type,e.numberData,e,1)}return r}createTextureDataFromLayoutBindTensor(e,t,r,n){return this.createTextureData(e,t,r,n,1)}createTextureData(e,t,r,n,i){ze.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let o=this.session.textureManager.createTextureFromLayout(t,e,r,i);return this.createTextureDataFromTexture(e,t,o,n)}reshapeUnpacked(e,t){let r=this.getOrCreateTextureData(e,0),n={channels:r.channels,height:r.height,width:r.width,shape:0!==t.length?t:[1],strides:te.computeStrides(t),unpackedShape:t};return this.createTextureDataFromTexture(n,e.type,r.texture).tensor}reshapePacked(e,t){let r=this.getOrCreateTextureData(e,2);if(hm(e.dims,t)){let n={channels:r.channels,height:r.height,width:r.width,shape:0!==t.length?t:[1],strides:te.computeStrides(t),unpackedShape:t,isPacked:!0};return this.createTextureDataFromTexture(n,e.type,r.texture).tensor}let n=xl(e.dims),i=xl(t),o=this.reshapePacked(e,n),a=this.run(fm(this,o,i),[o]);return this.reshapePacked(a,t)}cast(e,t){let r=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(r,t,r.texture).tensor}createTextureDataFromTexture(e,t,r,n,i){let o={...e,tensor:n||new rt(e.unpackedShape,t,e=>this.readTexture(o),async e=>this.readTextureAsync(o),void 0,i),texture:r};return this.setTextureData(o.tensor.dataId,o,e.isPacked),o}getTextureData(e,t=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,t):t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,r=!1){this.session.isInitializer(e)?this.session.setTextureData(e,t,r):(r?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,t)}isTextureLayoutCached(e,t=!1){return!!this.getTextureData(e.dataId,t)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Tl(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Tl(this,e))}pack(e){return this.executeProgram(dm(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(ym(this,e.tensor),[e.tensor])}}}),lt=N(()=>{"use strict";Sl=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ve=e=>new Sl(e)}),Am=N(()=>{"use strict";lt(),Ze(),Ae(),Im={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},Sm=(e,t,r)=>(cA(t),[e.run({...Im,cacheHint:r.cacheKey,get:()=>lA(e,t,r)},t)]),$m=e=>{let t=e.attributes.getFloat("epsilon",1e-5),r=e.attributes.getFloat("momentum",.9),n=e.attributes.getInt("spatial",1);return ve({epsilon:t,momentum:r,spatial:n})},lA=(e,t,r)=>{let n=se(e.session.backend.glContext.version),i=t[0].dims.length,[o,a]=e.calculateTextureWidthAndHeight(t[1].dims,0),s=`
  float process(int[${i}] indices) {
    vec2 position = offsetToCoords(indices[1], ${o}, ${a});
    float scale = getColorAsFloat(${n.texture2D}(Scale, position));
    float mean = getColorAsFloat(${n.texture2D}(Mean, position));
    float variance = getColorAsFloat(${n.texture2D}(Variance, position));
    float b = getColorAsFloat(${n.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${r.epsilon})) ) + b;
  }`;return{...Im,output:{dims:t[0].dims,type:t[0].type,textureType:0},shaderSource:s}},cA=e=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs.");let t=e[0],r=e[1],n=e[2],i=e[3],o=e[4];if(t.dims.length<3||1!==r.dims.length||1!==n.dims.length||1!==i.dims.length||1!==o.dims.length||r.dims[0]!==t.dims[1]||n.dims[0]!==t.dims[1]||i.dims[0]!==t.dims[1]||o.dims[0]!==t.dims[1])throw Error("invalid input shape.");if("float32"!==t.type&&"float64"!==t.type||"float32"!==r.type&&"float64"!==r.type||"float32"!==n.type&&"float64"!==n.type||"float32"!==i.type&&"float64"!==i.type||"float32"!==o.type&&"float64"!==o.type)throw Error("invalid input tensor types.")}}),Qn=N(()=>{"use strict";Gi=class{constructor(e,t,r,n){this.glContext=e,this.programInfo=t,this.inputTextureLayouts=r,this.outputTextureLayout=n}},zt=class{constructor(e){this.context=e}},K=class{constructor(e,t){this.routineBody=e,this.dependencies=t}},No=class{constructor(e,t,r){this.name=e,r?this.dependencies=r:this.dependencies=[],t&&(this.routineBody=t)}addDependency(e){e&&this.dependencies.push(e)}},Ui=class{static returnOrderedNodes(e){if(!e||0===e.length)return[];if(1===e.length)return e;let t=new Set,r=new Set,n=[];return this.createOrderedNodes(e,t,r,n),n}static createOrderedNodes(e,t,r,n){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],t,r,n)}static dfsTraverse(e,t,r,n){if(!e||r.has(e.name))return;if(t.has(e.name))throw Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");t.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let e=0;e<i.length;++e)this.dfsTraverse(i[e],t,r,n);n.push(e),r.add(e.name),t.delete(e.name)}}});function pA(){let e="add_";return{body:`
  float ${e}(float a, float b) {
    return a + b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:e,type:0}}function fA(){let e="div_";return{body:`
  float ${e}(float a, float b) {
    return a / b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:e,type:0}}function hA(){let e="mul_";return{body:`
  float ${e}(float a, float b) {
    return a * b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:e,type:0}}function mA(){let e="sub_";return{body:`
  float ${e}(float a, float b) {
    return a - b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:e,type:0}}function gA(){let e="equal_";return{body:`
  float ${e}(float a, float b) {
    return float(a == b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:e,type:0}}function bA(){let e="greater_";return{body:`
  float ${e}(float a, float b) {
    return float(a > b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:e,type:0}}function yA(){let e="less_";return{body:`
  float ${e}(float a, float b) {
    return float(a < b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:e,type:0}}function _A(){let e="and_";return{body:`
  float ${e}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:e,type:0}}function wA(){return{body:`
  float or_(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 or_(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:"or_",type:0}}function vA(){let e="xor_";return{body:`
  float ${e}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:e,type:0}}function xA(){return IA("pow")}function TA(){let e="prelu_";return{body:`
  float ${e}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:e,type:0}}function IA(e){let t=`${e}_`;return{body:`
  float ${t}(float a, float b) {
    return ${e}(a, b);
  }
  vec4 ${t}(vec4 v1, vec4 v2) {
    return ${e}(v1, v2);
  }
  `,name:t,type:0}}var Mt,SA,Om,Pm,Em,Cm,Dm,km,Nm,Lm,Rm,zm,Mm,Bm,Vm,Gm,AA,OA,PA,Wm,Wi,qm,EA,CA,DA,jm,kA,NA,LA,Km,RA,Fm=N(()=>{"use strict";Le(),Qn(),Ze(),Ae(),Mt=(e,t,r,n=t[0].type,i)=>{let o=2*!!e.session.pack;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],cacheHint:i,get:()=>SA(e,t,r,n)}},SA=(e,t,r,n=t[0].type)=>{let i=2*!!e.session.pack,o=!te.areEqual(t[0].dims,t[1].dims),a=t[0].dims,s=e.session.pack;if(o){let o=gt.calcShape(t[0].dims,t[1].dims,!1);if(!o)throw Error("Can't perform binary op on the given tensors");let u=(a=o).length,l=0!==t[0].dims.length?t[0].dims.length:1,d=0!==t[1].dims.length?t[1].dims.length:1,p=0!==t[0].dims.length?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",c=0!==t[1].dims.length?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",h=se(e.session.backend.glContext.version),f=s?`
      ${r.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${r.name}(a, b);
        ${h.output} = result;
      }`:`
      ${r.body}
      float process(int indices[${u}]) {
        int aindices[${l}];
        int bindices[${d}];
        ${p}
        ${c}
        return ${r.name}(_A(aindices), _B(bindices));
      }`;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],output:{dims:a,type:n,textureType:i},shaderSource:f,hasMain:s}}let u=se(e.session.backend.glContext.version),l=`
    ${r.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${r.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],output:{dims:t[0].dims,type:n,textureType:i},shaderSource:l,hasMain:!0}},Om=(e,t)=>[e.run(Mt(e,t,pA()),t)],Pm=(e,t)=>[e.run(Mt(e,t,_A(),"bool"),t)],Em=(e,t)=>[e.run(Mt(e,t,fA()),t)],Cm=(e,t)=>[e.run(Mt(e,t,gA(),"bool"),t)],Dm=(e,t)=>[e.run(Mt(e,t,bA(),"bool"),t)],km=(e,t)=>[e.run(Mt(e,t,yA(),"bool"),t)],Nm=(e,t)=>[e.run(Mt(e,t,hA()),t)],Lm=(e,t)=>[e.run(Mt(e,t,wA(),"bool"),t)],Rm=(e,t)=>[e.run(Mt(e,t,xA()),t)],zm=(e,t)=>[e.run(Mt(e,t,TA()),t)],Mm=(e,t)=>[e.run(Mt(e,t,mA()),t)],Bm=(e,t)=>[e.run(Mt(e,t,vA(),"bool"),t)]}),Um=N(()=>{"use strict";Le(),Vm=(e,t,r)=>(AA(t),[e.cast(t[0],r)]),Gm=e=>ft.tensorDataTypeFromProto(e.attributes.getInt("to")),AA=e=>{if(!e||1!==e.length)throw Error("Cast requires 1 input.");if("string"===e[0].type)throw Error("Invalid input type.")}}),Hm=N(()=>{"use strict";Ze(),Ae(),zn(),zr(),OA=(e,t)=>({name:"Concat (packed)",inputNames:Array.from({length:e},(e,t)=>`X${t}`),inputTypes:Array(e).fill(2),cacheHint:t}),PA=(e,t,r,n)=>{let i=r[0].dims.slice();if(n>=i.length||n<-1*i.length)throw Error("axis specified for concat doesn't match input dimensionality");n<0&&(n=i.length+n);let o=i.slice(0);for(let e=1;e<r.length;e++){let t=r[e].dims.slice();for(let e=0;e<i.length;e++)if(e===n)o[n]+=t[e];else if(i[e]!==t[e])throw Error("non concat dimensions must match")}let a=o.length,s=ro("coords",a),u=bt(a),l=Mn(),d=r.map(e=>e.dims),p=Kt(a),c=Array(d.length-1);c[0]=d[0][n];for(let e=1;e<c.length;e++)c[e]=c[e-1]+d[e][n];let h=p[n],f=p.slice(-2),m=p.join(),g=`if (${h} < ${c[0]}) {
        return getChannel(
            getX0(${m}), vec2(${f.join()}));
        }`;for(let e=1;e<c.length;e++){let t=c[e-1];g+=`
            if (${h} < ${c[e]}  && ${h} >= ${c[e-1]}) {
              return getChannel(
                getX${e}(${Wi(p,h,t)}),
                vec2(${Wi(f,h,t)}));
            }`}let b=c.length,y=c[c.length-1];g+=`
            return getChannel(
              getX${b}(${Wi(p,h,y)}),
              vec2(${Wi(f,h,y)}));`;let _=se(e.session.backend.glContext.version),v=`
          ${l}
          float getValue(${p.map(e=>"int "+e)}) {
            ${g}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${p[a-1]};
            coords.${p[a-1]} = coords.${p[a-2]};
            coords.${p[a-2]} = lastDim;

            vec4 result = vec4(getValue(${s}), 0., 0., 0.);

            ${s[a-1]} = ${s[a-1]} + 1;
            if (${s[a-1]} < ${o[a-1]}) {
              result.g = getValue(${s});
            }

            ${s[a-2]} = ${s[a-2]} + 1;
            if (${s[a-2]} < ${o[a-2]}) {
              result.a = getValue(${s});
            }

            ${s[a-1]} = ${s[a-1]} - 1;
            if (${s[a-2]} < ${o[a-2]} &&
                ${s[a-1]} < ${o[a-1]}) {
              result.b = getValue(${s});
            }
            ${_.output} = result;
          }
        `;return{...t,output:{dims:o,type:r[0].type,textureType:2},shaderSource:v,hasMain:!0}},Wm=(e,t,r)=>{let n=OA(t.length,r.cacheKey);return{...n,get:()=>PA(e,n,t,r.axis)}},Wi=(e,t,r)=>{let n=e.indexOf(t);return e.map((e,t)=>t===n?`${e} - ${r}`:e).join()}}),Xm=N(()=>{"use strict";lt(),Ae(),Hm(),qm=(e,t,r)=>(RA(t),e.session.pack&&t[0].dims.length>1?[e.run(Wm(e,t,r),t)]:[e.run(DA(e,t,r),t)]),EA=(e,t)=>({name:"Concat",inputNames:Array.from({length:e},(e,t)=>`X${t}`),inputTypes:Array(e).fill(0),cacheHint:t}),CA=(e,t,r,n)=>{let i=r[0].dims.slice();if(n>=i.length||n<-1*i.length)throw Error("axis specified for concat doesn't match input dimensionality");n<0&&(n=i.length+n);let o=i.slice(0);for(let e=1;e<r.length;e++){let t=r[e].dims.slice();for(let e=0;e<i.length;e++)if(e===n)o[n]+=t[e];else if(i[e]!==t[e])throw Error("non concat dimensions must match")}let a=o.length,s=Array(r.length),u=0;for(let e=0;e<s.length;++e)u+=r[e].dims[n],s[e]=u;let l="";l=r.length<5?jm(s):kA(s);let d=NA(r.length,a),p=LA(s),c=`
        ${d}
        ${p}
        ${l}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${n}]);

          if(textureIndex != 0) {
            indices[${n}] = indices[${n}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...t,output:{dims:o,type:r[0].type,textureType:0},shaderSource:c}},DA=(e,t,r)=>{let n=EA(t.length,r.cacheKey);return{...n,get:()=>CA(e,n,t,r.axis)}},jm=e=>`int getTextureWhereDataResides(int index) {
      ${e.map((e,t)=>`if(index<${e}) {return ${t};}
`).join("")}
    }`,kA=e=>jm(e),NA=(e,t)=>{let r=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${t}]) {`];for(let t=0;t<e;++t)0===t?r.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===e-1?r.push(`	else { return _X${t}(indices); }`):r.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return r.push("	}"),r.join(`
`)},LA=e=>{let t=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let r=0;r<e.length;++r)0===r?t.push(`	if (index == ${r}) { return ${e[r]}; }`):r===e.length-1?t.push(`	else { return ${e[r]}; }`):t.push(`	else if (index == ${r}) { return ${e[r]}; }`);return t.push("	}"),t.join(`
`)},Km=e=>ve({axis:e.attributes.getInt("axis")}),RA=e=>{if(!e||e.length<1)throw Error("too few inputs");let t=e[0].type,r=e[0].dims.length;if("string"===t)throw Error("string tensor is not supported yet");for(let n of e){if(n.type!==t)throw Error("input tensors should be one type");if(n.dims.length!==r)throw Error("input tensors should have the same shape")}}});function zA(){return Bt("abs")}function MA(){return Bt("acos")}function BA(){return Bt("asin")}function FA(){return Bt("atan")}function VA(){return Bt("ceil")}function GA(){return Bt("cos")}function UA(e){return{body:`
  const float alpha = float(${e});

  float elu_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 elu_(vec4 v) {
    return vec4(elu_(v.x), elu_(v.y), elu_(v.z), elu_(v.w));
  }
  `,name:"elu",type:0}}function WA(){return Bt("exp")}function HA(){return Bt("floor")}function $l(e,t){let r="clip";return{body:`
  const float min = float(${e});
  const float max = float(${t});

  float ${r}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${r}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:r,type:0}}function qA(){let e="indentity";return{body:`
  float ${e}_(float a) {
    return a;
  }
  vec4 ${e}_(vec4 v) {
    return v;
  }
  `,name:e,type:0}}function jA(e){let t="leakyRelu";return{body:`
  const float alpha = float(${e});

  float ${t}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function KA(){return Bt("log")}function XA(){return{body:`
  float neg_(float a) {
    return -a;
  }
  vec4 neg_(vec4 v) {
    return -v;
  }
  `,name:"neg",type:0}}function ZA(){return{body:`
  float not_(float a) {
    return float( ! bool(a) );
  }
  bool not_(bool a) {
    return !a;
  }
  vec4 not_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 not_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:"not",type:0}}function JA(){return Bt("sin")}function Al(){let e="relu";return{body:`
  float ${e}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${e}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:e,type:0}}function Ol(){let e="sigmoid";return{body:`
  float ${e}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${e}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:e,type:0}}function QA(){return Bt("sqrt")}function YA(){return Bt("tan")}function eO(){let e="tanh";return{body:`
  float ${e}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${e}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:e,type:0}}function Bt(e){return{body:`
  float ${e}_(float a) {
    return ${e}(a);
  }
  vec4 ${e}_(vec4 v) {
    return ${e}(v);
  }
  `,name:e,type:0}}var tO,nt,Zm,Jm,Qm,Ym,Pl,eg,tg,nO,ng,rg,og,ig,ag,sg,El,ug,lg,cg,dg,pg,fg,hg,mg,gg,bg,yg,Cl=N(()=>{"use strict";lt(),Le(),Qn(),Ze(),Ae(),tO=(e,t,r,n)=>{let i=2*!!e.session.pack,o=se(e.session.backend.glContext.version);return{...t,output:{dims:r.dims,type:r.type,textureType:i},shaderSource:`
     ${n.body}
     void main() {
       vec4 v = ${o.texture2D}(A, TexCoords);
       v = ${n.name}_(v);
       ${o.output} = v;
     }
     `,hasMain:!0}},nt=(e,t,r,n)=>{let i=2*!!e.session.pack,o={name:r.name,inputTypes:[i],inputNames:["A"],cacheHint:n};return{...o,get:()=>tO(e,o,t,r)}},Zm=(e,t)=>[e.run(nt(e,t[0],zA()),t)],Jm=(e,t)=>[e.run(nt(e,t[0],MA()),t)],Qm=(e,t)=>[e.run(nt(e,t[0],BA()),t)],Ym=(e,t)=>[e.run(nt(e,t[0],FA()),t)],Pl=(e,t,r)=>[e.run(nt(e,t[0],$l(r.min,r.max),r.cacheKey),t)],eg=e=>ve({min:e.attributes.getFloat("min",Nr),max:e.attributes.getFloat("max",Lr)}),tg=(e,t)=>{let r=nO(e,t);return Pl(e,[t[0]],r)},nO=(e,t)=>{if(t.length>=3&&(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)))throw Error("dynamic clip attributes are not allowed");let r=t.length>=3?t[1].numberData[0]:Nr,n=t.length>=3?t[2].numberData[0]:Lr;return ve({min:r,max:n})},ng=(e,t)=>[e.run(nt(e,t[0],VA()),t)],rg=(e,t)=>[e.run(nt(e,t[0],GA()),t)],og=(e,t,r)=>[e.run(nt(e,t[0],UA(r.alpha),r.cacheKey),t)],ig=e=>ve({alpha:e.attributes.getFloat("alpha",1)}),ag=(e,t)=>[e.run(nt(e,t[0],WA()),t)],sg=(e,t)=>[e.run(nt(e,t[0],HA()),t)],El=(e,t)=>[e.run(nt(e,t[0],qA()),t)],ug=(e,t,r)=>[e.run(nt(e,t[0],jA(r.alpha),r.cacheKey),t)],lg=e=>ve({alpha:e.attributes.getFloat("alpha",.01)}),cg=(e,t)=>[e.run(nt(e,t[0],KA()),t)],dg=(e,t)=>[e.run(nt(e,t[0],XA()),t)],pg=(e,t)=>[e.run(nt(e,t[0],ZA()),t)],fg=(e,t)=>[e.run(nt(e,t[0],Al()),t)],hg=(e,t)=>[e.run(nt(e,t[0],Ol()),t)],mg=(e,t)=>[e.run(nt(e,t[0],JA()),t)],gg=(e,t)=>[e.run(nt(e,t[0],QA()),t)],bg=(e,t)=>[e.run(nt(e,t[0],YA()),t)],yg=(e,t)=>[e.run(nt(e,t[0],eO()),t)]});function Bn(e){let t;switch(e.activation){case"Relu":t=Al();break;case"Sigmoid":t=Ol();break;case"Clip":t=$l(e.clipMin,e.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let r=t.name;return{activationFunction:t.body,applyActivation:`value = ${r}_(value);`}}var oo,oO,iO,_g,aO,sO,vg,Mr=N(()=>{"use strict";Le(),Cl(),oo=e=>{let t=e.getString("activation","");if("Clip"===t){let[r,n]=e.getFloats("activation_params",[Nr,Lr]);return{activation:t,clipMax:n,clipMin:r,activationCacheKey:`${t}:${r},${n}`}}return{activation:t,activationCacheKey:t}}}),wg=N(()=>{"use strict";Ct(),Ze(),Ae(),Hi(),Mr(),oO=(e,t)=>({name:"GroupedConv",inputNames:e?["X","W","Bias"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),iO=(e,t,r,n)=>{let i=t.length>2?"value += getBias(output_channel);":"",o=t[0].dims.slice(),a=t[1].dims.slice(),s=a[0]/n.group;ze.verbose("GroupedConv",`autpPad:${n.autoPad}, dilations:${n.dilations}, group:${n.group}, kernelShape:${n.kernelShape}, pads:${n.pads}, strides:${n.strides}`);let u=io(o,a,n.dilations,n.pads,n.strides),l=se(e.session.backend.glContext.version),{activationFunction:d,applyActivation:p}=Bn(n),c=`
  const ivec2 strides = ivec2(${n.strides[0]}, ${n.strides[1]});
  const ivec2 pads = ivec2(${n.pads[0]}, ${n.pads[1]});
  ${d}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${s};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${a[1]}; wInChannel++) {
      int input_channel = group_id * ${a[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${a[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${n.dilations[0]};

        if (xHeight < 0 || xHeight >= ${o[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${a[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${n.dilations[1]};
          if (xWidth < 0 || xWidth >= ${o[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${i}
    ${p}
    ${l.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:u,type:t[0].type,textureType:0},shaderSource:c,hasMain:!0}},_g=(e,t,r)=>{let n=oO(t.length>2,r.cacheKey);return{...n,get:()=>iO(e,t,n,r)}}}),xg=N(()=>{"use strict";Ze(),Ae(),zr(),aO=e=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:e}),sO=(e,t,r,n,i,o)=>{let a=r.dims,s=n.dims,u=i.length,l=[s[1]*s[2]*s[3],i[2]*i[3]],d=s[2]*s[3],p=Mn(),c=se(e.session.backend.glContext.version),h="";for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)h+=`
            blockIndex = rc.x + ${t};
            pos = rc.y + ${e};

            if(blockIndex < ${l[1]} && pos < ${l[0]}) {
              offsetY = int(blockIndex / (${i[u-1]})) * ${o.strides[0]} -
                ${o.pads[0]};
              d0 = offsetY + ${o.dilations[0]} * (imod(pos, ${d}) / ${s[2]});

              if(d0 < ${a[2]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${i[u-1]}) * ${o.strides[1]} -
                  ${o.pads[1]};
                d1 = offsetX + ${o.dilations[1]} * imod(imod(pos, ${d}), ${s[2]});

                if(d1 < ${a[3]} && d1 >= 0) {

                  ch = int(float(pos)/ ${d}.);
                    innerDims = vec2(d0, d1);
                    result[${2*e+t}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let f=`
      ${p}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${h}
          ${c.output} = result;
      }
            `;return{...t,output:{dims:l,type:r.type,textureType:2},shaderSource:f,hasMain:!0}},vg=(e,t,r,n,i)=>{let o=aO(i.cacheKey);return{...o,get:()=>sO(e,o,t,r,n,i)}}});function lO(e,t,r){let n=t[0].dims,i=t[1].dims,o=gt.calcShape(n,i,!0);if(!o)throw Error("Can't use matmul on the given tensors");let a=bt(o.length),s=Kt(),{activationFunction:u,applyActivation:l}=Bn(r),d=t.length>2,p=d?`${kl(a,s,t[2].dims,o,!1)}`:"",c=o.length,h=n.length,f=i.length,m=n[n.length-1],g=`
    ${u}
    ${p}
    float process(int indices[${c}]) {
        int a[${h}];
        int b[${f}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${m}; ++k) {
            a[${h-1}] = k;
            b[${f-2}] = k;
            value += _A(a) * _B(b);
        }
        ${d?"value += getBiasForMatmul();":""}
        ${l}
        return value;
    }`;return{...e,output:{dims:o,type:t[0].type,textureType:0},shaderSource:g}}function Dl(e,t){let r=uO(e.length>2,t.activationCacheKey);return{...r,get:()=>lO(r,e,t)}}function kl(e,t,r,n,i){let o="",a=r.length,s=n.length,u=s-a;o=s<2&&a>0?"coords":r.map((e,r)=>`coords.${t[r+u]}`).join(", ");let l=gt.getBroadcastDims(r,n).map(e=>`coords.${t[e+u]} = 0;`).join(`
`),d=1===te.size(r),p="vec4(outputValue.xx, outputValue.yy)";return d&&(p="vec4(outputValue.x)"),i?`
vec4 getBiasForMatmul() {
  ${e} coords = getOutputCoords();
  ${l}
  vec4 outputValue = getBias(${o});
  return ${p};
}`:`
float getBiasForMatmul() {
  ${e} coords = getOutputCoords();
  ${l}
  return getBias(coords.x);
}`}var Tg,Ig,uO,cO,qi=N(()=>{"use strict";Le(),Ae(),zn(),Mr(),Nl(),Tg=(e,t,r)=>(cO(t),e.session.pack?[e.run(ji(e,t,r),t)]:[e.run(Dl(t,r),t)]),Ig=e=>oo(e.attributes),uO=(e,t)=>({name:"MatMul",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),cO=e=>{if(!e||2!==e.length)throw Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw Error("shared dimension does not match.");if("float32"!==e[0].type&&"float64"!==e[0].type||"float32"!==e[1].type&&"float64"!==e[1].type)throw Error("inputs should be float type");if(e[0].type!==e[1].type)throw Error("inputs types should match")}});function fO(e,t,r,n){let i=[],o=[],a=r[0].dims,s=r[1].dims,u=a.length,l=s.length,d=n.length,p=d-u,c=d-l;(i=a.map((e,r)=>`coords.${t[r+p]}`))[u-1]="i*2",i.join(", "),(o=s.map((e,r)=>`coords.${t[r+c]}`))[l-2]="i*2",o.join(", ");let h=gt.getBroadcastDims(a,n),f=gt.getBroadcastDims(s,n),m=h.map(e=>`coords.${t[e+p]} = 0;`).join(`
`),g=f.map(e=>`coords.${t[e+c]} = 0;`).join(`
`),b=`int lastDim = coords.${t[d-1]};
  coords.${t[d-1]} = coords.${t[d-2]};
  coords.${t[d-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${e} coords = getOutputCoords();
  ${b}
  ${m}
  vec4 outputValue = getA(${i});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${e} coords = getOutputCoords();
  ${b}
  ${g}
  vec4 outputValue = getB(${o});
  return outputValue;
}`}function hO(e,t){let r="";for(let n=0;n<t-2;n++)r+=`rc.${e[n]}, `;return r+`rc.${e[t-2]}, i*2`}function mO(e,t){let r="";for(let n=0;n<t-2;n++)r+=`rc.${e[n]}, `;return r+`i*2, rc.${e[t-1]}`}var dO,pO,ji,Sg,gO,bO,Ag,Ll,yO,_O,Og,io,zl,wO,vO,xO,TO,Ml,IO,SO,$O,AO,Eg,OO,PO,EO,CO,DO,kO,Cg,NO,kg,Br,Ng,LO,Lg,RO,zO,MO,Rg,zg,BO,Bg,Fg,FO,mr,Gg,Ug,VO,GO,UO,WO,Bl,Hg,qg,jg,HO,qO,jO,Xg,Zg,KO,XO,ZO,JO,QO,Yg,eb,Qg,YO,eP,tP,nP,rP,oP,Nl=N(()=>{"use strict";Le(),Ze(),Ae(),zn(),Mr(),qi(),dO=(e,t)=>({name:"MatMul (packed)",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[2,2,2]:[2,2],cacheHint:t}),pO=(e,t,r,n)=>{let i=r.length>2,o=r[0].dims,a=r[1].dims,s=gt.calcShape(o,a,!0),u=!te.areEqual(r[0].dims,r[1].dims);if(!s)throw Error("Can't use matmul on the given tensors");let l=Math.ceil(o[o.length-1]/2),d=o.length,p=a.length,c=se(e.session.backend.glContext.version),h=bt(s.length),f=s.length,m=Kt(),{activationFunction:g,applyActivation:b}=Bn(n),y=i?`${kl(h,m,r[2].dims,s,!0)}`:"",_=u?`${fO(h,m,r,s)}`:"",v=u?"getAAtOutCoordsMatmul(i)":`getA(${hO(m,d)})`,x=u?"getBAtOutCoordsMatmul(i)":`getB(${mO(m,p)})`,w=u?"":`${h} rc =
          getOutputCoords(); int lastDim = rc.${m[f-1]}; rc.${m[f-1]} =
          rc.${m[f-2]}; rc.${m[f-2]} = lastDim;
      `,$=`
            ${_}
            ${y}
            ${g}
            void main() {
              ${w}

              vec4 value = vec4(0);
              for (int i = 0; i < ${l}; i++) {
                vec4 a = ${v};
                vec4 b = ${x};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i?"value += getBiasForMatmul();":""}
              ${b}
              ${c.output} = value;
            }`;return{...t,output:{dims:s,type:r[0].type,textureType:2},shaderSource:$,hasMain:!0}},ji=(e,t,r)=>{let n=dO(t.length>2,r.activationCacheKey);return{...n,get:()=>pO(e,n,t,r)}}}),$g=N(()=>{"use strict";Hi(),xg(),Nl(),Sg=(e,t,r)=>{let n=t[0].dims,i=t[1].dims,o=io(n,i,r.dilations,r.pads,r.strides),a=e.run(vg(e,t[0],t[1],o,r),[t[0]]),s=e.reshapePacked(t[1],[i[0],i[1]*i[2]*i[3]]),u=3===t.length?[s,a,t[2]]:[s,a],l=e.run(ji(e,u,r),u);return e.reshapePacked(l,o)}}),Rl=N(()=>{"use strict";Ae(),gO=e=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:e}),bO=(e,t,r,n,i,o)=>{let a=r.dims,s=n.dims,u=i.length,l=Ll(a,s,i,4),d=`
        const int XC = ${a[1]};
        const int XH = ${a[2]};
        const int XW = ${a[3]};
        const int KH = ${o.kernelShape[0]};
        const int KW = ${o.kernelShape[1]};
        const int dilationH = ${o.dilations[0]};
        const int dilationW = ${o.dilations[1]};
        const int strideH = ${o.strides[0]};
        const int strideW = ${o.strides[1]};
        const int padH = ${o.pads[0]};
        const int padW = ${o.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${u}]) {
          int b  = indices[0]; // batch size
          int oh = indices[1] * strideH - padH; //output height
          int ow = indices[2] * strideW - padW; //output width
          int p = indices[3] * outputChannels; //patch
          vec4 value = vec4(0.0);
          for(int i=0; i < outputChannels; ++i) {
            if(p < XCKHKW) {
              int patchC = p / KHKW;
              int patchH = (p - patchC*KHKW) / KW;
              int patchW = (p - patchC*KHKW) - patchH * KW;
              int xh2 = oh + patchH * dilationH;
              int xw2 = ow + patchW * dilationW;
              int x[${a.length}];
              x[0] = b;
              x[1] = patchC;
              x[2] = xh2;
              x[3] = xw2;
              if(xh2 >= 0 &&
                  xh2 < XH &&
                  xw2 >= 0 &&
                  xw2 < XW) {
                value[i] = _X(x);
              }
            }
            ++p;
          }
          return value;
        }
        `;return{...t,output:{dims:l,type:r.type,textureType:4},shaderSource:d}},Ag=(e,t,r,n,i)=>{let o=gO(i.cacheKey);return{...o,get:()=>bO(e,o,t,r,n,i)}},Ll=(e,t,r,n=4)=>[r[0],r[2],r[3],Math.ceil(e[1]*t[2]*t[3]/n)]}),Pg=N(()=>{"use strict";Le(),Ze(),Ae(),Mr(),Rl(),yO=(e,t)=>({name:"ConvDotProduct",inputNames:e?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:e?[0,4,0]:[0,4],cacheKey:t.activationCacheKey}),_O=(e,t,r,n,i)=>{let o=r[0].dims,a=r[1].dims,s=[a[0],Math.ceil(o[1]*a[2]*a[3]/4)],u=Ll(o,a,n),[l,d]=e.calculateTextureWidthAndHeight(s,4),p=te.computeStrides(u),[c,h]=e.calculateTextureWidthAndHeight(u,4),f=n.length,m=r.length<3?"0.0":"_B(b)",g=Math.ceil(o[1]*a[2]*a[3]/4),{activationFunction:b,applyActivation:y}=Bn(i),_=se(e.session.backend.glContext.version),v=`
${b}
float process(int indices[${f}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${p[0]} + im2col[1] * ${p[1]} + im2col[2] * ${p[2]};
  int kernelOffset = indices[1] * ${s[1]};
  float value = ${m};
  for (int i = 0; i < ${g}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${c}, ${h});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${d});
    value += dot(${_.texture2D}(Im2Col, im2colCoords), ${_.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${y}
  return value;
}`;return{...t,output:{dims:n,type:r[0].type,textureType:0},shaderSource:v}},Og=(e,t,r,n)=>{let i=yO(t.length>2,n);return{...i,get:()=>_O(e,i,t,r,n)}}}),Hi=N(()=>{"use strict";lt(),Le(),wg(),$g(),Pg(),Mr(),Rl(),qi(),io=(e,t,r,n,i)=>{let o=e[0],a=e.slice(2),s=a.length,u=t[0],l=t.slice(2).map((e,t)=>e+(e-1)*(r[t]-1));return[o,u].concat(...a.map((e,t)=>e+n[t]+n[t+s]).map((e,t)=>Math.floor((e-l[t]+i[t])/i[t])))},zl=(e,t,r)=>(IO(t,r),wO(e,t,r)),wO=(e,t,r)=>{let n=TO(r,t),i=e.session.pack,o=1===n.kernelShape[0]&&1===n.kernelShape[1];return n.group>1?[e.run(_g(e,t,n),t)]:o&&i?[vO(e,t,n)]:i&&4===t[0].dims.length&&1===t[0].dims[0]&&!o?[Sg(e,t,n)]:[xO(e,t,n)]},vO=(e,t,r)=>{let n=t[0].dims,i=t[1].dims,o=io(n,i,r.dilations,r.pads,r.strides),a=e.reshapeUnpacked(t[0],[n[1],n[2]*n[3]]),s=e.reshapeUnpacked(t[1],[i[0],i[1]]),u=t.length>2?[s,a,t[2]]:[s,a],l=e.run(Dl(u,r),u);return e.reshapeUnpacked(l,o)},xO=(e,t,r)=>{let n=t[0].dims,i=t[1].dims,o=io(n,i,r.dilations,r.pads,r.strides),a=e.run(Ag(e,t[0],t[1],o,r),[t[0]]),s=3===t.length?[a,t[1],t[2]]:[a,t[1]];return e.run(Og(e,t,o,r),s)},TO=(e,t)=>{let r=e.kernelShape.slice();if(0===e.kernelShape.length)for(let e=2;e<t[1].dims.length;++e)r.push(t[1].dims[e]);let n=e.pads.slice();kr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:r,pads:n,cacheKey:e.cacheKey}),i},Ml=e=>{let t=e.attributes,r=oo(t),n=t.getString("auto_pad","NOTSET"),i=t.getInts("dilations",[1,1]),o=t.getInt("group",1),a=t.getInts("kernel_shape",[]),s=t.getInts("pads",[0,0,0,0]),u=t.getInts("strides",[1,1]);return ve({autoPad:n,dilations:i,group:o,kernelShape:a,pads:s,strides:u,...r})},IO=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length||4!==e[1].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims[1]!==e[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let r=e[0].dims.length-2;if(t.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(t.strides.length!==r)throw Error(`strides should be ${r}D`);if(t.pads.length!==2*r)throw Error(`pads should be ${2*r}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if("float32"!==e[0].type||"float32"!==e[1].type)throw Error("Conv input(X,W) should be float tensor");if(3===e.length&&"float32"!==e[2].type)throw Error("Conv input(bias) should be float tensor")}}),Dg=N(()=>{"use strict";lt(),Ze(),Ae(),Mr(),SO=(e,t,r,n,i,o)=>(e-1)*t+r+(n-1)*i+1-o,$O=(e,t,r,n,i)=>{let o=Math.floor(e/2);"SAME_UPPER"===t?(r[n]=o,r[i]=e-o):"SAME_LOWER"===t&&(r[n]=e-o,r[i]=o)},AO=(e,t,r,n,i,o,a,s)=>{let u=e.length-2,l=0===s.length;for(let d=0;d<u;++d){let p=l?e[d+2]*o[d]:s[d];$O(SO(e[d+2],o[d],i[d],t[d],r[d],p),n,i,d,d+u),l&&s.push(o[d]*(e[d+2]-1)+a[d]+(t[d]-1)*r[d]+1-i[d]-i[d+u])}},Eg=(e,t,r)=>(NO(t,r),OO(e,t,r)),OO=(e,t,r)=>{let n=kO(r,t);return[DO(e,t,n)]},PO=(e,t)=>({name:"ConvTranspose",inputNames:e?["X","W","B"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),EO=(e,t,r,n)=>{let i=t.length>2?"getB(output_channel)":"0.0",o=t[0].dims,a=t[1].dims,s=a[1],u=a[0]/n.group,l=[t[0].dims[0],t[1].dims[1]*n.group,...n.outputShape],d=se(e.session.backend.glContext.version),{activationFunction:p,applyActivation:c}=Bn(n),h=`
  const ivec2 strides = ivec2(${n.strides[0]}, ${n.strides[1]});
  const ivec2 pads = ivec2(${n.pads[0]}, ${n.pads[1]});
  ${p}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${s};
    int wOutChannel = output_channel - group_id * ${s};

    float value = ${i};
    for (int inChannelOffset = 0; inChannelOffset < ${u}; inChannelOffset++) {
      int input_channel = group_id * ${u} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${a[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${a[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${n.dilations[0]}, wHOff * ${n.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${o[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${o[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${c}
    ${d.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:l,type:t[0].type,textureType:0},shaderSource:h,hasMain:!0}},CO=(e,t,r)=>{let n=PO(t.length>2,r.cacheKey);return{...n,get:()=>EO(e,t,n,r)}},DO=(e,t,r)=>e.run(CO(e,t,r),t),kO=(e,t)=>{let r=e.kernelShape.slice();if(0===e.kernelShape.length)for(let e=2;e<t[1].dims.length;++e)r.push(t[1].dims[e]);let n=e.pads.slice(),i=e.outputShape.slice();AO(t[0].dims,r,e.dilations,e.autoPad,n,e.strides,e.outputPadding,i);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n,outputShape:i,cacheKey:e.cacheKey}),o},Cg=e=>{let t=e.attributes,r=oo(t),n=t.getString("auto_pad","NOTSET"),i=t.getInts("dilations",[1,1]),o=t.getInt("group",1),a=t.getInts("kernel_shape",[]),s=t.getInts("output_padding",[0,0]),u=t.getInts("output_shape",[]),l=t.getInts("pads",[0,0,0,0]),d=t.getInts("strides",[1,1]);return ve({autoPad:n,dilations:i,group:o,kernelShape:a,outputPadding:s,outputShape:u,pads:l,strides:d,...r})},NO=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length||4!==e[1].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims[1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let r=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==r))throw Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.length!==2*n)throw Error(`pads should be ${2*n}D`);if(t.outputPadding.length!==n)throw Error(`output_padding should be ${n}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape");if("float32"!==e[0].type||"float32"!==e[1].type)throw Error("ConvTranspose input(X,W) should be float tensor");if(3===e.length&&"float32"!==e[2].type)throw Error("ConvTranspose input(bias) should be float tensor")}}),Ki=N(()=>{"use strict";lt(),Le(),Ae(),kg={name:"Transpose",inputNames:["A"],inputTypes:[0]},Br=(e,t,r)=>(MO(t),[e.run({...kg,cacheHint:r.cacheKey,get:()=>LO(e,t[0],r.perm)},t)]),Ng=e=>ve({perm:e.attributes.getInts("perm",[])}),LO=(e,t,r)=>{let n=t.dims;r=Lg(n,r);let i=RO(n,r),o=n.length,a=`
      ${zO("perm",r,o)}
      float process(int indices[${o}]) {
        int a[${o}];
        perm(a, indices);
        return _A(a);
      }`;return{...kg,output:{dims:i,type:t.type,textureType:0},shaderSource:a}},Lg=(e,t)=>(t&&t.length!==e.length&&(t=[...e.keys()].reverse()),t),RO=(e,t)=>(t=Lg(e,t),te.sortBasedOnPerm(e,t)),zO=(e,t,r)=>{let n=[];n.push(`void ${e}(out int a[${r}], int src[${r}]) {`);for(let e=0;e<r;++e)n.push(`	a[${t[e]}]=src[${e}];`);return n.push("	}"),n.join(`
`)},MO=e=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("input should be float tensor")}}),Mg=N(()=>{"use strict";Ki(),Rg=(e,t,r)=>{BO(t);let n=r.blocksize,i=n*n,o="DCR"===r.mode?[0,3,4,1,5,2]:[0,1,4,2,5,3],a="DCR"===r.mode?[t[0].dims[0],n,n,t[0].dims[1]/i,t[0].dims[2],t[0].dims[3]]:[t[0].dims[0],t[0].dims[1]/i,n,n,t[0].dims[2],t[0].dims[3]],s=e.reshapeUnpacked(t[0],a),u={perm:o,cacheKey:`${o}`},[l]=Br(e,[s],u),d=[t[0].dims[0],t[0].dims[1]/i,t[0].dims[2]*n,t[0].dims[3]*n];return[e.reshapeUnpacked(l,d)]},zg=e=>{let t=e.attributes.getInt("blocksize");if(t<1)throw Error(`blocksize must be >= 1, but got : ${t} for DepthToSpace`);let r=e.attributes.getString("mode","DCR");if("DCR"!==r&&"CRD"!==r)throw Error(`unrecognized mode: ${r} for DepthToSpace`);return{mode:r,blocksize:t}},BO=e=>{if(1!==e.length)throw Error(`DepthToSpace expect 1 inputs, but got ${e.length}`);if("string"===e[0].type||4!==e[0].dims.length)throw TypeError("DepthToSpace input should be a 4-D numeric tensor")}}),Vg=N(()=>{"use strict";Le(),Bg=(e,t,r)=>{FO(t,r);let n=te.flattenShape(t[0].dims,r);return[e.reshapeUnpacked(t[0],n)]},Fg=e=>e.attributes.getInt("axis",1),FO=(e,t)=>{if(!e||1!==e.length)throw Error("Flatten requires 1 input.");let r=e[0].dims.length;if(0===r)throw Error("scalar tensor is not supported.");if(t<-r||t>r)throw Error("Invalid axis");if("string"===e[0].type)throw Error("string tensor is not supported.")}}),Lo=N(()=>{"use strict";mr=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]}),Wg=N(()=>{"use strict";lt(),Lo(),Le(),Ae(),Gg=(e,t,r)=>(WO(t,r.axis),[e.run(UO(e,t,r),t)]),Ug=e=>ve({axis:e.attributes.getInt("axis",0)}),VO={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},GO=(e,t,r,n)=>{let i=r[0].dims.slice(),o=r[1].dims.slice(),a=Array(i.length+o.length-1);n=te.normalizeAxis(n,i.length);let s=[];for(let e=0;e<a.length;e++)e<n?(a[e]=i[e],s.push(`inputIdx[${e}] = outputIdx[${e}];`)):e<n+o.length?(a[e]=o[e-n],s.push(`indexDataIdx[${e-n}] = outputIdx[${e}];`)):(a[e]=i[e-o.length+1],s.push(`inputIdx[${e-o.length+1}] = outputIdx[${e}];`));let u=a.length||1,l=i.length,d=o.length||1,p=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${d}];
        indexDataIdx[0] = 0;
        ${s.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${n}] = idx < 0 ? idx + ${i[n]} : idx;
        return _A(inputIdx);
      }`;return{...t,output:{dims:a,type:r[0].type,textureType:0},shaderSource:p}},UO=(e,t,r)=>{let n={...VO,cacheHint:r.cacheKey};return{...n,get:()=>GO(e,n,t,r.axis)}},WO=(e,t)=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.");let r=e[0].dims.length;if(r<1)throw Error("Invalid input shape.");if(t<-r||t>r-1)throw Error("Invalid axis.");if(-1===mr.indexOf(e[0].type)||"int32"!==e[1].type&&"int16"!==e[1].type)throw Error("Invaid input type.")}}),Kg=N(()=>{"use strict";lt(),Le(),Ae(),Bl=(e,t,r)=>(jO(t,r),[e.run(HO(t,r),t)]),Hg=(e,t)=>{let r=0!==e.attributes.getInt("transA",0),n=0!==e.attributes.getInt("transB",0),i=e.attributes.getFloat("alpha",1),o=e.attributes.getFloat("beta",1);return ve({transA:r,transB:n,alpha:i,beta:o,isOptionalC:t})},qg=e=>Hg(e,!1),jg=e=>Hg(e,!0),HO=(e,t)=>{let r={name:"Gemm",inputNames:3===e.length?["A","B","C"]:["A","B"],inputTypes:3===e.length?[0,0,0]:[0,0],key:t.cacheKey};return{...r,get:()=>qO(r,e,t)}},qO=(e,t,r)=>{let n=t[0].dims.slice(),i=t[1].dims.slice(),[o,a]=zi.getShapeOfGemmResult(n,r.transA,i,r.transB,3===t.length?t[2].dims:void 0),s=[o,a];if(!s)throw Error("Can't use gemm on the given tensors");let u=n[n.length-1],l="";r.transA&&(u=n[0]),r.transA&&r.transB?l="value += _A_T(a) * _B_T(b);":r.transA&&!r.transB?l="value += _A_T(a) * _B(b);":!r.transA&&r.transB?l="value += _A(a) * _B_T(b);":r.transA||r.transB||(l="value += _A(a) * _B(b);");let d=s.length,p=3===t.length?`int c[${t[2].dims.length}];`:"",c=3===t.length?"bcastIndices_C(indices, c);":"",h=3===t.length?"value += beta * _C(c);":"",f=`
      float process(int indices[${d}]) {
          int a[${d}];
          int b[${d}];
          ${p}

          copyVec(indices, a);
          copyVec(indices, b);
          ${c}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${d-1}] = k;
              b[${d-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${h}
          return value;
      }`;return{...e,output:{dims:s,type:t[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:r.alpha},{name:"beta",type:"float",data:r.beta}],shaderSource:f}},jO=(e,t)=>{if(!e)throw Error("Input is missing");if(t.isOptionalC&&(e.length<2||e.length>3))throw Error("Invaid input shape.");if(!t.isOptionalC&&3!==e.length)throw Error("Gemm requires 3 inputs");if(3===e.length&&1!==e[2].dims.length&&2!==e[2].dims.length)throw Error("Invalid input shape of C");if("float32"!==e[0].type&&"float64"!==e[0].type||"float32"!==e[1].type&&"float64"!==e[1].type||3===e.length&&"float32"!==e[2].type&&"float64"!==e[2].type)throw Error("Invalid input type.");if(e[0].type!==e[1].type||3===e.length&&e[0].type!==e[2].type)throw Error("Input types are mismatched")}}),Jg=N(()=>{"use strict";lt(),Ae(),Xg=(e,t,r)=>(QO(t),[e.run(ZO(e,t,r),t)]),Zg=e=>{let t=e.attributes.getFloat("scale"),r=e.attributes.getFloats("bias");return ve({scale:t,bias:r})},KO={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},XO=(e,t,r,n)=>{let i=r[0].dims.slice(),o=i.length,a=`
      ${JO(n.bias.length)}
      float process(int indices[${o}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...t,output:{dims:i,type:r[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:n.bias.length,data:n.bias},{name:"scale",type:"float",data:n.scale}],shaderSource:a}},ZO=(e,t,r)=>{let n={...KO,cacheHint:r.cacheKey};return{...n,get:()=>XO(e,n,t,r)}},JO=e=>{let t=[`float getBias(float bias[${e}], int channel) {`];for(let r=0;r<e;++r)0===r?t.push(`	if (channel == ${r}) { return bias[${r}]; }`):r===e-1?t.push(`	else { return bias[${r}]; }`):t.push(`	else if (channel == ${r}) { return bias[${r}]; }`);return t.push("	}"),t.join(`
`)},QO=e=>{if(!e||1!==e.length)throw Error("ImageScaler requires 1 input.");if(4!==e[0].dims.length)throw Error("Invalid input shape.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")}}),tb=N(()=>{"use strict";Ze(),Ae(),Yg=(e,t,r)=>{oP(t);let n=e.run(eP(t[0]),t);return[e.run(rP(e,t[0],r,n.dims),[t[0],n,t[1],t[2]])]},eb=e=>e.attributes.getFloat("epsilon",1e-5),Qg={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},YO=(e,t)=>{let r=t.dims.slice(),n=r[1],i=r[2]*r[3],o=[r[0],n],a=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${r[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${r[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${i});
        temp = 0.0;
        for(int a2=0; a2<${r[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${r[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${i});

        return v;
      }`;return{...e,output:{dims:o,type:t.type,textureType:4},shaderSource:a}},eP=e=>({...Qg,get:()=>YO(Qg,e)}),tP={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},nP=(e,t,r,n,i)=>{let o=se(e.session.backend.glContext.version),[a,s]=e.calculateTextureWidthAndHeight(i,4),[u,l]=[a/4,s],d=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${u}, ${l});
        return ${o.texture2D}(MeanAndVariance, coords);
      }

      float process(int[4] indices) {
        int mv[2];
        mv[0] = indices[0];
        mv[1] = indices[1];
        vec4 mean_and_variance = get_MeanAndVariance(mv);
        float mean = mean_and_variance.r;
        float variance = mean_and_variance.g;

        int sb[1];
        sb[0] = indices[1];
        float scale = _Scale(sb);
        float b = _B(sb);

        return scale * (_X(indices) - mean) / sqrt(variance + epsilon) + b;
      }`;return{...t,output:{dims:r.dims,type:r.type,textureType:0},variables:[{name:"epsilon",type:"float",data:n}],shaderSource:d}},rP=(e,t,r,n)=>{let i={...tP,cacheHint:`${r}`};return{...i,get:()=>nP(e,i,t,r,n)}},oP=e=>{if(!e||3!==e.length)throw Error("InstanceNormalization requires 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dims.length<3||1!==r.dims.length||1!==n.dims.length)throw Error("Invalid input shape.");if(r.dims[0]!==t.dims[1]||n.dims[0]!==t.dims[1])throw Error("Input shapes are mismatched.");if("float32"!==t.type&&"float64"!==t.type||"float32"!==r.type&&"float64"!==r.type||"float32"!==n.type&&"float64"!==n.type)throw Error("Invalid input type.");if(4!==e[0].dims.length)throw Error("Only support 4-D input shape.")}});function iP(e,t){let r=e[0].dims[1],n=e[0].dims.length,i=-Math.floor((t.size-1)/2),o=Math.ceil((t.size-1)/2),a=`float(${t.alpha}) / float(${t.size})`,s=`float(${t.bias})`,u=`float(${t.beta})`,l=`
    float process(int indices[${n}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${i}; i <= ${o}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${r}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${s} + ${a} * square_sum, ${u});
    }`;return{...ob,cacheHint:t.cacheKey,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:l}}function aP(e,t){return{...ob,cacheHint:t.cacheKey,get:()=>iP(e,t)}}var nb,rb,ob,sP,uP,Fl,ab,sb,ub,lP,cP,dP,pP,fP,hP,mP,gP,db,pb,fb,hb,mb,gb,bb,yb,_b,bP,cb,wb,Zi,vb,Xi,yP,Fr,gr,_P,wP,Tb,Ib,Sb,$b,Ab,Ob,Pb,Cb,kb,Vl,Nb,Lb,Ro,vP,Gl,Ji,Wl,Hl,Rb,zb,xP,TP,IP,SP,Bb,$P,ql,Vb,Gb,Ub,AP,Wb,OP,PP,qb,jb,Kb,Xb,Zb,Jb,Qb,Yb,EP,CP,DP,ey,ny,ry,oy,kP,NP,LP,jl,ay,sy,RP,zP,ly,MP,BP,dy,FP,VP,Kl,fy,hy,GP,UP,gy,ib=N(()=>{"use strict";lt(),Ae(),nb=(e,t,r)=>(sP(t),[e.run(aP(t,r),t)]),rb=e=>{let t=e.attributes.getFloat("alpha",1e-4),r=e.attributes.getFloat("beta",.75),n=e.attributes.getFloat("bias",1),i=e.attributes.getInt("size");return ve({alpha:t,beta:r,bias:n,size:i})},ob={name:"LRN",inputNames:["X"],inputTypes:[0]},sP=e=>{if(!e||1!==e.length)throw Error("LRN requires 1 input.");if(4!==e[0].dims.length)throw Error('currently only support LRN for input with "NCHW" format');if("float32"!==e[0].type)throw Error("input should be float type")}}),lb=N(()=>{"use strict";lt(),Le(),Ze(),Ae(),uP={name:"Pad",inputNames:["A"],inputTypes:[0]},Fl=(e,t,r)=>(dP(t),[e.run({...uP,cacheHint:r.cacheKey,get:()=>cP(e,t[0],r)},t)]),ab=e=>{let t=e.attributes.getString("mode","constant"),r=e.attributes.getFloat("value",0),n=e.attributes.getInts("pads");return ve({mode:t,value:r,pads:n})},sb=(e,t,r)=>{pP(t);let n=lP(e,t,r);return Fl(e,[t[0]],n)},ub=e=>e.attributes.getString("mode","constant"),lP=(e,t,r)=>{if(!e.session.isInitializer(t[1].dataId)||t.length>=3&&!e.session.isInitializer(t[2].dataId))throw Error("dynamic pad attributes are not allowed");let n=Array.from(t[1].integerData),i=t.length>=3?t[2].floatData[0]:0;return ve({mode:r,pads:n,value:i})},cP=(e,t,r)=>{let n=te.padShape(t.dims.slice(),r.pads),i=n.length,o=`
      ${fP(e,t,r)}
      float process(int[${i}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:n,type:t.type,textureType:0},shaderSource:o}},dP=e=>{if(!e||1!==e.length)throw Error("Pad requires 1 input");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")},pP=e=>{if(!e||2!==e.length&&3!==e.length)throw Error("Pad requires 2 or 3 inputs");if("int32"!==e[1].type||e.length>=3&&"string"===e[2].type)throw Error("Invalid input type.")},fP=(e,t,r)=>{let n=se(e.session.backend.glContext.version),[i,o]=e.calculateTextureWidthAndHeight(t.dims,0),a=te.computeStrides(t.dims);switch(r.mode){case"constant":return hP(n,t.dims,a,i,o,r.pads,r.value);case"reflect":return mP(n,t.dims,a,i,o,r.pads);case"edge":return gP(n,t.dims,a,i,o,r.pads);default:throw Error("Invalid mode")}},hP=(e,t,r,n,i,o,a)=>{let s=t.length,u="";for(let e=s-1;e>=0;--e)u+=`
        k = m[${e}] - ${o[e]};
        if (k < 0)  return constant;
        if (k >= ${t[e]}) return constant;
        offset += k * ${r[e]};
        `;return`
      float padA(int m[${s}]) {
        const float constant = float(${a});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${n}, ${i});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},mP=(e,t,r,n,i,o)=>{let a=t.length,s="";for(let e=a-1;e>=0;--e)s+=`
        k = m[${e}] - ${o[e]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(t[e]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${t[e]}) { k = _2n_1 - k; }
        }
        offset += k * ${r[e]};
        `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${n}, ${i});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},gP=(e,t,r,n,i,o)=>{let a=t.length,s="";for(let e=a-1;e>=0;--e)s+=`
        k = m[${e}] - ${o[e]};
        if (k < 0)  k = 0;
        if (k >= ${t[e]}) k = ${t[e]-1};
        offset += k * ${r[e]};
      `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${n}, ${i});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `}}),xb=N(()=>{"use strict";lt(),Le(),Ae(),db=(e,t,r)=>{Zi(t);let n={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[e.run({...n,get:()=>fb(t,n,!1,r)},t)]},pb=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),r=e.attributes.getInt("ceil_mode",0),n=0!==e.attributes.getInt("count_include_pad",0),i=e.attributes.getInts("kernel_shape"),o=e.attributes.getInts("strides",[]),a=e.attributes.getInts("pads",[]);if(0!==r)throw Error("using ceil() in shape computation is not yet supported for AveragePool");return ve({autoPad:t,ceilMode:r,countIncludePad:n,kernelShape:i,strides:o,pads:a})},fb=(e,t,r,n)=>{let[i,o]=_b(e,n,r),a=te.size(i.kernelShape),s="";i.countIncludePad?s+=`value /= float(${a});`:s+=`value /= float(${a} - pad);`;let u=`
        ${vb(e[0].dims,i,"value += _X(x);",s,"0.0")}
      `;return{...t,output:{dims:o,type:e[0].type,textureType:0},shaderSource:u}},hb=(e,t,r)=>{Zi(t);let n={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${r.countIncludePad}`};return[e.run({...n,get:()=>fb(t,n,!0,r)},t)]},mb=e=>{let t=0!==e.attributes.getInt("count_include_pad",0);return ve({autoPad:"",ceilMode:0,countIncludePad:t,kernelShape:[],strides:[],pads:[]})},gb=(e,t,r)=>{Zi(t);let n={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[e.run({...n,get:()=>yb(t,n,!1,r)},t)]},bb=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),r=e.attributes.getInt("ceil_mode",0),n=e.attributes.getInts("kernel_shape"),i=e.attributes.getInts("strides",[]),o=e.attributes.getInts("pads",[]),a=e.attributes.getInt("storage_order",0),s=e.attributes.getInts("dilations",[]);if(0!==a)throw Error("column major storage order is not yet supported for MaxPool");if(0!==r)throw Error("using ceil() in shape computation is not yet supported for MaxPool");return ve({autoPad:t,ceilMode:r,countIncludePad:!1,kernelShape:n,strides:i,pads:o,storageOrder:a,dilations:s})},yb=(e,t,r,n)=>{let[i,o]=_b(e,n,r),a=`
      ${vb(e[0].dims,i,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...t,output:{dims:o,type:e[0].type,textureType:0},shaderSource:a}},_b=(e,t,r)=>{let n=e[0].dims.slice(),i=Object.hasOwnProperty.call(t,"dilations"),o=t.kernelShape.slice(),a=t.strides.slice(),s=i?t.dilations.slice():[],u=t.pads.slice();kr.adjustPoolAttributes(r,n,o,a,s,u);let l=kr.computePoolOutputShape(r,n,a,s,o,u,t.autoPad),d=Object.assign({},t);return i?Object.assign(d,{kernelShape:o,strides:a,pads:u,dilations:s,cacheKey:t.cacheKey}):Object.assign(d,{kernelShape:o,strides:a,pads:u,cacheKey:t.cacheKey}),[d,l]},bP={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},cb={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},wb=(e,t)=>(Zi(t),[e.run({...cb,get:()=>yb(t,cb,!0,bP)},t)]),Zi=e=>{if(!e||1!==e.length)throw Error("Pool ops requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")},vb=(e,t,r,n,i)=>{let o=e.length;if(t.kernelShape.length<=2){let a=t.kernelShape[t.kernelShape.length-1],s=t.strides[t.strides.length-1],u=t.pads[t.pads.length/2-1],l=t.pads[t.pads.length-1],d=e[o-1],p="",c="",h="";if(p=u+l!==0?`
          for (int i = 0; i < ${a}; i++) {
            x[${o} - 1] = indices[${o} - 1] * ${s} - ${u} + i;
            if (x[${o} - 1] < 0 || x[${o} - 1] >= ${d}) {
              pad++;
              continue;
            }
            ${r}
          }`:`
          for (int i = 0; i < ${a}; i++) {
            x[${o} - 1] = indices[${o} - 1] * ${s} - ${u} + i;
            ${r}
          }`,2===t.kernelShape.length){let r=t.kernelShape[t.kernelShape.length-2],n=t.strides[t.strides.length-2],i=t.pads[t.pads.length/2-2],s=t.pads[t.pads.length-2],u=e[o-2];c=i+s!==0?`
            for (int j = 0; j < ${r}; j++) {
              x[${o} - 2] = indices[${o} - 2] * ${n} - ${i} + j;
              if (x[${o} - 2] < 0 || x[${o} - 2] >= ${u}) {
                pad+= ${a};
                continue;
              }
          `:`
            for (int j = 0; j < ${r}; j++) {
              x[${o} - 2] = indices[${o} - 2] * ${n} - ${i} + j;
            `,h=`
          }
        `}return`
        float process(int indices[${o}]) {
          int x[${o}];
          copyVec(indices, x);

          float value = ${i};
          int pad = 0;
          ${c}
          ${p}
          ${h}
          ${n}
          return value;
        }
      `}{let a=te.size(t.kernelShape),s=te.computeStrides(t.kernelShape),u=s.length,l=t.pads.length,d=yP(u),p=Xi(e,"inputDims"),c=Xi(t.pads,"pads"),h=Xi(s,"kernelStrides"),f=Xi(t.strides,"strides"),m=t.pads.reduce((e,t)=>e+t),g="";return g=m?`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${r}
          }`:`
          }
          ${r}
        `,`
        ${d}
        float process(int indices[${o}]) {
          int x[${o}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${o}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${c}
          ${p}
          ${f}
          ${h}

          float value = ${i};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${a}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${o} - ${u}; j < ${o}; j++) {
              x[j] = indices[j] * strides[j - ${o} + ${u}]
                + offset[j - ${o} + ${u}] - pads[j - 2];
              ${g}
          }
          ${n}

          return value;
        }
      `}},Xi=(e,t)=>{let r="";for(let n=0;n<e.length;n++)r+=`
      ${t}[${n}] = ${e[n]};
    `;return r},yP=e=>`
  void offsetToIndices(int offset, int[${e}] strides, out int[${e}] indices) {
    if (${e} == 0) {
      return;
    }
    for (int i = 0; i < ${e} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${e} - 1] = offset;
  }`}),Eb=N(()=>{"use strict";lt(),Lo(),Le(),Ae(),Fr=(e,t,r,n,i)=>{wP(t);let o={name:n,inputNames:["A"],inputTypes:[0]};return[e.run({...o,cacheHint:r.cacheKey,get:()=>_P(e,t,r,n,i,o)},t)]},gr=e=>{let t=e.attributes.getInts("axes",[]),r=1===e.attributes.getInt("keepdims",1);return ve({axes:t,keepDims:r})},_P=(e,t,r,n,i,o)=>{let a=[],s=t[0].dims.length||1,u=[],l=te.normalizeAxes(r.axes,t[0].dims.length),d=i(t,l),p=d[1];for(let e=0;e<t[0].dims.length;e++)l.indexOf(e)>=0||0===l.length?(r.keepDims&&a.push(1),p=`
          for(int j${e} = 0; j${e} < ${t[0].dims[e]}; j${e}++) {
            inputIdx[${e}] = j${e};
            ${p}
          }`):(u.push(`inputIdx[${e}] = outputIdx[${a.length}];`),a.push(t[0].dims[e]));let c=`
      float process(int outputIdx[${a.length||1}]) {
        float value;                 // final result
        int inputIdx[${s}];      // addressing input data
        ${u.join(`
`)}
        ${d[0]}       // init ops for reduce max/min
        ${p}
        ${d[2]}       // final computation for reduce mean
        return value;
      }`;return{...o,output:{dims:a,type:t[0].type,textureType:0},shaderSource:c}},wP=e=>{if(!e||1!==e.length)throw Error("Reduce op requires 1 input.");if(-1===mr.indexOf(e[0].type))throw Error("Invalid input type.")},Tb=(e,t,r)=>Fr(e,t,r,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),Ib=(e,t,r)=>Fr(e,t,r,"ReduceMean",(e,t)=>{let r=1;for(let n=0;n<e[0].dims.length;n++)(t.indexOf(n)>=0||0===t.length)&&(r*=e[0].dims[n]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${r}.;`]}),Sb=(e,t,r)=>Fr(e,t,r,"ReduceMax",(e,t)=>{let r=[];for(let n=0;n<e[0].dims.length;n++)(t.indexOf(n)>=0||0===t.length)&&r.push(`inputIdx[${n}] = 0;`);return[`${r.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),$b=(e,t,r)=>Fr(e,t,r,"ReduceMin",(e,t)=>{let r=[];for(let n=0;n<e[0].dims.length;n++)(t.indexOf(n)>=0||0===t.length)&&r.push(`inputIdx[${n}] = 0;`);return[`${r.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),Ab=(e,t,r)=>Fr(e,t,r,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),Ob=(e,t,r)=>Fr(e,t,r,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),Pb=(e,t,r)=>Fr(e,t,r,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])}),Db=N(()=>{"use strict";Le(),Cb=(e,t)=>{let r=te.calculateReshapedDims(t[0].dims,t[1].integerData);return e.session.pack?[e.reshapePacked(t[0],r)]:[e.reshapeUnpacked(t[0],r)]}}),Ul=N(()=>{"use strict";lt(),Ze(),Ae(),kb={name:"Upsample",inputNames:["X"],inputTypes:[0]},Vl=(e,t,r)=>(Gl(t,r),[e.run({...kb,cacheHint:r.cacheKey,get:()=>vP(e,t,r)},t)]),Nb=e=>Ro(e,7),Lb=e=>Ro(e,9),Ro=(e,t)=>{let r=t>=10,n=e.attributes.getString("mode","nearest");if("nearest"!==n&&"linear"!==n&&(t<11||"cubic"!==n))throw Error(`unrecognized mode: ${n}`);let i=[];t<9&&(i=e.attributes.getFloats("scales"),Ji(i,n,r));let o=e.attributes.getFloat("extrapolation_value",0),a=t>10?e.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(-1===["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a))throw Error(`coordinate_transform_mode '${a}' is not supported`);let s="tf_crop_and_resize"===a,u="nearest"===n&&t>=11?e.attributes.getString("nearest_mode","round_prefer_floor"):"";if(-1===["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(u))throw Error(`nearest_mode '${u}' is not supported`);let l=e.attributes.getFloat("cubic_coeff_a",-.75),d=0!==e.attributes.getInt("exclude_outside",0);if(d&&"cubic"!==n)throw Error("exclude_outside can be set to 1 only when mode is CUBIC.");let p=t<11||"nearest"===n&&"asymmetric"===a&&"floor"===u,c=0,h=0,f=0;return t>10?e.inputs.length>2?(c=1,h=2,f=3):(h=1,f=2):9===t&&(h=1),ve({opset:t,isResize:r,mode:n,scales:i,extrapolationValue:o,coordinateTransformMode:a,useExtrapolation:s,needRoiInput:s,nearestMode:u,cubicCoefficientA:l,excludeOutside:d,useNearest2xOptimization:p,roiInputIdx:c,scalesInputIdx:h,sizesInputIdx:f})},vP=(e,t,r)=>{let n=se(e.session.backend.glContext.version),[i,o]=e.calculateTextureWidthAndHeight(t[0].dims,0),a=t[0].dims.map((e,t)=>Math.floor(e*r.scales[t])),[s,u]=e.calculateTextureWidthAndHeight(a,0),l=a.length,d=Array(l),p=Array(l),c=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let e=l-1;e>=0;e--)d[e]=e===l-1?1:d[e+1]*a[e+1],p[e]=e===l-1?1:p[e+1]*t[0].dims[e+1],c+=`
        output_pitches[${e}] = ${d[e]};
        input_pitches[${e}] = ${p[e]};
        `;let h=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${i}, ${o});
        float value = getColorAsFloat(${n.texture2D}(X, coords));
        return value;
      }
      `,f="nearest"===r.mode?`
    ${h}
    float process(int indices[${l}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${c}

      int d, m;
      for (int dim = 0; dim < ${l}; ++dim) {
        d = output_index / output_pitches[dim];
        m = output_index - d * output_pitches[dim];
        output_index = m;

        if (scales[dim] != 1 && d > 0) {
          int d2 = d / scales[dim];
          m = d - d2 * scales[dim];
          d = d2;
        }
        input_index += input_pitches[dim] * d;
      }

      return getInputFloat(input_index);
    }`:4===l?`
    ${h}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${c}

      int m;
      int index_of_dim0, index_of_dim1, index_of_dim2, index_of_dim3;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m / output_pitches[1];
      m = m - index_of_dim1 * output_pitches[1];
      index_of_dim2 = m / output_pitches[2];
      m = m - index_of_dim2 * output_pitches[2];
      index_of_dim3 = m;

      int index_of_input_dim2, index_of_input_dim3, x_offset, y_offset;
      index_of_input_dim2 = index_of_dim2 / scales[2];
      y_offset = index_of_dim2 - index_of_input_dim2 * scales[2];
      index_of_input_dim3 = index_of_dim3 / scales[3];
      x_offset = index_of_dim3 - index_of_input_dim3 * scales[3];

      input_index = index_of_dim0 * input_pitches[0] +
            index_of_dim1 * input_pitches[1] +
            index_of_input_dim2 * input_pitches[2] +
            index_of_input_dim3;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim2 = false;
      if (index_of_input_dim2 == (${t[0].dims[2]} - 1)) {
        // It's the end in dimension 2
        x01 = x00;
        end_of_dim2 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[2]);
      }

      if (index_of_input_dim3 == (input_pitches[2] - 1)) {
        // It's the end in dimension 3
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim2 ? x10 : getInputFloat(input_index + input_pitches[2] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[2]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[2]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[3]);
    }`:`
    ${h}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${c}

      int m;
      int index_of_dim0, index_of_dim1;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m;

      int index_of_input_dim0, index_of_input_dim1, x_offset, y_offset;
      index_of_input_dim0 = index_of_dim0 / scales[0];
      y_offset = index_of_dim0 - index_of_input_dim0 * scales[0];
      index_of_input_dim1 = index_of_dim1 / scales[1];
      x_offset = index_of_dim1 - index_of_input_dim1 * scales[1];

      input_index = index_of_input_dim0 * input_pitches[0] + index_of_input_dim1;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim0 = false;
      if (index_of_input_dim0 == (${t[0].dims[0]} - 1)) {
        // It's the end in dimension 0
        x01 = x00;
        end_of_dim0 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[0]);
      }

      if (index_of_input_dim1 == (input_pitches[0] - 1)) {
        // It's the end in dimension 1
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim0 ? x10 : getInputFloat(input_index + input_pitches[0] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[0]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[0]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[1]);
    }`;return{...kb,output:{dims:a,type:t[0].type,textureType:0},shaderSource:f,variables:[{name:"scales",type:"int",arrayLength:r.scales.length,data:r.scales.map(e=>Math.ceil(e))}]}},Gl=(e,t)=>{if(!e||t.opset<9&&1!==e.length||t.opset>=9&&t.opset<11&&2!==e.length||t.opset>=11&&e.length<2)throw Error("invalid inputs.");if(t.scales.length>0&&e[0].dims.length!==t.scales.length)throw Error("Invalid input shape.");if("string"===e[0].type)throw Error("Invalid input tensor types.")},Ji=(e,t,r)=>{if(r){for(let t of e)if(t<=0)throw Error("Scale value should be greater than 0.")}else for(let t of e)if(t<1)throw Error("Scale value should be greater than or equal to 1.");if(("linear"===t||"cubic"===t)&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1]))throw Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${r?"Resize":"Upsample"} opeartor.`)}}),Mb=N(()=>{"use strict";Ze(),Ae(),zn(),zr(),Ul(),Wl={name:"Resize",inputNames:["A"],inputTypes:[2]},Hl=(e,t,r)=>(Gl(t,r),[e.run({...Wl,cacheHint:r.cacheKey,get:()=>xP(e,t,r)},t)]),Rb=e=>Ro(e,10),zb=e=>Ro(e,11),xP=(e,t,r)=>{let n=se(e.session.backend.glContext.version),[i,o]=TP(t,r);if(i.every(e=>1===e)&&"tf_crop_and_resize"!==r.coordinateTransformMode)return{...Wl,output:{dims:o,type:t[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${n.texture2D}(X, TexCoords);
                    ${n.output} = v;
                }`};let a=o.length;if(a<2)throw Error(`output dimension should be at least 2, but got ${a}`);let s=o[a-2],u=o[a-1],l=t[0].dims;if(a!==l.length)throw Error(`output dimension should match input ${l.length}, but got ${a}`);let d=l[a-2],p=l[a-1],c=i[a-2],h=i[a-1],f="";if("linear"!==r.mode)throw Error(`resize (packed) does not support mode: '${r.mode}'`);switch(r.coordinateTransformMode){case"asymmetric":f=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":f=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":f=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${u}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${s}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${s}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":f=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${u}.0 - 1.0, ${s}.0 - 1.0, ${u}.0 - 1.0,
                            ${s}.0 - 1.0);
                        vec4 original = vec4(${p}.0 - 1.0, ${d}.0 - 1.0, ${p}.0 - 1.0,
                            ${d}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw Error(`resize (packed) does not support coordinateTransformMode:                                 '${r.coordinateTransformMode}'`)}let m=bt(a),g=Mn(),b=`
            const vec2 inputWH = vec2(${d}.0, ${p}.0);
            const vec4 scaleWHWH = vec4(float(${c}), float(${h}), float(${c}), float(${h}));
            ${g}
            ${f}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${m} rc = getOutputCoords();

                int batch = rc[0];
                int depth = rc[1];

                // retrieve the 4 coordinates that is used in the 4 packed output values.
                ivec4 coords = ivec4(rc.wz, rc.w + 1, rc.z + 1);

                // calculate the source index in fraction
                vec4 sourceFrac = getSourceFracIndex(coords);

                // get the lower and upper bound of the 4 values that will be packed into one texel.
                ivec4 x00 = ivec4(max(sourceFrac.xy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xy)));
                ivec4 x01 = ivec4(max(sourceFrac.xw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xw)));
                ivec4 x10 = ivec4(max(sourceFrac.zy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zy)));
                ivec4 x11 = ivec4(max(sourceFrac.zw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zw)));

                bool hasNextRow = rc.w < ${s-1};
                bool hasNextCol = rc.z < ${u-1};

                // pack x00, x01, x10, x11's top-left corner into one vec4 structure
                vec4 topLeft = vec4(
                    getAValue(batch, depth, x00.x, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.y) : 0.0);

                // pack x00, x01, x10, x11's top-right corner into one vec4 structure
                vec4 topRight = vec4(
                    getAValue(batch, depth, x00.x, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.w) : 0.0);

                // pack x00, x01, x10, x11's bottom-left corner into one vec4 structure
                vec4 bottomLeft = vec4(
                    getAValue(batch, depth, x00.z, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.y) : 0.0);

                // pack x00, x01, x10, x11's bottom-right corner into one vec4 structure
                vec4 bottomRight = vec4(
                    getAValue(batch, depth, x00.z, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.w) : 0.0);

                // calculate the interpolation fraction on u and v direction
                vec4 frac = vec4(sourceFrac) - floor(sourceFrac);
                vec4 clampFrac = clamp(frac, vec4(0.0), vec4(1.0));

                vec4 top = mix(topLeft, topRight, clampFrac.ywyw);
                vec4 bottom = mix(bottomLeft, bottomRight, clampFrac.ywyw);
                vec4 newValue = mix(top, bottom, clampFrac.xxzz);

                ${n.output} = vec4(newValue);
            }
        `;return{...Wl,output:{dims:o,type:t[0].type,textureType:2},hasMain:!0,shaderSource:b}},TP=(e,t)=>{let r=e[0].dims,n=t.scales,i;if(0===n.length){let o=e[t.scalesInputIdx];if(o&&0!==o.size){if(e[t.sizesInputIdx])throw Error("Only one of scales or sizes must be provided as input.");n=IP(o,t.mode,t.isResize)}else{let o=e[t.sizesInputIdx];if(!o||0===o.size)throw Error("Either scales or sizes MUST be provided as input.");i=Array.from(o.integerData),n=SP(i,r,t.mode,t.isResize)}}else if(e[t.sizesInputIdx])throw Error("Only one of scales or sizes must be provided as input.");let o=i||r.map((e,t)=>Math.floor(e*n[t]));return[n,o]},IP=(e,t,r)=>{let n=Array.from(e.floatData);return Ji(n,t,r),n},SP=(e,t,r,n)=>{let i=t.length,o=Array(i);for(let r=0;r<i;r++)if(0===t[r]){if(0!==e[r])throw Error("Input dim is zero but required output dim is non-zero.");o[r]=1}else o[r]=e[r]/t[r];return Ji(o,r,n),o}}),Fb=N(()=>{"use strict";Rr(),Bb=(e,t)=>($P(t),[new rt([t[0].dims.length],"int32",void 0,void 0,new Int32Array(t[0].dims))]),$P=e=>{if(!e||1!==e.length)throw Error("Shape requires 1 input.")}}),Hb=N(()=>{"use strict";lt(),Lo(),Le(),Ae(),ql={name:"Slice",inputNames:["A"],inputTypes:[0]},Vb=(e,t,r)=>(AP(t),[e.run({...ql,cacheHint:r.cacheKey,get:()=>Ub(e,t[0],r)},t)]),Gb=e=>{let t=e.attributes.getInts("starts"),r=e.attributes.getInts("ends"),n=e.attributes.getInts("axes",[]);return ve({starts:t,ends:r,axes:n})},Ub=(e,t,r)=>{let n=0===r.axes.length?t.dims.slice(0).map((e,t)=>t):r.axes,i=te.normalizeAxes(n,t.dims.length),o=r.starts.map((e,r)=>e>t.dims[i[r]]-1?t.dims[i[r]]:te.normalizeAxis(e,t.dims[i[r]])),a=r.ends.map((e,r)=>e>t.dims[i[r]]-1?t.dims[i[r]]:te.normalizeAxis(e,t.dims[i[r]])),s=t.dims.slice(),u=[];for(let e=0;e<i.length;e++)s[i[e]]=a[e]-o[e],o[e]>0&&u.push(`outputIdx[${i[e]}] += ${o[e]};`);let l=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...ql,output:{dims:s,type:t.type,textureType:0},shaderSource:l}},AP=e=>{if(!e||1!==e.length)throw Error("Slice requires 1 input.");if(-1===mr.indexOf(e[0].type))throw Error("Invalid input type.")},Wb=(e,t)=>{PP(t);let r=OP(e,t);return[e.run({...ql,cacheHint:r.cacheKey,get:()=>Ub(e,t[0],r)},[t[0]])]},OP=(e,t)=>{if(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)||t.length>=4&&!e.session.isInitializer(t[3].dataId)||t.length>=5&&!e.session.isInitializer(t[4].dataId))throw Error("dynamic slice attributes are not allowed");if(t.length>=5&&t[4].integerData.some(e=>1!==e))throw Error("currently non-1 steps is not supported for Slice");let r=Array.from(t[1].integerData),n=Array.from(t[2].integerData),i=t.length>=4?Array.from(t[3].integerData):[],o=`${i};${r};${n}`;return{starts:r,ends:n,axes:i,cacheKey:o}},PP=e=>{if(!e||e.length<3||e.length>5)throw Error("Invalid input number.");if("int32"!==e[1].type||1!==e[1].dims.length||"int32"!==e[2].type||1!==e[2].dims.length||e.length>=4&&("int32"!==e[3].type||1!==e[3].dims.length)||e.length>=5&&("int32"!==e[4].type||1!==e[4].dims.length))throw Error("Invalid input type.")}}),ty=N(()=>{"use strict";lt(),Le(),Ze(),Ae(),Ki(),qb={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},jb={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},Kb={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},Xb=(e,t,r)=>{ey(t);let n=t[0].dims.slice(),i=te.normalizeAxis(r.axis,n.length),o=te.sizeToDimension(n,i),a=te.sizeFromDimension(n,i);return Yb(e,t,r,o,a)},Zb=e=>ve({axis:e.attributes.getInt("axis",1)}),Jb=e=>ve({axis:e.attributes.getInt("axis",-1)}),Qb=(e,t,r)=>{ey(t);let n=t[0].dims.slice(),i=te.normalizeAxis(r.axis,n.length),o=n.length,a=i!==o-1,s=[],u=[],l=[],d;a&&((u=Array.from({length:o}).map((e,t)=>t))[i]=o-1,u[o-1]=i,u.map(e=>s.push(n[e])),d=ve({perm:u}),l=Br(e,t,d));let p=a?te.sizeToDimension(s,o-1):te.sizeToDimension(n,o-1),c=a?te.sizeFromDimension(s,o-1):te.sizeFromDimension(n,o-1),h=Yb(e,a?l:t,r,p,c);return a?Br(e,h,d):h},Yb=(e,t,r,n,i)=>{let o=EP(e,t[0],n,i,[n]),a=e.run({...qb,cacheHint:r.cacheKey,get:()=>o},t),s=CP(e,t[0],n,i,o.output.dims,[n]),u=e.run({...jb,cacheHint:r.cacheKey,get:()=>s},[t[0],a]),l=DP(e,t[0],n,i,o.output.dims,s.output.dims);return[e.run({...Kb,cacheHint:r.cacheKey,get:()=>l},[t[0],a,u])]},EP=(e,t,r,n,i)=>{let[o,a]=e.calculateTextureWidthAndHeight(t.dims,0),s=i.length;if(r<1||n<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==i.length)throw Error("Dimensionality of the output should be 1");if(i[0]!==r)throw Error("Shape of the output should be equal to logical row count");let u=se(e.session.backend.glContext.version),l=`
      float process(int[${s}] indices) {
        int logical_row_start_offset = indices[0] * ${n};

        float max = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset, ${o},
        ${a} )));
        for(int i=1; i<${n}; ++i)
        {
          float current = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${o}, ${a})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...qb,output:{dims:i,type:t.type,textureType:0},shaderSource:l}},CP=(e,t,r,n,i,o)=>{let[a,s]=e.calculateTextureWidthAndHeight(t.dims,0),u=o.length;if(r<1||n<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==o.length)throw Error("Dimensionality of the output should be 1");if(o[0]!==r)throw Error("Shape of the output should be equal to logical row count");if(1!==i.length)throw Error("Dimensionality of the intermediate results should be 1");if(i[0]!==r)throw Error("Shape of the intermediate results should be equal to logical row count");let l=se(e.session.backend.glContext.version),d=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${n};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${n}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${a}, ${s}))) - max);
        }

        return norm_factor;
      }`;return{...jb,output:{dims:o,type:t.type,textureType:0},shaderSource:d}},DP=(e,t,r,n,i,o)=>{let[a,s]=e.calculateTextureWidthAndHeight(t.dims,0),u=t.dims.length;if(r<1||n<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==i.length||1!==o.length)throw Error("Dimensionality of the intermediate results should be 1");if(i[0]!==r||o[0]!==r)throw Error("Shape of the intermediate results should be equal to logical row count");let l=`
      float process(int[${u}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${a}, ${s});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${n};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...Kb,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:l}},ey=e=>{if(!e||1!==e.length)throw Error("Softmax requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type")}}),iy=N(()=>{"use strict";lt(),Le(),Ae(),ny={name:"Split",inputNames:["A"],inputTypes:[0]},ry=(e,t,r)=>{LP(t);let n=te.normalizeAxis(r.axis,t[0].dims.length),i=kP(e,t,n,r),o=[];for(let a=0;a<i;++a)o.push(e.run({...ny,cacheHint:`${r.cacheKey};${a}`,get:()=>NP(e,t[0],r,n,a)},t));return o},oy=e=>{let t=e.attributes.getInt("axis",0),r=e.attributes.getInts("split",[]),n=e.outputs.length;return ve({axis:t,split:r,numOutputs:n})},kP=(e,t,r,n)=>{let[,i]=Po.splitShape(t[0].dims,r,n.split,n.numOutputs);return i.length},NP=(e,t,r,n,i)=>{let[o,a]=Po.splitShape(t.dims,n,r.split,r.numOutputs),s=a[i],u=o[i],l=`
      float process(int indices[${u.length}]) {
        indices[${n}] += ${s};
        return _A(indices);
      }
    `;return{...ny,cacheHint:`${r.cacheKey}:${i}`,output:{dims:u,type:t.type,textureType:0},shaderSource:l}},LP=e=>{if(!e||1!==e.length)throw Error("Split requires one input.");if("int8"!==e[0].type&&"uint8"!==e[0].type&&"int16"!==e[0].type&&"uint16"!==e[0].type&&"int32"!==e[0].type&&"uint32"!==e[0].type&&"float32"!==e[0].type&&"float64"!==e[0].type&&"bool"!==e[0].type)throw Error("Invalid input type.")}}),uy=N(()=>{"use strict";Le(),jl=(e,t,r)=>{RP(t);let n=te.squeezeShape(t[0].dims,r);return[e.reshapeUnpacked(t[0],n)]},ay=(e,t)=>(zP(t),jl(e,[t[0]],Array.from(t[1].integerData))),sy=e=>e.attributes.getInts("axes"),RP=e=>{if(!e||1!==e.length)throw Error("Squeeze requires 1 input.");if("string"===e[0].type)throw Error("invalid input tensor types.")},zP=e=>{if(!e||2!==e.length)throw Error("Squeeze requires 2 inputs.");if("int32"!==e[1].type)throw Error("Invalid input type.")}}),cy=N(()=>{"use strict";Ze(),Ae(),ly=(e,t)=>{BP(t);let r={name:"Sum",inputNames:t.map((e,t)=>`X${t}`),inputTypes:Array(t.length).fill(0)};return[e.run({...r,get:()=>MP(e,t,r)},t)]},MP=(e,t,r)=>{let n=se(e.session.backend.glContext.version),i=t[0].dims.slice(),o=`
      void main() {
        vec4 result = ${t.map((e,t)=>`${n.texture2D}(X${t},TexCoords)`).join(" + ")};
        ${n.output} = result;
      }
    `;return{...r,output:{dims:i,type:t[0].type,textureType:0},hasMain:!0,shaderSource:o}},BP=e=>{if(!e||0===e.length)throw Error("Sum requires inputs.");let t=e[0].dims.length;for(let r=1;r<e.length;r++){if(t!==e[r].dims.length)throw Error("Input shapes are mismatched.");for(let n=0;n<t;n++)if(e[0].dims[n]!==e[r].dims[n])throw Error("Input shapes are not matched.")}if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.");for(let t=1;t<e.length;t++)if(e[0].type!==e[t].type)throw Error("Input types are not matched.")}}),py=N(()=>{"use strict";Lo(),Ae(),dy=(e,t)=>{VP(t);let r={name:"Tile",inputNames:["A"],inputTypes:[0]};return[e.run({...r,get:()=>FP(e,t,r)},t)]},FP=(e,t,r)=>{let n=t[0].dims.slice(),i=Array(n.length),o=[];for(let e=0;e<n.length;e++)i[e]=n[e]*t[1].numberData[e],o.push(`inputIdx[${e}] = int(mod(float(outputIdx[${e}]), ${n[e]}.));`);let a=i.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${o.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...r,output:{dims:i,type:t[0].type,textureType:0},shaderSource:s}},VP=e=>{if(!e||2!==e.length)throw Error("Tile requires 2 input.");if(1!==e[1].dims.length)throw Error("The second input shape must 1 dimension.");if(e[1].dims[0]!==e[0].dims.length)throw Error("Invalid input shape.");if(-1===mr.indexOf(e[0].type))throw Error("Invalid input type.");if("int32"!==e[1].type&&"int16"!==e[1].type)throw Error("Invalid repeat type.")}}),my=N(()=>{"use strict";Le(),Kl=(e,t,r)=>{GP(t);let n=te.unsqueezeShape(t[0].dims,r);return[e.reshapeUnpacked(t[0],n)]},fy=(e,t)=>(UP(t),Kl(e,[t[0]],Array.from(t[1].integerData))),hy=e=>e.attributes.getInts("axes"),GP=e=>{if(!e||1!==e.length)throw Error("Unsqueeze requires 1 input.");if("string"===e[0].type)throw Error("invalid input tensor types.")},UP=e=>{if(!e||2!==e.length)throw Error("Unsqueeze requires 2 inputs.");if("int32"!==e[1].type)throw Error("Invalid input type.")}}),by=N(()=>{"use strict";Am(),Fm(),Um(),Xm(),Hi(),Dg(),Mg(),Vg(),Wg(),Kg(),Jg(),tb(),ib(),qi(),lb(),xb(),Eb(),Db(),Mb(),Fb(),Hb(),ty(),iy(),uy(),cy(),py(),Ki(),Cl(),my(),Ul(),gy=[["Abs","","6+",Zm],["Acos","","7+",Jm],["Add","","7+",Om],["And","","7+",Pm],["Asin","","7+",Qm],["Atan","","7+",Ym],["AveragePool","","7+",db,pb],["BatchNormalization","","7+",Sm,$m],["Cast","","6+",Vm,Gm],["Ceil","","6+",ng],["Clip","","6-10",Pl,eg],["Clip","","11+",tg],["Concat","","4+",qm,Km],["Conv","","1+",zl,Ml],["ConvTranspose","","1+",Eg,Cg],["Cos","","7+",rg],["Div","","7+",Em],["Dropout","","7+",El],["DepthToSpace","","1+",Rg,zg],["Equal","","7+",Cm],["Elu","","6+",og,ig],["Exp","","6+",ag],["Flatten","","1+",Bg,Fg],["Floor","","6+",sg],["FusedConv","com.microsoft","1+",zl,Ml],["Gather","","1+",Gg,Ug],["Gemm","","7-10",Bl,qg],["Gemm","","11+",Bl,jg],["GlobalAveragePool","","1+",hb,mb],["GlobalMaxPool","","1+",wb],["Greater","","7+",Dm],["Identity","","1+",El],["ImageScaler","","1+",Xg,Zg],["InstanceNormalization","","6+",Yg,eb],["LeakyRelu","","6+",ug,lg],["Less","","7+",km],["LRN","","1+",nb,rb],["Log","","6+",cg],["MatMul","","1+",Tg,Ig],["MaxPool","","1+",gb,bb],["Mul","","7+",Nm],["Neg","","6+",dg],["Not","","1+",pg],["Or","","7+",Lm],["Pad","","2-10",Fl,ab],["Pad","","11+",sb,ub],["Pow","","7+",Rm],["PRelu","","7+",zm],["ReduceLogSum","","1+",Ob,gr],["ReduceMax","","1+",Sb,gr],["ReduceMean","","1+",Ib,gr],["ReduceMin","","1+",$b,gr],["ReduceProd","","1+",Ab,gr],["ReduceSum","","1-12",Tb,gr],["ReduceSumSquare","","1+",Pb,gr],["Relu","","6+",fg],["Reshape","","5+",Cb],["Resize","","10",Hl,Rb],["Resize","","11+",Hl,zb],["Shape","","1+",Bb],["Sigmoid","","6+",hg],["Sin","","7+",mg],["Slice","","10+",Wb],["Slice","","1-9",Vb,Gb],["Softmax","","1-12",Xb,Zb],["Softmax","","13+",Qb,Jb],["Split","","2-12",ry,oy],["Sqrt","","6+",gg],["Squeeze","","1-12",jl,sy],["Squeeze","","13+",ay],["Sub","","7+",Mm],["Sum","","6+",ly],["Tan","","7+",bg],["Tanh","","6+",yg],["Tile","","6+",dy],["Transpose","","1+",Br,Ng],["Upsample","","7-8",Vl,Nb],["Upsample","","9",Vl,Lb],["Unsqueeze","","1-12",Kl,hy],["Unsqueeze","","13+",fy],["Xor","","7+",Bm]]});function _y(e){let t={},r;for(;null!==(r=yy.exec(e));){let e=r[3].split(",").map(e=>{let t=e.trim().split(" ");return t&&2===t.length?{type:t[0],name:t[1]}:null}).filter(e=>null!==e);t[r[2]]={params:e,body:r[4]}}for(let n in t){let i=RegExp(WP.replace("__FUNC__",n),"gm");for(;null!==(r=i.exec(e));){let i=r[1],o=r[2],a=r[3].split(","),s=i?`${i} ${o};`:"",u=t[n].body,l="";t[n].params.forEach((e,t)=>{e&&(l+=`${e.type} ${e.name} = ${a[t]};
`)}),u=(u=`${l}
 ${u}`).replace("return",`${o} = `);let d=`
      ${s}
      {
        ${u}
      }
      `;e=e.replace(r[0],d)}}return e.replace(yy,"")}var yy,WP,wy=N(()=>{"use strict";yy=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,WP="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function ao(e,t){let r=[],n=[],i=null!=t&&Array.isArray(t)&&0===t.length,o=null==t||i?null:HP(t,e).sort(),a=0;for(let t=0;t<e.length;++t){if(null!=o){if(o[a]===t&&1!==e[t])throw Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(null==o[a]||o[a]>t)&&1===e[t]&&(r.push(e[t]),n.push(t)),o[a]<=t&&a++}1!==e[t]&&(r.push(e[t]),n.push(t))}return{newShape:r,keptDims:n}}function HP(e,t){let r=t.length;return eo((e=null==e?t.map((e,t)=>t):[].concat(e)).every(e=>e>=-r&&e<r),()=>`All values in axis param must be in range [-${r}, ${r}) but got axis ${e}`),eo(e.every(qP),()=>`All values in axis param must be integers but got axis ${e}`),e.map(e=>e<0?r+e:e)}function qP(e){return e%1==0}function jP(e){if(0===e.length)return 1;let t=e[0];for(let r=1;r<e.length;r++)t*=e[r];return t}function vy(e){let t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}var Qi,Yi,ea,ta,na,ra,Zl,oa,ia,aa,sa,Xl=N(()=>{"use strict";Ct(),Le(),Qi=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,t){let r=this.computeTexture(e,t);return t&&t.isPacked&&(r[0]/=2,r[1]/=2),t&&t.reverseWH?[r[1],r[0]]:r}computeTexture(e,t){let r=t&&t.isPacked;if(0===e.length)return r?[2,2]:[1,1];let n=this.maxTextureSize;if(t&&void 0!==t.breakAxis){let r=t.breakAxis>=e.length?1:e.slice(t.breakAxis).reduce((e,t)=>e*t),i=t.breakAxis<=0?1:e.slice(0,t.breakAxis).reduce((e,t)=>e*t);if(!(r>n)&&!(i>n))return[r,i];ze.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${t.breakAxis}`)}let i=e.slice(0);r&&(n*=2,1===(i=i.map((e,t)=>t>=i.length-2?i[t]%2==0?i[t]:i[t]+1:i[t])).length&&(i=[2,i[0]])),2!==i.length&&(i=ao(i).newShape);let o=jP(i);return i.length<=1&&o<=n?[1,o]:2===i.length&&i[0]<=n&&i[1]<=n?i:3===i.length&&i[0]*i[1]<=n&&i[2]<=n?[i[0]*i[1],i[2]]:3===i.length&&i[0]<=n&&i[1]*i[2]<=n?[i[0],i[1]*i[2]]:4===i.length&&i[0]*i[1]*i[2]<=n&&i[3]<=n?[i[0]*i[1]*i[2],i[3]]:4===i.length&&i[0]<=n&&i[1]*i[2]*i[3]<=n?[i[0],i[1]*i[2]*i[3]]:r?vy(o/4).map(e=>2*e):vy(o)}}}),xy=N(()=>{"use strict";Le(),Qn(),Ze(),Xl(),zn(),Yi=class extends zt{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){return{offsetToCoords:new K(`
      vec2 offsetToCoords(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){return{coordsToOffset:new K(`
      int coordsToOffset(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let t=e.unpackedShape,r=[e.width,e.height],n={},i="getOutputCoords";switch(t.length){case 0:n[i]=this.getOutputScalarCoords();break;case 1:n[i]=this.getOutputPacked1DCoords(t,r);break;case 2:n[i]=this.getOutputPacked2DCoords(t,r);break;case 3:n[i]=this.getOutputPacked3DCoords(t,r);break;default:n[i]=this.getOutputPackedNDCoords(t,r)}let o=`
      void setOutput(vec4 val) {
        ${se(this.context.glContext.version).output} = val;
      }
    `;return n.floatTextureSetRGBA=new K(o),n}getUnpackedOutputSamplingSnippet(e){let t=e.unpackedShape,r=[e.width,e.height],n={},i="getOutputCoords";switch(t.length){case 0:n[i]=this.getOutputScalarCoords();break;case 1:n[i]=this.getOutputUnpacked1DCoords(t,r);break;case 2:n[i]=this.getOutputUnpacked2DCoords(t,r);break;case 3:n[i]=this.getOutputUnpacked3DCoords(t,r);break;case 4:n[i]=this.getOutputUnpacked4DCoords(t,r);break;case 5:n[i]=this.getOutputUnpacked5DCoords(t,r);break;case 6:n[i]=this.getOutputUnpacked6DCoords(t,r);break;default:throw Error(`Unsupported output dimensionality: ${t.length}`)}let o=`
        void setOutput(float val) {
          ${se(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `;return n.floatTextureSetR=new K(o),n}getOutputScalarCoords(){return new K(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,t){let r="";return r=1===t[0]?`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${t[1]}.0);
          }
        `:1===t[1]?`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${t[0]}.0);
          }
        `:`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${t[0]}, ${t[1]}));
          return 2 * (resTexRC.y * ${t[0]} + resTexRC.x);
        }
      `,new K(r)}getOutputPacked2DCoords(e,t){let r="";if(Dr.arraysEqual(e,t))return r=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new K(r);let n=Math.ceil(e[1]/2);return r=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));

          int index = resTexRC.y * ${t[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${n}) * 2;
          int c = 2 * (index / ${n});

          return ivec2(r, c);
        }
      `,new K(r)}getOutputPacked3DCoords(e,t){let r=[t[0],t[1]],n=Math.ceil(e[2]/2),i=n*Math.ceil(e[1]/2),o=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;

          int b = index / ${i};
          index -= b * ${i};

          // reverse r and c order for packed texture
          int r = imod(index, ${n}) * 2;
          int c = 2 * (index / ${n});

          return ivec3(b, r, c);
        }
      `;return new K(o)}getOutputPackedNDCoords(e,t){let r=[t[0],t[1]],n=Math.ceil(e[e.length-1]/2),i=n*Math.ceil(e[e.length-2]/2),o=i,a="",s="b, r, c";for(let t=2;t<e.length-1;t++)o*=e[e.length-t-1],a=`
      int b${t} = index / ${o};
      index -= b${t} * ${o};
    `+a,s=`b${t}, `+s;let u=`
      ivec${e.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${r[0]}, ${r[1]}));
        int index = resTexRC.y * ${r[0]} + resTexRC.x;

        ${a}

        int b = index / ${i};
        index -= b * ${i};

        // reverse r and c order for packed texture
        int r = imod(index, ${n}) * 2;
        int c = 2 * (index / ${n});

        return ivec${e.length}(${s});
      }
    `;return new K(u)}getOutputUnpacked1DCoords(e,t){let r=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new K(r)}getOutputUnpacked2DCoords(e,t){let r=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new K(r)}getOutputUnpacked3DCoords(e,t){let r="",n=e.length,i=null;n<2&&(i=[]),(i=Array(n-1))[n-2]=e[n-1];for(let t=n-3;t>=0;--t)i[t]=i[t+1]*e[t+1];let o=["r","c","d"],a=i.map((e,t)=>{let r=`int ${o[t]} = index / ${e}`,n=t===i.length-1?`int ${o[t+1]} = index - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("");return r=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${a}
          return ivec3(r, c, d);
        }
      `,new K(r)}getOutputUnpacked4DCoords(e,t){let r="",n=e.length,i=null;n<2&&(i=[]),(i=Array(n-1))[n-2]=e[n-1];for(let t=n-3;t>=0;--t)i[t]=i[t+1]*e[t+1];let o=["r","c","d","d2"],a=i.map((e,t)=>{let r=`int ${o[t]} = index / ${e}`,n=t===i.length-1?`int ${o[t+1]} = index - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("");return r=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${a}
          return ivec4(r, c, d, d2);
        }
      `,new K(r)}getOutputUnpacked5DCoords(e,t){let r="",n=e.length,i=null;n<2&&(i=[]),(i=Array(n-1))[n-2]=e[n-1];for(let t=n-3;t>=0;--t)i[t]=i[t+1]*e[t+1];let o=["r","c","d","d2","d3"],a=i.map((e,t)=>{let r=`int ${o[t]} = index / ${e}`,n=t===i.length-1?`int ${o[t+1]} = index - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("");return r=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${a}
          return ivec5(r, c, d, d2, d3);
        }
      `,new K(r)}getOutputUnpacked6DCoords(e,t){let r="",n=e.length,i=null;n<2&&(i=[]),(i=Array(n-1))[n-2]=e[n-1];for(let t=n-3;t>=0;--t)i[t]=i[t+1]*e[t+1];let o=["r","c","d","d2","d3","d4"],a=i.map((e,t)=>{let r=`int ${o[t]} = index / ${e}`,n=t===i.length-1?`int ${o[t+1]} = index - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("");return r=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${a}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new K(r)}getCommonUtilFuncs(){let e={},t="uvFromFlat";e[t]=new K(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),e[t="packedUVfrom1D"]=new K(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e[t="packedUVfrom2D"]=new K(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e[t="packedUVfrom3D"]=new K(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="sampleTexture";let r=se(this.context.glContext.version);return e[t]=new K(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${r.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n],o=Mi(r);i.isPacked?e[o]=this.getPackedSamplerFromInput(o,r,i):e[o]=this.getUnpackedSamplerFromInput(o,r,i);let a=lm(r);i.unpackedShape.length<=t.unpackedShape.length&&(i.isPacked?e[a]=this.getPackedSamplerAtOutputCoords(a,i,t,r):e[a]=this.getUnpackedSamplerAtOutputCoords(a,i,t,r))}),e}getPackedSamplerAtOutputCoords(e,t,r,n){let i=t.unpackedShape,o=r.unpackedShape,a=Mi(n),s=i.length,u=o.length,l=gt.getBroadcastDims(i,o),d=bt(u),p=u-s,c,h=Kt();c=0===s?"":u<2&&l.length>=1?"coords = 0;":l.map(e=>`coords.${h[e+p]} = 0;`).join(`
`);let f="";f=u<2&&s>0?"coords":i.map((e,t)=>`coords.${h[t+p]}`).join(", ");let m="return outputValue;",g=1===te.size(i),b=1===te.size(o);if(1!==s||g||b){if(g&&!b)m=1===u?`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:`
          return vec4(outputValue.x);
        `;else if(l.length){let e=s-2,t=s-1;l.indexOf(e)>-1&&l.indexOf(t)>-1?m="return vec4(outputValue.x);":l.indexOf(e)>-1?m="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":l.indexOf(t)>-1&&(m="return vec4(outputValue.xx, outputValue.zz);")}}else m=`
        return vec4(outputValue.xy, outputValue.xy);
      `;let y=`
        int lastDim = coords.${h[u-1]};
        coords.${h[u-1]} = coords.${h[u-2]};
        coords.${h[u-2]} = lastDim;
      `,_=`
      vec4 ${e}() {
        ${d} coords = getOutputCoords();
        ${y}
        ${c}
        vec4 outputValue = ${a}(${f});
        ${m}
      }
    `;return new K(_,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,t,r,n){let i=[r.width,r.height],o=[t.width,t.height],a=t.unpackedShape.length,s=r.unpackedShape.length,u=t.unpackedShape,l=r.unpackedShape,d=Mi(n);if(a===s&&Dr.arraysEqual(o,i)){let t=`
          float ${e}() {
            return sampleTexture(${n}, TexCoords);
          }
        `;return new K(t,["coordinates.sampleTexture"])}let p=bt(s),c=gt.getBroadcastDims(u,l),h=s-a,f,m=Kt();f=0===a?"":s<2&&c.length>=1?"coords = 0;":c.map(e=>`coords.${m[e+h]} = 0;`).join(`
`);let g="";g=s<2&&a>0?"coords":t.unpackedShape.map((e,t)=>`coords.${m[t+h]}`).join(", ");let b=`
        float ${e}() {
          ${p} coords = getOutputCoords();
          ${f}
          return ${d}(${g});
        }
      `;return new K(b,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,t,r){switch(r.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,t);case 1:return this.getPackedSampler1D(e,t,r);case 2:return this.getPackedSampler2D(e,t,r);case 3:return this.getPackedSampler3D(e,t,r);default:return this.getPackedSamplerND(e,t,r)}}getUnpackedSamplerFromInput(e,t,r){let n=r.unpackedShape;switch(n.length){case 0:return this.getUnpackedSamplerScalar(e,t,r);case 1:return this.getUnpackedSampler1D(e,t,r);case 2:return this.getUnpackedSampler2D(e,t,r);case 3:return this.getUnpackedSampler3D(e,t,r);case 4:return this.getUnpackedSampler4D(e,t,r);case 5:return this.getUnpackedSampler5D(e,t,r);case 6:return this.getUnpackedSampler6D(e,t,r);default:throw Error(`Unsupported dimension ${n.length}-D`)}}getPackedSamplerScalar(e,t){let r=se(this.context.glContext.version),n=`
          vec4 ${e}() {
            return ${r.texture2D}(${t}, halfCR);
          }
        `;return new K(n)}getPackedSampler1D(e,t,r){let n=[r.width,r.height],i=[n[1],n[0]],o=se(this.context.glContext.version),a=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${o.texture2D}(${t}, uv);
    }`;return new K(a,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,t,r){let n=r.unpackedShape,i=[r.width,r.height],o=se(this.context.glContext.version),a=i[0],s=i[1];if(null!=i&&Dr.arraysEqual(n,i)){let r=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${s}.0, ${a}.0);
        return ${o.texture2D}(${t}, uv);
      }`;return new K(r)}let u=Math.ceil(n[1]/2),l=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${i[1]}, ${i[0]}, ${u}, row, col);
      return ${o.texture2D}(${t}, uv);
    }`;return new K(l,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,t,r){let n=r.unpackedShape,i=[r.width,r.height],o=[i[0],i[1]],a=se(this.context.glContext.version);if(1===n[0]){let i=n.slice(1),o=to(n,i),a=JSON.parse(JSON.stringify(r));a.unpackedShape=o;let s=this.getPackedSamplerFromInput(e,t,a),u=`${s.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${no(["b","row","col"],[1,2])});
      } `;return new K(u,s.dependencies)}let s=o[0],u=o[1],l=Math.ceil(n[2]/2),d=l*Math.ceil(n[1]/2),p=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${u}, ${s}, ${d}, ${l}, b, row, col);
      return ${a.texture2D}(${t}, uv);}`;return new K(p,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,t,r){let n=r.unpackedShape,i=n.length,o=[r.width,r.height],a=se(this.context.glContext.version),s=[o[0],o[1]],u=s[1],l=s[0],d=Math.ceil(n[i-1]/2),p=d*Math.ceil(n[i-2]/2),c="int b, int row, int col",h=`b * ${p} + (row / 2) * ${d} + (col / 2)`;for(let e=2;e<i-1;e++)c=`int b${e}, `+c,p*=n[i-e-1],h=`b${e} * ${p} + `+h;let f=`vec4 ${e}(${c}) {
      int index = ${h};
      int texR = index / ${l};
      int texC = index - texR * ${l};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${l}, ${u});
      return ${a.texture2D}(${t}, uv);
    }`;return new K(f)}getUnpackedSamplerScalar(e,t,r){let[n,i]=[r.width,r.height];if(1===n&&1===i){let r=`
          float ${e}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new K(r,["coordinates.sampleTexture"])}let o=`
        float ${e}() {
          int offset_${t} = coordsToOffset(TexCoords, ${n}, ${i});
          vec2 uv = uvFromFlat(${n}, ${i}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new K(o,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,t,r){let n=r.width,i=r.height;if(1===i&&1===n){let r=`
        float ${e}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new K(r,["coordinates.sampleTexture"])}if(1===i){let r=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${n}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new K(r,["coordinates.sampleTexture"])}if(1===n){let r=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new K(r,["coordinates.sampleTexture"])}let o=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${n}, ${i}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new K(o,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,t,r){let n=r.unpackedShape,i=[r.height,r.width];if(null!=i&&Dr.arraysEqual(n,i)){let r=i[1],n=i[0],o=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${r}.0, ${n}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new K(o,["coordinates.sampleTexture"])}let{newShape:o,keptDims:a}=ao(n);if(o.length<n.length){let i=to(n,o),s=JSON.parse(JSON.stringify(r));s.unpackedShape=i;let u=`
          ${this.getUnpackedSamplerFromInput(e,t,s).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${no(["col","row"],a)});
          }
        `;return new K(u,["coordinates.sampleTexture"])}let s=i[1],u=i[0];if(1===u){let r=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${s}, ${u});
            float index = dot(vec3(row, col, offset_${t}), vec3(${n[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${s}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new K(r,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(1===s){let r=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${s}, ${u});
            float index = dot(vec3(row, col, offset_${t}), vec3(${n[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${u}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new K(r,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let l=`
        float ${e}(int row, int col) {
          int index = col * ${n[1]} + row;
          vec2 uv = uvFromFlat(${s}, ${u}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new K(l,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,t,r){let n=r.unpackedShape,i=n[1]*n[2],o=n[2],{newShape:a,keptDims:s}=ao(n);if(a.length<n.length){let i=to(n,a),o=JSON.parse(JSON.stringify(r));o.unpackedShape=i;let u=this.getUnpackedSamplerFromInput(e,t,o),l=s.reverse(),d=`
          ${u.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${no(["batch","col","row"],l)});
          }
        `;return new K(d,u.dependencies)}let u=r.width,l=r.height,d=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${o} + row;
            vec2 uv = uvFromFlat(${u}, ${l}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new K(d,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,t,r){let n=r.unpackedShape,i=n[3],o=n[2]*i,a=n[1]*o,s=r.width,u=r.height,l=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${a} + col * ${o} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${s}, ${u}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new K(l,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,t,r){let n=r.unpackedShape,i=n[4],o=n[3]*i,a=n[2]*o,s=n[1]*a,{newShape:u,keptDims:l}=ao(n);if(u.length<n.length){let i=to(n,u),o=JSON.parse(JSON.stringify(r));o.unpackedShape=i;let a=`
          ${this.getUnpackedSamplerFromInput(e,t,o).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${no(["row","col","depth","depth2","depth3"],l)});
          }
        `;return new K(a,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let d=r.width,p=r.height,c=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${s} + col * ${a} + depth * ${o} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${d}, ${p}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new K(c,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,t,r){let n=r.unpackedShape,i=n[5],o=n[4]*i,a=n[3]*o,s=n[2]*a,u=n[1]*s,{newShape:l,keptDims:d}=ao(n);if(l.length<n.length){let i=to(n,l),o=JSON.parse(JSON.stringify(r));o.unpackedShape=i;let a=`
            ${this.getUnpackedSamplerFromInput(e,t,o).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${no(["row","col","depth","depth2","depth3","depth4"],d)});
            }
          `;return new K(a,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=r.width,c=r.height,h=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${u} + col * ${s} + depth * ${a} +
            depth2 * ${o} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${p}, ${c}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new K(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,t=e.shape.length,r=e.strides,n=e.width,i=e.height,o=[];for(let e=0;e<t-1;++e)o.push(`
        c[${e}] = offset / ${r[e]};`),o.push(`
        offset -= c[${e}] * ${r[e]};`);o.push(`
        c[${t-1}] = offset;`);let a=`
      void toVec(vec2 texCoords, out int c[${t}]) {
        int offset = coordsToOffset(texCoords, ${n}, ${i});
        ${o.join("")}
      }
      void toVec(int offset, out int c[${t}]) {
        ${o.join("")}
      }
    `;return{toVec:new K(a,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((t,r)=>{let n=this.context.inputTextureLayouts[r],i=(n.unpackedShape.length>0?n.unpackedShape:n.shape).length,o=`_${t}`;e[o]=new K(this.getValueFromSingle(t,i,n.width,n.height,!1),[`shapeUtils.indicesToOffset${o}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),e[o+="_T"]=new K(this.getValueFromSingle(t,i,n.width,n.height,!0),[`shapeUtils.indicesToOffset${o}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,t,r,n,i){let o=`_${e}`;i&&(o+="_T");let a=se(this.context.glContext.version);return`
        float ${o}(int m[${t}]) {
          int offset = indicesToOffset${o}(m);
          vec2 coords = offsetToCoords(offset, ${r}, ${n});
          float value = getColorAsFloat(${a.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,t,r,n,i){let o=`_${e}_Pack`;i&&(o+="_T");let a=se(this.context.glContext.version);return`
        vec4 ${o}(int m[${t}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${r}, ${n});
          return ${a.texture2D}(${e}, coords);
        }
        `}}}),Ty=N(()=>{"use strict";Qn(),ea=class e extends zt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new K(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new K(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let t=e.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new K(`
      highp vec4 encode(highp float f) {
        highp float F = abs(f);
        highp float Sign = step(0.0,-f);
        highp float Exponent = floor(log2(F));
        highp float Mantissa = (exp2(- Exponent) * F);
        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));
        highp vec4 rgba;
        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));
        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);
        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));
        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));
        ${t}
        rgba = rgba / 255.0; // values need to be normalized to [0,1]
        return rgba;
    }
        `)}}decodeUint8(){let t=e.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new K(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${t}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),t=new Uint32Array(e),r=new Uint8Array(e);if(t[0]=0xdeadbeef,239===r[0])return!0;if(222===r[0])return!1;throw Error("unknown endianness")}}}),Iy=N(()=>{"use strict";Qn(),Ze(),ta=class extends zt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=se(this.context.glContext.version);return{setFragColor:new K(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new K(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}}),Sy=N(()=>{"use strict";Qn(),na=class e extends zt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,t={};return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n].unpackedShape;if(i.length<=e){let n=i.length,o=e-n,a=`bcastIndices_${r}`,s="";for(let e=0;e<n;++e)s+=`
          realIndices[${e}] = int( mod(float(bcastedIndices[${o+e}]), ${i[e]}.0) );
          `;let u=`
        void ${a} (int bcastedIndices[${e}], out int realIndices[${n}]) {
          ${s}
        }
        `;t[a]=new K(u)}}),t}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,t={};return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n].shape;if(!(i.length<2||i.length>e)){let n=i.length,o=e-n,a=`bcastMatmulIndices_${r}`,s="";for(let e=0;e<n-2;++e)s+=`
          realIndices[${e}] = int( mod(float(bcastedIndices[${o+e}]), ${i[e]}.0) );
          `;let u=`
        void ${a}(int bcastedIndices[${e}], out int realIndices[${n}]) {
          ${s}
          realIndices[${n-1}] = bcastedIndices[${e-1}];
          realIndices[${n-2}] = bcastedIndices[${e-2}];
        }
        `;t[a]=new K(u)}}),t}indicesToOffset(){let t={};return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n].shape,o=this.context.inputTextureLayouts[n].strides,a=i.length,s=`indicesToOffset_${r}`;t[s]=new K(e.indexToOffsetSingle(s,a,o)),t[s=`indicesToOffset_${r}_T`]=new K(e.indexToOffsetSingle(s,a,o.slice().reverse()))}),t}static indexToOffsetSingle(e,t,r){let n="";for(let e=t-1;e>=0;--e)n+=`
        offset += indices[${e}] * ${r[e]};
        `;return`
      int ${e}(int indices[${t}]) {
        int offset = 0;
        ${n}
        return offset;
      }
      `}offsetToIndices(){let t={};return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n].shape,o=this.context.inputTextureLayouts[n].strides,a=i.length,s=`offsetToIndices_${r}`;t[s]=new K(e.offsetToIndicesSingle(s,a,o)),t[s=`offsetToIndices_${r}_T`]=new K(e.offsetToIndicesSingle(s,a,o.slice().reverse()))}),t}static offsetToIndicesSingle(e,t,r){let n=[];for(let e=0;e<t-1;++e)n.push(`
      indices[${e}] = offset / ${r[e]};`),n.push(`
        offset -= indices[${e}] * ${r[e]};`);return n.push(`
      indices[${t-1}] = offset;`),`
      void ${e}(int offset, out int indices[${t}]) {
        ${n.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((t,r)=>{let n=this.context.inputTextureLayouts[r].shape,i=n.length,o=`incrementIndices_${t}`,a="";for(let e=0;e<i;++e)a+=`
        shape[${e}] = ${n[e]};`;let s=`
        void ${o}(int axis, out int indices[${i}]) {
          int shape[${i}];
          ${a};
          for(int i = ${i} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;e[o]=new K(s)}),e}}}),$y=N(()=>{"use strict";Qn(),ra=class extends zt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let e=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},r={};for(let n in t){let i=`${n}Vec`,o="";for(let r=0;r<e;++r)o+=`
          dest[${r}] ${t[n]} src[${r}];
          `;let a=`
        void ${i}(int src[${e}], out int dest[${e}]) {
          ${o}
        }
        `;r[i]=new K(a)}return r}copyVec(){let e=this.context.outputTextureLayout.shape.length,t="";for(let r=0;r<e;++r)t+=`
        dest[${r}] = src[${r}];
        `;let r=`
      void copyVec(int src[${e}], out int dest[${e}]) {
        ${t}
      }
      `;return{copyVec:new K(r)}}setVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index =${e} + index;
        if (index == 0)
            m[0] = value;
        `;for(let r=1;r<e-1;++r)t+=`
        else if (index == ${r})
            m[${r}] = value;
            `;t+=`
        else
            m[${e-1}] = value;
        `;let r=`
      void setVecItem(out int m[${e}], int index, int value) {
        ${t}
      }
        `;return{setVecItem:new K(r)}}getVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index = ${e} + index;
        if (index == 0)
            return m[0];
      `;for(let r=1;r<e-1;++r)t+=`
        else if (index == ${r})
            return m[${r}];
      `;t+=`
        else
            return m[${e-1}];
        `;let r=`
      int getVecItem(int m[${e}], int index) {
        ${t}
      }
    `;return{getVecItem:new K(r)}}}}),Ay=N(()=>{"use strict";xy(),Ty(),Iy(),Sy(),$y(),Zl={encoding:ea,fragcolor:ta,vec:ra,shapeUtils:na,coordinates:Yi}}),Oy=N(()=>{"use strict";Qn(),wy(),Ay(),Ze(),oa=class{constructor(e,t,r,n){this.libs={},this.glslLibRoutineDependencyGraph={},this.context=new Gi(e,t,r,n),Object.keys(Zl).forEach(e=>{let t=new Zl[e](this.context);this.libs[e]=t});let i=this.glslLibRoutineDependencyGraph;for(let e in this.libs){let t=this.libs[e].getFunctions();for(let r in t){let n=e+"."+r,o;i[n]?(o=i[n]).routineBody=t[r].routineBody:(o=new No(n,t[r].routineBody),i[n]=o);let a=t[r].dependencies;if(a)for(let e=0;e<a.length;++e)if(i[a[e]])o.addDependency(i[a[e]]);else{let t=new No(a[e]);i[a[e]]=t,o.addDependency(t)}}}}preprocess(){let e=this.context.programInfo,t=e.shaderSource;return this.context.programInfo.hasMain||(t=`${t}
      ${um(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),t=_y(t),`${sm(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(t)}
    ${t}`}getImports(e){let t=this.selectGlslLibRoutinesToBeIncluded(e);if(0===t.length)return"";let r="";for(let e=0;e<t.length;++e)if(t[e].routineBody)r+=t[e].routineBody+`
`;else throw Error(`Missing body for the Glsl Library routine: ${t[e].name}`);return r}selectGlslLibRoutinesToBeIncluded(e){let t=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(r=>{let n=r.split(".")[1];-1!==e.indexOf(n)&&t.push(this.glslLibRoutineDependencyGraph[r])}),Ui.returnOrderedNodes(t)}getUniforms(e,t){let r=[];if(e)for(let t of e)r.push(`uniform sampler2D ${t};`);if(t)for(let e of t)r.push(`uniform ${e.type} ${e.name}${e.arrayLength?`[${e.arrayLength}]`:""};`);return r.join(`
`)}}}),Py=N(()=>{"use strict";pt(),Ct(),Oy(),Ze(),ia=class{constructor(e,t,r){this.profiler=e,this.glContext=t,this.textureLayoutStrategy=r,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let n=this.glContext.gl,i=e.program;n.useProgram(i);try{this.bindOutput(r),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],t)}catch(t){throw ze.error("ProgramManager",e.programInfo.shaderSource),t}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,t,r){return this.profiler.event("backend","ProgramManager.build",()=>{let n=new oa(this.glContext,e,t,r),i=n.preprocess(),o=this.compile(i);return{programInfo:e,program:o,uniformLocations:this.getUniformLocations(o,n.context.programInfo.inputNames,n.context.programInfo.variables),attribLocations:this.getAttribLocations(o)}})}compile(e){if(!this.vertexShader){ze.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let e=am(this.glContext.version);this.vertexShader=this.glContext.compileShader(e,this.glContext.gl.VERTEX_SHADER)}pe.debug&&ze.verbose("ProrgramManager",`FragShader:
${e}
`);let t=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),r=this.glContext.createProgram(this.vertexShader,t);return this.glContext.deleteShader(t),r}bindOutput(e){let t=e.width,r=e.height;ze.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${t}/${r}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,t,r)}bindAttributes(e){let t=e.position,r=e.textureCoord;this.glContext.setVertexAttributes(t,r),this.attributesBound=!0}bindUniforms(e,t,r){let n=this.glContext.gl,i=0;for(let{name:o,type:a,location:s,arrayLength:u}of e){let e=t.find(e=>e.name===o)?.data;if("sampler2D"!==a&&!e)throw Error(`variable '${o}' does not have data defined in program info`);switch(a){case"sampler2D":this.bindTexture(r[i],s,i),i++;break;case"float":u?n.uniform1fv(s,e):n.uniform1f(s,e);break;case"int":u?n.uniform1iv(s,e):n.uniform1i(s,e);break;default:throw Error(`Uniform not implemented: ${a}`)}}}bindTexture(e,t,r){this.glContext.bindTextureToUniform(e.texture,r,t)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,t,r){let n=[];if(t)for(let r of t)n.push({name:r,type:"sampler2D",location:this.getUniformLocation(e,r)});if(r)for(let t of r)n.push({...t,location:this.getUniformLocation(e,t.name)});return n}getUniformLocation(e,t){let r=this.glContext.gl.getUniformLocation(e,t);if(null===r)throw Error(`Uniform ${t} not found.`);return r}getAttribLocation(e,t){return this.glContext.gl.getAttribLocation(e,t)}}}),Ey=N(()=>{"use strict";Ct(),Do(),aa=class{constructor(e,t,r,n){this.glContext=e,this.layoutStrategy=t,this.profiler=r,this.config=n,this.pendingRead=new Map,n.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,t,r,n){let i=this.toEncoderType(e),o=this.glContext.getEncoder(i,t.channels||1,n);if(t.isPacked&&1===n)throw Error("not implemented");let a=t.width,s=t.height,u,l;if(this.config.reuseTextures){u=`${a}x${s}_${o.format}_${o.internalFormat}_${o.textureType}`,(l=this.inUseTextures.get(u))||(l=[],this.inUseTextures.set(u,l));let t=this.idleTextures.get(u);if(t&&t.length>0){let i=t.pop();return l.push(i),1===n&&this.glContext.updateTexture(i,a,s,o,this.toTextureData(e,r)),i}}ze.verbose("TextureManager",`Creating new texture of size ${t.width}x${t.height}`);let d=this.glContext.allocateTexture(a,s,o,this.toTextureData(e,r));return this.config.reuseTextures&&(l.push(d),this.textureLookup.set(d,u)),d}readTexture(e,t,r){return r||(r=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let n=e.shape.reduce((e,t)=>e*t)*r,i=this.glContext.readTexture(e.texture,e.width,e.height,n,this.toEncoderType(t),r);return this.toTensorData(t,i)})}async readTextureAsync(e,t,r){let n=e.tensor.dataId;if(r||(r=1),this.pendingRead.has(n)){let e=this.pendingRead.get(n);return new Promise(t=>e?.push(t))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(n,[]);let i=e.shape.reduce((e,t)=>e*t)*r;await this.glContext.createAndWaitForFence();let o=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(t),r),a=this.toTensorData(t,o),s=this.pendingRead.get(n);return this.pendingRead.delete(n),s?.forEach(e=>e(a)),a})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let t=e.shape.reduce((e,t)=>e*t),r=this.glContext.readTexture(e.texture,e.width,e.height,4*t,"byte",4);return new Float32Array(r.buffer,r.byteOffset,t)})}releaseTexture(e,t){let r;if(this.config.reuseTextures&&(r=this.textureLookup.get(e.texture))){t&&this.textureLookup.delete(r);let n=this.inUseTextures.get(r);if(n){let t=n.indexOf(e.texture);if(-1!==t){n.splice(t,1);let i=this.idleTextures.get(r);i||(i=[],this.idleTextures.set(r,i)),i.push(e.texture)}}}(!r||t)&&(ze.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,t){switch(e){case"int16":return t instanceof Int16Array?t:Int16Array.from(t);case"int32":return t instanceof Int32Array?t:Int32Array.from(t);case"int8":return t instanceof Int8Array?t:Int8Array.from(t);case"uint16":return t instanceof Uint16Array?t:Uint16Array.from(t);case"uint32":return t instanceof Uint32Array?t:Uint32Array.from(t);case"uint8":case"bool":return t instanceof Uint8Array?t:Uint8Array.from(t);case"float32":return t instanceof Float32Array?t:Float32Array.from(t);case"float64":return t instanceof Float64Array?t:Float64Array.from(t);default:throw Error(`TensorData type ${e} is not supported`)}}toTextureData(e,t){if(t)return t instanceof Float32Array?t:new Float32Array(t)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}}),Cy=N(()=>{"use strict";Ct(),wf(),Tm(),by(),Py(),Xl(),Ey(),sa=class{constructor(e,t){this.backend=e,this.context=t,this.layoutStrategy=new Qi(e.glContext.maxTextureSize),this.programManager=new ia(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new aa(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:"full"===e.textureCacheMode}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Vi(this)}onGraphInitialized(e){let t=e.getValues().filter(e=>-1===e.from&&e.tensor).map(e=>e.tensor.dataId);this.initializers=new Set(t)}isInitializer(e){return!!this.initializers&&this.initializers.has(e)}addInitializer(e){this.initializers.add(e)}getTextureData(e,t){return t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,r=!1){ze.verbose("WebGLSessionHandler","Storing Texture data in cache"),r?this.packedTextureDataCache.set(e,t):this.unpackedTextureDataCache.set(e,t)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,t,r){let n=_f(e,t,gy);return{impl:n.opImpl,context:n.opInit?n.opInit(e,r):e}}}});function KP(e){let t=0;for(;t<e.length&&e[t]();++t);return t-1}var zo,Dy=N(()=>{"use strict";pt(),Do(),Do(),zn(),zo=class{constructor(e,t){this.frameBufferBound=!1,this.itemsToPoll=[],this.gl=e,this.version=t,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,t,r,n){let i=this.gl,o=i.createTexture();i.bindTexture(i.TEXTURE_2D,o),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let a=n?r.encode(n,e*t):null;return i.texImage2D(i.TEXTURE_2D,0,r.internalFormat,e,t,0,r.format,r.textureType,a),this.checkError(),o}updateTexture(e,t,r,n,i){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e);let a=n.encode(i,t*r);o.texSubImage2D(o.TEXTURE_2D,0,0,0,t,r,n.format,n.textureType,a),this.checkError()}attachFramebuffer(e,t,r){let n=this.gl;n.bindTexture(n.TEXTURE_2D,e),n.bindFramebuffer(n.FRAMEBUFFER,this.framebuffer),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0),this.checkError(),n.viewport(0,0,t,r),n.scissor(0,0,t,r)}readTexture(e,t,r,n,i,o){let a=this.gl;o||(o=1),this.frameBufferBound||this.attachFramebuffer(e,t,r);let s=this.getEncoder(i,o),u=s.allocate(t*r);return a.bindTexture(a.TEXTURE_2D,e),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),a.readPixels(0,0,t,r,a.RGBA,s.textureType,u),this.checkError(),s.decode(u,n)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,t){let r=this.gl;r.vertexAttribPointer(e,3,r.FLOAT,!1,20,0),r.enableVertexAttribArray(e),-1!==t&&(r.vertexAttribPointer(t,2,r.FLOAT,!1,20,12),r.enableVertexAttribArray(t)),this.checkError()}createProgram(e,t){let r=this.gl,n=r.createProgram();return r.attachShader(n,e),r.attachShader(n,t),r.linkProgram(n),n}compileShader(e,t){let r=this.gl,n=r.createShader(t);if(!n)throw Error(`createShader() returned null with type ${t}`);if(r.shaderSource(n,e),r.compileShader(n),!1===r.getShaderParameter(n,r.COMPILE_STATUS))throw Error(`Failed to compile shader: ${r.getShaderInfoLog(n)}
Shader source:
${e}`);return n}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,t,r){let n=this.gl;n.activeTexture(n.TEXTURE0+t),this.checkError(),n.bindTexture(n.TEXTURE_2D,e),this.checkError(),n.uniform1i(r,t),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(pe.debug){let e=this.gl,t=e.getError(),r="";switch(t){case e.NO_ERROR:return;case e.INVALID_ENUM:r="INVALID_ENUM";break;case e.INVALID_VALUE:r="INVALID_VALUE";break;case e.INVALID_OPERATION:r="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:r="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:r="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:r="CONTEXT_LOST_WEBGL";break;default:r=`Unknown WebGL Error: ${t.toString(16)}`}throw Error(r)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,t,r=0){if(2===this.version)return new Bi(this.gl,t);switch(e){case"float":return 1===r||this.isRenderFloat32Supported?new Co(this.gl,t):new Co(this.gl,t,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw Error("not implemented");case"byte":return new Fi(this.gl,t);default:throw Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let t=0;t<this.maxTextureImageUnits;++t)e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,t=e.createBuffer();if(!t)throw Error("createBuffer() returned null");let r=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),this.checkError(),t}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),1===this.version&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){2===this.version?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);let r=2===this.version?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,r,1,1,0,e.RGBA,e.FLOAT,null);let n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(t),e.deleteFramebuffer(n),i}checkRenderFloat32(){if(2===this.version){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(2===this.version){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,t,r,n,i,o;try{t=e.createTexture(),r=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,t);let a=2===this.version?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,a,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),e.enable(e.BLEND),!!(n=e.createShader(e.VERTEX_SHADER))&&(e.shaderSource(n,"void main(){}"),e.compileShader(n),!!(i=e.createShader(e.FRAGMENT_SHADER)))&&(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),!!(o=e.createProgram()))&&(e.attachShader(o,n),e.attachShader(o,i),e.linkProgram(o),e.useProgram(o),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),o&&e.deleteProgram(o),n&&e.deleteShader(n),i&&e.deleteShader(i),r&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(r)),t&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(t))}}beginTimer(){if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension,r=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,r),r}throw Error("WebGL1 profiling currently not supported.")}endTimer(){if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension;e.endQuery(t.TIME_ELAPSED_EXT);return}throw Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let t=!1,r=!1;if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let n=this.gl,i=this.disjointTimerQueryWebgl2Extension;t=n.getQueryParameter(e,n.QUERY_RESULT_AVAILABLE),r=n.getParameter(i.GPU_DISJOINT_EXT)}else throw Error("WebGL1 profiling currently not supported");return t&&!r}getTimerResult(e){let t=0;if(2===this.version){let r=this.gl;t=r.getQueryParameter(e,r.QUERY_RESULT),r.deleteQuery(e)}else throw Error("WebGL1 profiling currently not supported");return t/1e6}async waitForQueryAndGetTime(e){return await vl(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,r=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),t=null===r?()=>!0:()=>{let t=e.clientWaitSync(r,0,0);return t===e.ALREADY_SIGNALED||t===e.CONDITION_SATISFIED},{query:r,isFencePassed:t}}async pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=KP(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,t){this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1||await vl(()=>(this.pollItems(),0===this.itemsToPoll.length))}}});function Jl(e){let t;if((!e||"webgl2"===e)&&"webgl2"in so?t=so.webgl2:(!e||"webgl"===e)&&"webgl"in so&&(t=so.webgl),!t)try{let r=ZP();t=ky(r,e)}catch{t=ky(XP(),e)}e=e||1===t.version?"webgl":"webgl2";let r=t.gl;return so[e]=t,r.isContextLost()?(delete so[e],Jl(e)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),t)}function ky(e,t){let r,n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1};if((!t||"webgl2"===t)&&(r=e.getContext("webgl2",n)))try{return new zo(r,2)}catch(e){ze.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${e}`)}if((!t||"webgl"===t)&&(r=e.getContext("webgl",n)||e.getContext("experimental-webgl",n)))try{return new zo(r,1)}catch(e){ze.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${e}`)}throw Error("WebGL is not supported")}function XP(){if(typeof document>"u")throw TypeError("failed to create canvas: document is not supported");let e=document.createElement("canvas");return e.width=1,e.height=1,e}function ZP(){if(typeof OffscreenCanvas>"u")throw TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var so,ua,Ny=N(()=>{"use strict";Ct(),Dy(),so={}}),Ly=N(()=>{"use strict";pt(),Ct(),Cy(),Ny(),ua=class{get contextId(){return pe.webgl.contextId}set contextId(e){pe.webgl.contextId=e}get matmulMaxBatchSize(){return pe.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){pe.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return pe.webgl.textureCacheMode}set textureCacheMode(e){pe.webgl.textureCacheMode=e}get pack(){return pe.webgl.pack}set pack(e){pe.webgl.pack=e}get async(){return pe.webgl.async}set async(e){pe.webgl.async=e}initialize(){try{return this.glContext=Jl(this.contextId),"number"!=typeof this.matmulMaxBatchSize&&(this.matmulMaxBatchSize=16),"string"!=typeof this.textureCacheMode&&(this.textureCacheMode="full"),"boolean"!=typeof this.pack&&(this.pack=!1),"boolean"!=typeof this.async&&(this.async=!1),ze.setWithEnv(pe),pe.webgl.context||Object.defineProperty(pe.webgl,"context",{value:this.glContext.gl}),ze.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return ze.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new sa(this,e)}dispose(){this.glContext.dispose()}}});async function Ql(e){if(!e)return Ql(["webgl"]);for(let t of"string"==typeof e?[e]:e){let e=Ry.get(t);if(e)return e;let r=await QP(t);if(r)return r}throw Error("no available backend to use")}async function QP(e){let t=JP;if("u">typeof t[e]&&YP(t[e])){let r=t[e],n=r.initialize();if("object"==typeof n&&"then"in n&&(n=await n),n)return Ry.set(e,r),r}}function YP(e){return"initialize"in e&&"function"==typeof e.initialize&&"createSessionHandler"in e&&"function"==typeof e.createSessionHandler&&"dispose"in e&&"function"==typeof e.dispose}var Ry,JP,Yl,la,Se,Mo,tc,nc,Fn,ca,ec,Vy,Gy,da,pa,fa,zy=N(()=>{"use strict";Ly(),Ry=new Map,JP={webgl:new ua}}),My=N(()=>{"use strict";Ct(),Yl=class{constructor(e,t){this.op=e,this.node=t}},la=class{constructor(e,t,r){this.graph=e,this.profiler=r,this.initialize(t)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let t=this.graph.getNodes();if(t.length!==e.length)throw Error("The size of nodes and OPs do not match.");this._ops=e.map((e,r)=>new Yl(e,t[r])),this.reset(),this._starter=[],this._ops.forEach((e,t)=>{let r=!0;for(let t of e.node.inputs)if(!this._values[t]&&-1===this.graph.getInputIndices().indexOf(t)){r=!1;break}r&&this._starter.push(t)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,t){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let r=e.createInferenceHandler(),n=this.graph.getInputIndices();if(t.length!==n.length)throw Error(`number of input tensors don't match the number of inputs to the model: actual: ${t.length} expected: ${n.length}`);t.forEach((e,t)=>{let r=n[t];this._values[r]=e});let i=this._starter.slice(0),o=this.graph.getValues(),a=this.graph.getNodes(),s=0;for(;s<i.length;){let e=i[s++],t=this._ops[e],n=t.node.inputs.map(e=>this._values[e]);if(-1!==n.indexOf(void 0))throw Error(`unresolved input detected: op: ${t.node}`);ze.verbose("ExecPlan",`Running op:${t.node.name} (${n.map((e,r)=>`'${t.node.inputs[r]}': ${e.type}[${e.dims.join(",")}]`).join(", ")})`);let u=await this.profiler.event("node",t.node.name,async()=>t.op.impl(r,n,t.op.context));if(u.length!==t.node.outputs.length)throw Error("the size of output does not match model definition.");u.forEach((e,r)=>{let n=t.node.outputs[r];if(this._values[n])throw Error(`output [${n}] already has value: op:${t.node.name}`);this._values[n]=e});let l=new Set;u.forEach((e,r)=>{for(let e of o[t.node.outputs[r]].to){let t=a[e],r=!0;for(let e of t.inputs)if(!this._values[e]){r=!1;break}r&&l.add(e)}}),i.push(...l)}let u=[];for(let e=0;e<this.graph.getOutputIndices().length;e++){let t=this.graph.getOutputIndices()[e],r=this._values[t];if(void 0===r)throw Error(`required output [${t}] does not have value`);0===t?await r.getData():r.data,u.push(r)}return ze.verbose("ExecPlan","disposing of inferenceHandler"),r.dispose(),u})}}}),By=N(()=>{"use strict";So(),Se=_e(Yr()),Rr(),Le(),Mo=class e{constructor(t){if(this._attributes=new Map,null!=t){for(let r of t)r instanceof Se.onnx.AttributeProto?this._attributes.set(r.name,[e.getValue(r),e.getType(r)]):r instanceof Ci.Attribute&&this._attributes.set(r.name(),[e.getValue(r),e.getType(r)]);if(this._attributes.size<t.length)throw Error("duplicated attribute names")}}set(e,t,r){this._attributes.set(e,[r,t])}delete(e){this._attributes.delete(e)}getFloat(e,t){return this.get(e,"float",t)}getInt(e,t){return this.get(e,"int",t)}getString(e,t){return this.get(e,"string",t)}getTensor(e,t){return this.get(e,"tensor",t)}getFloats(e,t){return this.get(e,"floats",t)}getInts(e,t){return this.get(e,"ints",t)}getStrings(e,t){return this.get(e,"strings",t)}getTensors(e,t){return this.get(e,"tensors",t)}get(e,t,r){let n=this._attributes.get(e);if(void 0===n){if(void 0!==r)return r;throw Error(`required attribute not found: ${e}`)}if(n[1]!==t)throw Error(`type mismatch: expected ${t} but got ${n[1]}`);return n[0]}static getType(e){let t=e instanceof Se.onnx.AttributeProto?e.type:e.type();switch(t){case Se.onnx.AttributeProto.AttributeType.FLOAT:return"float";case Se.onnx.AttributeProto.AttributeType.INT:return"int";case Se.onnx.AttributeProto.AttributeType.STRING:return"string";case Se.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case Se.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case Se.onnx.AttributeProto.AttributeType.INTS:return"ints";case Se.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case Se.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw Error(`attribute type is not supported yet: ${Se.onnx.AttributeProto.AttributeType[t]}`)}}static getValue(e){let t=e instanceof Se.onnx.AttributeProto?e.type:e.type();if(t===Se.onnx.AttributeProto.AttributeType.GRAPH||t===Se.onnx.AttributeProto.AttributeType.GRAPHS)throw Error("graph attribute is not supported yet");let r=this.getValueNoCheck(e);if(t===Se.onnx.AttributeProto.AttributeType.INT&&xt.isLong(r))return xt.longToNumber(r);if(t===Se.onnx.AttributeProto.AttributeType.INTS){let e=Array(r.length);for(let t=0;t<r.length;t++){let n=r[t];e[t]=xt.longToNumber(n)}return e}if(t===Se.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof Se.onnx.AttributeProto?rt.fromProto(r):rt.fromOrtTensor(r);if(t===Se.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof Se.onnx.AttributeProto)return r.map(e=>rt.fromProto(e));if(e instanceof Ci.Attribute)return r.map(e=>rt.fromOrtTensor(e))}return t===Se.onnx.AttributeProto.AttributeType.STRING&&e instanceof Se.onnx.AttributeProto?Eo(r):t===Se.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof Se.onnx.AttributeProto?r.map(Eo):r}static getValueNoCheck(e){return e instanceof Se.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case Se.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case Se.onnx.AttributeProto.AttributeType.INT:return e.i;case Se.onnx.AttributeProto.AttributeType.STRING:return e.s;case Se.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case Se.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case Se.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case Se.onnx.AttributeProto.AttributeType.INTS:return e.ints;case Se.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case Se.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case Se.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw Error(`unsupported attribute type: ${Se.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case Lt.AttributeType.FLOAT:return e.f();case Lt.AttributeType.INT:return e.i();case Lt.AttributeType.STRING:return e.s();case Lt.AttributeType.TENSOR:return e.t();case Lt.AttributeType.GRAPH:return e.g();case Lt.AttributeType.FLOATS:return e.floatsArray();case Lt.AttributeType.INTS:{let t=[];for(let r=0;r<e.intsLength();r++)t.push(e.ints(r));return t}case Lt.AttributeType.STRINGS:{let t=[];for(let r=0;r<e.stringsLength();r++)t.push(e.strings(r));return t}case Lt.AttributeType.TENSORS:{let t=[];for(let r=0;r<e.tensorsLength();r++)t.push(e.tensors(r));return t}default:throw Error(`unsupported attribute type: ${Lt.AttributeType[e.type()]}`)}}}}),Fy=N(()=>{"use strict";By(),So(),tc=_e(Yr()),Rr(),Le(),nc={from:(e,t)=>new ec(e,t)},Fn=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=ft.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},ca=class{constructor(e,t){e instanceof tc.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Mo(e.attribute)):e instanceof rl.Node&&(this.name=t??e.name(),this.opType=e.opType(),this.attributes=new Mo(ft.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},ec=class{constructor(e,t){if(!e)throw TypeError("graph is empty");this.buildGraph(e),this.transformGraph(t),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof tc.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof tl.Graph)this.buildGraphFromOrtFormat(e);else throw TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let r=new Map;if(!e.input)throw Error("missing information in graph: input");let n=[];for(let r of e.input){if(t.has(r.name))throw Error(`duplicated input name: ${r.name}`);let e=this._allData.push(new Fn(r))-1;t.set(r.name,e),n.push(r.name)}if(!e.initializer)throw Error("missing information in graph: initializer");for(let r of e.initializer){let e=t.get(r.name);if(void 0===e){let n=new Fn;n.type={shape:{dims:ft.tensorDimsFromProto(r.dims)},tensorType:ft.tensorDataTypeFromProto(r.dataType)},e=this._allData.push(n)-1,t.set(r.name,e)}this._allData[e]._from=-1,this._allData[e].tensor=rt.fromProto(r)}for(let e=0;e<this._allData.length;e++)this._allData[e].tensor||(this._allInputIndices.push(e),this._allInputNames.push(n[e]));if(!e.output)throw Error("missing information in graph: output");for(let r of e.output){if(t.has(r.name))throw Error(`duplicated output name: ${r.name}`);let e=this._allData.push(new Fn(r))-1;t.set(r.name,e),this._allOutputIndices.push(e),this._allOutputNames.push(r.name)}if(!e.node)throw Error("missing information in graph: node");for(let t of e.node){if(!t.name)for(let e=0;;e++){let n=`unnamed_${t.opType}_${e}`;if(!r.has(n)){t.name=n;break}}if(r.has(t.name))throw Error(`duplicated node name: ${t.name}`);let e=this._nodes.push(new ca(t))-1;r.set(t.name,e)}for(let r=0;r<this._nodes.length;r++){let n=this._nodes[r],i=e.node[r];if(!i.output)throw Error(`missing output for node: ${i.name}`);for(let e of i.output){let o=t.get(e);if(typeof o>"u"&&(o=this._allData.push(new Fn)-1,t.set(e,o)),n.outputs.push(o),void 0!==this._allData[o]._from)throw Error(`multiple nodes output to one data value: ${o}`);if(this._allData[o]._from=r,"Constant"===i.opType){if(!i.attribute||1!==i.attribute.length||!i.attribute[0].t)throw Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!i.output||1!==i.output.length)throw Error("missing output or incorrect number of outputs for this Constant operator");n.outputs.pop(),n.executeNode=!1,this._allData[o]._from=-1,this._allData[o].tensor=rt.fromProto(i.attribute[0].t)}}}for(let r=0;r<this._nodes.length;r++){let n=this._nodes[r],i=e.node[r];if(!i.input)throw Error(`missing input for node: ${i.name}`);for(let e of i.input){let o=t.get(e);if(typeof o>"u"){if(""===e&&(3===i.input.length||4===i.input.length)&&"Resize"===i.opType)continue;throw Error(`unrecognized input '${e}' for node: ${i.name}`)}n.inputs.push(o),this._allData[o]._to.push(r)}}return!0}buildGraphFromOrtFormat(e){let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let r=new Map,n=[];for(let r=0;r<e.inputsLength();r++){let i=e.inputs(r);if(t.has(i))throw Error(`duplicated input name: ${i}`);for(let r=0;r<e.nodeArgsLength();r++)if(e.nodeArgs(r)?.name()===i){let o=new Fn;if(e.nodeArgs(r)?.type()?.valueType()!==il.TypeInfoValue.tensor_type)throw Error("Unexpected value type for the nodeArg.");let a=e.nodeArgs(r).type().value(new ol.TensorTypeAndShape),s=ft.tensorDataTypeFromProto(a.elemType()),u=a.shape(),l=[];for(let e=0;e<u.dimLength();e++)l.push(xt.longToNumber(u.dim(e).value().dimValue()));o.type={shape:{dims:l},tensorType:s};let d=this._allData.push(o)-1;t.set(i,d),n.push(i)}}for(let r=0;r<e.initializersLength();r++){let n=e.initializers(r),i=t.get(n.name());if(void 0===i){let e=new Fn;e.type={shape:{dims:ft.tensorDimsFromORTFormat(n)},tensorType:ft.tensorDataTypeFromProto(n.dataType())},i=this._allData.push(e)-1,t.set(n.name(),i)}this._allData[i]._from=-1,this._allData[i].tensor=rt.fromOrtTensor(n)}for(let e=0;e<this._allData.length;e++)this._allData[e].tensor||(this._allInputIndices.push(e),this._allInputNames.push(n[e]));for(let r=0;r<e.outputsLength();r++){let n=e.outputs(r);if(t.has(n))throw Error(`duplicated output name: ${n}`);let i=this._allData.push(new Fn)-1;t.set(n,i),this._allOutputIndices.push(i),this._allOutputNames.push(n)}if(!e.nodes)throw Error("missing information in graph: node");for(let t=0;t<e.nodesLength();t++){let n=e.nodes(t),i=n.name();if(!i)for(let e=0;i=`unnamed_${n.opType()}_${e}`,r.has(i);e++);if(r.has(i))throw Error(`duplicated node name: ${i}`);let o=this._nodes.push(new ca(n,i))-1;r.set(i,o)}for(let r=0;r<this._nodes.length;r++){let n=this._nodes[r],i=e.nodes(r);if(null==i)throw Error(`No node exists at index ${r}`);if(i?.outputsLength()===0)throw Error(`missing output for node: ${i.name}`);for(let e=0;e<i?.outputsLength();e++){let o=i?.outputs(e),a=t.get(o);if(typeof a>"u"&&(a=this._allData.push(new Fn)-1,t.set(o,a)),n.outputs.push(a),void 0!==this._allData[a]._from)throw Error(`multiple nodes output to one data value: ${a}`);if(this._allData[a]._from=r,"Constant"===i.opType()){if(1!==i.attributesLength()||!i.attributes(0).t())throw Error("missing attributes or missing tensor value in attributes for this Constant operator");if(1!==i.outputsLength())throw Error("missing output or incorrect number of outputs for this Constant operator");n.outputs.pop(),n.executeNode=!1,this._allData[a]._from=-1,this._allData[a].tensor=rt.fromOrtTensor(i.attributes(0).t())}}}for(let r=0;r<this._nodes.length;r++){let n=this._nodes[r],i=e.nodes(r);if(0===i.inputsLength())throw Error(`missing input for node: ${i.name}`);for(let e=0;e<i.inputsLength();e++){let o=i.inputs(e),a=t.get(o);if(typeof a>"u")throw Error(`unrecognized input '${o}' for node: ${i.name()}`);n.inputs.push(a),this._allData[a]._to.push(r)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(t=>{this._allData[t]._to.forEach(t=>{e.add(t)})});let t=Array.from(e),r=Array(this._nodes.length).fill("white");for(;t.length>0;){let e=t.pop();"gray"===r[e]?r[e]="black":(t.push(e),r[e]="gray",this._nodes[e].outputs.forEach(n=>{let i=this._allData[n];if("u">typeof i.tensor)throw Error("node outputs should not be initialized");if(i._from!==e)throw Error("from property of the Value object doesn't match index of Node being processed");i._to.forEach(e=>{if("gray"===r[e])throw Error("model graph is cyclic");"white"===r[e]&&t.push(e)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,t=[this._nodes.length,0],r=0;for(let e=0;e<this._nodes.length;e++)t[e]=r,this._nodes[e].executeNode?(r!==e&&(this._nodes[r]=this._nodes[e]),r++):this._nodes[e].outputs.forEach(e=>{this._allData[e]._from=-2});this._nodes.splice(r,this._nodes.length-r);for(let e=0;e<this._allData.length;e++){let r=this._allData[e];void 0!==r._from&&-1!==r._from&&-2!==r._from&&(r._from=t[r._from]);for(let e=0;e<r._to.length;e++)if(r._to[e]>=0)r._to[e]=t[r._to[e]];else throw Error("Trying to update a removed node")}e=0;for(let t=0;t<this._allData.length;t++){if(-2===this._allData[t].from&&-1===this._allOutputIndices.indexOf(t+e)){e++,this._allData.splice(t,1),t--;continue}if(e>0){let r=-1;void 0!==this._allData[t].from&&-1!==this._allData[t].from?-1!==(r=this._nodes[this._allData[t].from].outputs.indexOf(t+e))&&(this._nodes[this._allData[t].from].outputs[r]=t):-1!==(r=this._allInputIndices.indexOf(t+e))&&(this._allInputIndices[r]=t),this._allData[t].to.forEach(n=>{-1!==(r=this._nodes[n].inputs.indexOf(t+e))&&(this._nodes[n].inputs[r]=t)}),0===this._allData[t].to.length&&-1!==(r=this._allOutputIndices.indexOf(t+e))&&(this._allOutputIndices[r]=t)}}}deleteNode(e){let t=this._nodes[e];if(t.outputs.length>1){for(let e=1;e<t.outputs.length;e++)if(this._allData[t.outputs[e]].to.length>0)throw Error("Node deletion with more than one output connected to other nodes is not supported. ")}t.executeNode=!1;let r=t.inputs[0],n=t.outputs[0],i=this._allData[n].to;for(let r=0;r<t.inputs.length;r++){let n=this._allData[t.inputs[r]].to.indexOf(e);if(-1===n)throw Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[t.inputs[r]].to.splice(n,1)}this._allData[n]._to=[];let o=this._allOutputIndices.indexOf(n);if(-1!==o&&(this._allOutputIndices[o]=r),i&&i.length>0)for(let e of i){let t=this._nodes[e].inputs.indexOf(n);if(-1===t)throw Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[e].inputs[t]=r,this._allData[r].to.push(e)}}removeAllDropoutNodes(){let e=0;for(let t of this._nodes){if("Dropout"===t.opType){if(1!==t.inputs.length)throw Error("Dropout nodes should only contain one input. ");if(1!==t.outputs.length&&2!==t.outputs.length)throw Error("Dropout nodes should contain either 1 or 2 output(s)");if(2===t.outputs.length&&0!==this._allData[t.outputs[1]]._to.length)throw Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let t of this._nodes)"Identity"===t.opType&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if("Conv"===e.opType){let t=this._allData[e.outputs[0]]._to;if(1===t.length&&this.isActivation(this._nodes[t[0]])){let r=this._nodes[t[0]];if("Clip"===r.opType)if(1===r.inputs.length)try{e.attributes.set("activation_params","floats",[r.attributes.getFloat("min"),r.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[Nr,Lr])}else{if(!(r.inputs.length>=3)||void 0===this._allData[r.inputs[1]].tensor||void 0===this._allData[r.inputs[2]].tensor)continue;e.attributes.set("activation_params","floats",[this._allData[r.inputs[1]].tensor.floatData[0],this._allData[r.inputs[2]].tensor.floatData[0]])}e.attributes.set("activation","string",r.opType),this.deleteNode(t[0])}}}}}),Uy=N(()=>{"use strict";Vy=_e(Ne()),Fy(),So(),Gy=_e(Yr()),Le(),da=class{load(e,t,r){let n;if(!r)try{this.loadFromOnnxFormat(e,t);return}catch(e){if(void 0!==r)throw e;n=e}try{this.loadFromOrtFormat(e,t)}catch(e){throw void 0!==r?e:Error(`Failed to load model as ONNX format: ${n}
as ORT format: ${e}`)}}loadFromOnnxFormat(e,t){let r=Gy.onnx.ModelProto.decode(e);if(3>xt.longToNumber(r.irVersion))throw Error("only support ONNX model with IR_VERSION>=3");this._opsets=r.opsetImport.map(e=>({domain:e.domain,version:xt.longToNumber(e.version)})),this._graph=nc.from(r.graph,t)}loadFromOrtFormat(e,t){let r=new Vy.ByteBuffer(e),n=nl.InferenceSession.getRootAsInferenceSession(r).model();if(3>xt.longToNumber(n.irVersion()))throw Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let e=0;e<n.opsetImportLength();e++){let t=n.opsetImport(e);this._opsets.push({domain:t?.domain(),version:xt.longToNumber(t.version())})}this._graph=nc.from(n.graph(),t)}get graph(){return this._graph}get opsets(){return this._opsets}}}),Wy=N(()=>{"use strict";zy(),My(),Ct(),Uy(),pa=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=bi.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,t,r){await this.profiler.event("session","Session.loadModel",async()=>{let n=await Ql(this.backendHint);if(this.sessionHandler=n.createSessionHandler(this.context),this._model=new da,"string"==typeof e){let t=e.endsWith(".ort");{let r=await (await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(r),t)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let n=new Uint8Array(e,t||0,r||e.byteLength);this.initialize(n)}})}initialize(e,t){if(this._initialized)throw Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let r=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,r,t),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new la(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let t=this.normalizeAndValidateInputs(e),r=await this._executionPlan.execute(this.sessionHandler,t);return this.createOutput(r)})}normalizeAndValidateInputs(e){let t=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==t.length)throw Error(`incorrect input array length: expected ${t.length} but got ${e.length}`)}else{if(e.size!==t.length)throw Error(`incorrect input map size: expected ${t.length} but got ${e.size}`);let r=Array(e.size),n=0;for(let i=0;i<t.length;++i){let o=e.get(t[i]);if(!o)throw Error(`missing input tensor for: '${name}'`);r[n++]=o}e=r}if(this.context.graphInputTypes&&0!==this.context.graphInputTypes.length&&this.context.graphInputDims&&0!==this.context.graphInputDims.length)this.validateInputTensorDims(this.context.graphInputDims,e,!1);else{let t=this._model.graph.getInputIndices(),r=this._model.graph.getValues(),n=Array(t.length);for(let i=0;i<t.length;++i){let o=r[t[i]];n[i]=o.type.shape.dims,this.context.graphInputTypes.push(o.type.tensorType),this.context.graphInputDims.push(e[i].dims)}this.validateInputTensorDims(n,e,!0)}return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,t){for(let r=0;r<t.length;r++){let n=e[r],i=t[r].type;if(n!==i)throw Error(`input tensor[${r}] check failed: expected type '${n}' but got ${i}`)}}validateInputTensorDims(e,t,r){for(let n=0;n<t.length;n++){let i=e[n],o=t[n].dims;if(!this.compareTensorDims(i,o,r))throw Error(`input tensor[${n}] check failed: expected shape '[${i.join(",")}]' but got [${o.join(",")}]`)}}compareTensorDims(e,t,r){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n]&&(!r||0!==e[n]))return!1;return!0}createOutput(e){let t=this._model.graph.getOutputNames();if(e.length!==t.length)throw Error("expected number of outputs do not match number of generated outputs");let r=new Map;for(let n=0;n<t.length;++n)r.set(t[n],e[n]);return r}initializeOps(e){let t=e.getNodes();this._ops=Array(t.length);for(let r=0;r<t.length;r++)this._ops[r]=this.sessionHandler.resolve(t[r],this._model.opsets,e)}}}),Hy=N(()=>{"use strict";pt(),Rr(),fa=class{constructor(e){this.session=e,this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,t,r){let n=new Map;for(let t in e)if(Object.hasOwnProperty.call(e,t)){let r=e[t];n.set(t,new rt(r.dims,r.type,void 0,void 0,r.data))}let i=await this.session.run(n),o={};return i.forEach((e,t)=>{o[t]=new St(e.type,e.data,e.dims)}),o}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}}),qy={};Sr(qy,{onnxjsBackend:()=>e3});var e3,jy=N(()=>{"use strict";Wy(),Hy(),e3=new class{async init(){}async createInferenceSessionHandler(e,t){let r=new pa(t);return await r.loadModel(e),new fa(r)}}}),ha=N(()=>{}),Zy={};Sr(Zy,{default:()=>t3});var Ky,Xy,t3,Jy=N(()=>{"use strict";oc(),br(),ma(),Ky="ort-wasm-proxy-worker",(Xy=globalThis.self?.name===Ky)&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":ga(r.wasm).then(()=>{ba(r).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})})},e=>{postMessage({type:t,err:e})});break;case"init-ep":{let{epName:e,env:n}=r;ya(n,e).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})});break}case"copy-from":{let{buffer:e}=r,n=Bo(e);postMessage({type:t,out:n});break}case"create":{let{model:e,options:n}=r;_a(e,n).then(e=>{postMessage({type:t,out:e})},e=>{postMessage({type:t,err:e})});break}case"release":wa(r),postMessage({type:t});break;case"run":{let{sessionId:e,inputIndices:n,inputs:i,outputIndices:o,options:a}=r;va(e,n,i,o,Array(o.length).fill(null),a).then(e=>{e.some(e=>"cpu"!==e[3])?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:e},Ta([...i,...e]))},e=>{postMessage({type:t,err:e})});break}case"end-profiling":xa(r),postMessage({type:t})}}catch(e){postMessage({type:t,err:e})}}),t3=Xy?null:e=>new Worker(e??Ot,{type:"module",name:Ky})}),Yy={};async function Qy(e={}){var t=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,n=r&&self.name?.startsWith("em-pthread");e.mountExternalData=(t,r)=>{t.startsWith("./")&&(t=t.substring(2)),(e.Zc||(e.Zc=new Map)).set(t,r)},e.unmountExternalData=()=>{delete e.Zc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,ae:!0}).buffer.constructor;let i=t=>async(...r)=>{try{if(e.$c)throw Error("Session already started");let n=e.$c={Nd:r[0],errors:[]},i=await t(...r);if(e.$c!==n)throw Error("Session mismatch");e.gd?.flush();let o=n.errors;if(0<o.length){let e=await Promise.all(o);if(e=e.filter(e=>e),0<e.length)throw Error(e.join(`
`))}return i}finally{e.$c=null}};e.jsepInit=(t,r)=>{if("webgpu"===t){[e.gd,e.Dd,e.Hd,e.jd,e.Gd,e.ac,e.Id,e.Kd,e.Ed,e.Fd,e.Jd]=r;let t=e.gd;e.jsepRegisterBuffer=(e,r,n,i)=>t.registerBuffer(e,r,n,i),e.jsepGetBuffer=e=>t.getBuffer(e),e.jsepCreateDownloader=(e,r,n)=>t.createDownloader(e,r,n),e.jsepOnCreateSession=e=>{t.onCreateSession(e)},e.jsepOnReleaseSession=e=>{t.onReleaseSession(e)},e.jsepOnRunStart=e=>t.onRunStart(e),e.Ld=(e,r)=>{t.upload(e,r)}}else if("webnn"===t){let t=r[0];[e.Zd,e.vd,e.webnnEnsureTensor,e.xd,e.webnnDownloadTensor,e.Yd,e.webnnEnableTraceEvent]=r.slice(1),e.webnnReleaseTensorId=e.vd,e.webnnUploadTensor=e.xd,e.webnnRegisterMLContext=e.Yd,e.webnnOnRunStart=e=>t.onRunStart(e),e.webnnOnRunEnd=t.onRunEnd.bind(t),e.webnnOnReleaseSession=e=>{t.onReleaseSession(e)},e.webnnCreateMLTensorDownloader=(e,r)=>t.createMLTensorDownloader(e,r),e.webnnRegisterMLTensor=(e,r,n,i)=>t.registerMLTensor(e,r,n,i),e.webnnCreateMLContext=e=>t.createMLContext(e),e.webnnRegisterMLConstant=(r,n,i,o,a,s)=>t.registerMLConstant(r,n,i,o,a,e.Zc,s),e.webnnRegisterGraphInput=t.registerGraphInput.bind(t),e.webnnIsGraphInput=t.isGraphInput.bind(t),e.webnnRegisterGraphOutput=t.registerGraphOutput.bind(t),e.webnnIsGraphOutput=t.isGraphOutput.bind(t),e.webnnCreateTemporaryTensor=t.createTemporaryTensor.bind(t),e.webnnIsGraphInputOutputTypeSupported=t.isGraphInputOutputTypeSupported.bind(t)}};let o=()=>{let t=e=>(...t)=>{let r=rM;return t=e(...t),rM!=r?new Promise((e,t)=>{rG={resolve:e,reject:t}}):t};(()=>{for(let r of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])e[r]=t(e[r])})(),void 0!==i&&(e._OrtRun=i(e._OrtRun),e._OrtRunWithBinding=i(e._OrtRunWithBinding)),o=void 0};e.asyncInit=()=>{o?.()};var a,s,u=(e,t)=>{throw t},l=import.meta.url,d="";if(t||r){try{d=new URL(".",l).href}catch{}r&&(s=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),a=async e=>{if(w(e))return new Promise((t,r)=>{var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=()=>{200==n.status||0==n.status&&n.response?t(n.response):r(n.status)},n.onerror=r,n.send(null)});var t=await fetch(e,{credentials:"same-origin"});if(t.ok)return t.arrayBuffer();throw Error(t.status+" : "+t.url)}}var p,c,h,f,m,g,b=console.log.bind(console),y=console.error.bind(console),_=b,v=y,x=!1,w=e=>e.startsWith("file://");function $(){eR.buffer!=I.buffer&&j()}if(n){let t=function(r){try{var n,i,o=r.data,a=o.Uc;if("load"===a){let r=[];for(let n of(self.onmessage=e=>r.push(e),g=()=>{for(let e of(postMessage({Uc:"loaded"}),r))t(e);self.onmessage=t},o.Ad))e[n]&&!e[n].proxy||(e[n]=(...e)=>{postMessage({Uc:"callHandler",zd:n,args:e})},"print"==n&&(_=e[n]),"printErr"==n&&(v=e[n]));eR=o.Vd,j(),c=o.Wd,W(),a5()}else if("run"===a){n=o.Tc,i=($(),P)[n+52>>>2>>>0],n=($(),P)[n+56>>>2>>>0],iG(i,i-n),iH(i),iR(o.Tc,0,0,1,0,0),ek(),rc(o.Tc),T||(iS(),T=!0);try{eB(o.Pd,o.dd)}catch(e){if("unwind"!=e)throw e}}else"setimmediate"!==o.target&&("checkMailbox"===a?T&&r$():a&&(v(`worker: received unknown command ${a}`),v(o)))}catch(e){throw iB(),e}};var T=!1;self.onunhandledrejection=e=>{throw e.reason||e},self.onmessage=t}var I,S,O,E,A,P,k,C,z,R,B,M=!1;function j(){var t=eR.buffer;e.HEAP8=I=new Int8Array(t),O=new Int16Array(t),e.HEAPU8=S=new Uint8Array(t),E=new Uint16Array(t),e.HEAP32=A=new Int32Array(t),e.HEAPU32=P=new Uint32Array(t),k=new Float32Array(t),C=new Float64Array(t),z=new BigInt64Array(t),R=new BigUint64Array(t)}function V(){M=!0,n?g():o4.tb()}function q(e){throw v(e="Aborted("+e+")"),x=!0,e=new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info."),m?.(e),e}function G(){return{a:{ma:o7,hb:o5,g:ej,J:eV,f:eW,o:eK,h:eX,ha:eZ,b:eQ,T:eJ,Ia:e1,n:e2,_:e7,Ya:e9,Ea:tt,Ga:tr,Za:tn,Wa:ti,Pa:tu,Va:td,ka:tp,Fa:tm,Ca:t$,Xa:tT,Da:tS,cb:tk,ea:tL,xa:tV,va:tZ,da:tQ,O:tJ,H:tY,wa:t4,Z:rn,ya:ri,Sa:ru,Aa:rT,Ja:rO,ta:rk,fa:rN,Ra:rc,$a:rz,R:rK,s:rY,c:tG,ib:r1,y:r2,M:r3,D:r4,m:r6,t:r8,jb:r5,I:r7,S:r9,j:ne,v:nr,r:nn,l:ni,Ma:nd,Na:nS,Oa:nk,Ka:nN,La:nz,ua:nM,eb:nF,bb:nL,u:nq,aa:nG,ga:nH,ab:nj,V:nW,_a:nK,Ba:nX,F:nB,U:nZ,la:n2,za:n4,gb:n1,fb:n6,Ta:n9,Ua:ie,Ha:ep,$:ir,ja:ii,Qa:iu,ia:ip,lb:a6,na:aZ,mb:a4,oa:aX,G:aj,d:ai,q:ae,w:o9,B:aN,pb:aH,K:aB,x:al,pa:aW,X:aQ,ba:aG,nb:a2,ob:a1,ra:aL,qa:aq,qb:aV,N:aM,Y:aK,e:as,A:ad,k:an,kb:a8,p:ah,z:a$,C:ap,E:aT,L:az,rb:aF,Q:aJ,ca:aR,W:aY,sb:ak,sa:aS,P:aU,i:i$,a:eR,db:el}}}async function W(){function t(t,r){var n,i,o,a=o4=t.exports;for(let[e,r]of(t={},Object.entries(a)))"function"==typeof r?(a=function(e){var t=(...t)=>{rj.push(e);try{return e(...t)}finally{x||(rj.pop(),rM&&1===rB&&0===rj.length&&(rB=0,en+=1,rR(o1),"u">typeof Fibers&&Fibers.ce()))}};return rU.set(e,t),t}(r),t[e]=a):t[e]=r;return n=o4=t,i=e=>t=>e(t)>>>0,o=e=>()=>e()>>>0,(n=Object.assign({},n)).ub=i(n.ub),n.Yb=o(n.Yb),n._b=i(n._b),n.mc=i(n.mc),n.nc=o(n.nc),n.rc=i(n.rc),o4=n,eT.push(o4.$b),iT=(t=o4).ub,iS=t.vb,e._OrtInit=t.wb,e._OrtGetLastError=t.xb,e._OrtCreateSessionOptions=t.yb,e._OrtAppendExecutionProvider=t.zb,e._OrtAddFreeDimensionOverride=t.Ab,e._OrtAddSessionConfigEntry=t.Bb,e._OrtReleaseSessionOptions=t.Cb,e._OrtCreateSession=t.Db,e._OrtReleaseSession=t.Eb,e._OrtGetInputOutputCount=t.Fb,e._OrtGetInputOutputMetadata=t.Gb,e._OrtFree=t.Hb,e._OrtCreateTensor=t.Ib,e._OrtGetTensorData=t.Jb,e._OrtReleaseTensor=t.Kb,e._OrtCreateRunOptions=t.Lb,e._OrtAddRunConfigEntry=t.Mb,e._OrtReleaseRunOptions=t.Nb,e._OrtCreateBinding=t.Ob,e._OrtBindInput=t.Pb,e._OrtBindOutput=t.Qb,e._OrtClearBoundOutputs=t.Rb,e._OrtReleaseBinding=t.Sb,e._OrtRunWithBinding=t.Tb,e._OrtRun=t.Ub,e._OrtEndProfiling=t.Vb,e._JsepOutput=t.Wb,e._JsepGetNodeName=t.Xb,ik=t.Yb,iN=e._free=t.Zb,iz=e._malloc=t._b,iR=t.bc,iB=t.cc,iM=t.dc,iF=t.ec,ij=t.fc,iL=t.gc,iV=t.hc,iU=t.ic,iq=t.jc,iG=t.kc,iH=t.lc,iW=t.mc,iK=t.nc,iX=t.oc,iZ=t.pc,iQ=t.qc,iJ=t.rc,iY=t.sc,i1=t.tc,i2=t.uc,i4=t.vc,i6=t.wc,i8=t.xc,i5=t.yc,i7=t.zc,i9=t.Ac,or=t.Bc,on=t.Cc,oi=t.Dc,od=t.Ec,op=t.Fc,oh=t.Gc,o$=t.Hc,oT=t.Ic,oS=t.Jc,ok=t.Kc,oN=t.Lc,oz=t.Mc,oR=t.Nc,oB=t.Oc,oM=t.Pc,oF=t.Rc,oj=t.Sc,oL=t.bd,oV=t.cd,oU=t.hd,oq=t.kd,oG=t.ld,oH=t.md,oW=t.nd,oK=t.od,oX=t.pd,oZ=t.qd,oQ=t.rd,oJ=t.wd,oY=t.Rd,o1=t.Sd,o2=t.Td,o3=t.Ud,c=r,o4}var r,i=G();return e.instantiateWasm?new Promise(r=>{e.instantiateWasm(i,(e,n)=>{r(t(e,n))})}):n?t(new WebAssembly.Instance(c,G()),c):(B??=e.locateFile?e.locateFile?e.locateFile("ort-wasm-simd-threaded.jsep.wasm",d):d+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,t((r=await async function(e){if(!p&&!w(B))try{var t=fetch(B,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(t,e)}catch(e){v(`wasm streaming compile failed: ${e}`),v("falling back to ArrayBuffer instantiation")}return async function(e,t){try{var r=await async function(e){if(!p)try{var t=await a(e);return new Uint8Array(t)}catch{}if(e==B&&p)e=new Uint8Array(p);else{if(!s)throw"both async and sync fetching of the wasm failed";e=s(e)}return e}(e);return await WebAssembly.instantiate(r,t)}catch(e){v(`failed to asynchronously prepare wasm: ${e}`),q(e)}}(B,e)}(i)).instance,r.module))}class X{name="ExitStatus";constructor(e){this.message=`Program terminated with exit(${e})`,this.status=e}}var Q=e=>{e.terminate(),e.onmessage=()=>{}},J=[],Y=0,ee=null,et=e=>{0==eh.length&&(ez(),eN(eh[0]));var t=eh.pop();if(!t)return 6;e$.push(t),eI[e.Tc]=t,t.Tc=e.Tc;var r={Uc:"run",Pd:e.Od,dd:e.dd,Tc:e.Tc};return t.postMessage(r,e.ud),0},en=0,ei=(e,t,...r)=>{var n,i=16*r.length,o=iK(),a=iW(i),s=a>>>3;for(n of r)"bigint"==typeof n?(($(),z)[s++>>>0]=1n,($(),z)[s++>>>0]=n):(($(),z)[s++>>>0]=0n,($(),C)[s++>>>0]=n);return e=iM(e,0,i,a,t),iH(o),e};function el(e){if(n)return ei(0,1,e);if(h=e,!(0<en)){for(var t of e$)Q(t);for(t of eh)Q(t);eh=[],e$=[],eI={},x=!0}u(0,new X(e))}function ed(e){if(n)return ei(1,0,e);ep(e)}var ep=e=>{if(h=e,n)throw ed(e),"unwind";el(e)},eh=[],e$=[],eT=[],eI={},eS=e=>{var t=e.Tc;delete eI[t],eh.push(e),e$.splice(e$.indexOf(e),1),e.Tc=0,iF(t)};function ek(){eT.forEach(e=>e())}var eN=t=>new Promise(r=>{t.onmessage=n=>{var i=n.data;if(n=i.Uc,i.ad&&i.ad!=ik()){var o=eI[i.ad];o?o.postMessage(i,i.ud):v(`Internal error! Worker sent a message "${n}" to target pthread ${i.ad}, but that thread no longer exists!`)}else"checkMailbox"===n?r$():"spawnThread"===n?et(i):"cleanupThread"===n?rd(()=>{eS(eI[i.Qd])}):"loaded"===n?(t.loaded=!0,r(t)):"setimmediate"===i.target?t.postMessage(i):"uncaughtException"===n?t.onerror(i.error):"callHandler"===n?e[i.zd](...i.args):n&&v(`worker sent an unknown command ${n}`)},t.onerror=e=>{throw v(`worker sent an error! ${e.filename}:${e.lineno}: ${e.message}`),e};var n,i=[];for(n of[])e.propertyIsEnumerable(n)&&i.push(n);t.postMessage({Uc:"load",Ad:i,Vd:eR,Wd:c})});function ez(){let e;var t=new Worker((e=URL,import.meta.url>"file:"&&import.meta.url<"file;"?new e("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url)),{type:"module",workerData:"em-pthread",name:"em-pthread"});eh.push(t)}var eR,eB=(e,t)=>{en=0,e=i1(e,t),0<en?h=e:ij(e)},eM=[],eF=0;function ej(e){var t=new eG(e>>>=0);return 0==($(),I)[t.Vc+12>>>0]&&(eU(t,!0),eF--),eq(t,!1),eM.push(t),iJ(e)}var eL=0,eV=()=>{iU(0,0);var e=eM.pop();iX(e.ed),eL=0};function eU(e,t){t=+!!t,($(),I)[e.Vc+12>>>0]=t}function eq(e,t){t=+!!t,($(),I)[e.Vc+13>>>0]=t}class eG{constructor(e){this.ed=e,this.Vc=e-24}}var eH=e=>{var t=eL;if(!t)return iq(0),0;var r=new eG(t);($(),P)[r.Vc+16>>>2>>>0]=t;var n=($(),P)[r.Vc+4>>>2>>>0];if(!n)return iq(0),t;for(var i of e){if(0===i||i===n)break;if(iQ(i,n,r.Vc+16))return iq(i),t}return iq(n),t};function eW(){return eH([])}function eK(e){return eH([e>>>0])}function eX(e,t,r,n){return eH([e>>>0,t>>>0,r>>>0,n>>>0])}var eZ=()=>{var e=eM.pop();e||q("no exception to throw");var t=e.ed;throw 0==($(),I)[e.Vc+13>>>0]&&(eM.push(e),eq(e,!0),eU(e,!1),eF++),iZ(t),eL=t};function eQ(e,t,r){var n=new eG(e>>>=0);throw t>>>=0,r>>>=0,($(),P)[n.Vc+16>>>2>>>0]=0,($(),P)[n.Vc+4>>>2>>>0]=t,($(),P)[n.Vc+8>>>2>>>0]=r,iZ(e),eF++,eL=e}var eJ=()=>eF;function eY(e,t,r,i){return n?ei(2,1,e,t,r,i):e1(e,t,r,i)}function e1(e,t,r,i){if(e>>>=0,t>>>=0,r>>>=0,i>>>=0,!globalThis.SharedArrayBuffer)return 6;var o=[];return n&&0===o.length?eY(e,t,r,i):(e={Od:r,Tc:e,dd:i,ud:o},n?(e.Uc="spawnThread",postMessage(e,o),0):et(e))}function e2(e){throw eL||=e>>>0}var e4=globalThis.TextDecoder&&new TextDecoder,e6=(e,t,r,n)=>{if(r=t+r,n)return r;for(;e[t]&&!(t>=r);)++t;return t},e8=(e,t=0,r,n)=>{if(16<(r=e6(e,t>>>=0,r,n))-t&&e.buffer&&e4)return e4.decode(e.buffer instanceof ArrayBuffer?e.subarray(t,r):e.slice(t,r));for(n="";t<r;){var i=e[t++];if(128&i){var o=63&e[t++];if((224&i)==192)n+=String.fromCharCode((31&i)<<6|o);else{var a=63&e[t++];65536>(i=(240&i)==224?(15&i)<<12|o<<6|a:(7&i)<<18|o<<12|a<<6|63&e[t++])?n+=String.fromCharCode(i):(i-=65536,n+=String.fromCharCode(55296|i>>10,56320|1023&i))}}else n+=String.fromCharCode(i)}return n},e5=(e,t,r)=>(e>>>=0)?e8(($(),S),e,t,r):"";function e7(e,t,r){return n?ei(3,1,e,t,r):0}function e9(e,t){if(n)return ei(4,1,e,t)}function tt(e,t){if(n)return ei(5,1,e,t)}function tr(e,t,r){if(n)return ei(6,1,e,t,r)}function tn(e,t,r){return n?ei(7,1,e,t,r):0}function ti(e,t){if(n)return ei(8,1,e,t)}function tu(e,t,r){if(n)return ei(9,1,e,t,r)}function td(e,t,r,i){if(n)return ei(10,1,e,t,r,i)}function tp(e,t,r,i){if(n)return ei(11,1,e,t,r,i)}function tm(e,t,r,i){if(n)return ei(12,1,e,t,r,i)}function t$(e){if(n)return ei(13,1,e)}function tT(e,t){if(n)return ei(14,1,e,t)}function tS(e,t,r){if(n)return ei(15,1,e,t,r)}var tk=()=>q(""),tN=e=>{e>>>=0;for(var t="";;){var r=($(),S)[e++>>>0];if(!r)return t;t+=String.fromCharCode(r)}},tz={},tR={},tB={},tM=class extends Error{constructor(e){super(e),this.name="BindingError"}};function tF(e,t,r={}){return function(e,t,r={}){var n=t.name;if(!e)throw new tM(`type "${n}" must have a positive integer typeid pointer`);if(tR.hasOwnProperty(e)){if(r.Bd)return;throw new tM(`Cannot register type '${n}' twice`)}tR[e]=t,delete tB[e],tz.hasOwnProperty(e)&&(t=tz[e],delete tz[e],t.forEach(e=>e()))}(e,t,r)}var tj=(e,t,r)=>{switch(t){case 1:return r?e=>($(),I)[e>>>0]:e=>($(),S)[e>>>0];case 2:return r?e=>($(),O)[e>>>1>>>0]:e=>($(),E)[e>>>1>>>0];case 4:return r?e=>($(),A)[e>>>2>>>0]:e=>($(),P)[e>>>2>>>0];case 8:return r?e=>($(),z)[e>>>3>>>0]:e=>($(),R)[e>>>3>>>0];default:throw TypeError(`invalid integer width (${t}): ${e}`)}};function tL(e,t,r,n,i){e>>>=0,r>>>=0,t=tN(t>>>0);let o=e=>e;if(n=0n===n){let e=8*r;i=(o=t=>BigInt.asUintN(e,t))(i)}tF(e,{name:t,Qc:o,Xc:(e,t)=>("number"==typeof t&&(t=BigInt(t)),t),Wc:tj(t,r,!n),Yc:null})}function tV(e,t,r,n){tF(e>>>=0,{name:t=tN(t>>>0),Qc:function(e){return!!e},Xc:function(e,t){return t?r:n},Wc:function(e){return this.Qc(($(),S)[e>>>0])},Yc:null})}var tU=[],tq=[0,1,,1,null,1,!0,1,!1,1];function tG(e){9<(e>>>=0)&&0==--tq[e+1]&&(tq[e]=void 0,tU.push(e))}var tH=e=>{if(!e)throw new tM(`Cannot use deleted val. handle = ${e}`);return tq[e]},tW=e=>{switch(e){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let t=tU.pop()||tq.length;return tq[t]=e,tq[t+1]=1,t}};function tK(e){return this.Qc(($(),P)[e>>>2>>>0])}var tX={name:"emscripten::val",Qc:e=>{var t=tH(e);return tG(e),t},Xc:(e,t)=>tW(t),Wc:tK,Yc:null};function tZ(e){return tF(e>>>0,tX)}function tQ(e,t,r){r>>>=0,tF(e>>>=0,{name:t=tN(t>>>0),Qc:e=>e,Xc:(e,t)=>t,Wc:((e,t)=>{switch(t){case 4:return function(e){return this.Qc(($(),k)[e>>>2>>>0])};case 8:return function(e){return this.Qc(($(),C)[e>>>3>>>0])};default:throw TypeError(`invalid float width (${t}): ${e}`)}})(t,r),Yc:null})}function tJ(e,t,r,n,i){e>>>=0,r>>>=0,t=tN(t>>>0);let o=e=>e;if(0===n){var a=32-8*r;i=(o=e=>e<<a>>>a)(i)}tF(e,{name:t,Qc:o,Xc:(e,t)=>t,Wc:tj(t,r,0!==n),Yc:null})}function tY(e,t,r){function n(e){var t=($(),P)[e>>>2>>>0];return e=($(),P)[e+4>>>2>>>0],new i(($(),I).buffer,e,t)}var i=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][t];tF(e>>>=0,{name:r=tN(r>>>0),Qc:n,Wc:n},{Bd:!0})}var t1=(e,t,r)=>{var n=($(),S);if(t>>>=0,0<r){var i=t;r=t+r-1;for(var o=0;o<e.length;++o){var a=e.codePointAt(o);if(127>=a){if(t>=r)break;n[t++>>>0]=a}else if(2047>=a){if(t+1>=r)break;n[t++>>>0]=192|a>>6,n[t++>>>0]=128|63&a}else if(65535>=a){if(t+2>=r)break;n[t++>>>0]=224|a>>12,n[t++>>>0]=128|a>>6&63,n[t++>>>0]=128|63&a}else{if(t+3>=r)break;n[t++>>>0]=240|a>>18,n[t++>>>0]=128|a>>12&63,n[t++>>>0]=128|a>>6&63,n[t++>>>0]=128|63&a,o++}}n[t>>>0]=0,e=t-i}else e=0;return e},t2=e=>{for(var t=0,r=0;r<e.length;++r){var n=e.charCodeAt(r);127>=n?t++:2047>=n?t+=2:55296<=n&&57343>=n?(t+=4,++r):t+=3}return t};function t4(e,t){tF(e>>>=0,{name:t=tN(t>>>0),Qc(e){var t=($(),P)[e>>>2>>>0];return t=e5(e+4,t,!0),iN(e),t},Xc(e,t){t instanceof ArrayBuffer&&(t=new Uint8Array(t));var r="string"==typeof t;if(!(r||ArrayBuffer.isView(t)&&1==t.BYTES_PER_ELEMENT))throw new tM("Cannot pass non-string to std::string");var n=r?t2(t):t.length,i=iz(4+n+1),o=i+4;return($(),P)[i>>>2>>>0]=n,r?t1(t,o,n+1):($(),S).set(t,o>>>0),null!==e&&e.push(iN,i),i},Wc:tK,Yc(e){iN(e)}})}var t6=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,t8=(e,t,r)=>{if(e>>>=1,16<(t=e6(($(),E),e,t/2,r))-e&&t6)return t6.decode(($(),E).slice(e,t));for(r="";e<t;++e)r+=String.fromCharCode(($(),E)[e>>>0]);return r},t5=(e,t,r)=>{if(2>(r??=0x7fffffff))return 0;var n=t;r=(r-=2)<2*e.length?r/2:e.length;for(var i=0;i<r;++i){var o=e.charCodeAt(i);($(),O)[t>>>1>>>0]=o,t+=2}return($(),O)[t>>>1>>>0]=0,t-n},t7=e=>2*e.length,t9=(e,t,r)=>{var n="";e>>>=2;for(var i=0;!(i>=t/4);i++){var o=($(),P)[e+i>>>0];if(!o&&!r)break;n+=String.fromCodePoint(o)}return n},re=(e,t,r)=>{if(t>>>=0,4>(r??=0x7fffffff))return 0;var n=t;r=n+r-4;for(var i=0;i<e.length;++i){var o=e.codePointAt(i);if(65535<o&&i++,($(),A)[t>>>2>>>0]=o,(t+=4)+4>r)break}return($(),A)[t>>>2>>>0]=0,t-n},rr=e=>{for(var t=0,r=0;r<e.length;++r)65535<e.codePointAt(r)&&r++,t+=4;return t};function rn(e,t,r){if(e>>>=0,t>>>=0,r=tN(r>>>=0),2===t)var n=t8,i=t5,o=t7;else n=t9,i=re,o=rr;tF(e,{name:r,Qc:e=>{var r=($(),P)[e>>>2>>>0];return r=n(e+4,r*t,!0),iN(e),r},Xc:(e,n)=>{if("string"!=typeof n)throw new tM(`Cannot pass non-string to C++ string type ${r}`);var a=o(n),s=iz(4+a+t);return($(),P)[s>>>2>>>0]=a/t,i(n,s+4,a+t),null!==e&&e.push(iN,s),s},Wc:tK,Yc(e){iN(e)}})}function ri(e,t){tF(e>>>=0,{Cd:!0,name:t=tN(t>>>0),Qc:()=>{},Xc:()=>{}})}function ru(e){iR(e>>>0,!r,1,!t,131072,!1),ek()}var rd=e=>{if(!x)try{if(e(),!(0<en))try{n?ik()&&ij(h):ep(h)}catch(e){e instanceof X||"unwind"==e||u(0,e)}}catch(e){e instanceof X||"unwind"==e||u(0,e)}},rp=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function rc(e){e>>>=0,rp||(Atomics.waitAsync(($(),A),e>>>2,e).value.then(r$),e+=128,Atomics.store(($(),A),e>>>2,1))}var r$=()=>rd(()=>{var e=ik();e&&(rc(e),iV())});function rT(e,t){(e>>>=0)==t>>>0?setTimeout(r$):n?postMessage({ad:e,Uc:"checkMailbox"}):(e=eI[e])&&e.postMessage({Uc:"checkMailbox"})}var rS=[];function rO(e,t,r,n,i){for(t>>>=0,i>>>=0,rS.length=0,r=i>>>3,n=i+n>>>3;r<n;){var o;o=($(),z)[r++>>>0]?($(),z)[r++>>>0]:($(),C)[r++>>>0],rS.push(o)}return(t?o8[t]:o6[e])(...rS)}var rk=()=>{en=0};function rN(e){e>>>=0,n?postMessage({Uc:"cleanupThread",Qd:e}):eS(eI[e])}function rz(e){}var rR=e=>{try{e()}catch(e){q(e)}},rB=0,rM=null,rF=0,rj=[],rL=new Map,rV=new Map,rU=new Map,rq=0,rG=null,rH=[],rW=e=>(function(e){if(!x){if(0===rB){var t=!1,r=!1;e((e=0)=>{if(!x&&(rF=e,t=!0,r)){rB=2,rR(()=>o2(rM)),"u">typeof MainLoop&&MainLoop.yd&&MainLoop.resume(),e=!1;try{var n,i=(n=($(),A)[rM+8>>>2>>>0],n=rV.get(n),n=rU.get(n),--en,n())}catch(t){i=t,e=!0}var o=!1;if(!rM){var a=rG;a&&(rG=null,(e?a.reject:a.resolve)(i),o=!0)}if(e&&!o)throw i}}),r=!0,t||(rB=1,rM=function(){var e=iz(65548),t=e+12;if(($(),P)[e>>>2>>>0]=t,($(),P)[e+4>>>2>>>0]=t+65536,t=rj[0],!rL.has(t)){var r=rq++;rL.set(t,r),rV.set(r,t)}return t=rL.get(t),($(),A)[e+8>>>2>>>0]=t,e}(),"u">typeof MainLoop&&MainLoop.yd&&MainLoop.pause(),rR(()=>oY(rM)))}else 2===rB?(rB=0,rR(o3),iN(rM),rM=null,rH.forEach(rd)):q(`invalid state: ${rB}`);return rF}})(t=>{e().then(t)});function rK(e){return e>>>=0,rW(async()=>tW(await tH(e)))}var rX=[],rZ=(e,t,r)=>{var n=[];return e=e(n,r),n.length&&(($(),P)[t>>>2>>>0]=tW(n)),e},rQ={},rJ=e=>{var t=rQ[e];return void 0===t?tN(e):t};function rY(e,t,r){var n,i,[o,...a]=((e,t)=>{for(var r=Array(e),n=0;n<e;++n){var i=n,o=($(),P)[t+4*n>>>2>>>0],a=tR[o];if(void 0===a)throw e=`parameter ${n}`,t=tN(o=iT(o)),iN(o),new tM(`${e} has unknown type ${t}`);r[i]=a}return r})(e,t>>>0);t=o.Xc.bind(o);var s=a.map(e=>e.Wc.bind(e));e--;var u={toValue:tH};switch(e=s.map((e,t)=>{var r=`argFromPtr${t}`;return u[r]=e,`${r}(args${t?"+"+8*t:""})`}),r){case 0:var l="toValue(handle)";break;case 2:l="new (toValue(handle))";break;case 3:l="";break;case 1:u.getStringOrSymbol=rJ,l="toValue(handle)[getStringOrSymbol(methodName)]"}return l+=`(${e})`,o.Cd||(u.toReturnWire=t,u.emval_returnValue=rZ,l=`return emval_returnValue(toReturnWire, destructorsRef, ${l})`),l=`return function (handle, methodName, destructorsRef, args) {
  ${l}
  }`,n=Object.defineProperty(r=Function(Object.keys(u),l)(...Object.values(u)),"name",{value:l=`methodCaller<(${a.map(e=>e.name)}) => ${o.name}>`}),i=rX.length,rX.push(n),i}function r1(e,t){return t>>>=0,(e=tH(e>>>0))==tH(t)}function r2(e){return(e>>>=0)?(e=rJ(e),tW(globalThis[e])):tW(globalThis)}function r3(t){return tW(e[t=rJ(t>>>0)])}function r4(e,t){return t>>>=0,tW((e=tH(e>>>0))[t=tH(t)])}function r6(e){9<(e>>>=0)&&(tq[e+1]+=1)}function r8(e,t,r,n,i){return rX[e>>>0](t>>>0,r>>>0,n>>>0,i>>>0)}function r5(e,t,r,n,i){return r8(e>>>0,t>>>0,r>>>0,n>>>0,i>>>0)}function r7(){return tW([])}function r9(e){e=tH(e>>>0);for(var t=Array(e.length),r=0;r<e.length;r++)t[r]=e[r];return tW(t)}function ne(e){return tW(rJ(e>>>0))}function nr(){return tW({})}function nn(e){for(var t=tH(e>>>=0);t.length;){var r=t.pop();t.pop()(r)}tG(e)}function ni(e,t,r){t>>>=0,r>>>=0,e=tH(e>>>0),t=tH(t),r=tH(r),e[t]=r}function nd(e,t){e=-0x20000000000000>e||0x20000000000000<e?0/0:Number(e),t>>>=0,e=new Date(1e3*e),($(),A)[t>>>2>>>0]=e.getUTCSeconds(),($(),A)[t+4>>>2>>>0]=e.getUTCMinutes(),($(),A)[t+8>>>2>>>0]=e.getUTCHours(),($(),A)[t+12>>>2>>>0]=e.getUTCDate(),($(),A)[t+16>>>2>>>0]=e.getUTCMonth(),($(),A)[t+20>>>2>>>0]=e.getUTCFullYear()-1900,($(),A)[t+24>>>2>>>0]=e.getUTCDay(),e=(e.getTime()-Date.UTC(e.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,($(),A)[t+28>>>2>>>0]=e}var np=e=>e%4==0&&(e%100!=0||e%400==0),n$=[0,31,60,91,121,152,182,213,244,274,305,335],nT=[0,31,59,90,120,151,181,212,243,273,304,334];function nS(e,t){e=-0x20000000000000>e||0x20000000000000<e?0/0:Number(e),t>>>=0,e=new Date(1e3*e),($(),A)[t>>>2>>>0]=e.getSeconds(),($(),A)[t+4>>>2>>>0]=e.getMinutes(),($(),A)[t+8>>>2>>>0]=e.getHours(),($(),A)[t+12>>>2>>>0]=e.getDate(),($(),A)[t+16>>>2>>>0]=e.getMonth(),($(),A)[t+20>>>2>>>0]=e.getFullYear()-1900,($(),A)[t+24>>>2>>>0]=e.getDay();var r=(np(e.getFullYear())?n$:nT)[e.getMonth()]+e.getDate()-1|0;($(),A)[t+28>>>2>>>0]=r,($(),A)[t+36>>>2>>>0]=-60*e.getTimezoneOffset(),r=new Date(e.getFullYear(),6,1).getTimezoneOffset();var n=new Date(e.getFullYear(),0,1).getTimezoneOffset();e=0|(r!=n&&e.getTimezoneOffset()==Math.min(n,r)),($(),A)[t+32>>>2>>>0]=e}function nk(e){e>>>=0;var t=new Date(($(),A)[e+20>>>2>>>0]+1900,($(),A)[e+16>>>2>>>0],($(),A)[e+12>>>2>>>0],($(),A)[e+8>>>2>>>0],($(),A)[e+4>>>2>>>0],($(),A)[e>>>2>>>0],0),r=($(),A)[e+32>>>2>>>0],n=t.getTimezoneOffset(),i=new Date(t.getFullYear(),6,1).getTimezoneOffset(),o=new Date(t.getFullYear(),0,1).getTimezoneOffset(),a=Math.min(o,i);return 0>r?($(),A)[e+32>>>2>>>0]=+(i!=o&&a==n):0<r!=(a==n)&&(i=Math.max(o,i),t.setTime(t.getTime()+6e4*((0<r?a:i)-n))),($(),A)[e+24>>>2>>>0]=t.getDay(),r=(np(t.getFullYear())?n$:nT)[t.getMonth()]+t.getDate()-1|0,($(),A)[e+28>>>2>>>0]=r,($(),A)[e>>>2>>>0]=t.getSeconds(),($(),A)[e+4>>>2>>>0]=t.getMinutes(),($(),A)[e+8>>>2>>>0]=t.getHours(),($(),A)[e+12>>>2>>>0]=t.getDate(),($(),A)[e+16>>>2>>>0]=t.getMonth(),($(),A)[e+20>>>2>>>0]=t.getYear(),BigInt(isNaN(e=t.getTime())?-1:e/1e3)}function nN(e,t,r,i,o,a,s){return n?ei(16,1,e,t,r,i,o,a,s):-52}function nz(e,t,r,i,o,a){if(n)return ei(17,1,e,t,r,i,o,a)}var nR={},nB=()=>performance.timeOrigin+performance.now();function nM(e,t){if(n)return ei(18,1,e,t);if(nR[e]&&(clearTimeout(nR[e].id),delete nR[e]),!t)return 0;var r=setTimeout(()=>{delete nR[e],rd(()=>iL(e,performance.timeOrigin+performance.now()))},t);return nR[e]={id:r,be:t},0}function nF(e,t,r,n){e>>>=0,t>>>=0,r>>>=0,n>>>=0;var i=new Date().getFullYear(),o=new Date(i,0,1).getTimezoneOffset(),a=Math.max(o,i=new Date(i,6,1).getTimezoneOffset());($(),P)[e>>>2>>>0]=60*a,($(),A)[t>>>2>>>0]=+(o!=i),e=(t=e=>{var t=Math.abs(e);return`UTC${0<=e?"-":"+"}${String(Math.floor(t/60)).padStart(2,"0")}${String(t%60).padStart(2,"0")}`})(o),t=t(i),i<o?(t1(e,r,17),t1(t,n,17)):(t1(e,n,17),t1(t,r,17))}var nj=()=>Date.now();function nL(e,t,r){return(r>>>=0,0<=e&&3>=e)?(e=Math.round(1e6*(e=0===e?Date.now():performance.timeOrigin+performance.now())),($(),z)[r>>>3>>>0]=BigInt(e),0):28}var nV=[],nU=(e,t)=>{nV.length=0;for(var r;r=($(),S)[e++>>>0];){var n=105!=r;t+=(n&=112!=r)&&t%8?4:0,nV.push(112==r?($(),P)[t>>>2>>>0]:106==r?($(),z)[t>>>3>>>0]:105==r?($(),A)[t>>>2>>>0]:($(),C)[t>>>3>>>0]),t+=n?8:4}return nV};function nq(e,t,r){return e>>>=0,t=nU(t>>>0,r>>>0),o8[e](...t)}function nG(e,t,r){return e>>>=0,t=nU(t>>>0,r>>>0),o8[e](...t)}var nH=()=>{};function nW(e,t){return v(e5(e>>>0,t>>>0))}var nK=()=>{throw en+=1,"unwind"};function nX(){return 0xffff0000}var nZ=()=>navigator.hardwareConcurrency,nQ={},nJ=e=>{var t;return(t=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e))?+t[1]:(t=/:(\d+):\d+(?:\)|$)/.exec(e))?0x80000000|t[1]:0},nY=e=>{for(var t of e)(e=nJ(t))&&(nQ[e]=t)};function n1(){var e=Error().stack.toString().split(`
`);return"Error"==e[0]&&e.shift(),nY(e),nQ.sd=nJ(e[3]),nQ.Md=e,nQ.sd}function n2(e){if(!(e=nQ[e>>>0]))return 0;if(t=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e))e=t[1];else if(t=/^\s+at (.*) \(.*\)$/.exec(e))e=t[1];else{if(!(t=/^(.+?)@/.exec(e)))return 0;e=t[1]}iN(n2.td??0),t=t2(e)+1;var t,r=iz(t);return r&&t1(e,r,t),n2.td=r,n2.td}function n4(e){e>>>=0;var t=($(),S).length;if(e<=t||0xffff0000<e)return!1;for(var r=1;4>=r;r*=2){var n=t*(1+.2/r);n=Math.min(n,e+0x6000000);e:{n=(Math.min(0xffff0000,65536*Math.ceil(Math.max(e,n)/65536))-eR.buffer.byteLength+65535)/65536|0;try{eR.grow(n),j();var i=1;break e}catch{}i=void 0}if(i)return!0}return!1}function n6(e,t,r){if(e>>>=0,t>>>=0,nQ.sd==e)var n=nQ.Md;else"Error"==(n=Error().stack.toString().split(`
`))[0]&&n.shift(),nY(n);for(var i=3;n[i]&&nJ(n[i])!=e;)++i;for(e=0;e<r&&n[e+i];++e)($(),A)[t+4*e>>>2>>>0]=nJ(n[e+i]);return e}var n8,n5={},n7=()=>{if(!n8){var e,t={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(e in n5)void 0===n5[e]?delete t[e]:t[e]=n5[e];var r=[];for(e in t)r.push(`${e}=${t[e]}`);n8=r}return n8};function n9(e,t){if(n)return ei(19,1,e,t);e>>>=0,t>>>=0;var r,i=0,o=0;for(r of n7()){var a=t+i;($(),P)[e+o>>>2>>>0]=a,i+=t1(r,a,1/0)+1,o+=4}return 0}function ie(e,t){if(n)return ei(20,1,e,t);e>>>=0,t>>>=0;var r=n7();for(var i of(($(),P)[e>>>2>>>0]=r.length,e=0,r))e+=t2(i)+1;return($(),P)[t>>>2>>>0]=e,0}function ir(e){return n?ei(21,1,e):52}function ii(e,t,r,i){return n?ei(22,1,e,t,r,i):52}function iu(e,t,r,i){return n?ei(23,1,e,t,r,i):70}var id=[null,[],[]];function ip(e,t,r,i){if(n)return ei(24,1,e,t,r,i);t>>>=0,r>>>=0,i>>>=0;for(var o=0,a=0;a<r;a++){var s=($(),P)[t>>>2>>>0],u=($(),P)[t+4>>>2>>>0];t+=8;for(var l=0;l<u;l++){var d=($(),S)[s+l>>>0],p=id[e];0===d||10===d?((1===e?_:v)(e8(p)),p.length=0):p.push(d)}o+=u}return($(),P)[i>>>2>>>0]=o,0}function i$(e){return e>>>0}n||function(){for(var t=e.numThreads-1;t--;)ez();J.push(async()=>{var e=async function(){if(!n)return Promise.all(eh.map(eN))}();Y++,await e,0==--Y&&ee&&(e=ee,ee=null,e())})}(),n||(eR=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),j()),e.wasmBinary&&(p=e.wasmBinary),e.stackSave=()=>iK(),e.stackRestore=e=>iH(e),e.stackAlloc=e=>iW(e),e.setValue=function(e,t,r="i8"){switch(r.endsWith("*")&&(r="*"),r){case"i1":case"i8":($(),I)[e>>>0]=t;break;case"i16":($(),O)[e>>>1>>>0]=t;break;case"i32":($(),A)[e>>>2>>>0]=t;break;case"i64":($(),z)[e>>>3>>>0]=BigInt(t);break;case"float":($(),k)[e>>>2>>>0]=t;break;case"double":($(),C)[e>>>3>>>0]=t;break;case"*":($(),P)[e>>>2>>>0]=t;break;default:q(`invalid type for setValue: ${r}`)}},e.getValue=function(e,t="i8"){switch(t.endsWith("*")&&(t="*"),t){case"i1":case"i8":return($(),I)[e>>>0];case"i16":return($(),O)[e>>>1>>>0];case"i32":return($(),A)[e>>>2>>>0];case"i64":return($(),z)[e>>>3>>>0];case"float":return($(),k)[e>>>2>>>0];case"double":return($(),C)[e>>>3>>>0];case"*":return($(),P)[e>>>2>>>0];default:q(`invalid type for getValue: ${t}`)}},e.UTF8ToString=e5,e.stringToUTF8=t1,e.lengthBytesUTF8=t2;var iT,iS,ik,iN,iz,iR,iB,iM,iF,ij,iL,iV,iU,iq,iG,iH,iW,iK,iX,iZ,iQ,iJ,iY,i1,i2,i4,i6,i8,i5,i7,i9,or,on,oi,od,op,oh,o$,oT,oS,ok,oN,oz,oR,oB,oM,oF,oj,oL,oV,oU,oq,oG,oH,oW,oK,oX,oZ,oQ,oJ,oY,o1,o2,o3,o4,o6=[el,ed,eY,e7,e9,tt,tr,tn,ti,tu,td,tp,tm,t$,tT,tS,nN,nz,nM,n9,ie,ir,ii,iu,ip],o8={929356:(t,r,n,i,o)=>{if(void 0===e||!e.Zc)return 1;if((t=e5(Number(t>>>0))).startsWith("./")&&(t=t.substring(2)),!(t=e.Zc.get(t)))return 2;if(r=Number(r>>>0),n=Number(n>>>0),i=Number(i>>>0),r+n>t.byteLength)return 3;try{let a=t.subarray(r,r+n);switch(o){case 0:($(),S).set(a,i>>>0);break;case 1:e.Xd?e.Xd(i,a):e.Ld(i,a);break;default:return 4}return 0}catch{return 4}},930180:(t,r,n)=>{e.xd(t,($(),S).subarray(r>>>0,r+n>>>0))},930244:()=>e.Zd(),930286:t=>{e.vd(t)},930323:()=>{e.Ed()},930354:()=>{e.Fd()},930383:()=>{e.Jd()},930408:t=>e.Dd(t),930441:t=>e.Hd(t),930473:(t,r,n)=>{e.jd(Number(t),Number(r),Number(n),!0)},930536:(t,r,n)=>{e.jd(Number(t),Number(r),Number(n))},930593:()=>"u">typeof wasmOffsetConverter,930650:t=>{e.ac("Abs",t,void 0)},930701:t=>{e.ac("Neg",t,void 0)},930752:t=>{e.ac("Floor",t,void 0)},930805:t=>{e.ac("Ceil",t,void 0)},930857:t=>{e.ac("Reciprocal",t,void 0)},930915:t=>{e.ac("Sqrt",t,void 0)},930967:t=>{e.ac("Exp",t,void 0)},931018:t=>{e.ac("Erf",t,void 0)},931069:t=>{e.ac("Sigmoid",t,void 0)},931124:(t,r,n)=>{e.ac("HardSigmoid",t,{alpha:r,beta:n})},931203:t=>{e.ac("Log",t,void 0)},931254:t=>{e.ac("Sin",t,void 0)},931305:t=>{e.ac("Cos",t,void 0)},931356:t=>{e.ac("Tan",t,void 0)},931407:t=>{e.ac("Asin",t,void 0)},931459:t=>{e.ac("Acos",t,void 0)},931511:t=>{e.ac("Atan",t,void 0)},931563:t=>{e.ac("Sinh",t,void 0)},931615:t=>{e.ac("Cosh",t,void 0)},931667:t=>{e.ac("Asinh",t,void 0)},931720:t=>{e.ac("Acosh",t,void 0)},931773:t=>{e.ac("Atanh",t,void 0)},931826:t=>{e.ac("Tanh",t,void 0)},931878:t=>{e.ac("Not",t,void 0)},931929:(t,r,n)=>{e.ac("Clip",t,{min:r,max:n})},931998:t=>{e.ac("Clip",t,void 0)},932050:(t,r)=>{e.ac("Elu",t,{alpha:r})},932108:t=>{e.ac("Gelu",t,void 0)},932160:t=>{e.ac("Relu",t,void 0)},932212:(t,r)=>{e.ac("LeakyRelu",t,{alpha:r})},932276:(t,r)=>{e.ac("ThresholdedRelu",t,{alpha:r})},932346:(t,r)=>{e.ac("Cast",t,{to:r})},932404:t=>{e.ac("Add",t,void 0)},932455:t=>{e.ac("Sub",t,void 0)},932506:t=>{e.ac("Mul",t,void 0)},932557:t=>{e.ac("Div",t,void 0)},932608:t=>{e.ac("Pow",t,void 0)},932659:t=>{e.ac("Equal",t,void 0)},932712:t=>{e.ac("Greater",t,void 0)},932767:t=>{e.ac("GreaterOrEqual",t,void 0)},932829:t=>{e.ac("Less",t,void 0)},932881:t=>{e.ac("LessOrEqual",t,void 0)},932940:(t,r,n,i,o)=>{e.ac("ReduceMean",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},933115:(t,r,n,i,o)=>{e.ac("ReduceMax",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},933289:(t,r,n,i,o)=>{e.ac("ReduceMin",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},933463:(t,r,n,i,o)=>{e.ac("ReduceProd",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},933638:(t,r,n,i,o)=>{e.ac("ReduceSum",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},933812:(t,r,n,i,o)=>{e.ac("ReduceL1",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},933985:(t,r,n,i,o)=>{e.ac("ReduceL2",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},934158:(t,r,n,i,o)=>{e.ac("ReduceLogSum",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},934335:(t,r,n,i,o)=>{e.ac("ReduceSumSquare",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},934515:(t,r,n,i,o)=>{e.ac("ReduceLogSumExp",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},934695:t=>{e.ac("Where",t,void 0)},934748:(t,r,n)=>{e.ac("Transpose",t,{perm:r?Array.from(($(),A).subarray(Number(r)>>>0,Number(n)>>>0)):[]})},934872:(t,r,n,i)=>{e.ac("DepthToSpace",t,{blocksize:r,mode:e5(n),format:i?"NHWC":"NCHW"})},935005:(t,r,n,i)=>{e.ac("DepthToSpace",t,{blocksize:r,mode:e5(n),format:i?"NHWC":"NCHW"})},935138:(t,r,n,i,o,a,s,u,l,d,p,c,h,f,m)=>{e.ac("ConvTranspose",t,{format:l?"NHWC":"NCHW",autoPad:r,dilations:[n],group:i,kernelShape:[o],pads:[a,s],strides:[u],wIsConst:()=>!!($(),I)[d>>>0],outputPadding:p?Array.from(($(),A).subarray(Number(p)>>>0,Number(c)>>>0)):[],outputShape:h?Array.from(($(),A).subarray(Number(h)>>>0,Number(f)>>>0)):[],activation:e5(m)})},935571:(t,r,n,i,o,a,s,u,l,d,p,c,h,f)=>{e.ac("ConvTranspose",t,{format:u?"NHWC":"NCHW",autoPad:r,dilations:Array.from(($(),A).subarray(Number(n)>>>0,2+(Number(n)>>>0)>>>0)),group:i,kernelShape:Array.from(($(),A).subarray(Number(o)>>>0,2+(Number(o)>>>0)>>>0)),pads:Array.from(($(),A).subarray(Number(a)>>>0,4+(Number(a)>>>0)>>>0)),strides:Array.from(($(),A).subarray(Number(s)>>>0,2+(Number(s)>>>0)>>>0)),wIsConst:()=>!!($(),I)[l>>>0],outputPadding:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],outputShape:c?Array.from(($(),A).subarray(Number(c)>>>0,Number(h)>>>0)):[],activation:e5(f)})},936232:(t,r,n,i,o,a,s,u,l,d,p,c,h,f,m)=>{e.ac("ConvTranspose",t,{format:l?"NHWC":"NCHW",autoPad:r,dilations:[n],group:i,kernelShape:[o],pads:[a,s],strides:[u],wIsConst:()=>!!($(),I)[d>>>0],outputPadding:p?Array.from(($(),A).subarray(Number(p)>>>0,Number(c)>>>0)):[],outputShape:h?Array.from(($(),A).subarray(Number(h)>>>0,Number(f)>>>0)):[],activation:e5(m)})},936665:(t,r,n,i,o,a,s,u,l,d,p,c,h,f)=>{e.ac("ConvTranspose",t,{format:u?"NHWC":"NCHW",autoPad:r,dilations:Array.from(($(),A).subarray(Number(n)>>>0,2+(Number(n)>>>0)>>>0)),group:i,kernelShape:Array.from(($(),A).subarray(Number(o)>>>0,2+(Number(o)>>>0)>>>0)),pads:Array.from(($(),A).subarray(Number(a)>>>0,4+(Number(a)>>>0)>>>0)),strides:Array.from(($(),A).subarray(Number(s)>>>0,2+(Number(s)>>>0)>>>0)),wIsConst:()=>!!($(),I)[l>>>0],outputPadding:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],outputShape:c?Array.from(($(),A).subarray(Number(c)>>>0,Number(h)>>>0)):[],activation:e5(f)})},937326:(t,r)=>{e.ac("GlobalAveragePool",t,{format:r?"NHWC":"NCHW"})},937417:(t,r,n,i,o,a,s,u,l,d,p,c,h,f)=>{e.ac("AveragePool",t,{format:f?"NHWC":"NCHW",auto_pad:r,ceil_mode:n,count_include_pad:i,storage_order:o,dilations:a?Array.from(($(),A).subarray(Number(a)>>>0,Number(s)>>>0)):[],kernel_shape:u?Array.from(($(),A).subarray(Number(u)>>>0,Number(l)>>>0)):[],pads:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],strides:c?Array.from(($(),A).subarray(Number(c)>>>0,Number(h)>>>0)):[]})},937896:(t,r)=>{e.ac("GlobalAveragePool",t,{format:r?"NHWC":"NCHW"})},937987:(t,r,n,i,o,a,s,u,l,d,p,c,h,f)=>{e.ac("AveragePool",t,{format:f?"NHWC":"NCHW",auto_pad:r,ceil_mode:n,count_include_pad:i,storage_order:o,dilations:a?Array.from(($(),A).subarray(Number(a)>>>0,Number(s)>>>0)):[],kernel_shape:u?Array.from(($(),A).subarray(Number(u)>>>0,Number(l)>>>0)):[],pads:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],strides:c?Array.from(($(),A).subarray(Number(c)>>>0,Number(h)>>>0)):[]})},938466:(t,r)=>{e.ac("GlobalMaxPool",t,{format:r?"NHWC":"NCHW"})},938553:(t,r,n,i,o,a,s,u,l,d,p,c,h,f)=>{e.ac("MaxPool",t,{format:f?"NHWC":"NCHW",auto_pad:r,ceil_mode:n,count_include_pad:i,storage_order:o,dilations:a?Array.from(($(),A).subarray(Number(a)>>>0,Number(s)>>>0)):[],kernel_shape:u?Array.from(($(),A).subarray(Number(u)>>>0,Number(l)>>>0)):[],pads:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],strides:c?Array.from(($(),A).subarray(Number(c)>>>0,Number(h)>>>0)):[]})},939028:(t,r)=>{e.ac("GlobalMaxPool",t,{format:r?"NHWC":"NCHW"})},939115:(t,r,n,i,o,a,s,u,l,d,p,c,h,f)=>{e.ac("MaxPool",t,{format:f?"NHWC":"NCHW",auto_pad:r,ceil_mode:n,count_include_pad:i,storage_order:o,dilations:a?Array.from(($(),A).subarray(Number(a)>>>0,Number(s)>>>0)):[],kernel_shape:u?Array.from(($(),A).subarray(Number(u)>>>0,Number(l)>>>0)):[],pads:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],strides:c?Array.from(($(),A).subarray(Number(c)>>>0,Number(h)>>>0)):[]})},939590:(t,r,n,i,o)=>{e.ac("Gemm",t,{alpha:r,beta:n,transA:i,transB:o})},939694:t=>{e.ac("MatMul",t,void 0)},939748:(t,r,n,i)=>{e.ac("ArgMax",t,{keepDims:!!r,selectLastIndex:!!n,axis:i})},939856:(t,r,n,i)=>{e.ac("ArgMin",t,{keepDims:!!r,selectLastIndex:!!n,axis:i})},939964:(t,r)=>{e.ac("Softmax",t,{axis:r})},940027:(t,r)=>{e.ac("Concat",t,{axis:r})},940087:(t,r,n,i,o)=>{e.ac("Split",t,{axis:r,numOutputs:n,splitSizes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},940243:t=>{e.ac("Expand",t,void 0)},940297:(t,r)=>{e.ac("Gather",t,{axis:Number(r)})},940368:(t,r)=>{e.ac("GatherElements",t,{axis:Number(r)})},940447:(t,r)=>{e.ac("GatherND",t,{batch_dims:Number(r)})},940526:(t,r,n,i,o,a,s,u,l,d,p)=>{e.ac("Resize",t,{antialias:r,axes:n?Array.from(($(),A).subarray(Number(n)>>>0,Number(i)>>>0)):[],coordinateTransformMode:e5(o),cubicCoeffA:a,excludeOutside:s,extrapolationValue:u,keepAspectRatioPolicy:e5(l),mode:e5(d),nearestMode:e5(p)})},940888:(t,r,n,i,o,a,s)=>{e.ac("Slice",t,{starts:r?Array.from(($(),A).subarray(Number(r)>>>0,Number(n)>>>0)):[],ends:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[],axes:a?Array.from(($(),A).subarray(Number(a)>>>0,Number(s)>>>0)):[]})},941152:t=>{e.ac("Tile",t,void 0)},941204:(t,r,n)=>{e.ac("InstanceNormalization",t,{epsilon:r,format:n?"NHWC":"NCHW"})},941318:(t,r,n)=>{e.ac("InstanceNormalization",t,{epsilon:r,format:n?"NHWC":"NCHW"})},941432:t=>{e.ac("Range",t,void 0)},941485:(t,r)=>{e.ac("Einsum",t,{equation:e5(r)})},941566:(t,r,n,i,o)=>{e.ac("Pad",t,{mode:r,value:n,pads:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},941709:(t,r,n,i,o,a)=>{e.ac("BatchNormalization",t,{epsilon:r,momentum:n,spatial:!!o,trainingMode:!!i,format:a?"NHWC":"NCHW"})},941878:(t,r,n,i,o,a)=>{e.ac("BatchNormalization",t,{epsilon:r,momentum:n,spatial:!!o,trainingMode:!!i,format:a?"NHWC":"NCHW"})},942047:(t,r,n)=>{e.ac("CumSum",t,{exclusive:Number(r),reverse:Number(n)})},942144:(t,r,n)=>{e.ac("DequantizeLinear",t,{axis:r,blockSize:n})},942234:(t,r,n,i,o)=>{e.ac("GridSample",t,{align_corners:r,mode:e5(n),padding_mode:e5(i),format:o?"NHWC":"NCHW"})},942404:(t,r,n,i,o)=>{e.ac("GridSample",t,{align_corners:r,mode:e5(n),padding_mode:e5(i),format:o?"NHWC":"NCHW"})},942574:(t,r)=>{e.ac("ScatterND",t,{reduction:e5(r)})},942659:(t,r,n,i,o,a,s,u,l)=>{e.ac("Attention",t,{numHeads:r,isUnidirectional:n,maskFilterValue:i,scale:o,doRotary:a,qkvHiddenSizes:s?Array.from(($(),A).subarray(Number(u)>>>0,Number(u)+s>>>0)):[],pastPresentShareBuffer:!!l})},942931:t=>{e.ac("BiasAdd",t,void 0)},942986:t=>{e.ac("BiasSplitGelu",t,void 0)},943047:t=>{e.ac("FastGelu",t,void 0)},943103:(t,r,n,i,o,a,s,u,l,d,p,c,h,f,m,g)=>{e.ac("Conv",t,{format:c?"NHWC":"NCHW",auto_pad:r,dilations:n?Array.from(($(),A).subarray(Number(n)>>>0,Number(i)>>>0)):[],group:o,kernel_shape:a?Array.from(($(),A).subarray(Number(a)>>>0,Number(s)>>>0)):[],pads:u?Array.from(($(),A).subarray(Number(u)>>>0,Number(l)>>>0)):[],strides:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],w_is_const:()=>!!($(),I)[Number(h)>>>0],activation:e5(f),activation_params:m?Array.from(($(),k).subarray(Number(m)>>>0,Number(g)>>>0)):[]})},943687:t=>{e.ac("Gelu",t,void 0)},943739:(t,r,n,i,o,a,s,u,l)=>{e.ac("GroupQueryAttention",t,{numHeads:r,kvNumHeads:n,scale:i,softcap:o,doRotary:a,rotaryInterleaved:s,smoothSoftmax:u,localWindowSize:l})},943956:(t,r,n,i)=>{e.ac("LayerNormalization",t,{axis:r,epsilon:n,simplified:!!i})},944067:(t,r,n,i)=>{e.ac("LayerNormalization",t,{axis:r,epsilon:n,simplified:!!i})},944178:(t,r,n,i,o,a)=>{e.ac("MatMulNBits",t,{k:r,n:n,accuracyLevel:i,bits:o,blockSize:a})},944305:(t,r,n,i,o,a)=>{e.ac("MultiHeadAttention",t,{numHeads:r,isUnidirectional:n,maskFilterValue:i,scale:o,doRotary:a})},944464:(t,r)=>{e.ac("QuickGelu",t,{alpha:r})},944528:(t,r,n,i,o)=>{e.ac("RotaryEmbedding",t,{interleaved:!!r,numHeads:n,rotaryEmbeddingDim:i,scale:o})},944667:(t,r,n)=>{e.ac("SkipLayerNormalization",t,{epsilon:r,simplified:!!n})},944769:(t,r,n)=>{e.ac("SkipLayerNormalization",t,{epsilon:r,simplified:!!n})},944871:(t,r,n,i)=>{e.ac("GatherBlockQuantized",t,{gatherAxis:r,quantizeAxis:n,blockSize:i})},944992:t=>{e.Id(t)},945026:(t,r)=>e.Kd(Number(t),Number(r),e.$c.Nd,e.$c.errors)};function o5(t,r,n){return rW(async()=>{await e.Gd(Number(t),Number(r),Number(n))})}function o7(){return"u">typeof wasmOffsetConverter}function o9(e,t,r,n){var i=iK();try{return or(e,t,r,n)}catch(e){if(iH(i),e!==e+0)throw e;iU(1,0)}}function ae(e,t,r){var n=iK();try{return i8(e,t,r)}catch(e){if(iH(n),e!==e+0)throw e;iU(1,0)}}function an(e,t,r){var n=iK();try{iY(e,t,r)}catch(e){if(iH(n),e!==e+0)throw e;iU(1,0)}}function ai(e,t){var r=iK();try{return i1(e,t)}catch(e){if(iH(r),e!==e+0)throw e;iU(1,0)}}function as(e){var t=iK();try{i2(e)}catch(e){if(iH(t),e!==e+0)throw e;iU(1,0)}}function al(e,t,r,n,i,o,a){var s=iK();try{return i7(e,t,r,n,i,o,a)}catch(e){if(iH(s),e!==e+0)throw e;iU(1,0)}}function ad(e,t){var r=iK();try{on(e,t)}catch(e){if(iH(r),e!==e+0)throw e;iU(1,0)}}function ap(e,t,r,n,i,o){var a=iK();try{i4(e,t,r,n,i,o)}catch(e){if(iH(a),e!==e+0)throw e;iU(1,0)}}function ah(e,t,r,n){var i=iK();try{i9(e,t,r,n)}catch(e){if(iH(i),e!==e+0)throw e;iU(1,0)}}function a$(e,t,r,n,i){var o=iK();try{i6(e,t,r,n,i)}catch(e){if(iH(o),e!==e+0)throw e;iU(1,0)}}function aT(e,t,r,n,i,o,a){var s=iK();try{od(e,t,r,n,i,o,a)}catch(e){if(iH(s),e!==e+0)throw e;iU(1,0)}}function aS(e,t,r,n,i,o,a){var s=iK();try{op(e,t,r,n,i,o,a)}catch(e){if(iH(s),e!==e+0)throw e;iU(1,0)}}function ak(e,t,r,n,i,o,a,s){var u=iK();try{oS(e,t,r,n,i,o,a,s)}catch(e){if(iH(u),e!==e+0)throw e;iU(1,0)}}function aN(e,t,r,n,i){var o=iK();try{return oi(e,t,r,n,i)}catch(e){if(iH(o),e!==e+0)throw e;iU(1,0)}}function az(e,t,r,n,i,o,a,s){var u=iK();try{ok(e,t,r,n,i,o,a,s)}catch(e){if(iH(u),e!==e+0)throw e;iU(1,0)}}function aR(e,t,r,n,i,o,a,s,u,l,d,p){var c=iK();try{oh(e,t,r,n,i,o,a,s,u,l,d,p)}catch(e){if(iH(c),e!==e+0)throw e;iU(1,0)}}function aB(e,t,r,n,i,o){var a=iK();try{return o$(e,t,r,n,i,o)}catch(e){if(iH(a),e!==e+0)throw e;iU(1,0)}}function aM(e,t,r){var n=iK();try{return oN(e,t,r)}catch(e){if(iH(n),e!==e+0)throw e;return iU(1,0),0n}}function aF(e,t,r,n,i,o,a,s,u){var l=iK();try{i5(e,t,r,n,i,o,a,s,u)}catch(e){if(iH(l),e!==e+0)throw e;iU(1,0)}}function aj(e){var t=iK();try{return oz(e)}catch(e){if(iH(t),e!==e+0)throw e;iU(1,0)}}function aL(e,t,r){var n=iK();try{return oR(e,t,r)}catch(e){if(iH(n),e!==e+0)throw e;iU(1,0)}}function aV(e,t){var r=iK();try{return oJ(e,t)}catch(e){if(iH(r),e!==e+0)throw e;return iU(1,0),0n}}function aU(e,t,r,n,i){var o=iK();try{oB(e,t,r,n,i)}catch(e){if(iH(o),e!==e+0)throw e;iU(1,0)}}function aq(e){var t=iK();try{return oM(e)}catch(e){if(iH(t),e!==e+0)throw e;return iU(1,0),0n}}function aG(e,t,r,n,i,o){var a=iK();try{return oq(e,t,r,n,i,o)}catch(e){if(iH(a),e!==e+0)throw e;iU(1,0)}}function aH(e,t,r,n,i,o){var a=iK();try{return oG(e,t,r,n,i,o)}catch(e){if(iH(a),e!==e+0)throw e;iU(1,0)}}function aW(e,t,r,n,i,o,a,s){var u=iK();try{return oT(e,t,r,n,i,o,a,s)}catch(e){if(iH(u),e!==e+0)throw e;iU(1,0)}}function aK(e,t,r,n,i){var o=iK();try{return oH(e,t,r,n,i)}catch(e){if(iH(o),e!==e+0)throw e;return iU(1,0),0n}}function aX(e,t,r,n){var i=iK();try{return oW(e,t,r,n)}catch(e){if(iH(i),e!==e+0)throw e;iU(1,0)}}function aZ(e,t,r,n){var i=iK();try{return oK(e,t,r,n)}catch(e){if(iH(i),e!==e+0)throw e;iU(1,0)}}function aQ(e,t,r,n,i,o,a,s,u,l,d,p){var c=iK();try{return oX(e,t,r,n,i,o,a,s,u,l,d,p)}catch(e){if(iH(c),e!==e+0)throw e;iU(1,0)}}function aJ(e,t,r,n,i,o,a,s,u,l,d){var p=iK();try{oV(e,t,r,n,i,o,a,s,u,l,d)}catch(e){if(iH(p),e!==e+0)throw e;iU(1,0)}}function aY(e,t,r,n,i,o,a,s,u,l,d,p,c,h,f,m){var g=iK();try{oU(e,t,r,n,i,o,a,s,u,l,d,p,c,h,f,m)}catch(e){if(iH(g),e!==e+0)throw e;iU(1,0)}}function a1(e,t,r,n){var i=iK();try{return oZ(e,t,r,n)}catch(e){if(iH(i),e!==e+0)throw e;iU(1,0)}}function a2(e,t,r,n,i){var o=iK();try{return oQ(e,t,r,n,i)}catch(e){if(iH(o),e!==e+0)throw e;iU(1,0)}}function a4(e,t,r){var n=iK();try{return oF(e,t,r)}catch(e){if(iH(n),e!==e+0)throw e;iU(1,0)}}function a6(e,t,r){var n=iK();try{return oj(e,t,r)}catch(e){if(iH(n),e!==e+0)throw e;iU(1,0)}}function a8(e,t,r,n){var i=iK();try{oL(e,t,r,n)}catch(e){if(iH(i),e!==e+0)throw e;iU(1,0)}}function a5(){if(0<Y)ee=a5;else if(n)f?.(e),V();else{for(;0<J.length;)J.shift()(e);0<Y?ee=a5:(e.calledRun=!0,x||(V(),f?.(e)))}}return n||(o4=await W(),a5()),e.PTR_SIZE=4,M?e:new Promise((e,t)=>{f=e,m=t})}Sr(Yy,{default:()=>n3});var n3,r_,ac,Ot,o_,ic,i3,a3,i_,s3,t_,a_,n_,s_,sc,uc,Ia,u_,u3,l3,c3,ga,Re,Pt,Fo,Oe,l_,d3,p3,f3,$a,h3,d_,yr,Vn,_r,uo,Vo,Aa,Oa,lc,Go,m3,g3,f_,h_,Pa,b3,be,dc,Un,D,Gr,Ea,m_,g_,Ca,y_,hc,__,y3,b_,_3,w_,Da,ka,fc,v_,Na,w3,La,I_,mc,gc,v3,x3,S_,yc,bc,A_,_c,le,Ur,vc,Me,at,U,Pe,xc,Wr,Xt,Z,za,L,F,P_,Ma,wc,E_,T3,C_,I3,S3,$3,A3,st,D_,k_,O3,P3,E3,C3,D3,k3,N3,L3,R3,z3,Wn,N_,L_,R_,z_,M_,B_,F_,V_,G_,U_,Hn,M3,Fa,Tc,qn,B3,F3,V3,G3,U3,W3,H3,q3,j3,K3,jn,H_,q_,j_,K_,X_,Z_,J_,Q_,Y_,e0,t0,n0,r0,Ic,X3,Sc,Z3,J3,Q3,lo,Y3,i0,eE,tE,nE,a0,rE,oE,u0,iE,De,c0,d0,p0,f0,h0,m0,g0,b0,y0,aE,_0,w0,v0,x0,Uo,T0,Ga,I0,S0,$0,A0,O0,P0,E0,C0,D0,k0,N0,L0,R0,z0,M0,B0,F0,V0,$c,Ac,G0,U0,W0,sE,uE,H0,lE,cE,j0,dE,pE,Kn,X0,Z0,J0,Q0,Y0,ew,tw,nw,rw,ow,hE,mE,gE,bE,aw,sw,Zt,Jt,Qt,Wa,ot,lw,cw,Wo,qa,yE,_E,Oc,pw,wE,Pc,vE,Ho,xE,fw,TE,mw,Xa,IE,gw,SE,bw,yw,ww,vw,$E,Ec,AE,Cc,Dc,Tw,OE,PE,kc,Sw,EE,CE,DE,Aw,Ow,kE,Pw,NE,Ew,LE,Dw,kw,RE,zE,ME,Lw,Rw,Nc,Za,Mw,FE,Lc,Rc,Bw,VE,Fw,Vw,GE,Uw,UE,WE,Ww,HE,qw,qE,jE,Kw,Xw,KE,Jw,Qw,XE,ZE,ev,tv,JE,QE,rv,ov,YE,eC,av,sv,er,vr,co,po,tC,nC,rC,oC,iC,aC,sC,uC,lv,cv,Tt,dC,fv,pv,pC,qo,hv,fC,hC,mC,gC,Mc,mv,gv,bC,Ja,bv,yC,_C,yv,wC,_v,vv,vC,xC,xv,TC,IC,Iv,SC,$v,$C,AC,OC,Ov,Pv,PC,EC,CC,DC,kC,NC,LC,RC,Cv,Qa,kv,Nv,Lv,Rv,zC,MC,zv,Mv,Bv,Fv,Vv,Gv,Uv,Wv,Hv,qv,jv,Kv,FC,VC,Zv,Jv,GC,UC,Yv,WC,HC,tx,nx,qC,jC,KC,ox,XC,ZC,JC,QC,YC,eD,tD,nD,ix,rD,oD,iD,aD,sD,ax,sx,uD,lD,lx,cD,Ya,dD,dx,pD,fD,px,fx,hD,mD,mx,gx,yx,gD,bD,yD,_x,_D,wD,vx,Tx,es,e_=N(()=>{"use strict";n3=Qy,globalThis.self?.name?.startsWith("em-pthread")&&Qy()}),ma=N(()=>{"use strict";ha(),r_=typeof location>"u"?void 0:location.origin,ac=import.meta.url>"file:"&&import.meta.url<"file;",Ot=(()=>{if(ac){let e=URL;return new URL(new e("ort.all.bundle.min.mjs",import.meta.url).href,r_).href}return import.meta.url})(),o_=()=>{if(Ot&&!Ot.startsWith("blob:"))return Ot.substring(0,Ot.lastIndexOf("/")+1)},ic=(e,t)=>{try{let r=t??Ot;return(r?new URL(e,r):new URL(e)).origin===r_}catch{return!1}},i3=(e,t)=>{let r=t??Ot;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},a3=(e,t)=>`${t??"./"}${e}`,i_=async e=>{let t=await (await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},s3=async e=>(await import(e)).default,t_=(Jy(),Xr(Zy)).default,a_=async()=>{if(!Ot)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(ic(Ot))return[void 0,t_()];let e=await i_(Ot);return[e,t_(e)]},n_=(e_(),Xr(Yy)).default,s_=async(e,t,r,n)=>{let i=n_&&!(e||t);if(i)if(Ot)i=ic(Ot)||n&&!r;else if(n&&!r)i=!0;else throw Error("cannot determine the script source URL.");if(i)return[void 0,n_];{let n="ort-wasm-simd-threaded.jsep.mjs",i=e??i3(n,t),o=r&&i&&!ic(i,t),a=o?await i_(i):i??a3(n,t);return[o?a:void 0,await s3(a)]}}}),br=N(()=>{"use strict";ma(),uc=!1,Ia=!1,u_=!1,u3=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},l3=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},c3=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},ga=async e=>{if(uc)return Promise.resolve();if(Ia)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(u_)throw Error("previous call to 'initializeWebAssembly()' failed.");Ia=!0;let t=e.initTimeout,r=e.numThreads;if(!1!==e.simd){if("relaxed"===e.simd){if(!c3())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!l3())throw Error("WebAssembly SIMD is not supported in the current environment.")}let n=u3();r>1&&!n&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let i=e.wasmPaths,o="string"==typeof i?i:void 0,a=i?.mjs,s=a?.href??a,u=i?.wasm,l=u?.href??u,d=e.wasmBinary,[p,c]=await s_(s,o,r>1,!!d||!!l),h=!1,f=[];if(t>0&&f.push(new Promise(e=>{setTimeout(()=>{h=!0,e()},t)})),f.push(new Promise((e,t)=>{let n={numThreads:r};if(d)n.wasmBinary=d,n.locateFile=e=>e;else if(l||o)n.locateFile=e=>l??o+e;else if(s&&0!==s.indexOf("blob:"))n.locateFile=e=>new URL(e,s).href;else if(p){let e=o_();e&&(n.locateFile=t=>e+t)}c(n).then(t=>{Ia=!1,uc=!0,sc=t,e(),p&&URL.revokeObjectURL(p)},e=>{Ia=!1,u_=!0,t(e)})})),await Promise.race(f),h)throw Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Re=()=>{if(uc&&sc)return sc;throw Error("WebAssembly is not initialized yet.")}}),Sa=N(()=>{"use strict";br(),Pt=(e,t)=>{let r=Re(),n=r.lengthBytesUTF8(e)+1,i=r._malloc(n);return r.stringToUTF8(e,i,n),t.push(i),i},Fo=(e,t,r,n)=>{if("object"==typeof e&&null!==e){if(r.has(e))throw Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([e,i])=>{let o=t?t+e:e;if("object"==typeof i)Fo(i,o+".",r,n);else if("string"==typeof i||"number"==typeof i)n(o,i.toString());else if("boolean"==typeof i)n(o,i?"1":"0");else throw Error(`Can't handle extra config type: ${typeof i}`)})},Oe=e=>{let t=Re(),r=t.stackSave();try{let r=t.PTR_SIZE,n=t.stackAlloc(2*r);t._OrtGetLastError(n,n+r);let i=Number(t.getValue(n,4===r?"i32":"i64")),o=t.getValue(n+r,"*"),a=o?t.UTF8ToString(o):"";throw Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${a}`)}finally{t.stackRestore(r)}}}),c_=N(()=>{"use strict";br(),Sa(),l_=e=>{let t=Re(),r=0,n=[],i=e||{};try{if(e?.logSeverityLevel===void 0)i.logSeverityLevel=2;else if("number"!=typeof e.logSeverityLevel||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)i.logVerbosityLevel=0;else if("number"!=typeof e.logVerbosityLevel||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(i.terminate=!1);let o=0;return e?.tag!==void 0&&(o=Pt(e.tag,n)),r=t._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,o),0===r&&Oe("Can't create run options."),e?.extra!==void 0&&Fo(e.extra,"",new WeakSet,(e,i)=>{let o=Pt(e,n),a=Pt(i,n);0!==t._OrtAddRunConfigEntry(r,o,a)&&Oe(`Can't set a run config entry: ${e} - ${i}.`)}),[r,n]}catch(e){throw 0!==r&&t._OrtReleaseRunOptions(r),n.forEach(e=>t._free(e)),e}}}),p_=N(()=>{"use strict";br(),Sa(),d3=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}},p3=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${e}`)}},f3=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(e=>("string"==typeof e?e:e.name)==="webgpu")&&(e.enableMemPattern=!1)},$a=(e,t,r,n)=>{let i=Pt(t,n),o=Pt(r,n);0!==Re()._OrtAddSessionConfigEntry(e,i,o)&&Oe(`Can't set a session config entry: ${t} - ${r}.`)},h3=async(e,t,r)=>{for(let n of t.executionProviders){let t="string"==typeof n?n:n.name,i=[];switch(t){case"webnn":if(t="WEBNN","string"!=typeof n){let t=n?.deviceType;t&&$a(e,"deviceType",t,r)}break;case"webgpu":if(t="JS","string"!=typeof n&&n?.preferredLayout){if("NCHW"!==n.preferredLayout&&"NHWC"!==n.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${n.preferredLayout}`);$a(e,"preferredLayout",n.preferredLayout,r)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${t}`)}let o=Pt(t,r),a=i.length,s=0,u=0;if(a>0){s=Re()._malloc(a*Re().PTR_SIZE),r.push(s),u=Re()._malloc(a*Re().PTR_SIZE),r.push(u);for(let e=0;e<a;e++)Re().setValue(s+e*Re().PTR_SIZE,i[e][0],"*"),Re().setValue(u+e*Re().PTR_SIZE,i[e][1],"*")}await Re()._OrtAppendExecutionProvider(e,o,s,u,a)!==0&&Oe(`Can't append execution provider: ${t}.`)}},d_=async e=>{let t=Re(),r=0,n=[],i=e||{};f3(i);try{let e=d3(i.graphOptimizationLevel??"all"),o=p3(i.executionMode??"sequential"),a="string"==typeof i.logId?Pt(i.logId,n):0,s=i.logSeverityLevel??2;if(!Number.isInteger(s)||s<0||s>4)throw Error(`log severity level is not valid: ${s}`);let u=i.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log verbosity level is not valid: ${u}`);let l="string"==typeof i.optimizedModelFilePath?Pt(i.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(e,!!i.enableCpuMemArena,!!i.enableMemPattern,o,!!i.enableProfiling,0,a,s,u,l),0===r&&Oe("Can't create session options."),i.executionProviders&&await h3(r,i,n),void 0!==i.enableGraphCapture){if("boolean"!=typeof i.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);$a(r,"enableGraphCapture",i.enableGraphCapture.toString(),n)}if(i.freeDimensionOverrides)for(let[e,o]of Object.entries(i.freeDimensionOverrides)){if("string"!=typeof e)throw Error(`free dimension override name must be a string: ${e}`);if("number"!=typeof o||!Number.isInteger(o)||o<0)throw Error(`free dimension override value must be a non-negative integer: ${o}`);let i=Pt(e,n);0!==t._OrtAddFreeDimensionOverride(r,i,o)&&Oe(`Can't set a free dimension override: ${e} - ${o}.`)}return void 0!==i.extra&&Fo(i.extra,"",new WeakSet,(e,t)=>{$a(r,e,t,n)}),[r,n]}catch(e){throw 0!==r&&0!==t._OrtReleaseSessionOptions(r)&&Oe("Can't release session options."),n.forEach(e=>t._free(e)),e}}}),ue=N(()=>{"use strict";yr=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${e}`)}},Vn=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${e}`)}},_r=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n="number"==typeof t?t:t.reduce((e,t)=>e*t,1);return r>0?Math.ceil(n*r):void 0},uo=e=>{switch(e){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},Vo=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${e}`)}},Aa=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,Oa=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint64"===e||"int8"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,lc=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${e}`)}}}),cc=N(()=>{"use strict";ha(),Go=async e=>{if("string"!=typeof e)return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e);{let t=await fetch(e);if(!t.ok)throw Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<0x40000000)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw Error(`failed to load external data file: ${e}, no response body.`);let r=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(e){if(e instanceof RangeError){let e=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let o=0;for(;;){let{done:e,value:t}=await r.read();if(e)break;let n=t.byteLength;new Uint8Array(i,o,n).set(t),o+=n}return new Uint8Array(i,0,n)}}}}),Gn=N(()=>{"use strict";ue(),m3=["V","I","W","E","F"],g3=(e,t)=>{console.log(`[${m3[e]},${new Date().toISOString()}]${t}`)},Pa=(e,t)=>{f_=e,h_=t},b3=(e,t)=>{let r=Vo(e);r>=Vo(f_)&&g3(r,"function"==typeof t?t():t)},be=(...e)=>{h_&&b3(...e)}}),fe=N(()=>{"use strict";dc=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Un=class{static calcShape(e,t,r=!1){let n=e.length,i=t.length;if(0===n)return t;if(0===i)return e;let o=Math.max(e.length,t.length),a=Array(o);if(r){if(n<2||i<2)return;let r=dc.calcMatMulShape([e[n-2],e[n-1]],[t[i-2],t[i-1]]);if(void 0===r)return;[a[o-2],a[o-1]]=r}for(let s=r?3:1;s<=o;s++){let r=n-s<0?1:e[n-s],u=i-s<0?1:t[i-s];if(r!==u&&r>1&&u>1)return;let l=Math.max(r,u);if(r&&u)a[o-s]=Math.max(r,u);else{if(l>1)return;a[o-s]=0}}return a}static isValidBroadcast(e,t){let r=e.length,n=t.length;if(r>n)return!1;for(let i=1;i<=r;i++)if(1!==e[r-i]&&e[r-i]!==t[n-i])return!1;return!0}},D=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(e,t=4){let r=e.length;if(0===r)return[];let n=Array(r),i=r-1;for(;i>=0;){if(e[i]%t==0){n[i]=e[i]/t;break}if(t%e[i]!=0)throw Error("cannot convert shape");n[i]=1,t/=e[i],i--}for(i--;i>=0;i--)n[i]=e[i];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(e,t,r){let n=1;for(let i=t;i<r;i++){if(e[i]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(e[i])}return n}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let r=Array(t);r[t-1]=1,r[t-2]=e[t-1];for(let n=t-3;n>=0;--n)r[n]=r[n+1]*e[n+1];return r}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(r=>this.normalizeAxis(r,t??e.length))}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let r=e.length;return e.map((e,n)=>e+t[n]+t[n+r])}static areEqual(e,t){return e.length===t.length&&e.every((e,r)=>e===t[r])}},Gr=class e{static adjustPoolAttributes(e,t,r,n,i,o){if(!e&&r.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=r.length?r.push(t[e+2]):r[e]=t[e+2];for(let e=0;e<r.length;e++)if(e<n.length){if(n[e]<0)throw Error("strides should be greater than or equal to 1")}else n.push(1);for(let e=0;e<r.length;e++)if(e<i.length){if(i[e]<0)throw Error("dilations should be greater than or equal to 1")}else i.push(1);for(let e=0;e<2*r.length;e++)if(e<o.length){if(o[e]<0)throw Error("pad should be greater than or equal to 1")}else o.push(0);for(let e=0;e<r.length;e++){if(r[e]<=0)throw Error("kernel shapes need to be greater than 0");if(o[e]>=r[e]||o[e+r.length]>=r[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,i,o,a,s){if(s){if(o.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+(a?1:2)],r[u],n[u],i[u],o,u,u+t.length-2,s)}}static computePoolOutputShape(t,r,n,i,o,a,s){if(r.length<=0)throw Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return e.computeShapeHelper(t,r,u,n,i,o,a,s),u}static computeConvOutputShape(t,r,n,i,o,a,s){if(t.length<=0||r.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return e.computeShapeHelper(!1,t,u,n,i,o,a,s),u}static computeShapeHelper(t,r,n,i,o,a,s,u){if(t)for(let e=0;e<r.length-2;e++)n.push(1);else for(let t=0;t<r.length-2;t++)n.push(e.adjustPadAndReturnShape(r[t+2],i[t],o[t],a[t],s,t,t+r.length-2,u))}static adjustPadAndReturnShape(e,t,r,n,i,o,a,s){let u=r*(n-1)+1;if(!s||"NOTSET"===s)return Math.floor((e+i[o]+i[a]-u)/t+1);switch(s){case"VALID":return i[o]=0,i[a]=0,Math.floor((e-u)/t+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==r)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let r=((e+t-1)/t-1)*t+n-e;return i[o]=Math.floor("SAME_LOWER"===s?(r+1)/2:r/2),i[a]=r-i[o],Math.floor((e+r-n)/t+1)}default:throw Error("Unsupported AutoPad type")}}},Ea=class{static getShapeOfGemmResult(e,t,r,n,i){let o,a,s;if(2!==e.length||2!==r.length)throw Error("shape need to be of size 2");t?(o=e[1],a=e[0]):(o=e[0],a=e[1]);let u=-1;if(n?(s=r[0],u=1):(s=r[1],u=0),r[u]!==a)throw Error("dimension mismatch");if(o<=0||s<=0||a<=0)throw Error("invalid shape specified");if(i&&!Un.isValidBroadcast(i,[o,s]))throw Error("gemm: invalid bias shape for broadcast");return[o,s,a]}},m_=-34028234663852886e22,g_=34028234663852886e22}),pc=N(()=>{"use strict";ue(),Ca=(e,t)=>new(uo(t))(e)}),x_=N(()=>{"use strict";ue(),Gn(),y_=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),hc=(e,t)=>{if("int32"===t)return e;let r=y_.get(t);if(!r)throw Error(`WebNN backend does not support data type: ${t}`);let n=r/8;if(e.byteLength%n!=0)throw Error(`Invalid Uint8Array length - must be a multiple of ${n}.`);let i=e.byteLength/n,o=new(uo(t))(e.buffer,e.byteOffset,i);switch(t){case"int64":case"uint64":{let e=new Int32Array(i);for(let t=0;t<i;t++){let r=o[t];if(r>2147483647n||r<-2147483648n)throw Error("Can not convert int64 data to int32 - value out of range.");e[t]=Number(r)}return new Uint8Array(e.buffer)}case"int8":case"uint8":case"uint32":if("uint32"===t&&o.some(e=>e>0x7fffffff))throw Error("Can not convert uint32 data to int32 - value out of range.");return new Uint8Array(Int32Array.from(o,Number).buffer);default:throw Error(`Unsupported data conversion from ${t} to 'int32'`)}},__=(e,t)=>{if("int32"===t)return e;if(e.byteLength%4!=0)throw Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,n=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":return new Uint8Array(BigInt64Array.from(n,BigInt).buffer);case"uint64":if(n.some(e=>e<0))throw Error("Can not convert int32 data to uin64 - negative value found.");return new Uint8Array(BigUint64Array.from(n,BigInt).buffer);case"int8":if(n.some(e=>e<-128||e>127))throw Error("Can not convert int32 data to int8 - value out of range.");return new Uint8Array(Int8Array.from(n,Number).buffer);case"uint8":if(n.some(e=>e<0||e>255))throw Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(n,Number);case"uint32":if(n.some(e=>e<0))throw Error("Can not convert int32 data to uint32 - negative value found.");return new Uint8Array(Uint32Array.from(n,Number).buffer);default:throw Error(`Unsupported data conversion from 'int32' to ${t}`)}},y3=1,b_=()=>y3++,_3=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),w_=(e,t)=>{let r=y_.get(e);if(!r)throw Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((e,t)=>e*t)*r/8):0},Da=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:n,dataType:i,shape:o,fallbackDataType:a}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=n,this.dataType=i,this.tensorShape=o,this.fallbackDataType=a}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return w_(this.dataType,this.tensorShape)}destroy(){be("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(!this.fallbackDataType)return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor);{let t=__(new Uint8Array(await this.mlContext.readTensor(this.mlTensor)),this.dataType);return e?void(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(t):t.buffer}}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((e,t)=>e===r[t])}setIsDataConverted(e){this.isDataConverted=e}},ka=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,n){let i=this.tensorManager.getMLContext(e),o=this.tensorManager.getMLOpSupportLimits(e),a;if(!o?.input.dataTypes.includes(t)){if(!(a=_3.get(t))||o?.input.dataTypes.includes(a))throw Error(`WebNN backend does not support data type: ${t}`);be("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${a}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,r))return this.wrapper.tensor;if(n){if(this.wrapper.byteLength!==w_(t,r))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,s,!0,!0,a),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if("int32"===this.wrapper.fallbackType)t=hc(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength)return void this.wrapper.write(t);be("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?__(this.activeUpload,this.wrapper?.type):this.activeUpload;return e?void(e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t)):t.buffer}if(!this.wrapper)throw Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},fc=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=b_();return this.tensorTrackersById.set(e,new ka(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,n,i){be("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${i}}`);let o=this.tensorTrackersById.get(t);if(!o)throw Error("Tensor not found.");return o.ensureTensor(e,r,n,i)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw Error("Tensor not found.");r.upload(t)}async download(e,t){be("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,n){let i=this.getMLContext(e),o=b_(),a=new Da({sessionId:e,context:i,tensor:t,dataType:r,shape:n});return this.tensorTrackersById.set(o,new ka(this,a)),this.externalTensors.add(a),o}async getCachedTensor(e,t,r,n,i,o,a){let s=this.getMLContext(e);for(let[n,i]of this.freeTensors.entries())if(i.canReuseTensor(s,t,r)){be("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${r}`);let i=this.freeTensors.splice(n,1)[0];return i.sessionId=e,i}be("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${r}}`);let u=await s.createTensor({dataType:a??t,shape:r,dimensions:r,usage:n,writable:i,readable:o});return new Da({sessionId:e,context:s,tensor:u,dataType:t,shape:r,fallbackDataType:a})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},v_=(...e)=>new fc(...e)}),T_=N(()=>{"use strict";ue(),br(),pc(),x_(),Gn(),Na=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),w3=(e,t)=>{if(e===t)return!0;if(void 0===e||void 0===t)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((r,i)=>r===n[i]&&e[r]===t[r])},La=class{constructor(e){this.tensorManager=v_(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Pa(e.logLevel,!!e.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(e){be("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){be("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let e of t)be("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(t=>t.gpuDevice===e);if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:t}),t}}if(void 0===e){let e=this.mlContextCache.findIndex(e=>void 0===e.options&&void 0===e.gpuDevice);if(-1!==e)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let t=this.mlContextCache.findIndex(t=>w3(t.options,e));if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),0===r.size){this.sessionIdsByMLContext.delete(t);let e=this.mlContextCache.findIndex(e=>e.mlContext===t);-1!==e&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){be("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,n,i){let o=Na.get(r);if(!o)throw Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,o,n,i)}async createTemporaryTensor(e,t,r){be("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let n=Na.get(t);if(!n)throw Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,n,r,!1);let o=this.temporarySessionTensorIds.get(e);return o?o.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!Re().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");be("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Ca(r,t)}}registerMLTensor(e,t,r,n){let i=Na.get(r);if(!i)throw Error(`Unsupported ONNX data type: ${r}`);let o=this.tensorManager.registerTensor(e,t,i,n);return be("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${n}} -> {tensorId: ${o}}`),o}registerMLConstant(e,t,r,n,i,o,a=!1){if(!o)throw Error("External mounted files are not available.");let s=e;e.startsWith("./")&&(s=e.substring(2));let u=o.get(s);if(!u)throw Error(`File with name ${s} not found in preloaded files.`);if(t+r>u.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let l=u.slice(t,t+r).buffer,d;switch(i.dataType){case"float32":d=new Float32Array(l);break;case"float16":d="u">typeof Float16Array&&Float16Array.from?new Float16Array(l):new Uint16Array(l);break;case"int32":d=new Int32Array(l);break;case"uint32":d=new Uint32Array(l);break;case"int64":a?(d=new Int32Array(hc(new Uint8Array(l),"int64").buffer),i.dataType="int32"):d=new BigInt64Array(l);break;case"uint64":d=new BigUint64Array(l);break;case"int8":d=new Int8Array(l);break;case"int4":case"uint4":case"uint8":d=new Uint8Array(l);break;default:throw Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return be("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${a?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),n.constant(i,d)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return!!r&&r.includes(t)}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return!!r&&r.includes(t)}isGraphInputOutputTypeSupported(e,t,r=!0){let n=Na.get(yr(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return!(typeof n>"u")&&(r?!!i?.input.dataTypes.includes(n):!!i?.output.dataTypes.includes(n))}flush(){}}}),Ra=N(()=>{}),O_=N(()=>{"use strict";Gn(),Ra(),I_=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),mc=[],gc=e=>16*Math.ceil(Number(e)/16),v3=e=>{for(let t=0;t<mc.length;t++){let r=mc[t];if(e<=r)return r}return 16*Math.ceil(e/16)},x3=1,S_=()=>x3++,yc=async(e,t,r,n)=>{let i=gc(r),o=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,o,0,i),e.flush(),await o.mapAsync(GPUMapMode.READ);let s=o.getMappedRange();if(!n)return new Uint8Array(s.slice(0,r));{let e=n();return e.set(new Uint8Array(s,0,r)),e}}finally{o.destroy()}},bc=class{constructor(e){for(let[t]of(this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,I_))mc.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,n=t.byteOffset,i=t.byteLength,o=gc(i),a=this.storageCache.get(e);if(!a)throw Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==i)throw Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${i}`);let s=this.backend.device.createBuffer({mappedAtCreation:!0,size:o,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(s.getMappedRange()).set(new Uint8Array(r,n,i)),s.unmap();let u=this.backend.device.createCommandEncoder();u.copyBufferToBuffer(s,0,a.gpuData.buffer,0,o),this.backend.device.queue.submit([u.finish()]),s.destroy(),be("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw Error("source gpu data for memcpy does not exist");let n=this.storageCache.get(t);if(!n)throw Error("destination gpu data for memcpy does not exist");if(r.originalSize!==n.originalSize)throw Error("inconsistent source and destination gpu data size");let i=gc(r.originalSize),o=this.backend.getCommandEncoder();this.backend.endComputePass(),o.copyBufferToBuffer(r.gpuData.buffer,0,n.gpuData.buffer,0,i)}registerExternalBuffer(e,t,r){let n;if(r){if(n=r[0],e===r[1])return be("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, buffer is the same, skip.`),n;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else n=S_();return this.storageCache.set(n,{gpuData:{id:n,type:0,buffer:e},originalSize:t}),be("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, registered.`),n}unregisterExternalBuffer(e){void 0!==e&&(this.storageCache.delete(e),be("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=v3(e),n,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,o=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||o){let e=(i?this.freeBuffers:this.freeUniformBuffers).get(r);n=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:r,usage:t})}else n=this.backend.device.createBuffer({size:r,usage:t});let a={id:S_(),type:0,buffer:n};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(e)}),be("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t="bigint"==typeof e?Number(e):e,r=this.storageCache.get(t);if(!r){if(0===this.storageCache.size)return 0;throw Error("releasing data does not exist")}return be("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw Error("data does not exist");await yc(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let e of this.buffersPending){let t=I_.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];void 0===t||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];void 0===t||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let t of(e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e)),this.buffersPending))e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,0===this.sessionCount&&(be("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},A_=(...e)=>new bc(...e)}),Je=N(()=>{"use strict";_c=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},le=e=>new _c(e)}),ge=N(()=>{"use strict";ue(),fe(),Ur=64,vc=(e,t)=>{if(3===t)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==t)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${e}`)}},Me=(e,t=1)=>{let r=vc(e,t);return"string"==typeof r?r:r[0]},at=(e,t=1)=>{let r=vc(e,t);return"string"==typeof r?r:r[1]},U=(...e)=>{let t=[];return e.forEach(e=>{0!==e.length&&t.push({type:12,data:e},{type:12,data:D.computeStrides(e)})}),t},Pe=e=>e%4==0?4:e%2==0?2:1,xc=(e="f32",t,r="0")=>t&&1!==t?`vec${t}<${e}>(${r})`:`${e}(${r})`,Wr=(e,t,r)=>"f32"===e?r:1===t?`f32(${r})`:`vec${t}<f32>(${r})`,Xt=(e,t)=>4===t?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:2===t?`(${e}.x + ${e}.y)`:3===t?`(${e}.x + ${e}.y + ${e}.z)`:e,Z=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?"string"==typeof t?"f16"===n?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:"f16"===n?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,za=(e,t,r,n,i)=>{let o,a,s,u,l="number"==typeof r,d=l?r:r.length,p=[...Array(d).keys()],c=d<2?"u32":d<=4?`vec${d}<u32>`:`array<u32, ${d}>`,h=vc(t,i),f="string"==typeof h?h:h[1],m={indices:c,value:f,storage:"string"==typeof h?h:h[0],tensor:t},g=e=>"string"==typeof e?e:`${e}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},y=l?"uniforms.":"",_=`${y}${e}_shape`,v=`${y}${e}_strides`,x="";for(let e=0;e<d-1;e++)x+=`
    let dim${e} = current / ${Z(v,e,d)};
    let rest${e} = current % ${Z(v,e,d)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;x+=`indices[${d-1}] = current;`;let w=d<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${x}
    return indices;
  }`,$=[];if(d>=2)for(let e=d-1;e>=0;e--)$.push(`${Z(v,e,d)} * (indices[${e}])`);let T=d<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${$.join("+")};
  }`,I=(...e)=>0===d?"0u":`${m.indices}(${e.map(g).join(",")})`,S=(e,t)=>d<2?`${e}`:`${Z(e,t,d)}`,O={},E=(t,r)=>(()=>{if(m.storage===m.value)return`${e}[${t}]=${r};`;if("vec2<u32>"===m.storage&&"i32"===m.value)return`${e}[${t}]=vec2<u32>(u32(${r}), select(0u, 0xFFFFFFFFu, ${r} < 0));`;if("vec2<u32>"===m.storage&&"u32"===m.value)return`${e}[${t}]=vec2<u32>(u32(${r}), 0u);`;if("u32"===m.storage&&"vec4<bool>"===m.value)return`${e}[${t}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${r}));`;throw Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),A=t=>(()=>{if(m.storage===m.value)return`${e}[${t}]`;if("vec2<u32>"===m.storage&&"i32"===m.value)return`i32(${e}[${t}].x)`;if("vec2<u32>"===m.storage&&"u32"===m.value)return`u32(${e}[${t}].x)`;if("u32"===m.storage&&"vec4<bool>"===m.value)return`vec4<bool>(bool(${e}[${t}] & 0xFFu), bool(${e}[${t}] & 0xFF00u), bool(${e}[${t}] & 0xFF0000u), bool(${e}[${t}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),P=d<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${f} {
    return ${A(`i2o_${e}(indices)`)};
  }`,k=d<2?"":(o=p.map(e=>`d${e}: u32`).join(", "),a=p.map(e=>`d${e}`).join(", "),`
  fn get_${e}(${o}) -> ${f} {
    return get_${e}ByIndices(${I(a)});
  }`),C=d<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${f}) {
    ${E(`i2o_${e}(indices)`,"value")}
  }`,z=d<2?"":(s=p.map(e=>`d${e}: u32`).join(", "),u=p.map(e=>`d${e}`).join(", "),`
  fn set_${e}(${s}, value: ${f}) {
    set_${e}ByIndices(${I(u)}, value);
  }`);return{impl:()=>{let e=[],t=!1;return b.offsetToIndices&&(e.push(w),t=!0),b.indicesToOffset&&(e.push(T),t=!0),b.broadcastedIndicesToOffset&&(Object.values(O).forEach(t=>e.push(t)),t=!0),b.set&&(e.push(z),t=!0),b.setByIndices&&(e.push(C),t=!0),b.get&&(e.push(k),t=!0),b.getByIndices&&(e.push(P),t=!0),!l&&t&&e.unshift(`const ${_} = ${m.indices}(${r.join(",")});`,`const ${v} = ${m.indices}(${D.computeStrides(r).join(",")});`),e.join(`
`)},type:m,offsetToIndices:t=>(b.offsetToIndices=!0,d<2?t:`o2i_${e}(${t})`),indicesToOffset:t=>(b.indicesToOffset=!0,d<2?t:`i2o_${e}(${t})`),broadcastedIndicesToOffset:(t,r)=>{b.broadcastedIndicesToOffset=!0;let n=`${r.name}broadcastedIndicesTo${e}Offset`;if(n in O)return`${n}(${t})`;let i=[];for(let e=d-1;e>=0;e--){let t=r.indicesGet("outputIndices",e+r.rank-d);i.push(`${S(v,e)} * (${t} % ${S(_,e)})`)}return O[n]=`fn ${n}(outputIndices: ${r.type.indices}) -> u32 {
             return ${i.length>0?i.join("+"):"0u"};
           }`,`${n}(${t})`},indices:I,indicesGet:S,indicesSet:(e,t,r)=>d<2?`${e}=${r};`:`${Z(e,t,d)}=${r};`,set:(...t)=>{if(t.length!==d+1)throw Error(`indices length must be ${d}`);let r=t[d];if("string"!=typeof r)throw Error("value must be string");let n=t.slice(0,d).map(g).join(",");return 0===d?E("0u",r):1===d?E(n[0],r):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${n}, ${r})`)},setByOffset:E,setByIndices:(t,r)=>d<2?E(t,r):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${t}, ${r});`),get:(...t)=>{if(t.length!==d)throw Error(`indices length must be ${d}`);let r=t.map(g).join(",");return 0===d?A("0u"):1===d?A(r[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${r})`)},getByOffset:A,getByIndices:t=>d<2?A(t):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${t})`),usage:n,name:e,strides:v,shape:_,rank:d}},L=(e,t,r,n=1)=>za(e,t,r,"input",n),F=(e,t,r,n=1)=>za(e,t,r,"output",n),P_=(e,t,r)=>za(e,t,r,"atomicOutput",1),Ma=(e,t,r,n=1)=>za(e,t,r,"internal",n),wc=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${"number"==typeof e?`${e}u`:e}) { return; }`}mainStart(e=Ur){let t="number"==typeof e?e:e[0],r="number"==typeof e?1:e[1],n="number"==typeof e?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||n>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*n>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],o=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*n}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${n})
  fn main(${o}) {
    ${a}
  `}appendVariableUniforms(e){0!==e.rank&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if("internal"===e.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r="input"===e.usage?"read":"read_write",n="atomicOutput"===e.usage?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${n}>;`}declareVariables(...e){return e.map(e=>this.declareVariable(e,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if("internal"!==e.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let e=[];for(let{name:t,type:r,length:n}of this.uniforms)if(n&&n>4)"f16"===r?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(n/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(n/4)}>`);else{let i=null==n||1===n?r:`vec${n}<${r}>`;e.push(`${t}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(0!==this.uniforms.length)return this.uniforms.map(e=>[[12,10,1,6][["u32","f16","f32","i32"].indexOf(e.type)],e.length??1])}},E_=(e,t)=>new wc(e,t)}),Yn=N(()=>{"use strict";ue(),fe(),Je(),ge(),T3=(e,t)=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if(0!==t.length&&t.length!==e[0].dims.length)throw Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},C_=(e,t)=>0!==t.length?t:[...Array(e).keys()].reverse(),I3=(e,t)=>D.sortBasedOnPerm(e,C_(e.length,t)),S3=(e,t,r,n)=>{let i=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let r=0;r<t;++r)i+=`a[${e[r]}]=i[${r}];`;return i+"return a;}"},$3=(e,t)=>{let r=[],n=[];for(let i=0;i<e.length;++i)1!==e[i]&&r.push(e[i]),1!==e[t[i]]&&n.push(t[i]);return{newShape:r,newPerm:n}},A3=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(1!==t[e[n]]){if(e[n]<r)return!1;r=e[n]}return!0},st=(e,t)=>{let r=e.dataType,n=e.dims.length,i=C_(n,t),o=I3(e.dims,i),a=e.dims,s=o;if(n<2||A3(i,e.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=D.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64/4)},programUniforms:[{type:12,data:Math.ceil(t/4)}]}},getShaderSource:e=>{let t=L("input",r,a,4),n=F("output",r,s,4);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,n)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:u,newPerm:l}=$3(e.dims,i),d=D.areEqual(l,[2,3,1]),p=D.areEqual(l,[3,1,2]);return 2===u.length||d||p?(s=[(a=d?[u[0],u[1]*u[2]]:p?[u[0]*u[1],u[2]]:u)[1],a[0]],{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=D.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(s[1]/16),y:Math.ceil(s[0]/16)},programUniforms:[{type:12,data:t},...U(a,s)]}},getShaderSource:e=>{let t=L("a",r,a.length),n=F("output",r,s.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,n)}
  var<workgroup> tile : array<array<${n.type.value}, 17>, 16>;
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
      ${n.setByIndices(`${n.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`}}):{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let t=D.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:[{type:12,data:t},...U(a,s)]}},getShaderSource:e=>{let t=L("a",r,a.length),o=F("output",r,s.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,o)}

  ${S3(i,n,t,o)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${o.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${o.setByOffset("global_idx",t.getByIndices("aIndices"))}
  }`}}},D_=(e,t)=>{T3(e.inputs,t.perm),e.compute(st(e.inputs[0],t.perm))},k_=e=>le({perm:e.perm})}),W_=N(()=>{"use strict";ue(),fe(),ge(),Ba(),Yn(),O3={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},P3={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},E3={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},C3={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},D3=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},k3=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)-1===t.indexOf(i)&&r.push(e[i]);return[r,t.map(t=>e[t])]},N3=(e,t)=>{let r=e.length+t.length,n=[],i=0;for(let o=0;o<r;o++)-1===t.indexOf(o)?n.push(e[i++]):n.push(1);return n},L3=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},R3=(e,t)=>{let r=[];if(!L3(e,t)){for(let n=0;n<t;++n)-1===e.indexOf(n)&&r.push(n);e.forEach(e=>r.push(e))}return r},z3=(e,t,r,n,i,o,a)=>{let s=r[0].dims,u=D.size(o),l=D.size(a),d=L("_A",r[0].dataType,s),p=F("output",i,o),c=64;1===u&&(c=256);let h=`
          var<workgroup> aBestValues : array<f32, ${c}>;
       `;return{name:e,shaderCache:{hint:`${t};${c}`,inputDependencies:["type"]},getShaderSource:e=>`
        ${e.registerUniform("reduceSize","u32").declareVariables(d,p)}
        ${h}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${e.mainStart(c)}

          let outputIndex = global_idx / ${c};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${E3[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${c}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${O3[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${c}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${P3[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${"mean"===n?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${C3[n]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Wn=(e,t,r,n)=>{let i=1===e.inputs.length?r:Tc(e.inputs,r),o=i.axes;0!==o.length||i.noopWithEmptyAxes||(o=e.inputs[0].dims.map((e,t)=>t));let a=D.normalizeAxes(o,e.inputs[0].dims.length),s=a,u=e.inputs[0],l=R3(s,e.inputs[0].dims.length);l.length>0&&(u=e.compute(st(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],s=D3(s.length,u.dims.length));let[d,p]=k3(u.dims,s),c=d;i.keepDims&&(c=N3(d,a)),e.compute(z3(t,i.cacheKey,[u],n,e.inputs[0].dataType,c,p),{inputs:[u]})},N_=(e,t)=>{Wn(e,"ReduceMeanShared",t,"mean")},L_=(e,t)=>{Wn(e,"ReduceL1Shared",t,"l1")},R_=(e,t)=>{Wn(e,"ReduceL2Shared",t,"l2")},z_=(e,t)=>{Wn(e,"ReduceLogSumExpShared",t,"logSumExp")},M_=(e,t)=>{Wn(e,"ReduceMaxShared",t,"max")},B_=(e,t)=>{Wn(e,"ReduceMinShared",t,"min")},F_=(e,t)=>{Wn(e,"ReduceProdShared",t,"prod")},V_=(e,t)=>{Wn(e,"ReduceSumShared",t,"sum")},G_=(e,t)=>{Wn(e,"ReduceSumSquareShared",t,"sumSquare")},U_=(e,t)=>{Wn(e,"ReduceLogSumShared",t,"logSum")}}),Ba=N(()=>{"use strict";ue(),fe(),Je(),ge(),W_(),Hn=e=>{if(!e||0===e.length||e.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===e.length&&1!==e[1].dims.length)throw Error("Invalid axes input dims.")},M3=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Fa=(e,t,r,n,i,o,a=!1,s=!1)=>{let u=[],l=r[0].dims,d=l.length,p=D.normalizeAxes(i,d),c=!s&&0===p.length;l.forEach((e,t)=>{c||p.indexOf(t)>=0?a&&u.push(1):u.push(e)});let h=u.length,f=D.size(u);return{name:e,shaderCache:t,getShaderSource:e=>{let t=[],i=L("_A",r[0].dataType,d),s=F("output",o,h),u=n(i,s,p),f=u[2];for(let e=0,r=0;e<d;e++)c||p.indexOf(e)>=0?(a&&r++,f=`for(var j${e}: u32 = 0; j${e} < ${l[e]}; j${e}++) {
                  ${u[2].includes("last_index")?`let last_index = j${e};`:""}
                  ${i.indicesSet("input_indices",e,`j${e}`)}
                  ${f}
                }`):(t.push(`${i.indicesSet("input_indices",e,s.indicesGet("output_indices",r))};`),r++);return`

        ${e.registerUniform("output_size","u32").declareVariables(i,s)}

        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${i.type.indices};
          let output_indices = ${s.offsetToIndices("global_idx")};

          ${t.join(`
`)}
          ${u[0]}       // init ops for reduce max/min
          ${u[1]}
          ${f}
          ${u[3]}
          ${4===u.length?s.setByOffset("global_idx","value"):u.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:o}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...U(l,u)]})}},Tc=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>r.push(Number(e))),le({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},qn=(e,t,r,n)=>{let i=e.inputs,o=1===i.length?r:Tc(i,r);e.compute(Fa(t,{hint:o.cacheKey,inputDependencies:["rank"]},[i[0]],o.noopWithEmptyAxes&&0===o.axes.length?M3:n,o.axes,i[0].dataType,o.keepDims,o.noopWithEmptyAxes),{inputs:[0]})},B3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceLogSum",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,"value = log(value);"])},F3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceL1",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += abs(${e.getByIndices("input_indices")});`,""])},V3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceL2",t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},G3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceLogSumExp",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += exp(${e.getByIndices("input_indices")});`,"value = log(value);"])},U3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceMax",t,(e,t,r)=>{let n=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&n.push(e.indicesSet("input_indices",t,0));return[`${n.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = max(value, ${e.getByIndices("input_indices")});`,""]})},W3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceMean",t,(t,r,n)=>{let i=1;for(let r=0;r<t.rank;r++)(n.indexOf(r)>=0||0===n.length)&&(i*=e.inputs[0].dims[r]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${i});`]})},H3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceMin",t,(e,t,r)=>{let n=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&n.push(`input_indices[${t}] = 0;`);return[`${n.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = min(value, ${e.getByIndices("input_indices")});`,""]})},q3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceProd",t,(e,t)=>[`var value = ${t.type.storage}(1);`,"",`value *= ${e.getByIndices("input_indices")};`,""])},j3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceSum",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,""])},K3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceSumSquare",t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += t * t;`,""])},jn=(e,t,r)=>{if(0===t.length)return r;let n=1,i=1;for(let r=0;r<t.length;r++)-1===t.indexOf(r)?n*=e[r]:i*=e[r];return i<32&&n>1024},H_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?W3(e,t):N_(e,t)},q_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?F3(e,t):L_(e,t)},j_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?V3(e,t):R_(e,t)},K_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?G3(e,t):z_(e,t)},X_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?U3(e,t):M_(e,t)},Z_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?H3(e,t):B_(e,t)},J_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?q3(e,t):F_(e,t)},Q_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?j3(e,t):V_(e,t)},Y_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?K3(e,t):G_(e,t)},e0=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?B3(e,t):U_(e,t)}}),o0=N(()=>{"use strict";ue(),Je(),Ba(),t0=e=>{if(!e||0===e.length||e.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==e[0].dataType)throw Error("Invalid input type.")},n0=(e,t)=>{t0(e.inputs),e.compute(Fa("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,r,n)=>{let i=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||0===n.length)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]},[t.axis],7,t.keepDims),{inputs:[0]})},r0=(e,t)=>{t0(e.inputs),e.compute(Fa("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,r,n)=>{let i=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||0===n.length)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]},[t.axis],7,t.keepDims),{inputs:[0]})},Ic=e=>le(e)}),Va=N(()=>{"use strict";ue(),fe(),Ra(),ge(),X3=(e,t)=>{let r=e[0],n=e[1],i=e[2],o=e[3],a=e[4],s=e[5];if(a&&s)throw Error("Attention cannot have both past and attention_bias");if(3!==r.dims.length)throw Error('Input "input" must have 3 dimensions');let u=r.dims[0],l=r.dims[1],d=r.dims[2];if(1!==i.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==n.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==d)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==n.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=i.dims[0]/3,c=p,h=c;if(t.qkvHiddenSizes.length>0){if(3!==t.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let e of t.qkvHiddenSizes)if(e%t.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],c=t.qkvHiddenSizes[1],h=t.qkvHiddenSizes[2]}if(p!==c)throw Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==p+c+h)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let f=0;if(a){if(c!==h)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==a.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==a.dims[0])throw Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==c/t.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(f=a.dims[3])}let m=l+f;if(o)throw Error("Mask not supported");if(a)throw Error("past is not supported");if(s){if(4!==s.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==t.numHeads||s.dims[2]!==l||s.dims[3]!==m)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:f,kvSequenceLength:l,totalSequenceLength:m,maxSequenceLength:-1,inputHiddenSize:d,hiddenSize:p,vHiddenSize:h,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(h/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Sc=(e,t,r)=>t&&e?`
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
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Z3=(e,t,r,n,i,o,a,s)=>{let u=Pe(a?1:o),l=64,d=o/u;d<64&&(l=32);let p=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:i},{type:12,data:d},{type:12,data:Math.ceil(o/u/l)}],c=Me(e.dataType,u),h=at(1,u),f=["type"];return a&&f.push("type"),s&&f.push("type"),{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${c};${u}`,inputDependencies:f},getShaderSource:t=>{let r=F("x",e.dataType,e.dims,u),n=[r],i=a?L("seq_lens",a.dataType,a.dims):void 0;i&&n.push(i);let o=s?L("total_sequence_length_input",s.dataType,s.dims):void 0;o&&n.push(o);let d=at(e.dataType);return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${t.registerUniforms([{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}]).declareVariables(...n)}
  ${t.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Sc(i,o,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${h}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${h}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${h}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${h}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${r.type.value}(${d}(1.0) / ${d}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${h}(x[offset + i]);
        x[offset + i] = ${r.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${r.type.value}(${d}(0));
        }`:""};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*r},programUniforms:p})}},J3=(e,t,r,n,i,o,a,s,u)=>{let l=a+o.kvSequenceLength,d=[o.batchSize,o.numHeads,o.sequenceLength,l],p=e>1&&n,c=o.kvNumHeads?o.kvNumHeads:o.numHeads,h=p?[o.batchSize,c,l,o.headSize]:void 0,f=o.nReps?o.nReps:1,m=0===o.scale?1/Math.sqrt(o.headSize):o.scale,g=Pe(o.headSize),b=o.headSize/g,y={x:Math.ceil(l/12),y:Math.ceil(o.sequenceLength/12),z:o.batchSize*o.numHeads},_=[{type:12,data:o.sequenceLength},{type:12,data:b},{type:12,data:l},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:1,data:m},{type:12,data:a},{type:12,data:o.kvSequenceLength},{type:12,data:f}],v=p&&n&&D.size(n.dims)>0,x=["type","type"];v&&x.push("type"),i&&x.push("type"),s&&x.push("type"),u&&x.push("type");let w=[{dims:d,dataType:t.dataType,gpuDataType:0}];return p&&w.push({dims:h,dataType:t.dataType,gpuDataType:0}),{name:"AttentionProbs",shaderCache:{hint:`${g};${void 0!==i};${void 0!==n};${e}`,inputDependencies:x},getRunData:()=>({outputs:w,dispatchGroup:y,programUniforms:_}),getShaderSource:e=>{let o=L("q",t.dataType,t.dims,g),a=[o,L("key",r.dataType,r.dims,g)];if(v){let e=L("past_key",n.dataType,n.dims,g);a.push(e)}i&&a.push(L("attention_bias",i.dataType,i.dims));let l=s?L("seq_lens",s.dataType,s.dims):void 0;l&&a.push(l);let c=u?L("total_sequence_length_input",u.dataType,u.dims):void 0;c&&a.push(c);let m=F("output",t.dataType,d),b=[m];p&&b.push(F("present_key",t.dataType,h,g));let y=at(1,g);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${o.type.storage}, 144>;
  var<workgroup> tileK: array<${o.type.storage}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...a,...b)}
  ${e.mainStart([12,12,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${1===f?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${1===f?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Sc(l,c,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${v&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${y}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${v&&p?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${p?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${y}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(g){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw Error(`Unsupported components: ${g}`)}})()};
        output[outputIdx] = ${m.type.value} (sum * uniforms.alpha) + ${i?"attention_bias[outputIdx]":"0.0"};
    }
  }`}}},Q3=(e,t,r,n,i,o,a,s)=>{let u=o+i.kvSequenceLength,l=i.nReps?i.nReps:1,d=i.vHiddenSize*l,p=e>1&&n,c=i.kvNumHeads?i.kvNumHeads:i.numHeads,h=p?[i.batchSize,c,u,i.headSize]:void 0,f=[i.batchSize,i.sequenceLength,d],m={x:Math.ceil(i.vHeadSize/12),y:Math.ceil(i.sequenceLength/12),z:i.batchSize*i.numHeads},g=[{type:12,data:i.sequenceLength},{type:12,data:u},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:d},{type:12,data:o},{type:12,data:i.kvSequenceLength},{type:12,data:l}],b=p&&n&&D.size(n.dims)>0,y=["type","type"];b&&y.push("type"),a&&y.push("type"),s&&y.push("type");let _=[{dims:f,dataType:t.dataType,gpuDataType:0}];return p&&_.push({dims:h,dataType:t.dataType,gpuDataType:0}),{name:"AttentionScore",shaderCache:{hint:`${void 0!==n};${e}`,inputDependencies:y},getRunData:()=>({outputs:_,dispatchGroup:m,programUniforms:g}),getShaderSource:e=>{let i=L("probs",t.dataType,t.dims),o=[i,L("v",r.dataType,r.dims)];b&&o.push(L("past_value",n.dataType,n.dims));let u=a?L("seq_lens",a.dataType,a.dims):void 0;a&&o.push(u);let d=s?L("total_sequence_length_input",s.dataType,s.dims):void 0;s&&o.push(d);let c=[F("output",t.dataType,f)];return p&&c.push(F("present_value",t.dataType,h)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${i.type.value}, 144>;
  var<workgroup> tileV: array<${i.type.value}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...o,...c)}
  ${e.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===l?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===l?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Sc(u,d,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${b&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${i.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${b&&p?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${p?`
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
  }`}}},lo=(e,t,r,n,i,o,a,s,u,l,d,p)=>{let c=Math.min(e.outputCount,1+ +!!a+ +!!s),h=c>1?l.pastSequenceLength:0,f=h+l.kvSequenceLength,m=u&&D.size(u.dims)>0?u:void 0,g=[t,r];c>1&&a&&D.size(a.dims)>0&&g.push(a),m&&g.push(m),d&&g.push(d),p&&g.push(p);let b=e.compute(J3(c,t,r,a,m,l,h,d,p),{inputs:g,outputs:c>1?[-1,1]:[-1]})[0];e.compute(Z3(b,l.batchSize,l.numHeads,h,l.sequenceLength,f,d,p),{inputs:d&&p?[b,d,p]:[b],outputs:[]});let y=[b,n];c>1&&s&&D.size(s.dims)>0&&y.push(s),d&&y.push(d),p&&y.push(p),e.compute(Q3(c,b,n,s,l,h,d,p),{inputs:y,outputs:c>1?[0,2]:[0]})},Y3=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,i=t.inputHiddenSize,o=t.headSize,a={x:Math.ceil(t.headSize/12),y:Math.ceil(t.sequenceLength/12),z:t.batchSize*t.numHeads},s=[e.inputs[0],e.inputs[1],e.inputs[2]],u=[{type:12,data:n},{type:12,data:i},{type:12,data:o},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}];return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:u}),getShaderSource:e=>{let t=F("output_q",s[0].dataType,r),n=F("output_k",s[0].dataType,r),i=F("output_v",s[0].dataType,r),o=L("input",s[0].dataType,s[0].dims),a=L("weight",s[1].dataType,s[1].dims),u=L("bias",s[2].dataType,s[2].dims),l=o.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${l}, 144>;
  var<workgroup> tileWeightQ: array<${l}, 144>;
  var<workgroup> tileWeightK: array<${l}, 144>;
  var<workgroup> tileWeightV: array<${l}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}]).declareVariables(o,a,u,t,n,i)}
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
  }`}},{inputs:s,outputs:[-1,-1,-1]})},i0=(e,t)=>{let r=X3(e.inputs,t),[n,i,o]=Y3(e,r);return lo(e,n,i,o,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),s0=N(()=>{"use strict";pt(),ue(),fe(),Je(),ge(),eE=(e,t)=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs");let r=(e,t,r)=>{let n=t.length;if(n!==e.length)throw Error(`${r}: num dimensions != ${n}`);t.forEach((t,n)=>{if(t!==e[n])throw Error(`${r}: dim[${n}] do not match`)})};if(e[0].dims.length>1){let n="NHWC"===t.format?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},tE=(e,t)=>{let{epsilon:r,spatial:n,format:i}=t,o=e[0].dims,a=n?Pe(o[o.length-1]):1,s="NHWC"===i&&o.length>1?a:1,u=D.size(o)/a,l=n?o.length:o,d=L("x",e[0].dataType,e[0].dims,a),p=L("scale",e[1].dataType,e[1].dims,s),c=L("bias",e[2].dataType,e[2].dims,s),h=L("inputMean",e[3].dataType,e[3].dims,s),f=L("inputVar",e[4].dataType,e[4].dims,s),m=F("y",e[0].dataType,l,a);return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:n?["rank","type","type","type","type"]:void 0},getShaderSource:e=>`
  const epsilon = ${r};
  ${e.registerUniform("outputSize","u32").declareVariables(d,p,c,h,f,m)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${m.offsetToIndices(`global_idx * ${a}`)};
    ${(()=>{let e="";if(n)e=`let cOffset = ${1===o.length?"0u":"NHWC"===i?`outputIndices[${o.length-1}] / ${a}`:"outputIndices[1]"};`;else if("NCHW"===i)e=`
            ${m.indicesSet("outputIndices","0","0")}
            let cOffset = ${m.indicesToOffset("outputIndices")};`;else{e=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${o.length-1}];`;for(let t=1;t<p.rank;t++)e+=`cIndices[${t}] = outputIndices[${t}];`;e+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return e})()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${c.getByOffset("cOffset")};
    let inputMean = ${h.getByOffset("cOffset")};
    let inputVar = ${f.getByOffset("cOffset")};
    let x = ${d.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${m.setByOffset("global_idx","value")}
  }`,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:n?[{type:12,data:u},...U(o)]:[{type:12,data:u}]})}},nE=e=>le(e),a0=(e,t)=>{let{inputs:r,outputCount:n}=e,i=nE({...t,outputCount:n});if(pe.webgpu.validateInputContent&&eE(r,i),t.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");e.compute(tE(r,i))}}),l0=N(()=>{"use strict";fe(),ge(),rE=e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")},oE=e=>{let t=e[0].dims,r=e[0].dims[2],n=D.size(t)/4,i=e[0].dataType,o=L("input",i,t,4),a=L("bias",i,[r],4),s=L("residual",i,t,4),u=F("output",i,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:e=>`
  const channels = ${r}u / 4;
  ${e.declareVariables(o,a,s,u)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${o.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},u0=e=>{rE(e.inputs),e.compute(oE(e.inputs))}}),Ua=N(()=>{"use strict";ue(),fe(),Je(),ge(),iE=(e,t,r,n,i,o,a)=>{let s=Math.ceil(t/4),u="";u="string"==typeof i?`${i}(a)`:i("a");let l=L("inputData",r,[s],4),d=F("outputData",n,[s],4),p=[{name:"vec_size",type:"u32"}];return a&&p.push(...a),`
      ${e.registerUniforms(p).declareVariables(l,d)}

  ${o??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",u)}
  }`},De=(e,t,r,n,i,o=e.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(D.size(e.dims)/4)}];return a&&u.push(...a),{name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:t=>iE(t,D.size(e.dims),e.dataType,o,r,n,s),getRunData:t=>({outputs:[{dims:e.dims,dataType:o}],dispatchGroup:{x:Math.ceil(D.size(t[0].dims)/64/4)},programUniforms:u})}},c0=e=>{e.compute(De(e.inputs[0],"Abs","abs"))},d0=e=>{e.compute(De(e.inputs[0],"Acos","acos"))},p0=e=>{e.compute(De(e.inputs[0],"Acosh","acosh"))},f0=e=>{e.compute(De(e.inputs[0],"Asin","asin"))},h0=e=>{e.compute(De(e.inputs[0],"Asinh","asinh"))},m0=e=>{e.compute(De(e.inputs[0],"Atan","atan"))},g0=e=>{e.compute(De(e.inputs[0],"Atanh","atanh"))},b0=e=>le(e),y0=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(De(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},aE=e=>{let t,r,n=e.length>=2&&0!==e[1].data,i=e.length>=3&&0!==e[2].data;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=i?e[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return le({min:t,max:r})},_0=(e,t)=>{let r=t||aE(e.inputs),n=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"Clip",e=>`clamp(${e}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},w0=e=>{e.compute(De(e.inputs[0],"Ceil","ceil"))},v0=e=>{e.compute(De(e.inputs[0],"Cos","cos"))},x0=e=>{e.compute(De(e.inputs[0],"Cosh","cosh"))},Uo=e=>le(e),T0=(e,t)=>{let r=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"Elu",e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Ga=(e="f32")=>`
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
}`,I0=e=>{let t=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"Erf",e=>`erf_vf32(${e})`,Ga(t)))},S0=e=>{e.compute(De(e.inputs[0],"Exp","exp"))},$0=e=>{e.compute(De(e.inputs[0],"Floor","floor"))},A0=e=>{let t=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"Gelu",e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,Ga(t)))},O0=(e,t)=>{let r=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"LeakyRelu",e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},P0=e=>{e.compute(De(e.inputs[0],"Not",e=>`!${e}`))},E0=e=>{e.compute(De(e.inputs[0],"Neg",e=>`-${e}`))},C0=e=>{e.compute(De(e.inputs[0],"Reciprocal",e=>`1.0/${e}`))},D0=e=>{let t=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"Relu",e=>`select(vec4<${t}>(0.0), ${e}, ${e} > vec4<${t}>(0.0))`))},k0=e=>{e.compute(De(e.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},N0=e=>le(e),L0=(e,t)=>{let r=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"HardSigmoid",e=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${e} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},R0=e=>{e.compute(De(e.inputs[0],"Sin","sin"))},z0=e=>{e.compute(De(e.inputs[0],"Sinh","sinh"))},M0=e=>{e.compute(De(e.inputs[0],"Sqrt","sqrt"))},B0=e=>{e.compute(De(e.inputs[0],"Tan","tan"))},F0=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,V0=e=>{e.compute(De(e.inputs[0],"Tanh",F0))},$c=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${F0("v")};
}
`,Ac=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,G0=e=>{let t=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"FastGelu",Ac,$c(t),void 0,e.inputs[0].dataType))},U0=(e,t)=>{let r=at(e.inputs[0].dataType);return e.compute(De(e.inputs[0],"ThresholdedRelu",e=>`select(vec4<${r}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},W0=e=>{e.compute(De(e.inputs[0],"Log","log"))},sE=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,uE=e=>`quick_gelu_impl(${e})`,H0=(e,t)=>{let r=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"QuickGelu",uE,sE(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),K0=N(()=>{"use strict";fe(),ge(),Ua(),lE=e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")},cE=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=L("input",e[0].dataType,e[0].dims,4),n=L("bias",e[0].dataType,[e[0].dims[2]],4),i=F("output",e[0].dataType,t,4),o=D.size(t)/4,a=Me(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)}}),getShaderSource:t=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${t.declareVariables(r,n,i)}

  ${Ga(a)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(o)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},j0=e=>{lE(e.inputs),e.compute(cE(e.inputs))}}),iw=N(()=>{"use strict";ue(),fe(),ge(),dE=(e,t,r,n,i,o,a,s,u,l,d,p)=>{let c,h;"string"==typeof s?c=h=(e,t)=>`${s}((${e}),(${t}))`:"function"==typeof s?c=h=s:(c=s.scalar,h=s.vector);let f=F("outputData",d,n.length,4),m=L("aData",u,t.length,4),g=L("bData",l,r.length,4),b;if(i)if(o){let e=1===D.size(t),n=1===D.size(r),i=t.length>0&&t[t.length-1]%4==0,o=r.length>0&&r[r.length-1]%4==0;b=e||n?f.setByOffset("global_idx",h(e?`${m.type.value}(${m.getByOffset("0")}.x)`:m.getByOffset("global_idx"),n?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"))):`
            let outputIndices = ${f.offsetToIndices("global_idx * 4u")};
            let offsetA = ${m.broadcastedIndicesToOffset("outputIndices",f)};
            let offsetB = ${g.broadcastedIndicesToOffset("outputIndices",f)};
            ${f.setByOffset("global_idx",h(a||i?m.getByOffset("offsetA / 4u"):`${m.type.value}(${m.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||o?g.getByOffset("offsetB / 4u"):`${g.type.value}(${g.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else b=f.setByOffset("global_idx",h(m.getByOffset("global_idx"),g.getByOffset("global_idx")));else{if(!o)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let e=(e,t,r="")=>{let n=`aData[indexA${t}][componentA${t}]`,i=`bData[indexB${t}][componentB${t}]`;return`
            let outputIndices${t} = ${f.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offsetA${t} = ${m.broadcastedIndicesToOffset(`outputIndices${t}`,f)};
            let offsetB${t} = ${g.broadcastedIndicesToOffset(`outputIndices${t}`,f)};
            let indexA${t} = offsetA${t} / 4u;
            let indexB${t} = offsetB${t} / 4u;
            let componentA${t} = offsetA${t} % 4u;
            let componentB${t} = offsetB${t} % 4u;
            ${e}[${t}] = ${r}(${c(n,i)});
          `};b=9===d?`
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
        ${e.registerUniform("vec_size","u32").declareVariables(m,g,f)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${b}
      }`},pE=(e,t,r,n,i,o,a=r.dataType)=>{let s=r.dims.map(Number),u=n.dims.map(Number),l=!D.areEqual(s,u),d=s,p=D.size(s),c=!1,h=!1,f=[l];if(l){let e=Un.calcShape(s,u,!1);if(!e)throw Error("Can't perform binary op on the given tensors");d=e.slice(),p=D.size(d);let t=1===D.size(s),r=1===D.size(u),n=s.length>0&&s[s.length-1]%4==0,i=u.length>0&&u[u.length-1]%4==0;f.push(t),f.push(r),f.push(n),f.push(i);let o=1;for(let e=1;e<d.length;e++){let t=s[s.length-e];if(t===u[u.length-e])o*=t;else break}o%4==0?(h=!0,c=!0):(t||r||n||i)&&(c=!0)}else c=!0;return f.push(c),{name:e,shaderCache:{hint:t+f.map(e=>e.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:e=>dE(e,s,u,d,c,l,h,i,r.dataType,n.dataType,a,o),getRunData:()=>({outputs:[{dims:d,dataType:a}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(D.size(d)/4)},...U(s,u,d)]})}},Kn=(e,t,r,n,i,o)=>{e.compute(pE(t,i??"",e.inputs[0],e.inputs[1],r,n,o))},X0=e=>{Kn(e,"Add",(e,t)=>`${e}+${t}`)},Z0=e=>{Kn(e,"Div",(e,t)=>`${e}/${t}`)},J0=e=>{Kn(e,"Equal",{scalar:(e,t)=>`u32(${e}==${t})`,vector:(e,t)=>`vec4<u32>(${e}==${t})`},void 0,void 0,9)},Q0=e=>{Kn(e,"Mul",(e,t)=>`${e}*${t}`)},Y0=e=>{let t=L("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Kn(e,"Pow",{scalar:(e,t)=>`pow_custom(${e},${t})`,vector:(e,t)=>`pow_vector_custom(${e},${t})`},`
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
      `)},ew=e=>{Kn(e,"Sub",(e,t)=>`${e}-${t}`)},tw=e=>{Kn(e,"Greater",{scalar:(e,t)=>`u32(${e}>${t})`,vector:(e,t)=>`vec4<u32>(${e}>${t})`},void 0,void 0,9)},nw=e=>{Kn(e,"Less",{scalar:(e,t)=>`u32(${e}<${t})`,vector:(e,t)=>`vec4<u32>(${e}<${t})`},void 0,void 0,9)},rw=e=>{Kn(e,"GreaterOrEqual",{scalar:(e,t)=>`u32(${e}>=${t})`,vector:(e,t)=>`vec4<u32>(${e}>=${t})`},void 0,void 0,9)},ow=e=>{Kn(e,"LessOrEqual",{scalar:(e,t)=>`u32(${e}<=${t})`,vector:(e,t)=>`vec4<u32>(${e}<=${t})`},void 0,void 0,9)}}),uw=N(()=>{"use strict";ue(),fe(),Je(),ge(),hE=(e,t)=>{if(!e||e.length<1)throw Error("too few inputs");let r=e[0],n=r.dataType,i=r.dims.length;e.forEach((e,o)=>{if(0!==o){if(e.dataType!==n)throw Error("input tensors should be one type");if(e.dims.length!==i)throw Error("input tensors should have the same shape");e.dims.forEach((e,n)=>{if(n!==t&&e!==r.dims[n])throw Error("non concat dimensions must match")})}})},mE=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,gE=(e,t)=>{let r=e.length,n=[];for(let i=0;i<r;++i){let o=t.setByOffset("global_idx",e[i].getByIndices("indices"));1===r?n.push(o):0===i?n.push(`if (inputIndex == ${i}u) { ${o} }`):i===r-1?n.push(`else { ${o} }`):n.push(`else if (inputIndex == ${i}) { ${o} }`)}return n.join(`
`)},bE=(e,t,r,n)=>{let i=D.size(r),o=Array(e.length),a=Array(e.length),s=0,u=[],l=[],d=[{type:12,data:i}];for(let r=0;r<e.length;++r)s+=e[r].dims[t],o[r]=s,l.push(e[r].dims.length),a[r]=L(`input${r}`,n,l[r]),u.push("rank"),d.push({type:12,data:o[r]});for(let t=0;t<e.length;++t)d.push(...U(e[t].dims));d.push(...U(r));let p=F("output",n,r.length),c=p.indicesGet("indices",t),h=Array.from(Array(o.length).keys()).map(e=>`uniforms.sizeInConcatAxis${e}`).join(",");return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:d}),getShaderSource:t=>`

  ${(()=>{t.registerUniform("outputSize","u32");for(let r=0;r<e.length;r++)t.registerUniform(`sizeInConcatAxis${r}`,"u32");return t.declareVariables(...a,p)})()}

  ${mE(o.length,h)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${c});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${o.length}u>(${h});
      ${c} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${gE(a,p)}
  }`}},aw=(e,t)=>{let r=e.inputs,n=r[0].dims,i=D.normalizeAxis(t.axis,n.length);hE(r,i);let o=n.slice();o[i]=r.reduce((e,t)=>e+(t.dims.length>i?t.dims[i]:0),0);let a=r.filter(e=>D.size(e.dims)>0);e.compute(bE(a,i,o,r[0].dataType),{inputs:a})},sw=e=>le({axis:e.axis})}),wr=N(()=>{"use strict";ue(),fe(),Zt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${e.activation}`)}},Jt=(e,t)=>{"Clip"===e.activation?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):"HardSigmoid"===e.activation?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):"LeakyRelu"===e.activation&&t.push({type:1,data:e.alpha})},Qt=(e,t)=>{"Clip"===e.activation?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===e.activation?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===e.activation&&t.push({name:"alpha",type:"f32"})},Wa=e=>{let t=e?.activation||"";if("HardSigmoid"===t){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}if("Clip"===t){let[r,n]=e?.activation_params||[m_,g_];return{activation:t,clipMax:n,clipMin:r}}if("LeakyRelu"===t){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Ha=N(()=>{"use strict";ot=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw Error(`${e}-component is not supported.`)}},lw=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),dw=N(()=>{"use strict";cw=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),ja=N(()=>{"use strict";ue(),fe(),ge(),wr(),Wo=(e,t,r,n,i)=>{let o=n-r;return`
      ${Array.from({length:r}).map((r,a)=>`
      if (${Z(t.shape,a,t.rank)} != 1) {
        ${t.indicesSet(e,a,Z(i,a+o,n))}
      } else {
        ${t.indicesSet(e,a,0)}
      }`).join("")}
`},qa=(e,t,r,n,i=!1,o)=>{let a=e[0].dims,s=e[1].dims,u=a[a.length-2],l=s[s.length-1],d=a[a.length-1],p=Pe(l),c=Pe(d),h=Pe(u),f=D.size(r)/p/h,m=e.length>2,g=n?n.slice(0,-2):r.slice(0,-2),b=[D.size(g),u,l],y=[{type:12,data:f},{type:12,data:u},{type:12,data:l},{type:12,data:d}];return Jt(t,y),y.push(...U(g,a,s)),m&&y.push(...U(e[2].dims)),y.push(...U(b)),{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${c};${h};${i}`,inputDependencies:m?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:o?o(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:y}),getShaderSource:n=>{let o=Ma("batch_dims",e[0].dataType,g.length),u=L("a",e[0].dataType,a.length,c),l=L("b",e[1].dataType,s.length,p),d=F("output",e[0].dataType,b.length,p),f=Me(d.type.tensor),y=Zt(t,d.type.value,f),_=[u,l],v="";if(m){let t=i?p:1;_.push(L("bias",e[2].dataType,e[2].dims.length,t)),v=`${i?`value += bias[col / ${t}];`:`value += ${d.type.value}(bias[row + i]);`}`}let x=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];return Qt(t,x),`
  ${n.registerUniforms(x).registerInternalVariables(o).declareVariables(..._,d)}
  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${h};
    let row = (index1 % stride1) * ${h};
    let batch = index1 / stride1;

    ${2===r.length?"":`let batch_indices = ${o.offsetToIndices("batch")};`}

    var a_indices: ${u.type.indices};
    ${Wo("a_indices",u,u.rank-2,o.rank,"batch_indices")}
    ${u.indicesSet("a_indices",u.rank-2,0)}
    ${u.indicesSet("a_indices",u.rank-1,0)}
    let a_offset = ${u.indicesToOffset("a_indices")};

    var b_indices: ${l.type.indices};
    ${Wo("b_indices",l,l.rank-2,o.rank,"batch_indices")}
    ${l.indicesSet("b_indices",l.rank-2,0)}
    ${l.indicesSet("b_indices",l.rank-1,0)}
    let b_offset = ${l.indicesToOffset("b_indices")};
    var values: array<${d.type.value}, ${h}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${c}) {
      ${(()=>{let e=`var a_data: ${u.type.value};`;for(let t=0;t<c;t++)e+=`
              let b_data${t} = b[(b_offset + (k + ${t}) * uniforms.N + col) / ${p}];`;for(let t=0;t<h;t++){e+=`a_data = a[(a_offset + (row + ${t}) * uniforms.K + k) / ${c}];`;for(let r=0;r<c;r++)e+=`
            values[${t}] = fma(${l.type.value}(a_data${1===c?"":`[${r}]`}), b_data${r}, values[${t}]);
`}return e})()}
    }
    for (var i = 0u; i < ${h}u; i++) {
      var value = values[i];
      ${v}
      ${y}
      let cur_indices = ${d.type.indices}(batch, row + i, col);
      let offset = ${d.indicesToOffset("cur_indices")};
      ${d.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `}}}}),Ka=N(()=>{"use strict";ue(),fe(),ge(),wr(),ja(),Ha(),yE=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,_E=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${3===t?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${3===t?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${3===t?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Oc=(e,t,r="f32",n,i=!1,o=32,a=!1,s=32)=>{let u=t[1]*e[1],l=t[0]*e[0],d=i?u:o,p=i?o:u,c=d/t[0],h=o/t[1];if(!((i&&4===c&&4===e[1]||!i&&(3===c||4===c))&&d%t[0]==0&&o%t[1]==0&&4===e[0]))throw Error(`If transposeA ${i} is true, innerElementSize ${c} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${c} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}. tileInner ${o} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${c}<${r}>, ${d/c}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/e[0]}>, ${o}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${c};
const tileInner = ${o};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${a?"0":"i32(globalId.z)"};
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${a?`${Math.ceil(s/o)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${h};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${yE(i,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${n?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${3===c?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${_E(i,c)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},pw=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,wE=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Pc=(e,t,r="f32",n,i=!1,o=32,a=!1,s=32,u=!1)=>{let l=e[1]*t[1],d=e[0]*t[0],p=i?l:o,c=i?o:l;if(c%t[1]!=0||p%t[0]!=0||o%t[1]!=0)throw Error(`tileAHight ${c} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${o} must be divisible by workgroupSize[1]${t[1]}`);let h=c/t[1],f=p/t[0],m=o/t[1],g=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${c}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${pw(i,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${o}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${n?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${i?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
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
      ${pw(i,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${n?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${wE(i)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${p}>, ${c}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${d}>, ${o}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${o};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(s/o)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${g}
  }
`},vE=(e,t,r,n,i=!1)=>{let[o,a,s,u]=n,l=Me(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${o.type.indices}) -> ${ot(e,l)} {
      var value = ${ot(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Wo("aIndices",a,a.rank-2,o.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${o.type.indices}) -> ${ot(e,l)} {
      var value = ${ot(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Wo("bIndices",s,s.rank-2,o.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ot(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${ot(e,l)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Ho=(e,t,r,n,i=!1,o)=>{let a=e[0].dims,s=e[1].dims,u=a.slice(0,-2),l=s.slice(0,-2),d=n?n.slice(0,-2):r.slice(0,-2),p=D.size(d),c=a[a.length-2],h=a[a.length-1],f=s[s.length-1],m=h%4==0&&f%4==0,g=c<=8?[4,1,1]:[4,4,1],b=[8,8,1],y=[Math.ceil(f/b[0]/g[0]),Math.ceil(c/b[1]/g[1]),Math.ceil(p/b[2]/g[2])],_=m?4:1,v=[...u,c,h/_],x=v.length,w=[...l,h,f/_],$=w.length,T=[p,c,f/_],I=[{type:6,data:c},{type:6,data:f},{type:6,data:h}];Jt(t,I),I.push(...U(d,v,w));let S=["rank","rank"],O=e.length>2;return O&&(I.push(...U(e[2].dims)),S.push("rank")),I.push(...U(T)),{name:"MatMul",shaderCache:{hint:`${g};${t.activation};${m};${i}`,inputDependencies:S},getRunData:()=>({outputs:[{dims:o?o(r):r,dataType:e[0].dataType}],dispatchGroup:{x:y[0],y:y[1],z:y[2]},programUniforms:I}),getShaderSource:r=>{let n=d.length,o=Ma("batchDims",e[0].dataType,n,1),a=Me(e[0].dataType),s=L("a",e[0].dataType,x,_),u=L("b",e[1].dataType,$,_),l=F("result",e[0].dataType,T.length,_),p=[s,u];if(O){let t=i?_:1;p.push(L("bias",e[2].dataType,e[2].dims.length,t))}let c=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Qt(t,c);let h=Me(l.type.tensor),f=vE(_,O,Zt(t,l.type.value,h),[o,s,u,l],i);return`
  ${r.registerUniforms(c).registerInternalVariables(o).declareVariables(...p,l)}
  ${f}
  ${m?Oc(g,b,a,o):Pc(g,b,a,o)}
                   `}}}}),hw=N(()=>{"use strict";ue(),Gn(),ge(),wr(),Ha(),dw(),Ka(),xE=(e,t,r,n,i=!1,o,a=4,s=4,u=4,l="f32")=>{let d=e=>{switch(e){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${e} is not supported.`)}},p=e?`
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
    var resData = ${ot(a,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])"} && xCol >= 0 && xCol < ${e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])"}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${(e=>{switch(e){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw Error(`innerElementSize ${e} is not supported.`)}})(a)}
    }
    return resData;`,g=e?t&&n?`
    let col = colIn * ${a};
    ${m}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${m}
    }
    return ${ot(a,l)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${m}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${m}
    }
    return ${ot(a,l)}(0.0);`,b=e?n&&r?d(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${d(s)}
    }
    return ${ot(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${d(s)}
    }
    return ${ot(s,l)}(0.0);`,y=ot(u,l),_=e?ot(a,l):ot(s,l),v=e?ot(s,l):ot(a,l),x=Zt(o,y,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${_} {
      ${e?g:b}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${v} {
      ${e?b:g}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${y}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${c}
      ${lw(i)}
      ${x}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},fw=(e,t,r,n,i,o,a,s,u)=>{let l="NHWC"===t.format,d=l?e[0].dims[3]:e[0].dims[1],p=r[0],c=l?r[2]:r[3],h=l?r[1]:r[2],f=l?r[3]:r[1],m=l&&(d%4==0||d%3==0)&&f%4==0,g=l?f:c*h,b=l?c*h:f,y=[8,8,1],_=n<=8?[4,1,1]:[4,4,1],v=[Math.ceil(g/y[0]/_[0]),Math.ceil(b/y[1]/_[1]),Math.ceil(p/y[2]/_[2])];be("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${v}`);let x=m?l&&d%4!=0?3:4:1,w=y[1]*_[1],$=y[0]*_[0],T=Math.max(y[0]*x,y[1]),I=n%w==0,S=i%$==0,O=o%T==0,E=m?[x,4,4]:[1,1,1],A=[{type:6,data:n},{type:6,data:i},{type:6,data:o},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Jt(t,A),A.push(...U(e[0].dims,e[1].dims));let P=["rank","rank"];return a&&(A.push(...U(e[2].dims)),P.push("rank")),A.push(...U(r)),{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${x};${m};${I};${S};${O};${w};${$};${T}`,inputDependencies:P},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:A}),getShaderSource:n=>{let i=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Qt(t,i);let o=m?4:1,u=Me(e[0].dataType),d=`
      fn setOutputAtIndex(flatIndex : i32, value : ${m?`vec4<${u}>`:u}) {
        result[flatIndex] = ${m?`vec4<${u}>`:u}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${m?`vec4<${u}>`:u}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${m?"/ 4":""}, value);
      }`,p=[L("x",e[0].dataType,e[0].dims.length,3===x?1:x),L("w",e[1].dataType,e[1].dims.length,o)],c=F("result",e[0].dataType,r.length,o);if(a){let t=L("bias",e[2].dataType,e[2].dims.length,o);p.push(t),d+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${m?`vec4<${u}>`:u} {
          return bias[coords.${l?"w":"y"}${m?"/ 4":""}];
        }`}return`
        ${cw("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${n.registerUniforms(i).declareVariables(...p,c)}
        ${d}
        ${xE(l,I,S,O,a,t,E[0],E[1],E[2],u)}
        ${m?Oc(_,y,u,void 0,!l,T):Pc(_,y,u,void 0,!l,T,!1,void 0,s)}`}}}}),_w=N(()=>{"use strict";ue(),Gn(),fe(),ge(),wr(),Ha(),TE=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},mw=e=>"number"==typeof e?[e,e,e]:e,Xa=(e,t)=>t<=1?e:e+(e-1)*(t-1),IE=(e,t,r,n=1)=>{let i=Xa(t,n);return Math.floor((e[0]*(r-1)-r+i)/2)},gw=(e,t,r,n,i)=>{null==i&&(i=IE(e,t[0],n[0]));let o=[0,0,0,r];for(let r=0;r<3;r++)e[r]+2*i>=t[r]&&(o[r]=Math.trunc((e[r]-t[r]+2*i)/n[r]+1));return o},SE=(e,t,r,n,i,o,a,s,u,l)=>{let d,p,c,h;if("VALID"===e&&(e=0),"number"==typeof e){d={top:e,bottom:e,left:e,right:e,front:e,back:e};let f=gw([t,r,n,1],[s,u,l],1,[i,o,a],e);p=f[0],c=f[1],h=f[2]}else if(Array.isArray(e)){if(!e.every((e,t,r)=>e===r[0]))throw Error(`Unsupported padding parameter: ${e}`);d={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let f=gw([t,r,n,1],[s,u,l],1,[i,o,a],e[0]);p=f[0],c=f[1],h=f[2]}else if("SAME_UPPER"===e){p=Math.ceil(t/i),c=Math.ceil(r/o),h=Math.ceil(n/a);let e=(p-1)*i+s-t,f=(c-1)*o+u-r,m=(h-1)*a+l-n,g=Math.floor(e/2),b=Math.floor(f/2),y=Math.floor(m/2);d={top:b,bottom:f-b,left:y,right:m-y,front:g,back:e-g}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:p,outHeight:c,outWidth:h}},bw=(e,t,r,n,i,o=!1,a="channelsLast")=>{let s,u,l,d,p;if("channelsLast"===a)[s,u,l,d,p]=e;else if("channelsFirst"===a)[s,p,u,l,d]=e;else throw Error(`Unknown dataFormat ${a}`);let[c,,h,f,m]=t,[g,b,y]=mw(r),[_,v,x]=mw(n),w=Xa(h,_),$=Xa(f,v),T=Xa(m,x),{padInfo:I,outDepth:S,outHeight:O,outWidth:E}=SE(i,u,l,d,g,b,y,w,$,T),A=o?c*p:c,P=[0,0,0,0,0];return"channelsFirst"===a?P=[s,A,S,O,E]:"channelsLast"===a&&(P=[s,S,O,E,A]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:l,inWidth:d,inChannels:p,outDepth:S,outHeight:O,outWidth:E,outChannels:A,padInfo:I,strideDepth:g,strideHeight:b,strideWidth:y,filterDepth:h,filterHeight:f,filterWidth:m,effectiveFilterDepth:w,effectiveFilterHeight:$,effectiveFilterWidth:T,dilationDepth:_,dilationHeight:v,dilationWidth:x,inShape:e,outShape:P,filterShape:t}},yw=(e,t,r,n,i,o)=>{let a="channelsLast"===o,s=(a?e[0].dims[3]:e[0].dims[1],[Math.ceil(TE(({x:r.map((e,t)=>t)}).x.map(e=>r[e]))/64),1,1]);be("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${s}`);let u=[{type:12,data:D.size(r)},{type:12,data:n},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];Jt(t,u),u.push(...U(e[0].dims,e[1].dims));let l=["rank","rank"],d=3===e.length;return d&&(u.push(...U(e[2].dims)),l.push("rank")),u.push(...U(r)),{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};1;${d}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:s[0],y:s[1],z:s[2]},programUniforms:u}),getShaderSource:o=>{let s=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Qt(t,s);let u=Me(e[0].dataType),l=L("x",e[0].dataType,e[0].dims.length,1),p=L("W",e[1].dataType,e[1].dims.length,1),c=[l,p],h=F("result",e[0].dataType,r.length,1),f="";if(d){let t=L("bias",e[2].dataType,e[2].dims.length,1);c.push(t),f+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u} {
          return bias[${a?Z("coords",4,5):Z("coords",1,5)}];
        }`}let m=ot(1,u),g=Zt(t,m,u);return`
            ${f}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${l.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${p.getByIndices("aIndices")};
            }
          ${o.registerUniforms(s).declareVariables(...c,h)}
          ${o.mainStart()}
          ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${h.offsetToIndices("global_idx")};
              let batch = ${Z("coords",0,l.rank)};
              let d2 = ${a?Z("coords",l.rank-1,l.rank):Z("coords",1,l.rank)};
              let xFRCCorner = vec3<u32>(${a?Z("coords",1,l.rank):Z("coords",2,l.rank)},
              ${a?Z("coords",2,l.rank):Z("coords",3,l.rank)},
              ${a?Z("coords",3,l.rank):Z("coords",4,l.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?Z("uniforms.x_shape",1,l.rank):Z("uniforms.x_shape",2,l.rank)};
              let xShapeZ = ${a?Z("uniforms.x_shape",2,l.rank):Z("uniforms.x_shape",3,l.rank)};
              let xShapeW = ${a?Z("uniforms.x_shape",3,l.rank):Z("uniforms.x_shape",4,l.rank)};
              let xShapeU = ${a?Z("uniforms.x_shape",4,l.rank):Z("uniforms.x_shape",1,l.rank)};
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
                      ${a?`let xValues = vec4<f32>(
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
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<f32>(
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
                      ${a?`let xValues = vec3<f32>(
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
          }`}}}}),xw=N(()=>{"use strict";ue(),fe(),ge(),wr(),ww=(e,t,r,n)=>{let i=e.length>2,o=i?"value += b[output_channel];":"",a=e[0].dims,s=e[1].dims,u="NHWC"===t.format,l=u?r[3]:r[1],d=l/t.group,p=u&&d>=4?Pe(l):1,c=D.size(r)/p,h=[{type:12,data:c},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:d}];return Jt(t,h),h.push(...U(a,[s[0],s[1],s[2],s[3]/p])),h.push(...U([r[0],r[1],r[2],r[3]/p])),{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:i?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:n=>{let l=F("output",e[0].dataType,r.length,p),d=Me(l.type.tensor),c=Zt(t,l.type.value,d),h=L("x",e[0].dataType,a.length),f=L("w",e[1].dataType,s.length,p),m=[h,f];i&&m.push(L("b",e[2].dataType,e[2].dims,p));let g=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Qt(t,g);let b=u?`
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
  ${n.registerUniforms(g).declareVariables(...m,l)}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${l.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${l.type.value} = ${l.type.value}(0);
    ${b}
    ${o}
    ${c}
    ${l.setByOffset("global_idx","value")}
  }`}}},vw=(e,t,r,n)=>{let i=e.length>2,o=Pe(r[3]),a=Pe(r[2]),s=D.size(r)/o/a,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/o],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/o],d=[r[0],r[1],r[2],r[3]/o],p=[{type:12,data:s},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Jt(t,p),p.push(...U(u,l,d));let c=(a-1)*t.strides[1]+l[1];return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${o};${a};${c};${l[0]};${l[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:r=>{let n=F("output",e[0].dataType,d.length,o),s=Me(n.type.tensor),p=Zt(t,n.type.value,s),h=L("x",e[0].dataType,u.length,o),f=L("w",e[1].dataType,l.length,o),m=[h,f];i&&m.push(L("b",e[2].dataType,e[2].dims,o));let g=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Qt(t,g),`
  ${r.registerUniforms(g).declareVariables(...m,n)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${h.type.value}, ${c}>;
    var values: array<${n.type.value}, ${a}>;
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
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${i?"value += b[output_channel];":""}
      ${p}
      ${n.set("batch","row","col + i","output_channel","value")};
    }
  }`}}}}),Iw=N(()=>{"use strict";fe(),hw(),_w(),Ka(),xw(),wr(),ja(),Yn(),$E=(e,t,r,n,i,o)=>{let a=e[0],s=e.slice(o?1:2,o?3:4),u=s.length,l=t[0],d=t.slice(2).map((e,t)=>e+(e-1)*(r[t]-1)),p=s.map((e,t)=>e+n[t]+n[t+u]).map((e,t)=>Math.floor((e-d[t]+i[t])/i[t]));return p.splice(0,0,a),p.splice(o?3:1,0,l),p},Ec=[2,3,1,0],AE=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let r=e[0].dims.length-2;if(t.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(t.strides.length!==r)throw Error(`strides should be ${r}D`);if(t.pads.length!==2*r)throw Error(`pads should be ${2*r}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape")},Cc=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let e=2;e<t[1].dims.length;++e)0===r[e-2]&&(r[e-2]=t[1].dims[e]);let n=e.pads.slice();Gr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,"NHWC"===e.format,e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:r,pads:n}),i},Dc=e=>{let t=Wa(e),r=e.format;return{autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],format:r,dilations:e.dilations,group:e.group,kernelShape:e.kernel_shape,pads:e.pads,strides:e.strides,wIsConst:e.w_is_const(),...t,cacheKey:`${e.format};${t.activation};`}},Tw=(e,t,r,n)=>{let i="NHWC"===r.format,o=$E(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,i);if(1!==r.group){let a=[t[0]];if(i){let n=e.kernelCustomData.wT??e.compute(st(t[1],Ec),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n),a.push(n)}else a.push(t[1]);3===t.length&&a.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&i&&t[1].dims[0]===r.group&&1===t[1].dims[1]&&1===r.dilations[0]&&1===r.dilations[1]?e.compute(vw(a,r,o,n),{inputs:a}):e.compute(ww(a,r,o,n),{inputs:a});return}let a=3===t.length,s=t[0].dims[i?1:2],u=t[0].dims[i?2:3],l=t[0].dims[i?3:1],d=t[1].dims[2],p=t[1].dims[3],c=o[i?1:2],h=o[i?2:3],f=o[i?3:1],m=i&&d===s&&p===u&&0===r.pads[0]&&0===r.pads[1];if(m||1===d&&1===p&&1===r.dilations[0]&&1===r.dilations[1]&&1===r.strides[0]&&1===r.strides[1]&&0===r.pads[0]&&0===r.pads[1]){let d=o[0],p,g,b,y=[];if(i){let n=e.kernelCustomData.wT??e.compute(st(t[1],Ec),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n),m){let e=s*u*l;p=t[0].reshape([1,d,e]),g=n.reshape([1,e,f]),b=[1,d,f]}else p=t[0].reshape([d,s*u,l]),g=n.reshape([1,l,f]),b=[d,c*h,f];y.push(p),y.push(g)}else p=t[0].reshape([d,l,s*u]),g=t[1].reshape([1,f,l]),b=[d,f,c*h],y.push(g),y.push(p);a&&y.push(t[2]);let _=b[2],v=y[0].dims[y[0].dims.length-1];_<8&&v<8?e.compute(qa(y,r,o,b,i,n),{inputs:y}):e.compute(Ho(y,r,o,b,i,n),{inputs:y});return}let g=e.kernelCustomData.wT??e.compute(st(t[1],Ec),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=g);let b=[t[0],g];a&&b.push(t[2]);let y=i?c*h:f,_=i?f:c*h,v=d*p*l;e.compute(fw(b,r,o,y,_,v,a,!0,n),{inputs:b})},OE=(e,t)=>{let r="NHWC"===t.format,n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];3===e.inputs.length&&n.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],o=[1].concat(t.strides),a=[1].concat(t.dilations),s=[1].concat(t.kernelShape),u=Cc({...t,pads:i,strides:o,dilations:a,kernelShape:s},n);Tw(e,n,u,e=>r?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},PE=(e,t,r)=>{let n="NHWC"===r.format?"channelsLast":"channelsFirst",i=Cc(r,t),o="NOTSET"===r.autoPad?r.pads:r.autoPad,a=bw(t[0].dims,t[1].dims,r.strides,r.dilations,o,!1,n);e.compute(yw(t,i,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],n))},kc=(e,t)=>{if(AE(e.inputs,t),3===e.inputs[0].dims.length)OE(e,t);else if(5===e.inputs[0].dims.length)PE(e,e.inputs,t);else{let r=Cc(t,e.inputs);Tw(e,e.inputs,r)}}}),$w=N(()=>{"use strict";ue(),Gn(),fe(),ge(),Sw=(e,t,r)=>{let n=e.length>2,i=t.outputShape,o="NHWC"===t.format,a=t.group,s=e[1].dims,u=s[2]/a,l=s[3],d=o?Pe(u):1,p=o&&1===l&&u>=4,c=p?4*Math.floor(u/4):Math.floor(u/d)*d,h=u-c,f=o?Pe(l):1,m=o?1===l?d:f:1,g=D.size(i)/f,b=[Math.ceil(g/64),1,1];be("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${b}`);let y=["rank","rank"],_=[t.strides[0],t.strides[1]],v=[t.kernelShape[o?1:2],t.kernelShape[o?2:3]],x=[t.dilations[0],t.dilations[1]],w=[v[0]+(t.dilations[0]<=1?0:(t.kernelShape[o?1:2]-1)*(t.dilations[0]-1)),v[1]+(t.dilations[1]<=1?0:(t.kernelShape[o?2:3]-1)*(t.dilations[1]-1))],$=[w[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),w[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],T=[{type:12,data:g},{type:12,data:_},{type:12,data:v},{type:12,data:x},{type:12,data:w},{type:6,data:$},{type:12,data:c},{type:12,data:u},{type:12,data:l},...U(e[0].dims,e[1].dims)];return n&&(T.push(...U(e[2].dims)),y.push("rank")),T.push(...U(i)),{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${d}${m}${f}${p}${h}`,inputDependencies:y},getRunData:()=>({dispatchGroup:{x:b[0],y:b[1],z:b[2]},outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],programUniforms:T}),getShaderSource:t=>{let r=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:_.length},{name:"filter_dims",type:"u32",length:v.length},{name:"dilations",type:"u32",length:v.length},{name:"effective_filter_dims",type:"u32",length:w.length},{name:"pads",type:"i32",length:$.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],a=Me(e[0].dataType),s=o?1:2,u=o?2:3,l=o?3:1,c=L("W",e[1].dataType,e[1].dims.length,m),g=L("Dy",e[0].dataType,e[0].dims.length,d),b=[g,c];n&&b.push(L("bias",e[2].dataType,[i[l]].length,f));let y=F("result",e[0].dataType,i.length,f),x=`
            let outputIndices = ${y.offsetToIndices(`global_idx * ${f}`)};
            let batch = ${y.indicesGet("outputIndices",0)};
            let d1 = ${y.indicesGet("outputIndices",l)};
            let r = ${y.indicesGet("outputIndices",s)};
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
              let dyR = (${a}(dyRCorner) + ${a}(wR)) / ${a}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${a}(uniforms.Dy_shape[${s}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${a}(dyCCorner) + ${a}(wC)) / ${a}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${a}(uniforms.Dy_shape[${u}]) ||
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
          dotProd = dotProd + dot(vec4<${a}>(${g.getByOffset("x_offset")}, ${g.getByOffset("x_offset + 1u")}), vec4<${a}>(${c.getByOffset("w_offset")}, ${c.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:1===d&&(e+=`
          dotProd = dotProd + dot(vec4<${a}>(${g.getByOffset("x_offset")}, ${g.getByOffset("x_offset + 1u")}, ${g.getByOffset("x_offset + 2u")}, ${g.getByOffset("x_offset + 3u")}), vec4<${a}>(${c.getByOffset("w_offset")}, ${c.getByOffset("w_offset + 1u")}, ${c.getByOffset("w_offset + 2u")}, ${c.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(e+=`
                  let xValue = ${o?g.getByOffset(`${g.indicesToOffset(`${g.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d}`):g.get("batch","inputChannel","idyR","idyC")};
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
            let value = dotProd${n?` + bias[d1 / ${f}]`:""};
            ${y.setByOffset("global_idx","value")};
          `;return`
    ${t.registerUniforms(r).declareVariables(...b,y)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${x}}`}}}}),Cw=N(()=>{"use strict";$w(),wr(),Yn(),EE=(e,t,r,n,i,o)=>(e-1)*t+r+(n-1)*i+1-o,CE=(e,t,r,n,i)=>{let o=Math.floor(e/2);"SAME_UPPER"===t?(r[n]=o,r[i]=e-o):"SAME_LOWER"===t&&(r[n]=e-o,r[i]=o)},DE=(e,t,r,n,i,o,a,s,u,l)=>{let d=e.length-2,p=0===l.length;u.length<d&&u.push(...Array(d-u.length).fill(0));let c=e[0],h=t[s?3:1]*i;for(let i=0,c=e.length-d-!!s;i<d;++i,++c){let s=e[c],h=p?s*a[i]:l[i];CE(EE(s,a[i],o[i],t[c],r[i],h),n,o,i,i+d),p&&l.push(a[i]*(s-1)+u[i]+(t[c]-1)*r[i]+1-o[i]-o[i+d])}l.splice(0,0,c),l.splice(s?3:1,0,h)},Aw=(e,t)=>{let r=e.kernelShape.slice();if(0===e.kernelShape.length||0===e.kernelShape.reduce((e,t)=>e*t,1)){r.length=0;for(let e=2;e<t[1].dims.length;++e)r.push(t[1].dims[e])}let n="NHWC"===e.format;r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let i=e.pads.slice(),o=e.outputShape.slice(),a=e.outputPadding.slice(),s=t[0].dims,u=e.dilations.slice();0===u.reduce((e,t)=>e+t,0)&&(u=Array(t[0].dims.length-2).fill(1));let l=e.strides.slice();0===l.reduce((e,t)=>e+t,0)&&(l=Array(t[0].dims.length-2).fill(1)),DE(s,r,u,e.autoPad,e.group,i,l,n,a,o);let d=Object.assign({},e);return Object.assign(d,{kernelShape:r,pads:i,outputPadding:a,outputShape:o,dilations:u,strides:l}),d},Ow=e=>{let t=Wa(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],i=e.dilations,o=e.group??1,a=e.kernelShape,s=e.pads,u=e.strides,l=e.wIsConst();return{autoPad:n,format:r,dilations:i,group:o,kernelShape:a,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:s,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},kE=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length&&3!==e[0].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let r=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==r))throw Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((e,t)=>e+t,0)>0&&t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.reduce((e,t)=>e+t,0)>0&&t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.reduce((e,t)=>e+t,0)>0&&t.pads.length!==2*n)throw Error(`pads should be ${2*n}D`);if(t.outputPadding.length!==n&&0!==t.outputPadding.length)throw Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((e,t)=>e+t,0)>0&&0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape")},Pw=(e,t,r,n)=>{let i=e.kernelCustomData.wT??e.compute(st(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let o=[t[0],i];3===t.length&&o.push(t[2]),e.compute(Sw(o,r,n),{inputs:o})},NE=(e,t)=>{let r="NHWC"===t.format,n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];3===e.inputs.length&&n.push(e.inputs[2]);let i=t.kernelShape;(0===i.length||0===i[0])&&(i=[e.inputs[1].dims[2]]);let o=t.dilations;(0===o.length||0===o[0])&&(o=[1]);let a=t.strides;(0===a.length||0===a[0])&&(a=[1]);let s=t.pads;0===s.length&&(s=[0,0]),s=[0,s[0],0,s[1]],a=[1].concat(a),o=[1].concat(o),i=[1].concat(i);let u=t.outputPadding;u=[0].concat(u);let l=Aw({...t,pads:s,strides:a,dilations:o,kernelShape:i,outputPadding:u},n);Pw(e,n,l,e=>r?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},Ew=(e,t)=>{if(kE(e.inputs,t),3===e.inputs[0].dims.length)NE(e,t);else{let r=Aw(t,e.inputs);Pw(e,e.inputs,r)}}}),Nw=N(()=>{"use strict";ue(),fe(),Je(),ge(),LE=(e,t,r,n)=>{let i=D.size(t),o=t.length,a=L("input",e,o),s=F("output",e,o),u=6===r.dataType?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=D.normalizeAxis(u,o);return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:l},...U(t,t)]}),getShaderSource:e=>{let t=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,r=Z("uniforms.input_shape","uniforms.axis",o),i=n.reverse?t+(n.exclusive?" + 1":""):"0",u=n.reverse?r:t+(n.exclusive?"":" + 1");return`
                ${e.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${i};
                  let last : i32 = ${u};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`}}},Dw=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,i=e.inputs[1];e.compute(LE(n,r,i,t),{inputs:[0]})},kw=e=>{let t=1===e.exclusive,r=1===e.reverse;return le({exclusive:t,reverse:r})}}),zw=N(()=>{"use strict";ue(),fe(),Je(),ge(),RE=e=>{if(!e||1!==e.length)throw Error("DepthToSpace requires 1 input.");if(4!==e[0].dims.length)throw Error("DepthToSpace requires 4D input.")},zE=(e,t,r,n)=>{let i=[];i.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let n=0;n<t;++n)i.push(r.indicesSet("a",e[n],`i[${n}]`));return i.push("return a;}"),i.join(`
`)},ME=(e,t)=>{let r,n,i,o,a,s,u="NHWC"===t.format,l=t.blocksize,d="DCR"===t.mode;u?([r,n,i,o]=e.dims,a=d?[r,n,i,l,l,o/l**2]:[r,n,i,o/l**2,l,l],s=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,i,o]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=d?[r,l,l,o/l**2,n,i]:[r,o/l**2,l,l,n,i],s=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(a),c=p.dims.length,h=e.dataType,f=L("a",h,c),m=F("output",h,c);return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:e=>{let t=u?[r,n*l,i*l,o/l**2]:[r,o/l**2,n*l,i*l],a=D.size(t),d=p.dims,c=D.sortBasedOnPerm(d,s);return{outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...U(d,c)]}},getShaderSource:e=>`
  ${e.registerUniform("output_size","u32").declareVariables(f,m)}

  ${zE(s,c,f,m)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",f.getByIndices("aIndices"))}
  }`}},Lw=(e,t)=>{RE(e.inputs),e.compute(ME(e.inputs[0],t))},Rw=e=>le({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Gw=N(()=>{"use strict";ue(),fe(),Je(),ge(),Mw="^"+(Za="("+(Nc="[a-zA-Z]|\\.\\.\\.")+")+")+"$",FE="^"+("("+Za+",)*")+Za+"$",Lc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);void 0===r?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Rc=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[r,n]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(FE)))throw Error("Invalid LHS term");if(r.split(",").forEach((t,r)=>{let n=e[r].dims.slice();if(!t.match(RegExp(Mw)))throw Error("Invalid LHS term");let i=this.processTerm(t,!0,n,r);this.lhs.push(i)}),""===n)n+=[...this.symbolToInfo.entries()].filter(([e,t])=>1===t.count||"..."===e).map(([e])=>e).join("");else if(!n.match(RegExp(Za)))throw Error("Invalid RHS");n.match(RegExp(Nc,"g"))?.forEach(e=>{if("..."===e)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let t=this.symbolToInfo.get(e);if(void 0===t)throw Error("Invalid RHS symbol");this.outputDims.push(t.dimValue)}}),this.rhs=this.processTerm(n,!1,this.outputDims)}addSymbol(e,t,r){let n=this.symbolToInfo.get(e);if(void 0!==n){if(n.dimValue!==t&&1!==n.count)throw Error("Dimension mismatch");n.count++,n.inputIndices.push(r)}else n={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,n)}processTerm(e,t,r,n=-1){let i=r.length,o=!1,a=[],s=0;if(!e.match(RegExp(Mw))&&!t&&""!==e)throw Error("Invalid LHS term");let u=e.match(RegExp(Nc,"g")),l=new Lc(n);return u?.forEach((e,d)=>{if("..."===e){if(o)throw Error("Only one ellipsis is allowed per input term");o=!0;let e=i-u.length+1;if(e<0)throw Error("Ellipsis out of bounds");if(a=r.slice(s,s+e),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=a;else throw Error("Ellipsis must be specified in the LHS");for(let e=0;e<a.length;e++){let t=String.fromCharCode(48+e);l.addSymbol(t,d+e),this.addSymbol(t,r[s++],n)}}else l.addSymbol(e,d+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,r[s++],n)}),l}},Bw=e=>e+"_max",VE=(e,t,r,n)=>{let i=e.map(e=>e.length).map((e,r)=>L(`input${r}`,t,e)),o=D.size(n),a=F("output",t,n.length),s=[...r.symbolToInfo.keys()].filter(e=>!r.rhs.symbolToIndices.has(e));return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let i=s.filter(e=>r.symbolToInfo.has(e)).map(e=>({type:12,data:r.symbolToInfo.get(e)?.dimValue||0}));i.push({type:12,data:o});let a=e.map((e,t)=>[...U(e)]).reduce((e,t)=>e.concat(t),i);return a.push(...U(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:a}},getShaderSource:e=>{let t=[],n=[],o=[],u=[],l=[],d=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((e,s)=>{if(r.rhs.symbolToIndices.has(s)){let n=r.rhs.symbolToIndices.get(s)?.[0];void 0!==n&&r.lhs.forEach((r,o)=>{if(e.inputIndices.includes(o)){let e=r.symbolToIndices.get(s);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{t.push(`${i[o].indicesSet(`input${o}Indices`,e,a.indicesGet("outputIndices",n))}`)})}})}else r.lhs.forEach((t,r)=>{if(e.inputIndices.includes(r)){let e=t.symbolToIndices.get(s);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{n.push(`${i[r].indicesSet(`input${r}Indices`,e,`${s}`)}`)}),l.push(`prod *= ${i[r].getByIndices(`input${r}Indices`)};`)}}),o.push(`for(var ${s}: u32 = 0; ${s} < uniforms.${Bw(s)}; ${s}++) {`),u.push("}")});let p=d?[...t,`let sum = ${i.map((e,t)=>e.getByIndices(`input${t}Indices`)).join(" * ")};`]:[...t,"var sum = 0.0;",...o,...n,"var prod = 1.0;",...l,"sum += prod;",...u];return`
            ${e.registerUniforms(s.map(e=>({name:`${Bw(e)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,a)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${i.map((e,t)=>`var input${t}Indices: ${i[t].type.indices};`).join(`
`)}
            ${p.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`}}},Fw=(e,t)=>{let r=new Rc(e.inputs,t.equation),n=r.outputDims,i=e.inputs.map((e,t)=>e.dims);e.compute(VE(i,e.inputs[0].dataType,r,n))},Vw=e=>{let t=e.equation.replace(/\s+/g,"");return le({equation:t})}}),Hw=N(()=>{"use strict";ue(),fe(),ge(),GE=e=>{if(!e||2!==e.length)throw Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,i=t.length<r.length?0:t.length-r.length;for(;n<r.length&&i<t.length;++n,++i)if(r[n]!==t[i]&&1!==r[n]&&1!==t[i])throw Error("Expand requires shape to be broadcastable to input")},Uw=(e,t)=>{let r=e.length-t.length,n=[];for(let t=0;t<r;++t)n.push(e[t]);for(let i=0;i<t.length;++i)n.push(1===t[i]?e[i+r]:t[i]);return n},UE=(e,t)=>e.length>t.length?Uw(e,t):Uw(t,e),WE=e=>{let t=e[0].dims,r=UE(t,Array.from(e[1].getBigInt64Array(),Number)),n=e[0].dataType,i=9===n||1===D.size(t),o=9===n||t.length>0&&t[t.length-1]%4==0?4:1,a=i||r.length>0&&r[r.length-1]%4==0?4:1,s=Math.ceil(D.size(r)/a),u=[{type:12,data:s},...U(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${o}${a}`,inputDependencies:["rank"]},getShaderSource:e=>{let i=L("input",n,t.length,o),s=F("output",n,r.length,a),u;if(9===n){let e=(e,t,r="")=>`
          let outputIndices${t} = ${s.offsetToIndices(`outputOffset + ${t}u`)};
          let offset${t} = ${i.broadcastedIndicesToOffset(`outputIndices${t}`,s)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${r}(${i.getByOffset(`index${t}`)}[component${t}]);
        `;u=`
        let outputOffset = global_idx * ${a};
        var data = vec4<u32>(0);
        ${e("data",0,"u32")}
        ${e("data",1,"u32")}
        ${e("data",2,"u32")}
        ${e("data",3,"u32")}
        ${s.setByOffset("global_idx","data")}
      }`}else u=`
        let outputIndices = ${s.offsetToIndices(`global_idx * ${a}`)};
        let inputOffset = ${i.broadcastedIndicesToOffset("outputIndices",s)};
        let data = ${s.type.value}(${i.getByOffset(`inputOffset / ${o}`)});
        ${s.setByOffset("global_idx","data")}
      }`;return`
    ${e.registerUniform("vec_size","u32").declareVariables(i,s)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${u}`},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},Ww=e=>{GE(e.inputs),e.compute(WE(e.inputs),{inputs:[0]})}}),jw=N(()=>{"use strict";ue(),fe(),ge(),Ua(),HE=e=>{let t=e[0].dataType,r=D.size(e[0].dims),n=D.size(e[1].dims),i=n%4==0;return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:e=>{let r=L("x",t,[1],4),n=L("bias",t,[1],4),o=F("y",t,[1],4),a=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${n.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,s=i?`
      let bias = ${n.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${a(0)}${a(1)}${a(2)}${a(3)}
      let bias = ${r.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms([{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}]).declareVariables(r,n,o)}

    ${$c(at(t))}

    ${e.mainStart(Ur)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${r.getByOffset("global_idx")};
      ${s}
      let x_in = x + bias;
      ${o.setByOffset("global_idx",Ac("x_in"))}
    }`},getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Ur/4)}})}},qw=e=>{e.inputs.length<2||0===D.size(e.inputs[1].dims)?G0(e):e.compute(HE(e.inputs))}}),Zw=N(()=>{"use strict";ue(),fe(),Je(),ge(),qE=e=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.")},jE=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r.length,o=D.normalizeAxis(t.axis,i),a=r.slice(0);a.splice(o,1,...n);let s=r[o],u=9===e[0].dataType?4:1,l=Math.ceil(D.size(a)/u),d=[{type:12,data:l},{type:6,data:s},{type:12,data:o},...U(e[0].dims,e[1].dims,a)];return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:t=>{let r=L("data",e[0].dataType,e[0].dims.length,u),s=L("inputIndices",e[1].dataType,e[1].dims.length),l=F("output",e[0].dataType,a.length,u),d=e=>{let t=n.length,u=`var indicesIndices${e}  = ${s.type.indices}(0);`;for(let r=0;r<t;r++)u+=`${t>1?`indicesIndices${e}[${r}]`:`indicesIndices${e}`} = ${a.length>1?`outputIndices${e}[uniforms.axis + ${r}]`:`outputIndices${e}`};`;u+=`
          var idx${e} = ${s.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${r.type.indices};
        `;for(let r=0,n=0;r<i;r++)r===o?(u+=`${i>1?`dataIndices${e}[${r}]`:`dataIndices${e}`} = u32(idx${e});`,n+=t):(u+=`${i>1?`dataIndices${e}[${r}]`:`dataIndices${e}`} = ${a.length>1?`outputIndices${e}[${n}]`:`outputIndices${e}`};`,n++);return u},p;if(9===e[0].dataType){let e=(e,t,n="")=>`
          let outputIndices${t} = ${l.offsetToIndices(`outputOffset + ${t}u`)};
          ${d(t)};
          let offset${t} = ${r.indicesToOffset(`dataIndices${t}`)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${n}(${r.getByOffset(`index${t}`)}[component${t}]);
        `;p=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${e("value",0,"u32")}
        ${e("value",1,"u32")}
        ${e("value",2,"u32")}
        ${e("value",3,"u32")}
        ${l.setByOffset("global_idx","value")}
      `}else p=`
      let outputIndices = ${l.offsetToIndices("global_idx")};
      ${d("")};
      let value = ${r.getByIndices("dataIndices")};
      ${l.setByOffset("global_idx","value")};
      `;return`
      ${t.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(r,s,l)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${p}
      }`}}},Kw=e=>le({axis:e.axis}),Xw=(e,t)=>{qE(e.inputs),e.compute(jE(e.inputs,t))}}),Yw=N(()=>{"use strict";ue(),fe(),ge(),KE=(e,t,r,n,i,o,a,s,u)=>{let l=[{type:12,data:o},{type:12,data:n},{type:12,data:i},{type:12,data:r},{type:12,data:a},{type:12,data:s},{type:12,data:u}],d=[o];return l.push(...U(t.dims,d)),e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${i.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:e=>{let n=L("indices_data",t.dataType,t.dims.length),o=F("input_slice_offsets_data",12,1,1),a=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:i.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${e.registerUniforms(a).declareVariables(n,o)}
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
        ${1===i.length?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${1===r.length?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[t],outputs:[-1]})[0]},Jw=(e,t)=>{let r=e.inputs,n=r[0].dims,i=r[0].dataType,o=r[1].dims,a=o[o.length-1],s=D.sizeToDimension(o,o.length-1),u=D.sizeFromDimension(n,t.batchDims+a),l=D.sizeToDimension(n,t.batchDims),d=D.sizeFromDimension(n,t.batchDims),p=Array(a),c=u;for(let e=0;e<a;++e)p[a-1-e]=c,c*=n[t.batchDims+a-1-e];let h=KE(e,r[1],p,t.batchDims,n,s,s/l,d,a),f=t.batchDims+a;if(f>n.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let m=o.slice(0,-1).concat(n.slice(f)),g=D.size(m),b=[{type:12,data:g},{type:12,data:u},...U(r[0].dims,h.dims,m)];e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:m,dataType:i}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:b}),getShaderSource:e=>{let t=L("data",r[0].dataType,r[0].dims.length),n=L("slice_offsets",12,h.dims.length),i=F("output",r[0].dataType,m.length);return`
          ${e.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(t,n,i)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[r[0],h]})},Qw=e=>({batchDims:e.batch_dims,cacheKey:""})}),nv=N(()=>{"use strict";ue(),fe(),Je(),ge(),XE=(e,t)=>{if(e.length<3||e.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=D.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,i=e[0],o=e[2],a=4===e.length?e[3]:void 0;if(o.dims.length!==i.dims.length||!i.dims.map((e,t)=>t===r?Math.ceil(e/n)===o.dims[t]:e===o.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==i.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==o.dims.length||!a.dims.map((e,t)=>e===o.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},ZE=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r.length,o=D.normalizeAxis(t.gatherAxis,i),a=D.normalizeAxis(t.quantizeAxis,i),s=r.slice(0);s.splice(o,1,...n);let u=D.size(s),l=e[2].dataType,d=22===e[0].dataType,p=[{type:12,data:u},{type:12,data:a},{type:12,data:o},{type:12,data:t.blockSize},...U(...e.map((e,t)=>e.dims),s)];return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((e,t)=>1!==t).map(e=>e.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(e,t)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:t=>{let i=L("data",e[0].dataType,e[0].dims.length),a=L("inputIndices",e[1].dataType,e[1].dims.length),u=L("scales",e[2].dataType,e[2].dims.length),p=e.length>3?L("zeroPoint",e[3].dataType,e[3].dims.length):void 0,c=F("output",l,s.length),h=[i,a,u];return p&&h.push(p),`
        ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...h,c)}
        ${t.mainStart()}
        let output_indices = ${c.offsetToIndices("global_idx")};
        var indices_indices = ${a.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${c.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${a.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${c.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${i.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${c.indicesGet("output_indices","i")};
          ${i.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${a.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[o]};
        }
        ${i.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${c.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${i.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${i.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${i.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${d?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${u.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${u.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${u.getByIndices("scale_indices")};
        ${p?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${p.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${p.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${d?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${at(l)}(quantized_data - zero_point) * scale;
        ${c.setByOffset("global_idx","dequantized_data")};
    }`}}},ev=(e,t)=>{XE(e.inputs,t),e.compute(ZE(e.inputs,t))},tv=e=>le({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),iv=N(()=>{"use strict";ue(),fe(),Je(),ge(),JE=e=>{if(!e||2!==e.length)throw Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},QE=(e,t)=>{let r=e[0].dims,n=e[0].dataType,i=r.length,o=e[1].dims,a=e[1].dataType,s=D.normalizeAxis(t.axis,i),u=r[s],l=o.slice(0),d=D.size(l),p=L("input",n,i),c=L("indicesInput",a,o.length),h=F("output",n,l.length),f=[{type:12,data:d},{type:6,data:u},{type:12,data:s}];return f.push(...U(r,o,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:e=>`
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
  }`}},rv=e=>le({axis:e.axis}),ov=(e,t)=>{JE(e.inputs),e.compute(QE(e.inputs,t))}}),uv=N(()=>{"use strict";ue(),fe(),ge(),YE=e=>{if(!e)throw Error("Input is missing");if(e.length<2||e.length>3)throw Error("Invaid input number.");if(3===e.length&&e[2].dims.length>2)throw Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||3===e.length&&e[0].dataType!==e[2].dataType)throw Error("Input types are mismatched")},eC=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[i,o,a]=Ea.getShapeOfGemmResult(r,t.transA,n,t.transB,3===e.length?e[2].dims:void 0),s=[i,o];if(!s)throw Error("Can't use gemm on the given tensors");let u=Math.ceil(o/16),l=Math.ceil(i/16),d=(D.size(s),[{type:12,data:u},{type:12,data:i},{type:12,data:o},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}]),p=["type","type"];return 3===e.length&&(d.push(...U(e[2].dims)),p.push("rank")),d.push(...U(s)),{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:u*l},programUniforms:d}),getShaderSource:r=>{let n=L("a",e[0].dataType,e[0].dims),i=L("b",e[1].dataType,e[1].dims),o=null,a=[n,i];3===e.length&&(o=L("c",e[2].dataType,e[2].dims.length),a.push(o));let u=F("output",e[0].dataType,s.length);a.push(u);let l="",d="";t.transA&&t.transB?(d=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${n.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,l="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(d=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${n.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,l="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(d=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${n.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,l="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):t.transA||t.transB||(d=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${n.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,l="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let p=1===t.alpha?"":"value *= uniforms.alpha;";return`
  ${r.registerUniforms([{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}]).declareVariables(...a)}
  var<workgroup> tile_a: array<array<${n.type.storage}, 16>, 16>;
  var<workgroup> tile_b: array<array<${i.type.storage}, 16>, 16>;
  ${r.mainStart([16,16,1])}
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
    ${null!=o?`let cOffset = ${o.broadcastedIndicesToOffset("vec2(m, n)",u)}; value += ${u.type.value}(uniforms.beta) * ${o.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}}},av=e=>({transA:e.transA,transB:e.transB,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${1===e.alpha}`}),sv=(e,t)=>{YE(e.inputs),e.compute(eC(e.inputs,t))}}),dv=N(()=>{"use strict";ue(),fe(),Je(),ge(),[er,vr,co,po]=[0,1,2,3],tC=e=>{if(4!==e[0].dims.length)throw Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw Error("grid batch size must match input batch size")},nC=`
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
`,rC=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,oC=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${0===e.alignCorners?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,iC=e=>`
  ${"reflection"===e.paddingMode?`
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
`,aC=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${er}] = batch;
     indices[${vr}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${co}] = u32(r);
            indices[${po}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${co}] = u32(clamp(r, 0, H - 1));
          indices[${po}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${co}] = gs_reflect(r, border[1], border[3]);
          indices[${po}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,sC=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${er}], indices[${vr}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${er}], indices[${vr}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${er}], indices[${vr}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${er}], indices[${vr}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${er}], indices[${vr}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${er}], indices[${vr}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,uC=(e,t)=>{let r=L("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=L("grid",e[1].dataType,n.length,2),o=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];"NHWC"===t.format&&(o=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[er,vr,co,po]=[0,3,1,2]);let a=F("output",e[0].dataType,o.length),s=r.type.value,u=[{type:12,data:D.size(o)},...U(e[0].dims,n,o)];return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:e=>{let t=D.size(o);return{outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:u}},getShaderSource:e=>`
  ${e.registerUniform("output_size","u32").declareVariables(r,i,a)}
  ${nC}
  ${rC(s)}
  ${oC(t)}
  ${iC(t)}
  ${aC(r,s,t)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${co}]);
      let W_in = i32(uniforms.x_shape[${po}]);

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

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${er}], indices[${co}], indices[${po}]);
      let nxy = ${i.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${sC(a,s,t)}
  }`}},lv=(e,t)=>{tC(e.inputs),e.compute(uC(e.inputs,t))},cv=e=>le({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),zc=N(()=>{"use strict";ue(),fe(),Je(),Ra(),Va(),ge(),Yn(),Tt=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,dC=(e,t)=>{let r,n=e[0],i=Tt(e,1),o=Tt(e,2),a=Tt(e,3),s=Tt(e,4),u=Tt(e,5),l=Tt(e,6),d=Tt(e,7);if(3!==n.dims.length&&5!==n.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let p=n.dims[0],c=n.dims[1],h=3===n.dims.length?n.dims[2]:t.numHeads*n.dims[4],f=c,m=0,g=0,b=Math.floor(h/t.numHeads);if(l&&d&&D.size(l.dims)&&D.size(d.dims)){if(4!==l.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==p||l.dims[1]!==t.numHeads||l.dims[3]!==b)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==b)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==d.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');m=l.dims[2],g=l.dims[2]}else if(l&&D.size(l.dims)||d&&D.size(d.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(i&&D.size(i.dims)>0){if(3!==n.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==i.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===i.dims.length){if(i.dims[2]!==n.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');r=2,f=i.dims[1]}else if(5===i.dims.length){if(i.dims[2]!==t.numHeads||2!==i.dims[3]||i.dims[4]!==b)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw Error('Expect "value" be none when "key" has packed kv format.');r=5,f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==b)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');r=0,f=i.dims[2]}}else{if(5!==n.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||3!==n.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');r=3}if(a&&D.size(a.dims)>0){if(1!==a.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(i&&5===i.dims.length&&2===i.dims[3])throw Error("bias is not allowed for packed kv.")}let y=m+f,_=0;if(s&&D.size(s.dims)>0){_=8;let e=s.dims;throw 1===e.length?e[0]===p?_=1:e[0]===3*p+2&&(_=3):2===e.length&&e[0]===p&&e[1]===y&&(_=5),8===_?Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):Error("Mask not supported")}let v=!1,x=h;if(o&&D.size(o.dims)>0){if(3!==o.dims.length&&4!==o.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===o.dims.length){if(f!==o.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');x=o.dims[2]}else{if(f!==o.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');x=o.dims[1]*o.dims[3],v=!0}}if(s&&D.size(s.dims)>0)throw Error("Key padding mask is not supported");if(u&&D.size(u.dims)>0){if(4!==u.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==y)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:c,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:y,maxSequenceLength:g,inputHiddenSize:0,hiddenSize:h,vHiddenSize:x,headSize:b,vHeadSize:Math.floor(x/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:v,qkvFormat:r}},fv=e=>le({...e}),pv=le({perm:[0,2,1,3]}),pC=(e,t,r,n,i,o,a)=>{let s=[n,i,o],u=D.size(s),l=[{type:12,data:u},{type:12,data:a},{type:12,data:o}];return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:e=>{let n=F("qkv_with_bias",t.dataType,s),i=L("qkv",t.dataType,s),o=L("bias",r.dataType,s);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}]).declareVariables(i,o,n)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[t,r],outputs:[-1]})[0]},qo=(e,t,r,n,i,o,a,s)=>{let u=o;if(!(a&&D.size(a.dims)>0))return 3===o.dims.length&&(u=o.reshape([t,n,r,i])),1===r||1===n?u:e.compute(st(u,pv.perm),{inputs:[u],outputs:[-1]})[0];if(1===n)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=(u=pC(e,o,a,t,n,r*i,s)).reshape([t,n,r,i]),1===r||1===n?u:e.compute(st(u,pv.perm),{inputs:[u],outputs:[-1]})[0]},hv=(e,t)=>{let r=dC(e.inputs,t),n=e.inputs[0],i=Tt(e.inputs,1),o=Tt(e.inputs,2),a=Tt(e.inputs,3),s=Tt(e.inputs,4),u=Tt(e.inputs,5),l=Tt(e.inputs,6),d=Tt(e.inputs,7);if(5===n.dims.length)throw Error("Packed QKV is not implemented");if(i?.dims.length===5)throw Error("Packed KV is not implemented");let p=i&&o&&4===i.dims.length&&4===o.dims.length,c=qo(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(p)return lo(e,c,i,o,s,void 0,l,d,u,r);if(!i||!o)throw Error("key and value must be provided");let h=qo(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,i,a,r.hiddenSize),f=qo(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,o,a,2*r.hiddenSize);lo(e,c,h,f,s,void 0,l,d,u,r)}}),Bc=N(()=>{"use strict";ue(),fe(),Je(),ge(),fC=e=>{if(!e||e.length<1)throw Error("too few inputs")},hC=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(e=>r.push(Number(e))),n=r.length),le({numOutputs:n,axis:t.axis,splitSizes:r})},mC=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${Z("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,gC=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let i=e[n].setByIndices("indices","input[global_idx]");1===t?r.push(i):0===n?r.push(`if (output_number == ${n}u) { ${i} }`):n===t-1?r.push(`else { ${i} }`):r.push(`else if (output_number == ${n}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Mc=(e,t)=>{let r=e[0].dims,n=D.size(r),i=e[0].dataType,o=D.normalizeAxis(t.axis,r.length),a=Array(t.numOutputs),s=L("input",i,r.length),u=Array(t.numOutputs),l=[],d=[],p=0,c=[{type:12,data:n}];for(let n=0;n<t.numOutputs;n++){p+=t.splitSizes[n],u[n]=p;let s=r.slice();s[o]=t.splitSizes[n],d.push(s),a[n]=F(`output${n}`,i,s.length),l.push({dims:d[n],dataType:e[0].dataType})}return c.push({type:12,data:u},...U(r,...d)),{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:e=>`
  ${e.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${mC(u.length)}
  ${gC(a)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",o)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Z("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${s.indicesSet("indices",o,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:c})}},mv=(e,t)=>{fC(e.inputs);let r=1===e.inputs.length?t:hC(e.inputs,t);e.compute(Mc(e.inputs,r),{inputs:[0]})},gv=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw Error("numOutputs and splitSizes length must be equal");return le({axis:t,numOutputs:n,splitSizes:r})}}),Fc=N(()=>{"use strict";ue(),fe(),Je(),ge(),bC=(e,t)=>{let[r,n,i,o]=e,{numHeads:a,rotaryEmbeddingDim:s}=t;if(3!==r.dims.length&&4!==r.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!D.areEqual(n.dims,[])&&!D.areEqual(n.dims,[1])&&2!==n.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(2!==i.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(2!==o.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(!D.areEqual(i.dims,o.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&0===a)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],l=r.dims[r.dims.length-2],d=i.dims[0],p=D.sizeFromDimension(r.dims,1)/l,c=0===s?2*i.dims[1]:p/a;if(s>c)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===n.dims.length){if(u!==n.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(l!==n.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(c/2!==i.dims[1]&&s/2!==i.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`);if(l>d)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Ja=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:i,scale:o}=t,a=e[0].dims[0],s=D.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],l=s/u,d=e[2].dims[1],p=0===i?2*d:l/n,c=[a,u,l/p,p-d],h=D.computeStrides(c),f=[{type:1,data:o},{type:12,data:c},{type:12,data:h},...3===e[0].dims.length?Array({type:12,data:[s,l,p,1]}):[],...4===e[0].dims.length?Array({type:12,data:[s,p,u*p,1]}):[],...U(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)];return{name:"RotaryEmbedding",shaderCache:{hint:le({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:t=>{let n=L("input",e[0].dataType,e[0].dims.length),i=L("position_ids",e[1].dataType,e[1].dims.length),o=L("cos_cache",e[2].dataType,e[2].dims.length),a=L("sin_cache",e[3].dataType,e[3].dims.length),s=F("output",e[0].dataType,e[0].dims.length);return t.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:c.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${t.declareVariables(n,i,o,a,s)}

        ${t.mainStart(Ur)}
          let half_rotary_emb_dim = uniforms.${o.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${i.broadcastedIndicesToOffset("bsnh.xy",F("",i.type.tensor,2))};
            let position_id =
                u32(${i.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${n.getByOffset("i")} * ${o.get("position_id","bsnh[3]")} -
                ${n.getByOffset("j")} * ${a.get("position_id","bsnh[3]")};
            ${s.setByOffset("i","re")}
            let im = ${n.getByOffset("i")} * ${a.get("position_id","bsnh[3]")} +
                ${n.getByOffset("j")} * ${o.get("position_id","bsnh[3]")};
            ${s.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${s.setByOffset("k",n.getByOffset("k"))}
          }
        }`},getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(c)/Ur)},programUniforms:f})}},bv=(e,t)=>{bC(e.inputs,t),e.compute(Ja(e.inputs,t))}}),wv=N(()=>{"use strict";Je(),ue(),Va(),zc(),Bc(),Yn(),Fc(),ge(),yC=(e,t)=>{if(t.doRotary&&e.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],i=e[2],o=e[3],a=e[4];if(0!==t.doRotary&&e.length<=7)throw Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(-1!==t.localWindowSize)throw Error("Local attention is not supported");if(0!==t.softcap)throw Error("Softcap is not supported");if(0!==t.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==r.dims.length&&5!==r.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let s=r.dims[0],u=r.dims[1],l=3===r.dims.length?r.dims[2]:t.numHeads*r.dims[4],d=u,p=0,c=!n||0===n.dims.length,h=Math.floor(c?l/(t.numHeads+2*t.kvNumHeads):l/t.numHeads);c&&(l=h*t.numHeads);let f=o&&0!==o.dims.length,m=a&&0!==a.dims.length;if(f&&4===o.dims.length&&o.dims[0]===s&&o.dims[1]!==t.kvNumHeads&&o.dims[2]===t.kvNumHeads&&o.dims[3]===h)throw Error("BSNH pastKey/pastValue is not supported");if(f&&m){if(4!==o.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==a.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');p=o.dims[2]}else if(f||m)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let g=1;if(n&&n.dims.length>0){if(3!==r.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===n.dims.length){if(r.dims[2]%n.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');d=n.dims[1]}else if(5===n.dims.length){if(n.dims[2]!==t.numHeads||2!==n.dims[3]||n.dims[4]!==h)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw Error('Expect "value" be none when "key" has packed kv format.');d=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==h)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');d=n.dims[2]}}else{if(3!==r.dims.length&&5!==r.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===r.dims.length&&(r.dims[2]!==t.numHeads||3!==r.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let b=!1,y=t.kvNumHeads?h*t.kvNumHeads:l;if(i&&i.dims.length>0){if(3!==i.dims.length&&4!==i.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===i.dims.length){if(d!==i.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');y=i.dims[2]}else{if(d!==i.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');y=i.dims[1]*i.dims[3],b=!0}}let _=e.length>4?e[5]:void 0;if(_&&1!==_.dims.length&&_.dims[0]!==s)throw Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:s,sequenceLength:u,pastSequenceLength:p,kvSequenceLength:d,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:l,vHiddenSize:y,headSize:h,vHeadSize:Math.floor(y/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:b,qkvFormat:g}},_C=le({perm:[0,2,1,3]}),yv=(e,t,r)=>{let n=t,i=r.kvNumHeads;return 3===t.dims.length&&0!==r.kvSequenceLength&&(n=t.reshape([r.batchSize,r.kvSequenceLength,i,r.headSize]),n=e.compute(st(n,_C.perm),{inputs:[n],outputs:[-1]})[0]),n},wC=(e,t,r,n)=>{let i=[e*t],o=e*t,a=[{type:12,data:o},{type:12,data:t},{type:12,data:e}];return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:i,dataType:7}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:a}),getShaderSource:e=>{let t=L("seq_lens",r.dataType,r.dims),o=L("total_seq_lens",n.dataType,n.dims),a=F("pos_ids",7,i);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}]).declareVariables(t,o,a)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${o.getByOffset("0")});
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
      ${a.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${a.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${a.setByOffset("global_idx","seqlen")}
    };
  }
  `}}},_v=(e,t)=>{let r=yC(e.inputs,t);if(5===e.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let n=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,o=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&0!==e.inputs[3].dims.length?e.inputs[3]:void 0,s=e.inputs[4]&&0!==e.inputs[4].dims.length?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,d=r.kvNumHeads?r.kvNumHeads:r.numHeads,p=le({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,d*r.headSize,d*r.headSize]}),[c,h,f]=i||o?[n,i,o]:e.compute(Mc([n],p),{inputs:[n],outputs:[-1,-1,-1]}),m,g;if(t.doRotary){let n=e.compute(wC(r.batchSize,r.sequenceLength,u,l),{inputs:[u,l],outputs:[-1]})[0],i=e.inputs[7],o=e.inputs[8],a=le({interleaved:0!==t.rotaryInterleaved,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),s=[c,n,i,o],d=[-1];m=e.compute(Ja(s,a),{inputs:s,outputs:d})[0],s.splice(0,1,h);let p=le({interleaved:0!==t.rotaryInterleaved,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});g=e.compute(Ja(s,p),{inputs:s,outputs:d})[0]}let b=qo(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?m:c,void 0,0),y=yv(e,t.doRotary?g:h,r),_=yv(e,f,r);lo(e,b,y,_,void 0,void 0,a,s,void 0,r,u,l)}}),Tv=N(()=>{"use strict";ue(),fe(),Yn(),ge(),vv=(e,t,r,n,i,o,a,s)=>{let u=Pe(o),l=1===u?"f32":`vec${u}f`,d=1===u?"vec2f":`mat2x${u}f`,p=i*a,c=64;1===p&&(c=256);let h=[i,a,o/u],f=[i,a,2],m=[];return m.push(...U(h,f)),e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${c}`,inputDependencies:["rank","type","type"]},getRunData:()=>({outputs:[{dims:f,dataType:1}],dispatchGroup:{x:p},programUniforms:m}),getShaderSource:e=>{let i=L("x",t.dataType,3,u),o=[i,L("scale",r.dataType,r.dims),L("bias",n.dataType,n.dims),F("output",1,3,2)];return`
  var<workgroup> workgroup_shared : array<${d}, ${c}>;
  const workgroup_size = ${c}u;
  ${e.declareVariables(...o)}
  ${e.mainStart(c)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${i.get("batch","channel","h")});
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
      let sum_final = ${Xt("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Xt("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[t,r,n],outputs:[-1]})[0]},vC=(e,t,r)=>{let n=t[0].dims,i=n[0],o=n[1],a=D.sizeFromDimension(n,2),s=Pe(a),u=D.size(n)/s,l=vv(e,t[0],t[1],t[2],i,a,o,r.epsilon),d=[i,o,a/s],p=[i,o];e.compute({name:"InstanceNormalization",shaderCache:{hint:`${s}`,inputDependencies:["type","none"]},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:[{type:12,data:u},...U(d,p,d)]}),getShaderSource:e=>{let r=L("x",t[0].dataType,d.length,s),n=L("scale_shift",1,p.length,2),i=F("output",t[0].dataType,d.length,s),o=[r,n,i];return`
  ${e.registerUniform("output_size","u32").declareVariables(...o)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${i.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${n.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${r.getByOffset("global_idx")} * ${i.type.value}(scale_shift.x) + ${i.type.value}(scale_shift.y);
      ${i.setByOffset("global_idx","value")};
  }`}},{inputs:[t[0],l]})},xC=(e,t,r)=>{let n=t[0].dims,i=n[0],o=n[n.length-1],a=D.sizeFromDimension(n,1)/o,s=Pe(o),u=D.size(n)/s,l=[{type:12,data:a},{type:12,data:Math.floor(o/s)}],d=!1,p=[0,n.length-1];for(let e=0;e<n.length-2;e++)d=d||1!==n[e+1],p.push(e+1);let c=(d=d&&1!==n[n.length-1])?e.compute(st(e.inputs[0],p),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},(e,t)=>n[p[t]])),h=vv(e,c,t[1],t[2],i,a,o,r.epsilon);e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${s}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:e=>{let r=Me(t[0].dataType),i=1===s?"vec2f":`mat${s}x2f`,o=e=>{let t=0===e?"x":"y",n=1===s?"f32":`vec${s}f`;switch(s){case 1:return`${r}(${n}(scale.${t}))`;case 2:return`vec2<${r}>(${n}(scale[0].${t}, scale[1].${t}))`;case 4:return`vec4<${r}>(${n}(scale[0].${t}, scale[1].${t}, scale[2].${t}, scale[3].${t}))`;default:throw Error(`Not supported compoents ${s}`)}},a=L("input",t[0].dataType,t[0].dims,s),u=F("output",t[0].dataType,n,s);return`
  @group(0) @binding(0) var<storage, read> input : array<${a.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${i}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${u.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${e.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${o(0)}, ${o(1)});
  }`}},{inputs:[t[0],h]})},xv=(e,t)=>{"NHWC"===t.format?xC(e,e.inputs,t):vC(e,e.inputs,t)}}),Sv=N(()=>{"use strict";ue(),fe(),ge(),TC=e=>{if(!e||e.length<2)throw Error("layerNorm requires at least 2 inputs.")},IC=(e,t,r)=>{let n=t.simplified,i=e[0].dims,o=e[1],a=!n&&e[2],s=D.normalizeAxis(t.axis,i.length),u=D.sizeToDimension(i,s),l=D.sizeFromDimension(i,s),d=D.size(o.dims),p=a?D.size(a.dims):0;if(d!==l||a&&p!==l)throw Error(`Size of X.shape()[axis:] == ${l}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${d} and bias size of ${p}`);let c=[];for(let e=0;e<i.length;++e)e<s?c.push(i[e]):c.push(1);let h=Pe(l),f=["type","type"],m=[{type:12,data:u},{type:1,data:l},{type:12,data:Math.floor(l/h)},{type:1,data:t.epsilon}];a&&f.push("type");let g=r>1,b=r>2,y=[{dims:i,dataType:e[0].dataType}];return g&&y.push({dims:c,dataType:1}),b&&y.push({dims:c,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${h};${r};${n}`,inputDependencies:f},getRunData:()=>({outputs:y,dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:t=>{let r=Me(e[0].dataType),s=[L("x",e[0].dataType,e[0].dims,h),L("scale",o.dataType,o.dims,h)];return a&&s.push(L("bias",a.dataType,a.dims,h)),s.push(F("output",e[0].dataType,i,h)),g&&s.push(F("mean_data_output",1,c)),b&&s.push(F("inv_std_output",1,c)),`
  ${t.registerUniforms([{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...s)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${xc("f32",h)};
    var mean_square_vector = ${xc("f32",h)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Wr(r,h,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Xt("mean_vector",h)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Xt("mean_square_vector",h)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Wr(r,h,"x[j + offset]")};
      let f32scale = ${Wr(r,h,"scale[j]")};
      output[j + offset] = ${s[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Wr(r,h,"bias[j]")}`:""}
      );
    }

    ${g?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`}}},Iv=(e,t)=>{TC(e.inputs),e.compute(IC(e.inputs,t,e.outputCount))}}),Av=N(()=>{"use strict";fe(),ja(),Ka(),SC=e=>{if(!e||2!==e.length)throw Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw Error("shared dimension does not match.")},$v=e=>{SC(e.inputs);let t=Un.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(qa(e.inputs,{activation:""},t));else{let i=t[t.length-2],o=D.size(e.inputs[0].dims.slice(0,-2)),a=D.size(e.inputs[1].dims.slice(0,-2));if(1!==o&&1===i&&1===a){let i=e.inputs[0].reshape([1,o,n]),a=e.inputs[1].reshape([1,n,r]),s=[1,o,r],u=[i,a];e.compute(Ho(u,{activation:""},t,s),{inputs:u})}else e.compute(Ho(e.inputs,{activation:""},t))}}}),Ev=N(()=>{"use strict";ue(),fe(),Je(),ge(),$C=(e,t)=>{if(e.length<3||e.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),o=t.blockSize/8*t.bits,a=e[1];if(!D.areEqual(a.dims,[t.n,i,o]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let s=e[2].dims;if(D.size(s)!==t.n*i)throw Error("scales input size error.");if(4===e.length){let r=e[3].dims,n=t.n*(8===t.bits?i:Math.floor((i*t.bits+7)/8));if(D.size(r)!==n)throw Error("zeroPoints input size error.")}},AC=(e,t)=>{let r=e[0].dims,n=r.length,i=r[n-2],o=t.k,a=t.n,s=r.slice(0,n-2),u=D.size(s),l=e[1].dims[2]/4,d=e[0].dataType,p=Pe(t.k),c=Pe(l),h=Pe(a),f=s.concat([i,a]),m=i>1&&a/h%2==0?2:1,g=D.size(f)/h/m,b=[],y=[u,i,o/p],_=D.convertShape(e[1].dims).slice();_.splice(-1,1,l/c),b.push(...U(y)),b.push(...U(_)),b.push(...U(e[2].dims)),4===e.length&&b.push(...U(D.convertShape(e[3].dims)));let v=[u,i,a/h];return b.push(...U(v)),{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${c};${h};${m};64`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:d}],dispatchGroup:{x:g},programUniforms:b}),getShaderSource:r=>{let n=y.length,i=L("a",e[0].dataType,n,p),o=L("b",12,_.length,c),a=L("scales",e[2].dataType,e[2].dims.length),s=[i,o,a],u=4===e.length?L("zero_points",12,e[3].dims.length):void 0;u&&s.push(u);let d=v.length,f=F("output",e[0].dataType,d,h),g=Me(e[0].dataType),b=(()=>{switch(p){case 1:return`array<${g}, 8>`;case 2:return`mat4x2<${g}>`;case 4:return`mat2x4<${g}>`;default:throw Error(`${p}-component is not supported.`)}})();return`
        var<workgroup> workgroup_shared: array<${f.type.value}, ${64*m}>;
        ${r.declareVariables(...s,f)}
        ${r.mainStart([64,1,1])}
          let output_indices = ${f.offsetToIndices(`(global_idx / 64) * ${m}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${(()=>{let e=`
            var col_index = col * ${h};
            ${u?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${g}(8);`}
            `;for(let t=0;t<h*m;t++)e+=`
            let scale${t} = ${a.getByOffset("col_index * nBlocksPerCol + block")};
            ${u?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${u.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${t} = ${g}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return e})()}
            for (var word: u32 = 0; word < ${l}; word += ${c}) {
              ${(()=>{let e=`col_index = col * ${h};`;for(let t=0;t<h*m;t++)e+=`
            let b${t}_data = ${o.getByIndices(`${o.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return e+`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${b};
            var b_dequantized_values: ${b};`})()}
              for (var i: u32 = 0; i < ${c}; i++) {
                ${(()=>{let e=`
          // reuse a data
            var input_offset = ${i.indicesToOffset(`${i.type.indices}(batch, row, word_offset)`)};
            var a_data: ${b};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${i.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let t=0;t<h*m;t++)e+=`
            b_value = ${1===c?`b${t}_data`:`b${t}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${b}(${Array.from({length:4},(e,t)=>`${g}(b_value_lower[${t}]), ${g}(b_value_upper[${t}])`).join(", ")});
            b_dequantized_values = ${1===p?`${b}(${Array.from({length:8},(e,r)=>`(b_quantized_values[${r}] - ${u?`zero_point${t}`:"zero_point"}) * scale${t}`).join(", ")});`:`(b_quantized_values - ${b}(${Array(8).fill(`${u?`zero_point${t}`:"zero_point"}`).join(",")})) * scale${t};`};
            workgroup_shared[local_id.x * ${m} + ${Math.floor(t/h)}]${h>1?`[${t%h}]`:""} += ${Array.from({length:8/p},(e,t)=>`${1===p?`a_data[${t}] * b_dequantized_values[${t}]`:`dot(a_data[${t}], b_dequantized_values[${t}])`}`).join(" + ")};
          `;return e})()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${m}) {
            var output_value: ${f.type.value} = ${f.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${m};
            }
            ${f.setByIndices(`${f.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`}}},OC=(e,t)=>{let r=e[0].dims,n=r.length,i=r[n-2],o=t.k,a=t.n,s=r.slice(0,n-2),u=D.size(s),l=e[1].dims[2]/4,d=e[0].dataType,p=Pe(t.k),c=Pe(l),h=s.concat([i,a]),f=a%8==0?8:a%4==0?4:1,m=128/f,g=m*c*8,b=g/p,y=g/t.blockSize,_=D.size(h)/f,v=[],x=[u,i,o/p],w=D.convertShape(e[1].dims).slice();w.splice(-1,1,l/c),v.push(...U(x)),v.push(...U(w)),v.push(...U(e[2].dims)),4===e.length&&v.push(...U(D.convertShape(e[3].dims)));let $=[u,i,a];return v.push(...U($)),{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${c};${m};${f}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:d}],dispatchGroup:{x:_},programUniforms:v}),getShaderSource:r=>{let n=x.length,i=L("a",e[0].dataType,n,p),o=L("b",12,w.length,c),a=L("scales",e[2].dataType,e[2].dims.length),s=[i,o,a],u=4===e.length?L("zero_points",12,e[3].dims.length):void 0;u&&s.push(u);let l=$.length,d=F("output",e[0].dataType,l),h=Me(e[0].dataType);return`
        var<workgroup> sub_a: array<${i.type.value}, ${b}>;
        var<workgroup> inter_results: array<array<${d.type.value}, ${m}>, ${f}>;
        ${r.declareVariables(...s,d)}
        ${r.mainStart([m,f,1])}
          let output_indices = ${d.offsetToIndices(`workgroup_index * ${f}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${y} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${b};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${b}; a_offset += 128)
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${i.getByIndices(`${i.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${i.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${y} + local_id.x;
            ${u?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${u.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${h}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${h}(8);`}
            let scale = ${a.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${o.getByIndices(`${o.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${c}; i++) {
              ${(()=>{switch(p){case 1:return`
          let a_data0 = vec4<${h}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${h}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${h}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${h}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${p}-component is not supported.`)}})()}
              let b_value = ${1===c?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${h}>(${Array.from({length:4},(e,t)=>`${h}(b_value_lower[${t}]), ${h}(b_value_upper[${t}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${h}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(e,t)=>`dot(a_data${t}, b_dequantized_values[${t}])`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${f}) {
            var output_value: ${d.type.value} = ${d.type.value}(0);
            for (var b = 0u; b < ${m}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${d.setByIndices(`${d.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`}}},Ov=(e,t)=>{$C(e.inputs,t),32===t.blockSize&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(OC(e.inputs,t)):e.compute(AC(e.inputs,t))},Pv=e=>le(e)}),Dv=N(()=>{"use strict";ue(),fe(),ge(),PC=e=>{if(!e||e.length<1)throw Error("Too few inputs");if(1!==e[0].dataType&&10!==e[0].dataType)throw Error("Input type must be float or float16.");if(e.length>=2){let t=2*e[0].dims.length===e[1].dims[0];if(4===e.length&&(t=2*e[3].dims[0]===e[1].dims[0]),!t)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},EC=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
            k = i32(${e.indicesGet("indices",i)}) - ${Z("uniforms.pads",i,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Z("uniforms.x_shape",i,t)})) {
              break;
            }
            offset += k * i32(${Z("uniforms.x_strides",i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},CC=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${Z("uniforms.pads",i,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Z("uniforms.x_shape",i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Z("uniforms.x_shape",i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Z("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},DC=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${Z("uniforms.pads",i,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Z("uniforms.x_shape",i,t)})) {
                  k = i32(${Z("uniforms.x_shape",i,t)}) - 1;
                }
                offset += k * i32(${Z("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},kC=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${Z("uniforms.pads",i,r)};
                if (k < 0)  {
                  k += i32(${Z("uniforms.x_shape",i,t)}]);
                }
                if (k >= i32(${Z("uniforms.x_shape",i,t)})) {
                  k -= i32(${Z("uniforms.x_shape",i,t)});
                }
                offset += k * i32(${Z("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},NC=(e,t,r)=>{switch(r.mode){case 0:return EC(e,t,r.pads.length);case 1:return CC(e,t,r.pads.length);case 2:return DC(e,t,r.pads.length);case 3:return kC(e,t,r.pads.length);default:throw Error("Invalid mode")}},LC=(e,t)=>{let r=D.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,i=[{type:12,data:D.size(r)},{type:6,data:t.pads}],o=e.length>=3&&e[2].data;return 0===t.mode&&i.push({type:o?e[2].dataType:1,data:t.value}),i.push(...U(e[0].dims,r)),{name:"Pad",shaderCache:{hint:`${t.mode}${o}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(r)/64)},programUniforms:i}),getShaderSource:i=>{let a=F("output",e[0].dataType,r.length),s=L("x",e[0].dataType,n.length),u=s.type.value,l=NC(a,n.length,t),d=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return 0===t.mode&&d.push({name:"constant_value",type:o?u:"f32"}),`
            ${i.registerUniforms(d).declareVariables(s,a)}
            ${i.mainStart()}
            ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${a.offsetToIndices("global_idx")};

            var value = ${u}(0);
            ${l}
            output[global_idx] = value;
        }`}}},RC=(e,t)=>{if(!(e.length>1))return t;{let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?10===e[2].dataType?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,o=new Int32Array(2*i).fill(0);if(e.length>=4){let t=e[3].getBigInt64Array();for(let e=0;e<t.length;e++)o[Number(t[e])]=Number(r[e]),o[Number(t[e])+i]=Number(r[e+t.length])}else r.forEach((e,t)=>o[Number(t)]=Number(e));let a=[];return o.forEach(e=>a.push(e)),{mode:t.mode,value:n,pads:a}}},Cv=(e,t)=>{PC(e.inputs);let r=RC(e.inputs,t);e.compute(LC(e.inputs,r),{inputs:[0]})}}),Xv=N(()=>{"use strict";pt(),ue(),fe(),ge(),Qa=e=>{if(pe.webgpu.validateInputContent&&(!e||1!==e.length))throw Error("Pool ops requires 1 input.")},kv=(e,t,r)=>{let n="NHWC"===t.format,i=e.dims.slice();n&&i.splice(1,0,i.pop());let o=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),s=t.strides.slice(),u=o?t.dilations.slice():[],l=t.pads.slice();Gr.adjustPoolAttributes(r,i,a,s,u,l);let d=Gr.computePoolOutputShape(r,i,s,u,a,l,t.autoPad),p=Object.assign({},t);o?Object.assign(p,{kernelShape:a,strides:s,pads:l,dilations:u,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:a,strides:s,pads:l,cacheKey:t.cacheKey});let c=d.slice();return c.push(c.splice(1,1)[0]),[p,n?c:d]},Nv=(e,t)=>{let r="NHWC"===t.format,n=[{type:12,data:D.size(e)},{type:12,data:D.size(t.kernelShape)}],i=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let e=t.kernelShape[t.kernelShape.length-1],r=t.strides[t.strides.length-1],o=t.pads[t.pads.length/2-1],a=t.pads[t.pads.length-1],s=!!(o+a);n.push({type:12,data:e},{type:12,data:r},{type:12,data:o},{type:12,data:a}),i.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let u=!1;if(2===t.kernelShape.length){let e=t.kernelShape[t.kernelShape.length-2],r=t.strides[t.strides.length-2],o=t.pads[t.pads.length/2-2],a=t.pads[t.pads.length-2];u=!!(o+a),n.push({type:12,data:e},{type:12,data:r},{type:12,data:o},{type:12,data:a}),i.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,i,!0,s,u]}{if(r)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let e=D.computeStrides(t.kernelShape);return n.push({type:12,data:e},{type:12,data:t.pads},{type:12,data:t.strides}),i.push({name:"kernelStrides",type:"u32",length:e.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length}),[n,i,!!t.pads.reduce((e,t)=>e+t),!1,!1]}},Lv=(e,t,r,n,i,o,a,s,u,l,d,p)=>{let c="NHWC"===i.format,h=t.type.value,f=F("output",t.type.tensor,n);if(i.kernelShape.length<=2){let n="",l="",m="",g=r-(c?2:1);if(n=d?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${o}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${o}
                }`,2===i.kernelShape.length){let e=r-(c?3:2);l=p?`
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

              var value = ${h}(${s});
              var pad = 0;
              ${l}
              ${n}
              ${m}
              ${a}

              output[global_idx] = value;
            }`}{if(c)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let n=i.kernelShape.length,d=i.pads.length,p="";return p=l?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${o}
              }`:`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${o}
            `,`
            ${e.registerUniforms(u).declareVariables(t,f)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var offsets: array<u32, ${n}>;

              var value = ${h}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${n-1}u; j++) {
                  offsets[j] = offset / ${Z("uniforms.kernelStrides","j",n)};
                  offset -= offsets[j] * ${Z("uniforms.kernelStrides","j",n)};
                }
                offsets[${n-1}] = offset;

                isPad = false;
                for (var j = ${r-n}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Z("uniforms.strides",`j - ${r-n}u`,n)}
                    + offsets[j - ${r-n}u] - ${Z("uniforms.pads","j - 2u",d)};
                  ${p}
              }
              ${a}

              output[global_idx] = value;
            }`}},Rv=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,zC=e=>`${Rv(e)};${e.countIncludePad}`,MC=e=>`${Rv(e)};${e.storageOrder};${e.dilations}`,zv=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Mv=(e,t,r,n)=>{let[i,o]=kv(t,n,r),a=L("x",t.dataType,t.dims.length),s=a.type.value,u="";i.countIncludePad?u+=`value /= ${s}(uniforms.kernelSize);`:u+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[l,d,p,c,h]=Nv(o,i);return l.push(...U(t.dims,o)),{name:e,shaderCache:{hint:`${n.cacheKey};${p};${c};${h}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(D.size(o)/64)},programUniforms:l}),getShaderSource:e=>Lv(e,a,t.dims.length,o.length,i,"value += x_val;",u,0,d,p,c,h)}},Bv=e=>{let t=0!==e.count_include_pad,r=zv(e);if(0!==r.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:zC(n)}},Fv=(e,t)=>{Qa(e.inputs),e.compute(Mv("AveragePool",e.inputs[0],!1,t))},Vv={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Gv=e=>{let t=e.format;return{format:t,...Vv,cacheKey:t}},Uv=(e,t)=>{Qa(e.inputs),e.compute(Mv("GlobalAveragePool",e.inputs[0],!0,t))},Wv=(e,t,r,n)=>{let[i,o]=kv(t,n,r),a=`
      value = max(x_val, value);
    `,s=L("x",t.dataType,t.dims.length),[u,l,d,p,c]=Nv(o,i);return u.push(...U(t.dims,o)),{name:e,shaderCache:{hint:`${n.cacheKey};${d};${p};${c}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(D.size(o)/64)},programUniforms:u}),getShaderSource:e=>Lv(e,s,t.dims.length,o.length,i,a,"",10===t.dataType?-65504:-1e5,l,d,p,c)}},Hv=(e,t)=>{Qa(e.inputs),e.compute(Wv("MaxPool",e.inputs[0],!1,t))},qv=e=>{let t=e.storage_order,r=e.dilations,n=zv(e);if(0!==t)throw Error("column major storage order is not yet supported for MaxPool");if(0!==n.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let i={storageOrder:t,dilations:r,...n,cacheKey:""};return{...i,cacheKey:MC(i)}},jv=e=>{let t=e.format;return{format:t,...Vv,cacheKey:t}},Kv=(e,t)=>{Qa(e.inputs),e.compute(Wv("GlobalMaxPool",e.inputs[0],!0,t))}}),Qv=N(()=>{"use strict";ue(),fe(),Je(),ge(),FC=(e,t)=>{if(e.length<2||e.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===e.length&&e[1].dims===e[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===e.length&&e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(6===e[0].dataType&&e.length>2)throw Error("In the case of dequantizing int32 there is no zero point.");if(0!==e[1].dims.length&&1!==e[1].dims.length&&e[1].dims.length!==e[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((t,r)=>t===e[2].dims[r]).reduce((e,t)=>e&&t,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(0===e[1].dims.length||1===e[1].dims.length&&1===e[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((r,n)=>n===t.axis||r===e[0].dims[n]).reduce((e,t)=>e&&t,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},VC=(e,t)=>{let r=D.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,i=3===n,o=e[0].dims,a=e[1].dataType,s=D.size(o),u=3===n||2===n,l=u?[Math.ceil(D.size(e[0].dims)/4)]:e[0].dims,d=e[1].dims,p=e.length>2?e[2]:void 0,c=p?u?[Math.ceil(D.size(p.dims)/4)]:p.dims:void 0,h=0===d.length||1===d.length&&1===d[0],f=!1===h&&1===d.length,m=Pe(s),g=h&&(!u||4===m),b=g?m:1,y=L("input",u?12:n,l.length,g&&!u?m:1),_=L("scale",a,d.length),v=p?L("zero_point",u?12:n,c.length):void 0,x=F("output",a,o.length,b),w=[y,_];v&&w.push(v);let $=[l,d];p&&$.push(c);let T=[{type:12,data:s/b},{type:12,data:r},{type:12,data:t.blockSize},...U(...$,o)];return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:v?["rank","rank","rank"]:["rank","rank"]},getShaderSource:e=>`
      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...w,x)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${x.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${y.getByOffset("global_idx / 4")};
            let x_vec = ${i?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===b?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${y.getByOffset("global_idx")};`};

          // Set scale input
          ${h?`let scale_value= ${_.getByOffset("0")}`:f?`
            let scale_index = ${x.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${_.getByOffset("scale_index")};`:`
            var scale_indices: ${_.type.indices} = output_indices;
            let index = ${_.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${_.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${_.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${v?h?u?`
                let zero_point_input = ${v.getByOffset("0")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${v.getByOffset("0")}`:f?u?`
                let zero_point_index = ${x.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${v.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${x.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${v.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${_.indicesToOffset("scale_indices")};
                let zero_point_input = ${v.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${v.getByIndices("scale_indices")};`:`let zero_point_value = ${u?i?"i32":"u32":y.type.value}(0);`};
      // Compute and write output
      ${x.setByOffset("global_idx",`${x.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:o,dataType:a}],dispatchGroup:{x:Math.ceil(s/b/64),y:1,z:1},programUniforms:T})}},Zv=(e,t)=>{FC(e.inputs,t),e.compute(VC(e.inputs,t))},Jv=e=>le({axis:e.axis,blockSize:e.blockSize})}),ex=N(()=>{"use strict";pt(),ue(),ge(),GC=(e,t,r)=>{if(e===t||e<t&&r<0||e>t&&r>0)throw Error("Range these inputs' contents are invalid.")},UC=(e,t,r,n)=>{let i=Math.abs(Math.ceil((t-e)/r)),o=[i],a=[{type:12,data:i},{type:n,data:e},{type:n,data:r},...U(o)];return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:e=>{let t=F("output",n,o.length),r=t.type.value;return`
        ${e.registerUniforms([{name:"outputSize",type:"u32"},{name:"start",type:r},{name:"delta",type:r}]).declareVariables(t)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${r}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:a})}},Yv=e=>{let t=0,r=0,n=0;6===e.inputs[0].dataType?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):1===e.inputs[0].dataType&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),pe.webgpu.validateInputContent&&GC(t,r,n),e.compute(UC(t,r,n,e.inputs[0].dataType),{inputs:[]})}}),rx=N(()=>{"use strict";ue(),fe(),Je(),ge(),WC=(e,t,r,n)=>{if("none"!==e&&"i32"!==n&&"u32"!==n&&"f32"!==n)throw Error(`Input ${n} is not supported with reduction ${e}.`);let i=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,o=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return"i32"===n||"u32"===n?`atomicAdd(&${t}, bitcast<${n}>(${r}));`:`
              ${i}bitcast<${n}>(oldValue) + (${r})${o}`;case"max":return"i32"===n||"u32"===n?`atomicMax(&${t}, bitcast<${n}>(${r}));`:`
                ${i}max(bitcast<f32>(oldValue), (${r}))${o}`;case"min":return"i32"===n||"u32"===n?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${i}min(bitcast<${n}>(oldValue), (${r}))${o}`;case"mul":return`${i}(bitcast<${n}>(oldValue) * (${r}))${o}`;default:throw Error(`Reduction ${e} is not supported.`)}},HC=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=Math.ceil(D.sizeToDimension(n,n.length-1)/1),o=n[n.length-1],a=D.sizeFromDimension(r,o),s=[{type:12,data:i},{type:12,data:o},{type:12,data:a},...U(e[1].dims,e[2].dims,r)];return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:s}),getShaderSource:n=>{let i=L("indices",e[1].dataType,e[1].dims.length),o=L("updates",e[2].dataType,e[2].dims.length,1),a="none"!==t.reduction&&""!==t.reduction?P_("output",e[0].dataType,r.length):F("output",e[0].dataType,r.length,1);return`
      ${n.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(i,o,a)}
      ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${1===e[0].dims.length?`
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
    ${WC(t.reduction,"output[data_offset + i]","value",a.type.value)}
  }

      }`}}},tx=e=>le({reduction:e.reduction}),nx=(e,t)=>{e.compute(HC(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),ux=N(()=>{"use strict";ue(),fe(),Je(),ge(),qC=(e,t)=>{if(e.every(e=>e>0||(()=>{throw Error("Resize requires scales input values to be positive")})),e.length>0){if("linear"===t.mode){if(2!==e.length&&3!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3])&&(5!==e.length||1!==e[0]||1!==e[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===t.mode&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},jC=(e,t,r)=>{t.every(e=>e>=0&&e<r||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")}));let n=Array(r).fill(1);return t.forEach((t,r)=>n[t]=e[r]),n},KC=(e,t,r,n,i,o)=>{let[a,s,u]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(e=>o.push(e));else if("tf_crop_and_resize"===t.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&e.length>s&&1===e[s].dims.length&&e[s].dims[0]>0){if(e[s].getFloat32Array().forEach(e=>n.push(e)),0!==n.length&&n.length!==l&&r>=18&&n.length!==t.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");qC(n,t),t.axes.length>0&&jC(n,t.axes,l).forEach((e,t)=>n[t]=e)}if(u>0&&e.length>u&&1===e[u].dims.length&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(e=>i.push(Number(e))),0!==i.length&&i.length!==l&&r>=18&&i.length!==t.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(0!==n.length&&n.length!==t.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==i.length&&i.length!==t.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if("u">typeof n&&"u">typeof i&&n.length>0&&i.length>l)throw Error("Resize requires only of scales or sizes to be specified")},ox=(e,t,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,XC=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${ox("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${ox("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",ZC=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${e} is not supported`)}})()+"}",JC=(e,t,r)=>{let n=Array(r).fill(0).concat(Array(r).fill(1)),i=0===e.length?n:e.slice();return t.length>0?(t.forEach((e,o)=>{n[e]=i[o],n[o+r]=i[t.length+o]}),n):i},QC=(e,t,r,n)=>{let i=[];if(r.length>0)if(n.length>0){if(e.forEach(e=>i.push(e)),Math.max(...n)>e.length)throw Error("axes is out of bound");n.forEach((e,t)=>i[e]=r[t])}else r.forEach(e=>i.push(e));else{if(0===t.length)throw Error("Resize requires either scales or sizes.");i=e.map((e,r)=>Math.round(e*t[r]))}return i},YC=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(e=>t[e]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(e=>t[e]),5e-324):Math.max(...t,5e-324);default:throw Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return r.axes.length>0?(r.axes.forEach(e=>t[e]=n),r.axes.forEach(r=>i[r]=Math.round(e[r]*t[r]))):(t.fill(n,0,t.length),i.forEach((e,r)=>i[r]=Math.round(e*t[r]))),i},eD=(e,t,r,n,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${Z("uniforms.scales","i",n)};
        var roi_low = ${Z("uniforms.roi","i",i)};
        var roi_hi = ${Z("uniforms.roi",`i + ${t.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${Z("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${Z("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,tD=(e,t,r,n,i,o,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Z("uniforms.scales","i",i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Z("uniforms.roi","i",o)};
          var roi_hi = ${Z("uniforms.roi",`i + ${r.length}`,o)};
          var input_shape_i = ${Z("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${Z("uniforms.output_shape","i",n.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,nD=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Z("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ix=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",rD=(e,t,r,n,i)=>{let[o,a,s,u]=2===r.length?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",s,`max(0, min(col, ${r[s]} - 1))`)};
      ${ix(e,u,o,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${a}];
      var col:${l} = originalIndices[${s}];
      ${n?`if (row < 0 || row > (${r[a]} - 1) || col < 0 || col > (${r[s]} - 1)) {
        return ${i};
      }`:""};
      row = max(0, min(row, ${r[a]} - 1));
      col = max(0, min(col, ${r[s]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${o}])`:"0"};
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
    }`},oD=(e,t,r,n,i,o,a,s,u,l)=>{let[d,p]=2===r.length?[0,1]:[2,3],c=e.type.value,h=a=>{let p=a===d?"row":"col";return`
      fn ${p}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${c} {
        var output_index = ${t.indicesGet("output_indices",a)};
        var originalIdx: ${c} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[a]},
        ${n[a]}, ${r[a]}, ${o[a]}, ${o[a]} + ${r.length});
        var fractOriginalIdx: ${c} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${r[a]} - 1))) {
          return ${u};
        }
        var data: array<${c}, 4> = array<${c}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${p}: ${c} = originalIdx + ${c}(i);
          if (${p} < 0 || ${p} >= ${r[a]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${u};`:`${p} = max(0, min(${p}, ${r[a]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",a,`u32(${p})`)};
          data[i + 1] = ${a===d?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
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
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
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
    `},iD=(e,t,r,n,i)=>{let[o,a,s,u,l]=3===r.length?[-1,0,1,2,-1]:[0,2,3,4,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",s,`max(0, min(height, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${r[u]} - 1))`)};
      ${ix(e,l,o,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${d} = originalIndices[${a}];
      var height:${d} = originalIndices[${s}];
      var width:${d} = originalIndices[${u}];
      ${n?`if (depth < 0 || depth > (${r[a]} - 1) || height < 0 || height > (${r[s]} - 1) || width < 0 || (width > ${r[u]} - 1)) {
      return ${i};
        }`:""};

    depth = max(0, min(depth, ${r[a]} - 1));
      height = max(0, min(height, ${r[s]} - 1));
      width = max(0, min(width, ${r[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${o}])`:"0"};

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
    }`},aD=(e,t,r,n,i,o)=>{let a=e.dims,s=JC(o,t.axes,a.length),u=QC(a,n,i,t.axes),l=n.slice();0===n.length&&(l=a.map((e,t)=>0===e?1:u[t]/e),"stretch"!==t.keepAspectRatioPolicy&&(u=YC(a,l,t)));let d=F("output",e.dataType,u.length),p=L("input",e.dataType,a.length),c=D.size(u),h=a.length===u.length&&a.every((e,t)=>e===u[t]),f="tf_crop_and_resize"===t.coordinateTransformMode,m=t.extrapolationValue,g=p.type.value;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${l.length>0?"cubic"===t.mode?l:l.length:""}|${i.length>0?i:""}|${s.length>0?s:""}|${h}|${"nearest"===t.mode?a.length:a}`,inputDependencies:["rank"]},getShaderSource:e=>`
      ${h?"":`
      ${XC(t.coordinateTransformMode,g)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${nD(p,a)};
              ${ZC(t.nearestMode,r,g)};
              ${tD(p,d,a,u,l.length,s.length,f)};
              `;case"linear":return`
              ${eD(d,a,u,l.length,s.length)};
              ${(()=>{if(2===a.length||4===a.length)return`${rD(p,d,a,f,m)}`;if(3===a.length||5===a.length)return`${iD(p,d,a,f,m)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===a.length||4===a.length)return`${oD(p,d,a,u,l,s,t.cubicCoeffA,f,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${e.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",s.length).declareVariables(p,d)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${h?"output[global_idx] = input[global_idx];":`
        let output_indices = ${d.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${2===a.length||4===a.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},{type:1,data:l},{type:1,data:s},...U(a,u)]})}},sD=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},ax=(e,t)=>{let r=[],n=[],i=[],o=sD(e);if(0!==t.antialias)throw Error("Only default value (0) for Antialias attribute is supported");KC(e.inputs,t,o,r,n,i),e.compute(aD(e.inputs[0],t,o,r,n,i),{inputs:[0]})},sx=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,i=e.cubicCoeffA,o=0!==e.excludeOutside,a=e.extrapolationValue,s=e.keepAspectRatioPolicy,u=e.mode,l=""===e.nearestMode?"simple":e.nearestMode;return le({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:i,excludeOutside:o,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:l})}}),cx=N(()=>{"use strict";ue(),fe(),ge(),uD=e=>{if(!e||e.length<3)throw Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw Error("All inputs must have the same data type");if(3!==t.dims.length&&2!==t.dims.length)throw Error("Input must be 2D or 3D");if(3!==r.dims.length&&2!==r.dims.length)throw Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],o=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==i)throw Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==o)throw Error("Skip must have the same sequence length as input");if(1!==n.dims.length)throw Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==i)throw Error("Gamma must have the same hidden size as input");if(e.length>3){let t=e[3];if(1!==t.dims.length)throw Error("Beta must be 1D");if(t.dims[t.dims.length-1]!==i)throw Error("Beta must have the same hidden size as input")}if(e.length>4){let t=e[4];if(1!==t.dims.length)throw Error("Bias must be 1D");if(t.dims[t.dims.length-1]!==i)throw Error("Bias must have the same hidden size as input")}},lD=(e,t,r,n)=>{let i=t.simplified,o=e[0].dims,a=D.size(o),s=o.slice(-1)[0],u=n?o.slice(0,-1).concat(1):[],l=!i&&e.length>3,d=e.length>4,p=n&&r>1,c=n&&r>2,h=r>3,f=Pe(s),m=[{type:12,data:a},{type:12,data:f},{type:12,data:s},{type:1,data:t.epsilon}],g=[{dims:o,dataType:e[0].dataType}];return r>1&&g.push({dims:u,dataType:1}),r>2&&g.push({dims:u,dataType:1}),r>3&&g.push({dims:o,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${f};${p};${c};${h}`,inputDependencies:e.map((e,t)=>"type")},getShaderSource:t=>{let r=[L("x",e[0].dataType,e[0].dims,f),L("skip",e[1].dataType,e[1].dims,f),L("gamma",e[2].dataType,e[2].dims,f)];l&&r.push(L("beta",e[3].dataType,e[3].dims,f)),d&&r.push(L("bias",e[4].dataType,e[4].dims,f)),r.push(F("output",e[0].dataType,o,f)),p&&r.push(F("mean_output",1,u)),c&&r.push(F("inv_std_output",1,u)),h&&r.push(F("input_skip_bias_sum",e[0].dataType,o,f));let n=Me(e[0].dataType),a=Me(1,f);return`

      ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...r)}
      var<workgroup> sum_shared : array<${a}, 64>;
      var<workgroup> sum_squared_shared : array<${a}, 64>;

      ${t.mainStart([64,1,1])}
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
          let bias_value = ${d?"bias[offset1d + i]":n+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Wr(n,f,"value")};
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
        let mean = ${Xt("sum",f)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Xt("square_sum",f)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${p?"mean_output[global_idx] = mean;":""}
        ${c?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${n}(mean)`}) *
            ${n}(inv_std_dev) * gamma[offset1d + i]
            ${l?"+ beta[offset1d + i]":""};
        }
      }`},getRunData:()=>({outputs:g,dispatchGroup:{x:Math.ceil(a/s)},programUniforms:m})}},lx=(e,t)=>{uD(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(lD(e.inputs,t,e.outputCount,!1),{outputs:r})}}),hx=N(()=>{"use strict";ue(),fe(),Je(),ge(),cD=(e,t)=>{if(!e||e.length<1)throw Error("too few inputs");if(0!==t.axes.length){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw Error("starts and ends must have the same length");e.slice(1).forEach((t,r)=>{if(6!==e[r+1].dataType&&7!==e[r+1].dataType)throw Error(`Input ${r} must be an array of int32 or int64`)})},Ya=(e,t)=>{let r=[];if(e.length>t)if(7===e[t].dataType)e[t].getBigInt64Array().forEach(e=>r.push(Number(e)));else if(6===e[t].dataType)e[t].getInt32Array().forEach(e=>r.push(Number(e)));else throw Error(`Input ${t} must be an array of int32 or int64`);return r},dD=(e,t)=>{if(!(e.length>1))return t;{let t=Ya(e,1),r=Ya(e,2),n=Ya(e,3);return 0===n.length&&(n=[...Array(e[0].dims.length).keys()]),le({starts:t,ends:r,axes:n})}},dx=(e,t,r,n,i)=>{let o=e;return e<0&&(o+=r[n[t]]),i[t]<0?Math.max(0,Math.min(o,r[n[t]]-1)):Math.max(0,Math.min(o,r[n[t]]))},pD=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${Z("uniforms.input_shape","i",r.length)};
            let steps_i = ${Z("uniforms.steps","i",r.length)};
            let signs_i = ${Z("uniforms.signs","i",r.length)};
            let starts_i = ${Z("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,fD=(e,t)=>{let r=e[0].dims,n=D.size(r),i=t.axes.length>0?D.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],o=Ya(e,4);o.forEach(e=>0!==e||(()=>{throw Error("step cannot be 0")})),0===o.length&&(o=Array(i.length).fill(1));let a=t.starts.map((e,t)=>dx(e,t,r,i,o)),s=t.ends.map((e,t)=>dx(e,t,r,i,o));if(i.length!==a.length||i.length!==s.length)throw Error("start, ends and axes should have the same number of elements");if(i.length!==r.length)for(let e=0;e<r.length;++e)i.includes(e)||(a.splice(e,0,0),s.splice(e,0,r[e]),o.splice(e,0,1));let u=o.map(e=>Math.sign(e));o.forEach((e,t,r)=>{if(e<0){let n=(s[t]-a[t])/e,i=a[t],u=i+n*o[t];a[t]=u,s[t]=i,r[t]=-e}});let l=r.slice(0);i.forEach((e,t)=>{l[e]=Math.ceil((s[e]-a[e])/o[e])});let d={dims:l,dataType:e[0].dataType},p=F("output",e[0].dataType,l.length),c=L("input",e[0].dataType,e[0].dims.length),h=D.size(l),f=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:o.length}],m=[{type:12,data:h},{type:12,data:a},{type:6,data:u},{type:12,data:o},...U(e[0].dims,l)];return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${o.length}`,inputDependencies:["rank"]},getShaderSource:e=>`
      ${e.registerUniforms(f).declareVariables(c,p)}
        ${pD(c,p,r)}
        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",c.getByIndices("input_indices"))}
      }`,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:m})}},px=(e,t)=>{cD(e.inputs,t);let r=dD(e.inputs,t);e.compute(fD(e.inputs,r),{inputs:[0]})},fx=e=>{let t=e.starts,r=e.ends,n=e.axes;return le({starts:t,ends:r,axes:n})}}),bx=N(()=>{"use strict";ue(),fe(),Je(),Yn(),ge(),hD=e=>{if(!e||1!==e.length)throw Error("Softmax op requires 1 input.")},mD=(e,t)=>{let r=e.inputs[0],n=r.dims,i=D.size(n),o=n.length,a=D.normalizeAxis(t.axis,o),s=a<n.length-1,u,l=[];s?((l=Array.from({length:o},(e,t)=>t))[a]=o-1,l[o-1]=a,u=e.compute(st(r,l),{inputs:[r],outputs:[-1]})[0]):u=r;let d=u.dims,p=d[o-1],c=i/p,h=Pe(p),f=p/h,m=64;1===c&&(m=256);let g=L("x",u.dataType,u.dims,h),b=F("result",u.dataType,u.dims,h),y=g.type.value,_="f32"===Me(u.dataType)?`var threadMax = ${y}(-3.4028234663852886e+38f);`:`var threadMax = ${y}(-65504.0h);`,v=e.compute({name:"Softmax",shaderCache:{hint:`${h};${m}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:d,dataType:u.dataType}],dispatchGroup:{x:c},programUniforms:[{type:6,data:f}]}),getShaderSource:e=>{let t;return`
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
      ${e.registerUniform("packedCols","i32").declareVariables(g,b)}
      ${e.mainStart(m)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${m};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${_}
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
          rowMaxShared = ${y}(${t="threadShared[0]",4===h?`max(max(${t}.x, ${t}.y), max(${t}.z, ${t}.w))`:2===h?`max(${t}.x, ${t}.y)`:3===h?`max(max(${t}.x, ${t}.y), ${t}.z)`:t});
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
          rowSumShared = ${y}(${Xt("threadShared[0]",h)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${y}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`}},{inputs:[u],outputs:[s?-1:0]})[0];s&&e.compute(st(v,l),{inputs:[v]})},mx=(e,t)=>{hD(e.inputs),mD(e,t)},gx=e=>le({axis:e.axis})}),wx=N(()=>{"use strict";ue(),fe(),ge(),yx=e=>Array.from(e.getBigInt64Array(),Number),gD=e=>{if(!e||2!==e.length)throw Error("Tile requires 2 inputs.");if(1!==e[0].dataType&&10!==e[0].dataType&&6!==e[0].dataType&&12!==e[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==e[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==e[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(yx(e[1]).length!==e[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},bD=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},yD=(e,t)=>{let r=e[0].dims,n=t??yx(e[1]),i=bD(r,n),o=D.size(i),a=e[0].dataType,s=L("input",a,r.length),u=F("output",a,i.length);return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},...U(e[0].dims,i)]}),getShaderSource:e=>`
      const inputShape = ${s.indices(...r)};
      ${e.registerUniform("output_size","u32").declareVariables(s,u)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`}},_x=e=>{gD(e.inputs),e.compute(yD(e.inputs),{inputs:[0]})}}),xx=N(()=>{"use strict";ue(),fe(),ge(),_D=(e,t,r,n,i)=>{let o=F("output_data",i,r.length,4),a=L("a_data",t[1].dataType,t[1].dims.length,4),s=L("b_data",t[2].dataType,t[2].dims.length,4),u=L("c_data",t[0].dataType,t[0].dims.length,4),l,d=(e,t,r)=>`select(${t}, ${e}, ${r})`;if(n){let e=(e,t,r="")=>{let n=`a_data[index_a${t}][component_a${t}]`,i=`b_data[index_b${t}][component_b${t}]`,l=`bool(c_data[index_c${t}] & (0xffu << (component_c${t} * 8)))`;return`
            let output_indices${t} = ${o.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offset_a${t} = ${a.broadcastedIndicesToOffset(`output_indices${t}`,o)};
            let offset_b${t} = ${s.broadcastedIndicesToOffset(`output_indices${t}`,o)};
            let offset_c${t} = ${u.broadcastedIndicesToOffset(`output_indices${t}`,o)};
            let index_a${t} = offset_a${t} / 4u;
            let index_b${t} = offset_b${t} / 4u;
            let index_c${t} = offset_c${t} / 4u;
            let component_a${t} = offset_a${t} % 4u;
            let component_b${t} = offset_b${t} % 4u;
            let component_c${t} = offset_c${t} % 4u;
            ${e}[${t}] = ${r}(${d(n,i,l)});
          `};l=9===i?`
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
          `}else l=o.setByOffset("global_idx",d(a.getByOffset("global_idx"),s.getByOffset("global_idx"),u.getByOffset("global_idx")));return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,a,s,o)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},wD=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,i=e[1].dataType,o=!(D.areEqual(t,r)&&D.areEqual(r,n)),a=t,s=D.size(t);if(o){let e=Un.calcShape(Un.calcShape(t,r,!1),n,!1);if(!e)throw Error("Can't perform where op on the given tensors");a=e,s=D.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:t=>_D(t,e,a,o,i),getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...U(n,t,r,a)]})}},vx=e=>{e.compute(wD(e.inputs))}}),Ix=N(()=>{"use strict";o0(),Va(),s0(),l0(),K0(),iw(),uw(),Iw(),Cw(),Nw(),zw(),Gw(),Hw(),jw(),Zw(),Yw(),nv(),iv(),uv(),dv(),wv(),Tv(),Sv(),Av(),Ev(),zc(),Dv(),Xv(),Qv(),ex(),rx(),Ba(),ux(),Fc(),cx(),hx(),bx(),Bc(),wx(),Yn(),Ua(),xx(),Tx=new Map([["Abs",[c0]],["Acos",[d0]],["Acosh",[p0]],["Add",[X0]],["ArgMax",[r0,Ic]],["ArgMin",[n0,Ic]],["Asin",[f0]],["Asinh",[h0]],["Atan",[m0]],["Atanh",[g0]],["Attention",[i0]],["AveragePool",[Fv,Bv]],["BatchNormalization",[a0]],["BiasAdd",[u0]],["BiasSplitGelu",[j0]],["Cast",[y0,b0]],["Ceil",[w0]],["Clip",[_0]],["Concat",[aw,sw]],["Conv",[kc,Dc]],["ConvTranspose",[Ew,Ow]],["Cos",[v0]],["Cosh",[x0]],["CumSum",[Dw,kw]],["DepthToSpace",[Lw,Rw]],["DequantizeLinear",[Zv,Jv]],["Div",[Z0]],["Einsum",[Fw,Vw]],["Elu",[T0,Uo]],["Equal",[J0]],["Erf",[I0]],["Exp",[S0]],["Expand",[Ww]],["FastGelu",[qw]],["Floor",[$0]],["FusedConv",[kc,Dc]],["Gather",[Xw,Kw]],["GatherElements",[ov,rv]],["GatherBlockQuantized",[ev,tv]],["GatherND",[Jw,Qw]],["Gelu",[A0]],["Gemm",[sv,av]],["GlobalAveragePool",[Uv,Gv]],["GlobalMaxPool",[Kv,jv]],["Greater",[tw]],["GreaterOrEqual",[rw]],["GridSample",[lv,cv]],["GroupQueryAttention",[_v]],["HardSigmoid",[L0,N0]],["InstanceNormalization",[xv]],["LayerNormalization",[Iv]],["LeakyRelu",[O0,Uo]],["Less",[nw]],["LessOrEqual",[ow]],["Log",[W0]],["MatMul",[$v]],["MatMulNBits",[Ov,Pv]],["MaxPool",[Hv,qv]],["Mul",[Q0]],["MultiHeadAttention",[hv,fv]],["Neg",[E0]],["Not",[P0]],["Pad",[Cv]],["Pow",[Y0]],["QuickGelu",[H0,Uo]],["Range",[Yv]],["Reciprocal",[C0]],["ReduceMin",[Z_]],["ReduceMean",[H_]],["ReduceMax",[X_]],["ReduceSum",[Q_]],["ReduceProd",[J_]],["ReduceL1",[q_]],["ReduceL2",[j_]],["ReduceLogSum",[e0]],["ReduceLogSumExp",[K_]],["ReduceSumSquare",[Y_]],["Relu",[D0]],["Resize",[ax,sx]],["RotaryEmbedding",[bv]],["ScatterND",[nx,tx]],["Sigmoid",[k0]],["Sin",[R0]],["Sinh",[z0]],["Slice",[px,fx]],["SkipLayerNormalization",[lx]],["Split",[mv,gv]],["Sqrt",[M0]],["Softmax",[mx,gx]],["Sub",[ew]],["Tan",[B0]],["Tanh",[V0]],["ThresholdedRelu",[U0,Uo]],["Tile",[_x]],["Transpose",[D_,k_]],["Where",[vx]]])}),Sx=N(()=>{"use strict";pt(),Gn(),ge(),es=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,n,i){$t(e.programInfo.name);let o=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let s=[];for(let e of t)s.push({binding:s.length,resource:{buffer:e.buffer}});for(let e of r)s.push({binding:s.length,resource:{buffer:e.buffer}});i&&s.push({binding:s.length,resource:i});let u=o.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:s,label:e.programInfo.name});if("capturing"===this.backend.sessionStatus){let t={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:n};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(t)}a.setPipeline(e.computePipeline),a.setBindGroup(0,u),a.dispatchWorkgroups(...n),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),yt(e.programInfo.name)}dispose(){}build(e,t){$t(e.name);let r=this.backend.device,n=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(e=>{r.features.has(e.feature)&&n.push(`enable ${e.extension};`)});let i=E_(t,this.backend.device.limits),o=e.getShaderSource(i),a=`${n.join(`
`)}
${i.additionalImplementations}
${o}`,s=r.createShaderModule({code:a,label:e.name});be("verbose",()=>`[WebGPU] ${e.name} shader code: ${a}`);let u=r.createComputePipeline({compute:{module:s,entryPoint:"main"},layout:"auto",label:e.name});return yt(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t="number"==typeof e?e:e.x,r="number"==typeof e?1:e.y||1,n="number"==typeof e?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&r<=i&&n<=i)return[t,r,n];let o=t*r*n,a=Math.ceil(Math.sqrt(o));if(!(a>i))return[a,a,1];if((a=Math.ceil(Math.cbrt(o)))>i)throw Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}}}),$x={};Sr($x,{WebGpuBackend:()=>Gc});var vD,xD,Vc,Gc,Ax=N(()=>{"use strict";pt(),ue(),Gn(),pc(),O_(),Ix(),Sx(),vD=(e,t)=>{if(t.length!==e.length)throw Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let i=e[n].dataType;switch(t[n]){case"none":r.push("");break;case"type":r.push(`${i}`);break;case"rank":{let t=e[n].dims.length;r.push(`${i};${t}`);break}case"dims":{let t=e[n].dims.join(",");r.push(`${i};${t}`);break}default:throw Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},xD=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${vD(t,e.shaderCache?.inputDependencies??Array(t.length).fill("dims"))}`},Vc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Gc=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],n={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},i=e=>t.features.has(e)&&r.push(e)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await t.requestDevice(n),this.adapterInfo=new Vc(t.info||await t.requestAdapterInfo()),this.gpuDataManager=A_(this),this.programManager=new es(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Pa(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){"u">typeof this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};"at-passes"===this.queryType&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let e;this.commandEncoder&&($t(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),e=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let e=0;e<t.length/2;e++){let n=r[e],i=n.kernelId,o=this.kernels.get(i),a=o.kernelType,s=o.kernelName,u=n.programName,l=n.inputTensorViews,d=n.outputTensorViews,p=t[2*e],c=t[2*e+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=p);let h=Number(p-this.queryTimeBase),f=Number(c-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(f))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:l.map(e=>({dims:e.dims,dataType:Vn(e.dataType)})),outputsMetadata:d.map(e=>({dims:e.dims,dataType:Vn(e.dataType)})),kernelId:i,kernelType:a,kernelName:s,programName:u,startTime:h,endTime:f});else{let e="";l.forEach((t,r)=>{e+=`input[${r}]: [${t.dims}] | ${Vn(t.dataType)}, `});let t="";d.forEach((e,r)=>{t+=`output[${r}]: [${e.dims}] | ${Vn(e.dataType)}, `}),console.log(`[profiling] kernel "${i}|${a}|${s}|${u}" ${e}${t}start time: ${h} ns, execution time: ${f-h} ns`)}di("GPU",`${u}::${p}::${c}`)}e.unmap(),this.pendingQueries.delete(e)}),yt())}run(e,t,r,n,i,o){let a;$t(e.name);let s=[];for(let e=0;e<t.length;++e){let r=t[e].data;if(0===r)continue;let n=this.gpuDataManager.get(r);if(!n)throw Error(`no GPU data for input: ${r}`);s.push(n)}let{outputs:u,dispatchGroup:l,programUniforms:d}=e.getRunData(t),p=0===r.length?u.map((e,t)=>t):r;if(p.length!==u.length)throw Error(`Output size ${p.length} must be equal to ${u.length}.`);let c=[],h=[];for(let e=0;e<u.length;++e){if(!Number.isInteger(p[e])||p[e]<-3||p[e]>=o)throw Error(`Invalid output index: ${p[e]}`);if(-3===p[e])continue;let t=-1===p[e],r=-2===p[e],a=t||r?i(u[e].dataType,u[e].dims):n(p[e],u[e].dataType,u[e].dims);if(c.push(a),0===a.data)continue;let s=this.gpuDataManager.get(a.data);if(!s)throw Error(`no GPU data for output: ${a.data}`);if(t&&this.temporaryData.push(s),r){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(s)}h.push(s)}if(s.length!==t.length||h.length!==c.length){if(0===h.length)return yt(e.name),c;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(d){let e=0,t=[];d.forEach(r=>{let n="number"==typeof r.data?[r.data]:r.data;if(0===n.length)return;let i=10===r.type?2:4,o,a;10===r.type?(a=n.length>4?16:n.length>2?8:n.length*i,o=n.length>4?16:i*n.length):(a=n.length<=2?n.length*i:16,o=16),e=Math.ceil(e/a)*a,t.push(e);let s=10===r.type?8:4;e+=n.length>4?Math.ceil(n.length/s)*o:n.length*i});let r=new ArrayBuffer(e=16*Math.ceil(e/16));d.forEach((e,n)=>{let i=t[n],o="number"==typeof e.data?[e.data]:e.data;if(6===e.type)new Int32Array(r,i,o.length).set(o);else if(12===e.type)new Uint32Array(r,i,o.length).set(o);else if(10===e.type)new Uint16Array(r,i,o.length).set(o);else if(1===e.type)new Float32Array(r,i,o.length).set(o);else throw Error(`Unsupported uniform type: ${Vn(e.type)}`)});let n=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(n.buffer,0,r,0,e),this.gpuDataManager.release(n.id),a={offset:0,size:e,buffer:n.buffer}}let f=this.programManager.normalizeDispatchGroupSize(l),m=xD(e,t,1===f[1]&&1===f[2]),g=this.programManager.getArtifact(m);if(g||(g=this.programManager.build(e,f),this.programManager.setArtifact(m,g),be("info",()=>`[artifact] key: ${m}, programName: ${e.name}`)),d&&g.uniformVariablesInfo){if(d.length!==g.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${g.uniformVariablesInfo.length}, got ${d.length} in program "${g.programInfo.name}".`);for(let e=0;e<d.length;e++){let t=d[e],r=t.type,n="number"==typeof t.data?1:t.data.length,[i,o]=g.uniformVariablesInfo[e];if(r!==i||n!==o)throw Error(`Uniform variable ${e} mismatch: expect type ${i} with size ${o}, got type ${r} with size ${n} in program "${g.programInfo.name}".`)}}if(be("info",()=>`[ProgramManager] run "${e.name}" (key=${m}) with ${f[0]}x${f[1]}x${f[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let e={kernelId:this.currentKernelId,programName:g.programInfo.name,inputTensorViews:t,outputTensorViews:c};this.pendingKernels.push(e),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(g,s,h,f,a),yt(e.name),c}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,n){let i=Tx.get(e);if(!i)throw Error(`kernel not implemented: ${e}`);let o={kernelType:e,kernelName:n,kernelEntry:i[0],attributes:[i[1],r]};this.kernels.set(t,o)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let e of t)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let n=this.kernels.get(e);if(!n)throw Error(`kernel not created: ${e}`);let i=n.kernelType,o=n.kernelName,a=n.kernelEntry,s=n.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${i}] ${o}" is not allowed to be called recursively`);this.currentKernelId=e,s[0]&&(s[1]=s[0](s[1]),s[0]=void 0),be("info",()=>`[WebGPU] Start to run kernel "[${i}] ${o}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),a(t,s[1]),0}catch(e){return r.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${o}" failed. ${e}`)),1}finally{for(let e of(u&&r.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${i}] ${o}": ${e.message}`:null)),this.temporaryData))this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,n){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let o=i.get(t),a=this.gpuDataManager.registerExternalBuffer(r,n,o);return i.set(t,[a,r]),a}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let n=await yc(this,e,t);return Ca(n.buffer,r)}}writeTimestamp(e){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){be("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){be("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){be("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let n=0;n<r;n++){let r=this.getComputePassEncoder(),i=e[n];this.writeTimestamp(2*this.pendingDispatchNumber),r.setPipeline(i.computePipeline),r.setBindGroup(0,i.bindGroup),r.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(t[n]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Ox={};Sr(Ox,{init:()=>TD});var jo,Uc,TD,ID,ba,ya,Hr,SD,Ex,Bo,_a,wa,Cx,va,xa,Ta,qr,Ft,Ko,ns,rs,ts,Wc,Hc,fo,ho,AD,Dx,kx,Nx,Lx,Rx,zx,Mx,Bx,OD,os,Px=N(()=>{"use strict";ue(),Gn(),fe(),T_(),jo=class e{constructor(e,t,r,n){this.module=e,this.dataType=t,this.data=r,this.dims=n}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let e=D.size(this.dims);return 0===e?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let e=D.size(this.dims);return 0===e?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let e=D.size(this.dims);return 0===e?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let e=D.size(this.dims);return 0===e?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(t){if(D.size(t)!==D.size(this.dims))throw Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Uc=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let n=e.PTR_SIZE,i=r/e.PTR_SIZE,o=4===n?"i32":"i64";this.opKernelContext=Number(e.getValue(n*i++,o));let a=Number(e.getValue(n*i++,o));this.outputCount=Number(e.getValue(n*i++,o)),this.customDataOffset=Number(e.getValue(n*i++,"*")),this.customDataSize=Number(e.getValue(n*i++,o));let s=[];for(let t=0;t<a;t++){let t=Number(e.getValue(n*i++,o)),r=Number(e.getValue(n*i++,"*")),a=Number(e.getValue(n*i++,o)),u=[];for(let t=0;t<a;t++)u.push(Number(e.getValue(n*i++,o)));s.push(new jo(e,t,r,u))}this.inputs=s}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(e=>"number"==typeof e?this.inputs[e]:e)??this.inputs,n=t?.outputs??[],i=(e,t,r)=>new jo(this.module,t,this.output(e,r),r),o=(e,t)=>{let r=_r(e,t);if(!r)throw Error(`Unsupported data type: ${e}`);let n=r>0?this.backend.gpuDataManager.create(r).id:0;return new jo(this.module,e,n,t)};return this.backend.run(e,r,n,i,o,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let r=this.module.PTR_SIZE,n=4===r?"i32":"i64",i=this.module.stackAlloc((1+t.length)*r);this.module.setValue(i,t.length,n);for(let e=0;e<t.length;e++)this.module.setValue(i+r*(e+1),t[e],n);return this.module._JsepOutput(this.opKernelContext,e,i)}catch(r){throw Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(r)}}},TD=async(e,t,r,n)=>{let i=t.jsepInit;if(!i)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===e){let e=new(Ax(),Xr($x)).WebGpuBackend;await e.initialize(r,n),i("webgpu",[e,t=>e.alloc(Number(t)),t=>e.free(t),(r,n,i,o=!1)=>{if(o)be("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(r)}, dst=${Number(n)}, size=${Number(i)}`),e.memcpy(Number(r),Number(n));else{be("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(r)}, gpuDataId=${Number(n)}, size=${Number(i)}`);let o=t.HEAPU8.subarray(Number(r>>>0),Number(r>>>0)+Number(i));e.upload(Number(n),o)}},async(r,n,i)=>{be("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${r}, dataOffset=${n}, size=${i}`),await e.download(Number(r),()=>t.HEAPU8.subarray(Number(n)>>>0,Number(n+i)>>>0))},(r,n,i)=>e.createKernel(r,Number(n),i,t.UTF8ToString(t._JsepGetNodeName(Number(n)))),t=>e.releaseKernel(t),(r,n,i,o)=>{be("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${i}, kernel=${r}, contextDataOffset=${n}`);let a=new Uc(t,e,Number(n));return e.computeKernel(Number(r),a,o)},()=>e.captureBegin(),()=>e.captureEnd(),()=>e.replay()])}else{let e=new La(r);i("webnn",[e,()=>e.reserveTensorId(),t=>e.releaseTensorId(t),async(t,r,n,i,o)=>e.ensureTensor(t,r,n,i,o),(t,r)=>{e.uploadTensor(t,r)},async(t,r)=>e.downloadTensor(t,r),(t,r)=>e.registerMLContext(t,r),!!r.trace])}}}),oc=N(()=>{"use strict";pt(),c_(),p_(),ue(),br(),Sa(),cc(),ID=(e,t)=>{0!==Re()._OrtInit(e,t)&&Oe("Can't initialize onnxruntime.")},ba=async e=>{ID(e.wasm.numThreads,Vo(e.logLevel))},ya=async(e,t)=>{Re().asyncInit?.();let r=e.webgpu.adapter;if("webgpu"===t){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(r){if("object"!=typeof r.limits||"object"!=typeof r.features||"function"!=typeof r.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=e.webgpu.powerPreference;if(void 0!==t&&"low-power"!==t&&"high-performance"!==t)throw Error(`Invalid powerPreference setting: "${t}"`);let n=e.webgpu.forceFallbackAdapter;if(void 0!==n&&"boolean"!=typeof n)throw Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(!(r=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:n})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===t&&(typeof navigator>"u"||!navigator.ml))throw Error("WebNN is not supported in current environment");{let n=(Px(),Xr(Ox)).init;"webgpu"===t&&await n("webgpu",Re(),e,r),"webnn"===t&&await n("webnn",Re(),e)}},Hr=new Map,SD=e=>{let t=Re(),r=t.stackSave();try{let r=t.PTR_SIZE,n=t.stackAlloc(2*r);0!==t._OrtGetInputOutputCount(e,n,n+r)&&Oe("Can't get session input/output count.");let i=4===r?"i32":"i64";return[Number(t.getValue(n,i)),Number(t.getValue(n+r,i))]}finally{t.stackRestore(r)}},Ex=(e,t)=>{let r=Re(),n=r.stackSave(),i=0;try{let n=r.PTR_SIZE,o=r.stackAlloc(2*n);0!==r._OrtGetInputOutputMetadata(e,t,o,o+n)&&Oe("Can't get session input/output metadata.");let a=Number(r.getValue(o,"*"));i=Number(r.getValue(o+n,"*"));let s=r.HEAP32[i/4];if(0===s)return[a,0];let u=r.HEAPU32[i/4+1],l=[];for(let e=0;e<u;e++){let t=Number(r.getValue(i+8+e*n,"*"));l.push(0!==t?r.UTF8ToString(t):Number(r.getValue(i+8+(e+u)*n,"*")))}return[a,s,l]}finally{r.stackRestore(n),0!==i&&r._OrtFree(i)}},Bo=e=>{let t=Re(),r=t._malloc(e.byteLength);if(0===r)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},_a=async(e,t)=>{let r,n,i=Re();Array.isArray(e)?[r,n]=e:e.buffer===i.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=Bo(e);let o=0,a=0,s=0,u=[],l=[],d=[];try{if([a,u]=await d_(t),t?.externalData&&i.mountExternalData){let e=[];for(let r of t.externalData){let t="string"==typeof r?r:r.path;e.push(Go("string"==typeof r?r:r.data).then(e=>{i.mountExternalData(t,e)}))}await Promise.all(e)}for(let e of t?.executionProviders??[])if(("string"==typeof e?e:e.name)==="webnn"){if(i.shouldTransferToMLTensor=!1,"string"!=typeof e){let t=e?.context,r=e?.gpuDevice,n=e?.deviceType,o=e?.powerPreference;t?i.currentContext=t:r?i.currentContext=await i.webnnCreateMLContext(r):i.currentContext=await i.webnnCreateMLContext({deviceType:n,powerPreference:o})}else i.currentContext=await i.webnnCreateMLContext();break}o=await i._OrtCreateSession(r,n,a),i.webgpuOnCreateSession?.(o),0===o&&Oe("Can't create a session."),i.jsepOnCreateSession?.(),i.currentContext&&(i.webnnRegisterMLContext(o,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[e,p]=SD(o),c=!!t?.enableGraphCapture,h=[],f=[],m=[],g=[],b=[];for(let t=0;t<e;t++){let[e,r,n]=Ex(o,t);0===e&&Oe("Can't get an input name."),l.push(e);let a=i.UTF8ToString(e);h.push(a),m.push(0===r?{name:a,isTensor:!1}:{name:a,isTensor:!0,type:Vn(r),shape:n})}for(let r=0;r<p;r++){let[n,a,s]=Ex(o,r+e);0===n&&Oe("Can't get an output name."),d.push(n);let u=i.UTF8ToString(n);f.push(u),g.push(0===a?{name:u,isTensor:!1}:{name:u,isTensor:!0,type:Vn(a),shape:s});{if(c&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let e="string"==typeof t?.preferredOutputLocation?t.preferredOutputLocation:t?.preferredOutputLocation?.[u]??"cpu",r=i.webnnIsGraphOutput;if("cpu"===e&&r&&r(o,u)){b.push("ml-tensor-cpu-output");continue}if("cpu"!==e&&"cpu-pinned"!==e&&"gpu-buffer"!==e&&"ml-tensor"!==e)throw Error(`Not supported preferred output location: ${e}.`);if(c&&"gpu-buffer"!==e)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(e)}}let y=null;return b.some(e=>"gpu-buffer"===e||"ml-tensor"===e||"ml-tensor-cpu-output"===e)&&(s=i._OrtCreateBinding(o),0===s&&Oe("Can't create IO binding."),y={handle:s,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(e=>"ml-tensor-cpu-output"===e?"ml-tensor":e).map(e=>lc(e))}),Hr.set(o,[o,l,d,y,c,!1]),[o,h,f,m,g]}catch(e){throw l.forEach(e=>i._OrtFree(e)),d.forEach(e=>i._OrtFree(e)),0!==s&&0!==i._OrtReleaseBinding(s)&&Oe("Can't release IO binding."),0!==o&&0!==i._OrtReleaseSession(o)&&Oe("Can't release session."),e}finally{i._free(r),0!==a&&0!==i._OrtReleaseSessionOptions(a)&&Oe("Can't release session options."),u.forEach(e=>i._free(e)),i.unmountExternalData?.()}},wa=e=>{let t=Re(),r=Hr.get(e);if(!r)throw Error(`cannot release session. invalid session id: ${e}`);let[n,i,o,a,s]=r;a&&(s&&0!==t._OrtClearBoundOutputs(a.handle)&&Oe("Can't clear bound outputs."),0!==t._OrtReleaseBinding(a.handle)&&Oe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),i.forEach(e=>t._OrtFree(e)),o.forEach(e=>t._OrtFree(e)),0!==t._OrtReleaseSession(n)&&Oe("Can't release session."),Hr.delete(e)},Cx=async(e,t,r,n,i,o,a=!1)=>{if(!e)return void t.push(0);let s=Re(),u=s.PTR_SIZE,l=e[0],d=e[1],p=e[3],c=p,h,f;if("string"===l&&("gpu-buffer"===p||"ml-tensor"===p))throw Error("String tensor is not supported on GPU.");if(a&&"gpu-buffer"!==p)throw Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if("gpu-buffer"===p){let t=e[2].gpuBuffer;f=_r(yr(l),d);{let e=s.jsepRegisterBuffer;if(!e)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');h=e(n,o,t,f)}}else if("ml-tensor"===p){let t=e[2].mlTensor;f=_r(yr(l),d);let r=s.webnnRegisterMLTensor;if(!r)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');h=r(n,t,yr(l),d)}else{let t=e[2];if(Array.isArray(t)){f=u*t.length,h=s._malloc(f),r.push(h);for(let e=0;e<t.length;e++){if("string"!=typeof t[e])throw TypeError(`tensor data at index ${e} is not a string`);s.setValue(h+e*u,Pt(t[e],r),"*")}}else{let e=s.webnnIsGraphInput,o=s.webnnIsGraphOutput;if("string"!==l&&e&&o){let a=s.UTF8ToString(i);if(e(n,a)||o(n,a)){let e=yr(l);f=_r(e,d),c="ml-tensor";let r=s.webnnCreateTemporaryTensor,i=s.webnnUploadTensor;if(!r||!i)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let o=await r(n,e,d);i(o,new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),h=o}else f=t.byteLength,h=s._malloc(f),r.push(h),s.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,f),h)}else f=t.byteLength,h=s._malloc(f),r.push(h),s.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,f),h)}}let m=s.stackSave(),g=s.stackAlloc(4*d.length);try{d.forEach((e,t)=>s.setValue(g+t*u,e,4===u?"i32":"i64"));let e=s._OrtCreateTensor(yr(l),h,f,g,d.length,lc(c));0===e&&Oe(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(e)}finally{s.stackRestore(m)}},va=async(e,t,r,n,i,o)=>{let a=Re(),s=a.PTR_SIZE,u=Hr.get(e);if(!u)throw Error(`cannot run inference. invalid session id: ${e}`);let l=u[0],d=u[1],p=u[2],c=u[3],h=u[4],f=u[5],m=t.length,g=n.length,b=0,y=[],_=[],v=[],x=[],w=[],$=a.stackSave(),T=a.stackAlloc(m*s),I=a.stackAlloc(m*s),S=a.stackAlloc(g*s),O=a.stackAlloc(g*s);try{let u;[b,y]=l_(o),sr("wasm prepareInputOutputTensor");for(let n=0;n<m;n++)await Cx(r[n],_,x,e,d[t[n]],t[n],h);for(let t=0;t<g;t++)await Cx(i[t],v,x,e,p[n[t]],m+n[t],h);ur("wasm prepareInputOutputTensor");for(let e=0;e<m;e++)a.setValue(T+e*s,_[e],"*"),a.setValue(I+e*s,d[t[e]],"*");for(let e=0;e<g;e++)a.setValue(S+e*s,v[e],"*"),a.setValue(O+e*s,p[n[e]],"*");if(c&&!f){let{handle:r,outputPreferredLocations:o,outputPreferredLocationsEncoded:s}=c;if(d.length!==m)throw Error(`input count from feeds (${m}) is expected to be always equal to model's input count (${d.length}).`);sr("wasm bindInputsOutputs");for(let n=0;n<m;n++){let i=t[n];await a._OrtBindInput(r,d[i],_[n])!==0&&Oe(`Can't bind input[${n}] for session=${e}.`)}for(let t=0;t<g;t++){let u=n[t];i[t]?.[3]?(w.push(v[t]),0!==a._OrtBindOutput(r,p[u],v[t],0)&&Oe(`Can't bind pre-allocated output[${t}] for session=${e}.`)):0!==a._OrtBindOutput(r,p[u],0,s[u])&&Oe(`Can't bind output[${t}] to ${o[t]} for session=${e}.`)}ur("wasm bindInputsOutputs"),Hr.set(e,[l,d,p,c,h,!0])}a.jsepOnRunStart?.(l),a.webnnOnRunStart?.(l),u=c?await a._OrtRunWithBinding(l,c.handle,g,S,b):await a._OrtRun(l,I,T,m,O,g,S,b),0!==u&&Oe("failed to call OrtRun().");let $=[],E=[];sr("wasm ProcessOutputTensor");for(let t=0;t<g;t++){let r=Number(a.getValue(S+t*s,"*"));if(r===v[t]||w.includes(v[t])){$.push(i[t]),r!==v[t]&&0!==a._OrtReleaseTensor(r)&&Oe("Can't release tensor.");continue}let o=a.stackSave(),u=a.stackAlloc(4*s),l=!1,d,p=0;try{0!==a._OrtGetTensorData(r,u,u+s,u+2*s,u+3*s)&&Oe(`Can't access output tensor data on index ${t}.`);let i=4===s?"i32":"i64",o=Number(a.getValue(u,i));p=a.getValue(u+s,"*");let h=a.getValue(u+2*s,"*"),f=Number(a.getValue(u+3*s,i)),m=[];for(let e=0;e<f;e++)m.push(Number(a.getValue(h+e*s,i)));0!==a._OrtFree(h)&&Oe("Can't free memory for tensor dims.");let g=m.reduce((e,t)=>e*t,1);d=Vn(o);let b=c?.outputPreferredLocations[n[t]];if("string"===d){if("gpu-buffer"===b||"ml-tensor"===b)throw Error("String tensor is not supported on GPU.");let e=[];for(let t=0;t<g;t++){let r=a.getValue(p+t*s,"*"),n=a.getValue(p+(t+1)*s,"*"),i=t===g-1?void 0:n-r;e.push(a.UTF8ToString(r,i))}$.push([d,m,e,"cpu"])}else if("gpu-buffer"===b&&g>0){let e=a.jsepGetBuffer;if(!e)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let t=e(p),n=_r(o,g);if(void 0===n||!Aa(d))throw Error(`Unsupported data type: ${d}`);l=!0,$.push([d,m,{gpuBuffer:t,download:a.jsepCreateDownloader(t,n,d),dispose:()=>{0!==a._OrtReleaseTensor(r)&&Oe("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===b&&g>0){let t=a.webnnEnsureTensor,n=a.webnnIsGraphInputOutputTypeSupported;if(!t||!n)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===_r(o,g)||!Oa(d))throw Error(`Unsupported data type: ${d}`);if(!n(e,d,!1))throw Error(`preferredLocation "ml-tensor" for ${d} output is not supported by current WebNN Context.`);let i=await t(e,p,o,m,!1);l=!0,$.push([d,m,{mlTensor:i,download:a.webnnCreateMLTensorDownloader(p,d),dispose:()=>{a.webnnReleaseTensorId(p),a._OrtReleaseTensor(r)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===b&&g>0){let e=a.webnnCreateMLTensorDownloader(p,d)(),t=$.length;l=!0,E.push((async()=>{let n=[t,await e];return a.webnnReleaseTensorId(p),a._OrtReleaseTensor(r),n})()),$.push([d,m,[],"cpu"])}else{let e=new(uo(d))(g);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(a.HEAPU8.subarray(p,p+e.byteLength)),$.push([d,m,e,"cpu"])}}finally{a.stackRestore(o),"string"===d&&p&&a._free(p),l||a._OrtReleaseTensor(r)}}for(let[t,r]of(c&&!h&&(0!==a._OrtClearBoundOutputs(c.handle)&&Oe("Can't clear bound outputs."),Hr.set(e,[l,d,p,c,h,!1])),await Promise.all(E)))$[t][2]=r;return ur("wasm ProcessOutputTensor"),$}finally{a.webnnOnRunEnd?.(l),a.stackRestore($),_.forEach(e=>a._OrtReleaseTensor(e)),v.forEach(e=>a._OrtReleaseTensor(e)),x.forEach(e=>a._free(e)),0!==b&&a._OrtReleaseRunOptions(b),y.forEach(e=>a._free(e))}},xa=e=>{let t=Re(),r=Hr.get(e);if(!r)throw Error("invalid session id");let n=r[0],i=t._OrtEndProfiling(n);0===i&&Oe("Can't get an profile file name."),t._OrtFree(i)},Ta=e=>{let t=[];for(let r of e){let e=r[2];!Array.isArray(e)&&"buffer"in e&&t.push(e.buffer)}return t}}),qc=N(()=>{"use strict";pt(),oc(),br(),ma(),qr=()=>!!pe.wasm.proxy&&"u">typeof document,Ko=!1,ns=!1,rs=!1,Hc=new Map,fo=(e,t)=>{let r=Hc.get(e);r?r.push(t):Hc.set(e,[t])},ho=()=>{if(Ko||!ns||rs||!Ft)throw Error("worker not ready")},AD=e=>{switch(e.data.type){case"init-wasm":Ko=!1,e.data.err?(rs=!0,Wc[1](e.data.err)):(ns=!0,Wc[0]()),ts&&(URL.revokeObjectURL(ts),ts=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Hc.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out)}}},Dx=async()=>{if(!ns){if(Ko)throw Error("multiple calls to 'initWasm()' detected.");if(rs)throw Error("previous call to 'initWasm()' failed.");if(Ko=!0,qr())return new Promise((e,t)=>{Ft?.terminate(),a_().then(([r,n])=>{try{(Ft=n).onerror=e=>t(e),Ft.onmessage=AD,Wc=[e,t];let i={type:"init-wasm",in:pe};!i.in.wasm.wasmPaths&&(r||ac)&&(i.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Ft.postMessage(i),ts=r}catch(e){t(e)}},t)});try{await ga(pe.wasm),await ba(pe),ns=!0}catch(e){throw rs=!0,e}finally{Ko=!1}}},kx=async e=>{if(qr())return ho(),new Promise((t,r)=>{fo("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:pe}};Ft.postMessage(n)});await ya(pe,e)},Nx=async e=>qr()?(ho(),new Promise((t,r)=>{fo("copy-from",[t,r]),Ft.postMessage({type:"copy-from",in:{buffer:e}},[e.buffer])})):Bo(e),Lx=async(e,t)=>{if(!qr())return _a(e,t);if(t?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return ho(),new Promise((r,n)=>{fo("create",[r,n]);let i={type:"create",in:{model:e,options:{...t}}},o=[];e instanceof Uint8Array&&o.push(e.buffer),Ft.postMessage(i,o)})},Rx=async e=>{if(qr())return ho(),new Promise((t,r)=>{fo("release",[t,r]),Ft.postMessage({type:"release",in:e})});wa(e)},zx=async(e,t,r,n,i,o)=>{if(!qr())return va(e,t,r,n,i,o);if(r.some(e=>"cpu"!==e[3]))throw Error("input tensor on GPU is not supported for proxy.");if(i.some(e=>e))throw Error("pre-allocated output tensor is not supported for proxy.");return ho(),new Promise((i,a)=>{fo("run",[i,a]),Ft.postMessage({type:"run",in:{sessionId:e,inputIndices:t,inputs:r,outputIndices:n,options:o}},Ta(r))})},Mx=async e=>{if(qr())return ho(),new Promise((t,r)=>{fo("end-profiling",[t,r]),Ft.postMessage({type:"end-profiling",in:e})});xa(e)}}),Fx=N(()=>{"use strict";pt(),qc(),ue(),ha(),cc(),Bx=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${e.location} for ${t()}`)}},OD=e=>{switch(e[3]){case"cpu":return new St(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Aa(t))throw Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:i}=e[2];return St.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:i})}case"ml-tensor":{let t=e[0];if(!Oa(t))throw Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:i}=e[2];return St.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:i})}default:throw Error(`invalid data location: ${e[3]}`)}},os=class{async fetchModelAndCopyToWasmMemory(e){return Nx(await Go(e))}async loadModel(e,t){let r;$t(),r="string"==typeof e?await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Lx(r,t),yt()}async dispose(){return Rx(this.sessionId)}async run(e,t,r){$t();let n=[],i=[];Object.entries(e).forEach(e=>{let t=e[0],r=e[1],o=this.inputNames.indexOf(t);if(-1===o)throw Error(`invalid input '${t}'`);n.push(r),i.push(o)});let o=[],a=[];Object.entries(t).forEach(e=>{let t=e[0],r=e[1],n=this.outputNames.indexOf(t);if(-1===n)throw Error(`invalid output '${t}'`);o.push(r),a.push(n)});let s=n.map((e,t)=>Bx(e,()=>`input "${this.inputNames[i[t]]}"`)),u=o.map((e,t)=>e?Bx(e,()=>`output "${this.outputNames[a[t]]}"`):null),l=await zx(this.sessionId,i,s,a,u,r),d={};for(let e=0;e<l.length;e++)d[this.outputNames[a[e]]]=o[e]??OD(l[e]);return yt(),d}startProfiling(){}endProfiling(){Mx(this.sessionId)}}}),Gx={};Sr(Gx,{OnnxruntimeWebAssemblyBackend:()=>is,initializeFlags:()=>Vx,wasmBackend:()=>PD});var Vx,is,PD,Ux=N(()=>{"use strict";pt(),qc(),Fx(),Vx=()=>{("number"!=typeof pe.wasm.initTimeout||pe.wasm.initTimeout<0)&&(pe.wasm.initTimeout=0);let e=pe.wasm.simd;if("boolean"!=typeof e&&void 0!==e&&"fixed"!==e&&"relaxed"!==e&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),pe.wasm.simd=!1),"boolean"!=typeof pe.wasm.proxy&&(pe.wasm.proxy=!1),"boolean"!=typeof pe.wasm.trace&&(pe.wasm.trace=!1),"number"!=typeof pe.wasm.numThreads||!Number.isInteger(pe.wasm.numThreads)||pe.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)pe.wasm.numThreads=1;else{let e=typeof navigator>"u"?Ps("node:os").cpus().length:navigator.hardwareConcurrency;pe.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},PD=new(is=class{async init(e){Vx(),await Dx(),await kx(e)}async createInferenceSessionHandler(e,t){let r=new os;return await r.loadModel(e,t),r}})});pt(),pt(),pt();var gf="1.24.3",lK=Ls;{let r=(jy(),Xr(qy)).onnxjsBackend;ar("webgl",r,-10)}{let r=(Ux(),Xr(Gx)).wasmBackend;ar("webgpu",r,5),ar("webnn",r,5),ar("cpu",r,10),ar("wasm",r,10)}Object.defineProperty(pe.versions,"web",{value:gf,enumerable:!0});export{sI as InferenceSession,di as TRACE,sr as TRACE_EVENT_BEGIN,ur as TRACE_EVENT_END,$t as TRACE_FUNC_BEGIN,yt as TRACE_FUNC_END,St as Tensor,lK as default,pe as env,ar as registerBackend};