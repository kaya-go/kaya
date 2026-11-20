/*! LICENSE: ort.all.bundle.min.94fc51e3ee.mjs.LICENSE.txt */
let e;var t=Object.create,r=Object.defineProperty,n=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,o=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,s,u,l,d,p,c,h,f,m,g,b,y,_,v,x,w,$,T,I,S,O,E,A,P,k,D,N,C,z,R,B,M,j,F,L,V,U,q=(e=function(e){if("u">typeof require)return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')},"u">typeof require?require:"u">typeof Proxy?new Proxy(e,{get:(e,t)=>("u">typeof require?require:e)[t]}):e),G=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(e){throw r=[e],e}},H=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}},W=(e,t)=>{for(var n in t)r(e,n,{get:t[n],enumerable:!0})},K=(e,t,o,s)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let u of i(t))a.call(e,u)||u===o||r(e,u,{get:()=>t[u],enumerable:!(s=n(t,u))||s.enumerable});return e},X=(e,n,i)=>(i=null!=e?t(o(e)):{},K(!n&&e&&e.__esModule?i:r(i,"default",{value:e,enumerable:!0}),e)),Z=e=>K(r({},"__esModule",{value:!0}),e),J=G(()=>{"use strict";s=new Map,u=[],l=new WeakMap,d=(e,t,r)=>{if(t&&"function"==typeof t.init&&"function"==typeof t.createInferenceSessionHandler){let n=s.get(e);if(void 0===n)s.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let t=u.indexOf(e);-1!==t&&u.splice(t,1);for(let t=0;t<u.length;t++)if(s.get(u[t]).priority<=r)return void u.splice(t,0,e);u.push(e)}return}throw TypeError("not a valid backend")},p=async e=>{let t=s.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{if(!r){let r=t.backend,n=l.get(r);t.initPromise=n?n.then(async()=>r.init(e),async()=>r.init(e)):r.init(e),l.set(r,t.initPromise)}return await t.initPromise,t.initialized=!0,t.backend}catch(e){return r||(t.error=`${e}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},c=async e=>{let t=e.executionProviders||[],r=t.map(e=>"string"==typeof e?e:e.name),n=0===r.length?u:r,i,o=[],a=new Set;for(let e of n){let t=await p(e);"string"==typeof t?o.push({name:e,err:t}):(i||(i=t),i===t&&a.add(e))}if(!i)throw Error(`no available backend found. ERR: ${o.map(e=>`[${e.name}] ${e.err}`).join(", ")}`);for(let{name:e,err:t}of o)r.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${t}`);let s=t.filter(e=>a.has("string"==typeof e?e:e.name));return[i,new Proxy(e,{get:(e,t)=>"executionProviders"===t?s:Reflect.get(e,t)})]},h=async()=>{let e=[];for(let t of u){if("function"!=typeof s.get(t).backend.createLoraAdapterHandler)continue;let r=await p(t);if("string"!=typeof r)return r;e.push({name:t,err:r})}let t=0===e.length?"":` ERR: ${e.map(e=>`[${e.name}] ${e.err}`).join(", ")}`;throw Error(`no available backend supports LoRA adapters.${t}`)}}),Q=G(()=>{"use strict";J()}),Y=G(()=>{"use strict";f="1.31.1"}),ee=G(()=>{"use strict";Y(),m="warning",Object.defineProperty(g={wasm:{},webgl:{},webgpu:{},versions:{common:f},set logLevel(e){if(void 0!==e){if("string"!=typeof e||-1===["verbose","info","warning","error","fatal"].indexOf(e))throw Error(`Unsupported logging level: ${e}`);m=e}},get logLevel(){return m}},"logLevel",{enumerable:!0})}),et=G(()=>{"use strict";ee(),b=g}),er=G(()=>{"use strict";ee(),y=(e,t)=>{(typeof g.trace>"u"?g.wasm.trace:g.trace)&&console.timeStamp(`${e}::ORT::${t}`)},_=(e,t)=>{let r=Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let i=0;i<r.length;i++){if(n&&!r[i].includes("TRACE_FUNC")){let n=`FUNC_${e}::${r[i].trim().split(" ")[1]}`;t&&(n+=`::${t}`),y("CPU",n);return}r[i].includes("TRACE_FUNC")&&(n=!0)}},v=e=>{(typeof g.trace>"u"?g.wasm.trace:g.trace)&&_("BEGIN",e)},x=e=>{(typeof g.trace>"u"?g.wasm.trace:g.trace)&&_("END",e)},w=e=>{(typeof g.trace>"u"?g.wasm.trace:g.trace)&&console.time(`ORT::${e}`)},$=e=>{(typeof g.trace>"u"?g.wasm.trace:g.trace)&&console.timeEnd(`ORT::${e}`)}}),en=G(()=>{"use strict";J(),er(),T=class e{constructor(e,t){this.backend=e,this.handler=t}static async create(t){if(v(),"string"!=typeof t&&!(t instanceof Uint8Array))throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let r=await h(),n=await r.createLoraAdapterHandler(t);return x(),new e(r,n)}async release(){return this.handler.dispose()}}}),ei=G(()=>{"use strict";I=(e,t)=>{let r="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(null!=n){let i,o;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(i=e.dims[2],o=e.dims[3]):(i=e.dims[3],o=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",s=t?.norm,u,l;void 0===s||void 0===s.mean?u=[255,255,255,255]:"number"==typeof s.mean?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],void 0!==s.mean[3]&&(u[3]=s.mean[3])),void 0===s||void 0===s.bias?l=[0,0,0,0]:"number"==typeof s.bias?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],void 0!==s.bias[3]&&(l[3]=s.bias[3]));let d=o*i,p=0,c=d,h=2*d,f=-1;"RGBA"===a?(p=0,c=d,h=2*d,f=3*d):"RGB"===a?(p=0,c=d,h=2*d):"RBG"===a&&(p=0,h=d,c=2*d);for(let t=0;t<o;t++)for(let r=0;r<i;r++)n.fillStyle="rgba("+(e.data[p++]-l[0])*u[0]+","+(e.data[c++]-l[1])*u[1]+","+(e.data[h++]-l[2])*u[2]+","+(-1===f?255:(e.data[f++]-l[3])*u[3])+")",n.fillRect(r,t,1,1);if("toDataURL"in r)return r.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},S=(e,t)=>{let r="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(null!=r){let i,o,a;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(i=e.dims[2],o=e.dims[1],a=e.dims[3]):(i=e.dims[3],o=e.dims[2],a=e.dims[1]);let s=void 0!==t&&void 0!==t.format?t.format:"RGB",u=t?.norm,l,d;void 0===u||void 0===u.mean?l=[255,255,255,255]:"number"==typeof u.mean?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],void 0!==u.mean[3]&&(l[3]=u.mean[3])),void 0===u||void 0===u.bias?d=[0,0,0,0]:"number"==typeof u.bias?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(d[3]=u.bias[3]));let p=o*i;if(void 0!==t&&(void 0!==t.format&&4===a&&"RGBA"!==t.format||3===a&&"RGB"!==t.format&&"BGR"!==t.format))throw Error("Tensor format doesn't match input tensor dims");let c=0,h=1,f=2,m=3,g=0,b=p,y=2*p,_=-1;"RGBA"===s?(g=0,b=p,y=2*p,_=3*p):"RGB"===s?(g=0,b=p,y=2*p):"RBG"===s&&(g=0,y=p,b=2*p),n=r.createImageData(i,o);for(let t=0;t<o*i;c+=4,h+=4,f+=4,m+=4,t++)n.data[c]=(e.data[g++]-d[0])*l[0],n.data[h]=(e.data[b++]-d[1])*l[1],n.data[f]=(e.data[y++]-d[2])*l[2],n.data[m]=-1===_?255:(e.data[_++]-d[3])*l[3]}else throw Error("Can not access image data");return n}}),eo=G(()=>{"use strict";eu(),O=(e,t)=>{if(void 0===e)throw Error("Image buffer must be defined");if(void 0===t.height||void 0===t.width)throw Error("Image height and width must be defined");if("NHWC"===t.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,i=t.norm??{mean:255,bias:0},o,a;o="number"==typeof i.mean?[i.mean,i.mean,i.mean,i.mean]:[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],a="number"==typeof i.bias?[i.bias,i.bias,i.bias,i.bias]:[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let s=void 0!==t.format?t.format:"RGBA",u=void 0!==t.tensorFormat&&void 0!==t.tensorFormat?t.tensorFormat:"RGB",l=r*n,d=new Float32Array("RGBA"===u?4*l:3*l),p=4,c=0,h=1,f=2,m=3,g=0,b=l,y=2*l,_=-1;"RGB"===s&&(p=3,c=0,h=1,f=2,m=-1),"RGBA"===u?_=3*l:"RBG"===u?(g=0,y=l,b=2*l):"BGR"===u&&(y=0,b=l,g=2*l);for(let t=0;t<l;t++,c+=p,f+=p,h+=p,m+=p)d[g++]=(e[c]+a[0])/o[0],d[b++]=(e[h]+a[1])/o[1],d[y++]=(e[f]+a[2])/o[2],-1!==_&&-1!==m&&(d[_++]=(e[m]+a[3])/o[3]);return"RGBA"===u?new j("float32",d,[1,4,r,n]):new j("float32",d,[1,3,r,n])},E=async(e,t)=>{let r="u">typeof HTMLImageElement&&e instanceof HTMLImageElement,n="u">typeof ImageData&&e instanceof ImageData,i="u">typeof ImageBitmap&&e instanceof ImageBitmap,o="string"==typeof e,a,s=t??{},u=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},l=e=>"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext("2d"):null;if(r){let r=u();r.width=e.width,r.height=e.height;let n=l(r);if(null!=n){let r=e.height,i=e.width;if(void 0!==t&&void 0!==t.resizedHeight&&void 0!==t.resizedWidth&&(r=t.resizedHeight,i=t.resizedWidth),void 0!==t){if(s=t,void 0!==t.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=r,s.width=i}else s.tensorFormat="RGBA",s.height=r,s.width=i;n.drawImage(e,0,0),a=n.getImageData(0,0,i,r).data}else throw Error("Can not access image data")}else if(n){let r,n;if(void 0!==t&&void 0!==t.resizedWidth&&void 0!==t.resizedHeight?(r=t.resizedHeight,n=t.resizedWidth):(r=e.height,n=e.width),void 0!==t&&(s=t),s.format="RGBA",s.height=r,s.width=n,void 0!==t){let t=u();t.width=n,t.height=r;let i=l(t);if(null!=i)i.putImageData(e,0,0),a=i.getImageData(0,0,n,r).data;else throw Error("Can not access image data")}else a=e.data}else if(i){if(void 0===t)throw Error("Please provide image config with format for Imagebitmap");let r=u();r.width=e.width,r.height=e.height;let n=l(r);if(null!=n){let t=e.height,r=e.width;return n.drawImage(e,0,0,r,t),a=n.getImageData(0,0,r,t).data,s.height=t,s.width=r,O(a,s)}throw Error("Can not access image data")}else{if(o)return new Promise((t,r)=>{let n=u(),i=l(n);if(!e||!i)return r();let o=new Image;o.crossOrigin="Anonymous",o.src=e,o.onload=()=>{n.width=o.width,n.height=o.height,i.drawImage(o,0,0,n.width,n.height);let e=i.getImageData(0,0,n.width,n.height);s.height=n.height,s.width=n.width,t(O(e.data,s))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==a)return O(a,s);throw Error("Input data provided is not supported - aborted tensor creation")},A=(e,t)=>{let{width:r,height:n,download:i,dispose:o}=t;return new j({location:"texture",type:"float32",texture:e,dims:[1,n,r,4],download:i,dispose:o})},P=(e,t)=>{let{dataType:r,dims:n,download:i,dispose:o}=t;return new j({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:i,dispose:o})},k=(e,t)=>{let{dataType:r,dims:n,download:i,dispose:o}=t;return new j({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:i,dispose:o})},D=(e,t,r)=>new j({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),ea=G(()=>{"use strict";N=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),C=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),z=!1,R=()=>{if(!z){z=!0;let e="u">typeof BigInt64Array&&BigInt64Array.from,t="u">typeof BigUint64Array&&BigUint64Array.from,r=globalThis.Float16Array,n="u">typeof r&&r.from;e&&(N.set("int64",BigInt64Array),C.set(BigInt64Array,"int64")),t&&(N.set("uint64",BigUint64Array),C.set(BigUint64Array,"uint64")),n?(N.set("float16",r),C.set(r,"float16")):N.set("float16",Uint16Array)}}}),es=G(()=>{"use strict";eu(),B=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if("number"!=typeof n||!Number.isSafeInteger(n))throw TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},M=(e,t)=>{switch(e.location){case"cpu":return new j(e.type,e.data,t);case"cpu-pinned":return new j({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new j({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new j({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new j({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),eu=G(()=>{"use strict";ei(),eo(),ea(),es(),j=class{constructor(e,t,r){let n,i;if(R(),"object"==typeof e&&"location"in e)switch(this.dataLocation=e.location,n=e.type,i=e.dims,e.location){case"cpu-pinned":{let t=N.get(n);if(!t)throw TypeError(`unsupported type "${n}" to create tensor from pinned buffer`);if(!(e.data instanceof t))throw TypeError(`buffer should be of type ${t.name}`);this.cpuData=e.data;break}case"texture":if("float32"!==n)throw TypeError(`unsupported type "${n}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case"gpu-buffer":if("float32"!==n&&"float16"!==n&&"int32"!==n&&"int64"!==n&&"uint32"!==n&&"uint8"!==n&&"bool"!==n&&"uint4"!==n&&"int4"!==n)throw TypeError(`unsupported type "${n}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case"ml-tensor":if("float32"!==n&&"float16"!==n&&"int32"!==n&&"int64"!==n&&"uint32"!==n&&"uint64"!==n&&"int8"!==n&&"uint8"!==n&&"bool"!==n&&"uint4"!==n&&"int4"!==n)throw TypeError(`unsupported type "${n}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,a;if("string"==typeof e)if(n=e,a=r,"string"===e){if(!Array.isArray(t))throw TypeError("A string tensor's data must be a string array.");o=t}else{let r=N.get(e);if(void 0===r)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if("float16"===e&&r===Uint16Array||"uint4"===e||"int4"===e)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${r.name} as data.`);o="uint64"===e||"int64"===e?r.from(t,BigInt):r.from(t)}else if(t instanceof r)o=t;else if(t instanceof Uint8ClampedArray)if("uint8"===e)o=Uint8Array.from(t);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===e&&t instanceof Uint16Array&&r!==Uint16Array)o=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw TypeError(`A ${n} tensor's data must be type of ${r}`)}else if(a=t,Array.isArray(e)){if(0===e.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let t=typeof e[0];if("string"===t)n="string",o=e;else if("boolean"===t)n="bool",o=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${t}.`)}else if(e instanceof Uint8ClampedArray)n="uint8",o=Uint8Array.from(e);else{let t=C.get(e.constructor);if(void 0===t)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);n=t,o=e}if(void 0===a)a=[o.length];else if(!Array.isArray(a))throw TypeError("A tensor's dims must be a number array");i=a,this.cpuData=o,this.dataLocation="cpu"}let o=B(i);if(this.cpuData&&o!==this.cpuData.length&&("uint4"!==n&&"int4"!==n||Math.ceil(o/2)!==this.cpuData.length))throw Error(`Tensor's size(${o}) does not match data length(${this.cpuData.length}).`);this.type=n,this.dims=i,this.size=o}static async fromImage(e,t){return E(e,t)}static fromTexture(e,t){return A(e,t)}static fromGpuBuffer(e,t){return P(e,t)}static fromMLTensor(e,t){return k(e,t)}static fromPinnedBuffer(e,t,r){return D(e,t,r)}toDataURL(e){return I(this,e)}toImageData(e){return S(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return M(this,e)}}}),el=G(()=>{"use strict";eu(),F=j}),ed=G(()=>{"use strict";J(),en(),el(),er(),L=class e{constructor(e,t){this.handler=e,this.backend=t}async run(e,t,r){let n;v(),w("InferenceSession.run");let i={},o={};if("object"!=typeof e||null===e||e instanceof F||Array.isArray(e))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if("object"==typeof t){if(null===t)throw TypeError("Unexpected argument[1]: cannot be null.");if(t instanceof F)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(t)){if(0===t.length)throw TypeError("'fetches' cannot be an empty array.");for(let e of(a=!1,t)){if("string"!=typeof e)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(e))throw RangeError(`'fetches' contains invalid output name: ${e}.`);i[e]=null}if("object"==typeof r&&null!==r)o=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else{let e=!1,n=Object.getOwnPropertyNames(t);for(let r of this.outputNames)if(-1!==n.indexOf(r)){let n=t[r];(null===n||n instanceof F)&&(e=!0,a=!1,i[r]=n)}if(e){if("object"==typeof r&&null!==r)o=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else o=t}}else if("u">typeof t)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let t of this.inputNames)if(typeof e[t]>"u")throw Error(`input '${t}' is missing in 'feeds'.`);if(a)for(let e of this.outputNames)i[e]=null;if(void 0!==o.activeLoraAdapters){if(!Array.isArray(o.activeLoraAdapters))throw TypeError("'activeLoraAdapters' must be an array.");n=o.activeLoraAdapters.map(e=>{if(!(e instanceof T))throw TypeError("'activeLoraAdapters' must be an array of LoraAdapter objects.");if(e.backend!==this.backend)throw Error("LoRA adapter was created by a different backend than the session.");return e.handler})}let s=await this.handler.run(e,i,o,n),u={};for(let e in s)if(Object.hasOwnProperty.call(s,e)){let t=s[e];t instanceof F?u[e]=t:u[e]=new F(t.type,t.data,t.dims)}return $("InferenceSession.run"),x(),u}async release(){return this.handler.dispose()}static async create(t,r,n,i){v(),w("InferenceSession.create");let o,a={};if("string"==typeof t){if(o=t,"object"==typeof r&&null!==r)a=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(o=t,"object"==typeof r&&null!==r)a=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&t instanceof SharedArrayBuffer){let e=0,s=t.byteLength;if("object"==typeof r&&null!==r)a=r;else if("number"==typeof r){if(!Number.isSafeInteger(e=r))throw RangeError("'byteOffset' must be an integer.");if(e<0||e>=t.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${t.byteLength}).`);if(s=t.byteLength-e,"number"==typeof n){if(!Number.isSafeInteger(s=n))throw RangeError("'byteLength' must be an integer.");if(s<=0||e+s>t.byteLength)throw RangeError(`'byteLength' is out of range (0, ${t.byteLength-e}].`);if("object"==typeof i&&null!==i)a=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if("u">typeof n)throw TypeError("'byteLength' must be a number.")}else if("u">typeof r)throw TypeError("'options' must be an object.");o=new Uint8Array(t,e,s)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await c(a),l=await s.createInferenceSessionHandler(o,u);return $("InferenceSession.create"),x(),new e(l,s)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),ep=G(()=>{"use strict";ed(),V=L}),ec=G(()=>{"use strict";en(),U=T}),eh=G(()=>{}),ef=G(()=>{}),em=G(()=>{}),eg=G(()=>{}),eb={};W(eb,{InferenceSession:()=>V,LoraAdapter:()=>U,TRACE:()=>y,TRACE_EVENT_BEGIN:()=>w,TRACE_EVENT_END:()=>$,TRACE_FUNC_BEGIN:()=>v,TRACE_FUNC_END:()=>x,Tensor:()=>F,env:()=>b,registerBackend:()=>d});var ey=G(()=>{"use strict";Q(),et(),ep(),ec(),el(),eh(),ef(),er(),em(),eg()});function e_(e,t,r,n){if(void 0===t){var i;return i=e,{verbose:e_.verbose.bind(null,i),info:e_.info.bind(null,i),warning:e_.warning.bind(null,i),error:e_.error.bind(null,i),fatal:e_.fatal.bind(null,i)}}if(void 0===r)ev(e,t,1);else if("number"==typeof r&&void 0===n)ev(e,t,r);else if("string"==typeof r&&void 0===n)ev(e,r,1,t);else if("string"==typeof r&&"number"==typeof n)ev(e,r,n,t);else throw TypeError("input is valid")}function ev(e,t,r,n){let i=eS[n||""]||eS[""];e$[e]<e$[i.minimalSeverity]||(i.logDateTime&&(t=`${new Date().toISOString()}|${t}`),i.logSourceLocation,eT[i.provider].log(e,t,n))}var ex,ew,e$,eT,eI,eS,eO,eE,eA,eP,ek,eD=G(()=>{"use strict";ex=class{log(e,t,r){}},ew=class{log(e,t,r){console.log(`${this.color(e)} ${r?"\x1b[35m"+r+"\x1b[0m ":""}${t}`)}color(e){switch(e){case"verbose":return"\x1b[34;40mv\x1b[0m";case"info":return"\x1b[32mi\x1b[0m";case"warning":return"\x1b[30;43mw\x1b[0m";case"error":return"\x1b[31;40me\x1b[0m";case"fatal":return"\x1b[101mf\x1b[0m";default:throw Error(`unsupported severity: ${e}`)}}},e$={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},eT={none:new ex,console:new ew},eS={"":eI={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1}};var e=e_||={};function t(e){eS={},r("",e||{})}function r(e,r){if("*"===e)t(r);else{let t=eS[e]||eI;eS[e]={provider:r.provider||t.provider,minimalSeverity:r.minimalSeverity||t.minimalSeverity,logDateTime:void 0===r.logDateTime?t.logDateTime:r.logDateTime,logSourceLocation:void 0===r.logSourceLocation?t.logSourceLocation:r.logSourceLocation}}}e.verbose=function(t,r){e("verbose",t,r)},e.info=function(t,r){e("info",t,r)},e.warning=function(t,r){e("warning",t,r)},e.error=function(t,r){e("error",t,r)},e.fatal=function(t,r){e("fatal",t,r)},e.reset=t,e.set=r,e.setWithEnv=function(e){let t={};e.logLevel&&(t.minimalSeverity=e.logLevel),r("",t)},eO=e_,eE=class{constructor(e,t,r,n,i,o){this.category=e,this.name=t,this.startTime=r,this.endCallback=n,this.timer=i,this.ctx=o}async end(){return this.endCallback(this)}async checkTimer(){if(void 0===this.ctx||void 0===this.timer)throw Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},eA=class{constructor(e,t,r,n){this.category=e,this.name=t,this.startTime=r,this.endTime=n}},eP=class{constructor(e,t,r){this._started=!1,this._flushPointer=0,this._started=!1,this._maxNumberEvents=void 0===e?1e4:e,this._flushBatchSize=void 0===t?10:t,this._flushIntervalInMilliseconds=void 0===r?5e3:r}static create(e){return void 0===e?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=ek(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,t,r,n){let i=this._started?this.begin(e,t,n):void 0,o=!1,a=r();if(a&&"function"==typeof a.then)return o=!0,new Promise((e,t)=>{a.then(async t=>{i&&await i.end(),e(t)},async e=>{i&&await i.end(),t(e)})});if(!o&&i){let e=i.end();if(e&&"function"==typeof e.then)return new Promise((t,r)=>{e.then(()=>{t(a)},e=>{r(e)})})}return a}begin(e,t,r){if(!this._started)throw Error("profiler is not started yet");if(void 0!==r)return new eE(e,t,0,async e=>this.end(e),r.beginTimer(),r);{let r=ek();return this.flush(r),new eE(e,t,r,e=>this.endSync(e))}}async end(e){let t=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new eA(e.category,e.name,e.startTime,t)),this.flush(t))}endSync(e){let t=ek();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new eA(e.category,e.name,e.startTime,t)),this.flush(t))}logOneEvent(e){eO.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let e=this._flushPointer;this._flushPointer<e+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=ek()}}get started(){return this._started}},ek="u">typeof performance&&performance.now?()=>performance.now():Date.now}),eN=G(()=>{}),eC=H(e=>{"use strict";e.__esModule=!0,e.Guid=function(){function e(t){if(!t)throw TypeError("Invalid argument; `value` has no value.");this.value=e.EMPTY,t&&e.isGuid(t)&&(this.value=t)}return e.isGuid=function(t){var r=t.toString();return t&&(t instanceof e||e.validator.test(r))},e.create=function(){return new e([e.gen(2),e.gen(1),e.gen(1),e.gen(1),e.gen(3)].join("-"))},e.createEmpty=function(){return new e("emptyguid")},e.parse=function(t){return new e(t)},e.raw=function(){return[e.gen(2),e.gen(1),e.gen(1),e.gen(1),e.gen(3)].join("-")},e.gen=function(e){for(var t="",r=0;r<e;r++)t+=((1+Math.random())*65536|0).toString(16).substring(1);return t},e.prototype.equals=function(t){return e.isGuid(t)&&this.value===t.toString()},e.prototype.isEmpty=function(){return this.value===e.EMPTY},e.prototype.toString=function(){return this.value},e.prototype.toJSON=function(){return{value:this.value}},e.validator=RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),e.EMPTY="00000000-0000-0000-0000-000000000000",e}()});function ez(e,t,r){this.low=0|e,this.high=0|t,this.unsigned=!!r}function eR(e){return(e&&e.__isLong__)===!0}function eB(e){var t=Math.clz32(e&-e);return e?31-t:t}function eM(e,t){var r,n,i;return t?(e>>>=0,(i=0<=e&&e<256)&&(n=eG[e])?n:(r=eF(e,0,!0),i&&(eG[e]=r),r)):(e|=0,(i=-128<=e&&e<128)&&(n=eq[e])?n:(r=eF(e,e<0?-1:0,!1),i&&(eq[e]=r),r))}function ej(e,t){if(isNaN(e))return t?eQ:eJ;if(t){if(e<0)return eQ;if(e>=eK)return e3}else{if(e<=-eX)return e4;if(e+1>=eX)return e2}return e<0?ej(-e,t).neg():eF(e%eW|0,e/eW|0,t)}function eF(e,t,r){return new ez(e,t,r)}function eL(e,t,r){if(0===e.length)throw Error("empty string");if("number"==typeof t?(r=t,t=!1):t=!!t,"NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return t?eQ:eJ;if((r=r||10)<2||36<r)throw RangeError("radix");if((n=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===n)return eL(e.substring(1),t,r).neg();for(var n,i=ej(eH(r,8)),o=eJ,a=0;a<e.length;a+=8){var s=Math.min(8,e.length-a),u=parseInt(e.substring(a,a+s),r);if(s<8){var l=ej(eH(r,s));o=o.mul(l).add(ej(u))}else o=(o=o.mul(i)).add(ej(u))}return o.unsigned=t,o}function eV(e,t){return"number"==typeof e?ej(e,t):"string"==typeof e?eL(e,t):eF(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}var eU,eq,eG,eH,eW,eK,eX,eZ,eJ,eQ,eY,e0,e1,e2,e3,e4,e6,e5,e8,e7,e9,te,tt,tr,tn,ti,to=G(()=>{eU=null;try{eU=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}ez.prototype.__isLong__,Object.defineProperty(ez.prototype,"__isLong__",{value:!0}),ez.isLong=eR,eq={},eG={},ez.fromInt=eM,ez.fromNumber=ej,ez.fromBits=eF,eH=Math.pow,ez.fromString=eL,ez.fromValue=eV,eX=(eK=(eW=0x100000000)*eW)/2,eZ=eM(0x1000000),ez.ZERO=eJ=eM(0),ez.UZERO=eQ=eM(0,!0),ez.ONE=eY=eM(1),ez.UONE=e0=eM(1,!0),ez.NEG_ONE=e1=eM(-1),ez.MAX_VALUE=e2=eF(-1,0x7fffffff,!1),ez.MAX_UNSIGNED_VALUE=e3=eF(-1,-1,!0),ez.MIN_VALUE=e4=eF(0,-0x80000000,!1),(e6=ez.prototype).toInt=function(){return this.unsigned?this.low>>>0:this.low},e6.toNumber=function(){return this.unsigned?(this.high>>>0)*eW+(this.low>>>0):this.high*eW+(this.low>>>0)},e6.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(!this.eq(e4))return"-"+this.neg().toString(e);else{var t=ej(e),r=this.div(t),n=r.mul(t).sub(this);return r.toString(e)+n.toInt().toString(e)}for(var i=ej(eH(e,6),this.unsigned),o=this,a="";;){var s=o.div(i),u=(o.sub(s.mul(i)).toInt()>>>0).toString(e);if((o=s).isZero())return u+a;for(;u.length<6;)u="0"+u;a=""+u+a}},e6.getHighBits=function(){return this.high},e6.getHighBitsUnsigned=function(){return this.high>>>0},e6.getLowBits=function(){return this.low},e6.getLowBitsUnsigned=function(){return this.low>>>0},e6.getNumBitsAbs=function(){if(this.isNegative())return this.eq(e4)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return 0!=this.high?t+33:t+1},e6.isSafeInteger=function(){var e=this.high>>21;return!e||!this.unsigned&&-1===e&&(0!==this.low||-2097152!==this.high)},e6.isZero=function(){return 0===this.high&&0===this.low},e6.eqz=e6.isZero,e6.isNegative=function(){return!this.unsigned&&this.high<0},e6.isPositive=function(){return this.unsigned||this.high>=0},e6.isOdd=function(){return(1&this.low)==1},e6.isEven=function(){return(1&this.low)==0},e6.equals=function(e){return eR(e)||(e=eV(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&this.high===e.high&&this.low===e.low},e6.eq=e6.equals,e6.notEquals=function(e){return!this.eq(e)},e6.neq=e6.notEquals,e6.ne=e6.notEquals,e6.lessThan=function(e){return 0>this.comp(e)},e6.lt=e6.lessThan,e6.lessThanOrEqual=function(e){return 0>=this.comp(e)},e6.lte=e6.lessThanOrEqual,e6.le=e6.lessThanOrEqual,e6.greaterThan=function(e){return this.comp(e)>0},e6.gt=e6.greaterThan,e6.greaterThanOrEqual=function(e){return this.comp(e)>=0},e6.gte=e6.greaterThanOrEqual,e6.ge=e6.greaterThanOrEqual,e6.compare=function(e){if(eR(e)||(e=eV(e)),this.eq(e))return 0;var t=this.isNegative(),r=e.isNegative();return t&&!r?-1:!t&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},e6.comp=e6.compare,e6.negate=function(){return!this.unsigned&&this.eq(e4)?e4:this.not().add(eY)},e6.neg=e6.negate,e6.add=function(e){eR(e)||(e=eV(e));var t,r,n=this.high>>>16,i=65535&this.high,o=this.low>>>16,a=65535&this.low,s=e.high>>>16,u=65535&e.high,l=e.low>>>16,d=65535&e.low,p=0,c=0;return r=0+((t=0+(a+d))>>>16),t&=65535,r+=o+l,c+=r>>>16,r&=65535,c+=i+u,p+=c>>>16,c&=65535,p+=n+s,eF(r<<16|t,(p&=65535)<<16|c,this.unsigned)},e6.subtract=function(e){return eR(e)||(e=eV(e)),this.add(e.neg())},e6.sub=e6.subtract,e6.multiply=function(e){if(this.isZero())return this;if(eR(e)||(e=eV(e)),eU)return eF(eU.mul(this.low,this.high,e.low,e.high),eU.get_high(),this.unsigned);if(e.isZero())return this.unsigned?eQ:eJ;if(this.eq(e4))return e.isOdd()?e4:eJ;if(e.eq(e4))return this.isOdd()?e4:eJ;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(eZ)&&e.lt(eZ))return ej(this.toNumber()*e.toNumber(),this.unsigned);var t,r,n=this.high>>>16,i=65535&this.high,o=this.low>>>16,a=65535&this.low,s=e.high>>>16,u=65535&e.high,l=e.low>>>16,d=65535&e.low,p=0,c=0;return r=0+((t=0+a*d)>>>16),t&=65535,r+=o*d,c+=r>>>16,r&=65535,r+=a*l,c+=r>>>16,r&=65535,c+=i*d,p+=c>>>16,c&=65535,c+=o*l,p+=c>>>16,c&=65535,c+=a*u,p+=c>>>16,c&=65535,p+=n*d+i*l+o*u+a*s,eF(r<<16|t,(p&=65535)<<16|c,this.unsigned)},e6.mul=e6.multiply,e6.divide=function(e){if(eR(e)||(e=eV(e)),e.isZero())throw Error("division by zero");if(eU){var t,r,n;return this.unsigned||-0x80000000!==this.high||-1!==e.low||-1!==e.high?eF((this.unsigned?eU.div_u:eU.div_s)(this.low,this.high,e.low,e.high),eU.get_high(),this.unsigned):this}if(this.isZero())return this.unsigned?eQ:eJ;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return eQ;if(e.gt(this.shru(1)))return e0;n=eQ}else{if(this.eq(e4))return e.eq(eY)||e.eq(e1)?e4:e.eq(e4)?eY:(t=this.shr(1).div(e).shl(1)).eq(eJ)?e.isNegative()?eY:e1:(r=this.sub(e.mul(t)),n=t.add(r.div(e)));if(e.eq(e4))return this.unsigned?eQ:eJ;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();n=eJ}for(r=this;r.gte(e);){t=Math.max(1,Math.floor(r.toNumber()/e.toNumber()));for(var i=Math.ceil(Math.log(t)/Math.LN2),o=i<=48?1:eH(2,i-48),a=ej(t),s=a.mul(e);s.isNegative()||s.gt(r);)t-=o,s=(a=ej(t,this.unsigned)).mul(e);a.isZero()&&(a=eY),n=n.add(a),r=r.sub(s)}return n},e6.div=e6.divide,e6.modulo=function(e){return(eR(e)||(e=eV(e)),eU)?eF((this.unsigned?eU.rem_u:eU.rem_s)(this.low,this.high,e.low,e.high),eU.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},e6.mod=e6.modulo,e6.rem=e6.modulo,e6.not=function(){return eF(~this.low,~this.high,this.unsigned)},e6.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},e6.clz=e6.countLeadingZeros,e6.countTrailingZeros=function(){return this.low?eB(this.low):eB(this.high)+32},e6.ctz=e6.countTrailingZeros,e6.and=function(e){return eR(e)||(e=eV(e)),eF(this.low&e.low,this.high&e.high,this.unsigned)},e6.or=function(e){return eR(e)||(e=eV(e)),eF(this.low|e.low,this.high|e.high,this.unsigned)},e6.xor=function(e){return eR(e)||(e=eV(e)),eF(this.low^e.low,this.high^e.high,this.unsigned)},e6.shiftLeft=function(e){return eR(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?eF(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):eF(0,this.low<<e-32,this.unsigned)},e6.shl=e6.shiftLeft,e6.shiftRight=function(e){return eR(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?eF(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):eF(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},e6.shr=e6.shiftRight,e6.shiftRightUnsigned=function(e){return eR(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?eF(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):32===e?eF(this.high,0,this.unsigned):eF(this.high>>>e-32,0,this.unsigned)},e6.shru=e6.shiftRightUnsigned,e6.shr_u=e6.shiftRightUnsigned,e6.rotateLeft=function(e){var t;return eR(e)&&(e=e.toInt()),0==(e&=63)?this:32===e?eF(this.high,this.low,this.unsigned):e<32?(t=32-e,eF(this.low<<e|this.high>>>t,this.high<<e|this.low>>>t,this.unsigned)):(e-=32,t=32-e,eF(this.high<<e|this.low>>>t,this.low<<e|this.high>>>t,this.unsigned))},e6.rotl=e6.rotateLeft,e6.rotateRight=function(e){var t;return eR(e)&&(e=e.toInt()),0==(e&=63)?this:32===e?eF(this.high,this.low,this.unsigned):e<32?(t=32-e,eF(this.high<<t|this.low>>>e,this.low<<t|this.high>>>e,this.unsigned)):(e-=32,t=32-e,eF(this.low<<t|this.high>>>e,this.high<<t|this.low>>>e,this.unsigned))},e6.rotr=e6.rotateRight,e6.toSigned=function(){return this.unsigned?eF(this.low,this.high,!1):this},e6.toUnsigned=function(){return this.unsigned?this:eF(this.low,this.high,!0)},e6.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},e6.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},e6.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},ez.fromBytes=function(e,t,r){return r?ez.fromBytesLE(e,t):ez.fromBytesBE(e,t)},ez.fromBytesLE=function(e,t){return new ez(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},ez.fromBytesBE=function(e,t){return new ez(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)},"function"==typeof BigInt&&(ez.fromBigInt=function(e,t){return eF(Number(BigInt.asIntN(32,e)),Number(BigInt.asIntN(32,e>>BigInt(32))),t)},ez.fromValue=function(e,t){return"bigint"==typeof e?ez.fromBigInt(e,t):eV(e,t)},e6.toBigInt=function(){var e=BigInt(this.low>>>0);return BigInt(this.unsigned?this.high>>>0:this.high)<<BigInt(32)|e}),e5=ez}),ta=H(e=>{"use strict";var t,r;Object.defineProperty(e,"__esModule",{value:!0}),e.ArgType=void 0,(r=t||(e.ArgType=t={}))[r.INPUT=0]="INPUT",r[r.OUTPUT=1]="OUTPUT"}),ts=H(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0,e.SIZEOF_SHORT=2,e.SIZEOF_INT=4,e.FILE_IDENTIFIER_LENGTH=4,e.SIZE_PREFIX_LENGTH=4}),tu=H(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isLittleEndian=e.float64=e.float32=e.int32=void 0,e.int32=new Int32Array(2),e.float32=new Float32Array(e.int32.buffer),e.float64=new Float64Array(e.int32.buffer),e.isLittleEndian=1===new Uint16Array(new Uint8Array([1,0]).buffer)[0]}),tl=H(e=>{"use strict";var t,r;Object.defineProperty(e,"__esModule",{value:!0}),e.Encoding=void 0,(r=t||(e.Encoding=t={}))[r.UTF8_BYTES=1]="UTF8_BYTES",r[r.UTF16_STRING=2]="UTF16_STRING"}),td=H(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=void 0;var t=ts(),r=tl(),n=tu();e.ByteBuffer=class e{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(t){return new e(new Uint8Array(t))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return n.int32[0]=this.readInt32(e),n.float32[0]}readFloat64(e){return n.int32[+!n.isLittleEndian]=this.readInt32(e),n.int32[+!!n.isLittleEndian]=this.readInt32(e+4),n.float64[0]}writeInt8(e,t){this.bytes_[e]=t}writeUint8(e,t){this.bytes_[e]=t}writeInt16(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8}writeUint16(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8}writeInt32(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8,this.bytes_[e+2]=t>>16,this.bytes_[e+3]=t>>24}writeUint32(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8,this.bytes_[e+2]=t>>16,this.bytes_[e+3]=t>>24}writeInt64(e,t){this.writeInt32(e,Number(BigInt.asIntN(32,t))),this.writeInt32(e+4,Number(BigInt.asIntN(32,t>>BigInt(32))))}writeUint64(e,t){this.writeUint32(e,Number(BigInt.asUintN(32,t))),this.writeUint32(e+4,Number(BigInt.asUintN(32,t>>BigInt(32))))}writeFloat32(e,t){n.float32[0]=t,this.writeInt32(e,n.int32[0])}writeFloat64(e,t){n.float64[0]=t,this.writeInt32(e,n.int32[+!n.isLittleEndian]),this.writeInt32(e+4,n.int32[+!!n.isLittleEndian])}getBufferIdentifier(){if(this.bytes_.length<this.position_+t.SIZEOF_INT+t.FILE_IDENTIFIER_LENGTH)throw Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let r=0;r<t.FILE_IDENTIFIER_LENGTH;r++)e+=String.fromCharCode(this.readInt8(this.position_+t.SIZEOF_INT+r));return e}__offset(e,t){let r=e-this.readInt32(e);return t<this.readInt16(r)?this.readInt16(r+t):0}__union(e,t){return e.bb_pos=t+this.readInt32(t),e.bb=this,e}__string(e,n){e+=this.readInt32(e);let i=this.readInt32(e);e+=t.SIZEOF_INT;let o=this.bytes_.subarray(e,e+i);return n===r.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,t){return"string"==typeof e?this.__string(t):this.__union(e,t)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+t.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=t.FILE_IDENTIFIER_LENGTH)throw Error("FlatBuffers: file identifier must be length "+t.FILE_IDENTIFIER_LENGTH);for(let r=0;r<t.FILE_IDENTIFIER_LENGTH;r++)if(e.charCodeAt(r)!=this.readInt8(this.position()+t.SIZEOF_INT+r))return!1;return!0}createScalarList(e,t){let r=[];for(let n=0;n<t;++n){let t=e(n);null!==t&&r.push(t)}return r}createObjList(e,t){let r=[];for(let n=0;n<t;++n){let t=e(n);null!==t&&r.push(t.unpack())}return r}}}),tp=H(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Builder=void 0;var t=td(),r=ts();e.Builder=class e{constructor(e){let r;this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder,r=e||1024,this.bb=t.ByteBuffer.allocate(r),this.space=r}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(t,r){t>this.minalign&&(this.minalign=t);let n=~(this.bb.capacity()-this.space+r)+1&t-1;for(;this.space<n+t+r;){let t=this.bb.capacity();this.bb=e.growByteBuffer(this.bb),this.space+=this.bb.capacity()-t}this.pad(n)}pad(e){for(let t=0;t<e;t++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,t,r){(this.force_defaults||t!=r)&&(this.addInt8(t),this.slot(e))}addFieldInt16(e,t,r){(this.force_defaults||t!=r)&&(this.addInt16(t),this.slot(e))}addFieldInt32(e,t,r){(this.force_defaults||t!=r)&&(this.addInt32(t),this.slot(e))}addFieldInt64(e,t,r){(this.force_defaults||t!==r)&&(this.addInt64(t),this.slot(e))}addFieldFloat32(e,t,r){(this.force_defaults||t!=r)&&(this.addFloat32(t),this.slot(e))}addFieldFloat64(e,t,r){(this.force_defaults||t!=r)&&(this.addFloat64(t),this.slot(e))}addFieldOffset(e,t,r){(this.force_defaults||t!=r)&&(this.addOffset(t),this.slot(e))}addFieldStruct(e,t,r){t!=r&&(this.nested(t),this.slot(e))}nested(e){if(e!=this.offset())throw TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){null!==this.vtable&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let r=e.capacity();if(0xc0000000&r)throw Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let n=r<<1,i=t.ByteBuffer.allocate(n);return i.setPosition(n-r),i.bytes().set(e.bytes(),n-r),i}addOffset(e){this.prep(r.SIZEOF_INT,0),this.writeInt32(this.offset()-e+r.SIZEOF_INT)}startObject(e){this.notNested(),null==this.vtable&&(this.vtable=[]),this.vtable_in_use=e;for(let t=0;t<e;t++)this.vtable[t]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(null==this.vtable||!this.isNested)throw Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),t=this.vtable_in_use-1;for(;t>=0&&0==this.vtable[t];t--);let n=t+1;for(;t>=0;t--)this.addInt16(0!=this.vtable[t]?e-this.vtable[t]:0);this.addInt16(e-this.object_start);let i=(n+2)*r.SIZEOF_SHORT;this.addInt16(i);let o=0,a=this.space;e:for(t=0;t<this.vtables.length;t++){let e=this.bb.capacity()-this.vtables[t];if(i==this.bb.readInt16(e)){for(let t=r.SIZEOF_SHORT;t<i;t+=r.SIZEOF_SHORT)if(this.bb.readInt16(a+t)!=this.bb.readInt16(e+t))continue e;o=this.vtables[t];break}}return o?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,o-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,t,n){let i=n?r.SIZE_PREFIX_LENGTH:0;if(t){if(this.prep(this.minalign,r.SIZEOF_INT+r.FILE_IDENTIFIER_LENGTH+i),t.length!=r.FILE_IDENTIFIER_LENGTH)throw TypeError("FlatBuffers: file identifier must be length "+r.FILE_IDENTIFIER_LENGTH);for(let e=r.FILE_IDENTIFIER_LENGTH-1;e>=0;e--)this.writeInt8(t.charCodeAt(e))}this.prep(this.minalign,r.SIZEOF_INT+i),this.addOffset(e),i&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,t){this.finish(e,t,!0)}requiredField(e,t){let r=this.bb.capacity()-e,n=r-this.bb.readInt32(r);if(!(t<this.bb.readInt16(n)&&0!=this.bb.readInt16(n+t)))throw TypeError("FlatBuffers: field "+t+" must be set")}startVector(e,t,n){this.notNested(),this.vector_num_elems=t,this.prep(r.SIZEOF_INT,e*t),this.prep(n,e*t)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let t=this.createString(e);return this.string_maps.set(e,t),t}createString(e){let t;return null==e?0:(t=e instanceof Uint8Array?e:this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,t.length,1),this.bb.setPosition(this.space-=t.length),this.bb.bytes().set(t,this.space),this.endVector())}createByteVector(e){return null==e?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return null===e?0:"string"==typeof e?this.createString(e):e.pack(this)}createObjectOffsetList(e){let t=[];for(let r=0;r<e.length;++r){let n=e[r];if(null!==n)t.push(this.createObjectOffset(n));else throw TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return t}createStructOffsetList(e,t){return t(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}}}),tc=H(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Encoding=e.ByteBuffer=e.Builder=e.isLittleEndian=e.int32=e.float64=e.float32=e.SIZE_PREFIX_LENGTH=e.SIZEOF_SHORT=e.SIZEOF_INT=e.FILE_IDENTIFIER_LENGTH=void 0;var t=ts();Object.defineProperty(e,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return t.FILE_IDENTIFIER_LENGTH}}),Object.defineProperty(e,"SIZEOF_INT",{enumerable:!0,get:function(){return t.SIZEOF_INT}}),Object.defineProperty(e,"SIZEOF_SHORT",{enumerable:!0,get:function(){return t.SIZEOF_SHORT}}),Object.defineProperty(e,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return t.SIZE_PREFIX_LENGTH}});var r=tu();Object.defineProperty(e,"float32",{enumerable:!0,get:function(){return r.float32}}),Object.defineProperty(e,"float64",{enumerable:!0,get:function(){return r.float64}}),Object.defineProperty(e,"int32",{enumerable:!0,get:function(){return r.int32}}),Object.defineProperty(e,"isLittleEndian",{enumerable:!0,get:function(){return r.isLittleEndian}});var n=tp();Object.defineProperty(e,"Builder",{enumerable:!0,get:function(){return n.Builder}});var i=td();Object.defineProperty(e,"ByteBuffer",{enumerable:!0,get:function(){return i.ByteBuffer}});var o=tl();Object.defineProperty(e,"Encoding",{enumerable:!0,get:function(){return o.Encoding}})}),th=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.ArgTypeAndIndex=void 0;var o=i(tc()),a=ta();e.ArgTypeAndIndex=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsArgTypeAndIndex(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsArgTypeAndIndex(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):a.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,t){e.addFieldInt8(0,t,a.ArgType.INPUT)}static addIndex(e,t){e.addFieldInt32(1,t,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(t,r,n){return e.startArgTypeAndIndex(t),e.addArgType(t,r),e.addIndex(t,n),e.endArgTypeAndIndex(t)}}}),tf=H(e=>{"use strict";var t,r;Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeType=void 0,(r=t||(e.AttributeType=t={}))[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.INT=2]="INT",r[r.STRING=3]="STRING",r[r.TENSOR=4]="TENSOR",r[r.GRAPH=5]="GRAPH",r[r.FLOATS=6]="FLOATS",r[r.INTS=7]="INTS",r[r.STRINGS=8]="STRINGS",r[r.TENSORS=9]="TENSORS",r[r.GRAPHS=10]="GRAPHS",r[r.SPARSE_TENSOR=11]="SPARSE_TENSOR",r[r.SPARSE_TENSORS=12]="SPARSE_TENSORS"}),tm=H(e=>{"use strict";var t,r;Object.defineProperty(e,"__esModule",{value:!0}),e.NodeType=void 0,(r=t||(e.NodeType=t={}))[r.Primitive=0]="Primitive",r[r.Fused=1]="Fused"}),tg=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.Node=void 0;var o=i(tc()),a=tB(),s=tm();e.Node=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNode(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNode(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}domain(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb_pos+t,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):s.NodeType.Primitive}executionProviderType(e){let t=this.bb.__offset(this.bb_pos,18);return t?this.bb.__string(this.bb_pos+t,e):null}inputs(e,t){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,t){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,t){let r=this.bb.__offset(this.bb_pos,24);return r?(t||new a.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readInt32(this.bb.__vector(this.bb_pos+t)+4*e):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,t){let r=this.bb.__offset(this.bb_pos,28);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addDomain(e,t){e.addFieldOffset(2,t,0)}static addSinceVersion(e,t){e.addFieldInt32(3,t,0)}static addIndex(e,t){e.addFieldInt32(4,t,0)}static addOpType(e,t){e.addFieldOffset(5,t,0)}static addType(e,t){e.addFieldInt32(6,t,s.NodeType.Primitive)}static addExecutionProviderType(e,t){e.addFieldOffset(7,t,0)}static addInputs(e,t){e.addFieldOffset(8,t,0)}static createInputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startInputsVector(e,t){e.startVector(4,t,4)}static addOutputs(e,t){e.addFieldOffset(9,t,0)}static createOutputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startOutputsVector(e,t){e.startVector(4,t,4)}static addAttributes(e,t){e.addFieldOffset(10,t,0)}static createAttributesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startAttributesVector(e,t){e.startVector(4,t,4)}static addInputArgCounts(e,t){e.addFieldOffset(11,t,0)}static createInputArgCountsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addInt32(t[r]);return e.endVector()}static startInputArgCountsVector(e,t){e.startVector(4,t,4)}static addImplicitInputs(e,t){e.addFieldOffset(12,t,0)}static createImplicitInputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startImplicitInputsVector(e,t){e.startVector(4,t,4)}static endNode(e){return e.endObject()}static createNode(t,r,n,i,o,a,s,u,l,d,p,c,h,f){return e.startNode(t),e.addName(t,r),e.addDocString(t,n),e.addDomain(t,i),e.addSinceVersion(t,o),e.addIndex(t,a),e.addOpType(t,s),e.addType(t,u),e.addExecutionProviderType(t,l),e.addInputs(t,d),e.addOutputs(t,p),e.addAttributes(t,c),e.addInputArgCounts(t,h),e.addImplicitInputs(t,f),e.endNode(t)}}}),tb=H(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.EdgeEnd=void 0,e.EdgeEnd=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,t,r,n){return e.prep(4,12),e.writeInt32(n),e.writeInt32(r),e.writeInt32(t),e.offset()}}}),ty=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.NodeEdge=void 0;var o=i(tc()),a=tb();e.NodeEdge=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNodeEdge(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNodeEdge(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new a.EdgeEnd).__init(this.bb.__vector(this.bb_pos+r)+12*e,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,t){let r=this.bb.__offset(this.bb_pos,8);return r?(t||new a.EdgeEnd).__init(this.bb.__vector(this.bb_pos+r)+12*e,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,t){e.addFieldInt32(0,t,0)}static addInputEdges(e,t){e.addFieldOffset(1,t,0)}static startInputEdgesVector(e,t){e.startVector(12,t,4)}static addOutputEdges(e,t){e.addFieldOffset(2,t,0)}static startOutputEdgesVector(e,t){e.startVector(12,t,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(t,r,n,i){return e.startNodeEdge(t),e.addNodeIndex(t,r),e.addInputEdges(t,n),e.addOutputEdges(t,i),e.endNodeEdge(t)}}}),t_=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.NodesToOptimizeIndices=void 0;var o=i(tc());e.NodesToOptimizeIndices=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNodesToOptimizeIndices(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNodesToOptimizeIndices(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndices(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb.__vector(this.bb_pos+t)+4*e):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return!!e&&!!this.bb.readInt8(this.bb_pos+e)}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return!!e&&!!this.bb.readInt8(this.bb_pos+e)}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,t){e.addFieldOffset(0,t,0)}static createNodeIndicesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addInt32(t[r]);return e.endVector()}static startNodeIndicesVector(e,t){e.startVector(4,t,4)}static addNumInputs(e,t){e.addFieldInt32(1,t,0)}static addNumOutputs(e,t){e.addFieldInt32(2,t,0)}static addHasVariadicInput(e,t){e.addFieldInt8(3,+t,0)}static addHasVariadicOutput(e,t){e.addFieldInt8(4,+t,0)}static addNumVariadicInputs(e,t){e.addFieldInt32(5,t,0)}static addNumVariadicOutputs(e,t){e.addFieldInt32(6,t,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(t,r,n,i,o,a,s,u){return e.startNodesToOptimizeIndices(t),e.addNodeIndices(t,r),e.addNumInputs(t,n),e.addNumOutputs(t,i),e.addHasVariadicInput(t,o),e.addHasVariadicOutput(t,a),e.addNumVariadicInputs(t,s),e.addNumVariadicOutputs(t,u),e.endNodesToOptimizeIndices(t)}}}),tv=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecord=void 0;var o=i(tc()),a=t_();e.RuntimeOptimizationRecord=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizationRecord(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizationRecord(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}actionId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}nodesToOptimizeIndices(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new a.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}producedOpIds(e,t){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,t){e.addFieldOffset(0,t,0)}static addNodesToOptimizeIndices(e,t){e.addFieldOffset(1,t,0)}static addProducedOpIds(e,t){e.addFieldOffset(3,t,0)}static createProducedOpIdsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startProducedOpIdsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}}}),tx=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecordContainerEntry=void 0;var o=i(tc()),a=tv();e.RuntimeOptimizationRecordContainerEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizationRecordContainerEntry(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}optimizerName(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}runtimeOptimizationRecords(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new a.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,t){e.addFieldOffset(0,t,0)}static addRuntimeOptimizationRecords(e,t){e.addFieldOffset(1,t,0)}static createRuntimeOptimizationRecordsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizationRecordContainerEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createRuntimeOptimizationRecordContainerEntry(t,r,n){return e.startRuntimeOptimizationRecordContainerEntry(t),e.addOptimizerName(t,r),e.addRuntimeOptimizationRecords(t,n),e.endRuntimeOptimizationRecordContainerEntry(t)}}}),tw=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizations=void 0;var o=i(tc()),a=tx();e.RuntimeOptimizations=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizations(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizations(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}records(e,t){let r=this.bb.__offset(this.bb_pos,4);return r?(t||new a.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,t){e.addFieldOffset(0,t,0)}static createRecordsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startRecordsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(t,r){return e.startRuntimeOptimizations(t),e.addRecords(t,r),e.endRuntimeOptimizations(t)}}}),t$=H(e=>{"use strict";var t,r;Object.defineProperty(e,"__esModule",{value:!0}),e.TensorDataType=void 0,(r=t||(e.TensorDataType=t={}))[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.UINT8=2]="UINT8",r[r.INT8=3]="INT8",r[r.UINT16=4]="UINT16",r[r.INT16=5]="INT16",r[r.INT32=6]="INT32",r[r.INT64=7]="INT64",r[r.STRING=8]="STRING",r[r.BOOL=9]="BOOL",r[r.FLOAT16=10]="FLOAT16",r[r.DOUBLE=11]="DOUBLE",r[r.UINT32=12]="UINT32",r[r.UINT64=13]="UINT64",r[r.COMPLEX64=14]="COMPLEX64",r[r.COMPLEX128=15]="COMPLEX128",r[r.BFLOAT16=16]="BFLOAT16",r[r.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",r[r.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",r[r.FLOAT8E5M2=19]="FLOAT8E5M2",r[r.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"}),tT=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.Tensor=void 0;var o=i(tc()),a=t$();e.Tensor=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTensor(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTensor(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}dims(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):a.TensorDataType.UNDEFINED}rawData(e){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readUint8(this.bb.__vector(this.bb_pos+t)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,t){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addDims(e,t){e.addFieldOffset(2,t,0)}static createDimsVector(e,t){e.startVector(8,t.length,8);for(let r=t.length-1;r>=0;r--)e.addInt64(t[r]);return e.endVector()}static startDimsVector(e,t){e.startVector(8,t,8)}static addDataType(e,t){e.addFieldInt32(3,t,a.TensorDataType.UNDEFINED)}static addRawData(e,t){e.addFieldOffset(4,t,0)}static createRawDataVector(e,t){e.startVector(1,t.length,1);for(let r=t.length-1;r>=0;r--)e.addInt8(t[r]);return e.endVector()}static startRawDataVector(e,t){e.startVector(1,t,1)}static addStringData(e,t){e.addFieldOffset(5,t,0)}static createStringDataVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startStringDataVector(e,t){e.startVector(4,t,4)}static addExternalDataOffset(e,t){e.addFieldInt64(6,t,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(t,r,n,i,o,a,s,u){return e.startTensor(t),e.addName(t,r),e.addDocString(t,n),e.addDims(t,i),e.addDataType(t,o),e.addRawData(t,a),e.addStringData(t,s),e.addExternalDataOffset(t,u),e.endTensor(t)}}}),tI=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.SparseTensor=void 0;var o=i(tc()),a=tT();e.SparseTensor=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsSparseTensor(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsSparseTensor(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}values(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new a.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}indices(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new a.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}dims(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,t){e.addFieldOffset(0,t,0)}static addIndices(e,t){e.addFieldOffset(1,t,0)}static addDims(e,t){e.addFieldOffset(2,t,0)}static createDimsVector(e,t){e.startVector(8,t.length,8);for(let r=t.length-1;r>=0;r--)e.addInt64(t[r]);return e.endVector()}static startDimsVector(e,t){e.startVector(8,t,8)}static endSparseTensor(e){return e.endObject()}}}),tS=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.MapType=void 0;var o=i(tc()),a=t$(),s=tC();e.MapType=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsMapType(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsMapType(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):a.TensorDataType.UNDEFINED}valueType(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new s.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,t){e.addFieldInt32(0,t,a.TensorDataType.UNDEFINED)}static addValueType(e,t){e.addFieldOffset(1,t,0)}static endMapType(e){return e.endObject()}}}),tO=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.SequenceType=void 0;var o=i(tc()),a=tC();e.SequenceType=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsSequenceType(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsSequenceType(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}elemType(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new a.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,t){e.addFieldOffset(0,t,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(t,r){return e.startSequenceType(t),e.addElemType(t,r),e.endSequenceType(t)}}}),tE=H(e=>{"use strict";var t,r;Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValueType=void 0,(r=t||(e.DimensionValueType=t={}))[r.UNKNOWN=0]="UNKNOWN",r[r.VALUE=1]="VALUE",r[r.PARAM=2]="PARAM"}),tA=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValue=void 0;var o=i(tc()),a=tE();e.DimensionValue=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDimensionValue(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDimensionValue(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):a.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,t){e.addFieldInt8(0,t,a.DimensionValueType.UNKNOWN)}static addDimValue(e,t){e.addFieldInt64(1,t,BigInt("0"))}static addDimParam(e,t){e.addFieldOffset(2,t,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(t,r,n,i){return e.startDimensionValue(t),e.addDimType(t,r),e.addDimValue(t,n),e.addDimParam(t,i),e.endDimensionValue(t)}}}),tP=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.Dimension=void 0;var o=i(tc()),a=tA();e.Dimension=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDimension(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDimension(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}value(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new a.DimensionValue).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}denotation(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}static startDimension(e){e.startObject(2)}static addValue(e,t){e.addFieldOffset(0,t,0)}static addDenotation(e,t){e.addFieldOffset(1,t,0)}static endDimension(e){return e.endObject()}static createDimension(t,r,n){return e.startDimension(t),e.addValue(t,r),e.addDenotation(t,n),e.endDimension(t)}}}),tk=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.Shape=void 0;var o=i(tc()),a=tP();e.Shape=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsShape(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsShape(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}dim(e,t){let r=this.bb.__offset(this.bb_pos,4);return r?(t||new a.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,t){e.addFieldOffset(0,t,0)}static createDimVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startDimVector(e,t){e.startVector(4,t,4)}static endShape(e){return e.endObject()}static createShape(t,r){return e.startShape(t),e.addDim(t,r),e.endShape(t)}}}),tD=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.TensorTypeAndShape=void 0;var o=i(tc()),a=tk(),s=t$();e.TensorTypeAndShape=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTensorTypeAndShape(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTensorTypeAndShape(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):s.TensorDataType.UNDEFINED}shape(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new a.Shape).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,t){e.addFieldInt32(0,t,s.TensorDataType.UNDEFINED)}static addShape(e,t){e.addFieldOffset(1,t,0)}static endTensorTypeAndShape(e){return e.endObject()}}}),tN=H(e=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TypeInfoValue=void 0,e.unionToTypeInfoValue=function(e,t){switch(r[e]){case"NONE":default:return null;case"tensor_type":return t(new o.TensorTypeAndShape);case"sequence_type":return t(new i.SequenceType);case"map_type":return t(new n.MapType)}},e.unionListToTypeInfoValue=function(e,t,a){switch(r[e]){case"NONE":default:return null;case"tensor_type":return t(a,new o.TensorTypeAndShape);case"sequence_type":return t(a,new i.SequenceType);case"map_type":return t(a,new n.MapType)}};var t,r,n=tS(),i=tO(),o=tD();(t=r||(e.TypeInfoValue=r={}))[t.NONE=0]="NONE",t[t.tensor_type=1]="tensor_type",t[t.sequence_type=2]="sequence_type",t[t.map_type=3]="map_type"}),tC=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.TypeInfo=void 0;var o=i(tc()),a=tN();e.TypeInfo=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTypeInfo(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTypeInfo(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}denotation(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):a.TypeInfoValue.NONE}value(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__union(e,this.bb_pos+t):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,t){e.addFieldOffset(0,t,0)}static addValueType(e,t){e.addFieldInt8(1,t,a.TypeInfoValue.NONE)}static addValue(e,t){e.addFieldOffset(2,t,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(t,r,n,i){return e.startTypeInfo(t),e.addDenotation(t,r),e.addValueType(t,n),e.addValue(t,i),e.endTypeInfo(t)}}}),tz=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.ValueInfo=void 0;var o=i(tc()),a=tC();e.ValueInfo=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsValueInfo(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsValueInfo(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}type(e){let t=this.bb.__offset(this.bb_pos,8);return t?(e||new a.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addType(e,t){e.addFieldOffset(2,t,0)}static endValueInfo(e){return e.endObject()}}}),tR=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.Graph=void 0;var o=i(tc()),a=tg(),s=ty(),u=tw(),l=tI(),d=tT(),p=tz();e.Graph=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsGraph(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsGraph(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}initializers(e,t){let r=this.bb.__offset(this.bb_pos,4);return r?(t||new d.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new p.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,t){let r=this.bb.__offset(this.bb_pos,8);return r?(t||new a.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,t){let r=this.bb.__offset(this.bb_pos,12);return r?(t||new s.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,t){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,t){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,t){let r=this.bb.__offset(this.bb_pos,18);return r?(t||new l.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let t=this.bb.__offset(this.bb_pos,20);return t?(e||new u.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,t){e.addFieldOffset(0,t,0)}static createInitializersVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startInitializersVector(e,t){e.startVector(4,t,4)}static addNodeArgs(e,t){e.addFieldOffset(1,t,0)}static createNodeArgsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startNodeArgsVector(e,t){e.startVector(4,t,4)}static addNodes(e,t){e.addFieldOffset(2,t,0)}static createNodesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startNodesVector(e,t){e.startVector(4,t,4)}static addMaxNodeIndex(e,t){e.addFieldInt32(3,t,0)}static addNodeEdges(e,t){e.addFieldOffset(4,t,0)}static createNodeEdgesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startNodeEdgesVector(e,t){e.startVector(4,t,4)}static addInputs(e,t){e.addFieldOffset(5,t,0)}static createInputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startInputsVector(e,t){e.startVector(4,t,4)}static addOutputs(e,t){e.addFieldOffset(6,t,0)}static createOutputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startOutputsVector(e,t){e.startVector(4,t,4)}static addSparseInitializers(e,t){e.addFieldOffset(7,t,0)}static createSparseInitializersVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startSparseInitializersVector(e,t){e.startVector(4,t,4)}static addRuntimeOptimizations(e,t){e.addFieldOffset(8,t,0)}static endGraph(e){return e.endObject()}}}),tB=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.Attribute=void 0;var o=i(tc()),a=tf(),s=tR(),u=tT();e.Attribute=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsAttribute(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsAttribute(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):a.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb_pos+t,e):null}t(e){let t=this.bb.__offset(this.bb_pos,16);return t?(e||new u.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}g(e){let t=this.bb.__offset(this.bb_pos,18);return t?(e||new s.Graph).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}floats(e){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readFloat32(this.bb.__vector(this.bb_pos+t)+4*e):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,t){let r=this.bb.__offset(this.bb_pos,24);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,t){let r=this.bb.__offset(this.bb_pos,26);return r?(t||new u.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,t){let r=this.bb.__offset(this.bb_pos,28);return r?(t||new s.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addType(e,t){e.addFieldInt32(2,t,a.AttributeType.UNDEFINED)}static addF(e,t){e.addFieldFloat32(3,t,0)}static addI(e,t){e.addFieldInt64(4,t,BigInt("0"))}static addS(e,t){e.addFieldOffset(5,t,0)}static addT(e,t){e.addFieldOffset(6,t,0)}static addG(e,t){e.addFieldOffset(7,t,0)}static addFloats(e,t){e.addFieldOffset(8,t,0)}static createFloatsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addFloat32(t[r]);return e.endVector()}static startFloatsVector(e,t){e.startVector(4,t,4)}static addInts(e,t){e.addFieldOffset(9,t,0)}static createIntsVector(e,t){e.startVector(8,t.length,8);for(let r=t.length-1;r>=0;r--)e.addInt64(t[r]);return e.endVector()}static startIntsVector(e,t){e.startVector(8,t,8)}static addStrings(e,t){e.addFieldOffset(10,t,0)}static createStringsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startStringsVector(e,t){e.startVector(4,t,4)}static addTensors(e,t){e.addFieldOffset(11,t,0)}static createTensorsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startTensorsVector(e,t){e.startVector(4,t,4)}static addGraphs(e,t){e.addFieldOffset(12,t,0)}static createGraphsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startGraphsVector(e,t){e.startVector(4,t,4)}static endAttribute(e){return e.endObject()}}}),tM=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedKernelCreateInfos=void 0;var o=i(tc());e.DeprecatedKernelCreateInfos=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedKernelCreateInfos(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndices(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb.__vector(this.bb_pos+t)+4*e):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,t){e.addFieldOffset(0,t,0)}static createNodeIndicesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addInt32(t[r]);return e.endVector()}static startNodeIndicesVector(e,t){e.startVector(4,t,4)}static addKernelDefHashes(e,t){e.addFieldOffset(1,t,0)}static createKernelDefHashesVector(e,t){e.startVector(8,t.length,8);for(let r=t.length-1;r>=0;r--)e.addInt64(t[r]);return e.endVector()}static startKernelDefHashesVector(e,t){e.startVector(8,t,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(t,r,n){return e.startDeprecatedKernelCreateInfos(t),e.addNodeIndices(t,r),e.addKernelDefHashes(t,n),e.endDeprecatedKernelCreateInfos(t)}}}),tj=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedNodeIndexAndKernelDefHash=void 0;var o=i(tc());e.DeprecatedNodeIndexAndKernelDefHash=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,t){e.addFieldInt32(0,t,0)}static addKernelDefHash(e,t){e.addFieldInt64(1,t,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(t,r,n){return e.startDeprecatedNodeIndexAndKernelDefHash(t),e.addNodeIndex(t,r),e.addKernelDefHash(t,n),e.endDeprecatedNodeIndexAndKernelDefHash(t)}}}),tF=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSubGraphSessionState=void 0;var o=i(tc()),a=tL();e.DeprecatedSubGraphSessionState=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedSubGraphSessionState(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}graphId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}sessionState(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new a.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,t){e.addFieldOffset(0,t,0)}static addSessionState(e,t){e.addFieldOffset(1,t,0)}static endDeprecatedSubGraphSessionState(e){let t=e.endObject();return e.requiredField(t,4),t}}}),tL=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSessionState=void 0;var o=i(tc()),a=tM(),s=tF();e.DeprecatedSessionState=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedSessionState(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedSessionState(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}kernels(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new a.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}subGraphSessionStates(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new s.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,t){e.addFieldOffset(0,t,0)}static addSubGraphSessionStates(e,t){e.addFieldOffset(1,t,0)}static createSubGraphSessionStatesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startSubGraphSessionStatesVector(e,t){e.startVector(4,t,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(t,r,n){return e.startDeprecatedSessionState(t),e.addKernels(t,r),e.addSubGraphSessionStates(t,n),e.endDeprecatedSessionState(t)}}}),tV=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrArgsEntry=void 0;var o=i(tc()),a=th();e.KernelTypeStrArgsEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsKernelTypeStrArgsEntry(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}kernelTypeStr(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}args(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new a.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,t){e.addFieldOffset(0,t,0)}static addArgs(e,t){e.addFieldOffset(1,t,0)}static createArgsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startArgsVector(e,t){e.startVector(4,t,4)}static endKernelTypeStrArgsEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createKernelTypeStrArgsEntry(t,r,n){return e.startKernelTypeStrArgsEntry(t),e.addKernelTypeStr(t,r),e.addArgs(t,n),e.endKernelTypeStrArgsEntry(t)}}}),tU=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.OpIdKernelTypeStrArgsEntry=void 0;var o=i(tc()),a=tV();e.OpIdKernelTypeStrArgsEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsOpIdKernelTypeStrArgsEntry(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}opId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}kernelTypeStrArgs(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new a.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,t){e.addFieldOffset(0,t,0)}static addKernelTypeStrArgs(e,t){e.addFieldOffset(1,t,0)}static createKernelTypeStrArgsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startKernelTypeStrArgsVector(e,t){e.startVector(4,t,4)}static endOpIdKernelTypeStrArgsEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createOpIdKernelTypeStrArgsEntry(t,r,n){return e.startOpIdKernelTypeStrArgsEntry(t),e.addOpId(t,r),e.addKernelTypeStrArgs(t,n),e.endOpIdKernelTypeStrArgsEntry(t)}}}),tq=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrResolver=void 0;var o=i(tc()),a=tU();e.KernelTypeStrResolver=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsKernelTypeStrResolver(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsKernelTypeStrResolver(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}opKernelTypeStrArgs(e,t){let r=this.bb.__offset(this.bb_pos,4);return r?(t||new a.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,t){e.addFieldOffset(0,t,0)}static createOpKernelTypeStrArgsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,t){e.startVector(4,t,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(t,r){return e.startKernelTypeStrResolver(t),e.addOpKernelTypeStrArgs(t,r),e.endKernelTypeStrResolver(t)}}}),tG=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.OperatorSetId=void 0;var o=i(tc());e.OperatorSetId=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsOperatorSetId(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsOperatorSetId(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}domain(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,t){e.addFieldOffset(0,t,0)}static addVersion(e,t){e.addFieldInt64(1,t,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(t,r,n){return e.startOperatorSetId(t),e.addDomain(t,r),e.addVersion(t,n),e.endOperatorSetId(t)}}}),tH=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.StringStringEntry=void 0;var o=i(tc());e.StringStringEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsStringStringEntry(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsStringStringEntry(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}key(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}value(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,t){e.addFieldOffset(0,t,0)}static addValue(e,t){e.addFieldOffset(1,t,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(t,r,n){return e.startStringStringEntry(t),e.addKey(t,r),e.addValue(t,n),e.endStringStringEntry(t)}}}),tW=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.Model=void 0;var o=i(tc()),a=tR(),s=tG(),u=tH();e.Model=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsModel(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsModel(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new s.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}producerVersion(e){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb_pos+t,e):null}domain(e){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__string(this.bb_pos+t,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb_pos+t,e):null}graph(e){let t=this.bb.__offset(this.bb_pos,18);return t?(e||new a.Graph).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}graphDocString(e){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb_pos+t,e):null}metadataProps(e,t){let r=this.bb.__offset(this.bb_pos,22);return r?(t||new u.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,t){e.addFieldInt64(0,t,BigInt("0"))}static addOpsetImport(e,t){e.addFieldOffset(1,t,0)}static createOpsetImportVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startOpsetImportVector(e,t){e.startVector(4,t,4)}static addProducerName(e,t){e.addFieldOffset(2,t,0)}static addProducerVersion(e,t){e.addFieldOffset(3,t,0)}static addDomain(e,t){e.addFieldOffset(4,t,0)}static addModelVersion(e,t){e.addFieldInt64(5,t,BigInt("0"))}static addDocString(e,t){e.addFieldOffset(6,t,0)}static addGraph(e,t){e.addFieldOffset(7,t,0)}static addGraphDocString(e,t){e.addFieldOffset(8,t,0)}static addMetadataProps(e,t){e.addFieldOffset(9,t,0)}static createMetadataPropsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startMetadataPropsVector(e,t){e.startVector(4,t,4)}static endModel(e){return e.endObject()}}}),tK=H(e=>{"use strict";var t,r=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),n=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=e&&e.__importStar||(t=function(e){return(t=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t})(e)},function(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var o=t(e),a=0;a<o.length;a++)"default"!==o[a]&&r(i,e,o[a]);return n(i,e),i});Object.defineProperty(e,"__esModule",{value:!0}),e.InferenceSession=void 0;var o=i(tc()),a=tq(),s=tW();e.InferenceSession=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsInferenceSession(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsInferenceSession(t,r){return t.setPosition(t.position()+o.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}model(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new s.Model).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}kernelTypeStrResolver(e){let t=this.bb.__offset(this.bb_pos,10);return t?(e||new a.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,t){e.addFieldOffset(0,t,0)}static addModel(e,t){e.addFieldOffset(1,t,0)}static addKernelTypeStrResolver(e,t){e.addFieldOffset(3,t,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,t){e.finish(t,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,t){e.finish(t,"ORTM",!0)}}}),tX=G(()=>{"use strict";X(ta()),X(th()),e8=X(tB()),e7=X(tf()),X(tM()),X(tj()),X(tL()),X(tF()),X(tP()),X(tA()),X(tE()),X(tb()),e9=X(tR()),te=X(tK()),X(tV()),X(tq()),X(tS()),X(tW()),tt=X(tg()),X(ty()),X(tm()),X(t_()),X(tU()),X(tG()),X(tv()),X(tx()),X(tw()),X(tO()),X(tk()),X(tI()),X(tH()),X(tT()),tr=X(t$()),tn=X(tD()),X(tC()),ti=X(tN()),X(tz())}),tZ=G(()=>{"use strict";tX()}),tJ=H((e,t)=>{"use strict";t.exports=function(e,t){for(var r=Array(arguments.length-1),n=0,i=2,o=!0;i<arguments.length;)r[n++]=arguments[i++];return new Promise(function(i,a){r[n]=function(e){if(o)if(o=!1,e)a(e);else{for(var t=Array(arguments.length-1),r=0;r<t.length;)t[r++]=arguments[r];i.apply(null,t)}};try{e.apply(t||null,r)}catch(e){o&&(o=!1,a(e))}})}}),tQ=H(e=>{"use strict";e.length=function(e){var t=e.length;if(!t)return 0;for(var r=0;--t%4>1&&"="===e.charAt(t);)++r;return Math.ceil(3*e.length)/4-r};var t,r=Array(64),n=Array(123);for(t=0;t<64;)n[r[t]=t<26?t+65:t<52?t+71:t<62?t-4:t-59|43]=t++;e.encode=function(e,t,n){for(var i,o=null,a=[],s=0,u=0;t<n;){var l=e[t++];switch(u){case 0:a[s++]=r[l>>2],i=(3&l)<<4,u=1;break;case 1:a[s++]=r[i|l>>4],i=(15&l)<<2,u=2;break;case 2:a[s++]=r[i|l>>6],a[s++]=r[63&l],u=0}s>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,a)),s=0)}return u&&(a[s++]=r[i],a[s++]=61,1===u&&(a[s++]=61)),o?(s&&o.push(String.fromCharCode.apply(String,a.slice(0,s))),o.join("")):String.fromCharCode.apply(String,a.slice(0,s))};var i="invalid encoding";e.decode=function(e,t,r){for(var o,a=r,s=0,u=0;u<e.length;){var l=e.charCodeAt(u++);if(61===l&&s>1)break;if(void 0===(l=n[l]))throw Error(i);switch(s){case 0:o=l,s=1;break;case 1:t[r++]=o<<2|(48&l)>>4,o=l,s=2;break;case 2:t[r++]=(15&o)<<4|(60&l)>>2,o=l,s=3;break;case 3:t[r++]=(3&o)<<6|l,s=0}}if(1===s)throw Error(i);return r-a},e.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}}),tY=H((e,t)=>{"use strict";function r(){this._listeners=Object.create(null)}t.exports=r,r.prototype.on=function(e,t,r){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:t,ctx:r||this}),this},r.prototype.off=function(e,t){if(void 0===e)this._listeners=Object.create(null);else if(void 0===t)this._listeners[e]=[];else{var r=this._listeners[e];if(!r)return this;for(var n=0;n<r.length;)r[n].fn===t?r.splice(n,1):++n}return this},r.prototype.emit=function(e){var t=this._listeners[e];if(t){for(var r=[],n=1;n<arguments.length;)r.push(arguments[n++]);for(n=0;n<t.length;)t[n].fn.apply(t[n++].ctx,r)}return this}}),t0=H((e,t)=>{"use strict";function r(e){return"u">typeof Float32Array?function(){var t=new Float32Array([-0]),r=new Uint8Array(t.buffer),n=128===r[3];function i(e,n,i){t[0]=e,n[i]=r[0],n[i+1]=r[1],n[i+2]=r[2],n[i+3]=r[3]}function o(e,n,i){t[0]=e,n[i]=r[3],n[i+1]=r[2],n[i+2]=r[1],n[i+3]=r[0]}function a(e,n){return r[0]=e[n],r[1]=e[n+1],r[2]=e[n+2],r[3]=e[n+3],t[0]}function s(e,n){return r[3]=e[n],r[2]=e[n+1],r[1]=e[n+2],r[0]=e[n+3],t[0]}e.writeFloatLE=n?i:o,e.writeFloatBE=n?o:i,e.readFloatLE=n?a:s,e.readFloatBE=n?s:a}():function(){function t(e,t,r,n){var i=+(t<0);if(i&&(t=-t),0===t)e(1/t>0?0:0x80000000,r,n);else if(isNaN(t))e(0x7fc00000,r,n);else if(t>34028234663852886e22)e((i<<31|0x7f800000)>>>0,r,n);else if(t<11754943508222875e-54)e((i<<31|Math.round(t/1401298464324817e-60))>>>0,r,n);else{var o=Math.floor(Math.log(t)/Math.LN2),a=8388607&Math.round(t*Math.pow(2,-o)*8388608);e((i<<31|o+127<<23|a)>>>0,r,n)}}function r(e,t,r){var n=e(t,r),i=(n>>31)*2+1,o=n>>>23&255,a=8388607&n;return 255===o?a?0/0:1/0*i:0===o?1401298464324817e-60*i*a:i*Math.pow(2,o-150)*(a+8388608)}e.writeFloatLE=t.bind(null,n),e.writeFloatBE=t.bind(null,i),e.readFloatLE=r.bind(null,o),e.readFloatBE=r.bind(null,a)}(),"u">typeof Float64Array?function(){var t=new Float64Array([-0]),r=new Uint8Array(t.buffer),n=128===r[7];function i(e,n,i){t[0]=e,n[i]=r[0],n[i+1]=r[1],n[i+2]=r[2],n[i+3]=r[3],n[i+4]=r[4],n[i+5]=r[5],n[i+6]=r[6],n[i+7]=r[7]}function o(e,n,i){t[0]=e,n[i]=r[7],n[i+1]=r[6],n[i+2]=r[5],n[i+3]=r[4],n[i+4]=r[3],n[i+5]=r[2],n[i+6]=r[1],n[i+7]=r[0]}function a(e,n){return r[0]=e[n],r[1]=e[n+1],r[2]=e[n+2],r[3]=e[n+3],r[4]=e[n+4],r[5]=e[n+5],r[6]=e[n+6],r[7]=e[n+7],t[0]}function s(e,n){return r[7]=e[n],r[6]=e[n+1],r[5]=e[n+2],r[4]=e[n+3],r[3]=e[n+4],r[2]=e[n+5],r[1]=e[n+6],r[0]=e[n+7],t[0]}e.writeDoubleLE=n?i:o,e.writeDoubleBE=n?o:i,e.readDoubleLE=n?a:s,e.readDoubleBE=n?s:a}():function(){function t(e,t,r,n,i,o){var a,s=+(n<0);if(s&&(n=-n),0===n)e(0,i,o+t),e(1/n>0?0:0x80000000,i,o+r);else if(isNaN(n))e(0,i,o+t),e(0x7ff80000,i,o+r);else if(n>17976931348623157e292)e(0,i,o+t),e((s<<31|0x7ff00000)>>>0,i,o+r);else if(n<22250738585072014e-324)e((a=n/5e-324)>>>0,i,o+t),e((s<<31|a/0x100000000)>>>0,i,o+r);else{var u=Math.floor(Math.log(n)/Math.LN2);1024===u&&(u=1023),e(0x10000000000000*(a=n*Math.pow(2,-u))>>>0,i,o+t),e((s<<31|u+1023<<20|1048576*a&1048575)>>>0,i,o+r)}}function r(e,t,r,n,i){var o=e(n,i+t),a=e(n,i+r),s=(a>>31)*2+1,u=a>>>20&2047,l=0x100000000*(1048575&a)+o;return 2047===u?l?0/0:1/0*s:0===u?5e-324*s*l:s*Math.pow(2,u-1075)*(l+0x10000000000000)}e.writeDoubleLE=t.bind(null,n,0,4),e.writeDoubleBE=t.bind(null,i,4,0),e.readDoubleLE=r.bind(null,o,0,4),e.readDoubleBE=r.bind(null,a,4,0)}(),e}function n(e,t,r){t[r]=255&e,t[r+1]=e>>>8&255,t[r+2]=e>>>16&255,t[r+3]=e>>>24}function i(e,t,r){t[r]=e>>>24,t[r+1]=e>>>16&255,t[r+2]=e>>>8&255,t[r+3]=255&e}function o(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0}function a(e,t){return(e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3])>>>0}t.exports=r(r)}),t1=H((e,t)=>{"use strict";t.exports=function(e){try{if("function"!=typeof q)return null;var t=q(e);return t&&(t.length||Object.keys(t).length)?t:null}catch{return null}}}),t2=H(e=>{"use strict";e.length=function(e){for(var t=0,r=0,n=0;n<e.length;++n)(r=e.charCodeAt(n))<128?t+=1:r<2048?t+=2:(64512&r)==55296&&(64512&e.charCodeAt(n+1))==56320?(++n,t+=4):t+=3;return t},e.read=function(e,t,r){if(r-t<1)return"";for(var n="",i=t;i<r;){var o=e[i++];if(o<=127)n+=String.fromCharCode(o);else if(o>=192&&o<224){var a=(31&o)<<6|63&e[i++];n+=a>=128?String.fromCharCode(a):"�"}else if(o>=224&&o<240){var s=(15&o)<<12|(63&e[i++])<<6|63&e[i++];n+=s>=2048?String.fromCharCode(s):"�"}else if(o>=240){var u=(7&o)<<18|(63&e[i++])<<12|(63&e[i++])<<6|63&e[i++];u<65536||u>1114111?n+="�":(u-=65536,n+=String.fromCharCode(55296+(u>>10)),n+=String.fromCharCode(56320+(1023&u)))}}return n},e.write=function(e,t,r){for(var n,i,o=r,a=0;a<e.length;++a)(n=e.charCodeAt(a))<128?t[r++]=n:(n<2048?t[r++]=n>>6|192:((64512&n)==55296&&(64512&(i=e.charCodeAt(a+1)))==56320?(n=65536+((1023&n)<<10)+(1023&i),++a,t[r++]=n>>18|240,t[r++]=n>>12&63|128):t[r++]=n>>12|224,t[r++]=n>>6&63|128),t[r++]=63&n|128);return r-o}}),t3=H((e,t)=>{"use strict";t.exports=function(e,t,r){var n=r||8192,i=n>>>1,o=null,a=n;return function(r){if(r<1||r>i)return e(r);a+r>n&&(o=e(n),a=0);var s=t.call(o,a,a+=r);return 7&a&&(a=(7|a)+1),s}}}),t4=H((e,t)=>{"use strict";t.exports=n;var r=t5();function n(e,t){this.lo=e>>>0,this.hi=t>>>0}var i=n.zero=new n(0,0);i.toNumber=function(){return 0},i.zzEncode=i.zzDecode=function(){return this},i.length=function(){return 1};var o=n.zeroHash="\0\0\0\0\0\0\0\0";n.fromNumber=function(e){if(0===e)return i;var t=e<0;t&&(e=-e);var r=e>>>0,o=(e-r)/0x100000000>>>0;return t&&(o=~o>>>0,r=~r>>>0,++r>0xffffffff&&(r=0,++o>0xffffffff&&(o=0))),new n(r,o)},n.from=function(e){if("number"==typeof e)return n.fromNumber(e);if(r.isString(e))if(!r.Long)return n.fromNumber(parseInt(e,10));else e=r.Long.fromString(e);return e.low||e.high?new n(e.low>>>0,e.high>>>0):i},n.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var t=~this.lo+1>>>0,r=~this.hi>>>0;return t||(r=r+1>>>0),-(t+0x100000000*r)}return this.lo+0x100000000*this.hi},n.prototype.toLong=function(e){return r.Long?new r.Long(0|this.lo,0|this.hi,!!e):{low:0|this.lo,high:0|this.hi,unsigned:!!e}};var a=String.prototype.charCodeAt;n.fromHash=function(e){return e===o?i:new n((a.call(e,0)|a.call(e,1)<<8|a.call(e,2)<<16|a.call(e,3)<<24)>>>0,(a.call(e,4)|a.call(e,5)<<8|a.call(e,6)<<16|a.call(e,7)<<24)>>>0)},n.prototype.toHash=function(){return String.fromCharCode(255&this.lo,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,255&this.hi,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)},n.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this},n.prototype.zzDecode=function(){var e=-(1&this.lo);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this},n.prototype.length=function(){var e=this.lo,t=(this.lo>>>28|this.hi<<4)>>>0,r=this.hi>>>24;return 0===r?0===t?e<16384?e<128?1:2:e<2097152?3:4:t<16384?t<128?5:6:t<2097152?7:8:r<128?9:10}}),t6=H((e,t)=>{!function(r,n){var i;function o(e){return e.default||e}"function"==typeof define&&define.amd?define([],function(){var e={};return n(e),o(e)}):"object"==typeof e?(n(e),"object"==typeof t&&(t.exports=o(e))):(n(i={}),r.Long=o(i))}("u">typeof globalThis?globalThis:"u">typeof self?self:e,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=null;try{t=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function r(e,t,r){this.low=0|e,this.high=0|t,this.unsigned=!!r}function n(e){return(e&&e.__isLong__)===!0}function i(e){var t=Math.clz32(e&-e);return e?31-t:t}r.prototype.__isLong__,Object.defineProperty(r.prototype,"__isLong__",{value:!0}),r.isLong=n;var o={},a={};function s(e,t){var r,n,i;return t?(e>>>=0,(i=0<=e&&e<256)&&(n=a[e])?n:(r=l(e,0,!0),i&&(a[e]=r),r)):(e|=0,(i=-128<=e&&e<128)&&(n=o[e])?n:(r=l(e,e<0?-1:0,!1),i&&(o[e]=r),r))}function u(e,t){if(isNaN(e))return t?y:b;if(t){if(e<0)return y;if(e>=f)return $}else{if(e<=-m)return T;if(e+1>=m)return w}return e<0?u(-e,t).neg():l(e%h|0,e/h|0,t)}function l(e,t,n){return new r(e,t,n)}r.fromInt=s,r.fromNumber=u,r.fromBits=l;var d=Math.pow;function p(e,t,r){if(0===e.length)throw Error("empty string");if("number"==typeof t?(r=t,t=!1):t=!!t,"NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return t?y:b;if((r=r||10)<2||36<r)throw RangeError("radix");if((n=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===n)return p(e.substring(1),t,r).neg();for(var n,i=u(d(r,8)),o=b,a=0;a<e.length;a+=8){var s=Math.min(8,e.length-a),l=parseInt(e.substring(a,a+s),r);if(s<8){var c=u(d(r,s));o=o.mul(c).add(u(l))}else o=(o=o.mul(i)).add(u(l))}return o.unsigned=t,o}function c(e,t){return"number"==typeof e?u(e,t):"string"==typeof e?p(e,t):l(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}r.fromString=p,r.fromValue=c;var h=0x100000000,f=0xffffffffffffffff,m=0x8000000000000000,g=s(0x1000000),b=s(0);r.ZERO=b;var y=s(0,!0);r.UZERO=y;var _=s(1);r.ONE=_;var v=s(1,!0);r.UONE=v;var x=s(-1);r.NEG_ONE=x;var w=l(-1,0x7fffffff,!1);r.MAX_VALUE=w;var $=l(-1,-1,!0);r.MAX_UNSIGNED_VALUE=$;var T=l(0,-0x80000000,!1);r.MIN_VALUE=T;var I=r.prototype;I.toInt=function(){return this.unsigned?this.low>>>0:this.low},I.toNumber=function(){return this.unsigned?(this.high>>>0)*h+(this.low>>>0):this.high*h+(this.low>>>0)},I.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(!this.eq(T))return"-"+this.neg().toString(e);else{var t=u(e),r=this.div(t),n=r.mul(t).sub(this);return r.toString(e)+n.toInt().toString(e)}for(var i=u(d(e,6),this.unsigned),o=this,a="";;){var s=o.div(i),l=(o.sub(s.mul(i)).toInt()>>>0).toString(e);if((o=s).isZero())return l+a;for(;l.length<6;)l="0"+l;a=""+l+a}},I.getHighBits=function(){return this.high},I.getHighBitsUnsigned=function(){return this.high>>>0},I.getLowBits=function(){return this.low},I.getLowBitsUnsigned=function(){return this.low>>>0},I.getNumBitsAbs=function(){if(this.isNegative())return this.eq(T)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return 0!=this.high?t+33:t+1},I.isSafeInteger=function(){var e=this.high>>21;return!e||!this.unsigned&&-1===e&&(0!==this.low||-2097152!==this.high)},I.isZero=function(){return 0===this.high&&0===this.low},I.eqz=I.isZero,I.isNegative=function(){return!this.unsigned&&this.high<0},I.isPositive=function(){return this.unsigned||this.high>=0},I.isOdd=function(){return(1&this.low)==1},I.isEven=function(){return(1&this.low)==0},I.equals=function(e){return n(e)||(e=c(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&this.high===e.high&&this.low===e.low},I.eq=I.equals,I.notEquals=function(e){return!this.eq(e)},I.neq=I.notEquals,I.ne=I.notEquals,I.lessThan=function(e){return 0>this.comp(e)},I.lt=I.lessThan,I.lessThanOrEqual=function(e){return 0>=this.comp(e)},I.lte=I.lessThanOrEqual,I.le=I.lessThanOrEqual,I.greaterThan=function(e){return this.comp(e)>0},I.gt=I.greaterThan,I.greaterThanOrEqual=function(e){return this.comp(e)>=0},I.gte=I.greaterThanOrEqual,I.ge=I.greaterThanOrEqual,I.compare=function(e){if(n(e)||(e=c(e)),this.eq(e))return 0;var t=this.isNegative(),r=e.isNegative();return t&&!r?-1:!t&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},I.comp=I.compare,I.negate=function(){return!this.unsigned&&this.eq(T)?T:this.not().add(_)},I.neg=I.negate,I.add=function(e){n(e)||(e=c(e));var t,r,i=this.high>>>16,o=65535&this.high,a=this.low>>>16,s=65535&this.low,u=e.high>>>16,d=65535&e.high,p=e.low>>>16,h=65535&e.low,f=0,m=0;return r=0+((t=0+(s+h))>>>16),t&=65535,r+=a+p,m+=r>>>16,r&=65535,m+=o+d,f+=m>>>16,m&=65535,f+=i+u,l(r<<16|t,(f&=65535)<<16|m,this.unsigned)},I.subtract=function(e){return n(e)||(e=c(e)),this.add(e.neg())},I.sub=I.subtract,I.multiply=function(e){if(this.isZero())return this;if(n(e)||(e=c(e)),t)return l(t.mul(this.low,this.high,e.low,e.high),t.get_high(),this.unsigned);if(e.isZero())return this.unsigned?y:b;if(this.eq(T))return e.isOdd()?T:b;if(e.eq(T))return this.isOdd()?T:b;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(g)&&e.lt(g))return u(this.toNumber()*e.toNumber(),this.unsigned);var r,i,o=this.high>>>16,a=65535&this.high,s=this.low>>>16,d=65535&this.low,p=e.high>>>16,h=65535&e.high,f=e.low>>>16,m=65535&e.low,_=0,v=0;return i=0+((r=0+d*m)>>>16),r&=65535,i+=s*m,v+=i>>>16,i&=65535,i+=d*f,v+=i>>>16,i&=65535,v+=a*m,_+=v>>>16,v&=65535,v+=s*f,_+=v>>>16,v&=65535,v+=d*h,_+=v>>>16,v&=65535,_+=o*m+a*f+s*h+d*p,l(i<<16|r,(_&=65535)<<16|v,this.unsigned)},I.mul=I.multiply,I.divide=function(e){if(n(e)||(e=c(e)),e.isZero())throw Error("division by zero");if(t){var r,i,o;return this.unsigned||-0x80000000!==this.high||-1!==e.low||-1!==e.high?l((this.unsigned?t.div_u:t.div_s)(this.low,this.high,e.low,e.high),t.get_high(),this.unsigned):this}if(this.isZero())return this.unsigned?y:b;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return y;if(e.gt(this.shru(1)))return v;o=y}else{if(this.eq(T))return e.eq(_)||e.eq(x)?T:e.eq(T)?_:(r=this.shr(1).div(e).shl(1)).eq(b)?e.isNegative()?_:x:(i=this.sub(e.mul(r)),o=r.add(i.div(e)));if(e.eq(T))return this.unsigned?y:b;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();o=b}for(i=this;i.gte(e);){r=Math.max(1,Math.floor(i.toNumber()/e.toNumber()));for(var a=Math.ceil(Math.log(r)/Math.LN2),s=a<=48?1:d(2,a-48),p=u(r),h=p.mul(e);h.isNegative()||h.gt(i);)r-=s,h=(p=u(r,this.unsigned)).mul(e);p.isZero()&&(p=_),o=o.add(p),i=i.sub(h)}return o},I.div=I.divide,I.modulo=function(e){return(n(e)||(e=c(e)),t)?l((this.unsigned?t.rem_u:t.rem_s)(this.low,this.high,e.low,e.high),t.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},I.mod=I.modulo,I.rem=I.modulo,I.not=function(){return l(~this.low,~this.high,this.unsigned)},I.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},I.clz=I.countLeadingZeros,I.countTrailingZeros=function(){return this.low?i(this.low):i(this.high)+32},I.ctz=I.countTrailingZeros,I.and=function(e){return n(e)||(e=c(e)),l(this.low&e.low,this.high&e.high,this.unsigned)},I.or=function(e){return n(e)||(e=c(e)),l(this.low|e.low,this.high|e.high,this.unsigned)},I.xor=function(e){return n(e)||(e=c(e)),l(this.low^e.low,this.high^e.high,this.unsigned)},I.shiftLeft=function(e){return n(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?l(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):l(0,this.low<<e-32,this.unsigned)},I.shl=I.shiftLeft,I.shiftRight=function(e){return n(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?l(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):l(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},I.shr=I.shiftRight,I.shiftRightUnsigned=function(e){return n(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?l(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):32===e?l(this.high,0,this.unsigned):l(this.high>>>e-32,0,this.unsigned)},I.shru=I.shiftRightUnsigned,I.shr_u=I.shiftRightUnsigned,I.rotateLeft=function(e){var t;return n(e)&&(e=e.toInt()),0==(e&=63)?this:32===e?l(this.high,this.low,this.unsigned):e<32?(t=32-e,l(this.low<<e|this.high>>>t,this.high<<e|this.low>>>t,this.unsigned)):(e-=32,t=32-e,l(this.high<<e|this.low>>>t,this.low<<e|this.high>>>t,this.unsigned))},I.rotl=I.rotateLeft,I.rotateRight=function(e){var t;return n(e)&&(e=e.toInt()),0==(e&=63)?this:32===e?l(this.high,this.low,this.unsigned):e<32?(t=32-e,l(this.high<<t|this.low>>>e,this.low<<t|this.high>>>e,this.unsigned)):(e-=32,t=32-e,l(this.low<<t|this.high>>>e,this.high<<t|this.low>>>e,this.unsigned))},I.rotr=I.rotateRight,I.toSigned=function(){return this.unsigned?l(this.low,this.high,!1):this},I.toUnsigned=function(){return this.unsigned?this:l(this.low,this.high,!0)},I.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},I.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},I.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},r.fromBytes=function(e,t,n){return n?r.fromBytesLE(e,t):r.fromBytesBE(e,t)},r.fromBytesLE=function(e,t){return new r(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},r.fromBytesBE=function(e,t){return new r(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)},"function"==typeof BigInt&&(r.fromBigInt=function(e,t){return l(Number(BigInt.asIntN(32,e)),Number(BigInt.asIntN(32,e>>BigInt(32))),t)},r.fromValue=function(e,t){return"bigint"==typeof e?r.fromBigInt(e,t):c(e,t)},I.toBigInt=function(){var e=BigInt(this.low>>>0);return BigInt(this.unsigned?this.high>>>0:this.high)<<BigInt(32)|e}),e.default=r})}),t5=H(e=>{"use strict";function t(e){return"__proto__"===e||"prototype"===e||"constructor"===e}function r(e){var r="boolean"==typeof arguments[arguments.length-1],n=r?arguments.length-1:arguments.length;r=r&&arguments[arguments.length-1];for(var i=1;i<n;++i){var o=arguments[i];if(o)for(var a=Object.keys(o),s=0;s<a.length;++s)t(a[s])||void 0!==e[a[s]]&&r||(e[a[s]]=o[a[s]])}return e}function n(e){function t(e,n){if(!(this instanceof t))return new t(e,n);Object.defineProperty(this,"message",{get:function(){return e}}),Error.captureStackTrace?Error.captureStackTrace(this,t):Object.defineProperty(this,"stack",{value:Error().stack||""}),n&&r(this,n)}return t.prototype=Object.create(Error.prototype,{constructor:{value:t,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return e},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),t}e.asPromise=tJ(),e.base64=tQ(),e.EventEmitter=tY(),e.float=t0(),e.inquire=t1(),e.utf8=t2(),e.pool=t3(),e.LongBits=t4(),e.isUnsafeProperty=t,e.isNode=!!("u">typeof global&&global&&global.process&&global.process.versions&&global.process.versions.node),e.global=e.isNode&&global||"u">typeof window&&window||"u">typeof self&&self||e,e.emptyArray=Object.freeze?Object.freeze([]):[],e.emptyObject=Object.freeze?Object.freeze({}):{},e.isInteger=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},e.isString=function(e){return"string"==typeof e||e instanceof String},e.isObject=function(e){return e&&"object"==typeof e},e.isset=e.isSet=function(e,t){var r=e[t];return!!(null!=r&&Object.hasOwnProperty.call(e,t))&&("object"!=typeof r||(Array.isArray(r)?r.length:Object.keys(r).length)>0)},e.Buffer=function(){try{var t=e.global.Buffer;return t.prototype.utf8Write?t:null}catch{return null}}(),e._Buffer_from=null,e._Buffer_allocUnsafe=null,e.newBuffer=function(t){return"number"==typeof t?e.Buffer?e._Buffer_allocUnsafe(t):new e.Array(t):e.Buffer?e._Buffer_from(t):typeof Uint8Array>"u"?t:new Uint8Array(t)},e.Array="u">typeof Uint8Array?Uint8Array:Array,e.Long=e.global.dcodeIO&&e.global.dcodeIO.Long||e.global.Long||function(){try{var e=t6();return e&&e.isLong?e:null}catch{return null}}(),e.key2Re=/^true|false|0|1$/,e.key32Re=/^-?(?:0|[1-9][0-9]*)$/,e.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,e.longToHash=function(t){return t?e.LongBits.from(t).toHash():e.LongBits.zeroHash},e.longFromHash=function(t,r){var n=e.LongBits.fromHash(t);return e.Long?e.Long.fromBits(n.lo,n.hi,r):n.toNumber(!!r)},e.merge=r,e.nestingLimit=32,e.recursionLimit=100,e.makeProp=function(e,t){Object.defineProperty(e,t,{enumerable:!0,configurable:!0,writable:!0})},e.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)},e.newError=n,e.ProtocolError=n("ProtocolError"),e.oneOfGetter=function(e){for(var t={},r=0;r<e.length;++r)t[e[r]]=1;return function(){for(var e=Object.keys(this),r=e.length-1;r>-1;--r)if(1===t[e[r]]&&void 0!==this[e[r]]&&null!==this[e[r]])return e[r]}},e.oneOfSetter=function(e){return function(t){for(var r=0;r<e.length;++r)e[r]!==t&&delete this[e[r]]}},e.toJSONOptions={longs:String,enums:String,bytes:String,json:!0},e._configure=function(){var t=e.Buffer;if(!t){e._Buffer_from=e._Buffer_allocUnsafe=null;return}e._Buffer_from=t.from!==Uint8Array.from&&t.from||function(e,r){return new t(e,r)},e._Buffer_allocUnsafe=t.allocUnsafe||function(e){return new t(e)}}}),t8=H((e,t)=>{"use strict";t.exports=d;var r,n=t5(),i=n.LongBits,o=n.base64,a=n.utf8;function s(e,t,r){this.fn=e,this.len=t,this.next=void 0,this.val=r}function u(){}function l(e){this.head=e.head,this.tail=e.tail,this.len=e.len,this.next=e.states}function d(){this.len=0,this.head=new s(u,0,0),this.tail=this.head,this.states=null}var p=function(){return n.Buffer?function(){return(d.create=function(){return new r})()}:function(){return new d}};function c(e,t,r){t[r]=255&e}function h(e,t){this.len=e,this.next=void 0,this.val=t}function f(e,t,r){for(var n=e.lo,i=e.hi;i;)t[r++]=127&n|128,n=(n>>>7|i<<25)>>>0,i>>>=7;for(;n>127;)t[r++]=127&n|128,n>>>=7;t[r++]=n}function m(e,t,r){t[r]=255&e,t[r+1]=e>>>8&255,t[r+2]=e>>>16&255,t[r+3]=e>>>24}d.create=p(),d.alloc=function(e){return new n.Array(e)},n.Array!==Array&&(d.alloc=n.pool(d.alloc,n.Array.prototype.subarray)),d.prototype._push=function(e,t,r){return this.tail=this.tail.next=new s(e,t,r),this.len+=t,this},h.prototype=Object.create(s.prototype),h.prototype.fn=function(e,t,r){for(;e>127;)t[r++]=127&e|128,e>>>=7;t[r]=e},d.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new h((e>>>=0)<128?1:e<16384?2:e<2097152?3:e<0x10000000?4:5,e)).len,this},d.prototype.int32=function(e){return(e|=0)<0?this._push(f,10,i.fromNumber(e)):this.uint32(e)},d.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)},d.prototype.uint64=function(e){var t=i.from(e);return this._push(f,t.length(),t)},d.prototype.int64=d.prototype.uint64,d.prototype.sint64=function(e){var t=i.from(e).zzEncode();return this._push(f,t.length(),t)},d.prototype.bool=function(e){return this._push(c,1,+!!e)},d.prototype.fixed32=function(e){return this._push(m,4,e>>>0)},d.prototype.sfixed32=d.prototype.fixed32,d.prototype.fixed64=function(e){var t=i.from(e);return this._push(m,4,t.lo)._push(m,4,t.hi)},d.prototype.sfixed64=d.prototype.fixed64,d.prototype.float=function(e){return this._push(n.float.writeFloatLE,4,e)},d.prototype.double=function(e){return this._push(n.float.writeDoubleLE,8,e)};var g=n.Array.prototype.set?function(e,t,r){t.set(e,r)}:function(e,t,r){for(var n=0;n<e.length;++n)t[r+n]=e[n]};d.prototype.bytes=function(e){var t=e.length>>>0;if(!t)return this._push(c,1,0);if(n.isString(e)){var r=d.alloc(t=o.length(e));o.decode(e,r,0),e=r}return this.uint32(t)._push(g,t,e)},d.prototype.string=function(e){var t=a.length(e);return t?this.uint32(t)._push(a.write,t,e):this._push(c,1,0)},d.prototype.fork=function(){return this.states=new l(this),this.head=this.tail=new s(u,0,0),this.len=0,this},d.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new s(u,0,0),this.len=0),this},d.prototype.ldelim=function(){var e=this.head,t=this.tail,r=this.len;return this.reset().uint32(r),r&&(this.tail.next=e.next,this.tail=t,this.len+=r),this},d.prototype.finish=function(){for(var e=this.head.next,t=this.constructor.alloc(this.len),r=0;e;)e.fn(e.val,t,r),r+=e.len,e=e.next;return t},d._configure=function(e){r=e,d.create=p(),r._configure()}}),t7=H((e,t)=>{"use strict";t.exports=i;var r=t8();(i.prototype=Object.create(r.prototype)).constructor=i;var n=t5();function i(){r.call(this)}function o(e,t,r){e.length<40?n.utf8.write(e,t,r):t.utf8Write?t.utf8Write(e,r):t.write(e,r)}i._configure=function(){i.alloc=n._Buffer_allocUnsafe,i.writeBytesBuffer=n.Buffer&&n.Buffer.prototype instanceof Uint8Array&&"set"===n.Buffer.prototype.set.name?function(e,t,r){t.set(e,r)}:function(e,t,r){if(e.copy)e.copy(t,r,0,e.length);else for(var n=0;n<e.length;)t[r++]=e[n++]}},i.prototype.bytes=function(e){n.isString(e)&&(e=n._Buffer_from(e,"base64"));var t=e.length>>>0;return this.uint32(t),t&&this._push(i.writeBytesBuffer,t,e),this},i.prototype.string=function(e){var t=n.Buffer.byteLength(e);return this.uint32(t),t&&this._push(o,t,e),this},i._configure()}),t9=H((e,t)=>{"use strict";t.exports=u;var r,n,i=t5(),o=i.LongBits,a=i.utf8;function s(e,t){return RangeError("index out of range: "+e.pos+" + "+(t||1)+" > "+e.len)}function u(e){this.buf=e,this.pos=0,this.len=e.length}var l="u">typeof Uint8Array?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new u(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new u(e);throw Error("illegal buffer")},d=function(){return i.Buffer?function(e){return(u.create=function(e){return i.Buffer.isBuffer(e)?new n(e):l(e)})(e)}:l};function p(){var e=new o(0,0),t=0;if(this.len-this.pos>4){for(;t<4;++t)if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e;if(e.lo=(e.lo|(127&this.buf[this.pos])<<28)>>>0,e.hi=(e.hi|(127&this.buf[this.pos])>>4)>>>0,this.buf[this.pos++]<128)return e;t=0}else{for(;t<3;++t){if(this.pos>=this.len)throw s(this);if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e}return e.lo=(e.lo|(127&this.buf[this.pos++])<<7*t)>>>0,e}if(this.len-this.pos>4){for(;t<5;++t)if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}else for(;t<5;++t){if(this.pos>=this.len)throw s(this);if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}throw Error("invalid varint encoding")}function c(e,t){return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0}function h(){if(this.pos+8>this.len)throw s(this,8);return new o(c(this.buf,this.pos+=4),c(this.buf,this.pos+=4))}u.create=d(),u.prototype._slice=i.Array.prototype.subarray||i.Array.prototype.slice,u.prototype.uint32=(r=0xffffffff,function(){if(r=(127&this.buf[this.pos])>>>0,this.buf[this.pos++]<128||(r=(r|(127&this.buf[this.pos])<<7)>>>0,this.buf[this.pos++]<128)||(r=(r|(127&this.buf[this.pos])<<14)>>>0,this.buf[this.pos++]<128)||(r=(r|(127&this.buf[this.pos])<<21)>>>0,this.buf[this.pos++]<128)||(r=(r|(15&this.buf[this.pos])<<28)>>>0,this.buf[this.pos++]<128))return r;if((this.pos+=5)>this.len)throw this.pos=this.len,s(this,10);return r}),u.prototype.int32=function(){return 0|this.uint32()},u.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(1&e)},u.prototype.bool=function(){return 0!==this.uint32()},u.prototype.fixed32=function(){if(this.pos+4>this.len)throw s(this,4);return c(this.buf,this.pos+=4)},u.prototype.sfixed32=function(){if(this.pos+4>this.len)throw s(this,4);return 0|c(this.buf,this.pos+=4)},u.prototype.float=function(){if(this.pos+4>this.len)throw s(this,4);var e=i.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e},u.prototype.double=function(){if(this.pos+8>this.len)throw s(this,4);var e=i.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e},u.prototype.bytes=function(){var e=this.uint32(),t=this.pos,r=this.pos+e;if(r>this.len)throw s(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(t,r);if(t===r){var n=i.Buffer;return n?n.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,t,r)},u.prototype.string=function(){var e=this.bytes();return a.read(e,0,e.length)},u.prototype.skip=function(e){if("number"==typeof e){if(this.pos+e>this.len)throw s(this,e);this.pos+=e}else do if(this.pos>=this.len)throw s(this);while(128&this.buf[this.pos++])return this},u.recursionLimit=i.recursionLimit,u.prototype.skipType=function(e,t){if(void 0===t&&(t=0),t>u.recursionLimit)throw Error("maximum nesting depth exceeded");switch(e){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;4!=(e=7&this.uint32());)this.skipType(e,t+1);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+e+" at offset "+this.pos)}return this},u._configure=function(e){n=e,u.create=d(),n._configure();var t=i.Long?"toLong":"toNumber";i.merge(u.prototype,{int64:function(){return p.call(this)[t](!1)},uint64:function(){return p.call(this)[t](!0)},sint64:function(){return p.call(this).zzDecode()[t](!1)},fixed64:function(){return h.call(this)[t](!0)},sfixed64:function(){return h.call(this)[t](!1)}})}}),re=H((e,t)=>{"use strict";t.exports=i;var r=t9();(i.prototype=Object.create(r.prototype)).constructor=i;var n=t5();function i(e){r.call(this,e)}i._configure=function(){n.Buffer&&(i.prototype._slice=n.Buffer.prototype.slice)},i.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))},i._configure()}),rt=H((e,t)=>{"use strict";t.exports=n;var r=t5();function n(e,t,n){if("function"!=typeof e)throw TypeError("rpcImpl must be a function");r.EventEmitter.call(this),this.rpcImpl=e,this.requestDelimited=!!t,this.responseDelimited=!!n}(n.prototype=Object.create(r.EventEmitter.prototype)).constructor=n,n.prototype.rpcCall=function e(t,n,i,o,a){if(!o)throw TypeError("request must be specified");var s=this;if(!a)return r.asPromise(e,s,t,n,i,o);if(!s.rpcImpl)return void setTimeout(function(){a(Error("already ended"))},0);try{return s.rpcImpl(t,n[s.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(e,r){if(e)return s.emit("error",e,t),a(e);if(null===r)return void s.end(!0);if(!(r instanceof i))try{r=i[s.responseDelimited?"decodeDelimited":"decode"](r)}catch(e){return s.emit("error",e,t),a(e)}return s.emit("data",r,t),a(null,r)})}catch(e){s.emit("error",e,t),setTimeout(function(){a(e)},0);return}},n.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}}),rr=H(e=>{"use strict";e.Service=rt()}),rn=H((e,t)=>{"use strict";t.exports=Object.create(null)}),ri=H(e=>{"use strict";function t(){e.util._configure(),e.Writer._configure(e.BufferWriter),e.Reader._configure(e.BufferReader)}e.build="minimal",e.Writer=t8(),e.BufferWriter=t7(),e.Reader=t9(),e.BufferReader=re(),e.util=t5(),e.rpc=rr(),e.roots=rn(),e.configure=t,t()}),ro=H((e,t)=>{"use strict";t.exports=ri()}),ra=H((e,t)=>{"use strict";var r,n,i,o,a,s=ro(),u=s.Reader,l=s.Writer,d=s.util,p=s.roots.default||(s.roots.default={});r={},(i=Object.create(n={}))[n[0]="_START_VERSION"]=0,i[n[1]="IR_VERSION_2017_10_10"]=1,i[n[2]="IR_VERSION_2017_10_30"]=2,i[n[3]="IR_VERSION_2017_11_3"]=3,i[n[4]="IR_VERSION_2019_1_22"]=4,i[n[5]="IR_VERSION_2019_3_18"]=5,i[n[6]="IR_VERSION_2019_9_19"]=6,i[n[7]="IR_VERSION_2020_5_8"]=7,i[n[8]="IR_VERSION_2021_7_30"]=8,i[n[9]="IR_VERSION"]=9,r.Version=i,r.AttributeProto=function(){var e,t;function r(e){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return r.prototype.name="",r.prototype.refAttrName="",r.prototype.docString="",r.prototype.type=0,r.prototype.f=0,r.prototype.i=d.Long?d.Long.fromBits(0,0,!1):0,r.prototype.s=d.newBuffer([]),r.prototype.t=null,r.prototype.g=null,r.prototype.sparseTensor=null,r.prototype.tp=null,r.prototype.floats=d.emptyArray,r.prototype.ints=d.emptyArray,r.prototype.strings=d.emptyArray,r.prototype.tensors=d.emptyArray,r.prototype.graphs=d.emptyArray,r.prototype.sparseTensors=d.emptyArray,r.prototype.typeProtos=d.emptyArray,r.create=function(e){return new r(e)},r.encode=function(e,t){if(t||(t=l.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.f&&Object.hasOwnProperty.call(e,"f")&&t.uint32(21).float(e.f),null!=e.i&&Object.hasOwnProperty.call(e,"i")&&t.uint32(24).int64(e.i),null!=e.s&&Object.hasOwnProperty.call(e,"s")&&t.uint32(34).bytes(e.s),null!=e.t&&Object.hasOwnProperty.call(e,"t")&&p.onnx.TensorProto.encode(e.t,t.uint32(42).fork()).ldelim(),null!=e.g&&Object.hasOwnProperty.call(e,"g")&&p.onnx.GraphProto.encode(e.g,t.uint32(50).fork()).ldelim(),null!=e.floats&&e.floats.length){t.uint32(58).fork();for(var r=0;r<e.floats.length;++r)t.float(e.floats[r]);t.ldelim()}if(null!=e.ints&&e.ints.length){t.uint32(66).fork();for(var r=0;r<e.ints.length;++r)t.int64(e.ints[r]);t.ldelim()}if(null!=e.strings&&e.strings.length)for(var r=0;r<e.strings.length;++r)t.uint32(74).bytes(e.strings[r]);if(null!=e.tensors&&e.tensors.length)for(var r=0;r<e.tensors.length;++r)p.onnx.TensorProto.encode(e.tensors[r],t.uint32(82).fork()).ldelim();if(null!=e.graphs&&e.graphs.length)for(var r=0;r<e.graphs.length;++r)p.onnx.GraphProto.encode(e.graphs[r],t.uint32(90).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(106).string(e.docString),null!=e.tp&&Object.hasOwnProperty.call(e,"tp")&&p.onnx.TypeProto.encode(e.tp,t.uint32(114).fork()).ldelim(),null!=e.typeProtos&&e.typeProtos.length)for(var r=0;r<e.typeProtos.length;++r)p.onnx.TypeProto.encode(e.typeProtos[r],t.uint32(122).fork()).ldelim();if(null!=e.type&&Object.hasOwnProperty.call(e,"type")&&t.uint32(160).int32(e.type),null!=e.refAttrName&&Object.hasOwnProperty.call(e,"refAttrName")&&t.uint32(170).string(e.refAttrName),null!=e.sparseTensor&&Object.hasOwnProperty.call(e,"sparseTensor")&&p.onnx.SparseTensorProto.encode(e.sparseTensor,t.uint32(178).fork()).ldelim(),null!=e.sparseTensors&&e.sparseTensors.length)for(var r=0;r<e.sparseTensors.length;++r)p.onnx.SparseTensorProto.encode(e.sparseTensors[r],t.uint32(186).fork()).ldelim();return t},r.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},r.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.AttributeProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.name=e.string();break;case 21:n.refAttrName=e.string();break;case 13:n.docString=e.string();break;case 20:n.type=e.int32();break;case 2:n.f=e.float();break;case 3:n.i=e.int64();break;case 4:n.s=e.bytes();break;case 5:n.t=p.onnx.TensorProto.decode(e,e.uint32());break;case 6:n.g=p.onnx.GraphProto.decode(e,e.uint32());break;case 22:n.sparseTensor=p.onnx.SparseTensorProto.decode(e,e.uint32());break;case 14:n.tp=p.onnx.TypeProto.decode(e,e.uint32());break;case 7:if(n.floats&&n.floats.length||(n.floats=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.floats.push(e.float());else n.floats.push(e.float());break;case 8:if(n.ints&&n.ints.length||(n.ints=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.ints.push(e.int64());else n.ints.push(e.int64());break;case 9:n.strings&&n.strings.length||(n.strings=[]),n.strings.push(e.bytes());break;case 10:n.tensors&&n.tensors.length||(n.tensors=[]),n.tensors.push(p.onnx.TensorProto.decode(e,e.uint32()));break;case 11:n.graphs&&n.graphs.length||(n.graphs=[]),n.graphs.push(p.onnx.GraphProto.decode(e,e.uint32()));break;case 23:n.sparseTensors&&n.sparseTensors.length||(n.sparseTensors=[]),n.sparseTensors.push(p.onnx.SparseTensorProto.decode(e,e.uint32()));break;case 15:n.typeProtos&&n.typeProtos.length||(n.typeProtos=[]),n.typeProtos.push(p.onnx.TypeProto.decode(e,e.uint32()));break;default:e.skipType(7&i)}}return n},r.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},r.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!d.isString(e.name))return"name: string expected";if(null!=e.refAttrName&&e.hasOwnProperty("refAttrName")&&!d.isString(e.refAttrName))return"refAttrName: string expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString))return"docString: string expected";if(null!=e.type&&e.hasOwnProperty("type"))switch(e.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:}if(null!=e.f&&e.hasOwnProperty("f")&&"number"!=typeof e.f)return"f: number expected";if(null!=e.i&&e.hasOwnProperty("i")&&!d.isInteger(e.i)&&!(e.i&&d.isInteger(e.i.low)&&d.isInteger(e.i.high)))return"i: integer|Long expected";if(null!=e.s&&e.hasOwnProperty("s")&&!(e.s&&"number"==typeof e.s.length||d.isString(e.s)))return"s: buffer expected";if(null!=e.t&&e.hasOwnProperty("t")){var t=p.onnx.TensorProto.verify(e.t);if(t)return"t."+t}if(null!=e.g&&e.hasOwnProperty("g")){var t=p.onnx.GraphProto.verify(e.g);if(t)return"g."+t}if(null!=e.sparseTensor&&e.hasOwnProperty("sparseTensor")){var t=p.onnx.SparseTensorProto.verify(e.sparseTensor);if(t)return"sparseTensor."+t}if(null!=e.tp&&e.hasOwnProperty("tp")){var t=p.onnx.TypeProto.verify(e.tp);if(t)return"tp."+t}if(null!=e.floats&&e.hasOwnProperty("floats")){if(!Array.isArray(e.floats))return"floats: array expected";for(var r=0;r<e.floats.length;++r)if("number"!=typeof e.floats[r])return"floats: number[] expected"}if(null!=e.ints&&e.hasOwnProperty("ints")){if(!Array.isArray(e.ints))return"ints: array expected";for(var r=0;r<e.ints.length;++r)if(!d.isInteger(e.ints[r])&&!(e.ints[r]&&d.isInteger(e.ints[r].low)&&d.isInteger(e.ints[r].high)))return"ints: integer|Long[] expected"}if(null!=e.strings&&e.hasOwnProperty("strings")){if(!Array.isArray(e.strings))return"strings: array expected";for(var r=0;r<e.strings.length;++r)if(!(e.strings[r]&&"number"==typeof e.strings[r].length||d.isString(e.strings[r])))return"strings: buffer[] expected"}if(null!=e.tensors&&e.hasOwnProperty("tensors")){if(!Array.isArray(e.tensors))return"tensors: array expected";for(var r=0;r<e.tensors.length;++r){var t=p.onnx.TensorProto.verify(e.tensors[r]);if(t)return"tensors."+t}}if(null!=e.graphs&&e.hasOwnProperty("graphs")){if(!Array.isArray(e.graphs))return"graphs: array expected";for(var r=0;r<e.graphs.length;++r){var t=p.onnx.GraphProto.verify(e.graphs[r]);if(t)return"graphs."+t}}if(null!=e.sparseTensors&&e.hasOwnProperty("sparseTensors")){if(!Array.isArray(e.sparseTensors))return"sparseTensors: array expected";for(var r=0;r<e.sparseTensors.length;++r){var t=p.onnx.SparseTensorProto.verify(e.sparseTensors[r]);if(t)return"sparseTensors."+t}}if(null!=e.typeProtos&&e.hasOwnProperty("typeProtos")){if(!Array.isArray(e.typeProtos))return"typeProtos: array expected";for(var r=0;r<e.typeProtos.length;++r){var t=p.onnx.TypeProto.verify(e.typeProtos[r]);if(t)return"typeProtos."+t}}return null},r.fromObject=function(e){if(e instanceof p.onnx.AttributeProto)return e;var t=new p.onnx.AttributeProto;switch(null!=e.name&&(t.name=String(e.name)),null!=e.refAttrName&&(t.refAttrName=String(e.refAttrName)),null!=e.docString&&(t.docString=String(e.docString)),e.type){default:"number"==typeof e.type&&(t.type=e.type);break;case"UNDEFINED":case 0:t.type=0;break;case"FLOAT":case 1:t.type=1;break;case"INT":case 2:t.type=2;break;case"STRING":case 3:t.type=3;break;case"TENSOR":case 4:t.type=4;break;case"GRAPH":case 5:t.type=5;break;case"SPARSE_TENSOR":case 11:t.type=11;break;case"TYPE_PROTO":case 13:t.type=13;break;case"FLOATS":case 6:t.type=6;break;case"INTS":case 7:t.type=7;break;case"STRINGS":case 8:t.type=8;break;case"TENSORS":case 9:t.type=9;break;case"GRAPHS":case 10:t.type=10;break;case"SPARSE_TENSORS":case 12:t.type=12;break;case"TYPE_PROTOS":case 14:t.type=14}if(null!=e.f&&(t.f=Number(e.f)),null!=e.i&&(d.Long?(t.i=d.Long.fromValue(e.i)).unsigned=!1:"string"==typeof e.i?t.i=parseInt(e.i,10):"number"==typeof e.i?t.i=e.i:"object"==typeof e.i&&(t.i=new d.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber())),null!=e.s&&("string"==typeof e.s?d.base64.decode(e.s,t.s=d.newBuffer(d.base64.length(e.s)),0):e.s.length>=0&&(t.s=e.s)),null!=e.t){if("object"!=typeof e.t)throw TypeError(".onnx.AttributeProto.t: object expected");t.t=p.onnx.TensorProto.fromObject(e.t)}if(null!=e.g){if("object"!=typeof e.g)throw TypeError(".onnx.AttributeProto.g: object expected");t.g=p.onnx.GraphProto.fromObject(e.g)}if(null!=e.sparseTensor){if("object"!=typeof e.sparseTensor)throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");t.sparseTensor=p.onnx.SparseTensorProto.fromObject(e.sparseTensor)}if(null!=e.tp){if("object"!=typeof e.tp)throw TypeError(".onnx.AttributeProto.tp: object expected");t.tp=p.onnx.TypeProto.fromObject(e.tp)}if(e.floats){if(!Array.isArray(e.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");t.floats=[];for(var r=0;r<e.floats.length;++r)t.floats[r]=Number(e.floats[r])}if(e.ints){if(!Array.isArray(e.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");t.ints=[];for(var r=0;r<e.ints.length;++r)d.Long?(t.ints[r]=d.Long.fromValue(e.ints[r])).unsigned=!1:"string"==typeof e.ints[r]?t.ints[r]=parseInt(e.ints[r],10):"number"==typeof e.ints[r]?t.ints[r]=e.ints[r]:"object"==typeof e.ints[r]&&(t.ints[r]=new d.LongBits(e.ints[r].low>>>0,e.ints[r].high>>>0).toNumber())}if(e.strings){if(!Array.isArray(e.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");t.strings=[];for(var r=0;r<e.strings.length;++r)"string"==typeof e.strings[r]?d.base64.decode(e.strings[r],t.strings[r]=d.newBuffer(d.base64.length(e.strings[r])),0):e.strings[r].length>=0&&(t.strings[r]=e.strings[r])}if(e.tensors){if(!Array.isArray(e.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");t.tensors=[];for(var r=0;r<e.tensors.length;++r){if("object"!=typeof e.tensors[r])throw TypeError(".onnx.AttributeProto.tensors: object expected");t.tensors[r]=p.onnx.TensorProto.fromObject(e.tensors[r])}}if(e.graphs){if(!Array.isArray(e.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");t.graphs=[];for(var r=0;r<e.graphs.length;++r){if("object"!=typeof e.graphs[r])throw TypeError(".onnx.AttributeProto.graphs: object expected");t.graphs[r]=p.onnx.GraphProto.fromObject(e.graphs[r])}}if(e.sparseTensors){if(!Array.isArray(e.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");t.sparseTensors=[];for(var r=0;r<e.sparseTensors.length;++r){if("object"!=typeof e.sparseTensors[r])throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");t.sparseTensors[r]=p.onnx.SparseTensorProto.fromObject(e.sparseTensors[r])}}if(e.typeProtos){if(!Array.isArray(e.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");t.typeProtos=[];for(var r=0;r<e.typeProtos.length;++r){if("object"!=typeof e.typeProtos[r])throw TypeError(".onnx.AttributeProto.typeProtos: object expected");t.typeProtos[r]=p.onnx.TypeProto.fromObject(e.typeProtos[r])}}return t},r.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.floats=[],r.ints=[],r.strings=[],r.tensors=[],r.graphs=[],r.typeProtos=[],r.sparseTensors=[]),t.defaults){if(r.name="",r.f=0,d.Long){var n=new d.Long(0,0,!1);r.i=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.i=t.longs===String?"0":0;t.bytes===String?r.s="":(r.s=[],t.bytes!==Array&&(r.s=d.newBuffer(r.s))),r.t=null,r.g=null,r.docString="",r.tp=null,r.type=t.enums===String?"UNDEFINED":0,r.refAttrName="",r.sparseTensor=null}if(null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),null!=e.f&&e.hasOwnProperty("f")&&(r.f=t.json&&!isFinite(e.f)?String(e.f):e.f),null!=e.i&&e.hasOwnProperty("i")&&("number"==typeof e.i?r.i=t.longs===String?String(e.i):e.i:r.i=t.longs===String?d.Long.prototype.toString.call(e.i):t.longs===Number?new d.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber():e.i),null!=e.s&&e.hasOwnProperty("s")&&(r.s=t.bytes===String?d.base64.encode(e.s,0,e.s.length):t.bytes===Array?Array.prototype.slice.call(e.s):e.s),null!=e.t&&e.hasOwnProperty("t")&&(r.t=p.onnx.TensorProto.toObject(e.t,t)),null!=e.g&&e.hasOwnProperty("g")&&(r.g=p.onnx.GraphProto.toObject(e.g,t)),e.floats&&e.floats.length){r.floats=[];for(var i=0;i<e.floats.length;++i)r.floats[i]=t.json&&!isFinite(e.floats[i])?String(e.floats[i]):e.floats[i]}if(e.ints&&e.ints.length){r.ints=[];for(var i=0;i<e.ints.length;++i)"number"==typeof e.ints[i]?r.ints[i]=t.longs===String?String(e.ints[i]):e.ints[i]:r.ints[i]=t.longs===String?d.Long.prototype.toString.call(e.ints[i]):t.longs===Number?new d.LongBits(e.ints[i].low>>>0,e.ints[i].high>>>0).toNumber():e.ints[i]}if(e.strings&&e.strings.length){r.strings=[];for(var i=0;i<e.strings.length;++i)r.strings[i]=t.bytes===String?d.base64.encode(e.strings[i],0,e.strings[i].length):t.bytes===Array?Array.prototype.slice.call(e.strings[i]):e.strings[i]}if(e.tensors&&e.tensors.length){r.tensors=[];for(var i=0;i<e.tensors.length;++i)r.tensors[i]=p.onnx.TensorProto.toObject(e.tensors[i],t)}if(e.graphs&&e.graphs.length){r.graphs=[];for(var i=0;i<e.graphs.length;++i)r.graphs[i]=p.onnx.GraphProto.toObject(e.graphs[i],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),null!=e.tp&&e.hasOwnProperty("tp")&&(r.tp=p.onnx.TypeProto.toObject(e.tp,t)),e.typeProtos&&e.typeProtos.length){r.typeProtos=[];for(var i=0;i<e.typeProtos.length;++i)r.typeProtos[i]=p.onnx.TypeProto.toObject(e.typeProtos[i],t)}if(null!=e.type&&e.hasOwnProperty("type")&&(r.type=t.enums===String?void 0===p.onnx.AttributeProto.AttributeType[e.type]?e.type:p.onnx.AttributeProto.AttributeType[e.type]:e.type),null!=e.refAttrName&&e.hasOwnProperty("refAttrName")&&(r.refAttrName=e.refAttrName),null!=e.sparseTensor&&e.hasOwnProperty("sparseTensor")&&(r.sparseTensor=p.onnx.SparseTensorProto.toObject(e.sparseTensor,t)),e.sparseTensors&&e.sparseTensors.length){r.sparseTensors=[];for(var i=0;i<e.sparseTensors.length;++i)r.sparseTensors[i]=p.onnx.SparseTensorProto.toObject(e.sparseTensors[i],t)}return r},r.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},r.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.AttributeProto"},(t=Object.create(e={}))[e[0]="UNDEFINED"]=0,t[e[1]="FLOAT"]=1,t[e[2]="INT"]=2,t[e[3]="STRING"]=3,t[e[4]="TENSOR"]=4,t[e[5]="GRAPH"]=5,t[e[11]="SPARSE_TENSOR"]=11,t[e[13]="TYPE_PROTO"]=13,t[e[6]="FLOATS"]=6,t[e[7]="INTS"]=7,t[e[8]="STRINGS"]=8,t[e[9]="TENSORS"]=9,t[e[10]="GRAPHS"]=10,t[e[12]="SPARSE_TENSORS"]=12,t[e[14]="TYPE_PROTOS"]=14,r.AttributeType=t,r}(),r.ValueInfoProto=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.type&&Object.hasOwnProperty.call(e,"type")&&p.onnx.TypeProto.encode(e.type,t.uint32(18).fork()).ldelim(),null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(26).string(e.docString),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.ValueInfoProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.name=e.string();break;case 2:n.type=p.onnx.TypeProto.decode(e,e.uint32());break;case 3:n.docString=e.string();break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!d.isString(e.name))return"name: string expected";if(null!=e.type&&e.hasOwnProperty("type")){var t=p.onnx.TypeProto.verify(e.type);if(t)return"type."+t}return null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString)?"docString: string expected":null},e.fromObject=function(e){if(e instanceof p.onnx.ValueInfoProto)return e;var t=new p.onnx.ValueInfoProto;if(null!=e.name&&(t.name=String(e.name)),null!=e.type){if("object"!=typeof e.type)throw TypeError(".onnx.ValueInfoProto.type: object expected");t.type=p.onnx.TypeProto.fromObject(e.type)}return null!=e.docString&&(t.docString=String(e.docString)),t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.name="",r.type=null,r.docString=""),null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),null!=e.type&&e.hasOwnProperty("type")&&(r.type=p.onnx.TypeProto.toObject(e.type,t)),null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.ValueInfoProto"},e}(),r.NodeProto=function(){function e(e){if(this.input=[],this.output=[],this.attribute=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.input=d.emptyArray,e.prototype.output=d.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=d.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.input&&e.input.length)for(var r=0;r<e.input.length;++r)t.uint32(10).string(e.input[r]);if(null!=e.output&&e.output.length)for(var r=0;r<e.output.length;++r)t.uint32(18).string(e.output[r]);if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(26).string(e.name),null!=e.opType&&Object.hasOwnProperty.call(e,"opType")&&t.uint32(34).string(e.opType),null!=e.attribute&&e.attribute.length)for(var r=0;r<e.attribute.length;++r)p.onnx.AttributeProto.encode(e.attribute[r],t.uint32(42).fork()).ldelim();return null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(50).string(e.docString),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(58).string(e.domain),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.NodeProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.input&&n.input.length||(n.input=[]),n.input.push(e.string());break;case 2:n.output&&n.output.length||(n.output=[]),n.output.push(e.string());break;case 3:n.name=e.string();break;case 4:n.opType=e.string();break;case 7:n.domain=e.string();break;case 5:n.attribute&&n.attribute.length||(n.attribute=[]),n.attribute.push(p.onnx.AttributeProto.decode(e,e.uint32()));break;case 6:n.docString=e.string();break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t)if(!d.isString(e.input[t]))return"input: string[] expected"}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t)if(!d.isString(e.output[t]))return"output: string[] expected"}if(null!=e.name&&e.hasOwnProperty("name")&&!d.isString(e.name))return"name: string expected";if(null!=e.opType&&e.hasOwnProperty("opType")&&!d.isString(e.opType))return"opType: string expected";if(null!=e.domain&&e.hasOwnProperty("domain")&&!d.isString(e.domain))return"domain: string expected";if(null!=e.attribute&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var t=0;t<e.attribute.length;++t){var r=p.onnx.AttributeProto.verify(e.attribute[t]);if(r)return"attribute."+r}}return null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString)?"docString: string expected":null},e.fromObject=function(e){if(e instanceof p.onnx.NodeProto)return e;var t=new p.onnx.NodeProto;if(e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.NodeProto.input: array expected");t.input=[];for(var r=0;r<e.input.length;++r)t.input[r]=String(e.input[r])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.NodeProto.output: array expected");t.output=[];for(var r=0;r<e.output.length;++r)t.output[r]=String(e.output[r])}if(null!=e.name&&(t.name=String(e.name)),null!=e.opType&&(t.opType=String(e.opType)),null!=e.domain&&(t.domain=String(e.domain)),e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");t.attribute=[];for(var r=0;r<e.attribute.length;++r){if("object"!=typeof e.attribute[r])throw TypeError(".onnx.NodeProto.attribute: object expected");t.attribute[r]=p.onnx.AttributeProto.fromObject(e.attribute[r])}}return null!=e.docString&&(t.docString=String(e.docString)),t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.input=[],r.output=[],r.attribute=[]),t.defaults&&(r.name="",r.opType="",r.docString="",r.domain=""),e.input&&e.input.length){r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=e.input[n]}if(e.output&&e.output.length){r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=e.output[n]}if(null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),null!=e.opType&&e.hasOwnProperty("opType")&&(r.opType=e.opType),e.attribute&&e.attribute.length){r.attribute=[];for(var n=0;n<e.attribute.length;++n)r.attribute[n]=p.onnx.AttributeProto.toObject(e.attribute[n],t)}return null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),null!=e.domain&&e.hasOwnProperty("domain")&&(r.domain=e.domain),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.NodeProto"},e}(),r.TrainingInfoProto=function(){function e(e){if(this.initializationBinding=[],this.updateBinding=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=d.emptyArray,e.prototype.updateBinding=d.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.initialization&&Object.hasOwnProperty.call(e,"initialization")&&p.onnx.GraphProto.encode(e.initialization,t.uint32(10).fork()).ldelim(),null!=e.algorithm&&Object.hasOwnProperty.call(e,"algorithm")&&p.onnx.GraphProto.encode(e.algorithm,t.uint32(18).fork()).ldelim(),null!=e.initializationBinding&&e.initializationBinding.length)for(var r=0;r<e.initializationBinding.length;++r)p.onnx.StringStringEntryProto.encode(e.initializationBinding[r],t.uint32(26).fork()).ldelim();if(null!=e.updateBinding&&e.updateBinding.length)for(var r=0;r<e.updateBinding.length;++r)p.onnx.StringStringEntryProto.encode(e.updateBinding[r],t.uint32(34).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TrainingInfoProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.initialization=p.onnx.GraphProto.decode(e,e.uint32());break;case 2:n.algorithm=p.onnx.GraphProto.decode(e,e.uint32());break;case 3:n.initializationBinding&&n.initializationBinding.length||(n.initializationBinding=[]),n.initializationBinding.push(p.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 4:n.updateBinding&&n.updateBinding.length||(n.updateBinding=[]),n.updateBinding.push(p.onnx.StringStringEntryProto.decode(e,e.uint32()));break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.initialization&&e.hasOwnProperty("initialization")){var t=p.onnx.GraphProto.verify(e.initialization);if(t)return"initialization."+t}if(null!=e.algorithm&&e.hasOwnProperty("algorithm")){var t=p.onnx.GraphProto.verify(e.algorithm);if(t)return"algorithm."+t}if(null!=e.initializationBinding&&e.hasOwnProperty("initializationBinding")){if(!Array.isArray(e.initializationBinding))return"initializationBinding: array expected";for(var r=0;r<e.initializationBinding.length;++r){var t=p.onnx.StringStringEntryProto.verify(e.initializationBinding[r]);if(t)return"initializationBinding."+t}}if(null!=e.updateBinding&&e.hasOwnProperty("updateBinding")){if(!Array.isArray(e.updateBinding))return"updateBinding: array expected";for(var r=0;r<e.updateBinding.length;++r){var t=p.onnx.StringStringEntryProto.verify(e.updateBinding[r]);if(t)return"updateBinding."+t}}return null},e.fromObject=function(e){if(e instanceof p.onnx.TrainingInfoProto)return e;var t=new p.onnx.TrainingInfoProto;if(null!=e.initialization){if("object"!=typeof e.initialization)throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");t.initialization=p.onnx.GraphProto.fromObject(e.initialization)}if(null!=e.algorithm){if("object"!=typeof e.algorithm)throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");t.algorithm=p.onnx.GraphProto.fromObject(e.algorithm)}if(e.initializationBinding){if(!Array.isArray(e.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");t.initializationBinding=[];for(var r=0;r<e.initializationBinding.length;++r){if("object"!=typeof e.initializationBinding[r])throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");t.initializationBinding[r]=p.onnx.StringStringEntryProto.fromObject(e.initializationBinding[r])}}if(e.updateBinding){if(!Array.isArray(e.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");t.updateBinding=[];for(var r=0;r<e.updateBinding.length;++r){if("object"!=typeof e.updateBinding[r])throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");t.updateBinding[r]=p.onnx.StringStringEntryProto.fromObject(e.updateBinding[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.initializationBinding=[],r.updateBinding=[]),t.defaults&&(r.initialization=null,r.algorithm=null),null!=e.initialization&&e.hasOwnProperty("initialization")&&(r.initialization=p.onnx.GraphProto.toObject(e.initialization,t)),null!=e.algorithm&&e.hasOwnProperty("algorithm")&&(r.algorithm=p.onnx.GraphProto.toObject(e.algorithm,t)),e.initializationBinding&&e.initializationBinding.length){r.initializationBinding=[];for(var n=0;n<e.initializationBinding.length;++n)r.initializationBinding[n]=p.onnx.StringStringEntryProto.toObject(e.initializationBinding[n],t)}if(e.updateBinding&&e.updateBinding.length){r.updateBinding=[];for(var n=0;n<e.updateBinding.length;++n)r.updateBinding[n]=p.onnx.StringStringEntryProto.toObject(e.updateBinding[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TrainingInfoProto"},e}(),r.ModelProto=function(){function e(e){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.irVersion=d.Long?d.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=d.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=d.Long?d.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=d.emptyArray,e.prototype.trainingInfo=d.emptyArray,e.prototype.functions=d.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.irVersion&&Object.hasOwnProperty.call(e,"irVersion")&&t.uint32(8).int64(e.irVersion),null!=e.producerName&&Object.hasOwnProperty.call(e,"producerName")&&t.uint32(18).string(e.producerName),null!=e.producerVersion&&Object.hasOwnProperty.call(e,"producerVersion")&&t.uint32(26).string(e.producerVersion),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(34).string(e.domain),null!=e.modelVersion&&Object.hasOwnProperty.call(e,"modelVersion")&&t.uint32(40).int64(e.modelVersion),null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(50).string(e.docString),null!=e.graph&&Object.hasOwnProperty.call(e,"graph")&&p.onnx.GraphProto.encode(e.graph,t.uint32(58).fork()).ldelim(),null!=e.opsetImport&&e.opsetImport.length)for(var r=0;r<e.opsetImport.length;++r)p.onnx.OperatorSetIdProto.encode(e.opsetImport[r],t.uint32(66).fork()).ldelim();if(null!=e.metadataProps&&e.metadataProps.length)for(var r=0;r<e.metadataProps.length;++r)p.onnx.StringStringEntryProto.encode(e.metadataProps[r],t.uint32(114).fork()).ldelim();if(null!=e.trainingInfo&&e.trainingInfo.length)for(var r=0;r<e.trainingInfo.length;++r)p.onnx.TrainingInfoProto.encode(e.trainingInfo[r],t.uint32(162).fork()).ldelim();if(null!=e.functions&&e.functions.length)for(var r=0;r<e.functions.length;++r)p.onnx.FunctionProto.encode(e.functions[r],t.uint32(202).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.ModelProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.irVersion=e.int64();break;case 8:n.opsetImport&&n.opsetImport.length||(n.opsetImport=[]),n.opsetImport.push(p.onnx.OperatorSetIdProto.decode(e,e.uint32()));break;case 2:n.producerName=e.string();break;case 3:n.producerVersion=e.string();break;case 4:n.domain=e.string();break;case 5:n.modelVersion=e.int64();break;case 6:n.docString=e.string();break;case 7:n.graph=p.onnx.GraphProto.decode(e,e.uint32());break;case 14:n.metadataProps&&n.metadataProps.length||(n.metadataProps=[]),n.metadataProps.push(p.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 20:n.trainingInfo&&n.trainingInfo.length||(n.trainingInfo=[]),n.trainingInfo.push(p.onnx.TrainingInfoProto.decode(e,e.uint32()));break;case 25:n.functions&&n.functions.length||(n.functions=[]),n.functions.push(p.onnx.FunctionProto.decode(e,e.uint32()));break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.irVersion&&e.hasOwnProperty("irVersion")&&!d.isInteger(e.irVersion)&&!(e.irVersion&&d.isInteger(e.irVersion.low)&&d.isInteger(e.irVersion.high)))return"irVersion: integer|Long expected";if(null!=e.opsetImport&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var t=0;t<e.opsetImport.length;++t){var r=p.onnx.OperatorSetIdProto.verify(e.opsetImport[t]);if(r)return"opsetImport."+r}}if(null!=e.producerName&&e.hasOwnProperty("producerName")&&!d.isString(e.producerName))return"producerName: string expected";if(null!=e.producerVersion&&e.hasOwnProperty("producerVersion")&&!d.isString(e.producerVersion))return"producerVersion: string expected";if(null!=e.domain&&e.hasOwnProperty("domain")&&!d.isString(e.domain))return"domain: string expected";if(null!=e.modelVersion&&e.hasOwnProperty("modelVersion")&&!d.isInteger(e.modelVersion)&&!(e.modelVersion&&d.isInteger(e.modelVersion.low)&&d.isInteger(e.modelVersion.high)))return"modelVersion: integer|Long expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString))return"docString: string expected";if(null!=e.graph&&e.hasOwnProperty("graph")){var r=p.onnx.GraphProto.verify(e.graph);if(r)return"graph."+r}if(null!=e.metadataProps&&e.hasOwnProperty("metadataProps")){if(!Array.isArray(e.metadataProps))return"metadataProps: array expected";for(var t=0;t<e.metadataProps.length;++t){var r=p.onnx.StringStringEntryProto.verify(e.metadataProps[t]);if(r)return"metadataProps."+r}}if(null!=e.trainingInfo&&e.hasOwnProperty("trainingInfo")){if(!Array.isArray(e.trainingInfo))return"trainingInfo: array expected";for(var t=0;t<e.trainingInfo.length;++t){var r=p.onnx.TrainingInfoProto.verify(e.trainingInfo[t]);if(r)return"trainingInfo."+r}}if(null!=e.functions&&e.hasOwnProperty("functions")){if(!Array.isArray(e.functions))return"functions: array expected";for(var t=0;t<e.functions.length;++t){var r=p.onnx.FunctionProto.verify(e.functions[t]);if(r)return"functions."+r}}return null},e.fromObject=function(e){if(e instanceof p.onnx.ModelProto)return e;var t=new p.onnx.ModelProto;if(null!=e.irVersion&&(d.Long?(t.irVersion=d.Long.fromValue(e.irVersion)).unsigned=!1:"string"==typeof e.irVersion?t.irVersion=parseInt(e.irVersion,10):"number"==typeof e.irVersion?t.irVersion=e.irVersion:"object"==typeof e.irVersion&&(t.irVersion=new d.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber())),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");t.opsetImport=[];for(var r=0;r<e.opsetImport.length;++r){if("object"!=typeof e.opsetImport[r])throw TypeError(".onnx.ModelProto.opsetImport: object expected");t.opsetImport[r]=p.onnx.OperatorSetIdProto.fromObject(e.opsetImport[r])}}if(null!=e.producerName&&(t.producerName=String(e.producerName)),null!=e.producerVersion&&(t.producerVersion=String(e.producerVersion)),null!=e.domain&&(t.domain=String(e.domain)),null!=e.modelVersion&&(d.Long?(t.modelVersion=d.Long.fromValue(e.modelVersion)).unsigned=!1:"string"==typeof e.modelVersion?t.modelVersion=parseInt(e.modelVersion,10):"number"==typeof e.modelVersion?t.modelVersion=e.modelVersion:"object"==typeof e.modelVersion&&(t.modelVersion=new d.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber())),null!=e.docString&&(t.docString=String(e.docString)),null!=e.graph){if("object"!=typeof e.graph)throw TypeError(".onnx.ModelProto.graph: object expected");t.graph=p.onnx.GraphProto.fromObject(e.graph)}if(e.metadataProps){if(!Array.isArray(e.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");t.metadataProps=[];for(var r=0;r<e.metadataProps.length;++r){if("object"!=typeof e.metadataProps[r])throw TypeError(".onnx.ModelProto.metadataProps: object expected");t.metadataProps[r]=p.onnx.StringStringEntryProto.fromObject(e.metadataProps[r])}}if(e.trainingInfo){if(!Array.isArray(e.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");t.trainingInfo=[];for(var r=0;r<e.trainingInfo.length;++r){if("object"!=typeof e.trainingInfo[r])throw TypeError(".onnx.ModelProto.trainingInfo: object expected");t.trainingInfo[r]=p.onnx.TrainingInfoProto.fromObject(e.trainingInfo[r])}}if(e.functions){if(!Array.isArray(e.functions))throw TypeError(".onnx.ModelProto.functions: array expected");t.functions=[];for(var r=0;r<e.functions.length;++r){if("object"!=typeof e.functions[r])throw TypeError(".onnx.ModelProto.functions: object expected");t.functions[r]=p.onnx.FunctionProto.fromObject(e.functions[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.opsetImport=[],r.metadataProps=[],r.trainingInfo=[],r.functions=[]),t.defaults){if(d.Long){var n=new d.Long(0,0,!1);r.irVersion=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.irVersion=t.longs===String?"0":0;if(r.producerName="",r.producerVersion="",r.domain="",d.Long){var n=new d.Long(0,0,!1);r.modelVersion=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.modelVersion=t.longs===String?"0":0;r.docString="",r.graph=null}if(null!=e.irVersion&&e.hasOwnProperty("irVersion")&&("number"==typeof e.irVersion?r.irVersion=t.longs===String?String(e.irVersion):e.irVersion:r.irVersion=t.longs===String?d.Long.prototype.toString.call(e.irVersion):t.longs===Number?new d.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber():e.irVersion),null!=e.producerName&&e.hasOwnProperty("producerName")&&(r.producerName=e.producerName),null!=e.producerVersion&&e.hasOwnProperty("producerVersion")&&(r.producerVersion=e.producerVersion),null!=e.domain&&e.hasOwnProperty("domain")&&(r.domain=e.domain),null!=e.modelVersion&&e.hasOwnProperty("modelVersion")&&("number"==typeof e.modelVersion?r.modelVersion=t.longs===String?String(e.modelVersion):e.modelVersion:r.modelVersion=t.longs===String?d.Long.prototype.toString.call(e.modelVersion):t.longs===Number?new d.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber():e.modelVersion),null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),null!=e.graph&&e.hasOwnProperty("graph")&&(r.graph=p.onnx.GraphProto.toObject(e.graph,t)),e.opsetImport&&e.opsetImport.length){r.opsetImport=[];for(var i=0;i<e.opsetImport.length;++i)r.opsetImport[i]=p.onnx.OperatorSetIdProto.toObject(e.opsetImport[i],t)}if(e.metadataProps&&e.metadataProps.length){r.metadataProps=[];for(var i=0;i<e.metadataProps.length;++i)r.metadataProps[i]=p.onnx.StringStringEntryProto.toObject(e.metadataProps[i],t)}if(e.trainingInfo&&e.trainingInfo.length){r.trainingInfo=[];for(var i=0;i<e.trainingInfo.length;++i)r.trainingInfo[i]=p.onnx.TrainingInfoProto.toObject(e.trainingInfo[i],t)}if(e.functions&&e.functions.length){r.functions=[];for(var i=0;i<e.functions.length;++i)r.functions[i]=p.onnx.FunctionProto.toObject(e.functions[i],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.ModelProto"},e}(),r.StringStringEntryProto=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.key&&Object.hasOwnProperty.call(e,"key")&&t.uint32(10).string(e.key),null!=e.value&&Object.hasOwnProperty.call(e,"value")&&t.uint32(18).string(e.value),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.StringStringEntryProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.key=e.string();break;case 2:n.value=e.string();break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.key&&e.hasOwnProperty("key")&&!d.isString(e.key)?"key: string expected":null!=e.value&&e.hasOwnProperty("value")&&!d.isString(e.value)?"value: string expected":null},e.fromObject=function(e){if(e instanceof p.onnx.StringStringEntryProto)return e;var t=new p.onnx.StringStringEntryProto;return null!=e.key&&(t.key=String(e.key)),null!=e.value&&(t.value=String(e.value)),t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.key="",r.value=""),null!=e.key&&e.hasOwnProperty("key")&&(r.key=e.key),null!=e.value&&e.hasOwnProperty("value")&&(r.value=e.value),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.StringStringEntryProto"},e}(),r.TensorAnnotation=function(){function e(e){if(this.quantParameterTensorNames=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=d.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.tensorName&&Object.hasOwnProperty.call(e,"tensorName")&&t.uint32(10).string(e.tensorName),null!=e.quantParameterTensorNames&&e.quantParameterTensorNames.length)for(var r=0;r<e.quantParameterTensorNames.length;++r)p.onnx.StringStringEntryProto.encode(e.quantParameterTensorNames[r],t.uint32(18).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TensorAnnotation;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.tensorName=e.string();break;case 2:n.quantParameterTensorNames&&n.quantParameterTensorNames.length||(n.quantParameterTensorNames=[]),n.quantParameterTensorNames.push(p.onnx.StringStringEntryProto.decode(e,e.uint32()));break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.tensorName&&e.hasOwnProperty("tensorName")&&!d.isString(e.tensorName))return"tensorName: string expected";if(null!=e.quantParameterTensorNames&&e.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(e.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var t=0;t<e.quantParameterTensorNames.length;++t){var r=p.onnx.StringStringEntryProto.verify(e.quantParameterTensorNames[t]);if(r)return"quantParameterTensorNames."+r}}return null},e.fromObject=function(e){if(e instanceof p.onnx.TensorAnnotation)return e;var t=new p.onnx.TensorAnnotation;if(null!=e.tensorName&&(t.tensorName=String(e.tensorName)),e.quantParameterTensorNames){if(!Array.isArray(e.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");t.quantParameterTensorNames=[];for(var r=0;r<e.quantParameterTensorNames.length;++r){if("object"!=typeof e.quantParameterTensorNames[r])throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");t.quantParameterTensorNames[r]=p.onnx.StringStringEntryProto.fromObject(e.quantParameterTensorNames[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.quantParameterTensorNames=[]),t.defaults&&(r.tensorName=""),null!=e.tensorName&&e.hasOwnProperty("tensorName")&&(r.tensorName=e.tensorName),e.quantParameterTensorNames&&e.quantParameterTensorNames.length){r.quantParameterTensorNames=[];for(var n=0;n<e.quantParameterTensorNames.length;++n)r.quantParameterTensorNames[n]=p.onnx.StringStringEntryProto.toObject(e.quantParameterTensorNames[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorAnnotation"},e}(),r.GraphProto=function(){function e(e){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.node=d.emptyArray,e.prototype.name="",e.prototype.initializer=d.emptyArray,e.prototype.sparseInitializer=d.emptyArray,e.prototype.docString="",e.prototype.input=d.emptyArray,e.prototype.output=d.emptyArray,e.prototype.valueInfo=d.emptyArray,e.prototype.quantizationAnnotation=d.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.node&&e.node.length)for(var r=0;r<e.node.length;++r)p.onnx.NodeProto.encode(e.node[r],t.uint32(10).fork()).ldelim();if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(18).string(e.name),null!=e.initializer&&e.initializer.length)for(var r=0;r<e.initializer.length;++r)p.onnx.TensorProto.encode(e.initializer[r],t.uint32(42).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(82).string(e.docString),null!=e.input&&e.input.length)for(var r=0;r<e.input.length;++r)p.onnx.ValueInfoProto.encode(e.input[r],t.uint32(90).fork()).ldelim();if(null!=e.output&&e.output.length)for(var r=0;r<e.output.length;++r)p.onnx.ValueInfoProto.encode(e.output[r],t.uint32(98).fork()).ldelim();if(null!=e.valueInfo&&e.valueInfo.length)for(var r=0;r<e.valueInfo.length;++r)p.onnx.ValueInfoProto.encode(e.valueInfo[r],t.uint32(106).fork()).ldelim();if(null!=e.quantizationAnnotation&&e.quantizationAnnotation.length)for(var r=0;r<e.quantizationAnnotation.length;++r)p.onnx.TensorAnnotation.encode(e.quantizationAnnotation[r],t.uint32(114).fork()).ldelim();if(null!=e.sparseInitializer&&e.sparseInitializer.length)for(var r=0;r<e.sparseInitializer.length;++r)p.onnx.SparseTensorProto.encode(e.sparseInitializer[r],t.uint32(122).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.GraphProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.node&&n.node.length||(n.node=[]),n.node.push(p.onnx.NodeProto.decode(e,e.uint32()));break;case 2:n.name=e.string();break;case 5:n.initializer&&n.initializer.length||(n.initializer=[]),n.initializer.push(p.onnx.TensorProto.decode(e,e.uint32()));break;case 15:n.sparseInitializer&&n.sparseInitializer.length||(n.sparseInitializer=[]),n.sparseInitializer.push(p.onnx.SparseTensorProto.decode(e,e.uint32()));break;case 10:n.docString=e.string();break;case 11:n.input&&n.input.length||(n.input=[]),n.input.push(p.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 12:n.output&&n.output.length||(n.output=[]),n.output.push(p.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 13:n.valueInfo&&n.valueInfo.length||(n.valueInfo=[]),n.valueInfo.push(p.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 14:n.quantizationAnnotation&&n.quantizationAnnotation.length||(n.quantizationAnnotation=[]),n.quantizationAnnotation.push(p.onnx.TensorAnnotation.decode(e,e.uint32()));break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.node&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var t=0;t<e.node.length;++t){var r=p.onnx.NodeProto.verify(e.node[t]);if(r)return"node."+r}}if(null!=e.name&&e.hasOwnProperty("name")&&!d.isString(e.name))return"name: string expected";if(null!=e.initializer&&e.hasOwnProperty("initializer")){if(!Array.isArray(e.initializer))return"initializer: array expected";for(var t=0;t<e.initializer.length;++t){var r=p.onnx.TensorProto.verify(e.initializer[t]);if(r)return"initializer."+r}}if(null!=e.sparseInitializer&&e.hasOwnProperty("sparseInitializer")){if(!Array.isArray(e.sparseInitializer))return"sparseInitializer: array expected";for(var t=0;t<e.sparseInitializer.length;++t){var r=p.onnx.SparseTensorProto.verify(e.sparseInitializer[t]);if(r)return"sparseInitializer."+r}}if(null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString))return"docString: string expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t){var r=p.onnx.ValueInfoProto.verify(e.input[t]);if(r)return"input."+r}}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t){var r=p.onnx.ValueInfoProto.verify(e.output[t]);if(r)return"output."+r}}if(null!=e.valueInfo&&e.hasOwnProperty("valueInfo")){if(!Array.isArray(e.valueInfo))return"valueInfo: array expected";for(var t=0;t<e.valueInfo.length;++t){var r=p.onnx.ValueInfoProto.verify(e.valueInfo[t]);if(r)return"valueInfo."+r}}if(null!=e.quantizationAnnotation&&e.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(e.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var t=0;t<e.quantizationAnnotation.length;++t){var r=p.onnx.TensorAnnotation.verify(e.quantizationAnnotation[t]);if(r)return"quantizationAnnotation."+r}}return null},e.fromObject=function(e){if(e instanceof p.onnx.GraphProto)return e;var t=new p.onnx.GraphProto;if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.GraphProto.node: array expected");t.node=[];for(var r=0;r<e.node.length;++r){if("object"!=typeof e.node[r])throw TypeError(".onnx.GraphProto.node: object expected");t.node[r]=p.onnx.NodeProto.fromObject(e.node[r])}}if(null!=e.name&&(t.name=String(e.name)),e.initializer){if(!Array.isArray(e.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");t.initializer=[];for(var r=0;r<e.initializer.length;++r){if("object"!=typeof e.initializer[r])throw TypeError(".onnx.GraphProto.initializer: object expected");t.initializer[r]=p.onnx.TensorProto.fromObject(e.initializer[r])}}if(e.sparseInitializer){if(!Array.isArray(e.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");t.sparseInitializer=[];for(var r=0;r<e.sparseInitializer.length;++r){if("object"!=typeof e.sparseInitializer[r])throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");t.sparseInitializer[r]=p.onnx.SparseTensorProto.fromObject(e.sparseInitializer[r])}}if(null!=e.docString&&(t.docString=String(e.docString)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.GraphProto.input: array expected");t.input=[];for(var r=0;r<e.input.length;++r){if("object"!=typeof e.input[r])throw TypeError(".onnx.GraphProto.input: object expected");t.input[r]=p.onnx.ValueInfoProto.fromObject(e.input[r])}}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.GraphProto.output: array expected");t.output=[];for(var r=0;r<e.output.length;++r){if("object"!=typeof e.output[r])throw TypeError(".onnx.GraphProto.output: object expected");t.output[r]=p.onnx.ValueInfoProto.fromObject(e.output[r])}}if(e.valueInfo){if(!Array.isArray(e.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");t.valueInfo=[];for(var r=0;r<e.valueInfo.length;++r){if("object"!=typeof e.valueInfo[r])throw TypeError(".onnx.GraphProto.valueInfo: object expected");t.valueInfo[r]=p.onnx.ValueInfoProto.fromObject(e.valueInfo[r])}}if(e.quantizationAnnotation){if(!Array.isArray(e.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");t.quantizationAnnotation=[];for(var r=0;r<e.quantizationAnnotation.length;++r){if("object"!=typeof e.quantizationAnnotation[r])throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");t.quantizationAnnotation[r]=p.onnx.TensorAnnotation.fromObject(e.quantizationAnnotation[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.node=[],r.initializer=[],r.input=[],r.output=[],r.valueInfo=[],r.quantizationAnnotation=[],r.sparseInitializer=[]),t.defaults&&(r.name="",r.docString=""),e.node&&e.node.length){r.node=[];for(var n=0;n<e.node.length;++n)r.node[n]=p.onnx.NodeProto.toObject(e.node[n],t)}if(null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),e.initializer&&e.initializer.length){r.initializer=[];for(var n=0;n<e.initializer.length;++n)r.initializer[n]=p.onnx.TensorProto.toObject(e.initializer[n],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),e.input&&e.input.length){r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=p.onnx.ValueInfoProto.toObject(e.input[n],t)}if(e.output&&e.output.length){r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=p.onnx.ValueInfoProto.toObject(e.output[n],t)}if(e.valueInfo&&e.valueInfo.length){r.valueInfo=[];for(var n=0;n<e.valueInfo.length;++n)r.valueInfo[n]=p.onnx.ValueInfoProto.toObject(e.valueInfo[n],t)}if(e.quantizationAnnotation&&e.quantizationAnnotation.length){r.quantizationAnnotation=[];for(var n=0;n<e.quantizationAnnotation.length;++n)r.quantizationAnnotation[n]=p.onnx.TensorAnnotation.toObject(e.quantizationAnnotation[n],t)}if(e.sparseInitializer&&e.sparseInitializer.length){r.sparseInitializer=[];for(var n=0;n<e.sparseInitializer.length;++n)r.sparseInitializer[n]=p.onnx.SparseTensorProto.toObject(e.sparseInitializer[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.GraphProto"},e}(),r.TensorProto=function(){var e,t,r,n;function i(e){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return i.prototype.dims=d.emptyArray,i.prototype.dataType=0,i.prototype.segment=null,i.prototype.floatData=d.emptyArray,i.prototype.int32Data=d.emptyArray,i.prototype.stringData=d.emptyArray,i.prototype.int64Data=d.emptyArray,i.prototype.name="",i.prototype.docString="",i.prototype.rawData=d.newBuffer([]),i.prototype.externalData=d.emptyArray,i.prototype.dataLocation=0,i.prototype.doubleData=d.emptyArray,i.prototype.uint64Data=d.emptyArray,i.create=function(e){return new i(e)},i.encode=function(e,t){if(t||(t=l.create()),null!=e.dims&&e.dims.length){t.uint32(10).fork();for(var r=0;r<e.dims.length;++r)t.int64(e.dims[r]);t.ldelim()}if(null!=e.dataType&&Object.hasOwnProperty.call(e,"dataType")&&t.uint32(16).int32(e.dataType),null!=e.segment&&Object.hasOwnProperty.call(e,"segment")&&p.onnx.TensorProto.Segment.encode(e.segment,t.uint32(26).fork()).ldelim(),null!=e.floatData&&e.floatData.length){t.uint32(34).fork();for(var r=0;r<e.floatData.length;++r)t.float(e.floatData[r]);t.ldelim()}if(null!=e.int32Data&&e.int32Data.length){t.uint32(42).fork();for(var r=0;r<e.int32Data.length;++r)t.int32(e.int32Data[r]);t.ldelim()}if(null!=e.stringData&&e.stringData.length)for(var r=0;r<e.stringData.length;++r)t.uint32(50).bytes(e.stringData[r]);if(null!=e.int64Data&&e.int64Data.length){t.uint32(58).fork();for(var r=0;r<e.int64Data.length;++r)t.int64(e.int64Data[r]);t.ldelim()}if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(66).string(e.name),null!=e.rawData&&Object.hasOwnProperty.call(e,"rawData")&&t.uint32(74).bytes(e.rawData),null!=e.doubleData&&e.doubleData.length){t.uint32(82).fork();for(var r=0;r<e.doubleData.length;++r)t.double(e.doubleData[r]);t.ldelim()}if(null!=e.uint64Data&&e.uint64Data.length){t.uint32(90).fork();for(var r=0;r<e.uint64Data.length;++r)t.uint64(e.uint64Data[r]);t.ldelim()}if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(98).string(e.docString),null!=e.externalData&&e.externalData.length)for(var r=0;r<e.externalData.length;++r)p.onnx.StringStringEntryProto.encode(e.externalData[r],t.uint32(106).fork()).ldelim();return null!=e.dataLocation&&Object.hasOwnProperty.call(e,"dataLocation")&&t.uint32(112).int32(e.dataLocation),t},i.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},i.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TensorProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:if(n.dims&&n.dims.length||(n.dims=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.dims.push(e.int64());else n.dims.push(e.int64());break;case 2:n.dataType=e.int32();break;case 3:n.segment=p.onnx.TensorProto.Segment.decode(e,e.uint32());break;case 4:if(n.floatData&&n.floatData.length||(n.floatData=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.floatData.push(e.float());else n.floatData.push(e.float());break;case 5:if(n.int32Data&&n.int32Data.length||(n.int32Data=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.int32Data.push(e.int32());else n.int32Data.push(e.int32());break;case 6:n.stringData&&n.stringData.length||(n.stringData=[]),n.stringData.push(e.bytes());break;case 7:if(n.int64Data&&n.int64Data.length||(n.int64Data=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.int64Data.push(e.int64());else n.int64Data.push(e.int64());break;case 8:n.name=e.string();break;case 12:n.docString=e.string();break;case 9:n.rawData=e.bytes();break;case 13:n.externalData&&n.externalData.length||(n.externalData=[]),n.externalData.push(p.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 14:n.dataLocation=e.int32();break;case 10:if(n.doubleData&&n.doubleData.length||(n.doubleData=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.doubleData.push(e.double());else n.doubleData.push(e.double());break;case 11:if(n.uint64Data&&n.uint64Data.length||(n.uint64Data=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.uint64Data.push(e.uint64());else n.uint64Data.push(e.uint64());break;default:e.skipType(7&i)}}return n},i.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},i.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.dims&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var t=0;t<e.dims.length;++t)if(!d.isInteger(e.dims[t])&&!(e.dims[t]&&d.isInteger(e.dims[t].low)&&d.isInteger(e.dims[t].high)))return"dims: integer|Long[] expected"}if(null!=e.dataType&&e.hasOwnProperty("dataType")&&!d.isInteger(e.dataType))return"dataType: integer expected";if(null!=e.segment&&e.hasOwnProperty("segment")){var r=p.onnx.TensorProto.Segment.verify(e.segment);if(r)return"segment."+r}if(null!=e.floatData&&e.hasOwnProperty("floatData")){if(!Array.isArray(e.floatData))return"floatData: array expected";for(var t=0;t<e.floatData.length;++t)if("number"!=typeof e.floatData[t])return"floatData: number[] expected"}if(null!=e.int32Data&&e.hasOwnProperty("int32Data")){if(!Array.isArray(e.int32Data))return"int32Data: array expected";for(var t=0;t<e.int32Data.length;++t)if(!d.isInteger(e.int32Data[t]))return"int32Data: integer[] expected"}if(null!=e.stringData&&e.hasOwnProperty("stringData")){if(!Array.isArray(e.stringData))return"stringData: array expected";for(var t=0;t<e.stringData.length;++t)if(!(e.stringData[t]&&"number"==typeof e.stringData[t].length||d.isString(e.stringData[t])))return"stringData: buffer[] expected"}if(null!=e.int64Data&&e.hasOwnProperty("int64Data")){if(!Array.isArray(e.int64Data))return"int64Data: array expected";for(var t=0;t<e.int64Data.length;++t)if(!d.isInteger(e.int64Data[t])&&!(e.int64Data[t]&&d.isInteger(e.int64Data[t].low)&&d.isInteger(e.int64Data[t].high)))return"int64Data: integer|Long[] expected"}if(null!=e.name&&e.hasOwnProperty("name")&&!d.isString(e.name))return"name: string expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString))return"docString: string expected";if(null!=e.rawData&&e.hasOwnProperty("rawData")&&!(e.rawData&&"number"==typeof e.rawData.length||d.isString(e.rawData)))return"rawData: buffer expected";if(null!=e.externalData&&e.hasOwnProperty("externalData")){if(!Array.isArray(e.externalData))return"externalData: array expected";for(var t=0;t<e.externalData.length;++t){var r=p.onnx.StringStringEntryProto.verify(e.externalData[t]);if(r)return"externalData."+r}}if(null!=e.dataLocation&&e.hasOwnProperty("dataLocation"))switch(e.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:}if(null!=e.doubleData&&e.hasOwnProperty("doubleData")){if(!Array.isArray(e.doubleData))return"doubleData: array expected";for(var t=0;t<e.doubleData.length;++t)if("number"!=typeof e.doubleData[t])return"doubleData: number[] expected"}if(null!=e.uint64Data&&e.hasOwnProperty("uint64Data")){if(!Array.isArray(e.uint64Data))return"uint64Data: array expected";for(var t=0;t<e.uint64Data.length;++t)if(!d.isInteger(e.uint64Data[t])&&!(e.uint64Data[t]&&d.isInteger(e.uint64Data[t].low)&&d.isInteger(e.uint64Data[t].high)))return"uint64Data: integer|Long[] expected"}return null},i.fromObject=function(e){if(e instanceof p.onnx.TensorProto)return e;var t=new p.onnx.TensorProto;if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.TensorProto.dims: array expected");t.dims=[];for(var r=0;r<e.dims.length;++r)d.Long?(t.dims[r]=d.Long.fromValue(e.dims[r])).unsigned=!1:"string"==typeof e.dims[r]?t.dims[r]=parseInt(e.dims[r],10):"number"==typeof e.dims[r]?t.dims[r]=e.dims[r]:"object"==typeof e.dims[r]&&(t.dims[r]=new d.LongBits(e.dims[r].low>>>0,e.dims[r].high>>>0).toNumber())}if(null!=e.dataType&&(t.dataType=0|e.dataType),null!=e.segment){if("object"!=typeof e.segment)throw TypeError(".onnx.TensorProto.segment: object expected");t.segment=p.onnx.TensorProto.Segment.fromObject(e.segment)}if(e.floatData){if(!Array.isArray(e.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");t.floatData=[];for(var r=0;r<e.floatData.length;++r)t.floatData[r]=Number(e.floatData[r])}if(e.int32Data){if(!Array.isArray(e.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");t.int32Data=[];for(var r=0;r<e.int32Data.length;++r)t.int32Data[r]=0|e.int32Data[r]}if(e.stringData){if(!Array.isArray(e.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");t.stringData=[];for(var r=0;r<e.stringData.length;++r)"string"==typeof e.stringData[r]?d.base64.decode(e.stringData[r],t.stringData[r]=d.newBuffer(d.base64.length(e.stringData[r])),0):e.stringData[r].length>=0&&(t.stringData[r]=e.stringData[r])}if(e.int64Data){if(!Array.isArray(e.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");t.int64Data=[];for(var r=0;r<e.int64Data.length;++r)d.Long?(t.int64Data[r]=d.Long.fromValue(e.int64Data[r])).unsigned=!1:"string"==typeof e.int64Data[r]?t.int64Data[r]=parseInt(e.int64Data[r],10):"number"==typeof e.int64Data[r]?t.int64Data[r]=e.int64Data[r]:"object"==typeof e.int64Data[r]&&(t.int64Data[r]=new d.LongBits(e.int64Data[r].low>>>0,e.int64Data[r].high>>>0).toNumber())}if(null!=e.name&&(t.name=String(e.name)),null!=e.docString&&(t.docString=String(e.docString)),null!=e.rawData&&("string"==typeof e.rawData?d.base64.decode(e.rawData,t.rawData=d.newBuffer(d.base64.length(e.rawData)),0):e.rawData.length>=0&&(t.rawData=e.rawData)),e.externalData){if(!Array.isArray(e.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");t.externalData=[];for(var r=0;r<e.externalData.length;++r){if("object"!=typeof e.externalData[r])throw TypeError(".onnx.TensorProto.externalData: object expected");t.externalData[r]=p.onnx.StringStringEntryProto.fromObject(e.externalData[r])}}switch(e.dataLocation){default:"number"==typeof e.dataLocation&&(t.dataLocation=e.dataLocation);break;case"DEFAULT":case 0:t.dataLocation=0;break;case"EXTERNAL":case 1:t.dataLocation=1}if(e.doubleData){if(!Array.isArray(e.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");t.doubleData=[];for(var r=0;r<e.doubleData.length;++r)t.doubleData[r]=Number(e.doubleData[r])}if(e.uint64Data){if(!Array.isArray(e.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");t.uint64Data=[];for(var r=0;r<e.uint64Data.length;++r)d.Long?(t.uint64Data[r]=d.Long.fromValue(e.uint64Data[r])).unsigned=!0:"string"==typeof e.uint64Data[r]?t.uint64Data[r]=parseInt(e.uint64Data[r],10):"number"==typeof e.uint64Data[r]?t.uint64Data[r]=e.uint64Data[r]:"object"==typeof e.uint64Data[r]&&(t.uint64Data[r]=new d.LongBits(e.uint64Data[r].low>>>0,e.uint64Data[r].high>>>0).toNumber(!0))}return t},i.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.dims=[],r.floatData=[],r.int32Data=[],r.stringData=[],r.int64Data=[],r.doubleData=[],r.uint64Data=[],r.externalData=[]),t.defaults&&(r.dataType=0,r.segment=null,r.name="",t.bytes===String?r.rawData="":(r.rawData=[],t.bytes!==Array&&(r.rawData=d.newBuffer(r.rawData))),r.docString="",r.dataLocation=t.enums===String?"DEFAULT":0),e.dims&&e.dims.length){r.dims=[];for(var n=0;n<e.dims.length;++n)"number"==typeof e.dims[n]?r.dims[n]=t.longs===String?String(e.dims[n]):e.dims[n]:r.dims[n]=t.longs===String?d.Long.prototype.toString.call(e.dims[n]):t.longs===Number?new d.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber():e.dims[n]}if(null!=e.dataType&&e.hasOwnProperty("dataType")&&(r.dataType=e.dataType),null!=e.segment&&e.hasOwnProperty("segment")&&(r.segment=p.onnx.TensorProto.Segment.toObject(e.segment,t)),e.floatData&&e.floatData.length){r.floatData=[];for(var n=0;n<e.floatData.length;++n)r.floatData[n]=t.json&&!isFinite(e.floatData[n])?String(e.floatData[n]):e.floatData[n]}if(e.int32Data&&e.int32Data.length){r.int32Data=[];for(var n=0;n<e.int32Data.length;++n)r.int32Data[n]=e.int32Data[n]}if(e.stringData&&e.stringData.length){r.stringData=[];for(var n=0;n<e.stringData.length;++n)r.stringData[n]=t.bytes===String?d.base64.encode(e.stringData[n],0,e.stringData[n].length):t.bytes===Array?Array.prototype.slice.call(e.stringData[n]):e.stringData[n]}if(e.int64Data&&e.int64Data.length){r.int64Data=[];for(var n=0;n<e.int64Data.length;++n)"number"==typeof e.int64Data[n]?r.int64Data[n]=t.longs===String?String(e.int64Data[n]):e.int64Data[n]:r.int64Data[n]=t.longs===String?d.Long.prototype.toString.call(e.int64Data[n]):t.longs===Number?new d.LongBits(e.int64Data[n].low>>>0,e.int64Data[n].high>>>0).toNumber():e.int64Data[n]}if(null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),null!=e.rawData&&e.hasOwnProperty("rawData")&&(r.rawData=t.bytes===String?d.base64.encode(e.rawData,0,e.rawData.length):t.bytes===Array?Array.prototype.slice.call(e.rawData):e.rawData),e.doubleData&&e.doubleData.length){r.doubleData=[];for(var n=0;n<e.doubleData.length;++n)r.doubleData[n]=t.json&&!isFinite(e.doubleData[n])?String(e.doubleData[n]):e.doubleData[n]}if(e.uint64Data&&e.uint64Data.length){r.uint64Data=[];for(var n=0;n<e.uint64Data.length;++n)"number"==typeof e.uint64Data[n]?r.uint64Data[n]=t.longs===String?String(e.uint64Data[n]):e.uint64Data[n]:r.uint64Data[n]=t.longs===String?d.Long.prototype.toString.call(e.uint64Data[n]):t.longs===Number?new d.LongBits(e.uint64Data[n].low>>>0,e.uint64Data[n].high>>>0).toNumber(!0):e.uint64Data[n]}if(null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),e.externalData&&e.externalData.length){r.externalData=[];for(var n=0;n<e.externalData.length;++n)r.externalData[n]=p.onnx.StringStringEntryProto.toObject(e.externalData[n],t)}return null!=e.dataLocation&&e.hasOwnProperty("dataLocation")&&(r.dataLocation=t.enums===String?void 0===p.onnx.TensorProto.DataLocation[e.dataLocation]?e.dataLocation:p.onnx.TensorProto.DataLocation[e.dataLocation]:e.dataLocation),r},i.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},i.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorProto"},(t=Object.create(e={}))[e[0]="UNDEFINED"]=0,t[e[1]="FLOAT"]=1,t[e[2]="UINT8"]=2,t[e[3]="INT8"]=3,t[e[4]="UINT16"]=4,t[e[5]="INT16"]=5,t[e[6]="INT32"]=6,t[e[7]="INT64"]=7,t[e[8]="STRING"]=8,t[e[9]="BOOL"]=9,t[e[10]="FLOAT16"]=10,t[e[11]="DOUBLE"]=11,t[e[12]="UINT32"]=12,t[e[13]="UINT64"]=13,t[e[14]="COMPLEX64"]=14,t[e[15]="COMPLEX128"]=15,t[e[16]="BFLOAT16"]=16,t[e[17]="FLOAT8E4M3FN"]=17,t[e[18]="FLOAT8E4M3FNUZ"]=18,t[e[19]="FLOAT8E5M2"]=19,t[e[20]="FLOAT8E5M2FNUZ"]=20,i.DataType=t,i.Segment=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.begin=d.Long?d.Long.fromBits(0,0,!1):0,e.prototype.end=d.Long?d.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.begin&&Object.hasOwnProperty.call(e,"begin")&&t.uint32(8).int64(e.begin),null!=e.end&&Object.hasOwnProperty.call(e,"end")&&t.uint32(16).int64(e.end),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TensorProto.Segment;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.begin=e.int64();break;case 2:n.end=e.int64();break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.begin&&e.hasOwnProperty("begin")&&!d.isInteger(e.begin)&&!(e.begin&&d.isInteger(e.begin.low)&&d.isInteger(e.begin.high))?"begin: integer|Long expected":null!=e.end&&e.hasOwnProperty("end")&&!d.isInteger(e.end)&&!(e.end&&d.isInteger(e.end.low)&&d.isInteger(e.end.high))?"end: integer|Long expected":null},e.fromObject=function(e){if(e instanceof p.onnx.TensorProto.Segment)return e;var t=new p.onnx.TensorProto.Segment;return null!=e.begin&&(d.Long?(t.begin=d.Long.fromValue(e.begin)).unsigned=!1:"string"==typeof e.begin?t.begin=parseInt(e.begin,10):"number"==typeof e.begin?t.begin=e.begin:"object"==typeof e.begin&&(t.begin=new d.LongBits(e.begin.low>>>0,e.begin.high>>>0).toNumber())),null!=e.end&&(d.Long?(t.end=d.Long.fromValue(e.end)).unsigned=!1:"string"==typeof e.end?t.end=parseInt(e.end,10):"number"==typeof e.end?t.end=e.end:"object"==typeof e.end&&(t.end=new d.LongBits(e.end.low>>>0,e.end.high>>>0).toNumber())),t},e.toObject=function(e,t){t||(t={});var r={};if(t.defaults){if(d.Long){var n=new d.Long(0,0,!1);r.begin=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.begin=t.longs===String?"0":0;if(d.Long){var n=new d.Long(0,0,!1);r.end=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.end=t.longs===String?"0":0}return null!=e.begin&&e.hasOwnProperty("begin")&&("number"==typeof e.begin?r.begin=t.longs===String?String(e.begin):e.begin:r.begin=t.longs===String?d.Long.prototype.toString.call(e.begin):t.longs===Number?new d.LongBits(e.begin.low>>>0,e.begin.high>>>0).toNumber():e.begin),null!=e.end&&e.hasOwnProperty("end")&&("number"==typeof e.end?r.end=t.longs===String?String(e.end):e.end:r.end=t.longs===String?d.Long.prototype.toString.call(e.end):t.longs===Number?new d.LongBits(e.end.low>>>0,e.end.high>>>0).toNumber():e.end),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorProto.Segment"},e}(),(n=Object.create(r={}))[r[0]="DEFAULT"]=0,n[r[1]="EXTERNAL"]=1,i.DataLocation=n,i}(),r.SparseTensorProto=function(){function e(e){if(this.dims=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=d.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.values&&Object.hasOwnProperty.call(e,"values")&&p.onnx.TensorProto.encode(e.values,t.uint32(10).fork()).ldelim(),null!=e.indices&&Object.hasOwnProperty.call(e,"indices")&&p.onnx.TensorProto.encode(e.indices,t.uint32(18).fork()).ldelim(),null!=e.dims&&e.dims.length){t.uint32(26).fork();for(var r=0;r<e.dims.length;++r)t.int64(e.dims[r]);t.ldelim()}return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.SparseTensorProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.values=p.onnx.TensorProto.decode(e,e.uint32());break;case 2:n.indices=p.onnx.TensorProto.decode(e,e.uint32());break;case 3:if(n.dims&&n.dims.length||(n.dims=[]),(7&i)==2)for(var o=e.uint32()+e.pos;e.pos<o;)n.dims.push(e.int64());else n.dims.push(e.int64());break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.values&&e.hasOwnProperty("values")){var t=p.onnx.TensorProto.verify(e.values);if(t)return"values."+t}if(null!=e.indices&&e.hasOwnProperty("indices")){var t=p.onnx.TensorProto.verify(e.indices);if(t)return"indices."+t}if(null!=e.dims&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var r=0;r<e.dims.length;++r)if(!d.isInteger(e.dims[r])&&!(e.dims[r]&&d.isInteger(e.dims[r].low)&&d.isInteger(e.dims[r].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(e){if(e instanceof p.onnx.SparseTensorProto)return e;var t=new p.onnx.SparseTensorProto;if(null!=e.values){if("object"!=typeof e.values)throw TypeError(".onnx.SparseTensorProto.values: object expected");t.values=p.onnx.TensorProto.fromObject(e.values)}if(null!=e.indices){if("object"!=typeof e.indices)throw TypeError(".onnx.SparseTensorProto.indices: object expected");t.indices=p.onnx.TensorProto.fromObject(e.indices)}if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");t.dims=[];for(var r=0;r<e.dims.length;++r)d.Long?(t.dims[r]=d.Long.fromValue(e.dims[r])).unsigned=!1:"string"==typeof e.dims[r]?t.dims[r]=parseInt(e.dims[r],10):"number"==typeof e.dims[r]?t.dims[r]=e.dims[r]:"object"==typeof e.dims[r]&&(t.dims[r]=new d.LongBits(e.dims[r].low>>>0,e.dims[r].high>>>0).toNumber())}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.dims=[]),t.defaults&&(r.values=null,r.indices=null),null!=e.values&&e.hasOwnProperty("values")&&(r.values=p.onnx.TensorProto.toObject(e.values,t)),null!=e.indices&&e.hasOwnProperty("indices")&&(r.indices=p.onnx.TensorProto.toObject(e.indices,t)),e.dims&&e.dims.length){r.dims=[];for(var n=0;n<e.dims.length;++n)"number"==typeof e.dims[n]?r.dims[n]=t.longs===String?String(e.dims[n]):e.dims[n]:r.dims[n]=t.longs===String?d.Long.prototype.toString.call(e.dims[n]):t.longs===Number?new d.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber():e.dims[n]}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.SparseTensorProto"},e}(),r.TensorShapeProto=function(){function e(e){if(this.dim=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.dim=d.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.dim&&e.dim.length)for(var r=0;r<e.dim.length;++r)p.onnx.TensorShapeProto.Dimension.encode(e.dim[r],t.uint32(10).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TensorShapeProto;e.pos<r;){var i=e.uint32();i>>>3==1?(n.dim&&n.dim.length||(n.dim=[]),n.dim.push(p.onnx.TensorShapeProto.Dimension.decode(e,e.uint32()))):e.skipType(7&i)}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.dim&&e.hasOwnProperty("dim")){if(!Array.isArray(e.dim))return"dim: array expected";for(var t=0;t<e.dim.length;++t){var r=p.onnx.TensorShapeProto.Dimension.verify(e.dim[t]);if(r)return"dim."+r}}return null},e.fromObject=function(e){if(e instanceof p.onnx.TensorShapeProto)return e;var t=new p.onnx.TensorShapeProto;if(e.dim){if(!Array.isArray(e.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");t.dim=[];for(var r=0;r<e.dim.length;++r){if("object"!=typeof e.dim[r])throw TypeError(".onnx.TensorShapeProto.dim: object expected");t.dim[r]=p.onnx.TensorShapeProto.Dimension.fromObject(e.dim[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.dim=[]),e.dim&&e.dim.length){r.dim=[];for(var n=0;n<e.dim.length;++n)r.dim[n]=p.onnx.TensorShapeProto.Dimension.toObject(e.dim[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorShapeProto"},e.Dimension=function(){var e;function t(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return t.prototype.dimValue=null,t.prototype.dimParam=null,t.prototype.denotation="",Object.defineProperty(t.prototype,"value",{get:d.oneOfGetter(e=["dimValue","dimParam"]),set:d.oneOfSetter(e)}),t.create=function(e){return new t(e)},t.encode=function(e,t){return t||(t=l.create()),null!=e.dimValue&&Object.hasOwnProperty.call(e,"dimValue")&&t.uint32(8).int64(e.dimValue),null!=e.dimParam&&Object.hasOwnProperty.call(e,"dimParam")&&t.uint32(18).string(e.dimParam),null!=e.denotation&&Object.hasOwnProperty.call(e,"denotation")&&t.uint32(26).string(e.denotation),t},t.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},t.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TensorShapeProto.Dimension;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.dimValue=e.int64();break;case 2:n.dimParam=e.string();break;case 3:n.denotation=e.string();break;default:e.skipType(7&i)}}return n},t.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},t.verify=function(e){if("object"!=typeof e||null===e)return"object expected";var t={};if(null!=e.dimValue&&e.hasOwnProperty("dimValue")&&(t.value=1,!d.isInteger(e.dimValue)&&!(e.dimValue&&d.isInteger(e.dimValue.low)&&d.isInteger(e.dimValue.high))))return"dimValue: integer|Long expected";if(null!=e.dimParam&&e.hasOwnProperty("dimParam")){if(1===t.value)return"value: multiple values";if(t.value=1,!d.isString(e.dimParam))return"dimParam: string expected"}return null!=e.denotation&&e.hasOwnProperty("denotation")&&!d.isString(e.denotation)?"denotation: string expected":null},t.fromObject=function(e){if(e instanceof p.onnx.TensorShapeProto.Dimension)return e;var t=new p.onnx.TensorShapeProto.Dimension;return null!=e.dimValue&&(d.Long?(t.dimValue=d.Long.fromValue(e.dimValue)).unsigned=!1:"string"==typeof e.dimValue?t.dimValue=parseInt(e.dimValue,10):"number"==typeof e.dimValue?t.dimValue=e.dimValue:"object"==typeof e.dimValue&&(t.dimValue=new d.LongBits(e.dimValue.low>>>0,e.dimValue.high>>>0).toNumber())),null!=e.dimParam&&(t.dimParam=String(e.dimParam)),null!=e.denotation&&(t.denotation=String(e.denotation)),t},t.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.denotation=""),null!=e.dimValue&&e.hasOwnProperty("dimValue")&&("number"==typeof e.dimValue?r.dimValue=t.longs===String?String(e.dimValue):e.dimValue:r.dimValue=t.longs===String?d.Long.prototype.toString.call(e.dimValue):t.longs===Number?new d.LongBits(e.dimValue.low>>>0,e.dimValue.high>>>0).toNumber():e.dimValue,t.oneofs&&(r.value="dimValue")),null!=e.dimParam&&e.hasOwnProperty("dimParam")&&(r.dimParam=e.dimParam,t.oneofs&&(r.value="dimParam")),null!=e.denotation&&e.hasOwnProperty("denotation")&&(r.denotation=e.denotation),r},t.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},t.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorShapeProto.Dimension"},t}(),e}(),r.TypeProto=function(){var e;function t(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return t.prototype.tensorType=null,t.prototype.sequenceType=null,t.prototype.mapType=null,t.prototype.optionalType=null,t.prototype.sparseTensorType=null,t.prototype.denotation="",Object.defineProperty(t.prototype,"value",{get:d.oneOfGetter(e=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:d.oneOfSetter(e)}),t.create=function(e){return new t(e)},t.encode=function(e,t){return t||(t=l.create()),null!=e.tensorType&&Object.hasOwnProperty.call(e,"tensorType")&&p.onnx.TypeProto.Tensor.encode(e.tensorType,t.uint32(10).fork()).ldelim(),null!=e.sequenceType&&Object.hasOwnProperty.call(e,"sequenceType")&&p.onnx.TypeProto.Sequence.encode(e.sequenceType,t.uint32(34).fork()).ldelim(),null!=e.mapType&&Object.hasOwnProperty.call(e,"mapType")&&p.onnx.TypeProto.Map.encode(e.mapType,t.uint32(42).fork()).ldelim(),null!=e.denotation&&Object.hasOwnProperty.call(e,"denotation")&&t.uint32(50).string(e.denotation),null!=e.sparseTensorType&&Object.hasOwnProperty.call(e,"sparseTensorType")&&p.onnx.TypeProto.SparseTensor.encode(e.sparseTensorType,t.uint32(66).fork()).ldelim(),null!=e.optionalType&&Object.hasOwnProperty.call(e,"optionalType")&&p.onnx.TypeProto.Optional.encode(e.optionalType,t.uint32(74).fork()).ldelim(),t},t.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},t.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TypeProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.tensorType=p.onnx.TypeProto.Tensor.decode(e,e.uint32());break;case 4:n.sequenceType=p.onnx.TypeProto.Sequence.decode(e,e.uint32());break;case 5:n.mapType=p.onnx.TypeProto.Map.decode(e,e.uint32());break;case 9:n.optionalType=p.onnx.TypeProto.Optional.decode(e,e.uint32());break;case 8:n.sparseTensorType=p.onnx.TypeProto.SparseTensor.decode(e,e.uint32());break;case 6:n.denotation=e.string();break;default:e.skipType(7&i)}}return n},t.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},t.verify=function(e){if("object"!=typeof e||null===e)return"object expected";var t={};if(null!=e.tensorType&&e.hasOwnProperty("tensorType")){t.value=1;var r=p.onnx.TypeProto.Tensor.verify(e.tensorType);if(r)return"tensorType."+r}if(null!=e.sequenceType&&e.hasOwnProperty("sequenceType")){if(1===t.value)return"value: multiple values";t.value=1;var r=p.onnx.TypeProto.Sequence.verify(e.sequenceType);if(r)return"sequenceType."+r}if(null!=e.mapType&&e.hasOwnProperty("mapType")){if(1===t.value)return"value: multiple values";t.value=1;var r=p.onnx.TypeProto.Map.verify(e.mapType);if(r)return"mapType."+r}if(null!=e.optionalType&&e.hasOwnProperty("optionalType")){if(1===t.value)return"value: multiple values";t.value=1;var r=p.onnx.TypeProto.Optional.verify(e.optionalType);if(r)return"optionalType."+r}if(null!=e.sparseTensorType&&e.hasOwnProperty("sparseTensorType")){if(1===t.value)return"value: multiple values";t.value=1;var r=p.onnx.TypeProto.SparseTensor.verify(e.sparseTensorType);if(r)return"sparseTensorType."+r}return null!=e.denotation&&e.hasOwnProperty("denotation")&&!d.isString(e.denotation)?"denotation: string expected":null},t.fromObject=function(e){if(e instanceof p.onnx.TypeProto)return e;var t=new p.onnx.TypeProto;if(null!=e.tensorType){if("object"!=typeof e.tensorType)throw TypeError(".onnx.TypeProto.tensorType: object expected");t.tensorType=p.onnx.TypeProto.Tensor.fromObject(e.tensorType)}if(null!=e.sequenceType){if("object"!=typeof e.sequenceType)throw TypeError(".onnx.TypeProto.sequenceType: object expected");t.sequenceType=p.onnx.TypeProto.Sequence.fromObject(e.sequenceType)}if(null!=e.mapType){if("object"!=typeof e.mapType)throw TypeError(".onnx.TypeProto.mapType: object expected");t.mapType=p.onnx.TypeProto.Map.fromObject(e.mapType)}if(null!=e.optionalType){if("object"!=typeof e.optionalType)throw TypeError(".onnx.TypeProto.optionalType: object expected");t.optionalType=p.onnx.TypeProto.Optional.fromObject(e.optionalType)}if(null!=e.sparseTensorType){if("object"!=typeof e.sparseTensorType)throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");t.sparseTensorType=p.onnx.TypeProto.SparseTensor.fromObject(e.sparseTensorType)}return null!=e.denotation&&(t.denotation=String(e.denotation)),t},t.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.denotation=""),null!=e.tensorType&&e.hasOwnProperty("tensorType")&&(r.tensorType=p.onnx.TypeProto.Tensor.toObject(e.tensorType,t),t.oneofs&&(r.value="tensorType")),null!=e.sequenceType&&e.hasOwnProperty("sequenceType")&&(r.sequenceType=p.onnx.TypeProto.Sequence.toObject(e.sequenceType,t),t.oneofs&&(r.value="sequenceType")),null!=e.mapType&&e.hasOwnProperty("mapType")&&(r.mapType=p.onnx.TypeProto.Map.toObject(e.mapType,t),t.oneofs&&(r.value="mapType")),null!=e.denotation&&e.hasOwnProperty("denotation")&&(r.denotation=e.denotation),null!=e.sparseTensorType&&e.hasOwnProperty("sparseTensorType")&&(r.sparseTensorType=p.onnx.TypeProto.SparseTensor.toObject(e.sparseTensorType,t),t.oneofs&&(r.value="sparseTensorType")),null!=e.optionalType&&e.hasOwnProperty("optionalType")&&(r.optionalType=p.onnx.TypeProto.Optional.toObject(e.optionalType,t),t.oneofs&&(r.value="optionalType")),r},t.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},t.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto"},t.Tensor=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&t.uint32(8).int32(e.elemType),null!=e.shape&&Object.hasOwnProperty.call(e,"shape")&&p.onnx.TensorShapeProto.encode(e.shape,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TypeProto.Tensor;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.elemType=e.int32();break;case 2:n.shape=p.onnx.TensorShapeProto.decode(e,e.uint32());break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")&&!d.isInteger(e.elemType))return"elemType: integer expected";if(null!=e.shape&&e.hasOwnProperty("shape")){var t=p.onnx.TensorShapeProto.verify(e.shape);if(t)return"shape."+t}return null},e.fromObject=function(e){if(e instanceof p.onnx.TypeProto.Tensor)return e;var t=new p.onnx.TypeProto.Tensor;if(null!=e.elemType&&(t.elemType=0|e.elemType),null!=e.shape){if("object"!=typeof e.shape)throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");t.shape=p.onnx.TensorShapeProto.fromObject(e.shape)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.elemType=0,r.shape=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(r.elemType=e.elemType),null!=e.shape&&e.hasOwnProperty("shape")&&(r.shape=p.onnx.TensorShapeProto.toObject(e.shape,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Tensor"},e}(),t.Sequence=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.elemType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&p.onnx.TypeProto.encode(e.elemType,t.uint32(10).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TypeProto.Sequence;e.pos<r;){var i=e.uint32();i>>>3==1?n.elemType=p.onnx.TypeProto.decode(e,e.uint32()):e.skipType(7&i)}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")){var t=p.onnx.TypeProto.verify(e.elemType);if(t)return"elemType."+t}return null},e.fromObject=function(e){if(e instanceof p.onnx.TypeProto.Sequence)return e;var t=new p.onnx.TypeProto.Sequence;if(null!=e.elemType){if("object"!=typeof e.elemType)throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");t.elemType=p.onnx.TypeProto.fromObject(e.elemType)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.elemType=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(r.elemType=p.onnx.TypeProto.toObject(e.elemType,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Sequence"},e}(),t.Map=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.keyType=0,e.prototype.valueType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.keyType&&Object.hasOwnProperty.call(e,"keyType")&&t.uint32(8).int32(e.keyType),null!=e.valueType&&Object.hasOwnProperty.call(e,"valueType")&&p.onnx.TypeProto.encode(e.valueType,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TypeProto.Map;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.keyType=e.int32();break;case 2:n.valueType=p.onnx.TypeProto.decode(e,e.uint32());break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.keyType&&e.hasOwnProperty("keyType")&&!d.isInteger(e.keyType))return"keyType: integer expected";if(null!=e.valueType&&e.hasOwnProperty("valueType")){var t=p.onnx.TypeProto.verify(e.valueType);if(t)return"valueType."+t}return null},e.fromObject=function(e){if(e instanceof p.onnx.TypeProto.Map)return e;var t=new p.onnx.TypeProto.Map;if(null!=e.keyType&&(t.keyType=0|e.keyType),null!=e.valueType){if("object"!=typeof e.valueType)throw TypeError(".onnx.TypeProto.Map.valueType: object expected");t.valueType=p.onnx.TypeProto.fromObject(e.valueType)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.keyType=0,r.valueType=null),null!=e.keyType&&e.hasOwnProperty("keyType")&&(r.keyType=e.keyType),null!=e.valueType&&e.hasOwnProperty("valueType")&&(r.valueType=p.onnx.TypeProto.toObject(e.valueType,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Map"},e}(),t.Optional=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.elemType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&p.onnx.TypeProto.encode(e.elemType,t.uint32(10).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TypeProto.Optional;e.pos<r;){var i=e.uint32();i>>>3==1?n.elemType=p.onnx.TypeProto.decode(e,e.uint32()):e.skipType(7&i)}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")){var t=p.onnx.TypeProto.verify(e.elemType);if(t)return"elemType."+t}return null},e.fromObject=function(e){if(e instanceof p.onnx.TypeProto.Optional)return e;var t=new p.onnx.TypeProto.Optional;if(null!=e.elemType){if("object"!=typeof e.elemType)throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");t.elemType=p.onnx.TypeProto.fromObject(e.elemType)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.elemType=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(r.elemType=p.onnx.TypeProto.toObject(e.elemType,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Optional"},e}(),t.SparseTensor=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&t.uint32(8).int32(e.elemType),null!=e.shape&&Object.hasOwnProperty.call(e,"shape")&&p.onnx.TensorShapeProto.encode(e.shape,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.TypeProto.SparseTensor;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.elemType=e.int32();break;case 2:n.shape=p.onnx.TensorShapeProto.decode(e,e.uint32());break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")&&!d.isInteger(e.elemType))return"elemType: integer expected";if(null!=e.shape&&e.hasOwnProperty("shape")){var t=p.onnx.TensorShapeProto.verify(e.shape);if(t)return"shape."+t}return null},e.fromObject=function(e){if(e instanceof p.onnx.TypeProto.SparseTensor)return e;var t=new p.onnx.TypeProto.SparseTensor;if(null!=e.elemType&&(t.elemType=0|e.elemType),null!=e.shape){if("object"!=typeof e.shape)throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");t.shape=p.onnx.TensorShapeProto.fromObject(e.shape)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.elemType=0,r.shape=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(r.elemType=e.elemType),null!=e.shape&&e.hasOwnProperty("shape")&&(r.shape=p.onnx.TensorShapeProto.toObject(e.shape,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.SparseTensor"},e}(),t}(),r.OperatorSetIdProto=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.domain="",e.prototype.version=d.Long?d.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=l.create()),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(10).string(e.domain),null!=e.version&&Object.hasOwnProperty.call(e,"version")&&t.uint32(16).int64(e.version),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.OperatorSetIdProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.domain=e.string();break;case 2:n.version=e.int64();break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.domain&&e.hasOwnProperty("domain")&&!d.isString(e.domain)?"domain: string expected":null!=e.version&&e.hasOwnProperty("version")&&!d.isInteger(e.version)&&!(e.version&&d.isInteger(e.version.low)&&d.isInteger(e.version.high))?"version: integer|Long expected":null},e.fromObject=function(e){if(e instanceof p.onnx.OperatorSetIdProto)return e;var t=new p.onnx.OperatorSetIdProto;return null!=e.domain&&(t.domain=String(e.domain)),null!=e.version&&(d.Long?(t.version=d.Long.fromValue(e.version)).unsigned=!1:"string"==typeof e.version?t.version=parseInt(e.version,10):"number"==typeof e.version?t.version=e.version:"object"==typeof e.version&&(t.version=new d.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber())),t},e.toObject=function(e,t){t||(t={});var r={};if(t.defaults)if(r.domain="",d.Long){var n=new d.Long(0,0,!1);r.version=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.version=t.longs===String?"0":0;return null!=e.domain&&e.hasOwnProperty("domain")&&(r.domain=e.domain),null!=e.version&&e.hasOwnProperty("version")&&("number"==typeof e.version?r.version=t.longs===String?String(e.version):e.version:r.version=t.longs===String?d.Long.prototype.toString.call(e.version):t.longs===Number?new d.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber():e.version),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.OperatorSetIdProto"},e}(),(a=Object.create(o={}))[o[0]="EXPERIMENTAL"]=0,a[o[1]="STABLE"]=1,r.OperatorStatus=a,r.FunctionProto=function(){function e(e){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.name="",e.prototype.input=d.emptyArray,e.prototype.output=d.emptyArray,e.prototype.attribute=d.emptyArray,e.prototype.attributeProto=d.emptyArray,e.prototype.node=d.emptyArray,e.prototype.docString="",e.prototype.opsetImport=d.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=l.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.input&&e.input.length)for(var r=0;r<e.input.length;++r)t.uint32(34).string(e.input[r]);if(null!=e.output&&e.output.length)for(var r=0;r<e.output.length;++r)t.uint32(42).string(e.output[r]);if(null!=e.attribute&&e.attribute.length)for(var r=0;r<e.attribute.length;++r)t.uint32(50).string(e.attribute[r]);if(null!=e.node&&e.node.length)for(var r=0;r<e.node.length;++r)p.onnx.NodeProto.encode(e.node[r],t.uint32(58).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(66).string(e.docString),null!=e.opsetImport&&e.opsetImport.length)for(var r=0;r<e.opsetImport.length;++r)p.onnx.OperatorSetIdProto.encode(e.opsetImport[r],t.uint32(74).fork()).ldelim();if(null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(82).string(e.domain),null!=e.attributeProto&&e.attributeProto.length)for(var r=0;r<e.attributeProto.length;++r)p.onnx.AttributeProto.encode(e.attributeProto[r],t.uint32(90).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof u||(e=u.create(e));for(var r=void 0===t?e.len:e.pos+t,n=new p.onnx.FunctionProto;e.pos<r;){var i=e.uint32();switch(i>>>3){case 1:n.name=e.string();break;case 4:n.input&&n.input.length||(n.input=[]),n.input.push(e.string());break;case 5:n.output&&n.output.length||(n.output=[]),n.output.push(e.string());break;case 6:n.attribute&&n.attribute.length||(n.attribute=[]),n.attribute.push(e.string());break;case 11:n.attributeProto&&n.attributeProto.length||(n.attributeProto=[]),n.attributeProto.push(p.onnx.AttributeProto.decode(e,e.uint32()));break;case 7:n.node&&n.node.length||(n.node=[]),n.node.push(p.onnx.NodeProto.decode(e,e.uint32()));break;case 8:n.docString=e.string();break;case 9:n.opsetImport&&n.opsetImport.length||(n.opsetImport=[]),n.opsetImport.push(p.onnx.OperatorSetIdProto.decode(e,e.uint32()));break;case 10:n.domain=e.string();break;default:e.skipType(7&i)}}return n},e.decodeDelimited=function(e){return e instanceof u||(e=new u(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!d.isString(e.name))return"name: string expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t)if(!d.isString(e.input[t]))return"input: string[] expected"}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t)if(!d.isString(e.output[t]))return"output: string[] expected"}if(null!=e.attribute&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var t=0;t<e.attribute.length;++t)if(!d.isString(e.attribute[t]))return"attribute: string[] expected"}if(null!=e.attributeProto&&e.hasOwnProperty("attributeProto")){if(!Array.isArray(e.attributeProto))return"attributeProto: array expected";for(var t=0;t<e.attributeProto.length;++t){var r=p.onnx.AttributeProto.verify(e.attributeProto[t]);if(r)return"attributeProto."+r}}if(null!=e.node&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var t=0;t<e.node.length;++t){var r=p.onnx.NodeProto.verify(e.node[t]);if(r)return"node."+r}}if(null!=e.docString&&e.hasOwnProperty("docString")&&!d.isString(e.docString))return"docString: string expected";if(null!=e.opsetImport&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var t=0;t<e.opsetImport.length;++t){var r=p.onnx.OperatorSetIdProto.verify(e.opsetImport[t]);if(r)return"opsetImport."+r}}return null!=e.domain&&e.hasOwnProperty("domain")&&!d.isString(e.domain)?"domain: string expected":null},e.fromObject=function(e){if(e instanceof p.onnx.FunctionProto)return e;var t=new p.onnx.FunctionProto;if(null!=e.name&&(t.name=String(e.name)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.FunctionProto.input: array expected");t.input=[];for(var r=0;r<e.input.length;++r)t.input[r]=String(e.input[r])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.FunctionProto.output: array expected");t.output=[];for(var r=0;r<e.output.length;++r)t.output[r]=String(e.output[r])}if(e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");t.attribute=[];for(var r=0;r<e.attribute.length;++r)t.attribute[r]=String(e.attribute[r])}if(e.attributeProto){if(!Array.isArray(e.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");t.attributeProto=[];for(var r=0;r<e.attributeProto.length;++r){if("object"!=typeof e.attributeProto[r])throw TypeError(".onnx.FunctionProto.attributeProto: object expected");t.attributeProto[r]=p.onnx.AttributeProto.fromObject(e.attributeProto[r])}}if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.FunctionProto.node: array expected");t.node=[];for(var r=0;r<e.node.length;++r){if("object"!=typeof e.node[r])throw TypeError(".onnx.FunctionProto.node: object expected");t.node[r]=p.onnx.NodeProto.fromObject(e.node[r])}}if(null!=e.docString&&(t.docString=String(e.docString)),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");t.opsetImport=[];for(var r=0;r<e.opsetImport.length;++r){if("object"!=typeof e.opsetImport[r])throw TypeError(".onnx.FunctionProto.opsetImport: object expected");t.opsetImport[r]=p.onnx.OperatorSetIdProto.fromObject(e.opsetImport[r])}}return null!=e.domain&&(t.domain=String(e.domain)),t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.input=[],r.output=[],r.attribute=[],r.node=[],r.opsetImport=[],r.attributeProto=[]),t.defaults&&(r.name="",r.docString="",r.domain=""),null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),e.input&&e.input.length){r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=e.input[n]}if(e.output&&e.output.length){r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=e.output[n]}if(e.attribute&&e.attribute.length){r.attribute=[];for(var n=0;n<e.attribute.length;++n)r.attribute[n]=e.attribute[n]}if(e.node&&e.node.length){r.node=[];for(var n=0;n<e.node.length;++n)r.node[n]=p.onnx.NodeProto.toObject(e.node[n],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),e.opsetImport&&e.opsetImport.length){r.opsetImport=[];for(var n=0;n<e.opsetImport.length;++n)r.opsetImport[n]=p.onnx.OperatorSetIdProto.toObject(e.opsetImport[n],t)}if(null!=e.domain&&e.hasOwnProperty("domain")&&(r.domain=e.domain),e.attributeProto&&e.attributeProto.length){r.attributeProto=[];for(var n=0;n<e.attributeProto.length;++n)r.attributeProto[n]=p.onnx.AttributeProto.toObject(e.attributeProto[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,s.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.FunctionProto"},e}(),p.onnx=r,t.exports=p});function rs(e,t){if(!e)throw Error("string"==typeof t?t:t())}function ru(e){return new TextDecoder().decode(e)}var rl,rd,rp,rc,rh,rf,rm,rg,rb,ry,r_,rv,rx=G(()=>{"use strict";to(),rl=X(ra()),rA(),rd=class{static arraysEqual(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}},rp=class{static preprocessInputShapes(e,t){return[1===e.length?[1,e[0]]:e,1===t.length?[t[0],1]:t]}static postprocessOutputShape(e,t,r){1===t&&e.splice(e.length-2,1),1===r&&e.pop()}static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},rc=class e{static calcShape(e,t,r=!1){let n=e.length,i=t.length;if(0===n)return t;if(0===i)return e;let o=Math.max(e.length,t.length),a=Array(o);if(r){if(n<2||i<2)return;let r=rp.calcMatMulShape([e[n-2],e[n-1]],[t[i-2],t[i-1]]);if(void 0===r)return;[a[o-2],a[o-1]]=r}for(let s=r?3:1;s<=o;s++){let r=n-s<0?1:e[n-s],u=i-s<0?1:t[i-s];if(r!==u&&r>1&&u>1)return;a[o-s]=Math.max(r,u)}return a}static index(t,r){let n=Array(r.length);return e.fillIndex(t,r,n),n}static fillIndex(e,t,r){let n=e.length-t.length;for(let i=0;i<t.length;i++)r[i]=e[n+i]%t[i]}static calc(t,r,n,i,o){let a=e.calcShape(t.dims,r.dims);if(a){if(i&&!rg.areEqual(a,t.dims))return;let s=rg.size(a),u=i?t:new rE(a,o||t.type);if(0===a.length)u.set([],n(t.get([]),r.get([])));else{let i,o=Array(a.length),l=Array(t.dims.length),d=Array(r.dims.length),p=0,c=0,h=!1,f=!1;0===t.dims.length&&(p=t.get([]),h=!0),0===r.dims.length&&(c=r.get([]),f=!0);for(let m=0;m<s;m++){i=m;for(let e=a.length-1;e>=0;e--)o[e]=i%a[e],i=Math.floor(i/a[e]);h||(e.fillIndex(o,t.dims,l),p=t.get(l)),f||(e.fillIndex(o,r.dims,d),c=r.get(d)),u.set(o,n(p,c))}}return u}}static isValidBroadcast(e,t){let r=e.length,n=t.length;if(r>n)return!1;for(let i=1;i<=r;i++)if(1!==e[r-i]&&e[r-i]!==t[n-i])return!1;return!0}static getBroadcastDims(e,t){let r=e.length,n=[];for(let i=0;i<r;i++){let o=r-1-i,a=e[o]||1;(t[t.length-1-i]||1)>1&&1===a&&n.unshift(o)}return n}},rh=class{static getShapeOfGemmResult(e,t,r,n,i){let o,a,s;if(2!==e.length||2!==r.length)throw Error("shape need to be of size 2");t?(o=e[1],a=e[0]):(o=e[0],a=e[1]);let u=-1;if(n?(s=r[0],u=1):(s=r[1],u=0),r[u]!==a)throw Error("dimension mismatch");if(o<=0||s<=0||a<=0)throw Error("invalid shape specified");if(i&&!rc.isValidBroadcast(i,[o,s]))throw Error("gemm: invalid bias shape for broadcast");return[o,s,a]}},rf=class e{static tensorDataTypeFromProto(e){switch(e){case rl.onnx.TensorProto.DataType.INT8:return"int8";case rl.onnx.TensorProto.DataType.UINT8:return"uint8";case rl.onnx.TensorProto.DataType.BOOL:return"bool";case rl.onnx.TensorProto.DataType.INT16:return"int16";case rl.onnx.TensorProto.DataType.UINT16:return"uint16";case rl.onnx.TensorProto.DataType.INT32:return"int32";case rl.onnx.TensorProto.DataType.UINT32:return"uint32";case rl.onnx.TensorProto.DataType.FLOAT:return"float32";case rl.onnx.TensorProto.DataType.DOUBLE:return"float64";case rl.onnx.TensorProto.DataType.STRING:return"string";case rl.onnx.TensorProto.DataType.INT64:return"int32";case rl.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw Error(`unsupported data type: ${rl.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return rl.onnx.TensorProto.DataType.INT8;case"uint8":return rl.onnx.TensorProto.DataType.UINT8;case"bool":return rl.onnx.TensorProto.DataType.BOOL;case"int16":return rl.onnx.TensorProto.DataType.INT16;case"uint16":return rl.onnx.TensorProto.DataType.UINT16;case"int32":return rl.onnx.TensorProto.DataType.INT32;case"uint32":return rl.onnx.TensorProto.DataType.UINT32;case"float32":return rl.onnx.TensorProto.DataType.FLOAT;case"float64":return rl.onnx.TensorProto.DataType.DOUBLE;case"string":return rl.onnx.TensorProto.DataType.STRING;case"int64":return rl.onnx.TensorProto.DataType.INT64;case"uint64":return rl.onnx.TensorProto.DataType.UINT64;default:throw Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(e=>e5.isLong(e)?e.toNumber():e)}static tensorValueTypeFromProto(t){return{tensorType:e.tensorDataTypeFromProto(t.elemType),shape:{dims:e.tensorDimsFromProto(t.shape.dim.map(e=>e.dimValue))}}}static tensorDimsFromORTFormat(e){let t=[];for(let r=0;r<e.dimsLength();r++)t.push(rm.longToNumber(e.dims(r)));return t}static tensorAttributesFromORTFormat(e){let t=[];for(let r=0;r<e.attributesLength();r++)t.push(e.attributes(r));return t}},rm=class{static longToNumber(e){return e5.isLong(e)?e.toNumber():"bigint"==typeof e?Number(e):e}static isLong(e){return e5.isLong(e)||"bigint"==typeof e}},rg=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static sizeFromDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(e,t,r){let n=1;for(let i=t;i<r;i++){if(e[i]<=0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");n*=e[i]}return n}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let r=Array(t);r[t-1]=1,r[t-2]=e[t-1];for(let n=t-3;n>=0;--n)r[n]=r[n+1]*e[n+1];return r}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,t,r){void 0===r&&(r=e.length);let n=0;for(let i=0;i<r;++i)n+=t[i]*e[i];return n}static offsetToIndices(e,t){let r=t.length;if(0===r)return[];if(1===r)return[e*t[0]];let n=Array(t.length);for(let r=0;r<n.length-1;++r)n[r]=Math.floor(e/t[r]),e-=n[r]*t[r];return n[n.length-1]=e,n}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(e=>this.normalizeAxis(e,t))}static incrementIndex(e,t,r){if(0===t.length||0===e.length)throw Error("Index incrementing unsupported for scalar Tensor");if(void 0===r)r=t.length;else if(r<=0||r>t.length)throw Error("Incorrect axis to increment on");for(let n=r-1;n>=0&&(e[n]++,!(e[n]<t[n]));--n)e[n]=0}static calculateReshapedDims(t,r){if(0===r.length){if(0===t.length||1===e.size(t))return[];throw Error("cannot reshape to a scalar Tensor")}let n=r.length,i=Array(n),o=-1,a=1;for(let e=0;e<n;e++){if(r[e]<-1)throw Error("a dimension in shape hints cannot be less than -1");if(-1===r[e]){if(-1!==o)throw Error("at most one dimension in shape hints can be -1");o=e}else{if(0===r[e]){if(e>=t.length)throw Error("the dimension with value zero exceeds the dimension size of the input tensor");i[e]=t[e]}else i[e]=r[e];a*=i[e]}}let s=e.size(t);if(-1!==o){if(s%a!=0)throw Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${t}] Output shape: [${r}]`);i[o]=s/a}else if(a!==s)throw Error("reshapedDims and originalDims don't have matching sizes");return i}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let r=e.length;return e.map((e,n)=>e+t[n]+t[n+r])}static areEqual(e,t){return e.length===t.length&&e.every((e,r)=>e===t[r])}static validateDimsAndCalcSize(e){if(e.length>6)throw TypeError("Only rank 0 to 6 is supported for tensor shape.");let t=1;for(let r of e){if(!Number.isInteger(r))throw TypeError(`Invalid shape: ${r} is not an integer`);if(r<0||r>0x7fffffff)throw TypeError(`Invalid shape: length ${r} is not allowed`);t*=r}return t}static flattenShape(e,t){t<0&&(t+=e.length);let r=e.reduce((e,t)=>e*t,1),n=e.slice(t).reduce((e,t)=>e*t,1);return[r/n,n]}static squeezeShape(t,r){let n=[];r=e.normalizeAxes(r,t.length);for(let e=0;e<t.length;e++){let i=r.indexOf(e)>=0;if(i&&1!==t[e])throw Error("squeeze an axis of size different than 1");(0===r.length&&t[e]>1||r.length>0&&!i)&&n.push(t[e])}return n}static unsqueezeShape(t,r){let n=Array(t.length+r.length);n.fill(0);for(let t=0;t<r.length;t++){let i=e.normalizeAxis(r[t],n.length);if(i>=n.length)throw Error("'axes' has an out of range axis");if(0!==n[i])throw Error("'axes' has a duplicate axis");n[i]=1}let i=0;for(let e=0;e<n.length;e++)0===n[e]&&(n[e]=t[i++]);if(i!==t.length)throw Error("the unsqueezed dimension could not be established");return n}},rb=class e{static splitShape(t,r,n,i){if(0===n.length){if(!i)throw Error("need to know number of outputs when the 'split' attribute is not specified");e.determineSplit(t[r],i,n)}let o=[],a=[0];for(let e=0;e<n.length;++e){0!==e&&a.push(a[e-1]+n[e-1]);let i=t.slice();i[r]=n[e],o.push(i)}return[o,a]}static determineSplit(e,t,r){if(e%t!=0)throw Error("cannot split tensor to equal sized parts");for(let n=0;n<t;++n)r.push(e/t)}},ry=class e{static adjustPoolAttributes(e,t,r,n,i,o){if(!e&&r.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=r.length?r.push(t[e+2]):r[e]=t[e+2];for(let e=0;e<r.length;e++)if(e<n.length){if(n[e]<0)throw Error("strides should be greater than or equal to 1")}else n.push(1);for(let e=0;e<r.length;e++)if(e<i.length){if(i[e]<0)throw Error("dilations should be greater than or equal to 1")}else i.push(1);for(let e=0;e<2*r.length;e++)if(e<o.length){if(o[e]<0)throw Error("pad should be greater than or equal to 1")}else o.push(0);for(let e=0;e<r.length;e++){if(r[e]<=0)throw Error("kernel shapes need to be greater than 0");if(o[e]>=r[e]||o[e+r.length]>=r[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,i,o,a){if(a){if(o.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<t.length-2;s++)e.adjustPadAndReturnShape(t[s+2],r[s],n[s],i[s],o,s,s+t.length-2,a)}}static computePoolOutputShape(t,r,n,i,o,a,s,u=0){if(r.length<=0)throw Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return e.computeShapeHelper(t,r,l,n,i,o,a,s,u),l}static computeConvOutputShape(t,r,n,i,o,a,s){if(t.length<=0||r.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return e.computeShapeHelper(!1,t,u,n,i,o,a,s),u}static computeShapeHelper(t,r,n,i,o,a,s,u,l=0){if(t)for(let e=0;e<r.length-2;e++)n.push(1);else for(let t=0;t<r.length-2;t++)n.push(e.adjustPadAndReturnShape(r[t+2],i[t],o[t],a[t],s,t,t+r.length-2,u,l))}static computeOutputSize(e,t,r,n,i){let o=Math.floor(e/t)+1;return 1===i&&((o=Math.ceil(e/t)+1)-1)*t>=r+n&&(o-=1),o}static adjustPadAndReturnShape(t,r,n,i,o,a,s,u,l=0){let d=n*(i-1)+1;if(!u||"NOTSET"===u)return e.computeOutputSize(t+o[a]+o[s]-d,r,t,o[a],l);switch(u){case"VALID":return o[a]=0,o[s]=0,e.computeOutputSize(t-d,r,t,0,l);case"SAME_LOWER":case"SAME_UPPER":if(1!==n)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let n=(Math.floor((t+r-1)/r)-1)*r+i-t;return o[a]=Math.floor("SAME_LOWER"===u?(n+1)/2:n/2),o[s]=n-o[a],e.computeOutputSize(t+o[a]+o[s]-d,r,t,o[a],l)}default:throw Error("Unsupported AutoPad type")}}},r_=-34028234663852886e22,rv=34028234663852886e22});function rw(e){switch(e){case rO.onnx.TensorProto.DataType.UINT8:case rO.onnx.TensorProto.DataType.INT8:case rO.onnx.TensorProto.DataType.BOOL:return 1;case rO.onnx.TensorProto.DataType.UINT16:case rO.onnx.TensorProto.DataType.INT16:return 2;case rO.onnx.TensorProto.DataType.FLOAT:case rO.onnx.TensorProto.DataType.INT32:case rO.onnx.TensorProto.DataType.UINT32:return 4;case rO.onnx.TensorProto.DataType.INT64:case rO.onnx.TensorProto.DataType.DOUBLE:case rO.onnx.TensorProto.DataType.UINT64:return 8;default:throw Error(`cannot calculate sizeof() on type ${rO.onnx.TensorProto.DataType[e]}`)}}function r$(e){switch(e){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw Error("unspecified error")}}function rT(e,t){if(t===rO.onnx.TensorProto.DataType.INT64||t===tr.TensorDataType.INT64){if(e.greaterThanOrEqual(0x80000000)||e.lessThan(-0x80000000))throw TypeError("int64 is not supported")}else if(t===rO.onnx.TensorProto.DataType.UINT32||t===tr.TensorDataType.UINT32||t===rO.onnx.TensorProto.DataType.UINT64||t===tr.TensorDataType.UINT64){if(e.greaterThanOrEqual(0x100000000)||e.lessThan(0))throw TypeError("uint64 is not supported")}else throw TypeError(`not a LONG type: ${rO.onnx.TensorProto.DataType[t]}`);return e.toNumber()}function rI(e,t,r){switch(t){case rO.onnx.TensorProto.DataType.BOOL:case rO.onnx.TensorProto.DataType.UINT8:return e.getUint8(r);case rO.onnx.TensorProto.DataType.INT8:return e.getInt8(r);case rO.onnx.TensorProto.DataType.UINT16:return e.getUint16(r,!0);case rO.onnx.TensorProto.DataType.INT16:return e.getInt16(r,!0);case rO.onnx.TensorProto.DataType.FLOAT:return e.getFloat32(r,!0);case rO.onnx.TensorProto.DataType.INT32:return e.getInt32(r,!0);case rO.onnx.TensorProto.DataType.UINT32:return e.getUint32(r,!0);case rO.onnx.TensorProto.DataType.INT64:return rT(e5.fromBits(e.getUint32(r,!0),e.getUint32(r+4,!0),!1),t);case rO.onnx.TensorProto.DataType.DOUBLE:return e.getFloat64(r,!0);case rO.onnx.TensorProto.DataType.UINT64:return rT(e5.fromBits(e.getUint32(r,!0),e.getUint32(r+4,!0),!0),t);default:throw Error(`cannot read from DataView for type ${rO.onnx.TensorProto.DataType[t]}`)}}var rS,rO,rE,rA=G(()=>{"use strict";rS=X(eC()),to(),tZ(),rO=X(ra()),rx(),rE=class e{constructor(e,t,r,n,i,o=rS.Guid.create()){this.dims=e,this.type=t,this.dataProvider=r,this.asyncDataProvider=n,this.cache=i,this.dataId=o,this.size=rg.validateDimsAndCalcSize(e);let a=this.size,s=void 0===r&&void 0===n&&void 0===i;if(void 0!==i&&i.length!==a)throw RangeError("Input dims doesn't match data length.");if("string"===t){if(void 0!==i&&(!Array.isArray(i)||!i.every(e=>"string"==typeof e)))throw TypeError("cache should be a string array");s&&(this.cache=Array(a))}else{if(void 0!==i){let e=r$(t);if(!(i instanceof e))throw TypeError(`cache should be type ${e.name}`)}if(s){let e=new ArrayBuffer(a*function(e){switch(e){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw Error(`cannot calculate sizeof() on type ${e}`)}}(t));this.cache=new(r$(t))(e)}}}get data(){if(void 0===this.cache){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if("string"!==this.type)throw TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw TypeError("data type is not float (float32, float64)")}}get numberData(){if("string"!==this.type)return this.data;throw TypeError("type cannot be non-number (string)")}get(e){return this.data[rg.indicesToOffset(e,this.strides)]}set(e,t){this.data[rg.indicesToOffset(e,this.strides)]=t}async getData(){return void 0===this.cache&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=rg.computeStrides(this.dims)),this._strides}static fromProto(t){if(!t)throw Error("cannot construct Value from an empty tensor");let r=rf.tensorDataTypeFromProto(t.dataType),n=new e(rf.tensorDimsFromProto(t.dims),r);if("string"===r)t.stringData.forEach((e,t)=>{n.data[t]=ru(e)});else if(t.rawData&&"number"==typeof t.rawData.byteLength&&t.rawData.byteLength>0){let e=n.data,r=new DataView(t.rawData.buffer,t.rawData.byteOffset,t.rawData.byteLength),i=rw(t.dataType),o=t.rawData.byteLength/i;if(t.rawData.byteLength%i!=0)throw Error("invalid buffer length");if(e.length!==o)throw Error("buffer length mismatch");for(let n=0;n<o;n++){let o=rI(r,t.dataType,n*i);e[n]=o}}else{let e;switch(t.dataType){case rO.onnx.TensorProto.DataType.FLOAT:e=t.floatData;break;case rO.onnx.TensorProto.DataType.INT32:case rO.onnx.TensorProto.DataType.INT16:case rO.onnx.TensorProto.DataType.UINT16:case rO.onnx.TensorProto.DataType.INT8:case rO.onnx.TensorProto.DataType.UINT8:case rO.onnx.TensorProto.DataType.BOOL:e=t.int32Data;break;case rO.onnx.TensorProto.DataType.INT64:e=t.int64Data;break;case rO.onnx.TensorProto.DataType.DOUBLE:e=t.doubleData;break;case rO.onnx.TensorProto.DataType.UINT32:case rO.onnx.TensorProto.DataType.UINT64:e=t.uint64Data;break;default:throw Error("unspecific error")}if(null==e)throw Error("failed to populate data from a tensorproto value");let r=n.data;if(r.length!==e.length)throw Error("array length mismatch");for(let n=0;n<e.length;n++){let i=e[n];e5.isLong(i)?r[n]=rT(i,t.dataType):r[n]=i}}return n}static fromData(t,r,n){return new e(r,n,void 0,void 0,t)}static fromOrtTensor(t){if(!t)throw Error("cannot construct Value from an empty tensor");let r=rf.tensorDimsFromORTFormat(t),n=rf.tensorDataTypeFromProto(t.dataType()),i=new e(r,n);if("string"===n)for(let e=0;e<t.stringDataLength();e++)i.data[e]=t.stringData(e);else if(t.rawDataArray()&&"number"==typeof t.rawDataLength()&&t.rawDataLength()>0){let e=i.data,r=new DataView(t.rawDataArray().buffer,t.rawDataArray().byteOffset,t.rawDataLength()),n=rw(t.dataType()),o=t.rawDataLength()/n;if(t.rawDataLength()%n!=0)throw Error("invalid buffer length");if(e.length!==o)throw Error("buffer length mismatch");for(let i=0;i<o;i++){let o=rI(r,t.dataType(),i*n);e[i]=o}}return i}}});function rP(e){return 1===e?rk:rD}var rk,rD,rN=G(()=>{"use strict";rk={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},rD={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}}),rC=G(()=>{});async function rz(e,t=e=>0,r){return new Promise((n,i)=>{let o=0,a=()=>{if(e())return void n();let s=t(++o);null!=r&&o>=r?i():setTimeout(a,s)};a()})}function rR(e){return rs("u">typeof e&&0!==e.length,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)}function rB(e,t){return JSON.parse(JSON.stringify(e)),t}function rM(e,t){return t.map(t=>e[t]).join(", ")}function rj(e){if(e<=1)return"int";if(2===e)return"ivec2";if(3===e)return"ivec3";if(4===e)return"ivec4";if(5===e)return"ivec5";if(6===e)return"ivec6";throw Error(`GPU for rank ${e} is not yet supported`)}function rF(e=6){return["x","y","z","w","u","v"].slice(0,e)}var rL=G(()=>{"use strict";rx()});function rV(e,t){return 1===t?[e]:rF(t).map(t=>`${e}.${t}`)}function rU(){return`
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
  `}var rq,rG,rH=G(()=>{"use strict";rL()}),rW=G(()=>{"use strict";rN(),rC(),rL(),rH(),rq={name:"pack",inputNames:["A"],inputTypes:[1]},rG=(e,t)=>({...rq,get:()=>((e,t)=>{var r,n;let i=rP(e.session.backend.glContext.version),o=t.dims,a=o.length,s=t.dims.length,u=rj(s),l=rV("rc",s),d=(r=o[o.length-2],n=o[o.length-1],0===s||1===s?"":`
    int r = ${l[s-2]};
    int c = ${l[s-1]};
    int rp1 = ${l[s-2]} + 1;
    int cp1 = ${l[s-1]} + 1;
    bool rEdge = rp1 >= ${n};
    bool cEdge = cp1 >= ${r};
    `),p;p=0===a?[1,1]:1===a?[o[0],1]:[o[s-1],o[s-2]];let c=function(e,t,r){if(0===e)return"false";if(1===e)return`rc > ${t[0]}`;let n="";for(let i=e-2;i<e;i++)n+=`${r[i]} >= ${t[i-e+2]}`,i<e-1&&(n+="||");return n}(s,p,l),h=function(e,t){let r=e.length;if(0===r)return"getA(), 0, 0, 0";if(1===r)return`getA(rc),
            rc + 1 >= ${e[0]} ? 0. : getA(rc + 1),
            0, 0`;let n="";if(r>2)for(let e=0;e<r-2;++e)n+=`${t[e]},`;return`getA(${n}r, c),
          rEdge ? 0. : getA(${n}rp1, c),
          cEdge ? 0. : getA(${n}r, cp1),
          rEdge || cEdge ? 0. : getA(${n}rp1, cp1)`}(o,l),f=`
        void main() {
          ${u} rc = getOutputCoords();

          if(${c}) {
            ${i.output} = vec4(0);
          } else {
            ${d}

            ${i.output} = vec4(${h});
          }
        }
      `;return{...rq,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:2},shaderSource:f}})(e,t)})});function rK(e){if(0===e.length)return[1,1,1];let t=1;for(let r=0;r<e.length-2;++r)t*=e[r];return[t,e.length>1?e[e.length-2]:1,e[e.length-1]]}var rX,rZ,rJ,rQ,rY,r0,r1,r2,r3,r4,r6,r5,r8,r7,r9,ne,nt,nr,nn,ni,no,na,ns,nu,nl,nd,np,nc,nh,nf,nm,ng,nb,ny,n_,nv,nx,nw,n$,nT,nI,nS,nO,nE,nA,nP,nk,nD,nN,nC,nz=G(()=>{"use strict";rx(),rN(),rC(),rH(),rX=(e,t,r)=>{let n,i=(n=r,{name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${n}`});return{...i,get:()=>((e,t,r,n)=>{let i,o,a,s,u=t.dims,l="";for(let e=0;e<4;e++){let t="";switch(e){case 0:t="outputCoords = rc;";break;case 1:t="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:t="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:t="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw Error()}l+=`
        ${t}
        ${e>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${e}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${e>0?"}":""}
      `}let d=rP(e.session.backend.glContext.version),p=`
      ${(i=rg.computeStrides(u),o=["b","r","c"],a="index",`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${i.map((e,t)=>{let r=`int ${o[t]} = ${a} / ${e}`,n=t===i.length-1?`int ${o[t+1]} = ${a} - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("")}
      return ivec3(b, r, c);
    }
  `)}
      ${(s=rg.computeStrides(n),`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${s[0]} + coords.z * ${s[1]} + coords.y;
  }
`)}
      ${rU()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${n[2]};
        int cols = ${n[1]};

        ${l}
        ${d.output} = result;
      }
    `;return{...r,output:{dims:n,type:t.type,textureType:2},shaderSource:p,hasMain:!0}})(e,t,i,r)}}}),nR=G(()=>{"use strict";rN(),rC(),rZ=(e,t)=>{let r=t.shape,n=rP(e.session.backend.glContext.version),i=`
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
    }`,o={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:r,type:t.tensor.type,textureType:3},shaderSource:i,hasMain:!0};return e.executeProgram(o,[t.tensor])}}),nB=G(()=>{"use strict";rN(),rC(),rL(),rH(),rJ={name:"unpack",inputNames:["A"],inputTypes:[2]},rQ=(e,t)=>({...rJ,get:()=>{var r,n;let i,o,a,s,u,l,d,p,c;return r=e,a=(o=rV("rc",i=(n=t).dims.length)).slice(-2),s=rj(i),u=rU(),l=0===n.dims.length?"":function(e,t){if(1===e)return"rc";let r="";for(let n=0;n<e;n++)r+=t[n],n<e-1&&(r+=",");return r}(i,o),d=i<=1?"rc":`vec2(${a.join(",")})`,p=rP(r.session.backend.glContext.version),c=`
    ${u}
    void main() {
      ${s} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${l});

       ${p.output} = vec4(getChannel(packedInput, ${d}), 0, 0, 0);
     }
   `,{...rJ,hasMain:!0,output:{dims:n.dims,type:n.type,textureType:0},shaderSource:c}}})}),nM=G(()=>{"use strict";eD(),rY=class{constructor(e,t=1){if(1===t)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=t;else if(4===t)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=t;else throw Error(`Invalid number of channels: ${t}`)}encode(e,t){let r,n;return e.constructor!==Float32Array&&(eO.warning("Encoder","data was not of type Float32; creating new Float32Array"),n=new Float32Array(e)),t*this.channelSize>e.length?(eO.warning("Encoder","Source data too small. Allocating larger array"),n=e,r=this.allocate(t*this.channelSize),n.forEach((e,t)=>r[t]=e)):r=n=e,r}allocate(e){return new Float32Array(4*e)}decode(e,t){return 1===this.channelSize?e.filter((e,t)=>t%4==0).subarray(0,t):e.subarray(0,t)}},r0=class{constructor(e,t=1,r){if(1!==t&&4!==t)throw Error(`Invalid number of channels: ${t}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=t,this.textureType=r||e.FLOAT}encode(e,t){let r=e;return 1===this.channelSize&&(eO.verbose("Encoder","Exploding into a larger array"),r=this.allocate(t),e.forEach((e,t)=>r[4*t]=e)),r}allocate(e){return new Float32Array(4*e)}decode(e,t){return 1===this.channelSize?e.filter((e,t)=>t%4==0).subarray(0,t):e.subarray(0,t)}},r1=class{constructor(e,t=1){if(this.channelSize=4,1===t)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else if(4===t)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else throw Error(`Invalid number of channels: ${t}`)}encode(e,t){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,t){if(e instanceof Uint8Array)return e.subarray(0,t);throw Error(`Invalid array type: ${e.constructor}`)}}}),nj=G(()=>{"use strict";rx(),rC(),r2=(e,t,r)=>{let n=4===r?t.length-1:void 0,i=4===r?t.map((e,r)=>r===t.length-1?4*e:e):void 0;return r4(e,t,0===r||1===r?1:4,i,{isPacked:2===r,reverseWH:1===r||2===r,breakAxis:n})},r3=(e,t,r)=>{let n=r2(e,t,r);return[n.width,n.height]},r4=(e,t,r=1,n,i)=>{let o=!!(i&&i.isPacked),[a,s]=e.computeTextureWH(o&&n||t,i),u=t.length,l=t.slice(0);if(0===u&&(l=[1]),1===r)n=t;else if(o){if(4!==r)throw Error("a packed texture must be 4-channel");n=t,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!n)throw Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:r,isPacked:o,shape:l,strides:rg.computeStrides(l),unpackedShape:n,reversedWH:i&&i.reverseWH}}}),nF=G(()=>{"use strict";eD(),rA(),rx(),rW(),nz(),nR(),nB(),nM(),nj(),rC(),r6=class{constructor(e){this.session=e,this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,t){return r3(this.session.layoutStrategy,e,t)}executeProgram(e,t){var r;let n,i;if(t.length<e.inputNames.length)throw Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw Error("input names size does not match input types");let o=[];for(let r=0;r<e.inputNames.length;++r)o[r]=this.getOrCreateTextureData(t[r],e.inputTypes[r]);let a=(r=e,n=o.map(e=>`${e.unpackedShape.join(",")};${e.width}x${e.height}`).join("_"),i=r.name,r.cacheHint&&(i+="["+r.cacheHint+"]"),i+=":"+n),s=this.session.programManager.getArtifact(a),u=s?s.programInfo:"function"==typeof e.get?e.get():e,l=r2(this.session.layoutStrategy,u.output.dims,u.output.textureType),d=this.createTextureData(l,u.output.type);return s||(s=this.session.programManager.build(u,o,d),this.session.programManager.setArtifact(a,s)),this.runProgram(s,o,d),d}run(e,t){return this.executeProgram(e,t).tensor}runProgram(e,t,r){for(let r=0;r<t.length;++r)if(!!t[r].isPacked!=(2===e.programInfo.inputTypes[r]))throw Error(`input[${r}] property packed inconsistent`);if(!!r.isPacked!=(2===e.programInfo.output.textureType))throw Error("output property packed inconsistent");this.session.programManager.run(e,t,r)}getOrCreateTextureData(e,t){let r=this.getTextureData(e.dataId,2===t);if(!r&&(r=this.getTextureData(e.dataId,2!==t)))return 2===t?this.pack(r):this.unpack(r);if(!r){let n=r2(this.session.layoutStrategy,e.dims,t);if(4===t){let r=e.dims;if(4===r.length){let n=[r[0],Math.ceil(r[1]*r[2]*r[3]/4)],i=r2(this.session.layoutStrategy,n,t),o=e.numberData;if(r[1]*r[2]*r[3]%4!=0){let t=r[0],n=r[1]*r[2]*r[3],i=4*Math.ceil(n/4);o=new Float32Array(t*i);for(let r=0;r<t;++r){let t=r*n,a=r*i+r%1*n;o.set(e.numberData.subarray(t,t+n),a)}}return this.createTextureData(i,e.type,o,e,1)}}if(2===t){let t=r4(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),n=this.createTextureData(t,e.type,e.numberData,e,1);r=this.pack(n)}else r=this.createTextureData(n,e.type,e.numberData,e,1)}return r}createTextureDataFromLayoutBindTensor(e,t,r,n){return this.createTextureData(e,t,r,n,1)}createTextureData(e,t,r,n,i){eO.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let o=this.session.textureManager.createTextureFromLayout(t,e,r,i);return this.createTextureDataFromTexture(e,t,o,n)}reshapeUnpacked(e,t){let r=this.getOrCreateTextureData(e,0),n={channels:r.channels,height:r.height,width:r.width,shape:0!==t.length?t:[1],strides:rg.computeStrides(t),unpackedShape:t};return this.createTextureDataFromTexture(n,e.type,r.texture).tensor}reshapePacked(e,t){var r;let n=this.getOrCreateTextureData(e,2);if(r=e.dims,0===r.length||0===t.length||(r.length<2||t.length<2?r[r.length-1]===t[t.length-1]:r[r.length-1]===t[t.length-1]&&r[r.length-2]===t[t.length-2])){let r={channels:n.channels,height:n.height,width:n.width,shape:0!==t.length?t:[1],strides:rg.computeStrides(t),unpackedShape:t,isPacked:!0};return this.createTextureDataFromTexture(r,e.type,n.texture).tensor}let i=rK(e.dims),o=rK(t),a=this.reshapePacked(e,i),s=this.run(rX(this,a,o),[a]);return this.reshapePacked(s,t)}cast(e,t){let r=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(r,t,r.texture).tensor}createTextureDataFromTexture(e,t,r,n,i){let o={...e,tensor:n||new rE(e.unpackedShape,t,e=>this.readTexture(o),async e=>this.readTextureAsync(o),void 0,i),texture:r};return this.setTextureData(o.tensor.dataId,o,e.isPacked),o}getTextureData(e,t=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,t):t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,r=!1){this.session.isInitializer(e)?this.session.setTextureData(e,t,r):(r?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,t)}isTextureLayoutCached(e,t=!1){return!!this.getTextureData(e.dataId,t)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(rZ(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(rZ(this,e))}pack(e){return this.executeProgram(rG(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(rQ(this,e.tensor),[e.tensor])}}}),nL=G(()=>{"use strict";r5=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},r8=e=>new r5(e)}),nV=G(()=>{"use strict";nL(),rN(),rC(),r7={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},r9=(e,t,r)=>(nr(t),[e.run({...r7,cacheHint:r.cacheKey,get:()=>nt(e,t,r)},t)]),ne=e=>{let t=e.attributes.getFloat("epsilon",1e-5),r=e.attributes.getFloat("momentum",.9),n=e.attributes.getInt("spatial",1);return r8({epsilon:t,momentum:r,spatial:n})},nt=(e,t,r)=>{let n=rP(e.session.backend.glContext.version),i=t[0].dims.length,[o,a]=e.calculateTextureWidthAndHeight(t[1].dims,0),s=`
  float process(int[${i}] indices) {
    vec2 position = offsetToCoords(indices[1], ${o}, ${a});
    float scale = getColorAsFloat(${n.texture2D}(Scale, position));
    float mean = getColorAsFloat(${n.texture2D}(Mean, position));
    float variance = getColorAsFloat(${n.texture2D}(Variance, position));
    float b = getColorAsFloat(${n.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${r.epsilon})) ) + b;
  }`;return{...r7,output:{dims:t[0].dims,type:t[0].type,textureType:0},shaderSource:s}},nr=e=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs.");let t=e[0],r=e[1],n=e[2],i=e[3],o=e[4];if(t.dims.length<3||1!==r.dims.length||1!==n.dims.length||1!==i.dims.length||1!==o.dims.length||r.dims[0]!==t.dims[1]||n.dims[0]!==t.dims[1]||i.dims[0]!==t.dims[1]||o.dims[0]!==t.dims[1])throw Error("invalid input shape.");if("float32"!==t.type&&"float64"!==t.type||"float32"!==r.type&&"float64"!==r.type||"float32"!==n.type&&"float64"!==n.type||"float32"!==i.type&&"float64"!==i.type||"float32"!==o.type&&"float64"!==o.type)throw Error("invalid input tensor types.")}}),nU=G(()=>{"use strict";nn=class{constructor(e,t,r,n){this.glContext=e,this.programInfo=t,this.inputTextureLayouts=r,this.outputTextureLayout=n}},ni=class{constructor(e){this.context=e}},no=class{constructor(e,t){this.routineBody=e,this.dependencies=t}},na=class{constructor(e,t,r){this.name=e,r?this.dependencies=r:this.dependencies=[],t&&(this.routineBody=t)}addDependency(e){e&&this.dependencies.push(e)}},ns=class{static returnOrderedNodes(e){if(!e||0===e.length)return[];if(1===e.length)return e;let t=new Set,r=new Set,n=[];return this.createOrderedNodes(e,t,r,n),n}static createOrderedNodes(e,t,r,n){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],t,r,n)}static dfsTraverse(e,t,r,n){if(!e||r.has(e.name))return;if(t.has(e.name))throw Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");t.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let e=0;e<i.length;++e)this.dfsTraverse(i[e],t,r,n);n.push(e),r.add(e.name),t.delete(e.name)}}}),nq=G(()=>{"use strict";rx(),nU(),rN(),rC(),nu=(e,t,r,n=t[0].type,i)=>{let o=2*!!e.session.pack;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],cacheHint:i,get:()=>nl(e,t,r,n)}},nl=(e,t,r,n=t[0].type)=>{let i=2*!!e.session.pack,o=!rg.areEqual(t[0].dims,t[1].dims),a=t[0].dims,s=e.session.pack;if(o){let o=rc.calcShape(t[0].dims,t[1].dims,!1);if(!o)throw Error("Can't perform binary op on the given tensors");let u=(a=o).length,l=0!==t[0].dims.length?t[0].dims.length:1,d=0!==t[1].dims.length?t[1].dims.length:1,p=0!==t[0].dims.length?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",c=0!==t[1].dims.length?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",h=rP(e.session.backend.glContext.version),f=s?`
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
      }`;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],output:{dims:a,type:n,textureType:i},shaderSource:f,hasMain:s}}let u=rP(e.session.backend.glContext.version),l=`
    ${r.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${r.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],output:{dims:t[0].dims,type:n,textureType:i},shaderSource:l,hasMain:!0}},nd=(e,t)=>{let r;return[e.run(nu(e,t,(r="add_",{body:`
  float ${r}(float a, float b) {
    return a + b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:r,type:0})),t)]},np=(e,t)=>{let r;return[e.run(nu(e,t,(r="and_",{body:`
  float ${r}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:r,type:0}),"bool"),t)]},nc=(e,t)=>{let r;return[e.run(nu(e,t,(r="div_",{body:`
  float ${r}(float a, float b) {
    return a / b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:r,type:0})),t)]},nh=(e,t)=>{let r;return[e.run(nu(e,t,(r="equal_",{body:`
  float ${r}(float a, float b) {
    return float(a == b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:r,type:0}),"bool"),t)]},nf=(e,t)=>{let r;return[e.run(nu(e,t,(r="greater_",{body:`
  float ${r}(float a, float b) {
    return float(a > b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:r,type:0}),"bool"),t)]},nm=(e,t)=>{let r;return[e.run(nu(e,t,(r="less_",{body:`
  float ${r}(float a, float b) {
    return float(a < b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:r,type:0}),"bool"),t)]},ng=(e,t)=>{let r;return[e.run(nu(e,t,(r="mul_",{body:`
  float ${r}(float a, float b) {
    return a * b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:r,type:0})),t)]},nb=(e,t)=>[e.run(nu(e,t,{body:`
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
  `,name:"or_",type:0},"bool"),t)],ny=(e,t)=>{let r;return[e.run(nu(e,t,(r="pow_",{body:`
  float ${r}(float a, float b) {
    return pow(a, b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return pow(v1, v2);
  }
  `,name:r,type:0})),t)]},n_=(e,t)=>{let r;return[e.run(nu(e,t,(r="prelu_",{body:`
  float ${r}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:r,type:0})),t)]},nv=(e,t)=>{let r;return[e.run(nu(e,t,(r="sub_",{body:`
  float ${r}(float a, float b) {
    return a - b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:r,type:0})),t)]},nx=(e,t)=>{let r;return[e.run(nu(e,t,(r="xor_",{body:`
  float ${r}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:r,type:0}),"bool"),t)]}}),nG=G(()=>{"use strict";rx(),nw=(e,t,r)=>(nT(t),[e.cast(t[0],r)]),n$=e=>rf.tensorDataTypeFromProto(e.attributes.getInt("to")),nT=e=>{if(!e||1!==e.length)throw Error("Cast requires 1 input.");if("string"===e[0].type)throw Error("Invalid input type.")}}),nH=G(()=>{"use strict";rN(),rC(),rL(),rH(),nI=(e,t,r)=>{let n,i,o=(n=t.length,i=r.cacheKey,{name:"Concat (packed)",inputNames:Array.from({length:n},(e,t)=>`X${t}`),inputTypes:Array(n).fill(2),cacheHint:i});return{...o,get:()=>((e,t,r,n)=>{let i=r[0].dims.slice();if(n>=i.length||n<-1*i.length)throw Error("axis specified for concat doesn't match input dimensionality");n<0&&(n=i.length+n);let o=i.slice(0);for(let e=1;e<r.length;e++){let t=r[e].dims.slice();for(let e=0;e<i.length;e++)if(e===n)o[n]+=t[e];else if(i[e]!==t[e])throw Error("non concat dimensions must match")}let a=o.length,s=rV("coords",a),u=rj(a),l=rU(),d=r.map(e=>e.dims),p=rF(a),c=Array(d.length-1);c[0]=d[0][n];for(let e=1;e<c.length;e++)c[e]=c[e-1]+d[e][n];let h=p[n],f=p.slice(-2),m=p.join(),g=`if (${h} < ${c[0]}) {
        return getChannel(
            getX0(${m}), vec2(${f.join()}));
        }`;for(let e=1;e<c.length;e++){let t=c[e-1];g+=`
            if (${h} < ${c[e]}  && ${h} >= ${c[e-1]}) {
              return getChannel(
                getX${e}(${nS(p,h,t)}),
                vec2(${nS(f,h,t)}));
            }`}let b=c.length,y=c[c.length-1];g+=`
            return getChannel(
              getX${b}(${nS(p,h,y)}),
              vec2(${nS(f,h,y)}));`;let _=rP(e.session.backend.glContext.version),v=`
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
        `;return{...t,output:{dims:o,type:r[0].type,textureType:2},shaderSource:v,hasMain:!0}})(e,o,t,r.axis)}},nS=(e,t,r)=>{let n=e.indexOf(t);return e.map((e,t)=>t===n?`${e} - ${r}`:e).join()}}),nW=G(()=>{"use strict";nL(),rC(),nH(),nO=(e,t,r)=>(nC(t),e.session.pack&&t[0].dims.length>1?[e.run(nI(e,t,r),t)]:[e.run(nE(e,t,r),t)]),nE=(e,t,r)=>{let n,i,o=(n=t.length,i=r.cacheKey,{name:"Concat",inputNames:Array.from({length:n},(e,t)=>`X${t}`),inputTypes:Array(n).fill(0),cacheHint:i});return{...o,get:()=>((e,t,r)=>{let n=t[0].dims.slice();if(r>=n.length||r<-1*n.length)throw Error("axis specified for concat doesn't match input dimensionality");r<0&&(r=n.length+r);let i=n.slice(0);for(let e=1;e<t.length;e++){let o=t[e].dims.slice();for(let e=0;e<n.length;e++)if(e===r)i[r]+=o[e];else if(n[e]!==o[e])throw Error("non concat dimensions must match")}let o=i.length,a=Array(t.length),s=0;for(let e=0;e<a.length;++e)s+=t[e].dims[r],a[e]=s;let u="";u=t.length<5?nA(a):nP(a);let l=nk(t.length,o),d=nD(a),p=`
        ${l}
        ${d}
        ${u}
        float process(int indices[${o}]) {
          int textureIndex = getTextureWhereDataResides (indices[${r}]);

          if(textureIndex != 0) {
            indices[${r}] = indices[${r}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:t[0].type,textureType:0},shaderSource:p}})(o,t,r.axis)}},nA=e=>`int getTextureWhereDataResides(int index) {
      ${e.map((e,t)=>`if(index<${e}) {return ${t};}
`).join("")}
    }`,nP=e=>nA(e),nk=(e,t)=>{let r=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${t}]) {`];for(let t=0;t<e;++t)0===t?r.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===e-1?r.push(`	else { return _X${t}(indices); }`):r.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return r.push("	}"),r.join(`
`)},nD=e=>{let t=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let r=0;r<e.length;++r)0===r?t.push(`	if (index == ${r}) { return ${e[r]}; }`):r===e.length-1?t.push(`	else { return ${e[r]}; }`):t.push(`	else if (index == ${r}) { return ${e[r]}; }`);return t.push("	}"),t.join(`
`)},nN=e=>r8({axis:e.attributes.getInt("axis")}),nC=e=>{if(!e||e.length<1)throw Error("too few inputs");let t=e[0].type,r=e[0].dims.length;if("string"===t)throw Error("string tensor is not supported yet");for(let n of e){if(n.type!==t)throw Error("input tensors should be one type");if(n.dims.length!==r)throw Error("input tensors should have the same shape")}}});function nK(e,t){let r="clip";return{body:`
  const float min = float(${e});
  const float max = float(${t});

  float ${r}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${r}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:r,type:0}}function nX(){let e="relu";return{body:`
  float ${e}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${e}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:e,type:0}}function nZ(){let e="sigmoid";return{body:`
  float ${e}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${e}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:e,type:0}}function nJ(e){return{body:`
  float ${e}_(float a) {
    return ${e}(a);
  }
  vec4 ${e}_(vec4 v) {
    return ${e}(v);
  }
  `,name:e,type:0}}var nQ,nY,n0,n1,n2,n3,n4,n6,n5,n8,n7,n9,ie,it,ir,ii,io,ia,is,iu,il,id,ip,ic,ih,im,ig,ib=G(()=>{"use strict";nL(),rx(),nU(),rN(),rC(),nQ=(e,t,r,n)=>{let i=2*!!e.session.pack,o={name:r.name,inputTypes:[i],inputNames:["A"],cacheHint:n};return{...o,get:()=>{var n,i,a,s;let u,l;return n=e,i=o,a=t,s=r,u=2*!!n.session.pack,l=rP(n.session.backend.glContext.version),{...i,output:{dims:a.dims,type:a.type,textureType:u},shaderSource:`
     ${s.body}
     void main() {
       vec4 v = ${l.texture2D}(A, TexCoords);
       v = ${s.name}_(v);
       ${l.output} = v;
     }
     `,hasMain:!0}}}},nY=(e,t)=>[e.run(nQ(e,t[0],nJ("abs")),t)],n0=(e,t)=>[e.run(nQ(e,t[0],nJ("acos")),t)],n1=(e,t)=>[e.run(nQ(e,t[0],nJ("asin")),t)],n2=(e,t)=>[e.run(nQ(e,t[0],nJ("atan")),t)],n3=(e,t,r)=>[e.run(nQ(e,t[0],nK(r.min,r.max),r.cacheKey),t)],n4=e=>r8({min:e.attributes.getFloat("min",r_),max:e.attributes.getFloat("max",rv)}),n6=(e,t)=>{let r=n5(e,t);return n3(e,[t[0]],r)},n5=(e,t)=>{if(t.length>=3&&(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)))throw Error("dynamic clip attributes are not allowed");let r=t.length>=3?t[1].numberData[0]:r_,n=t.length>=3?t[2].numberData[0]:rv;return r8({min:r,max:n})},n8=(e,t)=>[e.run(nQ(e,t[0],nJ("ceil")),t)],n7=(e,t)=>[e.run(nQ(e,t[0],nJ("cos")),t)],n9=(e,t,r)=>{var n;return[e.run(nQ(e,t[0],(n=r.alpha,{body:`
  const float alpha = float(${n});

  float elu_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 elu_(vec4 v) {
    return vec4(elu_(v.x), elu_(v.y), elu_(v.z), elu_(v.w));
  }
  `,name:"elu",type:0}),r.cacheKey),t)]},ie=e=>r8({alpha:e.attributes.getFloat("alpha",1)}),it=(e,t)=>[e.run(nQ(e,t[0],nJ("exp")),t)],ir=(e,t)=>[e.run(nQ(e,t[0],nJ("floor")),t)],ii=(e,t)=>{let r;return[e.run(nQ(e,t[0],(r="indentity",{body:`
  float ${r}_(float a) {
    return a;
  }
  vec4 ${r}_(vec4 v) {
    return v;
  }
  `,name:r,type:0})),t)]},io=(e,t,r)=>{var n;let i;return[e.run(nQ(e,t[0],(n=r.alpha,i="leakyRelu",{body:`
  const float alpha = float(${n});

  float ${i}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${i}_(vec4 v) {
    return vec4(${i}_(v.x), ${i}_(v.y), ${i}_(v.z), ${i}_(v.w));
  }
  `,name:i,type:0}),r.cacheKey),t)]},ia=e=>r8({alpha:e.attributes.getFloat("alpha",.01)}),is=(e,t)=>[e.run(nQ(e,t[0],nJ("log")),t)],iu=(e,t)=>[e.run(nQ(e,t[0],{body:`
  float neg_(float a) {
    return -a;
  }
  vec4 neg_(vec4 v) {
    return -v;
  }
  `,name:"neg",type:0}),t)],il=(e,t)=>[e.run(nQ(e,t[0],{body:`
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
  `,name:"not",type:0}),t)],id=(e,t)=>[e.run(nQ(e,t[0],nX()),t)],ip=(e,t)=>[e.run(nQ(e,t[0],nZ()),t)],ic=(e,t)=>[e.run(nQ(e,t[0],nJ("sin")),t)],ih=(e,t)=>[e.run(nQ(e,t[0],nJ("sqrt")),t)],im=(e,t)=>[e.run(nQ(e,t[0],nJ("tan")),t)],ig=(e,t)=>{let r;return[e.run(nQ(e,t[0],(r="tanh",{body:`
  float ${r}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${r}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:r,type:0})),t)]}});function iy(e){let t;switch(e.activation){case"Relu":t=nX();break;case"Sigmoid":t=nZ();break;case"Clip":t=nK(e.clipMin,e.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let r=t.name;return{activationFunction:t.body,applyActivation:`value = ${r}_(value);`}}var i_,iv,ix,iw=G(()=>{"use strict";rx(),ib(),i_=e=>{let t=e.getString("activation","");if("Clip"===t){let[r,n]=e.getFloats("activation_params",[r_,rv]);return{activation:t,clipMax:n,clipMin:r,activationCacheKey:`${t}:${r},${n}`}}return{activation:t,activationCacheKey:t}}}),i$=G(()=>{"use strict";eD(),rN(),rC(),sh(),iw(),iv=(e,t,r)=>{let n,i=(n=t.length>2,{name:"GroupedConv",inputNames:n?["X","W","Bias"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:r.cacheKey});return{...i,get:()=>((e,t,r,n)=>{let i=t.length>2?"value += getBias(output_channel);":"",o=t[0].dims.slice(),a=t[1].dims.slice(),s=a[0]/n.group;eO.verbose("GroupedConv",`autpPad:${n.autoPad}, dilations:${n.dilations}, group:${n.group}, kernelShape:${n.kernelShape}, pads:${n.pads}, strides:${n.strides}`);let u=iR(o,a,n.dilations,n.pads,n.strides),l=rP(e.session.backend.glContext.version),{activationFunction:d,applyActivation:p}=iy(n),c=`
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
`;return{...r,output:{dims:u,type:t[0].type,textureType:0},shaderSource:c,hasMain:!0}})(e,t,i,r)}}}),iT=G(()=>{"use strict";rN(),rC(),rH(),ix=(e,t,r,n,i)=>{let o={name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:i.cacheKey};return{...o,get:()=>((e,t,r,n,i,o)=>{let a=r.dims,s=n.dims,u=i.length,l=[s[1]*s[2]*s[3],i[2]*i[3]],d=s[2]*s[3],p=rU(),c=rP(e.session.backend.glContext.version),h="";for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)h+=`
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
            `;return{...t,output:{dims:l,type:r.type,textureType:2},shaderSource:f,hasMain:!0}})(e,o,t,r,n,i)}}});function iI(e,t){let r=iA(e.length>2,t.activationCacheKey);return{...r,get:()=>(function(e,t,r){let n=t[0].dims,i=t[1].dims,o=rc.calcShape(n,i,!0);if(!o)throw Error("Can't use matmul on the given tensors");let a=rj(o.length),s=rF(),{activationFunction:u,applyActivation:l}=iy(r),d=t.length>2,p=d?`${iS(a,s,t[2].dims,o,!1)}`:"",c=o.length,h=n.length,f=i.length,m=n[n.length-1],g=`
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
    }`;return{...e,output:{dims:o,type:t[0].type,textureType:0},shaderSource:g}})(r,e,t)}}function iS(e,t,r,n,i){let o="",a=r.length,s=n.length,u=s-a;o=s<2&&a>0?"coords":r.map((e,r)=>`coords.${t[r+u]}`).join(", ");let l=rc.getBroadcastDims(r,n).map(e=>`coords.${t[e+u]} = 0;`).join(`
`),d=1===rg.size(r),p="vec4(outputValue.xx, outputValue.yy)";return d&&(p="vec4(outputValue.x)"),i?`
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
}`}var iO,iE,iA,iP,ik,iD,iN,iC,iz,iR,iB,iM,ij,iF,iL,iV,iU,iq,iG,iH,iW,iK,iX,iZ,iJ,iQ,iY,i0,i1,i2,i3,i4,i6,i5,i8,i7,i9,oe,ot,or,on,oi,oo,oa,os,ou,ol,od,op,oc,oh,of,om,og,ob,oy,o_,ov,ox,ow,o$,oT,oI,oS,oO,oE,oA,oP,ok,oD,oN,oC,oz,oR,oB,oM,oj,oF,oL,oV,oU,oq,oG,oH,oW,oK,oX,oZ,oJ,oQ,oY,o0,o1,o2,o3,o4,o6,o5,o8,o7,o9,ae,at,ar,an,ai,ao,aa,as,au,al,ad,ap,ac,ah,af,am,ag,ab,ay,a_,av,ax,aw,a$,aT,aI,aS,aO,aE,aA,aP,ak,aD,aN,aC,az,aR,aB,aM,aj,aF,aL,aV,aU,aq,aG,aH,aW,aK,aX,aZ,aJ,aQ,aY,a0,a1,a2,a3,a4,a6,a5,a8,a7,a9,se,st,sr,sn,si,so,sa,ss,su=G(()=>{"use strict";rx(),rC(),rL(),iw(),sl(),iO=(e,t,r)=>(iP(t),e.session.pack?[e.run(ik(e,t,r),t)]:[e.run(iI(t,r),t)]),iE=e=>i_(e.attributes),iA=(e,t)=>({name:"MatMul",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),iP=e=>{if(!e||2!==e.length)throw Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw Error("shared dimension does not match.");if("float32"!==e[0].type&&"float64"!==e[0].type||"float32"!==e[1].type&&"float64"!==e[1].type)throw Error("inputs should be float type");if(e[0].type!==e[1].type)throw Error("inputs types should match")}}),sl=G(()=>{"use strict";rx(),rN(),rC(),rL(),iw(),su(),ik=(e,t,r)=>{let n,i=(n=t.length>2,{name:"MatMul (packed)",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[2,2,2]:[2,2],cacheHint:r.activationCacheKey});return{...i,get:()=>((e,t,r,n)=>{let i,o,a,s,u,l,d,p,c,h,f,m,g,b,y=r.length>2,_=r[0].dims,v=r[1].dims,x=rc.calcShape(_,v,!0),w=!rg.areEqual(r[0].dims,r[1].dims);if(!x)throw Error("Can't use matmul on the given tensors");let $=Math.ceil(_[_.length-1]/2),T=_.length,I=v.length,S=rP(e.session.backend.glContext.version),O=rj(x.length),E=x.length,A=rF(),{activationFunction:P,applyActivation:k}=iy(n),D=y?`${iS(O,A,r[2].dims,x,!0)}`:"",N=w?`${i=[],o=[],a=r[0].dims,s=r[1].dims,u=a.length,l=s.length,p=(d=x.length)-u,c=d-l,(i=a.map((e,t)=>`coords.${A[t+p]}`))[u-1]="i*2",i.join(", "),(o=s.map((e,t)=>`coords.${A[t+c]}`))[l-2]="i*2",o.join(", "),h=rc.getBroadcastDims(a,x),f=rc.getBroadcastDims(s,x),m=h.map(e=>`coords.${A[e+p]} = 0;`).join(`
`),g=f.map(e=>`coords.${A[e+c]} = 0;`).join(`
`),b=`int lastDim = coords.${A[d-1]};
  coords.${A[d-1]} = coords.${A[d-2]};
  coords.${A[d-2]} = lastDim;`,`
vec4 getAAtOutCoordsMatmul(int i) {
  ${O} coords = getOutputCoords();
  ${b}
  ${m}
  vec4 outputValue = getA(${i});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${O} coords = getOutputCoords();
  ${b}
  ${g}
  vec4 outputValue = getB(${o});
  return outputValue;
}`}`:"",C=w?"getAAtOutCoordsMatmul(i)":`getA(${function(e,t){let r="";for(let n=0;n<t-2;n++)r+=`rc.${e[n]}, `;return r+`rc.${e[t-2]}, i*2`}(A,T)})`,z=w?"getBAtOutCoordsMatmul(i)":`getB(${function(e,t){let r="";for(let n=0;n<t-2;n++)r+=`rc.${e[n]}, `;return r+`i*2, rc.${e[t-1]}`}(A,I)})`,R=w?"":`${O} rc =
          getOutputCoords(); int lastDim = rc.${A[E-1]}; rc.${A[E-1]} =
          rc.${A[E-2]}; rc.${A[E-2]} = lastDim;
      `,B=`
            ${N}
            ${D}
            ${P}
            void main() {
              ${R}

              vec4 value = vec4(0);
              for (int i = 0; i < ${$}; i++) {
                vec4 a = ${C};
                vec4 b = ${z};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${y?"value += getBiasForMatmul();":""}
              ${k}
              ${S.output} = value;
            }`;return{...t,output:{dims:x,type:r[0].type,textureType:2},shaderSource:B,hasMain:!0}})(e,i,t,r)}}}),sd=G(()=>{"use strict";sh(),iT(),sl(),iD=(e,t,r)=>{let n=t[0].dims,i=t[1].dims,o=iR(n,i,r.dilations,r.pads,r.strides),a=e.run(ix(e,t[0],t[1],o,r),[t[0]]),s=e.reshapePacked(t[1],[i[0],i[1]*i[2]*i[3]]),u=3===t.length?[s,a,t[2]]:[s,a],l=e.run(ik(e,u,r),u);return e.reshapePacked(l,o)}}),sp=G(()=>{"use strict";rC(),iN=(e,t,r,n,i)=>{let o={name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:i.cacheKey};return{...o,get:()=>{var e,a,s,u,l;let d,p,c,h,f;return e=o,a=t,s=r,u=n,l=i,d=a.dims,p=s.dims,c=u.length,h=iC(d,p,u,4),f=`
        const int XC = ${d[1]};
        const int XH = ${d[2]};
        const int XW = ${d[3]};
        const int KH = ${l.kernelShape[0]};
        const int KW = ${l.kernelShape[1]};
        const int dilationH = ${l.dilations[0]};
        const int dilationW = ${l.dilations[1]};
        const int strideH = ${l.strides[0]};
        const int strideW = ${l.strides[1]};
        const int padH = ${l.pads[0]};
        const int padW = ${l.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${c}]) {
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
              int x[${d.length}];
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
        `,{...e,output:{dims:h,type:a.type,textureType:4},shaderSource:f}}}},iC=(e,t,r,n=4)=>[r[0],r[2],r[3],Math.ceil(e[1]*t[2]*t[3]/n)]}),sc=G(()=>{"use strict";rx(),rN(),rC(),iw(),sp(),iz=(e,t,r,n)=>{let i,o=(i=t.length>2,{name:"ConvDotProduct",inputNames:i?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:i?[0,4,0]:[0,4],cacheKey:n.activationCacheKey});return{...o,get:()=>((e,t,r,n,i)=>{let o=r[0].dims,a=r[1].dims,s=[a[0],Math.ceil(o[1]*a[2]*a[3]/4)],u=iC(o,a,n),[l,d]=e.calculateTextureWidthAndHeight(s,4),p=rg.computeStrides(u),[c,h]=e.calculateTextureWidthAndHeight(u,4),f=n.length,m=r.length<3?"0.0":"_B(b)",g=Math.ceil(o[1]*a[2]*a[3]/4),{activationFunction:b,applyActivation:y}=iy(i),_=rP(e.session.backend.glContext.version),v=`
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
}`;return{...t,output:{dims:n,type:r[0].type,textureType:0},shaderSource:v}})(e,o,t,r,n)}}}),sh=G(()=>{"use strict";nL(),rx(),i$(),sd(),sc(),iw(),sp(),su(),iR=(e,t,r,n,i)=>{let o=e[0],a=e.slice(2),s=a.length,u=t[0],l=t.slice(2).map((e,t)=>e+(e-1)*(r[t]-1));return[o,u].concat(...a.map((e,t)=>e+n[t]+n[t+s]).map((e,t)=>Math.floor((e-l[t]+i[t])/i[t])))},iB=(e,t,r)=>(iU(t,r),iM(e,t,r)),iM=(e,t,r)=>{let n=iL(r,t),i=e.session.pack,o=1===n.kernelShape[0]&&1===n.kernelShape[1];return n.group>1?[e.run(iv(e,t,n),t)]:o&&i?[ij(e,t,n)]:i&&4===t[0].dims.length&&1===t[0].dims[0]&&!o?[iD(e,t,n)]:[iF(e,t,n)]},ij=(e,t,r)=>{let n=t[0].dims,i=t[1].dims,o=iR(n,i,r.dilations,r.pads,r.strides),a=e.reshapeUnpacked(t[0],[n[1],n[2]*n[3]]),s=e.reshapeUnpacked(t[1],[i[0],i[1]]),u=t.length>2?[s,a,t[2]]:[s,a],l=e.run(iI(u,r),u);return e.reshapeUnpacked(l,o)},iF=(e,t,r)=>{let n=t[0].dims,i=t[1].dims,o=iR(n,i,r.dilations,r.pads,r.strides),a=e.run(iN(e,t[0],t[1],o,r),[t[0]]),s=3===t.length?[a,t[1],t[2]]:[a,t[1]];return e.run(iz(e,t,o,r),s)},iL=(e,t)=>{let r=e.kernelShape.slice();if(0===e.kernelShape.length)for(let e=2;e<t[1].dims.length;++e)r.push(t[1].dims[e]);let n=e.pads.slice();ry.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:r,pads:n,cacheKey:e.cacheKey}),i},iV=e=>{let t=e.attributes,r=i_(t),n=t.getString("auto_pad","NOTSET"),i=t.getInts("dilations",[1,1]),o=t.getInt("group",1),a=t.getInts("kernel_shape",[]),s=t.getInts("pads",[0,0,0,0]),u=t.getInts("strides",[1,1]);return r8({autoPad:n,dilations:i,group:o,kernelShape:a,pads:s,strides:u,...r})},iU=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length||4!==e[1].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims[1]!==e[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let r=e[0].dims.length-2;if(t.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(t.strides.length!==r)throw Error(`strides should be ${r}D`);if(t.pads.length!==2*r)throw Error(`pads should be ${2*r}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if("float32"!==e[0].type||"float32"!==e[1].type)throw Error("Conv input(X,W) should be float tensor");if(3===e.length&&"float32"!==e[2].type)throw Error("Conv input(bias) should be float tensor")}}),sf=G(()=>{"use strict";nL(),rN(),rC(),iw(),iq=(e,t,r,n,i,o)=>(e-1)*t+r+(n-1)*i+1-o,iG=(e,t,r,n,i)=>{let o=Math.floor(e/2);"SAME_UPPER"===t?(r[n]=o,r[i]=e-o):"SAME_LOWER"===t&&(r[n]=e-o,r[i]=o)},iH=(e,t,r)=>(iJ(t,r),iW(e,t,r)),iW=(e,t,r)=>{let n=iX(r,t);return[iK(e,t,n)]},iK=(e,t,r)=>{var n,i,o;let a,s;return e.run((n=e,i=t,o=r,{...s=(a=i.length>2,{name:"ConvTranspose",inputNames:a?["X","W","B"]:["X","W"],inputTypes:a?[0,0,0]:[0,0],cacheHint:o.cacheKey}),get:()=>((e,t,r,n)=>{let i=t.length>2?"getB(output_channel)":"0.0",o=t[0].dims,a=t[1].dims,s=a[1],u=a[0]/n.group,l=[t[0].dims[0],t[1].dims[1]*n.group,...n.outputShape],d=rP(e.session.backend.glContext.version),{activationFunction:p,applyActivation:c}=iy(n),h=`
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
`;return{...r,output:{dims:l,type:t[0].type,textureType:0},shaderSource:h,hasMain:!0}})(n,i,s,o)}),t)},iX=(e,t)=>{let r=e.kernelShape.slice();if(0===e.kernelShape.length)for(let e=2;e<t[1].dims.length;++e)r.push(t[1].dims[e]);let n=e.pads.slice(),i=e.outputShape.slice();((e,t,r,n,i,o,a,s)=>{let u=e.length-2,l=0===s.length;for(let d=0;d<u;++d){let p=l?e[d+2]*o[d]:s[d];iG(iq(e[d+2],o[d],i[d],t[d],r[d],p),n,i,d,d+u),l&&s.push(o[d]*(e[d+2]-1)+a[d]+(t[d]-1)*r[d]+1-i[d]-i[d+u])}})(t[0].dims,r,e.dilations,e.autoPad,n,e.strides,e.outputPadding,i);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n,outputShape:i,cacheKey:e.cacheKey}),o},iZ=e=>{let t=e.attributes,r=i_(t),n=t.getString("auto_pad","NOTSET"),i=t.getInts("dilations",[1,1]),o=t.getInt("group",1),a=t.getInts("kernel_shape",[]),s=t.getInts("output_padding",[0,0]),u=t.getInts("output_shape",[]),l=t.getInts("pads",[0,0,0,0]),d=t.getInts("strides",[1,1]);return r8({autoPad:n,dilations:i,group:o,kernelShape:a,outputPadding:s,outputShape:u,pads:l,strides:d,...r})},iJ=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length||4!==e[1].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims[1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let r=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==r))throw Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.length!==2*n)throw Error(`pads should be ${2*n}D`);if(t.outputPadding.length!==n)throw Error(`output_padding should be ${n}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape");if("float32"!==e[0].type||"float32"!==e[1].type)throw Error("ConvTranspose input(X,W) should be float tensor");if(3===e.length&&"float32"!==e[2].type)throw Error("ConvTranspose input(bias) should be float tensor")}}),sm=G(()=>{"use strict";nL(),rx(),rC(),iQ={name:"Transpose",inputNames:["A"],inputTypes:[0]},iY=(e,t,r)=>(i6(t),[e.run({...iQ,cacheHint:r.cacheKey,get:()=>i1(e,t[0],r.perm)},t)]),i0=e=>r8({perm:e.attributes.getInts("perm",[])}),i1=(e,t,r)=>{let n=t.dims;r=i2(n,r);let i=i3(n,r),o=n.length,a=`
      ${i4("perm",r,o)}
      float process(int indices[${o}]) {
        int a[${o}];
        perm(a, indices);
        return _A(a);
      }`;return{...iQ,output:{dims:i,type:t.type,textureType:0},shaderSource:a}},i2=(e,t)=>(t&&t.length!==e.length&&(t=[...e.keys()].reverse()),t),i3=(e,t)=>(t=i2(e,t),rg.sortBasedOnPerm(e,t)),i4=(e,t,r)=>{let n=[];n.push(`void ${e}(out int a[${r}], int src[${r}]) {`);for(let e=0;e<r;++e)n.push(`	a[${t[e]}]=src[${e}];`);return n.push("	}"),n.join(`
`)},i6=e=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("input should be float tensor")}}),sg=G(()=>{"use strict";sm(),i5=(e,t,r)=>{i7(t);let n=r.blocksize,i=n*n,o="DCR"===r.mode?[0,3,4,1,5,2]:[0,1,4,2,5,3],a="DCR"===r.mode?[t[0].dims[0],n,n,t[0].dims[1]/i,t[0].dims[2],t[0].dims[3]]:[t[0].dims[0],t[0].dims[1]/i,n,n,t[0].dims[2],t[0].dims[3]],s=e.reshapeUnpacked(t[0],a),u={perm:o,cacheKey:`${o}`},[l]=iY(e,[s],u),d=[t[0].dims[0],t[0].dims[1]/i,t[0].dims[2]*n,t[0].dims[3]*n];return[e.reshapeUnpacked(l,d)]},i8=e=>{let t=e.attributes.getInt("blocksize");if(t<1)throw Error(`blocksize must be >= 1, but got : ${t} for DepthToSpace`);let r=e.attributes.getString("mode","DCR");if("DCR"!==r&&"CRD"!==r)throw Error(`unrecognized mode: ${r} for DepthToSpace`);return{mode:r,blocksize:t}},i7=e=>{if(1!==e.length)throw Error(`DepthToSpace expect 1 inputs, but got ${e.length}`);if("string"===e[0].type||4!==e[0].dims.length)throw TypeError("DepthToSpace input should be a 4-D numeric tensor")}}),sb=G(()=>{"use strict";rx(),i9=(e,t,r)=>{ot(t,r);let n=rg.flattenShape(t[0].dims,r);return[e.reshapeUnpacked(t[0],n)]},oe=e=>e.attributes.getInt("axis",1),ot=(e,t)=>{if(!e||1!==e.length)throw Error("Flatten requires 1 input.");let r=e[0].dims.length;if(0===r)throw Error("scalar tensor is not supported.");if(t<-r||t>r)throw Error("Invalid axis");if("string"===e[0].type)throw Error("string tensor is not supported.")}}),sy=G(()=>{"use strict";or=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]}),s_=G(()=>{"use strict";nL(),sy(),rx(),rC(),on=(e,t,r)=>(os(t,r.axis),[e.run(oa(e,t,r),t)]),oi=e=>r8({axis:e.attributes.getInt("axis",0)}),oo={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},oa=(e,t,r)=>{let n={...oo,cacheHint:r.cacheKey};return{...n,get:()=>((e,t,r)=>{let n=t[0].dims.slice(),i=t[1].dims.slice(),o=Array(n.length+i.length-1);r=rg.normalizeAxis(r,n.length);let a=[];for(let e=0;e<o.length;e++)e<r?(o[e]=n[e],a.push(`inputIdx[${e}] = outputIdx[${e}];`)):e<r+i.length?(o[e]=i[e-r],a.push(`indexDataIdx[${e-r}] = outputIdx[${e}];`)):(o[e]=n[e-i.length+1],a.push(`inputIdx[${e-i.length+1}] = outputIdx[${e}];`));let s=o.length||1,u=n.length,l=i.length||1,d=`
      float process(int outputIdx[${s}]) {
        int inputIdx[${u}];
        int indexDataIdx[${l}];
        indexDataIdx[0] = 0;
        ${a.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${r}] = idx < 0 ? idx + ${n[r]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:o,type:t[0].type,textureType:0},shaderSource:d}})(n,t,r.axis)}},os=(e,t)=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.");let r=e[0].dims.length;if(r<1)throw Error("Invalid input shape.");if(t<-r||t>r-1)throw Error("Invalid axis.");if(-1===or.indexOf(e[0].type)||"int32"!==e[1].type&&"int16"!==e[1].type)throw Error("Invaid input type.")}}),sv=G(()=>{"use strict";nL(),rx(),rC(),ou=(e,t,r)=>(of(t,r),[e.run(oc(t,r),t)]),ol=(e,t)=>{let r=0!==e.attributes.getInt("transA",0),n=0!==e.attributes.getInt("transB",0),i=e.attributes.getFloat("alpha",1),o=e.attributes.getFloat("beta",1);return r8({transA:r,transB:n,alpha:i,beta:o,isOptionalC:t})},od=e=>ol(e,!1),op=e=>ol(e,!0),oc=(e,t)=>{let r={name:"Gemm",inputNames:3===e.length?["A","B","C"]:["A","B"],inputTypes:3===e.length?[0,0,0]:[0,0],key:t.cacheKey};return{...r,get:()=>oh(r,e,t)}},oh=(e,t,r)=>{let n=t[0].dims.slice(),i=t[1].dims.slice(),[o,a]=rh.getShapeOfGemmResult(n,r.transA,i,r.transB,3===t.length?t[2].dims:void 0),s=[o,a];if(!s)throw Error("Can't use gemm on the given tensors");let u=n[n.length-1],l="";r.transA&&(u=n[0]),r.transA&&r.transB?l="value += _A_T(a) * _B_T(b);":r.transA&&!r.transB?l="value += _A_T(a) * _B(b);":!r.transA&&r.transB?l="value += _A(a) * _B_T(b);":r.transA||r.transB||(l="value += _A(a) * _B(b);");let d=s.length,p=3===t.length?`int c[${t[2].dims.length}];`:"",c=3===t.length?"bcastIndices_C(indices, c);":"",h=3===t.length?"value += beta * _C(c);":"",f=`
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
      }`;return{...e,output:{dims:s,type:t[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:r.alpha},{name:"beta",type:"float",data:r.beta}],shaderSource:f}},of=(e,t)=>{if(!e)throw Error("Input is missing");if(t.isOptionalC&&(e.length<2||e.length>3))throw Error("Invaid input shape.");if(!t.isOptionalC&&3!==e.length)throw Error("Gemm requires 3 inputs");if(3===e.length&&1!==e[2].dims.length&&2!==e[2].dims.length)throw Error("Invalid input shape of C");if("float32"!==e[0].type&&"float64"!==e[0].type||"float32"!==e[1].type&&"float64"!==e[1].type||3===e.length&&"float32"!==e[2].type&&"float64"!==e[2].type)throw Error("Invalid input type.");if(e[0].type!==e[1].type||3===e.length&&e[0].type!==e[2].type)throw Error("Input types are mismatched")}}),sx=G(()=>{"use strict";nL(),rC(),om=(e,t,r)=>(ov(t),[e.run(oy(e,t,r),t)]),og=e=>{let t=e.attributes.getFloat("scale"),r=e.attributes.getFloats("bias");return r8({scale:t,bias:r})},ob={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},oy=(e,t,r)=>{let n={...ob,cacheHint:r.cacheKey};return{...n,get:()=>{var e,i,o;let a,s,u;return e=n,i=t,o=r,s=(a=i[0].dims.slice()).length,u=`
      ${o_(o.bias.length)}
      float process(int indices[${s}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`,{...e,output:{dims:a,type:i[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:o.bias.length,data:o.bias},{name:"scale",type:"float",data:o.scale}],shaderSource:u}}}},o_=e=>{let t=[`float getBias(float bias[${e}], int channel) {`];for(let r=0;r<e;++r)0===r?t.push(`	if (channel == ${r}) { return bias[${r}]; }`):r===e-1?t.push(`	else { return bias[${r}]; }`):t.push(`	else if (channel == ${r}) { return bias[${r}]; }`);return t.push("	}"),t.join(`
`)},ov=e=>{if(!e||1!==e.length)throw Error("ImageScaler requires 1 input.");if(4!==e[0].dims.length)throw Error("Invalid input shape.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")}}),sw=G(()=>{"use strict";rN(),rC(),ox=(e,t,r)=>{oO(t);let n=e.run(oT(t[0]),t);return[e.run(oS(e,t[0],r,n.dims),[t[0],n,t[1],t[2]])]},ow=e=>e.attributes.getFloat("epsilon",1e-5),o$={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},oT=e=>({...o$,get:()=>{var t,r;let n,i,o,a,s;return t=o$,i=(n=(r=e).dims.slice())[1],o=n[2]*n[3],a=[n[0],i],s=`
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
      }`,{...t,output:{dims:a,type:r.type,textureType:4},shaderSource:s}}}),oI={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},oS=(e,t,r,n)=>{let i={...oI,cacheHint:`${r}`};return{...i,get:()=>((e,t,r,n,i)=>{let o=rP(e.session.backend.glContext.version),[a,s]=e.calculateTextureWidthAndHeight(i,4),[u,l]=[a/4,s],d=`
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
      }`;return{...t,output:{dims:r.dims,type:r.type,textureType:0},variables:[{name:"epsilon",type:"float",data:n}],shaderSource:d}})(e,i,t,r,n)}},oO=e=>{if(!e||3!==e.length)throw Error("InstanceNormalization requires 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dims.length<3||1!==r.dims.length||1!==n.dims.length)throw Error("Invalid input shape.");if(r.dims[0]!==t.dims[1]||n.dims[0]!==t.dims[1])throw Error("Input shapes are mismatched.");if("float32"!==t.type&&"float64"!==t.type||"float32"!==r.type&&"float64"!==r.type||"float32"!==n.type&&"float64"!==n.type)throw Error("Invalid input type.");if(4!==e[0].dims.length)throw Error("Only support 4-D input shape.")}}),s$=G(()=>{"use strict";nL(),rC(),oE=(e,t,r)=>(ok(t),[e.run({...oP,cacheHint:r.cacheKey,get:()=>{let e,n,i,o,a,s,u,l;return e=t[0].dims[1],n=t[0].dims.length,i=-Math.floor((r.size-1)/2),o=Math.ceil((r.size-1)/2),a=`float(${r.alpha}) / float(${r.size})`,s=`float(${r.bias})`,u=`float(${r.beta})`,l=`
    float process(int indices[${n}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${i}; i <= ${o}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${e}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${s} + ${a} * square_sum, ${u});
    }`,{...oP,cacheHint:r.cacheKey,output:{dims:t[0].dims,type:t[0].type,textureType:0},shaderSource:l}}},t)]),oA=e=>{let t=e.attributes.getFloat("alpha",1e-4),r=e.attributes.getFloat("beta",.75),n=e.attributes.getFloat("bias",1),i=e.attributes.getInt("size");return r8({alpha:t,beta:r,bias:n,size:i})},oP={name:"LRN",inputNames:["X"],inputTypes:[0]},ok=e=>{if(!e||1!==e.length)throw Error("LRN requires 1 input.");if(4!==e[0].dims.length)throw Error('currently only support LRN for input with "NCHW" format');if("float32"!==e[0].type)throw Error("input should be float type")}}),sT=G(()=>{"use strict";nL(),rx(),rN(),rC(),oD={name:"Pad",inputNames:["A"],inputTypes:[0]},oN=(e,t,r)=>(oj(t),[e.run({...oD,cacheHint:r.cacheKey,get:()=>oM(e,t[0],r)},t)]),oC=e=>{let t=e.attributes.getString("mode","constant"),r=e.attributes.getFloat("value",0),n=e.attributes.getInts("pads");return r8({mode:t,value:r,pads:n})},oz=(e,t,r)=>{oF(t);let n=oB(e,t,r);return oN(e,[t[0]],n)},oR=e=>e.attributes.getString("mode","constant"),oB=(e,t,r)=>{if(!e.session.isInitializer(t[1].dataId)||t.length>=3&&!e.session.isInitializer(t[2].dataId))throw Error("dynamic pad attributes are not allowed");let n=Array.from(t[1].integerData),i=t.length>=3?t[2].floatData[0]:0;return r8({mode:r,pads:n,value:i})},oM=(e,t,r)=>{let n=rg.padShape(t.dims.slice(),r.pads),i=n.length,o=`
      ${oL(e,t,r)}
      float process(int[${i}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:n,type:t.type,textureType:0},shaderSource:o}},oj=e=>{if(!e||1!==e.length)throw Error("Pad requires 1 input");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")},oF=e=>{if(!e||2!==e.length&&3!==e.length)throw Error("Pad requires 2 or 3 inputs");if("int32"!==e[1].type||e.length>=3&&"string"===e[2].type)throw Error("Invalid input type.")},oL=(e,t,r)=>{let n=rP(e.session.backend.glContext.version),[i,o]=e.calculateTextureWidthAndHeight(t.dims,0),a=rg.computeStrides(t.dims);switch(r.mode){case"constant":return oV(n,t.dims,a,i,o,r.pads,r.value);case"reflect":return oU(n,t.dims,a,i,o,r.pads);case"edge":return oq(n,t.dims,a,i,o,r.pads);default:throw Error("Invalid mode")}},oV=(e,t,r,n,i,o,a)=>{let s=t.length,u="";for(let e=s-1;e>=0;--e)u+=`
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
      `},oU=(e,t,r,n,i,o)=>{let a=t.length,s="";for(let e=a-1;e>=0;--e)s+=`
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
      `},oq=(e,t,r,n,i,o)=>{let a=t.length,s="";for(let e=a-1;e>=0;--e)s+=`
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
      `}}),sI=G(()=>{"use strict";nL(),rx(),rC(),oG=(e,t,r)=>{o3(t);let n={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[e.run({...n,get:()=>oW(t,n,!1,r)},t)]},oH=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),r=e.attributes.getInt("ceil_mode",0),n=0!==e.attributes.getInt("count_include_pad",0),i=e.attributes.getInts("kernel_shape"),o=e.attributes.getInts("strides",[]),a=e.attributes.getInts("pads",[]);if(0!==r)throw Error("using ceil() in shape computation is not yet supported for AveragePool");return r8({autoPad:t,ceilMode:r,countIncludePad:n,kernelShape:i,strides:o,pads:a})},oW=(e,t,r,n)=>{let[i,o]=oY(e,n,r),a=rg.size(i.kernelShape),s="";i.countIncludePad?s+=`value /= float(${a});`:s+=`value /= float(${a} - pad);`;let u=`
        ${o4(e[0].dims,i,"value += _X(x);",s,"0.0")}
      `;return{...t,output:{dims:o,type:e[0].type,textureType:0},shaderSource:u}},oK=(e,t,r)=>{o3(t);let n={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${r.countIncludePad}`};return[e.run({...n,get:()=>oW(t,n,!0,r)},t)]},oX=e=>{let t=0!==e.attributes.getInt("count_include_pad",0);return r8({autoPad:"",ceilMode:0,countIncludePad:t,kernelShape:[],strides:[],pads:[]})},oZ=(e,t,r)=>{o3(t);let n={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[e.run({...n,get:()=>oQ(t,n,!1,r)},t)]},oJ=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),r=e.attributes.getInt("ceil_mode",0),n=e.attributes.getInts("kernel_shape"),i=e.attributes.getInts("strides",[]),o=e.attributes.getInts("pads",[]),a=e.attributes.getInt("storage_order",0),s=e.attributes.getInts("dilations",[]);if(0!==a)throw Error("column major storage order is not yet supported for MaxPool");if(0!==r)throw Error("using ceil() in shape computation is not yet supported for MaxPool");return r8({autoPad:t,ceilMode:r,countIncludePad:!1,kernelShape:n,strides:i,pads:o,storageOrder:a,dilations:s})},oQ=(e,t,r,n)=>{let[i,o]=oY(e,n,r),a=`
      ${o4(e[0].dims,i,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...t,output:{dims:o,type:e[0].type,textureType:0},shaderSource:a}},oY=(e,t,r)=>{let n=e[0].dims.slice(),i=Object.hasOwnProperty.call(t,"dilations"),o=t.kernelShape.slice(),a=t.strides.slice(),s=i?t.dilations.slice():[],u=t.pads.slice();ry.adjustPoolAttributes(r,n,o,a,s,u);let l=ry.computePoolOutputShape(r,n,a,s,o,u,t.autoPad),d=Object.assign({},t);return i?Object.assign(d,{kernelShape:o,strides:a,pads:u,dilations:s,cacheKey:t.cacheKey}):Object.assign(d,{kernelShape:o,strides:a,pads:u,cacheKey:t.cacheKey}),[d,l]},o0={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},o1={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},o2=(e,t)=>(o3(t),[e.run({...o1,get:()=>oQ(t,o1,!0,o0)},t)]),o3=e=>{if(!e||1!==e.length)throw Error("Pool ops requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")},o4=(e,t,r,n,i)=>{let o=e.length;if(t.kernelShape.length<=2){let a=t.kernelShape[t.kernelShape.length-1],s=t.strides[t.strides.length-1],u=t.pads[t.pads.length/2-1],l=t.pads[t.pads.length-1],d=e[o-1],p="",c="",h="";if(p=u+l!==0?`
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
      `}{let a=rg.size(t.kernelShape),s=rg.computeStrides(t.kernelShape),u=s.length,l=t.pads.length,d=o5(u),p=o6(e,"inputDims"),c=o6(t.pads,"pads"),h=o6(s,"kernelStrides"),f=o6(t.strides,"strides"),m=t.pads.reduce((e,t)=>e+t),g="";return g=m?`
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
      `}},o6=(e,t)=>{let r="";for(let n=0;n<e.length;n++)r+=`
      ${t}[${n}] = ${e[n]};
    `;return r},o5=e=>`
  void offsetToIndices(int offset, int[${e}] strides, out int[${e}] indices) {
    if (${e} == 0) {
      return;
    }
    for (int i = 0; i < ${e} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${e} - 1] = offset;
  }`}),sS=G(()=>{"use strict";nL(),sy(),rx(),rC(),o8=(e,t,r,n,i)=>{ae(t);let o={name:n,inputNames:["A"],inputTypes:[0]};return[e.run({...o,cacheHint:r.cacheKey,get:()=>o9(e,t,r,n,i,o)},t)]},o7=e=>{let t=e.attributes.getInts("axes",[]),r=1===e.attributes.getInt("keepdims",1);return r8({axes:t,keepDims:r})},o9=(e,t,r,n,i,o)=>{let a=[],s=t[0].dims.length||1,u=[],l=rg.normalizeAxes(r.axes,t[0].dims.length),d=i(t,l),p=d[1];for(let e=0;e<t[0].dims.length;e++)l.indexOf(e)>=0||0===l.length?(r.keepDims&&a.push(1),p=`
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
      }`;return{...o,output:{dims:a,type:t[0].type,textureType:0},shaderSource:c}},ae=e=>{if(!e||1!==e.length)throw Error("Reduce op requires 1 input.");if(-1===or.indexOf(e[0].type))throw Error("Invalid input type.")},at=(e,t,r)=>o8(e,t,r,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),ar=(e,t,r)=>o8(e,t,r,"ReduceMean",(e,t)=>{let r=1;for(let n=0;n<e[0].dims.length;n++)(t.indexOf(n)>=0||0===t.length)&&(r*=e[0].dims[n]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${r}.;`]}),an=(e,t,r)=>o8(e,t,r,"ReduceMax",(e,t)=>{let r=[];for(let n=0;n<e[0].dims.length;n++)(t.indexOf(n)>=0||0===t.length)&&r.push(`inputIdx[${n}] = 0;`);return[`${r.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),ai=(e,t,r)=>o8(e,t,r,"ReduceMin",(e,t)=>{let r=[];for(let n=0;n<e[0].dims.length;n++)(t.indexOf(n)>=0||0===t.length)&&r.push(`inputIdx[${n}] = 0;`);return[`${r.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),ao=(e,t,r)=>o8(e,t,r,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),aa=(e,t,r)=>o8(e,t,r,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),as=(e,t,r)=>o8(e,t,r,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])}),sO=G(()=>{"use strict";rx(),au=(e,t)=>{let r=rg.calculateReshapedDims(t[0].dims,t[1].integerData);return e.session.pack?[e.reshapePacked(t[0],r)]:[e.reshapeUnpacked(t[0],r)]}}),sE=G(()=>{"use strict";nL(),rN(),rC(),al={name:"Upsample",inputNames:["X"],inputTypes:[0]},ad=(e,t,r)=>(am(t,r),[e.run({...al,cacheHint:r.cacheKey,get:()=>af(e,t,r)},t)]),ap=e=>ah(e,7),ac=e=>ah(e,9),ah=(e,t)=>{let r=t>=10,n=e.attributes.getString("mode","nearest");if("nearest"!==n&&"linear"!==n&&(t<11||"cubic"!==n))throw Error(`unrecognized mode: ${n}`);let i=[];t<9&&(i=e.attributes.getFloats("scales"),ag(i,n,r));let o=e.attributes.getFloat("extrapolation_value",0),a=t>10?e.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(-1===["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a))throw Error(`coordinate_transform_mode '${a}' is not supported`);let s="tf_crop_and_resize"===a,u="nearest"===n&&t>=11?e.attributes.getString("nearest_mode","round_prefer_floor"):"";if(-1===["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(u))throw Error(`nearest_mode '${u}' is not supported`);let l=e.attributes.getFloat("cubic_coeff_a",-.75),d=0!==e.attributes.getInt("exclude_outside",0);if(d&&"cubic"!==n)throw Error("exclude_outside can be set to 1 only when mode is CUBIC.");let p=t<11||"nearest"===n&&"asymmetric"===a&&"floor"===u,c=0,h=0,f=0;return t>10?e.inputs.length>2?(c=1,h=2,f=3):(h=1,f=2):9===t&&(h=1),r8({opset:t,isResize:r,mode:n,scales:i,extrapolationValue:o,coordinateTransformMode:a,useExtrapolation:s,needRoiInput:s,nearestMode:u,cubicCoefficientA:l,excludeOutside:d,useNearest2xOptimization:p,roiInputIdx:c,scalesInputIdx:h,sizesInputIdx:f})},af=(e,t,r)=>{let n=rP(e.session.backend.glContext.version),[i,o]=e.calculateTextureWidthAndHeight(t[0].dims,0),a=t[0].dims.map((e,t)=>Math.floor(e*r.scales[t])),[s,u]=e.calculateTextureWidthAndHeight(a,0),l=a.length,d=Array(l),p=Array(l),c=`
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
    }`;return{...al,output:{dims:a,type:t[0].type,textureType:0},shaderSource:f,variables:[{name:"scales",type:"int",arrayLength:r.scales.length,data:r.scales.map(e=>Math.ceil(e))}]}},am=(e,t)=>{if(!e||t.opset<9&&1!==e.length||t.opset>=9&&t.opset<11&&2!==e.length||t.opset>=11&&e.length<2)throw Error("invalid inputs.");if(t.scales.length>0&&e[0].dims.length!==t.scales.length)throw Error("Invalid input shape.");if("string"===e[0].type)throw Error("Invalid input tensor types.")},ag=(e,t,r)=>{if(r){for(let t of e)if(t<=0)throw Error("Scale value should be greater than 0.")}else for(let t of e)if(t<1)throw Error("Scale value should be greater than or equal to 1.");if(("linear"===t||"cubic"===t)&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1]))throw Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${r?"Resize":"Upsample"} opeartor.`)}}),sA=G(()=>{"use strict";rN(),rC(),rL(),rH(),sE(),ab={name:"Resize",inputNames:["A"],inputTypes:[2]},ay=(e,t,r)=>(am(t,r),[e.run({...ab,cacheHint:r.cacheKey,get:()=>ax(e,t,r)},t)]),a_=e=>ah(e,10),av=e=>ah(e,11),ax=(e,t,r)=>{let n=rP(e.session.backend.glContext.version),[i,o]=aw(t,r);if(i.every(e=>1===e)&&"tf_crop_and_resize"!==r.coordinateTransformMode)return{...ab,output:{dims:o,type:t[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
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
                `;break;default:throw Error(`resize (packed) does not support coordinateTransformMode:                                 '${r.coordinateTransformMode}'`)}let m=rj(a),g=rU(),b=`
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
        `;return{...ab,output:{dims:o,type:t[0].type,textureType:2},hasMain:!0,shaderSource:b}},aw=(e,t)=>{let r=e[0].dims,n=t.scales,i;if(0===n.length){let o=e[t.scalesInputIdx];if(o&&0!==o.size){if(e[t.sizesInputIdx])throw Error("Only one of scales or sizes must be provided as input.");n=a$(o,t.mode,t.isResize)}else{let o=e[t.sizesInputIdx];if(!o||0===o.size)throw Error("Either scales or sizes MUST be provided as input.");i=Array.from(o.integerData),n=aT(i,r,t.mode,t.isResize)}}else if(e[t.sizesInputIdx])throw Error("Only one of scales or sizes must be provided as input.");let o=i||r.map((e,t)=>Math.floor(e*n[t]));return[n,o]},a$=(e,t,r)=>{let n=Array.from(e.floatData);return ag(n,t,r),n},aT=(e,t,r,n)=>{let i=t.length,o=Array(i);for(let r=0;r<i;r++)if(0===t[r]){if(0!==e[r])throw Error("Input dim is zero but required output dim is non-zero.");o[r]=1}else o[r]=e[r]/t[r];return ag(o,r,n),o}}),sP=G(()=>{"use strict";rA(),aI=(e,t)=>(aS(t),[new rE([t[0].dims.length],"int32",void 0,void 0,new Int32Array(t[0].dims))]),aS=e=>{if(!e||1!==e.length)throw Error("Shape requires 1 input.")}}),sk=G(()=>{"use strict";nL(),sy(),rx(),rC(),aO={name:"Slice",inputNames:["A"],inputTypes:[0]},aE=(e,t,r)=>(ak(t),[e.run({...aO,cacheHint:r.cacheKey,get:()=>aP(e,t[0],r)},t)]),aA=e=>{let t=e.attributes.getInts("starts"),r=e.attributes.getInts("ends"),n=e.attributes.getInts("axes",[]);return r8({starts:t,ends:r,axes:n})},aP=(e,t,r)=>{let n=0===r.axes.length?t.dims.slice(0).map((e,t)=>t):r.axes,i=rg.normalizeAxes(n,t.dims.length),o=r.starts.map((e,r)=>e>t.dims[i[r]]-1?t.dims[i[r]]:rg.normalizeAxis(e,t.dims[i[r]])),a=r.ends.map((e,r)=>e>t.dims[i[r]]-1?t.dims[i[r]]:rg.normalizeAxis(e,t.dims[i[r]])),s=t.dims.slice(),u=[];for(let e=0;e<i.length;e++)s[i[e]]=a[e]-o[e],o[e]>0&&u.push(`outputIdx[${i[e]}] += ${o[e]};`);let l=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...aO,output:{dims:s,type:t.type,textureType:0},shaderSource:l}},ak=e=>{if(!e||1!==e.length)throw Error("Slice requires 1 input.");if(-1===or.indexOf(e[0].type))throw Error("Invalid input type.")},aD=(e,t)=>{aC(t);let r=aN(e,t);return[e.run({...aO,cacheHint:r.cacheKey,get:()=>aP(e,t[0],r)},[t[0]])]},aN=(e,t)=>{if(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)||t.length>=4&&!e.session.isInitializer(t[3].dataId)||t.length>=5&&!e.session.isInitializer(t[4].dataId))throw Error("dynamic slice attributes are not allowed");if(t.length>=5&&t[4].integerData.some(e=>1!==e))throw Error("currently non-1 steps is not supported for Slice");let r=Array.from(t[1].integerData),n=Array.from(t[2].integerData),i=t.length>=4?Array.from(t[3].integerData):[],o=`${i};${r};${n}`;return{starts:r,ends:n,axes:i,cacheKey:o}},aC=e=>{if(!e||e.length<3||e.length>5)throw Error("Invalid input number.");if("int32"!==e[1].type||1!==e[1].dims.length||"int32"!==e[2].type||1!==e[2].dims.length||e.length>=4&&("int32"!==e[3].type||1!==e[3].dims.length)||e.length>=5&&("int32"!==e[4].type||1!==e[4].dims.length))throw Error("Invalid input type.")}}),sD=G(()=>{"use strict";nL(),rx(),rN(),rC(),sm(),az={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},aR={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},aB={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},aM=(e,t,r)=>{aH(t);let n=t[0].dims.slice(),i=rg.normalizeAxis(r.axis,n.length),o=rg.sizeToDimension(n,i),a=rg.sizeFromDimension(n,i);return aV(e,t,r,o,a)},aj=e=>r8({axis:e.attributes.getInt("axis",1)}),aF=e=>r8({axis:e.attributes.getInt("axis",-1)}),aL=(e,t,r)=>{aH(t);let n=t[0].dims.slice(),i=rg.normalizeAxis(r.axis,n.length),o=n.length,a=i!==o-1,s=[],u=[],l=[],d;a&&((u=Array.from({length:o}).map((e,t)=>t))[i]=o-1,u[o-1]=i,u.map(e=>s.push(n[e])),d=r8({perm:u}),l=iY(e,t,d));let p=a?rg.sizeToDimension(s,o-1):rg.sizeToDimension(n,o-1),c=a?rg.sizeFromDimension(s,o-1):rg.sizeFromDimension(n,o-1),h=aV(e,a?l:t,r,p,c);return a?iY(e,h,d):h},aV=(e,t,r,n,i)=>{let o=aU(e,t[0],n,i,[n]),a=e.run({...az,cacheHint:r.cacheKey,get:()=>o},t),s=aq(e,t[0],n,i,o.output.dims,[n]),u=e.run({...aR,cacheHint:r.cacheKey,get:()=>s},[t[0],a]),l=aG(e,t[0],n,i,o.output.dims,s.output.dims);return[e.run({...aB,cacheHint:r.cacheKey,get:()=>l},[t[0],a,u])]},aU=(e,t,r,n,i)=>{let[o,a]=e.calculateTextureWidthAndHeight(t.dims,0),s=i.length;if(r<1||n<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==i.length)throw Error("Dimensionality of the output should be 1");if(i[0]!==r)throw Error("Shape of the output should be equal to logical row count");let u=rP(e.session.backend.glContext.version),l=`
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
      }`;return{...az,output:{dims:i,type:t.type,textureType:0},shaderSource:l}},aq=(e,t,r,n,i,o)=>{let[a,s]=e.calculateTextureWidthAndHeight(t.dims,0),u=o.length;if(r<1||n<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==o.length)throw Error("Dimensionality of the output should be 1");if(o[0]!==r)throw Error("Shape of the output should be equal to logical row count");if(1!==i.length)throw Error("Dimensionality of the intermediate results should be 1");if(i[0]!==r)throw Error("Shape of the intermediate results should be equal to logical row count");let l=rP(e.session.backend.glContext.version),d=`
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
      }`;return{...aR,output:{dims:o,type:t.type,textureType:0},shaderSource:d}},aG=(e,t,r,n,i,o)=>{let[a,s]=e.calculateTextureWidthAndHeight(t.dims,0),u=t.dims.length;if(r<1||n<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==i.length||1!==o.length)throw Error("Dimensionality of the intermediate results should be 1");if(i[0]!==r||o[0]!==r)throw Error("Shape of the intermediate results should be equal to logical row count");let l=`
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
    }`;return{...aB,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:l}},aH=e=>{if(!e||1!==e.length)throw Error("Softmax requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type")}}),sN=G(()=>{"use strict";nL(),rx(),rC(),aW={name:"Split",inputNames:["A"],inputTypes:[0]},aK=(e,t,r)=>{aQ(t);let n=rg.normalizeAxis(r.axis,t[0].dims.length),i=aZ(e,t,n,r),o=[];for(let a=0;a<i;++a)o.push(e.run({...aW,cacheHint:`${r.cacheKey};${a}`,get:()=>aJ(e,t[0],r,n,a)},t));return o},aX=e=>{let t=e.attributes.getInt("axis",0),r=e.attributes.getInts("split",[]),n=e.outputs.length;return r8({axis:t,split:r,numOutputs:n})},aZ=(e,t,r,n)=>{let[,i]=rb.splitShape(t[0].dims,r,n.split,n.numOutputs);return i.length},aJ=(e,t,r,n,i)=>{let[o,a]=rb.splitShape(t.dims,n,r.split,r.numOutputs),s=a[i],u=o[i],l=`
      float process(int indices[${u.length}]) {
        indices[${n}] += ${s};
        return _A(indices);
      }
    `;return{...aW,cacheHint:`${r.cacheKey}:${i}`,output:{dims:u,type:t.type,textureType:0},shaderSource:l}},aQ=e=>{if(!e||1!==e.length)throw Error("Split requires one input.");if("int8"!==e[0].type&&"uint8"!==e[0].type&&"int16"!==e[0].type&&"uint16"!==e[0].type&&"int32"!==e[0].type&&"uint32"!==e[0].type&&"float32"!==e[0].type&&"float64"!==e[0].type&&"bool"!==e[0].type)throw Error("Invalid input type.")}}),sC=G(()=>{"use strict";rx(),aY=(e,t,r)=>{a2(t);let n=rg.squeezeShape(t[0].dims,r);return[e.reshapeUnpacked(t[0],n)]},a0=(e,t)=>(a3(t),aY(e,[t[0]],Array.from(t[1].integerData))),a1=e=>e.attributes.getInts("axes"),a2=e=>{if(!e||1!==e.length)throw Error("Squeeze requires 1 input.");if("string"===e[0].type)throw Error("invalid input tensor types.")},a3=e=>{if(!e||2!==e.length)throw Error("Squeeze requires 2 inputs.");if("int32"!==e[1].type)throw Error("Invalid input type.")}}),sz=G(()=>{"use strict";rN(),rC(),a4=(e,t)=>{a5(t);let r={name:"Sum",inputNames:t.map((e,t)=>`X${t}`),inputTypes:Array(t.length).fill(0)};return[e.run({...r,get:()=>a6(e,t,r)},t)]},a6=(e,t,r)=>{let n=rP(e.session.backend.glContext.version),i=t[0].dims.slice(),o=`
      void main() {
        vec4 result = ${t.map((e,t)=>`${n.texture2D}(X${t},TexCoords)`).join(" + ")};
        ${n.output} = result;
      }
    `;return{...r,output:{dims:i,type:t[0].type,textureType:0},hasMain:!0,shaderSource:o}},a5=e=>{if(!e||0===e.length)throw Error("Sum requires inputs.");let t=e[0].dims.length;for(let r=1;r<e.length;r++){if(t!==e[r].dims.length)throw Error("Input shapes are mismatched.");for(let n=0;n<t;n++)if(e[0].dims[n]!==e[r].dims[n])throw Error("Input shapes are not matched.")}if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.");for(let t=1;t<e.length;t++)if(e[0].type!==e[t].type)throw Error("Input types are not matched.")}}),sR=G(()=>{"use strict";sy(),rC(),a8=(e,t)=>{a9(t);let r={name:"Tile",inputNames:["A"],inputTypes:[0]};return[e.run({...r,get:()=>a7(e,t,r)},t)]},a7=(e,t,r)=>{let n=t[0].dims.slice(),i=Array(n.length),o=[];for(let e=0;e<n.length;e++)i[e]=n[e]*t[1].numberData[e],o.push(`inputIdx[${e}] = int(mod(float(outputIdx[${e}]), ${n[e]}.));`);let a=i.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${o.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...r,output:{dims:i,type:t[0].type,textureType:0},shaderSource:s}},a9=e=>{if(!e||2!==e.length)throw Error("Tile requires 2 input.");if(1!==e[1].dims.length)throw Error("The second input shape must 1 dimension.");if(e[1].dims[0]!==e[0].dims.length)throw Error("Invalid input shape.");if(-1===or.indexOf(e[0].type))throw Error("Invalid input type.");if("int32"!==e[1].type&&"int16"!==e[1].type)throw Error("Invalid repeat type.")}}),sB=G(()=>{"use strict";rx(),se=(e,t,r)=>{sn(t);let n=rg.unsqueezeShape(t[0].dims,r);return[e.reshapeUnpacked(t[0],n)]},st=(e,t)=>(si(t),se(e,[t[0]],Array.from(t[1].integerData))),sr=e=>e.attributes.getInts("axes"),sn=e=>{if(!e||1!==e.length)throw Error("Unsqueeze requires 1 input.");if("string"===e[0].type)throw Error("invalid input tensor types.")},si=e=>{if(!e||2!==e.length)throw Error("Unsqueeze requires 2 inputs.");if("int32"!==e[1].type)throw Error("Invalid input type.")}}),sM=G(()=>{"use strict";nV(),nq(),nG(),nW(),sh(),sf(),sg(),sb(),s_(),sv(),sx(),sw(),s$(),su(),sT(),sI(),sS(),sO(),sA(),sP(),sk(),sD(),sN(),sC(),sz(),sR(),sm(),ib(),sB(),sE(),so=[["Abs","","6+",nY],["Acos","","7+",n0],["Add","","7+",nd],["And","","7+",np],["Asin","","7+",n1],["Atan","","7+",n2],["AveragePool","","7+",oG,oH],["BatchNormalization","","7+",r9,ne],["Cast","","6+",nw,n$],["Ceil","","6+",n8],["Clip","","6-10",n3,n4],["Clip","","11+",n6],["Concat","","4+",nO,nN],["Conv","","1+",iB,iV],["ConvTranspose","","1+",iH,iZ],["Cos","","7+",n7],["Div","","7+",nc],["Dropout","","7+",ii],["DepthToSpace","","1+",i5,i8],["Equal","","7+",nh],["Elu","","6+",n9,ie],["Exp","","6+",it],["Flatten","","1+",i9,oe],["Floor","","6+",ir],["FusedConv","com.microsoft","1+",iB,iV],["Gather","","1+",on,oi],["Gemm","","7-10",ou,od],["Gemm","","11+",ou,op],["GlobalAveragePool","","1+",oK,oX],["GlobalMaxPool","","1+",o2],["Greater","","7+",nf],["Identity","","1+",ii],["ImageScaler","","1+",om,og],["InstanceNormalization","","6+",ox,ow],["LeakyRelu","","6+",io,ia],["Less","","7+",nm],["LRN","","1+",oE,oA],["Log","","6+",is],["MatMul","","1+",iO,iE],["MaxPool","","1+",oZ,oJ],["Mul","","7+",ng],["Neg","","6+",iu],["Not","","1+",il],["Or","","7+",nb],["Pad","","2-10",oN,oC],["Pad","","11+",oz,oR],["Pow","","7+",ny],["PRelu","","7+",n_],["ReduceLogSum","","1+",aa,o7],["ReduceMax","","1+",an,o7],["ReduceMean","","1+",ar,o7],["ReduceMin","","1+",ai,o7],["ReduceProd","","1+",ao,o7],["ReduceSum","","1-12",at,o7],["ReduceSumSquare","","1+",as,o7],["Relu","","6+",id],["Reshape","","5+",au],["Resize","","10",ay,a_],["Resize","","11+",ay,av],["Shape","","1+",aI],["Sigmoid","","6+",ip],["Sin","","7+",ic],["Slice","","10+",aD],["Slice","","1-9",aE,aA],["Softmax","","1-12",aM,aj],["Softmax","","13+",aL,aF],["Split","","2-12",aK,aX],["Sqrt","","6+",ih],["Squeeze","","1-12",aY,a1],["Squeeze","","13+",a0],["Sub","","7+",nv],["Sum","","6+",a4],["Tan","","7+",im],["Tanh","","6+",ig],["Tile","","6+",a8],["Transpose","","1+",iY,i0],["Upsample","","7-8",ad,ap],["Upsample","","9",ad,ac],["Unsqueeze","","1-12",se,sr],["Unsqueeze","","13+",st],["Xor","","7+",nx]]}),sj=G(()=>{"use strict";sa=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,ss="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function sF(e,t){var r,n;let i,o=[],a=[],s=null!=t&&Array.isArray(t)&&0===t.length,u=null==t||s?null:(r=t,i=(n=e).length,rs((r=null==r?n.map((e,t)=>t):[].concat(r)).every(e=>e>=-i&&e<i),()=>`All values in axis param must be in range [-${i}, ${i}) but got axis ${r}`),rs(r.every(sL),()=>`All values in axis param must be integers but got axis ${r}`),r.map(e=>e<0?i+e:e)).sort(),l=0;for(let t=0;t<e.length;++t){if(null!=u){if(u[l]===t&&1!==e[t])throw Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(null==u[l]||u[l]>t)&&1===e[t]&&(o.push(e[t]),a.push(t)),u[l]<=t&&l++}1!==e[t]&&(o.push(e[t]),a.push(t))}return{newShape:o,keptDims:a}}function sL(e){return e%1==0}function sV(e){let t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}var sU,sq,sG,sH,sW,sK,sX,sZ,sJ,sQ,sY,s0,s1=G(()=>{"use strict";eD(),rx(),sU=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,t){let r=this.computeTexture(e,t);return t&&t.isPacked&&(r[0]/=2,r[1]/=2),t&&t.reverseWH?[r[1],r[0]]:r}computeTexture(e,t){let r=t&&t.isPacked;if(0===e.length)return r?[2,2]:[1,1];let n=this.maxTextureSize;if(t&&void 0!==t.breakAxis){let r=t.breakAxis>=e.length?1:e.slice(t.breakAxis).reduce((e,t)=>e*t),i=t.breakAxis<=0?1:e.slice(0,t.breakAxis).reduce((e,t)=>e*t);if(!(r>n)&&!(i>n))return[r,i];eO.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${t.breakAxis}`)}let i=e.slice(0);r&&(n*=2,1===(i=i.map((e,t)=>t>=i.length-2?i[t]%2==0?i[t]:i[t]+1:i[t])).length&&(i=[2,i[0]])),2!==i.length&&(i=sF(i).newShape);let o=function(e){if(0===e.length)return 1;let t=e[0];for(let r=1;r<e.length;r++)t*=e[r];return t}(i);return i.length<=1&&o<=n?[1,o]:2===i.length&&i[0]<=n&&i[1]<=n?i:3===i.length&&i[0]*i[1]<=n&&i[2]<=n?[i[0]*i[1],i[2]]:3===i.length&&i[0]<=n&&i[1]*i[2]<=n?[i[0],i[1]*i[2]]:4===i.length&&i[0]*i[1]*i[2]<=n&&i[3]<=n?[i[0]*i[1]*i[2],i[3]]:4===i.length&&i[0]<=n&&i[1]*i[2]*i[3]<=n?[i[0],i[1]*i[2]*i[3]]:r?sV(o/4).map(e=>2*e):sV(o)}}}),s2=G(()=>{"use strict";rx(),nU(),rN(),s1(),rL(),sq=class extends ni{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){return{offsetToCoords:new no(`
      vec2 offsetToCoords(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){return{coordsToOffset:new no(`
      int coordsToOffset(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let t=e.unpackedShape,r=[e.width,e.height],n={},i="getOutputCoords";switch(t.length){case 0:n[i]=this.getOutputScalarCoords();break;case 1:n[i]=this.getOutputPacked1DCoords(t,r);break;case 2:n[i]=this.getOutputPacked2DCoords(t,r);break;case 3:n[i]=this.getOutputPacked3DCoords(t,r);break;default:n[i]=this.getOutputPackedNDCoords(t,r)}let o=`
      void setOutput(vec4 val) {
        ${rP(this.context.glContext.version).output} = val;
      }
    `;return n.floatTextureSetRGBA=new no(o),n}getUnpackedOutputSamplingSnippet(e){let t=e.unpackedShape,r=[e.width,e.height],n={},i="getOutputCoords";switch(t.length){case 0:n[i]=this.getOutputScalarCoords();break;case 1:n[i]=this.getOutputUnpacked1DCoords(t,r);break;case 2:n[i]=this.getOutputUnpacked2DCoords(t,r);break;case 3:n[i]=this.getOutputUnpacked3DCoords(t,r);break;case 4:n[i]=this.getOutputUnpacked4DCoords(t,r);break;case 5:n[i]=this.getOutputUnpacked5DCoords(t,r);break;case 6:n[i]=this.getOutputUnpacked6DCoords(t,r);break;default:throw Error(`Unsupported output dimensionality: ${t.length}`)}let o=`
        void setOutput(float val) {
          ${rP(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `;return n.floatTextureSetR=new no(o),n}getOutputScalarCoords(){return new no(`
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
      `,new no(r)}getOutputPacked2DCoords(e,t){let r="";if(rd.arraysEqual(e,t))return r=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new no(r);let n=Math.ceil(e[1]/2);return r=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));

          int index = resTexRC.y * ${t[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${n}) * 2;
          int c = 2 * (index / ${n});

          return ivec2(r, c);
        }
      `,new no(r)}getOutputPacked3DCoords(e,t){let r=[t[0],t[1]],n=Math.ceil(e[2]/2),i=n*Math.ceil(e[1]/2),o=`
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
      `;return new no(o)}getOutputPackedNDCoords(e,t){let r=[t[0],t[1]],n=Math.ceil(e[e.length-1]/2),i=n*Math.ceil(e[e.length-2]/2),o=i,a="",s="b, r, c";for(let t=2;t<e.length-1;t++)o*=e[e.length-t-1],a=`
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
    `;return new no(u)}getOutputUnpacked1DCoords(e,t){let r=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new no(r)}getOutputUnpacked2DCoords(e,t){let r=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new no(r)}getOutputUnpacked3DCoords(e,t){let r="",n=e.length,i=null;n<2&&(i=[]),(i=Array(n-1))[n-2]=e[n-1];for(let t=n-3;t>=0;--t)i[t]=i[t+1]*e[t+1];let o=["r","c","d"],a=i.map((e,t)=>{let r=`int ${o[t]} = index / ${e}`,n=t===i.length-1?`int ${o[t+1]} = index - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("");return r=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${a}
          return ivec3(r, c, d);
        }
      `,new no(r)}getOutputUnpacked4DCoords(e,t){let r="",n=e.length,i=null;n<2&&(i=[]),(i=Array(n-1))[n-2]=e[n-1];for(let t=n-3;t>=0;--t)i[t]=i[t+1]*e[t+1];let o=["r","c","d","d2"],a=i.map((e,t)=>{let r=`int ${o[t]} = index / ${e}`,n=t===i.length-1?`int ${o[t+1]} = index - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("");return r=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${a}
          return ivec4(r, c, d, d2);
        }
      `,new no(r)}getOutputUnpacked5DCoords(e,t){let r="",n=e.length,i=null;n<2&&(i=[]),(i=Array(n-1))[n-2]=e[n-1];for(let t=n-3;t>=0;--t)i[t]=i[t+1]*e[t+1];let o=["r","c","d","d2","d3"],a=i.map((e,t)=>{let r=`int ${o[t]} = index / ${e}`,n=t===i.length-1?`int ${o[t+1]} = index - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("");return r=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${a}
          return ivec5(r, c, d, d2, d3);
        }
      `,new no(r)}getOutputUnpacked6DCoords(e,t){let r="",n=e.length,i=null;n<2&&(i=[]),(i=Array(n-1))[n-2]=e[n-1];for(let t=n-3;t>=0;--t)i[t]=i[t+1]*e[t+1];let o=["r","c","d","d2","d3","d4"],a=i.map((e,t)=>{let r=`int ${o[t]} = index / ${e}`,n=t===i.length-1?`int ${o[t+1]} = index - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("");return r=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${a}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new no(r)}getCommonUtilFuncs(){let e={},t="uvFromFlat";e[t]=new no(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),e[t="packedUVfrom1D"]=new no(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e[t="packedUVfrom2D"]=new no(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e[t="packedUVfrom3D"]=new no(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="sampleTexture";let r=rP(this.context.glContext.version);return e[t]=new no(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${r.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n],o=rR(r);i.isPacked?e[o]=this.getPackedSamplerFromInput(o,r,i):e[o]=this.getUnpackedSamplerFromInput(o,r,i);let a=(rs("u">typeof r&&0!==r.length,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)+"AtOutCoords");i.unpackedShape.length<=t.unpackedShape.length&&(i.isPacked?e[a]=this.getPackedSamplerAtOutputCoords(a,i,t,r):e[a]=this.getUnpackedSamplerAtOutputCoords(a,i,t,r))}),e}getPackedSamplerAtOutputCoords(e,t,r,n){let i=t.unpackedShape,o=r.unpackedShape,a=rR(n),s=i.length,u=o.length,l=rc.getBroadcastDims(i,o),d=rj(u),p=u-s,c,h=rF();c=0===s?"":u<2&&l.length>=1?"coords = 0;":l.map(e=>`coords.${h[e+p]} = 0;`).join(`
`);let f="";f=u<2&&s>0?"coords":i.map((e,t)=>`coords.${h[t+p]}`).join(", ");let m="return outputValue;",g=1===rg.size(i),b=1===rg.size(o);if(1!==s||g||b){if(g&&!b)m=1===u?`
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
    `;return new no(_,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,t,r,n){let i=[r.width,r.height],o=[t.width,t.height],a=t.unpackedShape.length,s=r.unpackedShape.length,u=t.unpackedShape,l=r.unpackedShape,d=rR(n);if(a===s&&rd.arraysEqual(o,i)){let t=`
          float ${e}() {
            return sampleTexture(${n}, TexCoords);
          }
        `;return new no(t,["coordinates.sampleTexture"])}let p=rj(s),c=rc.getBroadcastDims(u,l),h=s-a,f,m=rF();f=0===a?"":s<2&&c.length>=1?"coords = 0;":c.map(e=>`coords.${m[e+h]} = 0;`).join(`
`);let g="";g=s<2&&a>0?"coords":t.unpackedShape.map((e,t)=>`coords.${m[t+h]}`).join(", ");let b=`
        float ${e}() {
          ${p} coords = getOutputCoords();
          ${f}
          return ${d}(${g});
        }
      `;return new no(b,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,t,r){switch(r.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,t);case 1:return this.getPackedSampler1D(e,t,r);case 2:return this.getPackedSampler2D(e,t,r);case 3:return this.getPackedSampler3D(e,t,r);default:return this.getPackedSamplerND(e,t,r)}}getUnpackedSamplerFromInput(e,t,r){let n=r.unpackedShape;switch(n.length){case 0:return this.getUnpackedSamplerScalar(e,t,r);case 1:return this.getUnpackedSampler1D(e,t,r);case 2:return this.getUnpackedSampler2D(e,t,r);case 3:return this.getUnpackedSampler3D(e,t,r);case 4:return this.getUnpackedSampler4D(e,t,r);case 5:return this.getUnpackedSampler5D(e,t,r);case 6:return this.getUnpackedSampler6D(e,t,r);default:throw Error(`Unsupported dimension ${n.length}-D`)}}getPackedSamplerScalar(e,t){let r=rP(this.context.glContext.version),n=`
          vec4 ${e}() {
            return ${r.texture2D}(${t}, halfCR);
          }
        `;return new no(n)}getPackedSampler1D(e,t,r){let n=[r.width,r.height],i=[n[1],n[0]],o=rP(this.context.glContext.version),a=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${o.texture2D}(${t}, uv);
    }`;return new no(a,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,t,r){let n=r.unpackedShape,i=[r.width,r.height],o=rP(this.context.glContext.version),a=i[0],s=i[1];if(null!=i&&rd.arraysEqual(n,i)){let r=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${s}.0, ${a}.0);
        return ${o.texture2D}(${t}, uv);
      }`;return new no(r)}let u=Math.ceil(n[1]/2),l=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${i[1]}, ${i[0]}, ${u}, row, col);
      return ${o.texture2D}(${t}, uv);
    }`;return new no(l,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,t,r){let n=r.unpackedShape,i=[r.width,r.height],o=[i[0],i[1]],a=rP(this.context.glContext.version);if(1===n[0]){let i=n.slice(1),o=rB(n,i),a=JSON.parse(JSON.stringify(r));a.unpackedShape=o;let s=this.getPackedSamplerFromInput(e,t,a),u=`${s.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${rM(["b","row","col"],[1,2])});
      } `;return new no(u,s.dependencies)}let s=o[0],u=o[1],l=Math.ceil(n[2]/2),d=l*Math.ceil(n[1]/2),p=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${u}, ${s}, ${d}, ${l}, b, row, col);
      return ${a.texture2D}(${t}, uv);}`;return new no(p,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,t,r){let n=r.unpackedShape,i=n.length,o=[r.width,r.height],a=rP(this.context.glContext.version),s=[o[0],o[1]],u=s[1],l=s[0],d=Math.ceil(n[i-1]/2),p=d*Math.ceil(n[i-2]/2),c="int b, int row, int col",h=`b * ${p} + (row / 2) * ${d} + (col / 2)`;for(let e=2;e<i-1;e++)c=`int b${e}, `+c,p*=n[i-e-1],h=`b${e} * ${p} + `+h;let f=`vec4 ${e}(${c}) {
      int index = ${h};
      int texR = index / ${l};
      int texC = index - texR * ${l};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${l}, ${u});
      return ${a.texture2D}(${t}, uv);
    }`;return new no(f)}getUnpackedSamplerScalar(e,t,r){let[n,i]=[r.width,r.height];if(1===n&&1===i){let r=`
          float ${e}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new no(r,["coordinates.sampleTexture"])}let o=`
        float ${e}() {
          int offset_${t} = coordsToOffset(TexCoords, ${n}, ${i});
          vec2 uv = uvFromFlat(${n}, ${i}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new no(o,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,t,r){let n=r.width,i=r.height;if(1===i&&1===n){let r=`
        float ${e}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new no(r,["coordinates.sampleTexture"])}if(1===i){let r=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${n}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new no(r,["coordinates.sampleTexture"])}if(1===n){let r=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new no(r,["coordinates.sampleTexture"])}let o=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${n}, ${i}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new no(o,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,t,r){let n=r.unpackedShape,i=[r.height,r.width];if(null!=i&&rd.arraysEqual(n,i)){let r=i[1],n=i[0],o=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${r}.0, ${n}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new no(o,["coordinates.sampleTexture"])}let{newShape:o,keptDims:a}=sF(n);if(o.length<n.length){let i=rB(n,o),s=JSON.parse(JSON.stringify(r));s.unpackedShape=i;let u=`
          ${this.getUnpackedSamplerFromInput(e,t,s).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${rM(["col","row"],a)});
          }
        `;return new no(u,["coordinates.sampleTexture"])}let s=i[1],u=i[0];if(1===u){let r=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${s}, ${u});
            float index = dot(vec3(row, col, offset_${t}), vec3(${n[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${s}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new no(r,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(1===s){let r=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${s}, ${u});
            float index = dot(vec3(row, col, offset_${t}), vec3(${n[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${u}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new no(r,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let l=`
        float ${e}(int row, int col) {
          int index = col * ${n[1]} + row;
          vec2 uv = uvFromFlat(${s}, ${u}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new no(l,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,t,r){let n=r.unpackedShape,i=n[1]*n[2],o=n[2],{newShape:a,keptDims:s}=sF(n);if(a.length<n.length){let i=rB(n,a),o=JSON.parse(JSON.stringify(r));o.unpackedShape=i;let u=this.getUnpackedSamplerFromInput(e,t,o),l=s.reverse(),d=`
          ${u.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${rM(["batch","col","row"],l)});
          }
        `;return new no(d,u.dependencies)}let u=r.width,l=r.height,d=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${o} + row;
            vec2 uv = uvFromFlat(${u}, ${l}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new no(d,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,t,r){let n=r.unpackedShape,i=n[3],o=n[2]*i,a=n[1]*o,s=r.width,u=r.height,l=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${a} + col * ${o} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${s}, ${u}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new no(l,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,t,r){let n=r.unpackedShape,i=n[4],o=n[3]*i,a=n[2]*o,s=n[1]*a,{newShape:u,keptDims:l}=sF(n);if(u.length<n.length){let i=rB(n,u),o=JSON.parse(JSON.stringify(r));o.unpackedShape=i;let a=`
          ${this.getUnpackedSamplerFromInput(e,t,o).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${rM(["row","col","depth","depth2","depth3"],l)});
          }
        `;return new no(a,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let d=r.width,p=r.height,c=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${s} + col * ${a} + depth * ${o} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${d}, ${p}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new no(c,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,t,r){let n=r.unpackedShape,i=n[5],o=n[4]*i,a=n[3]*o,s=n[2]*a,u=n[1]*s,{newShape:l,keptDims:d}=sF(n);if(l.length<n.length){let i=rB(n,l),o=JSON.parse(JSON.stringify(r));o.unpackedShape=i;let a=`
            ${this.getUnpackedSamplerFromInput(e,t,o).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${rM(["row","col","depth","depth2","depth3","depth4"],d)});
            }
          `;return new no(a,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=r.width,c=r.height,h=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${u} + col * ${s} + depth * ${a} +
            depth2 * ${o} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${p}, ${c}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new no(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,t=e.shape.length,r=e.strides,n=e.width,i=e.height,o=[];for(let e=0;e<t-1;++e)o.push(`
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
    `;return{toVec:new no(a,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((t,r)=>{let n=this.context.inputTextureLayouts[r],i=(n.unpackedShape.length>0?n.unpackedShape:n.shape).length,o=`_${t}`;e[o]=new no(this.getValueFromSingle(t,i,n.width,n.height,!1),[`shapeUtils.indicesToOffset${o}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),e[o+="_T"]=new no(this.getValueFromSingle(t,i,n.width,n.height,!0),[`shapeUtils.indicesToOffset${o}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,t,r,n,i){let o=`_${e}`;i&&(o+="_T");let a=rP(this.context.glContext.version);return`
        float ${o}(int m[${t}]) {
          int offset = indicesToOffset${o}(m);
          vec2 coords = offsetToCoords(offset, ${r}, ${n});
          float value = getColorAsFloat(${a.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,t,r,n,i){let o=`_${e}_Pack`;i&&(o+="_T");let a=rP(this.context.glContext.version);return`
        vec4 ${o}(int m[${t}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${r}, ${n});
          return ${a.texture2D}(${e}, coords);
        }
        `}}}),s3=G(()=>{"use strict";nU(),sG=class e extends ni{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new no(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new no(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let t=e.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new no(`
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
        `)}}decodeUint8(){let t=e.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new no(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${t}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),t=new Uint32Array(e),r=new Uint8Array(e);if(t[0]=0xdeadbeef,239===r[0])return!0;if(222===r[0])return!1;throw Error("unknown endianness")}}}),s4=G(()=>{"use strict";nU(),rN(),sH=class extends ni{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=rP(this.context.glContext.version);return{setFragColor:new no(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new no(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}}),s6=G(()=>{"use strict";nU(),sW=class e extends ni{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,t={};return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n].unpackedShape;if(i.length<=e){let n=i.length,o=e-n,a=`bcastIndices_${r}`,s="";for(let e=0;e<n;++e)s+=`
          realIndices[${e}] = int( mod(float(bcastedIndices[${o+e}]), ${i[e]}.0) );
          `;let u=`
        void ${a} (int bcastedIndices[${e}], out int realIndices[${n}]) {
          ${s}
        }
        `;t[a]=new no(u)}}),t}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,t={};return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n].shape;if(!(i.length<2||i.length>e)){let n=i.length,o=e-n,a=`bcastMatmulIndices_${r}`,s="";for(let e=0;e<n-2;++e)s+=`
          realIndices[${e}] = int( mod(float(bcastedIndices[${o+e}]), ${i[e]}.0) );
          `;let u=`
        void ${a}(int bcastedIndices[${e}], out int realIndices[${n}]) {
          ${s}
          realIndices[${n-1}] = bcastedIndices[${e-1}];
          realIndices[${n-2}] = bcastedIndices[${e-2}];
        }
        `;t[a]=new no(u)}}),t}indicesToOffset(){let t={};return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n].shape,o=this.context.inputTextureLayouts[n].strides,a=i.length,s=`indicesToOffset_${r}`;t[s]=new no(e.indexToOffsetSingle(s,a,o)),t[s=`indicesToOffset_${r}_T`]=new no(e.indexToOffsetSingle(s,a,o.slice().reverse()))}),t}static indexToOffsetSingle(e,t,r){let n="";for(let e=t-1;e>=0;--e)n+=`
        offset += indices[${e}] * ${r[e]};
        `;return`
      int ${e}(int indices[${t}]) {
        int offset = 0;
        ${n}
        return offset;
      }
      `}offsetToIndices(){let t={};return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n].shape,o=this.context.inputTextureLayouts[n].strides,a=i.length,s=`offsetToIndices_${r}`;t[s]=new no(e.offsetToIndicesSingle(s,a,o)),t[s=`offsetToIndices_${r}_T`]=new no(e.offsetToIndicesSingle(s,a,o.slice().reverse()))}),t}static offsetToIndicesSingle(e,t,r){let n=[];for(let e=0;e<t-1;++e)n.push(`
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
        `;e[o]=new no(s)}),e}}}),s5=G(()=>{"use strict";nU(),sK=class extends ni{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let e=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},r={};for(let n in t){let i=`${n}Vec`,o="";for(let r=0;r<e;++r)o+=`
          dest[${r}] ${t[n]} src[${r}];
          `;let a=`
        void ${i}(int src[${e}], out int dest[${e}]) {
          ${o}
        }
        `;r[i]=new no(a)}return r}copyVec(){let e=this.context.outputTextureLayout.shape.length,t="";for(let r=0;r<e;++r)t+=`
        dest[${r}] = src[${r}];
        `;let r=`
      void copyVec(int src[${e}], out int dest[${e}]) {
        ${t}
      }
      `;return{copyVec:new no(r)}}setVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
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
        `;return{setVecItem:new no(r)}}getVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
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
    `;return{getVecItem:new no(r)}}}}),s8=G(()=>{"use strict";s2(),s3(),s4(),s6(),s5(),sX={encoding:sG,fragcolor:sH,vec:sK,shapeUtils:sW,coordinates:sq}}),s7=G(()=>{"use strict";nU(),sj(),s8(),rN(),sZ=class{constructor(e,t,r,n){this.libs={},this.glslLibRoutineDependencyGraph={},this.context=new nn(e,t,r,n),Object.keys(sX).forEach(e=>{let t=new sX[e](this.context);this.libs[e]=t});let i=this.glslLibRoutineDependencyGraph;for(let e in this.libs){let t=this.libs[e].getFunctions();for(let r in t){let n=e+"."+r,o;i[n]?(o=i[n]).routineBody=t[r].routineBody:(o=new na(n,t[r].routineBody),i[n]=o);let a=t[r].dependencies;if(a)for(let e=0;e<a.length;++e)if(i[a[e]])o.addDependency(i[a[e]]);else{let t=new na(a[e]);i[a[e]]=t,o.addDependency(t)}}}}preprocess(){var e,t;let r,n,i=this.context.programInfo,o=i.shaderSource;return this.context.programInfo.hasMain||(o=`${o}
      ${e=this.context.glContext.version,t=this.context.outputTextureLayout.shape.length,r=rP(e),`
  void main() {
    int indices[${t}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${r.output} = result;
  }
  `}`),o=function(e){let t={},r;for(;null!==(r=sa.exec(e));){let e=r[3].split(",").map(e=>{let t=e.trim().split(" ");return t&&2===t.length?{type:t[0],name:t[1]}:null}).filter(e=>null!==e);t[r[2]]={params:e,body:r[4]}}for(let n in t){let i=RegExp(ss.replace("__FUNC__",n),"gm");for(;null!==(r=i.exec(e));){let i=r[1],o=r[2],a=r[3].split(","),s=i?`${i} ${o};`:"",u=t[n].body,l="";t[n].params.forEach((e,t)=>{e&&(l+=`${e.type} ${e.name} = ${a[t]};
`)}),u=(u=`${l}
 ${u}`).replace("return",`${o} = `);let d=`
      ${s}
      {
        ${u}
      }
      `;e=e.replace(r[0],d)}}return e.replace(sa,"")}(o),`${n=rP(this.context.glContext.version),`${n.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${n.varyingFrag} vec2 TexCoords;
    ${n.outputDeclaration}
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

    `}
    ${this.getUniforms(i.inputNames,i.variables)}
    ${this.getImports(o)}
    ${o}`}getImports(e){let t=this.selectGlslLibRoutinesToBeIncluded(e);if(0===t.length)return"";let r="";for(let e=0;e<t.length;++e)if(t[e].routineBody)r+=t[e].routineBody+`
`;else throw Error(`Missing body for the Glsl Library routine: ${t[e].name}`);return r}selectGlslLibRoutinesToBeIncluded(e){let t=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(r=>{let n=r.split(".")[1];-1!==e.indexOf(n)&&t.push(this.glslLibRoutineDependencyGraph[r])}),ns.returnOrderedNodes(t)}getUniforms(e,t){let r=[];if(e)for(let t of e)r.push(`uniform sampler2D ${t};`);if(t)for(let e of t)r.push(`uniform ${e.type} ${e.name}${e.arrayLength?`[${e.arrayLength}]`:""};`);return r.join(`
`)}}}),s9=G(()=>{"use strict";ey(),eD(),s7(),rN(),sJ=class{constructor(e,t,r){this.profiler=e,this.glContext=t,this.textureLayoutStrategy=r,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let n=this.glContext.gl,i=e.program;n.useProgram(i);try{this.bindOutput(r),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],t)}catch(t){throw eO.error("ProgramManager",e.programInfo.shaderSource),t}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,t,r){return this.profiler.event("backend","ProgramManager.build",()=>{let n=new sZ(this.glContext,e,t,r),i=n.preprocess(),o=this.compile(i);return{programInfo:e,program:o,uniformLocations:this.getUniformLocations(o,n.context.programInfo.inputNames,n.context.programInfo.variables),attribLocations:this.getAttribLocations(o)}})}compile(e){if(!this.vertexShader){let e;eO.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let t=(e=rP(this.glContext.version),`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`);this.vertexShader=this.glContext.compileShader(t,this.glContext.gl.VERTEX_SHADER)}b.debug&&eO.verbose("ProrgramManager",`FragShader:
${e}
`);let t=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),r=this.glContext.createProgram(this.vertexShader,t);return this.glContext.deleteShader(t),r}bindOutput(e){let t=e.width,r=e.height;eO.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${t}/${r}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,t,r)}bindAttributes(e){let t=e.position,r=e.textureCoord;this.glContext.setVertexAttributes(t,r),this.attributesBound=!0}bindUniforms(e,t,r){let n=this.glContext.gl,i=0;for(let{name:o,type:a,location:s,arrayLength:u}of e){let e=t.find(e=>e.name===o)?.data;if("sampler2D"!==a&&!e)throw Error(`variable '${o}' does not have data defined in program info`);switch(a){case"sampler2D":this.bindTexture(r[i],s,i),i++;break;case"float":u?n.uniform1fv(s,e):n.uniform1f(s,e);break;case"int":u?n.uniform1iv(s,e):n.uniform1i(s,e);break;default:throw Error(`Uniform not implemented: ${a}`)}}}bindTexture(e,t,r){this.glContext.bindTextureToUniform(e.texture,r,t)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,t,r){let n=[];if(t)for(let r of t)n.push({name:r,type:"sampler2D",location:this.getUniformLocation(e,r)});if(r)for(let t of r)n.push({...t,location:this.getUniformLocation(e,t.name)});return n}getUniformLocation(e,t){let r=this.glContext.gl.getUniformLocation(e,t);if(null===r)throw Error(`Uniform ${t} not found.`);return r}getAttribLocation(e,t){return this.glContext.gl.getAttribLocation(e,t)}}}),ue=G(()=>{"use strict";eD(),nM(),sQ=class{constructor(e,t,r,n){this.glContext=e,this.layoutStrategy=t,this.profiler=r,this.config=n,this.pendingRead=new Map,n.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,t,r,n){let i=this.toEncoderType(e),o=this.glContext.getEncoder(i,t.channels||1,n);if(t.isPacked&&1===n)throw Error("not implemented");let a=t.width,s=t.height,u,l;if(this.config.reuseTextures){u=`${a}x${s}_${o.format}_${o.internalFormat}_${o.textureType}`,(l=this.inUseTextures.get(u))||(l=[],this.inUseTextures.set(u,l));let t=this.idleTextures.get(u);if(t&&t.length>0){let i=t.pop();return l.push(i),1===n&&this.glContext.updateTexture(i,a,s,o,this.toTextureData(e,r)),i}}eO.verbose("TextureManager",`Creating new texture of size ${t.width}x${t.height}`);let d=this.glContext.allocateTexture(a,s,o,this.toTextureData(e,r));return this.config.reuseTextures&&(l.push(d),this.textureLookup.set(d,u)),d}readTexture(e,t,r){return r||(r=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let n=e.shape.reduce((e,t)=>e*t)*r,i=this.glContext.readTexture(e.texture,e.width,e.height,n,this.toEncoderType(t),r);return this.toTensorData(t,i)})}async readTextureAsync(e,t,r){let n=e.tensor.dataId;if(r||(r=1),this.pendingRead.has(n)){let e=this.pendingRead.get(n);return new Promise(t=>e?.push(t))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(n,[]);let i=e.shape.reduce((e,t)=>e*t)*r;await this.glContext.createAndWaitForFence();let o=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(t),r),a=this.toTensorData(t,o),s=this.pendingRead.get(n);return this.pendingRead.delete(n),s?.forEach(e=>e(a)),a})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let t=e.shape.reduce((e,t)=>e*t),r=this.glContext.readTexture(e.texture,e.width,e.height,4*t,"byte",4);return new Float32Array(r.buffer,r.byteOffset,t)})}releaseTexture(e,t){let r;if(this.config.reuseTextures&&(r=this.textureLookup.get(e.texture))){t&&this.textureLookup.delete(r);let n=this.inUseTextures.get(r);if(n){let t=n.indexOf(e.texture);if(-1!==t){n.splice(t,1);let i=this.idleTextures.get(r);i||(i=[],this.idleTextures.set(r,i)),i.push(e.texture)}}}(!r||t)&&(eO.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,t){switch(e){case"int16":return t instanceof Int16Array?t:Int16Array.from(t);case"int32":return t instanceof Int32Array?t:Int32Array.from(t);case"int8":return t instanceof Int8Array?t:Int8Array.from(t);case"uint16":return t instanceof Uint16Array?t:Uint16Array.from(t);case"uint32":return t instanceof Uint32Array?t:Uint32Array.from(t);case"uint8":case"bool":return t instanceof Uint8Array?t:Uint8Array.from(t);case"float32":return t instanceof Float32Array?t:Float32Array.from(t);case"float64":return t instanceof Float64Array?t:Float64Array.from(t);default:throw Error(`TensorData type ${e} is not supported`)}}toTextureData(e,t){if(t)return t instanceof Float32Array?t:new Float32Array(t)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}}),ut=G(()=>{"use strict";eD(),eN(),nF(),sM(),s9(),s1(),ue(),sY=class{constructor(e,t){this.backend=e,this.context=t,this.layoutStrategy=new sU(e.glContext.maxTextureSize),this.programManager=new sJ(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new sQ(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:"full"===e.textureCacheMode}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new r6(this)}onGraphInitialized(e){let t=e.getValues().filter(e=>-1===e.from&&e.tensor).map(e=>e.tensor.dataId);this.initializers=new Set(t)}isInitializer(e){return!!this.initializers&&this.initializers.has(e)}addInitializer(e){this.initializers.add(e)}getTextureData(e,t){return t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,r=!1){eO.verbose("WebGLSessionHandler","Storing Texture data in cache"),r?this.packedTextureDataCache.set(e,t):this.unpackedTextureDataCache.set(e,t)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,t,r){let n=function(e,t,r){for(let n of r){let r=n[0],i=n[1],o=n[2],a=n[3],s=n[4];if(e.opType===r){for(let e of t)if((e.domain===i||"ai.onnx"===e.domain&&""===i)&&function(e,t){if(t.endsWith("+")){let r=Number.parseInt(t.substring(0,t.length-1),10);return!isNaN(r)&&r<=e}if(2!==t.split("-").length)return Number.parseInt(t,10)===e;{let r=t.split("-"),n=Number.parseInt(r[0],10),i=Number.parseInt(r[1],10);return!isNaN(n)&&!isNaN(i)&&n<=e&&e<=i}}(e.version,o))return{opImpl:a,opInit:s}}}throw TypeError(`cannot resolve operator '${e.opType}' with opsets: ${t.map(e=>`${e.domain||"ai.onnx"} v${e.version}`).join(", ")}`)}(e,t,so);return{impl:n.opImpl,context:n.opInit?n.opInit(e,r):e}}}}),ur=G(()=>{"use strict";ey(),nM(),nM(),rL(),s0=class{constructor(e,t){this.frameBufferBound=!1,this.itemsToPoll=[],this.gl=e,this.version=t,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,t,r,n){let i=this.gl,o=i.createTexture();i.bindTexture(i.TEXTURE_2D,o),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let a=n?r.encode(n,e*t):null;return i.texImage2D(i.TEXTURE_2D,0,r.internalFormat,e,t,0,r.format,r.textureType,a),this.checkError(),o}updateTexture(e,t,r,n,i){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e);let a=n.encode(i,t*r);o.texSubImage2D(o.TEXTURE_2D,0,0,0,t,r,n.format,n.textureType,a),this.checkError()}attachFramebuffer(e,t,r){let n=this.gl;n.bindTexture(n.TEXTURE_2D,e),n.bindFramebuffer(n.FRAMEBUFFER,this.framebuffer),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0),this.checkError(),n.viewport(0,0,t,r),n.scissor(0,0,t,r)}readTexture(e,t,r,n,i,o){let a=this.gl;o||(o=1),this.frameBufferBound||this.attachFramebuffer(e,t,r);let s=this.getEncoder(i,o),u=s.allocate(t*r);return a.bindTexture(a.TEXTURE_2D,e),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),a.readPixels(0,0,t,r,a.RGBA,s.textureType,u),this.checkError(),s.decode(u,n)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,t){let r=this.gl;r.vertexAttribPointer(e,3,r.FLOAT,!1,20,0),r.enableVertexAttribArray(e),-1!==t&&(r.vertexAttribPointer(t,2,r.FLOAT,!1,20,12),r.enableVertexAttribArray(t)),this.checkError()}createProgram(e,t){let r=this.gl,n=r.createProgram();return r.attachShader(n,e),r.attachShader(n,t),r.linkProgram(n),n}compileShader(e,t){let r=this.gl,n=r.createShader(t);if(!n)throw Error(`createShader() returned null with type ${t}`);if(r.shaderSource(n,e),r.compileShader(n),!1===r.getShaderParameter(n,r.COMPILE_STATUS))throw Error(`Failed to compile shader: ${r.getShaderInfoLog(n)}
Shader source:
${e}`);return n}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,t,r){let n=this.gl;n.activeTexture(n.TEXTURE0+t),this.checkError(),n.bindTexture(n.TEXTURE_2D,e),this.checkError(),n.uniform1i(r,t),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(b.debug){let e=this.gl,t=e.getError(),r="";switch(t){case e.NO_ERROR:return;case e.INVALID_ENUM:r="INVALID_ENUM";break;case e.INVALID_VALUE:r="INVALID_VALUE";break;case e.INVALID_OPERATION:r="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:r="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:r="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:r="CONTEXT_LOST_WEBGL";break;default:r=`Unknown WebGL Error: ${t.toString(16)}`}throw Error(r)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,t,r=0){if(2===this.version)return new rY(this.gl,t);switch(e){case"float":return 1===r||this.isRenderFloat32Supported?new r0(this.gl,t):new r0(this.gl,t,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw Error("not implemented");case"byte":return new r1(this.gl,t);default:throw Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let t=0;t<this.maxTextureImageUnits;++t)e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,t=e.createBuffer();if(!t)throw Error("createBuffer() returned null");let r=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),this.checkError(),t}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),1===this.version&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){2===this.version?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);let r=2===this.version?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,r,1,1,0,e.RGBA,e.FLOAT,null);let n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(t),e.deleteFramebuffer(n),i}checkRenderFloat32(){if(2===this.version){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(2===this.version){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,t,r,n,i,o;try{t=e.createTexture(),r=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,t);let a=2===this.version?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,a,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),e.enable(e.BLEND),!!(n=e.createShader(e.VERTEX_SHADER))&&(e.shaderSource(n,"void main(){}"),e.compileShader(n),!!(i=e.createShader(e.FRAGMENT_SHADER)))&&(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),!!(o=e.createProgram()))&&(e.attachShader(o,n),e.attachShader(o,i),e.linkProgram(o),e.useProgram(o),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),o&&e.deleteProgram(o),n&&e.deleteShader(n),i&&e.deleteShader(i),r&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(r)),t&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(t))}}beginTimer(){if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension,r=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,r),r}throw Error("WebGL1 profiling currently not supported.")}endTimer(){if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension;e.endQuery(t.TIME_ELAPSED_EXT);return}throw Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let t=!1,r=!1;if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let n=this.gl,i=this.disjointTimerQueryWebgl2Extension;t=n.getQueryParameter(e,n.QUERY_RESULT_AVAILABLE),r=n.getParameter(i.GPU_DISJOINT_EXT)}else throw Error("WebGL1 profiling currently not supported");return t&&!r}getTimerResult(e){let t=0;if(2===this.version){let r=this.gl;t=r.getQueryParameter(e,r.QUERY_RESULT),r.deleteQuery(e)}else throw Error("WebGL1 profiling currently not supported");return t/1e6}async waitForQueryAndGetTime(e){return await rz(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,r=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),t=null===r?()=>!0:()=>{let t=e.clientWaitSync(r,0,0);return t===e.ALREADY_SIGNALED||t===e.CONDITION_SATISFIED},{query:r,isFencePassed:t}}async pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=function(e){let t=0;for(;t<e.length&&e[t]();++t);return t-1}(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,t){this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1||await rz(()=>(this.pollItems(),0===this.itemsToPoll.length))}}});function un(e,t){let r,n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1};if((!t||"webgl2"===t)&&(r=e.getContext("webgl2",n)))try{return new s0(r,2)}catch(e){eO.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${e}`)}if((!t||"webgl"===t)&&(r=e.getContext("webgl",n)||e.getContext("experimental-webgl",n)))try{return new s0(r,1)}catch(e){eO.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${e}`)}throw Error("WebGL is not supported")}var ui,uo,ua,us,uu,ul,ud,up,uc,uh,uf,um,ug,ub,uy,u_,uv,ux,uw,u$=G(()=>{"use strict";eD(),ur(),ui={}}),uT=G(()=>{"use strict";ey(),eD(),ut(),u$(),uo=class{get contextId(){return b.webgl.contextId}set contextId(e){b.webgl.contextId=e}get matmulMaxBatchSize(){return b.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){b.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return b.webgl.textureCacheMode}set textureCacheMode(e){b.webgl.textureCacheMode=e}get pack(){return b.webgl.pack}set pack(e){b.webgl.pack=e}get async(){return b.webgl.async}set async(e){b.webgl.async=e}initialize(){try{return this.glContext=function e(t){let r;if((!t||"webgl2"===t)&&"webgl2"in ui?r=ui.webgl2:(!t||"webgl"===t)&&"webgl"in ui&&(r=ui.webgl),!r)try{let e=function(){if(typeof OffscreenCanvas>"u")throw TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}();r=un(e,t)}catch{r=un(function(){if(typeof document>"u")throw TypeError("failed to create canvas: document is not supported");let e=document.createElement("canvas");return e.width=1,e.height=1,e}(),t)}t=t||1===r.version?"webgl":"webgl2";let n=r.gl;return ui[t]=r,n.isContextLost()?(delete ui[t],e(t)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),r)}(this.contextId),"number"!=typeof this.matmulMaxBatchSize&&(this.matmulMaxBatchSize=16),"string"!=typeof this.textureCacheMode&&(this.textureCacheMode="full"),"boolean"!=typeof this.pack&&(this.pack=!1),"boolean"!=typeof this.async&&(this.async=!1),eO.setWithEnv(b),b.webgl.context||Object.defineProperty(b.webgl,"context",{value:this.glContext.gl}),eO.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return eO.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new sY(this,e)}dispose(){this.glContext.dispose()}}}),uI=G(()=>{"use strict";uT(),ua=new Map,us={webgl:new uo}}),uS=G(()=>{"use strict";eD(),uu=class{constructor(e,t){this.op=e,this.node=t}},ul=class{constructor(e,t,r){this.graph=e,this.profiler=r,this.initialize(t)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let t=this.graph.getNodes();if(t.length!==e.length)throw Error("The size of nodes and OPs do not match.");this._ops=e.map((e,r)=>new uu(e,t[r])),this.reset(),this._starter=[],this._ops.forEach((e,t)=>{let r=!0;for(let t of e.node.inputs)if(!this._values[t]&&-1===this.graph.getInputIndices().indexOf(t)){r=!1;break}r&&this._starter.push(t)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,t){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let r=e.createInferenceHandler(),n=this.graph.getInputIndices();if(t.length!==n.length)throw Error(`number of input tensors don't match the number of inputs to the model: actual: ${t.length} expected: ${n.length}`);t.forEach((e,t)=>{let r=n[t];this._values[r]=e});let i=this._starter.slice(0),o=this.graph.getValues(),a=this.graph.getNodes(),s=0;for(;s<i.length;){let e=i[s++],t=this._ops[e],n=t.node.inputs.map(e=>this._values[e]);if(-1!==n.indexOf(void 0))throw Error(`unresolved input detected: op: ${t.node}`);eO.verbose("ExecPlan",`Running op:${t.node.name} (${n.map((e,r)=>`'${t.node.inputs[r]}': ${e.type}[${e.dims.join(",")}]`).join(", ")})`);let u=await this.profiler.event("node",t.node.name,async()=>t.op.impl(r,n,t.op.context));if(u.length!==t.node.outputs.length)throw Error("the size of output does not match model definition.");u.forEach((e,r)=>{let n=t.node.outputs[r];if(this._values[n])throw Error(`output [${n}] already has value: op:${t.node.name}`);this._values[n]=e});let l=new Set;u.forEach((e,r)=>{for(let e of o[t.node.outputs[r]].to){let t=a[e],r=!0;for(let e of t.inputs)if(!this._values[e]){r=!1;break}r&&l.add(e)}}),i.push(...l)}let u=[];for(let e=0;e<this.graph.getOutputIndices().length;e++){let t=this.graph.getOutputIndices()[e],r=this._values[t];if(void 0===r)throw Error(`required output [${t}] does not have value`);0===t?await r.getData():r.data,u.push(r)}return eO.verbose("ExecPlan","disposing of inferenceHandler"),r.dispose(),u})}}}),uO=G(()=>{"use strict";tZ(),ud=X(ra()),rA(),rx(),up=class e{constructor(t){if(this._attributes=new Map,null!=t){for(let r of t)r instanceof ud.onnx.AttributeProto?this._attributes.set(r.name,[e.getValue(r),e.getType(r)]):r instanceof e8.Attribute&&this._attributes.set(r.name(),[e.getValue(r),e.getType(r)]);if(this._attributes.size<t.length)throw Error("duplicated attribute names")}}set(e,t,r){this._attributes.set(e,[r,t])}delete(e){this._attributes.delete(e)}getFloat(e,t){return this.get(e,"float",t)}getInt(e,t){return this.get(e,"int",t)}getString(e,t){return this.get(e,"string",t)}getTensor(e,t){return this.get(e,"tensor",t)}getFloats(e,t){return this.get(e,"floats",t)}getInts(e,t){return this.get(e,"ints",t)}getStrings(e,t){return this.get(e,"strings",t)}getTensors(e,t){return this.get(e,"tensors",t)}get(e,t,r){let n=this._attributes.get(e);if(void 0===n){if(void 0!==r)return r;throw Error(`required attribute not found: ${e}`)}if(n[1]!==t)throw Error(`type mismatch: expected ${t} but got ${n[1]}`);return n[0]}static getType(e){let t=e instanceof ud.onnx.AttributeProto?e.type:e.type();switch(t){case ud.onnx.AttributeProto.AttributeType.FLOAT:return"float";case ud.onnx.AttributeProto.AttributeType.INT:return"int";case ud.onnx.AttributeProto.AttributeType.STRING:return"string";case ud.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case ud.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case ud.onnx.AttributeProto.AttributeType.INTS:return"ints";case ud.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case ud.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw Error(`attribute type is not supported yet: ${ud.onnx.AttributeProto.AttributeType[t]}`)}}static getValue(e){let t=e instanceof ud.onnx.AttributeProto?e.type:e.type();if(t===ud.onnx.AttributeProto.AttributeType.GRAPH||t===ud.onnx.AttributeProto.AttributeType.GRAPHS)throw Error("graph attribute is not supported yet");let r=this.getValueNoCheck(e);if(t===ud.onnx.AttributeProto.AttributeType.INT&&rm.isLong(r))return rm.longToNumber(r);if(t===ud.onnx.AttributeProto.AttributeType.INTS){let e=Array(r.length);for(let t=0;t<r.length;t++){let n=r[t];e[t]=rm.longToNumber(n)}return e}if(t===ud.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof ud.onnx.AttributeProto?rE.fromProto(r):rE.fromOrtTensor(r);if(t===ud.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof ud.onnx.AttributeProto)return r.map(e=>rE.fromProto(e));if(e instanceof e8.Attribute)return r.map(e=>rE.fromOrtTensor(e))}return t===ud.onnx.AttributeProto.AttributeType.STRING&&e instanceof ud.onnx.AttributeProto?ru(r):t===ud.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof ud.onnx.AttributeProto?r.map(ru):r}static getValueNoCheck(e){return e instanceof ud.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case ud.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case ud.onnx.AttributeProto.AttributeType.INT:return e.i;case ud.onnx.AttributeProto.AttributeType.STRING:return e.s;case ud.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case ud.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case ud.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case ud.onnx.AttributeProto.AttributeType.INTS:return e.ints;case ud.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case ud.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case ud.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw Error(`unsupported attribute type: ${ud.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case e7.AttributeType.FLOAT:return e.f();case e7.AttributeType.INT:return e.i();case e7.AttributeType.STRING:return e.s();case e7.AttributeType.TENSOR:return e.t();case e7.AttributeType.GRAPH:return e.g();case e7.AttributeType.FLOATS:return e.floatsArray();case e7.AttributeType.INTS:{let t=[];for(let r=0;r<e.intsLength();r++)t.push(e.ints(r));return t}case e7.AttributeType.STRINGS:{let t=[];for(let r=0;r<e.stringsLength();r++)t.push(e.strings(r));return t}case e7.AttributeType.TENSORS:{let t=[];for(let r=0;r<e.tensorsLength();r++)t.push(e.tensors(r));return t}default:throw Error(`unsupported attribute type: ${e7.AttributeType[e.type()]}`)}}}}),uE=G(()=>{"use strict";uO(),tZ(),uc=X(ra()),rA(),rx(),uh={from:(e,t)=>new ug(e,t)},uf=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=rf.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},um=class{constructor(e,t){e instanceof uc.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new up(e.attribute)):e instanceof tt.Node&&(this.name=t??e.name(),this.opType=e.opType(),this.attributes=new up(rf.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},ug=class{constructor(e,t){if(!e)throw TypeError("graph is empty");this.buildGraph(e),this.transformGraph(t),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof uc.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof e9.Graph)this.buildGraphFromOrtFormat(e);else throw TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let r=new Map;if(!e.input)throw Error("missing information in graph: input");let n=[];for(let r of e.input){if(t.has(r.name))throw Error(`duplicated input name: ${r.name}`);let e=this._allData.push(new uf(r))-1;t.set(r.name,e),n.push(r.name)}if(!e.initializer)throw Error("missing information in graph: initializer");for(let r of e.initializer){let e=t.get(r.name);if(void 0===e){let n=new uf;n.type={shape:{dims:rf.tensorDimsFromProto(r.dims)},tensorType:rf.tensorDataTypeFromProto(r.dataType)},e=this._allData.push(n)-1,t.set(r.name,e)}this._allData[e]._from=-1,this._allData[e].tensor=rE.fromProto(r)}for(let e=0;e<this._allData.length;e++)this._allData[e].tensor||(this._allInputIndices.push(e),this._allInputNames.push(n[e]));if(!e.output)throw Error("missing information in graph: output");for(let r of e.output){if(t.has(r.name))throw Error(`duplicated output name: ${r.name}`);let e=this._allData.push(new uf(r))-1;t.set(r.name,e),this._allOutputIndices.push(e),this._allOutputNames.push(r.name)}if(!e.node)throw Error("missing information in graph: node");for(let t of e.node){if(!t.name)for(let e=0;;e++){let n=`unnamed_${t.opType}_${e}`;if(!r.has(n)){t.name=n;break}}if(r.has(t.name))throw Error(`duplicated node name: ${t.name}`);let e=this._nodes.push(new um(t))-1;r.set(t.name,e)}for(let r=0;r<this._nodes.length;r++){let n=this._nodes[r],i=e.node[r];if(!i.output)throw Error(`missing output for node: ${i.name}`);for(let e of i.output){let o=t.get(e);if(typeof o>"u"&&(o=this._allData.push(new uf)-1,t.set(e,o)),n.outputs.push(o),void 0!==this._allData[o]._from)throw Error(`multiple nodes output to one data value: ${o}`);if(this._allData[o]._from=r,"Constant"===i.opType){if(!i.attribute||1!==i.attribute.length||!i.attribute[0].t)throw Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!i.output||1!==i.output.length)throw Error("missing output or incorrect number of outputs for this Constant operator");n.outputs.pop(),n.executeNode=!1,this._allData[o]._from=-1,this._allData[o].tensor=rE.fromProto(i.attribute[0].t)}}}for(let r=0;r<this._nodes.length;r++){let n=this._nodes[r],i=e.node[r];if(!i.input)throw Error(`missing input for node: ${i.name}`);for(let e of i.input){let o=t.get(e);if(typeof o>"u"){if(""===e&&(3===i.input.length||4===i.input.length)&&"Resize"===i.opType)continue;throw Error(`unrecognized input '${e}' for node: ${i.name}`)}n.inputs.push(o),this._allData[o]._to.push(r)}}return!0}buildGraphFromOrtFormat(e){let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let r=new Map,n=[];for(let r=0;r<e.inputsLength();r++){let i=e.inputs(r);if(t.has(i))throw Error(`duplicated input name: ${i}`);for(let r=0;r<e.nodeArgsLength();r++)if(e.nodeArgs(r)?.name()===i){let o=new uf;if(e.nodeArgs(r)?.type()?.valueType()!==ti.TypeInfoValue.tensor_type)throw Error("Unexpected value type for the nodeArg.");let a=e.nodeArgs(r).type().value(new tn.TensorTypeAndShape),s=rf.tensorDataTypeFromProto(a.elemType()),u=a.shape(),l=[];for(let e=0;e<u.dimLength();e++)l.push(rm.longToNumber(u.dim(e).value().dimValue()));o.type={shape:{dims:l},tensorType:s};let d=this._allData.push(o)-1;t.set(i,d),n.push(i)}}for(let r=0;r<e.initializersLength();r++){let n=e.initializers(r),i=t.get(n.name());if(void 0===i){let e=new uf;e.type={shape:{dims:rf.tensorDimsFromORTFormat(n)},tensorType:rf.tensorDataTypeFromProto(n.dataType())},i=this._allData.push(e)-1,t.set(n.name(),i)}this._allData[i]._from=-1,this._allData[i].tensor=rE.fromOrtTensor(n)}for(let e=0;e<this._allData.length;e++)this._allData[e].tensor||(this._allInputIndices.push(e),this._allInputNames.push(n[e]));for(let r=0;r<e.outputsLength();r++){let n=e.outputs(r);if(t.has(n))throw Error(`duplicated output name: ${n}`);let i=this._allData.push(new uf)-1;t.set(n,i),this._allOutputIndices.push(i),this._allOutputNames.push(n)}if(!e.nodes)throw Error("missing information in graph: node");for(let t=0;t<e.nodesLength();t++){let n=e.nodes(t),i=n.name();if(!i)for(let e=0;i=`unnamed_${n.opType()}_${e}`,r.has(i);e++);if(r.has(i))throw Error(`duplicated node name: ${i}`);let o=this._nodes.push(new um(n,i))-1;r.set(i,o)}for(let r=0;r<this._nodes.length;r++){let n=this._nodes[r],i=e.nodes(r);if(null==i)throw Error(`No node exists at index ${r}`);if(i?.outputsLength()===0)throw Error(`missing output for node: ${i.name}`);for(let e=0;e<i?.outputsLength();e++){let o=i?.outputs(e),a=t.get(o);if(typeof a>"u"&&(a=this._allData.push(new uf)-1,t.set(o,a)),n.outputs.push(a),void 0!==this._allData[a]._from)throw Error(`multiple nodes output to one data value: ${a}`);if(this._allData[a]._from=r,"Constant"===i.opType()){if(1!==i.attributesLength()||!i.attributes(0).t())throw Error("missing attributes or missing tensor value in attributes for this Constant operator");if(1!==i.outputsLength())throw Error("missing output or incorrect number of outputs for this Constant operator");n.outputs.pop(),n.executeNode=!1,this._allData[a]._from=-1,this._allData[a].tensor=rE.fromOrtTensor(i.attributes(0).t())}}}for(let r=0;r<this._nodes.length;r++){let n=this._nodes[r],i=e.nodes(r);if(0===i.inputsLength())throw Error(`missing input for node: ${i.name}`);for(let e=0;e<i.inputsLength();e++){let o=i.inputs(e),a=t.get(o);if(typeof a>"u")throw Error(`unrecognized input '${o}' for node: ${i.name()}`);n.inputs.push(a),this._allData[a]._to.push(r)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(t=>{this._allData[t]._to.forEach(t=>{e.add(t)})});let t=Array.from(e),r=Array(this._nodes.length).fill("white");for(;t.length>0;){let e=t.pop();"gray"===r[e]?r[e]="black":(t.push(e),r[e]="gray",this._nodes[e].outputs.forEach(n=>{let i=this._allData[n];if("u">typeof i.tensor)throw Error("node outputs should not be initialized");if(i._from!==e)throw Error("from property of the Value object doesn't match index of Node being processed");i._to.forEach(e=>{if("gray"===r[e])throw Error("model graph is cyclic");"white"===r[e]&&t.push(e)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,t=[this._nodes.length,0],r=0;for(let e=0;e<this._nodes.length;e++)t[e]=r,this._nodes[e].executeNode?(r!==e&&(this._nodes[r]=this._nodes[e]),r++):this._nodes[e].outputs.forEach(e=>{this._allData[e]._from=-2});this._nodes.splice(r,this._nodes.length-r);for(let e=0;e<this._allData.length;e++){let r=this._allData[e];void 0!==r._from&&-1!==r._from&&-2!==r._from&&(r._from=t[r._from]);for(let e=0;e<r._to.length;e++)if(r._to[e]>=0)r._to[e]=t[r._to[e]];else throw Error("Trying to update a removed node")}e=0;for(let t=0;t<this._allData.length;t++){if(-2===this._allData[t].from&&-1===this._allOutputIndices.indexOf(t+e)){e++,this._allData.splice(t,1),t--;continue}if(e>0){let r=-1;void 0!==this._allData[t].from&&-1!==this._allData[t].from?-1!==(r=this._nodes[this._allData[t].from].outputs.indexOf(t+e))&&(this._nodes[this._allData[t].from].outputs[r]=t):-1!==(r=this._allInputIndices.indexOf(t+e))&&(this._allInputIndices[r]=t),this._allData[t].to.forEach(n=>{-1!==(r=this._nodes[n].inputs.indexOf(t+e))&&(this._nodes[n].inputs[r]=t)}),0===this._allData[t].to.length&&-1!==(r=this._allOutputIndices.indexOf(t+e))&&(this._allOutputIndices[r]=t)}}}deleteNode(e){let t=this._nodes[e];if(t.outputs.length>1){for(let e=1;e<t.outputs.length;e++)if(this._allData[t.outputs[e]].to.length>0)throw Error("Node deletion with more than one output connected to other nodes is not supported. ")}t.executeNode=!1;let r=t.inputs[0],n=t.outputs[0],i=this._allData[n].to;for(let r=0;r<t.inputs.length;r++){let n=this._allData[t.inputs[r]].to.indexOf(e);if(-1===n)throw Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[t.inputs[r]].to.splice(n,1)}this._allData[n]._to=[];let o=this._allOutputIndices.indexOf(n);if(-1!==o&&(this._allOutputIndices[o]=r),i&&i.length>0)for(let e of i){let t=this._nodes[e].inputs.indexOf(n);if(-1===t)throw Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[e].inputs[t]=r,this._allData[r].to.push(e)}}removeAllDropoutNodes(){let e=0;for(let t of this._nodes){if("Dropout"===t.opType){if(1!==t.inputs.length)throw Error("Dropout nodes should only contain one input. ");if(1!==t.outputs.length&&2!==t.outputs.length)throw Error("Dropout nodes should contain either 1 or 2 output(s)");if(2===t.outputs.length&&0!==this._allData[t.outputs[1]]._to.length)throw Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let t of this._nodes)"Identity"===t.opType&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if("Conv"===e.opType){let t=this._allData[e.outputs[0]]._to;if(1===t.length&&this.isActivation(this._nodes[t[0]])){let r=this._nodes[t[0]];if("Clip"===r.opType)if(1===r.inputs.length)try{e.attributes.set("activation_params","floats",[r.attributes.getFloat("min"),r.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[r_,rv])}else{if(!(r.inputs.length>=3)||void 0===this._allData[r.inputs[1]].tensor||void 0===this._allData[r.inputs[2]].tensor)continue;e.attributes.set("activation_params","floats",[this._allData[r.inputs[1]].tensor.floatData[0],this._allData[r.inputs[2]].tensor.floatData[0]])}e.attributes.set("activation","string",r.opType),this.deleteNode(t[0])}}}}}),uA=G(()=>{"use strict";ub=X(tc()),uE(),tZ(),uy=X(ra()),rx(),u_=class{load(e,t,r){let n;if(!r)try{this.loadFromOnnxFormat(e,t);return}catch(e){if(void 0!==r)throw e;n=e}try{this.loadFromOrtFormat(e,t)}catch(e){throw void 0!==r?e:Error(`Failed to load model as ONNX format: ${n}
as ORT format: ${e}`)}}loadFromOnnxFormat(e,t){let r=uy.onnx.ModelProto.decode(e);if(3>rm.longToNumber(r.irVersion))throw Error("only support ONNX model with IR_VERSION>=3");this._opsets=r.opsetImport.map(e=>({domain:e.domain,version:rm.longToNumber(e.version)})),this._graph=uh.from(r.graph,t)}loadFromOrtFormat(e,t){let r=new ub.ByteBuffer(e),n=te.InferenceSession.getRootAsInferenceSession(r).model();if(3>rm.longToNumber(n.irVersion()))throw Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let e=0;e<n.opsetImportLength();e++){let t=n.opsetImport(e);this._opsets.push({domain:t?.domain(),version:rm.longToNumber(t.version())})}this._graph=uh.from(n.graph(),t)}get graph(){return this._graph}get opsets(){return this._opsets}}}),uP=G(()=>{"use strict";uI(),uS(),eD(),uA(),uv=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=eP.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,t,r){await this.profiler.event("session","Session.loadModel",async()=>{let n=await async function e(t){if(!t)return e(["webgl"]);for(let e of"string"==typeof t?[t]:t){let t=ua.get(e);if(t)return t;let r=await async function(e){var t;let r=us;if("u">typeof r[e]&&"initialize"in(t=r[e])&&"function"==typeof t.initialize&&"createSessionHandler"in t&&"function"==typeof t.createSessionHandler&&"dispose"in t&&"function"==typeof t.dispose){let t=r[e],n=t.initialize();if("object"==typeof n&&"then"in n&&(n=await n),n)return ua.set(e,t),t}}(e);if(r)return r}throw Error("no available backend to use")}(this.backendHint);if(this.sessionHandler=n.createSessionHandler(this.context),this._model=new u_,"string"==typeof e){let t=e.endsWith(".ort");{let r=await (await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(r),t)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let n=new Uint8Array(e,t||0,r||e.byteLength);this.initialize(n)}})}initialize(e,t){if(this._initialized)throw Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let r=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,r,t),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new ul(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let t=this.normalizeAndValidateInputs(e),r=await this._executionPlan.execute(this.sessionHandler,t);return this.createOutput(r)})}normalizeAndValidateInputs(e){let t=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==t.length)throw Error(`incorrect input array length: expected ${t.length} but got ${e.length}`)}else{if(e.size!==t.length)throw Error(`incorrect input map size: expected ${t.length} but got ${e.size}`);let r=Array(e.size),n=0;for(let i=0;i<t.length;++i){let o=e.get(t[i]);if(!o)throw Error(`missing input tensor for: '${name}'`);r[n++]=o}e=r}if(this.context.graphInputTypes&&0!==this.context.graphInputTypes.length&&this.context.graphInputDims&&0!==this.context.graphInputDims.length)this.validateInputTensorDims(this.context.graphInputDims,e,!1);else{let t=this._model.graph.getInputIndices(),r=this._model.graph.getValues(),n=Array(t.length);for(let i=0;i<t.length;++i){let o=r[t[i]];n[i]=o.type.shape.dims,this.context.graphInputTypes.push(o.type.tensorType),this.context.graphInputDims.push(e[i].dims)}this.validateInputTensorDims(n,e,!0)}return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,t){for(let r=0;r<t.length;r++){let n=e[r],i=t[r].type;if(n!==i)throw Error(`input tensor[${r}] check failed: expected type '${n}' but got ${i}`)}}validateInputTensorDims(e,t,r){for(let n=0;n<t.length;n++){let i=e[n],o=t[n].dims;if(!this.compareTensorDims(i,o,r))throw Error(`input tensor[${n}] check failed: expected shape '[${i.join(",")}]' but got [${o.join(",")}]`)}}compareTensorDims(e,t,r){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n]&&(!r||0!==e[n]))return!1;return!0}createOutput(e){let t=this._model.graph.getOutputNames();if(e.length!==t.length)throw Error("expected number of outputs do not match number of generated outputs");let r=new Map;for(let n=0;n<t.length;++n)r.set(t[n],e[n]);return r}initializeOps(e){let t=e.getNodes();this._ops=Array(t.length);for(let r=0;r<t.length;r++)this._ops[r]=this.sessionHandler.resolve(t[r],this._model.opsets,e)}}}),uk=G(()=>{"use strict";ey(),rA(),ux=class{constructor(e){this.session=e,this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,t,r){let n=new Map;for(let t in e)if(Object.hasOwnProperty.call(e,t)){let r=e[t];n.set(t,new rE(r.dims,r.type,void 0,void 0,r.data))}let i=await this.session.run(n),o={};return i.forEach((e,t)=>{o[t]=new F(e.type,e.data,e.dims)}),o}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}}),uD=G(()=>{"use strict";uw=e=>{if(e?.epContextDataRead)throw Error('session option "epContextDataRead" is not supported by ONNX Runtime Web')}}),uN={};W(uN,{onnxjsBackend:()=>uC});var uC,uz=G(()=>{"use strict";uP(),uk(),uD(),uC=new class{async init(){}async createInferenceSessionHandler(e,t){uw(t);let r=new uv(t);return await r.loadModel(e),new ux(r)}}}),uR=G(()=>{}),uB={};W(uB,{default:()=>uj});var uM,uj,uF=G(()=>{"use strict";mR(),hG(),hq(),(uM=globalThis.self?.name==="ort-wasm-proxy-worker")&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":u4(r.wasm).then(()=>{f6(r).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})})},e=>{postMessage({type:t,err:e})});break;case"init-ep":{let{epName:e,env:n}=r;f5(n,e).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})});break}case"copy-from":{let{buffer:e}=r,n=f9(e);postMessage({type:t,out:n});break}case"create":{let{model:e,options:n}=r;me(e,n).then(e=>{postMessage({type:t,out:e})},e=>{postMessage({type:t,err:e})});break}case"release":mt(r),postMessage({type:t});break;case"run":{let{sessionId:e,inputIndices:n,inputs:i,outputIndices:o,options:a}=r;mu(e,n,i,o,Array(o.length).fill(null),a).then(e=>{e.some(e=>"cpu"!==e[3])?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:e},md([...i,...e]))},e=>{postMessage({type:t,err:e})});break}case"end-profiling":ml(r),postMessage({type:t})}}catch(e){postMessage({type:t,err:e})}}),uj=uM?null:e=>new Worker(e??uH,{type:"module",name:"ort-wasm-proxy-worker"})}),uL={};async function uV(e={}){var t=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,n=r&&self.name?.startsWith("em-pthread");e.mountExternalData=(t,r)=>{t.startsWith("./")&&(t=t.substring(2)),(e.jd||(e.jd=new Map)).set(t,r)},e.unmountExternalData=()=>{delete e.jd,delete e.ke,delete e.je,delete e.le},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let i=t=>async(...r)=>{try{if(e.hd)throw Error("Session already started");let n=e.hd={Vd:r[0],errors:[]},i=await t(...r);if(e.hd!==n)throw Error("Session mismatch");e.pd?.flush();let o=n.errors;if(0<o.length){let e=await Promise.all(o);if(e=e.filter(e=>e),0<e.length)throw Error(e.join(`
`))}return i}finally{e.hd=null}};e.jsepInit=(t,r)=>{if("webgpu"===t){[e.pd,e.Ld,e.Pd,e.rd,e.Od,e.ic,e.Qd,e.Sd,e.Md,e.Nd,e.Rd]=r;let t=e.pd;e.jsepRegisterBuffer=(e,r,n,i)=>t.registerBuffer(e,r,n,i),e.jsepGetBuffer=e=>t.getBuffer(e),e.jsepCreateDownloader=(e,r,n)=>t.createDownloader(e,r,n),e.jsepOnCreateSession=e=>{t.onCreateSession(e)},e.jsepOnReleaseSession=e=>{t.onReleaseSession(e)},e.jsepOnRunStart=e=>t.onRunStart(e),e.Td=(e,r)=>{t.upload(e,r)}}else if("webnn"===t){let t=r[0];[e.ce,e.Cd,e.webnnEnsureTensor,e.Dd,e.webnnDownloadTensor,e.be,e.webnnEnableTraceEvent]=r.slice(1),e.webnnReleaseTensorId=e.Cd,e.webnnUploadTensor=e.Dd,e.webnnRegisterMLContext=e.be,e.webnnOnRunStart=e=>t.onRunStart(e),e.webnnOnRunEnd=t.onRunEnd.bind(t),e.webnnOnReleaseSession=e=>{t.onReleaseSession(e)},e.webnnCreateMLTensorDownloader=(e,r)=>t.createMLTensorDownloader(e,r),e.webnnRegisterMLTensor=(e,r,n,i)=>t.registerMLTensor(e,r,n,i),e.webnnCreateMLContext=e=>t.createMLContext(e),e.webnnRegisterGraphInput=t.registerGraphInput.bind(t),e.webnnIsGraphInput=t.isGraphInput.bind(t),e.webnnRegisterGraphOutput=t.registerGraphOutput.bind(t),e.webnnIsGraphOutput=t.isGraphOutput.bind(t),e.webnnCreateTemporaryTensor=t.createTemporaryTensor.bind(t),e.webnnIsGraphInputOutputTypeSupported=t.isGraphInputOutputTypeSupported.bind(t)}};let o=()=>{let t=e=>(...t)=>{let r=tS;return t=e(...t),tS!=r?new Promise((e,t)=>{tN={resolve:e,reject:t}}):t};(r=>{for(let n of r)e[n]=t(e[n])})("_OrtAppendExecutionProvider _OrtAppendExecutionProviderV2 _OrtCreateSession _OrtRun _OrtRunWithBinding _OrtBindInput".split(" ")),void 0!==i&&(e._OrtRun=i(e._OrtRun),e._OrtRunWithBinding=i(e._OrtRunWithBinding)),o=void 0};e.asyncInit=()=>{o?.()};var a,s,u=(e,t)=>{throw t},l=import.meta.url,d="";if(t||r){try{d=new URL(".",l).href}catch{}r&&(s=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),a=async e=>{if(w(e))return new Promise((t,r)=>{var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=()=>{200==n.status||0==n.status&&n.response?t(n.response):r(n.status)},n.onerror=r,n.send(null)});var t=await fetch(e,{credentials:"same-origin"});if(t.ok)return t.arrayBuffer();throw Error(t.status+" : "+t.url)}}var p,c,h,f,m,g,b=console.log.bind(console),y=console.error.bind(console),_=b,v=y,x=!1,w=e=>e.startsWith("file://");function $(){es.buffer!=I.buffer&&B()}if(n){let t=function(r){try{var n,i,o=r.data,a=o.bd;if("load"===a){let r=[];for(let n of(self.onmessage=e=>r.push(e),g=()=>{for(let e of(postMessage({bd:"loaded"}),r))t(e);self.onmessage=t},o.Hd))e[n]&&!e[n].proxy||(e[n]=(...e)=>{postMessage({bd:"callHandler",Fd:n,args:e})},"print"==n&&(_=e[n]),"printErr"==n&&(v=e[n]));es=o.Zd,B(),c=o.$d,L(),ig()}else if("run"===a){n=o.ad,i=($(),P)[n+52>>>2>>>0],n=($(),P)[n+56>>>2>>>0],rW(i,i-n),rK(i),rM(o.ad,0,0,1,0,0),ei(),tg(o.ad),T||(rC(),T=!0);try{eu(o.Xd,o.nd)}catch(e){if("unwind"!=e)throw e}}else"setimmediate"!==o.target&&("checkMailbox"===a?T&&tb():a&&(v(`worker: received unknown command ${a}`),v(o)))}catch(e){throw rj(),e}};var T=!1;self.onunhandledrejection=e=>{throw e.reason||e},self.onmessage=t}var I,S,O,E,A,P,k,D,N,C,z,R=!1;function B(){var t=es.buffer;e.HEAP8=I=new Int8Array(t),O=new Int16Array(t),e.HEAPU8=S=new Uint8Array(t),E=new Uint16Array(t),e.HEAP32=A=new Int32Array(t),e.HEAPU32=P=new Uint32Array(t),k=new Float32Array(t),D=new Float64Array(t),N=new BigInt64Array(t),C=new BigUint64Array(t)}function M(){R=!0,n?g():nC.vb()}function j(e){throw v(e="Aborted("+e+")"),x=!0,e=new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info."),m?.(e),e}function F(){return{a:{na:nM,jb:nB,g:ep,G:eh,f:ey,o:e_,h:ev,$:ex,b:ew,S:e$,Ja:eI,n:eS,aa:ek,_a:eD,Fa:eN,Ha:eC,$a:ez,Ya:eR,Ra:eB,Xa:eM,la:ej,Ga:eF,Da:eL,Za:eV,Ea:eU,eb:eq,ga:eQ,ya:eY,wa:e8,fa:e7,N:e9,I:te,xa:tn,_:tp,za:tc,Ua:th,Ba:ty,Ka:tv,ua:tx,ha:tw,Ta:tg,bb:t$,Q:tR,r:tL,c:e2,kb:tV,y:tU,M:tq,D:tG,m:tH,s:tW,lb:tK,J:tX,R:tZ,j:tJ,u:tQ,q:tY,k:t0,Oa:t1,Pa:t6,Qa:t5,Ma:t8,Na:t7,va:rt,gb:rr,db:ri,v:rs,ba:ru,ia:rl,cb:rn,V:rd,ab:rp,Ca:rc,F:re,U:rh,ma:ry,Aa:r_,ib:rb,hb:rv,Va:rT,Wa:rI,Ia:Q,T:rS,La:rO,ka:rE,Sa:rA,ja:rk,nb:ih,oa:iu,ob:ic,pa:is,H:n6,e:nV,t:nF,w:nj,B:nY,pb:ii,Z:ir,x:nH,qa:io,X:il,ca:it,qb:ie,ea:nq,O:n0,sb:n8,ra:n9,tb:n5,L:n3,Y:ia,d:nL,A:nG,l:nU,mb:im,p:nK,z:nX,C:nW,E:nZ,K:n1,sa:n4,P:id,da:n2,W:ip,ub:nQ,ta:nJ,rb:n7,i:rD,a:es,fb:Z}}}async function L(){function t(t,r){var n,i,o,a=nC=t.exports;for(let[e,r]of(t={},Object.entries(a)))"function"==typeof r?(a=function(e){var t=(...t)=>{tE.push(e);try{return e(...t)}finally{x||(tE.pop(),tS&&1===tI&&0===tE.length&&(tI=0,K+=1,tT(nk),"u">typeof Fibers&&Fibers.ne()))}};return tk.set(e,t),t}(r),t[e]=a):t[e]=r;return n=nC=t,i=e=>t=>e(t)>>>0,o=e=>()=>e()>>>0,(n=Object.assign({},n)).wb=i(n.wb),n.ec=o(n.ec),n.gc=i(n.gc),n.uc=i(n.uc),n.vc=o(n.vc),n.zc=i(n.zc),nC=n,et.push(nC.hc),rN=(t=nC).wb,rC=t.xb,e._OrtInit=t.yb,e._OrtGetLastError=t.zb,e._OrtCreateSessionOptions=t.Ab,e._OrtAppendExecutionProvider=t.Bb,e._OrtGetEpDevices=t.Cb,e._OrtEpDevice_EpName=t.Db,e._OrtAppendExecutionProviderV2=t.Eb,e._OrtAddFreeDimensionOverride=t.Fb,e._OrtAddSessionConfigEntry=t.Gb,e._OrtReleaseSessionOptions=t.Hb,e._OrtCreateSession=t.Ib,e._OrtReleaseSession=t.Jb,e._OrtGetInputOutputCount=t.Kb,e._OrtGetInputOutputMetadata=t.Lb,e._OrtFree=t.Mb,e._OrtCreateTensor=t.Nb,e._OrtGetTensorData=t.Ob,e._OrtReleaseTensor=t.Pb,e._OrtCreateLoraAdapter=t.Qb,e._OrtReleaseLoraAdapter=t.Rb,e._OrtCreateRunOptions=t.Sb,e._OrtAddRunConfigEntry=t.Tb,e._OrtRunOptionsAddActiveLoraAdapter=t.Ub,e._OrtReleaseRunOptions=t.Vb,e._OrtCreateBinding=t.Wb,e._OrtBindInput=t.Xb,e._OrtBindOutput=t.Yb,e._OrtClearBoundOutputs=t.Zb,e._OrtReleaseBinding=t._b,e._OrtRunWithBinding=t.$b,e._OrtRun=t.ac,e._OrtEndProfiling=t.bc,e._JsepOutput=t.cc,e._JsepGetNodeName=t.dc,rz=t.ec,rR=e._free=t.fc,rB=e._malloc=t.gc,rM=t.jc,rj=t.kc,rF=t.lc,rL=t.mc,rV=t.nc,rU=t.oc,rq=t.pc,rG=t.qc,rH=t.rc,rW=t.sc,rK=t.tc,rX=t.uc,rZ=t.vc,rJ=t.wc,rQ=t.xc,rY=t.yc,r0=t.zc,r1=t.Ac,r2=t.Bc,r3=t.Cc,r4=t.Dc,r6=t.Ec,r5=t.Fc,r8=t.Gc,r7=t.Hc,r9=t.Ic,ne=t.Jc,nt=t.Kc,nr=t.Lc,nn=t.Mc,ni=t.Nc,no=t.Oc,na=t.Pc,ns=t.Qc,nu=t.Rc,nl=t.Sc,nd=t.Tc,np=t.Uc,nc=t.Vc,nh=t.Wc,nf=t.Xc,nm=t.Yc,ng=t._c,nb=t.$c,ny=t.kd,n_=t.ld,nv=t.qd,nx=t.vd,nw=t.wd,n$=t.xd,nT=t.yd,nI=t.zd,nS=t.Ad,nO=t.Bd,nE=t.Gd,nA=t.Jd,nP=t.fe,nk=t.ge,nD=t.he,nN=t.ie,c=r,nC}var r,i=F();return e.instantiateWasm?new Promise(r=>{e.instantiateWasm(i,(e,n)=>{r(t(e,n))})}):n?t(new WebAssembly.Instance(c,F()),c):(z??=e.locateFile?e.locateFile?e.locateFile("ort-wasm-simd-threaded.jsep.wasm",d):d+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,t((r=await async function(e){if(!p&&!w(z))try{var t=fetch(z,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(t,e)}catch(e){v(`wasm streaming compile failed: ${e}`),v("falling back to ArrayBuffer instantiation")}return async function(e,t){try{var r=await async function(e){if(!p)try{var t=await a(e);return new Uint8Array(t)}catch{}if(e==z&&p)e=new Uint8Array(p);else{if(!s)throw"both async and sync fetching of the wasm failed";e=s(e)}return e}(e);return await WebAssembly.instantiate(r,t)}catch(e){v(`failed to asynchronously prepare wasm: ${e}`),j(e)}}(z,e)}(i)).instance,r.module))}class V{name="ExitStatus";constructor(e){this.message=`Program terminated with exit(${e})`,this.status=e}}var U=e=>{e.terminate(),e.onmessage=()=>{}},q=[],G=0,H=null,W=e=>{0==Y.length&&(ea(),eo(Y[0]));var t=Y.pop();if(!t)return 6;ee.push(t),er[e.ad]=t,t.ad=e.ad;var r={bd:"run",Xd:e.Wd,nd:e.nd,ad:e.ad};return t.postMessage(r,e.ud),0},K=0,X=(e,t,...r)=>{var n,i=16*r.length,o=rZ(),a=rX(i),s=a>>>3;for(n of r)"bigint"==typeof n?(($(),N)[s++>>>0]=1n,($(),N)[s++>>>0]=n):(($(),N)[s++>>>0]=0n,($(),D)[s++>>>0]=n);return e=rF(e,0,i,a,t),rK(o),e};function Z(e){if(n)return X(0,1,e);if(h=e,!(0<K)){for(var t of ee)U(t);for(t of Y)U(t);Y=[],ee=[],er={},x=!0}u(0,new V(e))}function J(e){if(n)return X(1,0,e);Q(e)}var Q=e=>{if(h=e,n)throw J(e),"unwind";Z(e)},Y=[],ee=[],et=[],er={},en=e=>{var t=e.ad;delete er[t],Y.push(e),ee.splice(ee.indexOf(e),1),e.ad=0,rL(t)};function ei(){et.forEach(e=>e())}var eo=t=>new Promise(r=>{t.onmessage=n=>{var i=n.data;if(n=i.bd,i.md&&i.md!=rz()){var o=er[i.md];o?o.postMessage(i,i.ud):v(`Internal error! Worker sent a message "${n}" to target pthread ${i.md}, but that thread no longer exists!`)}else"checkMailbox"===n?tb():"spawnThread"===n?W(i):"cleanupThread"===n?tf(()=>{en(er[i.Yd])}):"loaded"===n?(t.loaded=!0,r(t)):"setimmediate"===i.target?t.postMessage(i):"uncaughtException"===n?t.onerror(i.error):"callHandler"===n?e[i.Fd](...i.args):n&&v(`worker sent an unknown command ${n}`)},t.onerror=e=>{throw v(`worker sent an error! ${e.filename}:${e.lineno}: ${e.message}`),e};var n,i=[];for(n of[])e.propertyIsEnumerable(n)&&i.push(n);t.postMessage({bd:"load",Hd:i,Zd:es,$d:c})});function ea(){let e;var t=new Worker((e=URL,import.meta.url>"file:"&&import.meta.url<"file;"?new e("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url)),{type:"module",workerData:"em-pthread",name:"em-pthread"});Y.push(t)}var es,eu=(e,t)=>{K=0,e=r2(e,t),0<K?h=e:rV(e)},el=[],ed=0;function ep(e){var t=new eg(e>>>=0);return 0==($(),I)[t.cd+12>>>0]&&(ef(t,!0),ed--),em(t,!1),el.push(t),r0(e)}var ec=0,eh=()=>{rG(0,0);var e=el.pop();rJ(e.od),ec=0};function ef(e,t){t=+!!t,($(),I)[e.cd+12>>>0]=t}function em(e,t){t=+!!t,($(),I)[e.cd+13>>>0]=t}class eg{constructor(e){this.od=e,this.cd=e-24}}var eb=e=>{var t=ec;if(!t)return rH(0),0;var r=new eg(t);($(),P)[r.cd+16>>>2>>>0]=t;var n=($(),P)[r.cd+4>>>2>>>0];if(!n)return rH(0),t;for(var i of e){if(0===i||i===n)break;if(rY(i,n,r.cd+16))return rH(i),t}return rH(n),t};function ey(){return eb([])}function e_(e){return eb([e>>>0])}function ev(e,t,r,n){return eb([e>>>0,t>>>0,r>>>0,n>>>0])}var ex=()=>{var e=el.pop();e||j("no exception to throw");var t=e.od;throw 0==($(),I)[e.cd+13>>>0]&&(el.push(e),em(e,!0),ef(e,!1),ed++),rQ(t),ec=t};function ew(e,t,r){var n=new eg(e>>>=0);throw t>>>=0,r>>>=0,($(),P)[n.cd+16>>>2>>>0]=0,($(),P)[n.cd+4>>>2>>>0]=t,($(),P)[n.cd+8>>>2>>>0]=r,rQ(e),ed++,ec=e}var e$=()=>ed;function eT(e,t,r,i){return n?X(2,1,e,t,r,i):eI(e,t,r,i)}function eI(e,t,r,i){if(e>>>=0,t>>>=0,r>>>=0,i>>>=0,!globalThis.SharedArrayBuffer)return 6;var o=[];return n&&0===o.length?eT(e,t,r,i):(e={Wd:r,ad:e,nd:i,ud:o},n?(e.bd="spawnThread",postMessage(e,o),0):W(e))}function eS(e){throw ec||=e>>>0}var eO=globalThis.TextDecoder&&new TextDecoder,eE=(e,t,r,n)=>{if(r=t+r,n)return r;for(;e[t]&&!(t>=r);)++t;return t},eA=(e,t=0,r,n)=>{if(16<(r=eE(e,t>>>=0,r,n))-t&&e.buffer&&eO)return eO.decode(e.buffer instanceof ArrayBuffer?e.subarray(t,r):e.slice(t,r));for(n="";t<r;){var i=e[t++];if(128&i){var o=63&e[t++];if((224&i)==192)n+=String.fromCharCode((31&i)<<6|o);else{var a=63&e[t++];65536>(i=(240&i)==224?(15&i)<<12|o<<6|a:(7&i)<<18|o<<12|a<<6|63&e[t++])?n+=String.fromCharCode(i):(i-=65536,n+=String.fromCharCode(55296|i>>10,56320|1023&i))}}else n+=String.fromCharCode(i)}return n},eP=(e,t,r)=>(e>>>=0)?eA(($(),S),e,t,r):"";function ek(e,t,r){return n?X(3,1,e,t,r):0}function eD(e,t){if(n)return X(4,1,e,t)}function eN(e,t){if(n)return X(5,1,e,t)}function eC(e,t,r){if(n)return X(6,1,e,t,r)}function ez(e,t,r){return n?X(7,1,e,t,r):0}function eR(e,t){if(n)return X(8,1,e,t)}function eB(e,t,r){if(n)return X(9,1,e,t,r)}function eM(e,t,r,i){if(n)return X(10,1,e,t,r,i)}function ej(e,t,r,i){if(n)return X(11,1,e,t,r,i)}function eF(e,t,r,i){if(n)return X(12,1,e,t,r,i)}function eL(e){if(n)return X(13,1,e)}function eV(e,t){if(n)return X(14,1,e,t)}function eU(e,t,r){if(n)return X(15,1,e,t,r)}var eq=()=>j(""),eG=e=>{e>>>=0;for(var t="";;){var r=($(),S)[e++>>>0];if(!r)return t;t+=String.fromCharCode(r)}},eH={},eW={},eK={},eX=class extends Error{constructor(e){super(e),this.name="BindingError"}};function eZ(e,t,r={}){return function(e,t,r={}){var n=t.name;if(!e)throw new eX(`type "${n}" must have a positive integer typeid pointer`);if(eW.hasOwnProperty(e)){if(r.Id)return;throw new eX(`Cannot register type '${n}' twice`)}eW[e]=t,delete eK[e],eH.hasOwnProperty(e)&&(t=eH[e],delete eH[e],t.forEach(e=>e()))}(e,t,r)}var eJ=(e,t,r)=>{switch(t){case 1:return r?e=>($(),I)[e>>>0]:e=>($(),S)[e>>>0];case 2:return r?e=>($(),O)[e>>>1>>>0]:e=>($(),E)[e>>>1>>>0];case 4:return r?e=>($(),A)[e>>>2>>>0]:e=>($(),P)[e>>>2>>>0];case 8:return r?e=>($(),N)[e>>>3>>>0]:e=>($(),C)[e>>>3>>>0];default:throw TypeError(`invalid integer width (${t}): ${e}`)}};function eQ(e,t,r,n,i){e>>>=0,r>>>=0,t=eG(t>>>0);let o=e=>e;if(n=0n===n){let e=8*r;i=(o=t=>BigInt.asUintN(e,t))(i)}eZ(e,{name:t,Zc:o,ed:(e,t)=>("number"==typeof t&&(t=BigInt(t)),t),dd:eJ(t,r,!n),gd:null})}function eY(e,t,r,n){eZ(e>>>=0,{name:t=eG(t>>>0),Zc:function(e){return!!e},ed:function(e,t){return t?r:n},dd:function(e){return this.Zc(($(),S)[e>>>0])},gd:null})}var e0=[],e1=[0,1,,1,null,1,!0,1,!1,1];function e2(e){9<(e>>>=0)&&0==--e1[e+1]&&(e1[e]=void 0,e0.push(e))}var e3=e=>{if(!e)throw new eX(`Cannot use deleted val. handle = ${e}`);return e1[e]},e4=e=>{switch(e){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let t=e0.pop()||e1.length;return e1[t]=e,e1[t+1]=1,t}};function e6(e){return this.Zc(($(),P)[e>>>2>>>0])}var e5={name:"emscripten::val",Zc:e=>{var t=e3(e);return e2(e),t},ed:(e,t)=>e4(t),dd:e6,gd:null};function e8(e){return eZ(e>>>0,e5)}function e7(e,t,r){r>>>=0,eZ(e>>>=0,{name:t=eG(t>>>0),Zc:e=>e,ed:(e,t)=>t,dd:((e,t)=>{switch(t){case 4:return function(e){return this.Zc(($(),k)[e>>>2>>>0])};case 8:return function(e){return this.Zc(($(),D)[e>>>3>>>0])};default:throw TypeError(`invalid float width (${t}): ${e}`)}})(t,r),gd:null})}function e9(e,t,r,n,i){e>>>=0,r>>>=0,t=eG(t>>>0);let o=e=>e;if(0===n){var a=32-8*r;i=(o=e=>e<<a>>>a)(i)}eZ(e,{name:t,Zc:o,ed:(e,t)=>t,dd:eJ(t,r,0!==n),gd:null})}function te(e,t,r){function n(e){var t=($(),P)[e>>>2>>>0];return e=($(),P)[e+4>>>2>>>0],new i(($(),I).buffer,e,t)}var i=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][t];eZ(e>>>=0,{name:r=eG(r>>>0),Zc:n,dd:n},{Id:!0})}var tt=(e,t,r)=>{var n=($(),S);if(t>>>=0,0<r){var i=t;r=t+r-1;for(var o=0;o<e.length;++o){var a=e.codePointAt(o);if(127>=a){if(t>=r)break;n[t++>>>0]=a}else if(2047>=a){if(t+1>=r)break;n[t++>>>0]=192|a>>6,n[t++>>>0]=128|63&a}else if(65535>=a){if(t+2>=r)break;n[t++>>>0]=224|a>>12,n[t++>>>0]=128|a>>6&63,n[t++>>>0]=128|63&a}else{if(t+3>=r)break;n[t++>>>0]=240|a>>18,n[t++>>>0]=128|a>>12&63,n[t++>>>0]=128|a>>6&63,n[t++>>>0]=128|63&a,o++}}n[t>>>0]=0,e=t-i}else e=0;return e},tr=e=>{for(var t=0,r=0;r<e.length;++r){var n=e.charCodeAt(r);127>=n?t++:2047>=n?t+=2:55296<=n&&57343>=n?(t+=4,++r):t+=3}return t};function tn(e,t){eZ(e>>>=0,{name:t=eG(t>>>0),Zc(e){var t=($(),P)[e>>>2>>>0];return t=eP(e+4,t,!0),rR(e),t},ed(e,t){t instanceof ArrayBuffer&&(t=new Uint8Array(t));var r="string"==typeof t;if(!(r||ArrayBuffer.isView(t)&&1==t.BYTES_PER_ELEMENT))throw new eX("Cannot pass non-string to std::string");var n=r?tr(t):t.length,i=rB(4+n+1),o=i+4;return($(),P)[i>>>2>>>0]=n,r?tt(t,o,n+1):($(),S).set(t,o>>>0),null!==e&&e.push(rR,i),i},dd:e6,gd(e){rR(e)}})}var ti=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,to=(e,t,r)=>{if(e>>>=1,16<(t=eE(($(),E),e,t/2,r))-e&&ti)return ti.decode(($(),E).slice(e,t));for(r="";e<t;++e)r+=String.fromCharCode(($(),E)[e>>>0]);return r},ta=(e,t,r)=>{if(2>(r??=0x7fffffff))return 0;var n=t;r=(r-=2)<2*e.length?r/2:e.length;for(var i=0;i<r;++i){var o=e.charCodeAt(i);($(),O)[t>>>1>>>0]=o,t+=2}return($(),O)[t>>>1>>>0]=0,t-n},ts=e=>2*e.length,tu=(e,t,r)=>{var n="";e>>>=2;for(var i=0;!(i>=t/4);i++){var o=($(),P)[e+i>>>0];if(!o&&!r)break;n+=String.fromCodePoint(o)}return n},tl=(e,t,r)=>{if(t>>>=0,4>(r??=0x7fffffff))return 0;var n=t;r=n+r-4;for(var i=0;i<e.length;++i){var o=e.codePointAt(i);if(65535<o&&i++,($(),A)[t>>>2>>>0]=o,(t+=4)+4>r)break}return($(),A)[t>>>2>>>0]=0,t-n},td=e=>{for(var t=0,r=0;r<e.length;++r)65535<e.codePointAt(r)&&r++,t+=4;return t};function tp(e,t,r){if(e>>>=0,t>>>=0,r=eG(r>>>=0),2===t)var n=to,i=ta,o=ts;else n=tu,i=tl,o=td;eZ(e,{name:r,Zc:e=>{var r=($(),P)[e>>>2>>>0];return r=n(e+4,r*t,!0),rR(e),r},ed:(e,n)=>{if("string"!=typeof n)throw new eX(`Cannot pass non-string to C++ string type ${r}`);var a=o(n),s=rB(4+a+t);return($(),P)[s>>>2>>>0]=a/t,i(n,s+4,a+t),null!==e&&e.push(rR,s),s},dd:e6,gd(e){rR(e)}})}function tc(e,t){eZ(e>>>=0,{Kd:!0,name:t=eG(t>>>0),Zc:()=>{},ed:()=>{}})}function th(e){rM(e>>>0,!r,1,!t,131072,!1),ei()}var tf=e=>{if(!x)try{if(e(),!(0<K))try{n?rz()&&rV(h):Q(h)}catch(e){e instanceof V||"unwind"==e||u(0,e)}}catch(e){e instanceof V||"unwind"==e||u(0,e)}},tm=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function tg(e){e>>>=0,tm||(Atomics.waitAsync(($(),A),e>>>2,e).value.then(tb),e+=128,Atomics.store(($(),A),e>>>2,1))}var tb=()=>tf(()=>{var e=rz();e&&(tg(e),rq())});function ty(e,t){(e>>>=0)==t>>>0?setTimeout(tb):n?postMessage({md:e,bd:"checkMailbox"}):(e=er[e])&&e.postMessage({bd:"checkMailbox"})}var t_=[];function tv(e,t,r,n,i){for(t>>>=0,i>>>=0,t_.length=0,r=i>>>3,n=i+n>>>3;r<n;){var o;o=($(),N)[r++>>>0]?($(),N)[r++>>>0]:($(),D)[r++>>>0],t_.push(o)}return(t?nR[t]:nz[e])(...t_)}var tx=()=>{K=0};function tw(e){e>>>=0,n?postMessage({bd:"cleanupThread",Yd:e}):en(er[e])}function t$(e){}var tT=e=>{try{e()}catch(e){j(e)}},tI=0,tS=null,tO=0,tE=[],tA=new Map,tP=new Map,tk=new Map,tD=0,tN=null,tC=[],tz=e=>(function(e){if(!x){if(0===tI){var t=!1,r=!1;e((e=0)=>{if(!x&&(tO=e,t=!0,r)){tI=2,tT(()=>nD(tS)),"u">typeof MainLoop&&MainLoop.Ed&&MainLoop.resume(),e=!1;try{var n,i=(n=($(),A)[tS+8>>>2>>>0],n=tP.get(n),n=tk.get(n),--K,n())}catch(t){i=t,e=!0}var o=!1;if(!tS){var a=tN;a&&(tN=null,(e?a.reject:a.resolve)(i),o=!0)}if(e&&!o)throw i}}),r=!0,t||(tI=1,tS=function(){var e=rB(65548),t=e+12;if(($(),P)[e>>>2>>>0]=t,($(),P)[e+4>>>2>>>0]=t+65536,t=tE[0],!tA.has(t)){var r=tD++;tA.set(t,r),tP.set(r,t)}return t=tA.get(t),($(),A)[e+8>>>2>>>0]=t,e}(),"u">typeof MainLoop&&MainLoop.Ed&&MainLoop.pause(),tT(()=>nP(tS)))}else 2===tI?(tI=0,tT(nN),rR(tS),tS=null,tC.forEach(tf)):j(`invalid state: ${tI}`);return tO}})(t=>{e().then(t)});function tR(e){return e>>>=0,tz(async()=>e4(await e3(e)))}var tB=[],tM=(e,t,r)=>{var n=[];return e=e(n,r),n.length&&(($(),P)[t>>>2>>>0]=e4(n)),e},tj={},tF=e=>{var t=tj[e];return void 0===t?eG(e):t};function tL(e,t,r){var n,i,[o,...a]=((e,t)=>{for(var r=Array(e),n=0;n<e;++n){var i=n,o=($(),P)[t+4*n>>>2>>>0],a=eW[o];if(void 0===a)throw e=`parameter ${n}`,t=eG(o=rN(o)),rR(o),new eX(`${e} has unknown type ${t}`);r[i]=a}return r})(e,t>>>0);t=o.ed.bind(o);var s=a.map(e=>e.dd.bind(e));e--;var u={toValue:e3};switch(e=s.map((e,t)=>{var r=`argFromPtr${t}`;return u[r]=e,`${r}(args${t?"+"+8*t:""})`}),r){case 0:var l="toValue(handle)";break;case 2:l="new (toValue(handle))";break;case 3:l="";break;case 1:u.getStringOrSymbol=tF,l="toValue(handle)[getStringOrSymbol(methodName)]"}return l+=`(${e})`,o.Kd||(u.toReturnWire=t,u.emval_returnValue=tM,l=`return emval_returnValue(toReturnWire, destructorsRef, ${l})`),l=`return function (handle, methodName, destructorsRef, args) {
  ${l}
  }`,n=Object.defineProperty(r=Function(Object.keys(u),l)(...Object.values(u)),"name",{value:l=`methodCaller<(${a.map(e=>e.name)}) => ${o.name}>`}),i=tB.length,tB.push(n),i}function tV(e,t){return t>>>=0,(e=e3(e>>>0))==e3(t)}function tU(e){return(e>>>=0)?(e=tF(e),e4(globalThis[e])):e4(globalThis)}function tq(t){return e4(e[t=tF(t>>>0)])}function tG(e,t){return t>>>=0,e4((e=e3(e>>>0))[t=e3(t)])}function tH(e){9<(e>>>=0)&&(e1[e+1]+=1)}function tW(e,t,r,n,i){return tB[e>>>0](t>>>0,r>>>0,n>>>0,i>>>0)}function tK(e,t,r,n,i){return tW(e>>>0,t>>>0,r>>>0,n>>>0,i>>>0)}function tX(){return e4([])}function tZ(e){e=e3(e>>>0);for(var t=Array(e.length),r=0;r<e.length;r++)t[r]=e[r];return e4(t)}function tJ(e){return e4(tF(e>>>0))}function tQ(){return e4({})}function tY(e){for(var t=e3(e>>>=0);t.length;){var r=t.pop();t.pop()(r)}e2(e)}function t0(e,t,r){t>>>=0,r>>>=0,e=e3(e>>>0),t=e3(t),r=e3(r),e[t]=r}function t1(e,t){e=-0x20000000000000>e||0x20000000000000<e?0/0:Number(e),t>>>=0,e=new Date(1e3*e),($(),A)[t>>>2>>>0]=e.getUTCSeconds(),($(),A)[t+4>>>2>>>0]=e.getUTCMinutes(),($(),A)[t+8>>>2>>>0]=e.getUTCHours(),($(),A)[t+12>>>2>>>0]=e.getUTCDate(),($(),A)[t+16>>>2>>>0]=e.getUTCMonth(),($(),A)[t+20>>>2>>>0]=e.getUTCFullYear()-1900,($(),A)[t+24>>>2>>>0]=e.getUTCDay(),e=(e.getTime()-Date.UTC(e.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,($(),A)[t+28>>>2>>>0]=e}var t2=e=>e%4==0&&(e%100!=0||e%400==0),t3=[0,31,60,91,121,152,182,213,244,274,305,335],t4=[0,31,59,90,120,151,181,212,243,273,304,334];function t6(e,t){e=-0x20000000000000>e||0x20000000000000<e?0/0:Number(e),t>>>=0,e=new Date(1e3*e),($(),A)[t>>>2>>>0]=e.getSeconds(),($(),A)[t+4>>>2>>>0]=e.getMinutes(),($(),A)[t+8>>>2>>>0]=e.getHours(),($(),A)[t+12>>>2>>>0]=e.getDate(),($(),A)[t+16>>>2>>>0]=e.getMonth(),($(),A)[t+20>>>2>>>0]=e.getFullYear()-1900,($(),A)[t+24>>>2>>>0]=e.getDay();var r=(t2(e.getFullYear())?t3:t4)[e.getMonth()]+e.getDate()-1|0;($(),A)[t+28>>>2>>>0]=r,($(),A)[t+36>>>2>>>0]=-60*e.getTimezoneOffset(),r=new Date(e.getFullYear(),6,1).getTimezoneOffset();var n=new Date(e.getFullYear(),0,1).getTimezoneOffset();e=0|(r!=n&&e.getTimezoneOffset()==Math.min(n,r)),($(),A)[t+32>>>2>>>0]=e}function t5(e){e>>>=0;var t=new Date(($(),A)[e+20>>>2>>>0]+1900,($(),A)[e+16>>>2>>>0],($(),A)[e+12>>>2>>>0],($(),A)[e+8>>>2>>>0],($(),A)[e+4>>>2>>>0],($(),A)[e>>>2>>>0],0),r=($(),A)[e+32>>>2>>>0],n=t.getTimezoneOffset(),i=new Date(t.getFullYear(),6,1).getTimezoneOffset(),o=new Date(t.getFullYear(),0,1).getTimezoneOffset(),a=Math.min(o,i);return 0>r?($(),A)[e+32>>>2>>>0]=+(i!=o&&a==n):0<r!=(a==n)&&(i=Math.max(o,i),t.setTime(t.getTime()+6e4*((0<r?a:i)-n))),($(),A)[e+24>>>2>>>0]=t.getDay(),r=(t2(t.getFullYear())?t3:t4)[t.getMonth()]+t.getDate()-1|0,($(),A)[e+28>>>2>>>0]=r,($(),A)[e>>>2>>>0]=t.getSeconds(),($(),A)[e+4>>>2>>>0]=t.getMinutes(),($(),A)[e+8>>>2>>>0]=t.getHours(),($(),A)[e+12>>>2>>>0]=t.getDate(),($(),A)[e+16>>>2>>>0]=t.getMonth(),($(),A)[e+20>>>2>>>0]=t.getYear(),BigInt(isNaN(e=t.getTime())?-1:e/1e3)}function t8(e,t,r,i,o,a,s){return n?X(16,1,e,t,r,i,o,a,s):-52}function t7(e,t,r,i,o,a){if(n)return X(17,1,e,t,r,i,o,a)}var t9={},re=()=>performance.timeOrigin+performance.now();function rt(e,t){if(n)return X(18,1,e,t);if(t9[e]&&(clearTimeout(t9[e].id),delete t9[e]),!t)return 0;var r=setTimeout(()=>{delete t9[e],tf(()=>rU(e,performance.timeOrigin+performance.now()))},t);return t9[e]={id:r,me:t},0}function rr(e,t,r,n){e>>>=0,t>>>=0,r>>>=0,n>>>=0;var i=new Date().getFullYear(),o=new Date(i,0,1).getTimezoneOffset(),a=Math.max(o,i=new Date(i,6,1).getTimezoneOffset());($(),P)[e>>>2>>>0]=60*a,($(),A)[t>>>2>>>0]=+(o!=i),e=(t=e=>{var t=Math.abs(e);return`UTC${0<=e?"-":"+"}${String(Math.floor(t/60)).padStart(2,"0")}${String(t%60).padStart(2,"0")}`})(o),t=t(i),i<o?(tt(e,r,17),tt(t,n,17)):(tt(e,n,17),tt(t,r,17))}var rn=()=>Date.now();function ri(e,t,r){return(r>>>=0,0<=e&&3>=e)?(e=Math.round(1e6*(e=0===e?Date.now():performance.timeOrigin+performance.now())),($(),N)[r>>>3>>>0]=BigInt(e),0):28}var ro=[],ra=(e,t)=>{ro.length=0;for(var r;r=($(),S)[e++>>>0];){var n=105!=r;t+=(n&=112!=r)&&t%8?4:0,ro.push(112==r?($(),P)[t>>>2>>>0]:106==r?($(),N)[t>>>3>>>0]:105==r?($(),A)[t>>>2>>>0]:($(),D)[t>>>3>>>0]),t+=n?8:4}return ro};function rs(e,t,r){return e>>>=0,t=ra(t>>>0,r>>>0),nR[e](...t)}function ru(e,t,r){return e>>>=0,t=ra(t>>>0,r>>>0),nR[e](...t)}var rl=()=>{};function rd(e,t){return v(eP(e>>>0,t>>>0))}var rp=()=>{throw K+=1,"unwind"};function rc(){return 0xffff0000}var rh=()=>navigator.hardwareConcurrency,rf={},rm=e=>{var t;return(t=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e))?+t[1]:(t=/:(\d+):\d+(?:\)|$)/.exec(e))?0x80000000|t[1]:0},rg=e=>{for(var t of e)(e=rm(t))&&(rf[e]=t)};function rb(){var e=Error().stack.toString().split(`
`);return"Error"==e[0]&&e.shift(),rg(e),rf.sd=rm(e[3]),rf.Ud=e,rf.sd}function ry(e){if(!(e=rf[e>>>0]))return 0;if(t=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e))e=t[1];else if(t=/^\s+at (.*) \(.*\)$/.exec(e))e=t[1];else{if(!(t=/^(.+?)@/.exec(e)))return 0;e=t[1]}rR(ry.td??0),t=tr(e)+1;var t,r=rB(t);return r&&tt(e,r,t),ry.td=r,ry.td}function r_(e){e>>>=0;var t=($(),S).length;if(e<=t||0xffff0000<e)return!1;for(var r=1;4>=r;r*=2){var n=t*(1+.2/r);n=Math.min(n,e+0x6000000);e:{n=(Math.min(0xffff0000,65536*Math.ceil(Math.max(e,n)/65536))-es.buffer.byteLength+65535)/65536|0;try{es.grow(n),B();var i=1;break e}catch{}i=void 0}if(i)return!0}return!1}function rv(e,t,r){if(e>>>=0,t>>>=0,rf.sd==e)var n=rf.Ud;else"Error"==(n=Error().stack.toString().split(`
`))[0]&&n.shift(),rg(n);for(var i=3;n[i]&&rm(n[i])!=e;)++i;for(e=0;e<r&&n[e+i];++e)($(),A)[t+4*e>>>2>>>0]=rm(n[e+i]);return e}var rx,rw={},r$=()=>{if(!rx){var e,t={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(e in rw)void 0===rw[e]?delete t[e]:t[e]=rw[e];var r=[];for(e in t)r.push(`${e}=${t[e]}`);rx=r}return rx};function rT(e,t){if(n)return X(19,1,e,t);e>>>=0,t>>>=0;var r,i=0,o=0;for(r of r$()){var a=t+i;($(),P)[e+o>>>2>>>0]=a,i+=tt(r,a,1/0)+1,o+=4}return 0}function rI(e,t){if(n)return X(20,1,e,t);e>>>=0,t>>>=0;var r=r$();for(var i of(($(),P)[e>>>2>>>0]=r.length,e=0,r))e+=tr(i)+1;return($(),P)[t>>>2>>>0]=e,0}function rS(e){return n?X(21,1,e):52}function rO(e,t,r,i,o){return n?X(22,1,e,t,r,i,o):52}function rE(e,t,r,i){return n?X(23,1,e,t,r,i):52}function rA(e,t,r,i){return n?X(24,1,e,t,r,i):70}var rP=[null,[],[]];function rk(e,t,r,i){if(n)return X(25,1,e,t,r,i);t>>>=0,r>>>=0,i>>>=0;for(var o=0,a=0;a<r;a++){var s=($(),P)[t>>>2>>>0],u=($(),P)[t+4>>>2>>>0];t+=8;for(var l=0;l<u;l++){var d=($(),S)[s+l>>>0],p=rP[e];0===d||10===d?((1===e?_:v)(eA(p)),p.length=0):p.push(d)}o+=u}return($(),P)[i>>>2>>>0]=o,0}function rD(e){return e>>>0}n||function(){for(var t=e.numThreads-1;t--;)ea();q.push(async()=>{var e=async function(){if(!n)return Promise.all(Y.map(eo))}();G++,await e,0==--G&&H&&(e=H,H=null,e())})}(),n||(es=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),B()),e.wasmBinary&&(p=e.wasmBinary),e.stackSave=()=>rZ(),e.stackRestore=e=>rK(e),e.stackAlloc=e=>rX(e),e.setValue=function(e,t,r="i8"){switch(r.endsWith("*")&&(r="*"),r){case"i1":case"i8":($(),I)[e>>>0]=t;break;case"i16":($(),O)[e>>>1>>>0]=t;break;case"i32":($(),A)[e>>>2>>>0]=t;break;case"i64":($(),N)[e>>>3>>>0]=BigInt(t);break;case"float":($(),k)[e>>>2>>>0]=t;break;case"double":($(),D)[e>>>3>>>0]=t;break;case"*":($(),P)[e>>>2>>>0]=t;break;default:j(`invalid type for setValue: ${r}`)}},e.getValue=function(e,t="i8"){switch(t.endsWith("*")&&(t="*"),t){case"i1":case"i8":return($(),I)[e>>>0];case"i16":return($(),O)[e>>>1>>>0];case"i32":return($(),A)[e>>>2>>>0];case"i64":return($(),N)[e>>>3>>>0];case"float":return($(),k)[e>>>2>>>0];case"double":return($(),D)[e>>>3>>>0];case"*":return($(),P)[e>>>2>>>0];default:j(`invalid type for getValue: ${t}`)}},e.UTF8ToString=eP,e.stringToUTF8=tt,e.lengthBytesUTF8=tr;var rN,rC,rz,rR,rB,rM,rj,rF,rL,rV,rU,rq,rG,rH,rW,rK,rX,rZ,rJ,rQ,rY,r0,r1,r2,r3,r4,r6,r5,r8,r7,r9,ne,nt,nr,nn,ni,no,na,ns,nu,nl,nd,np,nc,nh,nf,nm,ng,nb,ny,n_,nv,nx,nw,n$,nT,nI,nS,nO,nE,nA,nP,nk,nD,nN,nC,nz=[Z,J,eT,ek,eD,eN,eC,ez,eR,eB,eM,ej,eF,eL,eV,eU,t8,t7,rt,rT,rI,rS,rO,rE,rA,rk],nR={1124124:(t,r,n,i,o)=>{if(void 0===e||!e.jd)return 1;if((t=eP(Number(t>>>0))).startsWith("./")&&(t=t.substring(2)),!(t=e.jd.get(t)))return 2;if(r=Number(r>>>0),n=Number(n>>>0),i=Number(i>>>0),r+n>t.byteLength)return 3;try{let a=t.subarray(r,r+n);switch(o){case 0:($(),S).set(a,i>>>0);break;case 1:e.ae?e.ae(i,a):e.Td(i,a);break;default:return 4}return 0}catch{return 4}},1124948:()=>"u">typeof navigator&&navigator.de?1:0,1125020:(t,r,n)=>{e.Dd(t,($(),S).subarray(r>>>0,r+n>>>0))},1125084:()=>e.ce(),1125126:t=>{e.Cd(t)},1125163:()=>{e.Md()},1125194:()=>{e.Nd()},1125223:()=>{e.Rd()},1125248:t=>e.Ld(t),1125281:t=>e.Pd(t),1125313:(t,r,n)=>{e.rd(Number(t),Number(r),Number(n),!0)},1125376:(t,r,n)=>{e.rd(Number(t),Number(r),Number(n))},1125433:()=>"u">typeof wasmOffsetConverter,1125490:t=>{e.ic("Abs",t,void 0)},1125541:t=>{e.ic("Neg",t,void 0)},1125592:t=>{e.ic("Floor",t,void 0)},1125645:t=>{e.ic("Ceil",t,void 0)},1125697:t=>{e.ic("Reciprocal",t,void 0)},1125755:t=>{e.ic("Sqrt",t,void 0)},1125807:t=>{e.ic("Exp",t,void 0)},1125858:t=>{e.ic("Erf",t,void 0)},1125909:t=>{e.ic("Sigmoid",t,void 0)},1125964:(t,r,n)=>{e.ic("HardSigmoid",t,{alpha:r,beta:n})},1126043:t=>{e.ic("HardSwish",t,void 0)},1126100:t=>{e.ic("Log",t,void 0)},1126151:t=>{e.ic("Sin",t,void 0)},1126202:t=>{e.ic("Cos",t,void 0)},1126253:t=>{e.ic("Tan",t,void 0)},1126304:t=>{e.ic("Asin",t,void 0)},1126356:t=>{e.ic("Acos",t,void 0)},1126408:t=>{e.ic("Atan",t,void 0)},1126460:t=>{e.ic("Sinh",t,void 0)},1126512:t=>{e.ic("Cosh",t,void 0)},1126564:t=>{e.ic("Asinh",t,void 0)},1126617:t=>{e.ic("Acosh",t,void 0)},1126670:t=>{e.ic("Atanh",t,void 0)},1126723:t=>{e.ic("Tanh",t,void 0)},1126775:t=>{e.ic("Not",t,void 0)},1126826:(t,r,n)=>{e.ic("Clip",t,{min:r,max:n})},1126895:t=>{e.ic("Clip",t,void 0)},1126947:(t,r)=>{e.ic("Elu",t,{alpha:r})},1127005:t=>{e.ic("Gelu",t,void 0)},1127057:t=>{e.ic("Relu",t,void 0)},1127109:(t,r)=>{e.ic("LeakyRelu",t,{alpha:r})},1127173:(t,r)=>{e.ic("ThresholdedRelu",t,{alpha:r})},1127243:(t,r)=>{e.ic("Cast",t,{to:r})},1127301:t=>{e.ic("Add",t,void 0)},1127352:t=>{e.ic("Sub",t,void 0)},1127403:t=>{e.ic("Mul",t,void 0)},1127454:t=>{e.ic("Div",t,void 0)},1127505:t=>{e.ic("Pow",t,void 0)},1127556:t=>{e.ic("Equal",t,void 0)},1127609:t=>{e.ic("Greater",t,void 0)},1127664:t=>{e.ic("GreaterOrEqual",t,void 0)},1127726:t=>{e.ic("Less",t,void 0)},1127778:t=>{e.ic("LessOrEqual",t,void 0)},1127837:(t,r,n,i,o)=>{e.ic("ReduceMean",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},1128012:(t,r,n,i,o)=>{e.ic("ReduceMax",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},1128186:(t,r,n,i,o)=>{e.ic("ReduceMin",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},1128360:(t,r,n,i,o)=>{e.ic("ReduceProd",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},1128535:(t,r,n,i,o)=>{e.ic("ReduceSum",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},1128709:(t,r,n,i,o)=>{e.ic("ReduceL1",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},1128882:(t,r,n,i,o)=>{e.ic("ReduceL2",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},1129055:(t,r,n,i,o)=>{e.ic("ReduceLogSum",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},1129232:(t,r,n,i,o)=>{e.ic("ReduceSumSquare",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},1129412:(t,r,n,i,o)=>{e.ic("ReduceLogSumExp",t,{keepDims:!!r,noopWithEmptyAxes:!!n,axes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},1129592:t=>{e.ic("Where",t,void 0)},1129645:(t,r,n)=>{e.ic("Transpose",t,{perm:r?Array.from(($(),A).subarray(Number(r)>>>0,Number(n)>>>0)):[]})},1129769:(t,r,n,i)=>{e.ic("DepthToSpace",t,{blocksize:r,mode:eP(n),format:i?"NHWC":"NCHW"})},1129902:(t,r,n,i)=>{e.ic("DepthToSpace",t,{blocksize:r,mode:eP(n),format:i?"NHWC":"NCHW"})},1130035:(t,r,n,i)=>{e.ic("DFT",t,{axis:r,inverse:n,onesided:i})},1130127:(t,r,n,i,o,a,s,u,l,d,p,c,h,f,m)=>{e.ic("ConvTranspose",t,{format:l?"NHWC":"NCHW",autoPad:r,dilations:[n],group:i,kernelShape:[o],pads:[a,s],strides:[u],wIsConst:()=>!!($(),I)[d>>>0],outputPadding:p?Array.from(($(),A).subarray(Number(p)>>>0,Number(c)>>>0)):[],outputShape:h?Array.from(($(),A).subarray(Number(h)>>>0,Number(f)>>>0)):[],activation:eP(m)})},1130560:(t,r,n,i,o,a,s,u,l,d,p,c,h,f)=>{e.ic("ConvTranspose",t,{format:u?"NHWC":"NCHW",autoPad:r,dilations:Array.from(($(),A).subarray(Number(n)>>>0,(Number(n)>>>0)+2>>>0)),group:i,kernelShape:Array.from(($(),A).subarray(Number(o)>>>0,(Number(o)>>>0)+2>>>0)),pads:Array.from(($(),A).subarray(Number(a)>>>0,(Number(a)>>>0)+4>>>0)),strides:Array.from(($(),A).subarray(Number(s)>>>0,(Number(s)>>>0)+2>>>0)),wIsConst:()=>!!($(),I)[l>>>0],outputPadding:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],outputShape:c?Array.from(($(),A).subarray(Number(c)>>>0,Number(h)>>>0)):[],activation:eP(f)})},1131221:(t,r,n,i,o,a,s,u,l,d,p,c,h,f,m)=>{e.ic("ConvTranspose",t,{format:l?"NHWC":"NCHW",autoPad:r,dilations:[n],group:i,kernelShape:[o],pads:[a,s],strides:[u],wIsConst:()=>!!($(),I)[d>>>0],outputPadding:p?Array.from(($(),A).subarray(Number(p)>>>0,Number(c)>>>0)):[],outputShape:h?Array.from(($(),A).subarray(Number(h)>>>0,Number(f)>>>0)):[],activation:eP(m)})},1131654:(t,r,n,i,o,a,s,u,l,d,p,c,h,f)=>{e.ic("ConvTranspose",t,{format:u?"NHWC":"NCHW",autoPad:r,dilations:Array.from(($(),A).subarray(Number(n)>>>0,(Number(n)>>>0)+2>>>0)),group:i,kernelShape:Array.from(($(),A).subarray(Number(o)>>>0,(Number(o)>>>0)+2>>>0)),pads:Array.from(($(),A).subarray(Number(a)>>>0,(Number(a)>>>0)+4>>>0)),strides:Array.from(($(),A).subarray(Number(s)>>>0,(Number(s)>>>0)+2>>>0)),wIsConst:()=>!!($(),I)[l>>>0],outputPadding:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],outputShape:c?Array.from(($(),A).subarray(Number(c)>>>0,Number(h)>>>0)):[],activation:eP(f)})},1132315:(t,r)=>{e.ic("GlobalAveragePool",t,{format:r?"NHWC":"NCHW"})},1132406:(t,r,n,i,o,a,s,u,l,d,p,c,h,f)=>{e.ic("AveragePool",t,{format:f?"NHWC":"NCHW",auto_pad:r,ceil_mode:n,count_include_pad:i,storage_order:o,dilations:a?Array.from(($(),A).subarray(Number(a)>>>0,Number(s)>>>0)):[],kernel_shape:u?Array.from(($(),A).subarray(Number(u)>>>0,Number(l)>>>0)):[],pads:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],strides:c?Array.from(($(),A).subarray(Number(c)>>>0,Number(h)>>>0)):[]})},1132885:(t,r)=>{e.ic("GlobalAveragePool",t,{format:r?"NHWC":"NCHW"})},1132976:(t,r,n,i,o,a,s,u,l,d,p,c,h,f)=>{e.ic("AveragePool",t,{format:f?"NHWC":"NCHW",auto_pad:r,ceil_mode:n,count_include_pad:i,storage_order:o,dilations:a?Array.from(($(),A).subarray(Number(a)>>>0,Number(s)>>>0)):[],kernel_shape:u?Array.from(($(),A).subarray(Number(u)>>>0,Number(l)>>>0)):[],pads:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],strides:c?Array.from(($(),A).subarray(Number(c)>>>0,Number(h)>>>0)):[]})},1133455:(t,r)=>{e.ic("GlobalMaxPool",t,{format:r?"NHWC":"NCHW"})},1133542:(t,r,n,i,o,a,s,u,l,d,p,c,h,f)=>{e.ic("MaxPool",t,{format:f?"NHWC":"NCHW",auto_pad:r,ceil_mode:n,count_include_pad:i,storage_order:o,dilations:a?Array.from(($(),A).subarray(Number(a)>>>0,Number(s)>>>0)):[],kernel_shape:u?Array.from(($(),A).subarray(Number(u)>>>0,Number(l)>>>0)):[],pads:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],strides:c?Array.from(($(),A).subarray(Number(c)>>>0,Number(h)>>>0)):[]})},1134017:(t,r)=>{e.ic("GlobalMaxPool",t,{format:r?"NHWC":"NCHW"})},1134104:(t,r,n,i,o,a,s,u,l,d,p,c,h,f)=>{e.ic("MaxPool",t,{format:f?"NHWC":"NCHW",auto_pad:r,ceil_mode:n,count_include_pad:i,storage_order:o,dilations:a?Array.from(($(),A).subarray(Number(a)>>>0,Number(s)>>>0)):[],kernel_shape:u?Array.from(($(),A).subarray(Number(u)>>>0,Number(l)>>>0)):[],pads:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],strides:c?Array.from(($(),A).subarray(Number(c)>>>0,Number(h)>>>0)):[]})},1134579:(t,r,n,i,o)=>{e.ic("Gemm",t,{alpha:r,beta:n,transA:i,transB:o})},1134683:t=>{e.ic("MatMul",t,void 0)},1134737:(t,r,n,i)=>{e.ic("ArgMax",t,{keepDims:!!r,selectLastIndex:!!n,axis:i})},1134845:(t,r,n,i)=>{e.ic("ArgMin",t,{keepDims:!!r,selectLastIndex:!!n,axis:i})},1134953:(t,r)=>{e.ic("Softmax",t,{axis:r})},1135016:(t,r)=>{e.ic("Concat",t,{axis:r})},1135076:(t,r,n,i,o)=>{e.ic("Split",t,{axis:r,numOutputs:n,splitSizes:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},1135232:t=>{e.ic("Expand",t,void 0)},1135286:(t,r)=>{e.ic("Gather",t,{axis:Number(r)})},1135357:(t,r)=>{e.ic("GatherElements",t,{axis:Number(r)})},1135436:(t,r)=>{e.ic("GatherND",t,{batch_dims:Number(r)})},1135515:(t,r,n,i,o,a,s,u,l,d,p)=>{e.ic("Resize",t,{antialias:r,axes:n?Array.from(($(),A).subarray(Number(n)>>>0,Number(i)>>>0)):[],coordinateTransformMode:eP(o),cubicCoeffA:a,excludeOutside:s,extrapolationValue:u,keepAspectRatioPolicy:eP(l),mode:eP(d),nearestMode:eP(p)})},1135877:(t,r,n,i,o,a,s)=>{e.ic("Slice",t,{starts:r?Array.from(($(),A).subarray(Number(r)>>>0,Number(n)>>>0)):[],ends:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[],axes:a?Array.from(($(),A).subarray(Number(a)>>>0,Number(s)>>>0)):[]})},1136141:t=>{e.ic("Tile",t,void 0)},1136193:(t,r,n)=>{e.ic("InstanceNormalization",t,{epsilon:r,format:n?"NHWC":"NCHW"})},1136307:(t,r,n)=>{e.ic("InstanceNormalization",t,{epsilon:r,format:n?"NHWC":"NCHW"})},1136421:t=>{e.ic("Range",t,void 0)},1136474:(t,r)=>{e.ic("Einsum",t,{equation:eP(r)})},1136555:(t,r,n,i,o)=>{e.ic("Pad",t,{mode:r,value:n,pads:i?Array.from(($(),A).subarray(Number(i)>>>0,Number(o)>>>0)):[]})},1136698:(t,r,n,i,o,a)=>{e.ic("BatchNormalization",t,{epsilon:r,momentum:n,spatial:!!o,trainingMode:!!i,format:a?"NHWC":"NCHW"})},1136867:(t,r,n,i,o,a)=>{e.ic("BatchNormalization",t,{epsilon:r,momentum:n,spatial:!!o,trainingMode:!!i,format:a?"NHWC":"NCHW"})},1137036:(t,r,n)=>{e.ic("CumSum",t,{exclusive:Number(r),reverse:Number(n)})},1137133:(t,r,n)=>{e.ic("DequantizeLinear",t,{axis:r,blockSize:n})},1137223:(t,r,n,i,o)=>{e.ic("GridSample",t,{align_corners:r,mode:eP(n),padding_mode:eP(i),format:o?"NHWC":"NCHW"})},1137393:(t,r,n,i,o)=>{e.ic("GridSample",t,{align_corners:r,mode:eP(n),padding_mode:eP(i),format:o?"NHWC":"NCHW"})},1137563:(t,r)=>{e.ic("ScatterND",t,{reduction:eP(r)})},1137648:(t,r,n,i,o,a,s,u,l)=>{e.ic("Attention",t,{numHeads:r,isUnidirectional:n,maskFilterValue:i,scale:o,doRotary:a,qkvHiddenSizes:s?Array.from(($(),A).subarray(Number(u)>>>0,Number(u)+s>>>0)):[],pastPresentShareBuffer:!!l})},1137920:t=>{e.ic("BiasAdd",t,void 0)},1137975:t=>{e.ic("BiasSplitGelu",t,void 0)},1138036:t=>{e.ic("FastGelu",t,void 0)},1138092:(t,r,n,i,o,a,s,u,l,d,p,c,h,f,m,g)=>{e.ic("Conv",t,{format:c?"NHWC":"NCHW",auto_pad:r,dilations:n?Array.from(($(),A).subarray(Number(n)>>>0,Number(i)>>>0)):[],group:o,kernel_shape:a?Array.from(($(),A).subarray(Number(a)>>>0,Number(s)>>>0)):[],pads:u?Array.from(($(),A).subarray(Number(u)>>>0,Number(l)>>>0)):[],strides:d?Array.from(($(),A).subarray(Number(d)>>>0,Number(p)>>>0)):[],w_is_const:()=>!!($(),I)[Number(h)>>>0],activation:eP(f),activation_params:m?Array.from(($(),k).subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1138676:t=>{e.ic("Gelu",t,void 0)},1138728:(t,r,n,i,o,a,s,u,l)=>{e.ic("GroupQueryAttention",t,{numHeads:r,kvNumHeads:n,scale:i,softcap:o,doRotary:a,rotaryInterleaved:s,smoothSoftmax:u,localWindowSize:l})},1138945:(t,r,n,i)=>{e.ic("LayerNormalization",t,{axis:r,epsilon:n,simplified:!!i})},1139056:(t,r,n,i)=>{e.ic("LayerNormalization",t,{axis:r,epsilon:n,simplified:!!i})},1139167:(t,r,n,i,o,a)=>{e.ic("MatMulNBits",t,{k:r,n:n,accuracyLevel:i,bits:o,blockSize:a})},1139294:(t,r,n,i,o,a)=>{e.ic("MultiHeadAttention",t,{numHeads:r,isUnidirectional:n,maskFilterValue:i,scale:o,doRotary:a})},1139453:(t,r)=>{e.ic("QuickGelu",t,{alpha:r})},1139517:(t,r,n,i,o)=>{e.ic("RotaryEmbedding",t,{interleaved:!!r,numHeads:n,rotaryEmbeddingDim:i,scale:o})},1139656:(t,r,n)=>{e.ic("SkipLayerNormalization",t,{epsilon:r,simplified:!!n})},1139758:(t,r,n)=>{e.ic("SkipLayerNormalization",t,{epsilon:r,simplified:!!n})},1139860:(t,r,n,i)=>{e.ic("GatherBlockQuantized",t,{gatherAxis:r,quantizeAxis:n,blockSize:i})},1139981:t=>{e.Qd(t)},1140015:(t,r)=>e.Sd(Number(t),Number(r),e.hd.Vd,e.hd.errors)};function nB(t,r,n){return tz(async()=>{await e.Od(Number(t),Number(r),Number(n))})}function nM(){return"u">typeof wasmOffsetConverter}function nj(e,t,r,n){var i=rZ();try{return nt(e,t,r,n)}catch(e){if(rK(i),e!==e+0)throw e;rG(1,0)}}function nF(e,t,r){var n=rZ();try{return r9(e,t,r)}catch(e){if(rK(n),e!==e+0)throw e;rG(1,0)}}function nL(e){var t=rZ();try{r8(e)}catch(e){if(rK(t),e!==e+0)throw e;rG(1,0)}}function nV(e,t){var r=rZ();try{return r2(e,t)}catch(e){if(rK(r),e!==e+0)throw e;rG(1,0)}}function nU(e,t,r){var n=rZ();try{r1(e,t,r)}catch(e){if(rK(n),e!==e+0)throw e;rG(1,0)}}function nq(e,t,r,n){var i=rZ();try{return na(e,t,r,n)}catch(e){if(rK(i),e!==e+0)throw e;rG(1,0)}}function nG(e,t){var r=rZ();try{nr(e,t)}catch(e){if(rK(r),e!==e+0)throw e;rG(1,0)}}function nH(e,t,r,n,i,o,a){var s=rZ();try{return ne(e,t,r,n,i,o,a)}catch(e){if(rK(s),e!==e+0)throw e;rG(1,0)}}function nW(e,t,r,n,i,o){var a=rZ();try{r3(e,t,r,n,i,o)}catch(e){if(rK(a),e!==e+0)throw e;rG(1,0)}}function nK(e,t,r,n){var i=rZ();try{r6(e,t,r,n)}catch(e){if(rK(i),e!==e+0)throw e;rG(1,0)}}function nX(e,t,r,n,i){var o=rZ();try{r7(e,t,r,n,i)}catch(e){if(rK(o),e!==e+0)throw e;rG(1,0)}}function nZ(e,t,r,n,i,o,a){var s=rZ();try{ni(e,t,r,n,i,o,a)}catch(e){if(rK(s),e!==e+0)throw e;rG(1,0)}}function nJ(e,t,r,n,i,o,a){var s=rZ();try{no(e,t,r,n,i,o,a)}catch(e){if(rK(s),e!==e+0)throw e;rG(1,0)}}function nQ(e,t,r,n,i,o,a,s){var u=rZ();try{nd(e,t,r,n,i,o,a,s)}catch(e){if(rK(u),e!==e+0)throw e;rG(1,0)}}function nY(e,t,r,n,i){var o=rZ();try{return nn(e,t,r,n,i)}catch(e){if(rK(o),e!==e+0)throw e;rG(1,0)}}function n0(e,t,r){var n=rZ();try{return r5(e,t,r)}catch(e){if(rK(n),e!==e+0)throw e;rG(1,0)}}function n1(e,t,r,n,i,o,a,s){var u=rZ();try{np(e,t,r,n,i,o,a,s)}catch(e){if(rK(u),e!==e+0)throw e;rG(1,0)}}function n2(e,t,r,n,i,o,a,s,u,l,d,p){var c=rZ();try{ns(e,t,r,n,i,o,a,s,u,l,d,p)}catch(e){if(rK(c),e!==e+0)throw e;rG(1,0)}}function n3(e,t,r){var n=rZ();try{return nc(e,t,r)}catch(e){if(rK(n),e!==e+0)throw e;return rG(1,0),0n}}function n4(e,t,r,n,i,o,a,s,u){var l=rZ();try{r4(e,t,r,n,i,o,a,s,u)}catch(e){if(rK(l),e!==e+0)throw e;rG(1,0)}}function n6(e){var t=rZ();try{return nh(e)}catch(e){if(rK(t),e!==e+0)throw e;rG(1,0)}}function n5(e,t){var r=rZ();try{return nE(e,t)}catch(e){if(rK(r),e!==e+0)throw e;return rG(1,0),0n}}function n8(e,t,r,n){var i=rZ();try{return nf(e,t,r,n)}catch(e){if(rK(i),e!==e+0)throw e;rG(1,0)}}function n7(e,t,r,n,i,o,a){var s=rZ();try{nA(e,t,r,n,i,o,a)}catch(e){if(rK(s),e!==e+0)throw e;rG(1,0)}}function n9(e){var t=rZ();try{return nm(e)}catch(e){if(rK(t),e!==e+0)throw e;return rG(1,0),0n}}function ie(e,t,r,n,i){var o=rZ();try{return nx(e,t,r,n,i)}catch(e){if(rK(o),e!==e+0)throw e;rG(1,0)}}function it(e,t,r,n,i,o){var a=rZ();try{return nw(e,t,r,n,i,o)}catch(e){if(rK(a),e!==e+0)throw e;rG(1,0)}}function ir(e,t,r,n,i,o){var a=rZ();try{return nu(e,t,r,n,i,o)}catch(e){if(rK(a),e!==e+0)throw e;rG(1,0)}}function ii(e,t,r,n,i,o){var a=rZ();try{return n$(e,t,r,n,i,o)}catch(e){if(rK(a),e!==e+0)throw e;rG(1,0)}}function io(e,t,r,n,i,o,a,s){var u=rZ();try{return nl(e,t,r,n,i,o,a,s)}catch(e){if(rK(u),e!==e+0)throw e;rG(1,0)}}function ia(e,t,r,n,i){var o=rZ();try{return nT(e,t,r,n,i)}catch(e){if(rK(o),e!==e+0)throw e;return rG(1,0),0n}}function is(e,t,r,n){var i=rZ();try{return nI(e,t,r,n)}catch(e){if(rK(i),e!==e+0)throw e;rG(1,0)}}function iu(e,t,r,n){var i=rZ();try{return nS(e,t,r,n)}catch(e){if(rK(i),e!==e+0)throw e;rG(1,0)}}function il(e,t,r,n,i,o,a,s,u,l,d,p){var c=rZ();try{return nO(e,t,r,n,i,o,a,s,u,l,d,p)}catch(e){if(rK(c),e!==e+0)throw e;rG(1,0)}}function id(e,t,r,n,i,o,a,s,u,l,d){var p=rZ();try{n_(e,t,r,n,i,o,a,s,u,l,d)}catch(e){if(rK(p),e!==e+0)throw e;rG(1,0)}}function ip(e,t,r,n,i,o,a,s,u,l,d,p,c,h,f,m){var g=rZ();try{nv(e,t,r,n,i,o,a,s,u,l,d,p,c,h,f,m)}catch(e){if(rK(g),e!==e+0)throw e;rG(1,0)}}function ic(e,t,r){var n=rZ();try{return ng(e,t,r)}catch(e){if(rK(n),e!==e+0)throw e;rG(1,0)}}function ih(e,t,r){var n=rZ();try{return nb(e,t,r)}catch(e){if(rK(n),e!==e+0)throw e;rG(1,0)}}function im(e,t,r,n){var i=rZ();try{ny(e,t,r,n)}catch(e){if(rK(i),e!==e+0)throw e;rG(1,0)}}function ig(){if(0<G)H=ig;else if(n)f?.(e),M();else{for(;0<q.length;)q.shift()(e);0<G?H=ig:(e.calledRun=!0,x||(M(),f?.(e)))}}return n||(nC=await L(),ig()),e.PTR_SIZE=4,R?e:new Promise((e,t)=>{f=e,m=t})}W(uL,{default:()=>uU});var uU,uq,uG,uH,uW,uK,uX,uZ,uJ,uQ,uY,u0,u1,u2,u3,u4,u6,u5,u8,u7,u9,le,lt,lr,ln,li,lo,la,ls,lu,ll,ld,lp,lc,lh,lf,lm,lg,lb,ly,l_,lv,lx,lw,l$,lT,lI,lS,lO,lE,lA,lP,lk,lD,lN,lC,lz,lR,lB,lM,lj,lF,lL,lV,lU,lq,lG,lH,lW,lK,lX,lZ,lJ,lQ,lY,l0,l1,l2,l3,l4,l6,l5,l8,l7,l9,de,dt,dr,dn,di,da,ds,du,dl,dd,dp,dc,dh,df,dm,dg,db,dy,d_,dv,dx,dw,d$,dT,dI,dS,dO,dE,dA,dP,dk,dD,dN,dC,dz,dR,dB,dM,dj,dF,dL,dV,dU,dq,dG,dH,dW,dK,dX,dZ,dJ,dQ,dY,d0,d1,d2,d3,d4,d6,d5,d8,d7,d9,pe,pt,pr,pn,pi,po,pa,ps,pu,pl,pd,pp,pc,ph,pf,pm,pg,pb,py,p_,pv,px,pw,p$,pT,pI,pS,pO,pE,pA,pP,pk,pD,pN,pC,pz,pR,pB,pM,pj,pF,pL,pV,pU,pq,pG,pH,pW,pK,pX,pZ,pJ,pQ,pY,p0,p1,p2,p3,p4,p6,p5,p8,p7,p9,ce,ct,cr,cn,ci,co,ca,cs,cu,cl,cd,cp,cc,ch,cf,cm,cg,cb,cy,c_,cv,cx,cw,c$,cT,cI,cS,cO,cE,cA,cP,ck,cD,cN,cC,cz,cR,cB,cM,cj,cF,cL,cV,cU,cq,cG,cH,cW,cK,cX,cZ,cJ,cQ,cY,c0,c1,c2,c3,c4,c6,c5,c8,c7,c9,he,ht,hr,hn,hi,ho,ha,hs,hu,hl,hd,hp,hc,hh,hf,hm,hg,hb,hy,h_,hv,hx,hw,h$,hT,hI,hS,hO,hE,hA,hP,hk,hD,hN,hC,hz,hR,hB,hM,hj,hF,hL,hV,hU=G(()=>{"use strict";uU=uV,globalThis.self?.name?.startsWith("em-pthread")&&uV()}),hq=G(()=>{"use strict";uR(),uq=typeof location>"u"?void 0:location.origin,uG=import.meta.url>"file:"&&import.meta.url<"file;",uH=(()=>{if(uG){let e=URL;return new URL(new e("ort.all.bundle.min.mjs",import.meta.url).href,uq).href}return import.meta.url})(),uW=()=>{if(uH&&!uH.startsWith("blob:"))return uH.substring(0,uH.lastIndexOf("/")+1)},uK=(e,t)=>{try{let r=t??uH;return(r?new URL(e,r):new URL(e)).origin===uq}catch{return!1}},uX=async e=>{let t=await (await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},uZ=(uF(),Z(uB)).default,uJ=async()=>{if(!uH)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(uK(uH))return[void 0,uZ()];let e=await uX(uH);return[e,uZ(e)]},uQ=(hU(),Z(uL)).default,uY=async(e,t,r,n)=>{let i=uQ&&!(e||t);if(i)if(uH)i=uK(uH)||n&&!r;else if(n&&!r)i=!0;else throw Error("cannot determine the script source URL.");if(i)return[void 0,uQ];{let n,i,o="ort-wasm-simd-threaded.jsep.mjs",a=e??((e,t)=>{let r=t??uH;try{return(r?new URL(e,r):new URL(e)).href}catch{return}})(o,t),s=r&&a&&!uK(a,t),u=s?await uX(a):a??(n=o,i=t,`${i??"./"}${n}`);return[s?u:void 0,await (async e=>(await import(e)).default)(u)]}}}),hG=G(()=>{"use strict";hq(),u1=!1,u2=!1,u3=!1,u4=async e=>{if(u1)return Promise.resolve();if(u2)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(u3)throw Error("previous call to 'initializeWebAssembly()' failed.");u2=!0;let t=e.initTimeout,r=e.numThreads;if(!1!==e.simd){if("relaxed"===e.simd){if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}})())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}})())throw Error("WebAssembly SIMD is not supported in the current environment.")}let n=(()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}})();r>1&&!n&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let i=e.wasmPaths,o="string"==typeof i?i:void 0,a=i?.mjs,s=a?.href??a,u=i?.wasm,l=u?.href??u,d=e.wasmBinary,[p,c]=await uY(s,o,r>1,!!d||!!l),h=!1,f=[];if(t>0&&f.push(new Promise(e=>{setTimeout(()=>{h=!0,e()},t)})),f.push(new Promise((e,t)=>{let n={numThreads:r};if(d)n.wasmBinary=d,n.locateFile=e=>e;else if(l||o)n.locateFile=e=>l??o+e;else if(s&&0!==s.indexOf("blob:"))n.locateFile=e=>new URL(e,s).href;else if(p){let e=uW();e&&(n.locateFile=t=>e+t)}c(n).then(t=>{u2=!1,u1=!0,u0=t,e(),p&&URL.revokeObjectURL(p)},e=>{u2=!1,u3=!0,t(e)})})),await Promise.race(f),h)throw Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},u6=()=>{if(u1&&u0)return u0;throw Error("WebAssembly is not initialized yet.")}}),hH=G(()=>{"use strict";hG(),u5=(e,t)=>{let r=u6(),n=r.lengthBytesUTF8(e)+1,i=r._malloc(n);return r.stringToUTF8(e,i,n),t.push(i),i},u8=(e,t,r,n)=>{if("object"==typeof e&&null!==e){if(r.has(e))throw Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([e,i])=>{let o=t?t+e:e;if("object"==typeof i)u8(i,o+".",r,n);else if("string"==typeof i||"number"==typeof i)n(o,i.toString());else if("boolean"==typeof i)n(o,i?"1":"0");else throw Error(`Can't handle extra config type: ${typeof i}`)})},u7=e=>{let t=u6(),r=t.stackSave();try{let r=t.PTR_SIZE,n=t.stackAlloc(2*r);t._OrtGetLastError(n,n+r);let i=Number(t.getValue(n,4===r?"i32":"i64")),o=t.getValue(n+r,"*"),a=o?t.UTF8ToString(o):"";throw Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${a}`)}finally{t.stackRestore(r)}}}),hW=G(()=>{"use strict";hG(),hH(),u9=(e,t)=>{let r=u6(),n=0,i=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if("number"!=typeof e.logSeverityLevel||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if("number"!=typeof e.logVerbosityLevel||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let a=0;for(let s of(e?.tag!==void 0&&(a=u5(e.tag,i)),n=r._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,a),0===n&&u7("Can't create run options."),e?.extra!==void 0&&u8(e.extra,"",new WeakSet,(e,t)=>{let o=u5(e,i),a=u5(t,i);0!==r._OrtAddRunConfigEntry(n,o,a)&&u7(`Can't set a run config entry: ${e} - ${t}.`)}),t))0!==r._OrtRunOptionsAddActiveLoraAdapter(n,s)&&u7("Can't add an active LoRA adapter.");return[n,i]}catch(e){throw 0!==n&&r._OrtReleaseRunOptions(n),i.forEach(e=>r._free(e)),e}}}),hK=G(()=>{"use strict";hG(),hH(),le=(e,t,r,n)=>{let i=u5(t,n),o=u5(r,n);0!==u6()._OrtAddSessionConfigEntry(e,i,o)&&u7(`Can't set a session config entry: ${t} - ${r}.`)},lt=async e=>{var t;let r,n=u6(),i=0,o=[],a=e||{};(t=a).extra||(t.extra={}),t.extra.session||(t.extra.session={}),(r=t.extra.session).use_ort_model_bytes_directly||(r.use_ort_model_bytes_directly="1"),t.executionProviders&&t.executionProviders.some(e=>("string"==typeof e?e:e.name)==="webgpu")&&(t.enableMemPattern=!1);try{let e=(e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}})(a.graphOptimizationLevel??"all"),t=(e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${e}`)}})(a.executionMode??"sequential"),r="string"==typeof a.logId?u5(a.logId,o):0,s=a.logSeverityLevel??2;if(!Number.isInteger(s)||s<0||s>4)throw Error(`log severity level is not valid: ${s}`);let u=a.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log verbosity level is not valid: ${u}`);let l="string"==typeof a.optimizedModelFilePath?u5(a.optimizedModelFilePath,o):0;if(i=n._OrtCreateSessionOptions(e,!!a.enableCpuMemArena,!!a.enableMemPattern,t,!!a.enableProfiling,0,r,s,u,l),0===i&&u7("Can't create session options."),a.executionProviders&&await (async(e,t,r)=>{for(let n of t.executionProviders){let t,i="string"==typeof n?n:n.name,o=[];switch(i){case"webnn":if(i="WEBNN",le(e,"session.disable_quant_qdq","1",r),le(e,"session.disable_qdq_constant_folding","1",r),"string"!=typeof n){let t=n?.deviceType;t&&le(e,"deviceType",t,r)}break;case"webgpu":if(i="JS","string"!=typeof n&&n?.preferredLayout){if("NCHW"!==n.preferredLayout&&"NHWC"!==n.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${n.preferredLayout}`);le(e,"preferredLayout",n.preferredLayout,r)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${i}`)}let a=o.length,s=0,u=0;if(a>0){s=u6()._malloc(a*u6().PTR_SIZE),r.push(s),u=u6()._malloc(a*u6().PTR_SIZE),r.push(u);for(let e=0;e<a;e++)u6().setValue(s+e*u6().PTR_SIZE,o[e][0],"*"),u6().setValue(u+e*u6().PTR_SIZE,o[e][1],"*")}{let n=u5(i,r);t=await u6()._OrtAppendExecutionProvider(e,n,s,u,a)}0!==t&&u7(`Can't append execution provider: ${i}.`)}})(i,a,o),void 0!==a.enableGraphCapture){if("boolean"!=typeof a.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);le(i,"enableGraphCapture",a.enableGraphCapture.toString(),o)}if(a.freeDimensionOverrides)for(let[e,t]of Object.entries(a.freeDimensionOverrides)){if("string"!=typeof e)throw Error(`free dimension override name must be a string: ${e}`);if("number"!=typeof t||!Number.isInteger(t)||t<0)throw Error(`free dimension override value must be a non-negative integer: ${t}`);let r=u5(e,o);0!==n._OrtAddFreeDimensionOverride(i,r,t)&&u7(`Can't set a free dimension override: ${e} - ${t}.`)}return void 0!==a.extra&&u8(a.extra,"",new WeakSet,(e,t)=>{le(i,e,t,o)}),[i,o]}catch(e){throw 0!==i&&0!==n._OrtReleaseSessionOptions(i)&&u7("Can't release session options."),o.forEach(e=>n._free(e)),e}}}),hX=G(()=>{"use strict";lr=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${e}`)}},ln=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${e}`)}},li=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n="number"==typeof t?t:t.reduce((e,t)=>e*t,1);return r>0?Math.ceil(n*r):void 0},lo=e=>{switch(e){case"float16":return"u">typeof Float16Array?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},la=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${e}`)}},ls=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,lu=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint64"===e||"int8"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,ll=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${e}`)}}}),hZ=G(()=>{"use strict";uR(),ld=async e=>{if("string"!=typeof e)return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e);{let t=await fetch(e);if(!t.ok)throw Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<0x40000000)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw Error(`failed to load external data file: ${e}, no response body.`);let r=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(e){if(e instanceof RangeError){let e=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let o=0;for(;;){let{done:e,value:t}=await r.read();if(e)break;let n=t.byteLength;new Uint8Array(i,o,n).set(t),o+=n}return new Uint8Array(i,0,n)}}}}),hJ=G(()=>{"use strict";hX(),lp=["V","I","W","E","F"],lf=(e,t)=>{lc=e,lh=t},lm=(...e)=>{lh&&((e,t)=>{var r,n;let i=la(e);i>=la(lc)&&(r=i,n="function"==typeof t?t():t,console.log(`[${lp[r]},${new Date().toISOString()}]${n}`))})(...e)}}),hQ=G(()=>{"use strict";lg=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},lb=class{static calcShape(e,t,r=!1){let n=e.length,i=t.length;if(0===n)return t;if(0===i)return e;let o=Math.max(e.length,t.length),a=Array(o);if(r){if(n<2||i<2)return;let r=lg.calcMatMulShape([e[n-2],e[n-1]],[t[i-2],t[i-1]]);if(void 0===r)return;[a[o-2],a[o-1]]=r}for(let s=r?3:1;s<=o;s++){let r=n-s<0?1:e[n-s],u=i-s<0?1:t[i-s];if(r!==u&&r>1&&u>1)return;let l=Math.max(r,u);if(r&&u)a[o-s]=Math.max(r,u);else{if(l>1)return;a[o-s]=0}}return a}static isValidBroadcast(e,t){let r=e.length,n=t.length;if(r>n)return!1;for(let i=1;i<=r;i++)if(1!==e[r-i]&&e[r-i]!==t[n-i])return!1;return!0}},ly=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(e,t=4){let r=e.length;if(0===r)return[];let n=Array(r),i=r-1;for(;i>=0;){if(e[i]%t==0){n[i]=e[i]/t;break}if(t%e[i]!=0)throw Error("cannot convert shape");n[i]=1,t/=e[i],i--}for(i--;i>=0;i--)n[i]=e[i];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(e,t,r){let n=1;for(let i=t;i<r;i++){if(e[i]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(e[i])}return n}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let r=Array(t);r[t-1]=1,r[t-2]=e[t-1];for(let n=t-3;n>=0;--n)r[n]=r[n+1]*e[n+1];return r}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(r=>this.normalizeAxis(r,t??e.length))}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let r=e.length;return e.map((e,n)=>e+t[n]+t[n+r])}static areEqual(e,t){return e.length===t.length&&e.every((e,r)=>e===t[r])}},l_=class e{static adjustPoolAttributes(e,t,r,n,i,o){if(!e&&r.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=r.length?r.push(t[e+2]):r[e]=t[e+2];for(let e=0;e<r.length;e++)if(e<n.length){if(n[e]<0)throw Error("strides should be greater than or equal to 1")}else n.push(1);for(let e=0;e<r.length;e++)if(e<i.length){if(i[e]<0)throw Error("dilations should be greater than or equal to 1")}else i.push(1);for(let e=0;e<2*r.length;e++)if(e<o.length){if(o[e]<0)throw Error("pad should be greater than or equal to 1")}else o.push(0);for(let e=0;e<r.length;e++){if(r[e]<=0)throw Error("kernel shapes need to be greater than 0");if(o[e]>=r[e]||o[e+r.length]>=r[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,i,o,a,s){if(s){if(o.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+(a?1:2)],r[u],n[u],i[u],o,u,u+t.length-2,s)}}static computePoolOutputShape(t,r,n,i,o,a,s,u=0){if(r.length<=0)throw Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return e.computeShapeHelper(t,r,l,n,i,o,a,s,u),l}static computeConvOutputShape(t,r,n,i,o,a,s){if(t.length<=0||r.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return e.computeShapeHelper(!1,t,u,n,i,o,a,s),u}static computeShapeHelper(t,r,n,i,o,a,s,u,l=0){if(t)for(let e=0;e<r.length-2;e++)n.push(1);else for(let t=0;t<r.length-2;t++)n.push(e.adjustPadAndReturnShape(r[t+2],i[t],o[t],a[t],s,t,t+r.length-2,u,l))}static computeOutputSize(e,t,r,n,i){let o=Math.floor(e/t)+1;return 1===i&&((o=Math.ceil(e/t)+1)-1)*t>=r+n&&(o-=1),o}static adjustPadAndReturnShape(t,r,n,i,o,a,s,u,l=0){let d=n*(i-1)+1;if(!u||"NOTSET"===u)return e.computeOutputSize(t+o[a]+o[s]-d,r,t,o[a],l);switch(u){case"VALID":return o[a]=0,o[s]=0,e.computeOutputSize(t-d,r,t,0,l);case"SAME_LOWER":case"SAME_UPPER":if(1!==n)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let n=(Math.floor((t+r-1)/r)-1)*r+i-t;return o[a]=Math.floor("SAME_LOWER"===u?(n+1)/2:n/2),o[s]=n-o[a],e.computeOutputSize(t+o[a]+o[s]-d,r,t,o[a],l)}default:throw Error("Unsupported AutoPad type")}}},lv=class{static getShapeOfGemmResult(e,t,r,n,i){let o,a,s;if(2!==e.length||2!==r.length)throw Error("shape need to be of size 2");t?(o=e[1],a=e[0]):(o=e[0],a=e[1]);let u=-1;if(n?(s=r[0],u=1):(s=r[1],u=0),r[u]!==a)throw Error("dimension mismatch");if(o<=0||s<=0||a<=0)throw Error("invalid shape specified");if(i&&!lb.isValidBroadcast(i,[o,s]))throw Error("gemm: invalid bias shape for broadcast");return[o,s,a]}},lx=-34028234663852886e22,lw=34028234663852886e22}),hY=G(()=>{"use strict";hX(),l$=(e,t)=>new(lo(t))(e)}),h0=G(()=>{"use strict";hX(),hJ(),lT=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),lI=(e,t)=>{if("int32"===t)return e;if(e.byteLength%4!=0)throw Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,n=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":return new Uint8Array(BigInt64Array.from(n,BigInt).buffer);case"uint64":if(n.some(e=>e<0))throw Error("Can not convert int32 data to uin64 - negative value found.");return new Uint8Array(BigUint64Array.from(n,BigInt).buffer);case"int8":if(n.some(e=>e<-128||e>127))throw Error("Can not convert int32 data to int8 - value out of range.");return new Uint8Array(Int8Array.from(n,Number).buffer);case"uint8":if(n.some(e=>e<0||e>255))throw Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(n,Number);case"uint32":if(n.some(e=>e<0))throw Error("Can not convert int32 data to uint32 - negative value found.");return new Uint8Array(Uint32Array.from(n,Number).buffer);default:throw Error(`Unsupported data conversion from 'int32' to ${t}`)}},lS=1,lO=()=>lS++,lE=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),lA=(e,t)=>{let r=lT.get(e);if(!r)throw Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((e,t)=>e*t)*r/8):0},lP=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:n,dataType:i,shape:o,fallbackDataType:a}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=n,this.dataType=i,this.tensorShape=o,this.fallbackDataType=a}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return lA(this.dataType,this.tensorShape)}destroy(){lm("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(!this.fallbackDataType)return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor);{let t=lI(new Uint8Array(await this.mlContext.readTensor(this.mlTensor)),this.dataType);return e?void(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(t):new Uint8Array(t).buffer}}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((e,t)=>e===r[t])}setIsDataConverted(e){this.isDataConverted=e}},lk=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,n){let i=this.tensorManager.getMLContext(e),o=this.tensorManager.getMLOpSupportLimits(e),a;if(!o?.input.dataTypes.includes(t)){if(!(a=lE.get(t))||!o?.input.dataTypes.includes(a))throw Error(`WebNN backend does not support data type: ${t}`);lm("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${a}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,r))return this.wrapper.tensor;if(n){if(this.wrapper.byteLength!==lA(t,r))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,s,!0,!0,a),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if("int32"===this.wrapper.fallbackType)t=((e,t)=>{if("int32"===t)return e;let r=lT.get(t);if(!r)throw Error(`WebNN backend does not support data type: ${t}`);let n=r/8;if(e.byteLength%n!=0)throw Error(`Invalid Uint8Array length - must be a multiple of ${n}.`);let i=e.byteLength/n,o=new(lo(t))(e.buffer,e.byteOffset,i);switch(t){case"int64":case"uint64":{let e=new Int32Array(i);for(let t=0;t<i;t++){let r=o[t];if(r>2147483647n||r<-2147483648n)throw Error("Can not convert int64 data to int32 - value out of range.");e[t]=Number(r)}return new Uint8Array(e.buffer)}case"int8":case"uint8":case"uint32":if("uint32"===t&&o.some(e=>e>0x7fffffff))throw Error("Can not convert uint32 data to int32 - value out of range.");return new Uint8Array(Int32Array.from(o,Number).buffer);default:throw Error(`Unsupported data conversion from ${t} to 'int32'`)}})(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength)return void this.wrapper.write(t);lm("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?lI(this.activeUpload,this.wrapper?.type):this.activeUpload;return e?void(e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t)):t.buffer}if(!this.wrapper)throw Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},lD=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=lO();return this.tensorTrackersById.set(e,new lk(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,n,i){lm("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${i}}`);let o=this.tensorTrackersById.get(t);if(!o)throw Error("Tensor not found.");return o.ensureTensor(e,r,n,i)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw Error("Tensor not found.");r.upload(t)}async download(e,t){lm("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,n){let i=this.getMLContext(e),o=lO(),a=new lP({sessionId:e,context:i,tensor:t,dataType:r,shape:n});return this.tensorTrackersById.set(o,new lk(this,a)),this.externalTensors.add(a),o}async getCachedTensor(e,t,r,n,i,o,a){let s=this.getMLContext(e);for(let[n,i]of this.freeTensors.entries())if(i.canReuseTensor(s,t,r)){lm("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${r}`);let i=this.freeTensors.splice(n,1)[0];return i.sessionId=e,i}lm("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${r}}`);let u=await s.createTensor({dataType:a??t,shape:r,dimensions:r,usage:n,writable:i,readable:o});return new lP({sessionId:e,context:s,tensor:u,dataType:t,shape:r,fallbackDataType:a})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},lN=(...e)=>new lD(...e)}),h1=G(()=>{"use strict";hX(),hG(),hY(),h0(),hJ(),lC=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),lz=class{constructor(e){this.tensorManager=lN(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,lf(e.logLevel,!!e.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(e){lm("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){lm("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let e of t)lm("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(t=>t.gpuDevice===e);if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:t}),t}}if(void 0===e){let e=this.mlContextCache.findIndex(e=>void 0===e.options&&void 0===e.gpuDevice);if(-1!==e)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let t=this.mlContextCache.findIndex(t=>((e,t)=>{if(e===t)return!0;if(void 0===e||void 0===t)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((r,i)=>r===n[i]&&e[r]===t[r])})(t.options,e));if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),0===r.size){this.sessionIdsByMLContext.delete(t);let e=this.mlContextCache.findIndex(e=>e.mlContext===t);-1!==e&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){lm("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,n,i){let o=lC.get(r);if(!o)throw Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,o,n,i)}async createTemporaryTensor(e,t,r){lm("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let n=lC.get(t);if(!n)throw Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,n,r,!1);let o=this.temporarySessionTensorIds.get(e);return o?o.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!u6().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");lm("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return l$(r,t)}}registerMLTensor(e,t,r,n){let i=lC.get(r);if(!i)throw Error(`Unsupported ONNX data type: ${r}`);let o=this.tensorManager.registerTensor(e,t,i,n);return lm("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${n}} -> {tensorId: ${o}}`),o}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return!!r&&r.includes(t)}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return!!r&&r.includes(t)}isGraphInputOutputTypeSupported(e,t,r=!0){let n=lC.get(lr(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return!(typeof n>"u")&&(r?!!i?.input.dataTypes.includes(n):!!i?.output.dataTypes.includes(n))}flush(){}}}),h2=G(()=>{}),h3=G(()=>{"use strict";hJ(),h2(),lR=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),lB=[],lM=e=>16*Math.ceil(Number(e)/16),lj=1,lF=()=>lj++,lL=async(e,t,r,n)=>{let i=lM(r),o=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,o,0,i),e.flush(),await o.mapAsync(GPUMapMode.READ);let s=o.getMappedRange();if(!n)return new Uint8Array(s.slice(0,r));{let e=n();return e.set(new Uint8Array(s,0,r)),e}}finally{o.destroy()}},lV=class{constructor(e){for(let[t]of(this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,lR))lB.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,n=t.byteOffset,i=t.byteLength,o=lM(i),a=this.storageCache.get(e);if(!a)throw Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==i)throw Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${i}`);if(o===i&&n%4==0)this.backend.device.queue.writeBuffer(a.gpuData.buffer,0,r,n,i);else{let e=new Uint8Array(o);e.set(t),this.backend.device.queue.writeBuffer(a.gpuData.buffer,0,e,0,o)}lm("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw Error("source gpu data for memcpy does not exist");let n=this.storageCache.get(t);if(!n)throw Error("destination gpu data for memcpy does not exist");if(r.originalSize!==n.originalSize)throw Error("inconsistent source and destination gpu data size");let i=lM(r.originalSize),o=this.backend.getCommandEncoder();this.backend.endComputePass(),o.copyBufferToBuffer(r.gpuData.buffer,0,n.gpuData.buffer,0,i)}registerExternalBuffer(e,t,r){let n;if(r){if(n=r[0],e===r[1])return lm("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, buffer is the same, skip.`),n;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else n=lF();return this.storageCache.set(n,{gpuData:{id:n,type:0,buffer:e},originalSize:t}),lm("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, registered.`),n}unregisterExternalBuffer(e){void 0!==e&&(this.storageCache.delete(e),lm("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=(e=>{for(let t=0;t<lB.length;t++){let r=lB[t];if(e<=r)return r}return 16*Math.ceil(e/16)})(e),n,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,o=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||o){let e=(i?this.freeBuffers:this.freeUniformBuffers).get(r);n=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:r,usage:t})}else n=this.backend.device.createBuffer({size:r,usage:t});let a={id:lF(),type:0,buffer:n};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(e)}),lm("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t="bigint"==typeof e?Number(e):e,r=this.storageCache.get(t);if(!r){if(0===this.storageCache.size)return 0;throw Error("releasing data does not exist")}return lm("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw Error("data does not exist");await lL(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let e of this.buffersPending){let t=lR.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];void 0===t||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];void 0===t||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let t of(e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e)),this.buffersPending))e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,0===this.sessionCount&&(lm("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},lU=(...e)=>new lV(...e)}),h4=G(()=>{"use strict";lq=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},lG=e=>new lq(e)}),h6=G(()=>{"use strict";hX(),hQ(),lH=64,lW=(e,t)=>{if(3===t)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==t)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${e}`)}},lK=(e,t=1)=>{let r=lW(e,t);return"string"==typeof r?r:r[0]},lX=(e,t=1)=>{let r=lW(e,t);return"string"==typeof r?r:r[1]},lZ=(...e)=>{let t=[];return e.forEach(e=>{0!==e.length&&t.push({type:12,data:e},{type:12,data:ly.computeStrides(e)})}),t},lJ=e=>e%4==0?4:e%2==0?2:1,lQ=(e="f32",t,r="0")=>t&&1!==t?`vec${t}<${e}>(${r})`:`${e}(${r})`,lY=(e,t,r)=>"f32"===e?r:1===t?`f32(${r})`:`vec${t}<f32>(${r})`,l0=(e,t)=>4===t?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:2===t?`(${e}.x + ${e}.y)`:3===t?`(${e}.x + ${e}.y + ${e}.z)`:e,l1=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?"string"==typeof t?"f16"===n?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:"f16"===n?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,l2=(e,t,r,n,i)=>{let o,a,s,u,l="number"==typeof r,d=l?r:r.length,p=[...Array(d).keys()],c=d<2?"u32":d<=4?`vec${d}<u32>`:`array<u32, ${d}>`,h=lW(t,i),f="string"==typeof h?h:h[1],m={indices:c,value:f,storage:"string"==typeof h?h:h[0],tensor:t},g=e=>"string"==typeof e?e:`${e}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},y=l?"uniforms.":"",_=`${y}${e}_shape`,v=`${y}${e}_strides`,x="";for(let e=0;e<d-1;e++)x+=`
    let dim${e} = current / ${l1(v,e,d)};
    let rest${e} = current % ${l1(v,e,d)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;x+=`indices[${d-1}] = current;`;let w=d<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${x}
    return indices;
  }`,$=[];if(d>=2)for(let e=d-1;e>=0;e--)$.push(`${l1(v,e,d)} * (indices[${e}])`);let T=d<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${$.join("+")};
  }`,I=(...e)=>0===d?"0u":`${m.indices}(${e.map(g).join(",")})`,S=(e,t)=>d<2?`${e}`:`${l1(e,t,d)}`,O={},E=(t,r)=>(()=>{if(m.storage===m.value)return`${e}[${t}]=${r};`;if("vec2<u32>"===m.storage&&"i32"===m.value)return`${e}[${t}]=vec2<u32>(u32(${r}), select(0u, 0xFFFFFFFFu, ${r} < 0));`;if("vec2<u32>"===m.storage&&"u32"===m.value)return`${e}[${t}]=vec2<u32>(u32(${r}), 0u);`;if("u32"===m.storage&&"vec4<bool>"===m.value)return`${e}[${t}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${r}));`;throw Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),A=t=>(()=>{if(m.storage===m.value)return`${e}[${t}]`;if("vec2<u32>"===m.storage&&"i32"===m.value)return`i32(${e}[${t}].x)`;if("vec2<u32>"===m.storage&&"u32"===m.value)return`u32(${e}[${t}].x)`;if("u32"===m.storage&&"vec4<bool>"===m.value)return`vec4<bool>(bool(${e}[${t}] & 0xFFu), bool(${e}[${t}] & 0xFF00u), bool(${e}[${t}] & 0xFF0000u), bool(${e}[${t}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),P=d<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${f} {
    return ${A(`i2o_${e}(indices)`)};
  }`,k=d<2?"":(o=p.map(e=>`d${e}: u32`).join(", "),a=p.map(e=>`d${e}`).join(", "),`
  fn get_${e}(${o}) -> ${f} {
    return get_${e}ByIndices(${I(a)});
  }`),D=d<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${f}) {
    ${E(`i2o_${e}(indices)`,"value")}
  }`,N=d<2?"":(s=p.map(e=>`d${e}: u32`).join(", "),u=p.map(e=>`d${e}`).join(", "),`
  fn set_${e}(${s}, value: ${f}) {
    set_${e}ByIndices(${I(u)}, value);
  }`);return{impl:()=>{let e=[],t=!1;return b.offsetToIndices&&(e.push(w),t=!0),b.indicesToOffset&&(e.push(T),t=!0),b.broadcastedIndicesToOffset&&(Object.values(O).forEach(t=>e.push(t)),t=!0),b.set&&(e.push(N),t=!0),b.setByIndices&&(e.push(D),t=!0),b.get&&(e.push(k),t=!0),b.getByIndices&&(e.push(P),t=!0),!l&&t&&e.unshift(`const ${_} = ${m.indices}(${r.join(",")});`,`const ${v} = ${m.indices}(${ly.computeStrides(r).join(",")});`),e.join(`
`)},type:m,offsetToIndices:t=>(b.offsetToIndices=!0,d<2?t:`o2i_${e}(${t})`),indicesToOffset:t=>(b.indicesToOffset=!0,d<2?t:`i2o_${e}(${t})`),broadcastedIndicesToOffset:(t,r)=>{b.broadcastedIndicesToOffset=!0;let n=`${r.name}broadcastedIndicesTo${e}Offset`;if(n in O)return`${n}(${t})`;let i=[];for(let e=d-1;e>=0;e--){let t=r.indicesGet("outputIndices",e+r.rank-d);i.push(`${S(v,e)} * (${t} % ${S(_,e)})`)}return O[n]=`fn ${n}(outputIndices: ${r.type.indices}) -> u32 {
             return ${i.length>0?i.join("+"):"0u"};
           }`,`${n}(${t})`},indices:I,indicesGet:S,indicesSet:(e,t,r)=>d<2?`${e}=${r};`:`${l1(e,t,d)}=${r};`,set:(...t)=>{if(t.length!==d+1)throw Error(`indices length must be ${d}`);let r=t[d];if("string"!=typeof r)throw Error("value must be string");let n=t.slice(0,d).map(g).join(",");return 0===d?E("0u",r):1===d?E(n[0],r):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${n}, ${r})`)},setByOffset:E,setByIndices:(t,r)=>d<2?E(t,r):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${t}, ${r});`),get:(...t)=>{if(t.length!==d)throw Error(`indices length must be ${d}`);let r=t.map(g).join(",");return 0===d?A("0u"):1===d?A(r[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${r})`)},getByOffset:A,getByIndices:t=>d<2?A(t):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${t})`),usage:n,name:e,strides:v,shape:_,rank:d}},l3=(e,t,r,n=1)=>l2(e,t,r,"input",n),l4=(e,t,r,n=1)=>l2(e,t,r,"output",n),l6=(e,t,r)=>l2(e,t,r,"atomicOutput",1),l5=(e,t,r,n=1)=>l2(e,t,r,"internal",n),l8=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${"number"==typeof e?`${e}u`:e}) { return; }`}mainStart(e=lH){let t="number"==typeof e?e:e[0],r="number"==typeof e?1:e[1],n="number"==typeof e?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||n>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*n>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],o=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(0!==this.uniforms.length)return this.uniforms.map(e=>[[12,10,1,6][["u32","f16","f32","i32"].indexOf(e.type)],e.length??1])}},l7=(e,t)=>new l8(e,t)}),h5=G(()=>{"use strict";hX(),hQ(),h4(),h6(),l9=(e,t)=>0!==t.length?t:[...Array(e).keys()].reverse(),de=(e,t)=>{let r,n,i=e.dataType,o=e.dims.length,a=l9(o,t),s=(r=e.dims,n=a,ly.sortBasedOnPerm(r,l9(r.length,n))),u=e.dims,l=s;if(o<2||((e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(1!==t[e[n]]){if(e[n]<r)return!1;r=e[n]}return!0})(a,e.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=ly.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64/4)},programUniforms:[{type:12,data:Math.ceil(t/4)}]}},getShaderSource:e=>{let t=l3("input",i,u,4),r=l4("output",i,l,4);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:d,newPerm:p}=((e,t)=>{let r=[],n=[];for(let i=0;i<e.length;++i)1!==e[i]&&r.push(e[i]),1!==e[t[i]]&&n.push(t[i]);return{newShape:r,newPerm:n}})(e.dims,a),c=ly.areEqual(p,[2,3,1]),h=ly.areEqual(p,[3,1,2]);return 2===d.length||c||h?(l=[(u=c?[d[0],d[1]*d[2]]:h?[d[0]*d[1],d[2]]:d)[1],u[0]],{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=ly.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(l[1]/16),y:Math.ceil(l[0]/16)},programUniforms:[{type:12,data:t},...lZ(u,l)]}},getShaderSource:e=>{let t=l3("a",i,u.length),r=l4("output",i,l.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,r)}
  var<workgroup> tile : array<array<${r.type.value}, 17>, 16>;
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
      ${r.setByIndices(`${r.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`}}):{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let t=ly.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:[{type:12,data:t},...lZ(u,l)]}},getShaderSource:e=>{let t=l3("a",i,u.length),r=l4("output",i,l.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,r)}

  ${((e,t,r,n)=>{let i=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let r=0;r<t;++r)i+=`a[${e[r]}]=i[${r}];`;return i+"return a;}"})(a,o,t,r)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${r.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${r.setByOffset("global_idx",t.getByIndices("aIndices"))}
  }`}}},dt=(e,t)=>{((e,t)=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if(0!==t.length&&t.length!==e[0].dims.length)throw Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)})(e.inputs,t.perm),e.compute(de(e.inputs[0],t.perm))},dr=e=>lG({perm:e.perm})}),h8=G(()=>{"use strict";hX(),hQ(),h6(),h7(),h5(),dn={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},di={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},da={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},ds={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},du=(e,t,r,n)=>{var i,o,a,s,u,l,d;let p,c,h,f,m,g,b,y=1===e.inputs.length?r:dw(e.inputs,r),_=y.axes;0!==_.length||y.noopWithEmptyAxes||(_=e.inputs[0].dims.map((e,t)=>t));let v=ly.normalizeAxes(_,e.inputs[0].dims.length),x=v,w=e.inputs[0],$=((e,t)=>{let r=[];if(!((e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0})(e,t)){for(let n=0;n<t;++n)-1===e.indexOf(n)&&r.push(n);e.forEach(e=>r.push(e))}return r})(x,e.inputs[0].dims.length);$.length>0&&(w=e.compute(de(e.inputs[0],$),{inputs:[0],outputs:[-1]})[0],x=((e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r})(x.length,w.dims.length));let[T,I]=((e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)-1===t.indexOf(i)&&r.push(e[i]);return[r,t.map(t=>e[t])]})(w.dims,x),S=T;y.keepDims&&(S=((e,t)=>{let r=e.length+t.length,n=[],i=0;for(let o=0;o<r;o++)-1===t.indexOf(o)?n.push(e[i++]):n.push(1);return n})(T,v)),e.compute((i=t,o=y.cacheKey,a=[w],s=n,u=e.inputs[0].dataType,l=S,d=I,p=a[0].dims,c=ly.size(l),h=ly.size(d),f=l3("_A",a[0].dataType,p),m=l4("output",u,l),g=64,1===c&&(g=256),b=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,{name:i,shaderCache:{hint:`${o};${g}`,inputDependencies:["type"]},getShaderSource:e=>`
        ${e.registerUniform("reduceSize","u32").declareVariables(f,m)}
        ${b}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${e.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${da[s]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${dn[s]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${di[s]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${m.setByOffset("outputIndex",`${"mean"===s?`${m.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${m.type.storage}(${ds[s]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:l,dataType:u}],dispatchGroup:{x:c},programUniforms:[{type:12,data:h}]})}),{inputs:[w]})},dl=(e,t)=>{du(e,"ReduceMeanShared",t,"mean")},dd=(e,t)=>{du(e,"ReduceL1Shared",t,"l1")},dp=(e,t)=>{du(e,"ReduceL2Shared",t,"l2")},dc=(e,t)=>{du(e,"ReduceLogSumExpShared",t,"logSumExp")},dh=(e,t)=>{du(e,"ReduceMaxShared",t,"max")},df=(e,t)=>{du(e,"ReduceMinShared",t,"min")},dm=(e,t)=>{du(e,"ReduceProdShared",t,"prod")},dg=(e,t)=>{du(e,"ReduceSumShared",t,"sum")},db=(e,t)=>{du(e,"ReduceSumSquareShared",t,"sumSquare")},dy=(e,t)=>{du(e,"ReduceLogSumShared",t,"logSum")}}),h7=G(()=>{"use strict";hX(),hQ(),h4(),h6(),h8(),d_=e=>{if(!e||0===e.length||e.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===e.length&&1!==e[1].dims.length)throw Error("Invalid axes input dims.")},dv=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],dx=(e,t,r,n,i,o,a=!1,s=!1)=>{let u=[],l=r[0].dims,d=l.length,p=ly.normalizeAxes(i,d),c=!s&&0===p.length;l.forEach((e,t)=>{c||p.indexOf(t)>=0?a&&u.push(1):u.push(e)});let h=u.length,f=ly.size(u);return{name:e,shaderCache:t,getShaderSource:e=>{let t=[],i=l3("_A",r[0].dataType,d),s=l4("output",o,h),u=n(i,s,p),f=u[2];for(let e=0,r=0;e<d;e++)c||p.indexOf(e)>=0?(a&&r++,f=`for(var j${e}: u32 = 0; j${e} < ${l[e]}; j${e}++) {
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
        }`},getRunData:()=>({outputs:[{dims:u,dataType:o}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...lZ(l,u)]})}},dw=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>r.push(Number(e))),lG({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},d$=(e,t,r,n)=>{let i=e.inputs,o=1===i.length?r:dw(i,r);e.compute(dx(t,{hint:o.cacheKey,inputDependencies:["rank"]},[i[0]],o.noopWithEmptyAxes&&0===o.axes.length?dv:n,o.axes,i[0].dataType,o.keepDims,o.noopWithEmptyAxes),{inputs:[0]})},dT=(e,t,r)=>{if(0===t.length)return r;let n=1,i=1;for(let r=0;r<t.length;r++)-1===t.indexOf(r)?n*=e[r]:i*=e[r];return i<32&&n>1024},dI=(e,t)=>{var r,n;dT(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,n=t,d_(r.inputs),d$(r,"ReduceMean",n,(e,t,n)=>{let i=1;for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||0===n.length)&&(i*=r.inputs[0].dims[t]);return["var sum = f32(0);","",`sum += f32(${e.getByIndices("input_indices")});`,`let value = ${t.type.value}(sum / ${i});`]})):dl(e,t)},dS=(e,t)=>{var r,n;dT(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,n=t,d_(r.inputs),d$(r,"ReduceL1",n,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += abs(${e.getByIndices("input_indices")});`,""])):dd(e,t)},dO=(e,t)=>{var r,n;dT(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,n=t,d_(r.inputs),d$(r,"ReduceL2",n,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])):dp(e,t)},dE=(e,t)=>{var r,n;dT(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,n=t,d_(r.inputs),d$(r,"ReduceLogSumExp",n,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += exp(${e.getByIndices("input_indices")});`,"value = log(value);"])):dc(e,t)},dA=(e,t)=>{var r,n;dT(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,n=t,d_(r.inputs),d$(r,"ReduceMax",n,(e,t,r)=>{let n=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&n.push(e.indicesSet("input_indices",t,0));return[`${n.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = max(value, ${e.getByIndices("input_indices")});`,""]})):dh(e,t)},dP=(e,t)=>{var r,n;dT(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,n=t,d_(r.inputs),d$(r,"ReduceMin",n,(e,t,r)=>{let n=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&n.push(`input_indices[${t}] = 0;`);return[`${n.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = min(value, ${e.getByIndices("input_indices")});`,""]})):df(e,t)},dk=(e,t)=>{var r,n;dT(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,n=t,d_(r.inputs),d$(r,"ReduceProd",n,(e,t)=>[`var value = ${t.type.storage}(1);`,"",`value *= ${e.getByIndices("input_indices")};`,""])):dm(e,t)},dD=(e,t)=>{var r,n;dT(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,n=t,d_(r.inputs),d$(r,"ReduceSum",n,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,""])):dg(e,t)},dN=(e,t)=>{var r,n;dT(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,n=t,d_(r.inputs),d$(r,"ReduceSumSquare",n,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += t * t;`,""])):db(e,t)},dC=(e,t)=>{var r,n;dT(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,n=t,d_(r.inputs),d$(r,"ReduceLogSum",n,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,"value = log(value);"])):dy(e,t)}}),h9=G(()=>{"use strict";hX(),h4(),h7(),dz=e=>{if(!e||0===e.length||e.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==e[0].dataType)throw Error("Invalid input type.")},dR=(e,t)=>{dz(e.inputs),e.compute(dx("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,r,n)=>{let i=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||0===n.length)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]},[t.axis],7,t.keepDims),{inputs:[0]})},dB=(e,t)=>{dz(e.inputs),e.compute(dx("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,r,n)=>{let i=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||0===n.length)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]},[t.axis],7,t.keepDims),{inputs:[0]})},dM=e=>lG(e)}),fe=G(()=>{"use strict";hX(),hQ(),h2(),h6(),dj=(e,t,r)=>t&&e?`
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
    `,dF=(e,t,r,n,i,o,a,s,u,l,d,p)=>{var c,h,f,m,g,b,y,_,v,x,w,$,T,I,S,O,E,A,P,k,D,N,C,z,R;let B,M,j,F,L,V,U,q,G,H,W,K,X,Z,J,Q,Y,ee,et,er,en,ei,eo,ea,es,eu,el,ed,ep,ec,eh,ef,em,eg=Math.min(e.outputCount,1+ +!!a+ +!!s),eb=eg>1?a:void 0,ey=eg>1?s:void 0,e_=eg>1?l.pastSequenceLength:0,ev=e_+l.kvSequenceLength,ex=u&&ly.size(u.dims)>0?u:void 0,ew=[t,r];eb&&ly.size(eb.dims)>0&&ew.push(eb),ex&&ew.push(ex),d&&ew.push(d),p&&ew.push(p);let e$=e.compute((c=eg,h=t,f=r,m=eb,g=ex,b=l,y=e_,_=d,v=p,B=y+b.kvSequenceLength,M=[b.batchSize,b.numHeads,b.sequenceLength,B],j=c>1&&m,F=b.kvNumHeads?b.kvNumHeads:b.numHeads,L=j?[b.batchSize,F,B,b.headSize]:void 0,V=b.nReps?b.nReps:1,U=0===b.scale?1/Math.sqrt(b.headSize):b.scale,q=lJ(b.headSize),G=b.headSize/q,H={x:Math.ceil(B/12),y:Math.ceil(b.sequenceLength/12),z:b.batchSize*b.numHeads},W=[{type:12,data:b.sequenceLength},{type:12,data:G},{type:12,data:B},{type:12,data:b.numHeads},{type:12,data:b.headSize},{type:1,data:U},{type:12,data:y},{type:12,data:b.kvSequenceLength},{type:12,data:V}],K=j&&m&&ly.size(m.dims)>0,X=["type","type"],K&&X.push("type"),g&&X.push("type"),_&&X.push("type"),v&&X.push("type"),Z=[{dims:M,dataType:h.dataType,gpuDataType:0}],j&&Z.push({dims:L,dataType:h.dataType,gpuDataType:0}),{name:"AttentionProbs",shaderCache:{hint:`${q};${void 0!==g};${void 0!==m};${c}`,inputDependencies:X},getRunData:()=>({outputs:Z,dispatchGroup:H,programUniforms:W}),getShaderSource:e=>{let t=l3("q",h.dataType,h.dims,q),r=[t,l3("key",f.dataType,f.dims,q)];if(K){let e=l3("past_key",m.dataType,m.dims,q);r.push(e)}g&&r.push(l3("attention_bias",g.dataType,g.dims));let n=_?l3("seq_lens",_.dataType,_.dims):void 0;n&&r.push(n);let i=v?l3("total_sequence_length_input",v.dataType,v.dims):void 0;i&&r.push(i);let o=l4("output",h.dataType,M),a=[o];j&&a.push(l4("present_key",h.dataType,L,q));let s=lX(1,q);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${t.type.storage}, 144>;
  var<workgroup> tileK: array<${t.type.storage}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...r,...a)}
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
    ${dj(n,i,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${K&&j?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${j?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${s}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${K&&j?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${j?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${s}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(q){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw Error(`Unsupported components: ${q}`)}})()};
        output[outputIdx] = ${o.type.value} (sum * uniforms.alpha) + ${g?"attention_bias[outputIdx]":"0.0"};
    }
  }`}}),{inputs:ew,outputs:eg>1?[-1,1]:[-1]})[0];e.compute((x=e$,w=l.batchSize,$=l.numHeads,T=e_,I=l.sequenceLength,S=ev,O=d,E=p,J=lJ(O?1:S),Q=64,(Y=S/J)<64&&(Q=32),ee=[{type:12,data:w},{type:12,data:$},{type:12,data:T},{type:12,data:I},{type:12,data:Y},{type:12,data:Math.ceil(S/J/Q)}],et=lK(x.dataType,J),er=lX(1,J),en=["type"],O&&en.push("type"),E&&en.push("type"),{name:"AttentionProbsSoftmax",shaderCache:{hint:`${Q};${et};${J}`,inputDependencies:en},getShaderSource:e=>{let t=l4("x",x.dataType,x.dims,J),r=[t],n=O?l3("seq_lens",O.dataType,O.dims):void 0;n&&r.push(n);let i=E?l3("total_sequence_length_input",E.dataType,E.dims):void 0;i&&r.push(i);let o=lX(x.dataType);return`
  var<workgroup> thread_max: array<f32, ${Q}>;
  var<workgroup> thread_sum: array<f32, ${Q}>;
  ${e.registerUniforms([{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}]).declareVariables(...r)}
  ${e.mainStart([Q,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${dj(n,i,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${Q}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${O?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${er}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${er}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(J){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw Error(`Unsupported components: ${J}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${Q}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${er}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${er}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(J){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw Error(`Unsupported components: ${J}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${Q}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${t.type.value}(${o}(1.0) / ${o}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${er}(x[offset + i]);
        x[offset + i] = ${t.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${O?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${t.type.value}(${o}(0));
        }`:""};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:I,z:w*$},programUniforms:ee})}),{inputs:d&&p?[e$,d,p]:[e$],outputs:[]});let eT=[e$,n];ey&&ly.size(ey.dims)>0&&eT.push(ey),d&&eT.push(d),p&&eT.push(p),e.compute((A=eg,P=e$,k=n,D=ey,N=l,C=e_,z=d,R=p,ei=C+N.kvSequenceLength,eo=N.nReps?N.nReps:1,ea=N.vHiddenSize*eo,es=A>1&&D,eu=N.kvNumHeads?N.kvNumHeads:N.numHeads,el=es?[N.batchSize,eu,ei,N.headSize]:void 0,ed=[N.batchSize,N.sequenceLength,ea],ep={x:Math.ceil(N.vHeadSize/12),y:Math.ceil(N.sequenceLength/12),z:N.batchSize*N.numHeads},ec=[{type:12,data:N.sequenceLength},{type:12,data:ei},{type:12,data:N.vHeadSize},{type:12,data:N.numHeads},{type:12,data:N.headSize},{type:12,data:ea},{type:12,data:C},{type:12,data:N.kvSequenceLength},{type:12,data:eo}],eh=es&&D&&ly.size(D.dims)>0,ef=["type","type"],eh&&ef.push("type"),z&&ef.push("type"),R&&ef.push("type"),em=[{dims:ed,dataType:P.dataType,gpuDataType:0}],es&&em.push({dims:el,dataType:P.dataType,gpuDataType:0}),{name:"AttentionScore",shaderCache:{hint:`${void 0!==D};${A}`,inputDependencies:ef},getRunData:()=>({outputs:em,dispatchGroup:ep,programUniforms:ec}),getShaderSource:e=>{let t=l3("probs",P.dataType,P.dims),r=[t,l3("v",k.dataType,k.dims)];eh&&r.push(l3("past_value",D.dataType,D.dims));let n=z?l3("seq_lens",z.dataType,z.dims):void 0;z&&r.push(n);let i=R?l3("total_sequence_length_input",R.dataType,R.dims):void 0;R&&r.push(i);let o=[l4("output",P.dataType,ed)];return es&&o.push(l4("present_value",P.dataType,el)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${t.type.value}, 144>;
  var<workgroup> tileV: array<${t.type.value}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...r,...o)}
  ${e.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===eo?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===eo?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${dj(n,i,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${eh&&es?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${es?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${t.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${eh&&es?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${es?`
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
  }`}}),{inputs:eT,outputs:eg>1?[0,2]:[0]})},dL=(e,t)=>{var r,n;let i,o,a,s,u,l,d,p=((e,t)=>{let r=e[0],n=e[1],i=e[2],o=e[3],a=e[4],s=e[5];if(a&&s)throw Error("Attention cannot have both past and attention_bias");if(3!==r.dims.length)throw Error('Input "input" must have 3 dimensions');let u=r.dims[0],l=r.dims[1],d=r.dims[2];if(1!==i.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==n.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==d)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==n.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=i.dims[0]/3,c=p,h=c;if(t.qkvHiddenSizes.length>0){if(3!==t.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let e of t.qkvHiddenSizes)if(e%t.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],c=t.qkvHiddenSizes[1],h=t.qkvHiddenSizes[2]}if(p!==c)throw Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==p+c+h)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let f=0;if(a){if(c!==h)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==a.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==a.dims[0])throw Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==c/t.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(f=a.dims[3])}let m=l+f;if(o)throw Error("Mask not supported");if(a)throw Error("past is not supported");if(s){if(4!==s.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==t.numHeads||s.dims[2]!==l||s.dims[3]!==m)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:f,kvSequenceLength:l,totalSequenceLength:m,maxSequenceLength:-1,inputHiddenSize:d,hiddenSize:p,vHiddenSize:h,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(h/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}})(e.inputs,t),[c,h,f]=(r=e,i=[(n=p).batchSize,n.numHeads,n.sequenceLength,n.headSize],o=n.sequenceLength,a=n.inputHiddenSize,s=n.headSize,u={x:Math.ceil(n.headSize/12),y:Math.ceil(n.sequenceLength/12),z:n.batchSize*n.numHeads},l=[r.inputs[0],r.inputs[1],r.inputs[2]],d=[{type:12,data:o},{type:12,data:a},{type:12,data:s},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:n.hiddenSize},{type:12,data:n.hiddenSize+n.hiddenSize+n.vHiddenSize}],r.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:i,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:i,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:i,dataType:r.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:d}),getShaderSource:e=>{let t=l4("output_q",l[0].dataType,i),r=l4("output_k",l[0].dataType,i),n=l4("output_v",l[0].dataType,i),o=l3("input",l[0].dataType,l[0].dims),a=l3("weight",l[1].dataType,l[1].dims),s=l3("bias",l[2].dataType,l[2].dims),u=o.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${u}, 144>;
  var<workgroup> tileWeightQ: array<${u}, 144>;
  var<workgroup> tileWeightK: array<${u}, 144>;
  var<workgroup> tileWeightV: array<${u}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}]).declareVariables(o,a,s,t,r,n)}
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
  }`}},{inputs:l,outputs:[-1,-1,-1]}));return dF(e,c,h,f,e.inputs[4],void 0,void 0,void 0,e.inputs[5],p)}}),ft=G(()=>{"use strict";ey(),hX(),hQ(),h4(),h6(),dV=(e,t)=>{let r,{inputs:n,outputCount:i}=e,o=(r={...t,outputCount:i},lG(r));if(b.webgpu.validateInputContent&&((e,t)=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs");let r=(e,t,r)=>{let n=t.length;if(n!==e.length)throw Error(`${r}: num dimensions != ${n}`);t.forEach((t,n)=>{if(t!==e[n])throw Error(`${r}: dim[${n}] do not match`)})};if(e[0].dims.length>1){let n="NHWC"===t.format?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")})(n,o),t.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");e.compute(((e,t)=>{let{epsilon:r,spatial:n,format:i}=t,o=e[0].dims,a=n?lJ(o[o.length-1]):1,s="NHWC"===i&&o.length>1?a:1,u=ly.size(o)/a,l=n?o.length:o,d=l3("x",e[0].dataType,e[0].dims,a),p=l3("scale",e[1].dataType,e[1].dims,s),c=l3("bias",e[2].dataType,e[2].dims,s),h=l3("inputMean",e[3].dataType,e[3].dims,s),f=l3("inputVar",e[4].dataType,e[4].dims,s),m=l4("y",e[0].dataType,l,a);return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:n?["rank","type","type","type","type"]:void 0},getShaderSource:e=>`
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
  }`,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:n?[{type:12,data:u},...lZ(o)]:[{type:12,data:u}]})}})(n,o))}}),fr=G(()=>{"use strict";hQ(),h6(),dU=e=>{var t;let r,n,i,o,a,s,u,l;(e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")})(e.inputs),e.compute((r=(t=e.inputs)[0].dims,n=t[0].dims[2],i=ly.size(r)/4,o=t[0].dataType,a=l3("input",o,r,4),s=l3("bias",o,[n],4),u=l3("residual",o,r,4),l=l4("output",o,r,4),{name:"BiasAdd",getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:e=>`
  const channels = ${n}u / 4;
  ${e.declareVariables(a,s,u,l)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}))}}),fn=G(()=>{"use strict";hX(),hQ(),h4(),h6(),dq=(e,t,r,n,i,o=e.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(ly.size(e.dims)/4)}];return a&&u.push(...a),{name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:t=>{var i,a,u,l,d,p,c;let h,f,m,g,b;return i=t,a=ly.size(e.dims),u=e.dataType,l=o,d=r,p=n,c=s,h=Math.ceil(a/4),f="",f="string"==typeof d?`${d}(a)`:d("a"),m=l3("inputData",u,[h],4),g=l4("outputData",l,[h],4),b=[{name:"vec_size",type:"u32"}],c&&b.push(...c),`
      ${i.registerUniforms(b).declareVariables(m,g)}

  ${p??""}

  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${m.getByOffset("global_idx")};
    ${g.setByOffset("global_idx",f)}
  }`},getRunData:t=>({outputs:[{dims:e.dims,dataType:o}],dispatchGroup:{x:Math.ceil(ly.size(t[0].dims)/64/4)},programUniforms:u})}},dG=e=>{e.compute(dq(e.inputs[0],"Abs","abs"))},dH=e=>{e.compute(dq(e.inputs[0],"Acos","acos"))},dW=e=>{e.compute(dq(e.inputs[0],"Acosh","acosh"))},dK=e=>{e.compute(dq(e.inputs[0],"Asin","asin"))},dX=e=>{e.compute(dq(e.inputs[0],"Asinh","asinh"))},dZ=e=>{e.compute(dq(e.inputs[0],"Atan","atan"))},dJ=e=>{e.compute(dq(e.inputs[0],"Atanh","atanh"))},dQ=e=>lG(e),dY=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(dq(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},d0=(e,t)=>{let r=t||(e=>{let t,r,n=e.length>=2&&0!==e[1].data,i=e.length>=3&&0!==e[2].data;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=i?e[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return lG({min:t,max:r})})(e.inputs),n=lX(e.inputs[0].dataType);e.compute(dq(e.inputs[0],"Clip",e=>`clamp(${e}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},d1=e=>{e.compute(dq(e.inputs[0],"Ceil","ceil"))},d2=e=>{e.compute(dq(e.inputs[0],"Cos","cos"))},d3=e=>{e.compute(dq(e.inputs[0],"Cosh","cosh"))},d4=e=>lG(e),d6=(e,t)=>{let r=lX(e.inputs[0].dataType);e.compute(dq(e.inputs[0],"Elu",e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},d5=(e="f32")=>`
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
}`,d8=e=>{let t=lX(e.inputs[0].dataType);e.compute(dq(e.inputs[0],"Erf",e=>`erf_vf32(${e})`,d5(t)))},d7=e=>{e.compute(dq(e.inputs[0],"Exp","exp"))},d9=e=>{e.compute(dq(e.inputs[0],"Floor","floor"))},pe=e=>{let t=lX(e.inputs[0].dataType);e.compute(dq(e.inputs[0],"Gelu",e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,d5(t)))},pt=(e,t)=>{let r=lX(e.inputs[0].dataType);e.compute(dq(e.inputs[0],"LeakyRelu",e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},pr=e=>{e.compute(dq(e.inputs[0],"Not",e=>`!${e}`))},pn=e=>{e.compute(dq(e.inputs[0],"Neg",e=>`-${e}`))},pi=e=>{e.compute(dq(e.inputs[0],"Reciprocal",e=>`1.0/${e}`))},po=e=>{let t=lX(e.inputs[0].dataType);e.compute(dq(e.inputs[0],"Relu",e=>`select(vec4<${t}>(0.0), ${e}, ${e} > vec4<${t}>(0.0))`))},pa=e=>{e.compute(dq(e.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},ps=e=>lG(e),pu=(e,t)=>{let r=lX(e.inputs[0].dataType);e.compute(dq(e.inputs[0],"HardSigmoid",e=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${e} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},pl=e=>{let t=lX(e.inputs[0].dataType);e.compute(dq(e.inputs[0],"HardSwish",e=>`${e} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${e} + vec4<${t}>(0.5)))`))},pd=e=>{e.compute(dq(e.inputs[0],"Sin","sin"))},pp=e=>{e.compute(dq(e.inputs[0],"Sinh","sinh"))},pc=e=>{e.compute(dq(e.inputs[0],"Sqrt","sqrt"))},ph=e=>{e.compute(dq(e.inputs[0],"Tan","tan"))},pf=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,pm=e=>{e.compute(dq(e.inputs[0],"Tanh",pf))},pg=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${pf("v")};
}
`,pb=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,py=e=>{let t=lX(e.inputs[0].dataType);e.compute(dq(e.inputs[0],"FastGelu",pb,pg(t),void 0,e.inputs[0].dataType))},p_=(e,t)=>{let r=lX(e.inputs[0].dataType);return e.compute(dq(e.inputs[0],"ThresholdedRelu",e=>`select(vec4<${r}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},pv=e=>{e.compute(dq(e.inputs[0],"Log","log"))},px=e=>`quick_gelu_impl(${e})`,pw=(e,t)=>{let r,n,i=lX(e.inputs[0].dataType);e.compute(dq(e.inputs[0],"QuickGelu",px,(r=i,n=t.alpha,`
const alpha = vec4<${r}>(${n});
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
`),t.cacheKey,e.inputs[0].dataType))}}),fi=G(()=>{"use strict";hQ(),h6(),fn(),p$=e=>{var t;let r,n,i,o,a,s;(e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")})(e.inputs),e.compute(((r=(t=e.inputs)[0].dims.slice())[2]=r[2]/2,n=l3("input",t[0].dataType,t[0].dims,4),i=l3("bias",t[0].dataType,[t[0].dims[2]],4),o=l4("output",t[0].dataType,r,4),a=ly.size(r)/4,s=lK(t[0].dataType),{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:e=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${t[0].dims[2]/4/2}u;

  ${e.declareVariables(n,i,o)}

  ${d5(s)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}))}}),fo=G(()=>{"use strict";hX(),hQ(),h6(),pT=(e,t,r,n,i,o)=>{e.compute(((e,t,r,n,i,o,a=r.dataType)=>{let s=r.dims.map(Number),u=n.dims.map(Number),l=!ly.areEqual(s,u),d=s,p=ly.size(s),c=!1,h=!1,f=[l];if(l){let e=lb.calcShape(s,u,!1);if(!e)throw Error("Can't perform binary op on the given tensors");d=e.slice(),p=ly.size(d);let t=1===ly.size(s),r=1===ly.size(u),n=s.length>0&&s[s.length-1]%4==0,i=u.length>0&&u[u.length-1]%4==0;f.push(t),f.push(r),f.push(n),f.push(i);let o=1;for(let e=1;e<d.length;e++){let t=s[s.length-e];if(t===u[u.length-e])o*=t;else break}o%4==0?(h=!0,c=!0):(t||r||n||i)&&(c=!0)}else c=!0;return f.push(c),{name:e,shaderCache:{hint:t+f.map(e=>e.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:e=>((e,t,r,n,i,o,a,s,u,l,d,p)=>{let c,h;"string"==typeof s?c=h=(e,t)=>`${s}((${e}),(${t}))`:"function"==typeof s?c=h=s:(c=s.scalar,h=s.vector);let f=l4("outputData",d,n.length,4),m=l3("aData",u,t.length,4),g=l3("bData",l,r.length,4),b;if(i)if(o){let e=1===ly.size(t),n=1===ly.size(r),i=t.length>0&&t[t.length-1]%4==0,o=r.length>0&&r[r.length-1]%4==0;b=e||n?f.setByOffset("global_idx",h(e?`${m.type.value}(${m.getByOffset("0")}.x)`:m.getByOffset("global_idx"),n?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"))):`
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
      }`})(e,s,u,d,c,l,h,i,r.dataType,n.dataType,a,o),getRunData:()=>({outputs:[{dims:d,dataType:a}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(ly.size(d)/4)},...lZ(s,u,d)]})}})(t,i??"",e.inputs[0],e.inputs[1],r,n,o))},pI=e=>{pT(e,"Add",(e,t)=>`${e}+${t}`)},pS=e=>{pT(e,"Div",(e,t)=>`${e}/${t}`)},pO=e=>{pT(e,"Equal",{scalar:(e,t)=>`u32(${e}==${t})`,vector:(e,t)=>`vec4<u32>(${e}==${t})`},void 0,void 0,9)},pE=e=>{pT(e,"Mul",(e,t)=>`${e}*${t}`)},pA=e=>{let t=l3("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;pT(e,"Pow",{scalar:(e,t)=>`pow_custom(${e},${t})`,vector:(e,t)=>`pow_vector_custom(${e},${t})`},`
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
      `)},pP=e=>{pT(e,"Sub",(e,t)=>`${e}-${t}`)},pk=e=>{pT(e,"Greater",{scalar:(e,t)=>`u32(${e}>${t})`,vector:(e,t)=>`vec4<u32>(${e}>${t})`},void 0,void 0,9)},pD=e=>{pT(e,"Less",{scalar:(e,t)=>`u32(${e}<${t})`,vector:(e,t)=>`vec4<u32>(${e}<${t})`},void 0,void 0,9)},pN=e=>{pT(e,"GreaterOrEqual",{scalar:(e,t)=>`u32(${e}>=${t})`,vector:(e,t)=>`vec4<u32>(${e}>=${t})`},void 0,void 0,9)},pC=e=>{pT(e,"LessOrEqual",{scalar:(e,t)=>`u32(${e}<=${t})`,vector:(e,t)=>`vec4<u32>(${e}<=${t})`},void 0,void 0,9)}}),fa=G(()=>{"use strict";hX(),hQ(),h4(),h6(),pz=(e,t,r,n,i=0)=>{let o=e.reduce((e,t)=>e+ly.size(t.dims),0),a=Array(e.length),s=Array(e.length),u=Array(e.length),l=0,d=i,p=[],c=[],h=[{type:12,data:o}];for(let r=0;r<e.length;++r)a[r]=l,s[r]=d,l+=ly.size(e[r].dims),d+=e[r].dims[t],c.push(e[r].dims.length),u[r]=l3(`input${r}`,n,c[r]),p.push("rank"),h.push({type:12,data:a[r]}),h.push({type:12,data:s[r]});for(let t=0;t<e.length;++t)h.push(...lZ(e[t].dims));h.push(...lZ(r));let f=l4("output",n,r.length),m=u.map((r,n)=>{let i=`
        let inputOffset = global_idx - uniforms.inputOffset${n};
        var outputIndices = ${r.offsetToIndices("inputOffset")};
        ${f.indicesGet("outputIndices",t)} += uniforms.outputAxisOffset${n};
        ${f.setByIndices("outputIndices",r.getByOffset("inputOffset"))}`;return 1===e.length?i:0===n?`if (inputIndex == 0u) {${i}}`:n===e.length-1?`else {${i}}`:`else if (inputIndex == ${n}u) {${i}}`}).join(`
`);return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:h}),getShaderSource:t=>`

  ${(()=>{t.registerUniform("outputSize","u32");for(let r=0;r<e.length;r++)t.registerUniform(`inputOffset${r}`,"u32"),t.registerUniform(`outputAxisOffset${r}`,"u32");return t.declareVariables(...u,f)})()}

  fn calculateInputIndex(global_idx: u32) -> u32 {
    ${u.slice(1).map((e,t)=>`if (global_idx < uniforms.inputOffset${t+1}) {
      return ${t}u;
    }`).join(`
`)}
    return ${e.length-1}u;
  }

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    let inputIndex = calculateInputIndex(global_idx);
    ${m}
  }`}},pR=(e,t)=>{let r=e.inputs,n=r[0].dims,i=ly.normalizeAxis(t.axis,n.length);var o=r,a=i;if(!o||o.length<1)throw Error("too few inputs");let s=o[0],u=s.dataType,l=s.dims.length;o.forEach((e,t)=>{if(0!==t){if(e.dataType!==u)throw Error("input tensors should be one type");if(e.dims.length!==l)throw Error("input tensors should have the same shape");e.dims.forEach((e,t)=>{if(t!==a&&e!==s.dims[t])throw Error("non concat dimensions must match")})}});let d=n.slice();d[i]=r.reduce((e,t)=>e+(t.dims.length>i?t.dims[i]:0),0);let p=r.filter(e=>ly.size(e.dims)>0);if(0===p.length)return void e.output(0,d);let c=e.deviceLimits.maxStorageBuffersPerShaderStage-1,h=0;for(let t=0;t<p.length;t+=c){let n=p.slice(t,t+c);e.compute(pz(n,i,d,r[0].dataType,h),{inputs:n,outputs:[0]}),h+=n.reduce((e,t)=>e+t.dims[i],0)}},pB=e=>lG({axis:e.axis})}),fs=G(()=>{"use strict";hX(),hQ(),pM=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${e.activation}`)}},pj=(e,t)=>{"Clip"===e.activation?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):"HardSigmoid"===e.activation?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):"LeakyRelu"===e.activation&&t.push({type:1,data:e.alpha})},pF=(e,t)=>{"Clip"===e.activation?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===e.activation?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===e.activation&&t.push({name:"alpha",type:"f32"})},pL=e=>{let t=e?.activation||"";if("HardSigmoid"===t){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}if("Clip"===t){let[r,n]=e?.activation_params||[lx,lw];return{activation:t,clipMax:n,clipMin:r}}if("LeakyRelu"===t){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),fu=G(()=>{"use strict";pV=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw Error(`${e}-component is not supported.`)}},pU=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),fl=G(()=>{"use strict";pq=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),fd=G(()=>{"use strict";hX(),hQ(),h6(),fs(),pG=(e,t,r,n,i)=>{let o=n-r;return`
      ${Array.from({length:r}).map((r,a)=>`
      if (${l1(t.shape,a,t.rank)} != 1) {
        ${t.indicesSet(e,a,l1(i,a+o,n))}
      } else {
        ${t.indicesSet(e,a,0)}
      }`).join("")}
`},pH=(e,t,r,n,i=!1,o)=>{let a=e[0].dims,s=e[1].dims,u=a[a.length-2],l=s[s.length-1],d=a[a.length-1],p=lJ(l),c=lJ(d),h=lJ(u),f=ly.size(r)/p/h,m=e.length>2,g=n?n.slice(0,-2):r.slice(0,-2),b=[ly.size(g),u,l],y=[{type:12,data:f},{type:12,data:u},{type:12,data:l},{type:12,data:d}];return pj(t,y),y.push(...lZ(g,a,s)),m&&y.push(...lZ(e[2].dims)),y.push(...lZ(b)),{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${c};${h};${i}`,inputDependencies:m?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:o?o(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:y}),getShaderSource:n=>{let o=l5("batch_dims",e[0].dataType,g.length),u=l3("a",e[0].dataType,a.length,c),l=l3("b",e[1].dataType,s.length,p),d=l4("output",e[0].dataType,b.length,p),f=lK(d.type.tensor),y=pM(t,d.type.value,f),_=[u,l],v="";if(m){let t=i?p:1;_.push(l3("bias",e[2].dataType,e[2].dims.length,t)),v=`${i?`value += bias[col / ${t}];`:`value += ${d.type.value}(bias[row + i]);`}`}let x=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];return pF(t,x),`
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
    ${pG("a_indices",u,u.rank-2,o.rank,"batch_indices")}
    ${u.indicesSet("a_indices",u.rank-2,0)}
    ${u.indicesSet("a_indices",u.rank-1,0)}
    let a_offset = ${u.indicesToOffset("a_indices")};

    var b_indices: ${l.type.indices};
    ${pG("b_indices",l,l.rank-2,o.rank,"batch_indices")}
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
  `}}}}),fp=G(()=>{"use strict";hX(),hQ(),h6(),fs(),fd(),fu(),pW=(e,t,r="f32",n,i=!1,o=32,a=!1,s=32)=>{let u,l,d,p,c=t[1]*e[1],h=t[0]*e[0],f=i?c:o,m=i?o:c,g=f/t[0],b=o/t[1];if(!((i&&4===g&&4===e[1]||!i&&(3===g||4===g))&&f%t[0]==0&&o%t[1]==0&&4===e[0]))throw Error(`If transposeA ${i} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${o} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${f/g}>, ${m}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${h/e[0]}>, ${o}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
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
  let globalRowStart = i32(workgroupId.y) * ${c};

  let num_tiles = ${a?`${Math.ceil(s/o)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${b};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${u=i,l=n,u?`
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
      for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
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
          ${3===g?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${d=i,p=g,d?`
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
}`},pK=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,pX=(e,t,r="f32",n,i=!1,o=32,a=!1,s=32,u=!1)=>{let l=e[1]*t[1],d=e[0]*t[0],p=i?l:o,c=i?o:l;if(c%t[1]!=0||p%t[0]!=0||o%t[1]!=0)throw Error(`tileAHight ${c} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${o} must be divisible by workgroupSize[1]${t[1]}`);let h=c/t[1],f=p/t[0],m=o/t[1],g=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${c}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${pK(i,n)}
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
      ${pK(i,n)}
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
      ${i?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];"}
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
`},pZ=(e,t,r,n,i=!1,o)=>{let a=e[0].dims,s=e[1].dims,u=a.slice(0,-2),l=s.slice(0,-2),d=n?n.slice(0,-2):r.slice(0,-2),p=ly.size(d),c=a[a.length-2],h=a[a.length-1],f=s[s.length-1],m=h%4==0&&f%4==0,g=c<=8?[4,1,1]:[4,4,1],b=[8,8,1],y=[Math.ceil(f/b[0]/g[0]),Math.ceil(c/b[1]/g[1]),Math.ceil(p/b[2]/g[2])],_=m?4:1,v=[...u,c,h/_],x=v.length,w=[...l,h,f/_],$=w.length,T=[p,c,f/_],I=[{type:6,data:c},{type:6,data:f},{type:6,data:h}];pj(t,I),I.push(...lZ(d,v,w));let S=["rank","rank"],O=e.length>2;return O&&(I.push(...lZ(e[2].dims)),S.push("rank")),I.push(...lZ(T)),{name:"MatMul",shaderCache:{hint:`${g};${t.activation};${m};${i}`,inputDependencies:S},getRunData:()=>({outputs:[{dims:o?o(r):r,dataType:e[0].dataType}],dispatchGroup:{x:y[0],y:y[1],z:y[2]},programUniforms:I}),getShaderSource:r=>{let n=d.length,o=l5("batchDims",e[0].dataType,n,1),a=lK(e[0].dataType),s=l3("a",e[0].dataType,x,_),u=l3("b",e[1].dataType,$,_),l=l4("result",e[0].dataType,T.length,_),p=[s,u];if(O){let t=i?_:1;p.push(l3("bias",e[2].dataType,e[2].dims.length,t))}let c=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];pF(t,c);let h=lK(l.type.tensor),f=((e,t,r,n,i=!1)=>{let[o,a,s,u]=n,l=lK(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${o.type.indices}) -> ${pV(e,l)} {
      var value = ${pV(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${pG("aIndices",a,a.rank-2,o.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${o.type.indices}) -> ${pV(e,l)} {
      var value = ${pV(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${pG("bIndices",s,s.rank-2,o.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${pV(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${pV(e,l)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `})(_,O,pM(t,l.type.value,h),[o,s,u,l],i);return`
  ${r.registerUniforms(c).registerInternalVariables(o).declareVariables(...p,l)}
  ${f}
  ${m?pW(g,b,a,o):pX(g,b,a,o)}
                   `}}}}),fc=G(()=>{"use strict";hX(),hJ(),h6(),fs(),fu(),fl(),fp(),pJ=(e,t,r,n,i,o,a,s,u)=>{let l="NHWC"===t.format,d=l?e[0].dims[3]:e[0].dims[1],p=r[0],c=l?r[2]:r[3],h=l?r[1]:r[2],f=l?r[3]:r[1],m=l&&(d%4==0||d%3==0)&&f%4==0,g=l?f:c*h,b=l?c*h:f,y=[8,8,1],_=n<=8?[4,1,1]:[4,4,1],v=[Math.ceil(g/y[0]/_[0]),Math.ceil(b/y[1]/_[1]),Math.ceil(p/y[2]/_[2])];lm("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${v}`);let x=m?l&&d%4!=0?3:4:1,w=y[1]*_[1],$=y[0]*_[0],T=Math.max(y[0]*x,y[1]),I=n%w==0,S=i%$==0,O=o%T==0,E=m?[x,4,4]:[1,1,1],A=[{type:6,data:n},{type:6,data:i},{type:6,data:o},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];pj(t,A),A.push(...lZ(e[0].dims,e[1].dims));let P=["rank","rank"];return a&&(A.push(...lZ(e[2].dims)),P.push("rank")),A.push(...lZ(r)),{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${x};${m};${I};${S};${O};${w};${$};${T}`,inputDependencies:P},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:A}),getShaderSource:n=>{let i=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];pF(t,i);let o=m?4:1,u=lK(e[0].dataType),d=`
      fn setOutputAtIndex(flatIndex : i32, value : ${m?`vec4<${u}>`:u}) {
        result[flatIndex] = ${m?`vec4<${u}>`:u}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${m?`vec4<${u}>`:u}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${m?"/ 4":""}, value);
      }`,p=[l3("x",e[0].dataType,e[0].dims.length,3===x?1:x),l3("w",e[1].dataType,e[1].dims.length,o)],c=l4("result",e[0].dataType,r.length,o);if(a){let t=l3("bias",e[2].dataType,e[2].dims.length,o);p.push(t),d+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${m?`vec4<${u}>`:u} {
          return bias[coords.${l?"w":"y"}${m?"/ 4":""}];
        }`}return`
        ${pq("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${n.registerUniforms(i).declareVariables(...p,c)}
        ${d}
        ${((e,t,r,n,i=!1,o,a=4,s=4,u=4,l="f32")=>{let d=e=>{switch(e){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${e} is not supported.`)}},p=e?`
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
    var resData = ${pV(a,l)}(0.0);
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
    return ${pV(a,l)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${m}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${m}
    }
    return ${pV(a,l)}(0.0);`,b=e?n&&r?d(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${d(s)}
    }
    return ${pV(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${d(s)}
    }
    return ${pV(s,l)}(0.0);`,y=pV(u,l),_=e?pV(a,l):pV(s,l),v=e?pV(s,l):pV(a,l),x=pM(o,y,l);return`
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
      ${pU(i)}
      ${x}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`})(l,I,S,O,a,t,E[0],E[1],E[2],u)}
        ${m?pW(_,y,u,void 0,!l,T):pX(_,y,u,void 0,!l,T,!1,void 0,s)}`}}}}),fh=G(()=>{"use strict";hX(),hJ(),hQ(),h6(),fs(),fu(),pQ=e=>"number"==typeof e?[e,e,e]:e,pY=(e,t)=>t<=1?e:e+(e-1)*(t-1),p0=(e,t,r,n,i)=>{null==i&&(i=((e,t,r,n=1)=>{let i=pY(t,n);return Math.floor((e[0]*(r-1)-r+i)/2)})(e,t[0],n[0]));let o=[0,0,0,r];for(let r=0;r<3;r++)e[r]+2*i>=t[r]&&(o[r]=Math.trunc((e[r]-t[r]+2*i)/n[r]+1));return o},p1=(e,t,r,n,i,o=!1,a="channelsLast")=>{let s,u,l,d,p;if("channelsLast"===a)[s,u,l,d,p]=e;else if("channelsFirst"===a)[s,p,u,l,d]=e;else throw Error(`Unknown dataFormat ${a}`);let[c,,h,f,m]=t,[g,b,y]=pQ(r),[_,v,x]=pQ(n),w=pY(h,_),$=pY(f,v),T=pY(m,x),{padInfo:I,outDepth:S,outHeight:O,outWidth:E}=((e,t,r,n,i,o,a,s,u,l)=>{let d,p,c,h;if("VALID"===e&&(e=0),"number"==typeof e){d={top:e,bottom:e,left:e,right:e,front:e,back:e};let f=p0([t,r,n,1],[s,u,l],1,[i,o,a],e);p=f[0],c=f[1],h=f[2]}else if(Array.isArray(e)){if(!e.every((e,t,r)=>e===r[0]))throw Error(`Unsupported padding parameter: ${e}`);d={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let f=p0([t,r,n,1],[s,u,l],1,[i,o,a],e[0]);p=f[0],c=f[1],h=f[2]}else if("SAME_UPPER"===e){p=Math.ceil(t/i),c=Math.ceil(r/o),h=Math.ceil(n/a);let e=(p-1)*i+s-t,f=(c-1)*o+u-r,m=(h-1)*a+l-n,g=Math.floor(e/2),b=Math.floor(f/2),y=Math.floor(m/2);d={top:b,bottom:f-b,left:y,right:m-y,front:g,back:e-g}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:p,outHeight:c,outWidth:h}})(i,u,l,d,g,b,y,w,$,T),A=o?c*p:c,P=[0,0,0,0,0];return"channelsFirst"===a?P=[s,A,S,O,E]:"channelsLast"===a&&(P=[s,S,O,E,A]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:l,inWidth:d,inChannels:p,outDepth:S,outHeight:O,outWidth:E,outChannels:A,padInfo:I,strideDepth:g,strideHeight:b,strideWidth:y,filterDepth:h,filterHeight:f,filterWidth:m,effectiveFilterDepth:w,effectiveFilterHeight:$,effectiveFilterWidth:T,dilationDepth:_,dilationHeight:v,dilationWidth:x,inShape:e,outShape:P,filterShape:t}},p2=(e,t,r,n,i,o)=>{let a="channelsLast"===o,s=(a?e[0].dims[3]:e[0].dims[1],[Math.ceil((e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t})(({x:r.map((e,t)=>t)}).x.map(e=>r[e]))/64),1,1]);lm("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${s}`);let u=[{type:12,data:ly.size(r)},{type:12,data:n},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];pj(t,u),u.push(...lZ(e[0].dims,e[1].dims));let l=["rank","rank"],d=3===e.length;return d&&(u.push(...lZ(e[2].dims)),l.push("rank")),u.push(...lZ(r)),{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};1;${d}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:s[0],y:s[1],z:s[2]},programUniforms:u}),getShaderSource:o=>{let s=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];pF(t,s);let u=lK(e[0].dataType),l=l3("x",e[0].dataType,e[0].dims.length,1),p=l3("W",e[1].dataType,e[1].dims.length,1),c=[l,p],h=l4("result",e[0].dataType,r.length,1),f="";if(d){let t=l3("bias",e[2].dataType,e[2].dims.length,1);c.push(t),f+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u} {
          return bias[${a?l1("coords",4,5):l1("coords",1,5)}];
        }`}let m=pV(1,u),g=pM(t,m,u);return`
            ${f}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${u} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${l.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${u} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${p.getByIndices("aIndices")};
            }
          ${o.registerUniforms(s).declareVariables(...c,h)}
          ${o.mainStart()}
          ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${h.offsetToIndices("global_idx")};
              let batch = ${l1("coords",0,l.rank)};
              let d2 = ${a?l1("coords",l.rank-1,l.rank):l1("coords",1,l.rank)};
              let xFRCCorner = vec3<u32>(${a?l1("coords",1,l.rank):l1("coords",2,l.rank)},
              ${a?l1("coords",2,l.rank):l1("coords",3,l.rank)},
              ${a?l1("coords",3,l.rank):l1("coords",4,l.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?l1("uniforms.x_shape",1,l.rank):l1("uniforms.x_shape",2,l.rank)};
              let xShapeZ = ${a?l1("uniforms.x_shape",2,l.rank):l1("uniforms.x_shape",3,l.rank)};
              let xShapeW = ${a?l1("uniforms.x_shape",3,l.rank):l1("uniforms.x_shape",4,l.rank)};
              let xShapeU = ${a?l1("uniforms.x_shape",4,l.rank):l1("uniforms.x_shape",1,l.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = ${u}(0);
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
                      ${a?`let xValues = vec4<${u}>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<${u}>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<${u}>(
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
                      ${a?`let xValues = vec2<${u}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<${u}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<${u}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${a?`let xValues = vec3<${u}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<${u}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<${u}>(
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
              result[global_idx] = ${u}(value);
          }`}}}}),ff=G(()=>{"use strict";hX(),hQ(),h6(),fs(),p3=(e,t,r,n)=>{let i=e.length>2,o=i?"value += b[output_channel];":"",a=e[0].dims,s=e[1].dims,u="NHWC"===t.format,l=u?r[3]:r[1],d=l/t.group,p=u&&d>=4?lJ(l):1,c=ly.size(r)/p,h=[{type:12,data:c},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:d}];return pj(t,h),h.push(...lZ(a,[s[0],s[1],s[2],s[3]/p])),h.push(...lZ([r[0],r[1],r[2],r[3]/p])),{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:i?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:n=>{let l=l4("output",e[0].dataType,r.length,p),d=lK(l.type.tensor),c=pM(t,l.type.value,d),h=l3("x",e[0].dataType,a.length),f=l3("w",e[1].dataType,s.length,p),m=[h,f];i&&m.push(l3("b",e[2].dataType,e[2].dims,p));let g=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];pF(t,g);let b=u?`
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
  }`}}},p4=(e,t,r,n)=>{let i=e.length>2,o=lJ(r[3]),a=lJ(r[2]),s=ly.size(r)/o/a,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/o],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/o],d=[r[0],r[1],r[2],r[3]/o],p=[{type:12,data:s},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];pj(t,p),p.push(...lZ(u,l,d));let c=(a-1)*t.strides[1]+l[1];return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${o};${a};${c};${l[0]};${l[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:r=>{let n=l4("output",e[0].dataType,d.length,o),s=lK(n.type.tensor),p=pM(t,n.type.value,s),h=l3("x",e[0].dataType,u.length,o),f=l3("w",e[1].dataType,l.length,o),m=[h,f];i&&m.push(l3("b",e[2].dataType,e[2].dims,o));let g=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return pF(t,g),`
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
  }`}}}}),fm=G(()=>{"use strict";hQ(),fc(),fh(),fp(),ff(),fs(),fd(),h5(),p6=[2,3,1,0],p5=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let e=2;e<t[1].dims.length;++e)0===r[e-2]&&(r[e-2]=t[1].dims[e]);let n=e.pads.slice();l_.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,"NHWC"===e.format,e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:r,pads:n}),i},p8=e=>{let t=pL(e),r=e.format;return{autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],format:r,dilations:e.dilations,group:e.group,kernelShape:e.kernel_shape,pads:e.pads,strides:e.strides,wIsConst:e.w_is_const(),...t,cacheKey:`${e.format};${t.activation};`}},p7=(e,t,r,n)=>{var i,o,a,s,u,l;let d,p,c,h,f,m,g="NHWC"===r.format,b=(i=t[0].dims,o=t[1].dims,a=r.dilations,s=r.pads,u=r.strides,l=g,d=i[0],c=(p=i.slice(l?1:2,l?3:4)).length,h=o[0],f=o.slice(2).map((e,t)=>e+(e-1)*(a[t]-1)),(m=p.map((e,t)=>e+s[t]+s[t+c]).map((e,t)=>Math.floor((e-f[t]+u[t])/u[t]))).splice(0,0,d),m.splice(l?3:1,0,h),m);if(1!==r.group){let i=[t[0]];if(g){let n=e.kernelCustomData.wT??e.compute(de(t[1],p6),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n),i.push(n)}else i.push(t[1]);3===t.length&&i.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&g&&t[1].dims[0]===r.group&&1===t[1].dims[1]&&1===r.dilations[0]&&1===r.dilations[1]?e.compute(p4(i,r,b,n),{inputs:i}):e.compute(p3(i,r,b,n),{inputs:i});return}let y=3===t.length,_=t[0].dims[g?1:2],v=t[0].dims[g?2:3],x=t[0].dims[g?3:1],w=t[1].dims[2],$=t[1].dims[3],T=b[g?1:2],I=b[g?2:3],S=b[g?3:1],O=g&&w===_&&$===v&&0===r.pads[0]&&0===r.pads[1];if(O||1===w&&1===$&&1===r.dilations[0]&&1===r.dilations[1]&&1===r.strides[0]&&1===r.strides[1]&&0===r.pads[0]&&0===r.pads[1]){let i=b[0],o,a,s,u=[];if(g){let n=e.kernelCustomData.wT??e.compute(de(t[1],p6),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n),O){let e=_*v*x;o=t[0].reshape([1,i,e]),a=n.reshape([1,e,S]),s=[1,i,S]}else o=t[0].reshape([i,_*v,x]),a=n.reshape([1,x,S]),s=[i,T*I,S];u.push(o),u.push(a)}else o=t[0].reshape([i,x,_*v]),a=t[1].reshape([1,S,x]),s=[i,S,T*I],u.push(a),u.push(o);y&&u.push(t[2]);let l=s[2],d=u[0].dims[u[0].dims.length-1];l<8&&d<8?e.compute(pH(u,r,b,s,g,n),{inputs:u}):e.compute(pZ(u,r,b,s,g,n),{inputs:u});return}let E=e.kernelCustomData.wT??e.compute(de(t[1],p6),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=E);let A=[t[0],E];y&&A.push(t[2]);let P=g?T*I:S,k=g?S:T*I,D=w*$*x;e.compute(pJ(A,r,b,P,k,D,y,!0,n),{inputs:A})},p9=(e,t)=>{var r,n,i,o,a;if(((e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let r=e[0].dims.length-2;if(t.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(t.strides.length!==r)throw Error(`strides should be ${r}D`);if(t.pads.length!==2*r)throw Error(`pads should be ${2*r}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape")})(e.inputs,t),3===e.inputs[0].dims.length){let i,o,a,s,u,l,d;r=e,i="NHWC"===(n=t).format,o=[r.inputs[0].reshape(i?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])],3===r.inputs.length&&o.push(r.inputs[2]),a=[0,n.pads[0],0,n.pads[1]],s=[1].concat(n.strides),u=[1].concat(n.dilations),l=[1].concat(n.kernelShape),d=p5({...n,pads:a,strides:s,dilations:u,kernelShape:l},o),p7(r,o,d,e=>i?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])}else if(5===e.inputs[0].dims.length){let r,n,s,u;i=e,o=e.inputs,r="NHWC"===(a=t).format?"channelsLast":"channelsFirst",n=p5(a,o),s="NOTSET"===a.autoPad?a.pads:a.autoPad,u=p1(o[0].dims,o[1].dims,a.strides,a.dilations,s,!1,r),i.compute(p2(o,n,u.outShape,[u.filterDepth,u.filterHeight,u.filterWidth],[u.padInfo.front,u.padInfo.top,u.padInfo.left],r))}else{let r=p5(t,e.inputs);p7(e,e.inputs,r)}}}),fg=G(()=>{"use strict";hX(),hJ(),hQ(),h6(),ce=(e,t,r)=>{let n=e.length>2,i=t.outputShape,o="NHWC"===t.format,a=t.group,s=e[1].dims,u=s[2]/a,l=s[3],d=o?lJ(u):1,p=o&&1===l&&u>=4,c=p?4*Math.floor(u/4):Math.floor(u/d)*d,h=u-c,f=o?lJ(l):1,m=o?1===l?d:f:1,g=ly.size(i)/f,b=[Math.ceil(g/64),1,1];lm("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${b}`);let y=["rank","rank"],_=[t.strides[0],t.strides[1]],v=[t.kernelShape[o?1:2],t.kernelShape[o?2:3]],x=[t.dilations[0],t.dilations[1]],w=[v[0]+(t.dilations[0]<=1?0:(t.kernelShape[o?1:2]-1)*(t.dilations[0]-1)),v[1]+(t.dilations[1]<=1?0:(t.kernelShape[o?2:3]-1)*(t.dilations[1]-1))],$=[w[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),w[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],T=[{type:12,data:g},{type:12,data:_},{type:12,data:v},{type:12,data:x},{type:12,data:w},{type:6,data:$},{type:12,data:c},{type:12,data:u},{type:12,data:l},...lZ(e[0].dims,e[1].dims)];return n&&(T.push(...lZ(e[2].dims)),y.push("rank")),T.push(...lZ(i)),{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${d}${m}${f}${p}${h}`,inputDependencies:y},getRunData:()=>({dispatchGroup:{x:b[0],y:b[1],z:b[2]},outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],programUniforms:T}),getShaderSource:t=>{let r=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:_.length},{name:"filter_dims",type:"u32",length:v.length},{name:"dilations",type:"u32",length:v.length},{name:"effective_filter_dims",type:"u32",length:w.length},{name:"pads",type:"i32",length:$.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],a=lK(e[0].dataType),s=o?1:2,u=o?2:3,l=o?3:1,c=l3("W",e[1].dataType,e[1].dims.length,m),g=l3("Dy",e[0].dataType,e[0].dims.length,d),b=[g,c];n&&b.push(l3("bias",e[2].dataType,[i[l]].length,f));let y=l4("result",e[0].dataType,i.length,f),x=`
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
    ${x}}`}}}}),fb=G(()=>{"use strict";fg(),fs(),h5(),ct=(e,t,r,n,i,o)=>(e-1)*t+r+(n-1)*i+1-o,cr=(e,t,r,n,i)=>{let o=Math.floor(e/2);"SAME_UPPER"===t?(r[n]=o,r[i]=e-o):"SAME_LOWER"===t&&(r[n]=e-o,r[i]=o)},cn=(e,t)=>{let r=e.kernelShape.slice();if(0===e.kernelShape.length||0===e.kernelShape.reduce((e,t)=>e*t,1)){r.length=0;for(let e=2;e<t[1].dims.length;++e)r.push(t[1].dims[e])}let n="NHWC"===e.format;r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let i=e.pads.slice(),o=e.outputShape.slice(),a=e.outputPadding.slice(),s=t[0].dims,u=e.dilations.slice();0===u.reduce((e,t)=>e+t,0)&&(u=Array(t[0].dims.length-2).fill(1));let l=e.strides.slice();0===l.reduce((e,t)=>e+t,0)&&(l=Array(t[0].dims.length-2).fill(1)),((e,t,r,n,i,o,a,s,u,l)=>{let d=e.length-2,p=0===l.length;u.length<d&&u.push(...Array(d-u.length).fill(0));let c=e[0],h=t[s?3:1]*i;for(let i=0,c=e.length-d-!!s;i<d;++i,++c){let s=e[c],h=p?s*a[i]:l[i];cr(ct(s,a[i],o[i],t[c],r[i],h),n,o,i,i+d),p&&l.push(a[i]*(s-1)+u[i]+(t[c]-1)*r[i]+1-o[i]-o[i+d])}l.splice(0,0,c),l.splice(s?3:1,0,h)})(s,r,u,e.autoPad,e.group,i,l,n,a,o);let d=Object.assign({},e);return Object.assign(d,{kernelShape:r,pads:i,outputPadding:a,outputShape:o,dilations:u,strides:l}),d},ci=e=>{let t=pL(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],i=e.dilations,o=e.group??1,a=e.kernelShape,s=e.pads,u=e.strides,l=e.wIsConst();return{autoPad:n,format:r,dilations:i,group:o,kernelShape:a,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:s,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},co=(e,t,r,n)=>{let i=e.kernelCustomData.wT??e.compute(de(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let o=[t[0],i];3===t.length&&o.push(t[2]),e.compute(ce(o,r,n),{inputs:o})},ca=(e,t)=>{if(((e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length&&3!==e[0].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let r=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==r))throw Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((e,t)=>e+t,0)>0&&t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.reduce((e,t)=>e+t,0)>0&&t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.reduce((e,t)=>e+t,0)>0&&t.pads.length!==2*n)throw Error(`pads should be ${2*n}D`);if(t.outputPadding.length!==n&&0!==t.outputPadding.length)throw Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((e,t)=>e+t,0)>0&&0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape")})(e.inputs,t),3===e.inputs[0].dims.length){var r,n;let i,o,a,s,u,l,d,p;r=e,i="NHWC"===(n=t).format,o=[r.inputs[0].reshape(i?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])],3===r.inputs.length&&o.push(r.inputs[2]),(0===(a=n.kernelShape).length||0===a[0])&&(a=[r.inputs[1].dims[2]]),(0===(s=n.dilations).length||0===s[0])&&(s=[1]),(0===(u=n.strides).length||0===u[0])&&(u=[1]),0===(l=n.pads).length&&(l=[0,0]),l=[0,l[0],0,l[1]],u=[1].concat(u),s=[1].concat(s),a=[1].concat(a),d=[0].concat(d=n.outputPadding),p=cn({...n,pads:l,strides:u,dilations:s,kernelShape:a,outputPadding:d},o),co(r,o,p,e=>i?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])}else{let r=cn(t,e.inputs);co(e,e.inputs,r)}}}),fy=G(()=>{"use strict";hX(),hQ(),h4(),h6(),cs=(e,t)=>{var r,n,i,o;let a,s,u,l,d,p,c=e.inputs[0].dims,h=e.inputs[0].dataType,f=e.inputs[1];e.compute((r=h,n=c,i=f,o=t,a=ly.size(n),s=n.length,u=l3("input",r,s),l=l4("output",r,s),d=6===i.dataType?i.getInt32Array()[0]:Number(i.getBigInt64Array()[0]),p=ly.normalizeAxis(d,s),{name:"CumSum",shaderCache:{hint:o.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:p},...lZ(n,n)]}),getShaderSource:e=>{let t=` i32(${u.indicesGet("inputIndices","uniforms.axis")}) `,r=l1("uniforms.input_shape","uniforms.axis",s),n=o.reverse?t+(o.exclusive?" + 1":""):"0",i=o.reverse?r:t+(o.exclusive?"":" + 1");return`
                ${e.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(u,l)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${l.offsetToIndices("global_idx")};
                  var sum = ${l.type.value}(0);
                  let first : i32 = ${n};
                  let last : i32 = ${i};
                  for (var i : i32 = first; i < last; i++) {
                    ${u.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${u.getByIndices("inputIndices")};
                  }
                  ${l.setByOffset("global_idx","sum")};
                }`}}),{inputs:[0]})},cu=e=>{let t=1===e.exclusive,r=1===e.reverse;return lG({exclusive:t,reverse:r})}}),f_=G(()=>{"use strict";hX(),hQ(),h4(),h6(),cl=(e,t)=>{var r,n;let i,o,a,s,u,l,d,p,c,h,f,m,g,b;(e=>{if(!e||1!==e.length)throw Error("DepthToSpace requires 1 input.");if(4!==e[0].dims.length)throw Error("DepthToSpace requires 4D input.")})(e.inputs),e.compute((r=e.inputs[0],d="NHWC"===(n=t).format,p=n.blocksize,c="DCR"===n.mode,d?([i,o,a,s]=r.dims,u=c?[i,o,a,p,p,s/p**2]:[i,o,a,s/p**2,p,p],l=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([i,o,a,s]=[r.dims[0],r.dims[2],r.dims[3],r.dims[1]],u=c?[i,p,p,s/p**2,o,a]:[i,s/p**2,p,p,o,a],l=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]),f=(h=r.reshape(u)).dims.length,m=r.dataType,g=l3("a",m,f),b=l4("output",m,f),{name:"DepthToSpace",shaderCache:{hint:`${r.dims};${n.blocksize};${n.mode}`,inputDependencies:["rank"]},getRunData:e=>{let t=d?[i,o*p,a*p,s/p**2]:[i,s/p**2,o*p,a*p],r=ly.size(t),n=h.dims,u=ly.sortBasedOnPerm(n,l);return{outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:[{type:12,data:r},...lZ(n,u)]}},getShaderSource:e=>`
  ${e.registerUniform("output_size","u32").declareVariables(g,b)}

  ${((e,t,r,n)=>{let i=[];i.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let n=0;n<t;++n)i.push(r.indicesSet("a",e[n],`i[${n}]`));return i.push("return a;}"),i.join(`
`)})(l,f,g,b)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`}))},cd=e=>lG({blocksize:e.blocksize,mode:e.mode,format:e.format})}),fv=G(()=>{"use strict";hX(),hQ(),h4(),h6(),cp=2*Math.PI,cc=e=>{let t=[],r=e;for(let e of[4,2,3,5])for(;r%e==0;)t.push(e),r/=e;return 1===r?t:void 0},ch=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},cf=(e,t,r,n,i)=>{let o=r/e,a=512-n,s=e=>`smem[${a}u + base + ${e*t}u]`,u=`  for (var t = local_idx; t < ${o}u; t += 256u) {
`;u+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
    var leg: array<vec2<f32>, 5>;
`;for(let r=0;r<e;r++){let a=`${n}u + t + ${r*o}u`;if(0===r)u+=`    leg[0] = smem[${a}];
`;else{let n=i*cp*r/(e*t);u+=`    { let a = ${ch(n)} * angleUnit; leg[${r}] = cmul(smem[${a}], vec2<f32>(cos(a), sin(a))); }
`}}if(u+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,2===e)u+=`    ${s(0)} = leg[0] + leg[1];
    ${s(1)} = leg[0] - leg[1];
`;else if(4===e)u+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
    let oddRot = ${i<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)"};
    ${s(0)} = evenSum + oddSum;
    ${s(1)} = evenDiff + oddRot;
    ${s(2)} = evenSum - oddSum;
    ${s(3)} = evenDiff - oddRot;
`;else for(let t=0;t<e;t++){let r=["leg[0]"];for(let n=1;n<e;n++){let o=i*cp*(n*t)/e,a=ch(Math.cos(o)),s=ch(Math.sin(o));r.push(`vec2<f32>(leg[${n}].x*${a} - leg[${n}].y*${s}, leg[${n}].x*${s} + leg[${n}].y*${a})`)}u+=`    ${s(t)} = ${r.join(" + ")};
`}return`${u}  }
  workgroupBarrier();
`},cm=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),cg=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],cb=(e,t,r)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,r),cy=e=>{if(!e||0===e.dataType)return;if(1!==ly.size(e.dims))throw Error("DFT optional scalar inputs must have exactly 1 element.");if(6===e.dataType)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},c_=(e,t)=>{var r=e.inputs;if(!r||r.length<1)throw Error("DFT requires at least 1 input.");let n=r[0].dims;if(n.length<2)throw Error("DFT input must have at least 2 dimensions.");let i=n[n.length-1];if(1!==i&&2!==i)throw Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).");let o=e.inputs[0],a=o.dims.length,s=0!==t.inverse,u=0!==t.onesided,l=cy(e.inputs[1]);if(void 0!==l&&l<=0)throw Error("dft_length must be greater than zero.");let d=ly.normalizeAxis(cy(e.inputs[2])??t.axis,a);if(d===a-1)throw Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(s&&u&&2!==o.dims[a-1])throw Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let p=((e,t,r,n,i)=>{let o=e.dims,a=o.length,s=o[a-1],u=o[t],l=r&&n?(u-1)*2:u;void 0!==i&&(l=i);let d=r&&n?1:2,p=n&&!r?Math.floor(l/2)+1:l,c=o.slice();c[t]=p,c[a-1]=d;let h=1;for(let e=t+1;e<a-1;e++)h*=o[e];let f=ly.size(o)/s/u;return{dataType:e.dataType,outputDims:c,length:l,signalLength:u,inner:h,batch:f,inputComponents:s,outputComponents:d,outputLength:p,inverse:r,onesided:n}})(o,d,s,u,l);if(p.length<=0)throw Error(`Invalid DFT length: ${p.length}`);let c=p.length<=512&&void 0!==cc(p.length)?(e=>{let{dataType:t,length:r,inputComponents:n,outputComponents:i,inverse:o,onesided:a}=e,s=lX(t),u=o?1:-1,l=o?1/r:1,d=cc(r);return{name:"DFT",shaderCache:{hint:cm(e,"fft"),inputDependencies:["type"]},getShaderSource:e=>{let p=l3("x",t,[1]),c=l4("y",t,[1]),h=e=>{let t=`inBase + (${e}) * uniforms.inner * ${n}u`,r=`f32(${p.getByOffset(t)})`,i=2===n?`f32(${p.getByOffset(`${t} + 1u`)})`:"0.0";return`vec2<f32>(${r}, ${i})`},f;if(o&&a){let e=Math.floor(r/2)+1,t=r%2==0?`select(provided, provided - 1u, provided == ${e}u)`:"provided";f=`
    let provided = min(uniforms.signalLength, ${e}u);
    for (var i = local_idx; i < ${r}u; i += 256u) {
      if (i < provided) { smem[i] = ${h("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${t}; k += 256u) {
      let h = smem[k];
      smem[${r}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else f=`
    let loadCount = min(uniforms.signalLength, ${r}u);
    for (var i = local_idx; i < ${r}u; i += 256u) {
      if (i < loadCount) { smem[i] = ${h("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:m,resultOffset:g}=((e,t,r)=>{let n="",i=1,o=0;for(let a of e)n+=cf(a,i,t,o,r),i*=a,o=512-o;return{code:n,resultOffset:o}})(d,r,u),b=1===l?`smem[${g}u + i]`:`smem[${g}u + i] * ${ch(l)}`,y=2===i?c.setByOffset("off + 1u",`${s}(v.y)`):"";return`
  ${cb(e,p,c)}
  var<workgroup> smem: array<vec2<f32>, 1024>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${e.mainStart(256)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${n}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${i}u;
    ${f}
${m}    for (var i = local_idx; i < uniforms.outputLength; i += 256u) {
      let v = ${b};
      let off = outBase + i * uniforms.inner * ${i}u;
      ${c.setByOffset("off",`${s}(v.x)`)}
      ${y}
    }
  }`},getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:cg(e),dispatchGroup:{x:e.batch}})}})(p):(e=>{let{dataType:t,length:r,inputComponents:n,outputComponents:i,inverse:o,onesided:a}=e,s=lX(t),u=o?1:-1,l=o?1/r:1;return{name:"DFT",shaderCache:{hint:cm(e,"direct"),inputDependencies:["type"]},getShaderSource:e=>{let d=l3("x",t,[1]),p=l4("y",t,[1]),c=e=>{let t=`inBase + (${e}) * uniforms.inner * ${n}u`,r=`f32(${d.getByOffset(t)})`,i=2===n?`f32(${d.getByOffset(`${t} + 1u`)})`:"0.0";return`vec2<f32>(${r}, ${i})`},h=o&&a?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(r/2)+1}u);
    if (k < provided) { return ${c("k")}; }
    let m = ${r}u - k;
    if (m < provided) {
      let h = ${c("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${c("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,f=`
      let angle = ${ch(u*cp)} * f32(knMod) / ${ch(r)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${r}u) { knMod -= ${r}u; }`,m=2===i?p.setByOffset("off + 1u",`${s}(v.y)`):"",g=1===l?"acc":`acc * ${ch(l)}`;return`
  ${cb(e,d,p)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${h}
  ${e.mainStart(256)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${n}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${i}u;
    for (var k = local_idx; k < uniforms.outputLength; k += 256u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${r}u; n++) {${f}
      }
      let v = ${g};
      let off = outBase + k * uniforms.inner * ${i}u;
      ${p.setByOffset("off",`${s}(v.x)`)}
      ${m}
    }
  }`},getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:cg(e),dispatchGroup:{x:e.batch}})}})(p);e.compute(c,{inputs:[0]})},cv=e=>lG({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),fx=G(()=>{"use strict";hX(),hQ(),h4(),h6(),c$="^"+(cw="("+(cx="[a-zA-Z]|\\.\\.\\.")+")+")+"$",cT="^"+("("+cw+",)*")+cw+"$",cI=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);void 0===r?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},cS=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[r,n]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(cT)))throw Error("Invalid LHS term");if(r.split(",").forEach((t,r)=>{let n=e[r].dims.slice();if(!t.match(RegExp(c$)))throw Error("Invalid LHS term");let i=this.processTerm(t,!0,n,r);this.lhs.push(i)}),""===n)n+=[...this.symbolToInfo.entries()].filter(([e,t])=>1===t.count||"..."===e).map(([e])=>e).join("");else if(!n.match(RegExp(cw)))throw Error("Invalid RHS");n.match(RegExp(cx,"g"))?.forEach(e=>{if("..."===e)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let t=this.symbolToInfo.get(e);if(void 0===t)throw Error("Invalid RHS symbol");this.outputDims.push(t.dimValue)}}),this.rhs=this.processTerm(n,!1,this.outputDims)}addSymbol(e,t,r){let n=this.symbolToInfo.get(e);if(void 0!==n){if(n.dimValue!==t&&1!==n.count)throw Error("Dimension mismatch");n.count++,n.inputIndices.push(r)}else n={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,n)}processTerm(e,t,r,n=-1){let i=r.length,o=!1,a=[],s=0;if(!e.match(RegExp(c$))&&!t&&""!==e)throw Error("Invalid LHS term");let u=e.match(RegExp(cx,"g")),l=new cI(n);return u?.forEach((e,d)=>{if("..."===e){if(o)throw Error("Only one ellipsis is allowed per input term");o=!0;let e=i-u.length+1;if(e<0)throw Error("Ellipsis out of bounds");if(a=r.slice(s,s+e),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=a;else throw Error("Ellipsis must be specified in the LHS");for(let e=0;e<a.length;e++){let t=String.fromCharCode(48+e);l.addSymbol(t,d+e),this.addSymbol(t,r[s++],n)}}else l.addSymbol(e,d+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,r[s++],n)}),l}},cO=(e,t)=>{var r,n,i,o;let a,s,u,l,d=new cS(e.inputs,t.equation),p=d.outputDims,c=e.inputs.map((e,t)=>e.dims);e.compute((r=c,n=e.inputs[0].dataType,i=d,o=p,a=r.map(e=>e.length).map((e,t)=>l3(`input${t}`,n,e)),s=ly.size(o),u=l4("output",n,o.length),l=[...i.symbolToInfo.keys()].filter(e=>!i.rhs.symbolToIndices.has(e)),{name:"Einsum",shaderCache:{hint:i.equation,inputDependencies:r.map(()=>"rank")},getRunData:()=>{let e=l.filter(e=>i.symbolToInfo.has(e)).map(e=>({type:12,data:i.symbolToInfo.get(e)?.dimValue||0}));e.push({type:12,data:s});let t=r.map((e,t)=>[...lZ(e)]).reduce((e,t)=>e.concat(t),e);return t.push(...lZ(o)),{outputs:[{dims:o,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:t}},getShaderSource:e=>{let t=[],r=[],n=[],o=[],s=[],d=i.symbolToInfo.size===i.rhs.symbolToIndices.size;i.symbolToInfo.forEach((e,l)=>{if(i.rhs.symbolToIndices.has(l)){let r=i.rhs.symbolToIndices.get(l)?.[0];void 0!==r&&i.lhs.forEach((n,i)=>{if(e.inputIndices.includes(i)){let e=n.symbolToIndices.get(l);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{t.push(`${a[i].indicesSet(`input${i}Indices`,e,u.indicesGet("outputIndices",r))}`)})}})}else i.lhs.forEach((t,n)=>{if(e.inputIndices.includes(n)){let e=t.symbolToIndices.get(l);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{r.push(`${a[n].indicesSet(`input${n}Indices`,e,`${l}`)}`)}),s.push(`prod *= ${a[n].getByIndices(`input${n}Indices`)};`)}}),n.push(`for(var ${l}: u32 = 0; ${l} < uniforms.${l+"_max"}; ${l}++) {`),o.push("}")});let p=d?[...t,`let sum = ${a.map((e,t)=>e.getByIndices(`input${t}Indices`)).join(" * ")};`]:[...t,"var sum = 0.0;",...n,...r,"var prod = 1.0;",...s,"sum += prod;",...o];return`
            ${e.registerUniforms(l.map(e=>({name:`${e+"_max"}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,u)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u.offsetToIndices("global_idx")};
            ${a.map((e,t)=>`var input${t}Indices: ${a[t].type.indices};`).join(`
`)}
            ${p.join(`
`)};
            ${u.setByOffset("global_idx","sum")};
          }`}}))},cE=e=>{let t=e.equation.replace(/\s+/g,"");return lG({equation:t})}}),fw=G(()=>{"use strict";hX(),hQ(),h6(),cA=(e,t)=>{let r=e.length-t.length,n=[];for(let t=0;t<r;++t)n.push(e[t]);for(let i=0;i<t.length;++i)n.push(1===t[i]?e[i+r]:t[i]);return n},cP=e=>{var t;let r,n,i,o,a,s,u,l,d,p;(e=>{if(!e||2!==e.length)throw Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,i=t.length<r.length?0:t.length-r.length;for(;n<r.length&&i<t.length;++n,++i)if(r[n]!==t[i]&&1!==r[n]&&1!==t[i])throw Error("Expand requires shape to be broadcastable to input")})(e.inputs),e.compute((o=(r=i=(t=e.inputs)[0].dims,n=Array.from(t[1].getBigInt64Array(),Number),r.length>n.length?cA(r,n):cA(n,r)),s=9===(a=t[0].dataType)||1===ly.size(i),u=9===a||i.length>0&&i[i.length-1]%4==0?4:1,l=s||o.length>0&&o[o.length-1]%4==0?4:1,p=[{type:12,data:d=Math.ceil(ly.size(o)/l)},...lZ(i,o)],{name:"Expand",shaderCache:{hint:`${o.length};${u}${l}`,inputDependencies:["rank"]},getShaderSource:e=>{let t=l3("input",a,i.length,u),r=l4("output",a,o.length,l),n;if(9===a){let e=(e,n,i="")=>`
          let outputIndices${n} = ${r.offsetToIndices(`outputOffset + ${n}u`)};
          let offset${n} = ${t.broadcastedIndicesToOffset(`outputIndices${n}`,r)};
          let index${n} = offset${n} / 4u;
          let component${n} = offset${n} % 4u;
          ${e}[${n}] = ${i}(${t.getByOffset(`index${n}`)}[component${n}]);
        `;n=`
        let outputOffset = global_idx * ${l};
        var data = vec4<u32>(0);
        ${e("data",0,"u32")}
        ${e("data",1,"u32")}
        ${e("data",2,"u32")}
        ${e("data",3,"u32")}
        ${r.setByOffset("global_idx","data")}
      }`}else n=`
        let outputIndices = ${r.offsetToIndices(`global_idx * ${l}`)};
        let inputOffset = ${t.broadcastedIndicesToOffset("outputIndices",r)};
        let data = ${r.type.value}(${t.getByOffset(`inputOffset / ${u}`)});
        ${r.setByOffset("global_idx","data")}
      }`;return`
    ${e.registerUniform("vec_size","u32").declareVariables(t,r)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${n}`},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p})}),{inputs:[0]})}}),f$=G(()=>{"use strict";hX(),hQ(),h6(),fn(),ck=e=>{var t;let r,n,i,o;e.inputs.length<2||0===ly.size(e.inputs[1].dims)?py(e):e.compute((r=(t=e.inputs)[0].dataType,n=ly.size(t[0].dims),o=(i=ly.size(t[1].dims))%4==0,{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:e=>{let t=l3("x",r,[1],4),n=l3("bias",r,[1],4),i=l4("y",r,[1],4),a=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${n.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,s=o?`
      let bias = ${n.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${a(0)}${a(1)}${a(2)}${a(3)}
      let bias = ${t.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms([{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}]).declareVariables(t,n,i)}

    ${pg(lX(r))}

    ${e.mainStart(lH)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${t.getByOffset("global_idx")};
      ${s}
      let x_in = x + bias;
      ${i.setByOffset("global_idx",pb("x_in"))}
    }`},getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(n/lH/4)}})}))}}),fT=G(()=>{"use strict";hX(),hQ(),h4(),h6(),cD=e=>lG({axis:e.axis}),cN=(e,t)=>{var r,n;let i,o,a,s,u,l,d,p,c;(e=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.")})(e.inputs),e.compute((r=e.inputs,n=t,i=r[0].dims,o=r[1].dims,a=i.length,s=ly.normalizeAxis(n.axis,a),(u=i.slice(0)).splice(s,1,...o),l=i[s],d=9===r[0].dataType?4:1,c=[{type:12,data:p=Math.ceil(ly.size(u)/d)},{type:6,data:l},{type:12,data:s},...lZ(r[0].dims,r[1].dims,u)],{name:"Gather",shaderCache:{hint:n.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:u,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:e=>{let t=l3("data",r[0].dataType,r[0].dims.length,d),n=l3("inputIndices",r[1].dataType,r[1].dims.length),i=l4("output",r[0].dataType,u.length,d),l=e=>{let r=o.length,i=`var indicesIndices${e}  = ${n.type.indices}(0);`;for(let t=0;t<r;t++)i+=`${r>1?`indicesIndices${e}[${t}]`:`indicesIndices${e}`} = ${u.length>1?`outputIndices${e}[uniforms.axis + ${t}]`:`outputIndices${e}`};`;i+=`
          var idx${e} = ${n.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${t.type.indices};
        `;for(let t=0,n=0;t<a;t++)t===s?(i+=`${a>1?`dataIndices${e}[${t}]`:`dataIndices${e}`} = u32(idx${e});`,n+=r):(i+=`${a>1?`dataIndices${e}[${t}]`:`dataIndices${e}`} = ${u.length>1?`outputIndices${e}[${n}]`:`outputIndices${e}`};`,n++);return i},p;if(9===r[0].dataType){let e=(e,r,n="")=>`
          let outputIndices${r} = ${i.offsetToIndices(`outputOffset + ${r}u`)};
          ${l(r)};
          let offset${r} = ${t.indicesToOffset(`dataIndices${r}`)};
          let index${r} = offset${r} / 4u;
          let component${r} = offset${r} % 4u;
          ${e}[${r}] = ${n}(${t.getByOffset(`index${r}`)}[component${r}]);
        `;p=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${e("value",0,"u32")}
        ${e("value",1,"u32")}
        ${e("value",2,"u32")}
        ${e("value",3,"u32")}
        ${i.setByOffset("global_idx","value")}
      `}else p=`
      let outputIndices = ${i.offsetToIndices("global_idx")};
      ${l("")};
      let value = ${t.getByIndices("dataIndices")};
      ${i.setByOffset("global_idx","value")};
      `;return`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(t,n,i)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${p}
      }`}}))}}),fI=G(()=>{"use strict";hX(),hQ(),h6(),cC=(e,t)=>{var r,n,i,o,a,s;let u,l,d=e.inputs,p=d[0].dims,c=d[0].dataType,h=d[1].dims,f=h[h.length-1],m=ly.sizeToDimension(h,h.length-1),g=ly.sizeFromDimension(p,t.batchDims+f),b=ly.sizeToDimension(p,t.batchDims),y=ly.sizeFromDimension(p,t.batchDims),_=Array(f),v=g;for(let e=0;e<f;++e)_[f-1-e]=v,v*=p[t.batchDims+f-1-e];let x=(r=e,n=d[1],i=_,o=t.batchDims,a=p,u=[{type:12,data:s=m},{type:12,data:o},{type:12,data:a},{type:12,data:i},{type:12,data:m/b},{type:12,data:y},{type:12,data:f}],l=[s],u.push(...lZ(n.dims,l)),r.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${i.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:l,dataType:r.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u}),getShaderSource:e=>{let t=l3("indices_data",n.dataType,n.dims.length),r=l4("input_slice_offsets_data",12,1,1),o=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:i.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${e.registerUniforms(o).declareVariables(t,r)}
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
        ${1===a.length?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${1===i.length?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[n],outputs:[-1]})[0]),w=t.batchDims+f;if(w>p.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let $=h.slice(0,-1).concat(p.slice(w)),T=ly.size($),I=[{type:12,data:T},{type:12,data:g},...lZ(d[0].dims,x.dims,$)];e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:$,dataType:c}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:I}),getShaderSource:e=>{let t=l3("data",d[0].dataType,d[0].dims.length),r=l3("slice_offsets",12,x.dims.length),n=l4("output",d[0].dataType,$.length);return`
          ${e.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(t,r,n)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[d[0],x]})},cz=e=>({batchDims:e.batch_dims,cacheKey:""})}),fS=G(()=>{"use strict";hX(),hQ(),h4(),h6(),cR=(e,t)=>{var r,n;let i,o,a,s,u,l,d,p,c,h;((e,t)=>{if(e.length<3||e.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=ly.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,i=e[0],o=e[2],a=4===e.length?e[3]:void 0;if(o.dims.length!==i.dims.length||!i.dims.map((e,t)=>t===r?Math.ceil(e/n)===o.dims[t]:e===o.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==i.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==o.dims.length||!a.dims.map((e,t)=>e===o.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}})(e.inputs,t),e.compute((r=e.inputs,n=t,i=r[0].dims,o=r[1].dims,a=i.length,s=ly.normalizeAxis(n.gatherAxis,a),u=ly.normalizeAxis(n.quantizeAxis,a),(l=i.slice(0)).splice(s,1,...o),d=ly.size(l),p=r[2].dataType,c=22===r[0].dataType,h=[{type:12,data:d},{type:12,data:u},{type:12,data:s},{type:12,data:n.blockSize},...lZ(...r.map((e,t)=>e.dims),l)],{name:"GatherBlockQuantized",shaderCache:{hint:`${n.cacheKey};${r.filter((e,t)=>1!==t).map(e=>e.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:r.length},(e,t)=>"rank")},getRunData:()=>({outputs:[{dims:l,dataType:p}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:e=>{let t=l3("data",r[0].dataType,r[0].dims.length),n=l3("inputIndices",r[1].dataType,r[1].dims.length),a=l3("scales",r[2].dataType,r[2].dims.length),u=r.length>3?l3("zeroPoint",r[3].dataType,r[3].dims.length):void 0,d=l4("output",p,l.length),h=[t,n,a];return u&&h.push(u),`
        ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...h,d)}
        ${e.mainStart()}
        let output_indices = ${d.offsetToIndices("global_idx")};
        var indices_indices = ${n.type.indices}(0);
        ${o.length>1?`
          for (var i: u32 = 0; i < ${o.length}; i++) {
            let index = ${d.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${n.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${d.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${t.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${d.indicesGet("output_indices","i")};
          ${t.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${n.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${i[s]};
        }
        ${t.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${l.length}; i++) {
          let index = ${d.indicesGet("output_indices",`i + ${o.length} - 1`)};
          ${t.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${t.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${t.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${a.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${a.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${a.getByIndices("scale_indices")};
        ${u?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${u.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${u.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${lX(p)}(quantized_data - zero_point) * scale;
        ${d.setByOffset("global_idx","dequantized_data")};
    }`}}))},cB=e=>lG({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),fO=G(()=>{"use strict";hX(),hQ(),h4(),h6(),cM=e=>lG({axis:e.axis}),cj=(e,t)=>{var r,n;let i,o,a,s,u,l,d,p,c,h,f,m,g;(e=>{if(!e||2!==e.length)throw Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)})(e.inputs),e.compute((r=e.inputs,n=t,i=r[0].dims,o=r[0].dataType,a=i.length,s=r[1].dims,u=r[1].dataType,d=i[l=ly.normalizeAxis(n.axis,a)],p=s.slice(0),c=ly.size(p),h=l3("input",o,a),f=l3("indicesInput",u,s.length),m=l4("output",o,p.length),(g=[{type:12,data:c},{type:6,data:d},{type:12,data:l}]).push(...lZ(i,s,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:g}),getShaderSource:e=>`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,f,m)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${m.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${m.setByOffset("global_idx","value")};
  }`}))}}),fE=G(()=>{"use strict";hX(),hQ(),h6(),cF=e=>({transA:e.transA,transB:e.transB,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${1===e.alpha}`}),cL=(e,t)=>{(e=>{if(!e)throw Error("Input is missing");if(e.length<2||e.length>3)throw Error("Invaid input number.");if(3===e.length&&e[2].dims.length>2)throw Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||3===e.length&&e[0].dataType!==e[2].dataType)throw Error("Input types are mismatched")})(e.inputs),e.compute(((e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[i,o,a]=lv.getShapeOfGemmResult(r,t.transA,n,t.transB,3===e.length?e[2].dims:void 0),s=[i,o];if(!s)throw Error("Can't use gemm on the given tensors");let u=Math.ceil(o/16),l=Math.ceil(i/16),d=(ly.size(s),[{type:12,data:u},{type:12,data:i},{type:12,data:o},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}]),p=["type","type"];return 3===e.length&&(d.push(...lZ(e[2].dims)),p.push("rank")),d.push(...lZ(s)),{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:u*l},programUniforms:d}),getShaderSource:r=>{let n=l3("a",e[0].dataType,e[0].dims),i=l3("b",e[1].dataType,e[1].dims),o=null,a=[n,i];3===e.length&&(o=l3("c",e[2].dataType,e[2].dims.length),a.push(o));let u=l4("output",e[0].dataType,s.length);a.push(u);let l="",d="";t.transA&&t.transB?(d=`
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
  }`}}})(e.inputs,t))}}),fA=G(()=>{"use strict";hX(),hQ(),h4(),h6(),[cV,cU,cq,cG]=[0,1,2,3],cH=`
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
`,cW=(e,t)=>{var r,n;let i,o,a,s,u,l,d;(e=>{if(4!==e[0].dims.length)throw Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw Error("grid batch size must match input batch size")})(e.inputs),e.compute((r=e.inputs,n=t,i=l3("x",r[0].dataType,r[0].dims.length),o=[r[1].dims[0],r[1].dims[1],r[1].dims[2]],a=l3("grid",r[1].dataType,o.length,2),s=[r[0].dims[0],r[0].dims[1],r[1].dims[1],r[1].dims[2]],"NHWC"===n.format&&(s=[r[0].dims[0],r[1].dims[1],r[1].dims[2],r[0].dims[3]],[cV,cU,cq,cG]=[0,3,1,2]),u=l4("output",r[0].dataType,s.length),l=i.type.value,d=[{type:12,data:ly.size(s)},...lZ(r[0].dims,o,s)],{name:"GridSample",shaderCache:{hint:`${n.cacheKey}`,inputDependencies:["type","type"]},getRunData:e=>{let t=ly.size(s);return{outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:d}},getShaderSource:e=>{let t,r,o,s,d,p,c,h,f;return`
  ${e.registerUniform("output_size","u32").declareVariables(i,a,u)}
  ${cH}
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
  ${r=n,`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${0===r.alignCorners?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`}
  ${o=n,`
  ${"reflection"===o.paddingMode?`
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
  ${s=i,d=l,p=n,`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${d} {
     var pixel = ${d}(0);
     var indices = vec4<u32>(0);
     indices[${cV}] = batch;
     indices[${cU}] = channel;`+(()=>{switch(p.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${cq}] = u32(r);
            indices[${cG}] = u32(c);
          } else {
            return ${d}(0);
          }
        `;case"border":return`
          indices[${cq}] = u32(clamp(r, 0, H - 1));
          indices[${cG}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${cq}] = gs_reflect(r, border[1], border[3]);
          indices[${cG}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${p.paddingMode} is not supported`)}})()+`
    return ${s.getByIndices("indices")};
  }
`}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${cq}]);
      let W_in = i32(uniforms.x_shape[${cG}]);

      ${0===n.alignCorners?`
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
      var grid_indices = vec3<u32>(indices[${cV}], indices[${cq}], indices[${cG}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${c=u,h=l,f=n,(()=>{switch(f.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${cV}], indices[${cU}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${cV}], indices[${cU}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${cV}], indices[${cU}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${cV}], indices[${cU}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${cV}], indices[${cU}], border);

          let dx2 = ${h}(f32(x2) - x);
          let dx1 = ${h}(x - f32(x1));
          let dy2 = ${h}(f32(y2) - y);
          let dy1 = ${h}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${h}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${cV}], indices[${cU}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${f.mode} is not supported`)}})()+`${c.setByOffset("global_idx","result")}`}
  }`}}))},cK=e=>lG({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),fP=G(()=>{"use strict";hX(),hQ(),h4(),h2(),fe(),h6(),h5(),cX=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,cZ=e=>lG({...e}),cJ=lG({perm:[0,2,1,3]}),cQ=(e,t,r,n,i,o,a,s)=>{var u,l,d,p,c,h,f;let m,g,b,y=o;if(!(a&&ly.size(a.dims)>0))return 3===o.dims.length&&(y=o.reshape([t,n,r,i])),1===r||1===n?y:e.compute(de(y,cJ.perm),{inputs:[y],outputs:[-1]})[0];if(1===n)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return y=(u=e,l=o,d=a,p=t,c=n,h=r*i,f=s,m=[p,c,h],b=[{type:12,data:g=ly.size(m)},{type:12,data:f},{type:12,data:h}],y=u.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:m,dataType:l.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:b}),getShaderSource:e=>{let t=l4("qkv_with_bias",l.dataType,m),r=l3("qkv",l.dataType,m),n=l3("bias",d.dataType,m);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}]).declareVariables(r,n,t)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[l,d],outputs:[-1]})[0]).reshape([t,n,r,i]),1===r||1===n?y:e.compute(de(y,cJ.perm),{inputs:[y],outputs:[-1]})[0]},cY=(e,t)=>{let r=((e,t)=>{let r,n=e[0],i=cX(e,1),o=cX(e,2),a=cX(e,3),s=cX(e,4),u=cX(e,5),l=cX(e,6),d=cX(e,7);if(3!==n.dims.length&&5!==n.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let p=n.dims[0],c=n.dims[1],h=3===n.dims.length?n.dims[2]:t.numHeads*n.dims[4],f=c,m=0,g=0,b=Math.floor(h/t.numHeads);if(l&&d&&ly.size(l.dims)&&ly.size(d.dims)){if(4!==l.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==p||l.dims[1]!==t.numHeads||l.dims[3]!==b)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==b)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==d.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');m=l.dims[2],g=l.dims[2]}else if(l&&ly.size(l.dims)||d&&ly.size(d.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(i&&ly.size(i.dims)>0){if(3!==n.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==i.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===i.dims.length){if(i.dims[2]!==n.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');r=2,f=i.dims[1]}else if(5===i.dims.length){if(i.dims[2]!==t.numHeads||2!==i.dims[3]||i.dims[4]!==b)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw Error('Expect "value" be none when "key" has packed kv format.');r=5,f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==b)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');r=0,f=i.dims[2]}}else{if(5!==n.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||3!==n.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');r=3}if(a&&ly.size(a.dims)>0){if(1!==a.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(i&&5===i.dims.length&&2===i.dims[3])throw Error("bias is not allowed for packed kv.")}let y=m+f,_=0;if(s&&ly.size(s.dims)>0){_=8;let e=s.dims;throw 1===e.length?e[0]===p?_=1:e[0]===3*p+2&&(_=3):2===e.length&&e[0]===p&&e[1]===y&&(_=5),8===_?Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):Error("Mask not supported")}let v=!1,x=h;if(o&&ly.size(o.dims)>0){if(3!==o.dims.length&&4!==o.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===o.dims.length){if(f!==o.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');x=o.dims[2]}else{if(f!==o.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');x=o.dims[1]*o.dims[3],v=!0}}if(s&&ly.size(s.dims)>0)throw Error("Key padding mask is not supported");if(u&&ly.size(u.dims)>0){if(4!==u.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==y)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:c,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:y,maxSequenceLength:g,inputHiddenSize:0,hiddenSize:h,vHiddenSize:x,headSize:b,vHeadSize:Math.floor(x/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:v,qkvFormat:r}})(e.inputs,t),n=e.inputs[0],i=cX(e.inputs,1),o=cX(e.inputs,2),a=cX(e.inputs,3),s=cX(e.inputs,4),u=cX(e.inputs,5),l=cX(e.inputs,6),d=cX(e.inputs,7);if(5===n.dims.length)throw Error("Packed QKV is not implemented");if(i?.dims.length===5)throw Error("Packed KV is not implemented");let p=i&&o&&4===i.dims.length&&4===o.dims.length,c=cQ(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(p)return dF(e,c,i,o,s,void 0,l,d,u,r);if(!i||!o)throw Error("key and value must be provided");let h=cQ(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,i,a,r.hiddenSize),f=cQ(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,o,a,2*r.hiddenSize);dF(e,c,h,f,s,void 0,l,d,u,r)}}),fk=G(()=>{"use strict";hX(),hQ(),h4(),h6(),c0=(e,t)=>{let r=e[0].dims,n=ly.size(r),i=e[0].dataType,o=ly.normalizeAxis(t.axis,r.length),a=Array(t.numOutputs),s=l3("input",i,r.length),u=Array(t.numOutputs),l=[],d=[],p=0,c=[{type:12,data:n}];for(let n=0;n<t.numOutputs;n++){p+=t.splitSizes[n],u[n]=p;let s=r.slice();s[o]=t.splitSizes[n],d.push(s),a[n]=l4(`output${n}`,i,s.length),l.push({dims:d[n],dataType:e[0].dataType})}return c.push({type:12,data:u},...lZ(r,...d)),{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:e=>{let t;return`
  ${e.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${t=u.length,`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${t}u; i += 1u ) {
    if (index < ${l1("uniforms.size_in_split_axis","i",t)}) {
        return i;
    }
    }
    return ${t}u;
}`}
  ${(e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let i=e[n].setByIndices("indices","input[global_idx]");1===t?r.push(i):0===n?r.push(`if (output_number == ${n}u) { ${i} }`):n===t-1?r.push(`else { ${i} }`):r.push(`else if (output_number == ${n}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`})(a)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",o)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${l1("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${s.indicesSet("indices",o,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`},getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:c})}},c1=(e,t)=>{let r,n;var i,o,a=e.inputs;if(!a||a.length<1)throw Error("too few inputs");let s=1===e.inputs.length?t:(i=e.inputs,r=[],n=(o=t).numOutputs,i[1].dims[0]>0&&(i[1].getBigInt64Array().forEach(e=>r.push(Number(e))),n=r.length),lG({numOutputs:n,axis:o.axis,splitSizes:r}));e.compute(c0(e.inputs,s),{inputs:[0]})},c2=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw Error("numOutputs and splitSizes length must be equal");return lG({axis:t,numOutputs:n,splitSizes:r})}}),fD=G(()=>{"use strict";hX(),hQ(),h4(),h6(),c3=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:i,scale:o}=t,a=e[0].dims[0],s=ly.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],l=s/u,d=e[2].dims[1],p=0===i?2*d:l/n,c=[a,u,l/p,p-d],h=ly.computeStrides(c),f=[{type:1,data:o},{type:12,data:c},{type:12,data:h},...3===e[0].dims.length?Array({type:12,data:[s,l,p,1]}):[],...4===e[0].dims.length?Array({type:12,data:[s,p,u*p,1]}):[],...lZ(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)];return{name:"RotaryEmbedding",shaderCache:{hint:lG({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:t=>{let n=l3("input",e[0].dataType,e[0].dims.length),i=l3("position_ids",e[1].dataType,e[1].dims.length),o=l3("cos_cache",e[2].dataType,e[2].dims.length),a=l3("sin_cache",e[3].dataType,e[3].dims.length),s=l4("output",e[0].dataType,e[0].dims.length);return t.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:c.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${t.declareVariables(n,i,o,a,s)}

        ${t.mainStart(lH)}
          let half_rotary_emb_dim = uniforms.${o.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${i.broadcastedIndicesToOffset("bsnh.xy",l4("",i.type.tensor,2))};
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
        }`},getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(ly.size(c)/lH)},programUniforms:f})}},c4=(e,t)=>{((e,t)=>{let[r,n,i,o]=e,{numHeads:a,rotaryEmbeddingDim:s}=t;if(3!==r.dims.length&&4!==r.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!ly.areEqual(n.dims,[])&&!ly.areEqual(n.dims,[1])&&2!==n.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(2!==i.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(2!==o.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(!ly.areEqual(i.dims,o.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&0===a)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],l=r.dims[r.dims.length-2],d=i.dims[0],p=ly.sizeFromDimension(r.dims,1)/l,c=0===s?2*i.dims[1]:p/a;if(s>c)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===n.dims.length){if(u!==n.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(l!==n.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(l>d)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(c/2!==i.dims[1]&&s/2!==i.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`)})(e.inputs,t),e.compute(c3(e.inputs,t))}}),fN=G(()=>{"use strict";h4(),hX(),fe(),fP(),fk(),h5(),fD(),h6(),c6=lG({perm:[0,2,1,3]}),c5=(e,t,r)=>{let n=t,i=r.kvNumHeads;return 3===t.dims.length&&0!==r.kvSequenceLength&&(n=t.reshape([r.batchSize,r.kvSequenceLength,i,r.headSize]),n=e.compute(de(n,c6.perm),{inputs:[n],outputs:[-1]})[0]),n},c8=(e,t)=>{if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let r=((e,t)=>{if(t.doRotary&&e.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],i=e[2],o=e[3],a=e[4];if(0!==t.doRotary&&e.length<=7)throw Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(-1!==t.localWindowSize)throw Error("Local attention is not supported");if(0!==t.softcap)throw Error("Softcap is not supported");if(0!==t.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==r.dims.length&&5!==r.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let s=r.dims[0],u=r.dims[1],l=3===r.dims.length?r.dims[2]:t.numHeads*r.dims[4],d=u,p=0,c=!n||0===n.dims.length,h=Math.floor(c?l/(t.numHeads+2*t.kvNumHeads):l/t.numHeads);c&&(l=h*t.numHeads);let f=o&&0!==o.dims.length,m=a&&0!==a.dims.length;if(f&&4===o.dims.length&&o.dims[0]===s&&o.dims[1]!==t.kvNumHeads&&o.dims[2]===t.kvNumHeads&&o.dims[3]===h)throw Error("BSNH pastKey/pastValue is not supported");if(f&&m){if(4!==o.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==a.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');p=o.dims[2]}else if(f||m)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let g=1;if(n&&n.dims.length>0){if(3!==r.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===n.dims.length){if(r.dims[2]%n.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');d=n.dims[1]}else if(5===n.dims.length){if(n.dims[2]!==t.numHeads||2!==n.dims[3]||n.dims[4]!==h)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw Error('Expect "value" be none when "key" has packed kv format.');d=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==h)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');d=n.dims[2]}}else{if(3!==r.dims.length&&5!==r.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===r.dims.length&&(r.dims[2]!==t.numHeads||3!==r.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let b=!1,y=t.kvNumHeads?h*t.kvNumHeads:l;if(i&&i.dims.length>0){if(3!==i.dims.length&&4!==i.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===i.dims.length){if(d!==i.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');y=i.dims[2]}else{if(d!==i.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');y=i.dims[1]*i.dims[3],b=!0}}let _=e.length>4?e[5]:void 0;if(_){if(0===_.dims.length)throw Error("seqlens_k must be at least 1D, got scalar.");let e=_.dims.reduce((e,t)=>e*t,1);if(e!==s)throw Error(`seqlens_k must have batch_size (${s}) elements, got ${e}.`);for(let e=0;e<_.dims.length;e++)if(1!==_.dims[e]&&_.dims[e]!==s)throw Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${s}), got dims[${e}] = ${_.dims[e]}.`)}return{batchSize:s,sequenceLength:u,pastSequenceLength:p,kvSequenceLength:d,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:l,vHiddenSize:y,headSize:h,vHeadSize:Math.floor(y/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:b,qkvFormat:g}})(e.inputs,t);if(5===e.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let n=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,o=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&0!==e.inputs[3].dims.length?e.inputs[3]:void 0,s=e.inputs[4]&&0!==e.inputs[4].dims.length?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,d=r.kvNumHeads?r.kvNumHeads:r.numHeads,p=lG({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,d*r.headSize,d*r.headSize]}),[c,h,f]=i||o?[n,i,o]:e.compute(c0([n],p),{inputs:[n],outputs:[-1,-1,-1]}),m,g;if(t.doRotary){var b,y,_,v;let n,i,o,a=e.compute((b=r.batchSize,y=r.sequenceLength,_=u,v=l,n=[b*y],o=[{type:12,data:i=b*y},{type:12,data:y},{type:12,data:b}],{name:"GeneratePositionIds",shaderCache:{hint:`${b};${y}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:7}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:o}),getShaderSource:e=>{let t=l3("seq_lens",_.dataType,_.dims),r=l3("total_seq_lens",v.dataType,v.dims),i=l4("pos_ids",7,n);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}]).declareVariables(t,r,i)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${r.getByOffset("0")});
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
      ${i.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${i.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${i.setByOffset("global_idx","seqlen")}
    };
  }
  `}}),{inputs:[u,l],outputs:[-1]})[0],s=e.inputs[7],d=e.inputs[8],p=lG({interleaved:0!==t.rotaryInterleaved,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),f=[c,a,s,d],x=[-1];m=e.compute(c3(f,p),{inputs:f,outputs:x})[0],f.splice(0,1,h);let w=lG({interleaved:0!==t.rotaryInterleaved,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});g=e.compute(c3(f,w),{inputs:f,outputs:x})[0]}let x=cQ(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?m:c,void 0,0),w=c5(e,t.doRotary?g:h,r),$=c5(e,f,r);dF(e,x,w,$,void 0,void 0,a,s,void 0,r,u,l)}}),fC=G(()=>{"use strict";hX(),hQ(),h5(),h6(),c7=(e,t,r,n,i,o,a,s)=>{let u=lJ(o),l=1===u?"f32":`vec${u}f`,d=1===u?"vec2f":`mat2x${u}f`,p=i*a,c=64;1===p&&(c=256);let h=[i,a,o/u],f=[i,a,2],m=[];return m.push(...lZ(h,f)),e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${c}`,inputDependencies:["rank","type","type"]},getRunData:()=>({outputs:[{dims:f,dataType:1}],dispatchGroup:{x:p},programUniforms:m}),getShaderSource:e=>{let i=l3("x",t.dataType,3,u),o=[i,l3("scale",r.dataType,r.dims),l3("bias",n.dataType,n.dims),l4("output",1,3,2)];return`
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
      let sum_final = ${l0("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${l0("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[t,r,n],outputs:[-1]})[0]},c9=(e,t)=>{var r,n,i;let o,a,s,u,l,d,p,c,h;"NHWC"===t.format?((e,t,r)=>{let n=t[0].dims,i=n[0],o=n[n.length-1],a=ly.sizeFromDimension(n,1)/o,s=lJ(o),u=ly.size(n)/s,l=[{type:12,data:a},{type:12,data:Math.floor(o/s)}],d=!1,p=[0,n.length-1];for(let e=0;e<n.length-2;e++)d=d||1!==n[e+1],p.push(e+1);let c=(d=d&&1!==n[n.length-1])?e.compute(de(e.inputs[0],p),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},(e,t)=>n[p[t]])),h=c7(e,c,t[1],t[2],i,a,o,r.epsilon);e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${s}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:e=>{let r=lK(t[0].dataType),i=1===s?"vec2f":`mat${s}x2f`,o=e=>{let t=0===e?"x":"y",n=1===s?"f32":`vec${s}f`;switch(s){case 1:return`${r}(${n}(scale.${t}))`;case 2:return`vec2<${r}>(${n}(scale[0].${t}, scale[1].${t}))`;case 4:return`vec4<${r}>(${n}(scale[0].${t}, scale[1].${t}, scale[2].${t}, scale[3].${t}))`;default:throw Error(`Not supported compoents ${s}`)}},a=l3("input",t[0].dataType,t[0].dims,s),u=l4("output",t[0].dataType,n,s);return`
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
  }`}},{inputs:[t[0],h]})})(e,e.inputs,t):(r=e,n=e.inputs,i=t,a=(o=n[0].dims)[0],s=o[1],u=ly.sizeFromDimension(o,2),l=lJ(u),d=ly.size(o)/l,p=c7(r,n[0],n[1],n[2],a,u,s,i.epsilon),c=[a,s,u/l],h=[a,s],r.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:["type","none"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...lZ(c,h,c)]}),getShaderSource:e=>{let t=l3("x",n[0].dataType,c.length,l),r=l3("scale_shift",1,h.length,2),i=l4("output",n[0].dataType,c.length,l),o=[t,r,i];return`
  ${e.registerUniform("output_size","u32").declareVariables(...o)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${i.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${r.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${t.getByOffset("global_idx")} * ${i.type.value}(scale_shift.x) + ${i.type.value}(scale_shift.y);
      ${i.setByOffset("global_idx","value")};
  }`}},{inputs:[n[0],p]}))}}),fz=G(()=>{"use strict";hX(),hQ(),h6(),he=(e,t)=>{(e=>{if(!e||e.length<2)throw Error("layerNorm requires at least 2 inputs.")})(e.inputs),e.compute(((e,t,r)=>{let n=t.simplified,i=e[0].dims,o=e[1],a=!n&&e[2],s=ly.normalizeAxis(t.axis,i.length),u=ly.sizeToDimension(i,s),l=ly.sizeFromDimension(i,s),d=ly.size(o.dims),p=a?ly.size(a.dims):0;if(d!==l||a&&p!==l)throw Error(`Size of X.shape()[axis:] == ${l}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${d} and bias size of ${p}`);let c=[];for(let e=0;e<i.length;++e)e<s?c.push(i[e]):c.push(1);let h=lJ(l),f=["type","type"],m=[{type:12,data:u},{type:1,data:l},{type:12,data:Math.floor(l/h)},{type:1,data:t.epsilon}];a&&f.push("type");let g=r>1,b=r>2,y=[{dims:i,dataType:e[0].dataType}];return g&&y.push({dims:c,dataType:1}),b&&y.push({dims:c,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${h};${r};${n}`,inputDependencies:f},getRunData:()=>({outputs:y,dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:t=>{let r=lK(e[0].dataType),s=[l3("x",e[0].dataType,e[0].dims,h),l3("scale",o.dataType,o.dims,h)];return a&&s.push(l3("bias",a.dataType,a.dims,h)),s.push(l4("output",e[0].dataType,i,h)),g&&s.push(l4("mean_data_output",1,c)),b&&s.push(l4("inv_std_output",1,c)),`
  ${t.registerUniforms([{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...s)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${lQ("f32",h)};
    var mean_square_vector = ${lQ("f32",h)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${lY(r,h,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${l0("mean_vector",h)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${l0("mean_square_vector",h)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${lY(r,h,"x[j + offset]")};
      let f32scale = ${lY(r,h,"scale[j]")};
      output[j + offset] = ${s[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${lY(r,h,"bias[j]")}`:""}
      );
    }

    ${g?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`}}})(e.inputs,t,e.outputCount))}}),fR=G(()=>{"use strict";hQ(),fd(),fp(),ht=e=>{var t=e.inputs;if(!t||2!==t.length)throw Error("MatMul requires 2 inputs.");if(t[0].dims[t[0].dims.length-1]!==t[1].dims[t[1].dims.length-2])throw Error("shared dimension does not match.");let r=lb.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!r)throw Error("Can't use matmul on the given tensors");let n=r[r.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&i<8)e.compute(pH(e.inputs,{activation:""},r));else{let t=r[r.length-2],o=ly.size(e.inputs[0].dims.slice(0,-2)),a=ly.size(e.inputs[1].dims.slice(0,-2));if(1!==o&&1===t&&1===a){let t=e.inputs[0].reshape([1,o,i]),a=e.inputs[1].reshape([1,i,n]),s=[1,o,n],u=[t,a];e.compute(pZ(u,{activation:""},r,s),{inputs:u})}else e.compute(pZ(e.inputs,{activation:""},r))}}}),fB=G(()=>{"use strict";hX(),hQ(),h4(),h6(),hr=(e,t)=>{var r,n,i,o;let a,s,u,l,d,p,c,h,f,m,g,b,y,_,v,x,w,$,T,I,S,O,E,A,P,k,D,N,C,z,R,B,M,j,F,L,V,U,q,G,H,W;((e,t)=>{if(e.length<3||e.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),o=t.blockSize/8*t.bits,a=e[1];if(!ly.areEqual(a.dims,[t.n,i,o]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let s=e[2].dims;if(ly.size(s)!==t.n*i)throw Error("scales input size error.");if(4===e.length){let r=e[3].dims,n=t.n*(8===t.bits?i:Math.floor((i*t.bits+7)/8));if(ly.size(r)!==n)throw Error("zeroPoints input size error.")}})(e.inputs,t),32===t.blockSize&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute((r=e.inputs,n=t,s=(a=r[0].dims).length,u=a[s-2],l=n.k,d=n.n,p=a.slice(0,s-2),c=ly.size(p),h=r[1].dims[2]/4,f=r[0].dataType,m=lJ(n.k),g=lJ(h),b=p.concat([u,d]),_=128/(y=d%8==0?8:d%4==0?4:1),w=(x=_*g*(v=Math.floor(32/n.bits)))/m,$=x/n.blockSize,T=ly.size(b)/y,I=[],S=[c,u,l/m],(O=ly.convertShape(r[1].dims).slice()).splice(-1,1,h/g),I.push(...lZ(S)),I.push(...lZ(O)),I.push(...lZ(r[2].dims)),4===r.length&&I.push(...lZ(ly.convertShape(r[3].dims))),E=[c,u,d],I.push(...lZ(E)),{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${n.blockSize};${m};${g};${_};${y}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:f}],dispatchGroup:{x:T},programUniforms:I}),getShaderSource:e=>{let t=S.length,i=l3("a",r[0].dataType,t,m),o=l3("b",12,O.length,g),a=l3("scales",r[2].dataType,r[2].dims.length),s=[i,o,a],u=4===r.length?l3("zero_points",12,r[3].dims.length):void 0;u&&s.push(u);let l=E.length,d=l4("output",r[0].dataType,l),p=lK(r[0].dataType),c=()=>{switch(m){case 1:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${m}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${i.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${d.type.value}, ${_}>, ${y}>;
        ${e.declareVariables(...s,d)}
        ${e.mainStart([_,y,1])}
          let output_indices = ${d.offsetToIndices(`workgroup_index * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${$} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += 128)
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
            let block = tile * ${$} + local_id.x;
            ${u?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/n.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${n.bits}u);
            let zero_point_word = ${u.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${p}((zero_point_word) & ${2===n.bits?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,n.bits-1)} for unsigned ${n.bits}-bit quantization.
            let zero_point = ${p}(${Math.pow(2,n.bits-1).toFixed(1)});`}
            let scale = ${a.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${o.getByIndices(`${o.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${n.blockSize/m};
            for (var i: u32 = 0; i < ${g}; i++) {
              let b_value = ${1===g?"b_data":"b_data[i]"};
              ${(()=>{let e=Math.floor(v/8),t="";for(let r=0;r<e;r++){let e=r*n.bits*4,i=e+n.bits;t+=`
              ${c()}
              {${2===n.bits?`
                let half_word = b_value >> ${16*r}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${e}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${i}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${p}>(${Array.from({length:4},(e,t)=>`${p}(b_value_lower[${t}]), ${p}(b_value_upper[${t}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${p}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(e,t)=>`dot(a_data${t}, b_dequantized_values[${t}])`).join(" + ")};
              }
              word_offset += ${8/m};`}return t})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${y}) {
            var output_value: ${d.type.value} = ${d.type.value}(0);
            for (var b = 0u; b < ${_}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${d.setByIndices(`${d.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`}})):e.compute((i=e.inputs,o=t,P=(A=i[0].dims).length,k=A[P-2],D=o.k,N=o.n,C=A.slice(0,P-2),z=ly.size(C),R=i[1].dims[2]/4,B=i[0].dataType,M=lJ(o.k),j=lJ(R),F=lJ(N),L=C.concat([k,N]),V=k>1&&N/F%2==0?2:1,U=ly.size(L)/F/V,q=[],G=[z,k,D/M],(H=ly.convertShape(i[1].dims).slice()).splice(-1,1,R/j),q.push(...lZ(G)),q.push(...lZ(H)),q.push(...lZ(i[2].dims)),4===i.length&&q.push(...lZ(ly.convertShape(i[3].dims))),W=[z,k,N/F],q.push(...lZ(W)),{name:"MatMulNBits",shaderCache:{hint:`${o.blockSize};${o.bits};${M};${j};${F};${V};64`,inputDependencies:Array(i.length).fill("rank")},getRunData:()=>({outputs:[{dims:L,dataType:B}],dispatchGroup:{x:U},programUniforms:q}),getShaderSource:e=>{let t=G.length,r=l3("a",i[0].dataType,t,M),n=l3("b",12,H.length,j),a=l3("scales",i[2].dataType,i[2].dims.length),s=[r,n,a],u=4===i.length?l3("zero_points",12,i[3].dims.length):void 0;u&&s.push(u);let l=W.length,d=l4("output",i[0].dataType,l,F),p=lK(i[0].dataType),c=(()=>{switch(M){case 1:return`array<${p}, 8>`;case 2:return`mat4x2<${p}>`;case 4:return`mat2x4<${p}>`;default:throw Error(`${M}-component is not supported.`)}})(),h=Math.floor(32/o.bits),f=Math.floor(h/8);return`
        var<workgroup> workgroup_shared: array<${d.type.value}, ${64*V}>;
        ${e.declareVariables(...s,d)}
        ${e.mainStart([64,1,1])}
          let output_indices = ${d.offsetToIndices(`(global_idx / 64) * ${V}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${o.blockSize/M};
            ${(()=>{let e=`
            var col_index = col * ${F};
            ${u?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/o.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,o.bits-1)} for unsigned ${o.bits}-bit quantization.
            let zero_point = ${p}(${Math.pow(2,o.bits-1).toFixed(1)});`}
            `;for(let t=0;t<F*V;t++)e+=`
            let scale${t} = ${a.getByOffset("col_index * nBlocksPerCol + block")};
            ${u?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${o.bits}u);
            zero_point_word = ${u.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${t} = ${p}((zero_point_word) & ${2===o.bits?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return e})()}
            for (var word: u32 = 0; word < ${R}; word += ${j}) {
              ${(()=>{let e=`col_index = col * ${F};`;for(let t=0;t<F*V;t++)e+=`
            let b${t}_data = ${n.getByIndices(`${n.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return e+`
            var b_value: u32;
            let b_mask: u32 = ${2===o.bits?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${c};
            var b_dequantized_values: ${c};`})()}
              for (var i: u32 = 0; i < ${j}; i++) {
                ${(()=>{let e="";for(let t=0;t<f;t++){let n=t*o.bits*4,i=n+o.bits;e+=`
          // reuse a data (pass ${t})
            var input_offset${t>0?t:""} = ${0===t?r.indicesToOffset(`${r.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${t>0?t:""}: ${c};
            for (var j${t>0?t:""}: u32 = 0; j${t>0?t:""} < ${8/M}; j${t>0?t:""}++) {
              a_data${t>0?t:""}[j${t>0?t:""}] = ${r.getByOffset(`input_offset${t>0?t:""}`)};
              input_offset${t>0?t:""}++;
            }
          `;for(let r=0;r<F*V;r++)e+=`
            b_value = ${1===j?`b${r}_data`:`b${r}_data[i]`};
            ${2===o.bits?`{
              let half_word = b_value >> ${16*t}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${n}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${i}u) & b_mask);`}
            b_quantized_values = ${c}(${Array.from({length:4},(e,t)=>`${p}(b_value_lower[${t}]), ${p}(b_value_upper[${t}])`).join(", ")});
            b_dequantized_values = ${1===M?`${c}(${Array.from({length:8},(e,t)=>`(b_quantized_values[${t}] - ${u?`zero_point${r}`:"zero_point"}) * scale${r}`).join(", ")});`:`(b_quantized_values - ${c}(${Array(8).fill(`${u?`zero_point${r}`:"zero_point"}`).join(",")})) * scale${r};`};
            workgroup_shared[local_id.x * ${V} + ${Math.floor(r/F)}]${F>1?`[${r%F}]`:""} += ${Array.from({length:8/M},(e,r)=>`${1===M?`a_data${t>0?t:""}[${r}] * b_dequantized_values[${r}]`:`dot(a_data${t>0?t:""}[${r}], b_dequantized_values[${r}])`}`).join(" + ")};
          `}return e})()}
                word_offset += ${h/M};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${V}) {
            var output_value: ${d.type.value} = ${d.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${V};
            }
            ${d.setByIndices(`${d.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`}}))},hn=e=>lG(e)}),fM=G(()=>{"use strict";hX(),hQ(),h6(),hi=(e,t)=>{let r,n,i,o;var a,s,u=e.inputs;if(!u||u.length<1)throw Error("Too few inputs");if(1!==u[0].dataType&&10!==u[0].dataType)throw Error("Input type must be float or float16.");if(u.length>=2){let e=2*u[0].dims.length===u[1].dims[0];if(4===u.length&&(e=2*u[3].dims[0]===u[1].dims[0]),!e)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}let l=((e,t)=>{if(!(e.length>1))return t;{let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?10===e[2].dataType?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,o=new Int32Array(2*i).fill(0);if(e.length>=4){let t=e[3].getBigInt64Array();for(let e=0;e<t.length;e++)o[Number(t[e])]=Number(r[e]),o[Number(t[e])+i]=Number(r[e+t.length])}else r.forEach((e,t)=>o[Number(t)]=Number(e));let a=[];return o.forEach(e=>a.push(e)),{mode:t.mode,value:n,pads:a}}})(e.inputs,t);e.compute((a=e.inputs,s=l,r=ly.padShape(a[0].dims.slice(),s.pads),n=a[0].dims,i=[{type:12,data:ly.size(r)},{type:6,data:s.pads}],o=a.length>=3&&a[2].data,0===s.mode&&i.push({type:o?a[2].dataType:1,data:s.value}),i.push(...lZ(a[0].dims,r)),{name:"Pad",shaderCache:{hint:`${s.mode}${o}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:r,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(ly.size(r)/64)},programUniforms:i}),getShaderSource:e=>{let t=l4("output",a[0].dataType,r.length),i=l3("x",a[0].dataType,n.length),u=i.type.value,l=((e,t,r)=>{switch(r.mode){case 0:var n=e,i=t,o=r.pads.length;let a="";for(let e=i-1;e>=0;--e)a+=`
            k = i32(${n.indicesGet("indices",e)}) - ${l1("uniforms.pads",e,o)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${l1("uniforms.x_shape",e,i)})) {
              break;
            }
            offset += k * i32(${l1("uniforms.x_strides",e,i)});
        `;return`
          value = ${n.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${a}
            value = x[offset];
          }
      `;case 1:var s=e,u=t,l=r.pads.length;let d="";for(let e=u-1;e>=0;--e)d+=`
                k = i32(${s.indicesGet("indices",e)}) - ${l1("uniforms.pads",e,l)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${l1("uniforms.x_shape",e,u)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${l1("uniforms.x_shape",e,u)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${l1("uniforms.x_strides",e,u)});
            `;return`
              var offset = 0;
              var k = 0;
              ${d}
              value = x[offset];
          `;case 2:var p=e,c=t,h=r.pads.length;let f="";for(let e=c-1;e>=0;--e)f+=`
                k = i32(${p.indicesGet("indices",e)}) - ${l1("uniforms.pads",e,h)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${l1("uniforms.x_shape",e,c)})) {
                  k = i32(${l1("uniforms.x_shape",e,c)}) - 1;
                }
                offset += k * i32(${l1("uniforms.x_strides",e,c)});
            `;return`
              var offset = 0;
              var k = 0;
              ${f}
              value = x[offset];
          `;case 3:var m=e,g=t,b=r.pads.length;let y="";for(let e=g-1;e>=0;--e)y+=`
                k = i32(${m.indicesGet("indices",e)}) - ${l1("uniforms.pads",e,b)};
                if (k < 0)  {
                  k += i32(${l1("uniforms.x_shape",e,g)}]);
                }
                if (k >= i32(${l1("uniforms.x_shape",e,g)})) {
                  k -= i32(${l1("uniforms.x_shape",e,g)});
                }
                offset += k * i32(${l1("uniforms.x_strides",e,g)});
            `;return`
              var offset = 0;
              var k = 0;
              ${y}
              value = x[offset];
          `;default:throw Error("Invalid mode")}})(t,n.length,s),d=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:s.pads.length}];return 0===s.mode&&d.push({name:"constant_value",type:o?u:"f32"}),`
            ${e.registerUniforms(d).declareVariables(i,t)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${t.offsetToIndices("global_idx")};

            var value = ${u}(0);
            ${l}
            output[global_idx] = value;
        }`}}),{inputs:[0]})}}),fj=G(()=>{"use strict";ey(),hX(),hQ(),h6(),ho=e=>{if(b.webgpu.validateInputContent&&(!e||1!==e.length))throw Error("Pool ops requires 1 input.")},ha=(e,t,r)=>{let n="NHWC"===t.format,i=e.dims.slice();n&&i.splice(1,0,i.pop());let o=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),s=t.strides.slice(),u=o?t.dilations.slice():[],l=t.pads.slice();l_.adjustPoolAttributes(r,i,a,s,u,l);let d=l_.computePoolOutputShape(r,i,s,u,a,l,t.autoPad,t.ceilMode),p=Object.assign({},t);o?Object.assign(p,{kernelShape:a,strides:s,pads:l,dilations:u,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:a,strides:s,pads:l,cacheKey:t.cacheKey});let c=d.slice();return c.push(c.splice(1,1)[0]),[p,n?c:d]},hs=(e,t)=>{let r="NHWC"===t.format,n=[{type:12,data:ly.size(e)},{type:12,data:ly.size(t.kernelShape)}],i=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let e=t.kernelShape[t.kernelShape.length-1],r=t.strides[t.strides.length-1],o=t.pads[t.pads.length/2-1],a=t.pads[t.pads.length-1],s=!!(o+a);n.push({type:12,data:e},{type:12,data:r},{type:12,data:o},{type:12,data:a}),i.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let u=!1;if(2===t.kernelShape.length){let e=t.kernelShape[t.kernelShape.length-2],r=t.strides[t.strides.length-2],o=t.pads[t.pads.length/2-2],a=t.pads[t.pads.length-2];u=!!(o+a),n.push({type:12,data:e},{type:12,data:r},{type:12,data:o},{type:12,data:a}),i.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,i,!0,s,u]}{if(r)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let e=ly.computeStrides(t.kernelShape);return n.push({type:12,data:e},{type:12,data:t.pads},{type:12,data:t.strides}),i.push({name:"kernelStrides",type:"u32",length:e.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length}),[n,i,!!t.pads.reduce((e,t)=>e+t),!1,!1]}},hu=(e,t,r,n,i,o,a,s,u,l,d,p)=>{let c="NHWC"===i.format,h=t.type.value,f=l4("output",t.type.tensor,n);if(i.kernelShape.length<=2){let n="",l="",m="",g=r-(c?2:1);if(n=d?`
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
                  offsets[j] = offset / ${l1("uniforms.kernelStrides","j",n)};
                  offset -= offsets[j] * ${l1("uniforms.kernelStrides","j",n)};
                }
                offsets[${n-1}] = offset;

                isPad = false;
                for (var j = ${r-n}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${l1("uniforms.strides",`j - ${r-n}u`,n)}
                    + offsets[j - ${r-n}u] - ${l1("uniforms.pads","j - 2u",d)};
                  ${p}
              }
              ${a}

              output[global_idx] = value;
            }`}},hl=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,hd=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),hp=(e,t,r,n)=>{let[i,o]=ha(t,n,r),a=l3("x",t.dataType,t.dims.length),s=a.type.value,u="";i.countIncludePad?u+=`value /= ${s}(uniforms.kernelSize);`:u+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[l,d,p,c,h]=hs(o,i);return l.push(...lZ(t.dims,o)),{name:e,shaderCache:{hint:`${n.cacheKey};${p};${c};${h}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(ly.size(o)/64)},programUniforms:l}),getShaderSource:e=>hu(e,a,t.dims.length,o.length,i,"value += x_val;",u,0,d,p,c,h)}},hc=e=>{let t,r=0!==e.count_include_pad,n=hd(e);if(0!==n.ceilMode)throw Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let i={countIncludePad:r,...n,cacheKey:""};return{...i,cacheKey:(t=i,`${hl(t)};${t.countIncludePad}`)}},hh=(e,t)=>{ho(e.inputs),e.compute(hp("AveragePool",e.inputs[0],!1,t))},hf={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},hm=e=>{let t=e.format;return{format:t,...hf,cacheKey:t}},hg=(e,t)=>{ho(e.inputs),e.compute(hp("GlobalAveragePool",e.inputs[0],!0,t))},hb=(e,t,r,n)=>{let[i,o]=ha(t,n,r),a=`
      value = max(x_val, value);
    `,s=l3("x",t.dataType,t.dims.length),[u,l,d,p,c]=hs(o,i);return u.push(...lZ(t.dims,o)),{name:e,shaderCache:{hint:`${n.cacheKey};${d};${p};${c}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(ly.size(o)/64)},programUniforms:u}),getShaderSource:e=>hu(e,s,t.dims.length,o.length,i,a,"",10===t.dataType?-65504:-1e5,l,d,p,c)}},hy=(e,t)=>{ho(e.inputs),e.compute(hb("MaxPool",e.inputs[0],!1,t))},h_=e=>{let t,r=e.storage_order,n=e.dilations,i=hd(e);if(0!==r)throw Error("column major storage order is not yet supported for MaxPool");if(0!==i.ceilMode)throw Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let o={storageOrder:r,dilations:n,...i,cacheKey:""};return{...o,cacheKey:(t=o,`${hl(t)};${t.storageOrder};${t.dilations}`)}},hv=e=>{let t=e.format;return{format:t,...hf,cacheKey:t}},hx=(e,t)=>{ho(e.inputs),e.compute(hb("GlobalMaxPool",e.inputs[0],!0,t))}}),fF=G(()=>{"use strict";hX(),hQ(),h4(),h6(),hw=(e,t)=>{var r,n;let i,o,a,s,u,l,d,p,c,h,f,m,g,b,y,_,v,x,w,$,T,I,S;((e,t)=>{if(e.length<2||e.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===e.length&&e[1].dims===e[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===e.length&&e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(0!==e[1].dims.length&&1!==e[1].dims.length&&e[1].dims.length!==e[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((t,r)=>t===e[2].dims[r]).reduce((e,t)=>e&&t,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(0===e[1].dims.length||1===e[1].dims.length&&1===e[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((r,n)=>n===t.axis||r===e[0].dims[n]).reduce((e,t)=>e&&t,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}})(e.inputs,t),e.compute((r=e.inputs,n=t,i=ly.normalizeAxis(n.axis,r[0].dims.length),a=3===(o=r[0].dataType),s=r[0].dims,u=r[1].dataType,l=ly.size(s),p=(d=3===o||2===o)?[Math.ceil(ly.size(r[0].dims)/4)]:r[0].dims,c=r[1].dims,f=(h=r.length>2?r[2]:void 0)?d?[Math.ceil(ly.size(h.dims)/4)]:h.dims:void 0,g=!1==(m=0===c.length||1===c.length&&1===c[0])&&1===c.length,b=lJ(l),_=(y=m&&(!d||4===b))?b:1,v=l3("input",d?12:o,p.length,y&&!d?b:1),x=l3("scale",u,c.length),w=h?l3("zero_point",d?12:o,f.length):void 0,$=l4("output",u,s.length,_),T=[v,x],w&&T.push(w),I=[p,c],h&&I.push(f),S=[{type:12,data:l/_},{type:12,data:i},{type:12,data:n.blockSize},...lZ(...I,s)],{name:"DequantizeLinear",shaderCache:{hint:n.cacheKey,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getShaderSource:e=>`
      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...T,$)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${$.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${v.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===_?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${v.getByOffset("global_idx")};`};

          // Set scale input
          ${m?`let scale_value= ${x.getByOffset("0")}`:g?`
            let scale_index = ${$.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${x.getByOffset("scale_index")};`:`
            var scale_indices: ${x.type.indices} = output_indices;
            let index = ${x.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${x.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${x.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${w?m?d?`
                let zero_point_input = ${w.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${w.getByOffset("0")}`:g?d?`
                let zero_point_index = ${$.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${w.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${$.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${w.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${x.indicesToOffset("scale_indices")};
                let zero_point_input = ${w.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${w.getByIndices("scale_indices")};`:`let zero_point_value = ${d?a?"i32":"u32":v.type.value}(0);`};
      // Compute and write output
      ${$.setByOffset("global_idx",`${$.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:s,dataType:u}],dispatchGroup:{x:Math.ceil(l/_/64),y:1,z:1},programUniforms:S})}))},h$=e=>lG({axis:e.axis,blockSize:e.blockSize})}),fL=G(()=>{"use strict";ey(),hX(),h6(),hT=e=>{var t,r,n,i;let o,a,s,u=0,l=0,d=0;6===e.inputs[0].dataType?(u=e.inputs[0].getInt32Array()[0],l=e.inputs[1].getInt32Array()[0],d=e.inputs[2].getInt32Array()[0]):1===e.inputs[0].dataType&&(u=e.inputs[0].getFloat32Array()[0],l=e.inputs[1].getFloat32Array()[0],d=e.inputs[2].getFloat32Array()[0]),b.webgpu.validateInputContent&&((e,t,r)=>{if(e===t||e<t&&r<0||e>t&&r>0)throw Error("Range these inputs' contents are invalid.")})(u,l,d),e.compute((t=u,r=l,n=d,i=e.inputs[0].dataType,a=[o=Math.abs(Math.ceil((r-t)/n))],s=[{type:12,data:o},{type:i,data:t},{type:i,data:n},...lZ(a)],{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:e=>{let t=l4("output",i,a.length),r=t.type.value;return`
        ${e.registerUniforms([{name:"outputSize",type:"u32"},{name:"start",type:r},{name:"delta",type:r}]).declareVariables(t)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${r}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s})}),{inputs:[]})}}),fV=G(()=>{"use strict";hX(),hQ(),h4(),h6(),hI=e=>lG({reduction:e.reduction}),hS=(e,t)=>{var r,n;let i,o,a,s,u,l;e.compute((r=e.inputs,n=t,i=r[0].dims,o=r[1].dims,a=Math.ceil(ly.sizeToDimension(o,o.length-1)/1),s=o[o.length-1],u=ly.sizeFromDimension(i,s),l=[{type:12,data:a},{type:12,data:s},{type:12,data:u},...lZ(r[1].dims,r[2].dims,i)],{name:"ScatterND",shaderCache:{hint:`${n.cacheKey}_${n.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:e=>{let t=l3("indices",r[1].dataType,r[1].dims.length),o=l3("updates",r[2].dataType,r[2].dims.length,1),a="none"!==n.reduction&&""!==n.reduction?l6("output",r[0].dataType,i.length):l4("output",r[0].dataType,i.length,1);return`
      ${e.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(t,o,a)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${1===r[0].dims.length?`
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
    ${((e,t,r,n)=>{if("none"!==e&&"i32"!==n&&"u32"!==n&&"f32"!==n)throw Error(`Input ${n} is not supported with reduction ${e}.`);let i=`{
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
                ${i}max(bitcast<f32>(oldValue), (${r}))${o}`;case"min":return"i32"===n||"u32"===n?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${i}min(bitcast<${n}>(oldValue), (${r}))${o}`;case"mul":return`${i}(bitcast<${n}>(oldValue) * (${r}))${o}`;default:throw Error(`Reduction ${e} is not supported.`)}})(n.reduction,"output[data_offset + i]","value",a.type.value)}
  }

      }`}}),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),fU=G(()=>{"use strict";hX(),hQ(),h4(),h6(),hO=(e,t,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,hE=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",hA=(e,t)=>{var r,n,i,o,a,s,u,l,d,p,c,h;let f,m,g,b,y,_,v,x,w,$,T,I,S,O,E,A,P=[],k=[],D=[],N=new Uint32Array((f=e.customDataBuffer).buffer,f.byteOffset,1)[0];if(0!==t.antialias)throw Error("Only default value (0) for Antialias attribute is supported");((e,t,r,n,i,o)=>{let[a,s,u]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(e=>o.push(e));else if("tf_crop_and_resize"===t.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&e.length>s&&1===e[s].dims.length&&e[s].dims[0]>0){var d,p,c;let i;if(e[s].getFloat32Array().forEach(e=>n.push(e)),0!==n.length&&n.length!==l&&r>=18&&n.length!==t.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");((e,t)=>{if(e.every(e=>e>0||(()=>{throw Error("Resize requires scales input values to be positive")})),e.length>0){if("linear"===t.mode){if(2!==e.length&&3!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3])&&(5!==e.length||1!==e[0]||1!==e[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===t.mode&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}})(n,t),t.axes.length>0&&(d=n,p=t.axes,c=l,p.every(e=>e>=0&&e<c||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")})),i=Array(c).fill(1),p.forEach((e,t)=>i[e]=d[t]),i).forEach((e,t)=>n[t]=e)}if(u>0&&e.length>u&&1===e[u].dims.length&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(e=>i.push(Number(e))),0!==i.length&&i.length!==l&&r>=18&&i.length!==t.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(0!==n.length&&n.length!==t.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==i.length&&i.length!==t.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if("u">typeof n&&"u">typeof i&&n.length>0&&i.length>l)throw Error("Resize requires only of scales or sizes to be specified")})(e.inputs,t,N,P,k,D),e.compute((r=e.inputs[0],n=t,i=N,o=P,a=k,s=D,b=r.dims,y=(u=s,l=n.axes,m=Array(d=b.length).fill(0).concat(Array(d).fill(1)),g=0===u.length?m:u.slice(),l.length>0?(l.forEach((e,t)=>{m[e]=g[t],m[t+d]=g[l.length+t]}),m):g),_=((e,t,r,n)=>{let i=[];if(r.length>0)if(n.length>0){if(e.forEach(e=>i.push(e)),Math.max(...n)>e.length)throw Error("axes is out of bound");n.forEach((e,t)=>i[e]=r[t])}else r.forEach(e=>i.push(e));else{if(0===t.length)throw Error("Resize requires either scales or sizes.");i=e.map((e,r)=>Math.round(e*t[r]))}return i})(b,o,a,n.axes),v=o.slice(),0===o.length&&(v=b.map((e,t)=>0===e?1:_[t]/e),"stretch"!==n.keepAspectRatioPolicy&&(p=b,c=v,h=n,x=(()=>{switch(h.keepAspectRatioPolicy){case"not_larger":return h.axes.length>0?Math.min(...h.axes.map(e=>c[e]),Number.MAX_VALUE):Math.min(...c,Number.MAX_VALUE);case"not_smaller":return h.axes.length>0?Math.max(...h.axes.map(e=>c[e]),5e-324):Math.max(...c,5e-324);default:throw Error(`Keep aspect ratio policy ${h.keepAspectRatioPolicy} is not supported`)}})(),c.fill(1,0,c.length),w=p.slice(),h.axes.length>0?(h.axes.forEach(e=>c[e]=x),h.axes.forEach(e=>w[e]=Math.round(p[e]*c[e]))):(c.fill(x,0,c.length),w.forEach((e,t)=>w[t]=Math.round(e*c[t]))),_=w)),$=l4("output",r.dataType,_.length),T=l3("input",r.dataType,b.length),I=ly.size(_),S=b.length===_.length&&b.every((e,t)=>e===_[t]),O="tf_crop_and_resize"===n.coordinateTransformMode,E=n.extrapolationValue,A=T.type.value,{name:"Resize",shaderCache:{hint:`${n.cacheKey}|${i}|${v.length>0?"cubic"===n.mode?v:v.length:""}|${a.length>0?a:""}|${y.length>0?y:""}|${S}|${"nearest"===n.mode?b.length:b}`,inputDependencies:["rank"]},getShaderSource:e=>{let t,r;return`
      ${S?"":`
      ${t=n.coordinateTransformMode,r=A,`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${r} { `+(()=>{switch(t){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${r}(xResized) / ${r}(xScale);
          } else {
            ${hO("xResized","lengthOriginal","lengthResized",r)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${r}(xResized) + 0.5) / ${r}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${r}(xResized) + 0.5) / ${r}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${hO("xResized","lengthOriginal - 1","lengthResized - 1",r)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${r}(roiStart) * ${r}(lengthOriginal - 1) +
                        (${r}(xResized) * ${r}(roiEnd - roiStart) * ${r}(lengthOriginal - 1)) /
                        ${r}(lengthResized - 1);
                  } else {
                    return 0.5 * ${r}(roiStart + roiEnd) * ${r}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${r}xScale * ${r}(lengthResized);
                  const adjustment = ${r}(lengthResized) / outputWidth;
                  const center = ${r}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${r}(xResized) + 0.5) / ${r}(xScale)) - 0.5;`;case"half_pixel":return`return ((${r}(xResized) + 0.5) / ${r}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${t} is not supported`)}})()+"}"};
      ${(()=>{switch(n.mode){case"nearest":let e,t,r,o,a,s,u,l,d,p,c,h;return`
              ${e=T,t=b,`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${l1("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`};
              ${r=n.nearestMode,o=i,a=A,`fn getNearestPixelFromOriginal(xOriginal: ${a}, isDownSample: bool) -> ${a} {`+(()=>{switch(r){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(o<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${r} is not supported`)}})()+"}"};
              ${s=T,u=$,l=b,d=_,p=v.length,c=y.length,h=O,`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${u.type.indices}) -> ${s.type.indices} {
      var input_indices: ${s.type.indices};
      for (var i:u32 = 0; i < ${d.length}; i++) {
        var output_index = ${u.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${l1("uniforms.scales","i",p)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${l1("uniforms.roi","i",c)};
          var roi_hi = ${l1("uniforms.roi",`i + ${l.length}`,c)};
          var input_shape_i = ${l1("uniforms.input_shape","i",l.length)};
          var output_shape_i = ${l1("uniforms.output_shape","i",d.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${h} || (original_idx >= 0 && original_idx < ${u.type.value}(input_shape_i))) {
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
        ${s.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`};
              `;case"linear":let f,m,g,x,w;return`
              ${f=$,m=b,g=_,x=v.length,w=y.length,`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${f.type.indices}) -> array<${f.type.value}, ${g.length}> {
      var original_indices: array<${f.type.value}, ${g.length}>;
      for (var i:u32 = 0; i < ${g.length}; i++) {
        var output_index = ${f.indicesGet("output_indices","i")};
        var scale = ${l1("uniforms.scales","i",x)};
        var roi_low = ${l1("uniforms.roi","i",w)};
        var roi_hi = ${l1("uniforms.roi",`i + ${m.length}`,w)};
        if (scale == 1.0) {
          original_indices[i] = ${f.type.value}(output_index);
        } else {
          var input_shape_i = ${l1("uniforms.input_shape","i",m.length)};
          var output_shape_i = ${l1("uniforms.output_shape","i",g.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`};
              ${(()=>{if(2===b.length||4===b.length)return`${((e,t,r,n,i)=>{let[o,a,s,u]=2===r.length?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",s,`max(0, min(col, ${r[s]} - 1))`)};
      ${hE(e,u,o,2)}
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
    }`})(T,$,b,O,E)}`;if(3===b.length||5===b.length)return`${((e,t,r,n,i)=>{let[o,a,s,u,l]=3===r.length?[-1,0,1,2,-1]:[0,2,3,4,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",s,`max(0, min(height, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${r[u]} - 1))`)};
      ${hE(e,l,o,3)}
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
    }`})(T,$,b,O,E)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===b.length||4===b.length)return`${((e,t,r,n,i,o,a,s,u,l)=>{let[d,p]=2===r.length?[0,1]:[2,3],c=e.type.value,h=a=>{let p=a===d?"row":"col";return`
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
    `})(T,$,b,_,v,y,n.cubicCoeffA,O,n.extrapolationValue,n.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${e.registerUniform("output_size","u32").registerUniform("scales","f32",v.length).registerUniform("roi","f32",y.length).declareVariables(T,$)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${S?"output[global_idx] = input[global_idx];":`
        let output_indices = ${$.offsetToIndices("global_idx")};
        var input_indices: ${T.type.indices};
        ${(()=>{switch(n.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${T.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${n.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${2===b.length||4===b.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${n.mode}`)}})()};
`}
      }`},getRunData:()=>({outputs:[{dims:_,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},{type:1,data:v},{type:1,data:y},...lZ(b,_)]})}),{inputs:[0]})},hP=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,i=e.cubicCoeffA,o=0!==e.excludeOutside,a=e.extrapolationValue,s=e.keepAspectRatioPolicy,u=e.mode,l=""===e.nearestMode?"simple":e.nearestMode;return lG({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:i,excludeOutside:o,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:l})}}),fq=G(()=>{"use strict";hX(),hQ(),h6(),hk=(e,t)=>{var r,n,i,o;let a,s,u,l,d,p,c,h,f,m,g,b,y;(e=>{if(!e||e.length<3)throw Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw Error("All inputs must have the same data type");if(3!==t.dims.length&&2!==t.dims.length)throw Error("Input must be 2D or 3D");if(3!==r.dims.length&&2!==r.dims.length)throw Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],o=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==i)throw Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==o)throw Error("Skip must have the same sequence length as input");if(1!==n.dims.length)throw Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==i)throw Error("Gamma must have the same hidden size as input");if(e.length>3){let t=e[3];if(1!==t.dims.length)throw Error("Beta must be 1D");if(t.dims[t.dims.length-1]!==i)throw Error("Beta must have the same hidden size as input")}if(e.length>4){let t=e[4];if(1!==t.dims.length)throw Error("Bias must be 1D");if(t.dims[t.dims.length-1]!==i)throw Error("Bias must have the same hidden size as input")}})(e.inputs);let _=[0];e.outputCount>1&&_.push(-3),e.outputCount>2&&_.push(-3),e.outputCount>3&&_.push(3),e.compute((r=e.inputs,n=t,i=e.outputCount,o=!1,a=n.simplified,s=r[0].dims,u=ly.size(s),l=s.slice(-1)[0],d=o?s.slice(0,-1).concat(1):[],p=!a&&r.length>3,c=r.length>4,h=o&&i>1,f=o&&i>2,m=i>3,b=[{type:12,data:u},{type:12,data:g=lJ(l)},{type:12,data:l},{type:1,data:n.epsilon}],y=[{dims:s,dataType:r[0].dataType}],i>1&&y.push({dims:d,dataType:1}),i>2&&y.push({dims:d,dataType:1}),i>3&&y.push({dims:s,dataType:r[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${g};${h};${f};${m}`,inputDependencies:r.map((e,t)=>"type")},getShaderSource:e=>{let t=[l3("x",r[0].dataType,r[0].dims,g),l3("skip",r[1].dataType,r[1].dims,g),l3("gamma",r[2].dataType,r[2].dims,g)];p&&t.push(l3("beta",r[3].dataType,r[3].dims,g)),c&&t.push(l3("bias",r[4].dataType,r[4].dims,g)),t.push(l4("output",r[0].dataType,s,g)),h&&t.push(l4("mean_output",1,d)),f&&t.push(l4("inv_std_output",1,d)),m&&t.push(l4("input_skip_bias_sum",r[0].dataType,s,g));let n=lK(r[0].dataType),i=lK(1,g);return`

      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...t)}
      var<workgroup> sum_shared : array<${i}, 64>;
      var<workgroup> sum_squared_shared : array<${i}, 64>;

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
          let bias_value = ${c?"bias[offset1d + i]":n+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${m?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${lY(n,g,"value")};
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
        let mean = ${l0("sum",g)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${l0("square_sum",g)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${h?"mean_output[global_idx] = mean;":""}
        ${f?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${n}(mean)`}) *
            ${n}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},getRunData:()=>({outputs:y,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:b})}),{outputs:_})}}),fG=G(()=>{"use strict";hX(),hQ(),h4(),h6(),hD=(e,t)=>{let r=[];if(e.length>t)if(7===e[t].dataType)e[t].getBigInt64Array().forEach(e=>r.push(Number(e)));else if(6===e[t].dataType)e[t].getInt32Array().forEach(e=>r.push(Number(e)));else throw Error(`Input ${t} must be an array of int32 or int64`);return r},hN=(e,t,r,n,i)=>{let o=e;return e<0&&(o+=r[n[t]]),i[t]<0?Math.max(0,Math.min(o,r[n[t]]-1)):Math.max(0,Math.min(o,r[n[t]]))},hC=(e,t)=>{var r=e.inputs,n=t;if(!r||r.length<1)throw Error("too few inputs");if(0!==n.axes.length){if(n.axes.length!==n.starts.length||n.axes.length!==n.ends.length)throw Error("axes, starts and ends must have the same length")}else if(n.starts.length!==n.ends.length)throw Error("starts and ends must have the same length");r.slice(1).forEach((e,t)=>{if(6!==r[t+1].dataType&&7!==r[t+1].dataType)throw Error(`Input ${t} must be an array of int32 or int64`)});let i=((e,t)=>{if(!(e.length>1))return t;{let t=hD(e,1),r=hD(e,2),n=hD(e,3);return 0===n.length&&(n=[...Array(e[0].dims.length).keys()]),lG({starts:t,ends:r,axes:n})}})(e.inputs,t);e.compute(((e,t)=>{let r=e[0].dims,n=ly.size(r),i=t.axes.length>0?ly.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],o=hD(e,4);o.forEach(e=>0!==e||(()=>{throw Error("step cannot be 0")})),0===o.length&&(o=Array(i.length).fill(1));let a=t.starts.map((e,t)=>hN(e,t,r,i,o)),s=t.ends.map((e,t)=>hN(e,t,r,i,o));if(i.length!==a.length||i.length!==s.length)throw Error("start, ends and axes should have the same number of elements");if(i.length!==r.length)for(let e=0;e<r.length;++e)i.includes(e)||(a.splice(e,0,0),s.splice(e,0,r[e]),o.splice(e,0,1));let u=o.map(e=>Math.sign(e));o.forEach((e,t,r)=>{if(e<0){let n=(s[t]-a[t])/e,i=a[t],u=i+n*o[t];a[t]=u,s[t]=i,r[t]=-e}});let l=r.slice(0);i.forEach((e,t)=>{l[e]=Math.ceil((s[e]-a[e])/o[e])});let d={dims:l,dataType:e[0].dataType},p=l4("output",e[0].dataType,l.length),c=l3("input",e[0].dataType,e[0].dims.length),h=ly.size(l),f=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:o.length}],m=[{type:12,data:h},{type:12,data:a},{type:6,data:u},{type:12,data:o},...lZ(e[0].dims,l)];return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${o.length}`,inputDependencies:["rank"]},getShaderSource:e=>{let t,n,i;return`
      ${e.registerUniforms(f).declareVariables(c,p)}
        ${t=c,n=p,i=r,`fn calculateInputIndices(output_indices: ${n.type.indices}) -> ${t.type.indices} {
          var input_indices: ${t.type.indices};
          var carry = 0u;
          for (var i = ${i.length-1}; i >= 0; i--) {
            let input_shape_i = ${l1("uniforms.input_shape","i",i.length)};
            let steps_i = ${l1("uniforms.steps","i",i.length)};
            let signs_i = ${l1("uniforms.signs","i",i.length)};
            let starts_i = ${l1("uniforms.starts","i",i.length)};
            var output_index = ${n.indicesGet("output_indices","i")};
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
          ${p.setByOffset("global_idx",c.getByIndices("input_indices"))}
      }`},getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:m})}})(e.inputs,i),{inputs:[0]})},hz=e=>{let t=e.starts,r=e.ends,n=e.axes;return lG({starts:t,ends:r,axes:n})}}),fH=G(()=>{"use strict";hX(),hQ(),h4(),h5(),h6(),hR=(e,t)=>{var r,n;let i,o,a,s,u,l,d,p,c,h,f,m,g,b,y,_,v,x,w;(e=>{if(!e||1!==e.length)throw Error("Softmax op requires 1 input.")})(e.inputs),r=e,n=t,o=(i=r.inputs[0]).dims,a=ly.size(o),s=o.length,l=(u=ly.normalizeAxis(n.axis,s))<o.length-1,p=[],l?((p=Array.from({length:s},(e,t)=>t))[u]=s-1,p[s-1]=u,d=r.compute(de(i,p),{inputs:[i],outputs:[-1]})[0]):d=i,f=a/(h=(c=d.dims)[s-1]),m=lJ(h),g=h/m,b=64,1===f&&(b=256),y=l3("x",d.dataType,d.dims,m),_=l4("result",d.dataType,d.dims,m),v=y.type.value,x="f32"===lK(d.dataType)?`var threadMax = ${v}(-3.4028234663852886e+38f);`:`var threadMax = ${v}(-65504.0h);`,w=r.compute({name:"Softmax",shaderCache:{hint:`${m};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:d.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:g}]}),getShaderSource:e=>{let t;return`
      var<workgroup> rowMaxShared : ${v};
      var<workgroup> rowSumShared : ${v};
      var<workgroup> threadShared : array<${v}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${v} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${v}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${e.registerUniform("packedCols","i32").declareVariables(y,_)}
      ${e.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
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
          rowMaxShared = ${v}(${t="threadShared[0]",4===m?`max(max(${t}.x, ${t}.y), max(${t}.z, ${t}.w))`:2===m?`max(${t}.x, ${t}.y)`:3===m?`max(max(${t}.x, ${t}.y), ${t}.z)`:t});
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
          rowSumShared = ${v}(${l0("threadShared[0]",m)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${v}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`}},{inputs:[d],outputs:[l?-1:0]})[0],l&&r.compute(de(w,p),{inputs:[w]})},hB=e=>lG({axis:e.axis})}),fW=G(()=>{"use strict";hX(),hQ(),h6(),hM=e=>Array.from(e.getBigInt64Array(),Number),hj=e=>{var t;let r,n,i,o,a,s,u;(e=>{if(!e||2!==e.length)throw Error("Tile requires 2 inputs.");if(1!==e[0].dataType&&10!==e[0].dataType&&6!==e[0].dataType&&12!==e[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==e[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==e[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(hM(e[1]).length!==e[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")})(e.inputs),e.compute((r=(t=e.inputs)[0].dims,i=((e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r})(r,n=hM(t[1])),o=ly.size(i),a=t[0].dataType,s=l3("input",a,r.length),u=l4("output",a,i.length),{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},...lZ(t[0].dims,i)]}),getShaderSource:e=>`
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
    }`}),{inputs:[0]})}}),fK=G(()=>{"use strict";hX(),hQ(),h6(),hF=e=>{e.compute((e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,i=e[1].dataType,o=!(ly.areEqual(t,r)&&ly.areEqual(r,n)),a=t,s=ly.size(t);if(o){let e=lb.calcShape(lb.calcShape(t,r,!1),n,!1);if(!e)throw Error("Can't perform where op on the given tensors");a=e,s=ly.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:t=>((e,t,r,n,i)=>{let o=l4("output_data",i,r.length,4),a=l3("a_data",t[1].dataType,t[1].dims.length,4),s=l3("b_data",t[2].dataType,t[2].dims.length,4),u=l3("c_data",t[0].dataType,t[0].dims.length,4),l,d=(e,t,r)=>`select(${t}, ${e}, ${r})`;if(n){let e=(e,t,r="")=>{let n=`a_data[index_a${t}][component_a${t}]`,i=`b_data[index_b${t}][component_b${t}]`,l=`bool(c_data[index_c${t}] & (0xffu << (component_c${t} * 8)))`;return`
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
      }`})(t,e,a,o,i),getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...lZ(n,t,r,a)]})}})(e.inputs))}}),fX=G(()=>{"use strict";h9(),fe(),ft(),fr(),fi(),fo(),fa(),fm(),fb(),fy(),f_(),fv(),fx(),fw(),f$(),fT(),fI(),fS(),fO(),fE(),fA(),fN(),fC(),fz(),fR(),fB(),fP(),fM(),fj(),fF(),fL(),fV(),h7(),fU(),fD(),fq(),fG(),fH(),fk(),fW(),h5(),fn(),fK(),hL=new Map([["Abs",[dG]],["Acos",[dH]],["Acosh",[dW]],["Add",[pI]],["ArgMax",[dB,dM]],["ArgMin",[dR,dM]],["Asin",[dK]],["Asinh",[dX]],["Atan",[dZ]],["Atanh",[dJ]],["Attention",[dL]],["AveragePool",[hh,hc]],["BatchNormalization",[dV]],["BiasAdd",[dU]],["BiasSplitGelu",[p$]],["Cast",[dY,dQ]],["Ceil",[d1]],["Clip",[d0]],["Concat",[pR,pB]],["Conv",[p9,p8]],["ConvTranspose",[ca,ci]],["Cos",[d2]],["Cosh",[d3]],["CumSum",[cs,cu]],["DepthToSpace",[cl,cd]],["DequantizeLinear",[hw,h$]],["DFT",[c_,cv]],["Div",[pS]],["Einsum",[cO,cE]],["Elu",[d6,d4]],["Equal",[pO]],["Erf",[d8]],["Exp",[d7]],["Expand",[cP]],["FastGelu",[ck]],["Floor",[d9]],["FusedConv",[p9,p8]],["Gather",[cN,cD]],["GatherElements",[cj,cM]],["GatherBlockQuantized",[cR,cB]],["GatherND",[cC,cz]],["Gelu",[pe]],["Gemm",[cL,cF]],["GlobalAveragePool",[hg,hm]],["GlobalMaxPool",[hx,hv]],["Greater",[pk]],["GreaterOrEqual",[pN]],["GridSample",[cW,cK]],["GroupQueryAttention",[c8]],["HardSigmoid",[pu,ps]],["HardSwish",[pl]],["InstanceNormalization",[c9]],["LayerNormalization",[he]],["LeakyRelu",[pt,d4]],["Less",[pD]],["LessOrEqual",[pC]],["Log",[pv]],["MatMul",[ht]],["MatMulNBits",[hr,hn]],["MaxPool",[hy,h_]],["Mul",[pE]],["MultiHeadAttention",[cY,cZ]],["Neg",[pn]],["Not",[pr]],["Pad",[hi]],["Pow",[pA]],["QuickGelu",[pw,d4]],["Range",[hT]],["Reciprocal",[pi]],["ReduceMin",[dP]],["ReduceMean",[dI]],["ReduceMax",[dA]],["ReduceSum",[dD]],["ReduceProd",[dk]],["ReduceL1",[dS]],["ReduceL2",[dO]],["ReduceLogSum",[dC]],["ReduceLogSumExp",[dE]],["ReduceSumSquare",[dN]],["Relu",[po]],["Resize",[hA,hP]],["RotaryEmbedding",[c4]],["ScatterND",[hS,hI]],["Sigmoid",[pa]],["Sin",[pd]],["Sinh",[pp]],["Slice",[hC,hz]],["SkipLayerNormalization",[hk]],["Split",[c1,c2]],["Sqrt",[pc]],["Softmax",[hR,hB]],["Sub",[pP]],["Tan",[ph]],["Tanh",[pm]],["ThresholdedRelu",[p_,d4]],["Tile",[hj]],["Transpose",[dt,dr]],["Where",[hF]]])}),fZ=G(()=>{"use strict";ey(),hJ(),h6(),hV=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,n,i){v(e.programInfo.name);let o=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let s=[];for(let e of t)s.push({binding:s.length,resource:{buffer:e.buffer}});for(let e of r)s.push({binding:s.length,resource:{buffer:e.buffer}});i&&s.push({binding:s.length,resource:i});let u=o.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:s,label:e.programInfo.name});if("capturing"===this.backend.sessionStatus){let t={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:n};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(t)}a.setPipeline(e.computePipeline),a.setBindGroup(0,u),a.dispatchWorkgroups(...n),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),x(e.programInfo.name)}dispose(){}build(e,t){v(e.name);let r=this.backend.device,n=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(e=>{r.features.has(e.feature)&&n.push(`enable ${e.extension};`)});let i=l7(t,this.backend.device.limits),o=e.getShaderSource(i),a=`${n.join(`
`)}
${i.additionalImplementations}
${o}`,s=r.createShaderModule({code:a,label:e.name});lm("verbose",()=>`[WebGPU] ${e.name} shader code: ${a}`);let u=r.createComputePipeline({compute:{module:s,entryPoint:"main"},layout:"auto",label:e.name});return x(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t="number"==typeof e?e:e.x,r="number"==typeof e?1:e.y||1,n="number"==typeof e?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&r<=i&&n<=i)return[t,r,n];let o=t*r*n,a=Math.ceil(Math.sqrt(o));if(!(a>i))return[a,a,1];if((a=Math.ceil(Math.cbrt(o)))>i)throw Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}}}),fJ={};W(fJ,{WebGpuBackend:()=>fY});var fQ,fY,f0=G(()=>{"use strict";ey(),hX(),hJ(),hY(),h3(),fX(),fZ(),fQ=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},fY=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],n={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},i=e=>t.features.has(e)&&r.push(e)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await t.requestDevice(n);let o=t.info??("function"==typeof t.requestAdapterInfo?await t.requestAdapterInfo():void 0);this.adapterInfo=new fQ(o),this.gpuDataManager=lU(this),this.programManager=new hV(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,lf(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){"u">typeof this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};"at-passes"===this.queryType&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let e;this.commandEncoder&&(v(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),e=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let e=0;e<t.length/2;e++){let n=r[e],i=n.kernelId,o=this.kernels.get(i),a=o.kernelType,s=o.kernelName,u=n.programName,l=n.inputTensorViews,d=n.outputTensorViews,p=t[2*e],c=t[2*e+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=p);let h=Number(p-this.queryTimeBase),f=Number(c-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(f))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:l.map(e=>({dims:e.dims,dataType:ln(e.dataType)})),outputsMetadata:d.map(e=>({dims:e.dims,dataType:ln(e.dataType)})),kernelId:i,kernelType:a,kernelName:s,programName:u,startTime:h,endTime:f});else{let e="";l.forEach((t,r)=>{e+=`input[${r}]: [${t.dims}] | ${ln(t.dataType)}, `});let t="";d.forEach((e,r)=>{t+=`output[${r}]: [${e.dims}] | ${ln(e.dataType)}, `}),console.log(`[profiling] kernel "${i}|${a}|${s}|${u}" ${e}${t}start time: ${h} ns, execution time: ${f-h} ns`)}y("GPU",`${u}::${p}::${c}`)}e.unmap(),this.pendingQueries.delete(e)}),x())}run(e,t,r,n,i,o){var a,s,u;let l,d;v(e.name);let p=[];for(let e=0;e<t.length;++e){let r=t[e].data;if(0===r)continue;let n=this.gpuDataManager.get(r);if(!n)throw Error(`no GPU data for input: ${r}`);p.push(n)}let{outputs:c,dispatchGroup:h,programUniforms:f}=e.getRunData(t),m=0===r.length?c.map((e,t)=>t):r;if(m.length!==c.length)throw Error(`Output size ${m.length} must be equal to ${c.length}.`);let g=[],b=[];for(let e=0;e<c.length;++e){if(!Number.isInteger(m[e])||m[e]<-3||m[e]>=o)throw Error(`Invalid output index: ${m[e]}`);if(-3===m[e])continue;let t=-1===m[e],r=-2===m[e],a=t||r?i(c[e].dataType,c[e].dims):n(m[e],c[e].dataType,c[e].dims);if(g.push(a),0===a.data)continue;let s=this.gpuDataManager.get(a.data);if(!s)throw Error(`no GPU data for output: ${a.data}`);if(t&&this.temporaryData.push(s),r){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(s)}b.push(s)}if(p.length!==t.length||b.length!==g.length){if(0===b.length)return x(e.name),g;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(f){let e=0,t=[];f.forEach(r=>{let n="number"==typeof r.data?[r.data]:r.data;if(0===n.length)return;let i=10===r.type?2:4,o,a;10===r.type?(a=n.length>4?16:n.length>2?8:n.length*i,o=n.length>4?16:i*n.length):(a=n.length<=2?n.length*i:16,o=16),e=Math.ceil(e/a)*a,t.push(e);let s=10===r.type?8:4;e+=n.length>4?Math.ceil(n.length/s)*o:n.length*i});let r=new ArrayBuffer(e=16*Math.ceil(e/16));f.forEach((e,n)=>{let i=t[n],o="number"==typeof e.data?[e.data]:e.data;if(6===e.type)new Int32Array(r,i,o.length).set(o);else if(12===e.type)new Uint32Array(r,i,o.length).set(o);else if(10===e.type)new Uint16Array(r,i,o.length).set(o);else if(1===e.type)new Float32Array(r,i,o.length).set(o);else throw Error(`Unsupported uniform type: ${ln(e.type)}`)});let n=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(n.buffer,0,r,0,e),this.gpuDataManager.release(n.id),l={offset:0,size:e,buffer:n.buffer}}let y=this.programManager.normalizeDispatchGroupSize(h),_=(a=e,s=t,u=1===y[1]&&1===y[2],d=a.name,a.shaderCache?.hint&&(d+="["+a.shaderCache.hint+"]"),d+=":"+u+`:${((e,t)=>{if(t.length!==e.length)throw Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let i=e[n].dataType;switch(t[n]){case"none":r.push("");break;case"type":r.push(`${i}`);break;case"rank":{let t=e[n].dims.length;r.push(`${i};${t}`);break}case"dims":{let t=e[n].dims.join(",");r.push(`${i};${t}`);break}default:throw Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")})(s,a.shaderCache?.inputDependencies??Array(s.length).fill("dims"))}`),w=this.programManager.getArtifact(_);if(w||(w=this.programManager.build(e,y),this.programManager.setArtifact(_,w),lm("info",()=>`[artifact] key: ${_}, programName: ${e.name}`)),f&&w.uniformVariablesInfo){if(f.length!==w.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${w.uniformVariablesInfo.length}, got ${f.length} in program "${w.programInfo.name}".`);for(let e=0;e<f.length;e++){let t=f[e],r=t.type,n="number"==typeof t.data?1:t.data.length,[i,o]=w.uniformVariablesInfo[e];if(r!==i||n!==o)throw Error(`Uniform variable ${e} mismatch: expect type ${i} with size ${o}, got type ${r} with size ${n} in program "${w.programInfo.name}".`)}}if(lm("info",()=>`[ProgramManager] run "${e.name}" (key=${_}) with ${y[0]}x${y[1]}x${y[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let e={kernelId:this.currentKernelId,programName:w.programInfo.name,inputTensorViews:t,outputTensorViews:g};this.pendingKernels.push(e),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(w,p,b,y,l),x(e.name),g}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,n){let i=hL.get(e);if(!i)throw Error(`kernel not implemented: ${e}`);let o={kernelType:e,kernelName:n,kernelEntry:i[0],attributes:[i[1],r]};this.kernels.set(t,o)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let e of t)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let n=this.kernels.get(e);if(!n)throw Error(`kernel not created: ${e}`);let i=n.kernelType,o=n.kernelName,a=n.kernelEntry,s=n.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${i}] ${o}" is not allowed to be called recursively`);this.currentKernelId=e,s[0]&&(s[1]=s[0](s[1]),s[0]=void 0),lm("info",()=>`[WebGPU] Start to run kernel "[${i}] ${o}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),a(t,s[1]),0}catch(e){return r.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${o}" failed. ${e}`)),1}finally{for(let e of(u&&r.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${i}] ${o}": ${e.message}`:null)),this.temporaryData))this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,n){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let o=i.get(t),a=this.gpuDataManager.registerExternalBuffer(r,n,o);return i.set(t,[a,r]),a}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let n=await lL(this,e,t);return l$(n.buffer,r)}}writeTimestamp(e){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){lm("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){lm("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){lm("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let n=0;n<r;n++){let r=this.getComputePassEncoder(),i=e[n];this.writeTimestamp(2*this.pendingDispatchNumber),r.setPipeline(i.computePipeline),r.setBindGroup(0,i.bindGroup),r.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(t[n]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),f1={};W(f1,{init:()=>f4});var f2,f3,f4,f6,f5,f8,f7,f9,me,mt,mr,mn,mi,mo,ma,ms,mu,ml,md,mp,mc,mh,mf,mm,mg,mb,my,m_,mv,mx,mw,m$,mT,mI,mS,mO,mE,mA,mP,mk,mD,mN,mC,mz=G(()=>{"use strict";hX(),hJ(),hQ(),h1(),f2=class e{constructor(e,t,r,n){this.module=e,this.dataType=t,this.data=r,this.dims=n}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let e=ly.size(this.dims);return 0===e?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let e=ly.size(this.dims);return 0===e?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let e=ly.size(this.dims);return 0===e?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let e=ly.size(this.dims);return 0===e?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(t){if(ly.size(t)!==ly.size(this.dims))throw Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},f3=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo,this.deviceLimits=t.device.limits;let n=e.PTR_SIZE,i=r/e.PTR_SIZE,o=4===n?"i32":"i64";this.opKernelContext=Number(e.getValue(n*i++,o));let a=Number(e.getValue(n*i++,o));this.outputCount=Number(e.getValue(n*i++,o)),this.customDataOffset=Number(e.getValue(n*i++,"*")),this.customDataSize=Number(e.getValue(n*i++,o));let s=[];for(let t=0;t<a;t++){let t=Number(e.getValue(n*i++,o)),r=Number(e.getValue(n*i++,"*")),a=Number(e.getValue(n*i++,o)),u=[];for(let t=0;t<a;t++)u.push(Number(e.getValue(n*i++,o)));s.push(new f2(e,t,r,u))}this.inputs=s}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(e=>"number"==typeof e?this.inputs[e]:e)??this.inputs,n=t?.outputs??[],i=(e,t,r)=>new f2(this.module,t,this.output(e,r),r),o=(e,t)=>{let r=li(e,t);if(!r)throw Error(`Unsupported data type: ${e}`);let n=r>0?this.backend.gpuDataManager.create(r).id:0;return new f2(this.module,e,n,t)};return this.backend.run(e,r,n,i,o,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let r=this.module.PTR_SIZE,n=4===r?"i32":"i64",i=this.module.stackAlloc((1+t.length)*r);this.module.setValue(i,t.length,n);for(let e=0;e<t.length;e++)this.module.setValue(i+r*(e+1),t[e],n);return this.module._JsepOutput(this.opKernelContext,e,i)}catch(r){throw Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(r)}}},f4=async(e,t,r,n)=>{let i=t.jsepInit;if(!i)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===e){let e=new(f0(),Z(fJ)).WebGpuBackend;await e.initialize(r,n),i("webgpu",[e,t=>e.alloc(Number(t)),t=>e.free(t),(r,n,i,o=!1)=>{if(o)lm("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(r)}, dst=${Number(n)}, size=${Number(i)}`),e.memcpy(Number(r),Number(n));else{lm("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(r)}, gpuDataId=${Number(n)}, size=${Number(i)}`);let o=t.HEAPU8.subarray(Number(r>>>0),Number(r>>>0)+Number(i));e.upload(Number(n),o)}},async(r,n,i)=>{lm("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${r}, dataOffset=${n}, size=${i}`),await e.download(Number(r),()=>t.HEAPU8.subarray(Number(n)>>>0,Number(n+i)>>>0))},(r,n,i)=>e.createKernel(r,Number(n),i,t.UTF8ToString(t._JsepGetNodeName(Number(n)))),t=>e.releaseKernel(t),(r,n,i,o)=>{lm("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${i}, kernel=${r}, contextDataOffset=${n}`);let a=new f3(t,e,Number(n));return e.computeKernel(Number(r),a,o)},()=>e.captureBegin(),()=>e.captureEnd(),()=>e.replay()])}else{let e=new lz(r);i("webnn",[e,()=>e.reserveTensorId(),t=>e.releaseTensorId(t),async(t,r,n,i,o)=>e.ensureTensor(t,r,n,i,o),(t,r)=>{e.uploadTensor(t,r)},async(t,r)=>e.downloadTensor(t,r),(t,r)=>e.registerMLContext(t,r),!!r.trace])}}}),mR=G(()=>{"use strict";ey(),hW(),hK(),hX(),hG(),hH(),hZ(),f6=async e=>{var t,r;t=e.wasm.numThreads,r=la(e.logLevel),0!==u6()._OrtInit(t,r)&&u7("Can't initialize onnxruntime.")},f5=async(e,t)=>{u6().asyncInit?.();let r=e.webgpu.adapter;if("webgpu"===t){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(r){if("object"!=typeof r.limits||"object"!=typeof r.features||"function"!=typeof r.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=e.webgpu.powerPreference;if(void 0!==t&&"low-power"!==t&&"high-performance"!==t)throw Error(`Invalid powerPreference setting: "${t}"`);let n=e.webgpu.forceFallbackAdapter;if(void 0!==n&&"boolean"!=typeof n)throw Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(!(r=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:n})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===t&&(typeof navigator>"u"||!navigator.ml))throw Error("WebNN is not supported in current environment");{let n=(mz(),Z(f1)).init;"webgpu"===t&&await n("webgpu",u6(),e,r),"webnn"===t&&await n("webnn",u6(),e)}},f8=new Map,f7=(e,t)=>{let r=u6(),n=r.stackSave(),i=0;try{let n=r.PTR_SIZE,o=r.stackAlloc(2*n);0!==r._OrtGetInputOutputMetadata(e,t,o,o+n)&&u7("Can't get session input/output metadata.");let a=Number(r.getValue(o,"*"));i=Number(r.getValue(o+n,"*"));let s=r.HEAP32[i/4];if(0===s)return[a,0];let u=r.HEAPU32[i/4+1],l=[];for(let e=0;e<u;e++){let t=Number(r.getValue(i+8+e*n,"*"));l.push(0!==t?r.UTF8ToString(t):Number(r.getValue(i+8+(e+u)*n,"*")))}return[a,s,l]}finally{r.stackRestore(n),0!==i&&r._OrtFree(i)}},f9=e=>{let t=u6(),r=t._malloc(e.byteLength);if(0===r)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},me=async(e,t)=>{let r,n,i=u6();Array.isArray(e)?[r,n]=e:e.buffer===i.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=f9(e);let o=0,a=0,s=0,u=[],l=[],d=[];try{if([a,u]=await lt(t),t?.externalData&&i.mountExternalData){let e=[];for(let r of t.externalData){let t="string"==typeof r?r:r.path,n="string"==typeof r?r:r.data;e.push(ld(n).then(e=>{i.mountExternalData(t,e)}))}await Promise.all(e)}for(let e of t?.executionProviders??[])if(("string"==typeof e?e:e.name)==="webnn"){if(i.shouldTransferToMLTensor=!1,"string"!=typeof e){let t=e?.context,r=e?.gpuDevice,n=e?.deviceType,o=e?.powerPreference;t?i.currentContext=t:r?i.currentContext=await i.webnnCreateMLContext(r):i.currentContext=await i.webnnCreateMLContext({deviceType:n,powerPreference:o})}else i.currentContext=await i.webnnCreateMLContext();break}o=await i._OrtCreateSession(r,n,a),i.webgpuOnCreateSession?.(o),0===o&&u7("Can't create a session."),i.jsepOnCreateSession?.(),i.currentContext&&(i.webnnRegisterMLContext(o,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[e,p]=(e=>{let t=u6(),r=t.stackSave();try{let r=t.PTR_SIZE,n=t.stackAlloc(2*r);0!==t._OrtGetInputOutputCount(e,n,n+r)&&u7("Can't get session input/output count.");let i=4===r?"i32":"i64";return[Number(t.getValue(n,i)),Number(t.getValue(n+r,i))]}finally{t.stackRestore(r)}})(o),c=!!t?.enableGraphCapture,h=[],f=[],m=[],g=[],b=[];for(let t=0;t<e;t++){let[e,r,n]=f7(o,t);0===e&&u7("Can't get an input name."),l.push(e);let a=i.UTF8ToString(e);h.push(a),m.push(0===r?{name:a,isTensor:!1}:{name:a,isTensor:!0,type:ln(r),shape:n})}for(let r=0;r<p;r++){let[n,a,s]=f7(o,r+e);0===n&&u7("Can't get an output name."),d.push(n);let u=i.UTF8ToString(n);f.push(u),g.push(0===a?{name:u,isTensor:!1}:{name:u,isTensor:!0,type:ln(a),shape:s});{if(c&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let e="string"==typeof t?.preferredOutputLocation?t.preferredOutputLocation:t?.preferredOutputLocation?.[u]??"cpu",r=i.webnnIsGraphOutput;if("cpu"===e&&r&&r(o,u)){b.push("ml-tensor-cpu-output");continue}if("cpu"!==e&&"cpu-pinned"!==e&&"gpu-buffer"!==e&&"ml-tensor"!==e)throw Error(`Not supported preferred output location: ${e}.`);if(c&&"gpu-buffer"!==e)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(e)}}let y=null;return b.some(e=>"gpu-buffer"===e||"ml-tensor"===e||"ml-tensor-cpu-output"===e)&&(s=i._OrtCreateBinding(o),0===s&&u7("Can't create IO binding."),y={handle:s,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(e=>"ml-tensor-cpu-output"===e?"ml-tensor":e).map(e=>ll(e))}),f8.set(o,[o,l,d,y,c,!1]),[o,h,f,m,g]}catch(e){throw l.forEach(e=>i._OrtFree(e)),d.forEach(e=>i._OrtFree(e)),0!==s&&0!==i._OrtReleaseBinding(s)&&u7("Can't release IO binding."),0!==o&&0!==i._OrtReleaseSession(o)&&u7("Can't release session."),e}finally{i._free(r),0!==a&&0!==i._OrtReleaseSessionOptions(a)&&u7("Can't release session options."),u.forEach(e=>i._free(e)),i.unmountExternalData?.()}},mt=e=>{let t=u6(),r=f8.get(e);if(!r)throw Error(`cannot release session. invalid session id: ${e}`);let[n,i,o,a,s]=r;a&&(s&&0!==t._OrtClearBoundOutputs(a.handle)&&u7("Can't clear bound outputs."),0!==t._OrtReleaseBinding(a.handle)&&u7("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),i.forEach(e=>t._OrtFree(e)),o.forEach(e=>t._OrtFree(e)),0!==t._OrtReleaseSession(n)&&u7("Can't release session."),f8.delete(e)},mr=new Map,mn=1,mi=new Map,mo=e=>{let t=u6(),r=t._malloc(e.byteLength);if(0===r)throw Error(`Can't create a LoRA adapter. failed to allocate a buffer of size ${e.byteLength}.`);try{t.HEAPU8.set(e,r);let n=t._OrtCreateLoraAdapter(r,e.byteLength);0===n&&u7("Can't create a LoRA adapter.");let i=mn++;return mr.set(i,n),i}finally{t._free(r)}},ma=e=>{let t=u6(),r=mr.get(e);if(void 0===r)throw Error(`cannot release LoRA adapter. invalid adapter id: ${e}`);if(mi.has(e))throw Error(`cannot release LoRA adapter. the adapter is used by a run in progress. adapter id: ${e}`);0!==t._OrtReleaseLoraAdapter(r)&&u7("Can't release LoRA adapter."),mr.delete(e)},ms=async(e,t,r,n,i,o,a=!1)=>{if(!e)return void t.push(0);let s=u6(),u=s.PTR_SIZE,l=e[0],d=e[1],p=e[3],c=p,h,f;if("string"===l&&("gpu-buffer"===p||"ml-tensor"===p))throw Error("String tensor is not supported on GPU.");if(a&&"gpu-buffer"!==p)throw Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if("gpu-buffer"===p){let t=e[2].gpuBuffer;f=li(lr(l),d);{let e=s.jsepRegisterBuffer;if(!e)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');h=e(n,o,t,f)}}else if("ml-tensor"===p){let t=e[2].mlTensor;f=li(lr(l),d);let r=s.webnnRegisterMLTensor;if(!r)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');h=r(n,t,lr(l),d)}else{let t=e[2];if(Array.isArray(t)){f=u*t.length,h=s._malloc(f),r.push(h);for(let e=0;e<t.length;e++){if("string"!=typeof t[e])throw TypeError(`tensor data at index ${e} is not a string`);s.setValue(h+e*u,u5(t[e],r),"*")}}else{let e=s.webnnIsGraphInput,o=s.webnnIsGraphOutput;if("string"!==l&&e&&o){let a=s.UTF8ToString(i);if(e(n,a)||o(n,a)){let e=lr(l);f=li(e,d),c="ml-tensor";let r=s.webnnCreateTemporaryTensor,i=s.webnnUploadTensor;if(!r||!i)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let o=await r(n,e,d);i(o,new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),h=o}else f=t.byteLength,h=s._malloc(f),r.push(h),s.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,f),h)}else f=t.byteLength,h=s._malloc(f),r.push(h),s.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,f),h)}}let m=s.stackSave(),g=s.stackAlloc(4*d.length);try{d.forEach((e,t)=>s.setValue(g+t*u,e,4===u?"i32":"i64"));let e=s._OrtCreateTensor(lr(l),h,f,g,d.length,ll(c));0===e&&u7(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(e)}finally{s.stackRestore(m)}},mu=async(e,t,r,n,i,o,a=[])=>{let s=u6(),u=s.PTR_SIZE,l=f8.get(e);if(!l)throw Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],p=l[1],c=l[2],h=l[3],f=l[4],m=l[5],g=[];if(a.length>0){if(h)throw Error("LoRA adapters are not supported for a session that uses IO binding, e.g. when an output is preferred to be on GPU, or when the WebNN execution provider produces an output.");for(let e of a){let t=mr.get(e);if(void 0===t)throw Error(`cannot run inference. invalid LoRA adapter id: ${e}`);g.push(t)}}let b=t.length,y=n.length,_=0,v=[],x=[],T=[],I=[],S=[],O=s.stackSave(),E=s.stackAlloc(b*u),A=s.stackAlloc(b*u),P=s.stackAlloc(y*u),k=s.stackAlloc(y*u);try{let l;for(let e of a)mi.set(e,(mi.get(e)??0)+1);[_,v]=u9(o,g),w("wasm prepareInputOutputTensor");for(let n=0;n<b;n++)await ms(r[n],x,I,e,p[t[n]],t[n],f);for(let t=0;t<y;t++)await ms(i[t],T,I,e,c[n[t]],b+n[t],f);$("wasm prepareInputOutputTensor");for(let e=0;e<b;e++)s.setValue(E+e*u,x[e],"*"),s.setValue(A+e*u,p[t[e]],"*");for(let e=0;e<y;e++)s.setValue(P+e*u,T[e],"*"),s.setValue(k+e*u,c[n[e]],"*");if(h&&!m){let{handle:r,outputPreferredLocations:o,outputPreferredLocationsEncoded:a}=h;if(p.length!==b)throw Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${p.length}).`);w("wasm bindInputsOutputs");for(let n=0;n<b;n++){let i=t[n];await s._OrtBindInput(r,p[i],x[n])!==0&&u7(`Can't bind input[${n}] for session=${e}.`)}for(let t=0;t<y;t++){let u=n[t];i[t]?.[3]?(S.push(T[t]),0!==s._OrtBindOutput(r,c[u],T[t],0)&&u7(`Can't bind pre-allocated output[${t}] for session=${e}.`)):0!==s._OrtBindOutput(r,c[u],0,a[u])&&u7(`Can't bind output[${t}] to ${o[t]} for session=${e}.`)}$("wasm bindInputsOutputs"),f8.set(e,[d,p,c,h,f,!0])}s.jsepOnRunStart?.(d),s.webnnOnRunStart?.(d),l=h?await s._OrtRunWithBinding(d,h.handle,y,P,_):await s._OrtRun(d,A,E,b,k,y,P,_),0!==l&&u7("failed to call OrtRun().");let O=[],D=[];w("wasm ProcessOutputTensor");for(let t=0;t<y;t++){let r=Number(s.getValue(P+t*u,"*"));if(r===T[t]||S.includes(T[t])){O.push(i[t]),r!==T[t]&&0!==s._OrtReleaseTensor(r)&&u7("Can't release tensor.");continue}let o=s.stackSave(),a=s.stackAlloc(4*u),l=!1,d,p=0;try{0!==s._OrtGetTensorData(r,a,a+u,a+2*u,a+3*u)&&u7(`Can't access output tensor data on index ${t}.`);let i=4===u?"i32":"i64",o=Number(s.getValue(a,i));p=s.getValue(a+u,"*");let c=s.getValue(a+2*u,"*"),f=Number(s.getValue(a+3*u,i)),m=[];for(let e=0;e<f;e++)m.push(Number(s.getValue(c+e*u,i)));0!==s._OrtFree(c)&&u7("Can't free memory for tensor dims.");let g=m.reduce((e,t)=>e*t,1);d=ln(o);let b=h?.outputPreferredLocations[n[t]];if("string"===d){if("gpu-buffer"===b||"ml-tensor"===b)throw Error("String tensor is not supported on GPU.");let e=[];for(let t=0;t<g;t++){let r=s.getValue(p+t*u,"*"),n=s.getValue(p+(t+1)*u,"*"),i=t===g-1?void 0:n-r;e.push(s.UTF8ToString(r,i))}O.push([d,m,e,"cpu"])}else if("gpu-buffer"===b&&g>0){let e=s.jsepGetBuffer;if(!e)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let t=e(p),n=li(o,g);if(void 0===n||!ls(d))throw Error(`Unsupported data type: ${d}`);l=!0,O.push([d,m,{gpuBuffer:t,download:s.jsepCreateDownloader(t,n,d),dispose:()=>{0!==s._OrtReleaseTensor(r)&&u7("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===b&&g>0){let t=s.webnnEnsureTensor,n=s.webnnIsGraphInputOutputTypeSupported;if(!t||!n)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===li(o,g)||!lu(d))throw Error(`Unsupported data type: ${d}`);if(!n(e,d,!1))throw Error(`preferredLocation "ml-tensor" for ${d} output is not supported by current WebNN Context.`);let i=await t(e,p,o,m,!1);l=!0,O.push([d,m,{mlTensor:i,download:s.webnnCreateMLTensorDownloader(p,d),dispose:()=>{s.webnnReleaseTensorId(p),s._OrtReleaseTensor(r)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===b&&g>0){let e=s.webnnCreateMLTensorDownloader(p,d)(),t=O.length;l=!0,D.push((async()=>{let n=[t,await e];return s.webnnReleaseTensorId(p),s._OrtReleaseTensor(r),n})()),O.push([d,m,[],"cpu"])}else{let e=new(lo(d))(g);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(s.HEAPU8.subarray(p,p+e.byteLength)),O.push([d,m,e,"cpu"])}}finally{s.stackRestore(o),"string"===d&&p&&s._free(p),l||s._OrtReleaseTensor(r)}}for(let[t,r]of(h&&!f&&(0!==s._OrtClearBoundOutputs(h.handle)&&u7("Can't clear bound outputs."),f8.set(e,[d,p,c,h,f,!1])),await Promise.all(D)))O[t][2]=r;return $("wasm ProcessOutputTensor"),O}finally{for(let e of(s.webnnOnRunEnd?.(d),s.stackRestore(O),x.forEach(e=>s._OrtReleaseTensor(e)),T.forEach(e=>s._OrtReleaseTensor(e)),I.forEach(e=>s._free(e)),0!==_&&s._OrtReleaseRunOptions(_),v.forEach(e=>s._free(e)),a)){let t=mi.get(e)-1;0===t?mi.delete(e):mi.set(e,t)}}},ml=e=>{let t=u6(),r=f8.get(e);if(!r)throw Error("invalid session id");let n=r[0],i=t._OrtEndProfiling(n);0===i&&u7("Can't get an profile file name."),t._OrtFree(i)},md=e=>{let t=[];for(let r of e){let e=r[2];!Array.isArray(e)&&"buffer"in e&&t.push(e.buffer)}return t}}),mB=G(()=>{"use strict";ey(),mR(),hG(),hq(),hZ(),mp=()=>!!b.wasm.proxy&&"u">typeof document,mh=!1,mf=!1,mm=!1,my=new Map,m_=(e,t)=>{let r=my.get(e);r?r.push(t):my.set(e,[t])},mv=()=>{if(mh||!mf||mm||!mc)throw Error("worker not ready")},mx=e=>{switch(e.data.type){case"init-wasm":mh=!1,e.data.err?(mm=!0,mb[1](e.data.err)):(mf=!0,mb[0]()),mg&&(URL.revokeObjectURL(mg),mg=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=my.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out)}}},mw=async()=>{if(!mf){if(mh)throw Error("multiple calls to 'initWasm()' detected.");if(mm)throw Error("previous call to 'initWasm()' failed.");if(mh=!0,mp())return new Promise((e,t)=>{mc?.terminate(),uJ().then(([r,n])=>{try{(mc=n).onerror=e=>t(e),mc.onmessage=mx,mb=[e,t];let i={type:"init-wasm",in:b};!i.in.wasm.wasmPaths&&(r||uG)&&(i.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),mc.postMessage(i),mg=r}catch(e){t(e)}},t)});try{await u4(b.wasm),await f6(b),mf=!0}catch(e){throw mm=!0,e}finally{mh=!1}}},m$=async e=>{if(mp())return mv(),new Promise((t,r)=>{m_("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:b}};mc.postMessage(n)});await f5(b,e)},mT=async e=>mp()?(mv(),new Promise((t,r)=>{m_("copy-from",[t,r]),mc.postMessage({type:"copy-from",in:{buffer:e}},[e.buffer])})):f9(e),mI=async(e,t)=>{if(!mp())return me(e,t);if(t?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return mv(),new Promise((r,n)=>{m_("create",[r,n]);let i={type:"create",in:{model:e,options:{...t}}},o=[];e instanceof Uint8Array&&o.push(e.buffer),mc.postMessage(i,o)})},mS=async e=>{if(mp())return mv(),new Promise((t,r)=>{m_("release",[t,r]),mc.postMessage({type:"release",in:e})});mt(e)},mO=async e=>{if(mp())throw Error("LoRA adapter is not supported for proxy.");let t="string"==typeof e?await ld(e):e;return mo(t)},mE=async e=>{if(mp())throw Error("LoRA adapter is not supported for proxy.");ma(e)},mA=async(e,t,r,n,i,o,a)=>{if(!mp())return mu(e,t,r,n,i,o,a);if(a.length>0)throw Error("LoRA adapter is not supported for proxy.");if(r.some(e=>"cpu"!==e[3]))throw Error("input tensor on GPU is not supported for proxy.");if(i.some(e=>e))throw Error("pre-allocated output tensor is not supported for proxy.");return mv(),new Promise((i,a)=>{m_("run",[i,a]),mc.postMessage({type:"run",in:{sessionId:e,inputIndices:t,inputs:r,outputIndices:n,options:o}},md(r))})},mP=async e=>{if(mp())return mv(),new Promise((t,r)=>{m_("end-profiling",[t,r]),mc.postMessage({type:"end-profiling",in:e})});ml(e)}}),mM=G(()=>{"use strict";ey(),mB(),mk=class{async loadAdapter(e){v(),this.adapterId=await mO(e),x()}async dispose(){return mE(this.adapterId)}}}),mj=G(()=>{"use strict";ey(),mM(),mB(),hX(),uR(),hZ(),mD=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${e.location} for ${t()}`)}},mN=e=>{switch(e[3]){case"cpu":return new F(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!ls(t))throw Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:i}=e[2];return F.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:i})}case"ml-tensor":{let t=e[0];if(!lu(t))throw Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:i}=e[2];return F.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:i})}default:throw Error(`invalid data location: ${e[3]}`)}},mC=class{async fetchModelAndCopyToWasmMemory(e){return mT(await ld(e))}async loadModel(e,t){let r;v(),r="string"==typeof e?await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await mI(r,t),x()}async dispose(){return mS(this.sessionId)}async run(e,t,r,n=[]){v();let i=n.map(e=>{if(!(e instanceof mk))throw Error("LoRA adapter was not created by the WebAssembly backend.");return e.adapterId}),o=[],a=[];Object.entries(e).forEach(e=>{let t=e[0],r=e[1],n=this.inputNames.indexOf(t);if(-1===n)throw Error(`invalid input '${t}'`);o.push(r),a.push(n)});let s=[],u=[];Object.entries(t).forEach(e=>{let t=e[0],r=e[1],n=this.outputNames.indexOf(t);if(-1===n)throw Error(`invalid output '${t}'`);s.push(r),u.push(n)});let l=o.map((e,t)=>mD(e,()=>`input "${this.inputNames[a[t]]}"`)),d=s.map((e,t)=>e?mD(e,()=>`output "${this.outputNames[u[t]]}"`):null),p=await mA(this.sessionId,a,l,u,d,r,i),c={};for(let e=0;e<p.length;e++)c[this.outputNames[u[e]]]=s[e]??mN(p[e]);return x(),c}startProfiling(){}endProfiling(){mP(this.sessionId)}}}),mF={};W(mF,{OnnxruntimeWebAssemblyBackend:()=>mV,initializeFlags:()=>mL,wasmBackend:()=>mU});var mL,mV,mU,mq=G(()=>{"use strict";ey(),mM(),mB(),mj(),uD(),mL=()=>{("number"!=typeof b.wasm.initTimeout||b.wasm.initTimeout<0)&&(b.wasm.initTimeout=0);let e=b.wasm.simd;if("boolean"!=typeof e&&void 0!==e&&"fixed"!==e&&"relaxed"!==e&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),b.wasm.simd=!1),"boolean"!=typeof b.wasm.proxy&&(b.wasm.proxy=!1),"boolean"!=typeof b.wasm.trace&&(b.wasm.trace=!1),"number"!=typeof b.wasm.numThreads||!Number.isInteger(b.wasm.numThreads)||b.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)b.wasm.numThreads=1;else{let e=typeof navigator>"u"?q("node:os").cpus().length:navigator.hardwareConcurrency;b.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},mU=new(mV=class{async init(e){mL(),await mw(),await m$(e)}async createInferenceSessionHandler(e,t){uw(t);let r=new mC;return await r.loadModel(e,t),r}async createLoraAdapterHandler(e){let t=new mk;return await t.loadAdapter(e),t}})});ey(),ey(),ey();var mG=eb;{let e=(uz(),Z(uN)).onnxjsBackend;d("webgl",e,-10)}{let e=(mq(),Z(mF)).wasmBackend;d("webgpu",e,5),d("webnn",e,5),d("cpu",e,10),d("wasm",e,10)}Object.defineProperty(b.versions,"web",{value:"1.31.1",enumerable:!0});export{V as InferenceSession,U as LoraAdapter,y as TRACE,w as TRACE_EVENT_BEGIN,$ as TRACE_EVENT_END,v as TRACE_FUNC_BEGIN,x as TRACE_FUNC_END,F as Tensor,mG as default,b as env,d as registerBackend};