/*! LICENSE: ort.min.mjs.LICENSE.txt */
let t;var i=Object.defineProperty,r=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyNames,s=Object.prototype.hasOwnProperty,n,o,u,l,d,p,h,c,f,m,g,_,y,$,b,v,w,x,k,S,I,T,z,E,C,O,B,A,R,D,M,U,P,q=(t=function(t){if("u">typeof require)return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')},"u">typeof require?require:"u">typeof Proxy?new Proxy(t,{get:(t,i)=>("u">typeof require?require:t)[i]}):t),N=(t,i)=>()=>(t&&(i=t(t=0)),i),L=(t,r)=>{for(var a in r)i(t,a,{get:r[a],enumerable:!0})},V=t=>((t,n,o,u)=>{if(n&&"object"==typeof n||"function"==typeof n)for(let l of a(n))s.call(t,l)||l===o||i(t,l,{get:()=>n[l],enumerable:!(u=r(n,l))||u.enumerable});return t})(i({},"__esModule",{value:!0}),t),G=N(()=>{"use strict";n=new Map,o=[],u=(t,i,r)=>{if(i&&"function"==typeof i.init&&"function"==typeof i.createInferenceSessionHandler){let a=n.get(t);if(void 0===a)n.set(t,{backend:i,priority:r});else{if(a.priority>r)return;if(a.priority===r&&a.backend!==i)throw Error(`cannot register backend "${t}" using priority ${r}`)}if(r>=0){let i=o.indexOf(t);-1!==i&&o.splice(i,1);for(let i=0;i<o.length;i++)if(n.get(o[i]).priority<=r)return void o.splice(i,0,t);o.push(t)}return}throw TypeError("not a valid backend")},l=async t=>{let i=n.get(t);if(!i)return"backend not found.";if(i.initialized)return i.backend;if(i.aborted)return i.error;{let r=!!i.initPromise;try{return r||(i.initPromise=i.backend.init(t)),await i.initPromise,i.initialized=!0,i.backend}catch(t){return r||(i.error=`${t}`,i.aborted=!0),i.error}finally{delete i.initPromise}}},d=async t=>{let i=t.executionProviders||[],r=i.map(t=>"string"==typeof t?t:t.name),a=0===r.length?o:r,s,n=[],u=new Set;for(let t of a){let i=await l(t);"string"==typeof i?n.push({name:t,err:i}):(s||(s=i),s===i&&u.add(t))}if(!s)throw Error(`no available backend found. ERR: ${n.map(t=>`[${t.name}] ${t.err}`).join(", ")}`);for(let{name:t,err:i}of n)r.includes(t)&&console.warn(`removing requested execution provider "${t}" from session options because it is not available: ${i}`);let d=i.filter(t=>u.has("string"==typeof t?t:t.name));return[s,new Proxy(t,{get:(t,i)=>"executionProviders"===i?d:Reflect.get(t,i)})]}}),W=N(()=>{"use strict";G()}),H=N(()=>{"use strict";p="1.24.3"}),F=N(()=>{"use strict";H(),h="warning",Object.defineProperty(c={wasm:{},webgl:{},webgpu:{},versions:{common:p},set logLevel(e){if(void 0!==e){if("string"!=typeof e||-1===["verbose","info","warning","error","fatal"].indexOf(e))throw Error(`Unsupported logging level: ${e}`);h=e}},get logLevel(){return h}},"logLevel",{enumerable:!0})}),K=N(()=>{"use strict";F(),f=c}),j=N(()=>{"use strict";m=(t,i)=>{let r="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=t.dims[3],r.height=t.dims[2];let a=r.getContext("2d");if(null!=a){let s,n;i?.tensorLayout!==void 0&&"NHWC"===i.tensorLayout?(s=t.dims[2],n=t.dims[3]):(s=t.dims[3],n=t.dims[2]);let o=i?.format!==void 0?i.format:"RGB",u=i?.norm,l,d;void 0===u||void 0===u.mean?l=[255,255,255,255]:"number"==typeof u.mean?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],void 0!==u.mean[3]&&(l[3]=u.mean[3])),void 0===u||void 0===u.bias?d=[0,0,0,0]:"number"==typeof u.bias?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(d[3]=u.bias[3]));let p=n*s,h=0,c=p,f=2*p,m=-1;"RGBA"===o?(h=0,c=p,f=2*p,m=3*p):"RGB"===o?(h=0,c=p,f=2*p):"RBG"===o&&(h=0,f=p,c=2*p);for(let i=0;i<n;i++)for(let r=0;r<s;r++)a.fillStyle="rgba("+(t.data[h++]-d[0])*l[0]+","+(t.data[c++]-d[1])*l[1]+","+(t.data[f++]-d[2])*l[2]+","+(-1===m?255:(t.data[m++]-d[3])*l[3])+")",a.fillRect(r,i,1,1);if("toDataURL"in r)return r.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},g=(t,i)=>{let r="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),a;if(null!=r){let s,n,o;i?.tensorLayout!==void 0&&"NHWC"===i.tensorLayout?(s=t.dims[2],n=t.dims[1],o=t.dims[3]):(s=t.dims[3],n=t.dims[2],o=t.dims[1]);let u=void 0!==i&&void 0!==i.format?i.format:"RGB",l=i?.norm,d,p;void 0===l||void 0===l.mean?d=[255,255,255,255]:"number"==typeof l.mean?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],void 0!==l.mean[3]&&(d[3]=l.mean[3])),void 0===l||void 0===l.bias?p=[0,0,0,0]:"number"==typeof l.bias?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],void 0!==l.bias[3]&&(p[3]=l.bias[3]));let h=n*s;if(void 0!==i&&(void 0!==i.format&&4===o&&"RGBA"!==i.format||3===o&&"RGB"!==i.format&&"BGR"!==i.format))throw Error("Tensor format doesn't match input tensor dims");let c=0,f=1,m=2,g=3,_=0,y=h,$=2*h,b=-1;"RGBA"===u?(_=0,y=h,$=2*h,b=3*h):"RGB"===u?(_=0,y=h,$=2*h):"RBG"===u&&(_=0,$=h,y=2*h),a=r.createImageData(s,n);for(let i=0;i<n*s;c+=4,f+=4,m+=4,g+=4,i++)a.data[c]=(t.data[_++]-p[0])*d[0],a.data[f]=(t.data[y++]-p[1])*d[1],a.data[m]=(t.data[$++]-p[2])*d[2],a.data[g]=-1===b?255:(t.data[b++]-p[3])*d[3]}else throw Error("Can not access image data");return a}}),Z=N(()=>{"use strict";Y(),_=(t,i)=>{if(void 0===t)throw Error("Image buffer must be defined");if(void 0===i.height||void 0===i.width)throw Error("Image height and width must be defined");if("NHWC"===i.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:r,width:a}=i,s=i.norm??{mean:255,bias:0},n,o;n="number"==typeof s.mean?[s.mean,s.mean,s.mean,s.mean]:[s.mean[0],s.mean[1],s.mean[2],s.mean[3]??255],o="number"==typeof s.bias?[s.bias,s.bias,s.bias,s.bias]:[s.bias[0],s.bias[1],s.bias[2],s.bias[3]??0];let u=void 0!==i.format?i.format:"RGBA",l=void 0!==i.tensorFormat&&void 0!==i.tensorFormat?i.tensorFormat:"RGB",d=r*a,p=new Float32Array("RGBA"===l?4*d:3*d),h=4,c=0,f=1,m=2,g=3,_=0,y=d,$=2*d,b=-1;"RGB"===u&&(h=3,c=0,f=1,m=2,g=-1),"RGBA"===l?b=3*d:"RBG"===l?(_=0,$=d,y=2*d):"BGR"===l&&($=0,y=d,_=2*d);for(let i=0;i<d;i++,c+=h,m+=h,f+=h,g+=h)p[_++]=(t[c]+o[0])/n[0],p[y++]=(t[f]+o[1])/n[1],p[$++]=(t[m]+o[2])/n[2],-1!==b&&-1!==g&&(p[b++]=(t[g]+o[3])/n[3]);return"RGBA"===l?new E("float32",p,[1,4,r,a]):new E("float32",p,[1,3,r,a])},y=async(t,i)=>{let r="u">typeof HTMLImageElement&&t instanceof HTMLImageElement,a="u">typeof ImageData&&t instanceof ImageData,s="u">typeof ImageBitmap&&t instanceof ImageBitmap,n="string"==typeof t,o,u=i??{},l=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},d=t=>"u">typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||t instanceof OffscreenCanvas?t.getContext("2d"):null;if(r){let r=l();r.width=t.width,r.height=t.height;let a=d(r);if(null!=a){let r=t.height,s=t.width;if(void 0!==i&&void 0!==i.resizedHeight&&void 0!==i.resizedWidth&&(r=i.resizedHeight,s=i.resizedWidth),void 0!==i){if(u=i,void 0!==i.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=r,u.width=s}else u.tensorFormat="RGBA",u.height=r,u.width=s;a.drawImage(t,0,0),o=a.getImageData(0,0,s,r).data}else throw Error("Can not access image data")}else if(a){let r,a;if(void 0!==i&&void 0!==i.resizedWidth&&void 0!==i.resizedHeight?(r=i.resizedHeight,a=i.resizedWidth):(r=t.height,a=t.width),void 0!==i&&(u=i),u.format="RGBA",u.height=r,u.width=a,void 0!==i){let i=l();i.width=a,i.height=r;let s=d(i);if(null!=s)s.putImageData(t,0,0),o=s.getImageData(0,0,a,r).data;else throw Error("Can not access image data")}else o=t.data}else if(s){if(void 0===i)throw Error("Please provide image config with format for Imagebitmap");let r=l();r.width=t.width,r.height=t.height;let a=d(r);if(null!=a){let i=t.height,r=t.width;return a.drawImage(t,0,0,r,i),o=a.getImageData(0,0,r,i).data,u.height=i,u.width=r,_(o,u)}throw Error("Can not access image data")}else{if(n)return new Promise((i,r)=>{let a=l(),s=d(a);if(!t||!s)return r();let n=new Image;n.crossOrigin="Anonymous",n.src=t,n.onload=()=>{a.width=n.width,a.height=n.height,s.drawImage(n,0,0,a.width,a.height);let t=s.getImageData(0,0,a.width,a.height);u.height=a.height,u.width=a.width,i(_(t.data,u))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==o)return _(o,u);throw Error("Input data provided is not supported - aborted tensor creation")},$=(t,i)=>{let{width:r,height:a,download:s,dispose:n}=i;return new E({location:"texture",type:"float32",texture:t,dims:[1,a,r,4],download:s,dispose:n})},b=(t,i)=>{let{dataType:r,dims:a,download:s,dispose:n}=i;return new E({location:"gpu-buffer",type:r??"float32",gpuBuffer:t,dims:a,download:s,dispose:n})},v=(t,i)=>{let{dataType:r,dims:a,download:s,dispose:n}=i;return new E({location:"ml-tensor",type:r??"float32",mlTensor:t,dims:a,download:s,dispose:n})},w=(t,i,r)=>new E({location:"cpu-pinned",type:t,data:i,dims:r??[i.length]})}),Q=N(()=>{"use strict";x=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),k=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),S=!1,I=()=>{if(!S){S=!0;let t="u">typeof BigInt64Array&&BigInt64Array.from,i="u">typeof BigUint64Array&&BigUint64Array.from,r=globalThis.Float16Array,a="u">typeof r&&r.from;t&&(x.set("int64",BigInt64Array),k.set(BigInt64Array,"int64")),i&&(x.set("uint64",BigUint64Array),k.set(BigUint64Array,"uint64")),a?(x.set("float16",r),k.set(r,"float16")):x.set("float16",Uint16Array)}}}),X=N(()=>{"use strict";Y(),T=t=>{let i=1;for(let r=0;r<t.length;r++){let a=t[r];if("number"!=typeof a||!Number.isSafeInteger(a))throw TypeError(`dims[${r}] must be an integer, got: ${a}`);if(a<0)throw RangeError(`dims[${r}] must be a non-negative integer, got: ${a}`);i*=a}return i},z=(t,i)=>{switch(t.location){case"cpu":return new E(t.type,t.data,i);case"cpu-pinned":return new E({location:"cpu-pinned",data:t.data,type:t.type,dims:i});case"texture":return new E({location:"texture",texture:t.texture,type:t.type,dims:i});case"gpu-buffer":return new E({location:"gpu-buffer",gpuBuffer:t.gpuBuffer,type:t.type,dims:i});case"ml-tensor":return new E({location:"ml-tensor",mlTensor:t.mlTensor,type:t.type,dims:i});default:throw Error(`tensorReshape: tensor location ${t.location} is not supported`)}}}),Y=N(()=>{"use strict";j(),Z(),Q(),X(),E=class{constructor(t,i,r){let a,s;if(I(),"object"==typeof t&&"location"in t)switch(this.dataLocation=t.location,a=t.type,s=t.dims,t.location){case"cpu-pinned":{let i=x.get(a);if(!i)throw TypeError(`unsupported type "${a}" to create tensor from pinned buffer`);if(!(t.data instanceof i))throw TypeError(`buffer should be of type ${i.name}`);this.cpuData=t.data;break}case"texture":if("float32"!==a)throw TypeError(`unsupported type "${a}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break;case"gpu-buffer":if("float32"!==a&&"float16"!==a&&"int32"!==a&&"int64"!==a&&"uint32"!==a&&"uint8"!==a&&"bool"!==a&&"uint4"!==a&&"int4"!==a)throw TypeError(`unsupported type "${a}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break;case"ml-tensor":if("float32"!==a&&"float16"!==a&&"int32"!==a&&"int64"!==a&&"uint32"!==a&&"uint64"!==a&&"int8"!==a&&"uint8"!==a&&"bool"!==a&&"uint4"!==a&&"int4"!==a)throw TypeError(`unsupported type "${a}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let n,o;if("string"==typeof t)if(a=t,o=r,"string"===t){if(!Array.isArray(i))throw TypeError("A string tensor's data must be a string array.");n=i}else{let r=x.get(t);if(void 0===r)throw TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(i)){if("float16"===t&&r===Uint16Array||"uint4"===t||"int4"===t)throw TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${r.name} as data.`);n="uint64"===t||"int64"===t?r.from(i,BigInt):r.from(i)}else if(i instanceof r)n=i;else if(i instanceof Uint8ClampedArray)if("uint8"===t)n=Uint8Array.from(i);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===t&&i instanceof Uint16Array&&r!==Uint16Array)n=new globalThis.Float16Array(i.buffer,i.byteOffset,i.length);else throw TypeError(`A ${a} tensor's data must be type of ${r}`)}else if(o=i,Array.isArray(t)){if(0===t.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let i=typeof t[0];if("string"===i)a="string",n=t;else if("boolean"===i)a="bool",n=Uint8Array.from(t);else throw TypeError(`Invalid element type of data array: ${i}.`)}else if(t instanceof Uint8ClampedArray)a="uint8",n=Uint8Array.from(t);else{let i=k.get(t.constructor);if(void 0===i)throw TypeError(`Unsupported type for tensor data: ${t.constructor}.`);a=i,n=t}if(void 0===o)o=[n.length];else if(!Array.isArray(o))throw TypeError("A tensor's dims must be a number array");s=o,this.cpuData=n,this.dataLocation="cpu"}let n=T(s);if(this.cpuData&&n!==this.cpuData.length&&("uint4"!==a&&"int4"!==a||Math.ceil(n/2)!==this.cpuData.length))throw Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=a,this.dims=s,this.size=n}static async fromImage(t,i){return y(t,i)}static fromTexture(t,i){return $(t,i)}static fromGpuBuffer(t,i){return b(t,i)}static fromMLTensor(t,i){return v(t,i)}static fromPinnedBuffer(t,i,r){return w(t,i,r)}toDataURL(t){return m(this,t)}toImageData(t){return g(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let i=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=i,t&&this.disposer&&(this.disposer(),this.disposer=void 0),i}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return z(this,t)}}}),J=N(()=>{"use strict";Y(),C=E}),ee=N(()=>{"use strict";F(),O=(t,i)=>{(typeof c.trace>"u"?c.wasm.trace:c.trace)&&console.timeStamp(`${t}::ORT::${i}`)},B=(t,i)=>{let r=Error().stack?.split(/\r\n|\r|\n/g)||[],a=!1;for(let s=0;s<r.length;s++){if(a&&!r[s].includes("TRACE_FUNC")){let a=`FUNC_${t}::${r[s].trim().split(" ")[1]}`;i&&(a+=`::${i}`),O("CPU",a);return}r[s].includes("TRACE_FUNC")&&(a=!0)}},A=t=>{(typeof c.trace>"u"?c.wasm.trace:c.trace)&&B("BEGIN",t)},R=t=>{(typeof c.trace>"u"?c.wasm.trace:c.trace)&&B("END",t)},D=t=>{(typeof c.trace>"u"?c.wasm.trace:c.trace)&&console.time(`ORT::${t}`)},M=t=>{(typeof c.trace>"u"?c.wasm.trace:c.trace)&&console.timeEnd(`ORT::${t}`)}}),et=N(()=>{"use strict";G(),J(),ee(),U=class t{constructor(t){this.handler=t}async run(t,i,r){A(),D("InferenceSession.run");let a={},s={};if("object"!=typeof t||null===t||t instanceof C||Array.isArray(t))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let n=!0;if("object"==typeof i){if(null===i)throw TypeError("Unexpected argument[1]: cannot be null.");if(i instanceof C)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(i)){if(0===i.length)throw TypeError("'fetches' cannot be an empty array.");for(let t of(n=!1,i)){if("string"!=typeof t)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(t))throw RangeError(`'fetches' contains invalid output name: ${t}.`);a[t]=null}if("object"==typeof r&&null!==r)s=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else{let t=!1,o=Object.getOwnPropertyNames(i);for(let r of this.outputNames)if(-1!==o.indexOf(r)){let s=i[r];(null===s||s instanceof C)&&(t=!0,n=!1,a[r]=s)}if(t){if("object"==typeof r&&null!==r)s=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else s=i}}else if("u">typeof i)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let i of this.inputNames)if(typeof t[i]>"u")throw Error(`input '${i}' is missing in 'feeds'.`);if(n)for(let t of this.outputNames)a[t]=null;let o=await this.handler.run(t,a,s),u={};for(let t in o)if(Object.hasOwnProperty.call(o,t)){let i=o[t];i instanceof C?u[t]=i:u[t]=new C(i.type,i.data,i.dims)}return M("InferenceSession.run"),R(),u}async release(){return this.handler.dispose()}static async create(i,r,a,s){A(),D("InferenceSession.create");let n,o={};if("string"==typeof i){if(n=i,"object"==typeof r&&null!==r)o=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else if(i instanceof Uint8Array){if(n=i,"object"==typeof r&&null!==r)o=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else if(i instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&i instanceof SharedArrayBuffer){let t=0,u=i.byteLength;if("object"==typeof r&&null!==r)o=r;else if("number"==typeof r){if(!Number.isSafeInteger(t=r))throw RangeError("'byteOffset' must be an integer.");if(t<0||t>=i.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${i.byteLength}).`);if(u=i.byteLength-t,"number"==typeof a){if(!Number.isSafeInteger(u=a))throw RangeError("'byteLength' must be an integer.");if(u<=0||t+u>i.byteLength)throw RangeError(`'byteLength' is out of range (0, ${i.byteLength-t}].`);if("object"==typeof s&&null!==s)o=s;else if("u">typeof s)throw TypeError("'options' must be an object.")}else if("u">typeof a)throw TypeError("'byteLength' must be a number.")}else if("u">typeof r)throw TypeError("'options' must be an object.");n=new Uint8Array(i,t,u)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await d(o),p=await u.createInferenceSessionHandler(n,l);return M("InferenceSession.create"),R(),new t(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),ei=N(()=>{"use strict";et(),P=U}),er=N(()=>{}),ea=N(()=>{}),es=N(()=>{}),en=N(()=>{}),eo={};L(eo,{InferenceSession:()=>P,TRACE:()=>O,TRACE_EVENT_BEGIN:()=>D,TRACE_EVENT_END:()=>M,TRACE_FUNC_BEGIN:()=>A,TRACE_FUNC_END:()=>R,Tensor:()=>C,env:()=>f,registerBackend:()=>u});var eu=N(()=>{"use strict";W(),K(),ei(),J(),er(),ea(),ee(),es(),en()}),el=N(()=>{}),ed={};L(ed,{default:()=>eh});var ep,eh,ec,ef,em,eg,e_,ey,e$,eb,ev,ew,ex,ek,eS,eI,eT,ez,eE,eC,eO,eB,eA,eR,eD,eM,eU,eP,eq,eN,eL,eV,eG,eW,eH,eF,eK,ej,eZ,eQ,eX,eY,eJ,e0,e1,e2,e3,e4,e6,e8,e5,e7,e9,te,tt,ti,tr,ta,ts,tn,to,tu,tl,td,tp,th,tc,tf,tm,tg,t_,ty,t$,tb,tv,tw,tx,tk,tS,tI,tT,tz,tE,tC,tO,tB,tA,tR,tD,tM,tU,tP,tq,tN,tL,tV,tG,tW,tH,tF,tK,tj,tZ,tQ,tX,tY,tJ,t0,t1,t2,t3,t4,t6,t8,t5,t7,t9,ie,it,ii,ir,ia,is,io,iu,il,id,ip,ih,ic,im,ig,i_,iy,i$,ib,iv,iw,ix,ik,iS,iI,iT,iz,iE,iC,iO,iB,iA,iR,iD,iM,iU,iP,iq,iN,iL,iV,iG,iW,iH,iF,iK,ij,iZ,iQ,iX,iY,iJ,i0,i1,i2,i3,i4,i6,i8,i5,i7,i9,re,rt,ri,rr,ra,rs,rn,ro,ru,rl,rd,rp,rh,rc,rf,rm,rg,r_,ry,r$,rb,rv,rw,rx,rk,rS,rI,rT,rz,rE,rC,rO,rB,rA,rR,rD,rM,rU,rP,rq,rN,rL,rV,rG,rW,rH,rF,rK,rj,rZ,rQ,rX,rY,rJ,r0,r1,r2,r3,r4,r6,r8,r5,r7,r9,ae,at,ai,ar,aa,as,an,ao,au,al,ad,ap,ah,ac,af,am,ag,a_,ay,a$,ab,av,aw,ax,ak,aS,aI,aT,az,aE,aC,aO,aB,aA,aR,aD,aM,aU,aP,aq,aN,aL,aV,aG,aW,aH,aF,aK,aj,aZ,aQ,aX,aY,aJ,a0,a1,a2,a3,a4,a6,a8,a5,a7,a9,se,st,si,sr,sa=N(()=>{"use strict";nY(),sn(),ss(),(ep=globalThis.self?.name==="ort-wasm-proxy-worker")&&(self.onmessage=t=>{let{type:i,in:r}=t.data;try{switch(i){case"init-wasm":ez(r.wasm).then(()=>{n$(r).then(()=>{postMessage({type:i})},t=>{postMessage({type:i,err:t})})},t=>{postMessage({type:i,err:t})});break;case"init-ep":{let{epName:t,env:a}=r;nb(a,t).then(()=>{postMessage({type:i})},t=>{postMessage({type:i,err:t})});break}case"copy-from":{let{buffer:t}=r,a=nx(t);postMessage({type:i,out:a});break}case"create":{let{model:t,options:a}=r;nk(t,a).then(t=>{postMessage({type:i,out:t})},t=>{postMessage({type:i,err:t})});break}case"release":nS(r),postMessage({type:i});break;case"run":{let{sessionId:t,inputIndices:a,inputs:s,outputIndices:n,options:o}=r;nT(t,a,s,n,Array(n.length).fill(null),o).then(t=>{t.some(t=>"cpu"!==t[3])?postMessage({type:i,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:i,out:t},nE([...s,...t]))},t=>{postMessage({type:i,err:t})});break}case"end-profiling":nz(r),postMessage({type:i})}}catch(t){postMessage({type:i,err:t})}}),eh=ep?null:t=>new Worker(t??em,{type:"module",name:"ort-wasm-proxy-worker"})}),ss=N(()=>{"use strict";el(),ec=typeof location>"u"?void 0:location.origin,ef=import.meta.url>"file:"&&import.meta.url<"file;",em=(()=>{if(ef){let t=URL;return new URL(new t("ort.min.mjs",import.meta.url).href,ec).href}return import.meta.url})(),eg=()=>{if(em&&!em.startsWith("blob:"))return em.substring(0,em.lastIndexOf("/")+1)},e_=(t,i)=>{try{let r=i??em;return(r?new URL(t,r):new URL(t)).origin===ec}catch{return!1}},ey=async t=>{let i=await (await fetch(t,{credentials:"same-origin"})).blob();return URL.createObjectURL(i)},e$=async t=>(await import(t)).default,eb=(sa(),V(ed)).default,ev=async()=>{if(!em)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(e_(em))return[void 0,eb()];let t=await ey(em);return[t,eb(t)]},ew=void 0,ex=async(t,i,r,a)=>{let s=ew&&!(t||i);if(s)if(em)s=e_(em)||a&&!r;else if(a&&!r)s=!0;else throw Error("cannot determine the script source URL.");if(s)return[void 0,ew];{let a,s,n="ort-wasm-simd-threaded.jsep.mjs",o=t??((t,i)=>{let r=i??em;try{return(r?new URL(t,r):new URL(t)).href}catch{return}})(n,i),u=r&&o&&!e_(o,i),l=u?await ey(o):o??(a=n,s=i,`${s??"./"}${a}`);return[u?l:void 0,await e$(l)]}}}),sn=N(()=>{"use strict";ss(),eS=!1,eI=!1,eT=!1,ez=async t=>{if(eS)return Promise.resolve();if(eI)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(eT)throw Error("previous call to 'initializeWebAssembly()' failed.");eI=!0;let i=t.initTimeout,r=t.numThreads;if(!1!==t.simd){if("relaxed"===t.simd){if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}})())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}})())throw Error("WebAssembly SIMD is not supported in the current environment.")}let a=(()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}})();r>1&&!a&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),t.numThreads=r=1);let s=t.wasmPaths,n="string"==typeof s?s:void 0,o=s?.mjs,u=o?.href??o,l=s?.wasm,d=l?.href??l,p=t.wasmBinary,[h,c]=await ex(u,n,r>1,!!p||!!d),f=!1,m=[];if(i>0&&m.push(new Promise(t=>{setTimeout(()=>{f=!0,t()},i)})),m.push(new Promise((t,i)=>{let a={numThreads:r};if(p)a.wasmBinary=p,a.locateFile=t=>t;else if(d||n)a.locateFile=t=>d??n+t;else if(u&&0!==u.indexOf("blob:"))a.locateFile=t=>new URL(t,u).href;else if(h){let t=eg();t&&(a.locateFile=i=>t+i)}c(a).then(i=>{eI=!1,eS=!0,ek=i,t(),h&&URL.revokeObjectURL(h)},t=>{eI=!1,eT=!0,i(t)})})),await Promise.race(m),f)throw Error(`WebAssembly backend initializing failed due to timeout: ${i}ms`)},eE=()=>{if(eS&&ek)return ek;throw Error("WebAssembly is not initialized yet.")}}),so=N(()=>{"use strict";sn(),eC=(t,i)=>{let r=eE(),a=r.lengthBytesUTF8(t)+1,s=r._malloc(a);return r.stringToUTF8(t,s,a),i.push(s),s},eO=(t,i,r,a)=>{if("object"==typeof t&&null!==t){if(r.has(t))throw Error("Circular reference in options");r.add(t)}Object.entries(t).forEach(([t,s])=>{let n=i?i+t:t;if("object"==typeof s)eO(s,n+".",r,a);else if("string"==typeof s||"number"==typeof s)a(n,s.toString());else if("boolean"==typeof s)a(n,s?"1":"0");else throw Error(`Can't handle extra config type: ${typeof s}`)})},eB=t=>{let i=eE(),r=i.stackSave();try{let r=i.PTR_SIZE,a=i.stackAlloc(2*r);i._OrtGetLastError(a,a+r);let s=Number(i.getValue(a,4===r?"i32":"i64")),n=i.getValue(a+r,"*"),o=n?i.UTF8ToString(n):"";throw Error(`${t} ERROR_CODE: ${s}, ERROR_MESSAGE: ${o}`)}finally{i.stackRestore(r)}}}),su=N(()=>{"use strict";sn(),so(),eA=t=>{let i=eE(),r=0,a=[],s=t||{};try{if(t?.logSeverityLevel===void 0)s.logSeverityLevel=2;else if("number"!=typeof t.logSeverityLevel||!Number.isInteger(t.logSeverityLevel)||t.logSeverityLevel<0||t.logSeverityLevel>4)throw Error(`log severity level is not valid: ${t.logSeverityLevel}`);if(t?.logVerbosityLevel===void 0)s.logVerbosityLevel=0;else if("number"!=typeof t.logVerbosityLevel||!Number.isInteger(t.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${t.logVerbosityLevel}`);t?.terminate===void 0&&(s.terminate=!1);let n=0;return t?.tag!==void 0&&(n=eC(t.tag,a)),r=i._OrtCreateRunOptions(s.logSeverityLevel,s.logVerbosityLevel,!!s.terminate,n),0===r&&eB("Can't create run options."),t?.extra!==void 0&&eO(t.extra,"",new WeakSet,(t,s)=>{let n=eC(t,a),o=eC(s,a);0!==i._OrtAddRunConfigEntry(r,n,o)&&eB(`Can't set a run config entry: ${t} - ${s}.`)}),[r,a]}catch(t){throw 0!==r&&i._OrtReleaseRunOptions(r),a.forEach(t=>i._free(t)),t}}}),sl=N(()=>{"use strict";sn(),so(),eR=(t,i,r,a)=>{let s=eC(i,a),n=eC(r,a);0!==eE()._OrtAddSessionConfigEntry(t,s,n)&&eB(`Can't set a session config entry: ${i} - ${r}.`)},eD=async(t,i,r)=>{for(let a of i.executionProviders){let i="string"==typeof a?a:a.name,s=[];switch(i){case"webnn":if(i="WEBNN","string"!=typeof a){let i=a?.deviceType;i&&eR(t,"deviceType",i,r)}break;case"webgpu":if(i="JS","string"!=typeof a&&a?.preferredLayout){if("NCHW"!==a.preferredLayout&&"NHWC"!==a.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);eR(t,"preferredLayout",a.preferredLayout,r)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${i}`)}let n=eC(i,r),o=s.length,u=0,l=0;if(o>0){u=eE()._malloc(o*eE().PTR_SIZE),r.push(u),l=eE()._malloc(o*eE().PTR_SIZE),r.push(l);for(let t=0;t<o;t++)eE().setValue(u+t*eE().PTR_SIZE,s[t][0],"*"),eE().setValue(l+t*eE().PTR_SIZE,s[t][1],"*")}await eE()._OrtAppendExecutionProvider(t,n,u,l,o)!==0&&eB(`Can't append execution provider: ${i}.`)}},eM=async t=>{var i;let r,a=eE(),s=0,n=[],o=t||{};(i=o).extra||(i.extra={}),i.extra.session||(i.extra.session={}),(r=i.extra.session).use_ort_model_bytes_directly||(r.use_ort_model_bytes_directly="1"),i.executionProviders&&i.executionProviders.some(t=>("string"==typeof t?t:t.name)==="webgpu")&&(i.enableMemPattern=!1);try{let t=(t=>{switch(t){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${t}`)}})(o.graphOptimizationLevel??"all"),i=(t=>{switch(t){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${t}`)}})(o.executionMode??"sequential"),r="string"==typeof o.logId?eC(o.logId,n):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log severity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw Error(`log verbosity level is not valid: ${l}`);let d="string"==typeof o.optimizedModelFilePath?eC(o.optimizedModelFilePath,n):0;if(s=a._OrtCreateSessionOptions(t,!!o.enableCpuMemArena,!!o.enableMemPattern,i,!!o.enableProfiling,0,r,u,l,d),0===s&&eB("Can't create session options."),o.executionProviders&&await eD(s,o,n),void 0!==o.enableGraphCapture){if("boolean"!=typeof o.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);eR(s,"enableGraphCapture",o.enableGraphCapture.toString(),n)}if(o.freeDimensionOverrides)for(let[t,i]of Object.entries(o.freeDimensionOverrides)){if("string"!=typeof t)throw Error(`free dimension override name must be a string: ${t}`);if("number"!=typeof i||!Number.isInteger(i)||i<0)throw Error(`free dimension override value must be a non-negative integer: ${i}`);let r=eC(t,n);0!==a._OrtAddFreeDimensionOverride(s,r,i)&&eB(`Can't set a free dimension override: ${t} - ${i}.`)}return void 0!==o.extra&&eO(o.extra,"",new WeakSet,(t,i)=>{eR(s,t,i,n)}),[s,n]}catch(t){throw 0!==s&&0!==a._OrtReleaseSessionOptions(s)&&eB("Can't release session options."),n.forEach(t=>a._free(t)),t}}}),sd=N(()=>{"use strict";eU=t=>{switch(t){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${t}`)}},eP=t=>{switch(t){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${t}`)}},eq=(t,i)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][t],a="number"==typeof i?i:i.reduce((t,i)=>t*i,1);return r>0?Math.ceil(a*r):void 0},eN=t=>{switch(t){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${t}`)}},eL=t=>{switch(t){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${t}`)}},eV=t=>"float32"===t||"float16"===t||"int32"===t||"int64"===t||"uint32"===t||"uint8"===t||"bool"===t||"uint4"===t||"int4"===t,eG=t=>"float32"===t||"float16"===t||"int32"===t||"int64"===t||"uint32"===t||"uint64"===t||"int8"===t||"uint8"===t||"bool"===t||"uint4"===t||"int4"===t,eW=t=>{switch(t){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${t}`)}}}),sp=N(()=>{"use strict";el(),eH=async t=>{if("string"!=typeof t)return t instanceof Blob?new Uint8Array(await t.arrayBuffer()):t instanceof Uint8Array?t:new Uint8Array(t);{let i=await fetch(t);if(!i.ok)throw Error(`failed to load external data file: ${t}`);let r=i.headers.get("Content-Length"),a=r?parseInt(r,10):0;if(a<0x40000000)return new Uint8Array(await i.arrayBuffer());{if(!i.body)throw Error(`failed to load external data file: ${t}, no response body.`);let r=i.body.getReader(),s;try{s=new ArrayBuffer(a)}catch(t){if(t instanceof RangeError){let t=Math.ceil(a/65536);s=new WebAssembly.Memory({initial:t,maximum:t}).buffer}else throw t}let n=0;for(;;){let{done:t,value:i}=await r.read();if(t)break;let a=i.byteLength;new Uint8Array(s,n,a).set(i),n+=a}return new Uint8Array(s,0,a)}}}}),sh=N(()=>{"use strict";sd(),eF=["V","I","W","E","F"],eZ=(t,i)=>{eK=t,ej=i},eQ=(...t)=>{ej&&((t,i)=>{var r,a;let s=eL(t);s>=eL(eK)&&(r=s,a="function"==typeof i?i():i,console.log(`[${eF[r]},${new Date().toISOString()}]${a}`))})(...t)}}),sc=N(()=>{"use strict";eX=class{static calcMatMulShape(t,i){return t[1]!==i[0]?void 0:[t[0],i[1]]}},eY=class{static calcShape(t,i,r=!1){let a=t.length,s=i.length;if(0===a)return i;if(0===s)return t;let n=Math.max(t.length,i.length),o=Array(n);if(r){if(a<2||s<2)return;let r=eX.calcMatMulShape([t[a-2],t[a-1]],[i[s-2],i[s-1]]);if(void 0===r)return;[o[n-2],o[n-1]]=r}for(let u=r?3:1;u<=n;u++){let r=a-u<0?1:t[a-u],l=s-u<0?1:i[s-u];if(r!==l&&r>1&&l>1)return;let d=Math.max(r,l);if(r&&l)o[n-u]=Math.max(r,l);else{if(d>1)return;o[n-u]=0}}return o}static isValidBroadcast(t,i){let r=t.length,a=i.length;if(r>a)return!1;for(let s=1;s<=r;s++)if(1!==t[r-s]&&t[r-s]!==i[a-s])return!1;return!0}},eJ=class t{static size(i){return t.getSizeFromDimensionRange(i,0,i.length)}static convertShape(t,i=4){let r=t.length;if(0===r)return[];let a=Array(r),s=r-1;for(;s>=0;){if(t[s]%i==0){a[s]=t[s]/i;break}if(i%t[s]!=0)throw Error("cannot convert shape");a[s]=1,i/=t[s],s--}for(s--;s>=0;s--)a[s]=t[s];return a}static sizeFromDimension(i,r){if(r<0||r>i.length)throw Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${i.length} dimensions.`);return t.getSizeFromDimensionRange(i,r,i.length)}static sizeToDimension(i,r){if(r<0||r>i.length)throw Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${i.length} dimensions.`);return t.getSizeFromDimensionRange(i,0,r)}static getSizeFromDimensionRange(t,i,r){let a=1;for(let s=i;s<r;s++){if(t[s]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[s])}return a}static computeStrides(t){let i=t.length;if(0===i)return[];if(1===i)return[1];let r=Array(i);r[i-1]=1,r[i-2]=t[i-1];for(let a=i-3;a>=0;--a)r[a]=r[a+1]*t[a+1];return r}static normalizeAxis(t,i){if(t<-i&&t>=i)throw Error("unsupported axis for this operation.");return t<0?t+i:t}static normalizeAxes(t,i){return t.map(r=>this.normalizeAxis(r,i??t.length))}static sortBasedOnPerm(t,i){return i?i.map(i=>t[i]):t.slice().reverse()}static padShape(t,i){let r=t.length;return t.map((t,a)=>t+i[a]+i[a+r])}static areEqual(t,i){return t.length===i.length&&t.every((t,r)=>t===i[r])}},e0=class t{static adjustPoolAttributes(t,i,r,a,s,n){if(!t&&r.length!==i.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let t=0;t<i.length-2;t++)t>=r.length?r.push(i[t+2]):r[t]=i[t+2];for(let t=0;t<r.length;t++)if(t<a.length){if(a[t]<0)throw Error("strides should be greater than or equal to 1")}else a.push(1);for(let t=0;t<r.length;t++)if(t<s.length){if(s[t]<0)throw Error("dilations should be greater than or equal to 1")}else s.push(1);for(let t=0;t<2*r.length;t++)if(t<n.length){if(n[t]<0)throw Error("pad should be greater than or equal to 1")}else n.push(0);for(let t=0;t<r.length;t++){if(r[t]<=0)throw Error("kernel shapes need to be greater than 0");if(n[t]>=r[t]||n[t+r.length]>=r[t])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(i,r,a,s,n,o,u){if(u){if(n.length!==2*(i.length-2))throw Error("length of pads should be twice the length of data dimensions");if(r.length!==i.length-2)throw Error("length of strides should be the length of data dimensions");if(s.length!==i.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<i.length-2;l++)t.adjustPadAndReturnShape(i[l+(o?1:2)],r[l],a[l],s[l],n,l,l+i.length-2,u)}}static computePoolOutputShape(i,r,a,s,n,o,u){if(r.length<=0)throw Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return t.computeShapeHelper(i,r,l,a,s,n,o,u),l}static computeConvOutputShape(i,r,a,s,n,o,u){if(i.length<=0||r.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let l=[i[0],r[0]];return t.computeShapeHelper(!1,i,l,a,s,n,o,u),l}static computeShapeHelper(i,r,a,s,n,o,u,l){if(i)for(let t=0;t<r.length-2;t++)a.push(1);else for(let i=0;i<r.length-2;i++)a.push(t.adjustPadAndReturnShape(r[i+2],s[i],n[i],o[i],u,i,i+r.length-2,l))}static adjustPadAndReturnShape(t,i,r,a,s,n,o,u){let l=r*(a-1)+1;if(!u||"NOTSET"===u)return Math.floor((t+s[n]+s[o]-l)/i+1);switch(u){case"VALID":return s[n]=0,s[o]=0,Math.floor((t-l)/i+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==r)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let r=((t+i-1)/i-1)*i+a-t;return s[n]=Math.floor("SAME_LOWER"===u?(r+1)/2:r/2),s[o]=r-s[n],Math.floor((t+r-a)/i+1)}default:throw Error("Unsupported AutoPad type")}}},e1=class{static getShapeOfGemmResult(t,i,r,a,s){let n,o,u;if(2!==t.length||2!==r.length)throw Error("shape need to be of size 2");i?(n=t[1],o=t[0]):(n=t[0],o=t[1]);let l=-1;if(a?(u=r[0],l=1):(u=r[1],l=0),r[l]!==o)throw Error("dimension mismatch");if(n<=0||u<=0||o<=0)throw Error("invalid shape specified");if(s&&!eY.isValidBroadcast(s,[n,u]))throw Error("gemm: invalid bias shape for broadcast");return[n,u,o]}},e2=-34028234663852886e22,e3=34028234663852886e22}),sf=N(()=>{"use strict";sd(),e4=(t,i)=>new(eN(i))(t)}),sm=N(()=>{"use strict";sd(),sh(),e6=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),e8=(t,i)=>{if("int32"===i)return t;let r=e6.get(i);if(!r)throw Error(`WebNN backend does not support data type: ${i}`);let a=r/8;if(t.byteLength%a!=0)throw Error(`Invalid Uint8Array length - must be a multiple of ${a}.`);let s=t.byteLength/a,n=new(eN(i))(t.buffer,t.byteOffset,s);switch(i){case"int64":case"uint64":{let t=new Int32Array(s);for(let i=0;i<s;i++){let r=n[i];if(r>2147483647n||r<-2147483648n)throw Error("Can not convert int64 data to int32 - value out of range.");t[i]=Number(r)}return new Uint8Array(t.buffer)}case"int8":case"uint8":case"uint32":if("uint32"===i&&n.some(t=>t>0x7fffffff))throw Error("Can not convert uint32 data to int32 - value out of range.");return new Uint8Array(Int32Array.from(n,Number).buffer);default:throw Error(`Unsupported data conversion from ${i} to 'int32'`)}},e5=(t,i)=>{if("int32"===i)return t;if(t.byteLength%4!=0)throw Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=t.byteLength/4,a=new Int32Array(t.buffer,t.byteOffset,r);switch(i){case"int64":return new Uint8Array(BigInt64Array.from(a,BigInt).buffer);case"uint64":if(a.some(t=>t<0))throw Error("Can not convert int32 data to uin64 - negative value found.");return new Uint8Array(BigUint64Array.from(a,BigInt).buffer);case"int8":if(a.some(t=>t<-128||t>127))throw Error("Can not convert int32 data to int8 - value out of range.");return new Uint8Array(Int8Array.from(a,Number).buffer);case"uint8":if(a.some(t=>t<0||t>255))throw Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(a,Number);case"uint32":if(a.some(t=>t<0))throw Error("Can not convert int32 data to uint32 - negative value found.");return new Uint8Array(Uint32Array.from(a,Number).buffer);default:throw Error(`Unsupported data conversion from 'int32' to ${i}`)}},e7=1,e9=()=>e7++,te=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),tt=(t,i)=>{let r=e6.get(t);if(!r)throw Error(`WebNN backend does not support data type: ${t}`);return i.length>0?Math.ceil(i.reduce((t,i)=>t*i)*r/8):0},ti=class{constructor(t){this.isDataConverted=!1;let{sessionId:i,context:r,tensor:a,dataType:s,shape:n,fallbackDataType:o}=t;this.sessionId=i,this.mlContext=r,this.mlTensor=a,this.dataType=s,this.tensorShape=n,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return tt(this.dataType,this.tensorShape)}destroy(){eQ("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){if(!this.fallbackDataType)return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor);{let i=e5(new Uint8Array(await this.mlContext.readTensor(this.mlTensor)),this.dataType);return t?void(t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)).set(i):i.buffer}}canReuseTensor(t,i,r){return this.mlContext===t&&this.dataType===i&&this.tensorShape.length===r.length&&this.tensorShape.every((t,i)=>t===r[i])}setIsDataConverted(t){this.isDataConverted=t}},tr=class{constructor(t,i){this.tensorManager=t,this.wrapper=i}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,i,r,a){let s=this.tensorManager.getMLContext(t),n=this.tensorManager.getMLOpSupportLimits(t),o;if(!n?.input.dataTypes.includes(i)){if(!(o=te.get(i))||n?.input.dataTypes.includes(o))throw Error(`WebNN backend does not support data type: ${i}`);eQ("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${i} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(s,i,r))return this.wrapper.tensor;if(a){if(this.wrapper.byteLength!==tt(i,r))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,i,r,u,!0,!0,o),a&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){let i=t;if(this.wrapper){if(this.wrapper.fallbackType)if("int32"===this.wrapper.fallbackType)i=e8(t,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(t.byteLength===this.wrapper.byteLength)return void this.wrapper.write(i);eQ("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(i):this.activeUpload=new Uint8Array(i)}async download(t){if(this.activeUpload){let i=this.wrapper?.isDataConverted?e5(this.activeUpload,this.wrapper?.type):this.activeUpload;return t?void(t instanceof ArrayBuffer?new Uint8Array(t).set(i):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(i)):i.buffer}if(!this.wrapper)throw Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},ta=class{constructor(t){this.backend=t,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(t){let i=this.backend.getMLContext(t);if(!i)throw Error("MLContext not found for session.");return i}getMLOpSupportLimits(t){return this.backend.getMLOpSupportLimits(t)}reserveTensorId(){let t=e9();return this.tensorTrackersById.set(t,new tr(this)),t}releaseTensorId(t){let i=this.tensorTrackersById.get(t);i&&(this.tensorTrackersById.delete(t),i.tensorWrapper&&this.releaseTensor(i.tensorWrapper))}async ensureTensor(t,i,r,a,s){eQ("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${i}, dataType: ${r}, shape: ${a}, copyOld: ${s}}`);let n=this.tensorTrackersById.get(i);if(!n)throw Error("Tensor not found.");return n.ensureTensor(t,r,a,s)}upload(t,i){let r=this.tensorTrackersById.get(t);if(!r)throw Error("Tensor not found.");r.upload(i)}async download(t,i){eQ("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${i?.byteLength}}`);let r=this.tensorTrackersById.get(t);if(!r)throw Error("Tensor not found.");return r.download(i)}releaseTensorsForSession(t){for(let i of this.freeTensors)i.sessionId===t&&i.destroy();this.freeTensors=this.freeTensors.filter(i=>i.sessionId!==t)}registerTensor(t,i,r,a){let s=this.getMLContext(t),n=e9(),o=new ti({sessionId:t,context:s,tensor:i,dataType:r,shape:a});return this.tensorTrackersById.set(n,new tr(this,o)),this.externalTensors.add(o),n}async getCachedTensor(t,i,r,a,s,n,o){let u=this.getMLContext(t);for(let[a,s]of this.freeTensors.entries())if(s.canReuseTensor(u,i,r)){eQ("verbose",()=>`[WebNN] Reusing tensor {dataType: ${i}, ${o?`fallbackDataType: ${o},`:""} shape: ${r}`);let s=this.freeTensors.splice(a,1)[0];return s.sessionId=t,s}eQ("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${i}, ${o?`fallbackDataType: ${o},`:""} shape: ${r}}`);let l=await u.createTensor({dataType:o??i,shape:r,dimensions:r,usage:a,writable:s,readable:n});return new ti({sessionId:t,context:u,tensor:l,dataType:i,shape:r,fallbackDataType:o})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},ts=(...t)=>new ta(...t)}),sg=N(()=>{"use strict";sd(),sn(),sf(),sm(),sh(),tn=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),to=class{constructor(t){this.tensorManager=ts(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,eZ(t.logLevel,!!t.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(t){eQ("verbose",()=>`[WebNN] onRunStart {sessionId: ${t}}`),this.activeSessionId=t}onRunEnd(t){eQ("verbose",()=>`[WebNN] onRunEnd {sessionId: ${t}}`);let i=this.temporarySessionTensorIds.get(t);if(i){for(let t of i)eQ("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(t),this.activeSessionId=void 0}}async createMLContext(t){if(t instanceof GPUDevice){let i=this.mlContextCache.findIndex(i=>i.gpuDevice===t);if(-1!==i)return this.mlContextCache[i].mlContext;{let i=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:i}),i}}if(void 0===t){let t=this.mlContextCache.findIndex(t=>void 0===t.options&&void 0===t.gpuDevice);if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:t}),t}}let i=this.mlContextCache.findIndex(i=>((t,i)=>{if(t===i)return!0;if(void 0===t||void 0===i)return!1;let r=Object.keys(t).sort(),a=Object.keys(i).sort();return r.length===a.length&&r.every((r,s)=>r===a[s]&&t[r]===i[r])})(i.options,t));if(-1!==i)return this.mlContextCache[i].mlContext;{let i=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:i}),i}}registerMLContext(t,i){this.mlContextBySessionId.set(t,i);let r=this.sessionIdsByMLContext.get(i);r||(r=new Set,this.sessionIdsByMLContext.set(i,r)),r.add(t),this.mlOpSupportLimitsBySessionId.has(t)||this.mlOpSupportLimitsBySessionId.set(t,i.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(t,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(t,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(t){this.sessionGraphInputs.delete(t),this.sessionGraphOutputs.delete(t);let i=this.mlContextBySessionId.get(t);if(!i)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t),this.mlOpSupportLimitsBySessionId.delete(t);let r=this.sessionIdsByMLContext.get(i);if(r.delete(t),0===r.size){this.sessionIdsByMLContext.delete(i);let t=this.mlContextCache.findIndex(t=>t.mlContext===i);-1!==t&&this.mlContextCache.splice(t,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}getMLOpSupportLimits(t){return this.mlOpSupportLimitsBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){eQ("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,i,r,a,s){let n=tn.get(r);if(!n)throw Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t??this.currentSessionId,i,n,a,s)}async createTemporaryTensor(t,i,r){eQ("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${i}, shape: ${r}}`);let a=tn.get(i);if(!a)throw Error(`Unsupported ONNX data type: ${i}`);let s=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(t,s,a,r,!1);let n=this.temporarySessionTensorIds.get(t);return n?n.push(s):this.temporarySessionTensorIds.set(t,[s]),s}uploadTensor(t,i){if(!eE().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");eQ("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${i.byteLength}}`),this.tensorManager.upload(t,i)}async downloadTensor(t,i){return this.tensorManager.download(t,i)}createMLTensorDownloader(t,i){return async()=>{let r=await this.tensorManager.download(t);return e4(r,i)}}registerMLTensor(t,i,r,a){let s=tn.get(r);if(!s)throw Error(`Unsupported ONNX data type: ${r}`);let n=this.tensorManager.registerTensor(t,i,s,a);return eQ("verbose",()=>`[WebNN] registerMLTensor {tensor: ${i}, dataType: ${s}, dimensions: ${a}} -> {tensorId: ${n}}`),n}registerMLConstant(t,i,r,a,s,n,o=!1){if(!n)throw Error("External mounted files are not available.");let u=t;t.startsWith("./")&&(u=t.substring(2));let l=n.get(u);if(!l)throw Error(`File with name ${u} not found in preloaded files.`);if(i+r>l.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(i,i+r).buffer,p;switch(s.dataType){case"float32":p=new Float32Array(d);break;case"float16":p="u">typeof Float16Array&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":o?(p=new Int32Array(e8(new Uint8Array(d),"int64").buffer),s.dataType="int32"):p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw Error(`Unsupported data type: ${s.dataType} in creating WebNN Constant from external data.`)}return eQ("verbose",()=>`[WebNN] registerMLConstant {dataType: ${s.dataType}, shape: ${s.shape}}} ${o?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),a.constant(s,p)}registerGraphInput(t){this.temporaryGraphInputs.push(t)}registerGraphOutput(t){this.temporaryGraphOutputs.push(t)}isGraphInput(t,i){let r=this.sessionGraphInputs.get(t);return!!r&&r.includes(i)}isGraphOutput(t,i){let r=this.sessionGraphOutputs.get(t);return!!r&&r.includes(i)}isGraphInputOutputTypeSupported(t,i,r=!0){let a=tn.get(eU(i)),s=this.mlOpSupportLimitsBySessionId.get(t);return!(typeof a>"u")&&(r?!!s?.input.dataTypes.includes(a):!!s?.output.dataTypes.includes(a))}flush(){}}}),s_=N(()=>{}),sy=N(()=>{"use strict";sh(),s_(),tu=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),tl=[],td=t=>16*Math.ceil(Number(t)/16),tp=1,th=()=>tp++,tc=async(t,i,r,a)=>{let s=td(r),n=t.device.createBuffer({size:s,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=t.getCommandEncoder();t.endComputePass(),o.copyBufferToBuffer(i,0,n,0,s),t.flush(),await n.mapAsync(GPUMapMode.READ);let u=n.getMappedRange();if(!a)return new Uint8Array(u.slice(0,r));{let t=a();return t.set(new Uint8Array(u,0,r)),t}}finally{n.destroy()}},tf=class{constructor(t){for(let[i]of(this.backend=t,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,tu))tl.push(i),this.freeBuffers.set(i,[]),this.freeUniformBuffers.set(i,[]);this.sessionCount=0}upload(t,i){let r=i.buffer,a=i.byteOffset,s=i.byteLength,n=td(s),o=this.storageCache.get(t);if(!o)throw Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==s)throw Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${s}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:n,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(u.getMappedRange()).set(new Uint8Array(r,a,s)),u.unmap();let l=this.backend.device.createCommandEncoder();l.copyBufferToBuffer(u,0,o.gpuData.buffer,0,n),this.backend.device.queue.submit([l.finish()]),u.destroy(),eQ("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,i){let r=this.storageCache.get(t);if(!r)throw Error("source gpu data for memcpy does not exist");let a=this.storageCache.get(i);if(!a)throw Error("destination gpu data for memcpy does not exist");if(r.originalSize!==a.originalSize)throw Error("inconsistent source and destination gpu data size");let s=td(r.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(r.gpuData.buffer,0,a.gpuData.buffer,0,s)}registerExternalBuffer(t,i,r){let a;if(r){if(a=r[0],t===r[1])return eQ("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${i}) => id=${a}, buffer is the same, skip.`),a;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else a=th();return this.storageCache.set(a,{gpuData:{id:a,type:0,buffer:t},originalSize:i}),eQ("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${i}) => id=${a}, registered.`),a}unregisterExternalBuffer(t){void 0!==t&&(this.storageCache.delete(t),eQ("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,i=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=(t=>{for(let i=0;i<tl.length;i++){let r=tl[i];if(t<=r)return r}return 16*Math.ceil(t/16)})(t),a,s=(i&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(i&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(s||n){let t=(s?this.freeBuffers:this.freeUniformBuffers).get(r);a=t&&t.length>0?t.pop():this.backend.device.createBuffer({size:r,usage:i})}else a=this.backend.device.createBuffer({size:r,usage:i});let o={id:th(),type:0,buffer:a};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(t)}),eQ("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${o.id}`),o}get(t){return this.storageCache.get(t)?.gpuData}release(t){let i="bigint"==typeof t?Number(t):t,r=this.storageCache.get(i);if(!r){if(0===this.storageCache.size)return 0;throw Error("releasing data does not exist")}return eQ("verbose",()=>`[WebGPU] GpuDataManager.release(id=${i}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(i),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(t,i){let r=this.storageCache.get(Number(t));if(!r)throw Error("data does not exist");await tc(this.backend,r.gpuData.buffer,r.originalSize,i)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let t of this.buffersPending){let i=tu.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(t.size)||[];void 0===i||r.length>=i?t.destroy():r.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(t.size)||[];void 0===i||r.length>=i?t.destroy():r.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let i of(t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t)),this.buffersPending))t.push(i);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(t=>{t.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let i=this.capturedPendingBuffers.get(t);i&&(i.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,0===this.sessionCount&&(eQ("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},tm=(...t)=>new tf(...t)}),s$=N(()=>{"use strict";tg=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},t_=t=>new tg(t)}),sb=N(()=>{"use strict";sd(),sc(),ty=64,t$=(t,i)=>{if(3===i)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(t)){case 10:return i>1?`vec${i}<f16>`:"f16";case 1:return i>1?`vec${i}<f32>`:"f32";case 6:return i>1?`vec${i}<i32>`:"i32";case 12:return i>1?`vec${i}<u32>`:"u32";case 7:if(i>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(i>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==i)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${t}`)}},tb=(t,i=1)=>{let r=t$(t,i);return"string"==typeof r?r:r[0]},tv=(t,i=1)=>{let r=t$(t,i);return"string"==typeof r?r:r[1]},tw=(...t)=>{let i=[];return t.forEach(t=>{0!==t.length&&i.push({type:12,data:t},{type:12,data:eJ.computeStrides(t)})}),i},tx=t=>t%4==0?4:t%2==0?2:1,tk=(t="f32",i,r="0")=>i&&1!==i?`vec${i}<${t}>(${r})`:`${t}(${r})`,tS=(t,i,r)=>"f32"===t?r:1===i?`f32(${r})`:`vec${i}<f32>(${r})`,tI=(t,i)=>4===i?`(${t}.x + ${t}.y + ${t}.z + ${t}.w)`:2===i?`(${t}.x + ${t}.y)`:3===i?`(${t}.x + ${t}.y + ${t}.z)`:t,tT=(t,i,r,a)=>t.startsWith("uniforms.")&&r>4?"string"==typeof i?"f16"===a?`${t}[(${i}) / 8][(${i}) % 8 / 4][(${i}) % 8 % 4]`:`${t}[(${i}) / 4][(${i}) % 4]`:"f16"===a?`${t}[${Math.floor(i/8)}][${Math.floor(i%8/4)}][${i%8%4}]`:`${t}[${Math.floor(i/4)}][${i%4}]`:r>1?`${t}[${i}]`:t,tz=(t,i,r,a,s)=>{let n,o,u,l,d="number"==typeof r,p=d?r:r.length,h=[...Array(p).keys()],c=p<2?"u32":p<=4?`vec${p}<u32>`:`array<u32, ${p}>`,f=t$(i,s),m="string"==typeof f?f:f[1],g={indices:c,value:m,storage:"string"==typeof f?f:f[0],tensor:i},_=t=>"string"==typeof t?t:`${t}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},$=d?"uniforms.":"",b=`${$}${t}_shape`,v=`${$}${t}_strides`,w="";for(let t=0;t<p-1;t++)w+=`
    let dim${t} = current / ${tT(v,t,p)};
    let rest${t} = current % ${tT(v,t,p)};
    indices[${t}] = dim${t};
    current = rest${t};
    `;w+=`indices[${p-1}] = current;`;let x=p<2?"":`
  fn o2i_${t}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${w}
    return indices;
  }`,k=[];if(p>=2)for(let t=p-1;t>=0;t--)k.push(`${tT(v,t,p)} * (indices[${t}])`);let S=p<2?"":`
  fn i2o_${t}(indices: ${g.indices}) -> u32 {
    return ${k.join("+")};
  }`,I=(...t)=>0===p?"0u":`${g.indices}(${t.map(_).join(",")})`,T=(t,i)=>p<2?`${t}`:`${tT(t,i,p)}`,z={},E=(i,r)=>(()=>{if(g.storage===g.value)return`${t}[${i}]=${r};`;if("vec2<u32>"===g.storage&&"i32"===g.value)return`${t}[${i}]=vec2<u32>(u32(${r}), select(0u, 0xFFFFFFFFu, ${r} < 0));`;if("vec2<u32>"===g.storage&&"u32"===g.value)return`${t}[${i}]=vec2<u32>(u32(${r}), 0u);`;if("u32"===g.storage&&"vec4<bool>"===g.value)return`${t}[${i}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${r}));`;throw Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),C=i=>(()=>{if(g.storage===g.value)return`${t}[${i}]`;if("vec2<u32>"===g.storage&&"i32"===g.value)return`i32(${t}[${i}].x)`;if("vec2<u32>"===g.storage&&"u32"===g.value)return`u32(${t}[${i}].x)`;if("u32"===g.storage&&"vec4<bool>"===g.value)return`vec4<bool>(bool(${t}[${i}] & 0xFFu), bool(${t}[${i}] & 0xFF00u), bool(${t}[${i}] & 0xFF0000u), bool(${t}[${i}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),O=p<2?"":`
  fn get_${t}ByIndices(indices: ${g.indices}) -> ${m} {
    return ${C(`i2o_${t}(indices)`)};
  }`,B=p<2?"":(n=h.map(t=>`d${t}: u32`).join(", "),o=h.map(t=>`d${t}`).join(", "),`
  fn get_${t}(${n}) -> ${m} {
    return get_${t}ByIndices(${I(o)});
  }`),A=p<2?"":`
  fn set_${t}ByIndices(indices: ${g.indices}, value: ${m}) {
    ${E(`i2o_${t}(indices)`,"value")}
  }`,R=p<2?"":(u=h.map(t=>`d${t}: u32`).join(", "),l=h.map(t=>`d${t}`).join(", "),`
  fn set_${t}(${u}, value: ${m}) {
    set_${t}ByIndices(${I(l)}, value);
  }`);return{impl:()=>{let t=[],i=!1;return y.offsetToIndices&&(t.push(x),i=!0),y.indicesToOffset&&(t.push(S),i=!0),y.broadcastedIndicesToOffset&&(Object.values(z).forEach(i=>t.push(i)),i=!0),y.set&&(t.push(R),i=!0),y.setByIndices&&(t.push(A),i=!0),y.get&&(t.push(B),i=!0),y.getByIndices&&(t.push(O),i=!0),!d&&i&&t.unshift(`const ${b} = ${g.indices}(${r.join(",")});`,`const ${v} = ${g.indices}(${eJ.computeStrides(r).join(",")});`),t.join(`
`)},type:g,offsetToIndices:i=>(y.offsetToIndices=!0,p<2?i:`o2i_${t}(${i})`),indicesToOffset:i=>(y.indicesToOffset=!0,p<2?i:`i2o_${t}(${i})`),broadcastedIndicesToOffset:(i,r)=>{y.broadcastedIndicesToOffset=!0;let a=`${r.name}broadcastedIndicesTo${t}Offset`;if(a in z)return`${a}(${i})`;let s=[];for(let t=p-1;t>=0;t--){let i=r.indicesGet("outputIndices",t+r.rank-p);s.push(`${T(v,t)} * (${i} % ${T(b,t)})`)}return z[a]=`fn ${a}(outputIndices: ${r.type.indices}) -> u32 {
             return ${s.length>0?s.join("+"):"0u"};
           }`,`${a}(${i})`},indices:I,indicesGet:T,indicesSet:(t,i,r)=>p<2?`${t}=${r};`:`${tT(t,i,p)}=${r};`,set:(...i)=>{if(i.length!==p+1)throw Error(`indices length must be ${p}`);let r=i[p];if("string"!=typeof r)throw Error("value must be string");let a=i.slice(0,p).map(_).join(",");return 0===p?E("0u",r):1===p?E(a[0],r):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${t}(${a}, ${r})`)},setByOffset:E,setByIndices:(i,r)=>p<2?E(i,r):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${t}ByIndices(${i}, ${r});`),get:(...i)=>{if(i.length!==p)throw Error(`indices length must be ${p}`);let r=i.map(_).join(",");return 0===p?C("0u"):1===p?C(r[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${t}(${r})`)},getByOffset:C,getByIndices:i=>p<2?C(i):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${t}ByIndices(${i})`),usage:a,name:t,strides:v,shape:b,rank:p}},tE=(t,i,r,a=1)=>tz(t,i,r,"input",a),tC=(t,i,r,a=1)=>tz(t,i,r,"output",a),tO=(t,i,r)=>tz(t,i,r,"atomicOutput",1),tB=(t,i,r,a=1)=>tz(t,i,r,"internal",a),tA=class{constructor(t,i){this.normalizedDispatchGroup=t,this.limits=i,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${"number"==typeof t?`${t}u`:t}) { return; }`}mainStart(t=ty){let i="number"==typeof t?t:t[0],r="number"==typeof t?1:t[1],a="number"==typeof t?1:t[2];if(i>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||a>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${i}, ${r}, ${a}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(i*r*a>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${i}, ${r}, ${a}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let s=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],n=s?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,o=s?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${i*r*a}u + local_idx;`;return`@compute @workgroup_size(${i}, ${r}, ${a})
  fn main(${n}) {
    ${o}
  `}appendVariableUniforms(t){0!==t.rank&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,i){if("internal"===t.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let r="input"===t.usage?"read":"read_write",a="atomicOutput"===t.usage?"atomic<i32>":t.type.storage;return`@group(0) @binding(${i}) var<storage, ${r}> ${t.name}: array<${a}>;`}declareVariables(...t){return t.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if("internal"!==t.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(t,i,r=1){return this.uniforms.push({name:t,type:i,length:r}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let t=[];for(let{name:i,type:r,length:a}of this.uniforms)if(a&&a>4)"f16"===r?t.push(`@align(16) ${i}:array<mat2x4<${r}>, ${Math.ceil(a/8)}>`):t.push(`${i}:array<vec4<${r}>, ${Math.ceil(a/4)}>`);else{let s=null==a||1===a?r:`vec${a}<${r}>`;t.push(`${i}:${s}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(0!==this.uniforms.length)return this.uniforms.map(t=>[[12,10,1,6][["u32","f16","f32","i32"].indexOf(t.type)],t.length??1])}},tR=(t,i)=>new tA(t,i)}),sv=N(()=>{"use strict";sd(),sc(),s$(),sb(),tD=(t,i)=>0!==i.length?i:[...Array(t).keys()].reverse(),tM=(t,i)=>{let r,a,s=t.dataType,n=t.dims.length,o=tD(n,i),u=(r=t.dims,a=o,eJ.sortBasedOnPerm(r,tD(r.length,a))),l=t.dims,d=u;if(n<2||((t,i)=>{let r=0;for(let a=0;a<t.length;++a)if(1!==i[t[a]]){if(t[a]<r)return!1;r=t[a]}return!0})(o,t.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let i=eJ.size(u);return{outputs:[{dims:u,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(i/64/4)},programUniforms:[{type:12,data:Math.ceil(i/4)}]}},getShaderSource:t=>{let i=tE("input",s,l,4),r=tC("output",s,d,4);return`
  ${t.registerUniform("output_size","u32").declareVariables(i,r)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:p,newPerm:h}=((t,i)=>{let r=[],a=[];for(let s=0;s<t.length;++s)1!==t[s]&&r.push(t[s]),1!==t[i[s]]&&a.push(i[s]);return{newShape:r,newPerm:a}})(t.dims,o),c=eJ.areEqual(h,[2,3,1]),f=eJ.areEqual(h,[3,1,2]);return 2===p.length||c||f?(d=[(l=c?[p[0],p[1]*p[2]]:f?[p[0]*p[1],p[2]]:p)[1],l[0]],{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let i=eJ.size(u);return{outputs:[{dims:u,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(d[1]/16),y:Math.ceil(d[0]/16)},programUniforms:[{type:12,data:i},...tw(l,d)]}},getShaderSource:t=>{let i=tE("a",s,l.length),r=tC("output",s,d.length);return`
  ${t.registerUniform("output_size","u32").declareVariables(i,r)}
  var<workgroup> tile : array<array<${r.type.value}, 17>, 16>;
  ${t.mainStart([16,16,1])}
    let stride = (uniforms.output_shape[1] - 1) / 16 + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * 16u + local_id.x;
    let input_row = workgroup_id_x * 16u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${i.getByIndices(`${i.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * 16u + local_id.x;
    let output_row = workgroup_id_y * 16u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${r.setByIndices(`${r.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`}}):{name:"Transpose",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>{let i=eJ.size(u);return{outputs:[{dims:u,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...tw(l,d)]}},getShaderSource:t=>{let i=tE("a",s,l.length),r=tC("output",s,d.length);return`
  ${t.registerUniform("output_size","u32").declareVariables(i,r)}

  ${((t,i,r,a)=>{let s=`fn perm(i: ${a.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let r=0;r<i;++r)s+=`a[${t[r]}]=i[${r}];`;return s+"return a;}"})(o,n,i,r)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${r.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${r.setByOffset("global_idx",i.getByIndices("aIndices"))}
  }`}}},tU=(t,i)=>{((t,i)=>{if(!t||1!==t.length)throw Error("Transpose requires 1 input.");if(0!==i.length&&i.length!==t[0].dims.length)throw Error(`perm size ${i.length} does not match input rank ${t[0].dims.length}`)})(t.inputs,i.perm),t.compute(tM(t.inputs[0],i.perm))},tP=t=>t_({perm:t.perm})}),sw=N(()=>{"use strict";sd(),sc(),sb(),sx(),sv(),tq={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},tN={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},tL={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},tV={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},tG=(t,i,r,a)=>{var s,n,o,u,l,d,p;let h,c,f,m,g,_,y,$=1===t.inputs.length?r:t3(t.inputs,r),b=$.axes;0!==b.length||$.noopWithEmptyAxes||(b=t.inputs[0].dims.map((t,i)=>i));let v=eJ.normalizeAxes(b,t.inputs[0].dims.length),w=v,x=t.inputs[0],k=((t,i)=>{let r=[];if(!((t,i)=>{for(let r=0;r<t.length;++r)if(t[t.length-r-1]!==i-1-r)return!1;return!0})(t,i)){for(let a=0;a<i;++a)-1===t.indexOf(a)&&r.push(a);t.forEach(t=>r.push(t))}return r})(w,t.inputs[0].dims.length);k.length>0&&(x=t.compute(tM(t.inputs[0],k),{inputs:[0],outputs:[-1]})[0],w=((t,i)=>{let r=[];for(let a=i-t;a<i;++a)r.push(a);return r})(w.length,x.dims.length));let[S,I]=((t,i)=>{let r=[],a=t.length;for(let s=0;s<a;s++)-1===i.indexOf(s)&&r.push(t[s]);return[r,i.map(i=>t[i])]})(x.dims,w),T=S;$.keepDims&&(T=((t,i)=>{let r=t.length+i.length,a=[],s=0;for(let n=0;n<r;n++)-1===i.indexOf(n)?a.push(t[s++]):a.push(1);return a})(S,v)),t.compute((s=i,n=$.cacheKey,o=[x],u=a,l=t.inputs[0].dataType,d=T,p=I,h=o[0].dims,c=eJ.size(d),f=eJ.size(p),m=tE("_A",o[0].dataType,h),g=tC("output",l,d),_=64,1===c&&(_=256),y=`
          var<workgroup> aBestValues : array<f32, ${_}>;
       `,{name:s,shaderCache:{hint:`${n};${_}`,inputDependencies:["type"]},getShaderSource:t=>`
        ${t.registerUniform("reduceSize","u32").declareVariables(m,g)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${t.mainStart(_)}

          let outputIndex = global_idx / ${_};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${tL[u]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${_}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${tq[u]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${_}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${tN[u]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${g.setByOffset("outputIndex",`${"mean"===u?`${g.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${g.type.storage}(${tV[u]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:d,dataType:l}],dispatchGroup:{x:c},programUniforms:[{type:12,data:f}]})}),{inputs:[x]})},tW=(t,i)=>{tG(t,"ReduceMeanShared",i,"mean")},tH=(t,i)=>{tG(t,"ReduceL1Shared",i,"l1")},tF=(t,i)=>{tG(t,"ReduceL2Shared",i,"l2")},tK=(t,i)=>{tG(t,"ReduceLogSumExpShared",i,"logSumExp")},tj=(t,i)=>{tG(t,"ReduceMaxShared",i,"max")},tZ=(t,i)=>{tG(t,"ReduceMinShared",i,"min")},tQ=(t,i)=>{tG(t,"ReduceProdShared",i,"prod")},tX=(t,i)=>{tG(t,"ReduceSumShared",i,"sum")},tY=(t,i)=>{tG(t,"ReduceSumSquareShared",i,"sumSquare")},tJ=(t,i)=>{tG(t,"ReduceLogSumShared",i,"logSum")}}),sx=N(()=>{"use strict";sd(),sc(),s$(),sb(),sw(),t0=t=>{if(!t||0===t.length||t.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===t.length&&1!==t[1].dims.length)throw Error("Invalid axes input dims.")},t1=t=>["","",`var value = ${t.getByIndices("input_indices")};`,""],t2=(t,i,r,a,s,n,o=!1,u=!1)=>{let l=[],d=r[0].dims,p=d.length,h=eJ.normalizeAxes(s,p),c=!u&&0===h.length;d.forEach((t,i)=>{c||h.indexOf(i)>=0?o&&l.push(1):l.push(t)});let f=l.length,m=eJ.size(l);return{name:t,shaderCache:i,getShaderSource:t=>{let i=[],s=tE("_A",r[0].dataType,p),u=tC("output",n,f),l=a(s,u,h),m=l[2];for(let t=0,r=0;t<p;t++)c||h.indexOf(t)>=0?(o&&r++,m=`for(var j${t}: u32 = 0; j${t} < ${d[t]}; j${t}++) {
                  ${l[2].includes("last_index")?`let last_index = j${t};`:""}
                  ${s.indicesSet("input_indices",t,`j${t}`)}
                  ${m}
                }`):(i.push(`${s.indicesSet("input_indices",t,u.indicesGet("output_indices",r))};`),r++);return`

        ${t.registerUniform("output_size","u32").declareVariables(s,u)}

        ${t.mainStart()}
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${s.type.indices};
          let output_indices = ${u.offsetToIndices("global_idx")};

          ${i.join(`
`)}
          ${l[0]}       // init ops for reduce max/min
          ${l[1]}
          ${m}
          ${l[3]}
          ${4===l.length?u.setByOffset("global_idx","value"):l.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:n}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...tw(d,l)]})}},t3=(t,i)=>{let r=[];return t[1].dims[0]>0&&t[1].getBigInt64Array().forEach(t=>r.push(Number(t))),t_({axes:r,keepDims:i.keepDims,noopWithEmptyAxes:i.noopWithEmptyAxes})},t4=(t,i,r,a)=>{let s=t.inputs,n=1===s.length?r:t3(s,r);t.compute(t2(i,{hint:n.cacheKey,inputDependencies:["rank"]},[s[0]],n.noopWithEmptyAxes&&0===n.axes.length?t1:a,n.axes,s[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},t6=(t,i,r)=>{if(0===i.length)return r;let a=1,s=1;for(let r=0;r<i.length;r++)-1===i.indexOf(r)?a*=t[r]:s*=t[r];return s<32&&a>1024},t8=(t,i)=>{var r,a;t6(t.inputs[0].dims,i.axes,i.noopWithEmptyAxes)?(r=t,a=i,t0(r.inputs),t4(r,"ReduceMean",a,(t,i,a)=>{let s=1;for(let i=0;i<t.rank;i++)(a.indexOf(i)>=0||0===a.length)&&(s*=r.inputs[0].dims[i]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${s});`]})):tW(t,i)},t5=(t,i)=>{var r,a;t6(t.inputs[0].dims,i.axes,i.noopWithEmptyAxes)?(r=t,a=i,t0(r.inputs),t4(r,"ReduceL1",a,(t,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])):tH(t,i)},t7=(t,i)=>{var r,a;t6(t.inputs[0].dims,i.axes,i.noopWithEmptyAxes)?(r=t,a=i,t0(r.inputs),t4(r,"ReduceL2",a,(t,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])):tF(t,i)},t9=(t,i)=>{var r,a;t6(t.inputs[0].dims,i.axes,i.noopWithEmptyAxes)?(r=t,a=i,t0(r.inputs),t4(r,"ReduceLogSumExp",a,(t,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])):tK(t,i)},ie=(t,i)=>{var r,a;t6(t.inputs[0].dims,i.axes,i.noopWithEmptyAxes)?(r=t,a=i,t0(r.inputs),t4(r,"ReduceMax",a,(t,i,r)=>{let a=[];for(let i=0;i<t.rank;i++)(r.indexOf(i)>=0||0===r.length)&&a.push(t.indicesSet("input_indices",i,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})):tj(t,i)},it=(t,i)=>{var r,a;t6(t.inputs[0].dims,i.axes,i.noopWithEmptyAxes)?(r=t,a=i,t0(r.inputs),t4(r,"ReduceMin",a,(t,i,r)=>{let a=[];for(let i=0;i<t.rank;i++)(r.indexOf(i)>=0||0===r.length)&&a.push(`input_indices[${i}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})):tZ(t,i)},ii=(t,i)=>{var r,a;t6(t.inputs[0].dims,i.axes,i.noopWithEmptyAxes)?(r=t,a=i,t0(r.inputs),t4(r,"ReduceProd",a,(t,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])):tQ(t,i)},ir=(t,i)=>{var r,a;t6(t.inputs[0].dims,i.axes,i.noopWithEmptyAxes)?(r=t,a=i,t0(r.inputs),t4(r,"ReduceSum",a,(t,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])):tX(t,i)},ia=(t,i)=>{var r,a;t6(t.inputs[0].dims,i.axes,i.noopWithEmptyAxes)?(r=t,a=i,t0(r.inputs),t4(r,"ReduceSumSquare",a,(t,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])):tY(t,i)},is=(t,i)=>{var r,a;t6(t.inputs[0].dims,i.axes,i.noopWithEmptyAxes)?(r=t,a=i,t0(r.inputs),t4(r,"ReduceLogSum",a,(t,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])):tJ(t,i)}}),sk=N(()=>{"use strict";sd(),s$(),sx(),io=t=>{if(!t||0===t.length||t.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==t[0].dataType)throw Error("Invalid input type.")},iu=(t,i)=>{io(t.inputs),t.compute(t2("ArgMin",{hint:i.cacheKey,inputDependencies:["rank"]},[t.inputs[0]],(t,r,a)=>{let s=[];for(let i=0;i<t.rank;i++)(a.indexOf(i)>=0||0===a.length)&&s.push(`input_indices[${i}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${i.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]},[i.axis],7,i.keepDims),{inputs:[0]})},il=(t,i)=>{io(t.inputs),t.compute(t2("argMax",{hint:i.cacheKey,inputDependencies:["rank"]},[t.inputs[0]],(t,r,a)=>{let s=[];for(let i=0;i<t.rank;i++)(a.indexOf(i)>=0||0===a.length)&&s.push(`input_indices[${i}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${i.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]},[i.axis],7,i.keepDims),{inputs:[0]})},id=t=>t_(t)}),sS=N(()=>{"use strict";sd(),sc(),s_(),sb(),ip=(t,i,r)=>i&&t?`
      let total_sequence_length_input = u32(${i.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${t?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,ih=(t,i,r,a,s,n,o,u,l,d,p,h)=>{var c,f,m,g,_,y,$,b,v,w,x,k,S,I,T,z,E,C,O,B,A,R,D,M,U;let P,q,N,L,V,G,W,H,F,K,j,Z,Q,X,Y,J,ee,et,ei,er,ea,es,en,eo,eu,el,ed,ep,eh,ec,ef,em,eg,e_=Math.min(t.outputCount,1+ +!!o+ +!!u),ey=e_>1?d.pastSequenceLength:0,e$=ey+d.kvSequenceLength,eb=l&&eJ.size(l.dims)>0?l:void 0,ev=[i,r];e_>1&&o&&eJ.size(o.dims)>0&&ev.push(o),eb&&ev.push(eb),p&&ev.push(p),h&&ev.push(h);let ew=t.compute((c=e_,f=i,m=r,g=o,_=eb,y=d,$=ey,b=p,v=h,P=$+y.kvSequenceLength,q=[y.batchSize,y.numHeads,y.sequenceLength,P],N=c>1&&g,L=y.kvNumHeads?y.kvNumHeads:y.numHeads,V=N?[y.batchSize,L,P,y.headSize]:void 0,G=y.nReps?y.nReps:1,W=0===y.scale?1/Math.sqrt(y.headSize):y.scale,H=tx(y.headSize),F=y.headSize/H,K={x:Math.ceil(P/12),y:Math.ceil(y.sequenceLength/12),z:y.batchSize*y.numHeads},j=[{type:12,data:y.sequenceLength},{type:12,data:F},{type:12,data:P},{type:12,data:y.numHeads},{type:12,data:y.headSize},{type:1,data:W},{type:12,data:$},{type:12,data:y.kvSequenceLength},{type:12,data:G}],Z=N&&g&&eJ.size(g.dims)>0,Q=["type","type"],Z&&Q.push("type"),_&&Q.push("type"),b&&Q.push("type"),v&&Q.push("type"),X=[{dims:q,dataType:f.dataType,gpuDataType:0}],N&&X.push({dims:V,dataType:f.dataType,gpuDataType:0}),{name:"AttentionProbs",shaderCache:{hint:`${H};${void 0!==_};${void 0!==g};${c}`,inputDependencies:Q},getRunData:()=>({outputs:X,dispatchGroup:K,programUniforms:j}),getShaderSource:t=>{let i=tE("q",f.dataType,f.dims,H),r=[i,tE("key",m.dataType,m.dims,H)];if(Z){let t=tE("past_key",g.dataType,g.dims,H);r.push(t)}_&&r.push(tE("attention_bias",_.dataType,_.dims));let a=b?tE("seq_lens",b.dataType,b.dims):void 0;a&&r.push(a);let s=v?tE("total_sequence_length_input",v.dataType,v.dims):void 0;s&&r.push(s);let n=tC("output",f.dataType,q),o=[n];N&&o.push(tC("present_key",f.dataType,V,H));let u=tv(1,H);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${i.type.storage}, 144>;
  var<workgroup> tileK: array<${i.type.storage}, 144>;
  ${t.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...r,...o)}
  ${t.mainStart([12,12,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${1===G?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${1===G?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${ip(a,s,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${Z&&N?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${N?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${u}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${Z&&N?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${N?`if (n + local_id.y < present_sequence_length) {
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
        output[outputIdx] = ${n.type.value} (sum * uniforms.alpha) + ${_?"attention_bias[outputIdx]":"0.0"};
    }
  }`}}),{inputs:ev,outputs:e_>1?[-1,1]:[-1]})[0];t.compute((w=ew,x=d.batchSize,k=d.numHeads,S=ey,I=d.sequenceLength,T=e$,z=p,E=h,Y=tx(z?1:T),J=64,(ee=T/Y)<64&&(J=32),et=[{type:12,data:x},{type:12,data:k},{type:12,data:S},{type:12,data:I},{type:12,data:ee},{type:12,data:Math.ceil(T/Y/J)}],ei=tb(w.dataType,Y),er=tv(1,Y),ea=["type"],z&&ea.push("type"),E&&ea.push("type"),{name:"AttentionProbsSoftmax",shaderCache:{hint:`${J};${ei};${Y}`,inputDependencies:ea},getShaderSource:t=>{let i=tC("x",w.dataType,w.dims,Y),r=[i],a=z?tE("seq_lens",z.dataType,z.dims):void 0;a&&r.push(a);let s=E?tE("total_sequence_length_input",E.dataType,E.dims):void 0;s&&r.push(s);let n=tv(w.dataType);return`
  var<workgroup> thread_max: array<f32, ${J}>;
  var<workgroup> thread_sum: array<f32, ${J}>;
  ${t.registerUniforms([{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}]).declareVariables(...r)}
  ${t.mainStart([J,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${ip(a,s,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${J}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${z?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${er}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${er}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(Y){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw Error(`Unsupported components: ${Y}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${J}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${er}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${er}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(Y){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw Error(`Unsupported components: ${Y}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${J}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${i.type.value}(${n}(1.0) / ${n}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${er}(x[offset + i]);
        x[offset + i] = ${i.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${z?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${i.type.value}(${n}(0));
        }`:""};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:I,z:x*k},programUniforms:et})}),{inputs:p&&h?[ew,p,h]:[ew],outputs:[]});let ex=[ew,a];e_>1&&u&&eJ.size(u.dims)>0&&ex.push(u),p&&ex.push(p),h&&ex.push(h),t.compute((C=e_,O=ew,B=a,A=u,R=d,D=ey,M=p,U=h,es=D+R.kvSequenceLength,en=R.nReps?R.nReps:1,eo=R.vHiddenSize*en,eu=C>1&&A,el=R.kvNumHeads?R.kvNumHeads:R.numHeads,ed=eu?[R.batchSize,el,es,R.headSize]:void 0,ep=[R.batchSize,R.sequenceLength,eo],eh={x:Math.ceil(R.vHeadSize/12),y:Math.ceil(R.sequenceLength/12),z:R.batchSize*R.numHeads},ec=[{type:12,data:R.sequenceLength},{type:12,data:es},{type:12,data:R.vHeadSize},{type:12,data:R.numHeads},{type:12,data:R.headSize},{type:12,data:eo},{type:12,data:D},{type:12,data:R.kvSequenceLength},{type:12,data:en}],ef=eu&&A&&eJ.size(A.dims)>0,em=["type","type"],ef&&em.push("type"),M&&em.push("type"),U&&em.push("type"),eg=[{dims:ep,dataType:O.dataType,gpuDataType:0}],eu&&eg.push({dims:ed,dataType:O.dataType,gpuDataType:0}),{name:"AttentionScore",shaderCache:{hint:`${void 0!==A};${C}`,inputDependencies:em},getRunData:()=>({outputs:eg,dispatchGroup:eh,programUniforms:ec}),getShaderSource:t=>{let i=tE("probs",O.dataType,O.dims),r=[i,tE("v",B.dataType,B.dims)];ef&&r.push(tE("past_value",A.dataType,A.dims));let a=M?tE("seq_lens",M.dataType,M.dims):void 0;M&&r.push(a);let s=U?tE("total_sequence_length_input",U.dataType,U.dims):void 0;U&&r.push(s);let n=[tC("output",O.dataType,ep)];return eu&&n.push(tC("present_value",O.dataType,ed)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${i.type.value}, 144>;
  var<workgroup> tileV: array<${i.type.value}, 144>;
  ${t.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...r,...n)}
  ${t.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===en?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===en?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${ip(a,s,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${ef&&eu?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${eu?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${i.type.storage}(0);
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
  }`}}),{inputs:ex,outputs:e_>1?[0,2]:[0]})},ic=(t,i)=>{var r,a;let s,n,o,u,l,d,p,h=((t,i)=>{let r=t[0],a=t[1],s=t[2],n=t[3],o=t[4],u=t[5];if(o&&u)throw Error("Attention cannot have both past and attention_bias");if(3!==r.dims.length)throw Error('Input "input" must have 3 dimensions');let l=r.dims[0],d=r.dims[1],p=r.dims[2];if(1!==s.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==a.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(a.dims[0]!==p)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(s.dims[0]!==a.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=s.dims[0]/3,c=h,f=c;if(i.qkvHiddenSizes.length>0){if(3!==i.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let t of i.qkvHiddenSizes)if(t%i.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");h=i.qkvHiddenSizes[0],c=i.qkvHiddenSizes[1],f=i.qkvHiddenSizes[2]}if(h!==c)throw Error("qkv_hidden_sizes first element should be same as the second");if(s.dims[0]!==h+c+f)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let m=0;if(o){if(c!==f)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==o.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==o.dims[0])throw Error('Input "past" first dimension must be 2');if(o.dims[1]!==l)throw Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==i.numHeads)throw Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==c/i.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');i.pastPresentShareBuffer||(m=o.dims[3])}let g=d+m;if(n)throw Error("Mask not supported");if(o)throw Error("past is not supported");if(u){if(4!==u.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==i.numHeads||u.dims[2]!==d||u.dims[3]!==g)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:d,totalSequenceLength:g,maxSequenceLength:-1,inputHiddenSize:p,hiddenSize:h,vHiddenSize:f,headSize:Math.floor(h/i.numHeads),vHeadSize:Math.floor(f/i.numHeads),numHeads:i.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:i.maskFilterValue,maskType:0,scale:i.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}})(t.inputs,i),[c,f,m]=(r=t,s=[(a=h).batchSize,a.numHeads,a.sequenceLength,a.headSize],n=a.sequenceLength,o=a.inputHiddenSize,u=a.headSize,l={x:Math.ceil(a.headSize/12),y:Math.ceil(a.sequenceLength/12),z:a.batchSize*a.numHeads},d=[r.inputs[0],r.inputs[1],r.inputs[2]],p=[{type:12,data:n},{type:12,data:o},{type:12,data:u},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:a.hiddenSize},{type:12,data:a.hiddenSize+a.hiddenSize+a.vHiddenSize}],r.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:s,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:s,dataType:r.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:p}),getShaderSource:t=>{let i=tC("output_q",d[0].dataType,s),r=tC("output_k",d[0].dataType,s),a=tC("output_v",d[0].dataType,s),n=tE("input",d[0].dataType,d[0].dims),o=tE("weight",d[1].dataType,d[1].dims),u=tE("bias",d[2].dataType,d[2].dims),l=n.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${l}, 144>;
  var<workgroup> tileWeightQ: array<${l}, 144>;
  var<workgroup> tileWeightK: array<${l}, 144>;
  var<workgroup> tileWeightV: array<${l}, 144>;
  ${t.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}]).declareVariables(n,o,u,i,r,a)}
  ${t.mainStart([12,12,1])}
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
  }`}},{inputs:d,outputs:[-1,-1,-1]}));return ih(t,c,f,m,t.inputs[4],void 0,void 0,void 0,t.inputs[5],h)}}),sI=N(()=>{"use strict";eu(),sd(),sc(),s$(),sb(),im=(t,i)=>{let r,{inputs:a,outputCount:s}=t,n=(r={...i,outputCount:s},t_(r));if(f.webgpu.validateInputContent&&((t,i)=>{if(!t||5!==t.length)throw Error("BatchNormalization requires 5 inputs");let r=(t,i,r)=>{let a=i.length;if(a!==t.length)throw Error(`${r}: num dimensions != ${a}`);i.forEach((i,a)=>{if(i!==t[a])throw Error(`${r}: dim[${a}] do not match`)})};if(t[0].dims.length>1){let a="NHWC"===i.format?i.spatial?t[0].dims.slice(-1):t[0].dims.slice(-1).concat(t[0].dims.slice(1,t[0].dims.length-1)):t[0].dims.slice(1,i.spatial?2:void 0);r(t[1].dims,a,"Invalid input scale"),r(t[2].dims,a,"Invalid input B"),r(t[3].dims,a,"Invalid input mean"),r(t[4].dims,a,"Invalid input var")}else r(t[1].dims,[1],"Invalid input scale"),r(t[2].dims,[1],"Invalid input B"),r(t[3].dims,[1],"Invalid input mean"),r(t[4].dims,[1],"Invalid input var")})(a,n),i.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");t.compute(((t,i)=>{let{epsilon:r,spatial:a,format:s}=i,n=t[0].dims,o=a?tx(n[n.length-1]):1,u="NHWC"===s&&n.length>1?o:1,l=eJ.size(n)/o,d=a?n.length:n,p=tE("x",t[0].dataType,t[0].dims,o),h=tE("scale",t[1].dataType,t[1].dims,u),c=tE("bias",t[2].dataType,t[2].dims,u),f=tE("inputMean",t[3].dataType,t[3].dims,u),m=tE("inputVar",t[4].dataType,t[4].dims,u),g=tC("y",t[0].dataType,d,o);return{name:"BatchNormalization",shaderCache:{hint:`${i.epsilon}_${i.format}_${a}_${o}`,inputDependencies:a?["rank","type","type","type","type"]:void 0},getShaderSource:t=>`
  const epsilon = ${r};
  ${t.registerUniform("outputSize","u32").declareVariables(p,h,c,f,m,g)}
  ${t.mainStart()}
  ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${g.offsetToIndices(`global_idx * ${o}`)};
    ${(()=>{let t="";if(a)t=`let cOffset = ${1===n.length?"0u":"NHWC"===s?`outputIndices[${n.length-1}] / ${o}`:"outputIndices[1]"};`;else if("NCHW"===s)t=`
            ${g.indicesSet("outputIndices","0","0")}
            let cOffset = ${g.indicesToOffset("outputIndices")};`;else{t=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let i=1;i<h.rank;i++)t+=`cIndices[${i}] = outputIndices[${i}];`;t+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return t})()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${c.getByOffset("cOffset")};
    let inputMean = ${f.getByOffset("cOffset")};
    let inputVar = ${m.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${g.setByOffset("global_idx","value")}
  }`,getRunData:()=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:a?[{type:12,data:l},...tw(n)]:[{type:12,data:l}]})}})(a,n))}}),sT=N(()=>{"use strict";sc(),sb(),ig=t=>{var i;let r,a,s,n,o,u,l,d;(t=>{if(3!==t[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(t[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==t[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(t[0].dims[2]!==t[1].dims[0])throw Error("last dimension of input and bias are not the same")})(t.inputs),t.compute((r=(i=t.inputs)[0].dims,a=i[0].dims[2],s=eJ.size(r)/4,n=i[0].dataType,o=tE("input",n,r,4),u=tE("bias",n,[a],4),l=tE("residual",n,r,4),d=tC("output",n,r,4),{name:"BiasAdd",getRunData:()=>({outputs:[{dims:r,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:t=>`
  const channels = ${a}u / 4;
  ${t.declareVariables(o,u,l,d)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let value = ${o.getByOffset("global_idx")}
      + ${u.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}))}}),sz=N(()=>{"use strict";sd(),sc(),s$(),sb(),i_=(t,i,r,a,s,n=t.dataType,o,u)=>{let l=[{type:12,data:Math.ceil(eJ.size(t.dims)/4)}];return o&&l.push(...o),{name:i,shaderCache:{hint:s,inputDependencies:["type"]},getShaderSource:i=>{var s,o,l,d,p,h,c;let f,m,g,_,y;return s=i,o=eJ.size(t.dims),l=t.dataType,d=n,p=r,h=a,c=u,f=Math.ceil(o/4),m="",m="string"==typeof p?`${p}(a)`:p("a"),g=tE("inputData",l,[f],4),_=tC("outputData",d,[f],4),y=[{name:"vec_size",type:"u32"}],c&&y.push(...c),`
      ${s.registerUniforms(y).declareVariables(g,_)}

  ${h??""}

  ${s.mainStart()}
    ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${g.getByOffset("global_idx")};
    ${_.setByOffset("global_idx",m)}
  }`},getRunData:i=>({outputs:[{dims:t.dims,dataType:n}],dispatchGroup:{x:Math.ceil(eJ.size(i[0].dims)/64/4)},programUniforms:l})}},iy=t=>{t.compute(i_(t.inputs[0],"Abs","abs"))},i$=t=>{t.compute(i_(t.inputs[0],"Acos","acos"))},ib=t=>{t.compute(i_(t.inputs[0],"Acosh","acosh"))},iv=t=>{t.compute(i_(t.inputs[0],"Asin","asin"))},iw=t=>{t.compute(i_(t.inputs[0],"Asinh","asinh"))},ix=t=>{t.compute(i_(t.inputs[0],"Atan","atan"))},ik=t=>{t.compute(i_(t.inputs[0],"Atanh","atanh"))},iS=t=>t_(t),iI=(t,i)=>{let r;switch(i.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${i.to}`)}t.compute(i_(t.inputs[0],"Cast",r,void 0,i.cacheKey,i.to))},iT=(t,i)=>{let r=i||(t=>{let i,r,a=t.length>=2&&0!==t[1].data,s=t.length>=3&&0!==t[2].data;switch(t[0].dataType){case 1:i=a?t[1].getFloat32Array()[0]:-34028234663852886e22,r=s?t[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:i=a?t[1].getUint16Array()[0]:64511,r=s?t[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return t_({min:i,max:r})})(t.inputs),a=tv(t.inputs[0].dataType);t.compute(i_(t.inputs[0],"Clip",t=>`clamp(${t}, vec4<${a}>(uniforms.min), vec4<${a}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:t.inputs[0].dataType,data:r.min},{type:t.inputs[0].dataType,data:r.max}],[{name:"min",type:a},{name:"max",type:a}]),{inputs:[0]})},iz=t=>{t.compute(i_(t.inputs[0],"Ceil","ceil"))},iE=t=>{t.compute(i_(t.inputs[0],"Cos","cos"))},iC=t=>{t.compute(i_(t.inputs[0],"Cosh","cosh"))},iO=t=>t_(t),iB=(t,i)=>{let r=tv(t.inputs[0].dataType);t.compute(i_(t.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${r}(${i.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,i.cacheKey))},iA=(t="f32")=>`
const r0: ${t} = 0.3275911;
const r1: ${t} = 0.254829592;
const r2: ${t} = -0.284496736;
const r3: ${t} = 1.421413741;
const r4: ${t} = -1.453152027;
const r5: ${t} = 1.061405429;

fn erf_vf32(v: vec4<${t}>) -> vec4<${t}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,iR=t=>{let i=tv(t.inputs[0].dataType);t.compute(i_(t.inputs[0],"Erf",t=>`erf_vf32(${t})`,iA(i)))},iD=t=>{t.compute(i_(t.inputs[0],"Exp","exp"))},iM=t=>{t.compute(i_(t.inputs[0],"Floor","floor"))},iU=t=>{let i=tv(t.inputs[0].dataType);t.compute(i_(t.inputs[0],"Gelu",t=>`0.5 * ${t} * (1.0 + erf_vf32(${t} * 0.7071067811865475))`,iA(i)))},iP=(t,i)=>{let r=tv(t.inputs[0].dataType);t.compute(i_(t.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${i.alpha});`,i.cacheKey))},iq=t=>{t.compute(i_(t.inputs[0],"Not",t=>`!${t}`))},iN=t=>{t.compute(i_(t.inputs[0],"Neg",t=>`-${t}`))},iL=t=>{t.compute(i_(t.inputs[0],"Reciprocal",t=>`1.0/${t}`))},iV=t=>{let i=tv(t.inputs[0].dataType);t.compute(i_(t.inputs[0],"Relu",t=>`select(vec4<${i}>(0.0), ${t}, ${t} > vec4<${i}>(0.0))`))},iG=t=>{t.compute(i_(t.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},iW=t=>t_(t),iH=(t,i)=>{let r=tv(t.inputs[0].dataType);t.compute(i_(t.inputs[0],"HardSigmoid",t=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${i.alpha} * ${t} + vec4<${r}>(${i.beta})))`,void 0,i.cacheKey))},iF=t=>{t.compute(i_(t.inputs[0],"Sin","sin"))},iK=t=>{t.compute(i_(t.inputs[0],"Sinh","sinh"))},ij=t=>{t.compute(i_(t.inputs[0],"Sqrt","sqrt"))},iZ=t=>{t.compute(i_(t.inputs[0],"Tan","tan"))},iQ=t=>`sign(${t}) * (1 - exp(-2 * abs(${t}))) / (1 + exp(-2 * abs(${t})))`,iX=t=>{t.compute(i_(t.inputs[0],"Tanh",iQ))},iY=(t="f32")=>`
const fast_gelu_a: ${t} = 0.5;
const fast_gelu_b: ${t} = 0.7978845608028654;
const fast_gelu_c: ${t} = 0.035677408136300125;

fn tanh_v(v: vec4<${t}>) -> vec4<${t}> {
  return ${iQ("v")};
}
`,iJ=t=>`(fast_gelu_a + fast_gelu_a * tanh_v(${t} * (fast_gelu_c * ${t} * ${t} + fast_gelu_b))) * ${t}`,i0=t=>{let i=tv(t.inputs[0].dataType);t.compute(i_(t.inputs[0],"FastGelu",iJ,iY(i),void 0,t.inputs[0].dataType))},i1=(t,i)=>{let r=tv(t.inputs[0].dataType);return t.compute(i_(t.inputs[0],"ThresholdedRelu",t=>`select(vec4<${r}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${i.alpha});`,i.cacheKey)),0},i2=t=>{t.compute(i_(t.inputs[0],"Log","log"))},i3=t=>`quick_gelu_impl(${t})`,i4=(t,i)=>{let r,a,s=tv(t.inputs[0].dataType);t.compute(i_(t.inputs[0],"QuickGelu",i3,(r=s,a=i.alpha,`
const alpha = vec4<${r}>(${a});
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
`),i.cacheKey,t.inputs[0].dataType))}}),sE=N(()=>{"use strict";sc(),sb(),sz(),i6=t=>{var i;let r,a,s,n,o,u;(t=>{if(3!==t[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(t[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==t[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(t[0].dims[2]!==t[1].dims[0])throw Error("last dimension of input and bias are not the same")})(t.inputs),t.compute(((r=(i=t.inputs)[0].dims.slice())[2]=r[2]/2,a=tE("input",i[0].dataType,i[0].dims,4),s=tE("bias",i[0].dataType,[i[0].dims[2]],4),n=tC("output",i[0].dataType,r,4),o=eJ.size(r)/4,u=tb(i[0].dataType),{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:r,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)}}),getShaderSource:t=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${i[0].dims[2]/4/2}u;

  ${t.declareVariables(a,s,n)}

  ${iA(u)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(o)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}))}}),sC=N(()=>{"use strict";sd(),sc(),sb(),i8=(t,i,r,a,s,n)=>{t.compute(((t,i,r,a,s,n,o=r.dataType)=>{let u=r.dims.map(Number),l=a.dims.map(Number),d=!eJ.areEqual(u,l),p=u,h=eJ.size(u),c=!1,f=!1,m=[d];if(d){let t=eY.calcShape(u,l,!1);if(!t)throw Error("Can't perform binary op on the given tensors");p=t.slice(),h=eJ.size(p);let i=1===eJ.size(u),r=1===eJ.size(l),a=u.length>0&&u[u.length-1]%4==0,s=l.length>0&&l[l.length-1]%4==0;m.push(i),m.push(r),m.push(a),m.push(s);let n=1;for(let t=1;t<p.length;t++){let i=u[u.length-t];if(i===l[l.length-t])n*=i;else break}n%4==0?(f=!0,c=!0):(i||r||a||s)&&(c=!0)}else c=!0;return m.push(c),{name:t,shaderCache:{hint:i+m.map(t=>t.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:t=>((t,i,r,a,s,n,o,u,l,d,p,h)=>{let c,f;"string"==typeof u?c=f=(t,i)=>`${u}((${t}),(${i}))`:"function"==typeof u?c=f=u:(c=u.scalar,f=u.vector);let m=tC("outputData",p,a.length,4),g=tE("aData",l,i.length,4),_=tE("bData",d,r.length,4),y;if(s)if(n){let t=1===eJ.size(i),a=1===eJ.size(r),s=i.length>0&&i[i.length-1]%4==0,n=r.length>0&&r[r.length-1]%4==0;y=t||a?m.setByOffset("global_idx",f(t?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),a?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"))):`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${_.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(o||s?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||n?_.getByOffset("offsetB / 4u"):`${_.type.value}(${_.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=m.setByOffset("global_idx",f(g.getByOffset("global_idx"),_.getByOffset("global_idx")));else{if(!n)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let t=(t,i,r="")=>{let a=`aData[indexA${i}][componentA${i}]`,s=`bData[indexB${i}][componentB${i}]`;return`
            let outputIndices${i} = ${m.offsetToIndices(`global_idx * 4u + ${i}u`)};
            let offsetA${i} = ${g.broadcastedIndicesToOffset(`outputIndices${i}`,m)};
            let offsetB${i} = ${_.broadcastedIndicesToOffset(`outputIndices${i}`,m)};
            let indexA${i} = offsetA${i} / 4u;
            let indexB${i} = offsetB${i} / 4u;
            let componentA${i} = offsetA${i} % 4u;
            let componentB${i} = offsetB${i} % 4u;
            ${t}[${i}] = ${r}(${c(a,s)});
          `};y=9===p?`
            var data = vec4<u32>(0);
            ${t("data",0,"u32")}
            ${t("data",1,"u32")}
            ${t("data",2,"u32")}
            ${t("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${t("outputData[global_idx]",0)}
            ${t("outputData[global_idx]",1)}
            ${t("outputData[global_idx]",2)}
            ${t("outputData[global_idx]",3)}
          `}return`
        ${t.registerUniform("vec_size","u32").declareVariables(g,_,m)}

        ${h??""}

        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`})(t,u,l,p,c,d,f,s,r.dataType,a.dataType,o,n),getRunData:()=>({outputs:[{dims:p,dataType:o}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(eJ.size(p)/4)},...tw(u,l,p)]})}})(i,s??"",t.inputs[0],t.inputs[1],r,a,n))},i5=t=>{i8(t,"Add",(t,i)=>`${t}+${i}`)},i7=t=>{i8(t,"Div",(t,i)=>`${t}/${i}`)},i9=t=>{i8(t,"Equal",{scalar:(t,i)=>`u32(${t}==${i})`,vector:(t,i)=>`vec4<u32>(${t}==${i})`},void 0,void 0,9)},re=t=>{i8(t,"Mul",(t,i)=>`${t}*${i}`)},rt=t=>{let i=tE("input",t.inputs[0].dataType,t.inputs[0].dims).type.value;i8(t,"Pow",{scalar:(t,i)=>`pow_custom(${t},${i})`,vector:(t,i)=>`pow_vector_custom(${t},${i})`},`
    fn pow_custom(a : ${i}, b : ${i}) -> ${i} {
      if (b == ${i}(0.0)) {
        return ${i}(1.0);
      } else if (a < ${i}(0.0) && f32(b) != floor(f32(b))) {
        return ${i}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${i}(1.0), round(f32(abs(b) % ${i}(2.0))) != 1.0) * ${i}(${"i32"===i?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${i}>, b : vec4<${i}>) -> vec4<${i}> {
      // TODO: implement vectorized pow
      return vec4<${i}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},ri=t=>{i8(t,"Sub",(t,i)=>`${t}-${i}`)},rr=t=>{i8(t,"Greater",{scalar:(t,i)=>`u32(${t}>${i})`,vector:(t,i)=>`vec4<u32>(${t}>${i})`},void 0,void 0,9)},ra=t=>{i8(t,"Less",{scalar:(t,i)=>`u32(${t}<${i})`,vector:(t,i)=>`vec4<u32>(${t}<${i})`},void 0,void 0,9)},rs=t=>{i8(t,"GreaterOrEqual",{scalar:(t,i)=>`u32(${t}>=${i})`,vector:(t,i)=>`vec4<u32>(${t}>=${i})`},void 0,void 0,9)},rn=t=>{i8(t,"LessOrEqual",{scalar:(t,i)=>`u32(${t}<=${i})`,vector:(t,i)=>`vec4<u32>(${t}<=${i})`},void 0,void 0,9)}}),sO=N(()=>{"use strict";sd(),sc(),s$(),sb(),ro=(t,i)=>{let r=t.inputs,a=r[0].dims,s=eJ.normalizeAxis(i.axis,a.length);var n=r,o=s;if(!n||n.length<1)throw Error("too few inputs");let u=n[0],l=u.dataType,d=u.dims.length;n.forEach((t,i)=>{if(0!==i){if(t.dataType!==l)throw Error("input tensors should be one type");if(t.dims.length!==d)throw Error("input tensors should have the same shape");t.dims.forEach((t,i)=>{if(i!==o&&t!==u.dims[i])throw Error("non concat dimensions must match")})}});let p=a.slice();p[s]=r.reduce((t,i)=>t+(i.dims.length>s?i.dims[s]:0),0);let h=r.filter(t=>eJ.size(t.dims)>0);t.compute(((t,i,r,a)=>{let s=eJ.size(r),n=Array(t.length),o=Array(t.length),u=0,l=[],d=[],p=[{type:12,data:s}];for(let r=0;r<t.length;++r)u+=t[r].dims[i],n[r]=u,d.push(t[r].dims.length),o[r]=tE(`input${r}`,a,d[r]),l.push("rank"),p.push({type:12,data:n[r]});for(let i=0;i<t.length;++i)p.push(...tw(t[i].dims));p.push(...tw(r));let h=tC("output",a,r.length),c=h.indicesGet("indices",i),f=Array.from(Array(n.length).keys()).map(t=>`uniforms.sizeInConcatAxis${t}`).join(",");return{name:"Concat",shaderCache:{hint:`${i}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:a}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:i=>{let r,a;return`

  ${(()=>{i.registerUniform("outputSize","u32");for(let r=0;r<t.length;r++)i.registerUniform(`sizeInConcatAxis${r}`,"u32");return i.declareVariables(...o,h)})()}

  ${r=n.length,a=f,`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${r}u>(${a});
    for (var i: u32 = 0u; i < ${r}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${r}u;
  }`}

  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${c});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${f});
      ${c} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${((t,i)=>{let r=t.length,a=[];for(let s=0;s<r;++s){let n=i.setByOffset("global_idx",t[s].getByIndices("indices"));1===r?a.push(n):0===s?a.push(`if (inputIndex == ${s}u) { ${n} }`):s===r-1?a.push(`else { ${n} }`):a.push(`else if (inputIndex == ${s}) { ${n} }`)}return a.join(`
`)})(o,h)}
  }`}}})(h,s,p,r[0].dataType),{inputs:h})},ru=t=>t_({axis:t.axis})}),sB=N(()=>{"use strict";sd(),sc(),rl=(t,i,r="f32")=>{switch(t.activation){case"Relu":return`value = max(value, ${i}(0.0));`;case"Sigmoid":return`value = (${i}(1.0) / (${i}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${i}(${r}(uniforms.clip_min)), ${i}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${i}(0.0), min(${i}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${i}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${t.activation}`)}},rd=(t,i)=>{"Clip"===t.activation?i.push({type:1,data:t.clipMax},{type:1,data:t.clipMin}):"HardSigmoid"===t.activation?i.push({type:1,data:t.alpha},{type:1,data:t.beta}):"LeakyRelu"===t.activation&&i.push({type:1,data:t.alpha})},rp=(t,i)=>{"Clip"===t.activation?i.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===t.activation?i.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===t.activation&&i.push({name:"alpha",type:"f32"})},rh=t=>{let i=t?.activation||"";if("HardSigmoid"===i){let[r,a]=t?.activation_params||[.2,.5];return{activation:i,alpha:r,beta:a}}if("Clip"===i){let[r,a]=t?.activation_params||[e2,e3];return{activation:i,clipMax:a,clipMin:r}}if("LeakyRelu"===i){let[r]=t?.activation_params||[.01];return{activation:i,alpha:r}}return{activation:i}}}),sA=N(()=>{"use strict";rc=(t,i)=>{switch(t){case 1:return i;case 2:return`vec2<${i}>`;case 3:return`vec3<${i}>`;case 4:return`vec4<${i}>`;default:throw Error(`${t}-component is not supported.`)}},rf=t=>`
      ${t?"value = value + getBiasByOutputCoords(coords);":""}
      `}),sR=N(()=>{"use strict";rm=t=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${t}.x), i32(${t}.y), i32(${t}.z), 1));
}
`}),sD=N(()=>{"use strict";sd(),sc(),sb(),sB(),rg=(t,i,r,a,s)=>{let n=a-r;return`
      ${Array.from({length:r}).map((r,o)=>`
      if (${tT(i.shape,o,i.rank)} != 1) {
        ${i.indicesSet(t,o,tT(s,o+n,a))}
      } else {
        ${i.indicesSet(t,o,0)}
      }`).join("")}
`},r_=(t,i,r,a,s=!1,n)=>{let o=t[0].dims,u=t[1].dims,l=o[o.length-2],d=u[u.length-1],p=o[o.length-1],h=tx(d),c=tx(p),f=tx(l),m=eJ.size(r)/h/f,g=t.length>2,_=a?a.slice(0,-2):r.slice(0,-2),y=[eJ.size(_),l,d],$=[{type:12,data:m},{type:12,data:l},{type:12,data:d},{type:12,data:p}];return rd(i,$),$.push(...tw(_,o,u)),g&&$.push(...tw(t[2].dims)),$.push(...tw(y)),{name:"MatMulNaive",shaderCache:{hint:`${i.activation};${h};${c};${f};${s}`,inputDependencies:g?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:$}),getShaderSource:a=>{let n=tB("batch_dims",t[0].dataType,_.length),l=tE("a",t[0].dataType,o.length,c),d=tE("b",t[1].dataType,u.length,h),p=tC("output",t[0].dataType,y.length,h),m=tb(p.type.tensor),$=rl(i,p.type.value,m),b=[l,d],v="";if(g){let i=s?h:1;b.push(tE("bias",t[2].dataType,t[2].dims.length,i)),v=`${s?`value += bias[col / ${i}];`:`value += ${p.type.value}(bias[row + i]);`}`}let w=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];return rp(i,w),`
  ${a.registerUniforms(w).registerInternalVariables(n).declareVariables(...b,p)}
  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${2===r.length?"":`let batch_indices = ${n.offsetToIndices("batch")};`}

    var a_indices: ${l.type.indices};
    ${rg("a_indices",l,l.rank-2,n.rank,"batch_indices")}
    ${l.indicesSet("a_indices",l.rank-2,0)}
    ${l.indicesSet("a_indices",l.rank-1,0)}
    let a_offset = ${l.indicesToOffset("a_indices")};

    var b_indices: ${d.type.indices};
    ${rg("b_indices",d,d.rank-2,n.rank,"batch_indices")}
    ${d.indicesSet("b_indices",d.rank-2,0)}
    ${d.indicesSet("b_indices",d.rank-1,0)}
    let b_offset = ${d.indicesToOffset("b_indices")};
    var values: array<${p.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${c}) {
      ${(()=>{let t=`var a_data: ${l.type.value};`;for(let i=0;i<c;i++)t+=`
              let b_data${i} = b[(b_offset + (k + ${i}) * uniforms.N + col) / ${h}];`;for(let i=0;i<f;i++){t+=`a_data = a[(a_offset + (row + ${i}) * uniforms.K + k) / ${c}];`;for(let r=0;r<c;r++)t+=`
            values[${i}] = fma(${d.type.value}(a_data${1===c?"":`[${r}]`}), b_data${r}, values[${i}]);
`}return t})()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${v}
      ${$}
      let cur_indices = ${p.type.indices}(batch, row + i, col);
      let offset = ${p.indicesToOffset("cur_indices")};
      ${p.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `}}}}),sM=N(()=>{"use strict";sd(),sc(),sb(),sB(),sD(),sA(),ry=(t,i,r="f32",a,s=!1,n=32,o=!1,u=32)=>{let l,d,p,h,c=i[1]*t[1],f=i[0]*t[0],m=s?c:n,g=s?n:c,_=m/i[0],y=n/i[1];if(!((s&&4===_&&4===t[1]||!s&&(3===_||4===_))&&m%i[0]==0&&n%i[1]==0&&4===t[0]))throw Error(`If transposeA ${s} is true, innerElementSize ${_} and workPerThread[1] ${t[1]} must be 4.
      Otherwise, innerElementSize ${_} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${i[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${i[1]}. colPerThread ${t[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${_}<${r}>, ${m/_}>, ${g}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${f/t[0]}>, ${n}>;

const rowPerThread = ${t[1]};
const colPerThread = ${t[0]};
const innerElementSize = ${_};
const tileInner = ${n};

@compute @workgroup_size(${i[0]}, ${i[1]}, ${i[2]})
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
  let globalRowStart = i32(workgroupId.y) * ${c};

  let num_tiles = ${o?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${l=s,d=a,l?`
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
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
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
          ${3===_?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${p=s,h=_,p?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${3===h?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${3===h?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${3===h?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},r$=(t,i)=>t?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${i?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${i?", batchIndices":""});
            `,rb=(t,i,r="f32",a,s=!1,n=32,o=!1,u=32,l=!1)=>{let d=t[1]*i[1],p=t[0]*i[0],h=s?d:n,c=s?n:d;if(c%i[1]!=0||h%i[0]!=0||n%i[1]!=0)throw Error(`tileAHight ${c} must be divisible by workgroupSize[1]${i[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${i[0]}, tileInner ${n} must be divisible by workgroupSize[1]${i[1]}`);let f=c/i[1],m=h/i[0],g=n/i[1],_=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${c}; inputRow = inputRow + ${i[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${i[0]}) {
          ${r$(s,a)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${i[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${i[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${a?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${i[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${s?`mm_Asub[k][localRow + innerRow * ${i[1]}];`:`mm_Asub[localRow + innerRow * ${i[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${i[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${i[0]};
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
      ${r$(s,a)}
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
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${s?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];"}
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
  var<workgroup> mm_Asub : array<array<${r}, ${h}>, ${c}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${p}>, ${n}>;
  const rowPerThread = ${t[1]};
  const colPerThread = ${t[0]};
  const tileInner = ${n};

@compute @workgroup_size(${i[0]}, ${i[1]}, ${i[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?"0":"i32(globalId.z)"};
    ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${o?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${_}
  }
`},rv=(t,i,r,a,s=!1,n)=>{let o=t[0].dims,u=t[1].dims,l=o.slice(0,-2),d=u.slice(0,-2),p=a?a.slice(0,-2):r.slice(0,-2),h=eJ.size(p),c=o[o.length-2],f=o[o.length-1],m=u[u.length-1],g=f%4==0&&m%4==0,_=c<=8?[4,1,1]:[4,4,1],y=[8,8,1],$=[Math.ceil(m/y[0]/_[0]),Math.ceil(c/y[1]/_[1]),Math.ceil(h/y[2]/_[2])],b=g?4:1,v=[...l,c,f/b],w=v.length,x=[...d,f,m/b],k=x.length,S=[h,c,m/b],I=[{type:6,data:c},{type:6,data:m},{type:6,data:f}];rd(i,I),I.push(...tw(p,v,x));let T=["rank","rank"],z=t.length>2;return z&&(I.push(...tw(t[2].dims)),T.push("rank")),I.push(...tw(S)),{name:"MatMul",shaderCache:{hint:`${_};${i.activation};${g};${s}`,inputDependencies:T},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:t[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:I}),getShaderSource:r=>{let a=p.length,n=tB("batchDims",t[0].dataType,a,1),o=tb(t[0].dataType),u=tE("a",t[0].dataType,w,b),l=tE("b",t[1].dataType,k,b),d=tC("result",t[0].dataType,S.length,b),h=[u,l];if(z){let i=s?b:1;h.push(tE("bias",t[2].dataType,t[2].dims.length,i))}let c=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];rp(i,c);let f=tb(d.type.tensor),m=((t,i,r,a,s=!1)=>{let[n,o,u,l]=a,d=tb(a[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${rc(t,d)} {
      var value = ${rc(t,d)}(0.0);
      let col = colIn * ${t};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${rg("aIndices",o,o.rank-2,n.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${rc(t,d)} {
      var value = ${rc(t,d)}(0.0);
      let col = colIn * ${t};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${rg("bIndices",u,u.rank-2,n.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${rc(t,d)}) {
      let col = colIn * ${t};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${i?`value = value + ${s?"bias[colIn]":`${rc(t,d)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `})(b,z,rl(i,d.type.value,f),[n,u,l,d],s);return`
  ${r.registerUniforms(c).registerInternalVariables(n).declareVariables(...h,d)}
  ${m}
  ${g?ry(_,y,o,n):rb(_,y,o,n)}
                   `}}}}),sU=N(()=>{"use strict";sd(),sh(),sb(),sB(),sA(),sR(),sM(),rw=(t,i,r,a,s,n,o,u,l)=>{let d="NHWC"===i.format,p=d?t[0].dims[3]:t[0].dims[1],h=r[0],c=d?r[2]:r[3],f=d?r[1]:r[2],m=d?r[3]:r[1],g=d&&(p%4==0||p%3==0)&&m%4==0,_=d?m:c*f,y=d?c*f:m,$=[8,8,1],b=a<=8?[4,1,1]:[4,4,1],v=[Math.ceil(_/$[0]/b[0]),Math.ceil(y/$[1]/b[1]),Math.ceil(h/$[2]/b[2])];eQ("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${v}`);let w=g?d&&p%4!=0?3:4:1,x=$[1]*b[1],k=$[0]*b[0],S=Math.max($[0]*w,$[1]),I=a%x==0,T=s%k==0,z=n%S==0,E=g?[w,4,4]:[1,1,1],C=[{type:6,data:a},{type:6,data:s},{type:6,data:n},{type:6,data:[i.pads[0],i.pads[1]]},{type:6,data:i.strides},{type:6,data:i.dilations}];rd(i,C),C.push(...tw(t[0].dims,t[1].dims));let O=["rank","rank"];return o&&(C.push(...tw(t[2].dims)),O.push("rank")),C.push(...tw(r)),{name:"Conv2DMatMul",shaderCache:{hint:`${i.cacheKey};${w};${g};${I};${T};${z};${x};${k};${S}`,inputDependencies:O},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:t[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:C}),getShaderSource:a=>{let s=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];rp(i,s);let n=g?4:1,l=tb(t[0].dataType),p=`
      fn setOutputAtIndex(flatIndex : i32, value : ${g?`vec4<${l}>`:l}) {
        result[flatIndex] = ${g?`vec4<${l}>`:l}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${g?`vec4<${l}>`:l}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${g?"/ 4":""}, value);
      }`,h=[tE("x",t[0].dataType,t[0].dims.length,3===w?1:w),tE("w",t[1].dataType,t[1].dims.length,n)],c=tC("result",t[0].dataType,r.length,n);if(o){let i=tE("bias",t[2].dataType,t[2].dims.length,n);h.push(i),p+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${g?`vec4<${l}>`:l} {
          return bias[coords.${d?"w":"y"}${g?"/ 4":""}];
        }`}return`
        ${rm("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${a.registerUniforms(s).declareVariables(...h,c)}
        ${p}
        ${((t,i,r,a,s=!1,n,o=4,u=4,l=4,d="f32")=>{let p=t=>{switch(t){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${t} is not supported.`)}},h=t?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,c=t?`
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
    `,f=t?"row":"col",m=t?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${f} / outWidth;
    let outCol = ${f} % outWidth;

    let WRow = ${m} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${m} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${m} % inChannels;
    var resData = ${rc(o,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${t?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])"} && xCol >= 0 && xCol < ${t?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])"}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${(t=>{switch(t){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw Error(`innerElementSize ${t} is not supported.`)}})(o)}
    }
    return resData;`,_=t?i&&a?`
    let col = colIn * ${o};
    ${g}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${rc(o,d)}(0.0);`:a&&r?`
    let col = colIn * ${o};
    ${g}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${rc(o,d)}(0.0);`,y=t?a&&r?p(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(u)}
    }
    return ${rc(u,d)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(u)}
    }
    return ${rc(u,d)}(0.0);`,$=rc(l,d),b=t?rc(o,d):rc(u,d),v=t?rc(u,d):rc(o,d),w=rl(n,$,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${b} {
      ${t?_:y}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${v} {
      ${t?y:_}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${$}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${c}
      ${rf(s)}
      ${w}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`})(d,I,T,z,o,i,E[0],E[1],E[2],l)}
        ${g?ry(b,$,l,void 0,!d,S):rb(b,$,l,void 0,!d,S,!1,void 0,u)}`}}}}),sP=N(()=>{"use strict";sd(),sh(),sc(),sb(),sB(),sA(),rx=t=>"number"==typeof t?[t,t,t]:t,rk=(t,i)=>i<=1?t:t+(t-1)*(i-1),rS=(t,i,r,a,s)=>{null==s&&(s=((t,i,r,a=1)=>{let s=rk(i,a);return Math.floor((t[0]*(r-1)-r+s)/2)})(t,i[0],a[0]));let n=[0,0,0,r];for(let r=0;r<3;r++)t[r]+2*s>=i[r]&&(n[r]=Math.trunc((t[r]-i[r]+2*s)/a[r]+1));return n},rI=(t,i,r,a,s,n=!1,o="channelsLast")=>{let u,l,d,p,h;if("channelsLast"===o)[u,l,d,p,h]=t;else if("channelsFirst"===o)[u,h,l,d,p]=t;else throw Error(`Unknown dataFormat ${o}`);let[c,,f,m,g]=i,[_,y,$]=rx(r),[b,v,w]=rx(a),x=rk(f,b),k=rk(m,v),S=rk(g,w),{padInfo:I,outDepth:T,outHeight:z,outWidth:E}=((t,i,r,a,s,n,o,u,l,d)=>{let p,h,c,f;if("VALID"===t&&(t=0),"number"==typeof t){p={top:t,bottom:t,left:t,right:t,front:t,back:t};let m=rS([i,r,a,1],[u,l,d],1,[s,n,o],t);h=m[0],c=m[1],f=m[2]}else if(Array.isArray(t)){if(!t.every((t,i,r)=>t===r[0]))throw Error(`Unsupported padding parameter: ${t}`);p={top:t[0],bottom:t[1],left:t[2],right:t[3],front:t[4],back:t[5]};let m=rS([i,r,a,1],[u,l,d],1,[s,n,o],t[0]);h=m[0],c=m[1],f=m[2]}else if("SAME_UPPER"===t){h=Math.ceil(i/s),c=Math.ceil(r/n),f=Math.ceil(a/o);let t=(h-1)*s+u-i,m=(c-1)*n+l-r,g=(f-1)*o+d-a,_=Math.floor(t/2),y=Math.floor(m/2),$=Math.floor(g/2);p={top:y,bottom:m-y,left:$,right:g-$,front:_,back:t-_}}else throw Error(`Unknown padding parameter: ${t}`);return{padInfo:p,outDepth:h,outHeight:c,outWidth:f}})(s,l,d,p,_,y,$,x,k,S),C=n?c*h:c,O=[0,0,0,0,0];return"channelsFirst"===o?O=[u,C,T,z,E]:"channelsLast"===o&&(O=[u,T,z,E,C]),{batchSize:u,dataFormat:o,inDepth:l,inHeight:d,inWidth:p,inChannels:h,outDepth:T,outHeight:z,outWidth:E,outChannels:C,padInfo:I,strideDepth:_,strideHeight:y,strideWidth:$,filterDepth:f,filterHeight:m,filterWidth:g,effectiveFilterDepth:x,effectiveFilterHeight:k,effectiveFilterWidth:S,dilationDepth:b,dilationHeight:v,dilationWidth:w,inShape:t,outShape:O,filterShape:i}},rT=(t,i,r,a,s,n)=>{let o="channelsLast"===n,u=(o?t[0].dims[3]:t[0].dims[1],[Math.ceil((t=>{let i=1;for(let r=0;r<t.length;r++)i*=t[r];return i})(({x:r.map((t,i)=>i)}).x.map(t=>r[t]))/64),1,1]);eQ("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let l=[{type:12,data:eJ.size(r)},{type:12,data:a},{type:12,data:s},{type:12,data:i.strides},{type:12,data:i.dilations}];rd(i,l),l.push(...tw(t[0].dims,t[1].dims));let d=["rank","rank"],p=3===t.length;return p&&(l.push(...tw(t[2].dims)),d.push("rank")),l.push(...tw(r)),{name:"Conv3DNaive",shaderCache:{hint:`${i.cacheKey};${o};1;${p}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:l}),getShaderSource:n=>{let u=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:a.length},{name:"pads",type:"u32",length:s.length},{name:"strides",type:"u32",length:i.strides.length},{name:"dilations",type:"u32",length:i.dilations.length}];rp(i,u);let l=tb(t[0].dataType),d=tE("x",t[0].dataType,t[0].dims.length,1),h=tE("W",t[1].dataType,t[1].dims.length,1),c=[d,h],f=tC("result",t[0].dataType,r.length,1),m="";if(p){let i=tE("bias",t[2].dataType,t[2].dims.length,1);c.push(i),m+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l} {
          return bias[${o?tT("coords",4,5):tT("coords",1,5)}];
        }`}let g=rc(1,l),_=rl(i,g,l);return`
            ${m}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${d.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${h.getByIndices("aIndices")};
            }
          ${n.registerUniforms(u).declareVariables(...c,f)}
          ${n.mainStart()}
          ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${f.offsetToIndices("global_idx")};
              let batch = ${tT("coords",0,d.rank)};
              let d2 = ${o?tT("coords",d.rank-1,d.rank):tT("coords",1,d.rank)};
              let xFRCCorner = vec3<u32>(${o?tT("coords",1,d.rank):tT("coords",2,d.rank)},
              ${o?tT("coords",2,d.rank):tT("coords",3,d.rank)},
              ${o?tT("coords",3,d.rank):tT("coords",4,d.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?tT("uniforms.x_shape",1,d.rank):tT("uniforms.x_shape",2,d.rank)};
              let xShapeZ = ${o?tT("uniforms.x_shape",2,d.rank):tT("uniforms.x_shape",3,d.rank)};
              let xShapeW = ${o?tT("uniforms.x_shape",3,d.rank):tT("uniforms.x_shape",4,d.rank)};
              let xShapeU = ${o?tT("uniforms.x_shape",4,d.rank):tT("uniforms.x_shape",1,d.rank)};
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
              ${_}
              result[global_idx] = f32(value);
          }`}}}}),sq=N(()=>{"use strict";sd(),sc(),sb(),sB(),rz=(t,i,r,a)=>{let s=t.length>2,n=s?"value += b[output_channel];":"",o=t[0].dims,u=t[1].dims,l="NHWC"===i.format,d=l?r[3]:r[1],p=d/i.group,h=l&&p>=4?tx(d):1,c=eJ.size(r)/h,f=[{type:12,data:c},{type:12,data:i.dilations},{type:12,data:[i.strides[0],i.strides[1]]},{type:12,data:[i.pads[0],i.pads[1]]},{type:12,data:p}];return rd(i,f),f.push(...tw(o,[u[0],u[1],u[2],u[3]/h])),f.push(...tw([r[0],r[1],r[2],r[3]/h])),{name:"GroupedConv",shaderCache:{hint:`${i.cacheKey}_${h}`,inputDependencies:s?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:f}),getShaderSource:a=>{let d=tC("output",t[0].dataType,r.length,h),p=tb(d.type.tensor),c=rl(i,d.type.value,p),f=tE("x",t[0].dataType,o.length),m=tE("w",t[1].dataType,u.length,h),g=[f,m];s&&g.push(tE("b",t[2].dataType,t[2].dims,h));let _=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:i.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];rp(i,_);let y=l?`
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
  ${a.registerUniforms(_).declareVariables(...g,d)}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${d.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${d.type.value} = ${d.type.value}(0);
    ${y}
    ${n}
    ${c}
    ${d.setByOffset("global_idx","value")}
  }`}}},rE=(t,i,r,a)=>{let s=t.length>2,n=tx(r[3]),o=tx(r[2]),u=eJ.size(r)/n/o,l=[t[0].dims[0],t[0].dims[1],t[0].dims[2],t[0].dims[3]/n],d=[t[1].dims[0],t[1].dims[1],t[1].dims[2],t[1].dims[3]/n],p=[r[0],r[1],r[2],r[3]/n],h=[{type:12,data:u},{type:6,data:[i.strides[0],i.strides[1]]},{type:6,data:[i.pads[0],i.pads[1]]}];rd(i,h),h.push(...tw(l,d,p));let c=(o-1)*i.strides[1]+d[1];return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${i.cacheKey};${n};${o};${c};${d[0]};${d[1]}`,inputDependencies:s?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h}),getShaderSource:r=>{let a=tC("output",t[0].dataType,p.length,n),u=tb(a.type.tensor),h=rl(i,a.type.value,u),f=tE("x",t[0].dataType,l.length,n),m=tE("w",t[1].dataType,d.length,n),g=[f,m];s&&g.push(tE("b",t[2].dataType,t[2].dims,n));let _=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return rp(i,_),`
  ${r.registerUniforms(_).declareVariables(...g,a)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${f.type.value}, ${c}>;
    var values: array<${a.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${c}; i++) {
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
      ${s?"value += b[output_channel];":""}
      ${h}
      ${a.set("batch","row","col + i","output_channel","value")};
    }
  }`}}}}),sN=N(()=>{"use strict";sc(),sU(),sP(),sM(),sq(),sB(),sD(),sv(),rC=[2,3,1,0],rO=(t,i)=>{let r=t.kernelShape.slice();r.length<i[1].dims.length-2&&r.push(...Array(i[1].dims.length-2-r.length).fill(0));for(let t=2;t<i[1].dims.length;++t)0===r[t-2]&&(r[t-2]=i[1].dims[t]);let a=t.pads.slice();e0.adjustPadsBasedOnAutoPad(i[0].dims,t.strides,t.dilations,r,a,"NHWC"===t.format,t.autoPad);let s=Object.assign({},t);return Object.assign(s,{kernelShape:r,pads:a}),s},rB=t=>{let i=rh(t),r=t.format;return{autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][t.auto_pad],format:r,dilations:t.dilations,group:t.group,kernelShape:t.kernel_shape,pads:t.pads,strides:t.strides,wIsConst:t.w_is_const(),...i,cacheKey:`${t.format};${i.activation};`}},rA=(t,i,r,a)=>{var s,n,o,u,l,d;let p,h,c,f,m,g,_="NHWC"===r.format,y=(s=i[0].dims,n=i[1].dims,o=r.dilations,u=r.pads,l=r.strides,d=_,p=s[0],c=(h=s.slice(d?1:2,d?3:4)).length,f=n[0],m=n.slice(2).map((t,i)=>t+(t-1)*(o[i]-1)),(g=h.map((t,i)=>t+u[i]+u[i+c]).map((t,i)=>Math.floor((t-m[i]+l[i])/l[i]))).splice(0,0,p),g.splice(d?3:1,0,f),g);if(1!==r.group){let s=[i[0]];if(_){let a=t.kernelCustomData.wT??t.compute(tM(i[1],rC),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=a),s.push(a)}else s.push(i[1]);3===i.length&&s.push(i[2]),!t.adapterInfo.isArchitecture("ampere")&&_&&i[1].dims[0]===r.group&&1===i[1].dims[1]&&1===r.dilations[0]&&1===r.dilations[1]?t.compute(rE(s,r,y,a),{inputs:s}):t.compute(rz(s,r,y,a),{inputs:s});return}let $=3===i.length,b=i[0].dims[_?1:2],v=i[0].dims[_?2:3],w=i[0].dims[_?3:1],x=i[1].dims[2],k=i[1].dims[3],S=y[_?1:2],I=y[_?2:3],T=y[_?3:1],z=_&&x===b&&k===v&&0===r.pads[0]&&0===r.pads[1];if(z||1===x&&1===k&&1===r.dilations[0]&&1===r.dilations[1]&&1===r.strides[0]&&1===r.strides[1]&&0===r.pads[0]&&0===r.pads[1]){let s=y[0],n,o,u,l=[];if(_){let a=t.kernelCustomData.wT??t.compute(tM(i[1],rC),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=a),z){let t=b*v*w;n=i[0].reshape([1,s,t]),o=a.reshape([1,t,T]),u=[1,s,T]}else n=i[0].reshape([s,b*v,w]),o=a.reshape([1,w,T]),u=[s,S*I,T];l.push(n),l.push(o)}else n=i[0].reshape([s,w,b*v]),o=i[1].reshape([1,T,w]),u=[s,T,S*I],l.push(o),l.push(n);$&&l.push(i[2]);let d=u[2],p=l[0].dims[l[0].dims.length-1];d<8&&p<8?t.compute(r_(l,r,y,u,_,a),{inputs:l}):t.compute(rv(l,r,y,u,_,a),{inputs:l});return}let E=t.kernelCustomData.wT??t.compute(tM(i[1],rC),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=E);let C=[i[0],E];$&&C.push(i[2]);let O=_?S*I:T,B=_?T:S*I,A=x*k*w;t.compute(rw(C,r,y,O,B,A,$,!0,a),{inputs:C})},rR=(t,i)=>{var r,a,s,n,o;if(((t,i)=>{if(!t||2!==t.length&&3!==t.length)throw Error("Conv requires 2 or 3 inputs");if(t[0].dims.length>5)throw Error("greater than 5D is not supported");if(t[0].dims.length!==t[1].dims.length)throw Error("filter does not have same dimension as input");if(t[0].dims["NHWC"===i.format?t[0].dims.length-1:1]!==t[1].dims[1]*i.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===t.length&&(1!==t[2].dims.length||t[1].dims[0]!==t[2].dims[0]))throw Error("invalid bias");let r=t[0].dims.length-2;if(i.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(i.strides.length!==r)throw Error(`strides should be ${r}D`);if(i.pads.length!==2*r)throw Error(`pads should be ${2*r}D`);if(0!==i.kernelShape.length&&i.kernelShape.length!==t[1].dims.length-2)throw Error("invalid kernel shape")})(t.inputs,i),3===t.inputs[0].dims.length){let s,n,o,u,l,d,p;r=t,s="NHWC"===(a=i).format,n=[r.inputs[0].reshape(s?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])],3===r.inputs.length&&n.push(r.inputs[2]),o=[0,a.pads[0],0,a.pads[1]],u=[1].concat(a.strides),l=[1].concat(a.dilations),d=[1].concat(a.kernelShape),p=rO({...a,pads:o,strides:u,dilations:l,kernelShape:d},n),rA(r,n,p,t=>s?[t[0],t[2],t[3]]:[t[0],t[1],t[3]])}else if(5===t.inputs[0].dims.length){let r,a,u,l;s=t,n=t.inputs,r="NHWC"===(o=i).format?"channelsLast":"channelsFirst",a=rO(o,n),u="NOTSET"===o.autoPad?o.pads:o.autoPad,l=rI(n[0].dims,n[1].dims,o.strides,o.dilations,u,!1,r),s.compute(rT(n,a,l.outShape,[l.filterDepth,l.filterHeight,l.filterWidth],[l.padInfo.front,l.padInfo.top,l.padInfo.left],r))}else{let r=rO(i,t.inputs);rA(t,t.inputs,r)}}}),sL=N(()=>{"use strict";sd(),sh(),sc(),sb(),rD=(t,i,r)=>{let a=t.length>2,s=i.outputShape,n="NHWC"===i.format,o=i.group,u=t[1].dims,l=u[2]/o,d=u[3],p=n?tx(l):1,h=n&&1===d&&l>=4,c=h?4*Math.floor(l/4):Math.floor(l/p)*p,f=l-c,m=n?tx(d):1,g=n?1===d?p:m:1,_=eJ.size(s)/m,y=[Math.ceil(_/64),1,1];eQ("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${y}`);let $=["rank","rank"],b=[i.strides[0],i.strides[1]],v=[i.kernelShape[n?1:2],i.kernelShape[n?2:3]],w=[i.dilations[0],i.dilations[1]],x=[v[0]+(i.dilations[0]<=1?0:(i.kernelShape[n?1:2]-1)*(i.dilations[0]-1)),v[1]+(i.dilations[1]<=1?0:(i.kernelShape[n?2:3]-1)*(i.dilations[1]-1))],k=[x[0]-1-Math.floor((i.pads[0]+i.pads[2])/2),x[1]-1-Math.floor((i.pads[1]+i.pads[3])/2)],S=[{type:12,data:_},{type:12,data:b},{type:12,data:v},{type:12,data:w},{type:12,data:x},{type:6,data:k},{type:12,data:c},{type:12,data:l},{type:12,data:d},...tw(t[0].dims,t[1].dims)];return a&&(S.push(...tw(t[2].dims)),$.push("rank")),S.push(...tw(s)),{name:"ConvTranspose2D",shaderCache:{hint:`${i.cacheKey};${p}${g}${m}${h}${f}`,inputDependencies:$},getRunData:()=>({dispatchGroup:{x:y[0],y:y[1],z:y[2]},outputs:[{dims:r?r(s):s,dataType:t[0].dataType}],programUniforms:S}),getShaderSource:i=>{let r=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:b.length},{name:"filter_dims",type:"u32",length:v.length},{name:"dilations",type:"u32",length:v.length},{name:"effective_filter_dims",type:"u32",length:x.length},{name:"pads",type:"i32",length:k.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],o=tb(t[0].dataType),u=n?1:2,l=n?2:3,d=n?3:1,c=tE("W",t[1].dataType,t[1].dims.length,g),_=tE("Dy",t[0].dataType,t[0].dims.length,p),y=[_,c];a&&y.push(tE("bias",t[2].dataType,[s[d]].length,m));let $=tC("result",t[0].dataType,s.length,m),w=`
            let outputIndices = ${$.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${$.indicesGet("outputIndices",0)};
            let d1 = ${$.indicesGet("outputIndices",d)};
            let r = ${$.indicesGet("outputIndices",u)};
            let c = ${$.indicesGet("outputIndices",l)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${$.type.value}(0.0);
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
                ${h?`
                var x_offset = ${_.indicesToOffset(`${_.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${c.indicesToOffset(`${c.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${g};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${h?4:p}) {
                  ${(()=>{let t="";if(h)4===p?t+=`
        let xValue = ${_.getByOffset("x_offset")};
        let wValue = ${c.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:2===p?t+=`
          dotProd = dotProd + dot(vec4<${o}>(${_.getByOffset("x_offset")}, ${_.getByOffset("x_offset + 1u")}), vec4<${o}>(${c.getByOffset("w_offset")}, ${c.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:1===p&&(t+=`
          dotProd = dotProd + dot(vec4<${o}>(${_.getByOffset("x_offset")}, ${_.getByOffset("x_offset + 1u")}, ${_.getByOffset("x_offset + 2u")}, ${_.getByOffset("x_offset + 3u")}), vec4<${o}>(${c.getByOffset("w_offset")}, ${c.getByOffset("w_offset + 1u")}, ${c.getByOffset("w_offset + 2u")}, ${c.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(t+=`
                  let xValue = ${n?_.getByOffset(`${_.indicesToOffset(`${_.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):_.get("batch","inputChannel","idyR","idyC")};
        `,1===p)t+=`
          let w_offset = ${c.indicesToOffset(`${c.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${c.getByOffset(`w_offset / ${g}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let i=0;i<p;i++)t+=`
            let wValue${i} = ${c.getByOffset(`${c.indicesToOffset(`${c.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${i}, wOutChannel)`)} / ${g}`)};
            dotProd = dotProd + xValue[${i}] * wValue${i};`;return t})()}
                  inputChannel = inputChannel + ${h?4:p};
                }
                ${(()=>{if(0===f)return"";if(!h)throw Error(`packInputAs4 ${h} is not true.`);let t="";if(1===p){t+="dotProd = dotProd";for(let i=0;i<f;i++)t+=`
            + ${_.getByOffset(`x_offset + ${i}`)} * ${c.getByOffset(`w_offset + ${i}`)}`;t+=";"}else if(2===p){if(2!==f)throw Error(`Invalid inputChannelsRemainder ${f}.`);t+=`
          let xValue = ${_.getByOffset("x_offset")};
          let wValue = ${c.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return t})()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${a?` + bias[d1 / ${m}]`:""};
            ${$.setByOffset("global_idx","value")};
          `;return`
    ${i.registerUniforms(r).declareVariables(...y,$)}
      ${i.mainStart()}
      ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${w}}`}}}}),sV=N(()=>{"use strict";sL(),sB(),sv(),rM=(t,i,r,a,s,n)=>(t-1)*i+r+(a-1)*s+1-n,rU=(t,i,r,a,s)=>{let n=Math.floor(t/2);"SAME_UPPER"===i?(r[a]=n,r[s]=t-n):"SAME_LOWER"===i&&(r[a]=t-n,r[s]=n)},rP=(t,i)=>{let r=t.kernelShape.slice();if(0===t.kernelShape.length||0===t.kernelShape.reduce((t,i)=>t*i,1)){r.length=0;for(let t=2;t<i[1].dims.length;++t)r.push(i[1].dims[t])}let a="NHWC"===t.format;r.splice(0,0,i[1].dims[0]),r.splice(a?3:1,0,i[1].dims[1]);let s=t.pads.slice(),n=t.outputShape.slice(),o=t.outputPadding.slice(),u=i[0].dims,l=t.dilations.slice();0===l.reduce((t,i)=>t+i,0)&&(l=Array(i[0].dims.length-2).fill(1));let d=t.strides.slice();0===d.reduce((t,i)=>t+i,0)&&(d=Array(i[0].dims.length-2).fill(1)),((t,i,r,a,s,n,o,u,l,d)=>{let p=t.length-2,h=0===d.length;l.length<p&&l.push(...Array(p-l.length).fill(0));let c=t[0],f=i[u?3:1]*s;for(let s=0,c=t.length-p-!!u;s<p;++s,++c){let u=t[c],f=h?u*o[s]:d[s];rU(rM(u,o[s],n[s],i[c],r[s],f),a,n,s,s+p),h&&d.push(o[s]*(u-1)+l[s]+(i[c]-1)*r[s]+1-n[s]-n[s+p])}d.splice(0,0,c),d.splice(u?3:1,0,f)})(u,r,l,t.autoPad,t.group,s,d,a,o,n);let p=Object.assign({},t);return Object.assign(p,{kernelShape:r,pads:s,outputPadding:o,outputShape:n,dilations:l,strides:d}),p},rq=t=>{let i=rh(t),r=t.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof t.autoPad>"u"?0:t.autoPad],s=t.dilations,n=t.group??1,o=t.kernelShape,u=t.pads,l=t.strides,d=t.wIsConst();return{autoPad:a,format:r,dilations:s,group:n,kernelShape:o,outputPadding:t.outputPadding,outputShape:t.outputShape,pads:u,strides:l,wIsConst:d,...i,cacheKey:`${t.format};${i.activation};`}},rN=(t,i,r,a)=>{let s=t.kernelCustomData.wT??t.compute(tM(i[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=s);let n=[i[0],s];3===i.length&&n.push(i[2]),t.compute(rD(n,r,a),{inputs:n})},rL=(t,i)=>{if(((t,i)=>{if(!t||2!==t.length&&3!==t.length)throw Error("Conv requires 2 or 3 inputs");if(4!==t[0].dims.length&&3!==t[0].dims.length)throw Error("currently only support 2-dimensional conv");if(t[0].dims.length!==t[1].dims.length)throw Error("filter does not have same dimension as input");if(t[0].dims["NHWC"===i.format?t[0].dims.length-1:1]!==t[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let r=t[1].dims[1]*i.group;if(3===t.length&&(1!==t[2].dims.length||t[2].dims[0]!==r))throw Error("invalid bias");let a=t[0].dims.length-2;if(i.dilations.reduce((t,i)=>t+i,0)>0&&i.dilations.length!==a)throw Error(`dilations should be ${a}D`);if(i.strides.reduce((t,i)=>t+i,0)>0&&i.strides.length!==a)throw Error(`strides should be ${a}D`);if(i.pads.reduce((t,i)=>t+i,0)>0&&i.pads.length!==2*a)throw Error(`pads should be ${2*a}D`);if(i.outputPadding.length!==a&&0!==i.outputPadding.length)throw Error(`output_padding should be ${a}D`);if(i.kernelShape.reduce((t,i)=>t+i,0)>0&&0!==i.kernelShape.length&&i.kernelShape.length!==t[1].dims.length-2)throw Error("invalid kernel shape");if(0!==i.outputShape.length&&i.outputShape.length!==t[0].dims.length-2)throw Error("invalid output shape")})(t.inputs,i),3===t.inputs[0].dims.length){var r,a;let s,n,o,u,l,d,p,h;r=t,s="NHWC"===(a=i).format,n=[r.inputs[0].reshape(s?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])],3===r.inputs.length&&n.push(r.inputs[2]),(0===(o=a.kernelShape).length||0===o[0])&&(o=[r.inputs[1].dims[2]]),(0===(u=a.dilations).length||0===u[0])&&(u=[1]),(0===(l=a.strides).length||0===l[0])&&(l=[1]),0===(d=a.pads).length&&(d=[0,0]),d=[0,d[0],0,d[1]],l=[1].concat(l),u=[1].concat(u),o=[1].concat(o),p=[0].concat(p=a.outputPadding),h=rP({...a,pads:d,strides:l,dilations:u,kernelShape:o,outputPadding:p},n),rN(r,n,h,t=>s?[t[0],t[2],t[3]]:[t[0],t[1],t[3]])}else{let r=rP(i,t.inputs);rN(t,t.inputs,r)}}}),sG=N(()=>{"use strict";sd(),sc(),s$(),sb(),rV=(t,i)=>{var r,a,s,n;let o,u,l,d,p,h,c=t.inputs[0].dims,f=t.inputs[0].dataType,m=t.inputs[1];t.compute((r=f,a=c,s=m,n=i,o=eJ.size(a),u=a.length,l=tE("input",r,u),d=tC("output",r,u),p=6===s.dataType?s.getInt32Array()[0]:Number(s.getBigInt64Array()[0]),h=eJ.normalizeAxis(p,u),{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:h},...tw(a,a)]}),getShaderSource:t=>{let i=` i32(${l.indicesGet("inputIndices","uniforms.axis")}) `,r=tT("uniforms.input_shape","uniforms.axis",u),a=n.reverse?i+(n.exclusive?" + 1":""):"0",s=n.reverse?r:i+(n.exclusive?"":" + 1");return`
                ${t.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(l,d)}
                ${t.mainStart()}
                  ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${d.offsetToIndices("global_idx")};
                  var sum = ${d.type.value}(0);
                  let first : i32 = ${a};
                  let last : i32 = ${s};
                  for (var i : i32 = first; i < last; i++) {
                    ${l.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${l.getByIndices("inputIndices")};
                  }
                  ${d.setByOffset("global_idx","sum")};
                }`}}),{inputs:[0]})},rG=t=>{let i=1===t.exclusive,r=1===t.reverse;return t_({exclusive:i,reverse:r})}}),sW=N(()=>{"use strict";sd(),sc(),s$(),sb(),rW=(t,i)=>{var r,a;let s,n,o,u,l,d,p,h,c,f,m,g,_,y;(t=>{if(!t||1!==t.length)throw Error("DepthToSpace requires 1 input.");if(4!==t[0].dims.length)throw Error("DepthToSpace requires 4D input.")})(t.inputs),t.compute((r=t.inputs[0],p="NHWC"===(a=i).format,h=a.blocksize,c="DCR"===a.mode,p?([s,n,o,u]=r.dims,l=c?[s,n,o,h,h,u/h**2]:[s,n,o,u/h**2,h,h],d=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([s,n,o,u]=[r.dims[0],r.dims[2],r.dims[3],r.dims[1]],l=c?[s,h,h,u/h**2,n,o]:[s,u/h**2,h,h,n,o],d=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]),m=(f=r.reshape(l)).dims.length,g=r.dataType,_=tE("a",g,m),y=tC("output",g,m),{name:"DepthToSpace",shaderCache:{hint:`${r.dims};${a.blocksize};${a.mode}`,inputDependencies:["rank"]},getRunData:t=>{let i=p?[s,n*h,o*h,u/h**2]:[s,u/h**2,n*h,o*h],r=eJ.size(i),a=f.dims,l=eJ.sortBasedOnPerm(a,d);return{outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:[{type:12,data:r},...tw(a,l)]}},getShaderSource:t=>`
  ${t.registerUniform("output_size","u32").declareVariables(_,y)}

  ${((t,i,r,a)=>{let s=[];s.push(`fn perm(i: ${a.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<i;++a)s.push(r.indicesSet("a",t[a],`i[${a}]`));return s.push("return a;}"),s.join(`
`)})(d,m,_,y)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`}))},rH=t=>t_({blocksize:t.blocksize,mode:t.mode,format:t.format})}),sH=N(()=>{"use strict";sd(),sc(),s$(),sb(),rj="^"+(rK="("+(rF="[a-zA-Z]|\\.\\.\\.")+")+")+"$",rZ="^"+("("+rK+",)*")+rK+"$",rQ=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,i){let r=this.symbolToIndices.get(t);void 0===r?r=[i]:r.push(i),this.symbolToIndices.set(t,r)}},rX=class{constructor(t,i){this.equation=i,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[r,a]=i.includes("->")?i.split("->",2):[i,""];if(!r.match(RegExp(rZ)))throw Error("Invalid LHS term");if(r.split(",").forEach((i,r)=>{let a=t[r].dims.slice();if(!i.match(RegExp(rj)))throw Error("Invalid LHS term");let s=this.processTerm(i,!0,a,r);this.lhs.push(s)}),""===a)a+=[...this.symbolToInfo.entries()].filter(([t,i])=>1===i.count||"..."===t).map(([t])=>t).join("");else if(!a.match(RegExp(rK)))throw Error("Invalid RHS");a.match(RegExp(rF,"g"))?.forEach(t=>{if("..."===t)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let i=this.symbolToInfo.get(t);if(void 0===i)throw Error("Invalid RHS symbol");this.outputDims.push(i.dimValue)}}),this.rhs=this.processTerm(a,!1,this.outputDims)}addSymbol(t,i,r){let a=this.symbolToInfo.get(t);if(void 0!==a){if(a.dimValue!==i&&1!==a.count)throw Error("Dimension mismatch");a.count++,a.inputIndices.push(r)}else a={count:1,dimValue:i,inputIndices:[r]};this.symbolToInfo.set(t,a)}processTerm(t,i,r,a=-1){let s=r.length,n=!1,o=[],u=0;if(!t.match(RegExp(rj))&&!i&&""!==t)throw Error("Invalid LHS term");let l=t.match(RegExp(rF,"g")),d=new rQ(a);return l?.forEach((t,p)=>{if("..."===t){if(n)throw Error("Only one ellipsis is allowed per input term");n=!0;let t=s-l.length+1;if(t<0)throw Error("Ellipsis out of bounds");if(o=r.slice(u,u+t),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw Error("Ellipsis dimensions mismatch")}else if(i)this.hasEllipsis=!0,this.ellipsisDims=o;else throw Error("Ellipsis must be specified in the LHS");for(let t=0;t<o.length;t++){let i=String.fromCharCode(48+t);d.addSymbol(i,p+t),this.addSymbol(i,r[u++],a)}}else d.addSymbol(t,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(t,r[u++],a)}),d}},rY=(t,i)=>{var r,a,s,n;let o,u,l,d,p=new rX(t.inputs,i.equation),h=p.outputDims,c=t.inputs.map((t,i)=>t.dims);t.compute((r=c,a=t.inputs[0].dataType,s=p,n=h,o=r.map(t=>t.length).map((t,i)=>tE(`input${i}`,a,t)),u=eJ.size(n),l=tC("output",a,n.length),d=[...s.symbolToInfo.keys()].filter(t=>!s.rhs.symbolToIndices.has(t)),{name:"Einsum",shaderCache:{hint:s.equation,inputDependencies:r.map(()=>"rank")},getRunData:()=>{let t=d.filter(t=>s.symbolToInfo.has(t)).map(t=>({type:12,data:s.symbolToInfo.get(t)?.dimValue||0}));t.push({type:12,data:u});let i=r.map((t,i)=>[...tw(t)]).reduce((t,i)=>t.concat(i),t);return i.push(...tw(n)),{outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:i}},getShaderSource:t=>{let i=[],r=[],a=[],n=[],u=[],p=s.symbolToInfo.size===s.rhs.symbolToIndices.size;s.symbolToInfo.forEach((t,d)=>{if(s.rhs.symbolToIndices.has(d)){let r=s.rhs.symbolToIndices.get(d)?.[0];void 0!==r&&s.lhs.forEach((a,s)=>{if(t.inputIndices.includes(s)){let t=a.symbolToIndices.get(d);if(void 0===t)throw Error("Invalid symbol error");t.forEach(t=>{i.push(`${o[s].indicesSet(`input${s}Indices`,t,l.indicesGet("outputIndices",r))}`)})}})}else s.lhs.forEach((i,a)=>{if(t.inputIndices.includes(a)){let t=i.symbolToIndices.get(d);if(void 0===t)throw Error("Invalid symbol error");t.forEach(t=>{r.push(`${o[a].indicesSet(`input${a}Indices`,t,`${d}`)}`)}),u.push(`prod *= ${o[a].getByIndices(`input${a}Indices`)};`)}}),a.push(`for(var ${d}: u32 = 0; ${d} < uniforms.${d+"_max"}; ${d}++) {`),n.push("}")});let h=p?[...i,`let sum = ${o.map((t,i)=>t.getByIndices(`input${i}Indices`)).join(" * ")};`]:[...i,"var sum = 0.0;",...a,...r,"var prod = 1.0;",...u,"sum += prod;",...n];return`
            ${t.registerUniforms(d.map(t=>({name:`${t+"_max"}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...o,l)}

            ${t.mainStart()}
            ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${l.offsetToIndices("global_idx")};
            ${o.map((t,i)=>`var input${i}Indices: ${o[i].type.indices};`).join(`
`)}
            ${h.join(`
`)};
            ${l.setByOffset("global_idx","sum")};
          }`}}))},rJ=t=>{let i=t.equation.replace(/\s+/g,"");return t_({equation:i})}}),sF=N(()=>{"use strict";sd(),sc(),sb(),r0=(t,i)=>{let r=t.length-i.length,a=[];for(let i=0;i<r;++i)a.push(t[i]);for(let s=0;s<i.length;++s)a.push(1===i[s]?t[s+r]:i[s]);return a},r1=t=>{var i;let r,a,s,n,o,u,l,d,p,h;(t=>{if(!t||2!==t.length)throw Error("Expand requires 2 input.");let i=t[0].dims,r=Array.from(t[1].getBigInt64Array(),Number),a=r.length<i.length?0:r.length-i.length,s=i.length<r.length?0:i.length-r.length;for(;a<r.length&&s<i.length;++a,++s)if(r[a]!==i[s]&&1!==r[a]&&1!==i[s])throw Error("Expand requires shape to be broadcastable to input")})(t.inputs),t.compute((n=(r=s=(i=t.inputs)[0].dims,a=Array.from(i[1].getBigInt64Array(),Number),r.length>a.length?r0(r,a):r0(a,r)),u=9===(o=i[0].dataType)||1===eJ.size(s),l=9===o||s.length>0&&s[s.length-1]%4==0?4:1,d=u||n.length>0&&n[n.length-1]%4==0?4:1,h=[{type:12,data:p=Math.ceil(eJ.size(n)/d)},...tw(s,n)],{name:"Expand",shaderCache:{hint:`${n.length};${l}${d}`,inputDependencies:["rank"]},getShaderSource:t=>{let i=tE("input",o,s.length,l),r=tC("output",o,n.length,d),a;if(9===o){let t=(t,a,s="")=>`
          let outputIndices${a} = ${r.offsetToIndices(`outputOffset + ${a}u`)};
          let offset${a} = ${i.broadcastedIndicesToOffset(`outputIndices${a}`,r)};
          let index${a} = offset${a} / 4u;
          let component${a} = offset${a} % 4u;
          ${t}[${a}] = ${s}(${i.getByOffset(`index${a}`)}[component${a}]);
        `;a=`
        let outputOffset = global_idx * ${d};
        var data = vec4<u32>(0);
        ${t("data",0,"u32")}
        ${t("data",1,"u32")}
        ${t("data",2,"u32")}
        ${t("data",3,"u32")}
        ${r.setByOffset("global_idx","data")}
      }`}else a=`
        let outputIndices = ${r.offsetToIndices(`global_idx * ${d}`)};
        let inputOffset = ${i.broadcastedIndicesToOffset("outputIndices",r)};
        let data = ${r.type.value}(${i.getByOffset(`inputOffset / ${l}`)});
        ${r.setByOffset("global_idx","data")}
      }`;return`
    ${t.registerUniform("vec_size","u32").declareVariables(i,r)}
    ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${a}`},getRunData:()=>({outputs:[{dims:n,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h})}),{inputs:[0]})}}),sK=N(()=>{"use strict";sd(),sc(),sb(),sz(),r2=t=>{var i;let r,a,s,n;t.inputs.length<2||0===eJ.size(t.inputs[1].dims)?i0(t):t.compute((r=(i=t.inputs)[0].dataType,a=eJ.size(i[0].dims),n=(s=eJ.size(i[1].dims))%4==0,{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:t=>{let i=tE("x",r,[1],4),a=tE("bias",r,[1],4),s=tC("y",r,[1],4),o=t=>`
      let bias${t}_offset: u32 = (global_idx * 4 + ${t}) % uniforms.bias_size;
      let bias${t} = ${a.getByOffset(`bias${t}_offset / 4`)}[bias${t}_offset % 4];`,u=n?`
      let bias = ${a.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${o(0)}${o(1)}${o(2)}${o(3)}
      let bias = ${i.type.value}(bias0, bias1, bias2, bias3);`;return`${t.registerUniforms([{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}]).declareVariables(i,a,s)}

    ${iY(tv(r))}

    ${t.mainStart(ty)}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${i.getByOffset("global_idx")};
      ${u}
      let x_in = x + bias;
      ${s.setByOffset("global_idx",iJ("x_in"))}
    }`},getRunData:t=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],programUniforms:[{type:12,data:Math.ceil(a/4)},{type:12,data:s}],dispatchGroup:{x:Math.ceil(a/ty/4)}})}))}}),sj=N(()=>{"use strict";sd(),sc(),s$(),sb(),r3=t=>t_({axis:t.axis}),r4=(t,i)=>{var r,a;let s,n,o,u,l,d,p,h,c;(t=>{if(!t||2!==t.length)throw Error("Gather requires 2 inputs.")})(t.inputs),t.compute((r=t.inputs,a=i,s=r[0].dims,n=r[1].dims,o=s.length,u=eJ.normalizeAxis(a.axis,o),(l=s.slice(0)).splice(u,1,...n),d=s[u],p=9===r[0].dataType?4:1,c=[{type:12,data:h=Math.ceil(eJ.size(l)/p)},{type:6,data:d},{type:12,data:u},...tw(r[0].dims,r[1].dims,l)],{name:"Gather",shaderCache:{hint:a.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:c}),getShaderSource:t=>{let i=tE("data",r[0].dataType,r[0].dims.length,p),a=tE("inputIndices",r[1].dataType,r[1].dims.length),s=tC("output",r[0].dataType,l.length,p),d=t=>{let r=n.length,s=`var indicesIndices${t}  = ${a.type.indices}(0);`;for(let i=0;i<r;i++)s+=`${r>1?`indicesIndices${t}[${i}]`:`indicesIndices${t}`} = ${l.length>1?`outputIndices${t}[uniforms.axis + ${i}]`:`outputIndices${t}`};`;s+=`
          var idx${t} = ${a.getByIndices(`indicesIndices${t}`)};
          if (idx${t} < 0) {
            idx${t} = idx${t} + uniforms.axisDimLimit;
          }
          var dataIndices${t} : ${i.type.indices};
        `;for(let i=0,a=0;i<o;i++)i===u?(s+=`${o>1?`dataIndices${t}[${i}]`:`dataIndices${t}`} = u32(idx${t});`,a+=r):(s+=`${o>1?`dataIndices${t}[${i}]`:`dataIndices${t}`} = ${l.length>1?`outputIndices${t}[${a}]`:`outputIndices${t}`};`,a++);return s},h;if(9===r[0].dataType){let t=(t,r,a="")=>`
          let outputIndices${r} = ${s.offsetToIndices(`outputOffset + ${r}u`)};
          ${d(r)};
          let offset${r} = ${i.indicesToOffset(`dataIndices${r}`)};
          let index${r} = offset${r} / 4u;
          let component${r} = offset${r} % 4u;
          ${t}[${r}] = ${a}(${i.getByOffset(`index${r}`)}[component${r}]);
        `;h=`
        let outputOffset = global_idx * ${p};
        var value = vec4<u32>(0);
        ${t("value",0,"u32")}
        ${t("value",1,"u32")}
        ${t("value",2,"u32")}
        ${t("value",3,"u32")}
        ${s.setByOffset("global_idx","value")}
      `}else h=`
      let outputIndices = ${s.offsetToIndices("global_idx")};
      ${d("")};
      let value = ${i.getByIndices("dataIndices")};
      ${s.setByOffset("global_idx","value")};
      `;return`
      ${t.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(i,a,s)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${h}
      }`}}))}}),sZ=N(()=>{"use strict";sd(),sc(),sb(),r6=(t,i)=>{var r,a,s,n,o,u;let l,d,p=t.inputs,h=p[0].dims,c=p[0].dataType,f=p[1].dims,m=f[f.length-1],g=eJ.sizeToDimension(f,f.length-1),_=eJ.sizeFromDimension(h,i.batchDims+m),y=eJ.sizeToDimension(h,i.batchDims),$=eJ.sizeFromDimension(h,i.batchDims),b=Array(m),v=_;for(let t=0;t<m;++t)b[m-1-t]=v,v*=h[i.batchDims+m-1-t];let w=(r=t,a=p[1],s=b,n=i.batchDims,o=h,l=[{type:12,data:u=g},{type:12,data:n},{type:12,data:o},{type:12,data:s},{type:12,data:g/y},{type:12,data:$},{type:12,data:m}],d=[u],l.push(...tw(a.dims,d)),r.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${s.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:r.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:t=>{let i=tE("indices_data",a.dataType,a.dims.length),r=tC("input_slice_offsets_data",12,1,1),n=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:s.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${t.registerUniforms(n).declareVariables(i,r)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
      ${1===s.length?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[a],outputs:[-1]})[0]),x=i.batchDims+m;if(x>h.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let k=f.slice(0,-1).concat(h.slice(x)),S=eJ.size(k),I=[{type:12,data:S},{type:12,data:_},...tw(p[0].dims,w.dims,k)];t.compute({name:"GatherND",shaderCache:{hint:i.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:k,dataType:c}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:I}),getShaderSource:t=>{let i=tE("data",p[0].dataType,p[0].dims.length),r=tE("slice_offsets",12,w.dims.length),a=tC("output",p[0].dataType,k.length);return`
          ${t.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(i,r,a)}
            ${t.mainStart()}
            ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[p[0],w]})},r8=t=>({batchDims:t.batch_dims,cacheKey:""})}),sQ=N(()=>{"use strict";sd(),sc(),s$(),sb(),r5=(t,i)=>{var r,a;let s,n,o,u,l,d,p,h,c,f;((t,i)=>{if(t.length<3||t.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=eJ.normalizeAxis(i.quantizeAxis,t[0].dims.length),a=i.blockSize,s=t[0],n=t[2],o=4===t.length?t[3]:void 0;if(n.dims.length!==s.dims.length||!s.dims.map((t,i)=>i===r?Math.ceil(t/a)===n.dims[i]:t===n.dims[i]).reduce((t,i)=>t&&i,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==s.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==n.dims.length||!o.dims.map((t,i)=>t===n.dims[i]).reduce((t,i)=>t&&i,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}})(t.inputs,i),t.compute((r=t.inputs,a=i,s=r[0].dims,n=r[1].dims,o=s.length,u=eJ.normalizeAxis(a.gatherAxis,o),l=eJ.normalizeAxis(a.quantizeAxis,o),(d=s.slice(0)).splice(u,1,...n),p=eJ.size(d),h=r[2].dataType,c=22===r[0].dataType,f=[{type:12,data:p},{type:12,data:l},{type:12,data:u},{type:12,data:a.blockSize},...tw(...r.map((t,i)=>t.dims),d)],{name:"GatherBlockQuantized",shaderCache:{hint:`${a.cacheKey};${r.filter((t,i)=>1!==i).map(t=>t.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:r.length},(t,i)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:h}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:t=>{let i=tE("data",r[0].dataType,r[0].dims.length),a=tE("inputIndices",r[1].dataType,r[1].dims.length),o=tE("scales",r[2].dataType,r[2].dims.length),l=r.length>3?tE("zeroPoint",r[3].dataType,r[3].dims.length):void 0,p=tC("output",h,d.length),f=[i,a,o];return l&&f.push(l),`
        ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...f,p)}
        ${t.mainStart()}
        let output_indices = ${p.offsetToIndices("global_idx")};
        var indices_indices = ${a.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${p.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${a.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${p.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${i.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${p.indicesGet("output_indices","i")};
          ${i.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${a.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${s[u]};
        }
        ${i.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${d.length}; i++) {
          let index = ${p.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${i.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${i.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${i.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
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
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${tv(h)}(quantized_data - zero_point) * scale;
        ${p.setByOffset("global_idx","dequantized_data")};
    }`}}))},r7=t=>t_({blockSize:t.blockSize,gatherAxis:t.gatherAxis,quantizeAxis:t.quantizeAxis})}),sX=N(()=>{"use strict";sd(),sc(),s$(),sb(),r9=t=>t_({axis:t.axis}),ae=(t,i)=>{var r,a;let s,n,o,u,l,d,p,h,c,f,m,g,_;(t=>{if(!t||2!==t.length)throw Error("GatherElements requires 2 inputs.");if(t[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(t[0].dims.length!==t[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)})(t.inputs),t.compute((r=t.inputs,a=i,s=r[0].dims,n=r[0].dataType,o=s.length,u=r[1].dims,l=r[1].dataType,p=s[d=eJ.normalizeAxis(a.axis,o)],h=u.slice(0),c=eJ.size(h),f=tE("input",n,o),m=tE("indicesInput",l,u.length),g=tC("output",n,h.length),(_=[{type:12,data:c},{type:6,data:p},{type:12,data:d}]).push(...tw(s,u,h)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:h,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:_}),getShaderSource:t=>`
      ${t.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,g)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}))}}),sY=N(()=>{"use strict";sd(),sc(),sb(),at=t=>({transA:t.transA,transB:t.transB,alpha:t.alpha,beta:t.beta,cacheKey:`${t.transA};${t.transB};${1===t.alpha}`}),ai=(t,i)=>{(t=>{if(!t)throw Error("Input is missing");if(t.length<2||t.length>3)throw Error("Invaid input number.");if(3===t.length&&t[2].dims.length>2)throw Error("Invalid input shape of C");if(t[0].dataType!==t[1].dataType||3===t.length&&t[0].dataType!==t[2].dataType)throw Error("Input types are mismatched")})(t.inputs),t.compute(((t,i)=>{let r=t[0].dims.slice(),a=t[1].dims.slice(),[s,n,o]=e1.getShapeOfGemmResult(r,i.transA,a,i.transB,3===t.length?t[2].dims:void 0),u=[s,n];if(!u)throw Error("Can't use gemm on the given tensors");let l=Math.ceil(n/16),d=Math.ceil(s/16),p=(eJ.size(u),[{type:12,data:l},{type:12,data:s},{type:12,data:n},{type:12,data:o},{type:1,data:i.alpha},{type:1,data:i.beta}]),h=["type","type"];return 3===t.length&&(p.push(...tw(t[2].dims)),h.push("rank")),p.push(...tw(u)),{name:"GemmShared",shaderCache:{hint:`${i.cacheKey}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:u,dataType:t[0].dataType}],dispatchGroup:{x:l*d},programUniforms:p}),getShaderSource:r=>{let a=tE("a",t[0].dataType,t[0].dims),s=tE("b",t[1].dataType,t[1].dims),n=null,o=[a,s];3===t.length&&(n=tE("c",t[2].dataType,t[2].dims.length),o.push(n));let l=tC("output",t[0].dataType,u.length);o.push(l);let d="",p="";i.transA&&i.transB?(p=`
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
        tile_b[local_id.y][local_id.x] = ${s.type.value}(0);
      }
      `,d="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):i.transA&&!i.transB?(p=`
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
        tile_b[local_id.y][local_id.x] = ${s.type.value}(0);
      }
      `,d="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!i.transA&&i.transB?(p=`
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
        tile_b[local_id.y][local_id.x] = ${s.type.value}(0);
      }
      `,d="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):i.transA||i.transB||(p=`
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
        tile_b[local_id.y][local_id.x] = ${s.type.value}(0);
      }
      `,d="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let h=1===i.alpha?"":"value *= uniforms.alpha;";return`
  ${r.registerUniforms([{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}]).declareVariables(...o)}
  var<workgroup> tile_a: array<array<${a.type.storage}, 16>, 16>;
  var<workgroup> tile_b: array<array<${s.type.storage}, 16>, 16>;
  ${r.mainStart([16,16,1])}
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

    ${h}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${null!=n?`let cOffset = ${n.broadcastedIndicesToOffset("vec2(m, n)",l)}; value += ${l.type.value}(uniforms.beta) * ${n.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}}})(t.inputs,i))}}),sJ=N(()=>{"use strict";sd(),sc(),s$(),sb(),[ar,aa,as,an]=[0,1,2,3],ao=`
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
`,au=(t,i)=>{var r,a;let s,n,o,u,l,d,p;(t=>{if(4!==t[0].dims.length)throw Error("only 4-D tensor is supported.");if(t[0].dims.length!==t[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(t[0].dims.length-2!==t[1].dims[t[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${t[0].dims.length-2}`);if(t[0].dims[0]!==t[1].dims[0])throw Error("grid batch size must match input batch size")})(t.inputs),t.compute((r=t.inputs,a=i,s=tE("x",r[0].dataType,r[0].dims.length),n=[r[1].dims[0],r[1].dims[1],r[1].dims[2]],o=tE("grid",r[1].dataType,n.length,2),u=[r[0].dims[0],r[0].dims[1],r[1].dims[1],r[1].dims[2]],"NHWC"===a.format&&(u=[r[0].dims[0],r[1].dims[1],r[1].dims[2],r[0].dims[3]],[ar,aa,as,an]=[0,3,1,2]),l=tC("output",r[0].dataType,u.length),d=s.type.value,p=[{type:12,data:eJ.size(u)},...tw(r[0].dims,n,u)],{name:"GridSample",shaderCache:{hint:`${a.cacheKey}`,inputDependencies:["type","type"]},getRunData:t=>{let i=eJ.size(u);return{outputs:[{dims:u,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:p}},getShaderSource:t=>{let i,r,n,u,p,h,c,f,m;return`
  ${t.registerUniform("output_size","u32").declareVariables(s,o,l)}
  ${ao}
  ${i=d,`
  fn gs_bicubic_interpolate(p: mat4x4<${i}>, x: f32, y: f32) -> ${i} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${i}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`}
  ${r=a,`
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
  ${n=a,`
  ${"reflection"===n.paddingMode?`
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
  ${u=s,p=d,h=a,`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${p} {
     var pixel = ${p}(0);
     var indices = vec4<u32>(0);
     indices[${ar}] = batch;
     indices[${aa}] = channel;`+(()=>{switch(h.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${as}] = u32(r);
            indices[${an}] = u32(c);
          } else {
            return ${p}(0);
          }
        `;case"border":return`
          indices[${as}] = u32(clamp(r, 0, H - 1));
          indices[${an}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${as}] = gs_reflect(r, border[1], border[3]);
          indices[${an}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${h.paddingMode} is not supported`)}})()+`
    return ${u.getByIndices("indices")};
  }
`}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${as}]);
      let W_in = i32(uniforms.x_shape[${an}]);

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
      var grid_indices = vec3<u32>(indices[${ar}], indices[${as}], indices[${an}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${c=l,f=d,m=a,(()=>{switch(m.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${ar}], indices[${aa}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${ar}], indices[${aa}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${ar}], indices[${aa}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${ar}], indices[${aa}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${ar}], indices[${aa}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${ar}], indices[${aa}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${m.mode} is not supported`)}})()+`${c.setByOffset("global_idx","result")}`}
  }`}}))},al=t=>t_({alignCorners:t.align_corners,mode:t.mode,paddingMode:t.padding_mode,format:t.format})}),s0=N(()=>{"use strict";sd(),sc(),s$(),s_(),sS(),sb(),sv(),ad=(t,i)=>t.length>i&&t[i].dims.length>0?t[i]:void 0,ap=t=>t_({...t}),ah=t_({perm:[0,2,1,3]}),ac=(t,i,r,a,s,n,o,u)=>{var l,d,p,h,c,f,m;let g,_,y,$=n;if(!(o&&eJ.size(o.dims)>0))return 3===n.dims.length&&($=n.reshape([i,a,r,s])),1===r||1===a?$:t.compute(tM($,ah.perm),{inputs:[$],outputs:[-1]})[0];if(1===a)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return $=(l=t,d=n,p=o,h=i,c=a,f=r*s,m=u,g=[h,c,f],y=[{type:12,data:_=eJ.size(g)},{type:12,data:m},{type:12,data:f}],$=l.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:g,dataType:d.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:y}),getShaderSource:t=>{let i=tC("qkv_with_bias",d.dataType,g),r=tE("qkv",d.dataType,g),a=tE("bias",p.dataType,g);return`
  ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}]).declareVariables(r,a,i)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[d,p],outputs:[-1]})[0]).reshape([i,a,r,s]),1===r||1===a?$:t.compute(tM($,ah.perm),{inputs:[$],outputs:[-1]})[0]},af=(t,i)=>{let r=((t,i)=>{let r,a=t[0],s=ad(t,1),n=ad(t,2),o=ad(t,3),u=ad(t,4),l=ad(t,5),d=ad(t,6),p=ad(t,7);if(3!==a.dims.length&&5!==a.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let h=a.dims[0],c=a.dims[1],f=3===a.dims.length?a.dims[2]:i.numHeads*a.dims[4],m=c,g=0,_=0,y=Math.floor(f/i.numHeads);if(d&&p&&eJ.size(d.dims)&&eJ.size(p.dims)){if(4!==d.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==h||d.dims[1]!==i.numHeads||d.dims[3]!==y)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==h||p.dims[1]!==i.numHeads||p.dims[3]!==y)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==p.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');g=d.dims[2],_=d.dims[2]}else if(d&&eJ.size(d.dims)||p&&eJ.size(p.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(s&&eJ.size(s.dims)>0){if(3!==a.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(s.dims.length<3||s.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(a.dims[0]!==s.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===s.dims.length){if(s.dims[2]!==a.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');r=2,m=s.dims[1]}else if(5===s.dims.length){if(s.dims[2]!==i.numHeads||2!==s.dims[3]||s.dims[4]!==y)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw Error('Expect "value" be none when "key" has packed kv format.');r=5,m=s.dims[1]}else{if(s.dims[1]!==i.numHeads||s.dims[3]!==y)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');r=0,m=s.dims[2]}}else{if(5!==a.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(a.dims[2]!==i.numHeads||3!==a.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');r=3}if(o&&eJ.size(o.dims)>0){if(1!==o.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(s&&5===s.dims.length&&2===s.dims[3])throw Error("bias is not allowed for packed kv.")}let $=g+m,b=0;if(u&&eJ.size(u.dims)>0){b=8;let t=u.dims;throw 1===t.length?t[0]===h?b=1:t[0]===3*h+2&&(b=3):2===t.length&&t[0]===h&&t[1]===$&&(b=5),8===b?Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):Error("Mask not supported")}let v=!1,w=f;if(n&&eJ.size(n.dims)>0){if(3!==n.dims.length&&4!==n.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(a.dims[0]!==n.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===n.dims.length){if(m!==n.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');w=n.dims[2]}else{if(m!==n.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');w=n.dims[1]*n.dims[3],v=!0}}if(u&&eJ.size(u.dims)>0)throw Error("Key padding mask is not supported");if(l&&eJ.size(l.dims)>0){if(4!==l.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==h||l.dims[1]!==i.numHeads||l.dims[2]!==c||l.dims[3]!==$)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:h,sequenceLength:c,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:$,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:f,vHiddenSize:w,headSize:y,vHeadSize:Math.floor(w/i.numHeads),numHeads:i.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:i.maskFilterValue,maskType:b,scale:i.scale,broadcastResPosBias:!1,passPastInKv:v,qkvFormat:r}})(t.inputs,i),a=t.inputs[0],s=ad(t.inputs,1),n=ad(t.inputs,2),o=ad(t.inputs,3),u=ad(t.inputs,4),l=ad(t.inputs,5),d=ad(t.inputs,6),p=ad(t.inputs,7);if(5===a.dims.length)throw Error("Packed QKV is not implemented");if(s?.dims.length===5)throw Error("Packed KV is not implemented");let h=s&&n&&4===s.dims.length&&4===n.dims.length,c=ac(t,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,a,o,0);if(h)return ih(t,c,s,n,u,void 0,d,p,l,r);if(!s||!n)throw Error("key and value must be provided");let f=ac(t,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,s,o,r.hiddenSize),m=ac(t,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,n,o,2*r.hiddenSize);ih(t,c,f,m,u,void 0,d,p,l,r)}}),s1=N(()=>{"use strict";sd(),sc(),s$(),sb(),am=(t,i)=>{let r=t[0].dims,a=eJ.size(r),s=t[0].dataType,n=eJ.normalizeAxis(i.axis,r.length),o=Array(i.numOutputs),u=tE("input",s,r.length),l=Array(i.numOutputs),d=[],p=[],h=0,c=[{type:12,data:a}];for(let a=0;a<i.numOutputs;a++){h+=i.splitSizes[a],l[a]=h;let u=r.slice();u[n]=i.splitSizes[a],p.push(u),o[a]=tC(`output${a}`,s,u.length),d.push({dims:p[a],dataType:t[0].dataType})}return c.push({type:12,data:l},...tw(r,...p)),{name:"Split",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getShaderSource:t=>{let i;return`
  ${t.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...o)}
  ${i=l.length,`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${i}u; i += 1u ) {
    if (index < ${tT("uniforms.size_in_split_axis","i",i)}) {
        return i;
    }
    }
    return ${i}u;
}`}
  ${(t=>{let i=t.length,r=[];for(let a=0;a<i;++a){let s=t[a].setByIndices("indices","input[global_idx]");1===i?r.push(s):0===a?r.push(`if (output_number == ${a}u) { ${s} }`):a===i-1?r.push(`else { ${s} }`):r.push(`else if (output_number == ${a}) { ${s} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${t[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`})(o)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${tT("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`},getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c})}},ag=(t,i)=>{let r,a;var s,n,o=t.inputs;if(!o||o.length<1)throw Error("too few inputs");let u=1===t.inputs.length?i:(s=t.inputs,r=[],a=(n=i).numOutputs,s[1].dims[0]>0&&(s[1].getBigInt64Array().forEach(t=>r.push(Number(t))),a=r.length),t_({numOutputs:a,axis:n.axis,splitSizes:r}));t.compute(am(t.inputs,u),{inputs:[0]})},a_=t=>{let i=t.axis,r=t.splitSizes,a=t.numOutputs<0?r.length:t.numOutputs;if(a!==r.length)throw Error("numOutputs and splitSizes length must be equal");return t_({axis:i,numOutputs:a,splitSizes:r})}}),s2=N(()=>{"use strict";sd(),sc(),s$(),sb(),ay=(t,i)=>{let{interleaved:r,numHeads:a,rotaryEmbeddingDim:s,scale:n}=i,o=t[0].dims[0],u=eJ.sizeFromDimension(t[0].dims,1),l=t[0].dims[t[0].dims.length-2],d=u/l,p=t[2].dims[1],h=0===s?2*p:d/a,c=[o,l,d/h,h-p],f=eJ.computeStrides(c),m=[{type:1,data:n},{type:12,data:c},{type:12,data:f},...3===t[0].dims.length?Array({type:12,data:[u,d,h,1]}):[],...4===t[0].dims.length?Array({type:12,data:[u,h,l*h,1]}):[],...tw(t[0].dims,t[1].dims,t[2].dims,t[3].dims,t[0].dims)];return{name:"RotaryEmbedding",shaderCache:{hint:t_({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:i=>{let a=tE("input",t[0].dataType,t[0].dims.length),s=tE("position_ids",t[1].dataType,t[1].dims.length),n=tE("cos_cache",t[2].dataType,t[2].dims.length),o=tE("sin_cache",t[3].dataType,t[3].dims.length),u=tC("output",t[0].dataType,t[0].dims.length);return i.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:c.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${i.declareVariables(a,s,n,o,u)}

        ${i.mainStart(ty)}
          let half_rotary_emb_dim = uniforms.${n.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${i.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${s.broadcastedIndicesToOffset("bsnh.xy",tC("",s.type.tensor,2))};
            let position_id =
                u32(${s.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${a.getByOffset("i")} * ${n.get("position_id","bsnh[3]")} -
                ${a.getByOffset("j")} * ${o.get("position_id","bsnh[3]")};
            ${u.setByOffset("i","re")}
            let im = ${a.getByOffset("i")} * ${o.get("position_id","bsnh[3]")} +
                ${a.getByOffset("j")} * ${n.get("position_id","bsnh[3]")};
            ${u.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${u.setByOffset("k",a.getByOffset("k"))}
          }
        }`},getRunData:()=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(eJ.size(c)/ty)},programUniforms:m})}},a$=(t,i)=>{((t,i)=>{let[r,a,s,n]=t,{numHeads:o,rotaryEmbeddingDim:u}=i;if(3!==r.dims.length&&4!==r.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!eJ.areEqual(a.dims,[])&&!eJ.areEqual(a.dims,[1])&&2!==a.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${a.dims.length}`);if(2!==s.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(2!==n.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!eJ.areEqual(s.dims,n.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&0===o)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],d=r.dims[r.dims.length-2],p=s.dims[0],h=eJ.sizeFromDimension(r.dims,1)/d,c=0===u?2*s.dims[1]:h/o;if(u>c)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===a.dims.length){if(l!==a.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${a.dims[0]}`);if(d!==a.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${a.dims[1]}`)}if(c/2!==s.dims[1]&&u/2!==s.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${s.dims[1]}`);if(d>p)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")})(t.inputs,i),t.compute(ay(t.inputs,i))}}),s3=N(()=>{"use strict";s$(),sd(),sS(),s0(),s1(),sv(),s2(),sb(),ab=t_({perm:[0,2,1,3]}),av=(t,i,r)=>{let a=i,s=r.kvNumHeads;return 3===i.dims.length&&0!==r.kvSequenceLength&&(a=i.reshape([r.batchSize,r.kvSequenceLength,s,r.headSize]),a=t.compute(tM(a,ab.perm),{inputs:[a],outputs:[-1]})[0]),a},aw=(t,i)=>{let r=((t,i)=>{if(i.doRotary&&t.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=t[0],a=t[1],s=t[2],n=t[3],o=t[4];if(0!==i.doRotary&&t.length<=7)throw Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(-1!==i.localWindowSize)throw Error("Local attention is not supported");if(0!==i.softcap)throw Error("Softcap is not supported");if(0!==i.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(i.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==r.dims.length&&5!==r.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let u=r.dims[0],l=r.dims[1],d=3===r.dims.length?r.dims[2]:i.numHeads*r.dims[4],p=l,h=0,c=!a||0===a.dims.length,f=Math.floor(c?d/(i.numHeads+2*i.kvNumHeads):d/i.numHeads);c&&(d=f*i.numHeads);let m=n&&0!==n.dims.length,g=o&&0!==o.dims.length;if(m&&4===n.dims.length&&n.dims[0]===u&&n.dims[1]!==i.kvNumHeads&&n.dims[2]===i.kvNumHeads&&n.dims[3]===f)throw Error("BSNH pastKey/pastValue is not supported");if(m&&g){if(4!==n.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==o.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');h=n.dims[2]}else if(m||g)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let _=1;if(a&&a.dims.length>0){if(3!==r.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==a.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===a.dims.length){if(r.dims[2]%a.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');p=a.dims[1]}else if(5===a.dims.length){if(a.dims[2]!==i.numHeads||2!==a.dims[3]||a.dims[4]!==f)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw Error('Expect "value" be none when "key" has packed kv format.');p=a.dims[1]}else{if(a.dims[1]!==i.numHeads||a.dims[3]!==f)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=a.dims[2]}}else{if(3!==r.dims.length&&5!==r.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===r.dims.length&&(r.dims[2]!==i.numHeads||3!==r.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');_=3}let y=!1,$=i.kvNumHeads?f*i.kvNumHeads:d;if(s&&s.dims.length>0){if(3!==s.dims.length&&4!==s.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==s.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===s.dims.length){if(p!==s.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');$=s.dims[2]}else{if(p!==s.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');$=s.dims[1]*s.dims[3],y=!0}}let b=t.length>4?t[5]:void 0;if(b&&1!==b.dims.length&&b.dims[0]!==u)throw Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:d,vHiddenSize:$,headSize:f,vHeadSize:Math.floor($/i.kvNumHeads),numHeads:i.numHeads,kvNumHeads:i.kvNumHeads,nReps:i.numHeads/i.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:i.scale,broadcastResPosBias:!1,passPastInKv:y,qkvFormat:_}})(t.inputs,i);if(5===t.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(t.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let a=t.inputs[0],s=t.inputs[1]&&t.inputs[1].dims.length>0?t.inputs[1]:void 0,n=t.inputs[2]&&t.inputs[2].dims.length>0?t.inputs[2]:void 0,o=t.inputs[3]&&0!==t.inputs[3].dims.length?t.inputs[3]:void 0,u=t.inputs[4]&&0!==t.inputs[4].dims.length?t.inputs[4]:void 0,l=t.inputs.length>4?t.inputs[5]:void 0,d=t.inputs.length>5?t.inputs[6]:void 0,p=r.kvNumHeads?r.kvNumHeads:r.numHeads,h=t_({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,p*r.headSize,p*r.headSize]}),[c,f,m]=s||n?[a,s,n]:t.compute(am([a],h),{inputs:[a],outputs:[-1,-1,-1]}),g,_;if(i.doRotary){var y,$,b,v;let a,s,n,o=t.compute((y=r.batchSize,$=r.sequenceLength,b=l,v=d,a=[y*$],n=[{type:12,data:s=y*$},{type:12,data:$},{type:12,data:y}],{name:"GeneratePositionIds",shaderCache:{hint:`${y};${$}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:7}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:n}),getShaderSource:t=>{let i=tE("seq_lens",b.dataType,b.dims),r=tE("total_seq_lens",v.dataType,v.dims),s=tC("pos_ids",7,a);return`
  ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}]).declareVariables(i,r,s)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${r.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${i.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${s.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${s.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${s.setByOffset("global_idx","seqlen")}
    };
  }
  `}}),{inputs:[l,d],outputs:[-1]})[0],u=t.inputs[7],p=t.inputs[8],h=t_({interleaved:0!==i.rotaryInterleaved,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:i.scale}),m=[c,o,u,p],w=[-1];g=t.compute(ay(m,h),{inputs:m,outputs:w})[0],m.splice(0,1,f);let x=t_({interleaved:0!==i.rotaryInterleaved,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:i.scale});_=t.compute(ay(m,x),{inputs:m,outputs:w})[0]}let w=ac(t,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i.doRotary?g:c,void 0,0),x=av(t,i.doRotary?_:f,r),k=av(t,m,r);ih(t,w,x,k,void 0,void 0,o,u,void 0,r,l,d)}}),s4=N(()=>{"use strict";sd(),sc(),sv(),sb(),ax=(t,i,r,a,s,n,o,u)=>{let l=tx(n),d=1===l?"f32":`vec${l}f`,p=1===l?"vec2f":`mat2x${l}f`,h=s*o,c=64;1===h&&(c=256);let f=[s,o,n/l],m=[s,o,2],g=[];return g.push(...tw(f,m)),t.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${c}`,inputDependencies:["rank","type","type"]},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:h},programUniforms:g}),getShaderSource:t=>{let s=tE("x",i.dataType,3,l),n=[s,tE("scale",r.dataType,r.dims),tE("bias",a.dataType,a.dims),tC("output",1,3,2)];return`
  var<workgroup> workgroup_shared : array<${p}, ${c}>;
  const workgroup_size = ${c}u;
  ${t.declareVariables(...n)}
  ${t.mainStart(c)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${s.get("batch","channel","h")});
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
      let sum_final = ${tI("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${tI("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[i,r,a],outputs:[-1]})[0]},ak=(t,i)=>{var r,a,s;let n,o,u,l,d,p,h,c,f;"NHWC"===i.format?((t,i,r)=>{let a=i[0].dims,s=a[0],n=a[a.length-1],o=eJ.sizeFromDimension(a,1)/n,u=tx(n),l=eJ.size(a)/u,d=[{type:12,data:o},{type:12,data:Math.floor(n/u)}],p=!1,h=[0,a.length-1];for(let t=0;t<a.length-2;t++)p=p||1!==a[t+1],h.push(t+1);let c=(p=p&&1!==a[a.length-1])?t.compute(tM(t.inputs[0],h),{inputs:[t.inputs[0]],outputs:[-1]})[0]:t.inputs[0].reshape(Array.from({length:a.length},(t,i)=>a[h[i]])),f=ax(t,c,i[1],i[2],s,o,n,r.epsilon);t.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:t=>{let r=tb(i[0].dataType),s=1===u?"vec2f":`mat${u}x2f`,n=t=>{let i=0===t?"x":"y",a=1===u?"f32":`vec${u}f`;switch(u){case 1:return`${r}(${a}(scale.${i}))`;case 2:return`vec2<${r}>(${a}(scale[0].${i}, scale[1].${i}))`;case 4:return`vec4<${r}>(${a}(scale[0].${i}, scale[1].${i}, scale[2].${i}, scale[3].${i}))`;default:throw Error(`Not supported compoents ${u}`)}},o=tE("input",i[0].dataType,i[0].dims,u),l=tC("output",i[0].dataType,a,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${o.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${s}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${l.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${t.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${n(0)}, ${n(1)});
  }`}},{inputs:[i[0],f]})})(t,t.inputs,i):(r=t,a=t.inputs,s=i,o=(n=a[0].dims)[0],u=n[1],l=eJ.sizeFromDimension(n,2),d=tx(l),p=eJ.size(n)/d,h=ax(r,a[0],a[1],a[2],o,l,u,s.epsilon),c=[o,u,l/d],f=[o,u],r.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:["type","none"]},getRunData:()=>({outputs:[{dims:n,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...tw(c,f,c)]}),getShaderSource:t=>{let i=tE("x",a[0].dataType,c.length,d),r=tE("scale_shift",1,f.length,2),s=tC("output",a[0].dataType,c.length,d),n=[i,r,s];return`
  ${t.registerUniform("output_size","u32").declareVariables(...n)}
  ${t.mainStart()}
  ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${s.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${r.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${i.getByOffset("global_idx")} * ${s.type.value}(scale_shift.x) + ${s.type.value}(scale_shift.y);
      ${s.setByOffset("global_idx","value")};
  }`}},{inputs:[a[0],h]}))}}),s6=N(()=>{"use strict";sd(),sc(),sb(),aS=(t,i)=>{(t=>{if(!t||t.length<2)throw Error("layerNorm requires at least 2 inputs.")})(t.inputs),t.compute(((t,i,r)=>{let a=i.simplified,s=t[0].dims,n=t[1],o=!a&&t[2],u=eJ.normalizeAxis(i.axis,s.length),l=eJ.sizeToDimension(s,u),d=eJ.sizeFromDimension(s,u),p=eJ.size(n.dims),h=o?eJ.size(o.dims):0;if(p!==d||o&&h!==d)throw Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${h}`);let c=[];for(let t=0;t<s.length;++t)t<u?c.push(s[t]):c.push(1);let f=tx(d),m=["type","type"],g=[{type:12,data:l},{type:1,data:d},{type:12,data:Math.floor(d/f)},{type:1,data:i.epsilon}];o&&m.push("type");let _=r>1,y=r>2,$=[{dims:s,dataType:t[0].dataType}];return _&&$.push({dims:c,dataType:1}),y&&$.push({dims:c,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${f};${r};${a}`,inputDependencies:m},getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:g}),getShaderSource:i=>{let r=tb(t[0].dataType),u=[tE("x",t[0].dataType,t[0].dims,f),tE("scale",n.dataType,n.dims,f)];return o&&u.push(tE("bias",o.dataType,o.dims,f)),u.push(tC("output",t[0].dataType,s,f)),_&&u.push(tC("mean_data_output",1,c)),y&&u.push(tC("inv_std_output",1,c)),`
  ${i.registerUniforms([{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...u)}
  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${tk("f32",f)};
    var mean_square_vector = ${tk("f32",f)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${tS(r,f,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${tI("mean_vector",f)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${tI("mean_square_vector",f)} / uniforms.norm_size ${a?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${tS(r,f,"x[j + offset]")};
      let f32scale = ${tS(r,f,"scale[j]")};
      output[j + offset] = ${u[0].type.value}((f32input ${a?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${tS(r,f,"bias[j]")}`:""}
      );
    }

    ${_?"mean_data_output[global_idx] = mean":""};
    ${y?"inv_std_output[global_idx] = inv_std_dev":""};
  }`}}})(t.inputs,i,t.outputCount))}}),s8=N(()=>{"use strict";sc(),sD(),sM(),aI=t=>{var i=t.inputs;if(!i||2!==i.length)throw Error("MatMul requires 2 inputs.");if(i[0].dims[i[0].dims.length-1]!==i[1].dims[i[1].dims.length-2])throw Error("shared dimension does not match.");let r=eY.calcShape(t.inputs[0].dims,t.inputs[1].dims,!0);if(!r)throw Error("Can't use matmul on the given tensors");let a=r[r.length-1],s=t.inputs[0].dims[t.inputs[0].dims.length-1];if(a<8&&s<8)t.compute(r_(t.inputs,{activation:""},r));else{let i=r[r.length-2],n=eJ.size(t.inputs[0].dims.slice(0,-2)),o=eJ.size(t.inputs[1].dims.slice(0,-2));if(1!==n&&1===i&&1===o){let i=t.inputs[0].reshape([1,n,s]),o=t.inputs[1].reshape([1,s,a]),u=[1,n,a],l=[i,o];t.compute(rv(l,{activation:""},r,u),{inputs:l})}else t.compute(rv(t.inputs,{activation:""},r))}}}),s5=N(()=>{"use strict";sd(),sc(),s$(),sb(),aT=(t,i)=>{var r,a,s,n;let o,u,l,d,p,h,c,f,m,g,_,y,$,b,v,w,x,k,S,I,T,z,E,C,O,B,A,R,D,M,U,P,q,N,L,V,G,W,H,F,K;((t,i)=>{if(t.length<3||t.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let r=t[0],a=r.dims.length;if(r.dims[a-1]!==i.k)throw Error("The last dim of input shape does not match the k value");let s=Math.floor((i.k+i.blockSize-1)/i.blockSize),n=i.blockSize/8*i.bits,o=t[1];if(!eJ.areEqual(o.dims,[i.n,s,n]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=t[2].dims;if(eJ.size(u)!==i.n*s)throw Error("scales input size error.");if(4===t.length){let r=t[3].dims,a=i.n*(8===i.bits?s:Math.floor((s*i.bits+7)/8));if(eJ.size(r)!==a)throw Error("zeroPoints input size error.")}})(t.inputs,i),32===i.blockSize&&t.adapterInfo.isVendor("intel")&&t.adapterInfo.isArchitecture("gen-12lp")?t.compute((r=t.inputs,a=i,u=(o=r[0].dims).length,l=o[u-2],d=a.k,p=a.n,h=o.slice(0,u-2),c=eJ.size(h),f=r[1].dims[2]/4,m=r[0].dataType,g=tx(a.k),_=tx(f),y=h.concat([l,p]),w=(v=(b=128/($=p%8==0?8:p%4==0?4:1))*_*8)/g,x=v/a.blockSize,k=eJ.size(y)/$,S=[],I=[c,l,d/g],(T=eJ.convertShape(r[1].dims).slice()).splice(-1,1,f/_),S.push(...tw(I)),S.push(...tw(T)),S.push(...tw(r[2].dims)),4===r.length&&S.push(...tw(eJ.convertShape(r[3].dims))),z=[c,l,p],S.push(...tw(z)),{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${a.blockSize};${g};${_};${b};${$}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:m}],dispatchGroup:{x:k},programUniforms:S}),getShaderSource:t=>{let i=I.length,s=tE("a",r[0].dataType,i,g),n=tE("b",12,T.length,_),o=tE("scales",r[2].dataType,r[2].dims.length),u=[s,n,o],l=4===r.length?tE("zero_points",12,r[3].dims.length):void 0;l&&u.push(l);let d=z.length,p=tC("output",r[0].dataType,d),h=tb(r[0].dataType);return`
        var<workgroup> sub_a: array<${s.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${p.type.value}, ${b}>, ${$}>;
        ${t.declareVariables(...u,p)}
        ${t.mainStart([b,$,1])}
          let output_indices = ${p.offsetToIndices(`workgroup_index * ${$}`)};
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
                sub_a[a_offset] = ${s.getByIndices(`${s.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${s.type.value}(0);
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
            let zero_point = ${h}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${h}(8);`}
            let scale = ${o.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${n.getByIndices(`${n.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${a.blockSize/g};
            for (var i: u32 = 0; i < ${_}; i++) {
              ${(()=>{switch(g){case 1:return`
          let a_data0 = vec4<${h}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${h}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${h}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${h}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${g}-component is not supported.`)}})()}
              let b_value = ${1===_?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${h}>(${Array.from({length:4},(t,i)=>`${h}(b_value_lower[${i}]), ${h}(b_value_upper[${i}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${h}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(t,i)=>`dot(a_data${i}, b_dequantized_values[${i}])`).join(" + ")};
              word_offset += ${8/g};
            }
            workgroupBarrier();
          }

          if (local_idx < ${$}) {
            var output_value: ${p.type.value} = ${p.type.value}(0);
            for (var b = 0u; b < ${b}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${p.setByIndices(`${p.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`}})):t.compute((s=t.inputs,n=i,C=(E=s[0].dims).length,O=E[C-2],B=n.k,A=n.n,R=E.slice(0,C-2),D=eJ.size(R),M=s[1].dims[2]/4,U=s[0].dataType,P=tx(n.k),q=tx(M),N=tx(A),L=R.concat([O,A]),V=O>1&&A/N%2==0?2:1,G=eJ.size(L)/N/V,W=[],H=[D,O,B/P],(F=eJ.convertShape(s[1].dims).slice()).splice(-1,1,M/q),W.push(...tw(H)),W.push(...tw(F)),W.push(...tw(s[2].dims)),4===s.length&&W.push(...tw(eJ.convertShape(s[3].dims))),K=[D,O,A/N],W.push(...tw(K)),{name:"MatMulNBits",shaderCache:{hint:`${n.blockSize};${n.bits};${P};${q};${N};${V};64`,inputDependencies:Array(s.length).fill("rank")},getRunData:()=>({outputs:[{dims:L,dataType:U}],dispatchGroup:{x:G},programUniforms:W}),getShaderSource:t=>{let i=H.length,r=tE("a",s[0].dataType,i,P),a=tE("b",12,F.length,q),o=tE("scales",s[2].dataType,s[2].dims.length),u=[r,a,o],l=4===s.length?tE("zero_points",12,s[3].dims.length):void 0;l&&u.push(l);let d=K.length,p=tC("output",s[0].dataType,d,N),h=tb(s[0].dataType),c=(()=>{switch(P){case 1:return`array<${h}, 8>`;case 2:return`mat4x2<${h}>`;case 4:return`mat2x4<${h}>`;default:throw Error(`${P}-component is not supported.`)}})();return`
        var<workgroup> workgroup_shared: array<${p.type.value}, ${64*V}>;
        ${t.declareVariables(...u,p)}
        ${t.mainStart([64,1,1])}
          let output_indices = ${p.offsetToIndices(`(global_idx / 64) * ${V}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${n.blockSize/P};
            ${(()=>{let t=`
            var col_index = col * ${N};
            ${l?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${h}(8);`}
            `;for(let i=0;i<N*V;i++)t+=`
            let scale${i} = ${o.getByOffset("col_index * nBlocksPerCol + block")};
            ${l?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${l.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${i} = ${h}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return t})()}
            for (var word: u32 = 0; word < ${M}; word += ${q}) {
              ${(()=>{let t=`col_index = col * ${N};`;for(let i=0;i<N*V;i++)t+=`
            let b${i}_data = ${a.getByIndices(`${a.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return t+`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${c};
            var b_dequantized_values: ${c};`})()}
              for (var i: u32 = 0; i < ${q}; i++) {
                ${(()=>{let t=`
          // reuse a data
            var input_offset = ${r.indicesToOffset(`${r.type.indices}(batch, row, word_offset)`)};
            var a_data: ${c};
            for (var j: u32 = 0; j < ${8/P}; j++) {
              a_data[j] = ${r.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let i=0;i<N*V;i++)t+=`
            b_value = ${1===q?`b${i}_data`:`b${i}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${c}(${Array.from({length:4},(t,i)=>`${h}(b_value_lower[${i}]), ${h}(b_value_upper[${i}])`).join(", ")});
            b_dequantized_values = ${1===P?`${c}(${Array.from({length:8},(t,r)=>`(b_quantized_values[${r}] - ${l?`zero_point${i}`:"zero_point"}) * scale${i}`).join(", ")});`:`(b_quantized_values - ${c}(${Array(8).fill(`${l?`zero_point${i}`:"zero_point"}`).join(",")})) * scale${i};`};
            workgroup_shared[local_id.x * ${V} + ${Math.floor(i/N)}]${N>1?`[${i%N}]`:""} += ${Array.from({length:8/P},(t,i)=>`${1===P?`a_data[${i}] * b_dequantized_values[${i}]`:`dot(a_data[${i}], b_dequantized_values[${i}])`}`).join(" + ")};
          `;return t})()}
                word_offset += ${8/P};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${V}) {
            var output_value: ${p.type.value} = ${p.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${V};
            }
            ${p.setByIndices(`${p.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`}}))},az=t=>t_(t)}),s7=N(()=>{"use strict";sd(),sc(),sb(),aE=(t,i)=>{let r,a,s,n;var o,u,l=t.inputs;if(!l||l.length<1)throw Error("Too few inputs");if(1!==l[0].dataType&&10!==l[0].dataType)throw Error("Input type must be float or float16.");if(l.length>=2){let t=2*l[0].dims.length===l[1].dims[0];if(4===l.length&&(t=2*l[3].dims[0]===l[1].dims[0]),!t)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}let d=((t,i)=>{if(!(t.length>1))return i;{let r=t[1].getBigInt64Array(),a=t.length>=3&&t[2].data?10===t[2].dataType?t[2].getUint16Array()[0]:t[2].getFloat32Array()[0]:0,s=t[0].dims.length,n=new Int32Array(2*s).fill(0);if(t.length>=4){let i=t[3].getBigInt64Array();for(let t=0;t<i.length;t++)n[Number(i[t])]=Number(r[t]),n[Number(i[t])+s]=Number(r[t+i.length])}else r.forEach((t,i)=>n[Number(i)]=Number(t));let o=[];return n.forEach(t=>o.push(t)),{mode:i.mode,value:a,pads:o}}})(t.inputs,i);t.compute((o=t.inputs,u=d,r=eJ.padShape(o[0].dims.slice(),u.pads),a=o[0].dims,s=[{type:12,data:eJ.size(r)},{type:6,data:u.pads}],n=o.length>=3&&o[2].data,0===u.mode&&s.push({type:n?o[2].dataType:1,data:u.value}),s.push(...tw(o[0].dims,r)),{name:"Pad",shaderCache:{hint:`${u.mode}${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:r,dataType:o[0].dataType}],dispatchGroup:{x:Math.ceil(eJ.size(r)/64)},programUniforms:s}),getShaderSource:t=>{let i=tC("output",o[0].dataType,r.length),s=tE("x",o[0].dataType,a.length),l=s.type.value,d=((t,i,r)=>{switch(r.mode){case 0:var a=t,s=i,n=r.pads.length;let o="";for(let t=s-1;t>=0;--t)o+=`
            k = i32(${a.indicesGet("indices",t)}) - ${tT("uniforms.pads",t,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${tT("uniforms.x_shape",t,s)})) {
              break;
            }
            offset += k * i32(${tT("uniforms.x_strides",t,s)});
        `;return`
          value = ${a.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${o}
            value = x[offset];
          }
      `;case 1:var u=t,l=i,d=r.pads.length;let p="";for(let t=l-1;t>=0;--t)p+=`
                k = i32(${u.indicesGet("indices",t)}) - ${tT("uniforms.pads",t,d)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${tT("uniforms.x_shape",t,l)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${tT("uniforms.x_shape",t,l)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${tT("uniforms.x_strides",t,l)});
            `;return`
              var offset = 0;
              var k = 0;
              ${p}
              value = x[offset];
          `;case 2:var h=t,c=i,f=r.pads.length;let m="";for(let t=c-1;t>=0;--t)m+=`
                k = i32(${h.indicesGet("indices",t)}) - ${tT("uniforms.pads",t,f)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${tT("uniforms.x_shape",t,c)})) {
                  k = i32(${tT("uniforms.x_shape",t,c)}) - 1;
                }
                offset += k * i32(${tT("uniforms.x_strides",t,c)});
            `;return`
              var offset = 0;
              var k = 0;
              ${m}
              value = x[offset];
          `;case 3:var g=t,_=i,y=r.pads.length;let $="";for(let t=_-1;t>=0;--t)$+=`
                k = i32(${g.indicesGet("indices",t)}) - ${tT("uniforms.pads",t,y)};
                if (k < 0)  {
                  k += i32(${tT("uniforms.x_shape",t,_)}]);
                }
                if (k >= i32(${tT("uniforms.x_shape",t,_)})) {
                  k -= i32(${tT("uniforms.x_shape",t,_)});
                }
                offset += k * i32(${tT("uniforms.x_strides",t,_)});
            `;return`
              var offset = 0;
              var k = 0;
              ${$}
              value = x[offset];
          `;default:throw Error("Invalid mode")}})(i,a.length,u),p=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:u.pads.length}];return 0===u.mode&&p.push({name:"constant_value",type:n?l:"f32"}),`
            ${t.registerUniforms(p).declareVariables(s,i)}
            ${t.mainStart()}
            ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${i.offsetToIndices("global_idx")};

            var value = ${l}(0);
            ${d}
            output[global_idx] = value;
        }`}}),{inputs:[0]})}}),s9=N(()=>{"use strict";eu(),sd(),sc(),sb(),aC=t=>{if(f.webgpu.validateInputContent&&(!t||1!==t.length))throw Error("Pool ops requires 1 input.")},aO=(t,i,r)=>{let a="NHWC"===i.format,s=t.dims.slice();a&&s.splice(1,0,s.pop());let n=Object.hasOwnProperty.call(i,"dilations"),o=i.kernelShape.slice(),u=i.strides.slice(),l=n?i.dilations.slice():[],d=i.pads.slice();e0.adjustPoolAttributes(r,s,o,u,l,d);let p=e0.computePoolOutputShape(r,s,u,l,o,d,i.autoPad),h=Object.assign({},i);n?Object.assign(h,{kernelShape:o,strides:u,pads:d,dilations:l,cacheKey:i.cacheKey}):Object.assign(h,{kernelShape:o,strides:u,pads:d,cacheKey:i.cacheKey});let c=p.slice();return c.push(c.splice(1,1)[0]),[h,a?c:p]},aB=(t,i)=>{let r="NHWC"===i.format,a=[{type:12,data:eJ.size(t)},{type:12,data:eJ.size(i.kernelShape)}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(i.kernelShape.length<=2){let t=i.kernelShape[i.kernelShape.length-1],r=i.strides[i.strides.length-1],n=i.pads[i.pads.length/2-1],o=i.pads[i.pads.length-1],u=!!(n+o);a.push({type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let l=!1;if(2===i.kernelShape.length){let t=i.kernelShape[i.kernelShape.length-2],r=i.strides[i.strides.length-2],n=i.pads[i.pads.length/2-2],o=i.pads[i.pads.length-2];l=!!(n+o),a.push({type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,u,l]}{if(r)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let t=eJ.computeStrides(i.kernelShape);return a.push({type:12,data:t},{type:12,data:i.pads},{type:12,data:i.strides}),s.push({name:"kernelStrides",type:"u32",length:t.length},{name:"pads",type:"u32",length:i.pads.length},{name:"strides",type:"u32",length:i.strides.length}),[a,s,!!i.pads.reduce((t,i)=>t+i),!1,!1]}},aA=(t,i,r,a,s,n,o,u,l,d,p,h)=>{let c="NHWC"===s.format,f=i.type.value,m=tC("output",i.type.tensor,a);if(s.kernelShape.length<=2){let a="",d="",g="",_=r-(c?2:1);if(a=p?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${_}] < 0 || xIndices[${_}]
                      >= uniforms.x_shape[${_}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${i.indicesToOffset("xIndices")}];
                  ${n}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${i.indicesToOffset("xIndices")}];
                  ${n}
                }`,2===s.kernelShape.length){let t=r-(c?3:2);d=h?`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${t}] = indices[${t}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${t}] < 0 || xIndices[${t}] >= uniforms.x_shape[${t}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${t}] = indices[${t}] * uniforms.sh - uniforms.phStart + j;
                `,g=`
              }
            `}return`
            ${t.registerUniforms(l).declareVariables(i,m)}

            ${t.mainStart()}
              ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${f}(${u});
              var pad = 0;
              ${d}
              ${a}
              ${g}
              ${o}

              output[global_idx] = value;
            }`}{if(c)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=s.kernelShape.length,p=s.pads.length,h="";return h=d?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${i.indicesToOffset("xIndices")}];
                ${n}
              }`:`
              }
              let x_val = x[${i.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${t.registerUniforms(l).declareVariables(i,m)}

            ${t.mainStart()}
              ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${a}>;

              var value = ${f}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${a-1}u; j++) {
                  offsets[j] = offset / ${tT("uniforms.kernelStrides","j",a)};
                  offset -= offsets[j] * ${tT("uniforms.kernelStrides","j",a)};
                }
                offsets[${a-1}] = offset;

                isPad = false;
                for (var j = ${r-a}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${tT("uniforms.strides",`j - ${r-a}u`,a)}
                    + offsets[j - ${r-a}u] - ${tT("uniforms.pads","j - 2u",p)};
                  ${h}
              }
              ${o}

              output[global_idx] = value;
            }`}},aR=t=>`${t.format};${t.ceilMode};${t.autoPad};${t.kernelShape.length}`,aD=t=>({format:t.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][t.auto_pad],ceilMode:t.ceil_mode,kernelShape:t.kernel_shape,strides:t.strides,pads:t.pads}),aM=(t,i,r,a)=>{let[s,n]=aO(i,a,r),o=tE("x",i.dataType,i.dims.length),u=o.type.value,l="";s.countIncludePad?l+=`value /= ${u}(uniforms.kernelSize);`:l+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[d,p,h,c,f]=aB(n,s);return d.push(...tw(i.dims,n)),{name:t,shaderCache:{hint:`${a.cacheKey};${h};${c};${f}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:i.dataType}],dispatchGroup:{x:Math.ceil(eJ.size(n)/64)},programUniforms:d}),getShaderSource:t=>aA(t,o,i.dims.length,n.length,s,"value += x_val;",l,0,p,h,c,f)}},aU=t=>{let i,r=0!==t.count_include_pad,a=aD(t);if(0!==a.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let s={countIncludePad:r,...a,cacheKey:""};return{...s,cacheKey:(i=s,`${aR(i)};${i.countIncludePad}`)}},aP=(t,i)=>{aC(t.inputs),t.compute(aM("AveragePool",t.inputs[0],!1,i))},aq={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},aN=t=>{let i=t.format;return{format:i,...aq,cacheKey:i}},aL=(t,i)=>{aC(t.inputs),t.compute(aM("GlobalAveragePool",t.inputs[0],!0,i))},aV=(t,i,r,a)=>{let[s,n]=aO(i,a,r),o=`
      value = max(x_val, value);
    `,u=tE("x",i.dataType,i.dims.length),[l,d,p,h,c]=aB(n,s);return l.push(...tw(i.dims,n)),{name:t,shaderCache:{hint:`${a.cacheKey};${p};${h};${c}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:i.dataType}],dispatchGroup:{x:Math.ceil(eJ.size(n)/64)},programUniforms:l}),getShaderSource:t=>aA(t,u,i.dims.length,n.length,s,o,"",10===i.dataType?-65504:-1e5,d,p,h,c)}},aG=(t,i)=>{aC(t.inputs),t.compute(aV("MaxPool",t.inputs[0],!1,i))},aW=t=>{let i,r=t.storage_order,a=t.dilations,s=aD(t);if(0!==r)throw Error("column major storage order is not yet supported for MaxPool");if(0!==s.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:r,dilations:a,...s,cacheKey:""};return{...n,cacheKey:(i=n,`${aR(i)};${i.storageOrder};${i.dilations}`)}},aH=t=>{let i=t.format;return{format:i,...aq,cacheKey:i}},aF=(t,i)=>{aC(t.inputs),t.compute(aV("GlobalMaxPool",t.inputs[0],!0,i))}}),ne=N(()=>{"use strict";sd(),sc(),s$(),sb(),aK=(t,i)=>{var r,a;let s,n,o,u,l,d,p,h,c,f,m,g,_,y,$,b,v,w,x,k,S,I,T;((t,i)=>{if(t.length<2||t.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===t.length&&t[1].dims===t[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===t.length&&t[0].dataType!==t[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(6===t[0].dataType&&t.length>2)throw Error("In the case of dequantizing int32 there is no zero point.");if(0!==t[1].dims.length&&1!==t[1].dims.length&&t[1].dims.length!==t[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(t.length>2){if(t[0].dataType!==t[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(t[1].dims.length!==t[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!t[1].dims.map((i,r)=>i===t[2].dims[r]).reduce((t,i)=>t&&i,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(i.blockSize>0){if(0===t[1].dims.length||1===t[1].dims.length&&1===t[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!t[1].dims.map((r,a)=>a===i.axis||r===t[0].dims[a]).reduce((t,i)=>t&&i,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(t[1].dims.length!==t[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let r=t[0].dims[i.axis],a=t[1].dims[i.axis];if(i.blockSize<Math.ceil(r/a)||i.blockSize>Math.ceil(r/(a-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}})(t.inputs,i),t.compute((r=t.inputs,a=i,s=eJ.normalizeAxis(a.axis,r[0].dims.length),o=3===(n=r[0].dataType),u=r[0].dims,l=r[1].dataType,d=eJ.size(u),h=(p=3===n||2===n)?[Math.ceil(eJ.size(r[0].dims)/4)]:r[0].dims,c=r[1].dims,m=(f=r.length>2?r[2]:void 0)?p?[Math.ceil(eJ.size(f.dims)/4)]:f.dims:void 0,_=!1==(g=0===c.length||1===c.length&&1===c[0])&&1===c.length,y=tx(d),b=($=g&&(!p||4===y))?y:1,v=tE("input",p?12:n,h.length,$&&!p?y:1),w=tE("scale",l,c.length),x=f?tE("zero_point",p?12:n,m.length):void 0,k=tC("output",l,u.length,b),S=[v,w],x&&S.push(x),I=[h,c],f&&I.push(m),T=[{type:12,data:d/b},{type:12,data:s},{type:12,data:a.blockSize},...tw(...I,u)],{name:"DequantizeLinear",shaderCache:{hint:a.cacheKey,inputDependencies:x?["rank","rank","rank"]:["rank","rank"]},getShaderSource:t=>`
      ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...S,k)}
      ${t.mainStart()}
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${k.offsetToIndices("global_idx")};

          // Set input x
          ${p?`
            let input = ${v.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===b?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${v.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${w.getByOffset("0")}`:_?`
            let scale_index = ${k.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${w.getByOffset("scale_index")};`:`
            var scale_indices: ${w.type.indices} = output_indices;
            let index = ${w.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${w.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${w.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${x?g?p?`
                let zero_point_input = ${x.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${x.getByOffset("0")}`:_?p?`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${x.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${x.getByOffset("zero_point_index")};`:p?`
                let zero_point_offset = ${w.indicesToOffset("scale_indices")};
                let zero_point_input = ${x.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${x.getByIndices("scale_indices")};`:`let zero_point_value = ${p?o?"i32":"u32":v.type.value}(0);`};
      // Compute and write output
      ${k.setByOffset("global_idx",`${k.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:u,dataType:l}],dispatchGroup:{x:Math.ceil(d/b/64),y:1,z:1},programUniforms:T})}))},aj=t=>t_({axis:t.axis,blockSize:t.blockSize})}),nt=N(()=>{"use strict";eu(),sd(),sb(),aZ=t=>{var i,r,a,s;let n,o,u,l=0,d=0,p=0;6===t.inputs[0].dataType?(l=t.inputs[0].getInt32Array()[0],d=t.inputs[1].getInt32Array()[0],p=t.inputs[2].getInt32Array()[0]):1===t.inputs[0].dataType&&(l=t.inputs[0].getFloat32Array()[0],d=t.inputs[1].getFloat32Array()[0],p=t.inputs[2].getFloat32Array()[0]),f.webgpu.validateInputContent&&((t,i,r)=>{if(t===i||t<i&&r<0||t>i&&r>0)throw Error("Range these inputs' contents are invalid.")})(l,d,p),t.compute((i=l,r=d,a=p,s=t.inputs[0].dataType,o=[n=Math.abs(Math.ceil((r-i)/a))],u=[{type:12,data:n},{type:s,data:i},{type:s,data:a},...tw(o)],{name:"Range",shaderCache:{hint:`${s}`},getShaderSource:t=>{let i=tC("output",s,o.length),r=i.type.value;return`
        ${t.registerUniforms([{name:"outputSize",type:"u32"},{name:"start",type:r},{name:"delta",type:r}]).declareVariables(i)}
        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${r}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:o,dataType:s}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:u})}),{inputs:[]})}}),ni=N(()=>{"use strict";sd(),sc(),s$(),sb(),aQ=t=>t_({reduction:t.reduction}),aX=(t,i)=>{var r,a;let s,n,o,u,l,d;t.compute((r=t.inputs,a=i,s=r[0].dims,n=r[1].dims,o=Math.ceil(eJ.sizeToDimension(n,n.length-1)/1),u=n[n.length-1],l=eJ.sizeFromDimension(s,u),d=[{type:12,data:o},{type:12,data:u},{type:12,data:l},...tw(r[1].dims,r[2].dims,s)],{name:"ScatterND",shaderCache:{hint:`${a.cacheKey}_${a.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:t=>{let i=tE("indices",r[1].dataType,r[1].dims.length),n=tE("updates",r[2].dataType,r[2].dims.length,1),o="none"!==a.reduction&&""!==a.reduction?tO("output",r[0].dataType,s.length):tC("output",r[0].dataType,s.length,1);return`
      ${t.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(i,n,o)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
    ${((t,i,r,a)=>{if("none"!==t&&"i32"!==a&&"u32"!==a&&"f32"!==a)throw Error(`Input ${a} is not supported with reduction ${t}.`);let s=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,n=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${i}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(t){case"none":return`${i}=${r};`;case"add":return"i32"===a||"u32"===a?`atomicAdd(&${i}, bitcast<${a}>(${r}));`:`
              ${s}bitcast<${a}>(oldValue) + (${r})${n}`;case"max":return"i32"===a||"u32"===a?`atomicMax(&${i}, bitcast<${a}>(${r}));`:`
                ${s}max(bitcast<f32>(oldValue), (${r}))${n}`;case"min":return"i32"===a||"u32"===a?`atomicMin(&${i}, bitcast<${a}>(${r}));`:`${s}min(bitcast<${a}>(oldValue), (${r}))${n}`;case"mul":return`${s}(bitcast<${a}>(oldValue) * (${r}))${n}`;default:throw Error(`Reduction ${t} is not supported.`)}})(a.reduction,"output[data_offset + i]","value",o.type.value)}
  }

      }`}}),{inputs:[t.inputs[1],t.inputs[2]],outputs:[]})}}),nr=N(()=>{"use strict";sd(),sc(),s$(),sb(),aY=(t,i,r,a)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${t}) * (${i});
  let whole = ${a}(big / (${r}));
  let fract = ${a}(big % (${r})) / ${a}(${r});
  return whole + fract;
`,aJ=(t,i,r,a)=>t.rank>a?`
    ${t.indicesSet("input_indices",i,"channel")};
    ${t.indicesSet("input_indices",r,"batch")};
`:"",a0=(t,i)=>{var r,a,s,n,o,u,l,d,p,h,c,f;let m,g,_,y,$,b,v,w,x,k,S,I,T,z,E,C,O=[],B=[],A=[],R=new Uint32Array(m=t.customDataBuffer,m.byteOffset,1)[0];if(0!==i.antialias)throw Error("Only default value (0) for Antialias attribute is supported");((t,i,r,a,s,n)=>{let[o,u,l]=r>10?[1,2,3]:[-1,t.length>1?1:-1,-1],d=t[0].dims.length;if(o>0&&t.length>o&&t[o].dims.length>0)t[o].getFloat32Array().forEach(t=>n.push(t));else if("tf_crop_and_resize"===i.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&t.length>u&&1===t[u].dims.length&&t[u].dims[0]>0){var p,h,c;let s;if(t[u].getFloat32Array().forEach(t=>a.push(t)),0!==a.length&&a.length!==d&&r>=18&&a.length!==i.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");((t,i)=>{if(t.every(t=>t>0||(()=>{throw Error("Resize requires scales input values to be positive")})),t.length>0){if("linear"===i.mode){if(2!==t.length&&3!==t.length&&(4!==t.length||1!==t[0]||1!==t[1])&&(4!==t.length||1!==t[0]||1!==t[3])&&(5!==t.length||1!==t[0]||1!==t[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===i.mode&&2!==t.length&&(4!==t.length||1!==t[0]||1!==t[1])&&(4!==t.length||1!==t[0]||1!==t[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}})(a,i),i.axes.length>0&&(p=a,h=i.axes,c=d,h.every(t=>t>=0&&t<c||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")})),s=Array(c).fill(1),h.forEach((t,i)=>s[t]=p[i]),s).forEach((t,i)=>a[i]=t)}if(l>0&&t.length>l&&1===t[l].dims.length&&t[l].dims[0]>0&&(t[l].getBigInt64Array().forEach(t=>s.push(Number(t))),0!==s.length&&s.length!==d&&r>=18&&s.length!==i.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(i.axes.length>0){if(0!==a.length&&a.length!==i.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==s.length&&s.length!==i.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if("u">typeof a&&"u">typeof s&&a.length>0&&s.length>d)throw Error("Resize requires only of scales or sizes to be specified")})(t.inputs,i,R,O,B,A),t.compute((r=t.inputs[0],a=i,s=R,n=O,o=B,u=A,y=r.dims,$=(l=u,d=a.axes,g=Array(p=y.length).fill(0).concat(Array(p).fill(1)),_=0===l.length?g:l.slice(),d.length>0?(d.forEach((t,i)=>{g[t]=_[i],g[i+p]=_[d.length+i]}),g):_),b=((t,i,r,a)=>{let s=[];if(r.length>0)if(a.length>0){if(t.forEach(t=>s.push(t)),Math.max(...a)>t.length)throw Error("axes is out of bound");a.forEach((t,i)=>s[t]=r[i])}else r.forEach(t=>s.push(t));else{if(0===i.length)throw Error("Resize requires either scales or sizes.");s=t.map((t,r)=>Math.round(t*i[r]))}return s})(y,n,o,a.axes),v=n.slice(),0===n.length&&(v=y.map((t,i)=>0===t?1:b[i]/t),"stretch"!==a.keepAspectRatioPolicy&&(h=y,c=v,f=a,w=(()=>{switch(f.keepAspectRatioPolicy){case"not_larger":return f.axes.length>0?Math.min(...f.axes.map(t=>c[t]),Number.MAX_VALUE):Math.min(...c,Number.MAX_VALUE);case"not_smaller":return f.axes.length>0?Math.max(...f.axes.map(t=>c[t]),5e-324):Math.max(...c,5e-324);default:throw Error(`Keep aspect ratio policy ${f.keepAspectRatioPolicy} is not supported`)}})(),c.fill(1,0,c.length),x=h.slice(),f.axes.length>0?(f.axes.forEach(t=>c[t]=w),f.axes.forEach(t=>x[t]=Math.round(h[t]*c[t]))):(c.fill(w,0,c.length),x.forEach((t,i)=>x[i]=Math.round(t*c[i]))),b=x)),k=tC("output",r.dataType,b.length),S=tE("input",r.dataType,y.length),I=eJ.size(b),T=y.length===b.length&&y.every((t,i)=>t===b[i]),z="tf_crop_and_resize"===a.coordinateTransformMode,E=a.extrapolationValue,C=S.type.value,{name:"Resize",shaderCache:{hint:`${a.cacheKey}|${s}|${v.length>0?"cubic"===a.mode?v:v.length:""}|${o.length>0?o:""}|${$.length>0?$:""}|${T}|${"nearest"===a.mode?y.length:y}`,inputDependencies:["rank"]},getShaderSource:t=>{let i,r;return`
      ${T?"":`
      ${i=a.coordinateTransformMode,r=C,`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${r} { `+(()=>{switch(i){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${r}(xResized) / ${r}(xScale);
          } else {
            ${aY("xResized","lengthOriginal","lengthResized",r)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${r}(xResized) + 0.5) / ${r}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${r}(xResized) + 0.5) / ${r}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${aY("xResized","lengthOriginal - 1","lengthResized - 1",r)}
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
                  return offset + ((${r}(xResized) + 0.5) / ${r}(xScale)) - 0.5;`;case"half_pixel":return`return ((${r}(xResized) + 0.5) / ${r}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${i} is not supported`)}})()+"}"};
      ${(()=>{switch(a.mode){case"nearest":let t,i,r,n,o,u,l,d,p,h,c,f;return`
              ${t=S,i=y,`
    fn checkInputIndices(input_indices: ${t.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var input_index = ${t.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${tT("uniforms.input_shape","i",i.length)}) {
          return false;
        }
      }
      return true;
    }`};
              ${r=a.nearestMode,n=s,o=C,`fn getNearestPixelFromOriginal(xOriginal: ${o}, isDownSample: bool) -> ${o} {`+(()=>{switch(r){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(n<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${r} is not supported`)}})()+"}"};
              ${u=S,l=k,d=y,p=b,h=v.length,c=$.length,f=z,`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${l.type.indices}) -> ${u.type.indices} {
      var input_indices: ${u.type.indices};
      for (var i:u32 = 0; i < ${p.length}; i++) {
        var output_index = ${l.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${tT("uniforms.scales","i",h)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${tT("uniforms.roi","i",c)};
          var roi_hi = ${tT("uniforms.roi",`i + ${d.length}`,c)};
          var input_shape_i = ${tT("uniforms.input_shape","i",d.length)};
          var output_shape_i = ${tT("uniforms.output_shape","i",p.length)};
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
              `;case"linear":let m,g,_,w,x;return`
              ${m=k,g=y,_=b,w=v.length,x=$.length,`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${m.type.indices}) -> array<${m.type.value}, ${_.length}> {
      var original_indices: array<${m.type.value}, ${_.length}>;
      for (var i:u32 = 0; i < ${_.length}; i++) {
        var output_index = ${m.indicesGet("output_indices","i")};
        var scale = ${tT("uniforms.scales","i",w)};
        var roi_low = ${tT("uniforms.roi","i",x)};
        var roi_hi = ${tT("uniforms.roi",`i + ${g.length}`,x)};
        if (scale == 1.0) {
          original_indices[i] = ${m.type.value}(output_index);
        } else {
          var input_shape_i = ${tT("uniforms.input_shape","i",g.length)};
          var output_shape_i = ${tT("uniforms.output_shape","i",_.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`};
              ${(()=>{if(2===y.length||4===y.length)return`${((t,i,r,a,s)=>{let[n,o,u,l]=2===r.length?[-1,0,1,-1]:[0,2,3,1],d=t.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${t.type.indices};
      ${t.indicesSet("input_indices",o,`max(0, min(row, ${r[o]} - 1))`)};
      ${t.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${aJ(t,l,n,2)}
      return ${t.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${i.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${o}];
      var col:${d} = originalIndices[${u}];
      ${a?`if (row < 0 || row > (${r[o]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${s};
      }`:""};
      row = max(0, min(row, ${r[o]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${n}])`:"0"};
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
    }`})(S,k,y,z,E)}`;if(3===y.length||5===y.length)return`${((t,i,r,a,s)=>{let[n,o,u,l,d]=3===r.length?[-1,0,1,2,-1]:[0,2,3,4,1],p=t.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${t.type.indices};
      ${t.indicesSet("input_indices",o,`max(0, min(depth, ${r[o]} - 1))`)};
      ${t.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${t.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${aJ(t,d,n,3)}
      return ${t.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${i.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${o}];
      var height:${p} = originalIndices[${u}];
      var width:${p} = originalIndices[${l}];
      ${a?`if (depth < 0 || depth > (${r[o]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${s};
        }`:""};

    depth = max(0, min(depth, ${r[o]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${n}])`:"0"};

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
    }`})(S,k,y,z,E)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===y.length||4===y.length)return`${((t,i,r,a,s,n,o,u,l,d)=>{let[p,h]=2===r.length?[0,1]:[2,3],c=t.type.value,f=o=>{let h=o===p?"row":"col";return`
      fn ${h}CubicInterpolation(input_indices: ${t.type.indices}, output_indices: ${i.type.indices}) -> ${c} {
        var output_index = ${i.indicesGet("output_indices",o)};
        var originalIdx: ${c} = getOriginalCoordinateFromResizedCoordinate(output_index, ${s[o]},
        ${a[o]}, ${r[o]}, ${n[o]}, ${n[o]} + ${r.length});
        var fractOriginalIdx: ${c} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[o]} - 1))) {
          return ${l};
        }
        var data: array<${c}, 4> = array<${c}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${h}: ${c} = originalIdx + ${c}(i);
          if (${h} < 0 || ${h} >= ${r[o]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${h} = max(0, min(${h}, ${r[o]} - 1));`};
          }
        var input_indices_copy: ${t.type.indices} = input_indices;
          ${t.indicesSet("input_indices_copy",o,`u32(${h})`)};
          data[i + 1] = ${o===p?t.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${f(p)};
    ${f(h)};
  fn getCubicInterpolationCoefs(s: ${c}) -> array<${c}, 4> {
    var absS = abs(s);
    var coeffs: array<${c}, 4> = array<${c}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${c} = 1.0 - absS;
    var twoMinusAbsS: ${c} = 2.0 - absS;
    var onePlusAbsS: ${c} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${c}, 4>, coefs: array<${c}, 4>) -> ${c} {
    var coefsSum: ${c} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${i.type.indices}) -> ${c} {
    var input_indices: ${t.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `})(S,k,y,b,v,$,a.cubicCoeffA,z,a.extrapolationValue,a.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${t.registerUniform("output_size","u32").registerUniform("scales","f32",v.length).registerUniform("roi","f32",$.length).declareVariables(S,k)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${T?"output[global_idx] = input[global_idx];":`
        let output_indices = ${k.offsetToIndices("global_idx")};
        var input_indices: ${S.type.indices};
        ${(()=>{switch(a.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${S.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${a.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${2===y.length||4===y.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${a.mode}`)}})()};
`}
      }`},getRunData:()=>({outputs:[{dims:b,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},{type:1,data:v},{type:1,data:$},...tw(y,b)]})}),{inputs:[0]})},a1=t=>{let i=t.antialias,r=t.axes,a=t.coordinateTransformMode,s=t.cubicCoeffA,n=0!==t.excludeOutside,o=t.extrapolationValue,u=t.keepAspectRatioPolicy,l=t.mode,d=""===t.nearestMode?"simple":t.nearestMode;return t_({antialias:i,axes:r,coordinateTransformMode:a,cubicCoeffA:s,excludeOutside:n,extrapolationValue:o,keepAspectRatioPolicy:u,mode:l,nearestMode:d})}}),na=N(()=>{"use strict";sd(),sc(),sb(),a2=(t,i)=>{var r,a,s,n;let o,u,l,d,p,h,c,f,m,g,_,y,$;(t=>{if(!t||t.length<3)throw Error("layerNorm requires at least 3 inputs.");let i=t[0],r=t[1],a=t[2];if(i.dataType!==r.dataType||i.dataType!==a.dataType)throw Error("All inputs must have the same data type");if(3!==i.dims.length&&2!==i.dims.length)throw Error("Input must be 2D or 3D");if(3!==r.dims.length&&2!==r.dims.length)throw Error("Skip must be 2D or 3D");let s=i.dims[i.dims.length-1],n=i.dims[i.dims.length-2];if(r.dims[r.dims.length-1]!==s)throw Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==n)throw Error("Skip must have the same sequence length as input");if(1!==a.dims.length)throw Error("Gamma must be 1D");if(a.dims[a.dims.length-1]!==s)throw Error("Gamma must have the same hidden size as input");if(t.length>3){let i=t[3];if(1!==i.dims.length)throw Error("Beta must be 1D");if(i.dims[i.dims.length-1]!==s)throw Error("Beta must have the same hidden size as input")}if(t.length>4){let i=t[4];if(1!==i.dims.length)throw Error("Bias must be 1D");if(i.dims[i.dims.length-1]!==s)throw Error("Bias must have the same hidden size as input")}})(t.inputs);let b=[0];t.outputCount>1&&b.push(-3),t.outputCount>2&&b.push(-3),t.outputCount>3&&b.push(3),t.compute((r=t.inputs,a=i,s=t.outputCount,n=!1,o=a.simplified,u=r[0].dims,l=eJ.size(u),d=u.slice(-1)[0],p=n?u.slice(0,-1).concat(1):[],h=!o&&r.length>3,c=r.length>4,f=n&&s>1,m=n&&s>2,g=s>3,y=[{type:12,data:l},{type:12,data:_=tx(d)},{type:12,data:d},{type:1,data:a.epsilon}],$=[{dims:u,dataType:r[0].dataType}],s>1&&$.push({dims:p,dataType:1}),s>2&&$.push({dims:p,dataType:1}),s>3&&$.push({dims:u,dataType:r[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${_};${f};${m};${g}`,inputDependencies:r.map((t,i)=>"type")},getShaderSource:t=>{let i=[tE("x",r[0].dataType,r[0].dims,_),tE("skip",r[1].dataType,r[1].dims,_),tE("gamma",r[2].dataType,r[2].dims,_)];h&&i.push(tE("beta",r[3].dataType,r[3].dims,_)),c&&i.push(tE("bias",r[4].dataType,r[4].dims,_)),i.push(tC("output",r[0].dataType,u,_)),f&&i.push(tC("mean_output",1,p)),m&&i.push(tC("inv_std_output",1,p)),g&&i.push(tC("input_skip_bias_sum",r[0].dataType,u,_));let a=tb(r[0].dataType),s=tb(1,_);return`

      ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...i)}
      var<workgroup> sum_shared : array<${s}, 64>;
      var<workgroup> sum_squared_shared : array<${s}, 64>;

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
          let bias_value = ${c?"bias[offset1d + i]":a+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${g?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${tS(a,_,"value")};
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
        let mean = ${tI("sum",_)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${tI("square_sum",_)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${a}(mean)`}) *
            ${a}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:y})}),{outputs:b})}}),ns=N(()=>{"use strict";sd(),sc(),s$(),sb(),a3=(t,i)=>{let r=[];if(t.length>i)if(7===t[i].dataType)t[i].getBigInt64Array().forEach(t=>r.push(Number(t)));else if(6===t[i].dataType)t[i].getInt32Array().forEach(t=>r.push(Number(t)));else throw Error(`Input ${i} must be an array of int32 or int64`);return r},a4=(t,i,r,a,s)=>{let n=t;return t<0&&(n+=r[a[i]]),s[i]<0?Math.max(0,Math.min(n,r[a[i]]-1)):Math.max(0,Math.min(n,r[a[i]]))},a6=(t,i)=>{var r=t.inputs,a=i;if(!r||r.length<1)throw Error("too few inputs");if(0!==a.axes.length){if(a.axes.length!==a.starts.length||a.axes.length!==a.ends.length)throw Error("axes, starts and ends must have the same length")}else if(a.starts.length!==a.ends.length)throw Error("starts and ends must have the same length");r.slice(1).forEach((t,i)=>{if(6!==r[i+1].dataType&&7!==r[i+1].dataType)throw Error(`Input ${i} must be an array of int32 or int64`)});let s=((t,i)=>{if(!(t.length>1))return i;{let i=a3(t,1),r=a3(t,2),a=a3(t,3);return 0===a.length&&(a=[...Array(t[0].dims.length).keys()]),t_({starts:i,ends:r,axes:a})}})(t.inputs,i);t.compute(((t,i)=>{let r=t[0].dims,a=eJ.size(r),s=i.axes.length>0?eJ.normalizeAxes(i.axes,r.length):[...Array(r.length).keys()],n=a3(t,4);n.forEach(t=>0!==t||(()=>{throw Error("step cannot be 0")})),0===n.length&&(n=Array(s.length).fill(1));let o=i.starts.map((t,i)=>a4(t,i,r,s,n)),u=i.ends.map((t,i)=>a4(t,i,r,s,n));if(s.length!==o.length||s.length!==u.length)throw Error("start, ends and axes should have the same number of elements");if(s.length!==r.length)for(let t=0;t<r.length;++t)s.includes(t)||(o.splice(t,0,0),u.splice(t,0,r[t]),n.splice(t,0,1));let l=n.map(t=>Math.sign(t));n.forEach((t,i,r)=>{if(t<0){let a=(u[i]-o[i])/t,s=o[i],l=s+a*n[i];o[i]=l,u[i]=s,r[i]=-t}});let d=r.slice(0);s.forEach((t,i)=>{d[t]=Math.ceil((u[t]-o[t])/n[t])});let p={dims:d,dataType:t[0].dataType},h=tC("output",t[0].dataType,d.length),c=tE("input",t[0].dataType,t[0].dims.length),f=eJ.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:n.length}],g=[{type:12,data:f},{type:12,data:o},{type:6,data:l},{type:12,data:n},...tw(t[0].dims,d)];return{name:"Slice",shaderCache:{hint:`${l.length}_${o.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:t=>{let i,a,s;return`
      ${t.registerUniforms(m).declareVariables(c,h)}
        ${i=c,a=h,s=r,`fn calculateInputIndices(output_indices: ${a.type.indices}) -> ${i.type.indices} {
          var input_indices: ${i.type.indices};
          var carry = 0u;
          for (var i = ${s.length-1}; i >= 0; i--) {
            let input_shape_i = ${tT("uniforms.input_shape","i",s.length)};
            let steps_i = ${tT("uniforms.steps","i",s.length)};
            let signs_i = ${tT("uniforms.signs","i",s.length)};
            let starts_i = ${tT("uniforms.starts","i",s.length)};
            var output_index = ${a.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${i.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`}
        ${t.mainStart()}
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",c.getByIndices("input_indices"))}
      }`},getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:g})}})(t.inputs,s),{inputs:[0]})},a8=t=>{let i=t.starts,r=t.ends,a=t.axes;return t_({starts:i,ends:r,axes:a})}}),nn=N(()=>{"use strict";sd(),sc(),s$(),sv(),sb(),a5=(t,i)=>{var r,a;let s,n,o,u,l,d,p,h,c,f,m,g,_,y,$,b,v,w,x;(t=>{if(!t||1!==t.length)throw Error("Softmax op requires 1 input.")})(t.inputs),r=t,a=i,n=(s=r.inputs[0]).dims,o=eJ.size(n),u=n.length,d=(l=eJ.normalizeAxis(a.axis,u))<n.length-1,h=[],d?((h=Array.from({length:u},(t,i)=>i))[l]=u-1,h[u-1]=l,p=r.compute(tM(s,h),{inputs:[s],outputs:[-1]})[0]):p=s,m=o/(f=(c=p.dims)[u-1]),g=tx(f),_=f/g,y=64,1===m&&(y=256),$=tE("x",p.dataType,p.dims,g),b=tC("result",p.dataType,p.dims,g),v=$.type.value,w="f32"===tb(p.dataType)?`var threadMax = ${v}(-3.4028234663852886e+38f);`:`var threadMax = ${v}(-65504.0h);`,x=r.compute({name:"Softmax",shaderCache:{hint:`${g};${y}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:p.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:_}]}),getShaderSource:t=>{let i;return`
      var<workgroup> rowMaxShared : ${v};
      var<workgroup> rowSumShared : ${v};
      var<workgroup> threadShared : array<${v}, ${y}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${v} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${v}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${t.registerUniform("packedCols","i32").declareVariables($,b)}
      ${t.mainStart(y)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${y};
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
          rowMaxShared = ${v}(${i="threadShared[0]",4===g?`max(max(${i}.x, ${i}.y), max(${i}.z, ${i}.w))`:2===g?`max(${i}.x, ${i}.y)`:3===g?`max(max(${i}.x, ${i}.y), ${i}.z)`:i});
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
          rowSumShared = ${v}(${tI("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${v}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`}},{inputs:[p],outputs:[d?-1:0]})[0],d&&r.compute(tM(x,h),{inputs:[x]})},a7=t=>t_({axis:t.axis})}),no=N(()=>{"use strict";sd(),sc(),sb(),a9=t=>Array.from(t.getBigInt64Array(),Number),se=t=>{var i,r;let a,s,n,o,u,l,d;(t=>{if(!t||2!==t.length)throw Error("Tile requires 2 inputs.");if(1!==t[0].dataType&&10!==t[0].dataType&&6!==t[0].dataType&&12!==t[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==t[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==t[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(a9(t[1]).length!==t[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")})(t.inputs),t.compute((a=(i=t.inputs)[0].dims,n=((t,i)=>{let r=[];for(let a=0;a<t.length;++a)r.push(t[a]*i[a]);return r})(a,s=r??a9(i[1])),o=eJ.size(n),u=i[0].dataType,l=tE("input",u,a.length),d=tC("output",u,n.length),{name:"Tile",shaderCache:{hint:`${s}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},...tw(i[0].dims,n)]}),getShaderSource:t=>`
      const inputShape = ${l.indices(...a)};
      ${t.registerUniform("output_size","u32").declareVariables(l,d)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${l.type.indices};
      for (var i = 0; i < ${a.length}; i++) {
        let input_dim_i = ${l.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${l.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",l.getByIndices("input_indices"))}
    }`}),{inputs:[0]})}}),nu=N(()=>{"use strict";sd(),sc(),sb(),st=t=>{t.compute((t=>{let i=t[1].dims,r=t[2].dims,a=t[0].dims,s=t[1].dataType,n=!(eJ.areEqual(i,r)&&eJ.areEqual(r,a)),o=i,u=eJ.size(i);if(n){let t=eY.calcShape(eY.calcShape(i,r,!1),a,!1);if(!t)throw Error("Can't perform where op on the given tensors");o=t,u=eJ.size(o)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:i=>((t,i,r,a,s)=>{let n=tC("output_data",s,r.length,4),o=tE("a_data",i[1].dataType,i[1].dims.length,4),u=tE("b_data",i[2].dataType,i[2].dims.length,4),l=tE("c_data",i[0].dataType,i[0].dims.length,4),d,p=(t,i,r)=>`select(${i}, ${t}, ${r})`;if(a){let t=(t,i,r="")=>{let a=`a_data[index_a${i}][component_a${i}]`,s=`b_data[index_b${i}][component_b${i}]`,d=`bool(c_data[index_c${i}] & (0xffu << (component_c${i} * 8)))`;return`
            let output_indices${i} = ${n.offsetToIndices(`global_idx * 4u + ${i}u`)};
            let offset_a${i} = ${o.broadcastedIndicesToOffset(`output_indices${i}`,n)};
            let offset_b${i} = ${u.broadcastedIndicesToOffset(`output_indices${i}`,n)};
            let offset_c${i} = ${l.broadcastedIndicesToOffset(`output_indices${i}`,n)};
            let index_a${i} = offset_a${i} / 4u;
            let index_b${i} = offset_b${i} / 4u;
            let index_c${i} = offset_c${i} / 4u;
            let component_a${i} = offset_a${i} % 4u;
            let component_b${i} = offset_b${i} % 4u;
            let component_c${i} = offset_c${i} % 4u;
            ${t}[${i}] = ${r}(${p(a,s,d)});
          `};d=9===s?`
            var data = vec4<u32>(0);
            ${t("data",0,"u32")}
            ${t("data",1,"u32")}
            ${t("data",2,"u32")}
            ${t("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${t("output_data[global_idx]",0)}
            ${t("output_data[global_idx]",1)}
            ${t("output_data[global_idx]",2)}
            ${t("output_data[global_idx]",3)}
          `}else d=n.setByOffset("global_idx",p(o.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));return`
        ${t.registerUniform("vec_size","u32").declareVariables(l,o,u,n)}
        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`})(i,t,o,n,s),getRunData:()=>({outputs:[{dims:o,dataType:s}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...tw(a,i,r,o)]})}})(t.inputs))}}),nl=N(()=>{"use strict";sk(),sS(),sI(),sT(),sE(),sC(),sO(),sN(),sV(),sG(),sW(),sH(),sF(),sK(),sj(),sZ(),sQ(),sX(),sY(),sJ(),s3(),s4(),s6(),s8(),s5(),s0(),s7(),s9(),ne(),nt(),ni(),sx(),nr(),s2(),na(),ns(),nn(),s1(),no(),sv(),sz(),nu(),si=new Map([["Abs",[iy]],["Acos",[i$]],["Acosh",[ib]],["Add",[i5]],["ArgMax",[il,id]],["ArgMin",[iu,id]],["Asin",[iv]],["Asinh",[iw]],["Atan",[ix]],["Atanh",[ik]],["Attention",[ic]],["AveragePool",[aP,aU]],["BatchNormalization",[im]],["BiasAdd",[ig]],["BiasSplitGelu",[i6]],["Cast",[iI,iS]],["Ceil",[iz]],["Clip",[iT]],["Concat",[ro,ru]],["Conv",[rR,rB]],["ConvTranspose",[rL,rq]],["Cos",[iE]],["Cosh",[iC]],["CumSum",[rV,rG]],["DepthToSpace",[rW,rH]],["DequantizeLinear",[aK,aj]],["Div",[i7]],["Einsum",[rY,rJ]],["Elu",[iB,iO]],["Equal",[i9]],["Erf",[iR]],["Exp",[iD]],["Expand",[r1]],["FastGelu",[r2]],["Floor",[iM]],["FusedConv",[rR,rB]],["Gather",[r4,r3]],["GatherElements",[ae,r9]],["GatherBlockQuantized",[r5,r7]],["GatherND",[r6,r8]],["Gelu",[iU]],["Gemm",[ai,at]],["GlobalAveragePool",[aL,aN]],["GlobalMaxPool",[aF,aH]],["Greater",[rr]],["GreaterOrEqual",[rs]],["GridSample",[au,al]],["GroupQueryAttention",[aw]],["HardSigmoid",[iH,iW]],["InstanceNormalization",[ak]],["LayerNormalization",[aS]],["LeakyRelu",[iP,iO]],["Less",[ra]],["LessOrEqual",[rn]],["Log",[i2]],["MatMul",[aI]],["MatMulNBits",[aT,az]],["MaxPool",[aG,aW]],["Mul",[re]],["MultiHeadAttention",[af,ap]],["Neg",[iN]],["Not",[iq]],["Pad",[aE]],["Pow",[rt]],["QuickGelu",[i4,iO]],["Range",[aZ]],["Reciprocal",[iL]],["ReduceMin",[it]],["ReduceMean",[t8]],["ReduceMax",[ie]],["ReduceSum",[ir]],["ReduceProd",[ii]],["ReduceL1",[t5]],["ReduceL2",[t7]],["ReduceLogSum",[is]],["ReduceLogSumExp",[t9]],["ReduceSumSquare",[ia]],["Relu",[iV]],["Resize",[a0,a1]],["RotaryEmbedding",[a$]],["ScatterND",[aX,aQ]],["Sigmoid",[iG]],["Sin",[iF]],["Sinh",[iK]],["Slice",[a6,a8]],["SkipLayerNormalization",[a2]],["Split",[ag,a_]],["Sqrt",[ij]],["Softmax",[a5,a7]],["Sub",[ri]],["Tan",[iZ]],["Tanh",[iX]],["ThresholdedRelu",[i1,iO]],["Tile",[se]],["Transpose",[tU,tP]],["Where",[st]]])}),nd=N(()=>{"use strict";eu(),sh(),sb(),sr=class{constructor(t){this.backend=t,this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,i){this.repo.set(t,i)}run(t,i,r,a,s){A(t.programInfo.name);let n=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let u=[];for(let t of i)u.push({binding:u.length,resource:{buffer:t.buffer}});for(let t of r)u.push({binding:u.length,resource:{buffer:t.buffer}});s&&u.push({binding:u.length,resource:s});let l=n.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:u,label:t.programInfo.name});if("capturing"===this.backend.sessionStatus){let i={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:l,dispatchGroup:a};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(i)}o.setPipeline(t.computePipeline),o.setBindGroup(0,l),o.dispatchWorkgroups(...a),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),R(t.programInfo.name)}dispose(){}build(t,i){A(t.name);let r=this.backend.device,a=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(t=>{r.features.has(t.feature)&&a.push(`enable ${t.extension};`)});let s=tR(i,this.backend.device.limits),n=t.getShaderSource(s),o=`${a.join(`
`)}
${s.additionalImplementations}
${n}`,u=r.createShaderModule({code:o,label:t.name});eQ("verbose",()=>`[WebGPU] ${t.name} shader code: ${o}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:t.name});return R(t.name),{programInfo:t,computePipeline:l,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(t){let i="number"==typeof t?t:t.x,r="number"==typeof t?1:t.y||1,a="number"==typeof t?1:t.z||1,s=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(i<=s&&r<=s&&a<=s)return[i,r,a];let n=i*r*a,o=Math.ceil(Math.sqrt(n));if(!(o>s))return[o,o,1];if((o=Math.ceil(Math.cbrt(n)))>s)throw Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}}}),np={};L(np,{WebGpuBackend:()=>nc});var nh,nc,nf=N(()=>{"use strict";eu(),sd(),sh(),sf(),sy(),nl(),nd(),nh=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},nc=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,i){this.env=t;let r=[],a={requiredLimits:{maxComputeWorkgroupStorageSize:i.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:i.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:i.limits.maxStorageBufferBindingSize,maxBufferSize:i.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:i.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:i.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:i.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:i.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},s=t=>i.features.has(t)&&r.push(t)&&!0;s("chromium-experimental-timestamp-query-inside-passes")||s("timestamp-query"),s("shader-f16"),s("subgroups"),this.device=await i.requestDevice(a),this.adapterInfo=new nh(i.info||await i.requestAdapterInfo()),this.gpuDataManager=tm(this),this.programManager=new sr(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,eZ(t.logLevel,!!t.debug),this.device.onuncapturederror=t=>{t.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${t.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:i,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){"u">typeof this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),i={};"at-passes"===this.queryType&&(i.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=t.beginComputePass(i)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let t;this.commandEncoder&&(A(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),t=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&t.mapAsync(GPUMapMode.READ).then(()=>{let i=new BigUint64Array(t.getMappedRange()),r=this.pendingQueries.get(t);for(let t=0;t<i.length/2;t++){let a=r[t],s=a.kernelId,n=this.kernels.get(s),o=n.kernelType,u=n.kernelName,l=a.programName,d=a.inputTensorViews,p=a.outputTensorViews,h=i[2*t],c=i[2*t+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let f=Number(h-this.queryTimeBase),m=Number(c-this.queryTimeBase);if(!Number.isSafeInteger(f)||!Number.isSafeInteger(m))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:d.map(t=>({dims:t.dims,dataType:eP(t.dataType)})),outputsMetadata:p.map(t=>({dims:t.dims,dataType:eP(t.dataType)})),kernelId:s,kernelType:o,kernelName:u,programName:l,startTime:f,endTime:m});else{let t="";d.forEach((i,r)=>{t+=`input[${r}]: [${i.dims}] | ${eP(i.dataType)}, `});let i="";p.forEach((t,r)=>{i+=`output[${r}]: [${t.dims}] | ${eP(t.dataType)}, `}),console.log(`[profiling] kernel "${s}|${o}|${u}|${l}" ${t}${i}start time: ${f} ns, execution time: ${m-f} ns`)}O("GPU",`${l}::${h}::${c}`)}t.unmap(),this.pendingQueries.delete(t)}),R())}run(t,i,r,a,s,n){var o,u,l;let d,p;A(t.name);let h=[];for(let t=0;t<i.length;++t){let r=i[t].data;if(0===r)continue;let a=this.gpuDataManager.get(r);if(!a)throw Error(`no GPU data for input: ${r}`);h.push(a)}let{outputs:c,dispatchGroup:f,programUniforms:m}=t.getRunData(i),g=0===r.length?c.map((t,i)=>i):r;if(g.length!==c.length)throw Error(`Output size ${g.length} must be equal to ${c.length}.`);let _=[],y=[];for(let t=0;t<c.length;++t){if(!Number.isInteger(g[t])||g[t]<-3||g[t]>=n)throw Error(`Invalid output index: ${g[t]}`);if(-3===g[t])continue;let i=-1===g[t],r=-2===g[t],o=i||r?s(c[t].dataType,c[t].dims):a(g[t],c[t].dataType,c[t].dims);if(_.push(o),0===o.data)continue;let u=this.gpuDataManager.get(o.data);if(!u)throw Error(`no GPU data for output: ${o.data}`);if(i&&this.temporaryData.push(u),r){let t=this.kernelPersistentData.get(this.currentKernelId);t||(t=[],this.kernelPersistentData.set(this.currentKernelId,t)),t.push(u)}y.push(u)}if(h.length!==i.length||y.length!==_.length){if(0===y.length)return R(t.name),_;throw Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(m){let t=0,i=[];m.forEach(r=>{let a="number"==typeof r.data?[r.data]:r.data;if(0===a.length)return;let s=10===r.type?2:4,n,o;10===r.type?(o=a.length>4?16:a.length>2?8:a.length*s,n=a.length>4?16:s*a.length):(o=a.length<=2?a.length*s:16,n=16),t=Math.ceil(t/o)*o,i.push(t);let u=10===r.type?8:4;t+=a.length>4?Math.ceil(a.length/u)*n:a.length*s});let r=new ArrayBuffer(t=16*Math.ceil(t/16));m.forEach((t,a)=>{let s=i[a],n="number"==typeof t.data?[t.data]:t.data;if(6===t.type)new Int32Array(r,s,n.length).set(n);else if(12===t.type)new Uint32Array(r,s,n.length).set(n);else if(10===t.type)new Uint16Array(r,s,n.length).set(n);else if(1===t.type)new Float32Array(r,s,n.length).set(n);else throw Error(`Unsupported uniform type: ${eP(t.type)}`)});let a=this.gpuDataManager.create(t,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(a.buffer,0,r,0,t),this.gpuDataManager.release(a.id),d={offset:0,size:t,buffer:a.buffer}}let $=this.programManager.normalizeDispatchGroupSize(f),b=(o=t,u=i,l=1===$[1]&&1===$[2],p=o.name,o.shaderCache?.hint&&(p+="["+o.shaderCache.hint+"]"),p+=":"+l+`:${((t,i)=>{if(i.length!==t.length)throw Error(`inputDependencies length ${i.length} is not equal to inputTensors length ${t.length}.`);let r=[];for(let a=0;a<t.length;++a){let s=t[a].dataType;switch(i[a]){case"none":r.push("");break;case"type":r.push(`${s}`);break;case"rank":{let i=t[a].dims.length;r.push(`${s};${i}`);break}case"dims":{let i=t[a].dims.join(",");r.push(`${s};${i}`);break}default:throw Error(`unsupported input dependency: ${i[a]}`)}}return r.join("|")})(u,o.shaderCache?.inputDependencies??Array(u.length).fill("dims"))}`),v=this.programManager.getArtifact(b);if(v||(v=this.programManager.build(t,$),this.programManager.setArtifact(b,v),eQ("info",()=>`[artifact] key: ${b}, programName: ${t.name}`)),m&&v.uniformVariablesInfo){if(m.length!==v.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${m.length} in program "${v.programInfo.name}".`);for(let t=0;t<m.length;t++){let i=m[t],r=i.type,a="number"==typeof i.data?1:i.data.length,[s,n]=v.uniformVariablesInfo[t];if(r!==s||a!==n)throw Error(`Uniform variable ${t} mismatch: expect type ${s} with size ${n}, got type ${r} with size ${a} in program "${v.programInfo.name}".`)}}if(eQ("info",()=>`[ProgramManager] run "${t.name}" (key=${b}) with ${$[0]}x${$[1]}x${$[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let t={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:i,outputTensorViews:_};this.pendingKernels.push(t),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(t)}return this.programManager.run(v,h,y,$,d),R(t.name),_}upload(t,i){this.gpuDataManager.upload(t,i)}memcpy(t,i){this.gpuDataManager.memcpy(t,i)}async download(t,i){await this.gpuDataManager.download(t,i)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,i,r,a){let s=si.get(t);if(!s)throw Error(`kernel not implemented: ${t}`);let n={kernelType:t,kernelName:a,kernelEntry:s[0],attributes:[s[1],r]};this.kernels.set(i,n)}releaseKernel(t){let i=this.kernelPersistentData.get(t);if(i){for(let t of i)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,i,r){let a=this.kernels.get(t);if(!a)throw Error(`kernel not created: ${t}`);let s=a.kernelType,n=a.kernelName,o=a.kernelEntry,u=a.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${s}] ${n}" is not allowed to be called recursively`);this.currentKernelId=t,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),eQ("info",()=>`[WebGPU] Start to run kernel "[${s}] ${n}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),o(i,u[1]),0}catch(t){return r.push(Promise.resolve(`[WebGPU] Kernel "[${s}] ${n}" failed. ${t}`)),1}finally{for(let t of(l&&r.push(this.device.popErrorScope().then(t=>t?`GPU validation error for kernel "[${s}] ${n}": ${t.message}`:null)),this.temporaryData))this.gpuDataManager.release(t.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,i,r,a){let s=this.sessionExternalDataMapping.get(t);s||(s=new Map,this.sessionExternalDataMapping.set(t,s));let n=s.get(i),o=this.gpuDataManager.registerExternalBuffer(r,a,n);return s.set(i,[o,r]),o}unregisterBuffers(t){let i=this.sessionExternalDataMapping.get(t);i&&(i.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let i=this.gpuDataManager.get(t);if(!i)throw Error(`no GPU data for buffer: ${t}`);return i.buffer}createDownloader(t,i,r){return async()=>{let a=await tc(this,t,i);return e4(a.buffer,r)}}writeTimestamp(t){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){eQ("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){eQ("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){eQ("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),i=this.capturedPendingKernels.get(this.currentSessionId),r=t.length;this.pendingKernels=[];for(let a=0;a<r;a++){let r=this.getComputePassEncoder(),s=t[a];this.writeTimestamp(2*this.pendingDispatchNumber),r.setPipeline(s.computePipeline),r.setBindGroup(0,s.bindGroup),r.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(i[a]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}}),nm={};L(nm,{init:()=>ny});var ng,n_,ny,n$,nb,nv,nw,nx,nk,nS,nI,nT,nz,nE,nC,nO,nB,nA,nR,nD,nM,nU,nP,nq,nN,nL,nV,nG,nW,nH,nF,nK,nj,nZ,nQ,nX=N(()=>{"use strict";sd(),sh(),sc(),sg(),ng=class t{constructor(t,i,r,a){this.module=t,this.dataType=i,this.data=r,this.dims=a}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let t=eJ.size(this.dims);return 0===t?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let t=eJ.size(this.dims);return 0===t?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let t=eJ.size(this.dims);return 0===t?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let t=eJ.size(this.dims);return 0===t?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(i){if(eJ.size(i)!==eJ.size(this.dims))throw Error("Invalid new shape");return new t(this.module,this.dataType,this.data,i)}},n_=class{constructor(t,i,r){this.module=t,this.backend=i,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=i.adapterInfo;let a=t.PTR_SIZE,s=r/t.PTR_SIZE,n=4===a?"i32":"i64";this.opKernelContext=Number(t.getValue(a*s++,n));let o=Number(t.getValue(a*s++,n));this.outputCount=Number(t.getValue(a*s++,n)),this.customDataOffset=Number(t.getValue(a*s++,"*")),this.customDataSize=Number(t.getValue(a*s++,n));let u=[];for(let i=0;i<o;i++){let i=Number(t.getValue(a*s++,n)),r=Number(t.getValue(a*s++,"*")),o=Number(t.getValue(a*s++,n)),l=[];for(let i=0;i<o;i++)l.push(Number(t.getValue(a*s++,n)));u.push(new ng(t,i,r,l))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,i){let r=i?.inputs?.map(t=>"number"==typeof t?this.inputs[t]:t)??this.inputs,a=i?.outputs??[],s=(t,i,r)=>new ng(this.module,i,this.output(t,r),r),n=(t,i)=>{let r=eq(t,i);if(!r)throw Error(`Unsupported data type: ${t}`);let a=r>0?this.backend.gpuDataManager.create(r).id:0;return new ng(this.module,t,a,i)};return this.backend.run(t,r,a,s,n,this.outputCount)}output(t,i){let r=this.module.stackSave();try{let r=this.module.PTR_SIZE,a=4===r?"i32":"i64",s=this.module.stackAlloc((1+i.length)*r);this.module.setValue(s,i.length,a);for(let t=0;t<i.length;t++)this.module.setValue(s+r*(t+1),i[t],a);return this.module._JsepOutput(this.opKernelContext,t,s)}catch(r){throw Error(`Failed to generate kernel's output[${t}] with dims [${i}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(r)}}},ny=async(t,i,r,a)=>{let s=i.jsepInit;if(!s)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===t){let t=new(nf(),V(np)).WebGpuBackend;await t.initialize(r,a),s("webgpu",[t,i=>t.alloc(Number(i)),i=>t.free(i),(r,a,s,n=!1)=>{if(n)eQ("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(r)}, dst=${Number(a)}, size=${Number(s)}`),t.memcpy(Number(r),Number(a));else{eQ("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(r)}, gpuDataId=${Number(a)}, size=${Number(s)}`);let n=i.HEAPU8.subarray(Number(r>>>0),Number(r>>>0)+Number(s));t.upload(Number(a),n)}},async(r,a,s)=>{eQ("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${r}, dataOffset=${a}, size=${s}`),await t.download(Number(r),()=>i.HEAPU8.subarray(Number(a)>>>0,Number(a+s)>>>0))},(r,a,s)=>t.createKernel(r,Number(a),s,i.UTF8ToString(i._JsepGetNodeName(Number(a)))),i=>t.releaseKernel(i),(r,a,s,n)=>{eQ("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${s}, kernel=${r}, contextDataOffset=${a}`);let o=new n_(i,t,Number(a));return t.computeKernel(Number(r),o,n)},()=>t.captureBegin(),()=>t.captureEnd(),()=>t.replay()])}else{let t=new to(r);s("webnn",[t,()=>t.reserveTensorId(),i=>t.releaseTensorId(i),async(i,r,a,s,n)=>t.ensureTensor(i,r,a,s,n),(i,r)=>{t.uploadTensor(i,r)},async(i,r)=>t.downloadTensor(i,r),(i,r)=>t.registerMLContext(i,r),!!r.trace])}}}),nY=N(()=>{"use strict";eu(),su(),sl(),sd(),sn(),so(),sp(),n$=async t=>{var i,r;i=t.wasm.numThreads,r=eL(t.logLevel),0!==eE()._OrtInit(i,r)&&eB("Can't initialize onnxruntime.")},nb=async(t,i)=>{eE().asyncInit?.();let r=t.webgpu.adapter;if("webgpu"===i){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(r){if("object"!=typeof r.limits||"object"!=typeof r.features||"function"!=typeof r.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=t.webgpu.powerPreference;if(void 0!==i&&"low-power"!==i&&"high-performance"!==i)throw Error(`Invalid powerPreference setting: "${i}"`);let a=t.webgpu.forceFallbackAdapter;if(void 0!==a&&"boolean"!=typeof a)throw Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(!(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:a})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===i&&(typeof navigator>"u"||!navigator.ml))throw Error("WebNN is not supported in current environment");{let a=(nX(),V(nm)).init;"webgpu"===i&&await a("webgpu",eE(),t,r),"webnn"===i&&await a("webnn",eE(),t)}},nv=new Map,nw=(t,i)=>{let r=eE(),a=r.stackSave(),s=0;try{let a=r.PTR_SIZE,n=r.stackAlloc(2*a);0!==r._OrtGetInputOutputMetadata(t,i,n,n+a)&&eB("Can't get session input/output metadata.");let o=Number(r.getValue(n,"*"));s=Number(r.getValue(n+a,"*"));let u=r.HEAP32[s/4];if(0===u)return[o,0];let l=r.HEAPU32[s/4+1],d=[];for(let t=0;t<l;t++){let i=Number(r.getValue(s+8+t*a,"*"));d.push(0!==i?r.UTF8ToString(i):Number(r.getValue(s+8+(t+l)*a,"*")))}return[o,u,d]}finally{r.stackRestore(a),0!==s&&r._OrtFree(s)}},nx=t=>{let i=eE(),r=i._malloc(t.byteLength);if(0===r)throw Error(`Can't create a session. failed to allocate a buffer of size ${t.byteLength}.`);return i.HEAPU8.set(t,r),[r,t.byteLength]},nk=async(t,i)=>{let r,a,s=eE();Array.isArray(t)?[r,a]=t:t.buffer===s.HEAPU8.buffer?[r,a]=[t.byteOffset,t.byteLength]:[r,a]=nx(t);let n=0,o=0,u=0,l=[],d=[],p=[];try{if([o,l]=await eM(i),i?.externalData&&s.mountExternalData){let t=[];for(let r of i.externalData){let i="string"==typeof r?r:r.path;t.push(eH("string"==typeof r?r:r.data).then(t=>{s.mountExternalData(i,t)}))}await Promise.all(t)}for(let t of i?.executionProviders??[])if(("string"==typeof t?t:t.name)==="webnn"){if(s.shouldTransferToMLTensor=!1,"string"!=typeof t){let i=t?.context,r=t?.gpuDevice,a=t?.deviceType,n=t?.powerPreference;i?s.currentContext=i:r?s.currentContext=await s.webnnCreateMLContext(r):s.currentContext=await s.webnnCreateMLContext({deviceType:a,powerPreference:n})}else s.currentContext=await s.webnnCreateMLContext();break}n=await s._OrtCreateSession(r,a,o),s.webgpuOnCreateSession?.(n),0===n&&eB("Can't create a session."),s.jsepOnCreateSession?.(),s.currentContext&&(s.webnnRegisterMLContext(n,s.currentContext),s.currentContext=void 0,s.shouldTransferToMLTensor=!0);let[t,h]=(t=>{let i=eE(),r=i.stackSave();try{let r=i.PTR_SIZE,a=i.stackAlloc(2*r);0!==i._OrtGetInputOutputCount(t,a,a+r)&&eB("Can't get session input/output count.");let s=4===r?"i32":"i64";return[Number(i.getValue(a,s)),Number(i.getValue(a+r,s))]}finally{i.stackRestore(r)}})(n),c=!!i?.enableGraphCapture,f=[],m=[],g=[],_=[],y=[];for(let i=0;i<t;i++){let[t,r,a]=nw(n,i);0===t&&eB("Can't get an input name."),d.push(t);let o=s.UTF8ToString(t);f.push(o),g.push(0===r?{name:o,isTensor:!1}:{name:o,isTensor:!0,type:eP(r),shape:a})}for(let r=0;r<h;r++){let[a,o,u]=nw(n,r+t);0===a&&eB("Can't get an output name."),p.push(a);let l=s.UTF8ToString(a);m.push(l),_.push(0===o?{name:l,isTensor:!1}:{name:l,isTensor:!0,type:eP(o),shape:u});{if(c&&i?.preferredOutputLocation===void 0){y.push("gpu-buffer");continue}let t="string"==typeof i?.preferredOutputLocation?i.preferredOutputLocation:i?.preferredOutputLocation?.[l]??"cpu",r=s.webnnIsGraphOutput;if("cpu"===t&&r&&r(n,l)){y.push("ml-tensor-cpu-output");continue}if("cpu"!==t&&"cpu-pinned"!==t&&"gpu-buffer"!==t&&"ml-tensor"!==t)throw Error(`Not supported preferred output location: ${t}.`);if(c&&"gpu-buffer"!==t)throw Error(`Not supported preferred output location: ${t}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);y.push(t)}}let $=null;return y.some(t=>"gpu-buffer"===t||"ml-tensor"===t||"ml-tensor-cpu-output"===t)&&(u=s._OrtCreateBinding(n),0===u&&eB("Can't create IO binding."),$={handle:u,outputPreferredLocations:y,outputPreferredLocationsEncoded:y.map(t=>"ml-tensor-cpu-output"===t?"ml-tensor":t).map(t=>eW(t))}),nv.set(n,[n,d,p,$,c,!1]),[n,f,m,g,_]}catch(t){throw d.forEach(t=>s._OrtFree(t)),p.forEach(t=>s._OrtFree(t)),0!==u&&0!==s._OrtReleaseBinding(u)&&eB("Can't release IO binding."),0!==n&&0!==s._OrtReleaseSession(n)&&eB("Can't release session."),t}finally{s._free(r),0!==o&&0!==s._OrtReleaseSessionOptions(o)&&eB("Can't release session options."),l.forEach(t=>s._free(t)),s.unmountExternalData?.()}},nS=t=>{let i=eE(),r=nv.get(t);if(!r)throw Error(`cannot release session. invalid session id: ${t}`);let[a,s,n,o,u]=r;o&&(u&&0!==i._OrtClearBoundOutputs(o.handle)&&eB("Can't clear bound outputs."),0!==i._OrtReleaseBinding(o.handle)&&eB("Can't release IO binding.")),i.jsepOnReleaseSession?.(t),i.webnnOnReleaseSession?.(t),i.webgpuOnReleaseSession?.(t),s.forEach(t=>i._OrtFree(t)),n.forEach(t=>i._OrtFree(t)),0!==i._OrtReleaseSession(a)&&eB("Can't release session."),nv.delete(t)},nI=async(t,i,r,a,s,n,o=!1)=>{if(!t)return void i.push(0);let u=eE(),l=u.PTR_SIZE,d=t[0],p=t[1],h=t[3],c=h,f,m;if("string"===d&&("gpu-buffer"===h||"ml-tensor"===h))throw Error("String tensor is not supported on GPU.");if(o&&"gpu-buffer"!==h)throw Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if("gpu-buffer"===h){let i=t[2].gpuBuffer;m=eq(eU(d),p);{let t=u.jsepRegisterBuffer;if(!t)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=t(a,n,i,m)}}else if("ml-tensor"===h){let i=t[2].mlTensor;m=eq(eU(d),p);let r=u.webnnRegisterMLTensor;if(!r)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=r(a,i,eU(d),p)}else{let i=t[2];if(Array.isArray(i)){m=l*i.length,f=u._malloc(m),r.push(f);for(let t=0;t<i.length;t++){if("string"!=typeof i[t])throw TypeError(`tensor data at index ${t} is not a string`);u.setValue(f+t*l,eC(i[t],r),"*")}}else{let t=u.webnnIsGraphInput,n=u.webnnIsGraphOutput;if("string"!==d&&t&&n){let o=u.UTF8ToString(s);if(t(a,o)||n(a,o)){let t=eU(d);m=eq(t,p),c="ml-tensor";let r=u.webnnCreateTemporaryTensor,s=u.webnnUploadTensor;if(!r||!s)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let n=await r(a,t,p);s(n,new Uint8Array(i.buffer,i.byteOffset,i.byteLength)),f=n}else m=i.byteLength,f=u._malloc(m),r.push(f),u.HEAPU8.set(new Uint8Array(i.buffer,i.byteOffset,m),f)}else m=i.byteLength,f=u._malloc(m),r.push(f),u.HEAPU8.set(new Uint8Array(i.buffer,i.byteOffset,m),f)}}let g=u.stackSave(),_=u.stackAlloc(4*p.length);try{p.forEach((t,i)=>u.setValue(_+i*l,t,4===l?"i32":"i64"));let t=u._OrtCreateTensor(eU(d),f,m,_,p.length,eW(c));0===t&&eB(`Can't create tensor for input/output. session=${a}, index=${n}.`),i.push(t)}finally{u.stackRestore(g)}},nT=async(t,i,r,a,s,n)=>{let o=eE(),u=o.PTR_SIZE,l=nv.get(t);if(!l)throw Error(`cannot run inference. invalid session id: ${t}`);let d=l[0],p=l[1],h=l[2],c=l[3],f=l[4],m=l[5],g=i.length,_=a.length,y=0,$=[],b=[],v=[],w=[],x=[],k=o.stackSave(),S=o.stackAlloc(g*u),I=o.stackAlloc(g*u),T=o.stackAlloc(_*u),z=o.stackAlloc(_*u);try{let l;[y,$]=eA(n),D("wasm prepareInputOutputTensor");for(let a=0;a<g;a++)await nI(r[a],b,w,t,p[i[a]],i[a],f);for(let i=0;i<_;i++)await nI(s[i],v,w,t,h[a[i]],g+a[i],f);M("wasm prepareInputOutputTensor");for(let t=0;t<g;t++)o.setValue(S+t*u,b[t],"*"),o.setValue(I+t*u,p[i[t]],"*");for(let t=0;t<_;t++)o.setValue(T+t*u,v[t],"*"),o.setValue(z+t*u,h[a[t]],"*");if(c&&!m){let{handle:r,outputPreferredLocations:n,outputPreferredLocationsEncoded:u}=c;if(p.length!==g)throw Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${p.length}).`);D("wasm bindInputsOutputs");for(let a=0;a<g;a++){let s=i[a];await o._OrtBindInput(r,p[s],b[a])!==0&&eB(`Can't bind input[${a}] for session=${t}.`)}for(let i=0;i<_;i++){let l=a[i];s[i]?.[3]?(x.push(v[i]),0!==o._OrtBindOutput(r,h[l],v[i],0)&&eB(`Can't bind pre-allocated output[${i}] for session=${t}.`)):0!==o._OrtBindOutput(r,h[l],0,u[l])&&eB(`Can't bind output[${i}] to ${n[i]} for session=${t}.`)}M("wasm bindInputsOutputs"),nv.set(t,[d,p,h,c,f,!0])}o.jsepOnRunStart?.(d),o.webnnOnRunStart?.(d),l=c?await o._OrtRunWithBinding(d,c.handle,_,T,y):await o._OrtRun(d,I,S,g,z,_,T,y),0!==l&&eB("failed to call OrtRun().");let k=[],E=[];D("wasm ProcessOutputTensor");for(let i=0;i<_;i++){let r=Number(o.getValue(T+i*u,"*"));if(r===v[i]||x.includes(v[i])){k.push(s[i]),r!==v[i]&&0!==o._OrtReleaseTensor(r)&&eB("Can't release tensor.");continue}let n=o.stackSave(),l=o.stackAlloc(4*u),d=!1,p,h=0;try{0!==o._OrtGetTensorData(r,l,l+u,l+2*u,l+3*u)&&eB(`Can't access output tensor data on index ${i}.`);let s=4===u?"i32":"i64",n=Number(o.getValue(l,s));h=o.getValue(l+u,"*");let f=o.getValue(l+2*u,"*"),m=Number(o.getValue(l+3*u,s)),g=[];for(let t=0;t<m;t++)g.push(Number(o.getValue(f+t*u,s)));0!==o._OrtFree(f)&&eB("Can't free memory for tensor dims.");let _=g.reduce((t,i)=>t*i,1);p=eP(n);let y=c?.outputPreferredLocations[a[i]];if("string"===p){if("gpu-buffer"===y||"ml-tensor"===y)throw Error("String tensor is not supported on GPU.");let t=[];for(let i=0;i<_;i++){let r=o.getValue(h+i*u,"*"),a=o.getValue(h+(i+1)*u,"*"),s=i===_-1?void 0:a-r;t.push(o.UTF8ToString(r,s))}k.push([p,g,t,"cpu"])}else if("gpu-buffer"===y&&_>0){let t=o.jsepGetBuffer;if(!t)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let i=t(h),a=eq(n,_);if(void 0===a||!eV(p))throw Error(`Unsupported data type: ${p}`);d=!0,k.push([p,g,{gpuBuffer:i,download:o.jsepCreateDownloader(i,a,p),dispose:()=>{0!==o._OrtReleaseTensor(r)&&eB("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===y&&_>0){let i=o.webnnEnsureTensor,a=o.webnnIsGraphInputOutputTypeSupported;if(!i||!a)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===eq(n,_)||!eG(p))throw Error(`Unsupported data type: ${p}`);if(!a(t,p,!1))throw Error(`preferredLocation "ml-tensor" for ${p} output is not supported by current WebNN Context.`);let s=await i(t,h,n,g,!1);d=!0,k.push([p,g,{mlTensor:s,download:o.webnnCreateMLTensorDownloader(h,p),dispose:()=>{o.webnnReleaseTensorId(h),o._OrtReleaseTensor(r)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===y&&_>0){let t=o.webnnCreateMLTensorDownloader(h,p)(),i=k.length;d=!0,E.push((async()=>{let a=[i,await t];return o.webnnReleaseTensorId(h),o._OrtReleaseTensor(r),a})()),k.push([p,g,[],"cpu"])}else{let t=new(eN(p))(_);new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(o.HEAPU8.subarray(h,h+t.byteLength)),k.push([p,g,t,"cpu"])}}finally{o.stackRestore(n),"string"===p&&h&&o._free(h),d||o._OrtReleaseTensor(r)}}for(let[i,r]of(c&&!f&&(0!==o._OrtClearBoundOutputs(c.handle)&&eB("Can't clear bound outputs."),nv.set(t,[d,p,h,c,f,!1])),await Promise.all(E)))k[i][2]=r;return M("wasm ProcessOutputTensor"),k}finally{o.webnnOnRunEnd?.(d),o.stackRestore(k),b.forEach(t=>o._OrtReleaseTensor(t)),v.forEach(t=>o._OrtReleaseTensor(t)),w.forEach(t=>o._free(t)),0!==y&&o._OrtReleaseRunOptions(y),$.forEach(t=>o._free(t))}},nz=t=>{let i=eE(),r=nv.get(t);if(!r)throw Error("invalid session id");let a=r[0],s=i._OrtEndProfiling(a);0===s&&eB("Can't get an profile file name."),i._OrtFree(s)},nE=t=>{let i=[];for(let r of t){let t=r[2];!Array.isArray(t)&&"buffer"in t&&i.push(t.buffer)}return i}}),nJ=N(()=>{"use strict";eu(),nY(),sn(),ss(),nC=()=>!!f.wasm.proxy&&"u">typeof document,nB=!1,nA=!1,nR=!1,nU=new Map,nP=(t,i)=>{let r=nU.get(t);r?r.push(i):nU.set(t,[i])},nq=()=>{if(nB||!nA||nR||!nO)throw Error("worker not ready")},nN=t=>{switch(t.data.type){case"init-wasm":nB=!1,t.data.err?(nR=!0,nM[1](t.data.err)):(nA=!0,nM[0]()),nD&&(URL.revokeObjectURL(nD),nD=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let i=nU.get(t.data.type);t.data.err?i.shift()[1](t.data.err):i.shift()[0](t.data.out)}}},nL=async()=>{if(!nA){if(nB)throw Error("multiple calls to 'initWasm()' detected.");if(nR)throw Error("previous call to 'initWasm()' failed.");if(nB=!0,nC())return new Promise((t,i)=>{nO?.terminate(),ev().then(([r,a])=>{try{(nO=a).onerror=t=>i(t),nO.onmessage=nN,nM=[t,i];let s={type:"init-wasm",in:f};if(!s.in.wasm.wasmPaths&&r){let t=eg();t&&(s.in.wasm.wasmPaths=t)}nO.postMessage(s),nD=r}catch(t){i(t)}},i)});try{await ez(f.wasm),await n$(f),nA=!0}catch(t){throw nR=!0,t}finally{nB=!1}}},nV=async t=>{if(nC())return nq(),new Promise((i,r)=>{nP("init-ep",[i,r]);let a={type:"init-ep",in:{epName:t,env:f}};nO.postMessage(a)});await nb(f,t)},nG=async t=>nC()?(nq(),new Promise((i,r)=>{nP("copy-from",[i,r]),nO.postMessage({type:"copy-from",in:{buffer:t}},[t.buffer])})):nx(t),nW=async(t,i)=>{if(!nC())return nk(t,i);if(i?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return nq(),new Promise((r,a)=>{nP("create",[r,a]);let s={type:"create",in:{model:t,options:{...i}}},n=[];t instanceof Uint8Array&&n.push(t.buffer),nO.postMessage(s,n)})},nH=async t=>{if(nC())return nq(),new Promise((i,r)=>{nP("release",[i,r]),nO.postMessage({type:"release",in:t})});nS(t)},nF=async(t,i,r,a,s,n)=>{if(!nC())return nT(t,i,r,a,s,n);if(r.some(t=>"cpu"!==t[3]))throw Error("input tensor on GPU is not supported for proxy.");if(s.some(t=>t))throw Error("pre-allocated output tensor is not supported for proxy.");return nq(),new Promise((s,o)=>{nP("run",[s,o]),nO.postMessage({type:"run",in:{sessionId:t,inputIndices:i,inputs:r,outputIndices:a,options:n}},nE(r))})},nK=async t=>{if(nC())return nq(),new Promise((i,r)=>{nP("end-profiling",[i,r]),nO.postMessage({type:"end-profiling",in:t})});nz(t)}}),n0=N(()=>{"use strict";eu(),nJ(),sd(),el(),sp(),nj=(t,i)=>{switch(t.location){case"cpu":return[t.type,t.dims,t.data,"cpu"];case"gpu-buffer":return[t.type,t.dims,{gpuBuffer:t.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[t.type,t.dims,{mlTensor:t.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${t.location} for ${i()}`)}},nZ=t=>{switch(t[3]){case"cpu":return new C(t[0],t[2],t[1]);case"gpu-buffer":{let i=t[0];if(!eV(i))throw Error(`not supported data type: ${i} for deserializing GPU tensor`);let{gpuBuffer:r,download:a,dispose:s}=t[2];return C.fromGpuBuffer(r,{dataType:i,dims:t[1],download:a,dispose:s})}case"ml-tensor":{let i=t[0];if(!eG(i))throw Error(`not supported data type: ${i} for deserializing MLTensor tensor`);let{mlTensor:r,download:a,dispose:s}=t[2];return C.fromMLTensor(r,{dataType:i,dims:t[1],download:a,dispose:s})}default:throw Error(`invalid data location: ${t[3]}`)}},nQ=class{async fetchModelAndCopyToWasmMemory(t){return nG(await eH(t))}async loadModel(t,i){let r;A(),r="string"==typeof t?await this.fetchModelAndCopyToWasmMemory(t):t,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await nW(r,i),R()}async dispose(){return nH(this.sessionId)}async run(t,i,r){A();let a=[],s=[];Object.entries(t).forEach(t=>{let i=t[0],r=t[1],n=this.inputNames.indexOf(i);if(-1===n)throw Error(`invalid input '${i}'`);a.push(r),s.push(n)});let n=[],o=[];Object.entries(i).forEach(t=>{let i=t[0],r=t[1],a=this.outputNames.indexOf(i);if(-1===a)throw Error(`invalid output '${i}'`);n.push(r),o.push(a)});let u=a.map((t,i)=>nj(t,()=>`input "${this.inputNames[s[i]]}"`)),l=n.map((t,i)=>t?nj(t,()=>`output "${this.outputNames[o[i]]}"`):null),d=await nF(this.sessionId,s,u,o,l,r),p={};for(let t=0;t<d.length;t++)p[this.outputNames[o[t]]]=n[t]??nZ(d[t]);return R(),p}startProfiling(){}endProfiling(){nK(this.sessionId)}}}),n1={};L(n1,{OnnxruntimeWebAssemblyBackend:()=>n3,initializeFlags:()=>n2,wasmBackend:()=>n4});var n2,n3,n4,n6=N(()=>{"use strict";eu(),nJ(),n0(),n2=()=>{("number"!=typeof f.wasm.initTimeout||f.wasm.initTimeout<0)&&(f.wasm.initTimeout=0);let t=f.wasm.simd;if("boolean"!=typeof t&&void 0!==t&&"fixed"!==t&&"relaxed"!==t&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${t}". Reset it to \`false\` and ignore SIMD feature checking.`),f.wasm.simd=!1),"boolean"!=typeof f.wasm.proxy&&(f.wasm.proxy=!1),"boolean"!=typeof f.wasm.trace&&(f.wasm.trace=!1),"number"!=typeof f.wasm.numThreads||!Number.isInteger(f.wasm.numThreads)||f.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)f.wasm.numThreads=1;else{let t=typeof navigator>"u"?q("node:os").cpus().length:navigator.hardwareConcurrency;f.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},n4=new(n3=class{async init(t){n2(),await nL(),await nV(t)}async createInferenceSessionHandler(t,i){let r=new nQ;return await r.loadModel(t,i),r}})});eu(),eu(),eu();var n8=eo;{let t=(n6(),V(n1)).wasmBackend;u("webgpu",t,5),u("webnn",t,5),u("cpu",t,10),u("wasm",t,10)}Object.defineProperty(f.versions,"web",{value:"1.24.3",enumerable:!0});export{P as InferenceSession,O as TRACE,D as TRACE_EVENT_BEGIN,M as TRACE_EVENT_END,A as TRACE_FUNC_BEGIN,R as TRACE_FUNC_END,C as Tensor,n8 as default,f as env,u as registerBackend};