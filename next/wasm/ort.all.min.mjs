/*! LICENSE: ort.all.min.mjs.LICENSE.txt */
var lo,Wn,An,Cx,Al,Ol,Cl,Be,te,kl,Ll,da,Nl,zl,Ml,Bl,Vl,Hn,Cr,Gl,Ul,Hl,ql,He,ot,po,Kl,it,Qe,Pn,On,fo,Dx,$x=Object.create,uo=Object.defineProperty,Ax=Object.getOwnPropertyDescriptor,Px=Object.getOwnPropertyNames,Ox=Object.getPrototypeOf,Ex=Object.prototype.hasOwnProperty,ua=(e=>"u">typeof require?require:"u">typeof Proxy?new Proxy(e,{get:(e,t)=>("u">typeof require?require:e)[t]}):e)(function(e){if("u">typeof require)return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),$=(e,t)=>()=>(e&&(t=e(e=0)),t),G=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),dr=(e,t)=>{for(var n in t)uo(e,n,{get:t[n],enumerable:!0})},$l=(e,t,n,i)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let o of Px(t))Ex.call(e,o)||o===n||uo(e,o,{get:()=>t[o],enumerable:!(i=Ax(t,o))||i.enumerable});return e},se=(e,t,n)=>(n=null!=e?$x(Ox(e)):{},$l(!t&&e&&e.__esModule?n:uo(n,"default",{value:e,enumerable:!0}),e)),Er=e=>$l(uo({},"__esModule",{value:!0}),e),la=$(()=>{"use strict";lo=new Map,Wn=[],An=(e,t,n)=>{if(t&&"function"==typeof t.init&&"function"==typeof t.createInferenceSessionHandler){let i=lo.get(e);if(void 0===i)lo.set(e,{backend:t,priority:n});else{if(i.priority>n)return;if(i.priority===n&&i.backend!==t)throw Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let t=Wn.indexOf(e);-1!==t&&Wn.splice(t,1);for(let t=0;t<Wn.length;t++)if(lo.get(Wn[t]).priority<=n)return void Wn.splice(t,0,e);Wn.push(e)}return}throw TypeError("not a valid backend")},Cx=async e=>{let t=lo.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(e){return n||(t.error=`${e}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Al=async e=>{let t=e.executionProviders||[],n=t.map(e=>"string"==typeof e?e:e.name),i=0===n.length?Wn:n,o,s=[],a=new Set;for(let e of i){let t=await Cx(e);"string"==typeof t?s.push({name:e,err:t}):(o||(o=t),o===t&&a.add(e))}if(!o)throw Error(`no available backend found. ERR: ${s.map(e=>`[${e.name}] ${e.err}`).join(", ")}`);for(let{name:e,err:t}of s)n.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${t}`);let u=t.filter(e=>a.has("string"==typeof e?e:e.name));return[o,new Proxy(e,{get:(e,t)=>"executionProviders"===t?u:Reflect.get(e,t)})]}}),Pl=$(()=>{"use strict";la()}),El=$(()=>{"use strict";Ol="1.24.3"}),ca=$(()=>{"use strict";El(),Cl="warning",Object.defineProperty(Be={wasm:{},webgl:{},webgpu:{},versions:{common:Ol},set logLevel(r){if(void 0!==r){if("string"!=typeof r||-1===["verbose","info","warning","error","fatal"].indexOf(r))throw Error(`Unsupported logging level: ${r}`);Cl=r}},get logLevel(){return Cl}},"logLevel",{enumerable:!0})}),Dl=$(()=>{"use strict";ca(),te=Be}),Rl=$(()=>{"use strict";kl=(e,t)=>{let n="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let i=n.getContext("2d");if(null!=i){let o,s;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(o=e.dims[2],s=e.dims[3]):(o=e.dims[3],s=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,d;void 0===u||void 0===u.mean?l=[255,255,255,255]:"number"==typeof u.mean?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],void 0!==u.mean[3]&&(l[3]=u.mean[3])),void 0===u||void 0===u.bias?d=[0,0,0,0]:"number"==typeof u.bias?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(d[3]=u.bias[3]));let p=s*o,c=0,h=p,f=2*p,m=-1;"RGBA"===a?(c=0,h=p,f=2*p,m=3*p):"RGB"===a?(c=0,h=p,f=2*p):"RBG"===a&&(c=0,f=p,h=2*p);for(let t=0;t<s;t++)for(let n=0;n<o;n++)i.fillStyle="rgba("+(e.data[c++]-d[0])*l[0]+","+(e.data[h++]-d[1])*l[1]+","+(e.data[f++]-d[2])*l[2]+","+(-1===m?255:(e.data[m++]-d[3])*l[3])+")",i.fillRect(n,t,1,1);if("toDataURL"in n)return n.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},Ll=(e,t)=>{let n="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(null!=n){let o,s,a;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(o=e.dims[2],s=e.dims[1],a=e.dims[3]):(o=e.dims[3],s=e.dims[2],a=e.dims[1]);let u=void 0!==t&&void 0!==t.format?t.format:"RGB",l=t?.norm,d,p;void 0===l||void 0===l.mean?d=[255,255,255,255]:"number"==typeof l.mean?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],void 0!==l.mean[3]&&(d[3]=l.mean[3])),void 0===l||void 0===l.bias?p=[0,0,0,0]:"number"==typeof l.bias?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],void 0!==l.bias[3]&&(p[3]=l.bias[3]));let c=s*o;if(void 0!==t&&(void 0!==t.format&&4===a&&"RGBA"!==t.format||3===a&&"RGB"!==t.format&&"BGR"!==t.format))throw Error("Tensor format doesn't match input tensor dims");let h=4,f=0,m=1,g=2,b=3,y=0,_=c,v=2*c,x=-1;"RGBA"===u?(y=0,_=c,v=2*c,x=3*c):"RGB"===u?(y=0,_=c,v=2*c):"RBG"===u&&(y=0,v=c,_=2*c),i=n.createImageData(o,s);for(let t=0;t<s*o;f+=h,m+=h,g+=h,b+=h,t++)i.data[f]=(e.data[y++]-p[0])*d[0],i.data[m]=(e.data[_++]-p[1])*d[1],i.data[g]=(e.data[v++]-p[2])*d[2],i.data[b]=-1===x?255:(e.data[x++]-p[3])*d[3]}else throw Error("Can not access image data");return i}}),Fl=$(()=>{"use strict";co(),da=(e,t)=>{if(void 0===e)throw Error("Image buffer must be defined");if(void 0===t.height||void 0===t.width)throw Error("Image height and width must be defined");if("NHWC"===t.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:n,width:i}=t,o=t.norm??{mean:255,bias:0},s,a;s="number"==typeof o.mean?[o.mean,o.mean,o.mean,o.mean]:[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],a="number"==typeof o.bias?[o.bias,o.bias,o.bias,o.bias]:[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let u=void 0!==t.format?t.format:"RGBA",l=void 0!==t.tensorFormat&&void 0!==t.tensorFormat?t.tensorFormat:"RGB",d=n*i,p=new Float32Array("RGBA"===l?4*d:3*d),c=4,h=0,f=1,m=2,g=3,b=0,y=d,_=2*d,v=-1;"RGB"===u&&(c=3,h=0,f=1,m=2,g=-1),"RGBA"===l?v=3*d:"RBG"===l?(b=0,_=d,y=2*d):"BGR"===l&&(_=0,y=d,b=2*d);for(let t=0;t<d;t++,h+=c,m+=c,f+=c,g+=c)p[b++]=(e[h]+a[0])/s[0],p[y++]=(e[f]+a[1])/s[1],p[_++]=(e[m]+a[2])/s[2],-1!==v&&-1!==g&&(p[v++]=(e[g]+a[3])/s[3]);return"RGBA"===l?new He("float32",p,[1,4,n,i]):new He("float32",p,[1,3,n,i])},Nl=async(e,t)=>{let n="u">typeof HTMLImageElement&&e instanceof HTMLImageElement,i="u">typeof ImageData&&e instanceof ImageData,o="u">typeof ImageBitmap&&e instanceof ImageBitmap,s="string"==typeof e,a,u=t??{},l=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},d=e=>"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext("2d"):null;if(n){let n=l();n.width=e.width,n.height=e.height;let i=d(n);if(null!=i){let n=e.height,o=e.width;if(void 0!==t&&void 0!==t.resizedHeight&&void 0!==t.resizedWidth&&(n=t.resizedHeight,o=t.resizedWidth),void 0!==t){if(u=t,void 0!==t.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=n,u.width=o}else u.tensorFormat="RGBA",u.height=n,u.width=o;i.drawImage(e,0,0),a=i.getImageData(0,0,o,n).data}else throw Error("Can not access image data")}else if(i){let n,i;if(void 0!==t&&void 0!==t.resizedWidth&&void 0!==t.resizedHeight?(n=t.resizedHeight,i=t.resizedWidth):(n=e.height,i=e.width),void 0!==t&&(u=t),u.format="RGBA",u.height=n,u.width=i,void 0!==t){let t=l();t.width=i,t.height=n;let o=d(t);if(null!=o)o.putImageData(e,0,0),a=o.getImageData(0,0,i,n).data;else throw Error("Can not access image data")}else a=e.data}else if(o){if(void 0===t)throw Error("Please provide image config with format for Imagebitmap");let n=l();n.width=e.width,n.height=e.height;let i=d(n);if(null!=i){let t=e.height,n=e.width;return i.drawImage(e,0,0,n,t),a=i.getImageData(0,0,n,t).data,u.height=t,u.width=n,da(a,u)}throw Error("Can not access image data")}else{if(s)return new Promise((t,n)=>{let i=l(),o=d(i);if(!e||!o)return n();let s=new Image;s.crossOrigin="Anonymous",s.src=e,s.onload=()=>{i.width=s.width,i.height=s.height,o.drawImage(s,0,0,i.width,i.height);let e=o.getImageData(0,0,i.width,i.height);u.height=i.height,u.width=i.width,t(da(e.data,u))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==a)return da(a,u);throw Error("Input data provided is not supported - aborted tensor creation")},zl=(e,t)=>{let{width:n,height:i,download:o,dispose:s}=t;return new He({location:"texture",type:"float32",texture:e,dims:[1,i,n,4],download:o,dispose:s})},Ml=(e,t)=>{let{dataType:n,dims:i,download:o,dispose:s}=t;return new He({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:i,download:o,dispose:s})},Bl=(e,t)=>{let{dataType:n,dims:i,download:o,dispose:s}=t;return new He({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:i,download:o,dispose:s})},Vl=(e,t,n)=>new He({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})}),Wl=$(()=>{"use strict";Hn=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Cr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Gl=!1,Ul=()=>{if(!Gl){Gl=!0;let e="u">typeof BigInt64Array&&BigInt64Array.from,t="u">typeof BigUint64Array&&BigUint64Array.from,n=globalThis.Float16Array,i="u">typeof n&&n.from;e&&(Hn.set("int64",BigInt64Array),Cr.set(BigInt64Array,"int64")),t&&(Hn.set("uint64",BigUint64Array),Cr.set(BigUint64Array,"uint64")),i?(Hn.set("float16",n),Cr.set(n,"float16")):Hn.set("float16",Uint16Array)}}}),jl=$(()=>{"use strict";co(),Hl=e=>{let t=1;for(let n=0;n<e.length;n++){let i=e[n];if("number"!=typeof i||!Number.isSafeInteger(i))throw TypeError(`dims[${n}] must be an integer, got: ${i}`);if(i<0)throw RangeError(`dims[${n}] must be a non-negative integer, got: ${i}`);t*=i}return t},ql=(e,t)=>{switch(e.location){case"cpu":return new He(e.type,e.data,t);case"cpu-pinned":return new He({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new He({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new He({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new He({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),co=$(()=>{"use strict";Rl(),Fl(),Wl(),jl(),He=class{constructor(e,t,n){let i,o;if(Ul(),"object"==typeof e&&"location"in e)switch(this.dataLocation=e.location,i=e.type,o=e.dims,e.location){case"cpu-pinned":{let t=Hn.get(i);if(!t)throw TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof t))throw TypeError(`buffer should be of type ${t.name}`);this.cpuData=e.data;break}case"texture":if("float32"!==i)throw TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case"gpu-buffer":if("float32"!==i&&"float16"!==i&&"int32"!==i&&"int64"!==i&&"uint32"!==i&&"uint8"!==i&&"bool"!==i&&"uint4"!==i&&"int4"!==i)throw TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case"ml-tensor":if("float32"!==i&&"float16"!==i&&"int32"!==i&&"int64"!==i&&"uint32"!==i&&"uint64"!==i&&"int8"!==i&&"uint8"!==i&&"bool"!==i&&"uint4"!==i&&"int4"!==i)throw TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,a;if("string"==typeof e)if(i=e,a=n,"string"===e){if(!Array.isArray(t))throw TypeError("A string tensor's data must be a string array.");s=t}else{let n=Hn.get(e);if(void 0===n)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if("float16"===e&&n===Uint16Array||"uint4"===e||"int4"===e)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${n.name} as data.`);s="uint64"===e||"int64"===e?n.from(t,BigInt):n.from(t)}else if(t instanceof n)s=t;else if(t instanceof Uint8ClampedArray)if("uint8"===e)s=Uint8Array.from(t);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===e&&t instanceof Uint16Array&&n!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw TypeError(`A ${i} tensor's data must be type of ${n}`)}else if(a=t,Array.isArray(e)){if(0===e.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let t=typeof e[0];if("string"===t)i="string",s=e;else if("boolean"===t)i="bool",s=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${t}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let t=Cr.get(e.constructor);if(void 0===t)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=t,s=e}if(void 0===a)a=[s.length];else if(!Array.isArray(a))throw TypeError("A tensor's dims must be a number array");o=a,this.cpuData=s,this.dataLocation="cpu"}let s=Hl(o);if(this.cpuData&&s!==this.cpuData.length&&("uint4"!==i&&"int4"!==i||Math.ceil(s/2)!==this.cpuData.length))throw Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=o,this.size=s}static async fromImage(e,t){return Nl(e,t)}static fromTexture(e,t){return zl(e,t)}static fromGpuBuffer(e,t){return Ml(e,t)}static fromMLTensor(e,t){return Bl(e,t)}static fromPinnedBuffer(e,t,n){return Vl(e,t,n)}toDataURL(e){return kl(this,e)}toImageData(e){return Ll(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return ql(this,e)}}}),pa=$(()=>{"use strict";co(),ot=He}),fa=$(()=>{"use strict";ca(),po=(e,t)=>{(typeof Be.trace>"u"?Be.wasm.trace:Be.trace)&&console.timeStamp(`${e}::ORT::${t}`)},Kl=(e,t)=>{let n=Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let o=0;o<n.length;o++){if(i&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${n[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),po("CPU",i);return}n[o].includes("TRACE_FUNC")&&(i=!0)}},it=e=>{(typeof Be.trace>"u"?Be.wasm.trace:Be.trace)&&Kl("BEGIN",e)},Qe=e=>{(typeof Be.trace>"u"?Be.wasm.trace:Be.trace)&&Kl("END",e)},Pn=e=>{(typeof Be.trace>"u"?Be.wasm.trace:Be.trace)&&console.time(`ORT::${e}`)},On=e=>{(typeof Be.trace>"u"?Be.wasm.trace:Be.trace)&&console.timeEnd(`ORT::${e}`)}}),Xl=$(()=>{"use strict";la(),pa(),fa(),fo=class e{constructor(e){this.handler=e}async run(e,t,n){it(),Pn("InferenceSession.run");let i={},o={};if("object"!=typeof e||null===e||e instanceof ot||Array.isArray(e))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if("object"==typeof t){if(null===t)throw TypeError("Unexpected argument[1]: cannot be null.");if(t instanceof ot)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(t)){if(0===t.length)throw TypeError("'fetches' cannot be an empty array.");for(let e of(s=!1,t)){if("string"!=typeof e)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(e))throw RangeError(`'fetches' contains invalid output name: ${e}.`);i[e]=null}if("object"==typeof n&&null!==n)o=n;else if("u">typeof n)throw TypeError("'options' must be an object.")}else{let e=!1,a=Object.getOwnPropertyNames(t);for(let n of this.outputNames)if(-1!==a.indexOf(n)){let o=t[n];(null===o||o instanceof ot)&&(e=!0,s=!1,i[n]=o)}if(e){if("object"==typeof n&&null!==n)o=n;else if("u">typeof n)throw TypeError("'options' must be an object.")}else o=t}}else if("u">typeof t)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let t of this.inputNames)if(typeof e[t]>"u")throw Error(`input '${t}' is missing in 'feeds'.`);if(s)for(let e of this.outputNames)i[e]=null;let a=await this.handler.run(e,i,o),u={};for(let e in a)if(Object.hasOwnProperty.call(a,e)){let t=a[e];t instanceof ot?u[e]=t:u[e]=new ot(t.type,t.data,t.dims)}return On("InferenceSession.run"),Qe(),u}async release(){return this.handler.dispose()}static async create(t,n,i,o){it(),Pn("InferenceSession.create");let s,a={};if("string"==typeof t){if(s=t,"object"==typeof n&&null!==n)a=n;else if("u">typeof n)throw TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,"object"==typeof n&&null!==n)a=n;else if("u">typeof n)throw TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&t instanceof SharedArrayBuffer){let e=t,u=0,l=t.byteLength;if("object"==typeof n&&null!==n)a=n;else if("number"==typeof n){if(!Number.isSafeInteger(u=n))throw RangeError("'byteOffset' must be an integer.");if(u<0||u>=e.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${e.byteLength}).`);if(l=t.byteLength-u,"number"==typeof i){if(!Number.isSafeInteger(l=i))throw RangeError("'byteLength' must be an integer.");if(l<=0||u+l>e.byteLength)throw RangeError(`'byteLength' is out of range (0, ${e.byteLength-u}].`);if("object"==typeof o&&null!==o)a=o;else if("u">typeof o)throw TypeError("'options' must be an object.")}else if("u">typeof i)throw TypeError("'byteLength' must be a number.")}else if("u">typeof n)throw TypeError("'options' must be an object.");s=new Uint8Array(e,u,l)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await Al(a),d=await u.createInferenceSessionHandler(s,l);return On("InferenceSession.create"),Qe(),new e(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Zl=$(()=>{"use strict";Xl(),Dx=fo}),Jl=$(()=>{}),Ql=$(()=>{}),Yl=$(()=>{}),ec=$(()=>{}),ha={};dr(ha,{InferenceSession:()=>Dx,TRACE:()=>po,TRACE_EVENT_BEGIN:()=>Pn,TRACE_EVENT_END:()=>On,TRACE_FUNC_BEGIN:()=>it,TRACE_FUNC_END:()=>Qe,Tensor:()=>ot,env:()=>te,registerBackend:()=>An});var qe=$(()=>{"use strict";Pl(),Dl(),Zl(),pa(),Jl(),Ql(),fa(),Yl(),ec()});function En(e,t,n,i){if(void 0===t)return Lx(e);if(void 0===n)ho(e,t,1);else if("number"==typeof n&&void 0===i)ho(e,t,n);else if("string"==typeof n&&void 0===i)ho(e,n,1,t);else if("string"==typeof n&&"number"==typeof i)ho(e,n,i,t);else throw TypeError("input is valid")}function Lx(e){return{verbose:En.verbose.bind(null,e),info:En.info.bind(null,e),warning:En.warning.bind(null,e),error:En.error.bind(null,e),fatal:En.fatal.bind(null,e)}}function ho(e,t,n,i){let o=Dr[i||""]||Dr[""];nc[e]<nc[o.minimalSeverity]||(o.logDateTime&&(t=`${new Date().toISOString()}|${t}`),o.logSourceLocation,kx[o.provider].log(e,t,i))}var ma,ga,nc,kx,rc,Dr,Te,go,bo,yo,mo,ct=$(()=>{"use strict";ma=class{log(e,t,n){}},ga=class{log(e,t,n){console.log(`${this.color(e)} ${n?"\x1b[35m"+n+"\x1b[0m ":""}${t}`)}color(e){switch(e){case"verbose":return"\x1b[34;40mv\x1b[0m";case"info":return"\x1b[32mi\x1b[0m";case"warning":return"\x1b[30;43mw\x1b[0m";case"error":return"\x1b[31;40me\x1b[0m";case"fatal":return"\x1b[101mf\x1b[0m";default:throw Error(`unsupported severity: ${e}`)}}},nc={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},kx={none:new ma,console:new ga},Dr={"":rc={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1}},(e=>{function t(t,n){e("verbose",t,n)}function n(t,n){e("info",t,n)}function i(t,n){e("warning",t,n)}function o(t,n){e("error",t,n)}function s(t,n){e("fatal",t,n)}function a(e){Dr={},u("",e||{})}function u(e,t){if("*"===e)a(t);else{let n=Dr[e]||rc;Dr[e]={provider:t.provider||n.provider,minimalSeverity:t.minimalSeverity||n.minimalSeverity,logDateTime:void 0===t.logDateTime?n.logDateTime:t.logDateTime,logSourceLocation:void 0===t.logSourceLocation?n.logSourceLocation:t.logSourceLocation}}}e.verbose=t,e.info=n,e.warning=i,e.error=o,e.fatal=s,e.reset=a,e.set=u,e.setWithEnv=function(e){let t={};e.logLevel&&(t.minimalSeverity=e.logLevel),u("",t)}})(En||={}),Te=En,go=class{constructor(e,t,n,i,o,s){this.category=e,this.name=t,this.startTime=n,this.endCallback=i,this.timer=o,this.ctx=s}async end(){return this.endCallback(this)}async checkTimer(){if(void 0===this.ctx||void 0===this.timer)throw Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},bo=class{constructor(e,t,n,i){this.category=e,this.name=t,this.startTime=n,this.endTime=i}},yo=class{constructor(e,t,n){this._started=!1,this._flushPointer=0,this._started=!1,this._maxNumberEvents=void 0===e?1e4:e,this._flushBatchSize=void 0===t?10:t,this._flushIntervalInMilliseconds=void 0===n?5e3:n}static create(e){return void 0===e?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=mo(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,t,n,i){let o=this._started?this.begin(e,t,i):void 0,s=!1,a=n();if(a&&"function"==typeof a.then)return s=!0,new Promise((e,t)=>{a.then(async t=>{o&&await o.end(),e(t)},async e=>{o&&await o.end(),t(e)})});if(!s&&o){let e=o.end();if(e&&"function"==typeof e.then)return new Promise((t,n)=>{e.then(()=>{t(a)},e=>{n(e)})})}return a}begin(e,t,n){if(!this._started)throw Error("profiler is not started yet");if(void 0!==n)return new go(e,t,0,async e=>this.end(e),n.beginTimer(),n);{let n=mo();return this.flush(n),new go(e,t,n,e=>this.endSync(e))}}async end(e){let t=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new bo(e.category,e.name,e.startTime,t)),this.flush(t))}endSync(e){let t=mo();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new bo(e.category,e.name,e.startTime,t)),this.flush(t))}logOneEvent(e){Te.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let e=this._flushPointer;this._flushPointer<e+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=mo()}}get started(){return this._started}},mo="u">typeof performance&&performance.now?()=>performance.now():Date.now});function oc(e,t,n){for(let i of n){let n=i[0],o=i[1],s=i[2],a=i[3],u=i[4];if(e.opType===n){for(let e of t)if((e.domain===o||"ai.onnx"===e.domain&&""===o)&&Rx(e.version,s))return{opImpl:a,opInit:u}}}throw TypeError(`cannot resolve operator '${e.opType}' with opsets: ${t.map(e=>`${e.domain||"ai.onnx"} v${e.version}`).join(", ")}`)}function Rx(e,t){if(t.endsWith("+")){let n=Number.parseInt(t.substring(0,t.length-1),10);return!isNaN(n)&&n<=e}if(2!==t.split("-").length)return Number.parseInt(t,10)===e;{let n=t.split("-"),i=Number.parseInt(n[0],10),o=Number.parseInt(n[1],10);return!isNaN(i)&&!isNaN(o)&&i<=e&&e<=o}}var ic=$(()=>{}),ac=G(e=>{"use strict";e.__esModule=!0,e.Guid=function(){function e(t){if(!t)throw TypeError("Invalid argument; `value` has no value.");this.value=e.EMPTY,t&&e.isGuid(t)&&(this.value=t)}return e.isGuid=function(t){var n=t.toString();return t&&(t instanceof e||e.validator.test(n))},e.create=function(){return new e([e.gen(2),e.gen(1),e.gen(1),e.gen(1),e.gen(3)].join("-"))},e.createEmpty=function(){return new e("emptyguid")},e.parse=function(t){return new e(t)},e.raw=function(){return[e.gen(2),e.gen(1),e.gen(1),e.gen(1),e.gen(3)].join("-")},e.gen=function(e){for(var t="",n=0;n<e;n++)t+=((1+Math.random())*65536|0).toString(16).substring(1);return t},e.prototype.equals=function(t){return e.isGuid(t)&&this.value===t.toString()},e.prototype.isEmpty=function(){return this.value===e.EMPTY},e.prototype.toString=function(){return this.value},e.prototype.toJSON=function(){return{value:this.value}},e.validator=RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),e.EMPTY="00000000-0000-0000-0000-000000000000",e}()});function Se(e,t,n){this.low=0|e,this.high=0|t,this.unsigned=!!n}function Ke(e){return(e&&e.__isLong__)===!0}function sc(e){var t=Math.clz32(e&-e);return e?31-t:t}function qn(e,t){var n,i,o;return t?(e>>>=0,(o=0<=e&&e<256)&&(i=lc[e])?i:(n=ye(e,0,!0),o&&(lc[e]=n),n)):(e|=0,(o=-128<=e&&e<128)&&(i=uc[e])?i:(n=ye(e,e<0?-1:0,!1),o&&(uc[e]=n),n))}function pt(e,t){if(isNaN(e))return t?Tn:xt;if(t){if(e<0)return Tn;if(e>=fc)return gc}else{if(e<=-dc)return Ye;if(e+1>=dc)return mc}return e<0?pt(-e,t).neg():ye(e%fr|0,e/fr|0,t)}function ye(e,t,n){return new Se(e,t,n)}function _a(e,t,n){if(0===e.length)throw Error("empty string");if("number"==typeof t?(n=t,t=!1):t=!!t,"NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return t?Tn:xt;if((n=n||10)<2||36<n)throw RangeError("radix");if((i=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===i)return _a(e.substring(1),t,n).neg();for(var i,o=pt(_o(n,8)),s=xt,a=0;a<e.length;a+=8){var u=Math.min(8,e.length-a),l=parseInt(e.substring(a,a+u),n);if(u<8){var d=pt(_o(n,u));s=s.mul(d).add(pt(l))}else s=(s=s.mul(o)).add(pt(l))}return s.unsigned=t,s}function wt(e,t){return"number"==typeof e?pt(e,t):"string"==typeof e?_a(e,t):ye(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}var dt,uc,lc,_o,cc,zx,fr,fc,dc,pc,xt,Tn,pr,hc,ya,mc,gc,Ye,L,Cn,kv,Lv,Do,ht,Rv,Nv,zv,Mv,Bv,Vv,Fv,Gv,Ls,Rs,Uv,Wv,Hv,qv,Ns,jv,Kv,Xv,Zv,Jv,Qv,Yv,e0,t0,n0,r0,o0,i0,Nr,zs,a0,Ms,s0,xa=$(()=>{dt=null;try{dt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Se.prototype.__isLong__,Object.defineProperty(Se.prototype,"__isLong__",{value:!0}),Se.isLong=Ke,uc={},lc={},Se.fromInt=qn,Se.fromNumber=pt,Se.fromBits=ye,_o=Math.pow,Se.fromString=_a,Se.fromValue=wt,zx=0x1000000,dc=(fc=(fr=(cc=65536)*cc)*fr)/2,pc=qn(zx),Se.ZERO=xt=qn(0),Se.UZERO=Tn=qn(0,!0),Se.ONE=pr=qn(1),Se.UONE=hc=qn(1,!0),Se.NEG_ONE=ya=qn(-1),Se.MAX_VALUE=mc=ye(-1,0x7fffffff,!1),Se.MAX_UNSIGNED_VALUE=gc=ye(-1,-1,!0),Se.MIN_VALUE=Ye=ye(0,-0x80000000,!1),(L=Se.prototype).toInt=function(){return this.unsigned?this.low>>>0:this.low},L.toNumber=function(){return this.unsigned?(this.high>>>0)*fr+(this.low>>>0):this.high*fr+(this.low>>>0)},L.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(!this.eq(Ye))return"-"+this.neg().toString(e);else{var t=pt(e),n=this.div(t),i=n.mul(t).sub(this);return n.toString(e)+i.toInt().toString(e)}for(var o=pt(_o(e,6),this.unsigned),s=this,a="";;){var u=s.div(o),l=(s.sub(u.mul(o)).toInt()>>>0).toString(e);if((s=u).isZero())return l+a;for(;l.length<6;)l="0"+l;a=""+l+a}},L.getHighBits=function(){return this.high},L.getHighBitsUnsigned=function(){return this.high>>>0},L.getLowBits=function(){return this.low},L.getLowBitsUnsigned=function(){return this.low>>>0},L.getNumBitsAbs=function(){if(this.isNegative())return this.eq(Ye)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return 0!=this.high?t+33:t+1},L.isZero=function(){return 0===this.high&&0===this.low},L.eqz=L.isZero,L.isNegative=function(){return!this.unsigned&&this.high<0},L.isPositive=function(){return this.unsigned||this.high>=0},L.isOdd=function(){return(1&this.low)==1},L.isEven=function(){return(1&this.low)==0},L.equals=function(e){return Ke(e)||(e=wt(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&this.high===e.high&&this.low===e.low},L.eq=L.equals,L.notEquals=function(e){return!this.eq(e)},L.neq=L.notEquals,L.ne=L.notEquals,L.lessThan=function(e){return 0>this.comp(e)},L.lt=L.lessThan,L.lessThanOrEqual=function(e){return 0>=this.comp(e)},L.lte=L.lessThanOrEqual,L.le=L.lessThanOrEqual,L.greaterThan=function(e){return this.comp(e)>0},L.gt=L.greaterThan,L.greaterThanOrEqual=function(e){return this.comp(e)>=0},L.gte=L.greaterThanOrEqual,L.ge=L.greaterThanOrEqual,L.compare=function(e){if(Ke(e)||(e=wt(e)),this.eq(e))return 0;var t=this.isNegative(),n=e.isNegative();return t&&!n?-1:!t&&n?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},L.comp=L.compare,L.negate=function(){return!this.unsigned&&this.eq(Ye)?Ye:this.not().add(pr)},L.neg=L.negate,L.add=function(e){Ke(e)||(e=wt(e));var t,n,i=this.high>>>16,o=65535&this.high,s=this.low>>>16,a=65535&this.low,u=e.high>>>16,l=65535&e.high,d=e.low>>>16,p=65535&e.low,c=0,h=0;return n=0+((t=0+(a+p))>>>16),t&=65535,n+=s+d,h+=n>>>16,n&=65535,h+=o+l,c+=h>>>16,h&=65535,c+=i+u,ye(n<<16|t,(c&=65535)<<16|h,this.unsigned)},L.subtract=function(e){return Ke(e)||(e=wt(e)),this.add(e.neg())},L.sub=L.subtract,L.multiply=function(e){if(this.isZero())return this;if(Ke(e)||(e=wt(e)),dt)return ye(dt.mul(this.low,this.high,e.low,e.high),dt.get_high(),this.unsigned);if(e.isZero())return this.unsigned?Tn:xt;if(this.eq(Ye))return e.isOdd()?Ye:xt;if(e.eq(Ye))return this.isOdd()?Ye:xt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(pc)&&e.lt(pc))return pt(this.toNumber()*e.toNumber(),this.unsigned);var t,n,i=this.high>>>16,o=65535&this.high,s=this.low>>>16,a=65535&this.low,u=e.high>>>16,l=65535&e.high,d=e.low>>>16,p=65535&e.low,c=0,h=0;return n=0+((t=0+a*p)>>>16),t&=65535,n+=s*p,h+=n>>>16,n&=65535,n+=a*d,h+=n>>>16,n&=65535,h+=o*p,c+=h>>>16,h&=65535,h+=s*d,c+=h>>>16,h&=65535,h+=a*l,c+=h>>>16,h&=65535,c+=i*p+o*d+s*l+a*u,ye(n<<16|t,(c&=65535)<<16|h,this.unsigned)},L.mul=L.multiply,L.divide=function(e){if(Ke(e)||(e=wt(e)),e.isZero())throw Error("division by zero");if(dt){var t,n,i;return this.unsigned||-0x80000000!==this.high||-1!==e.low||-1!==e.high?ye((this.unsigned?dt.div_u:dt.div_s)(this.low,this.high,e.low,e.high),dt.get_high(),this.unsigned):this}if(this.isZero())return this.unsigned?Tn:xt;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Tn;if(e.gt(this.shru(1)))return hc;i=Tn}else{if(this.eq(Ye))return e.eq(pr)||e.eq(ya)?Ye:e.eq(Ye)?pr:(t=this.shr(1).div(e).shl(1)).eq(xt)?e.isNegative()?pr:ya:(n=this.sub(e.mul(t)),i=t.add(n.div(e)));if(e.eq(Ye))return this.unsigned?Tn:xt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=xt}for(n=this;n.gte(e);){t=Math.max(1,Math.floor(n.toNumber()/e.toNumber()));for(var o=Math.ceil(Math.log(t)/Math.LN2),s=o<=48?1:_o(2,o-48),a=pt(t),u=a.mul(e);u.isNegative()||u.gt(n);)t-=s,u=(a=pt(t,this.unsigned)).mul(e);a.isZero()&&(a=pr),i=i.add(a),n=n.sub(u)}return i},L.div=L.divide,L.modulo=function(e){return(Ke(e)||(e=wt(e)),dt)?ye((this.unsigned?dt.rem_u:dt.rem_s)(this.low,this.high,e.low,e.high),dt.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},L.mod=L.modulo,L.rem=L.modulo,L.not=function(){return ye(~this.low,~this.high,this.unsigned)},L.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},L.clz=L.countLeadingZeros,L.countTrailingZeros=function(){return this.low?sc(this.low):sc(this.high)+32},L.ctz=L.countTrailingZeros,L.and=function(e){return Ke(e)||(e=wt(e)),ye(this.low&e.low,this.high&e.high,this.unsigned)},L.or=function(e){return Ke(e)||(e=wt(e)),ye(this.low|e.low,this.high|e.high,this.unsigned)},L.xor=function(e){return Ke(e)||(e=wt(e)),ye(this.low^e.low,this.high^e.high,this.unsigned)},L.shiftLeft=function(e){return Ke(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?ye(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):ye(0,this.low<<e-32,this.unsigned)},L.shl=L.shiftLeft,L.shiftRight=function(e){return Ke(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?ye(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):ye(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},L.shr=L.shiftRight,L.shiftRightUnsigned=function(e){return Ke(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?ye(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):32===e?ye(this.high,0,this.unsigned):ye(this.high>>>e-32,0,this.unsigned)},L.shru=L.shiftRightUnsigned,L.shr_u=L.shiftRightUnsigned,L.rotateLeft=function(e){var t;return Ke(e)&&(e=e.toInt()),0==(e&=63)?this:32===e?ye(this.high,this.low,this.unsigned):e<32?(t=32-e,ye(this.low<<e|this.high>>>t,this.high<<e|this.low>>>t,this.unsigned)):(e-=32,t=32-e,ye(this.high<<e|this.low>>>t,this.low<<e|this.high>>>t,this.unsigned))},L.rotl=L.rotateLeft,L.rotateRight=function(e){var t;return Ke(e)&&(e=e.toInt()),0==(e&=63)?this:32===e?ye(this.high,this.low,this.unsigned):e<32?(t=32-e,ye(this.high<<t|this.low>>>e,this.low<<t|this.high>>>e,this.unsigned)):(e-=32,t=32-e,ye(this.low<<t|this.high>>>e,this.high<<t|this.low>>>e,this.unsigned))},L.rotr=L.rotateRight,L.toSigned=function(){return this.unsigned?ye(this.low,this.high,!1):this},L.toUnsigned=function(){return this.unsigned?this:ye(this.low,this.high,!0)},L.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},L.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},L.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},Se.fromBytes=function(e,t,n){return n?Se.fromBytesLE(e,t):Se.fromBytesBE(e,t)},Se.fromBytesLE=function(e,t){return new Se(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},Se.fromBytesBE=function(e,t){return new Se(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)},Cn=Se}),wa=G(e=>{"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.ArgType=void 0,function(e){e[e.INPUT=0]="INPUT",e[e.OUTPUT=1]="OUTPUT"}(t||(e.ArgType=t={}))}),jn=G(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0,e.SIZEOF_SHORT=2,e.SIZEOF_INT=4,e.FILE_IDENTIFIER_LENGTH=4,e.SIZE_PREFIX_LENGTH=4}),Ta=G(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isLittleEndian=e.float64=e.float32=e.int32=void 0,e.int32=new Int32Array(2),e.float32=new Float32Array(e.int32.buffer),e.float64=new Float64Array(e.int32.buffer),e.isLittleEndian=1===new Uint16Array(new Uint8Array([1,0]).buffer)[0]}),va=G(e=>{"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.Encoding=void 0,function(e){e[e.UTF8_BYTES=1]="UTF8_BYTES",e[e.UTF16_STRING=2]="UTF16_STRING"}(t||(e.Encoding=t={}))}),Sa=G(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=void 0;var t=jn(),n=Ta(),i=va();e.ByteBuffer=class e{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(t){return new e(new Uint8Array(t))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return n.int32[0]=this.readInt32(e),n.float32[0]}readFloat64(e){return n.int32[+!n.isLittleEndian]=this.readInt32(e),n.int32[+!!n.isLittleEndian]=this.readInt32(e+4),n.float64[0]}writeInt8(e,t){this.bytes_[e]=t}writeUint8(e,t){this.bytes_[e]=t}writeInt16(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8}writeUint16(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8}writeInt32(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8,this.bytes_[e+2]=t>>16,this.bytes_[e+3]=t>>24}writeUint32(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8,this.bytes_[e+2]=t>>16,this.bytes_[e+3]=t>>24}writeInt64(e,t){this.writeInt32(e,Number(BigInt.asIntN(32,t))),this.writeInt32(e+4,Number(BigInt.asIntN(32,t>>BigInt(32))))}writeUint64(e,t){this.writeUint32(e,Number(BigInt.asUintN(32,t))),this.writeUint32(e+4,Number(BigInt.asUintN(32,t>>BigInt(32))))}writeFloat32(e,t){n.float32[0]=t,this.writeInt32(e,n.int32[0])}writeFloat64(e,t){n.float64[0]=t,this.writeInt32(e,n.int32[+!n.isLittleEndian]),this.writeInt32(e+4,n.int32[+!!n.isLittleEndian])}getBufferIdentifier(){if(this.bytes_.length<this.position_+t.SIZEOF_INT+t.FILE_IDENTIFIER_LENGTH)throw Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let n=0;n<t.FILE_IDENTIFIER_LENGTH;n++)e+=String.fromCharCode(this.readInt8(this.position_+t.SIZEOF_INT+n));return e}__offset(e,t){let n=e-this.readInt32(e);return t<this.readInt16(n)?this.readInt16(n+t):0}__union(e,t){return e.bb_pos=t+this.readInt32(t),e.bb=this,e}__string(e,n){e+=this.readInt32(e);let o=this.readInt32(e);e+=t.SIZEOF_INT;let s=this.bytes_.subarray(e,e+o);return n===i.Encoding.UTF8_BYTES?s:this.text_decoder_.decode(s)}__union_with_string(e,t){return"string"==typeof e?this.__string(t):this.__union(e,t)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+t.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=t.FILE_IDENTIFIER_LENGTH)throw Error("FlatBuffers: file identifier must be length "+t.FILE_IDENTIFIER_LENGTH);for(let n=0;n<t.FILE_IDENTIFIER_LENGTH;n++)if(e.charCodeAt(n)!=this.readInt8(this.position()+t.SIZEOF_INT+n))return!1;return!0}createScalarList(e,t){let n=[];for(let i=0;i<t;++i){let t=e(i);null!==t&&n.push(t)}return n}createObjList(e,t){let n=[];for(let i=0;i<t;++i){let t=e(i);null!==t&&n.push(t.unpack())}return n}}}),xc=G(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Builder=void 0;var t=Sa(),n=jn();e.Builder=class e{constructor(e){let n;this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder,n=e||1024,this.bb=t.ByteBuffer.allocate(n),this.space=n}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(t,n){t>this.minalign&&(this.minalign=t);let i=~(this.bb.capacity()-this.space+n)+1&t-1;for(;this.space<i+t+n;){let t=this.bb.capacity();this.bb=e.growByteBuffer(this.bb),this.space+=this.bb.capacity()-t}this.pad(i)}pad(e){for(let t=0;t<e;t++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,t,n){(this.force_defaults||t!=n)&&(this.addInt8(t),this.slot(e))}addFieldInt16(e,t,n){(this.force_defaults||t!=n)&&(this.addInt16(t),this.slot(e))}addFieldInt32(e,t,n){(this.force_defaults||t!=n)&&(this.addInt32(t),this.slot(e))}addFieldInt64(e,t,n){(this.force_defaults||t!==n)&&(this.addInt64(t),this.slot(e))}addFieldFloat32(e,t,n){(this.force_defaults||t!=n)&&(this.addFloat32(t),this.slot(e))}addFieldFloat64(e,t,n){(this.force_defaults||t!=n)&&(this.addFloat64(t),this.slot(e))}addFieldOffset(e,t,n){(this.force_defaults||t!=n)&&(this.addOffset(t),this.slot(e))}addFieldStruct(e,t,n){t!=n&&(this.nested(t),this.slot(e))}nested(e){if(e!=this.offset())throw TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){null!==this.vtable&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let n=e.capacity();if(0xc0000000&n)throw Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let i=n<<1,o=t.ByteBuffer.allocate(i);return o.setPosition(i-n),o.bytes().set(e.bytes(),i-n),o}addOffset(e){this.prep(n.SIZEOF_INT,0),this.writeInt32(this.offset()-e+n.SIZEOF_INT)}startObject(e){this.notNested(),null==this.vtable&&(this.vtable=[]),this.vtable_in_use=e;for(let t=0;t<e;t++)this.vtable[t]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(null==this.vtable||!this.isNested)throw Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),t=this.vtable_in_use-1;for(;t>=0&&0==this.vtable[t];t--);let i=t+1;for(;t>=0;t--)this.addInt16(0!=this.vtable[t]?e-this.vtable[t]:0);let o=2;this.addInt16(e-this.object_start);let s=(i+o)*n.SIZEOF_SHORT;this.addInt16(s);let a=0,u=this.space;e:for(t=0;t<this.vtables.length;t++){let e=this.bb.capacity()-this.vtables[t];if(s==this.bb.readInt16(e)){for(let t=n.SIZEOF_SHORT;t<s;t+=n.SIZEOF_SHORT)if(this.bb.readInt16(u+t)!=this.bb.readInt16(e+t))continue e;a=this.vtables[t];break}}return a?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,a-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,t,i){let o=i?n.SIZE_PREFIX_LENGTH:0;if(t){let e=t;if(this.prep(this.minalign,n.SIZEOF_INT+n.FILE_IDENTIFIER_LENGTH+o),e.length!=n.FILE_IDENTIFIER_LENGTH)throw TypeError("FlatBuffers: file identifier must be length "+n.FILE_IDENTIFIER_LENGTH);for(let t=n.FILE_IDENTIFIER_LENGTH-1;t>=0;t--)this.writeInt8(e.charCodeAt(t))}this.prep(this.minalign,n.SIZEOF_INT+o),this.addOffset(e),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,t){this.finish(e,t,!0)}requiredField(e,t){let n=this.bb.capacity()-e,i=n-this.bb.readInt32(n);if(!(t<this.bb.readInt16(i)&&0!=this.bb.readInt16(i+t)))throw TypeError("FlatBuffers: field "+t+" must be set")}startVector(e,t,i){this.notNested(),this.vector_num_elems=t,this.prep(n.SIZEOF_INT,e*t),this.prep(i,e*t)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let t=this.createString(e);return this.string_maps.set(e,t),t}createString(e){let t;return null==e?0:(t=e instanceof Uint8Array?e:this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,t.length,1),this.bb.setPosition(this.space-=t.length),this.bb.bytes().set(t,this.space),this.endVector())}createByteVector(e){return null==e?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return null===e?0:"string"==typeof e?this.createString(e):e.pack(this)}createObjectOffsetList(e){let t=[];for(let n=0;n<e.length;++n){let i=e[n];if(null!==i)t.push(this.createObjectOffset(i));else throw TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return t}createStructOffsetList(e,t){return t(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}}}),_e=G(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=e.Builder=e.Encoding=e.isLittleEndian=e.float64=e.float32=e.int32=e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0;var t=jn();Object.defineProperty(e,"SIZEOF_SHORT",{enumerable:!0,get:function(){return t.SIZEOF_SHORT}});var n=jn();Object.defineProperty(e,"SIZEOF_INT",{enumerable:!0,get:function(){return n.SIZEOF_INT}});var i=jn();Object.defineProperty(e,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return i.FILE_IDENTIFIER_LENGTH}});var o=jn();Object.defineProperty(e,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return o.SIZE_PREFIX_LENGTH}});var s=Ta();Object.defineProperty(e,"int32",{enumerable:!0,get:function(){return s.int32}}),Object.defineProperty(e,"float32",{enumerable:!0,get:function(){return s.float32}}),Object.defineProperty(e,"float64",{enumerable:!0,get:function(){return s.float64}}),Object.defineProperty(e,"isLittleEndian",{enumerable:!0,get:function(){return s.isLittleEndian}});var a=va();Object.defineProperty(e,"Encoding",{enumerable:!0,get:function(){return a.Encoding}});var u=xc();Object.defineProperty(e,"Builder",{enumerable:!0,get:function(){return u.Builder}});var l=Sa();Object.defineProperty(e,"ByteBuffer",{enumerable:!0,get:function(){return l.ByteBuffer}})}),Pa=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.ArgTypeAndIndex=void 0;var o=i(_e()),s=wa();e.ArgTypeAndIndex=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsArgTypeAndIndex(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsArgTypeAndIndex(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):s.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,t){e.addFieldInt8(0,t,s.ArgType.INPUT)}static addIndex(e,t){e.addFieldInt32(1,t,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(t,n,i){return e.startArgTypeAndIndex(t),e.addArgType(t,n),e.addIndex(t,i),e.endArgTypeAndIndex(t)}}}),Oa=G(e=>{"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeType=void 0,function(e){e[e.UNDEFINED=0]="UNDEFINED",e[e.FLOAT=1]="FLOAT",e[e.INT=2]="INT",e[e.STRING=3]="STRING",e[e.TENSOR=4]="TENSOR",e[e.GRAPH=5]="GRAPH",e[e.FLOATS=6]="FLOATS",e[e.INTS=7]="INTS",e[e.STRINGS=8]="STRINGS",e[e.TENSORS=9]="TENSORS",e[e.GRAPHS=10]="GRAPHS",e[e.SPARSE_TENSOR=11]="SPARSE_TENSOR",e[e.SPARSE_TENSORS=12]="SPARSE_TENSORS"}(t||(e.AttributeType=t={}))}),Ea=G(e=>{"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.NodeType=void 0,function(e){e[e.Primitive=0]="Primitive",e[e.Fused=1]="Fused"}(t||(e.NodeType=t={}))}),Da=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Node=void 0;var o=i(_e()),s=ka(),a=Ea();e.Node=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNode(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNode(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}domain(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb_pos+t,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):a.NodeType.Primitive}executionProviderType(e){let t=this.bb.__offset(this.bb_pos,18);return t?this.bb.__string(this.bb_pos+t,e):null}inputs(e,t){let n=this.bb.__offset(this.bb_pos,20);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,t){let n=this.bb.__offset(this.bb_pos,22);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,t){let n=this.bb.__offset(this.bb_pos,24);return n?(t||new s.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readInt32(this.bb.__vector(this.bb_pos+t)+4*e):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,t){let n=this.bb.__offset(this.bb_pos,28);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addDomain(e,t){e.addFieldOffset(2,t,0)}static addSinceVersion(e,t){e.addFieldInt32(3,t,0)}static addIndex(e,t){e.addFieldInt32(4,t,0)}static addOpType(e,t){e.addFieldOffset(5,t,0)}static addType(e,t){e.addFieldInt32(6,t,a.NodeType.Primitive)}static addExecutionProviderType(e,t){e.addFieldOffset(7,t,0)}static addInputs(e,t){e.addFieldOffset(8,t,0)}static createInputsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startInputsVector(e,t){e.startVector(4,t,4)}static addOutputs(e,t){e.addFieldOffset(9,t,0)}static createOutputsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startOutputsVector(e,t){e.startVector(4,t,4)}static addAttributes(e,t){e.addFieldOffset(10,t,0)}static createAttributesVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startAttributesVector(e,t){e.startVector(4,t,4)}static addInputArgCounts(e,t){e.addFieldOffset(11,t,0)}static createInputArgCountsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addInt32(t[n]);return e.endVector()}static startInputArgCountsVector(e,t){e.startVector(4,t,4)}static addImplicitInputs(e,t){e.addFieldOffset(12,t,0)}static createImplicitInputsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startImplicitInputsVector(e,t){e.startVector(4,t,4)}static endNode(e){return e.endObject()}static createNode(t,n,i,o,s,a,u,l,d,p,c,h,f,m){return e.startNode(t),e.addName(t,n),e.addDocString(t,i),e.addDomain(t,o),e.addSinceVersion(t,s),e.addIndex(t,a),e.addOpType(t,u),e.addType(t,l),e.addExecutionProviderType(t,d),e.addInputs(t,p),e.addOutputs(t,c),e.addAttributes(t,h),e.addInputArgCounts(t,f),e.addImplicitInputs(t,m),e.endNode(t)}}}),Ra=G(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.EdgeEnd=void 0,e.EdgeEnd=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,t,n,i){return e.prep(4,12),e.writeInt32(i),e.writeInt32(n),e.writeInt32(t),e.offset()}}}),za=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.NodeEdge=void 0;var o=i(_e()),s=Ra();e.NodeEdge=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNodeEdge(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNodeEdge(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new s.EdgeEnd).__init(this.bb.__vector(this.bb_pos+n)+12*e,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,t){let n=this.bb.__offset(this.bb_pos,8);return n?(t||new s.EdgeEnd).__init(this.bb.__vector(this.bb_pos+n)+12*e,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,t){e.addFieldInt32(0,t,0)}static addInputEdges(e,t){e.addFieldOffset(1,t,0)}static startInputEdgesVector(e,t){e.startVector(12,t,4)}static addOutputEdges(e,t){e.addFieldOffset(2,t,0)}static startOutputEdgesVector(e,t){e.startVector(12,t,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(t,n,i,o){return e.startNodeEdge(t),e.addNodeIndex(t,n),e.addInputEdges(t,i),e.addOutputEdges(t,o),e.endNodeEdge(t)}}}),Ba=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.NodesToOptimizeIndices=void 0;var o=i(_e());e.NodesToOptimizeIndices=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNodesToOptimizeIndices(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNodesToOptimizeIndices(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndices(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb.__vector(this.bb_pos+t)+4*e):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return!!e&&!!this.bb.readInt8(this.bb_pos+e)}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return!!e&&!!this.bb.readInt8(this.bb_pos+e)}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,t){e.addFieldOffset(0,t,0)}static createNodeIndicesVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addInt32(t[n]);return e.endVector()}static startNodeIndicesVector(e,t){e.startVector(4,t,4)}static addNumInputs(e,t){e.addFieldInt32(1,t,0)}static addNumOutputs(e,t){e.addFieldInt32(2,t,0)}static addHasVariadicInput(e,t){e.addFieldInt8(3,+t,0)}static addHasVariadicOutput(e,t){e.addFieldInt8(4,+t,0)}static addNumVariadicInputs(e,t){e.addFieldInt32(5,t,0)}static addNumVariadicOutputs(e,t){e.addFieldInt32(6,t,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(t,n,i,o,s,a,u,l){return e.startNodesToOptimizeIndices(t),e.addNodeIndices(t,n),e.addNumInputs(t,i),e.addNumOutputs(t,o),e.addHasVariadicInput(t,s),e.addHasVariadicOutput(t,a),e.addNumVariadicInputs(t,u),e.addNumVariadicOutputs(t,l),e.endNodesToOptimizeIndices(t)}}}),Fa=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecord=void 0;var o=i(_e()),s=Ba();e.RuntimeOptimizationRecord=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizationRecord(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizationRecord(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}actionId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}nodesToOptimizeIndices(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new s.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}producedOpIds(e,t){let n=this.bb.__offset(this.bb_pos,10);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,t){e.addFieldOffset(0,t,0)}static addNodesToOptimizeIndices(e,t){e.addFieldOffset(1,t,0)}static addProducedOpIds(e,t){e.addFieldOffset(3,t,0)}static createProducedOpIdsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startProducedOpIdsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}}}),Ua=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecordContainerEntry=void 0;var o=i(_e()),s=Fa();e.RuntimeOptimizationRecordContainerEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizationRecordContainerEntry(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}optimizerName(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}runtimeOptimizationRecords(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new s.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,t){e.addFieldOffset(0,t,0)}static addRuntimeOptimizationRecords(e,t){e.addFieldOffset(1,t,0)}static createRuntimeOptimizationRecordsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizationRecordContainerEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createRuntimeOptimizationRecordContainerEntry(t,n,i){return e.startRuntimeOptimizationRecordContainerEntry(t),e.addOptimizerName(t,n),e.addRuntimeOptimizationRecords(t,i),e.endRuntimeOptimizationRecordContainerEntry(t)}}}),Ha=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizations=void 0;var o=i(_e()),s=Ua();e.RuntimeOptimizations=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizations(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizations(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}records(e,t){let n=this.bb.__offset(this.bb_pos,4);return n?(t||new s.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,t){e.addFieldOffset(0,t,0)}static createRecordsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startRecordsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(t,n){return e.startRuntimeOptimizations(t),e.addRecords(t,n),e.endRuntimeOptimizations(t)}}}),kr=G(e=>{"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.TensorDataType=void 0,function(e){e[e.UNDEFINED=0]="UNDEFINED",e[e.FLOAT=1]="FLOAT",e[e.UINT8=2]="UINT8",e[e.INT8=3]="INT8",e[e.UINT16=4]="UINT16",e[e.INT16=5]="INT16",e[e.INT32=6]="INT32",e[e.INT64=7]="INT64",e[e.STRING=8]="STRING",e[e.BOOL=9]="BOOL",e[e.FLOAT16=10]="FLOAT16",e[e.DOUBLE=11]="DOUBLE",e[e.UINT32=12]="UINT32",e[e.UINT64=13]="UINT64",e[e.COMPLEX64=14]="COMPLEX64",e[e.COMPLEX128=15]="COMPLEX128",e[e.BFLOAT16=16]="BFLOAT16",e[e.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",e[e.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",e[e.FLOAT8E5M2=19]="FLOAT8E5M2",e[e.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"}(t||(e.TensorDataType=t={}))}),Lr=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Tensor=void 0;var o=i(_e()),s=kr();e.Tensor=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTensor(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTensor(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}dims(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):s.TensorDataType.UNDEFINED}rawData(e){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readUint8(this.bb.__vector(this.bb_pos+t)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,t){let n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addDims(e,t){e.addFieldOffset(2,t,0)}static createDimsVector(e,t){e.startVector(8,t.length,8);for(let n=t.length-1;n>=0;n--)e.addInt64(t[n]);return e.endVector()}static startDimsVector(e,t){e.startVector(8,t,8)}static addDataType(e,t){e.addFieldInt32(3,t,s.TensorDataType.UNDEFINED)}static addRawData(e,t){e.addFieldOffset(4,t,0)}static createRawDataVector(e,t){e.startVector(1,t.length,1);for(let n=t.length-1;n>=0;n--)e.addInt8(t[n]);return e.endVector()}static startRawDataVector(e,t){e.startVector(1,t,1)}static addStringData(e,t){e.addFieldOffset(5,t,0)}static createStringDataVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startStringDataVector(e,t){e.startVector(4,t,4)}static addExternalDataOffset(e,t){e.addFieldInt64(6,t,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(t,n,i,o,s,a,u,l){return e.startTensor(t),e.addName(t,n),e.addDocString(t,i),e.addDims(t,o),e.addDataType(t,s),e.addRawData(t,a),e.addStringData(t,u),e.addExternalDataOffset(t,l),e.endTensor(t)}}}),Ka=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.SparseTensor=void 0;var o=i(_e()),s=Lr();e.SparseTensor=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsSparseTensor(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsSparseTensor(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}values(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new s.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}indices(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new s.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}dims(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,t){e.addFieldOffset(0,t,0)}static addIndices(e,t){e.addFieldOffset(1,t,0)}static addDims(e,t){e.addFieldOffset(2,t,0)}static createDimsVector(e,t){e.startVector(8,t.length,8);for(let n=t.length-1;n>=0;n--)e.addInt64(t[n]);return e.endVector()}static startDimsVector(e,t){e.startVector(8,t,8)}static endSparseTensor(e){return e.endObject()}}}),Za=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.MapType=void 0;var o=i(_e()),s=kr(),a=Rr();e.MapType=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsMapType(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsMapType(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):s.TensorDataType.UNDEFINED}valueType(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new a.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,t){e.addFieldInt32(0,t,s.TensorDataType.UNDEFINED)}static addValueType(e,t){e.addFieldOffset(1,t,0)}static endMapType(e){return e.endObject()}}}),Qa=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.SequenceType=void 0;var o=i(_e()),s=Rr();e.SequenceType=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsSequenceType(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsSequenceType(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}elemType(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new s.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,t){e.addFieldOffset(0,t,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(t,n){return e.startSequenceType(t),e.addElemType(t,n),e.endSequenceType(t)}}}),Ya=G(e=>{"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValueType=void 0,function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.VALUE=1]="VALUE",e[e.PARAM=2]="PARAM"}(t||(e.DimensionValueType=t={}))}),ts=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValue=void 0;var o=i(_e()),s=Ya();e.DimensionValue=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDimensionValue(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDimensionValue(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):s.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,t){e.addFieldInt8(0,t,s.DimensionValueType.UNKNOWN)}static addDimValue(e,t){e.addFieldInt64(1,t,BigInt("0"))}static addDimParam(e,t){e.addFieldOffset(2,t,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(t,n,i,o){return e.startDimensionValue(t),e.addDimType(t,n),e.addDimValue(t,i),e.addDimParam(t,o),e.endDimensionValue(t)}}}),rs=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Dimension=void 0;var o=i(_e()),s=ts();e.Dimension=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDimension(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDimension(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}value(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new s.DimensionValue).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}denotation(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}static startDimension(e){e.startObject(2)}static addValue(e,t){e.addFieldOffset(0,t,0)}static addDenotation(e,t){e.addFieldOffset(1,t,0)}static endDimension(e){return e.endObject()}static createDimension(t,n,i){return e.startDimension(t),e.addValue(t,n),e.addDenotation(t,i),e.endDimension(t)}}}),is=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Shape=void 0;var o=i(_e()),s=rs();e.Shape=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsShape(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsShape(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}dim(e,t){let n=this.bb.__offset(this.bb_pos,4);return n?(t||new s.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,t){e.addFieldOffset(0,t,0)}static createDimVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startDimVector(e,t){e.startVector(4,t,4)}static endShape(e){return e.endObject()}static createShape(t,n){return e.startShape(t),e.addDim(t,n),e.endShape(t)}}}),ss=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.TensorTypeAndShape=void 0;var o=i(_e()),s=is(),a=kr();e.TensorTypeAndShape=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTensorTypeAndShape(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTensorTypeAndShape(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):a.TensorDataType.UNDEFINED}shape(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new s.Shape).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,t){e.addFieldInt32(0,t,a.TensorDataType.UNDEFINED)}static addShape(e,t){e.addFieldOffset(1,t,0)}static endTensorTypeAndShape(e){return e.endObject()}}}),us=G(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.unionListToTypeInfoValue=e.unionToTypeInfoValue=e.TypeInfoValue=void 0;var t,n=Za(),i=Qa(),o=ss();!function(e){e[e.NONE=0]="NONE",e[e.tensor_type=1]="tensor_type",e[e.sequence_type=2]="sequence_type",e[e.map_type=3]="map_type"}(t||(e.TypeInfoValue=t={})),e.unionToTypeInfoValue=function(e,s){switch(t[e]){case"NONE":default:return null;case"tensor_type":return s(new o.TensorTypeAndShape);case"sequence_type":return s(new i.SequenceType);case"map_type":return s(new n.MapType)}},e.unionListToTypeInfoValue=function(e,s,a){switch(t[e]){case"NONE":default:return null;case"tensor_type":return s(a,new o.TensorTypeAndShape);case"sequence_type":return s(a,new i.SequenceType);case"map_type":return s(a,new n.MapType)}}}),Rr=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.TypeInfo=void 0;var o=i(_e()),s=us();e.TypeInfo=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTypeInfo(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTypeInfo(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}denotation(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):s.TypeInfoValue.NONE}value(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__union(e,this.bb_pos+t):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,t){e.addFieldOffset(0,t,0)}static addValueType(e,t){e.addFieldInt8(1,t,s.TypeInfoValue.NONE)}static addValue(e,t){e.addFieldOffset(2,t,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(t,n,i,o){return e.startTypeInfo(t),e.addDenotation(t,n),e.addValueType(t,i),e.addValue(t,o),e.endTypeInfo(t)}}}),ds=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.ValueInfo=void 0;var o=i(_e()),s=Rr();e.ValueInfo=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsValueInfo(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsValueInfo(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}type(e){let t=this.bb.__offset(this.bb_pos,8);return t?(e||new s.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addType(e,t){e.addFieldOffset(2,t,0)}static endValueInfo(e){return e.endObject()}}}),Co=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Graph=void 0;var o=i(_e()),s=Da(),a=za(),u=Ha(),l=Ka(),d=Lr(),p=ds();e.Graph=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsGraph(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsGraph(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}initializers(e,t){let n=this.bb.__offset(this.bb_pos,4);return n?(t||new d.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new p.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,t){let n=this.bb.__offset(this.bb_pos,8);return n?(t||new s.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,t){let n=this.bb.__offset(this.bb_pos,12);return n?(t||new a.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,t){let n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,t){let n=this.bb.__offset(this.bb_pos,16);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,t){let n=this.bb.__offset(this.bb_pos,18);return n?(t||new l.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let t=this.bb.__offset(this.bb_pos,20);return t?(e||new u.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,t){e.addFieldOffset(0,t,0)}static createInitializersVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startInitializersVector(e,t){e.startVector(4,t,4)}static addNodeArgs(e,t){e.addFieldOffset(1,t,0)}static createNodeArgsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startNodeArgsVector(e,t){e.startVector(4,t,4)}static addNodes(e,t){e.addFieldOffset(2,t,0)}static createNodesVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startNodesVector(e,t){e.startVector(4,t,4)}static addMaxNodeIndex(e,t){e.addFieldInt32(3,t,0)}static addNodeEdges(e,t){e.addFieldOffset(4,t,0)}static createNodeEdgesVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startNodeEdgesVector(e,t){e.startVector(4,t,4)}static addInputs(e,t){e.addFieldOffset(5,t,0)}static createInputsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startInputsVector(e,t){e.startVector(4,t,4)}static addOutputs(e,t){e.addFieldOffset(6,t,0)}static createOutputsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startOutputsVector(e,t){e.startVector(4,t,4)}static addSparseInitializers(e,t){e.addFieldOffset(7,t,0)}static createSparseInitializersVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startSparseInitializersVector(e,t){e.startVector(4,t,4)}static addRuntimeOptimizations(e,t){e.addFieldOffset(8,t,0)}static endGraph(e){return e.endObject()}}}),ka=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Attribute=void 0;var o=i(_e()),s=Oa(),a=Co(),u=Lr();e.Attribute=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsAttribute(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsAttribute(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):s.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb_pos+t,e):null}t(e){let t=this.bb.__offset(this.bb_pos,16);return t?(e||new u.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}g(e){let t=this.bb.__offset(this.bb_pos,18);return t?(e||new a.Graph).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}floats(e){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readFloat32(this.bb.__vector(this.bb_pos+t)+4*e):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,t){let n=this.bb.__offset(this.bb_pos,24);return n?this.bb.__string(this.bb.__vector(this.bb_pos+n)+4*e,t):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,t){let n=this.bb.__offset(this.bb_pos,26);return n?(t||new u.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,t){let n=this.bb.__offset(this.bb_pos,28);return n?(t||new a.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addType(e,t){e.addFieldInt32(2,t,s.AttributeType.UNDEFINED)}static addF(e,t){e.addFieldFloat32(3,t,0)}static addI(e,t){e.addFieldInt64(4,t,BigInt("0"))}static addS(e,t){e.addFieldOffset(5,t,0)}static addT(e,t){e.addFieldOffset(6,t,0)}static addG(e,t){e.addFieldOffset(7,t,0)}static addFloats(e,t){e.addFieldOffset(8,t,0)}static createFloatsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addFloat32(t[n]);return e.endVector()}static startFloatsVector(e,t){e.startVector(4,t,4)}static addInts(e,t){e.addFieldOffset(9,t,0)}static createIntsVector(e,t){e.startVector(8,t.length,8);for(let n=t.length-1;n>=0;n--)e.addInt64(t[n]);return e.endVector()}static startIntsVector(e,t){e.startVector(8,t,8)}static addStrings(e,t){e.addFieldOffset(10,t,0)}static createStringsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startStringsVector(e,t){e.startVector(4,t,4)}static addTensors(e,t){e.addFieldOffset(11,t,0)}static createTensorsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startTensorsVector(e,t){e.startVector(4,t,4)}static addGraphs(e,t){e.addFieldOffset(12,t,0)}static createGraphsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startGraphsVector(e,t){e.startVector(4,t,4)}static endAttribute(e){return e.endObject()}}}),ms=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedKernelCreateInfos=void 0;var o=i(_e());e.DeprecatedKernelCreateInfos=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedKernelCreateInfos(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndices(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb.__vector(this.bb_pos+t)+4*e):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,t){e.addFieldOffset(0,t,0)}static createNodeIndicesVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addInt32(t[n]);return e.endVector()}static startNodeIndicesVector(e,t){e.startVector(4,t,4)}static addKernelDefHashes(e,t){e.addFieldOffset(1,t,0)}static createKernelDefHashesVector(e,t){e.startVector(8,t.length,8);for(let n=t.length-1;n>=0;n--)e.addInt64(t[n]);return e.endVector()}static startKernelDefHashesVector(e,t){e.startVector(8,t,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(t,n,i){return e.startDeprecatedKernelCreateInfos(t),e.addNodeIndices(t,n),e.addKernelDefHashes(t,i),e.endDeprecatedKernelCreateInfos(t)}}}),Vc=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedNodeIndexAndKernelDefHash=void 0;var o=i(_e());e.DeprecatedNodeIndexAndKernelDefHash=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,t){e.addFieldInt32(0,t,0)}static addKernelDefHash(e,t){e.addFieldInt64(1,t,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(t,n,i){return e.startDeprecatedNodeIndexAndKernelDefHash(t),e.addNodeIndex(t,n),e.addKernelDefHash(t,i),e.endDeprecatedNodeIndexAndKernelDefHash(t)}}}),ys=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSubGraphSessionState=void 0;var o=i(_e()),s=_s();e.DeprecatedSubGraphSessionState=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedSubGraphSessionState(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}graphId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}sessionState(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new s.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,t){e.addFieldOffset(0,t,0)}static addSessionState(e,t){e.addFieldOffset(1,t,0)}static endDeprecatedSubGraphSessionState(e){let t=e.endObject();return e.requiredField(t,4),t}}}),_s=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSessionState=void 0;var o=i(_e()),s=ms(),a=ys();e.DeprecatedSessionState=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedSessionState(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedSessionState(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}kernels(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new s.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}subGraphSessionStates(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new a.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,t){e.addFieldOffset(0,t,0)}static addSubGraphSessionStates(e,t){e.addFieldOffset(1,t,0)}static createSubGraphSessionStatesVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startSubGraphSessionStatesVector(e,t){e.startVector(4,t,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(t,n,i){return e.startDeprecatedSessionState(t),e.addKernels(t,n),e.addSubGraphSessionStates(t,i),e.endDeprecatedSessionState(t)}}}),Ts=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrArgsEntry=void 0;var o=i(_e()),s=Pa();e.KernelTypeStrArgsEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsKernelTypeStrArgsEntry(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}kernelTypeStr(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}args(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new s.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,t){e.addFieldOffset(0,t,0)}static addArgs(e,t){e.addFieldOffset(1,t,0)}static createArgsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startArgsVector(e,t){e.startVector(4,t,4)}static endKernelTypeStrArgsEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createKernelTypeStrArgsEntry(t,n,i){return e.startKernelTypeStrArgsEntry(t),e.addKernelTypeStr(t,n),e.addArgs(t,i),e.endKernelTypeStrArgsEntry(t)}}}),Is=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.OpIdKernelTypeStrArgsEntry=void 0;var o=i(_e()),s=Ts();e.OpIdKernelTypeStrArgsEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsOpIdKernelTypeStrArgsEntry(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}opId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}kernelTypeStrArgs(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new s.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,t){e.addFieldOffset(0,t,0)}static addKernelTypeStrArgs(e,t){e.addFieldOffset(1,t,0)}static createKernelTypeStrArgsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startKernelTypeStrArgsVector(e,t){e.startVector(4,t,4)}static endOpIdKernelTypeStrArgsEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createOpIdKernelTypeStrArgsEntry(t,n,i){return e.startOpIdKernelTypeStrArgsEntry(t),e.addOpId(t,n),e.addKernelTypeStrArgs(t,i),e.endOpIdKernelTypeStrArgsEntry(t)}}}),$s=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrResolver=void 0;var o=i(_e()),s=Is();e.KernelTypeStrResolver=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsKernelTypeStrResolver(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsKernelTypeStrResolver(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}opKernelTypeStrArgs(e,t){let n=this.bb.__offset(this.bb_pos,4);return n?(t||new s.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,t){e.addFieldOffset(0,t,0)}static createOpKernelTypeStrArgsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,t){e.startVector(4,t,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(t,n){return e.startKernelTypeStrResolver(t),e.addOpKernelTypeStrArgs(t,n),e.endKernelTypeStrResolver(t)}}}),Ps=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.OperatorSetId=void 0;var o=i(_e());e.OperatorSetId=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsOperatorSetId(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsOperatorSetId(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}domain(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,t){e.addFieldOffset(0,t,0)}static addVersion(e,t){e.addFieldInt64(1,t,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(t,n,i){return e.startOperatorSetId(t),e.addDomain(t,n),e.addVersion(t,i),e.endOperatorSetId(t)}}}),Es=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.StringStringEntry=void 0;var o=i(_e());e.StringStringEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsStringStringEntry(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsStringStringEntry(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}key(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}value(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,t){e.addFieldOffset(0,t,0)}static addValue(e,t){e.addFieldOffset(1,t,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(t,n,i){return e.startStringStringEntry(t),e.addKey(t,n),e.addValue(t,i),e.endStringStringEntry(t)}}}),Ds=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.Model=void 0;var o=i(_e()),s=Co(),a=Ps(),u=Es();e.Model=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsModel(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsModel(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,t){let n=this.bb.__offset(this.bb_pos,6);return n?(t||new a.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}producerVersion(e){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb_pos+t,e):null}domain(e){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__string(this.bb_pos+t,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb_pos+t,e):null}graph(e){let t=this.bb.__offset(this.bb_pos,18);return t?(e||new s.Graph).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}graphDocString(e){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb_pos+t,e):null}metadataProps(e,t){let n=this.bb.__offset(this.bb_pos,22);return n?(t||new u.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*e),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,t){e.addFieldInt64(0,t,BigInt("0"))}static addOpsetImport(e,t){e.addFieldOffset(1,t,0)}static createOpsetImportVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startOpsetImportVector(e,t){e.startVector(4,t,4)}static addProducerName(e,t){e.addFieldOffset(2,t,0)}static addProducerVersion(e,t){e.addFieldOffset(3,t,0)}static addDomain(e,t){e.addFieldOffset(4,t,0)}static addModelVersion(e,t){e.addFieldInt64(5,t,BigInt("0"))}static addDocString(e,t){e.addFieldOffset(6,t,0)}static addGraph(e,t){e.addFieldOffset(7,t,0)}static addGraphDocString(e,t){e.addFieldOffset(8,t,0)}static addMetadataProps(e,t){e.addFieldOffset(9,t,0)}static createMetadataPropsVector(e,t){e.startVector(4,t.length,4);for(let n=t.length-1;n>=0;n--)e.addOffset(t[n]);return e.endVector()}static startMetadataPropsVector(e,t){e.startVector(4,t,4)}static endModel(e){return e.endObject()}}}),Fc=G(e=>{"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&t(i,e,o);return n(i,e),i};Object.defineProperty(e,"__esModule",{value:!0}),e.InferenceSession=void 0;var o=i(_e()),s=$s(),a=Ds();e.InferenceSession=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsInferenceSession(t,n){return(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsInferenceSession(t,n){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(n||new e).__init(t.readInt32(t.position())+t.position(),t)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}model(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new a.Model).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}kernelTypeStrResolver(e){let t=this.bb.__offset(this.bb_pos,10);return t?(e||new s.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,t){e.addFieldOffset(0,t,0)}static addModel(e,t){e.addFieldOffset(1,t,0)}static addKernelTypeStrResolver(e,t){e.addFieldOffset(3,t,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,t){e.finish(t,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,t){e.finish(t,"ORTM",!0)}}}),Gc=$(()=>{"use strict";kv=se(wa()),Lv=se(Pa()),Do=se(ka()),ht=se(Oa()),Rv=se(ms()),Nv=se(Vc()),zv=se(_s()),Mv=se(ys()),Bv=se(rs()),Vv=se(ts()),Fv=se(Ya()),Gv=se(Ra()),Ls=se(Co()),Rs=se(Fc()),Uv=se(Ts()),Wv=se($s()),Hv=se(Za()),qv=se(Ds()),Ns=se(Da()),jv=se(za()),Kv=se(Ea()),Xv=se(Ba()),Zv=se(Is()),Jv=se(Ps()),Qv=se(Fa()),Yv=se(Ua()),e0=se(Ha()),t0=se(Qa()),n0=se(is()),r0=se(Ka()),o0=se(Es()),i0=se(Lr()),Nr=se(kr()),zs=se(ss()),a0=se(Rr()),Ms=se(us()),s0=se(ds())}),zr=$(()=>{"use strict";Gc()}),Wc=G((e,t)=>{"use strict";t.exports=function e(e,t){for(var n=Array(arguments.length-1),i=0,o=2,s=!0;o<arguments.length;)n[i++]=arguments[o++];return new Promise(function(o,a){n[i]=function(e){if(s)if(s=!1,e)a(e);else{for(var t=Array(arguments.length-1),n=0;n<t.length;)t[n++]=arguments[n];o.apply(null,t)}};try{e.apply(t||null,n)}catch(e){s&&(s=!1,a(e))}})}}),Kc=G(e=>{"use strict";var t,n=e;n.length=function(e){var t=e.length;if(!t)return 0;for(var n=0;--t%4>1&&"="===e.charAt(t);)++n;return Math.ceil(3*e.length)/4-n};var i=Array(64),o=Array(123);for(t=0;t<64;)o[i[t]=t<26?t+65:t<52?t+71:t<62?t-4:t-59|43]=t++;n.encode=function(e,t,n){for(var o,s=null,a=[],u=0,l=0;t<n;){var d=e[t++];switch(l){case 0:a[u++]=i[d>>2],o=(3&d)<<4,l=1;break;case 1:a[u++]=i[o|d>>4],o=(15&d)<<2,l=2;break;case 2:a[u++]=i[o|d>>6],a[u++]=i[63&d],l=0}u>8191&&((s||(s=[])).push(String.fromCharCode.apply(String,a)),u=0)}return l&&(a[u++]=i[o],a[u++]=61,1===l&&(a[u++]=61)),s?(u&&s.push(String.fromCharCode.apply(String,a.slice(0,u))),s.join("")):String.fromCharCode.apply(String,a.slice(0,u))};var s="invalid encoding";n.decode=function(e,t,n){for(var i,a=n,u=0,l=0;l<e.length;){var d=e.charCodeAt(l++);if(61===d&&u>1)break;if(void 0===(d=o[d]))throw Error(s);switch(u){case 0:i=d,u=1;break;case 1:t[n++]=i<<2|(48&d)>>4,i=d,u=2;break;case 2:t[n++]=(15&i)<<4|(60&d)>>2,i=d,u=3;break;case 3:t[n++]=(3&i)<<6|d,u=0}}if(1===u)throw Error(s);return n-a},n.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}}),Zc=G((e,t)=>{"use strict";function n(){this._listeners={}}t.exports=n,n.prototype.on=function(e,t,n){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:t,ctx:n||this}),this},n.prototype.off=function(e,t){if(void 0===e)this._listeners={};else if(void 0===t)this._listeners[e]=[];else for(var n=this._listeners[e],i=0;i<n.length;)n[i].fn===t?n.splice(i,1):++i;return this},n.prototype.emit=function(e){var t=this._listeners[e];if(t){for(var n=[],i=1;i<arguments.length;)n.push(arguments[i++]);for(i=0;i<t.length;)t[i].fn.apply(t[i++].ctx,n)}return this}}),rd=G((e,t)=>{"use strict";function n(e){return"u">typeof Float32Array?function(){var t=new Float32Array([-0]),n=new Uint8Array(t.buffer),i=128===n[3];function o(e,i,o){t[0]=e,i[o]=n[0],i[o+1]=n[1],i[o+2]=n[2],i[o+3]=n[3]}function s(e,i,o){t[0]=e,i[o]=n[3],i[o+1]=n[2],i[o+2]=n[1],i[o+3]=n[0]}function a(e,i){return n[0]=e[i],n[1]=e[i+1],n[2]=e[i+2],n[3]=e[i+3],t[0]}function u(e,i){return n[3]=e[i],n[2]=e[i+1],n[1]=e[i+2],n[0]=e[i+3],t[0]}e.writeFloatLE=i?o:s,e.writeFloatBE=i?s:o,e.readFloatLE=i?a:u,e.readFloatBE=i?u:a}():function(){function t(e,t,n,i){var o=+(t<0);if(o&&(t=-t),0===t)e(1/t>0?0:0x80000000,n,i);else if(isNaN(t))e(0x7fc00000,n,i);else if(t>34028234663852886e22)e((o<<31|0x7f800000)>>>0,n,i);else if(t<11754943508222875e-54)e((o<<31|Math.round(t/1401298464324817e-60))>>>0,n,i);else{var s=Math.floor(Math.log(t)/Math.LN2),a=8388607&Math.round(t*Math.pow(2,-s)*8388608);e((o<<31|s+127<<23|a)>>>0,n,i)}}function n(e,t,n){var i=e(t,n),o=(i>>31)*2+1,s=i>>>23&255,a=8388607&i;return 255===s?a?NaN:1/0*o:0===s?1401298464324817e-60*o*a:o*Math.pow(2,s-150)*(a+8388608)}e.writeFloatLE=t.bind(null,i),e.writeFloatBE=t.bind(null,o),e.readFloatLE=n.bind(null,s),e.readFloatBE=n.bind(null,a)}(),"u">typeof Float64Array?function(){var t=new Float64Array([-0]),n=new Uint8Array(t.buffer),i=128===n[7];function o(e,i,o){t[0]=e,i[o]=n[0],i[o+1]=n[1],i[o+2]=n[2],i[o+3]=n[3],i[o+4]=n[4],i[o+5]=n[5],i[o+6]=n[6],i[o+7]=n[7]}function s(e,i,o){t[0]=e,i[o]=n[7],i[o+1]=n[6],i[o+2]=n[5],i[o+3]=n[4],i[o+4]=n[3],i[o+5]=n[2],i[o+6]=n[1],i[o+7]=n[0]}function a(e,i){return n[0]=e[i],n[1]=e[i+1],n[2]=e[i+2],n[3]=e[i+3],n[4]=e[i+4],n[5]=e[i+5],n[6]=e[i+6],n[7]=e[i+7],t[0]}function u(e,i){return n[7]=e[i],n[6]=e[i+1],n[5]=e[i+2],n[4]=e[i+3],n[3]=e[i+4],n[2]=e[i+5],n[1]=e[i+6],n[0]=e[i+7],t[0]}e.writeDoubleLE=i?o:s,e.writeDoubleBE=i?s:o,e.readDoubleLE=i?a:u,e.readDoubleBE=i?u:a}():function(){function t(e,t,n,i,o,s){var a,u=+(i<0);if(u&&(i=-i),0===i)e(0,o,s+t),e(1/i>0?0:0x80000000,o,s+n);else if(isNaN(i))e(0,o,s+t),e(0x7ff80000,o,s+n);else if(i>17976931348623157e292)e(0,o,s+t),e((u<<31|0x7ff00000)>>>0,o,s+n);else if(i<22250738585072014e-324)e((a=i/5e-324)>>>0,o,s+t),e((u<<31|a/0x100000000)>>>0,o,s+n);else{var l=Math.floor(Math.log(i)/Math.LN2);1024===l&&(l=1023),e(0x10000000000000*(a=i*Math.pow(2,-l))>>>0,o,s+t),e((u<<31|l+1023<<20|1048576*a&1048575)>>>0,o,s+n)}}function n(e,t,n,i,o){var s=e(i,o+t),a=e(i,o+n),u=(a>>31)*2+1,l=a>>>20&2047,d=0x100000000*(1048575&a)+s;return 2047===l?d?NaN:1/0*u:0===l?5e-324*u*d:u*Math.pow(2,l-1075)*(d+0x10000000000000)}e.writeDoubleLE=t.bind(null,i,0,4),e.writeDoubleBE=t.bind(null,o,4,0),e.readDoubleLE=n.bind(null,s,0,4),e.readDoubleBE=n.bind(null,a,4,0)}(),e}function i(e,t,n){t[n]=255&e,t[n+1]=e>>>8&255,t[n+2]=e>>>16&255,t[n+3]=e>>>24}function o(e,t,n){t[n]=e>>>24,t[n+1]=e>>>16&255,t[n+2]=e>>>8&255,t[n+3]=255&e}function s(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0}function a(e,t){return(e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3])>>>0}t.exports=n(n)}),od=G((exports,module)=>{"use strict";function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(r){}return null}module.exports=inquire}),ad=G(e=>{"use strict";var t=e;t.length=function(e){for(var t=0,n=0,i=0;i<e.length;++i)(n=e.charCodeAt(i))<128?t+=1:n<2048?t+=2:(64512&n)==55296&&(64512&e.charCodeAt(i+1))==56320?(++i,t+=4):t+=3;return t},t.read=function(e,t,n){if(n-t<1)return"";for(var i,o=null,s=[],a=0;t<n;)(i=e[t++])<128?s[a++]=i:i>191&&i<224?s[a++]=(31&i)<<6|63&e[t++]:i>239&&i<365?(i=((7&i)<<18|(63&e[t++])<<12|(63&e[t++])<<6|63&e[t++])-65536,s[a++]=55296+(i>>10),s[a++]=56320+(1023&i)):s[a++]=(15&i)<<12|(63&e[t++])<<6|63&e[t++],a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,s)),a=0);return o?(a&&o.push(String.fromCharCode.apply(String,s.slice(0,a))),o.join("")):String.fromCharCode.apply(String,s.slice(0,a))},t.write=function(e,t,n){for(var i,o,s=n,a=0;a<e.length;++a)(i=e.charCodeAt(a))<128?t[n++]=i:(i<2048?t[n++]=i>>6|192:((64512&i)==55296&&(64512&(o=e.charCodeAt(a+1)))==56320?(i=65536+((1023&i)<<10)+(1023&o),++a,t[n++]=i>>18|240,t[n++]=i>>12&63|128):t[n++]=i>>12|224,t[n++]=i>>6&63|128),t[n++]=63&i|128);return n-s}}),ud=G((e,t)=>{"use strict";t.exports=function e(e,t,n){var i=n||8192,o=i>>>1,s=null,a=i;return function(n){if(n<1||n>o)return e(n);a+n>i&&(s=e(i),a=0);var u=t.call(s,a,a+=n);return 7&a&&(a=(7|a)+1),u}}}),cd=G((e,t)=>{"use strict";t.exports=i;var n=Ln();function i(e,t){this.lo=e>>>0,this.hi=t>>>0}var o=i.zero=new i(0,0);o.toNumber=function(){return 0},o.zzEncode=o.zzDecode=function(){return this},o.length=function(){return 1};var s=i.zeroHash="\0\0\0\0\0\0\0\0";i.fromNumber=function(e){if(0===e)return o;var t=e<0;t&&(e=-e);var n=e>>>0,s=(e-n)/0x100000000>>>0;return t&&(s=~s>>>0,n=~n>>>0,++n>0xffffffff&&(n=0,++s>0xffffffff&&(s=0))),new i(n,s)},i.from=function(e){if("number"==typeof e)return i.fromNumber(e);if(n.isString(e))if(!n.Long)return i.fromNumber(parseInt(e,10));else e=n.Long.fromString(e);return e.low||e.high?new i(e.low>>>0,e.high>>>0):o},i.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var t=~this.lo+1>>>0,n=~this.hi>>>0;return t||(n=n+1>>>0),-(t+0x100000000*n)}return this.lo+0x100000000*this.hi},i.prototype.toLong=function(e){return n.Long?new n.Long(0|this.lo,0|this.hi,!!e):{low:0|this.lo,high:0|this.hi,unsigned:!!e}};var a=String.prototype.charCodeAt;i.fromHash=function(e){return e===s?o:new i((a.call(e,0)|a.call(e,1)<<8|a.call(e,2)<<16|a.call(e,3)<<24)>>>0,(a.call(e,4)|a.call(e,5)<<8|a.call(e,6)<<16|a.call(e,7)<<24)>>>0)},i.prototype.toHash=function(){return String.fromCharCode(255&this.lo,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,255&this.hi,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)},i.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this},i.prototype.zzDecode=function(){var e=-(1&this.lo);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this},i.prototype.length=function(){var e=this.lo,t=(this.lo>>>28|this.hi<<4)>>>0,n=this.hi>>>24;return 0===n?0===t?e<16384?e<128?1:2:e<2097152?3:4:t<16384?t<128?5:6:t<2097152?7:8:n<128?9:10}}),Ln=G(e=>{"use strict";var t=e;function n(e,t,n){for(var i=Object.keys(t),o=0;o<i.length;++o)void 0!==e[i[o]]&&n||(e[i[o]]=t[i[o]]);return e}function i(e){function t(e,i){if(!(this instanceof t))return new t(e,i);Object.defineProperty(this,"message",{get:function(){return e}}),Error.captureStackTrace?Error.captureStackTrace(this,t):Object.defineProperty(this,"stack",{value:Error().stack||""}),i&&n(this,i)}return t.prototype=Object.create(Error.prototype,{constructor:{value:t,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return e},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),t}t.asPromise=Wc(),t.base64=Kc(),t.EventEmitter=Zc(),t.float=rd(),t.inquire=od(),t.utf8=ad(),t.pool=ud(),t.LongBits=cd(),t.isNode=!!("u">typeof global&&global&&global.process&&global.process.versions&&global.process.versions.node),t.global=t.isNode&&global||"u">typeof window&&window||"u">typeof self&&self||e,t.emptyArray=Object.freeze?Object.freeze([]):[],t.emptyObject=Object.freeze?Object.freeze({}):{},t.isInteger=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},t.isString=function(e){return"string"==typeof e||e instanceof String},t.isObject=function(e){return e&&"object"==typeof e},t.isset=t.isSet=function(e,t){var n=e[t];return!!(null!=n&&e.hasOwnProperty(t))&&("object"!=typeof n||(Array.isArray(n)?n.length:Object.keys(n).length)>0)},t.Buffer=function(){try{var e=t.inquire("buffer").Buffer;return e.prototype.utf8Write?e:null}catch{return null}}(),t._Buffer_from=null,t._Buffer_allocUnsafe=null,t.newBuffer=function(e){return"number"==typeof e?t.Buffer?t._Buffer_allocUnsafe(e):new t.Array(e):t.Buffer?t._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)},t.Array="u">typeof Uint8Array?Uint8Array:Array,t.Long=t.global.dcodeIO&&t.global.dcodeIO.Long||t.global.Long||t.inquire("long"),t.key2Re=/^true|false|0|1$/,t.key32Re=/^-?(?:0|[1-9][0-9]*)$/,t.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,t.longToHash=function(e){return e?t.LongBits.from(e).toHash():t.LongBits.zeroHash},t.longFromHash=function(e,n){var i=t.LongBits.fromHash(e);return t.Long?t.Long.fromBits(i.lo,i.hi,n):i.toNumber(!!n)},t.merge=n,t.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)},t.newError=i,t.ProtocolError=i("ProtocolError"),t.oneOfGetter=function(e){for(var t={},n=0;n<e.length;++n)t[e[n]]=1;return function(){for(var e=Object.keys(this),n=e.length-1;n>-1;--n)if(1===t[e[n]]&&void 0!==this[e[n]]&&null!==this[e[n]])return e[n]}},t.oneOfSetter=function(e){return function(t){for(var n=0;n<e.length;++n)e[n]!==t&&delete this[e[n]]}},t.toJSONOptions={longs:String,enums:String,bytes:String,json:!0},t._configure=function(){var e=t.Buffer;if(!e){t._Buffer_from=t._Buffer_allocUnsafe=null;return}t._Buffer_from=e.from!==Uint8Array.from&&e.from||function(t,n){return new e(t,n)},t._Buffer_allocUnsafe=e.allocUnsafe||function(t){return new e(t)}}}),js=G((e,t)=>{"use strict";t.exports=p;var n,i=Ln(),o=i.LongBits,s=i.base64,a=i.utf8;function u(e,t,n){this.fn=e,this.len=t,this.next=void 0,this.val=n}function l(){}function d(e){this.head=e.head,this.tail=e.tail,this.len=e.len,this.next=e.states}function p(){this.len=0,this.head=new u(l,0,0),this.tail=this.head,this.states=null}var c=function(){return i.Buffer?function(){return(p.create=function(){return new n})()}:function(){return new p}};function h(e,t,n){t[n]=255&e}function f(e,t,n){for(;e>127;)t[n++]=127&e|128,e>>>=7;t[n]=e}function m(e,t){this.len=e,this.next=void 0,this.val=t}function g(e,t,n){for(;e.hi;)t[n++]=127&e.lo|128,e.lo=(e.lo>>>7|e.hi<<25)>>>0,e.hi>>>=7;for(;e.lo>127;)t[n++]=127&e.lo|128,e.lo=e.lo>>>7;t[n++]=e.lo}function b(e,t,n){t[n]=255&e,t[n+1]=e>>>8&255,t[n+2]=e>>>16&255,t[n+3]=e>>>24}p.create=c(),p.alloc=function(e){return new i.Array(e)},i.Array!==Array&&(p.alloc=i.pool(p.alloc,i.Array.prototype.subarray)),p.prototype._push=function(e,t,n){return this.tail=this.tail.next=new u(e,t,n),this.len+=t,this},m.prototype=Object.create(u.prototype),m.prototype.fn=f,p.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new m((e>>>=0)<128?1:e<16384?2:e<2097152?3:e<0x10000000?4:5,e)).len,this},p.prototype.int32=function(e){return e<0?this._push(g,10,o.fromNumber(e)):this.uint32(e)},p.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)},p.prototype.uint64=function(e){var t=o.from(e);return this._push(g,t.length(),t)},p.prototype.int64=p.prototype.uint64,p.prototype.sint64=function(e){var t=o.from(e).zzEncode();return this._push(g,t.length(),t)},p.prototype.bool=function(e){return this._push(h,1,+!!e)},p.prototype.fixed32=function(e){return this._push(b,4,e>>>0)},p.prototype.sfixed32=p.prototype.fixed32,p.prototype.fixed64=function(e){var t=o.from(e);return this._push(b,4,t.lo)._push(b,4,t.hi)},p.prototype.sfixed64=p.prototype.fixed64,p.prototype.float=function(e){return this._push(i.float.writeFloatLE,4,e)},p.prototype.double=function(e){return this._push(i.float.writeDoubleLE,8,e)};var y=i.Array.prototype.set?function(e,t,n){t.set(e,n)}:function(e,t,n){for(var i=0;i<e.length;++i)t[n+i]=e[i]};p.prototype.bytes=function(e){var t=e.length>>>0;if(!t)return this._push(h,1,0);if(i.isString(e)){var n=p.alloc(t=s.length(e));s.decode(e,n,0),e=n}return this.uint32(t)._push(y,t,e)},p.prototype.string=function(e){var t=a.length(e);return t?this.uint32(t)._push(a.write,t,e):this._push(h,1,0)},p.prototype.fork=function(){return this.states=new d(this),this.head=this.tail=new u(l,0,0),this.len=0,this},p.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new u(l,0,0),this.len=0),this},p.prototype.ldelim=function(){var e=this.head,t=this.tail,n=this.len;return this.reset().uint32(n),n&&(this.tail.next=e.next,this.tail=t,this.len+=n),this},p.prototype.finish=function(){for(var e=this.head.next,t=this.constructor.alloc(this.len),n=0;e;)e.fn(e.val,t,n),n+=e.len,e=e.next;return t},p._configure=function(e){n=e,p.create=c(),n._configure()}}),_d=G((e,t)=>{"use strict";t.exports=o;var n=js();(o.prototype=Object.create(n.prototype)).constructor=o;var i=Ln();function o(){n.call(this)}function s(e,t,n){e.length<40?i.utf8.write(e,t,n):t.utf8Write?t.utf8Write(e,n):t.write(e,n)}o._configure=function(){o.alloc=i._Buffer_allocUnsafe,o.writeBytesBuffer=i.Buffer&&i.Buffer.prototype instanceof Uint8Array&&"set"===i.Buffer.prototype.set.name?function(e,t,n){t.set(e,n)}:function(e,t,n){if(e.copy)e.copy(t,n,0,e.length);else for(var i=0;i<e.length;)t[n++]=e[i++]}},o.prototype.bytes=function(e){i.isString(e)&&(e=i._Buffer_from(e,"base64"));var t=e.length>>>0;return this.uint32(t),t&&this._push(o.writeBytesBuffer,t,e),this},o.prototype.string=function(e){var t=i.Buffer.byteLength(e);return this.uint32(t),t&&this._push(s,t,e),this},o._configure()}),Zs=G((e,t)=>{"use strict";t.exports=u;var n,i=Ln(),o=i.LongBits,s=i.utf8;function a(e,t){return RangeError("index out of range: "+e.pos+" + "+(t||1)+" > "+e.len)}function u(e){this.buf=e,this.pos=0,this.len=e.length}var l="u">typeof Uint8Array?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new u(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new u(e);throw Error("illegal buffer")},d=function(){return i.Buffer?function(e){return(u.create=function(e){return i.Buffer.isBuffer(e)?new n(e):l(e)})(e)}:l};function p(){var e=new o(0,0),t=0;if(this.len-this.pos>4){for(;t<4;++t)if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e;if(e.lo=(e.lo|(127&this.buf[this.pos])<<28)>>>0,e.hi=(e.hi|(127&this.buf[this.pos])>>4)>>>0,this.buf[this.pos++]<128)return e;t=0}else{for(;t<3;++t){if(this.pos>=this.len)throw a(this);if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e}return e.lo=(e.lo|(127&this.buf[this.pos++])<<7*t)>>>0,e}if(this.len-this.pos>4){for(;t<5;++t)if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}else for(;t<5;++t){if(this.pos>=this.len)throw a(this);if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}throw Error("invalid varint encoding")}function c(e,t){return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0}function h(){if(this.pos+8>this.len)throw a(this,8);return new o(c(this.buf,this.pos+=4),c(this.buf,this.pos+=4))}u.create=d(),u.prototype._slice=i.Array.prototype.subarray||i.Array.prototype.slice,u.prototype.uint32=function(){var e=0xffffffff;return function(){if(e=(127&this.buf[this.pos])>>>0,this.buf[this.pos++]<128||(e=(e|(127&this.buf[this.pos])<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(127&this.buf[this.pos])<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(127&this.buf[this.pos])<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(15&this.buf[this.pos])<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,a(this,10);return e}}(),u.prototype.int32=function(){return 0|this.uint32()},u.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(1&e)},u.prototype.bool=function(){return 0!==this.uint32()},u.prototype.fixed32=function(){if(this.pos+4>this.len)throw a(this,4);return c(this.buf,this.pos+=4)},u.prototype.sfixed32=function(){if(this.pos+4>this.len)throw a(this,4);return 0|c(this.buf,this.pos+=4)},u.prototype.float=function(){if(this.pos+4>this.len)throw a(this,4);var e=i.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e},u.prototype.double=function(){if(this.pos+8>this.len)throw a(this,4);var e=i.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e},u.prototype.bytes=function(){var e=this.uint32(),t=this.pos,n=this.pos+e;if(n>this.len)throw a(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(t,n);if(t===n){var o=i.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,t,n)},u.prototype.string=function(){var e=this.bytes();return s.read(e,0,e.length)},u.prototype.skip=function(e){if("number"==typeof e){if(this.pos+e>this.len)throw a(this,e);this.pos+=e}else do if(this.pos>=this.len)throw a(this);while(128&this.buf[this.pos++])return this},u.prototype.skipType=function(e){switch(e){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;4!=(e=7&this.uint32());)this.skipType(e);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+e+" at offset "+this.pos)}return this},u._configure=function(e){n=e,u.create=d(),n._configure();var t=i.Long?"toLong":"toNumber";i.merge(u.prototype,{int64:function(){return p.call(this)[t](!1)},uint64:function(){return p.call(this)[t](!0)},sint64:function(){return p.call(this).zzDecode()[t](!1)},fixed64:function(){return h.call(this)[t](!0)},sfixed64:function(){return h.call(this)[t](!1)}})}}),Pd=G((e,t)=>{"use strict";t.exports=o;var n=Zs();(o.prototype=Object.create(n.prototype)).constructor=o;var i=Ln();function o(e){n.call(this,e)}o._configure=function(){i.Buffer&&(o.prototype._slice=i.Buffer.prototype.slice)},o.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))},o._configure()}),Ed=G((e,t)=>{"use strict";t.exports=i;var n=Ln();function i(e,t,i){if("function"!=typeof e)throw TypeError("rpcImpl must be a function");n.EventEmitter.call(this),this.rpcImpl=e,this.requestDelimited=!!t,this.responseDelimited=!!i}(i.prototype=Object.create(n.EventEmitter.prototype)).constructor=i,i.prototype.rpcCall=function e(t,i,o,s,a){if(!s)throw TypeError("request must be specified");var u=this;if(!a)return n.asPromise(e,u,t,i,o,s);if(!u.rpcImpl)return void setTimeout(function(){a(Error("already ended"))},0);try{return u.rpcImpl(t,i[u.requestDelimited?"encodeDelimited":"encode"](s).finish(),function(e,n){if(e)return u.emit("error",e,t),a(e);if(null===n)return void u.end(!0);if(!(n instanceof o))try{n=o[u.responseDelimited?"decodeDelimited":"decode"](n)}catch(e){return u.emit("error",e,t),a(e)}return u.emit("data",n,t),a(null,n)})}catch(e){u.emit("error",e,t),setTimeout(function(){a(e)},0);return}},i.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}}),Dd=G(e=>{"use strict";e.Service=Ed()}),Ld=G((e,t)=>{"use strict";t.exports={}}),zd=G(e=>{"use strict";var t=e;function n(){t.util._configure(),t.Writer._configure(t.BufferWriter),t.Reader._configure(t.BufferReader)}t.build="minimal",t.Writer=js(),t.BufferWriter=_d(),t.Reader=Zs(),t.BufferReader=Pd(),t.util=Ln(),t.rpc=Dd(),t.roots=Ld(),t.configure=n,n()}),Bd=G((e,t)=>{"use strict";t.exports=zd()}),mr=G((e,t)=>{"use strict";var n=Bd(),i=n.Reader,o=n.Writer,s=n.util,a=n.roots.default||(n.roots.default={});a.onnx=function(){var e={};return e.Version=function(){var e={},t=Object.create(e);return t[e[0]="_START_VERSION"]=0,t[e[1]="IR_VERSION_2017_10_10"]=1,t[e[2]="IR_VERSION_2017_10_30"]=2,t[e[3]="IR_VERSION_2017_11_3"]=3,t[e[4]="IR_VERSION_2019_1_22"]=4,t[e[5]="IR_VERSION_2019_3_18"]=5,t[e[6]="IR_VERSION_2019_9_19"]=6,t[e[7]="IR_VERSION_2020_5_8"]=7,t[e[8]="IR_VERSION_2021_7_30"]=8,t[e[9]="IR_VERSION"]=9,t}(),e.AttributeProto=function(){function e(e){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=s.Long?s.Long.fromBits(0,0,!1):0,e.prototype.s=s.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=s.emptyArray,e.prototype.ints=s.emptyArray,e.prototype.strings=s.emptyArray,e.prototype.tensors=s.emptyArray,e.prototype.graphs=s.emptyArray,e.prototype.sparseTensors=s.emptyArray,e.prototype.typeProtos=s.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.f&&Object.hasOwnProperty.call(e,"f")&&t.uint32(21).float(e.f),null!=e.i&&Object.hasOwnProperty.call(e,"i")&&t.uint32(24).int64(e.i),null!=e.s&&Object.hasOwnProperty.call(e,"s")&&t.uint32(34).bytes(e.s),null!=e.t&&Object.hasOwnProperty.call(e,"t")&&a.onnx.TensorProto.encode(e.t,t.uint32(42).fork()).ldelim(),null!=e.g&&Object.hasOwnProperty.call(e,"g")&&a.onnx.GraphProto.encode(e.g,t.uint32(50).fork()).ldelim(),null!=e.floats&&e.floats.length){t.uint32(58).fork();for(var n=0;n<e.floats.length;++n)t.float(e.floats[n]);t.ldelim()}if(null!=e.ints&&e.ints.length){t.uint32(66).fork();for(var n=0;n<e.ints.length;++n)t.int64(e.ints[n]);t.ldelim()}if(null!=e.strings&&e.strings.length)for(var n=0;n<e.strings.length;++n)t.uint32(74).bytes(e.strings[n]);if(null!=e.tensors&&e.tensors.length)for(var n=0;n<e.tensors.length;++n)a.onnx.TensorProto.encode(e.tensors[n],t.uint32(82).fork()).ldelim();if(null!=e.graphs&&e.graphs.length)for(var n=0;n<e.graphs.length;++n)a.onnx.GraphProto.encode(e.graphs[n],t.uint32(90).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(106).string(e.docString),null!=e.tp&&Object.hasOwnProperty.call(e,"tp")&&a.onnx.TypeProto.encode(e.tp,t.uint32(114).fork()).ldelim(),null!=e.typeProtos&&e.typeProtos.length)for(var n=0;n<e.typeProtos.length;++n)a.onnx.TypeProto.encode(e.typeProtos[n],t.uint32(122).fork()).ldelim();if(null!=e.type&&Object.hasOwnProperty.call(e,"type")&&t.uint32(160).int32(e.type),null!=e.refAttrName&&Object.hasOwnProperty.call(e,"refAttrName")&&t.uint32(170).string(e.refAttrName),null!=e.sparseTensor&&Object.hasOwnProperty.call(e,"sparseTensor")&&a.onnx.SparseTensorProto.encode(e.sparseTensor,t.uint32(178).fork()).ldelim(),null!=e.sparseTensors&&e.sparseTensors.length)for(var n=0;n<e.sparseTensors.length;++n)a.onnx.SparseTensorProto.encode(e.sparseTensors[n],t.uint32(186).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.AttributeProto;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.name=e.string();break;case 21:o.refAttrName=e.string();break;case 13:o.docString=e.string();break;case 20:o.type=e.int32();break;case 2:o.f=e.float();break;case 3:o.i=e.int64();break;case 4:o.s=e.bytes();break;case 5:o.t=a.onnx.TensorProto.decode(e,e.uint32());break;case 6:o.g=a.onnx.GraphProto.decode(e,e.uint32());break;case 22:o.sparseTensor=a.onnx.SparseTensorProto.decode(e,e.uint32());break;case 14:o.tp=a.onnx.TypeProto.decode(e,e.uint32());break;case 7:if(o.floats&&o.floats.length||(o.floats=[]),(7&s)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.floats.push(e.float());else o.floats.push(e.float());break;case 8:if(o.ints&&o.ints.length||(o.ints=[]),(7&s)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.ints.push(e.int64());else o.ints.push(e.int64());break;case 9:o.strings&&o.strings.length||(o.strings=[]),o.strings.push(e.bytes());break;case 10:o.tensors&&o.tensors.length||(o.tensors=[]),o.tensors.push(a.onnx.TensorProto.decode(e,e.uint32()));break;case 11:o.graphs&&o.graphs.length||(o.graphs=[]),o.graphs.push(a.onnx.GraphProto.decode(e,e.uint32()));break;case 23:o.sparseTensors&&o.sparseTensors.length||(o.sparseTensors=[]),o.sparseTensors.push(a.onnx.SparseTensorProto.decode(e,e.uint32()));break;case 15:o.typeProtos&&o.typeProtos.length||(o.typeProtos=[]),o.typeProtos.push(a.onnx.TypeProto.decode(e,e.uint32()));break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!s.isString(e.name))return"name: string expected";if(null!=e.refAttrName&&e.hasOwnProperty("refAttrName")&&!s.isString(e.refAttrName))return"refAttrName: string expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!s.isString(e.docString))return"docString: string expected";if(null!=e.type&&e.hasOwnProperty("type"))switch(e.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:}if(null!=e.f&&e.hasOwnProperty("f")&&"number"!=typeof e.f)return"f: number expected";if(null!=e.i&&e.hasOwnProperty("i")&&!s.isInteger(e.i)&&!(e.i&&s.isInteger(e.i.low)&&s.isInteger(e.i.high)))return"i: integer|Long expected";if(null!=e.s&&e.hasOwnProperty("s")&&!(e.s&&"number"==typeof e.s.length||s.isString(e.s)))return"s: buffer expected";if(null!=e.t&&e.hasOwnProperty("t")){var t=a.onnx.TensorProto.verify(e.t);if(t)return"t."+t}if(null!=e.g&&e.hasOwnProperty("g")){var t=a.onnx.GraphProto.verify(e.g);if(t)return"g."+t}if(null!=e.sparseTensor&&e.hasOwnProperty("sparseTensor")){var t=a.onnx.SparseTensorProto.verify(e.sparseTensor);if(t)return"sparseTensor."+t}if(null!=e.tp&&e.hasOwnProperty("tp")){var t=a.onnx.TypeProto.verify(e.tp);if(t)return"tp."+t}if(null!=e.floats&&e.hasOwnProperty("floats")){if(!Array.isArray(e.floats))return"floats: array expected";for(var n=0;n<e.floats.length;++n)if("number"!=typeof e.floats[n])return"floats: number[] expected"}if(null!=e.ints&&e.hasOwnProperty("ints")){if(!Array.isArray(e.ints))return"ints: array expected";for(var n=0;n<e.ints.length;++n)if(!s.isInteger(e.ints[n])&&!(e.ints[n]&&s.isInteger(e.ints[n].low)&&s.isInteger(e.ints[n].high)))return"ints: integer|Long[] expected"}if(null!=e.strings&&e.hasOwnProperty("strings")){if(!Array.isArray(e.strings))return"strings: array expected";for(var n=0;n<e.strings.length;++n)if(!(e.strings[n]&&"number"==typeof e.strings[n].length||s.isString(e.strings[n])))return"strings: buffer[] expected"}if(null!=e.tensors&&e.hasOwnProperty("tensors")){if(!Array.isArray(e.tensors))return"tensors: array expected";for(var n=0;n<e.tensors.length;++n){var t=a.onnx.TensorProto.verify(e.tensors[n]);if(t)return"tensors."+t}}if(null!=e.graphs&&e.hasOwnProperty("graphs")){if(!Array.isArray(e.graphs))return"graphs: array expected";for(var n=0;n<e.graphs.length;++n){var t=a.onnx.GraphProto.verify(e.graphs[n]);if(t)return"graphs."+t}}if(null!=e.sparseTensors&&e.hasOwnProperty("sparseTensors")){if(!Array.isArray(e.sparseTensors))return"sparseTensors: array expected";for(var n=0;n<e.sparseTensors.length;++n){var t=a.onnx.SparseTensorProto.verify(e.sparseTensors[n]);if(t)return"sparseTensors."+t}}if(null!=e.typeProtos&&e.hasOwnProperty("typeProtos")){if(!Array.isArray(e.typeProtos))return"typeProtos: array expected";for(var n=0;n<e.typeProtos.length;++n){var t=a.onnx.TypeProto.verify(e.typeProtos[n]);if(t)return"typeProtos."+t}}return null},e.fromObject=function(e){if(e instanceof a.onnx.AttributeProto)return e;var t=new a.onnx.AttributeProto;switch(null!=e.name&&(t.name=String(e.name)),null!=e.refAttrName&&(t.refAttrName=String(e.refAttrName)),null!=e.docString&&(t.docString=String(e.docString)),e.type){default:"number"==typeof e.type&&(t.type=e.type);break;case"UNDEFINED":case 0:t.type=0;break;case"FLOAT":case 1:t.type=1;break;case"INT":case 2:t.type=2;break;case"STRING":case 3:t.type=3;break;case"TENSOR":case 4:t.type=4;break;case"GRAPH":case 5:t.type=5;break;case"SPARSE_TENSOR":case 11:t.type=11;break;case"TYPE_PROTO":case 13:t.type=13;break;case"FLOATS":case 6:t.type=6;break;case"INTS":case 7:t.type=7;break;case"STRINGS":case 8:t.type=8;break;case"TENSORS":case 9:t.type=9;break;case"GRAPHS":case 10:t.type=10;break;case"SPARSE_TENSORS":case 12:t.type=12;break;case"TYPE_PROTOS":case 14:t.type=14}if(null!=e.f&&(t.f=Number(e.f)),null!=e.i&&(s.Long?(t.i=s.Long.fromValue(e.i)).unsigned=!1:"string"==typeof e.i?t.i=parseInt(e.i,10):"number"==typeof e.i?t.i=e.i:"object"==typeof e.i&&(t.i=new s.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber())),null!=e.s&&("string"==typeof e.s?s.base64.decode(e.s,t.s=s.newBuffer(s.base64.length(e.s)),0):e.s.length>=0&&(t.s=e.s)),null!=e.t){if("object"!=typeof e.t)throw TypeError(".onnx.AttributeProto.t: object expected");t.t=a.onnx.TensorProto.fromObject(e.t)}if(null!=e.g){if("object"!=typeof e.g)throw TypeError(".onnx.AttributeProto.g: object expected");t.g=a.onnx.GraphProto.fromObject(e.g)}if(null!=e.sparseTensor){if("object"!=typeof e.sparseTensor)throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");t.sparseTensor=a.onnx.SparseTensorProto.fromObject(e.sparseTensor)}if(null!=e.tp){if("object"!=typeof e.tp)throw TypeError(".onnx.AttributeProto.tp: object expected");t.tp=a.onnx.TypeProto.fromObject(e.tp)}if(e.floats){if(!Array.isArray(e.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");t.floats=[];for(var n=0;n<e.floats.length;++n)t.floats[n]=Number(e.floats[n])}if(e.ints){if(!Array.isArray(e.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");t.ints=[];for(var n=0;n<e.ints.length;++n)s.Long?(t.ints[n]=s.Long.fromValue(e.ints[n])).unsigned=!1:"string"==typeof e.ints[n]?t.ints[n]=parseInt(e.ints[n],10):"number"==typeof e.ints[n]?t.ints[n]=e.ints[n]:"object"==typeof e.ints[n]&&(t.ints[n]=new s.LongBits(e.ints[n].low>>>0,e.ints[n].high>>>0).toNumber())}if(e.strings){if(!Array.isArray(e.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");t.strings=[];for(var n=0;n<e.strings.length;++n)"string"==typeof e.strings[n]?s.base64.decode(e.strings[n],t.strings[n]=s.newBuffer(s.base64.length(e.strings[n])),0):e.strings[n].length>=0&&(t.strings[n]=e.strings[n])}if(e.tensors){if(!Array.isArray(e.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");t.tensors=[];for(var n=0;n<e.tensors.length;++n){if("object"!=typeof e.tensors[n])throw TypeError(".onnx.AttributeProto.tensors: object expected");t.tensors[n]=a.onnx.TensorProto.fromObject(e.tensors[n])}}if(e.graphs){if(!Array.isArray(e.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");t.graphs=[];for(var n=0;n<e.graphs.length;++n){if("object"!=typeof e.graphs[n])throw TypeError(".onnx.AttributeProto.graphs: object expected");t.graphs[n]=a.onnx.GraphProto.fromObject(e.graphs[n])}}if(e.sparseTensors){if(!Array.isArray(e.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");t.sparseTensors=[];for(var n=0;n<e.sparseTensors.length;++n){if("object"!=typeof e.sparseTensors[n])throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");t.sparseTensors[n]=a.onnx.SparseTensorProto.fromObject(e.sparseTensors[n])}}if(e.typeProtos){if(!Array.isArray(e.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");t.typeProtos=[];for(var n=0;n<e.typeProtos.length;++n){if("object"!=typeof e.typeProtos[n])throw TypeError(".onnx.AttributeProto.typeProtos: object expected");t.typeProtos[n]=a.onnx.TypeProto.fromObject(e.typeProtos[n])}}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.floats=[],n.ints=[],n.strings=[],n.tensors=[],n.graphs=[],n.typeProtos=[],n.sparseTensors=[]),t.defaults){if(n.name="",n.f=0,s.Long){var i=new s.Long(0,0,!1);n.i=t.longs===String?i.toString():t.longs===Number?i.toNumber():i}else n.i=t.longs===String?"0":0;t.bytes===String?n.s="":(n.s=[],t.bytes!==Array&&(n.s=s.newBuffer(n.s))),n.t=null,n.g=null,n.docString="",n.tp=null,n.type=t.enums===String?"UNDEFINED":0,n.refAttrName="",n.sparseTensor=null}if(null!=e.name&&e.hasOwnProperty("name")&&(n.name=e.name),null!=e.f&&e.hasOwnProperty("f")&&(n.f=t.json&&!isFinite(e.f)?String(e.f):e.f),null!=e.i&&e.hasOwnProperty("i")&&("number"==typeof e.i?n.i=t.longs===String?String(e.i):e.i:n.i=t.longs===String?s.Long.prototype.toString.call(e.i):t.longs===Number?new s.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber():e.i),null!=e.s&&e.hasOwnProperty("s")&&(n.s=t.bytes===String?s.base64.encode(e.s,0,e.s.length):t.bytes===Array?Array.prototype.slice.call(e.s):e.s),null!=e.t&&e.hasOwnProperty("t")&&(n.t=a.onnx.TensorProto.toObject(e.t,t)),null!=e.g&&e.hasOwnProperty("g")&&(n.g=a.onnx.GraphProto.toObject(e.g,t)),e.floats&&e.floats.length){n.floats=[];for(var o=0;o<e.floats.length;++o)n.floats[o]=t.json&&!isFinite(e.floats[o])?String(e.floats[o]):e.floats[o]}if(e.ints&&e.ints.length){n.ints=[];for(var o=0;o<e.ints.length;++o)"number"==typeof e.ints[o]?n.ints[o]=t.longs===String?String(e.ints[o]):e.ints[o]:n.ints[o]=t.longs===String?s.Long.prototype.toString.call(e.ints[o]):t.longs===Number?new s.LongBits(e.ints[o].low>>>0,e.ints[o].high>>>0).toNumber():e.ints[o]}if(e.strings&&e.strings.length){n.strings=[];for(var o=0;o<e.strings.length;++o)n.strings[o]=t.bytes===String?s.base64.encode(e.strings[o],0,e.strings[o].length):t.bytes===Array?Array.prototype.slice.call(e.strings[o]):e.strings[o]}if(e.tensors&&e.tensors.length){n.tensors=[];for(var o=0;o<e.tensors.length;++o)n.tensors[o]=a.onnx.TensorProto.toObject(e.tensors[o],t)}if(e.graphs&&e.graphs.length){n.graphs=[];for(var o=0;o<e.graphs.length;++o)n.graphs[o]=a.onnx.GraphProto.toObject(e.graphs[o],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),null!=e.tp&&e.hasOwnProperty("tp")&&(n.tp=a.onnx.TypeProto.toObject(e.tp,t)),e.typeProtos&&e.typeProtos.length){n.typeProtos=[];for(var o=0;o<e.typeProtos.length;++o)n.typeProtos[o]=a.onnx.TypeProto.toObject(e.typeProtos[o],t)}if(null!=e.type&&e.hasOwnProperty("type")&&(n.type=t.enums===String?void 0===a.onnx.AttributeProto.AttributeType[e.type]?e.type:a.onnx.AttributeProto.AttributeType[e.type]:e.type),null!=e.refAttrName&&e.hasOwnProperty("refAttrName")&&(n.refAttrName=e.refAttrName),null!=e.sparseTensor&&e.hasOwnProperty("sparseTensor")&&(n.sparseTensor=a.onnx.SparseTensorProto.toObject(e.sparseTensor,t)),e.sparseTensors&&e.sparseTensors.length){n.sparseTensors=[];for(var o=0;o<e.sparseTensors.length;++o)n.sparseTensors[o]=a.onnx.SparseTensorProto.toObject(e.sparseTensors[o],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.AttributeProto"},e.AttributeType=function(){var e={},t=Object.create(e);return t[e[0]="UNDEFINED"]=0,t[e[1]="FLOAT"]=1,t[e[2]="INT"]=2,t[e[3]="STRING"]=3,t[e[4]="TENSOR"]=4,t[e[5]="GRAPH"]=5,t[e[11]="SPARSE_TENSOR"]=11,t[e[13]="TYPE_PROTO"]=13,t[e[6]="FLOATS"]=6,t[e[7]="INTS"]=7,t[e[8]="STRINGS"]=8,t[e[9]="TENSORS"]=9,t[e[10]="GRAPHS"]=10,t[e[12]="SPARSE_TENSORS"]=12,t[e[14]="TYPE_PROTOS"]=14,t}(),e}(),e.ValueInfoProto=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.type&&Object.hasOwnProperty.call(e,"type")&&a.onnx.TypeProto.encode(e.type,t.uint32(18).fork()).ldelim(),null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(26).string(e.docString),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.ValueInfoProto;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.name=e.string();break;case 2:o.type=a.onnx.TypeProto.decode(e,e.uint32());break;case 3:o.docString=e.string();break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!s.isString(e.name))return"name: string expected";if(null!=e.type&&e.hasOwnProperty("type")){var t=a.onnx.TypeProto.verify(e.type);if(t)return"type."+t}return null!=e.docString&&e.hasOwnProperty("docString")&&!s.isString(e.docString)?"docString: string expected":null},e.fromObject=function(e){if(e instanceof a.onnx.ValueInfoProto)return e;var t=new a.onnx.ValueInfoProto;if(null!=e.name&&(t.name=String(e.name)),null!=e.type){if("object"!=typeof e.type)throw TypeError(".onnx.ValueInfoProto.type: object expected");t.type=a.onnx.TypeProto.fromObject(e.type)}return null!=e.docString&&(t.docString=String(e.docString)),t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.name="",n.type=null,n.docString=""),null!=e.name&&e.hasOwnProperty("name")&&(n.name=e.name),null!=e.type&&e.hasOwnProperty("type")&&(n.type=a.onnx.TypeProto.toObject(e.type,t)),null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.ValueInfoProto"},e}(),e.NodeProto=function(){function e(e){if(this.input=[],this.output=[],this.attribute=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.input=s.emptyArray,e.prototype.output=s.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=s.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.input&&e.input.length)for(var n=0;n<e.input.length;++n)t.uint32(10).string(e.input[n]);if(null!=e.output&&e.output.length)for(var n=0;n<e.output.length;++n)t.uint32(18).string(e.output[n]);if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(26).string(e.name),null!=e.opType&&Object.hasOwnProperty.call(e,"opType")&&t.uint32(34).string(e.opType),null!=e.attribute&&e.attribute.length)for(var n=0;n<e.attribute.length;++n)a.onnx.AttributeProto.encode(e.attribute[n],t.uint32(42).fork()).ldelim();return null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(50).string(e.docString),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(58).string(e.domain),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.NodeProto;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.input&&o.input.length||(o.input=[]),o.input.push(e.string());break;case 2:o.output&&o.output.length||(o.output=[]),o.output.push(e.string());break;case 3:o.name=e.string();break;case 4:o.opType=e.string();break;case 7:o.domain=e.string();break;case 5:o.attribute&&o.attribute.length||(o.attribute=[]),o.attribute.push(a.onnx.AttributeProto.decode(e,e.uint32()));break;case 6:o.docString=e.string();break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t)if(!s.isString(e.input[t]))return"input: string[] expected"}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t)if(!s.isString(e.output[t]))return"output: string[] expected"}if(null!=e.name&&e.hasOwnProperty("name")&&!s.isString(e.name))return"name: string expected";if(null!=e.opType&&e.hasOwnProperty("opType")&&!s.isString(e.opType))return"opType: string expected";if(null!=e.domain&&e.hasOwnProperty("domain")&&!s.isString(e.domain))return"domain: string expected";if(null!=e.attribute&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var t=0;t<e.attribute.length;++t){var n=a.onnx.AttributeProto.verify(e.attribute[t]);if(n)return"attribute."+n}}return null!=e.docString&&e.hasOwnProperty("docString")&&!s.isString(e.docString)?"docString: string expected":null},e.fromObject=function(e){if(e instanceof a.onnx.NodeProto)return e;var t=new a.onnx.NodeProto;if(e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.NodeProto.input: array expected");t.input=[];for(var n=0;n<e.input.length;++n)t.input[n]=String(e.input[n])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.NodeProto.output: array expected");t.output=[];for(var n=0;n<e.output.length;++n)t.output[n]=String(e.output[n])}if(null!=e.name&&(t.name=String(e.name)),null!=e.opType&&(t.opType=String(e.opType)),null!=e.domain&&(t.domain=String(e.domain)),e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");t.attribute=[];for(var n=0;n<e.attribute.length;++n){if("object"!=typeof e.attribute[n])throw TypeError(".onnx.NodeProto.attribute: object expected");t.attribute[n]=a.onnx.AttributeProto.fromObject(e.attribute[n])}}return null!=e.docString&&(t.docString=String(e.docString)),t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.input=[],n.output=[],n.attribute=[]),t.defaults&&(n.name="",n.opType="",n.docString="",n.domain=""),e.input&&e.input.length){n.input=[];for(var i=0;i<e.input.length;++i)n.input[i]=e.input[i]}if(e.output&&e.output.length){n.output=[];for(var i=0;i<e.output.length;++i)n.output[i]=e.output[i]}if(null!=e.name&&e.hasOwnProperty("name")&&(n.name=e.name),null!=e.opType&&e.hasOwnProperty("opType")&&(n.opType=e.opType),e.attribute&&e.attribute.length){n.attribute=[];for(var i=0;i<e.attribute.length;++i)n.attribute[i]=a.onnx.AttributeProto.toObject(e.attribute[i],t)}return null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),null!=e.domain&&e.hasOwnProperty("domain")&&(n.domain=e.domain),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.NodeProto"},e}(),e.TrainingInfoProto=function(){function e(e){if(this.initializationBinding=[],this.updateBinding=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=s.emptyArray,e.prototype.updateBinding=s.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.initialization&&Object.hasOwnProperty.call(e,"initialization")&&a.onnx.GraphProto.encode(e.initialization,t.uint32(10).fork()).ldelim(),null!=e.algorithm&&Object.hasOwnProperty.call(e,"algorithm")&&a.onnx.GraphProto.encode(e.algorithm,t.uint32(18).fork()).ldelim(),null!=e.initializationBinding&&e.initializationBinding.length)for(var n=0;n<e.initializationBinding.length;++n)a.onnx.StringStringEntryProto.encode(e.initializationBinding[n],t.uint32(26).fork()).ldelim();if(null!=e.updateBinding&&e.updateBinding.length)for(var n=0;n<e.updateBinding.length;++n)a.onnx.StringStringEntryProto.encode(e.updateBinding[n],t.uint32(34).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.TrainingInfoProto;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.initialization=a.onnx.GraphProto.decode(e,e.uint32());break;case 2:o.algorithm=a.onnx.GraphProto.decode(e,e.uint32());break;case 3:o.initializationBinding&&o.initializationBinding.length||(o.initializationBinding=[]),o.initializationBinding.push(a.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 4:o.updateBinding&&o.updateBinding.length||(o.updateBinding=[]),o.updateBinding.push(a.onnx.StringStringEntryProto.decode(e,e.uint32()));break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.initialization&&e.hasOwnProperty("initialization")){var t=a.onnx.GraphProto.verify(e.initialization);if(t)return"initialization."+t}if(null!=e.algorithm&&e.hasOwnProperty("algorithm")){var t=a.onnx.GraphProto.verify(e.algorithm);if(t)return"algorithm."+t}if(null!=e.initializationBinding&&e.hasOwnProperty("initializationBinding")){if(!Array.isArray(e.initializationBinding))return"initializationBinding: array expected";for(var n=0;n<e.initializationBinding.length;++n){var t=a.onnx.StringStringEntryProto.verify(e.initializationBinding[n]);if(t)return"initializationBinding."+t}}if(null!=e.updateBinding&&e.hasOwnProperty("updateBinding")){if(!Array.isArray(e.updateBinding))return"updateBinding: array expected";for(var n=0;n<e.updateBinding.length;++n){var t=a.onnx.StringStringEntryProto.verify(e.updateBinding[n]);if(t)return"updateBinding."+t}}return null},e.fromObject=function(e){if(e instanceof a.onnx.TrainingInfoProto)return e;var t=new a.onnx.TrainingInfoProto;if(null!=e.initialization){if("object"!=typeof e.initialization)throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");t.initialization=a.onnx.GraphProto.fromObject(e.initialization)}if(null!=e.algorithm){if("object"!=typeof e.algorithm)throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");t.algorithm=a.onnx.GraphProto.fromObject(e.algorithm)}if(e.initializationBinding){if(!Array.isArray(e.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");t.initializationBinding=[];for(var n=0;n<e.initializationBinding.length;++n){if("object"!=typeof e.initializationBinding[n])throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");t.initializationBinding[n]=a.onnx.StringStringEntryProto.fromObject(e.initializationBinding[n])}}if(e.updateBinding){if(!Array.isArray(e.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");t.updateBinding=[];for(var n=0;n<e.updateBinding.length;++n){if("object"!=typeof e.updateBinding[n])throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");t.updateBinding[n]=a.onnx.StringStringEntryProto.fromObject(e.updateBinding[n])}}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.initializationBinding=[],n.updateBinding=[]),t.defaults&&(n.initialization=null,n.algorithm=null),null!=e.initialization&&e.hasOwnProperty("initialization")&&(n.initialization=a.onnx.GraphProto.toObject(e.initialization,t)),null!=e.algorithm&&e.hasOwnProperty("algorithm")&&(n.algorithm=a.onnx.GraphProto.toObject(e.algorithm,t)),e.initializationBinding&&e.initializationBinding.length){n.initializationBinding=[];for(var i=0;i<e.initializationBinding.length;++i)n.initializationBinding[i]=a.onnx.StringStringEntryProto.toObject(e.initializationBinding[i],t)}if(e.updateBinding&&e.updateBinding.length){n.updateBinding=[];for(var i=0;i<e.updateBinding.length;++i)n.updateBinding[i]=a.onnx.StringStringEntryProto.toObject(e.updateBinding[i],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TrainingInfoProto"},e}(),e.ModelProto=function(){function e(e){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.irVersion=s.Long?s.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=s.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=s.Long?s.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=s.emptyArray,e.prototype.trainingInfo=s.emptyArray,e.prototype.functions=s.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.irVersion&&Object.hasOwnProperty.call(e,"irVersion")&&t.uint32(8).int64(e.irVersion),null!=e.producerName&&Object.hasOwnProperty.call(e,"producerName")&&t.uint32(18).string(e.producerName),null!=e.producerVersion&&Object.hasOwnProperty.call(e,"producerVersion")&&t.uint32(26).string(e.producerVersion),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(34).string(e.domain),null!=e.modelVersion&&Object.hasOwnProperty.call(e,"modelVersion")&&t.uint32(40).int64(e.modelVersion),null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(50).string(e.docString),null!=e.graph&&Object.hasOwnProperty.call(e,"graph")&&a.onnx.GraphProto.encode(e.graph,t.uint32(58).fork()).ldelim(),null!=e.opsetImport&&e.opsetImport.length)for(var n=0;n<e.opsetImport.length;++n)a.onnx.OperatorSetIdProto.encode(e.opsetImport[n],t.uint32(66).fork()).ldelim();if(null!=e.metadataProps&&e.metadataProps.length)for(var n=0;n<e.metadataProps.length;++n)a.onnx.StringStringEntryProto.encode(e.metadataProps[n],t.uint32(114).fork()).ldelim();if(null!=e.trainingInfo&&e.trainingInfo.length)for(var n=0;n<e.trainingInfo.length;++n)a.onnx.TrainingInfoProto.encode(e.trainingInfo[n],t.uint32(162).fork()).ldelim();if(null!=e.functions&&e.functions.length)for(var n=0;n<e.functions.length;++n)a.onnx.FunctionProto.encode(e.functions[n],t.uint32(202).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.ModelProto;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.irVersion=e.int64();break;case 8:o.opsetImport&&o.opsetImport.length||(o.opsetImport=[]),o.opsetImport.push(a.onnx.OperatorSetIdProto.decode(e,e.uint32()));break;case 2:o.producerName=e.string();break;case 3:o.producerVersion=e.string();break;case 4:o.domain=e.string();break;case 5:o.modelVersion=e.int64();break;case 6:o.docString=e.string();break;case 7:o.graph=a.onnx.GraphProto.decode(e,e.uint32());break;case 14:o.metadataProps&&o.metadataProps.length||(o.metadataProps=[]),o.metadataProps.push(a.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 20:o.trainingInfo&&o.trainingInfo.length||(o.trainingInfo=[]),o.trainingInfo.push(a.onnx.TrainingInfoProto.decode(e,e.uint32()));break;case 25:o.functions&&o.functions.length||(o.functions=[]),o.functions.push(a.onnx.FunctionProto.decode(e,e.uint32()));break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.irVersion&&e.hasOwnProperty("irVersion")&&!s.isInteger(e.irVersion)&&!(e.irVersion&&s.isInteger(e.irVersion.low)&&s.isInteger(e.irVersion.high)))return"irVersion: integer|Long expected";if(null!=e.opsetImport&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var t=0;t<e.opsetImport.length;++t){var n=a.onnx.OperatorSetIdProto.verify(e.opsetImport[t]);if(n)return"opsetImport."+n}}if(null!=e.producerName&&e.hasOwnProperty("producerName")&&!s.isString(e.producerName))return"producerName: string expected";if(null!=e.producerVersion&&e.hasOwnProperty("producerVersion")&&!s.isString(e.producerVersion))return"producerVersion: string expected";if(null!=e.domain&&e.hasOwnProperty("domain")&&!s.isString(e.domain))return"domain: string expected";if(null!=e.modelVersion&&e.hasOwnProperty("modelVersion")&&!s.isInteger(e.modelVersion)&&!(e.modelVersion&&s.isInteger(e.modelVersion.low)&&s.isInteger(e.modelVersion.high)))return"modelVersion: integer|Long expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!s.isString(e.docString))return"docString: string expected";if(null!=e.graph&&e.hasOwnProperty("graph")){var n=a.onnx.GraphProto.verify(e.graph);if(n)return"graph."+n}if(null!=e.metadataProps&&e.hasOwnProperty("metadataProps")){if(!Array.isArray(e.metadataProps))return"metadataProps: array expected";for(var t=0;t<e.metadataProps.length;++t){var n=a.onnx.StringStringEntryProto.verify(e.metadataProps[t]);if(n)return"metadataProps."+n}}if(null!=e.trainingInfo&&e.hasOwnProperty("trainingInfo")){if(!Array.isArray(e.trainingInfo))return"trainingInfo: array expected";for(var t=0;t<e.trainingInfo.length;++t){var n=a.onnx.TrainingInfoProto.verify(e.trainingInfo[t]);if(n)return"trainingInfo."+n}}if(null!=e.functions&&e.hasOwnProperty("functions")){if(!Array.isArray(e.functions))return"functions: array expected";for(var t=0;t<e.functions.length;++t){var n=a.onnx.FunctionProto.verify(e.functions[t]);if(n)return"functions."+n}}return null},e.fromObject=function(e){if(e instanceof a.onnx.ModelProto)return e;var t=new a.onnx.ModelProto;if(null!=e.irVersion&&(s.Long?(t.irVersion=s.Long.fromValue(e.irVersion)).unsigned=!1:"string"==typeof e.irVersion?t.irVersion=parseInt(e.irVersion,10):"number"==typeof e.irVersion?t.irVersion=e.irVersion:"object"==typeof e.irVersion&&(t.irVersion=new s.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber())),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");t.opsetImport=[];for(var n=0;n<e.opsetImport.length;++n){if("object"!=typeof e.opsetImport[n])throw TypeError(".onnx.ModelProto.opsetImport: object expected");t.opsetImport[n]=a.onnx.OperatorSetIdProto.fromObject(e.opsetImport[n])}}if(null!=e.producerName&&(t.producerName=String(e.producerName)),null!=e.producerVersion&&(t.producerVersion=String(e.producerVersion)),null!=e.domain&&(t.domain=String(e.domain)),null!=e.modelVersion&&(s.Long?(t.modelVersion=s.Long.fromValue(e.modelVersion)).unsigned=!1:"string"==typeof e.modelVersion?t.modelVersion=parseInt(e.modelVersion,10):"number"==typeof e.modelVersion?t.modelVersion=e.modelVersion:"object"==typeof e.modelVersion&&(t.modelVersion=new s.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber())),null!=e.docString&&(t.docString=String(e.docString)),null!=e.graph){if("object"!=typeof e.graph)throw TypeError(".onnx.ModelProto.graph: object expected");t.graph=a.onnx.GraphProto.fromObject(e.graph)}if(e.metadataProps){if(!Array.isArray(e.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");t.metadataProps=[];for(var n=0;n<e.metadataProps.length;++n){if("object"!=typeof e.metadataProps[n])throw TypeError(".onnx.ModelProto.metadataProps: object expected");t.metadataProps[n]=a.onnx.StringStringEntryProto.fromObject(e.metadataProps[n])}}if(e.trainingInfo){if(!Array.isArray(e.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");t.trainingInfo=[];for(var n=0;n<e.trainingInfo.length;++n){if("object"!=typeof e.trainingInfo[n])throw TypeError(".onnx.ModelProto.trainingInfo: object expected");t.trainingInfo[n]=a.onnx.TrainingInfoProto.fromObject(e.trainingInfo[n])}}if(e.functions){if(!Array.isArray(e.functions))throw TypeError(".onnx.ModelProto.functions: array expected");t.functions=[];for(var n=0;n<e.functions.length;++n){if("object"!=typeof e.functions[n])throw TypeError(".onnx.ModelProto.functions: object expected");t.functions[n]=a.onnx.FunctionProto.fromObject(e.functions[n])}}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.opsetImport=[],n.metadataProps=[],n.trainingInfo=[],n.functions=[]),t.defaults){if(s.Long){var i=new s.Long(0,0,!1);n.irVersion=t.longs===String?i.toString():t.longs===Number?i.toNumber():i}else n.irVersion=t.longs===String?"0":0;if(n.producerName="",n.producerVersion="",n.domain="",s.Long){var i=new s.Long(0,0,!1);n.modelVersion=t.longs===String?i.toString():t.longs===Number?i.toNumber():i}else n.modelVersion=t.longs===String?"0":0;n.docString="",n.graph=null}if(null!=e.irVersion&&e.hasOwnProperty("irVersion")&&("number"==typeof e.irVersion?n.irVersion=t.longs===String?String(e.irVersion):e.irVersion:n.irVersion=t.longs===String?s.Long.prototype.toString.call(e.irVersion):t.longs===Number?new s.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber():e.irVersion),null!=e.producerName&&e.hasOwnProperty("producerName")&&(n.producerName=e.producerName),null!=e.producerVersion&&e.hasOwnProperty("producerVersion")&&(n.producerVersion=e.producerVersion),null!=e.domain&&e.hasOwnProperty("domain")&&(n.domain=e.domain),null!=e.modelVersion&&e.hasOwnProperty("modelVersion")&&("number"==typeof e.modelVersion?n.modelVersion=t.longs===String?String(e.modelVersion):e.modelVersion:n.modelVersion=t.longs===String?s.Long.prototype.toString.call(e.modelVersion):t.longs===Number?new s.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber():e.modelVersion),null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),null!=e.graph&&e.hasOwnProperty("graph")&&(n.graph=a.onnx.GraphProto.toObject(e.graph,t)),e.opsetImport&&e.opsetImport.length){n.opsetImport=[];for(var o=0;o<e.opsetImport.length;++o)n.opsetImport[o]=a.onnx.OperatorSetIdProto.toObject(e.opsetImport[o],t)}if(e.metadataProps&&e.metadataProps.length){n.metadataProps=[];for(var o=0;o<e.metadataProps.length;++o)n.metadataProps[o]=a.onnx.StringStringEntryProto.toObject(e.metadataProps[o],t)}if(e.trainingInfo&&e.trainingInfo.length){n.trainingInfo=[];for(var o=0;o<e.trainingInfo.length;++o)n.trainingInfo[o]=a.onnx.TrainingInfoProto.toObject(e.trainingInfo[o],t)}if(e.functions&&e.functions.length){n.functions=[];for(var o=0;o<e.functions.length;++o)n.functions[o]=a.onnx.FunctionProto.toObject(e.functions[o],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.ModelProto"},e}(),e.StringStringEntryProto=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.key&&Object.hasOwnProperty.call(e,"key")&&t.uint32(10).string(e.key),null!=e.value&&Object.hasOwnProperty.call(e,"value")&&t.uint32(18).string(e.value),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.StringStringEntryProto;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.key=e.string();break;case 2:o.value=e.string();break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.key&&e.hasOwnProperty("key")&&!s.isString(e.key)?"key: string expected":null!=e.value&&e.hasOwnProperty("value")&&!s.isString(e.value)?"value: string expected":null},e.fromObject=function(e){if(e instanceof a.onnx.StringStringEntryProto)return e;var t=new a.onnx.StringStringEntryProto;return null!=e.key&&(t.key=String(e.key)),null!=e.value&&(t.value=String(e.value)),t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.key="",n.value=""),null!=e.key&&e.hasOwnProperty("key")&&(n.key=e.key),null!=e.value&&e.hasOwnProperty("value")&&(n.value=e.value),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.StringStringEntryProto"},e}(),e.TensorAnnotation=function(){function e(e){if(this.quantParameterTensorNames=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=s.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.tensorName&&Object.hasOwnProperty.call(e,"tensorName")&&t.uint32(10).string(e.tensorName),null!=e.quantParameterTensorNames&&e.quantParameterTensorNames.length)for(var n=0;n<e.quantParameterTensorNames.length;++n)a.onnx.StringStringEntryProto.encode(e.quantParameterTensorNames[n],t.uint32(18).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.TensorAnnotation;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.tensorName=e.string();break;case 2:o.quantParameterTensorNames&&o.quantParameterTensorNames.length||(o.quantParameterTensorNames=[]),o.quantParameterTensorNames.push(a.onnx.StringStringEntryProto.decode(e,e.uint32()));break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.tensorName&&e.hasOwnProperty("tensorName")&&!s.isString(e.tensorName))return"tensorName: string expected";if(null!=e.quantParameterTensorNames&&e.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(e.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var t=0;t<e.quantParameterTensorNames.length;++t){var n=a.onnx.StringStringEntryProto.verify(e.quantParameterTensorNames[t]);if(n)return"quantParameterTensorNames."+n}}return null},e.fromObject=function(e){if(e instanceof a.onnx.TensorAnnotation)return e;var t=new a.onnx.TensorAnnotation;if(null!=e.tensorName&&(t.tensorName=String(e.tensorName)),e.quantParameterTensorNames){if(!Array.isArray(e.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");t.quantParameterTensorNames=[];for(var n=0;n<e.quantParameterTensorNames.length;++n){if("object"!=typeof e.quantParameterTensorNames[n])throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");t.quantParameterTensorNames[n]=a.onnx.StringStringEntryProto.fromObject(e.quantParameterTensorNames[n])}}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.quantParameterTensorNames=[]),t.defaults&&(n.tensorName=""),null!=e.tensorName&&e.hasOwnProperty("tensorName")&&(n.tensorName=e.tensorName),e.quantParameterTensorNames&&e.quantParameterTensorNames.length){n.quantParameterTensorNames=[];for(var i=0;i<e.quantParameterTensorNames.length;++i)n.quantParameterTensorNames[i]=a.onnx.StringStringEntryProto.toObject(e.quantParameterTensorNames[i],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorAnnotation"},e}(),e.GraphProto=function(){function e(e){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.node=s.emptyArray,e.prototype.name="",e.prototype.initializer=s.emptyArray,e.prototype.sparseInitializer=s.emptyArray,e.prototype.docString="",e.prototype.input=s.emptyArray,e.prototype.output=s.emptyArray,e.prototype.valueInfo=s.emptyArray,e.prototype.quantizationAnnotation=s.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.node&&e.node.length)for(var n=0;n<e.node.length;++n)a.onnx.NodeProto.encode(e.node[n],t.uint32(10).fork()).ldelim();if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(18).string(e.name),null!=e.initializer&&e.initializer.length)for(var n=0;n<e.initializer.length;++n)a.onnx.TensorProto.encode(e.initializer[n],t.uint32(42).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(82).string(e.docString),null!=e.input&&e.input.length)for(var n=0;n<e.input.length;++n)a.onnx.ValueInfoProto.encode(e.input[n],t.uint32(90).fork()).ldelim();if(null!=e.output&&e.output.length)for(var n=0;n<e.output.length;++n)a.onnx.ValueInfoProto.encode(e.output[n],t.uint32(98).fork()).ldelim();if(null!=e.valueInfo&&e.valueInfo.length)for(var n=0;n<e.valueInfo.length;++n)a.onnx.ValueInfoProto.encode(e.valueInfo[n],t.uint32(106).fork()).ldelim();if(null!=e.quantizationAnnotation&&e.quantizationAnnotation.length)for(var n=0;n<e.quantizationAnnotation.length;++n)a.onnx.TensorAnnotation.encode(e.quantizationAnnotation[n],t.uint32(114).fork()).ldelim();if(null!=e.sparseInitializer&&e.sparseInitializer.length)for(var n=0;n<e.sparseInitializer.length;++n)a.onnx.SparseTensorProto.encode(e.sparseInitializer[n],t.uint32(122).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.GraphProto;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.node&&o.node.length||(o.node=[]),o.node.push(a.onnx.NodeProto.decode(e,e.uint32()));break;case 2:o.name=e.string();break;case 5:o.initializer&&o.initializer.length||(o.initializer=[]),o.initializer.push(a.onnx.TensorProto.decode(e,e.uint32()));break;case 15:o.sparseInitializer&&o.sparseInitializer.length||(o.sparseInitializer=[]),o.sparseInitializer.push(a.onnx.SparseTensorProto.decode(e,e.uint32()));break;case 10:o.docString=e.string();break;case 11:o.input&&o.input.length||(o.input=[]),o.input.push(a.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 12:o.output&&o.output.length||(o.output=[]),o.output.push(a.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 13:o.valueInfo&&o.valueInfo.length||(o.valueInfo=[]),o.valueInfo.push(a.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 14:o.quantizationAnnotation&&o.quantizationAnnotation.length||(o.quantizationAnnotation=[]),o.quantizationAnnotation.push(a.onnx.TensorAnnotation.decode(e,e.uint32()));break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.node&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var t=0;t<e.node.length;++t){var n=a.onnx.NodeProto.verify(e.node[t]);if(n)return"node."+n}}if(null!=e.name&&e.hasOwnProperty("name")&&!s.isString(e.name))return"name: string expected";if(null!=e.initializer&&e.hasOwnProperty("initializer")){if(!Array.isArray(e.initializer))return"initializer: array expected";for(var t=0;t<e.initializer.length;++t){var n=a.onnx.TensorProto.verify(e.initializer[t]);if(n)return"initializer."+n}}if(null!=e.sparseInitializer&&e.hasOwnProperty("sparseInitializer")){if(!Array.isArray(e.sparseInitializer))return"sparseInitializer: array expected";for(var t=0;t<e.sparseInitializer.length;++t){var n=a.onnx.SparseTensorProto.verify(e.sparseInitializer[t]);if(n)return"sparseInitializer."+n}}if(null!=e.docString&&e.hasOwnProperty("docString")&&!s.isString(e.docString))return"docString: string expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t){var n=a.onnx.ValueInfoProto.verify(e.input[t]);if(n)return"input."+n}}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t){var n=a.onnx.ValueInfoProto.verify(e.output[t]);if(n)return"output."+n}}if(null!=e.valueInfo&&e.hasOwnProperty("valueInfo")){if(!Array.isArray(e.valueInfo))return"valueInfo: array expected";for(var t=0;t<e.valueInfo.length;++t){var n=a.onnx.ValueInfoProto.verify(e.valueInfo[t]);if(n)return"valueInfo."+n}}if(null!=e.quantizationAnnotation&&e.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(e.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var t=0;t<e.quantizationAnnotation.length;++t){var n=a.onnx.TensorAnnotation.verify(e.quantizationAnnotation[t]);if(n)return"quantizationAnnotation."+n}}return null},e.fromObject=function(e){if(e instanceof a.onnx.GraphProto)return e;var t=new a.onnx.GraphProto;if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.GraphProto.node: array expected");t.node=[];for(var n=0;n<e.node.length;++n){if("object"!=typeof e.node[n])throw TypeError(".onnx.GraphProto.node: object expected");t.node[n]=a.onnx.NodeProto.fromObject(e.node[n])}}if(null!=e.name&&(t.name=String(e.name)),e.initializer){if(!Array.isArray(e.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");t.initializer=[];for(var n=0;n<e.initializer.length;++n){if("object"!=typeof e.initializer[n])throw TypeError(".onnx.GraphProto.initializer: object expected");t.initializer[n]=a.onnx.TensorProto.fromObject(e.initializer[n])}}if(e.sparseInitializer){if(!Array.isArray(e.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");t.sparseInitializer=[];for(var n=0;n<e.sparseInitializer.length;++n){if("object"!=typeof e.sparseInitializer[n])throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");t.sparseInitializer[n]=a.onnx.SparseTensorProto.fromObject(e.sparseInitializer[n])}}if(null!=e.docString&&(t.docString=String(e.docString)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.GraphProto.input: array expected");t.input=[];for(var n=0;n<e.input.length;++n){if("object"!=typeof e.input[n])throw TypeError(".onnx.GraphProto.input: object expected");t.input[n]=a.onnx.ValueInfoProto.fromObject(e.input[n])}}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.GraphProto.output: array expected");t.output=[];for(var n=0;n<e.output.length;++n){if("object"!=typeof e.output[n])throw TypeError(".onnx.GraphProto.output: object expected");t.output[n]=a.onnx.ValueInfoProto.fromObject(e.output[n])}}if(e.valueInfo){if(!Array.isArray(e.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");t.valueInfo=[];for(var n=0;n<e.valueInfo.length;++n){if("object"!=typeof e.valueInfo[n])throw TypeError(".onnx.GraphProto.valueInfo: object expected");t.valueInfo[n]=a.onnx.ValueInfoProto.fromObject(e.valueInfo[n])}}if(e.quantizationAnnotation){if(!Array.isArray(e.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");t.quantizationAnnotation=[];for(var n=0;n<e.quantizationAnnotation.length;++n){if("object"!=typeof e.quantizationAnnotation[n])throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");t.quantizationAnnotation[n]=a.onnx.TensorAnnotation.fromObject(e.quantizationAnnotation[n])}}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.node=[],n.initializer=[],n.input=[],n.output=[],n.valueInfo=[],n.quantizationAnnotation=[],n.sparseInitializer=[]),t.defaults&&(n.name="",n.docString=""),e.node&&e.node.length){n.node=[];for(var i=0;i<e.node.length;++i)n.node[i]=a.onnx.NodeProto.toObject(e.node[i],t)}if(null!=e.name&&e.hasOwnProperty("name")&&(n.name=e.name),e.initializer&&e.initializer.length){n.initializer=[];for(var i=0;i<e.initializer.length;++i)n.initializer[i]=a.onnx.TensorProto.toObject(e.initializer[i],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.input&&e.input.length){n.input=[];for(var i=0;i<e.input.length;++i)n.input[i]=a.onnx.ValueInfoProto.toObject(e.input[i],t)}if(e.output&&e.output.length){n.output=[];for(var i=0;i<e.output.length;++i)n.output[i]=a.onnx.ValueInfoProto.toObject(e.output[i],t)}if(e.valueInfo&&e.valueInfo.length){n.valueInfo=[];for(var i=0;i<e.valueInfo.length;++i)n.valueInfo[i]=a.onnx.ValueInfoProto.toObject(e.valueInfo[i],t)}if(e.quantizationAnnotation&&e.quantizationAnnotation.length){n.quantizationAnnotation=[];for(var i=0;i<e.quantizationAnnotation.length;++i)n.quantizationAnnotation[i]=a.onnx.TensorAnnotation.toObject(e.quantizationAnnotation[i],t)}if(e.sparseInitializer&&e.sparseInitializer.length){n.sparseInitializer=[];for(var i=0;i<e.sparseInitializer.length;++i)n.sparseInitializer[i]=a.onnx.SparseTensorProto.toObject(e.sparseInitializer[i],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.GraphProto"},e}(),e.TensorProto=function(){function e(e){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.dims=s.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=s.emptyArray,e.prototype.int32Data=s.emptyArray,e.prototype.stringData=s.emptyArray,e.prototype.int64Data=s.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=s.newBuffer([]),e.prototype.externalData=s.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=s.emptyArray,e.prototype.uint64Data=s.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.dims&&e.dims.length){t.uint32(10).fork();for(var n=0;n<e.dims.length;++n)t.int64(e.dims[n]);t.ldelim()}if(null!=e.dataType&&Object.hasOwnProperty.call(e,"dataType")&&t.uint32(16).int32(e.dataType),null!=e.segment&&Object.hasOwnProperty.call(e,"segment")&&a.onnx.TensorProto.Segment.encode(e.segment,t.uint32(26).fork()).ldelim(),null!=e.floatData&&e.floatData.length){t.uint32(34).fork();for(var n=0;n<e.floatData.length;++n)t.float(e.floatData[n]);t.ldelim()}if(null!=e.int32Data&&e.int32Data.length){t.uint32(42).fork();for(var n=0;n<e.int32Data.length;++n)t.int32(e.int32Data[n]);t.ldelim()}if(null!=e.stringData&&e.stringData.length)for(var n=0;n<e.stringData.length;++n)t.uint32(50).bytes(e.stringData[n]);if(null!=e.int64Data&&e.int64Data.length){t.uint32(58).fork();for(var n=0;n<e.int64Data.length;++n)t.int64(e.int64Data[n]);t.ldelim()}if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(66).string(e.name),null!=e.rawData&&Object.hasOwnProperty.call(e,"rawData")&&t.uint32(74).bytes(e.rawData),null!=e.doubleData&&e.doubleData.length){t.uint32(82).fork();for(var n=0;n<e.doubleData.length;++n)t.double(e.doubleData[n]);t.ldelim()}if(null!=e.uint64Data&&e.uint64Data.length){t.uint32(90).fork();for(var n=0;n<e.uint64Data.length;++n)t.uint64(e.uint64Data[n]);t.ldelim()}if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(98).string(e.docString),null!=e.externalData&&e.externalData.length)for(var n=0;n<e.externalData.length;++n)a.onnx.StringStringEntryProto.encode(e.externalData[n],t.uint32(106).fork()).ldelim();return null!=e.dataLocation&&Object.hasOwnProperty.call(e,"dataLocation")&&t.uint32(112).int32(e.dataLocation),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.TensorProto;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:if(o.dims&&o.dims.length||(o.dims=[]),(7&s)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.dims.push(e.int64());else o.dims.push(e.int64());break;case 2:o.dataType=e.int32();break;case 3:o.segment=a.onnx.TensorProto.Segment.decode(e,e.uint32());break;case 4:if(o.floatData&&o.floatData.length||(o.floatData=[]),(7&s)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.floatData.push(e.float());else o.floatData.push(e.float());break;case 5:if(o.int32Data&&o.int32Data.length||(o.int32Data=[]),(7&s)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.int32Data.push(e.int32());else o.int32Data.push(e.int32());break;case 6:o.stringData&&o.stringData.length||(o.stringData=[]),o.stringData.push(e.bytes());break;case 7:if(o.int64Data&&o.int64Data.length||(o.int64Data=[]),(7&s)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.int64Data.push(e.int64());else o.int64Data.push(e.int64());break;case 8:o.name=e.string();break;case 12:o.docString=e.string();break;case 9:o.rawData=e.bytes();break;case 13:o.externalData&&o.externalData.length||(o.externalData=[]),o.externalData.push(a.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 14:o.dataLocation=e.int32();break;case 10:if(o.doubleData&&o.doubleData.length||(o.doubleData=[]),(7&s)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.doubleData.push(e.double());else o.doubleData.push(e.double());break;case 11:if(o.uint64Data&&o.uint64Data.length||(o.uint64Data=[]),(7&s)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.uint64Data.push(e.uint64());else o.uint64Data.push(e.uint64());break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.dims&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var t=0;t<e.dims.length;++t)if(!s.isInteger(e.dims[t])&&!(e.dims[t]&&s.isInteger(e.dims[t].low)&&s.isInteger(e.dims[t].high)))return"dims: integer|Long[] expected"}if(null!=e.dataType&&e.hasOwnProperty("dataType")&&!s.isInteger(e.dataType))return"dataType: integer expected";if(null!=e.segment&&e.hasOwnProperty("segment")){var n=a.onnx.TensorProto.Segment.verify(e.segment);if(n)return"segment."+n}if(null!=e.floatData&&e.hasOwnProperty("floatData")){if(!Array.isArray(e.floatData))return"floatData: array expected";for(var t=0;t<e.floatData.length;++t)if("number"!=typeof e.floatData[t])return"floatData: number[] expected"}if(null!=e.int32Data&&e.hasOwnProperty("int32Data")){if(!Array.isArray(e.int32Data))return"int32Data: array expected";for(var t=0;t<e.int32Data.length;++t)if(!s.isInteger(e.int32Data[t]))return"int32Data: integer[] expected"}if(null!=e.stringData&&e.hasOwnProperty("stringData")){if(!Array.isArray(e.stringData))return"stringData: array expected";for(var t=0;t<e.stringData.length;++t)if(!(e.stringData[t]&&"number"==typeof e.stringData[t].length||s.isString(e.stringData[t])))return"stringData: buffer[] expected"}if(null!=e.int64Data&&e.hasOwnProperty("int64Data")){if(!Array.isArray(e.int64Data))return"int64Data: array expected";for(var t=0;t<e.int64Data.length;++t)if(!s.isInteger(e.int64Data[t])&&!(e.int64Data[t]&&s.isInteger(e.int64Data[t].low)&&s.isInteger(e.int64Data[t].high)))return"int64Data: integer|Long[] expected"}if(null!=e.name&&e.hasOwnProperty("name")&&!s.isString(e.name))return"name: string expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!s.isString(e.docString))return"docString: string expected";if(null!=e.rawData&&e.hasOwnProperty("rawData")&&!(e.rawData&&"number"==typeof e.rawData.length||s.isString(e.rawData)))return"rawData: buffer expected";if(null!=e.externalData&&e.hasOwnProperty("externalData")){if(!Array.isArray(e.externalData))return"externalData: array expected";for(var t=0;t<e.externalData.length;++t){var n=a.onnx.StringStringEntryProto.verify(e.externalData[t]);if(n)return"externalData."+n}}if(null!=e.dataLocation&&e.hasOwnProperty("dataLocation"))switch(e.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:}if(null!=e.doubleData&&e.hasOwnProperty("doubleData")){if(!Array.isArray(e.doubleData))return"doubleData: array expected";for(var t=0;t<e.doubleData.length;++t)if("number"!=typeof e.doubleData[t])return"doubleData: number[] expected"}if(null!=e.uint64Data&&e.hasOwnProperty("uint64Data")){if(!Array.isArray(e.uint64Data))return"uint64Data: array expected";for(var t=0;t<e.uint64Data.length;++t)if(!s.isInteger(e.uint64Data[t])&&!(e.uint64Data[t]&&s.isInteger(e.uint64Data[t].low)&&s.isInteger(e.uint64Data[t].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(e){if(e instanceof a.onnx.TensorProto)return e;var t=new a.onnx.TensorProto;if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.TensorProto.dims: array expected");t.dims=[];for(var n=0;n<e.dims.length;++n)s.Long?(t.dims[n]=s.Long.fromValue(e.dims[n])).unsigned=!1:"string"==typeof e.dims[n]?t.dims[n]=parseInt(e.dims[n],10):"number"==typeof e.dims[n]?t.dims[n]=e.dims[n]:"object"==typeof e.dims[n]&&(t.dims[n]=new s.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber())}if(null!=e.dataType&&(t.dataType=0|e.dataType),null!=e.segment){if("object"!=typeof e.segment)throw TypeError(".onnx.TensorProto.segment: object expected");t.segment=a.onnx.TensorProto.Segment.fromObject(e.segment)}if(e.floatData){if(!Array.isArray(e.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");t.floatData=[];for(var n=0;n<e.floatData.length;++n)t.floatData[n]=Number(e.floatData[n])}if(e.int32Data){if(!Array.isArray(e.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");t.int32Data=[];for(var n=0;n<e.int32Data.length;++n)t.int32Data[n]=0|e.int32Data[n]}if(e.stringData){if(!Array.isArray(e.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");t.stringData=[];for(var n=0;n<e.stringData.length;++n)"string"==typeof e.stringData[n]?s.base64.decode(e.stringData[n],t.stringData[n]=s.newBuffer(s.base64.length(e.stringData[n])),0):e.stringData[n].length>=0&&(t.stringData[n]=e.stringData[n])}if(e.int64Data){if(!Array.isArray(e.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");t.int64Data=[];for(var n=0;n<e.int64Data.length;++n)s.Long?(t.int64Data[n]=s.Long.fromValue(e.int64Data[n])).unsigned=!1:"string"==typeof e.int64Data[n]?t.int64Data[n]=parseInt(e.int64Data[n],10):"number"==typeof e.int64Data[n]?t.int64Data[n]=e.int64Data[n]:"object"==typeof e.int64Data[n]&&(t.int64Data[n]=new s.LongBits(e.int64Data[n].low>>>0,e.int64Data[n].high>>>0).toNumber())}if(null!=e.name&&(t.name=String(e.name)),null!=e.docString&&(t.docString=String(e.docString)),null!=e.rawData&&("string"==typeof e.rawData?s.base64.decode(e.rawData,t.rawData=s.newBuffer(s.base64.length(e.rawData)),0):e.rawData.length>=0&&(t.rawData=e.rawData)),e.externalData){if(!Array.isArray(e.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");t.externalData=[];for(var n=0;n<e.externalData.length;++n){if("object"!=typeof e.externalData[n])throw TypeError(".onnx.TensorProto.externalData: object expected");t.externalData[n]=a.onnx.StringStringEntryProto.fromObject(e.externalData[n])}}switch(e.dataLocation){default:"number"==typeof e.dataLocation&&(t.dataLocation=e.dataLocation);break;case"DEFAULT":case 0:t.dataLocation=0;break;case"EXTERNAL":case 1:t.dataLocation=1}if(e.doubleData){if(!Array.isArray(e.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");t.doubleData=[];for(var n=0;n<e.doubleData.length;++n)t.doubleData[n]=Number(e.doubleData[n])}if(e.uint64Data){if(!Array.isArray(e.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");t.uint64Data=[];for(var n=0;n<e.uint64Data.length;++n)s.Long?(t.uint64Data[n]=s.Long.fromValue(e.uint64Data[n])).unsigned=!0:"string"==typeof e.uint64Data[n]?t.uint64Data[n]=parseInt(e.uint64Data[n],10):"number"==typeof e.uint64Data[n]?t.uint64Data[n]=e.uint64Data[n]:"object"==typeof e.uint64Data[n]&&(t.uint64Data[n]=new s.LongBits(e.uint64Data[n].low>>>0,e.uint64Data[n].high>>>0).toNumber(!0))}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.dims=[],n.floatData=[],n.int32Data=[],n.stringData=[],n.int64Data=[],n.doubleData=[],n.uint64Data=[],n.externalData=[]),t.defaults&&(n.dataType=0,n.segment=null,n.name="",t.bytes===String?n.rawData="":(n.rawData=[],t.bytes!==Array&&(n.rawData=s.newBuffer(n.rawData))),n.docString="",n.dataLocation=t.enums===String?"DEFAULT":0),e.dims&&e.dims.length){n.dims=[];for(var i=0;i<e.dims.length;++i)"number"==typeof e.dims[i]?n.dims[i]=t.longs===String?String(e.dims[i]):e.dims[i]:n.dims[i]=t.longs===String?s.Long.prototype.toString.call(e.dims[i]):t.longs===Number?new s.LongBits(e.dims[i].low>>>0,e.dims[i].high>>>0).toNumber():e.dims[i]}if(null!=e.dataType&&e.hasOwnProperty("dataType")&&(n.dataType=e.dataType),null!=e.segment&&e.hasOwnProperty("segment")&&(n.segment=a.onnx.TensorProto.Segment.toObject(e.segment,t)),e.floatData&&e.floatData.length){n.floatData=[];for(var i=0;i<e.floatData.length;++i)n.floatData[i]=t.json&&!isFinite(e.floatData[i])?String(e.floatData[i]):e.floatData[i]}if(e.int32Data&&e.int32Data.length){n.int32Data=[];for(var i=0;i<e.int32Data.length;++i)n.int32Data[i]=e.int32Data[i]}if(e.stringData&&e.stringData.length){n.stringData=[];for(var i=0;i<e.stringData.length;++i)n.stringData[i]=t.bytes===String?s.base64.encode(e.stringData[i],0,e.stringData[i].length):t.bytes===Array?Array.prototype.slice.call(e.stringData[i]):e.stringData[i]}if(e.int64Data&&e.int64Data.length){n.int64Data=[];for(var i=0;i<e.int64Data.length;++i)"number"==typeof e.int64Data[i]?n.int64Data[i]=t.longs===String?String(e.int64Data[i]):e.int64Data[i]:n.int64Data[i]=t.longs===String?s.Long.prototype.toString.call(e.int64Data[i]):t.longs===Number?new s.LongBits(e.int64Data[i].low>>>0,e.int64Data[i].high>>>0).toNumber():e.int64Data[i]}if(null!=e.name&&e.hasOwnProperty("name")&&(n.name=e.name),null!=e.rawData&&e.hasOwnProperty("rawData")&&(n.rawData=t.bytes===String?s.base64.encode(e.rawData,0,e.rawData.length):t.bytes===Array?Array.prototype.slice.call(e.rawData):e.rawData),e.doubleData&&e.doubleData.length){n.doubleData=[];for(var i=0;i<e.doubleData.length;++i)n.doubleData[i]=t.json&&!isFinite(e.doubleData[i])?String(e.doubleData[i]):e.doubleData[i]}if(e.uint64Data&&e.uint64Data.length){n.uint64Data=[];for(var i=0;i<e.uint64Data.length;++i)"number"==typeof e.uint64Data[i]?n.uint64Data[i]=t.longs===String?String(e.uint64Data[i]):e.uint64Data[i]:n.uint64Data[i]=t.longs===String?s.Long.prototype.toString.call(e.uint64Data[i]):t.longs===Number?new s.LongBits(e.uint64Data[i].low>>>0,e.uint64Data[i].high>>>0).toNumber(!0):e.uint64Data[i]}if(null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.externalData&&e.externalData.length){n.externalData=[];for(var i=0;i<e.externalData.length;++i)n.externalData[i]=a.onnx.StringStringEntryProto.toObject(e.externalData[i],t)}return null!=e.dataLocation&&e.hasOwnProperty("dataLocation")&&(n.dataLocation=t.enums===String?void 0===a.onnx.TensorProto.DataLocation[e.dataLocation]?e.dataLocation:a.onnx.TensorProto.DataLocation[e.dataLocation]:e.dataLocation),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorProto"},e.DataType=function(){var e={},t=Object.create(e);return t[e[0]="UNDEFINED"]=0,t[e[1]="FLOAT"]=1,t[e[2]="UINT8"]=2,t[e[3]="INT8"]=3,t[e[4]="UINT16"]=4,t[e[5]="INT16"]=5,t[e[6]="INT32"]=6,t[e[7]="INT64"]=7,t[e[8]="STRING"]=8,t[e[9]="BOOL"]=9,t[e[10]="FLOAT16"]=10,t[e[11]="DOUBLE"]=11,t[e[12]="UINT32"]=12,t[e[13]="UINT64"]=13,t[e[14]="COMPLEX64"]=14,t[e[15]="COMPLEX128"]=15,t[e[16]="BFLOAT16"]=16,t[e[17]="FLOAT8E4M3FN"]=17,t[e[18]="FLOAT8E4M3FNUZ"]=18,t[e[19]="FLOAT8E5M2"]=19,t[e[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.begin=s.Long?s.Long.fromBits(0,0,!1):0,e.prototype.end=s.Long?s.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.begin&&Object.hasOwnProperty.call(e,"begin")&&t.uint32(8).int64(e.begin),null!=e.end&&Object.hasOwnProperty.call(e,"end")&&t.uint32(16).int64(e.end),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.TensorProto.Segment;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.begin=e.int64();break;case 2:o.end=e.int64();break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.begin&&e.hasOwnProperty("begin")&&!s.isInteger(e.begin)&&!(e.begin&&s.isInteger(e.begin.low)&&s.isInteger(e.begin.high))?"begin: integer|Long expected":null!=e.end&&e.hasOwnProperty("end")&&!s.isInteger(e.end)&&!(e.end&&s.isInteger(e.end.low)&&s.isInteger(e.end.high))?"end: integer|Long expected":null},e.fromObject=function(e){if(e instanceof a.onnx.TensorProto.Segment)return e;var t=new a.onnx.TensorProto.Segment;return null!=e.begin&&(s.Long?(t.begin=s.Long.fromValue(e.begin)).unsigned=!1:"string"==typeof e.begin?t.begin=parseInt(e.begin,10):"number"==typeof e.begin?t.begin=e.begin:"object"==typeof e.begin&&(t.begin=new s.LongBits(e.begin.low>>>0,e.begin.high>>>0).toNumber())),null!=e.end&&(s.Long?(t.end=s.Long.fromValue(e.end)).unsigned=!1:"string"==typeof e.end?t.end=parseInt(e.end,10):"number"==typeof e.end?t.end=e.end:"object"==typeof e.end&&(t.end=new s.LongBits(e.end.low>>>0,e.end.high>>>0).toNumber())),t},e.toObject=function(e,t){t||(t={});var n={};if(t.defaults){if(s.Long){var i=new s.Long(0,0,!1);n.begin=t.longs===String?i.toString():t.longs===Number?i.toNumber():i}else n.begin=t.longs===String?"0":0;if(s.Long){var i=new s.Long(0,0,!1);n.end=t.longs===String?i.toString():t.longs===Number?i.toNumber():i}else n.end=t.longs===String?"0":0}return null!=e.begin&&e.hasOwnProperty("begin")&&("number"==typeof e.begin?n.begin=t.longs===String?String(e.begin):e.begin:n.begin=t.longs===String?s.Long.prototype.toString.call(e.begin):t.longs===Number?new s.LongBits(e.begin.low>>>0,e.begin.high>>>0).toNumber():e.begin),null!=e.end&&e.hasOwnProperty("end")&&("number"==typeof e.end?n.end=t.longs===String?String(e.end):e.end:n.end=t.longs===String?s.Long.prototype.toString.call(e.end):t.longs===Number?new s.LongBits(e.end.low>>>0,e.end.high>>>0).toNumber():e.end),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorProto.Segment"},e}(),e.DataLocation=function(){var e={},t=Object.create(e);return t[e[0]="DEFAULT"]=0,t[e[1]="EXTERNAL"]=1,t}(),e}(),e.SparseTensorProto=function(){function e(e){if(this.dims=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=s.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.values&&Object.hasOwnProperty.call(e,"values")&&a.onnx.TensorProto.encode(e.values,t.uint32(10).fork()).ldelim(),null!=e.indices&&Object.hasOwnProperty.call(e,"indices")&&a.onnx.TensorProto.encode(e.indices,t.uint32(18).fork()).ldelim(),null!=e.dims&&e.dims.length){t.uint32(26).fork();for(var n=0;n<e.dims.length;++n)t.int64(e.dims[n]);t.ldelim()}return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.SparseTensorProto;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.values=a.onnx.TensorProto.decode(e,e.uint32());break;case 2:o.indices=a.onnx.TensorProto.decode(e,e.uint32());break;case 3:if(o.dims&&o.dims.length||(o.dims=[]),(7&s)==2)for(var u=e.uint32()+e.pos;e.pos<u;)o.dims.push(e.int64());else o.dims.push(e.int64());break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.values&&e.hasOwnProperty("values")){var t=a.onnx.TensorProto.verify(e.values);if(t)return"values."+t}if(null!=e.indices&&e.hasOwnProperty("indices")){var t=a.onnx.TensorProto.verify(e.indices);if(t)return"indices."+t}if(null!=e.dims&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var n=0;n<e.dims.length;++n)if(!s.isInteger(e.dims[n])&&!(e.dims[n]&&s.isInteger(e.dims[n].low)&&s.isInteger(e.dims[n].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(e){if(e instanceof a.onnx.SparseTensorProto)return e;var t=new a.onnx.SparseTensorProto;if(null!=e.values){if("object"!=typeof e.values)throw TypeError(".onnx.SparseTensorProto.values: object expected");t.values=a.onnx.TensorProto.fromObject(e.values)}if(null!=e.indices){if("object"!=typeof e.indices)throw TypeError(".onnx.SparseTensorProto.indices: object expected");t.indices=a.onnx.TensorProto.fromObject(e.indices)}if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");t.dims=[];for(var n=0;n<e.dims.length;++n)s.Long?(t.dims[n]=s.Long.fromValue(e.dims[n])).unsigned=!1:"string"==typeof e.dims[n]?t.dims[n]=parseInt(e.dims[n],10):"number"==typeof e.dims[n]?t.dims[n]=e.dims[n]:"object"==typeof e.dims[n]&&(t.dims[n]=new s.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber())}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.dims=[]),t.defaults&&(n.values=null,n.indices=null),null!=e.values&&e.hasOwnProperty("values")&&(n.values=a.onnx.TensorProto.toObject(e.values,t)),null!=e.indices&&e.hasOwnProperty("indices")&&(n.indices=a.onnx.TensorProto.toObject(e.indices,t)),e.dims&&e.dims.length){n.dims=[];for(var i=0;i<e.dims.length;++i)"number"==typeof e.dims[i]?n.dims[i]=t.longs===String?String(e.dims[i]):e.dims[i]:n.dims[i]=t.longs===String?s.Long.prototype.toString.call(e.dims[i]):t.longs===Number?new s.LongBits(e.dims[i].low>>>0,e.dims[i].high>>>0).toNumber():e.dims[i]}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.SparseTensorProto"},e}(),e.TensorShapeProto=function(){function e(e){if(this.dim=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.dim=s.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.dim&&e.dim.length)for(var n=0;n<e.dim.length;++n)a.onnx.TensorShapeProto.Dimension.encode(e.dim[n],t.uint32(10).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.TensorShapeProto;e.pos<n;){var s=e.uint32();s>>>3==1?(o.dim&&o.dim.length||(o.dim=[]),o.dim.push(a.onnx.TensorShapeProto.Dimension.decode(e,e.uint32()))):e.skipType(7&s)}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.dim&&e.hasOwnProperty("dim")){if(!Array.isArray(e.dim))return"dim: array expected";for(var t=0;t<e.dim.length;++t){var n=a.onnx.TensorShapeProto.Dimension.verify(e.dim[t]);if(n)return"dim."+n}}return null},e.fromObject=function(e){if(e instanceof a.onnx.TensorShapeProto)return e;var t=new a.onnx.TensorShapeProto;if(e.dim){if(!Array.isArray(e.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");t.dim=[];for(var n=0;n<e.dim.length;++n){if("object"!=typeof e.dim[n])throw TypeError(".onnx.TensorShapeProto.dim: object expected");t.dim[n]=a.onnx.TensorShapeProto.Dimension.fromObject(e.dim[n])}}return t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.dim=[]),e.dim&&e.dim.length){n.dim=[];for(var i=0;i<e.dim.length;++i)n.dim[i]=a.onnx.TensorShapeProto.Dimension.toObject(e.dim[i],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorShapeProto"},e.Dimension=function(){var e;function t(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return t.prototype.dimValue=null,t.prototype.dimParam=null,t.prototype.denotation="",Object.defineProperty(t.prototype,"value",{get:s.oneOfGetter(e=["dimValue","dimParam"]),set:s.oneOfSetter(e)}),t.create=function(e){return new t(e)},t.encode=function(e,t){return t||(t=o.create()),null!=e.dimValue&&Object.hasOwnProperty.call(e,"dimValue")&&t.uint32(8).int64(e.dimValue),null!=e.dimParam&&Object.hasOwnProperty.call(e,"dimParam")&&t.uint32(18).string(e.dimParam),null!=e.denotation&&Object.hasOwnProperty.call(e,"denotation")&&t.uint32(26).string(e.denotation),t},t.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},t.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.TensorShapeProto.Dimension;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.dimValue=e.int64();break;case 2:o.dimParam=e.string();break;case 3:o.denotation=e.string();break;default:e.skipType(7&s)}}return o},t.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},t.verify=function(e){if("object"!=typeof e||null===e)return"object expected";var t={};if(null!=e.dimValue&&e.hasOwnProperty("dimValue")&&(t.value=1,!s.isInteger(e.dimValue)&&!(e.dimValue&&s.isInteger(e.dimValue.low)&&s.isInteger(e.dimValue.high))))return"dimValue: integer|Long expected";if(null!=e.dimParam&&e.hasOwnProperty("dimParam")){if(1===t.value)return"value: multiple values";if(t.value=1,!s.isString(e.dimParam))return"dimParam: string expected"}return null!=e.denotation&&e.hasOwnProperty("denotation")&&!s.isString(e.denotation)?"denotation: string expected":null},t.fromObject=function(e){if(e instanceof a.onnx.TensorShapeProto.Dimension)return e;var t=new a.onnx.TensorShapeProto.Dimension;return null!=e.dimValue&&(s.Long?(t.dimValue=s.Long.fromValue(e.dimValue)).unsigned=!1:"string"==typeof e.dimValue?t.dimValue=parseInt(e.dimValue,10):"number"==typeof e.dimValue?t.dimValue=e.dimValue:"object"==typeof e.dimValue&&(t.dimValue=new s.LongBits(e.dimValue.low>>>0,e.dimValue.high>>>0).toNumber())),null!=e.dimParam&&(t.dimParam=String(e.dimParam)),null!=e.denotation&&(t.denotation=String(e.denotation)),t},t.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.denotation=""),null!=e.dimValue&&e.hasOwnProperty("dimValue")&&("number"==typeof e.dimValue?n.dimValue=t.longs===String?String(e.dimValue):e.dimValue:n.dimValue=t.longs===String?s.Long.prototype.toString.call(e.dimValue):t.longs===Number?new s.LongBits(e.dimValue.low>>>0,e.dimValue.high>>>0).toNumber():e.dimValue,t.oneofs&&(n.value="dimValue")),null!=e.dimParam&&e.hasOwnProperty("dimParam")&&(n.dimParam=e.dimParam,t.oneofs&&(n.value="dimParam")),null!=e.denotation&&e.hasOwnProperty("denotation")&&(n.denotation=e.denotation),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},t.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorShapeProto.Dimension"},t}(),e}(),e.TypeProto=function(){var e;function t(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return t.prototype.tensorType=null,t.prototype.sequenceType=null,t.prototype.mapType=null,t.prototype.optionalType=null,t.prototype.sparseTensorType=null,t.prototype.denotation="",Object.defineProperty(t.prototype,"value",{get:s.oneOfGetter(e=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:s.oneOfSetter(e)}),t.create=function(e){return new t(e)},t.encode=function(e,t){return t||(t=o.create()),null!=e.tensorType&&Object.hasOwnProperty.call(e,"tensorType")&&a.onnx.TypeProto.Tensor.encode(e.tensorType,t.uint32(10).fork()).ldelim(),null!=e.sequenceType&&Object.hasOwnProperty.call(e,"sequenceType")&&a.onnx.TypeProto.Sequence.encode(e.sequenceType,t.uint32(34).fork()).ldelim(),null!=e.mapType&&Object.hasOwnProperty.call(e,"mapType")&&a.onnx.TypeProto.Map.encode(e.mapType,t.uint32(42).fork()).ldelim(),null!=e.denotation&&Object.hasOwnProperty.call(e,"denotation")&&t.uint32(50).string(e.denotation),null!=e.sparseTensorType&&Object.hasOwnProperty.call(e,"sparseTensorType")&&a.onnx.TypeProto.SparseTensor.encode(e.sparseTensorType,t.uint32(66).fork()).ldelim(),null!=e.optionalType&&Object.hasOwnProperty.call(e,"optionalType")&&a.onnx.TypeProto.Optional.encode(e.optionalType,t.uint32(74).fork()).ldelim(),t},t.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},t.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.TypeProto;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.tensorType=a.onnx.TypeProto.Tensor.decode(e,e.uint32());break;case 4:o.sequenceType=a.onnx.TypeProto.Sequence.decode(e,e.uint32());break;case 5:o.mapType=a.onnx.TypeProto.Map.decode(e,e.uint32());break;case 9:o.optionalType=a.onnx.TypeProto.Optional.decode(e,e.uint32());break;case 8:o.sparseTensorType=a.onnx.TypeProto.SparseTensor.decode(e,e.uint32());break;case 6:o.denotation=e.string();break;default:e.skipType(7&s)}}return o},t.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},t.verify=function(e){if("object"!=typeof e||null===e)return"object expected";var t={};if(null!=e.tensorType&&e.hasOwnProperty("tensorType")){t.value=1;var n=a.onnx.TypeProto.Tensor.verify(e.tensorType);if(n)return"tensorType."+n}if(null!=e.sequenceType&&e.hasOwnProperty("sequenceType")){if(1===t.value)return"value: multiple values";t.value=1;var n=a.onnx.TypeProto.Sequence.verify(e.sequenceType);if(n)return"sequenceType."+n}if(null!=e.mapType&&e.hasOwnProperty("mapType")){if(1===t.value)return"value: multiple values";t.value=1;var n=a.onnx.TypeProto.Map.verify(e.mapType);if(n)return"mapType."+n}if(null!=e.optionalType&&e.hasOwnProperty("optionalType")){if(1===t.value)return"value: multiple values";t.value=1;var n=a.onnx.TypeProto.Optional.verify(e.optionalType);if(n)return"optionalType."+n}if(null!=e.sparseTensorType&&e.hasOwnProperty("sparseTensorType")){if(1===t.value)return"value: multiple values";t.value=1;var n=a.onnx.TypeProto.SparseTensor.verify(e.sparseTensorType);if(n)return"sparseTensorType."+n}return null!=e.denotation&&e.hasOwnProperty("denotation")&&!s.isString(e.denotation)?"denotation: string expected":null},t.fromObject=function(e){if(e instanceof a.onnx.TypeProto)return e;var t=new a.onnx.TypeProto;if(null!=e.tensorType){if("object"!=typeof e.tensorType)throw TypeError(".onnx.TypeProto.tensorType: object expected");t.tensorType=a.onnx.TypeProto.Tensor.fromObject(e.tensorType)}if(null!=e.sequenceType){if("object"!=typeof e.sequenceType)throw TypeError(".onnx.TypeProto.sequenceType: object expected");t.sequenceType=a.onnx.TypeProto.Sequence.fromObject(e.sequenceType)}if(null!=e.mapType){if("object"!=typeof e.mapType)throw TypeError(".onnx.TypeProto.mapType: object expected");t.mapType=a.onnx.TypeProto.Map.fromObject(e.mapType)}if(null!=e.optionalType){if("object"!=typeof e.optionalType)throw TypeError(".onnx.TypeProto.optionalType: object expected");t.optionalType=a.onnx.TypeProto.Optional.fromObject(e.optionalType)}if(null!=e.sparseTensorType){if("object"!=typeof e.sparseTensorType)throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");t.sparseTensorType=a.onnx.TypeProto.SparseTensor.fromObject(e.sparseTensorType)}return null!=e.denotation&&(t.denotation=String(e.denotation)),t},t.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.denotation=""),null!=e.tensorType&&e.hasOwnProperty("tensorType")&&(n.tensorType=a.onnx.TypeProto.Tensor.toObject(e.tensorType,t),t.oneofs&&(n.value="tensorType")),null!=e.sequenceType&&e.hasOwnProperty("sequenceType")&&(n.sequenceType=a.onnx.TypeProto.Sequence.toObject(e.sequenceType,t),t.oneofs&&(n.value="sequenceType")),null!=e.mapType&&e.hasOwnProperty("mapType")&&(n.mapType=a.onnx.TypeProto.Map.toObject(e.mapType,t),t.oneofs&&(n.value="mapType")),null!=e.denotation&&e.hasOwnProperty("denotation")&&(n.denotation=e.denotation),null!=e.sparseTensorType&&e.hasOwnProperty("sparseTensorType")&&(n.sparseTensorType=a.onnx.TypeProto.SparseTensor.toObject(e.sparseTensorType,t),t.oneofs&&(n.value="sparseTensorType")),null!=e.optionalType&&e.hasOwnProperty("optionalType")&&(n.optionalType=a.onnx.TypeProto.Optional.toObject(e.optionalType,t),t.oneofs&&(n.value="optionalType")),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},t.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto"},t.Tensor=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&t.uint32(8).int32(e.elemType),null!=e.shape&&Object.hasOwnProperty.call(e,"shape")&&a.onnx.TensorShapeProto.encode(e.shape,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.TypeProto.Tensor;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.elemType=e.int32();break;case 2:o.shape=a.onnx.TensorShapeProto.decode(e,e.uint32());break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")&&!s.isInteger(e.elemType))return"elemType: integer expected";if(null!=e.shape&&e.hasOwnProperty("shape")){var t=a.onnx.TensorShapeProto.verify(e.shape);if(t)return"shape."+t}return null},e.fromObject=function(e){if(e instanceof a.onnx.TypeProto.Tensor)return e;var t=new a.onnx.TypeProto.Tensor;if(null!=e.elemType&&(t.elemType=0|e.elemType),null!=e.shape){if("object"!=typeof e.shape)throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");t.shape=a.onnx.TensorShapeProto.fromObject(e.shape)}return t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.elemType=0,n.shape=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(n.elemType=e.elemType),null!=e.shape&&e.hasOwnProperty("shape")&&(n.shape=a.onnx.TensorShapeProto.toObject(e.shape,t)),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Tensor"},e}(),t.Sequence=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.elemType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&a.onnx.TypeProto.encode(e.elemType,t.uint32(10).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.TypeProto.Sequence;e.pos<n;){var s=e.uint32();s>>>3==1?o.elemType=a.onnx.TypeProto.decode(e,e.uint32()):e.skipType(7&s)}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")){var t=a.onnx.TypeProto.verify(e.elemType);if(t)return"elemType."+t}return null},e.fromObject=function(e){if(e instanceof a.onnx.TypeProto.Sequence)return e;var t=new a.onnx.TypeProto.Sequence;if(null!=e.elemType){if("object"!=typeof e.elemType)throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");t.elemType=a.onnx.TypeProto.fromObject(e.elemType)}return t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.elemType=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(n.elemType=a.onnx.TypeProto.toObject(e.elemType,t)),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Sequence"},e}(),t.Map=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.keyType=0,e.prototype.valueType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.keyType&&Object.hasOwnProperty.call(e,"keyType")&&t.uint32(8).int32(e.keyType),null!=e.valueType&&Object.hasOwnProperty.call(e,"valueType")&&a.onnx.TypeProto.encode(e.valueType,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.TypeProto.Map;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.keyType=e.int32();break;case 2:o.valueType=a.onnx.TypeProto.decode(e,e.uint32());break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.keyType&&e.hasOwnProperty("keyType")&&!s.isInteger(e.keyType))return"keyType: integer expected";if(null!=e.valueType&&e.hasOwnProperty("valueType")){var t=a.onnx.TypeProto.verify(e.valueType);if(t)return"valueType."+t}return null},e.fromObject=function(e){if(e instanceof a.onnx.TypeProto.Map)return e;var t=new a.onnx.TypeProto.Map;if(null!=e.keyType&&(t.keyType=0|e.keyType),null!=e.valueType){if("object"!=typeof e.valueType)throw TypeError(".onnx.TypeProto.Map.valueType: object expected");t.valueType=a.onnx.TypeProto.fromObject(e.valueType)}return t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.keyType=0,n.valueType=null),null!=e.keyType&&e.hasOwnProperty("keyType")&&(n.keyType=e.keyType),null!=e.valueType&&e.hasOwnProperty("valueType")&&(n.valueType=a.onnx.TypeProto.toObject(e.valueType,t)),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Map"},e}(),t.Optional=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.elemType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&a.onnx.TypeProto.encode(e.elemType,t.uint32(10).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.TypeProto.Optional;e.pos<n;){var s=e.uint32();s>>>3==1?o.elemType=a.onnx.TypeProto.decode(e,e.uint32()):e.skipType(7&s)}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")){var t=a.onnx.TypeProto.verify(e.elemType);if(t)return"elemType."+t}return null},e.fromObject=function(e){if(e instanceof a.onnx.TypeProto.Optional)return e;var t=new a.onnx.TypeProto.Optional;if(null!=e.elemType){if("object"!=typeof e.elemType)throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");t.elemType=a.onnx.TypeProto.fromObject(e.elemType)}return t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.elemType=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(n.elemType=a.onnx.TypeProto.toObject(e.elemType,t)),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Optional"},e}(),t.SparseTensor=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&t.uint32(8).int32(e.elemType),null!=e.shape&&Object.hasOwnProperty.call(e,"shape")&&a.onnx.TensorShapeProto.encode(e.shape,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.TypeProto.SparseTensor;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.elemType=e.int32();break;case 2:o.shape=a.onnx.TensorShapeProto.decode(e,e.uint32());break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")&&!s.isInteger(e.elemType))return"elemType: integer expected";if(null!=e.shape&&e.hasOwnProperty("shape")){var t=a.onnx.TensorShapeProto.verify(e.shape);if(t)return"shape."+t}return null},e.fromObject=function(e){if(e instanceof a.onnx.TypeProto.SparseTensor)return e;var t=new a.onnx.TypeProto.SparseTensor;if(null!=e.elemType&&(t.elemType=0|e.elemType),null!=e.shape){if("object"!=typeof e.shape)throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");t.shape=a.onnx.TensorShapeProto.fromObject(e.shape)}return t},e.toObject=function(e,t){t||(t={});var n={};return t.defaults&&(n.elemType=0,n.shape=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(n.elemType=e.elemType),null!=e.shape&&e.hasOwnProperty("shape")&&(n.shape=a.onnx.TensorShapeProto.toObject(e.shape,t)),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.SparseTensor"},e}(),t}(),e.OperatorSetIdProto=function(){function e(e){if(e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.domain="",e.prototype.version=s.Long?s.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=o.create()),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(10).string(e.domain),null!=e.version&&Object.hasOwnProperty.call(e,"version")&&t.uint32(16).int64(e.version),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.OperatorSetIdProto;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.domain=e.string();break;case 2:o.version=e.int64();break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.domain&&e.hasOwnProperty("domain")&&!s.isString(e.domain)?"domain: string expected":null!=e.version&&e.hasOwnProperty("version")&&!s.isInteger(e.version)&&!(e.version&&s.isInteger(e.version.low)&&s.isInteger(e.version.high))?"version: integer|Long expected":null},e.fromObject=function(e){if(e instanceof a.onnx.OperatorSetIdProto)return e;var t=new a.onnx.OperatorSetIdProto;return null!=e.domain&&(t.domain=String(e.domain)),null!=e.version&&(s.Long?(t.version=s.Long.fromValue(e.version)).unsigned=!1:"string"==typeof e.version?t.version=parseInt(e.version,10):"number"==typeof e.version?t.version=e.version:"object"==typeof e.version&&(t.version=new s.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber())),t},e.toObject=function(e,t){t||(t={});var n={};if(t.defaults)if(n.domain="",s.Long){var i=new s.Long(0,0,!1);n.version=t.longs===String?i.toString():t.longs===Number?i.toNumber():i}else n.version=t.longs===String?"0":0;return null!=e.domain&&e.hasOwnProperty("domain")&&(n.domain=e.domain),null!=e.version&&e.hasOwnProperty("version")&&("number"==typeof e.version?n.version=t.longs===String?String(e.version):e.version:n.version=t.longs===String?s.Long.prototype.toString.call(e.version):t.longs===Number?new s.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber():e.version),n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.OperatorSetIdProto"},e}(),e.OperatorStatus=function(){var e={},t=Object.create(e);return t[e[0]="EXPERIMENTAL"]=0,t[e[1]="STABLE"]=1,t}(),e.FunctionProto=function(){function e(e){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],e)for(var t=Object.keys(e),n=0;n<t.length;++n)null!=e[t[n]]&&(this[t[n]]=e[t[n]])}return e.prototype.name="",e.prototype.input=s.emptyArray,e.prototype.output=s.emptyArray,e.prototype.attribute=s.emptyArray,e.prototype.attributeProto=s.emptyArray,e.prototype.node=s.emptyArray,e.prototype.docString="",e.prototype.opsetImport=s.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=o.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.input&&e.input.length)for(var n=0;n<e.input.length;++n)t.uint32(34).string(e.input[n]);if(null!=e.output&&e.output.length)for(var n=0;n<e.output.length;++n)t.uint32(42).string(e.output[n]);if(null!=e.attribute&&e.attribute.length)for(var n=0;n<e.attribute.length;++n)t.uint32(50).string(e.attribute[n]);if(null!=e.node&&e.node.length)for(var n=0;n<e.node.length;++n)a.onnx.NodeProto.encode(e.node[n],t.uint32(58).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(66).string(e.docString),null!=e.opsetImport&&e.opsetImport.length)for(var n=0;n<e.opsetImport.length;++n)a.onnx.OperatorSetIdProto.encode(e.opsetImport[n],t.uint32(74).fork()).ldelim();if(null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(82).string(e.domain),null!=e.attributeProto&&e.attributeProto.length)for(var n=0;n<e.attributeProto.length;++n)a.onnx.AttributeProto.encode(e.attributeProto[n],t.uint32(90).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof i||(e=i.create(e));for(var n=void 0===t?e.len:e.pos+t,o=new a.onnx.FunctionProto;e.pos<n;){var s=e.uint32();switch(s>>>3){case 1:o.name=e.string();break;case 4:o.input&&o.input.length||(o.input=[]),o.input.push(e.string());break;case 5:o.output&&o.output.length||(o.output=[]),o.output.push(e.string());break;case 6:o.attribute&&o.attribute.length||(o.attribute=[]),o.attribute.push(e.string());break;case 11:o.attributeProto&&o.attributeProto.length||(o.attributeProto=[]),o.attributeProto.push(a.onnx.AttributeProto.decode(e,e.uint32()));break;case 7:o.node&&o.node.length||(o.node=[]),o.node.push(a.onnx.NodeProto.decode(e,e.uint32()));break;case 8:o.docString=e.string();break;case 9:o.opsetImport&&o.opsetImport.length||(o.opsetImport=[]),o.opsetImport.push(a.onnx.OperatorSetIdProto.decode(e,e.uint32()));break;case 10:o.domain=e.string();break;default:e.skipType(7&s)}}return o},e.decodeDelimited=function(e){return e instanceof i||(e=new i(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!s.isString(e.name))return"name: string expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t)if(!s.isString(e.input[t]))return"input: string[] expected"}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t)if(!s.isString(e.output[t]))return"output: string[] expected"}if(null!=e.attribute&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var t=0;t<e.attribute.length;++t)if(!s.isString(e.attribute[t]))return"attribute: string[] expected"}if(null!=e.attributeProto&&e.hasOwnProperty("attributeProto")){if(!Array.isArray(e.attributeProto))return"attributeProto: array expected";for(var t=0;t<e.attributeProto.length;++t){var n=a.onnx.AttributeProto.verify(e.attributeProto[t]);if(n)return"attributeProto."+n}}if(null!=e.node&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var t=0;t<e.node.length;++t){var n=a.onnx.NodeProto.verify(e.node[t]);if(n)return"node."+n}}if(null!=e.docString&&e.hasOwnProperty("docString")&&!s.isString(e.docString))return"docString: string expected";if(null!=e.opsetImport&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var t=0;t<e.opsetImport.length;++t){var n=a.onnx.OperatorSetIdProto.verify(e.opsetImport[t]);if(n)return"opsetImport."+n}}return null!=e.domain&&e.hasOwnProperty("domain")&&!s.isString(e.domain)?"domain: string expected":null},e.fromObject=function(e){if(e instanceof a.onnx.FunctionProto)return e;var t=new a.onnx.FunctionProto;if(null!=e.name&&(t.name=String(e.name)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.FunctionProto.input: array expected");t.input=[];for(var n=0;n<e.input.length;++n)t.input[n]=String(e.input[n])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.FunctionProto.output: array expected");t.output=[];for(var n=0;n<e.output.length;++n)t.output[n]=String(e.output[n])}if(e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");t.attribute=[];for(var n=0;n<e.attribute.length;++n)t.attribute[n]=String(e.attribute[n])}if(e.attributeProto){if(!Array.isArray(e.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");t.attributeProto=[];for(var n=0;n<e.attributeProto.length;++n){if("object"!=typeof e.attributeProto[n])throw TypeError(".onnx.FunctionProto.attributeProto: object expected");t.attributeProto[n]=a.onnx.AttributeProto.fromObject(e.attributeProto[n])}}if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.FunctionProto.node: array expected");t.node=[];for(var n=0;n<e.node.length;++n){if("object"!=typeof e.node[n])throw TypeError(".onnx.FunctionProto.node: object expected");t.node[n]=a.onnx.NodeProto.fromObject(e.node[n])}}if(null!=e.docString&&(t.docString=String(e.docString)),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");t.opsetImport=[];for(var n=0;n<e.opsetImport.length;++n){if("object"!=typeof e.opsetImport[n])throw TypeError(".onnx.FunctionProto.opsetImport: object expected");t.opsetImport[n]=a.onnx.OperatorSetIdProto.fromObject(e.opsetImport[n])}}return null!=e.domain&&(t.domain=String(e.domain)),t},e.toObject=function(e,t){t||(t={});var n={};if((t.arrays||t.defaults)&&(n.input=[],n.output=[],n.attribute=[],n.node=[],n.opsetImport=[],n.attributeProto=[]),t.defaults&&(n.name="",n.docString="",n.domain=""),null!=e.name&&e.hasOwnProperty("name")&&(n.name=e.name),e.input&&e.input.length){n.input=[];for(var i=0;i<e.input.length;++i)n.input[i]=e.input[i]}if(e.output&&e.output.length){n.output=[];for(var i=0;i<e.output.length;++i)n.output[i]=e.output[i]}if(e.attribute&&e.attribute.length){n.attribute=[];for(var i=0;i<e.attribute.length;++i)n.attribute[i]=e.attribute[i]}if(e.node&&e.node.length){n.node=[];for(var i=0;i<e.node.length;++i)n.node[i]=a.onnx.NodeProto.toObject(e.node[i],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.opsetImport&&e.opsetImport.length){n.opsetImport=[];for(var i=0;i<e.opsetImport.length;++i)n.opsetImport[i]=a.onnx.OperatorSetIdProto.toObject(e.opsetImport[i],t)}if(null!=e.domain&&e.hasOwnProperty("domain")&&(n.domain=e.domain),e.attributeProto&&e.attributeProto.length){n.attributeProto=[];for(var i=0;i<e.attributeProto.length;++i)n.attributeProto[i]=a.onnx.AttributeProto.toObject(e.attributeProto[i],t)}return n},e.prototype.toJSON=function(){return this.constructor.toObject(this,n.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.FunctionProto"},e}(),e}(),t.exports=a});function gr(e,t){if(!e)throw Error("string"==typeof t?t:t())}function Gr(e){return new TextDecoder().decode(e)}var Ae,Zn,Qs,Xe,Mo,je,nt,V,Fr,Jn,Qn,Yn,xe=$(()=>{"use strict";xa(),Ae=se(mr()),er(),Zn=class{static arraysEqual(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}},Qs=class{static preprocessInputShapes(e,t){return[1===e.length?[1,e[0]]:e,1===t.length?[t[0],1]:t]}static postprocessOutputShape(e,t,n){1===t&&e.splice(e.length-2,1),1===n&&e.pop()}static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Xe=class e{static calcShape(e,t,n=!1){let i=e.length,o=t.length;if(0===i)return t;if(0===o)return e;let s=Math.max(e.length,t.length),a=Array(s);if(n){if(i<2||o<2)return;let n=Qs.calcMatMulShape([e[i-2],e[i-1]],[t[o-2],t[o-1]]);if(void 0===n)return;[a[s-2],a[s-1]]=n}for(let u=n?3:1;u<=s;u++){let n=i-u<0?1:e[i-u],l=o-u<0?1:t[o-u];if(n!==l&&n>1&&l>1)return;a[s-u]=Math.max(n,l)}return a}static index(t,n){let i=Array(n.length);return e.fillIndex(t,n,i),i}static fillIndex(e,t,n){let i=e.length-t.length;for(let o=0;o<t.length;o++)n[o]=e[i+o]%t[o]}static calc(t,n,i,o,s){let a=e.calcShape(t.dims,n.dims);if(a){if(o&&!V.areEqual(a,t.dims))return;let u=V.size(a),l=o?t:new Ne(a,s||t.type);if(0===a.length)l.set([],i(t.get([]),n.get([])));else{let o,s=Array(a.length),d=Array(t.dims.length),p=Array(n.dims.length),c=0,h=0,f=!1,m=!1;0===t.dims.length&&(c=t.get([]),f=!0),0===n.dims.length&&(h=n.get([]),m=!0);for(let g=0;g<u;g++){o=g;for(let e=a.length-1;e>=0;e--)s[e]=o%a[e],o=Math.floor(o/a[e]);f||(e.fillIndex(s,t.dims,d),c=t.get(d)),m||(e.fillIndex(s,n.dims,p),h=n.get(p)),l.set(s,i(c,h))}}return l}}static isValidBroadcast(e,t){let n=e.length,i=t.length;if(n>i)return!1;for(let o=1;o<=n;o++)if(1!==e[n-o]&&e[n-o]!==t[i-o])return!1;return!0}static getBroadcastDims(e,t){let n=e.length,i=[];for(let o=0;o<n;o++){let s=n-1-o,a=e[s]||1;(t[t.length-1-o]||1)>1&&1===a&&i.unshift(s)}return i}},Mo=class{static getShapeOfGemmResult(e,t,n,i,o){let s,a,u;if(2!==e.length||2!==n.length)throw Error("shape need to be of size 2");t?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(i?(u=n[0],l=1):(u=n[1],l=0),n[l]!==a)throw Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw Error("invalid shape specified");if(o&&!Xe.isValidBroadcast(o,[s,u]))throw Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},je=class e{static tensorDataTypeFromProto(e){switch(e){case Ae.onnx.TensorProto.DataType.INT8:return"int8";case Ae.onnx.TensorProto.DataType.UINT8:return"uint8";case Ae.onnx.TensorProto.DataType.BOOL:return"bool";case Ae.onnx.TensorProto.DataType.INT16:return"int16";case Ae.onnx.TensorProto.DataType.UINT16:return"uint16";case Ae.onnx.TensorProto.DataType.INT32:return"int32";case Ae.onnx.TensorProto.DataType.UINT32:return"uint32";case Ae.onnx.TensorProto.DataType.FLOAT:return"float32";case Ae.onnx.TensorProto.DataType.DOUBLE:return"float64";case Ae.onnx.TensorProto.DataType.STRING:return"string";case Ae.onnx.TensorProto.DataType.INT64:return"int32";case Ae.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw Error(`unsupported data type: ${Ae.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return Ae.onnx.TensorProto.DataType.INT8;case"uint8":return Ae.onnx.TensorProto.DataType.UINT8;case"bool":return Ae.onnx.TensorProto.DataType.BOOL;case"int16":return Ae.onnx.TensorProto.DataType.INT16;case"uint16":return Ae.onnx.TensorProto.DataType.UINT16;case"int32":return Ae.onnx.TensorProto.DataType.INT32;case"uint32":return Ae.onnx.TensorProto.DataType.UINT32;case"float32":return Ae.onnx.TensorProto.DataType.FLOAT;case"float64":return Ae.onnx.TensorProto.DataType.DOUBLE;case"string":return Ae.onnx.TensorProto.DataType.STRING;case"int64":return Ae.onnx.TensorProto.DataType.INT64;case"uint64":return Ae.onnx.TensorProto.DataType.UINT64;default:throw Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(e=>Cn.isLong(e)?e.toNumber():e)}static tensorValueTypeFromProto(t){return{tensorType:e.tensorDataTypeFromProto(t.elemType),shape:{dims:e.tensorDimsFromProto(t.shape.dim.map(e=>e.dimValue))}}}static tensorDimsFromORTFormat(e){let t=[];for(let n=0;n<e.dimsLength();n++)t.push(nt.longToNumber(e.dims(n)));return t}static tensorAttributesFromORTFormat(e){let t=[];for(let n=0;n<e.attributesLength();n++)t.push(e.attributes(n));return t}},nt=class{static longToNumber(e){return Cn.isLong(e)?e.toNumber():"bigint"==typeof e?Number(e):e}static isLong(e){return Cn.isLong(e)||"bigint"==typeof e}},V=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static sizeFromDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(e,t,n){let i=1;for(let o=t;o<n;o++){if(e[o]<=0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");i*=e[o]}return i}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let n=Array(t);n[t-1]=1,n[t-2]=e[t-1];for(let i=t-3;i>=0;--i)n[i]=n[i+1]*e[i+1];return n}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,t,n){void 0===n&&(n=e.length);let i=0;for(let o=0;o<n;++o)i+=t[o]*e[o];return i}static offsetToIndices(e,t){let n=t.length;if(0===n)return[];if(1===n)return[e*t[0]];let i=Array(t.length);for(let n=0;n<i.length-1;++n)i[n]=Math.floor(e/t[n]),e-=i[n]*t[n];return i[i.length-1]=e,i}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(e=>this.normalizeAxis(e,t))}static incrementIndex(e,t,n){if(0===t.length||0===e.length)throw Error("Index incrementing unsupported for scalar Tensor");if(void 0===n)n=t.length;else if(n<=0||n>t.length)throw Error("Incorrect axis to increment on");for(let i=n-1;i>=0&&(e[i]++,!(e[i]<t[i]));--i)e[i]=0}static calculateReshapedDims(t,n){if(0===n.length){if(0===t.length||1===e.size(t))return[];throw Error("cannot reshape to a scalar Tensor")}let i=n.length,o=Array(i),s=-1,a=1;for(let e=0;e<i;e++){if(n[e]<-1)throw Error("a dimension in shape hints cannot be less than -1");if(-1===n[e]){if(-1!==s)throw Error("at most one dimension in shape hints can be -1");s=e}else{if(0===n[e]){if(e>=t.length)throw Error("the dimension with value zero exceeds the dimension size of the input tensor");o[e]=t[e]}else o[e]=n[e];a*=o[e]}}let u=e.size(t);if(-1!==s){if(u%a!=0)throw Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${t}] Output shape: [${n}]`);o[s]=u/a}else if(a!==u)throw Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let n=e.length;return e.map((e,i)=>e+t[i]+t[i+n])}static areEqual(e,t){return e.length===t.length&&e.every((e,n)=>e===t[n])}static validateDimsAndCalcSize(e){if(e.length>6)throw TypeError("Only rank 0 to 6 is supported for tensor shape.");let t=1;for(let n of e){if(!Number.isInteger(n))throw TypeError(`Invalid shape: ${n} is not an integer`);if(n<0||n>0x7fffffff)throw TypeError(`Invalid shape: length ${n} is not allowed`);t*=n}return t}static flattenShape(e,t){t<0&&(t+=e.length);let n=e.reduce((e,t)=>e*t,1),i=e.slice(t).reduce((e,t)=>e*t,1);return[n/i,i]}static squeezeShape(t,n){let i=[];n=e.normalizeAxes(n,t.length);for(let e=0;e<t.length;e++){let o=n.indexOf(e)>=0;if(o&&1!==t[e])throw Error("squeeze an axis of size different than 1");(0===n.length&&t[e]>1||n.length>0&&!o)&&i.push(t[e])}return i}static unsqueezeShape(t,n){let i=Array(t.length+n.length);i.fill(0);for(let t=0;t<n.length;t++){let o=e.normalizeAxis(n[t],i.length);if(o>=i.length)throw Error("'axes' has an out of range axis");if(0!==i[o])throw Error("'axes' has a duplicate axis");i[o]=1}let o=0;for(let e=0;e<i.length;e++)0===i[e]&&(i[e]=t[o++]);if(o!==t.length)throw Error("the unsqueezed dimension could not be established");return i}},Fr=class e{static splitShape(t,n,i,o){if(0===i.length){if(!o)throw Error("need to know number of outputs when the 'split' attribute is not specified");e.determineSplit(t[n],o,i)}let s=[],a=[0];for(let e=0;e<i.length;++e){0!==e&&a.push(a[e-1]+i[e-1]);let o=t.slice();o[n]=i[e],s.push(o)}return[s,a]}static determineSplit(e,t,n){if(e%t!=0)throw Error("cannot split tensor to equal sized parts");for(let i=0;i<t;++i)n.push(e/t)}},Jn=class e{static adjustPoolAttributes(e,t,n,i,o,s){if(!e&&n.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=n.length?n.push(t[e+2]):n[e]=t[e+2];for(let e=0;e<n.length;e++)if(e<i.length){if(i[e]<0)throw Error("strides should be greater than or equal to 1")}else i.push(1);for(let e=0;e<n.length;e++)if(e<o.length){if(o[e]<0)throw Error("dilations should be greater than or equal to 1")}else o.push(1);for(let e=0;e<2*n.length;e++)if(e<s.length){if(s[e]<0)throw Error("pad should be greater than or equal to 1")}else s.push(0);for(let e=0;e<n.length;e++){if(n[e]<=0)throw Error("kernel shapes need to be greater than 0");if(s[e]>=n[e]||s[e+n.length]>=n[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,i,o,s,a){if(a){if(s.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+2],n[u],i[u],o[u],s,u,u+t.length-2,a)}}static computePoolOutputShape(t,n,i,o,s,a,u){if(n.length<=0)throw Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return e.computeShapeHelper(t,n,l,i,o,s,a,u),l}static computeConvOutputShape(t,n,i,o,s,a,u){if(t.length<=0||n.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return e.computeShapeHelper(!1,t,l,i,o,s,a,u),l}static computeShapeHelper(t,n,i,o,s,a,u,l){if(t)for(let e=0;e<n.length-2;e++)i.push(1);else for(let t=0;t<n.length-2;t++)i.push(e.adjustPadAndReturnShape(n[t+2],o[t],s[t],a[t],u,t,t+n.length-2,l))}static adjustPadAndReturnShape(e,t,n,i,o,s,a,u){let l=n*(i-1)+1;if(!u||"NOTSET"===u)return Math.floor((e+o[s]+o[a]-l)/t+1);switch(u){case"VALID":return o[s]=0,o[a]=0,Math.floor((e-l)/t+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==n)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let n=((e+t-1)/t-1)*t+i-e;return o[s]=Math.floor("SAME_LOWER"===u?(n+1)/2:n/2),o[a]=n-o[s],Math.floor((e+n-i)/t+1)}default:throw Error("Unsupported AutoPad type")}}},Qn=-34028234663852886e22,Yn=34028234663852886e22});function b0(e){switch(e){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw Error(`cannot calculate sizeof() on type ${e}`)}}function Fd(e){switch(e){case ce.onnx.TensorProto.DataType.UINT8:case ce.onnx.TensorProto.DataType.INT8:case ce.onnx.TensorProto.DataType.BOOL:return 1;case ce.onnx.TensorProto.DataType.UINT16:case ce.onnx.TensorProto.DataType.INT16:return 2;case ce.onnx.TensorProto.DataType.FLOAT:case ce.onnx.TensorProto.DataType.INT32:case ce.onnx.TensorProto.DataType.UINT32:return 4;case ce.onnx.TensorProto.DataType.INT64:case ce.onnx.TensorProto.DataType.DOUBLE:case ce.onnx.TensorProto.DataType.UINT64:return 8;default:throw Error(`cannot calculate sizeof() on type ${ce.onnx.TensorProto.DataType[e]}`)}}function y0(e,t){return new(Wd(t))(e)}function Wd(e){switch(e){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw Error("unspecified error")}}function Ys(e,t){if(t===ce.onnx.TensorProto.DataType.INT64||t===Nr.TensorDataType.INT64){if(e.greaterThanOrEqual(0x80000000)||e.lessThan(-0x80000000))throw TypeError("int64 is not supported")}else if(t===ce.onnx.TensorProto.DataType.UINT32||t===Nr.TensorDataType.UINT32||t===ce.onnx.TensorProto.DataType.UINT64||t===Nr.TensorDataType.UINT64){if(e.greaterThanOrEqual(0x100000000)||e.lessThan(0))throw TypeError("uint64 is not supported")}else throw TypeError(`not a LONG type: ${ce.onnx.TensorProto.DataType[t]}`);return e.toNumber()}function Gd(e,t,n){switch(t){case ce.onnx.TensorProto.DataType.BOOL:case ce.onnx.TensorProto.DataType.UINT8:return e.getUint8(n);case ce.onnx.TensorProto.DataType.INT8:return e.getInt8(n);case ce.onnx.TensorProto.DataType.UINT16:return e.getUint16(n,!0);case ce.onnx.TensorProto.DataType.INT16:return e.getInt16(n,!0);case ce.onnx.TensorProto.DataType.FLOAT:return e.getFloat32(n,!0);case ce.onnx.TensorProto.DataType.INT32:return e.getInt32(n,!0);case ce.onnx.TensorProto.DataType.UINT32:return e.getUint32(n,!0);case ce.onnx.TensorProto.DataType.INT64:return Ys(Cn.fromBits(e.getUint32(n,!0),e.getUint32(n+4,!0),!1),t);case ce.onnx.TensorProto.DataType.DOUBLE:return e.getFloat64(n,!0);case ce.onnx.TensorProto.DataType.UINT64:return Ys(Cn.fromBits(e.getUint32(n,!0),e.getUint32(n+4,!0),!0),t);default:throw Error(`cannot read from DataView for type ${ce.onnx.TensorProto.DataType[t]}`)}}var Ud,ce,Ne,er=$(()=>{"use strict";Ud=se(ac()),xa(),zr(),ce=se(mr()),xe(),Ne=class e{constructor(e,t,n,i,o,s=Ud.Guid.create()){this.dims=e,this.type=t,this.dataProvider=n,this.asyncDataProvider=i,this.cache=o,this.dataId=s,this.size=V.validateDimsAndCalcSize(e);let a=this.size,u=void 0===n&&void 0===i&&void 0===o;if(void 0!==o&&o.length!==a)throw RangeError("Input dims doesn't match data length.");if("string"===t){if(void 0!==o&&(!Array.isArray(o)||!o.every(e=>"string"==typeof e)))throw TypeError("cache should be a string array");u&&(this.cache=Array(a))}else{if(void 0!==o){let e=Wd(t);if(!(o instanceof e))throw TypeError(`cache should be type ${e.name}`)}if(u){let e=new ArrayBuffer(a*b0(t));this.cache=y0(e,t)}}}get data(){if(void 0===this.cache){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if("string"!==this.type)throw TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw TypeError("data type is not float (float32, float64)")}}get numberData(){if("string"!==this.type)return this.data;throw TypeError("type cannot be non-number (string)")}get(e){return this.data[V.indicesToOffset(e,this.strides)]}set(e,t){this.data[V.indicesToOffset(e,this.strides)]=t}async getData(){return void 0===this.cache&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=V.computeStrides(this.dims)),this._strides}static fromProto(t){if(!t)throw Error("cannot construct Value from an empty tensor");let n=je.tensorDataTypeFromProto(t.dataType),i=new e(je.tensorDimsFromProto(t.dims),n);if("string"===n)t.stringData.forEach((e,t)=>{i.data[t]=Gr(e)});else if(t.rawData&&"number"==typeof t.rawData.byteLength&&t.rawData.byteLength>0){let e=i.data,n=new DataView(t.rawData.buffer,t.rawData.byteOffset,t.rawData.byteLength),o=Fd(t.dataType),s=t.rawData.byteLength/o;if(t.rawData.byteLength%o!=0)throw Error("invalid buffer length");if(e.length!==s)throw Error("buffer length mismatch");for(let i=0;i<s;i++){let s=Gd(n,t.dataType,i*o);e[i]=s}}else{let e;switch(t.dataType){case ce.onnx.TensorProto.DataType.FLOAT:e=t.floatData;break;case ce.onnx.TensorProto.DataType.INT32:case ce.onnx.TensorProto.DataType.INT16:case ce.onnx.TensorProto.DataType.UINT16:case ce.onnx.TensorProto.DataType.INT8:case ce.onnx.TensorProto.DataType.UINT8:case ce.onnx.TensorProto.DataType.BOOL:e=t.int32Data;break;case ce.onnx.TensorProto.DataType.INT64:e=t.int64Data;break;case ce.onnx.TensorProto.DataType.DOUBLE:e=t.doubleData;break;case ce.onnx.TensorProto.DataType.UINT32:case ce.onnx.TensorProto.DataType.UINT64:e=t.uint64Data;break;default:throw Error("unspecific error")}if(null==e)throw Error("failed to populate data from a tensorproto value");let n=i.data;if(n.length!==e.length)throw Error("array length mismatch");for(let i=0;i<e.length;i++){let o=e[i];Cn.isLong(o)?n[i]=Ys(o,t.dataType):n[i]=o}}return i}static fromData(t,n,i){return new e(n,i,void 0,void 0,t)}static fromOrtTensor(t){if(!t)throw Error("cannot construct Value from an empty tensor");let n=je.tensorDimsFromORTFormat(t),i=je.tensorDataTypeFromProto(t.dataType()),o=new e(n,i);if("string"===i)for(let e=0;e<t.stringDataLength();e++)o.data[e]=t.stringData(e);else if(t.rawDataArray()&&"number"==typeof t.rawDataLength()&&t.rawDataLength()>0){let e=o.data,n=new DataView(t.rawDataArray().buffer,t.rawDataArray().byteOffset,t.rawDataLength()),i=Fd(t.dataType()),s=t.rawDataLength()/i;if(t.rawDataLength()%i!=0)throw Error("invalid buffer length");if(e.length!==s)throw Error("buffer length mismatch");for(let o=0;o<s;o++){let s=Gd(n,t.dataType(),o*i);e[o]=s}}return o}}});function j(e){return 1===e?_0:x0}function Hd(e){let t=j(e);return`${t.version}
      precision highp float;
      ${t.attribute} vec3 position;
      ${t.attribute} vec2 textureCoord;

      ${t.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function qd(e){let t=j(e);return`${t.version}
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

    `}function jd(e,t){let n=j(e);return`
  void main() {
    int indices[${t}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var _0,x0,Oe=$(()=>{"use strict";_0={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},x0={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}}),pe=$(()=>{});async function eu(e,t=e=>0,n){return new Promise((i,o)=>{let s=0,a=()=>{if(e())return void i();let u=t(++s);null!=n&&s>=n?o():setTimeout(a,u)};a()})}function Bo(e){return gr("u">typeof e&&0!==e.length,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)}function Kd(e){return gr("u">typeof e&&0!==e.length,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)+"AtOutCoords"}function br(e,t){return JSON.parse(JSON.stringify(e)),t}function yr(e,t){return t.map(t=>e[t]).join(", ")}function Ze(e){if(e<=1)return"int";if(2===e)return"ivec2";if(3===e)return"ivec3";if(4===e)return"ivec4";if(5===e)return"ivec5";if(6===e)return"ivec6";throw Error(`GPU for rank ${e} is not yet supported`)}function St(e=6){return["x","y","z","w","u","v"].slice(0,e)}var cn=$(()=>{"use strict";xe()});function w0(e,t){return St(t).map(t=>`${e}.${t}`)}function _r(e,t){return 1===t?[e]:w0(e,t)}function dn(){return`
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
  `}var tr=$(()=>{"use strict";cn()});function v0(e,t,n){if(0===e)return"false";if(1===e)return`rc > ${t[0]}`;let i="";for(let o=e-2;o<e;o++)i+=`${n[o]} >= ${t[o-e+2]}`,o<e-1&&(i+="||");return i}function I0(e,t){let n=e.length;if(0===n)return"getA(), 0, 0, 0";if(1===n)return`getA(rc),
            rc + 1 >= ${e[0]} ? 0. : getA(rc + 1),
            0, 0`;let i="r, c",o="r, cp1",s="rp1, c",a="rp1, cp1",u="";if(n>2)for(let e=0;e<n-2;++e)u+=`${t[e]},`;return`getA(${u}${i}),
          rEdge ? 0. : getA(${u}${s}),
          cEdge ? 0. : getA(${u}${o}),
          rEdge || cEdge ? 0. : getA(${u}${a})`}function S0(e,t,n,i){return 0===e||1===e?"":`
    int r = ${t[e-2]};
    int c = ${t[e-1]};
    int rp1 = ${t[e-2]} + 1;
    int cp1 = ${t[e-1]} + 1;
    bool rEdge = rp1 >= ${i};
    bool cEdge = cp1 >= ${n};
    `}var Xd,T0,Zd,Jd=$(()=>{"use strict";Oe(),pe(),cn(),tr(),Xd={name:"pack",inputNames:["A"],inputTypes:[1]},T0=(e,t)=>{let n=j(e.session.backend.glContext.version),i=t.dims,o=i.length,s=t.dims.length,a=Ze(s),u=_r("rc",s),l=S0(s,u,i[i.length-2],i[i.length-1]),d;d=0===o?[1,1]:1===o?[i[0],1]:[i[s-1],i[s-2]];let p=v0(s,d,u),c=I0(i,u),h=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${p}) {
            ${n.output} = vec4(0);
          } else {
            ${l}

            ${n.output} = vec4(${c});
          }
        }
      `;return{...Xd,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:2},shaderSource:h}},Zd=(e,t)=>({...Xd,get:()=>T0(e,t)})});function tu(e){if(0===e.length)return[1,1,1];let t=1;for(let n=0;n<e.length-2;++n)t*=e[n];return[t,e.length>1?e[e.length-2]:1,e[e.length-1]]}function Yd(e,t){return 0===e.length||0===t.length||(e.length<2||t.length<2?e[e.length-1]===t[t.length-1]:e[e.length-1]===t[t.length-1]&&e[e.length-2]===t[t.length-2])}function P0(e){let t=V.computeStrides(e),n=["b","r","c"],i="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t.map((e,o)=>{let s=`int ${n[o]} = ${i} / ${e}`,a=o===t.length-1?`int ${n[o+1]} = ${i} - ${n[o]} * ${e}`:`index -= ${n[o]} * ${e}`;return`${s}; ${a};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function O0(e){let t=V.computeStrides(e);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${t[0]} + coords.z * ${t[1]} + coords.y;
  }
`}var $0,A0,Qd,nu,ep=$(()=>{"use strict";xe(),Oe(),pe(),tr(),$0=e=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${e}`}),A0=(e,t,n,i)=>{let o=t.dims,s=i,a="";for(let e=0;e<4;e++){let t="";switch(e){case 0:t="outputCoords = rc;";break;case 1:t="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:t="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:t="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw Error()}a+=`
        ${t}
        ${e>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${e}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${e>0?"}":""}
      `}let u=j(e.session.backend.glContext.version),l=`
      ${P0(o)}
      ${O0(s)}
      ${dn()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${s[2]};
        int cols = ${s[1]};

        ${a}
        ${u.output} = result;
      }
    `;return{...n,output:{dims:s,type:t.type,textureType:2},shaderSource:l,hasMain:!0}},Qd=(e,t,n)=>{let i=$0(n);return{...i,get:()=>A0(e,t,i,n)}}}),tp=$(()=>{"use strict";Oe(),pe(),nu=(e,t)=>{let n=t.shape,i=j(e.session.backend.glContext.version),o=`
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
    }`,s={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:t.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return e.executeProgram(s,[t.tensor])}});function C0(e,t){if(1===e)return"rc";let n="";for(let i=0;i<e;i++)n+=t[i],i<e-1&&(n+=",");return n}var np,E0,rp,Vo,Ur,Fo,Hr,ip,ru,k0,Go,ou,le,lp,cp,dp,L0,R0,Uo,gt,z,qr,Wo,op=$(()=>{"use strict";Oe(),pe(),cn(),tr(),np={name:"unpack",inputNames:["A"],inputTypes:[2]},E0=(e,t)=>{let n=t.dims.length,i=_r("rc",n),o=i.slice(-2),s=Ze(n),a=dn(),u=0===t.dims.length?"":C0(n,i),l=n<=1?"rc":`vec2(${o.join(",")})`,d=j(e.session.backend.glContext.version),p=`
    ${a}
    void main() {
      ${s} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${d.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...np,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:p}},rp=(e,t)=>({...np,get:()=>E0(e,t)})}),Wr=$(()=>{"use strict";ct(),Vo=class{constructor(e,t=1){if(1===t)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=t;else if(4===t)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=t;else throw Error(`Invalid number of channels: ${t}`)}encode(e,t){let n,i;return e.constructor!==Float32Array&&(Te.warning("Encoder","data was not of type Float32; creating new Float32Array"),i=new Float32Array(e)),t*this.channelSize>e.length?(Te.warning("Encoder","Source data too small. Allocating larger array"),i=e,n=this.allocate(t*this.channelSize),i.forEach((e,t)=>n[t]=e)):n=i=e,n}allocate(e){return new Float32Array(4*e)}decode(e,t){return 1===this.channelSize?e.filter((e,t)=>t%4==0).subarray(0,t):e.subarray(0,t)}},Ur=class{constructor(e,t=1,n){if(1!==t&&4!==t)throw Error(`Invalid number of channels: ${t}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=t,this.textureType=n||e.FLOAT}encode(e,t){let n=e;return 1===this.channelSize&&(Te.verbose("Encoder","Exploding into a larger array"),n=this.allocate(t),e.forEach((e,t)=>n[4*t]=e)),n}allocate(e){return new Float32Array(4*e)}decode(e,t){return 1===this.channelSize?e.filter((e,t)=>t%4==0).subarray(0,t):e.subarray(0,t)}},Fo=class{constructor(e,t=1){if(this.channelSize=4,1===t)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else if(4===t)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else throw Error(`Invalid number of channels: ${t}`)}encode(e,t){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,t){if(e instanceof Uint8Array)return e.subarray(0,t);throw Error(`Invalid array type: ${e.constructor}`)}}}),ap=$(()=>{"use strict";xe(),pe(),Hr=(e,t,n)=>{let i=0===n||1===n?1:4,o=2===n,s=1===n||2===n,a=4===n?t.length-1:void 0,u=4===n?t.map((e,n)=>n===t.length-1?4*e:e):void 0;return ru(e,t,i,u,{isPacked:o,reverseWH:s,breakAxis:a})},ip=(e,t,n)=>{let i=Hr(e,t,n);return[i.width,i.height]},ru=(e,t,n=1,i,o)=>{let s=!!(o&&o.isPacked),[a,u]=e.computeTextureWH(s&&i||t,o),l=t.length,d=t.slice(0);if(0===l&&(d=[1]),1===n)i=t;else if(s){if(4!==n)throw Error("a packed texture must be 4-channel");i=t,l>0&&(d[l-1]=Math.ceil(d[l-1]/2)),l>1&&(d[l-2]=Math.ceil(d[l-2]/2))}else if(!i)throw Error("Unpacked shape is needed when using channels > 1");return{width:a,height:u,channels:n,isPacked:s,shape:d,strides:V.computeStrides(d),unpackedShape:i,reversedWH:o&&o.reverseWH}}}),up=$(()=>{"use strict";ct(),er(),xe(),Jd(),ep(),tp(),op(),Wr(),ap(),pe(),k0=(e,t)=>{let n=t.map(e=>`${e.unpackedShape.join(",")};${e.width}x${e.height}`).join("_"),i=e.name;return e.cacheHint&&(i+="["+e.cacheHint+"]"),i+=":"+n},Go=class{constructor(e){this.session=e,this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,t){return ip(this.session.layoutStrategy,e,t)}executeProgram(e,t){if(t.length<e.inputNames.length)throw Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw Error("input names size does not match input types");let n=[];for(let i=0;i<e.inputNames.length;++i)n[i]=this.getOrCreateTextureData(t[i],e.inputTypes[i]);let i=k0(e,n),o=this.session.programManager.getArtifact(i),s=o?o.programInfo:"function"==typeof e.get?e.get():e,a=Hr(this.session.layoutStrategy,s.output.dims,s.output.textureType),u=this.createTextureData(a,s.output.type);return o||(o=this.session.programManager.build(s,n,u),this.session.programManager.setArtifact(i,o)),this.runProgram(o,n,u),u}run(e,t){return this.executeProgram(e,t).tensor}runProgram(e,t,n){for(let n=0;n<t.length;++n)if(!!t[n].isPacked!=(2===e.programInfo.inputTypes[n]))throw Error(`input[${n}] property packed inconsistent`);if(!!n.isPacked!=(2===e.programInfo.output.textureType))throw Error("output property packed inconsistent");this.session.programManager.run(e,t,n)}getOrCreateTextureData(e,t){let n=this.getTextureData(e.dataId,2===t);if(!n&&(n=this.getTextureData(e.dataId,2!==t)))return 2===t?this.pack(n):this.unpack(n);if(!n){let i=Hr(this.session.layoutStrategy,e.dims,t);if(4===t){let n=e.dims;if(4===n.length){let i=[n[0],Math.ceil(n[1]*n[2]*n[3]/4)],o=Hr(this.session.layoutStrategy,i,t),s=e.numberData;if(n[1]*n[2]*n[3]%4!=0){let t=n[0],i=n[1]*n[2]*n[3],o=4*Math.ceil(i/4);s=new Float32Array(t*o);for(let n=0;n<t;++n){let t=n*i,a=n*o+n%1*i;s.set(e.numberData.subarray(t,t+i),a)}}return this.createTextureData(o,e.type,s,e,1)}}if(2===t){let t=ru(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),i=this.createTextureData(t,e.type,e.numberData,e,1);n=this.pack(i)}else n=this.createTextureData(i,e.type,e.numberData,e,1)}return n}createTextureDataFromLayoutBindTensor(e,t,n,i){return this.createTextureData(e,t,n,i,1)}createTextureData(e,t,n,i,o){Te.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let s=this.session.textureManager.createTextureFromLayout(t,e,n,o);return this.createTextureDataFromTexture(e,t,s,i)}reshapeUnpacked(e,t){let n=this.getOrCreateTextureData(e,0),i={channels:n.channels,height:n.height,width:n.width,shape:0!==t.length?t:[1],strides:V.computeStrides(t),unpackedShape:t};return this.createTextureDataFromTexture(i,e.type,n.texture).tensor}reshapePacked(e,t){let n=this.getOrCreateTextureData(e,2);if(Yd(e.dims,t)){let i={channels:n.channels,height:n.height,width:n.width,shape:0!==t.length?t:[1],strides:V.computeStrides(t),unpackedShape:t,isPacked:!0};return this.createTextureDataFromTexture(i,e.type,n.texture).tensor}let i=tu(e.dims),o=tu(t),s=this.reshapePacked(e,i),a=this.run(Qd(this,s,o),[s]);return this.reshapePacked(a,t)}cast(e,t){let n=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(n,t,n.texture).tensor}createTextureDataFromTexture(e,t,n,i,o){let s={...e,tensor:i||new Ne(e.unpackedShape,t,e=>this.readTexture(s),async e=>this.readTextureAsync(s),void 0,o),texture:n};return this.setTextureData(s.tensor.dataId,s,e.isPacked),s}getTextureData(e,t=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,t):t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,n=!1){this.session.isInitializer(e)?this.session.setTextureData(e,t,n):(n?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,t)}isTextureLayoutCached(e,t=!1){return!!this.getTextureData(e.dataId,t)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(nu(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(nu(this,e))}pack(e){return this.executeProgram(Zd(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(rp(this,e.tensor),[e.tensor])}}}),We=$(()=>{"use strict";ou=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},le=e=>new ou(e)}),pp=$(()=>{"use strict";We(),Oe(),pe(),lp={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},cp=(e,t,n)=>(R0(t),[e.run({...lp,cacheHint:n.cacheKey,get:()=>L0(e,t,n)},t)]),dp=e=>{let t=e.attributes.getFloat("epsilon",1e-5),n=e.attributes.getFloat("momentum",.9),i=e.attributes.getInt("spatial",1);return le({epsilon:t,momentum:n,spatial:i})},L0=(e,t,n)=>{let i=j(e.session.backend.glContext.version),o=t[0].dims.length,[s,a]=e.calculateTextureWidthAndHeight(t[1].dims,0),u=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${s}, ${a});
    float scale = getColorAsFloat(${i.texture2D}(Scale, position));
    float mean = getColorAsFloat(${i.texture2D}(Mean, position));
    float variance = getColorAsFloat(${i.texture2D}(Variance, position));
    float b = getColorAsFloat(${i.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...lp,output:{dims:t[0].dims,type:t[0].type,textureType:0},shaderSource:u}},R0=e=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs.");let t=e[0],n=e[1],i=e[2],o=e[3],s=e[4];if(t.dims.length<3||1!==n.dims.length||1!==i.dims.length||1!==o.dims.length||1!==s.dims.length||n.dims[0]!==t.dims[1]||i.dims[0]!==t.dims[1]||o.dims[0]!==t.dims[1]||s.dims[0]!==t.dims[1])throw Error("invalid input shape.");if("float32"!==t.type&&"float64"!==t.type||"float32"!==n.type&&"float64"!==n.type||"float32"!==i.type&&"float64"!==i.type||"float32"!==o.type&&"float64"!==o.type||"float32"!==s.type&&"float64"!==s.type)throw Error("invalid input tensor types.")}}),vn=$(()=>{"use strict";Uo=class{constructor(e,t,n,i){this.glContext=e,this.programInfo=t,this.inputTextureLayouts=n,this.outputTextureLayout=i}},gt=class{constructor(e){this.context=e}},z=class{constructor(e,t){this.routineBody=e,this.dependencies=t}},qr=class{constructor(e,t,n){this.name=e,n?this.dependencies=n:this.dependencies=[],t&&(this.routineBody=t)}addDependency(e){e&&this.dependencies.push(e)}},Wo=class{static returnOrderedNodes(e){if(!e||0===e.length)return[];if(1===e.length)return e;let t=new Set,n=new Set,i=[];return this.createOrderedNodes(e,t,n,i),i}static createOrderedNodes(e,t,n,i){for(let o=0;o<e.length;++o)this.dfsTraverse(e[o],t,n,i)}static dfsTraverse(e,t,n,i){if(!e||n.has(e.name))return;if(t.has(e.name))throw Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");t.add(e.name);let o=e.dependencies;if(o&&o.length>0)for(let e=0;e<o.length;++e)this.dfsTraverse(o[e],t,n,i);i.push(e),n.add(e.name),t.delete(e.name)}}});function z0(){let e="add_";return{body:`
  float ${e}(float a, float b) {
    return a + b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:e,type:0}}function M0(){let e="div_";return{body:`
  float ${e}(float a, float b) {
    return a / b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:e,type:0}}function B0(){let e="mul_";return{body:`
  float ${e}(float a, float b) {
    return a * b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:e,type:0}}function V0(){let e="sub_";return{body:`
  float ${e}(float a, float b) {
    return a - b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:e,type:0}}function F0(){let e="equal_";return{body:`
  float ${e}(float a, float b) {
    return float(a == b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:e,type:0}}function G0(){let e="greater_";return{body:`
  float ${e}(float a, float b) {
    return float(a > b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:e,type:0}}function U0(){let e="less_";return{body:`
  float ${e}(float a, float b) {
    return float(a < b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:e,type:0}}function W0(){let e="and_";return{body:`
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
  `,name:e,type:0}}function H0(){let e="or_";return{body:`
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
  `,name:e,type:0}}function q0(){let e="xor_";return{body:`
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
  `,name:e,type:0}}function j0(){return X0("pow")}function K0(){let e="prelu_";return{body:`
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
  `,name:e,type:0}}function X0(e){let t=`${e}_`;return{body:`
  float ${t}(float a, float b) {
    return ${e}(a, b);
  }
  vec4 ${t}(vec4 v1, vec4 v2) {
    return ${e}(v1, v2);
  }
  `,name:t,type:0}}var bt,Z0,fp,hp,mp,gp,bp,yp,_p,xp,wp,Tp,vp,Ip,$p,Ap,Q0,Y0,eI,Op,Ho,Cp,tI,nI,rI,Dp,oI,iI,aI,kp,sI,Sp=$(()=>{"use strict";xe(),vn(),Oe(),pe(),bt=(e,t,n,i=t[0].type,o)=>{let s=2*!!e.session.pack;return{name:n.name,inputNames:["A","B"],inputTypes:[s,s],cacheHint:o,get:()=>Z0(e,t,n,i)}},Z0=(e,t,n,i=t[0].type)=>{let o=2*!!e.session.pack,s=!V.areEqual(t[0].dims,t[1].dims),a=t[0].dims,u=e.session.pack;if(s){let s=Xe.calcShape(t[0].dims,t[1].dims,!1);if(!s)throw Error("Can't perform binary op on the given tensors");let l=(a=s).length,d=0!==t[0].dims.length?t[0].dims.length:1,p=0!==t[1].dims.length?t[1].dims.length:1,c=0!==t[0].dims.length?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",h=0!==t[1].dims.length?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",f=j(e.session.backend.glContext.version),m=u?`
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
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:a,type:i,textureType:o},shaderSource:m,hasMain:u}}let l=j(e.session.backend.glContext.version),d=`
    ${n.body}
    void main() {
      vec4 v1 = ${l.texture2D}(A, TexCoords);
      vec4 v2 = ${l.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${l.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:t[0].dims,type:i,textureType:o},shaderSource:d,hasMain:!0}},fp=(e,t)=>[e.run(bt(e,t,z0()),t)],hp=(e,t)=>[e.run(bt(e,t,W0(),"bool"),t)],mp=(e,t)=>[e.run(bt(e,t,M0()),t)],gp=(e,t)=>[e.run(bt(e,t,F0(),"bool"),t)],bp=(e,t)=>[e.run(bt(e,t,G0(),"bool"),t)],yp=(e,t)=>[e.run(bt(e,t,U0(),"bool"),t)],_p=(e,t)=>[e.run(bt(e,t,B0()),t)],xp=(e,t)=>[e.run(bt(e,t,H0(),"bool"),t)],wp=(e,t)=>[e.run(bt(e,t,j0()),t)],Tp=(e,t)=>[e.run(bt(e,t,K0()),t)],vp=(e,t)=>[e.run(bt(e,t,V0()),t)],Ip=(e,t)=>[e.run(bt(e,t,q0(),"bool"),t)]}),Pp=$(()=>{"use strict";xe(),$p=(e,t,n)=>(Q0(t),[e.cast(t[0],n)]),Ap=e=>je.tensorDataTypeFromProto(e.attributes.getInt("to")),Q0=e=>{if(!e||1!==e.length)throw Error("Cast requires 1 input.");if("string"===e[0].type)throw Error("Invalid input type.")}}),Ep=$(()=>{"use strict";Oe(),pe(),cn(),tr(),Y0=(e,t)=>({name:"Concat (packed)",inputNames:Array.from({length:e},(e,t)=>`X${t}`),inputTypes:Array(e).fill(2),cacheHint:t}),eI=(e,t,n,i)=>{let o=n[0].dims.slice();if(i>=o.length||i<-1*o.length)throw Error("axis specified for concat doesn't match input dimensionality");i<0&&(i=o.length+i);let s=o.slice(0);for(let e=1;e<n.length;e++){let t=n[e].dims.slice();for(let e=0;e<o.length;e++)if(e===i)s[i]+=t[e];else if(o[e]!==t[e])throw Error("non concat dimensions must match")}let a=s.length,u=_r("coords",a),l=Ze(a),d=dn(),p=n.map(e=>e.dims),c=St(a),h=Array(p.length-1);h[0]=p[0][i];for(let e=1;e<h.length;e++)h[e]=h[e-1]+p[e][i];let f=c[i],m=c.slice(-2),g=c.join(),b=`if (${f} < ${h[0]}) {
        return getChannel(
            getX0(${g}), vec2(${m.join()}));
        }`;for(let e=1;e<h.length;e++){let t=h[e-1];b+=`
            if (${f} < ${h[e]}  && ${f} >= ${h[e-1]}) {
              return getChannel(
                getX${e}(${Ho(c,f,t)}),
                vec2(${Ho(m,f,t)}));
            }`}let y=h.length,_=h[h.length-1];b+=`
            return getChannel(
              getX${y}(${Ho(c,f,_)}),
              vec2(${Ho(m,f,_)}));`;let v=j(e.session.backend.glContext.version),x=`
          ${d}
          float getValue(${c.map(e=>"int "+e)}) {
            ${b}
          }

          void main() {
            ${l} coords = getOutputCoords();
            int lastDim = coords.${c[a-1]};
            coords.${c[a-1]} = coords.${c[a-2]};
            coords.${c[a-2]} = lastDim;

            vec4 result = vec4(getValue(${u}), 0., 0., 0.);

            ${u[a-1]} = ${u[a-1]} + 1;
            if (${u[a-1]} < ${s[a-1]}) {
              result.g = getValue(${u});
            }

            ${u[a-2]} = ${u[a-2]} + 1;
            if (${u[a-2]} < ${s[a-2]}) {
              result.a = getValue(${u});
            }

            ${u[a-1]} = ${u[a-1]} - 1;
            if (${u[a-2]} < ${s[a-2]} &&
                ${u[a-1]} < ${s[a-1]}) {
              result.b = getValue(${u});
            }
            ${v.output} = result;
          }
        `;return{...t,output:{dims:s,type:n[0].type,textureType:2},shaderSource:x,hasMain:!0}},Op=(e,t,n)=>{let i=Y0(t.length,n.cacheKey);return{...i,get:()=>eI(e,i,t,n.axis)}},Ho=(e,t,n)=>{let i=e.indexOf(t);return e.map((e,t)=>t===i?`${e} - ${n}`:e).join()}}),Lp=$(()=>{"use strict";We(),pe(),Ep(),Cp=(e,t,n)=>(sI(t),e.session.pack&&t[0].dims.length>1?[e.run(Op(e,t,n),t)]:[e.run(rI(e,t,n),t)]),tI=(e,t)=>({name:"Concat",inputNames:Array.from({length:e},(e,t)=>`X${t}`),inputTypes:Array(e).fill(0),cacheHint:t}),nI=(e,t,n,i)=>{let o=n[0].dims.slice();if(i>=o.length||i<-1*o.length)throw Error("axis specified for concat doesn't match input dimensionality");i<0&&(i=o.length+i);let s=o.slice(0);for(let e=1;e<n.length;e++){let t=n[e].dims.slice();for(let e=0;e<o.length;e++)if(e===i)s[i]+=t[e];else if(o[e]!==t[e])throw Error("non concat dimensions must match")}let a=s.length,u=Array(n.length),l=0;for(let e=0;e<u.length;++e)l+=n[e].dims[i],u[e]=l;let d="";d=n.length<5?Dp(u):oI(u);let p=iI(n.length,a),c=aI(u),h=`
        ${p}
        ${c}
        ${d}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${i}]);

          if(textureIndex != 0) {
            indices[${i}] = indices[${i}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...t,output:{dims:s,type:n[0].type,textureType:0},shaderSource:h}},rI=(e,t,n)=>{let i=tI(t.length,n.cacheKey);return{...i,get:()=>nI(e,i,t,n.axis)}},Dp=e=>`int getTextureWhereDataResides(int index) {
      ${e.map((e,t)=>`if(index<${e}) {return ${t};}
`).join("")}
    }`,oI=e=>Dp(e),iI=(e,t)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${t}]) {`];for(let t=0;t<e;++t)0===t?n.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===e-1?n.push(`	else { return _X${t}(indices); }`):n.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return n.push("	}"),n.join(`
`)},aI=e=>{let t=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<e.length;++n)0===n?t.push(`	if (index == ${n}) { return ${e[n]}; }`):n===e.length-1?t.push(`	else { return ${e[n]}; }`):t.push(`	else if (index == ${n}) { return ${e[n]}; }`);return t.push("	}"),t.join(`
`)},kp=e=>le({axis:e.attributes.getInt("axis")}),sI=e=>{if(!e||e.length<1)throw Error("too few inputs");let t=e[0].type,n=e[0].dims.length;if("string"===t)throw Error("string tensor is not supported yet");for(let i of e){if(i.type!==t)throw Error("input tensors should be one type");if(i.dims.length!==n)throw Error("input tensors should have the same shape")}}});function uI(){return yt("abs")}function lI(){return yt("acos")}function cI(){return yt("asin")}function dI(){return yt("atan")}function pI(){return yt("ceil")}function fI(){return yt("cos")}function hI(e){let t="elu";return{body:`
  const float alpha = float(${e});

  float ${t}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function mI(){return yt("exp")}function gI(){return yt("floor")}function iu(e,t){let n="clip";return{body:`
  const float min = float(${e});
  const float max = float(${t});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function bI(){let e="indentity";return{body:`
  float ${e}_(float a) {
    return a;
  }
  vec4 ${e}_(vec4 v) {
    return v;
  }
  `,name:e,type:0}}function yI(e){let t="leakyRelu";return{body:`
  const float alpha = float(${e});

  float ${t}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function _I(){return yt("log")}function xI(){let e="neg";return{body:`
  float ${e}_(float a) {
    return -a;
  }
  vec4 ${e}_(vec4 v) {
    return -v;
  }
  `,name:e,type:0}}function wI(){let e="not";return{body:`
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
  `,name:e,type:0}}function TI(){return yt("sin")}function au(){let e="relu";return{body:`
  float ${e}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${e}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:e,type:0}}function su(){let e="sigmoid";return{body:`
  float ${e}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${e}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:e,type:0}}function vI(){return yt("sqrt")}function II(){return yt("tan")}function SI(){let e="tanh";return{body:`
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
  `,name:e,type:0}}function yt(e){return{body:`
  float ${e}_(float a) {
    return ${e}(a);
  }
  vec4 ${e}_(vec4 v) {
    return ${e}(v);
  }
  `,name:e,type:0}}var $I,Re,Rp,Np,zp,Mp,uu,Bp,Vp,AI,Fp,Gp,Up,Wp,Hp,qp,lu,jp,Kp,Xp,Zp,Jp,Qp,Yp,ef,tf,nf,rf,cu=$(()=>{"use strict";We(),xe(),vn(),Oe(),pe(),$I=(e,t,n,i)=>{let o=2*!!e.session.pack,s=j(e.session.backend.glContext.version);return{...t,output:{dims:n.dims,type:n.type,textureType:o},shaderSource:`
     ${i.body}
     void main() {
       vec4 v = ${s.texture2D}(A, TexCoords);
       v = ${i.name}_(v);
       ${s.output} = v;
     }
     `,hasMain:!0}},Re=(e,t,n,i)=>{let o=2*!!e.session.pack,s={name:n.name,inputTypes:[o],inputNames:["A"],cacheHint:i};return{...s,get:()=>$I(e,s,t,n)}},Rp=(e,t)=>[e.run(Re(e,t[0],uI()),t)],Np=(e,t)=>[e.run(Re(e,t[0],lI()),t)],zp=(e,t)=>[e.run(Re(e,t[0],cI()),t)],Mp=(e,t)=>[e.run(Re(e,t[0],dI()),t)],uu=(e,t,n)=>[e.run(Re(e,t[0],iu(n.min,n.max),n.cacheKey),t)],Bp=e=>le({min:e.attributes.getFloat("min",Qn),max:e.attributes.getFloat("max",Yn)}),Vp=(e,t)=>{let n=AI(e,t);return uu(e,[t[0]],n)},AI=(e,t)=>{if(t.length>=3&&(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)))throw Error("dynamic clip attributes are not allowed");let n=t.length>=3?t[1].numberData[0]:Qn,i=t.length>=3?t[2].numberData[0]:Yn;return le({min:n,max:i})},Fp=(e,t)=>[e.run(Re(e,t[0],pI()),t)],Gp=(e,t)=>[e.run(Re(e,t[0],fI()),t)],Up=(e,t,n)=>[e.run(Re(e,t[0],hI(n.alpha),n.cacheKey),t)],Wp=e=>le({alpha:e.attributes.getFloat("alpha",1)}),Hp=(e,t)=>[e.run(Re(e,t[0],mI()),t)],qp=(e,t)=>[e.run(Re(e,t[0],gI()),t)],lu=(e,t)=>[e.run(Re(e,t[0],bI()),t)],jp=(e,t,n)=>[e.run(Re(e,t[0],yI(n.alpha),n.cacheKey),t)],Kp=e=>le({alpha:e.attributes.getFloat("alpha",.01)}),Xp=(e,t)=>[e.run(Re(e,t[0],_I()),t)],Zp=(e,t)=>[e.run(Re(e,t[0],xI()),t)],Jp=(e,t)=>[e.run(Re(e,t[0],wI()),t)],Qp=(e,t)=>[e.run(Re(e,t[0],au()),t)],Yp=(e,t)=>[e.run(Re(e,t[0],su()),t)],ef=(e,t)=>[e.run(Re(e,t[0],TI()),t)],tf=(e,t)=>[e.run(Re(e,t[0],vI()),t)],nf=(e,t)=>[e.run(Re(e,t[0],II()),t)],rf=(e,t)=>[e.run(Re(e,t[0],SI()),t)]});function pn(e){let t;switch(e.activation){case"Relu":t=au();break;case"Sigmoid":t=su();break;case"Clip":t=iu(e.clipMin,e.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=t.name;return{activationFunction:t.body,applyActivation:`value = ${n}_(value);`}}var xr,OI,EI,of,CI,DI,sf,nr=$(()=>{"use strict";xe(),cu(),xr=e=>{let t=e.getString("activation","");if("Clip"===t){let[n,i]=e.getFloats("activation_params",[Qn,Yn]);return{activation:t,clipMax:i,clipMin:n,activationCacheKey:`${t}:${n},${i}`}}return{activation:t,activationCacheKey:t}}}),af=$(()=>{"use strict";ct(),Oe(),pe(),qo(),nr(),OI=(e,t)=>({name:"GroupedConv",inputNames:e?["X","W","Bias"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),EI=(e,t,n,i)=>{let o=t.length>2?"value += getBias(output_channel);":"",s=t[0].dims.slice(),a=t[1].dims.slice(),u=a[0]/i.group;Te.verbose("GroupedConv",`autpPad:${i.autoPad}, dilations:${i.dilations}, group:${i.group}, kernelShape:${i.kernelShape}, pads:${i.pads}, strides:${i.strides}`);let l=wr(s,a,i.dilations,i.pads,i.strides),d=j(e.session.backend.glContext.version),{activationFunction:p,applyActivation:c}=pn(i),h=`
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
    for (int wInChannel = 0; wInChannel < ${a[1]}; wInChannel++) {
      int input_channel = group_id * ${a[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${a[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${i.dilations[0]};

        if (xHeight < 0 || xHeight >= ${s[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${a[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${i.dilations[1]};
          if (xWidth < 0 || xWidth >= ${s[3]}) {
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
`;return{...n,output:{dims:l,type:t[0].type,textureType:0},shaderSource:h,hasMain:!0}},of=(e,t,n)=>{let i=OI(t.length>2,n.cacheKey);return{...i,get:()=>EI(e,t,i,n)}}}),uf=$(()=>{"use strict";Oe(),pe(),tr(),CI=e=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:e}),DI=(e,t,n,i,o,s)=>{let a=n.dims,u=i.dims,l=2,d=3,p=o.length,c=[u[1]*u[2]*u[3],o[2]*o[3]],h=u[2]*u[3],f=dn(),m=j(e.session.backend.glContext.version),g="";for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)g+=`
            blockIndex = rc.x + ${t};
            pos = rc.y + ${e};

            if(blockIndex < ${c[1]} && pos < ${c[0]}) {
              offsetY = int(blockIndex / (${o[p-1]})) * ${s.strides[0]} -
                ${s.pads[0]};
              d0 = offsetY + ${s.dilations[0]} * (imod(pos, ${h}) / ${u[2]});

              if(d0 < ${a[l]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[p-1]}) * ${s.strides[1]} -
                  ${s.pads[1]};
                d1 = offsetX + ${s.dilations[1]} * imod(imod(pos, ${h}), ${u[2]});

                if(d1 < ${a[d]} && d1 >= 0) {

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
            `;return{...t,output:{dims:c,type:n.type,textureType:2},shaderSource:b,hasMain:!0}},sf=(e,t,n,i,o)=>{let s=CI(o.cacheKey);return{...s,get:()=>DI(e,s,t,n,i,o)}}});function LI(e,t,n){let i=t[0].dims,o=t[1].dims,s=Xe.calcShape(i,o,!0);if(!s)throw Error("Can't use matmul on the given tensors");let a=Ze(s.length),u=St(),{activationFunction:l,applyActivation:d}=pn(n),p=t.length>2,c=p?"value += getBiasForMatmul();":"",h=p?`${pu(a,u,t[2].dims,s,!1)}`:"",f=s.length,m=i.length,g=o.length,b=i[i.length-1],y=`
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
    }`;return{...e,output:{dims:s,type:t[0].type,textureType:0},shaderSource:y}}function du(e,t){let n=kI(e.length>2,t.activationCacheKey);return{...n,get:()=>LI(n,e,t)}}function pu(e,t,n,i,o){let s="",a=n.length,u=i.length,l=u-a;s=u<2&&a>0?"coords":n.map((e,n)=>`coords.${t[n+l]}`).join(", ");let d=Xe.getBroadcastDims(n,i).map(e=>`coords.${t[e+l]} = 0;`).join(`
`),p=1===V.size(n),c="vec4(outputValue.xx, outputValue.yy)";return p&&(c="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${e} coords = getOutputCoords();
  ${d}
  vec4 outputValue = getBias(${s});
  return ${c};
}`:`
float getBiasForMatmul() {
  ${e} coords = getOutputCoords();
  ${d}
  return getBias(coords.x);
}`}var lf,cf,kI,RI,jo=$(()=>{"use strict";xe(),pe(),cn(),nr(),fu(),lf=(e,t,n)=>(RI(t),e.session.pack?[e.run(Ko(e,t,n),t)]:[e.run(du(t,n),t)]),cf=e=>xr(e.attributes),kI=(e,t)=>({name:"MatMul",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),RI=e=>{if(!e||2!==e.length)throw Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw Error("shared dimension does not match.");if("float32"!==e[0].type&&"float64"!==e[0].type||"float32"!==e[1].type&&"float64"!==e[1].type)throw Error("inputs should be float type");if(e[0].type!==e[1].type)throw Error("inputs types should match")}});function MI(e,t,n,i){let o=[],s=[],a=n[0].dims,u=n[1].dims,l=a.length,d=u.length,p=i.length,c=p-l,h=p-d;(o=a.map((e,n)=>`coords.${t[n+c]}`))[l-1]="i*2",o.join(", "),(s=u.map((e,n)=>`coords.${t[n+h]}`))[d-2]="i*2",s.join(", ");let f=Xe.getBroadcastDims(a,i),m=Xe.getBroadcastDims(u,i),g=f.map(e=>`coords.${t[e+c]} = 0;`).join(`
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
  vec4 outputValue = getB(${s});
  return outputValue;
}`}function BI(e,t){let n="";for(let i=0;i<t-2;i++)n+=`rc.${e[i]}, `;return n+`rc.${e[t-2]}, i*2`}function VI(e,t){let n="";for(let i=0;i<t-2;i++)n+=`rc.${e[i]}, `;return n+`i*2, rc.${e[t-1]}`}var NI,zI,Ko,df,FI,GI,ff,hu,UI,WI,hf,wr,gu,HI,qI,jI,KI,bu,XI,ZI,JI,QI,gf,YI,e2,t2,n2,r2,o2,bf,i2,_f,rr,xf,a2,wf,s2,u2,l2,Tf,vf,c2,Sf,$f,d2,Nn,Pf,Of,p2,f2,h2,m2,yu,Cf,Df,kf,g2,b2,y2,Rf,Nf,_2,x2,w2,T2,v2,Bf,Vf,Mf,I2,S2,$2,A2,P2,O2,fu=$(()=>{"use strict";xe(),Oe(),pe(),cn(),nr(),jo(),NI=(e,t)=>({name:"MatMul (packed)",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[2,2,2]:[2,2],cacheHint:t}),zI=(e,t,n,i)=>{let o=n.length>2,s=o?"value += getBiasForMatmul();":"",a=n[0].dims,u=n[1].dims,l=Xe.calcShape(a,u,!0),d=!V.areEqual(n[0].dims,n[1].dims);if(!l)throw Error("Can't use matmul on the given tensors");let p=Math.ceil(a[a.length-1]/2),c=a.length,h=u.length,f=j(e.session.backend.glContext.version),m=Ze(l.length),g=l.length,b=St(),{activationFunction:y,applyActivation:_}=pn(i),v=o?`${pu(m,b,n[2].dims,l,!0)}`:"",x=d?`${MI(m,b,n,l)}`:"",w=d?"getAAtOutCoordsMatmul(i)":`getA(${BI(b,c)})`,T=d?"getBAtOutCoordsMatmul(i)":`getB(${VI(b,h)})`,I=d?"":`${m} rc =
          getOutputCoords(); int lastDim = rc.${b[g-1]}; rc.${b[g-1]} =
          rc.${b[g-2]}; rc.${b[g-2]} = lastDim;
      `,O=`
            ${x}
            ${v}
            ${y}
            void main() {
              ${I}

              vec4 value = vec4(0);
              for (int i = 0; i < ${p}; i++) {
                vec4 a = ${w};
                vec4 b = ${T};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${s}
              ${_}
              ${f.output} = value;
            }`;return{...t,output:{dims:l,type:n[0].type,textureType:2},shaderSource:O,hasMain:!0}},Ko=(e,t,n)=>{let i=NI(t.length>2,n.activationCacheKey);return{...i,get:()=>zI(e,i,t,n)}}}),pf=$(()=>{"use strict";qo(),uf(),fu(),df=(e,t,n)=>{let i=t[0].dims,o=t[1].dims,s=wr(i,o,n.dilations,n.pads,n.strides),a=e.run(sf(e,t[0],t[1],s,n),[t[0]]),u=e.reshapePacked(t[1],[o[0],o[1]*o[2]*o[3]]),l=3===t.length?[u,a,t[2]]:[u,a],d=e.run(Ko(e,l,n),l);return e.reshapePacked(d,s)}}),mu=$(()=>{"use strict";pe(),FI=e=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:e}),GI=(e,t,n,i,o,s)=>{let a=n.dims,u=i.dims,l=o.length,d=hu(a,u,o,4),p=`
        const int XC = ${a[1]};
        const int XH = ${a[2]};
        const int XW = ${a[3]};
        const int KH = ${s.kernelShape[0]};
        const int KW = ${s.kernelShape[1]};
        const int dilationH = ${s.dilations[0]};
        const int dilationW = ${s.dilations[1]};
        const int strideH = ${s.strides[0]};
        const int strideW = ${s.strides[1]};
        const int padH = ${s.pads[0]};
        const int padW = ${s.pads[1]};
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
        `;return{...t,output:{dims:d,type:n.type,textureType:4},shaderSource:p}},ff=(e,t,n,i,o)=>{let s=FI(o.cacheKey);return{...s,get:()=>GI(e,s,t,n,i,o)}},hu=(e,t,n,i=4)=>[n[0],n[2],n[3],Math.ceil(e[1]*t[2]*t[3]/i)]}),mf=$(()=>{"use strict";xe(),Oe(),pe(),nr(),mu(),UI=(e,t)=>({name:"ConvDotProduct",inputNames:e?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:e?[0,4,0]:[0,4],cacheKey:t.activationCacheKey}),WI=(e,t,n,i,o)=>{let s=n[0].dims,a=n[1].dims,u=[a[0],Math.ceil(s[1]*a[2]*a[3]/4)],l=hu(s,a,i),[d,p]=e.calculateTextureWidthAndHeight(u,4),c=V.computeStrides(l),[h,f]=e.calculateTextureWidthAndHeight(l,4),m=i.length,g=n.length<3?"0.0":"_B(b)",b=Math.ceil(s[1]*a[2]*a[3]/4),{activationFunction:y,applyActivation:_}=pn(o),v=j(e.session.backend.glContext.version),x=`
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
}`;return{...t,output:{dims:i,type:n[0].type,textureType:0},shaderSource:x}},hf=(e,t,n,i)=>{let o=UI(t.length>2,i);return{...o,get:()=>WI(e,o,t,n,i)}}}),qo=$(()=>{"use strict";We(),xe(),af(),pf(),mf(),nr(),mu(),jo(),wr=(e,t,n,i,o)=>{let s=e[0],a=e.slice(2),u=a.length,l=t[0],d=t.slice(2).map((e,t)=>e+(e-1)*(n[t]-1));return[s,l].concat(...a.map((e,t)=>e+i[t]+i[t+u]).map((e,t)=>Math.floor((e-d[t]+o[t])/o[t])))},gu=(e,t,n)=>(XI(t,n),HI(e,t,n)),HI=(e,t,n)=>{let i=KI(n,t),o=e.session.pack,s=1===i.kernelShape[0]&&1===i.kernelShape[1];return i.group>1?[e.run(of(e,t,i),t)]:s&&o?[qI(e,t,i)]:o&&4===t[0].dims.length&&1===t[0].dims[0]&&!s?[df(e,t,i)]:[jI(e,t,i)]},qI=(e,t,n)=>{let i=t[0].dims,o=t[1].dims,s=wr(i,o,n.dilations,n.pads,n.strides),a=e.reshapeUnpacked(t[0],[i[1],i[2]*i[3]]),u=e.reshapeUnpacked(t[1],[o[0],o[1]]),l=t.length>2?[u,a,t[2]]:[u,a],d=e.run(du(l,n),l);return e.reshapeUnpacked(d,s)},jI=(e,t,n)=>{let i=t[0].dims,o=t[1].dims,s=wr(i,o,n.dilations,n.pads,n.strides),a=e.run(ff(e,t[0],t[1],s,n),[t[0]]),u=3===t.length?[a,t[1],t[2]]:[a,t[1]];return e.run(hf(e,t,s,n),u)},KI=(e,t)=>{let n=e.kernelShape.slice();if(0===e.kernelShape.length)for(let e=2;e<t[1].dims.length;++e)n.push(t[1].dims[e]);let i=e.pads.slice();Jn.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,i,e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:n,pads:i,cacheKey:e.cacheKey}),o},bu=e=>{let t=e.attributes,n=xr(t),i=t.getString("auto_pad","NOTSET"),o=t.getInts("dilations",[1,1]),s=t.getInt("group",1),a=t.getInts("kernel_shape",[]),u=t.getInts("pads",[0,0,0,0]),l=t.getInts("strides",[1,1]);return le({autoPad:i,dilations:o,group:s,kernelShape:a,pads:u,strides:l,...n})},XI=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length||4!==e[1].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims[1]!==e[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.length!==2*n)throw Error(`pads should be ${2*n}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if("float32"!==e[0].type||"float32"!==e[1].type)throw Error("Conv input(X,W) should be float tensor");if(3===e.length&&"float32"!==e[2].type)throw Error("Conv input(bias) should be float tensor")}}),yf=$(()=>{"use strict";We(),Oe(),pe(),nr(),ZI=(e,t,n,i,o,s)=>(e-1)*t+n+(i-1)*o+1-s,JI=(e,t,n,i,o)=>{let s=Math.floor(e/2);"SAME_UPPER"===t?(n[i]=s,n[o]=e-s):"SAME_LOWER"===t&&(n[i]=e-s,n[o]=s)},QI=(e,t,n,i,o,s,a,u)=>{let l=e.length-2,d=0===u.length;for(let p=0;p<l;++p){let c=d?e[p+2]*s[p]:u[p];JI(ZI(e[p+2],s[p],o[p],t[p],n[p],c),i,o,p,p+l),d&&u.push(s[p]*(e[p+2]-1)+a[p]+(t[p]-1)*n[p]+1-o[p]-o[p+l])}},gf=(e,t,n)=>(i2(t,n),YI(e,t,n)),YI=(e,t,n)=>{let i=o2(n,t);return[r2(e,t,i)]},e2=(e,t)=>({name:"ConvTranspose",inputNames:e?["X","W","B"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),t2=(e,t,n,i)=>{let o=t.length>2?"getB(output_channel)":"0.0",s=t[0].dims,a=t[1].dims,u=a[1],l=a[0]/i.group,d=[t[0].dims[0],t[1].dims[1]*i.group,...i.outputShape],p=j(e.session.backend.glContext.version),{activationFunction:c,applyActivation:h}=pn(i),f=`
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
      for (int wWOff = 0; wWOff < ${a[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${a[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${i.dilations[0]}, wHOff * ${i.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${s[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${s[3]}
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
`;return{...n,output:{dims:d,type:t[0].type,textureType:0},shaderSource:f,hasMain:!0}},n2=(e,t,n)=>{let i=e2(t.length>2,n.cacheKey);return{...i,get:()=>t2(e,t,i,n)}},r2=(e,t,n)=>e.run(n2(e,t,n),t),o2=(e,t)=>{let n=e.kernelShape.slice();if(0===e.kernelShape.length)for(let e=2;e<t[1].dims.length;++e)n.push(t[1].dims[e]);let i=e.pads.slice(),o=e.outputShape.slice();QI(t[0].dims,n,e.dilations,e.autoPad,i,e.strides,e.outputPadding,o);let s=Object.assign({},e);return Object.assign(s,{kernelShape:n,pads:i,outputShape:o,cacheKey:e.cacheKey}),s},bf=e=>{let t=e.attributes,n=xr(t),i=t.getString("auto_pad","NOTSET"),o=t.getInts("dilations",[1,1]),s=t.getInt("group",1),a=t.getInts("kernel_shape",[]),u=t.getInts("output_padding",[0,0]),l=t.getInts("output_shape",[]),d=t.getInts("pads",[0,0,0,0]),p=t.getInts("strides",[1,1]);return le({autoPad:i,dilations:o,group:s,kernelShape:a,outputPadding:u,outputShape:l,pads:d,strides:p,...n})},i2=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length||4!==e[1].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims[1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==n))throw Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw Error(`strides should be ${i}D`);if(t.pads.length!==2*i)throw Error(`pads should be ${2*i}D`);if(t.outputPadding.length!==i)throw Error(`output_padding should be ${i}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape");if("float32"!==e[0].type||"float32"!==e[1].type)throw Error("ConvTranspose input(X,W) should be float tensor");if(3===e.length&&"float32"!==e[2].type)throw Error("ConvTranspose input(bias) should be float tensor")}}),Xo=$(()=>{"use strict";We(),xe(),pe(),_f={name:"Transpose",inputNames:["A"],inputTypes:[0]},rr=(e,t,n)=>(l2(t),[e.run({..._f,cacheHint:n.cacheKey,get:()=>a2(e,t[0],n.perm)},t)]),xf=e=>le({perm:e.attributes.getInts("perm",[])}),a2=(e,t,n)=>{let i=t.dims;n=wf(i,n);let o=s2(i,n),s=i.length,a=`
      ${u2("perm",n,s)}
      float process(int indices[${s}]) {
        int a[${s}];
        perm(a, indices);
        return _A(a);
      }`;return{..._f,output:{dims:o,type:t.type,textureType:0},shaderSource:a}},wf=(e,t)=>(t&&t.length!==e.length&&(t=[...e.keys()].reverse()),t),s2=(e,t)=>(t=wf(e,t),V.sortBasedOnPerm(e,t)),u2=(e,t,n)=>{let i=[];i.push(`void ${e}(out int a[${n}], int src[${n}]) {`);for(let e=0;e<n;++e)i.push(`	a[${t[e]}]=src[${e}];`);return i.push("	}"),i.join(`
`)},l2=e=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("input should be float tensor")}}),If=$(()=>{"use strict";Xo(),Tf=(e,t,n)=>{c2(t);let i=n.blocksize,o=i*i,s="DCR"===n.mode?[0,3,4,1,5,2]:[0,1,4,2,5,3],a="DCR"===n.mode?[t[0].dims[0],i,i,t[0].dims[1]/o,t[0].dims[2],t[0].dims[3]]:[t[0].dims[0],t[0].dims[1]/o,i,i,t[0].dims[2],t[0].dims[3]],u=e.reshapeUnpacked(t[0],a),l={perm:s,cacheKey:`${s}`},[d]=rr(e,[u],l),p=[t[0].dims[0],t[0].dims[1]/o,t[0].dims[2]*i,t[0].dims[3]*i];return[e.reshapeUnpacked(d,p)]},vf=e=>{let t=e.attributes.getInt("blocksize");if(t<1)throw Error(`blocksize must be >= 1, but got : ${t} for DepthToSpace`);let n=e.attributes.getString("mode","DCR");if("DCR"!==n&&"CRD"!==n)throw Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:t}},c2=e=>{if(1!==e.length)throw Error(`DepthToSpace expect 1 inputs, but got ${e.length}`);if("string"===e[0].type||4!==e[0].dims.length)throw TypeError("DepthToSpace input should be a 4-D numeric tensor")}}),Af=$(()=>{"use strict";xe(),Sf=(e,t,n)=>{d2(t,n);let i=V.flattenShape(t[0].dims,n);return[e.reshapeUnpacked(t[0],i)]},$f=e=>e.attributes.getInt("axis",1),d2=(e,t)=>{if(!e||1!==e.length)throw Error("Flatten requires 1 input.");let n=e[0].dims.length;if(0===n)throw Error("scalar tensor is not supported.");if(t<-n||t>n)throw Error("Invalid axis");if("string"===e[0].type)throw Error("string tensor is not supported.")}}),jr=$(()=>{"use strict";Nn=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]}),Ef=$(()=>{"use strict";We(),jr(),xe(),pe(),Pf=(e,t,n)=>(m2(t,n.axis),[e.run(h2(e,t,n),t)]),Of=e=>le({axis:e.attributes.getInt("axis",0)}),p2={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},f2=(e,t,n,i)=>{let o=n[0].dims.slice(),s=n[1].dims.slice(),a=Array(o.length+s.length-1);i=V.normalizeAxis(i,o.length);let u=[];for(let e=0;e<a.length;e++)e<i?(a[e]=o[e],u.push(`inputIdx[${e}] = outputIdx[${e}];`)):e<i+s.length?(a[e]=s[e-i],u.push(`indexDataIdx[${e-i}] = outputIdx[${e}];`)):(a[e]=o[e-s.length+1],u.push(`inputIdx[${e-s.length+1}] = outputIdx[${e}];`));let l=a.length||1,d=o.length,p=s.length||1,c=`
      float process(int outputIdx[${l}]) {
        int inputIdx[${d}];
        int indexDataIdx[${p}];
        indexDataIdx[0] = 0;
        ${u.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${i}] = idx < 0 ? idx + ${o[i]} : idx;
        return _A(inputIdx);
      }`;return{...t,output:{dims:a,type:n[0].type,textureType:0},shaderSource:c}},h2=(e,t,n)=>{let i={...p2,cacheHint:n.cacheKey};return{...i,get:()=>f2(e,i,t,n.axis)}},m2=(e,t)=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.");let n=e[0].dims.length;if(n<1)throw Error("Invalid input shape.");if(t<-n||t>n-1)throw Error("Invalid axis.");if(-1===Nn.indexOf(e[0].type)||"int32"!==e[1].type&&"int16"!==e[1].type)throw Error("Invaid input type.")}}),Lf=$(()=>{"use strict";We(),xe(),pe(),yu=(e,t,n)=>(y2(t,n),[e.run(g2(t,n),t)]),Cf=(e,t)=>{let n=0!==e.attributes.getInt("transA",0),i=0!==e.attributes.getInt("transB",0),o=e.attributes.getFloat("alpha",1),s=e.attributes.getFloat("beta",1);return le({transA:n,transB:i,alpha:o,beta:s,isOptionalC:t})},Df=e=>Cf(e,!1),kf=e=>Cf(e,!0),g2=(e,t)=>{let n={name:"Gemm",inputNames:3===e.length?["A","B","C"]:["A","B"],inputTypes:3===e.length?[0,0,0]:[0,0],key:t.cacheKey};return{...n,get:()=>b2(n,e,t)}},b2=(e,t,n)=>{let i=t[0].dims.slice(),o=t[1].dims.slice(),[s,a]=Mo.getShapeOfGemmResult(i,n.transA,o,n.transB,3===t.length?t[2].dims:void 0),u=[s,a];if(!u)throw Error("Can't use gemm on the given tensors");let l=i[i.length-1],d="";n.transA&&(l=i[0]),n.transA&&n.transB?d="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?d="value += _A_T(a) * _B(b);":!n.transA&&n.transB?d="value += _A(a) * _B_T(b);":n.transA||n.transB||(d="value += _A(a) * _B(b);");let p=u.length,c=3===t.length?`int c[${t[2].dims.length}];`:"",h=3===t.length?"bcastIndices_C(indices, c);":"",f=3===t.length?"value += beta * _C(c);":"",m=`
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
      }`;return{...e,output:{dims:u,type:t[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:m}},y2=(e,t)=>{if(!e)throw Error("Input is missing");if(t.isOptionalC&&(e.length<2||e.length>3))throw Error("Invaid input shape.");if(!t.isOptionalC&&3!==e.length)throw Error("Gemm requires 3 inputs");if(3===e.length&&1!==e[2].dims.length&&2!==e[2].dims.length)throw Error("Invalid input shape of C");if("float32"!==e[0].type&&"float64"!==e[0].type||"float32"!==e[1].type&&"float64"!==e[1].type||3===e.length&&"float32"!==e[2].type&&"float64"!==e[2].type)throw Error("Invalid input type.");if(e[0].type!==e[1].type||3===e.length&&e[0].type!==e[2].type)throw Error("Input types are mismatched")}}),zf=$(()=>{"use strict";We(),pe(),Rf=(e,t,n)=>(v2(t),[e.run(w2(e,t,n),t)]),Nf=e=>{let t=e.attributes.getFloat("scale"),n=e.attributes.getFloats("bias");return le({scale:t,bias:n})},_2={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},x2=(e,t,n,i)=>{let o=n[0].dims.slice(),s=o.length,a=`
      ${T2(i.bias.length)}
      float process(int indices[${s}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...t,output:{dims:o,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:i.bias.length,data:i.bias},{name:"scale",type:"float",data:i.scale}],shaderSource:a}},w2=(e,t,n)=>{let i={..._2,cacheHint:n.cacheKey};return{...i,get:()=>x2(e,i,t,n)}},T2=e=>{let t=[`float getBias(float bias[${e}], int channel) {`];for(let n=0;n<e;++n)0===n?t.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===e-1?t.push(`	else { return bias[${n}]; }`):t.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return t.push("	}"),t.join(`
`)},v2=e=>{if(!e||1!==e.length)throw Error("ImageScaler requires 1 input.");if(4!==e[0].dims.length)throw Error("Invalid input shape.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")}}),Ff=$(()=>{"use strict";Oe(),pe(),Bf=(e,t,n)=>{O2(t);let i=e.run(S2(t[0]),t);return[e.run(P2(e,t[0],n,i.dims),[t[0],i,t[1],t[2]])]},Vf=e=>e.attributes.getFloat("epsilon",1e-5),Mf={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},I2=(e,t)=>{let n=t.dims.slice(),i=n[1],o=n[2]*n[3],s=[n[0],i],a=`
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
      }`;return{...e,output:{dims:s,type:t.type,textureType:4},shaderSource:a}},S2=e=>({...Mf,get:()=>I2(Mf,e)}),$2={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},A2=(e,t,n,i,o)=>{let s=j(e.session.backend.glContext.version),[a,u]=e.calculateTextureWidthAndHeight(o,4),[l,d]=[a/4,u],p=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${l}, ${d});
        return ${s.texture2D}(MeanAndVariance, coords);
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
      }`;return{...t,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:i}],shaderSource:p}},P2=(e,t,n,i)=>{let o={...$2,cacheHint:`${n}`};return{...o,get:()=>A2(e,o,t,n,i)}},O2=e=>{if(!e||3!==e.length)throw Error("InstanceNormalization requires 3 inputs.");let t=e[0],n=e[1],i=e[2];if(t.dims.length<3||1!==n.dims.length||1!==i.dims.length)throw Error("Invalid input shape.");if(n.dims[0]!==t.dims[1]||i.dims[0]!==t.dims[1])throw Error("Input shapes are mismatched.");if("float32"!==t.type&&"float64"!==t.type||"float32"!==n.type&&"float64"!==n.type||"float32"!==i.type&&"float64"!==i.type)throw Error("Invalid input type.");if(4!==e[0].dims.length)throw Error("Only support 4-D input shape.")}});function E2(e,t){let n=e[0].dims[1],i=e[0].dims.length,o=-Math.floor((t.size-1)/2),s=Math.ceil((t.size-1)/2),a=`float(${t.alpha}) / float(${t.size})`,u=`float(${t.bias})`,l=`float(${t.beta})`,d=`
    float process(int indices[${i}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${o}; i <= ${s}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${n}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${u} + ${a} * square_sum, ${l});
    }`;return{...Wf,cacheHint:t.cacheKey,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:d}}function C2(e,t){return{...Wf,cacheHint:t.cacheKey,get:()=>E2(e,t)}}var Gf,Uf,Wf,D2,k2,_u,qf,jf,Kf,L2,R2,N2,z2,M2,B2,V2,F2,Jf,Qf,Yf,eh,th,nh,rh,oh,ih,G2,Zf,ah,Jo,sh,Zo,U2,or,zn,W2,H2,lh,ch,dh,ph,fh,hh,mh,bh,_h,xu,xh,wh,Kr,q2,wu,Qo,vu,Iu,Th,vh,j2,K2,X2,Z2,Sh,J2,Su,Ah,Ph,Oh,Q2,Eh,Y2,eS,Dh,kh,Lh,Rh,Nh,zh,Mh,Bh,tS,nS,rS,Vh,Gh,Uh,Wh,oS,iS,aS,$u,qh,jh,sS,uS,Xh,lS,cS,Jh,dS,pS,Au,Yh,em,fS,hS,nm,Hf=$(()=>{"use strict";We(),pe(),Gf=(e,t,n)=>(D2(t),[e.run(C2(t,n),t)]),Uf=e=>{let t=e.attributes.getFloat("alpha",1e-4),n=e.attributes.getFloat("beta",.75),i=e.attributes.getFloat("bias",1),o=e.attributes.getInt("size");return le({alpha:t,beta:n,bias:i,size:o})},Wf={name:"LRN",inputNames:["X"],inputTypes:[0]},D2=e=>{if(!e||1!==e.length)throw Error("LRN requires 1 input.");if(4!==e[0].dims.length)throw Error('currently only support LRN for input with "NCHW" format');if("float32"!==e[0].type)throw Error("input should be float type")}}),Xf=$(()=>{"use strict";We(),xe(),Oe(),pe(),k2={name:"Pad",inputNames:["A"],inputTypes:[0]},_u=(e,t,n)=>(N2(t),[e.run({...k2,cacheHint:n.cacheKey,get:()=>R2(e,t[0],n)},t)]),qf=e=>{let t=e.attributes.getString("mode","constant"),n=e.attributes.getFloat("value",0),i=e.attributes.getInts("pads");return le({mode:t,value:n,pads:i})},jf=(e,t,n)=>{z2(t);let i=L2(e,t,n);return _u(e,[t[0]],i)},Kf=e=>e.attributes.getString("mode","constant"),L2=(e,t,n)=>{if(!e.session.isInitializer(t[1].dataId)||t.length>=3&&!e.session.isInitializer(t[2].dataId))throw Error("dynamic pad attributes are not allowed");let i=Array.from(t[1].integerData),o=t.length>=3?t[2].floatData[0]:0;return le({mode:n,pads:i,value:o})},R2=(e,t,n)=>{let i=V.padShape(t.dims.slice(),n.pads),o=i.length,s=`
      ${M2(e,t,n)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:i,type:t.type,textureType:0},shaderSource:s}},N2=e=>{if(!e||1!==e.length)throw Error("Pad requires 1 input");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")},z2=e=>{if(!e||2!==e.length&&3!==e.length)throw Error("Pad requires 2 or 3 inputs");if("int32"!==e[1].type||e.length>=3&&"string"===e[2].type)throw Error("Invalid input type.")},M2=(e,t,n)=>{let i=j(e.session.backend.glContext.version),[o,s]=e.calculateTextureWidthAndHeight(t.dims,0),a=V.computeStrides(t.dims);switch(n.mode){case"constant":return B2(i,t.dims,a,o,s,n.pads,n.value);case"reflect":return V2(i,t.dims,a,o,s,n.pads);case"edge":return F2(i,t.dims,a,o,s,n.pads);default:throw Error("Invalid mode")}},B2=(e,t,n,i,o,s,a)=>{let u=t.length,l="";for(let e=u-1;e>=0;--e)l+=`
        k = m[${e}] - ${s[e]};
        if (k < 0)  return constant;
        if (k >= ${t[e]}) return constant;
        offset += k * ${n[e]};
        `;return`
      float padA(int m[${u}]) {
        const float constant = float(${a});
        int offset = 0;
        int k = 0;
        ${l}
        vec2 coords = offsetToCoords(offset, ${i}, ${o});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},V2=(e,t,n,i,o,s)=>{let a=t.length,u="";for(let e=a-1;e>=0;--e)u+=`
        k = m[${e}] - ${s[e]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(t[e]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${t[e]}) { k = _2n_1 - k; }
        }
        offset += k * ${n[e]};
        `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${i}, ${o});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},F2=(e,t,n,i,o,s)=>{let a=t.length,u="";for(let e=a-1;e>=0;--e)u+=`
        k = m[${e}] - ${s[e]};
        if (k < 0)  k = 0;
        if (k >= ${t[e]}) k = ${t[e]-1};
        offset += k * ${n[e]};
      `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${i}, ${o});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `}}),uh=$(()=>{"use strict";We(),xe(),pe(),Jf=(e,t,n)=>{Jo(t);let i={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[e.run({...i,get:()=>Yf(t,i,!1,n)},t)]},Qf=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),n=e.attributes.getInt("ceil_mode",0),i=0!==e.attributes.getInt("count_include_pad",0),o=e.attributes.getInts("kernel_shape"),s=e.attributes.getInts("strides",[]),a=e.attributes.getInts("pads",[]);if(0!==n)throw Error("using ceil() in shape computation is not yet supported for AveragePool");return le({autoPad:t,ceilMode:n,countIncludePad:i,kernelShape:o,strides:s,pads:a})},Yf=(e,t,n,i)=>{let[o,s]=ih(e,i,n),a=V.size(o.kernelShape),u="value += _X(x);",l="";o.countIncludePad?l+=`value /= float(${a});`:l+=`value /= float(${a} - pad);`;let d=`
        ${sh(e[0].dims,o,u,l,"0.0")}
      `;return{...t,output:{dims:s,type:e[0].type,textureType:0},shaderSource:d}},eh=(e,t,n)=>{Jo(t);let i={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[e.run({...i,get:()=>Yf(t,i,!0,n)},t)]},th=e=>{let t=0!==e.attributes.getInt("count_include_pad",0);return le({autoPad:"",ceilMode:0,countIncludePad:t,kernelShape:[],strides:[],pads:[]})},nh=(e,t,n)=>{Jo(t);let i={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[e.run({...i,get:()=>oh(t,i,!1,n)},t)]},rh=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),n=e.attributes.getInt("ceil_mode",0),i=e.attributes.getInts("kernel_shape"),o=e.attributes.getInts("strides",[]),s=e.attributes.getInts("pads",[]),a=e.attributes.getInt("storage_order",0),u=e.attributes.getInts("dilations",[]);if(0!==a)throw Error("column major storage order is not yet supported for MaxPool");if(0!==n)throw Error("using ceil() in shape computation is not yet supported for MaxPool");return le({autoPad:t,ceilMode:n,countIncludePad:!1,kernelShape:i,strides:o,pads:s,storageOrder:a,dilations:u})},oh=(e,t,n,i)=>{let[o,s]=ih(e,i,n),a=`
      ${sh(e[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...t,output:{dims:s,type:e[0].type,textureType:0},shaderSource:a}},ih=(e,t,n)=>{let i=e[0].dims.slice(),o=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),a=t.strides.slice(),u=o?t.dilations.slice():[],l=t.pads.slice();Jn.adjustPoolAttributes(n,i,s,a,u,l);let d=Jn.computePoolOutputShape(n,i,a,u,s,l,t.autoPad),p=Object.assign({},t);return o?Object.assign(p,{kernelShape:s,strides:a,pads:l,dilations:u,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:s,strides:a,pads:l,cacheKey:t.cacheKey}),[p,d]},G2={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Zf={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},ah=(e,t)=>(Jo(t),[e.run({...Zf,get:()=>oh(t,Zf,!0,G2)},t)]),Jo=e=>{if(!e||1!==e.length)throw Error("Pool ops requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")},sh=(e,t,n,i,o)=>{let s=e.length;if(t.kernelShape.length<=2){let a=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],l=t.pads[t.pads.length/2-1],d=t.pads[t.pads.length-1],p=e[s-1],c="",h="",f="";if(c=l+d!==0?`
          for (int i = 0; i < ${a}; i++) {
            x[${s} - 1] = indices[${s} - 1] * ${u} - ${l} + i;
            if (x[${s} - 1] < 0 || x[${s} - 1] >= ${p}) {
              pad++;
              continue;
            }
            ${n}
          }`:`
          for (int i = 0; i < ${a}; i++) {
            x[${s} - 1] = indices[${s} - 1] * ${u} - ${l} + i;
            ${n}
          }`,2===t.kernelShape.length){let n=t.kernelShape[t.kernelShape.length-2],i=t.strides[t.strides.length-2],o=t.pads[t.pads.length/2-2],u=t.pads[t.pads.length-2],l=e[s-2];h=o+u!==0?`
            for (int j = 0; j < ${n}; j++) {
              x[${s} - 2] = indices[${s} - 2] * ${i} - ${o} + j;
              if (x[${s} - 2] < 0 || x[${s} - 2] >= ${l}) {
                pad+= ${a};
                continue;
              }
          `:`
            for (int j = 0; j < ${n}; j++) {
              x[${s} - 2] = indices[${s} - 2] * ${i} - ${o} + j;
            `,f=`
          }
        `}return`
        float process(int indices[${s}]) {
          int x[${s}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${h}
          ${c}
          ${f}
          ${i}
          return value;
        }
      `}{let a=V.size(t.kernelShape),u=V.computeStrides(t.kernelShape),l=u.length,d=t.pads.length,p=U2(l),c=Zo(e,"inputDims"),h=Zo(t.pads,"pads"),f=Zo(u,"kernelStrides"),m=Zo(t.strides,"strides"),g=t.pads.reduce((e,t)=>e+t),b="";return b=g?`
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
        float process(int indices[${s}]) {
          int x[${s}];
          copyVec(indices, x);
          int offset[${l}];
          int pads[${d}];
          int inputDims[${s}];
          int kernelStrides[${l}];
          int strides[${l}];
          ${h}
          ${c}
          ${m}
          ${f}

          float value = ${o};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${a}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${s} - ${l}; j < ${s}; j++) {
              x[j] = indices[j] * strides[j - ${s} + ${l}]
                + offset[j - ${s} + ${l}] - pads[j - 2];
              ${b}
          }
          ${i}

          return value;
        }
      `}},Zo=(e,t)=>{let n="";for(let i=0;i<e.length;i++)n+=`
      ${t}[${i}] = ${e[i]};
    `;return n},U2=e=>`
  void offsetToIndices(int offset, int[${e}] strides, out int[${e}] indices) {
    if (${e} == 0) {
      return;
    }
    for (int i = 0; i < ${e} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${e} - 1] = offset;
  }`}),gh=$(()=>{"use strict";We(),jr(),xe(),pe(),or=(e,t,n,i,o)=>{H2(t);let s={name:i,inputNames:["A"],inputTypes:[0]};return[e.run({...s,cacheHint:n.cacheKey,get:()=>W2(e,t,n,i,o,s)},t)]},zn=e=>{let t=e.attributes.getInts("axes",[]),n=1===e.attributes.getInt("keepdims",1);return le({axes:t,keepDims:n})},W2=(e,t,n,i,o,s)=>{let a=[],u=t[0].dims.length||1,l=[],d=V.normalizeAxes(n.axes,t[0].dims.length),p=o(t,d),c=p[1];for(let e=0;e<t[0].dims.length;e++)d.indexOf(e)>=0||0===d.length?(n.keepDims&&a.push(1),c=`
          for(int j${e} = 0; j${e} < ${t[0].dims[e]}; j${e}++) {
            inputIdx[${e}] = j${e};
            ${c}
          }`):(l.push(`inputIdx[${e}] = outputIdx[${a.length}];`),a.push(t[0].dims[e]));let h=`
      float process(int outputIdx[${a.length||1}]) {
        float value;                 // final result
        int inputIdx[${u}];      // addressing input data
        ${l.join(`
`)}
        ${p[0]}       // init ops for reduce max/min
        ${c}
        ${p[2]}       // final computation for reduce mean
        return value;
      }`;return{...s,output:{dims:a,type:t[0].type,textureType:0},shaderSource:h}},H2=e=>{if(!e||1!==e.length)throw Error("Reduce op requires 1 input.");if(-1===Nn.indexOf(e[0].type))throw Error("Invalid input type.")},lh=(e,t,n)=>or(e,t,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),ch=(e,t,n)=>or(e,t,n,"ReduceMean",(e,t)=>{let n=1;for(let i=0;i<e[0].dims.length;i++)(t.indexOf(i)>=0||0===t.length)&&(n*=e[0].dims[i]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${n}.;`]}),dh=(e,t,n)=>or(e,t,n,"ReduceMax",(e,t)=>{let n=[];for(let i=0;i<e[0].dims.length;i++)(t.indexOf(i)>=0||0===t.length)&&n.push(`inputIdx[${i}] = 0;`);return[`${n.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),ph=(e,t,n)=>or(e,t,n,"ReduceMin",(e,t)=>{let n=[];for(let i=0;i<e[0].dims.length;i++)(t.indexOf(i)>=0||0===t.length)&&n.push(`inputIdx[${i}] = 0;`);return[`${n.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),fh=(e,t,n)=>or(e,t,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),hh=(e,t,n)=>or(e,t,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),mh=(e,t,n)=>or(e,t,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])}),yh=$(()=>{"use strict";xe(),bh=(e,t)=>{let n=V.calculateReshapedDims(t[0].dims,t[1].integerData);return e.session.pack?[e.reshapePacked(t[0],n)]:[e.reshapeUnpacked(t[0],n)]}}),Tu=$(()=>{"use strict";We(),Oe(),pe(),_h={name:"Upsample",inputNames:["X"],inputTypes:[0]},xu=(e,t,n)=>(wu(t,n),[e.run({..._h,cacheHint:n.cacheKey,get:()=>q2(e,t,n)},t)]),xh=e=>Kr(e,7),wh=e=>Kr(e,9),Kr=(e,t)=>{let n=t>=10,i=e.attributes.getString("mode","nearest");if("nearest"!==i&&"linear"!==i&&(t<11||"cubic"!==i))throw Error(`unrecognized mode: ${i}`);let o=[];t<9&&(o=e.attributes.getFloats("scales"),Qo(o,i,n));let s=e.attributes.getFloat("extrapolation_value",0),a=t>10?e.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(-1===["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a))throw Error(`coordinate_transform_mode '${a}' is not supported`);let u="tf_crop_and_resize"===a,l=u,d="nearest"===i&&t>=11?e.attributes.getString("nearest_mode","round_prefer_floor"):"";if(-1===["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(d))throw Error(`nearest_mode '${d}' is not supported`);let p=e.attributes.getFloat("cubic_coeff_a",-.75),c=0!==e.attributes.getInt("exclude_outside",0);if(c&&"cubic"!==i)throw Error("exclude_outside can be set to 1 only when mode is CUBIC.");let h=t<11||"nearest"===i&&"asymmetric"===a&&"floor"===d,f=0,m=0,g=0;return t>10?e.inputs.length>2?(f=1,m=2,g=3):(m=1,g=2):9===t&&(m=1),le({opset:t,isResize:n,mode:i,scales:o,extrapolationValue:s,coordinateTransformMode:a,useExtrapolation:l,needRoiInput:u,nearestMode:d,cubicCoefficientA:p,excludeOutside:c,useNearest2xOptimization:h,roiInputIdx:f,scalesInputIdx:m,sizesInputIdx:g})},q2=(e,t,n)=>{let i=j(e.session.backend.glContext.version),[o,s]=e.calculateTextureWidthAndHeight(t[0].dims,0),a=t[0].dims.map((e,t)=>Math.floor(e*n.scales[t])),[u,l]=e.calculateTextureWidthAndHeight(a,0),d=a.length,p=Array(d),c=Array(d),h=`
      int output_pitches[${d}];
      int input_pitches[${d}];
      `;for(let e=d-1;e>=0;e--)p[e]=e===d-1?1:p[e+1]*a[e+1],c[e]=e===d-1?1:c[e+1]*t[0].dims[e+1],h+=`
        output_pitches[${e}] = ${p[e]};
        input_pitches[${e}] = ${c[e]};
        `;let f=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${s});
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
    }`;return{..._h,output:{dims:a,type:t[0].type,textureType:0},shaderSource:m,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(e=>Math.ceil(e))}]}},wu=(e,t)=>{if(!e||t.opset<9&&1!==e.length||t.opset>=9&&t.opset<11&&2!==e.length||t.opset>=11&&e.length<2)throw Error("invalid inputs.");if(t.scales.length>0&&e[0].dims.length!==t.scales.length)throw Error("Invalid input shape.");if("string"===e[0].type)throw Error("Invalid input tensor types.")},Qo=(e,t,n)=>{if(n){for(let t of e)if(t<=0)throw Error("Scale value should be greater than 0.")}else for(let t of e)if(t<1)throw Error("Scale value should be greater than or equal to 1.");if(("linear"===t||"cubic"===t)&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1]))throw Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}}),Ih=$(()=>{"use strict";Oe(),pe(),cn(),tr(),Tu(),vu={name:"Resize",inputNames:["A"],inputTypes:[2]},Iu=(e,t,n)=>(wu(t,n),[e.run({...vu,cacheHint:n.cacheKey,get:()=>j2(e,t,n)},t)]),Th=e=>Kr(e,10),vh=e=>Kr(e,11),j2=(e,t,n)=>{let i=j(e.session.backend.glContext.version),[o,s]=K2(t,n);if(o.every(e=>1===e)&&"tf_crop_and_resize"!==n.coordinateTransformMode)return{...vu,output:{dims:s,type:t[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${i.texture2D}(X, TexCoords);
                    ${i.output} = v;
                }`};let a=s.length;if(a<2)throw Error(`output dimension should be at least 2, but got ${a}`);let u=s[a-2],l=s[a-1],d=t[0].dims;if(a!==d.length)throw Error(`output dimension should match input ${d.length}, but got ${a}`);let p=d[a-2],c=d[a-1],h=o[a-2],f=o[a-1],m="";if("linear"!==n.mode)throw Error(`resize (packed) does not support mode: '${n.mode}'`);switch(n.coordinateTransformMode){case"asymmetric":m=`
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
                `;break;default:throw Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let g=Ze(a),b=dn(),y=`
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
        `;return{...vu,output:{dims:s,type:t[0].type,textureType:2},hasMain:!0,shaderSource:y}},K2=(e,t)=>{let n=e[0].dims,i=t.scales,o;if(0===i.length){let s=e[t.scalesInputIdx];if(s&&0!==s.size){if(e[t.sizesInputIdx])throw Error("Only one of scales or sizes must be provided as input.");i=X2(s,t.mode,t.isResize)}else{let s=e[t.sizesInputIdx];if(!s||0===s.size)throw Error("Either scales or sizes MUST be provided as input.");o=Array.from(s.integerData),i=Z2(o,n,t.mode,t.isResize)}}else if(e[t.sizesInputIdx])throw Error("Only one of scales or sizes must be provided as input.");let s=o||n.map((e,t)=>Math.floor(e*i[t]));return[i,s]},X2=(e,t,n)=>{let i=Array.from(e.floatData);return Qo(i,t,n),i},Z2=(e,t,n,i)=>{let o=t.length,s=Array(o);for(let n=0,i=o;n<i;n++)if(0===t[n]){if(0!==e[n])throw Error("Input dim is zero but required output dim is non-zero.");s[n]=1}else s[n]=e[n]/t[n];return Qo(s,n,i),s}}),$h=$(()=>{"use strict";er(),Sh=(e,t)=>(J2(t),[new Ne([t[0].dims.length],"int32",void 0,void 0,new Int32Array(t[0].dims))]),J2=e=>{if(!e||1!==e.length)throw Error("Shape requires 1 input.")}}),Ch=$(()=>{"use strict";We(),jr(),xe(),pe(),Su={name:"Slice",inputNames:["A"],inputTypes:[0]},Ah=(e,t,n)=>(Q2(t),[e.run({...Su,cacheHint:n.cacheKey,get:()=>Oh(e,t[0],n)},t)]),Ph=e=>{let t=e.attributes.getInts("starts"),n=e.attributes.getInts("ends"),i=e.attributes.getInts("axes",[]);return le({starts:t,ends:n,axes:i})},Oh=(e,t,n)=>{let i=0===n.axes.length?t.dims.slice(0).map((e,t)=>t):n.axes,o=V.normalizeAxes(i,t.dims.length),s=n.starts.map((e,n)=>e>t.dims[o[n]]-1?t.dims[o[n]]:V.normalizeAxis(e,t.dims[o[n]])),a=n.ends.map((e,n)=>e>t.dims[o[n]]-1?t.dims[o[n]]:V.normalizeAxis(e,t.dims[o[n]])),u=t.dims.slice(),l=[];for(let e=0;e<o.length;e++)u[o[e]]=a[e]-s[e],s[e]>0&&l.push(`outputIdx[${o[e]}] += ${s[e]};`);let d=`
      float process(int outputIdx[${u.length}]) {
        ${l.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Su,output:{dims:u,type:t.type,textureType:0},shaderSource:d}},Q2=e=>{if(!e||1!==e.length)throw Error("Slice requires 1 input.");if(-1===Nn.indexOf(e[0].type))throw Error("Invalid input type.")},Eh=(e,t)=>{eS(t);let n=Y2(e,t);return[e.run({...Su,cacheHint:n.cacheKey,get:()=>Oh(e,t[0],n)},[t[0]])]},Y2=(e,t)=>{if(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)||t.length>=4&&!e.session.isInitializer(t[3].dataId)||t.length>=5&&!e.session.isInitializer(t[4].dataId))throw Error("dynamic slice attributes are not allowed");if(t.length>=5&&t[4].integerData.some(e=>1!==e))throw Error("currently non-1 steps is not supported for Slice");let n=Array.from(t[1].integerData),i=Array.from(t[2].integerData),o=t.length>=4?Array.from(t[3].integerData):[],s=`${o};${n};${i}`;return{starts:n,ends:i,axes:o,cacheKey:s}},eS=e=>{if(!e||e.length<3||e.length>5)throw Error("Invalid input number.");if("int32"!==e[1].type||1!==e[1].dims.length||"int32"!==e[2].type||1!==e[2].dims.length||e.length>=4&&("int32"!==e[3].type||1!==e[3].dims.length)||e.length>=5&&("int32"!==e[4].type||1!==e[4].dims.length))throw Error("Invalid input type.")}}),Fh=$(()=>{"use strict";We(),xe(),Oe(),pe(),Xo(),Dh={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},kh={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},Lh={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},Rh=(e,t,n)=>{Vh(t);let i=t[0].dims.slice(),o=V.normalizeAxis(n.axis,i.length),s=V.sizeToDimension(i,o),a=V.sizeFromDimension(i,o);return Bh(e,t,n,s,a)},Nh=e=>le({axis:e.attributes.getInt("axis",1)}),zh=e=>le({axis:e.attributes.getInt("axis",-1)}),Mh=(e,t,n)=>{Vh(t);let i=t[0].dims.slice(),o=V.normalizeAxis(n.axis,i.length),s=i.length,a=o!==s-1,u=[],l=[],d=[],p;a&&((l=Array.from({length:s}).map((e,t)=>t))[o]=s-1,l[s-1]=o,l.map(e=>u.push(i[e])),p=le({perm:l}),d=rr(e,t,p));let c=a?V.sizeToDimension(u,s-1):V.sizeToDimension(i,s-1),h=a?V.sizeFromDimension(u,s-1):V.sizeFromDimension(i,s-1),f=Bh(e,a?d:t,n,c,h);return a?rr(e,f,p):f},Bh=(e,t,n,i,o)=>{let s=tS(e,t[0],i,o,[i]),a=e.run({...Dh,cacheHint:n.cacheKey,get:()=>s},t),u=nS(e,t[0],i,o,s.output.dims,[i]),l=e.run({...kh,cacheHint:n.cacheKey,get:()=>u},[t[0],a]),d=rS(e,t[0],i,o,s.output.dims,u.output.dims);return[e.run({...Lh,cacheHint:n.cacheKey,get:()=>d},[t[0],a,l])]},tS=(e,t,n,i,o)=>{let[s,a]=e.calculateTextureWidthAndHeight(t.dims,0),u=o.length;if(n<1||i<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==o.length)throw Error("Dimensionality of the output should be 1");if(o[0]!==n)throw Error("Shape of the output should be equal to logical row count");let l=j(e.session.backend.glContext.version),d=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${i};

        float max = getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset, ${s},
        ${a} )));
        for(int i=1; i<${i}; ++i)
        {
          float current = getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${s}, ${a})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...Dh,output:{dims:o,type:t.type,textureType:0},shaderSource:d}},nS=(e,t,n,i,o,s)=>{let[a,u]=e.calculateTextureWidthAndHeight(t.dims,0),l=s.length;if(n<1||i<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==s.length)throw Error("Dimensionality of the output should be 1");if(s[0]!==n)throw Error("Shape of the output should be equal to logical row count");if(1!==o.length)throw Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n)throw Error("Shape of the intermediate results should be equal to logical row count");let d=j(e.session.backend.glContext.version),p=`
      float process(int[${l}] indices) {
        int logical_row_start_offset = indices[0] * ${i};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${i}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${d.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${a}, ${u}))) - max);
        }

        return norm_factor;
      }`;return{...kh,output:{dims:s,type:t.type,textureType:0},shaderSource:p}},rS=(e,t,n,i,o,s)=>{let[a,u]=e.calculateTextureWidthAndHeight(t.dims,0),l=t.dims.length;if(n<1||i<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==o.length||1!==s.length)throw Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n||s[0]!==n)throw Error("Shape of the intermediate results should be equal to logical row count");let d=`
      float process(int[${l}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${a}, ${u});

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
    }`;return{...Lh,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:d}},Vh=e=>{if(!e||1!==e.length)throw Error("Softmax requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type")}}),Hh=$(()=>{"use strict";We(),xe(),pe(),Gh={name:"Split",inputNames:["A"],inputTypes:[0]},Uh=(e,t,n)=>{aS(t);let i=V.normalizeAxis(n.axis,t[0].dims.length),o=oS(e,t,i,n),s=[];for(let a=0;a<o;++a)s.push(e.run({...Gh,cacheHint:`${n.cacheKey};${a}`,get:()=>iS(e,t[0],n,i,a)},t));return s},Wh=e=>{let t=e.attributes.getInt("axis",0),n=e.attributes.getInts("split",[]),i=e.outputs.length;return le({axis:t,split:n,numOutputs:i})},oS=(e,t,n,i)=>{let[,o]=Fr.splitShape(t[0].dims,n,i.split,i.numOutputs);return o.length},iS=(e,t,n,i,o)=>{let[s,a]=Fr.splitShape(t.dims,i,n.split,n.numOutputs),u=a[o],l=s[o],d=`
      float process(int indices[${l.length}]) {
        indices[${i}] += ${u};
        return _A(indices);
      }
    `;return{...Gh,cacheHint:`${n.cacheKey}:${o}`,output:{dims:l,type:t.type,textureType:0},shaderSource:d}},aS=e=>{if(!e||1!==e.length)throw Error("Split requires one input.");if("int8"!==e[0].type&&"uint8"!==e[0].type&&"int16"!==e[0].type&&"uint16"!==e[0].type&&"int32"!==e[0].type&&"uint32"!==e[0].type&&"float32"!==e[0].type&&"float64"!==e[0].type&&"bool"!==e[0].type)throw Error("Invalid input type.")}}),Kh=$(()=>{"use strict";xe(),$u=(e,t,n)=>{sS(t);let i=V.squeezeShape(t[0].dims,n);return[e.reshapeUnpacked(t[0],i)]},qh=(e,t)=>(uS(t),$u(e,[t[0]],Array.from(t[1].integerData))),jh=e=>e.attributes.getInts("axes"),sS=e=>{if(!e||1!==e.length)throw Error("Squeeze requires 1 input.");if("string"===e[0].type)throw Error("invalid input tensor types.")},uS=e=>{if(!e||2!==e.length)throw Error("Squeeze requires 2 inputs.");if("int32"!==e[1].type)throw Error("Invalid input type.")}}),Zh=$(()=>{"use strict";Oe(),pe(),Xh=(e,t)=>{cS(t);let n={name:"Sum",inputNames:t.map((e,t)=>`X${t}`),inputTypes:Array(t.length).fill(0)};return[e.run({...n,get:()=>lS(e,t,n)},t)]},lS=(e,t,n)=>{let i=j(e.session.backend.glContext.version),o=t[0].dims.slice(),s=`
      void main() {
        vec4 result = ${t.map((e,t)=>`${i.texture2D}(X${t},TexCoords)`).join(" + ")};
        ${i.output} = result;
      }
    `;return{...n,output:{dims:o,type:t[0].type,textureType:0},hasMain:!0,shaderSource:s}},cS=e=>{if(!e||0===e.length)throw Error("Sum requires inputs.");let t=e[0].dims.length;for(let n=1;n<e.length;n++){if(t!==e[n].dims.length)throw Error("Input shapes are mismatched.");for(let i=0;i<t;i++)if(e[0].dims[i]!==e[n].dims[i])throw Error("Input shapes are not matched.")}if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.");for(let t=1;t<e.length;t++)if(e[0].type!==e[t].type)throw Error("Input types are not matched.")}}),Qh=$(()=>{"use strict";jr(),pe(),Jh=(e,t)=>{pS(t);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[e.run({...n,get:()=>dS(e,t,n)},t)]},dS=(e,t,n)=>{let i=t[0].dims.slice(),o=Array(i.length),s=[];for(let e=0;e<i.length;e++)o[e]=i[e]*t[1].numberData[e],s.push(`inputIdx[${e}] = int(mod(float(outputIdx[${e}]), ${i[e]}.));`);let a=o.length,u=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${s.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:o,type:t[0].type,textureType:0},shaderSource:u}},pS=e=>{if(!e||2!==e.length)throw Error("Tile requires 2 input.");if(1!==e[1].dims.length)throw Error("The second input shape must 1 dimension.");if(e[1].dims[0]!==e[0].dims.length)throw Error("Invalid input shape.");if(-1===Nn.indexOf(e[0].type))throw Error("Invalid input type.");if("int32"!==e[1].type&&"int16"!==e[1].type)throw Error("Invalid repeat type.")}}),tm=$(()=>{"use strict";xe(),Au=(e,t,n)=>{fS(t);let i=V.unsqueezeShape(t[0].dims,n);return[e.reshapeUnpacked(t[0],i)]},Yh=(e,t)=>(hS(t),Au(e,[t[0]],Array.from(t[1].integerData))),em=e=>e.attributes.getInts("axes"),fS=e=>{if(!e||1!==e.length)throw Error("Unsqueeze requires 1 input.");if("string"===e[0].type)throw Error("invalid input tensor types.")},hS=e=>{if(!e||2!==e.length)throw Error("Unsqueeze requires 2 inputs.");if("int32"!==e[1].type)throw Error("Invalid input type.")}}),rm=$(()=>{"use strict";pp(),Sp(),Pp(),Lp(),qo(),yf(),If(),Af(),Ef(),Lf(),zf(),Ff(),Hf(),jo(),Xf(),uh(),gh(),yh(),Ih(),$h(),Ch(),Fh(),Hh(),Kh(),Zh(),Qh(),Xo(),cu(),tm(),Tu(),nm=[["Abs","","6+",Rp],["Acos","","7+",Np],["Add","","7+",fp],["And","","7+",hp],["Asin","","7+",zp],["Atan","","7+",Mp],["AveragePool","","7+",Jf,Qf],["BatchNormalization","","7+",cp,dp],["Cast","","6+",$p,Ap],["Ceil","","6+",Fp],["Clip","","6-10",uu,Bp],["Clip","","11+",Vp],["Concat","","4+",Cp,kp],["Conv","","1+",gu,bu],["ConvTranspose","","1+",gf,bf],["Cos","","7+",Gp],["Div","","7+",mp],["Dropout","","7+",lu],["DepthToSpace","","1+",Tf,vf],["Equal","","7+",gp],["Elu","","6+",Up,Wp],["Exp","","6+",Hp],["Flatten","","1+",Sf,$f],["Floor","","6+",qp],["FusedConv","com.microsoft","1+",gu,bu],["Gather","","1+",Pf,Of],["Gemm","","7-10",yu,Df],["Gemm","","11+",yu,kf],["GlobalAveragePool","","1+",eh,th],["GlobalMaxPool","","1+",ah],["Greater","","7+",bp],["Identity","","1+",lu],["ImageScaler","","1+",Rf,Nf],["InstanceNormalization","","6+",Bf,Vf],["LeakyRelu","","6+",jp,Kp],["Less","","7+",yp],["LRN","","1+",Gf,Uf],["Log","","6+",Xp],["MatMul","","1+",lf,cf],["MaxPool","","1+",nh,rh],["Mul","","7+",_p],["Neg","","6+",Zp],["Not","","1+",Jp],["Or","","7+",xp],["Pad","","2-10",_u,qf],["Pad","","11+",jf,Kf],["Pow","","7+",wp],["PRelu","","7+",Tp],["ReduceLogSum","","1+",hh,zn],["ReduceMax","","1+",dh,zn],["ReduceMean","","1+",ch,zn],["ReduceMin","","1+",ph,zn],["ReduceProd","","1+",fh,zn],["ReduceSum","","1-12",lh,zn],["ReduceSumSquare","","1+",mh,zn],["Relu","","6+",Qp],["Reshape","","5+",bh],["Resize","","10",Iu,Th],["Resize","","11+",Iu,vh],["Shape","","1+",Sh],["Sigmoid","","6+",Yp],["Sin","","7+",ef],["Slice","","10+",Eh],["Slice","","1-9",Ah,Ph],["Softmax","","1-12",Rh,Nh],["Softmax","","13+",Mh,zh],["Split","","2-12",Uh,Wh],["Sqrt","","6+",tf],["Squeeze","","1-12",$u,jh],["Squeeze","","13+",qh],["Sub","","7+",vp],["Sum","","6+",Xh],["Tan","","7+",nf],["Tanh","","6+",rf],["Tile","","6+",Jh],["Transpose","","1+",rr,xf],["Upsample","","7-8",xu,xh],["Upsample","","9",xu,wh],["Unsqueeze","","1-12",Au,em],["Unsqueeze","","13+",Yh],["Xor","","7+",Ip]]});function im(e){let t={},n;for(;null!==(n=om.exec(e));){let e=n[3].split(",").map(e=>{let t=e.trim().split(" ");return t&&2===t.length?{type:t[0],name:t[1]}:null}).filter(e=>null!==e);t[n[2]]={params:e,body:n[4]}}for(let i in t){let o=RegExp(mS.replace("__FUNC__",i),"gm");for(;null!==(n=o.exec(e));){let o=n[1],s=n[2],a=n[3].split(","),u=o?`${o} ${s};`:"",l=t[i].body,d="";t[i].params.forEach((e,t)=>{e&&(d+=`${e.type} ${e.name} = ${a[t]};
`)}),l=(l=`${d}
 ${l}`).replace("return",`${s} = `);let p=`
      ${u}
      {
        ${l}
      }
      `;e=e.replace(n[0],p)}}return e.replace(om,"")}var om,mS,am=$(()=>{"use strict";om=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,mS="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function Tr(e,t){let n=[],i=[],o=null!=t&&Array.isArray(t)&&0===t.length,s=null==t||o?null:gS(t,e).sort(),a=0;for(let t=0;t<e.length;++t){if(null!=s){if(s[a]===t&&1!==e[t])throw Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(null==s[a]||s[a]>t)&&1===e[t]&&(n.push(e[t]),i.push(t)),s[a]<=t&&a++}1!==e[t]&&(n.push(e[t]),i.push(t))}return{newShape:n,keptDims:i}}function gS(e,t){let n=t.length;return gr((e=null==e?t.map((e,t)=>t):[].concat(e)).every(e=>e>=-n&&e<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${e}`),gr(e.every(bS),()=>`All values in axis param must be integers but got axis ${e}`),e.map(e=>e<0?n+e:e)}function bS(e){return e%1==0}function yS(e){if(0===e.length)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function sm(e){let t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}var Yo,ei,ti,ni,ri,oi,Ou,ii,ai,si,ui,Pu=$(()=>{"use strict";ct(),xe(),Yo=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,t){let n=this.computeTexture(e,t);return t&&t.isPacked&&(n[0]/=2,n[1]/=2),t&&t.reverseWH?[n[1],n[0]]:n}computeTexture(e,t){let n=t&&t.isPacked;if(0===e.length)return n?[2,2]:[1,1];let i=this.maxTextureSize;if(t&&void 0!==t.breakAxis){let n=t.breakAxis>=e.length?1:e.slice(t.breakAxis).reduce((e,t)=>e*t),o=t.breakAxis<=0?1:e.slice(0,t.breakAxis).reduce((e,t)=>e*t);if(!(n>i)&&!(o>i))return[n,o];Te.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${t.breakAxis}`)}let o=e.slice(0);n&&(i*=2,1===(o=o.map((e,t)=>t>=o.length-2?o[t]%2==0?o[t]:o[t]+1:o[t])).length&&(o=[2,o[0]])),2!==o.length&&(o=Tr(o).newShape);let s=yS(o);return o.length<=1&&s<=i?[1,s]:2===o.length&&o[0]<=i&&o[1]<=i?o:3===o.length&&o[0]*o[1]<=i&&o[2]<=i?[o[0]*o[1],o[2]]:3===o.length&&o[0]<=i&&o[1]*o[2]<=i?[o[0],o[1]*o[2]]:4===o.length&&o[0]*o[1]*o[2]<=i&&o[3]<=i?[o[0]*o[1]*o[2],o[3]]:4===o.length&&o[0]<=i&&o[1]*o[2]*o[3]<=i?[o[0],o[1]*o[2]*o[3]]:n?sm(s/4).map(e=>2*e):sm(s)}}}),um=$(()=>{"use strict";xe(),vn(),Oe(),Pu(),cn(),ei=class extends gt{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new z(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new z(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let t=e.unpackedShape,n=[e.width,e.height],i={},o="getOutputCoords";switch(t.length){case 0:i[o]=this.getOutputScalarCoords();break;case 1:i[o]=this.getOutputPacked1DCoords(t,n);break;case 2:i[o]=this.getOutputPacked2DCoords(t,n);break;case 3:i[o]=this.getOutputPacked3DCoords(t,n);break;default:i[o]=this.getOutputPackedNDCoords(t,n)}let s=`
      void setOutput(vec4 val) {
        ${j(this.context.glContext.version).output} = val;
      }
    `;return i.floatTextureSetRGBA=new z(s),i}getUnpackedOutputSamplingSnippet(e){let t=e.unpackedShape,n=[e.width,e.height],i={},o="getOutputCoords";switch(t.length){case 0:i[o]=this.getOutputScalarCoords();break;case 1:i[o]=this.getOutputUnpacked1DCoords(t,n);break;case 2:i[o]=this.getOutputUnpacked2DCoords(t,n);break;case 3:i[o]=this.getOutputUnpacked3DCoords(t,n);break;case 4:i[o]=this.getOutputUnpacked4DCoords(t,n);break;case 5:i[o]=this.getOutputUnpacked5DCoords(t,n);break;case 6:i[o]=this.getOutputUnpacked6DCoords(t,n);break;default:throw Error(`Unsupported output dimensionality: ${t.length}`)}let s=`
        void setOutput(float val) {
          ${j(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `;return i.floatTextureSetR=new z(s),i}getOutputScalarCoords(){return new z(`
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
      `,new z(i)}getOutputPacked2DCoords(e,t){let n="";if(Zn.arraysEqual(e,t))return n=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new z(n);let i=t,o=Math.ceil(e[1]/2);return n=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${i[0]}, ${i[1]}));

          int index = resTexRC.y * ${i[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${o}) * 2;
          int c = 2 * (index / ${o});

          return ivec2(r, c);
        }
      `,new z(n)}getOutputPacked3DCoords(e,t){let n=[t[0],t[1]],i=Math.ceil(e[2]/2),o=i*Math.ceil(e[1]/2),s=`
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
      `;return new z(s)}getOutputPackedNDCoords(e,t){let n=[t[0],t[1]],i=Math.ceil(e[e.length-1]/2),o=i*Math.ceil(e[e.length-2]/2),s=o,a="",u="b, r, c";for(let t=2;t<e.length-1;t++)s*=e[e.length-t-1],a=`
      int b${t} = index / ${s};
      index -= b${t} * ${s};
    `+a,u=`b${t}, `+u;let l=`
      ivec${e.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${n[0]}, ${n[1]}));
        int index = resTexRC.y * ${n[0]} + resTexRC.x;

        ${a}

        int b = index / ${o};
        index -= b * ${o};

        // reverse r and c order for packed texture
        int r = imod(index, ${i}) * 2;
        int c = 2 * (index / ${i});

        return ivec${e.length}(${u});
      }
    `;return new z(l)}getOutputUnpacked1DCoords(e,t){let n=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new z(n)}getOutputUnpacked2DCoords(e,t){let n=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new z(n)}getOutputUnpacked3DCoords(e,t){let n="",i=e.length,o=null;i<2&&(o=[]),(o=Array(i-1))[i-2]=e[i-1];for(let t=i-3;t>=0;--t)o[t]=o[t+1]*e[t+1];let s=["r","c","d"],a=o.map((e,t)=>{let n=`int ${s[t]} = index / ${e}`,i=t===o.length-1?`int ${s[t+1]} = index - ${s[t]} * ${e}`:`index -= ${s[t]} * ${e}`;return`${n}; ${i};`}).join("");return n=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${a}
          return ivec3(r, c, d);
        }
      `,new z(n)}getOutputUnpacked4DCoords(e,t){let n="",i=e.length,o=null;i<2&&(o=[]),(o=Array(i-1))[i-2]=e[i-1];for(let t=i-3;t>=0;--t)o[t]=o[t+1]*e[t+1];let s=["r","c","d","d2"],a=o.map((e,t)=>{let n=`int ${s[t]} = index / ${e}`,i=t===o.length-1?`int ${s[t+1]} = index - ${s[t]} * ${e}`:`index -= ${s[t]} * ${e}`;return`${n}; ${i};`}).join("");return n=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${a}
          return ivec4(r, c, d, d2);
        }
      `,new z(n)}getOutputUnpacked5DCoords(e,t){let n="",i=e.length,o=null;i<2&&(o=[]),(o=Array(i-1))[i-2]=e[i-1];for(let t=i-3;t>=0;--t)o[t]=o[t+1]*e[t+1];let s=["r","c","d","d2","d3"],a=o.map((e,t)=>{let n=`int ${s[t]} = index / ${e}`,i=t===o.length-1?`int ${s[t+1]} = index - ${s[t]} * ${e}`:`index -= ${s[t]} * ${e}`;return`${n}; ${i};`}).join("");return n=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${a}
          return ivec5(r, c, d, d2, d3);
        }
      `,new z(n)}getOutputUnpacked6DCoords(e,t){let n="",i=e.length,o=null;i<2&&(o=[]),(o=Array(i-1))[i-2]=e[i-1];for(let t=i-3;t>=0;--t)o[t]=o[t+1]*e[t+1];let s=["r","c","d","d2","d3","d4"],a=o.map((e,t)=>{let n=`int ${s[t]} = index / ${e}`,i=t===o.length-1?`int ${s[t+1]} = index - ${s[t]} * ${e}`:`index -= ${s[t]} * ${e}`;return`${n}; ${i};`}).join("");return n=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${a}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new z(n)}getCommonUtilFuncs(){let e={},t="uvFromFlat";e[t]=new z(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),e[t="packedUVfrom1D"]=new z(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e[t="packedUVfrom2D"]=new z(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e[t="packedUVfrom3D"]=new z(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="sampleTexture";let n=j(this.context.glContext.version);return e[t]=new z(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${n.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((n,i)=>{let o=this.context.inputTextureLayouts[i],s=Bo(n);o.isPacked?e[s]=this.getPackedSamplerFromInput(s,n,o):e[s]=this.getUnpackedSamplerFromInput(s,n,o);let a=Kd(n);o.unpackedShape.length<=t.unpackedShape.length&&(o.isPacked?e[a]=this.getPackedSamplerAtOutputCoords(a,o,t,n):e[a]=this.getUnpackedSamplerAtOutputCoords(a,o,t,n))}),e}getPackedSamplerAtOutputCoords(e,t,n,i){let o=t.unpackedShape,s=n.unpackedShape,a=Bo(i),u=o.length,l=s.length,d=Xe.getBroadcastDims(o,s),p=Ze(l),c=l-u,h,f=St();h=0===u?"":l<2&&d.length>=1?"coords = 0;":d.map(e=>`coords.${f[e+c]} = 0;`).join(`
`);let m="";m=l<2&&u>0?"coords":o.map((e,t)=>`coords.${f[t+c]}`).join(", ");let g="return outputValue;",b=1===V.size(o),y=1===V.size(s);if(1!==u||b||y){if(b&&!y)g=1===l?`
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
        vec4 outputValue = ${a}(${m});
        ${g}
      }
    `;return new z(v,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,t,n,i){let o=[n.width,n.height],s=[t.width,t.height],a=t.unpackedShape.length,u=n.unpackedShape.length,l=t.unpackedShape,d=n.unpackedShape,p=Bo(i);if(a===u&&Zn.arraysEqual(s,o)){let t=`
          float ${e}() {
            return sampleTexture(${i}, TexCoords);
          }
        `;return new z(t,["coordinates.sampleTexture"])}let c=Ze(u),h=Xe.getBroadcastDims(l,d),f=u-a,m,g=St();m=0===a?"":u<2&&h.length>=1?"coords = 0;":h.map(e=>`coords.${g[e+f]} = 0;`).join(`
`);let b="";b=u<2&&a>0?"coords":t.unpackedShape.map((e,t)=>`coords.${g[t+f]}`).join(", ");let y=`
        float ${e}() {
          ${c} coords = getOutputCoords();
          ${m}
          return ${p}(${b});
        }
      `;return new z(y,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,t,n){switch(n.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,t);case 1:return this.getPackedSampler1D(e,t,n);case 2:return this.getPackedSampler2D(e,t,n);case 3:return this.getPackedSampler3D(e,t,n);default:return this.getPackedSamplerND(e,t,n)}}getUnpackedSamplerFromInput(e,t,n){let i=n.unpackedShape;switch(i.length){case 0:return this.getUnpackedSamplerScalar(e,t,n);case 1:return this.getUnpackedSampler1D(e,t,n);case 2:return this.getUnpackedSampler2D(e,t,n);case 3:return this.getUnpackedSampler3D(e,t,n);case 4:return this.getUnpackedSampler4D(e,t,n);case 5:return this.getUnpackedSampler5D(e,t,n);case 6:return this.getUnpackedSampler6D(e,t,n);default:throw Error(`Unsupported dimension ${i.length}-D`)}}getPackedSamplerScalar(e,t){let n=j(this.context.glContext.version),i=`
          vec4 ${e}() {
            return ${n.texture2D}(${t}, halfCR);
          }
        `;return new z(i)}getPackedSampler1D(e,t,n){let i=[n.width,n.height],o=[i[1],i[0]],s=j(this.context.glContext.version),a=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${o[0]}, ${o[1]}, index);
      return ${s.texture2D}(${t}, uv);
    }`;return new z(a,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,t,n){let i=n.unpackedShape,o=[n.width,n.height],s=j(this.context.glContext.version),a=o[0],u=o[1];if(null!=o&&Zn.arraysEqual(i,o)){let n=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${a}.0);
        return ${s.texture2D}(${t}, uv);
      }`;return new z(n)}let l=o,d=Math.ceil(i[1]/2),p=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${l[1]}, ${l[0]}, ${d}, row, col);
      return ${s.texture2D}(${t}, uv);
    }`;return new z(p,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,t,n){let i=n.unpackedShape,o=[n.width,n.height],s=[o[0],o[1]],a=j(this.context.glContext.version);if(1===i[0]){let o=i.slice(1),s=[1,2],a=br(i,o),u=["b","row","col"],l=JSON.parse(JSON.stringify(n));l.unpackedShape=a;let d=this.getPackedSamplerFromInput(e,t,l),p=`${d.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${yr(u,s)});
      } `;return new z(p,d.dependencies)}let u=s[0],l=s[1],d=Math.ceil(i[2]/2),p=d*Math.ceil(i[1]/2),c=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${l}, ${u}, ${p}, ${d}, b, row, col);
      return ${a.texture2D}(${t}, uv);}`;return new z(c,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,t,n){let i=n.unpackedShape,o=i.length,s=[n.width,n.height],a=j(this.context.glContext.version),u=[s[0],s[1]],l=u[1],d=u[0],p=Math.ceil(i[o-1]/2),c=p*Math.ceil(i[o-2]/2),h="int b, int row, int col",f=`b * ${c} + (row / 2) * ${p} + (col / 2)`;for(let e=2;e<o-1;e++)h=`int b${e}, `+h,c*=i[o-e-1],f=`b${e} * ${c} + `+f;let m=`vec4 ${e}(${h}) {
      int index = ${f};
      int texR = index / ${d};
      int texC = index - texR * ${d};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${d}, ${l});
      return ${a.texture2D}(${t}, uv);
    }`;return new z(m)}getUnpackedSamplerScalar(e,t,n){let[i,o]=[n.width,n.height];if(1===i&&1===o){let n=`
          float ${e}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new z(n,["coordinates.sampleTexture"])}let s=`
        float ${e}() {
          int offset_${t} = coordsToOffset(TexCoords, ${i}, ${o});
          vec2 uv = uvFromFlat(${i}, ${o}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new z(s,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,t,n){let i=n.width,o=n.height;if(1===o&&1===i){let n=`
        float ${e}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new z(n,["coordinates.sampleTexture"])}if(1===o){let n=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${i}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new z(n,["coordinates.sampleTexture"])}if(1===i){let n=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${o}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new z(n,["coordinates.sampleTexture"])}let s=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${i}, ${o}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new z(s,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,t,n){let i=n.unpackedShape,o=[n.height,n.width];if(null!=o&&Zn.arraysEqual(i,o)){let n=o[1],i=o[0],s=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${n}.0, ${i}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new z(s,["coordinates.sampleTexture"])}let{newShape:s,keptDims:a}=Tr(i),u=s;if(u.length<i.length){let o=br(i,u),s=JSON.parse(JSON.stringify(n));s.unpackedShape=o;let l=["col","row"],d=`
          ${this.getUnpackedSamplerFromInput(e,t,s).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${yr(l,a)});
          }
        `;return new z(d,["coordinates.sampleTexture"])}let l=o[1],d=o[0];if(1===d){let n=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${l}, ${d});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new z(n,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(1===l){let n=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${l}, ${d});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${d}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new z(n,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let p=`
        float ${e}(int row, int col) {
          int index = col * ${i[1]} + row;
          vec2 uv = uvFromFlat(${l}, ${d}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new z(p,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,t,n){let i=n.unpackedShape,o=i[1]*i[2],s=i[2],{newShape:a,keptDims:u}=Tr(i),l=a;if(l.length<i.length){let o=br(i,l),s=["batch","col","row"],a=JSON.parse(JSON.stringify(n));a.unpackedShape=o;let d=this.getUnpackedSamplerFromInput(e,t,a),p=u.reverse(),c=`
          ${d.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${yr(s,p)});
          }
        `;return new z(c,d.dependencies)}let d=n.width,p=n.height,c=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${o} + col * ${s} + row;
            vec2 uv = uvFromFlat(${d}, ${p}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new z(c,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,t,n){let i=n.unpackedShape,o=i[3],s=i[2]*o,a=i[1]*s,u=n.width,l=n.height,d=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${a} + col * ${s} +
              depth2 * ${o} + depth;
          vec2 uv = uvFromFlat(${u}, ${l}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new z(d,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,t,n){let i=n.unpackedShape,o=i[4],s=i[3]*o,a=i[2]*s,u=i[1]*a,{newShape:l,keptDims:d}=Tr(i);if(l.length<i.length){let o=br(i,l),s=["row","col","depth","depth2","depth3"],a=JSON.parse(JSON.stringify(n));a.unpackedShape=o;let u=`
          ${this.getUnpackedSamplerFromInput(e,t,a).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${yr(s,d)});
          }
        `;return new z(u,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=n.width,c=n.height,h=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${a} + depth * ${s} +
          depth3 * ${o} + depth2;
          vec2 uv = uvFromFlat(${p}, ${c}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new z(h,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,t,n){let i=n.unpackedShape,o=i[5],s=i[4]*o,a=i[3]*s,u=i[2]*a,l=i[1]*u,{newShape:d,keptDims:p}=Tr(i);if(d.length<i.length){let o=br(i,d),s=["row","col","depth","depth2","depth3","depth4"],a=JSON.parse(JSON.stringify(n));a.unpackedShape=o;let u=`
            ${this.getUnpackedSamplerFromInput(e,t,a).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${yr(s,p)});
            }
          `;return new z(u,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let c=n.width,h=n.height,f=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${l} + col * ${u} + depth * ${a} +
            depth2 * ${s} + depth3 * ${o} + depth4;
            vec2 uv = uvFromFlat(${c}, ${h}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new z(f,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,t=e.shape.length,n=e.strides,i=e.width,o=e.height,s=[];for(let e=0;e<t-1;++e)s.push(`
        c[${e}] = offset / ${n[e]};`),s.push(`
        offset -= c[${e}] * ${n[e]};`);s.push(`
        c[${t-1}] = offset;`);let a=`
      void toVec(vec2 texCoords, out int c[${t}]) {
        int offset = coordsToOffset(texCoords, ${i}, ${o});
        ${s.join("")}
      }
      void toVec(int offset, out int c[${t}]) {
        ${s.join("")}
      }
    `;return{toVec:new z(a,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((t,n)=>{let i=this.context.inputTextureLayouts[n],o=(i.unpackedShape.length>0?i.unpackedShape:i.shape).length,s=`_${t}`;e[s]=new z(this.getValueFromSingle(t,o,i.width,i.height,!1),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),e[s+="_T"]=new z(this.getValueFromSingle(t,o,i.width,i.height,!0),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,t,n,i,o){let s=`_${e}`;o&&(s+="_T");let a=j(this.context.glContext.version);return`
        float ${s}(int m[${t}]) {
          int offset = indicesToOffset${s}(m);
          vec2 coords = offsetToCoords(offset, ${n}, ${i});
          float value = getColorAsFloat(${a.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,t,n,i,o){let s=`_${e}_Pack`;o&&(s+="_T");let a=j(this.context.glContext.version);return`
        vec4 ${s}(int m[${t}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${n}, ${i});
          return ${a.texture2D}(${e}, coords);
        }
        `}}}),lm=$(()=>{"use strict";vn(),ti=class e extends gt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new z(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new z(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let t=e.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new z(`
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
        `)}}decodeUint8(){let t=e.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new z(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${t}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),t=new Uint32Array(e),n=new Uint8Array(e);if(t[0]=0xdeadbeef,239===n[0])return!0;if(222===n[0])return!1;throw Error("unknown endianness")}}}),cm=$(()=>{"use strict";vn(),Oe(),ni=class extends gt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=j(this.context.glContext.version);return{setFragColor:new z(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new z(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}}),dm=$(()=>{"use strict";vn(),ri=class e extends gt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,t={};return this.context.programInfo.inputNames.forEach((n,i)=>{let o=this.context.inputTextureLayouts[i].unpackedShape;if(o.length<=e){let i=o.length,s=e-i,a=`bcastIndices_${n}`,u="";for(let e=0;e<i;++e)u+=`
          realIndices[${e}] = int( mod(float(bcastedIndices[${s+e}]), ${o[e]}.0) );
          `;let l=`
        void ${a} (int bcastedIndices[${e}], out int realIndices[${i}]) {
          ${u}
        }
        `;t[a]=new z(l)}}),t}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,t={};return this.context.programInfo.inputNames.forEach((n,i)=>{let o=this.context.inputTextureLayouts[i].shape;if(!(o.length<2||o.length>e)){let i=o.length,s=e-i,a=`bcastMatmulIndices_${n}`,u="";for(let e=0;e<i-2;++e)u+=`
          realIndices[${e}] = int( mod(float(bcastedIndices[${s+e}]), ${o[e]}.0) );
          `;let l=`
        void ${a}(int bcastedIndices[${e}], out int realIndices[${i}]) {
          ${u}
          realIndices[${i-1}] = bcastedIndices[${e-1}];
          realIndices[${i-2}] = bcastedIndices[${e-2}];
        }
        `;t[a]=new z(l)}}),t}indicesToOffset(){let t={};return this.context.programInfo.inputNames.forEach((n,i)=>{let o=this.context.inputTextureLayouts[i].shape,s=this.context.inputTextureLayouts[i].strides,a=o.length,u=`indicesToOffset_${n}`;t[u]=new z(e.indexToOffsetSingle(u,a,s)),t[u=`indicesToOffset_${n}_T`]=new z(e.indexToOffsetSingle(u,a,s.slice().reverse()))}),t}static indexToOffsetSingle(e,t,n){let i="";for(let e=t-1;e>=0;--e)i+=`
        offset += indices[${e}] * ${n[e]};
        `;return`
      int ${e}(int indices[${t}]) {
        int offset = 0;
        ${i}
        return offset;
      }
      `}offsetToIndices(){let t={};return this.context.programInfo.inputNames.forEach((n,i)=>{let o=this.context.inputTextureLayouts[i].shape,s=this.context.inputTextureLayouts[i].strides,a=o.length,u=`offsetToIndices_${n}`;t[u]=new z(e.offsetToIndicesSingle(u,a,s)),t[u=`offsetToIndices_${n}_T`]=new z(e.offsetToIndicesSingle(u,a,s.slice().reverse()))}),t}static offsetToIndicesSingle(e,t,n){let i=[];for(let e=0;e<t-1;++e)i.push(`
      indices[${e}] = offset / ${n[e]};`),i.push(`
        offset -= indices[${e}] * ${n[e]};`);return i.push(`
      indices[${t-1}] = offset;`),`
      void ${e}(int offset, out int indices[${t}]) {
        ${i.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((t,n)=>{let i=this.context.inputTextureLayouts[n].shape,o=i.length,s=`incrementIndices_${t}`,a="";for(let e=0;e<o;++e)a+=`
        shape[${e}] = ${i[e]};`;let u=`
        void ${s}(int axis, out int indices[${o}]) {
          int shape[${o}];
          ${a};
          for(int i = ${o} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;e[s]=new z(u)}),e}}}),pm=$(()=>{"use strict";vn(),oi=class extends gt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let e=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},n={};for(let i in t){let o=`${i}Vec`,s="";for(let n=0;n<e;++n)s+=`
          dest[${n}] ${t[i]} src[${n}];
          `;let a=`
        void ${o}(int src[${e}], out int dest[${e}]) {
          ${s}
        }
        `;n[o]=new z(a)}return n}copyVec(){let e=this.context.outputTextureLayout.shape.length,t="";for(let n=0;n<e;++n)t+=`
        dest[${n}] = src[${n}];
        `;let n=`
      void copyVec(int src[${e}], out int dest[${e}]) {
        ${t}
      }
      `;return{copyVec:new z(n)}}setVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
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
        `;return{setVecItem:new z(n)}}getVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
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
    `;return{getVecItem:new z(n)}}}}),fm=$(()=>{"use strict";um(),lm(),cm(),dm(),pm(),Ou={encoding:ti,fragcolor:ni,vec:oi,shapeUtils:ri,coordinates:ei}}),hm=$(()=>{"use strict";vn(),am(),fm(),Oe(),ii=class{constructor(e,t,n,i){this.libs={},this.glslLibRoutineDependencyGraph={},this.context=new Uo(e,t,n,i),Object.keys(Ou).forEach(e=>{let t=new Ou[e](this.context);this.libs[e]=t});let o=this.glslLibRoutineDependencyGraph;for(let e in this.libs){let t=this.libs[e].getFunctions();for(let n in t){let i=e+"."+n,s;o[i]?(s=o[i]).routineBody=t[n].routineBody:(s=new qr(i,t[n].routineBody),o[i]=s);let a=t[n].dependencies;if(a)for(let e=0;e<a.length;++e)if(o[a[e]])s.addDependency(o[a[e]]);else{let t=new qr(a[e]);o[a[e]]=t,s.addDependency(t)}}}}preprocess(){let e=this.context.programInfo,t=e.shaderSource;return this.context.programInfo.hasMain||(t=`${t}
      ${jd(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),t=im(t),`${qd(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(t)}
    ${t}`}getImports(e){let t=this.selectGlslLibRoutinesToBeIncluded(e);if(0===t.length)return"";let n="";for(let e=0;e<t.length;++e)if(t[e].routineBody)n+=t[e].routineBody+`
`;else throw Error(`Missing body for the Glsl Library routine: ${t[e].name}`);return n}selectGlslLibRoutinesToBeIncluded(e){let t=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(n=>{let i=n.split(".")[1];-1!==e.indexOf(i)&&t.push(this.glslLibRoutineDependencyGraph[n])}),Wo.returnOrderedNodes(t)}getUniforms(e,t){let n=[];if(e)for(let t of e)n.push(`uniform sampler2D ${t};`);if(t)for(let e of t)n.push(`uniform ${e.type} ${e.name}${e.arrayLength?`[${e.arrayLength}]`:""};`);return n.join(`
`)}}}),mm=$(()=>{"use strict";qe(),ct(),hm(),Oe(),ai=class{constructor(e,t,n){this.profiler=e,this.glContext=t,this.textureLayoutStrategy=n,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let i=this.glContext.gl,o=e.program;i.useProgram(o);try{this.bindOutput(n),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],t)}catch(t){throw Te.error("ProgramManager",e.programInfo.shaderSource),t}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,t,n){return this.profiler.event("backend","ProgramManager.build",()=>{let i=new ii(this.glContext,e,t,n),o=i.preprocess(),s=this.compile(o);return{programInfo:e,program:s,uniformLocations:this.getUniformLocations(s,i.context.programInfo.inputNames,i.context.programInfo.variables),attribLocations:this.getAttribLocations(s)}})}compile(e){if(!this.vertexShader){Te.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let e=Hd(this.glContext.version);this.vertexShader=this.glContext.compileShader(e,this.glContext.gl.VERTEX_SHADER)}te.debug&&Te.verbose("ProrgramManager",`FragShader:
${e}
`);let t=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),n=this.glContext.createProgram(this.vertexShader,t);return this.glContext.deleteShader(t),n}bindOutput(e){let t=e.width,n=e.height;Te.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${t}/${n}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,t,n)}bindAttributes(e){let t=e.position,n=e.textureCoord;this.glContext.setVertexAttributes(t,n),this.attributesBound=!0}bindUniforms(e,t,n){let i=this.glContext.gl,o=0;for(let{name:s,type:a,location:u,arrayLength:l}of e){let e=t.find(e=>e.name===s)?.data;if("sampler2D"!==a&&!e)throw Error(`variable '${s}' does not have data defined in program info`);switch(a){case"sampler2D":this.bindTexture(n[o],u,o),o++;break;case"float":l?i.uniform1fv(u,e):i.uniform1f(u,e);break;case"int":l?i.uniform1iv(u,e):i.uniform1i(u,e);break;default:throw Error(`Uniform not implemented: ${a}`)}}}bindTexture(e,t,n){this.glContext.bindTextureToUniform(e.texture,n,t)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,t,n){let i=[];if(t)for(let n of t)i.push({name:n,type:"sampler2D",location:this.getUniformLocation(e,n)});if(n)for(let t of n)i.push({...t,location:this.getUniformLocation(e,t.name)});return i}getUniformLocation(e,t){let n=this.glContext.gl.getUniformLocation(e,t);if(null===n)throw Error(`Uniform ${t} not found.`);return n}getAttribLocation(e,t){return this.glContext.gl.getAttribLocation(e,t)}}}),gm=$(()=>{"use strict";ct(),Wr(),si=class{constructor(e,t,n,i){this.glContext=e,this.layoutStrategy=t,this.profiler=n,this.config=i,this.pendingRead=new Map,i.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,t,n,i){let o=this.toEncoderType(e),s=this.glContext.getEncoder(o,t.channels||1,i);if(t.isPacked&&1===i)throw Error("not implemented");let a=t.width,u=t.height,l,d;if(this.config.reuseTextures){l=`${a}x${u}_${s.format}_${s.internalFormat}_${s.textureType}`,(d=this.inUseTextures.get(l))||(d=[],this.inUseTextures.set(l,d));let t=this.idleTextures.get(l);if(t&&t.length>0){let o=t.pop();return d.push(o),1===i&&this.glContext.updateTexture(o,a,u,s,this.toTextureData(e,n)),o}}Te.verbose("TextureManager",`Creating new texture of size ${t.width}x${t.height}`);let p=this.glContext.allocateTexture(a,u,s,this.toTextureData(e,n));return this.config.reuseTextures&&(d.push(p),this.textureLookup.set(p,l)),p}readTexture(e,t,n){return n||(n=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let i=e.shape.reduce((e,t)=>e*t)*n,o=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(t),n);return this.toTensorData(t,o)})}async readTextureAsync(e,t,n){let i=e.tensor.dataId;if(n||(n=1),this.pendingRead.has(i)){let e=this.pendingRead.get(i);return new Promise(t=>e?.push(t))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(i,[]);let o=e.shape.reduce((e,t)=>e*t)*n;await this.glContext.createAndWaitForFence();let s=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(t),n),a=this.toTensorData(t,s),u=this.pendingRead.get(i);return this.pendingRead.delete(i),u?.forEach(e=>e(a)),a})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let t=e.shape.reduce((e,t)=>e*t),n=this.glContext.readTexture(e.texture,e.width,e.height,4*t,"byte",4);return new Float32Array(n.buffer,n.byteOffset,t)})}releaseTexture(e,t){let n;if(this.config.reuseTextures&&(n=this.textureLookup.get(e.texture))){t&&this.textureLookup.delete(n);let i=this.inUseTextures.get(n);if(i){let t=i.indexOf(e.texture);if(-1!==t){i.splice(t,1);let o=this.idleTextures.get(n);o||(o=[],this.idleTextures.set(n,o)),o.push(e.texture)}}}(!n||t)&&(Te.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,t){switch(e){case"int16":return t instanceof Int16Array?t:Int16Array.from(t);case"int32":return t instanceof Int32Array?t:Int32Array.from(t);case"int8":return t instanceof Int8Array?t:Int8Array.from(t);case"uint16":return t instanceof Uint16Array?t:Uint16Array.from(t);case"uint32":return t instanceof Uint32Array?t:Uint32Array.from(t);case"uint8":case"bool":return t instanceof Uint8Array?t:Uint8Array.from(t);case"float32":return t instanceof Float32Array?t:Float32Array.from(t);case"float64":return t instanceof Float64Array?t:Float64Array.from(t);default:throw Error(`TensorData type ${e} is not supported`)}}toTextureData(e,t){if(t)return t instanceof Float32Array?t:new Float32Array(t)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}}),bm=$(()=>{"use strict";ct(),ic(),up(),rm(),mm(),Pu(),gm(),ui=class{constructor(e,t){this.backend=e,this.context=t,this.layoutStrategy=new Yo(e.glContext.maxTextureSize),this.programManager=new ai(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new si(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:"full"===e.textureCacheMode}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Go(this)}onGraphInitialized(e){let t=e.getValues().filter(e=>-1===e.from&&e.tensor).map(e=>e.tensor.dataId);this.initializers=new Set(t)}isInitializer(e){return!!this.initializers&&this.initializers.has(e)}addInitializer(e){this.initializers.add(e)}getTextureData(e,t){return t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,n=!1){Te.verbose("WebGLSessionHandler","Storing Texture data in cache"),n?this.packedTextureDataCache.set(e,t):this.unpackedTextureDataCache.set(e,t)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,t,n){let i=oc(e,t,nm);return{impl:i.opImpl,context:i.opInit?i.opInit(e,n):e}}}});function _S(e){let t=0;for(;t<e.length&&e[t]();++t);return t-1}var Xr,ym=$(()=>{"use strict";qe(),Wr(),Wr(),cn(),Xr=class{constructor(e,t){this.frameBufferBound=!1,this.itemsToPoll=[],this.gl=e,this.version=t,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,t,n,i){let o=this.gl,s=o.createTexture();o.bindTexture(o.TEXTURE_2D,s),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);let a=i?n.encode(i,e*t):null;return o.texImage2D(o.TEXTURE_2D,0,n.internalFormat,e,t,0,n.format,n.textureType,a),this.checkError(),s}updateTexture(e,t,n,i,o){let s=this.gl;s.bindTexture(s.TEXTURE_2D,e);let a=i.encode(o,t*n);s.texSubImage2D(s.TEXTURE_2D,0,0,0,t,n,i.format,i.textureType,a),this.checkError()}attachFramebuffer(e,t,n){let i=this.gl;i.bindTexture(i.TEXTURE_2D,e),i.bindFramebuffer(i.FRAMEBUFFER,this.framebuffer),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,e,0),this.checkError(),i.viewport(0,0,t,n),i.scissor(0,0,t,n)}readTexture(e,t,n,i,o,s){let a=this.gl;s||(s=1),this.frameBufferBound||this.attachFramebuffer(e,t,n);let u=this.getEncoder(o,s),l=u.allocate(t*n);return a.bindTexture(a.TEXTURE_2D,e),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),a.readPixels(0,0,t,n,a.RGBA,u.textureType,l),this.checkError(),u.decode(l,i)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,t){let n=this.gl;n.vertexAttribPointer(e,3,n.FLOAT,!1,20,0),n.enableVertexAttribArray(e),-1!==t&&(n.vertexAttribPointer(t,2,n.FLOAT,!1,20,12),n.enableVertexAttribArray(t)),this.checkError()}createProgram(e,t){let n=this.gl,i=n.createProgram();return n.attachShader(i,e),n.attachShader(i,t),n.linkProgram(i),i}compileShader(e,t){let n=this.gl,i=n.createShader(t);if(!i)throw Error(`createShader() returned null with type ${t}`);if(n.shaderSource(i,e),n.compileShader(i),!1===n.getShaderParameter(i,n.COMPILE_STATUS))throw Error(`Failed to compile shader: ${n.getShaderInfoLog(i)}
Shader source:
${e}`);return i}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,t,n){let i=this.gl;i.activeTexture(i.TEXTURE0+t),this.checkError(),i.bindTexture(i.TEXTURE_2D,e),this.checkError(),i.uniform1i(n,t),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(te.debug){let e=this.gl,t=e.getError(),n="";switch(t){case e.NO_ERROR:return;case e.INVALID_ENUM:n="INVALID_ENUM";break;case e.INVALID_VALUE:n="INVALID_VALUE";break;case e.INVALID_OPERATION:n="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:n="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:n="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:n="CONTEXT_LOST_WEBGL";break;default:n=`Unknown WebGL Error: ${t.toString(16)}`}throw Error(n)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,t,n=0){if(2===this.version)return new Vo(this.gl,t);switch(e){case"float":return 1===n||this.isRenderFloat32Supported?new Ur(this.gl,t):new Ur(this.gl,t,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw Error("not implemented");case"byte":return new Fo(this.gl,t);default:throw Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let t=0;t<this.maxTextureImageUnits;++t)e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,t=e.createBuffer();if(!t)throw Error("createBuffer() returned null");let n=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,n,e.STATIC_DRAW),this.checkError(),t}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),1===this.version&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){2===this.version?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);let n=2===this.version?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,n,1,1,0,e.RGBA,e.FLOAT,null);let i=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0);let o=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(t),e.deleteFramebuffer(i),o}checkRenderFloat32(){if(2===this.version){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(2===this.version){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,t,n,i,o,s;try{t=e.createTexture(),n=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,t);let a=2===this.version?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,a,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),e.enable(e.BLEND),!!(i=e.createShader(e.VERTEX_SHADER))&&(e.shaderSource(i,"void main(){}"),e.compileShader(i),!!(o=e.createShader(e.FRAGMENT_SHADER)))&&(e.shaderSource(o,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(o),!!(s=e.createProgram()))&&(e.attachShader(s,i),e.attachShader(s,o),e.linkProgram(s),e.useProgram(s),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),s&&e.deleteProgram(s),i&&e.deleteShader(i),o&&e.deleteShader(o),n&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(n)),t&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(t))}}beginTimer(){if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension,n=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,n),n}throw Error("WebGL1 profiling currently not supported.")}endTimer(){if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension;e.endQuery(t.TIME_ELAPSED_EXT);return}throw Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let t=!1,n=!1;if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let i=this.gl,o=this.disjointTimerQueryWebgl2Extension;t=i.getQueryParameter(e,i.QUERY_RESULT_AVAILABLE),n=i.getParameter(o.GPU_DISJOINT_EXT)}else throw Error("WebGL1 profiling currently not supported");return t&&!n}getTimerResult(e){let t=0;if(2===this.version){let n=this.gl;t=n.getQueryParameter(e,n.QUERY_RESULT),n.deleteQuery(e)}else throw Error("WebGL1 profiling currently not supported");return t/1e6}async waitForQueryAndGetTime(e){return await eu(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,n=e,i=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),t=null===i?()=>!0:()=>{let e=n.clientWaitSync(i,0,0);return e===n.ALREADY_SIGNALED||e===n.CONDITION_SATISFIED},{query:i,isFencePassed:t}}async pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=_S(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,t){this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1||await eu(()=>(this.pollItems(),0===this.itemsToPoll.length))}}});function Eu(e){let t;if((!e||"webgl2"===e)&&"webgl2"in vr?t=vr.webgl2:(!e||"webgl"===e)&&"webgl"in vr&&(t=vr.webgl),!t)try{let n=wS();t=_m(n,e)}catch{t=_m(xS(),e)}e=e||1===t.version?"webgl":"webgl2";let n=t.gl;return vr[e]=t,n.isContextLost()?(delete vr[e],Eu(e)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),t)}function _m(e,t){let n,i={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1};if((!t||"webgl2"===t)&&(n=e.getContext("webgl2",i)))try{return new Xr(n,2)}catch(e){Te.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${e}`)}if((!t||"webgl"===t)&&(n=e.getContext("webgl",i)||e.getContext("experimental-webgl",i)))try{return new Xr(n,1)}catch(e){Te.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${e}`)}throw Error("WebGL is not supported")}function xS(){if(typeof document>"u")throw TypeError("failed to create canvas: document is not supported");let e=document.createElement("canvas");return e.width=1,e.height=1,e}function wS(){if(typeof OffscreenCanvas>"u")throw TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var vr,li,xm=$(()=>{"use strict";ct(),ym(),vr={}}),wm=$(()=>{"use strict";qe(),ct(),bm(),xm(),li=class{get contextId(){return te.webgl.contextId}set contextId(e){te.webgl.contextId=e}get matmulMaxBatchSize(){return te.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){te.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return te.webgl.textureCacheMode}set textureCacheMode(e){te.webgl.textureCacheMode=e}get pack(){return te.webgl.pack}set pack(e){te.webgl.pack=e}get async(){return te.webgl.async}set async(e){te.webgl.async=e}initialize(){try{return this.glContext=Eu(this.contextId),"number"!=typeof this.matmulMaxBatchSize&&(this.matmulMaxBatchSize=16),"string"!=typeof this.textureCacheMode&&(this.textureCacheMode="full"),"boolean"!=typeof this.pack&&(this.pack=!1),"boolean"!=typeof this.async&&(this.async=!1),Te.setWithEnv(te),te.webgl.context||Object.defineProperty(te.webgl,"context",{value:this.glContext.gl}),Te.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Te.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new ui(this,e)}dispose(){this.glContext.dispose()}}});async function Cu(e){if(!e)return Cu(["webgl"]);for(let t of"string"==typeof e?[e]:e){let e=Tm.get(t);if(e)return e;let n=await vS(t);if(n)return n}throw Error("no available backend to use")}async function vS(e){let t=TS;if("u">typeof t[e]&&IS(t[e])){let n=t[e],i=n.initialize();if("object"==typeof i&&"then"in i&&(i=await i),i)return Tm.set(e,n),n}}function IS(e){let t=e;return"initialize"in t&&"function"==typeof t.initialize&&"createSessionHandler"in t&&"function"==typeof t.createSessionHandler&&"dispose"in t&&"function"==typeof t.dispose}var Tm,TS,Du,ci,de,Zr,Lu,Ru,fn,di,ku,Am,Pm,pi,fi,hi,vm=$(()=>{"use strict";wm(),Tm=new Map,TS={webgl:new li}}),Im=$(()=>{"use strict";ct(),Du=class{constructor(e,t){this.op=e,this.node=t}},ci=class{constructor(e,t,n){this.graph=e,this.profiler=n,this.initialize(t)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let t=this.graph.getNodes();if(t.length!==e.length)throw Error("The size of nodes and OPs do not match.");this._ops=e.map((e,n)=>new Du(e,t[n])),this.reset(),this._starter=[],this._ops.forEach((e,t)=>{let n=!0;for(let t of e.node.inputs)if(!this._values[t]&&-1===this.graph.getInputIndices().indexOf(t)){n=!1;break}n&&this._starter.push(t)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,t){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let n=e.createInferenceHandler(),i=this.graph.getInputIndices();if(t.length!==i.length)throw Error(`number of input tensors don't match the number of inputs to the model: actual: ${t.length} expected: ${i.length}`);t.forEach((e,t)=>{let n=i[t];this._values[n]=e});let o=this._starter.slice(0),s=this.graph.getValues(),a=this.graph.getNodes(),u=0;for(;u<o.length;){let e=o[u++],t=this._ops[e],i=t.node.inputs.map(e=>this._values[e]);if(-1!==i.indexOf(void 0))throw Error(`unresolved input detected: op: ${t.node}`);let l=i;Te.verbose("ExecPlan",`Running op:${t.node.name} (${l.map((e,n)=>`'${t.node.inputs[n]}': ${e.type}[${e.dims.join(",")}]`).join(", ")})`);let d=await this.profiler.event("node",t.node.name,async()=>t.op.impl(n,l,t.op.context));if(d.length!==t.node.outputs.length)throw Error("the size of output does not match model definition.");d.forEach((e,n)=>{let i=t.node.outputs[n];if(this._values[i])throw Error(`output [${i}] already has value: op:${t.node.name}`);this._values[i]=e});let p=new Set;d.forEach((e,n)=>{for(let e of s[t.node.outputs[n]].to){let t=a[e],n=!0;for(let e of t.inputs)if(!this._values[e]){n=!1;break}n&&p.add(e)}}),o.push(...p)}let l=[];for(let e=0;e<this.graph.getOutputIndices().length;e++){let t=this.graph.getOutputIndices()[e],n=this._values[t];if(void 0===n)throw Error(`required output [${t}] does not have value`);0===t?await n.getData():n.data,l.push(n)}return Te.verbose("ExecPlan","disposing of inferenceHandler"),n.dispose(),l})}}}),Sm=$(()=>{"use strict";zr(),de=se(mr()),er(),xe(),Zr=class e{constructor(t){if(this._attributes=new Map,null!=t){for(let n of t)n instanceof de.onnx.AttributeProto?this._attributes.set(n.name,[e.getValue(n),e.getType(n)]):n instanceof Do.Attribute&&this._attributes.set(n.name(),[e.getValue(n),e.getType(n)]);if(this._attributes.size<t.length)throw Error("duplicated attribute names")}}set(e,t,n){this._attributes.set(e,[n,t])}delete(e){this._attributes.delete(e)}getFloat(e,t){return this.get(e,"float",t)}getInt(e,t){return this.get(e,"int",t)}getString(e,t){return this.get(e,"string",t)}getTensor(e,t){return this.get(e,"tensor",t)}getFloats(e,t){return this.get(e,"floats",t)}getInts(e,t){return this.get(e,"ints",t)}getStrings(e,t){return this.get(e,"strings",t)}getTensors(e,t){return this.get(e,"tensors",t)}get(e,t,n){let i=this._attributes.get(e);if(void 0===i){if(void 0!==n)return n;throw Error(`required attribute not found: ${e}`)}if(i[1]!==t)throw Error(`type mismatch: expected ${t} but got ${i[1]}`);return i[0]}static getType(e){let t=e instanceof de.onnx.AttributeProto?e.type:e.type();switch(t){case de.onnx.AttributeProto.AttributeType.FLOAT:return"float";case de.onnx.AttributeProto.AttributeType.INT:return"int";case de.onnx.AttributeProto.AttributeType.STRING:return"string";case de.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case de.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case de.onnx.AttributeProto.AttributeType.INTS:return"ints";case de.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case de.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw Error(`attribute type is not supported yet: ${de.onnx.AttributeProto.AttributeType[t]}`)}}static getValue(e){let t=e instanceof de.onnx.AttributeProto?e.type:e.type();if(t===de.onnx.AttributeProto.AttributeType.GRAPH||t===de.onnx.AttributeProto.AttributeType.GRAPHS)throw Error("graph attribute is not supported yet");let n=this.getValueNoCheck(e);if(t===de.onnx.AttributeProto.AttributeType.INT&&nt.isLong(n))return nt.longToNumber(n);if(t===de.onnx.AttributeProto.AttributeType.INTS){let e=n,t=Array(e.length);for(let n=0;n<e.length;n++){let i=e[n];t[n]=nt.longToNumber(i)}return t}if(t===de.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof de.onnx.AttributeProto?Ne.fromProto(n):Ne.fromOrtTensor(n);if(t===de.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof de.onnx.AttributeProto)return n.map(e=>Ne.fromProto(e));if(e instanceof Do.Attribute)return n.map(e=>Ne.fromOrtTensor(e))}return t===de.onnx.AttributeProto.AttributeType.STRING&&e instanceof de.onnx.AttributeProto?Gr(n):t===de.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof de.onnx.AttributeProto?n.map(Gr):n}static getValueNoCheck(e){return e instanceof de.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case de.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case de.onnx.AttributeProto.AttributeType.INT:return e.i;case de.onnx.AttributeProto.AttributeType.STRING:return e.s;case de.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case de.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case de.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case de.onnx.AttributeProto.AttributeType.INTS:return e.ints;case de.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case de.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case de.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw Error(`unsupported attribute type: ${de.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case ht.AttributeType.FLOAT:return e.f();case ht.AttributeType.INT:return e.i();case ht.AttributeType.STRING:return e.s();case ht.AttributeType.TENSOR:return e.t();case ht.AttributeType.GRAPH:return e.g();case ht.AttributeType.FLOATS:return e.floatsArray();case ht.AttributeType.INTS:{let t=[];for(let n=0;n<e.intsLength();n++)t.push(e.ints(n));return t}case ht.AttributeType.STRINGS:{let t=[];for(let n=0;n<e.stringsLength();n++)t.push(e.strings(n));return t}case ht.AttributeType.TENSORS:{let t=[];for(let n=0;n<e.tensorsLength();n++)t.push(e.tensors(n));return t}default:throw Error(`unsupported attribute type: ${ht.AttributeType[e.type()]}`)}}}}),$m=$(()=>{"use strict";Sm(),zr(),Lu=se(mr()),er(),xe(),Ru={from:(e,t)=>new ku(e,t)},fn=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=je.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},di=class{constructor(e,t){e instanceof Lu.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Zr(e.attribute)):e instanceof Ns.Node&&(this.name=t??e.name(),this.opType=e.opType(),this.attributes=new Zr(je.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},ku=class{constructor(e,t){if(!e)throw TypeError("graph is empty");this.buildGraph(e),this.transformGraph(t),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof Lu.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof Ls.Graph)this.buildGraphFromOrtFormat(e);else throw TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let n=new Map;if(!e.input)throw Error("missing information in graph: input");let i=[];for(let n of e.input){if(t.has(n.name))throw Error(`duplicated input name: ${n.name}`);let e=this._allData.push(new fn(n))-1;t.set(n.name,e),i.push(n.name)}if(!e.initializer)throw Error("missing information in graph: initializer");for(let n of e.initializer){let e=t.get(n.name);if(void 0===e){let i=new fn;i.type={shape:{dims:je.tensorDimsFromProto(n.dims)},tensorType:je.tensorDataTypeFromProto(n.dataType)},e=this._allData.push(i)-1,t.set(n.name,e)}this._allData[e]._from=-1,this._allData[e].tensor=Ne.fromProto(n)}for(let e=0;e<this._allData.length;e++)this._allData[e].tensor||(this._allInputIndices.push(e),this._allInputNames.push(i[e]));if(!e.output)throw Error("missing information in graph: output");for(let n of e.output){if(t.has(n.name))throw Error(`duplicated output name: ${n.name}`);let e=this._allData.push(new fn(n))-1;t.set(n.name,e),this._allOutputIndices.push(e),this._allOutputNames.push(n.name)}if(!e.node)throw Error("missing information in graph: node");for(let t of e.node){if(!t.name)for(let e=0;;e++){let i=`unnamed_${t.opType}_${e}`;if(!n.has(i)){t.name=i;break}}if(n.has(t.name))throw Error(`duplicated node name: ${t.name}`);let e=this._nodes.push(new di(t))-1;n.set(t.name,e)}for(let n=0;n<this._nodes.length;n++){let i=this._nodes[n],o=e.node[n];if(!o.output)throw Error(`missing output for node: ${o.name}`);for(let e of o.output){let s=t.get(e);if(typeof s>"u"&&(s=this._allData.push(new fn)-1,t.set(e,s)),i.outputs.push(s),void 0!==this._allData[s]._from)throw Error(`multiple nodes output to one data value: ${s}`);if(this._allData[s]._from=n,"Constant"===o.opType){if(!o.attribute||1!==o.attribute.length||!o.attribute[0].t)throw Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!o.output||1!==o.output.length)throw Error("missing output or incorrect number of outputs for this Constant operator");i.outputs.pop(),i.executeNode=!1,this._allData[s]._from=-1,this._allData[s].tensor=Ne.fromProto(o.attribute[0].t)}}}for(let n=0;n<this._nodes.length;n++){let i=this._nodes[n],o=e.node[n];if(!o.input)throw Error(`missing input for node: ${o.name}`);for(let e of o.input){let s=t.get(e);if(typeof s>"u"){if(""===e&&(3===o.input.length||4===o.input.length)&&"Resize"===o.opType)continue;throw Error(`unrecognized input '${e}' for node: ${o.name}`)}i.inputs.push(s),this._allData[s]._to.push(n)}}return!0}buildGraphFromOrtFormat(e){let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let n=new Map,i=[];for(let n=0;n<e.inputsLength();n++){let o=e.inputs(n);if(t.has(o))throw Error(`duplicated input name: ${o}`);for(let n=0;n<e.nodeArgsLength();n++)if(e.nodeArgs(n)?.name()===o){let s=new fn;if(e.nodeArgs(n)?.type()?.valueType()!==Ms.TypeInfoValue.tensor_type)throw Error("Unexpected value type for the nodeArg.");let a=e.nodeArgs(n).type().value(new zs.TensorTypeAndShape),u=je.tensorDataTypeFromProto(a.elemType()),l=a.shape(),d=[];for(let e=0;e<l.dimLength();e++)d.push(nt.longToNumber(l.dim(e).value().dimValue()));s.type={shape:{dims:d},tensorType:u};let p=this._allData.push(s)-1;t.set(o,p),i.push(o)}}for(let n=0;n<e.initializersLength();n++){let i=e.initializers(n),o=t.get(i.name());if(void 0===o){let e=new fn;e.type={shape:{dims:je.tensorDimsFromORTFormat(i)},tensorType:je.tensorDataTypeFromProto(i.dataType())},o=this._allData.push(e)-1,t.set(i.name(),o)}this._allData[o]._from=-1,this._allData[o].tensor=Ne.fromOrtTensor(i)}for(let e=0;e<this._allData.length;e++)this._allData[e].tensor||(this._allInputIndices.push(e),this._allInputNames.push(i[e]));for(let n=0;n<e.outputsLength();n++){let i=e.outputs(n);if(t.has(i))throw Error(`duplicated output name: ${i}`);let o=this._allData.push(new fn)-1;t.set(i,o),this._allOutputIndices.push(o),this._allOutputNames.push(i)}if(!e.nodes)throw Error("missing information in graph: node");for(let t=0;t<e.nodesLength();t++){let i=e.nodes(t),o=i.name();if(!o)for(let e=0;o=`unnamed_${i.opType()}_${e}`,n.has(o);e++);if(n.has(o))throw Error(`duplicated node name: ${o}`);let s=this._nodes.push(new di(i,o))-1;n.set(o,s)}for(let n=0;n<this._nodes.length;n++){let i=this._nodes[n],o=e.nodes(n);if(null==o)throw Error(`No node exists at index ${n}`);if(o?.outputsLength()===0)throw Error(`missing output for node: ${o.name}`);for(let e=0;e<o?.outputsLength();e++){let s=o?.outputs(e),a=t.get(s);if(typeof a>"u"&&(a=this._allData.push(new fn)-1,t.set(s,a)),i.outputs.push(a),void 0!==this._allData[a]._from)throw Error(`multiple nodes output to one data value: ${a}`);if(this._allData[a]._from=n,"Constant"===o.opType()){if(1!==o.attributesLength()||!o.attributes(0).t())throw Error("missing attributes or missing tensor value in attributes for this Constant operator");if(1!==o.outputsLength())throw Error("missing output or incorrect number of outputs for this Constant operator");i.outputs.pop(),i.executeNode=!1,this._allData[a]._from=-1,this._allData[a].tensor=Ne.fromOrtTensor(o.attributes(0).t())}}}for(let n=0;n<this._nodes.length;n++){let i=this._nodes[n],o=e.nodes(n);if(0===o.inputsLength())throw Error(`missing input for node: ${o.name}`);for(let e=0;e<o.inputsLength();e++){let s=o.inputs(e),a=t.get(s);if(typeof a>"u")throw Error(`unrecognized input '${s}' for node: ${o.name()}`);i.inputs.push(a),this._allData[a]._to.push(n)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(t=>{this._allData[t]._to.forEach(t=>{e.add(t)})});let t=Array.from(e),n=Array(this._nodes.length).fill("white");for(;t.length>0;){let e=t.pop();"gray"===n[e]?n[e]="black":(t.push(e),n[e]="gray",this._nodes[e].outputs.forEach(i=>{let o=this._allData[i];if("u">typeof o.tensor)throw Error("node outputs should not be initialized");if(o._from!==e)throw Error("from property of the Value object doesn't match index of Node being processed");o._to.forEach(e=>{if("gray"===n[e])throw Error("model graph is cyclic");"white"===n[e]&&t.push(e)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,t=[this._nodes.length,0],n=0;for(let e=0;e<this._nodes.length;e++)t[e]=n,this._nodes[e].executeNode?(n!==e&&(this._nodes[n]=this._nodes[e]),n++):this._nodes[e].outputs.forEach(e=>{this._allData[e]._from=-2});this._nodes.splice(n,this._nodes.length-n);for(let e=0;e<this._allData.length;e++){let n=this._allData[e];void 0!==n._from&&-1!==n._from&&-2!==n._from&&(n._from=t[n._from]);for(let e=0;e<n._to.length;e++)if(n._to[e]>=0)n._to[e]=t[n._to[e]];else throw Error("Trying to update a removed node")}e=0;for(let t=0;t<this._allData.length;t++){if(-2===this._allData[t].from&&-1===this._allOutputIndices.indexOf(t+e)){e++,this._allData.splice(t,1),t--;continue}if(e>0){let n=-1;void 0!==this._allData[t].from&&-1!==this._allData[t].from?-1!==(n=this._nodes[this._allData[t].from].outputs.indexOf(t+e))&&(this._nodes[this._allData[t].from].outputs[n]=t):-1!==(n=this._allInputIndices.indexOf(t+e))&&(this._allInputIndices[n]=t),this._allData[t].to.forEach(i=>{-1!==(n=this._nodes[i].inputs.indexOf(t+e))&&(this._nodes[i].inputs[n]=t)}),0===this._allData[t].to.length&&-1!==(n=this._allOutputIndices.indexOf(t+e))&&(this._allOutputIndices[n]=t)}}}deleteNode(e){let t=this._nodes[e];if(t.outputs.length>1){for(let e=1;e<t.outputs.length;e++)if(this._allData[t.outputs[e]].to.length>0)throw Error("Node deletion with more than one output connected to other nodes is not supported. ")}t.executeNode=!1;let n=t.inputs[0],i=t.outputs[0],o=this._allData[i].to;for(let n=0;n<t.inputs.length;n++){let i=this._allData[t.inputs[n]].to.indexOf(e);if(-1===i)throw Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[t.inputs[n]].to.splice(i,1)}this._allData[i]._to=[];let s=this._allOutputIndices.indexOf(i);if(-1!==s&&(this._allOutputIndices[s]=n),o&&o.length>0)for(let e of o){let t=this._nodes[e].inputs.indexOf(i);if(-1===t)throw Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[e].inputs[t]=n,this._allData[n].to.push(e)}}removeAllDropoutNodes(){let e=0;for(let t of this._nodes){if("Dropout"===t.opType){if(1!==t.inputs.length)throw Error("Dropout nodes should only contain one input. ");if(1!==t.outputs.length&&2!==t.outputs.length)throw Error("Dropout nodes should contain either 1 or 2 output(s)");if(2===t.outputs.length&&0!==this._allData[t.outputs[1]]._to.length)throw Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let t of this._nodes)"Identity"===t.opType&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if("Conv"===e.opType){let t=this._allData[e.outputs[0]]._to;if(1===t.length&&this.isActivation(this._nodes[t[0]])){let n=this._nodes[t[0]];if("Clip"===n.opType)if(1===n.inputs.length)try{e.attributes.set("activation_params","floats",[n.attributes.getFloat("min"),n.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[Qn,Yn])}else{if(!(n.inputs.length>=3)||void 0===this._allData[n.inputs[1]].tensor||void 0===this._allData[n.inputs[2]].tensor)continue;e.attributes.set("activation_params","floats",[this._allData[n.inputs[1]].tensor.floatData[0],this._allData[n.inputs[2]].tensor.floatData[0]])}e.attributes.set("activation","string",n.opType),this.deleteNode(t[0])}}}}}),Om=$(()=>{"use strict";Am=se(_e()),$m(),zr(),Pm=se(mr()),xe(),pi=class{load(e,t,n){let i;if(!n)try{this.loadFromOnnxFormat(e,t);return}catch(e){if(void 0!==n)throw e;i=e}try{this.loadFromOrtFormat(e,t)}catch(e){throw void 0!==n?e:Error(`Failed to load model as ONNX format: ${i}
as ORT format: ${e}`)}}loadFromOnnxFormat(e,t){let n=Pm.onnx.ModelProto.decode(e);if(3>nt.longToNumber(n.irVersion))throw Error("only support ONNX model with IR_VERSION>=3");this._opsets=n.opsetImport.map(e=>({domain:e.domain,version:nt.longToNumber(e.version)})),this._graph=Ru.from(n.graph,t)}loadFromOrtFormat(e,t){let n=new Am.ByteBuffer(e),i=Rs.InferenceSession.getRootAsInferenceSession(n).model();if(3>nt.longToNumber(i.irVersion()))throw Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let e=0;e<i.opsetImportLength();e++){let t=i.opsetImport(e);this._opsets.push({domain:t?.domain(),version:nt.longToNumber(t.version())})}this._graph=Ru.from(i.graph(),t)}get graph(){return this._graph}get opsets(){return this._opsets}}}),Em=$(()=>{"use strict";vm(),Im(),ct(),Om(),fi=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=yo.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,t,n){await this.profiler.event("session","Session.loadModel",async()=>{let i=await Cu(this.backendHint);if(this.sessionHandler=i.createSessionHandler(this.context),this._model=new pi,"string"==typeof e){let t=e.endsWith(".ort");{let n=await (await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(n),t)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,t||0,n||e.byteLength);this.initialize(i)}})}initialize(e,t){if(this._initialized)throw Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let n=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,n,t),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new ci(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let t=this.normalizeAndValidateInputs(e),n=await this._executionPlan.execute(this.sessionHandler,t);return this.createOutput(n)})}normalizeAndValidateInputs(e){let t=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==t.length)throw Error(`incorrect input array length: expected ${t.length} but got ${e.length}`)}else{if(e.size!==t.length)throw Error(`incorrect input map size: expected ${t.length} but got ${e.size}`);let n=Array(e.size),i=0;for(let o=0;o<t.length;++o){let s=e.get(t[o]);if(!s)throw Error(`missing input tensor for: '${name}'`);n[i++]=s}e=n}if(this.context.graphInputTypes&&0!==this.context.graphInputTypes.length&&this.context.graphInputDims&&0!==this.context.graphInputDims.length)this.validateInputTensorDims(this.context.graphInputDims,e,!1);else{let t=this._model.graph.getInputIndices(),n=this._model.graph.getValues(),i=Array(t.length);for(let o=0;o<t.length;++o){let s=n[t[o]];i[o]=s.type.shape.dims,this.context.graphInputTypes.push(s.type.tensorType),this.context.graphInputDims.push(e[o].dims)}this.validateInputTensorDims(i,e,!0)}return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,t){for(let n=0;n<t.length;n++){let i=e[n],o=t[n].type;if(i!==o)throw Error(`input tensor[${n}] check failed: expected type '${i}' but got ${o}`)}}validateInputTensorDims(e,t,n){for(let i=0;i<t.length;i++){let o=e[i],s=t[i].dims;if(!this.compareTensorDims(o,s,n))throw Error(`input tensor[${i}] check failed: expected shape '[${o.join(",")}]' but got [${s.join(",")}]`)}}compareTensorDims(e,t,n){if(e.length!==t.length)return!1;for(let i=0;i<e.length;++i)if(e[i]!==t[i]&&(!n||0!==e[i]))return!1;return!0}createOutput(e){let t=this._model.graph.getOutputNames();if(e.length!==t.length)throw Error("expected number of outputs do not match number of generated outputs");let n=new Map;for(let i=0;i<t.length;++i)n.set(t[i],e[i]);return n}initializeOps(e){let t=e.getNodes();this._ops=Array(t.length);for(let n=0;n<t.length;n++)this._ops[n]=this.sessionHandler.resolve(t[n],this._model.opsets,e)}}}),Cm=$(()=>{"use strict";qe(),er(),hi=class{constructor(e){this.session=e,this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,t,n){let i=new Map;for(let t in e)if(Object.hasOwnProperty.call(e,t)){let n=e[t];i.set(t,new Ne(n.dims,n.type,void 0,void 0,n.data))}let o=await this.session.run(i),s={};return o.forEach((e,t)=>{s[t]=new ot(e.type,e.data,e.dims)}),s}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}}),Dm={};dr(Dm,{onnxjsBackend:()=>SS});var SS,km=$(()=>{"use strict";Em(),Cm(),SS=new class{async init(){}async createInferenceSessionHandler(e,t){let n=new fi(t);return await n.loadModel(e),new hi(n)}}}),mi=$(()=>{}),Nm={};dr(Nm,{default:()=>$S});var Lm,Rm,$S,Vm,AS,st,Si,Mu,OS,ES,Fm,CS,Mm,Gm,Bm,Um,Bu,Vu,$i,Wm,DS,kS,LS,bi,we,ut,Qr,fe,Hm,RS,NS,zS,Pi,MS,jm,Bn,hn,Vn,Ir,Yr,Oi,Ei,Fu,eo,BS,VS,Xm,Zm,Ci,FS,ie,Uu,gn,S,ar,Di,Jm,Qm,ki,eg,qu,tg,GS,Ym,US,ng,Li,Ri,Hu,rg,Ni,WS,zi,ag,ju,Ku,HS,qS,sg,Zu,Xu,lg,Ju,J,sr,Yu,ve,Ve,k,he,el,ur,$t,M,Bi,A,C,dg,Vi,Qu,pg,jS,fg,KS,XS,ZS,JS,Fe,hg,mg,QS,YS,e1,t1,n1,r1,o1,i1,a1,s1,bn,gg,bg,yg,_g,xg,wg,Tg,vg,Ig,Sg,yn,u1,Gi,tl,_n,l1,c1,d1,p1,f1,h1,m1,g1,b1,y1,xn,Ag,Pg,Og,Eg,Cg,Dg,kg,Lg,Rg,Ng,zg,Mg,Bg,nl,_1,rl,x1,w1,T1,Sr,v1,Fg,I1,S1,$1,Gg,A1,P1,Wg,O1,be,qg,jg,Kg,Xg,Zg,Jg,Qg,Yg,eb,E1,tb,nb,rb,ob,to,ib,Wi,ab,sb,ub,lb,cb,db,pb,fb,hb,mb,gb,bb,yb,_b,xb,wb,Tb,vb,ol,il,Ib,Sb,$b,C1,D1,Ab,k1,L1,Ob,R1,N1,wn,Cb,Db,kb,Lb,Rb,Nb,zb,Mb,Bb,Vb,M1,B1,V1,F1,Gb,Ub,At,Pt,Ot,qi,ze,Hb,qb,no,Ki,G1,U1,al,Kb,W1,sl,H1,ro,q1,Xb,j1,Jb,Ji,K1,Qb,X1,Yb,ey,ny,ry,Z1,ul,J1,ll,cl,iy,Q1,Y1,dl,sy,e$,t$,n$,ly,cy,r$,dy,o$,py,i$,hy,my,a$,s$,u$,by,yy,pl,Qi,xy,c$,fl,hl,wy,d$,Ty,vy,p$,Sy,f$,h$,$y,m$,Py,g$,b$,Ey,Cy,y$,ky,Ly,_$,x$,Ny,zy,w$,T$,By,Vy,v$,I$,Gy,Uy,Sn,Gn,$r,Ar,S$,$$,A$,P$,O$,E$,C$,D$,Hy,qy,rt,R$,Xy,Ky,N$,oo,Zy,z$,M$,B$,V$,gl,Jy,Qy,F$,Yi,Yy,G$,U$,e_,W$,t_,r_,H$,q$,o_,j$,K$,a_,X$,u_,Z$,J$,Q$,c_,d_,Y$,eA,tA,nA,rA,oA,iA,aA,f_,ea,m_,g_,b_,y_,sA,uA,__,x_,w_,T_,v_,I_,S_,$_,A_,P_,O_,E_,cA,dA,D_,k_,pA,fA,R_,hA,mA,z_,M_,gA,bA,yA,V_,_A,xA,wA,TA,vA,IA,SA,$A,F_,AA,PA,OA,EA,CA,G_,U_,DA,kA,H_,LA,ta,RA,j_,NA,zA,K_,X_,MA,BA,J_,Q_,ex,VA,FA,GA,tx,UA,WA,rx,ix,na,zm=$(()=>{"use strict";zu(),Mn(),gi(),Lm="ort-wasm-proxy-worker",(Rm=globalThis.self?.name===Lm)&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case"init-wasm":bi(n.wasm).then(()=>{yi(n).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})})},e=>{postMessage({type:t,err:e})});break;case"init-ep":{let{epName:e,env:i}=n;_i(i,e).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})});break}case"copy-from":{let{buffer:e}=n,i=Jr(e);postMessage({type:t,out:i});break}case"create":{let{model:e,options:i}=n;xi(e,i).then(e=>{postMessage({type:t,out:e})},e=>{postMessage({type:t,err:e})});break}case"release":wi(n),postMessage({type:t});break;case"run":{let{sessionId:e,inputIndices:i,inputs:o,outputIndices:s,options:a}=n;Ti(e,i,o,s,Array(s.length).fill(null),a).then(e=>{e.some(e=>"cpu"!==e[3])?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:e},Ii([...o,...e]))},e=>{postMessage({type:t,err:e})});break}case"end-profiling":vi(n),postMessage({type:t})}}catch(e){postMessage({type:t,err:e})}}),$S=Rm?null:e=>new Worker(e??st,{type:"module",name:Lm})}),gi=$(()=>{"use strict";mi(),Vm=typeof location>"u"?void 0:location.origin,AS=import.meta.url>"file:"&&import.meta.url<"file;",st=(()=>{if(AS){let e=URL;return new URL(new e("ort.all.min.mjs",import.meta.url).href,Vm).href}return import.meta.url})(),Si=()=>{if(st&&!st.startsWith("blob:"))return st.substring(0,st.lastIndexOf("/")+1)},Mu=(e,t)=>{try{let n=t??st;return(n?new URL(e,n):new URL(e)).origin===Vm}catch{return!1}},OS=(e,t)=>{let n=t??st;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},ES=(e,t)=>`${t??"./"}${e}`,Fm=async e=>{let t=await (await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},CS=async e=>(await import(e)).default,Mm=(zm(),Er(Nm)).default,Gm=async()=>{if(!st)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(Mu(st))return[void 0,Mm()];let e=await Fm(st);return[e,Mm(e)]},Bm=void 0,Um=async(e,t,n,i)=>{let o=Bm&&!(e||t);if(o)if(st)o=Mu(st)||i&&!n;else if(i&&!n)o=!0;else throw Error("cannot determine the script source URL.");if(o)return[void 0,Bm];{let i="ort-wasm-simd-threaded.jsep.mjs",o=e??OS(i,t),s=n&&o&&!Mu(o,t),a=s?await Fm(o):o??ES(i,t);return[s?a:void 0,await CS(a)]}}}),Mn=$(()=>{"use strict";gi(),Vu=!1,$i=!1,Wm=!1,DS=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},kS=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},LS=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},bi=async e=>{if(Vu)return Promise.resolve();if($i)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(Wm)throw Error("previous call to 'initializeWebAssembly()' failed.");$i=!0;let t=e.initTimeout,n=e.numThreads;if(!1!==e.simd){if("relaxed"===e.simd){if(!LS())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!kS())throw Error("WebAssembly SIMD is not supported in the current environment.")}let i=DS();n>1&&!i&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let o=e.wasmPaths,s="string"==typeof o?o:void 0,a=o?.mjs,u=a?.href??a,l=o?.wasm,d=l?.href??l,p=e.wasmBinary,[c,h]=await Um(u,s,n>1,!!p||!!d),f=!1,m=[];if(t>0&&m.push(new Promise(e=>{setTimeout(()=>{f=!0,e()},t)})),m.push(new Promise((e,t)=>{let i={numThreads:n};if(p)i.wasmBinary=p,i.locateFile=e=>e;else if(d||s)i.locateFile=e=>d??s+e;else if(u&&0!==u.indexOf("blob:"))i.locateFile=e=>new URL(e,u).href;else if(c){let e=Si();e&&(i.locateFile=t=>e+t)}h(i).then(t=>{$i=!1,Vu=!0,Bu=t,e(),c&&URL.revokeObjectURL(c)},e=>{$i=!1,Wm=!0,t(e)})})),await Promise.race(m),f)throw Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},we=()=>{if(Vu&&Bu)return Bu;throw Error("WebAssembly is not initialized yet.")}}),Ai=$(()=>{"use strict";Mn(),ut=(e,t)=>{let n=we(),i=n.lengthBytesUTF8(e)+1,o=n._malloc(i);return n.stringToUTF8(e,o,i),t.push(o),o},Qr=(e,t,n,i)=>{if("object"==typeof e&&null!==e){if(n.has(e))throw Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([e,o])=>{let s=t?t+e:e;if("object"==typeof o)Qr(o,s+".",n,i);else if("string"==typeof o||"number"==typeof o)i(s,o.toString());else if("boolean"==typeof o)i(s,o?"1":"0");else throw Error(`Can't handle extra config type: ${typeof o}`)})},fe=e=>{let t=we(),n=t.stackSave();try{let n=t.PTR_SIZE,i=t.stackAlloc(2*n);t._OrtGetLastError(i,i+n);let o=Number(t.getValue(i,4===n?"i32":"i64")),s=t.getValue(i+n,"*"),a=s?t.UTF8ToString(s):"";throw Error(`${e} ERROR_CODE: ${o}, ERROR_MESSAGE: ${a}`)}finally{t.stackRestore(n)}}}),qm=$(()=>{"use strict";Mn(),Ai(),Hm=e=>{let t=we(),n=0,i=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if("number"!=typeof e.logSeverityLevel||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if("number"!=typeof e.logVerbosityLevel||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let s=0;return e?.tag!==void 0&&(s=ut(e.tag,i)),n=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,s),0===n&&fe("Can't create run options."),e?.extra!==void 0&&Qr(e.extra,"",new WeakSet,(e,o)=>{let s=ut(e,i),a=ut(o,i);0!==t._OrtAddRunConfigEntry(n,s,a)&&fe(`Can't set a run config entry: ${e} - ${o}.`)}),[n,i]}catch(e){throw 0!==n&&t._OrtReleaseRunOptions(n),i.forEach(e=>t._free(e)),e}}}),Km=$(()=>{"use strict";Mn(),Ai(),RS=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}},NS=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${e}`)}},zS=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(e=>("string"==typeof e?e:e.name)==="webgpu")&&(e.enableMemPattern=!1)},Pi=(e,t,n,i)=>{let o=ut(t,i),s=ut(n,i);0!==we()._OrtAddSessionConfigEntry(e,o,s)&&fe(`Can't set a session config entry: ${t} - ${n}.`)},MS=async(e,t,n)=>{for(let i of t.executionProviders){let t="string"==typeof i?i:i.name,o=[];switch(t){case"webnn":if(t="WEBNN","string"!=typeof i){let t=i?.deviceType;t&&Pi(e,"deviceType",t,n)}break;case"webgpu":if(t="JS","string"!=typeof i){let t=i;if(t?.preferredLayout){if("NCHW"!==t.preferredLayout&&"NHWC"!==t.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${t.preferredLayout}`);Pi(e,"preferredLayout",t.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${t}`)}let s=ut(t,n),a=o.length,u=0,l=0;if(a>0){u=we()._malloc(a*we().PTR_SIZE),n.push(u),l=we()._malloc(a*we().PTR_SIZE),n.push(l);for(let e=0;e<a;e++)we().setValue(u+e*we().PTR_SIZE,o[e][0],"*"),we().setValue(l+e*we().PTR_SIZE,o[e][1],"*")}await we()._OrtAppendExecutionProvider(e,s,u,l,a)!==0&&fe(`Can't append execution provider: ${t}.`)}},jm=async e=>{let t=we(),n=0,i=[],o=e||{};zS(o);try{let e=RS(o.graphOptimizationLevel??"all"),s=NS(o.executionMode??"sequential"),a="string"==typeof o.logId?ut(o.logId,i):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log severity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw Error(`log verbosity level is not valid: ${l}`);let d="string"==typeof o.optimizedModelFilePath?ut(o.optimizedModelFilePath,i):0;if(n=t._OrtCreateSessionOptions(e,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,a,u,l,d),0===n&&fe("Can't create session options."),o.executionProviders&&await MS(n,o,i),void 0!==o.enableGraphCapture){if("boolean"!=typeof o.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);Pi(n,"enableGraphCapture",o.enableGraphCapture.toString(),i)}if(o.freeDimensionOverrides)for(let[e,s]of Object.entries(o.freeDimensionOverrides)){if("string"!=typeof e)throw Error(`free dimension override name must be a string: ${e}`);if("number"!=typeof s||!Number.isInteger(s)||s<0)throw Error(`free dimension override value must be a non-negative integer: ${s}`);let o=ut(e,i);0!==t._OrtAddFreeDimensionOverride(n,o,s)&&fe(`Can't set a free dimension override: ${e} - ${s}.`)}return void 0!==o.extra&&Qr(o.extra,"",new WeakSet,(e,t)=>{Pi(n,e,t,i)}),[n,i]}catch(e){throw 0!==n&&0!==t._OrtReleaseSessionOptions(n)&&fe("Can't release session options."),i.forEach(e=>t._free(e)),e}}}),Z=$(()=>{"use strict";Bn=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${e}`)}},hn=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${e}`)}},Vn=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i="number"==typeof t?t:t.reduce((e,t)=>e*t,1);return n>0?Math.ceil(i*n):void 0},Ir=e=>{switch(e){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},Yr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${e}`)}},Oi=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,Ei=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint64"===e||"int8"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,Fu=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${e}`)}}}),Gu=$(()=>{"use strict";mi(),eo=async e=>{if("string"!=typeof e)return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e);{let t=await fetch(e);if(!t.ok)throw Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),i=n?parseInt(n,10):0;if(i<0x40000000)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),o;try{o=new ArrayBuffer(i)}catch(e){if(e instanceof RangeError){let e=Math.ceil(i/65536);o=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let s=0;for(;;){let{done:e,value:t}=await n.read();if(e)break;let i=t.byteLength;new Uint8Array(o,s,i).set(t),s+=i}return new Uint8Array(o,0,i)}}}}),mn=$(()=>{"use strict";Z(),BS=["V","I","W","E","F"],VS=(e,t)=>{console.log(`[${BS[e]},${new Date().toISOString()}]${t}`)},Ci=(e,t)=>{Xm=e,Zm=t},FS=(e,t)=>{let n=Yr(e);n>=Yr(Xm)&&VS(n,"function"==typeof t?t():t)},ie=(...e)=>{Zm&&FS(...e)}}),ne=$(()=>{"use strict";Uu=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},gn=class{static calcShape(e,t,n=!1){let i=e.length,o=t.length;if(0===i)return t;if(0===o)return e;let s=Math.max(e.length,t.length),a=Array(s);if(n){if(i<2||o<2)return;let n=Uu.calcMatMulShape([e[i-2],e[i-1]],[t[o-2],t[o-1]]);if(void 0===n)return;[a[s-2],a[s-1]]=n}for(let u=n?3:1;u<=s;u++){let n=i-u<0?1:e[i-u],l=o-u<0?1:t[o-u];if(n!==l&&n>1&&l>1)return;let d=Math.max(n,l);if(n&&l)a[s-u]=Math.max(n,l);else{if(d>1)return;a[s-u]=0}}return a}static isValidBroadcast(e,t){let n=e.length,i=t.length;if(n>i)return!1;for(let o=1;o<=n;o++)if(1!==e[n-o]&&e[n-o]!==t[i-o])return!1;return!0}},S=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(e,t=4){let n=e.length;if(0===n)return[];let i=Array(n),o=n-1;for(;o>=0;){if(e[o]%t==0){i[o]=e[o]/t;break}if(t%e[o]!=0)throw Error("cannot convert shape");i[o]=1,t/=e[o],o--}for(o--;o>=0;o--)i[o]=e[o];return i}static sizeFromDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(e,t,n){let i=1;for(let o=t;o<n;o++){if(e[o]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(e[o])}return i}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let n=Array(t);n[t-1]=1,n[t-2]=e[t-1];for(let i=t-3;i>=0;--i)n[i]=n[i+1]*e[i+1];return n}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(n=>this.normalizeAxis(n,t??e.length))}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let n=e.length;return e.map((e,i)=>e+t[i]+t[i+n])}static areEqual(e,t){return e.length===t.length&&e.every((e,n)=>e===t[n])}},ar=class e{static adjustPoolAttributes(e,t,n,i,o,s){if(!e&&n.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=n.length?n.push(t[e+2]):n[e]=t[e+2];for(let e=0;e<n.length;e++)if(e<i.length){if(i[e]<0)throw Error("strides should be greater than or equal to 1")}else i.push(1);for(let e=0;e<n.length;e++)if(e<o.length){if(o[e]<0)throw Error("dilations should be greater than or equal to 1")}else o.push(1);for(let e=0;e<2*n.length;e++)if(e<s.length){if(s[e]<0)throw Error("pad should be greater than or equal to 1")}else s.push(0);for(let e=0;e<n.length;e++){if(n[e]<=0)throw Error("kernel shapes need to be greater than 0");if(s[e]>=n[e]||s[e+n.length]>=n[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,i,o,s,a,u){if(u){if(s.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)e.adjustPadAndReturnShape(t[l+(a?1:2)],n[l],i[l],o[l],s,l,l+t.length-2,u)}}static computePoolOutputShape(t,n,i,o,s,a,u){if(n.length<=0)throw Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return e.computeShapeHelper(t,n,l,i,o,s,a,u),l}static computeConvOutputShape(t,n,i,o,s,a,u){if(t.length<=0||n.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return e.computeShapeHelper(!1,t,l,i,o,s,a,u),l}static computeShapeHelper(t,n,i,o,s,a,u,l){if(t)for(let e=0;e<n.length-2;e++)i.push(1);else for(let t=0;t<n.length-2;t++)i.push(e.adjustPadAndReturnShape(n[t+2],o[t],s[t],a[t],u,t,t+n.length-2,l))}static adjustPadAndReturnShape(e,t,n,i,o,s,a,u){let l=n*(i-1)+1;if(!u||"NOTSET"===u)return Math.floor((e+o[s]+o[a]-l)/t+1);switch(u){case"VALID":return o[s]=0,o[a]=0,Math.floor((e-l)/t+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==n)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let n=((e+t-1)/t-1)*t+i-e;return o[s]=Math.floor("SAME_LOWER"===u?(n+1)/2:n/2),o[a]=n-o[s],Math.floor((e+n-i)/t+1)}default:throw Error("Unsupported AutoPad type")}}},Di=class{static getShapeOfGemmResult(e,t,n,i,o){let s,a,u;if(2!==e.length||2!==n.length)throw Error("shape need to be of size 2");t?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(i?(u=n[0],l=1):(u=n[1],l=0),n[l]!==a)throw Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw Error("invalid shape specified");if(o&&!gn.isValidBroadcast(o,[s,u]))throw Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},Jm=-34028234663852886e22,Qm=34028234663852886e22}),Wu=$(()=>{"use strict";Z(),ki=(e,t)=>new(Ir(t))(e)}),og=$(()=>{"use strict";Z(),mn(),eg=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),qu=(e,t)=>{if("int32"===t)return e;let n=eg.get(t);if(!n)throw Error(`WebNN backend does not support data type: ${t}`);let i=n/8;if(e.byteLength%i!=0)throw Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let o=e.byteLength/i,s=new(Ir(t))(e.buffer,e.byteOffset,o);switch(t){case"int64":case"uint64":{let e=new Int32Array(o);for(let t=0;t<o;t++){let n=s[t];if(n>2147483647n||n<-2147483648n)throw Error("Can not convert int64 data to int32 - value out of range.");e[t]=Number(n)}return new Uint8Array(e.buffer)}case"int8":case"uint8":case"uint32":if("uint32"===t&&s.some(e=>e>0x7fffffff))throw Error("Can not convert uint32 data to int32 - value out of range.");return new Uint8Array(Int32Array.from(s,Number).buffer);default:throw Error(`Unsupported data conversion from ${t} to 'int32'`)}},tg=(e,t)=>{if("int32"===t)return e;if(e.byteLength%4!=0)throw Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case"int64":return new Uint8Array(BigInt64Array.from(i,BigInt).buffer);case"uint64":if(i.some(e=>e<0))throw Error("Can not convert int32 data to uin64 - negative value found.");return new Uint8Array(BigUint64Array.from(i,BigInt).buffer);case"int8":if(i.some(e=>e<-128||e>127))throw Error("Can not convert int32 data to int8 - value out of range.");return new Uint8Array(Int8Array.from(i,Number).buffer);case"uint8":if(i.some(e=>e<0||e>255))throw Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number);case"uint32":if(i.some(e=>e<0))throw Error("Can not convert int32 data to uint32 - negative value found.");return new Uint8Array(Uint32Array.from(i,Number).buffer);default:throw Error(`Unsupported data conversion from 'int32' to ${t}`)}},GS=1,Ym=()=>GS++,US=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),ng=(e,t)=>{let n=eg.get(e);if(!n)throw Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((e,t)=>e*t)*n/8):0},Li=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:i,dataType:o,shape:s,fallbackDataType:a}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=i,this.dataType=o,this.tensorShape=s,this.fallbackDataType=a}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return ng(this.dataType,this.tensorShape)}destroy(){ie("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(!this.fallbackDataType)return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor);{let t=tg(new Uint8Array(await this.mlContext.readTensor(this.mlTensor)),this.dataType);return e?void(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(t):t.buffer}}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((e,t)=>e===n[t])}setIsDataConverted(e){this.isDataConverted=e}},Ri=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,i){let o=this.tensorManager.getMLContext(e),s=this.tensorManager.getMLOpSupportLimits(e),a;if(!s?.input.dataTypes.includes(t)){if(!(a=US.get(t))||s?.input.dataTypes.includes(a))throw Error(`WebNN backend does not support data type: ${t}`);ie("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${a}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(o,t,n))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==ng(t,n))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,u,!0,!0,a),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if("int32"===this.wrapper.fallbackType)t=qu(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength)return void this.wrapper.write(t);ie("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?tg(this.activeUpload,this.wrapper?.type):this.activeUpload;return e?void(e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t)):t.buffer}if(!this.wrapper)throw Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Hu=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Ym();return this.tensorTrackersById.set(e,new Ri(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,i,o){ie("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${i}, copyOld: ${o}}`);let s=this.tensorTrackersById.get(t);if(!s)throw Error("Tensor not found.");return s.ensureTensor(e,n,i,o)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw Error("Tensor not found.");n.upload(t)}async download(e,t){ie("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw Error("Tensor not found.");return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,i){let o=this.getMLContext(e),s=Ym(),a=new Li({sessionId:e,context:o,tensor:t,dataType:n,shape:i});return this.tensorTrackersById.set(s,new Ri(this,a)),this.externalTensors.add(a),s}async getCachedTensor(e,t,n,i,o,s,a){let u=this.getMLContext(e);for(let[i,o]of this.freeTensors.entries())if(o.canReuseTensor(u,t,n)){ie("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${n}`);let o=this.freeTensors.splice(i,1)[0];return o.sessionId=e,o}ie("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${n}}`);let l=await u.createTensor({dataType:a??t,shape:n,dimensions:n,usage:i,writable:o,readable:s});return new Li({sessionId:e,context:u,tensor:l,dataType:t,shape:n,fallbackDataType:a})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},rg=(...e)=>new Hu(...e)}),ig=$(()=>{"use strict";Z(),Mn(),Wu(),og(),mn(),Ni=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),WS=(e,t)=>{if(e===t)return!0;if(void 0===e||void 0===t)return!1;let n=Object.keys(e).sort(),i=Object.keys(t).sort();return n.length===i.length&&n.every((n,o)=>n===i[o]&&e[n]===t[n])},zi=class{constructor(e){this.tensorManager=rg(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Ci(e.logLevel,!!e.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(e){ie("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ie("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let e of t)ie("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(t=>t.gpuDevice===e);if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:t}),t}}if(void 0===e){let e=this.mlContextCache.findIndex(e=>void 0===e.options&&void 0===e.gpuDevice);if(-1!==e)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let t=this.mlContextCache.findIndex(t=>WS(t.options,e));if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),0===n.size){this.sessionIdsByMLContext.delete(t);let e=this.mlContextCache.findIndex(e=>e.mlContext===t);-1!==e&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ie("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,i,o){let s=Ni.get(n);if(!s)throw Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,i,o)}async createTemporaryTensor(e,t,n){ie("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let i=Ni.get(t);if(!i)throw Error(`Unsupported ONNX data type: ${t}`);let o=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,o,i,n,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(o):this.temporarySessionTensorIds.set(e,[o]),o}uploadTensor(e,t){if(!we().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ie("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return ki(n,t)}}registerMLTensor(e,t,n,i){let o=Ni.get(n);if(!o)throw Error(`Unsupported ONNX data type: ${n}`);let s=this.tensorManager.registerTensor(e,t,o,i);return ie("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${o}, dimensions: ${i}} -> {tensorId: ${s}}`),s}registerMLConstant(e,t,n,i,o,s,a=!1){if(!s)throw Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=s.get(u);if(!l)throw Error(`File with name ${u} not found in preloaded files.`);if(t+n>l.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(t,t+n).buffer,p;switch(o.dataType){case"float32":p=new Float32Array(d);break;case"float16":p="u">typeof Float16Array&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":a?(p=new Int32Array(qu(new Uint8Array(d),"int64").buffer),o.dataType="int32"):p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw Error(`Unsupported data type: ${o.dataType} in creating WebNN Constant from external data.`)}return ie("verbose",()=>`[WebNN] registerMLConstant {dataType: ${o.dataType}, shape: ${o.shape}}} ${a?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(o,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return!!n&&n.includes(t)}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return!!n&&n.includes(t)}isGraphInputOutputTypeSupported(e,t,n=!0){let i=Ni.get(Bn(t)),o=this.mlOpSupportLimitsBySessionId.get(e);return!(typeof i>"u")&&(n?!!o?.input.dataTypes.includes(i):!!o?.output.dataTypes.includes(i))}flush(){}}}),Mi=$(()=>{}),cg=$(()=>{"use strict";mn(),Mi(),ag=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),ju=[],Ku=e=>16*Math.ceil(Number(e)/16),HS=e=>{for(let t=0;t<ju.length;t++){let n=ju[t];if(e<=n)return n}return 16*Math.ceil(e/16)},qS=1,sg=()=>qS++,Zu=async(e,t,n,i)=>{let o=Ku(n),s=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,s,0,o),e.flush(),await s.mapAsync(GPUMapMode.READ);let u=s.getMappedRange();if(!i)return new Uint8Array(u.slice(0,n));{let e=i();return e.set(new Uint8Array(u,0,n)),e}}finally{s.destroy()}},Xu=class{constructor(e){for(let[t]of(this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,ag))ju.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,i=t.byteOffset,o=t.byteLength,s=Ku(o),a=this.storageCache.get(e);if(!a)throw Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==o)throw Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${o}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(u.getMappedRange()).set(new Uint8Array(n,i,o)),u.unmap();let l=this.backend.device.createCommandEncoder();l.copyBufferToBuffer(u,0,a.gpuData.buffer,0,s),this.backend.device.queue.submit([l.finish()]),u.destroy(),ie("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw Error("destination gpu data for memcpy does not exist");if(n.originalSize!==i.originalSize)throw Error("inconsistent source and destination gpu data size");let o=Ku(n.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(n.gpuData.buffer,0,i.gpuData.buffer,0,o)}registerExternalBuffer(e,t,n){let i;if(n){if(i=n[0],e===n[1])return ie("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=sg();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),ie("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){void 0!==e&&(this.storageCache.delete(e),ie("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=HS(e),i,o=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(o||s){let e=(o?this.freeBuffers:this.freeUniformBuffers).get(n);i=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:n,usage:t})}else i=this.backend.device.createBuffer({size:n,usage:t});let a={id:sg(),type:0,buffer:i};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(e)}),ie("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t="bigint"==typeof e?Number(e):e,n=this.storageCache.get(t);if(!n){if(0===this.storageCache.size)return 0;throw Error("releasing data does not exist")}return ie("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw Error("data does not exist");await Zu(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let e of this.buffersPending){let t=ag.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];void 0===t||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];void 0===t||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let t of(e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e)),this.buffersPending))e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,0===this.sessionCount&&(ie("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},lg=(...e)=>new Xu(...e)}),Ee=$(()=>{"use strict";Ju=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},J=e=>new Ju(e)}),oe=$(()=>{"use strict";Z(),ne(),sr=64,Yu=(e,t)=>{if(3===t)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==t)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${e}`)}},ve=(e,t=1)=>{let n=Yu(e,t);return"string"==typeof n?n:n[0]},Ve=(e,t=1)=>{let n=Yu(e,t);return"string"==typeof n?n:n[1]},k=(...e)=>{let t=[];return e.forEach(e=>{0!==e.length&&t.push({type:12,data:e},{type:12,data:S.computeStrides(e)})}),t},he=e=>e%4==0?4:e%2==0?2:1,el=(e="f32",t,n="0")=>t&&1!==t?`vec${t}<${e}>(${n})`:`${e}(${n})`,ur=(e,t,n)=>"f32"===e?n:1===t?`f32(${n})`:`vec${t}<f32>(${n})`,$t=(e,t)=>4===t?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:2===t?`(${e}.x + ${e}.y)`:3===t?`(${e}.x + ${e}.y + ${e}.z)`:e,M=(e,t,n,i)=>e.startsWith("uniforms.")&&n>4?"string"==typeof t?"f16"===i?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:"f16"===i?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Bi=(e,t,n,i,o)=>{let s="number"==typeof n,a=s?n:n.length,u=[...Array(a).keys()],l=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,d=Yu(t,o),p="string"==typeof d?d:d[1],c={indices:l,value:p,storage:"string"==typeof d?d:d[0],tensor:t},h=e=>"string"==typeof e?e:`${e}u`,f={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},m=s?"uniforms.":"",g=`${m}${e}_shape`,b=`${m}${e}_strides`,y="";for(let e=0;e<a-1;e++)y+=`
    let dim${e} = current / ${M(b,e,a)};
    let rest${e} = current % ${M(b,e,a)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;y+=`indices[${a-1}] = current;`;let _=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${c.indices} {
    var indices: ${c.indices};
    var current = offset;
    ${y}
    return indices;
  }`,v=t=>(f.offsetToIndices=!0,a<2?t:`o2i_${e}(${t})`),x=[];if(a>=2)for(let e=a-1;e>=0;e--)x.push(`${M(b,e,a)} * (indices[${e}])`);let w=a<2?"":`
  fn i2o_${e}(indices: ${c.indices}) -> u32 {
    return ${x.join("+")};
  }`,T=t=>(f.indicesToOffset=!0,a<2?t:`i2o_${e}(${t})`),I=(...e)=>0===a?"0u":`${c.indices}(${e.map(h).join(",")})`,O=(e,t)=>a<2?`${e}`:`${M(e,t,a)}`,E=(e,t,n)=>a<2?`${e}=${n};`:`${M(e,t,a)}=${n};`,P={},D=(t,n)=>{f.broadcastedIndicesToOffset=!0;let i=`${n.name}broadcastedIndicesTo${e}Offset`;if(i in P)return`${i}(${t})`;let o=[];for(let e=a-1;e>=0;e--){let t=n.indicesGet("outputIndices",e+n.rank-a);o.push(`${O(b,e)} * (${t} % ${O(g,e)})`)}return P[i]=`fn ${i}(outputIndices: ${n.type.indices}) -> u32 {
             return ${o.length>0?o.join("+"):"0u"};
           }`,`${i}(${t})`},N=(t,n)=>(()=>{if(c.storage===c.value)return`${e}[${t}]=${n};`;if("vec2<u32>"===c.storage&&"i32"===c.value)return`${e}[${t}]=vec2<u32>(u32(${n}), select(0u, 0xFFFFFFFFu, ${n} < 0));`;if("vec2<u32>"===c.storage&&"u32"===c.value)return`${e}[${t}]=vec2<u32>(u32(${n}), 0u);`;if("u32"===c.storage&&"vec4<bool>"===c.value)return`${e}[${t}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${n}));`;throw Error(`not supported combination of storage type ${c.storage} and value type ${c.value} yet`)})(),R=t=>(()=>{if(c.storage===c.value)return`${e}[${t}]`;if("vec2<u32>"===c.storage&&"i32"===c.value)return`i32(${e}[${t}].x)`;if("vec2<u32>"===c.storage&&"u32"===c.value)return`u32(${e}[${t}].x)`;if("u32"===c.storage&&"vec4<bool>"===c.value)return`vec4<bool>(bool(${e}[${t}] & 0xFFu), bool(${e}[${t}] & 0xFF00u), bool(${e}[${t}] & 0xFF0000u), bool(${e}[${t}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${c.storage} and value type ${c.value} yet`)})(),B=a<2?"":`
  fn get_${e}ByIndices(indices: ${c.indices}) -> ${p} {
    return ${R(`i2o_${e}(indices)`)};
  }`,F=a<2?"":(()=>{let t=u.map(e=>`d${e}: u32`).join(", "),n=u.map(e=>`d${e}`).join(", ");return`
  fn get_${e}(${t}) -> ${p} {
    return get_${e}ByIndices(${I(n)});
  }`})(),U=(...t)=>{if(t.length!==a)throw Error(`indices length must be ${a}`);let n=t.map(h).join(",");return 0===a?R("0u"):1===a?R(n[0]):(f.get=!0,f.getByIndices=!0,f.indicesToOffset=!0,`get_${e}(${n})`)},q=t=>a<2?R(t):(f.getByIndices=!0,f.indicesToOffset=!0,`get_${e}ByIndices(${t})`),H=a<2?"":`
  fn set_${e}ByIndices(indices: ${c.indices}, value: ${p}) {
    ${N(`i2o_${e}(indices)`,"value")}
  }`,W=a<2?"":(()=>{let t=u.map(e=>`d${e}: u32`).join(", "),n=u.map(e=>`d${e}`).join(", ");return`
  fn set_${e}(${t}, value: ${p}) {
    set_${e}ByIndices(${I(n)}, value);
  }`})();return{impl:()=>{let e=[],t=!1;return f.offsetToIndices&&(e.push(_),t=!0),f.indicesToOffset&&(e.push(w),t=!0),f.broadcastedIndicesToOffset&&(Object.values(P).forEach(t=>e.push(t)),t=!0),f.set&&(e.push(W),t=!0),f.setByIndices&&(e.push(H),t=!0),f.get&&(e.push(F),t=!0),f.getByIndices&&(e.push(B),t=!0),!s&&t&&e.unshift(`const ${g} = ${c.indices}(${n.join(",")});`,`const ${b} = ${c.indices}(${S.computeStrides(n).join(",")});`),e.join(`
`)},type:c,offsetToIndices:v,indicesToOffset:T,broadcastedIndicesToOffset:D,indices:I,indicesGet:O,indicesSet:E,set:(...t)=>{if(t.length!==a+1)throw Error(`indices length must be ${a}`);let n=t[a];if("string"!=typeof n)throw Error("value must be string");let i=t.slice(0,a).map(h).join(",");return 0===a?N("0u",n):1===a?N(i[0],n):(f.set=!0,f.setByIndices=!0,f.indicesToOffset=!0,`set_${e}(${i}, ${n})`)},setByOffset:N,setByIndices:(t,n)=>a<2?N(t,n):(f.setByIndices=!0,f.indicesToOffset=!0,`set_${e}ByIndices(${t}, ${n});`),get:U,getByOffset:R,getByIndices:q,usage:i,name:e,strides:b,shape:g,rank:a}},A=(e,t,n,i=1)=>Bi(e,t,n,"input",i),C=(e,t,n,i=1)=>Bi(e,t,n,"output",i),dg=(e,t,n)=>Bi(e,t,n,"atomicOutput",1),Vi=(e,t,n,i=1)=>Bi(e,t,n,"internal",i),Qu=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${"number"==typeof e?`${e}u`:e}) { return; }`}mainStart(e=sr){let t="number"==typeof e?e:e[0],n="number"==typeof e?1:e[1],i="number"==typeof e?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${t}, ${n}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*i>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${t}, ${n}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let o=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],s=o?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=o?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*n*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${n}, ${i})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(e){0!==e.rank&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if("internal"===e.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let n="input"===e.usage?"read":"read_write",i="atomicOutput"===e.usage?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(e=>this.declareVariable(e,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if("internal"!==e.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(e,t,n=1){return this.uniforms.push({name:e,type:t,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let e=[];for(let{name:t,type:n,length:i}of this.uniforms)if(i&&i>4)"f16"===n?e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${n}>, ${Math.ceil(i/4)}>`);else{let o=null==i||1===i?n:`vec${i}<${n}>`;e.push(`${t}:${o}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(0===this.uniforms.length)return;let e=e=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(e)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},pg=(e,t)=>new Qu(e,t)}),In=$(()=>{"use strict";Z(),ne(),Ee(),oe(),jS=(e,t)=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if(0!==t.length&&t.length!==e[0].dims.length)throw Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},fg=(e,t)=>0!==t.length?t:[...Array(e).keys()].reverse(),KS=(e,t)=>S.sortBasedOnPerm(e,fg(e.length,t)),XS=(e,t,n,i)=>{let o=`fn perm(i: ${i.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let n=0;n<t;++n)o+=`a[${e[n]}]=i[${n}];`;return o+"return a;}"},ZS=(e,t)=>{let n=[],i=[];for(let o=0;o<e.length;++o)1!==e[o]&&n.push(e[o]),1!==e[t[o]]&&i.push(t[o]);return{newShape:n,newPerm:i}},JS=(e,t)=>{let n=0;for(let i=0;i<e.length;++i)if(1!==t[e[i]]){if(e[i]<n)return!1;n=e[i]}return!0},Fe=(e,t)=>{let n=e.dataType,i=e.dims.length,o=fg(i,t),s=KS(e.dims,o),a=e.dims,u=s;if(i<2||JS(o,e.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=S.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64/4)},programUniforms:[{type:12,data:Math.ceil(t/4)}]}},getShaderSource:e=>{let t=A("input",n,a,4),i=C("output",n,u,4);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,i)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:l,newPerm:d}=ZS(e.dims,o),p=S.areEqual(d,[2,3,1]),c=S.areEqual(d,[3,1,2]);if(2===l.length||p||c){u=[(a=p?[l[0],l[1]*l[2]]:c?[l[0]*l[1],l[2]]:l)[1],a[0]];let t=16;return{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let n=S.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/t),y:Math.ceil(u[0]/t)},programUniforms:[{type:12,data:n},...k(a,u)]}},getShaderSource:e=>{let i=A("a",n,a.length),o=C("output",n,u.length);return`
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
  }`}}}return{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let t=S.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:[{type:12,data:t},...k(a,u)]}},getShaderSource:e=>{let t=A("a",n,a.length),s=C("output",n,u.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,s)}

  ${XS(o,i,t,s)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${s.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${s.setByOffset("global_idx",t.getByIndices("aIndices"))}
  }`}}},hg=(e,t)=>{jS(e.inputs,t.perm),e.compute(Fe(e.inputs[0],t.perm))},mg=e=>J({perm:e.perm})}),$g=$(()=>{"use strict";Z(),ne(),oe(),Fi(),In(),QS={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},YS={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},e1={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},t1={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},n1=(e,t)=>{let n=[];for(let i=t-e;i<t;++i)n.push(i);return n},r1=(e,t)=>{let n=[],i=e.length;for(let o=0;o<i;o++)-1===t.indexOf(o)&&n.push(e[o]);return[n,t.map(t=>e[t])]},o1=(e,t)=>{let n=e.length+t.length,i=[],o=0;for(let s=0;s<n;s++)-1===t.indexOf(s)?i.push(e[o++]):i.push(1);return i},i1=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},a1=(e,t)=>{let n=[];if(!i1(e,t)){for(let i=0;i<t;++i)-1===e.indexOf(i)&&n.push(i);e.forEach(e=>n.push(e))}return n},s1=(e,t,n,i,o,s,a)=>{let u=n[0].dims,l=S.size(s),d=S.size(a),p=A("_A",n[0].dataType,u),c=C("output",o,s),h=64;1===l&&(h=256);let f=`
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

          var bestValue = f32(${e1[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${p.getByOffset("offset + k")});
           bestValue = ${QS[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${YS[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${"mean"===i?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${t1[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${h}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}},bn=(e,t,n,i)=>{let o=1===e.inputs.length?n:tl(e.inputs,n),s=o.axes;0!==s.length||o.noopWithEmptyAxes||(s=e.inputs[0].dims.map((e,t)=>t));let a=S.normalizeAxes(s,e.inputs[0].dims.length),u=a,l=e.inputs[0],d=a1(u,e.inputs[0].dims.length);d.length>0&&(l=e.compute(Fe(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],u=n1(u.length,l.dims.length));let[p,c]=r1(l.dims,u),h=p;o.keepDims&&(h=o1(p,a)),e.compute(s1(t,o.cacheKey,[l],i,e.inputs[0].dataType,h,c),{inputs:[l]})},gg=(e,t)=>{bn(e,"ReduceMeanShared",t,"mean")},bg=(e,t)=>{bn(e,"ReduceL1Shared",t,"l1")},yg=(e,t)=>{bn(e,"ReduceL2Shared",t,"l2")},_g=(e,t)=>{bn(e,"ReduceLogSumExpShared",t,"logSumExp")},xg=(e,t)=>{bn(e,"ReduceMaxShared",t,"max")},wg=(e,t)=>{bn(e,"ReduceMinShared",t,"min")},Tg=(e,t)=>{bn(e,"ReduceProdShared",t,"prod")},vg=(e,t)=>{bn(e,"ReduceSumShared",t,"sum")},Ig=(e,t)=>{bn(e,"ReduceSumSquareShared",t,"sumSquare")},Sg=(e,t)=>{bn(e,"ReduceLogSumShared",t,"logSum")}}),Fi=$(()=>{"use strict";Z(),ne(),Ee(),oe(),$g(),yn=e=>{if(!e||0===e.length||e.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===e.length&&1!==e[1].dims.length)throw Error("Invalid axes input dims.")},u1=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Gi=(e,t,n,i,o,s,a=!1,u=!1)=>{let l=[],d=n[0].dims,p=d.length,c=S.normalizeAxes(o,p),h=!u&&0===c.length;d.forEach((e,t)=>{h||c.indexOf(t)>=0?a&&l.push(1):l.push(e)});let f=l.length,m=S.size(l);return{name:e,shaderCache:t,getShaderSource:e=>{let t=[],o=A("_A",n[0].dataType,p),u=C("output",s,f),l=i(o,u,c),m=l[2];for(let e=0,n=0;e<p;e++)h||c.indexOf(e)>=0?(a&&n++,m=`for(var j${e}: u32 = 0; j${e} < ${d[e]}; j${e}++) {
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
        }`},getRunData:()=>({outputs:[{dims:l,dataType:s}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...k(d,l)]})}},tl=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>n.push(Number(e))),J({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},_n=(e,t,n,i)=>{let o=e.inputs,s=1===o.length?n:tl(o,n);e.compute(Gi(t,{hint:s.cacheKey,inputDependencies:["rank"]},[o[0]],s.noopWithEmptyAxes&&0===s.axes.length?u1:i,s.axes,o[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},l1=(e,t)=>{yn(e.inputs),_n(e,"ReduceLogSum",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,"value = log(value);"])},c1=(e,t)=>{yn(e.inputs),_n(e,"ReduceL1",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += abs(${e.getByIndices("input_indices")});`,""])},d1=(e,t)=>{yn(e.inputs),_n(e,"ReduceL2",t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},p1=(e,t)=>{yn(e.inputs),_n(e,"ReduceLogSumExp",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += exp(${e.getByIndices("input_indices")});`,"value = log(value);"])},f1=(e,t)=>{yn(e.inputs),_n(e,"ReduceMax",t,(e,t,n)=>{let i=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||0===n.length)&&i.push(e.indicesSet("input_indices",t,0));return[`${i.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = max(value, ${e.getByIndices("input_indices")});`,""]})},h1=(e,t)=>{yn(e.inputs),_n(e,"ReduceMean",t,(t,n,i)=>{let o=1;for(let n=0;n<t.rank;n++)(i.indexOf(n)>=0||0===i.length)&&(o*=e.inputs[0].dims[n]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${n.type.value}(sum / ${o});`]})},m1=(e,t)=>{yn(e.inputs),_n(e,"ReduceMin",t,(e,t,n)=>{let i=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||0===n.length)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = min(value, ${e.getByIndices("input_indices")});`,""]})},g1=(e,t)=>{yn(e.inputs),_n(e,"ReduceProd",t,(e,t)=>[`var value = ${t.type.storage}(1);`,"",`value *= ${e.getByIndices("input_indices")};`,""])},b1=(e,t)=>{yn(e.inputs),_n(e,"ReduceSum",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,""])},y1=(e,t)=>{yn(e.inputs),_n(e,"ReduceSumSquare",t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += t * t;`,""])},xn=(e,t,n)=>{if(0===t.length)return n;let i=1,o=1;for(let n=0;n<t.length;n++)-1===t.indexOf(n)?i*=e[n]:o*=e[n];return o<32&&i>1024},Ag=(e,t)=>{xn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?h1(e,t):gg(e,t)},Pg=(e,t)=>{xn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?c1(e,t):bg(e,t)},Og=(e,t)=>{xn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?d1(e,t):yg(e,t)},Eg=(e,t)=>{xn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?p1(e,t):_g(e,t)},Cg=(e,t)=>{xn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?f1(e,t):xg(e,t)},Dg=(e,t)=>{xn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?m1(e,t):wg(e,t)},kg=(e,t)=>{xn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?g1(e,t):Tg(e,t)},Lg=(e,t)=>{xn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?b1(e,t):vg(e,t)},Rg=(e,t)=>{xn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?y1(e,t):Ig(e,t)},Ng=(e,t)=>{xn(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?l1(e,t):Sg(e,t)}}),Vg=$(()=>{"use strict";Z(),Ee(),Fi(),zg=e=>{if(!e||0===e.length||e.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==e[0].dataType)throw Error("Invalid input type.")},Mg=(e,t)=>{zg(e.inputs);let n=(e,n,i)=>{let o=[];for(let t=0;t<e.rank;t++)(i.indexOf(t)>=0||0===i.length)&&o.push(`input_indices[${t}] = 0;`);return[`${o.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Gi("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Bg=(e,t)=>{zg(e.inputs);let n=(e,n,i)=>{let o=[];for(let t=0;t<e.rank;t++)(i.indexOf(t)>=0||0===i.length)&&o.push(`input_indices[${t}] = 0;`);return[`${o.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Gi("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},nl=e=>J(e)}),Ui=$(()=>{"use strict";Z(),ne(),Mi(),oe(),_1=(e,t)=>{let n=e[0],i=e[1],o=e[2],s=e[3],a=e[4],u=e[5];if(a&&u)throw Error("Attention cannot have both past and attention_bias");if(3!==n.dims.length)throw Error('Input "input" must have 3 dimensions');let l=n.dims[0],d=n.dims[1],p=n.dims[2];if(1!==o.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==i.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==p)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==i.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=o.dims[0]/3,h=c,f=h;if(t.qkvHiddenSizes.length>0){if(3!==t.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let e of t.qkvHiddenSizes)if(e%t.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");c=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],f=t.qkvHiddenSizes[2]}let m=d;if(c!==h)throw Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==c+h+f)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let g=0;if(a){if(h!==f)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==a.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==a.dims[0])throw Error('Input "past" first dimension must be 2');if(a.dims[1]!==l)throw Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/t.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(g=a.dims[3])}let b=m+g,y=-1,_=0;if(s)throw Error("Mask not supported");if(a)throw Error("past is not supported");if(u){if(4!==u.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==d||u.dims[3]!==b)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:b,maxSequenceLength:y,inputHiddenSize:p,hiddenSize:c,vHiddenSize:f,headSize:Math.floor(c/t.numHeads),vHeadSize:Math.floor(f/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},rl=(e,t,n)=>t&&e?`
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
    `,x1=(e,t,n,i,o,s,a,u)=>{let l=he(a?1:s),d=64,p=s/l;p<64&&(d=32);let c=[{type:12,data:t},{type:12,data:n},{type:12,data:i},{type:12,data:o},{type:12,data:p},{type:12,data:Math.ceil(s/l/d)}],h=ve(e.dataType,l),f=Ve(1,l),m=["type"];a&&m.push("type"),u&&m.push("type");let g=t=>{let n=C("x",e.dataType,e.dims,l),i=[n],o=a?A("seq_lens",a.dataType,a.dims):void 0;o&&i.push(o);let s=u?A("total_sequence_length_input",u.dataType,u.dims):void 0;s&&i.push(s);let p=Ve(e.dataType),c=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${t.registerUniforms(c).declareVariables(...i)}
  ${t.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${rl(o,s,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
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
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${n.type.value}(${p}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${h};${l}`,inputDependencies:m},getShaderSource:g,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:t*n},programUniforms:c})}},w1=(e,t,n,i,o,s,a,u,l)=>{let d=a+s.kvSequenceLength,p=[s.batchSize,s.numHeads,s.sequenceLength,d],c=e>1&&i,h=s.kvNumHeads?s.kvNumHeads:s.numHeads,f=c?[s.batchSize,h,d,s.headSize]:void 0,m=s.nReps?s.nReps:1,g=0===s.scale?1/Math.sqrt(s.headSize):s.scale,b=he(s.headSize),y=s.headSize/b,_=12,v={x:Math.ceil(d/12),y:Math.ceil(s.sequenceLength/_),z:s.batchSize*s.numHeads},x=[{type:12,data:s.sequenceLength},{type:12,data:y},{type:12,data:d},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:g},{type:12,data:a},{type:12,data:s.kvSequenceLength},{type:12,data:m}],w=c&&i&&S.size(i.dims)>0,T=["type","type"];w&&T.push("type"),o&&T.push("type"),u&&T.push("type"),l&&T.push("type");let I=[{dims:p,dataType:t.dataType,gpuDataType:0}];c&&I.push({dims:f,dataType:t.dataType,gpuDataType:0});let O=e=>{let s=A("q",t.dataType,t.dims,b),a=[s,A("key",n.dataType,n.dims,b)];if(w){let e=A("past_key",i.dataType,i.dims,b);a.push(e)}o&&a.push(A("attention_bias",o.dataType,o.dims));let d=u?A("seq_lens",u.dataType,u.dims):void 0;d&&a.push(d);let h=l?A("total_sequence_length_input",l.dataType,l.dims):void 0;h&&a.push(h);let g=C("output",t.dataType,p),y=[g];c&&y.push(C("present_key",t.dataType,f,b));let v=Ve(1,b),x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;

  var<workgroup> tileQ: array<${s.type.storage}, ${_*_}>;
  var<workgroup> tileK: array<${s.type.storage}, ${_*_}>;
  ${e.registerUniforms(x).declareVariables(...a,...y)}
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
    ${rl(d,h,!0)}
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
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${b};${void 0!==o};${void 0!==i};${e}`,inputDependencies:T},getRunData:()=>({outputs:I,dispatchGroup:v,programUniforms:x}),getShaderSource:O}},T1=(e,t,n,i,o,s,a,u)=>{let l=s+o.kvSequenceLength,d=o.nReps?o.nReps:1,p=o.vHiddenSize*d,c=e>1&&i,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,f=c?[o.batchSize,h,l,o.headSize]:void 0,m=[o.batchSize,o.sequenceLength,p],g=12,b={x:Math.ceil(o.vHeadSize/g),y:Math.ceil(o.sequenceLength/g),z:o.batchSize*o.numHeads},y=[{type:12,data:o.sequenceLength},{type:12,data:l},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:p},{type:12,data:s},{type:12,data:o.kvSequenceLength},{type:12,data:d}],_=c&&i&&S.size(i.dims)>0,v=["type","type"];_&&v.push("type"),a&&v.push("type"),u&&v.push("type");let x=[{dims:m,dataType:t.dataType,gpuDataType:0}];c&&x.push({dims:f,dataType:t.dataType,gpuDataType:0});let w=e=>{let o=A("probs",t.dataType,t.dims),s=[o,A("v",n.dataType,n.dims)];_&&s.push(A("past_value",i.dataType,i.dims));let l=a?A("seq_lens",a.dataType,a.dims):void 0;a&&s.push(l);let p=u?A("total_sequence_length_input",u.dataType,u.dims):void 0;u&&s.push(p);let h=[C("output",t.dataType,m)];c&&h.push(C("present_value",t.dataType,f));let b=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;
  var<workgroup> tileQ: array<${o.type.value}, ${g*g}>;
  var<workgroup> tileV: array<${o.type.value}, ${g*g}>;
  ${e.registerUniforms(b).declareVariables(...s,...h)}
  ${e.mainStart([g,g,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===d?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===d?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${rl(l,p,!0)}
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${void 0!==i};${e}`,inputDependencies:v},getRunData:()=>({outputs:x,dispatchGroup:b,programUniforms:y}),getShaderSource:w}},Sr=(e,t,n,i,o,s,a,u,l,d,p,c)=>{let h=Math.min(e.outputCount,1+ +!!a+ +!!u),f=h>1?d.pastSequenceLength:0,m=f+d.kvSequenceLength,g=l&&S.size(l.dims)>0?l:void 0,b=[t,n];h>1&&a&&S.size(a.dims)>0&&b.push(a),g&&b.push(g),p&&b.push(p),c&&b.push(c);let y=e.compute(w1(h,t,n,a,g,d,f,p,c),{inputs:b,outputs:h>1?[-1,1]:[-1]})[0];e.compute(x1(y,d.batchSize,d.numHeads,f,d.sequenceLength,m,p,c),{inputs:p&&c?[y,p,c]:[y],outputs:[]});let _=[y,i];h>1&&u&&S.size(u.dims)>0&&_.push(u),p&&_.push(p),c&&_.push(c),e.compute(T1(h,y,i,u,d,f,p,c),{inputs:_,outputs:h>1?[0,2]:[0]})},v1=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,o=t.inputHiddenSize,s=t.headSize,a=12,u={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:i},{type:12,data:o},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],p=e=>{let t=C("output_q",l[0].dataType,n),i=C("output_k",l[0].dataType,n),o=C("output_v",l[0].dataType,n),s=A("input",l[0].dataType,l[0].dims),u=A("weight",l[1].dataType,l[1].dims),d=A("bias",l[2].dataType,l[2].dims),p=s.type.storage,c=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${p}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${p}, ${a*a}>;
  var<workgroup> tileWeightK: array<${p}, ${a*a}>;
  var<workgroup> tileWeightV: array<${p}, ${a*a}>;
  ${e.registerUniforms(c).declareVariables(s,u,d,t,i,o)}
  ${e.mainStart([a,a,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:d}),getShaderSource:p},{inputs:l,outputs:[-1,-1,-1]})},Fg=(e,t)=>{let n=_1(e.inputs,t),[i,o,s]=v1(e,n);return Sr(e,i,o,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),Ug=$(()=>{"use strict";qe(),Z(),ne(),Ee(),oe(),I1=(e,t)=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs");let n=(e,t,n)=>{let i=t.length;if(i!==e.length)throw Error(`${n}: num dimensions != ${i}`);t.forEach((t,i)=>{if(t!==e[i])throw Error(`${n}: dim[${i}] do not match`)})};if(e[0].dims.length>1){let i="NHWC"===t.format?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,i,"Invalid input scale"),n(e[2].dims,i,"Invalid input B"),n(e[3].dims,i,"Invalid input mean"),n(e[4].dims,i,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},S1=(e,t)=>{let{epsilon:n,spatial:i,format:o}=t,s=e[0].dims,a=i?he(s[s.length-1]):1,u="NHWC"===o&&s.length>1?a:1,l=S.size(s)/a,d=i,p=d?s.length:s,c=A("x",e[0].dataType,e[0].dims,a),h=A("scale",e[1].dataType,e[1].dims,u),f=A("bias",e[2].dataType,e[2].dims,u),m=A("inputMean",e[3].dataType,e[3].dims,u),g=A("inputVar",e[4].dataType,e[4].dims,u),b=C("y",e[0].dataType,p,a),y=()=>{let e="";if(i)e=`let cOffset = ${1===s.length?"0u":"NHWC"===o?`outputIndices[${s.length-1}] / ${a}`:"outputIndices[1]"};`;else if("NCHW"===o)e=`
            ${b.indicesSet("outputIndices","0","0")}
            let cOffset = ${b.indicesToOffset("outputIndices")};`;else{e=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let t=1;t<h.rank;t++)e+=`cIndices[${t}] = outputIndices[${t}];`;e+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return e},_=e=>`
  const epsilon = ${n};
  ${e.registerUniform("outputSize","u32").declareVariables(c,h,f,m,g,b)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${b.offsetToIndices(`global_idx * ${a}`)};
    ${y()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${f.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${g.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${b.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${a}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d?[{type:12,data:l},...k(s)]:[{type:12,data:l}]})}},$1=e=>J(e),Gg=(e,t)=>{let{inputs:n,outputCount:i}=e,o=$1({...t,outputCount:i});if(te.webgpu.validateInputContent&&I1(n,o),t.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");e.compute(S1(n,o))}}),Hg=$(()=>{"use strict";ne(),oe(),A1=e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")},P1=e=>{let t=e[0].dims,n=e[0].dims[2],i=S.size(t)/4,o=e[0].dataType,s=A("input",o,t,4),a=A("bias",o,[n],4),u=A("residual",o,t,4),l=C("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:e=>`
  const channels = ${n}u / 4;
  ${e.declareVariables(s,a,u,l)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${s.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Wg=e=>{A1(e.inputs),e.compute(P1(e.inputs))}}),Hi=$(()=>{"use strict";Z(),ne(),Ee(),oe(),O1=(e,t,n,i,o,s,a)=>{let u=Math.ceil(t/4),l="";l="string"==typeof o?`${o}(a)`:o("a");let d=A("inputData",n,[u],4),p=C("outputData",i,[u],4),c=[{name:"vec_size",type:"u32"}];return a&&c.push(...a),`
      ${e.registerUniforms(c).declareVariables(d,p)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${p.setByOffset("global_idx",l)}
  }`},be=(e,t,n,i,o,s=e.dataType,a,u)=>{let l=[{type:12,data:Math.ceil(S.size(e.dims)/4)}];return a&&l.push(...a),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:t=>O1(t,S.size(e.dims),e.dataType,s,n,i,u),getRunData:t=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(S.size(t[0].dims)/64/4)},programUniforms:l})}},qg=e=>{e.compute(be(e.inputs[0],"Abs","abs"))},jg=e=>{e.compute(be(e.inputs[0],"Acos","acos"))},Kg=e=>{e.compute(be(e.inputs[0],"Acosh","acosh"))},Xg=e=>{e.compute(be(e.inputs[0],"Asin","asin"))},Zg=e=>{e.compute(be(e.inputs[0],"Asinh","asinh"))},Jg=e=>{e.compute(be(e.inputs[0],"Atan","atan"))},Qg=e=>{e.compute(be(e.inputs[0],"Atanh","atanh"))},Yg=e=>J(e),eb=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(be(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},E1=e=>{let t,n,i=e.length>=2&&0!==e[1].data,o=e.length>=3&&0!==e[2].data;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,n=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,n=o?e[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return J({min:t,max:n})},tb=(e,t)=>{let n=t||E1(e.inputs),i=Ve(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Clip",e=>`clamp(${e}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},nb=e=>{e.compute(be(e.inputs[0],"Ceil","ceil"))},rb=e=>{e.compute(be(e.inputs[0],"Cos","cos"))},ob=e=>{e.compute(be(e.inputs[0],"Cosh","cosh"))},to=e=>J(e),ib=(e,t)=>{let n=Ve(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Elu",e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Wi=(e="f32")=>`
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
}`,ab=e=>{let t=Ve(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Erf",e=>`erf_vf32(${e})`,Wi(t)))},sb=e=>{e.compute(be(e.inputs[0],"Exp","exp"))},ub=e=>{e.compute(be(e.inputs[0],"Floor","floor"))},lb=e=>{let t=Ve(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Gelu",e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,Wi(t)))},cb=(e,t)=>{let n=Ve(e.inputs[0].dataType);e.compute(be(e.inputs[0],"LeakyRelu",e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},db=e=>{e.compute(be(e.inputs[0],"Not",e=>`!${e}`))},pb=e=>{e.compute(be(e.inputs[0],"Neg",e=>`-${e}`))},fb=e=>{e.compute(be(e.inputs[0],"Reciprocal",e=>`1.0/${e}`))},hb=e=>{let t=Ve(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Relu",e=>`select(vec4<${t}>(0.0), ${e}, ${e} > vec4<${t}>(0.0))`))},mb=e=>{e.compute(be(e.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},gb=e=>J(e),bb=(e,t)=>{let n=Ve(e.inputs[0].dataType);e.compute(be(e.inputs[0],"HardSigmoid",e=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${e} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},yb=e=>{e.compute(be(e.inputs[0],"Sin","sin"))},_b=e=>{e.compute(be(e.inputs[0],"Sinh","sinh"))},xb=e=>{e.compute(be(e.inputs[0],"Sqrt","sqrt"))},wb=e=>{e.compute(be(e.inputs[0],"Tan","tan"))},Tb=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,vb=e=>{e.compute(be(e.inputs[0],"Tanh",Tb))},ol=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Tb("v")};
}
`,il=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Ib=e=>{let t=Ve(e.inputs[0].dataType);e.compute(be(e.inputs[0],"FastGelu",il,ol(t),void 0,e.inputs[0].dataType))},Sb=(e,t)=>{let n=Ve(e.inputs[0].dataType);return e.compute(be(e.inputs[0],"ThresholdedRelu",e=>`select(vec4<${n}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},$b=e=>{e.compute(be(e.inputs[0],"Log","log"))},C1=(e,t)=>`
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
`,D1=e=>`quick_gelu_impl(${e})`,Ab=(e,t)=>{let n=Ve(e.inputs[0].dataType);e.compute(be(e.inputs[0],"QuickGelu",D1,C1(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Eb=$(()=>{"use strict";ne(),oe(),Hi(),k1=e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")},L1=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=A("input",e[0].dataType,e[0].dims,4),i=A("bias",e[0].dataType,[e[0].dims[2]],4),o=C("output",e[0].dataType,t,4),s=S.size(t)/4,a=ve(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:t=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${t.declareVariables(n,i,o)}

  ${Wi(a)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ob=e=>{k1(e.inputs),e.compute(L1(e.inputs))}}),Fb=$(()=>{"use strict";Z(),ne(),oe(),R1=(e,t,n,i,o,s,a,u,l,d,p,c)=>{let h,f;"string"==typeof u?h=f=(e,t)=>`${u}((${e}),(${t}))`:"function"==typeof u?h=f=u:(h=u.scalar,f=u.vector);let m=C("outputData",p,i.length,4),g=A("aData",l,t.length,4),b=A("bData",d,n.length,4),y;if(o)if(s){let e=1===S.size(t),i=1===S.size(n),o=t.length>0&&t[t.length-1]%4==0,s=n.length>0&&n[n.length-1]%4==0;y=e||i?m.setByOffset("global_idx",f(e?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),i?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"))):`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${b.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(a||o?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||s?b.getByOffset("offsetB / 4u"):`${b.type.value}(${b.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=m.setByOffset("global_idx",f(g.getByOffset("global_idx"),b.getByOffset("global_idx")));else{if(!s)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let e=(e,t,n="")=>{let i=`aData[indexA${t}][componentA${t}]`,o=`bData[indexB${t}][componentB${t}]`;return`
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
      }`},N1=(e,t,n,i,o,s,a=n.dataType)=>{let u=n.dims.map(Number),l=i.dims.map(Number),d=!S.areEqual(u,l),p=u,c=S.size(u),h=!1,f=!1,m=[d];if(d){let e=gn.calcShape(u,l,!1);if(!e)throw Error("Can't perform binary op on the given tensors");p=e.slice(),c=S.size(p);let t=1===S.size(u),n=1===S.size(l),i=u.length>0&&u[u.length-1]%4==0,o=l.length>0&&l[l.length-1]%4==0;m.push(t),m.push(n),m.push(i),m.push(o);let s=1;for(let e=1;e<p.length;e++){let t=u[u.length-e];if(t===l[l.length-e])s*=t;else break}s%4==0?(f=!0,h=!0):(t||n||i||o)&&(h=!0)}else h=!0;return m.push(h),{name:e,shaderCache:{hint:t+m.map(e=>e.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:e=>R1(e,u,l,p,h,d,f,o,n.dataType,i.dataType,a,s),getRunData:()=>({outputs:[{dims:p,dataType:a}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(S.size(p)/4)},...k(u,l,p)]})}},wn=(e,t,n,i,o,s)=>{e.compute(N1(t,o??"",e.inputs[0],e.inputs[1],n,i,s))},Cb=e=>{wn(e,"Add",(e,t)=>`${e}+${t}`)},Db=e=>{wn(e,"Div",(e,t)=>`${e}/${t}`)},kb=e=>{wn(e,"Equal",{scalar:(e,t)=>`u32(${e}==${t})`,vector:(e,t)=>`vec4<u32>(${e}==${t})`},void 0,void 0,9)},Lb=e=>{wn(e,"Mul",(e,t)=>`${e}*${t}`)},Rb=e=>{let t=A("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;wn(e,"Pow",{scalar:(e,t)=>`pow_custom(${e},${t})`,vector:(e,t)=>`pow_vector_custom(${e},${t})`},`
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
      `)},Nb=e=>{wn(e,"Sub",(e,t)=>`${e}-${t}`)},zb=e=>{wn(e,"Greater",{scalar:(e,t)=>`u32(${e}>${t})`,vector:(e,t)=>`vec4<u32>(${e}>${t})`},void 0,void 0,9)},Mb=e=>{wn(e,"Less",{scalar:(e,t)=>`u32(${e}<${t})`,vector:(e,t)=>`vec4<u32>(${e}<${t})`},void 0,void 0,9)},Bb=e=>{wn(e,"GreaterOrEqual",{scalar:(e,t)=>`u32(${e}>=${t})`,vector:(e,t)=>`vec4<u32>(${e}>=${t})`},void 0,void 0,9)},Vb=e=>{wn(e,"LessOrEqual",{scalar:(e,t)=>`u32(${e}<=${t})`,vector:(e,t)=>`vec4<u32>(${e}<=${t})`},void 0,void 0,9)}}),Wb=$(()=>{"use strict";Z(),ne(),Ee(),oe(),M1=(e,t)=>{if(!e||e.length<1)throw Error("too few inputs");let n=0,i=e[0],o=i.dataType,s=i.dims.length;e.forEach((e,a)=>{if(a!==n){if(e.dataType!==o)throw Error("input tensors should be one type");if(e.dims.length!==s)throw Error("input tensors should have the same shape");e.dims.forEach((e,n)=>{if(n!==t&&e!==i.dims[n])throw Error("non concat dimensions must match")})}})},B1=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,V1=(e,t)=>{let n=e.length,i=[];for(let o=0;o<n;++o){let s=t.setByOffset("global_idx",e[o].getByIndices("indices"));1===n?i.push(s):0===o?i.push(`if (inputIndex == ${o}u) { ${s} }`):o===n-1?i.push(`else { ${s} }`):i.push(`else if (inputIndex == ${o}) { ${s} }`)}return i.join(`
`)},F1=(e,t,n,i)=>{let o=S.size(n),s=Array(e.length),a=Array(e.length),u=0,l=[],d=[],p=[{type:12,data:o}];for(let n=0;n<e.length;++n)u+=e[n].dims[t],s[n]=u,d.push(e[n].dims.length),a[n]=A(`input${n}`,i,d[n]),l.push("rank"),p.push({type:12,data:s[n]});for(let t=0;t<e.length;++t)p.push(...k(e[t].dims));p.push(...k(n));let c=C("output",i,n.length),h=c.indicesGet("indices",t),f=Array.from(Array(s.length).keys()).map(e=>`uniforms.sizeInConcatAxis${e}`).join(",");return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:t=>`

  ${(()=>{t.registerUniform("outputSize","u32");for(let n=0;n<e.length;n++)t.registerUniform(`sizeInConcatAxis${n}`,"u32");return t.declareVariables(...a,c)})()}

  ${B1(s.length,f)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${f});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${V1(a,c)}
  }`}},Gb=(e,t)=>{let n=e.inputs,i=n[0].dims,o=S.normalizeAxis(t.axis,i.length);M1(n,o);let s=i.slice();s[o]=n.reduce((e,t)=>e+(t.dims.length>o?t.dims[o]:0),0);let a=n.filter(e=>S.size(e.dims)>0);e.compute(F1(a,o,s,n[0].dataType),{inputs:a})},Ub=e=>J({axis:e.axis})}),Fn=$(()=>{"use strict";Z(),ne(),At=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${e.activation}`)}},Pt=(e,t)=>{"Clip"===e.activation?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):"HardSigmoid"===e.activation?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):"LeakyRelu"===e.activation&&t.push({type:1,data:e.alpha})},Ot=(e,t)=>{"Clip"===e.activation?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===e.activation?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===e.activation&&t.push({name:"alpha",type:"f32"})},qi=e=>{let t=e?.activation||"";if("HardSigmoid"===t){let[n,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:i}}if("Clip"===t){let[n,i]=e?.activation_params||[Jm,Qm];return{activation:t,clipMax:i,clipMin:n}}if("LeakyRelu"===t){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}}),ji=$(()=>{"use strict";ze=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw Error(`${e}-component is not supported.`)}},Hb=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),jb=$(()=>{"use strict";qb=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Xi=$(()=>{"use strict";Z(),ne(),oe(),Fn(),no=(e,t,n,i,o)=>{let s=i-n;return`
      ${Array.from({length:n}).map((n,a)=>`
      if (${M(t.shape,a,t.rank)} != 1) {
        ${t.indicesSet(e,a,M(o,a+s,i))}
      } else {
        ${t.indicesSet(e,a,0)}
      }`).join("")}
`},Ki=(e,t,n,i,o=!1,s)=>{let a=e[0].dims,u=e[1].dims,l=a[a.length-2],d=u[u.length-1],p=a[a.length-1],c=he(d),h=he(p),f=he(l),m=S.size(n)/c/f,g=e.length>2,b=i?i.slice(0,-2):n.slice(0,-2),y=[S.size(b),l,d],_=[{type:12,data:m},{type:12,data:l},{type:12,data:d},{type:12,data:p}];Pt(t,_),_.push(...k(b,a,u)),g&&_.push(...k(e[2].dims)),_.push(...k(y));let v=i=>{let s=Vi("batch_dims",e[0].dataType,b.length),l=A("a",e[0].dataType,a.length,h),d=A("b",e[1].dataType,u.length,c),p=C("output",e[0].dataType,y.length,c),m=ve(p.type.tensor),_=At(t,p.type.value,m),v=[l,d],x="";if(g){let t=o?c:1;v.push(A("bias",e[2].dataType,e[2].dims.length,t)),x=`${o?`value += bias[col / ${t}];`:`value += ${p.type.value}(bias[row + i]);`}`}let w=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Ot(t,w);let T=()=>{let e=`var a_data: ${l.type.value};`;for(let t=0;t<h;t++)e+=`
              let b_data${t} = b[(b_offset + (k + ${t}) * uniforms.N + col) / ${c}];`;for(let t=0;t<f;t++){e+=`a_data = a[(a_offset + (row + ${t}) * uniforms.K + k) / ${h}];`;for(let n=0;n<h;n++)e+=`
            values[${t}] = fma(${d.type.value}(a_data${1===h?"":`[${n}]`}), b_data${n}, values[${t}]);
`}return e};return`
  ${i.registerUniforms(w).registerInternalVariables(s).declareVariables(...v,p)}
  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${2===n.length?"":`let batch_indices = ${s.offsetToIndices("batch")};`}

    var a_indices: ${l.type.indices};
    ${no("a_indices",l,l.rank-2,s.rank,"batch_indices")}
    ${l.indicesSet("a_indices",l.rank-2,0)}
    ${l.indicesSet("a_indices",l.rank-1,0)}
    let a_offset = ${l.indicesToOffset("a_indices")};

    var b_indices: ${d.type.indices};
    ${no("b_indices",d,d.rank-2,s.rank,"batch_indices")}
    ${d.indicesSet("b_indices",d.rank-2,0)}
    ${d.indicesSet("b_indices",d.rank-1,0)}
    let b_offset = ${d.indicesToOffset("b_indices")};
    var values: array<${p.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${T()}
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
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${c};${h};${f};${o}`,inputDependencies:g?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:_}),getShaderSource:v}}}),Zi=$(()=>{"use strict";Z(),ne(),oe(),Fn(),Xi(),ji(),G1=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,U1=(e,t)=>e?`
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
        }`,al=(e,t,n="f32",i,o=!1,s=32,a=!1,u=32)=>{let l=t[1]*e[1],d=t[0]*e[0],p=o?l:s,c=o?s:l,h=p/t[0],f=s/t[1];if(!((o&&4===h&&4===e[1]||!o&&(3===h||4===h))&&p%t[0]==0&&s%t[1]==0&&4===e[0]))throw Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${n}>, ${p/h}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${d/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${h};
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
  let batch = ${a?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${a?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${f};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${G1(o,i)}
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

          ${U1(o,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Kb=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,W1=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",sl=(e,t,n="f32",i,o=!1,s=32,a=!1,u=32,l=!1)=>{let d=e[1]*t[1],p=e[0]*t[0],c=o?d:s,h=o?s:d;if(h%t[1]!=0||c%t[0]!=0||s%t[1]!=0)throw Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let f=h/t[1],m=c/t[0],g=s/t[1],b=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${Kb(o,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
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
      ${Kb(o,i)}
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
      ${W1(o)}
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
  var<workgroup> mm_Bsub : array<array<${n}, ${p}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${b}
  }
`},H1=(e,t,n,i,o=!1)=>{let[s,a,u,l]=i,d=ve(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${ze(e,d)} {
      var value = ${ze(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${no("aIndices",a,a.rank-2,s.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${ze(e,d)} {
      var value = ${ze(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${no("bIndices",u,u.rank-2,s.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ze(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${ze(e,d)}(bias[row])`};`:""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ro=(e,t,n,i,o=!1,s)=>{let a=e[0].dims,u=e[1].dims,l=a.slice(0,-2),d=u.slice(0,-2),p=i?i.slice(0,-2):n.slice(0,-2),c=S.size(p),h=a[a.length-2],f=a[a.length-1],m=u[u.length-1],g=f%4==0&&m%4==0,b=h<=8?[4,1,1]:[4,4,1],y=[8,8,1],_=[Math.ceil(m/y[0]/b[0]),Math.ceil(h/y[1]/b[1]),Math.ceil(c/y[2]/b[2])],v=g?4:1,x=[...l,h,f/v],w=x.length,T=[...d,f,m/v],I=T.length,O=[c,h,m/v],E=[{type:6,data:h},{type:6,data:m},{type:6,data:f}];Pt(t,E),E.push(...k(p,x,T));let P=["rank","rank"],D=e.length>2;D&&(E.push(...k(e[2].dims)),P.push("rank")),E.push(...k(O));let N=n=>{let i=p.length,s=Vi("batchDims",e[0].dataType,i,1),a=ve(e[0].dataType),u=A("a",e[0].dataType,w,v),l=A("b",e[1].dataType,I,v),d=C("result",e[0].dataType,O.length,v),c=[u,l];if(D){let t=o?v:1;c.push(A("bias",e[2].dataType,e[2].dims.length,t))}let h=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Ot(t,h);let f=ve(d.type.tensor),m=H1(v,D,At(t,d.type.value,f),[s,u,l,d],o);return`
  ${n.registerUniforms(h).registerInternalVariables(s).declareVariables(...c,d)}
  ${m}
  ${g?al(b,y,a,s):sl(b,y,a,s)}
                   `};return{name:"MatMul",shaderCache:{hint:`${b};${t.activation};${g};${o}`,inputDependencies:P},getRunData:()=>({outputs:[{dims:s?s(n):n,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:E}),getShaderSource:N}}}),Zb=$(()=>{"use strict";Z(),mn(),oe(),Fn(),ji(),jb(),Zi(),q1=(e,t,n,i,o=!1,s,a=4,u=4,l=4,d="f32")=>{let p=e=>{switch(e){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw Error(`innerElementSize ${e} is not supported.`)}},c=e=>{switch(e){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${e} is not supported.`)}},h=e?`
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
    var resData = ${ze(a,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${g}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${p(a)}
    }
    return resData;`,v=e?t&&i?`
    let col = colIn * ${a};
    ${_}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${_}
    }
    return ${ze(a,d)}(0.0);`:i&&n?`
    let col = colIn * ${a};
    ${_}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${ze(a,d)}(0.0);`,x=e?i&&n?c(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${c(u)}
    }
    return ${ze(u,d)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${c(u)}
    }
    return ${ze(u,d)}(0.0);`,w=ze(l,d),T=e?ze(a,d):ze(u,d),I=e?ze(u,d):ze(a,d),O=At(s,w,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${T} {
      ${e?v:x}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${e?x:v}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${w}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${f}
      ${Hb(o)}
      ${O}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Xb=(e,t,n,i,o,s,a,u,l)=>{let d="NHWC"===t.format,p=d?e[0].dims[3]:e[0].dims[1],c=n[0],h=d?n[2]:n[3],f=d?n[1]:n[2],m=d?n[3]:n[1],g=d&&(p%4==0||p%3==0)&&m%4==0,b=d?m:h*f,y=d?h*f:m,_=[8,8,1],v=i<=8?[4,1,1]:[4,4,1],x=[Math.ceil(b/_[0]/v[0]),Math.ceil(y/_[1]/v[1]),Math.ceil(c/_[2]/v[2])];ie("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${x}`);let w=g?d&&p%4!=0?3:4:1,T=_[1]*v[1],I=_[0]*v[0],O=Math.max(_[0]*w,_[1]),E=i%T==0,P=o%I==0,D=s%O==0,N=g?[w,4,4]:[1,1,1],R=[{type:6,data:i},{type:6,data:o},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Pt(t,R),R.push(...k(e[0].dims,e[1].dims));let B=["rank","rank"];a&&(R.push(...k(e[2].dims)),B.push("rank")),R.push(...k(n));let F=i=>{let o=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Ot(t,o);let s=g?4:1,l=ve(e[0].dataType),p=`
      fn setOutputAtIndex(flatIndex : i32, value : ${g?`vec4<${l}>`:l}) {
        result[flatIndex] = ${g?`vec4<${l}>`:l}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${g?`vec4<${l}>`:l}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${g?"/ 4":""}, value);
      }`,c=[A("x",e[0].dataType,e[0].dims.length,3===w?1:w),A("w",e[1].dataType,e[1].dims.length,s)],h=C("result",e[0].dataType,n.length,s);if(a){let t=A("bias",e[2].dataType,e[2].dims.length,s);c.push(t),p+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${g?`vec4<${l}>`:l} {
          return bias[coords.${d?"w":"y"}${g?"/ 4":""}];
        }`}return`
        ${qb("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${i.registerUniforms(o).declareVariables(...c,h)}
        ${p}
        ${q1(d,E,P,D,a,t,N[0],N[1],N[2],l)}
        ${g?al(v,_,l,void 0,!d,O):sl(v,_,l,void 0,!d,O,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${w};${g};${E};${P};${D};${T};${I};${O}`,inputDependencies:B},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:R}),getShaderSource:F}}}),ty=$(()=>{"use strict";Z(),mn(),ne(),oe(),Fn(),ji(),j1=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Jb=e=>"number"==typeof e?[e,e,e]:e,Ji=(e,t)=>t<=1?e:e+(e-1)*(t-1),K1=(e,t,n,i=1)=>{let o=Ji(t,i);return Math.floor((e[0]*(n-1)-n+o)/2)},Qb=(e,t,n,i,o)=>{null==o&&(o=K1(e,t[0],i[0]));let s=[0,0,0,n];for(let n=0;n<3;n++)e[n]+2*o>=t[n]&&(s[n]=Math.trunc((e[n]-t[n]+2*o)/i[n]+1));return s},X1=(e,t,n,i,o,s,a,u,l,d)=>{let p,c,h,f;if("VALID"===e&&(e=0),"number"==typeof e){p={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=Qb([t,n,i,1],[u,l,d],1,[o,s,a],e);c=m[0],h=m[1],f=m[2]}else if(Array.isArray(e)){if(!e.every((e,t,n)=>e===n[0]))throw Error(`Unsupported padding parameter: ${e}`);p={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=Qb([t,n,i,1],[u,l,d],1,[o,s,a],e[0]);c=m[0],h=m[1],f=m[2]}else if("SAME_UPPER"===e){c=Math.ceil(t/o),h=Math.ceil(n/s),f=Math.ceil(i/a);let e=(c-1)*o+u-t,m=(h-1)*s+l-n,g=(f-1)*a+d-i,b=Math.floor(e/2),y=e-b,_=Math.floor(m/2),v=m-_,x=Math.floor(g/2),w=g-x;p={top:_,bottom:v,left:x,right:w,front:b,back:y}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:p,outDepth:c,outHeight:h,outWidth:f}},Yb=(e,t,n,i,o,s=!1,a="channelsLast")=>{let u,l,d,p,c;if("channelsLast"===a)[u,l,d,p,c]=e;else if("channelsFirst"===a)[u,c,l,d,p]=e;else throw Error(`Unknown dataFormat ${a}`);let[h,,f,m,g]=t,[b,y,_]=Jb(n),[v,x,w]=Jb(i),T=Ji(f,v),I=Ji(m,x),O=Ji(g,w),{padInfo:E,outDepth:P,outHeight:D,outWidth:N}=X1(o,l,d,p,b,y,_,T,I,O),R=s?h*c:h,B=[0,0,0,0,0];return"channelsFirst"===a?B=[u,R,P,D,N]:"channelsLast"===a&&(B=[u,P,D,N,R]),{batchSize:u,dataFormat:a,inDepth:l,inHeight:d,inWidth:p,inChannels:c,outDepth:P,outHeight:D,outWidth:N,outChannels:R,padInfo:E,strideDepth:b,strideHeight:y,strideWidth:_,filterDepth:f,filterHeight:m,filterWidth:g,effectiveFilterDepth:T,effectiveFilterHeight:I,effectiveFilterWidth:O,dilationDepth:v,dilationHeight:x,dilationWidth:w,inShape:e,outShape:B,filterShape:t}},ey=(e,t,n,i,o,s)=>{let a="channelsLast"===s,u=a?e[0].dims[3]:e[0].dims[1],l=!1,d=[64,1,1],p=[Math.ceil(j1(({x:n.map((e,t)=>t)}).x.map(e=>n[e]))/d[0]),1,1];ie("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let c=l?a&&u%4!=0?3:4:1,h=[{type:12,data:S.size(n)},{type:12,data:i},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Pt(t,h),h.push(...k(e[0].dims,e[1].dims));let f=["rank","rank"],m=3===e.length;m&&(h.push(...k(e[2].dims)),f.push("rank")),h.push(...k(n));let g=s=>{let u=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Ot(t,u);let d=l?4:1,p=ve(e[0].dataType),h=A("x",e[0].dataType,e[0].dims.length,3===c?1:c),f=A("W",e[1].dataType,e[1].dims.length,d),g=[h,f],b=C("result",e[0].dataType,n.length,d),y="";if(m){let t=A("bias",e[2].dataType,e[2].dims.length,d);g.push(t),y+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${p}>`:p} {
          return bias[${a?M("coords",4,5):M("coords",1,5)}${l?"/ 4":""}];
        }`}let _=ze(c,p),v=At(t,_,p);return`
            ${y}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${h.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${f.getByIndices("aIndices")};
            }
          ${s.registerUniforms(u).declareVariables(...g,b)}
          ${s.mainStart()}
          ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${b.offsetToIndices("global_idx")};
              let batch = ${M("coords",0,h.rank)};
              let d2 = ${a?M("coords",h.rank-1,h.rank):M("coords",1,h.rank)};
              let xFRCCorner = vec3<u32>(${a?M("coords",1,h.rank):M("coords",2,h.rank)},
              ${a?M("coords",2,h.rank):M("coords",3,h.rank)},
              ${a?M("coords",3,h.rank):M("coords",4,h.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?M("uniforms.x_shape",1,h.rank):M("uniforms.x_shape",2,h.rank)};
              let xShapeZ = ${a?M("uniforms.x_shape",2,h.rank):M("uniforms.x_shape",3,h.rank)};
              let xShapeW = ${a?M("uniforms.x_shape",3,h.rank):M("uniforms.x_shape",4,h.rank)};
              let xShapeU = ${a?M("uniforms.x_shape",4,h.rank):M("uniforms.x_shape",1,h.rank)};
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
              ${m?"value = value + getBiasByOutputCoords(coords)":""};
              ${v}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${c};${m}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:h}),getShaderSource:g}}}),oy=$(()=>{"use strict";Z(),ne(),oe(),Fn(),ny=(e,t,n,i)=>{let o=e.length>2,s=o?"value += b[output_channel];":"",a=e[0].dims,u=e[1].dims,l="NHWC"===t.format,d=l?n[3]:n[1],p=d/t.group,c=l&&p>=4?he(d):1,h=S.size(n)/c,f=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:p}];Pt(t,f),f.push(...k(a,[u[0],u[1],u[2],u[3]/c]));let m=o?["rank","rank","rank"]:["rank","rank"];f.push(...k([n[0],n[1],n[2],n[3]/c]));let g=i=>{let d=C("output",e[0].dataType,n.length,c),p=ve(d.type.tensor),h=At(t,d.type.value,p),f=A("x",e[0].dataType,a.length),m=A("w",e[1].dataType,u.length,c),g=[f,m];o&&g.push(A("b",e[2].dataType,e[2].dims,c));let b=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Ot(t,b);let y=l?`
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
    ${s}
    ${h}
    ${d.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${c}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:g}},ry=(e,t,n,i)=>{let o=e.length>2,s=he(n[3]),a=he(n[2]),u=S.size(n)/s/a,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],p=[n[0],n[1],n[2],n[3]/s],c=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Pt(t,c),c.push(...k(l,d,p));let h=(a-1)*t.strides[1]+d[1],f=n=>{let i=C("output",e[0].dataType,p.length,s),u=ve(i.type.tensor),c=At(t,i.type.value,u),f=A("x",e[0].dataType,l.length,s),m=A("w",e[1].dataType,d.length,s),g=[f,m];o&&g.push(A("b",e[2].dataType,e[2].dims,s));let b=o?"value += b[output_channel];":"",y=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Ot(t,y),`
  ${n.registerUniforms(y).declareVariables(...g,i)}
  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${f.type.value}, ${h}>;
    var values: array<${i.type.value}, ${a}>;
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
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${b}
      ${c}
      ${i.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${a};${h};${d[0]};${d[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:f}}}),ay=$(()=>{"use strict";ne(),Zb(),ty(),Zi(),oy(),Fn(),Xi(),In(),Z1=(e,t,n,i,o,s)=>{let a=e[0],u=e.slice(s?1:2,s?3:4),l=u.length,d=t[0],p=t.slice(2).map((e,t)=>e+(e-1)*(n[t]-1)),c=u.map((e,t)=>e+i[t]+i[t+l]).map((e,t)=>Math.floor((e-p[t]+o[t])/o[t]));return c.splice(0,0,a),c.splice(s?3:1,0,d),c},ul=[2,3,1,0],J1=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.length!==2*n)throw Error(`pads should be ${2*n}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape")},ll=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let e=2;e<t[1].dims.length;++e)0===n[e-2]&&(n[e-2]=t[1].dims[e]);let i=e.pads.slice();ar.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,i,"NHWC"===e.format,e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:n,pads:i}),o},cl=e=>{let t=qi(e),n=e.format;return{autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],format:n,dilations:e.dilations,group:e.group,kernelShape:e.kernel_shape,pads:e.pads,strides:e.strides,wIsConst:e.w_is_const(),...t,cacheKey:`${e.format};${t.activation};`}},iy=(e,t,n,i)=>{let o="NHWC"===n.format,s=Z1(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,o);if(1!==n.group){let a=[t[0]];if(o){let i=e.kernelCustomData.wT??e.compute(Fe(t[1],ul),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i),a.push(i)}else a.push(t[1]);3===t.length&&a.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===n.group&&1===t[1].dims[1]&&1===n.dilations[0]&&1===n.dilations[1]?e.compute(ry(a,n,s,i),{inputs:a}):e.compute(ny(a,n,s,i),{inputs:a});return}let a=3===t.length,u=t[0].dims[o?1:2],l=t[0].dims[o?2:3],d=t[0].dims[o?3:1],p=t[1].dims[2],c=t[1].dims[3],h=s[o?1:2],f=s[o?2:3],m=s[o?3:1],g=o&&p===u&&c===l&&0===n.pads[0]&&0===n.pads[1];if(g||1===p&&1===c&&1===n.dilations[0]&&1===n.dilations[1]&&1===n.strides[0]&&1===n.strides[1]&&0===n.pads[0]&&0===n.pads[1]){let p=s[0],c,b,y,_=[];if(o){let i=e.kernelCustomData.wT??e.compute(Fe(t[1],ul),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i),g){let e=u*l*d;c=t[0].reshape([1,p,e]),b=i.reshape([1,e,m]),y=[1,p,m]}else c=t[0].reshape([p,u*l,d]),b=i.reshape([1,d,m]),y=[p,h*f,m];_.push(c),_.push(b)}else c=t[0].reshape([p,d,u*l]),b=t[1].reshape([1,m,d]),y=[p,m,h*f],_.push(b),_.push(c);a&&_.push(t[2]);let v=y[2],x=_[0].dims[_[0].dims.length-1];v<8&&x<8?e.compute(Ki(_,n,s,y,o,i),{inputs:_}):e.compute(ro(_,n,s,y,o,i),{inputs:_});return}let b=!0,y=e.kernelCustomData.wT??e.compute(Fe(t[1],ul),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=y);let _=[t[0],y];a&&_.push(t[2]);let v=o?h*f:m,x=o?m:h*f,w=p*c*d;e.compute(Xb(_,n,s,v,x,w,a,b,i),{inputs:_})},Q1=(e,t)=>{let n="NHWC"===t.format,i=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];3===e.inputs.length&&i.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),a=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=ll({...t,pads:o,strides:s,dilations:a,kernelShape:u},i);iy(e,i,l,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},Y1=(e,t,n)=>{let i="NHWC"===n.format?"channelsLast":"channelsFirst",o=ll(n,t),s="NOTSET"===n.autoPad?n.pads:n.autoPad,a=Yb(t[0].dims,t[1].dims,n.strides,n.dilations,s,!1,i);e.compute(ey(t,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],i))},dl=(e,t)=>{if(J1(e.inputs,t),3===e.inputs[0].dims.length)Q1(e,t);else if(5===e.inputs[0].dims.length)Y1(e,e.inputs,t);else{let n=ll(t,e.inputs);iy(e,e.inputs,n)}}}),uy=$(()=>{"use strict";Z(),mn(),ne(),oe(),sy=(e,t,n)=>{let i=e.length>2,o=t.outputShape,s="NHWC"===t.format,a=t.group,u=e[1].dims,l=u[2]/a,d=u[3],p=s?he(l):1,c=s&&1===d&&l>=4,h=c?4*Math.floor(l/4):Math.floor(l/p)*p,f=l-h,m=s?he(d):1,g=s?1===d?p:m:1,b=S.size(o)/m,y=[Math.ceil(b/64),1,1];ie("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${y}`);let _=["rank","rank"],v=[t.strides[0],t.strides[1]],x=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],w=[t.dilations[0],t.dilations[1]],T=[x[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),x[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],I=[T[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),T[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],O=[{type:12,data:b},{type:12,data:v},{type:12,data:x},{type:12,data:w},{type:12,data:T},{type:6,data:I},{type:12,data:h},{type:12,data:l},{type:12,data:d},...k(e[0].dims,e[1].dims)];i&&(O.push(...k(e[2].dims)),_.push("rank")),O.push(...k(o));let E=t=>{let n=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:v.length},{name:"filter_dims",type:"u32",length:x.length},{name:"dilations",type:"u32",length:x.length},{name:"effective_filter_dims",type:"u32",length:T.length},{name:"pads",type:"i32",length:I.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],a=ve(e[0].dataType),u=s?1:2,l=s?2:3,d=s?3:1,h=A("W",e[1].dataType,e[1].dims.length,g),b=A("Dy",e[0].dataType,e[0].dims.length,p),y=[b,h];i&&y.push(A("bias",e[2].dataType,[o[d]].length,m));let _=C("result",e[0].dataType,o.length,m),w=()=>{let e="";if(c)4===p?e+=`
        let xValue = ${b.getByOffset("x_offset")};
        let wValue = ${h.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:2===p?e+=`
          dotProd = dotProd + dot(vec4<${a}>(${b.getByOffset("x_offset")}, ${b.getByOffset("x_offset + 1u")}), vec4<${a}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:1===p&&(e+=`
          dotProd = dotProd + dot(vec4<${a}>(${b.getByOffset("x_offset")}, ${b.getByOffset("x_offset + 1u")}, ${b.getByOffset("x_offset + 2u")}, ${b.getByOffset("x_offset + 3u")}), vec4<${a}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}, ${h.getByOffset("w_offset + 2u")}, ${h.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(e+=`
                  let xValue = ${s?b.getByOffset(`${b.indicesToOffset(`${b.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):b.get("batch","inputChannel","idyR","idyC")};
        `,1===p)e+=`
          let w_offset = ${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${h.getByOffset(`w_offset / ${g}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let t=0;t<p;t++)e+=`
            let wValue${t} = ${h.getByOffset(`${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${t}, wOutChannel)`)} / ${g}`)};
            dotProd = dotProd + xValue[${t}] * wValue${t};`;return e},O=()=>{if(0===f)return"";if(!c)throw Error(`packInputAs4 ${c} is not true.`);let e="";if(1===p){e+="dotProd = dotProd";for(let t=0;t<f;t++)e+=`
            + ${b.getByOffset(`x_offset + ${t}`)} * ${h.getByOffset(`w_offset + ${t}`)}`;e+=";"}else if(2===p){if(2!==f)throw Error(`Invalid inputChannelsRemainder ${f}.`);e+=`
          let xValue = ${b.getByOffset("x_offset")};
          let wValue = ${h.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return e},E=`
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
              let dyR = (${a}(dyRCorner) + ${a}(wR)) / ${a}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${a}(uniforms.Dy_shape[${u}]) || fract(dyR) > 0.0 ||
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
                if (dyC < 0.0 || dyC >= ${a}(uniforms.Dy_shape[${l}]) ||
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
                ${O()}
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
    ${E}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${p}${g}${m}${c}${f}`,inputDependencies:_},getRunData:()=>({dispatchGroup:{x:y[0],y:y[1],z:y[2]},outputs:[{dims:n?n(o):o,dataType:e[0].dataType}],programUniforms:O}),getShaderSource:E}}}),fy=$(()=>{"use strict";uy(),Fn(),In(),e$=(e,t,n,i,o,s)=>(e-1)*t+n+(i-1)*o+1-s,t$=(e,t,n,i,o)=>{let s=Math.floor(e/2);"SAME_UPPER"===t?(n[i]=s,n[o]=e-s):"SAME_LOWER"===t&&(n[i]=e-s,n[o]=s)},n$=(e,t,n,i,o,s,a,u,l,d)=>{let p=e.length-2,c=0===d.length;l.length<p&&l.push(...Array(p-l.length).fill(0));let h=e[0],f=t[u?3:1]*o;for(let o=0,h=e.length-p-!!u;o<p;++o,++h){let u=e[h],f=c?u*a[o]:d[o];t$(e$(u,a[o],s[o],t[h],n[o],f),i,s,o,o+p),c&&d.push(a[o]*(u-1)+l[o]+(t[h]-1)*n[o]+1-s[o]-s[o+p])}d.splice(0,0,h),d.splice(u?3:1,0,f)},ly=(e,t)=>{let n=e.kernelShape.slice();if(0===e.kernelShape.length||0===e.kernelShape.reduce((e,t)=>e*t,1)){n.length=0;for(let e=2;e<t[1].dims.length;++e)n.push(t[1].dims[e])}let i="NHWC"===e.format;n.splice(0,0,t[1].dims[0]),n.splice(i?3:1,0,t[1].dims[1]);let o=e.pads.slice(),s=e.outputShape.slice(),a=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();0===l.reduce((e,t)=>e+t,0)&&(l=Array(t[0].dims.length-2).fill(1));let d=e.strides.slice();0===d.reduce((e,t)=>e+t,0)&&(d=Array(t[0].dims.length-2).fill(1)),n$(u,n,l,e.autoPad,e.group,o,d,i,a,s);let p=Object.assign({},e);return Object.assign(p,{kernelShape:n,pads:o,outputPadding:a,outputShape:s,dilations:l,strides:d}),p},cy=e=>{let t=qi(e),n=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,s=e.group??1,a=e.kernelShape,u=e.pads,l=e.strides,d=e.wIsConst();return{autoPad:i,format:n,dilations:o,group:s,kernelShape:a,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:u,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},r$=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length&&3!==e[0].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==n))throw Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((e,t)=>e+t,0)>0&&t.dilations.length!==i)throw Error(`dilations should be ${i}D`);if(t.strides.reduce((e,t)=>e+t,0)>0&&t.strides.length!==i)throw Error(`strides should be ${i}D`);if(t.pads.reduce((e,t)=>e+t,0)>0&&t.pads.length!==2*i)throw Error(`pads should be ${2*i}D`);if(t.outputPadding.length!==i&&0!==t.outputPadding.length)throw Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((e,t)=>e+t,0)>0&&0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape")},dy=(e,t,n,i)=>{let o=e.kernelCustomData.wT??e.compute(Fe(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let s=[t[0],o];3===t.length&&s.push(t[2]),e.compute(sy(s,n,i),{inputs:s})},o$=(e,t)=>{let n="NHWC"===t.format,i=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];3===e.inputs.length&&i.push(e.inputs[2]);let o=t.kernelShape;(0===o.length||0===o[0])&&(o=[e.inputs[1].dims[2]]);let s=t.dilations;(0===s.length||0===s[0])&&(s=[1]);let a=t.strides;(0===a.length||0===a[0])&&(a=[1]);let u=t.pads;0===u.length&&(u=[0,0]),u=[0,u[0],0,u[1]],a=[1].concat(a),s=[1].concat(s),o=[1].concat(o);let l=t.outputPadding;l=[0].concat(l);let d=ly({...t,pads:u,strides:a,dilations:s,kernelShape:o,outputPadding:l},i);dy(e,i,d,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},py=(e,t)=>{if(r$(e.inputs,t),3===e.inputs[0].dims.length)o$(e,t);else{let n=ly(t,e.inputs);dy(e,e.inputs,n)}}}),gy=$(()=>{"use strict";Z(),ne(),Ee(),oe(),i$=(e,t,n,i)=>{let o=S.size(t),s=t.length,a=A("input",e,s),u=C("output",e,s),l=6===n.dataType?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),d=S.normalizeAxis(l,s),p=e=>{let t=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,n=M("uniforms.input_shape","uniforms.axis",s),o=i.reverse?t+(i.exclusive?" + 1":""):"0",l=i.reverse?n:t+(i.exclusive?"":" + 1");return`
                ${e.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,u)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${o};
                  let last : i32 = ${l};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:d},...k(t,t)]}),getShaderSource:p}},hy=(e,t)=>{let n=e.inputs[0].dims,i=e.inputs[0].dataType,o=e.inputs[1];e.compute(i$(i,n,o,t),{inputs:[0]})},my=e=>{let t=1===e.exclusive,n=1===e.reverse;return J({exclusive:t,reverse:n})}}),_y=$(()=>{"use strict";Z(),ne(),Ee(),oe(),a$=e=>{if(!e||1!==e.length)throw Error("DepthToSpace requires 1 input.");if(4!==e[0].dims.length)throw Error("DepthToSpace requires 4D input.")},s$=(e,t,n,i)=>{let o=[];o.push(`fn perm(i: ${i.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<t;++i)o.push(n.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},u$=(e,t)=>{let n,i,o,s,a,u,l="NHWC"===t.format,d=t.blocksize,p="DCR"===t.mode;l?([n,i,o,s]=e.dims,a=p?[n,i,o,d,d,s/d**2]:[n,i,o,s/d**2,d,d],u=p?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,i,o,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=p?[n,d,d,s/d**2,i,o]:[n,s/d**2,d,d,i,o],u=p?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=e.reshape(a),h=c.dims.length,f=e.dataType,m=A("a",f,h),g=C("output",f,h),b=e=>`
  ${e.registerUniform("output_size","u32").declareVariables(m,g)}

  ${s$(u,h,m,g)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${g.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${g.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:e=>{let t=l?[n,i*d,o*d,s/d**2]:[n,s/d**2,i*d,o*d],a=S.size(t),p=c.dims,h=S.sortBasedOnPerm(p,u);return{outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...k(p,h)]}},getShaderSource:b}},by=(e,t)=>{a$(e.inputs),e.compute(u$(e.inputs[0],t))},yy=e=>J({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Iy=$(()=>{"use strict";Z(),ne(),Ee(),oe(),xy="^"+(Qi="("+(pl="[a-zA-Z]|\\.\\.\\.")+")+")+"$",c$="^"+("("+Qi+",)*")+Qi+"$",fl=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);void 0===n?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},hl=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[n,i]=t.includes("->")?t.split("->",2):[t,""];if(!n.match(RegExp(c$)))throw Error("Invalid LHS term");if(n.split(",").forEach((t,n)=>{let i=e[n].dims.slice();if(!t.match(RegExp(xy)))throw Error("Invalid LHS term");let o=this.processTerm(t,!0,i,n);this.lhs.push(o)}),""===i)i+=[...this.symbolToInfo.entries()].filter(([e,t])=>1===t.count||"..."===e).map(([e])=>e).join("");else if(!i.match(RegExp(Qi)))throw Error("Invalid RHS");i.match(RegExp(pl,"g"))?.forEach(e=>{if("..."===e)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let t=this.symbolToInfo.get(e);if(void 0===t)throw Error("Invalid RHS symbol");this.outputDims.push(t.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,n){let i=this.symbolToInfo.get(e);if(void 0!==i){if(i.dimValue!==t&&1!==i.count)throw Error("Dimension mismatch");i.count++,i.inputIndices.push(n)}else i={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,i)}processTerm(e,t,n,i=-1){let o=n.length,s=!1,a=[],u=0;if(!e.match(RegExp(xy))&&!t&&""!==e)throw Error("Invalid LHS term");let l=e.match(RegExp(pl,"g")),d=new fl(i);return l?.forEach((e,p)=>{if("..."===e){if(s)throw Error("Only one ellipsis is allowed per input term");s=!0;let e=o-l.length+1;if(e<0)throw Error("Ellipsis out of bounds");if(a=n.slice(u,u+e),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=a;else throw Error("Ellipsis must be specified in the LHS");for(let e=0;e<a.length;e++){let t=String.fromCharCode(48+e);d.addSymbol(t,p+e),this.addSymbol(t,n[u++],i)}}else d.addSymbol(e,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,n[u++],i)}),d}},wy=e=>e+"_max",d$=(e,t,n,i)=>{let o=e.map(e=>e.length).map((e,n)=>A(`input${n}`,t,e)),s=S.size(i),a=C("output",t,i.length),u=[...n.symbolToInfo.keys()].filter(e=>!n.rhs.symbolToIndices.has(e)),l=e=>{let t=[],i="var prod = 1.0;",s="var sum = 0.0;",l="sum += prod;",d=[],p=[],c=[],h=[],f=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((e,i)=>{if(n.rhs.symbolToIndices.has(i)){let s=n.rhs.symbolToIndices.get(i)?.[0];void 0!==s&&n.lhs.forEach((n,u)=>{if(e.inputIndices.includes(u)){let e=n.symbolToIndices.get(i);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{t.push(`${o[u].indicesSet(`input${u}Indices`,e,a.indicesGet("outputIndices",s))}`)})}})}else n.lhs.forEach((t,n)=>{if(e.inputIndices.includes(n)){let e=t.symbolToIndices.get(i);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{d.push(`${o[n].indicesSet(`input${n}Indices`,e,`${i}`)}`)}),h.push(`prod *= ${o[n].getByIndices(`input${n}Indices`)};`)}}),p.push(`for(var ${i}: u32 = 0; ${i} < uniforms.${wy(i)}; ${i}++) {`),c.push("}")});let m=f?[...t,`let sum = ${o.map((e,t)=>e.getByIndices(`input${t}Indices`)).join(" * ")};`]:[...t,s,...p,...d,i,...h,l,...c];return`
            ${e.registerUniforms(u.map(e=>({name:`${wy(e)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...o,a)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${o.map((e,t)=>`var input${t}Indices: ${o[t].type.indices};`).join(`
`)}
            ${m.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let o=u.filter(e=>n.symbolToInfo.has(e)).map(e=>({type:12,data:n.symbolToInfo.get(e)?.dimValue||0}));o.push({type:12,data:s});let a=e.map((e,t)=>[...k(e)]).reduce((e,t)=>e.concat(t),o);return a.push(...k(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a}},getShaderSource:l}},Ty=(e,t)=>{let n=new hl(e.inputs,t.equation),i=n.outputDims,o=e.inputs.map((e,t)=>e.dims);e.compute(d$(o,e.inputs[0].dataType,n,i))},vy=e=>{let t=e.equation.replace(/\s+/g,"");return J({equation:t})}}),Ay=$(()=>{"use strict";Z(),ne(),oe(),p$=e=>{if(!e||2!==e.length)throw Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),i=n.length<t.length?0:n.length-t.length,o=t.length<n.length?0:t.length-n.length;for(;i<n.length&&o<t.length;++i,++o)if(n[i]!==t[o]&&1!==n[i]&&1!==t[o])throw Error("Expand requires shape to be broadcastable to input")},Sy=(e,t)=>{let n=e.length-t.length,i=[];for(let t=0;t<n;++t)i.push(e[t]);for(let o=0;o<t.length;++o)i.push(1===t[o]?e[o+n]:t[o]);return i},f$=(e,t)=>e.length>t.length?Sy(e,t):Sy(t,e),h$=e=>{let t=e[0].dims,n=f$(t,Array.from(e[1].getBigInt64Array(),Number)),i=e[0].dataType,o=9===i||1===S.size(t),s=9===i||t.length>0&&t[t.length-1]%4==0?4:1,a=o||n.length>0&&n[n.length-1]%4==0?4:1,u=Math.ceil(S.size(n)/a),l=e=>{let o=A("input",i,t.length,s),u=C("output",i,n.length,a),l;if(9===i){let e=(e,t,n="")=>`
          let outputIndices${t} = ${u.offsetToIndices(`outputOffset + ${t}u`)};
          let offset${t} = ${o.broadcastedIndicesToOffset(`outputIndices${t}`,u)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${n}(${o.getByOffset(`index${t}`)}[component${t}]);
        `;l=`
        let outputOffset = global_idx * ${a};
        var data = vec4<u32>(0);
        ${e("data",0,"u32")}
        ${e("data",1,"u32")}
        ${e("data",2,"u32")}
        ${e("data",3,"u32")}
        ${u.setByOffset("global_idx","data")}
      }`}else l=`
        let outputIndices = ${u.offsetToIndices(`global_idx * ${a}`)};
        let inputOffset = ${o.broadcastedIndicesToOffset("outputIndices",u)};
        let data = ${u.type.value}(${o.getByOffset(`inputOffset / ${s}`)});
        ${u.setByOffset("global_idx","data")}
      }`;return`
    ${e.registerUniform("vec_size","u32").declareVariables(o,u)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${l}`},d=[{type:12,data:u},...k(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${s}${a}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d})}},$y=e=>{p$(e.inputs),e.compute(h$(e.inputs),{inputs:[0]})}}),Oy=$(()=>{"use strict";Z(),ne(),oe(),Hi(),m$=e=>{let t=e[0].dataType,n=S.size(e[0].dims),i=S.size(e[1].dims),o=i%4==0,s=e=>{let n=A("x",t,[1],4),i=A("bias",t,[1],4),s=C("y",t,[1],4),a=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],u=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${i.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,l=o?`
      let bias = ${i.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${u(0)}${u(1)}${u(2)}${u(3)}
      let bias = ${n.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms(a).declareVariables(n,i,s)}

    ${ol(Ve(t))}

    ${e.mainStart(sr)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${n.getByOffset("global_idx")};
      ${l}
      let x_in = x + bias;
      ${s.setByOffset("global_idx",il("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(n/sr/4)}})}},Py=e=>{e.inputs.length<2||0===S.size(e.inputs[1].dims)?Ib(e):e.compute(m$(e.inputs))}}),Dy=$(()=>{"use strict";Z(),ne(),Ee(),oe(),g$=e=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.")},b$=(e,t)=>{let n=e[0].dims,i=e[1].dims,o=n.length,s=S.normalizeAxis(t.axis,o),a=n.slice(0);a.splice(s,1,...i);let u=n[s],l=9===e[0].dataType?4:1,d=Math.ceil(S.size(a)/l),p=[{type:12,data:d},{type:6,data:u},{type:12,data:s},...k(e[0].dims,e[1].dims,a)],c=t=>{let n=A("data",e[0].dataType,e[0].dims.length,l),u=A("inputIndices",e[1].dataType,e[1].dims.length),d=C("output",e[0].dataType,a.length,l),p=e=>{let t=i.length,l=`var indicesIndices${e}  = ${u.type.indices}(0);`;for(let n=0;n<t;n++)l+=`${t>1?`indicesIndices${e}[${n}]`:`indicesIndices${e}`} = ${a.length>1?`outputIndices${e}[uniforms.axis + ${n}]`:`outputIndices${e}`};`;l+=`
          var idx${e} = ${u.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${n.type.indices};
        `;for(let n=0,i=0;n<o;n++)n===s?(l+=`${o>1?`dataIndices${e}[${n}]`:`dataIndices${e}`} = u32(idx${e});`,i+=t):(l+=`${o>1?`dataIndices${e}[${n}]`:`dataIndices${e}`} = ${a.length>1?`outputIndices${e}[${i}]`:`outputIndices${e}`};`,i++);return l},c;if(9===e[0].dataType){let e=(e,t,i="")=>`
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
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:c}},Ey=e=>J({axis:e.axis}),Cy=(e,t)=>{g$(e.inputs),e.compute(b$(e.inputs,t))}}),Ry=$(()=>{"use strict";Z(),ne(),oe(),y$=(e,t,n,i,o,s,a,u,l)=>{let d=[{type:12,data:s},{type:12,data:i},{type:12,data:o},{type:12,data:n},{type:12,data:a},{type:12,data:u},{type:12,data:l}],p=[s];d.push(...k(t.dims,p));let c=e=>{let i=[A("indices_data",t.dataType,t.dims.length),C("input_slice_offsets_data",12,1,1)],s=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${e.registerUniforms(s).declareVariables(...i)}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:c},{inputs:[t],outputs:[-1]})[0]},ky=(e,t)=>{let n=e.inputs,i=n[0].dims,o=n[0].dataType,s=n[1].dims,a=s[s.length-1],u=S.sizeToDimension(s,s.length-1),l=S.sizeFromDimension(i,t.batchDims+a),d=S.sizeToDimension(i,t.batchDims),p=S.sizeFromDimension(i,t.batchDims),c=u/d,h=Array(a),f=l;for(let e=0;e<a;++e)h[a-1-e]=f,f*=i[t.batchDims+a-1-e];let m=y$(e,n[1],h,t.batchDims,i,u,c,p,a),g=t.batchDims+a;if(g>i.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let b=s.slice(0,-1).concat(i.slice(g)),y=S.size(b),_=[{type:12,data:y},{type:12,data:l},...k(n[0].dims,m.dims,b)],v=e=>{let t=A("data",n[0].dataType,n[0].dims.length),i=A("slice_offsets",12,m.dims.length),o=C("output",n[0].dataType,b.length);return`
          ${e.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(t,i,o)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:b,dataType:o}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:v},{inputs:[n[0],m]})},Ly=e=>({batchDims:e.batch_dims,cacheKey:""})}),My=$(()=>{"use strict";Z(),ne(),Ee(),oe(),_$=(e,t)=>{if(e.length<3||e.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=S.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,o=e[0],s=e[2],a=4===e.length?e[3]:void 0;if(s.dims.length!==o.dims.length||!o.dims.map((e,t)=>t===n?Math.ceil(e/i)===s.dims[t]:e===s.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==s.dims.length||!a.dims.map((e,t)=>e===s.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},x$=(e,t)=>{let n=e[0].dims,i=e[1].dims,o=n.length,s=S.normalizeAxis(t.gatherAxis,o),a=S.normalizeAxis(t.quantizeAxis,o),u=n.slice(0);u.splice(s,1,...i);let l=S.size(u),d=e[2].dataType,p=22===e[0].dataType,c=[{type:12,data:l},{type:12,data:a},{type:12,data:s},{type:12,data:t.blockSize},...k(...e.map((e,t)=>e.dims),u)],h=t=>{let o=A("data",e[0].dataType,e[0].dims.length),a=A("inputIndices",e[1].dataType,e[1].dims.length),l=A("scales",e[2].dataType,e[2].dims.length),c=e.length>3?A("zeroPoint",e[3].dataType,e[3].dims.length):void 0,h=C("output",d,u.length),f=[o,a,l];c&&f.push(c);let m=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${t.registerUniforms(m).declareVariables(...f,h)}
        ${t.mainStart()}
        let output_indices = ${h.offsetToIndices("global_idx")};
        var indices_indices = ${a.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${h.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${a.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${h.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${o.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${h.indicesGet("output_indices","i")};
          ${o.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${a.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[s]};
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
        let dequantized_data = ${Ve(d)}(quantized_data - zero_point) * scale;
        ${h.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((e,t)=>1!==t).map(e=>e.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(e,t)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:h}},Ny=(e,t)=>{_$(e.inputs,t),e.compute(x$(e.inputs,t))},zy=e=>J({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Fy=$(()=>{"use strict";Z(),ne(),Ee(),oe(),w$=e=>{if(!e||2!==e.length)throw Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},T$=(e,t)=>{let n=e[0].dims,i=e[0].dataType,o=n.length,s=e[1].dims,a=e[1].dataType,u=S.normalizeAxis(t.axis,o),l=n[u],d=s.slice(0),p=S.size(d),c=A("input",i,o),h=A("indicesInput",a,s.length),f=C("output",i,d.length),m=[{type:12,data:p},{type:6,data:l},{type:12,data:u}];return m.push(...k(n,s,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m}),getShaderSource:e=>`
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
  }`}},By=e=>J({axis:e.axis}),Vy=(e,t)=>{w$(e.inputs),e.compute(T$(e.inputs,t))}}),Wy=$(()=>{"use strict";Z(),ne(),oe(),v$=e=>{if(!e)throw Error("Input is missing");if(e.length<2||e.length>3)throw Error("Invaid input number.");if(3===e.length&&e[2].dims.length>2)throw Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||3===e.length&&e[0].dataType!==e[2].dataType)throw Error("Input types are mismatched")},I$=(e,t)=>{let n=e[0].dims.slice(),i=e[1].dims.slice(),[o,s,a]=Di.getShapeOfGemmResult(n,t.transA,i,t.transB,3===e.length?e[2].dims:void 0),u=[o,s];if(!u)throw Error("Can't use gemm on the given tensors");let l=16,d=Math.ceil(s/16),p=Math.ceil(o/16),c=!0,h=S.size(u),f=[{type:12,data:c?d:h},{type:12,data:o},{type:12,data:s},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],m=["type","type"];3===e.length&&(f.push(...k(e[2].dims)),m.push("rank")),f.push(...k(u));let g=n=>{let i="";t.transA&&t.transB?i="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?i="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?i="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":t.transA||t.transB||(i="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let o=1===t.alpha?"":"value *= uniforms.alpha;",s=A("a",e[0].dataType,e[0].dims),a=A("b",e[1].dataType,e[1].dims),l=s.type.value,d=null,p=[s,a];3===e.length&&(d=A("c",e[2].dataType,e[2].dims.length),p.push(d));let c=C("output",e[0].dataType,u.length);p.push(c);let h=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
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
  }`},b=n=>{let i=A("a",e[0].dataType,e[0].dims),o=A("b",e[1].dataType,e[1].dims),s=null,a=[i,o];3===e.length&&(s=A("c",e[2].dataType,e[2].dims.length),a.push(s));let d=C("output",e[0].dataType,u.length);a.push(d);let p=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],c="",h="";t.transA&&t.transB?(h=`
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
  ${n.registerUniforms(p).declareVariables(...a)}
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
    ${null!=s?`let cOffset = ${s.broadcastedIndicesToOffset("vec2(m, n)",d)}; value += ${d.type.value}(uniforms.beta) * ${s.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return c?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:d*p},programUniforms:f}),getShaderSource:b}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:g}},Gy=e=>({transA:e.transA,transB:e.transB,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${1===e.alpha}`}),Uy=(e,t)=>{v$(e.inputs),e.compute(I$(e.inputs,t))}}),jy=$(()=>{"use strict";Z(),ne(),Ee(),oe(),[Sn,Gn,$r,Ar]=[0,1,2,3],S$=e=>{if(4!==e[0].dims.length)throw Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw Error("grid batch size must match input batch size")},$$=`
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
`,A$=e=>`
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
`,P$=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${0===e.alignCorners?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,O$=e=>`
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
`,E$=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Sn}] = batch;
     indices[${Gn}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${$r}] = u32(r);
            indices[${Ar}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${$r}] = u32(clamp(r, 0, H - 1));
          indices[${Ar}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${$r}] = gs_reflect(r, border[1], border[3]);
          indices[${Ar}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,C$=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Sn}], indices[${Gn}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Sn}], indices[${Gn}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Sn}], indices[${Gn}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Sn}], indices[${Gn}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Sn}], indices[${Gn}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Sn}], indices[${Gn}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,D$=(e,t)=>{let n=A("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=A("grid",e[1].dataType,i.length,2),s=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];"NHWC"===t.format&&(s=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Sn,Gn,$r,Ar]=[0,3,1,2]);let a=C("output",e[0].dataType,s.length),u=n.type.value,l=[{type:12,data:S.size(s)},...k(e[0].dims,i,s)],d=e=>`
  ${e.registerUniform("output_size","u32").declareVariables(n,o,a)}
  ${$$}
  ${A$(u)}
  ${P$(t)}
  ${O$(t)}
  ${E$(n,u,t)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${$r}]);
      let W_in = i32(uniforms.x_shape[${Ar}]);

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
      var grid_indices = vec3<u32>(indices[${Sn}], indices[${$r}], indices[${Ar}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${C$(a,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:e=>{let t=S.size(s);return{outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:l}},getShaderSource:d}},Hy=(e,t)=>{S$(e.inputs),e.compute(D$(e.inputs,t))},qy=e=>J({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),ml=$(()=>{"use strict";Z(),ne(),Ee(),Mi(),Ui(),oe(),In(),rt=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,R$=(e,t)=>{let n,i=e[0],o=rt(e,1),s=rt(e,2),a=rt(e,3),u=rt(e,4),l=rt(e,5),d=rt(e,6),p=rt(e,7);if(3!==i.dims.length&&5!==i.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let c=i.dims[0],h=i.dims[1],f=3===i.dims.length?i.dims[2]:t.numHeads*i.dims[4],m=h,g=0,b=0,y=Math.floor(f/t.numHeads);if(d&&p&&S.size(d.dims)&&S.size(p.dims)){if(4!==d.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==c||d.dims[1]!==t.numHeads||d.dims[3]!==y)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==c||p.dims[1]!==t.numHeads||p.dims[3]!==y)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==p.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');g=d.dims[2],b=d.dims[2]}else if(d&&S.size(d.dims)||p&&S.size(p.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(o&&S.size(o.dims)>0){if(3!==i.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(o.dims.length<3||o.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==o.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===o.dims.length){if(o.dims[2]!==i.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');n=2,m=o.dims[1]}else if(5===o.dims.length){if(o.dims[2]!==t.numHeads||2!==o.dims[3]||o.dims[4]!==y)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw Error('Expect "value" be none when "key" has packed kv format.');n=5,m=o.dims[1]}else{if(o.dims[1]!==t.numHeads||o.dims[3]!==y)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');n=0,m=o.dims[2]}}else{if(5!==i.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(i.dims[2]!==t.numHeads||3!==i.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');n=3}if(a&&S.size(a.dims)>0){if(1!==a.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(o&&5===o.dims.length&&2===o.dims[3])throw Error("bias is not allowed for packed kv.")}let _=g+m,v=0;if(u&&S.size(u.dims)>0){v=8;let e=u.dims;throw 1===e.length?e[0]===c?v=1:e[0]===3*c+2&&(v=3):2===e.length&&e[0]===c&&e[1]===_&&(v=5),8===v?Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):Error("Mask not supported")}let x=!1,w=f;if(s&&S.size(s.dims)>0){if(3!==s.dims.length&&4!==s.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==s.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===s.dims.length){if(m!==s.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');w=s.dims[2]}else{if(m!==s.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');w=s.dims[1]*s.dims[3],x=!0}}let T=!1;if(u&&S.size(u.dims)>0)throw Error("Key padding mask is not supported");if(l&&S.size(l.dims)>0){if(4!==l.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[2]!==h||l.dims[3]!==_)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:h,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:_,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:f,vHiddenSize:w,headSize:y,vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:T,passPastInKv:x,qkvFormat:n}},Xy=e=>J({...e}),Ky=J({perm:[0,2,1,3]}),N$=(e,t,n,i,o,s,a)=>{let u=[i,o,s],l=S.size(u),d=[{type:12,data:l},{type:12,data:a},{type:12,data:s}],p=e=>{let i=C("qkv_with_bias",t.dataType,u),o=A("qkv",t.dataType,u),s=A("bias",n.dataType,u),a=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${e.registerUniforms(a).declareVariables(o,s,i)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:p},{inputs:[t,n],outputs:[-1]})[0]},oo=(e,t,n,i,o,s,a,u)=>{let l=s;if(!(a&&S.size(a.dims)>0))return 3===s.dims.length&&(l=s.reshape([t,i,n,o])),1===n||1===i?l:e.compute(Fe(l,Ky.perm),{inputs:[l],outputs:[-1]})[0];if(1===i)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=(l=N$(e,s,a,t,i,n*o,u)).reshape([t,i,n,o]),1===n||1===i?l:e.compute(Fe(l,Ky.perm),{inputs:[l],outputs:[-1]})[0]},Zy=(e,t)=>{let n=R$(e.inputs,t),i=e.inputs[0],o=rt(e.inputs,1),s=rt(e.inputs,2),a=rt(e.inputs,3),u=rt(e.inputs,4),l=rt(e.inputs,5),d=rt(e.inputs,6),p=rt(e.inputs,7);if(5===i.dims.length)throw Error("Packed QKV is not implemented");if(o?.dims.length===5)throw Error("Packed KV is not implemented");let c=o&&s&&4===o.dims.length&&4===s.dims.length,h=oo(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,i,a,0);if(c)return Sr(e,h,o,s,u,void 0,d,p,l,n);if(!o||!s)throw Error("key and value must be provided");let f=oo(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,a,n.hiddenSize),m=oo(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,s,a,2*n.hiddenSize);Sr(e,h,f,m,u,void 0,d,p,l,n)}}),bl=$(()=>{"use strict";Z(),ne(),Ee(),oe(),z$=e=>{if(!e||e.length<1)throw Error("too few inputs")},M$=(e,t)=>{let n=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(e=>n.push(Number(e))),i=n.length),J({numOutputs:i,axis:t.axis,splitSizes:n})},B$=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${M("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,V$=e=>{let t=e.length,n=[];for(let i=0;i<t;++i){let o=e[i].setByIndices("indices","input[global_idx]");1===t?n.push(o):0===i?n.push(`if (output_number == ${i}u) { ${o} }`):i===t-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${i}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},gl=(e,t)=>{let n=e[0].dims,i=S.size(n),o=e[0].dataType,s=S.normalizeAxis(t.axis,n.length),a=Array(t.numOutputs),u=A("input",o,n.length),l=Array(t.numOutputs),d=[],p=[],c=0,h=[{type:12,data:i}];for(let i=0;i<t.numOutputs;i++){c+=t.splitSizes[i],l[i]=c;let u=n.slice();u[s]=t.splitSizes[i],p.push(u),a[i]=C(`output${i}`,o,u.length),d.push({dims:p[i],dataType:e[0].dataType})}h.push({type:12,data:l},...k(n,...p));let f=e=>`
  ${e.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...a)}
  ${B$(l.length)}
  ${V$(a)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${M("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:f,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:h})}},Jy=(e,t)=>{z$(e.inputs);let n=1===e.inputs.length?t:M$(e.inputs,t);e.compute(gl(e.inputs,n),{inputs:[0]})},Qy=e=>{let t=e.axis,n=e.splitSizes,i=e.numOutputs<0?n.length:e.numOutputs;if(i!==n.length)throw Error("numOutputs and splitSizes length must be equal");return J({axis:t,numOutputs:i,splitSizes:n})}}),yl=$(()=>{"use strict";Z(),ne(),Ee(),oe(),F$=(e,t)=>{let[n,i,o,s]=e,{numHeads:a,rotaryEmbeddingDim:u}=t;if(3!==n.dims.length&&4!==n.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!S.areEqual(i.dims,[])&&!S.areEqual(i.dims,[1])&&2!==i.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(2!==o.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(2!==s.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!S.areEqual(o.dims,s.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&0===a)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let l=n.dims[0],d=n.dims[n.dims.length-2],p=o.dims[0],c=S.sizeFromDimension(n.dims,1)/d,h=0===u?2*o.dims[1]:c/a;if(u>h)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===i.dims.length){if(l!==i.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(d!==i.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(h/2!==o.dims[1]&&u/2!==o.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(d>p)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Yi=(e,t)=>{let{interleaved:n,numHeads:i,rotaryEmbeddingDim:o,scale:s}=t,a=e[0].dims[0],u=S.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=u/l,p=e[2].dims[1],c=0===o?2*p:d/i,h=[a,l,d/c,c-p],f=S.computeStrides(h),m=[{type:1,data:s},{type:12,data:h},{type:12,data:f},...3===e[0].dims.length?Array({type:12,data:[u,d,c,1]}):[],...4===e[0].dims.length?Array({type:12,data:[u,c,l*c,1]}):[],...k(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],g=t=>{let i=A("input",e[0].dataType,e[0].dims.length),o=A("position_ids",e[1].dataType,e[1].dims.length),s=A("cos_cache",e[2].dataType,e[2].dims.length),a=A("sin_cache",e[3].dataType,e[3].dims.length),u=C("output",e[0].dataType,e[0].dims.length);return t.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${t.declareVariables(i,o,s,a,u)}

        ${t.mainStart(sr)}
          let half_rotary_emb_dim = uniforms.${s.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${o.broadcastedIndicesToOffset("bsnh.xy",C("",o.type.tensor,2))};
            let position_id =
                u32(${o.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${i.getByOffset("i")} * ${s.get("position_id","bsnh[3]")} -
                ${i.getByOffset("j")} * ${a.get("position_id","bsnh[3]")};
            ${u.setByOffset("i","re")}
            let im = ${i.getByOffset("i")} * ${a.get("position_id","bsnh[3]")} +
                ${i.getByOffset("j")} * ${s.get("position_id","bsnh[3]")};
            ${u.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${u.setByOffset("k",i.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:J({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(S.size(h)/sr)},programUniforms:m})}},Yy=(e,t)=>{F$(e.inputs,t),e.compute(Yi(e.inputs,t))}}),n_=$(()=>{"use strict";Ee(),Z(),Ui(),ml(),bl(),In(),yl(),oe(),G$=(e,t)=>{if(t.doRotary&&e.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],i=e[1],o=e[2],s=e[3],a=e[4];if(0!==t.doRotary&&e.length<=7)throw Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(-1!==t.localWindowSize)throw Error("Local attention is not supported");if(0!==t.softcap)throw Error("Softcap is not supported");if(0!==t.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==n.dims.length&&5!==n.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=n.dims[0],d=n.dims[1],p=3===n.dims.length?u?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],c=d,h=0,f=!i||0===i.dims.length,m=Math.floor(f?p/(t.numHeads+2*t.kvNumHeads):p/t.numHeads);f&&(p=m*t.numHeads);let g=s&&0!==s.dims.length,b=a&&0!==a.dims.length;if(g&&4===s.dims.length&&s.dims[0]===l&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===m)throw Error("BSNH pastKey/pastValue is not supported");if(g&&b){if(4!==s.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==a.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');h=s.dims[2]}else if(g||b)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let y=1;if(i&&i.dims.length>0){if(3!==n.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==i.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===i.dims.length){if(n.dims[2]%i.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');c=i.dims[1]}else if(5===i.dims.length){if(i.dims[2]!==t.numHeads||2!==i.dims[3]||i.dims[4]!==m)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw Error('Expect "value" be none when "key" has packed kv format.');c=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==m)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');c=i.dims[2]}}else{if(3!==n.dims.length&&5!==n.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===n.dims.length&&(n.dims[2]!==t.numHeads||3!==n.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}let _=0,v=!1,x=t.kvNumHeads?m*t.kvNumHeads:p;if(o&&o.dims.length>0){if(3!==o.dims.length&&4!==o.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===o.dims.length){if(c!==o.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');x=o.dims[2]}else{if(c!==o.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');x=o.dims[1]*o.dims[3],v=!0}}let w=e.length>4?e[5]:void 0;if(w&&1!==w.dims.length&&w.dims[0]!==l)throw Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:d,pastSequenceLength:h,kvSequenceLength:c,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:p,vHiddenSize:x,headSize:m,vHeadSize:Math.floor(x/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:v,qkvFormat:y}},U$=J({perm:[0,2,1,3]}),e_=(e,t,n)=>{let i=t,o=n.kvNumHeads;return 3===t.dims.length&&0!==n.kvSequenceLength&&(i=t.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),i=e.compute(Fe(i,U$.perm),{inputs:[i],outputs:[-1]})[0]),i},W$=(e,t,n,i)=>{let o=7,s=[e*t],a=e*t,u=[{type:12,data:a},{type:12,data:t},{type:12,data:e}];return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u}),getShaderSource:e=>{let t=A("seq_lens",n.dataType,n.dims),a=A("total_seq_lens",i.dataType,i.dims),u=C("pos_ids",o,s),l=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${e.registerUniforms(l).declareVariables(t,a,u)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${a.getByOffset("0")});
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
  `}}},t_=(e,t)=>{let n=G$(e.inputs,t);if(5===e.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let i=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&0!==e.inputs[3].dims.length?e.inputs[3]:void 0,u=e.inputs[4]&&0!==e.inputs[4].dims.length?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,p=n.kvNumHeads?n.kvNumHeads:n.numHeads,c=J({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,p*n.headSize,p*n.headSize]}),[h,f,m]=o||s?[i,o,s]:e.compute(gl([i],c),{inputs:[i],outputs:[-1,-1,-1]}),g,b;if(t.doRotary){let i=e.compute(W$(n.batchSize,n.sequenceLength,l,d),{inputs:[l,d],outputs:[-1]})[0],o=e.inputs[7],s=e.inputs[8],a=J({interleaved:0!==t.rotaryInterleaved,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),u=[h,i,o,s],p=[-1];g=e.compute(Yi(u,a),{inputs:u,outputs:p})[0],u.splice(0,1,f);let c=J({interleaved:0!==t.rotaryInterleaved,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});b=e.compute(Yi(u,c),{inputs:u,outputs:p})[0]}let y=oo(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?g:h,void 0,0),_=e_(e,t.doRotary?b:f,n),v=e_(e,m,n);Sr(e,y,_,v,void 0,void 0,a,u,void 0,n,l,d)}}),i_=$(()=>{"use strict";Z(),ne(),In(),oe(),r_=(e,t,n,i,o,s,a,u)=>{let l=he(s),d=1===l?"f32":`vec${l}f`,p=1===l?"vec2f":`mat2x${l}f`,c=o*a,h=64;1===c&&(h=256);let f=[o,a,s/l],m=[o,a,2],g=["rank","type","type"],b=[];b.push(...k(f,m));let y=e=>{let o=A("x",t.dataType,3,l),s=[o,A("scale",n.dataType,n.dims),A("bias",i.dataType,i.dims),C("output",1,3,2)];return`
  var<workgroup> workgroup_shared : array<${p}, ${h}>;
  const workgroup_size = ${h}u;
  ${e.declareVariables(...s)}
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
      let sum_final = ${$t("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${$t("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${h}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:c},programUniforms:b}),getShaderSource:y},{inputs:[t,n,i],outputs:[-1]})[0]},H$=(e,t,n)=>{let i=t[0].dims,o=i,s=2,a=i[0],u=i[1],l=S.sizeFromDimension(i,s),d=he(l),p=S.size(o)/d,c=r_(e,t[0],t[1],t[2],a,l,u,n.epsilon),h=[a,u,l/d],f=[a,u],m=["type","none"],g=e=>{let n=A("x",t[0].dataType,h.length,d),i=A("scale_shift",1,f.length,2),o=C("output",t[0].dataType,h.length,d),s=[n,i,o];return`
  ${e.registerUniform("output_size","u32").declareVariables(...s)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${o.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${i.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${n.getByOffset("global_idx")} * ${o.type.value}(scale_shift.x) + ${o.type.value}(scale_shift.y);
      ${o.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...k(h,f,h)]}),getShaderSource:g},{inputs:[t[0],c]})},q$=(e,t,n)=>{let i=t[0].dims,o=i,s=i[0],a=i[i.length-1],u=S.sizeFromDimension(i,1)/a,l=he(a),d=S.size(o)/l,p=[{type:12,data:u},{type:12,data:Math.floor(a/l)}],c=["type","type"],h=!1,f=[0,i.length-1];for(let e=0;e<i.length-2;e++)h=h||1!==i[e+1],f.push(e+1);let m=(h=h&&1!==i[i.length-1])?e.compute(Fe(e.inputs[0],f),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(e,t)=>i[f[t]])),g=r_(e,m,t[1],t[2],s,u,a,n.epsilon),b=e=>{let n=ve(t[0].dataType),i=1===l?"vec2f":`mat${l}x2f`,s=e=>{let t=0===e?"x":"y",i=1===l?"f32":`vec${l}f`;switch(l){case 1:return`${n}(${i}(scale.${t}))`;case 2:return`vec2<${n}>(${i}(scale[0].${t}, scale[1].${t}))`;case 4:return`vec4<${n}>(${i}(scale[0].${t}, scale[1].${t}, scale[2].${t}, scale[3].${t}))`;default:throw Error(`Not supported compoents ${l}`)}},a=A("input",t[0].dataType,t[0].dims,l),u=C("output",t[0].dataType,o,l);return`
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
    output[global_idx] = fma(input[global_idx], ${s(0)}, ${s(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:b},{inputs:[t[0],g]})},o_=(e,t)=>{"NHWC"===t.format?q$(e,e.inputs,t):H$(e,e.inputs,t)}}),s_=$(()=>{"use strict";Z(),ne(),oe(),j$=e=>{if(!e||e.length<2)throw Error("layerNorm requires at least 2 inputs.")},K$=(e,t,n)=>{let i=t.simplified,o=e[0].dims,s=e[1],a=!i&&e[2],u=o,l=S.normalizeAxis(t.axis,o.length),d=S.sizeToDimension(o,l),p=S.sizeFromDimension(o,l),c=S.size(s.dims),h=a?S.size(a.dims):0;if(c!==p||a&&h!==p)throw Error(`Size of X.shape()[axis:] == ${p}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${h}`);let f=[];for(let e=0;e<o.length;++e)e<l?f.push(o[e]):f.push(1);let m=he(p),g=["type","type"],b=[{type:12,data:d},{type:1,data:p},{type:12,data:Math.floor(p/m)},{type:1,data:t.epsilon}];a&&g.push("type");let y=n>1,_=n>2,v=t=>{let n=ve(e[0].dataType),o=[A("x",e[0].dataType,e[0].dims,m),A("scale",s.dataType,s.dims,m)];a&&o.push(A("bias",a.dataType,a.dims,m)),o.push(C("output",e[0].dataType,u,m)),y&&o.push(C("mean_data_output",1,f)),_&&o.push(C("inv_std_output",1,f));let l=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${t.registerUniforms(l).declareVariables(...o)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${el("f32",m)};
    var mean_square_vector = ${el("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${ur(n,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${$t("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${$t("mean_square_vector",m)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${ur(n,m,"x[j + offset]")};
      let f32scale = ${ur(n,m,"scale[j]")};
      output[j + offset] = ${o[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${ur(n,m,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},x=[{dims:u,dataType:e[0].dataType}];return y&&x.push({dims:f,dataType:1}),_&&x.push({dims:f,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${n};${i}`,inputDependencies:g},getRunData:()=>({outputs:x,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:b}),getShaderSource:v}},a_=(e,t)=>{j$(e.inputs),e.compute(K$(e.inputs,t,e.outputCount))}}),l_=$(()=>{"use strict";ne(),Xi(),Zi(),X$=e=>{if(!e||2!==e.length)throw Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw Error("shared dimension does not match.")},u_=e=>{X$(e.inputs);let t=gn.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw Error("Can't use matmul on the given tensors");let n=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&i<8)e.compute(Ki(e.inputs,{activation:""},t));else{let o=t[t.length-2],s=S.size(e.inputs[0].dims.slice(0,-2)),a=S.size(e.inputs[1].dims.slice(0,-2));if(1!==s&&1===o&&1===a){let o=e.inputs[0].reshape([1,s,i]),a=e.inputs[1].reshape([1,i,n]),u=[1,s,n],l=[o,a];e.compute(ro(l,{activation:""},t,u),{inputs:l})}else e.compute(ro(e.inputs,{activation:""},t))}}}),p_=$(()=>{"use strict";Z(),ne(),Ee(),oe(),Z$=(e,t)=>{if(e.length<3||e.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],i=n.dims.length;if(n.dims[i-1]!==t.k)throw Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,a=e[1];if(!S.areEqual(a.dims,[t.n,o,s]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(S.size(u)!==t.n*o)throw Error("scales input size error.");if(4===e.length){let n=e[3].dims,i=t.n*(8===t.bits?o:Math.floor((o*t.bits+7)/8));if(S.size(n)!==i)throw Error("zeroPoints input size error.")}},J$=(e,t)=>{let n=e[0].dims,i=n.length,o=n[i-2],s=t.k,a=t.n,u=n.slice(0,i-2),l=S.size(u),d=e[1].dims[2]/4,p=e[0].dataType,c=he(t.k),h=he(d),f=he(a),m=u.concat([o,a]),g=o>1&&a/f%2==0?2:1,b=S.size(m)/f/g,y=64,_=[],v=[l,o,s/c],x=S.convertShape(e[1].dims).slice();x.splice(-1,1,d/h),_.push(...k(v)),_.push(...k(x)),_.push(...k(e[2].dims)),4===e.length&&_.push(...k(S.convertShape(e[3].dims)));let w=[l,o,a/f];_.push(...k(w));let T=n=>{let i=v.length,o=A("a",e[0].dataType,i,c),s=A("b",12,x.length,h),a=A("scales",e[2].dataType,e[2].dims.length),u=[o,s,a],l=4===e.length?A("zero_points",12,e[3].dims.length):void 0;l&&u.push(l);let p=w.length,m=C("output",e[0].dataType,p,f),b=ve(e[0].dataType),_=(()=>{switch(c){case 1:return`array<${b}, 8>`;case 2:return`mat4x2<${b}>`;case 4:return`mat2x4<${b}>`;default:throw Error(`${c}-component is not supported.`)}})(),T=()=>{let e=`
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
          `;return e},I=()=>{let e=`
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
            let scale${t} = ${a.getByOffset("col_index * nBlocksPerCol + block")};
            ${l?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${l.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${t} = ${b}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return e},O=()=>{let e=`col_index = col * ${f};`;for(let t=0;t<f*g;t++)e+=`
            let b${t}_data = ${s.getByIndices(`${s.type.indices}(col_index, block, word)`)};
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
            ${I()}
            for (var word: u32 = 0; word < ${d}; word += ${h}) {
              ${O()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${T()}
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
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${c};${h};${f};${g};${y}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:p}],dispatchGroup:{x:b},programUniforms:_}),getShaderSource:T}},Q$=(e,t)=>{let n=e[0].dims,i=n.length,o=n[i-2],s=t.k,a=t.n,u=n.slice(0,i-2),l=S.size(u),d=e[1].dims[2]/4,p=e[0].dataType,c=he(t.k),h=he(d),f=u.concat([o,a]),m=128,g=a%8==0?8:a%4==0?4:1,b=128/g,y=b*h*8,_=y/c,v=y/t.blockSize,x=S.size(f)/g,w=[],T=[l,o,s/c],I=S.convertShape(e[1].dims).slice();I.splice(-1,1,d/h),w.push(...k(T)),w.push(...k(I)),w.push(...k(e[2].dims)),4===e.length&&w.push(...k(S.convertShape(e[3].dims)));let O=[l,o,a];w.push(...k(O));let E=n=>{let i=T.length,o=A("a",e[0].dataType,i,c),s=A("b",12,I.length,h),a=A("scales",e[2].dataType,e[2].dims.length),u=[o,s,a],l=4===e.length?A("zero_points",12,e[3].dims.length):void 0;l&&u.push(l);let d=O.length,p=C("output",e[0].dataType,d),f=ve(e[0].dataType),y=()=>{switch(c){case 1:return`
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
            let scale = ${a.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${s.getByIndices(`${s.type.indices}(b_row, block, 0)`)};
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
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${c};${h};${b};${g}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:p}],dispatchGroup:{x:x},programUniforms:w}),getShaderSource:E}},c_=(e,t)=>{Z$(e.inputs,t),32===t.blockSize&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Q$(e.inputs,t)):e.compute(J$(e.inputs,t))},d_=e=>J(e)}),h_=$(()=>{"use strict";Z(),ne(),oe(),Y$=e=>{if(!e||e.length<1)throw Error("Too few inputs");if(1!==e[0].dataType&&10!==e[0].dataType)throw Error("Input type must be float or float16.");if(e.length>=2){let t=2*e[0].dims.length===e[1].dims[0];if(4===e.length&&(t=2*e[3].dims[0]===e[1].dims[0]),!t)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},eA=(e,t,n)=>{let i="";for(let o=t-1;o>=0;--o)i+=`
            k = i32(${e.indicesGet("indices",o)}) - ${M("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${M("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${M("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},tA=(e,t,n)=>{let i="";for(let o=t-1;o>=0;--o)i+=`
                k = i32(${e.indicesGet("indices",o)}) - ${M("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${M("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${M("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${M("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},nA=(e,t,n)=>{let i="";for(let o=t-1;o>=0;--o)i+=`
                k = i32(${e.indicesGet("indices",o)}) - ${M("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${M("uniforms.x_shape",o,t)})) {
                  k = i32(${M("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${M("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},rA=(e,t,n)=>{let i="";for(let o=t-1;o>=0;--o)i+=`
                k = i32(${e.indicesGet("indices",o)}) - ${M("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${M("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${M("uniforms.x_shape",o,t)})) {
                  k -= i32(${M("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${M("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},oA=(e,t,n)=>{switch(n.mode){case 0:return eA(e,t,n.pads.length);case 1:return tA(e,t,n.pads.length);case 2:return nA(e,t,n.pads.length);case 3:return rA(e,t,n.pads.length);default:throw Error("Invalid mode")}},iA=(e,t)=>{let n=S.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,o=[{type:12,data:S.size(n)},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;0===t.mode&&o.push({type:s?e[2].dataType:1,data:t.value}),o.push(...k(e[0].dims,n));let a=["rank"],u=o=>{let a=C("output",e[0].dataType,n.length),u=A("x",e[0].dataType,i.length),l=u.type.value,d=oA(a,i.length,t),p=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return 0===t.mode&&p.push({name:"constant_value",type:s?l:"f32"}),`
            ${o.registerUniforms(p).declareVariables(u,a)}
            ${o.mainStart()}
            ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${a.offsetToIndices("global_idx")};

            var value = ${l}(0);
            ${d}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(S.size(n)/64)},programUniforms:o}),getShaderSource:u}},aA=(e,t)=>{if(!(e.length>1))return t;{let n=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?10===e[2].dataType?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,s=new Int32Array(2*o).fill(0);if(e.length>=4){let t=e[3].getBigInt64Array();for(let e=0;e<t.length;e++)s[Number(t[e])]=Number(n[e]),s[Number(t[e])+o]=Number(n[e+t.length])}else n.forEach((e,t)=>s[Number(t)]=Number(e));let a=[];return s.forEach(e=>a.push(e)),{mode:t.mode,value:i,pads:a}}},f_=(e,t)=>{Y$(e.inputs);let n=aA(e.inputs,t);e.compute(iA(e.inputs,n),{inputs:[0]})}}),C_=$(()=>{"use strict";qe(),Z(),ne(),oe(),ea=e=>{if(te.webgpu.validateInputContent&&(!e||1!==e.length))throw Error("Pool ops requires 1 input.")},m_=(e,t,n)=>{let i="NHWC"===t.format,o=e.dims.slice();i&&o.splice(1,0,o.pop());let s=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),u=t.strides.slice(),l=s?t.dilations.slice():[],d=t.pads.slice();ar.adjustPoolAttributes(n,o,a,u,l,d);let p=ar.computePoolOutputShape(n,o,u,l,a,d,t.autoPad),c=Object.assign({},t);s?Object.assign(c,{kernelShape:a,strides:u,pads:d,dilations:l,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:a,strides:u,pads:d,cacheKey:t.cacheKey});let h=p.slice();return h.push(h.splice(1,1)[0]),[c,i?h:p]},g_=(e,t)=>{let n="NHWC"===t.format,i=[{type:12,data:S.size(e)},{type:12,data:S.size(t.kernelShape)}],o=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let e=t.kernelShape[t.kernelShape.length-1],n=t.strides[t.strides.length-1],s=t.pads[t.pads.length/2-1],a=t.pads[t.pads.length-1],u=!!(s+a);i.push({type:12,data:e},{type:12,data:n},{type:12,data:s},{type:12,data:a}),o.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let l=!1;if(2===t.kernelShape.length){let e=t.kernelShape[t.kernelShape.length-2],n=t.strides[t.strides.length-2],s=t.pads[t.pads.length/2-2],a=t.pads[t.pads.length-2];l=!!(s+a),i.push({type:12,data:e},{type:12,data:n},{type:12,data:s},{type:12,data:a}),o.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,o,!0,u,l]}{if(n)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let e=S.computeStrides(t.kernelShape);return i.push({type:12,data:e},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:"kernelStrides",type:"u32",length:e.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length}),[i,o,!!t.pads.reduce((e,t)=>e+t),!1,!1]}},b_=(e,t,n,i,o,s,a,u,l,d,p,c)=>{let h="NHWC"===o.format,f=t.type.value,m=C("output",t.type.tensor,i);if(o.kernelShape.length<=2){let i="",d="",g="",b=n-(h?2:1);if(i=p?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
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
              ${a}

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
                ${s}
              }`:`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
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
                  offsets[j] = offset / ${M("uniforms.kernelStrides","j",i)};
                  offset -= offsets[j] * ${M("uniforms.kernelStrides","j",i)};
                }
                offsets[${i-1}] = offset;

                isPad = false;
                for (var j = ${n-i}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${M("uniforms.strides",`j - ${n-i}u`,i)}
                    + offsets[j - ${n-i}u] - ${M("uniforms.pads","j - 2u",p)};
                  ${c}
              }
              ${a}

              output[global_idx] = value;
            }`}},y_=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,sA=e=>`${y_(e)};${e.countIncludePad}`,uA=e=>`${y_(e)};${e.storageOrder};${e.dilations}`,__=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),x_=(e,t,n,i)=>{let[o,s]=m_(t,i,n),a=A("x",t.dataType,t.dims.length),u=a.type.value,l="value += x_val;",d="";o.countIncludePad?d+=`value /= ${u}(uniforms.kernelSize);`:d+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[p,c,h,f,m]=g_(s,o);p.push(...k(t.dims,s));let g=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${h};${f};${m}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(S.size(s)/64)},programUniforms:p}),getShaderSource:e=>b_(e,a,t.dims.length,s.length,o,l,d,0,c,h,f,m)}},w_=e=>{let t=0!==e.count_include_pad,n=__(e);if(0!==n.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...n,cacheKey:""};return{...i,cacheKey:sA(i)}},T_=(e,t)=>{ea(e.inputs),e.compute(x_("AveragePool",e.inputs[0],!1,t))},v_={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},I_=e=>{let t=e.format;return{format:t,...v_,cacheKey:t}},S_=(e,t)=>{ea(e.inputs),e.compute(x_("GlobalAveragePool",e.inputs[0],!0,t))},$_=(e,t,n,i)=>{let[o,s]=m_(t,i,n),a=`
      value = max(x_val, value);
    `,u="",l=A("x",t.dataType,t.dims.length),d=["rank"],[p,c,h,f,m]=g_(s,o);return p.push(...k(t.dims,s)),{name:e,shaderCache:{hint:`${i.cacheKey};${h};${f};${m}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(S.size(s)/64)},programUniforms:p}),getShaderSource:e=>b_(e,l,t.dims.length,s.length,o,a,u,10===t.dataType?-65504:-1e5,c,h,f,m)}},A_=(e,t)=>{ea(e.inputs),e.compute($_("MaxPool",e.inputs[0],!1,t))},P_=e=>{let t=e.storage_order,n=e.dilations,i=__(e);if(0!==t)throw Error("column major storage order is not yet supported for MaxPool");if(0!==i.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:n,...i,cacheKey:""};return{...o,cacheKey:uA(o)}},O_=e=>{let t=e.format;return{format:t,...v_,cacheKey:t}},E_=(e,t)=>{ea(e.inputs),e.compute($_("GlobalMaxPool",e.inputs[0],!0,t))}}),L_=$(()=>{"use strict";Z(),ne(),Ee(),oe(),cA=(e,t)=>{if(e.length<2||e.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===e.length&&e[1].dims===e[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===e.length&&e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(6===e[0].dataType&&e.length>2)throw Error("In the case of dequantizing int32 there is no zero point.");if(0!==e[1].dims.length&&1!==e[1].dims.length&&e[1].dims.length!==e[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((t,n)=>t===e[2].dims[n]).reduce((e,t)=>e&&t,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(0===e[1].dims.length||1===e[1].dims.length&&1===e[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,i)=>i===t.axis||n===e[0].dims[i]).reduce((e,t)=>e&&t,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/i)||t.blockSize>Math.ceil(n/(i-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},dA=(e,t)=>{let n=S.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,o=3===i,s=e[0].dims,a=e[1].dataType,u=S.size(s),l=3===i||2===i,d=l?[Math.ceil(S.size(e[0].dims)/4)]:e[0].dims,p=e[1].dims,c=e.length>2?e[2]:void 0,h=c?l?[Math.ceil(S.size(c.dims)/4)]:c.dims:void 0,f=0===p.length||1===p.length&&1===p[0],m=!1===f&&1===p.length,g=he(u),b=f&&(!l||4===g),y=b?g:1,_=b&&!l?g:1,v=A("input",l?12:i,d.length,_),x=A("scale",a,p.length),w=c?A("zero_point",l?12:i,h.length):void 0,T=C("output",a,s.length,y),I=[v,x];w&&I.push(w);let O=[d,p];c&&O.push(h);let E=[{type:12,data:u/y},{type:12,data:n},{type:12,data:t.blockSize},...k(...O,s)],P=e=>{let t=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${e.registerUniforms(t).declareVariables(...I,T)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${T.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${v.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===y?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${v.getByOffset("global_idx")};`};

          // Set scale input
          ${f?`let scale_value= ${x.getByOffset("0")}`:m?`
            let scale_index = ${T.indicesGet("output_indices","uniforms.axis")};
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
                let zero_point_index = ${T.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${w.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${T.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${w.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${x.indicesToOffset("scale_indices")};
                let zero_point_input = ${w.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${w.getByIndices("scale_indices")};`:`let zero_point_value = ${l?o?"i32":"u32":v.type.value}(0);`};
      // Compute and write output
      ${T.setByOffset("global_idx",`${T.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getShaderSource:P,getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/y/64),y:1,z:1},programUniforms:E})}},D_=(e,t)=>{cA(e.inputs,t),e.compute(dA(e.inputs,t))},k_=e=>J({axis:e.axis,blockSize:e.blockSize})}),N_=$(()=>{"use strict";qe(),Z(),oe(),pA=(e,t,n)=>{let i=e===t,o=e<t&&n<0,s=e>t&&n>0;if(i||o||s)throw Error("Range these inputs' contents are invalid.")},fA=(e,t,n,i)=>{let o=Math.abs(Math.ceil((t-e)/n)),s=[o],a=o,u=[{type:12,data:a},{type:i,data:e},{type:i,data:n},...k(s)],l=e=>{let t=C("output",i,s.length),n=t.type.value,o=[{name:"outputSize",type:"u32"},{name:"start",type:n},{name:"delta",type:n}];return`
        ${e.registerUniforms(o).declareVariables(t)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${n}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u})}},R_=e=>{let t=0,n=0,i=0;6===e.inputs[0].dataType?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):1===e.inputs[0].dataType&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),te.webgpu.validateInputContent&&pA(t,n,i),e.compute(fA(t,n,i,e.inputs[0].dataType),{inputs:[]})}}),B_=$(()=>{"use strict";Z(),ne(),Ee(),oe(),hA=(e,t,n,i)=>{if("none"!==e&&"i32"!==i&&"u32"!==i&&"f32"!==i)throw Error(`Input ${i} is not supported with reduction ${e}.`);let o=`{
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
              }`;switch(e){case"none":return`${t}=${n};`;case"add":return"i32"===i||"u32"===i?`atomicAdd(&${t}, bitcast<${i}>(${n}));`:`
              ${o}bitcast<${i}>(oldValue) + (${n})${s}`;case"max":return"i32"===i||"u32"===i?`atomicMax(&${t}, bitcast<${i}>(${n}));`:`
                ${o}max(bitcast<f32>(oldValue), (${n}))${s}`;case"min":return"i32"===i||"u32"===i?`atomicMin(&${t}, bitcast<${i}>(${n}));`:`${o}min(bitcast<${i}>(oldValue), (${n}))${s}`;case"mul":return`${o}(bitcast<${i}>(oldValue) * (${n}))${s}`;default:throw Error(`Reduction ${e} is not supported.`)}},mA=(e,t)=>{let n=e[0].dims,i=e[1].dims,o=n,s=1,a=Math.ceil(S.sizeToDimension(i,i.length-1)/s),u=i[i.length-1],l=S.sizeFromDimension(n,u),d=[{type:12,data:a},{type:12,data:u},{type:12,data:l},...k(e[1].dims,e[2].dims,o)],p=n=>{let i=A("indices",e[1].dataType,e[1].dims.length),a=A("updates",e[2].dataType,e[2].dims.length,s),u="none"!==t.reduction&&""!==t.reduction?dg("output",e[0].dataType,o.length):C("output",e[0].dataType,o.length,s);return`
      ${n.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(i,a,u)}
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
    ${hA(t.reduction,"output[data_offset + i]","value",u.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:p}},z_=e=>J({reduction:e.reduction}),M_=(e,t)=>{e.compute(mA(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),W_=$(()=>{"use strict";Z(),ne(),Ee(),oe(),gA=(e,t)=>{if(e.every(e=>e>0||(()=>{throw Error("Resize requires scales input values to be positive")})),e.length>0){if("linear"===t.mode){if(2!==e.length&&3!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3])&&(5!==e.length||1!==e[0]||1!==e[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===t.mode&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},bA=(e,t,n)=>{t.every(e=>e>=0&&e<n||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")}));let i=Array(n).fill(1);return t.forEach((t,n)=>i[t]=e[n]),i},yA=(e,t,n,i,o,s)=>{let[a,u,l]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(e=>s.push(e));else if("tf_crop_and_resize"===t.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&1===e[u].dims.length&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(e=>i.push(e)),0!==i.length&&i.length!==d&&n>=18&&i.length!==t.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");gA(i,t),t.axes.length>0&&bA(i,t.axes,d).forEach((e,t)=>i[t]=e)}if(l>0&&e.length>l&&1===e[l].dims.length&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(e=>o.push(Number(e))),0!==o.length&&o.length!==d&&n>=18&&o.length!==t.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(0!==i.length&&i.length!==t.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==o.length&&o.length!==t.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if("u">typeof i&&"u">typeof o&&i.length>0&&o.length>d)throw Error("Resize requires only of scales or sizes to be specified")},V_=(e,t,n,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${n}));
  let fract = ${i}(big % (${n})) / ${i}(${n});
  return whole + fract;
`,_A=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${V_("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${V_("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",xA=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${e} is not supported`)}})()+"}",wA=(e,t,n)=>{let i=Array(n).fill(0).concat(Array(n).fill(1)),o=0===e.length?i:e.slice();return t.length>0?(t.forEach((e,s)=>{i[e]=o[s],i[s+n]=o[t.length+s]}),i):o},TA=(e,t,n,i)=>{let o=[];if(n.length>0)if(i.length>0){if(e.forEach(e=>o.push(e)),Math.max(...i)>e.length)throw Error("axes is out of bound");i.forEach((e,t)=>o[e]=n[t])}else n.forEach(e=>o.push(e));else{if(0===t.length)throw Error("Resize requires either scales or sizes.");o=e.map((e,n)=>Math.round(e*t[n]))}return o},vA=(e,t,n)=>{let i=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(e=>t[e]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(e=>t[e]),5e-324):Math.max(...t,5e-324);default:throw Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return n.axes.length>0?(n.axes.forEach(e=>t[e]=i),n.axes.forEach(n=>o[n]=Math.round(e[n]*t[n]))):(t.fill(i,0,t.length),o.forEach((e,n)=>o[n]=Math.round(e*t[n]))),o},IA=(e,t,n,i,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${M("uniforms.scales","i",i)};
        var roi_low = ${M("uniforms.roi","i",o)};
        var roi_hi = ${M("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${M("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${M("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,SA=(e,t,n,i,o,s,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${M("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${M("uniforms.roi","i",s)};
          var roi_hi = ${M("uniforms.roi",`i + ${n.length}`,s)};
          var input_shape_i = ${M("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${M("uniforms.output_shape","i",i.length)};
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
    }`,$A=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${M("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,F_=(e,t,n,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",AA=(e,t,n,i,o)=>{let[s,a,u,l]=2===n.length?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${n[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${F_(e,l,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${a}];
      var col:${d} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${n[a]} - 1) || col < 0 || col > (${n[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[a]} - 1));
      col = max(0, min(col, ${n[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${s}])`:"0"};
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
    }`},PA=(e,t,n,i,o,s,a,u,l,d)=>{let p=2===n.length,c=!0,[h,f]=p?[0,1]:c?[2,3]:[1,2],m=e.type.value,g=a=>{let p=a===h?"row":"col";return`
      fn ${p}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices",a)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[a]},
        ${i[a]}, ${n[a]}, ${s[a]}, ${s[a]} + ${n.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${n[a]} - 1))) {
          return ${l};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${p}: ${m} = originalIdx + ${m}(i);
          if (${p} < 0 || ${p} >= ${n[a]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${p} = max(0, min(${p}, ${n[a]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",a,`u32(${p})`)};
          data[i + 1] = ${a===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
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
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
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
    `},OA=(e,t,n,i,o)=>{let[s,a,u,l,d]=3===n.length?[-1,0,1,2,-1]:[0,2,3,4,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${n[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${F_(e,d,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${a}];
      var height:${p} = originalIndices[${u}];
      var width:${p} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${n[a]} - 1) || height < 0 || height > (${n[u]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[a]} - 1));
      height = max(0, min(height, ${n[u]} - 1));
      width = max(0, min(width, ${n[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${s}])`:"0"};

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
    }`},EA=(e,t,n,i,o,s)=>{let a=e.dims,u=wA(s,t.axes,a.length),l=TA(a,i,o,t.axes),d=i.slice();0===i.length&&(d=a.map((e,t)=>0===e?1:l[t]/e),"stretch"!==t.keepAspectRatioPolicy&&(l=vA(a,d,t)));let p=C("output",e.dataType,l.length),c=A("input",e.dataType,a.length),h=S.size(l),f=a.length===l.length&&a.every((e,t)=>e===l[t]),m="tf_crop_and_resize"===t.coordinateTransformMode,g=t.extrapolationValue,b=c.type.value,y=e=>`
      ${f?"":`
      ${_A(t.coordinateTransformMode,b)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${$A(c,a)};
              ${xA(t.nearestMode,n,b)};
              ${SA(c,p,a,l,d.length,u.length,m)};
              `;case"linear":return`
              ${IA(p,a,l,d.length,u.length)};
              ${(()=>{if(2===a.length||4===a.length)return`${AA(c,p,a,m,g)}`;if(3===a.length||5===a.length)return`${OA(c,p,a,m,g)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===a.length||4===a.length)return`${PA(c,p,a,l,d,u,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
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
                }`;case"linear":return`output[global_idx] = ${2===a.length||4===a.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${d.length>0?"cubic"===t.mode?d:d.length:""}|${o.length>0?o:""}|${u.length>0?u:""}|${f}|${"nearest"===t.mode?a.length:a}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:d},{type:1,data:u},...k(a,l)]})}},CA=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},G_=(e,t)=>{let n=[],i=[],o=[],s=CA(e);if(0!==t.antialias)throw Error("Only default value (0) for Antialias attribute is supported");yA(e.inputs,t,s,n,i,o),e.compute(EA(e.inputs[0],t,s,n,i,o),{inputs:[0]})},U_=e=>{let t=e.antialias,n=e.axes,i=e.coordinateTransformMode,o=e.cubicCoeffA,s=0!==e.excludeOutside,a=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,d=""===e.nearestMode?"simple":e.nearestMode;return J({antialias:t,axes:n,coordinateTransformMode:i,cubicCoeffA:o,excludeOutside:s,extrapolationValue:a,keepAspectRatioPolicy:u,mode:l,nearestMode:d})}}),q_=$(()=>{"use strict";Z(),ne(),oe(),DA=e=>{if(!e||e.length<3)throw Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],i=e[2];if(t.dataType!==n.dataType||t.dataType!==i.dataType)throw Error("All inputs must have the same data type");if(3!==t.dims.length&&2!==t.dims.length)throw Error("Input must be 2D or 3D");if(3!==n.dims.length&&2!==n.dims.length)throw Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==s)throw Error("Skip must have the same sequence length as input");if(1!==i.dims.length)throw Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==o)throw Error("Gamma must have the same hidden size as input");if(e.length>3){let t=e[3];if(1!==t.dims.length)throw Error("Beta must be 1D");if(t.dims[t.dims.length-1]!==o)throw Error("Beta must have the same hidden size as input")}if(e.length>4){let t=e[4];if(1!==t.dims.length)throw Error("Bias must be 1D");if(t.dims[t.dims.length-1]!==o)throw Error("Bias must have the same hidden size as input")}},kA=(e,t,n,i)=>{let o=t.simplified,s=e[0].dims,a=S.size(s),u=s,l=a,d=s.slice(-1)[0],p=i?s.slice(0,-1).concat(1):[],c=!o&&e.length>3,h=e.length>4,f=i&&n>1,m=i&&n>2,g=n>3,b=64,y=he(d),_=[{type:12,data:l},{type:12,data:y},{type:12,data:d},{type:1,data:t.epsilon}],v=t=>{let n=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],i=[A("x",e[0].dataType,e[0].dims,y),A("skip",e[1].dataType,e[1].dims,y),A("gamma",e[2].dataType,e[2].dims,y)];c&&i.push(A("beta",e[3].dataType,e[3].dims,y)),h&&i.push(A("bias",e[4].dataType,e[4].dims,y)),i.push(C("output",e[0].dataType,u,y)),f&&i.push(C("mean_output",1,p)),m&&i.push(C("inv_std_output",1,p)),g&&i.push(C("input_skip_bias_sum",e[0].dataType,u,y));let s=ve(e[0].dataType),a=ve(1,y);return`

      ${t.registerUniforms(n).declareVariables(...i)}
      var<workgroup> sum_shared : array<${a}, ${b}>;
      var<workgroup> sum_squared_shared : array<${a}, ${b}>;

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
          let bias_value = ${h?"bias[offset1d + i]":s+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${g?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${ur(s,y,"value")};
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
        let mean = ${$t("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${$t("square_sum",y)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${s}(mean)`}) *
            ${s}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},x=[{dims:u,dataType:e[0].dataType}];return n>1&&x.push({dims:p,dataType:1}),n>2&&x.push({dims:p,dataType:1}),n>3&&x.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${f};${m};${g}`,inputDependencies:e.map((e,t)=>"type")},getShaderSource:v,getRunData:()=>({outputs:x,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:_})}},H_=(e,t)=>{DA(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(kA(e.inputs,t,e.outputCount,!1),{outputs:n})}}),Z_=$(()=>{"use strict";Z(),ne(),Ee(),oe(),LA=(e,t)=>{if(!e||e.length<1)throw Error("too few inputs");if(0!==t.axes.length){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw Error("starts and ends must have the same length");e.slice(1).forEach((t,n)=>{if(6!==e[n+1].dataType&&7!==e[n+1].dataType)throw Error(`Input ${n} must be an array of int32 or int64`)})},ta=(e,t)=>{let n=[];if(e.length>t)if(7===e[t].dataType)e[t].getBigInt64Array().forEach(e=>n.push(Number(e)));else if(6===e[t].dataType)e[t].getInt32Array().forEach(e=>n.push(Number(e)));else throw Error(`Input ${t} must be an array of int32 or int64`);return n},RA=(e,t)=>{if(!(e.length>1))return t;{let t=ta(e,1),n=ta(e,2),i=ta(e,3);return 0===i.length&&(i=[...Array(e[0].dims.length).keys()]),J({starts:t,ends:n,axes:i})}},j_=(e,t,n,i,o)=>{let s=e;return e<0&&(s+=n[i[t]]),o[t]<0?Math.max(0,Math.min(s,n[i[t]]-1)):Math.max(0,Math.min(s,n[i[t]]))},NA=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${M("uniforms.input_shape","i",n.length)};
            let steps_i = ${M("uniforms.steps","i",n.length)};
            let signs_i = ${M("uniforms.signs","i",n.length)};
            let starts_i = ${M("uniforms.starts","i",n.length)};
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
      }`,zA=(e,t)=>{let n=e[0].dims,i=S.size(n),o=t.axes.length>0?S.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],s=ta(e,4);s.forEach(e=>0!==e||(()=>{throw Error("step cannot be 0")})),0===s.length&&(s=Array(o.length).fill(1));let a=t.starts.map((e,t)=>j_(e,t,n,o,s)),u=t.ends.map((e,t)=>j_(e,t,n,o,s));if(o.length!==a.length||o.length!==u.length)throw Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let e=0;e<n.length;++e)o.includes(e)||(a.splice(e,0,0),u.splice(e,0,n[e]),s.splice(e,0,1));let l=s.map(e=>Math.sign(e));s.forEach((e,t,n)=>{if(e<0){let i=(u[t]-a[t])/e,o=a[t],l=o+i*s[t];a[t]=l,u[t]=o,n[t]=-e}});let d=n.slice(0);o.forEach((e,t)=>{d[e]=Math.ceil((u[e]-a[e])/s[e])});let p={dims:d,dataType:e[0].dataType},c=C("output",e[0].dataType,d.length),h=A("input",e[0].dataType,e[0].dims.length),f=S.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:s.length}],g=[{type:12,data:f},{type:12,data:a},{type:6,data:l},{type:12,data:s},...k(e[0].dims,d)],b=e=>`
      ${e.registerUniforms(m).declareVariables(h,c)}
        ${NA(h,c,n)}
        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${a.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}},K_=(e,t)=>{LA(e.inputs,t);let n=RA(e.inputs,t);e.compute(zA(e.inputs,n),{inputs:[0]})},X_=e=>{let t=e.starts,n=e.ends,i=e.axes;return J({starts:t,ends:n,axes:i})}}),Y_=$(()=>{"use strict";Z(),ne(),Ee(),In(),oe(),MA=e=>{if(!e||1!==e.length)throw Error("Softmax op requires 1 input.")},BA=(e,t)=>{let n=e.inputs[0],i=n.dims,o=S.size(i),s=i.length,a=S.normalizeAxis(t.axis,s),u=a<i.length-1,l,d=[];u?((d=Array.from({length:s},(e,t)=>t))[a]=s-1,d[s-1]=a,l=e.compute(Fe(n,d),{inputs:[n],outputs:[-1]})[0]):l=n;let p=l.dims,c=p[s-1],h=o/c,f=he(c),m=c/f,g=64;1===h&&(g=256);let b=(e,t)=>4===t?`max(max(${e}.x, ${e}.y), max(${e}.z, ${e}.w))`:2===t?`max(${e}.x, ${e}.y)`:3===t?`max(max(${e}.x, ${e}.y), ${e}.z)`:e,y=A("x",l.dataType,l.dims,f),_=C("result",l.dataType,l.dims,f),v=y.type.value,x="f32"===ve(l.dataType)?`var threadMax = ${v}(-3.4028234663852886e+38f);`:`var threadMax = ${v}(-65504.0h);`,w=e=>`
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
          rowSumShared = ${v}(${$t("threadShared[0]",f)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${v}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,T=e.compute({name:"Softmax",shaderCache:{hint:`${f};${g}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:p,dataType:l.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:m}]}),getShaderSource:w},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(Fe(T,d),{inputs:[T]})},J_=(e,t)=>{MA(e.inputs),BA(e,t)},Q_=e=>J({axis:e.axis})}),nx=$(()=>{"use strict";Z(),ne(),oe(),ex=e=>Array.from(e.getBigInt64Array(),Number),VA=e=>{if(!e||2!==e.length)throw Error("Tile requires 2 inputs.");if(1!==e[0].dataType&&10!==e[0].dataType&&6!==e[0].dataType&&12!==e[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==e[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==e[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(ex(e[1]).length!==e[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},FA=(e,t)=>{let n=[];for(let i=0;i<e.length;++i)n.push(e[i]*t[i]);return n},GA=(e,t)=>{let n=e[0].dims,i=t??ex(e[1]),o=FA(n,i),s=S.size(o),a=e[0].dataType,u=A("input",a,n.length),l=C("output",a,o.length);return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...k(e[0].dims,o)]}),getShaderSource:e=>`
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
    }`}},tx=e=>{VA(e.inputs),e.compute(GA(e.inputs),{inputs:[0]})}}),ox=$(()=>{"use strict";Z(),ne(),oe(),UA=(e,t,n,i,o)=>{let s=C("output_data",o,n.length,4),a=A("a_data",t[1].dataType,t[1].dims.length,4),u=A("b_data",t[2].dataType,t[2].dims.length,4),l=A("c_data",t[0].dataType,t[0].dims.length,4),d,p=(e,t,n)=>`select(${t}, ${e}, ${n})`;if(i){let e=(e,t,n="")=>{let i=`a_data[index_a${t}][component_a${t}]`,o=`b_data[index_b${t}][component_b${t}]`,d=`bool(c_data[index_c${t}] & (0xffu << (component_c${t} * 8)))`;return`
            let output_indices${t} = ${s.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offset_a${t} = ${a.broadcastedIndicesToOffset(`output_indices${t}`,s)};
            let offset_b${t} = ${u.broadcastedIndicesToOffset(`output_indices${t}`,s)};
            let offset_c${t} = ${l.broadcastedIndicesToOffset(`output_indices${t}`,s)};
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
          `}else d=s.setByOffset("global_idx",p(a.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,a,u,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},WA=e=>{let t=e[1].dims,n=e[2].dims,i=e[0].dims,o=e[1].dataType,s=!(S.areEqual(t,n)&&S.areEqual(n,i)),a=t,u=S.size(t);if(s){let e=gn.calcShape(gn.calcShape(t,n,!1),i,!1);if(!e)throw Error("Can't perform where op on the given tensors");a=e,u=S.size(a)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:t=>UA(t,e,a,s,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...k(i,t,n,a)]})}},rx=e=>{e.compute(WA(e.inputs))}}),ax=$(()=>{"use strict";Vg(),Ui(),Ug(),Hg(),Eb(),Fb(),Wb(),ay(),fy(),gy(),_y(),Iy(),Ay(),Oy(),Dy(),Ry(),My(),Fy(),Wy(),jy(),n_(),i_(),s_(),l_(),p_(),ml(),h_(),C_(),L_(),N_(),B_(),Fi(),W_(),yl(),q_(),Z_(),Y_(),bl(),nx(),In(),Hi(),ox(),ix=new Map([["Abs",[qg]],["Acos",[jg]],["Acosh",[Kg]],["Add",[Cb]],["ArgMax",[Bg,nl]],["ArgMin",[Mg,nl]],["Asin",[Xg]],["Asinh",[Zg]],["Atan",[Jg]],["Atanh",[Qg]],["Attention",[Fg]],["AveragePool",[T_,w_]],["BatchNormalization",[Gg]],["BiasAdd",[Wg]],["BiasSplitGelu",[Ob]],["Cast",[eb,Yg]],["Ceil",[nb]],["Clip",[tb]],["Concat",[Gb,Ub]],["Conv",[dl,cl]],["ConvTranspose",[py,cy]],["Cos",[rb]],["Cosh",[ob]],["CumSum",[hy,my]],["DepthToSpace",[by,yy]],["DequantizeLinear",[D_,k_]],["Div",[Db]],["Einsum",[Ty,vy]],["Elu",[ib,to]],["Equal",[kb]],["Erf",[ab]],["Exp",[sb]],["Expand",[$y]],["FastGelu",[Py]],["Floor",[ub]],["FusedConv",[dl,cl]],["Gather",[Cy,Ey]],["GatherElements",[Vy,By]],["GatherBlockQuantized",[Ny,zy]],["GatherND",[ky,Ly]],["Gelu",[lb]],["Gemm",[Uy,Gy]],["GlobalAveragePool",[S_,I_]],["GlobalMaxPool",[E_,O_]],["Greater",[zb]],["GreaterOrEqual",[Bb]],["GridSample",[Hy,qy]],["GroupQueryAttention",[t_]],["HardSigmoid",[bb,gb]],["InstanceNormalization",[o_]],["LayerNormalization",[a_]],["LeakyRelu",[cb,to]],["Less",[Mb]],["LessOrEqual",[Vb]],["Log",[$b]],["MatMul",[u_]],["MatMulNBits",[c_,d_]],["MaxPool",[A_,P_]],["Mul",[Lb]],["MultiHeadAttention",[Zy,Xy]],["Neg",[pb]],["Not",[db]],["Pad",[f_]],["Pow",[Rb]],["QuickGelu",[Ab,to]],["Range",[R_]],["Reciprocal",[fb]],["ReduceMin",[Dg]],["ReduceMean",[Ag]],["ReduceMax",[Cg]],["ReduceSum",[Lg]],["ReduceProd",[kg]],["ReduceL1",[Pg]],["ReduceL2",[Og]],["ReduceLogSum",[Ng]],["ReduceLogSumExp",[Eg]],["ReduceSumSquare",[Rg]],["Relu",[hb]],["Resize",[G_,U_]],["RotaryEmbedding",[Yy]],["ScatterND",[M_,z_]],["Sigmoid",[mb]],["Sin",[yb]],["Sinh",[_b]],["Slice",[K_,X_]],["SkipLayerNormalization",[H_]],["Split",[Jy,Qy]],["Sqrt",[xb]],["Softmax",[J_,Q_]],["Sub",[Nb]],["Tan",[wb]],["Tanh",[vb]],["ThresholdedRelu",[Sb,to]],["Tile",[tx]],["Transpose",[hg,mg]],["Where",[rx]]])}),sx=$(()=>{"use strict";qe(),mn(),oe(),na=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,i,o){it(e.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let u=[];for(let e of t)u.push({binding:u.length,resource:{buffer:e.buffer}});for(let e of n)u.push({binding:u.length,resource:{buffer:e.buffer}});o&&u.push({binding:u.length,resource:o});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if("capturing"===this.backend.sessionStatus){let t={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(t)}a.setPipeline(e.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...i),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Qe(e.programInfo.name)}dispose(){}build(e,t){it(e.name);let n=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(e=>{n.features.has(e.feature)&&i.push(`enable ${e.extension};`)});let o=pg(t,this.backend.device.limits),s=e.getShaderSource(o),a=`${i.join(`
`)}
${o.additionalImplementations}
${s}`,u=n.createShaderModule({code:a,label:e.name});ie("verbose",()=>`[WebGPU] ${e.name} shader code: ${a}`);let l=n.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Qe(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:o.variablesInfo}}normalizeDispatchGroupSize(e){let t="number"==typeof e?e:e.x,n="number"==typeof e?1:e.y||1,i="number"==typeof e?1:e.z||1,o=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=o&&n<=o&&i<=o)return[t,n,i];let s=t*n*i,a=Math.ceil(Math.sqrt(s));if(!(a>o))return[a,a,1];if((a=Math.ceil(Math.cbrt(s)))>o)throw Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}}}),ux={};dr(ux,{WebGpuBackend:()=>xl});var HA,qA,_l,xl,lx=$(()=>{"use strict";qe(),Z(),mn(),Wu(),cg(),ax(),sx(),HA=(e,t)=>{if(t.length!==e.length)throw Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let i=0;i<e.length;++i){let o=e[i].dataType;switch(t[i]){case"none":n.push("");break;case"type":n.push(`${o}`);break;case"rank":{let t=e[i].dims.length;n.push(`${o};${t}`);break}case"dims":{let t=e[i].dims.join(",");n.push(`${o};${t}`);break}default:throw Error(`unsupported input dependency: ${t[i]}`)}}return n.join("|")},qA=(e,t,n)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+n+`:${HA(t,e.shaderCache?.inputDependencies??Array(t.length).fill("dims"))}`},_l=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},xl=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},o=e=>t.features.has(e)&&n.push(e)&&!0;o("chromium-experimental-timestamp-query-inside-passes")||o("timestamp-query"),o("shader-f16"),o("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new _l(t.info||await t.requestAdapterInfo()),this.gpuDataManager=lg(this),this.programManager=new na(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ci(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){"u">typeof this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};"at-passes"===this.queryType&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let e;this.commandEncoder&&(it(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),e=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let e=0;e<t.length/2;e++){let i=n[e],o=i.kernelId,s=this.kernels.get(o),a=s.kernelType,u=s.kernelName,l=i.programName,d=i.inputTensorViews,p=i.outputTensorViews,c=t[2*e],h=t[2*e+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=c);let f=Number(c-this.queryTimeBase),m=Number(h-this.queryTimeBase);if(!Number.isSafeInteger(f)||!Number.isSafeInteger(m))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:d.map(e=>({dims:e.dims,dataType:hn(e.dataType)})),outputsMetadata:p.map(e=>({dims:e.dims,dataType:hn(e.dataType)})),kernelId:o,kernelType:a,kernelName:u,programName:l,startTime:f,endTime:m});else{let e="";d.forEach((t,n)=>{e+=`input[${n}]: [${t.dims}] | ${hn(t.dataType)}, `});let t="";p.forEach((e,n)=>{t+=`output[${n}]: [${e.dims}] | ${hn(e.dataType)}, `}),console.log(`[profiling] kernel "${o}|${a}|${u}|${l}" ${e}${t}start time: ${f} ns, execution time: ${m-f} ns`)}po("GPU",`${l}::${c}::${h}`)}e.unmap(),this.pendingQueries.delete(e)}),Qe())}run(e,t,n,i,o,s){let a;it(e.name);let u=[];for(let e=0;e<t.length;++e){let n=t[e].data;if(0===n)continue;let i=this.gpuDataManager.get(n);if(!i)throw Error(`no GPU data for input: ${n}`);u.push(i)}let{outputs:l,dispatchGroup:d,programUniforms:p}=e.getRunData(t),c=0===n.length?l.map((e,t)=>t):n;if(c.length!==l.length)throw Error(`Output size ${c.length} must be equal to ${l.length}.`);let h=[],f=[];for(let e=0;e<l.length;++e){if(!Number.isInteger(c[e])||c[e]<-3||c[e]>=s)throw Error(`Invalid output index: ${c[e]}`);if(-3===c[e])continue;let t=-1===c[e],n=-2===c[e],a=t||n?o(l[e].dataType,l[e].dims):i(c[e],l[e].dataType,l[e].dims);if(h.push(a),0===a.data)continue;let u=this.gpuDataManager.get(a.data);if(!u)throw Error(`no GPU data for output: ${a.data}`);if(t&&this.temporaryData.push(u),n){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(u)}f.push(u)}if(u.length!==t.length||f.length!==h.length){if(0===f.length)return Qe(e.name),h;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(p){let e=0,t=[];p.forEach(n=>{let i="number"==typeof n.data?[n.data]:n.data;if(0===i.length)return;let o=10===n.type?2:4,s,a;10===n.type?(a=i.length>4?16:i.length>2?8:i.length*o,s=i.length>4?16:o*i.length):(a=i.length<=2?i.length*o:16,s=16),e=Math.ceil(e/a)*a,t.push(e);let u=10===n.type?8:4;e+=i.length>4?Math.ceil(i.length/u)*s:i.length*o});let n=new ArrayBuffer(e=16*Math.ceil(e/16));p.forEach((e,i)=>{let o=t[i],s="number"==typeof e.data?[e.data]:e.data;if(6===e.type)new Int32Array(n,o,s.length).set(s);else if(12===e.type)new Uint32Array(n,o,s.length).set(s);else if(10===e.type)new Uint16Array(n,o,s.length).set(s);else if(1===e.type)new Float32Array(n,o,s.length).set(s);else throw Error(`Unsupported uniform type: ${hn(e.type)}`)});let i=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(i.buffer,0,n,0,e),this.gpuDataManager.release(i.id),a={offset:0,size:e,buffer:i.buffer}}let m=this.programManager.normalizeDispatchGroupSize(d),g=qA(e,t,1===m[1]&&1===m[2]),b=this.programManager.getArtifact(g);if(b||(b=this.programManager.build(e,m),this.programManager.setArtifact(g,b),ie("info",()=>`[artifact] key: ${g}, programName: ${e.name}`)),p&&b.uniformVariablesInfo){if(p.length!==b.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${b.uniformVariablesInfo.length}, got ${p.length} in program "${b.programInfo.name}".`);for(let e=0;e<p.length;e++){let t=p[e],n=t.type,i="number"==typeof t.data?1:t.data.length,[o,s]=b.uniformVariablesInfo[e];if(n!==o||i!==s)throw Error(`Uniform variable ${e} mismatch: expect type ${o} with size ${s}, got type ${n} with size ${i} in program "${b.programInfo.name}".`)}}if(ie("info",()=>`[ProgramManager] run "${e.name}" (key=${g}) with ${m[0]}x${m[1]}x${m[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let e={kernelId:this.currentKernelId,programName:b.programInfo.name,inputTensorViews:t,outputTensorViews:h};this.pendingKernels.push(e),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(b,u,f,m,a),Qe(e.name),h}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,i){let o=ix.get(e);if(!o)throw Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:i,kernelEntry:o[0],attributes:[o[1],n]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let e of t)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let i=this.kernels.get(e);if(!i)throw Error(`kernel not created: ${e}`);let o=i.kernelType,s=i.kernelName,a=i.kernelEntry,u=i.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${o}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),ie("info",()=>`[WebGPU] Start to run kernel "[${o}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(t,u[1]),0}catch(e){return n.push(Promise.resolve(`[WebGPU] Kernel "[${o}] ${s}" failed. ${e}`)),1}finally{for(let e of(l&&n.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${o}] ${s}": ${e.message}`:null)),this.temporaryData))this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,i){let o=this.sessionExternalDataMapping.get(e);o||(o=new Map,this.sessionExternalDataMapping.set(e,o));let s=o.get(t),a=this.gpuDataManager.registerExternalBuffer(n,i,s);return o.set(t,[a,n]),a}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let i=await Zu(this,e,t);return ki(i.buffer,n)}}writeTimestamp(e){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ie("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ie("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ie("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let i=0;i<n;i++){let n=this.getComputePassEncoder(),o=e[i];this.writeTimestamp(2*this.pendingDispatchNumber),n.setPipeline(o.computePipeline),n.setBindGroup(0,o.bindGroup),n.dispatchWorkgroups(...o.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),cx={};dr(cx,{init:()=>jA});var io,wl,jA,KA,yi,_i,lr,XA,px,Jr,xi,wi,fx,Ti,vi,Ii,cr,_t,ao,oa,ia,ra,Tl,vl,Pr,Or,JA,hx,mx,gx,bx,yx,_x,xx,wx,QA,aa,dx=$(()=>{"use strict";Z(),mn(),ne(),ig(),io=class e{constructor(e,t,n,i){this.module=e,this.dataType=t,this.data=n,this.dims=i}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let e=S.size(this.dims);return 0===e?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let e=S.size(this.dims);return 0===e?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let e=S.size(this.dims);return 0===e?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let e=S.size(this.dims);return 0===e?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(t){if(S.size(t)!==S.size(this.dims))throw Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},wl=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,o=n/e.PTR_SIZE,s=4===i?"i32":"i64";this.opKernelContext=Number(e.getValue(i*o++,s));let a=Number(e.getValue(i*o++,s));this.outputCount=Number(e.getValue(i*o++,s)),this.customDataOffset=Number(e.getValue(i*o++,"*")),this.customDataSize=Number(e.getValue(i*o++,s));let u=[];for(let t=0;t<a;t++){let t=Number(e.getValue(i*o++,s)),n=Number(e.getValue(i*o++,"*")),a=Number(e.getValue(i*o++,s)),l=[];for(let t=0;t<a;t++)l.push(Number(e.getValue(i*o++,s)));u.push(new io(e,t,n,l))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let n=t?.inputs?.map(e=>"number"==typeof e?this.inputs[e]:e)??this.inputs,i=t?.outputs??[],o=(e,t,n)=>new io(this.module,t,this.output(e,n),n),s=(e,t)=>{let n=Vn(e,t);if(!n)throw Error(`Unsupported data type: ${e}`);let i=n>0?this.backend.gpuDataManager.create(n).id:0;return new io(this.module,e,i,t)};return this.backend.run(e,n,i,o,s,this.outputCount)}output(e,t){let n=this.module.stackSave();try{let n=this.module.PTR_SIZE,i=4===n?"i32":"i64",o=this.module.stackAlloc((1+t.length)*n);this.module.setValue(o,t.length,i);for(let e=0;e<t.length;e++)this.module.setValue(o+n*(e+1),t[e],i);return this.module._JsepOutput(this.opKernelContext,e,o)}catch(n){throw Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${n}`)}finally{this.module.stackRestore(n)}}},jA=async(e,t,n,i)=>{let o=t.jsepInit;if(!o)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===e){let e=new(lx(),Er(ux)).WebGpuBackend;await e.initialize(n,i),o("webgpu",[e,t=>e.alloc(Number(t)),t=>e.free(t),(n,i,o,s=!1)=>{if(s)ie("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(n)}, dst=${Number(i)}, size=${Number(o)}`),e.memcpy(Number(n),Number(i));else{ie("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(n)}, gpuDataId=${Number(i)}, size=${Number(o)}`);let s=t.HEAPU8.subarray(Number(n>>>0),Number(n>>>0)+Number(o));e.upload(Number(i),s)}},async(n,i,o)=>{ie("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${n}, dataOffset=${i}, size=${o}`),await e.download(Number(n),()=>t.HEAPU8.subarray(Number(i)>>>0,Number(i+o)>>>0))},(n,i,o)=>e.createKernel(n,Number(i),o,t.UTF8ToString(t._JsepGetNodeName(Number(i)))),t=>e.releaseKernel(t),(n,i,o,s)=>{ie("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${o}, kernel=${n}, contextDataOffset=${i}`);let a=new wl(t,e,Number(i));return e.computeKernel(Number(n),a,s)},()=>e.captureBegin(),()=>e.captureEnd(),()=>e.replay()])}else{let e=new zi(n);o("webnn",[e,()=>e.reserveTensorId(),t=>e.releaseTensorId(t),async(t,n,i,o,s)=>e.ensureTensor(t,n,i,o,s),(t,n)=>{e.uploadTensor(t,n)},async(t,n)=>e.downloadTensor(t,n),(t,n)=>e.registerMLContext(t,n),!!n.trace])}}}),zu=$(()=>{"use strict";qe(),qm(),Km(),Z(),Mn(),Ai(),Gu(),KA=(e,t)=>{0!==we()._OrtInit(e,t)&&fe("Can't initialize onnxruntime.")},yi=async e=>{KA(e.wasm.numThreads,Yr(e.logLevel))},_i=async(e,t)=>{we().asyncInit?.();let n=e.webgpu.adapter;if("webgpu"===t){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(n){if("object"!=typeof n.limits||"object"!=typeof n.features||"function"!=typeof n.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=e.webgpu.powerPreference;if(void 0!==t&&"low-power"!==t&&"high-performance"!==t)throw Error(`Invalid powerPreference setting: "${t}"`);let i=e.webgpu.forceFallbackAdapter;if(void 0!==i&&"boolean"!=typeof i)throw Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(!(n=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:i})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===t&&(typeof navigator>"u"||!navigator.ml))throw Error("WebNN is not supported in current environment");{let i=(dx(),Er(cx)).init;"webgpu"===t&&await i("webgpu",we(),e,n),"webnn"===t&&await i("webnn",we(),e)}},lr=new Map,XA=e=>{let t=we(),n=t.stackSave();try{let n=t.PTR_SIZE,i=t.stackAlloc(2*n);0!==t._OrtGetInputOutputCount(e,i,i+n)&&fe("Can't get session input/output count.");let o=4===n?"i32":"i64";return[Number(t.getValue(i,o)),Number(t.getValue(i+n,o))]}finally{t.stackRestore(n)}},px=(e,t)=>{let n=we(),i=n.stackSave(),o=0;try{let i=n.PTR_SIZE,s=n.stackAlloc(2*i);0!==n._OrtGetInputOutputMetadata(e,t,s,s+i)&&fe("Can't get session input/output metadata.");let a=Number(n.getValue(s,"*"));o=Number(n.getValue(s+i,"*"));let u=n.HEAP32[o/4];if(0===u)return[a,0];let l=n.HEAPU32[o/4+1],d=[];for(let e=0;e<l;e++){let t=Number(n.getValue(o+8+e*i,"*"));d.push(0!==t?n.UTF8ToString(t):Number(n.getValue(o+8+(e+l)*i,"*")))}return[a,u,d]}finally{n.stackRestore(i),0!==o&&n._OrtFree(o)}},Jr=e=>{let t=we(),n=t._malloc(e.byteLength);if(0===n)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},xi=async(e,t)=>{let n,i,o=we();Array.isArray(e)?[n,i]=e:e.buffer===o.HEAPU8.buffer?[n,i]=[e.byteOffset,e.byteLength]:[n,i]=Jr(e);let s=0,a=0,u=0,l=[],d=[],p=[];try{if([a,l]=await jm(t),t?.externalData&&o.mountExternalData){let e=[];for(let n of t.externalData){let t="string"==typeof n?n:n.path;e.push(eo("string"==typeof n?n:n.data).then(e=>{o.mountExternalData(t,e)}))}await Promise.all(e)}for(let e of t?.executionProviders??[])if(("string"==typeof e?e:e.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,"string"!=typeof e){let t=e,n=t?.context,i=t?.gpuDevice,s=t?.deviceType,a=t?.powerPreference;n?o.currentContext=n:i?o.currentContext=await o.webnnCreateMLContext(i):o.currentContext=await o.webnnCreateMLContext({deviceType:s,powerPreference:a})}else o.currentContext=await o.webnnCreateMLContext();break}s=await o._OrtCreateSession(n,i,a),o.webgpuOnCreateSession?.(s),0===s&&fe("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(s,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[e,c]=XA(s),h=!!t?.enableGraphCapture,f=[],m=[],g=[],b=[],y=[];for(let t=0;t<e;t++){let[e,n,i]=px(s,t);0===e&&fe("Can't get an input name."),d.push(e);let a=o.UTF8ToString(e);f.push(a),g.push(0===n?{name:a,isTensor:!1}:{name:a,isTensor:!0,type:hn(n),shape:i})}for(let n=0;n<c;n++){let[i,a,u]=px(s,n+e);0===i&&fe("Can't get an output name."),p.push(i);let l=o.UTF8ToString(i);m.push(l),b.push(0===a?{name:l,isTensor:!1}:{name:l,isTensor:!0,type:hn(a),shape:u});{if(h&&t?.preferredOutputLocation===void 0){y.push("gpu-buffer");continue}let e="string"==typeof t?.preferredOutputLocation?t.preferredOutputLocation:t?.preferredOutputLocation?.[l]??"cpu",n=o.webnnIsGraphOutput;if("cpu"===e&&n&&n(s,l)){y.push("ml-tensor-cpu-output");continue}if("cpu"!==e&&"cpu-pinned"!==e&&"gpu-buffer"!==e&&"ml-tensor"!==e)throw Error(`Not supported preferred output location: ${e}.`);if(h&&"gpu-buffer"!==e)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);y.push(e)}}let _=null;return y.some(e=>"gpu-buffer"===e||"ml-tensor"===e||"ml-tensor-cpu-output"===e)&&(u=o._OrtCreateBinding(s),0===u&&fe("Can't create IO binding."),_={handle:u,outputPreferredLocations:y,outputPreferredLocationsEncoded:y.map(e=>"ml-tensor-cpu-output"===e?"ml-tensor":e).map(e=>Fu(e))}),lr.set(s,[s,d,p,_,h,!1]),[s,f,m,g,b]}catch(e){throw d.forEach(e=>o._OrtFree(e)),p.forEach(e=>o._OrtFree(e)),0!==u&&0!==o._OrtReleaseBinding(u)&&fe("Can't release IO binding."),0!==s&&0!==o._OrtReleaseSession(s)&&fe("Can't release session."),e}finally{o._free(n),0!==a&&0!==o._OrtReleaseSessionOptions(a)&&fe("Can't release session options."),l.forEach(e=>o._free(e)),o.unmountExternalData?.()}},wi=e=>{let t=we(),n=lr.get(e);if(!n)throw Error(`cannot release session. invalid session id: ${e}`);let[i,o,s,a,u]=n;a&&(u&&0!==t._OrtClearBoundOutputs(a.handle)&&fe("Can't clear bound outputs."),0!==t._OrtReleaseBinding(a.handle)&&fe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),o.forEach(e=>t._OrtFree(e)),s.forEach(e=>t._OrtFree(e)),0!==t._OrtReleaseSession(i)&&fe("Can't release session."),lr.delete(e)},fx=async(e,t,n,i,o,s,a=!1)=>{if(!e)return void t.push(0);let u=we(),l=u.PTR_SIZE,d=e[0],p=e[1],c=e[3],h=c,f,m;if("string"===d&&("gpu-buffer"===c||"ml-tensor"===c))throw Error("String tensor is not supported on GPU.");if(a&&"gpu-buffer"!==c)throw Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if("gpu-buffer"===c){let t=e[2].gpuBuffer;m=Vn(Bn(d),p);{let e=u.jsepRegisterBuffer;if(!e)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=e(i,s,t,m)}}else if("ml-tensor"===c){let t=e[2].mlTensor;m=Vn(Bn(d),p);let n=u.webnnRegisterMLTensor;if(!n)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=n(i,t,Bn(d),p)}else{let t=e[2];if(Array.isArray(t)){m=l*t.length,f=u._malloc(m),n.push(f);for(let e=0;e<t.length;e++){if("string"!=typeof t[e])throw TypeError(`tensor data at index ${e} is not a string`);u.setValue(f+e*l,ut(t[e],n),"*")}}else{let e=u.webnnIsGraphInput,s=u.webnnIsGraphOutput;if("string"!==d&&e&&s){let a=u.UTF8ToString(o);if(e(i,a)||s(i,a)){let e=Bn(d);m=Vn(e,p),h="ml-tensor";let n=u.webnnCreateTemporaryTensor,o=u.webnnUploadTensor;if(!n||!o)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let s=await n(i,e,p);o(s,new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),f=s}else m=t.byteLength,f=u._malloc(m),n.push(f),u.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,m),f)}else m=t.byteLength,f=u._malloc(m),n.push(f),u.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,m),f)}}let g=u.stackSave(),b=u.stackAlloc(4*p.length);try{p.forEach((e,t)=>u.setValue(b+t*l,e,4===l?"i32":"i64"));let e=u._OrtCreateTensor(Bn(d),f,m,b,p.length,Fu(h));0===e&&fe(`Can't create tensor for input/output. session=${i}, index=${s}.`),t.push(e)}finally{u.stackRestore(g)}},Ti=async(e,t,n,i,o,s)=>{let a=we(),u=a.PTR_SIZE,l=lr.get(e);if(!l)throw Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],p=l[1],c=l[2],h=l[3],f=l[4],m=l[5],g=t.length,b=i.length,y=0,_=[],v=[],x=[],w=[],T=[],I=a.stackSave(),O=a.stackAlloc(g*u),E=a.stackAlloc(g*u),P=a.stackAlloc(b*u),D=a.stackAlloc(b*u);try{let l;[y,_]=Hm(s),Pn("wasm prepareInputOutputTensor");for(let i=0;i<g;i++)await fx(n[i],v,w,e,p[t[i]],t[i],f);for(let t=0;t<b;t++)await fx(o[t],x,w,e,c[i[t]],g+i[t],f);On("wasm prepareInputOutputTensor");for(let e=0;e<g;e++)a.setValue(O+e*u,v[e],"*"),a.setValue(E+e*u,p[t[e]],"*");for(let e=0;e<b;e++)a.setValue(P+e*u,x[e],"*"),a.setValue(D+e*u,c[i[e]],"*");if(h&&!m){let{handle:n,outputPreferredLocations:s,outputPreferredLocationsEncoded:u}=h;if(p.length!==g)throw Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${p.length}).`);Pn("wasm bindInputsOutputs");for(let i=0;i<g;i++){let o=t[i];await a._OrtBindInput(n,p[o],v[i])!==0&&fe(`Can't bind input[${i}] for session=${e}.`)}for(let t=0;t<b;t++){let l=i[t];o[t]?.[3]?(T.push(x[t]),0!==a._OrtBindOutput(n,c[l],x[t],0)&&fe(`Can't bind pre-allocated output[${t}] for session=${e}.`)):0!==a._OrtBindOutput(n,c[l],0,u[l])&&fe(`Can't bind output[${t}] to ${s[t]} for session=${e}.`)}On("wasm bindInputsOutputs"),lr.set(e,[d,p,c,h,f,!0])}a.jsepOnRunStart?.(d),a.webnnOnRunStart?.(d),l=h?await a._OrtRunWithBinding(d,h.handle,b,P,y):await a._OrtRun(d,E,O,g,D,b,P,y),0!==l&&fe("failed to call OrtRun().");let I=[],N=[];Pn("wasm ProcessOutputTensor");for(let t=0;t<b;t++){let n=Number(a.getValue(P+t*u,"*"));if(n===x[t]||T.includes(x[t])){I.push(o[t]),n!==x[t]&&0!==a._OrtReleaseTensor(n)&&fe("Can't release tensor.");continue}let s=a.stackSave(),l=a.stackAlloc(4*u),d=!1,p,c=0;try{0!==a._OrtGetTensorData(n,l,l+u,l+2*u,l+3*u)&&fe(`Can't access output tensor data on index ${t}.`);let o=4===u?"i32":"i64",s=Number(a.getValue(l,o));c=a.getValue(l+u,"*");let f=a.getValue(l+2*u,"*"),m=Number(a.getValue(l+3*u,o)),g=[];for(let e=0;e<m;e++)g.push(Number(a.getValue(f+e*u,o)));0!==a._OrtFree(f)&&fe("Can't free memory for tensor dims.");let b=g.reduce((e,t)=>e*t,1);p=hn(s);let y=h?.outputPreferredLocations[i[t]];if("string"===p){if("gpu-buffer"===y||"ml-tensor"===y)throw Error("String tensor is not supported on GPU.");let e=[];for(let t=0;t<b;t++){let n=a.getValue(c+t*u,"*"),i=a.getValue(c+(t+1)*u,"*"),o=t===b-1?void 0:i-n;e.push(a.UTF8ToString(n,o))}I.push([p,g,e,"cpu"])}else if("gpu-buffer"===y&&b>0){let e=a.jsepGetBuffer;if(!e)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let t=e(c),i=Vn(s,b);if(void 0===i||!Oi(p))throw Error(`Unsupported data type: ${p}`);d=!0,I.push([p,g,{gpuBuffer:t,download:a.jsepCreateDownloader(t,i,p),dispose:()=>{0!==a._OrtReleaseTensor(n)&&fe("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===y&&b>0){let t=a.webnnEnsureTensor,i=a.webnnIsGraphInputOutputTypeSupported;if(!t||!i)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===Vn(s,b)||!Ei(p))throw Error(`Unsupported data type: ${p}`);if(!i(e,p,!1))throw Error(`preferredLocation "ml-tensor" for ${p} output is not supported by current WebNN Context.`);let o=await t(e,c,s,g,!1);d=!0,I.push([p,g,{mlTensor:o,download:a.webnnCreateMLTensorDownloader(c,p),dispose:()=>{a.webnnReleaseTensorId(c),a._OrtReleaseTensor(n)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===y&&b>0){let e=a.webnnCreateMLTensorDownloader(c,p)(),t=I.length;d=!0,N.push((async()=>{let i=[t,await e];return a.webnnReleaseTensorId(c),a._OrtReleaseTensor(n),i})()),I.push([p,g,[],"cpu"])}else{let e=new(Ir(p))(b);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(a.HEAPU8.subarray(c,c+e.byteLength)),I.push([p,g,e,"cpu"])}}finally{a.stackRestore(s),"string"===p&&c&&a._free(c),d||a._OrtReleaseTensor(n)}}for(let[t,n]of(h&&!f&&(0!==a._OrtClearBoundOutputs(h.handle)&&fe("Can't clear bound outputs."),lr.set(e,[d,p,c,h,f,!1])),await Promise.all(N)))I[t][2]=n;return On("wasm ProcessOutputTensor"),I}finally{a.webnnOnRunEnd?.(d),a.stackRestore(I),v.forEach(e=>a._OrtReleaseTensor(e)),x.forEach(e=>a._OrtReleaseTensor(e)),w.forEach(e=>a._free(e)),0!==y&&a._OrtReleaseRunOptions(y),_.forEach(e=>a._free(e))}},vi=e=>{let t=we(),n=lr.get(e);if(!n)throw Error("invalid session id");let i=n[0],o=t._OrtEndProfiling(i);0===o&&fe("Can't get an profile file name."),t._OrtFree(o)},Ii=e=>{let t=[];for(let n of e){let e=n[2];!Array.isArray(e)&&"buffer"in e&&t.push(e.buffer)}return t}}),Il=$(()=>{"use strict";qe(),zu(),Mn(),gi(),cr=()=>!!te.wasm.proxy&&"u">typeof document,ao=!1,oa=!1,ia=!1,vl=new Map,Pr=(e,t)=>{let n=vl.get(e);n?n.push(t):vl.set(e,[t])},Or=()=>{if(ao||!oa||ia||!_t)throw Error("worker not ready")},JA=e=>{switch(e.data.type){case"init-wasm":ao=!1,e.data.err?(ia=!0,Tl[1](e.data.err)):(oa=!0,Tl[0]()),ra&&(URL.revokeObjectURL(ra),ra=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=vl.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out)}}},hx=async()=>{if(!oa){if(ao)throw Error("multiple calls to 'initWasm()' detected.");if(ia)throw Error("previous call to 'initWasm()' failed.");if(ao=!0,cr())return new Promise((e,t)=>{_t?.terminate(),Gm().then(([n,i])=>{try{(_t=i).onerror=e=>t(e),_t.onmessage=JA,Tl=[e,t];let o={type:"init-wasm",in:te};if(!o.in.wasm.wasmPaths&&n){let e=Si();e&&(o.in.wasm.wasmPaths=e)}_t.postMessage(o),ra=n}catch(e){t(e)}},t)});try{await bi(te.wasm),await yi(te),oa=!0}catch(e){throw ia=!0,e}finally{ao=!1}}},mx=async e=>{if(cr())return Or(),new Promise((t,n)=>{Pr("init-ep",[t,n]);let i={type:"init-ep",in:{epName:e,env:te}};_t.postMessage(i)});await _i(te,e)},gx=async e=>cr()?(Or(),new Promise((t,n)=>{Pr("copy-from",[t,n]);let i={type:"copy-from",in:{buffer:e}};_t.postMessage(i,[e.buffer])})):Jr(e),bx=async(e,t)=>{if(!cr())return xi(e,t);if(t?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return Or(),new Promise((n,i)=>{Pr("create",[n,i]);let o={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),_t.postMessage(o,s)})},yx=async e=>{if(cr())return Or(),new Promise((t,n)=>{Pr("release",[t,n]);let i={type:"release",in:e};_t.postMessage(i)});wi(e)},_x=async(e,t,n,i,o,s)=>{if(!cr())return Ti(e,t,n,i,o,s);if(n.some(e=>"cpu"!==e[3]))throw Error("input tensor on GPU is not supported for proxy.");if(o.some(e=>e))throw Error("pre-allocated output tensor is not supported for proxy.");return Or(),new Promise((o,a)=>{Pr("run",[o,a]);let u=n,l={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:i,options:s}};_t.postMessage(l,Ii(u))})},xx=async e=>{if(cr())return Or(),new Promise((t,n)=>{Pr("end-profiling",[t,n]);let i={type:"end-profiling",in:e};_t.postMessage(i)});vi(e)}}),Tx=$(()=>{"use strict";qe(),Il(),Z(),mi(),Gu(),wx=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${e.location} for ${t()}`)}},QA=e=>{switch(e[3]){case"cpu":return new ot(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Oi(t))throw Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:i,dispose:o}=e[2];return ot.fromGpuBuffer(n,{dataType:t,dims:e[1],download:i,dispose:o})}case"ml-tensor":{let t=e[0];if(!Ei(t))throw Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:i,dispose:o}=e[2];return ot.fromMLTensor(n,{dataType:t,dims:e[1],download:i,dispose:o})}default:throw Error(`invalid data location: ${e[3]}`)}},aa=class{async fetchModelAndCopyToWasmMemory(e){return gx(await eo(e))}async loadModel(e,t){let n;it(),n="string"==typeof e?await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await bx(n,t),Qe()}async dispose(){return yx(this.sessionId)}async run(e,t,n){it();let i=[],o=[];Object.entries(e).forEach(e=>{let t=e[0],n=e[1],s=this.inputNames.indexOf(t);if(-1===s)throw Error(`invalid input '${t}'`);i.push(n),o.push(s)});let s=[],a=[];Object.entries(t).forEach(e=>{let t=e[0],n=e[1],i=this.outputNames.indexOf(t);if(-1===i)throw Error(`invalid output '${t}'`);s.push(n),a.push(i)});let u=i.map((e,t)=>wx(e,()=>`input "${this.inputNames[o[t]]}"`)),l=s.map((e,t)=>e?wx(e,()=>`output "${this.outputNames[a[t]]}"`):null),d=await _x(this.sessionId,o,u,a,l,n),p={};for(let e=0;e<d.length;e++)p[this.outputNames[a[e]]]=s[e]??QA(d[e]);return Qe(),p}startProfiling(){}endProfiling(){xx(this.sessionId)}}}),Ix={};dr(Ix,{OnnxruntimeWebAssemblyBackend:()=>sa,initializeFlags:()=>vx,wasmBackend:()=>YA});var vx,sa,YA,Sx=$(()=>{"use strict";qe(),Il(),Tx(),vx=()=>{("number"!=typeof te.wasm.initTimeout||te.wasm.initTimeout<0)&&(te.wasm.initTimeout=0);let e=te.wasm.simd;if("boolean"!=typeof e&&void 0!==e&&"fixed"!==e&&"relaxed"!==e&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),te.wasm.simd=!1),"boolean"!=typeof te.wasm.proxy&&(te.wasm.proxy=!1),"boolean"!=typeof te.wasm.trace&&(te.wasm.trace=!1),"number"!=typeof te.wasm.numThreads||!Number.isInteger(te.wasm.numThreads)||te.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)te.wasm.numThreads=1;else{let e=typeof navigator>"u"?ua("node:os").cpus().length:navigator.hardwareConcurrency;te.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},YA=new(sa=class{async init(e){vx(),await hx(),await mx(e)}async createInferenceSessionHandler(e,t){let n=new aa;return await n.loadModel(e,t),n}})});qe(),qe(),qe();var tc="1.24.3",DW=ha;{let r=(km(),Er(Dm)).onnxjsBackend;An("webgl",r,-10)}{let r=(Sx(),Er(Ix)).wasmBackend;An("webgpu",r,5),An("webnn",r,5),An("cpu",r,10),An("wasm",r,10)}Object.defineProperty(te.versions,"web",{value:tc,enumerable:!0});export{Dx as InferenceSession,po as TRACE,Pn as TRACE_EVENT_BEGIN,On as TRACE_EVENT_END,it as TRACE_FUNC_BEGIN,Qe as TRACE_FUNC_END,ot as Tensor,DW as default,te as env,An as registerBackend};