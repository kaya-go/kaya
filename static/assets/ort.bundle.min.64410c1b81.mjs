/*! LICENSE: ort.bundle.min.64410c1b81.mjs.LICENSE.txt */
let e;var r=Object.defineProperty,i=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyNames,n=Object.prototype.hasOwnProperty,s,o,u,l,d,p,c,h,f,m,g,y,_,b,$,v,w,x,S,k,T,I,E,z,C,A,O,R,B,N,M,D,P,U=(e=function(e){if("u">typeof require)return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')},"u">typeof require?require:"u">typeof Proxy?new Proxy(e,{get:(e,r)=>("u">typeof require?require:e)[r]}):e),q=(e,r)=>()=>(e&&(r=e(e=0)),r),W=(e,i)=>{for(var a in i)r(e,a,{get:i[a],enumerable:!0})},L=e=>((e,s,o,u)=>{if(s&&"object"==typeof s||"function"==typeof s)for(let l of a(s))n.call(e,l)||l===o||r(e,l,{get:()=>s[l],enumerable:!(u=i(s,l))||u.enumerable});return e})(r({},"__esModule",{value:!0}),e),V=q(()=>{"use strict";s=new Map,o=[],u=(e,r,i)=>{if(r&&"function"==typeof r.init&&"function"==typeof r.createInferenceSessionHandler){let a=s.get(e);if(void 0===a)s.set(e,{backend:r,priority:i});else{if(a.priority>i)return;if(a.priority===i&&a.backend!==r)throw Error(`cannot register backend "${e}" using priority ${i}`)}if(i>=0){let r=o.indexOf(e);-1!==r&&o.splice(r,1);for(let r=0;r<o.length;r++)if(s.get(o[r]).priority<=i)return void o.splice(r,0,e);o.push(e)}return}throw TypeError("not a valid backend")},l=async e=>{let r=s.get(e);if(!r)return"backend not found.";if(r.initialized)return r.backend;if(r.aborted)return r.error;{let i=!!r.initPromise;try{return i||(r.initPromise=r.backend.init(e)),await r.initPromise,r.initialized=!0,r.backend}catch(e){return i||(r.error=`${e}`,r.aborted=!0),r.error}finally{delete r.initPromise}}},d=async e=>{let r=e.executionProviders||[],i=r.map(e=>"string"==typeof e?e:e.name),a=0===i.length?o:i,n,s=[],u=new Set;for(let e of a){let r=await l(e);"string"==typeof r?s.push({name:e,err:r}):(n||(n=r),n===r&&u.add(e))}if(!n)throw Error(`no available backend found. ERR: ${s.map(e=>`[${e.name}] ${e.err}`).join(", ")}`);for(let{name:e,err:r}of s)i.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${r}`);let d=r.filter(e=>u.has("string"==typeof e?e:e.name));return[n,new Proxy(e,{get:(e,r)=>"executionProviders"===r?d:Reflect.get(e,r)})]}}),G=q(()=>{"use strict";V()}),H=q(()=>{"use strict";p="1.24.3"}),F=q(()=>{"use strict";H(),c="warning",Object.defineProperty(h={wasm:{},webgl:{},webgpu:{},versions:{common:p},set logLevel(t){if(void 0!==t){if("string"!=typeof t||-1===["verbose","info","warning","error","fatal"].indexOf(t))throw Error(`Unsupported logging level: ${t}`);c=t}},get logLevel(){return c}},"logLevel",{enumerable:!0})}),j=q(()=>{"use strict";F(),f=h}),K=q(()=>{"use strict";m=(e,r)=>{let i="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);i.width=e.dims[3],i.height=e.dims[2];let a=i.getContext("2d");if(null!=a){let n,s;r?.tensorLayout!==void 0&&"NHWC"===r.tensorLayout?(n=e.dims[2],s=e.dims[3]):(n=e.dims[3],s=e.dims[2]);let o=r?.format!==void 0?r.format:"RGB",u=r?.norm,l,d;void 0===u||void 0===u.mean?l=[255,255,255,255]:"number"==typeof u.mean?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],void 0!==u.mean[3]&&(l[3]=u.mean[3])),void 0===u||void 0===u.bias?d=[0,0,0,0]:"number"==typeof u.bias?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(d[3]=u.bias[3]));let p=s*n,c=0,h=p,f=2*p,m=-1;"RGBA"===o?(c=0,h=p,f=2*p,m=3*p):"RGB"===o?(c=0,h=p,f=2*p):"RBG"===o&&(c=0,f=p,h=2*p);for(let r=0;r<s;r++)for(let i=0;i<n;i++)a.fillStyle="rgba("+(e.data[c++]-d[0])*l[0]+","+(e.data[h++]-d[1])*l[1]+","+(e.data[f++]-d[2])*l[2]+","+(-1===m?255:(e.data[m++]-d[3])*l[3])+")",a.fillRect(i,r,1,1);if("toDataURL"in i)return i.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},g=(e,r)=>{let i="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),a;if(null!=i){let n,s,o;r?.tensorLayout!==void 0&&"NHWC"===r.tensorLayout?(n=e.dims[2],s=e.dims[1],o=e.dims[3]):(n=e.dims[3],s=e.dims[2],o=e.dims[1]);let u=void 0!==r&&void 0!==r.format?r.format:"RGB",l=r?.norm,d,p;void 0===l||void 0===l.mean?d=[255,255,255,255]:"number"==typeof l.mean?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],void 0!==l.mean[3]&&(d[3]=l.mean[3])),void 0===l||void 0===l.bias?p=[0,0,0,0]:"number"==typeof l.bias?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],void 0!==l.bias[3]&&(p[3]=l.bias[3]));let c=s*n;if(void 0!==r&&(void 0!==r.format&&4===o&&"RGBA"!==r.format||3===o&&"RGB"!==r.format&&"BGR"!==r.format))throw Error("Tensor format doesn't match input tensor dims");let h=0,f=1,m=2,g=3,y=0,_=c,b=2*c,$=-1;"RGBA"===u?(y=0,_=c,b=2*c,$=3*c):"RGB"===u?(y=0,_=c,b=2*c):"RBG"===u&&(y=0,b=c,_=2*c),a=i.createImageData(n,s);for(let r=0;r<s*n;h+=4,f+=4,m+=4,g+=4,r++)a.data[h]=(e.data[y++]-p[0])*d[0],a.data[f]=(e.data[_++]-p[1])*d[1],a.data[m]=(e.data[b++]-p[2])*d[2],a.data[g]=-1===$?255:(e.data[$++]-p[3])*d[3]}else throw Error("Can not access image data");return a}}),Q=q(()=>{"use strict";Y(),y=(e,r)=>{if(void 0===e)throw Error("Image buffer must be defined");if(void 0===r.height||void 0===r.width)throw Error("Image height and width must be defined");if("NHWC"===r.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:i,width:a}=r,n=r.norm??{mean:255,bias:0},s,o;s="number"==typeof n.mean?[n.mean,n.mean,n.mean,n.mean]:[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],o="number"==typeof n.bias?[n.bias,n.bias,n.bias,n.bias]:[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let u=void 0!==r.format?r.format:"RGBA",l=void 0!==r.tensorFormat&&void 0!==r.tensorFormat?r.tensorFormat:"RGB",d=i*a,p=new Float32Array("RGBA"===l?4*d:3*d),c=4,h=0,f=1,m=2,g=3,y=0,_=d,b=2*d,$=-1;"RGB"===u&&(c=3,h=0,f=1,m=2,g=-1),"RGBA"===l?$=3*d:"RBG"===l?(y=0,b=d,_=2*d):"BGR"===l&&(b=0,_=d,y=2*d);for(let r=0;r<d;r++,h+=c,m+=c,f+=c,g+=c)p[y++]=(e[h]+o[0])/s[0],p[_++]=(e[f]+o[1])/s[1],p[b++]=(e[m]+o[2])/s[2],-1!==$&&-1!==g&&(p[$++]=(e[g]+o[3])/s[3]);return"RGBA"===l?new z("float32",p,[1,4,i,a]):new z("float32",p,[1,3,i,a])},_=async(e,r)=>{let i="u">typeof HTMLImageElement&&e instanceof HTMLImageElement,a="u">typeof ImageData&&e instanceof ImageData,n="u">typeof ImageBitmap&&e instanceof ImageBitmap,s="string"==typeof e,o,u=r??{},l=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},d=e=>"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext("2d"):null;if(i){let i=l();i.width=e.width,i.height=e.height;let a=d(i);if(null!=a){let i=e.height,n=e.width;if(void 0!==r&&void 0!==r.resizedHeight&&void 0!==r.resizedWidth&&(i=r.resizedHeight,n=r.resizedWidth),void 0!==r){if(u=r,void 0!==r.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=i,u.width=n}else u.tensorFormat="RGBA",u.height=i,u.width=n;a.drawImage(e,0,0),o=a.getImageData(0,0,n,i).data}else throw Error("Can not access image data")}else if(a){let i,a;if(void 0!==r&&void 0!==r.resizedWidth&&void 0!==r.resizedHeight?(i=r.resizedHeight,a=r.resizedWidth):(i=e.height,a=e.width),void 0!==r&&(u=r),u.format="RGBA",u.height=i,u.width=a,void 0!==r){let r=l();r.width=a,r.height=i;let n=d(r);if(null!=n)n.putImageData(e,0,0),o=n.getImageData(0,0,a,i).data;else throw Error("Can not access image data")}else o=e.data}else if(n){if(void 0===r)throw Error("Please provide image config with format for Imagebitmap");let i=l();i.width=e.width,i.height=e.height;let a=d(i);if(null!=a){let r=e.height,i=e.width;return a.drawImage(e,0,0,i,r),o=a.getImageData(0,0,i,r).data,u.height=r,u.width=i,y(o,u)}throw Error("Can not access image data")}else{if(s)return new Promise((r,i)=>{let a=l(),n=d(a);if(!e||!n)return i();let s=new Image;s.crossOrigin="Anonymous",s.src=e,s.onload=()=>{a.width=s.width,a.height=s.height,n.drawImage(s,0,0,a.width,a.height);let e=n.getImageData(0,0,a.width,a.height);u.height=a.height,u.width=a.width,r(y(e.data,u))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==o)return y(o,u);throw Error("Input data provided is not supported - aborted tensor creation")},b=(e,r)=>{let{width:i,height:a,download:n,dispose:s}=r;return new z({location:"texture",type:"float32",texture:e,dims:[1,a,i,4],download:n,dispose:s})},$=(e,r)=>{let{dataType:i,dims:a,download:n,dispose:s}=r;return new z({location:"gpu-buffer",type:i??"float32",gpuBuffer:e,dims:a,download:n,dispose:s})},v=(e,r)=>{let{dataType:i,dims:a,download:n,dispose:s}=r;return new z({location:"ml-tensor",type:i??"float32",mlTensor:e,dims:a,download:n,dispose:s})},w=(e,r,i)=>new z({location:"cpu-pinned",type:e,data:r,dims:i??[r.length]})}),Z=q(()=>{"use strict";x=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),S=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),k=!1,T=()=>{if(!k){k=!0;let e="u">typeof BigInt64Array&&BigInt64Array.from,r="u">typeof BigUint64Array&&BigUint64Array.from,i=globalThis.Float16Array,a="u">typeof i&&i.from;e&&(x.set("int64",BigInt64Array),S.set(BigInt64Array,"int64")),r&&(x.set("uint64",BigUint64Array),S.set(BigUint64Array,"uint64")),a?(x.set("float16",i),S.set(i,"float16")):x.set("float16",Uint16Array)}}}),X=q(()=>{"use strict";Y(),I=e=>{let r=1;for(let i=0;i<e.length;i++){let a=e[i];if("number"!=typeof a||!Number.isSafeInteger(a))throw TypeError(`dims[${i}] must be an integer, got: ${a}`);if(a<0)throw RangeError(`dims[${i}] must be a non-negative integer, got: ${a}`);r*=a}return r},E=(e,r)=>{switch(e.location){case"cpu":return new z(e.type,e.data,r);case"cpu-pinned":return new z({location:"cpu-pinned",data:e.data,type:e.type,dims:r});case"texture":return new z({location:"texture",texture:e.texture,type:e.type,dims:r});case"gpu-buffer":return new z({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:r});case"ml-tensor":return new z({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:r});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Y=q(()=>{"use strict";K(),Q(),Z(),X(),z=class{constructor(e,r,i){let a,n;if(T(),"object"==typeof e&&"location"in e)switch(this.dataLocation=e.location,a=e.type,n=e.dims,e.location){case"cpu-pinned":{let r=x.get(a);if(!r)throw TypeError(`unsupported type "${a}" to create tensor from pinned buffer`);if(!(e.data instanceof r))throw TypeError(`buffer should be of type ${r.name}`);this.cpuData=e.data;break}case"texture":if("float32"!==a)throw TypeError(`unsupported type "${a}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case"gpu-buffer":if("float32"!==a&&"float16"!==a&&"int32"!==a&&"int64"!==a&&"uint32"!==a&&"uint8"!==a&&"bool"!==a&&"uint4"!==a&&"int4"!==a)throw TypeError(`unsupported type "${a}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case"ml-tensor":if("float32"!==a&&"float16"!==a&&"int32"!==a&&"int64"!==a&&"uint32"!==a&&"uint64"!==a&&"int8"!==a&&"uint8"!==a&&"bool"!==a&&"uint4"!==a&&"int4"!==a)throw TypeError(`unsupported type "${a}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if("string"==typeof e)if(a=e,o=i,"string"===e){if(!Array.isArray(r))throw TypeError("A string tensor's data must be a string array.");s=r}else{let i=x.get(e);if(void 0===i)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if("float16"===e&&i===Uint16Array||"uint4"===e||"int4"===e)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${i.name} as data.`);s="uint64"===e||"int64"===e?i.from(r,BigInt):i.from(r)}else if(r instanceof i)s=r;else if(r instanceof Uint8ClampedArray)if("uint8"===e)s=Uint8Array.from(r);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===e&&r instanceof Uint16Array&&i!==Uint16Array)s=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw TypeError(`A ${a} tensor's data must be type of ${i}`)}else if(o=r,Array.isArray(e)){if(0===e.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let r=typeof e[0];if("string"===r)a="string",s=e;else if("boolean"===r)a="bool",s=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${r}.`)}else if(e instanceof Uint8ClampedArray)a="uint8",s=Uint8Array.from(e);else{let r=S.get(e.constructor);if(void 0===r)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);a=r,s=e}if(void 0===o)o=[s.length];else if(!Array.isArray(o))throw TypeError("A tensor's dims must be a number array");n=o,this.cpuData=s,this.dataLocation="cpu"}let s=I(n);if(this.cpuData&&s!==this.cpuData.length&&("uint4"!==a&&"int4"!==a||Math.ceil(s/2)!==this.cpuData.length))throw Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=a,this.dims=n,this.size=s}static async fromImage(e,r){return _(e,r)}static fromTexture(e,r){return b(e,r)}static fromGpuBuffer(e,r){return $(e,r)}static fromMLTensor(e,r){return v(e,r)}static fromPinnedBuffer(e,r,i){return w(e,r,i)}toDataURL(e){return m(this,e)}toImageData(e){return g(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return E(this,e)}}}),J=q(()=>{"use strict";Y(),C=z}),ee=q(()=>{"use strict";F(),A=(e,r)=>{(typeof h.trace>"u"?h.wasm.trace:h.trace)&&console.timeStamp(`${e}::ORT::${r}`)},O=(e,r)=>{let i=Error().stack?.split(/\r\n|\r|\n/g)||[],a=!1;for(let n=0;n<i.length;n++){if(a&&!i[n].includes("TRACE_FUNC")){let a=`FUNC_${e}::${i[n].trim().split(" ")[1]}`;r&&(a+=`::${r}`),A("CPU",a);return}i[n].includes("TRACE_FUNC")&&(a=!0)}},R=e=>{(typeof h.trace>"u"?h.wasm.trace:h.trace)&&O("BEGIN",e)},B=e=>{(typeof h.trace>"u"?h.wasm.trace:h.trace)&&O("END",e)},N=e=>{(typeof h.trace>"u"?h.wasm.trace:h.trace)&&console.time(`ORT::${e}`)},M=e=>{(typeof h.trace>"u"?h.wasm.trace:h.trace)&&console.timeEnd(`ORT::${e}`)}}),et=q(()=>{"use strict";V(),J(),ee(),D=class e{constructor(e){this.handler=e}async run(e,r,i){R(),N("InferenceSession.run");let a={},n={};if("object"!=typeof e||null===e||e instanceof C||Array.isArray(e))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if("object"==typeof r){if(null===r)throw TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof C)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(0===r.length)throw TypeError("'fetches' cannot be an empty array.");for(let e of(s=!1,r)){if("string"!=typeof e)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(e))throw RangeError(`'fetches' contains invalid output name: ${e}.`);a[e]=null}if("object"==typeof i&&null!==i)n=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else{let e=!1,o=Object.getOwnPropertyNames(r);for(let i of this.outputNames)if(-1!==o.indexOf(i)){let n=r[i];(null===n||n instanceof C)&&(e=!0,s=!1,a[i]=n)}if(e){if("object"==typeof i&&null!==i)n=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else n=r}}else if("u">typeof r)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let r of this.inputNames)if(typeof e[r]>"u")throw Error(`input '${r}' is missing in 'feeds'.`);if(s)for(let e of this.outputNames)a[e]=null;let o=await this.handler.run(e,a,n),u={};for(let e in o)if(Object.hasOwnProperty.call(o,e)){let r=o[e];r instanceof C?u[e]=r:u[e]=new C(r.type,r.data,r.dims)}return M("InferenceSession.run"),B(),u}async release(){return this.handler.dispose()}static async create(r,i,a,n){R(),N("InferenceSession.create");let s,o={};if("string"==typeof r){if(s=r,"object"==typeof i&&null!==i)o=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if(r instanceof Uint8Array){if(s=r,"object"==typeof i&&null!==i)o=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if(r instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&r instanceof SharedArrayBuffer){let e=0,u=r.byteLength;if("object"==typeof i&&null!==i)o=i;else if("number"==typeof i){if(!Number.isSafeInteger(e=i))throw RangeError("'byteOffset' must be an integer.");if(e<0||e>=r.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${r.byteLength}).`);if(u=r.byteLength-e,"number"==typeof a){if(!Number.isSafeInteger(u=a))throw RangeError("'byteLength' must be an integer.");if(u<=0||e+u>r.byteLength)throw RangeError(`'byteLength' is out of range (0, ${r.byteLength-e}].`);if("object"==typeof n&&null!==n)o=n;else if("u">typeof n)throw TypeError("'options' must be an object.")}else if("u">typeof a)throw TypeError("'byteLength' must be a number.")}else if("u">typeof i)throw TypeError("'options' must be an object.");s=new Uint8Array(r,e,u)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await d(o),p=await u.createInferenceSessionHandler(s,l);return M("InferenceSession.create"),B(),new e(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),er=q(()=>{"use strict";et(),P=D}),ei=q(()=>{}),ea=q(()=>{}),en=q(()=>{}),es=q(()=>{}),eo={};W(eo,{InferenceSession:()=>P,TRACE:()=>A,TRACE_EVENT_BEGIN:()=>N,TRACE_EVENT_END:()=>M,TRACE_FUNC_BEGIN:()=>R,TRACE_FUNC_END:()=>B,Tensor:()=>C,env:()=>f,registerBackend:()=>u});var eu=q(()=>{"use strict";G(),j(),er(),J(),ei(),ea(),ee(),en(),es()}),el=q(()=>{}),ed={};W(ed,{default:()=>ec});var ep,ec,eh=q(()=>{"use strict";s2(),nd(),nl(),(ep=globalThis.self?.name==="ort-wasm-proxy-worker")&&(self.onmessage=e=>{let{type:r,in:i}=e.data;try{switch(r){case"init-wasm":eO(i.wasm).then(()=>{sx(i).then(()=>{postMessage({type:r})},e=>{postMessage({type:r,err:e})})},e=>{postMessage({type:r,err:e})});break;case"init-ep":{let{epName:e,env:a}=i;sS(a,e).then(()=>{postMessage({type:r})},e=>{postMessage({type:r,err:e})});break}case"copy-from":{let{buffer:e}=i,a=sI(e);postMessage({type:r,out:a});break}case"create":{let{model:e,options:a}=i;sE(e,a).then(e=>{postMessage({type:r,out:e})},e=>{postMessage({type:r,err:e})});break}case"release":sz(i),postMessage({type:r});break;case"run":{let{sessionId:e,inputIndices:a,inputs:n,outputIndices:s,options:o}=i;sA(e,a,n,s,Array(s.length).fill(null),o).then(e=>{e.some(e=>"cpu"!==e[3])?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:e},sR([...n,...e]))},e=>{postMessage({type:r,err:e})});break}case"end-profiling":sO(i),postMessage({type:r})}}catch(e){postMessage({type:r,err:e})}}),ec=ep?null:e=>new Worker(e??eb,{type:"module",name:"ort-wasm-proxy-worker"})}),ef={};async function em(e={}){var r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,a=i&&self.name?.startsWith("em-pthread");e.mountExternalData=(r,i)=>{r.startsWith("./")&&(r=r.substring(2)),(e.Zc||(e.Zc=new Map)).set(r,i)},e.unmountExternalData=()=>{delete e.Zc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,ae:!0}).buffer.constructor;let n=r=>async(...i)=>{try{if(e.$c)throw Error("Session already started");let a=e.$c={Nd:i[0],errors:[]},n=await r(...i);if(e.$c!==a)throw Error("Session mismatch");e.gd?.flush();let s=a.errors;if(0<s.length){let e=await Promise.all(s);if(e=e.filter(e=>e),0<e.length)throw Error(e.join(`
`))}return n}finally{e.$c=null}};e.jsepInit=(r,i)=>{if("webgpu"===r){[e.gd,e.Dd,e.Hd,e.jd,e.Gd,e.ac,e.Id,e.Kd,e.Ed,e.Fd,e.Jd]=i;let r=e.gd;e.jsepRegisterBuffer=(e,i,a,n)=>r.registerBuffer(e,i,a,n),e.jsepGetBuffer=e=>r.getBuffer(e),e.jsepCreateDownloader=(e,i,a)=>r.createDownloader(e,i,a),e.jsepOnCreateSession=e=>{r.onCreateSession(e)},e.jsepOnReleaseSession=e=>{r.onReleaseSession(e)},e.jsepOnRunStart=e=>r.onRunStart(e),e.Ld=(e,i)=>{r.upload(e,i)}}else if("webnn"===r){let r=i[0];[e.Zd,e.vd,e.webnnEnsureTensor,e.xd,e.webnnDownloadTensor,e.Yd,e.webnnEnableTraceEvent]=i.slice(1),e.webnnReleaseTensorId=e.vd,e.webnnUploadTensor=e.xd,e.webnnRegisterMLContext=e.Yd,e.webnnOnRunStart=e=>r.onRunStart(e),e.webnnOnRunEnd=r.onRunEnd.bind(r),e.webnnOnReleaseSession=e=>{r.onReleaseSession(e)},e.webnnCreateMLTensorDownloader=(e,i)=>r.createMLTensorDownloader(e,i),e.webnnRegisterMLTensor=(e,i,a,n)=>r.registerMLTensor(e,i,a,n),e.webnnCreateMLContext=e=>r.createMLContext(e),e.webnnRegisterMLConstant=(i,a,n,s,o,u)=>r.registerMLConstant(i,a,n,s,o,e.Zc,u),e.webnnRegisterGraphInput=r.registerGraphInput.bind(r),e.webnnIsGraphInput=r.isGraphInput.bind(r),e.webnnRegisterGraphOutput=r.registerGraphOutput.bind(r),e.webnnIsGraphOutput=r.isGraphOutput.bind(r),e.webnnCreateTemporaryTensor=r.createTemporaryTensor.bind(r),e.webnnIsGraphInputOutputTypeSupported=r.isGraphInputOutputTypeSupported.bind(r)}};let s=()=>{let r=e=>(...r)=>{let i=tE;return r=e(...r),tE!=i?new Promise((e,r)=>{tN={resolve:e,reject:r}}):r};(()=>{for(let i of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])e[i]=r(e[i])})(),void 0!==n&&(e._OrtRun=n(e._OrtRun),e._OrtRunWithBinding=n(e._OrtRunWithBinding)),s=void 0};e.asyncInit=()=>{s?.()};var o,u,l=(e,r)=>{throw r},d=import.meta.url,p="";if(r||i){try{p=new URL(".",d).href}catch{}i&&(u=e=>{var r=new XMLHttpRequest;return r.open("GET",e,!1),r.responseType="arraybuffer",r.send(null),new Uint8Array(r.response)}),o=async e=>{if(x(e))return new Promise((r,i)=>{var a=new XMLHttpRequest;a.open("GET",e,!0),a.responseType="arraybuffer",a.onload=()=>{200==a.status||0==a.status&&a.response?r(a.response):i(a.status)},a.onerror=i,a.send(null)});var r=await fetch(e,{credentials:"same-origin"});if(r.ok)return r.arrayBuffer();throw Error(r.status+" : "+r.url)}}var c,h,f,m,g,y,_=console.log.bind(console),b=console.error.bind(console),$=_,v=b,w=!1,x=e=>e.startsWith("file://");function S(){eu.buffer!=T.buffer&&P()}if(a){let r=function(i){try{var a,n,s=i.data,o=s.Uc;if("load"===o){let i=[];for(let a of(self.onmessage=e=>i.push(e),y=()=>{for(let e of(postMessage({Uc:"loaded"}),i))r(e);self.onmessage=r},s.Ad))e[a]&&!e[a].proxy||(e[a]=(...e)=>{postMessage({Uc:"callHandler",zd:a,args:e})},"print"==a&&($=e[a]),"printErr"==a&&(v=e[a]));eu=s.Vd,P(),h=s.Wd,L(),am()}else if("run"===o){a=s.Tc,n=(S(),A)[a+52>>>2>>>0],a=(S(),A)[a+56>>>2>>>0],rK(n,n-a),rQ(n),rU(s.Tc,0,0,1,0,0),en(),t_(s.Tc),k||(rN(),k=!0);try{el(s.Pd,s.dd)}catch(e){if("unwind"!=e)throw e}}else"setimmediate"!==s.target&&("checkMailbox"===o?k&&tb():o&&(v(`worker: received unknown command ${o}`),v(s)))}catch(e){throw rq(),e}};var k=!1;self.onunhandledrejection=e=>{throw e.reason||e},self.onmessage=r}var T,I,E,z,C,A,O,R,B,N,M,D=!1;function P(){var r=eu.buffer;e.HEAP8=T=new Int8Array(r),E=new Int16Array(r),e.HEAPU8=I=new Uint8Array(r),z=new Uint16Array(r),e.HEAP32=C=new Int32Array(r),e.HEAPU32=A=new Uint32Array(r),O=new Float32Array(r),R=new Float64Array(r),B=new BigInt64Array(r),N=new BigUint64Array(r)}function U(){D=!0,a?y():iM.tb()}function q(e){throw v(e="Aborted("+e+")"),w=!0,e=new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info."),g?.(e),e}function W(){return{a:{ma:iq,hb:iU,g:ec,J:ef,f:e$,o:ev,h:ew,ha:ex,b:eS,T:ek,Ia:eI,n:eE,_:eR,Ya:eB,Ea:eN,Ga:eM,Za:eD,Wa:eP,Pa:eU,Va:eq,ka:eW,Fa:eL,Ca:eV,Xa:eG,Da:eH,cb:eF,ea:e0,xa:e1,va:e7,da:te,O:tt,H:tr,wa:tn,Z:th,ya:tf,Sa:tm,Aa:t$,Ja:tw,ta:tx,fa:tS,Ra:t_,$a:tk,R:tP,s:tV,c:e4,ib:tG,y:tH,M:tF,D:tj,m:tK,t:tQ,jb:tZ,I:tX,S:tY,j:tJ,v:t0,r:t1,l:t2,Ma:t3,Na:t5,Oa:t9,Ka:t7,La:re,ua:ri,eb:ra,bb:rs,u:rl,aa:rd,ga:rp,ab:rn,V:rc,_a:rh,Ba:rf,F:rr,U:rm,la:r$,za:rv,gb:rb,fb:rw,Ta:rT,Ua:rI,Ha:J,$:rE,ja:rz,Qa:rC,ia:rO,lb:ah,na:as,mb:ac,oa:an,G:i8,d:iG,q:iL,w:iW,B:i0,pb:ar,K:i3,x:iF,pa:ai,X:ao,ba:at,nb:ap,ob:ad,ra:i5,qa:ae,qb:i9,N:i4,Y:aa,e:iH,A:ij,k:iV,kb:af,p:iQ,z:iZ,C:iK,E:iX,L:i1,rb:i6,Q:au,ca:i2,W:al,sb:iJ,sa:iY,P:i7,i:rR,a:eu,db:X}}}async function L(){function r(r,i){var a,n,s,o=iM=r.exports;for(let[e,i]of(r={},Object.entries(o)))"function"==typeof i?(o=function(e){var r=(...r)=>{tC.push(e);try{return e(...r)}finally{w||(tC.pop(),tE&&1===tI&&0===tC.length&&(tI=0,Q+=1,tT(iR),"u">typeof Fibers&&Fibers.ce()))}};return tR.set(e,r),r}(i),r[e]=o):r[e]=i;return a=iM=r,n=e=>r=>e(r)>>>0,s=e=>()=>e()>>>0,(a=Object.assign({},a)).ub=n(a.ub),a.Yb=s(a.Yb),a._b=n(a._b),a.mc=n(a.mc),a.nc=s(a.nc),a.rc=n(a.rc),iM=a,er.push(iM.$b),rB=(r=iM).ub,rN=r.vb,e._OrtInit=r.wb,e._OrtGetLastError=r.xb,e._OrtCreateSessionOptions=r.yb,e._OrtAppendExecutionProvider=r.zb,e._OrtAddFreeDimensionOverride=r.Ab,e._OrtAddSessionConfigEntry=r.Bb,e._OrtReleaseSessionOptions=r.Cb,e._OrtCreateSession=r.Db,e._OrtReleaseSession=r.Eb,e._OrtGetInputOutputCount=r.Fb,e._OrtGetInputOutputMetadata=r.Gb,e._OrtFree=r.Hb,e._OrtCreateTensor=r.Ib,e._OrtGetTensorData=r.Jb,e._OrtReleaseTensor=r.Kb,e._OrtCreateRunOptions=r.Lb,e._OrtAddRunConfigEntry=r.Mb,e._OrtReleaseRunOptions=r.Nb,e._OrtCreateBinding=r.Ob,e._OrtBindInput=r.Pb,e._OrtBindOutput=r.Qb,e._OrtClearBoundOutputs=r.Rb,e._OrtReleaseBinding=r.Sb,e._OrtRunWithBinding=r.Tb,e._OrtRun=r.Ub,e._OrtEndProfiling=r.Vb,e._JsepOutput=r.Wb,e._JsepGetNodeName=r.Xb,rM=r.Yb,rD=e._free=r.Zb,rP=e._malloc=r._b,rU=r.bc,rq=r.cc,rW=r.dc,rL=r.ec,rV=r.fc,rG=r.gc,rH=r.hc,rF=r.ic,rj=r.jc,rK=r.kc,rQ=r.lc,rZ=r.mc,rX=r.nc,rY=r.oc,rJ=r.pc,r0=r.qc,r1=r.rc,r2=r.sc,r3=r.tc,r4=r.uc,r6=r.vc,r8=r.wc,r5=r.xc,r9=r.yc,r7=r.zc,ie=r.Ac,it=r.Bc,ir=r.Cc,ii=r.Dc,ia=r.Ec,is=r.Fc,io=r.Gc,iu=r.Hc,il=r.Ic,id=r.Jc,ip=r.Kc,ic=r.Lc,ih=r.Mc,im=r.Nc,ig=r.Oc,iy=r.Pc,i_=r.Rc,ib=r.Sc,i$=r.bd,iv=r.cd,iw=r.hd,ix=r.kd,iS=r.ld,ik=r.md,iT=r.nd,iI=r.od,iE=r.pd,iz=r.qd,iC=r.rd,iA=r.wd,iO=r.Rd,iR=r.Sd,iB=r.Td,iN=r.Ud,h=i,iM}var i,n=W();return e.instantiateWasm?new Promise(i=>{e.instantiateWasm(n,(e,a)=>{i(r(e,a))})}):a?r(new WebAssembly.Instance(h,W()),h):(M??=e.locateFile?e.locateFile?e.locateFile("ort-wasm-simd-threaded.jsep.wasm",p):p+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,i=await async function(e){if(!c&&!x(M))try{var r=fetch(M,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(r,e)}catch(e){v(`wasm streaming compile failed: ${e}`),v("falling back to ArrayBuffer instantiation")}return async function(e,r){try{var i=await async function(e){if(!c)try{var r=await o(e);return new Uint8Array(r)}catch{}if(e==M&&c)e=new Uint8Array(c);else{if(!u)throw"both async and sync fetching of the wasm failed";e=u(e)}return e}(e);return await WebAssembly.instantiate(i,r)}catch(e){v(`failed to asynchronously prepare wasm: ${e}`),q(e)}}(M,e)}(n),r(i.instance,i.module))}class V{name="ExitStatus";constructor(e){this.message=`Program terminated with exit(${e})`,this.status=e}}var G=e=>{e.terminate(),e.onmessage=()=>{}},H=[],F=0,j=null,K=e=>{0==ee.length&&(eo(),es(ee[0]));var r=ee.pop();if(!r)return 6;et.push(r),ei[e.Tc]=r,r.Tc=e.Tc;var i={Uc:"run",Pd:e.Od,dd:e.dd,Tc:e.Tc};return r.postMessage(i,e.ud),0},Q=0,Z=(e,r,...i)=>{var a,n=16*i.length,s=rX(),o=rZ(n),u=o>>>3;for(a of i)"bigint"==typeof a?((S(),B)[u++>>>0]=1n,(S(),B)[u++>>>0]=a):((S(),B)[u++>>>0]=0n,(S(),R)[u++>>>0]=a);return e=rW(e,0,n,o,r),rQ(s),e};function X(e){if(a)return Z(0,1,e);if(f=e,!(0<Q)){for(var r of et)G(r);for(r of ee)G(r);ee=[],et=[],ei={},w=!0}l(0,new V(e))}function Y(e){if(a)return Z(1,0,e);J(e)}var J=e=>{if(f=e,a)throw Y(e),"unwind";X(e)},ee=[],et=[],er=[],ei={},ea=e=>{var r=e.Tc;delete ei[r],ee.push(e),et.splice(et.indexOf(e),1),e.Tc=0,rL(r)};function en(){er.forEach(e=>e())}var es=r=>new Promise(i=>{r.onmessage=a=>{var n=a.data;if(a=n.Uc,n.ad&&n.ad!=rM()){var s=ei[n.ad];s?s.postMessage(n,n.ud):v(`Internal error! Worker sent a message "${a}" to target pthread ${n.ad}, but that thread no longer exists!`)}else"checkMailbox"===a?tb():"spawnThread"===a?K(n):"cleanupThread"===a?tg(()=>{ea(ei[n.Qd])}):"loaded"===a?(r.loaded=!0,i(r)):"setimmediate"===n.target?r.postMessage(n):"uncaughtException"===a?r.onerror(n.error):"callHandler"===a?e[n.zd](...n.args):a&&v(`worker sent an unknown command ${a}`)},r.onerror=e=>{throw v(`worker sent an error! ${e.filename}:${e.lineno}: ${e.message}`),e};var a,n=[];for(a of[])e.propertyIsEnumerable(a)&&n.push(a);r.postMessage({Uc:"load",Ad:n,Vd:eu,Wd:h})});function eo(){let e;var r=new Worker((e=URL,import.meta.url>"file:"&&import.meta.url<"file;"?new e("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)),{type:"module",workerData:"em-pthread",name:"em-pthread"});ee.push(r)}var eu,el=(e,r)=>{Q=0,e=r3(e,r),0<Q?f=e:rV(e)},ed=[],ep=0;function ec(e){var r=new e_(e>>>=0);return 0==(S(),T)[r.Vc+12>>>0]&&(eg(r,!0),ep--),ey(r,!1),ed.push(r),r1(e)}var eh=0,ef=()=>{rF(0,0);var e=ed.pop();rY(e.ed),eh=0};function eg(e,r){r=+!!r,(S(),T)[e.Vc+12>>>0]=r}function ey(e,r){r=+!!r,(S(),T)[e.Vc+13>>>0]=r}class e_{constructor(e){this.ed=e,this.Vc=e-24}}var eb=e=>{var r=eh;if(!r)return rj(0),0;var i=new e_(r);(S(),A)[i.Vc+16>>>2>>>0]=r;var a=(S(),A)[i.Vc+4>>>2>>>0];if(!a)return rj(0),r;for(var n of e){if(0===n||n===a)break;if(r0(n,a,i.Vc+16))return rj(n),r}return rj(a),r};function e$(){return eb([])}function ev(e){return eb([e>>>0])}function ew(e,r,i,a){return eb([e>>>0,r>>>0,i>>>0,a>>>0])}var ex=()=>{var e=ed.pop();e||q("no exception to throw");var r=e.ed;throw 0==(S(),T)[e.Vc+13>>>0]&&(ed.push(e),ey(e,!0),eg(e,!1),ep++),rJ(r),eh=r};function eS(e,r,i){var a=new e_(e>>>=0);throw r>>>=0,i>>>=0,(S(),A)[a.Vc+16>>>2>>>0]=0,(S(),A)[a.Vc+4>>>2>>>0]=r,(S(),A)[a.Vc+8>>>2>>>0]=i,rJ(e),ep++,eh=e}var ek=()=>ep;function eT(e,r,i,n){return a?Z(2,1,e,r,i,n):eI(e,r,i,n)}function eI(e,r,i,n){if(e>>>=0,r>>>=0,i>>>=0,n>>>=0,!globalThis.SharedArrayBuffer)return 6;var s=[];return a&&0===s.length?eT(e,r,i,n):(e={Od:i,Tc:e,dd:n,ud:s},a?(e.Uc="spawnThread",postMessage(e,s),0):K(e))}function eE(e){throw eh||=e>>>0}var ez=globalThis.TextDecoder&&new TextDecoder,eC=(e,r,i,a)=>{if(i=r+i,a)return i;for(;e[r]&&!(r>=i);)++r;return r},eA=(e,r=0,i,a)=>{if(16<(i=eC(e,r>>>=0,i,a))-r&&e.buffer&&ez)return ez.decode(e.buffer instanceof ArrayBuffer?e.subarray(r,i):e.slice(r,i));for(a="";r<i;){var n=e[r++];if(128&n){var s=63&e[r++];if((224&n)==192)a+=String.fromCharCode((31&n)<<6|s);else{var o=63&e[r++];65536>(n=(240&n)==224?(15&n)<<12|s<<6|o:(7&n)<<18|s<<12|o<<6|63&e[r++])?a+=String.fromCharCode(n):(n-=65536,a+=String.fromCharCode(55296|n>>10,56320|1023&n))}}else a+=String.fromCharCode(n)}return a},eO=(e,r,i)=>(e>>>=0)?eA((S(),I),e,r,i):"";function eR(e,r,i){return a?Z(3,1,e,r,i):0}function eB(e,r){if(a)return Z(4,1,e,r)}function eN(e,r){if(a)return Z(5,1,e,r)}function eM(e,r,i){if(a)return Z(6,1,e,r,i)}function eD(e,r,i){return a?Z(7,1,e,r,i):0}function eP(e,r){if(a)return Z(8,1,e,r)}function eU(e,r,i){if(a)return Z(9,1,e,r,i)}function eq(e,r,i,n){if(a)return Z(10,1,e,r,i,n)}function eW(e,r,i,n){if(a)return Z(11,1,e,r,i,n)}function eL(e,r,i,n){if(a)return Z(12,1,e,r,i,n)}function eV(e){if(a)return Z(13,1,e)}function eG(e,r){if(a)return Z(14,1,e,r)}function eH(e,r,i){if(a)return Z(15,1,e,r,i)}var eF=()=>q(""),ej=e=>{e>>>=0;for(var r="";;){var i=(S(),I)[e++>>>0];if(!i)return r;r+=String.fromCharCode(i)}},eK={},eQ={},eZ={},eX=class extends Error{constructor(e){super(e),this.name="BindingError"}};function eY(e,r,i={}){return function(e,r,i={}){var a=r.name;if(!e)throw new eX(`type "${a}" must have a positive integer typeid pointer`);if(eQ.hasOwnProperty(e)){if(i.Bd)return;throw new eX(`Cannot register type '${a}' twice`)}eQ[e]=r,delete eZ[e],eK.hasOwnProperty(e)&&(r=eK[e],delete eK[e],r.forEach(e=>e()))}(e,r,i)}var eJ=(e,r,i)=>{switch(r){case 1:return i?e=>(S(),T)[e>>>0]:e=>(S(),I)[e>>>0];case 2:return i?e=>(S(),E)[e>>>1>>>0]:e=>(S(),z)[e>>>1>>>0];case 4:return i?e=>(S(),C)[e>>>2>>>0]:e=>(S(),A)[e>>>2>>>0];case 8:return i?e=>(S(),B)[e>>>3>>>0]:e=>(S(),N)[e>>>3>>>0];default:throw TypeError(`invalid integer width (${r}): ${e}`)}};function e0(e,r,i,a,n){e>>>=0,i>>>=0,r=ej(r>>>0);let s=e=>e;if(a=0n===a){let e=8*i;n=(s=r=>BigInt.asUintN(e,r))(n)}eY(e,{name:r,Qc:s,Xc:(e,r)=>("number"==typeof r&&(r=BigInt(r)),r),Wc:eJ(r,i,!a),Yc:null})}function e1(e,r,i,a){eY(e>>>=0,{name:r=ej(r>>>0),Qc:function(e){return!!e},Xc:function(e,r){return r?i:a},Wc:function(e){return this.Qc((S(),I)[e>>>0])},Yc:null})}var e2=[],e3=[0,1,,1,null,1,!0,1,!1,1];function e4(e){9<(e>>>=0)&&0==--e3[e+1]&&(e3[e]=void 0,e2.push(e))}var e6=e=>{if(!e)throw new eX(`Cannot use deleted val. handle = ${e}`);return e3[e]},e8=e=>{switch(e){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let r=e2.pop()||e3.length;return e3[r]=e,e3[r+1]=1,r}};function e5(e){return this.Qc((S(),A)[e>>>2>>>0])}var e9={name:"emscripten::val",Qc:e=>{var r=e6(e);return e4(e),r},Xc:(e,r)=>e8(r),Wc:e5,Yc:null};function e7(e){return eY(e>>>0,e9)}function te(e,r,i){i>>>=0,eY(e>>>=0,{name:r=ej(r>>>0),Qc:e=>e,Xc:(e,r)=>r,Wc:((e,r)=>{switch(r){case 4:return function(e){return this.Qc((S(),O)[e>>>2>>>0])};case 8:return function(e){return this.Qc((S(),R)[e>>>3>>>0])};default:throw TypeError(`invalid float width (${r}): ${e}`)}})(r,i),Yc:null})}function tt(e,r,i,a,n){e>>>=0,i>>>=0,r=ej(r>>>0);let s=e=>e;if(0===a){var o=32-8*i;n=(s=e=>e<<o>>>o)(n)}eY(e,{name:r,Qc:s,Xc:(e,r)=>r,Wc:eJ(r,i,0!==a),Yc:null})}function tr(e,r,i){function a(e){var r=(S(),A)[e>>>2>>>0];return e=(S(),A)[e+4>>>2>>>0],new n((S(),T).buffer,e,r)}var n=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][r];eY(e>>>=0,{name:i=ej(i>>>0),Qc:a,Wc:a},{Bd:!0})}var ti=(e,r,i)=>{var a=(S(),I);if(r>>>=0,0<i){var n=r;i=r+i-1;for(var s=0;s<e.length;++s){var o=e.codePointAt(s);if(127>=o){if(r>=i)break;a[r++>>>0]=o}else if(2047>=o){if(r+1>=i)break;a[r++>>>0]=192|o>>6,a[r++>>>0]=128|63&o}else if(65535>=o){if(r+2>=i)break;a[r++>>>0]=224|o>>12,a[r++>>>0]=128|o>>6&63,a[r++>>>0]=128|63&o}else{if(r+3>=i)break;a[r++>>>0]=240|o>>18,a[r++>>>0]=128|o>>12&63,a[r++>>>0]=128|o>>6&63,a[r++>>>0]=128|63&o,s++}}a[r>>>0]=0,e=r-n}else e=0;return e},ta=e=>{for(var r=0,i=0;i<e.length;++i){var a=e.charCodeAt(i);127>=a?r++:2047>=a?r+=2:55296<=a&&57343>=a?(r+=4,++i):r+=3}return r};function tn(e,r){eY(e>>>=0,{name:r=ej(r>>>0),Qc(e){var r=(S(),A)[e>>>2>>>0];return r=eO(e+4,r,!0),rD(e),r},Xc(e,r){r instanceof ArrayBuffer&&(r=new Uint8Array(r));var i="string"==typeof r;if(!(i||ArrayBuffer.isView(r)&&1==r.BYTES_PER_ELEMENT))throw new eX("Cannot pass non-string to std::string");var a=i?ta(r):r.length,n=rP(4+a+1),s=n+4;return(S(),A)[n>>>2>>>0]=a,i?ti(r,s,a+1):(S(),I).set(r,s>>>0),null!==e&&e.push(rD,n),n},Wc:e5,Yc(e){rD(e)}})}var ts=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,to=(e,r,i)=>{if(e>>>=1,16<(r=eC((S(),z),e,r/2,i))-e&&ts)return ts.decode((S(),z).slice(e,r));for(i="";e<r;++e)i+=String.fromCharCode((S(),z)[e>>>0]);return i},tu=(e,r,i)=>{if(2>(i??=0x7fffffff))return 0;var a=r;i=(i-=2)<2*e.length?i/2:e.length;for(var n=0;n<i;++n){var s=e.charCodeAt(n);(S(),E)[r>>>1>>>0]=s,r+=2}return(S(),E)[r>>>1>>>0]=0,r-a},tl=e=>2*e.length,td=(e,r,i)=>{var a="";e>>>=2;for(var n=0;!(n>=r/4);n++){var s=(S(),A)[e+n>>>0];if(!s&&!i)break;a+=String.fromCodePoint(s)}return a},tp=(e,r,i)=>{if(r>>>=0,4>(i??=0x7fffffff))return 0;var a=r;i=a+i-4;for(var n=0;n<e.length;++n){var s=e.codePointAt(n);if(65535<s&&n++,(S(),C)[r>>>2>>>0]=s,(r+=4)+4>i)break}return(S(),C)[r>>>2>>>0]=0,r-a},tc=e=>{for(var r=0,i=0;i<e.length;++i)65535<e.codePointAt(i)&&i++,r+=4;return r};function th(e,r,i){if(e>>>=0,r>>>=0,i=ej(i>>>=0),2===r)var a=to,n=tu,s=tl;else a=td,n=tp,s=tc;eY(e,{name:i,Qc:e=>{var i=(S(),A)[e>>>2>>>0];return i=a(e+4,i*r,!0),rD(e),i},Xc:(e,a)=>{if("string"!=typeof a)throw new eX(`Cannot pass non-string to C++ string type ${i}`);var o=s(a),u=rP(4+o+r);return(S(),A)[u>>>2>>>0]=o/r,n(a,u+4,o+r),null!==e&&e.push(rD,u),u},Wc:e5,Yc(e){rD(e)}})}function tf(e,r){eY(e>>>=0,{Cd:!0,name:r=ej(r>>>0),Qc:()=>{},Xc:()=>{}})}function tm(e){rU(e>>>0,!i,1,!r,131072,!1),en()}var tg=e=>{if(!w)try{if(e(),!(0<Q))try{a?rM()&&rV(f):J(f)}catch(e){e instanceof V||"unwind"==e||l(0,e)}}catch(e){e instanceof V||"unwind"==e||l(0,e)}},ty=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function t_(e){e>>>=0,ty||(Atomics.waitAsync((S(),C),e>>>2,e).value.then(tb),e+=128,Atomics.store((S(),C),e>>>2,1))}var tb=()=>tg(()=>{var e=rM();e&&(t_(e),rH())});function t$(e,r){(e>>>=0)==r>>>0?setTimeout(tb):a?postMessage({ad:e,Uc:"checkMailbox"}):(e=ei[e])&&e.postMessage({Uc:"checkMailbox"})}var tv=[];function tw(e,r,i,a,n){for(r>>>=0,n>>>=0,tv.length=0,i=n>>>3,a=n+a>>>3;i<a;){var s;s=(S(),B)[i++>>>0]?(S(),B)[i++>>>0]:(S(),R)[i++>>>0],tv.push(s)}return(r?iP[r]:iD[e])(...tv)}var tx=()=>{Q=0};function tS(e){e>>>=0,a?postMessage({Uc:"cleanupThread",Qd:e}):ea(ei[e])}function tk(e){}var tT=e=>{try{e()}catch(e){q(e)}},tI=0,tE=null,tz=0,tC=[],tA=new Map,tO=new Map,tR=new Map,tB=0,tN=null,tM=[],tD=e=>(function(e){if(!w){if(0===tI){var r=!1,i=!1;e((e=0)=>{if(!w&&(tz=e,r=!0,i)){tI=2,tT(()=>iB(tE)),"u">typeof MainLoop&&MainLoop.yd&&MainLoop.resume(),e=!1;try{var a,n=(a=(S(),C)[tE+8>>>2>>>0],a=tO.get(a),a=tR.get(a),--Q,a())}catch(r){n=r,e=!0}var s=!1;if(!tE){var o=tN;o&&(tN=null,(e?o.reject:o.resolve)(n),s=!0)}if(e&&!s)throw n}}),i=!0,r||(tI=1,tE=function(){var e=rP(65548),r=e+12;if((S(),A)[e>>>2>>>0]=r,(S(),A)[e+4>>>2>>>0]=r+65536,r=tC[0],!tA.has(r)){var i=tB++;tA.set(r,i),tO.set(i,r)}return r=tA.get(r),(S(),C)[e+8>>>2>>>0]=r,e}(),"u">typeof MainLoop&&MainLoop.yd&&MainLoop.pause(),tT(()=>iO(tE)))}else 2===tI?(tI=0,tT(iN),rD(tE),tE=null,tM.forEach(tg)):q(`invalid state: ${tI}`);return tz}})(r=>{e().then(r)});function tP(e){return e>>>=0,tD(async()=>e8(await e6(e)))}var tU=[],tq=(e,r,i)=>{var a=[];return e=e(a,i),a.length&&((S(),A)[r>>>2>>>0]=e8(a)),e},tW={},tL=e=>{var r=tW[e];return void 0===r?ej(e):r};function tV(e,r,i){var a,n,[s,...o]=((e,r)=>{for(var i=Array(e),a=0;a<e;++a){var n=a,s=(S(),A)[r+4*a>>>2>>>0],o=eQ[s];if(void 0===o)throw e=`parameter ${a}`,r=ej(s=rB(s)),rD(s),new eX(`${e} has unknown type ${r}`);i[n]=o}return i})(e,r>>>0);r=s.Xc.bind(s);var u=o.map(e=>e.Wc.bind(e));e--;var l={toValue:e6};switch(e=u.map((e,r)=>{var i=`argFromPtr${r}`;return l[i]=e,`${i}(args${r?"+"+8*r:""})`}),i){case 0:var d="toValue(handle)";break;case 2:d="new (toValue(handle))";break;case 3:d="";break;case 1:l.getStringOrSymbol=tL,d="toValue(handle)[getStringOrSymbol(methodName)]"}return d+=`(${e})`,s.Cd||(l.toReturnWire=r,l.emval_returnValue=tq,d=`return emval_returnValue(toReturnWire, destructorsRef, ${d})`),d=`return function (handle, methodName, destructorsRef, args) {
  ${d}
  }`,a=Object.defineProperty(i=Function(Object.keys(l),d)(...Object.values(l)),"name",{value:d=`methodCaller<(${o.map(e=>e.name)}) => ${s.name}>`}),n=tU.length,tU.push(a),n}function tG(e,r){return r>>>=0,(e=e6(e>>>0))==e6(r)}function tH(e){return(e>>>=0)?(e=tL(e),e8(globalThis[e])):e8(globalThis)}function tF(r){return e8(e[r=tL(r>>>0)])}function tj(e,r){return r>>>=0,e8((e=e6(e>>>0))[r=e6(r)])}function tK(e){9<(e>>>=0)&&(e3[e+1]+=1)}function tQ(e,r,i,a,n){return tU[e>>>0](r>>>0,i>>>0,a>>>0,n>>>0)}function tZ(e,r,i,a,n){return tQ(e>>>0,r>>>0,i>>>0,a>>>0,n>>>0)}function tX(){return e8([])}function tY(e){e=e6(e>>>0);for(var r=Array(e.length),i=0;i<e.length;i++)r[i]=e[i];return e8(r)}function tJ(e){return e8(tL(e>>>0))}function t0(){return e8({})}function t1(e){for(var r=e6(e>>>=0);r.length;){var i=r.pop();r.pop()(i)}e4(e)}function t2(e,r,i){r>>>=0,i>>>=0,e=e6(e>>>0),r=e6(r),i=e6(i),e[r]=i}function t3(e,r){e=-0x20000000000000>e||0x20000000000000<e?NaN:Number(e),r>>>=0,e=new Date(1e3*e),(S(),C)[r>>>2>>>0]=e.getUTCSeconds(),(S(),C)[r+4>>>2>>>0]=e.getUTCMinutes(),(S(),C)[r+8>>>2>>>0]=e.getUTCHours(),(S(),C)[r+12>>>2>>>0]=e.getUTCDate(),(S(),C)[r+16>>>2>>>0]=e.getUTCMonth(),(S(),C)[r+20>>>2>>>0]=e.getUTCFullYear()-1900,(S(),C)[r+24>>>2>>>0]=e.getUTCDay(),e=(e.getTime()-Date.UTC(e.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(S(),C)[r+28>>>2>>>0]=e}var t4=e=>e%4==0&&(e%100!=0||e%400==0),t6=[0,31,60,91,121,152,182,213,244,274,305,335],t8=[0,31,59,90,120,151,181,212,243,273,304,334];function t5(e,r){e=-0x20000000000000>e||0x20000000000000<e?NaN:Number(e),r>>>=0,e=new Date(1e3*e),(S(),C)[r>>>2>>>0]=e.getSeconds(),(S(),C)[r+4>>>2>>>0]=e.getMinutes(),(S(),C)[r+8>>>2>>>0]=e.getHours(),(S(),C)[r+12>>>2>>>0]=e.getDate(),(S(),C)[r+16>>>2>>>0]=e.getMonth(),(S(),C)[r+20>>>2>>>0]=e.getFullYear()-1900,(S(),C)[r+24>>>2>>>0]=e.getDay();var i=(t4(e.getFullYear())?t6:t8)[e.getMonth()]+e.getDate()-1|0;(S(),C)[r+28>>>2>>>0]=i,(S(),C)[r+36>>>2>>>0]=-60*e.getTimezoneOffset(),i=new Date(e.getFullYear(),6,1).getTimezoneOffset();var a=new Date(e.getFullYear(),0,1).getTimezoneOffset();e=0|(i!=a&&e.getTimezoneOffset()==Math.min(a,i)),(S(),C)[r+32>>>2>>>0]=e}function t9(e){e>>>=0;var r=new Date((S(),C)[e+20>>>2>>>0]+1900,(S(),C)[e+16>>>2>>>0],(S(),C)[e+12>>>2>>>0],(S(),C)[e+8>>>2>>>0],(S(),C)[e+4>>>2>>>0],(S(),C)[e>>>2>>>0],0),i=(S(),C)[e+32>>>2>>>0],a=r.getTimezoneOffset(),n=new Date(r.getFullYear(),6,1).getTimezoneOffset(),s=new Date(r.getFullYear(),0,1).getTimezoneOffset(),o=Math.min(s,n);return 0>i?(S(),C)[e+32>>>2>>>0]=+(n!=s&&o==a):0<i!=(o==a)&&(n=Math.max(s,n),r.setTime(r.getTime()+6e4*((0<i?o:n)-a))),(S(),C)[e+24>>>2>>>0]=r.getDay(),i=(t4(r.getFullYear())?t6:t8)[r.getMonth()]+r.getDate()-1|0,(S(),C)[e+28>>>2>>>0]=i,(S(),C)[e>>>2>>>0]=r.getSeconds(),(S(),C)[e+4>>>2>>>0]=r.getMinutes(),(S(),C)[e+8>>>2>>>0]=r.getHours(),(S(),C)[e+12>>>2>>>0]=r.getDate(),(S(),C)[e+16>>>2>>>0]=r.getMonth(),(S(),C)[e+20>>>2>>>0]=r.getYear(),BigInt(isNaN(e=r.getTime())?-1:e/1e3)}function t7(e,r,i,n,s,o,u){return a?Z(16,1,e,r,i,n,s,o,u):-52}function re(e,r,i,n,s,o){if(a)return Z(17,1,e,r,i,n,s,o)}var rt={},rr=()=>performance.timeOrigin+performance.now();function ri(e,r){if(a)return Z(18,1,e,r);if(rt[e]&&(clearTimeout(rt[e].id),delete rt[e]),!r)return 0;var i=setTimeout(()=>{delete rt[e],tg(()=>rG(e,performance.timeOrigin+performance.now()))},r);return rt[e]={id:i,be:r},0}function ra(e,r,i,a){e>>>=0,r>>>=0,i>>>=0,a>>>=0;var n=new Date().getFullYear(),s=new Date(n,0,1).getTimezoneOffset(),o=Math.max(s,n=new Date(n,6,1).getTimezoneOffset());(S(),A)[e>>>2>>>0]=60*o,(S(),C)[r>>>2>>>0]=+(s!=n),e=(r=e=>{var r=Math.abs(e);return`UTC${0<=e?"-":"+"}${String(Math.floor(r/60)).padStart(2,"0")}${String(r%60).padStart(2,"0")}`})(s),r=r(n),n<s?(ti(e,i,17),ti(r,a,17)):(ti(e,a,17),ti(r,i,17))}var rn=()=>Date.now();function rs(e,r,i){return(i>>>=0,0<=e&&3>=e)?(e=Math.round(1e6*(e=0===e?Date.now():performance.timeOrigin+performance.now())),(S(),B)[i>>>3>>>0]=BigInt(e),0):28}var ro=[],ru=(e,r)=>{ro.length=0;for(var i;i=(S(),I)[e++>>>0];){var a=105!=i;r+=(a&=112!=i)&&r%8?4:0,ro.push(112==i?(S(),A)[r>>>2>>>0]:106==i?(S(),B)[r>>>3>>>0]:105==i?(S(),C)[r>>>2>>>0]:(S(),R)[r>>>3>>>0]),r+=a?8:4}return ro};function rl(e,r,i){return e>>>=0,r=ru(r>>>0,i>>>0),iP[e](...r)}function rd(e,r,i){return e>>>=0,r=ru(r>>>0,i>>>0),iP[e](...r)}var rp=()=>{};function rc(e,r){return v(eO(e>>>0,r>>>0))}var rh=()=>{throw Q+=1,"unwind"};function rf(){return 0xffff0000}var rm=()=>navigator.hardwareConcurrency,rg={},ry=e=>{var r;return(r=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e))?+r[1]:(r=/:(\d+):\d+(?:\)|$)/.exec(e))?0x80000000|r[1]:0},r_=e=>{for(var r of e)(e=ry(r))&&(rg[e]=r)};function rb(){var e=Error().stack.toString().split(`
`);return"Error"==e[0]&&e.shift(),r_(e),rg.sd=ry(e[3]),rg.Md=e,rg.sd}function r$(e){if(!(e=rg[e>>>0]))return 0;if(r=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e))e=r[1];else if(r=/^\s+at (.*) \(.*\)$/.exec(e))e=r[1];else{if(!(r=/^(.+?)@/.exec(e)))return 0;e=r[1]}rD(r$.td??0),r=ta(e)+1;var r,i=rP(r);return i&&ti(e,i,r),r$.td=i,r$.td}function rv(e){e>>>=0;var r=(S(),I).length;if(e<=r||0xffff0000<e)return!1;for(var i=1;4>=i;i*=2){var a=r*(1+.2/i);a=Math.min(a,e+0x6000000);e:{a=(Math.min(0xffff0000,65536*Math.ceil(Math.max(e,a)/65536))-eu.buffer.byteLength+65535)/65536|0;try{eu.grow(a),P();var n=1;break e}catch{}n=void 0}if(n)return!0}return!1}function rw(e,r,i){if(e>>>=0,r>>>=0,rg.sd==e)var a=rg.Md;else"Error"==(a=Error().stack.toString().split(`
`))[0]&&a.shift(),r_(a);for(var n=3;a[n]&&ry(a[n])!=e;)++n;for(e=0;e<i&&a[e+n];++e)(S(),C)[r+4*e>>>2>>>0]=ry(a[e+n]);return e}var rx,rS={},rk=()=>{if(!rx){var e,r={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(e in rS)void 0===rS[e]?delete r[e]:r[e]=rS[e];var i=[];for(e in r)i.push(`${e}=${r[e]}`);rx=i}return rx};function rT(e,r){if(a)return Z(19,1,e,r);e>>>=0,r>>>=0;var i,n=0,s=0;for(i of rk()){var o=r+n;(S(),A)[e+s>>>2>>>0]=o,n+=ti(i,o,1/0)+1,s+=4}return 0}function rI(e,r){if(a)return Z(20,1,e,r);e>>>=0,r>>>=0;var i=rk();for(var n of((S(),A)[e>>>2>>>0]=i.length,e=0,i))e+=ta(n)+1;return(S(),A)[r>>>2>>>0]=e,0}function rE(e){return a?Z(21,1,e):52}function rz(e,r,i,n){return a?Z(22,1,e,r,i,n):52}function rC(e,r,i,n){return a?Z(23,1,e,r,i,n):70}var rA=[null,[],[]];function rO(e,r,i,n){if(a)return Z(24,1,e,r,i,n);r>>>=0,i>>>=0,n>>>=0;for(var s=0,o=0;o<i;o++){var u=(S(),A)[r>>>2>>>0],l=(S(),A)[r+4>>>2>>>0];r+=8;for(var d=0;d<l;d++){var p=(S(),I)[u+d>>>0],c=rA[e];0===p||10===p?((1===e?$:v)(eA(c)),c.length=0):c.push(p)}s+=l}return(S(),A)[n>>>2>>>0]=s,0}function rR(e){return e>>>0}a||function(){for(var r=e.numThreads-1;r--;)eo();H.push(async()=>{var e=async function(){if(!a)return Promise.all(ee.map(es))}();F++,await e,0==--F&&j&&(e=j,j=null,e())})}(),a||(eu=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),P()),e.wasmBinary&&(c=e.wasmBinary),e.stackSave=()=>rX(),e.stackRestore=e=>rQ(e),e.stackAlloc=e=>rZ(e),e.setValue=function(e,r,i="i8"){switch(i.endsWith("*")&&(i="*"),i){case"i1":case"i8":(S(),T)[e>>>0]=r;break;case"i16":(S(),E)[e>>>1>>>0]=r;break;case"i32":(S(),C)[e>>>2>>>0]=r;break;case"i64":(S(),B)[e>>>3>>>0]=BigInt(r);break;case"float":(S(),O)[e>>>2>>>0]=r;break;case"double":(S(),R)[e>>>3>>>0]=r;break;case"*":(S(),A)[e>>>2>>>0]=r;break;default:q(`invalid type for setValue: ${i}`)}},e.getValue=function(e,r="i8"){switch(r.endsWith("*")&&(r="*"),r){case"i1":case"i8":return(S(),T)[e>>>0];case"i16":return(S(),E)[e>>>1>>>0];case"i32":return(S(),C)[e>>>2>>>0];case"i64":return(S(),B)[e>>>3>>>0];case"float":return(S(),O)[e>>>2>>>0];case"double":return(S(),R)[e>>>3>>>0];case"*":return(S(),A)[e>>>2>>>0];default:q(`invalid type for getValue: ${r}`)}},e.UTF8ToString=eO,e.stringToUTF8=ti,e.lengthBytesUTF8=ta;var rB,rN,rM,rD,rP,rU,rq,rW,rL,rV,rG,rH,rF,rj,rK,rQ,rZ,rX,rY,rJ,r0,r1,r2,r3,r4,r6,r8,r5,r9,r7,ie,it,ir,ii,ia,is,io,iu,il,id,ip,ic,ih,im,ig,iy,i_,ib,i$,iv,iw,ix,iS,ik,iT,iI,iE,iz,iC,iA,iO,iR,iB,iN,iM,iD=[X,Y,eT,eR,eB,eN,eM,eD,eP,eU,eq,eW,eL,eV,eG,eH,t7,re,ri,rT,rI,rE,rz,rC,rO],iP={929356:(r,i,a,n,s)=>{if(void 0===e||!e.Zc)return 1;if((r=eO(Number(r>>>0))).startsWith("./")&&(r=r.substring(2)),!(r=e.Zc.get(r)))return 2;if(i=Number(i>>>0),a=Number(a>>>0),n=Number(n>>>0),i+a>r.byteLength)return 3;try{let o=r.subarray(i,i+a);switch(s){case 0:(S(),I).set(o,n>>>0);break;case 1:e.Xd?e.Xd(n,o):e.Ld(n,o);break;default:return 4}return 0}catch{return 4}},930180:(r,i,a)=>{e.xd(r,(S(),I).subarray(i>>>0,i+a>>>0))},930244:()=>e.Zd(),930286:r=>{e.vd(r)},930323:()=>{e.Ed()},930354:()=>{e.Fd()},930383:()=>{e.Jd()},930408:r=>e.Dd(r),930441:r=>e.Hd(r),930473:(r,i,a)=>{e.jd(Number(r),Number(i),Number(a),!0)},930536:(r,i,a)=>{e.jd(Number(r),Number(i),Number(a))},930593:()=>"u">typeof wasmOffsetConverter,930650:r=>{e.ac("Abs",r,void 0)},930701:r=>{e.ac("Neg",r,void 0)},930752:r=>{e.ac("Floor",r,void 0)},930805:r=>{e.ac("Ceil",r,void 0)},930857:r=>{e.ac("Reciprocal",r,void 0)},930915:r=>{e.ac("Sqrt",r,void 0)},930967:r=>{e.ac("Exp",r,void 0)},931018:r=>{e.ac("Erf",r,void 0)},931069:r=>{e.ac("Sigmoid",r,void 0)},931124:(r,i,a)=>{e.ac("HardSigmoid",r,{alpha:i,beta:a})},931203:r=>{e.ac("Log",r,void 0)},931254:r=>{e.ac("Sin",r,void 0)},931305:r=>{e.ac("Cos",r,void 0)},931356:r=>{e.ac("Tan",r,void 0)},931407:r=>{e.ac("Asin",r,void 0)},931459:r=>{e.ac("Acos",r,void 0)},931511:r=>{e.ac("Atan",r,void 0)},931563:r=>{e.ac("Sinh",r,void 0)},931615:r=>{e.ac("Cosh",r,void 0)},931667:r=>{e.ac("Asinh",r,void 0)},931720:r=>{e.ac("Acosh",r,void 0)},931773:r=>{e.ac("Atanh",r,void 0)},931826:r=>{e.ac("Tanh",r,void 0)},931878:r=>{e.ac("Not",r,void 0)},931929:(r,i,a)=>{e.ac("Clip",r,{min:i,max:a})},931998:r=>{e.ac("Clip",r,void 0)},932050:(r,i)=>{e.ac("Elu",r,{alpha:i})},932108:r=>{e.ac("Gelu",r,void 0)},932160:r=>{e.ac("Relu",r,void 0)},932212:(r,i)=>{e.ac("LeakyRelu",r,{alpha:i})},932276:(r,i)=>{e.ac("ThresholdedRelu",r,{alpha:i})},932346:(r,i)=>{e.ac("Cast",r,{to:i})},932404:r=>{e.ac("Add",r,void 0)},932455:r=>{e.ac("Sub",r,void 0)},932506:r=>{e.ac("Mul",r,void 0)},932557:r=>{e.ac("Div",r,void 0)},932608:r=>{e.ac("Pow",r,void 0)},932659:r=>{e.ac("Equal",r,void 0)},932712:r=>{e.ac("Greater",r,void 0)},932767:r=>{e.ac("GreaterOrEqual",r,void 0)},932829:r=>{e.ac("Less",r,void 0)},932881:r=>{e.ac("LessOrEqual",r,void 0)},932940:(r,i,a,n,s)=>{e.ac("ReduceMean",r,{keepDims:!!i,noopWithEmptyAxes:!!a,axes:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},933115:(r,i,a,n,s)=>{e.ac("ReduceMax",r,{keepDims:!!i,noopWithEmptyAxes:!!a,axes:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},933289:(r,i,a,n,s)=>{e.ac("ReduceMin",r,{keepDims:!!i,noopWithEmptyAxes:!!a,axes:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},933463:(r,i,a,n,s)=>{e.ac("ReduceProd",r,{keepDims:!!i,noopWithEmptyAxes:!!a,axes:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},933638:(r,i,a,n,s)=>{e.ac("ReduceSum",r,{keepDims:!!i,noopWithEmptyAxes:!!a,axes:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},933812:(r,i,a,n,s)=>{e.ac("ReduceL1",r,{keepDims:!!i,noopWithEmptyAxes:!!a,axes:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},933985:(r,i,a,n,s)=>{e.ac("ReduceL2",r,{keepDims:!!i,noopWithEmptyAxes:!!a,axes:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},934158:(r,i,a,n,s)=>{e.ac("ReduceLogSum",r,{keepDims:!!i,noopWithEmptyAxes:!!a,axes:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},934335:(r,i,a,n,s)=>{e.ac("ReduceSumSquare",r,{keepDims:!!i,noopWithEmptyAxes:!!a,axes:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},934515:(r,i,a,n,s)=>{e.ac("ReduceLogSumExp",r,{keepDims:!!i,noopWithEmptyAxes:!!a,axes:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},934695:r=>{e.ac("Where",r,void 0)},934748:(r,i,a)=>{e.ac("Transpose",r,{perm:i?Array.from((S(),C).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},934872:(r,i,a,n)=>{e.ac("DepthToSpace",r,{blocksize:i,mode:eO(a),format:n?"NHWC":"NCHW"})},935005:(r,i,a,n)=>{e.ac("DepthToSpace",r,{blocksize:i,mode:eO(a),format:n?"NHWC":"NCHW"})},935138:(r,i,a,n,s,o,u,l,d,p,c,h,f,m,g)=>{e.ac("ConvTranspose",r,{format:d?"NHWC":"NCHW",autoPad:i,dilations:[a],group:n,kernelShape:[s],pads:[o,u],strides:[l],wIsConst:()=>!!(S(),T)[p>>>0],outputPadding:c?Array.from((S(),C).subarray(Number(c)>>>0,Number(h)>>>0)):[],outputShape:f?Array.from((S(),C).subarray(Number(f)>>>0,Number(m)>>>0)):[],activation:eO(g)})},935571:(r,i,a,n,s,o,u,l,d,p,c,h,f,m)=>{e.ac("ConvTranspose",r,{format:l?"NHWC":"NCHW",autoPad:i,dilations:Array.from((S(),C).subarray(Number(a)>>>0,2+(Number(a)>>>0)>>>0)),group:n,kernelShape:Array.from((S(),C).subarray(Number(s)>>>0,2+(Number(s)>>>0)>>>0)),pads:Array.from((S(),C).subarray(Number(o)>>>0,4+(Number(o)>>>0)>>>0)),strides:Array.from((S(),C).subarray(Number(u)>>>0,2+(Number(u)>>>0)>>>0)),wIsConst:()=>!!(S(),T)[d>>>0],outputPadding:p?Array.from((S(),C).subarray(Number(p)>>>0,Number(c)>>>0)):[],outputShape:h?Array.from((S(),C).subarray(Number(h)>>>0,Number(f)>>>0)):[],activation:eO(m)})},936232:(r,i,a,n,s,o,u,l,d,p,c,h,f,m,g)=>{e.ac("ConvTranspose",r,{format:d?"NHWC":"NCHW",autoPad:i,dilations:[a],group:n,kernelShape:[s],pads:[o,u],strides:[l],wIsConst:()=>!!(S(),T)[p>>>0],outputPadding:c?Array.from((S(),C).subarray(Number(c)>>>0,Number(h)>>>0)):[],outputShape:f?Array.from((S(),C).subarray(Number(f)>>>0,Number(m)>>>0)):[],activation:eO(g)})},936665:(r,i,a,n,s,o,u,l,d,p,c,h,f,m)=>{e.ac("ConvTranspose",r,{format:l?"NHWC":"NCHW",autoPad:i,dilations:Array.from((S(),C).subarray(Number(a)>>>0,2+(Number(a)>>>0)>>>0)),group:n,kernelShape:Array.from((S(),C).subarray(Number(s)>>>0,2+(Number(s)>>>0)>>>0)),pads:Array.from((S(),C).subarray(Number(o)>>>0,4+(Number(o)>>>0)>>>0)),strides:Array.from((S(),C).subarray(Number(u)>>>0,2+(Number(u)>>>0)>>>0)),wIsConst:()=>!!(S(),T)[d>>>0],outputPadding:p?Array.from((S(),C).subarray(Number(p)>>>0,Number(c)>>>0)):[],outputShape:h?Array.from((S(),C).subarray(Number(h)>>>0,Number(f)>>>0)):[],activation:eO(m)})},937326:(r,i)=>{e.ac("GlobalAveragePool",r,{format:i?"NHWC":"NCHW"})},937417:(r,i,a,n,s,o,u,l,d,p,c,h,f,m)=>{e.ac("AveragePool",r,{format:m?"NHWC":"NCHW",auto_pad:i,ceil_mode:a,count_include_pad:n,storage_order:s,dilations:o?Array.from((S(),C).subarray(Number(o)>>>0,Number(u)>>>0)):[],kernel_shape:l?Array.from((S(),C).subarray(Number(l)>>>0,Number(d)>>>0)):[],pads:p?Array.from((S(),C).subarray(Number(p)>>>0,Number(c)>>>0)):[],strides:h?Array.from((S(),C).subarray(Number(h)>>>0,Number(f)>>>0)):[]})},937896:(r,i)=>{e.ac("GlobalAveragePool",r,{format:i?"NHWC":"NCHW"})},937987:(r,i,a,n,s,o,u,l,d,p,c,h,f,m)=>{e.ac("AveragePool",r,{format:m?"NHWC":"NCHW",auto_pad:i,ceil_mode:a,count_include_pad:n,storage_order:s,dilations:o?Array.from((S(),C).subarray(Number(o)>>>0,Number(u)>>>0)):[],kernel_shape:l?Array.from((S(),C).subarray(Number(l)>>>0,Number(d)>>>0)):[],pads:p?Array.from((S(),C).subarray(Number(p)>>>0,Number(c)>>>0)):[],strides:h?Array.from((S(),C).subarray(Number(h)>>>0,Number(f)>>>0)):[]})},938466:(r,i)=>{e.ac("GlobalMaxPool",r,{format:i?"NHWC":"NCHW"})},938553:(r,i,a,n,s,o,u,l,d,p,c,h,f,m)=>{e.ac("MaxPool",r,{format:m?"NHWC":"NCHW",auto_pad:i,ceil_mode:a,count_include_pad:n,storage_order:s,dilations:o?Array.from((S(),C).subarray(Number(o)>>>0,Number(u)>>>0)):[],kernel_shape:l?Array.from((S(),C).subarray(Number(l)>>>0,Number(d)>>>0)):[],pads:p?Array.from((S(),C).subarray(Number(p)>>>0,Number(c)>>>0)):[],strides:h?Array.from((S(),C).subarray(Number(h)>>>0,Number(f)>>>0)):[]})},939028:(r,i)=>{e.ac("GlobalMaxPool",r,{format:i?"NHWC":"NCHW"})},939115:(r,i,a,n,s,o,u,l,d,p,c,h,f,m)=>{e.ac("MaxPool",r,{format:m?"NHWC":"NCHW",auto_pad:i,ceil_mode:a,count_include_pad:n,storage_order:s,dilations:o?Array.from((S(),C).subarray(Number(o)>>>0,Number(u)>>>0)):[],kernel_shape:l?Array.from((S(),C).subarray(Number(l)>>>0,Number(d)>>>0)):[],pads:p?Array.from((S(),C).subarray(Number(p)>>>0,Number(c)>>>0)):[],strides:h?Array.from((S(),C).subarray(Number(h)>>>0,Number(f)>>>0)):[]})},939590:(r,i,a,n,s)=>{e.ac("Gemm",r,{alpha:i,beta:a,transA:n,transB:s})},939694:r=>{e.ac("MatMul",r,void 0)},939748:(r,i,a,n)=>{e.ac("ArgMax",r,{keepDims:!!i,selectLastIndex:!!a,axis:n})},939856:(r,i,a,n)=>{e.ac("ArgMin",r,{keepDims:!!i,selectLastIndex:!!a,axis:n})},939964:(r,i)=>{e.ac("Softmax",r,{axis:i})},940027:(r,i)=>{e.ac("Concat",r,{axis:i})},940087:(r,i,a,n,s)=>{e.ac("Split",r,{axis:i,numOutputs:a,splitSizes:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},940243:r=>{e.ac("Expand",r,void 0)},940297:(r,i)=>{e.ac("Gather",r,{axis:Number(i)})},940368:(r,i)=>{e.ac("GatherElements",r,{axis:Number(i)})},940447:(r,i)=>{e.ac("GatherND",r,{batch_dims:Number(i)})},940526:(r,i,a,n,s,o,u,l,d,p,c)=>{e.ac("Resize",r,{antialias:i,axes:a?Array.from((S(),C).subarray(Number(a)>>>0,Number(n)>>>0)):[],coordinateTransformMode:eO(s),cubicCoeffA:o,excludeOutside:u,extrapolationValue:l,keepAspectRatioPolicy:eO(d),mode:eO(p),nearestMode:eO(c)})},940888:(r,i,a,n,s,o,u)=>{e.ac("Slice",r,{starts:i?Array.from((S(),C).subarray(Number(i)>>>0,Number(a)>>>0)):[],ends:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[],axes:o?Array.from((S(),C).subarray(Number(o)>>>0,Number(u)>>>0)):[]})},941152:r=>{e.ac("Tile",r,void 0)},941204:(r,i,a)=>{e.ac("InstanceNormalization",r,{epsilon:i,format:a?"NHWC":"NCHW"})},941318:(r,i,a)=>{e.ac("InstanceNormalization",r,{epsilon:i,format:a?"NHWC":"NCHW"})},941432:r=>{e.ac("Range",r,void 0)},941485:(r,i)=>{e.ac("Einsum",r,{equation:eO(i)})},941566:(r,i,a,n,s)=>{e.ac("Pad",r,{mode:i,value:a,pads:n?Array.from((S(),C).subarray(Number(n)>>>0,Number(s)>>>0)):[]})},941709:(r,i,a,n,s,o)=>{e.ac("BatchNormalization",r,{epsilon:i,momentum:a,spatial:!!s,trainingMode:!!n,format:o?"NHWC":"NCHW"})},941878:(r,i,a,n,s,o)=>{e.ac("BatchNormalization",r,{epsilon:i,momentum:a,spatial:!!s,trainingMode:!!n,format:o?"NHWC":"NCHW"})},942047:(r,i,a)=>{e.ac("CumSum",r,{exclusive:Number(i),reverse:Number(a)})},942144:(r,i,a)=>{e.ac("DequantizeLinear",r,{axis:i,blockSize:a})},942234:(r,i,a,n,s)=>{e.ac("GridSample",r,{align_corners:i,mode:eO(a),padding_mode:eO(n),format:s?"NHWC":"NCHW"})},942404:(r,i,a,n,s)=>{e.ac("GridSample",r,{align_corners:i,mode:eO(a),padding_mode:eO(n),format:s?"NHWC":"NCHW"})},942574:(r,i)=>{e.ac("ScatterND",r,{reduction:eO(i)})},942659:(r,i,a,n,s,o,u,l,d)=>{e.ac("Attention",r,{numHeads:i,isUnidirectional:a,maskFilterValue:n,scale:s,doRotary:o,qkvHiddenSizes:u?Array.from((S(),C).subarray(Number(l)>>>0,Number(l)+u>>>0)):[],pastPresentShareBuffer:!!d})},942931:r=>{e.ac("BiasAdd",r,void 0)},942986:r=>{e.ac("BiasSplitGelu",r,void 0)},943047:r=>{e.ac("FastGelu",r,void 0)},943103:(r,i,a,n,s,o,u,l,d,p,c,h,f,m,g,y)=>{e.ac("Conv",r,{format:h?"NHWC":"NCHW",auto_pad:i,dilations:a?Array.from((S(),C).subarray(Number(a)>>>0,Number(n)>>>0)):[],group:s,kernel_shape:o?Array.from((S(),C).subarray(Number(o)>>>0,Number(u)>>>0)):[],pads:l?Array.from((S(),C).subarray(Number(l)>>>0,Number(d)>>>0)):[],strides:p?Array.from((S(),C).subarray(Number(p)>>>0,Number(c)>>>0)):[],w_is_const:()=>!!(S(),T)[Number(f)>>>0],activation:eO(m),activation_params:g?Array.from((S(),O).subarray(Number(g)>>>0,Number(y)>>>0)):[]})},943687:r=>{e.ac("Gelu",r,void 0)},943739:(r,i,a,n,s,o,u,l,d)=>{e.ac("GroupQueryAttention",r,{numHeads:i,kvNumHeads:a,scale:n,softcap:s,doRotary:o,rotaryInterleaved:u,smoothSoftmax:l,localWindowSize:d})},943956:(r,i,a,n)=>{e.ac("LayerNormalization",r,{axis:i,epsilon:a,simplified:!!n})},944067:(r,i,a,n)=>{e.ac("LayerNormalization",r,{axis:i,epsilon:a,simplified:!!n})},944178:(r,i,a,n,s,o)=>{e.ac("MatMulNBits",r,{k:i,n:a,accuracyLevel:n,bits:s,blockSize:o})},944305:(r,i,a,n,s,o)=>{e.ac("MultiHeadAttention",r,{numHeads:i,isUnidirectional:a,maskFilterValue:n,scale:s,doRotary:o})},944464:(r,i)=>{e.ac("QuickGelu",r,{alpha:i})},944528:(r,i,a,n,s)=>{e.ac("RotaryEmbedding",r,{interleaved:!!i,numHeads:a,rotaryEmbeddingDim:n,scale:s})},944667:(r,i,a)=>{e.ac("SkipLayerNormalization",r,{epsilon:i,simplified:!!a})},944769:(r,i,a)=>{e.ac("SkipLayerNormalization",r,{epsilon:i,simplified:!!a})},944871:(r,i,a,n)=>{e.ac("GatherBlockQuantized",r,{gatherAxis:i,quantizeAxis:a,blockSize:n})},944992:r=>{e.Id(r)},945026:(r,i)=>e.Kd(Number(r),Number(i),e.$c.Nd,e.$c.errors)};function iU(r,i,a){return tD(async()=>{await e.Gd(Number(r),Number(i),Number(a))})}function iq(){return"u">typeof wasmOffsetConverter}function iW(e,r,i,a){var n=rX();try{return it(e,r,i,a)}catch(e){if(rQ(n),e!==e+0)throw e;rF(1,0)}}function iL(e,r,i){var a=rX();try{return r5(e,r,i)}catch(e){if(rQ(a),e!==e+0)throw e;rF(1,0)}}function iV(e,r,i){var a=rX();try{r2(e,r,i)}catch(e){if(rQ(a),e!==e+0)throw e;rF(1,0)}}function iG(e,r){var i=rX();try{return r3(e,r)}catch(e){if(rQ(i),e!==e+0)throw e;rF(1,0)}}function iH(e){var r=rX();try{r4(e)}catch(e){if(rQ(r),e!==e+0)throw e;rF(1,0)}}function iF(e,r,i,a,n,s,o){var u=rX();try{return r7(e,r,i,a,n,s,o)}catch(e){if(rQ(u),e!==e+0)throw e;rF(1,0)}}function ij(e,r){var i=rX();try{ir(e,r)}catch(e){if(rQ(i),e!==e+0)throw e;rF(1,0)}}function iK(e,r,i,a,n,s){var o=rX();try{r6(e,r,i,a,n,s)}catch(e){if(rQ(o),e!==e+0)throw e;rF(1,0)}}function iQ(e,r,i,a){var n=rX();try{ie(e,r,i,a)}catch(e){if(rQ(n),e!==e+0)throw e;rF(1,0)}}function iZ(e,r,i,a,n){var s=rX();try{r8(e,r,i,a,n)}catch(e){if(rQ(s),e!==e+0)throw e;rF(1,0)}}function iX(e,r,i,a,n,s,o){var u=rX();try{ia(e,r,i,a,n,s,o)}catch(e){if(rQ(u),e!==e+0)throw e;rF(1,0)}}function iY(e,r,i,a,n,s,o){var u=rX();try{is(e,r,i,a,n,s,o)}catch(e){if(rQ(u),e!==e+0)throw e;rF(1,0)}}function iJ(e,r,i,a,n,s,o,u){var l=rX();try{id(e,r,i,a,n,s,o,u)}catch(e){if(rQ(l),e!==e+0)throw e;rF(1,0)}}function i0(e,r,i,a,n){var s=rX();try{return ii(e,r,i,a,n)}catch(e){if(rQ(s),e!==e+0)throw e;rF(1,0)}}function i1(e,r,i,a,n,s,o,u){var l=rX();try{ip(e,r,i,a,n,s,o,u)}catch(e){if(rQ(l),e!==e+0)throw e;rF(1,0)}}function i2(e,r,i,a,n,s,o,u,l,d,p,c){var h=rX();try{io(e,r,i,a,n,s,o,u,l,d,p,c)}catch(e){if(rQ(h),e!==e+0)throw e;rF(1,0)}}function i3(e,r,i,a,n,s){var o=rX();try{return iu(e,r,i,a,n,s)}catch(e){if(rQ(o),e!==e+0)throw e;rF(1,0)}}function i4(e,r,i){var a=rX();try{return ic(e,r,i)}catch(e){if(rQ(a),e!==e+0)throw e;return rF(1,0),0n}}function i6(e,r,i,a,n,s,o,u,l){var d=rX();try{r9(e,r,i,a,n,s,o,u,l)}catch(e){if(rQ(d),e!==e+0)throw e;rF(1,0)}}function i8(e){var r=rX();try{return ih(e)}catch(e){if(rQ(r),e!==e+0)throw e;rF(1,0)}}function i5(e,r,i){var a=rX();try{return im(e,r,i)}catch(e){if(rQ(a),e!==e+0)throw e;rF(1,0)}}function i9(e,r){var i=rX();try{return iA(e,r)}catch(e){if(rQ(i),e!==e+0)throw e;return rF(1,0),0n}}function i7(e,r,i,a,n){var s=rX();try{ig(e,r,i,a,n)}catch(e){if(rQ(s),e!==e+0)throw e;rF(1,0)}}function ae(e){var r=rX();try{return iy(e)}catch(e){if(rQ(r),e!==e+0)throw e;return rF(1,0),0n}}function at(e,r,i,a,n,s){var o=rX();try{return ix(e,r,i,a,n,s)}catch(e){if(rQ(o),e!==e+0)throw e;rF(1,0)}}function ar(e,r,i,a,n,s){var o=rX();try{return iS(e,r,i,a,n,s)}catch(e){if(rQ(o),e!==e+0)throw e;rF(1,0)}}function ai(e,r,i,a,n,s,o,u){var l=rX();try{return il(e,r,i,a,n,s,o,u)}catch(e){if(rQ(l),e!==e+0)throw e;rF(1,0)}}function aa(e,r,i,a,n){var s=rX();try{return ik(e,r,i,a,n)}catch(e){if(rQ(s),e!==e+0)throw e;return rF(1,0),0n}}function an(e,r,i,a){var n=rX();try{return iT(e,r,i,a)}catch(e){if(rQ(n),e!==e+0)throw e;rF(1,0)}}function as(e,r,i,a){var n=rX();try{return iI(e,r,i,a)}catch(e){if(rQ(n),e!==e+0)throw e;rF(1,0)}}function ao(e,r,i,a,n,s,o,u,l,d,p,c){var h=rX();try{return iE(e,r,i,a,n,s,o,u,l,d,p,c)}catch(e){if(rQ(h),e!==e+0)throw e;rF(1,0)}}function au(e,r,i,a,n,s,o,u,l,d,p){var c=rX();try{iv(e,r,i,a,n,s,o,u,l,d,p)}catch(e){if(rQ(c),e!==e+0)throw e;rF(1,0)}}function al(e,r,i,a,n,s,o,u,l,d,p,c,h,f,m,g){var y=rX();try{iw(e,r,i,a,n,s,o,u,l,d,p,c,h,f,m,g)}catch(e){if(rQ(y),e!==e+0)throw e;rF(1,0)}}function ad(e,r,i,a){var n=rX();try{return iz(e,r,i,a)}catch(e){if(rQ(n),e!==e+0)throw e;rF(1,0)}}function ap(e,r,i,a,n){var s=rX();try{return iC(e,r,i,a,n)}catch(e){if(rQ(s),e!==e+0)throw e;rF(1,0)}}function ac(e,r,i){var a=rX();try{return i_(e,r,i)}catch(e){if(rQ(a),e!==e+0)throw e;rF(1,0)}}function ah(e,r,i){var a=rX();try{return ib(e,r,i)}catch(e){if(rQ(a),e!==e+0)throw e;rF(1,0)}}function af(e,r,i,a){var n=rX();try{i$(e,r,i,a)}catch(e){if(rQ(n),e!==e+0)throw e;rF(1,0)}}function am(){if(0<F)j=am;else if(a)m?.(e),U();else{for(;0<H.length;)H.shift()(e);0<F?j=am:(e.calledRun=!0,w||(U(),m?.(e)))}}return a||(iM=await L(),am()),e.PTR_SIZE=4,D?e:new Promise((e,r)=>{m=e,g=r})}W(ef,{default:()=>eg});var eg,ey,e_,eb,e$,ev,ew,ex,eS,ek,eT,eI,eE,ez,eC,eA,eO,eR,eB,eN,eM,eD,eP,eU,eq,eW,eL,eV,eG,eH,eF,ej,eK,eQ,eZ,eX,eY,eJ,e0,e1,e2,e3,e4,e6,e8,e5,e9,e7,te,tt,tr,ti,ta,tn,ts,to,tu,tl,td,tp,tc,th,tf,tm,tg,ty,t_,tb,t$,tv,tw,tx,tS,tk,tT,tI,tE,tz,tC,tA,tO,tR,tB,tN,tM,tD,tP,tU,tq,tW,tL,tV,tG,tH,tF,tj,tK,tQ,tZ,tX,tY,tJ,t0,t1,t2,t3,t4,t6,t8,t5,t9,t7,re,rt,rr,ri,ra,rn,rs,ro,ru,rl,rd,rp,rc,rh,rf,rm,rg,ry,r_,rb,r$,rv,rw,rx,rS,rk,rT,rI,rE,rz,rC,rA,rO,rR,rB,rN,rM,rD,rP,rU,rq,rW,rL,rV,rG,rH,rF,rj,rK,rQ,rZ,rX,rY,rJ,r0,r1,r2,r3,r4,r6,r8,r5,r9,r7,ie,it,ir,ii,ia,is,io,iu,il,id,ip,ic,ih,im,ig,iy,i_,ib,i$,iv,iw,ix,iS,ik,iT,iI,iE,iz,iC,iA,iO,iR,iB,iN,iM,iD,iP,iU,iq,iW,iL,iV,iG,iH,iF,ij,iK,iQ,iZ,iX,iY,iJ,i0,i1,i2,i3,i4,i6,i8,i5,i9,i7,ae,at,ar,ai,aa,an,as,ao,au,al,ad,ap,ac,ah,af,am,ag,ay,a_,ab,a$,av,aw,ax,aS,ak,aT,aI,aE,az,aC,aA,aO,aR,aB,aN,aM,aD,aP,aU,aq,aW,aL,aV,aG,aH,aF,aj,aK,aQ,aZ,aX,aY,aJ,a0,a1,a2,a3,a4,a6,a8,a5,a9,a7,ne,nt,nr,ni,na,nn,ns,no,nu=q(()=>{"use strict";eg=em,globalThis.self?.name?.startsWith("em-pthread")&&em()}),nl=q(()=>{"use strict";el(),ey=typeof location>"u"?void 0:location.origin,e_=import.meta.url>"file:"&&import.meta.url<"file;",eb=(()=>{if(e_){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,ey).href}return import.meta.url})(),e$=()=>{if(eb&&!eb.startsWith("blob:"))return eb.substring(0,eb.lastIndexOf("/")+1)},ev=(e,r)=>{try{let i=r??eb;return(i?new URL(e,i):new URL(e)).origin===ey}catch{return!1}},ew=async e=>{let r=await (await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},ex=async e=>(await import(e)).default,eS=(eh(),L(ed)).default,ek=async()=>{if(!eb)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(ev(eb))return[void 0,eS()];let e=await ew(eb);return[e,eS(e)]},eT=(nu(),L(ef)).default,eI=async(e,r,i,a)=>{let n=eT&&!(e||r);if(n)if(eb)n=ev(eb)||a&&!i;else if(a&&!i)n=!0;else throw Error("cannot determine the script source URL.");if(n)return[void 0,eT];{let a,n,s="ort-wasm-simd-threaded.jsep.mjs",o=e??((e,r)=>{let i=r??eb;try{return(i?new URL(e,i):new URL(e)).href}catch{return}})(s,r),u=i&&o&&!ev(o,r),l=u?await ew(o):o??(a=s,n=r,`${n??"./"}${a}`);return[u?l:void 0,await ex(l)]}}}),nd=q(()=>{"use strict";nl(),ez=!1,eC=!1,eA=!1,eO=async e=>{if(ez)return Promise.resolve();if(eC)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(eA)throw Error("previous call to 'initializeWebAssembly()' failed.");eC=!0;let r=e.initTimeout,i=e.numThreads;if(!1!==e.simd){if("relaxed"===e.simd){if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}})())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}})())throw Error("WebAssembly SIMD is not supported in the current environment.")}let a=(()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}})();i>1&&!a&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=i=1);let n=e.wasmPaths,s="string"==typeof n?n:void 0,o=n?.mjs,u=o?.href??o,l=n?.wasm,d=l?.href??l,p=e.wasmBinary,[c,h]=await eI(u,s,i>1,!!p||!!d),f=!1,m=[];if(r>0&&m.push(new Promise(e=>{setTimeout(()=>{f=!0,e()},r)})),m.push(new Promise((e,r)=>{let a={numThreads:i};if(p)a.wasmBinary=p,a.locateFile=e=>e;else if(d||s)a.locateFile=e=>d??s+e;else if(u&&0!==u.indexOf("blob:"))a.locateFile=e=>new URL(e,u).href;else if(c){let e=e$();e&&(a.locateFile=r=>e+r)}h(a).then(r=>{eC=!1,ez=!0,eE=r,e(),c&&URL.revokeObjectURL(c)},e=>{eC=!1,eA=!0,r(e)})})),await Promise.race(m),f)throw Error(`WebAssembly backend initializing failed due to timeout: ${r}ms`)},eR=()=>{if(ez&&eE)return eE;throw Error("WebAssembly is not initialized yet.")}}),np=q(()=>{"use strict";nd(),eB=(e,r)=>{let i=eR(),a=i.lengthBytesUTF8(e)+1,n=i._malloc(a);return i.stringToUTF8(e,n,a),r.push(n),n},eN=(e,r,i,a)=>{if("object"==typeof e&&null!==e){if(i.has(e))throw Error("Circular reference in options");i.add(e)}Object.entries(e).forEach(([e,n])=>{let s=r?r+e:e;if("object"==typeof n)eN(n,s+".",i,a);else if("string"==typeof n||"number"==typeof n)a(s,n.toString());else if("boolean"==typeof n)a(s,n?"1":"0");else throw Error(`Can't handle extra config type: ${typeof n}`)})},eM=e=>{let r=eR(),i=r.stackSave();try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);r._OrtGetLastError(a,a+i);let n=Number(r.getValue(a,4===i?"i32":"i64")),s=r.getValue(a+i,"*"),o=s?r.UTF8ToString(s):"";throw Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${o}`)}finally{r.stackRestore(i)}}}),nc=q(()=>{"use strict";nd(),np(),eD=e=>{let r=eR(),i=0,a=[],n=e||{};try{if(e?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if("number"!=typeof e.logSeverityLevel||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if("number"!=typeof e.logVerbosityLevel||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(n.terminate=!1);let s=0;return e?.tag!==void 0&&(s=eB(e.tag,a)),i=r._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,s),0===i&&eM("Can't create run options."),e?.extra!==void 0&&eN(e.extra,"",new WeakSet,(e,n)=>{let s=eB(e,a),o=eB(n,a);0!==r._OrtAddRunConfigEntry(i,s,o)&&eM(`Can't set a run config entry: ${e} - ${n}.`)}),[i,a]}catch(e){throw 0!==i&&r._OrtReleaseRunOptions(i),a.forEach(e=>r._free(e)),e}}}),nh=q(()=>{"use strict";nd(),np(),eP=(e,r,i,a)=>{let n=eB(r,a),s=eB(i,a);0!==eR()._OrtAddSessionConfigEntry(e,n,s)&&eM(`Can't set a session config entry: ${r} - ${i}.`)},eU=async(e,r,i)=>{for(let a of r.executionProviders){let r="string"==typeof a?a:a.name,n=[];switch(r){case"webnn":if(r="WEBNN","string"!=typeof a){let r=a?.deviceType;r&&eP(e,"deviceType",r,i)}break;case"webgpu":if(r="JS","string"!=typeof a&&a?.preferredLayout){if("NCHW"!==a.preferredLayout&&"NHWC"!==a.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);eP(e,"preferredLayout",a.preferredLayout,i)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${r}`)}let s=eB(r,i),o=n.length,u=0,l=0;if(o>0){u=eR()._malloc(o*eR().PTR_SIZE),i.push(u),l=eR()._malloc(o*eR().PTR_SIZE),i.push(l);for(let e=0;e<o;e++)eR().setValue(u+e*eR().PTR_SIZE,n[e][0],"*"),eR().setValue(l+e*eR().PTR_SIZE,n[e][1],"*")}await eR()._OrtAppendExecutionProvider(e,s,u,l,o)!==0&&eM(`Can't append execution provider: ${r}.`)}},eq=async e=>{var r;let i,a=eR(),n=0,s=[],o=e||{};(r=o).extra||(r.extra={}),r.extra.session||(r.extra.session={}),(i=r.extra.session).use_ort_model_bytes_directly||(i.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(e=>("string"==typeof e?e:e.name)==="webgpu")&&(r.enableMemPattern=!1);try{let e=(e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}})(o.graphOptimizationLevel??"all"),r=(e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${e}`)}})(o.executionMode??"sequential"),i="string"==typeof o.logId?eB(o.logId,s):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log severity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw Error(`log verbosity level is not valid: ${l}`);let d="string"==typeof o.optimizedModelFilePath?eB(o.optimizedModelFilePath,s):0;if(n=a._OrtCreateSessionOptions(e,!!o.enableCpuMemArena,!!o.enableMemPattern,r,!!o.enableProfiling,0,i,u,l,d),0===n&&eM("Can't create session options."),o.executionProviders&&await eU(n,o,s),void 0!==o.enableGraphCapture){if("boolean"!=typeof o.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);eP(n,"enableGraphCapture",o.enableGraphCapture.toString(),s)}if(o.freeDimensionOverrides)for(let[e,r]of Object.entries(o.freeDimensionOverrides)){if("string"!=typeof e)throw Error(`free dimension override name must be a string: ${e}`);if("number"!=typeof r||!Number.isInteger(r)||r<0)throw Error(`free dimension override value must be a non-negative integer: ${r}`);let i=eB(e,s);0!==a._OrtAddFreeDimensionOverride(n,i,r)&&eM(`Can't set a free dimension override: ${e} - ${r}.`)}return void 0!==o.extra&&eN(o.extra,"",new WeakSet,(e,r)=>{eP(n,e,r,s)}),[n,s]}catch(e){throw 0!==n&&0!==a._OrtReleaseSessionOptions(n)&&eM("Can't release session options."),s.forEach(e=>a._free(e)),e}}}),nf=q(()=>{"use strict";eW=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${e}`)}},eL=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${e}`)}},eV=(e,r)=>{let i=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],a="number"==typeof r?r:r.reduce((e,r)=>e*r,1);return i>0?Math.ceil(a*i):void 0},eG=e=>{switch(e){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},eH=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${e}`)}},eF=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,ej=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint64"===e||"int8"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,eK=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${e}`)}}}),nm=q(()=>{"use strict";el(),eQ=async e=>{if("string"!=typeof e)return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e);{let r=await fetch(e);if(!r.ok)throw Error(`failed to load external data file: ${e}`);let i=r.headers.get("Content-Length"),a=i?parseInt(i,10):0;if(a<0x40000000)return new Uint8Array(await r.arrayBuffer());{if(!r.body)throw Error(`failed to load external data file: ${e}, no response body.`);let i=r.body.getReader(),n;try{n=new ArrayBuffer(a)}catch(e){if(e instanceof RangeError){let e=Math.ceil(a/65536);n=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let s=0;for(;;){let{done:e,value:r}=await i.read();if(e)break;let a=r.byteLength;new Uint8Array(n,s,a).set(r),s+=a}return new Uint8Array(n,0,a)}}}}),ng=q(()=>{"use strict";nf(),eZ=["V","I","W","E","F"],eJ=(e,r)=>{eX=e,eY=r},e0=(...e)=>{eY&&((e,r)=>{var i,a;let n=eH(e);n>=eH(eX)&&(i=n,a="function"==typeof r?r():r,console.log(`[${eZ[i]},${new Date().toISOString()}]${a}`))})(...e)}}),ny=q(()=>{"use strict";e1=class{static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},e2=class{static calcShape(e,r,i=!1){let a=e.length,n=r.length;if(0===a)return r;if(0===n)return e;let s=Math.max(e.length,r.length),o=Array(s);if(i){if(a<2||n<2)return;let i=e1.calcMatMulShape([e[a-2],e[a-1]],[r[n-2],r[n-1]]);if(void 0===i)return;[o[s-2],o[s-1]]=i}for(let u=i?3:1;u<=s;u++){let i=a-u<0?1:e[a-u],l=n-u<0?1:r[n-u];if(i!==l&&i>1&&l>1)return;let d=Math.max(i,l);if(i&&l)o[s-u]=Math.max(i,l);else{if(d>1)return;o[s-u]=0}}return o}static isValidBroadcast(e,r){let i=e.length,a=r.length;if(i>a)return!1;for(let n=1;n<=i;n++)if(1!==e[i-n]&&e[i-n]!==r[a-n])return!1;return!0}},e3=class e{static size(r){return e.getSizeFromDimensionRange(r,0,r.length)}static convertShape(e,r=4){let i=e.length;if(0===i)return[];let a=Array(i),n=i-1;for(;n>=0;){if(e[n]%r==0){a[n]=e[n]/r;break}if(r%e[n]!=0)throw Error("cannot convert shape");a[n]=1,r/=e[n],n--}for(n--;n>=0;n--)a[n]=e[n];return a}static sizeFromDimension(r,i){if(i<0||i>r.length)throw Error(`invalid dimension of ${i} for sizeFromDimension as Tensor has ${r.length} dimensions.`);return e.getSizeFromDimensionRange(r,i,r.length)}static sizeToDimension(r,i){if(i<0||i>r.length)throw Error(`invalid dimension of ${i} for sizeToDimension as Tensor has ${r.length} dimensions.`);return e.getSizeFromDimensionRange(r,0,i)}static getSizeFromDimensionRange(e,r,i){let a=1;for(let n=r;n<i;n++){if(e[n]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(e[n])}return a}static computeStrides(e){let r=e.length;if(0===r)return[];if(1===r)return[1];let i=Array(r);i[r-1]=1,i[r-2]=e[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*e[a+1];return i}static normalizeAxis(e,r){if(e<-r&&e>=r)throw Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(i=>this.normalizeAxis(i,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(r=>e[r]):e.slice().reverse()}static padShape(e,r){let i=e.length;return e.map((e,a)=>e+r[a]+r[a+i])}static areEqual(e,r){return e.length===r.length&&e.every((e,i)=>e===r[i])}},e4=class e{static adjustPoolAttributes(e,r,i,a,n,s){if(!e&&i.length!==r.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<r.length-2;e++)e>=i.length?i.push(r[e+2]):i[e]=r[e+2];for(let e=0;e<i.length;e++)if(e<a.length){if(a[e]<0)throw Error("strides should be greater than or equal to 1")}else a.push(1);for(let e=0;e<i.length;e++)if(e<n.length){if(n[e]<0)throw Error("dilations should be greater than or equal to 1")}else n.push(1);for(let e=0;e<2*i.length;e++)if(e<s.length){if(s[e]<0)throw Error("pad should be greater than or equal to 1")}else s.push(0);for(let e=0;e<i.length;e++){if(i[e]<=0)throw Error("kernel shapes need to be greater than 0");if(s[e]>=i[e]||s[e+i.length]>=i[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(r,i,a,n,s,o,u){if(u){if(s.length!==2*(r.length-2))throw Error("length of pads should be twice the length of data dimensions");if(i.length!==r.length-2)throw Error("length of strides should be the length of data dimensions");if(n.length!==r.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<r.length-2;l++)e.adjustPadAndReturnShape(r[l+(o?1:2)],i[l],a[l],n[l],s,l,l+r.length-2,u)}}static computePoolOutputShape(r,i,a,n,s,o,u){if(i.length<=0)throw Error("input shape must be of size greater than 0");let l=[i[0],i[1]];return e.computeShapeHelper(r,i,l,a,n,s,o,u),l}static computeConvOutputShape(r,i,a,n,s,o,u){if(r.length<=0||i.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let l=[r[0],i[0]];return e.computeShapeHelper(!1,r,l,a,n,s,o,u),l}static computeShapeHelper(r,i,a,n,s,o,u,l){if(r)for(let e=0;e<i.length-2;e++)a.push(1);else for(let r=0;r<i.length-2;r++)a.push(e.adjustPadAndReturnShape(i[r+2],n[r],s[r],o[r],u,r,r+i.length-2,l))}static adjustPadAndReturnShape(e,r,i,a,n,s,o,u){let l=i*(a-1)+1;if(!u||"NOTSET"===u)return Math.floor((e+n[s]+n[o]-l)/r+1);switch(u){case"VALID":return n[s]=0,n[o]=0,Math.floor((e-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==i)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let i=((e+r-1)/r-1)*r+a-e;return n[s]=Math.floor("SAME_LOWER"===u?(i+1)/2:i/2),n[o]=i-n[s],Math.floor((e+i-a)/r+1)}default:throw Error("Unsupported AutoPad type")}}},e6=class{static getShapeOfGemmResult(e,r,i,a,n){let s,o,u;if(2!==e.length||2!==i.length)throw Error("shape need to be of size 2");r?(s=e[1],o=e[0]):(s=e[0],o=e[1]);let l=-1;if(a?(u=i[0],l=1):(u=i[1],l=0),i[l]!==o)throw Error("dimension mismatch");if(s<=0||u<=0||o<=0)throw Error("invalid shape specified");if(n&&!e2.isValidBroadcast(n,[s,u]))throw Error("gemm: invalid bias shape for broadcast");return[s,u,o]}},e8=-34028234663852886e22,e5=34028234663852886e22}),n_=q(()=>{"use strict";nf(),e9=(e,r)=>new(eG(r))(e)}),nb=q(()=>{"use strict";nf(),ng(),e7=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),te=(e,r)=>{if("int32"===r)return e;let i=e7.get(r);if(!i)throw Error(`WebNN backend does not support data type: ${r}`);let a=i/8;if(e.byteLength%a!=0)throw Error(`Invalid Uint8Array length - must be a multiple of ${a}.`);let n=e.byteLength/a,s=new(eG(r))(e.buffer,e.byteOffset,n);switch(r){case"int64":case"uint64":{let e=new Int32Array(n);for(let r=0;r<n;r++){let i=s[r];if(i>2147483647n||i<-2147483648n)throw Error("Can not convert int64 data to int32 - value out of range.");e[r]=Number(i)}return new Uint8Array(e.buffer)}case"int8":case"uint8":case"uint32":if("uint32"===r&&s.some(e=>e>0x7fffffff))throw Error("Can not convert uint32 data to int32 - value out of range.");return new Uint8Array(Int32Array.from(s,Number).buffer);default:throw Error(`Unsupported data conversion from ${r} to 'int32'`)}},tt=(e,r)=>{if("int32"===r)return e;if(e.byteLength%4!=0)throw Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let i=e.byteLength/4,a=new Int32Array(e.buffer,e.byteOffset,i);switch(r){case"int64":return new Uint8Array(BigInt64Array.from(a,BigInt).buffer);case"uint64":if(a.some(e=>e<0))throw Error("Can not convert int32 data to uin64 - negative value found.");return new Uint8Array(BigUint64Array.from(a,BigInt).buffer);case"int8":if(a.some(e=>e<-128||e>127))throw Error("Can not convert int32 data to int8 - value out of range.");return new Uint8Array(Int8Array.from(a,Number).buffer);case"uint8":if(a.some(e=>e<0||e>255))throw Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(a,Number);case"uint32":if(a.some(e=>e<0))throw Error("Can not convert int32 data to uint32 - negative value found.");return new Uint8Array(Uint32Array.from(a,Number).buffer);default:throw Error(`Unsupported data conversion from 'int32' to ${r}`)}},tr=1,ti=()=>tr++,ta=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),tn=(e,r)=>{let i=e7.get(e);if(!i)throw Error(`WebNN backend does not support data type: ${e}`);return r.length>0?Math.ceil(r.reduce((e,r)=>e*r)*i/8):0},ts=class{constructor(e){this.isDataConverted=!1;let{sessionId:r,context:i,tensor:a,dataType:n,shape:s,fallbackDataType:o}=e;this.sessionId=r,this.mlContext=i,this.mlTensor=a,this.dataType=n,this.tensorShape=s,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return tn(this.dataType,this.tensorShape)}destroy(){e0("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(!this.fallbackDataType)return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor);{let r=tt(new Uint8Array(await this.mlContext.readTensor(this.mlTensor)),this.dataType);return e?void(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r):r.buffer}}canReuseTensor(e,r,i){return this.mlContext===e&&this.dataType===r&&this.tensorShape.length===i.length&&this.tensorShape.every((e,r)=>e===i[r])}setIsDataConverted(e){this.isDataConverted=e}},to=class{constructor(e,r){this.tensorManager=e,this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,r,i,a){let n=this.tensorManager.getMLContext(e),s=this.tensorManager.getMLOpSupportLimits(e),o;if(!s?.input.dataTypes.includes(r)){if(!(o=ta.get(r))||s?.input.dataTypes.includes(o))throw Error(`WebNN backend does not support data type: ${r}`);e0("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${r} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,r,i))return this.wrapper.tensor;if(a){if(this.wrapper.byteLength!==tn(r,i))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,r,i,u,!0,!0,o),a&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let r=e;if(this.wrapper){if(this.wrapper.fallbackType)if("int32"===this.wrapper.fallbackType)r=te(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength)return void this.wrapper.write(r);e0("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(e){if(this.activeUpload){let r=this.wrapper?.isDataConverted?tt(this.activeUpload,this.wrapper?.type):this.activeUpload;return e?void(e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r)):r.buffer}if(!this.wrapper)throw Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},tu=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let r=this.backend.getMLContext(e);if(!r)throw Error("MLContext not found for session.");return r}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=ti();return this.tensorTrackersById.set(e,new to(this)),e}releaseTensorId(e){let r=this.tensorTrackersById.get(e);r&&(this.tensorTrackersById.delete(e),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(e,r,i,a,n){e0("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${i}, shape: ${a}, copyOld: ${n}}`);let s=this.tensorTrackersById.get(r);if(!s)throw Error("Tensor not found.");return s.ensureTensor(e,i,a,n)}upload(e,r){let i=this.tensorTrackersById.get(e);if(!i)throw Error("Tensor not found.");i.upload(r)}async download(e,r){e0("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${r?.byteLength}}`);let i=this.tensorTrackersById.get(e);if(!i)throw Error("Tensor not found.");return i.download(r)}releaseTensorsForSession(e){for(let r of this.freeTensors)r.sessionId===e&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==e)}registerTensor(e,r,i,a){let n=this.getMLContext(e),s=ti(),o=new ts({sessionId:e,context:n,tensor:r,dataType:i,shape:a});return this.tensorTrackersById.set(s,new to(this,o)),this.externalTensors.add(o),s}async getCachedTensor(e,r,i,a,n,s,o){let u=this.getMLContext(e);for(let[a,n]of this.freeTensors.entries())if(n.canReuseTensor(u,r,i)){e0("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, ${o?`fallbackDataType: ${o},`:""} shape: ${i}`);let n=this.freeTensors.splice(a,1)[0];return n.sessionId=e,n}e0("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, ${o?`fallbackDataType: ${o},`:""} shape: ${i}}`);let l=await u.createTensor({dataType:o??r,shape:i,dimensions:i,usage:a,writable:n,readable:s});return new ts({sessionId:e,context:u,tensor:l,dataType:r,shape:i,fallbackDataType:o})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},tl=(...e)=>new tu(...e)}),n$=q(()=>{"use strict";nf(),nd(),n_(),nb(),ng(),td=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),tp=class{constructor(e){this.tensorManager=tl(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,eJ(e.logLevel,!!e.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(e){e0("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){e0("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let r=this.temporarySessionTensorIds.get(e);if(r){for(let e of r)e0("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(-1!==r)return this.mlContextCache[r].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}if(void 0===e){let e=this.mlContextCache.findIndex(e=>void 0===e.options&&void 0===e.gpuDevice);if(-1!==e)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let r=this.mlContextCache.findIndex(r=>((e,r)=>{if(e===r)return!0;if(void 0===e||void 0===r)return!1;let i=Object.keys(e).sort(),a=Object.keys(r).sort();return i.length===a.length&&i.every((i,n)=>i===a[n]&&e[i]===r[i])})(r.options,e));if(-1!==r)return this.mlContextCache[r].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,r){this.mlContextBySessionId.set(e,r);let i=this.sessionIdsByMLContext.get(r);i||(i=new Set,this.sessionIdsByMLContext.set(r,i)),i.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,r.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let r=this.mlContextBySessionId.get(e);if(!r)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let i=this.sessionIdsByMLContext.get(r);if(i.delete(e),0===i.size){this.sessionIdsByMLContext.delete(r);let e=this.mlContextCache.findIndex(e=>e.mlContext===r);-1!==e&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){e0("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,r,i,a,n){let s=td.get(i);if(!s)throw Error(`Unsupported ONNX data type: ${i}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,r,s,a,n)}async createTemporaryTensor(e,r,i){e0("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${i}}`);let a=td.get(r);if(!a)throw Error(`Unsupported ONNX data type: ${r}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,a,i,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,r){if(!eR().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");e0("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${r.byteLength}}`),this.tensorManager.upload(e,r)}async downloadTensor(e,r){return this.tensorManager.download(e,r)}createMLTensorDownloader(e,r){return async()=>{let i=await this.tensorManager.download(e);return e9(i,r)}}registerMLTensor(e,r,i,a){let n=td.get(i);if(!n)throw Error(`Unsupported ONNX data type: ${i}`);let s=this.tensorManager.registerTensor(e,r,n,a);return e0("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${n}, dimensions: ${a}} -> {tensorId: ${s}}`),s}registerMLConstant(e,r,i,a,n,s,o=!1){if(!s)throw Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=s.get(u);if(!l)throw Error(`File with name ${u} not found in preloaded files.`);if(r+i>l.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(r,r+i).buffer,p;switch(n.dataType){case"float32":p=new Float32Array(d);break;case"float16":p="u">typeof Float16Array&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":o?(p=new Int32Array(te(new Uint8Array(d),"int64").buffer),n.dataType="int32"):p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`)}return e0("verbose",()=>`[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}} ${o?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),a.constant(n,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,r){let i=this.sessionGraphInputs.get(e);return!!i&&i.includes(r)}isGraphOutput(e,r){let i=this.sessionGraphOutputs.get(e);return!!i&&i.includes(r)}isGraphInputOutputTypeSupported(e,r,i=!0){let a=td.get(eW(r)),n=this.mlOpSupportLimitsBySessionId.get(e);return!(typeof a>"u")&&(i?!!n?.input.dataTypes.includes(a):!!n?.output.dataTypes.includes(a))}flush(){}}}),nv=q(()=>{}),nw=q(()=>{"use strict";ng(),nv(),tc=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),th=[],tf=e=>16*Math.ceil(Number(e)/16),tm=1,tg=()=>tm++,ty=async(e,r,i,a)=>{let n=tf(i),s=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(r,0,s,0,n),e.flush(),await s.mapAsync(GPUMapMode.READ);let u=s.getMappedRange();if(!a)return new Uint8Array(u.slice(0,i));{let e=a();return e.set(new Uint8Array(u,0,i)),e}}finally{s.destroy()}},t_=class{constructor(e){for(let[r]of(this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,tc))th.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(e,r){let i=r.buffer,a=r.byteOffset,n=r.byteLength,s=tf(n),o=this.storageCache.get(e);if(!o)throw Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==n)throw Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${n}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(u.getMappedRange()).set(new Uint8Array(i,a,n)),u.unmap();let l=this.backend.device.createCommandEncoder();l.copyBufferToBuffer(u,0,o.gpuData.buffer,0,s),this.backend.device.queue.submit([l.finish()]),u.destroy(),e0("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,r){let i=this.storageCache.get(e);if(!i)throw Error("source gpu data for memcpy does not exist");let a=this.storageCache.get(r);if(!a)throw Error("destination gpu data for memcpy does not exist");if(i.originalSize!==a.originalSize)throw Error("inconsistent source and destination gpu data size");let n=tf(i.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(i.gpuData.buffer,0,a.gpuData.buffer,0,n)}registerExternalBuffer(e,r,i){let a;if(i){if(a=i[0],e===i[1])return e0("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${a}, buffer is the same, skip.`),a;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else a=tg();return this.storageCache.set(a,{gpuData:{id:a,type:0,buffer:e},originalSize:r}),e0("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${a}, registered.`),a}unregisterExternalBuffer(e){void 0!==e&&(this.storageCache.delete(e),e0("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let i=(e=>{for(let r=0;r<th.length;r++){let i=th[r];if(e<=i)return i}return 16*Math.ceil(e/16)})(e),a,n=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||s){let e=(n?this.freeBuffers:this.freeUniformBuffers).get(i);a=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:i,usage:r})}else a=this.backend.device.createBuffer({size:i,usage:r});let o={id:tg(),type:0,buffer:a};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),e0("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){return this.storageCache.get(e)?.gpuData}release(e){let r="bigint"==typeof e?Number(e):e,i=this.storageCache.get(r);if(!i){if(0===this.storageCache.size)return 0;throw Error("releasing data does not exist")}return e0("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${i.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(i.gpuData.buffer),i.originalSize}async download(e,r){let i=this.storageCache.get(Number(e));if(!i)throw Error("data does not exist");await ty(this.backend,i.gpuData.buffer,i.originalSize,r)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let e of this.buffersPending){let r=tc.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let i=this.freeBuffers.get(e.size)||[];void 0===r||i.length>=r?e.destroy():i.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let i=this.freeUniformBuffers.get(e.size)||[];void 0===r||i.length>=r?e.destroy():i.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let r of(e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e)),this.buffersPending))e.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let r=this.capturedPendingBuffers.get(e);r&&(r.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,0===this.sessionCount&&(e0("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},tb=(...e)=>new t_(...e)}),nx=q(()=>{"use strict";t$=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},tv=e=>new t$(e)}),nS=q(()=>{"use strict";nf(),ny(),tw=64,tx=(e,r)=>{if(3===r)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return r>1?`vec${r}<f16>`:"f16";case 1:return r>1?`vec${r}<f32>`:"f32";case 6:return r>1?`vec${r}<i32>`:"i32";case 12:return r>1?`vec${r}<u32>`:"u32";case 7:if(r>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(r>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==r)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${e}`)}},tS=(e,r=1)=>{let i=tx(e,r);return"string"==typeof i?i:i[0]},tk=(e,r=1)=>{let i=tx(e,r);return"string"==typeof i?i:i[1]},tT=(...e)=>{let r=[];return e.forEach(e=>{0!==e.length&&r.push({type:12,data:e},{type:12,data:e3.computeStrides(e)})}),r},tI=e=>e%4==0?4:e%2==0?2:1,tE=(e="f32",r,i="0")=>r&&1!==r?`vec${r}<${e}>(${i})`:`${e}(${i})`,tz=(e,r,i)=>"f32"===e?i:1===r?`f32(${i})`:`vec${r}<f32>(${i})`,tC=(e,r)=>4===r?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:2===r?`(${e}.x + ${e}.y)`:3===r?`(${e}.x + ${e}.y + ${e}.z)`:e,tA=(e,r,i,a)=>e.startsWith("uniforms.")&&i>4?"string"==typeof r?"f16"===a?`${e}[(${r}) / 8][(${r}) % 8 / 4][(${r}) % 8 % 4]`:`${e}[(${r}) / 4][(${r}) % 4]`:"f16"===a?`${e}[${Math.floor(r/8)}][${Math.floor(r%8/4)}][${r%8%4}]`:`${e}[${Math.floor(r/4)}][${r%4}]`:i>1?`${e}[${r}]`:e,tO=(e,r,i,a,n)=>{let s,o,u,l,d="number"==typeof i,p=d?i:i.length,c=[...Array(p).keys()],h=p<2?"u32":p<=4?`vec${p}<u32>`:`array<u32, ${p}>`,f=tx(r,n),m="string"==typeof f?f:f[1],g={indices:h,value:m,storage:"string"==typeof f?f:f[0],tensor:r},y=e=>"string"==typeof e?e:`${e}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=d?"uniforms.":"",$=`${b}${e}_shape`,v=`${b}${e}_strides`,w="";for(let e=0;e<p-1;e++)w+=`
    let dim${e} = current / ${tA(v,e,p)};
    let rest${e} = current % ${tA(v,e,p)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;w+=`indices[${p-1}] = current;`;let x=p<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${w}
    return indices;
  }`,S=[];if(p>=2)for(let e=p-1;e>=0;e--)S.push(`${tA(v,e,p)} * (indices[${e}])`);let k=p<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${S.join("+")};
  }`,T=(...e)=>0===p?"0u":`${g.indices}(${e.map(y).join(",")})`,I=(e,r)=>p<2?`${e}`:`${tA(e,r,p)}`,E={},z=(r,i)=>(()=>{if(g.storage===g.value)return`${e}[${r}]=${i};`;if("vec2<u32>"===g.storage&&"i32"===g.value)return`${e}[${r}]=vec2<u32>(u32(${i}), select(0u, 0xFFFFFFFFu, ${i} < 0));`;if("vec2<u32>"===g.storage&&"u32"===g.value)return`${e}[${r}]=vec2<u32>(u32(${i}), 0u);`;if("u32"===g.storage&&"vec4<bool>"===g.value)return`${e}[${r}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${i}));`;throw Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),C=r=>(()=>{if(g.storage===g.value)return`${e}[${r}]`;if("vec2<u32>"===g.storage&&"i32"===g.value)return`i32(${e}[${r}].x)`;if("vec2<u32>"===g.storage&&"u32"===g.value)return`u32(${e}[${r}].x)`;if("u32"===g.storage&&"vec4<bool>"===g.value)return`vec4<bool>(bool(${e}[${r}] & 0xFFu), bool(${e}[${r}] & 0xFF00u), bool(${e}[${r}] & 0xFF0000u), bool(${e}[${r}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),A=p<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${m} {
    return ${C(`i2o_${e}(indices)`)};
  }`,O=p<2?"":(s=c.map(e=>`d${e}: u32`).join(", "),o=c.map(e=>`d${e}`).join(", "),`
  fn get_${e}(${s}) -> ${m} {
    return get_${e}ByIndices(${T(o)});
  }`),R=p<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${m}) {
    ${z(`i2o_${e}(indices)`,"value")}
  }`,B=p<2?"":(u=c.map(e=>`d${e}: u32`).join(", "),l=c.map(e=>`d${e}`).join(", "),`
  fn set_${e}(${u}, value: ${m}) {
    set_${e}ByIndices(${T(l)}, value);
  }`);return{impl:()=>{let e=[],r=!1;return _.offsetToIndices&&(e.push(x),r=!0),_.indicesToOffset&&(e.push(k),r=!0),_.broadcastedIndicesToOffset&&(Object.values(E).forEach(r=>e.push(r)),r=!0),_.set&&(e.push(B),r=!0),_.setByIndices&&(e.push(R),r=!0),_.get&&(e.push(O),r=!0),_.getByIndices&&(e.push(A),r=!0),!d&&r&&e.unshift(`const ${$} = ${g.indices}(${i.join(",")});`,`const ${v} = ${g.indices}(${e3.computeStrides(i).join(",")});`),e.join(`
`)},type:g,offsetToIndices:r=>(_.offsetToIndices=!0,p<2?r:`o2i_${e}(${r})`),indicesToOffset:r=>(_.indicesToOffset=!0,p<2?r:`i2o_${e}(${r})`),broadcastedIndicesToOffset:(r,i)=>{_.broadcastedIndicesToOffset=!0;let a=`${i.name}broadcastedIndicesTo${e}Offset`;if(a in E)return`${a}(${r})`;let n=[];for(let e=p-1;e>=0;e--){let r=i.indicesGet("outputIndices",e+i.rank-p);n.push(`${I(v,e)} * (${r} % ${I($,e)})`)}return E[a]=`fn ${a}(outputIndices: ${i.type.indices}) -> u32 {
             return ${n.length>0?n.join("+"):"0u"};
           }`,`${a}(${r})`},indices:T,indicesGet:I,indicesSet:(e,r,i)=>p<2?`${e}=${i};`:`${tA(e,r,p)}=${i};`,set:(...r)=>{if(r.length!==p+1)throw Error(`indices length must be ${p}`);let i=r[p];if("string"!=typeof i)throw Error("value must be string");let a=r.slice(0,p).map(y).join(",");return 0===p?z("0u",i):1===p?z(a[0],i):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${a}, ${i})`)},setByOffset:z,setByIndices:(r,i)=>p<2?z(r,i):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${r}, ${i});`),get:(...r)=>{if(r.length!==p)throw Error(`indices length must be ${p}`);let i=r.map(y).join(",");return 0===p?C("0u"):1===p?C(i[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${i})`)},getByOffset:C,getByIndices:r=>p<2?C(r):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${r})`),usage:a,name:e,strides:v,shape:$,rank:p}},tR=(e,r,i,a=1)=>tO(e,r,i,"input",a),tB=(e,r,i,a=1)=>tO(e,r,i,"output",a),tN=(e,r,i)=>tO(e,r,i,"atomicOutput",1),tM=(e,r,i,a=1)=>tO(e,r,i,"internal",a),tD=class{constructor(e,r){this.normalizedDispatchGroup=e,this.limits=r,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${"number"==typeof e?`${e}u`:e}) { return; }`}mainStart(e=tw){let r="number"==typeof e?e:e[0],i="number"==typeof e?1:e[1],a="number"==typeof e?1:e[2];if(r>this.limits.maxComputeWorkgroupSizeX||i>this.limits.maxComputeWorkgroupSizeY||a>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${r}, ${i}, ${a}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*i*a>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${r}, ${i}, ${a}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],s=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,o=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*i*a}u + local_idx;`;return`@compute @workgroup_size(${r}, ${i}, ${a})
  fn main(${s}) {
    ${o}
  `}appendVariableUniforms(e){0!==e.rank&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,r){if("internal"===e.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let i="input"===e.usage?"read":"read_write",a="atomicOutput"===e.usage?"atomic<i32>":e.type.storage;return`@group(0) @binding(${r}) var<storage, ${i}> ${e.name}: array<${a}>;`}declareVariables(...e){return e.map(e=>this.declareVariable(e,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if("internal"!==e.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(e,r,i=1){return this.uniforms.push({name:e,type:r,length:i}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let e=[];for(let{name:r,type:i,length:a}of this.uniforms)if(a&&a>4)"f16"===i?e.push(`@align(16) ${r}:array<mat2x4<${i}>, ${Math.ceil(a/8)}>`):e.push(`${r}:array<vec4<${i}>, ${Math.ceil(a/4)}>`);else{let n=null==a||1===a?i:`vec${a}<${i}>`;e.push(`${r}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(0!==this.uniforms.length)return this.uniforms.map(e=>[[12,10,1,6][["u32","f16","f32","i32"].indexOf(e.type)],e.length??1])}},tP=(e,r)=>new tD(e,r)}),nk=q(()=>{"use strict";nf(),ny(),nx(),nS(),tU=(e,r)=>0!==r.length?r:[...Array(e).keys()].reverse(),tq=(e,r)=>{let i,a,n=e.dataType,s=e.dims.length,o=tU(s,r),u=(i=e.dims,a=o,e3.sortBasedOnPerm(i,tU(i.length,a))),l=e.dims,d=u;if(s<2||((e,r)=>{let i=0;for(let a=0;a<e.length;++a)if(1!==r[e[a]]){if(e[a]<i)return!1;i=e[a]}return!0})(o,e.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let r=e3.size(u);return{outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(r/64/4)},programUniforms:[{type:12,data:Math.ceil(r/4)}]}},getShaderSource:e=>{let r=tR("input",n,l,4),i=tB("output",n,d,4);return`
  ${e.registerUniform("output_size","u32").declareVariables(r,i)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:p,newPerm:c}=((e,r)=>{let i=[],a=[];for(let n=0;n<e.length;++n)1!==e[n]&&i.push(e[n]),1!==e[r[n]]&&a.push(r[n]);return{newShape:i,newPerm:a}})(e.dims,o),h=e3.areEqual(c,[2,3,1]),f=e3.areEqual(c,[3,1,2]);return 2===p.length||h||f?(d=[(l=h?[p[0],p[1]*p[2]]:f?[p[0]*p[1],p[2]]:p)[1],l[0]],{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let r=e3.size(u);return{outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(d[1]/16),y:Math.ceil(d[0]/16)},programUniforms:[{type:12,data:r},...tT(l,d)]}},getShaderSource:e=>{let r=tR("a",n,l.length),i=tB("output",n,d.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(r,i)}
  var<workgroup> tile : array<array<${i.type.value}, 17>, 16>;
  ${e.mainStart([16,16,1])}
    let stride = (uniforms.output_shape[1] - 1) / 16 + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * 16u + local_id.x;
    let input_row = workgroup_id_x * 16u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${r.getByIndices(`${r.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * 16u + local_id.x;
    let output_row = workgroup_id_y * 16u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${i.setByIndices(`${i.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`}}):{name:"Transpose",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>{let r=e3.size(u);return{outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:[{type:12,data:r},...tT(l,d)]}},getShaderSource:e=>{let r=tR("a",n,l.length),i=tB("output",n,d.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(r,i)}

  ${((e,r,i,a)=>{let n=`fn perm(i: ${a.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`;for(let i=0;i<r;++i)n+=`a[${e[i]}]=i[${i}];`;return n+"return a;}"})(o,s,r,i)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${i.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${i.setByOffset("global_idx",r.getByIndices("aIndices"))}
  }`}}},tW=(e,r)=>{((e,r)=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if(0!==r.length&&r.length!==e[0].dims.length)throw Error(`perm size ${r.length} does not match input rank ${e[0].dims.length}`)})(e.inputs,r.perm),e.compute(tq(e.inputs[0],r.perm))},tL=e=>tv({perm:e.perm})}),nT=q(()=>{"use strict";nf(),ny(),nS(),nI(),nk(),tV={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},tG={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},tH={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},tF={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},tj=(e,r,i,a)=>{var n,s,o,u,l,d,p;let c,h,f,m,g,y,_,b=1===e.inputs.length?i:t5(e.inputs,i),$=b.axes;0!==$.length||b.noopWithEmptyAxes||($=e.inputs[0].dims.map((e,r)=>r));let v=e3.normalizeAxes($,e.inputs[0].dims.length),w=v,x=e.inputs[0],S=((e,r)=>{let i=[];if(!((e,r)=>{for(let i=0;i<e.length;++i)if(e[e.length-i-1]!==r-1-i)return!1;return!0})(e,r)){for(let a=0;a<r;++a)-1===e.indexOf(a)&&i.push(a);e.forEach(e=>i.push(e))}return i})(w,e.inputs[0].dims.length);S.length>0&&(x=e.compute(tq(e.inputs[0],S),{inputs:[0],outputs:[-1]})[0],w=((e,r)=>{let i=[];for(let a=r-e;a<r;++a)i.push(a);return i})(w.length,x.dims.length));let[k,T]=((e,r)=>{let i=[],a=e.length;for(let n=0;n<a;n++)-1===r.indexOf(n)&&i.push(e[n]);return[i,r.map(r=>e[r])]})(x.dims,w),I=k;b.keepDims&&(I=((e,r)=>{let i=e.length+r.length,a=[],n=0;for(let s=0;s<i;s++)-1===r.indexOf(s)?a.push(e[n++]):a.push(1);return a})(k,v)),e.compute((n=r,s=b.cacheKey,o=[x],u=a,l=e.inputs[0].dataType,d=I,p=T,c=o[0].dims,h=e3.size(d),f=e3.size(p),m=tR("_A",o[0].dataType,c),g=tB("output",l,d),y=64,1===h&&(y=256),_=`
          var<workgroup> aBestValues : array<f32, ${y}>;
       `,{name:n,shaderCache:{hint:`${s};${y}`,inputDependencies:["type"]},getShaderSource:e=>`
        ${e.registerUniform("reduceSize","u32").declareVariables(m,g)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${e.mainStart(y)}

          let outputIndex = global_idx / ${y};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${tH[u]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${y}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${tV[u]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${y}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${tG[u]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${g.setByOffset("outputIndex",`${"mean"===u?`${g.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${g.type.storage}(${tF[u]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:d,dataType:l}],dispatchGroup:{x:h},programUniforms:[{type:12,data:f}]})}),{inputs:[x]})},tK=(e,r)=>{tj(e,"ReduceMeanShared",r,"mean")},tQ=(e,r)=>{tj(e,"ReduceL1Shared",r,"l1")},tZ=(e,r)=>{tj(e,"ReduceL2Shared",r,"l2")},tX=(e,r)=>{tj(e,"ReduceLogSumExpShared",r,"logSumExp")},tY=(e,r)=>{tj(e,"ReduceMaxShared",r,"max")},tJ=(e,r)=>{tj(e,"ReduceMinShared",r,"min")},t0=(e,r)=>{tj(e,"ReduceProdShared",r,"prod")},t1=(e,r)=>{tj(e,"ReduceSumShared",r,"sum")},t2=(e,r)=>{tj(e,"ReduceSumSquareShared",r,"sumSquare")},t3=(e,r)=>{tj(e,"ReduceLogSumShared",r,"logSum")}}),nI=q(()=>{"use strict";nf(),ny(),nx(),nS(),nT(),t4=e=>{if(!e||0===e.length||e.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===e.length&&1!==e[1].dims.length)throw Error("Invalid axes input dims.")},t6=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],t8=(e,r,i,a,n,s,o=!1,u=!1)=>{let l=[],d=i[0].dims,p=d.length,c=e3.normalizeAxes(n,p),h=!u&&0===c.length;d.forEach((e,r)=>{h||c.indexOf(r)>=0?o&&l.push(1):l.push(e)});let f=l.length,m=e3.size(l);return{name:e,shaderCache:r,getShaderSource:e=>{let r=[],n=tR("_A",i[0].dataType,p),u=tB("output",s,f),l=a(n,u,c),m=l[2];for(let e=0,i=0;e<p;e++)h||c.indexOf(e)>=0?(o&&i++,m=`for(var j${e}: u32 = 0; j${e} < ${d[e]}; j${e}++) {
                  ${l[2].includes("last_index")?`let last_index = j${e};`:""}
                  ${n.indicesSet("input_indices",e,`j${e}`)}
                  ${m}
                }`):(r.push(`${n.indicesSet("input_indices",e,u.indicesGet("output_indices",i))};`),i++);return`

        ${e.registerUniform("output_size","u32").declareVariables(n,u)}

        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${n.type.indices};
          let output_indices = ${u.offsetToIndices("global_idx")};

          ${r.join(`
`)}
          ${l[0]}       // init ops for reduce max/min
          ${l[1]}
          ${m}
          ${l[3]}
          ${4===l.length?u.setByOffset("global_idx","value"):l.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:s}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...tT(d,l)]})}},t5=(e,r)=>{let i=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>i.push(Number(e))),tv({axes:i,keepDims:r.keepDims,noopWithEmptyAxes:r.noopWithEmptyAxes})},t9=(e,r,i,a)=>{let n=e.inputs,s=1===n.length?i:t5(n,i);e.compute(t8(r,{hint:s.cacheKey,inputDependencies:["rank"]},[n[0]],s.noopWithEmptyAxes&&0===s.axes.length?t6:a,s.axes,n[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},t7=(e,r,i)=>{if(0===r.length)return i;let a=1,n=1;for(let i=0;i<r.length;i++)-1===r.indexOf(i)?a*=e[i]:n*=e[i];return n<32&&a>1024},re=(e,r)=>{var i,a;t7(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=e,a=r,t4(i.inputs),t9(i,"ReduceMean",a,(e,r,a)=>{let n=1;for(let r=0;r<e.rank;r++)(a.indexOf(r)>=0||0===a.length)&&(n*=i.inputs[0].dims[r]);return["var sum = f32(0);","",`sum += f32(${e.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${n});`]})):tK(e,r)},rt=(e,r)=>{var i,a;t7(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=e,a=r,t4(i.inputs),t9(i,"ReduceL1",a,(e,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${e.getByIndices("input_indices")});`,""])):tQ(e,r)},rr=(e,r)=>{var i,a;t7(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=e,a=r,t4(i.inputs),t9(i,"ReduceL2",a,(e,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])):tZ(e,r)},ri=(e,r)=>{var i,a;t7(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=e,a=r,t4(i.inputs),t9(i,"ReduceLogSumExp",a,(e,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${e.getByIndices("input_indices")});`,"value = log(value);"])):tX(e,r)},ra=(e,r)=>{var i,a;t7(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=e,a=r,t4(i.inputs),t9(i,"ReduceMax",a,(e,r,i)=>{let a=[];for(let r=0;r<e.rank;r++)(i.indexOf(r)>=0||0===i.length)&&a.push(e.indicesSet("input_indices",r,0));return[`${a.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = max(value, ${e.getByIndices("input_indices")});`,""]})):tY(e,r)},rn=(e,r)=>{var i,a;t7(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=e,a=r,t4(i.inputs),t9(i,"ReduceMin",a,(e,r,i)=>{let a=[];for(let r=0;r<e.rank;r++)(i.indexOf(r)>=0||0===i.length)&&a.push(`input_indices[${r}] = 0;`);return[`${a.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = min(value, ${e.getByIndices("input_indices")});`,""]})):tJ(e,r)},rs=(e,r)=>{var i,a;t7(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=e,a=r,t4(i.inputs),t9(i,"ReduceProd",a,(e,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${e.getByIndices("input_indices")};`,""])):t0(e,r)},ro=(e,r)=>{var i,a;t7(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=e,a=r,t4(i.inputs),t9(i,"ReduceSum",a,(e,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,""])):t1(e,r)},ru=(e,r)=>{var i,a;t7(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=e,a=r,t4(i.inputs),t9(i,"ReduceSumSquare",a,(e,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += t * t;`,""])):t2(e,r)},rl=(e,r)=>{var i,a;t7(e.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=e,a=r,t4(i.inputs),t9(i,"ReduceLogSum",a,(e,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,"value = log(value);"])):t3(e,r)}}),nE=q(()=>{"use strict";nf(),nx(),nI(),rd=e=>{if(!e||0===e.length||e.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==e[0].dataType)throw Error("Invalid input type.")},rp=(e,r)=>{rd(e.inputs),e.compute(t8("ArgMin",{hint:r.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,i,a)=>{let n=[];for(let r=0;r<e.rank;r++)(a.indexOf(r)>=0||0===a.length)&&n.push(`input_indices[${r}] = 0;`);return[`${n.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${r.selectLastIndex>0?"<=":"<"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]},[r.axis],7,r.keepDims),{inputs:[0]})},rc=(e,r)=>{rd(e.inputs),e.compute(t8("argMax",{hint:r.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,i,a)=>{let n=[];for(let r=0;r<e.rank;r++)(a.indexOf(r)>=0||0===a.length)&&n.push(`input_indices[${r}] = 0;`);return[`${n.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${r.selectLastIndex>0?">=":">"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]},[r.axis],7,r.keepDims),{inputs:[0]})},rh=e=>tv(e)}),nz=q(()=>{"use strict";nf(),ny(),nv(),nS(),rf=(e,r,i)=>r&&e?`
      let total_sequence_length_input = u32(${r.getByOffset("0")});
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
    `,rm=(e,r,i,a,n,s,o,u,l,d,p,c)=>{var h,f,m,g,y,_,b,$,v,w,x,S,k,T,I,E,z,C,A,O,R,B,N,M,D;let P,U,q,W,L,V,G,H,F,j,K,Q,Z,X,Y,J,ee,et,er,ei,ea,en,es,eo,eu,el,ed,ep,ec,eh,ef,em,eg,ey=Math.min(e.outputCount,1+ +!!o+ +!!u),e_=ey>1?d.pastSequenceLength:0,eb=e_+d.kvSequenceLength,e$=l&&e3.size(l.dims)>0?l:void 0,ev=[r,i];ey>1&&o&&e3.size(o.dims)>0&&ev.push(o),e$&&ev.push(e$),p&&ev.push(p),c&&ev.push(c);let ew=e.compute((h=ey,f=r,m=i,g=o,y=e$,_=d,b=e_,$=p,v=c,P=b+_.kvSequenceLength,U=[_.batchSize,_.numHeads,_.sequenceLength,P],q=h>1&&g,W=_.kvNumHeads?_.kvNumHeads:_.numHeads,L=q?[_.batchSize,W,P,_.headSize]:void 0,V=_.nReps?_.nReps:1,G=0===_.scale?1/Math.sqrt(_.headSize):_.scale,H=tI(_.headSize),F=_.headSize/H,j={x:Math.ceil(P/12),y:Math.ceil(_.sequenceLength/12),z:_.batchSize*_.numHeads},K=[{type:12,data:_.sequenceLength},{type:12,data:F},{type:12,data:P},{type:12,data:_.numHeads},{type:12,data:_.headSize},{type:1,data:G},{type:12,data:b},{type:12,data:_.kvSequenceLength},{type:12,data:V}],Q=q&&g&&e3.size(g.dims)>0,Z=["type","type"],Q&&Z.push("type"),y&&Z.push("type"),$&&Z.push("type"),v&&Z.push("type"),X=[{dims:U,dataType:f.dataType,gpuDataType:0}],q&&X.push({dims:L,dataType:f.dataType,gpuDataType:0}),{name:"AttentionProbs",shaderCache:{hint:`${H};${void 0!==y};${void 0!==g};${h}`,inputDependencies:Z},getRunData:()=>({outputs:X,dispatchGroup:j,programUniforms:K}),getShaderSource:e=>{let r=tR("q",f.dataType,f.dims,H),i=[r,tR("key",m.dataType,m.dims,H)];if(Q){let e=tR("past_key",g.dataType,g.dims,H);i.push(e)}y&&i.push(tR("attention_bias",y.dataType,y.dims));let a=$?tR("seq_lens",$.dataType,$.dims):void 0;a&&i.push(a);let n=v?tR("total_sequence_length_input",v.dataType,v.dims):void 0;n&&i.push(n);let s=tB("output",f.dataType,U),o=[s];q&&o.push(tB("present_key",f.dataType,L,H));let u=tk(1,H);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${r.type.storage}, 144>;
  var<workgroup> tileK: array<${r.type.storage}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...i,...o)}
  ${e.mainStart([12,12,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${1===V?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${1===V?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${rf(a,n,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${Q&&q?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${q?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${u}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${Q&&q?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${q?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${u}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(H){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw Error(`Unsupported components: ${H}`)}})()};
        output[outputIdx] = ${s.type.value} (sum * uniforms.alpha) + ${y?"attention_bias[outputIdx]":"0.0"};
    }
  }`}}),{inputs:ev,outputs:ey>1?[-1,1]:[-1]})[0];e.compute((w=ew,x=d.batchSize,S=d.numHeads,k=e_,T=d.sequenceLength,I=eb,E=p,z=c,Y=tI(E?1:I),J=64,(ee=I/Y)<64&&(J=32),et=[{type:12,data:x},{type:12,data:S},{type:12,data:k},{type:12,data:T},{type:12,data:ee},{type:12,data:Math.ceil(I/Y/J)}],er=tS(w.dataType,Y),ei=tk(1,Y),ea=["type"],E&&ea.push("type"),z&&ea.push("type"),{name:"AttentionProbsSoftmax",shaderCache:{hint:`${J};${er};${Y}`,inputDependencies:ea},getShaderSource:e=>{let r=tB("x",w.dataType,w.dims,Y),i=[r],a=E?tR("seq_lens",E.dataType,E.dims):void 0;a&&i.push(a);let n=z?tR("total_sequence_length_input",z.dataType,z.dims):void 0;n&&i.push(n);let s=tk(w.dataType);return`
  var<workgroup> thread_max: array<f32, ${J}>;
  var<workgroup> thread_sum: array<f32, ${J}>;
  ${e.registerUniforms([{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}]).declareVariables(...i)}
  ${e.mainStart([J,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${rf(a,n,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${J}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${E?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${ei}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${ei}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(Y){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw Error(`Unsupported components: ${Y}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${J}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${ei}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${ei}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(Y){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw Error(`Unsupported components: ${Y}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${J}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${r.type.value}(${s}(1.0) / ${s}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${ei}(x[offset + i]);
        x[offset + i] = ${r.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${E?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${r.type.value}(${s}(0));
        }`:""};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:T,z:x*S},programUniforms:et})}),{inputs:p&&c?[ew,p,c]:[ew],outputs:[]});let ex=[ew,a];ey>1&&u&&e3.size(u.dims)>0&&ex.push(u),p&&ex.push(p),c&&ex.push(c),e.compute((C=ey,A=ew,O=a,R=u,B=d,N=e_,M=p,D=c,en=N+B.kvSequenceLength,es=B.nReps?B.nReps:1,eo=B.vHiddenSize*es,eu=C>1&&R,el=B.kvNumHeads?B.kvNumHeads:B.numHeads,ed=eu?[B.batchSize,el,en,B.headSize]:void 0,ep=[B.batchSize,B.sequenceLength,eo],ec={x:Math.ceil(B.vHeadSize/12),y:Math.ceil(B.sequenceLength/12),z:B.batchSize*B.numHeads},eh=[{type:12,data:B.sequenceLength},{type:12,data:en},{type:12,data:B.vHeadSize},{type:12,data:B.numHeads},{type:12,data:B.headSize},{type:12,data:eo},{type:12,data:N},{type:12,data:B.kvSequenceLength},{type:12,data:es}],ef=eu&&R&&e3.size(R.dims)>0,em=["type","type"],ef&&em.push("type"),M&&em.push("type"),D&&em.push("type"),eg=[{dims:ep,dataType:A.dataType,gpuDataType:0}],eu&&eg.push({dims:ed,dataType:A.dataType,gpuDataType:0}),{name:"AttentionScore",shaderCache:{hint:`${void 0!==R};${C}`,inputDependencies:em},getRunData:()=>({outputs:eg,dispatchGroup:ec,programUniforms:eh}),getShaderSource:e=>{let r=tR("probs",A.dataType,A.dims),i=[r,tR("v",O.dataType,O.dims)];ef&&i.push(tR("past_value",R.dataType,R.dims));let a=M?tR("seq_lens",M.dataType,M.dims):void 0;M&&i.push(a);let n=D?tR("total_sequence_length_input",D.dataType,D.dims):void 0;D&&i.push(n);let s=[tB("output",A.dataType,ep)];return eu&&s.push(tB("present_value",A.dataType,ed)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${r.type.value}, 144>;
  var<workgroup> tileV: array<${r.type.value}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...i,...s)}
  ${e.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===es?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===es?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${rf(a,n,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${ef&&eu?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${eu?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${r.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${ef&&eu?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${eu?`
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
  }`}}),{inputs:ex,outputs:ey>1?[0,2]:[0]})},rg=(e,r)=>{var i,a;let n,s,o,u,l,d,p,c=((e,r)=>{let i=e[0],a=e[1],n=e[2],s=e[3],o=e[4],u=e[5];if(o&&u)throw Error("Attention cannot have both past and attention_bias");if(3!==i.dims.length)throw Error('Input "input" must have 3 dimensions');let l=i.dims[0],d=i.dims[1],p=i.dims[2];if(1!==n.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==a.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(a.dims[0]!==p)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==a.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=n.dims[0]/3,h=c,f=h;if(r.qkvHiddenSizes.length>0){if(3!==r.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let e of r.qkvHiddenSizes)if(e%r.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");c=r.qkvHiddenSizes[0],h=r.qkvHiddenSizes[1],f=r.qkvHiddenSizes[2]}if(c!==h)throw Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==c+h+f)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let m=0;if(o){if(h!==f)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==o.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==o.dims[0])throw Error('Input "past" first dimension must be 2');if(o.dims[1]!==l)throw Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==r.numHeads)throw Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==h/r.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');r.pastPresentShareBuffer||(m=o.dims[3])}let g=d+m;if(s)throw Error("Mask not supported");if(o)throw Error("past is not supported");if(u){if(4!==u.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==r.numHeads||u.dims[2]!==d||u.dims[3]!==g)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:d,totalSequenceLength:g,maxSequenceLength:-1,inputHiddenSize:p,hiddenSize:c,vHiddenSize:f,headSize:Math.floor(c/r.numHeads),vHeadSize:Math.floor(f/r.numHeads),numHeads:r.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:r.maskFilterValue,maskType:0,scale:r.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}})(e.inputs,r),[h,f,m]=(i=e,n=[(a=c).batchSize,a.numHeads,a.sequenceLength,a.headSize],s=a.sequenceLength,o=a.inputHiddenSize,u=a.headSize,l={x:Math.ceil(a.headSize/12),y:Math.ceil(a.sequenceLength/12),z:a.batchSize*a.numHeads},d=[i.inputs[0],i.inputs[1],i.inputs[2]],p=[{type:12,data:s},{type:12,data:o},{type:12,data:u},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:a.hiddenSize},{type:12,data:a.hiddenSize+a.hiddenSize+a.vHiddenSize}],i.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:i.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:i.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:i.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:p}),getShaderSource:e=>{let r=tB("output_q",d[0].dataType,n),i=tB("output_k",d[0].dataType,n),a=tB("output_v",d[0].dataType,n),s=tR("input",d[0].dataType,d[0].dims),o=tR("weight",d[1].dataType,d[1].dims),u=tR("bias",d[2].dataType,d[2].dims),l=s.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${l}, 144>;
  var<workgroup> tileWeightQ: array<${l}, 144>;
  var<workgroup> tileWeightK: array<${l}, 144>;
  var<workgroup> tileWeightV: array<${l}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}]).declareVariables(s,o,u,r,i,a)}
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
  }`}},{inputs:d,outputs:[-1,-1,-1]}));return rm(e,h,f,m,e.inputs[4],void 0,void 0,void 0,e.inputs[5],c)}}),nC=q(()=>{"use strict";eu(),nf(),ny(),nx(),nS(),ry=(e,r)=>{let i,{inputs:a,outputCount:n}=e,s=(i={...r,outputCount:n},tv(i));if(f.webgpu.validateInputContent&&((e,r)=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs");let i=(e,r,i)=>{let a=r.length;if(a!==e.length)throw Error(`${i}: num dimensions != ${a}`);r.forEach((r,a)=>{if(r!==e[a])throw Error(`${i}: dim[${a}] do not match`)})};if(e[0].dims.length>1){let a="NHWC"===r.format?r.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,r.spatial?2:void 0);i(e[1].dims,a,"Invalid input scale"),i(e[2].dims,a,"Invalid input B"),i(e[3].dims,a,"Invalid input mean"),i(e[4].dims,a,"Invalid input var")}else i(e[1].dims,[1],"Invalid input scale"),i(e[2].dims,[1],"Invalid input B"),i(e[3].dims,[1],"Invalid input mean"),i(e[4].dims,[1],"Invalid input var")})(a,s),r.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");e.compute(((e,r)=>{let{epsilon:i,spatial:a,format:n}=r,s=e[0].dims,o=a?tI(s[s.length-1]):1,u="NHWC"===n&&s.length>1?o:1,l=e3.size(s)/o,d=a?s.length:s,p=tR("x",e[0].dataType,e[0].dims,o),c=tR("scale",e[1].dataType,e[1].dims,u),h=tR("bias",e[2].dataType,e[2].dims,u),f=tR("inputMean",e[3].dataType,e[3].dims,u),m=tR("inputVar",e[4].dataType,e[4].dims,u),g=tB("y",e[0].dataType,d,o);return{name:"BatchNormalization",shaderCache:{hint:`${r.epsilon}_${r.format}_${a}_${o}`,inputDependencies:a?["rank","type","type","type","type"]:void 0},getShaderSource:e=>`
  const epsilon = ${i};
  ${e.registerUniform("outputSize","u32").declareVariables(p,c,h,f,m,g)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${g.offsetToIndices(`global_idx * ${o}`)};
    ${(()=>{let e="";if(a)e=`let cOffset = ${1===s.length?"0u":"NHWC"===n?`outputIndices[${s.length-1}] / ${o}`:"outputIndices[1]"};`;else if("NCHW"===n)e=`
            ${g.indicesSet("outputIndices","0","0")}
            let cOffset = ${g.indicesToOffset("outputIndices")};`;else{e=`var cIndices = ${c.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let r=1;r<c.rank;r++)e+=`cIndices[${r}] = outputIndices[${r}];`;e+=`let cOffset = ${c.indicesToOffset("cIndices")};`}return e})()}
    let scale = ${c.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${f.getByOffset("cOffset")};
    let inputVar = ${m.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${g.setByOffset("global_idx","value")}
  }`,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:a?[{type:12,data:l},...tT(s)]:[{type:12,data:l}]})}})(a,s))}}),nA=q(()=>{"use strict";ny(),nS(),r_=e=>{var r;let i,a,n,s,o,u,l,d;(e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")})(e.inputs),e.compute((i=(r=e.inputs)[0].dims,a=r[0].dims[2],n=e3.size(i)/4,s=r[0].dataType,o=tR("input",s,i,4),u=tR("bias",s,[a],4),l=tR("residual",s,i,4),d=tB("output",s,i,4),{name:"BiasAdd",getRunData:()=>({outputs:[{dims:i,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:e=>`
  const channels = ${a}u / 4;
  ${e.declareVariables(o,u,l,d)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${o.getByOffset("global_idx")}
      + ${u.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}))}}),nO=q(()=>{"use strict";nf(),ny(),nx(),nS(),rb=(e,r,i,a,n,s=e.dataType,o,u)=>{let l=[{type:12,data:Math.ceil(e3.size(e.dims)/4)}];return o&&l.push(...o),{name:r,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:r=>{var n,o,l,d,p,c,h;let f,m,g,y,_;return n=r,o=e3.size(e.dims),l=e.dataType,d=s,p=i,c=a,h=u,f=Math.ceil(o/4),m="",m="string"==typeof p?`${p}(a)`:p("a"),g=tR("inputData",l,[f],4),y=tB("outputData",d,[f],4),_=[{name:"vec_size",type:"u32"}],h&&_.push(...h),`
      ${n.registerUniforms(_).declareVariables(g,y)}

  ${c??""}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${g.getByOffset("global_idx")};
    ${y.setByOffset("global_idx",m)}
  }`},getRunData:r=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(e3.size(r[0].dims)/64/4)},programUniforms:l})}},r$=e=>{e.compute(rb(e.inputs[0],"Abs","abs"))},rv=e=>{e.compute(rb(e.inputs[0],"Acos","acos"))},rw=e=>{e.compute(rb(e.inputs[0],"Acosh","acosh"))},rx=e=>{e.compute(rb(e.inputs[0],"Asin","asin"))},rS=e=>{e.compute(rb(e.inputs[0],"Asinh","asinh"))},rk=e=>{e.compute(rb(e.inputs[0],"Atan","atan"))},rT=e=>{e.compute(rb(e.inputs[0],"Atanh","atanh"))},rI=e=>tv(e),rE=(e,r)=>{let i;switch(r.to){case 10:i="vec4<f16>";break;case 1:i="vec4<f32>";break;case 12:i="vec4<u32>";break;case 6:i="vec4<i32>";break;case 9:i="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${r.to}`)}e.compute(rb(e.inputs[0],"Cast",i,void 0,r.cacheKey,r.to))},rz=(e,r)=>{let i=r||(e=>{let r,i,a=e.length>=2&&0!==e[1].data,n=e.length>=3&&0!==e[2].data;switch(e[0].dataType){case 1:r=a?e[1].getFloat32Array()[0]:-34028234663852886e22,i=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:r=a?e[1].getUint16Array()[0]:64511,i=n?e[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return tv({min:r,max:i})})(e.inputs),a=tk(e.inputs[0].dataType);e.compute(rb(e.inputs[0],"Clip",e=>`clamp(${e}, vec4<${a}>(uniforms.min), vec4<${a}>(uniforms.max))`,void 0,i.cacheKey,void 0,[{type:e.inputs[0].dataType,data:i.min},{type:e.inputs[0].dataType,data:i.max}],[{name:"min",type:a},{name:"max",type:a}]),{inputs:[0]})},rC=e=>{e.compute(rb(e.inputs[0],"Ceil","ceil"))},rA=e=>{e.compute(rb(e.inputs[0],"Cos","cos"))},rO=e=>{e.compute(rb(e.inputs[0],"Cosh","cosh"))},rR=e=>tv(e),rB=(e,r)=>{let i=tk(e.inputs[0].dataType);e.compute(rb(e.inputs[0],"Elu",e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${i}(${r.alpha});

  fn elu_f32(a: ${i}) -> ${i} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${i}>) -> vec4<${i}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,r.cacheKey))},rN=(e="f32")=>`
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
}`,rM=e=>{let r=tk(e.inputs[0].dataType);e.compute(rb(e.inputs[0],"Erf",e=>`erf_vf32(${e})`,rN(r)))},rD=e=>{e.compute(rb(e.inputs[0],"Exp","exp"))},rP=e=>{e.compute(rb(e.inputs[0],"Floor","floor"))},rU=e=>{let r=tk(e.inputs[0].dataType);e.compute(rb(e.inputs[0],"Gelu",e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,rN(r)))},rq=(e,r)=>{let i=tk(e.inputs[0].dataType);e.compute(rb(e.inputs[0],"LeakyRelu",e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${i}>(0.0))`,`const leaky_relu_alpha_ = ${i}(${r.alpha});`,r.cacheKey))},rW=e=>{e.compute(rb(e.inputs[0],"Not",e=>`!${e}`))},rL=e=>{e.compute(rb(e.inputs[0],"Neg",e=>`-${e}`))},rV=e=>{e.compute(rb(e.inputs[0],"Reciprocal",e=>`1.0/${e}`))},rG=e=>{let r=tk(e.inputs[0].dataType);e.compute(rb(e.inputs[0],"Relu",e=>`select(vec4<${r}>(0.0), ${e}, ${e} > vec4<${r}>(0.0))`))},rH=e=>{e.compute(rb(e.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},rF=e=>tv(e),rj=(e,r)=>{let i=tk(e.inputs[0].dataType);e.compute(rb(e.inputs[0],"HardSigmoid",e=>`max(vec4<${i}>(0.0), min(vec4<${i}>(1.0), ${r.alpha} * ${e} + vec4<${i}>(${r.beta})))`,void 0,r.cacheKey))},rK=e=>{e.compute(rb(e.inputs[0],"Sin","sin"))},rQ=e=>{e.compute(rb(e.inputs[0],"Sinh","sinh"))},rZ=e=>{e.compute(rb(e.inputs[0],"Sqrt","sqrt"))},rX=e=>{e.compute(rb(e.inputs[0],"Tan","tan"))},rY=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,rJ=e=>{e.compute(rb(e.inputs[0],"Tanh",rY))},r0=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${rY("v")};
}
`,r1=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,r2=e=>{let r=tk(e.inputs[0].dataType);e.compute(rb(e.inputs[0],"FastGelu",r1,r0(r),void 0,e.inputs[0].dataType))},r3=(e,r)=>{let i=tk(e.inputs[0].dataType);return e.compute(rb(e.inputs[0],"ThresholdedRelu",e=>`select(vec4<${i}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${i}>(${r.alpha});`,r.cacheKey)),0},r4=e=>{e.compute(rb(e.inputs[0],"Log","log"))},r6=e=>`quick_gelu_impl(${e})`,r8=(e,r)=>{let i,a,n=tk(e.inputs[0].dataType);e.compute(rb(e.inputs[0],"QuickGelu",r6,(i=n,a=r.alpha,`
const alpha = vec4<${i}>(${a});
const one = ${i}(1.0);
const zero = ${i}(0.0);

fn quick_gelu_impl(x: vec4<${i}>) -> vec4<${i}> {
  let v = x *alpha;
  var x1 : vec4<${i}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`),r.cacheKey,e.inputs[0].dataType))}}),nR=q(()=>{"use strict";ny(),nS(),nO(),r5=e=>{var r;let i,a,n,s,o,u;(e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")})(e.inputs),e.compute(((i=(r=e.inputs)[0].dims.slice())[2]=i[2]/2,a=tR("input",r[0].dataType,r[0].dims,4),n=tR("bias",r[0].dataType,[r[0].dims[2]],4),s=tB("output",r[0].dataType,i,4),o=e3.size(i)/4,u=tS(r[0].dataType),{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:i,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)}}),getShaderSource:e=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${e.declareVariables(a,n,s)}

  ${rN(u)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(o)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${s.setByOffset("global_idx","valueLeft * geluRight")}
  }`}))}}),nB=q(()=>{"use strict";nf(),ny(),nS(),r9=(e,r,i,a,n,s)=>{e.compute(((e,r,i,a,n,s,o=i.dataType)=>{let u=i.dims.map(Number),l=a.dims.map(Number),d=!e3.areEqual(u,l),p=u,c=e3.size(u),h=!1,f=!1,m=[d];if(d){let e=e2.calcShape(u,l,!1);if(!e)throw Error("Can't perform binary op on the given tensors");p=e.slice(),c=e3.size(p);let r=1===e3.size(u),i=1===e3.size(l),a=u.length>0&&u[u.length-1]%4==0,n=l.length>0&&l[l.length-1]%4==0;m.push(r),m.push(i),m.push(a),m.push(n);let s=1;for(let e=1;e<p.length;e++){let r=u[u.length-e];if(r===l[l.length-e])s*=r;else break}s%4==0?(f=!0,h=!0):(r||i||a||n)&&(h=!0)}else h=!0;return m.push(h),{name:e,shaderCache:{hint:r+m.map(e=>e.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:e=>((e,r,i,a,n,s,o,u,l,d,p,c)=>{let h,f;"string"==typeof u?h=f=(e,r)=>`${u}((${e}),(${r}))`:"function"==typeof u?h=f=u:(h=u.scalar,f=u.vector);let m=tB("outputData",p,a.length,4),g=tR("aData",l,r.length,4),y=tR("bData",d,i.length,4),_;if(n)if(s){let e=1===e3.size(r),a=1===e3.size(i),n=r.length>0&&r[r.length-1]%4==0,s=i.length>0&&i[i.length-1]%4==0;_=e||a?m.setByOffset("global_idx",f(e?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),a?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"))):`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${y.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(o||n?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||s?y.getByOffset("offsetB / 4u"):`${y.type.value}(${y.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else _=m.setByOffset("global_idx",f(g.getByOffset("global_idx"),y.getByOffset("global_idx")));else{if(!s)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let e=(e,r,i="")=>{let a=`aData[indexA${r}][componentA${r}]`,n=`bData[indexB${r}][componentB${r}]`;return`
            let outputIndices${r} = ${m.offsetToIndices(`global_idx * 4u + ${r}u`)};
            let offsetA${r} = ${g.broadcastedIndicesToOffset(`outputIndices${r}`,m)};
            let offsetB${r} = ${y.broadcastedIndicesToOffset(`outputIndices${r}`,m)};
            let indexA${r} = offsetA${r} / 4u;
            let indexB${r} = offsetB${r} / 4u;
            let componentA${r} = offsetA${r} % 4u;
            let componentB${r} = offsetB${r} % 4u;
            ${e}[${r}] = ${i}(${h(a,n)});
          `};_=9===p?`
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
        ${e.registerUniform("vec_size","u32").declareVariables(g,y,m)}

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${_}
      }`})(e,u,l,p,h,d,f,n,i.dataType,a.dataType,o,s),getRunData:()=>({outputs:[{dims:p,dataType:o}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(e3.size(p)/4)},...tT(u,l,p)]})}})(r,n??"",e.inputs[0],e.inputs[1],i,a,s))},r7=e=>{r9(e,"Add",(e,r)=>`${e}+${r}`)},ie=e=>{r9(e,"Div",(e,r)=>`${e}/${r}`)},it=e=>{r9(e,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},ir=e=>{r9(e,"Mul",(e,r)=>`${e}*${r}`)},ii=e=>{let r=tR("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;r9(e,"Pow",{scalar:(e,r)=>`pow_custom(${e},${r})`,vector:(e,r)=>`pow_vector_custom(${e},${r})`},`
    fn pow_custom(a : ${r}, b : ${r}) -> ${r} {
      if (b == ${r}(0.0)) {
        return ${r}(1.0);
      } else if (a < ${r}(0.0) && f32(b) != floor(f32(b))) {
        return ${r}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${r}(1.0), round(f32(abs(b) % ${r}(2.0))) != 1.0) * ${r}(${"i32"===r?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${r}>, b : vec4<${r}>) -> vec4<${r}> {
      // TODO: implement vectorized pow
      return vec4<${r}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},ia=e=>{r9(e,"Sub",(e,r)=>`${e}-${r}`)},is=e=>{r9(e,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},io=e=>{r9(e,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},iu=e=>{r9(e,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},il=e=>{r9(e,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}}),nN=q(()=>{"use strict";nf(),ny(),nx(),nS(),id=(e,r)=>{let i=e.inputs,a=i[0].dims,n=e3.normalizeAxis(r.axis,a.length);var s=i,o=n;if(!s||s.length<1)throw Error("too few inputs");let u=s[0],l=u.dataType,d=u.dims.length;s.forEach((e,r)=>{if(0!==r){if(e.dataType!==l)throw Error("input tensors should be one type");if(e.dims.length!==d)throw Error("input tensors should have the same shape");e.dims.forEach((e,r)=>{if(r!==o&&e!==u.dims[r])throw Error("non concat dimensions must match")})}});let p=a.slice();p[n]=i.reduce((e,r)=>e+(r.dims.length>n?r.dims[n]:0),0);let c=i.filter(e=>e3.size(e.dims)>0);e.compute(((e,r,i,a)=>{let n=e3.size(i),s=Array(e.length),o=Array(e.length),u=0,l=[],d=[],p=[{type:12,data:n}];for(let i=0;i<e.length;++i)u+=e[i].dims[r],s[i]=u,d.push(e[i].dims.length),o[i]=tR(`input${i}`,a,d[i]),l.push("rank"),p.push({type:12,data:s[i]});for(let r=0;r<e.length;++r)p.push(...tT(e[r].dims));p.push(...tT(i));let c=tB("output",a,i.length),h=c.indicesGet("indices",r),f=Array.from(Array(s.length).keys()).map(e=>`uniforms.sizeInConcatAxis${e}`).join(",");return{name:"Concat",shaderCache:{hint:`${r}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p}),getShaderSource:r=>{let i,a;return`

  ${(()=>{r.registerUniform("outputSize","u32");for(let i=0;i<e.length;i++)r.registerUniform(`sizeInConcatAxis${i}`,"u32");return r.declareVariables(...o,c)})()}

  ${i=s.length,a=f,`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${i}u>(${a});
    for (var i: u32 = 0u; i < ${i}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${i}u;
  }`}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${f});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${((e,r)=>{let i=e.length,a=[];for(let n=0;n<i;++n){let s=r.setByOffset("global_idx",e[n].getByIndices("indices"));1===i?a.push(s):0===n?a.push(`if (inputIndex == ${n}u) { ${s} }`):n===i-1?a.push(`else { ${s} }`):a.push(`else if (inputIndex == ${n}) { ${s} }`)}return a.join(`
`)})(o,c)}
  }`}}})(c,n,p,i[0].dataType),{inputs:c})},ip=e=>tv({axis:e.axis})}),nM=q(()=>{"use strict";nf(),ny(),ic=(e,r,i="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${r}(0.0));`;case"Sigmoid":return`value = (${r}(1.0) / (${r}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${r}(${i}(uniforms.clip_min)), ${r}(${i}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${r}(0.0), min(${r}(1.0), ${i}(uniforms.alpha) * value + ${i}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${i}(uniforms.alpha) * value, value, value >= ${r}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${e.activation}`)}},ih=(e,r)=>{"Clip"===e.activation?r.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):"HardSigmoid"===e.activation?r.push({type:1,data:e.alpha},{type:1,data:e.beta}):"LeakyRelu"===e.activation&&r.push({type:1,data:e.alpha})},im=(e,r)=>{"Clip"===e.activation?r.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===e.activation?r.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===e.activation&&r.push({name:"alpha",type:"f32"})},ig=e=>{let r=e?.activation||"";if("HardSigmoid"===r){let[i,a]=e?.activation_params||[.2,.5];return{activation:r,alpha:i,beta:a}}if("Clip"===r){let[i,a]=e?.activation_params||[e8,e5];return{activation:r,clipMax:a,clipMin:i}}if("LeakyRelu"===r){let[i]=e?.activation_params||[.01];return{activation:r,alpha:i}}return{activation:r}}}),nD=q(()=>{"use strict";iy=(e,r)=>{switch(e){case 1:return r;case 2:return`vec2<${r}>`;case 3:return`vec3<${r}>`;case 4:return`vec4<${r}>`;default:throw Error(`${e}-component is not supported.`)}},i_=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),nP=q(()=>{"use strict";ib=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),nU=q(()=>{"use strict";nf(),ny(),nS(),nM(),i$=(e,r,i,a,n)=>{let s=a-i;return`
      ${Array.from({length:i}).map((i,o)=>`
      if (${tA(r.shape,o,r.rank)} != 1) {
        ${r.indicesSet(e,o,tA(n,o+s,a))}
      } else {
        ${r.indicesSet(e,o,0)}
      }`).join("")}
`},iv=(e,r,i,a,n=!1,s)=>{let o=e[0].dims,u=e[1].dims,l=o[o.length-2],d=u[u.length-1],p=o[o.length-1],c=tI(d),h=tI(p),f=tI(l),m=e3.size(i)/c/f,g=e.length>2,y=a?a.slice(0,-2):i.slice(0,-2),_=[e3.size(y),l,d],b=[{type:12,data:m},{type:12,data:l},{type:12,data:d},{type:12,data:p}];return ih(r,b),b.push(...tT(y,o,u)),g&&b.push(...tT(e[2].dims)),b.push(...tT(_)),{name:"MatMulNaive",shaderCache:{hint:`${r.activation};${c};${h};${f};${n}`,inputDependencies:g?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:a=>{let s=tM("batch_dims",e[0].dataType,y.length),l=tR("a",e[0].dataType,o.length,h),d=tR("b",e[1].dataType,u.length,c),p=tB("output",e[0].dataType,_.length,c),m=tS(p.type.tensor),b=ic(r,p.type.value,m),$=[l,d],v="";if(g){let r=n?c:1;$.push(tR("bias",e[2].dataType,e[2].dims.length,r)),v=`${n?`value += bias[col / ${r}];`:`value += ${p.type.value}(bias[row + i]);`}`}let w=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];return im(r,w),`
  ${a.registerUniforms(w).registerInternalVariables(s).declareVariables(...$,p)}
  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${2===i.length?"":`let batch_indices = ${s.offsetToIndices("batch")};`}

    var a_indices: ${l.type.indices};
    ${i$("a_indices",l,l.rank-2,s.rank,"batch_indices")}
    ${l.indicesSet("a_indices",l.rank-2,0)}
    ${l.indicesSet("a_indices",l.rank-1,0)}
    let a_offset = ${l.indicesToOffset("a_indices")};

    var b_indices: ${d.type.indices};
    ${i$("b_indices",d,d.rank-2,s.rank,"batch_indices")}
    ${d.indicesSet("b_indices",d.rank-2,0)}
    ${d.indicesSet("b_indices",d.rank-1,0)}
    let b_offset = ${d.indicesToOffset("b_indices")};
    var values: array<${p.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${(()=>{let e=`var a_data: ${l.type.value};`;for(let r=0;r<h;r++)e+=`
              let b_data${r} = b[(b_offset + (k + ${r}) * uniforms.N + col) / ${c}];`;for(let r=0;r<f;r++){e+=`a_data = a[(a_offset + (row + ${r}) * uniforms.K + k) / ${h}];`;for(let i=0;i<h;i++)e+=`
            values[${r}] = fma(${d.type.value}(a_data${1===h?"":`[${i}]`}), b_data${i}, values[${r}]);
`}return e})()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${v}
      ${b}
      let cur_indices = ${p.type.indices}(batch, row + i, col);
      let offset = ${p.indicesToOffset("cur_indices")};
      ${p.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `}}}}),nq=q(()=>{"use strict";nf(),ny(),nS(),nM(),nU(),nD(),iw=(e,r,i="f32",a,n=!1,s=32,o=!1,u=32)=>{let l,d,p,c,h=r[1]*e[1],f=r[0]*e[0],m=n?h:s,g=n?s:h,y=m/r[0],_=s/r[1];if(!((n&&4===y&&4===e[1]||!n&&(3===y||4===y))&&m%r[0]==0&&s%r[1]==0&&4===e[0]))throw Error(`If transposeA ${n} is true, innerElementSize ${y} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${y} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${r[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${r[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${y}<${i}>, ${m/y}>, ${g}>;
var<workgroup> mm_Bsub: array<array<vec4<${i}>, ${f/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${y};
const tileInner = ${s};

@compute @workgroup_size(${r[0]}, ${r[1]}, ${r[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${o?"0":"i32(globalId.z)"};
  ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${h};

  let num_tiles = ${o?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${i}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${l=n,d=a,l?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${d?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${d?", batchIndices":""});
        `}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${a?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${3===y?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${p=n,c=y,p?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${3===c?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${3===c?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${3===c?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},ix=(e,r)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${r?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${r?", batchIndices":""});
            `,iS=(e,r,i="f32",a,n=!1,s=32,o=!1,u=32,l=!1)=>{let d=e[1]*r[1],p=e[0]*r[0],c=n?d:s,h=n?s:d;if(h%r[1]!=0||c%r[0]!=0||s%r[1]!=0)throw Error(`tileAHight ${h} must be divisible by workgroupSize[1]${r[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${r[0]}, tileInner ${s} must be divisible by workgroupSize[1]${r[1]}`);let f=h/r[1],m=c/r[0],g=s/r[1],y=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${r[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${r[0]}) {
          ${ix(n,a)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${r[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${r[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${a?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${i}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${r[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${r[1]}];`:`mm_Asub[localRow + innerRow * ${r[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${r[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${r[0]};
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
      ${ix(n,a)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${a?", batchIndices":""});
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
      ${n?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];"}
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
  var<workgroup> mm_Asub : array<array<${i}, ${c}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${i}, ${p}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${r[0]}, ${r[1]}, ${r[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?"0":"i32(globalId.z)"};
    ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${o?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${i}, colPerThread>, rowPerThread>;
    ${y}
  }
`},ik=(e,r,i,a,n=!1,s)=>{let o=e[0].dims,u=e[1].dims,l=o.slice(0,-2),d=u.slice(0,-2),p=a?a.slice(0,-2):i.slice(0,-2),c=e3.size(p),h=o[o.length-2],f=o[o.length-1],m=u[u.length-1],g=f%4==0&&m%4==0,y=h<=8?[4,1,1]:[4,4,1],_=[8,8,1],b=[Math.ceil(m/_[0]/y[0]),Math.ceil(h/_[1]/y[1]),Math.ceil(c/_[2]/y[2])],$=g?4:1,v=[...l,h,f/$],w=v.length,x=[...d,f,m/$],S=x.length,k=[c,h,m/$],T=[{type:6,data:h},{type:6,data:m},{type:6,data:f}];ih(r,T),T.push(...tT(p,v,x));let I=["rank","rank"],E=e.length>2;return E&&(T.push(...tT(e[2].dims)),I.push("rank")),T.push(...tT(k)),{name:"MatMul",shaderCache:{hint:`${y};${r.activation};${g};${n}`,inputDependencies:I},getRunData:()=>({outputs:[{dims:s?s(i):i,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:T}),getShaderSource:i=>{let a=p.length,s=tM("batchDims",e[0].dataType,a,1),o=tS(e[0].dataType),u=tR("a",e[0].dataType,w,$),l=tR("b",e[1].dataType,S,$),d=tB("result",e[0].dataType,k.length,$),c=[u,l];if(E){let r=n?$:1;c.push(tR("bias",e[2].dataType,e[2].dims.length,r))}let h=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];im(r,h);let f=tS(d.type.tensor),m=((e,r,i,a,n=!1)=>{let[s,o,u,l]=a,d=tS(a[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${iy(e,d)} {
      var value = ${iy(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${i$("aIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${iy(e,d)} {
      var value = ${iy(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${i$("bIndices",u,u.rank-2,s.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${iy(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${r?`value = value + ${n?"bias[colIn]":`${iy(e,d)}(bias[row])`};`:""}
        ${i}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `})($,E,ic(r,d.type.value,f),[s,u,l,d],n);return`
  ${i.registerUniforms(h).registerInternalVariables(s).declareVariables(...c,d)}
  ${m}
  ${g?iw(y,_,o,s):iS(y,_,o,s)}
                   `}}}}),nW=q(()=>{"use strict";nf(),ng(),nS(),nM(),nD(),nP(),nq(),iT=(e,r,i,a,n,s,o,u,l)=>{let d="NHWC"===r.format,p=d?e[0].dims[3]:e[0].dims[1],c=i[0],h=d?i[2]:i[3],f=d?i[1]:i[2],m=d?i[3]:i[1],g=d&&(p%4==0||p%3==0)&&m%4==0,y=d?m:h*f,_=d?h*f:m,b=[8,8,1],$=a<=8?[4,1,1]:[4,4,1],v=[Math.ceil(y/b[0]/$[0]),Math.ceil(_/b[1]/$[1]),Math.ceil(c/b[2]/$[2])];e0("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${v}`);let w=g?d&&p%4!=0?3:4:1,x=b[1]*$[1],S=b[0]*$[0],k=Math.max(b[0]*w,b[1]),T=a%x==0,I=n%S==0,E=s%k==0,z=g?[w,4,4]:[1,1,1],C=[{type:6,data:a},{type:6,data:n},{type:6,data:s},{type:6,data:[r.pads[0],r.pads[1]]},{type:6,data:r.strides},{type:6,data:r.dilations}];ih(r,C),C.push(...tT(e[0].dims,e[1].dims));let A=["rank","rank"];return o&&(C.push(...tT(e[2].dims)),A.push("rank")),C.push(...tT(i)),{name:"Conv2DMatMul",shaderCache:{hint:`${r.cacheKey};${w};${g};${T};${I};${E};${x};${S};${k}`,inputDependencies:A},getRunData:()=>({outputs:[{dims:l?l(i):i,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:C}),getShaderSource:a=>{let n=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];im(r,n);let s=g?4:1,l=tS(e[0].dataType),p=`
      fn setOutputAtIndex(flatIndex : i32, value : ${g?`vec4<${l}>`:l}) {
        result[flatIndex] = ${g?`vec4<${l}>`:l}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${g?`vec4<${l}>`:l}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${g?"/ 4":""}, value);
      }`,c=[tR("x",e[0].dataType,e[0].dims.length,3===w?1:w),tR("w",e[1].dataType,e[1].dims.length,s)],h=tB("result",e[0].dataType,i.length,s);if(o){let r=tR("bias",e[2].dataType,e[2].dims.length,s);c.push(r),p+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${g?`vec4<${l}>`:l} {
          return bias[coords.${d?"w":"y"}${g?"/ 4":""}];
        }`}return`
        ${ib("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${a.registerUniforms(n).declareVariables(...c,h)}
        ${p}
        ${((e,r,i,a,n=!1,s,o=4,u=4,l=4,d="f32")=>{let p=e=>{switch(e){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${e} is not supported.`)}},c=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,h=e?`
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
    `,f=e?"row":"col",m=e?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${f} / outWidth;
    let outCol = ${f} % outWidth;

    let WRow = ${m} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${m} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${m} % inChannels;
    var resData = ${iy(o,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])"} && xCol >= 0 && xCol < ${e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])"}) {
      ${c}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${(e=>{switch(e){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw Error(`innerElementSize ${e} is not supported.`)}})(o)}
    }
    return resData;`,y=e?r&&a?`
    let col = colIn * ${o};
    ${g}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${iy(o,d)}(0.0);`:a&&i?`
    let col = colIn * ${o};
    ${g}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${iy(o,d)}(0.0);`,_=e?a&&i?p(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(u)}
    }
    return ${iy(u,d)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(u)}
    }
    return ${iy(u,d)}(0.0);`,b=iy(l,d),$=e?iy(o,d):iy(u,d),v=e?iy(u,d):iy(o,d),w=ic(s,b,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${$} {
      ${e?y:_}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${v} {
      ${e?_:y}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${b}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${i_(n)}
      ${w}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`})(d,T,I,E,o,r,z[0],z[1],z[2],l)}
        ${g?iw($,b,l,void 0,!d,k):iS($,b,l,void 0,!d,k,!1,void 0,u)}`}}}}),nL=q(()=>{"use strict";nf(),ng(),ny(),nS(),nM(),nD(),iI=e=>"number"==typeof e?[e,e,e]:e,iE=(e,r)=>r<=1?e:e+(e-1)*(r-1),iz=(e,r,i,a,n)=>{null==n&&(n=((e,r,i,a=1)=>{let n=iE(r,a);return Math.floor((e[0]*(i-1)-i+n)/2)})(e,r[0],a[0]));let s=[0,0,0,i];for(let i=0;i<3;i++)e[i]+2*n>=r[i]&&(s[i]=Math.trunc((e[i]-r[i]+2*n)/a[i]+1));return s},iC=(e,r,i,a,n,s=!1,o="channelsLast")=>{let u,l,d,p,c;if("channelsLast"===o)[u,l,d,p,c]=e;else if("channelsFirst"===o)[u,c,l,d,p]=e;else throw Error(`Unknown dataFormat ${o}`);let[h,,f,m,g]=r,[y,_,b]=iI(i),[$,v,w]=iI(a),x=iE(f,$),S=iE(m,v),k=iE(g,w),{padInfo:T,outDepth:I,outHeight:E,outWidth:z}=((e,r,i,a,n,s,o,u,l,d)=>{let p,c,h,f;if("VALID"===e&&(e=0),"number"==typeof e){p={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=iz([r,i,a,1],[u,l,d],1,[n,s,o],e);c=m[0],h=m[1],f=m[2]}else if(Array.isArray(e)){if(!e.every((e,r,i)=>e===i[0]))throw Error(`Unsupported padding parameter: ${e}`);p={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=iz([r,i,a,1],[u,l,d],1,[n,s,o],e[0]);c=m[0],h=m[1],f=m[2]}else if("SAME_UPPER"===e){c=Math.ceil(r/n),h=Math.ceil(i/s),f=Math.ceil(a/o);let e=(c-1)*n+u-r,m=(h-1)*s+l-i,g=(f-1)*o+d-a,y=Math.floor(e/2),_=Math.floor(m/2),b=Math.floor(g/2);p={top:_,bottom:m-_,left:b,right:g-b,front:y,back:e-y}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:p,outDepth:c,outHeight:h,outWidth:f}})(n,l,d,p,y,_,b,x,S,k),C=s?h*c:h,A=[0,0,0,0,0];return"channelsFirst"===o?A=[u,C,I,E,z]:"channelsLast"===o&&(A=[u,I,E,z,C]),{batchSize:u,dataFormat:o,inDepth:l,inHeight:d,inWidth:p,inChannels:c,outDepth:I,outHeight:E,outWidth:z,outChannels:C,padInfo:T,strideDepth:y,strideHeight:_,strideWidth:b,filterDepth:f,filterHeight:m,filterWidth:g,effectiveFilterDepth:x,effectiveFilterHeight:S,effectiveFilterWidth:k,dilationDepth:$,dilationHeight:v,dilationWidth:w,inShape:e,outShape:A,filterShape:r}},iA=(e,r,i,a,n,s)=>{let o="channelsLast"===s,u=(o?e[0].dims[3]:e[0].dims[1],[Math.ceil((e=>{let r=1;for(let i=0;i<e.length;i++)r*=e[i];return r})(({x:i.map((e,r)=>r)}).x.map(e=>i[e]))/64),1,1]);e0("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let l=[{type:12,data:e3.size(i)},{type:12,data:a},{type:12,data:n},{type:12,data:r.strides},{type:12,data:r.dilations}];ih(r,l),l.push(...tT(e[0].dims,e[1].dims));let d=["rank","rank"],p=3===e.length;return p&&(l.push(...tT(e[2].dims)),d.push("rank")),l.push(...tT(i)),{name:"Conv3DNaive",shaderCache:{hint:`${r.cacheKey};${o};1;${p}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:l}),getShaderSource:s=>{let u=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:a.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:r.strides.length},{name:"dilations",type:"u32",length:r.dilations.length}];im(r,u);let l=tS(e[0].dataType),d=tR("x",e[0].dataType,e[0].dims.length,1),c=tR("W",e[1].dataType,e[1].dims.length,1),h=[d,c],f=tB("result",e[0].dataType,i.length,1),m="";if(p){let r=tR("bias",e[2].dataType,e[2].dims.length,1);h.push(r),m+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l} {
          return bias[${o?tA("coords",4,5):tA("coords",1,5)}];
        }`}let g=iy(1,l),y=ic(r,g,l);return`
            ${m}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${d.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${c.getByIndices("aIndices")};
            }
          ${s.registerUniforms(u).declareVariables(...h,f)}
          ${s.mainStart()}
          ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${f.offsetToIndices("global_idx")};
              let batch = ${tA("coords",0,d.rank)};
              let d2 = ${o?tA("coords",d.rank-1,d.rank):tA("coords",1,d.rank)};
              let xFRCCorner = vec3<u32>(${o?tA("coords",1,d.rank):tA("coords",2,d.rank)},
              ${o?tA("coords",2,d.rank):tA("coords",3,d.rank)},
              ${o?tA("coords",3,d.rank):tA("coords",4,d.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?tA("uniforms.x_shape",1,d.rank):tA("uniforms.x_shape",2,d.rank)};
              let xShapeZ = ${o?tA("uniforms.x_shape",2,d.rank):tA("uniforms.x_shape",3,d.rank)};
              let xShapeW = ${o?tA("uniforms.x_shape",3,d.rank):tA("uniforms.x_shape",4,d.rank)};
              let xShapeU = ${o?tA("uniforms.x_shape",4,d.rank):tA("uniforms.x_shape",1,d.rank)};
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
                      ${o?`let xValues = vec4<f32>(
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
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<f32>(
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
                      ${o?`let xValues = vec3<f32>(
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
              ${p?"value = value + getBiasByOutputCoords(coords)":""};
              ${y}
              result[global_idx] = f32(value);
          }`}}}}),nV=q(()=>{"use strict";nf(),ny(),nS(),nM(),iO=(e,r,i,a)=>{let n=e.length>2,s=n?"value += b[output_channel];":"",o=e[0].dims,u=e[1].dims,l="NHWC"===r.format,d=l?i[3]:i[1],p=d/r.group,c=l&&p>=4?tI(d):1,h=e3.size(i)/c,f=[{type:12,data:h},{type:12,data:r.dilations},{type:12,data:[r.strides[0],r.strides[1]]},{type:12,data:[r.pads[0],r.pads[1]]},{type:12,data:p}];return ih(r,f),f.push(...tT(o,[u[0],u[1],u[2],u[3]/c])),f.push(...tT([i[0],i[1],i[2],i[3]/c])),{name:"GroupedConv",shaderCache:{hint:`${r.cacheKey}_${c}`,inputDependencies:n?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:a=>{let d=tB("output",e[0].dataType,i.length,c),p=tS(d.type.tensor),h=ic(r,d.type.value,p),f=tR("x",e[0].dataType,o.length),m=tR("w",e[1].dataType,u.length,c),g=[f,m];n&&g.push(tR("b",e[2].dataType,e[2].dims,c));let y=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:r.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];im(r,y);let _=l?`
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
  ${a.registerUniforms(y).declareVariables(...g,d)}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${d.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${d.type.value} = ${d.type.value}(0);
    ${_}
    ${s}
    ${h}
    ${d.setByOffset("global_idx","value")}
  }`}}},iR=(e,r,i,a)=>{let n=e.length>2,s=tI(i[3]),o=tI(i[2]),u=e3.size(i)/s/o,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],p=[i[0],i[1],i[2],i[3]/s],c=[{type:12,data:u},{type:6,data:[r.strides[0],r.strides[1]]},{type:6,data:[r.pads[0],r.pads[1]]}];ih(r,c),c.push(...tT(l,d,p));let h=(o-1)*r.strides[1]+d[1];return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${r.cacheKey};${s};${o};${h};${d[0]};${d[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:i=>{let a=tB("output",e[0].dataType,p.length,s),u=tS(a.type.tensor),c=ic(r,a.type.value,u),f=tR("x",e[0].dataType,l.length,s),m=tR("w",e[1].dataType,d.length,s),g=[f,m];n&&g.push(tR("b",e[2].dataType,e[2].dims,s));let y=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return im(r,y),`
  ${i.registerUniforms(y).declareVariables(...g,a)}
  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${f.type.value}, ${h}>;
    var values: array<${a.type.value}, ${o}>;
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
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${n?"value += b[output_channel];":""}
      ${c}
      ${a.set("batch","row","col + i","output_channel","value")};
    }
  }`}}}}),nG=q(()=>{"use strict";ny(),nW(),nL(),nq(),nV(),nM(),nU(),nk(),iB=[2,3,1,0],iN=(e,r)=>{let i=e.kernelShape.slice();i.length<r[1].dims.length-2&&i.push(...Array(r[1].dims.length-2-i.length).fill(0));for(let e=2;e<r[1].dims.length;++e)0===i[e-2]&&(i[e-2]=r[1].dims[e]);let a=e.pads.slice();e4.adjustPadsBasedOnAutoPad(r[0].dims,e.strides,e.dilations,i,a,"NHWC"===e.format,e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:i,pads:a}),n},iM=e=>{let r=ig(e),i=e.format;return{autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],format:i,dilations:e.dilations,group:e.group,kernelShape:e.kernel_shape,pads:e.pads,strides:e.strides,wIsConst:e.w_is_const(),...r,cacheKey:`${e.format};${r.activation};`}},iD=(e,r,i,a)=>{var n,s,o,u,l,d;let p,c,h,f,m,g,y="NHWC"===i.format,_=(n=r[0].dims,s=r[1].dims,o=i.dilations,u=i.pads,l=i.strides,d=y,p=n[0],h=(c=n.slice(d?1:2,d?3:4)).length,f=s[0],m=s.slice(2).map((e,r)=>e+(e-1)*(o[r]-1)),(g=c.map((e,r)=>e+u[r]+u[r+h]).map((e,r)=>Math.floor((e-m[r]+l[r])/l[r]))).splice(0,0,p),g.splice(d?3:1,0,f),g);if(1!==i.group){let n=[r[0]];if(y){let a=e.kernelCustomData.wT??e.compute(tq(r[1],iB),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a),n.push(a)}else n.push(r[1]);3===r.length&&n.push(r[2]),!e.adapterInfo.isArchitecture("ampere")&&y&&r[1].dims[0]===i.group&&1===r[1].dims[1]&&1===i.dilations[0]&&1===i.dilations[1]?e.compute(iR(n,i,_,a),{inputs:n}):e.compute(iO(n,i,_,a),{inputs:n});return}let b=3===r.length,$=r[0].dims[y?1:2],v=r[0].dims[y?2:3],w=r[0].dims[y?3:1],x=r[1].dims[2],S=r[1].dims[3],k=_[y?1:2],T=_[y?2:3],I=_[y?3:1],E=y&&x===$&&S===v&&0===i.pads[0]&&0===i.pads[1];if(E||1===x&&1===S&&1===i.dilations[0]&&1===i.dilations[1]&&1===i.strides[0]&&1===i.strides[1]&&0===i.pads[0]&&0===i.pads[1]){let n=_[0],s,o,u,l=[];if(y){let a=e.kernelCustomData.wT??e.compute(tq(r[1],iB),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];if(i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a),E){let e=$*v*w;s=r[0].reshape([1,n,e]),o=a.reshape([1,e,I]),u=[1,n,I]}else s=r[0].reshape([n,$*v,w]),o=a.reshape([1,w,I]),u=[n,k*T,I];l.push(s),l.push(o)}else s=r[0].reshape([n,w,$*v]),o=r[1].reshape([1,I,w]),u=[n,I,k*T],l.push(o),l.push(s);b&&l.push(r[2]);let d=u[2],p=l[0].dims[l[0].dims.length-1];d<8&&p<8?e.compute(iv(l,i,_,u,y,a),{inputs:l}):e.compute(ik(l,i,_,u,y,a),{inputs:l});return}let z=e.kernelCustomData.wT??e.compute(tq(r[1],iB),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z);let C=[r[0],z];b&&C.push(r[2]);let A=y?k*T:I,O=y?I:k*T,R=x*S*w;e.compute(iT(C,i,_,A,O,R,b,!0,a),{inputs:C})},iP=(e,r)=>{var i,a,n,s,o;if(((e,r)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===r.format?e[0].dims.length-1:1]!==e[1].dims[1]*r.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let i=e[0].dims.length-2;if(r.dilations.length!==i)throw Error(`dilations should be ${i}D`);if(r.strides.length!==i)throw Error(`strides should be ${i}D`);if(r.pads.length!==2*i)throw Error(`pads should be ${2*i}D`);if(0!==r.kernelShape.length&&r.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape")})(e.inputs,r),3===e.inputs[0].dims.length){let n,s,o,u,l,d,p;i=e,n="NHWC"===(a=r).format,s=[i.inputs[0].reshape(n?[i.inputs[0].dims[0],1,i.inputs[0].dims[1],i.inputs[0].dims[2]]:[i.inputs[0].dims[0],i.inputs[0].dims[1],1,i.inputs[0].dims[2]]),i.inputs[1].reshape([i.inputs[1].dims[0],i.inputs[1].dims[1],1,i.inputs[1].dims[2]])],3===i.inputs.length&&s.push(i.inputs[2]),o=[0,a.pads[0],0,a.pads[1]],u=[1].concat(a.strides),l=[1].concat(a.dilations),d=[1].concat(a.kernelShape),p=iN({...a,pads:o,strides:u,dilations:l,kernelShape:d},s),iD(i,s,p,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])}else if(5===e.inputs[0].dims.length){let i,a,u,l;n=e,s=e.inputs,i="NHWC"===(o=r).format?"channelsLast":"channelsFirst",a=iN(o,s),u="NOTSET"===o.autoPad?o.pads:o.autoPad,l=iC(s[0].dims,s[1].dims,o.strides,o.dilations,u,!1,i),n.compute(iA(s,a,l.outShape,[l.filterDepth,l.filterHeight,l.filterWidth],[l.padInfo.front,l.padInfo.top,l.padInfo.left],i))}else{let i=iN(r,e.inputs);iD(e,e.inputs,i)}}}),nH=q(()=>{"use strict";nf(),ng(),ny(),nS(),iU=(e,r,i)=>{let a=e.length>2,n=r.outputShape,s="NHWC"===r.format,o=r.group,u=e[1].dims,l=u[2]/o,d=u[3],p=s?tI(l):1,c=s&&1===d&&l>=4,h=c?4*Math.floor(l/4):Math.floor(l/p)*p,f=l-h,m=s?tI(d):1,g=s?1===d?p:m:1,y=e3.size(n)/m,_=[Math.ceil(y/64),1,1];e0("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${_}`);let b=["rank","rank"],$=[r.strides[0],r.strides[1]],v=[r.kernelShape[s?1:2],r.kernelShape[s?2:3]],w=[r.dilations[0],r.dilations[1]],x=[v[0]+(r.dilations[0]<=1?0:(r.kernelShape[s?1:2]-1)*(r.dilations[0]-1)),v[1]+(r.dilations[1]<=1?0:(r.kernelShape[s?2:3]-1)*(r.dilations[1]-1))],S=[x[0]-1-Math.floor((r.pads[0]+r.pads[2])/2),x[1]-1-Math.floor((r.pads[1]+r.pads[3])/2)],k=[{type:12,data:y},{type:12,data:$},{type:12,data:v},{type:12,data:w},{type:12,data:x},{type:6,data:S},{type:12,data:h},{type:12,data:l},{type:12,data:d},...tT(e[0].dims,e[1].dims)];return a&&(k.push(...tT(e[2].dims)),b.push("rank")),k.push(...tT(n)),{name:"ConvTranspose2D",shaderCache:{hint:`${r.cacheKey};${p}${g}${m}${c}${f}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:_[0],y:_[1],z:_[2]},outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],programUniforms:k}),getShaderSource:r=>{let i=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:$.length},{name:"filter_dims",type:"u32",length:v.length},{name:"dilations",type:"u32",length:v.length},{name:"effective_filter_dims",type:"u32",length:x.length},{name:"pads",type:"i32",length:S.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],o=tS(e[0].dataType),u=s?1:2,l=s?2:3,d=s?3:1,h=tR("W",e[1].dataType,e[1].dims.length,g),y=tR("Dy",e[0].dataType,e[0].dims.length,p),_=[y,h];a&&_.push(tR("bias",e[2].dataType,[n[d]].length,m));let b=tB("result",e[0].dataType,n.length,m),w=`
            let outputIndices = ${b.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${b.indicesGet("outputIndices",0)};
            let d1 = ${b.indicesGet("outputIndices",d)};
            let r = ${b.indicesGet("outputIndices",u)};
            let c = ${b.indicesGet("outputIndices",l)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${b.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${o}(dyRCorner) + ${o}(wR)) / ${o}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${o}(uniforms.Dy_shape[${u}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${o}(dyCCorner) + ${o}(wC)) / ${o}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${o}(uniforms.Dy_shape[${l}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${c?`
                var x_offset = ${y.indicesToOffset(`${y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${h.indicesToOffset(`${h.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${g};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${c?4:p}) {
                  ${(()=>{let e="";if(c)4===p?e+=`
        let xValue = ${y.getByOffset("x_offset")};
        let wValue = ${h.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:2===p?e+=`
          dotProd = dotProd + dot(vec4<${o}>(${y.getByOffset("x_offset")}, ${y.getByOffset("x_offset + 1u")}), vec4<${o}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:1===p&&(e+=`
          dotProd = dotProd + dot(vec4<${o}>(${y.getByOffset("x_offset")}, ${y.getByOffset("x_offset + 1u")}, ${y.getByOffset("x_offset + 2u")}, ${y.getByOffset("x_offset + 3u")}), vec4<${o}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}, ${h.getByOffset("w_offset + 2u")}, ${h.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(e+=`
                  let xValue = ${s?y.getByOffset(`${y.indicesToOffset(`${y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):y.get("batch","inputChannel","idyR","idyC")};
        `,1===p)e+=`
          let w_offset = ${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${h.getByOffset(`w_offset / ${g}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let r=0;r<p;r++)e+=`
            let wValue${r} = ${h.getByOffset(`${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${r}, wOutChannel)`)} / ${g}`)};
            dotProd = dotProd + xValue[${r}] * wValue${r};`;return e})()}
                  inputChannel = inputChannel + ${c?4:p};
                }
                ${(()=>{if(0===f)return"";if(!c)throw Error(`packInputAs4 ${c} is not true.`);let e="";if(1===p){e+="dotProd = dotProd";for(let r=0;r<f;r++)e+=`
            + ${y.getByOffset(`x_offset + ${r}`)} * ${h.getByOffset(`w_offset + ${r}`)}`;e+=";"}else if(2===p){if(2!==f)throw Error(`Invalid inputChannelsRemainder ${f}.`);e+=`
          let xValue = ${y.getByOffset("x_offset")};
          let wValue = ${h.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return e})()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${a?` + bias[d1 / ${m}]`:""};
            ${b.setByOffset("global_idx","value")};
          `;return`
    ${r.registerUniforms(i).declareVariables(..._,b)}
      ${r.mainStart()}
      ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${w}}`}}}}),nF=q(()=>{"use strict";nH(),nM(),nk(),iq=(e,r,i,a,n,s)=>(e-1)*r+i+(a-1)*n+1-s,iW=(e,r,i,a,n)=>{let s=Math.floor(e/2);"SAME_UPPER"===r?(i[a]=s,i[n]=e-s):"SAME_LOWER"===r&&(i[a]=e-s,i[n]=s)},iL=(e,r)=>{let i=e.kernelShape.slice();if(0===e.kernelShape.length||0===e.kernelShape.reduce((e,r)=>e*r,1)){i.length=0;for(let e=2;e<r[1].dims.length;++e)i.push(r[1].dims[e])}let a="NHWC"===e.format;i.splice(0,0,r[1].dims[0]),i.splice(a?3:1,0,r[1].dims[1]);let n=e.pads.slice(),s=e.outputShape.slice(),o=e.outputPadding.slice(),u=r[0].dims,l=e.dilations.slice();0===l.reduce((e,r)=>e+r,0)&&(l=Array(r[0].dims.length-2).fill(1));let d=e.strides.slice();0===d.reduce((e,r)=>e+r,0)&&(d=Array(r[0].dims.length-2).fill(1)),((e,r,i,a,n,s,o,u,l,d)=>{let p=e.length-2,c=0===d.length;l.length<p&&l.push(...Array(p-l.length).fill(0));let h=e[0],f=r[u?3:1]*n;for(let n=0,h=e.length-p-!!u;n<p;++n,++h){let u=e[h],f=c?u*o[n]:d[n];iW(iq(u,o[n],s[n],r[h],i[n],f),a,s,n,n+p),c&&d.push(o[n]*(u-1)+l[n]+(r[h]-1)*i[n]+1-s[n]-s[n+p])}d.splice(0,0,h),d.splice(u?3:1,0,f)})(u,i,l,e.autoPad,e.group,n,d,a,o,s);let p=Object.assign({},e);return Object.assign(p,{kernelShape:i,pads:n,outputPadding:o,outputShape:s,dilations:l,strides:d}),p},iV=e=>{let r=ig(e),i=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,s=e.group??1,o=e.kernelShape,u=e.pads,l=e.strides,d=e.wIsConst();return{autoPad:a,format:i,dilations:n,group:s,kernelShape:o,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:u,strides:l,wIsConst:d,...r,cacheKey:`${e.format};${r.activation};`}},iG=(e,r,i,a)=>{let n=e.kernelCustomData.wT??e.compute(tq(r[1],[2,3,0,1]),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let s=[r[0],n];3===r.length&&s.push(r[2]),e.compute(iU(s,i,a),{inputs:s})},iH=(e,r)=>{if(((e,r)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length&&3!==e[0].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===r.format?e[0].dims.length-1:1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*r.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==i))throw Error("invalid bias");let a=e[0].dims.length-2;if(r.dilations.reduce((e,r)=>e+r,0)>0&&r.dilations.length!==a)throw Error(`dilations should be ${a}D`);if(r.strides.reduce((e,r)=>e+r,0)>0&&r.strides.length!==a)throw Error(`strides should be ${a}D`);if(r.pads.reduce((e,r)=>e+r,0)>0&&r.pads.length!==2*a)throw Error(`pads should be ${2*a}D`);if(r.outputPadding.length!==a&&0!==r.outputPadding.length)throw Error(`output_padding should be ${a}D`);if(r.kernelShape.reduce((e,r)=>e+r,0)>0&&0!==r.kernelShape.length&&r.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==r.outputShape.length&&r.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape")})(e.inputs,r),3===e.inputs[0].dims.length){var i,a;let n,s,o,u,l,d,p,c;i=e,n="NHWC"===(a=r).format,s=[i.inputs[0].reshape(n?[i.inputs[0].dims[0],1,i.inputs[0].dims[1],i.inputs[0].dims[2]]:[i.inputs[0].dims[0],i.inputs[0].dims[1],1,i.inputs[0].dims[2]]),i.inputs[1].reshape([i.inputs[1].dims[0],i.inputs[1].dims[1],1,i.inputs[1].dims[2]])],3===i.inputs.length&&s.push(i.inputs[2]),(0===(o=a.kernelShape).length||0===o[0])&&(o=[i.inputs[1].dims[2]]),(0===(u=a.dilations).length||0===u[0])&&(u=[1]),(0===(l=a.strides).length||0===l[0])&&(l=[1]),0===(d=a.pads).length&&(d=[0,0]),d=[0,d[0],0,d[1]],l=[1].concat(l),u=[1].concat(u),o=[1].concat(o),p=[0].concat(p=a.outputPadding),c=iL({...a,pads:d,strides:l,dilations:u,kernelShape:o,outputPadding:p},s),iG(i,s,c,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])}else{let i=iL(r,e.inputs);iG(e,e.inputs,i)}}}),nj=q(()=>{"use strict";nf(),ny(),nx(),nS(),iF=(e,r)=>{var i,a,n,s;let o,u,l,d,p,c,h=e.inputs[0].dims,f=e.inputs[0].dataType,m=e.inputs[1];e.compute((i=f,a=h,n=m,s=r,o=e3.size(a),u=a.length,l=tR("input",i,u),d=tB("output",i,u),p=6===n.dataType?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),c=e3.normalizeAxis(p,u),{name:"CumSum",shaderCache:{hint:s.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...tT(a,a)]}),getShaderSource:e=>{let r=` i32(${l.indicesGet("inputIndices","uniforms.axis")}) `,i=tA("uniforms.input_shape","uniforms.axis",u),a=s.reverse?r+(s.exclusive?" + 1":""):"0",n=s.reverse?i:r+(s.exclusive?"":" + 1");return`
                ${e.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(l,d)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${d.offsetToIndices("global_idx")};
                  var sum = ${d.type.value}(0);
                  let first : i32 = ${a};
                  let last : i32 = ${n};
                  for (var i : i32 = first; i < last; i++) {
                    ${l.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${l.getByIndices("inputIndices")};
                  }
                  ${d.setByOffset("global_idx","sum")};
                }`}}),{inputs:[0]})},ij=e=>{let r=1===e.exclusive,i=1===e.reverse;return tv({exclusive:r,reverse:i})}}),nK=q(()=>{"use strict";nf(),ny(),nx(),nS(),iK=(e,r)=>{var i,a;let n,s,o,u,l,d,p,c,h,f,m,g,y,_;(e=>{if(!e||1!==e.length)throw Error("DepthToSpace requires 1 input.");if(4!==e[0].dims.length)throw Error("DepthToSpace requires 4D input.")})(e.inputs),e.compute((i=e.inputs[0],p="NHWC"===(a=r).format,c=a.blocksize,h="DCR"===a.mode,p?([n,s,o,u]=i.dims,l=h?[n,s,o,c,c,u/c**2]:[n,s,o,u/c**2,c,c],d=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,s,o,u]=[i.dims[0],i.dims[2],i.dims[3],i.dims[1]],l=h?[n,c,c,u/c**2,s,o]:[n,u/c**2,c,c,s,o],d=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]),m=(f=i.reshape(l)).dims.length,g=i.dataType,y=tR("a",g,m),_=tB("output",g,m),{name:"DepthToSpace",shaderCache:{hint:`${i.dims};${a.blocksize};${a.mode}`,inputDependencies:["rank"]},getRunData:e=>{let r=p?[n,s*c,o*c,u/c**2]:[n,u/c**2,s*c,o*c],i=e3.size(r),a=f.dims,l=e3.sortBasedOnPerm(a,d);return{outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...tT(a,l)]}},getShaderSource:e=>`
  ${e.registerUniform("output_size","u32").declareVariables(y,_)}

  ${((e,r,i,a)=>{let n=[];n.push(`fn perm(i: ${a.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`);for(let a=0;a<r;++a)n.push(i.indicesSet("a",e[a],`i[${a}]`));return n.push("return a;}"),n.join(`
`)})(d,m,y,_)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`}))},iQ=e=>tv({blocksize:e.blocksize,mode:e.mode,format:e.format})}),nQ=q(()=>{"use strict";nf(),ny(),nx(),nS(),iY="^"+(iX="("+(iZ="[a-zA-Z]|\\.\\.\\.")+")+")+"$",iJ="^"+("("+iX+",)*")+iX+"$",i0=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,r){let i=this.symbolToIndices.get(e);void 0===i?i=[r]:i.push(r),this.symbolToIndices.set(e,i)}},i1=class{constructor(e,r){this.equation=r,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[i,a]=r.includes("->")?r.split("->",2):[r,""];if(!i.match(RegExp(iJ)))throw Error("Invalid LHS term");if(i.split(",").forEach((r,i)=>{let a=e[i].dims.slice();if(!r.match(RegExp(iY)))throw Error("Invalid LHS term");let n=this.processTerm(r,!0,a,i);this.lhs.push(n)}),""===a)a+=[...this.symbolToInfo.entries()].filter(([e,r])=>1===r.count||"..."===e).map(([e])=>e).join("");else if(!a.match(RegExp(iX)))throw Error("Invalid RHS");a.match(RegExp(iZ,"g"))?.forEach(e=>{if("..."===e)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let r=this.symbolToInfo.get(e);if(void 0===r)throw Error("Invalid RHS symbol");this.outputDims.push(r.dimValue)}}),this.rhs=this.processTerm(a,!1,this.outputDims)}addSymbol(e,r,i){let a=this.symbolToInfo.get(e);if(void 0!==a){if(a.dimValue!==r&&1!==a.count)throw Error("Dimension mismatch");a.count++,a.inputIndices.push(i)}else a={count:1,dimValue:r,inputIndices:[i]};this.symbolToInfo.set(e,a)}processTerm(e,r,i,a=-1){let n=i.length,s=!1,o=[],u=0;if(!e.match(RegExp(iY))&&!r&&""!==e)throw Error("Invalid LHS term");let l=e.match(RegExp(iZ,"g")),d=new i0(a);return l?.forEach((e,p)=>{if("..."===e){if(s)throw Error("Only one ellipsis is allowed per input term");s=!0;let e=n-l.length+1;if(e<0)throw Error("Ellipsis out of bounds");if(o=i.slice(u,u+e),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=o;else throw Error("Ellipsis must be specified in the LHS");for(let e=0;e<o.length;e++){let r=String.fromCharCode(48+e);d.addSymbol(r,p+e),this.addSymbol(r,i[u++],a)}}else d.addSymbol(e,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,i[u++],a)}),d}},i2=(e,r)=>{var i,a,n,s;let o,u,l,d,p=new i1(e.inputs,r.equation),c=p.outputDims,h=e.inputs.map((e,r)=>e.dims);e.compute((i=h,a=e.inputs[0].dataType,n=p,s=c,o=i.map(e=>e.length).map((e,r)=>tR(`input${r}`,a,e)),u=e3.size(s),l=tB("output",a,s.length),d=[...n.symbolToInfo.keys()].filter(e=>!n.rhs.symbolToIndices.has(e)),{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:i.map(()=>"rank")},getRunData:()=>{let e=d.filter(e=>n.symbolToInfo.has(e)).map(e=>({type:12,data:n.symbolToInfo.get(e)?.dimValue||0}));e.push({type:12,data:u});let r=i.map((e,r)=>[...tT(e)]).reduce((e,r)=>e.concat(r),e);return r.push(...tT(s)),{outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:r}},getShaderSource:e=>{let r=[],i=[],a=[],s=[],u=[],p=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((e,d)=>{if(n.rhs.symbolToIndices.has(d)){let i=n.rhs.symbolToIndices.get(d)?.[0];void 0!==i&&n.lhs.forEach((a,n)=>{if(e.inputIndices.includes(n)){let e=a.symbolToIndices.get(d);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{r.push(`${o[n].indicesSet(`input${n}Indices`,e,l.indicesGet("outputIndices",i))}`)})}})}else n.lhs.forEach((r,a)=>{if(e.inputIndices.includes(a)){let e=r.symbolToIndices.get(d);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{i.push(`${o[a].indicesSet(`input${a}Indices`,e,`${d}`)}`)}),u.push(`prod *= ${o[a].getByIndices(`input${a}Indices`)};`)}}),a.push(`for(var ${d}: u32 = 0; ${d} < uniforms.${d+"_max"}; ${d}++) {`),s.push("}")});let c=p?[...r,`let sum = ${o.map((e,r)=>e.getByIndices(`input${r}Indices`)).join(" * ")};`]:[...r,"var sum = 0.0;",...a,...i,"var prod = 1.0;",...u,"sum += prod;",...s];return`
            ${e.registerUniforms(d.map(e=>({name:`${e+"_max"}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...o,l)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${l.offsetToIndices("global_idx")};
            ${o.map((e,r)=>`var input${r}Indices: ${o[r].type.indices};`).join(`
`)}
            ${c.join(`
`)};
            ${l.setByOffset("global_idx","sum")};
          }`}}))},i3=e=>{let r=e.equation.replace(/\s+/g,"");return tv({equation:r})}}),nZ=q(()=>{"use strict";nf(),ny(),nS(),i4=(e,r)=>{let i=e.length-r.length,a=[];for(let r=0;r<i;++r)a.push(e[r]);for(let n=0;n<r.length;++n)a.push(1===r[n]?e[n+i]:r[n]);return a},i6=e=>{var r;let i,a,n,s,o,u,l,d,p,c;(e=>{if(!e||2!==e.length)throw Error("Expand requires 2 input.");let r=e[0].dims,i=Array.from(e[1].getBigInt64Array(),Number),a=i.length<r.length?0:i.length-r.length,n=r.length<i.length?0:r.length-i.length;for(;a<i.length&&n<r.length;++a,++n)if(i[a]!==r[n]&&1!==i[a]&&1!==r[n])throw Error("Expand requires shape to be broadcastable to input")})(e.inputs),e.compute((s=(i=n=(r=e.inputs)[0].dims,a=Array.from(r[1].getBigInt64Array(),Number),i.length>a.length?i4(i,a):i4(a,i)),u=9===(o=r[0].dataType)||1===e3.size(n),l=9===o||n.length>0&&n[n.length-1]%4==0?4:1,d=u||s.length>0&&s[s.length-1]%4==0?4:1,c=[{type:12,data:p=Math.ceil(e3.size(s)/d)},...tT(n,s)],{name:"Expand",shaderCache:{hint:`${s.length};${l}${d}`,inputDependencies:["rank"]},getShaderSource:e=>{let r=tR("input",o,n.length,l),i=tB("output",o,s.length,d),a;if(9===o){let e=(e,a,n="")=>`
          let outputIndices${a} = ${i.offsetToIndices(`outputOffset + ${a}u`)};
          let offset${a} = ${r.broadcastedIndicesToOffset(`outputIndices${a}`,i)};
          let index${a} = offset${a} / 4u;
          let component${a} = offset${a} % 4u;
          ${e}[${a}] = ${n}(${r.getByOffset(`index${a}`)}[component${a}]);
        `;a=`
        let outputOffset = global_idx * ${d};
        var data = vec4<u32>(0);
        ${e("data",0,"u32")}
        ${e("data",1,"u32")}
        ${e("data",2,"u32")}
        ${e("data",3,"u32")}
        ${i.setByOffset("global_idx","data")}
      }`}else a=`
        let outputIndices = ${i.offsetToIndices(`global_idx * ${d}`)};
        let inputOffset = ${r.broadcastedIndicesToOffset("outputIndices",i)};
        let data = ${i.type.value}(${r.getByOffset(`inputOffset / ${l}`)});
        ${i.setByOffset("global_idx","data")}
      }`;return`
    ${e.registerUniform("vec_size","u32").declareVariables(r,i)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${a}`},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c})}),{inputs:[0]})}}),nX=q(()=>{"use strict";nf(),ny(),nS(),nO(),i8=e=>{var r;let i,a,n,s;e.inputs.length<2||0===e3.size(e.inputs[1].dims)?r2(e):e.compute((i=(r=e.inputs)[0].dataType,a=e3.size(r[0].dims),s=(n=e3.size(r[1].dims))%4==0,{name:"FastGeluWithBias",shaderCache:{hint:`${s}`,inputDependencies:["type","type"]},getShaderSource:e=>{let r=tR("x",i,[1],4),a=tR("bias",i,[1],4),n=tB("y",i,[1],4),o=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${a.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,u=s?`
      let bias = ${a.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${o(0)}${o(1)}${o(2)}${o(3)}
      let bias = ${r.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms([{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}]).declareVariables(r,a,n)}

    ${r0(tk(i))}

    ${e.mainStart(tw)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${r.getByOffset("global_idx")};
      ${u}
      let x_in = x + bias;
      ${n.setByOffset("global_idx",r1("x_in"))}
    }`},getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(a/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(a/tw/4)}})}))}}),nY=q(()=>{"use strict";nf(),ny(),nx(),nS(),i5=e=>tv({axis:e.axis}),i9=(e,r)=>{var i,a;let n,s,o,u,l,d,p,c,h;(e=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.")})(e.inputs),e.compute((i=e.inputs,a=r,n=i[0].dims,s=i[1].dims,o=n.length,u=e3.normalizeAxis(a.axis,o),(l=n.slice(0)).splice(u,1,...s),d=n[u],p=9===i[0].dataType?4:1,h=[{type:12,data:c=Math.ceil(e3.size(l)/p)},{type:6,data:d},{type:12,data:u},...tT(i[0].dims,i[1].dims,l)],{name:"Gather",shaderCache:{hint:a.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:e=>{let r=tR("data",i[0].dataType,i[0].dims.length,p),a=tR("inputIndices",i[1].dataType,i[1].dims.length),n=tB("output",i[0].dataType,l.length,p),d=e=>{let i=s.length,n=`var indicesIndices${e}  = ${a.type.indices}(0);`;for(let r=0;r<i;r++)n+=`${i>1?`indicesIndices${e}[${r}]`:`indicesIndices${e}`} = ${l.length>1?`outputIndices${e}[uniforms.axis + ${r}]`:`outputIndices${e}`};`;n+=`
          var idx${e} = ${a.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${r.type.indices};
        `;for(let r=0,a=0;r<o;r++)r===u?(n+=`${o>1?`dataIndices${e}[${r}]`:`dataIndices${e}`} = u32(idx${e});`,a+=i):(n+=`${o>1?`dataIndices${e}[${r}]`:`dataIndices${e}`} = ${l.length>1?`outputIndices${e}[${a}]`:`outputIndices${e}`};`,a++);return n},c;if(9===i[0].dataType){let e=(e,i,a="")=>`
          let outputIndices${i} = ${n.offsetToIndices(`outputOffset + ${i}u`)};
          ${d(i)};
          let offset${i} = ${r.indicesToOffset(`dataIndices${i}`)};
          let index${i} = offset${i} / 4u;
          let component${i} = offset${i} % 4u;
          ${e}[${i}] = ${a}(${r.getByOffset(`index${i}`)}[component${i}]);
        `;c=`
        let outputOffset = global_idx * ${p};
        var value = vec4<u32>(0);
        ${e("value",0,"u32")}
        ${e("value",1,"u32")}
        ${e("value",2,"u32")}
        ${e("value",3,"u32")}
        ${n.setByOffset("global_idx","value")}
      `}else c=`
      let outputIndices = ${n.offsetToIndices("global_idx")};
      ${d("")};
      let value = ${r.getByIndices("dataIndices")};
      ${n.setByOffset("global_idx","value")};
      `;return`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(r,a,n)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${c}
      }`}}))}}),nJ=q(()=>{"use strict";nf(),ny(),nS(),i7=(e,r)=>{var i,a,n,s,o,u;let l,d,p=e.inputs,c=p[0].dims,h=p[0].dataType,f=p[1].dims,m=f[f.length-1],g=e3.sizeToDimension(f,f.length-1),y=e3.sizeFromDimension(c,r.batchDims+m),_=e3.sizeToDimension(c,r.batchDims),b=e3.sizeFromDimension(c,r.batchDims),$=Array(m),v=y;for(let e=0;e<m;++e)$[m-1-e]=v,v*=c[r.batchDims+m-1-e];let w=(i=e,a=p[1],n=$,s=r.batchDims,o=c,l=[{type:12,data:u=g},{type:12,data:s},{type:12,data:o},{type:12,data:n},{type:12,data:g/_},{type:12,data:b},{type:12,data:m}],d=[u],l.push(...tT(a.dims,d)),i.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:i.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:e=>{let r=tR("indices_data",a.dataType,a.dims.length),i=tB("input_slice_offsets_data",12,1,1),s=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${e.registerUniforms(s).declareVariables(r,i)}
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
  }`}},{inputs:[a],outputs:[-1]})[0]),x=r.batchDims+m;if(x>c.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let S=f.slice(0,-1).concat(c.slice(x)),k=e3.size(S),T=[{type:12,data:k},{type:12,data:y},...tT(p[0].dims,w.dims,S)];e.compute({name:"GatherND",shaderCache:{hint:r.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:h}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:T}),getShaderSource:e=>{let r=tR("data",p[0].dataType,p[0].dims.length),i=tR("slice_offsets",12,w.dims.length),a=tB("output",p[0].dataType,S.length);return`
          ${e.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(r,i,a)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[p[0],w]})},ae=e=>({batchDims:e.batch_dims,cacheKey:""})}),n0=q(()=>{"use strict";nf(),ny(),nx(),nS(),at=(e,r)=>{var i,a;let n,s,o,u,l,d,p,c,h,f;((e,r)=>{if(e.length<3||e.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let i=e3.normalizeAxis(r.quantizeAxis,e[0].dims.length),a=r.blockSize,n=e[0],s=e[2],o=4===e.length?e[3]:void 0;if(s.dims.length!==n.dims.length||!n.dims.map((e,r)=>r===i?Math.ceil(e/a)===s.dims[r]:e===s.dims[r]).reduce((e,r)=>e&&r,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==n.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==s.dims.length||!o.dims.map((e,r)=>e===s.dims[r]).reduce((e,r)=>e&&r,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}})(e.inputs,r),e.compute((i=e.inputs,a=r,n=i[0].dims,s=i[1].dims,o=n.length,u=e3.normalizeAxis(a.gatherAxis,o),l=e3.normalizeAxis(a.quantizeAxis,o),(d=n.slice(0)).splice(u,1,...s),p=e3.size(d),c=i[2].dataType,h=22===i[0].dataType,f=[{type:12,data:p},{type:12,data:l},{type:12,data:u},{type:12,data:a.blockSize},...tT(...i.map((e,r)=>e.dims),d)],{name:"GatherBlockQuantized",shaderCache:{hint:`${a.cacheKey};${i.filter((e,r)=>1!==r).map(e=>e.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:i.length},(e,r)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:c}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:e=>{let r=tR("data",i[0].dataType,i[0].dims.length),a=tR("inputIndices",i[1].dataType,i[1].dims.length),o=tR("scales",i[2].dataType,i[2].dims.length),l=i.length>3?tR("zeroPoint",i[3].dataType,i[3].dims.length):void 0,p=tB("output",c,d.length),f=[r,a,o];return l&&f.push(l),`
        ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...f,p)}
        ${e.mainStart()}
        let output_indices = ${p.offsetToIndices("global_idx")};
        var indices_indices = ${a.type.indices}(0);
        ${s.length>1?`
          for (var i: u32 = 0; i < ${s.length}; i++) {
            let index = ${p.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${a.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${p.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${r.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${p.indicesGet("output_indices","i")};
          ${r.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${a.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[u]};
        }
        ${r.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${d.length}; i++) {
          let index = ${p.indicesGet("output_indices",`i + ${s.length} - 1`)};
          ${r.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${r.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${r.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${o.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${o.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${o.getByIndices("scale_indices")};
        ${l?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${l.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${l.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${tk(c)}(quantized_data - zero_point) * scale;
        ${p.setByOffset("global_idx","dequantized_data")};
    }`}}))},ar=e=>tv({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),n1=q(()=>{"use strict";nf(),ny(),nx(),nS(),ai=e=>tv({axis:e.axis}),aa=(e,r)=>{var i,a;let n,s,o,u,l,d,p,c,h,f,m,g,y;(e=>{if(!e||2!==e.length)throw Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)})(e.inputs),e.compute((i=e.inputs,a=r,n=i[0].dims,s=i[0].dataType,o=n.length,u=i[1].dims,l=i[1].dataType,p=n[d=e3.normalizeAxis(a.axis,o)],c=u.slice(0),h=e3.size(c),f=tR("input",s,o),m=tR("indicesInput",l,u.length),g=tB("output",s,c.length),(y=[{type:12,data:h},{type:6,data:p},{type:12,data:d}]).push(...tT(n,u,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:y}),getShaderSource:e=>`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,g)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}))}}),n2=q(()=>{"use strict";nf(),ny(),nS(),an=e=>({transA:e.transA,transB:e.transB,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${1===e.alpha}`}),as=(e,r)=>{(e=>{if(!e)throw Error("Input is missing");if(e.length<2||e.length>3)throw Error("Invaid input number.");if(3===e.length&&e[2].dims.length>2)throw Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||3===e.length&&e[0].dataType!==e[2].dataType)throw Error("Input types are mismatched")})(e.inputs),e.compute(((e,r)=>{let i=e[0].dims.slice(),a=e[1].dims.slice(),[n,s,o]=e6.getShapeOfGemmResult(i,r.transA,a,r.transB,3===e.length?e[2].dims:void 0),u=[n,s];if(!u)throw Error("Can't use gemm on the given tensors");let l=Math.ceil(s/16),d=Math.ceil(n/16),p=(e3.size(u),[{type:12,data:l},{type:12,data:n},{type:12,data:s},{type:12,data:o},{type:1,data:r.alpha},{type:1,data:r.beta}]),c=["type","type"];return 3===e.length&&(p.push(...tT(e[2].dims)),c.push("rank")),p.push(...tT(u)),{name:"GemmShared",shaderCache:{hint:`${r.cacheKey}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:l*d},programUniforms:p}),getShaderSource:i=>{let a=tR("a",e[0].dataType,e[0].dims),n=tR("b",e[1].dataType,e[1].dims),s=null,o=[a,n];3===e.length&&(s=tR("c",e[2].dataType,e[2].dims.length),o.push(s));let l=tB("output",e[0].dataType,u.length);o.push(l);let d="",p="";r.transA&&r.transB?(p=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${a.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${n.type.value}(0);
      }
      `,d="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):r.transA&&!r.transB?(p=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${a.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${n.type.value}(0);
      }
      `,d="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!r.transA&&r.transB?(p=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${a.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${n.type.value}(0);
      }
      `,d="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):r.transA||r.transB||(p=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${a.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${n.type.value}(0);
      }
      `,d="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let c=1===r.alpha?"":"value *= uniforms.alpha;";return`
  ${i.registerUniforms([{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}]).declareVariables(...o)}
  var<workgroup> tile_a: array<array<${a.type.storage}, 16>, 16>;
  var<workgroup> tile_b: array<array<${n.type.storage}, 16>, 16>;
  ${i.mainStart([16,16,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * 16;
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * 16;
    let num_tiles = (uniforms.K - 1) / 16 + 1;
    var k_start = 0u;
    var value = ${l.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${p}
      k_start = k_start + 16;
      workgroupBarrier();

      for (var k: u32 = 0u; k < 16; k++) {
        ${d}
      }
      workgroupBarrier();
    }

    ${c}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${null!=s?`let cOffset = ${s.broadcastedIndicesToOffset("vec2(m, n)",l)}; value += ${l.type.value}(uniforms.beta) * ${s.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}}})(e.inputs,r))}}),n3=q(()=>{"use strict";nf(),ny(),nx(),nS(),[ao,au,al,ad]=[0,1,2,3],ap=`
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
`,ac=(e,r)=>{var i,a;let n,s,o,u,l,d,p;(e=>{if(4!==e[0].dims.length)throw Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw Error("grid batch size must match input batch size")})(e.inputs),e.compute((i=e.inputs,a=r,n=tR("x",i[0].dataType,i[0].dims.length),s=[i[1].dims[0],i[1].dims[1],i[1].dims[2]],o=tR("grid",i[1].dataType,s.length,2),u=[i[0].dims[0],i[0].dims[1],i[1].dims[1],i[1].dims[2]],"NHWC"===a.format&&(u=[i[0].dims[0],i[1].dims[1],i[1].dims[2],i[0].dims[3]],[ao,au,al,ad]=[0,3,1,2]),l=tB("output",i[0].dataType,u.length),d=n.type.value,p=[{type:12,data:e3.size(u)},...tT(i[0].dims,s,u)],{name:"GridSample",shaderCache:{hint:`${a.cacheKey}`,inputDependencies:["type","type"]},getRunData:e=>{let r=e3.size(u);return{outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:p}},getShaderSource:e=>{let r,i,s,u,p,c,h,f,m;return`
  ${e.registerUniform("output_size","u32").declareVariables(n,o,l)}
  ${ap}
  ${r=d,`
  fn gs_bicubic_interpolate(p: mat4x4<${r}>, x: f32, y: f32) -> ${r} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${r}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`}
  ${i=a,`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${0===i.alignCorners?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`}
  ${s=a,`
  ${"reflection"===s.paddingMode?`
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
`}
  ${u=n,p=d,c=a,`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${p} {
     var pixel = ${p}(0);
     var indices = vec4<u32>(0);
     indices[${ao}] = batch;
     indices[${au}] = channel;`+(()=>{switch(c.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${al}] = u32(r);
            indices[${ad}] = u32(c);
          } else {
            return ${p}(0);
          }
        `;case"border":return`
          indices[${al}] = u32(clamp(r, 0, H - 1));
          indices[${ad}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${al}] = gs_reflect(r, border[1], border[3]);
          indices[${ad}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${c.paddingMode} is not supported`)}})()+`
    return ${u.getByIndices("indices")};
  }
`}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${al}]);
      let W_in = i32(uniforms.x_shape[${ad}]);

      ${0===a.alignCorners?`
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

      let indices = ${l.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${ao}], indices[${al}], indices[${ad}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${h=l,f=d,m=a,(()=>{switch(m.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${ao}], indices[${au}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${ao}], indices[${au}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${ao}], indices[${au}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${ao}], indices[${au}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${ao}], indices[${au}], border);

          let dx2 = ${f}(f32(x2) - x);
          let dx1 = ${f}(x - f32(x1));
          let dy2 = ${f}(f32(y2) - y);
          let dy1 = ${f}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${f}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${ao}], indices[${au}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${m.mode} is not supported`)}})()+`${h.setByOffset("global_idx","result")}`}
  }`}}))},ah=e=>tv({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),n4=q(()=>{"use strict";nf(),ny(),nx(),nv(),nz(),nS(),nk(),af=(e,r)=>e.length>r&&e[r].dims.length>0?e[r]:void 0,am=e=>tv({...e}),ag=tv({perm:[0,2,1,3]}),ay=(e,r,i,a,n,s,o,u)=>{var l,d,p,c,h,f,m;let g,y,_,b=s;if(!(o&&e3.size(o.dims)>0))return 3===s.dims.length&&(b=s.reshape([r,a,i,n])),1===i||1===a?b:e.compute(tq(b,ag.perm),{inputs:[b],outputs:[-1]})[0];if(1===a)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return b=(l=e,d=s,p=o,c=r,h=a,f=i*n,m=u,g=[c,h,f],_=[{type:12,data:y=e3.size(g)},{type:12,data:m},{type:12,data:f}],b=l.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:g,dataType:d.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:e=>{let r=tB("qkv_with_bias",d.dataType,g),i=tR("qkv",d.dataType,g),a=tR("bias",p.dataType,g);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}]).declareVariables(i,a,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[d,p],outputs:[-1]})[0]).reshape([r,a,i,n]),1===i||1===a?b:e.compute(tq(b,ag.perm),{inputs:[b],outputs:[-1]})[0]},a_=(e,r)=>{let i=((e,r)=>{let i,a=e[0],n=af(e,1),s=af(e,2),o=af(e,3),u=af(e,4),l=af(e,5),d=af(e,6),p=af(e,7);if(3!==a.dims.length&&5!==a.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let c=a.dims[0],h=a.dims[1],f=3===a.dims.length?a.dims[2]:r.numHeads*a.dims[4],m=h,g=0,y=0,_=Math.floor(f/r.numHeads);if(d&&p&&e3.size(d.dims)&&e3.size(p.dims)){if(4!==d.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==c||d.dims[1]!==r.numHeads||d.dims[3]!==_)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==c||p.dims[1]!==r.numHeads||p.dims[3]!==_)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==p.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');g=d.dims[2],y=d.dims[2]}else if(d&&e3.size(d.dims)||p&&e3.size(p.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(n&&e3.size(n.dims)>0){if(3!==a.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(a.dims[0]!==n.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===n.dims.length){if(n.dims[2]!==a.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');i=2,m=n.dims[1]}else if(5===n.dims.length){if(n.dims[2]!==r.numHeads||2!==n.dims[3]||n.dims[4]!==_)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw Error('Expect "value" be none when "key" has packed kv format.');i=5,m=n.dims[1]}else{if(n.dims[1]!==r.numHeads||n.dims[3]!==_)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');i=0,m=n.dims[2]}}else{if(5!==a.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(a.dims[2]!==r.numHeads||3!==a.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');i=3}if(o&&e3.size(o.dims)>0){if(1!==o.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(n&&5===n.dims.length&&2===n.dims[3])throw Error("bias is not allowed for packed kv.")}let b=g+m,$=0;if(u&&e3.size(u.dims)>0){$=8;let e=u.dims;throw 1===e.length?e[0]===c?$=1:e[0]===3*c+2&&($=3):2===e.length&&e[0]===c&&e[1]===b&&($=5),8===$?Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):Error("Mask not supported")}let v=!1,w=f;if(s&&e3.size(s.dims)>0){if(3!==s.dims.length&&4!==s.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(a.dims[0]!==s.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===s.dims.length){if(m!==s.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');w=s.dims[2]}else{if(m!==s.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');w=s.dims[1]*s.dims[3],v=!0}}if(u&&e3.size(u.dims)>0)throw Error("Key padding mask is not supported");if(l&&e3.size(l.dims)>0){if(4!==l.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==r.numHeads||l.dims[2]!==h||l.dims[3]!==b)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:h,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:b,maxSequenceLength:y,inputHiddenSize:0,hiddenSize:f,vHiddenSize:w,headSize:_,vHeadSize:Math.floor(w/r.numHeads),numHeads:r.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:r.maskFilterValue,maskType:$,scale:r.scale,broadcastResPosBias:!1,passPastInKv:v,qkvFormat:i}})(e.inputs,r),a=e.inputs[0],n=af(e.inputs,1),s=af(e.inputs,2),o=af(e.inputs,3),u=af(e.inputs,4),l=af(e.inputs,5),d=af(e.inputs,6),p=af(e.inputs,7);if(5===a.dims.length)throw Error("Packed QKV is not implemented");if(n?.dims.length===5)throw Error("Packed KV is not implemented");let c=n&&s&&4===n.dims.length&&4===s.dims.length,h=ay(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,a,o,0);if(c)return rm(e,h,n,s,u,void 0,d,p,l,i);if(!n||!s)throw Error("key and value must be provided");let f=ay(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.headSize,n,o,i.hiddenSize),m=ay(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.vHeadSize,s,o,2*i.hiddenSize);rm(e,h,f,m,u,void 0,d,p,l,i)}}),n6=q(()=>{"use strict";nf(),ny(),nx(),nS(),ab=(e,r)=>{let i=e[0].dims,a=e3.size(i),n=e[0].dataType,s=e3.normalizeAxis(r.axis,i.length),o=Array(r.numOutputs),u=tR("input",n,i.length),l=Array(r.numOutputs),d=[],p=[],c=0,h=[{type:12,data:a}];for(let a=0;a<r.numOutputs;a++){c+=r.splitSizes[a],l[a]=c;let u=i.slice();u[s]=r.splitSizes[a],p.push(u),o[a]=tB(`output${a}`,n,u.length),d.push({dims:p[a],dataType:e[0].dataType})}return h.push({type:12,data:l},...tT(i,...p)),{name:"Split",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getShaderSource:e=>{let r;return`
  ${e.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...o)}
  ${r=l.length,`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${tA("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`}
  ${(e=>{let r=e.length,i=[];for(let a=0;a<r;++a){let n=e[a].setByIndices("indices","input[global_idx]");1===r?i.push(n):0===a?i.push(`if (output_number == ${a}u) { ${n} }`):a===r-1?i.push(`else { ${n} }`):i.push(`else if (output_number == ${a}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${i.join(`
`)}
      }`})(o)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${tA("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`},getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(a/64)},programUniforms:h})}},a$=(e,r)=>{let i,a;var n,s,o=e.inputs;if(!o||o.length<1)throw Error("too few inputs");let u=1===e.inputs.length?r:(n=e.inputs,i=[],a=(s=r).numOutputs,n[1].dims[0]>0&&(n[1].getBigInt64Array().forEach(e=>i.push(Number(e))),a=i.length),tv({numOutputs:a,axis:s.axis,splitSizes:i}));e.compute(ab(e.inputs,u),{inputs:[0]})},av=e=>{let r=e.axis,i=e.splitSizes,a=e.numOutputs<0?i.length:e.numOutputs;if(a!==i.length)throw Error("numOutputs and splitSizes length must be equal");return tv({axis:r,numOutputs:a,splitSizes:i})}}),n8=q(()=>{"use strict";nf(),ny(),nx(),nS(),aw=(e,r)=>{let{interleaved:i,numHeads:a,rotaryEmbeddingDim:n,scale:s}=r,o=e[0].dims[0],u=e3.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=u/l,p=e[2].dims[1],c=0===n?2*p:d/a,h=[o,l,d/c,c-p],f=e3.computeStrides(h),m=[{type:1,data:s},{type:12,data:h},{type:12,data:f},...3===e[0].dims.length?Array({type:12,data:[u,d,c,1]}):[],...4===e[0].dims.length?Array({type:12,data:[u,c,l*c,1]}):[],...tT(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)];return{name:"RotaryEmbedding",shaderCache:{hint:tv({interleaved:i}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:r=>{let a=tR("input",e[0].dataType,e[0].dims.length),n=tR("position_ids",e[1].dataType,e[1].dims.length),s=tR("cos_cache",e[2].dataType,e[2].dims.length),o=tR("sin_cache",e[3].dataType,e[3].dims.length),u=tB("output",e[0].dataType,e[0].dims.length);return r.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${r.declareVariables(a,n,s,o,u)}

        ${r.mainStart(tw)}
          let half_rotary_emb_dim = uniforms.${s.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${r.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${n.broadcastedIndicesToOffset("bsnh.xy",tB("",n.type.tensor,2))};
            let position_id =
                u32(${n.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${i});
            let j = i + select(half_rotary_emb_dim, 1, ${i});
            let re = ${a.getByOffset("i")} * ${s.get("position_id","bsnh[3]")} -
                ${a.getByOffset("j")} * ${o.get("position_id","bsnh[3]")};
            ${u.setByOffset("i","re")}
            let im = ${a.getByOffset("i")} * ${o.get("position_id","bsnh[3]")} +
                ${a.getByOffset("j")} * ${s.get("position_id","bsnh[3]")};
            ${u.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${u.setByOffset("k",a.getByOffset("k"))}
          }
        }`},getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(e3.size(h)/tw)},programUniforms:m})}},ax=(e,r)=>{((e,r)=>{let[i,a,n,s]=e,{numHeads:o,rotaryEmbeddingDim:u}=r;if(3!==i.dims.length&&4!==i.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${i.dims.length}`);if(!e3.areEqual(a.dims,[])&&!e3.areEqual(a.dims,[1])&&2!==a.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${a.dims.length}`);if(2!==n.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(2!==s.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!e3.areEqual(n.dims,s.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&0===o)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let l=i.dims[0],d=i.dims[i.dims.length-2],p=n.dims[0],c=e3.sizeFromDimension(i.dims,1)/d,h=0===u?2*n.dims[1]:c/o;if(u>h)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===a.dims.length){if(l!==a.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${a.dims[0]}`);if(d!==a.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${a.dims[1]}`)}if(h/2!==n.dims[1]&&u/2!==n.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`);if(d>p)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")})(e.inputs,r),e.compute(aw(e.inputs,r))}}),n5=q(()=>{"use strict";nx(),nf(),nz(),n4(),n6(),nk(),n8(),nS(),aS=tv({perm:[0,2,1,3]}),ak=(e,r,i)=>{let a=r,n=i.kvNumHeads;return 3===r.dims.length&&0!==i.kvSequenceLength&&(a=r.reshape([i.batchSize,i.kvSequenceLength,n,i.headSize]),a=e.compute(tq(a,aS.perm),{inputs:[a],outputs:[-1]})[0]),a},aT=(e,r)=>{let i=((e,r)=>{if(r.doRotary&&e.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let i=e[0],a=e[1],n=e[2],s=e[3],o=e[4];if(0!==r.doRotary&&e.length<=7)throw Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(-1!==r.localWindowSize)throw Error("Local attention is not supported");if(0!==r.softcap)throw Error("Softcap is not supported");if(0!==r.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(r.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==i.dims.length&&5!==i.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let u=i.dims[0],l=i.dims[1],d=3===i.dims.length?i.dims[2]:r.numHeads*i.dims[4],p=l,c=0,h=!a||0===a.dims.length,f=Math.floor(h?d/(r.numHeads+2*r.kvNumHeads):d/r.numHeads);h&&(d=f*r.numHeads);let m=s&&0!==s.dims.length,g=o&&0!==o.dims.length;if(m&&4===s.dims.length&&s.dims[0]===u&&s.dims[1]!==r.kvNumHeads&&s.dims[2]===r.kvNumHeads&&s.dims[3]===f)throw Error("BSNH pastKey/pastValue is not supported");if(m&&g){if(4!==s.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==o.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');c=s.dims[2]}else if(m||g)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let y=1;if(a&&a.dims.length>0){if(3!==i.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==a.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===a.dims.length){if(i.dims[2]%a.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');p=a.dims[1]}else if(5===a.dims.length){if(a.dims[2]!==r.numHeads||2!==a.dims[3]||a.dims[4]!==f)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw Error('Expect "value" be none when "key" has packed kv format.');p=a.dims[1]}else{if(a.dims[1]!==r.numHeads||a.dims[3]!==f)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=a.dims[2]}}else{if(3!==i.dims.length&&5!==i.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===i.dims.length&&(i.dims[2]!==r.numHeads||3!==i.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}let _=!1,b=r.kvNumHeads?f*r.kvNumHeads:d;if(n&&n.dims.length>0){if(3!==n.dims.length&&4!==n.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==n.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===n.dims.length){if(p!==n.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');b=n.dims[2]}else{if(p!==n.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');b=n.dims[1]*n.dims[3],_=!0}}let $=e.length>4?e[5]:void 0;if($&&1!==$.dims.length&&$.dims[0]!==u)throw Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:l,pastSequenceLength:c,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:d,vHiddenSize:b,headSize:f,vHeadSize:Math.floor(b/r.kvNumHeads),numHeads:r.numHeads,kvNumHeads:r.kvNumHeads,nReps:r.numHeads/r.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:r.scale,broadcastResPosBias:!1,passPastInKv:_,qkvFormat:y}})(e.inputs,r);if(5===e.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let a=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&0!==e.inputs[3].dims.length?e.inputs[3]:void 0,u=e.inputs[4]&&0!==e.inputs[4].dims.length?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,p=i.kvNumHeads?i.kvNumHeads:i.numHeads,c=tv({axis:2,numOutputs:3,splitSizes:[i.numHeads*i.headSize,p*i.headSize,p*i.headSize]}),[h,f,m]=n||s?[a,n,s]:e.compute(ab([a],c),{inputs:[a],outputs:[-1,-1,-1]}),g,y;if(r.doRotary){var _,b,$,v;let a,n,s,o=e.compute((_=i.batchSize,b=i.sequenceLength,$=l,v=d,a=[_*b],s=[{type:12,data:n=_*b},{type:12,data:b},{type:12,data:_}],{name:"GeneratePositionIds",shaderCache:{hint:`${_};${b}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:7}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:s}),getShaderSource:e=>{let r=tR("seq_lens",$.dataType,$.dims),i=tR("total_seq_lens",v.dataType,v.dims),n=tB("pos_ids",7,a);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}]).declareVariables(r,i,n)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${i.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${r.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${n.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${n.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${n.setByOffset("global_idx","seqlen")}
    };
  }
  `}}),{inputs:[l,d],outputs:[-1]})[0],u=e.inputs[7],p=e.inputs[8],c=tv({interleaved:0!==r.rotaryInterleaved,numHeads:i.numHeads,rotaryEmbeddingDim:0,scale:r.scale}),m=[h,o,u,p],w=[-1];g=e.compute(aw(m,c),{inputs:m,outputs:w})[0],m.splice(0,1,f);let x=tv({interleaved:0!==r.rotaryInterleaved,numHeads:i.kvNumHeads,rotaryEmbeddingDim:0,scale:r.scale});y=e.compute(aw(m,x),{inputs:m,outputs:w})[0]}let w=ay(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,r.doRotary?g:h,void 0,0),x=ak(e,r.doRotary?y:f,i),S=ak(e,m,i);rm(e,w,x,S,void 0,void 0,o,u,void 0,i,l,d)}}),n9=q(()=>{"use strict";nf(),ny(),nk(),nS(),aI=(e,r,i,a,n,s,o,u)=>{let l=tI(s),d=1===l?"f32":`vec${l}f`,p=1===l?"vec2f":`mat2x${l}f`,c=n*o,h=64;1===c&&(h=256);let f=[n,o,s/l],m=[n,o,2],g=[];return g.push(...tT(f,m)),e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${h}`,inputDependencies:["rank","type","type"]},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:c},programUniforms:g}),getShaderSource:e=>{let n=tR("x",r.dataType,3,l),s=[n,tR("scale",i.dataType,i.dims),tR("bias",a.dataType,a.dims),tB("output",1,3,2)];return`
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
      let value = ${d}(${n.get("batch","channel","h")});
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
      let sum_final = ${tC("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${tC("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[r,i,a],outputs:[-1]})[0]},aE=(e,r)=>{var i,a,n;let s,o,u,l,d,p,c,h,f;"NHWC"===r.format?((e,r,i)=>{let a=r[0].dims,n=a[0],s=a[a.length-1],o=e3.sizeFromDimension(a,1)/s,u=tI(s),l=e3.size(a)/u,d=[{type:12,data:o},{type:12,data:Math.floor(s/u)}],p=!1,c=[0,a.length-1];for(let e=0;e<a.length-2;e++)p=p||1!==a[e+1],c.push(e+1);let h=(p=p&&1!==a[a.length-1])?e.compute(tq(e.inputs[0],c),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:a.length},(e,r)=>a[c[r]])),f=aI(e,h,r[1],r[2],n,o,s,i.epsilon);e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:e=>{let i=tS(r[0].dataType),n=1===u?"vec2f":`mat${u}x2f`,s=e=>{let r=0===e?"x":"y",a=1===u?"f32":`vec${u}f`;switch(u){case 1:return`${i}(${a}(scale.${r}))`;case 2:return`vec2<${i}>(${a}(scale[0].${r}, scale[1].${r}))`;case 4:return`vec4<${i}>(${a}(scale[0].${r}, scale[1].${r}, scale[2].${r}, scale[3].${r}))`;default:throw Error(`Not supported compoents ${u}`)}},o=tR("input",r[0].dataType,r[0].dims,u),l=tB("output",r[0].dataType,a,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${o.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${n}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${l.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${e.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${s(0)}, ${s(1)});
  }`}},{inputs:[r[0],f]})})(e,e.inputs,r):(i=e,a=e.inputs,n=r,o=(s=a[0].dims)[0],u=s[1],l=e3.sizeFromDimension(s,2),d=tI(l),p=e3.size(s)/d,c=aI(i,a[0],a[1],a[2],o,l,u,n.epsilon),h=[o,u,l/d],f=[o,u],i.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:["type","none"]},getRunData:()=>({outputs:[{dims:s,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...tT(h,f,h)]}),getShaderSource:e=>{let r=tR("x",a[0].dataType,h.length,d),i=tR("scale_shift",1,f.length,2),n=tB("output",a[0].dataType,h.length,d),s=[r,i,n];return`
  ${e.registerUniform("output_size","u32").declareVariables(...s)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${n.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${i.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${r.getByOffset("global_idx")} * ${n.type.value}(scale_shift.x) + ${n.type.value}(scale_shift.y);
      ${n.setByOffset("global_idx","value")};
  }`}},{inputs:[a[0],c]}))}}),n7=q(()=>{"use strict";nf(),ny(),nS(),az=(e,r)=>{(e=>{if(!e||e.length<2)throw Error("layerNorm requires at least 2 inputs.")})(e.inputs),e.compute(((e,r,i)=>{let a=r.simplified,n=e[0].dims,s=e[1],o=!a&&e[2],u=e3.normalizeAxis(r.axis,n.length),l=e3.sizeToDimension(n,u),d=e3.sizeFromDimension(n,u),p=e3.size(s.dims),c=o?e3.size(o.dims):0;if(p!==d||o&&c!==d)throw Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${c}`);let h=[];for(let e=0;e<n.length;++e)e<u?h.push(n[e]):h.push(1);let f=tI(d),m=["type","type"],g=[{type:12,data:l},{type:1,data:d},{type:12,data:Math.floor(d/f)},{type:1,data:r.epsilon}];o&&m.push("type");let y=i>1,_=i>2,b=[{dims:n,dataType:e[0].dataType}];return y&&b.push({dims:h,dataType:1}),_&&b.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${f};${i};${a}`,inputDependencies:m},getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:g}),getShaderSource:r=>{let i=tS(e[0].dataType),u=[tR("x",e[0].dataType,e[0].dims,f),tR("scale",s.dataType,s.dims,f)];return o&&u.push(tR("bias",o.dataType,o.dims,f)),u.push(tB("output",e[0].dataType,n,f)),y&&u.push(tB("mean_data_output",1,h)),_&&u.push(tB("inv_std_output",1,h)),`
  ${r.registerUniforms([{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...u)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${tE("f32",f)};
    var mean_square_vector = ${tE("f32",f)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${tz(i,f,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${tC("mean_vector",f)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${tC("mean_square_vector",f)} / uniforms.norm_size ${a?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${tz(i,f,"x[j + offset]")};
      let f32scale = ${tz(i,f,"scale[j]")};
      output[j + offset] = ${u[0].type.value}((f32input ${a?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${tz(i,f,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`}}})(e.inputs,r,e.outputCount))}}),se=q(()=>{"use strict";ny(),nU(),nq(),aC=e=>{var r=e.inputs;if(!r||2!==r.length)throw Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw Error("shared dimension does not match.");let i=e2.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!i)throw Error("Can't use matmul on the given tensors");let a=i[i.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(a<8&&n<8)e.compute(iv(e.inputs,{activation:""},i));else{let r=i[i.length-2],s=e3.size(e.inputs[0].dims.slice(0,-2)),o=e3.size(e.inputs[1].dims.slice(0,-2));if(1!==s&&1===r&&1===o){let r=e.inputs[0].reshape([1,s,n]),o=e.inputs[1].reshape([1,n,a]),u=[1,s,a],l=[r,o];e.compute(ik(l,{activation:""},i,u),{inputs:l})}else e.compute(ik(e.inputs,{activation:""},i))}}}),st=q(()=>{"use strict";nf(),ny(),nx(),nS(),aA=(e,r)=>{var i,a,n,s;let o,u,l,d,p,c,h,f,m,g,y,_,b,$,v,w,x,S,k,T,I,E,z,C,A,O,R,B,N,M,D,P,U,q,W,L,V,G,H,F,j;((e,r)=>{if(e.length<3||e.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let i=e[0],a=i.dims.length;if(i.dims[a-1]!==r.k)throw Error("The last dim of input shape does not match the k value");let n=Math.floor((r.k+r.blockSize-1)/r.blockSize),s=r.blockSize/8*r.bits,o=e[1];if(!e3.areEqual(o.dims,[r.n,n,s]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(e3.size(u)!==r.n*n)throw Error("scales input size error.");if(4===e.length){let i=e[3].dims,a=r.n*(8===r.bits?n:Math.floor((n*r.bits+7)/8));if(e3.size(i)!==a)throw Error("zeroPoints input size error.")}})(e.inputs,r),32===r.blockSize&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute((i=e.inputs,a=r,u=(o=i[0].dims).length,l=o[u-2],d=a.k,p=a.n,c=o.slice(0,u-2),h=e3.size(c),f=i[1].dims[2]/4,m=i[0].dataType,g=tI(a.k),y=tI(f),_=c.concat([l,p]),w=(v=($=128/(b=p%8==0?8:p%4==0?4:1))*y*8)/g,x=v/a.blockSize,S=e3.size(_)/b,k=[],T=[h,l,d/g],(I=e3.convertShape(i[1].dims).slice()).splice(-1,1,f/y),k.push(...tT(T)),k.push(...tT(I)),k.push(...tT(i[2].dims)),4===i.length&&k.push(...tT(e3.convertShape(i[3].dims))),E=[h,l,p],k.push(...tT(E)),{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${a.blockSize};${g};${y};${$};${b}`,inputDependencies:Array(i.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:m}],dispatchGroup:{x:S},programUniforms:k}),getShaderSource:e=>{let r=T.length,n=tR("a",i[0].dataType,r,g),s=tR("b",12,I.length,y),o=tR("scales",i[2].dataType,i[2].dims.length),u=[n,s,o],l=4===i.length?tR("zero_points",12,i[3].dims.length):void 0;l&&u.push(l);let d=E.length,p=tB("output",i[0].dataType,d),c=tS(i[0].dataType);return`
        var<workgroup> sub_a: array<${n.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${p.type.value}, ${$}>, ${b}>;
        ${e.declareVariables(...u,p)}
        ${e.mainStart([$,b,1])}
          let output_indices = ${p.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${x} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += 128)
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${n.getByIndices(`${n.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${n.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${x} + local_id.x;
            ${l?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${l.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${c}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${c}(8);`}
            let scale = ${o.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${s.getByIndices(`${s.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${a.blockSize/g};
            for (var i: u32 = 0; i < ${y}; i++) {
              ${(()=>{switch(g){case 1:return`
          let a_data0 = vec4<${c}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${c}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${c}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${c}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${g}-component is not supported.`)}})()}
              let b_value = ${1===y?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${c}>(${Array.from({length:4},(e,r)=>`${c}(b_value_lower[${r}]), ${c}(b_value_upper[${r}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${c}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(e,r)=>`dot(a_data${r}, b_dequantized_values[${r}])`).join(" + ")};
              word_offset += ${8/g};
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${p.type.value} = ${p.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${p.setByIndices(`${p.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`}})):e.compute((n=e.inputs,s=r,C=(z=n[0].dims).length,A=z[C-2],O=s.k,R=s.n,B=z.slice(0,C-2),N=e3.size(B),M=n[1].dims[2]/4,D=n[0].dataType,P=tI(s.k),U=tI(M),q=tI(R),W=B.concat([A,R]),L=A>1&&R/q%2==0?2:1,V=e3.size(W)/q/L,G=[],H=[N,A,O/P],(F=e3.convertShape(n[1].dims).slice()).splice(-1,1,M/U),G.push(...tT(H)),G.push(...tT(F)),G.push(...tT(n[2].dims)),4===n.length&&G.push(...tT(e3.convertShape(n[3].dims))),j=[N,A,R/q],G.push(...tT(j)),{name:"MatMulNBits",shaderCache:{hint:`${s.blockSize};${s.bits};${P};${U};${q};${L};64`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:W,dataType:D}],dispatchGroup:{x:V},programUniforms:G}),getShaderSource:e=>{let r=H.length,i=tR("a",n[0].dataType,r,P),a=tR("b",12,F.length,U),o=tR("scales",n[2].dataType,n[2].dims.length),u=[i,a,o],l=4===n.length?tR("zero_points",12,n[3].dims.length):void 0;l&&u.push(l);let d=j.length,p=tB("output",n[0].dataType,d,q),c=tS(n[0].dataType),h=(()=>{switch(P){case 1:return`array<${c}, 8>`;case 2:return`mat4x2<${c}>`;case 4:return`mat2x4<${c}>`;default:throw Error(`${P}-component is not supported.`)}})();return`
        var<workgroup> workgroup_shared: array<${p.type.value}, ${64*L}>;
        ${e.declareVariables(...u,p)}
        ${e.mainStart([64,1,1])}
          let output_indices = ${p.offsetToIndices(`(global_idx / 64) * ${L}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${s.blockSize/P};
            ${(()=>{let e=`
            var col_index = col * ${q};
            ${l?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${c}(8);`}
            `;for(let r=0;r<q*L;r++)e+=`
            let scale${r} = ${o.getByOffset("col_index * nBlocksPerCol + block")};
            ${l?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${l.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${r} = ${c}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return e})()}
            for (var word: u32 = 0; word < ${M}; word += ${U}) {
              ${(()=>{let e=`col_index = col * ${q};`;for(let r=0;r<q*L;r++)e+=`
            let b${r}_data = ${a.getByIndices(`${a.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return e+`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${h};
            var b_dequantized_values: ${h};`})()}
              for (var i: u32 = 0; i < ${U}; i++) {
                ${(()=>{let e=`
          // reuse a data
            var input_offset = ${i.indicesToOffset(`${i.type.indices}(batch, row, word_offset)`)};
            var a_data: ${h};
            for (var j: u32 = 0; j < ${8/P}; j++) {
              a_data[j] = ${i.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let r=0;r<q*L;r++)e+=`
            b_value = ${1===U?`b${r}_data`:`b${r}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${h}(${Array.from({length:4},(e,r)=>`${c}(b_value_lower[${r}]), ${c}(b_value_upper[${r}])`).join(", ")});
            b_dequantized_values = ${1===P?`${h}(${Array.from({length:8},(e,i)=>`(b_quantized_values[${i}] - ${l?`zero_point${r}`:"zero_point"}) * scale${r}`).join(", ")});`:`(b_quantized_values - ${h}(${Array(8).fill(`${l?`zero_point${r}`:"zero_point"}`).join(",")})) * scale${r};`};
            workgroup_shared[local_id.x * ${L} + ${Math.floor(r/q)}]${q>1?`[${r%q}]`:""} += ${Array.from({length:8/P},(e,r)=>`${1===P?`a_data[${r}] * b_dequantized_values[${r}]`:`dot(a_data[${r}], b_dequantized_values[${r}])`}`).join(" + ")};
          `;return e})()}
                word_offset += ${8/P};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${L}) {
            var output_value: ${p.type.value} = ${p.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${L};
            }
            ${p.setByIndices(`${p.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`}}))},aO=e=>tv(e)}),sr=q(()=>{"use strict";nf(),ny(),nS(),aR=(e,r)=>{let i,a,n,s;var o,u,l=e.inputs;if(!l||l.length<1)throw Error("Too few inputs");if(1!==l[0].dataType&&10!==l[0].dataType)throw Error("Input type must be float or float16.");if(l.length>=2){let e=2*l[0].dims.length===l[1].dims[0];if(4===l.length&&(e=2*l[3].dims[0]===l[1].dims[0]),!e)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}let d=((e,r)=>{if(!(e.length>1))return r;{let i=e[1].getBigInt64Array(),a=e.length>=3&&e[2].data?10===e[2].dataType?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,s=new Int32Array(2*n).fill(0);if(e.length>=4){let r=e[3].getBigInt64Array();for(let e=0;e<r.length;e++)s[Number(r[e])]=Number(i[e]),s[Number(r[e])+n]=Number(i[e+r.length])}else i.forEach((e,r)=>s[Number(r)]=Number(e));let o=[];return s.forEach(e=>o.push(e)),{mode:r.mode,value:a,pads:o}}})(e.inputs,r);e.compute((o=e.inputs,u=d,i=e3.padShape(o[0].dims.slice(),u.pads),a=o[0].dims,n=[{type:12,data:e3.size(i)},{type:6,data:u.pads}],s=o.length>=3&&o[2].data,0===u.mode&&n.push({type:s?o[2].dataType:1,data:u.value}),n.push(...tT(o[0].dims,i)),{name:"Pad",shaderCache:{hint:`${u.mode}${s}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:o[0].dataType}],dispatchGroup:{x:Math.ceil(e3.size(i)/64)},programUniforms:n}),getShaderSource:e=>{let r=tB("output",o[0].dataType,i.length),n=tR("x",o[0].dataType,a.length),l=n.type.value,d=((e,r,i)=>{switch(i.mode){case 0:var a=e,n=r,s=i.pads.length;let o="";for(let e=n-1;e>=0;--e)o+=`
            k = i32(${a.indicesGet("indices",e)}) - ${tA("uniforms.pads",e,s)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${tA("uniforms.x_shape",e,n)})) {
              break;
            }
            offset += k * i32(${tA("uniforms.x_strides",e,n)});
        `;return`
          value = ${a.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${o}
            value = x[offset];
          }
      `;case 1:var u=e,l=r,d=i.pads.length;let p="";for(let e=l-1;e>=0;--e)p+=`
                k = i32(${u.indicesGet("indices",e)}) - ${tA("uniforms.pads",e,d)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${tA("uniforms.x_shape",e,l)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${tA("uniforms.x_shape",e,l)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${tA("uniforms.x_strides",e,l)});
            `;return`
              var offset = 0;
              var k = 0;
              ${p}
              value = x[offset];
          `;case 2:var c=e,h=r,f=i.pads.length;let m="";for(let e=h-1;e>=0;--e)m+=`
                k = i32(${c.indicesGet("indices",e)}) - ${tA("uniforms.pads",e,f)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${tA("uniforms.x_shape",e,h)})) {
                  k = i32(${tA("uniforms.x_shape",e,h)}) - 1;
                }
                offset += k * i32(${tA("uniforms.x_strides",e,h)});
            `;return`
              var offset = 0;
              var k = 0;
              ${m}
              value = x[offset];
          `;case 3:var g=e,y=r,_=i.pads.length;let b="";for(let e=y-1;e>=0;--e)b+=`
                k = i32(${g.indicesGet("indices",e)}) - ${tA("uniforms.pads",e,_)};
                if (k < 0)  {
                  k += i32(${tA("uniforms.x_shape",e,y)}]);
                }
                if (k >= i32(${tA("uniforms.x_shape",e,y)})) {
                  k -= i32(${tA("uniforms.x_shape",e,y)});
                }
                offset += k * i32(${tA("uniforms.x_strides",e,y)});
            `;return`
              var offset = 0;
              var k = 0;
              ${b}
              value = x[offset];
          `;default:throw Error("Invalid mode")}})(r,a.length,u),p=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:u.pads.length}];return 0===u.mode&&p.push({name:"constant_value",type:s?l:"f32"}),`
            ${e.registerUniforms(p).declareVariables(n,r)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${r.offsetToIndices("global_idx")};

            var value = ${l}(0);
            ${d}
            output[global_idx] = value;
        }`}}),{inputs:[0]})}}),si=q(()=>{"use strict";eu(),nf(),ny(),nS(),aB=e=>{if(f.webgpu.validateInputContent&&(!e||1!==e.length))throw Error("Pool ops requires 1 input.")},aN=(e,r,i)=>{let a="NHWC"===r.format,n=e.dims.slice();a&&n.splice(1,0,n.pop());let s=Object.hasOwnProperty.call(r,"dilations"),o=r.kernelShape.slice(),u=r.strides.slice(),l=s?r.dilations.slice():[],d=r.pads.slice();e4.adjustPoolAttributes(i,n,o,u,l,d);let p=e4.computePoolOutputShape(i,n,u,l,o,d,r.autoPad),c=Object.assign({},r);s?Object.assign(c,{kernelShape:o,strides:u,pads:d,dilations:l,cacheKey:r.cacheKey}):Object.assign(c,{kernelShape:o,strides:u,pads:d,cacheKey:r.cacheKey});let h=p.slice();return h.push(h.splice(1,1)[0]),[c,a?h:p]},aM=(e,r)=>{let i="NHWC"===r.format,a=[{type:12,data:e3.size(e)},{type:12,data:e3.size(r.kernelShape)}],n=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(r.kernelShape.length<=2){let e=r.kernelShape[r.kernelShape.length-1],i=r.strides[r.strides.length-1],s=r.pads[r.pads.length/2-1],o=r.pads[r.pads.length-1],u=!!(s+o);a.push({type:12,data:e},{type:12,data:i},{type:12,data:s},{type:12,data:o}),n.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let l=!1;if(2===r.kernelShape.length){let e=r.kernelShape[r.kernelShape.length-2],i=r.strides[r.strides.length-2],s=r.pads[r.pads.length/2-2],o=r.pads[r.pads.length-2];l=!!(s+o),a.push({type:12,data:e},{type:12,data:i},{type:12,data:s},{type:12,data:o}),n.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,n,!0,u,l]}{if(i)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let e=e3.computeStrides(r.kernelShape);return a.push({type:12,data:e},{type:12,data:r.pads},{type:12,data:r.strides}),n.push({name:"kernelStrides",type:"u32",length:e.length},{name:"pads",type:"u32",length:r.pads.length},{name:"strides",type:"u32",length:r.strides.length}),[a,n,!!r.pads.reduce((e,r)=>e+r),!1,!1]}},aD=(e,r,i,a,n,s,o,u,l,d,p,c)=>{let h="NHWC"===n.format,f=r.type.value,m=tB("output",r.type.tensor,a);if(n.kernelShape.length<=2){let a="",d="",g="",y=i-(h?2:1);if(a=p?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${y}] = indices[${y}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${y}] < 0 || xIndices[${y}]
                      >= uniforms.x_shape[${y}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${r.indicesToOffset("xIndices")}];
                  ${s}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${y}] = indices[${y}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${r.indicesToOffset("xIndices")}];
                  ${s}
                }`,2===n.kernelShape.length){let e=i-(h?3:2);d=c?`
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
            ${e.registerUniforms(l).declareVariables(r,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${f}(${u});
              var pad = 0;
              ${d}
              ${a}
              ${g}
              ${o}

              output[global_idx] = value;
            }`}{if(h)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=n.kernelShape.length,p=n.pads.length,c="";return c=d?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${r.indicesToOffset("xIndices")}];
                ${s}
              }`:`
              }
              let x_val = x[${r.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(l).declareVariables(r,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${a}>;

              var value = ${f}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${a-1}u; j++) {
                  offsets[j] = offset / ${tA("uniforms.kernelStrides","j",a)};
                  offset -= offsets[j] * ${tA("uniforms.kernelStrides","j",a)};
                }
                offsets[${a-1}] = offset;

                isPad = false;
                for (var j = ${i-a}u; j < ${i}u; j++) {
                  xIndices[j] = indices[j] * ${tA("uniforms.strides",`j - ${i-a}u`,a)}
                    + offsets[j - ${i-a}u] - ${tA("uniforms.pads","j - 2u",p)};
                  ${c}
              }
              ${o}

              output[global_idx] = value;
            }`}},aP=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,aU=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),aq=(e,r,i,a)=>{let[n,s]=aN(r,a,i),o=tR("x",r.dataType,r.dims.length),u=o.type.value,l="";n.countIncludePad?l+=`value /= ${u}(uniforms.kernelSize);`:l+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[d,p,c,h,f]=aM(s,n);return d.push(...tT(r.dims,s)),{name:e,shaderCache:{hint:`${a.cacheKey};${c};${h};${f}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(e3.size(s)/64)},programUniforms:d}),getShaderSource:e=>aD(e,o,r.dims.length,s.length,n,"value += x_val;",l,0,p,c,h,f)}},aW=e=>{let r,i=0!==e.count_include_pad,a=aU(e);if(0!==a.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:i,...a,cacheKey:""};return{...n,cacheKey:(r=n,`${aP(r)};${r.countIncludePad}`)}},aL=(e,r)=>{aB(e.inputs),e.compute(aq("AveragePool",e.inputs[0],!1,r))},aV={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},aG=e=>{let r=e.format;return{format:r,...aV,cacheKey:r}},aH=(e,r)=>{aB(e.inputs),e.compute(aq("GlobalAveragePool",e.inputs[0],!0,r))},aF=(e,r,i,a)=>{let[n,s]=aN(r,a,i),o=`
      value = max(x_val, value);
    `,u=tR("x",r.dataType,r.dims.length),[l,d,p,c,h]=aM(s,n);return l.push(...tT(r.dims,s)),{name:e,shaderCache:{hint:`${a.cacheKey};${p};${c};${h}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(e3.size(s)/64)},programUniforms:l}),getShaderSource:e=>aD(e,u,r.dims.length,s.length,n,o,"",10===r.dataType?-65504:-1e5,d,p,c,h)}},aj=(e,r)=>{aB(e.inputs),e.compute(aF("MaxPool",e.inputs[0],!1,r))},aK=e=>{let r,i=e.storage_order,a=e.dilations,n=aU(e);if(0!==i)throw Error("column major storage order is not yet supported for MaxPool");if(0!==n.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let s={storageOrder:i,dilations:a,...n,cacheKey:""};return{...s,cacheKey:(r=s,`${aP(r)};${r.storageOrder};${r.dilations}`)}},aQ=e=>{let r=e.format;return{format:r,...aV,cacheKey:r}},aZ=(e,r)=>{aB(e.inputs),e.compute(aF("GlobalMaxPool",e.inputs[0],!0,r))}}),sa=q(()=>{"use strict";nf(),ny(),nx(),nS(),aX=(e,r)=>{var i,a;let n,s,o,u,l,d,p,c,h,f,m,g,y,_,b,$,v,w,x,S,k,T,I;((e,r)=>{if(e.length<2||e.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===e.length&&e[1].dims===e[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===e.length&&e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(6===e[0].dataType&&e.length>2)throw Error("In the case of dequantizing int32 there is no zero point.");if(0!==e[1].dims.length&&1!==e[1].dims.length&&e[1].dims.length!==e[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((e,r)=>e&&r,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(r.blockSize>0){if(0===e[1].dims.length||1===e[1].dims.length&&1===e[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((i,a)=>a===r.axis||i===e[0].dims[a]).reduce((e,r)=>e&&r,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let i=e[0].dims[r.axis],a=e[1].dims[r.axis];if(r.blockSize<Math.ceil(i/a)||r.blockSize>Math.ceil(i/(a-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}})(e.inputs,r),e.compute((i=e.inputs,a=r,n=e3.normalizeAxis(a.axis,i[0].dims.length),o=3===(s=i[0].dataType),u=i[0].dims,l=i[1].dataType,d=e3.size(u),c=(p=3===s||2===s)?[Math.ceil(e3.size(i[0].dims)/4)]:i[0].dims,h=i[1].dims,m=(f=i.length>2?i[2]:void 0)?p?[Math.ceil(e3.size(f.dims)/4)]:f.dims:void 0,y=!1==(g=0===h.length||1===h.length&&1===h[0])&&1===h.length,_=tI(d),$=(b=g&&(!p||4===_))?_:1,v=tR("input",p?12:s,c.length,b&&!p?_:1),w=tR("scale",l,h.length),x=f?tR("zero_point",p?12:s,m.length):void 0,S=tB("output",l,u.length,$),k=[v,w],x&&k.push(x),T=[c,h],f&&T.push(m),I=[{type:12,data:d/$},{type:12,data:n},{type:12,data:a.blockSize},...tT(...T,u)],{name:"DequantizeLinear",shaderCache:{hint:a.cacheKey,inputDependencies:x?["rank","rank","rank"]:["rank","rank"]},getShaderSource:e=>`
      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...k,S)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${S.offsetToIndices("global_idx")};

          // Set input x
          ${p?`
            let input = ${v.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===$?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${v.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${w.getByOffset("0")}`:y?`
            let scale_index = ${S.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${w.getByOffset("scale_index")};`:`
            var scale_indices: ${w.type.indices} = output_indices;
            let index = ${w.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${w.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${w.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${x?g?p?`
                let zero_point_input = ${x.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${x.getByOffset("0")}`:y?p?`
                let zero_point_index = ${S.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${x.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${S.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${x.getByOffset("zero_point_index")};`:p?`
                let zero_point_offset = ${w.indicesToOffset("scale_indices")};
                let zero_point_input = ${x.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${x.getByIndices("scale_indices")};`:`let zero_point_value = ${p?o?"i32":"u32":v.type.value}(0);`};
      // Compute and write output
      ${S.setByOffset("global_idx",`${S.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:u,dataType:l}],dispatchGroup:{x:Math.ceil(d/$/64),y:1,z:1},programUniforms:I})}))},aY=e=>tv({axis:e.axis,blockSize:e.blockSize})}),sn=q(()=>{"use strict";eu(),nf(),nS(),aJ=e=>{var r,i,a,n;let s,o,u,l=0,d=0,p=0;6===e.inputs[0].dataType?(l=e.inputs[0].getInt32Array()[0],d=e.inputs[1].getInt32Array()[0],p=e.inputs[2].getInt32Array()[0]):1===e.inputs[0].dataType&&(l=e.inputs[0].getFloat32Array()[0],d=e.inputs[1].getFloat32Array()[0],p=e.inputs[2].getFloat32Array()[0]),f.webgpu.validateInputContent&&((e,r,i)=>{if(e===r||e<r&&i<0||e>r&&i>0)throw Error("Range these inputs' contents are invalid.")})(l,d,p),e.compute((r=l,i=d,a=p,n=e.inputs[0].dataType,o=[s=Math.abs(Math.ceil((i-r)/a))],u=[{type:12,data:s},{type:n,data:r},{type:n,data:a},...tT(o)],{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:e=>{let r=tB("output",n,o.length),i=r.type.value;return`
        ${e.registerUniforms([{name:"outputSize",type:"u32"},{name:"start",type:i},{name:"delta",type:i}]).declareVariables(r)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${i}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}),{inputs:[]})}}),ss=q(()=>{"use strict";nf(),ny(),nx(),nS(),a0=e=>tv({reduction:e.reduction}),a1=(e,r)=>{var i,a;let n,s,o,u,l,d;e.compute((i=e.inputs,a=r,n=i[0].dims,s=i[1].dims,o=Math.ceil(e3.sizeToDimension(s,s.length-1)/1),u=s[s.length-1],l=e3.sizeFromDimension(n,u),d=[{type:12,data:o},{type:12,data:u},{type:12,data:l},...tT(i[1].dims,i[2].dims,n)],{name:"ScatterND",shaderCache:{hint:`${a.cacheKey}_${a.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:e=>{let r=tR("indices",i[1].dataType,i[1].dims.length),s=tR("updates",i[2].dataType,i[2].dims.length,1),o="none"!==a.reduction&&""!==a.reduction?tN("output",i[0].dataType,n.length):tB("output",i[0].dataType,n.length,1);return`
      ${e.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(r,s,o)}
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
    ${((e,r,i,a)=>{if("none"!==e&&"i32"!==a&&"u32"!==a&&"f32"!==a)throw Error(`Input ${a} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${r}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${r}=${i};`;case"add":return"i32"===a||"u32"===a?`atomicAdd(&${r}, bitcast<${a}>(${i}));`:`
              ${n}bitcast<${a}>(oldValue) + (${i})${s}`;case"max":return"i32"===a||"u32"===a?`atomicMax(&${r}, bitcast<${a}>(${i}));`:`
                ${n}max(bitcast<f32>(oldValue), (${i}))${s}`;case"min":return"i32"===a||"u32"===a?`atomicMin(&${r}, bitcast<${a}>(${i}));`:`${n}min(bitcast<${a}>(oldValue), (${i}))${s}`;case"mul":return`${n}(bitcast<${a}>(oldValue) * (${i}))${s}`;default:throw Error(`Reduction ${e} is not supported.`)}})(a.reduction,"output[data_offset + i]","value",o.type.value)}
  }

      }`}}),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),so=q(()=>{"use strict";nf(),ny(),nx(),nS(),a2=(e,r,i,a)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${r});
  let whole = ${a}(big / (${i}));
  let fract = ${a}(big % (${i})) / ${a}(${i});
  return whole + fract;
`,a3=(e,r,i,a)=>e.rank>a?`
    ${e.indicesSet("input_indices",r,"channel")};
    ${e.indicesSet("input_indices",i,"batch")};
`:"",a4=(e,r)=>{var i,a,n,s,o,u,l,d,p,c,h,f;let m,g,y,_,b,$,v,w,x,S,k,T,I,E,z,C,A=[],O=[],R=[],B=new Uint32Array(m=e.customDataBuffer,m.byteOffset,1)[0];if(0!==r.antialias)throw Error("Only default value (0) for Antialias attribute is supported");((e,r,i,a,n,s)=>{let[o,u,l]=i>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(e=>s.push(e));else if("tf_crop_and_resize"===r.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&1===e[u].dims.length&&e[u].dims[0]>0){var p,c,h;let n;if(e[u].getFloat32Array().forEach(e=>a.push(e)),0!==a.length&&a.length!==d&&i>=18&&a.length!==r.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");((e,r)=>{if(e.every(e=>e>0||(()=>{throw Error("Resize requires scales input values to be positive")})),e.length>0){if("linear"===r.mode){if(2!==e.length&&3!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3])&&(5!==e.length||1!==e[0]||1!==e[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===r.mode&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}})(a,r),r.axes.length>0&&(p=a,c=r.axes,h=d,c.every(e=>e>=0&&e<h||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")})),n=Array(h).fill(1),c.forEach((e,r)=>n[e]=p[r]),n).forEach((e,r)=>a[r]=e)}if(l>0&&e.length>l&&1===e[l].dims.length&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(e=>n.push(Number(e))),0!==n.length&&n.length!==d&&i>=18&&n.length!==r.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(r.axes.length>0){if(0!==a.length&&a.length!==r.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==n.length&&n.length!==r.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if("u">typeof a&&"u">typeof n&&a.length>0&&n.length>d)throw Error("Resize requires only of scales or sizes to be specified")})(e.inputs,r,B,A,O,R),e.compute((i=e.inputs[0],a=r,n=B,s=A,o=O,u=R,_=i.dims,b=(l=u,d=a.axes,g=Array(p=_.length).fill(0).concat(Array(p).fill(1)),y=0===l.length?g:l.slice(),d.length>0?(d.forEach((e,r)=>{g[e]=y[r],g[r+p]=y[d.length+r]}),g):y),$=((e,r,i,a)=>{let n=[];if(i.length>0)if(a.length>0){if(e.forEach(e=>n.push(e)),Math.max(...a)>e.length)throw Error("axes is out of bound");a.forEach((e,r)=>n[e]=i[r])}else i.forEach(e=>n.push(e));else{if(0===r.length)throw Error("Resize requires either scales or sizes.");n=e.map((e,i)=>Math.round(e*r[i]))}return n})(_,s,o,a.axes),v=s.slice(),0===s.length&&(v=_.map((e,r)=>0===e?1:$[r]/e),"stretch"!==a.keepAspectRatioPolicy&&(c=_,h=v,f=a,w=(()=>{switch(f.keepAspectRatioPolicy){case"not_larger":return f.axes.length>0?Math.min(...f.axes.map(e=>h[e]),Number.MAX_VALUE):Math.min(...h,Number.MAX_VALUE);case"not_smaller":return f.axes.length>0?Math.max(...f.axes.map(e=>h[e]),5e-324):Math.max(...h,5e-324);default:throw Error(`Keep aspect ratio policy ${f.keepAspectRatioPolicy} is not supported`)}})(),h.fill(1,0,h.length),x=c.slice(),f.axes.length>0?(f.axes.forEach(e=>h[e]=w),f.axes.forEach(e=>x[e]=Math.round(c[e]*h[e]))):(h.fill(w,0,h.length),x.forEach((e,r)=>x[r]=Math.round(e*h[r]))),$=x)),S=tB("output",i.dataType,$.length),k=tR("input",i.dataType,_.length),T=e3.size($),I=_.length===$.length&&_.every((e,r)=>e===$[r]),E="tf_crop_and_resize"===a.coordinateTransformMode,z=a.extrapolationValue,C=k.type.value,{name:"Resize",shaderCache:{hint:`${a.cacheKey}|${n}|${v.length>0?"cubic"===a.mode?v:v.length:""}|${o.length>0?o:""}|${b.length>0?b:""}|${I}|${"nearest"===a.mode?_.length:_}`,inputDependencies:["rank"]},getShaderSource:e=>{let r,i;return`
      ${I?"":`
      ${r=a.coordinateTransformMode,i=C,`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${i} { `+(()=>{switch(r){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${i}(xResized) / ${i}(xScale);
          } else {
            ${a2("xResized","lengthOriginal","lengthResized",i)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${i}(xResized) + 0.5) / ${i}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${i}(xResized) + 0.5) / ${i}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${a2("xResized","lengthOriginal - 1","lengthResized - 1",i)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${i}(roiStart) * ${i}(lengthOriginal - 1) +
                        (${i}(xResized) * ${i}(roiEnd - roiStart) * ${i}(lengthOriginal - 1)) /
                        ${i}(lengthResized - 1);
                  } else {
                    return 0.5 * ${i}(roiStart + roiEnd) * ${i}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${i}xScale * ${i}(lengthResized);
                  const adjustment = ${i}(lengthResized) / outputWidth;
                  const center = ${i}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${i}(xResized) + 0.5) / ${i}(xScale)) - 0.5;`;case"half_pixel":return`return ((${i}(xResized) + 0.5) / ${i}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${r} is not supported`)}})()+"}"};
      ${(()=>{switch(a.mode){case"nearest":let e,r,i,s,o,u,l,d,p,c,h,f;return`
              ${e=k,r=_,`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${tA("uniforms.input_shape","i",r.length)}) {
          return false;
        }
      }
      return true;
    }`};
              ${i=a.nearestMode,s=n,o=C,`fn getNearestPixelFromOriginal(xOriginal: ${o}, isDownSample: bool) -> ${o} {`+(()=>{switch(i){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(s<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${i} is not supported`)}})()+"}"};
              ${u=k,l=S,d=_,p=$,c=v.length,h=b.length,f=E,`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${l.type.indices}) -> ${u.type.indices} {
      var input_indices: ${u.type.indices};
      for (var i:u32 = 0; i < ${p.length}; i++) {
        var output_index = ${l.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${tA("uniforms.scales","i",c)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${tA("uniforms.roi","i",h)};
          var roi_hi = ${tA("uniforms.roi",`i + ${d.length}`,h)};
          var input_shape_i = ${tA("uniforms.input_shape","i",d.length)};
          var output_shape_i = ${tA("uniforms.output_shape","i",p.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${f} || (original_idx >= 0 && original_idx < ${l.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${l.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${u.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`};
              `;case"linear":let m,g,y,w,x;return`
              ${m=S,g=_,y=$,w=v.length,x=b.length,`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${m.type.indices}) -> array<${m.type.value}, ${y.length}> {
      var original_indices: array<${m.type.value}, ${y.length}>;
      for (var i:u32 = 0; i < ${y.length}; i++) {
        var output_index = ${m.indicesGet("output_indices","i")};
        var scale = ${tA("uniforms.scales","i",w)};
        var roi_low = ${tA("uniforms.roi","i",x)};
        var roi_hi = ${tA("uniforms.roi",`i + ${g.length}`,x)};
        if (scale == 1.0) {
          original_indices[i] = ${m.type.value}(output_index);
        } else {
          var input_shape_i = ${tA("uniforms.input_shape","i",g.length)};
          var output_shape_i = ${tA("uniforms.output_shape","i",y.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`};
              ${(()=>{if(2===_.length||4===_.length)return`${((e,r,i,a,n)=>{let[s,o,u,l]=2===i.length?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(row, ${i[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${i[u]} - 1))`)};
      ${a3(e,l,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${r.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${o}];
      var col:${d} = originalIndices[${u}];
      ${a?`if (row < 0 || row > (${i[o]} - 1) || col < 0 || col > (${i[u]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${i[o]} - 1));
      col = max(0, min(col, ${i[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${i.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${i.length>2?`u32(originalIndices[${s}])`:"0"};
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
    }`})(k,S,_,E,z)}`;if(3===_.length||5===_.length)return`${((e,r,i,a,n)=>{let[s,o,u,l,d]=3===i.length?[-1,0,1,2,-1]:[0,2,3,4,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(depth, ${i[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${i[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${i[l]} - 1))`)};
      ${a3(e,d,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${r.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${o}];
      var height:${p} = originalIndices[${u}];
      var width:${p} = originalIndices[${l}];
      ${a?`if (depth < 0 || depth > (${i[o]} - 1) || height < 0 || height > (${i[u]} - 1) || width < 0 || (width > ${i[l]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${i[o]} - 1));
      height = max(0, min(height, ${i[u]} - 1));
      width = max(0, min(width, ${i[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${i.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${i.length>3?`u32(originalIndices[${s}])`:"0"};

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
    }`})(k,S,_,E,z)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===_.length||4===_.length)return`${((e,r,i,a,n,s,o,u,l,d)=>{let[p,c]=2===i.length?[0,1]:[2,3],h=e.type.value,f=o=>{let c=o===p?"row":"col";return`
      fn ${c}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${r.type.indices}) -> ${h} {
        var output_index = ${r.indicesGet("output_indices",o)};
        var originalIdx: ${h} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[o]},
        ${a[o]}, ${i[o]}, ${s[o]}, ${s[o]} + ${i.length});
        var fractOriginalIdx: ${h} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${i[o]} - 1))) {
          return ${l};
        }
        var data: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${c}: ${h} = originalIdx + ${h}(i);
          if (${c} < 0 || ${c} >= ${i[o]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${c} = max(0, min(${c}, ${i[o]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",o,`u32(${c})`)};
          data[i + 1] = ${o===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${f(p)};
    ${f(c)};
  fn getCubicInterpolationCoefs(s: ${h}) -> array<${h}, 4> {
    var absS = abs(s);
    var coeffs: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${h} = 1.0 - absS;
    var twoMinusAbsS: ${h} = 2.0 - absS;
    var onePlusAbsS: ${h} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${h}, 4>, coefs: array<${h}, 4>) -> ${h} {
    var coefsSum: ${h} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${r.type.indices}) -> ${h} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `})(k,S,_,$,v,b,a.cubicCoeffA,E,a.extrapolationValue,a.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${e.registerUniform("output_size","u32").registerUniform("scales","f32",v.length).registerUniform("roi","f32",b.length).declareVariables(k,S)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${I?"output[global_idx] = input[global_idx];":`
        let output_indices = ${S.offsetToIndices("global_idx")};
        var input_indices: ${k.type.indices};
        ${(()=>{switch(a.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${k.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${a.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${2===_.length||4===_.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${a.mode}`)}})()};
`}
      }`},getRunData:()=>({outputs:[{dims:$,dataType:i.dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},{type:1,data:v},{type:1,data:b},...tT(_,$)]})}),{inputs:[0]})},a6=e=>{let r=e.antialias,i=e.axes,a=e.coordinateTransformMode,n=e.cubicCoeffA,s=0!==e.excludeOutside,o=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,d=""===e.nearestMode?"simple":e.nearestMode;return tv({antialias:r,axes:i,coordinateTransformMode:a,cubicCoeffA:n,excludeOutside:s,extrapolationValue:o,keepAspectRatioPolicy:u,mode:l,nearestMode:d})}}),su=q(()=>{"use strict";nf(),ny(),nS(),a8=(e,r)=>{var i,a,n,s;let o,u,l,d,p,c,h,f,m,g,y,_,b;(e=>{if(!e||e.length<3)throw Error("layerNorm requires at least 3 inputs.");let r=e[0],i=e[1],a=e[2];if(r.dataType!==i.dataType||r.dataType!==a.dataType)throw Error("All inputs must have the same data type");if(3!==r.dims.length&&2!==r.dims.length)throw Error("Input must be 2D or 3D");if(3!==i.dims.length&&2!==i.dims.length)throw Error("Skip must be 2D or 3D");let n=r.dims[r.dims.length-1],s=r.dims[r.dims.length-2];if(i.dims[i.dims.length-1]!==n)throw Error("Skip must have the same hidden size as input");if(i.dims[i.dims.length-2]!==s)throw Error("Skip must have the same sequence length as input");if(1!==a.dims.length)throw Error("Gamma must be 1D");if(a.dims[a.dims.length-1]!==n)throw Error("Gamma must have the same hidden size as input");if(e.length>3){let r=e[3];if(1!==r.dims.length)throw Error("Beta must be 1D");if(r.dims[r.dims.length-1]!==n)throw Error("Beta must have the same hidden size as input")}if(e.length>4){let r=e[4];if(1!==r.dims.length)throw Error("Bias must be 1D");if(r.dims[r.dims.length-1]!==n)throw Error("Bias must have the same hidden size as input")}})(e.inputs);let $=[0];e.outputCount>1&&$.push(-3),e.outputCount>2&&$.push(-3),e.outputCount>3&&$.push(3),e.compute((i=e.inputs,a=r,n=e.outputCount,s=!1,o=a.simplified,u=i[0].dims,l=e3.size(u),d=u.slice(-1)[0],p=s?u.slice(0,-1).concat(1):[],c=!o&&i.length>3,h=i.length>4,f=s&&n>1,m=s&&n>2,g=n>3,_=[{type:12,data:l},{type:12,data:y=tI(d)},{type:12,data:d},{type:1,data:a.epsilon}],b=[{dims:u,dataType:i[0].dataType}],n>1&&b.push({dims:p,dataType:1}),n>2&&b.push({dims:p,dataType:1}),n>3&&b.push({dims:u,dataType:i[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${f};${m};${g}`,inputDependencies:i.map((e,r)=>"type")},getShaderSource:e=>{let r=[tR("x",i[0].dataType,i[0].dims,y),tR("skip",i[1].dataType,i[1].dims,y),tR("gamma",i[2].dataType,i[2].dims,y)];c&&r.push(tR("beta",i[3].dataType,i[3].dims,y)),h&&r.push(tR("bias",i[4].dataType,i[4].dims,y)),r.push(tB("output",i[0].dataType,u,y)),f&&r.push(tB("mean_output",1,p)),m&&r.push(tB("inv_std_output",1,p)),g&&r.push(tB("input_skip_bias_sum",i[0].dataType,u,y));let a=tS(i[0].dataType),n=tS(1,y);return`

      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...r)}
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
          let bias_value = ${h?"bias[offset1d + i]":a+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${g?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${tz(a,y,"value")};
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
        let mean = ${tC("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${tC("square_sum",y)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${a}(mean)`}) *
            ${a}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:_})}),{outputs:$})}}),sl=q(()=>{"use strict";nf(),ny(),nx(),nS(),a5=(e,r)=>{let i=[];if(e.length>r)if(7===e[r].dataType)e[r].getBigInt64Array().forEach(e=>i.push(Number(e)));else if(6===e[r].dataType)e[r].getInt32Array().forEach(e=>i.push(Number(e)));else throw Error(`Input ${r} must be an array of int32 or int64`);return i},a9=(e,r,i,a,n)=>{let s=e;return e<0&&(s+=i[a[r]]),n[r]<0?Math.max(0,Math.min(s,i[a[r]]-1)):Math.max(0,Math.min(s,i[a[r]]))},a7=(e,r)=>{var i=e.inputs,a=r;if(!i||i.length<1)throw Error("too few inputs");if(0!==a.axes.length){if(a.axes.length!==a.starts.length||a.axes.length!==a.ends.length)throw Error("axes, starts and ends must have the same length")}else if(a.starts.length!==a.ends.length)throw Error("starts and ends must have the same length");i.slice(1).forEach((e,r)=>{if(6!==i[r+1].dataType&&7!==i[r+1].dataType)throw Error(`Input ${r} must be an array of int32 or int64`)});let n=((e,r)=>{if(!(e.length>1))return r;{let r=a5(e,1),i=a5(e,2),a=a5(e,3);return 0===a.length&&(a=[...Array(e[0].dims.length).keys()]),tv({starts:r,ends:i,axes:a})}})(e.inputs,r);e.compute(((e,r)=>{let i=e[0].dims,a=e3.size(i),n=r.axes.length>0?e3.normalizeAxes(r.axes,i.length):[...Array(i.length).keys()],s=a5(e,4);s.forEach(e=>0!==e||(()=>{throw Error("step cannot be 0")})),0===s.length&&(s=Array(n.length).fill(1));let o=r.starts.map((e,r)=>a9(e,r,i,n,s)),u=r.ends.map((e,r)=>a9(e,r,i,n,s));if(n.length!==o.length||n.length!==u.length)throw Error("start, ends and axes should have the same number of elements");if(n.length!==i.length)for(let e=0;e<i.length;++e)n.includes(e)||(o.splice(e,0,0),u.splice(e,0,i[e]),s.splice(e,0,1));let l=s.map(e=>Math.sign(e));s.forEach((e,r,i)=>{if(e<0){let a=(u[r]-o[r])/e,n=o[r],l=n+a*s[r];o[r]=l,u[r]=n,i[r]=-e}});let d=i.slice(0);n.forEach((e,r)=>{d[e]=Math.ceil((u[e]-o[e])/s[e])});let p={dims:d,dataType:e[0].dataType},c=tB("output",e[0].dataType,d.length),h=tR("input",e[0].dataType,e[0].dims.length),f=e3.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:s.length}],g=[{type:12,data:f},{type:12,data:o},{type:6,data:l},{type:12,data:s},...tT(e[0].dims,d)];return{name:"Slice",shaderCache:{hint:`${l.length}_${o.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:e=>{let r,a,n;return`
      ${e.registerUniforms(m).declareVariables(h,c)}
        ${r=h,a=c,n=i,`fn calculateInputIndices(output_indices: ${a.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${tA("uniforms.input_shape","i",n.length)};
            let steps_i = ${tA("uniforms.steps","i",n.length)};
            let signs_i = ${tA("uniforms.signs","i",n.length)};
            let starts_i = ${tA("uniforms.starts","i",n.length)};
            var output_index = ${a.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${r.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`}
        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`},getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:g})}})(e.inputs,n),{inputs:[0]})},ne=e=>{let r=e.starts,i=e.ends,a=e.axes;return tv({starts:r,ends:i,axes:a})}}),sd=q(()=>{"use strict";nf(),ny(),nx(),nk(),nS(),nt=(e,r)=>{var i,a;let n,s,o,u,l,d,p,c,h,f,m,g,y,_,b,$,v,w,x;(e=>{if(!e||1!==e.length)throw Error("Softmax op requires 1 input.")})(e.inputs),i=e,a=r,s=(n=i.inputs[0]).dims,o=e3.size(s),u=s.length,d=(l=e3.normalizeAxis(a.axis,u))<s.length-1,c=[],d?((c=Array.from({length:u},(e,r)=>r))[l]=u-1,c[u-1]=l,p=i.compute(tq(n,c),{inputs:[n],outputs:[-1]})[0]):p=n,m=o/(f=(h=p.dims)[u-1]),g=tI(f),y=f/g,_=64,1===m&&(_=256),b=tR("x",p.dataType,p.dims,g),$=tB("result",p.dataType,p.dims,g),v=b.type.value,w="f32"===tS(p.dataType)?`var threadMax = ${v}(-3.4028234663852886e+38f);`:`var threadMax = ${v}(-65504.0h);`,x=i.compute({name:"Softmax",shaderCache:{hint:`${g};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:p.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:y}]}),getShaderSource:e=>{let r;return`
      var<workgroup> rowMaxShared : ${v};
      var<workgroup> rowSumShared : ${v};
      var<workgroup> threadShared : array<${v}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${v} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${v}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${e.registerUniform("packedCols","i32").declareVariables(b,$)}
      ${e.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${w}
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
          rowMaxShared = ${v}(${r="threadShared[0]",4===g?`max(max(${r}.x, ${r}.y), max(${r}.z, ${r}.w))`:2===g?`max(${r}.x, ${r}.y)`:3===g?`max(max(${r}.x, ${r}.y), ${r}.z)`:r});
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
          rowSumShared = ${v}(${tC("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${v}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`}},{inputs:[p],outputs:[d?-1:0]})[0],d&&i.compute(tq(x,c),{inputs:[x]})},nr=e=>tv({axis:e.axis})}),sp=q(()=>{"use strict";nf(),ny(),nS(),ni=e=>Array.from(e.getBigInt64Array(),Number),na=e=>{var r,i;let a,n,s,o,u,l,d;(e=>{if(!e||2!==e.length)throw Error("Tile requires 2 inputs.");if(1!==e[0].dataType&&10!==e[0].dataType&&6!==e[0].dataType&&12!==e[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==e[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==e[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(ni(e[1]).length!==e[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")})(e.inputs),e.compute((a=(r=e.inputs)[0].dims,s=((e,r)=>{let i=[];for(let a=0;a<e.length;++a)i.push(e[a]*r[a]);return i})(a,n=i??ni(r[1])),o=e3.size(s),u=r[0].dataType,l=tR("input",u,a.length),d=tB("output",u,s.length),{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},...tT(r[0].dims,s)]}),getShaderSource:e=>`
      const inputShape = ${l.indices(...a)};
      ${e.registerUniform("output_size","u32").declareVariables(l,d)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${l.type.indices};
      for (var i = 0; i < ${a.length}; i++) {
        let input_dim_i = ${l.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${l.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",l.getByIndices("input_indices"))}
    }`}),{inputs:[0]})}}),sc=q(()=>{"use strict";nf(),ny(),nS(),nn=e=>{e.compute((e=>{let r=e[1].dims,i=e[2].dims,a=e[0].dims,n=e[1].dataType,s=!(e3.areEqual(r,i)&&e3.areEqual(i,a)),o=r,u=e3.size(r);if(s){let e=e2.calcShape(e2.calcShape(r,i,!1),a,!1);if(!e)throw Error("Can't perform where op on the given tensors");o=e,u=e3.size(o)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:r=>((e,r,i,a,n)=>{let s=tB("output_data",n,i.length,4),o=tR("a_data",r[1].dataType,r[1].dims.length,4),u=tR("b_data",r[2].dataType,r[2].dims.length,4),l=tR("c_data",r[0].dataType,r[0].dims.length,4),d,p=(e,r,i)=>`select(${r}, ${e}, ${i})`;if(a){let e=(e,r,i="")=>{let a=`a_data[index_a${r}][component_a${r}]`,n=`b_data[index_b${r}][component_b${r}]`,d=`bool(c_data[index_c${r}] & (0xffu << (component_c${r} * 8)))`;return`
            let output_indices${r} = ${s.offsetToIndices(`global_idx * 4u + ${r}u`)};
            let offset_a${r} = ${o.broadcastedIndicesToOffset(`output_indices${r}`,s)};
            let offset_b${r} = ${u.broadcastedIndicesToOffset(`output_indices${r}`,s)};
            let offset_c${r} = ${l.broadcastedIndicesToOffset(`output_indices${r}`,s)};
            let index_a${r} = offset_a${r} / 4u;
            let index_b${r} = offset_b${r} / 4u;
            let index_c${r} = offset_c${r} / 4u;
            let component_a${r} = offset_a${r} % 4u;
            let component_b${r} = offset_b${r} % 4u;
            let component_c${r} = offset_c${r} % 4u;
            ${e}[${r}] = ${i}(${p(a,n,d)});
          `};d=9===n?`
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
          `}else d=s.setByOffset("global_idx",p(o.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,o,u,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`})(r,e,o,s,n),getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...tT(a,r,i,o)]})}})(e.inputs))}}),sh=q(()=>{"use strict";nE(),nz(),nC(),nA(),nR(),nB(),nN(),nG(),nF(),nj(),nK(),nQ(),nZ(),nX(),nY(),nJ(),n0(),n1(),n2(),n3(),n5(),n9(),n7(),se(),st(),n4(),sr(),si(),sa(),sn(),ss(),nI(),so(),n8(),su(),sl(),sd(),n6(),sp(),nk(),nO(),sc(),ns=new Map([["Abs",[r$]],["Acos",[rv]],["Acosh",[rw]],["Add",[r7]],["ArgMax",[rc,rh]],["ArgMin",[rp,rh]],["Asin",[rx]],["Asinh",[rS]],["Atan",[rk]],["Atanh",[rT]],["Attention",[rg]],["AveragePool",[aL,aW]],["BatchNormalization",[ry]],["BiasAdd",[r_]],["BiasSplitGelu",[r5]],["Cast",[rE,rI]],["Ceil",[rC]],["Clip",[rz]],["Concat",[id,ip]],["Conv",[iP,iM]],["ConvTranspose",[iH,iV]],["Cos",[rA]],["Cosh",[rO]],["CumSum",[iF,ij]],["DepthToSpace",[iK,iQ]],["DequantizeLinear",[aX,aY]],["Div",[ie]],["Einsum",[i2,i3]],["Elu",[rB,rR]],["Equal",[it]],["Erf",[rM]],["Exp",[rD]],["Expand",[i6]],["FastGelu",[i8]],["Floor",[rP]],["FusedConv",[iP,iM]],["Gather",[i9,i5]],["GatherElements",[aa,ai]],["GatherBlockQuantized",[at,ar]],["GatherND",[i7,ae]],["Gelu",[rU]],["Gemm",[as,an]],["GlobalAveragePool",[aH,aG]],["GlobalMaxPool",[aZ,aQ]],["Greater",[is]],["GreaterOrEqual",[iu]],["GridSample",[ac,ah]],["GroupQueryAttention",[aT]],["HardSigmoid",[rj,rF]],["InstanceNormalization",[aE]],["LayerNormalization",[az]],["LeakyRelu",[rq,rR]],["Less",[io]],["LessOrEqual",[il]],["Log",[r4]],["MatMul",[aC]],["MatMulNBits",[aA,aO]],["MaxPool",[aj,aK]],["Mul",[ir]],["MultiHeadAttention",[a_,am]],["Neg",[rL]],["Not",[rW]],["Pad",[aR]],["Pow",[ii]],["QuickGelu",[r8,rR]],["Range",[aJ]],["Reciprocal",[rV]],["ReduceMin",[rn]],["ReduceMean",[re]],["ReduceMax",[ra]],["ReduceSum",[ro]],["ReduceProd",[rs]],["ReduceL1",[rt]],["ReduceL2",[rr]],["ReduceLogSum",[rl]],["ReduceLogSumExp",[ri]],["ReduceSumSquare",[ru]],["Relu",[rG]],["Resize",[a4,a6]],["RotaryEmbedding",[ax]],["ScatterND",[a1,a0]],["Sigmoid",[rH]],["Sin",[rK]],["Sinh",[rQ]],["Slice",[a7,ne]],["SkipLayerNormalization",[a8]],["Split",[a$,av]],["Sqrt",[rZ]],["Softmax",[nt,nr]],["Sub",[ia]],["Tan",[rX]],["Tanh",[rJ]],["ThresholdedRelu",[r3,rR]],["Tile",[na]],["Transpose",[tW,tL]],["Where",[nn]]])}),sf=q(()=>{"use strict";eu(),ng(),nS(),no=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,i,a,n){R(e.programInfo.name);let s=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let u=[];for(let e of r)u.push({binding:u.length,resource:{buffer:e.buffer}});for(let e of i)u.push({binding:u.length,resource:{buffer:e.buffer}});n&&u.push({binding:u.length,resource:n});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if("capturing"===this.backend.sessionStatus){let r={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:a};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(r)}o.setPipeline(e.computePipeline),o.setBindGroup(0,l),o.dispatchWorkgroups(...a),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),B(e.programInfo.name)}dispose(){}build(e,r){R(e.name);let i=this.backend.device,a=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(e=>{i.features.has(e.feature)&&a.push(`enable ${e.extension};`)});let n=tP(r,this.backend.device.limits),s=e.getShaderSource(n),o=`${a.join(`
`)}
${n.additionalImplementations}
${s}`,u=i.createShaderModule({code:o,label:e.name});e0("verbose",()=>`[WebGPU] ${e.name} shader code: ${o}`);let l=i.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return B(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let r="number"==typeof e?e:e.x,i="number"==typeof e?1:e.y||1,a="number"==typeof e?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=n&&i<=n&&a<=n)return[r,i,a];let s=r*i*a,o=Math.ceil(Math.sqrt(s));if(!(o>n))return[o,o,1];if((o=Math.ceil(Math.cbrt(s)))>n)throw Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}}}),sm={};W(sm,{WebGpuBackend:()=>sy});var sg,sy,s_=q(()=>{"use strict";eu(),nf(),ng(),n_(),nw(),sh(),sf(),sg=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},sy=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,r){this.env=e;let i=[],a={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:i},n=e=>r.features.has(e)&&i.push(e)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await r.requestDevice(a),this.adapterInfo=new sg(r.info||await r.requestAdapterInfo()),this.gpuDataManager=tb(this),this.programManager=new no(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,eJ(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){"u">typeof this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),r={};"at-passes"===this.queryType&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=e.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let e;this.commandEncoder&&(R(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),e=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&e.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(e.getMappedRange()),i=this.pendingQueries.get(e);for(let e=0;e<r.length/2;e++){let a=i[e],n=a.kernelId,s=this.kernels.get(n),o=s.kernelType,u=s.kernelName,l=a.programName,d=a.inputTensorViews,p=a.outputTensorViews,c=r[2*e],h=r[2*e+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=c);let f=Number(c-this.queryTimeBase),m=Number(h-this.queryTimeBase);if(!Number.isSafeInteger(f)||!Number.isSafeInteger(m))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:d.map(e=>({dims:e.dims,dataType:eL(e.dataType)})),outputsMetadata:p.map(e=>({dims:e.dims,dataType:eL(e.dataType)})),kernelId:n,kernelType:o,kernelName:u,programName:l,startTime:f,endTime:m});else{let e="";d.forEach((r,i)=>{e+=`input[${i}]: [${r.dims}] | ${eL(r.dataType)}, `});let r="";p.forEach((e,i)=>{r+=`output[${i}]: [${e.dims}] | ${eL(e.dataType)}, `}),console.log(`[profiling] kernel "${n}|${o}|${u}|${l}" ${e}${r}start time: ${f} ns, execution time: ${m-f} ns`)}A("GPU",`${l}::${c}::${h}`)}e.unmap(),this.pendingQueries.delete(e)}),B())}run(e,r,i,a,n,s){var o,u,l;let d,p;R(e.name);let c=[];for(let e=0;e<r.length;++e){let i=r[e].data;if(0===i)continue;let a=this.gpuDataManager.get(i);if(!a)throw Error(`no GPU data for input: ${i}`);c.push(a)}let{outputs:h,dispatchGroup:f,programUniforms:m}=e.getRunData(r),g=0===i.length?h.map((e,r)=>r):i;if(g.length!==h.length)throw Error(`Output size ${g.length} must be equal to ${h.length}.`);let y=[],_=[];for(let e=0;e<h.length;++e){if(!Number.isInteger(g[e])||g[e]<-3||g[e]>=s)throw Error(`Invalid output index: ${g[e]}`);if(-3===g[e])continue;let r=-1===g[e],i=-2===g[e],o=r||i?n(h[e].dataType,h[e].dims):a(g[e],h[e].dataType,h[e].dims);if(y.push(o),0===o.data)continue;let u=this.gpuDataManager.get(o.data);if(!u)throw Error(`no GPU data for output: ${o.data}`);if(r&&this.temporaryData.push(u),i){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(u)}_.push(u)}if(c.length!==r.length||_.length!==y.length){if(0===_.length)return B(e.name),y;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(m){let e=0,r=[];m.forEach(i=>{let a="number"==typeof i.data?[i.data]:i.data;if(0===a.length)return;let n=10===i.type?2:4,s,o;10===i.type?(o=a.length>4?16:a.length>2?8:a.length*n,s=a.length>4?16:n*a.length):(o=a.length<=2?a.length*n:16,s=16),e=Math.ceil(e/o)*o,r.push(e);let u=10===i.type?8:4;e+=a.length>4?Math.ceil(a.length/u)*s:a.length*n});let i=new ArrayBuffer(e=16*Math.ceil(e/16));m.forEach((e,a)=>{let n=r[a],s="number"==typeof e.data?[e.data]:e.data;if(6===e.type)new Int32Array(i,n,s.length).set(s);else if(12===e.type)new Uint32Array(i,n,s.length).set(s);else if(10===e.type)new Uint16Array(i,n,s.length).set(s);else if(1===e.type)new Float32Array(i,n,s.length).set(s);else throw Error(`Unsupported uniform type: ${eL(e.type)}`)});let a=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(a.buffer,0,i,0,e),this.gpuDataManager.release(a.id),d={offset:0,size:e,buffer:a.buffer}}let b=this.programManager.normalizeDispatchGroupSize(f),$=(o=e,u=r,l=1===b[1]&&1===b[2],p=o.name,o.shaderCache?.hint&&(p+="["+o.shaderCache.hint+"]"),p+=":"+l+`:${((e,r)=>{if(r.length!==e.length)throw Error(`inputDependencies length ${r.length} is not equal to inputTensors length ${e.length}.`);let i=[];for(let a=0;a<e.length;++a){let n=e[a].dataType;switch(r[a]){case"none":i.push("");break;case"type":i.push(`${n}`);break;case"rank":{let r=e[a].dims.length;i.push(`${n};${r}`);break}case"dims":{let r=e[a].dims.join(",");i.push(`${n};${r}`);break}default:throw Error(`unsupported input dependency: ${r[a]}`)}}return i.join("|")})(u,o.shaderCache?.inputDependencies??Array(u.length).fill("dims"))}`),v=this.programManager.getArtifact($);if(v||(v=this.programManager.build(e,b),this.programManager.setArtifact($,v),e0("info",()=>`[artifact] key: ${$}, programName: ${e.name}`)),m&&v.uniformVariablesInfo){if(m.length!==v.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${m.length} in program "${v.programInfo.name}".`);for(let e=0;e<m.length;e++){let r=m[e],i=r.type,a="number"==typeof r.data?1:r.data.length,[n,s]=v.uniformVariablesInfo[e];if(i!==n||a!==s)throw Error(`Uniform variable ${e} mismatch: expect type ${n} with size ${s}, got type ${i} with size ${a} in program "${v.programInfo.name}".`)}}if(e0("info",()=>`[ProgramManager] run "${e.name}" (key=${$}) with ${b[0]}x${b[1]}x${b[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let e={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:r,outputTensorViews:y};this.pendingKernels.push(e),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(v,c,_,b,d),B(e.name),y}upload(e,r){this.gpuDataManager.upload(e,r)}memcpy(e,r){this.gpuDataManager.memcpy(e,r)}async download(e,r){await this.gpuDataManager.download(e,r)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,r,i,a){let n=ns.get(e);if(!n)throw Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:a,kernelEntry:n[0],attributes:[n[1],i]};this.kernels.set(r,s)}releaseKernel(e){let r=this.kernelPersistentData.get(e);if(r){for(let e of r)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,r,i){let a=this.kernels.get(e);if(!a)throw Error(`kernel not created: ${e}`);let n=a.kernelType,s=a.kernelName,o=a.kernelEntry,u=a.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${n}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),e0("info",()=>`[WebGPU] Start to run kernel "[${n}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),o(r,u[1]),0}catch(e){return i.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${s}" failed. ${e}`)),1}finally{for(let e of(l&&i.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${n}] ${s}": ${e.message}`:null)),this.temporaryData))this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,r,i,a){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let s=n.get(r),o=this.gpuDataManager.registerExternalBuffer(i,a,s);return n.set(r,[o,i]),o}unregisterBuffers(e){let r=this.sessionExternalDataMapping.get(e);r&&(r.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let r=this.gpuDataManager.get(e);if(!r)throw Error(`no GPU data for buffer: ${e}`);return r.buffer}createDownloader(e,r,i){return async()=>{let a=await ty(this,e,r);return e9(a.buffer,i)}}writeTimestamp(e){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){e0("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){e0("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){e0("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),i=e.length;this.pendingKernels=[];for(let a=0;a<i;a++){let i=this.getComputePassEncoder(),n=e[a];this.writeTimestamp(2*this.pendingDispatchNumber),i.setPipeline(n.computePipeline),i.setBindGroup(0,n.bindGroup),i.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(r[a]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),sb={};W(sb,{init:()=>sw});var s$,sv,sw,sx,sS,sk,sT,sI,sE,sz,sC,sA,sO,sR,sB,sN,sM,sD,sP,sU,sq,sW,sL,sV,sG,sH,sF,sj,sK,sQ,sZ,sX,sY,sJ,s0,s1=q(()=>{"use strict";nf(),ng(),ny(),n$(),s$=class e{constructor(e,r,i,a){this.module=e,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let e=e3.size(this.dims);return 0===e?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let e=e3.size(this.dims);return 0===e?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let e=e3.size(this.dims);return 0===e?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let e=e3.size(this.dims);return 0===e?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(r){if(e3.size(r)!==e3.size(this.dims))throw Error("Invalid new shape");return new e(this.module,this.dataType,this.data,r)}},sv=class{constructor(e,r,i){this.module=e,this.backend=r,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=r.adapterInfo;let a=e.PTR_SIZE,n=i/e.PTR_SIZE,s=4===a?"i32":"i64";this.opKernelContext=Number(e.getValue(a*n++,s));let o=Number(e.getValue(a*n++,s));this.outputCount=Number(e.getValue(a*n++,s)),this.customDataOffset=Number(e.getValue(a*n++,"*")),this.customDataSize=Number(e.getValue(a*n++,s));let u=[];for(let r=0;r<o;r++){let r=Number(e.getValue(a*n++,s)),i=Number(e.getValue(a*n++,"*")),o=Number(e.getValue(a*n++,s)),l=[];for(let r=0;r<o;r++)l.push(Number(e.getValue(a*n++,s)));u.push(new s$(e,r,i,l))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,r){let i=r?.inputs?.map(e=>"number"==typeof e?this.inputs[e]:e)??this.inputs,a=r?.outputs??[],n=(e,r,i)=>new s$(this.module,r,this.output(e,i),i),s=(e,r)=>{let i=eV(e,r);if(!i)throw Error(`Unsupported data type: ${e}`);let a=i>0?this.backend.gpuDataManager.create(i).id:0;return new s$(this.module,e,a,r)};return this.backend.run(e,i,a,n,s,this.outputCount)}output(e,r){let i=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=4===i?"i32":"i64",n=this.module.stackAlloc((1+r.length)*i);this.module.setValue(n,r.length,a);for(let e=0;e<r.length;e++)this.module.setValue(n+i*(e+1),r[e],a);return this.module._JsepOutput(this.opKernelContext,e,n)}catch(i){throw Error(`Failed to generate kernel's output[${e}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(i)}}},sw=async(e,r,i,a)=>{let n=r.jsepInit;if(!n)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===e){let e=new(s_(),L(sm)).WebGpuBackend;await e.initialize(i,a),n("webgpu",[e,r=>e.alloc(Number(r)),r=>e.free(r),(i,a,n,s=!1)=>{if(s)e0("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(i)}, dst=${Number(a)}, size=${Number(n)}`),e.memcpy(Number(i),Number(a));else{e0("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(i)}, gpuDataId=${Number(a)}, size=${Number(n)}`);let s=r.HEAPU8.subarray(Number(i>>>0),Number(i>>>0)+Number(n));e.upload(Number(a),s)}},async(i,a,n)=>{e0("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${i}, dataOffset=${a}, size=${n}`),await e.download(Number(i),()=>r.HEAPU8.subarray(Number(a)>>>0,Number(a+n)>>>0))},(i,a,n)=>e.createKernel(i,Number(a),n,r.UTF8ToString(r._JsepGetNodeName(Number(a)))),r=>e.releaseKernel(r),(i,a,n,s)=>{e0("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${n}, kernel=${i}, contextDataOffset=${a}`);let o=new sv(r,e,Number(a));return e.computeKernel(Number(i),o,s)},()=>e.captureBegin(),()=>e.captureEnd(),()=>e.replay()])}else{let e=new tp(i);n("webnn",[e,()=>e.reserveTensorId(),r=>e.releaseTensorId(r),async(r,i,a,n,s)=>e.ensureTensor(r,i,a,n,s),(r,i)=>{e.uploadTensor(r,i)},async(r,i)=>e.downloadTensor(r,i),(r,i)=>e.registerMLContext(r,i),!!i.trace])}}}),s2=q(()=>{"use strict";eu(),nc(),nh(),nf(),nd(),np(),nm(),sx=async e=>{var r,i;r=e.wasm.numThreads,i=eH(e.logLevel),0!==eR()._OrtInit(r,i)&&eM("Can't initialize onnxruntime.")},sS=async(e,r)=>{eR().asyncInit?.();let i=e.webgpu.adapter;if("webgpu"===r){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(i){if("object"!=typeof i.limits||"object"!=typeof i.features||"function"!=typeof i.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=e.webgpu.powerPreference;if(void 0!==r&&"low-power"!==r&&"high-performance"!==r)throw Error(`Invalid powerPreference setting: "${r}"`);let a=e.webgpu.forceFallbackAdapter;if(void 0!==a&&"boolean"!=typeof a)throw Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(!(i=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:a})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===r&&(typeof navigator>"u"||!navigator.ml))throw Error("WebNN is not supported in current environment");{let a=(s1(),L(sb)).init;"webgpu"===r&&await a("webgpu",eR(),e,i),"webnn"===r&&await a("webnn",eR(),e)}},sk=new Map,sT=(e,r)=>{let i=eR(),a=i.stackSave(),n=0;try{let a=i.PTR_SIZE,s=i.stackAlloc(2*a);0!==i._OrtGetInputOutputMetadata(e,r,s,s+a)&&eM("Can't get session input/output metadata.");let o=Number(i.getValue(s,"*"));n=Number(i.getValue(s+a,"*"));let u=i.HEAP32[n/4];if(0===u)return[o,0];let l=i.HEAPU32[n/4+1],d=[];for(let e=0;e<l;e++){let r=Number(i.getValue(n+8+e*a,"*"));d.push(0!==r?i.UTF8ToString(r):Number(i.getValue(n+8+(e+l)*a,"*")))}return[o,u,d]}finally{i.stackRestore(a),0!==n&&i._OrtFree(n)}},sI=e=>{let r=eR(),i=r._malloc(e.byteLength);if(0===i)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return r.HEAPU8.set(e,i),[i,e.byteLength]},sE=async(e,r)=>{let i,a,n=eR();Array.isArray(e)?[i,a]=e:e.buffer===n.HEAPU8.buffer?[i,a]=[e.byteOffset,e.byteLength]:[i,a]=sI(e);let s=0,o=0,u=0,l=[],d=[],p=[];try{if([o,l]=await eq(r),r?.externalData&&n.mountExternalData){let e=[];for(let i of r.externalData){let r="string"==typeof i?i:i.path;e.push(eQ("string"==typeof i?i:i.data).then(e=>{n.mountExternalData(r,e)}))}await Promise.all(e)}for(let e of r?.executionProviders??[])if(("string"==typeof e?e:e.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,"string"!=typeof e){let r=e?.context,i=e?.gpuDevice,a=e?.deviceType,s=e?.powerPreference;r?n.currentContext=r:i?n.currentContext=await n.webnnCreateMLContext(i):n.currentContext=await n.webnnCreateMLContext({deviceType:a,powerPreference:s})}else n.currentContext=await n.webnnCreateMLContext();break}s=await n._OrtCreateSession(i,a,o),n.webgpuOnCreateSession?.(s),0===s&&eM("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(s,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[e,c]=(e=>{let r=eR(),i=r.stackSave();try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);0!==r._OrtGetInputOutputCount(e,a,a+i)&&eM("Can't get session input/output count.");let n=4===i?"i32":"i64";return[Number(r.getValue(a,n)),Number(r.getValue(a+i,n))]}finally{r.stackRestore(i)}})(s),h=!!r?.enableGraphCapture,f=[],m=[],g=[],y=[],_=[];for(let r=0;r<e;r++){let[e,i,a]=sT(s,r);0===e&&eM("Can't get an input name."),d.push(e);let o=n.UTF8ToString(e);f.push(o),g.push(0===i?{name:o,isTensor:!1}:{name:o,isTensor:!0,type:eL(i),shape:a})}for(let i=0;i<c;i++){let[a,o,u]=sT(s,i+e);0===a&&eM("Can't get an output name."),p.push(a);let l=n.UTF8ToString(a);m.push(l),y.push(0===o?{name:l,isTensor:!1}:{name:l,isTensor:!0,type:eL(o),shape:u});{if(h&&r?.preferredOutputLocation===void 0){_.push("gpu-buffer");continue}let e="string"==typeof r?.preferredOutputLocation?r.preferredOutputLocation:r?.preferredOutputLocation?.[l]??"cpu",i=n.webnnIsGraphOutput;if("cpu"===e&&i&&i(s,l)){_.push("ml-tensor-cpu-output");continue}if("cpu"!==e&&"cpu-pinned"!==e&&"gpu-buffer"!==e&&"ml-tensor"!==e)throw Error(`Not supported preferred output location: ${e}.`);if(h&&"gpu-buffer"!==e)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push(e)}}let b=null;return _.some(e=>"gpu-buffer"===e||"ml-tensor"===e||"ml-tensor-cpu-output"===e)&&(u=n._OrtCreateBinding(s),0===u&&eM("Can't create IO binding."),b={handle:u,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(e=>"ml-tensor-cpu-output"===e?"ml-tensor":e).map(e=>eK(e))}),sk.set(s,[s,d,p,b,h,!1]),[s,f,m,g,y]}catch(e){throw d.forEach(e=>n._OrtFree(e)),p.forEach(e=>n._OrtFree(e)),0!==u&&0!==n._OrtReleaseBinding(u)&&eM("Can't release IO binding."),0!==s&&0!==n._OrtReleaseSession(s)&&eM("Can't release session."),e}finally{n._free(i),0!==o&&0!==n._OrtReleaseSessionOptions(o)&&eM("Can't release session options."),l.forEach(e=>n._free(e)),n.unmountExternalData?.()}},sz=e=>{let r=eR(),i=sk.get(e);if(!i)throw Error(`cannot release session. invalid session id: ${e}`);let[a,n,s,o,u]=i;o&&(u&&0!==r._OrtClearBoundOutputs(o.handle)&&eM("Can't clear bound outputs."),0!==r._OrtReleaseBinding(o.handle)&&eM("Can't release IO binding.")),r.jsepOnReleaseSession?.(e),r.webnnOnReleaseSession?.(e),r.webgpuOnReleaseSession?.(e),n.forEach(e=>r._OrtFree(e)),s.forEach(e=>r._OrtFree(e)),0!==r._OrtReleaseSession(a)&&eM("Can't release session."),sk.delete(e)},sC=async(e,r,i,a,n,s,o=!1)=>{if(!e)return void r.push(0);let u=eR(),l=u.PTR_SIZE,d=e[0],p=e[1],c=e[3],h=c,f,m;if("string"===d&&("gpu-buffer"===c||"ml-tensor"===c))throw Error("String tensor is not supported on GPU.");if(o&&"gpu-buffer"!==c)throw Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if("gpu-buffer"===c){let r=e[2].gpuBuffer;m=eV(eW(d),p);{let e=u.jsepRegisterBuffer;if(!e)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=e(a,s,r,m)}}else if("ml-tensor"===c){let r=e[2].mlTensor;m=eV(eW(d),p);let i=u.webnnRegisterMLTensor;if(!i)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=i(a,r,eW(d),p)}else{let r=e[2];if(Array.isArray(r)){m=l*r.length,f=u._malloc(m),i.push(f);for(let e=0;e<r.length;e++){if("string"!=typeof r[e])throw TypeError(`tensor data at index ${e} is not a string`);u.setValue(f+e*l,eB(r[e],i),"*")}}else{let e=u.webnnIsGraphInput,s=u.webnnIsGraphOutput;if("string"!==d&&e&&s){let o=u.UTF8ToString(n);if(e(a,o)||s(a,o)){let e=eW(d);m=eV(e,p),h="ml-tensor";let i=u.webnnCreateTemporaryTensor,n=u.webnnUploadTensor;if(!i||!n)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let s=await i(a,e,p);n(s,new Uint8Array(r.buffer,r.byteOffset,r.byteLength)),f=s}else m=r.byteLength,f=u._malloc(m),i.push(f),u.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,m),f)}else m=r.byteLength,f=u._malloc(m),i.push(f),u.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,m),f)}}let g=u.stackSave(),y=u.stackAlloc(4*p.length);try{p.forEach((e,r)=>u.setValue(y+r*l,e,4===l?"i32":"i64"));let e=u._OrtCreateTensor(eW(d),f,m,y,p.length,eK(h));0===e&&eM(`Can't create tensor for input/output. session=${a}, index=${s}.`),r.push(e)}finally{u.stackRestore(g)}},sA=async(e,r,i,a,n,s)=>{let o=eR(),u=o.PTR_SIZE,l=sk.get(e);if(!l)throw Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],p=l[1],c=l[2],h=l[3],f=l[4],m=l[5],g=r.length,y=a.length,_=0,b=[],$=[],v=[],w=[],x=[],S=o.stackSave(),k=o.stackAlloc(g*u),T=o.stackAlloc(g*u),I=o.stackAlloc(y*u),E=o.stackAlloc(y*u);try{let l;[_,b]=eD(s),N("wasm prepareInputOutputTensor");for(let a=0;a<g;a++)await sC(i[a],$,w,e,p[r[a]],r[a],f);for(let r=0;r<y;r++)await sC(n[r],v,w,e,c[a[r]],g+a[r],f);M("wasm prepareInputOutputTensor");for(let e=0;e<g;e++)o.setValue(k+e*u,$[e],"*"),o.setValue(T+e*u,p[r[e]],"*");for(let e=0;e<y;e++)o.setValue(I+e*u,v[e],"*"),o.setValue(E+e*u,c[a[e]],"*");if(h&&!m){let{handle:i,outputPreferredLocations:s,outputPreferredLocationsEncoded:u}=h;if(p.length!==g)throw Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${p.length}).`);N("wasm bindInputsOutputs");for(let a=0;a<g;a++){let n=r[a];await o._OrtBindInput(i,p[n],$[a])!==0&&eM(`Can't bind input[${a}] for session=${e}.`)}for(let r=0;r<y;r++){let l=a[r];n[r]?.[3]?(x.push(v[r]),0!==o._OrtBindOutput(i,c[l],v[r],0)&&eM(`Can't bind pre-allocated output[${r}] for session=${e}.`)):0!==o._OrtBindOutput(i,c[l],0,u[l])&&eM(`Can't bind output[${r}] to ${s[r]} for session=${e}.`)}M("wasm bindInputsOutputs"),sk.set(e,[d,p,c,h,f,!0])}o.jsepOnRunStart?.(d),o.webnnOnRunStart?.(d),l=h?await o._OrtRunWithBinding(d,h.handle,y,I,_):await o._OrtRun(d,T,k,g,E,y,I,_),0!==l&&eM("failed to call OrtRun().");let S=[],z=[];N("wasm ProcessOutputTensor");for(let r=0;r<y;r++){let i=Number(o.getValue(I+r*u,"*"));if(i===v[r]||x.includes(v[r])){S.push(n[r]),i!==v[r]&&0!==o._OrtReleaseTensor(i)&&eM("Can't release tensor.");continue}let s=o.stackSave(),l=o.stackAlloc(4*u),d=!1,p,c=0;try{0!==o._OrtGetTensorData(i,l,l+u,l+2*u,l+3*u)&&eM(`Can't access output tensor data on index ${r}.`);let n=4===u?"i32":"i64",s=Number(o.getValue(l,n));c=o.getValue(l+u,"*");let f=o.getValue(l+2*u,"*"),m=Number(o.getValue(l+3*u,n)),g=[];for(let e=0;e<m;e++)g.push(Number(o.getValue(f+e*u,n)));0!==o._OrtFree(f)&&eM("Can't free memory for tensor dims.");let y=g.reduce((e,r)=>e*r,1);p=eL(s);let _=h?.outputPreferredLocations[a[r]];if("string"===p){if("gpu-buffer"===_||"ml-tensor"===_)throw Error("String tensor is not supported on GPU.");let e=[];for(let r=0;r<y;r++){let i=o.getValue(c+r*u,"*"),a=o.getValue(c+(r+1)*u,"*"),n=r===y-1?void 0:a-i;e.push(o.UTF8ToString(i,n))}S.push([p,g,e,"cpu"])}else if("gpu-buffer"===_&&y>0){let e=o.jsepGetBuffer;if(!e)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let r=e(c),a=eV(s,y);if(void 0===a||!eF(p))throw Error(`Unsupported data type: ${p}`);d=!0,S.push([p,g,{gpuBuffer:r,download:o.jsepCreateDownloader(r,a,p),dispose:()=>{0!==o._OrtReleaseTensor(i)&&eM("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===_&&y>0){let r=o.webnnEnsureTensor,a=o.webnnIsGraphInputOutputTypeSupported;if(!r||!a)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===eV(s,y)||!ej(p))throw Error(`Unsupported data type: ${p}`);if(!a(e,p,!1))throw Error(`preferredLocation "ml-tensor" for ${p} output is not supported by current WebNN Context.`);let n=await r(e,c,s,g,!1);d=!0,S.push([p,g,{mlTensor:n,download:o.webnnCreateMLTensorDownloader(c,p),dispose:()=>{o.webnnReleaseTensorId(c),o._OrtReleaseTensor(i)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===_&&y>0){let e=o.webnnCreateMLTensorDownloader(c,p)(),r=S.length;d=!0,z.push((async()=>{let a=[r,await e];return o.webnnReleaseTensorId(c),o._OrtReleaseTensor(i),a})()),S.push([p,g,[],"cpu"])}else{let e=new(eG(p))(y);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(o.HEAPU8.subarray(c,c+e.byteLength)),S.push([p,g,e,"cpu"])}}finally{o.stackRestore(s),"string"===p&&c&&o._free(c),d||o._OrtReleaseTensor(i)}}for(let[r,i]of(h&&!f&&(0!==o._OrtClearBoundOutputs(h.handle)&&eM("Can't clear bound outputs."),sk.set(e,[d,p,c,h,f,!1])),await Promise.all(z)))S[r][2]=i;return M("wasm ProcessOutputTensor"),S}finally{o.webnnOnRunEnd?.(d),o.stackRestore(S),$.forEach(e=>o._OrtReleaseTensor(e)),v.forEach(e=>o._OrtReleaseTensor(e)),w.forEach(e=>o._free(e)),0!==_&&o._OrtReleaseRunOptions(_),b.forEach(e=>o._free(e))}},sO=e=>{let r=eR(),i=sk.get(e);if(!i)throw Error("invalid session id");let a=i[0],n=r._OrtEndProfiling(a);0===n&&eM("Can't get an profile file name."),r._OrtFree(n)},sR=e=>{let r=[];for(let i of e){let e=i[2];!Array.isArray(e)&&"buffer"in e&&r.push(e.buffer)}return r}}),s3=q(()=>{"use strict";eu(),s2(),nd(),nl(),sB=()=>!!f.wasm.proxy&&"u">typeof document,sM=!1,sD=!1,sP=!1,sW=new Map,sL=(e,r)=>{let i=sW.get(e);i?i.push(r):sW.set(e,[r])},sV=()=>{if(sM||!sD||sP||!sN)throw Error("worker not ready")},sG=e=>{switch(e.data.type){case"init-wasm":sM=!1,e.data.err?(sP=!0,sq[1](e.data.err)):(sD=!0,sq[0]()),sU&&(URL.revokeObjectURL(sU),sU=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let r=sW.get(e.data.type);e.data.err?r.shift()[1](e.data.err):r.shift()[0](e.data.out)}}},sH=async()=>{if(!sD){if(sM)throw Error("multiple calls to 'initWasm()' detected.");if(sP)throw Error("previous call to 'initWasm()' failed.");if(sM=!0,sB())return new Promise((e,r)=>{sN?.terminate(),ek().then(([i,a])=>{try{(sN=a).onerror=e=>r(e),sN.onmessage=sG,sq=[e,r];let n={type:"init-wasm",in:f};!n.in.wasm.wasmPaths&&(i||e_)&&(n.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),sN.postMessage(n),sU=i}catch(e){r(e)}},r)});try{await eO(f.wasm),await sx(f),sD=!0}catch(e){throw sP=!0,e}finally{sM=!1}}},sF=async e=>{if(sB())return sV(),new Promise((r,i)=>{sL("init-ep",[r,i]);let a={type:"init-ep",in:{epName:e,env:f}};sN.postMessage(a)});await sS(f,e)},sj=async e=>sB()?(sV(),new Promise((r,i)=>{sL("copy-from",[r,i]),sN.postMessage({type:"copy-from",in:{buffer:e}},[e.buffer])})):sI(e),sK=async(e,r)=>{if(!sB())return sE(e,r);if(r?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return sV(),new Promise((i,a)=>{sL("create",[i,a]);let n={type:"create",in:{model:e,options:{...r}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),sN.postMessage(n,s)})},sQ=async e=>{if(sB())return sV(),new Promise((r,i)=>{sL("release",[r,i]),sN.postMessage({type:"release",in:e})});sz(e)},sZ=async(e,r,i,a,n,s)=>{if(!sB())return sA(e,r,i,a,n,s);if(i.some(e=>"cpu"!==e[3]))throw Error("input tensor on GPU is not supported for proxy.");if(n.some(e=>e))throw Error("pre-allocated output tensor is not supported for proxy.");return sV(),new Promise((n,o)=>{sL("run",[n,o]),sN.postMessage({type:"run",in:{sessionId:e,inputIndices:r,inputs:i,outputIndices:a,options:s}},sR(i))})},sX=async e=>{if(sB())return sV(),new Promise((r,i)=>{sL("end-profiling",[r,i]),sN.postMessage({type:"end-profiling",in:e})});sO(e)}}),s4=q(()=>{"use strict";eu(),s3(),nf(),el(),nm(),sY=(e,r)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${e.location} for ${r()}`)}},sJ=e=>{switch(e[3]){case"cpu":return new C(e[0],e[2],e[1]);case"gpu-buffer":{let r=e[0];if(!eF(r))throw Error(`not supported data type: ${r} for deserializing GPU tensor`);let{gpuBuffer:i,download:a,dispose:n}=e[2];return C.fromGpuBuffer(i,{dataType:r,dims:e[1],download:a,dispose:n})}case"ml-tensor":{let r=e[0];if(!ej(r))throw Error(`not supported data type: ${r} for deserializing MLTensor tensor`);let{mlTensor:i,download:a,dispose:n}=e[2];return C.fromMLTensor(i,{dataType:r,dims:e[1],download:a,dispose:n})}default:throw Error(`invalid data location: ${e[3]}`)}},s0=class{async fetchModelAndCopyToWasmMemory(e){return sj(await eQ(e))}async loadModel(e,r){let i;R(),i="string"==typeof e?await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await sK(i,r),B()}async dispose(){return sQ(this.sessionId)}async run(e,r,i){R();let a=[],n=[];Object.entries(e).forEach(e=>{let r=e[0],i=e[1],s=this.inputNames.indexOf(r);if(-1===s)throw Error(`invalid input '${r}'`);a.push(i),n.push(s)});let s=[],o=[];Object.entries(r).forEach(e=>{let r=e[0],i=e[1],a=this.outputNames.indexOf(r);if(-1===a)throw Error(`invalid output '${r}'`);s.push(i),o.push(a)});let u=a.map((e,r)=>sY(e,()=>`input "${this.inputNames[n[r]]}"`)),l=s.map((e,r)=>e?sY(e,()=>`output "${this.outputNames[o[r]]}"`):null),d=await sZ(this.sessionId,n,u,o,l,i),p={};for(let e=0;e<d.length;e++)p[this.outputNames[o[e]]]=s[e]??sJ(d[e]);return B(),p}startProfiling(){}endProfiling(){sX(this.sessionId)}}}),s6={};W(s6,{OnnxruntimeWebAssemblyBackend:()=>s5,initializeFlags:()=>s8,wasmBackend:()=>s9});var s8,s5,s9,s7=q(()=>{"use strict";eu(),s3(),s4(),s8=()=>{("number"!=typeof f.wasm.initTimeout||f.wasm.initTimeout<0)&&(f.wasm.initTimeout=0);let e=f.wasm.simd;if("boolean"!=typeof e&&void 0!==e&&"fixed"!==e&&"relaxed"!==e&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),f.wasm.simd=!1),"boolean"!=typeof f.wasm.proxy&&(f.wasm.proxy=!1),"boolean"!=typeof f.wasm.trace&&(f.wasm.trace=!1),"number"!=typeof f.wasm.numThreads||!Number.isInteger(f.wasm.numThreads)||f.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)f.wasm.numThreads=1;else{let e=typeof navigator>"u"?U("node:os").cpus().length:navigator.hardwareConcurrency;f.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},s9=new(s5=class{async init(e){s8(),await sH(),await sF(e)}async createInferenceSessionHandler(e,r){let i=new s0;return await i.loadModel(e,r),i}})});eu(),eu(),eu();var oe=eo;{let e=(s7(),L(s6)).wasmBackend;u("webgpu",e,5),u("webnn",e,5),u("cpu",e,10),u("wasm",e,10)}Object.defineProperty(f.versions,"web",{value:"1.24.3",enumerable:!0});export{P as InferenceSession,A as TRACE,N as TRACE_EVENT_BEGIN,M as TRACE_EVENT_END,R as TRACE_FUNC_BEGIN,B as TRACE_FUNC_END,C as Tensor,oe as default,f as env,u as registerBackend};