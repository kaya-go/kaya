/*! LICENSE: ort.min.mjs.LICENSE.txt */
let e;var t=Object.defineProperty,i=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,a=Object.prototype.hasOwnProperty,s,n,o,u,l,d,p,h,c,f,m,g,_,y,$,b,v,w,x,k,S,I,T,z,E,C,O,B,A,R,D,M,U,P=(e=function(e){if("u">typeof require)return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')},"u">typeof require?require:"u">typeof Proxy?new Proxy(e,{get:(e,t)=>("u">typeof require?require:e)[t]}):e),q=(e,t)=>()=>(e&&(t=e(e=0)),t),N=(e,i)=>{for(var r in i)t(e,r,{get:i[r],enumerable:!0})},L=e=>((e,s,n)=>{if(s&&"object"==typeof s||"function"==typeof s)for(let o of r(s))a.call(e,o)||void 0===o||t(e,o,{get:()=>s[o],enumerable:!(n=i(s,o))||n.enumerable});return e})(t({},"__esModule",{value:!0}),e),V=q(()=>{"use strict";s=new Map,n=[],o=(e,t,i)=>{if(t&&"function"==typeof t.init&&"function"==typeof t.createInferenceSessionHandler){let r=s.get(e);if(void 0===r)s.set(e,{backend:t,priority:i});else{if(r.priority>i)return;if(r.priority===i&&r.backend!==t)throw Error(`cannot register backend "${e}" using priority ${i}`)}if(i>=0){let t=n.indexOf(e);-1!==t&&n.splice(t,1);for(let t=0;t<n.length;t++)if(s.get(n[t]).priority<=i)return void n.splice(t,0,e);n.push(e)}return}throw TypeError("not a valid backend")},u=async e=>{let t=s.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let i=!!t.initPromise;try{return i||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(e){return i||(t.error=`${e}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},l=async e=>{let t=e.executionProviders||[],i=t.map(e=>"string"==typeof e?e:e.name),r=0===i.length?n:i,a,s=[],o=new Set;for(let e of r){let t=await u(e);"string"==typeof t?s.push({name:e,err:t}):(a||(a=t),a===t&&o.add(e))}if(!a)throw Error(`no available backend found. ERR: ${s.map(e=>`[${e.name}] ${e.err}`).join(", ")}`);for(let{name:e,err:t}of s)i.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${t}`);let l=t.filter(e=>o.has("string"==typeof e?e:e.name));return[a,new Proxy(e,{get:(e,t)=>"executionProviders"===t?l:Reflect.get(e,t)})]}}),G=q(()=>{"use strict";V()}),W=q(()=>{"use strict";d="1.24.3"}),H=q(()=>{"use strict";W(),p="warning",Object.defineProperty(h={wasm:{},webgl:{},webgpu:{},versions:{common:d},set logLevel(e){if(void 0!==e){if("string"!=typeof e||-1===["verbose","info","warning","error","fatal"].indexOf(e))throw Error(`Unsupported logging level: ${e}`);p=e}},get logLevel(){return p}},"logLevel",{enumerable:!0})}),F=q(()=>{"use strict";H(),c=h}),K=q(()=>{"use strict";f=(e,t)=>{let i="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);i.width=e.dims[3],i.height=e.dims[2];let r=i.getContext("2d");if(null!=r){let a,s;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(a=e.dims[2],s=e.dims[3]):(a=e.dims[3],s=e.dims[2]);let n=t?.format!==void 0?t.format:"RGB",o=t?.norm,u,l;void 0===o||void 0===o.mean?u=[255,255,255,255]:"number"==typeof o.mean?u=[o.mean,o.mean,o.mean,o.mean]:(u=[o.mean[0],o.mean[1],o.mean[2],0],void 0!==o.mean[3]&&(u[3]=o.mean[3])),void 0===o||void 0===o.bias?l=[0,0,0,0]:"number"==typeof o.bias?l=[o.bias,o.bias,o.bias,o.bias]:(l=[o.bias[0],o.bias[1],o.bias[2],0],void 0!==o.bias[3]&&(l[3]=o.bias[3]));let d=s*a,p=0,h=d,c=2*d,f=-1;"RGBA"===n?(p=0,h=d,c=2*d,f=3*d):"RGB"===n?(p=0,h=d,c=2*d):"RBG"===n&&(p=0,c=d,h=2*d);for(let t=0;t<s;t++)for(let i=0;i<a;i++)r.fillStyle="rgba("+(e.data[p++]-l[0])*u[0]+","+(e.data[h++]-l[1])*u[1]+","+(e.data[c++]-l[2])*u[2]+","+(-1===f?255:(e.data[f++]-l[3])*u[3])+")",r.fillRect(i,t,1,1);if("toDataURL"in i)return i.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},m=(e,t)=>{let i="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(null!=i){let a,s,n;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(a=e.dims[2],s=e.dims[1],n=e.dims[3]):(a=e.dims[3],s=e.dims[2],n=e.dims[1]);let o=void 0!==t&&void 0!==t.format?t.format:"RGB",u=t?.norm,l,d;void 0===u||void 0===u.mean?l=[255,255,255,255]:"number"==typeof u.mean?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],void 0!==u.mean[3]&&(l[3]=u.mean[3])),void 0===u||void 0===u.bias?d=[0,0,0,0]:"number"==typeof u.bias?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(d[3]=u.bias[3]));let p=s*a;if(void 0!==t&&(void 0!==t.format&&4===n&&"RGBA"!==t.format||3===n&&"RGB"!==t.format&&"BGR"!==t.format))throw Error("Tensor format doesn't match input tensor dims");let h=0,c=1,f=2,m=3,g=0,_=p,y=2*p,$=-1;"RGBA"===o?(g=0,_=p,y=2*p,$=3*p):"RGB"===o?(g=0,_=p,y=2*p):"RBG"===o&&(g=0,y=p,_=2*p),r=i.createImageData(a,s);for(let t=0;t<s*a;h+=4,c+=4,f+=4,m+=4,t++)r.data[h]=(e.data[g++]-d[0])*l[0],r.data[c]=(e.data[_++]-d[1])*l[1],r.data[f]=(e.data[y++]-d[2])*l[2],r.data[m]=-1===$?255:(e.data[$++]-d[3])*l[3]}else throw Error("Can not access image data");return r}}),j=q(()=>{"use strict";X(),g=(e,t)=>{if(void 0===e)throw Error("Image buffer must be defined");if(void 0===t.height||void 0===t.width)throw Error("Image height and width must be defined");if("NHWC"===t.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:i,width:r}=t,a=t.norm??{mean:255,bias:0},s,n;s="number"==typeof a.mean?[a.mean,a.mean,a.mean,a.mean]:[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],n="number"==typeof a.bias?[a.bias,a.bias,a.bias,a.bias]:[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let o=void 0!==t.format?t.format:"RGBA",u=void 0!==t.tensorFormat&&void 0!==t.tensorFormat?t.tensorFormat:"RGB",l=i*r,d=new Float32Array("RGBA"===u?4*l:3*l),p=4,h=0,c=1,f=2,m=3,g=0,_=l,y=2*l,$=-1;"RGB"===o&&(p=3,h=0,c=1,f=2,m=-1),"RGBA"===u?$=3*l:"RBG"===u?(g=0,y=l,_=2*l):"BGR"===u&&(y=0,_=l,g=2*l);for(let t=0;t<l;t++,h+=p,f+=p,c+=p,m+=p)d[g++]=(e[h]+n[0])/s[0],d[_++]=(e[c]+n[1])/s[1],d[y++]=(e[f]+n[2])/s[2],-1!==$&&-1!==m&&(d[$++]=(e[m]+n[3])/s[3]);return"RGBA"===u?new z("float32",d,[1,4,i,r]):new z("float32",d,[1,3,i,r])},_=async(e,t)=>{let i="u">typeof HTMLImageElement&&e instanceof HTMLImageElement,r="u">typeof ImageData&&e instanceof ImageData,a="u">typeof ImageBitmap&&e instanceof ImageBitmap,s="string"==typeof e,n,o=t??{},u=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},l=e=>"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext("2d"):null;if(i){let i=u();i.width=e.width,i.height=e.height;let r=l(i);if(null!=r){let i=e.height,a=e.width;if(void 0!==t&&void 0!==t.resizedHeight&&void 0!==t.resizedWidth&&(i=t.resizedHeight,a=t.resizedWidth),void 0!==t){if(o=t,void 0!==t.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=i,o.width=a}else o.tensorFormat="RGBA",o.height=i,o.width=a;r.drawImage(e,0,0),n=r.getImageData(0,0,a,i).data}else throw Error("Can not access image data")}else if(r){let i,r;if(void 0!==t&&void 0!==t.resizedWidth&&void 0!==t.resizedHeight?(i=t.resizedHeight,r=t.resizedWidth):(i=e.height,r=e.width),void 0!==t&&(o=t),o.format="RGBA",o.height=i,o.width=r,void 0!==t){let t=u();t.width=r,t.height=i;let a=l(t);if(null!=a)a.putImageData(e,0,0),n=a.getImageData(0,0,r,i).data;else throw Error("Can not access image data")}else n=e.data}else if(a){if(void 0===t)throw Error("Please provide image config with format for Imagebitmap");let i=u();i.width=e.width,i.height=e.height;let r=l(i);if(null!=r){let t=e.height,i=e.width;return r.drawImage(e,0,0,i,t),n=r.getImageData(0,0,i,t).data,o.height=t,o.width=i,g(n,o)}throw Error("Can not access image data")}else{if(s)return new Promise((t,i)=>{let r=u(),a=l(r);if(!e||!a)return i();let s=new Image;s.crossOrigin="Anonymous",s.src=e,s.onload=()=>{r.width=s.width,r.height=s.height,a.drawImage(s,0,0,r.width,r.height);let e=a.getImageData(0,0,r.width,r.height);o.height=r.height,o.width=r.width,t(g(e.data,o))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==n)return g(n,o);throw Error("Input data provided is not supported - aborted tensor creation")},y=(e,t)=>{let{width:i,height:r,download:a,dispose:s}=t;return new z({location:"texture",type:"float32",texture:e,dims:[1,r,i,4],download:a,dispose:s})},$=(e,t)=>{let{dataType:i,dims:r,download:a,dispose:s}=t;return new z({location:"gpu-buffer",type:i??"float32",gpuBuffer:e,dims:r,download:a,dispose:s})},b=(e,t)=>{let{dataType:i,dims:r,download:a,dispose:s}=t;return new z({location:"ml-tensor",type:i??"float32",mlTensor:e,dims:r,download:a,dispose:s})},v=(e,t,i)=>new z({location:"cpu-pinned",type:e,data:t,dims:i??[t.length]})}),Z=q(()=>{"use strict";w=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),x=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),k=!1,S=()=>{if(!k){k=!0;let e="u">typeof BigInt64Array&&BigInt64Array.from,t="u">typeof BigUint64Array&&BigUint64Array.from,i=globalThis.Float16Array,r="u">typeof i&&i.from;e&&(w.set("int64",BigInt64Array),x.set(BigInt64Array,"int64")),t&&(w.set("uint64",BigUint64Array),x.set(BigUint64Array,"uint64")),r?(w.set("float16",i),x.set(i,"float16")):w.set("float16",Uint16Array)}}}),Q=q(()=>{"use strict";X(),I=e=>{let t=1;for(let i=0;i<e.length;i++){let r=e[i];if("number"!=typeof r||!Number.isSafeInteger(r))throw TypeError(`dims[${i}] must be an integer, got: ${r}`);if(r<0)throw RangeError(`dims[${i}] must be a non-negative integer, got: ${r}`);t*=r}return t},T=(e,t)=>{switch(e.location){case"cpu":return new z(e.type,e.data,t);case"cpu-pinned":return new z({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new z({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new z({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new z({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),X=q(()=>{"use strict";K(),j(),Z(),Q(),z=class{constructor(e,t,i){let r,a;if(S(),"object"==typeof e&&"location"in e)switch(this.dataLocation=e.location,r=e.type,a=e.dims,e.location){case"cpu-pinned":{let t=w.get(r);if(!t)throw TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof t))throw TypeError(`buffer should be of type ${t.name}`);this.cpuData=e.data;break}case"texture":if("float32"!==r)throw TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case"gpu-buffer":if("float32"!==r&&"float16"!==r&&"int32"!==r&&"int64"!==r&&"uint32"!==r&&"uint8"!==r&&"bool"!==r&&"uint4"!==r&&"int4"!==r)throw TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case"ml-tensor":if("float32"!==r&&"float16"!==r&&"int32"!==r&&"int64"!==r&&"uint32"!==r&&"uint64"!==r&&"int8"!==r&&"uint8"!==r&&"bool"!==r&&"uint4"!==r&&"int4"!==r)throw TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,n;if("string"==typeof e)if(r=e,n=i,"string"===e){if(!Array.isArray(t))throw TypeError("A string tensor's data must be a string array.");s=t}else{let i=w.get(e);if(void 0===i)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if("float16"===e&&i===Uint16Array||"uint4"===e||"int4"===e)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${i.name} as data.`);s="uint64"===e||"int64"===e?i.from(t,BigInt):i.from(t)}else if(t instanceof i)s=t;else if(t instanceof Uint8ClampedArray)if("uint8"===e)s=Uint8Array.from(t);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===e&&t instanceof Uint16Array&&i!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw TypeError(`A ${r} tensor's data must be type of ${i}`)}else if(n=t,Array.isArray(e)){if(0===e.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let t=typeof e[0];if("string"===t)r="string",s=e;else if("boolean"===t)r="bool",s=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${t}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",s=Uint8Array.from(e);else{let t=x.get(e.constructor);if(void 0===t)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=t,s=e}if(void 0===n)n=[s.length];else if(!Array.isArray(n))throw TypeError("A tensor's dims must be a number array");a=n,this.cpuData=s,this.dataLocation="cpu"}let s=I(a);if(this.cpuData&&s!==this.cpuData.length&&("uint4"!==r&&"int4"!==r||Math.ceil(s/2)!==this.cpuData.length))throw Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=a,this.size=s}static async fromImage(e,t){return _(e,t)}static fromTexture(e,t){return y(e,t)}static fromGpuBuffer(e,t){return $(e,t)}static fromMLTensor(e,t){return b(e,t)}static fromPinnedBuffer(e,t,i){return v(e,t,i)}toDataURL(e){return f(this,e)}toImageData(e){return m(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return T(this,e)}}}),Y=q(()=>{"use strict";X(),E=z}),J=q(()=>{"use strict";H(),C=(e,t)=>{(typeof h.trace>"u"?h.wasm.trace:h.trace)&&console.timeStamp(`${e}::ORT::${t}`)},O=(e,t)=>{let i=Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let a=0;a<i.length;a++){if(r&&!i[a].includes("TRACE_FUNC")){let r=`FUNC_${e}::${i[a].trim().split(" ")[1]}`;t&&(r+=`::${t}`),C("CPU",r);return}i[a].includes("TRACE_FUNC")&&(r=!0)}},B=e=>{(typeof h.trace>"u"?h.wasm.trace:h.trace)&&O("BEGIN",e)},A=e=>{(typeof h.trace>"u"?h.wasm.trace:h.trace)&&O("END",e)},R=e=>{(typeof h.trace>"u"?h.wasm.trace:h.trace)&&console.time(`ORT::${e}`)},D=e=>{(typeof h.trace>"u"?h.wasm.trace:h.trace)&&console.timeEnd(`ORT::${e}`)}}),ee=q(()=>{"use strict";V(),Y(),J(),M=class e{constructor(e){this.handler=e}async run(e,t,i){B(),R("InferenceSession.run");let r={},a={};if("object"!=typeof e||null===e||e instanceof E||Array.isArray(e))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if("object"==typeof t){if(null===t)throw TypeError("Unexpected argument[1]: cannot be null.");if(t instanceof E)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(t)){if(0===t.length)throw TypeError("'fetches' cannot be an empty array.");for(let e of(s=!1,t)){if("string"!=typeof e)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(e))throw RangeError(`'fetches' contains invalid output name: ${e}.`);r[e]=null}if("object"==typeof i&&null!==i)a=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else{let e=!1,n=Object.getOwnPropertyNames(t);for(let i of this.outputNames)if(-1!==n.indexOf(i)){let a=t[i];(null===a||a instanceof E)&&(e=!0,s=!1,r[i]=a)}if(e){if("object"==typeof i&&null!==i)a=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else a=t}}else if("u">typeof t)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let t of this.inputNames)if(typeof e[t]>"u")throw Error(`input '${t}' is missing in 'feeds'.`);if(s)for(let e of this.outputNames)r[e]=null;let n=await this.handler.run(e,r,a),o={};for(let e in n)if(Object.hasOwnProperty.call(n,e)){let t=n[e];t instanceof E?o[e]=t:o[e]=new E(t.type,t.data,t.dims)}return D("InferenceSession.run"),A(),o}async release(){return this.handler.dispose()}static async create(t,i,r,a){B(),R("InferenceSession.create");let s,n={};if("string"==typeof t){if(s=t,"object"==typeof i&&null!==i)n=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,"object"==typeof i&&null!==i)n=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&t instanceof SharedArrayBuffer){let e=0,o=t.byteLength;if("object"==typeof i&&null!==i)n=i;else if("number"==typeof i){if(!Number.isSafeInteger(e=i))throw RangeError("'byteOffset' must be an integer.");if(e<0||e>=t.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${t.byteLength}).`);if(o=t.byteLength-e,"number"==typeof r){if(!Number.isSafeInteger(o=r))throw RangeError("'byteLength' must be an integer.");if(o<=0||e+o>t.byteLength)throw RangeError(`'byteLength' is out of range (0, ${t.byteLength-e}].`);if("object"==typeof a&&null!==a)n=a;else if("u">typeof a)throw TypeError("'options' must be an object.")}else if("u">typeof r)throw TypeError("'byteLength' must be a number.")}else if("u">typeof i)throw TypeError("'options' must be an object.");s=new Uint8Array(t,e,o)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,u]=await l(n),d=await o.createInferenceSessionHandler(s,u);return D("InferenceSession.create"),A(),new e(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),et=q(()=>{"use strict";ee(),U=M}),ei=q(()=>{}),er=q(()=>{}),ea=q(()=>{}),es=q(()=>{}),en={};N(en,{InferenceSession:()=>U,TRACE:()=>C,TRACE_EVENT_BEGIN:()=>R,TRACE_EVENT_END:()=>D,TRACE_FUNC_BEGIN:()=>B,TRACE_FUNC_END:()=>A,Tensor:()=>E,env:()=>c,registerBackend:()=>o});var eo=q(()=>{"use strict";G(),F(),et(),Y(),ei(),er(),J(),ea(),es()}),eu=q(()=>{}),el={};N(el,{default:()=>ep});var ed,ep,eh,ec,ef,em,eg,e_,ey,e$,eb,ev,ew,ex,ek,eS,eI,eT,ez,eE,eC,eO,eB,eA,eR,eD,eM,eU,eP,eq,eN,eL,eV,eG,eW,eH,eF,eK,ej,eZ,eQ,eX,eY,eJ,e0,e1,e2,e3,e4,e6,e8,e5,e7,e9,te,tt,ti,tr,ta,ts,tn,to,tu,tl,td,tp,th,tc,tf,tm,tg,t_,ty,t$,tb,tv,tw,tx,tk,tS,tI,tT,tz,tE,tC,tO,tB,tA,tR,tD,tM,tU,tP,tq,tN,tL,tV,tG,tW,tH,tF,tK,tj,tZ,tQ,tX,tY,tJ,t0,t1,t2,t3,t4,t6,t8,t5,t7,t9,ie,it,ii,ir,ia,is,io,iu,il,id,ip,ih,ic,im,ig,i_,iy,i$,ib,iv,iw,ix,ik,iS,iI,iT,iz,iE,iC,iO,iB,iA,iR,iD,iM,iU,iP,iq,iN,iL,iV,iG,iW,iH,iF,iK,ij,iZ,iQ,iX,iY,iJ,i0,i1,i2,i3,i4,i6,i8,i5,i7,i9,re,rt,ri,rr,ra,rs,rn,ro,ru,rl,rd,rp,rh,rc,rf,rm,rg,r_,ry,r$,rb,rv,rw,rx,rk,rS,rI,rT,rz,rE,rC,rO,rB,rA,rR,rD,rM,rU,rP,rq,rN,rL,rV,rG,rW,rH,rF,rK,rj,rZ,rQ,rX,rY,rJ,r0,r1,r2,r3,r4,r6,r8,r5,r7,r9,ae,at,ai,ar,aa,as,an,ao,au,al,ad,ap,ah,ac,af,am,ag,a_,ay,a$,ab,av,aw,ax,ak,aS,aI,aT,az,aE,aC,aO,aB,aA,aR,aD,aM,aU,aP,aq,aN,aL,aV,aG,aW,aH,aF,aK,aj,aZ,aQ,aX,aY,aJ,a0,a1,a2,a3,a4,a6,a8,a5,a7,a9,se,st=q(()=>{"use strict";nZ(),sr(),si(),(ed=globalThis.self?.name==="ort-wasm-proxy-worker")&&(self.onmessage=e=>{let{type:t,in:i}=e.data;try{switch(t){case"init-wasm":eI(i.wasm).then(()=>{ng(i).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})})},e=>{postMessage({type:t,err:e})});break;case"init-ep":{let{epName:e,env:r}=i;n_(r,e).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})});break}case"copy-from":{let{buffer:e}=i,r=nb(e);postMessage({type:t,out:r});break}case"create":{let{model:e,options:r}=i;nv(e,r).then(e=>{postMessage({type:t,out:e})},e=>{postMessage({type:t,err:e})});break}case"release":nw(i),postMessage({type:t});break;case"run":{let{sessionId:e,inputIndices:r,inputs:a,outputIndices:s,options:n}=i;nk(e,r,a,s,Array(s.length).fill(null),n).then(e=>{e.some(e=>"cpu"!==e[3])?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:e},nI([...a,...e]))},e=>{postMessage({type:t,err:e})});break}case"end-profiling":nS(i),postMessage({type:t})}}catch(e){postMessage({type:t,err:e})}}),ep=ed?null:e=>new Worker(e??ef,{type:"module",name:"ort-wasm-proxy-worker"})}),si=q(()=>{"use strict";eu(),eh=typeof location>"u"?void 0:location.origin,ec=import.meta.url>"file:"&&import.meta.url<"file;",ef=(()=>{if(ec){let e=URL;return new URL(new e("ort.min.mjs",import.meta.url).href,eh).href}return import.meta.url})(),em=()=>{if(ef&&!ef.startsWith("blob:"))return ef.substring(0,ef.lastIndexOf("/")+1)},eg=(e,t)=>{try{let i=t??ef;return(i?new URL(e,i):new URL(e)).origin===eh}catch{return!1}},e_=async e=>{let t=await (await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},ey=(st(),L(el)).default,e$=async()=>{if(!ef)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(eg(ef))return[void 0,ey()];let e=await e_(ef);return[e,ey(e)]},eb=void 0,ev=async(e,t,i,r)=>{let a=eb&&!(e||t);if(a)if(ef)a=eg(ef)||r&&!i;else if(r&&!i)a=!0;else throw Error("cannot determine the script source URL.");if(a)return[void 0,eb];{let r,a,s="ort-wasm-simd-threaded.jsep.mjs",n=e??((e,t)=>{let i=t??ef;try{return(i?new URL(e,i):new URL(e)).href}catch{return}})(s,t),o=i&&n&&!eg(n,t),u=o?await e_(n):n??(r=s,a=t,`${a??"./"}${r}`);return[o?u:void 0,await (async e=>(await import(e)).default)(u)]}}}),sr=q(()=>{"use strict";si(),ex=!1,ek=!1,eS=!1,eI=async e=>{if(ex)return Promise.resolve();if(ek)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(eS)throw Error("previous call to 'initializeWebAssembly()' failed.");ek=!0;let t=e.initTimeout,i=e.numThreads;if(!1!==e.simd){if("relaxed"===e.simd){if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}})())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}})())throw Error("WebAssembly SIMD is not supported in the current environment.")}let r=(()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}})();i>1&&!r&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=i=1);let a=e.wasmPaths,s="string"==typeof a?a:void 0,n=a?.mjs,o=n?.href??n,u=a?.wasm,l=u?.href??u,d=e.wasmBinary,[p,h]=await ev(o,s,i>1,!!d||!!l),c=!1,f=[];if(t>0&&f.push(new Promise(e=>{setTimeout(()=>{c=!0,e()},t)})),f.push(new Promise((e,t)=>{let r={numThreads:i};if(d)r.wasmBinary=d,r.locateFile=e=>e;else if(l||s)r.locateFile=e=>l??s+e;else if(o&&0!==o.indexOf("blob:"))r.locateFile=e=>new URL(e,o).href;else if(p){let e=em();e&&(r.locateFile=t=>e+t)}h(r).then(t=>{ek=!1,ex=!0,ew=t,e(),p&&URL.revokeObjectURL(p)},e=>{ek=!1,eS=!0,t(e)})})),await Promise.race(f),c)throw Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},eT=()=>{if(ex&&ew)return ew;throw Error("WebAssembly is not initialized yet.")}}),sa=q(()=>{"use strict";sr(),ez=(e,t)=>{let i=eT(),r=i.lengthBytesUTF8(e)+1,a=i._malloc(r);return i.stringToUTF8(e,a,r),t.push(a),a},eE=(e,t,i,r)=>{if("object"==typeof e&&null!==e){if(i.has(e))throw Error("Circular reference in options");i.add(e)}Object.entries(e).forEach(([e,a])=>{let s=t?t+e:e;if("object"==typeof a)eE(a,s+".",i,r);else if("string"==typeof a||"number"==typeof a)r(s,a.toString());else if("boolean"==typeof a)r(s,a?"1":"0");else throw Error(`Can't handle extra config type: ${typeof a}`)})},eC=e=>{let t=eT(),i=t.stackSave();try{let i=t.PTR_SIZE,r=t.stackAlloc(2*i);t._OrtGetLastError(r,r+i);let a=Number(t.getValue(r,4===i?"i32":"i64")),s=t.getValue(r+i,"*"),n=s?t.UTF8ToString(s):"";throw Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${n}`)}finally{t.stackRestore(i)}}}),ss=q(()=>{"use strict";sr(),sa(),eO=e=>{let t=eT(),i=0,r=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if("number"!=typeof e.logSeverityLevel||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if("number"!=typeof e.logVerbosityLevel||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let s=0;return e?.tag!==void 0&&(s=ez(e.tag,r)),i=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,s),0===i&&eC("Can't create run options."),e?.extra!==void 0&&eE(e.extra,"",new WeakSet,(e,a)=>{let s=ez(e,r),n=ez(a,r);0!==t._OrtAddRunConfigEntry(i,s,n)&&eC(`Can't set a run config entry: ${e} - ${a}.`)}),[i,r]}catch(e){throw 0!==i&&t._OrtReleaseRunOptions(i),r.forEach(e=>t._free(e)),e}}}),sn=q(()=>{"use strict";sr(),sa(),eB=(e,t,i,r)=>{let a=ez(t,r),s=ez(i,r);0!==eT()._OrtAddSessionConfigEntry(e,a,s)&&eC(`Can't set a session config entry: ${t} - ${i}.`)},eA=async e=>{var t;let i,r=eT(),a=0,s=[],n=e||{};(t=n).extra||(t.extra={}),t.extra.session||(t.extra.session={}),(i=t.extra.session).use_ort_model_bytes_directly||(i.use_ort_model_bytes_directly="1"),t.executionProviders&&t.executionProviders.some(e=>("string"==typeof e?e:e.name)==="webgpu")&&(t.enableMemPattern=!1);try{let e=(e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}})(n.graphOptimizationLevel??"all"),t=(e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${e}`)}})(n.executionMode??"sequential"),i="string"==typeof n.logId?ez(n.logId,s):0,o=n.logSeverityLevel??2;if(!Number.isInteger(o)||o<0||o>4)throw Error(`log severity level is not valid: ${o}`);let u=n.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log verbosity level is not valid: ${u}`);let l="string"==typeof n.optimizedModelFilePath?ez(n.optimizedModelFilePath,s):0;if(a=r._OrtCreateSessionOptions(e,!!n.enableCpuMemArena,!!n.enableMemPattern,t,!!n.enableProfiling,0,i,o,u,l),0===a&&eC("Can't create session options."),n.executionProviders&&await (async(e,t,i)=>{for(let r of t.executionProviders){let t="string"==typeof r?r:r.name,a=[];switch(t){case"webnn":if(t="WEBNN","string"!=typeof r){let t=r?.deviceType;t&&eB(e,"deviceType",t,i)}break;case"webgpu":if(t="JS","string"!=typeof r&&r?.preferredLayout){if("NCHW"!==r.preferredLayout&&"NHWC"!==r.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${r.preferredLayout}`);eB(e,"preferredLayout",r.preferredLayout,i)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${t}`)}let s=ez(t,i),n=a.length,o=0,u=0;if(n>0){o=eT()._malloc(n*eT().PTR_SIZE),i.push(o),u=eT()._malloc(n*eT().PTR_SIZE),i.push(u);for(let e=0;e<n;e++)eT().setValue(o+e*eT().PTR_SIZE,a[e][0],"*"),eT().setValue(u+e*eT().PTR_SIZE,a[e][1],"*")}await eT()._OrtAppendExecutionProvider(e,s,o,u,n)!==0&&eC(`Can't append execution provider: ${t}.`)}})(a,n,s),void 0!==n.enableGraphCapture){if("boolean"!=typeof n.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);eB(a,"enableGraphCapture",n.enableGraphCapture.toString(),s)}if(n.freeDimensionOverrides)for(let[e,t]of Object.entries(n.freeDimensionOverrides)){if("string"!=typeof e)throw Error(`free dimension override name must be a string: ${e}`);if("number"!=typeof t||!Number.isInteger(t)||t<0)throw Error(`free dimension override value must be a non-negative integer: ${t}`);let i=ez(e,s);0!==r._OrtAddFreeDimensionOverride(a,i,t)&&eC(`Can't set a free dimension override: ${e} - ${t}.`)}return void 0!==n.extra&&eE(n.extra,"",new WeakSet,(e,t)=>{eB(a,e,t,s)}),[a,s]}catch(e){throw 0!==a&&0!==r._OrtReleaseSessionOptions(a)&&eC("Can't release session options."),s.forEach(e=>r._free(e)),e}}}),so=q(()=>{"use strict";eR=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${e}`)}},eD=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${e}`)}},eM=(e,t)=>{let i=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r="number"==typeof t?t:t.reduce((e,t)=>e*t,1);return i>0?Math.ceil(r*i):void 0},eU=e=>{switch(e){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},eP=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${e}`)}},eq=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,eN=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint64"===e||"int8"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,eL=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${e}`)}}}),su=q(()=>{"use strict";eu(),eV=async e=>{if("string"!=typeof e)return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e);{let t=await fetch(e);if(!t.ok)throw Error(`failed to load external data file: ${e}`);let i=t.headers.get("Content-Length"),r=i?parseInt(i,10):0;if(r<0x40000000)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw Error(`failed to load external data file: ${e}, no response body.`);let i=t.body.getReader(),a;try{a=new ArrayBuffer(r)}catch(e){if(e instanceof RangeError){let e=Math.ceil(r/65536);a=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let s=0;for(;;){let{done:e,value:t}=await i.read();if(e)break;let r=t.byteLength;new Uint8Array(a,s,r).set(t),s+=r}return new Uint8Array(a,0,r)}}}}),sl=q(()=>{"use strict";so(),eG=["V","I","W","E","F"],eF=(e,t)=>{eW=e,eH=t},eK=(...e)=>{eH&&((e,t)=>{var i,r;let a=eP(e);a>=eP(eW)&&(i=a,r="function"==typeof t?t():t,console.log(`[${eG[i]},${new Date().toISOString()}]${r}`))})(...e)}}),sd=q(()=>{"use strict";ej=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},eZ=class{static calcShape(e,t,i=!1){let r=e.length,a=t.length;if(0===r)return t;if(0===a)return e;let s=Math.max(e.length,t.length),n=Array(s);if(i){if(r<2||a<2)return;let i=ej.calcMatMulShape([e[r-2],e[r-1]],[t[a-2],t[a-1]]);if(void 0===i)return;[n[s-2],n[s-1]]=i}for(let o=i?3:1;o<=s;o++){let i=r-o<0?1:e[r-o],u=a-o<0?1:t[a-o];if(i!==u&&i>1&&u>1)return;let l=Math.max(i,u);if(i&&u)n[s-o]=Math.max(i,u);else{if(l>1)return;n[s-o]=0}}return n}static isValidBroadcast(e,t){let i=e.length,r=t.length;if(i>r)return!1;for(let a=1;a<=i;a++)if(1!==e[i-a]&&e[i-a]!==t[r-a])return!1;return!0}},eQ=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(e,t=4){let i=e.length;if(0===i)return[];let r=Array(i),a=i-1;for(;a>=0;){if(e[a]%t==0){r[a]=e[a]/t;break}if(t%e[a]!=0)throw Error("cannot convert shape");r[a]=1,t/=e[a],a--}for(a--;a>=0;a--)r[a]=e[a];return r}static sizeFromDimension(t,i){if(i<0||i>t.length)throw Error(`invalid dimension of ${i} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,i,t.length)}static sizeToDimension(t,i){if(i<0||i>t.length)throw Error(`invalid dimension of ${i} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,i)}static getSizeFromDimensionRange(e,t,i){let r=1;for(let a=t;a<i;a++){if(e[a]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");r*=Number(e[a])}return r}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let i=Array(t);i[t-1]=1,i[t-2]=e[t-1];for(let r=t-3;r>=0;--r)i[r]=i[r+1]*e[r+1];return i}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(i=>this.normalizeAxis(i,t??e.length))}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let i=e.length;return e.map((e,r)=>e+t[r]+t[r+i])}static areEqual(e,t){return e.length===t.length&&e.every((e,i)=>e===t[i])}},eX=class e{static adjustPoolAttributes(e,t,i,r,a,s){if(!e&&i.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=i.length?i.push(t[e+2]):i[e]=t[e+2];for(let e=0;e<i.length;e++)if(e<r.length){if(r[e]<0)throw Error("strides should be greater than or equal to 1")}else r.push(1);for(let e=0;e<i.length;e++)if(e<a.length){if(a[e]<0)throw Error("dilations should be greater than or equal to 1")}else a.push(1);for(let e=0;e<2*i.length;e++)if(e<s.length){if(s[e]<0)throw Error("pad should be greater than or equal to 1")}else s.push(0);for(let e=0;e<i.length;e++){if(i[e]<=0)throw Error("kernel shapes need to be greater than 0");if(s[e]>=i[e]||s[e+i.length]>=i[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,i,r,a,s,n,o){if(o){if(s.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(i.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+(n?1:2)],i[u],r[u],a[u],s,u,u+t.length-2,o)}}static computePoolOutputShape(t,i,r,a,s,n,o){if(i.length<=0)throw Error("input shape must be of size greater than 0");let u=[i[0],i[1]];return e.computeShapeHelper(t,i,u,r,a,s,n,o),u}static computeConvOutputShape(t,i,r,a,s,n,o){if(t.length<=0||i.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],i[0]];return e.computeShapeHelper(!1,t,u,r,a,s,n,o),u}static computeShapeHelper(t,i,r,a,s,n,o,u){if(t)for(let e=0;e<i.length-2;e++)r.push(1);else for(let t=0;t<i.length-2;t++)r.push(e.adjustPadAndReturnShape(i[t+2],a[t],s[t],n[t],o,t,t+i.length-2,u))}static adjustPadAndReturnShape(e,t,i,r,a,s,n,o){let u=i*(r-1)+1;if(!o||"NOTSET"===o)return Math.floor((e+a[s]+a[n]-u)/t+1);switch(o){case"VALID":return a[s]=0,a[n]=0,Math.floor((e-u)/t+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==i)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let i=((e+t-1)/t-1)*t+r-e;return a[s]=Math.floor("SAME_LOWER"===o?(i+1)/2:i/2),a[n]=i-a[s],Math.floor((e+i-r)/t+1)}default:throw Error("Unsupported AutoPad type")}}},eY=class{static getShapeOfGemmResult(e,t,i,r,a){let s,n,o;if(2!==e.length||2!==i.length)throw Error("shape need to be of size 2");t?(s=e[1],n=e[0]):(s=e[0],n=e[1]);let u=-1;if(r?(o=i[0],u=1):(o=i[1],u=0),i[u]!==n)throw Error("dimension mismatch");if(s<=0||o<=0||n<=0)throw Error("invalid shape specified");if(a&&!eZ.isValidBroadcast(a,[s,o]))throw Error("gemm: invalid bias shape for broadcast");return[s,o,n]}},eJ=-34028234663852886e22,e0=34028234663852886e22}),sp=q(()=>{"use strict";so(),e1=(e,t)=>new(eU(t))(e)}),sh=q(()=>{"use strict";so(),sl(),e2=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),e3=(e,t)=>{if("int32"===t)return e;let i=e2.get(t);if(!i)throw Error(`WebNN backend does not support data type: ${t}`);let r=i/8;if(e.byteLength%r!=0)throw Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let a=e.byteLength/r,s=new(eU(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let e=new Int32Array(a);for(let t=0;t<a;t++){let i=s[t];if(i>2147483647n||i<-2147483648n)throw Error("Can not convert int64 data to int32 - value out of range.");e[t]=Number(i)}return new Uint8Array(e.buffer)}case"int8":case"uint8":case"uint32":if("uint32"===t&&s.some(e=>e>0x7fffffff))throw Error("Can not convert uint32 data to int32 - value out of range.");return new Uint8Array(Int32Array.from(s,Number).buffer);default:throw Error(`Unsupported data conversion from ${t} to 'int32'`)}},e4=(e,t)=>{if("int32"===t)return e;if(e.byteLength%4!=0)throw Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let i=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,i);switch(t){case"int64":return new Uint8Array(BigInt64Array.from(r,BigInt).buffer);case"uint64":if(r.some(e=>e<0))throw Error("Can not convert int32 data to uin64 - negative value found.");return new Uint8Array(BigUint64Array.from(r,BigInt).buffer);case"int8":if(r.some(e=>e<-128||e>127))throw Error("Can not convert int32 data to int8 - value out of range.");return new Uint8Array(Int8Array.from(r,Number).buffer);case"uint8":if(r.some(e=>e<0||e>255))throw Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number);case"uint32":if(r.some(e=>e<0))throw Error("Can not convert int32 data to uint32 - negative value found.");return new Uint8Array(Uint32Array.from(r,Number).buffer);default:throw Error(`Unsupported data conversion from 'int32' to ${t}`)}},e6=1,e8=()=>e6++,e5=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),e7=(e,t)=>{let i=e2.get(e);if(!i)throw Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((e,t)=>e*t)*i/8):0},e9=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:i,tensor:r,dataType:a,shape:s,fallbackDataType:n}=e;this.sessionId=t,this.mlContext=i,this.mlTensor=r,this.dataType=a,this.tensorShape=s,this.fallbackDataType=n}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return e7(this.dataType,this.tensorShape)}destroy(){eK("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(!this.fallbackDataType)return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor);{let t=e4(new Uint8Array(await this.mlContext.readTensor(this.mlTensor)),this.dataType);return e?void(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(t):t.buffer}}canReuseTensor(e,t,i){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===i.length&&this.tensorShape.every((e,t)=>e===i[t])}setIsDataConverted(e){this.isDataConverted=e}},te=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,i,r){let a=this.tensorManager.getMLContext(e),s=this.tensorManager.getMLOpSupportLimits(e),n;if(!s?.input.dataTypes.includes(t)){if(!(n=e5.get(t))||s?.input.dataTypes.includes(n))throw Error(`WebNN backend does not support data type: ${t}`);eK("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${n}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,i))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==e7(t,i))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,i,o,!0,!0,n),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if("int32"===this.wrapper.fallbackType)t=e3(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength)return void this.wrapper.write(t);eK("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?e4(this.activeUpload,this.wrapper?.type):this.activeUpload;return e?void(e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t)):t.buffer}if(!this.wrapper)throw Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},tt=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=e8();return this.tensorTrackersById.set(e,new te(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,i,r,a){eK("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${i}, shape: ${r}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(t);if(!s)throw Error("Tensor not found.");return s.ensureTensor(e,i,r,a)}upload(e,t){let i=this.tensorTrackersById.get(e);if(!i)throw Error("Tensor not found.");i.upload(t)}async download(e,t){eK("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let i=this.tensorTrackersById.get(e);if(!i)throw Error("Tensor not found.");return i.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,i,r){let a=this.getMLContext(e),s=e8(),n=new e9({sessionId:e,context:a,tensor:t,dataType:i,shape:r});return this.tensorTrackersById.set(s,new te(this,n)),this.externalTensors.add(n),s}async getCachedTensor(e,t,i,r,a,s,n){let o=this.getMLContext(e);for(let[r,a]of this.freeTensors.entries())if(a.canReuseTensor(o,t,i)){eK("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${n?`fallbackDataType: ${n},`:""} shape: ${i}`);let a=this.freeTensors.splice(r,1)[0];return a.sessionId=e,a}eK("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${n?`fallbackDataType: ${n},`:""} shape: ${i}}`);let u=await o.createTensor({dataType:n??t,shape:i,dimensions:i,usage:r,writable:a,readable:s});return new e9({sessionId:e,context:o,tensor:u,dataType:t,shape:i,fallbackDataType:n})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},ti=(...e)=>new tt(...e)}),sc=q(()=>{"use strict";so(),sr(),sp(),sh(),sl(),tr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),ta=class{constructor(e){this.tensorManager=ti(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,eF(e.logLevel,!!e.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(e){eK("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){eK("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let e of t)eK("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(t=>t.gpuDevice===e);if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:t}),t}}if(void 0===e){let e=this.mlContextCache.findIndex(e=>void 0===e.options&&void 0===e.gpuDevice);if(-1!==e)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let t=this.mlContextCache.findIndex(t=>((e,t)=>{if(e===t)return!0;if(void 0===e||void 0===t)return!1;let i=Object.keys(e).sort(),r=Object.keys(t).sort();return i.length===r.length&&i.every((i,a)=>i===r[a]&&e[i]===t[i])})(t.options,e));if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let i=this.sessionIdsByMLContext.get(t);i||(i=new Set,this.sessionIdsByMLContext.set(t,i)),i.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let i=this.sessionIdsByMLContext.get(t);if(i.delete(e),0===i.size){this.sessionIdsByMLContext.delete(t);let e=this.mlContextCache.findIndex(e=>e.mlContext===t);-1!==e&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){eK("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,i,r,a){let s=tr.get(i);if(!s)throw Error(`Unsupported ONNX data type: ${i}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,r,a)}async createTemporaryTensor(e,t,i){eK("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${i}}`);let r=tr.get(t);if(!r)throw Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,r,i,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!eT().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");eK("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let i=await this.tensorManager.download(e);return e1(i,t)}}registerMLTensor(e,t,i,r){let a=tr.get(i);if(!a)throw Error(`Unsupported ONNX data type: ${i}`);let s=this.tensorManager.registerTensor(e,t,a,r);return eK("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${r}} -> {tensorId: ${s}}`),s}registerMLConstant(e,t,i,r,a,s,n=!1){if(!s)throw Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let u=s.get(o);if(!u)throw Error(`File with name ${o} not found in preloaded files.`);if(t+i>u.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let l=u.slice(t,t+i).buffer,d;switch(a.dataType){case"float32":d=new Float32Array(l);break;case"float16":d="u">typeof Float16Array&&Float16Array.from?new Float16Array(l):new Uint16Array(l);break;case"int32":d=new Int32Array(l);break;case"uint32":d=new Uint32Array(l);break;case"int64":n?(d=new Int32Array(e3(new Uint8Array(l),"int64").buffer),a.dataType="int32"):d=new BigInt64Array(l);break;case"uint64":d=new BigUint64Array(l);break;case"int8":d=new Int8Array(l);break;case"int4":case"uint4":case"uint8":d=new Uint8Array(l);break;default:throw Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return eK("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${n?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),r.constant(a,d)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let i=this.sessionGraphInputs.get(e);return!!i&&i.includes(t)}isGraphOutput(e,t){let i=this.sessionGraphOutputs.get(e);return!!i&&i.includes(t)}isGraphInputOutputTypeSupported(e,t,i=!0){let r=tr.get(eR(t)),a=this.mlOpSupportLimitsBySessionId.get(e);return!(typeof r>"u")&&(i?!!a?.input.dataTypes.includes(r):!!a?.output.dataTypes.includes(r))}flush(){}}}),sf=q(()=>{}),sm=q(()=>{"use strict";sl(),sf(),ts=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),tn=[],to=e=>16*Math.ceil(Number(e)/16),tu=1,tl=()=>tu++,td=async(e,t,i,r)=>{let a=to(i),s=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let n=e.getCommandEncoder();e.endComputePass(),n.copyBufferToBuffer(t,0,s,0,a),e.flush(),await s.mapAsync(GPUMapMode.READ);let o=s.getMappedRange();if(!r)return new Uint8Array(o.slice(0,i));{let e=r();return e.set(new Uint8Array(o,0,i)),e}}finally{s.destroy()}},tp=class{constructor(e){for(let[t]of(this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,ts))tn.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let i=t.buffer,r=t.byteOffset,a=t.byteLength,s=to(a),n=this.storageCache.get(e);if(!n)throw Error("gpu data for uploading does not exist");if(Number(n.originalSize)!==a)throw Error(`inconsistent data size. gpu data size=${n.originalSize}, data size=${a}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(o.getMappedRange()).set(new Uint8Array(i,r,a)),o.unmap();let u=this.backend.device.createCommandEncoder();u.copyBufferToBuffer(o,0,n.gpuData.buffer,0,s),this.backend.device.queue.submit([u.finish()]),o.destroy(),eK("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let i=this.storageCache.get(e);if(!i)throw Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw Error("destination gpu data for memcpy does not exist");if(i.originalSize!==r.originalSize)throw Error("inconsistent source and destination gpu data size");let a=to(i.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(i.gpuData.buffer,0,r.gpuData.buffer,0,a)}registerExternalBuffer(e,t,i){let r;if(i){if(r=i[0],e===i[1])return eK("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=tl();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),eK("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){void 0!==e&&(this.storageCache.delete(e),eK("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let i=(e=>{for(let t=0;t<tn.length;t++){let i=tn[t];if(e<=i)return i}return 16*Math.ceil(e/16)})(e),r,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let e=(a?this.freeBuffers:this.freeUniformBuffers).get(i);r=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:i,usage:t})}else r=this.backend.device.createBuffer({size:i,usage:t});let n={id:tl(),type:0,buffer:r};return this.storageCache.set(n.id,{gpuData:n,originalSize:Number(e)}),eK("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${n.id}`),n}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t="bigint"==typeof e?Number(e):e,i=this.storageCache.get(t);if(!i){if(0===this.storageCache.size)return 0;throw Error("releasing data does not exist")}return eK("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${i.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(i.gpuData.buffer),i.originalSize}async download(e,t){let i=this.storageCache.get(Number(e));if(!i)throw Error("data does not exist");await td(this.backend,i.gpuData.buffer,i.originalSize,t)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let e of this.buffersPending){let t=ts.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let i=this.freeBuffers.get(e.size)||[];void 0===t||i.length>=t?e.destroy():i.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let i=this.freeUniformBuffers.get(e.size)||[];void 0===t||i.length>=t?e.destroy():i.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let t of(e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e)),this.buffersPending))e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,0===this.sessionCount&&(eK("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},th=(...e)=>new tp(...e)}),sg=q(()=>{"use strict";tc=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},tf=e=>new tc(e)}),s_=q(()=>{"use strict";so(),sd(),tm=64,tg=(e,t)=>{if(3===t)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==t)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${e}`)}},t_=(e,t=1)=>{let i=tg(e,t);return"string"==typeof i?i:i[0]},ty=(e,t=1)=>{let i=tg(e,t);return"string"==typeof i?i:i[1]},t$=(...e)=>{let t=[];return e.forEach(e=>{0!==e.length&&t.push({type:12,data:e},{type:12,data:eQ.computeStrides(e)})}),t},tb=e=>e%4==0?4:e%2==0?2:1,tv=(e="f32",t,i="0")=>t&&1!==t?`vec${t}<${e}>(${i})`:`${e}(${i})`,tw=(e,t,i)=>"f32"===e?i:1===t?`f32(${i})`:`vec${t}<f32>(${i})`,tx=(e,t)=>4===t?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:2===t?`(${e}.x + ${e}.y)`:3===t?`(${e}.x + ${e}.y + ${e}.z)`:e,tk=(e,t,i,r)=>e.startsWith("uniforms.")&&i>4?"string"==typeof t?"f16"===r?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:"f16"===r?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:i>1?`${e}[${t}]`:e,tS=(e,t,i,r,a)=>{let s,n,o,u,l="number"==typeof i,d=l?i:i.length,p=[...Array(d).keys()],h=d<2?"u32":d<=4?`vec${d}<u32>`:`array<u32, ${d}>`,c=tg(t,a),f="string"==typeof c?c:c[1],m={indices:h,value:f,storage:"string"==typeof c?c:c[0],tensor:t},g=e=>"string"==typeof e?e:`${e}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},y=l?"uniforms.":"",$=`${y}${e}_shape`,b=`${y}${e}_strides`,v="";for(let e=0;e<d-1;e++)v+=`
    let dim${e} = current / ${tk(b,e,d)};
    let rest${e} = current % ${tk(b,e,d)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;v+=`indices[${d-1}] = current;`;let w=d<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${v}
    return indices;
  }`,x=[];if(d>=2)for(let e=d-1;e>=0;e--)x.push(`${tk(b,e,d)} * (indices[${e}])`);let k=d<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${x.join("+")};
  }`,S=(...e)=>0===d?"0u":`${m.indices}(${e.map(g).join(",")})`,I=(e,t)=>d<2?`${e}`:`${tk(e,t,d)}`,T={},z=(t,i)=>(()=>{if(m.storage===m.value)return`${e}[${t}]=${i};`;if("vec2<u32>"===m.storage&&"i32"===m.value)return`${e}[${t}]=vec2<u32>(u32(${i}), select(0u, 0xFFFFFFFFu, ${i} < 0));`;if("vec2<u32>"===m.storage&&"u32"===m.value)return`${e}[${t}]=vec2<u32>(u32(${i}), 0u);`;if("u32"===m.storage&&"vec4<bool>"===m.value)return`${e}[${t}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${i}));`;throw Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),E=t=>(()=>{if(m.storage===m.value)return`${e}[${t}]`;if("vec2<u32>"===m.storage&&"i32"===m.value)return`i32(${e}[${t}].x)`;if("vec2<u32>"===m.storage&&"u32"===m.value)return`u32(${e}[${t}].x)`;if("u32"===m.storage&&"vec4<bool>"===m.value)return`vec4<bool>(bool(${e}[${t}] & 0xFFu), bool(${e}[${t}] & 0xFF00u), bool(${e}[${t}] & 0xFF0000u), bool(${e}[${t}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),C=d<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${f} {
    return ${E(`i2o_${e}(indices)`)};
  }`,O=d<2?"":(s=p.map(e=>`d${e}: u32`).join(", "),n=p.map(e=>`d${e}`).join(", "),`
  fn get_${e}(${s}) -> ${f} {
    return get_${e}ByIndices(${S(n)});
  }`),B=d<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${f}) {
    ${z(`i2o_${e}(indices)`,"value")}
  }`,A=d<2?"":(o=p.map(e=>`d${e}: u32`).join(", "),u=p.map(e=>`d${e}`).join(", "),`
  fn set_${e}(${o}, value: ${f}) {
    set_${e}ByIndices(${S(u)}, value);
  }`);return{impl:()=>{let e=[],t=!1;return _.offsetToIndices&&(e.push(w),t=!0),_.indicesToOffset&&(e.push(k),t=!0),_.broadcastedIndicesToOffset&&(Object.values(T).forEach(t=>e.push(t)),t=!0),_.set&&(e.push(A),t=!0),_.setByIndices&&(e.push(B),t=!0),_.get&&(e.push(O),t=!0),_.getByIndices&&(e.push(C),t=!0),!l&&t&&e.unshift(`const ${$} = ${m.indices}(${i.join(",")});`,`const ${b} = ${m.indices}(${eQ.computeStrides(i).join(",")});`),e.join(`
`)},type:m,offsetToIndices:t=>(_.offsetToIndices=!0,d<2?t:`o2i_${e}(${t})`),indicesToOffset:t=>(_.indicesToOffset=!0,d<2?t:`i2o_${e}(${t})`),broadcastedIndicesToOffset:(t,i)=>{_.broadcastedIndicesToOffset=!0;let r=`${i.name}broadcastedIndicesTo${e}Offset`;if(r in T)return`${r}(${t})`;let a=[];for(let e=d-1;e>=0;e--){let t=i.indicesGet("outputIndices",e+i.rank-d);a.push(`${I(b,e)} * (${t} % ${I($,e)})`)}return T[r]=`fn ${r}(outputIndices: ${i.type.indices}) -> u32 {
             return ${a.length>0?a.join("+"):"0u"};
           }`,`${r}(${t})`},indices:S,indicesGet:I,indicesSet:(e,t,i)=>d<2?`${e}=${i};`:`${tk(e,t,d)}=${i};`,set:(...t)=>{if(t.length!==d+1)throw Error(`indices length must be ${d}`);let i=t[d];if("string"!=typeof i)throw Error("value must be string");let r=t.slice(0,d).map(g).join(",");return 0===d?z("0u",i):1===d?z(r[0],i):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${r}, ${i})`)},setByOffset:z,setByIndices:(t,i)=>d<2?z(t,i):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${t}, ${i});`),get:(...t)=>{if(t.length!==d)throw Error(`indices length must be ${d}`);let i=t.map(g).join(",");return 0===d?E("0u"):1===d?E(i[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${i})`)},getByOffset:E,getByIndices:t=>d<2?E(t):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${t})`),usage:r,name:e,strides:b,shape:$,rank:d}},tI=(e,t,i,r=1)=>tS(e,t,i,"input",r),tT=(e,t,i,r=1)=>tS(e,t,i,"output",r),tz=(e,t,i)=>tS(e,t,i,"atomicOutput",1),tE=(e,t,i,r=1)=>tS(e,t,i,"internal",r),tC=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${"number"==typeof e?`${e}u`:e}) { return; }`}mainStart(e=tm){let t="number"==typeof e?e:e[0],i="number"==typeof e?1:e[1],r="number"==typeof e?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||i>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${t}, ${i}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*i*r>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${t}, ${i}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
  `}appendVariableUniforms(e){0!==e.rank&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if("internal"===e.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let i="input"===e.usage?"read":"read_write",r="atomicOutput"===e.usage?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${i}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(e=>this.declareVariable(e,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if("internal"!==e.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(e,t,i=1){return this.uniforms.push({name:e,type:t,length:i}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let e=[];for(let{name:t,type:i,length:r}of this.uniforms)if(r&&r>4)"f16"===i?e.push(`@align(16) ${t}:array<mat2x4<${i}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${i}>, ${Math.ceil(r/4)}>`);else{let a=null==r||1===r?i:`vec${r}<${i}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(0!==this.uniforms.length)return this.uniforms.map(e=>[[12,10,1,6][["u32","f16","f32","i32"].indexOf(e.type)],e.length??1])}},tO=(e,t)=>new tC(e,t)}),sy=q(()=>{"use strict";so(),sd(),sg(),s_(),tB=(e,t)=>0!==t.length?t:[...Array(e).keys()].reverse(),tA=(e,t)=>{let i,r,a=e.dataType,s=e.dims.length,n=tB(s,t),o=(i=e.dims,r=n,eQ.sortBasedOnPerm(i,tB(i.length,r))),u=e.dims,l=o;if(s<2||((e,t)=>{let i=0;for(let r=0;r<e.length;++r)if(1!==t[e[r]]){if(e[r]<i)return!1;i=e[r]}return!0})(n,e.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=eQ.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64/4)},programUniforms:[{type:12,data:Math.ceil(t/4)}]}},getShaderSource:e=>{let t=tI("input",a,u,4),i=tT("output",a,l,4);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,i)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:d,newPerm:p}=((e,t)=>{let i=[],r=[];for(let a=0;a<e.length;++a)1!==e[a]&&i.push(e[a]),1!==e[t[a]]&&r.push(t[a]);return{newShape:i,newPerm:r}})(e.dims,n),h=eQ.areEqual(p,[2,3,1]),c=eQ.areEqual(p,[3,1,2]);return 2===d.length||h||c?(l=[(u=h?[d[0],d[1]*d[2]]:c?[d[0]*d[1],d[2]]:d)[1],u[0]],{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=eQ.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(l[1]/16),y:Math.ceil(l[0]/16)},programUniforms:[{type:12,data:t},...t$(u,l)]}},getShaderSource:e=>{let t=tI("a",a,u.length),i=tT("output",a,l.length);return`
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
  }`}}):{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let t=eQ.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:[{type:12,data:t},...t$(u,l)]}},getShaderSource:e=>{let t=tI("a",a,u.length),i=tT("output",a,l.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,i)}

  ${((e,t,i,r)=>{let a=`fn perm(i: ${r.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`;for(let i=0;i<t;++i)a+=`a[${e[i]}]=i[${i}];`;return a+"return a;}"})(n,s,t,i)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${i.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${i.setByOffset("global_idx",t.getByIndices("aIndices"))}
  }`}}},tR=(e,t)=>{((e,t)=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if(0!==t.length&&t.length!==e[0].dims.length)throw Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)})(e.inputs,t.perm),e.compute(tA(e.inputs[0],t.perm))},tD=e=>tf({perm:e.perm})}),s$=q(()=>{"use strict";so(),sd(),s_(),sb(),sy(),tM={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},tU={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},tP={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},tq={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},tN=(e,t,i,r)=>{var a,s,n,o,u,l,d;let p,h,c,f,m,g,_,y=1===e.inputs.length?i:t0(e.inputs,i),$=y.axes;0!==$.length||y.noopWithEmptyAxes||($=e.inputs[0].dims.map((e,t)=>t));let b=eQ.normalizeAxes($,e.inputs[0].dims.length),v=b,w=e.inputs[0],x=((e,t)=>{let i=[];if(!((e,t)=>{for(let i=0;i<e.length;++i)if(e[e.length-i-1]!==t-1-i)return!1;return!0})(e,t)){for(let r=0;r<t;++r)-1===e.indexOf(r)&&i.push(r);e.forEach(e=>i.push(e))}return i})(v,e.inputs[0].dims.length);x.length>0&&(w=e.compute(tA(e.inputs[0],x),{inputs:[0],outputs:[-1]})[0],v=((e,t)=>{let i=[];for(let r=t-e;r<t;++r)i.push(r);return i})(v.length,w.dims.length));let[k,S]=((e,t)=>{let i=[],r=e.length;for(let a=0;a<r;a++)-1===t.indexOf(a)&&i.push(e[a]);return[i,t.map(t=>e[t])]})(w.dims,v),I=k;y.keepDims&&(I=((e,t)=>{let i=e.length+t.length,r=[],a=0;for(let s=0;s<i;s++)-1===t.indexOf(s)?r.push(e[a++]):r.push(1);return r})(k,b)),e.compute((a=t,s=y.cacheKey,n=[w],o=r,u=e.inputs[0].dataType,l=I,d=S,p=n[0].dims,h=eQ.size(l),c=eQ.size(d),f=tI("_A",n[0].dataType,p),m=tT("output",u,l),g=64,1===h&&(g=256),_=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,{name:a,shaderCache:{hint:`${s};${g}`,inputDependencies:["type"]},getShaderSource:e=>`
        ${e.registerUniform("reduceSize","u32").declareVariables(f,m)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${e.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${tP[o]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${tM[o]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${tU[o]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${m.setByOffset("outputIndex",`${"mean"===o?`${m.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${m.type.storage}(${tq[o]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:l,dataType:u}],dispatchGroup:{x:h},programUniforms:[{type:12,data:c}]})}),{inputs:[w]})},tL=(e,t)=>{tN(e,"ReduceMeanShared",t,"mean")},tV=(e,t)=>{tN(e,"ReduceL1Shared",t,"l1")},tG=(e,t)=>{tN(e,"ReduceL2Shared",t,"l2")},tW=(e,t)=>{tN(e,"ReduceLogSumExpShared",t,"logSumExp")},tH=(e,t)=>{tN(e,"ReduceMaxShared",t,"max")},tF=(e,t)=>{tN(e,"ReduceMinShared",t,"min")},tK=(e,t)=>{tN(e,"ReduceProdShared",t,"prod")},tj=(e,t)=>{tN(e,"ReduceSumShared",t,"sum")},tZ=(e,t)=>{tN(e,"ReduceSumSquareShared",t,"sumSquare")},tQ=(e,t)=>{tN(e,"ReduceLogSumShared",t,"logSum")}}),sb=q(()=>{"use strict";so(),sd(),sg(),s_(),s$(),tX=e=>{if(!e||0===e.length||e.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===e.length&&1!==e[1].dims.length)throw Error("Invalid axes input dims.")},tY=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],tJ=(e,t,i,r,a,s,n=!1,o=!1)=>{let u=[],l=i[0].dims,d=l.length,p=eQ.normalizeAxes(a,d),h=!o&&0===p.length;l.forEach((e,t)=>{h||p.indexOf(t)>=0?n&&u.push(1):u.push(e)});let c=u.length,f=eQ.size(u);return{name:e,shaderCache:t,getShaderSource:e=>{let t=[],a=tI("_A",i[0].dataType,d),o=tT("output",s,c),u=r(a,o,p),f=u[2];for(let e=0,i=0;e<d;e++)h||p.indexOf(e)>=0?(n&&i++,f=`for(var j${e}: u32 = 0; j${e} < ${l[e]}; j${e}++) {
                  ${u[2].includes("last_index")?`let last_index = j${e};`:""}
                  ${a.indicesSet("input_indices",e,`j${e}`)}
                  ${f}
                }`):(t.push(`${a.indicesSet("input_indices",e,o.indicesGet("output_indices",i))};`),i++);return`

        ${e.registerUniform("output_size","u32").declareVariables(a,o)}

        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${a.type.indices};
          let output_indices = ${o.offsetToIndices("global_idx")};

          ${t.join(`
`)}
          ${u[0]}       // init ops for reduce max/min
          ${u[1]}
          ${f}
          ${u[3]}
          ${4===u.length?o.setByOffset("global_idx","value"):u.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:s}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...t$(l,u)]})}},t0=(e,t)=>{let i=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>i.push(Number(e))),tf({axes:i,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},t1=(e,t,i,r)=>{let a=e.inputs,s=1===a.length?i:t0(a,i);e.compute(tJ(t,{hint:s.cacheKey,inputDependencies:["rank"]},[a[0]],s.noopWithEmptyAxes&&0===s.axes.length?tY:r,s.axes,a[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},t2=(e,t,i)=>{if(0===t.length)return i;let r=1,a=1;for(let i=0;i<t.length;i++)-1===t.indexOf(i)?r*=e[i]:a*=e[i];return a<32&&r>1024},t3=(e,t)=>{var i,r;t2(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(i=e,r=t,tX(i.inputs),t1(i,"ReduceMean",r,(e,t,r)=>{let a=1;for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&(a*=i.inputs[0].dims[t]);return["var sum = f32(0);","",`sum += f32(${e.getByIndices("input_indices")});`,`let value = ${t.type.value}(sum / ${a});`]})):tL(e,t)},t4=(e,t)=>{var i,r;t2(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(i=e,r=t,tX(i.inputs),t1(i,"ReduceL1",r,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += abs(${e.getByIndices("input_indices")});`,""])):tV(e,t)},t6=(e,t)=>{var i,r;t2(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(i=e,r=t,tX(i.inputs),t1(i,"ReduceL2",r,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])):tG(e,t)},t8=(e,t)=>{var i,r;t2(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(i=e,r=t,tX(i.inputs),t1(i,"ReduceLogSumExp",r,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += exp(${e.getByIndices("input_indices")});`,"value = log(value);"])):tW(e,t)},t5=(e,t)=>{var i,r;t2(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(i=e,r=t,tX(i.inputs),t1(i,"ReduceMax",r,(e,t,i)=>{let r=[];for(let t=0;t<e.rank;t++)(i.indexOf(t)>=0||0===i.length)&&r.push(e.indicesSet("input_indices",t,0));return[`${r.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = max(value, ${e.getByIndices("input_indices")});`,""]})):tH(e,t)},t7=(e,t)=>{var i,r;t2(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(i=e,r=t,tX(i.inputs),t1(i,"ReduceMin",r,(e,t,i)=>{let r=[];for(let t=0;t<e.rank;t++)(i.indexOf(t)>=0||0===i.length)&&r.push(`input_indices[${t}] = 0;`);return[`${r.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = min(value, ${e.getByIndices("input_indices")});`,""]})):tF(e,t)},t9=(e,t)=>{var i,r;t2(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(i=e,r=t,tX(i.inputs),t1(i,"ReduceProd",r,(e,t)=>[`var value = ${t.type.storage}(1);`,"",`value *= ${e.getByIndices("input_indices")};`,""])):tK(e,t)},ie=(e,t)=>{var i,r;t2(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(i=e,r=t,tX(i.inputs),t1(i,"ReduceSum",r,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,""])):tj(e,t)},it=(e,t)=>{var i,r;t2(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(i=e,r=t,tX(i.inputs),t1(i,"ReduceSumSquare",r,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += t * t;`,""])):tZ(e,t)},ii=(e,t)=>{var i,r;t2(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(i=e,r=t,tX(i.inputs),t1(i,"ReduceLogSum",r,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,"value = log(value);"])):tQ(e,t)}}),sv=q(()=>{"use strict";so(),sg(),sb(),ir=e=>{if(!e||0===e.length||e.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==e[0].dataType)throw Error("Invalid input type.")},ia=(e,t)=>{ir(e.inputs),e.compute(tJ("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,i,r)=>{let a=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&a.push(`input_indices[${t}] = 0;`);return[`${a.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]},[t.axis],7,t.keepDims),{inputs:[0]})},is=(e,t)=>{ir(e.inputs),e.compute(tJ("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,i,r)=>{let a=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&a.push(`input_indices[${t}] = 0;`);return[`${a.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]},[t.axis],7,t.keepDims),{inputs:[0]})},io=e=>tf(e)}),sw=q(()=>{"use strict";so(),sd(),sf(),s_(),iu=(e,t,i)=>t&&e?`
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
    `,il=(e,t,i,r,a,s,n,o,u,l,d,p)=>{var h,c,f,m,g,_,y,$,b,v,w,x,k,S,I,T,z,E,C,O,B,A,R,D,M;let U,P,q,N,L,V,G,W,H,F,K,j,Z,Q,X,Y,J,ee,et,ei,er,ea,es,en,eo,eu,el,ed,ep,eh,ec,ef,em,eg=Math.min(e.outputCount,1+ +!!n+ +!!o),e_=eg>1?l.pastSequenceLength:0,ey=e_+l.kvSequenceLength,e$=u&&eQ.size(u.dims)>0?u:void 0,eb=[t,i];eg>1&&n&&eQ.size(n.dims)>0&&eb.push(n),e$&&eb.push(e$),d&&eb.push(d),p&&eb.push(p);let ev=e.compute((h=eg,c=t,f=i,m=n,g=e$,_=l,y=e_,$=d,b=p,U=y+_.kvSequenceLength,P=[_.batchSize,_.numHeads,_.sequenceLength,U],q=h>1&&m,N=_.kvNumHeads?_.kvNumHeads:_.numHeads,L=q?[_.batchSize,N,U,_.headSize]:void 0,V=_.nReps?_.nReps:1,G=0===_.scale?1/Math.sqrt(_.headSize):_.scale,W=tb(_.headSize),H=_.headSize/W,F={x:Math.ceil(U/12),y:Math.ceil(_.sequenceLength/12),z:_.batchSize*_.numHeads},K=[{type:12,data:_.sequenceLength},{type:12,data:H},{type:12,data:U},{type:12,data:_.numHeads},{type:12,data:_.headSize},{type:1,data:G},{type:12,data:y},{type:12,data:_.kvSequenceLength},{type:12,data:V}],j=q&&m&&eQ.size(m.dims)>0,Z=["type","type"],j&&Z.push("type"),g&&Z.push("type"),$&&Z.push("type"),b&&Z.push("type"),Q=[{dims:P,dataType:c.dataType,gpuDataType:0}],q&&Q.push({dims:L,dataType:c.dataType,gpuDataType:0}),{name:"AttentionProbs",shaderCache:{hint:`${W};${void 0!==g};${void 0!==m};${h}`,inputDependencies:Z},getRunData:()=>({outputs:Q,dispatchGroup:F,programUniforms:K}),getShaderSource:e=>{let t=tI("q",c.dataType,c.dims,W),i=[t,tI("key",f.dataType,f.dims,W)];if(j){let e=tI("past_key",m.dataType,m.dims,W);i.push(e)}g&&i.push(tI("attention_bias",g.dataType,g.dims));let r=$?tI("seq_lens",$.dataType,$.dims):void 0;r&&i.push(r);let a=b?tI("total_sequence_length_input",b.dataType,b.dims):void 0;a&&i.push(a);let s=tT("output",c.dataType,P),n=[s];q&&n.push(tT("present_key",c.dataType,L,W));let o=ty(1,W);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${t.type.storage}, 144>;
  var<workgroup> tileK: array<${t.type.storage}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...i,...n)}
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
    ${iu(r,a,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${j&&q?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${q?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${o}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${j&&q?`
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
          value += ${o}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(W){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw Error(`Unsupported components: ${W}`)}})()};
        output[outputIdx] = ${s.type.value} (sum * uniforms.alpha) + ${g?"attention_bias[outputIdx]":"0.0"};
    }
  }`}}),{inputs:eb,outputs:eg>1?[-1,1]:[-1]})[0];e.compute((v=ev,w=l.batchSize,x=l.numHeads,k=e_,S=l.sequenceLength,I=ey,T=d,z=p,X=tb(T?1:I),Y=64,(J=I/X)<64&&(Y=32),ee=[{type:12,data:w},{type:12,data:x},{type:12,data:k},{type:12,data:S},{type:12,data:J},{type:12,data:Math.ceil(I/X/Y)}],et=t_(v.dataType,X),ei=ty(1,X),er=["type"],T&&er.push("type"),z&&er.push("type"),{name:"AttentionProbsSoftmax",shaderCache:{hint:`${Y};${et};${X}`,inputDependencies:er},getShaderSource:e=>{let t=tT("x",v.dataType,v.dims,X),i=[t],r=T?tI("seq_lens",T.dataType,T.dims):void 0;r&&i.push(r);let a=z?tI("total_sequence_length_input",z.dataType,z.dims):void 0;a&&i.push(a);let s=ty(v.dataType);return`
  var<workgroup> thread_max: array<f32, ${Y}>;
  var<workgroup> thread_sum: array<f32, ${Y}>;
  ${e.registerUniforms([{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}]).declareVariables(...i)}
  ${e.mainStart([Y,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${iu(r,a,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${Y}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${T?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${ei}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${ei}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(X){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw Error(`Unsupported components: ${X}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${Y}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${ei}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${ei}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(X){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw Error(`Unsupported components: ${X}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${Y}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${t.type.value}(${s}(1.0) / ${s}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${ei}(x[offset + i]);
        x[offset + i] = ${t.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${T?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${t.type.value}(${s}(0));
        }`:""};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:S,z:w*x},programUniforms:ee})}),{inputs:d&&p?[ev,d,p]:[ev],outputs:[]});let ew=[ev,r];eg>1&&o&&eQ.size(o.dims)>0&&ew.push(o),d&&ew.push(d),p&&ew.push(p),e.compute((E=eg,C=ev,O=r,B=o,A=l,R=e_,D=d,M=p,ea=R+A.kvSequenceLength,es=A.nReps?A.nReps:1,en=A.vHiddenSize*es,eo=E>1&&B,eu=A.kvNumHeads?A.kvNumHeads:A.numHeads,el=eo?[A.batchSize,eu,ea,A.headSize]:void 0,ed=[A.batchSize,A.sequenceLength,en],ep={x:Math.ceil(A.vHeadSize/12),y:Math.ceil(A.sequenceLength/12),z:A.batchSize*A.numHeads},eh=[{type:12,data:A.sequenceLength},{type:12,data:ea},{type:12,data:A.vHeadSize},{type:12,data:A.numHeads},{type:12,data:A.headSize},{type:12,data:en},{type:12,data:R},{type:12,data:A.kvSequenceLength},{type:12,data:es}],ec=eo&&B&&eQ.size(B.dims)>0,ef=["type","type"],ec&&ef.push("type"),D&&ef.push("type"),M&&ef.push("type"),em=[{dims:ed,dataType:C.dataType,gpuDataType:0}],eo&&em.push({dims:el,dataType:C.dataType,gpuDataType:0}),{name:"AttentionScore",shaderCache:{hint:`${void 0!==B};${E}`,inputDependencies:ef},getRunData:()=>({outputs:em,dispatchGroup:ep,programUniforms:eh}),getShaderSource:e=>{let t=tI("probs",C.dataType,C.dims),i=[t,tI("v",O.dataType,O.dims)];ec&&i.push(tI("past_value",B.dataType,B.dims));let r=D?tI("seq_lens",D.dataType,D.dims):void 0;D&&i.push(r);let a=M?tI("total_sequence_length_input",M.dataType,M.dims):void 0;M&&i.push(a);let s=[tT("output",C.dataType,ed)];return eo&&s.push(tT("present_value",C.dataType,el)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${t.type.value}, 144>;
  var<workgroup> tileV: array<${t.type.value}, 144>;
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
   ${iu(r,a,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${ec&&eo?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${eo?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${t.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${ec&&eo?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${eo?`
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
  }`}}),{inputs:ew,outputs:eg>1?[0,2]:[0]})},id=(e,t)=>{var i,r;let a,s,n,o,u,l,d,p=((e,t)=>{let i=e[0],r=e[1],a=e[2],s=e[3],n=e[4],o=e[5];if(n&&o)throw Error("Attention cannot have both past and attention_bias");if(3!==i.dims.length)throw Error('Input "input" must have 3 dimensions');let u=i.dims[0],l=i.dims[1],d=i.dims[2];if(1!==a.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==r.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==d)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==r.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=a.dims[0]/3,h=p,c=h;if(t.qkvHiddenSizes.length>0){if(3!==t.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let e of t.qkvHiddenSizes)if(e%t.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],c=t.qkvHiddenSizes[2]}if(p!==h)throw Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==p+h+c)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let f=0;if(n){if(h!==c)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==n.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==n.dims[0])throw Error('Input "past" first dimension must be 2');if(n.dims[1]!==u)throw Error('Input "past" second dimension must be batch_size');if(n.dims[2]!==t.numHeads)throw Error('Input "past" third dimension must be num_heads');if(n.dims[4]!==h/t.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(f=n.dims[3])}let m=l+f;if(s)throw Error("Mask not supported");if(n)throw Error("past is not supported");if(o){if(4!==o.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==u||o.dims[1]!==t.numHeads||o.dims[2]!==l||o.dims[3]!==m)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:f,kvSequenceLength:l,totalSequenceLength:m,maxSequenceLength:-1,inputHiddenSize:d,hiddenSize:p,vHiddenSize:c,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(c/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}})(e.inputs,t),[h,c,f]=(i=e,a=[(r=p).batchSize,r.numHeads,r.sequenceLength,r.headSize],s=r.sequenceLength,n=r.inputHiddenSize,o=r.headSize,u={x:Math.ceil(r.headSize/12),y:Math.ceil(r.sequenceLength/12),z:r.batchSize*r.numHeads},l=[i.inputs[0],i.inputs[1],i.inputs[2]],d=[{type:12,data:s},{type:12,data:n},{type:12,data:o},{type:12,data:r.numHeads},{type:12,data:r.headSize},{type:12,data:r.hiddenSize},{type:12,data:r.hiddenSize+r.hiddenSize+r.vHiddenSize}],i.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:i.inputs[0].dataType,gpuDataType:0},{dims:a,dataType:i.inputs[0].dataType,gpuDataType:0},{dims:a,dataType:i.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:d}),getShaderSource:e=>{let t=tT("output_q",l[0].dataType,a),i=tT("output_k",l[0].dataType,a),r=tT("output_v",l[0].dataType,a),s=tI("input",l[0].dataType,l[0].dims),n=tI("weight",l[1].dataType,l[1].dims),o=tI("bias",l[2].dataType,l[2].dims),u=s.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${u}, 144>;
  var<workgroup> tileWeightQ: array<${u}, 144>;
  var<workgroup> tileWeightK: array<${u}, 144>;
  var<workgroup> tileWeightV: array<${u}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}]).declareVariables(s,n,o,t,i,r)}
  ${e.mainStart([12,12,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${u}(0);
    var valueK = ${u}(0);
    var valueV = ${u}(0);
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
  }`}},{inputs:l,outputs:[-1,-1,-1]}));return il(e,h,c,f,e.inputs[4],void 0,void 0,void 0,e.inputs[5],p)}}),sx=q(()=>{"use strict";eo(),so(),sd(),sg(),s_(),ip=(e,t)=>{let i,{inputs:r,outputCount:a}=e,s=(i={...t,outputCount:a},tf(i));if(c.webgpu.validateInputContent&&((e,t)=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs");let i=(e,t,i)=>{let r=t.length;if(r!==e.length)throw Error(`${i}: num dimensions != ${r}`);t.forEach((t,r)=>{if(t!==e[r])throw Error(`${i}: dim[${r}] do not match`)})};if(e[0].dims.length>1){let r="NHWC"===t.format?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);i(e[1].dims,r,"Invalid input scale"),i(e[2].dims,r,"Invalid input B"),i(e[3].dims,r,"Invalid input mean"),i(e[4].dims,r,"Invalid input var")}else i(e[1].dims,[1],"Invalid input scale"),i(e[2].dims,[1],"Invalid input B"),i(e[3].dims,[1],"Invalid input mean"),i(e[4].dims,[1],"Invalid input var")})(r,s),t.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");e.compute(((e,t)=>{let{epsilon:i,spatial:r,format:a}=t,s=e[0].dims,n=r?tb(s[s.length-1]):1,o="NHWC"===a&&s.length>1?n:1,u=eQ.size(s)/n,l=r?s.length:s,d=tI("x",e[0].dataType,e[0].dims,n),p=tI("scale",e[1].dataType,e[1].dims,o),h=tI("bias",e[2].dataType,e[2].dims,o),c=tI("inputMean",e[3].dataType,e[3].dims,o),f=tI("inputVar",e[4].dataType,e[4].dims,o),m=tT("y",e[0].dataType,l,n);return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${n}`,inputDependencies:r?["rank","type","type","type","type"]:void 0},getShaderSource:e=>`
  const epsilon = ${i};
  ${e.registerUniform("outputSize","u32").declareVariables(d,p,h,c,f,m)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${m.offsetToIndices(`global_idx * ${n}`)};
    ${(()=>{let e="";if(r)e=`let cOffset = ${1===s.length?"0u":"NHWC"===a?`outputIndices[${s.length-1}] / ${n}`:"outputIndices[1]"};`;else if("NCHW"===a)e=`
            ${m.indicesSet("outputIndices","0","0")}
            let cOffset = ${m.indicesToOffset("outputIndices")};`;else{e=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let t=1;t<p.rank;t++)e+=`cIndices[${t}] = outputIndices[${t}];`;e+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return e})()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${c.getByOffset("cOffset")};
    let inputVar = ${f.getByOffset("cOffset")};
    let x = ${d.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${m.setByOffset("global_idx","value")}
  }`,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:r?[{type:12,data:u},...t$(s)]:[{type:12,data:u}]})}})(r,s))}}),sk=q(()=>{"use strict";sd(),s_(),ih=e=>{var t;let i,r,a,s,n,o,u,l;(e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")})(e.inputs),e.compute((i=(t=e.inputs)[0].dims,r=t[0].dims[2],a=eQ.size(i)/4,s=t[0].dataType,n=tI("input",s,i,4),o=tI("bias",s,[r],4),u=tI("residual",s,i,4),l=tT("output",s,i,4),{name:"BiasAdd",getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:e=>`
  const channels = ${r}u / 4;
  ${e.declareVariables(n,o,u,l)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let value = ${n.getByOffset("global_idx")}
      + ${o.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}))}}),sS=q(()=>{"use strict";so(),sd(),sg(),s_(),ic=(e,t,i,r,a,s=e.dataType,n,o)=>{let u=[{type:12,data:Math.ceil(eQ.size(e.dims)/4)}];return n&&u.push(...n),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:t=>{var a,n,u,l,d,p,h;let c,f,m,g,_;return a=t,n=eQ.size(e.dims),u=e.dataType,l=s,d=i,p=r,h=o,c=Math.ceil(n/4),f="",f="string"==typeof d?`${d}(a)`:d("a"),m=tI("inputData",u,[c],4),g=tT("outputData",l,[c],4),_=[{name:"vec_size",type:"u32"}],h&&_.push(...h),`
      ${a.registerUniforms(_).declareVariables(m,g)}

  ${p??""}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${m.getByOffset("global_idx")};
    ${g.setByOffset("global_idx",f)}
  }`},getRunData:t=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(eQ.size(t[0].dims)/64/4)},programUniforms:u})}},im=e=>{e.compute(ic(e.inputs[0],"Abs","abs"))},ig=e=>{e.compute(ic(e.inputs[0],"Acos","acos"))},i_=e=>{e.compute(ic(e.inputs[0],"Acosh","acosh"))},iy=e=>{e.compute(ic(e.inputs[0],"Asin","asin"))},i$=e=>{e.compute(ic(e.inputs[0],"Asinh","asinh"))},ib=e=>{e.compute(ic(e.inputs[0],"Atan","atan"))},iv=e=>{e.compute(ic(e.inputs[0],"Atanh","atanh"))},iw=e=>tf(e),ix=(e,t)=>{let i;switch(t.to){case 10:i="vec4<f16>";break;case 1:i="vec4<f32>";break;case 12:i="vec4<u32>";break;case 6:i="vec4<i32>";break;case 9:i="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ic(e.inputs[0],"Cast",i,void 0,t.cacheKey,t.to))},ik=(e,t)=>{let i=t||(e=>{let t,i,r=e.length>=2&&0!==e[1].data,a=e.length>=3&&0!==e[2].data;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,i=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,i=a?e[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return tf({min:t,max:i})})(e.inputs),r=ty(e.inputs[0].dataType);e.compute(ic(e.inputs[0],"Clip",e=>`clamp(${e}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,i.cacheKey,void 0,[{type:e.inputs[0].dataType,data:i.min},{type:e.inputs[0].dataType,data:i.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},iS=e=>{e.compute(ic(e.inputs[0],"Ceil","ceil"))},iI=e=>{e.compute(ic(e.inputs[0],"Cos","cos"))},iT=e=>{e.compute(ic(e.inputs[0],"Cosh","cosh"))},iz=e=>tf(e),iE=(e,t)=>{let i=ty(e.inputs[0].dataType);e.compute(ic(e.inputs[0],"Elu",e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${i}(${t.alpha});

  fn elu_f32(a: ${i}) -> ${i} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${i}>) -> vec4<${i}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},iC=(e="f32")=>`
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
}`,iO=e=>{let t=ty(e.inputs[0].dataType);e.compute(ic(e.inputs[0],"Erf",e=>`erf_vf32(${e})`,iC(t)))},iB=e=>{e.compute(ic(e.inputs[0],"Exp","exp"))},iA=e=>{e.compute(ic(e.inputs[0],"Floor","floor"))},iR=e=>{let t=ty(e.inputs[0].dataType);e.compute(ic(e.inputs[0],"Gelu",e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,iC(t)))},iD=(e,t)=>{let i=ty(e.inputs[0].dataType);e.compute(ic(e.inputs[0],"LeakyRelu",e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${i}>(0.0))`,`const leaky_relu_alpha_ = ${i}(${t.alpha});`,t.cacheKey))},iM=e=>{e.compute(ic(e.inputs[0],"Not",e=>`!${e}`))},iU=e=>{e.compute(ic(e.inputs[0],"Neg",e=>`-${e}`))},iP=e=>{e.compute(ic(e.inputs[0],"Reciprocal",e=>`1.0/${e}`))},iq=e=>{let t=ty(e.inputs[0].dataType);e.compute(ic(e.inputs[0],"Relu",e=>`select(vec4<${t}>(0.0), ${e}, ${e} > vec4<${t}>(0.0))`))},iN=e=>{e.compute(ic(e.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},iL=e=>tf(e),iV=(e,t)=>{let i=ty(e.inputs[0].dataType);e.compute(ic(e.inputs[0],"HardSigmoid",e=>`max(vec4<${i}>(0.0), min(vec4<${i}>(1.0), ${t.alpha} * ${e} + vec4<${i}>(${t.beta})))`,void 0,t.cacheKey))},iG=e=>{e.compute(ic(e.inputs[0],"Sin","sin"))},iW=e=>{e.compute(ic(e.inputs[0],"Sinh","sinh"))},iH=e=>{e.compute(ic(e.inputs[0],"Sqrt","sqrt"))},iF=e=>{e.compute(ic(e.inputs[0],"Tan","tan"))},iK=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,ij=e=>{e.compute(ic(e.inputs[0],"Tanh",iK))},iZ=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${iK("v")};
}
`,iQ=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,iX=e=>{let t=ty(e.inputs[0].dataType);e.compute(ic(e.inputs[0],"FastGelu",iQ,iZ(t),void 0,e.inputs[0].dataType))},iY=(e,t)=>{let i=ty(e.inputs[0].dataType);return e.compute(ic(e.inputs[0],"ThresholdedRelu",e=>`select(vec4<${i}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${i}>(${t.alpha});`,t.cacheKey)),0},iJ=e=>{e.compute(ic(e.inputs[0],"Log","log"))},i0=e=>`quick_gelu_impl(${e})`,i1=(e,t)=>{let i,r,a=ty(e.inputs[0].dataType);e.compute(ic(e.inputs[0],"QuickGelu",i0,(i=a,r=t.alpha,`
const alpha = vec4<${i}>(${r});
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
`),t.cacheKey,e.inputs[0].dataType))}}),sI=q(()=>{"use strict";sd(),s_(),sS(),i2=e=>{var t;let i,r,a,s,n,o;(e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")})(e.inputs),e.compute(((i=(t=e.inputs)[0].dims.slice())[2]=i[2]/2,r=tI("input",t[0].dataType,t[0].dims,4),a=tI("bias",t[0].dataType,[t[0].dims[2]],4),s=tT("output",t[0].dataType,i,4),n=eQ.size(i)/4,o=t_(t[0].dataType),{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:e=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${t[0].dims[2]/4/2}u;

  ${e.declareVariables(r,a,s)}

  ${iC(o)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${s.setByOffset("global_idx","valueLeft * geluRight")}
  }`}))}}),sT=q(()=>{"use strict";so(),sd(),s_(),i3=(e,t,i,r,a,s)=>{e.compute(((e,t,i,r,a,s,n=i.dataType)=>{let o=i.dims.map(Number),u=r.dims.map(Number),l=!eQ.areEqual(o,u),d=o,p=eQ.size(o),h=!1,c=!1,f=[l];if(l){let e=eZ.calcShape(o,u,!1);if(!e)throw Error("Can't perform binary op on the given tensors");d=e.slice(),p=eQ.size(d);let t=1===eQ.size(o),i=1===eQ.size(u),r=o.length>0&&o[o.length-1]%4==0,a=u.length>0&&u[u.length-1]%4==0;f.push(t),f.push(i),f.push(r),f.push(a);let s=1;for(let e=1;e<d.length;e++){let t=o[o.length-e];if(t===u[u.length-e])s*=t;else break}s%4==0?(c=!0,h=!0):(t||i||r||a)&&(h=!0)}else h=!0;return f.push(h),{name:e,shaderCache:{hint:t+f.map(e=>e.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:e=>((e,t,i,r,a,s,n,o,u,l,d,p)=>{let h,c;"string"==typeof o?h=c=(e,t)=>`${o}((${e}),(${t}))`:"function"==typeof o?h=c=o:(h=o.scalar,c=o.vector);let f=tT("outputData",d,r.length,4),m=tI("aData",u,t.length,4),g=tI("bData",l,i.length,4),_;if(a)if(s){let e=1===eQ.size(t),r=1===eQ.size(i),a=t.length>0&&t[t.length-1]%4==0,s=i.length>0&&i[i.length-1]%4==0;_=e||r?f.setByOffset("global_idx",c(e?`${m.type.value}(${m.getByOffset("0")}.x)`:m.getByOffset("global_idx"),r?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"))):`
            let outputIndices = ${f.offsetToIndices("global_idx * 4u")};
            let offsetA = ${m.broadcastedIndicesToOffset("outputIndices",f)};
            let offsetB = ${g.broadcastedIndicesToOffset("outputIndices",f)};
            ${f.setByOffset("global_idx",c(n||a?m.getByOffset("offsetA / 4u"):`${m.type.value}(${m.getByOffset("offsetA / 4u")}[offsetA % 4u])`,n||s?g.getByOffset("offsetB / 4u"):`${g.type.value}(${g.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else _=f.setByOffset("global_idx",c(m.getByOffset("global_idx"),g.getByOffset("global_idx")));else{if(!s)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let e=(e,t,i="")=>{let r=`aData[indexA${t}][componentA${t}]`,a=`bData[indexB${t}][componentB${t}]`;return`
            let outputIndices${t} = ${f.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offsetA${t} = ${m.broadcastedIndicesToOffset(`outputIndices${t}`,f)};
            let offsetB${t} = ${g.broadcastedIndicesToOffset(`outputIndices${t}`,f)};
            let indexA${t} = offsetA${t} / 4u;
            let indexB${t} = offsetB${t} / 4u;
            let componentA${t} = offsetA${t} % 4u;
            let componentB${t} = offsetB${t} % 4u;
            ${e}[${t}] = ${i}(${h(r,a)});
          `};_=9===d?`
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
        ${_}
      }`})(e,o,u,d,h,l,c,a,i.dataType,r.dataType,n,s),getRunData:()=>({outputs:[{dims:d,dataType:n}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(eQ.size(d)/4)},...t$(o,u,d)]})}})(t,a??"",e.inputs[0],e.inputs[1],i,r,s))},i4=e=>{i3(e,"Add",(e,t)=>`${e}+${t}`)},i6=e=>{i3(e,"Div",(e,t)=>`${e}/${t}`)},i8=e=>{i3(e,"Equal",{scalar:(e,t)=>`u32(${e}==${t})`,vector:(e,t)=>`vec4<u32>(${e}==${t})`},void 0,void 0,9)},i5=e=>{i3(e,"Mul",(e,t)=>`${e}*${t}`)},i7=e=>{let t=tI("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;i3(e,"Pow",{scalar:(e,t)=>`pow_custom(${e},${t})`,vector:(e,t)=>`pow_vector_custom(${e},${t})`},`
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
      `)},i9=e=>{i3(e,"Sub",(e,t)=>`${e}-${t}`)},re=e=>{i3(e,"Greater",{scalar:(e,t)=>`u32(${e}>${t})`,vector:(e,t)=>`vec4<u32>(${e}>${t})`},void 0,void 0,9)},rt=e=>{i3(e,"Less",{scalar:(e,t)=>`u32(${e}<${t})`,vector:(e,t)=>`vec4<u32>(${e}<${t})`},void 0,void 0,9)},ri=e=>{i3(e,"GreaterOrEqual",{scalar:(e,t)=>`u32(${e}>=${t})`,vector:(e,t)=>`vec4<u32>(${e}>=${t})`},void 0,void 0,9)},rr=e=>{i3(e,"LessOrEqual",{scalar:(e,t)=>`u32(${e}<=${t})`,vector:(e,t)=>`vec4<u32>(${e}<=${t})`},void 0,void 0,9)}}),sz=q(()=>{"use strict";so(),sd(),sg(),s_(),ra=(e,t)=>{let i=e.inputs,r=i[0].dims,a=eQ.normalizeAxis(t.axis,r.length);var s=i,n=a;if(!s||s.length<1)throw Error("too few inputs");let o=s[0],u=o.dataType,l=o.dims.length;s.forEach((e,t)=>{if(0!==t){if(e.dataType!==u)throw Error("input tensors should be one type");if(e.dims.length!==l)throw Error("input tensors should have the same shape");e.dims.forEach((e,t)=>{if(t!==n&&e!==o.dims[t])throw Error("non concat dimensions must match")})}});let d=r.slice();d[a]=i.reduce((e,t)=>e+(t.dims.length>a?t.dims[a]:0),0);let p=i.filter(e=>eQ.size(e.dims)>0);e.compute(((e,t,i,r)=>{let a=eQ.size(i),s=Array(e.length),n=Array(e.length),o=0,u=[],l=[],d=[{type:12,data:a}];for(let i=0;i<e.length;++i)o+=e[i].dims[t],s[i]=o,l.push(e[i].dims.length),n[i]=tI(`input${i}`,r,l[i]),u.push("rank"),d.push({type:12,data:s[i]});for(let t=0;t<e.length;++t)d.push(...t$(e[t].dims));d.push(...t$(i));let p=tT("output",r,i.length),h=p.indicesGet("indices",t),c=Array.from(Array(s.length).keys()).map(e=>`uniforms.sizeInConcatAxis${e}`).join(",");return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:i,dataType:r}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:t=>{let i,r;return`

  ${(()=>{t.registerUniform("outputSize","u32");for(let i=0;i<e.length;i++)t.registerUniform(`sizeInConcatAxis${i}`,"u32");return t.declareVariables(...n,p)})()}

  ${i=s.length,r=c,`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${i}u>(${r});
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

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${c});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${((e,t)=>{let i=e.length,r=[];for(let a=0;a<i;++a){let s=t.setByOffset("global_idx",e[a].getByIndices("indices"));1===i?r.push(s):0===a?r.push(`if (inputIndex == ${a}u) { ${s} }`):a===i-1?r.push(`else { ${s} }`):r.push(`else if (inputIndex == ${a}) { ${s} }`)}return r.join(`
`)})(n,p)}
  }`}}})(p,a,d,i[0].dataType),{inputs:p})},rs=e=>tf({axis:e.axis})}),sE=q(()=>{"use strict";so(),sd(),rn=(e,t,i="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${i}(uniforms.clip_min)), ${t}(${i}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${i}(uniforms.alpha) * value + ${i}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${i}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${e.activation}`)}},ro=(e,t)=>{"Clip"===e.activation?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):"HardSigmoid"===e.activation?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):"LeakyRelu"===e.activation&&t.push({type:1,data:e.alpha})},ru=(e,t)=>{"Clip"===e.activation?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===e.activation?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===e.activation&&t.push({name:"alpha",type:"f32"})},rl=e=>{let t=e?.activation||"";if("HardSigmoid"===t){let[i,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:i,beta:r}}if("Clip"===t){let[i,r]=e?.activation_params||[eJ,e0];return{activation:t,clipMax:r,clipMin:i}}if("LeakyRelu"===t){let[i]=e?.activation_params||[.01];return{activation:t,alpha:i}}return{activation:t}}}),sC=q(()=>{"use strict";rd=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw Error(`${e}-component is not supported.`)}},rp=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),sO=q(()=>{"use strict";rh=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),sB=q(()=>{"use strict";so(),sd(),s_(),sE(),rc=(e,t,i,r,a)=>{let s=r-i;return`
      ${Array.from({length:i}).map((i,n)=>`
      if (${tk(t.shape,n,t.rank)} != 1) {
        ${t.indicesSet(e,n,tk(a,n+s,r))}
      } else {
        ${t.indicesSet(e,n,0)}
      }`).join("")}
`},rf=(e,t,i,r,a=!1,s)=>{let n=e[0].dims,o=e[1].dims,u=n[n.length-2],l=o[o.length-1],d=n[n.length-1],p=tb(l),h=tb(d),c=tb(u),f=eQ.size(i)/p/c,m=e.length>2,g=r?r.slice(0,-2):i.slice(0,-2),_=[eQ.size(g),u,l],y=[{type:12,data:f},{type:12,data:u},{type:12,data:l},{type:12,data:d}];return ro(t,y),y.push(...t$(g,n,o)),m&&y.push(...t$(e[2].dims)),y.push(...t$(_)),{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${h};${c};${a}`,inputDependencies:m?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:y}),getShaderSource:r=>{let s=tE("batch_dims",e[0].dataType,g.length),u=tI("a",e[0].dataType,n.length,h),l=tI("b",e[1].dataType,o.length,p),d=tT("output",e[0].dataType,_.length,p),f=t_(d.type.tensor),y=rn(t,d.type.value,f),$=[u,l],b="";if(m){let t=a?p:1;$.push(tI("bias",e[2].dataType,e[2].dims.length,t)),b=`${a?`value += bias[col / ${t}];`:`value += ${d.type.value}(bias[row + i]);`}`}let v=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];return ru(t,v),`
  ${r.registerUniforms(v).registerInternalVariables(s).declareVariables(...$,d)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${c};
    let row = (index1 % stride1) * ${c};
    let batch = index1 / stride1;

    ${2===i.length?"":`let batch_indices = ${s.offsetToIndices("batch")};`}

    var a_indices: ${u.type.indices};
    ${rc("a_indices",u,u.rank-2,s.rank,"batch_indices")}
    ${u.indicesSet("a_indices",u.rank-2,0)}
    ${u.indicesSet("a_indices",u.rank-1,0)}
    let a_offset = ${u.indicesToOffset("a_indices")};

    var b_indices: ${l.type.indices};
    ${rc("b_indices",l,l.rank-2,s.rank,"batch_indices")}
    ${l.indicesSet("b_indices",l.rank-2,0)}
    ${l.indicesSet("b_indices",l.rank-1,0)}
    let b_offset = ${l.indicesToOffset("b_indices")};
    var values: array<${d.type.value}, ${c}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${(()=>{let e=`var a_data: ${u.type.value};`;for(let t=0;t<h;t++)e+=`
              let b_data${t} = b[(b_offset + (k + ${t}) * uniforms.N + col) / ${p}];`;for(let t=0;t<c;t++){e+=`a_data = a[(a_offset + (row + ${t}) * uniforms.K + k) / ${h}];`;for(let i=0;i<h;i++)e+=`
            values[${t}] = fma(${l.type.value}(a_data${1===h?"":`[${i}]`}), b_data${i}, values[${t}]);
`}return e})()}
    }
    for (var i = 0u; i < ${c}u; i++) {
      var value = values[i];
      ${b}
      ${y}
      let cur_indices = ${d.type.indices}(batch, row + i, col);
      let offset = ${d.indicesToOffset("cur_indices")};
      ${d.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `}}}}),sA=q(()=>{"use strict";so(),sd(),s_(),sE(),sB(),sC(),rm=(e,t,i="f32",r,a=!1,s=32,n=!1,o=32)=>{let u,l,d,p,h=t[1]*e[1],c=t[0]*e[0],f=a?h:s,m=a?s:h,g=f/t[0],_=s/t[1];if(!((a&&4===g&&4===e[1]||!a&&(3===g||4===g))&&f%t[0]==0&&s%t[1]==0&&4===e[0]))throw Error(`If transposeA ${a} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${i}>, ${f/g}>, ${m}>;
var<workgroup> mm_Bsub: array<array<vec4<${i}>, ${c/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
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
  let globalRowStart = i32(workgroupId.y) * ${h};

  let num_tiles = ${n?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${n?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${i}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${u=a,l=r,u?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${l?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${l?", batchIndices":""});
        `}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
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
          ${3===g?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${d=a,p=g,d?`
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
}`},rg=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,r_=(e,t,i="f32",r,a=!1,s=32,n=!1,o=32,u=!1)=>{let l=e[1]*t[1],d=e[0]*t[0],p=a?l:s,h=a?s:l;if(h%t[1]!=0||p%t[0]!=0||s%t[1]!=0)throw Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let c=h/t[1],f=p/t[0],m=s/t[1],g=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${rg(a,r)}
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

let tileRowA = i32(localId.y) * ${c};
let tileColA = i32(localId.x) * ${f};
let tileRowB = i32(localId.y) * ${m};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${c}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${f}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${rg(a,r)}
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
  var<workgroup> mm_Asub : array<array<${i}, ${p}>, ${h}>;
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
`},ry=(e,t,i,r,a=!1,s)=>{let n=e[0].dims,o=e[1].dims,u=n.slice(0,-2),l=o.slice(0,-2),d=r?r.slice(0,-2):i.slice(0,-2),p=eQ.size(d),h=n[n.length-2],c=n[n.length-1],f=o[o.length-1],m=c%4==0&&f%4==0,g=h<=8?[4,1,1]:[4,4,1],_=[8,8,1],y=[Math.ceil(f/_[0]/g[0]),Math.ceil(h/_[1]/g[1]),Math.ceil(p/_[2]/g[2])],$=m?4:1,b=[...u,h,c/$],v=b.length,w=[...l,c,f/$],x=w.length,k=[p,h,f/$],S=[{type:6,data:h},{type:6,data:f},{type:6,data:c}];ro(t,S),S.push(...t$(d,b,w));let I=["rank","rank"],T=e.length>2;return T&&(S.push(...t$(e[2].dims)),I.push("rank")),S.push(...t$(k)),{name:"MatMul",shaderCache:{hint:`${g};${t.activation};${m};${a}`,inputDependencies:I},getRunData:()=>({outputs:[{dims:s?s(i):i,dataType:e[0].dataType}],dispatchGroup:{x:y[0],y:y[1],z:y[2]},programUniforms:S}),getShaderSource:i=>{let r=d.length,s=tE("batchDims",e[0].dataType,r,1),n=t_(e[0].dataType),o=tI("a",e[0].dataType,v,$),u=tI("b",e[1].dataType,x,$),l=tT("result",e[0].dataType,k.length,$),p=[o,u];if(T){let t=a?$:1;p.push(tI("bias",e[2].dataType,e[2].dims.length,t))}let h=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];ru(t,h);let c=t_(l.type.tensor),f=((e,t,i,r,a=!1)=>{let[s,n,o,u]=r,l=t_(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${rd(e,l)} {
      var value = ${rd(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${n.type.indices};
        ${rc("aIndices",n,n.rank-2,s.rank,"batchIndices")}
        ${n.indicesSet("aIndices",n.rank-2,"u32(row)")}
        ${n.indicesSet("aIndices",n.rank-1,"u32(colIn)")}
        value = ${n.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${rd(e,l)} {
      var value = ${rd(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${rc("bIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${rd(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${rd(e,l)}(bias[row])`};`:""}
        ${i}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `})($,T,rn(t,l.type.value,c),[s,o,u,l],a);return`
  ${i.registerUniforms(h).registerInternalVariables(s).declareVariables(...p,l)}
  ${f}
  ${m?rm(g,_,n,s):r_(g,_,n,s)}
                   `}}}}),sR=q(()=>{"use strict";so(),sl(),s_(),sE(),sC(),sO(),sA(),r$=(e,t,i,r,a,s,n,o,u)=>{let l="NHWC"===t.format,d=l?e[0].dims[3]:e[0].dims[1],p=i[0],h=l?i[2]:i[3],c=l?i[1]:i[2],f=l?i[3]:i[1],m=l&&(d%4==0||d%3==0)&&f%4==0,g=l?f:h*c,_=l?h*c:f,y=[8,8,1],$=r<=8?[4,1,1]:[4,4,1],b=[Math.ceil(g/y[0]/$[0]),Math.ceil(_/y[1]/$[1]),Math.ceil(p/y[2]/$[2])];eK("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${b}`);let v=m?l&&d%4!=0?3:4:1,w=y[1]*$[1],x=y[0]*$[0],k=Math.max(y[0]*v,y[1]),S=r%w==0,I=a%x==0,T=s%k==0,z=m?[v,4,4]:[1,1,1],E=[{type:6,data:r},{type:6,data:a},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];ro(t,E),E.push(...t$(e[0].dims,e[1].dims));let C=["rank","rank"];return n&&(E.push(...t$(e[2].dims)),C.push("rank")),E.push(...t$(i)),{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${v};${m};${S};${I};${T};${w};${x};${k}`,inputDependencies:C},getRunData:()=>({outputs:[{dims:u?u(i):i,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:E}),getShaderSource:r=>{let a=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];ru(t,a);let s=m?4:1,u=t_(e[0].dataType),d=`
      fn setOutputAtIndex(flatIndex : i32, value : ${m?`vec4<${u}>`:u}) {
        result[flatIndex] = ${m?`vec4<${u}>`:u}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${m?`vec4<${u}>`:u}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${m?"/ 4":""}, value);
      }`,p=[tI("x",e[0].dataType,e[0].dims.length,3===v?1:v),tI("w",e[1].dataType,e[1].dims.length,s)],h=tT("result",e[0].dataType,i.length,s);if(n){let t=tI("bias",e[2].dataType,e[2].dims.length,s);p.push(t),d+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${m?`vec4<${u}>`:u} {
          return bias[coords.${l?"w":"y"}${m?"/ 4":""}];
        }`}return`
        ${rh("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${r.registerUniforms(a).declareVariables(...p,h)}
        ${d}
        ${((e,t,i,r,a=!1,s,n=4,o=4,u=4,l="f32")=>{let d=e=>{switch(e){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${e} is not supported.`)}},p=e?`
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
    `,c=e?"row":"col",f=e?"col":"row",m=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${c} / outWidth;
    let outCol = ${c} % outWidth;

    let WRow = ${f} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${f} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${f} % inChannels;
    var resData = ${rd(n,l)}(0.0);
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
    return ${rd(n,l)}(0.0);`:r&&i?`
    let col = colIn * ${n};
    ${m}`:`
    let col = colIn * ${n};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${m}
    }
    return ${rd(n,l)}(0.0);`,_=e?r&&i?d(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${d(o)}
    }
    return ${rd(o,l)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${d(o)}
    }
    return ${rd(o,l)}(0.0);`,y=rd(u,l),$=e?rd(n,l):rd(o,l),b=e?rd(o,l):rd(n,l),v=rn(s,y,l);return`
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
      ${h}
      ${rp(a)}
      ${v}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`})(l,S,I,T,n,t,z[0],z[1],z[2],u)}
        ${m?rm($,y,u,void 0,!l,k):r_($,y,u,void 0,!l,k,!1,void 0,o)}`}}}}),sD=q(()=>{"use strict";so(),sl(),sd(),s_(),sE(),sC(),rb=e=>"number"==typeof e?[e,e,e]:e,rv=(e,t)=>t<=1?e:e+(e-1)*(t-1),rw=(e,t,i,r,a)=>{null==a&&(a=((e,t,i,r=1)=>{let a=rv(t,r);return Math.floor((e[0]*(i-1)-i+a)/2)})(e,t[0],r[0]));let s=[0,0,0,i];for(let i=0;i<3;i++)e[i]+2*a>=t[i]&&(s[i]=Math.trunc((e[i]-t[i]+2*a)/r[i]+1));return s},rx=(e,t,i,r,a,s=!1,n="channelsLast")=>{let o,u,l,d,p;if("channelsLast"===n)[o,u,l,d,p]=e;else if("channelsFirst"===n)[o,p,u,l,d]=e;else throw Error(`Unknown dataFormat ${n}`);let[h,,c,f,m]=t,[g,_,y]=rb(i),[$,b,v]=rb(r),w=rv(c,$),x=rv(f,b),k=rv(m,v),{padInfo:S,outDepth:I,outHeight:T,outWidth:z}=((e,t,i,r,a,s,n,o,u,l)=>{let d,p,h,c;if("VALID"===e&&(e=0),"number"==typeof e){d={top:e,bottom:e,left:e,right:e,front:e,back:e};let f=rw([t,i,r,1],[o,u,l],1,[a,s,n],e);p=f[0],h=f[1],c=f[2]}else if(Array.isArray(e)){if(!e.every((e,t,i)=>e===i[0]))throw Error(`Unsupported padding parameter: ${e}`);d={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let f=rw([t,i,r,1],[o,u,l],1,[a,s,n],e[0]);p=f[0],h=f[1],c=f[2]}else if("SAME_UPPER"===e){p=Math.ceil(t/a),h=Math.ceil(i/s),c=Math.ceil(r/n);let e=(p-1)*a+o-t,f=(h-1)*s+u-i,m=(c-1)*n+l-r,g=Math.floor(e/2),_=Math.floor(f/2),y=Math.floor(m/2);d={top:_,bottom:f-_,left:y,right:m-y,front:g,back:e-g}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:p,outHeight:h,outWidth:c}})(a,u,l,d,g,_,y,w,x,k),E=s?h*p:h,C=[0,0,0,0,0];return"channelsFirst"===n?C=[o,E,I,T,z]:"channelsLast"===n&&(C=[o,I,T,z,E]),{batchSize:o,dataFormat:n,inDepth:u,inHeight:l,inWidth:d,inChannels:p,outDepth:I,outHeight:T,outWidth:z,outChannels:E,padInfo:S,strideDepth:g,strideHeight:_,strideWidth:y,filterDepth:c,filterHeight:f,filterWidth:m,effectiveFilterDepth:w,effectiveFilterHeight:x,effectiveFilterWidth:k,dilationDepth:$,dilationHeight:b,dilationWidth:v,inShape:e,outShape:C,filterShape:t}},rk=(e,t,i,r,a,s)=>{let n="channelsLast"===s,o=(n?e[0].dims[3]:e[0].dims[1],[Math.ceil((e=>{let t=1;for(let i=0;i<e.length;i++)t*=e[i];return t})(({x:i.map((e,t)=>t)}).x.map(e=>i[e]))/64),1,1]);eK("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${o}`);let u=[{type:12,data:eQ.size(i)},{type:12,data:r},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];ro(t,u),u.push(...t$(e[0].dims,e[1].dims));let l=["rank","rank"],d=3===e.length;return d&&(u.push(...t$(e[2].dims)),l.push("rank")),u.push(...t$(i)),{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${n};1;${d}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:o[0],y:o[1],z:o[2]},programUniforms:u}),getShaderSource:s=>{let o=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];ru(t,o);let u=t_(e[0].dataType),l=tI("x",e[0].dataType,e[0].dims.length,1),p=tI("W",e[1].dataType,e[1].dims.length,1),h=[l,p],c=tT("result",e[0].dataType,i.length,1),f="";if(d){let t=tI("bias",e[2].dataType,e[2].dims.length,1);h.push(t),f+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u} {
          return bias[${n?tk("coords",4,5):tk("coords",1,5)}];
        }`}let m=rd(1,u),g=rn(t,m,u);return`
            ${f}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${l.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${p.getByIndices("aIndices")};
            }
          ${s.registerUniforms(o).declareVariables(...h,c)}
          ${s.mainStart()}
          ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${c.offsetToIndices("global_idx")};
              let batch = ${tk("coords",0,l.rank)};
              let d2 = ${n?tk("coords",l.rank-1,l.rank):tk("coords",1,l.rank)};
              let xFRCCorner = vec3<u32>(${n?tk("coords",1,l.rank):tk("coords",2,l.rank)},
              ${n?tk("coords",2,l.rank):tk("coords",3,l.rank)},
              ${n?tk("coords",3,l.rank):tk("coords",4,l.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${n?tk("uniforms.x_shape",1,l.rank):tk("uniforms.x_shape",2,l.rank)};
              let xShapeZ = ${n?tk("uniforms.x_shape",2,l.rank):tk("uniforms.x_shape",3,l.rank)};
              let xShapeW = ${n?tk("uniforms.x_shape",3,l.rank):tk("uniforms.x_shape",4,l.rank)};
              let xShapeU = ${n?tk("uniforms.x_shape",4,l.rank):tk("uniforms.x_shape",1,l.rank)};
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
          }`}}}}),sM=q(()=>{"use strict";so(),sd(),s_(),sE(),rS=(e,t,i,r)=>{let a=e.length>2,s=a?"value += b[output_channel];":"",n=e[0].dims,o=e[1].dims,u="NHWC"===t.format,l=u?i[3]:i[1],d=l/t.group,p=u&&d>=4?tb(l):1,h=eQ.size(i)/p,c=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:d}];return ro(t,c),c.push(...t$(n,[o[0],o[1],o[2],o[3]/p])),c.push(...t$([i[0],i[1],i[2],i[3]/p])),{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:a?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:c}),getShaderSource:r=>{let l=tT("output",e[0].dataType,i.length,p),d=t_(l.type.tensor),h=rn(t,l.type.value,d),c=tI("x",e[0].dataType,n.length),f=tI("w",e[1].dataType,o.length,p),m=[c,f];a&&m.push(tI("b",e[2].dataType,e[2].dims,p));let g=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];ru(t,g);let _=u?`
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
            let xVal = ${c.get("batch","xHeight","xWidth","input_channel")};
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

            let xVal = ${c.get("batch","input_channel","xHeight","xWidth")};
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
    ${h}
    ${l.setByOffset("global_idx","value")}
  }`}}},rI=(e,t,i,r)=>{let a=e.length>2,s=tb(i[3]),n=tb(i[2]),o=eQ.size(i)/s/n,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],d=[i[0],i[1],i[2],i[3]/s],p=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];ro(t,p),p.push(...t$(u,l,d));let h=(n-1)*t.strides[1]+l[1];return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${n};${h};${l[0]};${l[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:i=>{let r=tT("output",e[0].dataType,d.length,s),o=t_(r.type.tensor),p=rn(t,r.type.value,o),c=tI("x",e[0].dataType,u.length,s),f=tI("w",e[1].dataType,l.length,s),m=[c,f];a&&m.push(tI("b",e[2].dataType,e[2].dims,s));let g=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return ru(t,g),`
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

    var x_vals: array<${c.type.value}, ${h}>;
    var values: array<${r.type.value}, ${n}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${c.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${c.type.value}(0);
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
  }`}}}}),sU=q(()=>{"use strict";sd(),sR(),sD(),sA(),sM(),sE(),sB(),sy(),rT=[2,3,1,0],rz=(e,t)=>{let i=e.kernelShape.slice();i.length<t[1].dims.length-2&&i.push(...Array(t[1].dims.length-2-i.length).fill(0));for(let e=2;e<t[1].dims.length;++e)0===i[e-2]&&(i[e-2]=t[1].dims[e]);let r=e.pads.slice();eX.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,i,r,"NHWC"===e.format,e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:i,pads:r}),a},rE=e=>{let t=rl(e),i=e.format;return{autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],format:i,dilations:e.dilations,group:e.group,kernelShape:e.kernel_shape,pads:e.pads,strides:e.strides,wIsConst:e.w_is_const(),...t,cacheKey:`${e.format};${t.activation};`}},rC=(e,t,i,r)=>{var a,s,n,o,u,l;let d,p,h,c,f,m,g="NHWC"===i.format,_=(a=t[0].dims,s=t[1].dims,n=i.dilations,o=i.pads,u=i.strides,l=g,d=a[0],h=(p=a.slice(l?1:2,l?3:4)).length,c=s[0],f=s.slice(2).map((e,t)=>e+(e-1)*(n[t]-1)),(m=p.map((e,t)=>e+o[t]+o[t+h]).map((e,t)=>Math.floor((e-f[t]+u[t])/u[t]))).splice(0,0,d),m.splice(l?3:1,0,c),m);if(1!==i.group){let a=[t[0]];if(g){let r=e.kernelCustomData.wT??e.compute(tA(t[1],rT),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=r),a.push(r)}else a.push(t[1]);3===t.length&&a.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&g&&t[1].dims[0]===i.group&&1===t[1].dims[1]&&1===i.dilations[0]&&1===i.dilations[1]?e.compute(rI(a,i,_,r),{inputs:a}):e.compute(rS(a,i,_,r),{inputs:a});return}let y=3===t.length,$=t[0].dims[g?1:2],b=t[0].dims[g?2:3],v=t[0].dims[g?3:1],w=t[1].dims[2],x=t[1].dims[3],k=_[g?1:2],S=_[g?2:3],I=_[g?3:1],T=g&&w===$&&x===b&&0===i.pads[0]&&0===i.pads[1];if(T||1===w&&1===x&&1===i.dilations[0]&&1===i.dilations[1]&&1===i.strides[0]&&1===i.strides[1]&&0===i.pads[0]&&0===i.pads[1]){let a=_[0],s,n,o,u=[];if(g){let r=e.kernelCustomData.wT??e.compute(tA(t[1],rT),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];if(i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=r),T){let e=$*b*v;s=t[0].reshape([1,a,e]),n=r.reshape([1,e,I]),o=[1,a,I]}else s=t[0].reshape([a,$*b,v]),n=r.reshape([1,v,I]),o=[a,k*S,I];u.push(s),u.push(n)}else s=t[0].reshape([a,v,$*b]),n=t[1].reshape([1,I,v]),o=[a,I,k*S],u.push(n),u.push(s);y&&u.push(t[2]);let l=o[2],d=u[0].dims[u[0].dims.length-1];l<8&&d<8?e.compute(rf(u,i,_,o,g,r),{inputs:u}):e.compute(ry(u,i,_,o,g,r),{inputs:u});return}let z=e.kernelCustomData.wT??e.compute(tA(t[1],rT),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z);let E=[t[0],z];y&&E.push(t[2]);let C=g?k*S:I,O=g?I:k*S,B=w*x*v;e.compute(r$(E,i,_,C,O,B,y,!0,r),{inputs:E})},rO=(e,t)=>{var i,r,a,s,n;if(((e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw Error(`strides should be ${i}D`);if(t.pads.length!==2*i)throw Error(`pads should be ${2*i}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape")})(e.inputs,t),3===e.inputs[0].dims.length){let a,s,n,o,u,l,d;i=e,a="NHWC"===(r=t).format,s=[i.inputs[0].reshape(a?[i.inputs[0].dims[0],1,i.inputs[0].dims[1],i.inputs[0].dims[2]]:[i.inputs[0].dims[0],i.inputs[0].dims[1],1,i.inputs[0].dims[2]]),i.inputs[1].reshape([i.inputs[1].dims[0],i.inputs[1].dims[1],1,i.inputs[1].dims[2]])],3===i.inputs.length&&s.push(i.inputs[2]),n=[0,r.pads[0],0,r.pads[1]],o=[1].concat(r.strides),u=[1].concat(r.dilations),l=[1].concat(r.kernelShape),d=rz({...r,pads:n,strides:o,dilations:u,kernelShape:l},s),rC(i,s,d,e=>a?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])}else if(5===e.inputs[0].dims.length){let i,r,o,u;a=e,s=e.inputs,i="NHWC"===(n=t).format?"channelsLast":"channelsFirst",r=rz(n,s),o="NOTSET"===n.autoPad?n.pads:n.autoPad,u=rx(s[0].dims,s[1].dims,n.strides,n.dilations,o,!1,i),a.compute(rk(s,r,u.outShape,[u.filterDepth,u.filterHeight,u.filterWidth],[u.padInfo.front,u.padInfo.top,u.padInfo.left],i))}else{let i=rz(t,e.inputs);rC(e,e.inputs,i)}}}),sP=q(()=>{"use strict";so(),sl(),sd(),s_(),rB=(e,t,i)=>{let r=e.length>2,a=t.outputShape,s="NHWC"===t.format,n=t.group,o=e[1].dims,u=o[2]/n,l=o[3],d=s?tb(u):1,p=s&&1===l&&u>=4,h=p?4*Math.floor(u/4):Math.floor(u/d)*d,c=u-h,f=s?tb(l):1,m=s?1===l?d:f:1,g=eQ.size(a)/f,_=[Math.ceil(g/64),1,1];eK("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${_}`);let y=["rank","rank"],$=[t.strides[0],t.strides[1]],b=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],v=[t.dilations[0],t.dilations[1]],w=[b[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),b[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],x=[w[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),w[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],k=[{type:12,data:g},{type:12,data:$},{type:12,data:b},{type:12,data:v},{type:12,data:w},{type:6,data:x},{type:12,data:h},{type:12,data:u},{type:12,data:l},...t$(e[0].dims,e[1].dims)];return r&&(k.push(...t$(e[2].dims)),y.push("rank")),k.push(...t$(a)),{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${d}${m}${f}${p}${c}`,inputDependencies:y},getRunData:()=>({dispatchGroup:{x:_[0],y:_[1],z:_[2]},outputs:[{dims:i?i(a):a,dataType:e[0].dataType}],programUniforms:k}),getShaderSource:t=>{let i=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:$.length},{name:"filter_dims",type:"u32",length:b.length},{name:"dilations",type:"u32",length:b.length},{name:"effective_filter_dims",type:"u32",length:w.length},{name:"pads",type:"i32",length:x.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],n=t_(e[0].dataType),o=s?1:2,u=s?2:3,l=s?3:1,h=tI("W",e[1].dataType,e[1].dims.length,m),g=tI("Dy",e[0].dataType,e[0].dims.length,d),_=[g,h];r&&_.push(tI("bias",e[2].dataType,[a[l]].length,f));let y=tT("result",e[0].dataType,a.length,f),v=`
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
                var w_offset = ${h.indicesToOffset(`${h.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${m};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:d}) {
                  ${(()=>{let e="";if(p)4===d?e+=`
        let xValue = ${g.getByOffset("x_offset")};
        let wValue = ${h.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:2===d?e+=`
          dotProd = dotProd + dot(vec4<${n}>(${g.getByOffset("x_offset")}, ${g.getByOffset("x_offset + 1u")}), vec4<${n}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:1===d&&(e+=`
          dotProd = dotProd + dot(vec4<${n}>(${g.getByOffset("x_offset")}, ${g.getByOffset("x_offset + 1u")}, ${g.getByOffset("x_offset + 2u")}, ${g.getByOffset("x_offset + 3u")}), vec4<${n}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}, ${h.getByOffset("w_offset + 2u")}, ${h.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(e+=`
                  let xValue = ${s?g.getByOffset(`${g.indicesToOffset(`${g.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d}`):g.get("batch","inputChannel","idyR","idyC")};
        `,1===d)e+=`
          let w_offset = ${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${h.getByOffset(`w_offset / ${m}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let t=0;t<d;t++)e+=`
            let wValue${t} = ${h.getByOffset(`${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${t}, wOutChannel)`)} / ${m}`)};
            dotProd = dotProd + xValue[${t}] * wValue${t};`;return e})()}
                  inputChannel = inputChannel + ${p?4:d};
                }
                ${(()=>{if(0===c)return"";if(!p)throw Error(`packInputAs4 ${p} is not true.`);let e="";if(1===d){e+="dotProd = dotProd";for(let t=0;t<c;t++)e+=`
            + ${g.getByOffset(`x_offset + ${t}`)} * ${h.getByOffset(`w_offset + ${t}`)}`;e+=";"}else if(2===d){if(2!==c)throw Error(`Invalid inputChannelsRemainder ${c}.`);e+=`
          let xValue = ${g.getByOffset("x_offset")};
          let wValue = ${h.getByOffset("w_offset")};
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
    ${v}}`}}}}),sq=q(()=>{"use strict";sP(),sE(),sy(),rA=(e,t,i,r,a,s)=>(e-1)*t+i+(r-1)*a+1-s,rR=(e,t,i,r,a)=>{let s=Math.floor(e/2);"SAME_UPPER"===t?(i[r]=s,i[a]=e-s):"SAME_LOWER"===t&&(i[r]=e-s,i[a]=s)},rD=(e,t)=>{let i=e.kernelShape.slice();if(0===e.kernelShape.length||0===e.kernelShape.reduce((e,t)=>e*t,1)){i.length=0;for(let e=2;e<t[1].dims.length;++e)i.push(t[1].dims[e])}let r="NHWC"===e.format;i.splice(0,0,t[1].dims[0]),i.splice(r?3:1,0,t[1].dims[1]);let a=e.pads.slice(),s=e.outputShape.slice(),n=e.outputPadding.slice(),o=t[0].dims,u=e.dilations.slice();0===u.reduce((e,t)=>e+t,0)&&(u=Array(t[0].dims.length-2).fill(1));let l=e.strides.slice();0===l.reduce((e,t)=>e+t,0)&&(l=Array(t[0].dims.length-2).fill(1)),((e,t,i,r,a,s,n,o,u,l)=>{let d=e.length-2,p=0===l.length;u.length<d&&u.push(...Array(d-u.length).fill(0));let h=e[0],c=t[o?3:1]*a;for(let a=0,h=e.length-d-!!o;a<d;++a,++h){let o=e[h],c=p?o*n[a]:l[a];rR(rA(o,n[a],s[a],t[h],i[a],c),r,s,a,a+d),p&&l.push(n[a]*(o-1)+u[a]+(t[h]-1)*i[a]+1-s[a]-s[a+d])}l.splice(0,0,h),l.splice(o?3:1,0,c)})(o,i,u,e.autoPad,e.group,a,l,r,n,s);let d=Object.assign({},e);return Object.assign(d,{kernelShape:i,pads:a,outputPadding:n,outputShape:s,dilations:u,strides:l}),d},rM=e=>{let t=rl(e),i=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,s=e.group??1,n=e.kernelShape,o=e.pads,u=e.strides,l=e.wIsConst();return{autoPad:r,format:i,dilations:a,group:s,kernelShape:n,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:o,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},rU=(e,t,i,r)=>{let a=e.kernelCustomData.wT??e.compute(tA(t[1],[2,3,0,1]),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let s=[t[0],a];3===t.length&&s.push(t[2]),e.compute(rB(s,i,r),{inputs:s})},rP=(e,t)=>{if(((e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length&&3!==e[0].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==i))throw Error("invalid bias");let r=e[0].dims.length-2;if(t.dilations.reduce((e,t)=>e+t,0)>0&&t.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(t.strides.reduce((e,t)=>e+t,0)>0&&t.strides.length!==r)throw Error(`strides should be ${r}D`);if(t.pads.reduce((e,t)=>e+t,0)>0&&t.pads.length!==2*r)throw Error(`pads should be ${2*r}D`);if(t.outputPadding.length!==r&&0!==t.outputPadding.length)throw Error(`output_padding should be ${r}D`);if(t.kernelShape.reduce((e,t)=>e+t,0)>0&&0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape")})(e.inputs,t),3===e.inputs[0].dims.length){var i,r;let a,s,n,o,u,l,d,p;i=e,a="NHWC"===(r=t).format,s=[i.inputs[0].reshape(a?[i.inputs[0].dims[0],1,i.inputs[0].dims[1],i.inputs[0].dims[2]]:[i.inputs[0].dims[0],i.inputs[0].dims[1],1,i.inputs[0].dims[2]]),i.inputs[1].reshape([i.inputs[1].dims[0],i.inputs[1].dims[1],1,i.inputs[1].dims[2]])],3===i.inputs.length&&s.push(i.inputs[2]),(0===(n=r.kernelShape).length||0===n[0])&&(n=[i.inputs[1].dims[2]]),(0===(o=r.dilations).length||0===o[0])&&(o=[1]),(0===(u=r.strides).length||0===u[0])&&(u=[1]),0===(l=r.pads).length&&(l=[0,0]),l=[0,l[0],0,l[1]],u=[1].concat(u),o=[1].concat(o),n=[1].concat(n),d=[0].concat(d=r.outputPadding),p=rD({...r,pads:l,strides:u,dilations:o,kernelShape:n,outputPadding:d},s),rU(i,s,p,e=>a?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])}else{let i=rD(t,e.inputs);rU(e,e.inputs,i)}}}),sN=q(()=>{"use strict";so(),sd(),sg(),s_(),rq=(e,t)=>{var i,r,a,s;let n,o,u,l,d,p,h=e.inputs[0].dims,c=e.inputs[0].dataType,f=e.inputs[1];e.compute((i=c,r=h,a=f,s=t,n=eQ.size(r),o=r.length,u=tI("input",i,o),l=tT("output",i,o),d=6===a.dataType?a.getInt32Array()[0]:Number(a.getBigInt64Array()[0]),p=eQ.normalizeAxis(d,o),{name:"CumSum",shaderCache:{hint:s.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:p},...t$(r,r)]}),getShaderSource:e=>{let t=` i32(${u.indicesGet("inputIndices","uniforms.axis")}) `,i=tk("uniforms.input_shape","uniforms.axis",o),r=s.reverse?t+(s.exclusive?" + 1":""):"0",a=s.reverse?i:t+(s.exclusive?"":" + 1");return`
                ${e.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(u,l)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${l.offsetToIndices("global_idx")};
                  var sum = ${l.type.value}(0);
                  let first : i32 = ${r};
                  let last : i32 = ${a};
                  for (var i : i32 = first; i < last; i++) {
                    ${u.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${u.getByIndices("inputIndices")};
                  }
                  ${l.setByOffset("global_idx","sum")};
                }`}}),{inputs:[0]})},rN=e=>{let t=1===e.exclusive,i=1===e.reverse;return tf({exclusive:t,reverse:i})}}),sL=q(()=>{"use strict";so(),sd(),sg(),s_(),rL=(e,t)=>{var i,r;let a,s,n,o,u,l,d,p,h,c,f,m,g,_;(e=>{if(!e||1!==e.length)throw Error("DepthToSpace requires 1 input.");if(4!==e[0].dims.length)throw Error("DepthToSpace requires 4D input.")})(e.inputs),e.compute((i=e.inputs[0],d="NHWC"===(r=t).format,p=r.blocksize,h="DCR"===r.mode,d?([a,s,n,o]=i.dims,u=h?[a,s,n,p,p,o/p**2]:[a,s,n,o/p**2,p,p],l=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([a,s,n,o]=[i.dims[0],i.dims[2],i.dims[3],i.dims[1]],u=h?[a,p,p,o/p**2,s,n]:[a,o/p**2,p,p,s,n],l=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]),f=(c=i.reshape(u)).dims.length,m=i.dataType,g=tI("a",m,f),_=tT("output",m,f),{name:"DepthToSpace",shaderCache:{hint:`${i.dims};${r.blocksize};${r.mode}`,inputDependencies:["rank"]},getRunData:e=>{let t=d?[a,s*p,n*p,o/p**2]:[a,o/p**2,s*p,n*p],i=eQ.size(t),r=c.dims,u=eQ.sortBasedOnPerm(r,l);return{outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...t$(r,u)]}},getShaderSource:e=>`
  ${e.registerUniform("output_size","u32").declareVariables(g,_)}

  ${((e,t,i,r)=>{let a=[];a.push(`fn perm(i: ${r.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`);for(let r=0;r<t;++r)a.push(i.indicesSet("a",e[r],`i[${r}]`));return a.push("return a;}"),a.join(`
`)})(l,f,g,_)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`}))},rV=e=>tf({blocksize:e.blocksize,mode:e.mode,format:e.format})}),sV=q(()=>{"use strict";so(),sd(),sg(),s_(),rH="^"+(rW="("+(rG="[a-zA-Z]|\\.\\.\\.")+")+")+"$",rF="^"+("("+rW+",)*")+rW+"$",rK=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let i=this.symbolToIndices.get(e);void 0===i?i=[t]:i.push(t),this.symbolToIndices.set(e,i)}},rj=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[i,r]=t.includes("->")?t.split("->",2):[t,""];if(!i.match(RegExp(rF)))throw Error("Invalid LHS term");if(i.split(",").forEach((t,i)=>{let r=e[i].dims.slice();if(!t.match(RegExp(rH)))throw Error("Invalid LHS term");let a=this.processTerm(t,!0,r,i);this.lhs.push(a)}),""===r)r+=[...this.symbolToInfo.entries()].filter(([e,t])=>1===t.count||"..."===e).map(([e])=>e).join("");else if(!r.match(RegExp(rW)))throw Error("Invalid RHS");r.match(RegExp(rG,"g"))?.forEach(e=>{if("..."===e)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let t=this.symbolToInfo.get(e);if(void 0===t)throw Error("Invalid RHS symbol");this.outputDims.push(t.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,i){let r=this.symbolToInfo.get(e);if(void 0!==r){if(r.dimValue!==t&&1!==r.count)throw Error("Dimension mismatch");r.count++,r.inputIndices.push(i)}else r={count:1,dimValue:t,inputIndices:[i]};this.symbolToInfo.set(e,r)}processTerm(e,t,i,r=-1){let a=i.length,s=!1,n=[],o=0;if(!e.match(RegExp(rH))&&!t&&""!==e)throw Error("Invalid LHS term");let u=e.match(RegExp(rG,"g")),l=new rK(r);return u?.forEach((e,d)=>{if("..."===e){if(s)throw Error("Only one ellipsis is allowed per input term");s=!0;let e=a-u.length+1;if(e<0)throw Error("Ellipsis out of bounds");if(n=i.slice(o,o+e),this.hasEllipsis){if(this.ellipsisDims.length!==n.length||this.ellipsisDims.toString()!==n.toString())throw Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=n;else throw Error("Ellipsis must be specified in the LHS");for(let e=0;e<n.length;e++){let t=String.fromCharCode(48+e);l.addSymbol(t,d+e),this.addSymbol(t,i[o++],r)}}else l.addSymbol(e,d+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,i[o++],r)}),l}},rZ=(e,t)=>{var i,r,a,s;let n,o,u,l,d=new rj(e.inputs,t.equation),p=d.outputDims,h=e.inputs.map((e,t)=>e.dims);e.compute((i=h,r=e.inputs[0].dataType,a=d,s=p,n=i.map(e=>e.length).map((e,t)=>tI(`input${t}`,r,e)),o=eQ.size(s),u=tT("output",r,s.length),l=[...a.symbolToInfo.keys()].filter(e=>!a.rhs.symbolToIndices.has(e)),{name:"Einsum",shaderCache:{hint:a.equation,inputDependencies:i.map(()=>"rank")},getRunData:()=>{let e=l.filter(e=>a.symbolToInfo.has(e)).map(e=>({type:12,data:a.symbolToInfo.get(e)?.dimValue||0}));e.push({type:12,data:o});let t=i.map((e,t)=>[...t$(e)]).reduce((e,t)=>e.concat(t),e);return t.push(...t$(s)),{outputs:[{dims:s,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:t}},getShaderSource:e=>{let t=[],i=[],r=[],s=[],o=[],d=a.symbolToInfo.size===a.rhs.symbolToIndices.size;a.symbolToInfo.forEach((e,l)=>{if(a.rhs.symbolToIndices.has(l)){let i=a.rhs.symbolToIndices.get(l)?.[0];void 0!==i&&a.lhs.forEach((r,a)=>{if(e.inputIndices.includes(a)){let e=r.symbolToIndices.get(l);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{t.push(`${n[a].indicesSet(`input${a}Indices`,e,u.indicesGet("outputIndices",i))}`)})}})}else a.lhs.forEach((t,r)=>{if(e.inputIndices.includes(r)){let e=t.symbolToIndices.get(l);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{i.push(`${n[r].indicesSet(`input${r}Indices`,e,`${l}`)}`)}),o.push(`prod *= ${n[r].getByIndices(`input${r}Indices`)};`)}}),r.push(`for(var ${l}: u32 = 0; ${l} < uniforms.${l+"_max"}; ${l}++) {`),s.push("}")});let p=d?[...t,`let sum = ${n.map((e,t)=>e.getByIndices(`input${t}Indices`)).join(" * ")};`]:[...t,"var sum = 0.0;",...r,...i,"var prod = 1.0;",...o,"sum += prod;",...s];return`
            ${e.registerUniforms(l.map(e=>({name:`${e+"_max"}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,u)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u.offsetToIndices("global_idx")};
            ${n.map((e,t)=>`var input${t}Indices: ${n[t].type.indices};`).join(`
`)}
            ${p.join(`
`)};
            ${u.setByOffset("global_idx","sum")};
          }`}}))},rQ=e=>{let t=e.equation.replace(/\s+/g,"");return tf({equation:t})}}),sG=q(()=>{"use strict";so(),sd(),s_(),rX=(e,t)=>{let i=e.length-t.length,r=[];for(let t=0;t<i;++t)r.push(e[t]);for(let a=0;a<t.length;++a)r.push(1===t[a]?e[a+i]:t[a]);return r},rY=e=>{var t;let i,r,a,s,n,o,u,l,d,p;(e=>{if(!e||2!==e.length)throw Error("Expand requires 2 input.");let t=e[0].dims,i=Array.from(e[1].getBigInt64Array(),Number),r=i.length<t.length?0:i.length-t.length,a=t.length<i.length?0:t.length-i.length;for(;r<i.length&&a<t.length;++r,++a)if(i[r]!==t[a]&&1!==i[r]&&1!==t[a])throw Error("Expand requires shape to be broadcastable to input")})(e.inputs),e.compute((s=(i=a=(t=e.inputs)[0].dims,r=Array.from(t[1].getBigInt64Array(),Number),i.length>r.length?rX(i,r):rX(r,i)),o=9===(n=t[0].dataType)||1===eQ.size(a),u=9===n||a.length>0&&a[a.length-1]%4==0?4:1,l=o||s.length>0&&s[s.length-1]%4==0?4:1,p=[{type:12,data:d=Math.ceil(eQ.size(s)/l)},...t$(a,s)],{name:"Expand",shaderCache:{hint:`${s.length};${u}${l}`,inputDependencies:["rank"]},getShaderSource:e=>{let t=tI("input",n,a.length,u),i=tT("output",n,s.length,l),r;if(9===n){let e=(e,r,a="")=>`
          let outputIndices${r} = ${i.offsetToIndices(`outputOffset + ${r}u`)};
          let offset${r} = ${t.broadcastedIndicesToOffset(`outputIndices${r}`,i)};
          let index${r} = offset${r} / 4u;
          let component${r} = offset${r} % 4u;
          ${e}[${r}] = ${a}(${t.getByOffset(`index${r}`)}[component${r}]);
        `;r=`
        let outputOffset = global_idx * ${l};
        var data = vec4<u32>(0);
        ${e("data",0,"u32")}
        ${e("data",1,"u32")}
        ${e("data",2,"u32")}
        ${e("data",3,"u32")}
        ${i.setByOffset("global_idx","data")}
      }`}else r=`
        let outputIndices = ${i.offsetToIndices(`global_idx * ${l}`)};
        let inputOffset = ${t.broadcastedIndicesToOffset("outputIndices",i)};
        let data = ${i.type.value}(${t.getByOffset(`inputOffset / ${u}`)});
        ${i.setByOffset("global_idx","data")}
      }`;return`
    ${e.registerUniform("vec_size","u32").declareVariables(t,i)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${r}`},getRunData:()=>({outputs:[{dims:s,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p})}),{inputs:[0]})}}),sW=q(()=>{"use strict";so(),sd(),s_(),sS(),rJ=e=>{var t;let i,r,a,s;e.inputs.length<2||0===eQ.size(e.inputs[1].dims)?iX(e):e.compute((i=(t=e.inputs)[0].dataType,r=eQ.size(t[0].dims),s=(a=eQ.size(t[1].dims))%4==0,{name:"FastGeluWithBias",shaderCache:{hint:`${s}`,inputDependencies:["type","type"]},getShaderSource:e=>{let t=tI("x",i,[1],4),r=tI("bias",i,[1],4),a=tT("y",i,[1],4),n=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${r.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,o=s?`
      let bias = ${r.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${n(0)}${n(1)}${n(2)}${n(3)}
      let bias = ${t.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms([{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}]).declareVariables(t,r,a)}

    ${iZ(ty(i))}

    ${e.mainStart(tm)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${t.getByOffset("global_idx")};
      ${o}
      let x_in = x + bias;
      ${a.setByOffset("global_idx",iQ("x_in"))}
    }`},getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:a}],dispatchGroup:{x:Math.ceil(r/tm/4)}})}))}}),sH=q(()=>{"use strict";so(),sd(),sg(),s_(),r0=e=>tf({axis:e.axis}),r1=(e,t)=>{var i,r;let a,s,n,o,u,l,d,p,h;(e=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.")})(e.inputs),e.compute((i=e.inputs,r=t,a=i[0].dims,s=i[1].dims,n=a.length,o=eQ.normalizeAxis(r.axis,n),(u=a.slice(0)).splice(o,1,...s),l=a[o],d=9===i[0].dataType?4:1,h=[{type:12,data:p=Math.ceil(eQ.size(u)/d)},{type:6,data:l},{type:12,data:o},...t$(i[0].dims,i[1].dims,u)],{name:"Gather",shaderCache:{hint:r.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:u,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h}),getShaderSource:e=>{let t=tI("data",i[0].dataType,i[0].dims.length,d),r=tI("inputIndices",i[1].dataType,i[1].dims.length),a=tT("output",i[0].dataType,u.length,d),l=e=>{let i=s.length,a=`var indicesIndices${e}  = ${r.type.indices}(0);`;for(let t=0;t<i;t++)a+=`${i>1?`indicesIndices${e}[${t}]`:`indicesIndices${e}`} = ${u.length>1?`outputIndices${e}[uniforms.axis + ${t}]`:`outputIndices${e}`};`;a+=`
          var idx${e} = ${r.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${t.type.indices};
        `;for(let t=0,r=0;t<n;t++)t===o?(a+=`${n>1?`dataIndices${e}[${t}]`:`dataIndices${e}`} = u32(idx${e});`,r+=i):(a+=`${n>1?`dataIndices${e}[${t}]`:`dataIndices${e}`} = ${u.length>1?`outputIndices${e}[${r}]`:`outputIndices${e}`};`,r++);return a},p;if(9===i[0].dataType){let e=(e,i,r="")=>`
          let outputIndices${i} = ${a.offsetToIndices(`outputOffset + ${i}u`)};
          ${l(i)};
          let offset${i} = ${t.indicesToOffset(`dataIndices${i}`)};
          let index${i} = offset${i} / 4u;
          let component${i} = offset${i} % 4u;
          ${e}[${i}] = ${r}(${t.getByOffset(`index${i}`)}[component${i}]);
        `;p=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${e("value",0,"u32")}
        ${e("value",1,"u32")}
        ${e("value",2,"u32")}
        ${e("value",3,"u32")}
        ${a.setByOffset("global_idx","value")}
      `}else p=`
      let outputIndices = ${a.offsetToIndices("global_idx")};
      ${l("")};
      let value = ${t.getByIndices("dataIndices")};
      ${a.setByOffset("global_idx","value")};
      `;return`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(t,r,a)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${p}
      }`}}))}}),sF=q(()=>{"use strict";so(),sd(),s_(),r2=(e,t)=>{var i,r,a,s,n,o;let u,l,d=e.inputs,p=d[0].dims,h=d[0].dataType,c=d[1].dims,f=c[c.length-1],m=eQ.sizeToDimension(c,c.length-1),g=eQ.sizeFromDimension(p,t.batchDims+f),_=eQ.sizeToDimension(p,t.batchDims),y=eQ.sizeFromDimension(p,t.batchDims),$=Array(f),b=g;for(let e=0;e<f;++e)$[f-1-e]=b,b*=p[t.batchDims+f-1-e];let v=(i=e,r=d[1],a=$,s=t.batchDims,n=p,u=[{type:12,data:o=m},{type:12,data:s},{type:12,data:n},{type:12,data:a},{type:12,data:m/_},{type:12,data:y},{type:12,data:f}],l=[o],u.push(...t$(r.dims,l)),i.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${a.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:l,dataType:i.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:e=>{let t=tI("indices_data",r.dataType,r.dims.length),i=tT("input_slice_offsets_data",12,1,1),s=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:a.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${e.registerUniforms(s).declareVariables(t,i)}
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
        ${1===n.length?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${1===a.length?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[r],outputs:[-1]})[0]),w=t.batchDims+f;if(w>p.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let x=c.slice(0,-1).concat(p.slice(w)),k=eQ.size(x),S=[{type:12,data:k},{type:12,data:g},...t$(d[0].dims,v.dims,x)];e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:h}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:S}),getShaderSource:e=>{let t=tI("data",d[0].dataType,d[0].dims.length),i=tI("slice_offsets",12,v.dims.length),r=tT("output",d[0].dataType,x.length);return`
          ${e.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(t,i,r)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[d[0],v]})},r3=e=>({batchDims:e.batch_dims,cacheKey:""})}),sK=q(()=>{"use strict";so(),sd(),sg(),s_(),r4=(e,t)=>{var i,r;let a,s,n,o,u,l,d,p,h,c;((e,t)=>{if(e.length<3||e.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let i=eQ.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,a=e[0],s=e[2],n=4===e.length?e[3]:void 0;if(s.dims.length!==a.dims.length||!a.dims.map((e,t)=>t===i?Math.ceil(e/r)===s.dims[t]:e===s.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(n){if(n.dataType!==a.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(n.dims.length!==s.dims.length||!n.dims.map((e,t)=>e===s.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}})(e.inputs,t),e.compute((i=e.inputs,r=t,a=i[0].dims,s=i[1].dims,n=a.length,o=eQ.normalizeAxis(r.gatherAxis,n),u=eQ.normalizeAxis(r.quantizeAxis,n),(l=a.slice(0)).splice(o,1,...s),d=eQ.size(l),p=i[2].dataType,h=22===i[0].dataType,c=[{type:12,data:d},{type:12,data:u},{type:12,data:o},{type:12,data:r.blockSize},...t$(...i.map((e,t)=>e.dims),l)],{name:"GatherBlockQuantized",shaderCache:{hint:`${r.cacheKey};${i.filter((e,t)=>1!==t).map(e=>e.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:i.length},(e,t)=>"rank")},getRunData:()=>({outputs:[{dims:l,dataType:p}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:e=>{let t=tI("data",i[0].dataType,i[0].dims.length),r=tI("inputIndices",i[1].dataType,i[1].dims.length),n=tI("scales",i[2].dataType,i[2].dims.length),u=i.length>3?tI("zeroPoint",i[3].dataType,i[3].dims.length):void 0,d=tT("output",p,l.length),c=[t,r,n];return u&&c.push(u),`
        ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...c,d)}
        ${e.mainStart()}
        let output_indices = ${d.offsetToIndices("global_idx")};
        var indices_indices = ${r.type.indices}(0);
        ${s.length>1?`
          for (var i: u32 = 0; i < ${s.length}; i++) {
            let index = ${d.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${r.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${d.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${t.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${d.indicesGet("output_indices","i")};
          ${t.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${r.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${a[o]};
        }
        ${t.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${l.length}; i++) {
          let index = ${d.indicesGet("output_indices",`i + ${s.length} - 1`)};
          ${t.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${t.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${t.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${n.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${n.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${n.getByIndices("scale_indices")};
        ${u?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${u.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${u.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${ty(p)}(quantized_data - zero_point) * scale;
        ${d.setByOffset("global_idx","dequantized_data")};
    }`}}))},r6=e=>tf({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),sj=q(()=>{"use strict";so(),sd(),sg(),s_(),r8=e=>tf({axis:e.axis}),r5=(e,t)=>{var i,r;let a,s,n,o,u,l,d,p,h,c,f,m,g;(e=>{if(!e||2!==e.length)throw Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)})(e.inputs),e.compute((i=e.inputs,r=t,a=i[0].dims,s=i[0].dataType,n=a.length,o=i[1].dims,u=i[1].dataType,d=a[l=eQ.normalizeAxis(r.axis,n)],p=o.slice(0),h=eQ.size(p),c=tI("input",s,n),f=tI("indicesInput",u,o.length),m=tT("output",s,p.length),(g=[{type:12,data:h},{type:6,data:d},{type:12,data:l}]).push(...t$(a,o,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:e=>`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,f,m)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${m.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${m.setByOffset("global_idx","value")};
  }`}))}}),sZ=q(()=>{"use strict";so(),sd(),s_(),r7=e=>({transA:e.transA,transB:e.transB,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${1===e.alpha}`}),r9=(e,t)=>{(e=>{if(!e)throw Error("Input is missing");if(e.length<2||e.length>3)throw Error("Invaid input number.");if(3===e.length&&e[2].dims.length>2)throw Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||3===e.length&&e[0].dataType!==e[2].dataType)throw Error("Input types are mismatched")})(e.inputs),e.compute(((e,t)=>{let i=e[0].dims.slice(),r=e[1].dims.slice(),[a,s,n]=eY.getShapeOfGemmResult(i,t.transA,r,t.transB,3===e.length?e[2].dims:void 0),o=[a,s];if(!o)throw Error("Can't use gemm on the given tensors");let u=Math.ceil(s/16),l=Math.ceil(a/16),d=(eQ.size(o),[{type:12,data:u},{type:12,data:a},{type:12,data:s},{type:12,data:n},{type:1,data:t.alpha},{type:1,data:t.beta}]),p=["type","type"];return 3===e.length&&(d.push(...t$(e[2].dims)),p.push("rank")),d.push(...t$(o)),{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:u*l},programUniforms:d}),getShaderSource:i=>{let r=tI("a",e[0].dataType,e[0].dims),a=tI("b",e[1].dataType,e[1].dims),s=null,n=[r,a];3===e.length&&(s=tI("c",e[2].dataType,e[2].dims.length),n.push(s));let u=tT("output",e[0].dataType,o.length);n.push(u);let l="",d="";t.transA&&t.transB?(d=`
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
  }`}}})(e.inputs,t))}}),sQ=q(()=>{"use strict";so(),sd(),sg(),s_(),[ae,at,ai,ar]=[0,1,2,3],aa=`
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
`,as=(e,t)=>{var i,r;let a,s,n,o,u,l,d;(e=>{if(4!==e[0].dims.length)throw Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw Error("grid batch size must match input batch size")})(e.inputs),e.compute((i=e.inputs,r=t,a=tI("x",i[0].dataType,i[0].dims.length),s=[i[1].dims[0],i[1].dims[1],i[1].dims[2]],n=tI("grid",i[1].dataType,s.length,2),o=[i[0].dims[0],i[0].dims[1],i[1].dims[1],i[1].dims[2]],"NHWC"===r.format&&(o=[i[0].dims[0],i[1].dims[1],i[1].dims[2],i[0].dims[3]],[ae,at,ai,ar]=[0,3,1,2]),u=tT("output",i[0].dataType,o.length),l=a.type.value,d=[{type:12,data:eQ.size(o)},...t$(i[0].dims,s,o)],{name:"GridSample",shaderCache:{hint:`${r.cacheKey}`,inputDependencies:["type","type"]},getRunData:e=>{let t=eQ.size(o);return{outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:d}},getShaderSource:e=>{let t,i,s,o,d,p,h,c,f;return`
  ${e.registerUniform("output_size","u32").declareVariables(a,n,u)}
  ${aa}
  ${t=l,`
  fn gs_bicubic_interpolate(p: mat4x4<${t}>, x: f32, y: f32) -> ${t} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${t}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`}
  ${i=r,`
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
  ${s=r,`
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
  ${o=a,d=l,p=r,`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${d} {
     var pixel = ${d}(0);
     var indices = vec4<u32>(0);
     indices[${ae}] = batch;
     indices[${at}] = channel;`+(()=>{switch(p.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${ai}] = u32(r);
            indices[${ar}] = u32(c);
          } else {
            return ${d}(0);
          }
        `;case"border":return`
          indices[${ai}] = u32(clamp(r, 0, H - 1));
          indices[${ar}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${ai}] = gs_reflect(r, border[1], border[3]);
          indices[${ar}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${p.paddingMode} is not supported`)}})()+`
    return ${o.getByIndices("indices")};
  }
`}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${ai}]);
      let W_in = i32(uniforms.x_shape[${ar}]);

      ${0===r.alignCorners?`
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

      let indices = ${u.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${ae}], indices[${ai}], indices[${ar}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${h=u,c=l,f=r,(()=>{switch(f.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${ae}], indices[${at}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${ae}], indices[${at}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${ae}], indices[${at}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${ae}], indices[${at}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${ae}], indices[${at}], border);

          let dx2 = ${c}(f32(x2) - x);
          let dx1 = ${c}(x - f32(x1));
          let dy2 = ${c}(f32(y2) - y);
          let dy1 = ${c}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${c}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${ae}], indices[${at}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${f.mode} is not supported`)}})()+`${h.setByOffset("global_idx","result")}`}
  }`}}))},an=e=>tf({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),sX=q(()=>{"use strict";so(),sd(),sg(),sf(),sw(),s_(),sy(),ao=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,au=e=>tf({...e}),al=tf({perm:[0,2,1,3]}),ad=(e,t,i,r,a,s,n,o)=>{var u,l,d,p,h,c,f;let m,g,_,y=s;if(!(n&&eQ.size(n.dims)>0))return 3===s.dims.length&&(y=s.reshape([t,r,i,a])),1===i||1===r?y:e.compute(tA(y,al.perm),{inputs:[y],outputs:[-1]})[0];if(1===r)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return y=(u=e,l=s,d=n,p=t,h=r,c=i*a,f=o,m=[p,h,c],_=[{type:12,data:g=eQ.size(m)},{type:12,data:f},{type:12,data:c}],y=u.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:m,dataType:l.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:e=>{let t=tT("qkv_with_bias",l.dataType,m),i=tI("qkv",l.dataType,m),r=tI("bias",d.dataType,m);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}]).declareVariables(i,r,t)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[l,d],outputs:[-1]})[0]).reshape([t,r,i,a]),1===i||1===r?y:e.compute(tA(y,al.perm),{inputs:[y],outputs:[-1]})[0]},ap=(e,t)=>{let i=((e,t)=>{let i,r=e[0],a=ao(e,1),s=ao(e,2),n=ao(e,3),o=ao(e,4),u=ao(e,5),l=ao(e,6),d=ao(e,7);if(3!==r.dims.length&&5!==r.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let p=r.dims[0],h=r.dims[1],c=3===r.dims.length?r.dims[2]:t.numHeads*r.dims[4],f=h,m=0,g=0,_=Math.floor(c/t.numHeads);if(l&&d&&eQ.size(l.dims)&&eQ.size(d.dims)){if(4!==l.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==p||l.dims[1]!==t.numHeads||l.dims[3]!==_)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==_)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==d.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');m=l.dims[2],g=l.dims[2]}else if(l&&eQ.size(l.dims)||d&&eQ.size(d.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(a&&eQ.size(a.dims)>0){if(3!==r.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==a.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===a.dims.length){if(a.dims[2]!==r.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');i=2,f=a.dims[1]}else if(5===a.dims.length){if(a.dims[2]!==t.numHeads||2!==a.dims[3]||a.dims[4]!==_)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw Error('Expect "value" be none when "key" has packed kv format.');i=5,f=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==_)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');i=0,f=a.dims[2]}}else{if(5!==r.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||3!==r.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');i=3}if(n&&eQ.size(n.dims)>0){if(1!==n.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(a&&5===a.dims.length&&2===a.dims[3])throw Error("bias is not allowed for packed kv.")}let y=m+f,$=0;if(o&&eQ.size(o.dims)>0){$=8;let e=o.dims;throw 1===e.length?e[0]===p?$=1:e[0]===3*p+2&&($=3):2===e.length&&e[0]===p&&e[1]===y&&($=5),8===$?Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):Error("Mask not supported")}let b=!1,v=c;if(s&&eQ.size(s.dims)>0){if(3!==s.dims.length&&4!==s.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==s.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===s.dims.length){if(f!==s.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=s.dims[2]}else{if(f!==s.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');v=s.dims[1]*s.dims[3],b=!0}}if(o&&eQ.size(o.dims)>0)throw Error("Key padding mask is not supported");if(u&&eQ.size(u.dims)>0){if(4!==u.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==t.numHeads||u.dims[2]!==h||u.dims[3]!==y)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:h,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:y,maxSequenceLength:g,inputHiddenSize:0,hiddenSize:c,vHiddenSize:v,headSize:_,vHeadSize:Math.floor(v/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:b,qkvFormat:i}})(e.inputs,t),r=e.inputs[0],a=ao(e.inputs,1),s=ao(e.inputs,2),n=ao(e.inputs,3),o=ao(e.inputs,4),u=ao(e.inputs,5),l=ao(e.inputs,6),d=ao(e.inputs,7);if(5===r.dims.length)throw Error("Packed QKV is not implemented");if(a?.dims.length===5)throw Error("Packed KV is not implemented");let p=a&&s&&4===a.dims.length&&4===s.dims.length,h=ad(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,r,n,0);if(p)return il(e,h,a,s,o,void 0,l,d,u,i);if(!a||!s)throw Error("key and value must be provided");let c=ad(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.headSize,a,n,i.hiddenSize),f=ad(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.vHeadSize,s,n,2*i.hiddenSize);il(e,h,c,f,o,void 0,l,d,u,i)}}),sY=q(()=>{"use strict";so(),sd(),sg(),s_(),ah=(e,t)=>{let i=e[0].dims,r=eQ.size(i),a=e[0].dataType,s=eQ.normalizeAxis(t.axis,i.length),n=Array(t.numOutputs),o=tI("input",a,i.length),u=Array(t.numOutputs),l=[],d=[],p=0,h=[{type:12,data:r}];for(let r=0;r<t.numOutputs;r++){p+=t.splitSizes[r],u[r]=p;let o=i.slice();o[s]=t.splitSizes[r],d.push(o),n[r]=tT(`output${r}`,a,o.length),l.push({dims:d[r],dataType:e[0].dataType})}return h.push({type:12,data:u},...t$(i,...d)),{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:e=>{let t;return`
  ${e.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(o,...n)}
  ${t=u.length,`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${t}u; i += 1u ) {
    if (index < ${tk("uniforms.size_in_split_axis","i",t)}) {
        return i;
    }
    }
    return ${t}u;
}`}
  ${(e=>{let t=e.length,i=[];for(let r=0;r<t;++r){let a=e[r].setByIndices("indices","input[global_idx]");1===t?i.push(a):0===r?i.push(`if (output_number == ${r}u) { ${a} }`):r===t-1?i.push(`else { ${a} }`):i.push(`else if (output_number == ${r}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${i.join(`
`)}
      }`})(n)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${tk("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${o.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`},getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:h})}},ac=(e,t)=>{let i,r;var a,s,n=e.inputs;if(!n||n.length<1)throw Error("too few inputs");let o=1===e.inputs.length?t:(a=e.inputs,i=[],r=(s=t).numOutputs,a[1].dims[0]>0&&(a[1].getBigInt64Array().forEach(e=>i.push(Number(e))),r=i.length),tf({numOutputs:r,axis:s.axis,splitSizes:i}));e.compute(ah(e.inputs,o),{inputs:[0]})},af=e=>{let t=e.axis,i=e.splitSizes,r=e.numOutputs<0?i.length:e.numOutputs;if(r!==i.length)throw Error("numOutputs and splitSizes length must be equal");return tf({axis:t,numOutputs:r,splitSizes:i})}}),sJ=q(()=>{"use strict";so(),sd(),sg(),s_(),am=(e,t)=>{let{interleaved:i,numHeads:r,rotaryEmbeddingDim:a,scale:s}=t,n=e[0].dims[0],o=eQ.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],l=o/u,d=e[2].dims[1],p=0===a?2*d:l/r,h=[n,u,l/p,p-d],c=eQ.computeStrides(h),f=[{type:1,data:s},{type:12,data:h},{type:12,data:c},...3===e[0].dims.length?Array({type:12,data:[o,l,p,1]}):[],...4===e[0].dims.length?Array({type:12,data:[o,p,u*p,1]}):[],...t$(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)];return{name:"RotaryEmbedding",shaderCache:{hint:tf({interleaved:i}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:t=>{let r=tI("input",e[0].dataType,e[0].dims.length),a=tI("position_ids",e[1].dataType,e[1].dims.length),s=tI("cos_cache",e[2].dataType,e[2].dims.length),n=tI("sin_cache",e[3].dataType,e[3].dims.length),o=tT("output",e[0].dataType,e[0].dims.length);return t.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:c.length},{name:"input_output_strides",type:"u32",length:c.length}]),`
        ${t.declareVariables(r,a,s,n,o)}

        ${t.mainStart(tm)}
          let half_rotary_emb_dim = uniforms.${s.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${a.broadcastedIndicesToOffset("bsnh.xy",tT("",a.type.tensor,2))};
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
        }`},getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(eQ.size(h)/tm)},programUniforms:f})}},ag=(e,t)=>{((e,t)=>{let[i,r,a,s]=e,{numHeads:n,rotaryEmbeddingDim:o}=t;if(3!==i.dims.length&&4!==i.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${i.dims.length}`);if(!eQ.areEqual(r.dims,[])&&!eQ.areEqual(r.dims,[1])&&2!==r.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(2!==a.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(2!==s.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!eQ.areEqual(a.dims,s.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&0===n)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let u=i.dims[0],l=i.dims[i.dims.length-2],d=a.dims[0],p=eQ.sizeFromDimension(i.dims,1)/l,h=0===o?2*a.dims[1]:p/n;if(o>h)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===r.dims.length){if(u!==r.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(l!==r.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(h/2!==a.dims[1]&&o/2!==a.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(l>d)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")})(e.inputs,t),e.compute(am(e.inputs,t))}}),s0=q(()=>{"use strict";sg(),so(),sw(),sX(),sY(),sy(),sJ(),s_(),a_=tf({perm:[0,2,1,3]}),ay=(e,t,i)=>{let r=t,a=i.kvNumHeads;return 3===t.dims.length&&0!==i.kvSequenceLength&&(r=t.reshape([i.batchSize,i.kvSequenceLength,a,i.headSize]),r=e.compute(tA(r,a_.perm),{inputs:[r],outputs:[-1]})[0]),r},a$=(e,t)=>{let i=((e,t)=>{if(t.doRotary&&e.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let i=e[0],r=e[1],a=e[2],s=e[3],n=e[4];if(0!==t.doRotary&&e.length<=7)throw Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(-1!==t.localWindowSize)throw Error("Local attention is not supported");if(0!==t.softcap)throw Error("Softcap is not supported");if(0!==t.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==i.dims.length&&5!==i.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let o=i.dims[0],u=i.dims[1],l=3===i.dims.length?i.dims[2]:t.numHeads*i.dims[4],d=u,p=0,h=!r||0===r.dims.length,c=Math.floor(h?l/(t.numHeads+2*t.kvNumHeads):l/t.numHeads);h&&(l=c*t.numHeads);let f=s&&0!==s.dims.length,m=n&&0!==n.dims.length;if(f&&4===s.dims.length&&s.dims[0]===o&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===c)throw Error("BSNH pastKey/pastValue is not supported");if(f&&m){if(4!==s.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==n.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');p=s.dims[2]}else if(f||m)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let g=1;if(r&&r.dims.length>0){if(3!==i.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==r.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===r.dims.length){if(i.dims[2]%r.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');d=r.dims[1]}else if(5===r.dims.length){if(r.dims[2]!==t.numHeads||2!==r.dims[3]||r.dims[4]!==c)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw Error('Expect "value" be none when "key" has packed kv format.');d=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==c)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');d=r.dims[2]}}else{if(3!==i.dims.length&&5!==i.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===i.dims.length&&(i.dims[2]!==t.numHeads||3!==i.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let _=!1,y=t.kvNumHeads?c*t.kvNumHeads:l;if(a&&a.dims.length>0){if(3!==a.dims.length&&4!==a.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==a.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===a.dims.length){if(d!==a.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');y=a.dims[2]}else{if(d!==a.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');y=a.dims[1]*a.dims[3],_=!0}}let $=e.length>4?e[5]:void 0;if($&&1!==$.dims.length&&$.dims[0]!==o)throw Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:o,sequenceLength:u,pastSequenceLength:p,kvSequenceLength:d,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:l,vHiddenSize:y,headSize:c,vHeadSize:Math.floor(y/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:_,qkvFormat:g}})(e.inputs,t);if(5===e.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let r=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,n=e.inputs[3]&&0!==e.inputs[3].dims.length?e.inputs[3]:void 0,o=e.inputs[4]&&0!==e.inputs[4].dims.length?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,d=i.kvNumHeads?i.kvNumHeads:i.numHeads,p=tf({axis:2,numOutputs:3,splitSizes:[i.numHeads*i.headSize,d*i.headSize,d*i.headSize]}),[h,c,f]=a||s?[r,a,s]:e.compute(ah([r],p),{inputs:[r],outputs:[-1,-1,-1]}),m,g;if(t.doRotary){var _,y,$,b;let r,a,s,n=e.compute((_=i.batchSize,y=i.sequenceLength,$=u,b=l,r=[_*y],s=[{type:12,data:a=_*y},{type:12,data:y},{type:12,data:_}],{name:"GeneratePositionIds",shaderCache:{hint:`${_};${y}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:7}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s}),getShaderSource:e=>{let t=tI("seq_lens",$.dataType,$.dims),i=tI("total_seq_lens",b.dataType,b.dims),a=tT("pos_ids",7,r);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}]).declareVariables(t,i,a)}
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
  `}}),{inputs:[u,l],outputs:[-1]})[0],o=e.inputs[7],d=e.inputs[8],p=tf({interleaved:0!==t.rotaryInterleaved,numHeads:i.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),f=[h,n,o,d],v=[-1];m=e.compute(am(f,p),{inputs:f,outputs:v})[0],f.splice(0,1,c);let w=tf({interleaved:0!==t.rotaryInterleaved,numHeads:i.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});g=e.compute(am(f,w),{inputs:f,outputs:v})[0]}let v=ad(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,t.doRotary?m:h,void 0,0),w=ay(e,t.doRotary?g:c,i),x=ay(e,f,i);il(e,v,w,x,void 0,void 0,n,o,void 0,i,u,l)}}),s1=q(()=>{"use strict";so(),sd(),sy(),s_(),ab=(e,t,i,r,a,s,n,o)=>{let u=tb(s),l=1===u?"f32":`vec${u}f`,d=1===u?"vec2f":`mat2x${u}f`,p=a*n,h=64;1===p&&(h=256);let c=[a,n,s/u],f=[a,n,2],m=[];return m.push(...t$(c,f)),e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${o};${h}`,inputDependencies:["rank","type","type"]},getRunData:()=>({outputs:[{dims:f,dataType:1}],dispatchGroup:{x:p},programUniforms:m}),getShaderSource:e=>{let a=tI("x",t.dataType,3,u),s=[a,tI("scale",i.dataType,i.dims),tI("bias",r.dataType,r.dims),tT("output",1,3,2)];return`
  var<workgroup> workgroup_shared : array<${d}, ${h}>;
  const workgroup_size = ${h}u;
  ${e.declareVariables(...s)}
  ${e.mainStart(h)}
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
      let sum_final = ${tx("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${tx("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[t,i,r],outputs:[-1]})[0]},av=(e,t)=>{var i,r,a;let s,n,o,u,l,d,p,h,c;"NHWC"===t.format?((e,t,i)=>{let r=t[0].dims,a=r[0],s=r[r.length-1],n=eQ.sizeFromDimension(r,1)/s,o=tb(s),u=eQ.size(r)/o,l=[{type:12,data:n},{type:12,data:Math.floor(s/o)}],d=!1,p=[0,r.length-1];for(let e=0;e<r.length-2;e++)d=d||1!==r[e+1],p.push(e+1);let h=(d=d&&1!==r[r.length-1])?e.compute(tA(e.inputs[0],p),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(e,t)=>r[p[t]])),c=ab(e,h,t[1],t[2],a,n,s,i.epsilon);e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:e=>{let i=t_(t[0].dataType),a=1===o?"vec2f":`mat${o}x2f`,s=e=>{let t=0===e?"x":"y",r=1===o?"f32":`vec${o}f`;switch(o){case 1:return`${i}(${r}(scale.${t}))`;case 2:return`vec2<${i}>(${r}(scale[0].${t}, scale[1].${t}))`;case 4:return`vec4<${i}>(${r}(scale[0].${t}, scale[1].${t}, scale[2].${t}, scale[3].${t}))`;default:throw Error(`Not supported compoents ${o}`)}},n=tI("input",t[0].dataType,t[0].dims,o),u=tT("output",t[0].dataType,r,o);return`
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
  }`}},{inputs:[t[0],c]})})(e,e.inputs,t):(i=e,r=e.inputs,a=t,n=(s=r[0].dims)[0],o=s[1],u=eQ.sizeFromDimension(s,2),l=tb(u),d=eQ.size(s)/l,p=ab(i,r[0],r[1],r[2],n,u,o,a.epsilon),h=[n,o,u/l],c=[n,o],i.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:["type","none"]},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...t$(h,c,h)]}),getShaderSource:e=>{let t=tI("x",r[0].dataType,h.length,l),i=tI("scale_shift",1,c.length,2),a=tT("output",r[0].dataType,h.length,l),s=[t,i,a];return`
  ${e.registerUniform("output_size","u32").declareVariables(...s)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${a.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${i.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${t.getByOffset("global_idx")} * ${a.type.value}(scale_shift.x) + ${a.type.value}(scale_shift.y);
      ${a.setByOffset("global_idx","value")};
  }`}},{inputs:[r[0],p]}))}}),s2=q(()=>{"use strict";so(),sd(),s_(),aw=(e,t)=>{(e=>{if(!e||e.length<2)throw Error("layerNorm requires at least 2 inputs.")})(e.inputs),e.compute(((e,t,i)=>{let r=t.simplified,a=e[0].dims,s=e[1],n=!r&&e[2],o=eQ.normalizeAxis(t.axis,a.length),u=eQ.sizeToDimension(a,o),l=eQ.sizeFromDimension(a,o),d=eQ.size(s.dims),p=n?eQ.size(n.dims):0;if(d!==l||n&&p!==l)throw Error(`Size of X.shape()[axis:] == ${l}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${d} and bias size of ${p}`);let h=[];for(let e=0;e<a.length;++e)e<o?h.push(a[e]):h.push(1);let c=tb(l),f=["type","type"],m=[{type:12,data:u},{type:1,data:l},{type:12,data:Math.floor(l/c)},{type:1,data:t.epsilon}];n&&f.push("type");let g=i>1,_=i>2,y=[{dims:a,dataType:e[0].dataType}];return g&&y.push({dims:h,dataType:1}),_&&y.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${c};${i};${r}`,inputDependencies:f},getRunData:()=>({outputs:y,dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:t=>{let i=t_(e[0].dataType),o=[tI("x",e[0].dataType,e[0].dims,c),tI("scale",s.dataType,s.dims,c)];return n&&o.push(tI("bias",n.dataType,n.dims,c)),o.push(tT("output",e[0].dataType,a,c)),g&&o.push(tT("mean_data_output",1,h)),_&&o.push(tT("inv_std_output",1,h)),`
  ${t.registerUniforms([{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...o)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${tv("f32",c)};
    var mean_square_vector = ${tv("f32",c)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${tw(i,c,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${tx("mean_vector",c)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${tx("mean_square_vector",c)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${tw(i,c,"x[j + offset]")};
      let f32scale = ${tw(i,c,"scale[j]")};
      output[j + offset] = ${o[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${n?`+ ${tw(i,c,"bias[j]")}`:""}
      );
    }

    ${g?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`}}})(e.inputs,t,e.outputCount))}}),s3=q(()=>{"use strict";sd(),sB(),sA(),ax=e=>{var t=e.inputs;if(!t||2!==t.length)throw Error("MatMul requires 2 inputs.");if(t[0].dims[t[0].dims.length-1]!==t[1].dims[t[1].dims.length-2])throw Error("shared dimension does not match.");let i=eZ.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!i)throw Error("Can't use matmul on the given tensors");let r=i[i.length-1],a=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&a<8)e.compute(rf(e.inputs,{activation:""},i));else{let t=i[i.length-2],s=eQ.size(e.inputs[0].dims.slice(0,-2)),n=eQ.size(e.inputs[1].dims.slice(0,-2));if(1!==s&&1===t&&1===n){let t=e.inputs[0].reshape([1,s,a]),n=e.inputs[1].reshape([1,a,r]),o=[1,s,r],u=[t,n];e.compute(ry(u,{activation:""},i,o),{inputs:u})}else e.compute(ry(e.inputs,{activation:""},i))}}}),s4=q(()=>{"use strict";so(),sd(),sg(),s_(),ak=(e,t)=>{var i,r,a,s;let n,o,u,l,d,p,h,c,f,m,g,_,y,$,b,v,w,x,k,S,I,T,z,E,C,O,B,A,R,D,M,U,P,q,N,L,V,G,W,H,F;((e,t)=>{if(e.length<3||e.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let i=e[0],r=i.dims.length;if(i.dims[r-1]!==t.k)throw Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,n=e[1];if(!eQ.areEqual(n.dims,[t.n,a,s]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(eQ.size(o)!==t.n*a)throw Error("scales input size error.");if(4===e.length){let i=e[3].dims,r=t.n*(8===t.bits?a:Math.floor((a*t.bits+7)/8));if(eQ.size(i)!==r)throw Error("zeroPoints input size error.")}})(e.inputs,t),32===t.blockSize&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute((i=e.inputs,r=t,o=(n=i[0].dims).length,u=n[o-2],l=r.k,d=r.n,p=n.slice(0,o-2),h=eQ.size(p),c=i[1].dims[2]/4,f=i[0].dataType,m=tb(r.k),g=tb(c),_=p.concat([u,d]),v=(b=($=128/(y=d%8==0?8:d%4==0?4:1))*g*8)/m,w=b/r.blockSize,x=eQ.size(_)/y,k=[],S=[h,u,l/m],(I=eQ.convertShape(i[1].dims).slice()).splice(-1,1,c/g),k.push(...t$(S)),k.push(...t$(I)),k.push(...t$(i[2].dims)),4===i.length&&k.push(...t$(eQ.convertShape(i[3].dims))),T=[h,u,d],k.push(...t$(T)),{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${r.blockSize};${m};${g};${$};${y}`,inputDependencies:Array(i.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:f}],dispatchGroup:{x:x},programUniforms:k}),getShaderSource:e=>{let t=S.length,a=tI("a",i[0].dataType,t,m),s=tI("b",12,I.length,g),n=tI("scales",i[2].dataType,i[2].dims.length),o=[a,s,n],u=4===i.length?tI("zero_points",12,i[3].dims.length):void 0;u&&o.push(u);let l=T.length,d=tT("output",i[0].dataType,l),p=t_(i[0].dataType);return`
        var<workgroup> sub_a: array<${a.type.value}, ${v}>;
        var<workgroup> inter_results: array<array<${d.type.value}, ${$}>, ${y}>;
        ${e.declareVariables(...o,d)}
        ${e.mainStart([$,y,1])}
          let output_indices = ${d.offsetToIndices(`workgroup_index * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${w} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${v};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${v}; a_offset += 128)
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
            let block = tile * ${w} + local_id.x;
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
            var word_offset = local_id.x * ${r.blockSize/m};
            for (var i: u32 = 0; i < ${g}; i++) {
              ${(()=>{switch(m){case 1:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${m}-component is not supported.`)}})()}
              let b_value = ${1===g?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${p}>(${Array.from({length:4},(e,t)=>`${p}(b_value_lower[${t}]), ${p}(b_value_upper[${t}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${p}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(e,t)=>`dot(a_data${t}, b_dequantized_values[${t}])`).join(" + ")};
              word_offset += ${8/m};
            }
            workgroupBarrier();
          }

          if (local_idx < ${y}) {
            var output_value: ${d.type.value} = ${d.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${d.setByIndices(`${d.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`}})):e.compute((a=e.inputs,s=t,E=(z=a[0].dims).length,C=z[E-2],O=s.k,B=s.n,A=z.slice(0,E-2),R=eQ.size(A),D=a[1].dims[2]/4,M=a[0].dataType,U=tb(s.k),P=tb(D),q=tb(B),N=A.concat([C,B]),L=C>1&&B/q%2==0?2:1,V=eQ.size(N)/q/L,G=[],W=[R,C,O/U],(H=eQ.convertShape(a[1].dims).slice()).splice(-1,1,D/P),G.push(...t$(W)),G.push(...t$(H)),G.push(...t$(a[2].dims)),4===a.length&&G.push(...t$(eQ.convertShape(a[3].dims))),F=[R,C,B/q],G.push(...t$(F)),{name:"MatMulNBits",shaderCache:{hint:`${s.blockSize};${s.bits};${U};${P};${q};${L};64`,inputDependencies:Array(a.length).fill("rank")},getRunData:()=>({outputs:[{dims:N,dataType:M}],dispatchGroup:{x:V},programUniforms:G}),getShaderSource:e=>{let t=W.length,i=tI("a",a[0].dataType,t,U),r=tI("b",12,H.length,P),n=tI("scales",a[2].dataType,a[2].dims.length),o=[i,r,n],u=4===a.length?tI("zero_points",12,a[3].dims.length):void 0;u&&o.push(u);let l=F.length,d=tT("output",a[0].dataType,l,q),p=t_(a[0].dataType),h=(()=>{switch(U){case 1:return`array<${p}, 8>`;case 2:return`mat4x2<${p}>`;case 4:return`mat2x4<${p}>`;default:throw Error(`${U}-component is not supported.`)}})();return`
        var<workgroup> workgroup_shared: array<${d.type.value}, ${64*L}>;
        ${e.declareVariables(...o,d)}
        ${e.mainStart([64,1,1])}
          let output_indices = ${d.offsetToIndices(`(global_idx / 64) * ${L}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${s.blockSize/U};
            ${(()=>{let e=`
            var col_index = col * ${q};
            ${u?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${p}(8);`}
            `;for(let t=0;t<q*L;t++)e+=`
            let scale${t} = ${n.getByOffset("col_index * nBlocksPerCol + block")};
            ${u?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${u.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${t} = ${p}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return e})()}
            for (var word: u32 = 0; word < ${D}; word += ${P}) {
              ${(()=>{let e=`col_index = col * ${q};`;for(let t=0;t<q*L;t++)e+=`
            let b${t}_data = ${r.getByIndices(`${r.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return e+`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${h};
            var b_dequantized_values: ${h};`})()}
              for (var i: u32 = 0; i < ${P}; i++) {
                ${(()=>{let e=`
          // reuse a data
            var input_offset = ${i.indicesToOffset(`${i.type.indices}(batch, row, word_offset)`)};
            var a_data: ${h};
            for (var j: u32 = 0; j < ${8/U}; j++) {
              a_data[j] = ${i.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let t=0;t<q*L;t++)e+=`
            b_value = ${1===P?`b${t}_data`:`b${t}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${h}(${Array.from({length:4},(e,t)=>`${p}(b_value_lower[${t}]), ${p}(b_value_upper[${t}])`).join(", ")});
            b_dequantized_values = ${1===U?`${h}(${Array.from({length:8},(e,i)=>`(b_quantized_values[${i}] - ${u?`zero_point${t}`:"zero_point"}) * scale${t}`).join(", ")});`:`(b_quantized_values - ${h}(${Array(8).fill(`${u?`zero_point${t}`:"zero_point"}`).join(",")})) * scale${t};`};
            workgroup_shared[local_id.x * ${L} + ${Math.floor(t/q)}]${q>1?`[${t%q}]`:""} += ${Array.from({length:8/U},(e,t)=>`${1===U?`a_data[${t}] * b_dequantized_values[${t}]`:`dot(a_data[${t}], b_dequantized_values[${t}])`}`).join(" + ")};
          `;return e})()}
                word_offset += ${8/U};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${L}) {
            var output_value: ${d.type.value} = ${d.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${L};
            }
            ${d.setByIndices(`${d.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`}}))},aS=e=>tf(e)}),s6=q(()=>{"use strict";so(),sd(),s_(),aI=(e,t)=>{let i,r,a,s;var n,o,u=e.inputs;if(!u||u.length<1)throw Error("Too few inputs");if(1!==u[0].dataType&&10!==u[0].dataType)throw Error("Input type must be float or float16.");if(u.length>=2){let e=2*u[0].dims.length===u[1].dims[0];if(4===u.length&&(e=2*u[3].dims[0]===u[1].dims[0]),!e)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}let l=((e,t)=>{if(!(e.length>1))return t;{let i=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?10===e[2].dataType?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,s=new Int32Array(2*a).fill(0);if(e.length>=4){let t=e[3].getBigInt64Array();for(let e=0;e<t.length;e++)s[Number(t[e])]=Number(i[e]),s[Number(t[e])+a]=Number(i[e+t.length])}else i.forEach((e,t)=>s[Number(t)]=Number(e));let n=[];return s.forEach(e=>n.push(e)),{mode:t.mode,value:r,pads:n}}})(e.inputs,t);e.compute((n=e.inputs,o=l,i=eQ.padShape(n[0].dims.slice(),o.pads),r=n[0].dims,a=[{type:12,data:eQ.size(i)},{type:6,data:o.pads}],s=n.length>=3&&n[2].data,0===o.mode&&a.push({type:s?n[2].dataType:1,data:o.value}),a.push(...t$(n[0].dims,i)),{name:"Pad",shaderCache:{hint:`${o.mode}${s}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(eQ.size(i)/64)},programUniforms:a}),getShaderSource:e=>{let t=tT("output",n[0].dataType,i.length),a=tI("x",n[0].dataType,r.length),u=a.type.value,l=((e,t,i)=>{switch(i.mode){case 0:var r=e,a=t,s=i.pads.length;let n="";for(let e=a-1;e>=0;--e)n+=`
            k = i32(${r.indicesGet("indices",e)}) - ${tk("uniforms.pads",e,s)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${tk("uniforms.x_shape",e,a)})) {
              break;
            }
            offset += k * i32(${tk("uniforms.x_strides",e,a)});
        `;return`
          value = ${r.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `;case 1:var o=e,u=t,l=i.pads.length;let d="";for(let e=u-1;e>=0;--e)d+=`
                k = i32(${o.indicesGet("indices",e)}) - ${tk("uniforms.pads",e,l)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${tk("uniforms.x_shape",e,u)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${tk("uniforms.x_shape",e,u)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${tk("uniforms.x_strides",e,u)});
            `;return`
              var offset = 0;
              var k = 0;
              ${d}
              value = x[offset];
          `;case 2:var p=e,h=t,c=i.pads.length;let f="";for(let e=h-1;e>=0;--e)f+=`
                k = i32(${p.indicesGet("indices",e)}) - ${tk("uniforms.pads",e,c)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${tk("uniforms.x_shape",e,h)})) {
                  k = i32(${tk("uniforms.x_shape",e,h)}) - 1;
                }
                offset += k * i32(${tk("uniforms.x_strides",e,h)});
            `;return`
              var offset = 0;
              var k = 0;
              ${f}
              value = x[offset];
          `;case 3:var m=e,g=t,_=i.pads.length;let y="";for(let e=g-1;e>=0;--e)y+=`
                k = i32(${m.indicesGet("indices",e)}) - ${tk("uniforms.pads",e,_)};
                if (k < 0)  {
                  k += i32(${tk("uniforms.x_shape",e,g)}]);
                }
                if (k >= i32(${tk("uniforms.x_shape",e,g)})) {
                  k -= i32(${tk("uniforms.x_shape",e,g)});
                }
                offset += k * i32(${tk("uniforms.x_strides",e,g)});
            `;return`
              var offset = 0;
              var k = 0;
              ${y}
              value = x[offset];
          `;default:throw Error("Invalid mode")}})(t,r.length,o),d=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:o.pads.length}];return 0===o.mode&&d.push({name:"constant_value",type:s?u:"f32"}),`
            ${e.registerUniforms(d).declareVariables(a,t)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${t.offsetToIndices("global_idx")};

            var value = ${u}(0);
            ${l}
            output[global_idx] = value;
        }`}}),{inputs:[0]})}}),s8=q(()=>{"use strict";eo(),so(),sd(),s_(),aT=e=>{if(c.webgpu.validateInputContent&&(!e||1!==e.length))throw Error("Pool ops requires 1 input.")},az=(e,t,i)=>{let r="NHWC"===t.format,a=e.dims.slice();r&&a.splice(1,0,a.pop());let s=Object.hasOwnProperty.call(t,"dilations"),n=t.kernelShape.slice(),o=t.strides.slice(),u=s?t.dilations.slice():[],l=t.pads.slice();eX.adjustPoolAttributes(i,a,n,o,u,l);let d=eX.computePoolOutputShape(i,a,o,u,n,l,t.autoPad),p=Object.assign({},t);s?Object.assign(p,{kernelShape:n,strides:o,pads:l,dilations:u,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:n,strides:o,pads:l,cacheKey:t.cacheKey});let h=d.slice();return h.push(h.splice(1,1)[0]),[p,r?h:d]},aE=(e,t)=>{let i="NHWC"===t.format,r=[{type:12,data:eQ.size(e)},{type:12,data:eQ.size(t.kernelShape)}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let e=t.kernelShape[t.kernelShape.length-1],i=t.strides[t.strides.length-1],s=t.pads[t.pads.length/2-1],n=t.pads[t.pads.length-1],o=!!(s+n);r.push({type:12,data:e},{type:12,data:i},{type:12,data:s},{type:12,data:n}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let u=!1;if(2===t.kernelShape.length){let e=t.kernelShape[t.kernelShape.length-2],i=t.strides[t.strides.length-2],s=t.pads[t.pads.length/2-2],n=t.pads[t.pads.length-2];u=!!(s+n),r.push({type:12,data:e},{type:12,data:i},{type:12,data:s},{type:12,data:n}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[r,a,!0,o,u]}{if(i)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let e=eQ.computeStrides(t.kernelShape);return r.push({type:12,data:e},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:e.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length}),[r,a,!!t.pads.reduce((e,t)=>e+t),!1,!1]}},aC=(e,t,i,r,a,s,n,o,u,l,d,p)=>{let h="NHWC"===a.format,c=t.type.value,f=tT("output",t.type.tensor,r);if(a.kernelShape.length<=2){let r="",l="",m="",g=i-(h?2:1);if(r=d?`
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
                }`,2===a.kernelShape.length){let e=i-(h?3:2);l=p?`
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

              var value = ${c}(${o});
              var pad = 0;
              ${l}
              ${r}
              ${m}
              ${n}

              output[global_idx] = value;
            }`}{if(h)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let r=a.kernelShape.length,d=a.pads.length,p="";return p=l?`
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

              var value = ${c}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${r-1}u; j++) {
                  offsets[j] = offset / ${tk("uniforms.kernelStrides","j",r)};
                  offset -= offsets[j] * ${tk("uniforms.kernelStrides","j",r)};
                }
                offsets[${r-1}] = offset;

                isPad = false;
                for (var j = ${i-r}u; j < ${i}u; j++) {
                  xIndices[j] = indices[j] * ${tk("uniforms.strides",`j - ${i-r}u`,r)}
                    + offsets[j - ${i-r}u] - ${tk("uniforms.pads","j - 2u",d)};
                  ${p}
              }
              ${n}

              output[global_idx] = value;
            }`}},aO=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,aB=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),aA=(e,t,i,r)=>{let[a,s]=az(t,r,i),n=tI("x",t.dataType,t.dims.length),o=n.type.value,u="";a.countIncludePad?u+=`value /= ${o}(uniforms.kernelSize);`:u+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[l,d,p,h,c]=aE(s,a);return l.push(...t$(t.dims,s)),{name:e,shaderCache:{hint:`${r.cacheKey};${p};${h};${c}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(eQ.size(s)/64)},programUniforms:l}),getShaderSource:e=>aC(e,n,t.dims.length,s.length,a,"value += x_val;",u,0,d,p,h,c)}},aR=e=>{let t,i=0!==e.count_include_pad,r=aB(e);if(0!==r.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let a={countIncludePad:i,...r,cacheKey:""};return{...a,cacheKey:(t=a,`${aO(t)};${t.countIncludePad}`)}},aD=(e,t)=>{aT(e.inputs),e.compute(aA("AveragePool",e.inputs[0],!1,t))},aM={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},aU=e=>{let t=e.format;return{format:t,...aM,cacheKey:t}},aP=(e,t)=>{aT(e.inputs),e.compute(aA("GlobalAveragePool",e.inputs[0],!0,t))},aq=(e,t,i,r)=>{let[a,s]=az(t,r,i),n=`
      value = max(x_val, value);
    `,o=tI("x",t.dataType,t.dims.length),[u,l,d,p,h]=aE(s,a);return u.push(...t$(t.dims,s)),{name:e,shaderCache:{hint:`${r.cacheKey};${d};${p};${h}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(eQ.size(s)/64)},programUniforms:u}),getShaderSource:e=>aC(e,o,t.dims.length,s.length,a,n,"",10===t.dataType?-65504:-1e5,l,d,p,h)}},aN=(e,t)=>{aT(e.inputs),e.compute(aq("MaxPool",e.inputs[0],!1,t))},aL=e=>{let t,i=e.storage_order,r=e.dilations,a=aB(e);if(0!==i)throw Error("column major storage order is not yet supported for MaxPool");if(0!==a.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let s={storageOrder:i,dilations:r,...a,cacheKey:""};return{...s,cacheKey:(t=s,`${aO(t)};${t.storageOrder};${t.dilations}`)}},aV=e=>{let t=e.format;return{format:t,...aM,cacheKey:t}},aG=(e,t)=>{aT(e.inputs),e.compute(aq("GlobalMaxPool",e.inputs[0],!0,t))}}),s5=q(()=>{"use strict";so(),sd(),sg(),s_(),aW=(e,t)=>{var i,r;let a,s,n,o,u,l,d,p,h,c,f,m,g,_,y,$,b,v,w,x,k,S,I;((e,t)=>{if(e.length<2||e.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===e.length&&e[1].dims===e[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===e.length&&e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(6===e[0].dataType&&e.length>2)throw Error("In the case of dequantizing int32 there is no zero point.");if(0!==e[1].dims.length&&1!==e[1].dims.length&&e[1].dims.length!==e[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((t,i)=>t===e[2].dims[i]).reduce((e,t)=>e&&t,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(0===e[1].dims.length||1===e[1].dims.length&&1===e[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((i,r)=>r===t.axis||i===e[0].dims[r]).reduce((e,t)=>e&&t,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let i=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(i/r)||t.blockSize>Math.ceil(i/(r-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}})(e.inputs,t),e.compute((i=e.inputs,r=t,a=eQ.normalizeAxis(r.axis,i[0].dims.length),n=3===(s=i[0].dataType),o=i[0].dims,u=i[1].dataType,l=eQ.size(o),p=(d=3===s||2===s)?[Math.ceil(eQ.size(i[0].dims)/4)]:i[0].dims,h=i[1].dims,f=(c=i.length>2?i[2]:void 0)?d?[Math.ceil(eQ.size(c.dims)/4)]:c.dims:void 0,g=!1==(m=0===h.length||1===h.length&&1===h[0])&&1===h.length,_=tb(l),$=(y=m&&(!d||4===_))?_:1,b=tI("input",d?12:s,p.length,y&&!d?_:1),v=tI("scale",u,h.length),w=c?tI("zero_point",d?12:s,f.length):void 0,x=tT("output",u,o.length,$),k=[b,v],w&&k.push(w),S=[p,h],c&&S.push(f),I=[{type:12,data:l/$},{type:12,data:a},{type:12,data:r.blockSize},...t$(...S,o)],{name:"DequantizeLinear",shaderCache:{hint:r.cacheKey,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getShaderSource:e=>`
      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...k,x)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${x.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${b.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===$?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${b.getByOffset("global_idx")};`};

          // Set scale input
          ${m?`let scale_value= ${v.getByOffset("0")}`:g?`
            let scale_index = ${x.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${v.getByOffset("scale_index")};`:`
            var scale_indices: ${v.type.indices} = output_indices;
            let index = ${v.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${v.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${v.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${w?m?d?`
                let zero_point_input = ${w.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${w.getByOffset("0")}`:g?d?`
                let zero_point_index = ${x.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${w.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${x.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${w.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${v.indicesToOffset("scale_indices")};
                let zero_point_input = ${w.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${w.getByIndices("scale_indices")};`:`let zero_point_value = ${d?n?"i32":"u32":b.type.value}(0);`};
      // Compute and write output
      ${x.setByOffset("global_idx",`${x.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:o,dataType:u}],dispatchGroup:{x:Math.ceil(l/$/64),y:1,z:1},programUniforms:I})}))},aH=e=>tf({axis:e.axis,blockSize:e.blockSize})}),s7=q(()=>{"use strict";eo(),so(),s_(),aF=e=>{var t,i,r,a;let s,n,o,u=0,l=0,d=0;6===e.inputs[0].dataType?(u=e.inputs[0].getInt32Array()[0],l=e.inputs[1].getInt32Array()[0],d=e.inputs[2].getInt32Array()[0]):1===e.inputs[0].dataType&&(u=e.inputs[0].getFloat32Array()[0],l=e.inputs[1].getFloat32Array()[0],d=e.inputs[2].getFloat32Array()[0]),c.webgpu.validateInputContent&&((e,t,i)=>{if(e===t||e<t&&i<0||e>t&&i>0)throw Error("Range these inputs' contents are invalid.")})(u,l,d),e.compute((t=u,i=l,r=d,a=e.inputs[0].dataType,n=[s=Math.abs(Math.ceil((i-t)/r))],o=[{type:12,data:s},{type:a,data:t},{type:a,data:r},...t$(n)],{name:"Range",shaderCache:{hint:`${a}`},getShaderSource:e=>{let t=tT("output",a,n.length),i=t.type.value;return`
        ${e.registerUniforms([{name:"outputSize",type:"u32"},{name:"start",type:i},{name:"delta",type:i}]).declareVariables(t)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${i}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:o})}),{inputs:[]})}}),s9=q(()=>{"use strict";so(),sd(),sg(),s_(),aK=e=>tf({reduction:e.reduction}),aj=(e,t)=>{var i,r;let a,s,n,o,u,l;e.compute((i=e.inputs,r=t,a=i[0].dims,s=i[1].dims,n=Math.ceil(eQ.sizeToDimension(s,s.length-1)/1),o=s[s.length-1],u=eQ.sizeFromDimension(a,o),l=[{type:12,data:n},{type:12,data:o},{type:12,data:u},...t$(i[1].dims,i[2].dims,a)],{name:"ScatterND",shaderCache:{hint:`${r.cacheKey}_${r.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:l}),getShaderSource:e=>{let t=tI("indices",i[1].dataType,i[1].dims.length),s=tI("updates",i[2].dataType,i[2].dims.length,1),n="none"!==r.reduction&&""!==r.reduction?tz("output",i[0].dataType,a.length):tT("output",i[0].dataType,a.length,1);return`
      ${e.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(t,s,n)}
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
              }`;switch(e){case"none":return`${t}=${i};`;case"add":return"i32"===r||"u32"===r?`atomicAdd(&${t}, bitcast<${r}>(${i}));`:`
              ${a}bitcast<${r}>(oldValue) + (${i})${s}`;case"max":return"i32"===r||"u32"===r?`atomicMax(&${t}, bitcast<${r}>(${i}));`:`
                ${a}max(bitcast<f32>(oldValue), (${i}))${s}`;case"min":return"i32"===r||"u32"===r?`atomicMin(&${t}, bitcast<${r}>(${i}));`:`${a}min(bitcast<${r}>(oldValue), (${i}))${s}`;case"mul":return`${a}(bitcast<${r}>(oldValue) * (${i}))${s}`;default:throw Error(`Reduction ${e} is not supported.`)}})(r.reduction,"output[data_offset + i]","value",n.type.value)}
  }

      }`}}),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),ne=q(()=>{"use strict";so(),sd(),sg(),s_(),aZ=(e,t,i,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${i}));
  let fract = ${r}(big % (${i})) / ${r}(${i});
  return whole + fract;
`,aQ=(e,t,i,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",i,"batch")};
`:"",aX=(e,t)=>{var i,r,a,s,n,o,u,l,d,p,h,c;let f,m,g,_,y,$,b,v,w,x,k,S,I,T,z,E,C=[],O=[],B=[],A=new Uint32Array(f=e.customDataBuffer,f.byteOffset,1)[0];if(0!==t.antialias)throw Error("Only default value (0) for Antialias attribute is supported");((e,t,i,r,a,s)=>{let[n,o,u]=i>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(n>0&&e.length>n&&e[n].dims.length>0)e[n].getFloat32Array().forEach(e=>s.push(e));else if("tf_crop_and_resize"===t.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&1===e[o].dims.length&&e[o].dims[0]>0){var d,p,h;let a;if(e[o].getFloat32Array().forEach(e=>r.push(e)),0!==r.length&&r.length!==l&&i>=18&&r.length!==t.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");((e,t)=>{if(e.every(e=>e>0||(()=>{throw Error("Resize requires scales input values to be positive")})),e.length>0){if("linear"===t.mode){if(2!==e.length&&3!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3])&&(5!==e.length||1!==e[0]||1!==e[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===t.mode&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}})(r,t),t.axes.length>0&&(d=r,p=t.axes,h=l,p.every(e=>e>=0&&e<h||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")})),a=Array(h).fill(1),p.forEach((e,t)=>a[e]=d[t]),a).forEach((e,t)=>r[t]=e)}if(u>0&&e.length>u&&1===e[u].dims.length&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(e=>a.push(Number(e))),0!==a.length&&a.length!==l&&i>=18&&a.length!==t.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(0!==r.length&&r.length!==t.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==a.length&&a.length!==t.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if("u">typeof r&&"u">typeof a&&r.length>0&&a.length>l)throw Error("Resize requires only of scales or sizes to be specified")})(e.inputs,t,A,C,O,B),e.compute((i=e.inputs[0],r=t,a=A,s=C,n=O,o=B,_=i.dims,y=(u=o,l=r.axes,m=Array(d=_.length).fill(0).concat(Array(d).fill(1)),g=0===u.length?m:u.slice(),l.length>0?(l.forEach((e,t)=>{m[e]=g[t],m[t+d]=g[l.length+t]}),m):g),$=((e,t,i,r)=>{let a=[];if(i.length>0)if(r.length>0){if(e.forEach(e=>a.push(e)),Math.max(...r)>e.length)throw Error("axes is out of bound");r.forEach((e,t)=>a[e]=i[t])}else i.forEach(e=>a.push(e));else{if(0===t.length)throw Error("Resize requires either scales or sizes.");a=e.map((e,i)=>Math.round(e*t[i]))}return a})(_,s,n,r.axes),b=s.slice(),0===s.length&&(b=_.map((e,t)=>0===e?1:$[t]/e),"stretch"!==r.keepAspectRatioPolicy&&(p=_,h=b,c=r,v=(()=>{switch(c.keepAspectRatioPolicy){case"not_larger":return c.axes.length>0?Math.min(...c.axes.map(e=>h[e]),Number.MAX_VALUE):Math.min(...h,Number.MAX_VALUE);case"not_smaller":return c.axes.length>0?Math.max(...c.axes.map(e=>h[e]),5e-324):Math.max(...h,5e-324);default:throw Error(`Keep aspect ratio policy ${c.keepAspectRatioPolicy} is not supported`)}})(),h.fill(1,0,h.length),w=p.slice(),c.axes.length>0?(c.axes.forEach(e=>h[e]=v),c.axes.forEach(e=>w[e]=Math.round(p[e]*h[e]))):(h.fill(v,0,h.length),w.forEach((e,t)=>w[t]=Math.round(e*h[t]))),$=w)),x=tT("output",i.dataType,$.length),k=tI("input",i.dataType,_.length),S=eQ.size($),I=_.length===$.length&&_.every((e,t)=>e===$[t]),T="tf_crop_and_resize"===r.coordinateTransformMode,z=r.extrapolationValue,E=k.type.value,{name:"Resize",shaderCache:{hint:`${r.cacheKey}|${a}|${b.length>0?"cubic"===r.mode?b:b.length:""}|${n.length>0?n:""}|${y.length>0?y:""}|${I}|${"nearest"===r.mode?_.length:_}`,inputDependencies:["rank"]},getShaderSource:e=>{let t,i;return`
      ${I?"":`
      ${t=r.coordinateTransformMode,i=E,`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${i} { `+(()=>{switch(t){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${i}(xResized) / ${i}(xScale);
          } else {
            ${aZ("xResized","lengthOriginal","lengthResized",i)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${i}(xResized) + 0.5) / ${i}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${i}(xResized) + 0.5) / ${i}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${aZ("xResized","lengthOriginal - 1","lengthResized - 1",i)}
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
                  return offset + ((${i}(xResized) + 0.5) / ${i}(xScale)) - 0.5;`;case"half_pixel":return`return ((${i}(xResized) + 0.5) / ${i}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${t} is not supported`)}})()+"}"};
      ${(()=>{switch(r.mode){case"nearest":let e,t,i,s,n,o,u,l,d,p,h,c;return`
              ${e=k,t=_,`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${tk("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`};
              ${i=r.nearestMode,s=a,n=E,`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(i){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(s<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${i} is not supported`)}})()+"}"};
              ${o=k,u=x,l=_,d=$,p=b.length,h=y.length,c=T,`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${u.type.indices}) -> ${o.type.indices} {
      var input_indices: ${o.type.indices};
      for (var i:u32 = 0; i < ${d.length}; i++) {
        var output_index = ${u.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${tk("uniforms.scales","i",p)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${tk("uniforms.roi","i",h)};
          var roi_hi = ${tk("uniforms.roi",`i + ${l.length}`,h)};
          var input_shape_i = ${tk("uniforms.input_shape","i",l.length)};
          var output_shape_i = ${tk("uniforms.output_shape","i",d.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${c} || (original_idx >= 0 && original_idx < ${u.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${u.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${o.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`};
              `;case"linear":let f,m,g,v,w;return`
              ${f=x,m=_,g=$,v=b.length,w=y.length,`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${f.type.indices}) -> array<${f.type.value}, ${g.length}> {
      var original_indices: array<${f.type.value}, ${g.length}>;
      for (var i:u32 = 0; i < ${g.length}; i++) {
        var output_index = ${f.indicesGet("output_indices","i")};
        var scale = ${tk("uniforms.scales","i",v)};
        var roi_low = ${tk("uniforms.roi","i",w)};
        var roi_hi = ${tk("uniforms.roi",`i + ${m.length}`,w)};
        if (scale == 1.0) {
          original_indices[i] = ${f.type.value}(output_index);
        } else {
          var input_shape_i = ${tk("uniforms.input_shape","i",m.length)};
          var output_shape_i = ${tk("uniforms.output_shape","i",g.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`};
              ${(()=>{if(2===_.length||4===_.length)return`${((e,t,i,r,a)=>{let[s,n,o,u]=2===i.length?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",n,`max(0, min(row, ${i[n]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${i[o]} - 1))`)};
      ${aQ(e,u,s,2)}
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
    }`})(k,x,_,T,z)}`;if(3===_.length||5===_.length)return`${((e,t,i,r,a)=>{let[s,n,o,u,l]=3===i.length?[-1,0,1,2,-1]:[0,2,3,4,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",n,`max(0, min(depth, ${i[n]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${i[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${i[u]} - 1))`)};
      ${aQ(e,l,s,3)}
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
    }`})(k,x,_,T,z)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===_.length||4===_.length)return`${((e,t,i,r,a,s,n,o,u,l)=>{let[d,p]=2===i.length?[0,1]:[2,3],h=e.type.value,c=n=>{let p=n===d?"row":"col";return`
      fn ${p}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${h} {
        var output_index = ${t.indicesGet("output_indices",n)};
        var originalIdx: ${h} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[n]},
        ${r[n]}, ${i[n]}, ${s[n]}, ${s[n]} + ${i.length});
        var fractOriginalIdx: ${h} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${i[n]} - 1))) {
          return ${u};
        }
        var data: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${p}: ${h} = originalIdx + ${h}(i);
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
    ${c(d)};
    ${c(p)};
  fn getCubicInterpolationCoefs(s: ${h}) -> array<${h}, 4> {
    var absS = abs(s);
    var coeffs: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${h} = 1.0 - absS;
    var twoMinusAbsS: ${h} = 2.0 - absS;
    var onePlusAbsS: ${h} = 1.0 + absS;
    coeffs[0] = ((${n} * onePlusAbsS - 5 * ${n}) * onePlusAbsS + 8 * ${n}) * onePlusAbsS - 4 * ${n};
    coeffs[1] = ((${n} + 2) * absS - (${n} + 3)) * absS * absS + 1;
    coeffs[2] = ((${n} + 2) * oneMinusAbsS - (${n} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${n} * twoMinusAbsS - 5 * ${n}) * twoMinusAbsS + 8 * ${n}) * twoMinusAbsS - 4 * ${n};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${h}, 4>, coefs: array<${h}, 4>) -> ${h} {
    var coefsSum: ${h} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${h} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `})(k,x,_,$,b,y,r.cubicCoeffA,T,r.extrapolationValue,r.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${e.registerUniform("output_size","u32").registerUniform("scales","f32",b.length).registerUniform("roi","f32",y.length).declareVariables(k,x)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${I?"output[global_idx] = input[global_idx];":`
        let output_indices = ${x.offsetToIndices("global_idx")};
        var input_indices: ${k.type.indices};
        ${(()=>{switch(r.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${k.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${r.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${2===_.length||4===_.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${r.mode}`)}})()};
`}
      }`},getRunData:()=>({outputs:[{dims:$,dataType:i.dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},{type:1,data:b},{type:1,data:y},...t$(_,$)]})}),{inputs:[0]})},aY=e=>{let t=e.antialias,i=e.axes,r=e.coordinateTransformMode,a=e.cubicCoeffA,s=0!==e.excludeOutside,n=e.extrapolationValue,o=e.keepAspectRatioPolicy,u=e.mode,l=""===e.nearestMode?"simple":e.nearestMode;return tf({antialias:t,axes:i,coordinateTransformMode:r,cubicCoeffA:a,excludeOutside:s,extrapolationValue:n,keepAspectRatioPolicy:o,mode:u,nearestMode:l})}}),nt=q(()=>{"use strict";so(),sd(),s_(),aJ=(e,t)=>{var i,r,a,s;let n,o,u,l,d,p,h,c,f,m,g,_,y;(e=>{if(!e||e.length<3)throw Error("layerNorm requires at least 3 inputs.");let t=e[0],i=e[1],r=e[2];if(t.dataType!==i.dataType||t.dataType!==r.dataType)throw Error("All inputs must have the same data type");if(3!==t.dims.length&&2!==t.dims.length)throw Error("Input must be 2D or 3D");if(3!==i.dims.length&&2!==i.dims.length)throw Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(i.dims[i.dims.length-1]!==a)throw Error("Skip must have the same hidden size as input");if(i.dims[i.dims.length-2]!==s)throw Error("Skip must have the same sequence length as input");if(1!==r.dims.length)throw Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==a)throw Error("Gamma must have the same hidden size as input");if(e.length>3){let t=e[3];if(1!==t.dims.length)throw Error("Beta must be 1D");if(t.dims[t.dims.length-1]!==a)throw Error("Beta must have the same hidden size as input")}if(e.length>4){let t=e[4];if(1!==t.dims.length)throw Error("Bias must be 1D");if(t.dims[t.dims.length-1]!==a)throw Error("Bias must have the same hidden size as input")}})(e.inputs);let $=[0];e.outputCount>1&&$.push(-3),e.outputCount>2&&$.push(-3),e.outputCount>3&&$.push(3),e.compute((i=e.inputs,r=t,a=e.outputCount,s=!1,n=r.simplified,o=i[0].dims,u=eQ.size(o),l=o.slice(-1)[0],d=s?o.slice(0,-1).concat(1):[],p=!n&&i.length>3,h=i.length>4,c=s&&a>1,f=s&&a>2,m=a>3,_=[{type:12,data:u},{type:12,data:g=tb(l)},{type:12,data:l},{type:1,data:r.epsilon}],y=[{dims:o,dataType:i[0].dataType}],a>1&&y.push({dims:d,dataType:1}),a>2&&y.push({dims:d,dataType:1}),a>3&&y.push({dims:o,dataType:i[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${g};${c};${f};${m}`,inputDependencies:i.map((e,t)=>"type")},getShaderSource:e=>{let t=[tI("x",i[0].dataType,i[0].dims,g),tI("skip",i[1].dataType,i[1].dims,g),tI("gamma",i[2].dataType,i[2].dims,g)];p&&t.push(tI("beta",i[3].dataType,i[3].dims,g)),h&&t.push(tI("bias",i[4].dataType,i[4].dims,g)),t.push(tT("output",i[0].dataType,o,g)),c&&t.push(tT("mean_output",1,d)),f&&t.push(tT("inv_std_output",1,d)),m&&t.push(tT("input_skip_bias_sum",i[0].dataType,o,g));let r=t_(i[0].dataType),a=t_(1,g);return`

      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...t)}
      var<workgroup> sum_shared : array<${a}, 64>;
      var<workgroup> sum_squared_shared : array<${a}, 64>;

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
          let bias_value = ${h?"bias[offset1d + i]":r+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${m?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${tw(r,g,"value")};
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
        let mean = ${tx("sum",g)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${tx("square_sum",g)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${c?"mean_output[global_idx] = mean;":""}
        ${f?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${r}(mean)`}) *
            ${r}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},getRunData:()=>({outputs:y,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:_})}),{outputs:$})}}),ni=q(()=>{"use strict";so(),sd(),sg(),s_(),a0=(e,t)=>{let i=[];if(e.length>t)if(7===e[t].dataType)e[t].getBigInt64Array().forEach(e=>i.push(Number(e)));else if(6===e[t].dataType)e[t].getInt32Array().forEach(e=>i.push(Number(e)));else throw Error(`Input ${t} must be an array of int32 or int64`);return i},a1=(e,t,i,r,a)=>{let s=e;return e<0&&(s+=i[r[t]]),a[t]<0?Math.max(0,Math.min(s,i[r[t]]-1)):Math.max(0,Math.min(s,i[r[t]]))},a2=(e,t)=>{var i=e.inputs,r=t;if(!i||i.length<1)throw Error("too few inputs");if(0!==r.axes.length){if(r.axes.length!==r.starts.length||r.axes.length!==r.ends.length)throw Error("axes, starts and ends must have the same length")}else if(r.starts.length!==r.ends.length)throw Error("starts and ends must have the same length");i.slice(1).forEach((e,t)=>{if(6!==i[t+1].dataType&&7!==i[t+1].dataType)throw Error(`Input ${t} must be an array of int32 or int64`)});let a=((e,t)=>{if(!(e.length>1))return t;{let t=a0(e,1),i=a0(e,2),r=a0(e,3);return 0===r.length&&(r=[...Array(e[0].dims.length).keys()]),tf({starts:t,ends:i,axes:r})}})(e.inputs,t);e.compute(((e,t)=>{let i=e[0].dims,r=eQ.size(i),a=t.axes.length>0?eQ.normalizeAxes(t.axes,i.length):[...Array(i.length).keys()],s=a0(e,4);s.forEach(e=>0!==e||(()=>{throw Error("step cannot be 0")})),0===s.length&&(s=Array(a.length).fill(1));let n=t.starts.map((e,t)=>a1(e,t,i,a,s)),o=t.ends.map((e,t)=>a1(e,t,i,a,s));if(a.length!==n.length||a.length!==o.length)throw Error("start, ends and axes should have the same number of elements");if(a.length!==i.length)for(let e=0;e<i.length;++e)a.includes(e)||(n.splice(e,0,0),o.splice(e,0,i[e]),s.splice(e,0,1));let u=s.map(e=>Math.sign(e));s.forEach((e,t,i)=>{if(e<0){let r=(o[t]-n[t])/e,a=n[t],u=a+r*s[t];n[t]=u,o[t]=a,i[t]=-e}});let l=i.slice(0);a.forEach((e,t)=>{l[e]=Math.ceil((o[e]-n[e])/s[e])});let d={dims:l,dataType:e[0].dataType},p=tT("output",e[0].dataType,l.length),h=tI("input",e[0].dataType,e[0].dims.length),c=eQ.size(l),f=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:n.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:s.length}],m=[{type:12,data:c},{type:12,data:n},{type:6,data:u},{type:12,data:s},...t$(e[0].dims,l)];return{name:"Slice",shaderCache:{hint:`${u.length}_${n.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:e=>{let t,r,a;return`
      ${e.registerUniforms(f).declareVariables(h,p)}
        ${t=h,r=p,a=i,`fn calculateInputIndices(output_indices: ${r.type.indices}) -> ${t.type.indices} {
          var input_indices: ${t.type.indices};
          var carry = 0u;
          for (var i = ${a.length-1}; i >= 0; i--) {
            let input_shape_i = ${tk("uniforms.input_shape","i",a.length)};
            let steps_i = ${tk("uniforms.steps","i",a.length)};
            let signs_i = ${tk("uniforms.signs","i",a.length)};
            let starts_i = ${tk("uniforms.starts","i",a.length)};
            var output_index = ${r.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${t.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`}
        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`},getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:m})}})(e.inputs,a),{inputs:[0]})},a3=e=>{let t=e.starts,i=e.ends,r=e.axes;return tf({starts:t,ends:i,axes:r})}}),nr=q(()=>{"use strict";so(),sd(),sg(),sy(),s_(),a4=(e,t)=>{var i,r;let a,s,n,o,u,l,d,p,h,c,f,m,g,_,y,$,b,v,w;(e=>{if(!e||1!==e.length)throw Error("Softmax op requires 1 input.")})(e.inputs),i=e,r=t,s=(a=i.inputs[0]).dims,n=eQ.size(s),o=s.length,l=(u=eQ.normalizeAxis(r.axis,o))<s.length-1,p=[],l?((p=Array.from({length:o},(e,t)=>t))[u]=o-1,p[o-1]=u,d=i.compute(tA(a,p),{inputs:[a],outputs:[-1]})[0]):d=a,f=n/(c=(h=d.dims)[o-1]),m=tb(c),g=c/m,_=64,1===f&&(_=256),y=tI("x",d.dataType,d.dims,m),$=tT("result",d.dataType,d.dims,m),b=y.type.value,v="f32"===t_(d.dataType)?`var threadMax = ${b}(-3.4028234663852886e+38f);`:`var threadMax = ${b}(-65504.0h);`,w=i.compute({name:"Softmax",shaderCache:{hint:`${m};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:d.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:g}]}),getShaderSource:e=>{let t;return`
      var<workgroup> rowMaxShared : ${b};
      var<workgroup> rowSumShared : ${b};
      var<workgroup> threadShared : array<${b}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${b} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${b}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${e.registerUniform("packedCols","i32").declareVariables(y,$)}
      ${e.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${v}
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
          rowMaxShared = ${b}(${t="threadShared[0]",4===m?`max(max(${t}.x, ${t}.y), max(${t}.z, ${t}.w))`:2===m?`max(${t}.x, ${t}.y)`:3===m?`max(max(${t}.x, ${t}.y), ${t}.z)`:t});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${b}(0.0);
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
          rowSumShared = ${b}(${tx("threadShared[0]",m)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${b}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`}},{inputs:[d],outputs:[l?-1:0]})[0],l&&i.compute(tA(w,p),{inputs:[w]})},a6=e=>tf({axis:e.axis})}),na=q(()=>{"use strict";so(),sd(),s_(),a8=e=>Array.from(e.getBigInt64Array(),Number),a5=e=>{var t;let i,r,a,s,n,o,u;(e=>{if(!e||2!==e.length)throw Error("Tile requires 2 inputs.");if(1!==e[0].dataType&&10!==e[0].dataType&&6!==e[0].dataType&&12!==e[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==e[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==e[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(a8(e[1]).length!==e[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")})(e.inputs),e.compute((i=(t=e.inputs)[0].dims,a=((e,t)=>{let i=[];for(let r=0;r<e.length;++r)i.push(e[r]*t[r]);return i})(i,r=(void 0)??a8(t[1])),s=eQ.size(a),n=t[0].dataType,o=tI("input",n,i.length),u=tT("output",n,a.length),{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...t$(t[0].dims,a)]}),getShaderSource:e=>`
      const inputShape = ${o.indices(...i)};
      ${e.registerUniform("output_size","u32").declareVariables(o,u)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${i.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`}),{inputs:[0]})}}),ns=q(()=>{"use strict";so(),sd(),s_(),a7=e=>{e.compute((e=>{let t=e[1].dims,i=e[2].dims,r=e[0].dims,a=e[1].dataType,s=!(eQ.areEqual(t,i)&&eQ.areEqual(i,r)),n=t,o=eQ.size(t);if(s){let e=eZ.calcShape(eZ.calcShape(t,i,!1),r,!1);if(!e)throw Error("Can't perform where op on the given tensors");n=e,o=eQ.size(n)}let u=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:t=>((e,t,i,r,a)=>{let s=tT("output_data",a,i.length,4),n=tI("a_data",t[1].dataType,t[1].dims.length,4),o=tI("b_data",t[2].dataType,t[2].dims.length,4),u=tI("c_data",t[0].dataType,t[0].dims.length,4),l,d=(e,t,i)=>`select(${t}, ${e}, ${i})`;if(r){let e=(e,t,i="")=>{let r=`a_data[index_a${t}][component_a${t}]`,a=`b_data[index_b${t}][component_b${t}]`,l=`bool(c_data[index_c${t}] & (0xffu << (component_c${t} * 8)))`;return`
            let output_indices${t} = ${s.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offset_a${t} = ${n.broadcastedIndicesToOffset(`output_indices${t}`,s)};
            let offset_b${t} = ${o.broadcastedIndicesToOffset(`output_indices${t}`,s)};
            let offset_c${t} = ${u.broadcastedIndicesToOffset(`output_indices${t}`,s)};
            let index_a${t} = offset_a${t} / 4u;
            let index_b${t} = offset_b${t} / 4u;
            let index_c${t} = offset_c${t} / 4u;
            let component_a${t} = offset_a${t} % 4u;
            let component_b${t} = offset_b${t} % 4u;
            let component_c${t} = offset_c${t} % 4u;
            ${e}[${t}] = ${i}(${d(r,a,l)});
          `};l=9===a?`
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
          `}else l=s.setByOffset("global_idx",d(n.getByOffset("global_idx"),o.getByOffset("global_idx"),u.getByOffset("global_idx")));return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,n,o,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`})(t,e,n,s,a),getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:u},...t$(r,t,i,n)]})}})(e.inputs))}}),nn=q(()=>{"use strict";sv(),sw(),sx(),sk(),sI(),sT(),sz(),sU(),sq(),sN(),sL(),sV(),sG(),sW(),sH(),sF(),sK(),sj(),sZ(),sQ(),s0(),s1(),s2(),s3(),s4(),sX(),s6(),s8(),s5(),s7(),s9(),sb(),ne(),sJ(),nt(),ni(),nr(),sY(),na(),sy(),sS(),ns(),a9=new Map([["Abs",[im]],["Acos",[ig]],["Acosh",[i_]],["Add",[i4]],["ArgMax",[is,io]],["ArgMin",[ia,io]],["Asin",[iy]],["Asinh",[i$]],["Atan",[ib]],["Atanh",[iv]],["Attention",[id]],["AveragePool",[aD,aR]],["BatchNormalization",[ip]],["BiasAdd",[ih]],["BiasSplitGelu",[i2]],["Cast",[ix,iw]],["Ceil",[iS]],["Clip",[ik]],["Concat",[ra,rs]],["Conv",[rO,rE]],["ConvTranspose",[rP,rM]],["Cos",[iI]],["Cosh",[iT]],["CumSum",[rq,rN]],["DepthToSpace",[rL,rV]],["DequantizeLinear",[aW,aH]],["Div",[i6]],["Einsum",[rZ,rQ]],["Elu",[iE,iz]],["Equal",[i8]],["Erf",[iO]],["Exp",[iB]],["Expand",[rY]],["FastGelu",[rJ]],["Floor",[iA]],["FusedConv",[rO,rE]],["Gather",[r1,r0]],["GatherElements",[r5,r8]],["GatherBlockQuantized",[r4,r6]],["GatherND",[r2,r3]],["Gelu",[iR]],["Gemm",[r9,r7]],["GlobalAveragePool",[aP,aU]],["GlobalMaxPool",[aG,aV]],["Greater",[re]],["GreaterOrEqual",[ri]],["GridSample",[as,an]],["GroupQueryAttention",[a$]],["HardSigmoid",[iV,iL]],["InstanceNormalization",[av]],["LayerNormalization",[aw]],["LeakyRelu",[iD,iz]],["Less",[rt]],["LessOrEqual",[rr]],["Log",[iJ]],["MatMul",[ax]],["MatMulNBits",[ak,aS]],["MaxPool",[aN,aL]],["Mul",[i5]],["MultiHeadAttention",[ap,au]],["Neg",[iU]],["Not",[iM]],["Pad",[aI]],["Pow",[i7]],["QuickGelu",[i1,iz]],["Range",[aF]],["Reciprocal",[iP]],["ReduceMin",[t7]],["ReduceMean",[t3]],["ReduceMax",[t5]],["ReduceSum",[ie]],["ReduceProd",[t9]],["ReduceL1",[t4]],["ReduceL2",[t6]],["ReduceLogSum",[ii]],["ReduceLogSumExp",[t8]],["ReduceSumSquare",[it]],["Relu",[iq]],["Resize",[aX,aY]],["RotaryEmbedding",[ag]],["ScatterND",[aj,aK]],["Sigmoid",[iN]],["Sin",[iG]],["Sinh",[iW]],["Slice",[a2,a3]],["SkipLayerNormalization",[aJ]],["Split",[ac,af]],["Sqrt",[iH]],["Softmax",[a4,a6]],["Sub",[i9]],["Tan",[iF]],["Tanh",[ij]],["ThresholdedRelu",[iY,iz]],["Tile",[a5]],["Transpose",[tR,tD]],["Where",[a7]]])}),no=q(()=>{"use strict";eo(),sl(),s_(),se=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,i,r,a){B(e.programInfo.name);let s=this.backend.device,n=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let o=[];for(let e of t)o.push({binding:o.length,resource:{buffer:e.buffer}});for(let e of i)o.push({binding:o.length,resource:{buffer:e.buffer}});a&&o.push({binding:o.length,resource:a});let u=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if("capturing"===this.backend.sessionStatus){let t={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(t)}n.setPipeline(e.computePipeline),n.setBindGroup(0,u),n.dispatchWorkgroups(...r),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),A(e.programInfo.name)}dispose(){}build(e,t){B(e.name);let i=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(e=>{i.features.has(e.feature)&&r.push(`enable ${e.extension};`)});let a=tO(t,this.backend.device.limits),s=e.getShaderSource(a),n=`${r.join(`
`)}
${a.additionalImplementations}
${s}`,o=i.createShaderModule({code:n,label:e.name});eK("verbose",()=>`[WebGPU] ${e.name} shader code: ${n}`);let u=i.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return A(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t="number"==typeof e?e:e.x,i="number"==typeof e?1:e.y||1,r="number"==typeof e?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&i<=a&&r<=a)return[t,i,r];let s=t*i*r,n=Math.ceil(Math.sqrt(s));if(!(n>a))return[n,n,1];if((n=Math.ceil(Math.cbrt(s)))>a)throw Error("Total dispatch size exceeds WebGPU maximum.");return[n,n,n]}}}),nu={};N(nu,{WebGpuBackend:()=>nd});var nl,nd,np=q(()=>{"use strict";eo(),so(),sl(),sp(),sm(),nn(),no(),nl=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},nd=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let i=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:i},a=e=>t.features.has(e)&&i.push(e)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(r),this.adapterInfo=new nl(t.info||await t.requestAdapterInfo()),this.gpuDataManager=th(this),this.programManager=new se(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,eF(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){"u">typeof this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};"at-passes"===this.queryType&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let e;this.commandEncoder&&(B(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),e=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),i=this.pendingQueries.get(e);for(let e=0;e<t.length/2;e++){let r=i[e],a=r.kernelId,s=this.kernels.get(a),n=s.kernelType,o=s.kernelName,u=r.programName,l=r.inputTensorViews,d=r.outputTensorViews,p=t[2*e],h=t[2*e+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=p);let c=Number(p-this.queryTimeBase),f=Number(h-this.queryTimeBase);if(!Number.isSafeInteger(c)||!Number.isSafeInteger(f))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:l.map(e=>({dims:e.dims,dataType:eD(e.dataType)})),outputsMetadata:d.map(e=>({dims:e.dims,dataType:eD(e.dataType)})),kernelId:a,kernelType:n,kernelName:o,programName:u,startTime:c,endTime:f});else{let e="";l.forEach((t,i)=>{e+=`input[${i}]: [${t.dims}] | ${eD(t.dataType)}, `});let t="";d.forEach((e,i)=>{t+=`output[${i}]: [${e.dims}] | ${eD(e.dataType)}, `}),console.log(`[profiling] kernel "${a}|${n}|${o}|${u}" ${e}${t}start time: ${c} ns, execution time: ${f-c} ns`)}C("GPU",`${u}::${p}::${h}`)}e.unmap(),this.pendingQueries.delete(e)}),A())}run(e,t,i,r,a,s){var n,o,u;let l,d;B(e.name);let p=[];for(let e=0;e<t.length;++e){let i=t[e].data;if(0===i)continue;let r=this.gpuDataManager.get(i);if(!r)throw Error(`no GPU data for input: ${i}`);p.push(r)}let{outputs:h,dispatchGroup:c,programUniforms:f}=e.getRunData(t),m=0===i.length?h.map((e,t)=>t):i;if(m.length!==h.length)throw Error(`Output size ${m.length} must be equal to ${h.length}.`);let g=[],_=[];for(let e=0;e<h.length;++e){if(!Number.isInteger(m[e])||m[e]<-3||m[e]>=s)throw Error(`Invalid output index: ${m[e]}`);if(-3===m[e])continue;let t=-1===m[e],i=-2===m[e],n=t||i?a(h[e].dataType,h[e].dims):r(m[e],h[e].dataType,h[e].dims);if(g.push(n),0===n.data)continue;let o=this.gpuDataManager.get(n.data);if(!o)throw Error(`no GPU data for output: ${n.data}`);if(t&&this.temporaryData.push(o),i){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(o)}_.push(o)}if(p.length!==t.length||_.length!==g.length){if(0===_.length)return A(e.name),g;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(f){let e=0,t=[];f.forEach(i=>{let r="number"==typeof i.data?[i.data]:i.data;if(0===r.length)return;let a=10===i.type?2:4,s,n;10===i.type?(n=r.length>4?16:r.length>2?8:r.length*a,s=r.length>4?16:a*r.length):(n=r.length<=2?r.length*a:16,s=16),e=Math.ceil(e/n)*n,t.push(e);let o=10===i.type?8:4;e+=r.length>4?Math.ceil(r.length/o)*s:r.length*a});let i=new ArrayBuffer(e=16*Math.ceil(e/16));f.forEach((e,r)=>{let a=t[r],s="number"==typeof e.data?[e.data]:e.data;if(6===e.type)new Int32Array(i,a,s.length).set(s);else if(12===e.type)new Uint32Array(i,a,s.length).set(s);else if(10===e.type)new Uint16Array(i,a,s.length).set(s);else if(1===e.type)new Float32Array(i,a,s.length).set(s);else throw Error(`Unsupported uniform type: ${eD(e.type)}`)});let r=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(r.buffer,0,i,0,e),this.gpuDataManager.release(r.id),l={offset:0,size:e,buffer:r.buffer}}let y=this.programManager.normalizeDispatchGroupSize(c),$=(n=e,o=t,u=1===y[1]&&1===y[2],d=n.name,n.shaderCache?.hint&&(d+="["+n.shaderCache.hint+"]"),d+=":"+u+`:${((e,t)=>{if(t.length!==e.length)throw Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let i=[];for(let r=0;r<e.length;++r){let a=e[r].dataType;switch(t[r]){case"none":i.push("");break;case"type":i.push(`${a}`);break;case"rank":{let t=e[r].dims.length;i.push(`${a};${t}`);break}case"dims":{let t=e[r].dims.join(",");i.push(`${a};${t}`);break}default:throw Error(`unsupported input dependency: ${t[r]}`)}}return i.join("|")})(o,n.shaderCache?.inputDependencies??Array(o.length).fill("dims"))}`),b=this.programManager.getArtifact($);if(b||(b=this.programManager.build(e,y),this.programManager.setArtifact($,b),eK("info",()=>`[artifact] key: ${$}, programName: ${e.name}`)),f&&b.uniformVariablesInfo){if(f.length!==b.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${b.uniformVariablesInfo.length}, got ${f.length} in program "${b.programInfo.name}".`);for(let e=0;e<f.length;e++){let t=f[e],i=t.type,r="number"==typeof t.data?1:t.data.length,[a,s]=b.uniformVariablesInfo[e];if(i!==a||r!==s)throw Error(`Uniform variable ${e} mismatch: expect type ${a} with size ${s}, got type ${i} with size ${r} in program "${b.programInfo.name}".`)}}if(eK("info",()=>`[ProgramManager] run "${e.name}" (key=${$}) with ${y[0]}x${y[1]}x${y[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let e={kernelId:this.currentKernelId,programName:b.programInfo.name,inputTensorViews:t,outputTensorViews:g};this.pendingKernels.push(e),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(b,p,_,y,l),A(e.name),g}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,i,r){let a=a9.get(e);if(!a)throw Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:r,kernelEntry:a[0],attributes:[a[1],i]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let e of t)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,i){let r=this.kernels.get(e);if(!r)throw Error(`kernel not created: ${e}`);let a=r.kernelType,s=r.kernelName,n=r.kernelEntry,o=r.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),eK("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),n(t,o[1]),0}catch(e){return i.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${e}`)),1}finally{for(let e of(u&&i.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${a}] ${s}": ${e.message}`:null)),this.temporaryData))this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,i,r){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let s=a.get(t),n=this.gpuDataManager.registerExternalBuffer(i,r,s);return a.set(t,[n,i]),n}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,i){return async()=>{let r=await td(this,e,t);return e1(r.buffer,i)}}writeTimestamp(e){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){eK("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){eK("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){eK("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),i=e.length;this.pendingKernels=[];for(let r=0;r<i;r++){let i=this.getComputePassEncoder(),a=e[r];this.writeTimestamp(2*this.pendingDispatchNumber),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),nh={};N(nh,{init:()=>nm});var nc,nf,nm,ng,n_,ny,n$,nb,nv,nw,nx,nk,nS,nI,nT,nz,nE,nC,nO,nB,nA,nR,nD,nM,nU,nP,nq,nN,nL,nV,nG,nW,nH,nF,nK,nj=q(()=>{"use strict";so(),sl(),sd(),sc(),nc=class e{constructor(e,t,i,r){this.module=e,this.dataType=t,this.data=i,this.dims=r}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let e=eQ.size(this.dims);return 0===e?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let e=eQ.size(this.dims);return 0===e?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let e=eQ.size(this.dims);return 0===e?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let e=eQ.size(this.dims);return 0===e?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(t){if(eQ.size(t)!==eQ.size(this.dims))throw Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},nf=class{constructor(e,t,i){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,a=i/e.PTR_SIZE,s=4===r?"i32":"i64";this.opKernelContext=Number(e.getValue(r*a++,s));let n=Number(e.getValue(r*a++,s));this.outputCount=Number(e.getValue(r*a++,s)),this.customDataOffset=Number(e.getValue(r*a++,"*")),this.customDataSize=Number(e.getValue(r*a++,s));let o=[];for(let t=0;t<n;t++){let t=Number(e.getValue(r*a++,s)),i=Number(e.getValue(r*a++,"*")),n=Number(e.getValue(r*a++,s)),u=[];for(let t=0;t<n;t++)u.push(Number(e.getValue(r*a++,s)));o.push(new nc(e,t,i,u))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let i=t?.inputs?.map(e=>"number"==typeof e?this.inputs[e]:e)??this.inputs,r=t?.outputs??[],a=(e,t,i)=>new nc(this.module,t,this.output(e,i),i),s=(e,t)=>{let i=eM(e,t);if(!i)throw Error(`Unsupported data type: ${e}`);let r=i>0?this.backend.gpuDataManager.create(i).id:0;return new nc(this.module,e,r,t)};return this.backend.run(e,i,r,a,s,this.outputCount)}output(e,t){let i=this.module.stackSave();try{let i=this.module.PTR_SIZE,r=4===i?"i32":"i64",a=this.module.stackAlloc((1+t.length)*i);this.module.setValue(a,t.length,r);for(let e=0;e<t.length;e++)this.module.setValue(a+i*(e+1),t[e],r);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(i){throw Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(i)}}},nm=async(e,t,i,r)=>{let a=t.jsepInit;if(!a)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===e){let e=new(np(),L(nu)).WebGpuBackend;await e.initialize(i,r),a("webgpu",[e,t=>e.alloc(Number(t)),t=>e.free(t),(i,r,a,s=!1)=>{if(s)eK("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(i)}, dst=${Number(r)}, size=${Number(a)}`),e.memcpy(Number(i),Number(r));else{eK("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(i)}, gpuDataId=${Number(r)}, size=${Number(a)}`);let s=t.HEAPU8.subarray(Number(i>>>0),Number(i>>>0)+Number(a));e.upload(Number(r),s)}},async(i,r,a)=>{eK("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${i}, dataOffset=${r}, size=${a}`),await e.download(Number(i),()=>t.HEAPU8.subarray(Number(r)>>>0,Number(r+a)>>>0))},(i,r,a)=>e.createKernel(i,Number(r),a,t.UTF8ToString(t._JsepGetNodeName(Number(r)))),t=>e.releaseKernel(t),(i,r,a,s)=>{eK("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${a}, kernel=${i}, contextDataOffset=${r}`);let n=new nf(t,e,Number(r));return e.computeKernel(Number(i),n,s)},()=>e.captureBegin(),()=>e.captureEnd(),()=>e.replay()])}else{let e=new ta(i);a("webnn",[e,()=>e.reserveTensorId(),t=>e.releaseTensorId(t),async(t,i,r,a,s)=>e.ensureTensor(t,i,r,a,s),(t,i)=>{e.uploadTensor(t,i)},async(t,i)=>e.downloadTensor(t,i),(t,i)=>e.registerMLContext(t,i),!!i.trace])}}}),nZ=q(()=>{"use strict";eo(),ss(),sn(),so(),sr(),sa(),su(),ng=async e=>{var t,i;t=e.wasm.numThreads,i=eP(e.logLevel),0!==eT()._OrtInit(t,i)&&eC("Can't initialize onnxruntime.")},n_=async(e,t)=>{eT().asyncInit?.();let i=e.webgpu.adapter;if("webgpu"===t){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(i){if("object"!=typeof i.limits||"object"!=typeof i.features||"function"!=typeof i.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=e.webgpu.powerPreference;if(void 0!==t&&"low-power"!==t&&"high-performance"!==t)throw Error(`Invalid powerPreference setting: "${t}"`);let r=e.webgpu.forceFallbackAdapter;if(void 0!==r&&"boolean"!=typeof r)throw Error(`Invalid forceFallbackAdapter setting: "${r}"`);if(!(i=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:r})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===t&&(typeof navigator>"u"||!navigator.ml))throw Error("WebNN is not supported in current environment");{let r=(nj(),L(nh)).init;"webgpu"===t&&await r("webgpu",eT(),e,i),"webnn"===t&&await r("webnn",eT(),e)}},ny=new Map,n$=(e,t)=>{let i=eT(),r=i.stackSave(),a=0;try{let r=i.PTR_SIZE,s=i.stackAlloc(2*r);0!==i._OrtGetInputOutputMetadata(e,t,s,s+r)&&eC("Can't get session input/output metadata.");let n=Number(i.getValue(s,"*"));a=Number(i.getValue(s+r,"*"));let o=i.HEAP32[a/4];if(0===o)return[n,0];let u=i.HEAPU32[a/4+1],l=[];for(let e=0;e<u;e++){let t=Number(i.getValue(a+8+e*r,"*"));l.push(0!==t?i.UTF8ToString(t):Number(i.getValue(a+8+(e+u)*r,"*")))}return[n,o,l]}finally{i.stackRestore(r),0!==a&&i._OrtFree(a)}},nb=e=>{let t=eT(),i=t._malloc(e.byteLength);if(0===i)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,i),[i,e.byteLength]},nv=async(e,t)=>{let i,r,a=eT();Array.isArray(e)?[i,r]=e:e.buffer===a.HEAPU8.buffer?[i,r]=[e.byteOffset,e.byteLength]:[i,r]=nb(e);let s=0,n=0,o=0,u=[],l=[],d=[];try{if([n,u]=await eA(t),t?.externalData&&a.mountExternalData){let e=[];for(let i of t.externalData){let t="string"==typeof i?i:i.path;e.push(eV("string"==typeof i?i:i.data).then(e=>{a.mountExternalData(t,e)}))}await Promise.all(e)}for(let e of t?.executionProviders??[])if(("string"==typeof e?e:e.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,"string"!=typeof e){let t=e?.context,i=e?.gpuDevice,r=e?.deviceType,s=e?.powerPreference;t?a.currentContext=t:i?a.currentContext=await a.webnnCreateMLContext(i):a.currentContext=await a.webnnCreateMLContext({deviceType:r,powerPreference:s})}else a.currentContext=await a.webnnCreateMLContext();break}s=await a._OrtCreateSession(i,r,n),a.webgpuOnCreateSession?.(s),0===s&&eC("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(s,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[e,p]=(e=>{let t=eT(),i=t.stackSave();try{let i=t.PTR_SIZE,r=t.stackAlloc(2*i);0!==t._OrtGetInputOutputCount(e,r,r+i)&&eC("Can't get session input/output count.");let a=4===i?"i32":"i64";return[Number(t.getValue(r,a)),Number(t.getValue(r+i,a))]}finally{t.stackRestore(i)}})(s),h=!!t?.enableGraphCapture,c=[],f=[],m=[],g=[],_=[];for(let t=0;t<e;t++){let[e,i,r]=n$(s,t);0===e&&eC("Can't get an input name."),l.push(e);let n=a.UTF8ToString(e);c.push(n),m.push(0===i?{name:n,isTensor:!1}:{name:n,isTensor:!0,type:eD(i),shape:r})}for(let i=0;i<p;i++){let[r,n,o]=n$(s,i+e);0===r&&eC("Can't get an output name."),d.push(r);let u=a.UTF8ToString(r);f.push(u),g.push(0===n?{name:u,isTensor:!1}:{name:u,isTensor:!0,type:eD(n),shape:o});{if(h&&t?.preferredOutputLocation===void 0){_.push("gpu-buffer");continue}let e="string"==typeof t?.preferredOutputLocation?t.preferredOutputLocation:t?.preferredOutputLocation?.[u]??"cpu",i=a.webnnIsGraphOutput;if("cpu"===e&&i&&i(s,u)){_.push("ml-tensor-cpu-output");continue}if("cpu"!==e&&"cpu-pinned"!==e&&"gpu-buffer"!==e&&"ml-tensor"!==e)throw Error(`Not supported preferred output location: ${e}.`);if(h&&"gpu-buffer"!==e)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push(e)}}let y=null;return _.some(e=>"gpu-buffer"===e||"ml-tensor"===e||"ml-tensor-cpu-output"===e)&&(o=a._OrtCreateBinding(s),0===o&&eC("Can't create IO binding."),y={handle:o,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(e=>"ml-tensor-cpu-output"===e?"ml-tensor":e).map(e=>eL(e))}),ny.set(s,[s,l,d,y,h,!1]),[s,c,f,m,g]}catch(e){throw l.forEach(e=>a._OrtFree(e)),d.forEach(e=>a._OrtFree(e)),0!==o&&0!==a._OrtReleaseBinding(o)&&eC("Can't release IO binding."),0!==s&&0!==a._OrtReleaseSession(s)&&eC("Can't release session."),e}finally{a._free(i),0!==n&&0!==a._OrtReleaseSessionOptions(n)&&eC("Can't release session options."),u.forEach(e=>a._free(e)),a.unmountExternalData?.()}},nw=e=>{let t=eT(),i=ny.get(e);if(!i)throw Error(`cannot release session. invalid session id: ${e}`);let[r,a,s,n,o]=i;n&&(o&&0!==t._OrtClearBoundOutputs(n.handle)&&eC("Can't clear bound outputs."),0!==t._OrtReleaseBinding(n.handle)&&eC("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(e=>t._OrtFree(e)),s.forEach(e=>t._OrtFree(e)),0!==t._OrtReleaseSession(r)&&eC("Can't release session."),ny.delete(e)},nx=async(e,t,i,r,a,s,n=!1)=>{if(!e)return void t.push(0);let o=eT(),u=o.PTR_SIZE,l=e[0],d=e[1],p=e[3],h=p,c,f;if("string"===l&&("gpu-buffer"===p||"ml-tensor"===p))throw Error("String tensor is not supported on GPU.");if(n&&"gpu-buffer"!==p)throw Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if("gpu-buffer"===p){let t=e[2].gpuBuffer;f=eM(eR(l),d);{let e=o.jsepRegisterBuffer;if(!e)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');c=e(r,s,t,f)}}else if("ml-tensor"===p){let t=e[2].mlTensor;f=eM(eR(l),d);let i=o.webnnRegisterMLTensor;if(!i)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');c=i(r,t,eR(l),d)}else{let t=e[2];if(Array.isArray(t)){f=u*t.length,c=o._malloc(f),i.push(c);for(let e=0;e<t.length;e++){if("string"!=typeof t[e])throw TypeError(`tensor data at index ${e} is not a string`);o.setValue(c+e*u,ez(t[e],i),"*")}}else{let e=o.webnnIsGraphInput,s=o.webnnIsGraphOutput;if("string"!==l&&e&&s){let n=o.UTF8ToString(a);if(e(r,n)||s(r,n)){let e=eR(l);f=eM(e,d),h="ml-tensor";let i=o.webnnCreateTemporaryTensor,a=o.webnnUploadTensor;if(!i||!a)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let s=await i(r,e,d);a(s,new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),c=s}else f=t.byteLength,c=o._malloc(f),i.push(c),o.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,f),c)}else f=t.byteLength,c=o._malloc(f),i.push(c),o.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,f),c)}}let m=o.stackSave(),g=o.stackAlloc(4*d.length);try{d.forEach((e,t)=>o.setValue(g+t*u,e,4===u?"i32":"i64"));let e=o._OrtCreateTensor(eR(l),c,f,g,d.length,eL(h));0===e&&eC(`Can't create tensor for input/output. session=${r}, index=${s}.`),t.push(e)}finally{o.stackRestore(m)}},nk=async(e,t,i,r,a,s)=>{let n=eT(),o=n.PTR_SIZE,u=ny.get(e);if(!u)throw Error(`cannot run inference. invalid session id: ${e}`);let l=u[0],d=u[1],p=u[2],h=u[3],c=u[4],f=u[5],m=t.length,g=r.length,_=0,y=[],$=[],b=[],v=[],w=[],x=n.stackSave(),k=n.stackAlloc(m*o),S=n.stackAlloc(m*o),I=n.stackAlloc(g*o),T=n.stackAlloc(g*o);try{let u;[_,y]=eO(s),R("wasm prepareInputOutputTensor");for(let r=0;r<m;r++)await nx(i[r],$,v,e,d[t[r]],t[r],c);for(let t=0;t<g;t++)await nx(a[t],b,v,e,p[r[t]],m+r[t],c);D("wasm prepareInputOutputTensor");for(let e=0;e<m;e++)n.setValue(k+e*o,$[e],"*"),n.setValue(S+e*o,d[t[e]],"*");for(let e=0;e<g;e++)n.setValue(I+e*o,b[e],"*"),n.setValue(T+e*o,p[r[e]],"*");if(h&&!f){let{handle:i,outputPreferredLocations:s,outputPreferredLocationsEncoded:o}=h;if(d.length!==m)throw Error(`input count from feeds (${m}) is expected to be always equal to model's input count (${d.length}).`);R("wasm bindInputsOutputs");for(let r=0;r<m;r++){let a=t[r];await n._OrtBindInput(i,d[a],$[r])!==0&&eC(`Can't bind input[${r}] for session=${e}.`)}for(let t=0;t<g;t++){let u=r[t];a[t]?.[3]?(w.push(b[t]),0!==n._OrtBindOutput(i,p[u],b[t],0)&&eC(`Can't bind pre-allocated output[${t}] for session=${e}.`)):0!==n._OrtBindOutput(i,p[u],0,o[u])&&eC(`Can't bind output[${t}] to ${s[t]} for session=${e}.`)}D("wasm bindInputsOutputs"),ny.set(e,[l,d,p,h,c,!0])}n.jsepOnRunStart?.(l),n.webnnOnRunStart?.(l),u=h?await n._OrtRunWithBinding(l,h.handle,g,I,_):await n._OrtRun(l,S,k,m,T,g,I,_),0!==u&&eC("failed to call OrtRun().");let x=[],z=[];R("wasm ProcessOutputTensor");for(let t=0;t<g;t++){let i=Number(n.getValue(I+t*o,"*"));if(i===b[t]||w.includes(b[t])){x.push(a[t]),i!==b[t]&&0!==n._OrtReleaseTensor(i)&&eC("Can't release tensor.");continue}let s=n.stackSave(),u=n.stackAlloc(4*o),l=!1,d,p=0;try{0!==n._OrtGetTensorData(i,u,u+o,u+2*o,u+3*o)&&eC(`Can't access output tensor data on index ${t}.`);let a=4===o?"i32":"i64",s=Number(n.getValue(u,a));p=n.getValue(u+o,"*");let c=n.getValue(u+2*o,"*"),f=Number(n.getValue(u+3*o,a)),m=[];for(let e=0;e<f;e++)m.push(Number(n.getValue(c+e*o,a)));0!==n._OrtFree(c)&&eC("Can't free memory for tensor dims.");let g=m.reduce((e,t)=>e*t,1);d=eD(s);let _=h?.outputPreferredLocations[r[t]];if("string"===d){if("gpu-buffer"===_||"ml-tensor"===_)throw Error("String tensor is not supported on GPU.");let e=[];for(let t=0;t<g;t++){let i=n.getValue(p+t*o,"*"),r=n.getValue(p+(t+1)*o,"*"),a=t===g-1?void 0:r-i;e.push(n.UTF8ToString(i,a))}x.push([d,m,e,"cpu"])}else if("gpu-buffer"===_&&g>0){let e=n.jsepGetBuffer;if(!e)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let t=e(p),r=eM(s,g);if(void 0===r||!eq(d))throw Error(`Unsupported data type: ${d}`);l=!0,x.push([d,m,{gpuBuffer:t,download:n.jsepCreateDownloader(t,r,d),dispose:()=>{0!==n._OrtReleaseTensor(i)&&eC("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===_&&g>0){let t=n.webnnEnsureTensor,r=n.webnnIsGraphInputOutputTypeSupported;if(!t||!r)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===eM(s,g)||!eN(d))throw Error(`Unsupported data type: ${d}`);if(!r(e,d,!1))throw Error(`preferredLocation "ml-tensor" for ${d} output is not supported by current WebNN Context.`);let a=await t(e,p,s,m,!1);l=!0,x.push([d,m,{mlTensor:a,download:n.webnnCreateMLTensorDownloader(p,d),dispose:()=>{n.webnnReleaseTensorId(p),n._OrtReleaseTensor(i)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===_&&g>0){let e=n.webnnCreateMLTensorDownloader(p,d)(),t=x.length;l=!0,z.push((async()=>{let r=[t,await e];return n.webnnReleaseTensorId(p),n._OrtReleaseTensor(i),r})()),x.push([d,m,[],"cpu"])}else{let e=new(eU(d))(g);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(n.HEAPU8.subarray(p,p+e.byteLength)),x.push([d,m,e,"cpu"])}}finally{n.stackRestore(s),"string"===d&&p&&n._free(p),l||n._OrtReleaseTensor(i)}}for(let[t,i]of(h&&!c&&(0!==n._OrtClearBoundOutputs(h.handle)&&eC("Can't clear bound outputs."),ny.set(e,[l,d,p,h,c,!1])),await Promise.all(z)))x[t][2]=i;return D("wasm ProcessOutputTensor"),x}finally{n.webnnOnRunEnd?.(l),n.stackRestore(x),$.forEach(e=>n._OrtReleaseTensor(e)),b.forEach(e=>n._OrtReleaseTensor(e)),v.forEach(e=>n._free(e)),0!==_&&n._OrtReleaseRunOptions(_),y.forEach(e=>n._free(e))}},nS=e=>{let t=eT(),i=ny.get(e);if(!i)throw Error("invalid session id");let r=i[0],a=t._OrtEndProfiling(r);0===a&&eC("Can't get an profile file name."),t._OrtFree(a)},nI=e=>{let t=[];for(let i of e){let e=i[2];!Array.isArray(e)&&"buffer"in e&&t.push(e.buffer)}return t}}),nQ=q(()=>{"use strict";eo(),nZ(),sr(),si(),nT=()=>!!c.wasm.proxy&&"u">typeof document,nE=!1,nC=!1,nO=!1,nR=new Map,nD=(e,t)=>{let i=nR.get(e);i?i.push(t):nR.set(e,[t])},nM=()=>{if(nE||!nC||nO||!nz)throw Error("worker not ready")},nU=e=>{switch(e.data.type){case"init-wasm":nE=!1,e.data.err?(nO=!0,nA[1](e.data.err)):(nC=!0,nA[0]()),nB&&(URL.revokeObjectURL(nB),nB=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=nR.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out)}}},nP=async()=>{if(!nC){if(nE)throw Error("multiple calls to 'initWasm()' detected.");if(nO)throw Error("previous call to 'initWasm()' failed.");if(nE=!0,nT())return new Promise((e,t)=>{nz?.terminate(),e$().then(([i,r])=>{try{(nz=r).onerror=e=>t(e),nz.onmessage=nU,nA=[e,t];let a={type:"init-wasm",in:c};if(!a.in.wasm.wasmPaths&&i){let e=em();e&&(a.in.wasm.wasmPaths=e)}nz.postMessage(a),nB=i}catch(e){t(e)}},t)});try{await eI(c.wasm),await ng(c),nC=!0}catch(e){throw nO=!0,e}finally{nE=!1}}},nq=async e=>{if(nT())return nM(),new Promise((t,i)=>{nD("init-ep",[t,i]);let r={type:"init-ep",in:{epName:e,env:c}};nz.postMessage(r)});await n_(c,e)},nN=async e=>nT()?(nM(),new Promise((t,i)=>{nD("copy-from",[t,i]),nz.postMessage({type:"copy-from",in:{buffer:e}},[e.buffer])})):nb(e),nL=async(e,t)=>{if(!nT())return nv(e,t);if(t?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return nM(),new Promise((i,r)=>{nD("create",[i,r]);let a={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),nz.postMessage(a,s)})},nV=async e=>{if(nT())return nM(),new Promise((t,i)=>{nD("release",[t,i]),nz.postMessage({type:"release",in:e})});nw(e)},nG=async(e,t,i,r,a,s)=>{if(!nT())return nk(e,t,i,r,a,s);if(i.some(e=>"cpu"!==e[3]))throw Error("input tensor on GPU is not supported for proxy.");if(a.some(e=>e))throw Error("pre-allocated output tensor is not supported for proxy.");return nM(),new Promise((a,n)=>{nD("run",[a,n]),nz.postMessage({type:"run",in:{sessionId:e,inputIndices:t,inputs:i,outputIndices:r,options:s}},nI(i))})},nW=async e=>{if(nT())return nM(),new Promise((t,i)=>{nD("end-profiling",[t,i]),nz.postMessage({type:"end-profiling",in:e})});nS(e)}}),nX=q(()=>{"use strict";eo(),nQ(),so(),eu(),su(),nH=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${e.location} for ${t()}`)}},nF=e=>{switch(e[3]){case"cpu":return new E(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!eq(t))throw Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:i,download:r,dispose:a}=e[2];return E.fromGpuBuffer(i,{dataType:t,dims:e[1],download:r,dispose:a})}case"ml-tensor":{let t=e[0];if(!eN(t))throw Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:i,download:r,dispose:a}=e[2];return E.fromMLTensor(i,{dataType:t,dims:e[1],download:r,dispose:a})}default:throw Error(`invalid data location: ${e[3]}`)}},nK=class{async fetchModelAndCopyToWasmMemory(e){return nN(await eV(e))}async loadModel(e,t){let i;B(),i="string"==typeof e?await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await nL(i,t),A()}async dispose(){return nV(this.sessionId)}async run(e,t,i){B();let r=[],a=[];Object.entries(e).forEach(e=>{let t=e[0],i=e[1],s=this.inputNames.indexOf(t);if(-1===s)throw Error(`invalid input '${t}'`);r.push(i),a.push(s)});let s=[],n=[];Object.entries(t).forEach(e=>{let t=e[0],i=e[1],r=this.outputNames.indexOf(t);if(-1===r)throw Error(`invalid output '${t}'`);s.push(i),n.push(r)});let o=r.map((e,t)=>nH(e,()=>`input "${this.inputNames[a[t]]}"`)),u=s.map((e,t)=>e?nH(e,()=>`output "${this.outputNames[n[t]]}"`):null),l=await nG(this.sessionId,a,o,n,u,i),d={};for(let e=0;e<l.length;e++)d[this.outputNames[n[e]]]=s[e]??nF(l[e]);return A(),d}startProfiling(){}endProfiling(){nW(this.sessionId)}}}),nY={};N(nY,{OnnxruntimeWebAssemblyBackend:()=>n0,initializeFlags:()=>nJ,wasmBackend:()=>n1});var nJ,n0,n1,n2=q(()=>{"use strict";eo(),nQ(),nX(),nJ=()=>{("number"!=typeof c.wasm.initTimeout||c.wasm.initTimeout<0)&&(c.wasm.initTimeout=0);let e=c.wasm.simd;if("boolean"!=typeof e&&void 0!==e&&"fixed"!==e&&"relaxed"!==e&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),c.wasm.simd=!1),"boolean"!=typeof c.wasm.proxy&&(c.wasm.proxy=!1),"boolean"!=typeof c.wasm.trace&&(c.wasm.trace=!1),"number"!=typeof c.wasm.numThreads||!Number.isInteger(c.wasm.numThreads)||c.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)c.wasm.numThreads=1;else{let e=typeof navigator>"u"?P("node:os").cpus().length:navigator.hardwareConcurrency;c.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},n1=new(n0=class{async init(e){nJ(),await nP(),await nq(e)}async createInferenceSessionHandler(e,t){let i=new nK;return await i.loadModel(e,t),i}})});eo(),eo(),eo();var n3=en;{let e=(n2(),L(nY)).wasmBackend;o("webgpu",e,5),o("webnn",e,5),o("cpu",e,10),o("wasm",e,10)}Object.defineProperty(c.versions,"web",{value:"1.24.3",enumerable:!0});export{U as InferenceSession,C as TRACE,R as TRACE_EVENT_BEGIN,D as TRACE_EVENT_END,B as TRACE_FUNC_BEGIN,A as TRACE_FUNC_END,E as Tensor,n3 as default,c as env,o as registerBackend};