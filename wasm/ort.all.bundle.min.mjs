/*! LICENSE: ort.all.bundle.min.mjs.LICENSE.txt */
var li,$r,ar,aI,Vp,Up,Hp,it,pe,jp,Kp,Ds,Zp,Jp,Qp,Yp,ef,Ar,_o,nf,rf,af,sf,dt,St,di,lf,$t,yt,sr,ur,pi,sI,tI=Object.create,ui=Object.defineProperty,nI=Object.getOwnPropertyDescriptor,rI=Object.getOwnPropertyNames,oI=Object.getPrototypeOf,iI=Object.prototype.hasOwnProperty,Ps=(e=>"u">typeof require?require:"u">typeof Proxy?new Proxy(e,{get:(e,t)=>("u">typeof require?require:e)[t]}):e)(function(e){if("u">typeof require)return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),N=(e,t)=>()=>(e&&(t=e(e=0)),t),oe=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Sr=(e,t)=>{for(var n in t)ui(e,n,{get:t[n],enumerable:!0})},Fp=(e,t,n,i)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let o of rI(t))iI.call(e,o)||o===n||ui(e,o,{get:()=>t[o],enumerable:!(i=nI(t,o))||i.enumerable});return e},_e=(e,t,n)=>(n=null!=e?tI(oI(e)):{},Fp(!t&&e&&e.__esModule?n:ui(n,"default",{value:e,enumerable:!0}),e)),Xr=e=>Fp(ui({},"__esModule",{value:!0}),e),Es=N(()=>{"use strict";li=new Map,$r=[],ar=(e,t,n)=>{if(t&&"function"==typeof t.init&&"function"==typeof t.createInferenceSessionHandler){let i=li.get(e);if(void 0===i)li.set(e,{backend:t,priority:n});else{if(i.priority>n)return;if(i.priority===n&&i.backend!==t)throw Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let t=$r.indexOf(e);-1!==t&&$r.splice(t,1);for(let t=0;t<$r.length;t++)if(li.get($r[t]).priority<=n)return void $r.splice(t,0,e);$r.push(e)}return}throw TypeError("not a valid backend")},aI=async e=>{let t=li.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(e){return n||(t.error=`${e}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Vp=async e=>{let t=e.executionProviders||[],n=t.map(e=>"string"==typeof e?e:e.name),i=0===n.length?$r:n,o,a=[],s=new Set;for(let e of i){let t=await aI(e);"string"==typeof t?a.push({name:e,err:t}):(o||(o=t),o===t&&s.add(e))}if(!o)throw Error(`no available backend found. ERR: ${a.map(e=>`[${e.name}] ${e.err}`).join(", ")}`);for(let{name:e,err:t}of a)n.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${t}`);let u=t.filter(e=>s.has("string"==typeof e?e:e.name));return[o,new Proxy(e,{get:(e,t)=>"executionProviders"===t?u:Reflect.get(e,t)})]}}),Gp=N(()=>{"use strict";Es()}),Wp=N(()=>{"use strict";Up="1.24.3"}),Cs=N(()=>{"use strict";Wp(),Hp="warning",Object.defineProperty(it={wasm:{},webgl:{},webgpu:{},versions:{common:Up},set logLevel(r){if(void 0!==r){if("string"!=typeof r||-1===["verbose","info","warning","error","fatal"].indexOf(r))throw Error(`Unsupported logging level: ${r}`);Hp=r}},get logLevel(){return Hp}},"logLevel",{enumerable:!0})}),qp=N(()=>{"use strict";Cs(),pe=it}),Xp=N(()=>{"use strict";jp=(e,t)=>{let n="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let i=n.getContext("2d");if(null!=i){let o,a;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(o=e.dims[2],a=e.dims[3]):(o=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,d;void 0===u||void 0===u.mean?l=[255,255,255,255]:"number"==typeof u.mean?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],void 0!==u.mean[3]&&(l[3]=u.mean[3])),void 0===u||void 0===u.bias?d=[0,0,0,0]:"number"==typeof u.bias?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(d[3]=u.bias[3]));let p=a*o,c=0,h=p,f=2*p,m=-1;"RGBA"===s?(c=0,h=p,f=2*p,m=3*p):"RGB"===s?(c=0,h=p,f=2*p):"RBG"===s&&(c=0,f=p,h=2*p);for(let t=0;t<a;t++)for(let n=0;n<o;n++)i.fillStyle="rgba("+(e.data[c++]-d[0])*l[0]+","+(e.data[h++]-d[1])*l[1]+","+(e.data[f++]-d[2])*l[2]+","+(-1===m?255:(e.data[m++]-d[3])*l[3])+")",i.fillRect(n,t,1,1);if("toDataURL"in n)return n.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},Kp=(e,t)=>{let n="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(null!=n){let o,a,s;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(o=e.dims[2],a=e.dims[1],s=e.dims[3]):(o=e.dims[3],a=e.dims[2],s=e.dims[1]);let u=void 0!==t&&void 0!==t.format?t.format:"RGB",l=t?.norm,d,p;void 0===l||void 0===l.mean?d=[255,255,255,255]:"number"==typeof l.mean?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],void 0!==l.mean[3]&&(d[3]=l.mean[3])),void 0===l||void 0===l.bias?p=[0,0,0,0]:"number"==typeof l.bias?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],void 0!==l.bias[3]&&(p[3]=l.bias[3]));let c=a*o;if(void 0!==t&&(void 0!==t.format&&4===s&&"RGBA"!==t.format||3===s&&"RGB"!==t.format&&"BGR"!==t.format))throw Error("Tensor format doesn't match input tensor dims");let h=4,f=0,m=1,g=2,b=3,y=0,_=c,v=2*c,x=-1;"RGBA"===u?(y=0,_=c,v=2*c,x=3*c):"RGB"===u?(y=0,_=c,v=2*c):"RBG"===u&&(y=0,v=c,_=2*c),i=n.createImageData(o,a);for(let t=0;t<a*o;f+=h,m+=h,g+=h,b+=h,t++)i.data[f]=(e.data[y++]-p[0])*d[0],i.data[m]=(e.data[_++]-p[1])*d[1],i.data[g]=(e.data[v++]-p[2])*d[2],i.data[b]=-1===x?255:(e.data[x++]-p[3])*d[3]}else throw Error("Can not access image data");return i}}),tf=N(()=>{"use strict";ci(),Ds=(e,t)=>{if(void 0===e)throw Error("Image buffer must be defined");if(void 0===t.height||void 0===t.width)throw Error("Image height and width must be defined");if("NHWC"===t.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:n,width:i}=t,o=t.norm??{mean:255,bias:0},a,s;a="number"==typeof o.mean?[o.mean,o.mean,o.mean,o.mean]:[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],s="number"==typeof o.bias?[o.bias,o.bias,o.bias,o.bias]:[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let u=void 0!==t.format?t.format:"RGBA",l=void 0!==t.tensorFormat&&void 0!==t.tensorFormat?t.tensorFormat:"RGB",d=n*i,p=new Float32Array("RGBA"===l?4*d:3*d),c=4,h=0,f=1,m=2,g=3,b=0,y=d,_=2*d,v=-1;"RGB"===u&&(c=3,h=0,f=1,m=2,g=-1),"RGBA"===l?v=3*d:"RBG"===l?(b=0,_=d,y=2*d):"BGR"===l&&(_=0,y=d,b=2*d);for(let t=0;t<d;t++,h+=c,m+=c,f+=c,g+=c)p[b++]=(e[h]+s[0])/a[0],p[y++]=(e[f]+s[1])/a[1],p[_++]=(e[m]+s[2])/a[2],-1!==v&&-1!==g&&(p[v++]=(e[g]+s[3])/a[3]);return"RGBA"===l?new dt("float32",p,[1,4,n,i]):new dt("float32",p,[1,3,n,i])},Zp=async(e,t)=>{let n="u">typeof HTMLImageElement&&e instanceof HTMLImageElement,i="u">typeof ImageData&&e instanceof ImageData,o="u">typeof ImageBitmap&&e instanceof ImageBitmap,a="string"==typeof e,s,u=t??{},l=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},d=e=>"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext("2d"):null;if(n){let n=l();n.width=e.width,n.height=e.height;let i=d(n);if(null!=i){let n=e.height,o=e.width;if(void 0!==t&&void 0!==t.resizedHeight&&void 0!==t.resizedWidth&&(n=t.resizedHeight,o=t.resizedWidth),void 0!==t){if(u=t,void 0!==t.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=n,u.width=o}else u.tensorFormat="RGBA",u.height=n,u.width=o;i.drawImage(e,0,0),s=i.getImageData(0,0,o,n).data}else throw Error("Can not access image data")}else if(i){let n,i;if(void 0!==t&&void 0!==t.resizedWidth&&void 0!==t.resizedHeight?(n=t.resizedHeight,i=t.resizedWidth):(n=e.height,i=e.width),void 0!==t&&(u=t),u.format="RGBA",u.height=n,u.width=i,void 0!==t){let t=l();t.width=i,t.height=n;let o=d(t);if(null!=o)o.putImageData(e,0,0),s=o.getImageData(0,0,i,n).data;else throw Error("Can not access image data")}else s=e.data}else if(o){if(void 0===t)throw Error("Please provide image config with format for Imagebitmap");let n=l();n.width=e.width,n.height=e.height;let i=d(n);if(null!=i){let t=e.height,n=e.width;return i.drawImage(e,0,0,n,t),s=i.getImageData(0,0,n,t).data,u.height=t,u.width=n,Ds(s,u)}throw Error("Can not access image data")}else{if(a)return new Promise((t,n)=>{let i=l(),o=d(i);if(!e||!o)return n();let a=new Image;a.crossOrigin="Anonymous",a.src=e,a.onload=()=>{i.width=a.width,i.height=a.height,o.drawImage(a,0,0,i.width,i.height);let e=o.getImageData(0,0,i.width,i.height);u.height=i.height,u.width=i.width,t(Ds(e.data,u))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==s)return Ds(s,u);throw Error("Input data provided is not supported - aborted tensor creation")},Jp=(e,t)=>{let{width:n,height:i,download:o,dispose:a}=t;return new dt({location:"texture",type:"float32",texture:e,dims:[1,i,n,4],download:o,dispose:a})},Qp=(e,t)=>{let{dataType:n,dims:i,download:o,dispose:a}=t;return new dt({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:i,download:o,dispose:a})},Yp=(e,t)=>{let{dataType:n,dims:i,download:o,dispose:a}=t;return new dt({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:i,download:o,dispose:a})},ef=(e,t,n)=>new dt({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})}),of=N(()=>{"use strict";Ar=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),_o=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),nf=!1,rf=()=>{if(!nf){nf=!0;let e="u">typeof BigInt64Array&&BigInt64Array.from,t="u">typeof BigUint64Array&&BigUint64Array.from,n=globalThis.Float16Array,i="u">typeof n&&n.from;e&&(Ar.set("int64",BigInt64Array),_o.set(BigInt64Array,"int64")),t&&(Ar.set("uint64",BigUint64Array),_o.set(BigUint64Array,"uint64")),i?(Ar.set("float16",n),_o.set(n,"float16")):Ar.set("float16",Uint16Array)}}}),uf=N(()=>{"use strict";ci(),af=e=>{let t=1;for(let n=0;n<e.length;n++){let i=e[n];if("number"!=typeof i||!Number.isSafeInteger(i))throw TypeError(`dims[${n}] must be an integer, got: ${i}`);if(i<0)throw RangeError(`dims[${n}] must be a non-negative integer, got: ${i}`);t*=i}return t},sf=(e,t)=>{switch(e.location){case"cpu":return new dt(e.type,e.data,t);case"cpu-pinned":return new dt({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new dt({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new dt({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new dt({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),ci=N(()=>{"use strict";Xp(),tf(),of(),uf(),dt=class{constructor(e,t,n){let i,o;if(rf(),"object"==typeof e&&"location"in e)switch(this.dataLocation=e.location,i=e.type,o=e.dims,e.location){case"cpu-pinned":{let t=Ar.get(i);if(!t)throw TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof t))throw TypeError(`buffer should be of type ${t.name}`);this.cpuData=e.data;break}case"texture":if("float32"!==i)throw TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case"gpu-buffer":if("float32"!==i&&"float16"!==i&&"int32"!==i&&"int64"!==i&&"uint32"!==i&&"uint8"!==i&&"bool"!==i&&"uint4"!==i&&"int4"!==i)throw TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case"ml-tensor":if("float32"!==i&&"float16"!==i&&"int32"!==i&&"int64"!==i&&"uint32"!==i&&"uint64"!==i&&"int8"!==i&&"uint8"!==i&&"bool"!==i&&"uint4"!==i&&"int4"!==i)throw TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,s;if("string"==typeof e)if(i=e,s=n,"string"===e){if(!Array.isArray(t))throw TypeError("A string tensor's data must be a string array.");a=t}else{let n=Ar.get(e);if(void 0===n)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if("float16"===e&&n===Uint16Array||"uint4"===e||"int4"===e)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${n.name} as data.`);a="uint64"===e||"int64"===e?n.from(t,BigInt):n.from(t)}else if(t instanceof n)a=t;else if(t instanceof Uint8ClampedArray)if("uint8"===e)a=Uint8Array.from(t);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===e&&t instanceof Uint16Array&&n!==Uint16Array)a=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw TypeError(`A ${i} tensor's data must be type of ${n}`)}else if(s=t,Array.isArray(e)){if(0===e.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let t=typeof e[0];if("string"===t)i="string",a=e;else if("boolean"===t)i="bool",a=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${t}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",a=Uint8Array.from(e);else{let t=_o.get(e.constructor);if(void 0===t)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=t,a=e}if(void 0===s)s=[a.length];else if(!Array.isArray(s))throw TypeError("A tensor's dims must be a number array");o=s,this.cpuData=a,this.dataLocation="cpu"}let a=af(o);if(this.cpuData&&a!==this.cpuData.length&&("uint4"!==i&&"int4"!==i||Math.ceil(a/2)!==this.cpuData.length))throw Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=o,this.size=a}static async fromImage(e,t){return Zp(e,t)}static fromTexture(e,t){return Jp(e,t)}static fromGpuBuffer(e,t){return Qp(e,t)}static fromMLTensor(e,t){return Yp(e,t)}static fromPinnedBuffer(e,t,n){return ef(e,t,n)}toDataURL(e){return jp(this,e)}toImageData(e){return Kp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return sf(this,e)}}}),ks=N(()=>{"use strict";ci(),St=dt}),Ns=N(()=>{"use strict";Cs(),di=(e,t)=>{(typeof it.trace>"u"?it.wasm.trace:it.trace)&&console.timeStamp(`${e}::ORT::${t}`)},lf=(e,t)=>{let n=Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let o=0;o<n.length;o++){if(i&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${n[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),di("CPU",i);return}n[o].includes("TRACE_FUNC")&&(i=!0)}},$t=e=>{(typeof it.trace>"u"?it.wasm.trace:it.trace)&&lf("BEGIN",e)},yt=e=>{(typeof it.trace>"u"?it.wasm.trace:it.trace)&&lf("END",e)},sr=e=>{(typeof it.trace>"u"?it.wasm.trace:it.trace)&&console.time(`ORT::${e}`)},ur=e=>{(typeof it.trace>"u"?it.wasm.trace:it.trace)&&console.timeEnd(`ORT::${e}`)}}),cf=N(()=>{"use strict";Es(),ks(),Ns(),pi=class e{constructor(e){this.handler=e}async run(e,t,n){$t(),sr("InferenceSession.run");let i={},o={};if("object"!=typeof e||null===e||e instanceof St||Array.isArray(e))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if("object"==typeof t){if(null===t)throw TypeError("Unexpected argument[1]: cannot be null.");if(t instanceof St)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(t)){if(0===t.length)throw TypeError("'fetches' cannot be an empty array.");for(let e of(a=!1,t)){if("string"!=typeof e)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(e))throw RangeError(`'fetches' contains invalid output name: ${e}.`);i[e]=null}if("object"==typeof n&&null!==n)o=n;else if("u">typeof n)throw TypeError("'options' must be an object.")}else{let e=!1,s=Object.getOwnPropertyNames(t);for(let n of this.outputNames)if(-1!==s.indexOf(n)){let o=t[n];(null===o||o instanceof St)&&(e=!0,a=!1,i[n]=o)}if(e){if("object"==typeof n&&null!==n)o=n;else if("u">typeof n)throw TypeError("'options' must be an object.")}else o=t}}else if("u">typeof t)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let t of this.inputNames)if(typeof e[t]>"u")throw Error(`input '${t}' is missing in 'feeds'.`);if(a)for(let e of this.outputNames)i[e]=null;let s=await this.handler.run(e,i,o),u={};for(let e in s)if(Object.hasOwnProperty.call(s,e)){let t=s[e];t instanceof St?u[e]=t:u[e]=new St(t.type,t.data,t.dims)}return ur("InferenceSession.run"),yt(),u}async release(){return this.handler.dispose()}static async create(t,n,i,o){$t(),sr("InferenceSession.create");let a,s={};if("string"==typeof t){if(a=t,"object"==typeof n&&null!==n)s=n;else if("u">typeof n)throw TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,"object"==typeof n&&null!==n)s=n;else if("u">typeof n)throw TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&t instanceof SharedArrayBuffer){let e=t,u=0,l=t.byteLength;if("object"==typeof n&&null!==n)s=n;else if("number"==typeof n){if(!Number.isSafeInteger(u=n))throw RangeError("'byteOffset' must be an integer.");if(u<0||u>=e.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${e.byteLength}).`);if(l=t.byteLength-u,"number"==typeof i){if(!Number.isSafeInteger(l=i))throw RangeError("'byteLength' must be an integer.");if(l<=0||u+l>e.byteLength)throw RangeError(`'byteLength' is out of range (0, ${e.byteLength-u}].`);if("object"==typeof o&&null!==o)s=o;else if("u">typeof o)throw TypeError("'options' must be an object.")}else if("u">typeof i)throw TypeError("'byteLength' must be a number.")}else if("u">typeof n)throw TypeError("'options' must be an object.");a=new Uint8Array(e,u,l)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await Vp(s),d=await u.createInferenceSessionHandler(a,l);return ur("InferenceSession.create"),yt(),new e(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),df=N(()=>{"use strict";cf(),sI=pi}),pf=N(()=>{}),ff=N(()=>{}),hf=N(()=>{}),mf=N(()=>{}),Ls={};Sr(Ls,{InferenceSession:()=>sI,TRACE:()=>di,TRACE_EVENT_BEGIN:()=>sr,TRACE_EVENT_END:()=>ur,TRACE_FUNC_BEGIN:()=>$t,TRACE_FUNC_END:()=>yt,Tensor:()=>St,env:()=>pe,registerBackend:()=>ar});var pt=N(()=>{"use strict";Gp(),qp(),df(),ks(),pf(),ff(),Ns(),hf(),mf()});function lr(e,t,n,i){if(void 0===t)return lI(e);if(void 0===n)fi(e,t,1);else if("number"==typeof n&&void 0===i)fi(e,t,n);else if("string"==typeof n&&void 0===i)fi(e,n,1,t);else if("string"==typeof n&&"number"==typeof i)fi(e,n,i,t);else throw TypeError("input is valid")}function lI(e){return{verbose:lr.verbose.bind(null,e),info:lr.info.bind(null,e),warning:lr.warning.bind(null,e),error:lr.error.bind(null,e),fatal:lr.fatal.bind(null,e)}}function fi(e,t,n,i){let o=wo[i||""]||wo[""];bf[e]<bf[o.minimalSeverity]||(o.logDateTime&&(t=`${new Date().toISOString()}|${t}`),o.logSourceLocation,uI[o.provider].log(e,t,i))}var Rs,zs,bf,uI,yf,wo,ze,mi,gi,bi,hi,Ct=N(()=>{"use strict";Rs=class{log(e,t,n){}},zs=class{log(e,t,n){console.log(`${this.color(e)} ${n?"\x1b[35m"+n+"\x1b[0m ":""}${t}`)}color(e){switch(e){case"verbose":return"\x1b[34;40mv\x1b[0m";case"info":return"\x1b[32mi\x1b[0m";case"warning":return"\x1b[30;43mw\x1b[0m";case"error":return"\x1b[31;40me\x1b[0m";case"fatal":return"\x1b[101mf\x1b[0m";default:throw Error(`unsupported severity: ${e}`)}}},bf={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},uI={none:new Rs,console:new zs},wo={"":yf={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1}},(e=>{function t(t,n){e("verbose",t,n)}function n(t,n){e("info",t,n)}function i(t,n){e("warning",t,n)}function o(t,n){e("error",t,n)}function a(t,n){e("fatal",t,n)}function s(e){wo={},u("",e||{})}function u(e,t){if("*"===e)s(t);else{let n=wo[e]||yf;wo[e]={provider:t.provider||n.provider,minimalSeverity:t.minimalSeverity||n.minimalSeverity,logDateTime:void 0===t.logDateTime?n.logDateTime:t.logDateTime,logSourceLocation:void 0===t.logSourceLocation?n.logSourceLocation:t.logSourceLocation}}}e.verbose=t,e.info=n,e.warning=i,e.error=o,e.fatal=a,e.reset=s,e.set=u,e.setWithEnv=function(e){let t={};e.logLevel&&(t.minimalSeverity=e.logLevel),u("",t)}})(lr||={}),ze=lr,mi=class{constructor(e,t,n,i,o,a){this.category=e,this.name=t,this.startTime=n,this.endCallback=i,this.timer=o,this.ctx=a}async end(){return this.endCallback(this)}async checkTimer(){if(void 0===this.ctx||void 0===this.timer)throw Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},gi=class{constructor(e,t,n,i){this.category=e,this.name=t,this.startTime=n,this.endTime=i}},bi=class{constructor(e,t,n){this._started=!1,this._flushPointer=0,this._started=!1,this._maxNumberEvents=void 0===e?1e4:e,this._flushBatchSize=void 0===t?10:t,this._flushIntervalInMilliseconds=void 0===n?5e3:n}static create(e){return void 0===e?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=hi(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,t,n,i){let o=this._started?this.begin(e,t,i):void 0,a=!1,s=n();if(s&&"function"==typeof s.then)return a=!0,new Promise((e,t)=>{s.then(async t=>{o&&await o.end(),e(t)},async e=>{o&&await o.end(),t(e)})});if(!a&&o){let e=o.end();if(e&&"function"==typeof e.then)return new Promise((t,n)=>{e.then(()=>{t(s)},e=>{n(e)})})}return s}begin(e,t,n){if(!this._started)throw Error("profiler is not started yet");if(void 0!==n)return new mi(e,t,0,async e=>this.end(e),n.beginTimer(),n);{let n=hi();return this.flush(n),new mi(e,t,n,e=>this.endSync(e))}}async end(e){let t=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new gi(e.category,e.name,e.startTime,t)),this.flush(t))}endSync(e){let t=hi();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new gi(e.category,e.name,e.startTime,t)),this.flush(t))}logOneEvent(e){ze.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let e=this._flushPointer;this._flushPointer<e+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=hi()}}get started(){return this._started}},hi="u">typeof performance&&performance.now?()=>performance.now():Date.now});function _f(e,t,n){for(let i of n){let n=i[0],o=i[1],a=i[2],s=i[3],u=i[4];if(e.opType===n){for(let e of t)if((e.domain===o||"ai.onnx"===e.domain&&""===o)&&cI(e.version,a))return{opImpl:s,opInit:u}}}throw TypeError(`cannot resolve operator '${e.opType}' with opsets: ${t.map(e=>`${e.domain||"ai.onnx"} v${e.version}`).join(", ")}`)}function cI(e,t){if(t.endsWith("+")){let n=Number.parseInt(t.substring(0,t.length-1),10);return!isNaN(n)&&n<=e}if(2!==t.split("-").length)return Number.parseInt(t,10)===e;{let n=t.split("-"),i=Number.parseInt(n[0],10),o=Number.parseInt(n[1],10);return!isNaN(i)&&!isNaN(o)&&i<=e&&e<=o}}var wf=N(()=>{}),vf=oe(e=>{"use strict";e.__esModule=!0,e.Guid=function(){function e(t){if(!t)throw TypeError("Invalid argument; `value` has no value.");this.value=e.EMPTY,t&&e.isGuid(t)&&(this.value=t)}return e.isGuid=function(t){var n=t.toString();return t&&(t instanceof e||e.validator.test(n))},e.create=function(){return new e([e.gen(2),e.gen(1),e.gen(1),e.gen(1),e.gen(3)].join("-"))},e.createEmpty=function(){return new e("emptyguid")},e.parse=function(t){return new e(t)},e.raw=function(){return[e.gen(2),e.gen(1),e.gen(1),e.gen(1),e.gen(3)].join("-")},e.gen=function(e){for(var t="",n=0;n<e;n++)t+=((1+Math.random())*65536|0).toString(16).substring(1);return t},e.prototype.equals=function(t){return e.isGuid(t)&&this.value===t.toString()},e.prototype.isEmpty=function(){return this.value===e.EMPTY},e.prototype.toString=function(){return this.value},e.prototype.toJSON=function(){return{value:this.value}},e.validator=RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),e.EMPTY="00000000-0000-0000-0000-000000000000",e}()});function He(e,t,n){this.low=0|e,this.high=0|t,this.unsigned=!!n}function mt(e){return(e&&e.__isLong__)===!0}function xf(e){var t=Math.clz32(e&-e);return e?31-t:t}function Or(e,t){var n,i,o;return t?(e>>>=0,(o=0<=e&&e<256)&&(i=If[e])?i:(n=ke(e,0,!0),o&&(If[e]=n),n)):(e|=0,(o=-128<=e&&e<128)&&(i=Tf[e])?i:(n=ke(e,e<0?-1:0,!1),o&&(Tf[e]=n),n))}function kt(e,t){if(isNaN(e))return t?Jn:Ut;if(t){if(e<0)return Jn;if(e>=Of)return Cf}else{if(e<=-$f)return _t;if(e+1>=$f)return Ef}return e<0?kt(-e,t).neg():ke(e%Jr|0,e/Jr|0,t)}function ke(e,t,n){return new He(e,t,n)}function Fs(e,t,n){if(0===e.length)throw Error("empty string");if("number"==typeof t?(n=t,t=!1):t=!!t,"NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return t?Jn:Ut;if((n=n||10)<2||36<n)throw RangeError("radix");if((i=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===i)return Fs(e.substring(1),t,n).neg();for(var i,o=kt(yi(n,8)),a=Ut,s=0;s<e.length;s+=8){var u=Math.min(8,e.length-s),l=parseInt(e.substring(s,s+u),n);if(u<8){var d=kt(yi(n,u));a=a.mul(d).add(kt(l))}else a=(a=a.mul(o)).add(kt(l))}return a.unsigned=t,a}function Wt(e,t){return"number"==typeof e?kt(e,t):"string"==typeof e?Fs(e,t):ke(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}var Dt,Tf,If,yi,Sf,pI,Jr,Of,$f,Af,Ut,Jn,Zr,Pf,Bs,Ef,Cf,_t,H,cr,u$,l$,Ci,Lt,c$,d$,p$,f$,h$,m$,g$,b$,tl,nl,y$,_$,w$,v$,rl,x$,T$,I$,S$,$$,A$,O$,P$,E$,C$,D$,k$,N$,Io,ol,L$,il,R$,Vs=N(()=>{Dt=null;try{Dt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}He.prototype.__isLong__,Object.defineProperty(He.prototype,"__isLong__",{value:!0}),He.isLong=mt,Tf={},If={},He.fromInt=Or,He.fromNumber=kt,He.fromBits=ke,yi=Math.pow,He.fromString=Fs,He.fromValue=Wt,pI=0x1000000,$f=(Of=(Jr=(Sf=65536)*Sf)*Jr)/2,Af=Or(pI),He.ZERO=Ut=Or(0),He.UZERO=Jn=Or(0,!0),He.ONE=Zr=Or(1),He.UONE=Pf=Or(1,!0),He.NEG_ONE=Bs=Or(-1),He.MAX_VALUE=Ef=ke(-1,0x7fffffff,!1),He.MAX_UNSIGNED_VALUE=Cf=ke(-1,-1,!0),He.MIN_VALUE=_t=ke(0,-0x80000000,!1),(H=He.prototype).toInt=function(){return this.unsigned?this.low>>>0:this.low},H.toNumber=function(){return this.unsigned?(this.high>>>0)*Jr+(this.low>>>0):this.high*Jr+(this.low>>>0)},H.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(!this.eq(_t))return"-"+this.neg().toString(e);else{var t=kt(e),n=this.div(t),i=n.mul(t).sub(this);return n.toString(e)+i.toInt().toString(e)}for(var o=kt(yi(e,6),this.unsigned),a=this,s="";;){var u=a.div(o),l=(a.sub(u.mul(o)).toInt()>>>0).toString(e);if((a=u).isZero())return l+s;for(;l.length<6;)l="0"+l;s=""+l+s}},H.getHighBits=function(){return this.high},H.getHighBitsUnsigned=function(){return this.high>>>0},H.getLowBits=function(){return this.low},H.getLowBitsUnsigned=function(){return this.low>>>0},H.getNumBitsAbs=function(){if(this.isNegative())return this.eq(_t)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return 0!=this.high?t+33:t+1},H.isZero=function(){return 0===this.high&&0===this.low},H.eqz=H.isZero,H.isNegative=function(){return!this.unsigned&&this.high<0},H.isPositive=function(){return this.unsigned||this.high>=0},H.isOdd=function(){return(1&this.low)==1},H.isEven=function(){return(1&this.low)==0},H.equals=function(e){return mt(e)||(e=Wt(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&this.high===e.high&&this.low===e.low},H.eq=H.equals,H.notEquals=function(e){return!this.eq(e)},H.neq=H.notEquals,H.ne=H.notEquals,H.lessThan=function(e){return 0>this.comp(e)},H.lt=H.lessThan,H.lessThanOrEqual=function(e){return 0>=this.comp(e)},H.lte=H.lessThanOrEqual,H.le=H.lessThanOrEqual,H.greaterThan=function(e){return this.comp(e)>0},H.gt=H.greaterThan,H.greaterThanOrEqual=function(e){return this.comp(e)>=0},H.gte=H.greaterThanOrEqual,H.ge=H.greaterThanOrEqual,H.compare=function(e){if(mt(e)||(e=Wt(e)),this.eq(e))return 0;var t=this.isNegative(),n=e.isNegative();return t&&!n?-1:!t&&n?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},H.comp=H.compare,H.negate=function(){return!this.unsigned&&this.eq(_t)?_t:this.not().add(Zr)},H.neg=H.negate,H.add=function(e){mt(e)||(e=Wt(e));var t,n,i=this.high>>>16,o=65535&this.high,a=this.low>>>16,s=65535&this.low,u=e.high>>>16,l=65535&e.high,d=e.low>>>16,p=65535&e.low,c=0,h=0;return n=0+((t=0+(s+p))>>>16),t&=65535,n+=a+d,h+=n>>>16,n&=65535,h+=o+l,c+=h>>>16,h&=65535,c+=i+u,ke(n<<16|t,(c&=65535)<<16|h,this.unsigned)},H.subtract=function(e){return mt(e)||(e=Wt(e)),this.add(e.neg())},H.sub=H.subtract,H.multiply=function(e){if(this.isZero())return this;if(mt(e)||(e=Wt(e)),Dt)return ke(Dt.mul(this.low,this.high,e.low,e.high),Dt.get_high(),this.unsigned);if(e.isZero())return this.unsigned?Jn:Ut;if(this.eq(_t))return e.isOdd()?_t:Ut;if(e.eq(_t))return this.isOdd()?_t:Ut;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Af)&&e.lt(Af))return kt(this.toNumber()*e.toNumber(),this.unsigned);var t,n,i=this.high>>>16,o=65535&this.high,a=this.low>>>16,s=65535&this.low,u=e.high>>>16,l=65535&e.high,d=e.low>>>16,p=65535&e.low,c=0,h=0;return n=0+((t=0+s*p)>>>16),t&=65535,n+=a*p,h+=n>>>16,n&=65535,n+=s*d,h+=n>>>16,n&=65535,h+=o*p,c+=h>>>16,h&=65535,h+=a*d,c+=h>>>16,h&=65535,h+=s*l,c+=h>>>16,h&=65535,c+=i*p+o*d+a*l+s*u,ke(n<<16|t,(c&=65535)<<16|h,this.unsigned)},H.mul=H.multiply,H.divide=function(e){if(mt(e)||(e=Wt(e)),e.isZero())throw Error("division by zero");if(Dt){var t,n,i;return this.unsigned||-0x80000000!==this.high||-1!==e.low||-1!==e.high?ke((this.unsigned?Dt.div_u:Dt.div_s)(this.low,this.high,e.low,e.high),Dt.get_high(),this.unsigned):this}if(this.isZero())return this.unsigned?Jn:Ut;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Jn;if(e.gt(this.shru(1)))return Pf;i=Jn}else{if(this.eq(_t))return e.eq(Zr)||e.eq(Bs)?_t:e.eq(_t)?Zr:(t=this.shr(1).div(e).shl(1)).eq(Ut)?e.isNegative()?Zr:Bs:(n=this.sub(e.mul(t)),i=t.add(n.div(e)));if(e.eq(_t))return this.unsigned?Jn:Ut;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=Ut}for(n=this;n.gte(e);){t=Math.max(1,Math.floor(n.toNumber()/e.toNumber()));for(var o=Math.ceil(Math.log(t)/Math.LN2),a=o<=48?1:yi(2,o-48),s=kt(t),u=s.mul(e);u.isNegative()||u.gt(n);)t-=a,u=(s=kt(t,this.unsigned)).mul(e);s.isZero()&&(s=Zr),i=i.add(s),n=n.sub(u)}return i},H.div=H.divide,H.modulo=function(e){return(mt(e)||(e=Wt(e)),Dt)?ke((this.unsigned?Dt.rem_u:Dt.rem_s)(this.low,this.high,e.low,e.high),Dt.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},H.mod=H.modulo,H.rem=H.modulo,H.not=function(){return ke(~this.low,~this.high,this.unsigned)},H.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},H.clz=H.countLeadingZeros,H.countTrailingZeros=function(){return this.low?xf(this.low):xf(this.high)+32},H.ctz=H.countTrailingZeros,H.and=function(e){return mt(e)||(e=Wt(e)),ke(this.low&e.low,this.high&e.high,this.unsigned)},H.or=function(e){return mt(e)||(e=Wt(e)),ke(this.low|e.low,this.high|e.high,this.unsigned)},H.xor=function(e){return mt(e)||(e=Wt(e)),ke(this.low^e.low,this.high^e.high,this.unsigned)},H.shiftLeft=function(e){return mt(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?ke(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):ke(0,this.low<<e-32,this.unsigned)},H.shl=H.shiftLeft,H.shiftRight=function(e){return mt(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?ke(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):ke(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},H.shr=H.shiftRight,H.shiftRightUnsigned=function(e){return mt(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?ke(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):32===e?ke(this.high,0,this.unsigned):ke(this.high>>>e-32,0,this.unsigned)},H.shru=H.shiftRightUnsigned,H.shr_u=H.shiftRightUnsigned,H.rotateLeft=function(e){var t;return mt(e)&&(e=e.toInt()),0==(e&=63)?this:32===e?ke(this.high,this.low,this.unsigned):e<32?(t=32-e,ke(this.low<<e|this.high>>>t,this.high<<e|this.low>>>t,this.unsigned)):(e-=32,t=32-e,ke(this.high<<e|this.low>>>t,this.low<<e|this.high>>>t,this.unsigned))},H.rotl=H.rotateLeft,H.rotateRight=function(e){var t;return mt(e)&&(e=e.toInt()),0==(e&=63)?this:32===e?ke(this.high,this.low,this.unsigned):e<32?(t=32-e,ke(this.high<<t|this.low>>>e,this.low<<t|this.high>>>e,this.unsigned)):(e-=32,t=32-e,ke(this.low<<t|this.high>>>e,this.high<<t|this.low>>>e,this.unsigned))},H.rotr=H.rotateRight,H.toSigned=function(){return this.unsigned?ke(this.low,this.high,!1):this},H.toUnsigned=function(){return this.unsigned?this:ke(this.low,this.high,!0)},H.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},H.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},H.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},He.fromBytes=function(e,t,n){return n?He.fromBytesLE(e,t):He.fromBytesBE(e,t)},He.fromBytesLE=function(e,t){return new He(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},He.fromBytesBE=function(e,t){return new He(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)},cr=He}),Gs=oe(e=>{"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.ArgType=void 0,function(e){e[e.INPUT=0]="INPUT",e[e.OUTPUT=1]="OUTPUT"}(t||(e.ArgType=t={}))}),Pr=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0,e.SIZEOF_SHORT=2,e.SIZEOF_INT=4,e.FILE_IDENTIFIER_LENGTH=4,e.SIZE_PREFIX_LENGTH=4}),Us=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isLittleEndian=e.float64=e.float32=e.int32=void 0,e.int32=new Int32Array(2),e.float32=new Float32Array(e.int32.buffer),e.float64=new Float64Array(e.int32.buffer),e.isLittleEndian=1===new Uint16Array(new Uint8Array([1,0]).buffer)[0]}),Ws=oe(e=>{"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.Encoding=void 0,function(e){e[e.UTF8_BYTES=1]="UTF8_BYTES",e[e.UTF16_STRING=2]="UTF16_STRING"}(t||(e.Encoding=t={}))}),qs=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=void 0;var t=Pr(),n=Us(),i=Ws();e.ByteBuffer=class e{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(t){return new e(new Uint8Array(t))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return n.int32[0]=this.readInt32(e),n.float32[0]}readFloat64(e){return n.int32[+!n.isLittleEndian]=this.readInt32(e),n.int32[+!!n.isLittleEndian]=this.readInt32(e+4),n.float64[0]}writeInt8(e,t){this.bytes_[e]=t}writeUint8(e,t){this.bytes_[e]=t}writeInt16(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8}writeUint16(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8}writeInt32(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8,this.bytes_[e+2]=t>>16,this.bytes_[e+3]=t>>24}writeUint32(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8,this.bytes_[e+2]=t>>16,this.bytes_[e+3]=t>>24}writeInt64(e,t){this.writeInt32(e,Number(BigInt.asIntN(32,t))),this.writeInt32(e+4,Number(BigInt.asIntN(32,t>>BigInt(32))))}writeUint64(e,t){this.writeUint32(e,Number(BigInt.asUintN(32,t))),this.writeUint32(e+4,Number(BigInt.asUintN(32,t>>BigInt(32))))}writeFloat32(e,t){n.float32[0]=t,this.writeInt32(e,n.int32[0])}writeFloat64(e,t){n.float64[0]=t,this.writeInt32(e,n.int32[+!n.isLittleEndian]),this.writeInt32(e+4,n.int32[+!!n.isLittleEndian])}getBufferIdentifier(){if(this.bytes_.length<this.position_+t.SIZEOF_INT+t.FILE_IDENTIFIER_LENGTH)throw Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let n=0;n<t.FILE_IDENTIFIER_LENGTH;n++)e+=String.fromCharCode(this.readInt8(this.position_+t.SIZEOF_INT+n));return e}__offset(e,t){let n=e-this.readInt32(e);return t<this.readInt16(n)?this.readInt16(n+t):0}__union(e,t){return e.bb_pos=t+this.readInt32(t),e.bb=this,e}__string(e,n){e+=this.readInt32(e);let o=this.readInt32(e);e+=t.SIZEOF_INT;let a=this.bytes_.subarray(e,e+o);return n===i.Encoding.UTF8_BYTES?a:this.text_decoder_.decode(a)}__union_with_string(e,t){return"string"==typeof e?this.__string(t):this.__union(e,t)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+t.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=t.FILE_IDENTIFIER_LENGTH)throw Error("FlatBuffers: file identifier must be length "+t.FILE_IDENTIFIER_LENGTH);for(let n=0;n<t.FILE_IDENTIFIER_LENGTH;n++)if(e.charCodeAt(n)!=this.readInt8(this.position()+t.SIZEOF_INT+n))return!1;return!0}createScalarList(e,t){let n=[];for(let i=0;i<t;++i){let t=e(i);null!==t&&n.push(t)}return n}createObjList(e,t){let n=[];for(let i=0;i<t;++i){let t=e(i);null!==t&&n.push(t.unpack())}return n}}}),Lf=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Builder=void 0;var t=qs(),n=Pr();e.Builder=class e{constructor(e){let n;this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder,n=e||1024,this.bb=t.ByteBuffer.allocate(n),this.space=n}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(t,n){t>this.minalign&&(this.minalign=t);let i=~(this.bb.capacity()-this.space+n)+1&t-1;for(;this.space<i+t+n;){let t=this.bb.capacity();this.bb=e.growByteBuffer(this.bb),this.space+=this.bb.capacity()-t}this.pad(i)}pad(e){for(let t=0;t<e;t++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,t,n){(this.force_defaults||t!=n)&&(this.addInt8(t),this.slot(e))}addFieldInt16(e,t,n){(this.force_defaults||t!=n)&&(this.addInt16(t),this.slot(e))}addFieldInt32(e,t,n){(this.force_defaults||t!=n)&&(this.addInt32(t),this.slot(e))}addFieldInt64(e,t,n){(this.force_defaults||t!==n)&&(this.addInt64(t),this.slot(e))}addFieldFloat32(e,t,n){(this.force_defaults||t!=n)&&(this.addFloat32(t),this.slot(e))}addFieldFloat64(e,t,n){(this.force_defaults||t!=n)&&(this.addFloat64(t),this.slot(e))}addFieldOffset(e,t,n){(this.force_defaults||t!=n)&&(this.addOffset(t),this.slot(e))}addFieldStruct(e,t,n){t!=n&&(this.nested(t),this.slot(e))}nested(e){if(e!=this.offset())throw TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){null!==this.vtable&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let n=e.capacity();if(0xc0000000&n)throw Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let i=n<<1,o=t.ByteBuffer.allocate(i);return o.setPosition(i-n),o.bytes().set(e.bytes(),i-n),o}addOffset(e){this.prep(n.SIZEOF_INT,0),this.writeInt32(this.offset()-e+n.SIZEOF_INT)}startObject(e){this.notNested(),null==this.vtable&&(this.vtable=[]),this.vtable_in_use=e;for(let t=0;t<e;t++)this.vtable[t]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(null==this.vtable||!this.isNested)throw Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),t=this.vtable_in_use-1;for(;t>=0&&0==this.vtable[t];t--);let i=t+1;for(;t>=0;t--)this.addInt16(0!=this.vtable[t]?e-this.vtable[t]:0);let o=2;this.addInt16(e-this.object_start);let a=(i+o)*n.SIZEOF_SHORT;this.addInt16(a);let s=0,u=this.space;e:for(t=0;t<this.vtables.length;t++){let e=this.bb.capacity()-this.vtables[t];if(a==this.bb.readInt16(e)){for(let t=n.SIZEOF_SHORT;t<a;t+=n.SIZEOF_SHORT)if(this.bb.readInt16(u+t)!=this.bb.readInt16(e+t))continue e;s=this.vtables[t];break}}return s?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,s-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,t,i){let o=i?n.SIZE_PREFIX_LENGTH:0;if(t){let e=t;if(this.prep(this.minalign,n.SIZEOF_INT+n.FILE_IDENTIFIER_LENGTH+o),e.length!=n.FILE_IDENTIFIER_LENGTH)throw TypeError("FlatBuffers: file identifier must be length "+n.FILE_IDENTIFIER_LENGTH);for(let t=n.FILE_IDENTIFIER_LENGTH-1;t>=0;t--)this.writeInt8(e.charCodeAt(t))}this.prep(this.minalign,n.SIZEOF_INT+o),this.addOffset(e),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,t){this.finish(e,t,!0)}requiredField(e,t){let n=this.bb.capacity()-e,i=n-this.bb.readInt32(n);if(!(t<this.bb.readInt16(i)&&0!=this.bb.readInt16(i+t)))throw TypeError("FlatBuffers: field "+t+" must be set")}startVector(e,t,i){this.notNested(),this.vector_num_elems=t,this.prep(n.SIZEOF_INT,e*t),this.prep(i,e*t)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let t=this.createString(e);return this.string_maps.set(e,t),t}createString(e){let t;return null==e?0:(t=e instanceof Uint8Array?e:this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,t.length,1),this.bb.setPosition(this.space-=t.length),this.bb.bytes().set(t,this.space),this.endVector())}createByteVector(e){return null==e?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return null===e?0:"string"==typeof e?this.createString(e):e.pack(this)}createObjectOffsetList(e){let t=[];for(let n=0;n<e.length;++n){let i=e[n];if(null!==i)t.push(this.createObjectOffset(i));else throw TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return t}createStructOffsetList(e,t){return t(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}}}),Ne=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=e.Builder=e.Encoding=e.isLittleEndian=e.float64=e.float32=e.int32=e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0;var t=Pr();Object.defineProperty(e,"SIZEOF_SHORT",{enumerable:!0,get:function(){return t.SIZEOF_SHORT}});var n=Pr();Object.defineProperty(e,"SIZEOF_INT",{enumerable:!0,get:function(){return n.SIZEOF_INT}});var i=Pr();Object.defineProperty(e,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return i.FILE_IDENTIFIER_LENGTH}});var o=Pr();Object.defineProperty(e,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return o.SIZE_PREFIX_LENGTH}});var a=Us();Object.defineProperty(e,"int32",{enumerable:!0,get:function(){return a.int32}}),Object.defineProperty(e,"float32",{enumerable:!0,get:function(){return a.float32}}),Object.defineProperty(e,"float64",{enumerable:!0,get:function(){return a.float64}}),Object.defineProperty(e,"isLittleEndian",{enumerable:!0,get:function(){return a.isLittleEndian}});var s=Ws();Object.defineProperty(e,"Encoding",{enumerable:!0,get:function(){return s.Encoding}});var u=Lf();Object.defineProperty(e,"Builder",{enumerable:!0,get:function(){return u.Builder}});var l=qs();Object.defineProperty(e,"ByteBuffer",{enumerable:!0,get:function(){return l.ByteBuffer}})}),Xs=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.ArgTypeAndIndex=void 0;var o=i(Ne()),a=Gs();e.ArgTypeAndIndex=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsArgTypeAndIndex(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsArgTypeAndIndex(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):a.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,t){e.addFieldInt8(0,t,a.ArgType.INPUT)}static addIndex(e,t){e.addFieldInt32(1,t,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(t,n,i){return e.startArgTypeAndIndex(t),e.addArgType(t,n),e.addIndex(t,i),e.endArgTypeAndIndex(t)}}}),Zs=oe(e=>{"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeType=void 0,function(e){e[e.UNDEFINED=0]="UNDEFINED",e[e.FLOAT=1]="FLOAT",e[e.INT=2]="INT",e[e.STRING=3]="STRING",e[e.TENSOR=4]="TENSOR",e[e.GRAPH=5]="GRAPH",e[e.FLOATS=6]="FLOATS",e[e.INTS=7]="INTS",e[e.STRINGS=8]="STRINGS",e[e.TENSORS=9]="TENSORS",e[e.GRAPHS=10]="GRAPHS",e[e.SPARSE_TENSOR=11]="SPARSE_TENSOR",e[e.SPARSE_TENSORS=12]="SPARSE_TENSORS"}(t||(e.AttributeType=t={}))}),Js=oe(e=>{"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.NodeType=void 0,function(e){e[e.Primitive=0]="Primitive",e[e.Fused=1]="Fused"}(t||(e.NodeType=t={}))}),Ys=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Node=void 0;var o=i(Ne()),a=eu(),s=Js();e.Node=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNode(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNode(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}domain(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb_pos+t,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):s.NodeType.Primitive}executionProviderType(e){let t=this.bb.__offset(this.bb_pos,18);return t?this.bb.__string(this.bb_pos+t,e):null}inputs(e,t){let n=this.bb.__offset(this.bb_pos,20);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,t){let n=this.bb.__offset(this.bb_pos,22);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,t){let n=this.bb.__offset(this.bb_pos,24);return n?(t||new a.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readInt32(this.bb.__vector(this.bb_pos+t)+4*e):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,t){let n=this.bb.__offset(this.bb_pos,28);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addDomain(e,t){e.addFieldOffset(2,t,0)}static addSinceVersion(e,t){e.addFieldInt32(3,t,0)}static addIndex(e,t){e.addFieldInt32(4,t,0)}static addOpType(e,t){e.addFieldOffset(5,t,0)}static addType(e,t){e.addFieldInt32(6,t,s.NodeType.Primitive)}static addExecutionProviderType(e,t){e.addFieldOffset(7,t,0)}static addInputs(e,t){e.addFieldOffset(8,t,0)}static createInputsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startInputsVector(e,t){e.startVector(4,t,4)}static addOutputs(e,t){e.addFieldOffset(9,t,0)}static createOutputsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startOutputsVector(e,t){e.startVector(4,t,4)}static addAttributes(e,t){e.addFieldOffset(10,t,0)}static createAttributesVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startAttributesVector(e,t){e.startVector(4,t,4)}static addInputArgCounts(e,t){e.addFieldOffset(11,t,0)}static createInputArgCountsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addInt32(t[n]);return e.endVector()}static startInputArgCountsVector(e,t){e.startVector(4,t,4)}static addImplicitInputs(e,t){e.addFieldOffset(12,t,0)}static createImplicitInputsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startImplicitInputsVector(e,t){e.startVector(4,t,4)}static endNode(e){return e.endObject()}static createNode(t,n,i,o,a,s,u,l,d,p,c,h,f,m){return e.startNode(t),e.addName(t,n),e.addDocString(t,i),e.addDomain(t,o),e.addSinceVersion(t,a),e.addIndex(t,s),e.addOpType(t,u),e.addType(t,l),e.addExecutionProviderType(t,d),e.addInputs(t,p),e.addOutputs(t,c),e.addAttributes(t,h),e.addInputArgCounts(t,f),e.addImplicitInputs(t,m),e.endNode(t)}}}),nu=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.EdgeEnd=void 0,e.EdgeEnd=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,t,n,i){return e.prep(4,12),e.writeInt32(i),e.writeInt32(n),e.writeInt32(t),e.offset()}}}),ou=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.NodeEdge=void 0;var o=i(Ne()),a=nu();e.NodeEdge=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNodeEdge(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNodeEdge(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new a.EdgeEnd).__init(this.bb.__vector(this.bb_pos+n)+12*e,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,t){let n=this.bb.__offset(this.bb_pos,8);return n?(t||new a.EdgeEnd).__init(this.bb.__vector(this.bb_pos+n)+12*e,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,t){e.addFieldInt32(0,t,0)}static addInputEdges(e,t){e.addFieldOffset(1,t,0)}static startInputEdgesVector(e,t){e.startVector(12,t,4)}static addOutputEdges(e,t){e.addFieldOffset(2,t,0)}static startOutputEdgesVector(e,t){e.startVector(12,t,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(t,n,i,o){return e.startNodeEdge(t),e.addNodeIndex(t,n),e.addInputEdges(t,i),e.addOutputEdges(t,o),e.endNodeEdge(t)}}}),au=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.NodesToOptimizeIndices=void 0;var o=i(Ne());e.NodesToOptimizeIndices=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNodesToOptimizeIndices(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNodesToOptimizeIndices(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndices(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb.__vector(this.bb_pos+t)+4*e):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return!!e&&!!this.bb.readInt8(this.bb_pos+e)}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return!!e&&!!this.bb.readInt8(this.bb_pos+e)}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,t){e.addFieldOffset(0,t,0)}static createNodeIndicesVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addInt32(t[n]);return e.endVector()}static startNodeIndicesVector(e,t){e.startVector(4,t,4)}static addNumInputs(e,t){e.addFieldInt32(1,t,0)}static addNumOutputs(e,t){e.addFieldInt32(2,t,0)}static addHasVariadicInput(e,t){e.addFieldInt8(3,+t,0)}static addHasVariadicOutput(e,t){e.addFieldInt8(4,+t,0)}static addNumVariadicInputs(e,t){e.addFieldInt32(5,t,0)}static addNumVariadicOutputs(e,t){e.addFieldInt32(6,t,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(t,n,i,o,a,s,u,l){return e.startNodesToOptimizeIndices(t),e.addNodeIndices(t,n),e.addNumInputs(t,i),e.addNumOutputs(t,o),e.addHasVariadicInput(t,a),e.addHasVariadicOutput(t,s),e.addNumVariadicInputs(t,u),e.addNumVariadicOutputs(t,l),e.endNodesToOptimizeIndices(t)}}}),uu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecord=void 0;var o=i(Ne()),a=au();e.RuntimeOptimizationRecord=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizationRecord(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizationRecord(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}actionId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}nodesToOptimizeIndices(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new a.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}producedOpIds(e,t){let n=this.bb.__offset(this.bb_pos,10);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,t){e.addFieldOffset(0,t,0)}static addNodesToOptimizeIndices(e,t){e.addFieldOffset(1,t,0)}static addProducedOpIds(e,t){e.addFieldOffset(3,t,0)}static createProducedOpIdsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startProducedOpIdsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}}}),cu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecordContainerEntry=void 0;var o=i(Ne()),a=uu();e.RuntimeOptimizationRecordContainerEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizationRecordContainerEntry(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}optimizerName(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}runtimeOptimizationRecords(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new a.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,t){e.addFieldOffset(0,t,0)}static addRuntimeOptimizationRecords(e,t){e.addFieldOffset(1,t,0)}static createRuntimeOptimizationRecordsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizationRecordContainerEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createRuntimeOptimizationRecordContainerEntry(t,n,i){return e.startRuntimeOptimizationRecordContainerEntry(t),e.addOptimizerName(t,n),e.addRuntimeOptimizationRecords(t,i),e.endRuntimeOptimizationRecordContainerEntry(t)}}}),pu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizations=void 0;var o=i(Ne()),a=cu();e.RuntimeOptimizations=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizations(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizations(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}records(e,t){let n=this.bb.__offset(this.bb_pos,4);return n?(t||new a.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,t){e.addFieldOffset(0,t,0)}static createRecordsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startRecordsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(t,n){return e.startRuntimeOptimizations(t),e.addRecords(t,n),e.endRuntimeOptimizations(t)}}}),vo=oe(e=>{"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.TensorDataType=void 0,function(e){e[e.UNDEFINED=0]="UNDEFINED",e[e.FLOAT=1]="FLOAT",e[e.UINT8=2]="UINT8",e[e.INT8=3]="INT8",e[e.UINT16=4]="UINT16",e[e.INT16=5]="INT16",e[e.INT32=6]="INT32",e[e.INT64=7]="INT64",e[e.STRING=8]="STRING",e[e.BOOL=9]="BOOL",e[e.FLOAT16=10]="FLOAT16",e[e.DOUBLE=11]="DOUBLE",e[e.UINT32=12]="UINT32",e[e.UINT64=13]="UINT64",e[e.COMPLEX64=14]="COMPLEX64",e[e.COMPLEX128=15]="COMPLEX128",e[e.BFLOAT16=16]="BFLOAT16",e[e.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",e[e.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",e[e.FLOAT8E5M2=19]="FLOAT8E5M2",e[e.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"}(t||(e.TensorDataType=t={}))}),xo=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Tensor=void 0;var o=i(Ne()),a=vo();e.Tensor=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTensor(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTensor(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}dims(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):a.TensorDataType.UNDEFINED}rawData(e){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readUint8(this.bb.__vector(this.bb_pos+t)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,t){let n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addDims(e,t){e.addFieldOffset(2,t,0)}static createDimsVector(e,t){e.startVector(8,t.length,8);for(let n=t.length-1;n>=0;n--)e.addInt64(t[n]);return e.endVector()}static startDimsVector(e,t){e.startVector(8,t,8)}static addDataType(e,t){e.addFieldInt32(3,t,a.TensorDataType.UNDEFINED)}static addRawData(e,t){e.addFieldOffset(4,t,0)}static createRawDataVector(e,t){e.startVector(1,t.length,1);for(let n=t.length-1;n>=0;n--)e.addInt8(t[n]);return e.endVector()}static startRawDataVector(e,t){e.startVector(1,t,1)}static addStringData(e,t){e.addFieldOffset(5,t,0)}static createStringDataVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startStringDataVector(e,t){e.startVector(4,t,4)}static addExternalDataOffset(e,t){e.addFieldInt64(6,t,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(t,n,i,o,a,s,u,l){return e.startTensor(t),e.addName(t,n),e.addDocString(t,i),e.addDims(t,o),e.addDataType(t,a),e.addRawData(t,s),e.addStringData(t,u),e.addExternalDataOffset(t,l),e.endTensor(t)}}}),mu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.SparseTensor=void 0;var o=i(Ne()),a=xo();e.SparseTensor=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsSparseTensor(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsSparseTensor(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}values(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new a.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}indices(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new a.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}dims(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,t){e.addFieldOffset(0,t,0)}static addIndices(e,t){e.addFieldOffset(1,t,0)}static addDims(e,t){e.addFieldOffset(2,t,0)}static createDimsVector(e,t){e.startVector(8,t.length,8);for(let n=t.length-1;n>=0;n--)e.addInt64(t[n]);return e.endVector()}static startDimsVector(e,t){e.startVector(8,t,8)}static endSparseTensor(e){return e.endObject()}}}),bu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.MapType=void 0;var o=i(Ne()),a=vo(),s=To();e.MapType=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsMapType(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsMapType(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):a.TensorDataType.UNDEFINED}valueType(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new s.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,t){e.addFieldInt32(0,t,a.TensorDataType.UNDEFINED)}static addValueType(e,t){e.addFieldOffset(1,t,0)}static endMapType(e){return e.endObject()}}}),_u=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.SequenceType=void 0;var o=i(Ne()),a=To();e.SequenceType=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsSequenceType(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsSequenceType(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}elemType(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new a.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,t){e.addFieldOffset(0,t,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(t,n){return e.startSequenceType(t),e.addElemType(t,n),e.endSequenceType(t)}}}),wu=oe(e=>{"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValueType=void 0,function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.VALUE=1]="VALUE",e[e.PARAM=2]="PARAM"}(t||(e.DimensionValueType=t={}))}),xu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValue=void 0;var o=i(Ne()),a=wu();e.DimensionValue=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDimensionValue(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDimensionValue(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):a.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,t){e.addFieldInt8(0,t,a.DimensionValueType.UNKNOWN)}static addDimValue(e,t){e.addFieldInt64(1,t,BigInt("0"))}static addDimParam(e,t){e.addFieldOffset(2,t,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(t,n,i,o){return e.startDimensionValue(t),e.addDimType(t,n),e.addDimValue(t,i),e.addDimParam(t,o),e.endDimensionValue(t)}}}),Iu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Dimension=void 0;var o=i(Ne()),a=xu();e.Dimension=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDimension(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDimension(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}value(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new a.DimensionValue).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}denotation(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}static startDimension(e){e.startObject(2)}static addValue(e,t){e.addFieldOffset(0,t,0)}static addDenotation(e,t){e.addFieldOffset(1,t,0)}static endDimension(e){return e.endObject()}static createDimension(t,n,i){return e.startDimension(t),e.addValue(t,n),e.addDenotation(t,i),e.endDimension(t)}}}),$u=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Shape=void 0;var o=i(Ne()),a=Iu();e.Shape=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsShape(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsShape(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}dim(e,t){let n=this.bb.__offset(this.bb_pos,4);return n?(t||new a.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,t){e.addFieldOffset(0,t,0)}static createDimVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startDimVector(e,t){e.startVector(4,t,4)}static endShape(e){return e.endObject()}static createShape(t,n){return e.startShape(t),e.addDim(t,n),e.endShape(t)}}}),Ou=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.TensorTypeAndShape=void 0;var o=i(Ne()),a=$u(),s=vo();e.TensorTypeAndShape=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTensorTypeAndShape(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTensorTypeAndShape(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):s.TensorDataType.UNDEFINED}shape(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new a.Shape).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,t){e.addFieldInt32(0,t,s.TensorDataType.UNDEFINED)}static addShape(e,t){e.addFieldOffset(1,t,0)}static endTensorTypeAndShape(e){return e.endObject()}}}),Pu=oe(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.unionListToTypeInfoValue=e.unionToTypeInfoValue=e.TypeInfoValue=void 0;var t,n=bu(),i=_u(),o=Ou();!function(e){e[e.NONE=0]="NONE",e[e.tensor_type=1]="tensor_type",e[e.sequence_type=2]="sequence_type",e[e.map_type=3]="map_type"}(t||(e.TypeInfoValue=t={})),e.unionToTypeInfoValue=function(e,a){switch(t[e]){case"NONE":default:return null;case"tensor_type":return a(new o.TensorTypeAndShape);case"sequence_type":return a(new i.SequenceType);case"map_type":return a(new n.MapType)}},e.unionListToTypeInfoValue=function(e,a,s){switch(t[e]){case"NONE":default:return null;case"tensor_type":return a(s,new o.TensorTypeAndShape);case"sequence_type":return a(s,new i.SequenceType);case"map_type":return a(s,new n.MapType)}}}),To=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.TypeInfo=void 0;var o=i(Ne()),a=Pu();e.TypeInfo=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTypeInfo(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTypeInfo(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}denotation(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):a.TypeInfoValue.NONE}value(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__union(e,this.bb_pos+t):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,t){e.addFieldOffset(0,t,0)}static addValueType(e,t){e.addFieldInt8(1,t,a.TypeInfoValue.NONE)}static addValue(e,t){e.addFieldOffset(2,t,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(t,n,i,o){return e.startTypeInfo(t),e.addDenotation(t,n),e.addValueType(t,i),e.addValue(t,o),e.endTypeInfo(t)}}}),Du=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.ValueInfo=void 0;var o=i(Ne()),a=To();e.ValueInfo=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsValueInfo(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsValueInfo(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}type(e){let t=this.bb.__offset(this.bb_pos,8);return t?(e||new a.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addType(e,t){e.addFieldOffset(2,t,0)}static endValueInfo(e){return e.endObject()}}}),Ei=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Graph=void 0;var o=i(Ne()),a=Ys(),s=ou(),u=pu(),l=mu(),d=xo(),p=Du();e.Graph=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsGraph(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsGraph(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}initializers(e,t){let n=this.bb.__offset(this.bb_pos,4);return n?(t||new d.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new p.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,t){let n=this.bb.__offset(this.bb_pos,8);return n?(t||new a.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,t){let n=this.bb.__offset(this.bb_pos,12);return n?(t||new s.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,t){let n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,t){let n=this.bb.__offset(this.bb_pos,16);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,t){let n=this.bb.__offset(this.bb_pos,18);return n?(t||new l.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let t=this.bb.__offset(this.bb_pos,20);return t?(e||new u.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,t){e.addFieldOffset(0,t,0)}static createInitializersVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startInitializersVector(e,t){e.startVector(4,t,4)}static addNodeArgs(e,t){e.addFieldOffset(1,t,0)}static createNodeArgsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startNodeArgsVector(e,t){e.startVector(4,t,4)}static addNodes(e,t){e.addFieldOffset(2,t,0)}static createNodesVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startNodesVector(e,t){e.startVector(4,t,4)}static addMaxNodeIndex(e,t){e.addFieldInt32(3,t,0)}static addNodeEdges(e,t){e.addFieldOffset(4,t,0)}static createNodeEdgesVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startNodeEdgesVector(e,t){e.startVector(4,t,4)}static addInputs(e,t){e.addFieldOffset(5,t,0)}static createInputsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startInputsVector(e,t){e.startVector(4,t,4)}static addOutputs(e,t){e.addFieldOffset(6,t,0)}static createOutputsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startOutputsVector(e,t){e.startVector(4,t,4)}static addSparseInitializers(e,t){e.addFieldOffset(7,t,0)}static createSparseInitializersVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startSparseInitializersVector(e,t){e.startVector(4,t,4)}static addRuntimeOptimizations(e,t){e.addFieldOffset(8,t,0)}static endGraph(e){return e.endObject()}}}),eu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Attribute=void 0;var o=i(Ne()),a=Zs(),s=Ei(),u=xo();e.Attribute=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsAttribute(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsAttribute(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):a.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb_pos+t,e):null}t(e){let t=this.bb.__offset(this.bb_pos,16);return t?(e||new u.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}g(e){let t=this.bb.__offset(this.bb_pos,18);return t?(e||new s.Graph).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}floats(e){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readFloat32(this.bb.__vector(this.bb_pos+t)+4*e):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,t){let n=this.bb.__offset(this.bb_pos,24);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,t){let n=this.bb.__offset(this.bb_pos,26);return n?(t||new u.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,t){let n=this.bb.__offset(this.bb_pos,28);return n?(t||new s.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addType(e,t){e.addFieldInt32(2,t,a.AttributeType.UNDEFINED)}static addF(e,t){e.addFieldFloat32(3,t,0)}static addI(e,t){e.addFieldInt64(4,t,BigInt("0"))}static addS(e,t){e.addFieldOffset(5,t,0)}static addT(e,t){e.addFieldOffset(6,t,0)}static addG(e,t){e.addFieldOffset(7,t,0)}static addFloats(e,t){e.addFieldOffset(8,t,0)}static createFloatsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addFloat32(t[n]);return e.endVector()}static startFloatsVector(e,t){e.startVector(4,t,4)}static addInts(e,t){e.addFieldOffset(9,t,0)}static createIntsVector(e,t){e.startVector(8,t.length,8);for(let n=t.length-1;n>=0;n--)e.addInt64(t[n]);return e.endVector()}static startIntsVector(e,t){e.startVector(8,t,8)}static addStrings(e,t){e.addFieldOffset(10,t,0)}static createStringsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startStringsVector(e,t){e.startVector(4,t,4)}static addTensors(e,t){e.addFieldOffset(11,t,0)}static createTensorsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startTensorsVector(e,t){e.startVector(4,t,4)}static addGraphs(e,t){e.addFieldOffset(12,t,0)}static createGraphsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startGraphsVector(e,t){e.startVector(4,t,4)}static endAttribute(e){return e.endObject()}}}),Ru=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedKernelCreateInfos=void 0;var o=i(Ne());e.DeprecatedKernelCreateInfos=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedKernelCreateInfos(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndices(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb.__vector(this.bb_pos+t)+4*e):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,t){e.addFieldOffset(0,t,0)}static createNodeIndicesVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addInt32(t[n]);return e.endVector()}static startNodeIndicesVector(e,t){e.startVector(4,t,4)}static addKernelDefHashes(e,t){e.addFieldOffset(1,t,0)}static createKernelDefHashesVector(e,t){e.startVector(8,t.length,8);for(let n=t.length-1;n>=0;n--)e.addInt64(t[n]);return e.endVector()}static startKernelDefHashesVector(e,t){e.startVector(8,t,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(t,n,i){return e.startDeprecatedKernelCreateInfos(t),e.addNodeIndices(t,n),e.addKernelDefHashes(t,i),e.endDeprecatedKernelCreateInfos(t)}}}),th=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedNodeIndexAndKernelDefHash=void 0;var o=i(Ne());e.DeprecatedNodeIndexAndKernelDefHash=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,t){e.addFieldInt32(0,t,0)}static addKernelDefHash(e,t){e.addFieldInt64(1,t,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(t,n,i){return e.startDeprecatedNodeIndexAndKernelDefHash(t),e.addNodeIndex(t,n),e.addKernelDefHash(t,i),e.endDeprecatedNodeIndexAndKernelDefHash(t)}}}),Bu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSubGraphSessionState=void 0;var o=i(Ne()),a=Fu();e.DeprecatedSubGraphSessionState=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedSubGraphSessionState(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}graphId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}sessionState(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new a.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,t){e.addFieldOffset(0,t,0)}static addSessionState(e,t){e.addFieldOffset(1,t,0)}static endDeprecatedSubGraphSessionState(e){let t=e.endObject();return e.requiredField(t,4),t}}}),Fu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSessionState=void 0;var o=i(Ne()),a=Ru(),s=Bu();e.DeprecatedSessionState=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedSessionState(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedSessionState(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}kernels(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new a.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}subGraphSessionStates(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new s.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,t){e.addFieldOffset(0,t,0)}static addSubGraphSessionStates(e,t){e.addFieldOffset(1,t,0)}static createSubGraphSessionStatesVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startSubGraphSessionStatesVector(e,t){e.startVector(4,t,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(t,n,i){return e.startDeprecatedSessionState(t),e.addKernels(t,n),e.addSubGraphSessionStates(t,i),e.endDeprecatedSessionState(t)}}}),Uu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrArgsEntry=void 0;var o=i(Ne()),a=Xs();e.KernelTypeStrArgsEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsKernelTypeStrArgsEntry(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}kernelTypeStr(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}args(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new a.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,t){e.addFieldOffset(0,t,0)}static addArgs(e,t){e.addFieldOffset(1,t,0)}static createArgsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startArgsVector(e,t){e.startVector(4,t,4)}static endKernelTypeStrArgsEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createKernelTypeStrArgsEntry(t,n,i){return e.startKernelTypeStrArgsEntry(t),e.addKernelTypeStr(t,n),e.addArgs(t,i),e.endKernelTypeStrArgsEntry(t)}}}),Hu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.OpIdKernelTypeStrArgsEntry=void 0;var o=i(Ne()),a=Uu();e.OpIdKernelTypeStrArgsEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsOpIdKernelTypeStrArgsEntry(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}opId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}kernelTypeStrArgs(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new a.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,t){e.addFieldOffset(0,t,0)}static addKernelTypeStrArgs(e,t){e.addFieldOffset(1,t,0)}static createKernelTypeStrArgsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startKernelTypeStrArgsVector(e,t){e.startVector(4,t,4)}static endOpIdKernelTypeStrArgsEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createOpIdKernelTypeStrArgsEntry(t,n,i){return e.startOpIdKernelTypeStrArgsEntry(t),e.addOpId(t,n),e.addKernelTypeStrArgs(t,i),e.endOpIdKernelTypeStrArgsEntry(t)}}}),ju=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrResolver=void 0;var o=i(Ne()),a=Hu();e.KernelTypeStrResolver=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsKernelTypeStrResolver(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsKernelTypeStrResolver(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}opKernelTypeStrArgs(e,t){let n=this.bb.__offset(this.bb_pos,4);return n?(t||new a.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,t){e.addFieldOffset(0,t,0)}static createOpKernelTypeStrArgsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,t){e.startVector(4,t,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(t,n){return e.startKernelTypeStrResolver(t),e.addOpKernelTypeStrArgs(t,n),e.endKernelTypeStrResolver(t)}}}),Xu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.OperatorSetId=void 0;var o=i(Ne());e.OperatorSetId=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsOperatorSetId(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsOperatorSetId(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}domain(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,t){e.addFieldOffset(0,t,0)}static addVersion(e,t){e.addFieldInt64(1,t,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(t,n,i){return e.startOperatorSetId(t),e.addDomain(t,n),e.addVersion(t,i),e.endOperatorSetId(t)}}}),Ju=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.StringStringEntry=void 0;var o=i(Ne());e.StringStringEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsStringStringEntry(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsStringStringEntry(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}key(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}value(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,t){e.addFieldOffset(0,t,0)}static addValue(e,t){e.addFieldOffset(1,t,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(t,n,i){return e.startStringStringEntry(t),e.addKey(t,n),e.addValue(t,i),e.endStringStringEntry(t)}}}),Yu=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Model=void 0;var o=i(Ne()),a=Ei(),s=Xu(),u=Ju();e.Model=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsModel(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsModel(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new s.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}producerVersion(e){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb_pos+t,e):null}domain(e){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__string(this.bb_pos+t,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb_pos+t,e):null}graph(e){let t=this.bb.__offset(this.bb_pos,18);return t?(e||new a.Graph).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}graphDocString(e){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb_pos+t,e):null}metadataProps(e,t){let n=this.bb.__offset(this.bb_pos,22);return n?(t||new u.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,t){e.addFieldInt64(0,t,BigInt("0"))}static addOpsetImport(e,t){e.addFieldOffset(1,t,0)}static createOpsetImportVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startOpsetImportVector(e,t){e.startVector(4,t,4)}static addProducerName(e,t){e.addFieldOffset(2,t,0)}static addProducerVersion(e,t){e.addFieldOffset(3,t,0)}static addDomain(e,t){e.addFieldOffset(4,t,0)}static addModelVersion(e,t){e.addFieldInt64(5,t,BigInt("0"))}static addDocString(e,t){e.addFieldOffset(6,t,0)}static addGraph(e,t){e.addFieldOffset(7,t,0)}static addGraphDocString(e,t){e.addFieldOffset(8,t,0)}static addMetadataProps(e,t){e.addFieldOffset(9,t,0)}static createMetadataPropsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startMetadataPropsVector(e,t){e.startVector(4,t,4)}static endModel(e){return e.endObject()}}}),nh=oe(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.InferenceSession=void 0;var o=i(Ne()),a=ju(),s=Yu();e.InferenceSession=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsInferenceSession(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsInferenceSession(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}model(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new s.Model).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}kernelTypeStrResolver(e){let t=this.bb.__offset(this.bb_pos,10);return t?(e||new a.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,t){e.addFieldOffset(0,t,0)}static addModel(e,t){e.addFieldOffset(1,t,0)}static addKernelTypeStrResolver(e,t){e.addFieldOffset(3,t,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,t){e.finish(t,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,t){e.finish(t,"ORTM",!0)}}}),rh=N(()=>{"use strict";u$=_e(Gs()),l$=_e(Xs()),Ci=_e(eu()),Lt=_e(Zs()),c$=_e(Ru()),d$=_e(th()),p$=_e(Fu()),f$=_e(Bu()),h$=_e(Iu()),m$=_e(xu()),g$=_e(wu()),b$=_e(nu()),tl=_e(Ei()),nl=_e(nh()),y$=_e(Uu()),_$=_e(ju()),w$=_e(bu()),v$=_e(Yu()),rl=_e(Ys()),x$=_e(ou()),T$=_e(Js()),I$=_e(au()),S$=_e(Hu()),$$=_e(Xu()),A$=_e(uu()),O$=_e(cu()),P$=_e(pu()),E$=_e(_u()),C$=_e($u()),D$=_e(mu()),k$=_e(Ju()),N$=_e(xo()),Io=_e(vo()),ol=_e(Ou()),L$=_e(To()),il=_e(Pu()),R$=_e(Du())}),So=N(()=>{"use strict";rh()}),ih=oe((e,t)=>{"use strict";t.exports=function e(e,t){for(var n=Array(arguments.length-1),i=0,o=2,a=!0;o<arguments.length;)n[i++]=arguments[o++];return new Promise(function(o,s){n[i]=function(e){if(a)if(a=!1,e)s(e);else{for(var t=Array(arguments.length-1),n=0;n<t.length;)t[n++]=arguments[n];o.apply(null,t)}};try{e.apply(t||null,n)}catch(e){a&&(a=!1,s(e))}})}}),lh=oe(e=>{"use strict";var t,n=e;n.length=function(e){var t=e.length;if(!t)return 0;for(var n=0;--t%4>1&&"="===e.charAt(t);)++n;return Math.ceil(3*e.length)/4-n};var i=Array(64),o=Array(123);for(t=0;t<64;)o[i[t]=t<26?t+65:t<52?t+71:t<62?t-4:t-59|43]=t++;n.encode=function(e,t,n){for(var o,a=null,s=[],u=0,l=0;t<n;){var d=e[t++];switch(l){case 0:s[u++]=i[d>>2],o=(3&d)<<4,l=1;break;case 1:s[u++]=i[o|d>>4],o=(15&d)<<2,l=2;break;case 2:s[u++]=i[o|d>>6],s[u++]=i[63&d],l=0}u>8191&&((a||(a=[])).push(String.fromCharCode.apply(String,s)),u=0)}return l&&(s[u++]=i[o],s[u++]=61,1===l&&(s[u++]=61)),a?(u&&a.push(String.fromCharCode.apply(String,s.slice(0,u))),a.join("")):String.fromCharCode.apply(String,s.slice(0,u))};var a="invalid encoding";n.decode=function(e,t,n){for(var i,s=n,u=0,l=0;l<e.length;){var d=e.charCodeAt(l++);if(61===d&&u>1)break;if(void 0===(d=o[d]))throw Error(a);switch(u){case 0:i=d,u=1;break;case 1:t[n++]=i<<2|(48&d)>>4,i=d,u=2;break;case 2:t[n++]=(15&i)<<4|(60&d)>>2,i=d,u=3;break;case 3:t[n++]=(3&i)<<6|d,u=0}}if(1===u)throw Error(a);return n-s},n.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}}),dh=oe((e,t)=>{"use strict";function n(){this._listeners={}}t.exports=n,n.prototype.on=function(e,t,n){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:t,ctx:n||this}),this},n.prototype.off=function(e,t){if(void 0===e)this._listeners={};else if(void 0===t)this._listeners[e]=[];else for(var n=this._listeners[e],i=0;i<n.length;)n[i].fn===t?n.splice(i,1):++i;return this},n.prototype.emit=function(e){var t=this._listeners[e];if(t){for(var n=[],i=1;i<arguments.length;)n.push(arguments[i++]);for(i=0;i<t.length;)t[i].fn.apply(t[i++].ctx,n)}return this}}),yh=oe((e,t)=>{"use strict";function n(e){return"u">typeof Float32Array?function(){var t=new Float32Array([-0]),n=new Uint8Array(t.buffer),i=128===n[3];function o(e,i,o){t[0]=e,i[o]=n[0],i[o+1]=n[1],i[o+2]=n[2],i[o+3]=n[3]}function a(e,i,o){t[0]=e,i[o]=n[3],i[o+1]=n[2],i[o+2]=n[1],i[o+3]=n[0]}function s(e,i){return n[0]=e[i],n[1]=e[i+1],n[2]=e[i+2],n[3]=e[i+3],t[0]}function u(e,i){return n[3]=e[i],n[2]=e[i+1],n[1]=e[i+2],n[0]=e[i+3],t[0]}e.writeFloatLE=i?o:a,e.writeFloatBE=i?a:o,e.readFloatLE=i?s:u,e.readFloatBE=i?u:s}():function(){function t(e,t,n,i){var o=+(t<0);if(o&&(t=-t),0===t)e(1/t>0?0:0x80000000,n,i);else if(isNaN(t))e(0x7fc00000,n,i);else if(t>34028234663852886e22)e((o<<31|0x7f800000)>>>0,n,i);else if(t<11754943508222875e-54)e((o<<31|Math.round(t/1401298464324817e-60))>>>0,n,i);else{var a=Math.floor(Math.log(t)/Math.LN2),s=8388607&Math.round(t*Math.pow(2,-a)*8388608);e((o<<31|a+127<<23|s)>>>0,n,i)}}function n(e,t,n){var i=e(t,n),o=(i>>31)*2+1,a=i>>>23&255,s=8388607&i;return 255===a?s?NaN:1/0*o:0===a?1401298464324817e-60*o*s:o*Math.pow(2,a-150)*(s+8388608)}e.writeFloatLE=t.bind(null,i),e.writeFloatBE=t.bind(null,o),e.readFloatLE=n.bind(null,a),e.readFloatBE=n.bind(null,s)}(),"u">typeof Float64Array?function(){var t=new Float64Array([-0]),n=new Uint8Array(t.buffer),i=128===n[7];function o(e,i,o){t[0]=e,i[o]=n[0],i[o+1]=n[1],i[o+2]=n[2],i[o+3]=n[3],i[o+4]=n[4],i[o+5]=n[5],i[o+6]=n[6],i[o+7]=n[7]}function a(e,i,o){t[0]=e,i[o]=n[7],i[o+1]=n[6],i[o+2]=n[5],i[o+3]=n[4],i[o+4]=n[3],i[o+5]=n[2],i[o+6]=n[1],i[o+7]=n[0]}function s(e,i){return n[0]=e[i],n[1]=e[i+1],n[2]=e[i+2],n[3]=e[i+3],n[4]=e[i+4],n[5]=e[i+5],n[6]=e[i+6],n[7]=e[i+7],t[0]}function u(e,i){return n[7]=e[i],n[6]=e[i+1],n[5]=e[i+2],n[4]=e[i+3],n[3]=e[i+4],n[2]=e[i+5],n[1]=e[i+6],n[0]=e[i+7],t[0]}e.writeDoubleLE=i?o:a,e.writeDoubleBE=i?a:o,e.readDoubleLE=i?s:u,e.readDoubleBE=i?u:s}():function(){function t(e,t,n,i,o,a){var s,u=+(i<0);if(u&&(i=-i),0===i)e(0,o,a+t),e(1/i>0?0:0x80000000,o,a+n);else if(isNaN(i))e(0,o,a+t),e(0x7ff80000,o,a+n);else if(i>17976931348623157e292)e(0,o,a+t),e((u<<31|0x7ff00000)>>>0,o,a+n);else if(i<22250738585072014e-324)e((s=i/5e-324)>>>0,o,a+t),e((u<<31|s/0x100000000)>>>0,o,a+n);else{var l=Math.floor(Math.log(i)/Math.LN2);1024===l&&(l=1023),e(0x10000000000000*(s=i*Math.pow(2,-l))>>>0,o,a+t),e((u<<31|l+1023<<20|1048576*s&1048575)>>>0,o,a+n)}}function n(e,t,n,i,o){var a=e(i,o+t),s=e(i,o+n),u=(s>>31)*2+1,l=s>>>20&2047,d=0x100000000*(1048575&s)+a;return 2047===l?d?NaN:1/0*u:0===l?5e-324*u*d:u*Math.pow(2,l-1075)*(d+0x10000000000000)}e.writeDoubleLE=t.bind(null,i,0,4),e.writeDoubleBE=t.bind(null,o,4,0),e.readDoubleLE=n.bind(null,a,0,4),e.readDoubleBE=n.bind(null,s,4,0)}(),e}function i(e,t,n){t[n]=255&e,t[n+1]=e>>>8&255,t[n+2]=e>>>16&255,t[n+3]=e>>>24}function o(e,t,n){t[n]=e>>>24,t[n+1]=e>>>16&255,t[n+2]=e>>>8&255,t[n+3]=255&e}function a(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0}function s(e,t){return(e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3])>>>0}t.exports=n(n)}),_h=oe((exports,module)=>{"use strict";function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(r){}return null}module.exports=inquire}),vh=oe(e=>{"use strict";var t=e;t.length=function(e){for(var t=0,n=0,i=0;i<e.length;++i)(n=e.charCodeAt(i))<128?t+=1:n<2048?t+=2:(64512&n)==55296&&(64512&e.charCodeAt(i+1))==56320?(++i,t+=4):t+=3;return t},t.read=function(e,t,n){if(n-t<1)return"";for(var i,o=null,a=[],s=0;t<n;)(i=e[t++])<128?a[s++]=i:i>191&&i<224?a[s++]=(31&i)<<6|63&e[t++]:i>239&&i<365?(i=((7&i)<<18|(63&e[t++])<<12|(63&e[t++])<<6|63&e[t++])-65536,a[s++]=55296+(i>>10),a[s++]=56320+(1023&i)):a[s++]=(15&i)<<12|(63&e[t++])<<6|63&e[t++],s>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,a)),s=0);return o?(s&&o.push(String.fromCharCode.apply(String,a.slice(0,s))),o.join("")):String.fromCharCode.apply(String,a.slice(0,s))},t.write=function(e,t,n){for(var i,o,a=n,s=0;s<e.length;++s)(i=e.charCodeAt(s))<128?t[n++]=i:(i<2048?t[n++]=i>>6|192:((64512&i)==55296&&(64512&(o=e.charCodeAt(s+1)))==56320?(i=65536+((1023&i)<<10)+(1023&o),++s,t[n++]=i>>18|240,t[n++]=i>>12&63|128):t[n++]=i>>12|224,t[n++]=i>>6&63|128),t[n++]=63&i|128);return n-a}}),Th=oe((e,t)=>{"use strict";t.exports=function e(e,t,n){var i=n||8192,o=i>>>1,a=null,s=i;return function(n){if(n<1||n>o)return e(n);s+n>i&&(a=e(i),s=0);var u=t.call(a,s,s+=n);return 7&s&&(s=(7|s)+1),u}}}),Sh=oe((e,t)=>{"use strict";t.exports=i;var n=fr();function i(e,t){this.lo=e>>>0,this.hi=t>>>0}var o=i.zero=new i(0,0);o.toNumber=function(){return 0},o.zzEncode=o.zzDecode=function(){return this},o.length=function(){return 1};var a=i.zeroHash="\0\0\0\0\0\0\0\0";i.fromNumber=function(e){if(0===e)return o;var t=e<0;t&&(e=-e);var n=e>>>0,a=(e-n)/0x100000000>>>0;return t&&(a=~a>>>0,n=~n>>>0,++n>0xffffffff&&(n=0,++a>0xffffffff&&(a=0))),new i(n,a)},i.from=function(e){if("number"==typeof e)return i.fromNumber(e);if(n.isString(e))if(!n.Long)return i.fromNumber(parseInt(e,10));else e=n.Long.fromString(e);return e.low||e.high?new i(e.low>>>0,e.high>>>0):o},i.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var t=~this.lo+1>>>0,n=~this.hi>>>0;return t||(n=n+1>>>0),-(t+0x100000000*n)}return this.lo+0x100000000*this.hi},i.prototype.toLong=function(e){return n.Long?new n.Long(0|this.lo,0|this.hi,!!e):{low:0|this.lo,high:0|this.hi,unsigned:!!e}};var s=String.prototype.charCodeAt;i.fromHash=function(e){return e===a?o:new i((s.call(e,0)|s.call(e,1)<<8|s.call(e,2)<<16|s.call(e,3)<<24)>>>0,(s.call(e,4)|s.call(e,5)<<8|s.call(e,6)<<16|s.call(e,7)<<24)>>>0)},i.prototype.toHash=function(){return String.fromCharCode(255&this.lo,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,255&this.hi,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)},i.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this},i.prototype.zzDecode=function(){var e=-(1&this.lo);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this},i.prototype.length=function(){var e=this.lo,t=(this.lo>>>28|this.hi<<4)>>>0,n=this.hi>>>24;return 0===n?0===t?e<16384?e<128?1:2:e<2097152?3:4:t<16384?t<128?5:6:t<2097152?7:8:n<128?9:10}}),fr=oe(e=>{"use strict";var t=e;function n(e,t,n){for(var i=Object.keys(t),o=0;o<i.length;++o)void 0!==e[i[o]]&&n||(e[i[o]]=t[i[o]]);return e}function i(e){function t(e,i){if(!(this instanceof t))return new t(e,i);Object.defineProperty(this,"message",{get:function(){return e}}),Error.captureStackTrace?Error.captureStackTrace(this,t):Object.defineProperty(this,"stack",{value:Error().stack||""}),i&&n(this,i)}return t.prototype=Object.create(Error.prototype,{constructor:{value:t,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return e},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),t}t.asPromise=ih(),t.base64=lh(),t.EventEmitter=dh(),t.float=yh(),t.inquire=_h(),t.utf8=vh(),t.pool=Th(),t.LongBits=Sh(),t.isNode=!!("u">typeof global&&global&&global.process&&global.process.versions&&global.process.versions.node),t.global=t.isNode&&global||"u">typeof window&&window||"u">typeof self&&self||e,t.emptyArray=Object.freeze?Object.freeze([]):[],t.emptyObject=Object.freeze?Object.freeze({}):{},t.isInteger=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},t.isString=function(e){return"string"==typeof e||e instanceof String},t.isObject=function(e){return e&&"object"==typeof e},t.isset=t.isSet=function(e,t){var n=e[t];return!!(null!=n&&e.hasOwnProperty(t))&&("object"!=typeof n||(Array.isArray(n)?n.length:Object.keys(n).length)>0)},t.Buffer=function(){try{var e=t.inquire("buffer").Buffer;return e.prototype.utf8Write?e:null}catch{return null}}(),t._Buffer_from=null,t._Buffer_allocUnsafe=null,t.newBuffer=function(e){return"number"==typeof e?t.Buffer?t._Buffer_allocUnsafe(e):new t.Array(e):t.Buffer?t._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)},t.Array="u">typeof Uint8Array?Uint8Array:Array,t.Long=t.global.dcodeIO&&t.global.dcodeIO.Long||t.global.Long||t.inquire("long"),t.key2Re=/^true|false|0|1$/,t.key32Re=/^-?(?:0|[1-9][0-9]*)$/,t.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,t.longToHash=function(e){return e?t.LongBits.from(e).toHash():t.LongBits.zeroHash},t.longFromHash=function(e,n){var i=t.LongBits.fromHash(e);return t.Long?t.Long.fromBits(i.lo,i.hi,n):i.toNumber(!!n)},t.merge=n,t.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)},t.newError=i,t.ProtocolError=i("ProtocolError"),t.oneOfGetter=function(e){for(var t={},n=0;n<e.length;++n)t[e[n]]=1;return function(){for(var e=Object.keys(this),n=e.length-1;n>-1;--n)if(1===t[e[n]]&&void 0!==this[e[n]]&&null!==this[e[n]])return e[n]}},t.oneOfSetter=function(e){return function(t){for(var n=0;n<e.length;++n)e[n]!==t&&delete this[e[n]]}},t.toJSONOptions={longs:String,enums:String,bytes:String,json:!0},t._configure=function(){var e=t.Buffer;if(!e){t._Buffer_from=t._Buffer_allocUnsafe=null;return}t._Buffer_from=e.from!==Uint8Array.from&&e.from||function(t,n){return new e(t,n)},t._Buffer_allocUnsafe=e.allocUnsafe||function(t){return new e(t)}}}),hl=oe((e,t)=>{"use strict";t.exports=p;var n,i=fr(),o=i.LongBits,a=i.base64,s=i.utf8;function u(e,t,n){this.fn=e,this.len=t,this.next=void 0,this.val=n}function l(){}function d(e){this.head=e.head,this.tail=e.tail,this.len=e.len,this.next=e.states}function p(){this.len=0,this.head=new u(l,0,0),this.tail=this.head,this.states=null}var c=function(){return i.Buffer?function(){return(p.create=function(){return new n})()}:function(){return new p}};function h(e,t,n){t[n]=255&e}function f(e,t,n){for(;e>127;)t[n++]=127&e|128,e>>>=7;t[n]=e}function m(e,t){this.len=e,this.next=void 0,this.val=t}function g(e,t,n){for(;e.hi;)t[n++]=127&e.lo|128,e.lo=(e.lo>>>7|e.hi<<25)>>>0,e.hi>>>=7;for(;e.lo>127;)t[n++]=127&e.lo|128,e.lo=e.lo>>>7;t[n++]=e.lo}function b(e,t,n){t[n]=255&e,t[n+1]=e>>>8&255,t[n+2]=e>>>16&255,t[n+3]=e>>>24}p.create=c(),p.alloc=function(e){return new i.Array(e)},i.Array!==Array&&(p.alloc=i.pool(p.alloc,i.Array.prototype.subarray)),p.prototype._push=function(e,t,n){return this.tail=this.tail.next=new u(e,t,n),this.len+=t,this},m.prototype=Object.create(u.prototype),m.prototype.fn=f,p.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new m((e>>>=0)<128?1:e<16384?2:e<2097152?3:e<0x10000000?4:5,e)).len,this},p.prototype.int32=function(e){return e<0?this._push(g,10,o.fromNumber(e)):this.uint32(e)},p.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)},p.prototype.uint64=function(e){var t=o.from(e);return this._push(g,t.length(),t)},p.prototype.int64=p.prototype.uint64,p.prototype.sint64=function(e){var t=o.from(e).zzEncode();return this._push(g,t.length(),t)},p.prototype.bool=function(e){return this._push(h,1,+!!e)},p.prototype.fixed32=function(e){return this._push(b,4,e>>>0)},p.prototype.sfixed32=p.prototype.fixed32,p.prototype.fixed64=function(e){var t=o.from(e);return this._push(b,4,t.lo)._push(b,4,t.hi)},p.prototype.sfixed64=p.prototype.fixed64,p.prototype.float=function(e){return this._push(i.float.writeFloatLE,4,e)},p.prototype.double=function(e){return this._push(i.float.writeDoubleLE,8,e)};var y=i.Array.prototype.set?function(e,t,n){t.set(e,n)}:function(e,t,n){for(var i=0;i<e.length;++i)t[n+i]=e[i]};p.prototype.bytes=function(e){var t=e.length>>>0;if(!t)return this._push(h,1,0);if(i.isString(e)){var n=p.alloc(t=a.length(e));a.decode(e,n,0),e=n}return this.uint32(t)._push(y,t,e)},p.prototype.string=function(e){var t=s.length(e);return t?this.uint32(t)._push(s.write,t,e):this._push(h,1,0)},p.prototype.fork=function(){return this.states=new d(this),this.head=this.tail=new u(l,0,0),this.len=0,this},p.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new u(l,0,0),this.len=0),this},p.prototype.ldelim=function(){var e=this.head,t=this.tail,n=this.len;return this.reset().uint32(n),n&&(this.tail.next=e.next,this.tail=t,this.len+=n),this},p.prototype.finish=function(){for(var e=this.head.next,t=this.constructor.alloc(this.len),n=0;e;)e.fn(e.val,t,n),n+=e.len,e=e.next;return t},p._configure=function(e){n=e,p.create=c(),n._configure()}}),Nh=oe((e,t)=>{"use strict";t.exports=o;var n=hl();(o.prototype=Object.create(n.prototype)).constructor=o;var i=fr();function o(){n.call(this)}function a(e,t,n){e.length<40?i.utf8.write(e,t,n):t.utf8Write?t.utf8Write(e,n):t.write(e,n)}o._configure=function(){o.alloc=i._Buffer_allocUnsafe,o.writeBytesBuffer=i.Buffer&&i.Buffer.prototype instanceof Uint8Array&&"set"===i.Buffer.prototype.set.name?function(e,t,n){t.set(e,n)}:function(e,t,n){if(e.copy)e.copy(t,n,0,e.length);else for(var i=0;i<e.length;)t[n++]=e[i++]}},o.prototype.bytes=function(e){i.isString(e)&&(e=i._Buffer_from(e,"base64"));var t=e.length>>>0;return this.uint32(t),t&&this._push(o.writeBytesBuffer,t,e),this},o.prototype.string=function(e){var t=i.Buffer.byteLength(e);return this.uint32(t),t&&this._push(a,t,e),this},o._configure()}),bl=oe((e,t)=>{"use strict";t.exports=u;var n,i=fr(),o=i.LongBits,a=i.utf8;function s(e,t){return RangeError("index out of range: "+e.pos+" + "+(t||1)+" > "+e.len)}function u(e){this.buf=e,this.pos=0,this.len=e.length}var l="u">typeof Uint8Array?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new u(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new u(e);throw Error("illegal buffer")},d=function(){return i.Buffer?function(e){return(u.create=function(e){return i.Buffer.isBuffer(e)?new n(e):l(e)})(e)}:l};function p(){var e=new o(0,0),t=0;if(this.len-this.pos>4){for(;t<4;++t)if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e;if(e.lo=(e.lo|(127&this.buf[this.pos])<<28)>>>0,e.hi=(e.hi|(127&this.buf[this.pos])>>4)>>>0,this.buf[this.pos++]<128)return e;t=0}else{for(;t<3;++t){if(this.pos>=this.len)throw s(this);if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e}return e.lo=(e.lo|(127&this.buf[this.pos++])<<7*t)>>>0,e}if(this.len-this.pos>4){for(;t<5;++t)if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}else for(;t<5;++t){if(this.pos>=this.len)throw s(this);if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}throw Error("invalid varint encoding")}function c(e,t){return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0}function h(){if(this.pos+8>this.len)throw s(this,8);return new o(c(this.buf,this.pos+=4),c(this.buf,this.pos+=4))}u.create=d(),u.prototype._slice=i.Array.prototype.subarray||i.Array.prototype.slice,u.prototype.uint32=function(){var e=0xffffffff;return function(){if(e=(127&this.buf[this.pos])>>>0,this.buf[this.pos++]<128||(e=(e|(127&this.buf[this.pos])<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(127&this.buf[this.pos])<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(127&this.buf[this.pos])<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(15&this.buf[this.pos])<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,s(this,10);return e}}(),u.prototype.int32=function(){return 0|this.uint32()},u.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(1&e)},u.prototype.bool=function(){return 0!==this.uint32()},u.prototype.fixed32=function(){if(this.pos+4>this.len)throw s(this,4);return c(this.buf,this.pos+=4)},u.prototype.sfixed32=function(){if(this.pos+4>this.len)throw s(this,4);return 0|c(this.buf,this.pos+=4)},u.prototype.float=function(){if(this.pos+4>this.len)throw s(this,4);var e=i.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e},u.prototype.double=function(){if(this.pos+8>this.len)throw s(this,4);var e=i.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e},u.prototype.bytes=function(){var e=this.uint32(),t=this.pos,n=this.pos+e;if(n>this.len)throw s(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(t,n);if(t===n){var o=i.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,t,n)},u.prototype.string=function(){var e=this.bytes();return a.read(e,0,e.length)},u.prototype.skip=function(e){if("number"==typeof e){if(this.pos+e>this.len)throw s(this,e);this.pos+=e}else do if(this.pos>=this.len)throw s(this);while(128&this.buf[this.pos++])return this},u.prototype.skipType=function(e){switch(e){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;4!=(e=7&this.uint32());)this.skipType(e);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+e+" at offset "+this.pos)}return this},u._configure=function(e){n=e,u.create=d(),n._configure();var t=i.Long?"toLong":"toNumber";i.merge(u.prototype,{int64:function(){return p.call(this)[t](!1)},uint64:function(){return p.call(this)[t](!0)},sint64:function(){return p.call(this).zzDecode()[t](!1)},fixed64:function(){return h.call(this)[t](!0)},sfixed64:function(){return h.call(this)[t](!1)}})}}),Uh=oe((e,t)=>{"use strict";t.exports=o;var n=bl();(o.prototype=Object.create(n.prototype)).constructor=o;var i=fr();function o(e){n.call(this,e)}o._configure=function(){i.Buffer&&(o.prototype._slice=i.Buffer.prototype.slice)},o.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))},o._configure()}),Hh=oe((e,t)=>{"use strict";t.exports=i;var n=fr();function i(e,t,i){if("function"!=typeof e)throw TypeError("rpcImpl must be a function");n.EventEmitter.call(this),this.rpcImpl=e,this.requestDelimited=!!t,this.responseDelimited=!!i}(i.prototype=Object.create(n.EventEmitter.prototype)).constructor=i,i.prototype.rpcCall=function e(t,i,o,a,s){if(!a)throw TypeError("request must be specified");var u=this;if(!s)return n.asPromise(e,u,t,i,o,a);if(!u.rpcImpl)return void setTimeout(function(){s(Error("already ended"))},0);try{return u.rpcImpl(t,i[u.requestDelimited?"encodeDelimited":"encode"](a).finish(),function(e,n){if(e)return u.emit("error",e,t),s(e);if(null===n)return void u.end(!0);if(!(n instanceof o))try{n=o[u.responseDelimited?"decodeDelimited":"decode"](n)}catch(e){return u.emit("error",e,t),s(e)}return u.emit("data",n,t),s(null,n)})}catch(e){u.emit("error",e,t),setTimeout(function(){s(e)},0);return}},i.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}}),jh=oe(e=>{"use strict";e.Service=Hh()}),Xh=oe((e,t)=>{"use strict";t.exports={}}),Qh=oe(e=>{"use strict";var t=e;function n(){t.util._configure(),t.Writer._configure(t.BufferWriter),t.Reader._configure(t.BufferReader)}t.build="minimal",t.Writer=hl(),t.BufferWriter=Nh(),t.Reader=bl(),t.BufferReader=Uh(),t.util=fr(),t.rpc=jh(),t.roots=Xh(),t.configure=n,n()}),em=oe((e,t)=>{"use strict";t.exports=Qh()}),Yr=oe((e,t)=>{"use strict";var n=em(),i=n.Reader,o=n.Writer,a=n.util,s=n.roots.default||(n.roots.default={});s.onnx=function(){var e={};return e.Version=function(){var e={},t=Object.create(e);return t[e[0]="_START_VERSION"]=0,t[e[1]="IR_VERSION_2017_10_10"]=1,t[e[2]="IR_VERSION_2017_10_30"]=2,t[e[3]="IR_VERSION_2017_11_3"]=3,t[e[4]="IR_VERSION_2019_1_22"]=4,t[e[5]="IR_VERSION_2019_3_18"]=5,t[e[6]="IR_VERSION_2019_9_19"]=6,t[e[7]="IR_VERSION_2020_5_8"]=7,t[e[8]="IR_VERSION_2021_7_30"]=8,t[e[9]="IR_VERSION"]=9,t}(),e.AttributeProto=function(){function e(e){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=a.Long?a.Long.fromBits(0,0,!1):0,e.prototype.s=a.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=a.emptyArray,e.prototype.ints=a.emptyArray,e.prototype.strings=a.emptyArray,e.prototype.tensors=a.emptyArray,e.prototype.graphs=a.emptyArray,e.prototype.sparseTensors=a.emptyArray,e.prototype.typeProtos=a.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.f&&Object.hasOwnProperty.call(e,"f")&&t.uint32(21).float(e.f),null!=e.i&&Object.hasOwnProperty.call(e,"i")&&t.uint32(24).int64(e.i),null!=e.s&&Object.hasOwnProperty.call(e,"s")&&t.uint32(34).bytes(e.s),null!=e.t&&Object.hasOwnProperty.call(e,"t")&&s.onnx.TensorProto.encode(e.t,t.uint32(42).fork()).ldelim(),null!=e.g&&Object.hasOwnProperty.call(e,"g")&&s.onnx.GraphProto.encode(e.g,t.uint32(50).fork()).ldelim(),null!=e.floats&&e.floats.length){t.uint32(58).fork();for(var n=0;n<e.floats.length;++n)t.float(e.floats[n]);t.ldelim()}if(null!=e.ints&&e.ints.length){t.uint32(66).fork();for(var n=0;n<e.ints.length;++n)t.int64(e.ints[n]);t.ldelim()}if(null!=e.strings&&e.strings.length)for(var n=0;n<e.strings.length;++n)t.uint32(74).bytes(e.strings[n]);if(null!=e.tensors&&e.tensors.length)for(var n=0;n<e.tensors.length;++n)s.onnx.TensorProto.encode(e.tensors[n],t.uint32(82).fork()).ldelim();if(null!=e.graphs&&e.graphs.length)for(var n=0;n<e.graphs.length;++n)s.onnx.GraphProto.encode(e.graphs[n],t.uint32(90).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(106).string(e.docString),null!=e.tp&&Object.hasOwnProperty.call(e,"tp")&&s.onnx.TypeProto.encode(e.tp,t.uint32(114).fork()).ldelim(),null!=e.typeProtos&&e.typeProtos.length)for(var n=0;n<e.typeProtos.length;++n)s.onnx.TypeProto.encode(e.typeProtos[n],t.uint32(122).fork()).ldelim();if(null!=e.type&&Object.hasOwnProperty.call(e,"type")&&t.uint32(160).int32(e.type),null!=e.refAttrName&&Object.hasOwnProperty.call(e,"refAttrName")&&t.uint32(170).string(e.refAttrName),null!=e.sparseTensor&&Object.hasOwnProperty.call(e,"sparseTensor")&&s.onnx.SparseTensorProto.encode(e.sparseTensor,t.uint32(178).fork()).ldelim(),null!=e.sparseTensors&&e.sparseTensors.length)for(var n=0;n<e.sparseTensors.length;++n)s.onnx.SparseTensorProto.encode(e.sparseTensors[n],t.uint32(186).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.AttributeProto;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.name=e.string();break;case 21:o.refAttrName=e.string();break;case 13:o.docString=e.string();break;case 20:o.type=e.int32();break;case 2:o.f=e.float();break;case 3:o.i=e.int64();break;case 4:o.s=e.bytes();break;case 5:o.t=s.onnx.TensorProto.decode(e,e.uint32());break;case 6:o.g=s.onnx.GraphProto.decode(e,e.uint32());break;case 22:o.sparseTensor=s.onnx.SparseTensorProto.decode(e,e.uint32());break;case 14:o.tp=s.onnx.TypeProto.decode(e,e.uint32());break;case 7:if(o.floats&&o.floats.length||(o.floats=[]),(7&a)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.floats.push(e.float());else o.floats.push(e.float());break;case 8:if(o.ints&&o.ints.length||(o.ints=[]),(7&a)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.ints.push(e.int64());else o.ints.push(e.int64());break;case 9:o.strings&&o.strings.length||(o.strings=[]),o.strings.push(e.bytes());break;case 10:o.tensors&&o.tensors.length||(o.tensors=[]),o.tensors.push(s.onnx.TensorProto.decode(e,e.uint32()));break;case 11:o.graphs&&o.graphs.length||(o.graphs=[]),o.graphs.push(s.onnx.GraphProto.decode(e,e.uint32()));break;case 23:o.sparseTensors&&o.sparseTensors.length||(o.sparseTensors=[]),o.sparseTensors.push(s.onnx.SparseTensorProto.decode(e,e.uint32()));break;case 15:o.typeProtos&&o.typeProtos.length||(o.typeProtos=[]),o.typeProtos.push(s.onnx.TypeProto.decode(e,e.uint32()));break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!a.isString(e.name))return"name: string expected";if(null!=e.refAttrName&&e.hasOwnProperty("refAttrName")&&!a.isString(e.refAttrName))return"refAttrName: string expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!a.isString(e.docString))return"docString: string expected";if(null!=e.type&&e.hasOwnProperty("type"))switch(e.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:}if(null!=e.f&&e.hasOwnProperty("f")&&"number"!=typeof e.f)return"f: number expected";if(null!=e.i&&e.hasOwnProperty("i")&&!a.isInteger(e.i)&&!(e.i&&a.isInteger(e.i.low)&&a.isInteger(e.i.high)))return"i: integer|Long expected";if(null!=e.s&&e.hasOwnProperty("s")&&!(e.s&&"number"==typeof e.s.length||a.isString(e.s)))return"s: buffer expected";if(null!=e.t&&e.hasOwnProperty("t")){var t=s.onnx.TensorProto.verify(e.t);if(t)return"t."+t}if(null!=e.g&&e.hasOwnProperty("g")){var t=s.onnx.GraphProto.verify(e.g);if(t)return"g."+t}if(null!=e.sparseTensor&&e.hasOwnProperty("sparseTensor")){var t=s.onnx.SparseTensorProto.verify(e.sparseTensor);if(t)return"sparseTensor."+t}if(null!=e.tp&&e.hasOwnProperty("tp")){var t=s.onnx.TypeProto.verify(e.tp);if(t)return"tp."+t}if(null!=e.floats&&e.hasOwnProperty("floats")){if(!Array.isArray(e.floats))return"floats: array expected";for(var n=0;n<e.floats.length;++n)if("number"!=typeof e.floats[n])return"floats: number[] expected"}if(null!=e.ints&&e.hasOwnProperty("ints")){if(!Array.isArray(e.ints))return"ints: array expected";for(var n=0;n<e.ints.length;++n)if(!a.isInteger(e.ints[n])&&!(e.ints[n]&&a.isInteger(e.ints[n].low)&&a.isInteger(e.ints[n].high)))return"ints: integer|Long[] expected"}if(null!=e.strings&&e.hasOwnProperty("strings")){if(!Array.isArray(e.strings))return"strings: array expected";for(var n=0;n<e.strings.length;++n)if(!(e.strings[n]&&"number"==typeof e.strings[n].length||a.isString(e.strings[n])))return"strings: buffer[] expected"}if(null!=e.tensors&&e.hasOwnProperty("tensors")){if(!Array.isArray(e.tensors))return"tensors: array expected";for(var n=0;n<e.tensors.length;++n){var t=s.onnx.TensorProto.verify(e.tensors[n]);if(t)return"tensors."+t}}if(null!=e.graphs&&e.hasOwnProperty("graphs")){if(!Array.isArray(e.graphs))return"graphs: array expected";for(var n=0;n<e.graphs.length;++n){var t=s.onnx.GraphProto.verify(e.graphs[n]);if(t)return"graphs."+t}}if(null!=e.sparseTensors&&e.hasOwnProperty("sparseTensors")){if(!Array.isArray(e.sparseTensors))return"sparseTensors: array expected";for(var n=0;n<e.sparseTensors.length;++n){var t=s.onnx.SparseTensorProto.verify(e.sparseTensors[n]);if(t)return"sparseTensors."+t}}if(null!=e.typeProtos&&e.hasOwnProperty("typeProtos")){if(!Array.isArray(e.typeProtos))return"typeProtos: array expected";for(var n=0;n<e.typeProtos.length;++n){var t=s.onnx.TypeProto.verify(e.typeProtos[n]);if(t)return"typeProtos."+t}}return null},e.fromObject=function(e){if(e instanceof s.onnx.AttributeProto)return e;var t=new s.onnx.AttributeProto;switch(null!=e.name&&(t.name=String(e.name)),null!=e.refAttrName&&(t.refAttrName=String(e.refAttrName)),null!=e.docString&&(t.docString=String(e.docString)),e.type){default:"number"==typeof e.type&&(t.type=e.type);break;case"UNDEFINED":case 0:t.type=0;break;case"FLOAT":case 1:t.type=1;break;case"INT":case 2:t.type=2;break;case"STRING":case 3:t.type=3;break;case"TENSOR":case 4:t.type=4;break;case"GRAPH":case 5:t.type=5;break;case"SPARSE_TENSOR":case 11:t.type=11;break;case"TYPE_PROTO":case 13:t.type=13;break;case"FLOATS":case 6:t.type=6;break;case"INTS":case 7:t.type=7;break;case"STRINGS":case 8:t.type=8;break;case"TENSORS":case 9:t.type=9;break;case"GRAPHS":case 10:t.type=10;break;case"SPARSE_TENSORS":case 12:t.type=12;break;case"TYPE_PROTOS":case 14:t.type=14}if(null!=e.f&&(t.f=Number(e.f)),null!=e.i&&(a.Long?(t.i=a.Long.fromValue(e.i)).unsigned=!1:"string"==typeof e.i?t.i=parseInt(e.i,10):"number"==typeof e.i?t.i=e.i:"object"==typeof e.i&&(t.i=new a.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber())),null!=e.s&&("string"==typeof e.s?a.base64.decode(e.s,t.s=a.newBuffer(a.base64.length(e.s)),0):e.s.length>=0&&(t.s=e.s)),null!=e.t){if("object"!=typeof e.t)throw TypeError(".onnx.AttributeProto.t: object expected");t.t=s.onnx.TensorProto.fromObject(e.t)}if(null!=e.g){if("object"!=typeof e.g)throw TypeError(".onnx.AttributeProto.g: object expected");t.g=s.onnx.GraphProto.fromObject(e.g)}if(null!=e.sparseTensor){if("object"!=typeof e.sparseTensor)throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");t.sparseTensor=s.onnx.SparseTensorProto.fromObject(e.sparseTensor)}if(null!=e.tp){if("object"!=typeof e.tp)throw TypeError(".onnx.AttributeProto.tp: object expected");t.tp=s.onnx.TypeProto.fromObject(e.tp)}if(e.floats){if(!Array.isArray(e.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");t.floats=[];for(var n=0;n<e.floats.length;++n)t.floats[n]=Number(e.floats[n])}if(e.ints){if(!Array.isArray(e.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");t.ints=[];for(var n=0;n<e.ints.length;++n)a.Long?(t.ints[n]=a.Long.fromValue(e.ints[n])).unsigned=!1:"string"==typeof e.ints[n]?t.ints[n]=parseInt(e.ints[n],10):"number"==typeof e.ints[n]?t.ints[n]=e.ints[n]:"object"==typeof e.ints[n]&&(t.ints[n]=new a.LongBits(e.ints[n].low>>>0,e.ints[n].high>>>0).toNumber())}if(e.strings){if(!Array.isArray(e.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");t.strings=[];for(var n=0;n<e.strings.length;++n)"string"==typeof e.strings[n]?a.base64.decode(e.strings[n],t.strings[n]=a.newBuffer(a.base64.length(e.strings[n])),0):e.strings[n].length>=0&&(t.strings[n]=e.strings[n])}if(e.tensors){if(!Array.isArray(e.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");t.tensors=[];for(var n=0;n<e.tensors.length;++n){if("object"!=typeof e.tensors[n])throw TypeError(".onnx.AttributeProto.tensors: object expected");t.tensors[n]=s.onnx.TensorProto.fromObject(e.tensors[n])}}if(e.graphs){if(!Array.isArray(e.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");t.graphs=[];for(var n=0;n<e.graphs.length;++n){if("object"!=typeof e.graphs[n])throw TypeError(".onnx.AttributeProto.graphs: object expected");t.graphs[n]=s.onnx.GraphProto.fromObject(e.graphs[n])}}if(e.sparseTensors){if(!Array.isArray(e.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");t.sparseTensors=[];for(var n=0;n<e.sparseTensors.length;++n){if("object"!=typeof e.sparseTensors[n])throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");t.sparseTensors[n]=s.onnx.SparseTensorProto.fromObject(e.sparseTensors[n])}}if(e.typeProtos){if(!Array.isArray(e.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");t.typeProtos=[];for(var n=0;n<e.typeProtos.length;++n){if("object"!=typeof e.typeProtos[n])throw TypeError(".onnx.AttributeProto.typeProtos: object expected");t.typeProtos[n]=s.onnx.TypeProto.fromObject(e.typeProtos[n])}}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.floats=[],n.ints=[],n.strings=[],n.tensors=[],n.graphs=[],n.typeProtos=[],n.sparseTensors=[]),t.defaults){if(n.name="",n.f=0,a.Long){var i=new a.Long(0,0,!1);n.i=t.longs===String?i.toString():t.longs===Number?i.toNumber():i}else n.i=t.longs===String?"0":0;t.bytes===String?n.s="":(n.s=[],t.bytes!==Array&&(n.s=a.newBuffer(n.s))),n.t=null,n.g=null,n.docString="",n.tp=null,n.type=t.enums===String?"UNDEFINED":0,n.refAttrName="",n.sparseTensor=null}if(null!=e.name&&e.hasOwnProperty("name")&&(n.name=e.name),null!=e.f&&e.hasOwnProperty("f")&&(n.f=t.json&&!isFinite(e.f)?String(e.f):e.f),null!=e.i&&e.hasOwnProperty("i")&&("number"==typeof e.i?n.i=t.longs===String?String(e.i):e.i:n.i=t.longs===String?a.Long.prototype.toString.call(e.i):t.longs===Number?new a.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber():e.i),null!=e.s&&e.hasOwnProperty("s")&&(n.s=t.bytes===String?a.base64.encode(e.s,0,e.s.length):t.bytes===Array?Array.prototype.slice.call(e.s):e.s),null!=e.t&&e.hasOwnProperty("t")&&(n.t=s.onnx.TensorProto.toObject(e.t,t)),null!=e.g&&e.hasOwnProperty("g")&&(n.g=s.onnx.GraphProto.toObject(e.g,t)),e.floats&&e.floats.length){n.floats=[];for(var o=0;o<e.floats.length;++o)n.floats[o]=t.json&&!isFinite(e.floats[o])?String(e.floats[o]):e.floats[o]}if(e.ints&&e.ints.length){n.ints=[];for(var o=0;o<e.ints.length;++o)"number"==typeof e.ints[o]?n.ints[o]=t.longs===String?String(e.ints[o]):e.ints[o]:n.ints[o]=t.longs===String?a.Long.prototype.toString.call(e.ints[o]):t.longs===Number?new a.LongBits(e.ints[o].low>>>0,e.ints[o].high>>>0).toNumber():e.ints[o]}if(e.strings&&e.strings.length){n.strings=[];for(var o=0;o<e.strings.length;++o)n.strings[o]=t.bytes===String?a.base64.encode(e.strings[o],0,e.strings[o].length):t.bytes===Array?Array.prototype.slice.call(e.strings[o]):e.strings[o]}if(e.tensors&&e.tensors.length){n.tensors=[];for(var o=0;o<e.tensors.length;++o)n.tensors[o]=s.onnx.TensorProto.toObject(e.tensors[o],t)}if(e.graphs&&e.graphs.length){n.graphs=[];for(var o=0;o<e.graphs.length;++o)n.graphs[o]=s.onnx.GraphProto.toObject(e.graphs[o],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),null!=e.tp&&e.hasOwnProperty("tp")&&(n.tp=s.onnx.TypeProto.toObject(e.tp,t)),e.typeProtos&&e.typeProtos.length){n.typeProtos=[];for(var o=0;o<e.typeProtos.length;++o)n.typeProtos[o]=s.onnx.TypeProto.toObject(e.typeProtos[o],t)}if(null!=e.type&&e.hasOwnProperty("type")&&(n.type=t.enums===String?void 0===s.onnx.AttributeProto.AttributeType[e.type]?e.type:s.onnx.AttributeProto.AttributeType[e.type]:e.type),null!=e.refAttrName&&e.hasOwnProperty("refAttrName")&&(n.refAttrName=e.refAttrName),null!=e.sparseTensor&&e.hasOwnProperty("sparseTensor")&&(n.sparseTensor=s.onnx.SparseTensorProto.toObject(e.sparseTensor,t)),e.sparseTensors&&e.sparseTensors.length){n.sparseTensors=[];for(var o=0;o<e.sparseTensors.length;++o)n.sparseTensors[o]=s.onnx.SparseTensorProto.toObject(e.sparseTensors[o],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.AttributeProto"},e.AttributeType=function(){var e={},t=Object.create(e);return t[e[0]="UNDEFINED"]=0,t[e[1]="FLOAT"]=1,t[e[2]="INT"]=2,t[e[3]="STRING"]=3,t[e[4]="TENSOR"]=4,t[e[5]="GRAPH"]=5,t[e[11]="SPARSE_TENSOR"]=11,t[e[13]="TYPE_PROTO"]=13,t[e[6]="FLOATS"]=6,t[e[7]="INTS"]=7,t[e[8]="STRINGS"]=8,t[e[9]="TENSORS"]=9,t[e[10]="GRAPHS"]=10,t[e[12]="SPARSE_TENSORS"]=12,t[e[14]="TYPE_PROTOS"]=14,t}(),e}(),e.ValueInfoProto=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.type&&Object.hasOwnProperty.call(e,"type")&&s.onnx.TypeProto.encode(e.type,t.uint32(18).fork()).ldelim(),null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(26).string(e.docString),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.ValueInfoProto;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.name=e.string();break;case 2:o.type=s.onnx.TypeProto.decode(e,e.uint32());break;case 3:o.docString=e.string();break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!a.isString(e.name))return"name: string expected";if(null!=e.type&&e.hasOwnProperty("type")){var t=s.onnx.TypeProto.verify(e.type);if(t)return"type."+t}return null!=e.docString&&e.hasOwnProperty("docString")&&!a.isString(e.docString)?"docString: string expected":null},e.fromObject=function(e){if(e instanceof s.onnx.ValueInfoProto)return e;var t=new s.onnx.ValueInfoProto;if(null!=e.name&&(t.name=String(e.name)),null!=e.type){if("object"!=typeof e.type)throw TypeError(".onnx.ValueInfoProto.type: object expected");t.type=s.onnx.TypeProto.fromObject(e.type)}return null!=e.docString&&(t.docString=String(e.docString)),t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.name="",n.type=null,n.docString=""),null!=e.name&&e.hasOwnProperty("name")&&(n.name=e.name),null!=e.type&&e.hasOwnProperty("type")&&(n.type=s.onnx.TypeProto.toObject(e.type,t)),null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.ValueInfoProto"},e}(),e.NodeProto=function(){function e(e){if(this.input=[],this.output=[],this.attribute=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.input=a.emptyArray,e.prototype.output=a.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=a.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.input&&e.input.length)for(var n=0;n<e.input.length;++n)t.uint32(10).string(e.input[n]);if(null!=e.output&&e.output.length)for(var n=0;n<e.output.length;++n)t.uint32(18).string(e.output[n]);if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(26).string(e.name),null!=e.opType&&Object.hasOwnProperty.call(e,"opType")&&t.uint32(34).string(e.opType),null!=e.attribute&&e.attribute.length)for(var n=0;n<e.attribute.length;++n)s.onnx.AttributeProto.encode(e.attribute[n],t.uint32(42).fork()).ldelim();return null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(50).string(e.docString),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(58).string(e.domain),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.NodeProto;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.input&&o.input.length||(o.input=[]),o.input.push(e.string());break;case 2:o.output&&o.output.length||(o.output=[]),o.output.push(e.string());break;case 3:o.name=e.string();break;case 4:o.opType=e.string();break;case 7:o.domain=e.string();break;case 5:o.attribute&&o.attribute.length||(o.attribute=[]),o.attribute.push(s.onnx.AttributeProto.decode(e,e.uint32()));break;case 6:o.docString=e.string();break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t)if(!a.isString(e.input[t]))return"input: string[] expected"}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t)if(!a.isString(e.output[t]))return"output: string[] expected"}if(null!=e.name&&e.hasOwnProperty("name")&&!a.isString(e.name))return"name: string expected";if(null!=e.opType&&e.hasOwnProperty("opType")&&!a.isString(e.opType))return"opType: string expected";if(null!=e.domain&&e.hasOwnProperty("domain")&&!a.isString(e.domain))return"domain: string expected";if(null!=e.attribute&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var t=0;t<e.attribute.length;++t){var n=s.onnx.AttributeProto.verify(e.attribute[t]);if(n)return"attribute."+n}}return null!=e.docString&&e.hasOwnProperty("docString")&&!a.isString(e.docString)?"docString: string expected":null},e.fromObject=function(e){if(e instanceof s.onnx.NodeProto)return e;var t=new s.onnx.NodeProto;if(e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.NodeProto.input: array expected");t.input=[];for(var n=0;n<e.input.length;++n)t.input[n]=String(e.input[n])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.NodeProto.output: array expected");t.output=[];for(var n=0;n<e.output.length;++n)t.output[n]=String(e.output[n])}if(null!=e.name&&(t.name=String(e.name)),null!=e.opType&&(t.opType=String(e.opType)),null!=e.domain&&(t.domain=String(e.domain)),e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");t.attribute=[];for(var n=0;n<e.attribute.length;++n){if("object"!=typeof e.attribute[n])throw TypeError(".onnx.NodeProto.attribute: object expected");t.attribute[n]=s.onnx.AttributeProto.fromObject(e.attribute[n])}}return null!=e.docString&&(t.docString=String(e.docString)),t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.input=[],n.output=[],n.attribute=[]),t.defaults&&(n.name="",n.opType="",n.docString="",n.domain=""),e.input&&e.input.length){n.input=[];for(var i=0;i<e.input.length;++i)n.input[i]=e.input[i]}if(e.output&&e.output.length){n.output=[];for(var i=0;i<e.output.length;++i)n.output[i]=e.output[i]}if(null!=e.name&&e.hasOwnProperty("name")&&(n.name=e.name),null!=e.opType&&e.hasOwnProperty("opType")&&(n.opType=e.opType),e.attribute&&e.attribute.length){n.attribute=[];for(var i=0;i<e.attribute.length;++i)n.attribute[i]=s.onnx.AttributeProto.toObject(e.attribute[i],t)}return null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),null!=e.domain&&e.hasOwnProperty("domain")&&(n.domain=e.domain),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.NodeProto"},e}(),e.TrainingInfoProto=function(){function e(e){if(this.initializationBinding=[],this.updateBinding=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=a.emptyArray,e.prototype.updateBinding=a.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.initialization&&Object.hasOwnProperty.call(e,"initialization")&&s.onnx.GraphProto.encode(e.initialization,t.uint32(10).fork()).ldelim(),null!=e.algorithm&&Object.hasOwnProperty.call(e,"algorithm")&&s.onnx.GraphProto.encode(e.algorithm,t.uint32(18).fork()).ldelim(),null!=e.initializationBinding&&e.initializationBinding.length)for(var n=0;n<e.initializationBinding.length;++n)s.onnx.StringStringEntryProto.encode(e.initializationBinding[n],t.uint32(26).fork()).ldelim();if(null!=e.updateBinding&&e.updateBinding.length)for(var n=0;n<e.updateBinding.length;++n)s.onnx.StringStringEntryProto.encode(e.updateBinding[n],t.uint32(34).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.TrainingInfoProto;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.initialization=s.onnx.GraphProto.decode(e,e.uint32());break;case 2:o.algorithm=s.onnx.GraphProto.decode(e,e.uint32());break;case 3:o.initializationBinding&&o.initializationBinding.length||(o.initializationBinding=[]),o.initializationBinding.push(s.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 4:o.updateBinding&&o.updateBinding.length||(o.updateBinding=[]),o.updateBinding.push(s.onnx.StringStringEntryProto.decode(e,e.uint32()));break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.initialization&&e.hasOwnProperty("initialization")){var t=s.onnx.GraphProto.verify(e.initialization);if(t)return"initialization."+t}if(null!=e.algorithm&&e.hasOwnProperty("algorithm")){var t=s.onnx.GraphProto.verify(e.algorithm);if(t)return"algorithm."+t}if(null!=e.initializationBinding&&e.hasOwnProperty("initializationBinding")){if(!Array.isArray(e.initializationBinding))return"initializationBinding: array expected";for(var n=0;n<e.initializationBinding.length;++n){var t=s.onnx.StringStringEntryProto.verify(e.initializationBinding[n]);if(t)return"initializationBinding."+t}}if(null!=e.updateBinding&&e.hasOwnProperty("updateBinding")){if(!Array.isArray(e.updateBinding))return"updateBinding: array expected";for(var n=0;n<e.updateBinding.length;++n){var t=s.onnx.StringStringEntryProto.verify(e.updateBinding[n]);if(t)return"updateBinding."+t}}return null},e.fromObject=function(e){if(e instanceof s.onnx.TrainingInfoProto)return e;var t=new s.onnx.TrainingInfoProto;if(null!=e.initialization){if("object"!=typeof e.initialization)throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");t.initialization=s.onnx.GraphProto.fromObject(e.initialization)}if(null!=e.algorithm){if("object"!=typeof e.algorithm)throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");t.algorithm=s.onnx.GraphProto.fromObject(e.algorithm)}if(e.initializationBinding){if(!Array.isArray(e.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");t.initializationBinding=[];for(var n=0;n<e.initializationBinding.length;++n){if("object"!=typeof e.initializationBinding[n])throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");t.initializationBinding[n]=s.onnx.StringStringEntryProto.fromObject(e.initializationBinding[n])}}if(e.updateBinding){if(!Array.isArray(e.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");t.updateBinding=[];for(var n=0;n<e.updateBinding.length;++n){if("object"!=typeof e.updateBinding[n])throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");t.updateBinding[n]=s.onnx.StringStringEntryProto.fromObject(e.updateBinding[n])}}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.initializationBinding=[],n.updateBinding=[]),t.defaults&&(n.initialization=null,n.algorithm=null),null!=e.initialization&&e.hasOwnProperty("initialization")&&(n.initialization=s.onnx.GraphProto.toObject(e.initialization,t)),null!=e.algorithm&&e.hasOwnProperty("algorithm")&&(n.algorithm=s.onnx.GraphProto.toObject(e.algorithm,t)),e.initializationBinding&&e.initializationBinding.length){n.initializationBinding=[];for(var i=0;i<e.initializationBinding.length;++i)n.initializationBinding[i]=s.onnx.StringStringEntryProto.toObject(e.initializationBinding[i],t)}if(e.updateBinding&&e.updateBinding.length){n.updateBinding=[];for(var i=0;i<e.updateBinding.length;++i)n.updateBinding[i]=s.onnx.StringStringEntryProto.toObject(e.updateBinding[i],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TrainingInfoProto"},e}(),e.ModelProto=function(){function e(e){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.irVersion=a.Long?a.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=a.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=a.Long?a.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=a.emptyArray,e.prototype.trainingInfo=a.emptyArray,e.prototype.functions=a.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.irVersion&&Object.hasOwnProperty.call(e,"irVersion")&&t.uint32(8).int64(e.irVersion),null!=e.producerName&&Object.hasOwnProperty.call(e,"producerName")&&t.uint32(18).string(e.producerName),null!=e.producerVersion&&Object.hasOwnProperty.call(e,"producerVersion")&&t.uint32(26).string(e.producerVersion),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(34).string(e.domain),null!=e.modelVersion&&Object.hasOwnProperty.call(e,"modelVersion")&&t.uint32(40).int64(e.modelVersion),null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(50).string(e.docString),null!=e.graph&&Object.hasOwnProperty.call(e,"graph")&&s.onnx.GraphProto.encode(e.graph,t.uint32(58).fork()).ldelim(),null!=e.opsetImport&&e.opsetImport.length)for(var n=0;n<e.opsetImport.length;++n)s.onnx.OperatorSetIdProto.encode(e.opsetImport[n],t.uint32(66).fork()).ldelim();if(null!=e.metadataProps&&e.metadataProps.length)for(var n=0;n<e.metadataProps.length;++n)s.onnx.StringStringEntryProto.encode(e.metadataProps[n],t.uint32(114).fork()).ldelim();if(null!=e.trainingInfo&&e.trainingInfo.length)for(var n=0;n<e.trainingInfo.length;++n)s.onnx.TrainingInfoProto.encode(e.trainingInfo[n],t.uint32(162).fork()).ldelim();if(null!=e.functions&&e.functions.length)for(var n=0;n<e.functions.length;++n)s.onnx.FunctionProto.encode(e.functions[n],t.uint32(202).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.ModelProto;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.irVersion=e.int64();break;case 8:o.opsetImport&&o.opsetImport.length||(o.opsetImport=[]),o.opsetImport.push(s.onnx.OperatorSetIdProto.decode(e,e.uint32()));break;case 2:o.producerName=e.string();break;case 3:o.producerVersion=e.string();break;case 4:o.domain=e.string();break;case 5:o.modelVersion=e.int64();break;case 6:o.docString=e.string();break;case 7:o.graph=s.onnx.GraphProto.decode(e,e.uint32());break;case 14:o.metadataProps&&o.metadataProps.length||(o.metadataProps=[]),o.metadataProps.push(s.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 20:o.trainingInfo&&o.trainingInfo.length||(o.trainingInfo=[]),o.trainingInfo.push(s.onnx.TrainingInfoProto.decode(e,e.uint32()));break;case 25:o.functions&&o.functions.length||(o.functions=[]),o.functions.push(s.onnx.FunctionProto.decode(e,e.uint32()));break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.irVersion&&e.hasOwnProperty("irVersion")&&!a.isInteger(e.irVersion)&&!(e.irVersion&&a.isInteger(e.irVersion.low)&&a.isInteger(e.irVersion.high)))return"irVersion: integer|Long expected";if(null!=e.opsetImport&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var t=0;t<e.opsetImport.length;++t){var n=s.onnx.OperatorSetIdProto.verify(e.opsetImport[t]);if(n)return"opsetImport."+n}}if(null!=e.producerName&&e.hasOwnProperty("producerName")&&!a.isString(e.producerName))return"producerName: string expected";if(null!=e.producerVersion&&e.hasOwnProperty("producerVersion")&&!a.isString(e.producerVersion))return"producerVersion: string expected";if(null!=e.domain&&e.hasOwnProperty("domain")&&!a.isString(e.domain))return"domain: string expected";if(null!=e.modelVersion&&e.hasOwnProperty("modelVersion")&&!a.isInteger(e.modelVersion)&&!(e.modelVersion&&a.isInteger(e.modelVersion.low)&&a.isInteger(e.modelVersion.high)))return"modelVersion: integer|Long expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!a.isString(e.docString))return"docString: string expected";if(null!=e.graph&&e.hasOwnProperty("graph")){var n=s.onnx.GraphProto.verify(e.graph);if(n)return"graph."+n}if(null!=e.metadataProps&&e.hasOwnProperty("metadataProps")){if(!Array.isArray(e.metadataProps))return"metadataProps: array expected";for(var t=0;t<e.metadataProps.length;++t){var n=s.onnx.StringStringEntryProto.verify(e.metadataProps[t]);if(n)return"metadataProps."+n}}if(null!=e.trainingInfo&&e.hasOwnProperty("trainingInfo")){if(!Array.isArray(e.trainingInfo))return"trainingInfo: array expected";for(var t=0;t<e.trainingInfo.length;++t){var n=s.onnx.TrainingInfoProto.verify(e.trainingInfo[t]);if(n)return"trainingInfo."+n}}if(null!=e.functions&&e.hasOwnProperty("functions")){if(!Array.isArray(e.functions))return"functions: array expected";for(var t=0;t<e.functions.length;++t){var n=s.onnx.FunctionProto.verify(e.functions[t]);if(n)return"functions."+n}}return null},e.fromObject=function(e){if(e instanceof s.onnx.ModelProto)return e;var t=new s.onnx.ModelProto;if(null!=e.irVersion&&(a.Long?(t.irVersion=a.Long.fromValue(e.irVersion)).unsigned=!1:"string"==typeof e.irVersion?t.irVersion=parseInt(e.irVersion,10):"number"==typeof e.irVersion?t.irVersion=e.irVersion:"object"==typeof e.irVersion&&(t.irVersion=new a.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber())),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");t.opsetImport=[];for(var n=0;n<e.opsetImport.length;++n){if("object"!=typeof e.opsetImport[n])throw TypeError(".onnx.ModelProto.opsetImport: object expected");t.opsetImport[n]=s.onnx.OperatorSetIdProto.fromObject(e.opsetImport[n])}}if(null!=e.producerName&&(t.producerName=String(e.producerName)),null!=e.producerVersion&&(t.producerVersion=String(e.producerVersion)),null!=e.domain&&(t.domain=String(e.domain)),null!=e.modelVersion&&(a.Long?(t.modelVersion=a.Long.fromValue(e.modelVersion)).unsigned=!1:"string"==typeof e.modelVersion?t.modelVersion=parseInt(e.modelVersion,10):"number"==typeof e.modelVersion?t.modelVersion=e.modelVersion:"object"==typeof e.modelVersion&&(t.modelVersion=new a.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber())),null!=e.docString&&(t.docString=String(e.docString)),null!=e.graph){if("object"!=typeof e.graph)throw TypeError(".onnx.ModelProto.graph: object expected");t.graph=s.onnx.GraphProto.fromObject(e.graph)}if(e.metadataProps){if(!Array.isArray(e.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");t.metadataProps=[];for(var n=0;n<e.metadataProps.length;++n){if("object"!=typeof e.metadataProps[n])throw TypeError(".onnx.ModelProto.metadataProps: object expected");t.metadataProps[n]=s.onnx.StringStringEntryProto.fromObject(e.metadataProps[n])}}if(e.trainingInfo){if(!Array.isArray(e.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");t.trainingInfo=[];for(var n=0;n<e.trainingInfo.length;++n){if("object"!=typeof e.trainingInfo[n])throw TypeError(".onnx.ModelProto.trainingInfo: object expected");t.trainingInfo[n]=s.onnx.TrainingInfoProto.fromObject(e.trainingInfo[n])}}if(e.functions){if(!Array.isArray(e.functions))throw TypeError(".onnx.ModelProto.functions: array expected");t.functions=[];for(var n=0;n<e.functions.length;++n){if("object"!=typeof e.functions[n])throw TypeError(".onnx.ModelProto.functions: object expected");t.functions[n]=s.onnx.FunctionProto.fromObject(e.functions[n])}}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.opsetImport=[],n.metadataProps=[],n.trainingInfo=[],n.functions=[]),t.defaults){if(a.Long){var i=new a.Long(0,0,!1);n.irVersion=t.longs===String?i.toString():t.longs===Number?i.toNumber():i}else n.irVersion=t.longs===String?"0":0;if(n.producerName="",n.producerVersion="",n.domain="",a.Long){var i=new a.Long(0,0,!1);n.modelVersion=t.longs===String?i.toString():t.longs===Number?i.toNumber():i}else n.modelVersion=t.longs===String?"0":0;n.docString="",n.graph=null}if(null!=e.irVersion&&e.hasOwnProperty("irVersion")&&("number"==typeof e.irVersion?n.irVersion=t.longs===String?String(e.irVersion):e.irVersion:n.irVersion=t.longs===String?a.Long.prototype.toString.call(e.irVersion):t.longs===Number?new a.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber():e.irVersion),null!=e.producerName&&e.hasOwnProperty("producerName")&&(n.producerName=e.producerName),null!=e.producerVersion&&e.hasOwnProperty("producerVersion")&&(n.producerVersion=e.producerVersion),null!=e.domain&&e.hasOwnProperty("domain")&&(n.domain=e.domain),null!=e.modelVersion&&e.hasOwnProperty("modelVersion")&&("number"==typeof e.modelVersion?n.modelVersion=t.longs===String?String(e.modelVersion):e.modelVersion:n.modelVersion=t.longs===String?a.Long.prototype.toString.call(e.modelVersion):t.longs===Number?new a.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber():e.modelVersion),null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),null!=e.graph&&e.hasOwnProperty("graph")&&(n.graph=s.onnx.GraphProto.toObject(e.graph,t)),e.opsetImport&&e.opsetImport.length){n.opsetImport=[];for(var o=0;o<e.opsetImport.length;++o)n.opsetImport[o]=s.onnx.OperatorSetIdProto.toObject(e.opsetImport[o],t)}if(e.metadataProps&&e.metadataProps.length){n.metadataProps=[];for(var o=0;o<e.metadataProps.length;++o)n.metadataProps[o]=s.onnx.StringStringEntryProto.toObject(e.metadataProps[o],t)}if(e.trainingInfo&&e.trainingInfo.length){n.trainingInfo=[];for(var o=0;o<e.trainingInfo.length;++o)n.trainingInfo[o]=s.onnx.TrainingInfoProto.toObject(e.trainingInfo[o],t)}if(e.functions&&e.functions.length){n.functions=[];for(var o=0;o<e.functions.length;++o)n.functions[o]=s.onnx.FunctionProto.toObject(e.functions[o],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.ModelProto"},e}(),e.StringStringEntryProto=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.key&&Object.hasOwnProperty.call(e,"key")&&t.uint32(10).string(e.key),null!=e.value&&Object.hasOwnProperty.call(e,"value")&&t.uint32(18).string(e.value),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.StringStringEntryProto;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.key=e.string();break;case 2:o.value=e.string();break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.key&&e.hasOwnProperty("key")&&!a.isString(e.key)?"key: string expected":null!=e.value&&e.hasOwnProperty("value")&&!a.isString(e.value)?"value: string expected":null},e.fromObject=function(e){if(e instanceof s.onnx.StringStringEntryProto)return e;var t=new s.onnx.StringStringEntryProto;return null!=e.key&&(t.key=String(e.key)),null!=e.value&&(t.value=String(e.value)),t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.key="",n.value=""),null!=e.key&&e.hasOwnProperty("key")&&(n.key=e.key),null!=e.value&&e.hasOwnProperty("value")&&(n.value=e.value),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.StringStringEntryProto"},e}(),e.TensorAnnotation=function(){function e(e){if(this.quantParameterTensorNames=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=a.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.tensorName&&Object.hasOwnProperty.call(e,"tensorName")&&t.uint32(10).string(e.tensorName),null!=e.quantParameterTensorNames&&e.quantParameterTensorNames.length)for(var n=0;n<e.quantParameterTensorNames.length;++n)s.onnx.StringStringEntryProto.encode(e.quantParameterTensorNames[n],t.uint32(18).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.TensorAnnotation;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.tensorName=e.string();break;case 2:o.quantParameterTensorNames&&o.quantParameterTensorNames.length||(o.quantParameterTensorNames=[]),o.quantParameterTensorNames.push(s.onnx.StringStringEntryProto.decode(e,e.uint32()));break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.tensorName&&e.hasOwnProperty("tensorName")&&!a.isString(e.tensorName))return"tensorName: string expected";if(null!=e.quantParameterTensorNames&&e.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(e.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var t=0;t<e.quantParameterTensorNames.length;++t){var n=s.onnx.StringStringEntryProto.verify(e.quantParameterTensorNames[t]);if(n)return"quantParameterTensorNames."+n}}return null},e.fromObject=function(e){if(e instanceof s.onnx.TensorAnnotation)return e;var t=new s.onnx.TensorAnnotation;if(null!=e.tensorName&&(t.tensorName=String(e.tensorName)),e.quantParameterTensorNames){if(!Array.isArray(e.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");t.quantParameterTensorNames=[];for(var n=0;n<e.quantParameterTensorNames.length;++n){if("object"!=typeof e.quantParameterTensorNames[n])throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");t.quantParameterTensorNames[n]=s.onnx.StringStringEntryProto.fromObject(e.quantParameterTensorNames[n])}}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.quantParameterTensorNames=[]),t.defaults&&(n.tensorName=""),null!=e.tensorName&&e.hasOwnProperty("tensorName")&&(n.tensorName=e.tensorName),e.quantParameterTensorNames&&e.quantParameterTensorNames.length){n.quantParameterTensorNames=[];for(var i=0;i<e.quantParameterTensorNames.length;++i)n.quantParameterTensorNames[i]=s.onnx.StringStringEntryProto.toObject(e.quantParameterTensorNames[i],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorAnnotation"},e}(),e.GraphProto=function(){function e(e){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.node=a.emptyArray,e.prototype.name="",e.prototype.initializer=a.emptyArray,e.prototype.sparseInitializer=a.emptyArray,e.prototype.docString="",e.prototype.input=a.emptyArray,e.prototype.output=a.emptyArray,e.prototype.valueInfo=a.emptyArray,e.prototype.quantizationAnnotation=a.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.node&&e.node.length)for(var n=0;n<e.node.length;++n)s.onnx.NodeProto.encode(e.node[n],t.uint32(10).fork()).ldelim();if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(18).string(e.name),null!=e.initializer&&e.initializer.length)for(var n=0;n<e.initializer.length;++n)s.onnx.TensorProto.encode(e.initializer[n],t.uint32(42).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(82).string(e.docString),null!=e.input&&e.input.length)for(var n=0;n<e.input.length;++n)s.onnx.ValueInfoProto.encode(e.input[n],t.uint32(90).fork()).ldelim();if(null!=e.output&&e.output.length)for(var n=0;n<e.output.length;++n)s.onnx.ValueInfoProto.encode(e.output[n],t.uint32(98).fork()).ldelim();if(null!=e.valueInfo&&e.valueInfo.length)for(var n=0;n<e.valueInfo.length;++n)s.onnx.ValueInfoProto.encode(e.valueInfo[n],t.uint32(106).fork()).ldelim();if(null!=e.quantizationAnnotation&&e.quantizationAnnotation.length)for(var n=0;n<e.quantizationAnnotation.length;++n)s.onnx.TensorAnnotation.encode(e.quantizationAnnotation[n],t.uint32(114).fork()).ldelim();if(null!=e.sparseInitializer&&e.sparseInitializer.length)for(var n=0;n<e.sparseInitializer.length;++n)s.onnx.SparseTensorProto.encode(e.sparseInitializer[n],t.uint32(122).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.GraphProto;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.node&&o.node.length||(o.node=[]),o.node.push(s.onnx.NodeProto.decode(e,e.uint32()));break;case 2:o.name=e.string();break;case 5:o.initializer&&o.initializer.length||(o.initializer=[]),o.initializer.push(s.onnx.TensorProto.decode(e,e.uint32()));break;case 15:o.sparseInitializer&&o.sparseInitializer.length||(o.sparseInitializer=[]),o.sparseInitializer.push(s.onnx.SparseTensorProto.decode(e,e.uint32()));break;case 10:o.docString=e.string();break;case 11:o.input&&o.input.length||(o.input=[]),o.input.push(s.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 12:o.output&&o.output.length||(o.output=[]),o.output.push(s.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 13:o.valueInfo&&o.valueInfo.length||(o.valueInfo=[]),o.valueInfo.push(s.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 14:o.quantizationAnnotation&&o.quantizationAnnotation.length||(o.quantizationAnnotation=[]),o.quantizationAnnotation.push(s.onnx.TensorAnnotation.decode(e,e.uint32()));break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.node&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var t=0;t<e.node.length;++t){var n=s.onnx.NodeProto.verify(e.node[t]);if(n)return"node."+n}}if(null!=e.name&&e.hasOwnProperty("name")&&!a.isString(e.name))return"name: string expected";if(null!=e.initializer&&e.hasOwnProperty("initializer")){if(!Array.isArray(e.initializer))return"initializer: array expected";for(var t=0;t<e.initializer.length;++t){var n=s.onnx.TensorProto.verify(e.initializer[t]);if(n)return"initializer."+n}}if(null!=e.sparseInitializer&&e.hasOwnProperty("sparseInitializer")){if(!Array.isArray(e.sparseInitializer))return"sparseInitializer: array expected";for(var t=0;t<e.sparseInitializer.length;++t){var n=s.onnx.SparseTensorProto.verify(e.sparseInitializer[t]);if(n)return"sparseInitializer."+n}}if(null!=e.docString&&e.hasOwnProperty("docString")&&!a.isString(e.docString))return"docString: string expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t){var n=s.onnx.ValueInfoProto.verify(e.input[t]);if(n)return"input."+n}}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t){var n=s.onnx.ValueInfoProto.verify(e.output[t]);if(n)return"output."+n}}if(null!=e.valueInfo&&e.hasOwnProperty("valueInfo")){if(!Array.isArray(e.valueInfo))return"valueInfo: array expected";for(var t=0;t<e.valueInfo.length;++t){var n=s.onnx.ValueInfoProto.verify(e.valueInfo[t]);if(n)return"valueInfo."+n}}if(null!=e.quantizationAnnotation&&e.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(e.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var t=0;t<e.quantizationAnnotation.length;++t){var n=s.onnx.TensorAnnotation.verify(e.quantizationAnnotation[t]);if(n)return"quantizationAnnotation."+n}}return null},e.fromObject=function(e){if(e instanceof s.onnx.GraphProto)return e;var t=new s.onnx.GraphProto;if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.GraphProto.node: array expected");t.node=[];for(var n=0;n<e.node.length;++n){if("object"!=typeof e.node[n])throw TypeError(".onnx.GraphProto.node: object expected");t.node[n]=s.onnx.NodeProto.fromObject(e.node[n])}}if(null!=e.name&&(t.name=String(e.name)),e.initializer){if(!Array.isArray(e.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");t.initializer=[];for(var n=0;n<e.initializer.length;++n){if("object"!=typeof e.initializer[n])throw TypeError(".onnx.GraphProto.initializer: object expected");t.initializer[n]=s.onnx.TensorProto.fromObject(e.initializer[n])}}if(e.sparseInitializer){if(!Array.isArray(e.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");t.sparseInitializer=[];for(var n=0;n<e.sparseInitializer.length;++n){if("object"!=typeof e.sparseInitializer[n])throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");t.sparseInitializer[n]=s.onnx.SparseTensorProto.fromObject(e.sparseInitializer[n])}}if(null!=e.docString&&(t.docString=String(e.docString)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.GraphProto.input: array expected");t.input=[];for(var n=0;n<e.input.length;++n){if("object"!=typeof e.input[n])throw TypeError(".onnx.GraphProto.input: object expected");t.input[n]=s.onnx.ValueInfoProto.fromObject(e.input[n])}}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.GraphProto.output: array expected");t.output=[];for(var n=0;n<e.output.length;++n){if("object"!=typeof e.output[n])throw TypeError(".onnx.GraphProto.output: object expected");t.output[n]=s.onnx.ValueInfoProto.fromObject(e.output[n])}}if(e.valueInfo){if(!Array.isArray(e.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");t.valueInfo=[];for(var n=0;n<e.valueInfo.length;++n){if("object"!=typeof e.valueInfo[n])throw TypeError(".onnx.GraphProto.valueInfo: object expected");t.valueInfo[n]=s.onnx.ValueInfoProto.fromObject(e.valueInfo[n])}}if(e.quantizationAnnotation){if(!Array.isArray(e.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");t.quantizationAnnotation=[];for(var n=0;n<e.quantizationAnnotation.length;++n){if("object"!=typeof e.quantizationAnnotation[n])throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");t.quantizationAnnotation[n]=s.onnx.TensorAnnotation.fromObject(e.quantizationAnnotation[n])}}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.node=[],n.initializer=[],n.input=[],n.output=[],n.valueInfo=[],n.quantizationAnnotation=[],n.sparseInitializer=[]),t.defaults&&(n.name="",n.docString=""),e.node&&e.node.length){n.node=[];for(var i=0;i<e.node.length;++i)n.node[i]=s.onnx.NodeProto.toObject(e.node[i],t)}if(null!=e.name&&e.hasOwnProperty("name")&&(n.name=e.name),e.initializer&&e.initializer.length){n.initializer=[];for(var i=0;i<e.initializer.length;++i)n.initializer[i]=s.onnx.TensorProto.toObject(e.initializer[i],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.input&&e.input.length){n.input=[];for(var i=0;i<e.input.length;++i)n.input[i]=s.onnx.ValueInfoProto.toObject(e.input[i],t)}if(e.output&&e.output.length){n.output=[];for(var i=0;i<e.output.length;++i)n.output[i]=s.onnx.ValueInfoProto.toObject(e.output[i],t)}if(e.valueInfo&&e.valueInfo.length){n.valueInfo=[];for(var i=0;i<e.valueInfo.length;++i)n.valueInfo[i]=s.onnx.ValueInfoProto.toObject(e.valueInfo[i],t)}if(e.quantizationAnnotation&&e.quantizationAnnotation.length){n.quantizationAnnotation=[];for(var i=0;i<e.quantizationAnnotation.length;++i)n.quantizationAnnotation[i]=s.onnx.TensorAnnotation.toObject(e.quantizationAnnotation[i],t)}if(e.sparseInitializer&&e.sparseInitializer.length){n.sparseInitializer=[];for(var i=0;i<e.sparseInitializer.length;++i)n.sparseInitializer[i]=s.onnx.SparseTensorProto.toObject(e.sparseInitializer[i],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.GraphProto"},e}(),e.TensorProto=function(){function e(e){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.dims=a.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=a.emptyArray,e.prototype.int32Data=a.emptyArray,e.prototype.stringData=a.emptyArray,e.prototype.int64Data=a.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=a.newBuffer([]),e.prototype.externalData=a.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=a.emptyArray,e.prototype.uint64Data=a.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.dims&&e.dims.length){t.uint32(10).fork();for(var n=0;n<e.dims.length;++n)t.int64(e.dims[n]);t.ldelim()}if(null!=e.dataType&&Object.hasOwnProperty.call(e,"dataType")&&t.uint32(16).int32(e.dataType),null!=e.segment&&Object.hasOwnProperty.call(e,"segment")&&s.onnx.TensorProto.Segment.encode(e.segment,t.uint32(26).fork()).ldelim(),null!=e.floatData&&e.floatData.length){t.uint32(34).fork();for(var n=0;n<e.floatData.length;++n)t.float(e.floatData[n]);t.ldelim()}if(null!=e.int32Data&&e.int32Data.length){t.uint32(42).fork();for(var n=0;n<e.int32Data.length;++n)t.int32(e.int32Data[n]);t.ldelim()}if(null!=e.stringData&&e.stringData.length)for(var n=0;n<e.stringData.length;++n)t.uint32(50).bytes(e.stringData[n]);if(null!=e.int64Data&&e.int64Data.length){t.uint32(58).fork();for(var n=0;n<e.int64Data.length;++n)t.int64(e.int64Data[n]);t.ldelim()}if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(66).string(e.name),null!=e.rawData&&Object.hasOwnProperty.call(e,"rawData")&&t.uint32(74).bytes(e.rawData),null!=e.doubleData&&e.doubleData.length){t.uint32(82).fork();for(var n=0;n<e.doubleData.length;++n)t.double(e.doubleData[n]);t.ldelim()}if(null!=e.uint64Data&&e.uint64Data.length){t.uint32(90).fork();for(var n=0;n<e.uint64Data.length;++n)t.uint64(e.uint64Data[n]);t.ldelim()}if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(98).string(e.docString),null!=e.externalData&&e.externalData.length)for(var n=0;n<e.externalData.length;++n)s.onnx.StringStringEntryProto.encode(e.externalData[n],t.uint32(106).fork()).ldelim();return null!=e.dataLocation&&Object.hasOwnProperty.call(e,"dataLocation")&&t.uint32(112).int32(e.dataLocation),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.TensorProto;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:if(o.dims&&o.dims.length||(o.dims=[]),(7&a)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.dims.push(e.int64());else o.dims.push(e.int64());break;case 2:o.dataType=e.int32();break;case 3:o.segment=s.onnx.TensorProto.Segment.decode(e,e.uint32());break;case 4:if(o.floatData&&o.floatData.length||(o.floatData=[]),(7&a)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.floatData.push(e.float());else o.floatData.push(e.float());break;case 5:if(o.int32Data&&o.int32Data.length||(o.int32Data=[]),(7&a)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.int32Data.push(e.int32());else o.int32Data.push(e.int32());break;case 6:o.stringData&&o.stringData.length||(o.stringData=[]),o.stringData.push(e.bytes());break;case 7:if(o.int64Data&&o.int64Data.length||(o.int64Data=[]),(7&a)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.int64Data.push(e.int64());else o.int64Data.push(e.int64());break;case 8:o.name=e.string();break;case 12:o.docString=e.string();break;case 9:o.rawData=e.bytes();break;case 13:o.externalData&&o.externalData.length||(o.externalData=[]),o.externalData.push(s.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 14:o.dataLocation=e.int32();break;case 10:if(o.doubleData&&o.doubleData.length||(o.doubleData=[]),(7&a)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.doubleData.push(e.double());else o.doubleData.push(e.double());break;case 11:if(o.uint64Data&&o.uint64Data.length||(o.uint64Data=[]),(7&a)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.uint64Data.push(e.uint64());else o.uint64Data.push(e.uint64());break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.dims&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var t=0;t<e.dims.length;++t)if(!a.isInteger(e.dims[t])&&!(e.dims[t]&&a.isInteger(e.dims[t].low)&&a.isInteger(e.dims[t].high)))return"dims: integer|Long[] expected"}if(null!=e.dataType&&e.hasOwnProperty("dataType")&&!a.isInteger(e.dataType))return"dataType: integer expected";if(null!=e.segment&&e.hasOwnProperty("segment")){var n=s.onnx.TensorProto.Segment.verify(e.segment);if(n)return"segment."+n}if(null!=e.floatData&&e.hasOwnProperty("floatData")){if(!Array.isArray(e.floatData))return"floatData: array expected";for(var t=0;t<e.floatData.length;++t)if("number"!=typeof e.floatData[t])return"floatData: number[] expected"}if(null!=e.int32Data&&e.hasOwnProperty("int32Data")){if(!Array.isArray(e.int32Data))return"int32Data: array expected";for(var t=0;t<e.int32Data.length;++t)if(!a.isInteger(e.int32Data[t]))return"int32Data: integer[] expected"}if(null!=e.stringData&&e.hasOwnProperty("stringData")){if(!Array.isArray(e.stringData))return"stringData: array expected";for(var t=0;t<e.stringData.length;++t)if(!(e.stringData[t]&&"number"==typeof e.stringData[t].length||a.isString(e.stringData[t])))return"stringData: buffer[] expected"}if(null!=e.int64Data&&e.hasOwnProperty("int64Data")){if(!Array.isArray(e.int64Data))return"int64Data: array expected";for(var t=0;t<e.int64Data.length;++t)if(!a.isInteger(e.int64Data[t])&&!(e.int64Data[t]&&a.isInteger(e.int64Data[t].low)&&a.isInteger(e.int64Data[t].high)))return"int64Data: integer|Long[] expected"}if(null!=e.name&&e.hasOwnProperty("name")&&!a.isString(e.name))return"name: string expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!a.isString(e.docString))return"docString: string expected";if(null!=e.rawData&&e.hasOwnProperty("rawData")&&!(e.rawData&&"number"==typeof e.rawData.length||a.isString(e.rawData)))return"rawData: buffer expected";if(null!=e.externalData&&e.hasOwnProperty("externalData")){if(!Array.isArray(e.externalData))return"externalData: array expected";for(var t=0;t<e.externalData.length;++t){var n=s.onnx.StringStringEntryProto.verify(e.externalData[t]);if(n)return"externalData."+n}}if(null!=e.dataLocation&&e.hasOwnProperty("dataLocation"))switch(e.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:}if(null!=e.doubleData&&e.hasOwnProperty("doubleData")){if(!Array.isArray(e.doubleData))return"doubleData: array expected";for(var t=0;t<e.doubleData.length;++t)if("number"!=typeof e.doubleData[t])return"doubleData: number[] expected"}if(null!=e.uint64Data&&e.hasOwnProperty("uint64Data")){if(!Array.isArray(e.uint64Data))return"uint64Data: array expected";for(var t=0;t<e.uint64Data.length;++t)if(!a.isInteger(e.uint64Data[t])&&!(e.uint64Data[t]&&a.isInteger(e.uint64Data[t].low)&&a.isInteger(e.uint64Data[t].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(e){if(e instanceof s.onnx.TensorProto)return e;var t=new s.onnx.TensorProto;if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.TensorProto.dims: array expected");t.dims=[];for(var n=0;n<e.dims.length;++n)a.Long?(t.dims[n]=a.Long.fromValue(e.dims[n])).unsigned=!1:"string"==typeof e.dims[n]?t.dims[n]=parseInt(e.dims[n],10):"number"==typeof e.dims[n]?t.dims[n]=e.dims[n]:"object"==typeof e.dims[n]&&(t.dims[n]=new a.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber())}if(null!=e.dataType&&(t.dataType=0|e.dataType),null!=e.segment){if("object"!=typeof e.segment)throw TypeError(".onnx.TensorProto.segment: object expected");t.segment=s.onnx.TensorProto.Segment.fromObject(e.segment)}if(e.floatData){if(!Array.isArray(e.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");t.floatData=[];for(var n=0;n<e.floatData.length;++n)t.floatData[n]=Number(e.floatData[n])}if(e.int32Data){if(!Array.isArray(e.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");t.int32Data=[];for(var n=0;n<e.int32Data.length;++n)t.int32Data[n]=0|e.int32Data[n]}if(e.stringData){if(!Array.isArray(e.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");t.stringData=[];for(var n=0;n<e.stringData.length;++n)"string"==typeof e.stringData[n]?a.base64.decode(e.stringData[n],t.stringData[n]=a.newBuffer(a.base64.length(e.stringData[n])),0):e.stringData[n].length>=0&&(t.stringData[n]=e.stringData[n])}if(e.int64Data){if(!Array.isArray(e.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");t.int64Data=[];for(var n=0;n<e.int64Data.length;++n)a.Long?(t.int64Data[n]=a.Long.fromValue(e.int64Data[n])).unsigned=!1:"string"==typeof e.int64Data[n]?t.int64Data[n]=parseInt(e.int64Data[n],10):"number"==typeof e.int64Data[n]?t.int64Data[n]=e.int64Data[n]:"object"==typeof e.int64Data[n]&&(t.int64Data[n]=new a.LongBits(e.int64Data[n].low>>>0,e.int64Data[n].high>>>0).toNumber())}if(null!=e.name&&(t.name=String(e.name)),null!=e.docString&&(t.docString=String(e.docString)),null!=e.rawData&&("string"==typeof e.rawData?a.base64.decode(e.rawData,t.rawData=a.newBuffer(a.base64.length(e.rawData)),0):e.rawData.length>=0&&(t.rawData=e.rawData)),e.externalData){if(!Array.isArray(e.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");t.externalData=[];for(var n=0;n<e.externalData.length;++n){if("object"!=typeof e.externalData[n])throw TypeError(".onnx.TensorProto.externalData: object expected");t.externalData[n]=s.onnx.StringStringEntryProto.fromObject(e.externalData[n])}}switch(e.dataLocation){default:"number"==typeof e.dataLocation&&(t.dataLocation=e.dataLocation);break;case"DEFAULT":case 0:t.dataLocation=0;break;case"EXTERNAL":case 1:t.dataLocation=1}if(e.doubleData){if(!Array.isArray(e.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");t.doubleData=[];for(var n=0;n<e.doubleData.length;++n)t.doubleData[n]=Number(e.doubleData[n])}if(e.uint64Data){if(!Array.isArray(e.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");t.uint64Data=[];for(var n=0;n<e.uint64Data.length;++n)a.Long?(t.uint64Data[n]=a.Long.fromValue(e.uint64Data[n])).unsigned=!0:"string"==typeof e.uint64Data[n]?t.uint64Data[n]=parseInt(e.uint64Data[n],10):"number"==typeof e.uint64Data[n]?t.uint64Data[n]=e.uint64Data[n]:"object"==typeof e.uint64Data[n]&&(t.uint64Data[n]=new a.LongBits(e.uint64Data[n].low>>>0,e.uint64Data[n].high>>>0).toNumber(!0))}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.dims=[],n.floatData=[],n.int32Data=[],n.stringData=[],n.int64Data=[],n.doubleData=[],n.uint64Data=[],n.externalData=[]),t.defaults&&(n.dataType=0,n.segment=null,n.name="",t.bytes===String?n.rawData="":(n.rawData=[],t.bytes!==Array&&(n.rawData=a.newBuffer(n.rawData))),n.docString="",n.dataLocation=t.enums===String?"DEFAULT":0),e.dims&&e.dims.length){n.dims=[];for(var i=0;i<e.dims.length;++i)"number"==typeof e.dims[i]?n.dims[i]=t.longs===String?String(e.dims[i]):e.dims[i]:n.dims[i]=t.longs===String?a.Long.prototype.toString.call(e.dims[i]):t.longs===Number?new a.LongBits(e.dims[i].low>>>0,e.dims[i].high>>>0).toNumber():e.dims[i]}if(null!=e.dataType&&e.hasOwnProperty("dataType")&&(n.dataType=e.dataType),null!=e.segment&&e.hasOwnProperty("segment")&&(n.segment=s.onnx.TensorProto.Segment.toObject(e.segment,t)),e.floatData&&e.floatData.length){n.floatData=[];for(var i=0;i<e.floatData.length;++i)n.floatData[i]=t.json&&!isFinite(e.floatData[i])?String(e.floatData[i]):e.floatData[i]}if(e.int32Data&&e.int32Data.length){n.int32Data=[];for(var i=0;i<e.int32Data.length;++i)n.int32Data[i]=e.int32Data[i]}if(e.stringData&&e.stringData.length){n.stringData=[];for(var i=0;i<e.stringData.length;++i)n.stringData[i]=t.bytes===String?a.base64.encode(e.stringData[i],0,e.stringData[i].length):t.bytes===Array?Array.prototype.slice.call(e.stringData[i]):e.stringData[i]}if(e.int64Data&&e.int64Data.length){n.int64Data=[];for(var i=0;i<e.int64Data.length;++i)"number"==typeof e.int64Data[i]?n.int64Data[i]=t.longs===String?String(e.int64Data[i]):e.int64Data[i]:n.int64Data[i]=t.longs===String?a.Long.prototype.toString.call(e.int64Data[i]):t.longs===Number?new a.LongBits(e.int64Data[i].low>>>0,e.int64Data[i].high>>>0).toNumber():e.int64Data[i]}if(null!=e.name&&e.hasOwnProperty("name")&&(n.name=e.name),null!=e.rawData&&e.hasOwnProperty("rawData")&&(n.rawData=t.bytes===String?a.base64.encode(e.rawData,0,e.rawData.length):t.bytes===Array?Array.prototype.slice.call(e.rawData):e.rawData),e.doubleData&&e.doubleData.length){n.doubleData=[];for(var i=0;i<e.doubleData.length;++i)n.doubleData[i]=t.json&&!isFinite(e.doubleData[i])?String(e.doubleData[i]):e.doubleData[i]}if(e.uint64Data&&e.uint64Data.length){n.uint64Data=[];for(var i=0;i<e.uint64Data.length;++i)"number"==typeof e.uint64Data[i]?n.uint64Data[i]=t.longs===String?String(e.uint64Data[i]):e.uint64Data[i]:n.uint64Data[i]=t.longs===String?a.Long.prototype.toString.call(e.uint64Data[i]):t.longs===Number?new a.LongBits(e.uint64Data[i].low>>>0,e.uint64Data[i].high>>>0).toNumber(!0):e.uint64Data[i]}if(null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.externalData&&e.externalData.length){n.externalData=[];for(var i=0;i<e.externalData.length;++i)n.externalData[i]=s.onnx.StringStringEntryProto.toObject(e.externalData[i],t)}return null!=e.dataLocation&&e.hasOwnProperty("dataLocation")&&(n.dataLocation=t.enums===String?void 0===s.onnx.TensorProto.DataLocation[e.dataLocation]?e.dataLocation:s.onnx.TensorProto.DataLocation[e.dataLocation]:e.dataLocation),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorProto"},e.DataType=function(){var e={},t=Object.create(e);return t[e[0]="UNDEFINED"]=0,t[e[1]="FLOAT"]=1,t[e[2]="UINT8"]=2,t[e[3]="INT8"]=3,t[e[4]="UINT16"]=4,t[e[5]="INT16"]=5,t[e[6]="INT32"]=6,t[e[7]="INT64"]=7,t[e[8]="STRING"]=8,t[e[9]="BOOL"]=9,t[e[10]="FLOAT16"]=10,t[e[11]="DOUBLE"]=11,t[e[12]="UINT32"]=12,t[e[13]="UINT64"]=13,t[e[14]="COMPLEX64"]=14,t[e[15]="COMPLEX128"]=15,t[e[16]="BFLOAT16"]=16,t[e[17]="FLOAT8E4M3FN"]=17,t[e[18]="FLOAT8E4M3FNUZ"]=18,t[e[19]="FLOAT8E5M2"]=19,t[e[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.begin=a.Long?a.Long.fromBits(0,0,!1):0,e.prototype.end=a.Long?a.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.begin&&Object.hasOwnProperty.call(e,"begin")&&t.uint32(8).int64(e.begin),null!=e.end&&Object.hasOwnProperty.call(e,"end")&&t.uint32(16).int64(e.end),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.TensorProto.Segment;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.begin=e.int64();break;case 2:o.end=e.int64();break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.begin&&e.hasOwnProperty("begin")&&!a.isInteger(e.begin)&&!(e.begin&&a.isInteger(e.begin.low)&&a.isInteger(e.begin.high))?"begin: integer|Long expected":null!=e.end&&e.hasOwnProperty("end")&&!a.isInteger(e.end)&&!(e.end&&a.isInteger(e.end.low)&&a.isInteger(e.end.high))?"end: integer|Long expected":null},e.fromObject=function(e){if(e instanceof s.onnx.TensorProto.Segment)return e;var t=new s.onnx.TensorProto.Segment;return null!=e.begin&&(a.Long?(t.begin=a.Long.fromValue(e.begin)).unsigned=!1:"string"==typeof e.begin?t.begin=parseInt(e.begin,10):"number"==typeof e.begin?t.begin=e.begin:"object"==typeof e.begin&&(t.begin=new a.LongBits(e.begin.low>>>0,e.begin.high>>>0).toNumber())),null!=e.end&&(a.Long?(t.end=a.Long.fromValue(e.end)).unsigned=!1:"string"==typeof e.end?t.end=parseInt(e.end,10):"number"==typeof e.end?t.end=e.end:"object"==typeof e.end&&(t.end=new a.LongBits(e.end.low>>>0,e.end.high>>>0).toNumber())),t},e.toObject=function(e,t){t||(t={});var n={};if(t.defaults){if(a.Long){var i=new a.Long(0,0,!1);n.begin=t.longs===String?i.toString():t.longs===Number?i.toNumber():i}else n.begin=t.longs===String?"0":0;if(a.Long){var i=new a.Long(0,0,!1);n.end=t.longs===String?i.toString():t.longs===Number?i.toNumber():i}else n.end=t.longs===String?"0":0}return null!=e.begin&&e.hasOwnProperty("begin")&&("number"==typeof e.begin?n.begin=t.longs===String?String(e.begin):e.begin:n.begin=t.longs===String?a.Long.prototype.toString.call(e.begin):t.longs===Number?new a.LongBits(e.begin.low>>>0,e.begin.high>>>0).toNumber():e.begin),null!=e.end&&e.hasOwnProperty("end")&&("number"==typeof e.end?n.end=t.longs===String?String(e.end):e.end:n.end=t.longs===String?a.Long.prototype.toString.call(e.end):t.longs===Number?new a.LongBits(e.end.low>>>0,e.end.high>>>0).toNumber():e.end),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorProto.Segment"},e}(),e.DataLocation=function(){var e={},t=Object.create(e);return t[e[0]="DEFAULT"]=0,t[e[1]="EXTERNAL"]=1,t}(),e}(),e.SparseTensorProto=function(){function e(e){if(this.dims=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=a.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.values&&Object.hasOwnProperty.call(e,"values")&&s.onnx.TensorProto.encode(e.values,t.uint32(10).fork()).ldelim(),null!=e.indices&&Object.hasOwnProperty.call(e,"indices")&&s.onnx.TensorProto.encode(e.indices,t.uint32(18).fork()).ldelim(),null!=e.dims&&e.dims.length){t.uint32(26).fork();for(var n=0;n<e.dims.length;++n)t.int64(e.dims[n]);t.ldelim()}return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.SparseTensorProto;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.values=s.onnx.TensorProto.decode(e,e.uint32());break;case 2:o.indices=s.onnx.TensorProto.decode(e,e.uint32());break;case 3:if(o.dims&&o.dims.length||(o.dims=[]),(7&a)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.dims.push(e.int64());else o.dims.push(e.int64());break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.values&&e.hasOwnProperty("values")){var t=s.onnx.TensorProto.verify(e.values);if(t)return"values."+t}if(null!=e.indices&&e.hasOwnProperty("indices")){var t=s.onnx.TensorProto.verify(e.indices);if(t)return"indices."+t}if(null!=e.dims&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var n=0;n<e.dims.length;++n)if(!a.isInteger(e.dims[n])&&!(e.dims[n]&&a.isInteger(e.dims[n].low)&&a.isInteger(e.dims[n].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(e){if(e instanceof s.onnx.SparseTensorProto)return e;var t=new s.onnx.SparseTensorProto;if(null!=e.values){if("object"!=typeof e.values)throw TypeError(".onnx.SparseTensorProto.values: object expected");t.values=s.onnx.TensorProto.fromObject(e.values)}if(null!=e.indices){if("object"!=typeof e.indices)throw TypeError(".onnx.SparseTensorProto.indices: object expected");t.indices=s.onnx.TensorProto.fromObject(e.indices)}if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");t.dims=[];for(var n=0;n<e.dims.length;++n)a.Long?(t.dims[n]=a.Long.fromValue(e.dims[n])).unsigned=!1:"string"==typeof e.dims[n]?t.dims[n]=parseInt(e.dims[n],10):"number"==typeof e.dims[n]?t.dims[n]=e.dims[n]:"object"==typeof e.dims[n]&&(t.dims[n]=new a.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber())}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.dims=[]),t.defaults&&(n.values=null,n.indices=null),null!=e.values&&e.hasOwnProperty("values")&&(n.values=s.onnx.TensorProto.toObject(e.values,t)),null!=e.indices&&e.hasOwnProperty("indices")&&(n.indices=s.onnx.TensorProto.toObject(e.indices,t)),e.dims&&e.dims.length){n.dims=[];for(var i=0;i<e.dims.length;++i)"number"==typeof e.dims[i]?n.dims[i]=t.longs===String?String(e.dims[i]):e.dims[i]:n.dims[i]=t.longs===String?a.Long.prototype.toString.call(e.dims[i]):t.longs===Number?new a.LongBits(e.dims[i].low>>>0,e.dims[i].high>>>0).toNumber():e.dims[i]}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.SparseTensorProto"},e}(),e.TensorShapeProto=function(){function e(e){if(this.dim=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.dim=a.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.dim&&e.dim.length)for(var n=0;n<e.dim.length;++n)s.onnx.TensorShapeProto.Dimension.encode(e.dim[n],t.uint32(10).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.TensorShapeProto;e.pos<n;){var a=e.uint32();a>>>3==1?(o.dim&&o.dim.length||(o.dim=[]),o.dim.push(s.onnx.TensorShapeProto.Dimension.decode(e,e.uint32()))):e.skipType(7&a)}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.dim&&e.hasOwnProperty("dim")){if(!Array.isArray(e.dim))return"dim: array expected";for(var t=0;t<e.dim.length;++t){var n=s.onnx.TensorShapeProto.Dimension.verify(e.dim[t]);if(n)return"dim."+n}}return null},e.fromObject=function(e){if(e instanceof s.onnx.TensorShapeProto)return e;var t=new s.onnx.TensorShapeProto;if(e.dim){if(!Array.isArray(e.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");t.dim=[];for(var n=0;n<e.dim.length;++n){if("object"!=typeof e.dim[n])throw TypeError(".onnx.TensorShapeProto.dim: object expected");t.dim[n]=s.onnx.TensorShapeProto.Dimension.fromObject(e.dim[n])}}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.dim=[]),e.dim&&e.dim.length){n.dim=[];for(var i=0;i<e.dim.length;++i)n.dim[i]=s.onnx.TensorShapeProto.Dimension.toObject(e.dim[i],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorShapeProto"},e.Dimension=function(){var e;function t(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return t.prototype.dimValue=null,t.prototype.dimParam=null,t.prototype.denotation="",Object.defineProperty(t.prototype,"value",{get:a.oneOfGetter(e=["dimValue","dimParam"]),set:a.oneOfSetter(e)}),t.create=function(e){return new t(e)},t.encode=function(e,t){return t||(t=o.create()),null!=e.dimValue&&Object.hasOwnProperty.call(e,"dimValue")&&t.uint32(8).int64(e.dimValue),null!=e.dimParam&&Object.hasOwnProperty.call(e,"dimParam")&&t.uint32(18).string(e.dimParam),null!=e.denotation&&Object.hasOwnProperty.call(e,"denotation")&&t.uint32(26).string(e.denotation),t},t.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},t.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.TensorShapeProto.Dimension;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.dimValue=e.int64();break;case 2:o.dimParam=e.string();break;case 3:o.denotation=e.string();break;default:e.skipType(7&a)}}return o},t.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},t.verify=function(e){if("object"!=typeof e||null===e)return"object expected";var t={};if(null!=e.dimValue&&e.hasOwnProperty("dimValue")&&(t.value=1,!a.isInteger(e.dimValue)&&!(e.dimValue&&a.isInteger(e.dimValue.low)&&a.isInteger(e.dimValue.high))))return"dimValue: integer|Long expected";if(null!=e.dimParam&&e.hasOwnProperty("dimParam")){if(1===t.value)return"value: multiple values";if(t.value=1,!a.isString(e.dimParam))return"dimParam: string expected"}return null!=e.denotation&&e.hasOwnProperty("denotation")&&!a.isString(e.denotation)?"denotation: string expected":null},t.fromObject=function(e){if(e instanceof s.onnx.TensorShapeProto.Dimension)return e;var t=new s.onnx.TensorShapeProto.Dimension;return null!=e.dimValue&&(a.Long?(t.dimValue=a.Long.fromValue(e.dimValue)).unsigned=!1:"string"==typeof e.dimValue?t.dimValue=parseInt(e.dimValue,10):"number"==typeof e.dimValue?t.dimValue=e.dimValue:"object"==typeof e.dimValue&&(t.dimValue=new a.LongBits(e.dimValue.low>>>0,e.dimValue.high>>>0).toNumber())),null!=e.dimParam&&(t.dimParam=String(e.dimParam)),null!=e.denotation&&(t.denotation=String(e.denotation)),t},t.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.denotation=""),null!=e.dimValue&&e.hasOwnProperty("dimValue")&&("number"==typeof e.dimValue?n.dimValue=t.longs===String?String(e.dimValue):e.dimValue:n.dimValue=t.longs===String?a.Long.prototype.toString.call(e.dimValue):t.longs===Number?new a.LongBits(e.dimValue.low>>>0,e.dimValue.high>>>0).toNumber():e.dimValue,t.oneofs&&(n.value="dimValue")),null!=e.dimParam&&e.hasOwnProperty("dimParam")&&(n.dimParam=e.dimParam,t.oneofs&&(n.value="dimParam")),null!=e.denotation&&e.hasOwnProperty("denotation")&&(n.denotation=e.denotation),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},t.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorShapeProto.Dimension"},t}(),e}(),e.TypeProto=function(){var e;function t(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return t.prototype.tensorType=null,t.prototype.sequenceType=null,t.prototype.mapType=null,t.prototype.optionalType=null,t.prototype.sparseTensorType=null,t.prototype.denotation="",Object.defineProperty(t.prototype,"value",{get:a.oneOfGetter(e=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:a.oneOfSetter(e)}),t.create=function(e){return new t(e)},t.encode=function(e,t){return t||(t=o.create()),null!=e.tensorType&&Object.hasOwnProperty.call(e,"tensorType")&&s.onnx.TypeProto.Tensor.encode(e.tensorType,t.uint32(10).fork()).ldelim(),null!=e.sequenceType&&Object.hasOwnProperty.call(e,"sequenceType")&&s.onnx.TypeProto.Sequence.encode(e.sequenceType,t.uint32(34).fork()).ldelim(),null!=e.mapType&&Object.hasOwnProperty.call(e,"mapType")&&s.onnx.TypeProto.Map.encode(e.mapType,t.uint32(42).fork()).ldelim(),null!=e.denotation&&Object.hasOwnProperty.call(e,"denotation")&&t.uint32(50).string(e.denotation),null!=e.sparseTensorType&&Object.hasOwnProperty.call(e,"sparseTensorType")&&s.onnx.TypeProto.SparseTensor.encode(e.sparseTensorType,t.uint32(66).fork()).ldelim(),null!=e.optionalType&&Object.hasOwnProperty.call(e,"optionalType")&&s.onnx.TypeProto.Optional.encode(e.optionalType,t.uint32(74).fork()).ldelim(),t},t.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},t.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.TypeProto;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.tensorType=s.onnx.TypeProto.Tensor.decode(e,e.uint32());break;case 4:o.sequenceType=s.onnx.TypeProto.Sequence.decode(e,e.uint32());break;case 5:o.mapType=s.onnx.TypeProto.Map.decode(e,e.uint32());break;case 9:o.optionalType=s.onnx.TypeProto.Optional.decode(e,e.uint32());break;case 8:o.sparseTensorType=s.onnx.TypeProto.SparseTensor.decode(e,e.uint32());break;case 6:o.denotation=e.string();break;default:e.skipType(7&a)}}return o},t.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},t.verify=function(e){if("object"!=typeof e||null===e)return"object expected";var t={};if(null!=e.tensorType&&e.hasOwnProperty("tensorType")){t.value=1;var n=s.onnx.TypeProto.Tensor.verify(e.tensorType);if(n)return"tensorType."+n}if(null!=e.sequenceType&&e.hasOwnProperty("sequenceType")){if(1===t.value)return"value: multiple values";t.value=1;var n=s.onnx.TypeProto.Sequence.verify(e.sequenceType);if(n)return"sequenceType."+n}if(null!=e.mapType&&e.hasOwnProperty("mapType")){if(1===t.value)return"value: multiple values";t.value=1;var n=s.onnx.TypeProto.Map.verify(e.mapType);if(n)return"mapType."+n}if(null!=e.optionalType&&e.hasOwnProperty("optionalType")){if(1===t.value)return"value: multiple values";t.value=1;var n=s.onnx.TypeProto.Optional.verify(e.optionalType);if(n)return"optionalType."+n}if(null!=e.sparseTensorType&&e.hasOwnProperty("sparseTensorType")){if(1===t.value)return"value: multiple values";t.value=1;var n=s.onnx.TypeProto.SparseTensor.verify(e.sparseTensorType);if(n)return"sparseTensorType."+n}return null!=e.denotation&&e.hasOwnProperty("denotation")&&!a.isString(e.denotation)?"denotation: string expected":null},t.fromObject=function(e){if(e instanceof s.onnx.TypeProto)return e;var t=new s.onnx.TypeProto;if(null!=e.tensorType){if("object"!=typeof e.tensorType)throw TypeError(".onnx.TypeProto.tensorType: object expected");t.tensorType=s.onnx.TypeProto.Tensor.fromObject(e.tensorType)}if(null!=e.sequenceType){if("object"!=typeof e.sequenceType)throw TypeError(".onnx.TypeProto.sequenceType: object expected");t.sequenceType=s.onnx.TypeProto.Sequence.fromObject(e.sequenceType)}if(null!=e.mapType){if("object"!=typeof e.mapType)throw TypeError(".onnx.TypeProto.mapType: object expected");t.mapType=s.onnx.TypeProto.Map.fromObject(e.mapType)}if(null!=e.optionalType){if("object"!=typeof e.optionalType)throw TypeError(".onnx.TypeProto.optionalType: object expected");t.optionalType=s.onnx.TypeProto.Optional.fromObject(e.optionalType)}if(null!=e.sparseTensorType){if("object"!=typeof e.sparseTensorType)throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");t.sparseTensorType=s.onnx.TypeProto.SparseTensor.fromObject(e.sparseTensorType)}return null!=e.denotation&&(t.denotation=String(e.denotation)),t},t.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.denotation=""),null!=e.tensorType&&e.hasOwnProperty("tensorType")&&(n.tensorType=s.onnx.TypeProto.Tensor.toObject(e.tensorType,t),t.oneofs&&(n.value="tensorType")),null!=e.sequenceType&&e.hasOwnProperty("sequenceType")&&(n.sequenceType=s.onnx.TypeProto.Sequence.toObject(e.sequenceType,t),t.oneofs&&(n.value="sequenceType")),null!=e.mapType&&e.hasOwnProperty("mapType")&&(n.mapType=s.onnx.TypeProto.Map.toObject(e.mapType,t),t.oneofs&&(n.value="mapType")),null!=e.denotation&&e.hasOwnProperty("denotation")&&(n.denotation=e.denotation),null!=e.sparseTensorType&&e.hasOwnProperty("sparseTensorType")&&(n.sparseTensorType=s.onnx.TypeProto.SparseTensor.toObject(e.sparseTensorType,t),t.oneofs&&(n.value="sparseTensorType")),null!=e.optionalType&&e.hasOwnProperty("optionalType")&&(n.optionalType=s.onnx.TypeProto.Optional.toObject(e.optionalType,t),t.oneofs&&(n.value="optionalType")),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},t.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto"},t.Tensor=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&t.uint32(8).int32(e.elemType),null!=e.shape&&Object.hasOwnProperty.call(e,"shape")&&s.onnx.TensorShapeProto.encode(e.shape,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.TypeProto.Tensor;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.elemType=e.int32();break;case 2:o.shape=s.onnx.TensorShapeProto.decode(e,e.uint32());break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")&&!a.isInteger(e.elemType))return"elemType: integer expected";if(null!=e.shape&&e.hasOwnProperty("shape")){var t=s.onnx.TensorShapeProto.verify(e.shape);if(t)return"shape."+t}return null},e.fromObject=function(e){if(e instanceof s.onnx.TypeProto.Tensor)return e;var t=new s.onnx.TypeProto.Tensor;if(null!=e.elemType&&(t.elemType=0|e.elemType),null!=e.shape){if("object"!=typeof e.shape)throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");t.shape=s.onnx.TensorShapeProto.fromObject(e.shape)}return t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.elemType=0,n.shape=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(n.elemType=e.elemType),null!=e.shape&&e.hasOwnProperty("shape")&&(n.shape=s.onnx.TensorShapeProto.toObject(e.shape,t)),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Tensor"},e}(),t.Sequence=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.elemType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&s.onnx.TypeProto.encode(e.elemType,t.uint32(10).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.TypeProto.Sequence;e.pos<n;){var a=e.uint32();a>>>3==1?o.elemType=s.onnx.TypeProto.decode(e,e.uint32()):e.skipType(7&a)}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")){var t=s.onnx.TypeProto.verify(e.elemType);if(t)return"elemType."+t}return null},e.fromObject=function(e){if(e instanceof s.onnx.TypeProto.Sequence)return e;var t=new s.onnx.TypeProto.Sequence;if(null!=e.elemType){if("object"!=typeof e.elemType)throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");t.elemType=s.onnx.TypeProto.fromObject(e.elemType)}return t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.elemType=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(n.elemType=s.onnx.TypeProto.toObject(e.elemType,t)),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Sequence"},e}(),t.Map=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.keyType=0,e.prototype.valueType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.keyType&&Object.hasOwnProperty.call(e,"keyType")&&t.uint32(8).int32(e.keyType),null!=e.valueType&&Object.hasOwnProperty.call(e,"valueType")&&s.onnx.TypeProto.encode(e.valueType,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.TypeProto.Map;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.keyType=e.int32();break;case 2:o.valueType=s.onnx.TypeProto.decode(e,e.uint32());break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.keyType&&e.hasOwnProperty("keyType")&&!a.isInteger(e.keyType))return"keyType: integer expected";if(null!=e.valueType&&e.hasOwnProperty("valueType")){var t=s.onnx.TypeProto.verify(e.valueType);if(t)return"valueType."+t}return null},e.fromObject=function(e){if(e instanceof s.onnx.TypeProto.Map)return e;var t=new s.onnx.TypeProto.Map;if(null!=e.keyType&&(t.keyType=0|e.keyType),null!=e.valueType){if("object"!=typeof e.valueType)throw TypeError(".onnx.TypeProto.Map.valueType: object expected");t.valueType=s.onnx.TypeProto.fromObject(e.valueType)}return t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.keyType=0,n.valueType=null),null!=e.keyType&&e.hasOwnProperty("keyType")&&(n.keyType=e.keyType),null!=e.valueType&&e.hasOwnProperty("valueType")&&(n.valueType=s.onnx.TypeProto.toObject(e.valueType,t)),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Map"},e}(),t.Optional=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.elemType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&s.onnx.TypeProto.encode(e.elemType,t.uint32(10).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.TypeProto.Optional;e.pos<n;){var a=e.uint32();a>>>3==1?o.elemType=s.onnx.TypeProto.decode(e,e.uint32()):e.skipType(7&a)}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")){var t=s.onnx.TypeProto.verify(e.elemType);if(t)return"elemType."+t}return null},e.fromObject=function(e){if(e instanceof s.onnx.TypeProto.Optional)return e;var t=new s.onnx.TypeProto.Optional;if(null!=e.elemType){if("object"!=typeof e.elemType)throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");t.elemType=s.onnx.TypeProto.fromObject(e.elemType)}return t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.elemType=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(n.elemType=s.onnx.TypeProto.toObject(e.elemType,t)),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Optional"},e}(),t.SparseTensor=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&t.uint32(8).int32(e.elemType),null!=e.shape&&Object.hasOwnProperty.call(e,"shape")&&s.onnx.TensorShapeProto.encode(e.shape,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.TypeProto.SparseTensor;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.elemType=e.int32();break;case 2:o.shape=s.onnx.TensorShapeProto.decode(e,e.uint32());break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")&&!a.isInteger(e.elemType))return"elemType: integer expected";if(null!=e.shape&&e.hasOwnProperty("shape")){var t=s.onnx.TensorShapeProto.verify(e.shape);if(t)return"shape."+t}return null},e.fromObject=function(e){if(e instanceof s.onnx.TypeProto.SparseTensor)return e;var t=new s.onnx.TypeProto.SparseTensor;if(null!=e.elemType&&(t.elemType=0|e.elemType),null!=e.shape){if("object"!=typeof e.shape)throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");t.shape=s.onnx.TensorShapeProto.fromObject(e.shape)}return t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.elemType=0,n.shape=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(n.elemType=e.elemType),null!=e.shape&&e.hasOwnProperty("shape")&&(n.shape=s.onnx.TensorShapeProto.toObject(e.shape,t)),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.SparseTensor"},e}(),t}(),e.OperatorSetIdProto=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.domain="",e.prototype.version=a.Long?a.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(10).string(e.domain),null!=e.version&&Object.hasOwnProperty.call(e,"version")&&t.uint32(16).int64(e.version),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.OperatorSetIdProto;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.domain=e.string();break;case 2:o.version=e.int64();break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.domain&&e.hasOwnProperty("domain")&&!a.isString(e.domain)?"domain: string expected":null!=e.version&&e.hasOwnProperty("version")&&!a.isInteger(e.version)&&!(e.version&&a.isInteger(e.version.low)&&a.isInteger(e.version.high))?"version: integer|Long expected":null},e.fromObject=function(e){if(e instanceof s.onnx.OperatorSetIdProto)return e;var t=new s.onnx.OperatorSetIdProto;return null!=e.domain&&(t.domain=String(e.domain)),null!=e.version&&(a.Long?(t.version=a.Long.fromValue(e.version)).unsigned=!1:"string"==typeof e.version?t.version=parseInt(e.version,10):"number"==typeof e.version?t.version=e.version:"object"==typeof e.version&&(t.version=new a.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber())),t},e.toObject=function(e,t){t||(t={});var n={};if(t.defaults)if(n.domain="",a.Long){var i=new a.Long(0,0,!1);n.version=t.longs===String?i.toString():t.longs===Number?i.toNumber():i}else n.version=t.longs===String?"0":0;return null!=e.domain&&e.hasOwnProperty("domain")&&(n.domain=e.domain),null!=e.version&&e.hasOwnProperty("version")&&("number"==typeof e.version?n.version=t.longs===String?String(e.version):e.version:n.version=t.longs===String?a.Long.prototype.toString.call(e.version):t.longs===Number?new a.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber():e.version),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.OperatorSetIdProto"},e}(),e.OperatorStatus=function(){var e={},t=Object.create(e);return t[e[0]="EXPERIMENTAL"]=0,t[e[1]="STABLE"]=1,t}(),e.FunctionProto=function(){function e(e){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.name="",e.prototype.input=a.emptyArray,e.prototype.output=a.emptyArray,e.prototype.attribute=a.emptyArray,e.prototype.attributeProto=a.emptyArray,e.prototype.node=a.emptyArray,e.prototype.docString="",e.prototype.opsetImport=a.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.input&&e.input.length)for(var n=0;n<e.input.length;++n)t.uint32(34).string(e.input[n]);if(null!=e.output&&e.output.length)for(var n=0;n<e.output.length;++n)t.uint32(42).string(e.output[n]);if(null!=e.attribute&&e.attribute.length)for(var n=0;n<e.attribute.length;++n)t.uint32(50).string(e.attribute[n]);if(null!=e.node&&e.node.length)for(var n=0;n<e.node.length;++n)s.onnx.NodeProto.encode(e.node[n],t.uint32(58).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(66).string(e.docString),null!=e.opsetImport&&e.opsetImport.length)for(var n=0;n<e.opsetImport.length;++n)s.onnx.OperatorSetIdProto.encode(e.opsetImport[n],t.uint32(74).fork()).ldelim();if(null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(82).string(e.domain),null!=e.attributeProto&&e.attributeProto.length)for(var n=0;n<e.attributeProto.length;++n)s.onnx.AttributeProto.encode(e.attributeProto[n],t.uint32(90).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new s.onnx.FunctionProto;e.pos<n;){var a=e.uint32();switch(a>>>3){case 1:o.name=e.string();break;case 4:o.input&&o.input.length||(o.input=[]),o.input.push(e.string());break;case 5:o.output&&o.output.length||(o.output=[]),o.output.push(e.string());break;case 6:o.attribute&&o.attribute.length||(o.attribute=[]),o.attribute.push(e.string());break;case 11:o.attributeProto&&o.attributeProto.length||(o.attributeProto=[]),o.attributeProto.push(s.onnx.AttributeProto.decode(e,e.uint32()));break;case 7:o.node&&o.node.length||(o.node=[]),o.node.push(s.onnx.NodeProto.decode(e,e.uint32()));break;case 8:o.docString=e.string();break;case 9:o.opsetImport&&o.opsetImport.length||(o.opsetImport=[]),o.opsetImport.push(s.onnx.OperatorSetIdProto.decode(e,e.uint32()));break;case 10:o.domain=e.string();break;default:e.skipType(7&a)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!a.isString(e.name))return"name: string expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t)if(!a.isString(e.input[t]))return"input: string[] expected"}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t)if(!a.isString(e.output[t]))return"output: string[] expected"}if(null!=e.attribute&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var t=0;t<e.attribute.length;++t)if(!a.isString(e.attribute[t]))return"attribute: string[] expected"}if(null!=e.attributeProto&&e.hasOwnProperty("attributeProto")){if(!Array.isArray(e.attributeProto))return"attributeProto: array expected";for(var t=0;t<e.attributeProto.length;++t){var n=s.onnx.AttributeProto.verify(e.attributeProto[t]);if(n)return"attributeProto."+n}}if(null!=e.node&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var t=0;t<e.node.length;++t){var n=s.onnx.NodeProto.verify(e.node[t]);if(n)return"node."+n}}if(null!=e.docString&&e.hasOwnProperty("docString")&&!a.isString(e.docString))return"docString: string expected";if(null!=e.opsetImport&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var t=0;t<e.opsetImport.length;++t){var n=s.onnx.OperatorSetIdProto.verify(e.opsetImport[t]);if(n)return"opsetImport."+n}}return null!=e.domain&&e.hasOwnProperty("domain")&&!a.isString(e.domain)?"domain: string expected":null},e.fromObject=function(e){if(e instanceof s.onnx.FunctionProto)return e;var t=new s.onnx.FunctionProto;if(null!=e.name&&(t.name=String(e.name)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.FunctionProto.input: array expected");t.input=[];for(var n=0;n<e.input.length;++n)t.input[n]=String(e.input[n])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.FunctionProto.output: array expected");t.output=[];for(var n=0;n<e.output.length;++n)t.output[n]=String(e.output[n])}if(e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");t.attribute=[];for(var n=0;n<e.attribute.length;++n)t.attribute[n]=String(e.attribute[n])}if(e.attributeProto){if(!Array.isArray(e.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");t.attributeProto=[];for(var n=0;n<e.attributeProto.length;++n){if("object"!=typeof e.attributeProto[n])throw TypeError(".onnx.FunctionProto.attributeProto: object expected");t.attributeProto[n]=s.onnx.AttributeProto.fromObject(e.attributeProto[n])}}if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.FunctionProto.node: array expected");t.node=[];for(var n=0;n<e.node.length;++n){if("object"!=typeof e.node[n])throw TypeError(".onnx.FunctionProto.node: object expected");t.node[n]=s.onnx.NodeProto.fromObject(e.node[n])}}if(null!=e.docString&&(t.docString=String(e.docString)),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");t.opsetImport=[];for(var n=0;n<e.opsetImport.length;++n){if("object"!=typeof e.opsetImport[n])throw TypeError(".onnx.FunctionProto.opsetImport: object expected");t.opsetImport[n]=s.onnx.OperatorSetIdProto.fromObject(e.opsetImport[n])}}return null!=e.domain&&(t.domain=String(e.domain)),t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.input=[],n.output=[],n.attribute=[],n.node=[],n.opsetImport=[],n.attributeProto=[]),t.defaults&&(n.name="",n.docString="",n.domain=""),null!=e.name&&e.hasOwnProperty("name")&&(n.name=e.name),e.input&&e.input.length){n.input=[];for(var i=0;i<e.input.length;++i)n.input[i]=e.input[i]}if(e.output&&e.output.length){n.output=[];for(var i=0;i<e.output.length;++i)n.output[i]=e.output[i]}if(e.attribute&&e.attribute.length){n.attribute=[];for(var i=0;i<e.attribute.length;++i)n.attribute[i]=e.attribute[i]}if(e.node&&e.node.length){n.node=[];for(var i=0;i<e.node.length;++i)n.node[i]=s.onnx.NodeProto.toObject(e.node[i],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.opsetImport&&e.opsetImport.length){n.opsetImport=[];for(var i=0;i<e.opsetImport.length;++i)n.opsetImport[i]=s.onnx.OperatorSetIdProto.toObject(e.opsetImport[i],t)}if(null!=e.domain&&e.hasOwnProperty("domain")&&(n.domain=e.domain),e.attributeProto&&e.attributeProto.length){n.attributeProto=[];for(var i=0;i<e.attributeProto.length;++i)n.attributeProto[i]=s.onnx.AttributeProto.toObject(e.attributeProto[i],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.FunctionProto"},e}(),e}(),t.exports=s});function eo(e,t){if(!e)throw Error("string"==typeof t?t:t())}function Eo(e){return new TextDecoder().decode(e)}var je,Dr,_l,gt,zi,ft,xt,te,Po,kr,Nr,Lr,Le=N(()=>{"use strict";Vs(),je=_e(Yr()),Rr(),Dr=class{static arraysEqual(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}},_l=class{static preprocessInputShapes(e,t){return[1===e.length?[1,e[0]]:e,1===t.length?[t[0],1]:t]}static postprocessOutputShape(e,t,n){1===t&&e.splice(e.length-2,1),1===n&&e.pop()}static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},gt=class e{static calcShape(e,t,n=!1){let i=e.length,o=t.length;if(0===i)return t;if(0===o)return e;let a=Math.max(e.length,t.length),s=Array(a);if(n){if(i<2||o<2)return;let n=_l.calcMatMulShape([e[i-2],e[i-1]],[t[o-2],t[o-1]]);if(void 0===n)return;[s[a-2],s[a-1]]=n}for(let u=n?3:1;u<=a;u++){let n=i-u<0?1:e[i-u],l=o-u<0?1:t[o-u];if(n!==l&&n>1&&l>1)return;s[a-u]=Math.max(n,l)}return s}static index(t,n){let i=Array(n.length);return e.fillIndex(t,n,i),i}static fillIndex(e,t,n){let i=e.length-t.length;for(let o=0;o<t.length;o++)n[o]=e[i+o]%t[o]}static calc(t,n,i,o,a){let s=e.calcShape(t.dims,n.dims);if(s){if(o&&!te.areEqual(s,t.dims))return;let u=te.size(s),l=o?t:new rt(s,a||t.type);if(0===s.length)l.set([],i(t.get([]),n.get([])));else{let o,a=Array(s.length),d=Array(t.dims.length),p=Array(n.dims.length),c=0,h=0,f=!1,m=!1;0===t.dims.length&&(c=t.get([]),f=!0),0===n.dims.length&&(h=n.get([]),m=!0);for(let g=0;g<u;g++){o=g;for(let e=s.length-1;e>=0;e--)a[e]=o%s[e],o=Math.floor(o/s[e]);f||(e.fillIndex(a,t.dims,d),c=t.get(d)),m||(e.fillIndex(a,n.dims,p),h=n.get(p)),l.set(a,i(c,h))}}return l}}static isValidBroadcast(e,t){let n=e.length,i=t.length;if(n>i)return!1;for(let o=1;o<=n;o++)if(1!==e[n-o]&&e[n-o]!==t[i-o])return!1;return!0}static getBroadcastDims(e,t){let n=e.length,i=[];for(let o=0;o<n;o++){let a=n-1-o,s=e[a]||1;(t[t.length-1-o]||1)>1&&1===s&&i.unshift(a)}return i}},zi=class{static getShapeOfGemmResult(e,t,n,i,o){let a,s,u;if(2!==e.length||2!==n.length)throw Error("shape need to be of size 2");t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(i?(u=n[0],l=1):(u=n[1],l=0),n[l]!==s)throw Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw Error("invalid shape specified");if(o&&!gt.isValidBroadcast(o,[a,u]))throw Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},ft=class e{static tensorDataTypeFromProto(e){switch(e){case je.onnx.TensorProto.DataType.INT8:return"int8";case je.onnx.TensorProto.DataType.UINT8:return"uint8";case je.onnx.TensorProto.DataType.BOOL:return"bool";case je.onnx.TensorProto.DataType.INT16:return"int16";case je.onnx.TensorProto.DataType.UINT16:return"uint16";case je.onnx.TensorProto.DataType.INT32:return"int32";case je.onnx.TensorProto.DataType.UINT32:return"uint32";case je.onnx.TensorProto.DataType.FLOAT:return"float32";case je.onnx.TensorProto.DataType.DOUBLE:return"float64";case je.onnx.TensorProto.DataType.STRING:return"string";case je.onnx.TensorProto.DataType.INT64:return"int32";case je.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw Error(`unsupported data type: ${je.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return je.onnx.TensorProto.DataType.INT8;case"uint8":return je.onnx.TensorProto.DataType.UINT8;case"bool":return je.onnx.TensorProto.DataType.BOOL;case"int16":return je.onnx.TensorProto.DataType.INT16;case"uint16":return je.onnx.TensorProto.DataType.UINT16;case"int32":return je.onnx.TensorProto.DataType.INT32;case"uint32":return je.onnx.TensorProto.DataType.UINT32;case"float32":return je.onnx.TensorProto.DataType.FLOAT;case"float64":return je.onnx.TensorProto.DataType.DOUBLE;case"string":return je.onnx.TensorProto.DataType.STRING;case"int64":return je.onnx.TensorProto.DataType.INT64;case"uint64":return je.onnx.TensorProto.DataType.UINT64;default:throw Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(e=>cr.isLong(e)?e.toNumber():e)}static tensorValueTypeFromProto(t){return{tensorType:e.tensorDataTypeFromProto(t.elemType),shape:{dims:e.tensorDimsFromProto(t.shape.dim.map(e=>e.dimValue))}}}static tensorDimsFromORTFormat(e){let t=[];for(let n=0;n<e.dimsLength();n++)t.push(xt.longToNumber(e.dims(n)));return t}static tensorAttributesFromORTFormat(e){let t=[];for(let n=0;n<e.attributesLength();n++)t.push(e.attributes(n));return t}},xt=class{static longToNumber(e){return cr.isLong(e)?e.toNumber():"bigint"==typeof e?Number(e):e}static isLong(e){return cr.isLong(e)||"bigint"==typeof e}},te=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static sizeFromDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(e,t,n){let i=1;for(let o=t;o<n;o++){if(e[o]<=0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");i*=e[o]}return i}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let n=Array(t);n[t-1]=1,n[t-2]=e[t-1];for(let i=t-3;i>=0;--i)n[i]=n[i+1]*e[i+1];return n}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,t,n){void 0===n&&(n=e.length);let i=0;for(let o=0;o<n;++o)i+=t[o]*e[o];return i}static offsetToIndices(e,t){let n=t.length;if(0===n)return[];if(1===n)return[e*t[0]];let i=Array(t.length);for(let n=0;n<i.length-1;++n)i[n]=Math.floor(e/t[n]),e-=i[n]*t[n];return i[i.length-1]=e,i}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(e=>this.normalizeAxis(e,t))}static incrementIndex(e,t,n){if(0===t.length||0===e.length)throw Error("Index incrementing unsupported for scalar Tensor");if(void 0===n)n=t.length;else if(n<=0||n>t.length)throw Error("Incorrect axis to increment on");for(let i=n-1;i>=0&&(e[i]++,!(e[i]<t[i]));--i)e[i]=0}static calculateReshapedDims(t,n){if(0===n.length){if(0===t.length||1===e.size(t))return[];throw Error("cannot reshape to a scalar Tensor")}let i=n.length,o=Array(i),a=-1,s=1;for(let e=0;e<i;e++){if(n[e]<-1)throw Error("a dimension in shape hints cannot be less than -1");if(-1===n[e]){if(-1!==a)throw Error("at most one dimension in shape hints can be -1");a=e}else{if(0===n[e]){if(e>=t.length)throw Error("the dimension with value zero exceeds the dimension size of the input tensor");o[e]=t[e]}else o[e]=n[e];s*=o[e]}}let u=e.size(t);if(-1!==a){if(u%s!=0)throw Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${t}] Output shape: [${n}]`);o[a]=u/s}else if(s!==u)throw Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let n=e.length;return e.map((e,i)=>e+t[i]+t[i+n])}static areEqual(e,t){return e.length===t.length&&e.every((e,n)=>e===t[n])}static validateDimsAndCalcSize(e){if(e.length>6)throw TypeError("Only rank 0 to 6 is supported for tensor shape.");let t=1;for(let n of e){if(!Number.isInteger(n))throw TypeError(`Invalid shape: ${n} is not an integer`);if(n<0||n>0x7fffffff)throw TypeError(`Invalid shape: length ${n} is not allowed`);t*=n}return t}static flattenShape(e,t){t<0&&(t+=e.length);let n=e.reduce((e,t)=>e*t,1),i=e.slice(t).reduce((e,t)=>e*t,1);return[n/i,i]}static squeezeShape(t,n){let i=[];n=e.normalizeAxes(n,t.length);for(let e=0;e<t.length;e++){let o=n.indexOf(e)>=0;if(o&&1!==t[e])throw Error("squeeze an axis of size different than 1");(0===n.length&&t[e]>1||n.length>0&&!o)&&i.push(t[e])}return i}static unsqueezeShape(t,n){let i=Array(t.length+n.length);i.fill(0);for(let t=0;t<n.length;t++){let o=e.normalizeAxis(n[t],i.length);if(o>=i.length)throw Error("'axes' has an out of range axis");if(0!==i[o])throw Error("'axes' has a duplicate axis");i[o]=1}let o=0;for(let e=0;e<i.length;e++)0===i[e]&&(i[e]=t[o++]);if(o!==t.length)throw Error("the unsqueezed dimension could not be established");return i}},Po=class e{static splitShape(t,n,i,o){if(0===i.length){if(!o)throw Error("need to know number of outputs when the 'split' attribute is not specified");e.determineSplit(t[n],o,i)}let a=[],s=[0];for(let e=0;e<i.length;++e){0!==e&&s.push(s[e-1]+i[e-1]);let o=t.slice();o[n]=i[e],a.push(o)}return[a,s]}static determineSplit(e,t,n){if(e%t!=0)throw Error("cannot split tensor to equal sized parts");for(let i=0;i<t;++i)n.push(e/t)}},kr=class e{static adjustPoolAttributes(e,t,n,i,o,a){if(!e&&n.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=n.length?n.push(t[e+2]):n[e]=t[e+2];for(let e=0;e<n.length;e++)if(e<i.length){if(i[e]<0)throw Error("strides should be greater than or equal to 1")}else i.push(1);for(let e=0;e<n.length;e++)if(e<o.length){if(o[e]<0)throw Error("dilations should be greater than or equal to 1")}else o.push(1);for(let e=0;e<2*n.length;e++)if(e<a.length){if(a[e]<0)throw Error("pad should be greater than or equal to 1")}else a.push(0);for(let e=0;e<n.length;e++){if(n[e]<=0)throw Error("kernel shapes need to be greater than 0");if(a[e]>=n[e]||a[e+n.length]>=n[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,i,o,a,s){if(s){if(a.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+2],n[u],i[u],o[u],a,u,u+t.length-2,s)}}static computePoolOutputShape(t,n,i,o,a,s,u){if(n.length<=0)throw Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return e.computeShapeHelper(t,n,l,i,o,a,s,u),l}static computeConvOutputShape(t,n,i,o,a,s,u){if(t.length<=0||n.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return e.computeShapeHelper(!1,t,l,i,o,a,s,u),l}static computeShapeHelper(t,n,i,o,a,s,u,l){if(t)for(let e=0;e<n.length-2;e++)i.push(1);else for(let t=0;t<n.length-2;t++)i.push(e.adjustPadAndReturnShape(n[t+2],o[t],a[t],s[t],u,t,t+n.length-2,l))}static adjustPadAndReturnShape(e,t,n,i,o,a,s,u){let l=n*(i-1)+1;if(!u||"NOTSET"===u)return Math.floor((e+o[a]+o[s]-l)/t+1);switch(u){case"VALID":return o[a]=0,o[s]=0,Math.floor((e-l)/t+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==n)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let n=((e+t-1)/t-1)*t+i-e;return o[a]=Math.floor("SAME_LOWER"===u?(n+1)/2:n/2),o[s]=n-o[a],Math.floor((e+n-i)/t+1)}default:throw Error("Unsupported AutoPad type")}}},Nr=-34028234663852886e22,Lr=34028234663852886e22});function q$(e){switch(e){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw Error(`cannot calculate sizeof() on type ${e}`)}}function nm(e){switch(e){case Ie.onnx.TensorProto.DataType.UINT8:case Ie.onnx.TensorProto.DataType.INT8:case Ie.onnx.TensorProto.DataType.BOOL:return 1;case Ie.onnx.TensorProto.DataType.UINT16:case Ie.onnx.TensorProto.DataType.INT16:return 2;case Ie.onnx.TensorProto.DataType.FLOAT:case Ie.onnx.TensorProto.DataType.INT32:case Ie.onnx.TensorProto.DataType.UINT32:return 4;case Ie.onnx.TensorProto.DataType.INT64:case Ie.onnx.TensorProto.DataType.DOUBLE:case Ie.onnx.TensorProto.DataType.UINT64:return 8;default:throw Error(`cannot calculate sizeof() on type ${Ie.onnx.TensorProto.DataType[e]}`)}}function j$(e,t){return new(im(t))(e)}function im(e){switch(e){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw Error("unspecified error")}}function wl(e,t){if(t===Ie.onnx.TensorProto.DataType.INT64||t===Io.TensorDataType.INT64){if(e.greaterThanOrEqual(0x80000000)||e.lessThan(-0x80000000))throw TypeError("int64 is not supported")}else if(t===Ie.onnx.TensorProto.DataType.UINT32||t===Io.TensorDataType.UINT32||t===Ie.onnx.TensorProto.DataType.UINT64||t===Io.TensorDataType.UINT64){if(e.greaterThanOrEqual(0x100000000)||e.lessThan(0))throw TypeError("uint64 is not supported")}else throw TypeError(`not a LONG type: ${Ie.onnx.TensorProto.DataType[t]}`);return e.toNumber()}function rm(e,t,n){switch(t){case Ie.onnx.TensorProto.DataType.BOOL:case Ie.onnx.TensorProto.DataType.UINT8:return e.getUint8(n);case Ie.onnx.TensorProto.DataType.INT8:return e.getInt8(n);case Ie.onnx.TensorProto.DataType.UINT16:return e.getUint16(n,!0);case Ie.onnx.TensorProto.DataType.INT16:return e.getInt16(n,!0);case Ie.onnx.TensorProto.DataType.FLOAT:return e.getFloat32(n,!0);case Ie.onnx.TensorProto.DataType.INT32:return e.getInt32(n,!0);case Ie.onnx.TensorProto.DataType.UINT32:return e.getUint32(n,!0);case Ie.onnx.TensorProto.DataType.INT64:return wl(cr.fromBits(e.getUint32(n,!0),e.getUint32(n+4,!0),!1),t);case Ie.onnx.TensorProto.DataType.DOUBLE:return e.getFloat64(n,!0);case Ie.onnx.TensorProto.DataType.UINT64:return wl(cr.fromBits(e.getUint32(n,!0),e.getUint32(n+4,!0),!0),t);default:throw Error(`cannot read from DataView for type ${Ie.onnx.TensorProto.DataType[t]}`)}}var om,Ie,rt,Rr=N(()=>{"use strict";om=_e(vf()),Vs(),So(),Ie=_e(Yr()),Le(),rt=class e{constructor(e,t,n,i,o,a=om.Guid.create()){this.dims=e,this.type=t,this.dataProvider=n,this.asyncDataProvider=i,this.cache=o,this.dataId=a,this.size=te.validateDimsAndCalcSize(e);let s=this.size,u=void 0===n&&void 0===i&&void 0===o;if(void 0!==o&&o.length!==s)throw RangeError("Input dims doesn't match data length.");if("string"===t){if(void 0!==o&&(!Array.isArray(o)||!o.every(e=>"string"==typeof e)))throw TypeError("cache should be a string array");u&&(this.cache=Array(s))}else{if(void 0!==o){let e=im(t);if(!(o instanceof e))throw TypeError(`cache should be type ${e.name}`)}if(u){let e=new ArrayBuffer(s*q$(t));this.cache=j$(e,t)}}}get data(){if(void 0===this.cache){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if("string"!==this.type)throw TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw TypeError("data type is not float (float32, float64)")}}get numberData(){if("string"!==this.type)return this.data;throw TypeError("type cannot be non-number (string)")}get(e){return this.data[te.indicesToOffset(e,this.strides)]}set(e,t){this.data[te.indicesToOffset(e,this.strides)]=t}async getData(){return void 0===this.cache&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=te.computeStrides(this.dims)),this._strides}static fromProto(t){if(!t)throw Error("cannot construct Value from an empty tensor");let n=ft.tensorDataTypeFromProto(t.dataType),i=new e(ft.tensorDimsFromProto(t.dims),n);if("string"===n)t.stringData.forEach((e,t)=>{i.data[t]=Eo(e)});else if(t.rawData&&"number"==typeof t.rawData.byteLength&&t.rawData.byteLength>0){let e=i.data,n=new DataView(t.rawData.buffer,t.rawData.byteOffset,t.rawData.byteLength),o=nm(t.dataType),a=t.rawData.byteLength/o;if(t.rawData.byteLength%o!=0)throw Error("invalid buffer length");if(e.length!==a)throw Error("buffer length mismatch");for(let i=0;i<a;i++){let a=rm(n,t.dataType,i*o);e[i]=a}}else{let e;switch(t.dataType){case Ie.onnx.TensorProto.DataType.FLOAT:e=t.floatData;break;case Ie.onnx.TensorProto.DataType.INT32:case Ie.onnx.TensorProto.DataType.INT16:case Ie.onnx.TensorProto.DataType.UINT16:case Ie.onnx.TensorProto.DataType.INT8:case Ie.onnx.TensorProto.DataType.UINT8:case Ie.onnx.TensorProto.DataType.BOOL:e=t.int32Data;break;case Ie.onnx.TensorProto.DataType.INT64:e=t.int64Data;break;case Ie.onnx.TensorProto.DataType.DOUBLE:e=t.doubleData;break;case Ie.onnx.TensorProto.DataType.UINT32:case Ie.onnx.TensorProto.DataType.UINT64:e=t.uint64Data;break;default:throw Error("unspecific error")}if(null==e)throw Error("failed to populate data from a tensorproto value");let n=i.data;if(n.length!==e.length)throw Error("array length mismatch");for(let i=0;i<e.length;i++){let o=e[i];cr.isLong(o)?n[i]=wl(o,t.dataType):n[i]=o}}return i}static fromData(t,n,i){return new e(n,i,void 0,void 0,t)}static fromOrtTensor(t){if(!t)throw Error("cannot construct Value from an empty tensor");let n=ft.tensorDimsFromORTFormat(t),i=ft.tensorDataTypeFromProto(t.dataType()),o=new e(n,i);if("string"===i)for(let e=0;e<t.stringDataLength();e++)o.data[e]=t.stringData(e);else if(t.rawDataArray()&&"number"==typeof t.rawDataLength()&&t.rawDataLength()>0){let e=o.data,n=new DataView(t.rawDataArray().buffer,t.rawDataArray().byteOffset,t.rawDataLength()),i=nm(t.dataType()),a=t.rawDataLength()/i;if(t.rawDataLength()%i!=0)throw Error("invalid buffer length");if(e.length!==a)throw Error("buffer length mismatch");for(let o=0;o<a;o++){let a=rm(n,t.dataType(),o*i);e[o]=a}}return o}}});function se(e){return 1===e?K$:X$}function am(e){let t=se(e);return`${t.version}
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

    `}function um(e,t){let n=se(e);return`
  void main() {
    int indices[${t}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var K$,X$,Ze=N(()=>{"use strict";K$={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},X$={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}}),Ae=N(()=>{});async function vl(e,t=e=>0,n){return new Promise((i,o)=>{let a=0,s=()=>{if(e())return void i();let u=t(++a);null!=n&&a>=n?o():setTimeout(s,u)};s()})}function Mi(e){return eo("u">typeof e&&0!==e.length,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)}function lm(e){return eo("u">typeof e&&0!==e.length,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)+"AtOutCoords"}function to(e,t){return JSON.parse(JSON.stringify(e)),t}function no(e,t){return t.map(t=>e[t]).join(", ")}function bt(e){if(e<=1)return"int";if(2===e)return"ivec2";if(3===e)return"ivec3";if(4===e)return"ivec4";if(5===e)return"ivec5";if(6===e)return"ivec6";throw Error(`GPU for rank ${e} is not yet supported`)}function Kt(e=6){return["x","y","z","w","u","v"].slice(0,e)}var zn=N(()=>{"use strict";Le()});function Z$(e,t){return Kt(t).map(t=>`${e}.${t}`)}function ro(e,t){return 1===t?[e]:Z$(e,t)}function Mn(){return`
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
  `}var zr=N(()=>{"use strict";zn()});function Q$(e,t,n){if(0===e)return"false";if(1===e)return`rc > ${t[0]}`;let i="";for(let o=e-2;o<e;o++)i+=`${n[o]} >= ${t[o-e+2]}`,o<e-1&&(i+="||");return i}function Y$(e,t){let n=e.length;if(0===n)return"getA(), 0, 0, 0";if(1===n)return`getA(rc),
            rc + 1 >= ${e[0]} ? 0. : getA(rc + 1),
            0, 0`;let i="r, c",o="r, cp1",a="rp1, c",s="rp1, cp1",u="";if(n>2)for(let e=0;e<n-2;++e)u+=`${t[e]},`;return`getA(${u}${i}),
          rEdge ? 0. : getA(${u}${a}),
          cEdge ? 0. : getA(${u}${o}),
          rEdge || cEdge ? 0. : getA(${u}${s})`}function eA(e,t,n,i){return 0===e||1===e?"":`
    int r = ${t[e-2]};
    int c = ${t[e-1]};
    int rp1 = ${t[e-2]} + 1;
    int cp1 = ${t[e-1]} + 1;
    bool rEdge = rp1 >= ${i};
    bool cEdge = cp1 >= ${n};
    `}var cm,J$,dm,pm=N(()=>{"use strict";Ze(),Ae(),zn(),zr(),cm={name:"pack",inputNames:["A"],inputTypes:[1]},J$=(e,t)=>{let n=se(e.session.backend.glContext.version),i=t.dims,o=i.length,a=t.dims.length,s=bt(a),u=ro("rc",a),l=eA(a,u,i[i.length-2],i[i.length-1]),d;d=0===o?[1,1]:1===o?[i[0],1]:[i[a-1],i[a-2]];let p=Q$(a,d,u),c=Y$(i,u),h=`
        void main() {
          ${s} rc = getOutputCoords();

          if(${p}) {
            ${n.output} = vec4(0);
          } else {
            ${l}

            ${n.output} = vec4(${c});
          }
        }
      `;return{...cm,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:2},shaderSource:h}},dm=(e,t)=>({...cm,get:()=>J$(e,t)})});function xl(e){if(0===e.length)return[1,1,1];let t=1;for(let n=0;n<e.length-2;++n)t*=e[n];return[t,e.length>1?e[e.length-2]:1,e[e.length-1]]}function hm(e,t){return 0===e.length||0===t.length||(e.length<2||t.length<2?e[e.length-1]===t[t.length-1]:e[e.length-1]===t[t.length-1]&&e[e.length-2]===t[t.length-2])}function rA(e){let t=te.computeStrides(e),n=["b","r","c"],i="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t.map((e,o)=>{let a=`int ${n[o]} = ${i} / ${e}`,s=o===t.length-1?`int ${n[o+1]} = ${i} - ${n[o]} * ${e}`:`index -= ${n[o]} * ${e}`;return`${a}; ${s};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function oA(e){let t=te.computeStrides(e);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${t[0]} + coords.z * ${t[1]} + coords.y;
  }
`}var tA,nA,fm,Tl,mm=N(()=>{"use strict";Le(),Ze(),Ae(),zr(),tA=e=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${e}`}),nA=(e,t,n,i)=>{let o=t.dims,a=i,s="";for(let e=0;e<4;e++){let t="";switch(e){case 0:t="outputCoords = rc;";break;case 1:t="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:t="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:t="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw Error()}s+=`
        ${t}
        ${e>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${e}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${e>0?"}":""}
      `}let u=se(e.session.backend.glContext.version),l=`
      ${rA(o)}
      ${oA(a)}
      ${Mn()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${a[2]};
        int cols = ${a[1]};

        ${s}
        ${u.output} = result;
      }
    `;return{...n,output:{dims:a,type:t.type,textureType:2},shaderSource:l,hasMain:!0}},fm=(e,t,n)=>{let i=tA(n);return{...i,get:()=>nA(e,t,i,n)}}}),gm=N(()=>{"use strict";Ze(),Ae(),Tl=(e,t)=>{let n=t.shape,i=se(e.session.backend.glContext.version),o=`
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
      float value = ${i.texture2D}(X,TexCoords).r;
      ${i.output} = encodeAsUint8(value);
    }`,a={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:t.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return e.executeProgram(a,[t.tensor])}});function aA(e,t){if(1===e)return"rc";let n="";for(let i=0;i<e;i++)n+=t[i],i<e-1&&(n+=",");return n}var bm,iA,ym,Bi,Co,Fi,ko,wm,Il,uA,Vi,Sl,ve,Im,Sm,$m,lA,cA,Gi,zt,K,No,Ui,_m=N(()=>{"use strict";Ze(),Ae(),zn(),zr(),bm={name:"unpack",inputNames:["A"],inputTypes:[2]},iA=(e,t)=>{let n=t.dims.length,i=ro("rc",n),o=i.slice(-2),a=bt(n),s=Mn(),u=0===t.dims.length?"":aA(n,i),l=n<=1?"rc":`vec2(${o.join(",")})`,d=se(e.session.backend.glContext.version),p=`
    ${s}
    void main() {
      ${a} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${d.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...bm,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:p}},ym=(e,t)=>({...bm,get:()=>iA(e,t)})}),Do=N(()=>{"use strict";Ct(),Bi=class{constructor(e,t=1){if(1===t)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=t;else if(4===t)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=t;else throw Error(`Invalid number of channels: ${t}`)}encode(e,t){let n,i;return e.constructor!==Float32Array&&(ze.warning("Encoder","data was not of type Float32; creating new Float32Array"),i=new Float32Array(e)),t*this.channelSize>e.length?(ze.warning("Encoder","Source data too small. Allocating larger array"),i=e,n=this.allocate(t*this.channelSize),i.forEach((e,t)=>n[t]=e)):n=i=e,n}allocate(e){return new Float32Array(4*e)}decode(e,t){return 1===this.channelSize?e.filter((e,t)=>t%4==0).subarray(0,t):e.subarray(0,t)}},Co=class{constructor(e,t=1,n){if(1!==t&&4!==t)throw Error(`Invalid number of channels: ${t}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=t,this.textureType=n||e.FLOAT}encode(e,t){let n=e;return 1===this.channelSize&&(ze.verbose("Encoder","Exploding into a larger array"),n=this.allocate(t),e.forEach((e,t)=>n[4*t]=e)),n}allocate(e){return new Float32Array(4*e)}decode(e,t){return 1===this.channelSize?e.filter((e,t)=>t%4==0).subarray(0,t):e.subarray(0,t)}},Fi=class{constructor(e,t=1){if(this.channelSize=4,1===t)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else if(4===t)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else throw Error(`Invalid number of channels: ${t}`)}encode(e,t){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,t){if(e instanceof Uint8Array)return e.subarray(0,t);throw Error(`Invalid array type: ${e.constructor}`)}}}),vm=N(()=>{"use strict";Le(),Ae(),ko=(e,t,n)=>{let i=0===n||1===n?1:4,o=2===n,a=1===n||2===n,s=4===n?t.length-1:void 0,u=4===n?t.map((e,n)=>n===t.length-1?4*e:e):void 0;return Il(e,t,i,u,{isPacked:o,reverseWH:a,breakAxis:s})},wm=(e,t,n)=>{let i=ko(e,t,n);return[i.width,i.height]},Il=(e,t,n=1,i,o)=>{let a=!!(o&&o.isPacked),[s,u]=e.computeTextureWH(a&&i||t,o),l=t.length,d=t.slice(0);if(0===l&&(d=[1]),1===n)i=t;else if(a){if(4!==n)throw Error("a packed texture must be 4-channel");i=t,l>0&&(d[l-1]=Math.ceil(d[l-1]/2)),l>1&&(d[l-2]=Math.ceil(d[l-2]/2))}else if(!i)throw Error("Unpacked shape is needed when using channels > 1");return{width:s,height:u,channels:n,isPacked:a,shape:d,strides:te.computeStrides(d),unpackedShape:i,reversedWH:o&&o.reverseWH}}}),Tm=N(()=>{"use strict";Ct(),Rr(),Le(),pm(),mm(),gm(),_m(),Do(),vm(),Ae(),uA=(e,t)=>{let n=t.map(e=>`${e.unpackedShape.join(",")};${e.width}x${e.height}`).join("_"),i=e.name;return e.cacheHint&&(i+="["+e.cacheHint+"]"),i+=":"+n},Vi=class{constructor(e){this.session=e,this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,t){return wm(this.session.layoutStrategy,e,t)}executeProgram(e,t){if(t.length<e.inputNames.length)throw Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw Error("input names size does not match input types");let n=[];for(let i=0;i<e.inputNames.length;++i)n[i]=this.getOrCreateTextureData(t[i],e.inputTypes[i]);let i=uA(e,n),o=this.session.programManager.getArtifact(i),a=o?o.programInfo:"function"==typeof e.get?e.get():e,s=ko(this.session.layoutStrategy,a.output.dims,a.output.textureType),u=this.createTextureData(s,a.output.type);return o||(o=this.session.programManager.build(a,n,u),this.session.programManager.setArtifact(i,o)),this.runProgram(o,n,u),u}run(e,t){return this.executeProgram(e,t).tensor}runProgram(e,t,n){for(let n=0;n<t.length;++n)if(!!t[n].isPacked!=(2===e.programInfo.inputTypes[n]))throw Error(`input[${n}] property packed inconsistent`);if(!!n.isPacked!=(2===e.programInfo.output.textureType))throw Error("output property packed inconsistent");this.session.programManager.run(e,t,n)}getOrCreateTextureData(e,t){let n=this.getTextureData(e.dataId,2===t);if(!n&&(n=this.getTextureData(e.dataId,2!==t)))return 2===t?this.pack(n):this.unpack(n);if(!n){let i=ko(this.session.layoutStrategy,e.dims,t);if(4===t){let n=e.dims;if(4===n.length){let i=[n[0],Math.ceil(n[1]*n[2]*n[3]/4)],o=ko(this.session.layoutStrategy,i,t),a=e.numberData;if(n[1]*n[2]*n[3]%4!=0){let t=n[0],i=n[1]*n[2]*n[3],o=4*Math.ceil(i/4);a=new Float32Array(t*o);for(let n=0;n<t;++n){let t=n*i,s=n*o+n%1*i;a.set(e.numberData.subarray(t,t+i),s)}}return this.createTextureData(o,e.type,a,e,1)}}if(2===t){let t=Il(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),i=this.createTextureData(t,e.type,e.numberData,e,1);n=this.pack(i)}else n=this.createTextureData(i,e.type,e.numberData,e,1)}return n}createTextureDataFromLayoutBindTensor(e,t,n,i){return this.createTextureData(e,t,n,i,1)}createTextureData(e,t,n,i,o){ze.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let a=this.session.textureManager.createTextureFromLayout(t,e,n,o);return this.createTextureDataFromTexture(e,t,a,i)}reshapeUnpacked(e,t){let n=this.getOrCreateTextureData(e,0),i={channels:n.channels,height:n.height,width:n.width,shape:0!==t.length?t:[1],strides:te.computeStrides(t),unpackedShape:t};return this.createTextureDataFromTexture(i,e.type,n.texture).tensor}reshapePacked(e,t){let n=this.getOrCreateTextureData(e,2);if(hm(e.dims,t)){let i={channels:n.channels,height:n.height,width:n.width,shape:0!==t.length?t:[1],strides:te.computeStrides(t),unpackedShape:t,isPacked:!0};return this.createTextureDataFromTexture(i,e.type,n.texture).tensor}let i=xl(e.dims),o=xl(t),a=this.reshapePacked(e,i),s=this.run(fm(this,a,o),[a]);return this.reshapePacked(s,t)}cast(e,t){let n=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(n,t,n.texture).tensor}createTextureDataFromTexture(e,t,n,i,o){let a={...e,tensor:i||new rt(e.unpackedShape,t,e=>this.readTexture(a),async e=>this.readTextureAsync(a),void 0,o),texture:n};return this.setTextureData(a.tensor.dataId,a,e.isPacked),a}getTextureData(e,t=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,t):t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,n=!1){this.session.isInitializer(e)?this.session.setTextureData(e,t,n):(n?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,t)}isTextureLayoutCached(e,t=!1){return!!this.getTextureData(e.dataId,t)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Tl(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Tl(this,e))}pack(e){return this.executeProgram(dm(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(ym(this,e.tensor),[e.tensor])}}}),lt=N(()=>{"use strict";Sl=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ve=e=>new Sl(e)}),Am=N(()=>{"use strict";lt(),Ze(),Ae(),Im={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},Sm=(e,t,n)=>(cA(t),[e.run({...Im,cacheHint:n.cacheKey,get:()=>lA(e,t,n)},t)]),$m=e=>{let t=e.attributes.getFloat("epsilon",1e-5),n=e.attributes.getFloat("momentum",.9),i=e.attributes.getInt("spatial",1);return ve({epsilon:t,momentum:n,spatial:i})},lA=(e,t,n)=>{let i=se(e.session.backend.glContext.version),o=t[0].dims.length,[a,s]=e.calculateTextureWidthAndHeight(t[1].dims,0),u=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${a}, ${s});
    float scale = getColorAsFloat(${i.texture2D}(Scale, position));
    float mean = getColorAsFloat(${i.texture2D}(Mean, position));
    float variance = getColorAsFloat(${i.texture2D}(Variance, position));
    float b = getColorAsFloat(${i.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...Im,output:{dims:t[0].dims,type:t[0].type,textureType:0},shaderSource:u}},cA=e=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs.");let t=e[0],n=e[1],i=e[2],o=e[3],a=e[4];if(t.dims.length<3||1!==n.dims.length||1!==i.dims.length||1!==o.dims.length||1!==a.dims.length||n.dims[0]!==t.dims[1]||i.dims[0]!==t.dims[1]||o.dims[0]!==t.dims[1]||a.dims[0]!==t.dims[1])throw Error("invalid input shape.");if("float32"!==t.type&&"float64"!==t.type||"float32"!==n.type&&"float64"!==n.type||"float32"!==i.type&&"float64"!==i.type||"float32"!==o.type&&"float64"!==o.type||"float32"!==a.type&&"float64"!==a.type)throw Error("invalid input tensor types.")}}),Qn=N(()=>{"use strict";Gi=class{constructor(e,t,n,i){this.glContext=e,this.programInfo=t,this.inputTextureLayouts=n,this.outputTextureLayout=i}},zt=class{constructor(e){this.context=e}},K=class{constructor(e,t){this.routineBody=e,this.dependencies=t}},No=class{constructor(e,t,n){this.name=e,n?this.dependencies=n:this.dependencies=[],t&&(this.routineBody=t)}addDependency(e){e&&this.dependencies.push(e)}},Ui=class{static returnOrderedNodes(e){if(!e||0===e.length)return[];if(1===e.length)return e;let t=new Set,n=new Set,i=[];return this.createOrderedNodes(e,t,n,i),i}static createOrderedNodes(e,t,n,i){for(let o=0;o<e.length;++o)this.dfsTraverse(e[o],t,n,i)}static dfsTraverse(e,t,n,i){if(!e||n.has(e.name))return;if(t.has(e.name))throw Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");t.add(e.name);let o=e.dependencies;if(o&&o.length>0)for(let e=0;e<o.length;++e)this.dfsTraverse(o[e],t,n,i);i.push(e),n.add(e.name),t.delete(e.name)}}});function pA(){let e="add_";return{body:`
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
  `,name:e,type:0}}function wA(){let e="or_";return{body:`
  float ${e}(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:e,type:0}}function vA(){let e="xor_";return{body:`
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
  `,name:t,type:0}}var Mt,SA,Om,Pm,Em,Cm,Dm,km,Nm,Lm,Rm,zm,Mm,Bm,Vm,Gm,AA,OA,PA,Wm,Wi,qm,EA,CA,DA,jm,kA,NA,LA,Km,RA,Fm=N(()=>{"use strict";Le(),Qn(),Ze(),Ae(),Mt=(e,t,n,i=t[0].type,o)=>{let a=2*!!e.session.pack;return{name:n.name,inputNames:["A","B"],inputTypes:[a,a],cacheHint:o,get:()=>SA(e,t,n,i)}},SA=(e,t,n,i=t[0].type)=>{let o=2*!!e.session.pack,a=!te.areEqual(t[0].dims,t[1].dims),s=t[0].dims,u=e.session.pack;if(a){let a=gt.calcShape(t[0].dims,t[1].dims,!1);if(!a)throw Error("Can't perform binary op on the given tensors");let l=(s=a).length,d=0!==t[0].dims.length?t[0].dims.length:1,p=0!==t[1].dims.length?t[1].dims.length:1,c=0!==t[0].dims.length?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",h=0!==t[1].dims.length?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",f=se(e.session.backend.glContext.version),m=u?`
      ${n.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${n.name}(a, b);
        ${f.output} = result;
      }`:`
      ${n.body}
      float process(int indices[${l}]) {
        int aindices[${d}];
        int bindices[${p}];
        ${c}
        ${h}
        return ${n.name}(_A(aindices), _B(bindices));
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:s,type:i,textureType:o},shaderSource:m,hasMain:u}}let l=se(e.session.backend.glContext.version),d=`
    ${n.body}
    void main() {
      vec4 v1 = ${l.texture2D}(A, TexCoords);
      vec4 v2 = ${l.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${l.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:t[0].dims,type:i,textureType:o},shaderSource:d,hasMain:!0}},Om=(e,t)=>[e.run(Mt(e,t,pA()),t)],Pm=(e,t)=>[e.run(Mt(e,t,_A(),"bool"),t)],Em=(e,t)=>[e.run(Mt(e,t,fA()),t)],Cm=(e,t)=>[e.run(Mt(e,t,gA(),"bool"),t)],Dm=(e,t)=>[e.run(Mt(e,t,bA(),"bool"),t)],km=(e,t)=>[e.run(Mt(e,t,yA(),"bool"),t)],Nm=(e,t)=>[e.run(Mt(e,t,hA()),t)],Lm=(e,t)=>[e.run(Mt(e,t,wA(),"bool"),t)],Rm=(e,t)=>[e.run(Mt(e,t,xA()),t)],zm=(e,t)=>[e.run(Mt(e,t,TA()),t)],Mm=(e,t)=>[e.run(Mt(e,t,mA()),t)],Bm=(e,t)=>[e.run(Mt(e,t,vA(),"bool"),t)]}),Um=N(()=>{"use strict";Le(),Vm=(e,t,n)=>(AA(t),[e.cast(t[0],n)]),Gm=e=>ft.tensorDataTypeFromProto(e.attributes.getInt("to")),AA=e=>{if(!e||1!==e.length)throw Error("Cast requires 1 input.");if("string"===e[0].type)throw Error("Invalid input type.")}}),Hm=N(()=>{"use strict";Ze(),Ae(),zn(),zr(),OA=(e,t)=>({name:"Concat (packed)",inputNames:Array.from({length:e},(e,t)=>`X${t}`),inputTypes:Array(e).fill(2),cacheHint:t}),PA=(e,t,n,i)=>{let o=n[0].dims.slice();if(i>=o.length||i<-1*o.length)throw Error("axis specified for concat doesn't match input dimensionality");i<0&&(i=o.length+i);let a=o.slice(0);for(let e=1;e<n.length;e++){let t=n[e].dims.slice();for(let e=0;e<o.length;e++)if(e===i)a[i]+=t[e];else if(o[e]!==t[e])throw Error("non concat dimensions must match")}let s=a.length,u=ro("coords",s),l=bt(s),d=Mn(),p=n.map(e=>e.dims),c=Kt(s),h=Array(p.length-1);h[0]=p[0][i];for(let e=1;e<h.length;e++)h[e]=h[e-1]+p[e][i];let f=c[i],m=c.slice(-2),g=c.join(),b=`if (${f} < ${h[0]}) {
        return getChannel(
            getX0(${g}), vec2(${m.join()}));
        }`;for(let e=1;e<h.length;e++){let t=h[e-1];b+=`
            if (${f} < ${h[e]}  && ${f} >= ${h[e-1]}) {
              return getChannel(
                getX${e}(${Wi(c,f,t)}),
                vec2(${Wi(m,f,t)}));
            }`}let y=h.length,_=h[h.length-1];b+=`
            return getChannel(
              getX${y}(${Wi(c,f,_)}),
              vec2(${Wi(m,f,_)}));`;let v=se(e.session.backend.glContext.version),x=`
          ${d}
          float getValue(${c.map(e=>"int "+e)}) {
            ${b}
          }

          void main() {
            ${l} coords = getOutputCoords();
            int lastDim = coords.${c[s-1]};
            coords.${c[s-1]} = coords.${c[s-2]};
            coords.${c[s-2]} = lastDim;

            vec4 result = vec4(getValue(${u}), 0., 0., 0.);

            ${u[s-1]} = ${u[s-1]} + 1;
            if (${u[s-1]} < ${a[s-1]}) {
              result.g = getValue(${u});
            }

            ${u[s-2]} = ${u[s-2]} + 1;
            if (${u[s-2]} < ${a[s-2]}) {
              result.a = getValue(${u});
            }

            ${u[s-1]} = ${u[s-1]} - 1;
            if (${u[s-2]} < ${a[s-2]} &&
                ${u[s-1]} < ${a[s-1]}) {
              result.b = getValue(${u});
            }
            ${v.output} = result;
          }
        `;return{...t,output:{dims:a,type:n[0].type,textureType:2},shaderSource:x,hasMain:!0}},Wm=(e,t,n)=>{let i=OA(t.length,n.cacheKey);return{...i,get:()=>PA(e,i,t,n.axis)}},Wi=(e,t,n)=>{let i=e.indexOf(t);return e.map((e,t)=>t===i?`${e} - ${n}`:e).join()}}),Xm=N(()=>{"use strict";lt(),Ae(),Hm(),qm=(e,t,n)=>(RA(t),e.session.pack&&t[0].dims.length>1?[e.run(Wm(e,t,n),t)]:[e.run(DA(e,t,n),t)]),EA=(e,t)=>({name:"Concat",inputNames:Array.from({length:e},(e,t)=>`X${t}`),inputTypes:Array(e).fill(0),cacheHint:t}),CA=(e,t,n,i)=>{let o=n[0].dims.slice();if(i>=o.length||i<-1*o.length)throw Error("axis specified for concat doesn't match input dimensionality");i<0&&(i=o.length+i);let a=o.slice(0);for(let e=1;e<n.length;e++){let t=n[e].dims.slice();for(let e=0;e<o.length;e++)if(e===i)a[i]+=t[e];else if(o[e]!==t[e])throw Error("non concat dimensions must match")}let s=a.length,u=Array(n.length),l=0;for(let e=0;e<u.length;++e)l+=n[e].dims[i],u[e]=l;let d="";d=n.length<5?jm(u):kA(u);let p=NA(n.length,s),c=LA(u),h=`
        ${p}
        ${c}
        ${d}
        float process(int indices[${s}]) {
          int textureIndex = getTextureWhereDataResides (indices[${i}]);

          if(textureIndex != 0) {
            indices[${i}] = indices[${i}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...t,output:{dims:a,type:n[0].type,textureType:0},shaderSource:h}},DA=(e,t,n)=>{let i=EA(t.length,n.cacheKey);return{...i,get:()=>CA(e,i,t,n.axis)}},jm=e=>`int getTextureWhereDataResides(int index) {
      ${e.map((e,t)=>`if(index<${e}) {return ${t};}
`).join("")}
    }`,kA=e=>jm(e),NA=(e,t)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${t}]) {`];for(let t=0;t<e;++t)0===t?n.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===e-1?n.push(`	else { return _X${t}(indices); }`):n.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return n.push("	}"),n.join(`
`)},LA=e=>{let t=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<e.length;++n)0===n?t.push(`	if (index == ${n}) { return ${e[n]}; }`):n===e.length-1?t.push(`	else { return ${e[n]}; }`):t.push(`	else if (index == ${n}) { return ${e[n]}; }`);return t.push("	}"),t.join(`
`)},Km=e=>ve({axis:e.attributes.getInt("axis")}),RA=e=>{if(!e||e.length<1)throw Error("too few inputs");let t=e[0].type,n=e[0].dims.length;if("string"===t)throw Error("string tensor is not supported yet");for(let i of e){if(i.type!==t)throw Error("input tensors should be one type");if(i.dims.length!==n)throw Error("input tensors should have the same shape")}}});function zA(){return Bt("abs")}function MA(){return Bt("acos")}function BA(){return Bt("asin")}function FA(){return Bt("atan")}function VA(){return Bt("ceil")}function GA(){return Bt("cos")}function UA(e){let t="elu";return{body:`
  const float alpha = float(${e});

  float ${t}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function WA(){return Bt("exp")}function HA(){return Bt("floor")}function $l(e,t){let n="clip";return{body:`
  const float min = float(${e});
  const float max = float(${t});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function qA(){let e="indentity";return{body:`
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
  `,name:t,type:0}}function KA(){return Bt("log")}function XA(){let e="neg";return{body:`
  float ${e}_(float a) {
    return -a;
  }
  vec4 ${e}_(vec4 v) {
    return -v;
  }
  `,name:e,type:0}}function ZA(){let e="not";return{body:`
  float ${e}_(float a) {
    return float( ! bool(a) );
  }
  bool ${e}_(bool a) {
    return !a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 ${e}_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:e,type:0}}function JA(){return Bt("sin")}function Al(){let e="relu";return{body:`
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
  `,name:e,type:0}}var tO,nt,Zm,Jm,Qm,Ym,Pl,eg,tg,nO,ng,rg,og,ig,ag,sg,El,ug,lg,cg,dg,pg,fg,hg,mg,gg,bg,yg,Cl=N(()=>{"use strict";lt(),Le(),Qn(),Ze(),Ae(),tO=(e,t,n,i)=>{let o=2*!!e.session.pack,a=se(e.session.backend.glContext.version);return{...t,output:{dims:n.dims,type:n.type,textureType:o},shaderSource:`
     ${i.body}
     void main() {
       vec4 v = ${a.texture2D}(A, TexCoords);
       v = ${i.name}_(v);
       ${a.output} = v;
     }
     `,hasMain:!0}},nt=(e,t,n,i)=>{let o=2*!!e.session.pack,a={name:n.name,inputTypes:[o],inputNames:["A"],cacheHint:i};return{...a,get:()=>tO(e,a,t,n)}},Zm=(e,t)=>[e.run(nt(e,t[0],zA()),t)],Jm=(e,t)=>[e.run(nt(e,t[0],MA()),t)],Qm=(e,t)=>[e.run(nt(e,t[0],BA()),t)],Ym=(e,t)=>[e.run(nt(e,t[0],FA()),t)],Pl=(e,t,n)=>[e.run(nt(e,t[0],$l(n.min,n.max),n.cacheKey),t)],eg=e=>ve({min:e.attributes.getFloat("min",Nr),max:e.attributes.getFloat("max",Lr)}),tg=(e,t)=>{let n=nO(e,t);return Pl(e,[t[0]],n)},nO=(e,t)=>{if(t.length>=3&&(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)))throw Error("dynamic clip attributes are not allowed");let n=t.length>=3?t[1].numberData[0]:Nr,i=t.length>=3?t[2].numberData[0]:Lr;return ve({min:n,max:i})},ng=(e,t)=>[e.run(nt(e,t[0],VA()),t)],rg=(e,t)=>[e.run(nt(e,t[0],GA()),t)],og=(e,t,n)=>[e.run(nt(e,t[0],UA(n.alpha),n.cacheKey),t)],ig=e=>ve({alpha:e.attributes.getFloat("alpha",1)}),ag=(e,t)=>[e.run(nt(e,t[0],WA()),t)],sg=(e,t)=>[e.run(nt(e,t[0],HA()),t)],El=(e,t)=>[e.run(nt(e,t[0],qA()),t)],ug=(e,t,n)=>[e.run(nt(e,t[0],jA(n.alpha),n.cacheKey),t)],lg=e=>ve({alpha:e.attributes.getFloat("alpha",.01)}),cg=(e,t)=>[e.run(nt(e,t[0],KA()),t)],dg=(e,t)=>[e.run(nt(e,t[0],XA()),t)],pg=(e,t)=>[e.run(nt(e,t[0],ZA()),t)],fg=(e,t)=>[e.run(nt(e,t[0],Al()),t)],hg=(e,t)=>[e.run(nt(e,t[0],Ol()),t)],mg=(e,t)=>[e.run(nt(e,t[0],JA()),t)],gg=(e,t)=>[e.run(nt(e,t[0],QA()),t)],bg=(e,t)=>[e.run(nt(e,t[0],YA()),t)],yg=(e,t)=>[e.run(nt(e,t[0],eO()),t)]});function Bn(e){let t;switch(e.activation){case"Relu":t=Al();break;case"Sigmoid":t=Ol();break;case"Clip":t=$l(e.clipMin,e.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=t.name;return{activationFunction:t.body,applyActivation:`value = ${n}_(value);`}}var oo,oO,iO,_g,aO,sO,vg,Mr=N(()=>{"use strict";Le(),Cl(),oo=e=>{let t=e.getString("activation","");if("Clip"===t){let[n,i]=e.getFloats("activation_params",[Nr,Lr]);return{activation:t,clipMax:i,clipMin:n,activationCacheKey:`${t}:${n},${i}`}}return{activation:t,activationCacheKey:t}}}),wg=N(()=>{"use strict";Ct(),Ze(),Ae(),Hi(),Mr(),oO=(e,t)=>({name:"GroupedConv",inputNames:e?["X","W","Bias"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),iO=(e,t,n,i)=>{let o=t.length>2?"value += getBias(output_channel);":"",a=t[0].dims.slice(),s=t[1].dims.slice(),u=s[0]/i.group;ze.verbose("GroupedConv",`autpPad:${i.autoPad}, dilations:${i.dilations}, group:${i.group}, kernelShape:${i.kernelShape}, pads:${i.pads}, strides:${i.strides}`);let l=io(a,s,i.dilations,i.pads,i.strides),d=se(e.session.backend.glContext.version),{activationFunction:p,applyActivation:c}=Bn(i),h=`
  const ivec2 strides = ivec2(${i.strides[0]}, ${i.strides[1]});
  const ivec2 pads = ivec2(${i.pads[0]}, ${i.pads[1]});
  ${p}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${u};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${s[1]}; wInChannel++) {
      int input_channel = group_id * ${s[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${s[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${i.dilations[0]};

        if (xHeight < 0 || xHeight >= ${a[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${s[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${i.dilations[1]};
          if (xWidth < 0 || xWidth >= ${a[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${o}
    ${c}
    ${d.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:l,type:t[0].type,textureType:0},shaderSource:h,hasMain:!0}},_g=(e,t,n)=>{let i=oO(t.length>2,n.cacheKey);return{...i,get:()=>iO(e,t,i,n)}}}),xg=N(()=>{"use strict";Ze(),Ae(),zr(),aO=e=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:e}),sO=(e,t,n,i,o,a)=>{let s=n.dims,u=i.dims,l=2,d=3,p=o.length,c=[u[1]*u[2]*u[3],o[2]*o[3]],h=u[2]*u[3],f=Mn(),m=se(e.session.backend.glContext.version),g="";for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)g+=`
            blockIndex = rc.x + ${t};
            pos = rc.y + ${e};

            if(blockIndex < ${c[1]} && pos < ${c[0]}) {
              offsetY = int(blockIndex / (${o[p-1]})) * ${a.strides[0]} -
                ${a.pads[0]};
              d0 = offsetY + ${a.dilations[0]} * (imod(pos, ${h}) / ${u[2]});

              if(d0 < ${s[l]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[p-1]}) * ${a.strides[1]} -
                  ${a.pads[1]};
                d1 = offsetX + ${a.dilations[1]} * imod(imod(pos, ${h}), ${u[2]});

                if(d1 < ${s[d]} && d1 >= 0) {

                  ch = int(float(pos)/ ${h}.);
                    innerDims = vec2(d0, d1);
                    result[${2*e+t}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let b=`
      ${f}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${g}
          ${m.output} = result;
      }
            `;return{...t,output:{dims:c,type:n.type,textureType:2},shaderSource:b,hasMain:!0}},vg=(e,t,n,i,o)=>{let a=aO(o.cacheKey);return{...a,get:()=>sO(e,a,t,n,i,o)}}});function lO(e,t,n){let i=t[0].dims,o=t[1].dims,a=gt.calcShape(i,o,!0);if(!a)throw Error("Can't use matmul on the given tensors");let s=bt(a.length),u=Kt(),{activationFunction:l,applyActivation:d}=Bn(n),p=t.length>2,c=p?"value += getBiasForMatmul();":"",h=p?`${kl(s,u,t[2].dims,a,!1)}`:"",f=a.length,m=i.length,g=o.length,b=i[i.length-1],y=`
    ${l}
    ${h}
    float process(int indices[${f}]) {
        int a[${m}];
        int b[${g}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${b}; ++k) {
            a[${m-1}] = k;
            b[${g-2}] = k;
            value += _A(a) * _B(b);
        }
        ${c}
        ${d}
        return value;
    }`;return{...e,output:{dims:a,type:t[0].type,textureType:0},shaderSource:y}}function Dl(e,t){let n=uO(e.length>2,t.activationCacheKey);return{...n,get:()=>lO(n,e,t)}}function kl(e,t,n,i,o){let a="",s=n.length,u=i.length,l=u-s;a=u<2&&s>0?"coords":n.map((e,n)=>`coords.${t[n+l]}`).join(", ");let d=gt.getBroadcastDims(n,i).map(e=>`coords.${t[e+l]} = 0;`).join(`
`),p=1===te.size(n),c="vec4(outputValue.xx, outputValue.yy)";return p&&(c="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${e} coords = getOutputCoords();
  ${d}
  vec4 outputValue = getBias(${a});
  return ${c};
}`:`
float getBiasForMatmul() {
  ${e} coords = getOutputCoords();
  ${d}
  return getBias(coords.x);
}`}var Tg,Ig,uO,cO,qi=N(()=>{"use strict";Le(),Ae(),zn(),Mr(),Nl(),Tg=(e,t,n)=>(cO(t),e.session.pack?[e.run(ji(e,t,n),t)]:[e.run(Dl(t,n),t)]),Ig=e=>oo(e.attributes),uO=(e,t)=>({name:"MatMul",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),cO=e=>{if(!e||2!==e.length)throw Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw Error("shared dimension does not match.");if("float32"!==e[0].type&&"float64"!==e[0].type||"float32"!==e[1].type&&"float64"!==e[1].type)throw Error("inputs should be float type");if(e[0].type!==e[1].type)throw Error("inputs types should match")}});function fO(e,t,n,i){let o=[],a=[],s=n[0].dims,u=n[1].dims,l=s.length,d=u.length,p=i.length,c=p-l,h=p-d;(o=s.map((e,n)=>`coords.${t[n+c]}`))[l-1]="i*2",o.join(", "),(a=u.map((e,n)=>`coords.${t[n+h]}`))[d-2]="i*2",a.join(", ");let f=gt.getBroadcastDims(s,i),m=gt.getBroadcastDims(u,i),g=f.map(e=>`coords.${t[e+c]} = 0;`).join(`
`),b=m.map(e=>`coords.${t[e+h]} = 0;`).join(`
`),y=`int lastDim = coords.${t[p-1]};
  coords.${t[p-1]} = coords.${t[p-2]};
  coords.${t[p-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${e} coords = getOutputCoords();
  ${y}
  ${g}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${e} coords = getOutputCoords();
  ${y}
  ${b}
  vec4 outputValue = getB(${a});
  return outputValue;
}`}function hO(e,t){let n="";for(let i=0;i<t-2;i++)n+=`rc.${e[i]}, `;return n+`rc.${e[t-2]}, i*2`}function mO(e,t){let n="";for(let i=0;i<t-2;i++)n+=`rc.${e[i]}, `;return n+`i*2, rc.${e[t-1]}`}var dO,pO,ji,Sg,gO,bO,Ag,Ll,yO,_O,Og,io,zl,wO,vO,xO,TO,Ml,IO,SO,$O,AO,Eg,OO,PO,EO,CO,DO,kO,Cg,NO,kg,Br,Ng,LO,Lg,RO,zO,MO,Rg,zg,BO,Bg,Fg,FO,mr,Gg,Ug,VO,GO,UO,WO,Bl,Hg,qg,jg,HO,qO,jO,Xg,Zg,KO,XO,ZO,JO,QO,Yg,eb,Qg,YO,eP,tP,nP,rP,oP,Nl=N(()=>{"use strict";Le(),Ze(),Ae(),zn(),Mr(),qi(),dO=(e,t)=>({name:"MatMul (packed)",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[2,2,2]:[2,2],cacheHint:t}),pO=(e,t,n,i)=>{let o=n.length>2,a=o?"value += getBiasForMatmul();":"",s=n[0].dims,u=n[1].dims,l=gt.calcShape(s,u,!0),d=!te.areEqual(n[0].dims,n[1].dims);if(!l)throw Error("Can't use matmul on the given tensors");let p=Math.ceil(s[s.length-1]/2),c=s.length,h=u.length,f=se(e.session.backend.glContext.version),m=bt(l.length),g=l.length,b=Kt(),{activationFunction:y,applyActivation:_}=Bn(i),v=o?`${kl(m,b,n[2].dims,l,!0)}`:"",x=d?`${fO(m,b,n,l)}`:"",w=d?"getAAtOutCoordsMatmul(i)":`getA(${hO(b,c)})`,$=d?"getBAtOutCoordsMatmul(i)":`getB(${mO(b,h)})`,T=d?"":`${m} rc =
          getOutputCoords(); int lastDim = rc.${b[g-1]}; rc.${b[g-1]} =
          rc.${b[g-2]}; rc.${b[g-2]} = lastDim;
      `,I=`
            ${x}
            ${v}
            ${y}
            void main() {
              ${T}

              vec4 value = vec4(0);
              for (int i = 0; i < ${p}; i++) {
                vec4 a = ${w};
                vec4 b = ${$};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${a}
              ${_}
              ${f.output} = value;
            }`;return{...t,output:{dims:l,type:n[0].type,textureType:2},shaderSource:I,hasMain:!0}},ji=(e,t,n)=>{let i=dO(t.length>2,n.activationCacheKey);return{...i,get:()=>pO(e,i,t,n)}}}),$g=N(()=>{"use strict";Hi(),xg(),Nl(),Sg=(e,t,n)=>{let i=t[0].dims,o=t[1].dims,a=io(i,o,n.dilations,n.pads,n.strides),s=e.run(vg(e,t[0],t[1],a,n),[t[0]]),u=e.reshapePacked(t[1],[o[0],o[1]*o[2]*o[3]]),l=3===t.length?[u,s,t[2]]:[u,s],d=e.run(ji(e,l,n),l);return e.reshapePacked(d,a)}}),Rl=N(()=>{"use strict";Ae(),gO=e=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:e}),bO=(e,t,n,i,o,a)=>{let s=n.dims,u=i.dims,l=o.length,d=Ll(s,u,o,4),p=`
        const int XC = ${s[1]};
        const int XH = ${s[2]};
        const int XW = ${s[3]};
        const int KH = ${a.kernelShape[0]};
        const int KW = ${a.kernelShape[1]};
        const int dilationH = ${a.dilations[0]};
        const int dilationW = ${a.dilations[1]};
        const int strideH = ${a.strides[0]};
        const int strideW = ${a.strides[1]};
        const int padH = ${a.pads[0]};
        const int padW = ${a.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${l}]) {
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
              int x[${s.length}];
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
        `;return{...t,output:{dims:d,type:n.type,textureType:4},shaderSource:p}},Ag=(e,t,n,i,o)=>{let a=gO(o.cacheKey);return{...a,get:()=>bO(e,a,t,n,i,o)}},Ll=(e,t,n,i=4)=>[n[0],n[2],n[3],Math.ceil(e[1]*t[2]*t[3]/i)]}),Pg=N(()=>{"use strict";Le(),Ze(),Ae(),Mr(),Rl(),yO=(e,t)=>({name:"ConvDotProduct",inputNames:e?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:e?[0,4,0]:[0,4],cacheKey:t.activationCacheKey}),_O=(e,t,n,i,o)=>{let a=n[0].dims,s=n[1].dims,u=[s[0],Math.ceil(a[1]*s[2]*s[3]/4)],l=Ll(a,s,i),[d,p]=e.calculateTextureWidthAndHeight(u,4),c=te.computeStrides(l),[h,f]=e.calculateTextureWidthAndHeight(l,4),m=i.length,g=n.length<3?"0.0":"_B(b)",b=Math.ceil(a[1]*s[2]*s[3]/4),{activationFunction:y,applyActivation:_}=Bn(o),v=se(e.session.backend.glContext.version),x=`
${y}
float process(int indices[${m}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${c[0]} + im2col[1] * ${c[1]} + im2col[2] * ${c[2]};
  int kernelOffset = indices[1] * ${u[1]};
  float value = ${g};
  for (int i = 0; i < ${b}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${h}, ${f});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${d}, ${p});
    value += dot(${v.texture2D}(Im2Col, im2colCoords), ${v.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${_}
  return value;
}`;return{...t,output:{dims:i,type:n[0].type,textureType:0},shaderSource:x}},Og=(e,t,n,i)=>{let o=yO(t.length>2,i);return{...o,get:()=>_O(e,o,t,n,i)}}}),Hi=N(()=>{"use strict";lt(),Le(),wg(),$g(),Pg(),Mr(),Rl(),qi(),io=(e,t,n,i,o)=>{let a=e[0],s=e.slice(2),u=s.length,l=t[0],d=t.slice(2).map((e,t)=>e+(e-1)*(n[t]-1));return[a,l].concat(...s.map((e,t)=>e+i[t]+i[t+u]).map((e,t)=>Math.floor((e-d[t]+o[t])/o[t])))},zl=(e,t,n)=>(IO(t,n),wO(e,t,n)),wO=(e,t,n)=>{let i=TO(n,t),o=e.session.pack,a=1===i.kernelShape[0]&&1===i.kernelShape[1];return i.group>1?[e.run(_g(e,t,i),t)]:a&&o?[vO(e,t,i)]:o&&4===t[0].dims.length&&1===t[0].dims[0]&&!a?[Sg(e,t,i)]:[xO(e,t,i)]},vO=(e,t,n)=>{let i=t[0].dims,o=t[1].dims,a=io(i,o,n.dilations,n.pads,n.strides),s=e.reshapeUnpacked(t[0],[i[1],i[2]*i[3]]),u=e.reshapeUnpacked(t[1],[o[0],o[1]]),l=t.length>2?[u,s,t[2]]:[u,s],d=e.run(Dl(l,n),l);return e.reshapeUnpacked(d,a)},xO=(e,t,n)=>{let i=t[0].dims,o=t[1].dims,a=io(i,o,n.dilations,n.pads,n.strides),s=e.run(Ag(e,t[0],t[1],a,n),[t[0]]),u=3===t.length?[s,t[1],t[2]]:[s,t[1]];return e.run(Og(e,t,a,n),u)},TO=(e,t)=>{let n=e.kernelShape.slice();if(0===e.kernelShape.length)for(let e=2;e<t[1].dims.length;++e)n.push(t[1].dims[e]);let i=e.pads.slice();kr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,i,e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:n,pads:i,cacheKey:e.cacheKey}),o},Ml=e=>{let t=e.attributes,n=oo(t),i=t.getString("auto_pad","NOTSET"),o=t.getInts("dilations",[1,1]),a=t.getInt("group",1),s=t.getInts("kernel_shape",[]),u=t.getInts("pads",[0,0,0,0]),l=t.getInts("strides",[1,1]);return ve({autoPad:i,dilations:o,group:a,kernelShape:s,pads:u,strides:l,...n})},IO=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length||4!==e[1].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims[1]!==e[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.length!==2*n)throw Error(`pads should be ${2*n}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if("float32"!==e[0].type||"float32"!==e[1].type)throw Error("Conv input(X,W) should be float tensor");if(3===e.length&&"float32"!==e[2].type)throw Error("Conv input(bias) should be float tensor")}}),Dg=N(()=>{"use strict";lt(),Ze(),Ae(),Mr(),SO=(e,t,n,i,o,a)=>(e-1)*t+n+(i-1)*o+1-a,$O=(e,t,n,i,o)=>{let a=Math.floor(e/2);"SAME_UPPER"===t?(n[i]=a,n[o]=e-a):"SAME_LOWER"===t&&(n[i]=e-a,n[o]=a)},AO=(e,t,n,i,o,a,s,u)=>{let l=e.length-2,d=0===u.length;for(let p=0;p<l;++p){let c=d?e[p+2]*a[p]:u[p];$O(SO(e[p+2],a[p],o[p],t[p],n[p],c),i,o,p,p+l),d&&u.push(a[p]*(e[p+2]-1)+s[p]+(t[p]-1)*n[p]+1-o[p]-o[p+l])}},Eg=(e,t,n)=>(NO(t,n),OO(e,t,n)),OO=(e,t,n)=>{let i=kO(n,t);return[DO(e,t,i)]},PO=(e,t)=>({name:"ConvTranspose",inputNames:e?["X","W","B"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),EO=(e,t,n,i)=>{let o=t.length>2?"getB(output_channel)":"0.0",a=t[0].dims,s=t[1].dims,u=s[1],l=s[0]/i.group,d=[t[0].dims[0],t[1].dims[1]*i.group,...i.outputShape],p=se(e.session.backend.glContext.version),{activationFunction:c,applyActivation:h}=Bn(i),f=`
  const ivec2 strides = ivec2(${i.strides[0]}, ${i.strides[1]});
  const ivec2 pads = ivec2(${i.pads[0]}, ${i.pads[1]});
  ${c}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${u};
    int wOutChannel = output_channel - group_id * ${u};

    float value = ${o};
    for (int inChannelOffset = 0; inChannelOffset < ${l}; inChannelOffset++) {
      int input_channel = group_id * ${l} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${s[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${s[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${i.dilations[0]}, wHOff * ${i.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${a[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${a[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${h}
    ${p.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:d,type:t[0].type,textureType:0},shaderSource:f,hasMain:!0}},CO=(e,t,n)=>{let i=PO(t.length>2,n.cacheKey);return{...i,get:()=>EO(e,t,i,n)}},DO=(e,t,n)=>e.run(CO(e,t,n),t),kO=(e,t)=>{let n=e.kernelShape.slice();if(0===e.kernelShape.length)for(let e=2;e<t[1].dims.length;++e)n.push(t[1].dims[e]);let i=e.pads.slice(),o=e.outputShape.slice();AO(t[0].dims,n,e.dilations,e.autoPad,i,e.strides,e.outputPadding,o);let a=Object.assign({},e);return Object.assign(a,{kernelShape:n,pads:i,outputShape:o,cacheKey:e.cacheKey}),a},Cg=e=>{let t=e.attributes,n=oo(t),i=t.getString("auto_pad","NOTSET"),o=t.getInts("dilations",[1,1]),a=t.getInt("group",1),s=t.getInts("kernel_shape",[]),u=t.getInts("output_padding",[0,0]),l=t.getInts("output_shape",[]),d=t.getInts("pads",[0,0,0,0]),p=t.getInts("strides",[1,1]);return ve({autoPad:i,dilations:o,group:a,kernelShape:s,outputPadding:u,outputShape:l,pads:d,strides:p,...n})},NO=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length||4!==e[1].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims[1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==n))throw Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw Error(`strides should be ${i}D`);if(t.pads.length!==2*i)throw Error(`pads should be ${2*i}D`);if(t.outputPadding.length!==i)throw Error(`output_padding should be ${i}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape");if("float32"!==e[0].type||"float32"!==e[1].type)throw Error("ConvTranspose input(X,W) should be float tensor");if(3===e.length&&"float32"!==e[2].type)throw Error("ConvTranspose input(bias) should be float tensor")}}),Ki=N(()=>{"use strict";lt(),Le(),Ae(),kg={name:"Transpose",inputNames:["A"],inputTypes:[0]},Br=(e,t,n)=>(MO(t),[e.run({...kg,cacheHint:n.cacheKey,get:()=>LO(e,t[0],n.perm)},t)]),Ng=e=>ve({perm:e.attributes.getInts("perm",[])}),LO=(e,t,n)=>{let i=t.dims;n=Lg(i,n);let o=RO(i,n),a=i.length,s=`
      ${zO("perm",n,a)}
      float process(int indices[${a}]) {
        int a[${a}];
        perm(a, indices);
        return _A(a);
      }`;return{...kg,output:{dims:o,type:t.type,textureType:0},shaderSource:s}},Lg=(e,t)=>(t&&t.length!==e.length&&(t=[...e.keys()].reverse()),t),RO=(e,t)=>(t=Lg(e,t),te.sortBasedOnPerm(e,t)),zO=(e,t,n)=>{let i=[];i.push(`void ${e}(out int a[${n}], int src[${n}]) {`);for(let e=0;e<n;++e)i.push(`	a[${t[e]}]=src[${e}];`);return i.push("	}"),i.join(`
`)},MO=e=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("input should be float tensor")}}),Mg=N(()=>{"use strict";Ki(),Rg=(e,t,n)=>{BO(t);let i=n.blocksize,o=i*i,a="DCR"===n.mode?[0,3,4,1,5,2]:[0,1,4,2,5,3],s="DCR"===n.mode?[t[0].dims[0],i,i,t[0].dims[1]/o,t[0].dims[2],t[0].dims[3]]:[t[0].dims[0],t[0].dims[1]/o,i,i,t[0].dims[2],t[0].dims[3]],u=e.reshapeUnpacked(t[0],s),l={perm:a,cacheKey:`${a}`},[d]=Br(e,[u],l),p=[t[0].dims[0],t[0].dims[1]/o,t[0].dims[2]*i,t[0].dims[3]*i];return[e.reshapeUnpacked(d,p)]},zg=e=>{let t=e.attributes.getInt("blocksize");if(t<1)throw Error(`blocksize must be >= 1, but got : ${t} for DepthToSpace`);let n=e.attributes.getString("mode","DCR");if("DCR"!==n&&"CRD"!==n)throw Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:t}},BO=e=>{if(1!==e.length)throw Error(`DepthToSpace expect 1 inputs, but got ${e.length}`);if("string"===e[0].type||4!==e[0].dims.length)throw TypeError("DepthToSpace input should be a 4-D numeric tensor")}}),Vg=N(()=>{"use strict";Le(),Bg=(e,t,n)=>{FO(t,n);let i=te.flattenShape(t[0].dims,n);return[e.reshapeUnpacked(t[0],i)]},Fg=e=>e.attributes.getInt("axis",1),FO=(e,t)=>{if(!e||1!==e.length)throw Error("Flatten requires 1 input.");let n=e[0].dims.length;if(0===n)throw Error("scalar tensor is not supported.");if(t<-n||t>n)throw Error("Invalid axis");if("string"===e[0].type)throw Error("string tensor is not supported.")}}),Lo=N(()=>{"use strict";mr=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]}),Wg=N(()=>{"use strict";lt(),Lo(),Le(),Ae(),Gg=(e,t,n)=>(WO(t,n.axis),[e.run(UO(e,t,n),t)]),Ug=e=>ve({axis:e.attributes.getInt("axis",0)}),VO={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},GO=(e,t,n,i)=>{let o=n[0].dims.slice(),a=n[1].dims.slice(),s=Array(o.length+a.length-1);i=te.normalizeAxis(i,o.length);let u=[];for(let e=0;e<s.length;e++)e<i?(s[e]=o[e],u.push(`inputIdx[${e}] = outputIdx[${e}];`)):e<i+a.length?(s[e]=a[e-i],u.push(`indexDataIdx[${e-i}] = outputIdx[${e}];`)):(s[e]=o[e-a.length+1],u.push(`inputIdx[${e-a.length+1}] = outputIdx[${e}];`));let l=s.length||1,d=o.length,p=a.length||1,c=`
      float process(int outputIdx[${l}]) {
        int inputIdx[${d}];
        int indexDataIdx[${p}];
        indexDataIdx[0] = 0;
        ${u.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${i}] = idx < 0 ? idx + ${o[i]} : idx;
        return _A(inputIdx);
      }`;return{...t,output:{dims:s,type:n[0].type,textureType:0},shaderSource:c}},UO=(e,t,n)=>{let i={...VO,cacheHint:n.cacheKey};return{...i,get:()=>GO(e,i,t,n.axis)}},WO=(e,t)=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.");let n=e[0].dims.length;if(n<1)throw Error("Invalid input shape.");if(t<-n||t>n-1)throw Error("Invalid axis.");if(-1===mr.indexOf(e[0].type)||"int32"!==e[1].type&&"int16"!==e[1].type)throw Error("Invaid input type.")}}),Kg=N(()=>{"use strict";lt(),Le(),Ae(),Bl=(e,t,n)=>(jO(t,n),[e.run(HO(t,n),t)]),Hg=(e,t)=>{let n=0!==e.attributes.getInt("transA",0),i=0!==e.attributes.getInt("transB",0),o=e.attributes.getFloat("alpha",1),a=e.attributes.getFloat("beta",1);return ve({transA:n,transB:i,alpha:o,beta:a,isOptionalC:t})},qg=e=>Hg(e,!1),jg=e=>Hg(e,!0),HO=(e,t)=>{let n={name:"Gemm",inputNames:3===e.length?["A","B","C"]:["A","B"],inputTypes:3===e.length?[0,0,0]:[0,0],key:t.cacheKey};return{...n,get:()=>qO(n,e,t)}},qO=(e,t,n)=>{let i=t[0].dims.slice(),o=t[1].dims.slice(),[a,s]=zi.getShapeOfGemmResult(i,n.transA,o,n.transB,3===t.length?t[2].dims:void 0),u=[a,s];if(!u)throw Error("Can't use gemm on the given tensors");let l=i[i.length-1],d="";n.transA&&(l=i[0]),n.transA&&n.transB?d="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?d="value += _A_T(a) * _B(b);":!n.transA&&n.transB?d="value += _A(a) * _B_T(b);":n.transA||n.transB||(d="value += _A(a) * _B(b);");let p=u.length,c=3===t.length?`int c[${t[2].dims.length}];`:"",h=3===t.length?"bcastIndices_C(indices, c);":"",f=3===t.length?"value += beta * _C(c);":"",m=`
      float process(int indices[${p}]) {
          int a[${p}];
          int b[${p}];
          ${c}

          copyVec(indices, a);
          copyVec(indices, b);
          ${h}

          float value = 0.0;
          for (int k=0; k<${l}; ++k) {
              a[${p-1}] = k;
              b[${p-2}] = k;
              ${d}
          }

          value = value * alpha;
          ${f}
          return value;
      }`;return{...e,output:{dims:u,type:t[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:m}},jO=(e,t)=>{if(!e)throw Error("Input is missing");if(t.isOptionalC&&(e.length<2||e.length>3))throw Error("Invaid input shape.");if(!t.isOptionalC&&3!==e.length)throw Error("Gemm requires 3 inputs");if(3===e.length&&1!==e[2].dims.length&&2!==e[2].dims.length)throw Error("Invalid input shape of C");if("float32"!==e[0].type&&"float64"!==e[0].type||"float32"!==e[1].type&&"float64"!==e[1].type||3===e.length&&"float32"!==e[2].type&&"float64"!==e[2].type)throw Error("Invalid input type.");if(e[0].type!==e[1].type||3===e.length&&e[0].type!==e[2].type)throw Error("Input types are mismatched")}}),Jg=N(()=>{"use strict";lt(),Ae(),Xg=(e,t,n)=>(QO(t),[e.run(ZO(e,t,n),t)]),Zg=e=>{let t=e.attributes.getFloat("scale"),n=e.attributes.getFloats("bias");return ve({scale:t,bias:n})},KO={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},XO=(e,t,n,i)=>{let o=n[0].dims.slice(),a=o.length,s=`
      ${JO(i.bias.length)}
      float process(int indices[${a}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...t,output:{dims:o,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:i.bias.length,data:i.bias},{name:"scale",type:"float",data:i.scale}],shaderSource:s}},ZO=(e,t,n)=>{let i={...KO,cacheHint:n.cacheKey};return{...i,get:()=>XO(e,i,t,n)}},JO=e=>{let t=[`float getBias(float bias[${e}], int channel) {`];for(let n=0;n<e;++n)0===n?t.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===e-1?t.push(`	else { return bias[${n}]; }`):t.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return t.push("	}"),t.join(`
`)},QO=e=>{if(!e||1!==e.length)throw Error("ImageScaler requires 1 input.");if(4!==e[0].dims.length)throw Error("Invalid input shape.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")}}),tb=N(()=>{"use strict";Ze(),Ae(),Yg=(e,t,n)=>{oP(t);let i=e.run(eP(t[0]),t);return[e.run(rP(e,t[0],n,i.dims),[t[0],i,t[1],t[2]])]},eb=e=>e.attributes.getFloat("epsilon",1e-5),Qg={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},YO=(e,t)=>{let n=t.dims.slice(),i=n[1],o=n[2]*n[3],a=[n[0],i],s=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${o});
        temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${o});

        return v;
      }`;return{...e,output:{dims:a,type:t.type,textureType:4},shaderSource:s}},eP=e=>({...Qg,get:()=>YO(Qg,e)}),tP={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},nP=(e,t,n,i,o)=>{let a=se(e.session.backend.glContext.version),[s,u]=e.calculateTextureWidthAndHeight(o,4),[l,d]=[s/4,u],p=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${l}, ${d});
        return ${a.texture2D}(MeanAndVariance, coords);
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
      }`;return{...t,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:i}],shaderSource:p}},rP=(e,t,n,i)=>{let o={...tP,cacheHint:`${n}`};return{...o,get:()=>nP(e,o,t,n,i)}},oP=e=>{if(!e||3!==e.length)throw Error("InstanceNormalization requires 3 inputs.");let t=e[0],n=e[1],i=e[2];if(t.dims.length<3||1!==n.dims.length||1!==i.dims.length)throw Error("Invalid input shape.");if(n.dims[0]!==t.dims[1]||i.dims[0]!==t.dims[1])throw Error("Input shapes are mismatched.");if("float32"!==t.type&&"float64"!==t.type||"float32"!==n.type&&"float64"!==n.type||"float32"!==i.type&&"float64"!==i.type)throw Error("Invalid input type.");if(4!==e[0].dims.length)throw Error("Only support 4-D input shape.")}});function iP(e,t){let n=e[0].dims[1],i=e[0].dims.length,o=-Math.floor((t.size-1)/2),a=Math.ceil((t.size-1)/2),s=`float(${t.alpha}) / float(${t.size})`,u=`float(${t.bias})`,l=`float(${t.beta})`,d=`
    float process(int indices[${i}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${o}; i <= ${a}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${n}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${u} + ${s} * square_sum, ${l});
    }`;return{...ob,cacheHint:t.cacheKey,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:d}}function aP(e,t){return{...ob,cacheHint:t.cacheKey,get:()=>iP(e,t)}}var nb,rb,ob,sP,uP,Fl,ab,sb,ub,lP,cP,dP,pP,fP,hP,mP,gP,db,pb,fb,hb,mb,gb,bb,yb,_b,bP,cb,wb,Zi,vb,Xi,yP,Fr,gr,_P,wP,Tb,Ib,Sb,$b,Ab,Ob,Pb,Cb,kb,Vl,Nb,Lb,Ro,vP,Gl,Ji,Wl,Hl,Rb,zb,xP,TP,IP,SP,Bb,$P,ql,Vb,Gb,Ub,AP,Wb,OP,PP,qb,jb,Kb,Xb,Zb,Jb,Qb,Yb,EP,CP,DP,ey,ny,ry,oy,kP,NP,LP,jl,ay,sy,RP,zP,ly,MP,BP,dy,FP,VP,Kl,fy,hy,GP,UP,gy,ib=N(()=>{"use strict";lt(),Ae(),nb=(e,t,n)=>(sP(t),[e.run(aP(t,n),t)]),rb=e=>{let t=e.attributes.getFloat("alpha",1e-4),n=e.attributes.getFloat("beta",.75),i=e.attributes.getFloat("bias",1),o=e.attributes.getInt("size");return ve({alpha:t,beta:n,bias:i,size:o})},ob={name:"LRN",inputNames:["X"],inputTypes:[0]},sP=e=>{if(!e||1!==e.length)throw Error("LRN requires 1 input.");if(4!==e[0].dims.length)throw Error('currently only support LRN for input with "NCHW" format');if("float32"!==e[0].type)throw Error("input should be float type")}}),lb=N(()=>{"use strict";lt(),Le(),Ze(),Ae(),uP={name:"Pad",inputNames:["A"],inputTypes:[0]},Fl=(e,t,n)=>(dP(t),[e.run({...uP,cacheHint:n.cacheKey,get:()=>cP(e,t[0],n)},t)]),ab=e=>{let t=e.attributes.getString("mode","constant"),n=e.attributes.getFloat("value",0),i=e.attributes.getInts("pads");return ve({mode:t,value:n,pads:i})},sb=(e,t,n)=>{pP(t);let i=lP(e,t,n);return Fl(e,[t[0]],i)},ub=e=>e.attributes.getString("mode","constant"),lP=(e,t,n)=>{if(!e.session.isInitializer(t[1].dataId)||t.length>=3&&!e.session.isInitializer(t[2].dataId))throw Error("dynamic pad attributes are not allowed");let i=Array.from(t[1].integerData),o=t.length>=3?t[2].floatData[0]:0;return ve({mode:n,pads:i,value:o})},cP=(e,t,n)=>{let i=te.padShape(t.dims.slice(),n.pads),o=i.length,a=`
      ${fP(e,t,n)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:i,type:t.type,textureType:0},shaderSource:a}},dP=e=>{if(!e||1!==e.length)throw Error("Pad requires 1 input");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")},pP=e=>{if(!e||2!==e.length&&3!==e.length)throw Error("Pad requires 2 or 3 inputs");if("int32"!==e[1].type||e.length>=3&&"string"===e[2].type)throw Error("Invalid input type.")},fP=(e,t,n)=>{let i=se(e.session.backend.glContext.version),[o,a]=e.calculateTextureWidthAndHeight(t.dims,0),s=te.computeStrides(t.dims);switch(n.mode){case"constant":return hP(i,t.dims,s,o,a,n.pads,n.value);case"reflect":return mP(i,t.dims,s,o,a,n.pads);case"edge":return gP(i,t.dims,s,o,a,n.pads);default:throw Error("Invalid mode")}},hP=(e,t,n,i,o,a,s)=>{let u=t.length,l="";for(let e=u-1;e>=0;--e)l+=`
        k = m[${e}] - ${a[e]};
        if (k < 0)  return constant;
        if (k >= ${t[e]}) return constant;
        offset += k * ${n[e]};
        `;return`
      float padA(int m[${u}]) {
        const float constant = float(${s});
        int offset = 0;
        int k = 0;
        ${l}
        vec2 coords = offsetToCoords(offset, ${i}, ${o});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},mP=(e,t,n,i,o,a)=>{let s=t.length,u="";for(let e=s-1;e>=0;--e)u+=`
        k = m[${e}] - ${a[e]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(t[e]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${t[e]}) { k = _2n_1 - k; }
        }
        offset += k * ${n[e]};
        `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${i}, ${o});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},gP=(e,t,n,i,o,a)=>{let s=t.length,u="";for(let e=s-1;e>=0;--e)u+=`
        k = m[${e}] - ${a[e]};
        if (k < 0)  k = 0;
        if (k >= ${t[e]}) k = ${t[e]-1};
        offset += k * ${n[e]};
      `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${i}, ${o});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `}}),xb=N(()=>{"use strict";lt(),Le(),Ae(),db=(e,t,n)=>{Zi(t);let i={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[e.run({...i,get:()=>fb(t,i,!1,n)},t)]},pb=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),n=e.attributes.getInt("ceil_mode",0),i=0!==e.attributes.getInt("count_include_pad",0),o=e.attributes.getInts("kernel_shape"),a=e.attributes.getInts("strides",[]),s=e.attributes.getInts("pads",[]);if(0!==n)throw Error("using ceil() in shape computation is not yet supported for AveragePool");return ve({autoPad:t,ceilMode:n,countIncludePad:i,kernelShape:o,strides:a,pads:s})},fb=(e,t,n,i)=>{let[o,a]=_b(e,i,n),s=te.size(o.kernelShape),u="value += _X(x);",l="";o.countIncludePad?l+=`value /= float(${s});`:l+=`value /= float(${s} - pad);`;let d=`
        ${vb(e[0].dims,o,u,l,"0.0")}
      `;return{...t,output:{dims:a,type:e[0].type,textureType:0},shaderSource:d}},hb=(e,t,n)=>{Zi(t);let i={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[e.run({...i,get:()=>fb(t,i,!0,n)},t)]},mb=e=>{let t=0!==e.attributes.getInt("count_include_pad",0);return ve({autoPad:"",ceilMode:0,countIncludePad:t,kernelShape:[],strides:[],pads:[]})},gb=(e,t,n)=>{Zi(t);let i={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[e.run({...i,get:()=>yb(t,i,!1,n)},t)]},bb=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),n=e.attributes.getInt("ceil_mode",0),i=e.attributes.getInts("kernel_shape"),o=e.attributes.getInts("strides",[]),a=e.attributes.getInts("pads",[]),s=e.attributes.getInt("storage_order",0),u=e.attributes.getInts("dilations",[]);if(0!==s)throw Error("column major storage order is not yet supported for MaxPool");if(0!==n)throw Error("using ceil() in shape computation is not yet supported for MaxPool");return ve({autoPad:t,ceilMode:n,countIncludePad:!1,kernelShape:i,strides:o,pads:a,storageOrder:s,dilations:u})},yb=(e,t,n,i)=>{let[o,a]=_b(e,i,n),s=`
      ${vb(e[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...t,output:{dims:a,type:e[0].type,textureType:0},shaderSource:s}},_b=(e,t,n)=>{let i=e[0].dims.slice(),o=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),s=t.strides.slice(),u=o?t.dilations.slice():[],l=t.pads.slice();kr.adjustPoolAttributes(n,i,a,s,u,l);let d=kr.computePoolOutputShape(n,i,s,u,a,l,t.autoPad),p=Object.assign({},t);return o?Object.assign(p,{kernelShape:a,strides:s,pads:l,dilations:u,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:a,strides:s,pads:l,cacheKey:t.cacheKey}),[p,d]},bP={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},cb={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},wb=(e,t)=>(Zi(t),[e.run({...cb,get:()=>yb(t,cb,!0,bP)},t)]),Zi=e=>{if(!e||1!==e.length)throw Error("Pool ops requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")},vb=(e,t,n,i,o)=>{let a=e.length;if(t.kernelShape.length<=2){let s=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],l=t.pads[t.pads.length/2-1],d=t.pads[t.pads.length-1],p=e[a-1],c="",h="",f="";if(c=l+d!==0?`
          for (int i = 0; i < ${s}; i++) {
            x[${a} - 1] = indices[${a} - 1] * ${u} - ${l} + i;
            if (x[${a} - 1] < 0 || x[${a} - 1] >= ${p}) {
              pad++;
              continue;
            }
            ${n}
          }`:`
          for (int i = 0; i < ${s}; i++) {
            x[${a} - 1] = indices[${a} - 1] * ${u} - ${l} + i;
            ${n}
          }`,2===t.kernelShape.length){let n=t.kernelShape[t.kernelShape.length-2],i=t.strides[t.strides.length-2],o=t.pads[t.pads.length/2-2],u=t.pads[t.pads.length-2],l=e[a-2];h=o+u!==0?`
            for (int j = 0; j < ${n}; j++) {
              x[${a} - 2] = indices[${a} - 2] * ${i} - ${o} + j;
              if (x[${a} - 2] < 0 || x[${a} - 2] >= ${l}) {
                pad+= ${s};
                continue;
              }
          `:`
            for (int j = 0; j < ${n}; j++) {
              x[${a} - 2] = indices[${a} - 2] * ${i} - ${o} + j;
            `,f=`
          }
        `}return`
        float process(int indices[${a}]) {
          int x[${a}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${h}
          ${c}
          ${f}
          ${i}
          return value;
        }
      `}{let s=te.size(t.kernelShape),u=te.computeStrides(t.kernelShape),l=u.length,d=t.pads.length,p=yP(l),c=Xi(e,"inputDims"),h=Xi(t.pads,"pads"),f=Xi(u,"kernelStrides"),m=Xi(t.strides,"strides"),g=t.pads.reduce((e,t)=>e+t),b="";return b=g?`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${n}
          }`:`
          }
          ${n}
        `,`
        ${p}
        float process(int indices[${a}]) {
          int x[${a}];
          copyVec(indices, x);
          int offset[${l}];
          int pads[${d}];
          int inputDims[${a}];
          int kernelStrides[${l}];
          int strides[${l}];
          ${h}
          ${c}
          ${m}
          ${f}

          float value = ${o};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${s}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${a} - ${l}; j < ${a}; j++) {
              x[j] = indices[j] * strides[j - ${a} + ${l}]
                + offset[j - ${a} + ${l}] - pads[j - 2];
              ${b}
          }
          ${i}

          return value;
        }
      `}},Xi=(e,t)=>{let n="";for(let i=0;i<e.length;i++)n+=`
      ${t}[${i}] = ${e[i]};
    `;return n},yP=e=>`
  void offsetToIndices(int offset, int[${e}] strides, out int[${e}] indices) {
    if (${e} == 0) {
      return;
    }
    for (int i = 0; i < ${e} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${e} - 1] = offset;
  }`}),Eb=N(()=>{"use strict";lt(),Lo(),Le(),Ae(),Fr=(e,t,n,i,o)=>{wP(t);let a={name:i,inputNames:["A"],inputTypes:[0]};return[e.run({...a,cacheHint:n.cacheKey,get:()=>_P(e,t,n,i,o,a)},t)]},gr=e=>{let t=e.attributes.getInts("axes",[]),n=1===e.attributes.getInt("keepdims",1);return ve({axes:t,keepDims:n})},_P=(e,t,n,i,o,a)=>{let s=[],u=t[0].dims.length||1,l=[],d=te.normalizeAxes(n.axes,t[0].dims.length),p=o(t,d),c=p[1];for(let e=0;e<t[0].dims.length;e++)d.indexOf(e)>=0||0===d.length?(n.keepDims&&s.push(1),c=`
          for(int j${e} = 0; j${e} < ${t[0].dims[e]}; j${e}++) {
            inputIdx[${e}] = j${e};
            ${c}
          }`):(l.push(`inputIdx[${e}] = outputIdx[${s.length}];`),s.push(t[0].dims[e]));let h=`
      float process(int outputIdx[${s.length||1}]) {
        float value;                 // final result
        int inputIdx[${u}];      // addressing input data
        ${l.join(`
`)}
        ${p[0]}       // init ops for reduce max/min
        ${c}
        ${p[2]}       // final computation for reduce mean
        return value;
      }`;return{...a,output:{dims:s,type:t[0].type,textureType:0},shaderSource:h}},wP=e=>{if(!e||1!==e.length)throw Error("Reduce op requires 1 input.");if(-1===mr.indexOf(e[0].type))throw Error("Invalid input type.")},Tb=(e,t,n)=>Fr(e,t,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),Ib=(e,t,n)=>Fr(e,t,n,"ReduceMean",(e,t)=>{let n=1;for(let i=0;i<e[0].dims.length;i++)(t.indexOf(i)>=0||0===t.length)&&(n*=e[0].dims[i]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${n}.;`]}),Sb=(e,t,n)=>Fr(e,t,n,"ReduceMax",(e,t)=>{let n=[];for(let i=0;i<e[0].dims.length;i++)(t.indexOf(i)>=0||0===t.length)&&n.push(`inputIdx[${i}] = 0;`);return[`${n.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),$b=(e,t,n)=>Fr(e,t,n,"ReduceMin",(e,t)=>{let n=[];for(let i=0;i<e[0].dims.length;i++)(t.indexOf(i)>=0||0===t.length)&&n.push(`inputIdx[${i}] = 0;`);return[`${n.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),Ab=(e,t,n)=>Fr(e,t,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),Ob=(e,t,n)=>Fr(e,t,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),Pb=(e,t,n)=>Fr(e,t,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])}),Db=N(()=>{"use strict";Le(),Cb=(e,t)=>{let n=te.calculateReshapedDims(t[0].dims,t[1].integerData);return e.session.pack?[e.reshapePacked(t[0],n)]:[e.reshapeUnpacked(t[0],n)]}}),Ul=N(()=>{"use strict";lt(),Ze(),Ae(),kb={name:"Upsample",inputNames:["X"],inputTypes:[0]},Vl=(e,t,n)=>(Gl(t,n),[e.run({...kb,cacheHint:n.cacheKey,get:()=>vP(e,t,n)},t)]),Nb=e=>Ro(e,7),Lb=e=>Ro(e,9),Ro=(e,t)=>{let n=t>=10,i=e.attributes.getString("mode","nearest");if("nearest"!==i&&"linear"!==i&&(t<11||"cubic"!==i))throw Error(`unrecognized mode: ${i}`);let o=[];t<9&&(o=e.attributes.getFloats("scales"),Ji(o,i,n));let a=e.attributes.getFloat("extrapolation_value",0),s=t>10?e.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(-1===["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(s))throw Error(`coordinate_transform_mode '${s}' is not supported`);let u="tf_crop_and_resize"===s,l=u,d="nearest"===i&&t>=11?e.attributes.getString("nearest_mode","round_prefer_floor"):"";if(-1===["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(d))throw Error(`nearest_mode '${d}' is not supported`);let p=e.attributes.getFloat("cubic_coeff_a",-.75),c=0!==e.attributes.getInt("exclude_outside",0);if(c&&"cubic"!==i)throw Error("exclude_outside can be set to 1 only when mode is CUBIC.");let h=t<11||"nearest"===i&&"asymmetric"===s&&"floor"===d,f=0,m=0,g=0;return t>10?e.inputs.length>2?(f=1,m=2,g=3):(m=1,g=2):9===t&&(m=1),ve({opset:t,isResize:n,mode:i,scales:o,extrapolationValue:a,coordinateTransformMode:s,useExtrapolation:l,needRoiInput:u,nearestMode:d,cubicCoefficientA:p,excludeOutside:c,useNearest2xOptimization:h,roiInputIdx:f,scalesInputIdx:m,sizesInputIdx:g})},vP=(e,t,n)=>{let i=se(e.session.backend.glContext.version),[o,a]=e.calculateTextureWidthAndHeight(t[0].dims,0),s=t[0].dims.map((e,t)=>Math.floor(e*n.scales[t])),[u,l]=e.calculateTextureWidthAndHeight(s,0),d=s.length,p=Array(d),c=Array(d),h=`
      int output_pitches[${d}];
      int input_pitches[${d}];
      `;for(let e=d-1;e>=0;e--)p[e]=e===d-1?1:p[e+1]*s[e+1],c[e]=e===d-1?1:c[e+1]*t[0].dims[e+1],h+=`
        output_pitches[${e}] = ${p[e]};
        input_pitches[${e}] = ${c[e]};
        `;let f=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${a});
        float value = getColorAsFloat(${i.texture2D}(X, coords));
        return value;
      }
      `,m="nearest"===n.mode?`
    ${f}
    float process(int indices[${d}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${u}, ${l});

      ${h}

      int d, m;
      for (int dim = 0; dim < ${d}; ++dim) {
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
    }`:4===d?`
    ${f}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${u}, ${l});

      ${h}

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
    ${f}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${u}, ${l});

      ${h}

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
    }`;return{...kb,output:{dims:s,type:t[0].type,textureType:0},shaderSource:m,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(e=>Math.ceil(e))}]}},Gl=(e,t)=>{if(!e||t.opset<9&&1!==e.length||t.opset>=9&&t.opset<11&&2!==e.length||t.opset>=11&&e.length<2)throw Error("invalid inputs.");if(t.scales.length>0&&e[0].dims.length!==t.scales.length)throw Error("Invalid input shape.");if("string"===e[0].type)throw Error("Invalid input tensor types.")},Ji=(e,t,n)=>{if(n){for(let t of e)if(t<=0)throw Error("Scale value should be greater than 0.")}else for(let t of e)if(t<1)throw Error("Scale value should be greater than or equal to 1.");if(("linear"===t||"cubic"===t)&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1]))throw Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}}),Mb=N(()=>{"use strict";Ze(),Ae(),zn(),zr(),Ul(),Wl={name:"Resize",inputNames:["A"],inputTypes:[2]},Hl=(e,t,n)=>(Gl(t,n),[e.run({...Wl,cacheHint:n.cacheKey,get:()=>xP(e,t,n)},t)]),Rb=e=>Ro(e,10),zb=e=>Ro(e,11),xP=(e,t,n)=>{let i=se(e.session.backend.glContext.version),[o,a]=TP(t,n);if(o.every(e=>1===e)&&"tf_crop_and_resize"!==n.coordinateTransformMode)return{...Wl,output:{dims:a,type:t[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${i.texture2D}(X, TexCoords);
                    ${i.output} = v;
                }`};let s=a.length;if(s<2)throw Error(`output dimension should be at least 2, but got ${s}`);let u=a[s-2],l=a[s-1],d=t[0].dims;if(s!==d.length)throw Error(`output dimension should match input ${d.length}, but got ${s}`);let p=d[s-2],c=d[s-1],h=o[s-2],f=o[s-1],m="";if("linear"!==n.mode)throw Error(`resize (packed) does not support mode: '${n.mode}'`);switch(n.coordinateTransformMode){case"asymmetric":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":m=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${c}.0 - 1.0, ${p}.0 - 1.0, ${c}.0 - 1.0,
                            ${p}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let g=bt(s),b=Mn(),y=`
            const vec2 inputWH = vec2(${p}.0, ${c}.0);
            const vec4 scaleWHWH = vec4(float(${h}), float(${f}), float(${h}), float(${f}));
            ${b}
            ${m}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${g} rc = getOutputCoords();

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

                bool hasNextRow = rc.w < ${u-1};
                bool hasNextCol = rc.z < ${l-1};

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

                ${i.output} = vec4(newValue);
            }
        `;return{...Wl,output:{dims:a,type:t[0].type,textureType:2},hasMain:!0,shaderSource:y}},TP=(e,t)=>{let n=e[0].dims,i=t.scales,o;if(0===i.length){let a=e[t.scalesInputIdx];if(a&&0!==a.size){if(e[t.sizesInputIdx])throw Error("Only one of scales or sizes must be provided as input.");i=IP(a,t.mode,t.isResize)}else{let a=e[t.sizesInputIdx];if(!a||0===a.size)throw Error("Either scales or sizes MUST be provided as input.");o=Array.from(a.integerData),i=SP(o,n,t.mode,t.isResize)}}else if(e[t.sizesInputIdx])throw Error("Only one of scales or sizes must be provided as input.");let a=o||n.map((e,t)=>Math.floor(e*i[t]));return[i,a]},IP=(e,t,n)=>{let i=Array.from(e.floatData);return Ji(i,t,n),i},SP=(e,t,n,i)=>{let o=t.length,a=Array(o);for(let n=0,i=o;n<i;n++)if(0===t[n]){if(0!==e[n])throw Error("Input dim is zero but required output dim is non-zero.");a[n]=1}else a[n]=e[n]/t[n];return Ji(a,n,i),a}}),Fb=N(()=>{"use strict";Rr(),Bb=(e,t)=>($P(t),[new rt([t[0].dims.length],"int32",void 0,void 0,new Int32Array(t[0].dims))]),$P=e=>{if(!e||1!==e.length)throw Error("Shape requires 1 input.")}}),Hb=N(()=>{"use strict";lt(),Lo(),Le(),Ae(),ql={name:"Slice",inputNames:["A"],inputTypes:[0]},Vb=(e,t,n)=>(AP(t),[e.run({...ql,cacheHint:n.cacheKey,get:()=>Ub(e,t[0],n)},t)]),Gb=e=>{let t=e.attributes.getInts("starts"),n=e.attributes.getInts("ends"),i=e.attributes.getInts("axes",[]);return ve({starts:t,ends:n,axes:i})},Ub=(e,t,n)=>{let i=0===n.axes.length?t.dims.slice(0).map((e,t)=>t):n.axes,o=te.normalizeAxes(i,t.dims.length),a=n.starts.map((e,n)=>e>t.dims[o[n]]-1?t.dims[o[n]]:te.normalizeAxis(e,t.dims[o[n]])),s=n.ends.map((e,n)=>e>t.dims[o[n]]-1?t.dims[o[n]]:te.normalizeAxis(e,t.dims[o[n]])),u=t.dims.slice(),l=[];for(let e=0;e<o.length;e++)u[o[e]]=s[e]-a[e],a[e]>0&&l.push(`outputIdx[${o[e]}] += ${a[e]};`);let d=`
      float process(int outputIdx[${u.length}]) {
        ${l.join(`
      `)}
        return _A(outputIdx);
      }`;return{...ql,output:{dims:u,type:t.type,textureType:0},shaderSource:d}},AP=e=>{if(!e||1!==e.length)throw Error("Slice requires 1 input.");if(-1===mr.indexOf(e[0].type))throw Error("Invalid input type.")},Wb=(e,t)=>{PP(t);let n=OP(e,t);return[e.run({...ql,cacheHint:n.cacheKey,get:()=>Ub(e,t[0],n)},[t[0]])]},OP=(e,t)=>{if(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)||t.length>=4&&!e.session.isInitializer(t[3].dataId)||t.length>=5&&!e.session.isInitializer(t[4].dataId))throw Error("dynamic slice attributes are not allowed");if(t.length>=5&&t[4].integerData.some(e=>1!==e))throw Error("currently non-1 steps is not supported for Slice");let n=Array.from(t[1].integerData),i=Array.from(t[2].integerData),o=t.length>=4?Array.from(t[3].integerData):[],a=`${o};${n};${i}`;return{starts:n,ends:i,axes:o,cacheKey:a}},PP=e=>{if(!e||e.length<3||e.length>5)throw Error("Invalid input number.");if("int32"!==e[1].type||1!==e[1].dims.length||"int32"!==e[2].type||1!==e[2].dims.length||e.length>=4&&("int32"!==e[3].type||1!==e[3].dims.length)||e.length>=5&&("int32"!==e[4].type||1!==e[4].dims.length))throw Error("Invalid input type.")}}),ty=N(()=>{"use strict";lt(),Le(),Ze(),Ae(),Ki(),qb={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},jb={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},Kb={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},Xb=(e,t,n)=>{ey(t);let i=t[0].dims.slice(),o=te.normalizeAxis(n.axis,i.length),a=te.sizeToDimension(i,o),s=te.sizeFromDimension(i,o);return Yb(e,t,n,a,s)},Zb=e=>ve({axis:e.attributes.getInt("axis",1)}),Jb=e=>ve({axis:e.attributes.getInt("axis",-1)}),Qb=(e,t,n)=>{ey(t);let i=t[0].dims.slice(),o=te.normalizeAxis(n.axis,i.length),a=i.length,s=o!==a-1,u=[],l=[],d=[],p;s&&((l=Array.from({length:a}).map((e,t)=>t))[o]=a-1,l[a-1]=o,l.map(e=>u.push(i[e])),p=ve({perm:l}),d=Br(e,t,p));let c=s?te.sizeToDimension(u,a-1):te.sizeToDimension(i,a-1),h=s?te.sizeFromDimension(u,a-1):te.sizeFromDimension(i,a-1),f=Yb(e,s?d:t,n,c,h);return s?Br(e,f,p):f},Yb=(e,t,n,i,o)=>{let a=EP(e,t[0],i,o,[i]),s=e.run({...qb,cacheHint:n.cacheKey,get:()=>a},t),u=CP(e,t[0],i,o,a.output.dims,[i]),l=e.run({...jb,cacheHint:n.cacheKey,get:()=>u},[t[0],s]),d=DP(e,t[0],i,o,a.output.dims,u.output.dims);return[e.run({...Kb,cacheHint:n.cacheKey,get:()=>d},[t[0],s,l])]},EP=(e,t,n,i,o)=>{let[a,s]=e.calculateTextureWidthAndHeight(t.dims,0),u=o.length;if(n<1||i<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==o.length)throw Error("Dimensionality of the output should be 1");if(o[0]!==n)throw Error("Shape of the output should be equal to logical row count");let l=se(e.session.backend.glContext.version),d=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${i};

        float max = getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset, ${a},
        ${s} )));
        for(int i=1; i<${i}; ++i)
        {
          float current = getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${a}, ${s})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...qb,output:{dims:o,type:t.type,textureType:0},shaderSource:d}},CP=(e,t,n,i,o,a)=>{let[s,u]=e.calculateTextureWidthAndHeight(t.dims,0),l=a.length;if(n<1||i<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==a.length)throw Error("Dimensionality of the output should be 1");if(a[0]!==n)throw Error("Shape of the output should be equal to logical row count");if(1!==o.length)throw Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n)throw Error("Shape of the intermediate results should be equal to logical row count");let d=se(e.session.backend.glContext.version),p=`
      float process(int[${l}] indices) {
        int logical_row_start_offset = indices[0] * ${i};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${i}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${d.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${s}, ${u}))) - max);
        }

        return norm_factor;
      }`;return{...jb,output:{dims:a,type:t.type,textureType:0},shaderSource:p}},DP=(e,t,n,i,o,a)=>{let[s,u]=e.calculateTextureWidthAndHeight(t.dims,0),l=t.dims.length;if(n<1||i<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==o.length||1!==a.length)throw Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n||a[0]!==n)throw Error("Shape of the intermediate results should be equal to logical row count");let d=`
      float process(int[${l}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${s}, ${u});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${i};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...Kb,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:d}},ey=e=>{if(!e||1!==e.length)throw Error("Softmax requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type")}}),iy=N(()=>{"use strict";lt(),Le(),Ae(),ny={name:"Split",inputNames:["A"],inputTypes:[0]},ry=(e,t,n)=>{LP(t);let i=te.normalizeAxis(n.axis,t[0].dims.length),o=kP(e,t,i,n),a=[];for(let s=0;s<o;++s)a.push(e.run({...ny,cacheHint:`${n.cacheKey};${s}`,get:()=>NP(e,t[0],n,i,s)},t));return a},oy=e=>{let t=e.attributes.getInt("axis",0),n=e.attributes.getInts("split",[]),i=e.outputs.length;return ve({axis:t,split:n,numOutputs:i})},kP=(e,t,n,i)=>{let[,o]=Po.splitShape(t[0].dims,n,i.split,i.numOutputs);return o.length},NP=(e,t,n,i,o)=>{let[a,s]=Po.splitShape(t.dims,i,n.split,n.numOutputs),u=s[o],l=a[o],d=`
      float process(int indices[${l.length}]) {
        indices[${i}] += ${u};
        return _A(indices);
      }
    `;return{...ny,cacheHint:`${n.cacheKey}:${o}`,output:{dims:l,type:t.type,textureType:0},shaderSource:d}},LP=e=>{if(!e||1!==e.length)throw Error("Split requires one input.");if("int8"!==e[0].type&&"uint8"!==e[0].type&&"int16"!==e[0].type&&"uint16"!==e[0].type&&"int32"!==e[0].type&&"uint32"!==e[0].type&&"float32"!==e[0].type&&"float64"!==e[0].type&&"bool"!==e[0].type)throw Error("Invalid input type.")}}),uy=N(()=>{"use strict";Le(),jl=(e,t,n)=>{RP(t);let i=te.squeezeShape(t[0].dims,n);return[e.reshapeUnpacked(t[0],i)]},ay=(e,t)=>(zP(t),jl(e,[t[0]],Array.from(t[1].integerData))),sy=e=>e.attributes.getInts("axes"),RP=e=>{if(!e||1!==e.length)throw Error("Squeeze requires 1 input.");if("string"===e[0].type)throw Error("invalid input tensor types.")},zP=e=>{if(!e||2!==e.length)throw Error("Squeeze requires 2 inputs.");if("int32"!==e[1].type)throw Error("Invalid input type.")}}),cy=N(()=>{"use strict";Ze(),Ae(),ly=(e,t)=>{BP(t);let n={name:"Sum",inputNames:t.map((e,t)=>`X${t}`),inputTypes:Array(t.length).fill(0)};return[e.run({...n,get:()=>MP(e,t,n)},t)]},MP=(e,t,n)=>{let i=se(e.session.backend.glContext.version),o=t[0].dims.slice(),a=`
      void main() {
        vec4 result = ${t.map((e,t)=>`${i.texture2D}(X${t},TexCoords)`).join(" + ")};
        ${i.output} = result;
      }
    `;return{...n,output:{dims:o,type:t[0].type,textureType:0},hasMain:!0,shaderSource:a}},BP=e=>{if(!e||0===e.length)throw Error("Sum requires inputs.");let t=e[0].dims.length;for(let n=1;n<e.length;n++){if(t!==e[n].dims.length)throw Error("Input shapes are mismatched.");for(let i=0;i<t;i++)if(e[0].dims[i]!==e[n].dims[i])throw Error("Input shapes are not matched.")}if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.");for(let t=1;t<e.length;t++)if(e[0].type!==e[t].type)throw Error("Input types are not matched.")}}),py=N(()=>{"use strict";Lo(),Ae(),dy=(e,t)=>{VP(t);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[e.run({...n,get:()=>FP(e,t,n)},t)]},FP=(e,t,n)=>{let i=t[0].dims.slice(),o=Array(i.length),a=[];for(let e=0;e<i.length;e++)o[e]=i[e]*t[1].numberData[e],a.push(`inputIdx[${e}] = int(mod(float(outputIdx[${e}]), ${i[e]}.));`);let s=o.length,u=`
      float process(int outputIdx[${s}]) {
        int inputIdx[${s}];
        ${a.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:o,type:t[0].type,textureType:0},shaderSource:u}},VP=e=>{if(!e||2!==e.length)throw Error("Tile requires 2 input.");if(1!==e[1].dims.length)throw Error("The second input shape must 1 dimension.");if(e[1].dims[0]!==e[0].dims.length)throw Error("Invalid input shape.");if(-1===mr.indexOf(e[0].type))throw Error("Invalid input type.");if("int32"!==e[1].type&&"int16"!==e[1].type)throw Error("Invalid repeat type.")}}),my=N(()=>{"use strict";Le(),Kl=(e,t,n)=>{GP(t);let i=te.unsqueezeShape(t[0].dims,n);return[e.reshapeUnpacked(t[0],i)]},fy=(e,t)=>(UP(t),Kl(e,[t[0]],Array.from(t[1].integerData))),hy=e=>e.attributes.getInts("axes"),GP=e=>{if(!e||1!==e.length)throw Error("Unsqueeze requires 1 input.");if("string"===e[0].type)throw Error("invalid input tensor types.")},UP=e=>{if(!e||2!==e.length)throw Error("Unsqueeze requires 2 inputs.");if("int32"!==e[1].type)throw Error("Invalid input type.")}}),by=N(()=>{"use strict";Am(),Fm(),Um(),Xm(),Hi(),Dg(),Mg(),Vg(),Wg(),Kg(),Jg(),tb(),ib(),qi(),lb(),xb(),Eb(),Db(),Mb(),Fb(),Hb(),ty(),iy(),uy(),cy(),py(),Ki(),Cl(),my(),Ul(),gy=[["Abs","","6+",Zm],["Acos","","7+",Jm],["Add","","7+",Om],["And","","7+",Pm],["Asin","","7+",Qm],["Atan","","7+",Ym],["AveragePool","","7+",db,pb],["BatchNormalization","","7+",Sm,$m],["Cast","","6+",Vm,Gm],["Ceil","","6+",ng],["Clip","","6-10",Pl,eg],["Clip","","11+",tg],["Concat","","4+",qm,Km],["Conv","","1+",zl,Ml],["ConvTranspose","","1+",Eg,Cg],["Cos","","7+",rg],["Div","","7+",Em],["Dropout","","7+",El],["DepthToSpace","","1+",Rg,zg],["Equal","","7+",Cm],["Elu","","6+",og,ig],["Exp","","6+",ag],["Flatten","","1+",Bg,Fg],["Floor","","6+",sg],["FusedConv","com.microsoft","1+",zl,Ml],["Gather","","1+",Gg,Ug],["Gemm","","7-10",Bl,qg],["Gemm","","11+",Bl,jg],["GlobalAveragePool","","1+",hb,mb],["GlobalMaxPool","","1+",wb],["Greater","","7+",Dm],["Identity","","1+",El],["ImageScaler","","1+",Xg,Zg],["InstanceNormalization","","6+",Yg,eb],["LeakyRelu","","6+",ug,lg],["Less","","7+",km],["LRN","","1+",nb,rb],["Log","","6+",cg],["MatMul","","1+",Tg,Ig],["MaxPool","","1+",gb,bb],["Mul","","7+",Nm],["Neg","","6+",dg],["Not","","1+",pg],["Or","","7+",Lm],["Pad","","2-10",Fl,ab],["Pad","","11+",sb,ub],["Pow","","7+",Rm],["PRelu","","7+",zm],["ReduceLogSum","","1+",Ob,gr],["ReduceMax","","1+",Sb,gr],["ReduceMean","","1+",Ib,gr],["ReduceMin","","1+",$b,gr],["ReduceProd","","1+",Ab,gr],["ReduceSum","","1-12",Tb,gr],["ReduceSumSquare","","1+",Pb,gr],["Relu","","6+",fg],["Reshape","","5+",Cb],["Resize","","10",Hl,Rb],["Resize","","11+",Hl,zb],["Shape","","1+",Bb],["Sigmoid","","6+",hg],["Sin","","7+",mg],["Slice","","10+",Wb],["Slice","","1-9",Vb,Gb],["Softmax","","1-12",Xb,Zb],["Softmax","","13+",Qb,Jb],["Split","","2-12",ry,oy],["Sqrt","","6+",gg],["Squeeze","","1-12",jl,sy],["Squeeze","","13+",ay],["Sub","","7+",Mm],["Sum","","6+",ly],["Tan","","7+",bg],["Tanh","","6+",yg],["Tile","","6+",dy],["Transpose","","1+",Br,Ng],["Upsample","","7-8",Vl,Nb],["Upsample","","9",Vl,Lb],["Unsqueeze","","1-12",Kl,hy],["Unsqueeze","","13+",fy],["Xor","","7+",Bm]]});function _y(e){let t={},n;for(;null!==(n=yy.exec(e));){let e=n[3].split(",").map(e=>{let t=e.trim().split(" ");return t&&2===t.length?{type:t[0],name:t[1]}:null}).filter(e=>null!==e);t[n[2]]={params:e,body:n[4]}}for(let i in t){let o=RegExp(WP.replace("__FUNC__",i),"gm");for(;null!==(n=o.exec(e));){let o=n[1],a=n[2],s=n[3].split(","),u=o?`${o} ${a};`:"",l=t[i].body,d="";t[i].params.forEach((e,t)=>{e&&(d+=`${e.type} ${e.name} = ${s[t]};
`)}),l=(l=`${d}
 ${l}`).replace("return",`${a} = `);let p=`
      ${u}
      {
        ${l}
      }
      `;e=e.replace(n[0],p)}}return e.replace(yy,"")}var yy,WP,wy=N(()=>{"use strict";yy=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,WP="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function ao(e,t){let n=[],i=[],o=null!=t&&Array.isArray(t)&&0===t.length,a=null==t||o?null:HP(t,e).sort(),s=0;for(let t=0;t<e.length;++t){if(null!=a){if(a[s]===t&&1!==e[t])throw Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(null==a[s]||a[s]>t)&&1===e[t]&&(n.push(e[t]),i.push(t)),a[s]<=t&&s++}1!==e[t]&&(n.push(e[t]),i.push(t))}return{newShape:n,keptDims:i}}function HP(e,t){let n=t.length;return eo((e=null==e?t.map((e,t)=>t):[].concat(e)).every(e=>e>=-n&&e<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${e}`),eo(e.every(qP),()=>`All values in axis param must be integers but got axis ${e}`),e.map(e=>e<0?n+e:e)}function qP(e){return e%1==0}function jP(e){if(0===e.length)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function vy(e){let t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}var Qi,Yi,ea,ta,na,ra,Zl,oa,ia,aa,sa,Xl=N(()=>{"use strict";Ct(),Le(),Qi=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,t){let n=this.computeTexture(e,t);return t&&t.isPacked&&(n[0]/=2,n[1]/=2),t&&t.reverseWH?[n[1],n[0]]:n}computeTexture(e,t){let n=t&&t.isPacked;if(0===e.length)return n?[2,2]:[1,1];let i=this.maxTextureSize;if(t&&void 0!==t.breakAxis){let n=t.breakAxis>=e.length?1:e.slice(t.breakAxis).reduce((e,t)=>e*t),o=t.breakAxis<=0?1:e.slice(0,t.breakAxis).reduce((e,t)=>e*t);if(!(n>i)&&!(o>i))return[n,o];ze.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${t.breakAxis}`)}let o=e.slice(0);n&&(i*=2,1===(o=o.map((e,t)=>t>=o.length-2?o[t]%2==0?o[t]:o[t]+1:o[t])).length&&(o=[2,o[0]])),2!==o.length&&(o=ao(o).newShape);let a=jP(o);return o.length<=1&&a<=i?[1,a]:2===o.length&&o[0]<=i&&o[1]<=i?o:3===o.length&&o[0]*o[1]<=i&&o[2]<=i?[o[0]*o[1],o[2]]:3===o.length&&o[0]<=i&&o[1]*o[2]<=i?[o[0],o[1]*o[2]]:4===o.length&&o[0]*o[1]*o[2]<=i&&o[3]<=i?[o[0]*o[1]*o[2],o[3]]:4===o.length&&o[0]<=i&&o[1]*o[2]*o[3]<=i?[o[0],o[1]*o[2]*o[3]]:n?vy(a/4).map(e=>2*e):vy(a)}}}),xy=N(()=>{"use strict";Le(),Qn(),Ze(),Xl(),zn(),Yi=class extends zt{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new K(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new K(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let t=e.unpackedShape,n=[e.width,e.height],i={},o="getOutputCoords";switch(t.length){case 0:i[o]=this.getOutputScalarCoords();break;case 1:i[o]=this.getOutputPacked1DCoords(t,n);break;case 2:i[o]=this.getOutputPacked2DCoords(t,n);break;case 3:i[o]=this.getOutputPacked3DCoords(t,n);break;default:i[o]=this.getOutputPackedNDCoords(t,n)}let a=`
      void setOutput(vec4 val) {
        ${se(this.context.glContext.version).output} = val;
      }
    `;return i.floatTextureSetRGBA=new K(a),i}getUnpackedOutputSamplingSnippet(e){let t=e.unpackedShape,n=[e.width,e.height],i={},o="getOutputCoords";switch(t.length){case 0:i[o]=this.getOutputScalarCoords();break;case 1:i[o]=this.getOutputUnpacked1DCoords(t,n);break;case 2:i[o]=this.getOutputUnpacked2DCoords(t,n);break;case 3:i[o]=this.getOutputUnpacked3DCoords(t,n);break;case 4:i[o]=this.getOutputUnpacked4DCoords(t,n);break;case 5:i[o]=this.getOutputUnpacked5DCoords(t,n);break;case 6:i[o]=this.getOutputUnpacked6DCoords(t,n);break;default:throw Error(`Unsupported output dimensionality: ${t.length}`)}let a=`
        void setOutput(float val) {
          ${se(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `;return i.floatTextureSetR=new K(a),i}getOutputScalarCoords(){return new K(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,t){let n=t,i="";return i=1===n[0]?`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${n[1]}.0);
          }
        `:1===n[1]?`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${n[0]}.0);
          }
        `:`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${n[0]}, ${n[1]}));
          return 2 * (resTexRC.y * ${n[0]} + resTexRC.x);
        }
      `,new K(i)}getOutputPacked2DCoords(e,t){let n="";if(Dr.arraysEqual(e,t))return n=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new K(n);let i=t,o=Math.ceil(e[1]/2);return n=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${i[0]}, ${i[1]}));

          int index = resTexRC.y * ${i[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${o}) * 2;
          int c = 2 * (index / ${o});

          return ivec2(r, c);
        }
      `,new K(n)}getOutputPacked3DCoords(e,t){let n=[t[0],t[1]],i=Math.ceil(e[2]/2),o=i*Math.ceil(e[1]/2),a=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;

          int b = index / ${o};
          index -= b * ${o};

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec3(b, r, c);
        }
      `;return new K(a)}getOutputPackedNDCoords(e,t){let n=[t[0],t[1]],i=Math.ceil(e[e.length-1]/2),o=i*Math.ceil(e[e.length-2]/2),a=o,s="",u="b, r, c";for(let t=2;t<e.length-1;t++)a*=e[e.length-t-1],s=`
      int b${t} = index / ${a};
      index -= b${t} * ${a};
    `+s,u=`b${t}, `+u;let l=`
      ivec${e.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${n[0]}, ${n[1]}));
        int index = resTexRC.y * ${n[0]} + resTexRC.x;

        ${s}

        int b = index / ${o};
        index -= b * ${o};

        // reverse r and c order for packed texture
        int r = imod(index, ${i}) * 2;
        int c = 2 * (index / ${i});

        return ivec${e.length}(${u});
      }
    `;return new K(l)}getOutputUnpacked1DCoords(e,t){let n=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new K(n)}getOutputUnpacked2DCoords(e,t){let n=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new K(n)}getOutputUnpacked3DCoords(e,t){let n="",i=e.length,o=null;i<2&&(o=[]),(o=Array(i-1))[i-2]=e[i-1];for(let t=i-3;t>=0;--t)o[t]=o[t+1]*e[t+1];let a=["r","c","d"],s=o.map((e,t)=>{let n=`int ${a[t]} = index / ${e}`,i=t===o.length-1?`int ${a[t+1]} = index - ${a[t]} * ${e}`:`index -= ${a[t]} * ${e}`;return`${n}; ${i};`}).join("");return n=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${s}
          return ivec3(r, c, d);
        }
      `,new K(n)}getOutputUnpacked4DCoords(e,t){let n="",i=e.length,o=null;i<2&&(o=[]),(o=Array(i-1))[i-2]=e[i-1];for(let t=i-3;t>=0;--t)o[t]=o[t+1]*e[t+1];let a=["r","c","d","d2"],s=o.map((e,t)=>{let n=`int ${a[t]} = index / ${e}`,i=t===o.length-1?`int ${a[t+1]} = index - ${a[t]} * ${e}`:`index -= ${a[t]} * ${e}`;return`${n}; ${i};`}).join("");return n=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${s}
          return ivec4(r, c, d, d2);
        }
      `,new K(n)}getOutputUnpacked5DCoords(e,t){let n="",i=e.length,o=null;i<2&&(o=[]),(o=Array(i-1))[i-2]=e[i-1];for(let t=i-3;t>=0;--t)o[t]=o[t+1]*e[t+1];let a=["r","c","d","d2","d3"],s=o.map((e,t)=>{let n=`int ${a[t]} = index / ${e}`,i=t===o.length-1?`int ${a[t+1]} = index - ${a[t]} * ${e}`:`index -= ${a[t]} * ${e}`;return`${n}; ${i};`}).join("");return n=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${s}
          return ivec5(r, c, d, d2, d3);
        }
      `,new K(n)}getOutputUnpacked6DCoords(e,t){let n="",i=e.length,o=null;i<2&&(o=[]),(o=Array(i-1))[i-2]=e[i-1];for(let t=i-3;t>=0;--t)o[t]=o[t+1]*e[t+1];let a=["r","c","d","d2","d3","d4"],s=o.map((e,t)=>{let n=`int ${a[t]} = index / ${e}`,i=t===o.length-1?`int ${a[t+1]} = index - ${a[t]} * ${e}`:`index -= ${a[t]} * ${e}`;return`${n}; ${i};`}).join("");return n=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${s}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new K(n)}getCommonUtilFuncs(){let e={},t="uvFromFlat";e[t]=new K(`
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
      `),t="sampleTexture";let n=se(this.context.glContext.version);return e[t]=new K(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${n.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((n,i)=>{let o=this.context.inputTextureLayouts[i],a=Mi(n);o.isPacked?e[a]=this.getPackedSamplerFromInput(a,n,o):e[a]=this.getUnpackedSamplerFromInput(a,n,o);let s=lm(n);o.unpackedShape.length<=t.unpackedShape.length&&(o.isPacked?e[s]=this.getPackedSamplerAtOutputCoords(s,o,t,n):e[s]=this.getUnpackedSamplerAtOutputCoords(s,o,t,n))}),e}getPackedSamplerAtOutputCoords(e,t,n,i){let o=t.unpackedShape,a=n.unpackedShape,s=Mi(i),u=o.length,l=a.length,d=gt.getBroadcastDims(o,a),p=bt(l),c=l-u,h,f=Kt();h=0===u?"":l<2&&d.length>=1?"coords = 0;":d.map(e=>`coords.${f[e+c]} = 0;`).join(`
`);let m="";m=l<2&&u>0?"coords":o.map((e,t)=>`coords.${f[t+c]}`).join(", ");let g="return outputValue;",b=1===te.size(o),y=1===te.size(a);if(1!==u||b||y){if(b&&!y)g=1===l?`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:`
          return vec4(outputValue.x);
        `;else if(d.length){let e=u-2,t=u-1;d.indexOf(e)>-1&&d.indexOf(t)>-1?g="return vec4(outputValue.x);":d.indexOf(e)>-1?g="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":d.indexOf(t)>-1&&(g="return vec4(outputValue.xx, outputValue.zz);")}}else g=`
        return vec4(outputValue.xy, outputValue.xy);
      `;let _=`
        int lastDim = coords.${f[l-1]};
        coords.${f[l-1]} = coords.${f[l-2]};
        coords.${f[l-2]} = lastDim;
      `,v=`
      vec4 ${e}() {
        ${p} coords = getOutputCoords();
        ${_}
        ${h}
        vec4 outputValue = ${s}(${m});
        ${g}
      }
    `;return new K(v,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,t,n,i){let o=[n.width,n.height],a=[t.width,t.height],s=t.unpackedShape.length,u=n.unpackedShape.length,l=t.unpackedShape,d=n.unpackedShape,p=Mi(i);if(s===u&&Dr.arraysEqual(a,o)){let t=`
          float ${e}() {
            return sampleTexture(${i}, TexCoords);
          }
        `;return new K(t,["coordinates.sampleTexture"])}let c=bt(u),h=gt.getBroadcastDims(l,d),f=u-s,m,g=Kt();m=0===s?"":u<2&&h.length>=1?"coords = 0;":h.map(e=>`coords.${g[e+f]} = 0;`).join(`
`);let b="";b=u<2&&s>0?"coords":t.unpackedShape.map((e,t)=>`coords.${g[t+f]}`).join(", ");let y=`
        float ${e}() {
          ${c} coords = getOutputCoords();
          ${m}
          return ${p}(${b});
        }
      `;return new K(y,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,t,n){switch(n.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,t);case 1:return this.getPackedSampler1D(e,t,n);case 2:return this.getPackedSampler2D(e,t,n);case 3:return this.getPackedSampler3D(e,t,n);default:return this.getPackedSamplerND(e,t,n)}}getUnpackedSamplerFromInput(e,t,n){let i=n.unpackedShape;switch(i.length){case 0:return this.getUnpackedSamplerScalar(e,t,n);case 1:return this.getUnpackedSampler1D(e,t,n);case 2:return this.getUnpackedSampler2D(e,t,n);case 3:return this.getUnpackedSampler3D(e,t,n);case 4:return this.getUnpackedSampler4D(e,t,n);case 5:return this.getUnpackedSampler5D(e,t,n);case 6:return this.getUnpackedSampler6D(e,t,n);default:throw Error(`Unsupported dimension ${i.length}-D`)}}getPackedSamplerScalar(e,t){let n=se(this.context.glContext.version),i=`
          vec4 ${e}() {
            return ${n.texture2D}(${t}, halfCR);
          }
        `;return new K(i)}getPackedSampler1D(e,t,n){let i=[n.width,n.height],o=[i[1],i[0]],a=se(this.context.glContext.version),s=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${o[0]}, ${o[1]}, index);
      return ${a.texture2D}(${t}, uv);
    }`;return new K(s,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,t,n){let i=n.unpackedShape,o=[n.width,n.height],a=se(this.context.glContext.version),s=o[0],u=o[1];if(null!=o&&Dr.arraysEqual(i,o)){let n=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${s}.0);
        return ${a.texture2D}(${t}, uv);
      }`;return new K(n)}let l=o,d=Math.ceil(i[1]/2),p=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${l[1]}, ${l[0]}, ${d}, row, col);
      return ${a.texture2D}(${t}, uv);
    }`;return new K(p,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,t,n){let i=n.unpackedShape,o=[n.width,n.height],a=[o[0],o[1]],s=se(this.context.glContext.version);if(1===i[0]){let o=i.slice(1),a=[1,2],s=to(i,o),u=["b","row","col"],l=JSON.parse(JSON.stringify(n));l.unpackedShape=s;let d=this.getPackedSamplerFromInput(e,t,l),p=`${d.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${no(u,a)});
      } `;return new K(p,d.dependencies)}let u=a[0],l=a[1],d=Math.ceil(i[2]/2),p=d*Math.ceil(i[1]/2),c=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${l}, ${u}, ${p}, ${d}, b, row, col);
      return ${s.texture2D}(${t}, uv);}`;return new K(c,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,t,n){let i=n.unpackedShape,o=i.length,a=[n.width,n.height],s=se(this.context.glContext.version),u=[a[0],a[1]],l=u[1],d=u[0],p=Math.ceil(i[o-1]/2),c=p*Math.ceil(i[o-2]/2),h="int b, int row, int col",f=`b * ${c} + (row / 2) * ${p} + (col / 2)`;for(let e=2;e<o-1;e++)h=`int b${e}, `+h,c*=i[o-e-1],f=`b${e} * ${c} + `+f;let m=`vec4 ${e}(${h}) {
      int index = ${f};
      int texR = index / ${d};
      int texC = index - texR * ${d};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${d}, ${l});
      return ${s.texture2D}(${t}, uv);
    }`;return new K(m)}getUnpackedSamplerScalar(e,t,n){let[i,o]=[n.width,n.height];if(1===i&&1===o){let n=`
          float ${e}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new K(n,["coordinates.sampleTexture"])}let a=`
        float ${e}() {
          int offset_${t} = coordsToOffset(TexCoords, ${i}, ${o});
          vec2 uv = uvFromFlat(${i}, ${o}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new K(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,t,n){let i=n.width,o=n.height;if(1===o&&1===i){let n=`
        float ${e}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new K(n,["coordinates.sampleTexture"])}if(1===o){let n=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${i}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new K(n,["coordinates.sampleTexture"])}if(1===i){let n=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${o}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new K(n,["coordinates.sampleTexture"])}let a=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${i}, ${o}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new K(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,t,n){let i=n.unpackedShape,o=[n.height,n.width];if(null!=o&&Dr.arraysEqual(i,o)){let n=o[1],i=o[0],a=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${n}.0, ${i}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new K(a,["coordinates.sampleTexture"])}let{newShape:a,keptDims:s}=ao(i),u=a;if(u.length<i.length){let o=to(i,u),a=JSON.parse(JSON.stringify(n));a.unpackedShape=o;let l=["col","row"],d=`
          ${this.getUnpackedSamplerFromInput(e,t,a).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${no(l,s)});
          }
        `;return new K(d,["coordinates.sampleTexture"])}let l=o[1],d=o[0];if(1===d){let n=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${l}, ${d});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new K(n,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(1===l){let n=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${l}, ${d});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${d}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new K(n,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let p=`
        float ${e}(int row, int col) {
          int index = col * ${i[1]} + row;
          vec2 uv = uvFromFlat(${l}, ${d}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new K(p,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,t,n){let i=n.unpackedShape,o=i[1]*i[2],a=i[2],{newShape:s,keptDims:u}=ao(i),l=s;if(l.length<i.length){let o=to(i,l),a=["batch","col","row"],s=JSON.parse(JSON.stringify(n));s.unpackedShape=o;let d=this.getUnpackedSamplerFromInput(e,t,s),p=u.reverse(),c=`
          ${d.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${no(a,p)});
          }
        `;return new K(c,d.dependencies)}let d=n.width,p=n.height,c=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${o} + col * ${a} + row;
            vec2 uv = uvFromFlat(${d}, ${p}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new K(c,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,t,n){let i=n.unpackedShape,o=i[3],a=i[2]*o,s=i[1]*a,u=n.width,l=n.height,d=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${s} + col * ${a} +
              depth2 * ${o} + depth;
          vec2 uv = uvFromFlat(${u}, ${l}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new K(d,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,t,n){let i=n.unpackedShape,o=i[4],a=i[3]*o,s=i[2]*a,u=i[1]*s,{newShape:l,keptDims:d}=ao(i);if(l.length<i.length){let o=to(i,l),a=["row","col","depth","depth2","depth3"],s=JSON.parse(JSON.stringify(n));s.unpackedShape=o;let u=`
          ${this.getUnpackedSamplerFromInput(e,t,s).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${no(a,d)});
          }
        `;return new K(u,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=n.width,c=n.height,h=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${s} + depth * ${a} +
          depth3 * ${o} + depth2;
          vec2 uv = uvFromFlat(${p}, ${c}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new K(h,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,t,n){let i=n.unpackedShape,o=i[5],a=i[4]*o,s=i[3]*a,u=i[2]*s,l=i[1]*u,{newShape:d,keptDims:p}=ao(i);if(d.length<i.length){let o=to(i,d),a=["row","col","depth","depth2","depth3","depth4"],s=JSON.parse(JSON.stringify(n));s.unpackedShape=o;let u=`
            ${this.getUnpackedSamplerFromInput(e,t,s).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${no(a,p)});
            }
          `;return new K(u,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let c=n.width,h=n.height,f=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${l} + col * ${u} + depth * ${s} +
            depth2 * ${a} + depth3 * ${o} + depth4;
            vec2 uv = uvFromFlat(${c}, ${h}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new K(f,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,t=e.shape.length,n=e.strides,i=e.width,o=e.height,a=[];for(let e=0;e<t-1;++e)a.push(`
        c[${e}] = offset / ${n[e]};`),a.push(`
        offset -= c[${e}] * ${n[e]};`);a.push(`
        c[${t-1}] = offset;`);let s=`
      void toVec(vec2 texCoords, out int c[${t}]) {
        int offset = coordsToOffset(texCoords, ${i}, ${o});
        ${a.join("")}
      }
      void toVec(int offset, out int c[${t}]) {
        ${a.join("")}
      }
    `;return{toVec:new K(s,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((t,n)=>{let i=this.context.inputTextureLayouts[n],o=(i.unpackedShape.length>0?i.unpackedShape:i.shape).length,a=`_${t}`;e[a]=new K(this.getValueFromSingle(t,o,i.width,i.height,!1),[`shapeUtils.indicesToOffset${a}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),e[a+="_T"]=new K(this.getValueFromSingle(t,o,i.width,i.height,!0),[`shapeUtils.indicesToOffset${a}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,t,n,i,o){let a=`_${e}`;o&&(a+="_T");let s=se(this.context.glContext.version);return`
        float ${a}(int m[${t}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${n}, ${i});
          float value = getColorAsFloat(${s.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,t,n,i,o){let a=`_${e}_Pack`;o&&(a+="_T");let s=se(this.context.glContext.version);return`
        vec4 ${a}(int m[${t}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${n}, ${i});
          return ${s.texture2D}(${e}, coords);
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
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),t=new Uint32Array(e),n=new Uint8Array(e);if(t[0]=0xdeadbeef,239===n[0])return!0;if(222===n[0])return!1;throw Error("unknown endianness")}}}),Iy=N(()=>{"use strict";Qn(),Ze(),ta=class extends zt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=se(this.context.glContext.version);return{setFragColor:new K(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new K(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}}),Sy=N(()=>{"use strict";Qn(),na=class e extends zt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,t={};return this.context.programInfo.inputNames.forEach((n,i)=>{let o=this.context.inputTextureLayouts[i].unpackedShape;if(o.length<=e){let i=o.length,a=e-i,s=`bcastIndices_${n}`,u="";for(let e=0;e<i;++e)u+=`
          realIndices[${e}] = int( mod(float(bcastedIndices[${a+e}]), ${o[e]}.0) );
          `;let l=`
        void ${s} (int bcastedIndices[${e}], out int realIndices[${i}]) {
          ${u}
        }
        `;t[s]=new K(l)}}),t}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,t={};return this.context.programInfo.inputNames.forEach((n,i)=>{let o=this.context.inputTextureLayouts[i].shape;if(!(o.length<2||o.length>e)){let i=o.length,a=e-i,s=`bcastMatmulIndices_${n}`,u="";for(let e=0;e<i-2;++e)u+=`
          realIndices[${e}] = int( mod(float(bcastedIndices[${a+e}]), ${o[e]}.0) );
          `;let l=`
        void ${s}(int bcastedIndices[${e}], out int realIndices[${i}]) {
          ${u}
          realIndices[${i-1}] = bcastedIndices[${e-1}];
          realIndices[${i-2}] = bcastedIndices[${e-2}];
        }
        `;t[s]=new K(l)}}),t}indicesToOffset(){let t={};return this.context.programInfo.inputNames.forEach((n,i)=>{let o=this.context.inputTextureLayouts[i].shape,a=this.context.inputTextureLayouts[i].strides,s=o.length,u=`indicesToOffset_${n}`;t[u]=new K(e.indexToOffsetSingle(u,s,a)),t[u=`indicesToOffset_${n}_T`]=new K(e.indexToOffsetSingle(u,s,a.slice().reverse()))}),t}static indexToOffsetSingle(e,t,n){let i="";for(let e=t-1;e>=0;--e)i+=`
        offset += indices[${e}] * ${n[e]};
        `;return`
      int ${e}(int indices[${t}]) {
        int offset = 0;
        ${i}
        return offset;
      }
      `}offsetToIndices(){let t={};return this.context.programInfo.inputNames.forEach((n,i)=>{let o=this.context.inputTextureLayouts[i].shape,a=this.context.inputTextureLayouts[i].strides,s=o.length,u=`offsetToIndices_${n}`;t[u]=new K(e.offsetToIndicesSingle(u,s,a)),t[u=`offsetToIndices_${n}_T`]=new K(e.offsetToIndicesSingle(u,s,a.slice().reverse()))}),t}static offsetToIndicesSingle(e,t,n){let i=[];for(let e=0;e<t-1;++e)i.push(`
      indices[${e}] = offset / ${n[e]};`),i.push(`
        offset -= indices[${e}] * ${n[e]};`);return i.push(`
      indices[${t-1}] = offset;`),`
      void ${e}(int offset, out int indices[${t}]) {
        ${i.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((t,n)=>{let i=this.context.inputTextureLayouts[n].shape,o=i.length,a=`incrementIndices_${t}`,s="";for(let e=0;e<o;++e)s+=`
        shape[${e}] = ${i[e]};`;let u=`
        void ${a}(int axis, out int indices[${o}]) {
          int shape[${o}];
          ${s};
          for(int i = ${o} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;e[a]=new K(u)}),e}}}),$y=N(()=>{"use strict";Qn(),ra=class extends zt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let e=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},n={};for(let i in t){let o=`${i}Vec`,a="";for(let n=0;n<e;++n)a+=`
          dest[${n}] ${t[i]} src[${n}];
          `;let s=`
        void ${o}(int src[${e}], out int dest[${e}]) {
          ${a}
        }
        `;n[o]=new K(s)}return n}copyVec(){let e=this.context.outputTextureLayout.shape.length,t="";for(let n=0;n<e;++n)t+=`
        dest[${n}] = src[${n}];
        `;let n=`
      void copyVec(int src[${e}], out int dest[${e}]) {
        ${t}
      }
      `;return{copyVec:new K(n)}}setVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index =${e} + index;
        if (index == 0)
            m[0] = value;
        `;for(let n=1;n<e-1;++n)t+=`
        else if (index == ${n})
            m[${n}] = value;
            `;t+=`
        else
            m[${e-1}] = value;
        `;let n=`
      void setVecItem(out int m[${e}], int index, int value) {
        ${t}
      }
        `;return{setVecItem:new K(n)}}getVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index = ${e} + index;
        if (index == 0)
            return m[0];
      `;for(let n=1;n<e-1;++n)t+=`
        else if (index == ${n})
            return m[${n}];
      `;t+=`
        else
            return m[${e-1}];
        `;let n=`
      int getVecItem(int m[${e}], int index) {
        ${t}
      }
    `;return{getVecItem:new K(n)}}}}),Ay=N(()=>{"use strict";xy(),Ty(),Iy(),Sy(),$y(),Zl={encoding:ea,fragcolor:ta,vec:ra,shapeUtils:na,coordinates:Yi}}),Oy=N(()=>{"use strict";Qn(),wy(),Ay(),Ze(),oa=class{constructor(e,t,n,i){this.libs={},this.glslLibRoutineDependencyGraph={},this.context=new Gi(e,t,n,i),Object.keys(Zl).forEach(e=>{let t=new Zl[e](this.context);this.libs[e]=t});let o=this.glslLibRoutineDependencyGraph;for(let e in this.libs){let t=this.libs[e].getFunctions();for(let n in t){let i=e+"."+n,a;o[i]?(a=o[i]).routineBody=t[n].routineBody:(a=new No(i,t[n].routineBody),o[i]=a);let s=t[n].dependencies;if(s)for(let e=0;e<s.length;++e)if(o[s[e]])a.addDependency(o[s[e]]);else{let t=new No(s[e]);o[s[e]]=t,a.addDependency(t)}}}}preprocess(){let e=this.context.programInfo,t=e.shaderSource;return this.context.programInfo.hasMain||(t=`${t}
      ${um(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),t=_y(t),`${sm(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(t)}
    ${t}`}getImports(e){let t=this.selectGlslLibRoutinesToBeIncluded(e);if(0===t.length)return"";let n="";for(let e=0;e<t.length;++e)if(t[e].routineBody)n+=t[e].routineBody+`
`;else throw Error(`Missing body for the Glsl Library routine: ${t[e].name}`);return n}selectGlslLibRoutinesToBeIncluded(e){let t=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(n=>{let i=n.split(".")[1];-1!==e.indexOf(i)&&t.push(this.glslLibRoutineDependencyGraph[n])}),Ui.returnOrderedNodes(t)}getUniforms(e,t){let n=[];if(e)for(let t of e)n.push(`uniform sampler2D ${t};`);if(t)for(let e of t)n.push(`uniform ${e.type} ${e.name}${e.arrayLength?`[${e.arrayLength}]`:""};`);return n.join(`
`)}}}),Py=N(()=>{"use strict";pt(),Ct(),Oy(),Ze(),ia=class{constructor(e,t,n){this.profiler=e,this.glContext=t,this.textureLayoutStrategy=n,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let i=this.glContext.gl,o=e.program;i.useProgram(o);try{this.bindOutput(n),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],t)}catch(t){throw ze.error("ProgramManager",e.programInfo.shaderSource),t}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,t,n){return this.profiler.event("backend","ProgramManager.build",()=>{let i=new oa(this.glContext,e,t,n),o=i.preprocess(),a=this.compile(o);return{programInfo:e,program:a,uniformLocations:this.getUniformLocations(a,i.context.programInfo.inputNames,i.context.programInfo.variables),attribLocations:this.getAttribLocations(a)}})}compile(e){if(!this.vertexShader){ze.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let e=am(this.glContext.version);this.vertexShader=this.glContext.compileShader(e,this.glContext.gl.VERTEX_SHADER)}pe.debug&&ze.verbose("ProrgramManager",`FragShader:
${e}
`);let t=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),n=this.glContext.createProgram(this.vertexShader,t);return this.glContext.deleteShader(t),n}bindOutput(e){let t=e.width,n=e.height;ze.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${t}/${n}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,t,n)}bindAttributes(e){let t=e.position,n=e.textureCoord;this.glContext.setVertexAttributes(t,n),this.attributesBound=!0}bindUniforms(e,t,n){let i=this.glContext.gl,o=0;for(let{name:a,type:s,location:u,arrayLength:l}of e){let e=t.find(e=>e.name===a)?.data;if("sampler2D"!==s&&!e)throw Error(`variable '${a}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(n[o],u,o),o++;break;case"float":l?i.uniform1fv(u,e):i.uniform1f(u,e);break;case"int":l?i.uniform1iv(u,e):i.uniform1i(u,e);break;default:throw Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,t,n){this.glContext.bindTextureToUniform(e.texture,n,t)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,t,n){let i=[];if(t)for(let n of t)i.push({name:n,type:"sampler2D",location:this.getUniformLocation(e,n)});if(n)for(let t of n)i.push({...t,location:this.getUniformLocation(e,t.name)});return i}getUniformLocation(e,t){let n=this.glContext.gl.getUniformLocation(e,t);if(null===n)throw Error(`Uniform ${t} not found.`);return n}getAttribLocation(e,t){return this.glContext.gl.getAttribLocation(e,t)}}}),Ey=N(()=>{"use strict";Ct(),Do(),aa=class{constructor(e,t,n,i){this.glContext=e,this.layoutStrategy=t,this.profiler=n,this.config=i,this.pendingRead=new Map,i.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,t,n,i){let o=this.toEncoderType(e),a=this.glContext.getEncoder(o,t.channels||1,i);if(t.isPacked&&1===i)throw Error("not implemented");let s=t.width,u=t.height,l,d;if(this.config.reuseTextures){l=`${s}x${u}_${a.format}_${a.internalFormat}_${a.textureType}`,(d=this.inUseTextures.get(l))||(d=[],this.inUseTextures.set(l,d));let t=this.idleTextures.get(l);if(t&&t.length>0){let o=t.pop();return d.push(o),1===i&&this.glContext.updateTexture(o,s,u,a,this.toTextureData(e,n)),o}}ze.verbose("TextureManager",`Creating new texture of size ${t.width}x${t.height}`);let p=this.glContext.allocateTexture(s,u,a,this.toTextureData(e,n));return this.config.reuseTextures&&(d.push(p),this.textureLookup.set(p,l)),p}readTexture(e,t,n){return n||(n=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let i=e.shape.reduce((e,t)=>e*t)*n,o=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(t),n);return this.toTensorData(t,o)})}async readTextureAsync(e,t,n){let i=e.tensor.dataId;if(n||(n=1),this.pendingRead.has(i)){let e=this.pendingRead.get(i);return new Promise(t=>e?.push(t))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(i,[]);let o=e.shape.reduce((e,t)=>e*t)*n;await this.glContext.createAndWaitForFence();let a=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(t),n),s=this.toTensorData(t,a),u=this.pendingRead.get(i);return this.pendingRead.delete(i),u?.forEach(e=>e(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let t=e.shape.reduce((e,t)=>e*t),n=this.glContext.readTexture(e.texture,e.width,e.height,4*t,"byte",4);return new Float32Array(n.buffer,n.byteOffset,t)})}releaseTexture(e,t){let n;if(this.config.reuseTextures&&(n=this.textureLookup.get(e.texture))){t&&this.textureLookup.delete(n);let i=this.inUseTextures.get(n);if(i){let t=i.indexOf(e.texture);if(-1!==t){i.splice(t,1);let o=this.idleTextures.get(n);o||(o=[],this.idleTextures.set(n,o)),o.push(e.texture)}}}(!n||t)&&(ze.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,t){switch(e){case"int16":return t instanceof Int16Array?t:Int16Array.from(t);case"int32":return t instanceof Int32Array?t:Int32Array.from(t);case"int8":return t instanceof Int8Array?t:Int8Array.from(t);case"uint16":return t instanceof Uint16Array?t:Uint16Array.from(t);case"uint32":return t instanceof Uint32Array?t:Uint32Array.from(t);case"uint8":case"bool":return t instanceof Uint8Array?t:Uint8Array.from(t);case"float32":return t instanceof Float32Array?t:Float32Array.from(t);case"float64":return t instanceof Float64Array?t:Float64Array.from(t);default:throw Error(`TensorData type ${e} is not supported`)}}toTextureData(e,t){if(t)return t instanceof Float32Array?t:new Float32Array(t)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}}),Cy=N(()=>{"use strict";Ct(),wf(),Tm(),by(),Py(),Xl(),Ey(),sa=class{constructor(e,t){this.backend=e,this.context=t,this.layoutStrategy=new Qi(e.glContext.maxTextureSize),this.programManager=new ia(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new aa(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:"full"===e.textureCacheMode}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Vi(this)}onGraphInitialized(e){let t=e.getValues().filter(e=>-1===e.from&&e.tensor).map(e=>e.tensor.dataId);this.initializers=new Set(t)}isInitializer(e){return!!this.initializers&&this.initializers.has(e)}addInitializer(e){this.initializers.add(e)}getTextureData(e,t){return t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,n=!1){ze.verbose("WebGLSessionHandler","Storing Texture data in cache"),n?this.packedTextureDataCache.set(e,t):this.unpackedTextureDataCache.set(e,t)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,t,n){let i=_f(e,t,gy);return{impl:i.opImpl,context:i.opInit?i.opInit(e,n):e}}}});function KP(e){let t=0;for(;t<e.length&&e[t]();++t);return t-1}var zo,Dy=N(()=>{"use strict";pt(),Do(),Do(),zn(),zo=class{constructor(e,t){this.frameBufferBound=!1,this.itemsToPoll=[],this.gl=e,this.version=t,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,t,n,i){let o=this.gl,a=o.createTexture();o.bindTexture(o.TEXTURE_2D,a),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);let s=i?n.encode(i,e*t):null;return o.texImage2D(o.TEXTURE_2D,0,n.internalFormat,e,t,0,n.format,n.textureType,s),this.checkError(),a}updateTexture(e,t,n,i,o){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e);let s=i.encode(o,t*n);a.texSubImage2D(a.TEXTURE_2D,0,0,0,t,n,i.format,i.textureType,s),this.checkError()}attachFramebuffer(e,t,n){let i=this.gl;i.bindTexture(i.TEXTURE_2D,e),i.bindFramebuffer(i.FRAMEBUFFER,this.framebuffer),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,e,0),this.checkError(),i.viewport(0,0,t,n),i.scissor(0,0,t,n)}readTexture(e,t,n,i,o,a){let s=this.gl;a||(a=1),this.frameBufferBound||this.attachFramebuffer(e,t,n);let u=this.getEncoder(o,a),l=u.allocate(t*n);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,t,n,s.RGBA,u.textureType,l),this.checkError(),u.decode(l,i)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,t){let n=this.gl;n.vertexAttribPointer(e,3,n.FLOAT,!1,20,0),n.enableVertexAttribArray(e),-1!==t&&(n.vertexAttribPointer(t,2,n.FLOAT,!1,20,12),n.enableVertexAttribArray(t)),this.checkError()}createProgram(e,t){let n=this.gl,i=n.createProgram();return n.attachShader(i,e),n.attachShader(i,t),n.linkProgram(i),i}compileShader(e,t){let n=this.gl,i=n.createShader(t);if(!i)throw Error(`createShader() returned null with type ${t}`);if(n.shaderSource(i,e),n.compileShader(i),!1===n.getShaderParameter(i,n.COMPILE_STATUS))throw Error(`Failed to compile shader: ${n.getShaderInfoLog(i)}
Shader source:
${e}`);return i}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,t,n){let i=this.gl;i.activeTexture(i.TEXTURE0+t),this.checkError(),i.bindTexture(i.TEXTURE_2D,e),this.checkError(),i.uniform1i(n,t),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(pe.debug){let e=this.gl,t=e.getError(),n="";switch(t){case e.NO_ERROR:return;case e.INVALID_ENUM:n="INVALID_ENUM";break;case e.INVALID_VALUE:n="INVALID_VALUE";break;case e.INVALID_OPERATION:n="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:n="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:n="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:n="CONTEXT_LOST_WEBGL";break;default:n=`Unknown WebGL Error: ${t.toString(16)}`}throw Error(n)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,t,n=0){if(2===this.version)return new Bi(this.gl,t);switch(e){case"float":return 1===n||this.isRenderFloat32Supported?new Co(this.gl,t):new Co(this.gl,t,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw Error("not implemented");case"byte":return new Fi(this.gl,t);default:throw Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let t=0;t<this.maxTextureImageUnits;++t)e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,t=e.createBuffer();if(!t)throw Error("createBuffer() returned null");let n=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,n,e.STATIC_DRAW),this.checkError(),t}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),1===this.version&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){2===this.version?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);let n=2===this.version?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,n,1,1,0,e.RGBA,e.FLOAT,null);let i=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0);let o=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(t),e.deleteFramebuffer(i),o}checkRenderFloat32(){if(2===this.version){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(2===this.version){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,t,n,i,o,a;try{t=e.createTexture(),n=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,t);let s=2===this.version?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,s,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),e.enable(e.BLEND),!!(i=e.createShader(e.VERTEX_SHADER))&&(e.shaderSource(i,"void main(){}"),e.compileShader(i),!!(o=e.createShader(e.FRAGMENT_SHADER)))&&(e.shaderSource(o,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(o),!!(a=e.createProgram()))&&(e.attachShader(a,i),e.attachShader(a,o),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),a&&e.deleteProgram(a),i&&e.deleteShader(i),o&&e.deleteShader(o),n&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(n)),t&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(t))}}beginTimer(){if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension,n=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,n),n}throw Error("WebGL1 profiling currently not supported.")}endTimer(){if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension;e.endQuery(t.TIME_ELAPSED_EXT);return}throw Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let t=!1,n=!1;if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let i=this.gl,o=this.disjointTimerQueryWebgl2Extension;t=i.getQueryParameter(e,i.QUERY_RESULT_AVAILABLE),n=i.getParameter(o.GPU_DISJOINT_EXT)}else throw Error("WebGL1 profiling currently not supported");return t&&!n}getTimerResult(e){let t=0;if(2===this.version){let n=this.gl;t=n.getQueryParameter(e,n.QUERY_RESULT),n.deleteQuery(e)}else throw Error("WebGL1 profiling currently not supported");return t/1e6}async waitForQueryAndGetTime(e){return await vl(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,n=e,i=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),t=null===i?()=>!0:()=>{let e=n.clientWaitSync(i,0,0);return e===n.ALREADY_SIGNALED||e===n.CONDITION_SATISFIED},{query:i,isFencePassed:t}}async pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=KP(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,t){this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1||await vl(()=>(this.pollItems(),0===this.itemsToPoll.length))}}});function Jl(e){let t;if((!e||"webgl2"===e)&&"webgl2"in so?t=so.webgl2:(!e||"webgl"===e)&&"webgl"in so&&(t=so.webgl),!t)try{let n=ZP();t=ky(n,e)}catch{t=ky(XP(),e)}e=e||1===t.version?"webgl":"webgl2";let n=t.gl;return so[e]=t,n.isContextLost()?(delete so[e],Jl(e)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),t)}function ky(e,t){let n,i={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1};if((!t||"webgl2"===t)&&(n=e.getContext("webgl2",i)))try{return new zo(n,2)}catch(e){ze.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${e}`)}if((!t||"webgl"===t)&&(n=e.getContext("webgl",i)||e.getContext("experimental-webgl",i)))try{return new zo(n,1)}catch(e){ze.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${e}`)}throw Error("WebGL is not supported")}function XP(){if(typeof document>"u")throw TypeError("failed to create canvas: document is not supported");let e=document.createElement("canvas");return e.width=1,e.height=1,e}function ZP(){if(typeof OffscreenCanvas>"u")throw TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var so,ua,Ny=N(()=>{"use strict";Ct(),Dy(),so={}}),Ly=N(()=>{"use strict";pt(),Ct(),Cy(),Ny(),ua=class{get contextId(){return pe.webgl.contextId}set contextId(e){pe.webgl.contextId=e}get matmulMaxBatchSize(){return pe.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){pe.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return pe.webgl.textureCacheMode}set textureCacheMode(e){pe.webgl.textureCacheMode=e}get pack(){return pe.webgl.pack}set pack(e){pe.webgl.pack=e}get async(){return pe.webgl.async}set async(e){pe.webgl.async=e}initialize(){try{return this.glContext=Jl(this.contextId),"number"!=typeof this.matmulMaxBatchSize&&(this.matmulMaxBatchSize=16),"string"!=typeof this.textureCacheMode&&(this.textureCacheMode="full"),"boolean"!=typeof this.pack&&(this.pack=!1),"boolean"!=typeof this.async&&(this.async=!1),ze.setWithEnv(pe),pe.webgl.context||Object.defineProperty(pe.webgl,"context",{value:this.glContext.gl}),ze.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return ze.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new sa(this,e)}dispose(){this.glContext.dispose()}}});async function Ql(e){if(!e)return Ql(["webgl"]);for(let t of"string"==typeof e?[e]:e){let e=Ry.get(t);if(e)return e;let n=await QP(t);if(n)return n}throw Error("no available backend to use")}async function QP(e){let t=JP;if("u">typeof t[e]&&YP(t[e])){let n=t[e],i=n.initialize();if("object"==typeof i&&"then"in i&&(i=await i),i)return Ry.set(e,n),n}}function YP(e){let t=e;return"initialize"in t&&"function"==typeof t.initialize&&"createSessionHandler"in t&&"function"==typeof t.createSessionHandler&&"dispose"in t&&"function"==typeof t.dispose}var Ry,JP,Yl,la,Se,Mo,tc,nc,Fn,ca,ec,Vy,Gy,da,pa,fa,zy=N(()=>{"use strict";Ly(),Ry=new Map,JP={webgl:new ua}}),My=N(()=>{"use strict";Ct(),Yl=class{constructor(e,t){this.op=e,this.node=t}},la=class{constructor(e,t,n){this.graph=e,this.profiler=n,this.initialize(t)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let t=this.graph.getNodes();if(t.length!==e.length)throw Error("The size of nodes and OPs do not match.");this._ops=e.map((e,n)=>new Yl(e,t[n])),this.reset(),this._starter=[],this._ops.forEach((e,t)=>{let n=!0;for(let t of e.node.inputs)if(!this._values[t]&&-1===this.graph.getInputIndices().indexOf(t)){n=!1;break}n&&this._starter.push(t)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,t){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let n=e.createInferenceHandler(),i=this.graph.getInputIndices();if(t.length!==i.length)throw Error(`number of input tensors don't match the number of inputs to the model: actual: ${t.length} expected: ${i.length}`);t.forEach((e,t)=>{let n=i[t];this._values[n]=e});let o=this._starter.slice(0),a=this.graph.getValues(),s=this.graph.getNodes(),u=0;for(;u<o.length;){let e=o[u++],t=this._ops[e],i=t.node.inputs.map(e=>this._values[e]);if(-1!==i.indexOf(void 0))throw Error(`unresolved input detected: op: ${t.node}`);let l=i;ze.verbose("ExecPlan",`Running op:${t.node.name} (${l.map((e,n)=>`'${t.node.inputs[n]}': ${e.type}[${e.dims.join(",")}]`).join(", ")})`);let d=await this.profiler.event("node",t.node.name,async()=>t.op.impl(n,l,t.op.context));if(d.length!==t.node.outputs.length)throw Error("the size of output does not match model definition.");d.forEach((e,n)=>{let i=t.node.outputs[n];if(this._values[i])throw Error(`output [${i}] already has value: op:${t.node.name}`);this._values[i]=e});let p=new Set;d.forEach((e,n)=>{for(let e of a[t.node.outputs[n]].to){let t=s[e],n=!0;for(let e of t.inputs)if(!this._values[e]){n=!1;break}n&&p.add(e)}}),o.push(...p)}let l=[];for(let e=0;e<this.graph.getOutputIndices().length;e++){let t=this.graph.getOutputIndices()[e],n=this._values[t];if(void 0===n)throw Error(`required output [${t}] does not have value`);0===t?await n.getData():n.data,l.push(n)}return ze.verbose("ExecPlan","disposing of inferenceHandler"),n.dispose(),l})}}}),By=N(()=>{"use strict";So(),Se=_e(Yr()),Rr(),Le(),Mo=class e{constructor(t){if(this._attributes=new Map,null!=t){for(let n of t)n instanceof Se.onnx.AttributeProto?this._attributes.set(n.name,[e.getValue(n),e.getType(n)]):n instanceof Ci.Attribute&&this._attributes.set(n.name(),[e.getValue(n),e.getType(n)]);if(this._attributes.size<t.length)throw Error("duplicated attribute names")}}set(e,t,n){this._attributes.set(e,[n,t])}delete(e){this._attributes.delete(e)}getFloat(e,t){return this.get(e,"float",t)}getInt(e,t){return this.get(e,"int",t)}getString(e,t){return this.get(e,"string",t)}getTensor(e,t){return this.get(e,"tensor",t)}getFloats(e,t){return this.get(e,"floats",t)}getInts(e,t){return this.get(e,"ints",t)}getStrings(e,t){return this.get(e,"strings",t)}getTensors(e,t){return this.get(e,"tensors",t)}get(e,t,n){let i=this._attributes.get(e);if(void 0===i){if(void 0!==n)return n;throw Error(`required attribute not found: ${e}`)}if(i[1]!==t)throw Error(`type mismatch: expected ${t} but got ${i[1]}`);return i[0]}static getType(e){let t=e instanceof Se.onnx.AttributeProto?e.type:e.type();switch(t){case Se.onnx.AttributeProto.AttributeType.FLOAT:return"float";case Se.onnx.AttributeProto.AttributeType.INT:return"int";case Se.onnx.AttributeProto.AttributeType.STRING:return"string";case Se.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case Se.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case Se.onnx.AttributeProto.AttributeType.INTS:return"ints";case Se.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case Se.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw Error(`attribute type is not supported yet: ${Se.onnx.AttributeProto.AttributeType[t]}`)}}static getValue(e){let t=e instanceof Se.onnx.AttributeProto?e.type:e.type();if(t===Se.onnx.AttributeProto.AttributeType.GRAPH||t===Se.onnx.AttributeProto.AttributeType.GRAPHS)throw Error("graph attribute is not supported yet");let n=this.getValueNoCheck(e);if(t===Se.onnx.AttributeProto.AttributeType.INT&&xt.isLong(n))return xt.longToNumber(n);if(t===Se.onnx.AttributeProto.AttributeType.INTS){let e=n,t=Array(e.length);for(let n=0;n<e.length;n++){let i=e[n];t[n]=xt.longToNumber(i)}return t}if(t===Se.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof Se.onnx.AttributeProto?rt.fromProto(n):rt.fromOrtTensor(n);if(t===Se.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof Se.onnx.AttributeProto)return n.map(e=>rt.fromProto(e));if(e instanceof Ci.Attribute)return n.map(e=>rt.fromOrtTensor(e))}return t===Se.onnx.AttributeProto.AttributeType.STRING&&e instanceof Se.onnx.AttributeProto?Eo(n):t===Se.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof Se.onnx.AttributeProto?n.map(Eo):n}static getValueNoCheck(e){return e instanceof Se.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case Se.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case Se.onnx.AttributeProto.AttributeType.INT:return e.i;case Se.onnx.AttributeProto.AttributeType.STRING:return e.s;case Se.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case Se.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case Se.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case Se.onnx.AttributeProto.AttributeType.INTS:return e.ints;case Se.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case Se.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case Se.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw Error(`unsupported attribute type: ${Se.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case Lt.AttributeType.FLOAT:return e.f();case Lt.AttributeType.INT:return e.i();case Lt.AttributeType.STRING:return e.s();case Lt.AttributeType.TENSOR:return e.t();case Lt.AttributeType.GRAPH:return e.g();case Lt.AttributeType.FLOATS:return e.floatsArray();case Lt.AttributeType.INTS:{let t=[];for(let n=0;n<e.intsLength();n++)t.push(e.ints(n));return t}case Lt.AttributeType.STRINGS:{let t=[];for(let n=0;n<e.stringsLength();n++)t.push(e.strings(n));return t}case Lt.AttributeType.TENSORS:{let t=[];for(let n=0;n<e.tensorsLength();n++)t.push(e.tensors(n));return t}default:throw Error(`unsupported attribute type: ${Lt.AttributeType[e.type()]}`)}}}}),Fy=N(()=>{"use strict";By(),So(),tc=_e(Yr()),Rr(),Le(),nc={from:(e,t)=>new ec(e,t)},Fn=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=ft.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},ca=class{constructor(e,t){e instanceof tc.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Mo(e.attribute)):e instanceof rl.Node&&(this.name=t??e.name(),this.opType=e.opType(),this.attributes=new Mo(ft.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},ec=class{constructor(e,t){if(!e)throw TypeError("graph is empty");this.buildGraph(e),this.transformGraph(t),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof tc.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof tl.Graph)this.buildGraphFromOrtFormat(e);else throw TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let n=new Map;if(!e.input)throw Error("missing information in graph: input");let i=[];for(let n of e.input){if(t.has(n.name))throw Error(`duplicated input name: ${n.name}`);let e=this._allData.push(new Fn(n))-1;t.set(n.name,e),i.push(n.name)}if(!e.initializer)throw Error("missing information in graph: initializer");for(let n of e.initializer){let e=t.get(n.name);if(void 0===e){let i=new Fn;i.type={shape:{dims:ft.tensorDimsFromProto(n.dims)},tensorType:ft.tensorDataTypeFromProto(n.dataType)},e=this._allData.push(i)-1,t.set(n.name,e)}this._allData[e]._from=-1,this._allData[e].tensor=rt.fromProto(n)}for(let e=0;e<this._allData.length;e++)this._allData[e].tensor||(this._allInputIndices.push(e),this._allInputNames.push(i[e]));if(!e.output)throw Error("missing information in graph: output");for(let n of e.output){if(t.has(n.name))throw Error(`duplicated output name: ${n.name}`);let e=this._allData.push(new Fn(n))-1;t.set(n.name,e),this._allOutputIndices.push(e),this._allOutputNames.push(n.name)}if(!e.node)throw Error("missing information in graph: node");for(let t of e.node){if(!t.name)for(let e=0;;e++){let i=`unnamed_${t.opType}_${e}`;if(!n.has(i)){t.name=i;break}}if(n.has(t.name))throw Error(`duplicated node name: ${t.name}`);let e=this._nodes.push(new ca(t))-1;n.set(t.name,e)}for(let n=0;n<this._nodes.length;n++){let i=this._nodes[n],o=e.node[n];if(!o.output)throw Error(`missing output for node: ${o.name}`);for(let e of o.output){let a=t.get(e);if(typeof a>"u"&&(a=this._allData.push(new Fn)-1,t.set(e,a)),i.outputs.push(a),void 0!==this._allData[a]._from)throw Error(`multiple nodes output to one data value: ${a}`);if(this._allData[a]._from=n,"Constant"===o.opType){if(!o.attribute||1!==o.attribute.length||!o.attribute[0].t)throw Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!o.output||1!==o.output.length)throw Error("missing output or incorrect number of outputs for this Constant operator");i.outputs.pop(),i.executeNode=!1,this._allData[a]._from=-1,this._allData[a].tensor=rt.fromProto(o.attribute[0].t)}}}for(let n=0;n<this._nodes.length;n++){let i=this._nodes[n],o=e.node[n];if(!o.input)throw Error(`missing input for node: ${o.name}`);for(let e of o.input){let a=t.get(e);if(typeof a>"u"){if(""===e&&(3===o.input.length||4===o.input.length)&&"Resize"===o.opType)continue;throw Error(`unrecognized input '${e}' for node: ${o.name}`)}i.inputs.push(a),this._allData[a]._to.push(n)}}return!0}buildGraphFromOrtFormat(e){let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let n=new Map,i=[];for(let n=0;n<e.inputsLength();n++){let o=e.inputs(n);if(t.has(o))throw Error(`duplicated input name: ${o}`);for(let n=0;n<e.nodeArgsLength();n++)if(e.nodeArgs(n)?.name()===o){let a=new Fn;if(e.nodeArgs(n)?.type()?.valueType()!==il.TypeInfoValue.tensor_type)throw Error("Unexpected value type for the nodeArg.");let s=e.nodeArgs(n).type().value(new ol.TensorTypeAndShape),u=ft.tensorDataTypeFromProto(s.elemType()),l=s.shape(),d=[];for(let e=0;e<l.dimLength();e++)d.push(xt.longToNumber(l.dim(e).value().dimValue()));a.type={shape:{dims:d},tensorType:u};let p=this._allData.push(a)-1;t.set(o,p),i.push(o)}}for(let n=0;n<e.initializersLength();n++){let i=e.initializers(n),o=t.get(i.name());if(void 0===o){let e=new Fn;e.type={shape:{dims:ft.tensorDimsFromORTFormat(i)},tensorType:ft.tensorDataTypeFromProto(i.dataType())},o=this._allData.push(e)-1,t.set(i.name(),o)}this._allData[o]._from=-1,this._allData[o].tensor=rt.fromOrtTensor(i)}for(let e=0;e<this._allData.length;e++)this._allData[e].tensor||(this._allInputIndices.push(e),this._allInputNames.push(i[e]));for(let n=0;n<e.outputsLength();n++){let i=e.outputs(n);if(t.has(i))throw Error(`duplicated output name: ${i}`);let o=this._allData.push(new Fn)-1;t.set(i,o),this._allOutputIndices.push(o),this._allOutputNames.push(i)}if(!e.nodes)throw Error("missing information in graph: node");for(let t=0;t<e.nodesLength();t++){let i=e.nodes(t),o=i.name();if(!o)for(let e=0;o=`unnamed_${i.opType()}_${e}`,n.has(o);e++);if(n.has(o))throw Error(`duplicated node name: ${o}`);let a=this._nodes.push(new ca(i,o))-1;n.set(o,a)}for(let n=0;n<this._nodes.length;n++){let i=this._nodes[n],o=e.nodes(n);if(null==o)throw Error(`No node exists at index ${n}`);if(o?.outputsLength()===0)throw Error(`missing output for node: ${o.name}`);for(let e=0;e<o?.outputsLength();e++){let a=o?.outputs(e),s=t.get(a);if(typeof s>"u"&&(s=this._allData.push(new Fn)-1,t.set(a,s)),i.outputs.push(s),void 0!==this._allData[s]._from)throw Error(`multiple nodes output to one data value: ${s}`);if(this._allData[s]._from=n,"Constant"===o.opType()){if(1!==o.attributesLength()||!o.attributes(0).t())throw Error("missing attributes or missing tensor value in attributes for this Constant operator");if(1!==o.outputsLength())throw Error("missing output or incorrect number of outputs for this Constant operator");i.outputs.pop(),i.executeNode=!1,this._allData[s]._from=-1,this._allData[s].tensor=rt.fromOrtTensor(o.attributes(0).t())}}}for(let n=0;n<this._nodes.length;n++){let i=this._nodes[n],o=e.nodes(n);if(0===o.inputsLength())throw Error(`missing input for node: ${o.name}`);for(let e=0;e<o.inputsLength();e++){let a=o.inputs(e),s=t.get(a);if(typeof s>"u")throw Error(`unrecognized input '${a}' for node: ${o.name()}`);i.inputs.push(s),this._allData[s]._to.push(n)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(t=>{this._allData[t]._to.forEach(t=>{e.add(t)})});let t=Array.from(e),n=Array(this._nodes.length).fill("white");for(;t.length>0;){let e=t.pop();"gray"===n[e]?n[e]="black":(t.push(e),n[e]="gray",this._nodes[e].outputs.forEach(i=>{let o=this._allData[i];if("u">typeof o.tensor)throw Error("node outputs should not be initialized");if(o._from!==e)throw Error("from property of the Value object doesn't match index of Node being processed");o._to.forEach(e=>{if("gray"===n[e])throw Error("model graph is cyclic");"white"===n[e]&&t.push(e)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,t=[this._nodes.length,0],n=0;for(let e=0;e<this._nodes.length;e++)t[e]=n,this._nodes[e].executeNode?(n!==e&&(this._nodes[n]=this._nodes[e]),n++):this._nodes[e].outputs.forEach(e=>{this._allData[e]._from=-2});this._nodes.splice(n,this._nodes.length-n);for(let e=0;e<this._allData.length;e++){let n=this._allData[e];void 0!==n._from&&-1!==n._from&&-2!==n._from&&(n._from=t[n._from]);for(let e=0;e<n._to.length;e++)if(n._to[e]>=0)n._to[e]=t[n._to[e]];else throw Error("Trying to update a removed node")}e=0;for(let t=0;t<this._allData.length;t++){if(-2===this._allData[t].from&&-1===this._allOutputIndices.indexOf(t+e)){e++,this._allData.splice(t,1),t--;continue}if(e>0){let n=-1;void 0!==this._allData[t].from&&-1!==this._allData[t].from?-1!==(n=this._nodes[this._allData[t].from].outputs.indexOf(t+e))&&(this._nodes[this._allData[t].from].outputs[n]=t):-1!==(n=this._allInputIndices.indexOf(t+e))&&(this._allInputIndices[n]=t),this._allData[t].to.forEach(i=>{-1!==(n=this._nodes[i].inputs.indexOf(t+e))&&(this._nodes[i].inputs[n]=t)}),0===this._allData[t].to.length&&-1!==(n=this._allOutputIndices.indexOf(t+e))&&(this._allOutputIndices[n]=t)}}}deleteNode(e){let t=this._nodes[e];if(t.outputs.length>1){for(let e=1;e<t.outputs.length;e++)if(this._allData[t.outputs[e]].to.length>0)throw Error("Node deletion with more than one output connected to other nodes is not supported. ")}t.executeNode=!1;let n=t.inputs[0],i=t.outputs[0],o=this._allData[i].to;for(let n=0;n<t.inputs.length;n++){let i=this._allData[t.inputs[n]].to.indexOf(e);if(-1===i)throw Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[t.inputs[n]].to.splice(i,1)}this._allData[i]._to=[];let a=this._allOutputIndices.indexOf(i);if(-1!==a&&(this._allOutputIndices[a]=n),o&&o.length>0)for(let e of o){let t=this._nodes[e].inputs.indexOf(i);if(-1===t)throw Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[e].inputs[t]=n,this._allData[n].to.push(e)}}removeAllDropoutNodes(){let e=0;for(let t of this._nodes){if("Dropout"===t.opType){if(1!==t.inputs.length)throw Error("Dropout nodes should only contain one input. ");if(1!==t.outputs.length&&2!==t.outputs.length)throw Error("Dropout nodes should contain either 1 or 2 output(s)");if(2===t.outputs.length&&0!==this._allData[t.outputs[1]]._to.length)throw Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let t of this._nodes)"Identity"===t.opType&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if("Conv"===e.opType){let t=this._allData[e.outputs[0]]._to;if(1===t.length&&this.isActivation(this._nodes[t[0]])){let n=this._nodes[t[0]];if("Clip"===n.opType)if(1===n.inputs.length)try{e.attributes.set("activation_params","floats",[n.attributes.getFloat("min"),n.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[Nr,Lr])}else{if(!(n.inputs.length>=3)||void 0===this._allData[n.inputs[1]].tensor||void 0===this._allData[n.inputs[2]].tensor)continue;e.attributes.set("activation_params","floats",[this._allData[n.inputs[1]].tensor.floatData[0],this._allData[n.inputs[2]].tensor.floatData[0]])}e.attributes.set("activation","string",n.opType),this.deleteNode(t[0])}}}}}),Uy=N(()=>{"use strict";Vy=_e(Ne()),Fy(),So(),Gy=_e(Yr()),Le(),da=class{load(e,t,n){let i;if(!n)try{this.loadFromOnnxFormat(e,t);return}catch(e){if(void 0!==n)throw e;i=e}try{this.loadFromOrtFormat(e,t)}catch(e){throw void 0!==n?e:Error(`Failed to load model as ONNX format: ${i}
as ORT format: ${e}`)}}loadFromOnnxFormat(e,t){let n=Gy.onnx.ModelProto.decode(e);if(3>xt.longToNumber(n.irVersion))throw Error("only support ONNX model with IR_VERSION>=3");this._opsets=n.opsetImport.map(e=>({domain:e.domain,version:xt.longToNumber(e.version)})),this._graph=nc.from(n.graph,t)}loadFromOrtFormat(e,t){let n=new Vy.ByteBuffer(e),i=nl.InferenceSession.getRootAsInferenceSession(n).model();if(3>xt.longToNumber(i.irVersion()))throw Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let e=0;e<i.opsetImportLength();e++){let t=i.opsetImport(e);this._opsets.push({domain:t?.domain(),version:xt.longToNumber(t.version())})}this._graph=nc.from(i.graph(),t)}get graph(){return this._graph}get opsets(){return this._opsets}}}),Wy=N(()=>{"use strict";zy(),My(),Ct(),Uy(),pa=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=bi.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,t,n){await this.profiler.event("session","Session.loadModel",async()=>{let i=await Ql(this.backendHint);if(this.sessionHandler=i.createSessionHandler(this.context),this._model=new da,"string"==typeof e){let t=e.endsWith(".ort");{let n=await (await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(n),t)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,t||0,n||e.byteLength);this.initialize(i)}})}initialize(e,t){if(this._initialized)throw Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let n=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,n,t),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new la(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let t=this.normalizeAndValidateInputs(e),n=await this._executionPlan.execute(this.sessionHandler,t);return this.createOutput(n)})}normalizeAndValidateInputs(e){let t=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==t.length)throw Error(`incorrect input array length: expected ${t.length} but got ${e.length}`)}else{if(e.size!==t.length)throw Error(`incorrect input map size: expected ${t.length} but got ${e.size}`);let n=Array(e.size),i=0;for(let o=0;o<t.length;++o){let a=e.get(t[o]);if(!a)throw Error(`missing input tensor for: '${name}'`);n[i++]=a}e=n}if(this.context.graphInputTypes&&0!==this.context.graphInputTypes.length&&this.context.graphInputDims&&0!==this.context.graphInputDims.length)this.validateInputTensorDims(this.context.graphInputDims,e,!1);else{let t=this._model.graph.getInputIndices(),n=this._model.graph.getValues(),i=Array(t.length);for(let o=0;o<t.length;++o){let a=n[t[o]];i[o]=a.type.shape.dims,this.context.graphInputTypes.push(a.type.tensorType),this.context.graphInputDims.push(e[o].dims)}this.validateInputTensorDims(i,e,!0)}return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,t){for(let n=0;n<t.length;n++){let i=e[n],o=t[n].type;if(i!==o)throw Error(`input tensor[${n}] check failed: expected type '${i}' but got ${o}`)}}validateInputTensorDims(e,t,n){for(let i=0;i<t.length;i++){let o=e[i],a=t[i].dims;if(!this.compareTensorDims(o,a,n))throw Error(`input tensor[${i}] check failed: expected shape '[${o.join(",")}]' but got [${a.join(",")}]`)}}compareTensorDims(e,t,n){if(e.length!==t.length)return!1;for(let i=0;i<e.length;++i)if(e[i]!==t[i]&&(!n||0!==e[i]))return!1;return!0}createOutput(e){let t=this._model.graph.getOutputNames();if(e.length!==t.length)throw Error("expected number of outputs do not match number of generated outputs");let n=new Map;for(let i=0;i<t.length;++i)n.set(t[i],e[i]);return n}initializeOps(e){let t=e.getNodes();this._ops=Array(t.length);for(let n=0;n<t.length;n++)this._ops[n]=this.sessionHandler.resolve(t[n],this._model.opsets,e)}}}),Hy=N(()=>{"use strict";pt(),Rr(),fa=class{constructor(e){this.session=e,this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,t,n){let i=new Map;for(let t in e)if(Object.hasOwnProperty.call(e,t)){let n=e[t];i.set(t,new rt(n.dims,n.type,void 0,void 0,n.data))}let o=await this.session.run(i),a={};return o.forEach((e,t)=>{a[t]=new St(e.type,e.data,e.dims)}),a}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}}),qy={};Sr(qy,{onnxjsBackend:()=>e3});var e3,jy=N(()=>{"use strict";Wy(),Hy(),e3=new class{async init(){}async createInferenceSessionHandler(e,t){let n=new pa(t);return await n.loadModel(e),new fa(n)}}}),ha=N(()=>{}),Zy={};Sr(Zy,{default:()=>t3});var Ky,Xy,t3,Jy=N(()=>{"use strict";oc(),br(),ma(),Ky="ort-wasm-proxy-worker",(Xy=globalThis.self?.name===Ky)&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case"init-wasm":ga(n.wasm).then(()=>{ba(n).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})})},e=>{postMessage({type:t,err:e})});break;case"init-ep":{let{epName:e,env:i}=n;ya(i,e).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})});break}case"copy-from":{let{buffer:e}=n,i=Bo(e);postMessage({type:t,out:i});break}case"create":{let{model:e,options:i}=n;_a(e,i).then(e=>{postMessage({type:t,out:e})},e=>{postMessage({type:t,err:e})});break}case"release":wa(n),postMessage({type:t});break;case"run":{let{sessionId:e,inputIndices:i,inputs:o,outputIndices:a,options:s}=n;va(e,i,o,a,Array(a.length).fill(null),s).then(e=>{e.some(e=>"cpu"!==e[3])?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:e},Ta([...o,...e]))},e=>{postMessage({type:t,err:e})});break}case"end-profiling":xa(n),postMessage({type:t})}}catch(e){postMessage({type:t,err:e})}}),t3=Xy?null:e=>new Worker(e??Ot,{type:"module",name:Ky})}),Yy={};async function Qy(e={}){var t=e,n=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,o=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(e,n)=>{e.startsWith("./")&&(e=e.substring(2)),(t.Zc||(t.Zc=new Map)).set(e,n)},t.unmountExternalData=()=>{delete t.Zc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,ae:!0}).buffer.constructor;let a=e=>async(...n)=>{try{if(t.$c)throw Error("Session already started");let i=t.$c={Nd:n[0],errors:[]},o=await e(...n);if(t.$c!==i)throw Error("Session mismatch");t.gd?.flush();let a=i.errors;if(0<a.length){let e=await Promise.all(a);if(e=e.filter(e=>e),0<e.length)throw Error(e.join(`
`))}return o}finally{t.$c=null}};t.jsepInit=(e,n)=>{if("webgpu"===e){[t.gd,t.Dd,t.Hd,t.jd,t.Gd,t.ac,t.Id,t.Kd,t.Ed,t.Fd,t.Jd]=n;let e=t.gd;t.jsepRegisterBuffer=(t,n,i,o)=>e.registerBuffer(t,n,i,o),t.jsepGetBuffer=t=>e.getBuffer(t),t.jsepCreateDownloader=(t,n,i)=>e.createDownloader(t,n,i),t.jsepOnCreateSession=t=>{e.onCreateSession(t)},t.jsepOnReleaseSession=t=>{e.onReleaseSession(t)},t.jsepOnRunStart=t=>e.onRunStart(t),t.Ld=(t,n)=>{e.upload(t,n)}}else if("webnn"===e){let e=n[0];[t.Zd,t.vd,t.webnnEnsureTensor,t.xd,t.webnnDownloadTensor,t.Yd,t.webnnEnableTraceEvent]=n.slice(1),t.webnnReleaseTensorId=t.vd,t.webnnUploadTensor=t.xd,t.webnnRegisterMLContext=t.Yd,t.webnnOnRunStart=t=>e.onRunStart(t),t.webnnOnRunEnd=e.onRunEnd.bind(e),t.webnnOnReleaseSession=t=>{e.onReleaseSession(t)},t.webnnCreateMLTensorDownloader=(t,n)=>e.createMLTensorDownloader(t,n),t.webnnRegisterMLTensor=(t,n,i,o)=>e.registerMLTensor(t,n,i,o),t.webnnCreateMLContext=t=>e.createMLContext(t),t.webnnRegisterMLConstant=(n,i,o,a,s,u)=>e.registerMLConstant(n,i,o,a,s,t.Zc,u),t.webnnRegisterGraphInput=e.registerGraphInput.bind(e),t.webnnIsGraphInput=e.isGraphInput.bind(e),t.webnnRegisterGraphOutput=e.registerGraphOutput.bind(e),t.webnnIsGraphOutput=e.isGraphOutput.bind(e),t.webnnCreateTemporaryTensor=e.createTemporaryTensor.bind(e),t.webnnIsGraphInputOutputTypeSupported=e.isGraphInputOutputTypeSupported.bind(e)}};let s=()=>{let e=e=>(...t)=>{let n=rV;return t=e(...t),rV!=n?new Promise((e,t)=>{rX={resolve:e,reject:t}}):t};(()=>{for(let n of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[n]=e(t[n])})(),void 0!==a&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s?.()};var u,l,d=(e,t)=>{throw t},p=import.meta.url,c="";if(n||i){try{c=new URL(".",p).href}catch{}i&&(l=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),u=async e=>{if(T(e))return new Promise((t,n)=>{var i=new XMLHttpRequest;i.open("GET",e,!0),i.responseType="arraybuffer",i.onload=()=>{200==i.status||0==i.status&&i.response?t(i.response):n(i.status)},i.onerror=n,i.send(null)});var t=await fetch(e,{credentials:"same-origin"});if(t.ok)return t.arrayBuffer();throw Error(t.status+" : "+t.url)}}var h,f,m,g,b,y,_=console.log.bind(console),v=console.error.bind(console),x=_,w=v,$=!1,T=e=>e.startsWith("file://");function I(){eM.buffer!=O.buffer&&q()}if(o){let e=function(n){try{var i=n.data,o=i.Uc;if("load"===o){let n=[];for(let o of(self.onmessage=e=>n.push(e),y=()=>{for(let t of(postMessage({Uc:"loaded"}),n))e(t);self.onmessage=e},i.Ad))t[o]&&!t[o].proxy||(t[o]=(...e)=>{postMessage({Uc:"callHandler",zd:o,args:e})},"print"==o&&(x=t[o]),"printErr"==o&&(w=t[o]));eM=i.Vd,q(),f=i.Wd,Q(),sl()}else if("run"===o){(function(e){var t=(I(),C)[e+52>>>2>>>0];e=(I(),C)[e+56>>>2>>>0],iJ(t,t-e),iY(t)})(i.Tc),iU(i.Tc,0,0,1,0,0),ez(),rS(i.Tc),S||(iF(),S=!0);try{eF(i.Pd,i.dd)}catch(e){if("unwind"!=e)throw e}}else"setimmediate"!==i.target&&("checkMailbox"===o?S&&rO():o&&(w(`worker: received unknown command ${o}`),w(i)))}catch(e){throw iq(),e}};var S=!1;self.onunhandledrejection=e=>{throw e.reason||e},self.onmessage=e}var O,E,A,P,k,C,z,R,B,M,j,V=!1;function q(){var e=eM.buffer;t.HEAP8=O=new Int8Array(e),A=new Int16Array(e),t.HEAPU8=E=new Uint8Array(e),P=new Uint16Array(e),t.HEAP32=k=new Int32Array(e),t.HEAPU32=C=new Uint32Array(e),z=new Float32Array(e),R=new Float64Array(e),B=new BigInt64Array(e),M=new BigUint64Array(e)}function G(){V=!0,o?y():an.tb()}function W(e){throw w(e="Aborted("+e+")"),$=!0,e=new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info."),b?.(e),e}function X(){return{a:{ma:ad,hb:al,g:eV,J:eq,f:eX,o:eZ,h:eQ,ha:eJ,b:eY,T:e1,Ia:e4,n:e6,_:tt,Ya:tr,Ea:tn,Ga:ti,Za:tu,Wa:td,Pa:tp,Va:tm,ka:t$,Fa:tT,Ca:tS,Xa:tk,Da:tN,cb:tz,ea:tU,xa:tq,va:tJ,da:t1,O:t2,H:t4,wa:t5,Z:rd,ya:rp,Sa:rc,Aa:rk,Ja:rz,ta:rR,fa:rB,Ra:rS,$a:rM,R:rJ,s:r8,c:tW,ib:r5,y:r7,M:r9,D:ne,m:nr,t:nn,jb:ni,I:nd,S:np,j:n$,v:nT,r:nS,l:nk,Ma:nN,Na:nM,Oa:nF,Ka:nj,La:nL,ua:nq,eb:nG,bb:nK,u:nQ,aa:nJ,ga:nY,ab:nH,V:n1,_a:n2,Ba:n4,F:nU,U:n6,la:ie,za:ir,gb:n9,fb:ii,Ta:i$,Ua:iT,Ha:e$,$:iS,ja:ik,Qa:iN,ia:iR,lb:ss,na:a6,mb:si,oa:a4,G:aW,d:aT,q:ah,w:ap,B:aL,pb:aY,K:aq,x:ak,pa:a1,X:a8,ba:aJ,nb:sn,ob:a9,ra:aK,qa:aQ,qb:aX,N:aG,Y:a2,e:aS,A:aN,k:a$,kb:su,p:aR,z:aB,C:az,E:aM,L:aV,rb:aH,Q:a5,ca:aU,W:a7,sb:aj,sa:aF,P:aZ,i:iB,a:eM,db:ep}}}async function Q(){function e(e,n){var i=an=e.exports;for(let[t,n]of(e={},Object.entries(i)))"function"==typeof n?(i=rj(n),e[t]=i):e[t]=n;return an=e,an=function(){var e=an,t=e=>t=>e(t)>>>0,n=e=>()=>e()>>>0;return(e=Object.assign({},e)).ub=t(e.ub),e.Yb=n(e.Yb),e._b=t(e._b),e.mc=t(e.mc),e.nc=n(e.nc),e.rc=t(e.rc),e}(),eS.push(an.$b),iM=(e=an).ub,iF=e.vb,t._OrtInit=e.wb,t._OrtGetLastError=e.xb,t._OrtCreateSessionOptions=e.yb,t._OrtAppendExecutionProvider=e.zb,t._OrtAddFreeDimensionOverride=e.Ab,t._OrtAddSessionConfigEntry=e.Bb,t._OrtReleaseSessionOptions=e.Cb,t._OrtCreateSession=e.Db,t._OrtReleaseSession=e.Eb,t._OrtGetInputOutputCount=e.Fb,t._OrtGetInputOutputMetadata=e.Gb,t._OrtFree=e.Hb,t._OrtCreateTensor=e.Ib,t._OrtGetTensorData=e.Jb,t._OrtReleaseTensor=e.Kb,t._OrtCreateRunOptions=e.Lb,t._OrtAddRunConfigEntry=e.Mb,t._OrtReleaseRunOptions=e.Nb,t._OrtCreateBinding=e.Ob,t._OrtBindInput=e.Pb,t._OrtBindOutput=e.Qb,t._OrtClearBoundOutputs=e.Rb,t._OrtReleaseBinding=e.Sb,t._OrtRunWithBinding=e.Tb,t._OrtRun=e.Ub,t._OrtEndProfiling=e.Vb,t._JsepOutput=e.Wb,t._JsepGetNodeName=e.Xb,ij=e.Yb,iL=t._free=e.Zb,iV=t._malloc=e._b,iU=e.bc,iq=e.cc,iG=e.dc,iH=e.ec,iW=e.fc,iK=e.gc,iX=e.hc,iZ=e.ic,iQ=e.jc,iJ=e.kc,iY=e.lc,i1=e.mc,i2=e.nc,i4=e.oc,i6=e.pc,i8=e.qc,i5=e.rc,i7=e.sc,i9=e.tc,or=e.uc,on=e.vc,oi=e.wc,od=e.xc,op=e.yc,oh=e.zc,o$=e.Ac,oT=e.Bc,oS=e.Cc,ok=e.Dc,oN=e.Ec,oz=e.Fc,oR=e.Gc,oB=e.Hc,oM=e.Ic,oF=e.Jc,oj=e.Kc,oL=e.Lc,oV=e.Mc,oU=e.Nc,oq=e.Oc,oG=e.Pc,oH=e.Rc,oW=e.Sc,oK=e.bd,oX=e.cd,oZ=e.hd,oQ=e.kd,oJ=e.ld,oY=e.md,o1=e.nd,o2=e.od,o3=e.pd,o4=e.qd,o6=e.rd,o8=e.wd,o5=e.Rd,o7=e.Sd,o9=e.Td,ae=e.Ud,f=n,an}var n,i=X();return t.instantiateWasm?new Promise(n=>{t.instantiateWasm(i,(t,i)=>{n(e(t,i))})}):o?e(new WebAssembly.Instance(f,X()),f):(j??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",c):c+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,n=await async function(e){var t=j;if(!h&&!T(t))try{var n=fetch(t,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(n,e)}catch(e){w(`wasm streaming compile failed: ${e}`),w("falling back to ArrayBuffer instantiation")}return async function(e,t){try{var n=await async function(e){if(!h)try{var t=await u(e);return new Uint8Array(t)}catch{}if(e==j&&h)e=new Uint8Array(h);else{if(!l)throw"both async and sync fetching of the wasm failed";e=l(e)}return e}(e);return await WebAssembly.instantiate(n,t)}catch(e){w(`failed to asynchronously prepare wasm: ${e}`),W(e)}}(t,e)}(i),e(n.instance,n.module))}class J{name="ExitStatus";constructor(e){this.message=`Program terminated with exit(${e})`,this.status=e}}var Y=e=>{e.terminate(),e.onmessage=()=>{}},ee=[],et=0,en=null,ei=e=>{0==eT.length&&(eB(),eR(eT[0]));var t=eT.pop();if(!t)return 6;eI.push(t),ek[e.Tc]=t,t.Tc=e.Tc;var n={Uc:"run",Pd:e.Od,dd:e.dd,Tc:e.Tc};return t.postMessage(n,e.ud),0},el=0,ed=(e,t,...n)=>{var i,o=16*n.length,a=i2(),s=i1(o),u=s>>>3;for(i of n)"bigint"==typeof i?((I(),B)[u++>>>0]=1n,(I(),B)[u++>>>0]=i):((I(),B)[u++>>>0]=0n,(I(),R)[u++>>>0]=i);return e=iG(e,0,o,s,t),iY(a),e};function ep(e){if(o)return ed(0,1,e);if(m=e,!(0<el)){for(var t of eI)Y(t);for(t of eT)Y(t);eT=[],eI=[],ek={},$=!0}d(0,new J(e))}function eh(e){if(o)return ed(1,0,e);e$(e)}var e$=e=>{if(m=e,o)throw eh(e),"unwind";ep(e)},eT=[],eI=[],eS=[],ek={},eN=e=>{var t=e.Tc;delete ek[t],eT.push(e),eI.splice(eI.indexOf(e),1),e.Tc=0,iH(t)};function ez(){eS.forEach(e=>e())}var eR=e=>new Promise(n=>{e.onmessage=i=>{var o=i.data;if(i=o.Uc,o.ad&&o.ad!=ij()){var a=ek[o.ad];a?a.postMessage(o,o.ud):w(`Internal error! Worker sent a message "${i}" to target pthread ${o.ad}, but that thread no longer exists!`)}else"checkMailbox"===i?rO():"spawnThread"===i?ei(o):"cleanupThread"===i?r$(()=>{eN(ek[o.Qd])}):"loaded"===i?(e.loaded=!0,n(e)):"setimmediate"===o.target?e.postMessage(o):"uncaughtException"===i?e.onerror(o.error):"callHandler"===i?t[o.zd](...o.args):i&&w(`worker sent an unknown command ${i}`)},e.onerror=e=>{throw w(`worker sent an error! ${e.filename}:${e.lineno}: ${e.message}`),e};var i,o=[];for(i of[])t.propertyIsEnumerable(i)&&o.push(i);e.postMessage({Uc:"load",Ad:o,Vd:eM,Wd:f})});function eB(){var e=new Worker((()=>{let e=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new e("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});eT.push(e)}var eM,eF=(e,t)=>{el=0,e=i9(e,t),0<el?m=e:iW(e)},ej=[],eL=0;function eV(e){var t=new eW(e>>>=0);return 0==(I(),O)[t.Vc+12>>>0]&&(eG(t,!0),eL--),eH(t,!1),ej.push(t),i5(e)}var eU=0,eq=()=>{iZ(0,0);var e=ej.pop();i4(e.ed),eU=0};function eG(e,t){t=+!!t,(I(),O)[e.Vc+12>>>0]=t}function eH(e,t){t=+!!t,(I(),O)[e.Vc+13>>>0]=t}class eW{constructor(e){this.ed=e,this.Vc=e-24}}var eK=e=>{var t=eU;if(!t)return iQ(0),0;var n=new eW(t);(I(),C)[n.Vc+16>>>2>>>0]=t;var i=(I(),C)[n.Vc+4>>>2>>>0];if(!i)return iQ(0),t;for(var o of e){if(0===o||o===i)break;if(i8(o,i,n.Vc+16))return iQ(o),t}return iQ(i),t};function eX(){return eK([])}function eZ(e){return eK([e>>>0])}function eQ(e,t,n,i){return eK([e>>>0,t>>>0,n>>>0,i>>>0])}var eJ=()=>{var e=ej.pop();e||W("no exception to throw");var t=e.ed;throw 0==(I(),O)[e.Vc+13>>>0]&&(ej.push(e),eH(e,!0),eG(e,!1),eL++),i6(t),eU=t};function eY(e,t,n){var i=new eW(e>>>=0);throw t>>>=0,n>>>=0,(I(),C)[i.Vc+16>>>2>>>0]=0,(I(),C)[i.Vc+4>>>2>>>0]=t,(I(),C)[i.Vc+8>>>2>>>0]=n,i6(e),eL++,eU=e}var e1=()=>eL;function e2(e,t,n,i){return o?ed(2,1,e,t,n,i):e4(e,t,n,i)}function e4(e,t,n,i){if(e>>>=0,t>>>=0,n>>>=0,i>>>=0,!globalThis.SharedArrayBuffer)return 6;var a=[];return o&&0===a.length?e2(e,t,n,i):(e={Od:n,Tc:e,dd:i,ud:a},o?(e.Uc="spawnThread",postMessage(e,a),0):ei(e))}function e6(e){throw eU||=e>>>0}var e8=globalThis.TextDecoder&&new TextDecoder,e5=(e,t,n,i)=>{if(n=t+n,i)return n;for(;e[t]&&!(t>=n);)++t;return t},e7=(e,t=0,n,i)=>{if(16<(n=e5(e,t>>>=0,n,i))-t&&e.buffer&&e8)return e8.decode(e.buffer instanceof ArrayBuffer?e.subarray(t,n):e.slice(t,n));for(i="";t<n;){var o=e[t++];if(128&o){var a=63&e[t++];if((224&o)==192)i+=String.fromCharCode((31&o)<<6|a);else{var s=63&e[t++];65536>(o=(240&o)==224?(15&o)<<12|a<<6|s:(7&o)<<18|a<<12|s<<6|63&e[t++])?i+=String.fromCharCode(o):(o-=65536,i+=String.fromCharCode(55296|o>>10,56320|1023&o))}}else i+=String.fromCharCode(o)}return i},e9=(e,t,n)=>(e>>>=0)?e7((I(),E),e,t,n):"";function tt(e,t,n){return o?ed(3,1,e,t,n):0}function tr(e,t){if(o)return ed(4,1,e,t)}function tn(e,t){if(o)return ed(5,1,e,t)}function ti(e,t,n){if(o)return ed(6,1,e,t,n)}function tu(e,t,n){return o?ed(7,1,e,t,n):0}function td(e,t){if(o)return ed(8,1,e,t)}function tp(e,t,n){if(o)return ed(9,1,e,t,n)}function tm(e,t,n,i){if(o)return ed(10,1,e,t,n,i)}function t$(e,t,n,i){if(o)return ed(11,1,e,t,n,i)}function tT(e,t,n,i){if(o)return ed(12,1,e,t,n,i)}function tS(e){if(o)return ed(13,1,e)}function tk(e,t){if(o)return ed(14,1,e,t)}function tN(e,t,n){if(o)return ed(15,1,e,t,n)}var tz=()=>W(""),tR=e=>{e>>>=0;for(var t="";;){var n=(I(),E)[e++>>>0];if(!n)return t;t+=String.fromCharCode(n)}},tB={},tM={},tF={},tj=class extends Error{constructor(e){super(e),this.name="BindingError"}};function tL(e,t,n={}){return function(e,t,n={}){var i=t.name;if(!e)throw new tj(`type "${i}" must have a positive integer typeid pointer`);if(tM.hasOwnProperty(e)){if(n.Bd)return;throw new tj(`Cannot register type '${i}' twice`)}tM[e]=t,delete tF[e],tB.hasOwnProperty(e)&&(t=tB[e],delete tB[e],t.forEach(e=>e()))}(e,t,n)}var tV=(e,t,n)=>{switch(t){case 1:return n?e=>(I(),O)[e>>>0]:e=>(I(),E)[e>>>0];case 2:return n?e=>(I(),A)[e>>>1>>>0]:e=>(I(),P)[e>>>1>>>0];case 4:return n?e=>(I(),k)[e>>>2>>>0]:e=>(I(),C)[e>>>2>>>0];case 8:return n?e=>(I(),B)[e>>>3>>>0]:e=>(I(),M)[e>>>3>>>0];default:throw TypeError(`invalid integer width (${t}): ${e}`)}};function tU(e,t,n,i,o){e>>>=0,n>>>=0,t=tR(t>>>0);let a=e=>e;if(i=0n===i){let e=8*n;o=(a=t=>BigInt.asUintN(e,t))(o)}tL(e,{name:t,Qc:a,Xc:(e,t)=>("number"==typeof t&&(t=BigInt(t)),t),Wc:tV(t,n,!i),Yc:null})}function tq(e,t,n,i){tL(e>>>=0,{name:t=tR(t>>>0),Qc:function(e){return!!e},Xc:function(e,t){return t?n:i},Wc:function(e){return this.Qc((I(),E)[e>>>0])},Yc:null})}var tG=[],tH=[0,1,,1,null,1,!0,1,!1,1];function tW(e){9<(e>>>=0)&&0==--tH[e+1]&&(tH[e]=void 0,tG.push(e))}var tK=e=>{if(!e)throw new tj(`Cannot use deleted val. handle = ${e}`);return tH[e]},tX=e=>{switch(e){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let t=tG.pop()||tH.length;return tH[t]=e,tH[t+1]=1,t}};function tZ(e){return this.Qc((I(),C)[e>>>2>>>0])}var tQ={name:"emscripten::val",Qc:e=>{var t=tK(e);return tW(e),t},Xc:(e,t)=>tX(t),Wc:tZ,Yc:null};function tJ(e){return tL(e>>>0,tQ)}var tY=(e,t)=>{switch(t){case 4:return function(e){return this.Qc((I(),z)[e>>>2>>>0])};case 8:return function(e){return this.Qc((I(),R)[e>>>3>>>0])};default:throw TypeError(`invalid float width (${t}): ${e}`)}};function t1(e,t,n){n>>>=0,tL(e>>>=0,{name:t=tR(t>>>0),Qc:e=>e,Xc:(e,t)=>t,Wc:tY(t,n),Yc:null})}function t2(e,t,n,i,o){e>>>=0,n>>>=0,t=tR(t>>>0);let a=e=>e;if(0===i){var s=32-8*n;o=(a=e=>e<<s>>>s)(o)}tL(e,{name:t,Qc:a,Xc:(e,t)=>t,Wc:tV(t,n,0!==i),Yc:null})}function t4(e,t,n){function i(e){var t=(I(),C)[e>>>2>>>0];return e=(I(),C)[e+4>>>2>>>0],new o((I(),O).buffer,e,t)}var o=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][t];tL(e>>>=0,{name:n=tR(n>>>0),Qc:i,Wc:i},{Bd:!0})}var t6=(e,t,n)=>{var i=(I(),E);if(t>>>=0,0<n){var o=t;n=t+n-1;for(var a=0;a<e.length;++a){var s=e.codePointAt(a);if(127>=s){if(t>=n)break;i[t++>>>0]=s}else if(2047>=s){if(t+1>=n)break;i[t++>>>0]=192|s>>6,i[t++>>>0]=128|63&s}else if(65535>=s){if(t+2>=n)break;i[t++>>>0]=224|s>>12,i[t++>>>0]=128|s>>6&63,i[t++>>>0]=128|63&s}else{if(t+3>=n)break;i[t++>>>0]=240|s>>18,i[t++>>>0]=128|s>>12&63,i[t++>>>0]=128|s>>6&63,i[t++>>>0]=128|63&s,a++}}i[t>>>0]=0,e=t-o}else e=0;return e},t8=e=>{for(var t=0,n=0;n<e.length;++n){var i=e.charCodeAt(n);127>=i?t++:2047>=i?t+=2:55296<=i&&57343>=i?(t+=4,++n):t+=3}return t};function t5(e,t){tL(e>>>=0,{name:t=tR(t>>>0),Qc(e){var t=(I(),C)[e>>>2>>>0];return t=e9(e+4,t,!0),iL(e),t},Xc(e,t){t instanceof ArrayBuffer&&(t=new Uint8Array(t));var n="string"==typeof t;if(!(n||ArrayBuffer.isView(t)&&1==t.BYTES_PER_ELEMENT))throw new tj("Cannot pass non-string to std::string");var i=n?t8(t):t.length,o=iV(4+i+1),a=o+4;return(I(),C)[o>>>2>>>0]=i,n?t6(t,a,i+1):(I(),E).set(t,a>>>0),null!==e&&e.push(iL,o),o},Wc:tZ,Yc(e){iL(e)}})}var t7=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,t9=(e,t,n)=>{if(e>>>=1,16<(t=e5((I(),P),e,t/2,n))-e&&t7)return t7.decode((I(),P).slice(e,t));for(n="";e<t;++e)n+=String.fromCharCode((I(),P)[e>>>0]);return n},re=(e,t,n)=>{if(2>(n??=0x7fffffff))return 0;var i=t;n=(n-=2)<2*e.length?n/2:e.length;for(var o=0;o<n;++o){var a=e.charCodeAt(o);(I(),A)[t>>>1>>>0]=a,t+=2}return(I(),A)[t>>>1>>>0]=0,t-i},rr=e=>2*e.length,rn=(e,t,n)=>{var i="";e>>>=2;for(var o=0;!(o>=t/4);o++){var a=(I(),C)[e+o>>>0];if(!a&&!n)break;i+=String.fromCodePoint(a)}return i},ri=(e,t,n)=>{if(t>>>=0,4>(n??=0x7fffffff))return 0;var i=t;n=i+n-4;for(var o=0;o<e.length;++o){var a=e.codePointAt(o);if(65535<a&&o++,(I(),k)[t>>>2>>>0]=a,(t+=4)+4>n)break}return(I(),k)[t>>>2>>>0]=0,t-i},ru=e=>{for(var t=0,n=0;n<e.length;++n)65535<e.codePointAt(n)&&n++,t+=4;return t};function rd(e,t,n){if(e>>>=0,t>>>=0,n=tR(n>>>=0),2===t)var i=t9,o=re,a=rr;else i=rn,o=ri,a=ru;tL(e,{name:n,Qc:e=>{var n=(I(),C)[e>>>2>>>0];return n=i(e+4,n*t,!0),iL(e),n},Xc:(e,i)=>{if("string"!=typeof i)throw new tj(`Cannot pass non-string to C++ string type ${n}`);var s=a(i),u=iV(4+s+t);return(I(),C)[u>>>2>>>0]=s/t,o(i,u+4,s+t),null!==e&&e.push(iL,u),u},Wc:tZ,Yc(e){iL(e)}})}function rp(e,t){tL(e>>>=0,{Cd:!0,name:t=tR(t>>>0),Qc:()=>{},Xc:()=>{}})}function rc(e){iU(e>>>0,!i,1,!n,131072,!1),ez()}var r$=e=>{if(!$)try{if(e(),!(0<el))try{o?ij()&&iW(m):e$(m)}catch(e){e instanceof J||"unwind"==e||d(0,e)}}catch(e){e instanceof J||"unwind"==e||d(0,e)}},rT=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function rS(e){e>>>=0,rT||(Atomics.waitAsync((I(),k),e>>>2,e).value.then(rO),e+=128,Atomics.store((I(),k),e>>>2,1))}var rO=()=>r$(()=>{var e=ij();e&&(rS(e),iX())});function rk(e,t){(e>>>=0)==t>>>0?setTimeout(rO):o?postMessage({ad:e,Uc:"checkMailbox"}):(e=ek[e])&&e.postMessage({Uc:"checkMailbox"})}var rN=[];function rz(e,t,n,i,o){for(t>>>=0,o>>>=0,rN.length=0,n=o>>>3,i=o+i>>>3;n<i;){var a;a=(I(),B)[n++>>>0]?(I(),B)[n++>>>0]:(I(),R)[n++>>>0],rN.push(a)}return(t?as[t]:ai[e])(...rN)}var rR=()=>{el=0};function rB(e){e>>>=0,o?postMessage({Uc:"cleanupThread",Qd:e}):eN(ek[e])}function rM(e){}var rF=e=>{try{e()}catch(e){W(e)}};function rj(e){var t=(...t)=>{rq.push(e);try{return e(...t)}finally{$||(rq.pop(),rV&&1===rL&&0===rq.length&&(rL=0,el+=1,rF(o7),"u">typeof Fibers&&Fibers.ce()))}};return rW.set(e,t),t}var rL=0,rV=null,rU=0,rq=[],rG=new Map,rH=new Map,rW=new Map,rK=0,rX=null,rZ=[],rQ=e=>(function(e){if(!$){if(0===rL){var t=!1,n=!1;e((e=0)=>{if(!$&&(rU=e,t=!0,n)){rL=2,rF(()=>o9(rV)),"u">typeof MainLoop&&MainLoop.yd&&MainLoop.resume(),e=!1;try{var i=function(){var e=(I(),k)[rV+8>>>2>>>0];return e=rH.get(e),e=rW.get(e),--el,e()}()}catch(t){i=t,e=!0}var o=!1;if(!rV){var a=rX;a&&(rX=null,(e?a.reject:a.resolve)(i),o=!0)}if(e&&!o)throw i}}),n=!0,t||(rL=1,rV=function(){var e=iV(65548),t=e+12;if((I(),C)[e>>>2>>>0]=t,(I(),C)[e+4>>>2>>>0]=t+65536,t=rq[0],!rG.has(t)){var n=rK++;rG.set(t,n),rH.set(n,t)}return t=rG.get(t),(I(),k)[e+8>>>2>>>0]=t,e}(),"u">typeof MainLoop&&MainLoop.yd&&MainLoop.pause(),rF(()=>o5(rV)))}else 2===rL?(rL=0,rF(ae),iL(rV),rV=null,rZ.forEach(r$)):W(`invalid state: ${rL}`);return rU}})(t=>{e().then(t)});function rJ(e){return e>>>=0,rQ(async()=>tX(await tK(e)))}var rY=[],r1=e=>{var t=rY.length;return rY.push(e),t},r2=(e,t)=>{for(var n=Array(e),i=0;i<e;++i){var o=i,a=(I(),C)[t+4*i>>>2>>>0],s=tM[a];if(void 0===s)throw e=`parameter ${i}`,t=tR(a=iM(a)),iL(a),new tj(`${e} has unknown type ${t}`);n[o]=s}return n},r3=(e,t,n)=>{var i=[];return e=e(i,n),i.length&&((I(),C)[t>>>2>>>0]=tX(i)),e},r4={},r6=e=>{var t=r4[e];return void 0===t?tR(e):t};function r8(e,t,n){var[i,...o]=r2(e,t>>>0);t=i.Xc.bind(i);var a=o.map(e=>e.Wc.bind(e));e--;var s={toValue:tK};switch(e=a.map((e,t)=>{var n=`argFromPtr${t}`;return s[n]=e,`${n}(args${t?"+"+8*t:""})`}),n){case 0:var u="toValue(handle)";break;case 2:u="new (toValue(handle))";break;case 3:u="";break;case 1:s.getStringOrSymbol=r6,u="toValue(handle)[getStringOrSymbol(methodName)]"}return u+=`(${e})`,i.Cd||(s.toReturnWire=t,s.emval_returnValue=r3,u=`return emval_returnValue(toReturnWire, destructorsRef, ${u})`),u=`return function (handle, methodName, destructorsRef, args) {
  ${u}
  }`,r1(Object.defineProperty(n=Function(Object.keys(s),u)(...Object.values(s)),"name",{value:u=`methodCaller<(${o.map(e=>e.name)}) => ${i.name}>`}))}function r5(e,t){return t>>>=0,(e=tK(e>>>0))==tK(t)}function r7(e){return(e>>>=0)?(e=r6(e),tX(globalThis[e])):tX(globalThis)}function r9(e){return tX(t[e=r6(e>>>0)])}function ne(e,t){return t>>>=0,tX((e=tK(e>>>0))[t=tK(t)])}function nr(e){9<(e>>>=0)&&(tH[e+1]+=1)}function nn(e,t,n,i,o){return rY[e>>>0](t>>>0,n>>>0,i>>>0,o>>>0)}function ni(e,t,n,i,o){return nn(e>>>0,t>>>0,n>>>0,i>>>0,o>>>0)}function nd(){return tX([])}function np(e){e=tK(e>>>0);for(var t=Array(e.length),n=0;n<e.length;n++)t[n]=e[n];return tX(t)}function n$(e){return tX(r6(e>>>0))}function nT(){return tX({})}function nS(e){for(var t=tK(e>>>=0);t.length;){var n=t.pop();t.pop()(n)}tW(e)}function nk(e,t,n){t>>>=0,n>>>=0,e=tK(e>>>0),t=tK(t),n=tK(n),e[t]=n}function nN(e,t){e=-0x20000000000000>e||0x20000000000000<e?NaN:Number(e),t>>>=0,e=new Date(1e3*e),(I(),k)[t>>>2>>>0]=e.getUTCSeconds(),(I(),k)[t+4>>>2>>>0]=e.getUTCMinutes(),(I(),k)[t+8>>>2>>>0]=e.getUTCHours(),(I(),k)[t+12>>>2>>>0]=e.getUTCDate(),(I(),k)[t+16>>>2>>>0]=e.getUTCMonth(),(I(),k)[t+20>>>2>>>0]=e.getUTCFullYear()-1900,(I(),k)[t+24>>>2>>>0]=e.getUTCDay(),e=(e.getTime()-Date.UTC(e.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(I(),k)[t+28>>>2>>>0]=e}var nz=e=>e%4==0&&(e%100!=0||e%400==0),nR=[0,31,60,91,121,152,182,213,244,274,305,335],nB=[0,31,59,90,120,151,181,212,243,273,304,334];function nM(e,t){e=-0x20000000000000>e||0x20000000000000<e?NaN:Number(e),t>>>=0,e=new Date(1e3*e),(I(),k)[t>>>2>>>0]=e.getSeconds(),(I(),k)[t+4>>>2>>>0]=e.getMinutes(),(I(),k)[t+8>>>2>>>0]=e.getHours(),(I(),k)[t+12>>>2>>>0]=e.getDate(),(I(),k)[t+16>>>2>>>0]=e.getMonth(),(I(),k)[t+20>>>2>>>0]=e.getFullYear()-1900,(I(),k)[t+24>>>2>>>0]=e.getDay();var n=(nz(e.getFullYear())?nR:nB)[e.getMonth()]+e.getDate()-1|0;(I(),k)[t+28>>>2>>>0]=n,(I(),k)[t+36>>>2>>>0]=-60*e.getTimezoneOffset(),n=new Date(e.getFullYear(),6,1).getTimezoneOffset();var i=new Date(e.getFullYear(),0,1).getTimezoneOffset();e=0|(n!=i&&e.getTimezoneOffset()==Math.min(i,n)),(I(),k)[t+32>>>2>>>0]=e}function nF(e){e>>>=0;var t=new Date((I(),k)[e+20>>>2>>>0]+1900,(I(),k)[e+16>>>2>>>0],(I(),k)[e+12>>>2>>>0],(I(),k)[e+8>>>2>>>0],(I(),k)[e+4>>>2>>>0],(I(),k)[e>>>2>>>0],0),n=(I(),k)[e+32>>>2>>>0],i=t.getTimezoneOffset(),o=new Date(t.getFullYear(),6,1).getTimezoneOffset(),a=new Date(t.getFullYear(),0,1).getTimezoneOffset(),s=Math.min(a,o);return 0>n?(I(),k)[e+32>>>2>>>0]=+(o!=a&&s==i):0<n!=(s==i)&&(o=Math.max(a,o),t.setTime(t.getTime()+6e4*((0<n?s:o)-i))),(I(),k)[e+24>>>2>>>0]=t.getDay(),n=(nz(t.getFullYear())?nR:nB)[t.getMonth()]+t.getDate()-1|0,(I(),k)[e+28>>>2>>>0]=n,(I(),k)[e>>>2>>>0]=t.getSeconds(),(I(),k)[e+4>>>2>>>0]=t.getMinutes(),(I(),k)[e+8>>>2>>>0]=t.getHours(),(I(),k)[e+12>>>2>>>0]=t.getDate(),(I(),k)[e+16>>>2>>>0]=t.getMonth(),(I(),k)[e+20>>>2>>>0]=t.getYear(),BigInt(isNaN(e=t.getTime())?-1:e/1e3)}function nj(e,t,n,i,a,s,u){return o?ed(16,1,e,t,n,i,a,s,u):-52}function nL(e,t,n,i,a,s){if(o)return ed(17,1,e,t,n,i,a,s)}var nV={},nU=()=>performance.timeOrigin+performance.now();function nq(e,t){if(o)return ed(18,1,e,t);if(nV[e]&&(clearTimeout(nV[e].id),delete nV[e]),!t)return 0;var n=setTimeout(()=>{delete nV[e],r$(()=>iK(e,performance.timeOrigin+performance.now()))},t);return nV[e]={id:n,be:t},0}function nG(e,t,n,i){e>>>=0,t>>>=0,n>>>=0,i>>>=0;var o=new Date().getFullYear(),a=new Date(o,0,1).getTimezoneOffset(),s=Math.max(a,o=new Date(o,6,1).getTimezoneOffset());(I(),C)[e>>>2>>>0]=60*s,(I(),k)[t>>>2>>>0]=+(a!=o),e=(t=e=>{var t=Math.abs(e);return`UTC${0<=e?"-":"+"}${String(Math.floor(t/60)).padStart(2,"0")}${String(t%60).padStart(2,"0")}`})(a),t=t(o),o<a?(t6(e,n,17),t6(t,i,17)):(t6(e,i,17),t6(t,n,17))}var nH=()=>Date.now(),nW=1;function nK(e,t,n){if(n>>>=0,!(0<=e&&3>=e))return 28;if(0===e)e=Date.now();else{if(!nW)return 52;e=performance.timeOrigin+performance.now()}return e=Math.round(1e6*e),(I(),B)[n>>>3>>>0]=BigInt(e),0}var nX=[],nZ=(e,t)=>{nX.length=0;for(var n;n=(I(),E)[e++>>>0];){var i=105!=n;t+=(i&=112!=n)&&t%8?4:0,nX.push(112==n?(I(),C)[t>>>2>>>0]:106==n?(I(),B)[t>>>3>>>0]:105==n?(I(),k)[t>>>2>>>0]:(I(),R)[t>>>3>>>0]),t+=i?8:4}return nX};function nQ(e,t,n){return e>>>=0,t=nZ(t>>>0,n>>>0),as[e](...t)}function nJ(e,t,n){return e>>>=0,t=nZ(t>>>0,n>>>0),as[e](...t)}var nY=()=>{};function n1(e,t){return w(e9(e>>>0,t>>>0))}var n2=()=>{throw el+=1,"unwind"};function n4(){return 0xffff0000}var n6=()=>navigator.hardwareConcurrency,n8={},n5=e=>{var t;return(t=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e))?+t[1]:(t=/:(\d+):\d+(?:\)|$)/.exec(e))?0x80000000|t[1]:0},n7=e=>{for(var t of e)(e=n5(t))&&(n8[e]=t)};function n9(){var e=Error().stack.toString().split(`
`);return"Error"==e[0]&&e.shift(),n7(e),n8.sd=n5(e[3]),n8.Md=e,n8.sd}function ie(e){if(!(e=n8[e>>>0]))return 0;if(t=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e))e=t[1];else if(t=/^\s+at (.*) \(.*\)$/.exec(e))e=t[1];else{if(!(t=/^(.+?)@/.exec(e)))return 0;e=t[1]}iL(ie.td??0),t=t8(e)+1;var t,n=iV(t);return n&&t6(e,n,t),ie.td=n,ie.td}function ir(e){e>>>=0;var t=(I(),E).length;if(e<=t||0xffff0000<e)return!1;for(var n=1;4>=n;n*=2){var i=t*(1+.2/n);i=Math.min(i,e+0x6000000);e:{i=(Math.min(0xffff0000,65536*Math.ceil(Math.max(e,i)/65536))-eM.buffer.byteLength+65535)/65536|0;try{eM.grow(i),q();var o=1;break e}catch{}o=void 0}if(o)return!0}return!1}function ii(e,t,n){if(e>>>=0,t>>>=0,n8.sd==e)var i=n8.Md;else"Error"==(i=Error().stack.toString().split(`
`))[0]&&i.shift(),n7(i);for(var o=3;i[o]&&n5(i[o])!=e;)++o;for(e=0;e<n&&i[e+o];++e)(I(),k)[t+4*e>>>2>>>0]=n5(i[e+o]);return e}var iu,id={},ip=()=>{if(!iu){var e,t={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(e in id)void 0===id[e]?delete t[e]:t[e]=id[e];var n=[];for(e in t)n.push(`${e}=${t[e]}`);iu=n}return iu};function i$(e,t){if(o)return ed(19,1,e,t);e>>>=0,t>>>=0;var n,i=0,a=0;for(n of ip()){var s=t+i;(I(),C)[e+a>>>2>>>0]=s,i+=t6(n,s,1/0)+1,a+=4}return 0}function iT(e,t){if(o)return ed(20,1,e,t);e>>>=0,t>>>=0;var n=ip();for(var i of((I(),C)[e>>>2>>>0]=n.length,e=0,n))e+=t8(i)+1;return(I(),C)[t>>>2>>>0]=e,0}function iS(e){return o?ed(21,1,e):52}function ik(e,t,n,i){return o?ed(22,1,e,t,n,i):52}function iN(e,t,n,i){return o?ed(23,1,e,t,n,i):70}var iz=[null,[],[]];function iR(e,t,n,i){if(o)return ed(24,1,e,t,n,i);t>>>=0,n>>>=0,i>>>=0;for(var a=0,s=0;s<n;s++){var u=(I(),C)[t>>>2>>>0],l=(I(),C)[t+4>>>2>>>0];t+=8;for(var d=0;d<l;d++){var p=e,c=(I(),E)[u+d>>>0],h=iz[p];0===c||10===c?((1===p?x:w)(e7(h)),h.length=0):h.push(c)}a+=l}return(I(),C)[i>>>2>>>0]=a,0}function iB(e){return e>>>0}o||function(){for(var e=t.numThreads-1;e--;)eB();ee.push(async()=>{var e=async function(){if(!o)return Promise.all(eT.map(eR))}();et++,await e,0==--et&&en&&(e=en,en=null,e())})}(),o||(eM=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),q()),t.wasmBinary&&(h=t.wasmBinary),t.stackSave=()=>i2(),t.stackRestore=e=>iY(e),t.stackAlloc=e=>i1(e),t.setValue=function(e,t,n="i8"){switch(n.endsWith("*")&&(n="*"),n){case"i1":case"i8":(I(),O)[e>>>0]=t;break;case"i16":(I(),A)[e>>>1>>>0]=t;break;case"i32":(I(),k)[e>>>2>>>0]=t;break;case"i64":(I(),B)[e>>>3>>>0]=BigInt(t);break;case"float":(I(),z)[e>>>2>>>0]=t;break;case"double":(I(),R)[e>>>3>>>0]=t;break;case"*":(I(),C)[e>>>2>>>0]=t;break;default:W(`invalid type for setValue: ${n}`)}},t.getValue=function(e,t="i8"){switch(t.endsWith("*")&&(t="*"),t){case"i1":case"i8":return(I(),O)[e>>>0];case"i16":return(I(),A)[e>>>1>>>0];case"i32":return(I(),k)[e>>>2>>>0];case"i64":return(I(),B)[e>>>3>>>0];case"float":return(I(),z)[e>>>2>>>0];case"double":return(I(),R)[e>>>3>>>0];case"*":return(I(),C)[e>>>2>>>0];default:W(`invalid type for getValue: ${t}`)}},t.UTF8ToString=e9,t.stringToUTF8=t6,t.lengthBytesUTF8=t8;var iM,iF,ij,iL,iV,iU,iq,iG,iH,iW,iK,iX,iZ,iQ,iJ,iY,i1,i2,i4,i6,i8,i5,i7,i9,or,on,oi,od,op,oh,o$,oT,oS,ok,oN,oz,oR,oB,oM,oF,oj,oL,oV,oU,oq,oG,oH,oW,oK,oX,oZ,oQ,oJ,oY,o1,o2,o3,o4,o6,o8,o5,o7,o9,ae,an,ai=[ep,eh,e2,tt,tr,tn,ti,tu,td,tp,tm,t$,tT,tS,tk,tN,nj,nL,nq,i$,iT,iS,ik,iN,iR],as={929356:(e,n,i,o,a)=>{if(void 0===t||!t.Zc)return 1;if((e=e9(Number(e>>>0))).startsWith("./")&&(e=e.substring(2)),!(e=t.Zc.get(e)))return 2;if(n=Number(n>>>0),i=Number(i>>>0),o=Number(o>>>0),n+i>e.byteLength)return 3;try{let s=e.subarray(n,n+i);switch(a){case 0:(I(),E).set(s,o>>>0);break;case 1:t.Xd?t.Xd(o,s):t.Ld(o,s);break;default:return 4}return 0}catch{return 4}},930180:(e,n,i)=>{t.xd(e,(I(),E).subarray(n>>>0,n+i>>>0))},930244:()=>t.Zd(),930286:e=>{t.vd(e)},930323:()=>{t.Ed()},930354:()=>{t.Fd()},930383:()=>{t.Jd()},930408:e=>t.Dd(e),930441:e=>t.Hd(e),930473:(e,n,i)=>{t.jd(Number(e),Number(n),Number(i),!0)},930536:(e,n,i)=>{t.jd(Number(e),Number(n),Number(i))},930593:()=>"u">typeof wasmOffsetConverter,930650:e=>{t.ac("Abs",e,void 0)},930701:e=>{t.ac("Neg",e,void 0)},930752:e=>{t.ac("Floor",e,void 0)},930805:e=>{t.ac("Ceil",e,void 0)},930857:e=>{t.ac("Reciprocal",e,void 0)},930915:e=>{t.ac("Sqrt",e,void 0)},930967:e=>{t.ac("Exp",e,void 0)},931018:e=>{t.ac("Erf",e,void 0)},931069:e=>{t.ac("Sigmoid",e,void 0)},931124:(e,n,i)=>{t.ac("HardSigmoid",e,{alpha:n,beta:i})},931203:e=>{t.ac("Log",e,void 0)},931254:e=>{t.ac("Sin",e,void 0)},931305:e=>{t.ac("Cos",e,void 0)},931356:e=>{t.ac("Tan",e,void 0)},931407:e=>{t.ac("Asin",e,void 0)},931459:e=>{t.ac("Acos",e,void 0)},931511:e=>{t.ac("Atan",e,void 0)},931563:e=>{t.ac("Sinh",e,void 0)},931615:e=>{t.ac("Cosh",e,void 0)},931667:e=>{t.ac("Asinh",e,void 0)},931720:e=>{t.ac("Acosh",e,void 0)},931773:e=>{t.ac("Atanh",e,void 0)},931826:e=>{t.ac("Tanh",e,void 0)},931878:e=>{t.ac("Not",e,void 0)},931929:(e,n,i)=>{t.ac("Clip",e,{min:n,max:i})},931998:e=>{t.ac("Clip",e,void 0)},932050:(e,n)=>{t.ac("Elu",e,{alpha:n})},932108:e=>{t.ac("Gelu",e,void 0)},932160:e=>{t.ac("Relu",e,void 0)},932212:(e,n)=>{t.ac("LeakyRelu",e,{alpha:n})},932276:(e,n)=>{t.ac("ThresholdedRelu",e,{alpha:n})},932346:(e,n)=>{t.ac("Cast",e,{to:n})},932404:e=>{t.ac("Add",e,void 0)},932455:e=>{t.ac("Sub",e,void 0)},932506:e=>{t.ac("Mul",e,void 0)},932557:e=>{t.ac("Div",e,void 0)},932608:e=>{t.ac("Pow",e,void 0)},932659:e=>{t.ac("Equal",e,void 0)},932712:e=>{t.ac("Greater",e,void 0)},932767:e=>{t.ac("GreaterOrEqual",e,void 0)},932829:e=>{t.ac("Less",e,void 0)},932881:e=>{t.ac("LessOrEqual",e,void 0)},932940:(e,n,i,o,a)=>{t.ac("ReduceMean",e,{keepDims:!!n,noopWithEmptyAxes:!!i,axes:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[]})},933115:(e,n,i,o,a)=>{t.ac("ReduceMax",e,{keepDims:!!n,noopWithEmptyAxes:!!i,axes:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[]})},933289:(e,n,i,o,a)=>{t.ac("ReduceMin",e,{keepDims:!!n,noopWithEmptyAxes:!!i,axes:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[]})},933463:(e,n,i,o,a)=>{t.ac("ReduceProd",e,{keepDims:!!n,noopWithEmptyAxes:!!i,axes:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[]})},933638:(e,n,i,o,a)=>{t.ac("ReduceSum",e,{keepDims:!!n,noopWithEmptyAxes:!!i,axes:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[]})},933812:(e,n,i,o,a)=>{t.ac("ReduceL1",e,{keepDims:!!n,noopWithEmptyAxes:!!i,axes:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[]})},933985:(e,n,i,o,a)=>{t.ac("ReduceL2",e,{keepDims:!!n,noopWithEmptyAxes:!!i,axes:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[]})},934158:(e,n,i,o,a)=>{t.ac("ReduceLogSum",e,{keepDims:!!n,noopWithEmptyAxes:!!i,axes:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[]})},934335:(e,n,i,o,a)=>{t.ac("ReduceSumSquare",e,{keepDims:!!n,noopWithEmptyAxes:!!i,axes:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[]})},934515:(e,n,i,o,a)=>{t.ac("ReduceLogSumExp",e,{keepDims:!!n,noopWithEmptyAxes:!!i,axes:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[]})},934695:e=>{t.ac("Where",e,void 0)},934748:(e,n,i)=>{t.ac("Transpose",e,{perm:n?Array.from((I(),k).subarray(Number(n)>>>0,Number(i)>>>0)):[]})},934872:(e,n,i,o)=>{t.ac("DepthToSpace",e,{blocksize:n,mode:e9(i),format:o?"NHWC":"NCHW"})},935005:(e,n,i,o)=>{t.ac("DepthToSpace",e,{blocksize:n,mode:e9(i),format:o?"NHWC":"NCHW"})},935138:(e,n,i,o,a,s,u,l,d,p,c,h,f,m,g)=>{t.ac("ConvTranspose",e,{format:d?"NHWC":"NCHW",autoPad:n,dilations:[i],group:o,kernelShape:[a],pads:[s,u],strides:[l],wIsConst:()=>!!(I(),O)[p>>>0],outputPadding:c?Array.from((I(),k).subarray(Number(c)>>>0,Number(h)>>>0)):[],outputShape:f?Array.from((I(),k).subarray(Number(f)>>>0,Number(m)>>>0)):[],activation:e9(g)})},935571:(e,n,i,o,a,s,u,l,d,p,c,h,f,m)=>{t.ac("ConvTranspose",e,{format:l?"NHWC":"NCHW",autoPad:n,dilations:Array.from((I(),k).subarray(Number(i)>>>0,2+(Number(i)>>>0)>>>0)),group:o,kernelShape:Array.from((I(),k).subarray(Number(a)>>>0,2+(Number(a)>>>0)>>>0)),pads:Array.from((I(),k).subarray(Number(s)>>>0,4+(Number(s)>>>0)>>>0)),strides:Array.from((I(),k).subarray(Number(u)>>>0,2+(Number(u)>>>0)>>>0)),wIsConst:()=>!!(I(),O)[d>>>0],outputPadding:p?Array.from((I(),k).subarray(Number(p)>>>0,Number(c)>>>0)):[],outputShape:h?Array.from((I(),k).subarray(Number(h)>>>0,Number(f)>>>0)):[],activation:e9(m)})},936232:(e,n,i,o,a,s,u,l,d,p,c,h,f,m,g)=>{t.ac("ConvTranspose",e,{format:d?"NHWC":"NCHW",autoPad:n,dilations:[i],group:o,kernelShape:[a],pads:[s,u],strides:[l],wIsConst:()=>!!(I(),O)[p>>>0],outputPadding:c?Array.from((I(),k).subarray(Number(c)>>>0,Number(h)>>>0)):[],outputShape:f?Array.from((I(),k).subarray(Number(f)>>>0,Number(m)>>>0)):[],activation:e9(g)})},936665:(e,n,i,o,a,s,u,l,d,p,c,h,f,m)=>{t.ac("ConvTranspose",e,{format:l?"NHWC":"NCHW",autoPad:n,dilations:Array.from((I(),k).subarray(Number(i)>>>0,2+(Number(i)>>>0)>>>0)),group:o,kernelShape:Array.from((I(),k).subarray(Number(a)>>>0,2+(Number(a)>>>0)>>>0)),pads:Array.from((I(),k).subarray(Number(s)>>>0,4+(Number(s)>>>0)>>>0)),strides:Array.from((I(),k).subarray(Number(u)>>>0,2+(Number(u)>>>0)>>>0)),wIsConst:()=>!!(I(),O)[d>>>0],outputPadding:p?Array.from((I(),k).subarray(Number(p)>>>0,Number(c)>>>0)):[],outputShape:h?Array.from((I(),k).subarray(Number(h)>>>0,Number(f)>>>0)):[],activation:e9(m)})},937326:(e,n)=>{t.ac("GlobalAveragePool",e,{format:n?"NHWC":"NCHW"})},937417:(e,n,i,o,a,s,u,l,d,p,c,h,f,m)=>{t.ac("AveragePool",e,{format:m?"NHWC":"NCHW",auto_pad:n,ceil_mode:i,count_include_pad:o,storage_order:a,dilations:s?Array.from((I(),k).subarray(Number(s)>>>0,Number(u)>>>0)):[],kernel_shape:l?Array.from((I(),k).subarray(Number(l)>>>0,Number(d)>>>0)):[],pads:p?Array.from((I(),k).subarray(Number(p)>>>0,Number(c)>>>0)):[],strides:h?Array.from((I(),k).subarray(Number(h)>>>0,Number(f)>>>0)):[]})},937896:(e,n)=>{t.ac("GlobalAveragePool",e,{format:n?"NHWC":"NCHW"})},937987:(e,n,i,o,a,s,u,l,d,p,c,h,f,m)=>{t.ac("AveragePool",e,{format:m?"NHWC":"NCHW",auto_pad:n,ceil_mode:i,count_include_pad:o,storage_order:a,dilations:s?Array.from((I(),k).subarray(Number(s)>>>0,Number(u)>>>0)):[],kernel_shape:l?Array.from((I(),k).subarray(Number(l)>>>0,Number(d)>>>0)):[],pads:p?Array.from((I(),k).subarray(Number(p)>>>0,Number(c)>>>0)):[],strides:h?Array.from((I(),k).subarray(Number(h)>>>0,Number(f)>>>0)):[]})},938466:(e,n)=>{t.ac("GlobalMaxPool",e,{format:n?"NHWC":"NCHW"})},938553:(e,n,i,o,a,s,u,l,d,p,c,h,f,m)=>{t.ac("MaxPool",e,{format:m?"NHWC":"NCHW",auto_pad:n,ceil_mode:i,count_include_pad:o,storage_order:a,dilations:s?Array.from((I(),k).subarray(Number(s)>>>0,Number(u)>>>0)):[],kernel_shape:l?Array.from((I(),k).subarray(Number(l)>>>0,Number(d)>>>0)):[],pads:p?Array.from((I(),k).subarray(Number(p)>>>0,Number(c)>>>0)):[],strides:h?Array.from((I(),k).subarray(Number(h)>>>0,Number(f)>>>0)):[]})},939028:(e,n)=>{t.ac("GlobalMaxPool",e,{format:n?"NHWC":"NCHW"})},939115:(e,n,i,o,a,s,u,l,d,p,c,h,f,m)=>{t.ac("MaxPool",e,{format:m?"NHWC":"NCHW",auto_pad:n,ceil_mode:i,count_include_pad:o,storage_order:a,dilations:s?Array.from((I(),k).subarray(Number(s)>>>0,Number(u)>>>0)):[],kernel_shape:l?Array.from((I(),k).subarray(Number(l)>>>0,Number(d)>>>0)):[],pads:p?Array.from((I(),k).subarray(Number(p)>>>0,Number(c)>>>0)):[],strides:h?Array.from((I(),k).subarray(Number(h)>>>0,Number(f)>>>0)):[]})},939590:(e,n,i,o,a)=>{t.ac("Gemm",e,{alpha:n,beta:i,transA:o,transB:a})},939694:e=>{t.ac("MatMul",e,void 0)},939748:(e,n,i,o)=>{t.ac("ArgMax",e,{keepDims:!!n,selectLastIndex:!!i,axis:o})},939856:(e,n,i,o)=>{t.ac("ArgMin",e,{keepDims:!!n,selectLastIndex:!!i,axis:o})},939964:(e,n)=>{t.ac("Softmax",e,{axis:n})},940027:(e,n)=>{t.ac("Concat",e,{axis:n})},940087:(e,n,i,o,a)=>{t.ac("Split",e,{axis:n,numOutputs:i,splitSizes:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[]})},940243:e=>{t.ac("Expand",e,void 0)},940297:(e,n)=>{t.ac("Gather",e,{axis:Number(n)})},940368:(e,n)=>{t.ac("GatherElements",e,{axis:Number(n)})},940447:(e,n)=>{t.ac("GatherND",e,{batch_dims:Number(n)})},940526:(e,n,i,o,a,s,u,l,d,p,c)=>{t.ac("Resize",e,{antialias:n,axes:i?Array.from((I(),k).subarray(Number(i)>>>0,Number(o)>>>0)):[],coordinateTransformMode:e9(a),cubicCoeffA:s,excludeOutside:u,extrapolationValue:l,keepAspectRatioPolicy:e9(d),mode:e9(p),nearestMode:e9(c)})},940888:(e,n,i,o,a,s,u)=>{t.ac("Slice",e,{starts:n?Array.from((I(),k).subarray(Number(n)>>>0,Number(i)>>>0)):[],ends:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[],axes:s?Array.from((I(),k).subarray(Number(s)>>>0,Number(u)>>>0)):[]})},941152:e=>{t.ac("Tile",e,void 0)},941204:(e,n,i)=>{t.ac("InstanceNormalization",e,{epsilon:n,format:i?"NHWC":"NCHW"})},941318:(e,n,i)=>{t.ac("InstanceNormalization",e,{epsilon:n,format:i?"NHWC":"NCHW"})},941432:e=>{t.ac("Range",e,void 0)},941485:(e,n)=>{t.ac("Einsum",e,{equation:e9(n)})},941566:(e,n,i,o,a)=>{t.ac("Pad",e,{mode:n,value:i,pads:o?Array.from((I(),k).subarray(Number(o)>>>0,Number(a)>>>0)):[]})},941709:(e,n,i,o,a,s)=>{t.ac("BatchNormalization",e,{epsilon:n,momentum:i,spatial:!!a,trainingMode:!!o,format:s?"NHWC":"NCHW"})},941878:(e,n,i,o,a,s)=>{t.ac("BatchNormalization",e,{epsilon:n,momentum:i,spatial:!!a,trainingMode:!!o,format:s?"NHWC":"NCHW"})},942047:(e,n,i)=>{t.ac("CumSum",e,{exclusive:Number(n),reverse:Number(i)})},942144:(e,n,i)=>{t.ac("DequantizeLinear",e,{axis:n,blockSize:i})},942234:(e,n,i,o,a)=>{t.ac("GridSample",e,{align_corners:n,mode:e9(i),padding_mode:e9(o),format:a?"NHWC":"NCHW"})},942404:(e,n,i,o,a)=>{t.ac("GridSample",e,{align_corners:n,mode:e9(i),padding_mode:e9(o),format:a?"NHWC":"NCHW"})},942574:(e,n)=>{t.ac("ScatterND",e,{reduction:e9(n)})},942659:(e,n,i,o,a,s,u,l,d)=>{t.ac("Attention",e,{numHeads:n,isUnidirectional:i,maskFilterValue:o,scale:a,doRotary:s,qkvHiddenSizes:u?Array.from((I(),k).subarray(Number(l)>>>0,Number(l)+u>>>0)):[],pastPresentShareBuffer:!!d})},942931:e=>{t.ac("BiasAdd",e,void 0)},942986:e=>{t.ac("BiasSplitGelu",e,void 0)},943047:e=>{t.ac("FastGelu",e,void 0)},943103:(e,n,i,o,a,s,u,l,d,p,c,h,f,m,g,b)=>{t.ac("Conv",e,{format:h?"NHWC":"NCHW",auto_pad:n,dilations:i?Array.from((I(),k).subarray(Number(i)>>>0,Number(o)>>>0)):[],group:a,kernel_shape:s?Array.from((I(),k).subarray(Number(s)>>>0,Number(u)>>>0)):[],pads:l?Array.from((I(),k).subarray(Number(l)>>>0,Number(d)>>>0)):[],strides:p?Array.from((I(),k).subarray(Number(p)>>>0,Number(c)>>>0)):[],w_is_const:()=>!!(I(),O)[Number(f)>>>0],activation:e9(m),activation_params:g?Array.from((I(),z).subarray(Number(g)>>>0,Number(b)>>>0)):[]})},943687:e=>{t.ac("Gelu",e,void 0)},943739:(e,n,i,o,a,s,u,l,d)=>{t.ac("GroupQueryAttention",e,{numHeads:n,kvNumHeads:i,scale:o,softcap:a,doRotary:s,rotaryInterleaved:u,smoothSoftmax:l,localWindowSize:d})},943956:(e,n,i,o)=>{t.ac("LayerNormalization",e,{axis:n,epsilon:i,simplified:!!o})},944067:(e,n,i,o)=>{t.ac("LayerNormalization",e,{axis:n,epsilon:i,simplified:!!o})},944178:(e,n,i,o,a,s)=>{t.ac("MatMulNBits",e,{k:n,n:i,accuracyLevel:o,bits:a,blockSize:s})},944305:(e,n,i,o,a,s)=>{t.ac("MultiHeadAttention",e,{numHeads:n,isUnidirectional:i,maskFilterValue:o,scale:a,doRotary:s})},944464:(e,n)=>{t.ac("QuickGelu",e,{alpha:n})},944528:(e,n,i,o,a)=>{t.ac("RotaryEmbedding",e,{interleaved:!!n,numHeads:i,rotaryEmbeddingDim:o,scale:a})},944667:(e,n,i)=>{t.ac("SkipLayerNormalization",e,{epsilon:n,simplified:!!i})},944769:(e,n,i)=>{t.ac("SkipLayerNormalization",e,{epsilon:n,simplified:!!i})},944871:(e,n,i,o)=>{t.ac("GatherBlockQuantized",e,{gatherAxis:n,quantizeAxis:i,blockSize:o})},944992:e=>{t.Id(e)},945026:(e,n)=>t.Kd(Number(e),Number(n),t.$c.Nd,t.$c.errors)};function al(e,n,i){return rQ(async()=>{await t.Gd(Number(e),Number(n),Number(i))})}function ad(){return"u">typeof wasmOffsetConverter}function ap(e,t,n,i){var o=i2();try{return oT(e,t,n,i)}catch(e){if(iY(o),e!==e+0)throw e;iZ(1,0)}}function ah(e,t,n){var i=i2();try{return od(e,t,n)}catch(e){if(iY(i),e!==e+0)throw e;iZ(1,0)}}function a$(e,t,n){var i=i2();try{i7(e,t,n)}catch(e){if(iY(i),e!==e+0)throw e;iZ(1,0)}}function aT(e,t){var n=i2();try{return i9(e,t)}catch(e){if(iY(n),e!==e+0)throw e;iZ(1,0)}}function aS(e){var t=i2();try{or(e)}catch(e){if(iY(t),e!==e+0)throw e;iZ(1,0)}}function ak(e,t,n,i,o,a,s){var u=i2();try{return oh(e,t,n,i,o,a,s)}catch(e){if(iY(u),e!==e+0)throw e;iZ(1,0)}}function aN(e,t){var n=i2();try{oS(e,t)}catch(e){if(iY(n),e!==e+0)throw e;iZ(1,0)}}function az(e,t,n,i,o,a){var s=i2();try{on(e,t,n,i,o,a)}catch(e){if(iY(s),e!==e+0)throw e;iZ(1,0)}}function aR(e,t,n,i){var o=i2();try{o$(e,t,n,i)}catch(e){if(iY(o),e!==e+0)throw e;iZ(1,0)}}function aB(e,t,n,i,o){var a=i2();try{oi(e,t,n,i,o)}catch(e){if(iY(a),e!==e+0)throw e;iZ(1,0)}}function aM(e,t,n,i,o,a,s){var u=i2();try{oN(e,t,n,i,o,a,s)}catch(e){if(iY(u),e!==e+0)throw e;iZ(1,0)}}function aF(e,t,n,i,o,a,s){var u=i2();try{oz(e,t,n,i,o,a,s)}catch(e){if(iY(u),e!==e+0)throw e;iZ(1,0)}}function aj(e,t,n,i,o,a,s,u){var l=i2();try{oF(e,t,n,i,o,a,s,u)}catch(e){if(iY(l),e!==e+0)throw e;iZ(1,0)}}function aL(e,t,n,i,o){var a=i2();try{return ok(e,t,n,i,o)}catch(e){if(iY(a),e!==e+0)throw e;iZ(1,0)}}function aV(e,t,n,i,o,a,s,u){var l=i2();try{oj(e,t,n,i,o,a,s,u)}catch(e){if(iY(l),e!==e+0)throw e;iZ(1,0)}}function aU(e,t,n,i,o,a,s,u,l,d,p,c){var h=i2();try{oR(e,t,n,i,o,a,s,u,l,d,p,c)}catch(e){if(iY(h),e!==e+0)throw e;iZ(1,0)}}function aq(e,t,n,i,o,a){var s=i2();try{return oB(e,t,n,i,o,a)}catch(e){if(iY(s),e!==e+0)throw e;iZ(1,0)}}function aG(e,t,n){var i=i2();try{return oL(e,t,n)}catch(e){if(iY(i),e!==e+0)throw e;return iZ(1,0),0n}}function aH(e,t,n,i,o,a,s,u,l){var d=i2();try{op(e,t,n,i,o,a,s,u,l)}catch(e){if(iY(d),e!==e+0)throw e;iZ(1,0)}}function aW(e){var t=i2();try{return oV(e)}catch(e){if(iY(t),e!==e+0)throw e;iZ(1,0)}}function aK(e,t,n){var i=i2();try{return oU(e,t,n)}catch(e){if(iY(i),e!==e+0)throw e;iZ(1,0)}}function aX(e,t){var n=i2();try{return o8(e,t)}catch(e){if(iY(n),e!==e+0)throw e;return iZ(1,0),0n}}function aZ(e,t,n,i,o){var a=i2();try{oq(e,t,n,i,o)}catch(e){if(iY(a),e!==e+0)throw e;iZ(1,0)}}function aQ(e){var t=i2();try{return oG(e)}catch(e){if(iY(t),e!==e+0)throw e;return iZ(1,0),0n}}function aJ(e,t,n,i,o,a){var s=i2();try{return oQ(e,t,n,i,o,a)}catch(e){if(iY(s),e!==e+0)throw e;iZ(1,0)}}function aY(e,t,n,i,o,a){var s=i2();try{return oJ(e,t,n,i,o,a)}catch(e){if(iY(s),e!==e+0)throw e;iZ(1,0)}}function a1(e,t,n,i,o,a,s,u){var l=i2();try{return oM(e,t,n,i,o,a,s,u)}catch(e){if(iY(l),e!==e+0)throw e;iZ(1,0)}}function a2(e,t,n,i,o){var a=i2();try{return oY(e,t,n,i,o)}catch(e){if(iY(a),e!==e+0)throw e;return iZ(1,0),0n}}function a4(e,t,n,i){var o=i2();try{return o1(e,t,n,i)}catch(e){if(iY(o),e!==e+0)throw e;iZ(1,0)}}function a6(e,t,n,i){var o=i2();try{return o2(e,t,n,i)}catch(e){if(iY(o),e!==e+0)throw e;iZ(1,0)}}function a8(e,t,n,i,o,a,s,u,l,d,p,c){var h=i2();try{return o3(e,t,n,i,o,a,s,u,l,d,p,c)}catch(e){if(iY(h),e!==e+0)throw e;iZ(1,0)}}function a5(e,t,n,i,o,a,s,u,l,d,p){var c=i2();try{oX(e,t,n,i,o,a,s,u,l,d,p)}catch(e){if(iY(c),e!==e+0)throw e;iZ(1,0)}}function a7(e,t,n,i,o,a,s,u,l,d,p,c,h,f,m,g){var b=i2();try{oZ(e,t,n,i,o,a,s,u,l,d,p,c,h,f,m,g)}catch(e){if(iY(b),e!==e+0)throw e;iZ(1,0)}}function a9(e,t,n,i){var o=i2();try{return o4(e,t,n,i)}catch(e){if(iY(o),e!==e+0)throw e;iZ(1,0)}}function sn(e,t,n,i,o){var a=i2();try{return o6(e,t,n,i,o)}catch(e){if(iY(a),e!==e+0)throw e;iZ(1,0)}}function si(e,t,n){var i=i2();try{return oH(e,t,n)}catch(e){if(iY(i),e!==e+0)throw e;iZ(1,0)}}function ss(e,t,n){var i=i2();try{return oW(e,t,n)}catch(e){if(iY(i),e!==e+0)throw e;iZ(1,0)}}function su(e,t,n,i){var o=i2();try{oK(e,t,n,i)}catch(e){if(iY(o),e!==e+0)throw e;iZ(1,0)}}function sl(){if(0<et)en=sl;else if(o)g?.(t),G();else{for(var e=ee;0<e.length;)e.shift()(t);0<et?en=sl:(t.calledRun=!0,$||(G(),g?.(t)))}}return o||(an=await Q(),sl()),t.PTR_SIZE=4,V?t:new Promise((e,t)=>{g=e,b=t})}Sr(Yy,{default:()=>n3});var n3,r_,ac,Ot,o_,ic,i3,a3,i_,s3,t_,a_,n_,s_,sc,uc,Ia,u_,u3,l3,c3,ga,Re,Pt,Fo,Oe,l_,d3,p3,f3,$a,h3,d_,yr,Vn,_r,uo,Vo,Aa,Oa,lc,Go,m3,g3,f_,h_,Pa,b3,be,dc,Un,D,Gr,Ea,m_,g_,Ca,y_,hc,__,y3,b_,_3,w_,Da,ka,fc,v_,Na,w3,La,I_,mc,gc,v3,x3,S_,yc,bc,A_,_c,le,Ur,vc,Me,at,U,Pe,xc,Wr,Xt,Z,za,L,F,P_,Ma,wc,E_,T3,C_,I3,S3,$3,A3,st,D_,k_,O3,P3,E3,C3,D3,k3,N3,L3,R3,z3,Wn,N_,L_,R_,z_,M_,B_,F_,V_,G_,U_,Hn,M3,Fa,Tc,qn,B3,F3,V3,G3,U3,W3,H3,q3,j3,K3,jn,H_,q_,j_,K_,X_,Z_,J_,Q_,Y_,e0,t0,n0,r0,Ic,X3,Sc,Z3,J3,Q3,lo,Y3,i0,eE,tE,nE,a0,rE,oE,u0,iE,De,c0,d0,p0,f0,h0,m0,g0,b0,y0,aE,_0,w0,v0,x0,Uo,T0,Ga,I0,S0,$0,A0,O0,P0,E0,C0,D0,k0,N0,L0,R0,z0,M0,B0,F0,V0,$c,Ac,G0,U0,W0,sE,uE,H0,lE,cE,j0,dE,pE,Kn,X0,Z0,J0,Q0,Y0,ew,tw,nw,rw,ow,hE,mE,gE,bE,aw,sw,Zt,Jt,Qt,Wa,ot,lw,cw,Wo,qa,yE,_E,Oc,pw,wE,Pc,vE,Ho,xE,fw,TE,mw,Xa,IE,gw,SE,bw,yw,ww,vw,$E,Ec,AE,Cc,Dc,Tw,OE,PE,kc,Sw,EE,CE,DE,Aw,Ow,kE,Pw,NE,Ew,LE,Dw,kw,RE,zE,ME,Lw,Rw,Nc,Za,Mw,FE,Lc,Rc,Bw,VE,Fw,Vw,GE,Uw,UE,WE,Ww,HE,qw,qE,jE,Kw,Xw,KE,Jw,Qw,XE,ZE,ev,tv,JE,QE,rv,ov,YE,eC,av,sv,er,vr,co,po,tC,nC,rC,oC,iC,aC,sC,uC,lv,cv,Tt,dC,fv,pv,pC,qo,hv,fC,hC,mC,gC,Mc,mv,gv,bC,Ja,bv,yC,_C,yv,wC,_v,vv,vC,xC,xv,TC,IC,Iv,SC,$v,$C,AC,OC,Ov,Pv,PC,EC,CC,DC,kC,NC,LC,RC,Cv,Qa,kv,Nv,Lv,Rv,zC,MC,zv,Mv,Bv,Fv,Vv,Gv,Uv,Wv,Hv,qv,jv,Kv,FC,VC,Zv,Jv,GC,UC,Yv,WC,HC,tx,nx,qC,jC,KC,ox,XC,ZC,JC,QC,YC,eD,tD,nD,ix,rD,oD,iD,aD,sD,ax,sx,uD,lD,lx,cD,Ya,dD,dx,pD,fD,px,fx,hD,mD,mx,gx,yx,gD,bD,yD,_x,_D,wD,vx,Tx,es,e_=N(()=>{"use strict";n3=Qy,globalThis.self?.name?.startsWith("em-pthread")&&Qy()}),ma=N(()=>{"use strict";ha(),r_=typeof location>"u"?void 0:location.origin,ac=import.meta.url>"file:"&&import.meta.url<"file;",Ot=(()=>{if(ac){let e=URL;return new URL(new e("ort.all.bundle.min.mjs",import.meta.url).href,r_).href}return import.meta.url})(),o_=()=>{if(Ot&&!Ot.startsWith("blob:"))return Ot.substring(0,Ot.lastIndexOf("/")+1)},ic=(e,t)=>{try{let n=t??Ot;return(n?new URL(e,n):new URL(e)).origin===r_}catch{return!1}},i3=(e,t)=>{let n=t??Ot;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},a3=(e,t)=>`${t??"./"}${e}`,i_=async e=>{let t=await (await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},s3=async e=>(await import(e)).default,t_=(Jy(),Xr(Zy)).default,a_=async()=>{if(!Ot)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(ic(Ot))return[void 0,t_()];let e=await i_(Ot);return[e,t_(e)]},n_=(e_(),Xr(Yy)).default,s_=async(e,t,n,i)=>{let o=n_&&!(e||t);if(o)if(Ot)o=ic(Ot)||i&&!n;else if(i&&!n)o=!0;else throw Error("cannot determine the script source URL.");if(o)return[void 0,n_];{let i="ort-wasm-simd-threaded.jsep.mjs",o=e??i3(i,t),a=n&&o&&!ic(o,t),s=a?await i_(o):o??a3(i,t);return[a?s:void 0,await s3(s)]}}}),br=N(()=>{"use strict";ma(),uc=!1,Ia=!1,u_=!1,u3=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},l3=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},c3=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},ga=async e=>{if(uc)return Promise.resolve();if(Ia)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(u_)throw Error("previous call to 'initializeWebAssembly()' failed.");Ia=!0;let t=e.initTimeout,n=e.numThreads;if(!1!==e.simd){if("relaxed"===e.simd){if(!c3())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!l3())throw Error("WebAssembly SIMD is not supported in the current environment.")}let i=u3();n>1&&!i&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let o=e.wasmPaths,a="string"==typeof o?o:void 0,s=o?.mjs,u=s?.href??s,l=o?.wasm,d=l?.href??l,p=e.wasmBinary,[c,h]=await s_(u,a,n>1,!!p||!!d),f=!1,m=[];if(t>0&&m.push(new Promise(e=>{setTimeout(()=>{f=!0,e()},t)})),m.push(new Promise((e,t)=>{let i={numThreads:n};if(p)i.wasmBinary=p,i.locateFile=e=>e;else if(d||a)i.locateFile=e=>d??a+e;else if(u&&0!==u.indexOf("blob:"))i.locateFile=e=>new URL(e,u).href;else if(c){let e=o_();e&&(i.locateFile=t=>e+t)}h(i).then(t=>{Ia=!1,uc=!0,sc=t,e(),c&&URL.revokeObjectURL(c)},e=>{Ia=!1,u_=!0,t(e)})})),await Promise.race(m),f)throw Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Re=()=>{if(uc&&sc)return sc;throw Error("WebAssembly is not initialized yet.")}}),Sa=N(()=>{"use strict";br(),Pt=(e,t)=>{let n=Re(),i=n.lengthBytesUTF8(e)+1,o=n._malloc(i);return n.stringToUTF8(e,o,i),t.push(o),o},Fo=(e,t,n,i)=>{if("object"==typeof e&&null!==e){if(n.has(e))throw Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([e,o])=>{let a=t?t+e:e;if("object"==typeof o)Fo(o,a+".",n,i);else if("string"==typeof o||"number"==typeof o)i(a,o.toString());else if("boolean"==typeof o)i(a,o?"1":"0");else throw Error(`Can't handle extra config type: ${typeof o}`)})},Oe=e=>{let t=Re(),n=t.stackSave();try{let n=t.PTR_SIZE,i=t.stackAlloc(2*n);t._OrtGetLastError(i,i+n);let o=Number(t.getValue(i,4===n?"i32":"i64")),a=t.getValue(i+n,"*"),s=a?t.UTF8ToString(a):"";throw Error(`${e} ERROR_CODE: ${o}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(n)}}}),c_=N(()=>{"use strict";br(),Sa(),l_=e=>{let t=Re(),n=0,i=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if("number"!=typeof e.logSeverityLevel||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if("number"!=typeof e.logVerbosityLevel||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let a=0;return e?.tag!==void 0&&(a=Pt(e.tag,i)),n=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,a),0===n&&Oe("Can't create run options."),e?.extra!==void 0&&Fo(e.extra,"",new WeakSet,(e,o)=>{let a=Pt(e,i),s=Pt(o,i);0!==t._OrtAddRunConfigEntry(n,a,s)&&Oe(`Can't set a run config entry: ${e} - ${o}.`)}),[n,i]}catch(e){throw 0!==n&&t._OrtReleaseRunOptions(n),i.forEach(e=>t._free(e)),e}}}),p_=N(()=>{"use strict";br(),Sa(),d3=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}},p3=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${e}`)}},f3=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(e=>("string"==typeof e?e:e.name)==="webgpu")&&(e.enableMemPattern=!1)},$a=(e,t,n,i)=>{let o=Pt(t,i),a=Pt(n,i);0!==Re()._OrtAddSessionConfigEntry(e,o,a)&&Oe(`Can't set a session config entry: ${t} - ${n}.`)},h3=async(e,t,n)=>{for(let i of t.executionProviders){let t="string"==typeof i?i:i.name,o=[];switch(t){case"webnn":if(t="WEBNN","string"!=typeof i){let t=i?.deviceType;t&&$a(e,"deviceType",t,n)}break;case"webgpu":if(t="JS","string"!=typeof i){let t=i;if(t?.preferredLayout){if("NCHW"!==t.preferredLayout&&"NHWC"!==t.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${t.preferredLayout}`);$a(e,"preferredLayout",t.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${t}`)}let a=Pt(t,n),s=o.length,u=0,l=0;if(s>0){u=Re()._malloc(s*Re().PTR_SIZE),n.push(u),l=Re()._malloc(s*Re().PTR_SIZE),n.push(l);for(let e=0;e<s;e++)Re().setValue(u+e*Re().PTR_SIZE,o[e][0],"*"),Re().setValue(l+e*Re().PTR_SIZE,o[e][1],"*")}await Re()._OrtAppendExecutionProvider(e,a,u,l,s)!==0&&Oe(`Can't append execution provider: ${t}.`)}},d_=async e=>{let t=Re(),n=0,i=[],o=e||{};f3(o);try{let e=d3(o.graphOptimizationLevel??"all"),a=p3(o.executionMode??"sequential"),s="string"==typeof o.logId?Pt(o.logId,i):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log severity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw Error(`log verbosity level is not valid: ${l}`);let d="string"==typeof o.optimizedModelFilePath?Pt(o.optimizedModelFilePath,i):0;if(n=t._OrtCreateSessionOptions(e,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,s,u,l,d),0===n&&Oe("Can't create session options."),o.executionProviders&&await h3(n,o,i),void 0!==o.enableGraphCapture){if("boolean"!=typeof o.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);$a(n,"enableGraphCapture",o.enableGraphCapture.toString(),i)}if(o.freeDimensionOverrides)for(let[e,a]of Object.entries(o.freeDimensionOverrides)){if("string"!=typeof e)throw Error(`free dimension override name must be a string: ${e}`);if("number"!=typeof a||!Number.isInteger(a)||a<0)throw Error(`free dimension override value must be a non-negative integer: ${a}`);let o=Pt(e,i);0!==t._OrtAddFreeDimensionOverride(n,o,a)&&Oe(`Can't set a free dimension override: ${e} - ${a}.`)}return void 0!==o.extra&&Fo(o.extra,"",new WeakSet,(e,t)=>{$a(n,e,t,i)}),[n,i]}catch(e){throw 0!==n&&0!==t._OrtReleaseSessionOptions(n)&&Oe("Can't release session options."),i.forEach(e=>t._free(e)),e}}}),ue=N(()=>{"use strict";yr=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${e}`)}},Vn=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${e}`)}},_r=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i="number"==typeof t?t:t.reduce((e,t)=>e*t,1);return n>0?Math.ceil(i*n):void 0},uo=e=>{switch(e){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},Vo=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${e}`)}},Aa=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,Oa=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint64"===e||"int8"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,lc=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${e}`)}}}),cc=N(()=>{"use strict";ha(),Go=async e=>{if("string"!=typeof e)return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e);{let t=await fetch(e);if(!t.ok)throw Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),i=n?parseInt(n,10):0;if(i<0x40000000)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),o;try{o=new ArrayBuffer(i)}catch(e){if(e instanceof RangeError){let e=Math.ceil(i/65536);o=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let a=0;for(;;){let{done:e,value:t}=await n.read();if(e)break;let i=t.byteLength;new Uint8Array(o,a,i).set(t),a+=i}return new Uint8Array(o,0,i)}}}}),Gn=N(()=>{"use strict";ue(),m3=["V","I","W","E","F"],g3=(e,t)=>{console.log(`[${m3[e]},${new Date().toISOString()}]${t}`)},Pa=(e,t)=>{f_=e,h_=t},b3=(e,t)=>{let n=Vo(e);n>=Vo(f_)&&g3(n,"function"==typeof t?t():t)},be=(...e)=>{h_&&b3(...e)}}),fe=N(()=>{"use strict";dc=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Un=class{static calcShape(e,t,n=!1){let i=e.length,o=t.length;if(0===i)return t;if(0===o)return e;let a=Math.max(e.length,t.length),s=Array(a);if(n){if(i<2||o<2)return;let n=dc.calcMatMulShape([e[i-2],e[i-1]],[t[o-2],t[o-1]]);if(void 0===n)return;[s[a-2],s[a-1]]=n}for(let u=n?3:1;u<=a;u++){let n=i-u<0?1:e[i-u],l=o-u<0?1:t[o-u];if(n!==l&&n>1&&l>1)return;let d=Math.max(n,l);if(n&&l)s[a-u]=Math.max(n,l);else{if(d>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,t){let n=e.length,i=t.length;if(n>i)return!1;for(let o=1;o<=n;o++)if(1!==e[n-o]&&e[n-o]!==t[i-o])return!1;return!0}},D=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(e,t=4){let n=e.length;if(0===n)return[];let i=Array(n),o=n-1;for(;o>=0;){if(e[o]%t==0){i[o]=e[o]/t;break}if(t%e[o]!=0)throw Error("cannot convert shape");i[o]=1,t/=e[o],o--}for(o--;o>=0;o--)i[o]=e[o];return i}static sizeFromDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(e,t,n){let i=1;for(let o=t;o<n;o++){if(e[o]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(e[o])}return i}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let n=Array(t);n[t-1]=1,n[t-2]=e[t-1];for(let i=t-3;i>=0;--i)n[i]=n[i+1]*e[i+1];return n}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(n=>this.normalizeAxis(n,t??e.length))}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let n=e.length;return e.map((e,i)=>e+t[i]+t[i+n])}static areEqual(e,t){return e.length===t.length&&e.every((e,n)=>e===t[n])}},Gr=class e{static adjustPoolAttributes(e,t,n,i,o,a){if(!e&&n.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=n.length?n.push(t[e+2]):n[e]=t[e+2];for(let e=0;e<n.length;e++)if(e<i.length){if(i[e]<0)throw Error("strides should be greater than or equal to 1")}else i.push(1);for(let e=0;e<n.length;e++)if(e<o.length){if(o[e]<0)throw Error("dilations should be greater than or equal to 1")}else o.push(1);for(let e=0;e<2*n.length;e++)if(e<a.length){if(a[e]<0)throw Error("pad should be greater than or equal to 1")}else a.push(0);for(let e=0;e<n.length;e++){if(n[e]<=0)throw Error("kernel shapes need to be greater than 0");if(a[e]>=n[e]||a[e+n.length]>=n[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,i,o,a,s,u){if(u){if(a.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)e.adjustPadAndReturnShape(t[l+(s?1:2)],n[l],i[l],o[l],a,l,l+t.length-2,u)}}static computePoolOutputShape(t,n,i,o,a,s,u){if(n.length<=0)throw Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return e.computeShapeHelper(t,n,l,i,o,a,s,u),l}static computeConvOutputShape(t,n,i,o,a,s,u){if(t.length<=0||n.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return e.computeShapeHelper(!1,t,l,i,o,a,s,u),l}static computeShapeHelper(t,n,i,o,a,s,u,l){if(t)for(let e=0;e<n.length-2;e++)i.push(1);else for(let t=0;t<n.length-2;t++)i.push(e.adjustPadAndReturnShape(n[t+2],o[t],a[t],s[t],u,t,t+n.length-2,l))}static adjustPadAndReturnShape(e,t,n,i,o,a,s,u){let l=n*(i-1)+1;if(!u||"NOTSET"===u)return Math.floor((e+o[a]+o[s]-l)/t+1);switch(u){case"VALID":return o[a]=0,o[s]=0,Math.floor((e-l)/t+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==n)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let n=((e+t-1)/t-1)*t+i-e;return o[a]=Math.floor("SAME_LOWER"===u?(n+1)/2:n/2),o[s]=n-o[a],Math.floor((e+n-i)/t+1)}default:throw Error("Unsupported AutoPad type")}}},Ea=class{static getShapeOfGemmResult(e,t,n,i,o){let a,s,u;if(2!==e.length||2!==n.length)throw Error("shape need to be of size 2");t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(i?(u=n[0],l=1):(u=n[1],l=0),n[l]!==s)throw Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw Error("invalid shape specified");if(o&&!Un.isValidBroadcast(o,[a,u]))throw Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},m_=-34028234663852886e22,g_=34028234663852886e22}),pc=N(()=>{"use strict";ue(),Ca=(e,t)=>new(uo(t))(e)}),x_=N(()=>{"use strict";ue(),Gn(),y_=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),hc=(e,t)=>{if("int32"===t)return e;let n=y_.get(t);if(!n)throw Error(`WebNN backend does not support data type: ${t}`);let i=n/8;if(e.byteLength%i!=0)throw Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let o=e.byteLength/i,a=new(uo(t))(e.buffer,e.byteOffset,o);switch(t){case"int64":case"uint64":{let e=new Int32Array(o);for(let t=0;t<o;t++){let n=a[t];if(n>2147483647n||n<-2147483648n)throw Error("Can not convert int64 data to int32 - value out of range.");e[t]=Number(n)}return new Uint8Array(e.buffer)}case"int8":case"uint8":case"uint32":if("uint32"===t&&a.some(e=>e>0x7fffffff))throw Error("Can not convert uint32 data to int32 - value out of range.");return new Uint8Array(Int32Array.from(a,Number).buffer);default:throw Error(`Unsupported data conversion from ${t} to 'int32'`)}},__=(e,t)=>{if("int32"===t)return e;if(e.byteLength%4!=0)throw Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":return new Uint8Array(BigInt64Array.from(i,BigInt).buffer);case"uint64":if(i.some(e=>e<0))throw Error("Can not convert int32 data to uin64 - negative value found.");return new Uint8Array(BigUint64Array.from(i,BigInt).buffer);case"int8":if(i.some(e=>e<-128||e>127))throw Error("Can not convert int32 data to int8 - value out of range.");return new Uint8Array(Int8Array.from(i,Number).buffer);case"uint8":if(i.some(e=>e<0||e>255))throw Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number);case"uint32":if(i.some(e=>e<0))throw Error("Can not convert int32 data to uint32 - negative value found.");return new Uint8Array(Uint32Array.from(i,Number).buffer);default:throw Error(`Unsupported data conversion from 'int32' to ${t}`)}},y3=1,b_=()=>y3++,_3=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),w_=(e,t)=>{let n=y_.get(e);if(!n)throw Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((e,t)=>e*t)*n/8):0},Da=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:i,dataType:o,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=i,this.dataType=o,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return w_(this.dataType,this.tensorShape)}destroy(){be("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(!this.fallbackDataType)return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor);{let t=__(new Uint8Array(await this.mlContext.readTensor(this.mlTensor)),this.dataType);return e?void(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(t):t.buffer}}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((e,t)=>e===n[t])}setIsDataConverted(e){this.isDataConverted=e}},ka=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,i){let o=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!a?.input.dataTypes.includes(t)){if(!(s=_3.get(t))||a?.input.dataTypes.includes(s))throw Error(`WebNN backend does not support data type: ${t}`);be("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(o,t,n))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==w_(t,n))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,u,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if("int32"===this.wrapper.fallbackType)t=hc(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength)return void this.wrapper.write(t);be("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?__(this.activeUpload,this.wrapper?.type):this.activeUpload;return e?void(e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t)):t.buffer}if(!this.wrapper)throw Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},fc=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=b_();return this.tensorTrackersById.set(e,new ka(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,i,o){be("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${i}, copyOld: ${o}}`);let a=this.tensorTrackersById.get(t);if(!a)throw Error("Tensor not found.");return a.ensureTensor(e,n,i,o)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw Error("Tensor not found.");n.upload(t)}async download(e,t){be("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw Error("Tensor not found.");return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,i){let o=this.getMLContext(e),a=b_(),s=new Da({sessionId:e,context:o,tensor:t,dataType:n,shape:i});return this.tensorTrackersById.set(a,new ka(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,n,i,o,a,s){let u=this.getMLContext(e);for(let[i,o]of this.freeTensors.entries())if(o.canReuseTensor(u,t,n)){be("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${n}`);let o=this.freeTensors.splice(i,1)[0];return o.sessionId=e,o}be("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${n}}`);let l=await u.createTensor({dataType:s??t,shape:n,dimensions:n,usage:i,writable:o,readable:a});return new Da({sessionId:e,context:u,tensor:l,dataType:t,shape:n,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},v_=(...e)=>new fc(...e)}),T_=N(()=>{"use strict";ue(),br(),pc(),x_(),Gn(),Na=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),w3=(e,t)=>{if(e===t)return!0;if(void 0===e||void 0===t)return!1;let n=Object.keys(e).sort(),i=Object.keys(t).sort();return n.length===i.length&&n.every((n,o)=>n===i[o]&&e[n]===t[n])},La=class{constructor(e){this.tensorManager=v_(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Pa(e.logLevel,!!e.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(e){be("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){be("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let e of t)be("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(t=>t.gpuDevice===e);if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:t}),t}}if(void 0===e){let e=this.mlContextCache.findIndex(e=>void 0===e.options&&void 0===e.gpuDevice);if(-1!==e)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let t=this.mlContextCache.findIndex(t=>w3(t.options,e));if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),0===n.size){this.sessionIdsByMLContext.delete(t);let e=this.mlContextCache.findIndex(e=>e.mlContext===t);-1!==e&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){be("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,i,o){let a=Na.get(n);if(!a)throw Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,i,o)}async createTemporaryTensor(e,t,n){be("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let i=Na.get(t);if(!i)throw Error(`Unsupported ONNX data type: ${t}`);let o=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,o,i,n,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(o):this.temporarySessionTensorIds.set(e,[o]),o}uploadTensor(e,t){if(!Re().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");be("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return Ca(n,t)}}registerMLTensor(e,t,n,i){let o=Na.get(n);if(!o)throw Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(e,t,o,i);return be("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${o}, dimensions: ${i}} -> {tensorId: ${a}}`),a}registerMLConstant(e,t,n,i,o,a,s=!1){if(!a)throw Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=a.get(u);if(!l)throw Error(`File with name ${u} not found in preloaded files.`);if(t+n>l.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(t,t+n).buffer,p;switch(o.dataType){case"float32":p=new Float32Array(d);break;case"float16":p="u">typeof Float16Array&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":s?(p=new Int32Array(hc(new Uint8Array(d),"int64").buffer),o.dataType="int32"):p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw Error(`Unsupported data type: ${o.dataType} in creating WebNN Constant from external data.`)}return be("verbose",()=>`[WebNN] registerMLConstant {dataType: ${o.dataType}, shape: ${o.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(o,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return!!n&&n.includes(t)}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return!!n&&n.includes(t)}isGraphInputOutputTypeSupported(e,t,n=!0){let i=Na.get(yr(t)),o=this.mlOpSupportLimitsBySessionId.get(e);return!(typeof i>"u")&&(n?!!o?.input.dataTypes.includes(i):!!o?.output.dataTypes.includes(i))}flush(){}}}),Ra=N(()=>{}),O_=N(()=>{"use strict";Gn(),Ra(),I_=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),mc=[],gc=e=>16*Math.ceil(Number(e)/16),v3=e=>{for(let t=0;t<mc.length;t++){let n=mc[t];if(e<=n)return n}return 16*Math.ceil(e/16)},x3=1,S_=()=>x3++,yc=async(e,t,n,i)=>{let o=gc(n),a=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,o),e.flush(),await a.mapAsync(GPUMapMode.READ);let u=a.getMappedRange();if(!i)return new Uint8Array(u.slice(0,n));{let e=i();return e.set(new Uint8Array(u,0,n)),e}}finally{a.destroy()}},bc=class{constructor(e){for(let[t]of(this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,I_))mc.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,i=t.byteOffset,o=t.byteLength,a=gc(o),s=this.storageCache.get(e);if(!s)throw Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==o)throw Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${o}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(u.getMappedRange()).set(new Uint8Array(n,i,o)),u.unmap();let l=this.backend.device.createCommandEncoder();l.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([l.finish()]),u.destroy(),be("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw Error("destination gpu data for memcpy does not exist");if(n.originalSize!==i.originalSize)throw Error("inconsistent source and destination gpu data size");let o=gc(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,i.gpuData.buffer,0,o)}registerExternalBuffer(e,t,n){let i;if(n){if(i=n[0],e===n[1])return be("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=S_();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),be("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){void 0!==e&&(this.storageCache.delete(e),be("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=v3(e),i,o=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(o||a){let e=(o?this.freeBuffers:this.freeUniformBuffers).get(n);i=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:n,usage:t})}else i=this.backend.device.createBuffer({size:n,usage:t});let s={id:S_(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),be("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t="bigint"==typeof e?Number(e):e,n=this.storageCache.get(t);if(!n){if(0===this.storageCache.size)return 0;throw Error("releasing data does not exist")}return be("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw Error("data does not exist");await yc(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let e of this.buffersPending){let t=I_.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];void 0===t||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];void 0===t||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let t of(e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e)),this.buffersPending))e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,0===this.sessionCount&&(be("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},A_=(...e)=>new bc(...e)}),Je=N(()=>{"use strict";_c=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},le=e=>new _c(e)}),ge=N(()=>{"use strict";ue(),fe(),Ur=64,vc=(e,t)=>{if(3===t)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==t)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${e}`)}},Me=(e,t=1)=>{let n=vc(e,t);return"string"==typeof n?n:n[0]},at=(e,t=1)=>{let n=vc(e,t);return"string"==typeof n?n:n[1]},U=(...e)=>{let t=[];return e.forEach(e=>{0!==e.length&&t.push({type:12,data:e},{type:12,data:D.computeStrides(e)})}),t},Pe=e=>e%4==0?4:e%2==0?2:1,xc=(e="f32",t,n="0")=>t&&1!==t?`vec${t}<${e}>(${n})`:`${e}(${n})`,Wr=(e,t,n)=>"f32"===e?n:1===t?`f32(${n})`:`vec${t}<f32>(${n})`,Xt=(e,t)=>4===t?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:2===t?`(${e}.x + ${e}.y)`:3===t?`(${e}.x + ${e}.y + ${e}.z)`:e,Z=(e,t,n,i)=>e.startsWith("uniforms.")&&n>4?"string"==typeof t?"f16"===i?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:"f16"===i?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,za=(e,t,n,i,o)=>{let a="number"==typeof n,s=a?n:n.length,u=[...Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=vc(t,o),p="string"==typeof d?d:d[1],c={indices:l,value:p,storage:"string"==typeof d?d:d[0],tensor:t},h=e=>"string"==typeof e?e:`${e}u`,f={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},m=a?"uniforms.":"",g=`${m}${e}_shape`,b=`${m}${e}_strides`,y="";for(let e=0;e<s-1;e++)y+=`
    let dim${e} = current / ${Z(b,e,s)};
    let rest${e} = current % ${Z(b,e,s)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;y+=`indices[${s-1}] = current;`;let _=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${c.indices} {
    var indices: ${c.indices};
    var current = offset;
    ${y}
    return indices;
  }`,v=t=>(f.offsetToIndices=!0,s<2?t:`o2i_${e}(${t})`),x=[];if(s>=2)for(let e=s-1;e>=0;e--)x.push(`${Z(b,e,s)} * (indices[${e}])`);let w=s<2?"":`
  fn i2o_${e}(indices: ${c.indices}) -> u32 {
    return ${x.join("+")};
  }`,$=t=>(f.indicesToOffset=!0,s<2?t:`i2o_${e}(${t})`),T=(...e)=>0===s?"0u":`${c.indices}(${e.map(h).join(",")})`,I=(e,t)=>s<2?`${e}`:`${Z(e,t,s)}`,S=(e,t,n)=>s<2?`${e}=${n};`:`${Z(e,t,s)}=${n};`,O={},E=(t,n)=>{f.broadcastedIndicesToOffset=!0;let i=`${n.name}broadcastedIndicesTo${e}Offset`;if(i in O)return`${i}(${t})`;let o=[];for(let e=s-1;e>=0;e--){let t=n.indicesGet("outputIndices",e+n.rank-s);o.push(`${I(b,e)} * (${t} % ${I(g,e)})`)}return O[i]=`fn ${i}(outputIndices: ${n.type.indices}) -> u32 {
             return ${o.length>0?o.join("+"):"0u"};
           }`,`${i}(${t})`},A=(t,n)=>(()=>{if(c.storage===c.value)return`${e}[${t}]=${n};`;if("vec2<u32>"===c.storage&&"i32"===c.value)return`${e}[${t}]=vec2<u32>(u32(${n}), select(0u, 0xFFFFFFFFu, ${n} < 0));`;if("vec2<u32>"===c.storage&&"u32"===c.value)return`${e}[${t}]=vec2<u32>(u32(${n}), 0u);`;if("u32"===c.storage&&"vec4<bool>"===c.value)return`${e}[${t}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${n}));`;throw Error(`not supported combination of storage type ${c.storage} and value type ${c.value} yet`)})(),P=t=>(()=>{if(c.storage===c.value)return`${e}[${t}]`;if("vec2<u32>"===c.storage&&"i32"===c.value)return`i32(${e}[${t}].x)`;if("vec2<u32>"===c.storage&&"u32"===c.value)return`u32(${e}[${t}].x)`;if("u32"===c.storage&&"vec4<bool>"===c.value)return`vec4<bool>(bool(${e}[${t}] & 0xFFu), bool(${e}[${t}] & 0xFF00u), bool(${e}[${t}] & 0xFF0000u), bool(${e}[${t}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${c.storage} and value type ${c.value} yet`)})(),k=s<2?"":`
  fn get_${e}ByIndices(indices: ${c.indices}) -> ${p} {
    return ${P(`i2o_${e}(indices)`)};
  }`,C=s<2?"":(()=>{let t=u.map(e=>`d${e}: u32`).join(", "),n=u.map(e=>`d${e}`).join(", ");return`
  fn get_${e}(${t}) -> ${p} {
    return get_${e}ByIndices(${T(n)});
  }`})(),z=(...t)=>{if(t.length!==s)throw Error(`indices length must be ${s}`);let n=t.map(h).join(",");return 0===s?P("0u"):1===s?P(n[0]):(f.get=!0,f.getByIndices=!0,f.indicesToOffset=!0,`get_${e}(${n})`)},R=t=>s<2?P(t):(f.getByIndices=!0,f.indicesToOffset=!0,`get_${e}ByIndices(${t})`),B=s<2?"":`
  fn set_${e}ByIndices(indices: ${c.indices}, value: ${p}) {
    ${A(`i2o_${e}(indices)`,"value")}
  }`,M=s<2?"":(()=>{let t=u.map(e=>`d${e}: u32`).join(", "),n=u.map(e=>`d${e}`).join(", ");return`
  fn set_${e}(${t}, value: ${p}) {
    set_${e}ByIndices(${T(n)}, value);
  }`})();return{impl:()=>{let e=[],t=!1;return f.offsetToIndices&&(e.push(_),t=!0),f.indicesToOffset&&(e.push(w),t=!0),f.broadcastedIndicesToOffset&&(Object.values(O).forEach(t=>e.push(t)),t=!0),f.set&&(e.push(M),t=!0),f.setByIndices&&(e.push(B),t=!0),f.get&&(e.push(C),t=!0),f.getByIndices&&(e.push(k),t=!0),!a&&t&&e.unshift(`const ${g} = ${c.indices}(${n.join(",")});`,`const ${b} = ${c.indices}(${D.computeStrides(n).join(",")});`),e.join(`
`)},type:c,offsetToIndices:v,indicesToOffset:$,broadcastedIndicesToOffset:E,indices:T,indicesGet:I,indicesSet:S,set:(...t)=>{if(t.length!==s+1)throw Error(`indices length must be ${s}`);let n=t[s];if("string"!=typeof n)throw Error("value must be string");let i=t.slice(0,s).map(h).join(",");return 0===s?A("0u",n):1===s?A(i[0],n):(f.set=!0,f.setByIndices=!0,f.indicesToOffset=!0,`set_${e}(${i}, ${n})`)},setByOffset:A,setByIndices:(t,n)=>s<2?A(t,n):(f.setByIndices=!0,f.indicesToOffset=!0,`set_${e}ByIndices(${t}, ${n});`),get:z,getByOffset:P,getByIndices:R,usage:i,name:e,strides:b,shape:g,rank:s}},L=(e,t,n,i=1)=>za(e,t,n,"input",i),F=(e,t,n,i=1)=>za(e,t,n,"output",i),P_=(e,t,n)=>za(e,t,n,"atomicOutput",1),Ma=(e,t,n,i=1)=>za(e,t,n,"internal",i),wc=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${"number"==typeof e?`${e}u`:e}) { return; }`}mainStart(e=Ur){let t="number"==typeof e?e:e[0],n="number"==typeof e?1:e[1],i="number"==typeof e?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${t}, ${n}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*i>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${t}, ${n}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let o=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],a=o?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=o?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*n*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${n}, ${i})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){0!==e.rank&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if("internal"===e.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let n="input"===e.usage?"read":"read_write",i="atomicOutput"===e.usage?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(e=>this.declareVariable(e,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if("internal"!==e.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(e,t,n=1){return this.uniforms.push({name:e,type:t,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let e=[];for(let{name:t,type:n,length:i}of this.uniforms)if(i&&i>4)"f16"===n?e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${n}>, ${Math.ceil(i/4)}>`);else{let o=null==i||1===i?n:`vec${i}<${n}>`;e.push(`${t}:${o}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(0===this.uniforms.length)return;let e=e=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(e)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},E_=(e,t)=>new wc(e,t)}),Yn=N(()=>{"use strict";ue(),fe(),Je(),ge(),T3=(e,t)=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if(0!==t.length&&t.length!==e[0].dims.length)throw Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},C_=(e,t)=>0!==t.length?t:[...Array(e).keys()].reverse(),I3=(e,t)=>D.sortBasedOnPerm(e,C_(e.length,t)),S3=(e,t,n,i)=>{let o=`fn perm(i: ${i.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let n=0;n<t;++n)o+=`a[${e[n]}]=i[${n}];`;return o+"return a;}"},$3=(e,t)=>{let n=[],i=[];for(let o=0;o<e.length;++o)1!==e[o]&&n.push(e[o]),1!==e[t[o]]&&i.push(t[o]);return{newShape:n,newPerm:i}},A3=(e,t)=>{let n=0;for(let i=0;i<e.length;++i)if(1!==t[e[i]]){if(e[i]<n)return!1;n=e[i]}return!0},st=(e,t)=>{let n=e.dataType,i=e.dims.length,o=C_(i,t),a=I3(e.dims,o),s=e.dims,u=a;if(i<2||A3(o,e.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=D.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64/4)},programUniforms:[{type:12,data:Math.ceil(t/4)}]}},getShaderSource:e=>{let t=L("input",n,s,4),i=F("output",n,u,4);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,i)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:l,newPerm:d}=$3(e.dims,o),p=D.areEqual(d,[2,3,1]),c=D.areEqual(d,[3,1,2]);if(2===l.length||p||c){u=[(s=p?[l[0],l[1]*l[2]]:c?[l[0]*l[1],l[2]]:l)[1],s[0]];let t=16;return{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let n=D.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/t),y:Math.ceil(u[0]/t)},programUniforms:[{type:12,data:n},...U(s,u)]}},getShaderSource:e=>{let i=L("a",n,s.length),o=F("output",n,u.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(i,o)}
  var<workgroup> tile : array<array<${o.type.value}, ${t+1}>, ${t}>;
  ${e.mainStart([t,t,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${t} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${t}u + local_id.x;
    let input_row = workgroup_id_x * ${t}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${i.getByIndices(`${i.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${t}u + local_id.x;
    let output_row = workgroup_id_y * ${t}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${o.setByIndices(`${o.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`}}}return{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let t=D.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:[{type:12,data:t},...U(s,u)]}},getShaderSource:e=>{let t=L("a",n,s.length),a=F("output",n,u.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,a)}

  ${S3(o,i,t,a)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${a.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${a.setByOffset("global_idx",t.getByIndices("aIndices"))}
  }`}}},D_=(e,t)=>{T3(e.inputs,t.perm),e.compute(st(e.inputs[0],t.perm))},k_=e=>le({perm:e.perm})}),W_=N(()=>{"use strict";ue(),fe(),ge(),Ba(),Yn(),O3={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},P3={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},E3={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},C3={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},D3=(e,t)=>{let n=[];for(let i=t-e;i<t;++i)n.push(i);return n},k3=(e,t)=>{let n=[],i=e.length;for(let o=0;o<i;o++)-1===t.indexOf(o)&&n.push(e[o]);return[n,t.map(t=>e[t])]},N3=(e,t)=>{let n=e.length+t.length,i=[],o=0;for(let a=0;a<n;a++)-1===t.indexOf(a)?i.push(e[o++]):i.push(1);return i},L3=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},R3=(e,t)=>{let n=[];if(!L3(e,t)){for(let i=0;i<t;++i)-1===e.indexOf(i)&&n.push(i);e.forEach(e=>n.push(e))}return n},z3=(e,t,n,i,o,a,s)=>{let u=n[0].dims,l=D.size(a),d=D.size(s),p=L("_A",n[0].dataType,u),c=F("output",o,a),h=64;1===l&&(h=256);let f=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,m=e=>`
        ${e.registerUniform("reduceSize","u32").declareVariables(p,c)}
        ${f}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${e.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${E3[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${p.getByOffset("offset + k")});
           bestValue = ${O3[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${P3[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${"mean"===i?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${C3[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${h}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}},Wn=(e,t,n,i)=>{let o=1===e.inputs.length?n:Tc(e.inputs,n),a=o.axes;0!==a.length||o.noopWithEmptyAxes||(a=e.inputs[0].dims.map((e,t)=>t));let s=D.normalizeAxes(a,e.inputs[0].dims.length),u=s,l=e.inputs[0],d=R3(u,e.inputs[0].dims.length);d.length>0&&(l=e.compute(st(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],u=D3(u.length,l.dims.length));let[p,c]=k3(l.dims,u),h=p;o.keepDims&&(h=N3(p,s)),e.compute(z3(t,o.cacheKey,[l],i,e.inputs[0].dataType,h,c),{inputs:[l]})},N_=(e,t)=>{Wn(e,"ReduceMeanShared",t,"mean")},L_=(e,t)=>{Wn(e,"ReduceL1Shared",t,"l1")},R_=(e,t)=>{Wn(e,"ReduceL2Shared",t,"l2")},z_=(e,t)=>{Wn(e,"ReduceLogSumExpShared",t,"logSumExp")},M_=(e,t)=>{Wn(e,"ReduceMaxShared",t,"max")},B_=(e,t)=>{Wn(e,"ReduceMinShared",t,"min")},F_=(e,t)=>{Wn(e,"ReduceProdShared",t,"prod")},V_=(e,t)=>{Wn(e,"ReduceSumShared",t,"sum")},G_=(e,t)=>{Wn(e,"ReduceSumSquareShared",t,"sumSquare")},U_=(e,t)=>{Wn(e,"ReduceLogSumShared",t,"logSum")}}),Ba=N(()=>{"use strict";ue(),fe(),Je(),ge(),W_(),Hn=e=>{if(!e||0===e.length||e.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===e.length&&1!==e[1].dims.length)throw Error("Invalid axes input dims.")},M3=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Fa=(e,t,n,i,o,a,s=!1,u=!1)=>{let l=[],d=n[0].dims,p=d.length,c=D.normalizeAxes(o,p),h=!u&&0===c.length;d.forEach((e,t)=>{h||c.indexOf(t)>=0?s&&l.push(1):l.push(e)});let f=l.length,m=D.size(l);return{name:e,shaderCache:t,getShaderSource:e=>{let t=[],o=L("_A",n[0].dataType,p),u=F("output",a,f),l=i(o,u,c),m=l[2];for(let e=0,n=0;e<p;e++)h||c.indexOf(e)>=0?(s&&n++,m=`for(var j${e}: u32 = 0; j${e} < ${d[e]}; j${e}++) {
                  ${l[2].includes("last_index")?`let last_index = j${e};`:""}
                  ${o.indicesSet("input_indices",e,`j${e}`)}
                  ${m}
                }`):(t.push(`${o.indicesSet("input_indices",e,u.indicesGet("output_indices",n))};`),n++);return`

        ${e.registerUniform("output_size","u32").declareVariables(o,u)}

        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${o.type.indices};
          let output_indices = ${u.offsetToIndices("global_idx")};

          ${t.join(`
`)}
          ${l[0]}       // init ops for reduce max/min
          ${l[1]}
          ${m}
          ${l[3]}
          ${4===l.length?u.setByOffset("global_idx","value"):l.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...U(d,l)]})}},Tc=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>n.push(Number(e))),le({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},qn=(e,t,n,i)=>{let o=e.inputs,a=1===o.length?n:Tc(o,n);e.compute(Fa(t,{hint:a.cacheKey,inputDependencies:["rank"]},[o[0]],a.noopWithEmptyAxes&&0===a.axes.length?M3:i,a.axes,o[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},B3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceLogSum",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,"value = log(value);"])},F3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceL1",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += abs(${e.getByIndices("input_indices")});`,""])},V3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceL2",t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},G3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceLogSumExp",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += exp(${e.getByIndices("input_indices")});`,"value = log(value);"])},U3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceMax",t,(e,t,n)=>{let i=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||0===n.length)&&i.push(e.indicesSet("input_indices",t,0));return[`${i.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = max(value, ${e.getByIndices("input_indices")});`,""]})},W3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceMean",t,(t,n,i)=>{let o=1;for(let n=0;n<t.rank;n++)(i.indexOf(n)>=0||0===i.length)&&(o*=e.inputs[0].dims[n]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${n.type.value}(sum / ${o});`]})},H3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceMin",t,(e,t,n)=>{let i=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||0===n.length)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = min(value, ${e.getByIndices("input_indices")});`,""]})},q3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceProd",t,(e,t)=>[`var value = ${t.type.storage}(1);`,"",`value *= ${e.getByIndices("input_indices")};`,""])},j3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceSum",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,""])},K3=(e,t)=>{Hn(e.inputs),qn(e,"ReduceSumSquare",t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += t * t;`,""])},jn=(e,t,n)=>{if(0===t.length)return n;let i=1,o=1;for(let n=0;n<t.length;n++)-1===t.indexOf(n)?i*=e[n]:o*=e[n];return o<32&&i>1024},H_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?W3(e,t):N_(e,t)},q_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?F3(e,t):L_(e,t)},j_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?V3(e,t):R_(e,t)},K_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?G3(e,t):z_(e,t)},X_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?U3(e,t):M_(e,t)},Z_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?H3(e,t):B_(e,t)},J_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?q3(e,t):F_(e,t)},Q_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?j3(e,t):V_(e,t)},Y_=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?K3(e,t):G_(e,t)},e0=(e,t)=>{jn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?B3(e,t):U_(e,t)}}),o0=N(()=>{"use strict";ue(),Je(),Ba(),t0=e=>{if(!e||0===e.length||e.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==e[0].dataType)throw Error("Invalid input type.")},n0=(e,t)=>{t0(e.inputs);let n=(e,n,i)=>{let o=[];for(let t=0;t<e.rank;t++)(i.indexOf(t)>=0||0===i.length)&&o.push(`input_indices[${t}] = 0;`);return[`${o.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Fa("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},r0=(e,t)=>{t0(e.inputs);let n=(e,n,i)=>{let o=[];for(let t=0;t<e.rank;t++)(i.indexOf(t)>=0||0===i.length)&&o.push(`input_indices[${t}] = 0;`);return[`${o.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Fa("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Ic=e=>le(e)}),Va=N(()=>{"use strict";ue(),fe(),Ra(),ge(),X3=(e,t)=>{let n=e[0],i=e[1],o=e[2],a=e[3],s=e[4],u=e[5];if(s&&u)throw Error("Attention cannot have both past and attention_bias");if(3!==n.dims.length)throw Error('Input "input" must have 3 dimensions');let l=n.dims[0],d=n.dims[1],p=n.dims[2];if(1!==o.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==i.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==p)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==i.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=o.dims[0]/3,h=c,f=h;if(t.qkvHiddenSizes.length>0){if(3!==t.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let e of t.qkvHiddenSizes)if(e%t.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");c=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],f=t.qkvHiddenSizes[2]}let m=d;if(c!==h)throw Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==c+h+f)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let g=0;if(s){if(h!==f)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==s.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==s.dims[0])throw Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==h/t.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(g=s.dims[3])}let b=m+g,y=-1,_=0;if(a)throw Error("Mask not supported");if(s)throw Error("past is not supported");if(u){if(4!==u.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==d||u.dims[3]!==b)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:b,maxSequenceLength:y,inputHiddenSize:p,hiddenSize:c,vHiddenSize:f,headSize:Math.floor(c/t.numHeads),vHeadSize:Math.floor(f/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Sc=(e,t,n)=>t&&e?`
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
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Z3=(e,t,n,i,o,a,s,u)=>{let l=Pe(s?1:a),d=64,p=a/l;p<64&&(d=32);let c=[{type:12,data:t},{type:12,data:n},{type:12,data:i},{type:12,data:o},{type:12,data:p},{type:12,data:Math.ceil(a/l/d)}],h=Me(e.dataType,l),f=at(1,l),m=["type"];s&&m.push("type"),u&&m.push("type");let g=t=>{let n=F("x",e.dataType,e.dims,l),i=[n],o=s?L("seq_lens",s.dataType,s.dims):void 0;o&&i.push(o);let a=u?L("total_sequence_length_input",u.dataType,u.dims):void 0;a&&i.push(a);let p=at(e.dataType),c=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${t.registerUniforms(c).declareVariables(...i)}
  ${t.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Sc(o,a,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${f}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${f}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${f}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${f}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${n.type.value}(${p}(1.0) / ${p}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${f}(x[offset + i]);
        x[offset + i] = ${n.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${n.type.value}(${p}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${h};${l}`,inputDependencies:m},getShaderSource:g,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:t*n},programUniforms:c})}},J3=(e,t,n,i,o,a,s,u,l)=>{let d=s+a.kvSequenceLength,p=[a.batchSize,a.numHeads,a.sequenceLength,d],c=e>1&&i,h=a.kvNumHeads?a.kvNumHeads:a.numHeads,f=c?[a.batchSize,h,d,a.headSize]:void 0,m=a.nReps?a.nReps:1,g=0===a.scale?1/Math.sqrt(a.headSize):a.scale,b=Pe(a.headSize),y=a.headSize/b,_=12,v={x:Math.ceil(d/12),y:Math.ceil(a.sequenceLength/_),z:a.batchSize*a.numHeads},x=[{type:12,data:a.sequenceLength},{type:12,data:y},{type:12,data:d},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:g},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:m}],w=c&&i&&D.size(i.dims)>0,$=["type","type"];w&&$.push("type"),o&&$.push("type"),u&&$.push("type"),l&&$.push("type");let T=[{dims:p,dataType:t.dataType,gpuDataType:0}];c&&T.push({dims:f,dataType:t.dataType,gpuDataType:0});let I=e=>{let a=L("q",t.dataType,t.dims,b),s=[a,L("key",n.dataType,n.dims,b)];if(w){let e=L("past_key",i.dataType,i.dims,b);s.push(e)}o&&s.push(L("attention_bias",o.dataType,o.dims));let d=u?L("seq_lens",u.dataType,u.dims):void 0;d&&s.push(d);let h=l?L("total_sequence_length_input",l.dataType,l.dims):void 0;h&&s.push(h);let g=F("output",t.dataType,p),y=[g];c&&y.push(F("present_key",t.dataType,f,b));let v=at(1,b),x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;

  var<workgroup> tileQ: array<${a.type.storage}, ${_*_}>;
  var<workgroup> tileK: array<${a.type.storage}, ${_*_}>;
  ${e.registerUniforms(x).declareVariables(...s,...y)}
  ${e.mainStart([_,_,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${1===m?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${1===m?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Sc(d,h,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${w&&c?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${c?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${v}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${w&&c?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${c?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${v}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(b){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw Error(`Unsupported components: ${b}`)}})()};
        output[outputIdx] = ${g.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${b};${void 0!==o};${void 0!==i};${e}`,inputDependencies:$},getRunData:()=>({outputs:T,dispatchGroup:v,programUniforms:x}),getShaderSource:I}},Q3=(e,t,n,i,o,a,s,u)=>{let l=a+o.kvSequenceLength,d=o.nReps?o.nReps:1,p=o.vHiddenSize*d,c=e>1&&i,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,f=c?[o.batchSize,h,l,o.headSize]:void 0,m=[o.batchSize,o.sequenceLength,p],g=12,b={x:Math.ceil(o.vHeadSize/g),y:Math.ceil(o.sequenceLength/g),z:o.batchSize*o.numHeads},y=[{type:12,data:o.sequenceLength},{type:12,data:l},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:p},{type:12,data:a},{type:12,data:o.kvSequenceLength},{type:12,data:d}],_=c&&i&&D.size(i.dims)>0,v=["type","type"];_&&v.push("type"),s&&v.push("type"),u&&v.push("type");let x=[{dims:m,dataType:t.dataType,gpuDataType:0}];c&&x.push({dims:f,dataType:t.dataType,gpuDataType:0});let w=e=>{let o=L("probs",t.dataType,t.dims),a=[o,L("v",n.dataType,n.dims)];_&&a.push(L("past_value",i.dataType,i.dims));let l=s?L("seq_lens",s.dataType,s.dims):void 0;s&&a.push(l);let p=u?L("total_sequence_length_input",u.dataType,u.dims):void 0;u&&a.push(p);let h=[F("output",t.dataType,m)];c&&h.push(F("present_value",t.dataType,f));let b=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;
  var<workgroup> tileQ: array<${o.type.value}, ${g*g}>;
  var<workgroup> tileV: array<${o.type.value}, ${g*g}>;
  ${e.registerUniforms(b).declareVariables(...a,...h)}
  ${e.mainStart([g,g,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===d?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===d?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Sc(l,p,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${_&&c?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${c?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${o.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${_&&c?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${c?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${void 0!==i};${e}`,inputDependencies:v},getRunData:()=>({outputs:x,dispatchGroup:b,programUniforms:y}),getShaderSource:w}},lo=(e,t,n,i,o,a,s,u,l,d,p,c)=>{let h=Math.min(e.outputCount,1+ +!!s+ +!!u),f=h>1?d.pastSequenceLength:0,m=f+d.kvSequenceLength,g=l&&D.size(l.dims)>0?l:void 0,b=[t,n];h>1&&s&&D.size(s.dims)>0&&b.push(s),g&&b.push(g),p&&b.push(p),c&&b.push(c);let y=e.compute(J3(h,t,n,s,g,d,f,p,c),{inputs:b,outputs:h>1?[-1,1]:[-1]})[0];e.compute(Z3(y,d.batchSize,d.numHeads,f,d.sequenceLength,m,p,c),{inputs:p&&c?[y,p,c]:[y],outputs:[]});let _=[y,i];h>1&&u&&D.size(u.dims)>0&&_.push(u),p&&_.push(p),c&&_.push(c),e.compute(Q3(h,y,i,u,d,f,p,c),{inputs:_,outputs:h>1?[0,2]:[0]})},Y3=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,o=t.inputHiddenSize,a=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:i},{type:12,data:o},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],p=e=>{let t=F("output_q",l[0].dataType,n),i=F("output_k",l[0].dataType,n),o=F("output_v",l[0].dataType,n),a=L("input",l[0].dataType,l[0].dims),u=L("weight",l[1].dataType,l[1].dims),d=L("bias",l[2].dataType,l[2].dims),p=a.type.storage,c=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${p}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${p}, ${s*s}>;
  var<workgroup> tileWeightK: array<${p}, ${s*s}>;
  var<workgroup> tileWeightV: array<${p}, ${s*s}>;
  ${e.registerUniforms(c).declareVariables(a,u,d,t,i,o)}
  ${e.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${p}(0);
    var valueK = ${p}(0);
    var valueV = ${p}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:d}),getShaderSource:p},{inputs:l,outputs:[-1,-1,-1]})},i0=(e,t)=>{let n=X3(e.inputs,t),[i,o,a]=Y3(e,n);return lo(e,i,o,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),s0=N(()=>{"use strict";pt(),ue(),fe(),Je(),ge(),eE=(e,t)=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs");let n=(e,t,n)=>{let i=t.length;if(i!==e.length)throw Error(`${n}: num dimensions != ${i}`);t.forEach((t,i)=>{if(t!==e[i])throw Error(`${n}: dim[${i}] do not match`)})};if(e[0].dims.length>1){let i="NHWC"===t.format?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,i,"Invalid input scale"),n(e[2].dims,i,"Invalid input B"),n(e[3].dims,i,"Invalid input mean"),n(e[4].dims,i,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},tE=(e,t)=>{let{epsilon:n,spatial:i,format:o}=t,a=e[0].dims,s=i?Pe(a[a.length-1]):1,u="NHWC"===o&&a.length>1?s:1,l=D.size(a)/s,d=i,p=d?a.length:a,c=L("x",e[0].dataType,e[0].dims,s),h=L("scale",e[1].dataType,e[1].dims,u),f=L("bias",e[2].dataType,e[2].dims,u),m=L("inputMean",e[3].dataType,e[3].dims,u),g=L("inputVar",e[4].dataType,e[4].dims,u),b=F("y",e[0].dataType,p,s),y=()=>{let e="";if(i)e=`let cOffset = ${1===a.length?"0u":"NHWC"===o?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if("NCHW"===o)e=`
            ${b.indicesSet("outputIndices","0","0")}
            let cOffset = ${b.indicesToOffset("outputIndices")};`;else{e=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let t=1;t<h.rank;t++)e+=`cIndices[${t}] = outputIndices[${t}];`;e+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return e},_=e=>`
  const epsilon = ${n};
  ${e.registerUniform("outputSize","u32").declareVariables(c,h,f,m,g,b)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${b.offsetToIndices(`global_idx * ${s}`)};
    ${y()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${f.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${g.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${b.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d?[{type:12,data:l},...U(a)]:[{type:12,data:l}]})}},nE=e=>le(e),a0=(e,t)=>{let{inputs:n,outputCount:i}=e,o=nE({...t,outputCount:i});if(pe.webgpu.validateInputContent&&eE(n,o),t.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");e.compute(tE(n,o))}}),l0=N(()=>{"use strict";fe(),ge(),rE=e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")},oE=e=>{let t=e[0].dims,n=e[0].dims[2],i=D.size(t)/4,o=e[0].dataType,a=L("input",o,t,4),s=L("bias",o,[n],4),u=L("residual",o,t,4),l=F("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:e=>`
  const channels = ${n}u / 4;
  ${e.declareVariables(a,s,u,l)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},u0=e=>{rE(e.inputs),e.compute(oE(e.inputs))}}),Ua=N(()=>{"use strict";ue(),fe(),Je(),ge(),iE=(e,t,n,i,o,a,s)=>{let u=Math.ceil(t/4),l="";l="string"==typeof o?`${o}(a)`:o("a");let d=L("inputData",n,[u],4),p=F("outputData",i,[u],4),c=[{name:"vec_size",type:"u32"}];return s&&c.push(...s),`
      ${e.registerUniforms(c).declareVariables(d,p)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",l)}
  }`},De=(e,t,n,i,o,a=e.dataType,s,u)=>{let l=[{type:12,data:Math.ceil(D.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:t=>iE(t,D.size(e.dims),e.dataType,a,n,i,u),getRunData:t=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(D.size(t[0].dims)/64/4)},programUniforms:l})}},c0=e=>{e.compute(De(e.inputs[0],"Abs","abs"))},d0=e=>{e.compute(De(e.inputs[0],"Acos","acos"))},p0=e=>{e.compute(De(e.inputs[0],"Acosh","acosh"))},f0=e=>{e.compute(De(e.inputs[0],"Asin","asin"))},h0=e=>{e.compute(De(e.inputs[0],"Asinh","asinh"))},m0=e=>{e.compute(De(e.inputs[0],"Atan","atan"))},g0=e=>{e.compute(De(e.inputs[0],"Atanh","atanh"))},b0=e=>le(e),y0=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(De(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},aE=e=>{let t,n,i=e.length>=2&&0!==e[1].data,o=e.length>=3&&0!==e[2].data;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,n=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,n=o?e[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return le({min:t,max:n})},_0=(e,t)=>{let n=t||aE(e.inputs),i=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"Clip",e=>`clamp(${e}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},w0=e=>{e.compute(De(e.inputs[0],"Ceil","ceil"))},v0=e=>{e.compute(De(e.inputs[0],"Cos","cos"))},x0=e=>{e.compute(De(e.inputs[0],"Cosh","cosh"))},Uo=e=>le(e),T0=(e,t)=>{let n=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"Elu",e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
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
}`,I0=e=>{let t=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"Erf",e=>`erf_vf32(${e})`,Ga(t)))},S0=e=>{e.compute(De(e.inputs[0],"Exp","exp"))},$0=e=>{e.compute(De(e.inputs[0],"Floor","floor"))},A0=e=>{let t=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"Gelu",e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,Ga(t)))},O0=(e,t)=>{let n=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"LeakyRelu",e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},P0=e=>{e.compute(De(e.inputs[0],"Not",e=>`!${e}`))},E0=e=>{e.compute(De(e.inputs[0],"Neg",e=>`-${e}`))},C0=e=>{e.compute(De(e.inputs[0],"Reciprocal",e=>`1.0/${e}`))},D0=e=>{let t=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"Relu",e=>`select(vec4<${t}>(0.0), ${e}, ${e} > vec4<${t}>(0.0))`))},k0=e=>{e.compute(De(e.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},N0=e=>le(e),L0=(e,t)=>{let n=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"HardSigmoid",e=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${e} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},R0=e=>{e.compute(De(e.inputs[0],"Sin","sin"))},z0=e=>{e.compute(De(e.inputs[0],"Sinh","sinh"))},M0=e=>{e.compute(De(e.inputs[0],"Sqrt","sqrt"))},B0=e=>{e.compute(De(e.inputs[0],"Tan","tan"))},F0=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,V0=e=>{e.compute(De(e.inputs[0],"Tanh",F0))},$c=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${F0("v")};
}
`,Ac=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,G0=e=>{let t=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"FastGelu",Ac,$c(t),void 0,e.inputs[0].dataType))},U0=(e,t)=>{let n=at(e.inputs[0].dataType);return e.compute(De(e.inputs[0],"ThresholdedRelu",e=>`select(vec4<${n}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},W0=e=>{e.compute(De(e.inputs[0],"Log","log"))},sE=(e,t)=>`
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
`,uE=e=>`quick_gelu_impl(${e})`,H0=(e,t)=>{let n=at(e.inputs[0].dataType);e.compute(De(e.inputs[0],"QuickGelu",uE,sE(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),K0=N(()=>{"use strict";fe(),ge(),Ua(),lE=e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")},cE=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=L("input",e[0].dataType,e[0].dims,4),i=L("bias",e[0].dataType,[e[0].dims[2]],4),o=F("output",e[0].dataType,t,4),a=D.size(t)/4,s=Me(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:t=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${t.declareVariables(n,i,o)}

  ${Ga(s)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},j0=e=>{lE(e.inputs),e.compute(cE(e.inputs))}}),iw=N(()=>{"use strict";ue(),fe(),ge(),dE=(e,t,n,i,o,a,s,u,l,d,p,c)=>{let h,f;"string"==typeof u?h=f=(e,t)=>`${u}((${e}),(${t}))`:"function"==typeof u?h=f=u:(h=u.scalar,f=u.vector);let m=F("outputData",p,i.length,4),g=L("aData",l,t.length,4),b=L("bData",d,n.length,4),y;if(o)if(a){let e=1===D.size(t),i=1===D.size(n),o=t.length>0&&t[t.length-1]%4==0,a=n.length>0&&n[n.length-1]%4==0;y=e||i?m.setByOffset("global_idx",f(e?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),i?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"))):`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${b.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(s||o?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||a?b.getByOffset("offsetB / 4u"):`${b.type.value}(${b.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=m.setByOffset("global_idx",f(g.getByOffset("global_idx"),b.getByOffset("global_idx")));else{if(!a)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let e=(e,t,n="")=>{let i=`aData[indexA${t}][componentA${t}]`,o=`bData[indexB${t}][componentB${t}]`;return`
            let outputIndices${t} = ${m.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offsetA${t} = ${g.broadcastedIndicesToOffset(`outputIndices${t}`,m)};
            let offsetB${t} = ${b.broadcastedIndicesToOffset(`outputIndices${t}`,m)};
            let indexA${t} = offsetA${t} / 4u;
            let indexB${t} = offsetB${t} / 4u;
            let componentA${t} = offsetA${t} % 4u;
            let componentB${t} = offsetB${t} % 4u;
            ${e}[${t}] = ${n}(${h(i,o)});
          `};y=9===p?`
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
        ${e.registerUniform("vec_size","u32").declareVariables(g,b,m)}

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`},pE=(e,t,n,i,o,a,s=n.dataType)=>{let u=n.dims.map(Number),l=i.dims.map(Number),d=!D.areEqual(u,l),p=u,c=D.size(u),h=!1,f=!1,m=[d];if(d){let e=Un.calcShape(u,l,!1);if(!e)throw Error("Can't perform binary op on the given tensors");p=e.slice(),c=D.size(p);let t=1===D.size(u),n=1===D.size(l),i=u.length>0&&u[u.length-1]%4==0,o=l.length>0&&l[l.length-1]%4==0;m.push(t),m.push(n),m.push(i),m.push(o);let a=1;for(let e=1;e<p.length;e++){let t=u[u.length-e];if(t===l[l.length-e])a*=t;else break}a%4==0?(f=!0,h=!0):(t||n||i||o)&&(h=!0)}else h=!0;return m.push(h),{name:e,shaderCache:{hint:t+m.map(e=>e.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:e=>dE(e,u,l,p,h,d,f,o,n.dataType,i.dataType,s,a),getRunData:()=>({outputs:[{dims:p,dataType:s}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(D.size(p)/4)},...U(u,l,p)]})}},Kn=(e,t,n,i,o,a)=>{e.compute(pE(t,o??"",e.inputs[0],e.inputs[1],n,i,a))},X0=e=>{Kn(e,"Add",(e,t)=>`${e}+${t}`)},Z0=e=>{Kn(e,"Div",(e,t)=>`${e}/${t}`)},J0=e=>{Kn(e,"Equal",{scalar:(e,t)=>`u32(${e}==${t})`,vector:(e,t)=>`vec4<u32>(${e}==${t})`},void 0,void 0,9)},Q0=e=>{Kn(e,"Mul",(e,t)=>`${e}*${t}`)},Y0=e=>{let t=L("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Kn(e,"Pow",{scalar:(e,t)=>`pow_custom(${e},${t})`,vector:(e,t)=>`pow_vector_custom(${e},${t})`},`
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
      `)},ew=e=>{Kn(e,"Sub",(e,t)=>`${e}-${t}`)},tw=e=>{Kn(e,"Greater",{scalar:(e,t)=>`u32(${e}>${t})`,vector:(e,t)=>`vec4<u32>(${e}>${t})`},void 0,void 0,9)},nw=e=>{Kn(e,"Less",{scalar:(e,t)=>`u32(${e}<${t})`,vector:(e,t)=>`vec4<u32>(${e}<${t})`},void 0,void 0,9)},rw=e=>{Kn(e,"GreaterOrEqual",{scalar:(e,t)=>`u32(${e}>=${t})`,vector:(e,t)=>`vec4<u32>(${e}>=${t})`},void 0,void 0,9)},ow=e=>{Kn(e,"LessOrEqual",{scalar:(e,t)=>`u32(${e}<=${t})`,vector:(e,t)=>`vec4<u32>(${e}<=${t})`},void 0,void 0,9)}}),uw=N(()=>{"use strict";ue(),fe(),Je(),ge(),hE=(e,t)=>{if(!e||e.length<1)throw Error("too few inputs");let n=0,i=e[0],o=i.dataType,a=i.dims.length;e.forEach((e,s)=>{if(s!==n){if(e.dataType!==o)throw Error("input tensors should be one type");if(e.dims.length!==a)throw Error("input tensors should have the same shape");e.dims.forEach((e,n)=>{if(n!==t&&e!==i.dims[n])throw Error("non concat dimensions must match")})}})},mE=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,gE=(e,t)=>{let n=e.length,i=[];for(let o=0;o<n;++o){let a=t.setByOffset("global_idx",e[o].getByIndices("indices"));1===n?i.push(a):0===o?i.push(`if (inputIndex == ${o}u) { ${a} }`):o===n-1?i.push(`else { ${a} }`):i.push(`else if (inputIndex == ${o}) { ${a} }`)}return i.join(`
`)},bE=(e,t,n,i)=>{let o=D.size(n),a=Array(e.length),s=Array(e.length),u=0,l=[],d=[],p=[{type:12,data:o}];for(let n=0;n<e.length;++n)u+=e[n].dims[t],a[n]=u,d.push(e[n].dims.length),s[n]=L(`input${n}`,i,d[n]),l.push("rank"),p.push({type:12,data:a[n]});for(let t=0;t<e.length;++t)p.push(...U(e[t].dims));p.push(...U(n));let c=F("output",i,n.length),h=c.indicesGet("indices",t),f=Array.from(Array(a.length).keys()).map(e=>`uniforms.sizeInConcatAxis${e}`).join(",");return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:t=>`

  ${(()=>{t.registerUniform("outputSize","u32");for(let n=0;n<e.length;n++)t.registerUniform(`sizeInConcatAxis${n}`,"u32");return t.declareVariables(...s,c)})()}

  ${mE(a.length,f)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${f});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${gE(s,c)}
  }`}},aw=(e,t)=>{let n=e.inputs,i=n[0].dims,o=D.normalizeAxis(t.axis,i.length);hE(n,o);let a=i.slice();a[o]=n.reduce((e,t)=>e+(t.dims.length>o?t.dims[o]:0),0);let s=n.filter(e=>D.size(e.dims)>0);e.compute(bE(s,o,a,n[0].dataType),{inputs:s})},sw=e=>le({axis:e.axis})}),wr=N(()=>{"use strict";ue(),fe(),Zt=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${e.activation}`)}},Jt=(e,t)=>{"Clip"===e.activation?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):"HardSigmoid"===e.activation?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):"LeakyRelu"===e.activation&&t.push({type:1,data:e.alpha})},Qt=(e,t)=>{"Clip"===e.activation?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===e.activation?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===e.activation&&t.push({name:"alpha",type:"f32"})},Wa=e=>{let t=e?.activation||"";if("HardSigmoid"===t){let[n,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:i}}if("Clip"===t){let[n,i]=e?.activation_params||[m_,g_];return{activation:t,clipMax:i,clipMin:n}}if("LeakyRelu"===t){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}}),Ha=N(()=>{"use strict";ot=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw Error(`${e}-component is not supported.`)}},lw=e=>`
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
`}),ja=N(()=>{"use strict";ue(),fe(),ge(),wr(),Wo=(e,t,n,i,o)=>{let a=i-n;return`
      ${Array.from({length:n}).map((n,s)=>`
      if (${Z(t.shape,s,t.rank)} != 1) {
        ${t.indicesSet(e,s,Z(o,s+a,i))}
      } else {
        ${t.indicesSet(e,s,0)}
      }`).join("")}
`},qa=(e,t,n,i,o=!1,a)=>{let s=e[0].dims,u=e[1].dims,l=s[s.length-2],d=u[u.length-1],p=s[s.length-1],c=Pe(d),h=Pe(p),f=Pe(l),m=D.size(n)/c/f,g=e.length>2,b=i?i.slice(0,-2):n.slice(0,-2),y=[D.size(b),l,d],_=[{type:12,data:m},{type:12,data:l},{type:12,data:d},{type:12,data:p}];Jt(t,_),_.push(...U(b,s,u)),g&&_.push(...U(e[2].dims)),_.push(...U(y));let v=i=>{let a=Ma("batch_dims",e[0].dataType,b.length),l=L("a",e[0].dataType,s.length,h),d=L("b",e[1].dataType,u.length,c),p=F("output",e[0].dataType,y.length,c),m=Me(p.type.tensor),_=Zt(t,p.type.value,m),v=[l,d],x="";if(g){let t=o?c:1;v.push(L("bias",e[2].dataType,e[2].dims.length,t)),x=`${o?`value += bias[col / ${t}];`:`value += ${p.type.value}(bias[row + i]);`}`}let w=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Qt(t,w);let $=()=>{let e=`var a_data: ${l.type.value};`;for(let t=0;t<h;t++)e+=`
              let b_data${t} = b[(b_offset + (k + ${t}) * uniforms.N + col) / ${c}];`;for(let t=0;t<f;t++){e+=`a_data = a[(a_offset + (row + ${t}) * uniforms.K + k) / ${h}];`;for(let n=0;n<h;n++)e+=`
            values[${t}] = fma(${d.type.value}(a_data${1===h?"":`[${n}]`}), b_data${n}, values[${t}]);
`}return e};return`
  ${i.registerUniforms(w).registerInternalVariables(a).declareVariables(...v,p)}
  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${2===n.length?"":`let batch_indices = ${a.offsetToIndices("batch")};`}

    var a_indices: ${l.type.indices};
    ${Wo("a_indices",l,l.rank-2,a.rank,"batch_indices")}
    ${l.indicesSet("a_indices",l.rank-2,0)}
    ${l.indicesSet("a_indices",l.rank-1,0)}
    let a_offset = ${l.indicesToOffset("a_indices")};

    var b_indices: ${d.type.indices};
    ${Wo("b_indices",d,d.rank-2,a.rank,"batch_indices")}
    ${d.indicesSet("b_indices",d.rank-2,0)}
    ${d.indicesSet("b_indices",d.rank-1,0)}
    let b_offset = ${d.indicesToOffset("b_indices")};
    var values: array<${p.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${$()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${x}
      ${_}
      let cur_indices = ${p.type.indices}(batch, row + i, col);
      let offset = ${p.indicesToOffset("cur_indices")};
      ${p.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${c};${h};${f};${o}`,inputDependencies:g?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:_}),getShaderSource:v}}}),Ka=N(()=>{"use strict";ue(),fe(),ge(),wr(),ja(),Ha(),yE=(e,t)=>e?`
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
        }`,Oc=(e,t,n="f32",i,o=!1,a=32,s=!1,u=32)=>{let l=t[1]*e[1],d=t[0]*e[0],p=o?l:a,c=o?a:l,h=p/t[0],f=a/t[1];if(!((o&&4===h&&4===e[1]||!o&&(3===h||4===h))&&p%t[0]==0&&a%t[1]==0&&4===e[0]))throw Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${n}>, ${p/h}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${d/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${h};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${f};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${yE(o,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${3===h?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${_E(o,h)}
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
            `,wE=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Pc=(e,t,n="f32",i,o=!1,a=32,s=!1,u=32,l=!1)=>{let d=e[1]*t[1],p=e[0]*t[0],c=o?d:a,h=o?a:d;if(h%t[1]!=0||c%t[0]!=0||a%t[1]!=0)throw Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let f=h/t[1],m=c/t[0],g=a/t[1],b=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${pw(o,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
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
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${f};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${g};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${pw(o,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${wE(o)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${c}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${p}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${b}
  }
`},vE=(e,t,n,i,o=!1)=>{let[a,s,u,l]=i,d=Me(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${ot(e,d)} {
      var value = ${ot(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${Wo("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${ot(e,d)} {
      var value = ${ot(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${Wo("bIndices",u,u.rank-2,a.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ot(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${ot(e,d)}(bias[row])`};`:""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Ho=(e,t,n,i,o=!1,a)=>{let s=e[0].dims,u=e[1].dims,l=s.slice(0,-2),d=u.slice(0,-2),p=i?i.slice(0,-2):n.slice(0,-2),c=D.size(p),h=s[s.length-2],f=s[s.length-1],m=u[u.length-1],g=f%4==0&&m%4==0,b=h<=8?[4,1,1]:[4,4,1],y=[8,8,1],_=[Math.ceil(m/y[0]/b[0]),Math.ceil(h/y[1]/b[1]),Math.ceil(c/y[2]/b[2])],v=g?4:1,x=[...l,h,f/v],w=x.length,$=[...d,f,m/v],T=$.length,I=[c,h,m/v],S=[{type:6,data:h},{type:6,data:m},{type:6,data:f}];Jt(t,S),S.push(...U(p,x,$));let O=["rank","rank"],E=e.length>2;E&&(S.push(...U(e[2].dims)),O.push("rank")),S.push(...U(I));let A=n=>{let i=p.length,a=Ma("batchDims",e[0].dataType,i,1),s=Me(e[0].dataType),u=L("a",e[0].dataType,w,v),l=L("b",e[1].dataType,T,v),d=F("result",e[0].dataType,I.length,v),c=[u,l];if(E){let t=o?v:1;c.push(L("bias",e[2].dataType,e[2].dims.length,t))}let h=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Qt(t,h);let f=Me(d.type.tensor),m=vE(v,E,Zt(t,d.type.value,f),[a,u,l,d],o);return`
  ${n.registerUniforms(h).registerInternalVariables(a).declareVariables(...c,d)}
  ${m}
  ${g?Oc(b,y,s,a):Pc(b,y,s,a)}
                   `};return{name:"MatMul",shaderCache:{hint:`${b};${t.activation};${g};${o}`,inputDependencies:O},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:S}),getShaderSource:A}}}),hw=N(()=>{"use strict";ue(),Gn(),ge(),wr(),Ha(),dw(),Ka(),xE=(e,t,n,i,o=!1,a,s=4,u=4,l=4,d="f32")=>{let p=e=>{switch(e){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw Error(`innerElementSize ${e} is not supported.`)}},c=e=>{switch(e){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${e} is not supported.`)}},h=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,f=e?`
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
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",g=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",b=e?"row":"col",y=e?"col":"row",_=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${b} / outWidth;
    let outCol = ${b} % outWidth;

    let WRow = ${y} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${y} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${y} % inChannels;
    var resData = ${ot(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${g}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${p(s)}
    }
    return resData;`,v=e?t&&i?`
    let col = colIn * ${s};
    ${_}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${_}
    }
    return ${ot(s,d)}(0.0);`:i&&n?`
    let col = colIn * ${s};
    ${_}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${ot(s,d)}(0.0);`,x=e?i&&n?c(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${c(u)}
    }
    return ${ot(u,d)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${c(u)}
    }
    return ${ot(u,d)}(0.0);`,w=ot(l,d),$=e?ot(s,d):ot(u,d),T=e?ot(u,d):ot(s,d),I=Zt(a,w,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${$} {
      ${e?v:x}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${T} {
      ${e?x:v}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${w}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${f}
      ${lw(o)}
      ${I}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},fw=(e,t,n,i,o,a,s,u,l)=>{let d="NHWC"===t.format,p=d?e[0].dims[3]:e[0].dims[1],c=n[0],h=d?n[2]:n[3],f=d?n[1]:n[2],m=d?n[3]:n[1],g=d&&(p%4==0||p%3==0)&&m%4==0,b=d?m:h*f,y=d?h*f:m,_=[8,8,1],v=i<=8?[4,1,1]:[4,4,1],x=[Math.ceil(b/_[0]/v[0]),Math.ceil(y/_[1]/v[1]),Math.ceil(c/_[2]/v[2])];be("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${x}`);let w=g?d&&p%4!=0?3:4:1,$=_[1]*v[1],T=_[0]*v[0],I=Math.max(_[0]*w,_[1]),S=i%$==0,O=o%T==0,E=a%I==0,A=g?[w,4,4]:[1,1,1],P=[{type:6,data:i},{type:6,data:o},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Jt(t,P),P.push(...U(e[0].dims,e[1].dims));let k=["rank","rank"];s&&(P.push(...U(e[2].dims)),k.push("rank")),P.push(...U(n));let C=i=>{let o=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Qt(t,o);let a=g?4:1,l=Me(e[0].dataType),p=`
      fn setOutputAtIndex(flatIndex : i32, value : ${g?`vec4<${l}>`:l}) {
        result[flatIndex] = ${g?`vec4<${l}>`:l}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${g?`vec4<${l}>`:l}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${g?"/ 4":""}, value);
      }`,c=[L("x",e[0].dataType,e[0].dims.length,3===w?1:w),L("w",e[1].dataType,e[1].dims.length,a)],h=F("result",e[0].dataType,n.length,a);if(s){let t=L("bias",e[2].dataType,e[2].dims.length,a);c.push(t),p+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${g?`vec4<${l}>`:l} {
          return bias[coords.${d?"w":"y"}${g?"/ 4":""}];
        }`}return`
        ${cw("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${i.registerUniforms(o).declareVariables(...c,h)}
        ${p}
        ${xE(d,S,O,E,s,t,A[0],A[1],A[2],l)}
        ${g?Oc(v,_,l,void 0,!d,I):Pc(v,_,l,void 0,!d,I,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${w};${g};${S};${O};${E};${$};${T};${I}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:P}),getShaderSource:C}}}),_w=N(()=>{"use strict";ue(),Gn(),fe(),ge(),wr(),Ha(),TE=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},mw=e=>"number"==typeof e?[e,e,e]:e,Xa=(e,t)=>t<=1?e:e+(e-1)*(t-1),IE=(e,t,n,i=1)=>{let o=Xa(t,i);return Math.floor((e[0]*(n-1)-n+o)/2)},gw=(e,t,n,i,o)=>{null==o&&(o=IE(e,t[0],i[0]));let a=[0,0,0,n];for(let n=0;n<3;n++)e[n]+2*o>=t[n]&&(a[n]=Math.trunc((e[n]-t[n]+2*o)/i[n]+1));return a},SE=(e,t,n,i,o,a,s,u,l,d)=>{let p,c,h,f;if("VALID"===e&&(e=0),"number"==typeof e){p={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=gw([t,n,i,1],[u,l,d],1,[o,a,s],e);c=m[0],h=m[1],f=m[2]}else if(Array.isArray(e)){if(!e.every((e,t,n)=>e===n[0]))throw Error(`Unsupported padding parameter: ${e}`);p={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=gw([t,n,i,1],[u,l,d],1,[o,a,s],e[0]);c=m[0],h=m[1],f=m[2]}else if("SAME_UPPER"===e){c=Math.ceil(t/o),h=Math.ceil(n/a),f=Math.ceil(i/s);let e=(c-1)*o+u-t,m=(h-1)*a+l-n,g=(f-1)*s+d-i,b=Math.floor(e/2),y=e-b,_=Math.floor(m/2),v=m-_,x=Math.floor(g/2),w=g-x;p={top:_,bottom:v,left:x,right:w,front:b,back:y}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:p,outDepth:c,outHeight:h,outWidth:f}},bw=(e,t,n,i,o,a=!1,s="channelsLast")=>{let u,l,d,p,c;if("channelsLast"===s)[u,l,d,p,c]=e;else if("channelsFirst"===s)[u,c,l,d,p]=e;else throw Error(`Unknown dataFormat ${s}`);let[h,,f,m,g]=t,[b,y,_]=mw(n),[v,x,w]=mw(i),$=Xa(f,v),T=Xa(m,x),I=Xa(g,w),{padInfo:S,outDepth:O,outHeight:E,outWidth:A}=SE(o,l,d,p,b,y,_,$,T,I),P=a?h*c:h,k=[0,0,0,0,0];return"channelsFirst"===s?k=[u,P,O,E,A]:"channelsLast"===s&&(k=[u,O,E,A,P]),{batchSize:u,dataFormat:s,inDepth:l,inHeight:d,inWidth:p,inChannels:c,outDepth:O,outHeight:E,outWidth:A,outChannels:P,padInfo:S,strideDepth:b,strideHeight:y,strideWidth:_,filterDepth:f,filterHeight:m,filterWidth:g,effectiveFilterDepth:$,effectiveFilterHeight:T,effectiveFilterWidth:I,dilationDepth:v,dilationHeight:x,dilationWidth:w,inShape:e,outShape:k,filterShape:t}},yw=(e,t,n,i,o,a)=>{let s="channelsLast"===a,u=s?e[0].dims[3]:e[0].dims[1],l=!1,d=[64,1,1],p=[Math.ceil(TE(({x:n.map((e,t)=>t)}).x.map(e=>n[e]))/d[0]),1,1];be("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let c=l?s&&u%4!=0?3:4:1,h=[{type:12,data:D.size(n)},{type:12,data:i},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Jt(t,h),h.push(...U(e[0].dims,e[1].dims));let f=["rank","rank"],m=3===e.length;m&&(h.push(...U(e[2].dims)),f.push("rank")),h.push(...U(n));let g=a=>{let u=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Qt(t,u);let d=l?4:1,p=Me(e[0].dataType),h=L("x",e[0].dataType,e[0].dims.length,3===c?1:c),f=L("W",e[1].dataType,e[1].dims.length,d),g=[h,f],b=F("result",e[0].dataType,n.length,d),y="";if(m){let t=L("bias",e[2].dataType,e[2].dims.length,d);g.push(t),y+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${p}>`:p} {
          return bias[${s?Z("coords",4,5):Z("coords",1,5)}${l?"/ 4":""}];
        }`}let _=ot(c,p),v=Zt(t,_,p);return`
            ${y}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${h.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${f.getByIndices("aIndices")};
            }
          ${a.registerUniforms(u).declareVariables(...g,b)}
          ${a.mainStart()}
          ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${b.offsetToIndices("global_idx")};
              let batch = ${Z("coords",0,h.rank)};
              let d2 = ${s?Z("coords",h.rank-1,h.rank):Z("coords",1,h.rank)};
              let xFRCCorner = vec3<u32>(${s?Z("coords",1,h.rank):Z("coords",2,h.rank)},
              ${s?Z("coords",2,h.rank):Z("coords",3,h.rank)},
              ${s?Z("coords",3,h.rank):Z("coords",4,h.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?Z("uniforms.x_shape",1,h.rank):Z("uniforms.x_shape",2,h.rank)};
              let xShapeZ = ${s?Z("uniforms.x_shape",2,h.rank):Z("uniforms.x_shape",3,h.rank)};
              let xShapeW = ${s?Z("uniforms.x_shape",3,h.rank):Z("uniforms.x_shape",4,h.rank)};
              let xShapeU = ${s?Z("uniforms.x_shape",4,h.rank):Z("uniforms.x_shape",1,h.rank)};
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
                      ${s?`let xValues = vec4<f32>(
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
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
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
                      ${s?`let xValues = vec3<f32>(
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
              ${m?"value = value + getBiasByOutputCoords(coords)":""};
              ${v}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${c};${m}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:h}),getShaderSource:g}}}),xw=N(()=>{"use strict";ue(),fe(),ge(),wr(),ww=(e,t,n,i)=>{let o=e.length>2,a=o?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,l="NHWC"===t.format,d=l?n[3]:n[1],p=d/t.group,c=l&&p>=4?Pe(d):1,h=D.size(n)/c,f=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:p}];Jt(t,f),f.push(...U(s,[u[0],u[1],u[2],u[3]/c]));let m=o?["rank","rank","rank"]:["rank","rank"];f.push(...U([n[0],n[1],n[2],n[3]/c]));let g=i=>{let d=F("output",e[0].dataType,n.length,c),p=Me(d.type.tensor),h=Zt(t,d.type.value,p),f=L("x",e[0].dataType,s.length),m=L("w",e[1].dataType,u.length,c),g=[f,m];o&&g.push(L("b",e[2].dataType,e[2].dims,c));let b=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Qt(t,b);let y=l?`
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
            let xVal = ${f.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${m.get("wHeight","wWidth","wInChannel","output_channel")};
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

            let xVal = ${f.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${m.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${i.registerUniforms(b).declareVariables(...g,d)}

  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${d.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${d.type.value} = ${d.type.value}(0);
    ${y}
    ${a}
    ${h}
    ${d.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${c}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:g}},vw=(e,t,n,i)=>{let o=e.length>2,a=Pe(n[3]),s=Pe(n[2]),u=D.size(n)/a/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],p=[n[0],n[1],n[2],n[3]/a],c=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Jt(t,c),c.push(...U(l,d,p));let h=(s-1)*t.strides[1]+d[1],f=n=>{let i=F("output",e[0].dataType,p.length,a),u=Me(i.type.tensor),c=Zt(t,i.type.value,u),f=L("x",e[0].dataType,l.length,a),m=L("w",e[1].dataType,d.length,a),g=[f,m];o&&g.push(L("b",e[2].dataType,e[2].dims,a));let b=o?"value += b[output_channel];":"",y=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Qt(t,y),`
  ${n.registerUniforms(y).declareVariables(...g,i)}
  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${f.type.value}, ${h}>;
    var values: array<${i.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${f.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${f.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${m.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${b}
      ${c}
      ${i.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${h};${d[0]};${d[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:f}}}),Iw=N(()=>{"use strict";fe(),hw(),_w(),Ka(),xw(),wr(),ja(),Yn(),$E=(e,t,n,i,o,a)=>{let s=e[0],u=e.slice(a?1:2,a?3:4),l=u.length,d=t[0],p=t.slice(2).map((e,t)=>e+(e-1)*(n[t]-1)),c=u.map((e,t)=>e+i[t]+i[t+l]).map((e,t)=>Math.floor((e-p[t]+o[t])/o[t]));return c.splice(0,0,s),c.splice(a?3:1,0,d),c},Ec=[2,3,1,0],AE=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.length!==2*n)throw Error(`pads should be ${2*n}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape")},Cc=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let e=2;e<t[1].dims.length;++e)0===n[e-2]&&(n[e-2]=t[1].dims[e]);let i=e.pads.slice();Gr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,i,"NHWC"===e.format,e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:n,pads:i}),o},Dc=e=>{let t=Wa(e),n=e.format;return{autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],format:n,dilations:e.dilations,group:e.group,kernelShape:e.kernel_shape,pads:e.pads,strides:e.strides,wIsConst:e.w_is_const(),...t,cacheKey:`${e.format};${t.activation};`}},Tw=(e,t,n,i)=>{let o="NHWC"===n.format,a=$E(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,o);if(1!==n.group){let s=[t[0]];if(o){let i=e.kernelCustomData.wT??e.compute(st(t[1],Ec),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i),s.push(i)}else s.push(t[1]);3===t.length&&s.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===n.group&&1===t[1].dims[1]&&1===n.dilations[0]&&1===n.dilations[1]?e.compute(vw(s,n,a,i),{inputs:s}):e.compute(ww(s,n,a,i),{inputs:s});return}let s=3===t.length,u=t[0].dims[o?1:2],l=t[0].dims[o?2:3],d=t[0].dims[o?3:1],p=t[1].dims[2],c=t[1].dims[3],h=a[o?1:2],f=a[o?2:3],m=a[o?3:1],g=o&&p===u&&c===l&&0===n.pads[0]&&0===n.pads[1];if(g||1===p&&1===c&&1===n.dilations[0]&&1===n.dilations[1]&&1===n.strides[0]&&1===n.strides[1]&&0===n.pads[0]&&0===n.pads[1]){let p=a[0],c,b,y,_=[];if(o){let i=e.kernelCustomData.wT??e.compute(st(t[1],Ec),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i),g){let e=u*l*d;c=t[0].reshape([1,p,e]),b=i.reshape([1,e,m]),y=[1,p,m]}else c=t[0].reshape([p,u*l,d]),b=i.reshape([1,d,m]),y=[p,h*f,m];_.push(c),_.push(b)}else c=t[0].reshape([p,d,u*l]),b=t[1].reshape([1,m,d]),y=[p,m,h*f],_.push(b),_.push(c);s&&_.push(t[2]);let v=y[2],x=_[0].dims[_[0].dims.length-1];v<8&&x<8?e.compute(qa(_,n,a,y,o,i),{inputs:_}):e.compute(Ho(_,n,a,y,o,i),{inputs:_});return}let b=!0,y=e.kernelCustomData.wT??e.compute(st(t[1],Ec),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=y);let _=[t[0],y];s&&_.push(t[2]);let v=o?h*f:m,x=o?m:h*f,w=p*c*d;e.compute(fw(_,n,a,v,x,w,s,b,i),{inputs:_})},OE=(e,t)=>{let n="NHWC"===t.format,i=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];3===e.inputs.length&&i.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=Cc({...t,pads:o,strides:a,dilations:s,kernelShape:u},i);Tw(e,i,l,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},PE=(e,t,n)=>{let i="NHWC"===n.format?"channelsLast":"channelsFirst",o=Cc(n,t),a="NOTSET"===n.autoPad?n.pads:n.autoPad,s=bw(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,i);e.compute(yw(t,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},kc=(e,t)=>{if(AE(e.inputs,t),3===e.inputs[0].dims.length)OE(e,t);else if(5===e.inputs[0].dims.length)PE(e,e.inputs,t);else{let n=Cc(t,e.inputs);Tw(e,e.inputs,n)}}}),$w=N(()=>{"use strict";ue(),Gn(),fe(),ge(),Sw=(e,t,n)=>{let i=e.length>2,o=t.outputShape,a="NHWC"===t.format,s=t.group,u=e[1].dims,l=u[2]/s,d=u[3],p=a?Pe(l):1,c=a&&1===d&&l>=4,h=c?4*Math.floor(l/4):Math.floor(l/p)*p,f=l-h,m=a?Pe(d):1,g=a?1===d?p:m:1,b=D.size(o)/m,y=[Math.ceil(b/64),1,1];be("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${y}`);let _=["rank","rank"],v=[t.strides[0],t.strides[1]],x=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],w=[t.dilations[0],t.dilations[1]],$=[x[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),x[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],T=[$[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),$[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],I=[{type:12,data:b},{type:12,data:v},{type:12,data:x},{type:12,data:w},{type:12,data:$},{type:6,data:T},{type:12,data:h},{type:12,data:l},{type:12,data:d},...U(e[0].dims,e[1].dims)];i&&(I.push(...U(e[2].dims)),_.push("rank")),I.push(...U(o));let S=t=>{let n=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:v.length},{name:"filter_dims",type:"u32",length:x.length},{name:"dilations",type:"u32",length:x.length},{name:"effective_filter_dims",type:"u32",length:$.length},{name:"pads",type:"i32",length:T.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],s=Me(e[0].dataType),u=a?1:2,l=a?2:3,d=a?3:1,h=L("W",e[1].dataType,e[1].dims.length,g),b=L("Dy",e[0].dataType,e[0].dims.length,p),y=[b,h];i&&y.push(L("bias",e[2].dataType,[o[d]].length,m));let _=F("result",e[0].dataType,o.length,m),w=()=>{let e="";if(c)4===p?e+=`
        let xValue = ${b.getByOffset("x_offset")};
        let wValue = ${h.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:2===p?e+=`
          dotProd = dotProd + dot(vec4<${s}>(${b.getByOffset("x_offset")}, ${b.getByOffset("x_offset + 1u")}), vec4<${s}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:1===p&&(e+=`
          dotProd = dotProd + dot(vec4<${s}>(${b.getByOffset("x_offset")}, ${b.getByOffset("x_offset + 1u")}, ${b.getByOffset("x_offset + 2u")}, ${b.getByOffset("x_offset + 3u")}), vec4<${s}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}, ${h.getByOffset("w_offset + 2u")}, ${h.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(e+=`
                  let xValue = ${a?b.getByOffset(`${b.indicesToOffset(`${b.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):b.get("batch","inputChannel","idyR","idyC")};
        `,1===p)e+=`
          let w_offset = ${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${h.getByOffset(`w_offset / ${g}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let t=0;t<p;t++)e+=`
            let wValue${t} = ${h.getByOffset(`${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${t}, wOutChannel)`)} / ${g}`)};
            dotProd = dotProd + xValue[${t}] * wValue${t};`;return e},I=()=>{if(0===f)return"";if(!c)throw Error(`packInputAs4 ${c} is not true.`);let e="";if(1===p){e+="dotProd = dotProd";for(let t=0;t<f;t++)e+=`
            + ${b.getByOffset(`x_offset + ${t}`)} * ${h.getByOffset(`w_offset + ${t}`)}`;e+=";"}else if(2===p){if(2!==f)throw Error(`Invalid inputChannelsRemainder ${f}.`);e+=`
          let xValue = ${b.getByOffset("x_offset")};
          let wValue = ${h.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return e},S=`
            let outputIndices = ${_.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${_.indicesGet("outputIndices",0)};
            let d1 = ${_.indicesGet("outputIndices",d)};
            let r = ${_.indicesGet("outputIndices",u)};
            let c = ${_.indicesGet("outputIndices",l)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${_.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${s}(dyRCorner) + ${s}(wR)) / ${s}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[${u}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${s}(dyCCorner) + ${s}(wC)) / ${s}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[${l}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${c?`
                var x_offset = ${b.indicesToOffset(`${b.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${h.indicesToOffset(`${h.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${g};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${c?4:p}) {
                  ${w()}
                  inputChannel = inputChannel + ${c?4:p};
                }
                ${I()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${m}]`:""};
            ${_.setByOffset("global_idx","value")};
          `;return`
    ${t.registerUniforms(n).declareVariables(...y,_)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${S}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${p}${g}${m}${c}${f}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:y[0],y:y[1],z:y[2]},outputs:[{dims:n?n(o):o,dataType:e[0].dataType}],programUniforms:I}),getShaderSource:S}}}),Cw=N(()=>{"use strict";$w(),wr(),Yn(),EE=(e,t,n,i,o,a)=>(e-1)*t+n+(i-1)*o+1-a,CE=(e,t,n,i,o)=>{let a=Math.floor(e/2);"SAME_UPPER"===t?(n[i]=a,n[o]=e-a):"SAME_LOWER"===t&&(n[i]=e-a,n[o]=a)},DE=(e,t,n,i,o,a,s,u,l,d)=>{let p=e.length-2,c=0===d.length;l.length<p&&l.push(...Array(p-l.length).fill(0));let h=e[0],f=t[u?3:1]*o;for(let o=0,h=e.length-p-!!u;o<p;++o,++h){let u=e[h],f=c?u*s[o]:d[o];CE(EE(u,s[o],a[o],t[h],n[o],f),i,a,o,o+p),c&&d.push(s[o]*(u-1)+l[o]+(t[h]-1)*n[o]+1-a[o]-a[o+p])}d.splice(0,0,h),d.splice(u?3:1,0,f)},Aw=(e,t)=>{let n=e.kernelShape.slice();if(0===e.kernelShape.length||0===e.kernelShape.reduce((e,t)=>e*t,1)){n.length=0;for(let e=2;e<t[1].dims.length;++e)n.push(t[1].dims[e])}let i="NHWC"===e.format;n.splice(0,0,t[1].dims[0]),n.splice(i?3:1,0,t[1].dims[1]);let o=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();0===l.reduce((e,t)=>e+t,0)&&(l=Array(t[0].dims.length-2).fill(1));let d=e.strides.slice();0===d.reduce((e,t)=>e+t,0)&&(d=Array(t[0].dims.length-2).fill(1)),DE(u,n,l,e.autoPad,e.group,o,d,i,s,a);let p=Object.assign({},e);return Object.assign(p,{kernelShape:n,pads:o,outputPadding:s,outputShape:a,dilations:l,strides:d}),p},Ow=e=>{let t=Wa(e),n=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,a=e.group??1,s=e.kernelShape,u=e.pads,l=e.strides,d=e.wIsConst();return{autoPad:i,format:n,dilations:o,group:a,kernelShape:s,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:u,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},kE=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length&&3!==e[0].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==n))throw Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((e,t)=>e+t,0)>0&&t.dilations.length!==i)throw Error(`dilations should be ${i}D`);if(t.strides.reduce((e,t)=>e+t,0)>0&&t.strides.length!==i)throw Error(`strides should be ${i}D`);if(t.pads.reduce((e,t)=>e+t,0)>0&&t.pads.length!==2*i)throw Error(`pads should be ${2*i}D`);if(t.outputPadding.length!==i&&0!==t.outputPadding.length)throw Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((e,t)=>e+t,0)>0&&0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape")},Pw=(e,t,n,i)=>{let o=e.kernelCustomData.wT??e.compute(st(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let a=[t[0],o];3===t.length&&a.push(t[2]),e.compute(Sw(a,n,i),{inputs:a})},NE=(e,t)=>{let n="NHWC"===t.format,i=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];3===e.inputs.length&&i.push(e.inputs[2]);let o=t.kernelShape;(0===o.length||0===o[0])&&(o=[e.inputs[1].dims[2]]);let a=t.dilations;(0===a.length||0===a[0])&&(a=[1]);let s=t.strides;(0===s.length||0===s[0])&&(s=[1]);let u=t.pads;0===u.length&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),a=[1].concat(a),o=[1].concat(o);let l=t.outputPadding;l=[0].concat(l);let d=Aw({...t,pads:u,strides:s,dilations:a,kernelShape:o,outputPadding:l},i);Pw(e,i,d,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},Ew=(e,t)=>{if(kE(e.inputs,t),3===e.inputs[0].dims.length)NE(e,t);else{let n=Aw(t,e.inputs);Pw(e,e.inputs,n)}}}),Nw=N(()=>{"use strict";ue(),fe(),Je(),ge(),LE=(e,t,n,i)=>{let o=D.size(t),a=t.length,s=L("input",e,a),u=F("output",e,a),l=6===n.dataType?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),d=D.normalizeAxis(l,a),p=e=>{let t=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,n=Z("uniforms.input_shape","uniforms.axis",a),o=i.reverse?t+(i.exclusive?" + 1":""):"0",l=i.reverse?n:t+(i.exclusive?"":" + 1");return`
                ${e.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${o};
                  let last : i32 = ${l};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:d},...U(t,t)]}),getShaderSource:p}},Dw=(e,t)=>{let n=e.inputs[0].dims,i=e.inputs[0].dataType,o=e.inputs[1];e.compute(LE(i,n,o,t),{inputs:[0]})},kw=e=>{let t=1===e.exclusive,n=1===e.reverse;return le({exclusive:t,reverse:n})}}),zw=N(()=>{"use strict";ue(),fe(),Je(),ge(),RE=e=>{if(!e||1!==e.length)throw Error("DepthToSpace requires 1 input.");if(4!==e[0].dims.length)throw Error("DepthToSpace requires 4D input.")},zE=(e,t,n,i)=>{let o=[];o.push(`fn perm(i: ${i.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<t;++i)o.push(n.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},ME=(e,t)=>{let n,i,o,a,s,u,l="NHWC"===t.format,d=t.blocksize,p="DCR"===t.mode;l?([n,i,o,a]=e.dims,s=p?[n,i,o,d,d,a/d**2]:[n,i,o,a/d**2,d,d],u=p?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,i,o,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=p?[n,d,d,a/d**2,i,o]:[n,a/d**2,d,d,i,o],u=p?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=e.reshape(s),h=c.dims.length,f=e.dataType,m=L("a",f,h),g=F("output",f,h),b=e=>`
  ${e.registerUniform("output_size","u32").declareVariables(m,g)}

  ${zE(u,h,m,g)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${g.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${g.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:e=>{let t=l?[n,i*d,o*d,a/d**2]:[n,a/d**2,i*d,o*d],s=D.size(t),p=c.dims,h=D.sortBasedOnPerm(p,u);return{outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...U(p,h)]}},getShaderSource:b}},Lw=(e,t)=>{RE(e.inputs),e.compute(ME(e.inputs[0],t))},Rw=e=>le({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Gw=N(()=>{"use strict";ue(),fe(),Je(),ge(),Mw="^"+(Za="("+(Nc="[a-zA-Z]|\\.\\.\\.")+")+")+"$",FE="^"+("("+Za+",)*")+Za+"$",Lc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);void 0===n?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},Rc=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[n,i]=t.includes("->")?t.split("->",2):[t,""];if(!n.match(RegExp(FE)))throw Error("Invalid LHS term");if(n.split(",").forEach((t,n)=>{let i=e[n].dims.slice();if(!t.match(RegExp(Mw)))throw Error("Invalid LHS term");let o=this.processTerm(t,!0,i,n);this.lhs.push(o)}),""===i)i+=[...this.symbolToInfo.entries()].filter(([e,t])=>1===t.count||"..."===e).map(([e])=>e).join("");else if(!i.match(RegExp(Za)))throw Error("Invalid RHS");i.match(RegExp(Nc,"g"))?.forEach(e=>{if("..."===e)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let t=this.symbolToInfo.get(e);if(void 0===t)throw Error("Invalid RHS symbol");this.outputDims.push(t.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,n){let i=this.symbolToInfo.get(e);if(void 0!==i){if(i.dimValue!==t&&1!==i.count)throw Error("Dimension mismatch");i.count++,i.inputIndices.push(n)}else i={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,i)}processTerm(e,t,n,i=-1){let o=n.length,a=!1,s=[],u=0;if(!e.match(RegExp(Mw))&&!t&&""!==e)throw Error("Invalid LHS term");let l=e.match(RegExp(Nc,"g")),d=new Lc(i);return l?.forEach((e,p)=>{if("..."===e){if(a)throw Error("Only one ellipsis is allowed per input term");a=!0;let e=o-l.length+1;if(e<0)throw Error("Ellipsis out of bounds");if(s=n.slice(u,u+e),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw Error("Ellipsis must be specified in the LHS");for(let e=0;e<s.length;e++){let t=String.fromCharCode(48+e);d.addSymbol(t,p+e),this.addSymbol(t,n[u++],i)}}else d.addSymbol(e,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,n[u++],i)}),d}},Bw=e=>e+"_max",VE=(e,t,n,i)=>{let o=e.map(e=>e.length).map((e,n)=>L(`input${n}`,t,e)),a=D.size(i),s=F("output",t,i.length),u=[...n.symbolToInfo.keys()].filter(e=>!n.rhs.symbolToIndices.has(e)),l=e=>{let t=[],i="var prod = 1.0;",a="var sum = 0.0;",l="sum += prod;",d=[],p=[],c=[],h=[],f=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((e,i)=>{if(n.rhs.symbolToIndices.has(i)){let a=n.rhs.symbolToIndices.get(i)?.[0];void 0!==a&&n.lhs.forEach((n,u)=>{if(e.inputIndices.includes(u)){let e=n.symbolToIndices.get(i);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{t.push(`${o[u].indicesSet(`input${u}Indices`,e,s.indicesGet("outputIndices",a))}`)})}})}else n.lhs.forEach((t,n)=>{if(e.inputIndices.includes(n)){let e=t.symbolToIndices.get(i);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{d.push(`${o[n].indicesSet(`input${n}Indices`,e,`${i}`)}`)}),h.push(`prod *= ${o[n].getByIndices(`input${n}Indices`)};`)}}),p.push(`for(var ${i}: u32 = 0; ${i} < uniforms.${Bw(i)}; ${i}++) {`),c.push("}")});let m=f?[...t,`let sum = ${o.map((e,t)=>e.getByIndices(`input${t}Indices`)).join(" * ")};`]:[...t,a,...p,...d,i,...h,l,...c];return`
            ${e.registerUniforms(u.map(e=>({name:`${Bw(e)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...o,s)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${o.map((e,t)=>`var input${t}Indices: ${o[t].type.indices};`).join(`
`)}
            ${m.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let o=u.filter(e=>n.symbolToInfo.has(e)).map(e=>({type:12,data:n.symbolToInfo.get(e)?.dimValue||0}));o.push({type:12,data:a});let s=e.map((e,t)=>[...U(e)]).reduce((e,t)=>e.concat(t),o);return s.push(...U(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s}},getShaderSource:l}},Fw=(e,t)=>{let n=new Rc(e.inputs,t.equation),i=n.outputDims,o=e.inputs.map((e,t)=>e.dims);e.compute(VE(o,e.inputs[0].dataType,n,i))},Vw=e=>{let t=e.equation.replace(/\s+/g,"");return le({equation:t})}}),Hw=N(()=>{"use strict";ue(),fe(),ge(),GE=e=>{if(!e||2!==e.length)throw Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),i=n.length<t.length?0:n.length-t.length,o=t.length<n.length?0:t.length-n.length;for(;i<n.length&&o<t.length;++i,++o)if(n[i]!==t[o]&&1!==n[i]&&1!==t[o])throw Error("Expand requires shape to be broadcastable to input")},Uw=(e,t)=>{let n=e.length-t.length,i=[];for(let t=0;t<n;++t)i.push(e[t]);for(let o=0;o<t.length;++o)i.push(1===t[o]?e[o+n]:t[o]);return i},UE=(e,t)=>e.length>t.length?Uw(e,t):Uw(t,e),WE=e=>{let t=e[0].dims,n=UE(t,Array.from(e[1].getBigInt64Array(),Number)),i=e[0].dataType,o=9===i||1===D.size(t),a=9===i||t.length>0&&t[t.length-1]%4==0?4:1,s=o||n.length>0&&n[n.length-1]%4==0?4:1,u=Math.ceil(D.size(n)/s),l=e=>{let o=L("input",i,t.length,a),u=F("output",i,n.length,s),l;if(9===i){let e=(e,t,n="")=>`
          let outputIndices${t} = ${u.offsetToIndices(`outputOffset + ${t}u`)};
          let offset${t} = ${o.broadcastedIndicesToOffset(`outputIndices${t}`,u)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${n}(${o.getByOffset(`index${t}`)}[component${t}]);
        `;l=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${e("data",0,"u32")}
        ${e("data",1,"u32")}
        ${e("data",2,"u32")}
        ${e("data",3,"u32")}
        ${u.setByOffset("global_idx","data")}
      }`}else l=`
        let outputIndices = ${u.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${o.broadcastedIndicesToOffset("outputIndices",u)};
        let data = ${u.type.value}(${o.getByOffset(`inputOffset / ${a}`)});
        ${u.setByOffset("global_idx","data")}
      }`;return`
    ${e.registerUniform("vec_size","u32").declareVariables(o,u)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${l}`},d=[{type:12,data:u},...U(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${a}${s}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d})}},Ww=e=>{GE(e.inputs),e.compute(WE(e.inputs),{inputs:[0]})}}),jw=N(()=>{"use strict";ue(),fe(),ge(),Ua(),HE=e=>{let t=e[0].dataType,n=D.size(e[0].dims),i=D.size(e[1].dims),o=i%4==0,a=e=>{let n=L("x",t,[1],4),i=L("bias",t,[1],4),a=F("y",t,[1],4),s=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],u=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${i.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,l=o?`
      let bias = ${i.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${u(0)}${u(1)}${u(2)}${u(3)}
      let bias = ${n.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms(s).declareVariables(n,i,a)}

    ${$c(at(t))}

    ${e.mainStart(Ur)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${n.getByOffset("global_idx")};
      ${l}
      let x_in = x + bias;
      ${a.setByOffset("global_idx",Ac("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(n/Ur/4)}})}},qw=e=>{e.inputs.length<2||0===D.size(e.inputs[1].dims)?G0(e):e.compute(HE(e.inputs))}}),Zw=N(()=>{"use strict";ue(),fe(),Je(),ge(),qE=e=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.")},jE=(e,t)=>{let n=e[0].dims,i=e[1].dims,o=n.length,a=D.normalizeAxis(t.axis,o),s=n.slice(0);s.splice(a,1,...i);let u=n[a],l=9===e[0].dataType?4:1,d=Math.ceil(D.size(s)/l),p=[{type:12,data:d},{type:6,data:u},{type:12,data:a},...U(e[0].dims,e[1].dims,s)],c=t=>{let n=L("data",e[0].dataType,e[0].dims.length,l),u=L("inputIndices",e[1].dataType,e[1].dims.length),d=F("output",e[0].dataType,s.length,l),p=e=>{let t=i.length,l=`var indicesIndices${e}  = ${u.type.indices}(0);`;for(let n=0;n<t;n++)l+=`${t>1?`indicesIndices${e}[${n}]`:`indicesIndices${e}`} = ${s.length>1?`outputIndices${e}[uniforms.axis + ${n}]`:`outputIndices${e}`};`;l+=`
          var idx${e} = ${u.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${n.type.indices};
        `;for(let n=0,i=0;n<o;n++)n===a?(l+=`${o>1?`dataIndices${e}[${n}]`:`dataIndices${e}`} = u32(idx${e});`,i+=t):(l+=`${o>1?`dataIndices${e}[${n}]`:`dataIndices${e}`} = ${s.length>1?`outputIndices${e}[${i}]`:`outputIndices${e}`};`,i++);return l},c;if(9===e[0].dataType){let e=(e,t,i="")=>`
          let outputIndices${t} = ${d.offsetToIndices(`outputOffset + ${t}u`)};
          ${p(t)};
          let offset${t} = ${n.indicesToOffset(`dataIndices${t}`)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${i}(${n.getByOffset(`index${t}`)}[component${t}]);
        `;c=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${e("value",0,"u32")}
        ${e("value",1,"u32")}
        ${e("value",2,"u32")}
        ${e("value",3,"u32")}
        ${d.setByOffset("global_idx","value")}
      `}else c=`
      let outputIndices = ${d.offsetToIndices("global_idx")};
      ${p("")};
      let value = ${n.getByIndices("dataIndices")};
      ${d.setByOffset("global_idx","value")};
      `;return`
      ${t.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(n,u,d)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${c}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:c}},Kw=e=>le({axis:e.axis}),Xw=(e,t)=>{qE(e.inputs),e.compute(jE(e.inputs,t))}}),Yw=N(()=>{"use strict";ue(),fe(),ge(),KE=(e,t,n,i,o,a,s,u,l)=>{let d=[{type:12,data:a},{type:12,data:i},{type:12,data:o},{type:12,data:n},{type:12,data:s},{type:12,data:u},{type:12,data:l}],p=[a];d.push(...U(t.dims,p));let c=e=>{let i=[L("indices_data",t.dataType,t.dims.length),F("input_slice_offsets_data",12,1,1)],a=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${e.registerUniforms(a).declareVariables(...i)}
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
      ${1===n.length?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:c},{inputs:[t],outputs:[-1]})[0]},Jw=(e,t)=>{let n=e.inputs,i=n[0].dims,o=n[0].dataType,a=n[1].dims,s=a[a.length-1],u=D.sizeToDimension(a,a.length-1),l=D.sizeFromDimension(i,t.batchDims+s),d=D.sizeToDimension(i,t.batchDims),p=D.sizeFromDimension(i,t.batchDims),c=u/d,h=Array(s),f=l;for(let e=0;e<s;++e)h[s-1-e]=f,f*=i[t.batchDims+s-1-e];let m=KE(e,n[1],h,t.batchDims,i,u,c,p,s),g=t.batchDims+s;if(g>i.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let b=a.slice(0,-1).concat(i.slice(g)),y=D.size(b),_=[{type:12,data:y},{type:12,data:l},...U(n[0].dims,m.dims,b)],v=e=>{let t=L("data",n[0].dataType,n[0].dims.length),i=L("slice_offsets",12,m.dims.length),o=F("output",n[0].dataType,b.length);return`
          ${e.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(t,i,o)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:b,dataType:o}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:v},{inputs:[n[0],m]})},Qw=e=>({batchDims:e.batch_dims,cacheKey:""})}),nv=N(()=>{"use strict";ue(),fe(),Je(),ge(),XE=(e,t)=>{if(e.length<3||e.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=D.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,o=e[0],a=e[2],s=4===e.length?e[3]:void 0;if(a.dims.length!==o.dims.length||!o.dims.map((e,t)=>t===n?Math.ceil(e/i)===a.dims[t]:e===a.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((e,t)=>e===a.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},ZE=(e,t)=>{let n=e[0].dims,i=e[1].dims,o=n.length,a=D.normalizeAxis(t.gatherAxis,o),s=D.normalizeAxis(t.quantizeAxis,o),u=n.slice(0);u.splice(a,1,...i);let l=D.size(u),d=e[2].dataType,p=22===e[0].dataType,c=[{type:12,data:l},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...U(...e.map((e,t)=>e.dims),u)],h=t=>{let o=L("data",e[0].dataType,e[0].dims.length),s=L("inputIndices",e[1].dataType,e[1].dims.length),l=L("scales",e[2].dataType,e[2].dims.length),c=e.length>3?L("zeroPoint",e[3].dataType,e[3].dims.length):void 0,h=F("output",d,u.length),f=[o,s,l];c&&f.push(c);let m=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${t.registerUniforms(m).declareVariables(...f,h)}
        ${t.mainStart()}
        let output_indices = ${h.offsetToIndices("global_idx")};
        var indices_indices = ${s.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${h.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${s.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${h.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${o.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${h.indicesGet("output_indices","i")};
          ${o.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${s.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[a]};
        }
        ${o.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${h.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${o.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${o.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${o.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${l.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${l.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${l.getByIndices("scale_indices")};
        ${c?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${c.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${c.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${at(d)}(quantized_data - zero_point) * scale;
        ${h.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((e,t)=>1!==t).map(e=>e.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(e,t)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:h}},ev=(e,t)=>{XE(e.inputs,t),e.compute(ZE(e.inputs,t))},tv=e=>le({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),iv=N(()=>{"use strict";ue(),fe(),Je(),ge(),JE=e=>{if(!e||2!==e.length)throw Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},QE=(e,t)=>{let n=e[0].dims,i=e[0].dataType,o=n.length,a=e[1].dims,s=e[1].dataType,u=D.normalizeAxis(t.axis,o),l=n[u],d=a.slice(0),p=D.size(d),c=L("input",i,o),h=L("indicesInput",s,a.length),f=F("output",i,d.length),m=[{type:12,data:p},{type:6,data:l},{type:12,data:u}];return m.push(...U(n,a,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m}),getShaderSource:e=>`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,h,f)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${f.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${f.setByOffset("global_idx","value")};
  }`}},rv=e=>le({axis:e.axis}),ov=(e,t)=>{JE(e.inputs),e.compute(QE(e.inputs,t))}}),uv=N(()=>{"use strict";ue(),fe(),ge(),YE=e=>{if(!e)throw Error("Input is missing");if(e.length<2||e.length>3)throw Error("Invaid input number.");if(3===e.length&&e[2].dims.length>2)throw Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||3===e.length&&e[0].dataType!==e[2].dataType)throw Error("Input types are mismatched")},eC=(e,t)=>{let n=e[0].dims.slice(),i=e[1].dims.slice(),[o,a,s]=Ea.getShapeOfGemmResult(n,t.transA,i,t.transB,3===e.length?e[2].dims:void 0),u=[o,a];if(!u)throw Error("Can't use gemm on the given tensors");let l=16,d=Math.ceil(a/16),p=Math.ceil(o/16),c=!0,h=D.size(u),f=[{type:12,data:c?d:h},{type:12,data:o},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],m=["type","type"];3===e.length&&(f.push(...U(e[2].dims)),m.push("rank")),f.push(...U(u));let g=n=>{let i="";t.transA&&t.transB?i="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?i="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?i="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":t.transA||t.transB||(i="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let o=1===t.alpha?"":"value *= uniforms.alpha;",a=L("a",e[0].dataType,e[0].dims),s=L("b",e[1].dataType,e[1].dims),l=a.type.value,d=null,p=[a,s];3===e.length&&(d=L("c",e[2].dataType,e[2].dims.length),p.push(d));let c=F("output",e[0].dataType,u.length);p.push(c);let h=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${n.registerUniforms(h).declareVariables(...p)}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${l}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${i}
    }

    ${o}
    ${null!=d?`let cOffset = ${d.broadcastedIndicesToOffset("vec2(m, n)",c)}; value += ${l}(uniforms.beta) * ${d.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},b=n=>{let i=L("a",e[0].dataType,e[0].dims),o=L("b",e[1].dataType,e[1].dims),a=null,s=[i,o];3===e.length&&(a=L("c",e[2].dataType,e[2].dims.length),s.push(a));let d=F("output",e[0].dataType,u.length);s.push(d);let p=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],c="",h="";t.transA&&t.transB?(h=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${i.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${o.type.value}(0);
      }
      `,c="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(h=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${i.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${o.type.value}(0);
      }
      `,c="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(h=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${i.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${o.type.value}(0);
      }
      `,c="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):t.transA||t.transB||(h=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${i.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${o.type.value}(0);
      }
      `,c="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let f=1===t.alpha?"":"value *= uniforms.alpha;";return`
  ${n.registerUniforms(p).declareVariables(...s)}
  var<workgroup> tile_a: array<array<${i.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${o.type.storage}, ${l}>, ${l}>;
  ${n.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${d.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${h}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${c}
      }
      workgroupBarrier();
    }

    ${f}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${null!=a?`let cOffset = ${a.broadcastedIndicesToOffset("vec2(m, n)",d)}; value += ${d.type.value}(uniforms.beta) * ${a.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return c?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:d*p},programUniforms:f}),getShaderSource:b}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:g}},av=e=>({transA:e.transA,transB:e.transB,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${1===e.alpha}`}),sv=(e,t)=>{YE(e.inputs),e.compute(eC(e.inputs,t))}}),dv=N(()=>{"use strict";ue(),fe(),Je(),ge(),[er,vr,co,po]=[0,1,2,3],tC=e=>{if(4!==e[0].dims.length)throw Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw Error("grid batch size must match input batch size")},nC=`
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
`,aC=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${er}] = batch;
     indices[${vr}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
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
        `;default:throw Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,sC=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
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
        `;default:throw Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,uC=(e,t)=>{let n=L("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=L("grid",e[1].dataType,i.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];"NHWC"===t.format&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[er,vr,co,po]=[0,3,1,2]);let s=F("output",e[0].dataType,a.length),u=n.type.value,l=[{type:12,data:D.size(a)},...U(e[0].dims,i,a)],d=e=>`
  ${e.registerUniform("output_size","u32").declareVariables(n,o,s)}
  ${nC}
  ${rC(u)}
  ${oC(t)}
  ${iC(t)}
  ${aC(n,u,t)}

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

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${er}], indices[${co}], indices[${po}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${sC(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:e=>{let t=D.size(a);return{outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:l}},getShaderSource:d}},lv=(e,t)=>{tC(e.inputs),e.compute(uC(e.inputs,t))},cv=e=>le({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),zc=N(()=>{"use strict";ue(),fe(),Je(),Ra(),Va(),ge(),Yn(),Tt=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,dC=(e,t)=>{let n,i=e[0],o=Tt(e,1),a=Tt(e,2),s=Tt(e,3),u=Tt(e,4),l=Tt(e,5),d=Tt(e,6),p=Tt(e,7);if(3!==i.dims.length&&5!==i.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let c=i.dims[0],h=i.dims[1],f=3===i.dims.length?i.dims[2]:t.numHeads*i.dims[4],m=h,g=0,b=0,y=Math.floor(f/t.numHeads);if(d&&p&&D.size(d.dims)&&D.size(p.dims)){if(4!==d.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==c||d.dims[1]!==t.numHeads||d.dims[3]!==y)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==c||p.dims[1]!==t.numHeads||p.dims[3]!==y)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==p.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');g=d.dims[2],b=d.dims[2]}else if(d&&D.size(d.dims)||p&&D.size(p.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(o&&D.size(o.dims)>0){if(3!==i.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(o.dims.length<3||o.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==o.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===o.dims.length){if(o.dims[2]!==i.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');n=2,m=o.dims[1]}else if(5===o.dims.length){if(o.dims[2]!==t.numHeads||2!==o.dims[3]||o.dims[4]!==y)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw Error('Expect "value" be none when "key" has packed kv format.');n=5,m=o.dims[1]}else{if(o.dims[1]!==t.numHeads||o.dims[3]!==y)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');n=0,m=o.dims[2]}}else{if(5!==i.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(i.dims[2]!==t.numHeads||3!==i.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');n=3}if(s&&D.size(s.dims)>0){if(1!==s.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(o&&5===o.dims.length&&2===o.dims[3])throw Error("bias is not allowed for packed kv.")}let _=g+m,v=0;if(u&&D.size(u.dims)>0){v=8;let e=u.dims;throw 1===e.length?e[0]===c?v=1:e[0]===3*c+2&&(v=3):2===e.length&&e[0]===c&&e[1]===_&&(v=5),8===v?Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):Error("Mask not supported")}let x=!1,w=f;if(a&&D.size(a.dims)>0){if(3!==a.dims.length&&4!==a.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==a.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===a.dims.length){if(m!==a.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');w=a.dims[2]}else{if(m!==a.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');w=a.dims[1]*a.dims[3],x=!0}}let $=!1;if(u&&D.size(u.dims)>0)throw Error("Key padding mask is not supported");if(l&&D.size(l.dims)>0){if(4!==l.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[2]!==h||l.dims[3]!==_)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:h,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:_,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:f,vHiddenSize:w,headSize:y,vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:$,passPastInKv:x,qkvFormat:n}},fv=e=>le({...e}),pv=le({perm:[0,2,1,3]}),pC=(e,t,n,i,o,a,s)=>{let u=[i,o,a],l=D.size(u),d=[{type:12,data:l},{type:12,data:s},{type:12,data:a}],p=e=>{let i=F("qkv_with_bias",t.dataType,u),o=L("qkv",t.dataType,u),a=L("bias",n.dataType,u),s=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${e.registerUniforms(s).declareVariables(o,a,i)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:p},{inputs:[t,n],outputs:[-1]})[0]},qo=(e,t,n,i,o,a,s,u)=>{let l=a;if(!(s&&D.size(s.dims)>0))return 3===a.dims.length&&(l=a.reshape([t,i,n,o])),1===n||1===i?l:e.compute(st(l,pv.perm),{inputs:[l],outputs:[-1]})[0];if(1===i)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=(l=pC(e,a,s,t,i,n*o,u)).reshape([t,i,n,o]),1===n||1===i?l:e.compute(st(l,pv.perm),{inputs:[l],outputs:[-1]})[0]},hv=(e,t)=>{let n=dC(e.inputs,t),i=e.inputs[0],o=Tt(e.inputs,1),a=Tt(e.inputs,2),s=Tt(e.inputs,3),u=Tt(e.inputs,4),l=Tt(e.inputs,5),d=Tt(e.inputs,6),p=Tt(e.inputs,7);if(5===i.dims.length)throw Error("Packed QKV is not implemented");if(o?.dims.length===5)throw Error("Packed KV is not implemented");let c=o&&a&&4===o.dims.length&&4===a.dims.length,h=qo(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,i,s,0);if(c)return lo(e,h,o,a,u,void 0,d,p,l,n);if(!o||!a)throw Error("key and value must be provided");let f=qo(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),m=qo(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,s,2*n.hiddenSize);lo(e,h,f,m,u,void 0,d,p,l,n)}}),Bc=N(()=>{"use strict";ue(),fe(),Je(),ge(),fC=e=>{if(!e||e.length<1)throw Error("too few inputs")},hC=(e,t)=>{let n=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(e=>n.push(Number(e))),i=n.length),le({numOutputs:i,axis:t.axis,splitSizes:n})},mC=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${Z("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,gC=e=>{let t=e.length,n=[];for(let i=0;i<t;++i){let o=e[i].setByIndices("indices","input[global_idx]");1===t?n.push(o):0===i?n.push(`if (output_number == ${i}u) { ${o} }`):i===t-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${i}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},Mc=(e,t)=>{let n=e[0].dims,i=D.size(n),o=e[0].dataType,a=D.normalizeAxis(t.axis,n.length),s=Array(t.numOutputs),u=L("input",o,n.length),l=Array(t.numOutputs),d=[],p=[],c=0,h=[{type:12,data:i}];for(let i=0;i<t.numOutputs;i++){c+=t.splitSizes[i],l[i]=c;let u=n.slice();u[a]=t.splitSizes[i],p.push(u),s[i]=F(`output${i}`,o,u.length),d.push({dims:p[i],dataType:e[0].dataType})}h.push({type:12,data:l},...U(n,...p));let f=e=>`
  ${e.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...s)}
  ${mC(l.length)}
  ${gC(s)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Z("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:f,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:h})}},mv=(e,t)=>{fC(e.inputs);let n=1===e.inputs.length?t:hC(e.inputs,t);e.compute(Mc(e.inputs,n),{inputs:[0]})},gv=e=>{let t=e.axis,n=e.splitSizes,i=e.numOutputs<0?n.length:e.numOutputs;if(i!==n.length)throw Error("numOutputs and splitSizes length must be equal");return le({axis:t,numOutputs:i,splitSizes:n})}}),Fc=N(()=>{"use strict";ue(),fe(),Je(),ge(),bC=(e,t)=>{let[n,i,o,a]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(3!==n.dims.length&&4!==n.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!D.areEqual(i.dims,[])&&!D.areEqual(i.dims,[1])&&2!==i.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(2!==o.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(2!==a.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!D.areEqual(o.dims,a.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&0===s)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let l=n.dims[0],d=n.dims[n.dims.length-2],p=o.dims[0],c=D.sizeFromDimension(n.dims,1)/d,h=0===u?2*o.dims[1]:c/s;if(u>h)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===i.dims.length){if(l!==i.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(d!==i.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(h/2!==o.dims[1]&&u/2!==o.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(d>p)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Ja=(e,t)=>{let{interleaved:n,numHeads:i,rotaryEmbeddingDim:o,scale:a}=t,s=e[0].dims[0],u=D.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=u/l,p=e[2].dims[1],c=0===o?2*p:d/i,h=[s,l,d/c,c-p],f=D.computeStrides(h),m=[{type:1,data:a},{type:12,data:h},{type:12,data:f},...3===e[0].dims.length?Array({type:12,data:[u,d,c,1]}):[],...4===e[0].dims.length?Array({type:12,data:[u,c,l*c,1]}):[],...U(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],g=t=>{let i=L("input",e[0].dataType,e[0].dims.length),o=L("position_ids",e[1].dataType,e[1].dims.length),a=L("cos_cache",e[2].dataType,e[2].dims.length),s=L("sin_cache",e[3].dataType,e[3].dims.length),u=F("output",e[0].dataType,e[0].dims.length);return t.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${t.declareVariables(i,o,a,s,u)}

        ${t.mainStart(Ur)}
          let half_rotary_emb_dim = uniforms.${a.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${o.broadcastedIndicesToOffset("bsnh.xy",F("",o.type.tensor,2))};
            let position_id =
                u32(${o.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${i.getByOffset("i")} * ${a.get("position_id","bsnh[3]")} -
                ${i.getByOffset("j")} * ${s.get("position_id","bsnh[3]")};
            ${u.setByOffset("i","re")}
            let im = ${i.getByOffset("i")} * ${s.get("position_id","bsnh[3]")} +
                ${i.getByOffset("j")} * ${a.get("position_id","bsnh[3]")};
            ${u.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${u.setByOffset("k",i.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:le({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(h)/Ur)},programUniforms:m})}},bv=(e,t)=>{bC(e.inputs,t),e.compute(Ja(e.inputs,t))}}),wv=N(()=>{"use strict";Je(),ue(),Va(),zc(),Bc(),Yn(),Fc(),ge(),yC=(e,t)=>{if(t.doRotary&&e.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],i=e[1],o=e[2],a=e[3],s=e[4];if(0!==t.doRotary&&e.length<=7)throw Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(-1!==t.localWindowSize)throw Error("Local attention is not supported");if(0!==t.softcap)throw Error("Softcap is not supported");if(0!==t.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==n.dims.length&&5!==n.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=n.dims[0],d=n.dims[1],p=3===n.dims.length?u?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],c=d,h=0,f=!i||0===i.dims.length,m=Math.floor(f?p/(t.numHeads+2*t.kvNumHeads):p/t.numHeads);f&&(p=m*t.numHeads);let g=a&&0!==a.dims.length,b=s&&0!==s.dims.length;if(g&&4===a.dims.length&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===m)throw Error("BSNH pastKey/pastValue is not supported");if(g&&b){if(4!==a.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==s.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');h=a.dims[2]}else if(g||b)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let y=1;if(i&&i.dims.length>0){if(3!==n.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==i.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===i.dims.length){if(n.dims[2]%i.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');c=i.dims[1]}else if(5===i.dims.length){if(i.dims[2]!==t.numHeads||2!==i.dims[3]||i.dims[4]!==m)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw Error('Expect "value" be none when "key" has packed kv format.');c=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==m)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');c=i.dims[2]}}else{if(3!==n.dims.length&&5!==n.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===n.dims.length&&(n.dims[2]!==t.numHeads||3!==n.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}let _=0,v=!1,x=t.kvNumHeads?m*t.kvNumHeads:p;if(o&&o.dims.length>0){if(3!==o.dims.length&&4!==o.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===o.dims.length){if(c!==o.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');x=o.dims[2]}else{if(c!==o.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');x=o.dims[1]*o.dims[3],v=!0}}let w=e.length>4?e[5]:void 0;if(w&&1!==w.dims.length&&w.dims[0]!==l)throw Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:d,pastSequenceLength:h,kvSequenceLength:c,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:p,vHiddenSize:x,headSize:m,vHeadSize:Math.floor(x/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:v,qkvFormat:y}},_C=le({perm:[0,2,1,3]}),yv=(e,t,n)=>{let i=t,o=n.kvNumHeads;return 3===t.dims.length&&0!==n.kvSequenceLength&&(i=t.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),i=e.compute(st(i,_C.perm),{inputs:[i],outputs:[-1]})[0]),i},wC=(e,t,n,i)=>{let o=7,a=[e*t],s=e*t,u=[{type:12,data:s},{type:12,data:t},{type:12,data:e}];return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u}),getShaderSource:e=>{let t=L("seq_lens",n.dataType,n.dims),s=L("total_seq_lens",i.dataType,i.dims),u=F("pos_ids",o,a),l=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${e.registerUniforms(l).declareVariables(t,s,u)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${s.getByOffset("0")});
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
      ${u.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${u.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${u.setByOffset("global_idx","seqlen")}
    };
  }
  `}}},_v=(e,t)=>{let n=yC(e.inputs,t);if(5===e.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let i=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&0!==e.inputs[3].dims.length?e.inputs[3]:void 0,u=e.inputs[4]&&0!==e.inputs[4].dims.length?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,p=n.kvNumHeads?n.kvNumHeads:n.numHeads,c=le({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,p*n.headSize,p*n.headSize]}),[h,f,m]=o||a?[i,o,a]:e.compute(Mc([i],c),{inputs:[i],outputs:[-1,-1,-1]}),g,b;if(t.doRotary){let i=e.compute(wC(n.batchSize,n.sequenceLength,l,d),{inputs:[l,d],outputs:[-1]})[0],o=e.inputs[7],a=e.inputs[8],s=le({interleaved:0!==t.rotaryInterleaved,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),u=[h,i,o,a],p=[-1];g=e.compute(Ja(u,s),{inputs:u,outputs:p})[0],u.splice(0,1,f);let c=le({interleaved:0!==t.rotaryInterleaved,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});b=e.compute(Ja(u,c),{inputs:u,outputs:p})[0]}let y=qo(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?g:h,void 0,0),_=yv(e,t.doRotary?b:f,n),v=yv(e,m,n);lo(e,y,_,v,void 0,void 0,s,u,void 0,n,l,d)}}),Tv=N(()=>{"use strict";ue(),fe(),Yn(),ge(),vv=(e,t,n,i,o,a,s,u)=>{let l=Pe(a),d=1===l?"f32":`vec${l}f`,p=1===l?"vec2f":`mat2x${l}f`,c=o*s,h=64;1===c&&(h=256);let f=[o,s,a/l],m=[o,s,2],g=["rank","type","type"],b=[];b.push(...U(f,m));let y=e=>{let o=L("x",t.dataType,3,l),a=[o,L("scale",n.dataType,n.dims),L("bias",i.dataType,i.dims),F("output",1,3,2)];return`
  var<workgroup> workgroup_shared : array<${p}, ${h}>;
  const workgroup_size = ${h}u;
  ${e.declareVariables(...a)}
  ${e.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${o.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${p}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Xt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Xt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${h}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:c},programUniforms:b}),getShaderSource:y},{inputs:[t,n,i],outputs:[-1]})[0]},vC=(e,t,n)=>{let i=t[0].dims,o=i,a=2,s=i[0],u=i[1],l=D.sizeFromDimension(i,a),d=Pe(l),p=D.size(o)/d,c=vv(e,t[0],t[1],t[2],s,l,u,n.epsilon),h=[s,u,l/d],f=[s,u],m=["type","none"],g=e=>{let n=L("x",t[0].dataType,h.length,d),i=L("scale_shift",1,f.length,2),o=F("output",t[0].dataType,h.length,d),a=[n,i,o];return`
  ${e.registerUniform("output_size","u32").declareVariables(...a)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${o.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${i.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${n.getByOffset("global_idx")} * ${o.type.value}(scale_shift.x) + ${o.type.value}(scale_shift.y);
      ${o.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...U(h,f,h)]}),getShaderSource:g},{inputs:[t[0],c]})},xC=(e,t,n)=>{let i=t[0].dims,o=i,a=i[0],s=i[i.length-1],u=D.sizeFromDimension(i,1)/s,l=Pe(s),d=D.size(o)/l,p=[{type:12,data:u},{type:12,data:Math.floor(s/l)}],c=["type","type"],h=!1,f=[0,i.length-1];for(let e=0;e<i.length-2;e++)h=h||1!==i[e+1],f.push(e+1);let m=(h=h&&1!==i[i.length-1])?e.compute(st(e.inputs[0],f),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(e,t)=>i[f[t]])),g=vv(e,m,t[1],t[2],a,u,s,n.epsilon),b=e=>{let n=Me(t[0].dataType),i=1===l?"vec2f":`mat${l}x2f`,a=e=>{let t=0===e?"x":"y",i=1===l?"f32":`vec${l}f`;switch(l){case 1:return`${n}(${i}(scale.${t}))`;case 2:return`vec2<${n}>(${i}(scale[0].${t}, scale[1].${t}))`;case 4:return`vec4<${n}>(${i}(scale[0].${t}, scale[1].${t}, scale[2].${t}, scale[3].${t}))`;default:throw Error(`Not supported compoents ${l}`)}},s=L("input",t[0].dataType,t[0].dims,l),u=F("output",t[0].dataType,o,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${s.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${i}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${u.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${e.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${a(0)}, ${a(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:b},{inputs:[t[0],g]})},xv=(e,t)=>{"NHWC"===t.format?xC(e,e.inputs,t):vC(e,e.inputs,t)}}),Sv=N(()=>{"use strict";ue(),fe(),ge(),TC=e=>{if(!e||e.length<2)throw Error("layerNorm requires at least 2 inputs.")},IC=(e,t,n)=>{let i=t.simplified,o=e[0].dims,a=e[1],s=!i&&e[2],u=o,l=D.normalizeAxis(t.axis,o.length),d=D.sizeToDimension(o,l),p=D.sizeFromDimension(o,l),c=D.size(a.dims),h=s?D.size(s.dims):0;if(c!==p||s&&h!==p)throw Error(`Size of X.shape()[axis:] == ${p}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${h}`);let f=[];for(let e=0;e<o.length;++e)e<l?f.push(o[e]):f.push(1);let m=Pe(p),g=["type","type"],b=[{type:12,data:d},{type:1,data:p},{type:12,data:Math.floor(p/m)},{type:1,data:t.epsilon}];s&&g.push("type");let y=n>1,_=n>2,v=t=>{let n=Me(e[0].dataType),o=[L("x",e[0].dataType,e[0].dims,m),L("scale",a.dataType,a.dims,m)];s&&o.push(L("bias",s.dataType,s.dims,m)),o.push(F("output",e[0].dataType,u,m)),y&&o.push(F("mean_data_output",1,f)),_&&o.push(F("inv_std_output",1,f));let l=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${t.registerUniforms(l).declareVariables(...o)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${xc("f32",m)};
    var mean_square_vector = ${xc("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Wr(n,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Xt("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Xt("mean_square_vector",m)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Wr(n,m,"x[j + offset]")};
      let f32scale = ${Wr(n,m,"scale[j]")};
      output[j + offset] = ${o[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Wr(n,m,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},x=[{dims:u,dataType:e[0].dataType}];return y&&x.push({dims:f,dataType:1}),_&&x.push({dims:f,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${n};${i}`,inputDependencies:g},getRunData:()=>({outputs:x,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:b}),getShaderSource:v}},Iv=(e,t)=>{TC(e.inputs),e.compute(IC(e.inputs,t,e.outputCount))}}),Av=N(()=>{"use strict";fe(),ja(),Ka(),SC=e=>{if(!e||2!==e.length)throw Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw Error("shared dimension does not match.")},$v=e=>{SC(e.inputs);let t=Un.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw Error("Can't use matmul on the given tensors");let n=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&i<8)e.compute(qa(e.inputs,{activation:""},t));else{let o=t[t.length-2],a=D.size(e.inputs[0].dims.slice(0,-2)),s=D.size(e.inputs[1].dims.slice(0,-2));if(1!==a&&1===o&&1===s){let o=e.inputs[0].reshape([1,a,i]),s=e.inputs[1].reshape([1,i,n]),u=[1,a,n],l=[o,s];e.compute(Ho(l,{activation:""},t,u),{inputs:l})}else e.compute(Ho(e.inputs,{activation:""},t))}}}),Ev=N(()=>{"use strict";ue(),fe(),Je(),ge(),$C=(e,t)=>{if(e.length<3||e.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],i=n.dims.length;if(n.dims[i-1]!==t.k)throw Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!D.areEqual(s.dims,[t.n,o,a]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(D.size(u)!==t.n*o)throw Error("scales input size error.");if(4===e.length){let n=e[3].dims,i=t.n*(8===t.bits?o:Math.floor((o*t.bits+7)/8));if(D.size(n)!==i)throw Error("zeroPoints input size error.")}},AC=(e,t)=>{let n=e[0].dims,i=n.length,o=n[i-2],a=t.k,s=t.n,u=n.slice(0,i-2),l=D.size(u),d=e[1].dims[2]/4,p=e[0].dataType,c=Pe(t.k),h=Pe(d),f=Pe(s),m=u.concat([o,s]),g=o>1&&s/f%2==0?2:1,b=D.size(m)/f/g,y=64,_=[],v=[l,o,a/c],x=D.convertShape(e[1].dims).slice();x.splice(-1,1,d/h),_.push(...U(v)),_.push(...U(x)),_.push(...U(e[2].dims)),4===e.length&&_.push(...U(D.convertShape(e[3].dims)));let w=[l,o,s/f];_.push(...U(w));let $=n=>{let i=v.length,o=L("a",e[0].dataType,i,c),a=L("b",12,x.length,h),s=L("scales",e[2].dataType,e[2].dims.length),u=[o,a,s],l=4===e.length?L("zero_points",12,e[3].dims.length):void 0;l&&u.push(l);let p=w.length,m=F("output",e[0].dataType,p,f),b=Me(e[0].dataType),_=(()=>{switch(c){case 1:return`array<${b}, 8>`;case 2:return`mat4x2<${b}>`;case 4:return`mat2x4<${b}>`;default:throw Error(`${c}-component is not supported.`)}})(),$=()=>{let e=`
          // reuse a data
            var input_offset = ${o.indicesToOffset(`${o.type.indices}(batch, row, word_offset)`)};
            var a_data: ${_};
            for (var j: u32 = 0; j < ${8/c}; j++) {
              a_data[j] = ${o.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let t=0;t<f*g;t++)e+=`
            b_value = ${1===h?`b${t}_data`:`b${t}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${_}(${Array.from({length:4},(e,t)=>`${b}(b_value_lower[${t}]), ${b}(b_value_upper[${t}])`).join(", ")});
            b_dequantized_values = ${1===c?`${_}(${Array.from({length:8},(e,n)=>`(b_quantized_values[${n}] - ${l?`zero_point${t}`:"zero_point"}) * scale${t}`).join(", ")});`:`(b_quantized_values - ${_}(${Array(8).fill(`${l?`zero_point${t}`:"zero_point"}`).join(",")})) * scale${t};`};
            workgroup_shared[local_id.x * ${g} + ${Math.floor(t/f)}]${f>1?`[${t%f}]`:""} += ${Array.from({length:8/c},(e,t)=>`${1===c?`a_data[${t}] * b_dequantized_values[${t}]`:`dot(a_data[${t}], b_dequantized_values[${t}])`}`).join(" + ")};
          `;return e},T=()=>{let e=`
            var col_index = col * ${f};
            ${l?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${b}(8);`}
            `;for(let t=0;t<f*g;t++)e+=`
            let scale${t} = ${s.getByOffset("col_index * nBlocksPerCol + block")};
            ${l?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${l.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${t} = ${b}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return e},I=()=>{let e=`col_index = col * ${f};`;for(let t=0;t<f*g;t++)e+=`
            let b${t}_data = ${a.getByIndices(`${a.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return e+`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${_};
            var b_dequantized_values: ${_};`};return`
        var<workgroup> workgroup_shared: array<${m.type.value}, ${g*y}>;
        ${n.declareVariables(...u,m)}
        ${n.mainStart([y,1,1])}
          let output_indices = ${m.offsetToIndices(`(global_idx / ${y}) * ${g}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${y}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/c};
            ${T()}
            for (var word: u32 = 0; word < ${d}; word += ${h}) {
              ${I()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${$()}
                word_offset += ${8/c};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${g}) {
            var output_value: ${m.type.value} = ${m.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${y}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${g};
            }
            ${m.setByIndices(`${m.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${c};${h};${f};${g};${y}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:p}],dispatchGroup:{x:b},programUniforms:_}),getShaderSource:$}},OC=(e,t)=>{let n=e[0].dims,i=n.length,o=n[i-2],a=t.k,s=t.n,u=n.slice(0,i-2),l=D.size(u),d=e[1].dims[2]/4,p=e[0].dataType,c=Pe(t.k),h=Pe(d),f=u.concat([o,s]),m=128,g=s%8==0?8:s%4==0?4:1,b=128/g,y=b*h*8,_=y/c,v=y/t.blockSize,x=D.size(f)/g,w=[],$=[l,o,a/c],T=D.convertShape(e[1].dims).slice();T.splice(-1,1,d/h),w.push(...U($)),w.push(...U(T)),w.push(...U(e[2].dims)),4===e.length&&w.push(...U(D.convertShape(e[3].dims)));let I=[l,o,s];w.push(...U(I));let S=n=>{let i=$.length,o=L("a",e[0].dataType,i,c),a=L("b",12,T.length,h),s=L("scales",e[2].dataType,e[2].dims.length),u=[o,a,s],l=4===e.length?L("zero_points",12,e[3].dims.length):void 0;l&&u.push(l);let d=I.length,p=F("output",e[0].dataType,d),f=Me(e[0].dataType),y=()=>{switch(c){case 1:return`
          let a_data0 = vec4<${f}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${f}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${f}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${f}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${c}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${o.type.value}, ${_}>;
        var<workgroup> inter_results: array<array<${p.type.value}, ${b}>, ${g}>;
        ${n.declareVariables(...u,p)}
        ${n.mainStart([b,g,1])}
          let output_indices = ${p.offsetToIndices(`workgroup_index * ${g}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${v} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${_};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${_}; a_offset += ${m})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${o.getByIndices(`${o.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${o.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${v} + local_id.x;
            ${l?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${l.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${f}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${f}(8);`}
            let scale = ${s.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${a.getByIndices(`${a.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/c};
            for (var i: u32 = 0; i < ${h}; i++) {
              ${y()}
              let b_value = ${1===h?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${f}>(${Array.from({length:4},(e,t)=>`${f}(b_value_lower[${t}]), ${f}(b_value_upper[${t}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${f}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(e,t)=>`dot(a_data${t}, b_dequantized_values[${t}])`).join(" + ")};
              word_offset += ${8/c};
            }
            workgroupBarrier();
          }

          if (local_idx < ${g}) {
            var output_value: ${p.type.value} = ${p.type.value}(0);
            for (var b = 0u; b < ${b}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${p.setByIndices(`${p.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${c};${h};${b};${g}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:p}],dispatchGroup:{x:x},programUniforms:w}),getShaderSource:S}},Ov=(e,t)=>{$C(e.inputs,t),32===t.blockSize&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(OC(e.inputs,t)):e.compute(AC(e.inputs,t))},Pv=e=>le(e)}),Dv=N(()=>{"use strict";ue(),fe(),ge(),PC=e=>{if(!e||e.length<1)throw Error("Too few inputs");if(1!==e[0].dataType&&10!==e[0].dataType)throw Error("Input type must be float or float16.");if(e.length>=2){let t=2*e[0].dims.length===e[1].dims[0];if(4===e.length&&(t=2*e[3].dims[0]===e[1].dims[0]),!t)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},EC=(e,t,n)=>{let i="";for(let o=t-1;o>=0;--o)i+=`
            k = i32(${e.indicesGet("indices",o)}) - ${Z("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Z("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${Z("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},CC=(e,t,n)=>{let i="";for(let o=t-1;o>=0;--o)i+=`
                k = i32(${e.indicesGet("indices",o)}) - ${Z("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Z("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Z("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Z("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},DC=(e,t,n)=>{let i="";for(let o=t-1;o>=0;--o)i+=`
                k = i32(${e.indicesGet("indices",o)}) - ${Z("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Z("uniforms.x_shape",o,t)})) {
                  k = i32(${Z("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${Z("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},kC=(e,t,n)=>{let i="";for(let o=t-1;o>=0;--o)i+=`
                k = i32(${e.indicesGet("indices",o)}) - ${Z("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${Z("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${Z("uniforms.x_shape",o,t)})) {
                  k -= i32(${Z("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${Z("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},NC=(e,t,n)=>{switch(n.mode){case 0:return EC(e,t,n.pads.length);case 1:return CC(e,t,n.pads.length);case 2:return DC(e,t,n.pads.length);case 3:return kC(e,t,n.pads.length);default:throw Error("Invalid mode")}},LC=(e,t)=>{let n=D.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,o=[{type:12,data:D.size(n)},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;0===t.mode&&o.push({type:a?e[2].dataType:1,data:t.value}),o.push(...U(e[0].dims,n));let s=["rank"],u=o=>{let s=F("output",e[0].dataType,n.length),u=L("x",e[0].dataType,i.length),l=u.type.value,d=NC(s,i.length,t),p=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return 0===t.mode&&p.push({name:"constant_value",type:a?l:"f32"}),`
            ${o.registerUniforms(p).declareVariables(u,s)}
            ${o.mainStart()}
            ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${s.offsetToIndices("global_idx")};

            var value = ${l}(0);
            ${d}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(n)/64)},programUniforms:o}),getShaderSource:u}},RC=(e,t)=>{if(!(e.length>1))return t;{let n=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?10===e[2].dataType?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,a=new Int32Array(2*o).fill(0);if(e.length>=4){let t=e[3].getBigInt64Array();for(let e=0;e<t.length;e++)a[Number(t[e])]=Number(n[e]),a[Number(t[e])+o]=Number(n[e+t.length])}else n.forEach((e,t)=>a[Number(t)]=Number(e));let s=[];return a.forEach(e=>s.push(e)),{mode:t.mode,value:i,pads:s}}},Cv=(e,t)=>{PC(e.inputs);let n=RC(e.inputs,t);e.compute(LC(e.inputs,n),{inputs:[0]})}}),Xv=N(()=>{"use strict";pt(),ue(),fe(),ge(),Qa=e=>{if(pe.webgpu.validateInputContent&&(!e||1!==e.length))throw Error("Pool ops requires 1 input.")},kv=(e,t,n)=>{let i="NHWC"===t.format,o=e.dims.slice();i&&o.splice(1,0,o.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),l=a?t.dilations.slice():[],d=t.pads.slice();Gr.adjustPoolAttributes(n,o,s,u,l,d);let p=Gr.computePoolOutputShape(n,o,u,l,s,d,t.autoPad),c=Object.assign({},t);a?Object.assign(c,{kernelShape:s,strides:u,pads:d,dilations:l,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:s,strides:u,pads:d,cacheKey:t.cacheKey});let h=p.slice();return h.push(h.splice(1,1)[0]),[c,i?h:p]},Nv=(e,t)=>{let n="NHWC"===t.format,i=[{type:12,data:D.size(e)},{type:12,data:D.size(t.kernelShape)}],o=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let e=t.kernelShape[t.kernelShape.length-1],n=t.strides[t.strides.length-1],a=t.pads[t.pads.length/2-1],s=t.pads[t.pads.length-1],u=!!(a+s);i.push({type:12,data:e},{type:12,data:n},{type:12,data:a},{type:12,data:s}),o.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let l=!1;if(2===t.kernelShape.length){let e=t.kernelShape[t.kernelShape.length-2],n=t.strides[t.strides.length-2],a=t.pads[t.pads.length/2-2],s=t.pads[t.pads.length-2];l=!!(a+s),i.push({type:12,data:e},{type:12,data:n},{type:12,data:a},{type:12,data:s}),o.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,o,!0,u,l]}{if(n)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let e=D.computeStrides(t.kernelShape);return i.push({type:12,data:e},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:"kernelStrides",type:"u32",length:e.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length}),[i,o,!!t.pads.reduce((e,t)=>e+t),!1,!1]}},Lv=(e,t,n,i,o,a,s,u,l,d,p,c)=>{let h="NHWC"===o.format,f=t.type.value,m=F("output",t.type.tensor,i);if(o.kernelShape.length<=2){let i="",d="",g="",b=n-(h?2:1);if(i=p?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,2===o.kernelShape.length){let e=n-(h?3:2);d=c?`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${e}] < 0 || xIndices[${e}] >= uniforms.x_shape[${e}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                `,g=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${f}(${u});
              var pad = 0;
              ${d}
              ${i}
              ${g}
              ${s}

              output[global_idx] = value;
            }`}{if(h)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let i=o.kernelShape.length,p=o.pads.length,c="";return c=d?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(l).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${i}>;

              var value = ${f}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${i-1}u; j++) {
                  offsets[j] = offset / ${Z("uniforms.kernelStrides","j",i)};
                  offset -= offsets[j] * ${Z("uniforms.kernelStrides","j",i)};
                }
                offsets[${i-1}] = offset;

                isPad = false;
                for (var j = ${n-i}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${Z("uniforms.strides",`j - ${n-i}u`,i)}
                    + offsets[j - ${n-i}u] - ${Z("uniforms.pads","j - 2u",p)};
                  ${c}
              }
              ${s}

              output[global_idx] = value;
            }`}},Rv=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,zC=e=>`${Rv(e)};${e.countIncludePad}`,MC=e=>`${Rv(e)};${e.storageOrder};${e.dilations}`,zv=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Mv=(e,t,n,i)=>{let[o,a]=kv(t,i,n),s=L("x",t.dataType,t.dims.length),u=s.type.value,l="value += x_val;",d="";o.countIncludePad?d+=`value /= ${u}(uniforms.kernelSize);`:d+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[p,c,h,f,m]=Nv(a,o);p.push(...U(t.dims,a));let g=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${h};${f};${m}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(D.size(a)/64)},programUniforms:p}),getShaderSource:e=>Lv(e,s,t.dims.length,a.length,o,l,d,0,c,h,f,m)}},Bv=e=>{let t=0!==e.count_include_pad,n=zv(e);if(0!==n.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...n,cacheKey:""};return{...i,cacheKey:zC(i)}},Fv=(e,t)=>{Qa(e.inputs),e.compute(Mv("AveragePool",e.inputs[0],!1,t))},Vv={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Gv=e=>{let t=e.format;return{format:t,...Vv,cacheKey:t}},Uv=(e,t)=>{Qa(e.inputs),e.compute(Mv("GlobalAveragePool",e.inputs[0],!0,t))},Wv=(e,t,n,i)=>{let[o,a]=kv(t,i,n),s=`
      value = max(x_val, value);
    `,u="",l=L("x",t.dataType,t.dims.length),d=["rank"],[p,c,h,f,m]=Nv(a,o);return p.push(...U(t.dims,a)),{name:e,shaderCache:{hint:`${i.cacheKey};${h};${f};${m}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(D.size(a)/64)},programUniforms:p}),getShaderSource:e=>Lv(e,l,t.dims.length,a.length,o,s,u,10===t.dataType?-65504:-1e5,c,h,f,m)}},Hv=(e,t)=>{Qa(e.inputs),e.compute(Wv("MaxPool",e.inputs[0],!1,t))},qv=e=>{let t=e.storage_order,n=e.dilations,i=zv(e);if(0!==t)throw Error("column major storage order is not yet supported for MaxPool");if(0!==i.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:n,...i,cacheKey:""};return{...o,cacheKey:MC(o)}},jv=e=>{let t=e.format;return{format:t,...Vv,cacheKey:t}},Kv=(e,t)=>{Qa(e.inputs),e.compute(Wv("GlobalMaxPool",e.inputs[0],!0,t))}}),Qv=N(()=>{"use strict";ue(),fe(),Je(),ge(),FC=(e,t)=>{if(e.length<2||e.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===e.length&&e[1].dims===e[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===e.length&&e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(6===e[0].dataType&&e.length>2)throw Error("In the case of dequantizing int32 there is no zero point.");if(0!==e[1].dims.length&&1!==e[1].dims.length&&e[1].dims.length!==e[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((t,n)=>t===e[2].dims[n]).reduce((e,t)=>e&&t,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(0===e[1].dims.length||1===e[1].dims.length&&1===e[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,i)=>i===t.axis||n===e[0].dims[i]).reduce((e,t)=>e&&t,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/i)||t.blockSize>Math.ceil(n/(i-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},VC=(e,t)=>{let n=D.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,o=3===i,a=e[0].dims,s=e[1].dataType,u=D.size(a),l=3===i||2===i,d=l?[Math.ceil(D.size(e[0].dims)/4)]:e[0].dims,p=e[1].dims,c=e.length>2?e[2]:void 0,h=c?l?[Math.ceil(D.size(c.dims)/4)]:c.dims:void 0,f=0===p.length||1===p.length&&1===p[0],m=!1===f&&1===p.length,g=Pe(u),b=f&&(!l||4===g),y=b?g:1,_=b&&!l?g:1,v=L("input",l?12:i,d.length,_),x=L("scale",s,p.length),w=c?L("zero_point",l?12:i,h.length):void 0,$=F("output",s,a.length,y),T=[v,x];w&&T.push(w);let I=[d,p];c&&I.push(h);let S=[{type:12,data:u/y},{type:12,data:n},{type:12,data:t.blockSize},...U(...I,a)],O=e=>{let t=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${e.registerUniforms(t).declareVariables(...T,$)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${$.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${v.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===y?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${v.getByOffset("global_idx")};`};

          // Set scale input
          ${f?`let scale_value= ${x.getByOffset("0")}`:m?`
            let scale_index = ${$.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${x.getByOffset("scale_index")};`:`
            var scale_indices: ${x.type.indices} = output_indices;
            let index = ${x.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${x.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${x.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${w?f?l?`
                let zero_point_input = ${w.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${w.getByOffset("0")}`:m?l?`
                let zero_point_index = ${$.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${w.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${$.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${w.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${x.indicesToOffset("scale_indices")};
                let zero_point_input = ${w.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${w.getByIndices("scale_indices")};`:`let zero_point_value = ${l?o?"i32":"u32":v.type.value}(0);`};
      // Compute and write output
      ${$.setByOffset("global_idx",`${$.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getShaderSource:O,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(u/y/64),y:1,z:1},programUniforms:S})}},Zv=(e,t)=>{FC(e.inputs,t),e.compute(VC(e.inputs,t))},Jv=e=>le({axis:e.axis,blockSize:e.blockSize})}),ex=N(()=>{"use strict";pt(),ue(),ge(),GC=(e,t,n)=>{let i=e===t,o=e<t&&n<0,a=e>t&&n>0;if(i||o||a)throw Error("Range these inputs' contents are invalid.")},UC=(e,t,n,i)=>{let o=Math.abs(Math.ceil((t-e)/n)),a=[o],s=o,u=[{type:12,data:s},{type:i,data:e},{type:i,data:n},...U(a)],l=e=>{let t=F("output",i,a.length),n=t.type.value,o=[{name:"outputSize",type:"u32"},{name:"start",type:n},{name:"delta",type:n}];return`
        ${e.registerUniforms(o).declareVariables(t)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${n}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},Yv=e=>{let t=0,n=0,i=0;6===e.inputs[0].dataType?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):1===e.inputs[0].dataType&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),pe.webgpu.validateInputContent&&GC(t,n,i),e.compute(UC(t,n,i,e.inputs[0].dataType),{inputs:[]})}}),rx=N(()=>{"use strict";ue(),fe(),Je(),ge(),WC=(e,t,n,i)=>{if("none"!==e&&"i32"!==i&&"u32"!==i&&"f32"!==i)throw Error(`Input ${i} is not supported with reduction ${e}.`);let o=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${n};`;case"add":return"i32"===i||"u32"===i?`atomicAdd(&${t}, bitcast<${i}>(${n}));`:`
              ${o}bitcast<${i}>(oldValue) + (${n})${a}`;case"max":return"i32"===i||"u32"===i?`atomicMax(&${t}, bitcast<${i}>(${n}));`:`
                ${o}max(bitcast<f32>(oldValue), (${n}))${a}`;case"min":return"i32"===i||"u32"===i?`atomicMin(&${t}, bitcast<${i}>(${n}));`:`${o}min(bitcast<${i}>(oldValue), (${n}))${a}`;case"mul":return`${o}(bitcast<${i}>(oldValue) * (${n}))${a}`;default:throw Error(`Reduction ${e} is not supported.`)}},HC=(e,t)=>{let n=e[0].dims,i=e[1].dims,o=n,a=1,s=Math.ceil(D.sizeToDimension(i,i.length-1)/a),u=i[i.length-1],l=D.sizeFromDimension(n,u),d=[{type:12,data:s},{type:12,data:u},{type:12,data:l},...U(e[1].dims,e[2].dims,o)],p=n=>{let i=L("indices",e[1].dataType,e[1].dims.length),s=L("updates",e[2].dataType,e[2].dims.length,a),u="none"!==t.reduction&&""!==t.reduction?P_("output",e[0].dataType,o.length):F("output",e[0].dataType,o.length,a);return`
      ${n.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(i,s,u)}
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
    ${WC(t.reduction,"output[data_offset + i]","value",u.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:p}},tx=e=>le({reduction:e.reduction}),nx=(e,t)=>{e.compute(HC(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),ux=N(()=>{"use strict";ue(),fe(),Je(),ge(),qC=(e,t)=>{if(e.every(e=>e>0||(()=>{throw Error("Resize requires scales input values to be positive")})),e.length>0){if("linear"===t.mode){if(2!==e.length&&3!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3])&&(5!==e.length||1!==e[0]||1!==e[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===t.mode&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},jC=(e,t,n)=>{t.every(e=>e>=0&&e<n||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")}));let i=Array(n).fill(1);return t.forEach((t,n)=>i[t]=e[n]),i},KC=(e,t,n,i,o,a)=>{let[s,u,l]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(e=>a.push(e));else if("tf_crop_and_resize"===t.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&1===e[u].dims.length&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(e=>i.push(e)),0!==i.length&&i.length!==d&&n>=18&&i.length!==t.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");qC(i,t),t.axes.length>0&&jC(i,t.axes,d).forEach((e,t)=>i[t]=e)}if(l>0&&e.length>l&&1===e[l].dims.length&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(e=>o.push(Number(e))),0!==o.length&&o.length!==d&&n>=18&&o.length!==t.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(0!==i.length&&i.length!==t.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==o.length&&o.length!==t.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if("u">typeof i&&"u">typeof o&&i.length>0&&o.length>d)throw Error("Resize requires only of scales or sizes to be specified")},ox=(e,t,n,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${n}));
  let fract = ${i}(big % (${n})) / ${i}(${n});
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",ZC=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${e} is not supported`)}})()+"}",JC=(e,t,n)=>{let i=Array(n).fill(0).concat(Array(n).fill(1)),o=0===e.length?i:e.slice();return t.length>0?(t.forEach((e,a)=>{i[e]=o[a],i[a+n]=o[t.length+a]}),i):o},QC=(e,t,n,i)=>{let o=[];if(n.length>0)if(i.length>0){if(e.forEach(e=>o.push(e)),Math.max(...i)>e.length)throw Error("axes is out of bound");i.forEach((e,t)=>o[e]=n[t])}else n.forEach(e=>o.push(e));else{if(0===t.length)throw Error("Resize requires either scales or sizes.");o=e.map((e,n)=>Math.round(e*t[n]))}return o},YC=(e,t,n)=>{let i=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(e=>t[e]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(e=>t[e]),5e-324):Math.max(...t,5e-324);default:throw Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return n.axes.length>0?(n.axes.forEach(e=>t[e]=i),n.axes.forEach(n=>o[n]=Math.round(e[n]*t[n]))):(t.fill(i,0,t.length),o.forEach((e,n)=>o[n]=Math.round(e*t[n]))),o},eD=(e,t,n,i,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${Z("uniforms.scales","i",i)};
        var roi_low = ${Z("uniforms.roi","i",o)};
        var roi_hi = ${Z("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${Z("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${Z("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,tD=(e,t,n,i,o,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Z("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Z("uniforms.roi","i",a)};
          var roi_hi = ${Z("uniforms.roi",`i + ${n.length}`,a)};
          var input_shape_i = ${Z("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${Z("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,ix=(e,t,n,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",rD=(e,t,n,i,o)=>{let[a,s,u,l]=2===n.length?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${ix(e,l,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${n[s]} - 1) || col < 0 || col > (${n[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[s]} - 1));
      col = max(0, min(col, ${n[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},oD=(e,t,n,i,o,a,s,u,l,d)=>{let p=2===n.length,c=!0,[h,f]=p?[0,1]:c?[2,3]:[1,2],m=e.type.value,g=s=>{let p=s===h?"row":"col";return`
      fn ${p}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices",s)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[s]},
        ${i[s]}, ${n[s]}, ${a[s]}, ${a[s]} + ${n.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${n[s]} - 1))) {
          return ${l};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${p}: ${m} = originalIdx + ${m}(i);
          if (${p} < 0 || ${p} >= ${n[s]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${p} = max(0, min(${p}, ${n[s]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",s,`u32(${p})`)};
          data[i + 1] = ${s===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${g(h)};
    ${g(f)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${m} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},iD=(e,t,n,i,o)=>{let[a,s,u,l,d]=3===n.length?[-1,0,1,2,-1]:[0,2,3,4,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${n[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${ix(e,d,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${s}];
      var height:${p} = originalIndices[${u}];
      var width:${p} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${n[s]} - 1) || height < 0 || height > (${n[u]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[s]} - 1));
      height = max(0, min(height, ${n[u]} - 1));
      width = max(0, min(width, ${n[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${p} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${p} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${p} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${p} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${p} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${p} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${p} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${p} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${p} = abs(depth - ${p}(depth1));
      var dx2: ${p} = abs(${p}(depth2) - depth);
      var dy1: ${p} = abs(height - ${p}(height1));
      var dy2: ${p} = abs(${p}(height2) - height);
      var dz1: ${p} = abs(width - ${p}(width1));
      var dz2: ${p} = abs(${p}(width2) - width);
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
    }`},aD=(e,t,n,i,o,a)=>{let s=e.dims,u=JC(a,t.axes,s.length),l=QC(s,i,o,t.axes),d=i.slice();0===i.length&&(d=s.map((e,t)=>0===e?1:l[t]/e),"stretch"!==t.keepAspectRatioPolicy&&(l=YC(s,d,t)));let p=F("output",e.dataType,l.length),c=L("input",e.dataType,s.length),h=D.size(l),f=s.length===l.length&&s.every((e,t)=>e===l[t]),m="tf_crop_and_resize"===t.coordinateTransformMode,g=t.extrapolationValue,b=c.type.value,y=e=>`
      ${f?"":`
      ${XC(t.coordinateTransformMode,b)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${nD(c,s)};
              ${ZC(t.nearestMode,n,b)};
              ${tD(c,p,s,l,d.length,u.length,m)};
              `;case"linear":return`
              ${eD(p,s,l,d.length,u.length)};
              ${(()=>{if(2===s.length||4===s.length)return`${rD(c,p,s,m,g)}`;if(3===s.length||5===s.length)return`${iD(c,p,s,m,g)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===s.length||4===s.length)return`${oD(c,p,s,l,d,u,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${e.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",u.length).declareVariables(c,p)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${f?"output[global_idx] = input[global_idx];":`
        let output_indices = ${p.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${2===s.length||4===s.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${d.length>0?"cubic"===t.mode?d:d.length:""}|${o.length>0?o:""}|${u.length>0?u:""}|${f}|${"nearest"===t.mode?s.length:s}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:d},{type:1,data:u},...U(s,l)]})}},sD=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},ax=(e,t)=>{let n=[],i=[],o=[],a=sD(e);if(0!==t.antialias)throw Error("Only default value (0) for Antialias attribute is supported");KC(e.inputs,t,a,n,i,o),e.compute(aD(e.inputs[0],t,a,n,i,o),{inputs:[0]})},sx=e=>{let t=e.antialias,n=e.axes,i=e.coordinateTransformMode,o=e.cubicCoeffA,a=0!==e.excludeOutside,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,d=""===e.nearestMode?"simple":e.nearestMode;return le({antialias:t,axes:n,coordinateTransformMode:i,cubicCoeffA:o,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:u,mode:l,nearestMode:d})}}),cx=N(()=>{"use strict";ue(),fe(),ge(),uD=e=>{if(!e||e.length<3)throw Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],i=e[2];if(t.dataType!==n.dataType||t.dataType!==i.dataType)throw Error("All inputs must have the same data type");if(3!==t.dims.length&&2!==t.dims.length)throw Error("Input must be 2D or 3D");if(3!==n.dims.length&&2!==n.dims.length)throw Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==a)throw Error("Skip must have the same sequence length as input");if(1!==i.dims.length)throw Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==o)throw Error("Gamma must have the same hidden size as input");if(e.length>3){let t=e[3];if(1!==t.dims.length)throw Error("Beta must be 1D");if(t.dims[t.dims.length-1]!==o)throw Error("Beta must have the same hidden size as input")}if(e.length>4){let t=e[4];if(1!==t.dims.length)throw Error("Bias must be 1D");if(t.dims[t.dims.length-1]!==o)throw Error("Bias must have the same hidden size as input")}},lD=(e,t,n,i)=>{let o=t.simplified,a=e[0].dims,s=D.size(a),u=a,l=s,d=a.slice(-1)[0],p=i?a.slice(0,-1).concat(1):[],c=!o&&e.length>3,h=e.length>4,f=i&&n>1,m=i&&n>2,g=n>3,b=64,y=Pe(d),_=[{type:12,data:l},{type:12,data:y},{type:12,data:d},{type:1,data:t.epsilon}],v=t=>{let n=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],i=[L("x",e[0].dataType,e[0].dims,y),L("skip",e[1].dataType,e[1].dims,y),L("gamma",e[2].dataType,e[2].dims,y)];c&&i.push(L("beta",e[3].dataType,e[3].dims,y)),h&&i.push(L("bias",e[4].dataType,e[4].dims,y)),i.push(F("output",e[0].dataType,u,y)),f&&i.push(F("mean_output",1,p)),m&&i.push(F("inv_std_output",1,p)),g&&i.push(F("input_skip_bias_sum",e[0].dataType,u,y));let a=Me(e[0].dataType),s=Me(1,y);return`

      ${t.registerUniforms(n).declareVariables(...i)}
      var<workgroup> sum_shared : array<${s}, ${b}>;
      var<workgroup> sum_squared_shared : array<${s}, ${b}>;

      ${t.mainStart([b,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${b};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${b};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${b-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":a+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${g?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Wr(a,y,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${b};
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
        let mean = ${Xt("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Xt("square_sum",y)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${a}(mean)`}) *
            ${a}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},x=[{dims:u,dataType:e[0].dataType}];return n>1&&x.push({dims:p,dataType:1}),n>2&&x.push({dims:p,dataType:1}),n>3&&x.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${f};${m};${g}`,inputDependencies:e.map((e,t)=>"type")},getShaderSource:v,getRunData:()=>({outputs:x,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:_})}},lx=(e,t)=>{uD(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(lD(e.inputs,t,e.outputCount,!1),{outputs:n})}}),hx=N(()=>{"use strict";ue(),fe(),Je(),ge(),cD=(e,t)=>{if(!e||e.length<1)throw Error("too few inputs");if(0!==t.axes.length){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw Error("starts and ends must have the same length");e.slice(1).forEach((t,n)=>{if(6!==e[n+1].dataType&&7!==e[n+1].dataType)throw Error(`Input ${n} must be an array of int32 or int64`)})},Ya=(e,t)=>{let n=[];if(e.length>t)if(7===e[t].dataType)e[t].getBigInt64Array().forEach(e=>n.push(Number(e)));else if(6===e[t].dataType)e[t].getInt32Array().forEach(e=>n.push(Number(e)));else throw Error(`Input ${t} must be an array of int32 or int64`);return n},dD=(e,t)=>{if(!(e.length>1))return t;{let t=Ya(e,1),n=Ya(e,2),i=Ya(e,3);return 0===i.length&&(i=[...Array(e[0].dims.length).keys()]),le({starts:t,ends:n,axes:i})}},dx=(e,t,n,i,o)=>{let a=e;return e<0&&(a+=n[i[t]]),o[t]<0?Math.max(0,Math.min(a,n[i[t]]-1)):Math.max(0,Math.min(a,n[i[t]]))},pD=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${Z("uniforms.input_shape","i",n.length)};
            let steps_i = ${Z("uniforms.steps","i",n.length)};
            let signs_i = ${Z("uniforms.signs","i",n.length)};
            let starts_i = ${Z("uniforms.starts","i",n.length)};
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
      }`,fD=(e,t)=>{let n=e[0].dims,i=D.size(n),o=t.axes.length>0?D.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=Ya(e,4);a.forEach(e=>0!==e||(()=>{throw Error("step cannot be 0")})),0===a.length&&(a=Array(o.length).fill(1));let s=t.starts.map((e,t)=>dx(e,t,n,o,a)),u=t.ends.map((e,t)=>dx(e,t,n,o,a));if(o.length!==s.length||o.length!==u.length)throw Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let e=0;e<n.length;++e)o.includes(e)||(s.splice(e,0,0),u.splice(e,0,n[e]),a.splice(e,0,1));let l=a.map(e=>Math.sign(e));a.forEach((e,t,n)=>{if(e<0){let i=(u[t]-s[t])/e,o=s[t],l=o+i*a[t];s[t]=l,u[t]=o,n[t]=-e}});let d=n.slice(0);o.forEach((e,t)=>{d[e]=Math.ceil((u[e]-s[e])/a[e])});let p={dims:d,dataType:e[0].dataType},c=F("output",e[0].dataType,d.length),h=L("input",e[0].dataType,e[0].dims.length),f=D.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],g=[{type:12,data:f},{type:12,data:s},{type:6,data:l},{type:12,data:a},...U(e[0].dims,d)],b=e=>`
      ${e.registerUniforms(m).declareVariables(h,c)}
        ${pD(h,c,n)}
        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}},px=(e,t)=>{cD(e.inputs,t);let n=dD(e.inputs,t);e.compute(fD(e.inputs,n),{inputs:[0]})},fx=e=>{let t=e.starts,n=e.ends,i=e.axes;return le({starts:t,ends:n,axes:i})}}),bx=N(()=>{"use strict";ue(),fe(),Je(),Yn(),ge(),hD=e=>{if(!e||1!==e.length)throw Error("Softmax op requires 1 input.")},mD=(e,t)=>{let n=e.inputs[0],i=n.dims,o=D.size(i),a=i.length,s=D.normalizeAxis(t.axis,a),u=s<i.length-1,l,d=[];u?((d=Array.from({length:a},(e,t)=>t))[s]=a-1,d[a-1]=s,l=e.compute(st(n,d),{inputs:[n],outputs:[-1]})[0]):l=n;let p=l.dims,c=p[a-1],h=o/c,f=Pe(c),m=c/f,g=64;1===h&&(g=256);let b=(e,t)=>4===t?`max(max(${e}.x, ${e}.y), max(${e}.z, ${e}.w))`:2===t?`max(${e}.x, ${e}.y)`:3===t?`max(max(${e}.x, ${e}.y), ${e}.z)`:e,y=L("x",l.dataType,l.dims,f),_=F("result",l.dataType,l.dims,f),v=y.type.value,x="f32"===Me(l.dataType)?`var threadMax = ${v}(-3.4028234663852886e+38f);`:`var threadMax = ${v}(-65504.0h);`,w=e=>`
      var<workgroup> rowMaxShared : ${v};
      var<workgroup> rowSumShared : ${v};
      var<workgroup> threadShared : array<${v}, ${g}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${v} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${v}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${e.registerUniform("packedCols","i32").declareVariables(y,_)}
      ${e.mainStart(g)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${g};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${x}
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
          rowMaxShared = ${v}(${b("threadShared[0]",f)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${v}(0.0);
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
          rowSumShared = ${v}(${Xt("threadShared[0]",f)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${v}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,$=e.compute({name:"Softmax",shaderCache:{hint:`${f};${g}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:p,dataType:l.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:m}]}),getShaderSource:w},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(st($,d),{inputs:[$]})},mx=(e,t)=>{hD(e.inputs),mD(e,t)},gx=e=>le({axis:e.axis})}),wx=N(()=>{"use strict";ue(),fe(),ge(),yx=e=>Array.from(e.getBigInt64Array(),Number),gD=e=>{if(!e||2!==e.length)throw Error("Tile requires 2 inputs.");if(1!==e[0].dataType&&10!==e[0].dataType&&6!==e[0].dataType&&12!==e[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==e[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==e[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(yx(e[1]).length!==e[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},bD=(e,t)=>{let n=[];for(let i=0;i<e.length;++i)n.push(e[i]*t[i]);return n},yD=(e,t)=>{let n=e[0].dims,i=t??yx(e[1]),o=bD(n,i),a=D.size(o),s=e[0].dataType,u=L("input",s,n.length),l=F("output",s,o.length);return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...U(e[0].dims,o)]}),getShaderSource:e=>`
      const inputShape = ${u.indices(...n)};
      ${e.registerUniform("output_size","u32").declareVariables(u,l)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`}},_x=e=>{gD(e.inputs),e.compute(yD(e.inputs),{inputs:[0]})}}),xx=N(()=>{"use strict";ue(),fe(),ge(),_D=(e,t,n,i,o)=>{let a=F("output_data",o,n.length,4),s=L("a_data",t[1].dataType,t[1].dims.length,4),u=L("b_data",t[2].dataType,t[2].dims.length,4),l=L("c_data",t[0].dataType,t[0].dims.length,4),d,p=(e,t,n)=>`select(${t}, ${e}, ${n})`;if(i){let e=(e,t,n="")=>{let i=`a_data[index_a${t}][component_a${t}]`,o=`b_data[index_b${t}][component_b${t}]`,d=`bool(c_data[index_c${t}] & (0xffu << (component_c${t} * 8)))`;return`
            let output_indices${t} = ${a.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offset_a${t} = ${s.broadcastedIndicesToOffset(`output_indices${t}`,a)};
            let offset_b${t} = ${u.broadcastedIndicesToOffset(`output_indices${t}`,a)};
            let offset_c${t} = ${l.broadcastedIndicesToOffset(`output_indices${t}`,a)};
            let index_a${t} = offset_a${t} / 4u;
            let index_b${t} = offset_b${t} / 4u;
            let index_c${t} = offset_c${t} / 4u;
            let component_a${t} = offset_a${t} % 4u;
            let component_b${t} = offset_b${t} % 4u;
            let component_c${t} = offset_c${t} % 4u;
            ${e}[${t}] = ${n}(${p(i,o,d)});
          `};d=9===o?`
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
          `}else d=a.setByOffset("global_idx",p(s.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,u,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},wD=e=>{let t=e[1].dims,n=e[2].dims,i=e[0].dims,o=e[1].dataType,a=!(D.areEqual(t,n)&&D.areEqual(n,i)),s=t,u=D.size(t);if(a){let e=Un.calcShape(Un.calcShape(t,n,!1),i,!1);if(!e)throw Error("Can't perform where op on the given tensors");s=e,u=D.size(s)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:t=>_D(t,e,s,a,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...U(i,t,n,s)]})}},vx=e=>{e.compute(wD(e.inputs))}}),Ix=N(()=>{"use strict";o0(),Va(),s0(),l0(),K0(),iw(),uw(),Iw(),Cw(),Nw(),zw(),Gw(),Hw(),jw(),Zw(),Yw(),nv(),iv(),uv(),dv(),wv(),Tv(),Sv(),Av(),Ev(),zc(),Dv(),Xv(),Qv(),ex(),rx(),Ba(),ux(),Fc(),cx(),hx(),bx(),Bc(),wx(),Yn(),Ua(),xx(),Tx=new Map([["Abs",[c0]],["Acos",[d0]],["Acosh",[p0]],["Add",[X0]],["ArgMax",[r0,Ic]],["ArgMin",[n0,Ic]],["Asin",[f0]],["Asinh",[h0]],["Atan",[m0]],["Atanh",[g0]],["Attention",[i0]],["AveragePool",[Fv,Bv]],["BatchNormalization",[a0]],["BiasAdd",[u0]],["BiasSplitGelu",[j0]],["Cast",[y0,b0]],["Ceil",[w0]],["Clip",[_0]],["Concat",[aw,sw]],["Conv",[kc,Dc]],["ConvTranspose",[Ew,Ow]],["Cos",[v0]],["Cosh",[x0]],["CumSum",[Dw,kw]],["DepthToSpace",[Lw,Rw]],["DequantizeLinear",[Zv,Jv]],["Div",[Z0]],["Einsum",[Fw,Vw]],["Elu",[T0,Uo]],["Equal",[J0]],["Erf",[I0]],["Exp",[S0]],["Expand",[Ww]],["FastGelu",[qw]],["Floor",[$0]],["FusedConv",[kc,Dc]],["Gather",[Xw,Kw]],["GatherElements",[ov,rv]],["GatherBlockQuantized",[ev,tv]],["GatherND",[Jw,Qw]],["Gelu",[A0]],["Gemm",[sv,av]],["GlobalAveragePool",[Uv,Gv]],["GlobalMaxPool",[Kv,jv]],["Greater",[tw]],["GreaterOrEqual",[rw]],["GridSample",[lv,cv]],["GroupQueryAttention",[_v]],["HardSigmoid",[L0,N0]],["InstanceNormalization",[xv]],["LayerNormalization",[Iv]],["LeakyRelu",[O0,Uo]],["Less",[nw]],["LessOrEqual",[ow]],["Log",[W0]],["MatMul",[$v]],["MatMulNBits",[Ov,Pv]],["MaxPool",[Hv,qv]],["Mul",[Q0]],["MultiHeadAttention",[hv,fv]],["Neg",[E0]],["Not",[P0]],["Pad",[Cv]],["Pow",[Y0]],["QuickGelu",[H0,Uo]],["Range",[Yv]],["Reciprocal",[C0]],["ReduceMin",[Z_]],["ReduceMean",[H_]],["ReduceMax",[X_]],["ReduceSum",[Q_]],["ReduceProd",[J_]],["ReduceL1",[q_]],["ReduceL2",[j_]],["ReduceLogSum",[e0]],["ReduceLogSumExp",[K_]],["ReduceSumSquare",[Y_]],["Relu",[D0]],["Resize",[ax,sx]],["RotaryEmbedding",[bv]],["ScatterND",[nx,tx]],["Sigmoid",[k0]],["Sin",[R0]],["Sinh",[z0]],["Slice",[px,fx]],["SkipLayerNormalization",[lx]],["Split",[mv,gv]],["Sqrt",[M0]],["Softmax",[mx,gx]],["Sub",[ew]],["Tan",[B0]],["Tanh",[V0]],["ThresholdedRelu",[U0,Uo]],["Tile",[_x]],["Transpose",[D_,k_]],["Where",[vx]]])}),Sx=N(()=>{"use strict";pt(),Gn(),ge(),es=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,i,o){$t(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let u=[];for(let e of t)u.push({binding:u.length,resource:{buffer:e.buffer}});for(let e of n)u.push({binding:u.length,resource:{buffer:e.buffer}});o&&u.push({binding:u.length,resource:o});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if("capturing"===this.backend.sessionStatus){let t={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(t)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),yt(e.programInfo.name)}dispose(){}build(e,t){$t(e.name);let n=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(e=>{n.features.has(e.feature)&&i.push(`enable ${e.extension};`)});let o=E_(t,this.backend.device.limits),a=e.getShaderSource(o),s=`${i.join(`
`)}
${o.additionalImplementations}
${a}`,u=n.createShaderModule({code:s,label:e.name});be("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=n.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return yt(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:o.variablesInfo}}normalizeDispatchGroupSize(e){let t="number"==typeof e?e:e.x,n="number"==typeof e?1:e.y||1,i="number"==typeof e?1:e.z||1,o=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=o&&n<=o&&i<=o)return[t,n,i];let a=t*n*i,s=Math.ceil(Math.sqrt(a));if(!(s>o))return[s,s,1];if((s=Math.ceil(Math.cbrt(a)))>o)throw Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}}}),$x={};Sr($x,{WebGpuBackend:()=>Gc});var vD,xD,Vc,Gc,Ax=N(()=>{"use strict";pt(),ue(),Gn(),pc(),O_(),Ix(),Sx(),vD=(e,t)=>{if(t.length!==e.length)throw Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let i=0;i<e.length;++i){let o=e[i].dataType;switch(t[i]){case"none":n.push("");break;case"type":n.push(`${o}`);break;case"rank":{let t=e[i].dims.length;n.push(`${o};${t}`);break}case"dims":{let t=e[i].dims.join(",");n.push(`${o};${t}`);break}default:throw Error(`unsupported input dependency: ${t[i]}`)}}return n.join("|")},xD=(e,t,n)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+n+`:${vD(t,e.shaderCache?.inputDependencies??Array(t.length).fill("dims"))}`},Vc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Gc=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},o=e=>t.features.has(e)&&n.push(e)&&!0;o("chromium-experimental-timestamp-query-inside-passes")||o("timestamp-query"),o("shader-f16"),o("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new Vc(t.info||await t.requestAdapterInfo()),this.gpuDataManager=A_(this),this.programManager=new es(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Pa(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){"u">typeof this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};"at-passes"===this.queryType&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let e;this.commandEncoder&&($t(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),e=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let e=0;e<t.length/2;e++){let i=n[e],o=i.kernelId,a=this.kernels.get(o),s=a.kernelType,u=a.kernelName,l=i.programName,d=i.inputTensorViews,p=i.outputTensorViews,c=t[2*e],h=t[2*e+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=c);let f=Number(c-this.queryTimeBase),m=Number(h-this.queryTimeBase);if(!Number.isSafeInteger(f)||!Number.isSafeInteger(m))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:d.map(e=>({dims:e.dims,dataType:Vn(e.dataType)})),outputsMetadata:p.map(e=>({dims:e.dims,dataType:Vn(e.dataType)})),kernelId:o,kernelType:s,kernelName:u,programName:l,startTime:f,endTime:m});else{let e="";d.forEach((t,n)=>{e+=`input[${n}]: [${t.dims}] | ${Vn(t.dataType)}, `});let t="";p.forEach((e,n)=>{t+=`output[${n}]: [${e.dims}] | ${Vn(e.dataType)}, `}),console.log(`[profiling] kernel "${o}|${s}|${u}|${l}" ${e}${t}start time: ${f} ns, execution time: ${m-f} ns`)}di("GPU",`${l}::${c}::${h}`)}e.unmap(),this.pendingQueries.delete(e)}),yt())}run(e,t,n,i,o,a){let s;$t(e.name);let u=[];for(let e=0;e<t.length;++e){let n=t[e].data;if(0===n)continue;let i=this.gpuDataManager.get(n);if(!i)throw Error(`no GPU data for input: ${n}`);u.push(i)}let{outputs:l,dispatchGroup:d,programUniforms:p}=e.getRunData(t),c=0===n.length?l.map((e,t)=>t):n;if(c.length!==l.length)throw Error(`Output size ${c.length} must be equal to ${l.length}.`);let h=[],f=[];for(let e=0;e<l.length;++e){if(!Number.isInteger(c[e])||c[e]<-3||c[e]>=a)throw Error(`Invalid output index: ${c[e]}`);if(-3===c[e])continue;let t=-1===c[e],n=-2===c[e],s=t||n?o(l[e].dataType,l[e].dims):i(c[e],l[e].dataType,l[e].dims);if(h.push(s),0===s.data)continue;let u=this.gpuDataManager.get(s.data);if(!u)throw Error(`no GPU data for output: ${s.data}`);if(t&&this.temporaryData.push(u),n){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(u)}f.push(u)}if(u.length!==t.length||f.length!==h.length){if(0===f.length)return yt(e.name),h;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(p){let e=0,t=[];p.forEach(n=>{let i="number"==typeof n.data?[n.data]:n.data;if(0===i.length)return;let o=10===n.type?2:4,a,s;10===n.type?(s=i.length>4?16:i.length>2?8:i.length*o,a=i.length>4?16:o*i.length):(s=i.length<=2?i.length*o:16,a=16),e=Math.ceil(e/s)*s,t.push(e);let u=10===n.type?8:4;e+=i.length>4?Math.ceil(i.length/u)*a:i.length*o});let n=new ArrayBuffer(e=16*Math.ceil(e/16));p.forEach((e,i)=>{let o=t[i],a="number"==typeof e.data?[e.data]:e.data;if(6===e.type)new Int32Array(n,o,a.length).set(a);else if(12===e.type)new Uint32Array(n,o,a.length).set(a);else if(10===e.type)new Uint16Array(n,o,a.length).set(a);else if(1===e.type)new Float32Array(n,o,a.length).set(a);else throw Error(`Unsupported uniform type: ${Vn(e.type)}`)});let i=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(i.buffer,0,n,0,e),this.gpuDataManager.release(i.id),s={offset:0,size:e,buffer:i.buffer}}let m=this.programManager.normalizeDispatchGroupSize(d),g=xD(e,t,1===m[1]&&1===m[2]),b=this.programManager.getArtifact(g);if(b||(b=this.programManager.build(e,m),this.programManager.setArtifact(g,b),be("info",()=>`[artifact] key: ${g}, programName: ${e.name}`)),p&&b.uniformVariablesInfo){if(p.length!==b.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${b.uniformVariablesInfo.length}, got ${p.length} in program "${b.programInfo.name}".`);for(let e=0;e<p.length;e++){let t=p[e],n=t.type,i="number"==typeof t.data?1:t.data.length,[o,a]=b.uniformVariablesInfo[e];if(n!==o||i!==a)throw Error(`Uniform variable ${e} mismatch: expect type ${o} with size ${a}, got type ${n} with size ${i} in program "${b.programInfo.name}".`)}}if(be("info",()=>`[ProgramManager] run "${e.name}" (key=${g}) with ${m[0]}x${m[1]}x${m[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let e={kernelId:this.currentKernelId,programName:b.programInfo.name,inputTensorViews:t,outputTensorViews:h};this.pendingKernels.push(e),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(b,u,f,m,s),yt(e.name),h}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,i){let o=Tx.get(e);if(!o)throw Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:i,kernelEntry:o[0],attributes:[o[1],n]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let e of t)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let i=this.kernels.get(e);if(!i)throw Error(`kernel not created: ${e}`);let o=i.kernelType,a=i.kernelName,s=i.kernelEntry,u=i.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${o}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),be("info",()=>`[WebGPU] Start to run kernel "[${o}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(e){return n.push(Promise.resolve(`[WebGPU] Kernel "[${o}] ${a}" failed. ${e}`)),1}finally{for(let e of(l&&n.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${o}] ${a}": ${e.message}`:null)),this.temporaryData))this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,i){let o=this.sessionExternalDataMapping.get(e);o||(o=new Map,this.sessionExternalDataMapping.set(e,o));let a=o.get(t),s=this.gpuDataManager.registerExternalBuffer(n,i,a);return o.set(t,[s,n]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let i=await yc(this,e,t);return Ca(i.buffer,n)}}writeTimestamp(e){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){be("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){be("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){be("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let i=0;i<n;i++){let n=this.getComputePassEncoder(),o=e[i];this.writeTimestamp(2*this.pendingDispatchNumber),n.setPipeline(o.computePipeline),n.setBindGroup(0,o.bindGroup),n.dispatchWorkgroups(...o.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Ox={};Sr(Ox,{init:()=>TD});var jo,Uc,TD,ID,ba,ya,Hr,SD,Ex,Bo,_a,wa,Cx,va,xa,Ta,qr,Ft,Ko,ns,rs,ts,Wc,Hc,fo,ho,AD,Dx,kx,Nx,Lx,Rx,zx,Mx,Bx,OD,os,Px=N(()=>{"use strict";ue(),Gn(),fe(),T_(),jo=class e{constructor(e,t,n,i){this.module=e,this.dataType=t,this.data=n,this.dims=i}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let e=D.size(this.dims);return 0===e?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let e=D.size(this.dims);return 0===e?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let e=D.size(this.dims);return 0===e?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let e=D.size(this.dims);return 0===e?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(t){if(D.size(t)!==D.size(this.dims))throw Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Uc=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,o=n/e.PTR_SIZE,a=4===i?"i32":"i64";this.opKernelContext=Number(e.getValue(i*o++,a));let s=Number(e.getValue(i*o++,a));this.outputCount=Number(e.getValue(i*o++,a)),this.customDataOffset=Number(e.getValue(i*o++,"*")),this.customDataSize=Number(e.getValue(i*o++,a));let u=[];for(let t=0;t<s;t++){let t=Number(e.getValue(i*o++,a)),n=Number(e.getValue(i*o++,"*")),s=Number(e.getValue(i*o++,a)),l=[];for(let t=0;t<s;t++)l.push(Number(e.getValue(i*o++,a)));u.push(new jo(e,t,n,l))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let n=t?.inputs?.map(e=>"number"==typeof e?this.inputs[e]:e)??this.inputs,i=t?.outputs??[],o=(e,t,n)=>new jo(this.module,t,this.output(e,n),n),a=(e,t)=>{let n=_r(e,t);if(!n)throw Error(`Unsupported data type: ${e}`);let i=n>0?this.backend.gpuDataManager.create(n).id:0;return new jo(this.module,e,i,t)};return this.backend.run(e,n,i,o,a,this.outputCount)}output(e,t){let n=this.module.stackSave();try{let n=this.module.PTR_SIZE,i=4===n?"i32":"i64",o=this.module.stackAlloc((1+t.length)*n);this.module.setValue(o,t.length,i);for(let e=0;e<t.length;e++)this.module.setValue(o+n*(e+1),t[e],i);return this.module._JsepOutput(this.opKernelContext,e,o)}catch(n){throw Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${n}`)}finally{this.module.stackRestore(n)}}},TD=async(e,t,n,i)=>{let o=t.jsepInit;if(!o)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===e){let e=new(Ax(),Xr($x)).WebGpuBackend;await e.initialize(n,i),o("webgpu",[e,t=>e.alloc(Number(t)),t=>e.free(t),(n,i,o,a=!1)=>{if(a)be("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(n)}, dst=${Number(i)}, size=${Number(o)}`),e.memcpy(Number(n),Number(i));else{be("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(n)}, gpuDataId=${Number(i)}, size=${Number(o)}`);let a=t.HEAPU8.subarray(Number(n>>>0),Number(n>>>0)+Number(o));e.upload(Number(i),a)}},async(n,i,o)=>{be("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${n}, dataOffset=${i}, size=${o}`),await e.download(Number(n),()=>t.HEAPU8.subarray(Number(i)>>>0,Number(i+o)>>>0))},(n,i,o)=>e.createKernel(n,Number(i),o,t.UTF8ToString(t._JsepGetNodeName(Number(i)))),t=>e.releaseKernel(t),(n,i,o,a)=>{be("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${o}, kernel=${n}, contextDataOffset=${i}`);let s=new Uc(t,e,Number(i));return e.computeKernel(Number(n),s,a)},()=>e.captureBegin(),()=>e.captureEnd(),()=>e.replay()])}else{let e=new La(n);o("webnn",[e,()=>e.reserveTensorId(),t=>e.releaseTensorId(t),async(t,n,i,o,a)=>e.ensureTensor(t,n,i,o,a),(t,n)=>{e.uploadTensor(t,n)},async(t,n)=>e.downloadTensor(t,n),(t,n)=>e.registerMLContext(t,n),!!n.trace])}}}),oc=N(()=>{"use strict";pt(),c_(),p_(),ue(),br(),Sa(),cc(),ID=(e,t)=>{0!==Re()._OrtInit(e,t)&&Oe("Can't initialize onnxruntime.")},ba=async e=>{ID(e.wasm.numThreads,Vo(e.logLevel))},ya=async(e,t)=>{Re().asyncInit?.();let n=e.webgpu.adapter;if("webgpu"===t){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(n){if("object"!=typeof n.limits||"object"!=typeof n.features||"function"!=typeof n.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=e.webgpu.powerPreference;if(void 0!==t&&"low-power"!==t&&"high-performance"!==t)throw Error(`Invalid powerPreference setting: "${t}"`);let i=e.webgpu.forceFallbackAdapter;if(void 0!==i&&"boolean"!=typeof i)throw Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(!(n=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:i})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===t&&(typeof navigator>"u"||!navigator.ml))throw Error("WebNN is not supported in current environment");{let i=(Px(),Xr(Ox)).init;"webgpu"===t&&await i("webgpu",Re(),e,n),"webnn"===t&&await i("webnn",Re(),e)}},Hr=new Map,SD=e=>{let t=Re(),n=t.stackSave();try{let n=t.PTR_SIZE,i=t.stackAlloc(2*n);0!==t._OrtGetInputOutputCount(e,i,i+n)&&Oe("Can't get session input/output count.");let o=4===n?"i32":"i64";return[Number(t.getValue(i,o)),Number(t.getValue(i+n,o))]}finally{t.stackRestore(n)}},Ex=(e,t)=>{let n=Re(),i=n.stackSave(),o=0;try{let i=n.PTR_SIZE,a=n.stackAlloc(2*i);0!==n._OrtGetInputOutputMetadata(e,t,a,a+i)&&Oe("Can't get session input/output metadata.");let s=Number(n.getValue(a,"*"));o=Number(n.getValue(a+i,"*"));let u=n.HEAP32[o/4];if(0===u)return[s,0];let l=n.HEAPU32[o/4+1],d=[];for(let e=0;e<l;e++){let t=Number(n.getValue(o+8+e*i,"*"));d.push(0!==t?n.UTF8ToString(t):Number(n.getValue(o+8+(e+l)*i,"*")))}return[s,u,d]}finally{n.stackRestore(i),0!==o&&n._OrtFree(o)}},Bo=e=>{let t=Re(),n=t._malloc(e.byteLength);if(0===n)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},_a=async(e,t)=>{let n,i,o=Re();Array.isArray(e)?[n,i]=e:e.buffer===o.HEAPU8.buffer?[n,i]=[e.byteOffset,e.byteLength]:[n,i]=Bo(e);let a=0,s=0,u=0,l=[],d=[],p=[];try{if([s,l]=await d_(t),t?.externalData&&o.mountExternalData){let e=[];for(let n of t.externalData){let t="string"==typeof n?n:n.path;e.push(Go("string"==typeof n?n:n.data).then(e=>{o.mountExternalData(t,e)}))}await Promise.all(e)}for(let e of t?.executionProviders??[])if(("string"==typeof e?e:e.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,"string"!=typeof e){let t=e,n=t?.context,i=t?.gpuDevice,a=t?.deviceType,s=t?.powerPreference;n?o.currentContext=n:i?o.currentContext=await o.webnnCreateMLContext(i):o.currentContext=await o.webnnCreateMLContext({deviceType:a,powerPreference:s})}else o.currentContext=await o.webnnCreateMLContext();break}a=await o._OrtCreateSession(n,i,s),o.webgpuOnCreateSession?.(a),0===a&&Oe("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(a,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[e,c]=SD(a),h=!!t?.enableGraphCapture,f=[],m=[],g=[],b=[],y=[];for(let t=0;t<e;t++){let[e,n,i]=Ex(a,t);0===e&&Oe("Can't get an input name."),d.push(e);let s=o.UTF8ToString(e);f.push(s),g.push(0===n?{name:s,isTensor:!1}:{name:s,isTensor:!0,type:Vn(n),shape:i})}for(let n=0;n<c;n++){let[i,s,u]=Ex(a,n+e);0===i&&Oe("Can't get an output name."),p.push(i);let l=o.UTF8ToString(i);m.push(l),b.push(0===s?{name:l,isTensor:!1}:{name:l,isTensor:!0,type:Vn(s),shape:u});{if(h&&t?.preferredOutputLocation===void 0){y.push("gpu-buffer");continue}let e="string"==typeof t?.preferredOutputLocation?t.preferredOutputLocation:t?.preferredOutputLocation?.[l]??"cpu",n=o.webnnIsGraphOutput;if("cpu"===e&&n&&n(a,l)){y.push("ml-tensor-cpu-output");continue}if("cpu"!==e&&"cpu-pinned"!==e&&"gpu-buffer"!==e&&"ml-tensor"!==e)throw Error(`Not supported preferred output location: ${e}.`);if(h&&"gpu-buffer"!==e)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);y.push(e)}}let _=null;return y.some(e=>"gpu-buffer"===e||"ml-tensor"===e||"ml-tensor-cpu-output"===e)&&(u=o._OrtCreateBinding(a),0===u&&Oe("Can't create IO binding."),_={handle:u,outputPreferredLocations:y,outputPreferredLocationsEncoded:y.map(e=>"ml-tensor-cpu-output"===e?"ml-tensor":e).map(e=>lc(e))}),Hr.set(a,[a,d,p,_,h,!1]),[a,f,m,g,b]}catch(e){throw d.forEach(e=>o._OrtFree(e)),p.forEach(e=>o._OrtFree(e)),0!==u&&0!==o._OrtReleaseBinding(u)&&Oe("Can't release IO binding."),0!==a&&0!==o._OrtReleaseSession(a)&&Oe("Can't release session."),e}finally{o._free(n),0!==s&&0!==o._OrtReleaseSessionOptions(s)&&Oe("Can't release session options."),l.forEach(e=>o._free(e)),o.unmountExternalData?.()}},wa=e=>{let t=Re(),n=Hr.get(e);if(!n)throw Error(`cannot release session. invalid session id: ${e}`);let[i,o,a,s,u]=n;s&&(u&&0!==t._OrtClearBoundOutputs(s.handle)&&Oe("Can't clear bound outputs."),0!==t._OrtReleaseBinding(s.handle)&&Oe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),o.forEach(e=>t._OrtFree(e)),a.forEach(e=>t._OrtFree(e)),0!==t._OrtReleaseSession(i)&&Oe("Can't release session."),Hr.delete(e)},Cx=async(e,t,n,i,o,a,s=!1)=>{if(!e)return void t.push(0);let u=Re(),l=u.PTR_SIZE,d=e[0],p=e[1],c=e[3],h=c,f,m;if("string"===d&&("gpu-buffer"===c||"ml-tensor"===c))throw Error("String tensor is not supported on GPU.");if(s&&"gpu-buffer"!==c)throw Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if("gpu-buffer"===c){let t=e[2].gpuBuffer;m=_r(yr(d),p);{let e=u.jsepRegisterBuffer;if(!e)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=e(i,a,t,m)}}else if("ml-tensor"===c){let t=e[2].mlTensor;m=_r(yr(d),p);let n=u.webnnRegisterMLTensor;if(!n)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=n(i,t,yr(d),p)}else{let t=e[2];if(Array.isArray(t)){m=l*t.length,f=u._malloc(m),n.push(f);for(let e=0;e<t.length;e++){if("string"!=typeof t[e])throw TypeError(`tensor data at index ${e} is not a string`);u.setValue(f+e*l,Pt(t[e],n),"*")}}else{let e=u.webnnIsGraphInput,a=u.webnnIsGraphOutput;if("string"!==d&&e&&a){let s=u.UTF8ToString(o);if(e(i,s)||a(i,s)){let e=yr(d);m=_r(e,p),h="ml-tensor";let n=u.webnnCreateTemporaryTensor,o=u.webnnUploadTensor;if(!n||!o)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let a=await n(i,e,p);o(a,new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),f=a}else m=t.byteLength,f=u._malloc(m),n.push(f),u.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,m),f)}else m=t.byteLength,f=u._malloc(m),n.push(f),u.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,m),f)}}let g=u.stackSave(),b=u.stackAlloc(4*p.length);try{p.forEach((e,t)=>u.setValue(b+t*l,e,4===l?"i32":"i64"));let e=u._OrtCreateTensor(yr(d),f,m,b,p.length,lc(h));0===e&&Oe(`Can't create tensor for input/output. session=${i}, index=${a}.`),t.push(e)}finally{u.stackRestore(g)}},va=async(e,t,n,i,o,a)=>{let s=Re(),u=s.PTR_SIZE,l=Hr.get(e);if(!l)throw Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],p=l[1],c=l[2],h=l[3],f=l[4],m=l[5],g=t.length,b=i.length,y=0,_=[],v=[],x=[],w=[],$=[],T=s.stackSave(),I=s.stackAlloc(g*u),S=s.stackAlloc(g*u),O=s.stackAlloc(b*u),E=s.stackAlloc(b*u);try{let l;[y,_]=l_(a),sr("wasm prepareInputOutputTensor");for(let i=0;i<g;i++)await Cx(n[i],v,w,e,p[t[i]],t[i],f);for(let t=0;t<b;t++)await Cx(o[t],x,w,e,c[i[t]],g+i[t],f);ur("wasm prepareInputOutputTensor");for(let e=0;e<g;e++)s.setValue(I+e*u,v[e],"*"),s.setValue(S+e*u,p[t[e]],"*");for(let e=0;e<b;e++)s.setValue(O+e*u,x[e],"*"),s.setValue(E+e*u,c[i[e]],"*");if(h&&!m){let{handle:n,outputPreferredLocations:a,outputPreferredLocationsEncoded:u}=h;if(p.length!==g)throw Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${p.length}).`);sr("wasm bindInputsOutputs");for(let i=0;i<g;i++){let o=t[i];await s._OrtBindInput(n,p[o],v[i])!==0&&Oe(`Can't bind input[${i}] for session=${e}.`)}for(let t=0;t<b;t++){let l=i[t];o[t]?.[3]?($.push(x[t]),0!==s._OrtBindOutput(n,c[l],x[t],0)&&Oe(`Can't bind pre-allocated output[${t}] for session=${e}.`)):0!==s._OrtBindOutput(n,c[l],0,u[l])&&Oe(`Can't bind output[${t}] to ${a[t]} for session=${e}.`)}ur("wasm bindInputsOutputs"),Hr.set(e,[d,p,c,h,f,!0])}s.jsepOnRunStart?.(d),s.webnnOnRunStart?.(d),l=h?await s._OrtRunWithBinding(d,h.handle,b,O,y):await s._OrtRun(d,S,I,g,E,b,O,y),0!==l&&Oe("failed to call OrtRun().");let T=[],A=[];sr("wasm ProcessOutputTensor");for(let t=0;t<b;t++){let n=Number(s.getValue(O+t*u,"*"));if(n===x[t]||$.includes(x[t])){T.push(o[t]),n!==x[t]&&0!==s._OrtReleaseTensor(n)&&Oe("Can't release tensor.");continue}let a=s.stackSave(),l=s.stackAlloc(4*u),d=!1,p,c=0;try{0!==s._OrtGetTensorData(n,l,l+u,l+2*u,l+3*u)&&Oe(`Can't access output tensor data on index ${t}.`);let o=4===u?"i32":"i64",a=Number(s.getValue(l,o));c=s.getValue(l+u,"*");let f=s.getValue(l+2*u,"*"),m=Number(s.getValue(l+3*u,o)),g=[];for(let e=0;e<m;e++)g.push(Number(s.getValue(f+e*u,o)));0!==s._OrtFree(f)&&Oe("Can't free memory for tensor dims.");let b=g.reduce((e,t)=>e*t,1);p=Vn(a);let y=h?.outputPreferredLocations[i[t]];if("string"===p){if("gpu-buffer"===y||"ml-tensor"===y)throw Error("String tensor is not supported on GPU.");let e=[];for(let t=0;t<b;t++){let n=s.getValue(c+t*u,"*"),i=s.getValue(c+(t+1)*u,"*"),o=t===b-1?void 0:i-n;e.push(s.UTF8ToString(n,o))}T.push([p,g,e,"cpu"])}else if("gpu-buffer"===y&&b>0){let e=s.jsepGetBuffer;if(!e)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let t=e(c),i=_r(a,b);if(void 0===i||!Aa(p))throw Error(`Unsupported data type: ${p}`);d=!0,T.push([p,g,{gpuBuffer:t,download:s.jsepCreateDownloader(t,i,p),dispose:()=>{0!==s._OrtReleaseTensor(n)&&Oe("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===y&&b>0){let t=s.webnnEnsureTensor,i=s.webnnIsGraphInputOutputTypeSupported;if(!t||!i)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===_r(a,b)||!Oa(p))throw Error(`Unsupported data type: ${p}`);if(!i(e,p,!1))throw Error(`preferredLocation "ml-tensor" for ${p} output is not supported by current WebNN Context.`);let o=await t(e,c,a,g,!1);d=!0,T.push([p,g,{mlTensor:o,download:s.webnnCreateMLTensorDownloader(c,p),dispose:()=>{s.webnnReleaseTensorId(c),s._OrtReleaseTensor(n)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===y&&b>0){let e=s.webnnCreateMLTensorDownloader(c,p)(),t=T.length;d=!0,A.push((async()=>{let i=[t,await e];return s.webnnReleaseTensorId(c),s._OrtReleaseTensor(n),i})()),T.push([p,g,[],"cpu"])}else{let e=new(uo(p))(b);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(s.HEAPU8.subarray(c,c+e.byteLength)),T.push([p,g,e,"cpu"])}}finally{s.stackRestore(a),"string"===p&&c&&s._free(c),d||s._OrtReleaseTensor(n)}}for(let[t,n]of(h&&!f&&(0!==s._OrtClearBoundOutputs(h.handle)&&Oe("Can't clear bound outputs."),Hr.set(e,[d,p,c,h,f,!1])),await Promise.all(A)))T[t][2]=n;return ur("wasm ProcessOutputTensor"),T}finally{s.webnnOnRunEnd?.(d),s.stackRestore(T),v.forEach(e=>s._OrtReleaseTensor(e)),x.forEach(e=>s._OrtReleaseTensor(e)),w.forEach(e=>s._free(e)),0!==y&&s._OrtReleaseRunOptions(y),_.forEach(e=>s._free(e))}},xa=e=>{let t=Re(),n=Hr.get(e);if(!n)throw Error("invalid session id");let i=n[0],o=t._OrtEndProfiling(i);0===o&&Oe("Can't get an profile file name."),t._OrtFree(o)},Ta=e=>{let t=[];for(let n of e){let e=n[2];!Array.isArray(e)&&"buffer"in e&&t.push(e.buffer)}return t}}),qc=N(()=>{"use strict";pt(),oc(),br(),ma(),qr=()=>!!pe.wasm.proxy&&"u">typeof document,Ko=!1,ns=!1,rs=!1,Hc=new Map,fo=(e,t)=>{let n=Hc.get(e);n?n.push(t):Hc.set(e,[t])},ho=()=>{if(Ko||!ns||rs||!Ft)throw Error("worker not ready")},AD=e=>{switch(e.data.type){case"init-wasm":Ko=!1,e.data.err?(rs=!0,Wc[1](e.data.err)):(ns=!0,Wc[0]()),ts&&(URL.revokeObjectURL(ts),ts=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Hc.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out)}}},Dx=async()=>{if(!ns){if(Ko)throw Error("multiple calls to 'initWasm()' detected.");if(rs)throw Error("previous call to 'initWasm()' failed.");if(Ko=!0,qr())return new Promise((e,t)=>{Ft?.terminate(),a_().then(([n,i])=>{try{(Ft=i).onerror=e=>t(e),Ft.onmessage=AD,Wc=[e,t];let o={type:"init-wasm",in:pe};!o.in.wasm.wasmPaths&&(n||ac)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Ft.postMessage(o),ts=n}catch(e){t(e)}},t)});try{await ga(pe.wasm),await ba(pe),ns=!0}catch(e){throw rs=!0,e}finally{Ko=!1}}},kx=async e=>{if(qr())return ho(),new Promise((t,n)=>{fo("init-ep",[t,n]);let i={type:"init-ep",in:{epName:e,env:pe}};Ft.postMessage(i)});await ya(pe,e)},Nx=async e=>qr()?(ho(),new Promise((t,n)=>{fo("copy-from",[t,n]);let i={type:"copy-from",in:{buffer:e}};Ft.postMessage(i,[e.buffer])})):Bo(e),Lx=async(e,t)=>{if(!qr())return _a(e,t);if(t?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return ho(),new Promise((n,i)=>{fo("create",[n,i]);let o={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),Ft.postMessage(o,a)})},Rx=async e=>{if(qr())return ho(),new Promise((t,n)=>{fo("release",[t,n]);let i={type:"release",in:e};Ft.postMessage(i)});wa(e)},zx=async(e,t,n,i,o,a)=>{if(!qr())return va(e,t,n,i,o,a);if(n.some(e=>"cpu"!==e[3]))throw Error("input tensor on GPU is not supported for proxy.");if(o.some(e=>e))throw Error("pre-allocated output tensor is not supported for proxy.");return ho(),new Promise((o,s)=>{fo("run",[o,s]);let u=n,l={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:i,options:a}};Ft.postMessage(l,Ta(u))})},Mx=async e=>{if(qr())return ho(),new Promise((t,n)=>{fo("end-profiling",[t,n]);let i={type:"end-profiling",in:e};Ft.postMessage(i)});xa(e)}}),Fx=N(()=>{"use strict";pt(),qc(),ue(),ha(),cc(),Bx=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${e.location} for ${t()}`)}},OD=e=>{switch(e[3]){case"cpu":return new St(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Aa(t))throw Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:i,dispose:o}=e[2];return St.fromGpuBuffer(n,{dataType:t,dims:e[1],download:i,dispose:o})}case"ml-tensor":{let t=e[0];if(!Oa(t))throw Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:i,dispose:o}=e[2];return St.fromMLTensor(n,{dataType:t,dims:e[1],download:i,dispose:o})}default:throw Error(`invalid data location: ${e[3]}`)}},os=class{async fetchModelAndCopyToWasmMemory(e){return Nx(await Go(e))}async loadModel(e,t){let n;$t(),n="string"==typeof e?await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Lx(n,t),yt()}async dispose(){return Rx(this.sessionId)}async run(e,t,n){$t();let i=[],o=[];Object.entries(e).forEach(e=>{let t=e[0],n=e[1],a=this.inputNames.indexOf(t);if(-1===a)throw Error(`invalid input '${t}'`);i.push(n),o.push(a)});let a=[],s=[];Object.entries(t).forEach(e=>{let t=e[0],n=e[1],i=this.outputNames.indexOf(t);if(-1===i)throw Error(`invalid output '${t}'`);a.push(n),s.push(i)});let u=i.map((e,t)=>Bx(e,()=>`input "${this.inputNames[o[t]]}"`)),l=a.map((e,t)=>e?Bx(e,()=>`output "${this.outputNames[s[t]]}"`):null),d=await zx(this.sessionId,o,u,s,l,n),p={};for(let e=0;e<d.length;e++)p[this.outputNames[s[e]]]=a[e]??OD(d[e]);return yt(),p}startProfiling(){}endProfiling(){Mx(this.sessionId)}}}),Gx={};Sr(Gx,{OnnxruntimeWebAssemblyBackend:()=>is,initializeFlags:()=>Vx,wasmBackend:()=>PD});var Vx,is,PD,Ux=N(()=>{"use strict";pt(),qc(),Fx(),Vx=()=>{("number"!=typeof pe.wasm.initTimeout||pe.wasm.initTimeout<0)&&(pe.wasm.initTimeout=0);let e=pe.wasm.simd;if("boolean"!=typeof e&&void 0!==e&&"fixed"!==e&&"relaxed"!==e&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),pe.wasm.simd=!1),"boolean"!=typeof pe.wasm.proxy&&(pe.wasm.proxy=!1),"boolean"!=typeof pe.wasm.trace&&(pe.wasm.trace=!1),"number"!=typeof pe.wasm.numThreads||!Number.isInteger(pe.wasm.numThreads)||pe.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)pe.wasm.numThreads=1;else{let e=typeof navigator>"u"?Ps("node:os").cpus().length:navigator.hardwareConcurrency;pe.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},PD=new(is=class{async init(e){Vx(),await Dx(),await kx(e)}async createInferenceSessionHandler(e,t){let n=new os;return await n.loadModel(e,t),n}})});pt(),pt(),pt();var gf="1.24.3",lK=Ls;{let r=(jy(),Xr(qy)).onnxjsBackend;ar("webgl",r,-10)}{let r=(Ux(),Xr(Gx)).wasmBackend;ar("webgpu",r,5),ar("webnn",r,5),ar("cpu",r,10),ar("wasm",r,10)}Object.defineProperty(pe.versions,"web",{value:gf,enumerable:!0});export{sI as InferenceSession,di as TRACE,sr as TRACE_EVENT_BEGIN,ur as TRACE_EVENT_END,$t as TRACE_FUNC_BEGIN,yt as TRACE_FUNC_END,St as Tensor,lK as default,pe as env,ar as registerBackend};