/*! LICENSE: ort.all.mjs.LICENSE.txt */
var backends,backendsSortedByPriority,registerBackend,tryResolveAndInitializeBackend,resolveBackendAndExecutionProviders,version,logLevelValue,env,env2,tensorToDataURL,tensorToImageData,bufferToTensor,tensorFromImage,tensorFromTexture,tensorFromGpuBuffer,tensorFromMLTensor,tensorFromPinnedBuffer,NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP,NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP,isTypedArrayChecked,checkTypedArray,calculateSize,tensorReshape,Tensor,Tensor2,TRACE,TRACE_FUNC,TRACE_FUNC_BEGIN,TRACE_FUNC_END,TRACE_EVENT_BEGIN,TRACE_EVENT_END,InferenceSession,InferenceSession2,NoOpLoggerProvider,ConsoleLoggerProvider,SEVERITY_VALUE,LOGGER_PROVIDER_MAP,LOGGER_DEFAULT_CONFIG,LOGGER_CONFIG_MAP,Logger,Event,EventRecord,Profiler,now,wasm,INT_CACHE,UINT_CACHE,pow_dbl,TWO_PWR_16_DBL,TWO_PWR_24_DBL,TWO_PWR_32_DBL,TWO_PWR_64_DBL,TWO_PWR_63_DBL,TWO_PWR_24,ZERO,UZERO,ONE,UONE,NEG_ONE,MAX_VALUE,MAX_UNSIGNED_VALUE,MIN_VALUE,LongPrototype,long_default,import_arg_type,import_arg_type_and_index,import_attribute,import_attribute_type,import_deprecated_kernel_create_infos,import_deprecated_node_index_and_kernel_def_hash,import_deprecated_session_state,import_deprecated_sub_graph_session_state,import_dimension,import_dimension_value,import_dimension_value_type,import_edge_end,import_graph,import_inference_session,import_kernel_type_str_args_entry,import_kernel_type_str_resolver,import_map_type,import_model,import_node,import_node_edge,import_node_type,import_nodes_to_optimize_indices,import_op_id_kernel_type_str_args_entry,import_operator_set_id,import_runtime_optimization_record,import_runtime_optimization_record_container_entry,import_runtime_optimizations,import_sequence_type,import_shape,import_sparse_tensor,import_string_string_entry,import_tensor2,import_tensor_data_type,import_tensor_type_and_shape,import_type_info,import_type_info_value,import_value_info,import_onnx,ArrayUtil,MatMulUtil,BroadcastUtil,GemmUtil,ProtoUtil,LongUtil,ShapeUtil,SplitUtil,PoolConvUtil,MIN_CLIP,MAX_CLIP,import_guid_typescript,import_onnx2,Tensor4,GLSL_ES_2_0,GLSL_ES_3_0,packProgramMetadata,createPackProgramInfo,createPackProgramInfoLoader,createPackedReshape3DProgramMetadata,createPackedReshape3DProgramInfo,createPackedReshape3DProgramInfoLoader,encodeAsUint8,unpackProgramMetadata,createUnpackProgramInfo,createUnpackProgramInfoLoader,RedFloat32DataEncoder,RGBAFloatDataEncoder,Uint8DataEncoder,createTextureLayoutFromTextureType,calculateTextureWidthAndHeight,createTextureLayoutFromShape,getProgramInfoUniqueKey,WebGLInferenceHandler,AttributeWithCacheKeyImpl,createAttributeWithCacheKey,batchNormalizationProgramMetadata,batchNormalization,parseBatchNormalizationAttributes,createBatchNormalizationProgramInfo,validateInputs,GlslContext,GlslLib,GlslLibRoutine,GlslLibRoutineNode,TopologicalSortGlslRoutines,createBinaryProgramInfoLoader,createBinaryProgramInfo,add2,and2,div,equal,greater,less,mul,or2,pow,pRelu,sub,xor2,cast,parseCastAttributes,validateInputs2,createPackedConcatProgramMetadata,createPackedConcatProgramInfo,createPackedConcatProgramInfoLoader,getShiftedChannelsSnippet,concat,createUnpackedConcatProgramMetadata,createUnpackedConcatProgramInfo,createUnpackedConcatProgramInfoLoader,getTextureIndexWhereDataResidesLinearSearch,getTextureIndexWhereDataResidesBinarySearch,getFetchDataFromCorrectTextureMethod,getGetSizeInConcatAxisValueFromIndexMethod,parseConcatAttributes,validateInputs3,createElementwiseProgramInfo,createElementwiseProgramInfoLoader,abs,acos,asin,atan,clip,parseClipAttributes,clipV11,generateClipAttributesFromInputs,ceil,cos,elu,parseEluAttributes,exp,floor,identity,leakyRelu,parseLeakyReluAttributes,log2,neg,not2,relu,sigmoid,sin,sqrt,tan,tanh,parseInternalActivationAttributes,createUnpackedGroupedConvProgramMetadata,createUnpackedGroupedConvProgramInfo,createUnpackedGroupedConvProgramInfoLoader,createPackedIm2ColProgramMetadata,createPackedIm2ColProgramInfo,createPackedIm2ColProgramInfoLoader,matMul,parseMatMulAttributes,createMatmulProgramMetadata,validateInputs4,createPackedMatmulProgramMetadata,createPackedMatmulProgramInfo,createPackedMatmulProgramInfoLoader,conv2DPacked,createIm2ColProgramMetadata,createIm2ColProgramInfo,createIm2ColProgramInfoLoader,calculateIm2ColDims,createDotProductProgramMetadata,createDotProductProgramInfo,createDotProductProgramInfoLoader,calculateOutputShape,conv,conv2d,conv2DUnpackedPointwise,conv2DUnpacked,getAdjustedConvAttributes,parseConvAttributes,validateInputs5,computeTotalPad,distributePadding,calculateOutputShapeAndPads,convTranspose,convTranspose2d,createConvTransposeProgramMetadata,createUnpackedConvTransposeProgramInfo,createUnpackedConvTransposeProgramInfoLoader,convTranspose2DUnpacked,getAdjustedConvTransposeAttributes,parseConvTransposeAttributes,validateInputs6,transposeProgramMetadata,transpose,parseTransposeAttributes,createTransposeProgramInfo,getAdjustedPerm,getOutputShape,getPermFunctionBody,validateInputs7,depthToSpace,parseDepthToSpaceAttributes,validateInputs8,flatten,parseFlattenAttributes,validateInputs9,NUMBER_TYPES,gather,parseGatherAttributes,gatherProgramMetadata,createGatherProgramInfo,createGatherProgramInfoLoader,validateInputs10,gemm,parseGemmAttributes,parseGemmAttributesV7,parseGemmAttributesV11,createGemmProgramInfoLoader,createGemmProgramInfo,validateInputs11,imageScaler,parseImageScalerAttributes,imageScalerProgramMetadata,createImageScalerProgramInfo,createImageScalerProgramInfoLoader,createGetBiasMethod,validateInputs12,instanceNormalization,parseInstanceNormalizationAttributes,meanAndVarianceProgramMetadata,createMeanAndVarianceProgramInfo,createMeanAndVarianceProgramInfoLoader,computeOutputProgramMetadata,createComputeOutputProgramInfo,createComputeOutputProgramInfoLoader,validateInputs13,lrn,parseLrnAttributes,lrnProgramMetadata,validateInputs14,padProgramMetadata,padV2,parsePadAttributesV2,padV11,parsePadAttributesV11,generatePadAttributesFromInputs,createPadProgramInfo,validateInputsV2,validateInputsV11,getPadFunction,getPadConstant,getPadReflect,getPadEdge,averagePool,parseAveragePoolAttributes,createAveragePoolProgramInfo,globalAveragePool,parseGlobalAveragePoolAttributes,maxPool,parseMaxPoolAttributes,createMaxPoolProgramInfo,getAdjustedPoolAttributesAndOutputShape,globalMaxPoolAttributes,globalMaxPoolMetadata,globalMaxPool,validateInputs15,generatePoolingCode,copyArray,offsetToIndices,reduce,parseReduceAttributes,createReduceProgramInfo,validateInputs16,reduceSum,reduceMean,reduceMax,reduceMin,reduceProd,reduceLogSum,reduceLogSumSquare,reshape,upsampleProgramMetadata,upsample,parseUpsampleAttributesV7,parseUpsampleAttributesV9,parseUpsampleAttributes,createUpsampleProgramInfo,validateInputs17,scalesValidation,resizeProgramMetadata,resize,parseResizeAttributesV10,parseResizeAttributesV11,createPackedResizeProgramInfo,prepareInputs,parseScalesData,parseScalesDataFromOutputSize,shape,validateInputs18,sliceProgramMetadata,slice,parseSliceAttributes,createSliceProgramInfo,validateInputs19,sliceV10,generateSliceAttributesFromInputs,validateInputsV10,softmaxComputeMaxProgramMetadata,softmaxComputeScaleProgramMetadata,softmaxProgramMetadata,softmax,parseSoftmaxAttributes,parseSoftmaxAttributesV13,softmaxV13,computeSoftmax,createComputeMaxProgramInfo,createComputScaleProgramInfo,createSoftMaxProgramInfo,validateInputs20,splitProgramMetadata,split,parseSplitAttributes,getProgramCount,createSplitProgramInfo,validateInputs21,squeeze,squeezeV13,parseSqueezeAttributes,validateInputs22,validateInputsV13,sum,createSumProgramInfo,validateInputs23,tile,createTileProgramInfo,validateInputs24,unsqueeze,unsqueezeV13,parseUnsqueezeAttributes,validateInputs25,validateInputsV132,WEBGL_OP_RESOLVE_RULES,INLINE_FUNC_DEF_REGEX,FUNC_CALL_REGEX,PreferLogicalStrategy,CoordsGlslLib,EncodingGlslLib,FragColorGlslLib,ShapeUtilsGlslLib,VecGlslLib,glslRegistry,GlslPreprocessor,ProgramManager,TextureManager,WebGLSessionHandler,WebGLContext,cache,WebGLBackend,backendsCache,backend,KernelOp,ExecutionPlan,import_onnx3,Attribute2,import_onnx4,Graph2,Value,Node2,GraphImpl,flatbuffers,import_onnx5,Model2,Session,OnnxjsSessionHandler,onnxjsBackend,isNode,WORKER_NAME,isProxyWorker,main_default,origin,isEsmImportMetaUrlHardcodedAsFileUri,scriptSrc,inferWasmPathPrefixFromScriptSrc,isSameOrigin,normalizeUrl,fallbackUrl,preload,dynamicImportDefault,createProxyWorker,importProxyWorker,embeddedWasmModule,importWasmModule,wasm2,initialized,initializing,aborted,isMultiThreadSupported,isSimdSupported,isRelaxedSimdSupported,initializeWebAssembly,getInstance,allocWasmString,iterateExtraOptions,checkLastError,setRunOptions,getGraphOptimzationLevel,getExecutionMode,appendDefaultOptions,appendSessionConfig,setExecutionProviders,setSessionOptions,tensorDataTypeStringToEnum,tensorDataTypeEnumToString,calculateTensorSizeInBytes,tensorTypeToTypedArrayConstructor,logLevelStringToEnum,isGpuBufferSupportedType,isMLTensorSupportedType,dataLocationStringToEnum,loadFile,logLevelPrefix,doLog,configLogLevel,debug,configureLogger,LOG,LOG_DEBUG,MatMulUtil2,BroadcastUtil2,ShapeUtil2,PoolConvUtil2,GemmUtil2,MIN_CLIP2,MAX_CLIP2,createView2,webnnDataTypeToSize,convertDataToInt32,convertInt32ToData,tensorGuid,createNewTensorId,webnnDataTypeToFallback,calculateByteLength,TensorWrapper,TensorIdTracker,TensorManagerImpl,createTensorManager,onnxDataTypeToWebnnDataType,compareMLContextOptions,WebNNBackend,bucketFreelist,bucketArr,calcNormalizedBufferSize,calcBucketBufferSize,guid,createNewGpuDataId,downloadGpuData,GpuDataManagerImpl,createGpuDataManager,AttributeWithCacheKeyImpl2,createAttributeWithCacheKey2,WORKGROUP_SIZE,getWgslMappedType,tensorTypeToWsglStorageType,tensorTypeToWsglValueType,createTensorShapeVariables,getMaxComponents,fillVector,castToF32,sumVector,getElementAt,createIndicesHelper,inputVariable,outputVariable,atomicOutputVariable,internalVariable,ShaderHelperImpl,createShaderHelper,validateInputs26,getAdjustedPerm2,getOutputShape2,permFunctionBody,squeezeShape2,isTransposeReshape,createTransposeProgramInfo2,transpose2,parseTransposeAttributes2,reduceOps,reduceSharedOps,reduceInitValues,reduceOutputValues,getInnerMostAxes,computeOutAndReduceShapes,expandShapeToKeepDim,areAxesInnerMostDims,getAxesPermutation,createReduceSharedProgramInfo,reduceCommon,reduceMeanShared,reduceL1Shared,reduceL2Shared,reduceLogSumExpShared,reduceMaxShared,reduceMinShared,reduceProdShared,reduceSumShared,reduceSumSquareShared,reduceLogSumShared,validateInputs27,noOp,createReduceProgramInfo2,createReduceAttributesFromInputs,runReduceProgram,reduceLogSumNaive,reduceL1Naive,reduceL2Naive,reduceLogSumExpNaive,reduceMaxNaive,reduceMeanNaive,reduceMinNaive,reduceProdNaive,reduceSumNaive,reduceSumSquareNaive,useNaiveReduceMethod,reduceMean2,reduceL1,reduceL2,reduceLogSumExp,reduceMax2,reduceMin2,reduceProd2,reduceSum2,reduceSumSquare,reduceLogSum2,validateInputs28,argMin,argMax,parseArgMinMaxAttributes,validateAttentionInputs,initVarStub,createInPlaceSoftmaxProgramInfo,createAttentionProbsProgramInfo,createVxAttentionScoreProgramInfo,applyAttention,prepare,attention,validateInputs29,createBatchNormInferenceProgramInfo,parseBatchNormAttributes,batchNorm,validateInputs30,createBiasAddProgramInfo,biasAdd,createElementwiseProgramShader,createElementwiseProgramInfo2,abs2,acos2,acosh,asin2,asinh,atan2,atanh,parseCastAttributes2,cast2,generateClipAttributesFromInputs2,clip2,ceil2,cos2,cosh,parseAlphaAttributes,elu2,erfImpl,erf,exp2,floor2,gelu,leakyRelu2,not3,neg2,reciprocal,relu2,sigmoid2,parseHardSigmoidAttributes,hardSigmoid,sin2,sinh,sqrt2,tan2,tanhExpression,tanh2,fastGeluImpl,fastGeluExpression,fastGelu,thresholdedRelu,log3,quickGeluImpl,quickGeluExpression,quickgelu,validateInputs31,createBiasSplitGeluProgramInfo,biasSplitGelu,createBinaryOpProgramShader,createBinaryOpProgramInfo,runBinaryOp,add3,div2,equal2,mul2,pow2,sub2,greater2,less2,greaterOrEqual,lessOrEqual,validateInputs32,calculateInputIndexImpl,assignOutputData,createConcatProgramInfo,concat2,parseConcatAttributes2,getActivationSnippet2,appendActivationUniformsData,appendActivationUniforms,parseInternalActivationAttributes2,typeSnippet,biasSnippet,utilFunctions,convertOutputBatchIndicesToInputBatchIndices,createNaiveMatmulProgramInfo,writeDataToSubAVec4Snippet,calculateResultSnippet,makeMatMulPackedVec4Source,writeDataToSubASnippet,readDataFromSubASnippet,makeMatMulPackedSource,matMulReadWriteFnSource,createMatmulProgramInfo2,conv2dCommonSnippet,createConv2DMatMulProgramInfo,arrayProduct,parse3TupleParam,getEffectiveFilterSize,computeDefaultPad,computeOutputShape4D,get3DPadAndOutInfo,computeConv3DInfo,createConv3DNaiveProgramInfo,createGroupedConvProgramInfo,createGroupedConvVectorizeProgramInfo,calculateOutputShape2,weightTransposeAttribute,validateInputs33,getAdjustedConvAttributes2,parseConvAttributes2,conv2d2,conv1d,conv3d,conv2,createConvTranspose2DProgramInfo,computeTotalPad2,distributePadding2,calculateOutputShapeAndPads2,getAdjustedConvTransposeAttributes2,parseConvTransposeAttributes2,validateInputs34,convTranspose2d2,convTranspose1d,convTranspose2,createCumsumProgramInfo,cumsum,parseCumSumAttributes,validateInputs35,permFunctionBody2,createDepthToSpaceProgramInfo,depthToSpace2,parseDepthToSpaceAttributes2,symbolPattern,termPattern,termPatternOnly,lhsPatternOnly,EinsumTerm,EinsumEquation,appendMax,createEinsumProgramInfo,einsum,parseEinsumAttributes,validateInputs36,getAdjustedShape,calculateOutputShape3,createExpandProgramInfo,expand,createFastGeluProgramInfo,fastGelu2,validateInputs37,createGatherProgramInfo2,parseGatherAttributes2,gather2,computeSliceOffsets,gatherND,parseGatherNDAttributes,validateInputs38,createGatherBlockQuantizedProgramInfo,gatherBlockQuantized,parseGatherBlockQuantizedAttributes,validateInputs39,createGatherElementsProgramInfo,parseGatherElementsAttributes,gatherElements,validateInputs40,createGemmProgramInfo2,parseGemmAttributes2,gemm2,idxN,idxC,idxH,idxW,validateInputs41,gsGetCubicCoeffs,gsBicubicInterpolate,gsDenormalize,gsReflect,pixelAtGrid,computePixel,createGridSampleProgramInfo,gridSample,parseGridSampleAttributes,getInput,validateInputs42,parseMultiHeadAttentionAttributes,weightTransposeAttribute2,addBiasTranspose,maybeTransposeToBNSHAndAddBias,multiHeadAttention,validateInputs43,createSplitAttributesFromInputs,calculateOutputIndexImpl,writeBufferDataImpl,createSplitProgramInfo2,split2,parseSplitAttributes2,validateInputs44,createRotaryEmbeddingProgramInfo,rotaryEmbedding,validateInputs45,weightTransposeAttribute3,maybeTransposeToBNSH,generatePositionIdsProgramInfo,groupQueryAttention,computeChannelScaleShift,createInstanceNormProgramInfo,createInstanceNormNHWCProgramInfo,instanceNorm,validateInputs46,createLayerNormProgramInfo,layerNorm,validateInputs47,matMul2,validateInputs48,createMatMulNBitsProgramInfo,createMatMulNBitsBlockSize32ProgramInfo,matMulNBits,parseMatMulNBitsAttributes,validateInputs49,getPadConstant2,getPadReflect2,getPadEdge2,getPadWrap,getPadSnippet,createPadProgramInfo2,createPadAttributesFromInputs,pad,validateInputs50,getAdjustedPoolAttributesAndOutputShape2,getUniformAndPadInfo,generatePoolingCode2,createShaderKeyFromAttributes,createAveragePoolShaderKeyFromAttributes,createMaxPoolShaderKeyFromAttributes,parsePoolCommonAttributes,createAveragePoolProgramInfo2,parseAveragePoolAttributes2,averagePool2,globalPoolAttributes,parseGlobalAveragePoolAttributes2,globalAveragePool2,createMaxPoolProgramInfo2,maxPool2,parseMaxPoolAttributes2,parseGlobalMaxPoolAttributes,globalMaxPool2,validateInputs51,createDequantizeLinearProgramInfo,dequantizeLinear,parseDequantizeLinearAttributes,validateInputsContent,createRangeProgramInfo,range,atomicReductionSnippet,createScatterNDProgramInfo,parseScatterNDAttributes,scatterND,validateScales,updateScales,validateInputs52,getSafeIntegerDivision,getOriginalCoordinateFromResizedCoordinate,getNearestPixelFromOriginal,updateRoI,initOutputShape,adjustOutputShape,calculateOriginalIndicesFromOutputIndices,calculateInputIndicesFromOutputIndices,checkInputIndices,setChannelAndBatchIndices,bilinearInterpolation,bicubicInterpolation,trilinearInterpolation,createResizeProgramInfo,getOpsetVersionFromCustomDataBuffer,resize2,parseResizeAttributes,validateInputs53,createSkipLayerNormProgramInfo,skipLayerNorm,validateInputs54,readInput,createSliceAttributesFromInputs,fixStartEndValues,calculateInputIndicesImpl,createSliceProgramInfo2,slice2,parseSliceAttributes2,validateInputs55,createSoftmaxProgramInfo,softmax2,parseSoftmaxAttributes2,getRepeats,validateInputs56,getOutputShape3,createTileProgramInfo2,tile2,createWhereOpProgramShader,createWhereOpProgramInfo,where,WEBGPU_OP_RESOLVE_RULES,ProgramManager2,getProgramInputTensorInfoDependencyKey,getProgramInfoUniqueKey2,AdapterInfoImpl,WebGpuBackend,TensorViewImpl,ComputeContextImpl,init,initOrt,initRuntime,initEp,activeSessions,getSessionInputOutputCount,getSessionInputOutputMetadata,copyFromExternalBuffer,createSession,releaseSession,prepareInputOutputTensor,run,endProfiling,extractTransferableBuffers,isProxy,proxyWorker,initializing2,initialized2,aborted2,temporaryObjectUrl,initWasmCallbacks,queuedCallbacks,enqueueCallbacks,ensureWorker,onProxyWorkerMessage,initializeWebAssemblyAndOrtRuntime,initializeOrtEp,copyFromExternalBuffer2,createSession2,releaseSession2,run2,endProfiling2,encodeTensorMetadata,decodeTensorMetadata,OnnxruntimeWebAssemblySessionHandler,initializeFlags,OnnxruntimeWebAssemblyBackend,wasmBackend,__create=Object.create,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty,__require=(e=>"u">typeof require?require:"u">typeof Proxy?new Proxy(e,{get:(e,t)=>("u">typeof require?require:e)[t]}):e)(function(e){if("u">typeof require)return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),__esm=(e,t)=>function(){return e&&(t=(0,e[__getOwnPropNames(e)[0]])(e=0)),t},__commonJS=(e,t)=>function(){return t||(0,e[__getOwnPropNames(e)[0]])((t={exports:{}}).exports,t),t.exports},__export=(e,t)=>{for(var r in t)__defProp(e,r,{get:t[r],enumerable:!0})},__copyProps=(e,t,r,n)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let i of __getOwnPropNames(t))__hasOwnProp.call(e,i)||i===r||__defProp(e,i,{get:()=>t[i],enumerable:!(n=__getOwnPropDesc(t,i))||n.enumerable});return e},__toESM=(e,t,r)=>(r=null!=e?__create(__getProtoOf(e)):{},__copyProps(!t&&e&&e.__esModule?r:__defProp(r,"default",{value:e,enumerable:!0}),e)),__toCommonJS=e=>__copyProps(__defProp({},"__esModule",{value:!0}),e),init_backend_impl=__esm({"common/dist/esm/backend-impl.js"(){"use strict";backends=new Map,backendsSortedByPriority=[],registerBackend=(e,t,r)=>{if(t&&"function"==typeof t.init&&"function"==typeof t.createInferenceSessionHandler){let n=backends.get(e);if(void 0===n)backends.set(e,{backend:t,priority:r});else if(n.priority>r)return;else if(n.priority===r&&n.backend!==t)throw Error(`cannot register backend "${e}" using priority ${r}`);if(r>=0){let t=backendsSortedByPriority.indexOf(e);-1!==t&&backendsSortedByPriority.splice(t,1);for(let t=0;t<backendsSortedByPriority.length;t++)if(backends.get(backendsSortedByPriority[t]).priority<=r)return void backendsSortedByPriority.splice(t,0,e);backendsSortedByPriority.push(e)}return}throw TypeError("not a valid backend")},tryResolveAndInitializeBackend=async e=>{let t=backends.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;{if(t.aborted)return t.error;let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(e){return r||(t.error=`${e}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},resolveBackendAndExecutionProviders=async e=>{let t,r=e.executionProviders||[],n=r.map(e=>"string"==typeof e?e:e.name),i=0===n.length?backendsSortedByPriority:n,o=[],s=new Set;for(let e of i){let r=await tryResolveAndInitializeBackend(e);"string"==typeof r?o.push({name:e,err:r}):(t||(t=r),t===r&&s.add(e))}if(!t)throw Error(`no available backend found. ERR: ${o.map(e=>`[${e.name}] ${e.err}`).join(", ")}`);for(let{name:e,err:t}of o)n.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${t}`);let a=r.filter(e=>s.has("string"==typeof e?e:e.name));return[t,new Proxy(e,{get:(e,t)=>"executionProviders"===t?a:Reflect.get(e,t)})]}}}),init_backend=__esm({"common/dist/esm/backend.js"(){"use strict";init_backend_impl()}}),init_version=__esm({"common/dist/esm/version.js"(){"use strict";version="1.24.3"}}),init_env_impl=__esm({"common/dist/esm/env-impl.js"(){"use strict";init_version(),logLevelValue="warning",Object.defineProperty(env={wasm:{},webgl:{},webgpu:{},versions:{common:version},set logLevel(value){if(void 0===value)return;if("string"!=typeof value||-1===["verbose","info","warning","error","fatal"].indexOf(value))throw Error(`Unsupported logging level: ${value}`);logLevelValue=value},get logLevel(){return logLevelValue}},"logLevel",{enumerable:!0})}}),init_env=__esm({"common/dist/esm/env.js"(){"use strict";init_env_impl(),env2=env}}),init_tensor_conversion_impl=__esm({"common/dist/esm/tensor-conversion-impl.js"(){"use strict";tensorToDataURL=(e,t)=>{let r="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(null!=n){let i,o,s,a;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(i=e.dims[2],o=e.dims[3]):(i=e.dims[3],o=e.dims[2]);let u=t?.format!==void 0?t.format:"RGB",l=t?.norm;void 0===l||void 0===l.mean?s=[255,255,255,255]:"number"==typeof l.mean?s=[l.mean,l.mean,l.mean,l.mean]:(s=[l.mean[0],l.mean[1],l.mean[2],0],void 0!==l.mean[3]&&(s[3]=l.mean[3])),void 0===l||void 0===l.bias?a=[0,0,0,0]:"number"==typeof l.bias?a=[l.bias,l.bias,l.bias,l.bias]:(a=[l.bias[0],l.bias[1],l.bias[2],0],void 0!==l.bias[3]&&(a[3]=l.bias[3]));let d=o*i,p=0,c=d,h=2*d,f=-1;"RGBA"===u?(p=0,c=d,h=2*d,f=3*d):"RGB"===u?(p=0,c=d,h=2*d):"RBG"===u&&(p=0,h=d,c=2*d);for(let t=0;t<o;t++)for(let r=0;r<i;r++)n.fillStyle="rgba("+(e.data[p++]-a[0])*s[0]+","+(e.data[c++]-a[1])*s[1]+","+(e.data[h++]-a[2])*s[2]+","+(-1===f?255:(e.data[f++]-a[3])*s[3])+")",n.fillRect(r,t,1,1);if("toDataURL"in r)return r.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},tensorToImageData=(e,t)=>{let r,n="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d");if(null!=n){let i,o,s,a,u;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(i=e.dims[2],o=e.dims[1],s=e.dims[3]):(i=e.dims[3],o=e.dims[2],s=e.dims[1]);let l=void 0!==t&&void 0!==t.format?t.format:"RGB",d=t?.norm;void 0===d||void 0===d.mean?a=[255,255,255,255]:"number"==typeof d.mean?a=[d.mean,d.mean,d.mean,d.mean]:(a=[d.mean[0],d.mean[1],d.mean[2],255],void 0!==d.mean[3]&&(a[3]=d.mean[3])),void 0===d||void 0===d.bias?u=[0,0,0,0]:"number"==typeof d.bias?u=[d.bias,d.bias,d.bias,d.bias]:(u=[d.bias[0],d.bias[1],d.bias[2],0],void 0!==d.bias[3]&&(u[3]=d.bias[3]));let p=o*i;if(void 0!==t&&(void 0!==t.format&&4===s&&"RGBA"!==t.format||3===s&&"RGB"!==t.format&&"BGR"!==t.format))throw Error("Tensor format doesn't match input tensor dims");let c=4,h=0,f=1,m=2,g=3,b=0,y=p,_=2*p,x=-1;"RGBA"===l?(b=0,y=p,_=2*p,x=3*p):"RGB"===l?(b=0,y=p,_=2*p):"RBG"===l&&(b=0,_=p,y=2*p),r=n.createImageData(i,o);for(let t=0;t<o*i;h+=c,f+=c,m+=c,g+=c,t++)r.data[h]=(e.data[b++]-u[0])*a[0],r.data[f]=(e.data[y++]-u[1])*a[1],r.data[m]=(e.data[_++]-u[2])*a[2],r.data[g]=-1===x?255:(e.data[x++]-u[3])*a[3]}else throw Error("Can not access image data");return r}}}),init_tensor_factory_impl=__esm({"common/dist/esm/tensor-factory-impl.js"(){"use strict";init_tensor_impl(),bufferToTensor=(e,t)=>{let r,n;if(void 0===e)throw Error("Image buffer must be defined");if(void 0===t.height||void 0===t.width)throw Error("Image height and width must be defined");if("NHWC"===t.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:i,width:o}=t,s=t.norm??{mean:255,bias:0};r="number"==typeof s.mean?[s.mean,s.mean,s.mean,s.mean]:[s.mean[0],s.mean[1],s.mean[2],s.mean[3]??255],n="number"==typeof s.bias?[s.bias,s.bias,s.bias,s.bias]:[s.bias[0],s.bias[1],s.bias[2],s.bias[3]??0];let a=void 0!==t.format?t.format:"RGBA",u=void 0!==t.tensorFormat&&void 0!==t.tensorFormat?t.tensorFormat:"RGB",l=i*o,d=new Float32Array("RGBA"===u?4*l:3*l),p=4,c=0,h=1,f=2,m=3,g=0,b=l,y=2*l,_=-1;"RGB"===a&&(p=3,c=0,h=1,f=2,m=-1),"RGBA"===u?_=3*l:"RBG"===u?(g=0,y=l,b=2*l):"BGR"===u&&(y=0,b=l,g=2*l);for(let t=0;t<l;t++,c+=p,f+=p,h+=p,m+=p)d[g++]=(e[c]+n[0])/r[0],d[b++]=(e[h]+n[1])/r[1],d[y++]=(e[f]+n[2])/r[2],-1!==_&&-1!==m&&(d[_++]=(e[m]+n[3])/r[3]);return"RGBA"===u?new Tensor("float32",d,[1,4,i,o]):new Tensor("float32",d,[1,3,i,o])},tensorFromImage=async(e,t)=>{let r,n="u">typeof HTMLImageElement&&e instanceof HTMLImageElement,i="u">typeof ImageData&&e instanceof ImageData,o="u">typeof ImageBitmap&&e instanceof ImageBitmap,s="string"==typeof e,a=t??{},u=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},l=e=>"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext("2d"):null;if(n){let n=u();n.width=e.width,n.height=e.height;let i=l(n);if(null!=i){let n=e.height,o=e.width;if(void 0!==t&&void 0!==t.resizedHeight&&void 0!==t.resizedWidth&&(n=t.resizedHeight,o=t.resizedWidth),void 0!==t){if(a=t,void 0!==t.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");a.tensorFormat="RGBA",a.height=n,a.width=o}else a.tensorFormat="RGBA",a.height=n,a.width=o;i.drawImage(e,0,0),r=i.getImageData(0,0,o,n).data}else throw Error("Can not access image data")}else if(i){let n,i;if(void 0!==t&&void 0!==t.resizedWidth&&void 0!==t.resizedHeight?(n=t.resizedHeight,i=t.resizedWidth):(n=e.height,i=e.width),void 0!==t&&(a=t),a.format="RGBA",a.height=n,a.width=i,void 0!==t){let t=u();t.width=i,t.height=n;let o=l(t);if(null!=o)o.putImageData(e,0,0),r=o.getImageData(0,0,i,n).data;else throw Error("Can not access image data")}else r=e.data}else if(o){if(void 0===t)throw Error("Please provide image config with format for Imagebitmap");let n=u();n.width=e.width,n.height=e.height;let i=l(n);if(null!=i){let t=e.height,n=e.width;return i.drawImage(e,0,0,n,t),r=i.getImageData(0,0,n,t).data,a.height=t,a.width=n,bufferToTensor(r,a)}throw Error("Can not access image data")}else if(s)return new Promise((t,r)=>{let n=u(),i=l(n);if(!e||!i)return r();let o=new Image;o.crossOrigin="Anonymous",o.src=e,o.onload=()=>{n.width=o.width,n.height=o.height,i.drawImage(o,0,0,n.width,n.height);let e=i.getImageData(0,0,n.width,n.height);a.height=n.height,a.width=n.width,t(bufferToTensor(e.data,a))}});else throw Error("Input data provided is not supported - aborted tensor creation");if(void 0!==r)return bufferToTensor(r,a);throw Error("Input data provided is not supported - aborted tensor creation")},tensorFromTexture=(e,t)=>{let{width:r,height:n,download:i,dispose:o}=t;return new Tensor({location:"texture",type:"float32",texture:e,dims:[1,n,r,4],download:i,dispose:o})},tensorFromGpuBuffer=(e,t)=>{let{dataType:r,dims:n,download:i,dispose:o}=t;return new Tensor({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:i,dispose:o})},tensorFromMLTensor=(e,t)=>{let{dataType:r,dims:n,download:i,dispose:o}=t;return new Tensor({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:i,dispose:o})},tensorFromPinnedBuffer=(e,t,r)=>new Tensor({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}}),init_tensor_impl_type_mapping=__esm({"common/dist/esm/tensor-impl-type-mapping.js"(){"use strict";NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),isTypedArrayChecked=!1,checkTypedArray=()=>{if(!isTypedArrayChecked){isTypedArrayChecked=!0;let e="u">typeof BigInt64Array&&BigInt64Array.from,t="u">typeof BigUint64Array&&BigUint64Array.from,r=globalThis.Float16Array,n=void 0!==r&&r.from;e&&(NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("int64",BigInt64Array),NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigInt64Array,"int64")),t&&(NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("uint64",BigUint64Array),NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigUint64Array,"uint64")),n?(NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16",r),NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(r,"float16")):NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16",Uint16Array)}}}}),init_tensor_utils_impl=__esm({"common/dist/esm/tensor-utils-impl.js"(){"use strict";init_tensor_impl(),calculateSize=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if("number"!=typeof n||!Number.isSafeInteger(n))throw TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},tensorReshape=(e,t)=>{switch(e.location){case"cpu":return new Tensor(e.type,e.data,t);case"cpu-pinned":return new Tensor({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Tensor({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Tensor({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Tensor({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}}),init_tensor_impl=__esm({"common/dist/esm/tensor-impl.js"(){"use strict";init_tensor_conversion_impl(),init_tensor_factory_impl(),init_tensor_impl_type_mapping(),init_tensor_utils_impl(),Tensor=class{constructor(e,t,r){let n,i;if(checkTypedArray(),"object"==typeof e&&"location"in e)switch(this.dataLocation=e.location,n=e.type,i=e.dims,e.location){case"cpu-pinned":{let t=NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(n);if(!t)throw TypeError(`unsupported type "${n}" to create tensor from pinned buffer`);if(!(e.data instanceof t))throw TypeError(`buffer should be of type ${t.name}`);this.cpuData=e.data;break}case"texture":if("float32"!==n)throw TypeError(`unsupported type "${n}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case"gpu-buffer":if("float32"!==n&&"float16"!==n&&"int32"!==n&&"int64"!==n&&"uint32"!==n&&"uint8"!==n&&"bool"!==n&&"uint4"!==n&&"int4"!==n)throw TypeError(`unsupported type "${n}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case"ml-tensor":if("float32"!==n&&"float16"!==n&&"int32"!==n&&"int64"!==n&&"uint32"!==n&&"uint64"!==n&&"int8"!==n&&"uint8"!==n&&"bool"!==n&&"uint4"!==n&&"int4"!==n)throw TypeError(`unsupported type "${n}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,s;if("string"==typeof e)if(n=e,s=r,"string"===e){if(!Array.isArray(t))throw TypeError("A string tensor's data must be a string array.");o=t}else{let r=NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(e);if(void 0===r)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t))if("float16"===e&&r===Uint16Array||"uint4"===e||"int4"===e)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${r.name} as data.`);else o="uint64"===e||"int64"===e?r.from(t,BigInt):r.from(t);else if(t instanceof r)o=t;else if(t instanceof Uint8ClampedArray)if("uint8"===e)o=Uint8Array.from(t);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===e&&t instanceof Uint16Array&&r!==Uint16Array)o=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw TypeError(`A ${n} tensor's data must be type of ${r}`)}else if(s=t,Array.isArray(e)){if(0===e.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let t=typeof e[0];if("string"===t)n="string",o=e;else if("boolean"===t)n="bool",o=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${t}.`)}else if(e instanceof Uint8ClampedArray)n="uint8",o=Uint8Array.from(e);else{let t=NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.get(e.constructor);if(void 0===t)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);n=t,o=e}if(void 0===s)s=[o.length];else if(!Array.isArray(s))throw TypeError("A tensor's dims must be a number array");i=s,this.cpuData=o,this.dataLocation="cpu"}let o=calculateSize(i);if(this.cpuData&&o!==this.cpuData.length)if(("uint4"===n||"int4"===n)&&Math.ceil(o/2)===this.cpuData.length);else throw Error(`Tensor's size(${o}) does not match data length(${this.cpuData.length}).`);this.type=n,this.dims=i,this.size=o}static async fromImage(e,t){return tensorFromImage(e,t)}static fromTexture(e,t){return tensorFromTexture(e,t)}static fromGpuBuffer(e,t){return tensorFromGpuBuffer(e,t)}static fromMLTensor(e,t){return tensorFromMLTensor(e,t)}static fromPinnedBuffer(e,t,r){return tensorFromPinnedBuffer(e,t,r)}toDataURL(e){return tensorToDataURL(this,e)}toImageData(e){return tensorToImageData(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return tensorReshape(this,e)}}}}),init_tensor=__esm({"common/dist/esm/tensor.js"(){"use strict";init_tensor_impl(),Tensor2=Tensor}}),init_trace=__esm({"common/dist/esm/trace.js"(){"use strict";init_env_impl(),TRACE=(e,t)=>{(void 0===env.trace?env.wasm.trace:env.trace)&&console.timeStamp(`${e}::ORT::${t}`)},TRACE_FUNC=(e,t)=>{let r=Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let i=0;i<r.length;i++){if(n&&!r[i].includes("TRACE_FUNC")){let n=`FUNC_${e}::${r[i].trim().split(" ")[1]}`;t&&(n+=`::${t}`),TRACE("CPU",n);return}r[i].includes("TRACE_FUNC")&&(n=!0)}},TRACE_FUNC_BEGIN=e=>{(void 0===env.trace?env.wasm.trace:env.trace)&&TRACE_FUNC("BEGIN",e)},TRACE_FUNC_END=e=>{(void 0===env.trace?env.wasm.trace:env.trace)&&TRACE_FUNC("END",e)},TRACE_EVENT_BEGIN=e=>{(void 0===env.trace?env.wasm.trace:env.trace)&&console.time(`ORT::${e}`)},TRACE_EVENT_END=e=>{(void 0===env.trace?env.wasm.trace:env.trace)&&console.timeEnd(`ORT::${e}`)}}}),init_inference_session_impl=__esm({"common/dist/esm/inference-session-impl.js"(){"use strict";init_backend_impl(),init_tensor(),init_trace(),InferenceSession=class e{constructor(e){this.handler=e}async run(e,t,r){TRACE_FUNC_BEGIN(),TRACE_EVENT_BEGIN("InferenceSession.run");let n={},i={};if("object"!=typeof e||null===e||e instanceof Tensor2||Array.isArray(e))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let o=!0;if("object"==typeof t){if(null===t)throw TypeError("Unexpected argument[1]: cannot be null.");if(t instanceof Tensor2)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(t)){if(0===t.length)throw TypeError("'fetches' cannot be an empty array.");for(let e of(o=!1,t)){if("string"!=typeof e)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(e))throw RangeError(`'fetches' contains invalid output name: ${e}.`);n[e]=null}if("object"==typeof r&&null!==r)i=r;else if(void 0!==r)throw TypeError("'options' must be an object.")}else{let e=!1,s=Object.getOwnPropertyNames(t);for(let r of this.outputNames)if(-1!==s.indexOf(r)){let i=t[r];(null===i||i instanceof Tensor2)&&(e=!0,o=!1,n[r]=i)}if(e){if("object"==typeof r&&null!==r)i=r;else if(void 0!==r)throw TypeError("'options' must be an object.")}else i=t}}else if(void 0!==t)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let t of this.inputNames)if(void 0===e[t])throw Error(`input '${t}' is missing in 'feeds'.`);if(o)for(let e of this.outputNames)n[e]=null;let s=await this.handler.run(e,n,i),a={};for(let e in s)if(Object.hasOwnProperty.call(s,e)){let t=s[e];t instanceof Tensor2?a[e]=t:a[e]=new Tensor2(t.type,t.data,t.dims)}return TRACE_EVENT_END("InferenceSession.run"),TRACE_FUNC_END(),a}async release(){return this.handler.dispose()}static async create(t,r,n,i){let o;TRACE_FUNC_BEGIN(),TRACE_EVENT_BEGIN("InferenceSession.create");let s={};if("string"==typeof t){if(o=t,"object"==typeof r&&null!==r)s=r;else if(void 0!==r)throw TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(o=t,"object"==typeof r&&null!==r)s=r;else if(void 0!==r)throw TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&t instanceof SharedArrayBuffer){let e=t,a=0,u=t.byteLength;if("object"==typeof r&&null!==r)s=r;else if("number"==typeof r){if(!Number.isSafeInteger(a=r))throw RangeError("'byteOffset' must be an integer.");if(a<0||a>=e.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${e.byteLength}).`);if(u=t.byteLength-a,"number"==typeof n){if(!Number.isSafeInteger(u=n))throw RangeError("'byteLength' must be an integer.");if(u<=0||a+u>e.byteLength)throw RangeError(`'byteLength' is out of range (0, ${e.byteLength-a}].`);if("object"==typeof i&&null!==i)s=i;else if(void 0!==i)throw TypeError("'options' must be an object.")}else if(void 0!==n)throw TypeError("'byteLength' must be a number.")}else if(void 0!==r)throw TypeError("'options' must be an object.");o=new Uint8Array(e,a,u)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[a,u]=await resolveBackendAndExecutionProviders(s),l=await a.createInferenceSessionHandler(o,u);return TRACE_EVENT_END("InferenceSession.create"),TRACE_FUNC_END(),new e(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}}),init_inference_session=__esm({"common/dist/esm/inference-session.js"(){"use strict";init_inference_session_impl(),InferenceSession2=InferenceSession}}),init_tensor_conversion=__esm({"common/dist/esm/tensor-conversion.js"(){}}),init_tensor_factory=__esm({"common/dist/esm/tensor-factory.js"(){}}),init_onnx_model=__esm({"common/dist/esm/onnx-model.js"(){}}),init_onnx_value=__esm({"common/dist/esm/onnx-value.js"(){}}),esm_exports={};__export(esm_exports,{InferenceSession:()=>InferenceSession2,TRACE:()=>TRACE,TRACE_EVENT_BEGIN:()=>TRACE_EVENT_BEGIN,TRACE_EVENT_END:()=>TRACE_EVENT_END,TRACE_FUNC_BEGIN:()=>TRACE_FUNC_BEGIN,TRACE_FUNC_END:()=>TRACE_FUNC_END,Tensor:()=>Tensor2,env:()=>env2,registerBackend:()=>registerBackend});var init_esm=__esm({"common/dist/esm/index.js"(){"use strict";init_backend(),init_env(),init_inference_session(),init_tensor(),init_tensor_conversion(),init_tensor_factory(),init_trace(),init_onnx_model(),init_onnx_value()}});function log(e,t,r,n){if(void 0===t)return createCategorizedLogger(e);if(void 0===r)logInternal(e,t,1);else if("number"==typeof r&&void 0===n)logInternal(e,t,r);else if("string"==typeof r&&void 0===n)logInternal(e,r,1,t);else if("string"==typeof r&&"number"==typeof n)logInternal(e,r,n,t);else throw TypeError("input is valid")}function createCategorizedLogger(e){return{verbose:log.verbose.bind(null,e),info:log.info.bind(null,e),warning:log.warning.bind(null,e),error:log.error.bind(null,e),fatal:log.fatal.bind(null,e)}}function logInternal(e,t,r,n){let i=LOGGER_CONFIG_MAP[n||""]||LOGGER_CONFIG_MAP[""];SEVERITY_VALUE[e]<SEVERITY_VALUE[i.minimalSeverity]||(i.logDateTime&&(t=`${new Date().toISOString()}|${t}`),i.logSourceLocation,LOGGER_PROVIDER_MAP[i.provider].log(e,t,n))}var init_instrument=__esm({"web/lib/onnxjs/instrument.ts"(){"use strict";NoOpLoggerProvider=class{log(e,t,r){}},ConsoleLoggerProvider=class{log(e,t,r){console.log(`${this.color(e)} ${r?"\x1b[35m"+r+"\x1b[0m ":""}${t}`)}color(e){switch(e){case"verbose":return"\x1b[34;40mv\x1b[0m";case"info":return"\x1b[32mi\x1b[0m";case"warning":return"\x1b[30;43mw\x1b[0m";case"error":return"\x1b[31;40me\x1b[0m";case"fatal":return"\x1b[101mf\x1b[0m";default:throw Error(`unsupported severity: ${e}`)}}},SEVERITY_VALUE={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},LOGGER_PROVIDER_MAP={none:new NoOpLoggerProvider,console:new ConsoleLoggerProvider},LOGGER_CONFIG_MAP={"":LOGGER_DEFAULT_CONFIG={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1}},(e=>{function t(t,r){e("verbose",t,r)}function r(t,r){e("info",t,r)}function n(t,r){e("warning",t,r)}function i(t,r){e("error",t,r)}function o(t,r){e("fatal",t,r)}function s(e){LOGGER_CONFIG_MAP={},a("",e||{})}function a(e,t){if("*"===e)s(t);else{let r=LOGGER_CONFIG_MAP[e]||LOGGER_DEFAULT_CONFIG;LOGGER_CONFIG_MAP[e]={provider:t.provider||r.provider,minimalSeverity:t.minimalSeverity||r.minimalSeverity,logDateTime:void 0===t.logDateTime?r.logDateTime:t.logDateTime,logSourceLocation:void 0===t.logSourceLocation?r.logSourceLocation:t.logSourceLocation}}}e.verbose=t,e.info=r,e.warning=n,e.error=i,e.fatal=o,e.reset=s,e.set=a,e.setWithEnv=function(e){let t={};e.logLevel&&(t.minimalSeverity=e.logLevel),a("",t)}})(log||(log={})),Logger=log,Event=class{constructor(e,t,r,n,i,o){this.category=e,this.name=t,this.startTime=r,this.endCallback=n,this.timer=i,this.ctx=o}async end(){return this.endCallback(this)}async checkTimer(){if(void 0!==this.ctx&&void 0!==this.timer)return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer);throw Error("No webgl timer found")}},EventRecord=class{constructor(e,t,r,n){this.category=e,this.name=t,this.startTime=r,this.endTime=n}},Profiler=class{constructor(e,t,r){this._started=!1,this._flushPointer=0,this._started=!1,this._maxNumberEvents=void 0===e?1e4:e,this._flushBatchSize=void 0===t?10:t,this._flushIntervalInMilliseconds=void 0===r?5e3:r}static create(e){return void 0===e?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=now(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,t,r,n){let i=this._started?this.begin(e,t,n):void 0,o=!1,s=r();if(s&&"function"==typeof s.then)return o=!0,new Promise((e,t)=>{s.then(async t=>{i&&await i.end(),e(t)},async e=>{i&&await i.end(),t(e)})});if(!o&&i){let e=i.end();if(e&&"function"==typeof e.then)return new Promise((t,r)=>{e.then(()=>{t(s)},e=>{r(e)})})}return s}begin(e,t,r){if(!this._started)throw Error("profiler is not started yet");if(void 0!==r)return new Event(e,t,0,async e=>this.end(e),r.beginTimer(),r);{let r=now();return this.flush(r),new Event(e,t,r,e=>this.endSync(e))}}async end(e){let t=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new EventRecord(e.category,e.name,e.startTime,t)),this.flush(t))}endSync(e){let t=now();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new EventRecord(e.category,e.name,e.startTime,t)),this.flush(t))}logOneEvent(e){Logger.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let e=this._flushPointer;this._flushPointer<e+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=now()}}get started(){return this._started}},now="u">typeof performance&&performance.now?()=>performance.now():Date.now}});function resolveOperator(e,t,r){for(let n of r){let r=n[0],i=n[1],o=n[2],s=n[3],a=n[4];if(e.opType===r){for(let e of t)if((e.domain===i||"ai.onnx"===e.domain&&""===i)&&matchSelector(e.version,o))return{opImpl:s,opInit:a}}}throw TypeError(`cannot resolve operator '${e.opType}' with opsets: ${t.map(e=>`${e.domain||"ai.onnx"} v${e.version}`).join(", ")}`)}function matchSelector(e,t){if(t.endsWith("+")){let r=Number.parseInt(t.substring(0,t.length-1),10);return!isNaN(r)&&r<=e}if(2!==t.split("-").length)return Number.parseInt(t,10)===e;{let r=t.split("-"),n=Number.parseInt(r[0],10),i=Number.parseInt(r[1],10);return!isNaN(n)&&!isNaN(i)&&n<=e&&e<=i}}var init_opset=__esm({"web/lib/onnxjs/opset.ts"(){}}),require_guid=__commonJS({"web/node_modules/guid-typescript/dist/guid.js"(e){"use strict";e.__esModule=!0,e.Guid=function(){function e(t){if(!t)throw TypeError("Invalid argument; `value` has no value.");this.value=e.EMPTY,t&&e.isGuid(t)&&(this.value=t)}return e.isGuid=function(t){var r=t.toString();return t&&(t instanceof e||e.validator.test(r))},e.create=function(){return new e([e.gen(2),e.gen(1),e.gen(1),e.gen(1),e.gen(3)].join("-"))},e.createEmpty=function(){return new e("emptyguid")},e.parse=function(t){return new e(t)},e.raw=function(){return[e.gen(2),e.gen(1),e.gen(1),e.gen(1),e.gen(3)].join("-")},e.gen=function(e){for(var t="",r=0;r<e;r++)t+=((1+Math.random())*65536|0).toString(16).substring(1);return t},e.prototype.equals=function(t){return e.isGuid(t)&&this.value===t.toString()},e.prototype.isEmpty=function(){return this.value===e.EMPTY},e.prototype.toString=function(){return this.value},e.prototype.toJSON=function(){return{value:this.value}},e.validator=RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),e.EMPTY="00000000-0000-0000-0000-000000000000",e}()}});function Long(e,t,r){this.low=0|e,this.high=0|t,this.unsigned=!!r}function isLong(e){return!0===(e&&e.__isLong__)}function ctz32(e){var t=Math.clz32(e&-e);return e?31-t:t}function fromInt(e,t){var r,n,i;if(t)return(e>>>=0,(i=0<=e&&e<256)&&(n=UINT_CACHE[e]))?n:(r=fromBits(e,0,!0),i&&(UINT_CACHE[e]=r),r);return(e|=0,(i=-128<=e&&e<128)&&(n=INT_CACHE[e]))?n:(r=fromBits(e,e<0?-1:0,!1),i&&(INT_CACHE[e]=r),r)}function fromNumber(e,t){if(isNaN(e))return t?UZERO:ZERO;if(t){if(e<0)return UZERO;if(e>=TWO_PWR_64_DBL)return MAX_UNSIGNED_VALUE}else{if(e<=-TWO_PWR_63_DBL)return MIN_VALUE;if(e+1>=TWO_PWR_63_DBL)return MAX_VALUE}return e<0?fromNumber(-e,t).neg():fromBits(e%TWO_PWR_32_DBL|0,e/TWO_PWR_32_DBL|0,t)}function fromBits(e,t,r){return new Long(e,t,r)}function fromString(e,t,r){if(0===e.length)throw Error("empty string");if("number"==typeof t?(r=t,t=!1):t=!!t,"NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return t?UZERO:ZERO;if((r=r||10)<2||36<r)throw RangeError("radix");if((n=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===n)return fromString(e.substring(1),t,r).neg();for(var n,i=fromNumber(pow_dbl(r,8)),o=ZERO,s=0;s<e.length;s+=8){var a=Math.min(8,e.length-s),u=parseInt(e.substring(s,s+a),r);if(a<8){var l=fromNumber(pow_dbl(r,a));o=o.mul(l).add(fromNumber(u))}else o=(o=o.mul(i)).add(fromNumber(u))}return o.unsigned=t,o}function fromValue(e,t){return"number"==typeof e?fromNumber(e,t):"string"==typeof e?fromString(e,t):fromBits(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}var init_long=__esm({"web/node_modules/long/index.js"(){wasm=null;try{wasm=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(e){}Long.prototype.__isLong__,Object.defineProperty(Long.prototype,"__isLong__",{value:!0}),Long.isLong=isLong,INT_CACHE={},UINT_CACHE={},Long.fromInt=fromInt,Long.fromNumber=fromNumber,Long.fromBits=fromBits,pow_dbl=Math.pow,Long.fromString=fromString,Long.fromValue=fromValue,TWO_PWR_24_DBL=0x1000000,TWO_PWR_63_DBL=(TWO_PWR_64_DBL=(TWO_PWR_32_DBL=(TWO_PWR_16_DBL=65536)*TWO_PWR_16_DBL)*TWO_PWR_32_DBL)/2,TWO_PWR_24=fromInt(TWO_PWR_24_DBL),Long.ZERO=ZERO=fromInt(0),Long.UZERO=UZERO=fromInt(0,!0),Long.ONE=ONE=fromInt(1),Long.UONE=UONE=fromInt(1,!0),Long.NEG_ONE=NEG_ONE=fromInt(-1),Long.MAX_VALUE=MAX_VALUE=fromBits(-1,0x7fffffff,!1),Long.MAX_UNSIGNED_VALUE=MAX_UNSIGNED_VALUE=fromBits(-1,-1,!0),Long.MIN_VALUE=MIN_VALUE=fromBits(0,-0x80000000,!1),(LongPrototype=Long.prototype).toInt=function(){return this.unsigned?this.low>>>0:this.low},LongPrototype.toNumber=function(){return this.unsigned?(this.high>>>0)*TWO_PWR_32_DBL+(this.low>>>0):this.high*TWO_PWR_32_DBL+(this.low>>>0)},LongPrototype.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(!this.eq(MIN_VALUE))return"-"+this.neg().toString(e);else{var t=fromNumber(e),r=this.div(t),n=r.mul(t).sub(this);return r.toString(e)+n.toInt().toString(e)}for(var i=fromNumber(pow_dbl(e,6),this.unsigned),o=this,s="";;){var a=o.div(i),u=(o.sub(a.mul(i)).toInt()>>>0).toString(e);if((o=a).isZero())return u+s;for(;u.length<6;)u="0"+u;s=""+u+s}},LongPrototype.getHighBits=function(){return this.high},LongPrototype.getHighBitsUnsigned=function(){return this.high>>>0},LongPrototype.getLowBits=function(){return this.low},LongPrototype.getLowBitsUnsigned=function(){return this.low>>>0},LongPrototype.getNumBitsAbs=function(){if(this.isNegative())return this.eq(MIN_VALUE)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&(e&1<<t)==0;t--);return 0!=this.high?t+33:t+1},LongPrototype.isZero=function(){return 0===this.high&&0===this.low},LongPrototype.eqz=LongPrototype.isZero,LongPrototype.isNegative=function(){return!this.unsigned&&this.high<0},LongPrototype.isPositive=function(){return this.unsigned||this.high>=0},LongPrototype.isOdd=function(){return(1&this.low)==1},LongPrototype.isEven=function(){return(1&this.low)==0},LongPrototype.equals=function(e){return isLong(e)||(e=fromValue(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&this.high===e.high&&this.low===e.low},LongPrototype.eq=LongPrototype.equals,LongPrototype.notEquals=function(e){return!this.eq(e)},LongPrototype.neq=LongPrototype.notEquals,LongPrototype.ne=LongPrototype.notEquals,LongPrototype.lessThan=function(e){return 0>this.comp(e)},LongPrototype.lt=LongPrototype.lessThan,LongPrototype.lessThanOrEqual=function(e){return 0>=this.comp(e)},LongPrototype.lte=LongPrototype.lessThanOrEqual,LongPrototype.le=LongPrototype.lessThanOrEqual,LongPrototype.greaterThan=function(e){return this.comp(e)>0},LongPrototype.gt=LongPrototype.greaterThan,LongPrototype.greaterThanOrEqual=function(e){return this.comp(e)>=0},LongPrototype.gte=LongPrototype.greaterThanOrEqual,LongPrototype.ge=LongPrototype.greaterThanOrEqual,LongPrototype.compare=function(e){if(isLong(e)||(e=fromValue(e)),this.eq(e))return 0;var t=this.isNegative(),r=e.isNegative();return t&&!r?-1:!t&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},LongPrototype.comp=LongPrototype.compare,LongPrototype.negate=function(){return!this.unsigned&&this.eq(MIN_VALUE)?MIN_VALUE:this.not().add(ONE)},LongPrototype.neg=LongPrototype.negate,LongPrototype.add=function(e){isLong(e)||(e=fromValue(e));var t,r,n=this.high>>>16,i=65535&this.high,o=this.low>>>16,s=65535&this.low,a=e.high>>>16,u=65535&e.high,l=e.low>>>16,d=65535&e.low,p=0,c=0;return t=0+((r=0+(s+d))>>>16),r&=65535,t+=o+l,c+=t>>>16,t&=65535,c+=i+u,p+=c>>>16,c&=65535,p+=n+a,fromBits(t<<16|r,(p&=65535)<<16|c,this.unsigned)},LongPrototype.subtract=function(e){return isLong(e)||(e=fromValue(e)),this.add(e.neg())},LongPrototype.sub=LongPrototype.subtract,LongPrototype.multiply=function(e){if(this.isZero())return this;if(isLong(e)||(e=fromValue(e)),wasm)return fromBits(wasm.mul(this.low,this.high,e.low,e.high),wasm.get_high(),this.unsigned);if(e.isZero())return this.unsigned?UZERO:ZERO;if(this.eq(MIN_VALUE))return e.isOdd()?MIN_VALUE:ZERO;if(e.eq(MIN_VALUE))return this.isOdd()?MIN_VALUE:ZERO;if(this.isNegative())if(e.isNegative())return this.neg().mul(e.neg());else return this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(TWO_PWR_24)&&e.lt(TWO_PWR_24))return fromNumber(this.toNumber()*e.toNumber(),this.unsigned);var t,r,n=this.high>>>16,i=65535&this.high,o=this.low>>>16,s=65535&this.low,a=e.high>>>16,u=65535&e.high,l=e.low>>>16,d=65535&e.low,p=0,c=0;return t=0+((r=0+s*d)>>>16),r&=65535,t+=o*d,c+=t>>>16,t&=65535,t+=s*l,c+=t>>>16,t&=65535,c+=i*d,p+=c>>>16,c&=65535,c+=o*l,p+=c>>>16,c&=65535,c+=s*u,p+=c>>>16,c&=65535,p+=n*d+i*l+o*u+s*a,fromBits(t<<16|r,(p&=65535)<<16|c,this.unsigned)},LongPrototype.mul=LongPrototype.multiply,LongPrototype.divide=function(e){if(isLong(e)||(e=fromValue(e)),e.isZero())throw Error("division by zero");if(wasm){var t,r,n;return this.unsigned||-0x80000000!==this.high||-1!==e.low||-1!==e.high?fromBits((this.unsigned?wasm.div_u:wasm.div_s)(this.low,this.high,e.low,e.high),wasm.get_high(),this.unsigned):this}if(this.isZero())return this.unsigned?UZERO:ZERO;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return UZERO;if(e.gt(this.shru(1)))return UONE;n=UZERO}else{if(this.eq(MIN_VALUE))if(e.eq(ONE)||e.eq(NEG_ONE))return MIN_VALUE;else return e.eq(MIN_VALUE)?ONE:(t=this.shr(1).div(e).shl(1)).eq(ZERO)?e.isNegative()?ONE:NEG_ONE:(r=this.sub(e.mul(t)),n=t.add(r.div(e)));if(e.eq(MIN_VALUE))return this.unsigned?UZERO:ZERO;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();n=ZERO}for(r=this;r.gte(e);){for(var i=Math.ceil(Math.log(t=Math.max(1,Math.floor(r.toNumber()/e.toNumber())))/Math.LN2),o=i<=48?1:pow_dbl(2,i-48),s=fromNumber(t),a=s.mul(e);a.isNegative()||a.gt(r);)t-=o,a=(s=fromNumber(t,this.unsigned)).mul(e);s.isZero()&&(s=ONE),n=n.add(s),r=r.sub(a)}return n},LongPrototype.div=LongPrototype.divide,LongPrototype.modulo=function(e){return(isLong(e)||(e=fromValue(e)),wasm)?fromBits((this.unsigned?wasm.rem_u:wasm.rem_s)(this.low,this.high,e.low,e.high),wasm.get_high(),this.unsigned):this.sub(this.div(e).mul(e))},LongPrototype.mod=LongPrototype.modulo,LongPrototype.rem=LongPrototype.modulo,LongPrototype.not=function(){return fromBits(~this.low,~this.high,this.unsigned)},LongPrototype.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},LongPrototype.clz=LongPrototype.countLeadingZeros,LongPrototype.countTrailingZeros=function(){return this.low?ctz32(this.low):ctz32(this.high)+32},LongPrototype.ctz=LongPrototype.countTrailingZeros,LongPrototype.and=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low&e.low,this.high&e.high,this.unsigned)},LongPrototype.or=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low|e.low,this.high|e.high,this.unsigned)},LongPrototype.xor=function(e){return isLong(e)||(e=fromValue(e)),fromBits(this.low^e.low,this.high^e.high,this.unsigned)},LongPrototype.shiftLeft=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):fromBits(0,this.low<<e-32,this.unsigned)},LongPrototype.shl=LongPrototype.shiftLeft,LongPrototype.shiftRight=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):fromBits(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},LongPrototype.shr=LongPrototype.shiftRight,LongPrototype.shiftRightUnsigned=function(e){return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:e<32?fromBits(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):32===e?fromBits(this.high,0,this.unsigned):fromBits(this.high>>>e-32,0,this.unsigned)},LongPrototype.shru=LongPrototype.shiftRightUnsigned,LongPrototype.shr_u=LongPrototype.shiftRightUnsigned,LongPrototype.rotateLeft=function(e){var t;return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:32===e?fromBits(this.high,this.low,this.unsigned):e<32?(t=32-e,fromBits(this.low<<e|this.high>>>t,this.high<<e|this.low>>>t,this.unsigned)):(e-=32,t=32-e,fromBits(this.high<<e|this.low>>>t,this.low<<e|this.high>>>t,this.unsigned))},LongPrototype.rotl=LongPrototype.rotateLeft,LongPrototype.rotateRight=function(e){var t;return(isLong(e)&&(e=e.toInt()),0==(e&=63))?this:32===e?fromBits(this.high,this.low,this.unsigned):e<32?(t=32-e,fromBits(this.high<<t|this.low>>>e,this.low<<t|this.high>>>e,this.unsigned)):(e-=32,t=32-e,fromBits(this.low<<t|this.high>>>e,this.high<<t|this.low>>>e,this.unsigned))},LongPrototype.rotr=LongPrototype.rotateRight,LongPrototype.toSigned=function(){return this.unsigned?fromBits(this.low,this.high,!1):this},LongPrototype.toUnsigned=function(){return this.unsigned?this:fromBits(this.low,this.high,!0)},LongPrototype.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},LongPrototype.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},LongPrototype.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},Long.fromBytes=function(e,t,r){return r?Long.fromBytesLE(e,t):Long.fromBytesBE(e,t)},Long.fromBytesLE=function(e,t){return new Long(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,t)},Long.fromBytesBE=function(e,t){return new Long(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],t)},long_default=Long}}),require_arg_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/arg-type.js"(e){"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.ArgType=void 0,function(e){e[e.INPUT=0]="INPUT",e[e.OUTPUT=1]="OUTPUT"}(t||(e.ArgType=t={}))}}),require_constants=__commonJS({"web/node_modules/flatbuffers/js/constants.js"(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0,e.SIZEOF_SHORT=2,e.SIZEOF_INT=4,e.FILE_IDENTIFIER_LENGTH=4,e.SIZE_PREFIX_LENGTH=4}}),require_utils=__commonJS({"web/node_modules/flatbuffers/js/utils.js"(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isLittleEndian=e.float64=e.float32=e.int32=void 0,e.int32=new Int32Array(2),e.float32=new Float32Array(e.int32.buffer),e.float64=new Float64Array(e.int32.buffer),e.isLittleEndian=1===new Uint16Array(new Uint8Array([1,0]).buffer)[0]}}),require_encoding=__commonJS({"web/node_modules/flatbuffers/js/encoding.js"(e){"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.Encoding=void 0,function(e){e[e.UTF8_BYTES=1]="UTF8_BYTES",e[e.UTF16_STRING=2]="UTF16_STRING"}(t||(e.Encoding=t={}))}}),require_byte_buffer=__commonJS({"web/node_modules/flatbuffers/js/byte-buffer.js"(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=void 0;var t=require_constants(),r=require_utils(),n=require_encoding();e.ByteBuffer=class e{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(t){return new e(new Uint8Array(t))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return r.int32[0]=this.readInt32(e),r.float32[0]}readFloat64(e){return r.int32[+!r.isLittleEndian]=this.readInt32(e),r.int32[+!!r.isLittleEndian]=this.readInt32(e+4),r.float64[0]}writeInt8(e,t){this.bytes_[e]=t}writeUint8(e,t){this.bytes_[e]=t}writeInt16(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8}writeUint16(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8}writeInt32(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8,this.bytes_[e+2]=t>>16,this.bytes_[e+3]=t>>24}writeUint32(e,t){this.bytes_[e]=t,this.bytes_[e+1]=t>>8,this.bytes_[e+2]=t>>16,this.bytes_[e+3]=t>>24}writeInt64(e,t){this.writeInt32(e,Number(BigInt.asIntN(32,t))),this.writeInt32(e+4,Number(BigInt.asIntN(32,t>>BigInt(32))))}writeUint64(e,t){this.writeUint32(e,Number(BigInt.asUintN(32,t))),this.writeUint32(e+4,Number(BigInt.asUintN(32,t>>BigInt(32))))}writeFloat32(e,t){r.float32[0]=t,this.writeInt32(e,r.int32[0])}writeFloat64(e,t){r.float64[0]=t,this.writeInt32(e,r.int32[+!r.isLittleEndian]),this.writeInt32(e+4,r.int32[+!!r.isLittleEndian])}getBufferIdentifier(){if(this.bytes_.length<this.position_+t.SIZEOF_INT+t.FILE_IDENTIFIER_LENGTH)throw Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let r=0;r<t.FILE_IDENTIFIER_LENGTH;r++)e+=String.fromCharCode(this.readInt8(this.position_+t.SIZEOF_INT+r));return e}__offset(e,t){let r=e-this.readInt32(e);return t<this.readInt16(r)?this.readInt16(r+t):0}__union(e,t){return e.bb_pos=t+this.readInt32(t),e.bb=this,e}__string(e,r){e+=this.readInt32(e);let i=this.readInt32(e);e+=t.SIZEOF_INT;let o=this.bytes_.subarray(e,e+i);return r===n.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,t){return"string"==typeof e?this.__string(t):this.__union(e,t)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+t.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=t.FILE_IDENTIFIER_LENGTH)throw Error("FlatBuffers: file identifier must be length "+t.FILE_IDENTIFIER_LENGTH);for(let r=0;r<t.FILE_IDENTIFIER_LENGTH;r++)if(e.charCodeAt(r)!=this.readInt8(this.position()+t.SIZEOF_INT+r))return!1;return!0}createScalarList(e,t){let r=[];for(let n=0;n<t;++n){let t=e(n);null!==t&&r.push(t)}return r}createObjList(e,t){let r=[];for(let n=0;n<t;++n){let t=e(n);null!==t&&r.push(t.unpack())}return r}}}}),require_builder=__commonJS({"web/node_modules/flatbuffers/js/builder.js"(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Builder=void 0;var t=require_byte_buffer(),r=require_constants();e.Builder=class e{constructor(e){let r;this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder,r=e||1024,this.bb=t.ByteBuffer.allocate(r),this.space=r}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(t,r){t>this.minalign&&(this.minalign=t);let n=~(this.bb.capacity()-this.space+r)+1&t-1;for(;this.space<n+t+r;){let t=this.bb.capacity();this.bb=e.growByteBuffer(this.bb),this.space+=this.bb.capacity()-t}this.pad(n)}pad(e){for(let t=0;t<e;t++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,t,r){(this.force_defaults||t!=r)&&(this.addInt8(t),this.slot(e))}addFieldInt16(e,t,r){(this.force_defaults||t!=r)&&(this.addInt16(t),this.slot(e))}addFieldInt32(e,t,r){(this.force_defaults||t!=r)&&(this.addInt32(t),this.slot(e))}addFieldInt64(e,t,r){(this.force_defaults||t!==r)&&(this.addInt64(t),this.slot(e))}addFieldFloat32(e,t,r){(this.force_defaults||t!=r)&&(this.addFloat32(t),this.slot(e))}addFieldFloat64(e,t,r){(this.force_defaults||t!=r)&&(this.addFloat64(t),this.slot(e))}addFieldOffset(e,t,r){(this.force_defaults||t!=r)&&(this.addOffset(t),this.slot(e))}addFieldStruct(e,t,r){t!=r&&(this.nested(t),this.slot(e))}nested(e){if(e!=this.offset())throw TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){null!==this.vtable&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let r=e.capacity();if(0xc0000000&r)throw Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let n=r<<1,i=t.ByteBuffer.allocate(n);return i.setPosition(n-r),i.bytes().set(e.bytes(),n-r),i}addOffset(e){this.prep(r.SIZEOF_INT,0),this.writeInt32(this.offset()-e+r.SIZEOF_INT)}startObject(e){this.notNested(),null==this.vtable&&(this.vtable=[]),this.vtable_in_use=e;for(let t=0;t<e;t++)this.vtable[t]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(null==this.vtable||!this.isNested)throw Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),t=this.vtable_in_use-1;for(;t>=0&&0==this.vtable[t];t--);let n=t+1;for(;t>=0;t--)this.addInt16(0!=this.vtable[t]?e-this.vtable[t]:0);let i=2;this.addInt16(e-this.object_start);let o=(n+i)*r.SIZEOF_SHORT;this.addInt16(o);let s=0,a=this.space;e:for(t=0;t<this.vtables.length;t++){let e=this.bb.capacity()-this.vtables[t];if(o==this.bb.readInt16(e)){for(let t=r.SIZEOF_SHORT;t<o;t+=r.SIZEOF_SHORT)if(this.bb.readInt16(a+t)!=this.bb.readInt16(e+t))continue e;s=this.vtables[t];break}}return s?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,s-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,t,n){let i=n?r.SIZE_PREFIX_LENGTH:0;if(t){let e=t;if(this.prep(this.minalign,r.SIZEOF_INT+r.FILE_IDENTIFIER_LENGTH+i),e.length!=r.FILE_IDENTIFIER_LENGTH)throw TypeError("FlatBuffers: file identifier must be length "+r.FILE_IDENTIFIER_LENGTH);for(let t=r.FILE_IDENTIFIER_LENGTH-1;t>=0;t--)this.writeInt8(e.charCodeAt(t))}this.prep(this.minalign,r.SIZEOF_INT+i),this.addOffset(e),i&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,t){this.finish(e,t,!0)}requiredField(e,t){let r=this.bb.capacity()-e,n=r-this.bb.readInt32(r);if(!(t<this.bb.readInt16(n)&&0!=this.bb.readInt16(n+t)))throw TypeError("FlatBuffers: field "+t+" must be set")}startVector(e,t,n){this.notNested(),this.vector_num_elems=t,this.prep(r.SIZEOF_INT,e*t),this.prep(n,e*t)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let t=this.createString(e);return this.string_maps.set(e,t),t}createString(e){let t;return null==e?0:(t=e instanceof Uint8Array?e:this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,t.length,1),this.bb.setPosition(this.space-=t.length),this.bb.bytes().set(t,this.space),this.endVector())}createByteVector(e){return null==e?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return null===e?0:"string"==typeof e?this.createString(e):e.pack(this)}createObjectOffsetList(e){let t=[];for(let r=0;r<e.length;++r){let n=e[r];if(null!==n)t.push(this.createObjectOffset(n));else throw TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return t}createStructOffsetList(e,t){return t(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}}}}),require_flatbuffers=__commonJS({"web/node_modules/flatbuffers/js/flatbuffers.js"(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ByteBuffer=e.Builder=e.Encoding=e.isLittleEndian=e.float64=e.float32=e.int32=e.SIZE_PREFIX_LENGTH=e.FILE_IDENTIFIER_LENGTH=e.SIZEOF_INT=e.SIZEOF_SHORT=void 0;var t=require_constants();Object.defineProperty(e,"SIZEOF_SHORT",{enumerable:!0,get:function(){return t.SIZEOF_SHORT}});var r=require_constants();Object.defineProperty(e,"SIZEOF_INT",{enumerable:!0,get:function(){return r.SIZEOF_INT}});var n=require_constants();Object.defineProperty(e,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return n.FILE_IDENTIFIER_LENGTH}});var i=require_constants();Object.defineProperty(e,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return i.SIZE_PREFIX_LENGTH}});var o=require_utils();Object.defineProperty(e,"int32",{enumerable:!0,get:function(){return o.int32}}),Object.defineProperty(e,"float32",{enumerable:!0,get:function(){return o.float32}}),Object.defineProperty(e,"float64",{enumerable:!0,get:function(){return o.float64}}),Object.defineProperty(e,"isLittleEndian",{enumerable:!0,get:function(){return o.isLittleEndian}});var s=require_encoding();Object.defineProperty(e,"Encoding",{enumerable:!0,get:function(){return s.Encoding}});var a=require_builder();Object.defineProperty(e,"Builder",{enumerable:!0,get:function(){return a.Builder}});var u=require_byte_buffer();Object.defineProperty(e,"ByteBuffer",{enumerable:!0,get:function(){return u.ByteBuffer}})}}),require_arg_type_and_index=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/arg-type-and-index.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.ArgTypeAndIndex=void 0;var i=n(require_flatbuffers()),o=require_arg_type();e.ArgTypeAndIndex=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsArgTypeAndIndex(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsArgTypeAndIndex(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):o.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,t){e.addFieldInt8(0,t,o.ArgType.INPUT)}static addIndex(e,t){e.addFieldInt32(1,t,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(t,r,n){return e.startArgTypeAndIndex(t),e.addArgType(t,r),e.addIndex(t,n),e.endArgTypeAndIndex(t)}}}}),require_attribute_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/attribute-type.js"(e){"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeType=void 0,function(e){e[e.UNDEFINED=0]="UNDEFINED",e[e.FLOAT=1]="FLOAT",e[e.INT=2]="INT",e[e.STRING=3]="STRING",e[e.TENSOR=4]="TENSOR",e[e.GRAPH=5]="GRAPH",e[e.FLOATS=6]="FLOATS",e[e.INTS=7]="INTS",e[e.STRINGS=8]="STRINGS",e[e.TENSORS=9]="TENSORS",e[e.GRAPHS=10]="GRAPHS",e[e.SPARSE_TENSOR=11]="SPARSE_TENSOR",e[e.SPARSE_TENSORS=12]="SPARSE_TENSORS"}(t||(e.AttributeType=t={}))}}),require_node_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/node-type.js"(e){"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.NodeType=void 0,function(e){e[e.Primitive=0]="Primitive",e[e.Fused=1]="Fused"}(t||(e.NodeType=t={}))}}),require_node=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/node.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Node=void 0;var i=n(require_flatbuffers()),o=require_attribute(),s=require_node_type();e.Node=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNode(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNode(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}domain(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb_pos+t,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):s.NodeType.Primitive}executionProviderType(e){let t=this.bb.__offset(this.bb_pos,18);return t?this.bb.__string(this.bb_pos+t,e):null}inputs(e,t){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,t){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,t){let r=this.bb.__offset(this.bb_pos,24);return r?(t||new o.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readInt32(this.bb.__vector(this.bb_pos+t)+4*e):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,t){let r=this.bb.__offset(this.bb_pos,28);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addDomain(e,t){e.addFieldOffset(2,t,0)}static addSinceVersion(e,t){e.addFieldInt32(3,t,0)}static addIndex(e,t){e.addFieldInt32(4,t,0)}static addOpType(e,t){e.addFieldOffset(5,t,0)}static addType(e,t){e.addFieldInt32(6,t,s.NodeType.Primitive)}static addExecutionProviderType(e,t){e.addFieldOffset(7,t,0)}static addInputs(e,t){e.addFieldOffset(8,t,0)}static createInputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startInputsVector(e,t){e.startVector(4,t,4)}static addOutputs(e,t){e.addFieldOffset(9,t,0)}static createOutputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startOutputsVector(e,t){e.startVector(4,t,4)}static addAttributes(e,t){e.addFieldOffset(10,t,0)}static createAttributesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startAttributesVector(e,t){e.startVector(4,t,4)}static addInputArgCounts(e,t){e.addFieldOffset(11,t,0)}static createInputArgCountsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addInt32(t[r]);return e.endVector()}static startInputArgCountsVector(e,t){e.startVector(4,t,4)}static addImplicitInputs(e,t){e.addFieldOffset(12,t,0)}static createImplicitInputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startImplicitInputsVector(e,t){e.startVector(4,t,4)}static endNode(e){return e.endObject()}static createNode(t,r,n,i,o,s,a,u,l,d,p,c,h,f){return e.startNode(t),e.addName(t,r),e.addDocString(t,n),e.addDomain(t,i),e.addSinceVersion(t,o),e.addIndex(t,s),e.addOpType(t,a),e.addType(t,u),e.addExecutionProviderType(t,l),e.addInputs(t,d),e.addOutputs(t,p),e.addAttributes(t,c),e.addInputArgCounts(t,h),e.addImplicitInputs(t,f),e.endNode(t)}}}}),require_edge_end=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/edge-end.js"(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.EdgeEnd=void 0,e.EdgeEnd=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,t,r,n){return e.prep(4,12),e.writeInt32(n),e.writeInt32(r),e.writeInt32(t),e.offset()}}}}),require_node_edge=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/node-edge.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.NodeEdge=void 0;var i=n(require_flatbuffers()),o=require_edge_end();e.NodeEdge=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNodeEdge(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNodeEdge(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new o.EdgeEnd).__init(this.bb.__vector(this.bb_pos+r)+12*e,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,t){let r=this.bb.__offset(this.bb_pos,8);return r?(t||new o.EdgeEnd).__init(this.bb.__vector(this.bb_pos+r)+12*e,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,t){e.addFieldInt32(0,t,0)}static addInputEdges(e,t){e.addFieldOffset(1,t,0)}static startInputEdgesVector(e,t){e.startVector(12,t,4)}static addOutputEdges(e,t){e.addFieldOffset(2,t,0)}static startOutputEdgesVector(e,t){e.startVector(12,t,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(t,r,n,i){return e.startNodeEdge(t),e.addNodeIndex(t,r),e.addInputEdges(t,n),e.addOutputEdges(t,i),e.endNodeEdge(t)}}}}),require_nodes_to_optimize_indices=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/nodes-to-optimize-indices.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.NodesToOptimizeIndices=void 0;var i=n(require_flatbuffers());e.NodesToOptimizeIndices=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsNodesToOptimizeIndices(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNodesToOptimizeIndices(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndices(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb.__vector(this.bb_pos+t)+4*e):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return!!e&&!!this.bb.readInt8(this.bb_pos+e)}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return!!e&&!!this.bb.readInt8(this.bb_pos+e)}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,t){e.addFieldOffset(0,t,0)}static createNodeIndicesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addInt32(t[r]);return e.endVector()}static startNodeIndicesVector(e,t){e.startVector(4,t,4)}static addNumInputs(e,t){e.addFieldInt32(1,t,0)}static addNumOutputs(e,t){e.addFieldInt32(2,t,0)}static addHasVariadicInput(e,t){e.addFieldInt8(3,+t,0)}static addHasVariadicOutput(e,t){e.addFieldInt8(4,+t,0)}static addNumVariadicInputs(e,t){e.addFieldInt32(5,t,0)}static addNumVariadicOutputs(e,t){e.addFieldInt32(6,t,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(t,r,n,i,o,s,a,u){return e.startNodesToOptimizeIndices(t),e.addNodeIndices(t,r),e.addNumInputs(t,n),e.addNumOutputs(t,i),e.addHasVariadicInput(t,o),e.addHasVariadicOutput(t,s),e.addNumVariadicInputs(t,a),e.addNumVariadicOutputs(t,u),e.endNodesToOptimizeIndices(t)}}}}),require_runtime_optimization_record=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/runtime-optimization-record.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecord=void 0;var i=n(require_flatbuffers()),o=require_nodes_to_optimize_indices();e.RuntimeOptimizationRecord=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizationRecord(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizationRecord(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}actionId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}nodesToOptimizeIndices(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new o.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}producedOpIds(e,t){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,t){e.addFieldOffset(0,t,0)}static addNodesToOptimizeIndices(e,t){e.addFieldOffset(1,t,0)}static addProducedOpIds(e,t){e.addFieldOffset(3,t,0)}static createProducedOpIdsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startProducedOpIdsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}}}}),require_runtime_optimization_record_container_entry=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/runtime-optimization-record-container-entry.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizationRecordContainerEntry=void 0;var i=n(require_flatbuffers()),o=require_runtime_optimization_record();e.RuntimeOptimizationRecordContainerEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizationRecordContainerEntry(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}optimizerName(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}runtimeOptimizationRecords(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new o.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,t){e.addFieldOffset(0,t,0)}static addRuntimeOptimizationRecords(e,t){e.addFieldOffset(1,t,0)}static createRuntimeOptimizationRecordsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizationRecordContainerEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createRuntimeOptimizationRecordContainerEntry(t,r,n){return e.startRuntimeOptimizationRecordContainerEntry(t),e.addOptimizerName(t,r),e.addRuntimeOptimizationRecords(t,n),e.endRuntimeOptimizationRecordContainerEntry(t)}}}}),require_runtime_optimizations=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/runtime-optimizations.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.RuntimeOptimizations=void 0;var i=n(require_flatbuffers()),o=require_runtime_optimization_record_container_entry();e.RuntimeOptimizations=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsRuntimeOptimizations(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRuntimeOptimizations(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}records(e,t){let r=this.bb.__offset(this.bb_pos,4);return r?(t||new o.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,t){e.addFieldOffset(0,t,0)}static createRecordsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startRecordsVector(e,t){e.startVector(4,t,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(t,r){return e.startRuntimeOptimizations(t),e.addRecords(t,r),e.endRuntimeOptimizations(t)}}}}),require_tensor_data_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/tensor-data-type.js"(e){"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.TensorDataType=void 0,function(e){e[e.UNDEFINED=0]="UNDEFINED",e[e.FLOAT=1]="FLOAT",e[e.UINT8=2]="UINT8",e[e.INT8=3]="INT8",e[e.UINT16=4]="UINT16",e[e.INT16=5]="INT16",e[e.INT32=6]="INT32",e[e.INT64=7]="INT64",e[e.STRING=8]="STRING",e[e.BOOL=9]="BOOL",e[e.FLOAT16=10]="FLOAT16",e[e.DOUBLE=11]="DOUBLE",e[e.UINT32=12]="UINT32",e[e.UINT64=13]="UINT64",e[e.COMPLEX64=14]="COMPLEX64",e[e.COMPLEX128=15]="COMPLEX128",e[e.BFLOAT16=16]="BFLOAT16",e[e.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",e[e.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",e[e.FLOAT8E5M2=19]="FLOAT8E5M2",e[e.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"}(t||(e.TensorDataType=t={}))}}),require_tensor=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/tensor.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Tensor=void 0;var i=n(require_flatbuffers()),o=require_tensor_data_type();e.Tensor=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTensor(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTensor(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}dims(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):o.TensorDataType.UNDEFINED}rawData(e){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readUint8(this.bb.__vector(this.bb_pos+t)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,t){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addDims(e,t){e.addFieldOffset(2,t,0)}static createDimsVector(e,t){e.startVector(8,t.length,8);for(let r=t.length-1;r>=0;r--)e.addInt64(t[r]);return e.endVector()}static startDimsVector(e,t){e.startVector(8,t,8)}static addDataType(e,t){e.addFieldInt32(3,t,o.TensorDataType.UNDEFINED)}static addRawData(e,t){e.addFieldOffset(4,t,0)}static createRawDataVector(e,t){e.startVector(1,t.length,1);for(let r=t.length-1;r>=0;r--)e.addInt8(t[r]);return e.endVector()}static startRawDataVector(e,t){e.startVector(1,t,1)}static addStringData(e,t){e.addFieldOffset(5,t,0)}static createStringDataVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startStringDataVector(e,t){e.startVector(4,t,4)}static addExternalDataOffset(e,t){e.addFieldInt64(6,t,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(t,r,n,i,o,s,a,u){return e.startTensor(t),e.addName(t,r),e.addDocString(t,n),e.addDims(t,i),e.addDataType(t,o),e.addRawData(t,s),e.addStringData(t,a),e.addExternalDataOffset(t,u),e.endTensor(t)}}}}),require_sparse_tensor=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/sparse-tensor.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.SparseTensor=void 0;var i=n(require_flatbuffers()),o=require_tensor();e.SparseTensor=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsSparseTensor(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsSparseTensor(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}values(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new o.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}indices(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new o.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}dims(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,t){e.addFieldOffset(0,t,0)}static addIndices(e,t){e.addFieldOffset(1,t,0)}static addDims(e,t){e.addFieldOffset(2,t,0)}static createDimsVector(e,t){e.startVector(8,t.length,8);for(let r=t.length-1;r>=0;r--)e.addInt64(t[r]);return e.endVector()}static startDimsVector(e,t){e.startVector(8,t,8)}static endSparseTensor(e){return e.endObject()}}}}),require_map_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/map-type.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.MapType=void 0;var i=n(require_flatbuffers()),o=require_tensor_data_type(),s=require_type_info();e.MapType=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsMapType(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsMapType(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):o.TensorDataType.UNDEFINED}valueType(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new s.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,t){e.addFieldInt32(0,t,o.TensorDataType.UNDEFINED)}static addValueType(e,t){e.addFieldOffset(1,t,0)}static endMapType(e){return e.endObject()}}}}),require_sequence_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/sequence-type.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.SequenceType=void 0;var i=n(require_flatbuffers()),o=require_type_info();e.SequenceType=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsSequenceType(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsSequenceType(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}elemType(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new o.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,t){e.addFieldOffset(0,t,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(t,r){return e.startSequenceType(t),e.addElemType(t,r),e.endSequenceType(t)}}}}),require_dimension_value_type=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/dimension-value-type.js"(e){"use strict";var t;Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValueType=void 0,function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.VALUE=1]="VALUE",e[e.PARAM=2]="PARAM"}(t||(e.DimensionValueType=t={}))}}),require_dimension_value=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/dimension-value.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.DimensionValue=void 0;var i=n(require_flatbuffers()),o=require_dimension_value_type();e.DimensionValue=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDimensionValue(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDimensionValue(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):o.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,t){e.addFieldInt8(0,t,o.DimensionValueType.UNKNOWN)}static addDimValue(e,t){e.addFieldInt64(1,t,BigInt("0"))}static addDimParam(e,t){e.addFieldOffset(2,t,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(t,r,n,i){return e.startDimensionValue(t),e.addDimType(t,r),e.addDimValue(t,n),e.addDimParam(t,i),e.endDimensionValue(t)}}}}),require_dimension=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/dimension.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Dimension=void 0;var i=n(require_flatbuffers()),o=require_dimension_value();e.Dimension=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDimension(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDimension(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}value(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new o.DimensionValue).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}denotation(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}static startDimension(e){e.startObject(2)}static addValue(e,t){e.addFieldOffset(0,t,0)}static addDenotation(e,t){e.addFieldOffset(1,t,0)}static endDimension(e){return e.endObject()}static createDimension(t,r,n){return e.startDimension(t),e.addValue(t,r),e.addDenotation(t,n),e.endDimension(t)}}}}),require_shape=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/shape.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Shape=void 0;var i=n(require_flatbuffers()),o=require_dimension();e.Shape=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsShape(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsShape(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}dim(e,t){let r=this.bb.__offset(this.bb_pos,4);return r?(t||new o.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,t){e.addFieldOffset(0,t,0)}static createDimVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startDimVector(e,t){e.startVector(4,t,4)}static endShape(e){return e.endObject()}static createShape(t,r){return e.startShape(t),e.addDim(t,r),e.endShape(t)}}}}),require_tensor_type_and_shape=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/tensor-type-and-shape.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.TensorTypeAndShape=void 0;var i=n(require_flatbuffers()),o=require_shape(),s=require_tensor_data_type();e.TensorTypeAndShape=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTensorTypeAndShape(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTensorTypeAndShape(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):s.TensorDataType.UNDEFINED}shape(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new o.Shape).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,t){e.addFieldInt32(0,t,s.TensorDataType.UNDEFINED)}static addShape(e,t){e.addFieldOffset(1,t,0)}static endTensorTypeAndShape(e){return e.endObject()}}}}),require_type_info_value=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/type-info-value.js"(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.unionListToTypeInfoValue=e.unionToTypeInfoValue=e.TypeInfoValue=void 0;var t,r=require_map_type(),n=require_sequence_type(),i=require_tensor_type_and_shape();!function(e){e[e.NONE=0]="NONE",e[e.tensor_type=1]="tensor_type",e[e.sequence_type=2]="sequence_type",e[e.map_type=3]="map_type"}(t||(e.TypeInfoValue=t={})),e.unionToTypeInfoValue=function(e,o){switch(t[e]){case"NONE":default:return null;case"tensor_type":return o(new i.TensorTypeAndShape);case"sequence_type":return o(new n.SequenceType);case"map_type":return o(new r.MapType)}},e.unionListToTypeInfoValue=function(e,o,s){switch(t[e]){case"NONE":default:return null;case"tensor_type":return o(s,new i.TensorTypeAndShape);case"sequence_type":return o(s,new n.SequenceType);case"map_type":return o(s,new r.MapType)}}}}),require_type_info=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/type-info.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.TypeInfo=void 0;var i=n(require_flatbuffers()),o=require_type_info_value();e.TypeInfo=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsTypeInfo(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTypeInfo(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}denotation(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):o.TypeInfoValue.NONE}value(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__union(e,this.bb_pos+t):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,t){e.addFieldOffset(0,t,0)}static addValueType(e,t){e.addFieldInt8(1,t,o.TypeInfoValue.NONE)}static addValue(e,t){e.addFieldOffset(2,t,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(t,r,n,i){return e.startTypeInfo(t),e.addDenotation(t,r),e.addValueType(t,n),e.addValue(t,i),e.endTypeInfo(t)}}}}),require_value_info=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/value-info.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.ValueInfo=void 0;var i=n(require_flatbuffers()),o=require_type_info();e.ValueInfo=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsValueInfo(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsValueInfo(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}type(e){let t=this.bb.__offset(this.bb_pos,8);return t?(e||new o.TypeInfo).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addType(e,t){e.addFieldOffset(2,t,0)}static endValueInfo(e){return e.endObject()}}}}),require_graph=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/graph.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Graph=void 0;var i=n(require_flatbuffers()),o=require_node(),s=require_node_edge(),a=require_runtime_optimizations(),u=require_sparse_tensor(),l=require_tensor(),d=require_value_info();e.Graph=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsGraph(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsGraph(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}initializers(e,t){let r=this.bb.__offset(this.bb_pos,4);return r?(t||new l.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new d.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,t){let r=this.bb.__offset(this.bb_pos,8);return r?(t||new o.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,t){let r=this.bb.__offset(this.bb_pos,12);return r?(t||new s.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,t){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,t){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,t){let r=this.bb.__offset(this.bb_pos,18);return r?(t||new u.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let t=this.bb.__offset(this.bb_pos,20);return t?(e||new a.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,t){e.addFieldOffset(0,t,0)}static createInitializersVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startInitializersVector(e,t){e.startVector(4,t,4)}static addNodeArgs(e,t){e.addFieldOffset(1,t,0)}static createNodeArgsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startNodeArgsVector(e,t){e.startVector(4,t,4)}static addNodes(e,t){e.addFieldOffset(2,t,0)}static createNodesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startNodesVector(e,t){e.startVector(4,t,4)}static addMaxNodeIndex(e,t){e.addFieldInt32(3,t,0)}static addNodeEdges(e,t){e.addFieldOffset(4,t,0)}static createNodeEdgesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startNodeEdgesVector(e,t){e.startVector(4,t,4)}static addInputs(e,t){e.addFieldOffset(5,t,0)}static createInputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startInputsVector(e,t){e.startVector(4,t,4)}static addOutputs(e,t){e.addFieldOffset(6,t,0)}static createOutputsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startOutputsVector(e,t){e.startVector(4,t,4)}static addSparseInitializers(e,t){e.addFieldOffset(7,t,0)}static createSparseInitializersVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startSparseInitializersVector(e,t){e.startVector(4,t,4)}static addRuntimeOptimizations(e,t){e.addFieldOffset(8,t,0)}static endGraph(e){return e.endObject()}}}}),require_attribute=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/attribute.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Attribute=void 0;var i=n(require_flatbuffers()),o=require_attribute_type(),s=require_graph(),a=require_tensor();e.Attribute=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsAttribute(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsAttribute(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}name(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}docString(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):o.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb_pos+t,e):null}t(e){let t=this.bb.__offset(this.bb_pos,16);return t?(e||new a.Tensor).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}g(e){let t=this.bb.__offset(this.bb_pos,18);return t?(e||new s.Graph).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}floats(e){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readFloat32(this.bb.__vector(this.bb_pos+t)+4*e):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readInt64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,t){let r=this.bb.__offset(this.bb_pos,24);return r?this.bb.__string(this.bb.__vector(this.bb_pos+r)+4*e,t):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,t){let r=this.bb.__offset(this.bb_pos,26);return r?(t||new a.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,t){let r=this.bb.__offset(this.bb_pos,28);return r?(t||new s.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,t){e.addFieldOffset(0,t,0)}static addDocString(e,t){e.addFieldOffset(1,t,0)}static addType(e,t){e.addFieldInt32(2,t,o.AttributeType.UNDEFINED)}static addF(e,t){e.addFieldFloat32(3,t,0)}static addI(e,t){e.addFieldInt64(4,t,BigInt("0"))}static addS(e,t){e.addFieldOffset(5,t,0)}static addT(e,t){e.addFieldOffset(6,t,0)}static addG(e,t){e.addFieldOffset(7,t,0)}static addFloats(e,t){e.addFieldOffset(8,t,0)}static createFloatsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addFloat32(t[r]);return e.endVector()}static startFloatsVector(e,t){e.startVector(4,t,4)}static addInts(e,t){e.addFieldOffset(9,t,0)}static createIntsVector(e,t){e.startVector(8,t.length,8);for(let r=t.length-1;r>=0;r--)e.addInt64(t[r]);return e.endVector()}static startIntsVector(e,t){e.startVector(8,t,8)}static addStrings(e,t){e.addFieldOffset(10,t,0)}static createStringsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startStringsVector(e,t){e.startVector(4,t,4)}static addTensors(e,t){e.addFieldOffset(11,t,0)}static createTensorsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startTensorsVector(e,t){e.startVector(4,t,4)}static addGraphs(e,t){e.addFieldOffset(12,t,0)}static createGraphsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startGraphsVector(e,t){e.startVector(4,t,4)}static endAttribute(e){return e.endObject()}}}}),require_deprecated_kernel_create_infos=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/deprecated-kernel-create-infos.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedKernelCreateInfos=void 0;var i=n(require_flatbuffers());e.DeprecatedKernelCreateInfos=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedKernelCreateInfos(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndices(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb.__vector(this.bb_pos+t)+4*e):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint64(this.bb.__vector(this.bb_pos+t)+8*e):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,t){e.addFieldOffset(0,t,0)}static createNodeIndicesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addInt32(t[r]);return e.endVector()}static startNodeIndicesVector(e,t){e.startVector(4,t,4)}static addKernelDefHashes(e,t){e.addFieldOffset(1,t,0)}static createKernelDefHashesVector(e,t){e.startVector(8,t.length,8);for(let r=t.length-1;r>=0;r--)e.addInt64(t[r]);return e.endVector()}static startKernelDefHashesVector(e,t){e.startVector(8,t,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(t,r,n){return e.startDeprecatedKernelCreateInfos(t),e.addNodeIndices(t,r),e.addKernelDefHashes(t,n),e.endDeprecatedKernelCreateInfos(t)}}}}),require_deprecated_node_index_and_kernel_def_hash=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/deprecated-node-index-and-kernel-def-hash.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedNodeIndexAndKernelDefHash=void 0;var i=n(require_flatbuffers());e.DeprecatedNodeIndexAndKernelDefHash=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,t){e.addFieldInt32(0,t,0)}static addKernelDefHash(e,t){e.addFieldInt64(1,t,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(t,r,n){return e.startDeprecatedNodeIndexAndKernelDefHash(t),e.addNodeIndex(t,r),e.addKernelDefHash(t,n),e.endDeprecatedNodeIndexAndKernelDefHash(t)}}}}),require_deprecated_sub_graph_session_state=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/deprecated-sub-graph-session-state.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSubGraphSessionState=void 0;var i=n(require_flatbuffers()),o=require_deprecated_session_state();e.DeprecatedSubGraphSessionState=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedSubGraphSessionState(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}graphId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}sessionState(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new o.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,t){e.addFieldOffset(0,t,0)}static addSessionState(e,t){e.addFieldOffset(1,t,0)}static endDeprecatedSubGraphSessionState(e){let t=e.endObject();return e.requiredField(t,4),t}}}}),require_deprecated_session_state=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/deprecated-session-state.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.DeprecatedSessionState=void 0;var i=n(require_flatbuffers()),o=require_deprecated_kernel_create_infos(),s=require_deprecated_sub_graph_session_state();e.DeprecatedSessionState=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsDeprecatedSessionState(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDeprecatedSessionState(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}kernels(e){let t=this.bb.__offset(this.bb_pos,4);return t?(e||new o.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}subGraphSessionStates(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new s.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,t){e.addFieldOffset(0,t,0)}static addSubGraphSessionStates(e,t){e.addFieldOffset(1,t,0)}static createSubGraphSessionStatesVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startSubGraphSessionStatesVector(e,t){e.startVector(4,t,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(t,r,n){return e.startDeprecatedSessionState(t),e.addKernels(t,r),e.addSubGraphSessionStates(t,n),e.endDeprecatedSessionState(t)}}}}),require_kernel_type_str_args_entry=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/kernel-type-str-args-entry.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrArgsEntry=void 0;var i=n(require_flatbuffers()),o=require_arg_type_and_index();e.KernelTypeStrArgsEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsKernelTypeStrArgsEntry(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}kernelTypeStr(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}args(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new o.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,t){e.addFieldOffset(0,t,0)}static addArgs(e,t){e.addFieldOffset(1,t,0)}static createArgsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startArgsVector(e,t){e.startVector(4,t,4)}static endKernelTypeStrArgsEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createKernelTypeStrArgsEntry(t,r,n){return e.startKernelTypeStrArgsEntry(t),e.addKernelTypeStr(t,r),e.addArgs(t,n),e.endKernelTypeStrArgsEntry(t)}}}}),require_op_id_kernel_type_str_args_entry=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/op-id-kernel-type-str-args-entry.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.OpIdKernelTypeStrArgsEntry=void 0;var i=n(require_flatbuffers()),o=require_kernel_type_str_args_entry();e.OpIdKernelTypeStrArgsEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsOpIdKernelTypeStrArgsEntry(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}opId(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}kernelTypeStrArgs(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new o.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,t){e.addFieldOffset(0,t,0)}static addKernelTypeStrArgs(e,t){e.addFieldOffset(1,t,0)}static createKernelTypeStrArgsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startKernelTypeStrArgsVector(e,t){e.startVector(4,t,4)}static endOpIdKernelTypeStrArgsEntry(e){let t=e.endObject();return e.requiredField(t,4),t}static createOpIdKernelTypeStrArgsEntry(t,r,n){return e.startOpIdKernelTypeStrArgsEntry(t),e.addOpId(t,r),e.addKernelTypeStrArgs(t,n),e.endOpIdKernelTypeStrArgsEntry(t)}}}}),require_kernel_type_str_resolver=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/kernel-type-str-resolver.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.KernelTypeStrResolver=void 0;var i=n(require_flatbuffers()),o=require_op_id_kernel_type_str_args_entry();e.KernelTypeStrResolver=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsKernelTypeStrResolver(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsKernelTypeStrResolver(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}opKernelTypeStrArgs(e,t){let r=this.bb.__offset(this.bb_pos,4);return r?(t||new o.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,t){e.addFieldOffset(0,t,0)}static createOpKernelTypeStrArgsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,t){e.startVector(4,t,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(t,r){return e.startKernelTypeStrResolver(t),e.addOpKernelTypeStrArgs(t,r),e.endKernelTypeStrResolver(t)}}}}),require_operator_set_id=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/operator-set-id.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.OperatorSetId=void 0;var i=n(require_flatbuffers());e.OperatorSetId=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsOperatorSetId(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsOperatorSetId(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}domain(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,t){e.addFieldOffset(0,t,0)}static addVersion(e,t){e.addFieldInt64(1,t,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(t,r,n){return e.startOperatorSetId(t),e.addDomain(t,r),e.addVersion(t,n),e.endOperatorSetId(t)}}}}),require_string_string_entry=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/string-string-entry.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.StringStringEntry=void 0;var i=n(require_flatbuffers());e.StringStringEntry=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsStringStringEntry(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsStringStringEntry(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}key(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}value(e){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__string(this.bb_pos+t,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,t){e.addFieldOffset(0,t,0)}static addValue(e,t){e.addFieldOffset(1,t,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(t,r,n){return e.startStringStringEntry(t),e.addKey(t,r),e.addValue(t,n),e.endStringStringEntry(t)}}}}),require_model=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/model.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.Model=void 0;var i=n(require_flatbuffers()),o=require_graph(),s=require_operator_set_id(),a=require_string_string_entry();e.Model=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsModel(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsModel(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,t){let r=this.bb.__offset(this.bb_pos,6);return r?(t||new s.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__string(this.bb_pos+t,e):null}producerVersion(e){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb_pos+t,e):null}domain(e){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__string(this.bb_pos+t,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb_pos+t,e):null}graph(e){let t=this.bb.__offset(this.bb_pos,18);return t?(e||new o.Graph).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}graphDocString(e){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb_pos+t,e):null}metadataProps(e,t){let r=this.bb.__offset(this.bb_pos,22);return r?(t||new a.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+r)+4*e),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,t){e.addFieldInt64(0,t,BigInt("0"))}static addOpsetImport(e,t){e.addFieldOffset(1,t,0)}static createOpsetImportVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startOpsetImportVector(e,t){e.startVector(4,t,4)}static addProducerName(e,t){e.addFieldOffset(2,t,0)}static addProducerVersion(e,t){e.addFieldOffset(3,t,0)}static addDomain(e,t){e.addFieldOffset(4,t,0)}static addModelVersion(e,t){e.addFieldInt64(5,t,BigInt("0"))}static addDocString(e,t){e.addFieldOffset(6,t,0)}static addGraph(e,t){e.addFieldOffset(7,t,0)}static addGraphDocString(e,t){e.addFieldOffset(8,t,0)}static addMetadataProps(e,t){e.addFieldOffset(9,t,0)}static createMetadataPropsVector(e,t){e.startVector(4,t.length,4);for(let r=t.length-1;r>=0;r--)e.addOffset(t[r]);return e.endVector()}static startMetadataPropsVector(e,t){e.startVector(4,t,4)}static endModel(e){return e.endObject()}}}}),require_inference_session=__commonJS({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs/inference-session.js"(e){"use strict";var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=e&&e.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&t(n,e,i);return r(n,e),n};Object.defineProperty(e,"__esModule",{value:!0}),e.InferenceSession=void 0;var i=n(require_flatbuffers()),o=require_kernel_type_str_resolver(),s=require_model();e.InferenceSession=class e{constructor(){this.bb=null,this.bb_pos=0}__init(e,t){return this.bb_pos=e,this.bb=t,this}static getRootAsInferenceSession(t,r){return(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsInferenceSession(t,r){return t.setPosition(t.position()+i.SIZE_PREFIX_LENGTH),(r||new e).__init(t.readInt32(t.position())+t.position(),t)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__string(this.bb_pos+t,e):null}model(e){let t=this.bb.__offset(this.bb_pos,6);return t?(e||new s.Model).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}kernelTypeStrResolver(e){let t=this.bb.__offset(this.bb_pos,10);return t?(e||new o.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+t),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,t){e.addFieldOffset(0,t,0)}static addModel(e,t){e.addFieldOffset(1,t,0)}static addKernelTypeStrResolver(e,t){e.addFieldOffset(3,t,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,t){e.finish(t,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,t){e.finish(t,"ORTM",!0)}}}}),init_fbs=__esm({"web/lib/onnxjs/ort-schema/flatbuffers/onnxruntime/fbs.ts"(){"use strict";import_arg_type=__toESM(require_arg_type()),import_arg_type_and_index=__toESM(require_arg_type_and_index()),import_attribute=__toESM(require_attribute()),import_attribute_type=__toESM(require_attribute_type()),import_deprecated_kernel_create_infos=__toESM(require_deprecated_kernel_create_infos()),import_deprecated_node_index_and_kernel_def_hash=__toESM(require_deprecated_node_index_and_kernel_def_hash()),import_deprecated_session_state=__toESM(require_deprecated_session_state()),import_deprecated_sub_graph_session_state=__toESM(require_deprecated_sub_graph_session_state()),import_dimension=__toESM(require_dimension()),import_dimension_value=__toESM(require_dimension_value()),import_dimension_value_type=__toESM(require_dimension_value_type()),import_edge_end=__toESM(require_edge_end()),import_graph=__toESM(require_graph()),import_inference_session=__toESM(require_inference_session()),import_kernel_type_str_args_entry=__toESM(require_kernel_type_str_args_entry()),import_kernel_type_str_resolver=__toESM(require_kernel_type_str_resolver()),import_map_type=__toESM(require_map_type()),import_model=__toESM(require_model()),import_node=__toESM(require_node()),import_node_edge=__toESM(require_node_edge()),import_node_type=__toESM(require_node_type()),import_nodes_to_optimize_indices=__toESM(require_nodes_to_optimize_indices()),import_op_id_kernel_type_str_args_entry=__toESM(require_op_id_kernel_type_str_args_entry()),import_operator_set_id=__toESM(require_operator_set_id()),import_runtime_optimization_record=__toESM(require_runtime_optimization_record()),import_runtime_optimization_record_container_entry=__toESM(require_runtime_optimization_record_container_entry()),import_runtime_optimizations=__toESM(require_runtime_optimizations()),import_sequence_type=__toESM(require_sequence_type()),import_shape=__toESM(require_shape()),import_sparse_tensor=__toESM(require_sparse_tensor()),import_string_string_entry=__toESM(require_string_string_entry()),import_tensor2=__toESM(require_tensor()),import_tensor_data_type=__toESM(require_tensor_data_type()),import_tensor_type_and_shape=__toESM(require_tensor_type_and_shape()),import_type_info=__toESM(require_type_info()),import_type_info_value=__toESM(require_type_info_value()),import_value_info=__toESM(require_value_info())}}),init_ort_generated=__esm({"web/lib/onnxjs/ort-schema/flatbuffers/ort-generated.ts"(){"use strict";init_fbs()}}),require_aspromise=__commonJS({"web/node_modules/@protobufjs/aspromise/index.js"(e,t){"use strict";t.exports=function e(e,t){for(var r=Array(arguments.length-1),n=0,i=2,o=!0;i<arguments.length;)r[n++]=arguments[i++];return new Promise(function(i,s){r[n]=function(e){if(o)if(o=!1,e)s(e);else{for(var t=Array(arguments.length-1),r=0;r<t.length;)t[r++]=arguments[r];i.apply(null,t)}};try{e.apply(t||null,r)}catch(e){o&&(o=!1,s(e))}})}}}),require_base64=__commonJS({"web/node_modules/@protobufjs/base64/index.js"(e){"use strict";var t,r=e;r.length=function(e){var t=e.length;if(!t)return 0;for(var r=0;--t%4>1&&"="===e.charAt(t);)++r;return Math.ceil(3*e.length)/4-r};var n=Array(64),i=Array(123);for(t=0;t<64;)i[n[t]=t<26?t+65:t<52?t+71:t<62?t-4:t-59|43]=t++;r.encode=function(e,t,r){for(var i,o=null,s=[],a=0,u=0;t<r;){var l=e[t++];switch(u){case 0:s[a++]=n[l>>2],i=(3&l)<<4,u=1;break;case 1:s[a++]=n[i|l>>4],i=(15&l)<<2,u=2;break;case 2:s[a++]=n[i|l>>6],s[a++]=n[63&l],u=0}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,s)),a=0)}return(u&&(s[a++]=n[i],s[a++]=61,1===u&&(s[a++]=61)),o)?(a&&o.push(String.fromCharCode.apply(String,s.slice(0,a))),o.join("")):String.fromCharCode.apply(String,s.slice(0,a))};var o="invalid encoding";r.decode=function(e,t,r){for(var n,s=r,a=0,u=0;u<e.length;){var l=e.charCodeAt(u++);if(61===l&&a>1)break;if(void 0===(l=i[l]))throw Error(o);switch(a){case 0:n=l,a=1;break;case 1:t[r++]=n<<2|(48&l)>>4,n=l,a=2;break;case 2:t[r++]=(15&n)<<4|(60&l)>>2,n=l,a=3;break;case 3:t[r++]=(3&n)<<6|l,a=0}}if(1===a)throw Error(o);return r-s},r.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}}}),require_eventemitter=__commonJS({"web/node_modules/@protobufjs/eventemitter/index.js"(e,t){"use strict";function r(){this._listeners={}}t.exports=r,r.prototype.on=function(e,t,r){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:t,ctx:r||this}),this},r.prototype.off=function(e,t){if(void 0===e)this._listeners={};else if(void 0===t)this._listeners[e]=[];else for(var r=this._listeners[e],n=0;n<r.length;)r[n].fn===t?r.splice(n,1):++n;return this},r.prototype.emit=function(e){var t=this._listeners[e];if(t){for(var r=[],n=1;n<arguments.length;)r.push(arguments[n++]);for(n=0;n<t.length;)t[n].fn.apply(t[n++].ctx,r)}return this}}}),require_float=__commonJS({"web/node_modules/@protobufjs/float/index.js"(e,t){"use strict";function r(e){return"u">typeof Float32Array?!function(){var t=new Float32Array([-0]),r=new Uint8Array(t.buffer),n=128===r[3];function i(e,n,i){t[0]=e,n[i]=r[0],n[i+1]=r[1],n[i+2]=r[2],n[i+3]=r[3]}function o(e,n,i){t[0]=e,n[i]=r[3],n[i+1]=r[2],n[i+2]=r[1],n[i+3]=r[0]}function s(e,n){return r[0]=e[n],r[1]=e[n+1],r[2]=e[n+2],r[3]=e[n+3],t[0]}function a(e,n){return r[3]=e[n],r[2]=e[n+1],r[1]=e[n+2],r[0]=e[n+3],t[0]}e.writeFloatLE=n?i:o,e.writeFloatBE=n?o:i,e.readFloatLE=n?s:a,e.readFloatBE=n?a:s}():!function(){function t(e,t,r,n){var i=+(t<0);if(i&&(t=-t),0===t)e(1/t>0?0:0x80000000,r,n);else if(isNaN(t))e(0x7fc00000,r,n);else if(t>34028234663852886e22)e((i<<31|0x7f800000)>>>0,r,n);else if(t<11754943508222875e-54)e((i<<31|Math.round(t/1401298464324817e-60))>>>0,r,n);else{var o=Math.floor(Math.log(t)/Math.LN2),s=8388607&Math.round(t*Math.pow(2,-o)*8388608);e((i<<31|o+127<<23|s)>>>0,r,n)}}function r(e,t,r){var n=e(t,r),i=(n>>31)*2+1,o=n>>>23&255,s=8388607&n;return 255===o?s?NaN:1/0*i:0===o?1401298464324817e-60*i*s:i*Math.pow(2,o-150)*(s+8388608)}e.writeFloatLE=t.bind(null,n),e.writeFloatBE=t.bind(null,i),e.readFloatLE=r.bind(null,o),e.readFloatBE=r.bind(null,s)}(),"u">typeof Float64Array?!function(){var t=new Float64Array([-0]),r=new Uint8Array(t.buffer),n=128===r[7];function i(e,n,i){t[0]=e,n[i]=r[0],n[i+1]=r[1],n[i+2]=r[2],n[i+3]=r[3],n[i+4]=r[4],n[i+5]=r[5],n[i+6]=r[6],n[i+7]=r[7]}function o(e,n,i){t[0]=e,n[i]=r[7],n[i+1]=r[6],n[i+2]=r[5],n[i+3]=r[4],n[i+4]=r[3],n[i+5]=r[2],n[i+6]=r[1],n[i+7]=r[0]}function s(e,n){return r[0]=e[n],r[1]=e[n+1],r[2]=e[n+2],r[3]=e[n+3],r[4]=e[n+4],r[5]=e[n+5],r[6]=e[n+6],r[7]=e[n+7],t[0]}function a(e,n){return r[7]=e[n],r[6]=e[n+1],r[5]=e[n+2],r[4]=e[n+3],r[3]=e[n+4],r[2]=e[n+5],r[1]=e[n+6],r[0]=e[n+7],t[0]}e.writeDoubleLE=n?i:o,e.writeDoubleBE=n?o:i,e.readDoubleLE=n?s:a,e.readDoubleBE=n?a:s}():!function(){function t(e,t,r,n,i,o){var s,a=+(n<0);if(a&&(n=-n),0===n)e(0,i,o+t),e(1/n>0?0:0x80000000,i,o+r);else if(isNaN(n))e(0,i,o+t),e(0x7ff80000,i,o+r);else if(n>17976931348623157e292)e(0,i,o+t),e((a<<31|0x7ff00000)>>>0,i,o+r);else if(n<22250738585072014e-324)e((s=n/5e-324)>>>0,i,o+t),e((a<<31|s/0x100000000)>>>0,i,o+r);else{var u=Math.floor(Math.log(n)/Math.LN2);1024===u&&(u=1023),e(0x10000000000000*(s=n*Math.pow(2,-u))>>>0,i,o+t),e((a<<31|u+1023<<20|1048576*s&1048575)>>>0,i,o+r)}}function r(e,t,r,n,i){var o=e(n,i+t),s=e(n,i+r),a=(s>>31)*2+1,u=s>>>20&2047,l=0x100000000*(1048575&s)+o;return 2047===u?l?NaN:1/0*a:0===u?5e-324*a*l:a*Math.pow(2,u-1075)*(l+0x10000000000000)}e.writeDoubleLE=t.bind(null,n,0,4),e.writeDoubleBE=t.bind(null,i,4,0),e.readDoubleLE=r.bind(null,o,0,4),e.readDoubleBE=r.bind(null,s,4,0)}(),e}function n(e,t,r){t[r]=255&e,t[r+1]=e>>>8&255,t[r+2]=e>>>16&255,t[r+3]=e>>>24}function i(e,t,r){t[r]=e>>>24,t[r+1]=e>>>16&255,t[r+2]=e>>>8&255,t[r+3]=255&e}function o(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0}function s(e,t){return(e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3])>>>0}t.exports=r(r)}}),require_inquire=__commonJS({"web/node_modules/@protobufjs/inquire/index.js"(exports,module){"use strict";function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(e){}return null}module.exports=inquire}}),require_utf8=__commonJS({"web/node_modules/@protobufjs/utf8/index.js"(e){"use strict";var t=e;t.length=function(e){for(var t=0,r=0,n=0;n<e.length;++n)(r=e.charCodeAt(n))<128?t+=1:r<2048?t+=2:(64512&r)==55296&&(64512&e.charCodeAt(n+1))==56320?(++n,t+=4):t+=3;return t},t.read=function(e,t,r){if(r-t<1)return"";for(var n,i=null,o=[],s=0;t<r;)(n=e[t++])<128?o[s++]=n:n>191&&n<224?o[s++]=(31&n)<<6|63&e[t++]:n>239&&n<365?(n=((7&n)<<18|(63&e[t++])<<12|(63&e[t++])<<6|63&e[t++])-65536,o[s++]=55296+(n>>10),o[s++]=56320+(1023&n)):o[s++]=(15&n)<<12|(63&e[t++])<<6|63&e[t++],s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,o)),s=0);return i?(s&&i.push(String.fromCharCode.apply(String,o.slice(0,s))),i.join("")):String.fromCharCode.apply(String,o.slice(0,s))},t.write=function(e,t,r){for(var n,i,o=r,s=0;s<e.length;++s)(n=e.charCodeAt(s))<128?t[r++]=n:(n<2048?t[r++]=n>>6|192:((64512&n)==55296&&(64512&(i=e.charCodeAt(s+1)))==56320?(n=65536+((1023&n)<<10)+(1023&i),++s,t[r++]=n>>18|240,t[r++]=n>>12&63|128):t[r++]=n>>12|224,t[r++]=n>>6&63|128),t[r++]=63&n|128);return r-o}}}),require_pool=__commonJS({"web/node_modules/@protobufjs/pool/index.js"(e,t){"use strict";t.exports=function e(e,t,r){var n=r||8192,i=n>>>1,o=null,s=n;return function(r){if(r<1||r>i)return e(r);s+r>n&&(o=e(n),s=0);var a=t.call(o,s,s+=r);return 7&s&&(s=(7|s)+1),a}}}}),require_longbits=__commonJS({"web/node_modules/protobufjs/src/util/longbits.js"(e,t){"use strict";t.exports=n;var r=require_minimal();function n(e,t){this.lo=e>>>0,this.hi=t>>>0}var i=n.zero=new n(0,0);i.toNumber=function(){return 0},i.zzEncode=i.zzDecode=function(){return this},i.length=function(){return 1};var o=n.zeroHash="\0\0\0\0\0\0\0\0";n.fromNumber=function(e){if(0===e)return i;var t=e<0;t&&(e=-e);var r=e>>>0,o=(e-r)/0x100000000>>>0;return t&&(o=~o>>>0,r=~r>>>0,++r>0xffffffff&&(r=0,++o>0xffffffff&&(o=0))),new n(r,o)},n.from=function(e){if("number"==typeof e)return n.fromNumber(e);if(r.isString(e))if(!r.Long)return n.fromNumber(parseInt(e,10));else e=r.Long.fromString(e);return e.low||e.high?new n(e.low>>>0,e.high>>>0):i},n.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var t=~this.lo+1>>>0,r=~this.hi>>>0;return t||(r=r+1>>>0),-(t+0x100000000*r)}return this.lo+0x100000000*this.hi},n.prototype.toLong=function(e){return r.Long?new r.Long(0|this.lo,0|this.hi,!!e):{low:0|this.lo,high:0|this.hi,unsigned:!!e}};var s=String.prototype.charCodeAt;n.fromHash=function(e){return e===o?i:new n((s.call(e,0)|s.call(e,1)<<8|s.call(e,2)<<16|s.call(e,3)<<24)>>>0,(s.call(e,4)|s.call(e,5)<<8|s.call(e,6)<<16|s.call(e,7)<<24)>>>0)},n.prototype.toHash=function(){return String.fromCharCode(255&this.lo,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,255&this.hi,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)},n.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this},n.prototype.zzDecode=function(){var e=-(1&this.lo);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this},n.prototype.length=function(){var e=this.lo,t=(this.lo>>>28|this.hi<<4)>>>0,r=this.hi>>>24;return 0===r?0===t?e<16384?e<128?1:2:e<2097152?3:4:t<16384?t<128?5:6:t<2097152?7:8:r<128?9:10}}}),require_minimal=__commonJS({"web/node_modules/protobufjs/src/util/minimal.js"(e){"use strict";var t=e;function r(e,t,r){for(var n=Object.keys(t),i=0;i<n.length;++i)void 0!==e[n[i]]&&r||(e[n[i]]=t[n[i]]);return e}function n(e){function t(e,n){if(!(this instanceof t))return new t(e,n);Object.defineProperty(this,"message",{get:function(){return e}}),Error.captureStackTrace?Error.captureStackTrace(this,t):Object.defineProperty(this,"stack",{value:Error().stack||""}),n&&r(this,n)}return t.prototype=Object.create(Error.prototype,{constructor:{value:t,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return e},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),t}t.asPromise=require_aspromise(),t.base64=require_base64(),t.EventEmitter=require_eventemitter(),t.float=require_float(),t.inquire=require_inquire(),t.utf8=require_utf8(),t.pool=require_pool(),t.LongBits=require_longbits(),t.isNode=!!("u">typeof global&&global&&global.process&&global.process.versions&&global.process.versions.node),t.global=t.isNode&&global||"u">typeof window&&window||"u">typeof self&&self||e,t.emptyArray=Object.freeze?Object.freeze([]):[],t.emptyObject=Object.freeze?Object.freeze({}):{},t.isInteger=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},t.isString=function(e){return"string"==typeof e||e instanceof String},t.isObject=function(e){return e&&"object"==typeof e},t.isset=t.isSet=function(e,t){var r=e[t];return!!(null!=r&&e.hasOwnProperty(t))&&("object"!=typeof r||(Array.isArray(r)?r.length:Object.keys(r).length)>0)},t.Buffer=function(){try{var e=t.inquire("buffer").Buffer;return e.prototype.utf8Write?e:null}catch(e){return null}}(),t._Buffer_from=null,t._Buffer_allocUnsafe=null,t.newBuffer=function(e){return"number"==typeof e?t.Buffer?t._Buffer_allocUnsafe(e):new t.Array(e):t.Buffer?t._Buffer_from(e):"u"<typeof Uint8Array?e:new Uint8Array(e)},t.Array="u">typeof Uint8Array?Uint8Array:Array,t.Long=t.global.dcodeIO&&t.global.dcodeIO.Long||t.global.Long||t.inquire("long"),t.key2Re=/^true|false|0|1$/,t.key32Re=/^-?(?:0|[1-9][0-9]*)$/,t.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,t.longToHash=function(e){return e?t.LongBits.from(e).toHash():t.LongBits.zeroHash},t.longFromHash=function(e,r){var n=t.LongBits.fromHash(e);return t.Long?t.Long.fromBits(n.lo,n.hi,r):n.toNumber(!!r)},t.merge=r,t.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)},t.newError=n,t.ProtocolError=n("ProtocolError"),t.oneOfGetter=function(e){for(var t={},r=0;r<e.length;++r)t[e[r]]=1;return function(){for(var e=Object.keys(this),r=e.length-1;r>-1;--r)if(1===t[e[r]]&&void 0!==this[e[r]]&&null!==this[e[r]])return e[r]}},t.oneOfSetter=function(e){return function(t){for(var r=0;r<e.length;++r)e[r]!==t&&delete this[e[r]]}},t.toJSONOptions={longs:String,enums:String,bytes:String,json:!0},t._configure=function(){var e=t.Buffer;if(!e){t._Buffer_from=t._Buffer_allocUnsafe=null;return}t._Buffer_from=e.from!==Uint8Array.from&&e.from||function(t,r){return new e(t,r)},t._Buffer_allocUnsafe=e.allocUnsafe||function(t){return new e(t)}}}}),require_writer=__commonJS({"web/node_modules/protobufjs/src/writer.js"(e,t){"use strict";t.exports=d;var r,n=require_minimal(),i=n.LongBits,o=n.base64,s=n.utf8;function a(e,t,r){this.fn=e,this.len=t,this.next=void 0,this.val=r}function u(){}function l(e){this.head=e.head,this.tail=e.tail,this.len=e.len,this.next=e.states}function d(){this.len=0,this.head=new a(u,0,0),this.tail=this.head,this.states=null}var p=function(){return n.Buffer?function(){return(d.create=function(){return new r})()}:function(){return new d}};function c(e,t,r){t[r]=255&e}function h(e,t,r){for(;e>127;)t[r++]=127&e|128,e>>>=7;t[r]=e}function f(e,t){this.len=e,this.next=void 0,this.val=t}function m(e,t,r){for(;e.hi;)t[r++]=127&e.lo|128,e.lo=(e.lo>>>7|e.hi<<25)>>>0,e.hi>>>=7;for(;e.lo>127;)t[r++]=127&e.lo|128,e.lo=e.lo>>>7;t[r++]=e.lo}function g(e,t,r){t[r]=255&e,t[r+1]=e>>>8&255,t[r+2]=e>>>16&255,t[r+3]=e>>>24}d.create=p(),d.alloc=function(e){return new n.Array(e)},n.Array!==Array&&(d.alloc=n.pool(d.alloc,n.Array.prototype.subarray)),d.prototype._push=function(e,t,r){return this.tail=this.tail.next=new a(e,t,r),this.len+=t,this},f.prototype=Object.create(a.prototype),f.prototype.fn=h,d.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new f((e>>>=0)<128?1:e<16384?2:e<2097152?3:e<0x10000000?4:5,e)).len,this},d.prototype.int32=function(e){return e<0?this._push(m,10,i.fromNumber(e)):this.uint32(e)},d.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)},d.prototype.uint64=function(e){var t=i.from(e);return this._push(m,t.length(),t)},d.prototype.int64=d.prototype.uint64,d.prototype.sint64=function(e){var t=i.from(e).zzEncode();return this._push(m,t.length(),t)},d.prototype.bool=function(e){return this._push(c,1,+!!e)},d.prototype.fixed32=function(e){return this._push(g,4,e>>>0)},d.prototype.sfixed32=d.prototype.fixed32,d.prototype.fixed64=function(e){var t=i.from(e);return this._push(g,4,t.lo)._push(g,4,t.hi)},d.prototype.sfixed64=d.prototype.fixed64,d.prototype.float=function(e){return this._push(n.float.writeFloatLE,4,e)},d.prototype.double=function(e){return this._push(n.float.writeDoubleLE,8,e)};var b=n.Array.prototype.set?function(e,t,r){t.set(e,r)}:function(e,t,r){for(var n=0;n<e.length;++n)t[r+n]=e[n]};d.prototype.bytes=function(e){var t=e.length>>>0;if(!t)return this._push(c,1,0);if(n.isString(e)){var r=d.alloc(t=o.length(e));o.decode(e,r,0),e=r}return this.uint32(t)._push(b,t,e)},d.prototype.string=function(e){var t=s.length(e);return t?this.uint32(t)._push(s.write,t,e):this._push(c,1,0)},d.prototype.fork=function(){return this.states=new l(this),this.head=this.tail=new a(u,0,0),this.len=0,this},d.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new a(u,0,0),this.len=0),this},d.prototype.ldelim=function(){var e=this.head,t=this.tail,r=this.len;return this.reset().uint32(r),r&&(this.tail.next=e.next,this.tail=t,this.len+=r),this},d.prototype.finish=function(){for(var e=this.head.next,t=this.constructor.alloc(this.len),r=0;e;)e.fn(e.val,t,r),r+=e.len,e=e.next;return t},d._configure=function(e){r=e,d.create=p(),r._configure()}}}),require_writer_buffer=__commonJS({"web/node_modules/protobufjs/src/writer_buffer.js"(e,t){"use strict";t.exports=i;var r=require_writer();(i.prototype=Object.create(r.prototype)).constructor=i;var n=require_minimal();function i(){r.call(this)}function o(e,t,r){e.length<40?n.utf8.write(e,t,r):t.utf8Write?t.utf8Write(e,r):t.write(e,r)}i._configure=function(){i.alloc=n._Buffer_allocUnsafe,i.writeBytesBuffer=n.Buffer&&n.Buffer.prototype instanceof Uint8Array&&"set"===n.Buffer.prototype.set.name?function(e,t,r){t.set(e,r)}:function(e,t,r){if(e.copy)e.copy(t,r,0,e.length);else for(var n=0;n<e.length;)t[r++]=e[n++]}},i.prototype.bytes=function(e){n.isString(e)&&(e=n._Buffer_from(e,"base64"));var t=e.length>>>0;return this.uint32(t),t&&this._push(i.writeBytesBuffer,t,e),this},i.prototype.string=function(e){var t=n.Buffer.byteLength(e);return this.uint32(t),t&&this._push(o,t,e),this},i._configure()}}),require_reader=__commonJS({"web/node_modules/protobufjs/src/reader.js"(e,t){"use strict";t.exports=a;var r,n=require_minimal(),i=n.LongBits,o=n.utf8;function s(e,t){return RangeError("index out of range: "+e.pos+" + "+(t||1)+" > "+e.len)}function a(e){this.buf=e,this.pos=0,this.len=e.length}var u="u">typeof Uint8Array?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new a(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new a(e);throw Error("illegal buffer")},l=function(){return n.Buffer?function(e){return(a.create=function(e){return n.Buffer.isBuffer(e)?new r(e):u(e)})(e)}:u};function d(){var e=new i(0,0),t=0;if(this.len-this.pos>4){for(;t<4;++t)if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e;if(e.lo=(e.lo|(127&this.buf[this.pos])<<28)>>>0,e.hi=(e.hi|(127&this.buf[this.pos])>>4)>>>0,this.buf[this.pos++]<128)return e;t=0}else{for(;t<3;++t){if(this.pos>=this.len)throw s(this);if(e.lo=(e.lo|(127&this.buf[this.pos])<<7*t)>>>0,this.buf[this.pos++]<128)return e}return e.lo=(e.lo|(127&this.buf[this.pos++])<<7*t)>>>0,e}if(this.len-this.pos>4){for(;t<5;++t)if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}else for(;t<5;++t){if(this.pos>=this.len)throw s(this);if(e.hi=(e.hi|(127&this.buf[this.pos])<<7*t+3)>>>0,this.buf[this.pos++]<128)return e}throw Error("invalid varint encoding")}function p(e,t){return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0}function c(){if(this.pos+8>this.len)throw s(this,8);return new i(p(this.buf,this.pos+=4),p(this.buf,this.pos+=4))}a.create=l(),a.prototype._slice=n.Array.prototype.subarray||n.Array.prototype.slice,a.prototype.uint32=function(){var e=0xffffffff;return function(){if(e=(127&this.buf[this.pos])>>>0,this.buf[this.pos++]<128||(e=(e|(127&this.buf[this.pos])<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(127&this.buf[this.pos])<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(127&this.buf[this.pos])<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(15&this.buf[this.pos])<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,s(this,10);return e}}(),a.prototype.int32=function(){return 0|this.uint32()},a.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(1&e)},a.prototype.bool=function(){return 0!==this.uint32()},a.prototype.fixed32=function(){if(this.pos+4>this.len)throw s(this,4);return p(this.buf,this.pos+=4)},a.prototype.sfixed32=function(){if(this.pos+4>this.len)throw s(this,4);return 0|p(this.buf,this.pos+=4)},a.prototype.float=function(){if(this.pos+4>this.len)throw s(this,4);var e=n.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e},a.prototype.double=function(){if(this.pos+8>this.len)throw s(this,4);var e=n.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e},a.prototype.bytes=function(){var e=this.uint32(),t=this.pos,r=this.pos+e;if(r>this.len)throw s(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(t,r);if(t===r){var i=n.Buffer;return i?i.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,t,r)},a.prototype.string=function(){var e=this.bytes();return o.read(e,0,e.length)},a.prototype.skip=function(e){if("number"==typeof e){if(this.pos+e>this.len)throw s(this,e);this.pos+=e}else do if(this.pos>=this.len)throw s(this);while(128&this.buf[this.pos++])return this},a.prototype.skipType=function(e){switch(e){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;4!=(e=7&this.uint32());)this.skipType(e);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+e+" at offset "+this.pos)}return this},a._configure=function(e){r=e,a.create=l(),r._configure();var t=n.Long?"toLong":"toNumber";n.merge(a.prototype,{int64:function(){return d.call(this)[t](!1)},uint64:function(){return d.call(this)[t](!0)},sint64:function(){return d.call(this).zzDecode()[t](!1)},fixed64:function(){return c.call(this)[t](!0)},sfixed64:function(){return c.call(this)[t](!1)}})}}}),require_reader_buffer=__commonJS({"web/node_modules/protobufjs/src/reader_buffer.js"(e,t){"use strict";t.exports=i;var r=require_reader();(i.prototype=Object.create(r.prototype)).constructor=i;var n=require_minimal();function i(e){r.call(this,e)}i._configure=function(){n.Buffer&&(i.prototype._slice=n.Buffer.prototype.slice)},i.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))},i._configure()}}),require_service=__commonJS({"web/node_modules/protobufjs/src/rpc/service.js"(e,t){"use strict";t.exports=n;var r=require_minimal();function n(e,t,n){if("function"!=typeof e)throw TypeError("rpcImpl must be a function");r.EventEmitter.call(this),this.rpcImpl=e,this.requestDelimited=!!t,this.responseDelimited=!!n}(n.prototype=Object.create(r.EventEmitter.prototype)).constructor=n,n.prototype.rpcCall=function e(t,n,i,o,s){if(!o)throw TypeError("request must be specified");var a=this;if(!s)return r.asPromise(e,a,t,n,i,o);if(!a.rpcImpl)return void setTimeout(function(){s(Error("already ended"))},0);try{return a.rpcImpl(t,n[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(e,r){if(e)return a.emit("error",e,t),s(e);if(null===r)return void a.end(!0);if(!(r instanceof i))try{r=i[a.responseDelimited?"decodeDelimited":"decode"](r)}catch(e){return a.emit("error",e,t),s(e)}return a.emit("data",r,t),s(null,r)})}catch(e){a.emit("error",e,t),setTimeout(function(){s(e)},0);return}},n.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}}}),require_rpc=__commonJS({"web/node_modules/protobufjs/src/rpc.js"(e){"use strict";e.Service=require_service()}}),require_roots=__commonJS({"web/node_modules/protobufjs/src/roots.js"(e,t){"use strict";t.exports={}}}),require_index_minimal=__commonJS({"web/node_modules/protobufjs/src/index-minimal.js"(e){"use strict";var t=e;function r(){t.util._configure(),t.Writer._configure(t.BufferWriter),t.Reader._configure(t.BufferReader)}t.build="minimal",t.Writer=require_writer(),t.BufferWriter=require_writer_buffer(),t.Reader=require_reader(),t.BufferReader=require_reader_buffer(),t.util=require_minimal(),t.rpc=require_rpc(),t.roots=require_roots(),t.configure=r,r()}}),require_minimal2=__commonJS({"web/node_modules/protobufjs/minimal.js"(e,t){"use strict";t.exports=require_index_minimal()}}),require_onnx=__commonJS({"web/lib/onnxjs/ort-schema/protobuf/onnx.js"(e,t){"use strict";var r=require_minimal2(),n=r.Reader,i=r.Writer,o=r.util,s=r.roots.default||(r.roots.default={});s.onnx=function(){var e={};return e.Version=function(){var e={},t=Object.create(e);return t[e[0]="_START_VERSION"]=0,t[e[1]="IR_VERSION_2017_10_10"]=1,t[e[2]="IR_VERSION_2017_10_30"]=2,t[e[3]="IR_VERSION_2017_11_3"]=3,t[e[4]="IR_VERSION_2019_1_22"]=4,t[e[5]="IR_VERSION_2019_3_18"]=5,t[e[6]="IR_VERSION_2019_9_19"]=6,t[e[7]="IR_VERSION_2020_5_8"]=7,t[e[8]="IR_VERSION_2021_7_30"]=8,t[e[9]="IR_VERSION"]=9,t}(),e.AttributeProto=function(){function e(e){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=o.Long?o.Long.fromBits(0,0,!1):0,e.prototype.s=o.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=o.emptyArray,e.prototype.ints=o.emptyArray,e.prototype.strings=o.emptyArray,e.prototype.tensors=o.emptyArray,e.prototype.graphs=o.emptyArray,e.prototype.sparseTensors=o.emptyArray,e.prototype.typeProtos=o.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=i.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.f&&Object.hasOwnProperty.call(e,"f")&&t.uint32(21).float(e.f),null!=e.i&&Object.hasOwnProperty.call(e,"i")&&t.uint32(24).int64(e.i),null!=e.s&&Object.hasOwnProperty.call(e,"s")&&t.uint32(34).bytes(e.s),null!=e.t&&Object.hasOwnProperty.call(e,"t")&&s.onnx.TensorProto.encode(e.t,t.uint32(42).fork()).ldelim(),null!=e.g&&Object.hasOwnProperty.call(e,"g")&&s.onnx.GraphProto.encode(e.g,t.uint32(50).fork()).ldelim(),null!=e.floats&&e.floats.length){t.uint32(58).fork();for(var r=0;r<e.floats.length;++r)t.float(e.floats[r]);t.ldelim()}if(null!=e.ints&&e.ints.length){t.uint32(66).fork();for(var r=0;r<e.ints.length;++r)t.int64(e.ints[r]);t.ldelim()}if(null!=e.strings&&e.strings.length)for(var r=0;r<e.strings.length;++r)t.uint32(74).bytes(e.strings[r]);if(null!=e.tensors&&e.tensors.length)for(var r=0;r<e.tensors.length;++r)s.onnx.TensorProto.encode(e.tensors[r],t.uint32(82).fork()).ldelim();if(null!=e.graphs&&e.graphs.length)for(var r=0;r<e.graphs.length;++r)s.onnx.GraphProto.encode(e.graphs[r],t.uint32(90).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(106).string(e.docString),null!=e.tp&&Object.hasOwnProperty.call(e,"tp")&&s.onnx.TypeProto.encode(e.tp,t.uint32(114).fork()).ldelim(),null!=e.typeProtos&&e.typeProtos.length)for(var r=0;r<e.typeProtos.length;++r)s.onnx.TypeProto.encode(e.typeProtos[r],t.uint32(122).fork()).ldelim();if(null!=e.type&&Object.hasOwnProperty.call(e,"type")&&t.uint32(160).int32(e.type),null!=e.refAttrName&&Object.hasOwnProperty.call(e,"refAttrName")&&t.uint32(170).string(e.refAttrName),null!=e.sparseTensor&&Object.hasOwnProperty.call(e,"sparseTensor")&&s.onnx.SparseTensorProto.encode(e.sparseTensor,t.uint32(178).fork()).ldelim(),null!=e.sparseTensors&&e.sparseTensors.length)for(var r=0;r<e.sparseTensors.length;++r)s.onnx.SparseTensorProto.encode(e.sparseTensors[r],t.uint32(186).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.AttributeProto;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.name=e.string();break;case 21:i.refAttrName=e.string();break;case 13:i.docString=e.string();break;case 20:i.type=e.int32();break;case 2:i.f=e.float();break;case 3:i.i=e.int64();break;case 4:i.s=e.bytes();break;case 5:i.t=s.onnx.TensorProto.decode(e,e.uint32());break;case 6:i.g=s.onnx.GraphProto.decode(e,e.uint32());break;case 22:i.sparseTensor=s.onnx.SparseTensorProto.decode(e,e.uint32());break;case 14:i.tp=s.onnx.TypeProto.decode(e,e.uint32());break;case 7:if(i.floats&&i.floats.length||(i.floats=[]),(7&o)==2)for(var a=e.uint32()+e.pos;e.pos<a;)i.floats.push(e.float());else i.floats.push(e.float());break;case 8:if(i.ints&&i.ints.length||(i.ints=[]),(7&o)==2)for(var a=e.uint32()+e.pos;e.pos<a;)i.ints.push(e.int64());else i.ints.push(e.int64());break;case 9:i.strings&&i.strings.length||(i.strings=[]),i.strings.push(e.bytes());break;case 10:i.tensors&&i.tensors.length||(i.tensors=[]),i.tensors.push(s.onnx.TensorProto.decode(e,e.uint32()));break;case 11:i.graphs&&i.graphs.length||(i.graphs=[]),i.graphs.push(s.onnx.GraphProto.decode(e,e.uint32()));break;case 23:i.sparseTensors&&i.sparseTensors.length||(i.sparseTensors=[]),i.sparseTensors.push(s.onnx.SparseTensorProto.decode(e,e.uint32()));break;case 15:i.typeProtos&&i.typeProtos.length||(i.typeProtos=[]),i.typeProtos.push(s.onnx.TypeProto.decode(e,e.uint32()));break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!o.isString(e.name))return"name: string expected";if(null!=e.refAttrName&&e.hasOwnProperty("refAttrName")&&!o.isString(e.refAttrName))return"refAttrName: string expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!o.isString(e.docString))return"docString: string expected";if(null!=e.type&&e.hasOwnProperty("type"))switch(e.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:}if(null!=e.f&&e.hasOwnProperty("f")&&"number"!=typeof e.f)return"f: number expected";if(null!=e.i&&e.hasOwnProperty("i")&&!o.isInteger(e.i)&&!(e.i&&o.isInteger(e.i.low)&&o.isInteger(e.i.high)))return"i: integer|Long expected";if(null!=e.s&&e.hasOwnProperty("s")&&!(e.s&&"number"==typeof e.s.length||o.isString(e.s)))return"s: buffer expected";if(null!=e.t&&e.hasOwnProperty("t")){var t=s.onnx.TensorProto.verify(e.t);if(t)return"t."+t}if(null!=e.g&&e.hasOwnProperty("g")){var t=s.onnx.GraphProto.verify(e.g);if(t)return"g."+t}if(null!=e.sparseTensor&&e.hasOwnProperty("sparseTensor")){var t=s.onnx.SparseTensorProto.verify(e.sparseTensor);if(t)return"sparseTensor."+t}if(null!=e.tp&&e.hasOwnProperty("tp")){var t=s.onnx.TypeProto.verify(e.tp);if(t)return"tp."+t}if(null!=e.floats&&e.hasOwnProperty("floats")){if(!Array.isArray(e.floats))return"floats: array expected";for(var r=0;r<e.floats.length;++r)if("number"!=typeof e.floats[r])return"floats: number[] expected"}if(null!=e.ints&&e.hasOwnProperty("ints")){if(!Array.isArray(e.ints))return"ints: array expected";for(var r=0;r<e.ints.length;++r)if(!o.isInteger(e.ints[r])&&!(e.ints[r]&&o.isInteger(e.ints[r].low)&&o.isInteger(e.ints[r].high)))return"ints: integer|Long[] expected"}if(null!=e.strings&&e.hasOwnProperty("strings")){if(!Array.isArray(e.strings))return"strings: array expected";for(var r=0;r<e.strings.length;++r)if(!(e.strings[r]&&"number"==typeof e.strings[r].length||o.isString(e.strings[r])))return"strings: buffer[] expected"}if(null!=e.tensors&&e.hasOwnProperty("tensors")){if(!Array.isArray(e.tensors))return"tensors: array expected";for(var r=0;r<e.tensors.length;++r){var t=s.onnx.TensorProto.verify(e.tensors[r]);if(t)return"tensors."+t}}if(null!=e.graphs&&e.hasOwnProperty("graphs")){if(!Array.isArray(e.graphs))return"graphs: array expected";for(var r=0;r<e.graphs.length;++r){var t=s.onnx.GraphProto.verify(e.graphs[r]);if(t)return"graphs."+t}}if(null!=e.sparseTensors&&e.hasOwnProperty("sparseTensors")){if(!Array.isArray(e.sparseTensors))return"sparseTensors: array expected";for(var r=0;r<e.sparseTensors.length;++r){var t=s.onnx.SparseTensorProto.verify(e.sparseTensors[r]);if(t)return"sparseTensors."+t}}if(null!=e.typeProtos&&e.hasOwnProperty("typeProtos")){if(!Array.isArray(e.typeProtos))return"typeProtos: array expected";for(var r=0;r<e.typeProtos.length;++r){var t=s.onnx.TypeProto.verify(e.typeProtos[r]);if(t)return"typeProtos."+t}}return null},e.fromObject=function(e){if(e instanceof s.onnx.AttributeProto)return e;var t=new s.onnx.AttributeProto;switch(null!=e.name&&(t.name=String(e.name)),null!=e.refAttrName&&(t.refAttrName=String(e.refAttrName)),null!=e.docString&&(t.docString=String(e.docString)),e.type){default:"number"==typeof e.type&&(t.type=e.type);break;case"UNDEFINED":case 0:t.type=0;break;case"FLOAT":case 1:t.type=1;break;case"INT":case 2:t.type=2;break;case"STRING":case 3:t.type=3;break;case"TENSOR":case 4:t.type=4;break;case"GRAPH":case 5:t.type=5;break;case"SPARSE_TENSOR":case 11:t.type=11;break;case"TYPE_PROTO":case 13:t.type=13;break;case"FLOATS":case 6:t.type=6;break;case"INTS":case 7:t.type=7;break;case"STRINGS":case 8:t.type=8;break;case"TENSORS":case 9:t.type=9;break;case"GRAPHS":case 10:t.type=10;break;case"SPARSE_TENSORS":case 12:t.type=12;break;case"TYPE_PROTOS":case 14:t.type=14}if(null!=e.f&&(t.f=Number(e.f)),null!=e.i&&(o.Long?(t.i=o.Long.fromValue(e.i)).unsigned=!1:"string"==typeof e.i?t.i=parseInt(e.i,10):"number"==typeof e.i?t.i=e.i:"object"==typeof e.i&&(t.i=new o.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber())),null!=e.s&&("string"==typeof e.s?o.base64.decode(e.s,t.s=o.newBuffer(o.base64.length(e.s)),0):e.s.length>=0&&(t.s=e.s)),null!=e.t){if("object"!=typeof e.t)throw TypeError(".onnx.AttributeProto.t: object expected");t.t=s.onnx.TensorProto.fromObject(e.t)}if(null!=e.g){if("object"!=typeof e.g)throw TypeError(".onnx.AttributeProto.g: object expected");t.g=s.onnx.GraphProto.fromObject(e.g)}if(null!=e.sparseTensor){if("object"!=typeof e.sparseTensor)throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");t.sparseTensor=s.onnx.SparseTensorProto.fromObject(e.sparseTensor)}if(null!=e.tp){if("object"!=typeof e.tp)throw TypeError(".onnx.AttributeProto.tp: object expected");t.tp=s.onnx.TypeProto.fromObject(e.tp)}if(e.floats){if(!Array.isArray(e.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");t.floats=[];for(var r=0;r<e.floats.length;++r)t.floats[r]=Number(e.floats[r])}if(e.ints){if(!Array.isArray(e.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");t.ints=[];for(var r=0;r<e.ints.length;++r)o.Long?(t.ints[r]=o.Long.fromValue(e.ints[r])).unsigned=!1:"string"==typeof e.ints[r]?t.ints[r]=parseInt(e.ints[r],10):"number"==typeof e.ints[r]?t.ints[r]=e.ints[r]:"object"==typeof e.ints[r]&&(t.ints[r]=new o.LongBits(e.ints[r].low>>>0,e.ints[r].high>>>0).toNumber())}if(e.strings){if(!Array.isArray(e.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");t.strings=[];for(var r=0;r<e.strings.length;++r)"string"==typeof e.strings[r]?o.base64.decode(e.strings[r],t.strings[r]=o.newBuffer(o.base64.length(e.strings[r])),0):e.strings[r].length>=0&&(t.strings[r]=e.strings[r])}if(e.tensors){if(!Array.isArray(e.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");t.tensors=[];for(var r=0;r<e.tensors.length;++r){if("object"!=typeof e.tensors[r])throw TypeError(".onnx.AttributeProto.tensors: object expected");t.tensors[r]=s.onnx.TensorProto.fromObject(e.tensors[r])}}if(e.graphs){if(!Array.isArray(e.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");t.graphs=[];for(var r=0;r<e.graphs.length;++r){if("object"!=typeof e.graphs[r])throw TypeError(".onnx.AttributeProto.graphs: object expected");t.graphs[r]=s.onnx.GraphProto.fromObject(e.graphs[r])}}if(e.sparseTensors){if(!Array.isArray(e.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");t.sparseTensors=[];for(var r=0;r<e.sparseTensors.length;++r){if("object"!=typeof e.sparseTensors[r])throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");t.sparseTensors[r]=s.onnx.SparseTensorProto.fromObject(e.sparseTensors[r])}}if(e.typeProtos){if(!Array.isArray(e.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");t.typeProtos=[];for(var r=0;r<e.typeProtos.length;++r){if("object"!=typeof e.typeProtos[r])throw TypeError(".onnx.AttributeProto.typeProtos: object expected");t.typeProtos[r]=s.onnx.TypeProto.fromObject(e.typeProtos[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.floats=[],r.ints=[],r.strings=[],r.tensors=[],r.graphs=[],r.typeProtos=[],r.sparseTensors=[]),t.defaults){if(r.name="",r.f=0,o.Long){var n=new o.Long(0,0,!1);r.i=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.i=t.longs===String?"0":0;t.bytes===String?r.s="":(r.s=[],t.bytes!==Array&&(r.s=o.newBuffer(r.s))),r.t=null,r.g=null,r.docString="",r.tp=null,r.type=t.enums===String?"UNDEFINED":0,r.refAttrName="",r.sparseTensor=null}if(null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),null!=e.f&&e.hasOwnProperty("f")&&(r.f=t.json&&!isFinite(e.f)?String(e.f):e.f),null!=e.i&&e.hasOwnProperty("i")&&("number"==typeof e.i?r.i=t.longs===String?String(e.i):e.i:r.i=t.longs===String?o.Long.prototype.toString.call(e.i):t.longs===Number?new o.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber():e.i),null!=e.s&&e.hasOwnProperty("s")&&(r.s=t.bytes===String?o.base64.encode(e.s,0,e.s.length):t.bytes===Array?Array.prototype.slice.call(e.s):e.s),null!=e.t&&e.hasOwnProperty("t")&&(r.t=s.onnx.TensorProto.toObject(e.t,t)),null!=e.g&&e.hasOwnProperty("g")&&(r.g=s.onnx.GraphProto.toObject(e.g,t)),e.floats&&e.floats.length){r.floats=[];for(var i=0;i<e.floats.length;++i)r.floats[i]=t.json&&!isFinite(e.floats[i])?String(e.floats[i]):e.floats[i]}if(e.ints&&e.ints.length){r.ints=[];for(var i=0;i<e.ints.length;++i)"number"==typeof e.ints[i]?r.ints[i]=t.longs===String?String(e.ints[i]):e.ints[i]:r.ints[i]=t.longs===String?o.Long.prototype.toString.call(e.ints[i]):t.longs===Number?new o.LongBits(e.ints[i].low>>>0,e.ints[i].high>>>0).toNumber():e.ints[i]}if(e.strings&&e.strings.length){r.strings=[];for(var i=0;i<e.strings.length;++i)r.strings[i]=t.bytes===String?o.base64.encode(e.strings[i],0,e.strings[i].length):t.bytes===Array?Array.prototype.slice.call(e.strings[i]):e.strings[i]}if(e.tensors&&e.tensors.length){r.tensors=[];for(var i=0;i<e.tensors.length;++i)r.tensors[i]=s.onnx.TensorProto.toObject(e.tensors[i],t)}if(e.graphs&&e.graphs.length){r.graphs=[];for(var i=0;i<e.graphs.length;++i)r.graphs[i]=s.onnx.GraphProto.toObject(e.graphs[i],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),null!=e.tp&&e.hasOwnProperty("tp")&&(r.tp=s.onnx.TypeProto.toObject(e.tp,t)),e.typeProtos&&e.typeProtos.length){r.typeProtos=[];for(var i=0;i<e.typeProtos.length;++i)r.typeProtos[i]=s.onnx.TypeProto.toObject(e.typeProtos[i],t)}if(null!=e.type&&e.hasOwnProperty("type")&&(r.type=t.enums===String?void 0===s.onnx.AttributeProto.AttributeType[e.type]?e.type:s.onnx.AttributeProto.AttributeType[e.type]:e.type),null!=e.refAttrName&&e.hasOwnProperty("refAttrName")&&(r.refAttrName=e.refAttrName),null!=e.sparseTensor&&e.hasOwnProperty("sparseTensor")&&(r.sparseTensor=s.onnx.SparseTensorProto.toObject(e.sparseTensor,t)),e.sparseTensors&&e.sparseTensors.length){r.sparseTensors=[];for(var i=0;i<e.sparseTensors.length;++i)r.sparseTensors[i]=s.onnx.SparseTensorProto.toObject(e.sparseTensors[i],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.AttributeProto"},e.AttributeType=function(){var e={},t=Object.create(e);return t[e[0]="UNDEFINED"]=0,t[e[1]="FLOAT"]=1,t[e[2]="INT"]=2,t[e[3]="STRING"]=3,t[e[4]="TENSOR"]=4,t[e[5]="GRAPH"]=5,t[e[11]="SPARSE_TENSOR"]=11,t[e[13]="TYPE_PROTO"]=13,t[e[6]="FLOATS"]=6,t[e[7]="INTS"]=7,t[e[8]="STRINGS"]=8,t[e[9]="TENSORS"]=9,t[e[10]="GRAPHS"]=10,t[e[12]="SPARSE_TENSORS"]=12,t[e[14]="TYPE_PROTOS"]=14,t}(),e}(),e.ValueInfoProto=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=i.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.type&&Object.hasOwnProperty.call(e,"type")&&s.onnx.TypeProto.encode(e.type,t.uint32(18).fork()).ldelim(),null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(26).string(e.docString),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.ValueInfoProto;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.name=e.string();break;case 2:i.type=s.onnx.TypeProto.decode(e,e.uint32());break;case 3:i.docString=e.string();break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!o.isString(e.name))return"name: string expected";if(null!=e.type&&e.hasOwnProperty("type")){var t=s.onnx.TypeProto.verify(e.type);if(t)return"type."+t}return null!=e.docString&&e.hasOwnProperty("docString")&&!o.isString(e.docString)?"docString: string expected":null},e.fromObject=function(e){if(e instanceof s.onnx.ValueInfoProto)return e;var t=new s.onnx.ValueInfoProto;if(null!=e.name&&(t.name=String(e.name)),null!=e.type){if("object"!=typeof e.type)throw TypeError(".onnx.ValueInfoProto.type: object expected");t.type=s.onnx.TypeProto.fromObject(e.type)}return null!=e.docString&&(t.docString=String(e.docString)),t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.name="",r.type=null,r.docString=""),null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),null!=e.type&&e.hasOwnProperty("type")&&(r.type=s.onnx.TypeProto.toObject(e.type,t)),null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.ValueInfoProto"},e}(),e.NodeProto=function(){function e(e){if(this.input=[],this.output=[],this.attribute=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.input=o.emptyArray,e.prototype.output=o.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=o.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=i.create()),null!=e.input&&e.input.length)for(var r=0;r<e.input.length;++r)t.uint32(10).string(e.input[r]);if(null!=e.output&&e.output.length)for(var r=0;r<e.output.length;++r)t.uint32(18).string(e.output[r]);if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(26).string(e.name),null!=e.opType&&Object.hasOwnProperty.call(e,"opType")&&t.uint32(34).string(e.opType),null!=e.attribute&&e.attribute.length)for(var r=0;r<e.attribute.length;++r)s.onnx.AttributeProto.encode(e.attribute[r],t.uint32(42).fork()).ldelim();return null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(50).string(e.docString),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(58).string(e.domain),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.NodeProto;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.input&&i.input.length||(i.input=[]),i.input.push(e.string());break;case 2:i.output&&i.output.length||(i.output=[]),i.output.push(e.string());break;case 3:i.name=e.string();break;case 4:i.opType=e.string();break;case 7:i.domain=e.string();break;case 5:i.attribute&&i.attribute.length||(i.attribute=[]),i.attribute.push(s.onnx.AttributeProto.decode(e,e.uint32()));break;case 6:i.docString=e.string();break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t)if(!o.isString(e.input[t]))return"input: string[] expected"}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t)if(!o.isString(e.output[t]))return"output: string[] expected"}if(null!=e.name&&e.hasOwnProperty("name")&&!o.isString(e.name))return"name: string expected";if(null!=e.opType&&e.hasOwnProperty("opType")&&!o.isString(e.opType))return"opType: string expected";if(null!=e.domain&&e.hasOwnProperty("domain")&&!o.isString(e.domain))return"domain: string expected";if(null!=e.attribute&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var t=0;t<e.attribute.length;++t){var r=s.onnx.AttributeProto.verify(e.attribute[t]);if(r)return"attribute."+r}}return null!=e.docString&&e.hasOwnProperty("docString")&&!o.isString(e.docString)?"docString: string expected":null},e.fromObject=function(e){if(e instanceof s.onnx.NodeProto)return e;var t=new s.onnx.NodeProto;if(e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.NodeProto.input: array expected");t.input=[];for(var r=0;r<e.input.length;++r)t.input[r]=String(e.input[r])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.NodeProto.output: array expected");t.output=[];for(var r=0;r<e.output.length;++r)t.output[r]=String(e.output[r])}if(null!=e.name&&(t.name=String(e.name)),null!=e.opType&&(t.opType=String(e.opType)),null!=e.domain&&(t.domain=String(e.domain)),e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");t.attribute=[];for(var r=0;r<e.attribute.length;++r){if("object"!=typeof e.attribute[r])throw TypeError(".onnx.NodeProto.attribute: object expected");t.attribute[r]=s.onnx.AttributeProto.fromObject(e.attribute[r])}}return null!=e.docString&&(t.docString=String(e.docString)),t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.input=[],r.output=[],r.attribute=[]),t.defaults&&(r.name="",r.opType="",r.docString="",r.domain=""),e.input&&e.input.length){r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=e.input[n]}if(e.output&&e.output.length){r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=e.output[n]}if(null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),null!=e.opType&&e.hasOwnProperty("opType")&&(r.opType=e.opType),e.attribute&&e.attribute.length){r.attribute=[];for(var n=0;n<e.attribute.length;++n)r.attribute[n]=s.onnx.AttributeProto.toObject(e.attribute[n],t)}return null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),null!=e.domain&&e.hasOwnProperty("domain")&&(r.domain=e.domain),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.NodeProto"},e}(),e.TrainingInfoProto=function(){function e(e){if(this.initializationBinding=[],this.updateBinding=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=o.emptyArray,e.prototype.updateBinding=o.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=i.create()),null!=e.initialization&&Object.hasOwnProperty.call(e,"initialization")&&s.onnx.GraphProto.encode(e.initialization,t.uint32(10).fork()).ldelim(),null!=e.algorithm&&Object.hasOwnProperty.call(e,"algorithm")&&s.onnx.GraphProto.encode(e.algorithm,t.uint32(18).fork()).ldelim(),null!=e.initializationBinding&&e.initializationBinding.length)for(var r=0;r<e.initializationBinding.length;++r)s.onnx.StringStringEntryProto.encode(e.initializationBinding[r],t.uint32(26).fork()).ldelim();if(null!=e.updateBinding&&e.updateBinding.length)for(var r=0;r<e.updateBinding.length;++r)s.onnx.StringStringEntryProto.encode(e.updateBinding[r],t.uint32(34).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.TrainingInfoProto;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.initialization=s.onnx.GraphProto.decode(e,e.uint32());break;case 2:i.algorithm=s.onnx.GraphProto.decode(e,e.uint32());break;case 3:i.initializationBinding&&i.initializationBinding.length||(i.initializationBinding=[]),i.initializationBinding.push(s.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 4:i.updateBinding&&i.updateBinding.length||(i.updateBinding=[]),i.updateBinding.push(s.onnx.StringStringEntryProto.decode(e,e.uint32()));break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.initialization&&e.hasOwnProperty("initialization")){var t=s.onnx.GraphProto.verify(e.initialization);if(t)return"initialization."+t}if(null!=e.algorithm&&e.hasOwnProperty("algorithm")){var t=s.onnx.GraphProto.verify(e.algorithm);if(t)return"algorithm."+t}if(null!=e.initializationBinding&&e.hasOwnProperty("initializationBinding")){if(!Array.isArray(e.initializationBinding))return"initializationBinding: array expected";for(var r=0;r<e.initializationBinding.length;++r){var t=s.onnx.StringStringEntryProto.verify(e.initializationBinding[r]);if(t)return"initializationBinding."+t}}if(null!=e.updateBinding&&e.hasOwnProperty("updateBinding")){if(!Array.isArray(e.updateBinding))return"updateBinding: array expected";for(var r=0;r<e.updateBinding.length;++r){var t=s.onnx.StringStringEntryProto.verify(e.updateBinding[r]);if(t)return"updateBinding."+t}}return null},e.fromObject=function(e){if(e instanceof s.onnx.TrainingInfoProto)return e;var t=new s.onnx.TrainingInfoProto;if(null!=e.initialization){if("object"!=typeof e.initialization)throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");t.initialization=s.onnx.GraphProto.fromObject(e.initialization)}if(null!=e.algorithm){if("object"!=typeof e.algorithm)throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");t.algorithm=s.onnx.GraphProto.fromObject(e.algorithm)}if(e.initializationBinding){if(!Array.isArray(e.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");t.initializationBinding=[];for(var r=0;r<e.initializationBinding.length;++r){if("object"!=typeof e.initializationBinding[r])throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");t.initializationBinding[r]=s.onnx.StringStringEntryProto.fromObject(e.initializationBinding[r])}}if(e.updateBinding){if(!Array.isArray(e.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");t.updateBinding=[];for(var r=0;r<e.updateBinding.length;++r){if("object"!=typeof e.updateBinding[r])throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");t.updateBinding[r]=s.onnx.StringStringEntryProto.fromObject(e.updateBinding[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.initializationBinding=[],r.updateBinding=[]),t.defaults&&(r.initialization=null,r.algorithm=null),null!=e.initialization&&e.hasOwnProperty("initialization")&&(r.initialization=s.onnx.GraphProto.toObject(e.initialization,t)),null!=e.algorithm&&e.hasOwnProperty("algorithm")&&(r.algorithm=s.onnx.GraphProto.toObject(e.algorithm,t)),e.initializationBinding&&e.initializationBinding.length){r.initializationBinding=[];for(var n=0;n<e.initializationBinding.length;++n)r.initializationBinding[n]=s.onnx.StringStringEntryProto.toObject(e.initializationBinding[n],t)}if(e.updateBinding&&e.updateBinding.length){r.updateBinding=[];for(var n=0;n<e.updateBinding.length;++n)r.updateBinding[n]=s.onnx.StringStringEntryProto.toObject(e.updateBinding[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TrainingInfoProto"},e}(),e.ModelProto=function(){function e(e){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.irVersion=o.Long?o.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=o.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=o.Long?o.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=o.emptyArray,e.prototype.trainingInfo=o.emptyArray,e.prototype.functions=o.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=i.create()),null!=e.irVersion&&Object.hasOwnProperty.call(e,"irVersion")&&t.uint32(8).int64(e.irVersion),null!=e.producerName&&Object.hasOwnProperty.call(e,"producerName")&&t.uint32(18).string(e.producerName),null!=e.producerVersion&&Object.hasOwnProperty.call(e,"producerVersion")&&t.uint32(26).string(e.producerVersion),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(34).string(e.domain),null!=e.modelVersion&&Object.hasOwnProperty.call(e,"modelVersion")&&t.uint32(40).int64(e.modelVersion),null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(50).string(e.docString),null!=e.graph&&Object.hasOwnProperty.call(e,"graph")&&s.onnx.GraphProto.encode(e.graph,t.uint32(58).fork()).ldelim(),null!=e.opsetImport&&e.opsetImport.length)for(var r=0;r<e.opsetImport.length;++r)s.onnx.OperatorSetIdProto.encode(e.opsetImport[r],t.uint32(66).fork()).ldelim();if(null!=e.metadataProps&&e.metadataProps.length)for(var r=0;r<e.metadataProps.length;++r)s.onnx.StringStringEntryProto.encode(e.metadataProps[r],t.uint32(114).fork()).ldelim();if(null!=e.trainingInfo&&e.trainingInfo.length)for(var r=0;r<e.trainingInfo.length;++r)s.onnx.TrainingInfoProto.encode(e.trainingInfo[r],t.uint32(162).fork()).ldelim();if(null!=e.functions&&e.functions.length)for(var r=0;r<e.functions.length;++r)s.onnx.FunctionProto.encode(e.functions[r],t.uint32(202).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.ModelProto;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.irVersion=e.int64();break;case 8:i.opsetImport&&i.opsetImport.length||(i.opsetImport=[]),i.opsetImport.push(s.onnx.OperatorSetIdProto.decode(e,e.uint32()));break;case 2:i.producerName=e.string();break;case 3:i.producerVersion=e.string();break;case 4:i.domain=e.string();break;case 5:i.modelVersion=e.int64();break;case 6:i.docString=e.string();break;case 7:i.graph=s.onnx.GraphProto.decode(e,e.uint32());break;case 14:i.metadataProps&&i.metadataProps.length||(i.metadataProps=[]),i.metadataProps.push(s.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 20:i.trainingInfo&&i.trainingInfo.length||(i.trainingInfo=[]),i.trainingInfo.push(s.onnx.TrainingInfoProto.decode(e,e.uint32()));break;case 25:i.functions&&i.functions.length||(i.functions=[]),i.functions.push(s.onnx.FunctionProto.decode(e,e.uint32()));break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.irVersion&&e.hasOwnProperty("irVersion")&&!o.isInteger(e.irVersion)&&!(e.irVersion&&o.isInteger(e.irVersion.low)&&o.isInteger(e.irVersion.high)))return"irVersion: integer|Long expected";if(null!=e.opsetImport&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var t=0;t<e.opsetImport.length;++t){var r=s.onnx.OperatorSetIdProto.verify(e.opsetImport[t]);if(r)return"opsetImport."+r}}if(null!=e.producerName&&e.hasOwnProperty("producerName")&&!o.isString(e.producerName))return"producerName: string expected";if(null!=e.producerVersion&&e.hasOwnProperty("producerVersion")&&!o.isString(e.producerVersion))return"producerVersion: string expected";if(null!=e.domain&&e.hasOwnProperty("domain")&&!o.isString(e.domain))return"domain: string expected";if(null!=e.modelVersion&&e.hasOwnProperty("modelVersion")&&!o.isInteger(e.modelVersion)&&!(e.modelVersion&&o.isInteger(e.modelVersion.low)&&o.isInteger(e.modelVersion.high)))return"modelVersion: integer|Long expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!o.isString(e.docString))return"docString: string expected";if(null!=e.graph&&e.hasOwnProperty("graph")){var r=s.onnx.GraphProto.verify(e.graph);if(r)return"graph."+r}if(null!=e.metadataProps&&e.hasOwnProperty("metadataProps")){if(!Array.isArray(e.metadataProps))return"metadataProps: array expected";for(var t=0;t<e.metadataProps.length;++t){var r=s.onnx.StringStringEntryProto.verify(e.metadataProps[t]);if(r)return"metadataProps."+r}}if(null!=e.trainingInfo&&e.hasOwnProperty("trainingInfo")){if(!Array.isArray(e.trainingInfo))return"trainingInfo: array expected";for(var t=0;t<e.trainingInfo.length;++t){var r=s.onnx.TrainingInfoProto.verify(e.trainingInfo[t]);if(r)return"trainingInfo."+r}}if(null!=e.functions&&e.hasOwnProperty("functions")){if(!Array.isArray(e.functions))return"functions: array expected";for(var t=0;t<e.functions.length;++t){var r=s.onnx.FunctionProto.verify(e.functions[t]);if(r)return"functions."+r}}return null},e.fromObject=function(e){if(e instanceof s.onnx.ModelProto)return e;var t=new s.onnx.ModelProto;if(null!=e.irVersion&&(o.Long?(t.irVersion=o.Long.fromValue(e.irVersion)).unsigned=!1:"string"==typeof e.irVersion?t.irVersion=parseInt(e.irVersion,10):"number"==typeof e.irVersion?t.irVersion=e.irVersion:"object"==typeof e.irVersion&&(t.irVersion=new o.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber())),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");t.opsetImport=[];for(var r=0;r<e.opsetImport.length;++r){if("object"!=typeof e.opsetImport[r])throw TypeError(".onnx.ModelProto.opsetImport: object expected");t.opsetImport[r]=s.onnx.OperatorSetIdProto.fromObject(e.opsetImport[r])}}if(null!=e.producerName&&(t.producerName=String(e.producerName)),null!=e.producerVersion&&(t.producerVersion=String(e.producerVersion)),null!=e.domain&&(t.domain=String(e.domain)),null!=e.modelVersion&&(o.Long?(t.modelVersion=o.Long.fromValue(e.modelVersion)).unsigned=!1:"string"==typeof e.modelVersion?t.modelVersion=parseInt(e.modelVersion,10):"number"==typeof e.modelVersion?t.modelVersion=e.modelVersion:"object"==typeof e.modelVersion&&(t.modelVersion=new o.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber())),null!=e.docString&&(t.docString=String(e.docString)),null!=e.graph){if("object"!=typeof e.graph)throw TypeError(".onnx.ModelProto.graph: object expected");t.graph=s.onnx.GraphProto.fromObject(e.graph)}if(e.metadataProps){if(!Array.isArray(e.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");t.metadataProps=[];for(var r=0;r<e.metadataProps.length;++r){if("object"!=typeof e.metadataProps[r])throw TypeError(".onnx.ModelProto.metadataProps: object expected");t.metadataProps[r]=s.onnx.StringStringEntryProto.fromObject(e.metadataProps[r])}}if(e.trainingInfo){if(!Array.isArray(e.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");t.trainingInfo=[];for(var r=0;r<e.trainingInfo.length;++r){if("object"!=typeof e.trainingInfo[r])throw TypeError(".onnx.ModelProto.trainingInfo: object expected");t.trainingInfo[r]=s.onnx.TrainingInfoProto.fromObject(e.trainingInfo[r])}}if(e.functions){if(!Array.isArray(e.functions))throw TypeError(".onnx.ModelProto.functions: array expected");t.functions=[];for(var r=0;r<e.functions.length;++r){if("object"!=typeof e.functions[r])throw TypeError(".onnx.ModelProto.functions: object expected");t.functions[r]=s.onnx.FunctionProto.fromObject(e.functions[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.opsetImport=[],r.metadataProps=[],r.trainingInfo=[],r.functions=[]),t.defaults){if(o.Long){var n=new o.Long(0,0,!1);r.irVersion=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.irVersion=t.longs===String?"0":0;if(r.producerName="",r.producerVersion="",r.domain="",o.Long){var n=new o.Long(0,0,!1);r.modelVersion=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.modelVersion=t.longs===String?"0":0;r.docString="",r.graph=null}if(null!=e.irVersion&&e.hasOwnProperty("irVersion")&&("number"==typeof e.irVersion?r.irVersion=t.longs===String?String(e.irVersion):e.irVersion:r.irVersion=t.longs===String?o.Long.prototype.toString.call(e.irVersion):t.longs===Number?new o.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber():e.irVersion),null!=e.producerName&&e.hasOwnProperty("producerName")&&(r.producerName=e.producerName),null!=e.producerVersion&&e.hasOwnProperty("producerVersion")&&(r.producerVersion=e.producerVersion),null!=e.domain&&e.hasOwnProperty("domain")&&(r.domain=e.domain),null!=e.modelVersion&&e.hasOwnProperty("modelVersion")&&("number"==typeof e.modelVersion?r.modelVersion=t.longs===String?String(e.modelVersion):e.modelVersion:r.modelVersion=t.longs===String?o.Long.prototype.toString.call(e.modelVersion):t.longs===Number?new o.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber():e.modelVersion),null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),null!=e.graph&&e.hasOwnProperty("graph")&&(r.graph=s.onnx.GraphProto.toObject(e.graph,t)),e.opsetImport&&e.opsetImport.length){r.opsetImport=[];for(var i=0;i<e.opsetImport.length;++i)r.opsetImport[i]=s.onnx.OperatorSetIdProto.toObject(e.opsetImport[i],t)}if(e.metadataProps&&e.metadataProps.length){r.metadataProps=[];for(var i=0;i<e.metadataProps.length;++i)r.metadataProps[i]=s.onnx.StringStringEntryProto.toObject(e.metadataProps[i],t)}if(e.trainingInfo&&e.trainingInfo.length){r.trainingInfo=[];for(var i=0;i<e.trainingInfo.length;++i)r.trainingInfo[i]=s.onnx.TrainingInfoProto.toObject(e.trainingInfo[i],t)}if(e.functions&&e.functions.length){r.functions=[];for(var i=0;i<e.functions.length;++i)r.functions[i]=s.onnx.FunctionProto.toObject(e.functions[i],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.ModelProto"},e}(),e.StringStringEntryProto=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=i.create()),null!=e.key&&Object.hasOwnProperty.call(e,"key")&&t.uint32(10).string(e.key),null!=e.value&&Object.hasOwnProperty.call(e,"value")&&t.uint32(18).string(e.value),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.StringStringEntryProto;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.key=e.string();break;case 2:i.value=e.string();break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.key&&e.hasOwnProperty("key")&&!o.isString(e.key)?"key: string expected":null!=e.value&&e.hasOwnProperty("value")&&!o.isString(e.value)?"value: string expected":null},e.fromObject=function(e){if(e instanceof s.onnx.StringStringEntryProto)return e;var t=new s.onnx.StringStringEntryProto;return null!=e.key&&(t.key=String(e.key)),null!=e.value&&(t.value=String(e.value)),t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.key="",r.value=""),null!=e.key&&e.hasOwnProperty("key")&&(r.key=e.key),null!=e.value&&e.hasOwnProperty("value")&&(r.value=e.value),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.StringStringEntryProto"},e}(),e.TensorAnnotation=function(){function e(e){if(this.quantParameterTensorNames=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=o.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=i.create()),null!=e.tensorName&&Object.hasOwnProperty.call(e,"tensorName")&&t.uint32(10).string(e.tensorName),null!=e.quantParameterTensorNames&&e.quantParameterTensorNames.length)for(var r=0;r<e.quantParameterTensorNames.length;++r)s.onnx.StringStringEntryProto.encode(e.quantParameterTensorNames[r],t.uint32(18).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.TensorAnnotation;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.tensorName=e.string();break;case 2:i.quantParameterTensorNames&&i.quantParameterTensorNames.length||(i.quantParameterTensorNames=[]),i.quantParameterTensorNames.push(s.onnx.StringStringEntryProto.decode(e,e.uint32()));break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.tensorName&&e.hasOwnProperty("tensorName")&&!o.isString(e.tensorName))return"tensorName: string expected";if(null!=e.quantParameterTensorNames&&e.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(e.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var t=0;t<e.quantParameterTensorNames.length;++t){var r=s.onnx.StringStringEntryProto.verify(e.quantParameterTensorNames[t]);if(r)return"quantParameterTensorNames."+r}}return null},e.fromObject=function(e){if(e instanceof s.onnx.TensorAnnotation)return e;var t=new s.onnx.TensorAnnotation;if(null!=e.tensorName&&(t.tensorName=String(e.tensorName)),e.quantParameterTensorNames){if(!Array.isArray(e.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");t.quantParameterTensorNames=[];for(var r=0;r<e.quantParameterTensorNames.length;++r){if("object"!=typeof e.quantParameterTensorNames[r])throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");t.quantParameterTensorNames[r]=s.onnx.StringStringEntryProto.fromObject(e.quantParameterTensorNames[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.quantParameterTensorNames=[]),t.defaults&&(r.tensorName=""),null!=e.tensorName&&e.hasOwnProperty("tensorName")&&(r.tensorName=e.tensorName),e.quantParameterTensorNames&&e.quantParameterTensorNames.length){r.quantParameterTensorNames=[];for(var n=0;n<e.quantParameterTensorNames.length;++n)r.quantParameterTensorNames[n]=s.onnx.StringStringEntryProto.toObject(e.quantParameterTensorNames[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorAnnotation"},e}(),e.GraphProto=function(){function e(e){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.node=o.emptyArray,e.prototype.name="",e.prototype.initializer=o.emptyArray,e.prototype.sparseInitializer=o.emptyArray,e.prototype.docString="",e.prototype.input=o.emptyArray,e.prototype.output=o.emptyArray,e.prototype.valueInfo=o.emptyArray,e.prototype.quantizationAnnotation=o.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=i.create()),null!=e.node&&e.node.length)for(var r=0;r<e.node.length;++r)s.onnx.NodeProto.encode(e.node[r],t.uint32(10).fork()).ldelim();if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(18).string(e.name),null!=e.initializer&&e.initializer.length)for(var r=0;r<e.initializer.length;++r)s.onnx.TensorProto.encode(e.initializer[r],t.uint32(42).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(82).string(e.docString),null!=e.input&&e.input.length)for(var r=0;r<e.input.length;++r)s.onnx.ValueInfoProto.encode(e.input[r],t.uint32(90).fork()).ldelim();if(null!=e.output&&e.output.length)for(var r=0;r<e.output.length;++r)s.onnx.ValueInfoProto.encode(e.output[r],t.uint32(98).fork()).ldelim();if(null!=e.valueInfo&&e.valueInfo.length)for(var r=0;r<e.valueInfo.length;++r)s.onnx.ValueInfoProto.encode(e.valueInfo[r],t.uint32(106).fork()).ldelim();if(null!=e.quantizationAnnotation&&e.quantizationAnnotation.length)for(var r=0;r<e.quantizationAnnotation.length;++r)s.onnx.TensorAnnotation.encode(e.quantizationAnnotation[r],t.uint32(114).fork()).ldelim();if(null!=e.sparseInitializer&&e.sparseInitializer.length)for(var r=0;r<e.sparseInitializer.length;++r)s.onnx.SparseTensorProto.encode(e.sparseInitializer[r],t.uint32(122).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.GraphProto;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.node&&i.node.length||(i.node=[]),i.node.push(s.onnx.NodeProto.decode(e,e.uint32()));break;case 2:i.name=e.string();break;case 5:i.initializer&&i.initializer.length||(i.initializer=[]),i.initializer.push(s.onnx.TensorProto.decode(e,e.uint32()));break;case 15:i.sparseInitializer&&i.sparseInitializer.length||(i.sparseInitializer=[]),i.sparseInitializer.push(s.onnx.SparseTensorProto.decode(e,e.uint32()));break;case 10:i.docString=e.string();break;case 11:i.input&&i.input.length||(i.input=[]),i.input.push(s.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 12:i.output&&i.output.length||(i.output=[]),i.output.push(s.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 13:i.valueInfo&&i.valueInfo.length||(i.valueInfo=[]),i.valueInfo.push(s.onnx.ValueInfoProto.decode(e,e.uint32()));break;case 14:i.quantizationAnnotation&&i.quantizationAnnotation.length||(i.quantizationAnnotation=[]),i.quantizationAnnotation.push(s.onnx.TensorAnnotation.decode(e,e.uint32()));break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.node&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var t=0;t<e.node.length;++t){var r=s.onnx.NodeProto.verify(e.node[t]);if(r)return"node."+r}}if(null!=e.name&&e.hasOwnProperty("name")&&!o.isString(e.name))return"name: string expected";if(null!=e.initializer&&e.hasOwnProperty("initializer")){if(!Array.isArray(e.initializer))return"initializer: array expected";for(var t=0;t<e.initializer.length;++t){var r=s.onnx.TensorProto.verify(e.initializer[t]);if(r)return"initializer."+r}}if(null!=e.sparseInitializer&&e.hasOwnProperty("sparseInitializer")){if(!Array.isArray(e.sparseInitializer))return"sparseInitializer: array expected";for(var t=0;t<e.sparseInitializer.length;++t){var r=s.onnx.SparseTensorProto.verify(e.sparseInitializer[t]);if(r)return"sparseInitializer."+r}}if(null!=e.docString&&e.hasOwnProperty("docString")&&!o.isString(e.docString))return"docString: string expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t){var r=s.onnx.ValueInfoProto.verify(e.input[t]);if(r)return"input."+r}}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t){var r=s.onnx.ValueInfoProto.verify(e.output[t]);if(r)return"output."+r}}if(null!=e.valueInfo&&e.hasOwnProperty("valueInfo")){if(!Array.isArray(e.valueInfo))return"valueInfo: array expected";for(var t=0;t<e.valueInfo.length;++t){var r=s.onnx.ValueInfoProto.verify(e.valueInfo[t]);if(r)return"valueInfo."+r}}if(null!=e.quantizationAnnotation&&e.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(e.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var t=0;t<e.quantizationAnnotation.length;++t){var r=s.onnx.TensorAnnotation.verify(e.quantizationAnnotation[t]);if(r)return"quantizationAnnotation."+r}}return null},e.fromObject=function(e){if(e instanceof s.onnx.GraphProto)return e;var t=new s.onnx.GraphProto;if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.GraphProto.node: array expected");t.node=[];for(var r=0;r<e.node.length;++r){if("object"!=typeof e.node[r])throw TypeError(".onnx.GraphProto.node: object expected");t.node[r]=s.onnx.NodeProto.fromObject(e.node[r])}}if(null!=e.name&&(t.name=String(e.name)),e.initializer){if(!Array.isArray(e.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");t.initializer=[];for(var r=0;r<e.initializer.length;++r){if("object"!=typeof e.initializer[r])throw TypeError(".onnx.GraphProto.initializer: object expected");t.initializer[r]=s.onnx.TensorProto.fromObject(e.initializer[r])}}if(e.sparseInitializer){if(!Array.isArray(e.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");t.sparseInitializer=[];for(var r=0;r<e.sparseInitializer.length;++r){if("object"!=typeof e.sparseInitializer[r])throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");t.sparseInitializer[r]=s.onnx.SparseTensorProto.fromObject(e.sparseInitializer[r])}}if(null!=e.docString&&(t.docString=String(e.docString)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.GraphProto.input: array expected");t.input=[];for(var r=0;r<e.input.length;++r){if("object"!=typeof e.input[r])throw TypeError(".onnx.GraphProto.input: object expected");t.input[r]=s.onnx.ValueInfoProto.fromObject(e.input[r])}}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.GraphProto.output: array expected");t.output=[];for(var r=0;r<e.output.length;++r){if("object"!=typeof e.output[r])throw TypeError(".onnx.GraphProto.output: object expected");t.output[r]=s.onnx.ValueInfoProto.fromObject(e.output[r])}}if(e.valueInfo){if(!Array.isArray(e.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");t.valueInfo=[];for(var r=0;r<e.valueInfo.length;++r){if("object"!=typeof e.valueInfo[r])throw TypeError(".onnx.GraphProto.valueInfo: object expected");t.valueInfo[r]=s.onnx.ValueInfoProto.fromObject(e.valueInfo[r])}}if(e.quantizationAnnotation){if(!Array.isArray(e.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");t.quantizationAnnotation=[];for(var r=0;r<e.quantizationAnnotation.length;++r){if("object"!=typeof e.quantizationAnnotation[r])throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");t.quantizationAnnotation[r]=s.onnx.TensorAnnotation.fromObject(e.quantizationAnnotation[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.node=[],r.initializer=[],r.input=[],r.output=[],r.valueInfo=[],r.quantizationAnnotation=[],r.sparseInitializer=[]),t.defaults&&(r.name="",r.docString=""),e.node&&e.node.length){r.node=[];for(var n=0;n<e.node.length;++n)r.node[n]=s.onnx.NodeProto.toObject(e.node[n],t)}if(null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),e.initializer&&e.initializer.length){r.initializer=[];for(var n=0;n<e.initializer.length;++n)r.initializer[n]=s.onnx.TensorProto.toObject(e.initializer[n],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),e.input&&e.input.length){r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=s.onnx.ValueInfoProto.toObject(e.input[n],t)}if(e.output&&e.output.length){r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=s.onnx.ValueInfoProto.toObject(e.output[n],t)}if(e.valueInfo&&e.valueInfo.length){r.valueInfo=[];for(var n=0;n<e.valueInfo.length;++n)r.valueInfo[n]=s.onnx.ValueInfoProto.toObject(e.valueInfo[n],t)}if(e.quantizationAnnotation&&e.quantizationAnnotation.length){r.quantizationAnnotation=[];for(var n=0;n<e.quantizationAnnotation.length;++n)r.quantizationAnnotation[n]=s.onnx.TensorAnnotation.toObject(e.quantizationAnnotation[n],t)}if(e.sparseInitializer&&e.sparseInitializer.length){r.sparseInitializer=[];for(var n=0;n<e.sparseInitializer.length;++n)r.sparseInitializer[n]=s.onnx.SparseTensorProto.toObject(e.sparseInitializer[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.GraphProto"},e}(),e.TensorProto=function(){function e(e){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.dims=o.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=o.emptyArray,e.prototype.int32Data=o.emptyArray,e.prototype.stringData=o.emptyArray,e.prototype.int64Data=o.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=o.newBuffer([]),e.prototype.externalData=o.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=o.emptyArray,e.prototype.uint64Data=o.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=i.create()),null!=e.dims&&e.dims.length){t.uint32(10).fork();for(var r=0;r<e.dims.length;++r)t.int64(e.dims[r]);t.ldelim()}if(null!=e.dataType&&Object.hasOwnProperty.call(e,"dataType")&&t.uint32(16).int32(e.dataType),null!=e.segment&&Object.hasOwnProperty.call(e,"segment")&&s.onnx.TensorProto.Segment.encode(e.segment,t.uint32(26).fork()).ldelim(),null!=e.floatData&&e.floatData.length){t.uint32(34).fork();for(var r=0;r<e.floatData.length;++r)t.float(e.floatData[r]);t.ldelim()}if(null!=e.int32Data&&e.int32Data.length){t.uint32(42).fork();for(var r=0;r<e.int32Data.length;++r)t.int32(e.int32Data[r]);t.ldelim()}if(null!=e.stringData&&e.stringData.length)for(var r=0;r<e.stringData.length;++r)t.uint32(50).bytes(e.stringData[r]);if(null!=e.int64Data&&e.int64Data.length){t.uint32(58).fork();for(var r=0;r<e.int64Data.length;++r)t.int64(e.int64Data[r]);t.ldelim()}if(null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(66).string(e.name),null!=e.rawData&&Object.hasOwnProperty.call(e,"rawData")&&t.uint32(74).bytes(e.rawData),null!=e.doubleData&&e.doubleData.length){t.uint32(82).fork();for(var r=0;r<e.doubleData.length;++r)t.double(e.doubleData[r]);t.ldelim()}if(null!=e.uint64Data&&e.uint64Data.length){t.uint32(90).fork();for(var r=0;r<e.uint64Data.length;++r)t.uint64(e.uint64Data[r]);t.ldelim()}if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(98).string(e.docString),null!=e.externalData&&e.externalData.length)for(var r=0;r<e.externalData.length;++r)s.onnx.StringStringEntryProto.encode(e.externalData[r],t.uint32(106).fork()).ldelim();return null!=e.dataLocation&&Object.hasOwnProperty.call(e,"dataLocation")&&t.uint32(112).int32(e.dataLocation),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.TensorProto;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:if(i.dims&&i.dims.length||(i.dims=[]),(7&o)==2)for(var a=e.uint32()+e.pos;e.pos<a;)i.dims.push(e.int64());else i.dims.push(e.int64());break;case 2:i.dataType=e.int32();break;case 3:i.segment=s.onnx.TensorProto.Segment.decode(e,e.uint32());break;case 4:if(i.floatData&&i.floatData.length||(i.floatData=[]),(7&o)==2)for(var a=e.uint32()+e.pos;e.pos<a;)i.floatData.push(e.float());else i.floatData.push(e.float());break;case 5:if(i.int32Data&&i.int32Data.length||(i.int32Data=[]),(7&o)==2)for(var a=e.uint32()+e.pos;e.pos<a;)i.int32Data.push(e.int32());else i.int32Data.push(e.int32());break;case 6:i.stringData&&i.stringData.length||(i.stringData=[]),i.stringData.push(e.bytes());break;case 7:if(i.int64Data&&i.int64Data.length||(i.int64Data=[]),(7&o)==2)for(var a=e.uint32()+e.pos;e.pos<a;)i.int64Data.push(e.int64());else i.int64Data.push(e.int64());break;case 8:i.name=e.string();break;case 12:i.docString=e.string();break;case 9:i.rawData=e.bytes();break;case 13:i.externalData&&i.externalData.length||(i.externalData=[]),i.externalData.push(s.onnx.StringStringEntryProto.decode(e,e.uint32()));break;case 14:i.dataLocation=e.int32();break;case 10:if(i.doubleData&&i.doubleData.length||(i.doubleData=[]),(7&o)==2)for(var a=e.uint32()+e.pos;e.pos<a;)i.doubleData.push(e.double());else i.doubleData.push(e.double());break;case 11:if(i.uint64Data&&i.uint64Data.length||(i.uint64Data=[]),(7&o)==2)for(var a=e.uint32()+e.pos;e.pos<a;)i.uint64Data.push(e.uint64());else i.uint64Data.push(e.uint64());break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.dims&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var t=0;t<e.dims.length;++t)if(!o.isInteger(e.dims[t])&&!(e.dims[t]&&o.isInteger(e.dims[t].low)&&o.isInteger(e.dims[t].high)))return"dims: integer|Long[] expected"}if(null!=e.dataType&&e.hasOwnProperty("dataType")&&!o.isInteger(e.dataType))return"dataType: integer expected";if(null!=e.segment&&e.hasOwnProperty("segment")){var r=s.onnx.TensorProto.Segment.verify(e.segment);if(r)return"segment."+r}if(null!=e.floatData&&e.hasOwnProperty("floatData")){if(!Array.isArray(e.floatData))return"floatData: array expected";for(var t=0;t<e.floatData.length;++t)if("number"!=typeof e.floatData[t])return"floatData: number[] expected"}if(null!=e.int32Data&&e.hasOwnProperty("int32Data")){if(!Array.isArray(e.int32Data))return"int32Data: array expected";for(var t=0;t<e.int32Data.length;++t)if(!o.isInteger(e.int32Data[t]))return"int32Data: integer[] expected"}if(null!=e.stringData&&e.hasOwnProperty("stringData")){if(!Array.isArray(e.stringData))return"stringData: array expected";for(var t=0;t<e.stringData.length;++t)if(!(e.stringData[t]&&"number"==typeof e.stringData[t].length||o.isString(e.stringData[t])))return"stringData: buffer[] expected"}if(null!=e.int64Data&&e.hasOwnProperty("int64Data")){if(!Array.isArray(e.int64Data))return"int64Data: array expected";for(var t=0;t<e.int64Data.length;++t)if(!o.isInteger(e.int64Data[t])&&!(e.int64Data[t]&&o.isInteger(e.int64Data[t].low)&&o.isInteger(e.int64Data[t].high)))return"int64Data: integer|Long[] expected"}if(null!=e.name&&e.hasOwnProperty("name")&&!o.isString(e.name))return"name: string expected";if(null!=e.docString&&e.hasOwnProperty("docString")&&!o.isString(e.docString))return"docString: string expected";if(null!=e.rawData&&e.hasOwnProperty("rawData")&&!(e.rawData&&"number"==typeof e.rawData.length||o.isString(e.rawData)))return"rawData: buffer expected";if(null!=e.externalData&&e.hasOwnProperty("externalData")){if(!Array.isArray(e.externalData))return"externalData: array expected";for(var t=0;t<e.externalData.length;++t){var r=s.onnx.StringStringEntryProto.verify(e.externalData[t]);if(r)return"externalData."+r}}if(null!=e.dataLocation&&e.hasOwnProperty("dataLocation"))switch(e.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:}if(null!=e.doubleData&&e.hasOwnProperty("doubleData")){if(!Array.isArray(e.doubleData))return"doubleData: array expected";for(var t=0;t<e.doubleData.length;++t)if("number"!=typeof e.doubleData[t])return"doubleData: number[] expected"}if(null!=e.uint64Data&&e.hasOwnProperty("uint64Data")){if(!Array.isArray(e.uint64Data))return"uint64Data: array expected";for(var t=0;t<e.uint64Data.length;++t)if(!o.isInteger(e.uint64Data[t])&&!(e.uint64Data[t]&&o.isInteger(e.uint64Data[t].low)&&o.isInteger(e.uint64Data[t].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(e){if(e instanceof s.onnx.TensorProto)return e;var t=new s.onnx.TensorProto;if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.TensorProto.dims: array expected");t.dims=[];for(var r=0;r<e.dims.length;++r)o.Long?(t.dims[r]=o.Long.fromValue(e.dims[r])).unsigned=!1:"string"==typeof e.dims[r]?t.dims[r]=parseInt(e.dims[r],10):"number"==typeof e.dims[r]?t.dims[r]=e.dims[r]:"object"==typeof e.dims[r]&&(t.dims[r]=new o.LongBits(e.dims[r].low>>>0,e.dims[r].high>>>0).toNumber())}if(null!=e.dataType&&(t.dataType=0|e.dataType),null!=e.segment){if("object"!=typeof e.segment)throw TypeError(".onnx.TensorProto.segment: object expected");t.segment=s.onnx.TensorProto.Segment.fromObject(e.segment)}if(e.floatData){if(!Array.isArray(e.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");t.floatData=[];for(var r=0;r<e.floatData.length;++r)t.floatData[r]=Number(e.floatData[r])}if(e.int32Data){if(!Array.isArray(e.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");t.int32Data=[];for(var r=0;r<e.int32Data.length;++r)t.int32Data[r]=0|e.int32Data[r]}if(e.stringData){if(!Array.isArray(e.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");t.stringData=[];for(var r=0;r<e.stringData.length;++r)"string"==typeof e.stringData[r]?o.base64.decode(e.stringData[r],t.stringData[r]=o.newBuffer(o.base64.length(e.stringData[r])),0):e.stringData[r].length>=0&&(t.stringData[r]=e.stringData[r])}if(e.int64Data){if(!Array.isArray(e.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");t.int64Data=[];for(var r=0;r<e.int64Data.length;++r)o.Long?(t.int64Data[r]=o.Long.fromValue(e.int64Data[r])).unsigned=!1:"string"==typeof e.int64Data[r]?t.int64Data[r]=parseInt(e.int64Data[r],10):"number"==typeof e.int64Data[r]?t.int64Data[r]=e.int64Data[r]:"object"==typeof e.int64Data[r]&&(t.int64Data[r]=new o.LongBits(e.int64Data[r].low>>>0,e.int64Data[r].high>>>0).toNumber())}if(null!=e.name&&(t.name=String(e.name)),null!=e.docString&&(t.docString=String(e.docString)),null!=e.rawData&&("string"==typeof e.rawData?o.base64.decode(e.rawData,t.rawData=o.newBuffer(o.base64.length(e.rawData)),0):e.rawData.length>=0&&(t.rawData=e.rawData)),e.externalData){if(!Array.isArray(e.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");t.externalData=[];for(var r=0;r<e.externalData.length;++r){if("object"!=typeof e.externalData[r])throw TypeError(".onnx.TensorProto.externalData: object expected");t.externalData[r]=s.onnx.StringStringEntryProto.fromObject(e.externalData[r])}}switch(e.dataLocation){default:"number"==typeof e.dataLocation&&(t.dataLocation=e.dataLocation);break;case"DEFAULT":case 0:t.dataLocation=0;break;case"EXTERNAL":case 1:t.dataLocation=1}if(e.doubleData){if(!Array.isArray(e.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");t.doubleData=[];for(var r=0;r<e.doubleData.length;++r)t.doubleData[r]=Number(e.doubleData[r])}if(e.uint64Data){if(!Array.isArray(e.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");t.uint64Data=[];for(var r=0;r<e.uint64Data.length;++r)o.Long?(t.uint64Data[r]=o.Long.fromValue(e.uint64Data[r])).unsigned=!0:"string"==typeof e.uint64Data[r]?t.uint64Data[r]=parseInt(e.uint64Data[r],10):"number"==typeof e.uint64Data[r]?t.uint64Data[r]=e.uint64Data[r]:"object"==typeof e.uint64Data[r]&&(t.uint64Data[r]=new o.LongBits(e.uint64Data[r].low>>>0,e.uint64Data[r].high>>>0).toNumber(!0))}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.dims=[],r.floatData=[],r.int32Data=[],r.stringData=[],r.int64Data=[],r.doubleData=[],r.uint64Data=[],r.externalData=[]),t.defaults&&(r.dataType=0,r.segment=null,r.name="",t.bytes===String?r.rawData="":(r.rawData=[],t.bytes!==Array&&(r.rawData=o.newBuffer(r.rawData))),r.docString="",r.dataLocation=t.enums===String?"DEFAULT":0),e.dims&&e.dims.length){r.dims=[];for(var n=0;n<e.dims.length;++n)"number"==typeof e.dims[n]?r.dims[n]=t.longs===String?String(e.dims[n]):e.dims[n]:r.dims[n]=t.longs===String?o.Long.prototype.toString.call(e.dims[n]):t.longs===Number?new o.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber():e.dims[n]}if(null!=e.dataType&&e.hasOwnProperty("dataType")&&(r.dataType=e.dataType),null!=e.segment&&e.hasOwnProperty("segment")&&(r.segment=s.onnx.TensorProto.Segment.toObject(e.segment,t)),e.floatData&&e.floatData.length){r.floatData=[];for(var n=0;n<e.floatData.length;++n)r.floatData[n]=t.json&&!isFinite(e.floatData[n])?String(e.floatData[n]):e.floatData[n]}if(e.int32Data&&e.int32Data.length){r.int32Data=[];for(var n=0;n<e.int32Data.length;++n)r.int32Data[n]=e.int32Data[n]}if(e.stringData&&e.stringData.length){r.stringData=[];for(var n=0;n<e.stringData.length;++n)r.stringData[n]=t.bytes===String?o.base64.encode(e.stringData[n],0,e.stringData[n].length):t.bytes===Array?Array.prototype.slice.call(e.stringData[n]):e.stringData[n]}if(e.int64Data&&e.int64Data.length){r.int64Data=[];for(var n=0;n<e.int64Data.length;++n)"number"==typeof e.int64Data[n]?r.int64Data[n]=t.longs===String?String(e.int64Data[n]):e.int64Data[n]:r.int64Data[n]=t.longs===String?o.Long.prototype.toString.call(e.int64Data[n]):t.longs===Number?new o.LongBits(e.int64Data[n].low>>>0,e.int64Data[n].high>>>0).toNumber():e.int64Data[n]}if(null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),null!=e.rawData&&e.hasOwnProperty("rawData")&&(r.rawData=t.bytes===String?o.base64.encode(e.rawData,0,e.rawData.length):t.bytes===Array?Array.prototype.slice.call(e.rawData):e.rawData),e.doubleData&&e.doubleData.length){r.doubleData=[];for(var n=0;n<e.doubleData.length;++n)r.doubleData[n]=t.json&&!isFinite(e.doubleData[n])?String(e.doubleData[n]):e.doubleData[n]}if(e.uint64Data&&e.uint64Data.length){r.uint64Data=[];for(var n=0;n<e.uint64Data.length;++n)"number"==typeof e.uint64Data[n]?r.uint64Data[n]=t.longs===String?String(e.uint64Data[n]):e.uint64Data[n]:r.uint64Data[n]=t.longs===String?o.Long.prototype.toString.call(e.uint64Data[n]):t.longs===Number?new o.LongBits(e.uint64Data[n].low>>>0,e.uint64Data[n].high>>>0).toNumber(!0):e.uint64Data[n]}if(null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),e.externalData&&e.externalData.length){r.externalData=[];for(var n=0;n<e.externalData.length;++n)r.externalData[n]=s.onnx.StringStringEntryProto.toObject(e.externalData[n],t)}return null!=e.dataLocation&&e.hasOwnProperty("dataLocation")&&(r.dataLocation=t.enums===String?void 0===s.onnx.TensorProto.DataLocation[e.dataLocation]?e.dataLocation:s.onnx.TensorProto.DataLocation[e.dataLocation]:e.dataLocation),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorProto"},e.DataType=function(){var e={},t=Object.create(e);return t[e[0]="UNDEFINED"]=0,t[e[1]="FLOAT"]=1,t[e[2]="UINT8"]=2,t[e[3]="INT8"]=3,t[e[4]="UINT16"]=4,t[e[5]="INT16"]=5,t[e[6]="INT32"]=6,t[e[7]="INT64"]=7,t[e[8]="STRING"]=8,t[e[9]="BOOL"]=9,t[e[10]="FLOAT16"]=10,t[e[11]="DOUBLE"]=11,t[e[12]="UINT32"]=12,t[e[13]="UINT64"]=13,t[e[14]="COMPLEX64"]=14,t[e[15]="COMPLEX128"]=15,t[e[16]="BFLOAT16"]=16,t[e[17]="FLOAT8E4M3FN"]=17,t[e[18]="FLOAT8E4M3FNUZ"]=18,t[e[19]="FLOAT8E5M2"]=19,t[e[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.begin=o.Long?o.Long.fromBits(0,0,!1):0,e.prototype.end=o.Long?o.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=i.create()),null!=e.begin&&Object.hasOwnProperty.call(e,"begin")&&t.uint32(8).int64(e.begin),null!=e.end&&Object.hasOwnProperty.call(e,"end")&&t.uint32(16).int64(e.end),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.TensorProto.Segment;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.begin=e.int64();break;case 2:i.end=e.int64();break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.begin&&e.hasOwnProperty("begin")&&!o.isInteger(e.begin)&&!(e.begin&&o.isInteger(e.begin.low)&&o.isInteger(e.begin.high))?"begin: integer|Long expected":null!=e.end&&e.hasOwnProperty("end")&&!o.isInteger(e.end)&&!(e.end&&o.isInteger(e.end.low)&&o.isInteger(e.end.high))?"end: integer|Long expected":null},e.fromObject=function(e){if(e instanceof s.onnx.TensorProto.Segment)return e;var t=new s.onnx.TensorProto.Segment;return null!=e.begin&&(o.Long?(t.begin=o.Long.fromValue(e.begin)).unsigned=!1:"string"==typeof e.begin?t.begin=parseInt(e.begin,10):"number"==typeof e.begin?t.begin=e.begin:"object"==typeof e.begin&&(t.begin=new o.LongBits(e.begin.low>>>0,e.begin.high>>>0).toNumber())),null!=e.end&&(o.Long?(t.end=o.Long.fromValue(e.end)).unsigned=!1:"string"==typeof e.end?t.end=parseInt(e.end,10):"number"==typeof e.end?t.end=e.end:"object"==typeof e.end&&(t.end=new o.LongBits(e.end.low>>>0,e.end.high>>>0).toNumber())),t},e.toObject=function(e,t){t||(t={});var r={};if(t.defaults){if(o.Long){var n=new o.Long(0,0,!1);r.begin=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.begin=t.longs===String?"0":0;if(o.Long){var n=new o.Long(0,0,!1);r.end=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.end=t.longs===String?"0":0}return null!=e.begin&&e.hasOwnProperty("begin")&&("number"==typeof e.begin?r.begin=t.longs===String?String(e.begin):e.begin:r.begin=t.longs===String?o.Long.prototype.toString.call(e.begin):t.longs===Number?new o.LongBits(e.begin.low>>>0,e.begin.high>>>0).toNumber():e.begin),null!=e.end&&e.hasOwnProperty("end")&&("number"==typeof e.end?r.end=t.longs===String?String(e.end):e.end:r.end=t.longs===String?o.Long.prototype.toString.call(e.end):t.longs===Number?new o.LongBits(e.end.low>>>0,e.end.high>>>0).toNumber():e.end),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorProto.Segment"},e}(),e.DataLocation=function(){var e={},t=Object.create(e);return t[e[0]="DEFAULT"]=0,t[e[1]="EXTERNAL"]=1,t}(),e}(),e.SparseTensorProto=function(){function e(e){if(this.dims=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=o.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=i.create()),null!=e.values&&Object.hasOwnProperty.call(e,"values")&&s.onnx.TensorProto.encode(e.values,t.uint32(10).fork()).ldelim(),null!=e.indices&&Object.hasOwnProperty.call(e,"indices")&&s.onnx.TensorProto.encode(e.indices,t.uint32(18).fork()).ldelim(),null!=e.dims&&e.dims.length){t.uint32(26).fork();for(var r=0;r<e.dims.length;++r)t.int64(e.dims[r]);t.ldelim()}return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.SparseTensorProto;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.values=s.onnx.TensorProto.decode(e,e.uint32());break;case 2:i.indices=s.onnx.TensorProto.decode(e,e.uint32());break;case 3:if(i.dims&&i.dims.length||(i.dims=[]),(7&o)==2)for(var a=e.uint32()+e.pos;e.pos<a;)i.dims.push(e.int64());else i.dims.push(e.int64());break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.values&&e.hasOwnProperty("values")){var t=s.onnx.TensorProto.verify(e.values);if(t)return"values."+t}if(null!=e.indices&&e.hasOwnProperty("indices")){var t=s.onnx.TensorProto.verify(e.indices);if(t)return"indices."+t}if(null!=e.dims&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var r=0;r<e.dims.length;++r)if(!o.isInteger(e.dims[r])&&!(e.dims[r]&&o.isInteger(e.dims[r].low)&&o.isInteger(e.dims[r].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(e){if(e instanceof s.onnx.SparseTensorProto)return e;var t=new s.onnx.SparseTensorProto;if(null!=e.values){if("object"!=typeof e.values)throw TypeError(".onnx.SparseTensorProto.values: object expected");t.values=s.onnx.TensorProto.fromObject(e.values)}if(null!=e.indices){if("object"!=typeof e.indices)throw TypeError(".onnx.SparseTensorProto.indices: object expected");t.indices=s.onnx.TensorProto.fromObject(e.indices)}if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");t.dims=[];for(var r=0;r<e.dims.length;++r)o.Long?(t.dims[r]=o.Long.fromValue(e.dims[r])).unsigned=!1:"string"==typeof e.dims[r]?t.dims[r]=parseInt(e.dims[r],10):"number"==typeof e.dims[r]?t.dims[r]=e.dims[r]:"object"==typeof e.dims[r]&&(t.dims[r]=new o.LongBits(e.dims[r].low>>>0,e.dims[r].high>>>0).toNumber())}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.dims=[]),t.defaults&&(r.values=null,r.indices=null),null!=e.values&&e.hasOwnProperty("values")&&(r.values=s.onnx.TensorProto.toObject(e.values,t)),null!=e.indices&&e.hasOwnProperty("indices")&&(r.indices=s.onnx.TensorProto.toObject(e.indices,t)),e.dims&&e.dims.length){r.dims=[];for(var n=0;n<e.dims.length;++n)"number"==typeof e.dims[n]?r.dims[n]=t.longs===String?String(e.dims[n]):e.dims[n]:r.dims[n]=t.longs===String?o.Long.prototype.toString.call(e.dims[n]):t.longs===Number?new o.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber():e.dims[n]}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.SparseTensorProto"},e}(),e.TensorShapeProto=function(){function e(e){if(this.dim=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.dim=o.emptyArray,e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=i.create()),null!=e.dim&&e.dim.length)for(var r=0;r<e.dim.length;++r)s.onnx.TensorShapeProto.Dimension.encode(e.dim[r],t.uint32(10).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.TensorShapeProto;e.pos<r;){var o=e.uint32();o>>>3==1?(i.dim&&i.dim.length||(i.dim=[]),i.dim.push(s.onnx.TensorShapeProto.Dimension.decode(e,e.uint32()))):e.skipType(7&o)}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.dim&&e.hasOwnProperty("dim")){if(!Array.isArray(e.dim))return"dim: array expected";for(var t=0;t<e.dim.length;++t){var r=s.onnx.TensorShapeProto.Dimension.verify(e.dim[t]);if(r)return"dim."+r}}return null},e.fromObject=function(e){if(e instanceof s.onnx.TensorShapeProto)return e;var t=new s.onnx.TensorShapeProto;if(e.dim){if(!Array.isArray(e.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");t.dim=[];for(var r=0;r<e.dim.length;++r){if("object"!=typeof e.dim[r])throw TypeError(".onnx.TensorShapeProto.dim: object expected");t.dim[r]=s.onnx.TensorShapeProto.Dimension.fromObject(e.dim[r])}}return t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.dim=[]),e.dim&&e.dim.length){r.dim=[];for(var n=0;n<e.dim.length;++n)r.dim[n]=s.onnx.TensorShapeProto.Dimension.toObject(e.dim[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorShapeProto"},e.Dimension=function(){var e;function t(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return t.prototype.dimValue=null,t.prototype.dimParam=null,t.prototype.denotation="",Object.defineProperty(t.prototype,"value",{get:o.oneOfGetter(e=["dimValue","dimParam"]),set:o.oneOfSetter(e)}),t.create=function(e){return new t(e)},t.encode=function(e,t){return t||(t=i.create()),null!=e.dimValue&&Object.hasOwnProperty.call(e,"dimValue")&&t.uint32(8).int64(e.dimValue),null!=e.dimParam&&Object.hasOwnProperty.call(e,"dimParam")&&t.uint32(18).string(e.dimParam),null!=e.denotation&&Object.hasOwnProperty.call(e,"denotation")&&t.uint32(26).string(e.denotation),t},t.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},t.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.TensorShapeProto.Dimension;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.dimValue=e.int64();break;case 2:i.dimParam=e.string();break;case 3:i.denotation=e.string();break;default:e.skipType(7&o)}}return i},t.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},t.verify=function(e){if("object"!=typeof e||null===e)return"object expected";var t={};if(null!=e.dimValue&&e.hasOwnProperty("dimValue")&&(t.value=1,!o.isInteger(e.dimValue)&&!(e.dimValue&&o.isInteger(e.dimValue.low)&&o.isInteger(e.dimValue.high))))return"dimValue: integer|Long expected";if(null!=e.dimParam&&e.hasOwnProperty("dimParam")){if(1===t.value)return"value: multiple values";if(t.value=1,!o.isString(e.dimParam))return"dimParam: string expected"}return null!=e.denotation&&e.hasOwnProperty("denotation")&&!o.isString(e.denotation)?"denotation: string expected":null},t.fromObject=function(e){if(e instanceof s.onnx.TensorShapeProto.Dimension)return e;var t=new s.onnx.TensorShapeProto.Dimension;return null!=e.dimValue&&(o.Long?(t.dimValue=o.Long.fromValue(e.dimValue)).unsigned=!1:"string"==typeof e.dimValue?t.dimValue=parseInt(e.dimValue,10):"number"==typeof e.dimValue?t.dimValue=e.dimValue:"object"==typeof e.dimValue&&(t.dimValue=new o.LongBits(e.dimValue.low>>>0,e.dimValue.high>>>0).toNumber())),null!=e.dimParam&&(t.dimParam=String(e.dimParam)),null!=e.denotation&&(t.denotation=String(e.denotation)),t},t.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.denotation=""),null!=e.dimValue&&e.hasOwnProperty("dimValue")&&("number"==typeof e.dimValue?r.dimValue=t.longs===String?String(e.dimValue):e.dimValue:r.dimValue=t.longs===String?o.Long.prototype.toString.call(e.dimValue):t.longs===Number?new o.LongBits(e.dimValue.low>>>0,e.dimValue.high>>>0).toNumber():e.dimValue,t.oneofs&&(r.value="dimValue")),null!=e.dimParam&&e.hasOwnProperty("dimParam")&&(r.dimParam=e.dimParam,t.oneofs&&(r.value="dimParam")),null!=e.denotation&&e.hasOwnProperty("denotation")&&(r.denotation=e.denotation),r},t.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},t.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TensorShapeProto.Dimension"},t}(),e}(),e.TypeProto=function(){var e;function t(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return t.prototype.tensorType=null,t.prototype.sequenceType=null,t.prototype.mapType=null,t.prototype.optionalType=null,t.prototype.sparseTensorType=null,t.prototype.denotation="",Object.defineProperty(t.prototype,"value",{get:o.oneOfGetter(e=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:o.oneOfSetter(e)}),t.create=function(e){return new t(e)},t.encode=function(e,t){return t||(t=i.create()),null!=e.tensorType&&Object.hasOwnProperty.call(e,"tensorType")&&s.onnx.TypeProto.Tensor.encode(e.tensorType,t.uint32(10).fork()).ldelim(),null!=e.sequenceType&&Object.hasOwnProperty.call(e,"sequenceType")&&s.onnx.TypeProto.Sequence.encode(e.sequenceType,t.uint32(34).fork()).ldelim(),null!=e.mapType&&Object.hasOwnProperty.call(e,"mapType")&&s.onnx.TypeProto.Map.encode(e.mapType,t.uint32(42).fork()).ldelim(),null!=e.denotation&&Object.hasOwnProperty.call(e,"denotation")&&t.uint32(50).string(e.denotation),null!=e.sparseTensorType&&Object.hasOwnProperty.call(e,"sparseTensorType")&&s.onnx.TypeProto.SparseTensor.encode(e.sparseTensorType,t.uint32(66).fork()).ldelim(),null!=e.optionalType&&Object.hasOwnProperty.call(e,"optionalType")&&s.onnx.TypeProto.Optional.encode(e.optionalType,t.uint32(74).fork()).ldelim(),t},t.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},t.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.TypeProto;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.tensorType=s.onnx.TypeProto.Tensor.decode(e,e.uint32());break;case 4:i.sequenceType=s.onnx.TypeProto.Sequence.decode(e,e.uint32());break;case 5:i.mapType=s.onnx.TypeProto.Map.decode(e,e.uint32());break;case 9:i.optionalType=s.onnx.TypeProto.Optional.decode(e,e.uint32());break;case 8:i.sparseTensorType=s.onnx.TypeProto.SparseTensor.decode(e,e.uint32());break;case 6:i.denotation=e.string();break;default:e.skipType(7&o)}}return i},t.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},t.verify=function(e){if("object"!=typeof e||null===e)return"object expected";var t={};if(null!=e.tensorType&&e.hasOwnProperty("tensorType")){t.value=1;var r=s.onnx.TypeProto.Tensor.verify(e.tensorType);if(r)return"tensorType."+r}if(null!=e.sequenceType&&e.hasOwnProperty("sequenceType")){if(1===t.value)return"value: multiple values";t.value=1;var r=s.onnx.TypeProto.Sequence.verify(e.sequenceType);if(r)return"sequenceType."+r}if(null!=e.mapType&&e.hasOwnProperty("mapType")){if(1===t.value)return"value: multiple values";t.value=1;var r=s.onnx.TypeProto.Map.verify(e.mapType);if(r)return"mapType."+r}if(null!=e.optionalType&&e.hasOwnProperty("optionalType")){if(1===t.value)return"value: multiple values";t.value=1;var r=s.onnx.TypeProto.Optional.verify(e.optionalType);if(r)return"optionalType."+r}if(null!=e.sparseTensorType&&e.hasOwnProperty("sparseTensorType")){if(1===t.value)return"value: multiple values";t.value=1;var r=s.onnx.TypeProto.SparseTensor.verify(e.sparseTensorType);if(r)return"sparseTensorType."+r}return null!=e.denotation&&e.hasOwnProperty("denotation")&&!o.isString(e.denotation)?"denotation: string expected":null},t.fromObject=function(e){if(e instanceof s.onnx.TypeProto)return e;var t=new s.onnx.TypeProto;if(null!=e.tensorType){if("object"!=typeof e.tensorType)throw TypeError(".onnx.TypeProto.tensorType: object expected");t.tensorType=s.onnx.TypeProto.Tensor.fromObject(e.tensorType)}if(null!=e.sequenceType){if("object"!=typeof e.sequenceType)throw TypeError(".onnx.TypeProto.sequenceType: object expected");t.sequenceType=s.onnx.TypeProto.Sequence.fromObject(e.sequenceType)}if(null!=e.mapType){if("object"!=typeof e.mapType)throw TypeError(".onnx.TypeProto.mapType: object expected");t.mapType=s.onnx.TypeProto.Map.fromObject(e.mapType)}if(null!=e.optionalType){if("object"!=typeof e.optionalType)throw TypeError(".onnx.TypeProto.optionalType: object expected");t.optionalType=s.onnx.TypeProto.Optional.fromObject(e.optionalType)}if(null!=e.sparseTensorType){if("object"!=typeof e.sparseTensorType)throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");t.sparseTensorType=s.onnx.TypeProto.SparseTensor.fromObject(e.sparseTensorType)}return null!=e.denotation&&(t.denotation=String(e.denotation)),t},t.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.denotation=""),null!=e.tensorType&&e.hasOwnProperty("tensorType")&&(r.tensorType=s.onnx.TypeProto.Tensor.toObject(e.tensorType,t),t.oneofs&&(r.value="tensorType")),null!=e.sequenceType&&e.hasOwnProperty("sequenceType")&&(r.sequenceType=s.onnx.TypeProto.Sequence.toObject(e.sequenceType,t),t.oneofs&&(r.value="sequenceType")),null!=e.mapType&&e.hasOwnProperty("mapType")&&(r.mapType=s.onnx.TypeProto.Map.toObject(e.mapType,t),t.oneofs&&(r.value="mapType")),null!=e.denotation&&e.hasOwnProperty("denotation")&&(r.denotation=e.denotation),null!=e.sparseTensorType&&e.hasOwnProperty("sparseTensorType")&&(r.sparseTensorType=s.onnx.TypeProto.SparseTensor.toObject(e.sparseTensorType,t),t.oneofs&&(r.value="sparseTensorType")),null!=e.optionalType&&e.hasOwnProperty("optionalType")&&(r.optionalType=s.onnx.TypeProto.Optional.toObject(e.optionalType,t),t.oneofs&&(r.value="optionalType")),r},t.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},t.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto"},t.Tensor=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=i.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&t.uint32(8).int32(e.elemType),null!=e.shape&&Object.hasOwnProperty.call(e,"shape")&&s.onnx.TensorShapeProto.encode(e.shape,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.TypeProto.Tensor;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.elemType=e.int32();break;case 2:i.shape=s.onnx.TensorShapeProto.decode(e,e.uint32());break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")&&!o.isInteger(e.elemType))return"elemType: integer expected";if(null!=e.shape&&e.hasOwnProperty("shape")){var t=s.onnx.TensorShapeProto.verify(e.shape);if(t)return"shape."+t}return null},e.fromObject=function(e){if(e instanceof s.onnx.TypeProto.Tensor)return e;var t=new s.onnx.TypeProto.Tensor;if(null!=e.elemType&&(t.elemType=0|e.elemType),null!=e.shape){if("object"!=typeof e.shape)throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");t.shape=s.onnx.TensorShapeProto.fromObject(e.shape)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.elemType=0,r.shape=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(r.elemType=e.elemType),null!=e.shape&&e.hasOwnProperty("shape")&&(r.shape=s.onnx.TensorShapeProto.toObject(e.shape,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Tensor"},e}(),t.Sequence=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.elemType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=i.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&s.onnx.TypeProto.encode(e.elemType,t.uint32(10).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.TypeProto.Sequence;e.pos<r;){var o=e.uint32();o>>>3==1?i.elemType=s.onnx.TypeProto.decode(e,e.uint32()):e.skipType(7&o)}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")){var t=s.onnx.TypeProto.verify(e.elemType);if(t)return"elemType."+t}return null},e.fromObject=function(e){if(e instanceof s.onnx.TypeProto.Sequence)return e;var t=new s.onnx.TypeProto.Sequence;if(null!=e.elemType){if("object"!=typeof e.elemType)throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");t.elemType=s.onnx.TypeProto.fromObject(e.elemType)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.elemType=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(r.elemType=s.onnx.TypeProto.toObject(e.elemType,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Sequence"},e}(),t.Map=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.keyType=0,e.prototype.valueType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=i.create()),null!=e.keyType&&Object.hasOwnProperty.call(e,"keyType")&&t.uint32(8).int32(e.keyType),null!=e.valueType&&Object.hasOwnProperty.call(e,"valueType")&&s.onnx.TypeProto.encode(e.valueType,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.TypeProto.Map;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.keyType=e.int32();break;case 2:i.valueType=s.onnx.TypeProto.decode(e,e.uint32());break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.keyType&&e.hasOwnProperty("keyType")&&!o.isInteger(e.keyType))return"keyType: integer expected";if(null!=e.valueType&&e.hasOwnProperty("valueType")){var t=s.onnx.TypeProto.verify(e.valueType);if(t)return"valueType."+t}return null},e.fromObject=function(e){if(e instanceof s.onnx.TypeProto.Map)return e;var t=new s.onnx.TypeProto.Map;if(null!=e.keyType&&(t.keyType=0|e.keyType),null!=e.valueType){if("object"!=typeof e.valueType)throw TypeError(".onnx.TypeProto.Map.valueType: object expected");t.valueType=s.onnx.TypeProto.fromObject(e.valueType)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.keyType=0,r.valueType=null),null!=e.keyType&&e.hasOwnProperty("keyType")&&(r.keyType=e.keyType),null!=e.valueType&&e.hasOwnProperty("valueType")&&(r.valueType=s.onnx.TypeProto.toObject(e.valueType,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Map"},e}(),t.Optional=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.elemType=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=i.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&s.onnx.TypeProto.encode(e.elemType,t.uint32(10).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.TypeProto.Optional;e.pos<r;){var o=e.uint32();o>>>3==1?i.elemType=s.onnx.TypeProto.decode(e,e.uint32()):e.skipType(7&o)}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")){var t=s.onnx.TypeProto.verify(e.elemType);if(t)return"elemType."+t}return null},e.fromObject=function(e){if(e instanceof s.onnx.TypeProto.Optional)return e;var t=new s.onnx.TypeProto.Optional;if(null!=e.elemType){if("object"!=typeof e.elemType)throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");t.elemType=s.onnx.TypeProto.fromObject(e.elemType)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.elemType=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(r.elemType=s.onnx.TypeProto.toObject(e.elemType,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.Optional"},e}(),t.SparseTensor=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=i.create()),null!=e.elemType&&Object.hasOwnProperty.call(e,"elemType")&&t.uint32(8).int32(e.elemType),null!=e.shape&&Object.hasOwnProperty.call(e,"shape")&&s.onnx.TensorShapeProto.encode(e.shape,t.uint32(18).fork()).ldelim(),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.TypeProto.SparseTensor;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.elemType=e.int32();break;case 2:i.shape=s.onnx.TensorShapeProto.decode(e,e.uint32());break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.elemType&&e.hasOwnProperty("elemType")&&!o.isInteger(e.elemType))return"elemType: integer expected";if(null!=e.shape&&e.hasOwnProperty("shape")){var t=s.onnx.TensorShapeProto.verify(e.shape);if(t)return"shape."+t}return null},e.fromObject=function(e){if(e instanceof s.onnx.TypeProto.SparseTensor)return e;var t=new s.onnx.TypeProto.SparseTensor;if(null!=e.elemType&&(t.elemType=0|e.elemType),null!=e.shape){if("object"!=typeof e.shape)throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");t.shape=s.onnx.TensorShapeProto.fromObject(e.shape)}return t},e.toObject=function(e,t){t||(t={});var r={};return t.defaults&&(r.elemType=0,r.shape=null),null!=e.elemType&&e.hasOwnProperty("elemType")&&(r.elemType=e.elemType),null!=e.shape&&e.hasOwnProperty("shape")&&(r.shape=s.onnx.TensorShapeProto.toObject(e.shape,t)),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.TypeProto.SparseTensor"},e}(),t}(),e.OperatorSetIdProto=function(){function e(e){if(e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.domain="",e.prototype.version=o.Long?o.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(e,t){return t||(t=i.create()),null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(10).string(e.domain),null!=e.version&&Object.hasOwnProperty.call(e,"version")&&t.uint32(16).int64(e.version),t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.OperatorSetIdProto;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.domain=e.string();break;case 2:i.version=e.int64();break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){return"object"!=typeof e||null===e?"object expected":null!=e.domain&&e.hasOwnProperty("domain")&&!o.isString(e.domain)?"domain: string expected":null!=e.version&&e.hasOwnProperty("version")&&!o.isInteger(e.version)&&!(e.version&&o.isInteger(e.version.low)&&o.isInteger(e.version.high))?"version: integer|Long expected":null},e.fromObject=function(e){if(e instanceof s.onnx.OperatorSetIdProto)return e;var t=new s.onnx.OperatorSetIdProto;return null!=e.domain&&(t.domain=String(e.domain)),null!=e.version&&(o.Long?(t.version=o.Long.fromValue(e.version)).unsigned=!1:"string"==typeof e.version?t.version=parseInt(e.version,10):"number"==typeof e.version?t.version=e.version:"object"==typeof e.version&&(t.version=new o.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber())),t},e.toObject=function(e,t){t||(t={});var r={};if(t.defaults)if(r.domain="",o.Long){var n=new o.Long(0,0,!1);r.version=t.longs===String?n.toString():t.longs===Number?n.toNumber():n}else r.version=t.longs===String?"0":0;return null!=e.domain&&e.hasOwnProperty("domain")&&(r.domain=e.domain),null!=e.version&&e.hasOwnProperty("version")&&("number"==typeof e.version?r.version=t.longs===String?String(e.version):e.version:r.version=t.longs===String?o.Long.prototype.toString.call(e.version):t.longs===Number?new o.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber():e.version),r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.OperatorSetIdProto"},e}(),e.OperatorStatus=function(){var e={},t=Object.create(e);return t[e[0]="EXPERIMENTAL"]=0,t[e[1]="STABLE"]=1,t}(),e.FunctionProto=function(){function e(e){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],e)for(var t=Object.keys(e),r=0;r<t.length;++r)null!=e[t[r]]&&(this[t[r]]=e[t[r]])}return e.prototype.name="",e.prototype.input=o.emptyArray,e.prototype.output=o.emptyArray,e.prototype.attribute=o.emptyArray,e.prototype.attributeProto=o.emptyArray,e.prototype.node=o.emptyArray,e.prototype.docString="",e.prototype.opsetImport=o.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(e,t){if(t||(t=i.create()),null!=e.name&&Object.hasOwnProperty.call(e,"name")&&t.uint32(10).string(e.name),null!=e.input&&e.input.length)for(var r=0;r<e.input.length;++r)t.uint32(34).string(e.input[r]);if(null!=e.output&&e.output.length)for(var r=0;r<e.output.length;++r)t.uint32(42).string(e.output[r]);if(null!=e.attribute&&e.attribute.length)for(var r=0;r<e.attribute.length;++r)t.uint32(50).string(e.attribute[r]);if(null!=e.node&&e.node.length)for(var r=0;r<e.node.length;++r)s.onnx.NodeProto.encode(e.node[r],t.uint32(58).fork()).ldelim();if(null!=e.docString&&Object.hasOwnProperty.call(e,"docString")&&t.uint32(66).string(e.docString),null!=e.opsetImport&&e.opsetImport.length)for(var r=0;r<e.opsetImport.length;++r)s.onnx.OperatorSetIdProto.encode(e.opsetImport[r],t.uint32(74).fork()).ldelim();if(null!=e.domain&&Object.hasOwnProperty.call(e,"domain")&&t.uint32(82).string(e.domain),null!=e.attributeProto&&e.attributeProto.length)for(var r=0;r<e.attributeProto.length;++r)s.onnx.AttributeProto.encode(e.attributeProto[r],t.uint32(90).fork()).ldelim();return t},e.encodeDelimited=function(e,t){return this.encode(e,t).ldelim()},e.decode=function(e,t){e instanceof n||(e=n.create(e));for(var r=void 0===t?e.len:e.pos+t,i=new s.onnx.FunctionProto;e.pos<r;){var o=e.uint32();switch(o>>>3){case 1:i.name=e.string();break;case 4:i.input&&i.input.length||(i.input=[]),i.input.push(e.string());break;case 5:i.output&&i.output.length||(i.output=[]),i.output.push(e.string());break;case 6:i.attribute&&i.attribute.length||(i.attribute=[]),i.attribute.push(e.string());break;case 11:i.attributeProto&&i.attributeProto.length||(i.attributeProto=[]),i.attributeProto.push(s.onnx.AttributeProto.decode(e,e.uint32()));break;case 7:i.node&&i.node.length||(i.node=[]),i.node.push(s.onnx.NodeProto.decode(e,e.uint32()));break;case 8:i.docString=e.string();break;case 9:i.opsetImport&&i.opsetImport.length||(i.opsetImport=[]),i.opsetImport.push(s.onnx.OperatorSetIdProto.decode(e,e.uint32()));break;case 10:i.domain=e.string();break;default:e.skipType(7&o)}}return i},e.decodeDelimited=function(e){return e instanceof n||(e=new n(e)),this.decode(e,e.uint32())},e.verify=function(e){if("object"!=typeof e||null===e)return"object expected";if(null!=e.name&&e.hasOwnProperty("name")&&!o.isString(e.name))return"name: string expected";if(null!=e.input&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var t=0;t<e.input.length;++t)if(!o.isString(e.input[t]))return"input: string[] expected"}if(null!=e.output&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var t=0;t<e.output.length;++t)if(!o.isString(e.output[t]))return"output: string[] expected"}if(null!=e.attribute&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var t=0;t<e.attribute.length;++t)if(!o.isString(e.attribute[t]))return"attribute: string[] expected"}if(null!=e.attributeProto&&e.hasOwnProperty("attributeProto")){if(!Array.isArray(e.attributeProto))return"attributeProto: array expected";for(var t=0;t<e.attributeProto.length;++t){var r=s.onnx.AttributeProto.verify(e.attributeProto[t]);if(r)return"attributeProto."+r}}if(null!=e.node&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var t=0;t<e.node.length;++t){var r=s.onnx.NodeProto.verify(e.node[t]);if(r)return"node."+r}}if(null!=e.docString&&e.hasOwnProperty("docString")&&!o.isString(e.docString))return"docString: string expected";if(null!=e.opsetImport&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var t=0;t<e.opsetImport.length;++t){var r=s.onnx.OperatorSetIdProto.verify(e.opsetImport[t]);if(r)return"opsetImport."+r}}return null!=e.domain&&e.hasOwnProperty("domain")&&!o.isString(e.domain)?"domain: string expected":null},e.fromObject=function(e){if(e instanceof s.onnx.FunctionProto)return e;var t=new s.onnx.FunctionProto;if(null!=e.name&&(t.name=String(e.name)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.FunctionProto.input: array expected");t.input=[];for(var r=0;r<e.input.length;++r)t.input[r]=String(e.input[r])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.FunctionProto.output: array expected");t.output=[];for(var r=0;r<e.output.length;++r)t.output[r]=String(e.output[r])}if(e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");t.attribute=[];for(var r=0;r<e.attribute.length;++r)t.attribute[r]=String(e.attribute[r])}if(e.attributeProto){if(!Array.isArray(e.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");t.attributeProto=[];for(var r=0;r<e.attributeProto.length;++r){if("object"!=typeof e.attributeProto[r])throw TypeError(".onnx.FunctionProto.attributeProto: object expected");t.attributeProto[r]=s.onnx.AttributeProto.fromObject(e.attributeProto[r])}}if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.FunctionProto.node: array expected");t.node=[];for(var r=0;r<e.node.length;++r){if("object"!=typeof e.node[r])throw TypeError(".onnx.FunctionProto.node: object expected");t.node[r]=s.onnx.NodeProto.fromObject(e.node[r])}}if(null!=e.docString&&(t.docString=String(e.docString)),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");t.opsetImport=[];for(var r=0;r<e.opsetImport.length;++r){if("object"!=typeof e.opsetImport[r])throw TypeError(".onnx.FunctionProto.opsetImport: object expected");t.opsetImport[r]=s.onnx.OperatorSetIdProto.fromObject(e.opsetImport[r])}}return null!=e.domain&&(t.domain=String(e.domain)),t},e.toObject=function(e,t){t||(t={});var r={};if((t.arrays||t.defaults)&&(r.input=[],r.output=[],r.attribute=[],r.node=[],r.opsetImport=[],r.attributeProto=[]),t.defaults&&(r.name="",r.docString="",r.domain=""),null!=e.name&&e.hasOwnProperty("name")&&(r.name=e.name),e.input&&e.input.length){r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=e.input[n]}if(e.output&&e.output.length){r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=e.output[n]}if(e.attribute&&e.attribute.length){r.attribute=[];for(var n=0;n<e.attribute.length;++n)r.attribute[n]=e.attribute[n]}if(e.node&&e.node.length){r.node=[];for(var n=0;n<e.node.length;++n)r.node[n]=s.onnx.NodeProto.toObject(e.node[n],t)}if(null!=e.docString&&e.hasOwnProperty("docString")&&(r.docString=e.docString),e.opsetImport&&e.opsetImport.length){r.opsetImport=[];for(var n=0;n<e.opsetImport.length;++n)r.opsetImport[n]=s.onnx.OperatorSetIdProto.toObject(e.opsetImport[n],t)}if(null!=e.domain&&e.hasOwnProperty("domain")&&(r.domain=e.domain),e.attributeProto&&e.attributeProto.length){r.attributeProto=[];for(var n=0;n<e.attributeProto.length;++n)r.attributeProto[n]=s.onnx.AttributeProto.toObject(e.attributeProto[n],t)}return r},e.prototype.toJSON=function(){return this.constructor.toObject(this,r.util.toJSONOptions)},e.getTypeUrl=function(e){return void 0===e&&(e="type.googleapis.com"),e+"/onnx.FunctionProto"},e}(),e}(),t.exports=s}});function assert(e,t){if(!e)throw Error("string"==typeof t?t:t())}function decodeUtf8String(e){return new TextDecoder().decode(e)}var init_util=__esm({"web/lib/onnxjs/util.ts"(){"use strict";init_long(),import_onnx=__toESM(require_onnx()),init_tensor2(),ArrayUtil=class{static arraysEqual(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}},MatMulUtil=class{static preprocessInputShapes(e,t){return[1===e.length?[1,e[0]]:e,1===t.length?[t[0],1]:t]}static postprocessOutputShape(e,t,r){1===t&&e.splice(e.length-2,1),1===r&&e.pop()}static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},BroadcastUtil=class e{static calcShape(e,t,r=!1){let n=e.length,i=t.length;if(0===n)return t;if(0===i)return e;let o=Math.max(e.length,t.length),s=Array(o);if(r){if(n<2||i<2)return;let r=MatMulUtil.calcMatMulShape([e[n-2],e[n-1]],[t[i-2],t[i-1]]);if(void 0===r)return;[s[o-2],s[o-1]]=r}for(let a=r?3:1;a<=o;a++){let r=n-a<0?1:e[n-a],u=i-a<0?1:t[i-a];if(r!==u&&r>1&&u>1)return;s[o-a]=Math.max(r,u)}return s}static index(t,r){let n=Array(r.length);return e.fillIndex(t,r,n),n}static fillIndex(e,t,r){let n=e.length-t.length;for(let i=0;i<t.length;i++)r[i]=e[n+i]%t[i]}static calc(t,r,n,i,o){let s=e.calcShape(t.dims,r.dims);if(s){if(i&&!ShapeUtil.areEqual(s,t.dims))return;let a=ShapeUtil.size(s),u=i?t:new Tensor4(s,o||t.type);if(0===s.length)u.set([],n(t.get([]),r.get([])));else{let i,o=Array(s.length),l=Array(t.dims.length),d=Array(r.dims.length),p=0,c=0,h=!1,f=!1;0===t.dims.length&&(p=t.get([]),h=!0),0===r.dims.length&&(c=r.get([]),f=!0);for(let m=0;m<a;m++){i=m;for(let e=s.length-1;e>=0;e--)o[e]=i%s[e],i=Math.floor(i/s[e]);h||(e.fillIndex(o,t.dims,l),p=t.get(l)),f||(e.fillIndex(o,r.dims,d),c=r.get(d)),u.set(o,n(p,c))}}return u}}static isValidBroadcast(e,t){let r=e.length,n=t.length;if(r>n)return!1;for(let i=1;i<=r;i++)if(1!==e[r-i]&&e[r-i]!==t[n-i])return!1;return!0}static getBroadcastDims(e,t){let r=e.length,n=[];for(let i=0;i<r;i++){let o=r-1-i,s=e[o]||1;(t[t.length-1-i]||1)>1&&1===s&&n.unshift(o)}return n}},GemmUtil=class{static getShapeOfGemmResult(e,t,r,n,i){let o,s,a;if(2!==e.length||2!==r.length)throw Error("shape need to be of size 2");t?(o=e[1],s=e[0]):(o=e[0],s=e[1]);let u=-1;if(n?(a=r[0],u=1):(a=r[1],u=0),r[u]!==s)throw Error("dimension mismatch");if(o<=0||a<=0||s<=0)throw Error("invalid shape specified");if(i&&!BroadcastUtil.isValidBroadcast(i,[o,a]))throw Error("gemm: invalid bias shape for broadcast");return[o,a,s]}},ProtoUtil=class e{static tensorDataTypeFromProto(e){switch(e){case import_onnx.onnx.TensorProto.DataType.INT8:return"int8";case import_onnx.onnx.TensorProto.DataType.UINT8:return"uint8";case import_onnx.onnx.TensorProto.DataType.BOOL:return"bool";case import_onnx.onnx.TensorProto.DataType.INT16:return"int16";case import_onnx.onnx.TensorProto.DataType.UINT16:return"uint16";case import_onnx.onnx.TensorProto.DataType.INT32:return"int32";case import_onnx.onnx.TensorProto.DataType.UINT32:return"uint32";case import_onnx.onnx.TensorProto.DataType.FLOAT:return"float32";case import_onnx.onnx.TensorProto.DataType.DOUBLE:return"float64";case import_onnx.onnx.TensorProto.DataType.STRING:return"string";case import_onnx.onnx.TensorProto.DataType.INT64:return"int32";case import_onnx.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw Error(`unsupported data type: ${import_onnx.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return import_onnx.onnx.TensorProto.DataType.INT8;case"uint8":return import_onnx.onnx.TensorProto.DataType.UINT8;case"bool":return import_onnx.onnx.TensorProto.DataType.BOOL;case"int16":return import_onnx.onnx.TensorProto.DataType.INT16;case"uint16":return import_onnx.onnx.TensorProto.DataType.UINT16;case"int32":return import_onnx.onnx.TensorProto.DataType.INT32;case"uint32":return import_onnx.onnx.TensorProto.DataType.UINT32;case"float32":return import_onnx.onnx.TensorProto.DataType.FLOAT;case"float64":return import_onnx.onnx.TensorProto.DataType.DOUBLE;case"string":return import_onnx.onnx.TensorProto.DataType.STRING;case"int64":return import_onnx.onnx.TensorProto.DataType.INT64;case"uint64":return import_onnx.onnx.TensorProto.DataType.UINT64;default:throw Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(e=>long_default.isLong(e)?e.toNumber():e)}static tensorValueTypeFromProto(t){return{tensorType:e.tensorDataTypeFromProto(t.elemType),shape:{dims:e.tensorDimsFromProto(t.shape.dim.map(e=>e.dimValue))}}}static tensorDimsFromORTFormat(e){let t=[];for(let r=0;r<e.dimsLength();r++)t.push(LongUtil.longToNumber(e.dims(r)));return t}static tensorAttributesFromORTFormat(e){let t=[];for(let r=0;r<e.attributesLength();r++)t.push(e.attributes(r));return t}},LongUtil=class{static longToNumber(e){return long_default.isLong(e)?e.toNumber():"bigint"==typeof e?Number(e):e}static isLong(e){return long_default.isLong(e)||"bigint"==typeof e}},ShapeUtil=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static sizeFromDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(e,t,r){let n=1;for(let i=t;i<r;i++){if(e[i]<=0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");n*=e[i]}return n}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let r=Array(t);r[t-1]=1,r[t-2]=e[t-1];for(let n=t-3;n>=0;--n)r[n]=r[n+1]*e[n+1];return r}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,t,r){void 0===r&&(r=e.length);let n=0;for(let i=0;i<r;++i)n+=t[i]*e[i];return n}static offsetToIndices(e,t){let r=t.length;if(0===r)return[];if(1===r)return[e*t[0]];let n=Array(t.length);for(let r=0;r<n.length-1;++r)n[r]=Math.floor(e/t[r]),e-=n[r]*t[r];return n[n.length-1]=e,n}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(e=>this.normalizeAxis(e,t))}static incrementIndex(e,t,r){if(0===t.length||0===e.length)throw Error("Index incrementing unsupported for scalar Tensor");if(void 0===r)r=t.length;else if(r<=0||r>t.length)throw Error("Incorrect axis to increment on");for(let n=r-1;n>=0&&(e[n]++,!(e[n]<t[n]));--n)e[n]=0}static calculateReshapedDims(t,r){if(0===r.length)if(0===t.length||1===e.size(t))return[];else throw Error("cannot reshape to a scalar Tensor");let n=r.length,i=Array(n),o=-1,s=1;for(let e=0;e<n;e++){if(r[e]<-1)throw Error("a dimension in shape hints cannot be less than -1");if(-1===r[e]){if(-1!==o)throw Error("at most one dimension in shape hints can be -1");o=e}else{if(0===r[e]){if(e>=t.length)throw Error("the dimension with value zero exceeds the dimension size of the input tensor");i[e]=t[e]}else i[e]=r[e];s*=i[e]}}let a=e.size(t);if(-1!==o){if(a%s!=0)throw Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${t}] Output shape: [${r}]`);i[o]=a/s}else if(s!==a)throw Error("reshapedDims and originalDims don't have matching sizes");return i}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let r=e.length;return e.map((e,n)=>e+t[n]+t[n+r])}static areEqual(e,t){return e.length===t.length&&e.every((e,r)=>e===t[r])}static validateDimsAndCalcSize(e){if(e.length>6)throw TypeError("Only rank 0 to 6 is supported for tensor shape.");let t=1;for(let r of e){if(!Number.isInteger(r))throw TypeError(`Invalid shape: ${r} is not an integer`);if(r<0||r>0x7fffffff)throw TypeError(`Invalid shape: length ${r} is not allowed`);t*=r}return t}static flattenShape(e,t){t<0&&(t+=e.length);let r=e.reduce((e,t)=>e*t,1),n=e.slice(t).reduce((e,t)=>e*t,1);return[r/n,n]}static squeezeShape(t,r){let n=[];r=e.normalizeAxes(r,t.length);for(let e=0;e<t.length;e++){let i=r.indexOf(e)>=0;if(i&&1!==t[e])throw Error("squeeze an axis of size different than 1");(0===r.length&&t[e]>1||r.length>0&&!i)&&n.push(t[e])}return n}static unsqueezeShape(t,r){let n=Array(t.length+r.length);n.fill(0);for(let t=0;t<r.length;t++){let i=e.normalizeAxis(r[t],n.length);if(i>=n.length)throw Error("'axes' has an out of range axis");if(0!==n[i])throw Error("'axes' has a duplicate axis");n[i]=1}let i=0;for(let e=0;e<n.length;e++)0===n[e]&&(n[e]=t[i++]);if(i!==t.length)throw Error("the unsqueezed dimension could not be established");return n}},SplitUtil=class e{static splitShape(t,r,n,i){if(0===n.length){if(!i)throw Error("need to know number of outputs when the 'split' attribute is not specified");e.determineSplit(t[r],i,n)}let o=[],s=[0];for(let e=0;e<n.length;++e){0!==e&&s.push(s[e-1]+n[e-1]);let i=t.slice();i[r]=n[e],o.push(i)}return[o,s]}static determineSplit(e,t,r){if(e%t!=0)throw Error("cannot split tensor to equal sized parts");for(let n=0;n<t;++n)r.push(e/t)}},PoolConvUtil=class e{static adjustPoolAttributes(e,t,r,n,i,o){if(!e&&r.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=r.length?r.push(t[e+2]):r[e]=t[e+2];for(let e=0;e<r.length;e++)if(e<n.length){if(n[e]<0)throw Error("strides should be greater than or equal to 1")}else n.push(1);for(let e=0;e<r.length;e++)if(e<i.length){if(i[e]<0)throw Error("dilations should be greater than or equal to 1")}else i.push(1);for(let e=0;e<2*r.length;e++)if(e<o.length){if(o[e]<0)throw Error("pad should be greater than or equal to 1")}else o.push(0);for(let e=0;e<r.length;e++){if(r[e]<=0)throw Error("kernel shapes need to be greater than 0");if(o[e]>=r[e]||o[e+r.length]>=r[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,i,o,s){if(s){if(o.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let a=0;a<t.length-2;a++)e.adjustPadAndReturnShape(t[a+2],r[a],n[a],i[a],o,a,a+t.length-2,s)}}static computePoolOutputShape(t,r,n,i,o,s,a){if(r.length<=0)throw Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return e.computeShapeHelper(t,r,u,n,i,o,s,a),u}static computeConvOutputShape(t,r,n,i,o,s,a){if(t.length<=0||r.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return e.computeShapeHelper(!1,t,u,n,i,o,s,a),u}static computeShapeHelper(t,r,n,i,o,s,a,u){if(t)for(let e=0;e<r.length-2;e++)n.push(1);else for(let t=0;t<r.length-2;t++)n.push(e.adjustPadAndReturnShape(r[t+2],i[t],o[t],s[t],a,t,t+r.length-2,u))}static adjustPadAndReturnShape(e,t,r,n,i,o,s,a){let u=r*(n-1)+1;if(!a||"NOTSET"===a)return Math.floor((e+i[o]+i[s]-u)/t+1);switch(a){case"VALID":return i[o]=0,i[s]=0,Math.floor((e-u)/t+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==r)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let r=((e+t-1)/t-1)*t+n-e;return i[o]="SAME_LOWER"===a?Math.floor((r+1)/2):Math.floor(r/2),i[s]=r-i[o],Math.floor((e+r-n)/t+1)}default:throw Error("Unsupported AutoPad type")}}},MIN_CLIP=-34028234663852886e22,MAX_CLIP=34028234663852886e22}});function sizeof(e){switch(e){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw Error(`cannot calculate sizeof() on type ${e}`)}}function sizeofProto(e){switch(e){case import_onnx2.onnx.TensorProto.DataType.UINT8:case import_onnx2.onnx.TensorProto.DataType.INT8:case import_onnx2.onnx.TensorProto.DataType.BOOL:return 1;case import_onnx2.onnx.TensorProto.DataType.UINT16:case import_onnx2.onnx.TensorProto.DataType.INT16:return 2;case import_onnx2.onnx.TensorProto.DataType.FLOAT:case import_onnx2.onnx.TensorProto.DataType.INT32:case import_onnx2.onnx.TensorProto.DataType.UINT32:return 4;case import_onnx2.onnx.TensorProto.DataType.INT64:case import_onnx2.onnx.TensorProto.DataType.DOUBLE:case import_onnx2.onnx.TensorProto.DataType.UINT64:return 8;default:throw Error(`cannot calculate sizeof() on type ${import_onnx2.onnx.TensorProto.DataType[e]}`)}}function createView(e,t){return new(dataviewConstructor(t))(e)}function dataviewConstructor(e){switch(e){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw Error("unspecified error")}}function longToNumber(e,t){if(t===import_onnx2.onnx.TensorProto.DataType.INT64||t===import_tensor_data_type.TensorDataType.INT64){if(e.greaterThanOrEqual(0x80000000)||e.lessThan(-0x80000000))throw TypeError("int64 is not supported")}else if(t===import_onnx2.onnx.TensorProto.DataType.UINT32||t===import_tensor_data_type.TensorDataType.UINT32||t===import_onnx2.onnx.TensorProto.DataType.UINT64||t===import_tensor_data_type.TensorDataType.UINT64){if(e.greaterThanOrEqual(0x100000000)||e.lessThan(0))throw TypeError("uint64 is not supported")}else throw TypeError(`not a LONG type: ${import_onnx2.onnx.TensorProto.DataType[t]}`);return e.toNumber()}function readProto(e,t,r){switch(t){case import_onnx2.onnx.TensorProto.DataType.BOOL:case import_onnx2.onnx.TensorProto.DataType.UINT8:return e.getUint8(r);case import_onnx2.onnx.TensorProto.DataType.INT8:return e.getInt8(r);case import_onnx2.onnx.TensorProto.DataType.UINT16:return e.getUint16(r,!0);case import_onnx2.onnx.TensorProto.DataType.INT16:return e.getInt16(r,!0);case import_onnx2.onnx.TensorProto.DataType.FLOAT:return e.getFloat32(r,!0);case import_onnx2.onnx.TensorProto.DataType.INT32:return e.getInt32(r,!0);case import_onnx2.onnx.TensorProto.DataType.UINT32:return e.getUint32(r,!0);case import_onnx2.onnx.TensorProto.DataType.INT64:return longToNumber(long_default.fromBits(e.getUint32(r,!0),e.getUint32(r+4,!0),!1),t);case import_onnx2.onnx.TensorProto.DataType.DOUBLE:return e.getFloat64(r,!0);case import_onnx2.onnx.TensorProto.DataType.UINT64:return longToNumber(long_default.fromBits(e.getUint32(r,!0),e.getUint32(r+4,!0),!0),t);default:throw Error(`cannot read from DataView for type ${import_onnx2.onnx.TensorProto.DataType[t]}`)}}var init_tensor2=__esm({"web/lib/onnxjs/tensor.ts"(){"use strict";import_guid_typescript=__toESM(require_guid()),init_long(),init_ort_generated(),import_onnx2=__toESM(require_onnx()),init_util(),Tensor4=class e{constructor(e,t,r,n,i,o=import_guid_typescript.Guid.create()){this.dims=e,this.type=t,this.dataProvider=r,this.asyncDataProvider=n,this.cache=i,this.dataId=o,this.size=ShapeUtil.validateDimsAndCalcSize(e);let s=this.size,a=void 0===r&&void 0===n&&void 0===i;if(void 0!==i&&i.length!==s)throw RangeError("Input dims doesn't match data length.");if("string"===t){if(void 0!==i&&(!Array.isArray(i)||!i.every(e=>"string"==typeof e)))throw TypeError("cache should be a string array");a&&(this.cache=Array(s))}else{if(void 0!==i){let e=dataviewConstructor(t);if(!(i instanceof e))throw TypeError(`cache should be type ${e.name}`)}if(a){let e=new ArrayBuffer(s*sizeof(t));this.cache=createView(e,t)}}}get data(){if(void 0===this.cache){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if("string"!==this.type)throw TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw TypeError("data type is not float (float32, float64)")}}get numberData(){if("string"!==this.type)return this.data;throw TypeError("type cannot be non-number (string)")}get(e){return this.data[ShapeUtil.indicesToOffset(e,this.strides)]}set(e,t){this.data[ShapeUtil.indicesToOffset(e,this.strides)]=t}async getData(){return void 0===this.cache&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=ShapeUtil.computeStrides(this.dims)),this._strides}static fromProto(t){if(!t)throw Error("cannot construct Value from an empty tensor");let r=ProtoUtil.tensorDataTypeFromProto(t.dataType),n=new e(ProtoUtil.tensorDimsFromProto(t.dims),r);if("string"===r)t.stringData.forEach((e,t)=>{n.data[t]=decodeUtf8String(e)});else if(t.rawData&&"number"==typeof t.rawData.byteLength&&t.rawData.byteLength>0){let e=n.data,r=new DataView(t.rawData.buffer,t.rawData.byteOffset,t.rawData.byteLength),i=sizeofProto(t.dataType),o=t.rawData.byteLength/i;if(t.rawData.byteLength%i!=0)throw Error("invalid buffer length");if(e.length!==o)throw Error("buffer length mismatch");for(let n=0;n<o;n++){let o=readProto(r,t.dataType,n*i);e[n]=o}}else{let e;switch(t.dataType){case import_onnx2.onnx.TensorProto.DataType.FLOAT:e=t.floatData;break;case import_onnx2.onnx.TensorProto.DataType.INT32:case import_onnx2.onnx.TensorProto.DataType.INT16:case import_onnx2.onnx.TensorProto.DataType.UINT16:case import_onnx2.onnx.TensorProto.DataType.INT8:case import_onnx2.onnx.TensorProto.DataType.UINT8:case import_onnx2.onnx.TensorProto.DataType.BOOL:e=t.int32Data;break;case import_onnx2.onnx.TensorProto.DataType.INT64:e=t.int64Data;break;case import_onnx2.onnx.TensorProto.DataType.DOUBLE:e=t.doubleData;break;case import_onnx2.onnx.TensorProto.DataType.UINT32:case import_onnx2.onnx.TensorProto.DataType.UINT64:e=t.uint64Data;break;default:throw Error("unspecific error")}if(null==e)throw Error("failed to populate data from a tensorproto value");let r=n.data;if(r.length!==e.length)throw Error("array length mismatch");for(let n=0;n<e.length;n++){let i=e[n];long_default.isLong(i)?r[n]=longToNumber(i,t.dataType):r[n]=i}}return n}static fromData(t,r,n){return new e(r,n,void 0,void 0,t)}static fromOrtTensor(t){if(!t)throw Error("cannot construct Value from an empty tensor");let r=ProtoUtil.tensorDimsFromORTFormat(t),n=ProtoUtil.tensorDataTypeFromProto(t.dataType()),i=new e(r,n);if("string"===n)for(let e=0;e<t.stringDataLength();e++)i.data[e]=t.stringData(e);else if(t.rawDataArray()&&"number"==typeof t.rawDataLength()&&t.rawDataLength()>0){let e=i.data,r=new DataView(t.rawDataArray().buffer,t.rawDataArray().byteOffset,t.rawDataLength()),n=sizeofProto(t.dataType()),o=t.rawDataLength()/n;if(t.rawDataLength()%n!=0)throw Error("invalid buffer length");if(e.length!==o)throw Error("buffer length mismatch");for(let i=0;i<o;i++){let o=readProto(r,t.dataType(),i*n);e[i]=o}}return i}}}});function getGlsl(e){return 1===e?GLSL_ES_2_0:GLSL_ES_3_0}function getVertexShaderSource(e){let t=getGlsl(e);return`${t.version}
      precision highp float;
      ${t.attribute} vec3 position;
      ${t.attribute} vec2 textureCoord;

      ${t.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function getFragShaderPreamble(e){let t=getGlsl(e);return`${t.version}
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

    `}function getDefaultFragShaderMain(e,t){let r=getGlsl(e);return`
  void main() {
    int indices[${t}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${r.output} = result;
  }
  `}var init_glsl_source=__esm({"web/lib/onnxjs/backends/webgl/glsl-source.ts"(){"use strict";GLSL_ES_2_0={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},GLSL_ES_3_0={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}}}),init_types=__esm({"web/lib/onnxjs/backends/webgl/types.ts"(){}});async function repeatedTry(e,t=e=>0,r){return new Promise((n,i)=>{let o=0,s=()=>{if(e())return void n();let a=t(++o);null!=r&&o>=r?i():setTimeout(s,a)};s()})}function generateShaderFuncNameFromInputSamplerName(e){return assert(void 0!==e&&0!==e.length,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)}function generateShaderFuncNameFromInputSamplerNameAtOutCoords(e){return assert(void 0!==e&&0!==e.length,()=>"empty string found for sampler name"),"get"+e.charAt(0).toUpperCase()+e.slice(1)+"AtOutCoords"}function squeezeInputShape(e,t){JSON.parse(JSON.stringify(e));return t}function getSqueezedParams(e,t){return t.map(t=>e[t]).join(", ")}function getCoordsDataType(e){if(e<=1)return"int";if(2===e)return"ivec2";if(3===e)return"ivec3";if(4===e)return"ivec4";if(5===e)return"ivec5";else if(6===e)return"ivec6";else throw Error(`GPU for rank ${e} is not yet supported`)}function getGlChannels(e=6){return["x","y","z","w","u","v"].slice(0,e)}var init_utils=__esm({"web/lib/onnxjs/backends/webgl/utils.ts"(){"use strict";init_util()}});function getVecChannels(e,t){return getGlChannels(t).map(t=>`${e}.${t}`)}function getChannels(e,t){return 1===t?[e]:getVecChannels(e,t)}function unpackFromChannel(){return`
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
  `}var init_packing_utils=__esm({"web/lib/onnxjs/backends/webgl/ops/packing-utils.ts"(){"use strict";init_utils()}});function getOutOfBoundsCondition(e,t,r){if(0===e)return"false";if(1===e)return`rc > ${t[0]}`;let n="";for(let i=e-2;i<e;i++)n+=`${r[i]} >= ${t[i-e+2]}`,i<e-1&&(n+="||");return n}function getOutput(e,t){let r=e.length;if(0===r)return"getA(), 0, 0, 0";if(1===r)return`getA(rc),
            rc + 1 >= ${e[0]} ? 0. : getA(rc + 1),
            0, 0`;let n="r, c",i="r, cp1",o="rp1, c",s="rp1, cp1",a="";if(r>2)for(let e=0;e<r-2;++e)a+=`${t[e]},`;return`getA(${a}${n}),
          rEdge ? 0. : getA(${a}${o}),
          cEdge ? 0. : getA(${a}${i}),
          rEdge || cEdge ? 0. : getA(${a}${s})`}function getSetup(e,t,r,n){return 0===e||1===e?"":`
    int r = ${t[e-2]};
    int c = ${t[e-1]};
    int rp1 = ${t[e-2]} + 1;
    int cp1 = ${t[e-1]} + 1;
    bool rEdge = rp1 >= ${n};
    bool cEdge = cp1 >= ${r};
    `}var init_pack=__esm({"web/lib/onnxjs/backends/webgl/ops/pack.ts"(){"use strict";init_glsl_source(),init_types(),init_utils(),init_packing_utils(),packProgramMetadata={name:"pack",inputNames:["A"],inputTypes:[1]},createPackProgramInfo=(e,t)=>{let r,n=getGlsl(e.session.backend.glContext.version),i=t.dims,o=i.length,s=t.dims.length,a=getCoordsDataType(s),u=getChannels("rc",s),l=getSetup(s,u,i[i.length-2],i[i.length-1]);r=0===o?[1,1]:1===o?[i[0],1]:[i[s-1],i[s-2]];let d=getOutOfBoundsCondition(s,r,u),p=getOutput(i,u),c=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${d}) {
            ${n.output} = vec4(0);
          } else {
            ${l}

            ${n.output} = vec4(${p});
          }
        }
      `;return{...packProgramMetadata,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:2},shaderSource:c}},createPackProgramInfoLoader=(e,t)=>({...packProgramMetadata,get:()=>createPackProgramInfo(e,t)})}});function processDims3D(e){if(0===e.length)return[1,1,1];let t=1;for(let r=0;r<e.length-2;++r)t*=e[r];return[t,e.length>1?e[e.length-2]:1,e[e.length-1]]}function isReshapeCheap(e,t){return 0===e.length||0===t.length||(e.length<2||t.length<2?e[e.length-1]===t[t.length-1]:e[e.length-1]===t[t.length-1]&&e[e.length-2]===t[t.length-2])}function getReshapedInputCoords(e){let t=ShapeUtil.computeStrides(e),r=["b","r","c"],n="index",i=t.map((e,i)=>{let o=`int ${r[i]} = ${n} / ${e}`,s=i===t.length-1?`int ${r[i+1]} = ${n} - ${r[i]} * ${e}`:`index -= ${r[i]} * ${e}`;return`${o}; ${s};`}).join("");return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${i}
      return ivec3(b, r, c);
    }
  `}function getFlattenedIndexFrom3D(e){let t=ShapeUtil.computeStrides(e);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${t[0]} + coords.z * ${t[1]} + coords.y;
  }
`}var init_reshape_packed=__esm({"web/lib/onnxjs/backends/webgl/ops/reshape-packed.ts"(){"use strict";init_util(),init_glsl_source(),init_types(),init_packing_utils(),createPackedReshape3DProgramMetadata=e=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${e}`}),createPackedReshape3DProgramInfo=(e,t,r,n)=>{let i=t.dims,o=n,s="";for(let e=0;e<4;e++){let t="";switch(e){case 0:t="outputCoords = rc;";break;case 1:t="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:t="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:t="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw Error()}s+=`
        ${t}
        ${e>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${e}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${e>0?"}":""}
      `}let a=getGlsl(e.session.backend.glContext.version),u=`
      ${getReshapedInputCoords(i)}
      ${getFlattenedIndexFrom3D(o)}
      ${unpackFromChannel()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${o[2]};
        int cols = ${o[1]};

        ${s}
        ${a.output} = result;
      }
    `;return{...r,output:{dims:o,type:t.type,textureType:2},shaderSource:u,hasMain:!0}},createPackedReshape3DProgramInfoLoader=(e,t,r)=>{let n=createPackedReshape3DProgramMetadata(r);return{...n,get:()=>createPackedReshape3DProgramInfo(e,t,n,r)}}}}),init_uint8_encode=__esm({"web/lib/onnxjs/backends/webgl/ops/uint8-encode.ts"(){"use strict";init_glsl_source(),init_types(),encodeAsUint8=(e,t)=>{let r=t.shape,n=getGlsl(e.session.backend.glContext.version),i=`
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
    }`,o={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:r,type:t.tensor.type,textureType:3},shaderSource:i,hasMain:!0};return e.executeProgram(o,[t.tensor])}}});function getSourceCoords(e,t){if(1===e)return"rc";let r="";for(let n=0;n<e;n++)r+=t[n],n<e-1&&(r+=",");return r}var init_unpack=__esm({"web/lib/onnxjs/backends/webgl/ops/unpack.ts"(){"use strict";init_glsl_source(),init_types(),init_utils(),init_packing_utils(),unpackProgramMetadata={name:"unpack",inputNames:["A"],inputTypes:[2]},createUnpackProgramInfo=(e,t)=>{let r=t.dims.length,n=getChannels("rc",r),i=n.slice(-2),o=getCoordsDataType(r),s=unpackFromChannel(),a=0===t.dims.length?"":getSourceCoords(r,n),u=r<=1?"rc":`vec2(${i.join(",")})`,l=getGlsl(e.session.backend.glContext.version),d=`
    ${s}
    void main() {
      ${o} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${a});

       ${l.output} = vec4(getChannel(packedInput, ${u}), 0, 0, 0);
     }
   `;return{...unpackProgramMetadata,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:d}},createUnpackProgramInfoLoader=(e,t)=>({...unpackProgramMetadata,get:()=>createUnpackProgramInfo(e,t)})}}),init_texture_data_encoder=__esm({"web/lib/onnxjs/backends/webgl/texture-data-encoder.ts"(){"use strict";init_instrument(),RedFloat32DataEncoder=class{constructor(e,t=1){if(1===t)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=t;else if(4===t)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=t;else throw Error(`Invalid number of channels: ${t}`)}encode(e,t){let r,n;return e.constructor!==Float32Array&&(Logger.warning("Encoder","data was not of type Float32; creating new Float32Array"),n=new Float32Array(e)),t*this.channelSize>e.length?(Logger.warning("Encoder","Source data too small. Allocating larger array"),n=e,r=this.allocate(t*this.channelSize),n.forEach((e,t)=>r[t]=e)):r=n=e,r}allocate(e){return new Float32Array(4*e)}decode(e,t){return 1===this.channelSize?e.filter((e,t)=>t%4==0).subarray(0,t):e.subarray(0,t)}},RGBAFloatDataEncoder=class{constructor(e,t=1,r){if(1!==t&&4!==t)throw Error(`Invalid number of channels: ${t}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=t,this.textureType=r||e.FLOAT}encode(e,t){let r=e;return 1===this.channelSize&&(Logger.verbose("Encoder","Exploding into a larger array"),r=this.allocate(t),e.forEach((e,t)=>r[4*t]=e)),r}allocate(e){return new Float32Array(4*e)}decode(e,t){return 1===this.channelSize?e.filter((e,t)=>t%4==0).subarray(0,t):e.subarray(0,t)}},Uint8DataEncoder=class{constructor(e,t=1){if(this.channelSize=4,1===t)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else if(4===t)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=t;else throw Error(`Invalid number of channels: ${t}`)}encode(e,t){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,t){if(e instanceof Uint8Array)return e.subarray(0,t);throw Error(`Invalid array type: ${e.constructor}`)}}}}),init_texture_layout=__esm({"web/lib/onnxjs/backends/webgl/texture-layout.ts"(){"use strict";init_util(),init_types(),createTextureLayoutFromTextureType=(e,t,r)=>{let n=0===r||1===r?1:4,i=2===r,o=1===r||2===r,s=4===r?t.length-1:void 0,a=4===r?t.map((e,r)=>r===t.length-1?4*e:e):void 0;return createTextureLayoutFromShape(e,t,n,a,{isPacked:i,reverseWH:o,breakAxis:s})},calculateTextureWidthAndHeight=(e,t,r)=>{let n=createTextureLayoutFromTextureType(e,t,r);return[n.width,n.height]},createTextureLayoutFromShape=(e,t,r=1,n,i)=>{let o=!!(i&&i.isPacked),[s,a]=e.computeTextureWH(o&&n||t,i),u=t.length,l=t.slice(0);if(0===u&&(l=[1]),1===r)n=t;else if(o){if(4!==r)throw Error("a packed texture must be 4-channel");n=t,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!n)throw Error("Unpacked shape is needed when using channels > 1");return{width:s,height:a,channels:r,isPacked:o,shape:l,strides:ShapeUtil.computeStrides(l),unpackedShape:n,reversedWH:i&&i.reverseWH}}}}),init_inference_handler=__esm({"web/lib/onnxjs/backends/webgl/inference-handler.ts"(){"use strict";init_instrument(),init_tensor2(),init_util(),init_pack(),init_reshape_packed(),init_uint8_encode(),init_unpack(),init_texture_data_encoder(),init_texture_layout(),init_types(),getProgramInfoUniqueKey=(e,t)=>{let r=t.map(e=>`${e.unpackedShape.join(",")};${e.width}x${e.height}`).join("_"),n=e.name;return e.cacheHint&&(n+="["+e.cacheHint+"]"),n+=":"+r},WebGLInferenceHandler=class{constructor(e){this.session=e,this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,t){return calculateTextureWidthAndHeight(this.session.layoutStrategy,e,t)}executeProgram(e,t){if(t.length<e.inputNames.length)throw Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw Error("input names size does not match input types");let r=[];for(let n=0;n<e.inputNames.length;++n)r[n]=this.getOrCreateTextureData(t[n],e.inputTypes[n]);let n=getProgramInfoUniqueKey(e,r),i=this.session.programManager.getArtifact(n),o=i?i.programInfo:"function"==typeof e.get?e.get():e,s=createTextureLayoutFromTextureType(this.session.layoutStrategy,o.output.dims,o.output.textureType),a=this.createTextureData(s,o.output.type);return i||(i=this.session.programManager.build(o,r,a),this.session.programManager.setArtifact(n,i)),this.runProgram(i,r,a),a}run(e,t){return this.executeProgram(e,t).tensor}runProgram(e,t,r){for(let r=0;r<t.length;++r)if(!!t[r].isPacked!=(2===e.programInfo.inputTypes[r]))throw Error(`input[${r}] property packed inconsistent`);if(!!r.isPacked!=(2===e.programInfo.output.textureType))throw Error("output property packed inconsistent");this.session.programManager.run(e,t,r)}getOrCreateTextureData(e,t){let r=this.getTextureData(e.dataId,2===t);if(!r&&(r=this.getTextureData(e.dataId,2!==t)))if(2===t)return this.pack(r);else return this.unpack(r);if(!r){let n=createTextureLayoutFromTextureType(this.session.layoutStrategy,e.dims,t);if(4===t){let r=1,n=4,i=e.dims;if(4===i.length){let o=[i[0],Math.ceil(i[1]*i[2]*i[3]/n)],s=createTextureLayoutFromTextureType(this.session.layoutStrategy,o,t),a=e.numberData;if(i[1]*i[2]*i[3]%n!=0){let t=i[0],o=i[1]*i[2]*i[3],s=Math.ceil(o*r/n)*n;a=new Float32Array(t*s);for(let n=0;n<t;++n){let t=n*o,i=n*s+n%r*o;a.set(e.numberData.subarray(t,t+o),i)}}return this.createTextureData(s,e.type,a,e,1)}}if(2===t){let t=createTextureLayoutFromShape(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),n=this.createTextureData(t,e.type,e.numberData,e,1);r=this.pack(n)}else r=this.createTextureData(n,e.type,e.numberData,e,1)}return r}createTextureDataFromLayoutBindTensor(e,t,r,n){return this.createTextureData(e,t,r,n,1)}createTextureData(e,t,r,n,i){Logger.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let o=this.session.textureManager.createTextureFromLayout(t,e,r,i);return this.createTextureDataFromTexture(e,t,o,n)}reshapeUnpacked(e,t){let r=this.getOrCreateTextureData(e,0),n={channels:r.channels,height:r.height,width:r.width,shape:0!==t.length?t:[1],strides:ShapeUtil.computeStrides(t),unpackedShape:t};return this.createTextureDataFromTexture(n,e.type,r.texture).tensor}reshapePacked(e,t){let r=this.getOrCreateTextureData(e,2);if(isReshapeCheap(e.dims,t)){let n={channels:r.channels,height:r.height,width:r.width,shape:0!==t.length?t:[1],strides:ShapeUtil.computeStrides(t),unpackedShape:t,isPacked:!0};return this.createTextureDataFromTexture(n,e.type,r.texture).tensor}let n=processDims3D(e.dims),i=processDims3D(t),o=this.reshapePacked(e,n),s=this.run(createPackedReshape3DProgramInfoLoader(this,o,i),[o]);return this.reshapePacked(s,t)}cast(e,t){let r=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(r,t,r.texture).tensor}createTextureDataFromTexture(e,t,r,n,i){let o={...e,tensor:n||new Tensor4(e.unpackedShape,t,e=>this.readTexture(o),async e=>this.readTextureAsync(o),void 0,i),texture:r};return this.setTextureData(o.tensor.dataId,o,e.isPacked),o}getTextureData(e,t=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,t):t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,r=!1){this.session.isInitializer(e)?this.session.setTextureData(e,t,r):(r?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,t)}isTextureLayoutCached(e,t=!1){return!!this.getTextureData(e.dataId,t)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(encodeAsUint8(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(encodeAsUint8(this,e))}pack(e){return this.executeProgram(createPackProgramInfoLoader(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(createUnpackProgramInfoLoader(this,e.tensor),[e.tensor])}}}}),init_attribute_with_cache_key=__esm({"web/lib/onnxjs/attribute-with-cache-key.ts"(){"use strict";AttributeWithCacheKeyImpl=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},createAttributeWithCacheKey=e=>new AttributeWithCacheKeyImpl(e)}}),init_batch_normalization=__esm({"web/lib/onnxjs/backends/webgl/ops/batch-normalization.ts"(){"use strict";init_attribute_with_cache_key(),init_glsl_source(),init_types(),batchNormalizationProgramMetadata={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},batchNormalization=(e,t,r)=>(validateInputs(t),[e.run({...batchNormalizationProgramMetadata,cacheHint:r.cacheKey,get:()=>createBatchNormalizationProgramInfo(e,t,r)},t)]),parseBatchNormalizationAttributes=e=>{let t=e.attributes.getFloat("epsilon",1e-5),r=e.attributes.getFloat("momentum",.9),n=e.attributes.getInt("spatial",1);return createAttributeWithCacheKey({epsilon:t,momentum:r,spatial:n})},createBatchNormalizationProgramInfo=(e,t,r)=>{let n=getGlsl(e.session.backend.glContext.version),i=t[0].dims.length,[o,s]=e.calculateTextureWidthAndHeight(t[1].dims,0),a=`
  float process(int[${i}] indices) {
    vec2 position = offsetToCoords(indices[1], ${o}, ${s});
    float scale = getColorAsFloat(${n.texture2D}(Scale, position));
    float mean = getColorAsFloat(${n.texture2D}(Mean, position));
    float variance = getColorAsFloat(${n.texture2D}(Variance, position));
    float b = getColorAsFloat(${n.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${r.epsilon})) ) + b;
  }`;return{...batchNormalizationProgramMetadata,output:{dims:t[0].dims,type:t[0].type,textureType:0},shaderSource:a}},validateInputs=e=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs.");let t=e[0],r=e[1],n=e[2],i=e[3],o=e[4];if(t.dims.length<3||1!==r.dims.length||1!==n.dims.length||1!==i.dims.length||1!==o.dims.length||r.dims[0]!==t.dims[1]||n.dims[0]!==t.dims[1]||i.dims[0]!==t.dims[1]||o.dims[0]!==t.dims[1])throw Error("invalid input shape.");if("float32"!==t.type&&"float64"!==t.type||"float32"!==r.type&&"float64"!==r.type||"float32"!==n.type&&"float64"!==n.type||"float32"!==i.type&&"float64"!==i.type||"float32"!==o.type&&"float64"!==o.type)throw Error("invalid input tensor types.")}}}),init_glsl_definitions=__esm({"web/lib/onnxjs/backends/webgl/glsl-definitions.ts"(){"use strict";GlslContext=class{constructor(e,t,r,n){this.glContext=e,this.programInfo=t,this.inputTextureLayouts=r,this.outputTextureLayout=n}},GlslLib=class{constructor(e){this.context=e}},GlslLibRoutine=class{constructor(e,t){this.routineBody=e,this.dependencies=t}},GlslLibRoutineNode=class{constructor(e,t,r){this.name=e,r?this.dependencies=r:this.dependencies=[],t&&(this.routineBody=t)}addDependency(e){e&&this.dependencies.push(e)}},TopologicalSortGlslRoutines=class{static returnOrderedNodes(e){if(!e||0===e.length)return[];if(1===e.length)return e;let t=new Set,r=new Set,n=[];return this.createOrderedNodes(e,t,r,n),n}static createOrderedNodes(e,t,r,n){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],t,r,n)}static dfsTraverse(e,t,r,n){if(!e||r.has(e.name))return;if(t.has(e.name))throw Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");t.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let e=0;e<i.length;++e)this.dfsTraverse(i[e],t,r,n);n.push(e),r.add(e.name),t.delete(e.name)}}}});function glslAdd(){let e="add_";return{body:`
  float ${e}(float a, float b) {
    return a + b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:e,type:0}}function glslDiv(){let e="div_";return{body:`
  float ${e}(float a, float b) {
    return a / b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:e,type:0}}function glslMul(){let e="mul_";return{body:`
  float ${e}(float a, float b) {
    return a * b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:e,type:0}}function glslSub(){let e="sub_";return{body:`
  float ${e}(float a, float b) {
    return a - b;
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:e,type:0}}function glslEqual(){let e="equal_";return{body:`
  float ${e}(float a, float b) {
    return float(a == b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:e,type:0}}function glslGreater(){let e="greater_";return{body:`
  float ${e}(float a, float b) {
    return float(a > b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:e,type:0}}function glslLess(){let e="less_";return{body:`
  float ${e}(float a, float b) {
    return float(a < b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:e,type:0}}function glslAnd(){let e="and_";return{body:`
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
  `,name:e,type:0}}function glslOr(){let e="or_";return{body:`
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
  `,name:e,type:0}}function glslXor(){let e="xor_";return{body:`
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
  `,name:e,type:0}}function glslPow(){return glslBuiltinBinary("pow")}function glslPRelu(){let e="prelu_";return{body:`
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
  `,name:e,type:0}}function glslBuiltinBinary(e){let t=`${e}_`;return{body:`
  float ${t}(float a, float b) {
    return ${e}(a, b);
  }
  vec4 ${t}(vec4 v1, vec4 v2) {
    return ${e}(v1, v2);
  }
  `,name:t,type:0}}var init_binary_op=__esm({"web/lib/onnxjs/backends/webgl/ops/binary-op.ts"(){"use strict";init_util(),init_glsl_definitions(),init_glsl_source(),init_types(),createBinaryProgramInfoLoader=(e,t,r,n=t[0].type,i)=>{let o=2*!!e.session.pack;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],cacheHint:i,get:()=>createBinaryProgramInfo(e,t,r,n)}},createBinaryProgramInfo=(e,t,r,n=t[0].type)=>{let i=2*!!e.session.pack,o=!ShapeUtil.areEqual(t[0].dims,t[1].dims),s=t[0].dims,a=e.session.pack;if(o){let o=BroadcastUtil.calcShape(t[0].dims,t[1].dims,!1);if(!o)throw Error("Can't perform binary op on the given tensors");let u=(s=o).length,l=0!==t[0].dims.length?t[0].dims.length:1,d=0!==t[1].dims.length?t[1].dims.length:1,p=0!==t[0].dims.length?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",c=0!==t[1].dims.length?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",h=getGlsl(e.session.backend.glContext.version),f=a?`
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
      }`;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],output:{dims:s,type:n,textureType:i},shaderSource:f,hasMain:a}}let u=getGlsl(e.session.backend.glContext.version),l=`
    ${r.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${r.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],output:{dims:t[0].dims,type:n,textureType:i},shaderSource:l,hasMain:!0}},add2=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslAdd()),t)],and2=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslAnd(),"bool"),t)],div=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslDiv()),t)],equal=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslEqual(),"bool"),t)],greater=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslGreater(),"bool"),t)],less=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslLess(),"bool"),t)],mul=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslMul()),t)],or2=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslOr(),"bool"),t)],pow=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslPow()),t)],pRelu=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslPRelu()),t)],sub=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslSub()),t)],xor2=(e,t)=>[e.run(createBinaryProgramInfoLoader(e,t,glslXor(),"bool"),t)]}}),init_cast=__esm({"web/lib/onnxjs/backends/webgl/ops/cast.ts"(){"use strict";init_util(),cast=(e,t,r)=>(validateInputs2(t),[e.cast(t[0],r)]),parseCastAttributes=e=>ProtoUtil.tensorDataTypeFromProto(e.attributes.getInt("to")),validateInputs2=e=>{if(!e||1!==e.length)throw Error("Cast requires 1 input.");if("string"===e[0].type)throw Error("Invalid input type.")}}}),init_concat_packed=__esm({"web/lib/onnxjs/backends/webgl/ops/concat-packed.ts"(){"use strict";init_glsl_source(),init_types(),init_utils(),init_packing_utils(),createPackedConcatProgramMetadata=(e,t)=>({name:"Concat (packed)",inputNames:Array.from({length:e},(e,t)=>`X${t}`),inputTypes:Array(e).fill(2),cacheHint:t}),createPackedConcatProgramInfo=(e,t,r,n)=>{let i=r[0].dims.slice();if(n>=i.length||n<-1*i.length)throw Error("axis specified for concat doesn't match input dimensionality");n<0&&(n=i.length+n);let o=i.slice(0);for(let e=1;e<r.length;e++){let t=r[e].dims.slice();for(let e=0;e<i.length;e++)if(e===n)o[n]+=t[e];else if(i[e]!==t[e])throw Error("non concat dimensions must match")}let s=o.length,a=getChannels("coords",s),u=getCoordsDataType(s),l=unpackFromChannel(),d=r.map(e=>e.dims),p=getGlChannels(s),c=Array(d.length-1);c[0]=d[0][n];for(let e=1;e<c.length;e++)c[e]=c[e-1]+d[e][n];let h=p[n],f=p.slice(-2),m=p.join(),g=`if (${h} < ${c[0]}) {
        return getChannel(
            getX0(${m}), vec2(${f.join()}));
        }`;for(let e=1;e<c.length;e++){let t=c[e-1];g+=`
            if (${h} < ${c[e]}  && ${h} >= ${c[e-1]}) {
              return getChannel(
                getX${e}(${getShiftedChannelsSnippet(p,h,t)}),
                vec2(${getShiftedChannelsSnippet(f,h,t)}));
            }`}let b=c.length,y=c[c.length-1];g+=`
            return getChannel(
              getX${b}(${getShiftedChannelsSnippet(p,h,y)}),
              vec2(${getShiftedChannelsSnippet(f,h,y)}));`;let _=getGlsl(e.session.backend.glContext.version),x=`
          ${l}
          float getValue(${p.map(e=>"int "+e)}) {
            ${g}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${p[s-1]};
            coords.${p[s-1]} = coords.${p[s-2]};
            coords.${p[s-2]} = lastDim;

            vec4 result = vec4(getValue(${a}), 0., 0., 0.);

            ${a[s-1]} = ${a[s-1]} + 1;
            if (${a[s-1]} < ${o[s-1]}) {
              result.g = getValue(${a});
            }

            ${a[s-2]} = ${a[s-2]} + 1;
            if (${a[s-2]} < ${o[s-2]}) {
              result.a = getValue(${a});
            }

            ${a[s-1]} = ${a[s-1]} - 1;
            if (${a[s-2]} < ${o[s-2]} &&
                ${a[s-1]} < ${o[s-1]}) {
              result.b = getValue(${a});
            }
            ${_.output} = result;
          }
        `;return{...t,output:{dims:o,type:r[0].type,textureType:2},shaderSource:x,hasMain:!0}},createPackedConcatProgramInfoLoader=(e,t,r)=>{let n=createPackedConcatProgramMetadata(t.length,r.cacheKey);return{...n,get:()=>createPackedConcatProgramInfo(e,n,t,r.axis)}},getShiftedChannelsSnippet=(e,t,r)=>{let n=e.indexOf(t);return e.map((e,t)=>t===n?`${e} - ${r}`:e).join()}}}),init_concat=__esm({"web/lib/onnxjs/backends/webgl/ops/concat.ts"(){"use strict";init_attribute_with_cache_key(),init_types(),init_concat_packed(),concat=(e,t,r)=>(validateInputs3(t),e.session.pack&&t[0].dims.length>1)?[e.run(createPackedConcatProgramInfoLoader(e,t,r),t)]:[e.run(createUnpackedConcatProgramInfoLoader(e,t,r),t)],createUnpackedConcatProgramMetadata=(e,t)=>({name:"Concat",inputNames:Array.from({length:e},(e,t)=>`X${t}`),inputTypes:Array(e).fill(0),cacheHint:t}),createUnpackedConcatProgramInfo=(e,t,r,n)=>{let i=r[0].dims.slice();if(n>=i.length||n<-1*i.length)throw Error("axis specified for concat doesn't match input dimensionality");n<0&&(n=i.length+n);let o=i.slice(0);for(let e=1;e<r.length;e++){let t=r[e].dims.slice();for(let e=0;e<i.length;e++)if(e===n)o[n]+=t[e];else if(i[e]!==t[e])throw Error("non concat dimensions must match")}let s=o.length,a=Array(r.length),u=0;for(let e=0;e<a.length;++e)u+=r[e].dims[n],a[e]=u;let l="";l=r.length<5?getTextureIndexWhereDataResidesLinearSearch(a):getTextureIndexWhereDataResidesBinarySearch(a);let d=getFetchDataFromCorrectTextureMethod(r.length,s),p=getGetSizeInConcatAxisValueFromIndexMethod(a),c=`
        ${d}
        ${p}
        ${l}
        float process(int indices[${s}]) {
          int textureIndex = getTextureWhereDataResides (indices[${n}]);

          if(textureIndex != 0) {
            indices[${n}] = indices[${n}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...t,output:{dims:o,type:r[0].type,textureType:0},shaderSource:c}},createUnpackedConcatProgramInfoLoader=(e,t,r)=>{let n=createUnpackedConcatProgramMetadata(t.length,r.cacheKey);return{...n,get:()=>createUnpackedConcatProgramInfo(e,n,t,r.axis)}},getTextureIndexWhereDataResidesLinearSearch=e=>{let t=e.map((e,t)=>`if(index<${e}) {return ${t};}
`);return`int getTextureWhereDataResides(int index) {
      ${t.join("")}
    }`},getTextureIndexWhereDataResidesBinarySearch=e=>getTextureIndexWhereDataResidesLinearSearch(e),getFetchDataFromCorrectTextureMethod=(e,t)=>{let r=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${t}]) {`];for(let t=0;t<e;++t)0===t?r.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===e-1?r.push(`	else { return _X${t}(indices); }`):r.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return r.push("	}"),r.join("\n")},getGetSizeInConcatAxisValueFromIndexMethod=e=>{let t=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let r=0;r<e.length;++r)0===r?t.push(`	if (index == ${r}) { return ${e[r]}; }`):r===e.length-1?t.push(`	else { return ${e[r]}; }`):t.push(`	else if (index == ${r}) { return ${e[r]}; }`);return t.push("	}"),t.join("\n")},parseConcatAttributes=e=>createAttributeWithCacheKey({axis:e.attributes.getInt("axis")}),validateInputs3=e=>{if(!e||e.length<1)throw Error("too few inputs");let t=e[0].type,r=e[0].dims.length;if("string"===t)throw Error("string tensor is not supported yet");for(let n of e){if(n.type!==t)throw Error("input tensors should be one type");if(n.dims.length!==r)throw Error("input tensors should have the same shape")}}}});function glslAbs(){return glslBuiltinUnary("abs")}function glslAcos(){return glslBuiltinUnary("acos")}function glslAsin(){return glslBuiltinUnary("asin")}function glslAtan(){return glslBuiltinUnary("atan")}function glslCeil(){return glslBuiltinUnary("ceil")}function glslCos(){return glslBuiltinUnary("cos")}function glslElu(e){let t="elu";return{body:`
  const float alpha = float(${e});

  float ${t}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function glslExp(){return glslBuiltinUnary("exp")}function glslFloor(){return glslBuiltinUnary("floor")}function glslClip(e,t){let r="clip";return{body:`
  const float min = float(${e});
  const float max = float(${t});

  float ${r}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${r}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:r,type:0}}function glslIdentity(){let e="indentity";return{body:`
  float ${e}_(float a) {
    return a;
  }
  vec4 ${e}_(vec4 v) {
    return v;
  }
  `,name:e,type:0}}function glslLeakyRelu(e){let t="leakyRelu";return{body:`
  const float alpha = float(${e});

  float ${t}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function glslLog(){return glslBuiltinUnary("log")}function glslNeg(){let e="neg";return{body:`
  float ${e}_(float a) {
    return -a;
  }
  vec4 ${e}_(vec4 v) {
    return -v;
  }
  `,name:e,type:0}}function glslNot(){let e="not";return{body:`
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
  `,name:e,type:0}}function glslSin(){return glslBuiltinUnary("sin")}function glslRelu(){let e="relu";return{body:`
  float ${e}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${e}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:e,type:0}}function glslSigmoid(){let e="sigmoid";return{body:`
  float ${e}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${e}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:e,type:0}}function glslSqrt(){return glslBuiltinUnary("sqrt")}function glslTan(){return glslBuiltinUnary("tan")}function glslTanh(){let e="tanh";return{body:`
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
  `,name:e,type:0}}function glslBuiltinUnary(e){return{body:`
  float ${e}_(float a) {
    return ${e}(a);
  }
  vec4 ${e}_(vec4 v) {
    return ${e}(v);
  }
  `,name:e,type:0}}var init_unary_op=__esm({"web/lib/onnxjs/backends/webgl/ops/unary-op.ts"(){"use strict";init_attribute_with_cache_key(),init_util(),init_glsl_definitions(),init_glsl_source(),init_types(),createElementwiseProgramInfo=(e,t,r,n)=>{let i=2*!!e.session.pack,o=getGlsl(e.session.backend.glContext.version);return{...t,output:{dims:r.dims,type:r.type,textureType:i},shaderSource:`
     ${n.body}
     void main() {
       vec4 v = ${o.texture2D}(A, TexCoords);
       v = ${n.name}_(v);
       ${o.output} = v;
     }
     `,hasMain:!0}},createElementwiseProgramInfoLoader=(e,t,r,n)=>{let i=2*!!e.session.pack,o={name:r.name,inputTypes:[i],inputNames:["A"],cacheHint:n};return{...o,get:()=>createElementwiseProgramInfo(e,o,t,r)}},abs=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslAbs()),t)],acos=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslAcos()),t)],asin=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslAsin()),t)],atan=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslAtan()),t)],clip=(e,t,r)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslClip(r.min,r.max),r.cacheKey),t)],parseClipAttributes=e=>createAttributeWithCacheKey({min:e.attributes.getFloat("min",MIN_CLIP),max:e.attributes.getFloat("max",MAX_CLIP)}),clipV11=(e,t)=>{let r=generateClipAttributesFromInputs(e,t);return clip(e,[t[0]],r)},generateClipAttributesFromInputs=(e,t)=>{if(t.length>=3&&(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)))throw Error("dynamic clip attributes are not allowed");let r=t.length>=3?t[1].numberData[0]:MIN_CLIP,n=t.length>=3?t[2].numberData[0]:MAX_CLIP;return createAttributeWithCacheKey({min:r,max:n})},ceil=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslCeil()),t)],cos=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslCos()),t)],elu=(e,t,r)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslElu(r.alpha),r.cacheKey),t)],parseEluAttributes=e=>createAttributeWithCacheKey({alpha:e.attributes.getFloat("alpha",1)}),exp=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslExp()),t)],floor=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslFloor()),t)],identity=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslIdentity()),t)],leakyRelu=(e,t,r)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslLeakyRelu(r.alpha),r.cacheKey),t)],parseLeakyReluAttributes=e=>createAttributeWithCacheKey({alpha:e.attributes.getFloat("alpha",.01)}),log2=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslLog()),t)],neg=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslNeg()),t)],not2=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslNot()),t)],relu=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslRelu()),t)],sigmoid=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslSigmoid()),t)],sin=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslSin()),t)],sqrt=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslSqrt()),t)],tan=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslTan()),t)],tanh=(e,t)=>[e.run(createElementwiseProgramInfoLoader(e,t[0],glslTanh()),t)]}});function getActivationSnippet(e){let t;switch(e.activation){case"Relu":t=glslRelu();break;case"Sigmoid":t=glslSigmoid();break;case"Clip":t=glslClip(e.clipMin,e.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let r=t.name;return{activationFunction:t.body,applyActivation:`value = ${r}_(value);`}}var init_fuse_utils=__esm({"web/lib/onnxjs/backends/webgl/ops/fuse-utils.ts"(){"use strict";init_util(),init_unary_op(),parseInternalActivationAttributes=e=>{let t=e.getString("activation","");if("Clip"===t){let[r,n]=e.getFloats("activation_params",[MIN_CLIP,MAX_CLIP]);return{activation:t,clipMax:n,clipMin:r,activationCacheKey:`${t}:${r},${n}`}}return{activation:t,activationCacheKey:t}}}}),init_conv_grouped=__esm({"web/lib/onnxjs/backends/webgl/ops/conv-grouped.ts"(){"use strict";init_instrument(),init_glsl_source(),init_types(),init_conv(),init_fuse_utils(),createUnpackedGroupedConvProgramMetadata=(e,t)=>({name:"GroupedConv",inputNames:e?["X","W","Bias"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),createUnpackedGroupedConvProgramInfo=(e,t,r,n)=>{let i=t.length>2?"value += getBias(output_channel);":"",o=t[0].dims.slice(),s=t[1].dims.slice(),a=s[0]/n.group;Logger.verbose("GroupedConv",`autpPad:${n.autoPad}, dilations:${n.dilations}, group:${n.group}, kernelShape:${n.kernelShape}, pads:${n.pads}, strides:${n.strides}`);let u=calculateOutputShape(o,s,n.dilations,n.pads,n.strides),l=getGlsl(e.session.backend.glContext.version),{activationFunction:d,applyActivation:p}=getActivationSnippet(n),c=`
  const ivec2 strides = ivec2(${n.strides[0]}, ${n.strides[1]});
  const ivec2 pads = ivec2(${n.pads[0]}, ${n.pads[1]});
  ${d}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${a};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${s[1]}; wInChannel++) {
      int input_channel = group_id * ${s[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${s[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${n.dilations[0]};

        if (xHeight < 0 || xHeight >= ${o[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${s[3]}; wWidth++) {
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
`;return{...r,output:{dims:u,type:t[0].type,textureType:0},shaderSource:c,hasMain:!0}},createUnpackedGroupedConvProgramInfoLoader=(e,t,r)=>{let n=createUnpackedGroupedConvProgramMetadata(t.length>2,r.cacheKey);return{...n,get:()=>createUnpackedGroupedConvProgramInfo(e,t,n,r)}}}}),init_im2col_pack=__esm({"web/lib/onnxjs/backends/webgl/ops/im2col-pack.ts"(){"use strict";init_glsl_source(),init_types(),init_packing_utils(),createPackedIm2ColProgramMetadata=e=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:e}),createPackedIm2ColProgramInfo=(e,t,r,n,i,o)=>{let s=r.dims,a=n.dims,u=2,l=3,d=i.length,p=[a[1]*a[2]*a[3],i[2]*i[3]],c=a[2]*a[3],h=unpackFromChannel(),f=getGlsl(e.session.backend.glContext.version),m="";for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)m+=`
            blockIndex = rc.x + ${t};
            pos = rc.y + ${e};

            if(blockIndex < ${p[1]} && pos < ${p[0]}) {
              offsetY = int(blockIndex / (${i[d-1]})) * ${o.strides[0]} -
                ${o.pads[0]};
              d0 = offsetY + ${o.dilations[0]} * (imod(pos, ${c}) / ${a[2]});

              if(d0 < ${s[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${i[d-1]}) * ${o.strides[1]} -
                  ${o.pads[1]};
                d1 = offsetX + ${o.dilations[1]} * imod(imod(pos, ${c}), ${a[2]});

                if(d1 < ${s[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${c}.);
                    innerDims = vec2(d0, d1);
                    result[${2*e+t}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let g=`
      ${h}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${m}
          ${f.output} = result;
      }
            `;return{...t,output:{dims:p,type:r.type,textureType:2},shaderSource:g,hasMain:!0}},createPackedIm2ColProgramInfoLoader=(e,t,r,n,i)=>{let o=createPackedIm2ColProgramMetadata(i.cacheKey);return{...o,get:()=>createPackedIm2ColProgramInfo(e,o,t,r,n,i)}}}});function createMatmulProgramInfo(e,t,r){let n=t[0].dims,i=t[1].dims,o=BroadcastUtil.calcShape(n,i,!0);if(!o)throw Error("Can't use matmul on the given tensors");let s=getCoordsDataType(o.length),a=getGlChannels(),{activationFunction:u,applyActivation:l}=getActivationSnippet(r),d=t.length>2,p=d?"value += getBiasForMatmul();":"",c=d?`${getBiasForMatmul(s,a,t[2].dims,o,!1)}`:"",h=o.length,f=n.length,m=i.length,g=n[n.length-1],b=`
    ${u}
    ${c}
    float process(int indices[${h}]) {
        int a[${f}];
        int b[${m}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${g}; ++k) {
            a[${f-1}] = k;
            b[${m-2}] = k;
            value += _A(a) * _B(b);
        }
        ${p}
        ${l}
        return value;
    }`;return{...e,output:{dims:o,type:t[0].type,textureType:0},shaderSource:b}}function createMatmulProgramInfoLoader(e,t){let r=createMatmulProgramMetadata(e.length>2,t.activationCacheKey);return{...r,get:()=>createMatmulProgramInfo(r,e,t)}}function getBiasForMatmul(e,t,r,n,i){let o="",s=r.length,a=n.length,u=a-s;o=a<2&&s>0?"coords":r.map((e,r)=>`coords.${t[r+u]}`).join(", ");let l=BroadcastUtil.getBroadcastDims(r,n).map(e=>`coords.${t[e+u]} = 0;`).join("\n"),d=1===ShapeUtil.size(r),p="vec4(outputValue.xx, outputValue.yy)";return d&&(p="vec4(outputValue.x)"),i?`
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
}`}var init_matmul=__esm({"web/lib/onnxjs/backends/webgl/ops/matmul.ts"(){"use strict";init_util(),init_types(),init_utils(),init_fuse_utils(),init_matmul_pack(),matMul=(e,t,r)=>(validateInputs4(t),e.session.pack)?[e.run(createPackedMatmulProgramInfoLoader(e,t,r),t)]:[e.run(createMatmulProgramInfoLoader(t,r),t)],parseMatMulAttributes=e=>parseInternalActivationAttributes(e.attributes),createMatmulProgramMetadata=(e,t)=>({name:"MatMul",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),validateInputs4=e=>{if(!e||2!==e.length)throw Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw Error("shared dimension does not match.");if("float32"!==e[0].type&&"float64"!==e[0].type||"float32"!==e[1].type&&"float64"!==e[1].type)throw Error("inputs should be float type");if(e[0].type!==e[1].type)throw Error("inputs types should match")}}});function getBcastSamplerForMatmul(e,t,r,n){let i=[],o=[],s=r[0].dims,a=r[1].dims,u=s.length,l=a.length,d=n.length,p=d-u,c=d-l;(i=s.map((e,r)=>`coords.${t[r+p]}`))[u-1]="i*2",i.join(", "),(o=a.map((e,r)=>`coords.${t[r+c]}`))[l-2]="i*2",o.join(", ");let h=BroadcastUtil.getBroadcastDims(s,n),f=BroadcastUtil.getBroadcastDims(a,n),m=h.map(e=>`coords.${t[e+p]} = 0;`).join("\n"),g=f.map(e=>`coords.${t[e+c]} = 0;`).join("\n"),b=`int lastDim = coords.${t[d-1]};
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
}`}function getA(e,t){let r="";for(let n=0;n<t-2;n++)r+=`rc.${e[n]}, `;return r+`rc.${e[t-2]}, i*2`}function getB(e,t){let r="";for(let n=0;n<t-2;n++)r+=`rc.${e[n]}, `;return r+`i*2, rc.${e[t-1]}`}var init_matmul_pack=__esm({"web/lib/onnxjs/backends/webgl/ops/matmul-pack.ts"(){"use strict";init_util(),init_glsl_source(),init_types(),init_utils(),init_fuse_utils(),init_matmul(),createPackedMatmulProgramMetadata=(e,t)=>({name:"MatMul (packed)",inputNames:e?["A","B","Bias"]:["A","B"],inputTypes:e?[2,2,2]:[2,2],cacheHint:t}),createPackedMatmulProgramInfo=(e,t,r,n)=>{let i=r.length>2,o=i?"value += getBiasForMatmul();":"",s=r[0].dims,a=r[1].dims,u=BroadcastUtil.calcShape(s,a,!0),l=!ShapeUtil.areEqual(r[0].dims,r[1].dims);if(!u)throw Error("Can't use matmul on the given tensors");let d=Math.ceil(s[s.length-1]/2),p=s.length,c=a.length,h=getGlsl(e.session.backend.glContext.version),f=getCoordsDataType(u.length),m=u.length,g=getGlChannels(),{activationFunction:b,applyActivation:y}=getActivationSnippet(n),_=i?`${getBiasForMatmul(f,g,r[2].dims,u,!0)}`:"",x=l?`${getBcastSamplerForMatmul(f,g,r,u)}`:"",v=l?"getAAtOutCoordsMatmul(i)":`getA(${getA(g,p)})`,w=l?"getBAtOutCoordsMatmul(i)":`getB(${getB(g,c)})`,$=l?"":`${f} rc =
          getOutputCoords(); int lastDim = rc.${g[m-1]}; rc.${g[m-1]} =
          rc.${g[m-2]}; rc.${g[m-2]} = lastDim;
      `,T=`
            ${x}
            ${_}
            ${b}
            void main() {
              ${$}

              vec4 value = vec4(0);
              for (int i = 0; i < ${d}; i++) {
                vec4 a = ${v};
                vec4 b = ${w};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${o}
              ${y}
              ${h.output} = value;
            }`;return{...t,output:{dims:u,type:r[0].type,textureType:2},shaderSource:T,hasMain:!0}},createPackedMatmulProgramInfoLoader=(e,t,r)=>{let n=createPackedMatmulProgramMetadata(t.length>2,r.activationCacheKey);return{...n,get:()=>createPackedMatmulProgramInfo(e,n,t,r)}}}}),init_conv_pack=__esm({"web/lib/onnxjs/backends/webgl/ops/conv-pack.ts"(){"use strict";init_conv(),init_im2col_pack(),init_matmul_pack(),conv2DPacked=(e,t,r)=>{let n=t[0].dims,i=t[1].dims,o=calculateOutputShape(n,i,r.dilations,r.pads,r.strides),s=e.run(createPackedIm2ColProgramInfoLoader(e,t[0],t[1],o,r),[t[0]]),a=e.reshapePacked(t[1],[i[0],i[1]*i[2]*i[3]]),u=3===t.length?[a,s,t[2]]:[a,s],l=e.run(createPackedMatmulProgramInfoLoader(e,u,r),u);return e.reshapePacked(l,o)}}}),init_im2col=__esm({"web/lib/onnxjs/backends/webgl/ops/im2col.ts"(){"use strict";init_types(),createIm2ColProgramMetadata=e=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:e}),createIm2ColProgramInfo=(e,t,r,n,i,o)=>{let s=r.dims,a=n.dims,u=i.length,l=calculateIm2ColDims(s,a,i,4),d=`
        const int XC = ${s[1]};
        const int XH = ${s[2]};
        const int XW = ${s[3]};
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
        `;return{...t,output:{dims:l,type:r.type,textureType:4},shaderSource:d}},createIm2ColProgramInfoLoader=(e,t,r,n,i)=>{let o=createIm2ColProgramMetadata(i.cacheKey);return{...o,get:()=>createIm2ColProgramInfo(e,o,t,r,n,i)}},calculateIm2ColDims=(e,t,r,n=4)=>[r[0],r[2],r[3],Math.ceil(e[1]*t[2]*t[3]/n)]}}),init_dot_product=__esm({"web/lib/onnxjs/backends/webgl/ops/dot-product.ts"(){"use strict";init_util(),init_glsl_source(),init_types(),init_fuse_utils(),init_im2col(),createDotProductProgramMetadata=(e,t)=>({name:"ConvDotProduct",inputNames:e?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:e?[0,4,0]:[0,4],cacheKey:t.activationCacheKey}),createDotProductProgramInfo=(e,t,r,n,i)=>{let o=r[0].dims,s=r[1].dims,a=[s[0],Math.ceil(o[1]*s[2]*s[3]/4)],u=calculateIm2ColDims(o,s,n),[l,d]=e.calculateTextureWidthAndHeight(a,4),p=ShapeUtil.computeStrides(u),[c,h]=e.calculateTextureWidthAndHeight(u,4),f=n.length,m=r.length<3?"0.0":"_B(b)",g=Math.ceil(o[1]*s[2]*s[3]/4),{activationFunction:b,applyActivation:y}=getActivationSnippet(i),_=getGlsl(e.session.backend.glContext.version),x=`
${b}
float process(int indices[${f}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${p[0]} + im2col[1] * ${p[1]} + im2col[2] * ${p[2]};
  int kernelOffset = indices[1] * ${a[1]};
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
}`;return{...t,output:{dims:n,type:r[0].type,textureType:0},shaderSource:x}},createDotProductProgramInfoLoader=(e,t,r,n)=>{let i=createDotProductProgramMetadata(t.length>2,n);return{...i,get:()=>createDotProductProgramInfo(e,i,t,r,n)}}}}),init_conv=__esm({"web/lib/onnxjs/backends/webgl/ops/conv.ts"(){"use strict";init_attribute_with_cache_key(),init_util(),init_conv_grouped(),init_conv_pack(),init_dot_product(),init_fuse_utils(),init_im2col(),init_matmul(),calculateOutputShape=(e,t,r,n,i)=>{let o=e[0],s=e.slice(2),a=s.length,u=t[0],l=t.slice(2).map((e,t)=>e+(e-1)*(r[t]-1));return[o,u].concat(...s.map((e,t)=>e+n[t]+n[t+a]).map((e,t)=>Math.floor((e-l[t]+i[t])/i[t])))},conv=(e,t,r)=>(validateInputs5(t,r),conv2d(e,t,r)),conv2d=(e,t,r)=>{let n=getAdjustedConvAttributes(r,t),i=e.session.pack,o=1===n.kernelShape[0]&&1===n.kernelShape[1];return n.group>1?[e.run(createUnpackedGroupedConvProgramInfoLoader(e,t,n),t)]:o&&i?[conv2DUnpackedPointwise(e,t,n)]:i&&4===t[0].dims.length&&1===t[0].dims[0]&&!o?[conv2DPacked(e,t,n)]:[conv2DUnpacked(e,t,n)]},conv2DUnpackedPointwise=(e,t,r)=>{let n=t[0].dims,i=t[1].dims,o=calculateOutputShape(n,i,r.dilations,r.pads,r.strides),s=e.reshapeUnpacked(t[0],[n[1],n[2]*n[3]]),a=e.reshapeUnpacked(t[1],[i[0],i[1]]),u=t.length>2?[a,s,t[2]]:[a,s],l=e.run(createMatmulProgramInfoLoader(u,r),u);return e.reshapeUnpacked(l,o)},conv2DUnpacked=(e,t,r)=>{let n=t[0].dims,i=t[1].dims,o=calculateOutputShape(n,i,r.dilations,r.pads,r.strides),s=e.run(createIm2ColProgramInfoLoader(e,t[0],t[1],o,r),[t[0]]),a=3===t.length?[s,t[1],t[2]]:[s,t[1]];return e.run(createDotProductProgramInfoLoader(e,t,o,r),a)},getAdjustedConvAttributes=(e,t)=>{let r=e.kernelShape.slice();if(0===e.kernelShape.length)for(let e=2;e<t[1].dims.length;++e)r.push(t[1].dims[e]);let n=e.pads.slice();PoolConvUtil.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:r,pads:n,cacheKey:e.cacheKey}),i},parseConvAttributes=e=>{let t=e.attributes,r=parseInternalActivationAttributes(t),n=t.getString("auto_pad","NOTSET"),i=t.getInts("dilations",[1,1]),o=t.getInt("group",1),s=t.getInts("kernel_shape",[]),a=t.getInts("pads",[0,0,0,0]),u=t.getInts("strides",[1,1]);return createAttributeWithCacheKey({autoPad:n,dilations:i,group:o,kernelShape:s,pads:a,strides:u,...r})},validateInputs5=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length||4!==e[1].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims[1]!==e[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let r=e[0].dims.length-2;if(t.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(t.strides.length!==r)throw Error(`strides should be ${r}D`);if(t.pads.length!==2*r)throw Error(`pads should be ${2*r}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if("float32"!==e[0].type||"float32"!==e[1].type)throw Error("Conv input(X,W) should be float tensor");if(3===e.length&&"float32"!==e[2].type)throw Error("Conv input(bias) should be float tensor")}}}),init_conv_transpose=__esm({"web/lib/onnxjs/backends/webgl/ops/conv-transpose.ts"(){"use strict";init_attribute_with_cache_key(),init_glsl_source(),init_types(),init_fuse_utils(),computeTotalPad=(e,t,r,n,i,o)=>(e-1)*t+r+(n-1)*i+1-o,distributePadding=(e,t,r,n,i)=>{let o=Math.floor(e/2);"SAME_UPPER"===t?(r[n]=o,r[i]=e-o):"SAME_LOWER"===t&&(r[n]=e-o,r[i]=o)},calculateOutputShapeAndPads=(e,t,r,n,i,o,s,a)=>{let u=e.length-2,l=0===a.length;for(let d=0;d<u;++d){let p=l?e[d+2]*o[d]:a[d];distributePadding(computeTotalPad(e[d+2],o[d],i[d],t[d],r[d],p),n,i,d,d+u),l&&a.push(o[d]*(e[d+2]-1)+s[d]+(t[d]-1)*r[d]+1-i[d]-i[d+u])}},convTranspose=(e,t,r)=>(validateInputs6(t,r),convTranspose2d(e,t,r)),convTranspose2d=(e,t,r)=>{let n=getAdjustedConvTransposeAttributes(r,t);return[convTranspose2DUnpacked(e,t,n)]},createConvTransposeProgramMetadata=(e,t)=>({name:"ConvTranspose",inputNames:e?["X","W","B"]:["X","W"],inputTypes:e?[0,0,0]:[0,0],cacheHint:t}),createUnpackedConvTransposeProgramInfo=(e,t,r,n)=>{let i=t.length>2?"getB(output_channel)":"0.0",o=t[0].dims,s=t[1].dims,a=s[1],u=s[0]/n.group,l=[t[0].dims[0],t[1].dims[1]*n.group,...n.outputShape],d=getGlsl(e.session.backend.glContext.version),{activationFunction:p,applyActivation:c}=getActivationSnippet(n),h=`
  const ivec2 strides = ivec2(${n.strides[0]}, ${n.strides[1]});
  const ivec2 pads = ivec2(${n.pads[0]}, ${n.pads[1]});
  ${p}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${a};
    int wOutChannel = output_channel - group_id * ${a};

    float value = ${i};
    for (int inChannelOffset = 0; inChannelOffset < ${u}; inChannelOffset++) {
      int input_channel = group_id * ${u} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${s[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${s[3]}; wHOff++) {
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
`;return{...r,output:{dims:l,type:t[0].type,textureType:0},shaderSource:h,hasMain:!0}},createUnpackedConvTransposeProgramInfoLoader=(e,t,r)=>{let n=createConvTransposeProgramMetadata(t.length>2,r.cacheKey);return{...n,get:()=>createUnpackedConvTransposeProgramInfo(e,t,n,r)}},convTranspose2DUnpacked=(e,t,r)=>e.run(createUnpackedConvTransposeProgramInfoLoader(e,t,r),t),getAdjustedConvTransposeAttributes=(e,t)=>{let r=e.kernelShape.slice();if(0===e.kernelShape.length)for(let e=2;e<t[1].dims.length;++e)r.push(t[1].dims[e]);let n=e.pads.slice(),i=e.outputShape.slice();calculateOutputShapeAndPads(t[0].dims,r,e.dilations,e.autoPad,n,e.strides,e.outputPadding,i);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n,outputShape:i,cacheKey:e.cacheKey}),o},parseConvTransposeAttributes=e=>{let t=e.attributes,r=parseInternalActivationAttributes(t),n=t.getString("auto_pad","NOTSET"),i=t.getInts("dilations",[1,1]),o=t.getInt("group",1),s=t.getInts("kernel_shape",[]),a=t.getInts("output_padding",[0,0]),u=t.getInts("output_shape",[]),l=t.getInts("pads",[0,0,0,0]),d=t.getInts("strides",[1,1]);return createAttributeWithCacheKey({autoPad:n,dilations:i,group:o,kernelShape:s,outputPadding:a,outputShape:u,pads:l,strides:d,...r})},validateInputs6=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length||4!==e[1].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims[1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let r=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==r))throw Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.length!==2*n)throw Error(`pads should be ${2*n}D`);if(t.outputPadding.length!==n)throw Error(`output_padding should be ${n}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape");if("float32"!==e[0].type||"float32"!==e[1].type)throw Error("ConvTranspose input(X,W) should be float tensor");if(3===e.length&&"float32"!==e[2].type)throw Error("ConvTranspose input(bias) should be float tensor")}}}),init_transpose=__esm({"web/lib/onnxjs/backends/webgl/ops/transpose.ts"(){"use strict";init_attribute_with_cache_key(),init_util(),init_types(),transposeProgramMetadata={name:"Transpose",inputNames:["A"],inputTypes:[0]},transpose=(e,t,r)=>(validateInputs7(t),[e.run({...transposeProgramMetadata,cacheHint:r.cacheKey,get:()=>createTransposeProgramInfo(e,t[0],r.perm)},t)]),parseTransposeAttributes=e=>createAttributeWithCacheKey({perm:e.attributes.getInts("perm",[])}),createTransposeProgramInfo=(e,t,r)=>{let n=t.dims;r=getAdjustedPerm(n,r);let i=getOutputShape(n,r),o=n.length,s=`
      ${getPermFunctionBody("perm",r,o)}
      float process(int indices[${o}]) {
        int a[${o}];
        perm(a, indices);
        return _A(a);
      }`;return{...transposeProgramMetadata,output:{dims:i,type:t.type,textureType:0},shaderSource:s}},getAdjustedPerm=(e,t)=>(t&&t.length!==e.length&&(t=[...e.keys()].reverse()),t),getOutputShape=(e,t)=>(t=getAdjustedPerm(e,t),ShapeUtil.sortBasedOnPerm(e,t)),getPermFunctionBody=(e,t,r)=>{let n=[];n.push(`void ${e}(out int a[${r}], int src[${r}]) {`);for(let e=0;e<r;++e)n.push(`	a[${t[e]}]=src[${e}];`);return n.push("	}"),n.join("\n")},validateInputs7=e=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("input should be float tensor")}}}),init_depth_to_space=__esm({"web/lib/onnxjs/backends/webgl/ops/depth-to-space.ts"(){"use strict";init_transpose(),depthToSpace=(e,t,r)=>{validateInputs8(t);let n=r.blocksize,i=n*n,o="DCR"===r.mode?[0,3,4,1,5,2]:[0,1,4,2,5,3],s="DCR"===r.mode?[t[0].dims[0],n,n,t[0].dims[1]/i,t[0].dims[2],t[0].dims[3]]:[t[0].dims[0],t[0].dims[1]/i,n,n,t[0].dims[2],t[0].dims[3]],a=e.reshapeUnpacked(t[0],s),u={perm:o,cacheKey:`${o}`},[l]=transpose(e,[a],u),d=[t[0].dims[0],t[0].dims[1]/i,t[0].dims[2]*n,t[0].dims[3]*n];return[e.reshapeUnpacked(l,d)]},parseDepthToSpaceAttributes=e=>{let t=e.attributes.getInt("blocksize");if(t<1)throw Error(`blocksize must be >= 1, but got : ${t} for DepthToSpace`);let r=e.attributes.getString("mode","DCR");if("DCR"!==r&&"CRD"!==r)throw Error(`unrecognized mode: ${r} for DepthToSpace`);return{mode:r,blocksize:t}},validateInputs8=e=>{if(1!==e.length)throw Error(`DepthToSpace expect 1 inputs, but got ${e.length}`);if("string"===e[0].type||4!==e[0].dims.length)throw TypeError("DepthToSpace input should be a 4-D numeric tensor")}}}),init_flatten=__esm({"web/lib/onnxjs/backends/webgl/ops/flatten.ts"(){"use strict";init_util(),flatten=(e,t,r)=>{validateInputs9(t,r);let n=ShapeUtil.flattenShape(t[0].dims,r);return[e.reshapeUnpacked(t[0],n)]},parseFlattenAttributes=e=>e.attributes.getInt("axis",1),validateInputs9=(e,t)=>{if(!e||1!==e.length)throw Error("Flatten requires 1 input.");let r=e[0].dims.length;if(0===r)throw Error("scalar tensor is not supported.");if(t<-r||t>r)throw Error("Invalid axis");if("string"===e[0].type)throw Error("string tensor is not supported.")}}}),init_operators=__esm({"web/lib/onnxjs/operators.ts"(){"use strict";NUMBER_TYPES=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]}}),init_gather=__esm({"web/lib/onnxjs/backends/webgl/ops/gather.ts"(){"use strict";init_attribute_with_cache_key(),init_operators(),init_util(),init_types(),gather=(e,t,r)=>(validateInputs10(t,r.axis),[e.run(createGatherProgramInfoLoader(e,t,r),t)]),parseGatherAttributes=e=>createAttributeWithCacheKey({axis:e.attributes.getInt("axis",0)}),gatherProgramMetadata={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},createGatherProgramInfo=(e,t,r,n)=>{let i=r[0].dims.slice(),o=r[1].dims.slice(),s=Array(i.length+o.length-1);n=ShapeUtil.normalizeAxis(n,i.length);let a=[];for(let e=0;e<s.length;e++)e<n?(s[e]=i[e],a.push(`inputIdx[${e}] = outputIdx[${e}];`)):e<n+o.length?(s[e]=o[e-n],a.push(`indexDataIdx[${e-n}] = outputIdx[${e}];`)):(s[e]=i[e-o.length+1],a.push(`inputIdx[${e-o.length+1}] = outputIdx[${e}];`));let u=s.length||1,l=i.length,d=o.length||1,p=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${d}];
        indexDataIdx[0] = 0;
        ${a.join("\n        ")}
        int idx = int(_B(indexDataIdx));
        inputIdx[${n}] = idx < 0 ? idx + ${i[n]} : idx;
        return _A(inputIdx);
      }`;return{...t,output:{dims:s,type:r[0].type,textureType:0},shaderSource:p}},createGatherProgramInfoLoader=(e,t,r)=>{let n={...gatherProgramMetadata,cacheHint:r.cacheKey};return{...n,get:()=>createGatherProgramInfo(e,n,t,r.axis)}},validateInputs10=(e,t)=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.");let r=e[0].dims.length;if(r<1)throw Error("Invalid input shape.");if(t<-r||t>r-1)throw Error("Invalid axis.");if(-1===NUMBER_TYPES.indexOf(e[0].type)||"int32"!==e[1].type&&"int16"!==e[1].type)throw Error("Invaid input type.")}}}),init_gemm=__esm({"web/lib/onnxjs/backends/webgl/ops/gemm.ts"(){"use strict";init_attribute_with_cache_key(),init_util(),init_types(),gemm=(e,t,r)=>(validateInputs11(t,r),[e.run(createGemmProgramInfoLoader(t,r),t)]),parseGemmAttributes=(e,t)=>{let r=0!==e.attributes.getInt("transA",0),n=0!==e.attributes.getInt("transB",0),i=e.attributes.getFloat("alpha",1),o=e.attributes.getFloat("beta",1);return createAttributeWithCacheKey({transA:r,transB:n,alpha:i,beta:o,isOptionalC:t})},parseGemmAttributesV7=e=>parseGemmAttributes(e,!1),parseGemmAttributesV11=e=>parseGemmAttributes(e,!0),createGemmProgramInfoLoader=(e,t)=>{let r={name:"Gemm",inputNames:3===e.length?["A","B","C"]:["A","B"],inputTypes:3===e.length?[0,0,0]:[0,0],key:t.cacheKey};return{...r,get:()=>createGemmProgramInfo(r,e,t)}},createGemmProgramInfo=(e,t,r)=>{let n=t[0].dims.slice(),i=t[1].dims.slice(),[o,s]=GemmUtil.getShapeOfGemmResult(n,r.transA,i,r.transB,3===t.length?t[2].dims:void 0),a=[o,s];if(!a)throw Error("Can't use gemm on the given tensors");let u=n[n.length-1],l="";r.transA&&(u=n[0]),r.transA&&r.transB?l="value += _A_T(a) * _B_T(b);":r.transA&&!r.transB?l="value += _A_T(a) * _B(b);":!r.transA&&r.transB?l="value += _A(a) * _B_T(b);":r.transA||r.transB||(l="value += _A(a) * _B(b);");let d=a.length,p=3===t.length?`int c[${t[2].dims.length}];`:"",c=3===t.length?"bcastIndices_C(indices, c);":"",h=3===t.length?"value += beta * _C(c);":"",f=`
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
      }`;return{...e,output:{dims:a,type:t[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:r.alpha},{name:"beta",type:"float",data:r.beta}],shaderSource:f}},validateInputs11=(e,t)=>{if(!e)throw Error("Input is missing");if(t.isOptionalC&&(e.length<2||e.length>3))throw Error("Invaid input shape.");if(!t.isOptionalC&&3!==e.length)throw Error("Gemm requires 3 inputs");if(3===e.length&&1!==e[2].dims.length&&2!==e[2].dims.length)throw Error("Invalid input shape of C");if("float32"!==e[0].type&&"float64"!==e[0].type||"float32"!==e[1].type&&"float64"!==e[1].type||3===e.length&&"float32"!==e[2].type&&"float64"!==e[2].type)throw Error("Invalid input type.");if(e[0].type!==e[1].type||3===e.length&&e[0].type!==e[2].type)throw Error("Input types are mismatched")}}}),init_image_scaler=__esm({"web/lib/onnxjs/backends/webgl/ops/image-scaler.ts"(){"use strict";init_attribute_with_cache_key(),init_types(),imageScaler=(e,t,r)=>(validateInputs12(t),[e.run(createImageScalerProgramInfoLoader(e,t,r),t)]),parseImageScalerAttributes=e=>{let t=e.attributes.getFloat("scale"),r=e.attributes.getFloats("bias");return createAttributeWithCacheKey({scale:t,bias:r})},imageScalerProgramMetadata={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},createImageScalerProgramInfo=(e,t,r,n)=>{let i=r[0].dims.slice(),o=i.length,s=createGetBiasMethod(n.bias.length),a=`
      ${s}
      float process(int indices[${o}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...t,output:{dims:i,type:r[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:n.bias.length,data:n.bias},{name:"scale",type:"float",data:n.scale}],shaderSource:a}},createImageScalerProgramInfoLoader=(e,t,r)=>{let n={...imageScalerProgramMetadata,cacheHint:r.cacheKey};return{...n,get:()=>createImageScalerProgramInfo(e,n,t,r)}},createGetBiasMethod=e=>{let t=[`float getBias(float bias[${e}], int channel) {`];for(let r=0;r<e;++r)0===r?t.push(`	if (channel == ${r}) { return bias[${r}]; }`):r===e-1?t.push(`	else { return bias[${r}]; }`):t.push(`	else if (channel == ${r}) { return bias[${r}]; }`);return t.push("	}"),t.join("\n")},validateInputs12=e=>{if(!e||1!==e.length)throw Error("ImageScaler requires 1 input.");if(4!==e[0].dims.length)throw Error("Invalid input shape.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")}}}),init_instance_normalization=__esm({"web/lib/onnxjs/backends/webgl/ops/instance-normalization.ts"(){"use strict";init_glsl_source(),init_types(),instanceNormalization=(e,t,r)=>{validateInputs13(t);let n=e.run(createMeanAndVarianceProgramInfoLoader(t[0]),t);return[e.run(createComputeOutputProgramInfoLoader(e,t[0],r,n.dims),[t[0],n,t[1],t[2]])]},parseInstanceNormalizationAttributes=e=>e.attributes.getFloat("epsilon",1e-5),meanAndVarianceProgramMetadata={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},createMeanAndVarianceProgramInfo=(e,t)=>{let r=t.dims.slice(),n=r[1],i=r[2]*r[3],o=[r[0],n],s=`
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
      }`;return{...e,output:{dims:o,type:t.type,textureType:4},shaderSource:s}},createMeanAndVarianceProgramInfoLoader=e=>({...meanAndVarianceProgramMetadata,get:()=>createMeanAndVarianceProgramInfo(meanAndVarianceProgramMetadata,e)}),computeOutputProgramMetadata={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},createComputeOutputProgramInfo=(e,t,r,n,i)=>{let o=getGlsl(e.session.backend.glContext.version),[s,a]=e.calculateTextureWidthAndHeight(i,4),[u,l]=[s/4,a],d=`
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
      }`;return{...t,output:{dims:r.dims,type:r.type,textureType:0},variables:[{name:"epsilon",type:"float",data:n}],shaderSource:d}},createComputeOutputProgramInfoLoader=(e,t,r,n)=>{let i={...computeOutputProgramMetadata,cacheHint:`${r}`};return{...i,get:()=>createComputeOutputProgramInfo(e,i,t,r,n)}},validateInputs13=e=>{if(!e||3!==e.length)throw Error("InstanceNormalization requires 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dims.length<3||1!==r.dims.length||1!==n.dims.length)throw Error("Invalid input shape.");if(r.dims[0]!==t.dims[1]||n.dims[0]!==t.dims[1])throw Error("Input shapes are mismatched.");if("float32"!==t.type&&"float64"!==t.type||"float32"!==r.type&&"float64"!==r.type||"float32"!==n.type&&"float64"!==n.type)throw Error("Invalid input type.");if(4!==e[0].dims.length)throw Error("Only support 4-D input shape.")}}});function createLrnProgramInfo(e,t){let r=e[0].dims[1],n=e[0].dims.length,i=-Math.floor((t.size-1)/2),o=Math.ceil((t.size-1)/2),s=`float(${t.alpha}) / float(${t.size})`,a=`float(${t.bias})`,u=`float(${t.beta})`,l=`
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
        return x / pow(${a} + ${s} * square_sum, ${u});
    }`;return{...lrnProgramMetadata,cacheHint:t.cacheKey,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:l}}function createLrnProgramInfoLoader(e,t){return{...lrnProgramMetadata,cacheHint:t.cacheKey,get:()=>createLrnProgramInfo(e,t)}}var init_lrn=__esm({"web/lib/onnxjs/backends/webgl/ops/lrn.ts"(){"use strict";init_attribute_with_cache_key(),init_types(),lrn=(e,t,r)=>(validateInputs14(t),[e.run(createLrnProgramInfoLoader(t,r),t)]),parseLrnAttributes=e=>{let t=e.attributes.getFloat("alpha",1e-4),r=e.attributes.getFloat("beta",.75),n=e.attributes.getFloat("bias",1),i=e.attributes.getInt("size");return createAttributeWithCacheKey({alpha:t,beta:r,bias:n,size:i})},lrnProgramMetadata={name:"LRN",inputNames:["X"],inputTypes:[0]},validateInputs14=e=>{if(!e||1!==e.length)throw Error("LRN requires 1 input.");if(4!==e[0].dims.length)throw Error('currently only support LRN for input with "NCHW" format');if("float32"!==e[0].type)throw Error("input should be float type")}}}),init_pad=__esm({"web/lib/onnxjs/backends/webgl/ops/pad.ts"(){"use strict";init_attribute_with_cache_key(),init_util(),init_glsl_source(),init_types(),padProgramMetadata={name:"Pad",inputNames:["A"],inputTypes:[0]},padV2=(e,t,r)=>(validateInputsV2(t),[e.run({...padProgramMetadata,cacheHint:r.cacheKey,get:()=>createPadProgramInfo(e,t[0],r)},t)]),parsePadAttributesV2=e=>{let t=e.attributes.getString("mode","constant"),r=e.attributes.getFloat("value",0),n=e.attributes.getInts("pads");return createAttributeWithCacheKey({mode:t,value:r,pads:n})},padV11=(e,t,r)=>{validateInputsV11(t);let n=generatePadAttributesFromInputs(e,t,r);return padV2(e,[t[0]],n)},parsePadAttributesV11=e=>e.attributes.getString("mode","constant"),generatePadAttributesFromInputs=(e,t,r)=>{if(!e.session.isInitializer(t[1].dataId)||t.length>=3&&!e.session.isInitializer(t[2].dataId))throw Error("dynamic pad attributes are not allowed");let n=Array.from(t[1].integerData),i=t.length>=3?t[2].floatData[0]:0;return createAttributeWithCacheKey({mode:r,pads:n,value:i})},createPadProgramInfo=(e,t,r)=>{let n=ShapeUtil.padShape(t.dims.slice(),r.pads),i=n.length,o=getPadFunction(e,t,r),s=`
      ${o}
      float process(int[${i}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:n,type:t.type,textureType:0},shaderSource:s}},validateInputsV2=e=>{if(!e||1!==e.length)throw Error("Pad requires 1 input");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")},validateInputsV11=e=>{if(!e||2!==e.length&&3!==e.length)throw Error("Pad requires 2 or 3 inputs");if("int32"!==e[1].type||e.length>=3&&"string"===e[2].type)throw Error("Invalid input type.")},getPadFunction=(e,t,r)=>{let n=getGlsl(e.session.backend.glContext.version),[i,o]=e.calculateTextureWidthAndHeight(t.dims,0),s=ShapeUtil.computeStrides(t.dims);switch(r.mode){case"constant":return getPadConstant(n,t.dims,s,i,o,r.pads,r.value);case"reflect":return getPadReflect(n,t.dims,s,i,o,r.pads);case"edge":return getPadEdge(n,t.dims,s,i,o,r.pads);default:throw Error("Invalid mode")}},getPadConstant=(e,t,r,n,i,o,s)=>{let a=t.length,u="";for(let e=a-1;e>=0;--e)u+=`
        k = m[${e}] - ${o[e]};
        if (k < 0)  return constant;
        if (k >= ${t[e]}) return constant;
        offset += k * ${r[e]};
        `;return`
      float padA(int m[${a}]) {
        const float constant = float(${s});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${n}, ${i});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},getPadReflect=(e,t,r,n,i,o)=>{let s=t.length,a="";for(let e=s-1;e>=0;--e)a+=`
        k = m[${e}] - ${o[e]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(t[e]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${t[e]}) { k = _2n_1 - k; }
        }
        offset += k * ${r[e]};
        `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${a}
        vec2 coords = offsetToCoords(offset, ${n}, ${i});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `},getPadEdge=(e,t,r,n,i,o)=>{let s=t.length,a="";for(let e=s-1;e>=0;--e)a+=`
        k = m[${e}] - ${o[e]};
        if (k < 0)  k = 0;
        if (k >= ${t[e]}) k = ${t[e]-1};
        offset += k * ${r[e]};
      `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${a}
        vec2 coords = offsetToCoords(offset, ${n}, ${i});
        float value = getColorAsFloat(${e.texture2D}(A, coords));
        return value;
      }
      `}}}),init_pool=__esm({"web/lib/onnxjs/backends/webgl/ops/pool.ts"(){"use strict";init_attribute_with_cache_key(),init_util(),init_types(),averagePool=(e,t,r)=>{validateInputs15(t);let n={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[e.run({...n,get:()=>createAveragePoolProgramInfo(t,n,!1,r)},t)]},parseAveragePoolAttributes=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),r=e.attributes.getInt("ceil_mode",0),n=0!==e.attributes.getInt("count_include_pad",0),i=e.attributes.getInts("kernel_shape"),o=e.attributes.getInts("strides",[]),s=e.attributes.getInts("pads",[]);if(0!==r)throw Error("using ceil() in shape computation is not yet supported for AveragePool");return createAttributeWithCacheKey({autoPad:t,ceilMode:r,countIncludePad:n,kernelShape:i,strides:o,pads:s})},createAveragePoolProgramInfo=(e,t,r,n)=>{let[i,o]=getAdjustedPoolAttributesAndOutputShape(e,n,r),s=ShapeUtil.size(i.kernelShape),a="value += _X(x);",u="";i.countIncludePad?u+=`value /= float(${s});`:u+=`value /= float(${s} - pad);`;let l=generatePoolingCode(e[0].dims,i,a,u,"0.0"),d=`
        ${l}
      `;return{...t,output:{dims:o,type:e[0].type,textureType:0},shaderSource:d}},globalAveragePool=(e,t,r)=>{validateInputs15(t);let n={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${r.countIncludePad}`};return[e.run({...n,get:()=>createAveragePoolProgramInfo(t,n,!0,r)},t)]},parseGlobalAveragePoolAttributes=e=>{let t=0!==e.attributes.getInt("count_include_pad",0);return createAttributeWithCacheKey({autoPad:"",ceilMode:0,countIncludePad:t,kernelShape:[],strides:[],pads:[]})},maxPool=(e,t,r)=>{validateInputs15(t);let n={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[e.run({...n,get:()=>createMaxPoolProgramInfo(t,n,!1,r)},t)]},parseMaxPoolAttributes=e=>{let t=e.attributes.getString("auto_pad","NOTSET"),r=e.attributes.getInt("ceil_mode",0),n=e.attributes.getInts("kernel_shape"),i=e.attributes.getInts("strides",[]),o=e.attributes.getInts("pads",[]),s=e.attributes.getInt("storage_order",0),a=e.attributes.getInts("dilations",[]);if(0!==s)throw Error("column major storage order is not yet supported for MaxPool");if(0!==r)throw Error("using ceil() in shape computation is not yet supported for MaxPool");return createAttributeWithCacheKey({autoPad:t,ceilMode:r,countIncludePad:!1,kernelShape:n,strides:i,pads:o,storageOrder:s,dilations:a})},createMaxPoolProgramInfo=(e,t,r,n)=>{let[i,o]=getAdjustedPoolAttributesAndOutputShape(e,n,r),s=`
      value = max(_X(x), value);
    `,a="",u=generatePoolingCode(e[0].dims,i,s,a,"-1e5"),l=`
      ${u}
    `;return{...t,output:{dims:o,type:e[0].type,textureType:0},shaderSource:l}},getAdjustedPoolAttributesAndOutputShape=(e,t,r)=>{let n=e[0].dims.slice(),i=Object.hasOwnProperty.call(t,"dilations"),o=t.kernelShape.slice(),s=t.strides.slice(),a=i?t.dilations.slice():[],u=t.pads.slice();PoolConvUtil.adjustPoolAttributes(r,n,o,s,a,u);let l=PoolConvUtil.computePoolOutputShape(r,n,s,a,o,u,t.autoPad),d=Object.assign({},t);return i?Object.assign(d,{kernelShape:o,strides:s,pads:u,dilations:a,cacheKey:t.cacheKey}):Object.assign(d,{kernelShape:o,strides:s,pads:u,cacheKey:t.cacheKey}),[d,l]},globalMaxPoolAttributes={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},globalMaxPoolMetadata={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},globalMaxPool=(e,t)=>(validateInputs15(t),[e.run({...globalMaxPoolMetadata,get:()=>createMaxPoolProgramInfo(t,globalMaxPoolMetadata,!0,globalMaxPoolAttributes)},t)]),validateInputs15=e=>{if(!e||1!==e.length)throw Error("Pool ops requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.")},generatePoolingCode=(e,t,r,n,i)=>{let o=e.length;if(t.kernelShape.length<=2){let s=t.kernelShape[t.kernelShape.length-1],a=t.strides[t.strides.length-1],u=t.pads[t.pads.length/2-1],l=t.pads[t.pads.length-1],d=e[o-1],p="",c="",h="";if(p=u+l!==0?`
          for (int i = 0; i < ${s}; i++) {
            x[${o} - 1] = indices[${o} - 1] * ${a} - ${u} + i;
            if (x[${o} - 1] < 0 || x[${o} - 1] >= ${d}) {
              pad++;
              continue;
            }
            ${r}
          }`:`
          for (int i = 0; i < ${s}; i++) {
            x[${o} - 1] = indices[${o} - 1] * ${a} - ${u} + i;
            ${r}
          }`,2===t.kernelShape.length){let r=t.kernelShape[t.kernelShape.length-2],n=t.strides[t.strides.length-2],i=t.pads[t.pads.length/2-2],a=t.pads[t.pads.length-2],u=e[o-2];c=i+a!==0?`
            for (int j = 0; j < ${r}; j++) {
              x[${o} - 2] = indices[${o} - 2] * ${n} - ${i} + j;
              if (x[${o} - 2] < 0 || x[${o} - 2] >= ${u}) {
                pad+= ${s};
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
      `}{let s=ShapeUtil.size(t.kernelShape),a=ShapeUtil.computeStrides(t.kernelShape),u=a.length,l=t.pads.length,d=offsetToIndices(u),p=copyArray(e,"inputDims"),c=copyArray(t.pads,"pads"),h=copyArray(a,"kernelStrides"),f=copyArray(t.strides,"strides"),m=t.pads.reduce((e,t)=>e+t),g="";return g=m?`
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
          for (int i = 0; i < ${s}; i++) {
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
      `}},copyArray=(e,t)=>{let r="";for(let n=0;n<e.length;n++)r+=`
      ${t}[${n}] = ${e[n]};
    `;return r},offsetToIndices=e=>`
  void offsetToIndices(int offset, int[${e}] strides, out int[${e}] indices) {
    if (${e} == 0) {
      return;
    }
    for (int i = 0; i < ${e} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${e} - 1] = offset;
  }`}}),init_reduce=__esm({"web/lib/onnxjs/backends/webgl/ops/reduce.ts"(){"use strict";init_attribute_with_cache_key(),init_operators(),init_util(),init_types(),reduce=(e,t,r,n,i)=>{validateInputs16(t);let o={name:n,inputNames:["A"],inputTypes:[0]};return[e.run({...o,cacheHint:r.cacheKey,get:()=>createReduceProgramInfo(e,t,r,n,i,o)},t)]},parseReduceAttributes=e=>{let t=e.attributes.getInts("axes",[]),r=1===e.attributes.getInt("keepdims",1);return createAttributeWithCacheKey({axes:t,keepDims:r})},createReduceProgramInfo=(e,t,r,n,i,o)=>{let s=[],a=t[0].dims.length||1,u=[],l=ShapeUtil.normalizeAxes(r.axes,t[0].dims.length),d=i(t,l),p=d[1];for(let e=0;e<t[0].dims.length;e++)l.indexOf(e)>=0||0===l.length?(r.keepDims&&s.push(1),p=`
          for(int j${e} = 0; j${e} < ${t[0].dims[e]}; j${e}++) {
            inputIdx[${e}] = j${e};
            ${p}
          }`):(u.push(`inputIdx[${e}] = outputIdx[${s.length}];`),s.push(t[0].dims[e]));let c=s.length||1,h=`
      float process(int outputIdx[${c}]) {
        float value;                 // final result
        int inputIdx[${a}];      // addressing input data
        ${u.join("\n")}
        ${d[0]}       // init ops for reduce max/min
        ${p}
        ${d[2]}       // final computation for reduce mean
        return value;
      }`;return{...o,output:{dims:s,type:t[0].type,textureType:0},shaderSource:h}},validateInputs16=e=>{if(!e||1!==e.length)throw Error("Reduce op requires 1 input.");if(-1===NUMBER_TYPES.indexOf(e[0].type))throw Error("Invalid input type.")},reduceSum=(e,t,r)=>reduce(e,t,r,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),reduceMean=(e,t,r)=>reduce(e,t,r,"ReduceMean",(e,t)=>{let r=1;for(let n=0;n<e[0].dims.length;n++)(t.indexOf(n)>=0||0===t.length)&&(r*=e[0].dims[n]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${r}.;`]}),reduceMax=(e,t,r)=>reduce(e,t,r,"ReduceMax",(e,t)=>{let r=[];for(let n=0;n<e[0].dims.length;n++)(t.indexOf(n)>=0||0===t.length)&&r.push(`inputIdx[${n}] = 0;`);return[`${r.join("\n")}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),reduceMin=(e,t,r)=>reduce(e,t,r,"ReduceMin",(e,t)=>{let r=[];for(let n=0;n<e[0].dims.length;n++)(t.indexOf(n)>=0||0===t.length)&&r.push(`inputIdx[${n}] = 0;`);return[`${r.join("\n")}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),reduceProd=(e,t,r)=>reduce(e,t,r,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),reduceLogSum=(e,t,r)=>reduce(e,t,r,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),reduceLogSumSquare=(e,t,r)=>reduce(e,t,r,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])}}),init_reshape=__esm({"web/lib/onnxjs/backends/webgl/ops/reshape.ts"(){"use strict";init_util(),reshape=(e,t)=>{let r=ShapeUtil.calculateReshapedDims(t[0].dims,t[1].integerData);return e.session.pack?[e.reshapePacked(t[0],r)]:[e.reshapeUnpacked(t[0],r)]}}}),init_upsample=__esm({"web/lib/onnxjs/backends/webgl/ops/upsample.ts"(){"use strict";init_attribute_with_cache_key(),init_glsl_source(),init_types(),upsampleProgramMetadata={name:"Upsample",inputNames:["X"],inputTypes:[0]},upsample=(e,t,r)=>(validateInputs17(t,r),[e.run({...upsampleProgramMetadata,cacheHint:r.cacheKey,get:()=>createUpsampleProgramInfo(e,t,r)},t)]),parseUpsampleAttributesV7=e=>parseUpsampleAttributes(e,7),parseUpsampleAttributesV9=e=>parseUpsampleAttributes(e,9),parseUpsampleAttributes=(e,t)=>{let r=t>=10,n=e.attributes.getString("mode","nearest");if("nearest"!==n&&"linear"!==n&&(t<11||"cubic"!==n))throw Error(`unrecognized mode: ${n}`);let i=[];t<9&&(i=e.attributes.getFloats("scales"),scalesValidation(i,n,r));let o=e.attributes.getFloat("extrapolation_value",0),s=t>10?e.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(-1===["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(s))throw Error(`coordinate_transform_mode '${s}' is not supported`);let a="tf_crop_and_resize"===s,u=a,l="nearest"===n&&t>=11?e.attributes.getString("nearest_mode","round_prefer_floor"):"";if(-1===["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l))throw Error(`nearest_mode '${l}' is not supported`);let d=e.attributes.getFloat("cubic_coeff_a",-.75),p=0!==e.attributes.getInt("exclude_outside",0);if(p&&"cubic"!==n)throw Error("exclude_outside can be set to 1 only when mode is CUBIC.");let c=t<11||"nearest"===n&&"asymmetric"===s&&"floor"===l,h=0,f=0,m=0;return t>10?e.inputs.length>2?(h=1,f=2,m=3):(f=1,m=2):9===t&&(f=1),createAttributeWithCacheKey({opset:t,isResize:r,mode:n,scales:i,extrapolationValue:o,coordinateTransformMode:s,useExtrapolation:u,needRoiInput:a,nearestMode:l,cubicCoefficientA:d,excludeOutside:p,useNearest2xOptimization:c,roiInputIdx:h,scalesInputIdx:f,sizesInputIdx:m})},createUpsampleProgramInfo=(e,t,r)=>{let n=getGlsl(e.session.backend.glContext.version),[i,o]=e.calculateTextureWidthAndHeight(t[0].dims,0),s=t[0].dims.map((e,t)=>Math.floor(e*r.scales[t])),[a,u]=e.calculateTextureWidthAndHeight(s,0),l=s.length,d=Array(l),p=Array(l),c=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let e=l-1;e>=0;e--)d[e]=e===l-1?1:d[e+1]*s[e+1],p[e]=e===l-1?1:p[e+1]*t[0].dims[e+1],c+=`
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
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

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
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

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
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

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
    }`;return{...upsampleProgramMetadata,output:{dims:s,type:t[0].type,textureType:0},shaderSource:f,variables:[{name:"scales",type:"int",arrayLength:r.scales.length,data:r.scales.map(e=>Math.ceil(e))}]}},validateInputs17=(e,t)=>{if(!e||t.opset<9&&1!==e.length||t.opset>=9&&t.opset<11&&2!==e.length||t.opset>=11&&e.length<2)throw Error("invalid inputs.");if(t.scales.length>0&&e[0].dims.length!==t.scales.length)throw Error("Invalid input shape.");if("string"===e[0].type)throw Error("Invalid input tensor types.")},scalesValidation=(e,t,r)=>{if(r){for(let t of e)if(t<=0)throw Error("Scale value should be greater than 0.")}else for(let t of e)if(t<1)throw Error("Scale value should be greater than or equal to 1.");if(("linear"===t||"cubic"===t)&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1]))throw Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${r?"Resize":"Upsample"} opeartor.`)}}}),init_resize_packed=__esm({"web/lib/onnxjs/backends/webgl/ops/resize-packed.ts"(){"use strict";init_glsl_source(),init_types(),init_utils(),init_packing_utils(),init_upsample(),resizeProgramMetadata={name:"Resize",inputNames:["A"],inputTypes:[2]},resize=(e,t,r)=>(validateInputs17(t,r),[e.run({...resizeProgramMetadata,cacheHint:r.cacheKey,get:()=>createPackedResizeProgramInfo(e,t,r)},t)]),parseResizeAttributesV10=e=>parseUpsampleAttributes(e,10),parseResizeAttributesV11=e=>parseUpsampleAttributes(e,11),createPackedResizeProgramInfo=(e,t,r)=>{let n=getGlsl(e.session.backend.glContext.version),[i,o]=prepareInputs(t,r);if(i.every(e=>1===e)&&"tf_crop_and_resize"!==r.coordinateTransformMode)return{...resizeProgramMetadata,output:{dims:o,type:t[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${n.texture2D}(X, TexCoords);
                    ${n.output} = v;
                }`};let s=o.length;if(s<2)throw Error(`output dimension should be at least 2, but got ${s}`);let a=o[s-2],u=o[s-1],l=t[0].dims;if(s!==l.length)throw Error(`output dimension should match input ${l.length}, but got ${s}`);let d=l[s-2],p=l[s-1],c=i[s-2],h=i[s-1],f="";if("linear"!==r.mode)throw Error(`resize (packed) does not support mode: '${r.mode}'`);switch(r.coordinateTransformMode){case"asymmetric":f=`
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
                            ${a}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${a}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":f=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${u}.0 - 1.0, ${a}.0 - 1.0, ${u}.0 - 1.0,
                            ${a}.0 - 1.0);
                        vec4 original = vec4(${p}.0 - 1.0, ${d}.0 - 1.0, ${p}.0 - 1.0,
                            ${d}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw Error(`resize (packed) does not support coordinateTransformMode:                                 '${r.coordinateTransformMode}'`)}let m=getCoordsDataType(s),g=unpackFromChannel(),b=`
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

                bool hasNextRow = rc.w < ${a-1};
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
        `;return{...resizeProgramMetadata,output:{dims:o,type:t[0].type,textureType:2},hasMain:!0,shaderSource:b}},prepareInputs=(e,t)=>{let r,n=e[0].dims,i=t.scales;if(0===i.length){let o=e[t.scalesInputIdx];if(o&&0!==o.size){if(e[t.sizesInputIdx])throw Error("Only one of scales or sizes must be provided as input.");i=parseScalesData(o,t.mode,t.isResize)}else{let o=e[t.sizesInputIdx];if(!o||0===o.size)throw Error("Either scales or sizes MUST be provided as input.");r=Array.from(o.integerData),i=parseScalesDataFromOutputSize(r,n,t.mode,t.isResize)}}else if(e[t.sizesInputIdx])throw Error("Only one of scales or sizes must be provided as input.");let o=r||n.map((e,t)=>Math.floor(e*i[t]));return[i,o]},parseScalesData=(e,t,r)=>{let n=Array.from(e.floatData);return scalesValidation(n,t,r),n},parseScalesDataFromOutputSize=(e,t,r,n)=>{let i=t.length,o=Array(i);for(let r=0,n=i;r<n;r++)if(0===t[r]){if(0!==e[r])throw Error("Input dim is zero but required output dim is non-zero.");o[r]=1}else o[r]=e[r]/t[r];return scalesValidation(o,r,n),o}}}),init_shape=__esm({"web/lib/onnxjs/backends/webgl/ops/shape.ts"(){"use strict";init_tensor2(),shape=(e,t)=>(validateInputs18(t),[new Tensor4([t[0].dims.length],"int32",void 0,void 0,new Int32Array(t[0].dims))]),validateInputs18=e=>{if(!e||1!==e.length)throw Error("Shape requires 1 input.")}}}),init_slice=__esm({"web/lib/onnxjs/backends/webgl/ops/slice.ts"(){"use strict";init_attribute_with_cache_key(),init_operators(),init_util(),init_types(),sliceProgramMetadata={name:"Slice",inputNames:["A"],inputTypes:[0]},slice=(e,t,r)=>(validateInputs19(t),[e.run({...sliceProgramMetadata,cacheHint:r.cacheKey,get:()=>createSliceProgramInfo(e,t[0],r)},t)]),parseSliceAttributes=e=>{let t=e.attributes.getInts("starts"),r=e.attributes.getInts("ends"),n=e.attributes.getInts("axes",[]);return createAttributeWithCacheKey({starts:t,ends:r,axes:n})},createSliceProgramInfo=(e,t,r)=>{let n=0===r.axes.length?t.dims.slice(0).map((e,t)=>t):r.axes,i=ShapeUtil.normalizeAxes(n,t.dims.length),o=r.starts.map((e,r)=>e>t.dims[i[r]]-1?t.dims[i[r]]:ShapeUtil.normalizeAxis(e,t.dims[i[r]])),s=r.ends.map((e,r)=>e>t.dims[i[r]]-1?t.dims[i[r]]:ShapeUtil.normalizeAxis(e,t.dims[i[r]])),a=t.dims.slice(),u=[];for(let e=0;e<i.length;e++)a[i[e]]=s[e]-o[e],o[e]>0&&u.push(`outputIdx[${i[e]}] += ${o[e]};`);let l=a.length,d=`
      float process(int outputIdx[${l}]) {
        ${u.join("\n      ")}
        return _A(outputIdx);
      }`;return{...sliceProgramMetadata,output:{dims:a,type:t.type,textureType:0},shaderSource:d}},validateInputs19=e=>{if(!e||1!==e.length)throw Error("Slice requires 1 input.");if(-1===NUMBER_TYPES.indexOf(e[0].type))throw Error("Invalid input type.")},sliceV10=(e,t)=>{validateInputsV10(t);let r=generateSliceAttributesFromInputs(e,t);return[e.run({...sliceProgramMetadata,cacheHint:r.cacheKey,get:()=>createSliceProgramInfo(e,t[0],r)},[t[0]])]},generateSliceAttributesFromInputs=(e,t)=>{if(!e.session.isInitializer(t[1].dataId)||!e.session.isInitializer(t[2].dataId)||t.length>=4&&!e.session.isInitializer(t[3].dataId)||t.length>=5&&!e.session.isInitializer(t[4].dataId))throw Error("dynamic slice attributes are not allowed");if(t.length>=5&&t[4].integerData.some(e=>1!==e))throw Error("currently non-1 steps is not supported for Slice");let r=Array.from(t[1].integerData),n=Array.from(t[2].integerData),i=t.length>=4?Array.from(t[3].integerData):[],o=`${i};${r};${n}`;return{starts:r,ends:n,axes:i,cacheKey:o}},validateInputsV10=e=>{if(!e||e.length<3||e.length>5)throw Error("Invalid input number.");if("int32"!==e[1].type||1!==e[1].dims.length||"int32"!==e[2].type||1!==e[2].dims.length||e.length>=4&&("int32"!==e[3].type||1!==e[3].dims.length)||e.length>=5&&("int32"!==e[4].type||1!==e[4].dims.length))throw Error("Invalid input type.")}}}),init_softmax=__esm({"web/lib/onnxjs/backends/webgl/ops/softmax.ts"(){"use strict";init_attribute_with_cache_key(),init_util(),init_glsl_source(),init_types(),init_transpose(),softmaxComputeMaxProgramMetadata={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},softmaxComputeScaleProgramMetadata={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},softmaxProgramMetadata={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},softmax=(e,t,r)=>{validateInputs20(t);let n=t[0].dims.slice(),i=ShapeUtil.normalizeAxis(r.axis,n.length),o=ShapeUtil.sizeToDimension(n,i),s=ShapeUtil.sizeFromDimension(n,i);return computeSoftmax(e,t,r,o,s)},parseSoftmaxAttributes=e=>createAttributeWithCacheKey({axis:e.attributes.getInt("axis",1)}),parseSoftmaxAttributesV13=e=>createAttributeWithCacheKey({axis:e.attributes.getInt("axis",-1)}),softmaxV13=(e,t,r)=>{let n;validateInputs20(t);let i=t[0].dims.slice(),o=ShapeUtil.normalizeAxis(r.axis,i.length),s=i.length,a=o!==s-1,u=[],l=[],d=[];a&&((l=Array.from({length:s}).map((e,t)=>t))[o]=s-1,l[s-1]=o,l.map(e=>u.push(i[e])),n=createAttributeWithCacheKey({perm:l}),d=transpose(e,t,n));let p=a?ShapeUtil.sizeToDimension(u,s-1):ShapeUtil.sizeToDimension(i,s-1),c=a?ShapeUtil.sizeFromDimension(u,s-1):ShapeUtil.sizeFromDimension(i,s-1),h=computeSoftmax(e,a?d:t,r,p,c);return a?transpose(e,h,n):h},computeSoftmax=(e,t,r,n,i)=>{let o=createComputeMaxProgramInfo(e,t[0],n,i,[n]),s=e.run({...softmaxComputeMaxProgramMetadata,cacheHint:r.cacheKey,get:()=>o},t),a=createComputScaleProgramInfo(e,t[0],n,i,o.output.dims,[n]),u=e.run({...softmaxComputeScaleProgramMetadata,cacheHint:r.cacheKey,get:()=>a},[t[0],s]),l=createSoftMaxProgramInfo(e,t[0],n,i,o.output.dims,a.output.dims);return[e.run({...softmaxProgramMetadata,cacheHint:r.cacheKey,get:()=>l},[t[0],s,u])]},createComputeMaxProgramInfo=(e,t,r,n,i)=>{let[o,s]=e.calculateTextureWidthAndHeight(t.dims,0),a=i.length;if(r<1||n<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==i.length)throw Error("Dimensionality of the output should be 1");if(i[0]!==r)throw Error("Shape of the output should be equal to logical row count");let u=getGlsl(e.session.backend.glContext.version),l=`
      float process(int[${a}] indices) {
        int logical_row_start_offset = indices[0] * ${n};

        float max = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset, ${o},
        ${s} )));
        for(int i=1; i<${n}; ++i)
        {
          float current = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${o}, ${s})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...softmaxComputeMaxProgramMetadata,output:{dims:i,type:t.type,textureType:0},shaderSource:l}},createComputScaleProgramInfo=(e,t,r,n,i,o)=>{let[s,a]=e.calculateTextureWidthAndHeight(t.dims,0),u=o.length;if(r<1||n<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==o.length)throw Error("Dimensionality of the output should be 1");if(o[0]!==r)throw Error("Shape of the output should be equal to logical row count");if(1!==i.length)throw Error("Dimensionality of the intermediate results should be 1");if(i[0]!==r)throw Error("Shape of the intermediate results should be equal to logical row count");let l=getGlsl(e.session.backend.glContext.version),d=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${n};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${n}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${s}, ${a}))) - max);
        }

        return norm_factor;
      }`;return{...softmaxComputeScaleProgramMetadata,output:{dims:o,type:t.type,textureType:0},shaderSource:d}},createSoftMaxProgramInfo=(e,t,r,n,i,o)=>{let[s,a]=e.calculateTextureWidthAndHeight(t.dims,0),u=t.dims.length;if(r<1||n<1)throw Error("Logical row count N and feature count D must be greater than or equal to 1");if(1!==i.length||1!==o.length)throw Error("Dimensionality of the intermediate results should be 1");if(i[0]!==r||o[0]!==r)throw Error("Shape of the intermediate results should be equal to logical row count");let l=`
      float process(int[${u}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${s}, ${a});

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
    }`;return{...softmaxProgramMetadata,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:l}},validateInputs20=e=>{if(!e||1!==e.length)throw Error("Softmax requires 1 input.");if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type")}}}),init_split=__esm({"web/lib/onnxjs/backends/webgl/ops/split.ts"(){"use strict";init_attribute_with_cache_key(),init_util(),init_types(),splitProgramMetadata={name:"Split",inputNames:["A"],inputTypes:[0]},split=(e,t,r)=>{validateInputs21(t);let n=ShapeUtil.normalizeAxis(r.axis,t[0].dims.length),i=getProgramCount(e,t,n,r),o=[];for(let s=0;s<i;++s)o.push(e.run({...splitProgramMetadata,cacheHint:`${r.cacheKey};${s}`,get:()=>createSplitProgramInfo(e,t[0],r,n,s)},t));return o},parseSplitAttributes=e=>{let t=e.attributes.getInt("axis",0),r=e.attributes.getInts("split",[]),n=e.outputs.length;return createAttributeWithCacheKey({axis:t,split:r,numOutputs:n})},getProgramCount=(e,t,r,n)=>{let[,i]=SplitUtil.splitShape(t[0].dims,r,n.split,n.numOutputs);return i.length},createSplitProgramInfo=(e,t,r,n,i)=>{let[o,s]=SplitUtil.splitShape(t.dims,n,r.split,r.numOutputs),a=s[i],u=o[i],l=u.length,d=`
      float process(int indices[${l}]) {
        indices[${n}] += ${a};
        return _A(indices);
      }
    `;return{...splitProgramMetadata,cacheHint:`${r.cacheKey}:${i}`,output:{dims:u,type:t.type,textureType:0},shaderSource:d}},validateInputs21=e=>{if(!e||1!==e.length)throw Error("Split requires one input.");if("int8"!==e[0].type&&"uint8"!==e[0].type&&"int16"!==e[0].type&&"uint16"!==e[0].type&&"int32"!==e[0].type&&"uint32"!==e[0].type&&"float32"!==e[0].type&&"float64"!==e[0].type&&"bool"!==e[0].type)throw Error("Invalid input type.")}}}),init_squeeze=__esm({"web/lib/onnxjs/backends/webgl/ops/squeeze.ts"(){"use strict";init_util(),squeeze=(e,t,r)=>{validateInputs22(t);let n=ShapeUtil.squeezeShape(t[0].dims,r);return[e.reshapeUnpacked(t[0],n)]},squeezeV13=(e,t)=>(validateInputsV13(t),squeeze(e,[t[0]],Array.from(t[1].integerData))),parseSqueezeAttributes=e=>e.attributes.getInts("axes"),validateInputs22=e=>{if(!e||1!==e.length)throw Error("Squeeze requires 1 input.");if("string"===e[0].type)throw Error("invalid input tensor types.")},validateInputsV13=e=>{if(!e||2!==e.length)throw Error("Squeeze requires 2 inputs.");if("int32"!==e[1].type)throw Error("Invalid input type.")}}}),init_sum=__esm({"web/lib/onnxjs/backends/webgl/ops/sum.ts"(){"use strict";init_glsl_source(),init_types(),sum=(e,t)=>{validateInputs23(t);let r={name:"Sum",inputNames:t.map((e,t)=>`X${t}`),inputTypes:Array(t.length).fill(0)};return[e.run({...r,get:()=>createSumProgramInfo(e,t,r)},t)]},createSumProgramInfo=(e,t,r)=>{let n=getGlsl(e.session.backend.glContext.version),i=t[0].dims.slice(),o=t.map((e,t)=>`${n.texture2D}(X${t},TexCoords)`).join(" + "),s=`
      void main() {
        vec4 result = ${o};
        ${n.output} = result;
      }
    `;return{...r,output:{dims:i,type:t[0].type,textureType:0},hasMain:!0,shaderSource:s}},validateInputs23=e=>{if(!e||0===e.length)throw Error("Sum requires inputs.");let t=e[0].dims.length;for(let r=1;r<e.length;r++){if(t!==e[r].dims.length)throw Error("Input shapes are mismatched.");for(let n=0;n<t;n++)if(e[0].dims[n]!==e[r].dims[n])throw Error("Input shapes are not matched.")}if("float32"!==e[0].type&&"float64"!==e[0].type)throw Error("Invalid input type.");for(let t=1;t<e.length;t++)if(e[0].type!==e[t].type)throw Error("Input types are not matched.")}}}),init_tile=__esm({"web/lib/onnxjs/backends/webgl/ops/tile.ts"(){"use strict";init_operators(),init_types(),tile=(e,t)=>{validateInputs24(t);let r={name:"Tile",inputNames:["A"],inputTypes:[0]};return[e.run({...r,get:()=>createTileProgramInfo(e,t,r)},t)]},createTileProgramInfo=(e,t,r)=>{let n=t[0].dims.slice(),i=Array(n.length),o=[];for(let e=0;e<n.length;e++)i[e]=n[e]*t[1].numberData[e],o.push(`inputIdx[${e}] = int(mod(float(outputIdx[${e}]), ${n[e]}.));`);let s=i.length,a=`
      float process(int outputIdx[${s}]) {
        int inputIdx[${s}];
        ${o.join("\n")}
        return _A(inputIdx);
      }
    `;return{...r,output:{dims:i,type:t[0].type,textureType:0},shaderSource:a}},validateInputs24=e=>{if(!e||2!==e.length)throw Error("Tile requires 2 input.");if(1!==e[1].dims.length)throw Error("The second input shape must 1 dimension.");if(e[1].dims[0]!==e[0].dims.length)throw Error("Invalid input shape.");if(-1===NUMBER_TYPES.indexOf(e[0].type))throw Error("Invalid input type.");if("int32"!==e[1].type&&"int16"!==e[1].type)throw Error("Invalid repeat type.")}}}),init_unsqueeze=__esm({"web/lib/onnxjs/backends/webgl/ops/unsqueeze.ts"(){"use strict";init_util(),unsqueeze=(e,t,r)=>{validateInputs25(t);let n=ShapeUtil.unsqueezeShape(t[0].dims,r);return[e.reshapeUnpacked(t[0],n)]},unsqueezeV13=(e,t)=>(validateInputsV132(t),unsqueeze(e,[t[0]],Array.from(t[1].integerData))),parseUnsqueezeAttributes=e=>e.attributes.getInts("axes"),validateInputs25=e=>{if(!e||1!==e.length)throw Error("Unsqueeze requires 1 input.");if("string"===e[0].type)throw Error("invalid input tensor types.")},validateInputsV132=e=>{if(!e||2!==e.length)throw Error("Unsqueeze requires 2 inputs.");if("int32"!==e[1].type)throw Error("Invalid input type.")}}}),init_op_resolve_rules=__esm({"web/lib/onnxjs/backends/webgl/op-resolve-rules.ts"(){"use strict";init_batch_normalization(),init_binary_op(),init_cast(),init_concat(),init_conv(),init_conv_transpose(),init_depth_to_space(),init_flatten(),init_gather(),init_gemm(),init_image_scaler(),init_instance_normalization(),init_lrn(),init_matmul(),init_pad(),init_pool(),init_reduce(),init_reshape(),init_resize_packed(),init_shape(),init_slice(),init_softmax(),init_split(),init_squeeze(),init_sum(),init_tile(),init_transpose(),init_unary_op(),init_unsqueeze(),init_upsample(),WEBGL_OP_RESOLVE_RULES=[["Abs","","6+",abs],["Acos","","7+",acos],["Add","","7+",add2],["And","","7+",and2],["Asin","","7+",asin],["Atan","","7+",atan],["AveragePool","","7+",averagePool,parseAveragePoolAttributes],["BatchNormalization","","7+",batchNormalization,parseBatchNormalizationAttributes],["Cast","","6+",cast,parseCastAttributes],["Ceil","","6+",ceil],["Clip","","6-10",clip,parseClipAttributes],["Clip","","11+",clipV11],["Concat","","4+",concat,parseConcatAttributes],["Conv","","1+",conv,parseConvAttributes],["ConvTranspose","","1+",convTranspose,parseConvTransposeAttributes],["Cos","","7+",cos],["Div","","7+",div],["Dropout","","7+",identity],["DepthToSpace","","1+",depthToSpace,parseDepthToSpaceAttributes],["Equal","","7+",equal],["Elu","","6+",elu,parseEluAttributes],["Exp","","6+",exp],["Flatten","","1+",flatten,parseFlattenAttributes],["Floor","","6+",floor],["FusedConv","com.microsoft","1+",conv,parseConvAttributes],["Gather","","1+",gather,parseGatherAttributes],["Gemm","","7-10",gemm,parseGemmAttributesV7],["Gemm","","11+",gemm,parseGemmAttributesV11],["GlobalAveragePool","","1+",globalAveragePool,parseGlobalAveragePoolAttributes],["GlobalMaxPool","","1+",globalMaxPool],["Greater","","7+",greater],["Identity","","1+",identity],["ImageScaler","","1+",imageScaler,parseImageScalerAttributes],["InstanceNormalization","","6+",instanceNormalization,parseInstanceNormalizationAttributes],["LeakyRelu","","6+",leakyRelu,parseLeakyReluAttributes],["Less","","7+",less],["LRN","","1+",lrn,parseLrnAttributes],["Log","","6+",log2],["MatMul","","1+",matMul,parseMatMulAttributes],["MaxPool","","1+",maxPool,parseMaxPoolAttributes],["Mul","","7+",mul],["Neg","","6+",neg],["Not","","1+",not2],["Or","","7+",or2],["Pad","","2-10",padV2,parsePadAttributesV2],["Pad","","11+",padV11,parsePadAttributesV11],["Pow","","7+",pow],["PRelu","","7+",pRelu],["ReduceLogSum","","1+",reduceLogSum,parseReduceAttributes],["ReduceMax","","1+",reduceMax,parseReduceAttributes],["ReduceMean","","1+",reduceMean,parseReduceAttributes],["ReduceMin","","1+",reduceMin,parseReduceAttributes],["ReduceProd","","1+",reduceProd,parseReduceAttributes],["ReduceSum","","1-12",reduceSum,parseReduceAttributes],["ReduceSumSquare","","1+",reduceLogSumSquare,parseReduceAttributes],["Relu","","6+",relu],["Reshape","","5+",reshape],["Resize","","10",resize,parseResizeAttributesV10],["Resize","","11+",resize,parseResizeAttributesV11],["Shape","","1+",shape],["Sigmoid","","6+",sigmoid],["Sin","","7+",sin],["Slice","","10+",sliceV10],["Slice","","1-9",slice,parseSliceAttributes],["Softmax","","1-12",softmax,parseSoftmaxAttributes],["Softmax","","13+",softmaxV13,parseSoftmaxAttributesV13],["Split","","2-12",split,parseSplitAttributes],["Sqrt","","6+",sqrt],["Squeeze","","1-12",squeeze,parseSqueezeAttributes],["Squeeze","","13+",squeezeV13],["Sub","","7+",sub],["Sum","","6+",sum],["Tan","","7+",tan],["Tanh","","6+",tanh],["Tile","","6+",tile],["Transpose","","1+",transpose,parseTransposeAttributes],["Upsample","","7-8",upsample,parseUpsampleAttributesV7],["Upsample","","9",upsample,parseUpsampleAttributesV9],["Unsqueeze","","1-12",unsqueeze,parseUnsqueezeAttributes],["Unsqueeze","","13+",unsqueezeV13],["Xor","","7+",xor2]]}});function replaceInlines(e){let t,r={};for(;null!==(t=INLINE_FUNC_DEF_REGEX.exec(e));){let e=t[3].split(",").map(e=>{let t=e.trim().split(" ");return t&&2===t.length?{type:t[0],name:t[1]}:null}).filter(e=>null!==e);r[t[2]]={params:e,body:t[4]}}for(let n in r){let i=RegExp(FUNC_CALL_REGEX.replace("__FUNC__",n),"gm");for(;null!==(t=i.exec(e));){let i=t[1],o=t[2],s=t[3].split(","),a=i?`${i} ${o};`:"",u=r[n].body,l="";r[n].params.forEach((e,t)=>{e&&(l+=`${e.type} ${e.name} = ${s[t]};
`)}),u=(u=`${l}
 ${u}`).replace("return",`${o} = `);let d=`
      ${a}
      {
        ${u}
      }
      `;e=e.replace(t[0],d)}}return e.replace(INLINE_FUNC_DEF_REGEX,"")}var init_glsl_function_inliner=__esm({"web/lib/onnxjs/backends/webgl/glsl-function-inliner.ts"(){"use strict";INLINE_FUNC_DEF_REGEX=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,FUNC_CALL_REGEX="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"}});function squeezeShape(e,t){let r=[],n=[],i=null!=t&&Array.isArray(t)&&0===t.length,o=null==t||i?null:parseAxisParam(t,e).sort(),s=0;for(let t=0;t<e.length;++t){if(null!=o){if(o[s]===t&&1!==e[t])throw Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(null==o[s]||o[s]>t)&&1===e[t]&&(r.push(e[t]),n.push(t)),o[s]<=t&&s++}1!==e[t]&&(r.push(e[t]),n.push(t))}return{newShape:r,keptDims:n}}function parseAxisParam(e,t){let r=t.length;return assert((e=null==e?t.map((e,t)=>t):[].concat(e)).every(e=>e>=-r&&e<r),()=>`All values in axis param must be in range [-${r}, ${r}) but got axis ${e}`),assert(e.every(isInt),()=>`All values in axis param must be integers but got axis ${e}`),e.map(e=>e<0?r+e:e)}function isInt(e){return e%1==0}function sizeFromShape(e){if(0===e.length)return 1;let t=e[0];for(let r=1;r<e.length;r++)t*=e[r];return t}function sizeToSquarishShape(e){let t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}var init_texture_layout_strategy=__esm({"web/lib/onnxjs/backends/webgl/texture-layout-strategy.ts"(){"use strict";init_instrument(),init_util(),PreferLogicalStrategy=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,t){let r=this.computeTexture(e,t);return(t&&t.isPacked&&(r[0]/=2,r[1]/=2),t&&t.reverseWH)?[r[1],r[0]]:r}computeTexture(e,t){let r=t&&t.isPacked;if(0===e.length)return r?[2,2]:[1,1];let n=this.maxTextureSize;if(t&&void 0!==t.breakAxis){let r=t.breakAxis>=e.length?1:e.slice(t.breakAxis).reduce((e,t)=>e*t),i=t.breakAxis<=0?1:e.slice(0,t.breakAxis).reduce((e,t)=>e*t);if(!(r>n)&&!(i>n))return[r,i];Logger.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${t.breakAxis}`)}let i=e.slice(0);r&&(n*=2,1===(i=i.map((e,t)=>t>=i.length-2?i[t]%2==0?i[t]:i[t]+1:i[t])).length&&(i=[2,i[0]])),2!==i.length&&(i=squeezeShape(i).newShape);let o=sizeFromShape(i);return i.length<=1&&o<=n?[1,o]:2===i.length&&i[0]<=n&&i[1]<=n?i:3===i.length&&i[0]*i[1]<=n&&i[2]<=n?[i[0]*i[1],i[2]]:3===i.length&&i[0]<=n&&i[1]*i[2]<=n?[i[0],i[1]*i[2]]:4===i.length&&i[0]*i[1]*i[2]<=n&&i[3]<=n?[i[0]*i[1]*i[2],i[3]]:4===i.length&&i[0]<=n&&i[1]*i[2]*i[3]<=n?[i[0],i[1]*i[2]*i[3]]:r?sizeToSquarishShape(o/4).map(e=>2*e):sizeToSquarishShape(o)}}}}),init_glsl_coordinate_lib=__esm({"web/lib/onnxjs/backends/webgl/glsl-coordinate-lib.ts"(){"use strict";init_util(),init_glsl_definitions(),init_glsl_source(),init_texture_layout_strategy(),init_utils(),CoordsGlslLib=class extends GlslLib{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new GlslLibRoutine(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new GlslLibRoutine(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let t=e.unpackedShape,r=[e.width,e.height],n={},i="getOutputCoords";switch(t.length){case 0:n[i]=this.getOutputScalarCoords();break;case 1:n[i]=this.getOutputPacked1DCoords(t,r);break;case 2:n[i]=this.getOutputPacked2DCoords(t,r);break;case 3:n[i]=this.getOutputPacked3DCoords(t,r);break;default:n[i]=this.getOutputPackedNDCoords(t,r)}let o=getGlsl(this.context.glContext.version),s=`
      void setOutput(vec4 val) {
        ${o.output} = val;
      }
    `;return n.floatTextureSetRGBA=new GlslLibRoutine(s),n}getUnpackedOutputSamplingSnippet(e){let t=e.unpackedShape,r=[e.width,e.height],n={},i="getOutputCoords";switch(t.length){case 0:n[i]=this.getOutputScalarCoords();break;case 1:n[i]=this.getOutputUnpacked1DCoords(t,r);break;case 2:n[i]=this.getOutputUnpacked2DCoords(t,r);break;case 3:n[i]=this.getOutputUnpacked3DCoords(t,r);break;case 4:n[i]=this.getOutputUnpacked4DCoords(t,r);break;case 5:n[i]=this.getOutputUnpacked5DCoords(t,r);break;case 6:n[i]=this.getOutputUnpacked6DCoords(t,r);break;default:throw Error(`Unsupported output dimensionality: ${t.length}`)}let o=getGlsl(this.context.glContext.version),s=`
        void setOutput(float val) {
          ${o.output} = vec4(val, 0, 0, 0);
        }
    `;return n.floatTextureSetR=new GlslLibRoutine(s),n}getOutputScalarCoords(){return new GlslLibRoutine(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,t){let r=t,n="";return 1===r[0]?n=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${r[1]}.0);
          }
        `:1===r[1]?n=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${r[0]}.0);
          }
        `:n=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${r[0]}, ${r[1]}));
          return 2 * (resTexRC.y * ${r[0]} + resTexRC.x);
        }
      `,new GlslLibRoutine(n)}getOutputPacked2DCoords(e,t){let r="";if(ArrayUtil.arraysEqual(e,t))return r=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new GlslLibRoutine(r);let n=t,i=Math.ceil(e[1]/2);return r=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));

          int index = resTexRC.y * ${n[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec2(r, c);
        }
      `,new GlslLibRoutine(r)}getOutputPacked3DCoords(e,t){let r=[t[0],t[1]],n=Math.ceil(e[2]/2),i=n*Math.ceil(e[1]/2),o=`
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
      `;return new GlslLibRoutine(o)}getOutputPackedNDCoords(e,t){let r=[t[0],t[1]],n=Math.ceil(e[e.length-1]/2),i=n*Math.ceil(e[e.length-2]/2),o=i,s="",a="b, r, c";for(let t=2;t<e.length-1;t++)o*=e[e.length-t-1],s=`
      int b${t} = index / ${o};
      index -= b${t} * ${o};
    `+s,a=`b${t}, `+a;let u=`
      ivec${e.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${r[0]}, ${r[1]}));
        int index = resTexRC.y * ${r[0]} + resTexRC.x;

        ${s}

        int b = index / ${i};
        index -= b * ${i};

        // reverse r and c order for packed texture
        int r = imod(index, ${n}) * 2;
        int c = 2 * (index / ${n});

        return ivec${e.length}(${a});
      }
    `;return new GlslLibRoutine(u)}getOutputUnpacked1DCoords(e,t){let r=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new GlslLibRoutine(r)}getOutputUnpacked2DCoords(e,t){let r=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new GlslLibRoutine(r)}getOutputUnpacked3DCoords(e,t){let r="",n=e.length,i=null;n<2&&(i=[]),(i=Array(n-1))[n-2]=e[n-1];for(let t=n-3;t>=0;--t)i[t]=i[t+1]*e[t+1];let o=["r","c","d"],s=i.map((e,t)=>{let r=`int ${o[t]} = index / ${e}`,n=t===i.length-1?`int ${o[t+1]} = index - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("");return r=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${s}
          return ivec3(r, c, d);
        }
      `,new GlslLibRoutine(r)}getOutputUnpacked4DCoords(e,t){let r="",n=e.length,i=null;n<2&&(i=[]),(i=Array(n-1))[n-2]=e[n-1];for(let t=n-3;t>=0;--t)i[t]=i[t+1]*e[t+1];let o=["r","c","d","d2"],s=i.map((e,t)=>{let r=`int ${o[t]} = index / ${e}`,n=t===i.length-1?`int ${o[t+1]} = index - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("");return r=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${s}
          return ivec4(r, c, d, d2);
        }
      `,new GlslLibRoutine(r)}getOutputUnpacked5DCoords(e,t){let r="",n=e.length,i=null;n<2&&(i=[]),(i=Array(n-1))[n-2]=e[n-1];for(let t=n-3;t>=0;--t)i[t]=i[t+1]*e[t+1];let o=["r","c","d","d2","d3"],s=i.map((e,t)=>{let r=`int ${o[t]} = index / ${e}`,n=t===i.length-1?`int ${o[t+1]} = index - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("");return r=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${s}
          return ivec5(r, c, d, d2, d3);
        }
      `,new GlslLibRoutine(r)}getOutputUnpacked6DCoords(e,t){let r="",n=e.length,i=null;n<2&&(i=[]),(i=Array(n-1))[n-2]=e[n-1];for(let t=n-3;t>=0;--t)i[t]=i[t+1]*e[t+1];let o=["r","c","d","d2","d3","d4"],s=i.map((e,t)=>{let r=`int ${o[t]} = index / ${e}`,n=t===i.length-1?`int ${o[t+1]} = index - ${o[t]} * ${e}`:`index -= ${o[t]} * ${e}`;return`${r}; ${n};`}).join("");return r=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${s}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new GlslLibRoutine(r)}getCommonUtilFuncs(){let e={},t="uvFromFlat";e[t]=new GlslLibRoutine(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),e[t="packedUVfrom1D"]=new GlslLibRoutine(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e[t="packedUVfrom2D"]=new GlslLibRoutine(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e[t="packedUVfrom3D"]=new GlslLibRoutine(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="sampleTexture";let r=getGlsl(this.context.glContext.version);return e[t]=new GlslLibRoutine(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${r.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n],o=generateShaderFuncNameFromInputSamplerName(r);i.isPacked?e[o]=this.getPackedSamplerFromInput(o,r,i):e[o]=this.getUnpackedSamplerFromInput(o,r,i);let s=generateShaderFuncNameFromInputSamplerNameAtOutCoords(r);i.unpackedShape.length<=t.unpackedShape.length&&(i.isPacked?e[s]=this.getPackedSamplerAtOutputCoords(s,i,t,r):e[s]=this.getUnpackedSamplerAtOutputCoords(s,i,t,r))}),e}getPackedSamplerAtOutputCoords(e,t,r,n){let i,o=t.unpackedShape,s=r.unpackedShape,a=generateShaderFuncNameFromInputSamplerName(n),u=o.length,l=s.length,d=BroadcastUtil.getBroadcastDims(o,s),p=getCoordsDataType(l),c=l-u,h=getGlChannels();i=0===u?"":l<2&&d.length>=1?"coords = 0;":d.map(e=>`coords.${h[e+c]} = 0;`).join("\n");let f="";f=l<2&&u>0?"coords":o.map((e,t)=>`coords.${h[t+c]}`).join(", ");let m="return outputValue;",g=1===ShapeUtil.size(o),b=1===ShapeUtil.size(s);if(1!==u||g||b){if(g&&!b)m=1===l?`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:`
          return vec4(outputValue.x);
        `;else if(d.length){let e=u-2,t=u-1;d.indexOf(e)>-1&&d.indexOf(t)>-1?m="return vec4(outputValue.x);":d.indexOf(e)>-1?m="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":d.indexOf(t)>-1&&(m="return vec4(outputValue.xx, outputValue.zz);")}}else m=`
        return vec4(outputValue.xy, outputValue.xy);
      `;let y=`
        int lastDim = coords.${h[l-1]};
        coords.${h[l-1]} = coords.${h[l-2]};
        coords.${h[l-2]} = lastDim;
      `,_=`
      vec4 ${e}() {
        ${p} coords = getOutputCoords();
        ${y}
        ${i}
        vec4 outputValue = ${a}(${f});
        ${m}
      }
    `;return new GlslLibRoutine(_,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,t,r,n){let i,o=[r.width,r.height],s=[t.width,t.height],a=t.unpackedShape.length,u=r.unpackedShape.length,l=t.unpackedShape,d=r.unpackedShape,p=generateShaderFuncNameFromInputSamplerName(n);if(a===u&&ArrayUtil.arraysEqual(s,o)){let t=`
          float ${e}() {
            return sampleTexture(${n}, TexCoords);
          }
        `;return new GlslLibRoutine(t,["coordinates.sampleTexture"])}let c=getCoordsDataType(u),h=BroadcastUtil.getBroadcastDims(l,d),f=u-a,m=getGlChannels();i=0===a?"":u<2&&h.length>=1?"coords = 0;":h.map(e=>`coords.${m[e+f]} = 0;`).join("\n");let g="";g=u<2&&a>0?"coords":t.unpackedShape.map((e,t)=>`coords.${m[t+f]}`).join(", ");let b=`
        float ${e}() {
          ${c} coords = getOutputCoords();
          ${i}
          return ${p}(${g});
        }
      `;return new GlslLibRoutine(b,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,t,r){switch(r.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,t);case 1:return this.getPackedSampler1D(e,t,r);case 2:return this.getPackedSampler2D(e,t,r);case 3:return this.getPackedSampler3D(e,t,r);default:return this.getPackedSamplerND(e,t,r)}}getUnpackedSamplerFromInput(e,t,r){let n=r.unpackedShape;switch(n.length){case 0:return this.getUnpackedSamplerScalar(e,t,r);case 1:return this.getUnpackedSampler1D(e,t,r);case 2:return this.getUnpackedSampler2D(e,t,r);case 3:return this.getUnpackedSampler3D(e,t,r);case 4:return this.getUnpackedSampler4D(e,t,r);case 5:return this.getUnpackedSampler5D(e,t,r);case 6:return this.getUnpackedSampler6D(e,t,r);default:throw Error(`Unsupported dimension ${n.length}-D`)}}getPackedSamplerScalar(e,t){let r=getGlsl(this.context.glContext.version),n=`
          vec4 ${e}() {
            return ${r.texture2D}(${t}, halfCR);
          }
        `;return new GlslLibRoutine(n)}getPackedSampler1D(e,t,r){let n=[r.width,r.height],i=[n[1],n[0]],o=getGlsl(this.context.glContext.version),s=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${o.texture2D}(${t}, uv);
    }`;return new GlslLibRoutine(s,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,t,r){let n=r.unpackedShape,i=[r.width,r.height],o=getGlsl(this.context.glContext.version),s=i[0],a=i[1];if(null!=i&&ArrayUtil.arraysEqual(n,i)){let r=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${a}.0, ${s}.0);
        return ${o.texture2D}(${t}, uv);
      }`;return new GlslLibRoutine(r)}let u=i,l=Math.ceil(n[1]/2),d=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${u[1]}, ${u[0]}, ${l}, row, col);
      return ${o.texture2D}(${t}, uv);
    }`;return new GlslLibRoutine(d,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,t,r){let n=r.unpackedShape,i=[r.width,r.height],o=[i[0],i[1]],s=getGlsl(this.context.glContext.version);if(1===n[0]){let i=n.slice(1),o=[1,2],s=squeezeInputShape(n,i),a=["b","row","col"],u=JSON.parse(JSON.stringify(r));u.unpackedShape=s;let l=this.getPackedSamplerFromInput(e,t,u),d=`${l.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${getSqueezedParams(a,o)});
      } `;return new GlslLibRoutine(d,l.dependencies)}let a=o[0],u=o[1],l=Math.ceil(n[2]/2),d=l*Math.ceil(n[1]/2),p=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${u}, ${a}, ${d}, ${l}, b, row, col);
      return ${s.texture2D}(${t}, uv);}`;return new GlslLibRoutine(p,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,t,r){let n=r.unpackedShape,i=n.length,o=[r.width,r.height],s=getGlsl(this.context.glContext.version),a=[o[0],o[1]],u=a[1],l=a[0],d=Math.ceil(n[i-1]/2),p=d*Math.ceil(n[i-2]/2),c="int b, int row, int col",h=`b * ${p} + (row / 2) * ${d} + (col / 2)`;for(let e=2;e<i-1;e++)c=`int b${e}, `+c,p*=n[i-e-1],h=`b${e} * ${p} + `+h;let f=`vec4 ${e}(${c}) {
      int index = ${h};
      int texR = index / ${l};
      int texC = index - texR * ${l};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${l}, ${u});
      return ${s.texture2D}(${t}, uv);
    }`;return new GlslLibRoutine(f)}getUnpackedSamplerScalar(e,t,r){let[n,i]=[r.width,r.height];if(1===n&&1===i){let r=`
          float ${e}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new GlslLibRoutine(r,["coordinates.sampleTexture"])}let o=`
        float ${e}() {
          int offset_${t} = coordsToOffset(TexCoords, ${n}, ${i});
          vec2 uv = uvFromFlat(${n}, ${i}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new GlslLibRoutine(o,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,t,r){let n=r.width,i=r.height;if(1===i&&1===n){let r=`
        float ${e}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new GlslLibRoutine(r,["coordinates.sampleTexture"])}if(1===i){let r=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${n}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new GlslLibRoutine(r,["coordinates.sampleTexture"])}if(1===n){let r=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new GlslLibRoutine(r,["coordinates.sampleTexture"])}let o=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${n}, ${i}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new GlslLibRoutine(o,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,t,r){let n=r.unpackedShape,i=[r.height,r.width];if(null!=i&&ArrayUtil.arraysEqual(n,i)){let r=i[1],n=i[0],o=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${r}.0, ${n}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new GlslLibRoutine(o,["coordinates.sampleTexture"])}let{newShape:o,keptDims:s}=squeezeShape(n),a=o;if(a.length<n.length){let i=squeezeInputShape(n,a),o=JSON.parse(JSON.stringify(r));o.unpackedShape=i;let u=["col","row"],l=`
          ${this.getUnpackedSamplerFromInput(e,t,o).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${getSqueezedParams(u,s)});
          }
        `;return new GlslLibRoutine(l,["coordinates.sampleTexture"])}let u=i[1],l=i[0];if(1===l){let r=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${u}, ${l});
            float index = dot(vec3(row, col, offset_${t}), vec3(${n[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${u}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new GlslLibRoutine(r,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(1===u){let r=`
          float ${e}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${u}, ${l});
            float index = dot(vec3(row, col, offset_${t}), vec3(${n[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${l}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new GlslLibRoutine(r,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let d=`
        float ${e}(int row, int col) {
          int index = col * ${n[1]} + row;
          vec2 uv = uvFromFlat(${u}, ${l}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new GlslLibRoutine(d,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,t,r){let n=r.unpackedShape,i=n[1]*n[2],o=n[2],{newShape:s,keptDims:a}=squeezeShape(n),u=s;if(u.length<n.length){let i=squeezeInputShape(n,u),o=["batch","col","row"],s=JSON.parse(JSON.stringify(r));s.unpackedShape=i;let l=this.getUnpackedSamplerFromInput(e,t,s),d=a.reverse(),p=`
          ${l.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${getSqueezedParams(o,d)});
          }
        `;return new GlslLibRoutine(p,l.dependencies)}let l=r.width,d=r.height,p=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${o} + row;
            vec2 uv = uvFromFlat(${l}, ${d}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new GlslLibRoutine(p,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,t,r){let n=r.unpackedShape,i=n[3],o=n[2]*i,s=n[1]*o,a=r.width,u=r.height,l=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${s} + col * ${o} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${a}, ${u}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new GlslLibRoutine(l,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,t,r){let n=r.unpackedShape,i=n[4],o=n[3]*i,s=n[2]*o,a=n[1]*s,{newShape:u,keptDims:l}=squeezeShape(n);if(u.length<n.length){let i=squeezeInputShape(n,u),o=["row","col","depth","depth2","depth3"],s=JSON.parse(JSON.stringify(r));s.unpackedShape=i;let a=`
          ${this.getUnpackedSamplerFromInput(e,t,s).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${getSqueezedParams(o,l)});
          }
        `;return new GlslLibRoutine(a,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let d=r.width,p=r.height,c=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${a} + col * ${s} + depth * ${o} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${d}, ${p}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new GlslLibRoutine(c,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,t,r){let n=r.unpackedShape,i=n[5],o=n[4]*i,s=n[3]*o,a=n[2]*s,u=n[1]*a,{newShape:l,keptDims:d}=squeezeShape(n);if(l.length<n.length){let i=squeezeInputShape(n,l),o=["row","col","depth","depth2","depth3","depth4"],s=JSON.parse(JSON.stringify(r));s.unpackedShape=i;let a=`
            ${this.getUnpackedSamplerFromInput(e,t,s).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${getSqueezedParams(o,d)});
            }
          `;return new GlslLibRoutine(a,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=r.width,c=r.height,h=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${u} + col * ${a} + depth * ${s} +
            depth2 * ${o} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${p}, ${c}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new GlslLibRoutine(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,t=e.shape.length,r=e.strides,n=e.width,i=e.height,o=[];for(let e=0;e<t-1;++e)o.push(`
        c[${e}] = offset / ${r[e]};`),o.push(`
        offset -= c[${e}] * ${r[e]};`);o.push(`
        c[${t-1}] = offset;`);let s=`
      void toVec(vec2 texCoords, out int c[${t}]) {
        int offset = coordsToOffset(texCoords, ${n}, ${i});
        ${o.join("")}
      }
      void toVec(int offset, out int c[${t}]) {
        ${o.join("")}
      }
    `;return{toVec:new GlslLibRoutine(s,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((t,r)=>{let n=this.context.inputTextureLayouts[r],i=(n.unpackedShape.length>0?n.unpackedShape:n.shape).length,o=`_${t}`;e[o]=new GlslLibRoutine(this.getValueFromSingle(t,i,n.width,n.height,!1),[`shapeUtils.indicesToOffset${o}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),e[o+="_T"]=new GlslLibRoutine(this.getValueFromSingle(t,i,n.width,n.height,!0),[`shapeUtils.indicesToOffset${o}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,t,r,n,i){let o=`_${e}`;i&&(o+="_T");let s=getGlsl(this.context.glContext.version);return`
        float ${o}(int m[${t}]) {
          int offset = indicesToOffset${o}(m);
          vec2 coords = offsetToCoords(offset, ${r}, ${n});
          float value = getColorAsFloat(${s.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,t,r,n,i){let o=`_${e}_Pack`;i&&(o+="_T");let s=getGlsl(this.context.glContext.version);return`
        vec4 ${o}(int m[${t}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${r}, ${n});
          return ${s.texture2D}(${e}, coords);
        }
        `}}}}),init_glsl_encoding_lib=__esm({"web/lib/onnxjs/backends/webgl/glsl-encoding-lib.ts"(){"use strict";init_glsl_definitions(),EncodingGlslLib=class e extends GlslLib{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new GlslLibRoutine(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new GlslLibRoutine(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let t=e.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new GlslLibRoutine(`
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
        `)}}decodeUint8(){let t=e.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new GlslLibRoutine(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${t}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),t=new Uint32Array(e),r=new Uint8Array(e);if(t[0]=0xdeadbeef,239===r[0])return!0;if(222===r[0])return!1;throw Error("unknown endianness")}}}}),init_glsl_fragcolor_lib=__esm({"web/lib/onnxjs/backends/webgl/glsl-fragcolor-lib.ts"(){"use strict";init_glsl_definitions(),init_glsl_source(),FragColorGlslLib=class extends GlslLib{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=getGlsl(this.context.glContext.version);return{setFragColor:new GlslLibRoutine(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new GlslLibRoutine(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}}}),init_glsl_shape_utils_lib=__esm({"web/lib/onnxjs/backends/webgl/glsl-shape-utils-lib.ts"(){"use strict";init_glsl_definitions(),ShapeUtilsGlslLib=class e extends GlslLib{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,t={};return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n].unpackedShape;if(i.length<=e){let n=i.length,o=e-n,s=`bcastIndices_${r}`,a="";for(let e=0;e<n;++e)a+=`
          realIndices[${e}] = int( mod(float(bcastedIndices[${o+e}]), ${i[e]}.0) );
          `;let u=`
        void ${s} (int bcastedIndices[${e}], out int realIndices[${n}]) {
          ${a}
        }
        `;t[s]=new GlslLibRoutine(u)}}),t}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,t={};return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n].shape;if(!(i.length<2||i.length>e)){let n=i.length,o=e-n,s=`bcastMatmulIndices_${r}`,a="";for(let e=0;e<n-2;++e)a+=`
          realIndices[${e}] = int( mod(float(bcastedIndices[${o+e}]), ${i[e]}.0) );
          `;let u=`
        void ${s}(int bcastedIndices[${e}], out int realIndices[${n}]) {
          ${a}
          realIndices[${n-1}] = bcastedIndices[${e-1}];
          realIndices[${n-2}] = bcastedIndices[${e-2}];
        }
        `;t[s]=new GlslLibRoutine(u)}}),t}indicesToOffset(){let t={};return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n].shape,o=this.context.inputTextureLayouts[n].strides,s=i.length,a=`indicesToOffset_${r}`;t[a]=new GlslLibRoutine(e.indexToOffsetSingle(a,s,o)),t[a=`indicesToOffset_${r}_T`]=new GlslLibRoutine(e.indexToOffsetSingle(a,s,o.slice().reverse()))}),t}static indexToOffsetSingle(e,t,r){let n="";for(let e=t-1;e>=0;--e)n+=`
        offset += indices[${e}] * ${r[e]};
        `;return`
      int ${e}(int indices[${t}]) {
        int offset = 0;
        ${n}
        return offset;
      }
      `}offsetToIndices(){let t={};return this.context.programInfo.inputNames.forEach((r,n)=>{let i=this.context.inputTextureLayouts[n].shape,o=this.context.inputTextureLayouts[n].strides,s=i.length,a=`offsetToIndices_${r}`;t[a]=new GlslLibRoutine(e.offsetToIndicesSingle(a,s,o)),t[a=`offsetToIndices_${r}_T`]=new GlslLibRoutine(e.offsetToIndicesSingle(a,s,o.slice().reverse()))}),t}static offsetToIndicesSingle(e,t,r){let n=[];for(let e=0;e<t-1;++e)n.push(`
      indices[${e}] = offset / ${r[e]};`),n.push(`
        offset -= indices[${e}] * ${r[e]};`);return n.push(`
      indices[${t-1}] = offset;`),`
      void ${e}(int offset, out int indices[${t}]) {
        ${n.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((t,r)=>{let n=this.context.inputTextureLayouts[r].shape,i=n.length,o=`incrementIndices_${t}`,s="";for(let e=0;e<i;++e)s+=`
        shape[${e}] = ${n[e]};`;let a=`
        void ${o}(int axis, out int indices[${i}]) {
          int shape[${i}];
          ${s};
          for(int i = ${i} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;e[o]=new GlslLibRoutine(a)}),e}}}}),init_glsl_vec_lib=__esm({"web/lib/onnxjs/backends/webgl/glsl-vec-lib.ts"(){"use strict";init_glsl_definitions(),VecGlslLib=class extends GlslLib{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let e=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},r={};for(let n in t){let i=`${n}Vec`,o="";for(let r=0;r<e;++r)o+=`
          dest[${r}] ${t[n]} src[${r}];
          `;let s=`
        void ${i}(int src[${e}], out int dest[${e}]) {
          ${o}
        }
        `;r[i]=new GlslLibRoutine(s)}return r}copyVec(){let e=this.context.outputTextureLayout.shape.length,t="";for(let r=0;r<e;++r)t+=`
        dest[${r}] = src[${r}];
        `;let r=`
      void copyVec(int src[${e}], out int dest[${e}]) {
        ${t}
      }
      `;return{copyVec:new GlslLibRoutine(r)}}setVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
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
        `;return{setVecItem:new GlslLibRoutine(r)}}getVecItem(){let e=this.context.outputTextureLayout.shape.length,t=`
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
    `;return{getVecItem:new GlslLibRoutine(r)}}}}}),init_glsl_registered_libs=__esm({"web/lib/onnxjs/backends/webgl/glsl-registered-libs.ts"(){"use strict";init_glsl_coordinate_lib(),init_glsl_encoding_lib(),init_glsl_fragcolor_lib(),init_glsl_shape_utils_lib(),init_glsl_vec_lib(),glslRegistry={encoding:EncodingGlslLib,fragcolor:FragColorGlslLib,vec:VecGlslLib,shapeUtils:ShapeUtilsGlslLib,coordinates:CoordsGlslLib}}}),init_glsl_preprocessor=__esm({"web/lib/onnxjs/backends/webgl/glsl-preprocessor.ts"(){"use strict";init_glsl_definitions(),init_glsl_function_inliner(),init_glsl_registered_libs(),init_glsl_source(),GlslPreprocessor=class{constructor(e,t,r,n){this.libs={},this.glslLibRoutineDependencyGraph={},this.context=new GlslContext(e,t,r,n),Object.keys(glslRegistry).forEach(e=>{let t=new glslRegistry[e](this.context);this.libs[e]=t});let i=this.glslLibRoutineDependencyGraph;for(let e in this.libs){let t=this.libs[e].getFunctions();for(let r in t){let n,o=e+"."+r;i[o]?(n=i[o]).routineBody=t[r].routineBody:(n=new GlslLibRoutineNode(o,t[r].routineBody),i[o]=n);let s=t[r].dependencies;if(s)for(let e=0;e<s.length;++e)if(i[s[e]])n.addDependency(i[s[e]]);else{let t=new GlslLibRoutineNode(s[e]);i[s[e]]=t,n.addDependency(t)}}}}preprocess(){let e=this.context.programInfo,t=e.shaderSource;return this.context.programInfo.hasMain||(t=`${t}
      ${getDefaultFragShaderMain(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),t=replaceInlines(t),`${getFragShaderPreamble(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(t)}
    ${t}`}getImports(e){let t=this.selectGlslLibRoutinesToBeIncluded(e);if(0===t.length)return"";let r="";for(let e=0;e<t.length;++e)if(t[e].routineBody)r+=t[e].routineBody+"\n";else throw Error(`Missing body for the Glsl Library routine: ${t[e].name}`);return r}selectGlslLibRoutinesToBeIncluded(e){let t=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(r=>{let n=r.split(".")[1];-1!==e.indexOf(n)&&t.push(this.glslLibRoutineDependencyGraph[r])}),TopologicalSortGlslRoutines.returnOrderedNodes(t)}getUniforms(e,t){let r=[];if(e)for(let t of e)r.push(`uniform sampler2D ${t};`);if(t)for(let e of t)r.push(`uniform ${e.type} ${e.name}${e.arrayLength?`[${e.arrayLength}]`:""};`);return r.join("\n")}}}}),init_program_manager=__esm({"web/lib/onnxjs/backends/webgl/program-manager.ts"(){"use strict";init_esm(),init_instrument(),init_glsl_preprocessor(),init_glsl_source(),ProgramManager=class{constructor(e,t,r){this.profiler=e,this.glContext=t,this.textureLayoutStrategy=r,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let n=this.glContext.gl,i=e.program;n.useProgram(i);try{this.bindOutput(r),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],t)}catch(t){throw Logger.error("ProgramManager",e.programInfo.shaderSource),t}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,t,r){return this.profiler.event("backend","ProgramManager.build",()=>{let n=new GlslPreprocessor(this.glContext,e,t,r),i=n.preprocess(),o=this.compile(i);return{programInfo:e,program:o,uniformLocations:this.getUniformLocations(o,n.context.programInfo.inputNames,n.context.programInfo.variables),attribLocations:this.getAttribLocations(o)}})}compile(e){if(!this.vertexShader){Logger.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let e=getVertexShaderSource(this.glContext.version);this.vertexShader=this.glContext.compileShader(e,this.glContext.gl.VERTEX_SHADER)}env2.debug&&Logger.verbose("ProrgramManager",`FragShader:
${e}
`);let t=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),r=this.glContext.createProgram(this.vertexShader,t);return this.glContext.deleteShader(t),r}bindOutput(e){let t=e.width,r=e.height;Logger.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${t}/${r}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,t,r)}bindAttributes(e){let t=e.position,r=e.textureCoord;this.glContext.setVertexAttributes(t,r),this.attributesBound=!0}bindUniforms(e,t,r){let n=this.glContext.gl,i=0;for(let{name:o,type:s,location:a,arrayLength:u}of e){let e=t.find(e=>e.name===o)?.data;if("sampler2D"!==s&&!e)throw Error(`variable '${o}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(r[i],a,i),i++;break;case"float":u?n.uniform1fv(a,e):n.uniform1f(a,e);break;case"int":u?n.uniform1iv(a,e):n.uniform1i(a,e);break;default:throw Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,t,r){this.glContext.bindTextureToUniform(e.texture,r,t)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,t,r){let n=[];if(t)for(let r of t)n.push({name:r,type:"sampler2D",location:this.getUniformLocation(e,r)});if(r)for(let t of r)n.push({...t,location:this.getUniformLocation(e,t.name)});return n}getUniformLocation(e,t){let r=this.glContext.gl.getUniformLocation(e,t);if(null===r)throw Error(`Uniform ${t} not found.`);return r}getAttribLocation(e,t){return this.glContext.gl.getAttribLocation(e,t)}}}}),init_texture_manager=__esm({"web/lib/onnxjs/backends/webgl/texture-manager.ts"(){"use strict";init_instrument(),init_texture_data_encoder(),TextureManager=class{constructor(e,t,r,n){this.glContext=e,this.layoutStrategy=t,this.profiler=r,this.config=n,this.pendingRead=new Map,n.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,t,r,n){let i,o,s=this.toEncoderType(e),a=this.glContext.getEncoder(s,t.channels||1,n);if(t.isPacked&&1===n)throw Error("not implemented");let u=t.width,l=t.height;if(this.config.reuseTextures){i=`${u}x${l}_${a.format}_${a.internalFormat}_${a.textureType}`,(o=this.inUseTextures.get(i))||(o=[],this.inUseTextures.set(i,o));let t=this.idleTextures.get(i);if(t&&t.length>0){let i=t.pop();return o.push(i),1===n&&this.glContext.updateTexture(i,u,l,a,this.toTextureData(e,r)),i}}Logger.verbose("TextureManager",`Creating new texture of size ${t.width}x${t.height}`);let d=this.glContext.allocateTexture(u,l,a,this.toTextureData(e,r));return this.config.reuseTextures&&(o.push(d),this.textureLookup.set(d,i)),d}readTexture(e,t,r){return r||(r=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let n=e.shape.reduce((e,t)=>e*t)*r,i=this.glContext.readTexture(e.texture,e.width,e.height,n,this.toEncoderType(t),r);return this.toTensorData(t,i)})}async readTextureAsync(e,t,r){let n=e.tensor.dataId;if(r||(r=1),this.pendingRead.has(n)){let e=this.pendingRead.get(n);return new Promise(t=>e?.push(t))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(n,[]);let i=e.shape.reduce((e,t)=>e*t)*r;await this.glContext.createAndWaitForFence();let o=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(t),r),s=this.toTensorData(t,o),a=this.pendingRead.get(n);return this.pendingRead.delete(n),a?.forEach(e=>e(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let t=e.shape.reduce((e,t)=>e*t),r=this.glContext.readTexture(e.texture,e.width,e.height,4*t,"byte",4);return new Float32Array(r.buffer,r.byteOffset,t)})}releaseTexture(e,t){let r;if(this.config.reuseTextures&&(r=this.textureLookup.get(e.texture))){t&&this.textureLookup.delete(r);let n=this.inUseTextures.get(r);if(n){let t=n.indexOf(e.texture);if(-1!==t){n.splice(t,1);let i=this.idleTextures.get(r);i||(i=[],this.idleTextures.set(r,i)),i.push(e.texture)}}}(!r||t)&&(Logger.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,t){switch(e){case"int16":return t instanceof Int16Array?t:Int16Array.from(t);case"int32":return t instanceof Int32Array?t:Int32Array.from(t);case"int8":return t instanceof Int8Array?t:Int8Array.from(t);case"uint16":return t instanceof Uint16Array?t:Uint16Array.from(t);case"uint32":return t instanceof Uint32Array?t:Uint32Array.from(t);case"uint8":case"bool":return t instanceof Uint8Array?t:Uint8Array.from(t);case"float32":return t instanceof Float32Array?t:Float32Array.from(t);case"float64":return t instanceof Float64Array?t:Float64Array.from(t);default:throw Error(`TensorData type ${e} is not supported`)}}toTextureData(e,t){if(t)return t instanceof Float32Array?t:new Float32Array(t)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}}}),init_session_handler=__esm({"web/lib/onnxjs/backends/webgl/session-handler.ts"(){"use strict";init_instrument(),init_opset(),init_inference_handler(),init_op_resolve_rules(),init_program_manager(),init_texture_layout_strategy(),init_texture_manager(),WebGLSessionHandler=class{constructor(e,t){this.backend=e,this.context=t,this.layoutStrategy=new PreferLogicalStrategy(e.glContext.maxTextureSize),this.programManager=new ProgramManager(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new TextureManager(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:"full"===e.textureCacheMode}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new WebGLInferenceHandler(this)}onGraphInitialized(e){let t=e.getValues().filter(e=>-1===e.from&&e.tensor).map(e=>e.tensor.dataId);this.initializers=new Set(t)}isInitializer(e){return!!this.initializers&&this.initializers.has(e)}addInitializer(e){this.initializers.add(e)}getTextureData(e,t){return t?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,t,r=!1){Logger.verbose("WebGLSessionHandler","Storing Texture data in cache"),r?this.packedTextureDataCache.set(e,t):this.unpackedTextureDataCache.set(e,t)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,t,r){let n=resolveOperator(e,t,WEBGL_OP_RESOLVE_RULES);return{impl:n.opImpl,context:n.opInit?n.opInit(e,r):e}}}}});function linearSearchLastTrue(e){let t=0;for(;t<e.length&&e[t]();++t);return t-1}var init_webgl_context=__esm({"web/lib/onnxjs/backends/webgl/webgl-context.ts"(){"use strict";init_esm(),init_texture_data_encoder(),init_texture_data_encoder(),init_utils(),WebGLContext=class{constructor(e,t){this.frameBufferBound=!1,this.itemsToPoll=[],this.gl=e,this.version=t,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,t,r,n){let i=this.gl,o=i.createTexture();i.bindTexture(i.TEXTURE_2D,o),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=n?r.encode(n,e*t):null;return i.texImage2D(i.TEXTURE_2D,0,r.internalFormat,e,t,0,r.format,r.textureType,s),this.checkError(),o}updateTexture(e,t,r,n,i){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e);let s=n.encode(i,t*r);o.texSubImage2D(o.TEXTURE_2D,0,0,0,t,r,n.format,n.textureType,s),this.checkError()}attachFramebuffer(e,t,r){let n=this.gl;n.bindTexture(n.TEXTURE_2D,e),n.bindFramebuffer(n.FRAMEBUFFER,this.framebuffer),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0),this.checkError(),n.viewport(0,0,t,r),n.scissor(0,0,t,r)}readTexture(e,t,r,n,i,o){let s=this.gl;o||(o=1),this.frameBufferBound||this.attachFramebuffer(e,t,r);let a=this.getEncoder(i,o),u=a.allocate(t*r);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,t,r,s.RGBA,a.textureType,u),this.checkError(),a.decode(u,n)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl,t=e.getParameter(this.gl.ACTIVE_TEXTURE);return`TEXTURE${t-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,t){let r=this.gl;r.vertexAttribPointer(e,3,r.FLOAT,!1,20,0),r.enableVertexAttribArray(e),-1!==t&&(r.vertexAttribPointer(t,2,r.FLOAT,!1,20,12),r.enableVertexAttribArray(t)),this.checkError()}createProgram(e,t){let r=this.gl,n=r.createProgram();return r.attachShader(n,e),r.attachShader(n,t),r.linkProgram(n),n}compileShader(e,t){let r=this.gl,n=r.createShader(t);if(!n)throw Error(`createShader() returned null with type ${t}`);if(r.shaderSource(n,e),r.compileShader(n),!1===r.getShaderParameter(n,r.COMPILE_STATUS))throw Error(`Failed to compile shader: ${r.getShaderInfoLog(n)}
Shader source:
${e}`);return n}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,t,r){let n=this.gl;n.activeTexture(n.TEXTURE0+t),this.checkError(),n.bindTexture(n.TEXTURE_2D,e),this.checkError(),n.uniform1i(r,t),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(env2.debug){let e=this.gl,t=e.getError(),r="";switch(t){case e.NO_ERROR:return;case e.INVALID_ENUM:r="INVALID_ENUM";break;case e.INVALID_VALUE:r="INVALID_VALUE";break;case e.INVALID_OPERATION:r="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:r="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:r="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:r="CONTEXT_LOST_WEBGL";break;default:r=`Unknown WebGL Error: ${t.toString(16)}`}throw Error(r)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,t,r=0){if(2===this.version)return new RedFloat32DataEncoder(this.gl,t);switch(e){case"float":if(1===r||this.isRenderFloat32Supported)return new RGBAFloatDataEncoder(this.gl,t);return new RGBAFloatDataEncoder(this.gl,t,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw Error("not implemented");case"byte":return new Uint8DataEncoder(this.gl,t);default:throw Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let t=0;t<this.maxTextureImageUnits;++t)e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,t=e.createBuffer();if(!t)throw Error("createBuffer() returned null");let r=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),this.checkError(),t}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),1===this.version&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){2===this.version?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t);let r=2===this.version?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,r,1,1,0,e.RGBA,e.FLOAT,null);let n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(t),e.deleteFramebuffer(n),i}checkRenderFloat32(){if(2===this.version){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(2===this.version){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e,t,r,n,i,o=this.gl;try{e=o.createTexture(),t=o.createFramebuffer(),o.bindTexture(o.TEXTURE_2D,e);let s=2===this.version?o.RGBA32F:o.RGBA;if(o.texImage2D(o.TEXTURE_2D,0,s,1,1,0,o.RGBA,o.FLOAT,null),o.bindFramebuffer(o.FRAMEBUFFER,t),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),o.enable(o.BLEND),!(r=o.createShader(o.VERTEX_SHADER))||(o.shaderSource(r,"void main(){}"),o.compileShader(r),!(n=o.createShader(o.FRAGMENT_SHADER)))||(o.shaderSource(n,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),o.compileShader(n),!(i=o.createProgram())))return!1;return o.attachShader(i,r),o.attachShader(i,n),o.linkProgram(i),o.useProgram(i),o.drawArrays(o.POINTS,0,1),o.getError()===o.NO_ERROR}finally{o.disable(o.BLEND),i&&o.deleteProgram(i),r&&o.deleteShader(r),n&&o.deleteShader(n),t&&(o.bindFramebuffer(o.FRAMEBUFFER,null),o.deleteFramebuffer(t)),e&&(o.bindTexture(o.TEXTURE_2D,null),o.deleteTexture(e))}}beginTimer(){if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension,r=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,r),r}throw Error("WebGL1 profiling currently not supported.")}endTimer(){if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,t=this.disjointTimerQueryWebgl2Extension;e.endQuery(t.TIME_ELAPSED_EXT);return}throw Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let t=!1,r=!1;if(2===this.version&&this.disjointTimerQueryWebgl2Extension){let n=this.gl,i=this.disjointTimerQueryWebgl2Extension;t=n.getQueryParameter(e,n.QUERY_RESULT_AVAILABLE),r=n.getParameter(i.GPU_DISJOINT_EXT)}else throw Error("WebGL1 profiling currently not supported");return t&&!r}getTimerResult(e){let t=0;if(2===this.version){let r=this.gl;t=r.getQueryParameter(e,r.QUERY_RESULT),r.deleteQuery(e)}else throw Error("WebGL1 profiling currently not supported");return t/1e6}async waitForQueryAndGetTime(e){return await repeatedTry(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,r=e,n=r.fenceSync(r.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),t=null===n?()=>!0:()=>{let e=r.clientWaitSync(n,0,0);return e===r.ALREADY_SIGNALED||e===r.CONDITION_SATISFIED},{query:n,isFencePassed:t}}async pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){let e=linearSearchLastTrue(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){let{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,t){this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1||await repeatedTry(()=>(this.pollItems(),0===this.itemsToPoll.length))}}}});function createWebGLContext(e){let t;if((!e||"webgl2"===e)&&"webgl2"in cache?t=cache.webgl2:(!e||"webgl"===e)&&"webgl"in cache&&(t=cache.webgl),!t)try{let r=createOffscreenCanvas();t=createNewWebGLContext(r,e)}catch{t=createNewWebGLContext(createCanvas(),e)}e=e||1===t.version?"webgl":"webgl2";let r=t.gl;return(cache[e]=t,r.isContextLost())?(delete cache[e],createWebGLContext(e)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),t)}function createNewWebGLContext(e,t){let r,n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1};if((!t||"webgl2"===t)&&(r=e.getContext("webgl2",n)))try{return new WebGLContext(r,2)}catch(e){Logger.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${e}`)}if((!t||"webgl"===t)&&(r=e.getContext("webgl",n)||e.getContext("experimental-webgl",n)))try{return new WebGLContext(r,1)}catch(e){Logger.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${e}`)}throw Error("WebGL is not supported")}function createCanvas(){if("u"<typeof document)throw TypeError("failed to create canvas: document is not supported");let e=document.createElement("canvas");return e.width=1,e.height=1,e}function createOffscreenCanvas(){if("u"<typeof OffscreenCanvas)throw TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var init_webgl_context_factory=__esm({"web/lib/onnxjs/backends/webgl/webgl-context-factory.ts"(){"use strict";init_instrument(),init_webgl_context(),cache={}}}),init_backend_webgl=__esm({"web/lib/onnxjs/backends/backend-webgl.ts"(){"use strict";init_esm(),init_instrument(),init_session_handler(),init_webgl_context_factory(),WebGLBackend=class{get contextId(){return env2.webgl.contextId}set contextId(e){env2.webgl.contextId=e}get matmulMaxBatchSize(){return env2.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){env2.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return env2.webgl.textureCacheMode}set textureCacheMode(e){env2.webgl.textureCacheMode=e}get pack(){return env2.webgl.pack}set pack(e){env2.webgl.pack=e}get async(){return env2.webgl.async}set async(e){env2.webgl.async=e}initialize(){try{return this.glContext=createWebGLContext(this.contextId),"number"!=typeof this.matmulMaxBatchSize&&(this.matmulMaxBatchSize=16),"string"!=typeof this.textureCacheMode&&(this.textureCacheMode="full"),"boolean"!=typeof this.pack&&(this.pack=!1),"boolean"!=typeof this.async&&(this.async=!1),Logger.setWithEnv(env2),env2.webgl.context||Object.defineProperty(env2.webgl,"context",{value:this.glContext.gl}),Logger.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Logger.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new WebGLSessionHandler(this,e)}dispose(){this.glContext.dispose()}}}});async function resolveBackend(e){if(!e)return resolveBackend(["webgl"]);for(let t of"string"==typeof e?[e]:e){let e=backendsCache.get(t);if(e)return e;let r=await tryLoadBackend(t);if(r)return r}throw Error("no available backend to use")}async function tryLoadBackend(e){let t=backend;if(void 0!==t[e]&&isBackend(t[e])){let r=t[e],n=r.initialize();if("object"==typeof n&&"then"in n&&(n=await n),n)return backendsCache.set(e,r),r}}function isBackend(e){let t=e;return"initialize"in t&&"function"==typeof t.initialize&&"createSessionHandler"in t&&"function"==typeof t.createSessionHandler&&"dispose"in t&&"function"==typeof t.dispose}var init_backend2=__esm({"web/lib/onnxjs/backend.ts"(){"use strict";init_backend_webgl(),backendsCache=new Map,backend={webgl:new WebGLBackend}}}),init_execution_plan=__esm({"web/lib/onnxjs/execution-plan.ts"(){"use strict";init_instrument(),KernelOp=class{constructor(e,t){this.op=e,this.node=t}},ExecutionPlan=class{constructor(e,t,r){this.graph=e,this.profiler=r,this.initialize(t)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let t=this.graph.getNodes();if(t.length!==e.length)throw Error("The size of nodes and OPs do not match.");this._ops=e.map((e,r)=>new KernelOp(e,t[r])),this.reset(),this._starter=[],this._ops.forEach((e,t)=>{let r=!0;for(let t of e.node.inputs)if(!this._values[t]&&-1===this.graph.getInputIndices().indexOf(t)){r=!1;break}r&&this._starter.push(t)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,t){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let r=e.createInferenceHandler(),n=this.graph.getInputIndices();if(t.length!==n.length)throw Error(`number of input tensors don't match the number of inputs to the model: actual: ${t.length} expected: ${n.length}`);t.forEach((e,t)=>{let r=n[t];this._values[r]=e});let i=this._starter.slice(0),o=this.graph.getValues(),s=this.graph.getNodes(),a=0;for(;a<i.length;){let e=i[a++],t=this._ops[e],n=t.node.inputs.map(e=>this._values[e]);if(-1!==n.indexOf(void 0))throw Error(`unresolved input detected: op: ${t.node}`);let u=n;Logger.verbose("ExecPlan",`Running op:${t.node.name} (${u.map((e,r)=>`'${t.node.inputs[r]}': ${e.type}[${e.dims.join(",")}]`).join(", ")})`);let l=await this.profiler.event("node",t.node.name,async()=>t.op.impl(r,u,t.op.context));if(l.length!==t.node.outputs.length)throw Error("the size of output does not match model definition.");l.forEach((e,r)=>{let n=t.node.outputs[r];if(this._values[n])throw Error(`output [${n}] already has value: op:${t.node.name}`);this._values[n]=e});let d=new Set;l.forEach((e,r)=>{for(let e of o[t.node.outputs[r]].to){let t=s[e],r=!0;for(let e of t.inputs)if(!this._values[e]){r=!1;break}r&&d.add(e)}}),i.push(...d)}let u=[];for(let e=0;e<this.graph.getOutputIndices().length;e++){let t=this.graph.getOutputIndices()[e],r=this._values[t];if(void 0===r)throw Error(`required output [${t}] does not have value`);0===t?await r.getData():r.data,u.push(r)}return Logger.verbose("ExecPlan","disposing of inferenceHandler"),r.dispose(),u})}}}}),init_attribute=__esm({"web/lib/onnxjs/attribute.ts"(){"use strict";init_ort_generated(),import_onnx3=__toESM(require_onnx()),init_tensor2(),init_util(),Attribute2=class e{constructor(t){if(this._attributes=new Map,null!=t){for(let r of t)r instanceof import_onnx3.onnx.AttributeProto?this._attributes.set(r.name,[e.getValue(r),e.getType(r)]):r instanceof import_attribute.Attribute&&this._attributes.set(r.name(),[e.getValue(r),e.getType(r)]);if(this._attributes.size<t.length)throw Error("duplicated attribute names")}}set(e,t,r){this._attributes.set(e,[r,t])}delete(e){this._attributes.delete(e)}getFloat(e,t){return this.get(e,"float",t)}getInt(e,t){return this.get(e,"int",t)}getString(e,t){return this.get(e,"string",t)}getTensor(e,t){return this.get(e,"tensor",t)}getFloats(e,t){return this.get(e,"floats",t)}getInts(e,t){return this.get(e,"ints",t)}getStrings(e,t){return this.get(e,"strings",t)}getTensors(e,t){return this.get(e,"tensors",t)}get(e,t,r){let n=this._attributes.get(e);if(void 0===n){if(void 0!==r)return r;throw Error(`required attribute not found: ${e}`)}if(n[1]!==t)throw Error(`type mismatch: expected ${t} but got ${n[1]}`);return n[0]}static getType(e){let t=e instanceof import_onnx3.onnx.AttributeProto?e.type:e.type();switch(t){case import_onnx3.onnx.AttributeProto.AttributeType.FLOAT:return"float";case import_onnx3.onnx.AttributeProto.AttributeType.INT:return"int";case import_onnx3.onnx.AttributeProto.AttributeType.STRING:return"string";case import_onnx3.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case import_onnx3.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case import_onnx3.onnx.AttributeProto.AttributeType.INTS:return"ints";case import_onnx3.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case import_onnx3.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw Error(`attribute type is not supported yet: ${import_onnx3.onnx.AttributeProto.AttributeType[t]}`)}}static getValue(e){let t=e instanceof import_onnx3.onnx.AttributeProto?e.type:e.type();if(t===import_onnx3.onnx.AttributeProto.AttributeType.GRAPH||t===import_onnx3.onnx.AttributeProto.AttributeType.GRAPHS)throw Error("graph attribute is not supported yet");let r=this.getValueNoCheck(e);if(t===import_onnx3.onnx.AttributeProto.AttributeType.INT&&LongUtil.isLong(r))return LongUtil.longToNumber(r);if(t===import_onnx3.onnx.AttributeProto.AttributeType.INTS){let e=r,t=Array(e.length);for(let r=0;r<e.length;r++){let n=e[r];t[r]=LongUtil.longToNumber(n)}return t}if(t===import_onnx3.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof import_onnx3.onnx.AttributeProto?Tensor4.fromProto(r):Tensor4.fromOrtTensor(r);if(t===import_onnx3.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof import_onnx3.onnx.AttributeProto)return r.map(e=>Tensor4.fromProto(e));else if(e instanceof import_attribute.Attribute)return r.map(e=>Tensor4.fromOrtTensor(e))}return t===import_onnx3.onnx.AttributeProto.AttributeType.STRING&&e instanceof import_onnx3.onnx.AttributeProto?decodeUtf8String(r):t===import_onnx3.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof import_onnx3.onnx.AttributeProto?r.map(decodeUtf8String):r}static getValueNoCheck(e){return e instanceof import_onnx3.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case import_onnx3.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case import_onnx3.onnx.AttributeProto.AttributeType.INT:return e.i;case import_onnx3.onnx.AttributeProto.AttributeType.STRING:return e.s;case import_onnx3.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case import_onnx3.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case import_onnx3.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case import_onnx3.onnx.AttributeProto.AttributeType.INTS:return e.ints;case import_onnx3.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case import_onnx3.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case import_onnx3.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw Error(`unsupported attribute type: ${import_onnx3.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case import_attribute_type.AttributeType.FLOAT:return e.f();case import_attribute_type.AttributeType.INT:return e.i();case import_attribute_type.AttributeType.STRING:return e.s();case import_attribute_type.AttributeType.TENSOR:return e.t();case import_attribute_type.AttributeType.GRAPH:return e.g();case import_attribute_type.AttributeType.FLOATS:return e.floatsArray();case import_attribute_type.AttributeType.INTS:{let t=[];for(let r=0;r<e.intsLength();r++)t.push(e.ints(r));return t}case import_attribute_type.AttributeType.STRINGS:{let t=[];for(let r=0;r<e.stringsLength();r++)t.push(e.strings(r));return t}case import_attribute_type.AttributeType.TENSORS:{let t=[];for(let r=0;r<e.tensorsLength();r++)t.push(e.tensors(r));return t}default:throw Error(`unsupported attribute type: ${import_attribute_type.AttributeType[e.type()]}`)}}}}}),init_graph=__esm({"web/lib/onnxjs/graph.ts"(){"use strict";init_attribute(),init_ort_generated(),import_onnx4=__toESM(require_onnx()),init_tensor2(),init_util(),Graph2={from:(e,t)=>new GraphImpl(e,t)},Value=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=ProtoUtil.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},Node2=class{constructor(e,t){e instanceof import_onnx4.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Attribute2(e.attribute)):e instanceof import_node.Node&&(this.name=t??e.name(),this.opType=e.opType(),this.attributes=new Attribute2(ProtoUtil.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},GraphImpl=class{constructor(e,t){if(!e)throw TypeError("graph is empty");this.buildGraph(e),this.transformGraph(t),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof import_onnx4.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof import_graph.Graph)this.buildGraphFromOrtFormat(e);else throw TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let r=new Map;if(!e.input)throw Error("missing information in graph: input");let n=[];for(let r of e.input){if(t.has(r.name))throw Error(`duplicated input name: ${r.name}`);let e=this._allData.push(new Value(r))-1;t.set(r.name,e),n.push(r.name)}if(!e.initializer)throw Error("missing information in graph: initializer");for(let r of e.initializer){let e=t.get(r.name);if(void 0===e){let n=new Value;n.type={shape:{dims:ProtoUtil.tensorDimsFromProto(r.dims)},tensorType:ProtoUtil.tensorDataTypeFromProto(r.dataType)},e=this._allData.push(n)-1,t.set(r.name,e)}this._allData[e]._from=-1,this._allData[e].tensor=Tensor4.fromProto(r)}for(let e=0;e<this._allData.length;e++)this._allData[e].tensor||(this._allInputIndices.push(e),this._allInputNames.push(n[e]));if(!e.output)throw Error("missing information in graph: output");for(let r of e.output){if(t.has(r.name))throw Error(`duplicated output name: ${r.name}`);let e=this._allData.push(new Value(r))-1;t.set(r.name,e),this._allOutputIndices.push(e),this._allOutputNames.push(r.name)}if(!e.node)throw Error("missing information in graph: node");for(let t of e.node){if(!t.name)for(let e=0;;e++){let n=`unnamed_${t.opType}_${e}`;if(!r.has(n)){t.name=n;break}}if(r.has(t.name))throw Error(`duplicated node name: ${t.name}`);let e=this._nodes.push(new Node2(t))-1;r.set(t.name,e)}for(let r=0;r<this._nodes.length;r++){let n=this._nodes[r],i=e.node[r];if(!i.output)throw Error(`missing output for node: ${i.name}`);for(let e of i.output){let o=t.get(e);if(void 0===o&&(o=this._allData.push(new Value)-1,t.set(e,o)),n.outputs.push(o),void 0!==this._allData[o]._from)throw Error(`multiple nodes output to one data value: ${o}`);if(this._allData[o]._from=r,"Constant"===i.opType){if(!i.attribute||1!==i.attribute.length||!i.attribute[0].t)throw Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!i.output||1!==i.output.length)throw Error("missing output or incorrect number of outputs for this Constant operator");n.outputs.pop(),n.executeNode=!1,this._allData[o]._from=-1,this._allData[o].tensor=Tensor4.fromProto(i.attribute[0].t)}}}for(let r=0;r<this._nodes.length;r++){let n=this._nodes[r],i=e.node[r];if(!i.input)throw Error(`missing input for node: ${i.name}`);for(let e of i.input){let o=t.get(e);if(void 0===o){if(""===e&&(3===i.input.length||4===i.input.length)&&"Resize"===i.opType)continue;throw Error(`unrecognized input '${e}' for node: ${i.name}`)}n.inputs.push(o),this._allData[o]._to.push(r)}}return!0}buildGraphFromOrtFormat(e){let t=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let r=new Map,n=[];for(let r=0;r<e.inputsLength();r++){let i=e.inputs(r);if(t.has(i))throw Error(`duplicated input name: ${i}`);for(let r=0;r<e.nodeArgsLength();r++)if(e.nodeArgs(r)?.name()===i){let o=new Value;if(e.nodeArgs(r)?.type()?.valueType()!==import_type_info_value.TypeInfoValue.tensor_type)throw Error("Unexpected value type for the nodeArg.");let s=e.nodeArgs(r).type().value(new import_tensor_type_and_shape.TensorTypeAndShape),a=ProtoUtil.tensorDataTypeFromProto(s.elemType()),u=s.shape(),l=[];for(let e=0;e<u.dimLength();e++)l.push(LongUtil.longToNumber(u.dim(e).value().dimValue()));o.type={shape:{dims:l},tensorType:a};let d=this._allData.push(o)-1;t.set(i,d),n.push(i)}}for(let r=0;r<e.initializersLength();r++){let n=e.initializers(r),i=t.get(n.name());if(void 0===i){let e=new Value;e.type={shape:{dims:ProtoUtil.tensorDimsFromORTFormat(n)},tensorType:ProtoUtil.tensorDataTypeFromProto(n.dataType())},i=this._allData.push(e)-1,t.set(n.name(),i)}this._allData[i]._from=-1,this._allData[i].tensor=Tensor4.fromOrtTensor(n)}for(let e=0;e<this._allData.length;e++)this._allData[e].tensor||(this._allInputIndices.push(e),this._allInputNames.push(n[e]));for(let r=0;r<e.outputsLength();r++){let n=e.outputs(r);if(t.has(n))throw Error(`duplicated output name: ${n}`);let i=this._allData.push(new Value)-1;t.set(n,i),this._allOutputIndices.push(i),this._allOutputNames.push(n)}if(!e.nodes)throw Error("missing information in graph: node");for(let t=0;t<e.nodesLength();t++){let n=e.nodes(t),i=n.name();if(!i)for(let e=0;i=`unnamed_${n.opType()}_${e}`,r.has(i);e++);if(r.has(i))throw Error(`duplicated node name: ${i}`);let o=this._nodes.push(new Node2(n,i))-1;r.set(i,o)}for(let r=0;r<this._nodes.length;r++){let n=this._nodes[r],i=e.nodes(r);if(null==i)throw Error(`No node exists at index ${r}`);if(i?.outputsLength()===0)throw Error(`missing output for node: ${i.name}`);for(let e=0;e<i?.outputsLength();e++){let o=i?.outputs(e),s=t.get(o);if(void 0===s&&(s=this._allData.push(new Value)-1,t.set(o,s)),n.outputs.push(s),void 0!==this._allData[s]._from)throw Error(`multiple nodes output to one data value: ${s}`);if(this._allData[s]._from=r,"Constant"===i.opType()){if(1!==i.attributesLength()||!i.attributes(0).t())throw Error("missing attributes or missing tensor value in attributes for this Constant operator");if(1!==i.outputsLength())throw Error("missing output or incorrect number of outputs for this Constant operator");n.outputs.pop(),n.executeNode=!1,this._allData[s]._from=-1,this._allData[s].tensor=Tensor4.fromOrtTensor(i.attributes(0).t())}}}for(let r=0;r<this._nodes.length;r++){let n=this._nodes[r],i=e.nodes(r);if(0===i.inputsLength())throw Error(`missing input for node: ${i.name}`);for(let e=0;e<i.inputsLength();e++){let o=i.inputs(e),s=t.get(o);if(void 0===s)throw Error(`unrecognized input '${o}' for node: ${i.name()}`);n.inputs.push(s),this._allData[s]._to.push(r)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(t=>{this._allData[t]._to.forEach(t=>{e.add(t)})});let t=Array.from(e),r=Array(this._nodes.length).fill("white");for(;t.length>0;){let e=t.pop();"gray"===r[e]?r[e]="black":(t.push(e),r[e]="gray",this._nodes[e].outputs.forEach(n=>{let i=this._allData[n];if(void 0!==i.tensor)throw Error("node outputs should not be initialized");if(i._from!==e)throw Error("from property of the Value object doesn't match index of Node being processed");i._to.forEach(e=>{if("gray"===r[e])throw Error("model graph is cyclic");"white"===r[e]&&t.push(e)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,t=[this._nodes.length,0],r=0;for(let e=0;e<this._nodes.length;e++)t[e]=r,this._nodes[e].executeNode?(r!==e&&(this._nodes[r]=this._nodes[e]),r++):this._nodes[e].outputs.forEach(e=>{this._allData[e]._from=-2});this._nodes.splice(r,this._nodes.length-r);for(let e=0;e<this._allData.length;e++){let r=this._allData[e];void 0!==r._from&&-1!==r._from&&-2!==r._from&&(r._from=t[r._from]);for(let e=0;e<r._to.length;e++)if(r._to[e]>=0)r._to[e]=t[r._to[e]];else throw Error("Trying to update a removed node")}e=0;for(let t=0;t<this._allData.length;t++){if(-2===this._allData[t].from&&-1===this._allOutputIndices.indexOf(t+e)){e++,this._allData.splice(t,1),t--;continue}if(e>0){let r=-1;void 0!==this._allData[t].from&&-1!==this._allData[t].from?-1!==(r=this._nodes[this._allData[t].from].outputs.indexOf(t+e))&&(this._nodes[this._allData[t].from].outputs[r]=t):-1!==(r=this._allInputIndices.indexOf(t+e))&&(this._allInputIndices[r]=t),this._allData[t].to.forEach(n=>{-1!==(r=this._nodes[n].inputs.indexOf(t+e))&&(this._nodes[n].inputs[r]=t)}),0===this._allData[t].to.length&&-1!==(r=this._allOutputIndices.indexOf(t+e))&&(this._allOutputIndices[r]=t)}}}deleteNode(e){let t=this._nodes[e];if(t.outputs.length>1){for(let e=1;e<t.outputs.length;e++)if(this._allData[t.outputs[e]].to.length>0)throw Error("Node deletion with more than one output connected to other nodes is not supported. ")}t.executeNode=!1;let r=t.inputs[0],n=t.outputs[0],i=this._allData[n].to;for(let r=0;r<t.inputs.length;r++){let n=this._allData[t.inputs[r]].to.indexOf(e);if(-1===n)throw Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[t.inputs[r]].to.splice(n,1)}this._allData[n]._to=[];let o=this._allOutputIndices.indexOf(n);if(-1!==o&&(this._allOutputIndices[o]=r),i&&i.length>0)for(let e of i){let t=this._nodes[e].inputs.indexOf(n);if(-1===t)throw Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[e].inputs[t]=r,this._allData[r].to.push(e)}}removeAllDropoutNodes(){let e=0;for(let t of this._nodes){if("Dropout"===t.opType){if(1!==t.inputs.length)throw Error("Dropout nodes should only contain one input. ");if(1!==t.outputs.length&&2!==t.outputs.length)throw Error("Dropout nodes should contain either 1 or 2 output(s)");if(2===t.outputs.length&&0!==this._allData[t.outputs[1]]._to.length)throw Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let t of this._nodes)"Identity"===t.opType&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if("Conv"===e.opType){let t=this._allData[e.outputs[0]]._to;if(1===t.length&&this.isActivation(this._nodes[t[0]])){let r=this._nodes[t[0]];if("Clip"===r.opType)if(1===r.inputs.length)try{e.attributes.set("activation_params","floats",[r.attributes.getFloat("min"),r.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[MIN_CLIP,MAX_CLIP])}else{if(!(r.inputs.length>=3)||void 0===this._allData[r.inputs[1]].tensor||void 0===this._allData[r.inputs[2]].tensor)continue;e.attributes.set("activation_params","floats",[this._allData[r.inputs[1]].tensor.floatData[0],this._allData[r.inputs[2]].tensor.floatData[0]])}e.attributes.set("activation","string",r.opType),this.deleteNode(t[0])}}}}}}),init_model=__esm({"web/lib/onnxjs/model.ts"(){"use strict";flatbuffers=__toESM(require_flatbuffers()),init_graph(),init_ort_generated(),import_onnx5=__toESM(require_onnx()),init_util(),Model2=class{load(e,t,r){let n;if(!r)try{this.loadFromOnnxFormat(e,t);return}catch(e){if(void 0!==r)throw e;n=e}try{this.loadFromOrtFormat(e,t)}catch(e){if(void 0!==r)throw e;throw Error(`Failed to load model as ONNX format: ${n}
as ORT format: ${e}`)}}loadFromOnnxFormat(e,t){let r=import_onnx5.onnx.ModelProto.decode(e);if(3>LongUtil.longToNumber(r.irVersion))throw Error("only support ONNX model with IR_VERSION>=3");this._opsets=r.opsetImport.map(e=>({domain:e.domain,version:LongUtil.longToNumber(e.version)})),this._graph=Graph2.from(r.graph,t)}loadFromOrtFormat(e,t){let r=new flatbuffers.ByteBuffer(e),n=import_inference_session.InferenceSession.getRootAsInferenceSession(r).model();if(3>LongUtil.longToNumber(n.irVersion()))throw Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let e=0;e<n.opsetImportLength();e++){let t=n.opsetImport(e);this._opsets.push({domain:t?.domain(),version:LongUtil.longToNumber(t.version())})}this._graph=Graph2.from(n.graph(),t)}get graph(){return this._graph}get opsets(){return this._opsets}}}}),init_session=__esm({"web/lib/onnxjs/session.ts"(){"use strict";init_backend2(),init_execution_plan(),init_instrument(),init_model(),Session=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=Profiler.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,t,r){await this.profiler.event("session","Session.loadModel",async()=>{let n=await resolveBackend(this.backendHint);if(this.sessionHandler=n.createSessionHandler(this.context),this._model=new Model2,"string"==typeof e){let t=e.endsWith(".ort");{let r=await fetch(e),n=await r.arrayBuffer();this.initialize(new Uint8Array(n),t)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let n=new Uint8Array(e,t||0,r||e.byteLength);this.initialize(n)}})}initialize(e,t){if(this._initialized)throw Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let r=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,r,t),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new ExecutionPlan(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let t=this.normalizeAndValidateInputs(e),r=await this._executionPlan.execute(this.sessionHandler,t);return this.createOutput(r)})}normalizeAndValidateInputs(e){let t=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==t.length)throw Error(`incorrect input array length: expected ${t.length} but got ${e.length}`)}else{if(e.size!==t.length)throw Error(`incorrect input map size: expected ${t.length} but got ${e.size}`);let r=Array(e.size),n=0;for(let i=0;i<t.length;++i){let o=e.get(t[i]);if(!o)throw Error(`missing input tensor for: '${name}'`);r[n++]=o}e=r}if(this.context.graphInputTypes&&0!==this.context.graphInputTypes.length&&this.context.graphInputDims&&0!==this.context.graphInputDims.length)this.validateInputTensorDims(this.context.graphInputDims,e,!1);else{let t=this._model.graph.getInputIndices(),r=this._model.graph.getValues(),n=Array(t.length);for(let i=0;i<t.length;++i){let o=r[t[i]];n[i]=o.type.shape.dims,this.context.graphInputTypes.push(o.type.tensorType),this.context.graphInputDims.push(e[i].dims)}this.validateInputTensorDims(n,e,!0)}return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,t){for(let r=0;r<t.length;r++){let n=e[r],i=t[r].type;if(n!==i)throw Error(`input tensor[${r}] check failed: expected type '${n}' but got ${i}`)}}validateInputTensorDims(e,t,r){for(let n=0;n<t.length;n++){let i=e[n],o=t[n].dims;if(!this.compareTensorDims(i,o,r))throw Error(`input tensor[${n}] check failed: expected shape '[${i.join(",")}]' but got [${o.join(",")}]`)}}compareTensorDims(e,t,r){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n]&&(!r||0!==e[n]))return!1;return!0}createOutput(e){let t=this._model.graph.getOutputNames();if(e.length!==t.length)throw Error("expected number of outputs do not match number of generated outputs");let r=new Map;for(let n=0;n<t.length;++n)r.set(t[n],e[n]);return r}initializeOps(e){let t=e.getNodes();this._ops=Array(t.length);for(let r=0;r<t.length;r++)this._ops[r]=this.sessionHandler.resolve(t[r],this._model.opsets,e)}}}}),init_session_handler_inference=__esm({"web/lib/onnxjs/session-handler-inference.ts"(){"use strict";init_esm(),init_tensor2(),OnnxjsSessionHandler=class{constructor(e){this.session=e,this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,t,r){let n=new Map;for(let t in e)if(Object.hasOwnProperty.call(e,t)){let r=e[t];n.set(t,new Tensor4(r.dims,r.type,void 0,void 0,r.data))}let i=await this.session.run(n),o={};return i.forEach((e,t)=>{o[t]=new Tensor2(e.type,e.data,e.dims)}),o}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}}}),backend_onnxjs_exports={};__export(backend_onnxjs_exports,{onnxjsBackend:()=>onnxjsBackend});var init_backend_onnxjs=__esm({"web/lib/backend-onnxjs.ts"(){"use strict";init_session(),init_session_handler_inference(),onnxjsBackend=new class{async init(){}async createInferenceSessionHandler(e,t){let r=new Session(t);return await r.loadModel(e),new OnnxjsSessionHandler(r)}}}}),init_wasm_utils_env=__esm({"web/lib/wasm/wasm-utils-env.ts"(){"use strict";isNode=!1}}),main_exports={};__export(main_exports,{default:()=>main_default});var init_main=__esm({"web/lib/wasm/proxy-worker/main.ts"(){"use strict";init_wasm_core_impl(),init_wasm_factory(),init_wasm_utils_import(),WORKER_NAME="ort-wasm-proxy-worker",(isProxyWorker=globalThis.self?.name===WORKER_NAME)&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":initializeWebAssembly(r.wasm).then(()=>{initRuntime(r).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})})},e=>{postMessage({type:t,err:e})});break;case"init-ep":{let{epName:e,env:n}=r;initEp(n,e).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})});break}case"copy-from":{let{buffer:e}=r,n=copyFromExternalBuffer(e);postMessage({type:t,out:n});break}case"create":{let{model:e,options:n}=r;createSession(e,n).then(e=>{postMessage({type:t,out:e})},e=>{postMessage({type:t,err:e})});break}case"release":releaseSession(r),postMessage({type:t});break;case"run":{let{sessionId:e,inputIndices:n,inputs:i,outputIndices:o,options:s}=r;run(e,n,i,o,Array(o.length).fill(null),s).then(e=>{e.some(e=>"cpu"!==e[3])?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:e},extractTransferableBuffers([...i,...e]))},e=>{postMessage({type:t,err:e})});break}case"end-profiling":endProfiling(r),postMessage({type:t})}}catch(e){postMessage({type:t,err:e})}}),main_default=isProxyWorker?null:e=>new Worker(e??scriptSrc,{type:"module",name:WORKER_NAME})}}),init_wasm_utils_import=__esm({"web/lib/wasm/wasm-utils-import.ts"(){"use strict";init_wasm_utils_env(),origin=isNode||"u"<typeof location?void 0:location.origin,isEsmImportMetaUrlHardcodedAsFileUri=import.meta.url>"file:"&&import.meta.url<"file;",scriptSrc=(()=>{if(!isNode){if(isEsmImportMetaUrlHardcodedAsFileUri){let e=URL;return new URL(new e("ort.all.mjs",import.meta.url).href,origin).href}return import.meta.url}})(),inferWasmPathPrefixFromScriptSrc=()=>{if(scriptSrc&&!scriptSrc.startsWith("blob:"))return scriptSrc.substring(0,scriptSrc.lastIndexOf("/")+1)},isSameOrigin=(e,t)=>{try{let r=t??scriptSrc;return(r?new URL(e,r):new URL(e)).origin===origin}catch{return!1}},normalizeUrl=(e,t)=>{let r=t??scriptSrc;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},fallbackUrl=(e,t)=>`${t??"./"}${e}`,preload=async e=>{let t=await fetch(e,{credentials:"same-origin"}),r=await t.blob();return URL.createObjectURL(r)},dynamicImportDefault=async e=>(await import(e)).default,createProxyWorker=(init_main(),__toCommonJS(main_exports)).default,importProxyWorker=async()=>{if(!scriptSrc)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(isSameOrigin(scriptSrc))return[void 0,createProxyWorker()];let e=await preload(scriptSrc);return[e,createProxyWorker(e)]},embeddedWasmModule=void 0,importWasmModule=async(e,t,r,n)=>{let i=embeddedWasmModule&&!(e||t);if(i)if(scriptSrc)i=isSameOrigin(scriptSrc)||n&&!r;else if(n&&!r)i=!0;else throw Error("cannot determine the script source URL.");if(i)return[void 0,embeddedWasmModule];{let n="ort-wasm-simd-threaded.jsep.mjs",i=e??normalizeUrl(n,t),o=!isNode&&r&&i&&!isSameOrigin(i,t),s=o?await preload(i):i??fallbackUrl(n,t);return[o?s:void 0,await dynamicImportDefault(s)]}}}}),init_wasm_factory=__esm({"web/lib/wasm/wasm-factory.ts"(){"use strict";init_wasm_utils_import(),initialized=!1,initializing=!1,aborted=!1,isMultiThreadSupported=()=>{if("u"<typeof SharedArrayBuffer)return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},isSimdSupported=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},isRelaxedSimdSupported=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},initializeWebAssembly=async e=>{if(initialized)return Promise.resolve();if(initializing)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(aborted)throw Error("previous call to 'initializeWebAssembly()' failed.");initializing=!0;let t=e.initTimeout,r=e.numThreads;if(!1===e.simd);else if("relaxed"===e.simd){if(!isRelaxedSimdSupported())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!isSimdSupported())throw Error("WebAssembly SIMD is not supported in the current environment.");let n=isMultiThreadSupported();r>1&&!n&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let i=e.wasmPaths,o="string"==typeof i?i:void 0,s=i?.mjs,a=s?.href??s,u=i?.wasm,l=u?.href??u,d=e.wasmBinary,[p,c]=await importWasmModule(a,o,r>1,!!d||!!l),h=!1,f=[];if(t>0&&f.push(new Promise(e=>{setTimeout(()=>{h=!0,e()},t)})),f.push(new Promise((e,t)=>{let n={numThreads:r};if(d)n.wasmBinary=d,n.locateFile=e=>e;else if(l||o)n.locateFile=e=>l??o+e;else if(a&&0!==a.indexOf("blob:"))n.locateFile=e=>new URL(e,a).href;else if(p){let e=inferWasmPathPrefixFromScriptSrc();e&&(n.locateFile=t=>e+t)}c(n).then(t=>{initializing=!1,initialized=!0,wasm2=t,e(),p&&URL.revokeObjectURL(p)},e=>{initializing=!1,aborted=!0,t(e)})})),await Promise.race(f),h)throw Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},getInstance=()=>{if(initialized&&wasm2)return wasm2;throw Error("WebAssembly is not initialized yet.")}}}),init_wasm_utils=__esm({"web/lib/wasm/wasm-utils.ts"(){"use strict";init_wasm_factory(),allocWasmString=(e,t)=>{let r=getInstance(),n=r.lengthBytesUTF8(e)+1,i=r._malloc(n);return r.stringToUTF8(e,i,n),t.push(i),i},iterateExtraOptions=(e,t,r,n)=>{if("object"==typeof e&&null!==e)if(r.has(e))throw Error("Circular reference in options");else r.add(e);Object.entries(e).forEach(([e,i])=>{let o=t?t+e:e;if("object"==typeof i)iterateExtraOptions(i,o+".",r,n);else if("string"==typeof i||"number"==typeof i)n(o,i.toString());else if("boolean"==typeof i)n(o,i?"1":"0");else throw Error(`Can't handle extra config type: ${typeof i}`)})},checkLastError=e=>{let t=getInstance(),r=t.stackSave();try{let r=t.PTR_SIZE,n=t.stackAlloc(2*r);t._OrtGetLastError(n,n+r);let i=Number(t.getValue(n,4===r?"i32":"i64")),o=t.getValue(n+r,"*"),s=o?t.UTF8ToString(o):"";throw Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(r)}}}}),init_run_options=__esm({"web/lib/wasm/run-options.ts"(){"use strict";init_wasm_factory(),init_wasm_utils(),setRunOptions=e=>{let t=getInstance(),r=0,n=[],i=e||{};try{if(e?.logSeverityLevel===void 0)i.logSeverityLevel=2;else if("number"!=typeof e.logSeverityLevel||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)i.logVerbosityLevel=0;else if("number"!=typeof e.logVerbosityLevel||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(i.terminate=!1);let o=0;return e?.tag!==void 0&&(o=allocWasmString(e.tag,n)),r=t._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,o),0===r&&checkLastError("Can't create run options."),e?.extra!==void 0&&iterateExtraOptions(e.extra,"",new WeakSet,(e,i)=>{let o=allocWasmString(e,n),s=allocWasmString(i,n);0!==t._OrtAddRunConfigEntry(r,o,s)&&checkLastError(`Can't set a run config entry: ${e} - ${i}.`)}),[r,n]}catch(e){throw 0!==r&&t._OrtReleaseRunOptions(r),n.forEach(e=>t._free(e)),e}}}}),init_session_options=__esm({"web/lib/wasm/session-options.ts"(){"use strict";init_wasm_factory(),init_wasm_utils(),getGraphOptimzationLevel=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}},getExecutionMode=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${e}`)}},appendDefaultOptions=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(e=>("string"==typeof e?e:e.name)==="webgpu")&&(e.enableMemPattern=!1)},appendSessionConfig=(e,t,r,n)=>{let i=allocWasmString(t,n),o=allocWasmString(r,n);0!==getInstance()._OrtAddSessionConfigEntry(e,i,o)&&checkLastError(`Can't set a session config entry: ${t} - ${r}.`)},setExecutionProviders=async(e,t,r)=>{for(let n of t.executionProviders){let t="string"==typeof n?n:n.name,i=[];switch(t){case"webnn":if(t="WEBNN","string"!=typeof n){let t=n,i=t?.deviceType;i&&appendSessionConfig(e,"deviceType",i,r)}break;case"webgpu":if(t="JS","string"!=typeof n){let t=n;if(t?.preferredLayout){if("NCHW"!==t.preferredLayout&&"NHWC"!==t.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${t.preferredLayout}`);appendSessionConfig(e,"preferredLayout",t.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${t}`)}let o=allocWasmString(t,r),s=i.length,a=0,u=0;if(s>0){a=getInstance()._malloc(s*getInstance().PTR_SIZE),r.push(a),u=getInstance()._malloc(s*getInstance().PTR_SIZE),r.push(u);for(let e=0;e<s;e++)getInstance().setValue(a+e*getInstance().PTR_SIZE,i[e][0],"*"),getInstance().setValue(u+e*getInstance().PTR_SIZE,i[e][1],"*")}await getInstance()._OrtAppendExecutionProvider(e,o,a,u,s)!==0&&checkLastError(`Can't append execution provider: ${t}.`)}},setSessionOptions=async e=>{let t=getInstance(),r=0,n=[],i=e||{};appendDefaultOptions(i);try{let e=getGraphOptimzationLevel(i.graphOptimizationLevel??"all"),o=getExecutionMode(i.executionMode??"sequential"),s="string"==typeof i.logId?allocWasmString(i.logId,n):0,a=i.logSeverityLevel??2;if(!Number.isInteger(a)||a<0||a>4)throw Error(`log severity level is not valid: ${a}`);let u=i.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log verbosity level is not valid: ${u}`);let l="string"==typeof i.optimizedModelFilePath?allocWasmString(i.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(e,!!i.enableCpuMemArena,!!i.enableMemPattern,o,!!i.enableProfiling,0,s,a,u,l),0===r&&checkLastError("Can't create session options."),i.executionProviders&&await setExecutionProviders(r,i,n),void 0!==i.enableGraphCapture){if("boolean"!=typeof i.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);appendSessionConfig(r,"enableGraphCapture",i.enableGraphCapture.toString(),n)}if(i.freeDimensionOverrides)for(let[e,o]of Object.entries(i.freeDimensionOverrides)){if("string"!=typeof e)throw Error(`free dimension override name must be a string: ${e}`);if("number"!=typeof o||!Number.isInteger(o)||o<0)throw Error(`free dimension override value must be a non-negative integer: ${o}`);let i=allocWasmString(e,n);0!==t._OrtAddFreeDimensionOverride(r,i,o)&&checkLastError(`Can't set a free dimension override: ${e} - ${o}.`)}return void 0!==i.extra&&iterateExtraOptions(i.extra,"",new WeakSet,(e,t)=>{appendSessionConfig(r,e,t,n)}),[r,n]}catch(e){throw 0!==r&&0!==t._OrtReleaseSessionOptions(r)&&checkLastError("Can't release session options."),n.forEach(e=>t._free(e)),e}}}}),init_wasm_common=__esm({"web/lib/wasm/wasm-common.ts"(){"use strict";tensorDataTypeStringToEnum=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${e}`)}},tensorDataTypeEnumToString=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${e}`)}},calculateTensorSizeInBytes=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n="number"==typeof t?t:t.reduce((e,t)=>e*t,1);return r>0?Math.ceil(n*r):void 0},tensorTypeToTypedArrayConstructor=e=>{switch(e){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},logLevelStringToEnum=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${e}`)}},isGpuBufferSupportedType=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,isMLTensorSupportedType=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint64"===e||"int8"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,dataLocationStringToEnum=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${e}`)}}}}),init_wasm_utils_load_file=__esm({"web/lib/wasm/wasm-utils-load-file.ts"(){"use strict";init_wasm_utils_env(),loadFile=async e=>{if("string"==typeof e)if(isNode)try{let{readFile:t}=__require("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if("ERR_FS_FILE_TOO_LARGE"===t.code){let{createReadStream:t}=__require("node:fs"),r=t(e),n=[];for await(let e of r)n.push(e);return new Uint8Array(Buffer.concat(n))}throw t}else{let t=await fetch(e);if(!t.ok)throw Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<0x40000000)return new Uint8Array(await t.arrayBuffer());{let r;if(!t.body)throw Error(`failed to load external data file: ${e}, no response body.`);let i=t.body.getReader();try{r=new ArrayBuffer(n)}catch(e){if(e instanceof RangeError){let e=Math.ceil(n/65536);r=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let o=0;for(;;){let{done:e,value:t}=await i.read();if(e)break;let n=t.byteLength;new Uint8Array(r,o,n).set(t),o+=n}return new Uint8Array(r,0,n)}}return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}}),init_log=__esm({"web/lib/wasm/jsep/log.ts"(){"use strict";init_wasm_common(),logLevelPrefix=["V","I","W","E","F"],doLog=(e,t)=>{console.log(`[${logLevelPrefix[e]},${new Date().toISOString()}]${t}`)},configureLogger=(e,t)=>{configLogLevel=e,debug=t},LOG=(e,t)=>{let r=logLevelStringToEnum(e);r>=logLevelStringToEnum(configLogLevel)&&doLog(r,"function"==typeof t?t():t)},LOG_DEBUG=(...e)=>{debug&&LOG(...e)}}}),init_util2=__esm({"web/lib/wasm/jsep/util.ts"(){"use strict";MatMulUtil2=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},BroadcastUtil2=class{static calcShape(e,t,r=!1){let n=e.length,i=t.length;if(0===n)return t;if(0===i)return e;let o=Math.max(e.length,t.length),s=Array(o);if(r){if(n<2||i<2)return;let r=MatMulUtil2.calcMatMulShape([e[n-2],e[n-1]],[t[i-2],t[i-1]]);if(void 0===r)return;[s[o-2],s[o-1]]=r}for(let a=r?3:1;a<=o;a++){let r=n-a<0?1:e[n-a],u=i-a<0?1:t[i-a];if(r!==u&&r>1&&u>1)return;let l=Math.max(r,u);if(r&&u)s[o-a]=Math.max(r,u);else{if(l>1)return;s[o-a]=0}}return s}static isValidBroadcast(e,t){let r=e.length,n=t.length;if(r>n)return!1;for(let i=1;i<=r;i++)if(1!==e[r-i]&&e[r-i]!==t[n-i])return!1;return!0}},ShapeUtil2=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(e,t=4){let r=e.length;if(0===r)return[];let n=Array(r),i=r-1;for(;i>=0;){if(e[i]%t==0){n[i]=e[i]/t;break}if(t%e[i]!=0)throw Error("cannot convert shape");n[i]=1,t/=e[i],i--}for(i--;i>=0;i--)n[i]=e[i];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(e,t,r){let n=1;for(let i=t;i<r;i++){if(e[i]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(e[i])}return n}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let r=Array(t);r[t-1]=1,r[t-2]=e[t-1];for(let n=t-3;n>=0;--n)r[n]=r[n+1]*e[n+1];return r}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(r=>this.normalizeAxis(r,t??e.length))}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let r=e.length;return e.map((e,n)=>e+t[n]+t[n+r])}static areEqual(e,t){return e.length===t.length&&e.every((e,r)=>e===t[r])}},PoolConvUtil2=class e{static adjustPoolAttributes(e,t,r,n,i,o){if(!e&&r.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=r.length?r.push(t[e+2]):r[e]=t[e+2];for(let e=0;e<r.length;e++)if(e<n.length){if(n[e]<0)throw Error("strides should be greater than or equal to 1")}else n.push(1);for(let e=0;e<r.length;e++)if(e<i.length){if(i[e]<0)throw Error("dilations should be greater than or equal to 1")}else i.push(1);for(let e=0;e<2*r.length;e++)if(e<o.length){if(o[e]<0)throw Error("pad should be greater than or equal to 1")}else o.push(0);for(let e=0;e<r.length;e++){if(r[e]<=0)throw Error("kernel shapes need to be greater than 0");if(o[e]>=r[e]||o[e+r.length]>=r[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,i,o,s,a){if(a){if(o.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+(s?1:2)],r[u],n[u],i[u],o,u,u+t.length-2,a)}}static computePoolOutputShape(t,r,n,i,o,s,a){if(r.length<=0)throw Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return e.computeShapeHelper(t,r,u,n,i,o,s,a),u}static computeConvOutputShape(t,r,n,i,o,s,a){if(t.length<=0||r.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return e.computeShapeHelper(!1,t,u,n,i,o,s,a),u}static computeShapeHelper(t,r,n,i,o,s,a,u){if(t)for(let e=0;e<r.length-2;e++)n.push(1);else for(let t=0;t<r.length-2;t++)n.push(e.adjustPadAndReturnShape(r[t+2],i[t],o[t],s[t],a,t,t+r.length-2,u))}static adjustPadAndReturnShape(e,t,r,n,i,o,s,a){let u=r*(n-1)+1;if(!a||"NOTSET"===a)return Math.floor((e+i[o]+i[s]-u)/t+1);switch(a){case"VALID":return i[o]=0,i[s]=0,Math.floor((e-u)/t+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==r)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let r=((e+t-1)/t-1)*t+n-e;return i[o]="SAME_LOWER"===a?Math.floor((r+1)/2):Math.floor(r/2),i[s]=r-i[o],Math.floor((e+r-n)/t+1)}default:throw Error("Unsupported AutoPad type")}}},GemmUtil2=class{static getShapeOfGemmResult(e,t,r,n,i){let o,s,a;if(2!==e.length||2!==r.length)throw Error("shape need to be of size 2");t?(o=e[1],s=e[0]):(o=e[0],s=e[1]);let u=-1;if(n?(a=r[0],u=1):(a=r[1],u=0),r[u]!==s)throw Error("dimension mismatch");if(o<=0||a<=0||s<=0)throw Error("invalid shape specified");if(i&&!BroadcastUtil2.isValidBroadcast(i,[o,a]))throw Error("gemm: invalid bias shape for broadcast");return[o,a,s]}},MIN_CLIP2=-34028234663852886e22,MAX_CLIP2=34028234663852886e22}}),init_tensor_view=__esm({"web/lib/wasm/jsep/tensor-view.ts"(){"use strict";init_wasm_common(),createView2=(e,t)=>new(tensorTypeToTypedArrayConstructor(t))(e)}}),init_tensor_manager=__esm({"web/lib/wasm/jsep/webnn/tensor-manager.ts"(){"use strict";init_wasm_common(),init_log(),webnnDataTypeToSize=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),convertDataToInt32=(e,t)=>{if("int32"===t)return e;let r=webnnDataTypeToSize.get(t);if(!r)throw Error(`WebNN backend does not support data type: ${t}`);let n=r/8;if(e.byteLength%n!=0)throw Error(`Invalid Uint8Array length - must be a multiple of ${n}.`);let i=e.byteLength/n,o=new(tensorTypeToTypedArrayConstructor(t))(e.buffer,e.byteOffset,i);switch(t){case"int64":case"uint64":{let e=new Int32Array(i);for(let t=0;t<i;t++){let r=o[t];if(r>2147483647n||r<-2147483648n)throw Error("Can not convert int64 data to int32 - value out of range.");e[t]=Number(r)}return new Uint8Array(e.buffer)}case"int8":case"uint8":case"uint32":if("uint32"===t&&o.some(e=>e>0x7fffffff))throw Error("Can not convert uint32 data to int32 - value out of range.");return new Uint8Array(Int32Array.from(o,Number).buffer);default:throw Error(`Unsupported data conversion from ${t} to 'int32'`)}},convertInt32ToData=(e,t)=>{if("int32"===t)return e;if(e.byteLength%4!=0)throw Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,n=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":return new Uint8Array(BigInt64Array.from(n,BigInt).buffer);case"uint64":if(n.some(e=>e<0))throw Error("Can not convert int32 data to uin64 - negative value found.");return new Uint8Array(BigUint64Array.from(n,BigInt).buffer);case"int8":if(n.some(e=>e<-128||e>127))throw Error("Can not convert int32 data to int8 - value out of range.");return new Uint8Array(Int8Array.from(n,Number).buffer);case"uint8":if(n.some(e=>e<0||e>255))throw Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(n,Number);case"uint32":if(n.some(e=>e<0))throw Error("Can not convert int32 data to uint32 - negative value found.");return new Uint8Array(Uint32Array.from(n,Number).buffer);default:throw Error(`Unsupported data conversion from 'int32' to ${t}`)}},tensorGuid=1,createNewTensorId=()=>tensorGuid++,webnnDataTypeToFallback=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),calculateByteLength=(e,t)=>{let r=webnnDataTypeToSize.get(e);if(!r)throw Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((e,t)=>e*t)*r/8):0},TensorWrapper=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:n,dataType:i,shape:o,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=n,this.dataType=i,this.tensorShape=o,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return calculateByteLength(this.dataType,this.tensorShape)}destroy(){LOG_DEBUG("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(!this.fallbackDataType)return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor);{let t=convertInt32ToData(new Uint8Array(await this.mlContext.readTensor(this.mlTensor)),this.dataType);return e?void(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(t):t.buffer}}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((e,t)=>e===r[t])}setIsDataConverted(e){this.isDataConverted=e}},TensorIdTracker=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,n){let i,o=this.tensorManager.getMLContext(e),s=this.tensorManager.getMLOpSupportLimits(e);if(!s?.input.dataTypes.includes(t)){if(!(i=webnnDataTypeToFallback.get(t))||s?.input.dataTypes.includes(i))throw Error(`WebNN backend does not support data type: ${t}`);LOG_DEBUG("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${i}`)}if(this.wrapper)if(this.wrapper.canReuseTensor(o,t,r))return this.wrapper.tensor;else{if(n){if(this.wrapper.byteLength!==calculateByteLength(t,r))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let a="u"<typeof MLTensorUsage?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,a,!0,!0,i),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if("int32"===this.wrapper.fallbackType)t=convertDataToInt32(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength)return void this.wrapper.write(t);LOG_DEBUG("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?convertInt32ToData(this.activeUpload,this.wrapper?.type):this.activeUpload;return e?void(e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t)):t.buffer}if(!this.wrapper)throw Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},TensorManagerImpl=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=createNewTensorId();return this.tensorTrackersById.set(e,new TensorIdTracker(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,n,i){LOG_DEBUG("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${i}}`);let o=this.tensorTrackersById.get(t);if(!o)throw Error("Tensor not found.");return o.ensureTensor(e,r,n,i)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw Error("Tensor not found.");r.upload(t)}async download(e,t){LOG_DEBUG("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,n){let i=this.getMLContext(e),o=createNewTensorId(),s=new TensorWrapper({sessionId:e,context:i,tensor:t,dataType:r,shape:n});return this.tensorTrackersById.set(o,new TensorIdTracker(this,s)),this.externalTensors.add(s),o}async getCachedTensor(e,t,r,n,i,o,s){let a=this.getMLContext(e);for(let[n,i]of this.freeTensors.entries())if(i.canReuseTensor(a,t,r)){LOG_DEBUG("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let i=this.freeTensors.splice(n,1)[0];return i.sessionId=e,i}LOG_DEBUG("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let u=await a.createTensor({dataType:s??t,shape:r,dimensions:r,usage:n,writable:i,readable:o});return new TensorWrapper({sessionId:e,context:a,tensor:u,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},createTensorManager=(...e)=>new TensorManagerImpl(...e)}}),init_backend_webnn=__esm({"web/lib/wasm/jsep/backend-webnn.ts"(){"use strict";init_wasm_common(),init_wasm_factory(),init_tensor_view(),init_tensor_manager(),init_log(),onnxDataTypeToWebnnDataType=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),compareMLContextOptions=(e,t)=>{if(e===t)return!0;if(void 0===e||void 0===t)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((r,i)=>r===n[i]&&e[r]===t[r])},WebNNBackend=class{constructor(e){this.tensorManager=createTensorManager(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,configureLogger(e.logLevel,!!e.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(e){LOG_DEBUG("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){LOG_DEBUG("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let e of t)LOG_DEBUG("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(t=>t.gpuDevice===e);if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:t}),t}}if(void 0===e){let e=this.mlContextCache.findIndex(e=>void 0===e.options&&void 0===e.gpuDevice);if(-1!==e)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let t=this.mlContextCache.findIndex(t=>compareMLContextOptions(t.options,e));if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),0===r.size){this.sessionIdsByMLContext.delete(t);let e=this.mlContextCache.findIndex(e=>e.mlContext===t);-1!==e&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){LOG_DEBUG("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,n,i){let o=onnxDataTypeToWebnnDataType.get(r);if(!o)throw Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,o,n,i)}async createTemporaryTensor(e,t,r){LOG_DEBUG("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let n=onnxDataTypeToWebnnDataType.get(t);if(!n)throw Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,n,r,!1);let o=this.temporarySessionTensorIds.get(e);return o?o.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!getInstance().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");LOG_DEBUG("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return createView2(r,t)}}registerMLTensor(e,t,r,n){let i=onnxDataTypeToWebnnDataType.get(r);if(!i)throw Error(`Unsupported ONNX data type: ${r}`);let o=this.tensorManager.registerTensor(e,t,i,n);return LOG_DEBUG("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${n}} -> {tensorId: ${o}}`),o}registerMLConstant(e,t,r,n,i,o,s=!1){let a;if(!o)throw Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=o.get(u);if(!l)throw Error(`File with name ${u} not found in preloaded files.`);if(t+r>l.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(t,t+r).buffer;switch(i.dataType){case"float32":a=new Float32Array(d);break;case"float16":a="u">typeof Float16Array&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":a=new Int32Array(d);break;case"uint32":a=new Uint32Array(d);break;case"int64":s?(a=new Int32Array(convertDataToInt32(new Uint8Array(d),"int64").buffer),i.dataType="int32"):a=new BigInt64Array(d);break;case"uint64":a=new BigUint64Array(d);break;case"int8":a=new Int8Array(d);break;case"int4":case"uint4":case"uint8":a=new Uint8Array(d);break;default:throw Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return LOG_DEBUG("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),n.constant(i,a)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return!!r&&r.includes(t)}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return!!r&&r.includes(t)}isGraphInputOutputTypeSupported(e,t,r=!0){let n=onnxDataTypeToWebnnDataType.get(tensorDataTypeStringToEnum(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return void 0!==n&&(r?!!i?.input.dataTypes.includes(n):!!i?.output.dataTypes.includes(n))}flush(){}}}}),init_types2=__esm({"web/lib/wasm/jsep/webgpu/types.ts"(){}}),init_gpu_data_manager=__esm({"web/lib/wasm/jsep/webgpu/gpu-data-manager.ts"(){"use strict";init_log(),init_types2(),bucketFreelist=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),bucketArr=[],calcNormalizedBufferSize=e=>16*Math.ceil(Number(e)/16),calcBucketBufferSize=e=>{for(let t=0;t<bucketArr.length;t++){let r=bucketArr[t];if(e<=r)return r}return 16*Math.ceil(e/16)},guid=1,createNewGpuDataId=()=>guid++,downloadGpuData=async(e,t,r,n)=>{let i=calcNormalizedBufferSize(r),o=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,o,0,i),e.flush(),await o.mapAsync(GPUMapMode.READ);let a=o.getMappedRange();if(!n)return new Uint8Array(a.slice(0,r));{let e=n();return e.set(new Uint8Array(a,0,r)),e}}finally{o.destroy()}},GpuDataManagerImpl=class{constructor(e){for(let[t]of(this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,bucketFreelist))bucketArr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,n=t.byteOffset,i=t.byteLength,o=calcNormalizedBufferSize(i),s=this.storageCache.get(e);if(!s)throw Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let a=this.backend.device.createBuffer({mappedAtCreation:!0,size:o,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(a.getMappedRange()).set(new Uint8Array(r,n,i)),a.unmap();let u=this.backend.device.createCommandEncoder();u.copyBufferToBuffer(a,0,s.gpuData.buffer,0,o),this.backend.device.queue.submit([u.finish()]),a.destroy(),LOG_DEBUG("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw Error("source gpu data for memcpy does not exist");let n=this.storageCache.get(t);if(!n)throw Error("destination gpu data for memcpy does not exist");if(r.originalSize!==n.originalSize)throw Error("inconsistent source and destination gpu data size");let i=calcNormalizedBufferSize(r.originalSize),o=this.backend.getCommandEncoder();this.backend.endComputePass(),o.copyBufferToBuffer(r.gpuData.buffer,0,n.gpuData.buffer,0,i)}registerExternalBuffer(e,t,r){let n;if(r){if(n=r[0],e===r[1])return LOG_DEBUG("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, buffer is the same, skip.`),n;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else n=createNewGpuDataId();return this.storageCache.set(n,{gpuData:{id:n,type:0,buffer:e},originalSize:t}),LOG_DEBUG("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, registered.`),n}unregisterExternalBuffer(e){void 0!==e&&(this.storageCache.delete(e),LOG_DEBUG("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r,n=calcBucketBufferSize(e),i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,o=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||o){let e=(i?this.freeBuffers:this.freeUniformBuffers).get(n);r=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:n,usage:t})}else r=this.backend.device.createBuffer({size:n,usage:t});let s={id:createNewGpuDataId(),type:0,buffer:r};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),LOG_DEBUG("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t="bigint"==typeof e?Number(e):e,r=this.storageCache.get(t);if(!r)if(0===this.storageCache.size)return 0;else throw Error("releasing data does not exist");return LOG_DEBUG("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw Error("data does not exist");await downloadGpuData(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let e of this.buffersPending){let t=bucketFreelist.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];void 0===t||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];void 0===t||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let t of(e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e)),this.buffersPending))e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,0===this.sessionCount&&(LOG_DEBUG("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},createGpuDataManager=(...e)=>new GpuDataManagerImpl(...e)}}),init_attribute_with_cache_key2=__esm({"web/lib/wasm/jsep/webgpu/attribute-with-cache-key.ts"(){"use strict";AttributeWithCacheKeyImpl2=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},createAttributeWithCacheKey2=e=>new AttributeWithCacheKeyImpl2(e)}}),init_common=__esm({"web/lib/wasm/jsep/webgpu/ops/common.ts"(){"use strict";init_wasm_common(),init_util2(),WORKGROUP_SIZE=64,getWgslMappedType=(e,t)=>{if(3===t)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==t)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${e}`)}},tensorTypeToWsglStorageType=(e,t=1)=>{let r=getWgslMappedType(e,t);return"string"==typeof r?r:r[0]},tensorTypeToWsglValueType=(e,t=1)=>{let r=getWgslMappedType(e,t);return"string"==typeof r?r:r[1]},createTensorShapeVariables=(...e)=>{let t=[];return e.forEach(e=>{0!==e.length&&t.push({type:12,data:e},{type:12,data:ShapeUtil2.computeStrides(e)})}),t},getMaxComponents=e=>e%4==0?4:e%2==0?2:1,fillVector=(e="f32",t,r="0")=>t&&1!==t?`vec${t}<${e}>(${r})`:`${e}(${r})`,castToF32=(e,t,r)=>"f32"===e?r:1===t?`f32(${r})`:`vec${t}<f32>(${r})`,sumVector=(e,t)=>4===t?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:2===t?`(${e}.x + ${e}.y)`:3===t?`(${e}.x + ${e}.y + ${e}.z)`:e,getElementAt=(e,t,r,n)=>{if(!e.startsWith("uniforms.")||!(r>4))return r>1?`${e}[${t}]`:e;if("string"==typeof t)if("f16"===n)return`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`;else return`${e}[(${t}) / 4][(${t}) % 4]`;return"f16"===n?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`},createIndicesHelper=(e,t,r,n,i)=>{let o="number"==typeof r,s=o?r:r.length,a=[...Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=getWgslMappedType(t,i),d="string"==typeof l?l:l[1],p={indices:u,value:d,storage:"string"==typeof l?l:l[0],tensor:t},c=e=>"string"==typeof e?e:`${e}u`,h={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},f=o?"uniforms.":"",m=`${f}${e}_shape`,g=`${f}${e}_strides`,b="";for(let e=0;e<s-1;e++)b+=`
    let dim${e} = current / ${getElementAt(g,e,s)};
    let rest${e} = current % ${getElementAt(g,e,s)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;b+=`indices[${s-1}] = current;`;let y=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${b}
    return indices;
  }`,_=t=>(h.offsetToIndices=!0,s<2?t:`o2i_${e}(${t})`),x=[];if(s>=2)for(let e=s-1;e>=0;e--)x.push(`${getElementAt(g,e,s)} * (indices[${e}])`);let v=s<2?"":`
  fn i2o_${e}(indices: ${p.indices}) -> u32 {
    return ${x.join("+")};
  }`,w=t=>(h.indicesToOffset=!0,s<2?t:`i2o_${e}(${t})`),$=(...e)=>0===s?"0u":`${p.indices}(${e.map(c).join(",")})`,T=(e,t)=>s<2?`${e}`:`${getElementAt(e,t,s)}`,I=(e,t,r)=>s<2?`${e}=${r};`:`${getElementAt(e,t,s)}=${r};`,O={},S=(t,r)=>{h.broadcastedIndicesToOffset=!0;let n=`${r.name}broadcastedIndicesTo${e}Offset`;if(n in O)return`${n}(${t})`;let i=[];for(let e=s-1;e>=0;e--){let t=r.indicesGet("outputIndices",e+r.rank-s);i.push(`${T(g,e)} * (${t} % ${T(m,e)})`)}return O[n]=`fn ${n}(outputIndices: ${r.type.indices}) -> u32 {
             return ${i.length>0?i.join("+"):"0u"};
           }`,`${n}(${t})`},E=(t,r)=>(()=>{if(p.storage===p.value)return`${e}[${t}]=${r};`;if("vec2<u32>"===p.storage&&"i32"===p.value)return`${e}[${t}]=vec2<u32>(u32(${r}), select(0u, 0xFFFFFFFFu, ${r} < 0));`;if("vec2<u32>"===p.storage&&"u32"===p.value)return`${e}[${t}]=vec2<u32>(u32(${r}), 0u);`;if("u32"===p.storage&&"vec4<bool>"===p.value)return`${e}[${t}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${r}));`;throw Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),P=t=>(()=>{if(p.storage===p.value)return`${e}[${t}]`;if("vec2<u32>"===p.storage&&"i32"===p.value)return`i32(${e}[${t}].x)`;if("vec2<u32>"===p.storage&&"u32"===p.value)return`u32(${e}[${t}].x)`;if("u32"===p.storage&&"vec4<bool>"===p.value)return`vec4<bool>(bool(${e}[${t}] & 0xFFu), bool(${e}[${t}] & 0xFF00u), bool(${e}[${t}] & 0xFF0000u), bool(${e}[${t}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),k=s<2?"":`
  fn get_${e}ByIndices(indices: ${p.indices}) -> ${d} {
    return ${P(`i2o_${e}(indices)`)};
  }`,A=s<2?"":(()=>{let t=a.map(e=>`d${e}: u32`).join(", "),r=a.map(e=>`d${e}`).join(", ");return`
  fn get_${e}(${t}) -> ${d} {
    return get_${e}ByIndices(${$(r)});
  }`})(),D=(...t)=>{if(t.length!==s)throw Error(`indices length must be ${s}`);let r=t.map(c).join(",");return 0===s?P("0u"):1===s?P(r[0]):(h.get=!0,h.getByIndices=!0,h.indicesToOffset=!0,`get_${e}(${r})`)},z=t=>s<2?P(t):(h.getByIndices=!0,h.indicesToOffset=!0,`get_${e}ByIndices(${t})`),C=s<2?"":`
  fn set_${e}ByIndices(indices: ${p.indices}, value: ${d}) {
    ${E(`i2o_${e}(indices)`,"value")}
  }`,N=s<2?"":(()=>{let t=a.map(e=>`d${e}: u32`).join(", "),r=a.map(e=>`d${e}`).join(", ");return`
  fn set_${e}(${t}, value: ${d}) {
    set_${e}ByIndices(${$(r)}, value);
  }`})(),j=(t,r)=>s<2?E(t,r):(h.setByIndices=!0,h.indicesToOffset=!0,`set_${e}ByIndices(${t}, ${r});`);return{impl:()=>{let e=[],t=!1;return h.offsetToIndices&&(e.push(y),t=!0),h.indicesToOffset&&(e.push(v),t=!0),h.broadcastedIndicesToOffset&&(Object.values(O).forEach(t=>e.push(t)),t=!0),h.set&&(e.push(N),t=!0),h.setByIndices&&(e.push(C),t=!0),h.get&&(e.push(A),t=!0),h.getByIndices&&(e.push(k),t=!0),!o&&t&&e.unshift(`const ${m} = ${p.indices}(${r.join(",")});`,`const ${g} = ${p.indices}(${ShapeUtil2.computeStrides(r).join(",")});`),e.join("\n")},type:p,offsetToIndices:_,indicesToOffset:w,broadcastedIndicesToOffset:S,indices:$,indicesGet:T,indicesSet:I,set:(...t)=>{if(t.length!==s+1)throw Error(`indices length must be ${s}`);let r=t[s];if("string"!=typeof r)throw Error("value must be string");let n=t.slice(0,s).map(c).join(",");return 0===s?E("0u",r):1===s?E(n[0],r):(h.set=!0,h.setByIndices=!0,h.indicesToOffset=!0,`set_${e}(${n}, ${r})`)},setByOffset:E,setByIndices:j,get:D,getByOffset:P,getByIndices:z,usage:n,name:e,strides:g,shape:m,rank:s}},inputVariable=(e,t,r,n=1)=>createIndicesHelper(e,t,r,"input",n),outputVariable=(e,t,r,n=1)=>createIndicesHelper(e,t,r,"output",n),atomicOutputVariable=(e,t,r)=>createIndicesHelper(e,t,r,"atomicOutput",1),internalVariable=(e,t,r,n=1)=>createIndicesHelper(e,t,r,"internal",n),ShaderHelperImpl=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){let t="number"==typeof e?`${e}u`:e;return`if (global_idx >= ${t}) { return; }`}mainStart(e=WORKGROUP_SIZE){let t="number"==typeof e?e:e[0],r="number"==typeof e?1:e[1],n="number"==typeof e?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||n>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*n>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],o=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*n}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${n})
  fn main(${o}) {
    ${s}
  `}appendVariableUniforms(e){0!==e.rank&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if("internal"===e.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r="input"===e.usage?"read":"read_write",n="atomicOutput"===e.usage?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${n}>;`}declareVariables(...e){return e.map(e=>this.declareVariable(e,this.variableIndex++)).join("\n")}registerInternalVariable(e){if("internal"!==e.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let e=[];for(let{name:t,type:r,length:n}of this.uniforms)if(n&&n>4)"f16"===r?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(n/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(n/4)}>`);else{let i=null==n||1===n?r:`vec${n}<${r}>`;e.push(`${t}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join("\n")+this.internalVariables.map(e=>e.impl()).join("\n")}get variablesInfo(){if(0===this.uniforms.length)return;let e=e=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(e)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},createShaderHelper=(e,t)=>new ShaderHelperImpl(e,t)}}),init_transpose2=__esm({"web/lib/wasm/jsep/webgpu/ops/transpose.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs26=(e,t)=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if(0!==t.length&&t.length!==e[0].dims.length)throw Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},getAdjustedPerm2=(e,t)=>0!==t.length?t:[...Array(e).keys()].reverse(),getOutputShape2=(e,t)=>ShapeUtil2.sortBasedOnPerm(e,getAdjustedPerm2(e.length,t)),permFunctionBody=(e,t,r,n)=>{let i=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let r=0;r<t;++r)i+=`a[${e[r]}]=i[${r}];`;return i+"return a;}"},squeezeShape2=(e,t)=>{let r=[],n=[];for(let i=0;i<e.length;++i)1!==e[i]&&r.push(e[i]),1!==e[t[i]]&&n.push(t[i]);return{newShape:r,newPerm:n}},isTransposeReshape=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(1!==t[e[n]]){if(e[n]<r)return!1;r=e[n]}return!0},createTransposeProgramInfo2=(e,t)=>{let r=e.dataType,n=e.dims.length,i=getAdjustedPerm2(n,t),o=getOutputShape2(e.dims,i),s=e.dims,a=o;if(n<2||isTransposeReshape(i,e.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=ShapeUtil2.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64/4)},programUniforms:[{type:12,data:Math.ceil(t/4)}]}},getShaderSource:e=>{let t=inputVariable("input",r,s,4),n=outputVariable("output",r,a,4);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,n)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:u,newPerm:l}=squeezeShape2(e.dims,i),d=ShapeUtil2.areEqual(l,[2,3,1]),p=ShapeUtil2.areEqual(l,[3,1,2]);if(2===u.length||d||p){a=[(s=d?[u[0],u[1]*u[2]]:p?[u[0]*u[1],u[2]]:u)[1],s[0]];let t=16;return{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let r=ShapeUtil2.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(a[1]/t),y:Math.ceil(a[0]/t)},programUniforms:[{type:12,data:r},...createTensorShapeVariables(s,a)]}},getShaderSource:e=>{let n=inputVariable("a",r,s.length),i=outputVariable("output",r,a.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(n,i)}
  var<workgroup> tile : array<array<${i.type.value}, ${t+1}>, ${t}>;
  ${e.mainStart([t,t,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${t} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${t}u + local_id.x;
    let input_row = workgroup_id_x * ${t}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${n.getByIndices(`${n.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${t}u + local_id.x;
    let output_row = workgroup_id_y * ${t}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${i.setByIndices(`${i.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`}}}return{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let t=ShapeUtil2.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:[{type:12,data:t},...createTensorShapeVariables(s,a)]}},getShaderSource:e=>{let t=inputVariable("a",r,s.length),o=outputVariable("output",r,a.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,o)}

  ${permFunctionBody(i,n,t,o)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${o.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${o.setByOffset("global_idx",t.getByIndices("aIndices"))}
  }`}}},transpose2=(e,t)=>{validateInputs26(e.inputs,t.perm),e.compute(createTransposeProgramInfo2(e.inputs[0],t.perm))},parseTransposeAttributes2=e=>createAttributeWithCacheKey2({perm:e.perm})}}),init_reduce_shared=__esm({"web/lib/wasm/jsep/webgpu/ops/reduce-shared.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),init_reduce2(),init_transpose2(),reduceOps={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},reduceSharedOps={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},reduceInitValues={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},reduceOutputValues={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},getInnerMostAxes=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},computeOutAndReduceShapes=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)-1===t.indexOf(i)&&r.push(e[i]);return[r,t.map(t=>e[t])]},expandShapeToKeepDim=(e,t)=>{let r=e.length+t.length,n=[],i=0;for(let o=0;o<r;o++)-1===t.indexOf(o)?n.push(e[i++]):n.push(1);return n},areAxesInnerMostDims=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},getAxesPermutation=(e,t)=>{let r=[];if(!areAxesInnerMostDims(e,t)){for(let n=0;n<t;++n)-1===e.indexOf(n)&&r.push(n);e.forEach(e=>r.push(e))}return r},createReduceSharedProgramInfo=(e,t,r,n,i,o,s)=>{let a=r[0].dims,u=ShapeUtil2.size(o),l=ShapeUtil2.size(s),d=inputVariable("_A",r[0].dataType,a),p=outputVariable("output",i,o),c=64;1===u&&(c=256);let h=`
          var<workgroup> aBestValues : array<f32, ${c}>;
       `,f=e=>`
        ${e.registerUniform("reduceSize","u32").declareVariables(d,p)}
        ${h}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${e.mainStart(c)}

          let outputIndex = global_idx / ${c};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${reduceInitValues[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${c}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${reduceOps[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${c}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${reduceSharedOps[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${"mean"===n?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${reduceOutputValues[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${c}`,inputDependencies:["type"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},reduceCommon=(e,t,r,n)=>{let i=1===e.inputs.length?r:createReduceAttributesFromInputs(e.inputs,r),o=i.axes;0!==o.length||i.noopWithEmptyAxes||(o=e.inputs[0].dims.map((e,t)=>t));let s=ShapeUtil2.normalizeAxes(o,e.inputs[0].dims.length),a=s,u=e.inputs[0],l=getAxesPermutation(a,e.inputs[0].dims.length);l.length>0&&(u=e.compute(createTransposeProgramInfo2(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],a=getInnerMostAxes(a.length,u.dims.length));let[d,p]=computeOutAndReduceShapes(u.dims,a),c=d;i.keepDims&&(c=expandShapeToKeepDim(d,s)),e.compute(createReduceSharedProgramInfo(t,i.cacheKey,[u],n,e.inputs[0].dataType,c,p),{inputs:[u]})},reduceMeanShared=(e,t)=>{reduceCommon(e,"ReduceMeanShared",t,"mean")},reduceL1Shared=(e,t)=>{reduceCommon(e,"ReduceL1Shared",t,"l1")},reduceL2Shared=(e,t)=>{reduceCommon(e,"ReduceL2Shared",t,"l2")},reduceLogSumExpShared=(e,t)=>{reduceCommon(e,"ReduceLogSumExpShared",t,"logSumExp")},reduceMaxShared=(e,t)=>{reduceCommon(e,"ReduceMaxShared",t,"max")},reduceMinShared=(e,t)=>{reduceCommon(e,"ReduceMinShared",t,"min")},reduceProdShared=(e,t)=>{reduceCommon(e,"ReduceProdShared",t,"prod")},reduceSumShared=(e,t)=>{reduceCommon(e,"ReduceSumShared",t,"sum")},reduceSumSquareShared=(e,t)=>{reduceCommon(e,"ReduceSumSquareShared",t,"sumSquare")},reduceLogSumShared=(e,t)=>{reduceCommon(e,"ReduceLogSumShared",t,"logSum")}}}),init_reduce2=__esm({"web/lib/wasm/jsep/webgpu/ops/reduce.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),init_reduce_shared(),validateInputs27=e=>{if(!e||0===e.length||e.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===e.length&&1!==e[1].dims.length)throw Error("Invalid axes input dims.")},noOp=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],createReduceProgramInfo2=(e,t,r,n,i,o,s=!1,a=!1)=>{let u=[],l=r[0].dims,d=l.length,p=ShapeUtil2.normalizeAxes(i,d),c=!a&&0===p.length;l.forEach((e,t)=>{c||p.indexOf(t)>=0?s&&u.push(1):u.push(e)});let h=u.length,f=ShapeUtil2.size(u);return{name:e,shaderCache:t,getShaderSource:e=>{let t=[],i=inputVariable("_A",r[0].dataType,d),a=outputVariable("output",o,h),u=n(i,a,p),f=u[2];for(let e=0,r=0;e<d;e++)c||p.indexOf(e)>=0?(s&&r++,f=`for(var j${e}: u32 = 0; j${e} < ${l[e]}; j${e}++) {
                  ${u[2].includes("last_index")?`let last_index = j${e};`:""}
                  ${i.indicesSet("input_indices",e,`j${e}`)}
                  ${f}
                }`):(t.push(`${i.indicesSet("input_indices",e,a.indicesGet("output_indices",r))};`),r++);return`

        ${e.registerUniform("output_size","u32").declareVariables(i,a)}

        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${i.type.indices};
          let output_indices = ${a.offsetToIndices("global_idx")};

          ${t.join("\n")}
          ${u[0]}       // init ops for reduce max/min
          ${u[1]}
          ${f}
          ${u[3]}
          ${4===u.length?a.setByOffset("global_idx","value"):u.slice(4).join("\n")}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:o}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...createTensorShapeVariables(l,u)]})}},createReduceAttributesFromInputs=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>r.push(Number(e))),createAttributeWithCacheKey2({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},runReduceProgram=(e,t,r,n)=>{let i=e.inputs,o=1===i.length?r:createReduceAttributesFromInputs(i,r);e.compute(createReduceProgramInfo2(t,{hint:o.cacheKey,inputDependencies:["rank"]},[i[0]],o.noopWithEmptyAxes&&0===o.axes.length?noOp:n,o.axes,i[0].dataType,o.keepDims,o.noopWithEmptyAxes),{inputs:[0]})},reduceLogSumNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceLogSum",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,"value = log(value);"])},reduceL1Naive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceL1",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += abs(${e.getByIndices("input_indices")});`,""])},reduceL2Naive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceL2",t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},reduceLogSumExpNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceLogSumExp",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += exp(${e.getByIndices("input_indices")});`,"value = log(value);"])},reduceMaxNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceMax",t,(e,t,r)=>{let n=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&n.push(e.indicesSet("input_indices",t,0));return[`${n.join("\n")}`,`var value = ${e.getByIndices("input_indices")};`,`value = max(value, ${e.getByIndices("input_indices")});`,""]})},reduceMeanNaive=(e,t)=>{validateInputs27(e.inputs);let r=(t,r,n)=>{let i=1;for(let r=0;r<t.rank;r++)(n.indexOf(r)>=0||0===n.length)&&(i*=e.inputs[0].dims[r]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${i});`]};runReduceProgram(e,"ReduceMean",t,r)},reduceMinNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceMin",t,(e,t,r)=>{let n=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&n.push(`input_indices[${t}] = 0;`);return[`${n.join("\n")}`,`var value = ${e.getByIndices("input_indices")};`,`value = min(value, ${e.getByIndices("input_indices")});`,""]})},reduceProdNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceProd",t,(e,t)=>[`var value = ${t.type.storage}(1);`,"",`value *= ${e.getByIndices("input_indices")};`,""])},reduceSumNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceSum",t,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,""])},reduceSumSquareNaive=(e,t)=>{validateInputs27(e.inputs),runReduceProgram(e,"ReduceSumSquare",t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += t * t;`,""])},useNaiveReduceMethod=(e,t,r)=>{if(0===t.length)return r;let n=1,i=1;for(let r=0;r<t.length;r++)-1===t.indexOf(r)?n*=e[r]:i*=e[r];return i<32&&n>1024},reduceMean2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceMeanNaive(e,t):reduceMeanShared(e,t)},reduceL1=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceL1Naive(e,t):reduceL1Shared(e,t)},reduceL2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceL2Naive(e,t):reduceL2Shared(e,t)},reduceLogSumExp=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceLogSumExpNaive(e,t):reduceLogSumExpShared(e,t)},reduceMax2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceMaxNaive(e,t):reduceMaxShared(e,t)},reduceMin2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceMinNaive(e,t):reduceMinShared(e,t)},reduceProd2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceProdNaive(e,t):reduceProdShared(e,t)},reduceSum2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceSumNaive(e,t):reduceSumShared(e,t)},reduceSumSquare=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceSumSquareNaive(e,t):reduceSumSquareShared(e,t)},reduceLogSum2=(e,t)=>{useNaiveReduceMethod(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?reduceLogSumNaive(e,t):reduceLogSumShared(e,t)}}}),init_argminmax=__esm({"web/lib/wasm/jsep/webgpu/ops/argminmax.ts"(){"use strict";init_wasm_common(),init_attribute_with_cache_key2(),init_reduce2(),validateInputs28=e=>{if(!e||0===e.length||e.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==e[0].dataType)throw Error("Invalid input type.")},argMin=(e,t)=>{validateInputs28(e.inputs);let r=(e,r,n)=>{let i=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||0===n.length)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join("\n")}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]};e.compute(createReduceProgramInfo2("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},argMax=(e,t)=>{validateInputs28(e.inputs);let r=(e,r,n)=>{let i=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||0===n.length)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join("\n")}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]};e.compute(createReduceProgramInfo2("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},parseArgMinMaxAttributes=e=>createAttributeWithCacheKey2(e)}}),init_attention=__esm({"web/lib/wasm/jsep/webgpu/ops/attention.ts"(){"use strict";init_wasm_common(),init_util2(),init_types2(),init_common(),validateAttentionInputs=(e,t)=>{let r=e[0],n=e[1],i=e[2],o=e[3],s=e[4],a=e[5];if(s&&a)throw Error("Attention cannot have both past and attention_bias");if(3!==r.dims.length)throw Error('Input "input" must have 3 dimensions');let u=r.dims[0],l=r.dims[1],d=r.dims[2];if(1!==i.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==n.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==d)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==n.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=i.dims[0]/3,c=p,h=c;if(t.qkvHiddenSizes.length>0){if(3!==t.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let e of t.qkvHiddenSizes)if(e%t.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],c=t.qkvHiddenSizes[1],h=t.qkvHiddenSizes[2]}let f=l;if(p!==c)throw Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==p+c+h)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let m=0;if(s){if(c!==h)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==s.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==s.dims[0])throw Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==c/t.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(m=s.dims[3])}let g=f+m,b=-1,y=0;if(o)throw Error("Mask not supported");if(s)throw Error("past is not supported");if(a){if(4!==a.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(a.dims[0]!==u||a.dims[1]!==t.numHeads||a.dims[2]!==l||a.dims[3]!==g)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:g,maxSequenceLength:b,inputHiddenSize:d,hiddenSize:p,vHiddenSize:h,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(h/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:y,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},initVarStub=(e,t,r)=>t&&e?`
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
    `,createInPlaceSoftmaxProgramInfo=(e,t,r,n,i,o,s,a)=>{let u=getMaxComponents(s?1:o),l=64,d=o/u;d<64&&(l=32);let p=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:i},{type:12,data:d},{type:12,data:Math.ceil(o/u/l)}],c=tensorTypeToWsglStorageType(e.dataType,u),h=tensorTypeToWsglValueType(1,u),f=["type"];s&&f.push("type"),a&&f.push("type");let m=t=>{let r=outputVariable("x",e.dataType,e.dims,u),n=[r],i=s?inputVariable("seq_lens",s.dataType,s.dims):void 0;i&&n.push(i);let o=a?inputVariable("total_sequence_length_input",a.dataType,a.dims):void 0;o&&n.push(o);let d=tensorTypeToWsglValueType(e.dataType),p=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${t.registerUniforms(p).declareVariables(...n)}
  ${t.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${initVarStub(i,o,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
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
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${r.type.value}(${d}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${c};${u}`,inputDependencies:f},getShaderSource:m,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*r},programUniforms:p})}},createAttentionProbsProgramInfo=(e,t,r,n,i,o,s,a,u)=>{let l=s+o.kvSequenceLength,d=[o.batchSize,o.numHeads,o.sequenceLength,l],p=e>1&&n,c=o.kvNumHeads?o.kvNumHeads:o.numHeads,h=p?[o.batchSize,c,l,o.headSize]:void 0,f=o.nReps?o.nReps:1,m=0===o.scale?1/Math.sqrt(o.headSize):o.scale,g=getMaxComponents(o.headSize),b=o.headSize/g,y=12,_={x:Math.ceil(l/12),y:Math.ceil(o.sequenceLength/y),z:o.batchSize*o.numHeads},x=[{type:12,data:o.sequenceLength},{type:12,data:b},{type:12,data:l},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:1,data:m},{type:12,data:s},{type:12,data:o.kvSequenceLength},{type:12,data:f}],v=p&&n&&ShapeUtil2.size(n.dims)>0,w=["type","type"];v&&w.push("type"),i&&w.push("type"),a&&w.push("type"),u&&w.push("type");let $=[{dims:d,dataType:t.dataType,gpuDataType:0}];p&&$.push({dims:h,dataType:t.dataType,gpuDataType:0});let T=e=>{let o=inputVariable("q",t.dataType,t.dims,g),s=[o,inputVariable("key",r.dataType,r.dims,g)];if(v){let e=inputVariable("past_key",n.dataType,n.dims,g);s.push(e)}i&&s.push(inputVariable("attention_bias",i.dataType,i.dims));let l=a?inputVariable("seq_lens",a.dataType,a.dims):void 0;l&&s.push(l);let c=u?inputVariable("total_sequence_length_input",u.dataType,u.dims):void 0;c&&s.push(c);let m=outputVariable("output",t.dataType,d),b=[m];p&&b.push(outputVariable("present_key",t.dataType,h,g));let _=tensorTypeToWsglValueType(1,g),x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${y}u;

  var<workgroup> tileQ: array<${o.type.storage}, ${y*y}>;
  var<workgroup> tileK: array<${o.type.storage}, ${y*y}>;
  ${e.registerUniforms(x).declareVariables(...s,...b)}
  ${e.mainStart([y,y,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${1===f?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${1===f?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${initVarStub(l,c,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${v&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${_}(0);
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
          value += ${_}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(g){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw Error(`Unsupported components: ${g}`)}})()};
        output[outputIdx] = ${m.type.value} (sum * uniforms.alpha) + ${i?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${g};${void 0!==i};${void 0!==n};${e}`,inputDependencies:w},getRunData:()=>({outputs:$,dispatchGroup:_,programUniforms:x}),getShaderSource:T}},createVxAttentionScoreProgramInfo=(e,t,r,n,i,o,s,a)=>{let u=o+i.kvSequenceLength,l=i.nReps?i.nReps:1,d=i.vHiddenSize*l,p=e>1&&n,c=i.kvNumHeads?i.kvNumHeads:i.numHeads,h=p?[i.batchSize,c,u,i.headSize]:void 0,f=[i.batchSize,i.sequenceLength,d],m=12,g={x:Math.ceil(i.vHeadSize/m),y:Math.ceil(i.sequenceLength/m),z:i.batchSize*i.numHeads},b=[{type:12,data:i.sequenceLength},{type:12,data:u},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:d},{type:12,data:o},{type:12,data:i.kvSequenceLength},{type:12,data:l}],y=p&&n&&ShapeUtil2.size(n.dims)>0,_=["type","type"];y&&_.push("type"),s&&_.push("type"),a&&_.push("type");let x=[{dims:f,dataType:t.dataType,gpuDataType:0}];p&&x.push({dims:h,dataType:t.dataType,gpuDataType:0});let v=e=>{let i=inputVariable("probs",t.dataType,t.dims),o=[i,inputVariable("v",r.dataType,r.dims)];y&&o.push(inputVariable("past_value",n.dataType,n.dims));let u=s?inputVariable("seq_lens",s.dataType,s.dims):void 0;s&&o.push(u);let d=a?inputVariable("total_sequence_length_input",a.dataType,a.dims):void 0;a&&o.push(d);let c=[outputVariable("output",t.dataType,f)];p&&c.push(outputVariable("present_value",t.dataType,h));let g=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${m}u;
  var<workgroup> tileQ: array<${i.type.value}, ${m*m}>;
  var<workgroup> tileV: array<${i.type.value}, ${m*m}>;
  ${e.registerUniforms(g).declareVariables(...o,...c)}
  ${e.mainStart([m,m,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===l?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===l?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${initVarStub(u,d,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${y&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${i.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${y&&p?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${void 0!==n};${e}`,inputDependencies:_},getRunData:()=>({outputs:x,dispatchGroup:g,programUniforms:b}),getShaderSource:v}},applyAttention=(e,t,r,n,i,o,s,a,u,l,d,p)=>{let c=Math.min(e.outputCount,1+ +!!s+ +!!a),h=c>1?l.pastSequenceLength:0,f=h+l.kvSequenceLength,m=u&&ShapeUtil2.size(u.dims)>0?u:void 0,g=[t,r];c>1&&s&&ShapeUtil2.size(s.dims)>0&&g.push(s),m&&g.push(m),d&&g.push(d),p&&g.push(p);let b=e.compute(createAttentionProbsProgramInfo(c,t,r,s,m,l,h,d,p),{inputs:g,outputs:c>1?[-1,1]:[-1]})[0];e.compute(createInPlaceSoftmaxProgramInfo(b,l.batchSize,l.numHeads,h,l.sequenceLength,f,d,p),{inputs:d&&p?[b,d,p]:[b],outputs:[]});let y=[b,n];c>1&&a&&ShapeUtil2.size(a.dims)>0&&y.push(a),d&&y.push(d),p&&y.push(p),e.compute(createVxAttentionScoreProgramInfo(c,b,n,a,l,h,d,p),{inputs:y,outputs:c>1?[0,2]:[0]})},prepare=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,i=t.inputHiddenSize,o=t.headSize,s=12,a={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],l=[{type:12,data:n},{type:12,data:i},{type:12,data:o},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],d=e=>{let t=outputVariable("output_q",u[0].dataType,r),n=outputVariable("output_k",u[0].dataType,r),i=outputVariable("output_v",u[0].dataType,r),o=inputVariable("input",u[0].dataType,u[0].dims),a=inputVariable("weight",u[1].dataType,u[1].dims),l=inputVariable("bias",u[2].dataType,u[2].dims),d=o.type.storage,p=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${d}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${d}, ${s*s}>;
  var<workgroup> tileWeightK: array<${d}, ${s*s}>;
  var<workgroup> tileWeightV: array<${d}, ${s*s}>;
  ${e.registerUniforms(p).declareVariables(o,a,l,t,n,i)}
  ${e.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${d}(0);
    var valueK = ${d}(0);
    var valueV = ${d}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:l}),getShaderSource:d},{inputs:u,outputs:[-1,-1,-1]})},attention=(e,t)=>{let r=validateAttentionInputs(e.inputs,t),[n,i,o]=prepare(e,r);return applyAttention(e,n,i,o,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}}),init_batch_norm=__esm({"web/lib/wasm/jsep/webgpu/ops/batch-norm.ts"(){"use strict";init_esm(),init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs29=(e,t)=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs");let r=(e,t,r)=>{let n=t.length;if(n!==e.length)throw Error(`${r}: num dimensions != ${n}`);t.forEach((t,n)=>{if(t!==e[n])throw Error(`${r}: dim[${n}] do not match`)})};if(e[0].dims.length>1){let n="NHWC"===t.format?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},createBatchNormInferenceProgramInfo=(e,t)=>{let{epsilon:r,spatial:n,format:i}=t,o=e[0].dims,s=n?getMaxComponents(o[o.length-1]):1,a="NHWC"===i&&o.length>1?s:1,u=ShapeUtil2.size(o)/s,l=n,d=l?o.length:o,p=inputVariable("x",e[0].dataType,e[0].dims,s),c=inputVariable("scale",e[1].dataType,e[1].dims,a),h=inputVariable("bias",e[2].dataType,e[2].dims,a),f=inputVariable("inputMean",e[3].dataType,e[3].dims,a),m=inputVariable("inputVar",e[4].dataType,e[4].dims,a),g=outputVariable("y",e[0].dataType,d,s),b=()=>{let e="";if(n)e=`let cOffset = ${1===o.length?"0u":"NHWC"===i?`outputIndices[${o.length-1}] / ${s}`:"outputIndices[1]"};`;else if("NCHW"===i)e=`
            ${g.indicesSet("outputIndices","0","0")}
            let cOffset = ${g.indicesToOffset("outputIndices")};`;else{e=`var cIndices = ${c.type.indices}(0);
                       cIndices[0] = outputIndices[${o.length-1}];`;for(let t=1;t<c.rank;t++)e+=`cIndices[${t}] = outputIndices[${t}];`;e+=`let cOffset = ${c.indicesToOffset("cIndices")};`}return e},y=e=>`
  const epsilon = ${r};
  ${e.registerUniform("outputSize","u32").declareVariables(p,c,h,f,m,g)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${g.offsetToIndices(`global_idx * ${s}`)};
    ${b()}
    let scale = ${c.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${f.getByOffset("cOffset")};
    let inputVar = ${m.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${g.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:y,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...createTensorShapeVariables(o)]:[{type:12,data:u}]})}},parseBatchNormAttributes=e=>createAttributeWithCacheKey2(e),batchNorm=(e,t)=>{let{inputs:r,outputCount:n}=e,i=parseBatchNormAttributes({...t,outputCount:n});if(env2.webgpu.validateInputContent&&validateInputs29(r,i),t.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");e.compute(createBatchNormInferenceProgramInfo(r,i))}}}),init_bias_add=__esm({"web/lib/wasm/jsep/webgpu/ops/bias-add.ts"(){"use strict";init_util2(),init_common(),validateInputs30=e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")},createBiasAddProgramInfo=e=>{let t=e[0].dims,r=e[0].dims[2],n=ShapeUtil2.size(t)/4,i=e[0].dataType,o=inputVariable("input",i,t,4),s=inputVariable("bias",i,[r],4),a=inputVariable("residual",i,t,4),u=outputVariable("output",i,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:e=>`
  const channels = ${r}u / 4;
  ${e.declareVariables(o,s,a,u)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${o.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${a.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},biasAdd=e=>{validateInputs30(e.inputs),e.compute(createBiasAddProgramInfo(e.inputs))}}}),init_unary_op2=__esm({"web/lib/wasm/jsep/webgpu/ops/unary-op.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),createElementwiseProgramShader=(e,t,r,n,i,o,s)=>{let a=Math.ceil(t/4),u="";u="string"==typeof i?`${i}(a)`:i("a");let l=inputVariable("inputData",r,[a],4),d=outputVariable("outputData",n,[a],4),p=[{name:"vec_size",type:"u32"}];return s&&p.push(...s),`
      ${e.registerUniforms(p).declareVariables(l,d)}

  ${o??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",u)}
  }`},createElementwiseProgramInfo2=(e,t,r,n,i,o=e.dataType,s,a)=>{let u=[{type:12,data:Math.ceil(ShapeUtil2.size(e.dims)/4)}];return s&&u.push(...s),{name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:t=>createElementwiseProgramShader(t,ShapeUtil2.size(e.dims),e.dataType,o,r,n,a),getRunData:t=>({outputs:[{dims:e.dims,dataType:o}],dispatchGroup:{x:Math.ceil(ShapeUtil2.size(t[0].dims)/64/4)},programUniforms:u})}},abs2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Abs","abs"))},acos2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Acos","acos"))},acosh=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Acosh","acosh"))},asin2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Asin","asin"))},asinh=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Asinh","asinh"))},atan2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Atan","atan"))},atanh=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Atanh","atanh"))},parseCastAttributes2=e=>createAttributeWithCacheKey2(e),cast2=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(createElementwiseProgramInfo2(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},generateClipAttributesFromInputs2=e=>{let t,r,n=e.length>=2&&0!==e[1].data,i=e.length>=3&&0!==e[2].data;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=i?e[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return createAttributeWithCacheKey2({min:t,max:r})},clip2=(e,t)=>{let r=t||generateClipAttributesFromInputs2(e.inputs),n=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"Clip",e=>`clamp(${e}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},ceil2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Ceil","ceil"))},cos2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Cos","cos"))},cosh=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Cosh","cosh"))},parseAlphaAttributes=e=>createAttributeWithCacheKey2(e),elu2=(e,t)=>{let r=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"Elu",e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},erfImpl=(e="f32")=>`
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
}`,erf=e=>{let t=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"Erf",e=>`erf_vf32(${e})`,erfImpl(t)))},exp2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Exp","exp"))},floor2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Floor","floor"))},gelu=e=>{let t=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"Gelu",e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,erfImpl(t)))},leakyRelu2=(e,t)=>{let r=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"LeakyRelu",e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},not3=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Not",e=>`!${e}`))},neg2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Neg",e=>`-${e}`))},reciprocal=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Reciprocal",e=>`1.0/${e}`))},relu2=e=>{let t=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"Relu",e=>`select(vec4<${t}>(0.0), ${e}, ${e} > vec4<${t}>(0.0))`))},sigmoid2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},parseHardSigmoidAttributes=e=>createAttributeWithCacheKey2(e),hardSigmoid=(e,t)=>{let r=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"HardSigmoid",e=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${e} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},sin2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Sin","sin"))},sinh=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Sinh","sinh"))},sqrt2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Sqrt","sqrt"))},tan2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Tan","tan"))},tanhExpression=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,tanh2=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Tanh",tanhExpression))},fastGeluImpl=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${tanhExpression("v")};
}
`,fastGeluExpression=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,fastGelu=e=>{let t=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"FastGelu",fastGeluExpression,fastGeluImpl(t),void 0,e.inputs[0].dataType))},thresholdedRelu=(e,t)=>{let r=tensorTypeToWsglValueType(e.inputs[0].dataType);return e.compute(createElementwiseProgramInfo2(e.inputs[0],"ThresholdedRelu",e=>`select(vec4<${r}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},log3=e=>{e.compute(createElementwiseProgramInfo2(e.inputs[0],"Log","log"))},quickGeluImpl=(e,t)=>`
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
`,quickGeluExpression=e=>`quick_gelu_impl(${e})`,quickgelu=(e,t)=>{let r=tensorTypeToWsglValueType(e.inputs[0].dataType);e.compute(createElementwiseProgramInfo2(e.inputs[0],"QuickGelu",quickGeluExpression,quickGeluImpl(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}}),init_bias_split_gelu=__esm({"web/lib/wasm/jsep/webgpu/ops/bias-split-gelu.ts"(){"use strict";init_util2(),init_common(),init_unary_op2(),validateInputs31=e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")},createBiasSplitGeluProgramInfo=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=inputVariable("input",e[0].dataType,e[0].dims,4),n=inputVariable("bias",e[0].dataType,[e[0].dims[2]],4),i=outputVariable("output",e[0].dataType,t,4),o=ShapeUtil2.size(t)/4,s=tensorTypeToWsglStorageType(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)}}),getShaderSource:t=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${t.declareVariables(r,n,i)}

  ${erfImpl(s)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(o)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},biasSplitGelu=e=>{validateInputs31(e.inputs),e.compute(createBiasSplitGeluProgramInfo(e.inputs))}}}),init_binary_op2=__esm({"web/lib/wasm/jsep/webgpu/ops/binary-op.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),createBinaryOpProgramShader=(e,t,r,n,i,o,s,a,u,l,d,p)=>{let c,h,f;"string"==typeof a?c=h=(e,t)=>`${a}((${e}),(${t}))`:"function"==typeof a?c=h=a:(c=a.scalar,h=a.vector);let m=outputVariable("outputData",d,n.length,4),g=inputVariable("aData",u,t.length,4),b=inputVariable("bData",l,r.length,4);if(i)if(o){let e=1===ShapeUtil2.size(t),n=1===ShapeUtil2.size(r),i=t.length>0&&t[t.length-1]%4==0,o=r.length>0&&r[r.length-1]%4==0;f=e||n?m.setByOffset("global_idx",h(e?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),n?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"))):`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${b.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",h(s||i?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||o?b.getByOffset("offsetB / 4u"):`${b.type.value}(${b.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else f=m.setByOffset("global_idx",h(g.getByOffset("global_idx"),b.getByOffset("global_idx")));else{if(!o)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let e=(e,t,r="")=>{let n=`aData[indexA${t}][componentA${t}]`,i=`bData[indexB${t}][componentB${t}]`;return`
            let outputIndices${t} = ${m.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offsetA${t} = ${g.broadcastedIndicesToOffset(`outputIndices${t}`,m)};
            let offsetB${t} = ${b.broadcastedIndicesToOffset(`outputIndices${t}`,m)};
            let indexA${t} = offsetA${t} / 4u;
            let indexB${t} = offsetB${t} / 4u;
            let componentA${t} = offsetA${t} % 4u;
            let componentB${t} = offsetB${t} % 4u;
            ${e}[${t}] = ${r}(${c(n,i)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(g,b,m)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${f}
      }`},createBinaryOpProgramInfo=(e,t,r,n,i,o,s=r.dataType)=>{let a=r.dims.map(Number),u=n.dims.map(Number),l=!ShapeUtil2.areEqual(a,u),d=a,p=ShapeUtil2.size(a),c=!1,h=!1,f=[l];if(l){let e=BroadcastUtil2.calcShape(a,u,!1);if(!e)throw Error("Can't perform binary op on the given tensors");d=e.slice(),p=ShapeUtil2.size(d);let t=1===ShapeUtil2.size(a),r=1===ShapeUtil2.size(u),n=a.length>0&&a[a.length-1]%4==0,i=u.length>0&&u[u.length-1]%4==0;f.push(t),f.push(r),f.push(n),f.push(i);let o=1;for(let e=1;e<d.length;e++){let t=a[a.length-e];if(t===u[u.length-e])o*=t;else break}o%4==0?(h=!0,c=!0):(t||r||n||i)&&(c=!0)}else c=!0;return f.push(c),{name:e,shaderCache:{hint:t+f.map(e=>e.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:e=>createBinaryOpProgramShader(e,a,u,d,c,l,h,i,r.dataType,n.dataType,s,o),getRunData:()=>({outputs:[{dims:d,dataType:s}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(ShapeUtil2.size(d)/4)},...createTensorShapeVariables(a,u,d)]})}},runBinaryOp=(e,t,r,n,i,o)=>{e.compute(createBinaryOpProgramInfo(t,i??"",e.inputs[0],e.inputs[1],r,n,o))},add3=e=>{runBinaryOp(e,"Add",(e,t)=>`${e}+${t}`)},div2=e=>{runBinaryOp(e,"Div",(e,t)=>`${e}/${t}`)},equal2=e=>{runBinaryOp(e,"Equal",{scalar:(e,t)=>`u32(${e}==${t})`,vector:(e,t)=>`vec4<u32>(${e}==${t})`},void 0,void 0,9)},mul2=e=>{runBinaryOp(e,"Mul",(e,t)=>`${e}*${t}`)},pow2=e=>{let t=inputVariable("input",e.inputs[0].dataType,e.inputs[0].dims).type.value,r="i32"===t?"round":"";runBinaryOp(e,"Pow",{scalar:(e,t)=>`pow_custom(${e},${t})`,vector:(e,t)=>`pow_vector_custom(${e},${t})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${r}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},sub2=e=>{runBinaryOp(e,"Sub",(e,t)=>`${e}-${t}`)},greater2=e=>{runBinaryOp(e,"Greater",{scalar:(e,t)=>`u32(${e}>${t})`,vector:(e,t)=>`vec4<u32>(${e}>${t})`},void 0,void 0,9)},less2=e=>{runBinaryOp(e,"Less",{scalar:(e,t)=>`u32(${e}<${t})`,vector:(e,t)=>`vec4<u32>(${e}<${t})`},void 0,void 0,9)},greaterOrEqual=e=>{runBinaryOp(e,"GreaterOrEqual",{scalar:(e,t)=>`u32(${e}>=${t})`,vector:(e,t)=>`vec4<u32>(${e}>=${t})`},void 0,void 0,9)},lessOrEqual=e=>{runBinaryOp(e,"LessOrEqual",{scalar:(e,t)=>`u32(${e}<=${t})`,vector:(e,t)=>`vec4<u32>(${e}<=${t})`},void 0,void 0,9)}}}),init_concat2=__esm({"web/lib/wasm/jsep/webgpu/ops/concat.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs32=(e,t)=>{if(!e||e.length<1)throw Error("too few inputs");let r=0,n=e[0],i=n.dataType,o=n.dims.length;e.forEach((e,s)=>{if(s!==r){if(e.dataType!==i)throw Error("input tensors should be one type");if(e.dims.length!==o)throw Error("input tensors should have the same shape");e.dims.forEach((e,r)=>{if(r!==t&&e!==n.dims[r])throw Error("non concat dimensions must match")})}})},calculateInputIndexImpl=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,assignOutputData=(e,t)=>{let r=e.length,n=[];for(let i=0;i<r;++i){let o=t.setByOffset("global_idx",e[i].getByIndices("indices"));1===r?n.push(o):0===i?n.push(`if (inputIndex == ${i}u) { ${o} }`):i===r-1?n.push(`else { ${o} }`):n.push(`else if (inputIndex == ${i}) { ${o} }`)}return n.join("\n")},createConcatProgramInfo=(e,t,r,n)=>{let i=ShapeUtil2.size(r),o=Array(e.length),s=Array(e.length),a=0,u=[],l=[],d=[{type:12,data:i}];for(let r=0;r<e.length;++r)a+=e[r].dims[t],o[r]=a,l.push(e[r].dims.length),s[r]=inputVariable(`input${r}`,n,l[r]),u.push("rank"),d.push({type:12,data:o[r]});for(let t=0;t<e.length;++t)d.push(...createTensorShapeVariables(e[t].dims));d.push(...createTensorShapeVariables(r));let p=outputVariable("output",n,r.length),c=p.indicesGet("indices",t),h=Array.from(Array(o.length).keys()).map(e=>`uniforms.sizeInConcatAxis${e}`).join(",");return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:d}),getShaderSource:t=>`

  ${(()=>{t.registerUniform("outputSize","u32");for(let r=0;r<e.length;r++)t.registerUniform(`sizeInConcatAxis${r}`,"u32");return t.declareVariables(...s,p)})()}

  ${calculateInputIndexImpl(o.length,h)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${c});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${o.length}u>(${h});
      ${c} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${assignOutputData(s,p)}
  }`}},concat2=(e,t)=>{let r=e.inputs,n=r[0].dims,i=ShapeUtil2.normalizeAxis(t.axis,n.length);validateInputs32(r,i);let o=n.slice();o[i]=r.reduce((e,t)=>e+(t.dims.length>i?t.dims[i]:0),0);let s=r.filter(e=>ShapeUtil2.size(e.dims)>0);e.compute(createConcatProgramInfo(s,i,o,r[0].dataType),{inputs:s})},parseConcatAttributes2=e=>createAttributeWithCacheKey2({axis:e.axis})}}),init_fuse_utils2=__esm({"web/lib/wasm/jsep/webgpu/ops/fuse-utils.ts"(){"use strict";init_wasm_common(),init_util2(),getActivationSnippet2=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${e.activation}`)}},appendActivationUniformsData=(e,t)=>{"Clip"===e.activation?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):"HardSigmoid"===e.activation?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):"LeakyRelu"===e.activation&&t.push({type:1,data:e.alpha})},appendActivationUniforms=(e,t)=>{"Clip"===e.activation?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===e.activation?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===e.activation&&t.push({name:"alpha",type:"f32"})},parseInternalActivationAttributes2=e=>{let t=e?.activation||"";if("HardSigmoid"===t){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}if("Clip"===t){let[r,n]=e?.activation_params||[MIN_CLIP2,MAX_CLIP2];return{activation:t,clipMax:n,clipMin:r}}if("LeakyRelu"===t){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}}),init_activation_util=__esm({"web/lib/wasm/jsep/webgpu/ops/3rd-party/activation_util.ts"(){"use strict";typeSnippet=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw Error(`${e}-component is not supported.`)}},biasSnippet=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}}),init_conv_util=__esm({"web/lib/wasm/jsep/webgpu/ops/3rd-party/conv_util.ts"(){"use strict";utilFunctions=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}}),init_matmul_shaders=__esm({"web/lib/wasm/jsep/webgpu/ops/matmul-shaders.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),init_fuse_utils2(),convertOutputBatchIndicesToInputBatchIndices=(e,t,r,n,i)=>{let o=n-r;return`
      ${Array.from({length:r}).map((r,s)=>`
      if (${getElementAt(t.shape,s,t.rank)} != 1) {
        ${t.indicesSet(e,s,getElementAt(i,s+o,n))}
      } else {
        ${t.indicesSet(e,s,0)}
      }`).join("")}
`},createNaiveMatmulProgramInfo=(e,t,r,n,i=!1,o)=>{let s=e[0].dims,a=e[1].dims,u=s[s.length-2],l=a[a.length-1],d=s[s.length-1],p=getMaxComponents(l),c=getMaxComponents(d),h=getMaxComponents(u),f=ShapeUtil2.size(r)/p/h,m=e.length>2,g=n?n.slice(0,-2):r.slice(0,-2),b=[ShapeUtil2.size(g),u,l],y=[{type:12,data:f},{type:12,data:u},{type:12,data:l},{type:12,data:d}];appendActivationUniformsData(t,y),y.push(...createTensorShapeVariables(g,s,a)),m&&y.push(...createTensorShapeVariables(e[2].dims)),y.push(...createTensorShapeVariables(b));let _=n=>{let o=internalVariable("batch_dims",e[0].dataType,g.length),u=inputVariable("a",e[0].dataType,s.length,c),l=inputVariable("b",e[1].dataType,a.length,p),d=outputVariable("output",e[0].dataType,b.length,p),f=tensorTypeToWsglStorageType(d.type.tensor),y=getActivationSnippet2(t,d.type.value,f),_=[u,l],x="";if(m){let t=i?p:1;_.push(inputVariable("bias",e[2].dataType,e[2].dims.length,t)),x=`${i?`value += bias[col / ${t}];`:`value += ${d.type.value}(bias[row + i]);`}`}let v=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];appendActivationUniforms(t,v);let w=()=>{let e=`var a_data: ${u.type.value};`;for(let t=0;t<c;t++)e+=`
              let b_data${t} = b[(b_offset + (k + ${t}) * uniforms.N + col) / ${p}];`;for(let t=0;t<h;t++){e+=`a_data = a[(a_offset + (row + ${t}) * uniforms.K + k) / ${c}];`;for(let r=0;r<c;r++)e+=`
            values[${t}] = fma(${l.type.value}(a_data${1===c?"":`[${r}]`}), b_data${r}, values[${t}]);
`}return e};return`
  ${n.registerUniforms(v).registerInternalVariables(o).declareVariables(..._,d)}
  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${h};
    let row = (index1 % stride1) * ${h};
    let batch = index1 / stride1;

    ${2===r.length?"":`let batch_indices = ${o.offsetToIndices("batch")};`}

    var a_indices: ${u.type.indices};
    ${convertOutputBatchIndicesToInputBatchIndices("a_indices",u,u.rank-2,o.rank,"batch_indices")}
    ${u.indicesSet("a_indices",u.rank-2,0)}
    ${u.indicesSet("a_indices",u.rank-1,0)}
    let a_offset = ${u.indicesToOffset("a_indices")};

    var b_indices: ${l.type.indices};
    ${convertOutputBatchIndicesToInputBatchIndices("b_indices",l,l.rank-2,o.rank,"batch_indices")}
    ${l.indicesSet("b_indices",l.rank-2,0)}
    ${l.indicesSet("b_indices",l.rank-1,0)}
    let b_offset = ${l.indicesToOffset("b_indices")};
    var values: array<${d.type.value}, ${h}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${c}) {
      ${w()}
    }
    for (var i = 0u; i < ${h}u; i++) {
      var value = values[i];
      ${x}
      ${y}
      let cur_indices = ${d.type.indices}(batch, row + i, col);
      let offset = ${d.indicesToOffset("cur_indices")};
      ${d.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${c};${h};${i}`,inputDependencies:m?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:o?o(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:y}),getShaderSource:_}}}}),init_matmul_packed_webgpu=__esm({"web/lib/wasm/jsep/webgpu/ops/3rd-party/matmul_packed_webgpu.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),init_fuse_utils2(),init_matmul_shaders(),init_activation_util(),writeDataToSubAVec4Snippet=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,calculateResultSnippet=(e,t)=>e?`
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
        }`,makeMatMulPackedVec4Source=(e,t,r="f32",n,i=!1,o=32,s=!1,a=32)=>{let u=t[1]*e[1],l=t[0]*e[0],d=i?u:o,p=i?o:u,c=d/t[0],h=o/t[1];if(!((i&&4===c&&4===e[1]||!i&&(3===c||4===c))&&d%t[0]==0&&o%t[1]==0&&4===e[0]))throw Error(`If transposeA ${i} is true, innerElementSize ${c} and workPerThread[1] ${e[1]} must be 4.
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
  let batch = ${s?"0":"i32(globalId.z)"};
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(a/o)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${h};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${writeDataToSubAVec4Snippet(i,n)}
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

          ${calculateResultSnippet(i,c)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},writeDataToSubASnippet=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,readDataFromSubASnippet=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",makeMatMulPackedSource=(e,t,r="f32",n,i=!1,o=32,s=!1,a=32,u=!1)=>{let l=e[1]*t[1],d=e[0]*t[0],p=i?l:o,c=i?o:l;if(c%t[1]!=0||p%t[0]!=0||o%t[1]!=0)throw Error(`tileAHight ${c} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${o} must be divisible by workgroupSize[1]${t[1]}`);let h=c/t[1],f=p/t[0],m=o/t[1],g=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${c}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${writeDataToSubASnippet(i,n)}
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
      ${writeDataToSubASnippet(i,n)}
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
      ${readDataFromSubASnippet(i)}
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
    let batch = ${s?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(a/o)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${g}
  }
`},matMulReadWriteFnSource=(e,t,r,n,i=!1)=>{let[o,s,a,u]=n,l=tensorTypeToWsglStorageType(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${o.type.indices}) -> ${typeSnippet(e,l)} {
      var value = ${typeSnippet(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${convertOutputBatchIndicesToInputBatchIndices("aIndices",s,s.rank-2,o.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${o.type.indices}) -> ${typeSnippet(e,l)} {
      var value = ${typeSnippet(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${a.type.indices};
        ${convertOutputBatchIndicesToInputBatchIndices("bIndices",a,a.rank-2,o.rank,"batchIndices")}
        ${a.indicesSet("bIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("bIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${typeSnippet(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${typeSnippet(e,l)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},createMatmulProgramInfo2=(e,t,r,n,i=!1,o)=>{let s=e[0].dims,a=e[1].dims,u=s.slice(0,-2),l=a.slice(0,-2),d=n?n.slice(0,-2):r.slice(0,-2),p=ShapeUtil2.size(d),c=s[s.length-2],h=s[s.length-1],f=a[a.length-1],m=h%4==0&&f%4==0,g=c<=8?[4,1,1]:[4,4,1],b=[8,8,1],y=[Math.ceil(f/b[0]/g[0]),Math.ceil(c/b[1]/g[1]),Math.ceil(p/b[2]/g[2])],_=m?4:1,x=[...u,c,h/_],v=x.length,w=[...l,h,f/_],$=w.length,T=[p,c,f/_],I=[{type:6,data:c},{type:6,data:f},{type:6,data:h}];appendActivationUniformsData(t,I),I.push(...createTensorShapeVariables(d,x,w));let O=["rank","rank"],S=e.length>2;S&&(I.push(...createTensorShapeVariables(e[2].dims)),O.push("rank")),I.push(...createTensorShapeVariables(T));let E=r=>{let n=d.length,o=internalVariable("batchDims",e[0].dataType,n,1),s=tensorTypeToWsglStorageType(e[0].dataType),a=inputVariable("a",e[0].dataType,v,_),u=inputVariable("b",e[1].dataType,$,_),l=outputVariable("result",e[0].dataType,T.length,_),p=[a,u];if(S){let t=i?_:1;p.push(inputVariable("bias",e[2].dataType,e[2].dims.length,t))}let c=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];appendActivationUniforms(t,c);let h=tensorTypeToWsglStorageType(l.type.tensor),f=matMulReadWriteFnSource(_,S,getActivationSnippet2(t,l.type.value,h),[o,a,u,l],i);return`
  ${r.registerUniforms(c).registerInternalVariables(o).declareVariables(...p,l)}
  ${f}
  ${m?makeMatMulPackedVec4Source(g,b,s,o):makeMatMulPackedSource(g,b,s,o)}
                   `};return{name:"MatMul",shaderCache:{hint:`${g};${t.activation};${m};${i}`,inputDependencies:O},getRunData:()=>({outputs:[{dims:o?o(r):r,dataType:e[0].dataType}],dispatchGroup:{x:y[0],y:y[1],z:y[2]},programUniforms:I}),getShaderSource:E}}}}),init_conv2d_mm_webgpu=__esm({"web/lib/wasm/jsep/webgpu/ops/3rd-party/conv2d_mm_webgpu.ts"(){"use strict";init_wasm_common(),init_log(),init_common(),init_fuse_utils2(),init_activation_util(),init_conv_util(),init_matmul_packed_webgpu(),conv2dCommonSnippet=(e,t,r,n,i=!1,o,s=4,a=4,u=4,l="f32")=>{let d=e=>{switch(e){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw Error(`innerElementSize ${e} is not supported.`)}},p=e=>{switch(e){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${e} is not supported.`)}},c=e?`
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
    `,f=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",m=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",g=e?"row":"col",b=e?"col":"row",y=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${g} / outWidth;
    let outCol = ${g} % outWidth;

    let WRow = ${b} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${b} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${b} % inChannels;
    var resData = ${typeSnippet(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${f} && xCol >= 0 && xCol < ${m}) {
      ${c}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${d(s)}
    }
    return resData;`,_=e?t&&n?`
    let col = colIn * ${s};
    ${y}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${y}
    }
    return ${typeSnippet(s,l)}(0.0);`:n&&r?`
    let col = colIn * ${s};
    ${y}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${y}
    }
    return ${typeSnippet(s,l)}(0.0);`,x=e?n&&r?p(a):`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(a)}
    }
    return ${typeSnippet(a,l)}(0.0);`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(a)}
    }
    return ${typeSnippet(a,l)}(0.0);`,v=typeSnippet(u,l),w=e?typeSnippet(s,l):typeSnippet(a,l),$=e?typeSnippet(a,l):typeSnippet(s,l),T=getActivationSnippet2(o,v,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${w} {
      ${e?_:x}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${$} {
      ${e?x:_}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${v}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${biasSnippet(i)}
      ${T}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},createConv2DMatMulProgramInfo=(e,t,r,n,i,o,s,a,u)=>{let l="NHWC"===t.format,d=l?e[0].dims[3]:e[0].dims[1],p=r[0],c=l?r[2]:r[3],h=l?r[1]:r[2],f=l?r[3]:r[1],m=l&&(d%4==0||d%3==0)&&f%4==0,g=l?f:c*h,b=l?c*h:f,y=[8,8,1],_=n<=8?[4,1,1]:[4,4,1],x=[Math.ceil(g/y[0]/_[0]),Math.ceil(b/y[1]/_[1]),Math.ceil(p/y[2]/_[2])];LOG_DEBUG("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${x}`);let v=m?l&&d%4!=0?3:4:1,w=y[1]*_[1],$=y[0]*_[0],T=Math.max(y[0]*v,y[1]),I=n%w==0,O=i%$==0,S=o%T==0,E=m?[v,4,4]:[1,1,1],P=[{type:6,data:n},{type:6,data:i},{type:6,data:o},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];appendActivationUniformsData(t,P),P.push(...createTensorShapeVariables(e[0].dims,e[1].dims));let k=["rank","rank"];s&&(P.push(...createTensorShapeVariables(e[2].dims)),k.push("rank")),P.push(...createTensorShapeVariables(r));let A=n=>{let i=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];appendActivationUniforms(t,i);let o=m?4:1,u=tensorTypeToWsglStorageType(e[0].dataType),d=`
      fn setOutputAtIndex(flatIndex : i32, value : ${m?`vec4<${u}>`:u}) {
        result[flatIndex] = ${m?`vec4<${u}>`:u}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${m?`vec4<${u}>`:u}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${m?"/ 4":""}, value);
      }`,p=[inputVariable("x",e[0].dataType,e[0].dims.length,3===v?1:v),inputVariable("w",e[1].dataType,e[1].dims.length,o)],c=outputVariable("result",e[0].dataType,r.length,o);if(s){let t=inputVariable("bias",e[2].dataType,e[2].dims.length,o);p.push(t),d+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${m?`vec4<${u}>`:u} {
          return bias[coords.${l?"w":"y"}${m?"/ 4":""}];
        }`}return`
        ${utilFunctions("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${n.registerUniforms(i).declareVariables(...p,c)}
        ${d}
        ${conv2dCommonSnippet(l,I,O,S,s,t,E[0],E[1],E[2],u)}
        ${m?makeMatMulPackedVec4Source(_,y,u,void 0,!l,T):makeMatMulPackedSource(_,y,u,void 0,!l,T,!1,void 0,a)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${v};${m};${I};${O};${S};${w};${$};${T}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:e[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:P}),getShaderSource:A}}}}),init_conv3d_naive_webgpu=__esm({"web/lib/wasm/jsep/webgpu/ops/3rd-party/conv3d_naive_webgpu.ts"(){"use strict";init_wasm_common(),init_log(),init_util2(),init_common(),init_fuse_utils2(),init_activation_util(),arrayProduct=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},parse3TupleParam=e=>"number"==typeof e?[e,e,e]:e,getEffectiveFilterSize=(e,t)=>t<=1?e:e+(e-1)*(t-1),computeDefaultPad=(e,t,r,n=1)=>{let i=getEffectiveFilterSize(t,n);return Math.floor((e[0]*(r-1)-r+i)/2)},computeOutputShape4D=(e,t,r,n,i)=>{null==i&&(i=computeDefaultPad(e,t[0],n[0]));let o=[0,0,0,r];for(let r=0;r<3;r++)e[r]+2*i>=t[r]&&(o[r]=Math.trunc((e[r]-t[r]+2*i)/n[r]+1));return o},get3DPadAndOutInfo=(e,t,r,n,i,o,s,a,u,l)=>{let d,p,c,h;if("VALID"===e&&(e=0),"number"==typeof e){d={top:e,bottom:e,left:e,right:e,front:e,back:e};let f=computeOutputShape4D([t,r,n,1],[a,u,l],1,[i,o,s],e);p=f[0],c=f[1],h=f[2]}else if(Array.isArray(e)){if(!e.every((e,t,r)=>e===r[0]))throw Error(`Unsupported padding parameter: ${e}`);d={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let f=computeOutputShape4D([t,r,n,1],[a,u,l],1,[i,o,s],e[0]);p=f[0],c=f[1],h=f[2]}else if("SAME_UPPER"===e){let e=((p=Math.ceil(t/i))-1)*i+a-t,f=((c=Math.ceil(r/o))-1)*o+u-r,m=((h=Math.ceil(n/s))-1)*s+l-n,g=Math.floor(e/2),b=e-g,y=Math.floor(f/2),_=f-y,x=Math.floor(m/2),v=m-x;d={top:y,bottom:_,left:x,right:v,front:g,back:b}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:p,outHeight:c,outWidth:h}},computeConv3DInfo=(e,t,r,n,i,o=!1,s="channelsLast")=>{let a,u,l,d,p;if("channelsLast"===s)[a,u,l,d,p]=e;else if("channelsFirst"===s)[a,p,u,l,d]=e;else throw Error(`Unknown dataFormat ${s}`);let[c,,h,f,m]=t,[g,b,y]=parse3TupleParam(r),[_,x,v]=parse3TupleParam(n),w=getEffectiveFilterSize(h,_),$=getEffectiveFilterSize(f,x),T=getEffectiveFilterSize(m,v),{padInfo:I,outDepth:O,outHeight:S,outWidth:E}=get3DPadAndOutInfo(i,u,l,d,g,b,y,w,$,T),P=o?c*p:c,k=[0,0,0,0,0];return"channelsFirst"===s?k=[a,P,O,S,E]:"channelsLast"===s&&(k=[a,O,S,E,P]),{batchSize:a,dataFormat:s,inDepth:u,inHeight:l,inWidth:d,inChannels:p,outDepth:O,outHeight:S,outWidth:E,outChannels:P,padInfo:I,strideDepth:g,strideHeight:b,strideWidth:y,filterDepth:h,filterHeight:f,filterWidth:m,effectiveFilterDepth:w,effectiveFilterHeight:$,effectiveFilterWidth:T,dilationDepth:_,dilationHeight:x,dilationWidth:v,inShape:e,outShape:k,filterShape:t}},createConv3DNaiveProgramInfo=(e,t,r,n,i,o)=>{let s="channelsLast"===o,a=s?e[0].dims[3]:e[0].dims[1],u=!1,l=[64,1,1],d=[Math.ceil(arrayProduct(({x:r.map((e,t)=>t)}).x.map(e=>r[e]))/l[0]),1,1];LOG_DEBUG("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let p=u?s&&a%4!=0?3:4:1,c=[{type:12,data:ShapeUtil2.size(r)},{type:12,data:n},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];appendActivationUniformsData(t,c),c.push(...createTensorShapeVariables(e[0].dims,e[1].dims));let h=["rank","rank"],f=3===e.length;f&&(c.push(...createTensorShapeVariables(e[2].dims)),h.push("rank")),c.push(...createTensorShapeVariables(r));let m=o=>{let a=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];appendActivationUniforms(t,a);let l=u?4:1,d=tensorTypeToWsglStorageType(e[0].dataType),c=inputVariable("x",e[0].dataType,e[0].dims.length,3===p?1:p),h=inputVariable("W",e[1].dataType,e[1].dims.length,l),m=[c,h],g=outputVariable("result",e[0].dataType,r.length,l),b="";if(f){let t=inputVariable("bias",e[2].dataType,e[2].dims.length,l);m.push(t),b+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${d}>`:d} {
          return bias[${s?getElementAt("coords",4,5):getElementAt("coords",1,5)}${u?"/ 4":""}];
        }`}let y=typeSnippet(p,d),_=getActivationSnippet2(t,y,d);return`
            ${b}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${c.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${h.getByIndices("aIndices")};
            }
          ${o.registerUniforms(a).declareVariables(...m,g)}
          ${o.mainStart()}
          ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${g.offsetToIndices("global_idx")};
              let batch = ${getElementAt("coords",0,c.rank)};
              let d2 = ${s?getElementAt("coords",c.rank-1,c.rank):getElementAt("coords",1,c.rank)};
              let xFRCCorner = vec3<u32>(${s?getElementAt("coords",1,c.rank):getElementAt("coords",2,c.rank)},
              ${s?getElementAt("coords",2,c.rank):getElementAt("coords",3,c.rank)},
              ${s?getElementAt("coords",3,c.rank):getElementAt("coords",4,c.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?getElementAt("uniforms.x_shape",1,c.rank):getElementAt("uniforms.x_shape",2,c.rank)};
              let xShapeZ = ${s?getElementAt("uniforms.x_shape",2,c.rank):getElementAt("uniforms.x_shape",3,c.rank)};
              let xShapeW = ${s?getElementAt("uniforms.x_shape",3,c.rank):getElementAt("uniforms.x_shape",4,c.rank)};
              let xShapeU = ${s?getElementAt("uniforms.x_shape",4,c.rank):getElementAt("uniforms.x_shape",1,c.rank)};
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
              ${f?"value = value + getBiasByOutputCoords(coords)":""};
              ${_}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${p};${f}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:c}),getShaderSource:m}}}}),init_conv_grouped2=__esm({"web/lib/wasm/jsep/webgpu/ops/conv-grouped.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),init_fuse_utils2(),createGroupedConvProgramInfo=(e,t,r,n)=>{let i=e.length>2,o=i?"value += b[output_channel];":"",s=e[0].dims,a=e[1].dims,u="NHWC"===t.format,l=u?r[3]:r[1],d=l/t.group,p=u&&d>=4?getMaxComponents(l):1,c=ShapeUtil2.size(r)/p,h=[{type:12,data:c},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:d}];appendActivationUniformsData(t,h),h.push(...createTensorShapeVariables(s,[a[0],a[1],a[2],a[3]/p]));let f=i?["rank","rank","rank"]:["rank","rank"];h.push(...createTensorShapeVariables([r[0],r[1],r[2],r[3]/p]));let m=n=>{let l=outputVariable("output",e[0].dataType,r.length,p),d=tensorTypeToWsglStorageType(l.type.tensor),c=getActivationSnippet2(t,l.type.value,d),h=inputVariable("x",e[0].dataType,s.length),f=inputVariable("w",e[1].dataType,a.length,p),m=[h,f];i&&m.push(inputVariable("b",e[2].dataType,e[2].dims,p));let g=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];appendActivationUniforms(t,g);let b=u?`
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
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:m}},createGroupedConvVectorizeProgramInfo=(e,t,r,n)=>{let i=e.length>2,o=getMaxComponents(r[3]),s=getMaxComponents(r[2]),a=ShapeUtil2.size(r)/o/s,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/o],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/o],d=[r[0],r[1],r[2],r[3]/o],p=[{type:12,data:a},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];appendActivationUniformsData(t,p),p.push(...createTensorShapeVariables(u,l,d));let c=(s-1)*t.strides[1]+l[1],h=r=>{let n=outputVariable("output",e[0].dataType,d.length,o),a=tensorTypeToWsglStorageType(n.type.tensor),p=getActivationSnippet2(t,n.type.value,a),h=inputVariable("x",e[0].dataType,u.length,o),f=inputVariable("w",e[1].dataType,l.length,o),m=[h,f];i&&m.push(inputVariable("b",e[2].dataType,e[2].dims,o));let g=i?"value += b[output_channel];":"",b=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return appendActivationUniforms(t,b),`
  ${r.registerUniforms(b).declareVariables(...m,n)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${h.type.value}, ${c}>;
    var values: array<${n.type.value}, ${s}>;
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
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${g}
      ${p}
      ${n.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${o};${s};${c};${l[0]};${l[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:h}}}}),init_conv2=__esm({"web/lib/wasm/jsep/webgpu/ops/conv.ts"(){"use strict";init_util2(),init_conv2d_mm_webgpu(),init_conv3d_naive_webgpu(),init_matmul_packed_webgpu(),init_conv_grouped2(),init_fuse_utils2(),init_matmul_shaders(),init_transpose2(),calculateOutputShape2=(e,t,r,n,i,o)=>{let s=e[0],a=e.slice(o?1:2,o?3:4),u=a.length,l=t[0],d=t.slice(2).map((e,t)=>e+(e-1)*(r[t]-1)),p=a.map((e,t)=>e+n[t]+n[t+u]).map((e,t)=>Math.floor((e-d[t]+i[t])/i[t]));return p.splice(0,0,s),p.splice(o?3:1,0,l),p},weightTransposeAttribute=[2,3,1,0],validateInputs33=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let r=e[0].dims.length-2;if(t.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(t.strides.length!==r)throw Error(`strides should be ${r}D`);if(t.pads.length!==2*r)throw Error(`pads should be ${2*r}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape")},getAdjustedConvAttributes2=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let e=2;e<t[1].dims.length;++e)0===r[e-2]&&(r[e-2]=t[1].dims[e]);let n=e.pads.slice();PoolConvUtil2.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,"NHWC"===e.format,e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:r,pads:n}),i},parseConvAttributes2=e=>{let t=parseInternalActivationAttributes2(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],i=e.dilations,o=e.group,s=e.kernel_shape,a=e.pads;return{autoPad:n,format:r,dilations:i,group:o,kernelShape:s,pads:a,strides:e.strides,wIsConst:e.w_is_const(),...t,cacheKey:`${e.format};${t.activation};`}},conv2d2=(e,t,r,n)=>{let i="NHWC"===r.format,o=calculateOutputShape2(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,i);if(1!==r.group){let s=[t[0]];if(i){let n=e.kernelCustomData.wT??e.compute(createTransposeProgramInfo2(t[1],weightTransposeAttribute),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n),s.push(n)}else s.push(t[1]);3===t.length&&s.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&i&&t[1].dims[0]===r.group&&1===t[1].dims[1]&&1===r.dilations[0]&&1===r.dilations[1]?e.compute(createGroupedConvVectorizeProgramInfo(s,r,o,n),{inputs:s}):e.compute(createGroupedConvProgramInfo(s,r,o,n),{inputs:s});return}let s=3===t.length,a=t[0].dims[i?1:2],u=t[0].dims[i?2:3],l=t[0].dims[i?3:1],d=t[1].dims[2],p=t[1].dims[3],c=o[i?1:2],h=o[i?2:3],f=o[i?3:1],m=i&&d===a&&p===u&&0===r.pads[0]&&0===r.pads[1];if(m||1===d&&1===p&&1===r.dilations[0]&&1===r.dilations[1]&&1===r.strides[0]&&1===r.strides[1]&&0===r.pads[0]&&0===r.pads[1]){let d,p,g,b=o[0],y=[];if(i){let n=e.kernelCustomData.wT??e.compute(createTransposeProgramInfo2(t[1],weightTransposeAttribute),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n),m){let e=a*u*l;d=t[0].reshape([1,b,e]),p=n.reshape([1,e,f]),g=[1,b,f]}else d=t[0].reshape([b,a*u,l]),p=n.reshape([1,l,f]),g=[b,c*h,f];y.push(d),y.push(p)}else d=t[0].reshape([b,l,a*u]),p=t[1].reshape([1,f,l]),g=[b,f,c*h],y.push(p),y.push(d);s&&y.push(t[2]);let _=g[2],x=y[0].dims[y[0].dims.length-1];_<8&&x<8?e.compute(createNaiveMatmulProgramInfo(y,r,o,g,i,n),{inputs:y}):e.compute(createMatmulProgramInfo2(y,r,o,g,i,n),{inputs:y});return}let g=!0,b=e.kernelCustomData.wT??e.compute(createTransposeProgramInfo2(t[1],weightTransposeAttribute),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=b);let y=[t[0],b];s&&y.push(t[2]);let _=i?c*h:f,x=i?f:c*h,v=d*p*l;e.compute(createConv2DMatMulProgramInfo(y,r,o,_,x,v,s,g,n),{inputs:y})},conv1d=(e,t)=>{let r="NHWC"===t.format,n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];3===e.inputs.length&&n.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],o=[1].concat(t.strides),s=[1].concat(t.dilations),a=[1].concat(t.kernelShape),u=getAdjustedConvAttributes2({...t,pads:i,strides:o,dilations:s,kernelShape:a},n);conv2d2(e,n,u,e=>r?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},conv3d=(e,t,r)=>{let n="NHWC"===r.format?"channelsLast":"channelsFirst",i=getAdjustedConvAttributes2(r,t),o="NOTSET"===r.autoPad?r.pads:r.autoPad,s=computeConv3DInfo(t[0].dims,t[1].dims,r.strides,r.dilations,o,!1,n);e.compute(createConv3DNaiveProgramInfo(t,i,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],n))},conv2=(e,t)=>{if(validateInputs33(e.inputs,t),3===e.inputs[0].dims.length)conv1d(e,t);else if(5===e.inputs[0].dims.length)conv3d(e,e.inputs,t);else{let r=getAdjustedConvAttributes2(t,e.inputs);conv2d2(e,e.inputs,r)}}}}),init_conv_backprop_webgpu=__esm({"web/lib/wasm/jsep/webgpu/ops/3rd-party/conv_backprop_webgpu.ts"(){"use strict";init_wasm_common(),init_log(),init_util2(),init_common(),createConvTranspose2DProgramInfo=(e,t,r)=>{let n=e.length>2,i=t.outputShape,o="NHWC"===t.format,s=t.group,a=e[1].dims,u=a[2]/s,l=a[3],d=o?getMaxComponents(u):1,p=o&&1===l&&u>=4,c=p?4*Math.floor(u/4):Math.floor(u/d)*d,h=u-c,f=o?getMaxComponents(l):1,m=o?1===l?d:f:1,g=ShapeUtil2.size(i)/f,b=[Math.ceil(g/64),1,1];LOG_DEBUG("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${b}`);let y=["rank","rank"],_=[t.strides[0],t.strides[1]],x=[t.kernelShape[o?1:2],t.kernelShape[o?2:3]],v=[t.dilations[0],t.dilations[1]],w=[x[0]+(t.dilations[0]<=1?0:(t.kernelShape[o?1:2]-1)*(t.dilations[0]-1)),x[1]+(t.dilations[1]<=1?0:(t.kernelShape[o?2:3]-1)*(t.dilations[1]-1))],$=[w[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),w[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],T=[{type:12,data:g},{type:12,data:_},{type:12,data:x},{type:12,data:v},{type:12,data:w},{type:6,data:$},{type:12,data:c},{type:12,data:u},{type:12,data:l},...createTensorShapeVariables(e[0].dims,e[1].dims)];n&&(T.push(...createTensorShapeVariables(e[2].dims)),y.push("rank")),T.push(...createTensorShapeVariables(i));let I=t=>{let r=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:_.length},{name:"filter_dims",type:"u32",length:x.length},{name:"dilations",type:"u32",length:x.length},{name:"effective_filter_dims",type:"u32",length:w.length},{name:"pads",type:"i32",length:$.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],s=tensorTypeToWsglStorageType(e[0].dataType),a=o?1:2,u=o?2:3,l=o?3:1,c=inputVariable("W",e[1].dataType,e[1].dims.length,m),g=inputVariable("Dy",e[0].dataType,e[0].dims.length,d),b=[g,c];n&&b.push(inputVariable("bias",e[2].dataType,[i[l]].length,f));let y=outputVariable("result",e[0].dataType,i.length,f),v=()=>{let e="";if(p)4===d?e+=`
        let xValue = ${g.getByOffset("x_offset")};
        let wValue = ${c.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:2===d?e+=`
          dotProd = dotProd + dot(vec4<${s}>(${g.getByOffset("x_offset")}, ${g.getByOffset("x_offset + 1u")}), vec4<${s}>(${c.getByOffset("w_offset")}, ${c.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:1===d&&(e+=`
          dotProd = dotProd + dot(vec4<${s}>(${g.getByOffset("x_offset")}, ${g.getByOffset("x_offset + 1u")}, ${g.getByOffset("x_offset + 2u")}, ${g.getByOffset("x_offset + 3u")}), vec4<${s}>(${c.getByOffset("w_offset")}, ${c.getByOffset("w_offset + 1u")}, ${c.getByOffset("w_offset + 2u")}, ${c.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(e+=`
                  let xValue = ${o?g.getByOffset(`${g.indicesToOffset(`${g.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d}`):g.get("batch","inputChannel","idyR","idyC")};
        `,1===d)e+=`
          let w_offset = ${c.indicesToOffset(`${c.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${c.getByOffset(`w_offset / ${m}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let t=0;t<d;t++)e+=`
            let wValue${t} = ${c.getByOffset(`${c.indicesToOffset(`${c.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${t}, wOutChannel)`)} / ${m}`)};
            dotProd = dotProd + xValue[${t}] * wValue${t};`;return e},T=()=>{if(0===h)return"";if(!p)throw Error(`packInputAs4 ${p} is not true.`);let e="";if(1===d){e+="dotProd = dotProd";for(let t=0;t<h;t++)e+=`
            + ${g.getByOffset(`x_offset + ${t}`)} * ${c.getByOffset(`w_offset + ${t}`)}`;e+=";"}else if(2===d){if(2!==h)throw Error(`Invalid inputChannelsRemainder ${h}.`);e+=`
          let xValue = ${g.getByOffset("x_offset")};
          let wValue = ${c.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return e},I=`
            let outputIndices = ${y.offsetToIndices(`global_idx * ${f}`)};
            let batch = ${y.indicesGet("outputIndices",0)};
            let d1 = ${y.indicesGet("outputIndices",l)};
            let r = ${y.indicesGet("outputIndices",a)};
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
              let dyR = (${s}(dyRCorner) + ${s}(wR)) / ${s}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[${a}]) || fract(dyR) > 0.0 ||
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
                if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[${u}]) ||
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
                  ${v()}
                  inputChannel = inputChannel + ${p?4:d};
                }
                ${T()}
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
    ${I}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${d}${m}${f}${p}${h}`,inputDependencies:y},getRunData:()=>({dispatchGroup:{x:b[0],y:b[1],z:b[2]},outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],programUniforms:T}),getShaderSource:I}}}}),init_conv_transpose2=__esm({"web/lib/wasm/jsep/webgpu/ops/conv-transpose.ts"(){"use strict";init_conv_backprop_webgpu(),init_fuse_utils2(),init_transpose2(),computeTotalPad2=(e,t,r,n,i,o)=>(e-1)*t+r+(n-1)*i+1-o,distributePadding2=(e,t,r,n,i)=>{let o=Math.floor(e/2);"SAME_UPPER"===t?(r[n]=o,r[i]=e-o):"SAME_LOWER"===t&&(r[n]=e-o,r[i]=o)},calculateOutputShapeAndPads2=(e,t,r,n,i,o,s,a,u,l)=>{let d=e.length-2,p=0===l.length;u.length<d&&u.push(...Array(d-u.length).fill(0));let c=e[0],h=t[a?3:1]*i;for(let i=0,c=e.length-d-!!a;i<d;++i,++c){let a=e[c],h=p?a*s[i]:l[i];distributePadding2(computeTotalPad2(a,s[i],o[i],t[c],r[i],h),n,o,i,i+d),p&&l.push(s[i]*(a-1)+u[i]+(t[c]-1)*r[i]+1-o[i]-o[i+d])}l.splice(0,0,c),l.splice(a?3:1,0,h)},getAdjustedConvTransposeAttributes2=(e,t)=>{let r=e.kernelShape.slice();if(0===e.kernelShape.length||0===e.kernelShape.reduce((e,t)=>e*t,1)){r.length=0;for(let e=2;e<t[1].dims.length;++e)r.push(t[1].dims[e])}let n="NHWC"===e.format;r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let i=e.pads.slice(),o=e.outputShape.slice(),s=e.outputPadding.slice(),a=t[0].dims,u=e.dilations.slice();0===u.reduce((e,t)=>e+t,0)&&(u=Array(t[0].dims.length-2).fill(1));let l=e.strides.slice();0===l.reduce((e,t)=>e+t,0)&&(l=Array(t[0].dims.length-2).fill(1)),calculateOutputShapeAndPads2(a,r,u,e.autoPad,e.group,i,l,n,s,o);let d=Object.assign({},e);return Object.assign(d,{kernelShape:r,pads:i,outputPadding:s,outputShape:o,dilations:u,strides:l}),d},parseConvTransposeAttributes2=e=>{let t=parseInternalActivationAttributes2(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][void 0===e.autoPad?0:e.autoPad],i=e.dilations,o=e.group??1,s=e.kernelShape,a=e.pads,u=e.strides,l=e.wIsConst();return{autoPad:n,format:r,dilations:i,group:o,kernelShape:s,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:a,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},validateInputs34=(e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length&&3!==e[0].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let r=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==r))throw Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((e,t)=>e+t,0)>0&&t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.reduce((e,t)=>e+t,0)>0&&t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.reduce((e,t)=>e+t,0)>0&&t.pads.length!==2*n)throw Error(`pads should be ${2*n}D`);if(t.outputPadding.length!==n&&0!==t.outputPadding.length)throw Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((e,t)=>e+t,0)>0&&0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape")},convTranspose2d2=(e,t,r,n)=>{let i=e.kernelCustomData.wT??e.compute(createTransposeProgramInfo2(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let o=[t[0],i];3===t.length&&o.push(t[2]),e.compute(createConvTranspose2DProgramInfo(o,r,n),{inputs:o})},convTranspose1d=(e,t)=>{let r="NHWC"===t.format,n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];3===e.inputs.length&&n.push(e.inputs[2]);let i=t.kernelShape;(0===i.length||0===i[0])&&(i=[e.inputs[1].dims[2]]);let o=t.dilations;(0===o.length||0===o[0])&&(o=[1]);let s=t.strides;(0===s.length||0===s[0])&&(s=[1]);let a=t.pads;0===a.length&&(a=[0,0]),a=[0,a[0],0,a[1]],s=[1].concat(s),o=[1].concat(o),i=[1].concat(i);let u=t.outputPadding;u=[0].concat(u);let l=getAdjustedConvTransposeAttributes2({...t,pads:a,strides:s,dilations:o,kernelShape:i,outputPadding:u},n);convTranspose2d2(e,n,l,e=>r?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},convTranspose2=(e,t)=>{if(validateInputs34(e.inputs,t),3===e.inputs[0].dims.length)convTranspose1d(e,t);else{let r=getAdjustedConvTransposeAttributes2(t,e.inputs);convTranspose2d2(e,e.inputs,r)}}}}),init_cumsum=__esm({"web/lib/wasm/jsep/webgpu/ops/cumsum.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),createCumsumProgramInfo=(e,t,r,n)=>{let i=ShapeUtil2.size(t),o=t.length,s=inputVariable("input",e,o),a=outputVariable("output",e,o),u=6===r.dataType?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=ShapeUtil2.normalizeAxis(u,o),d=e=>{let t=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,r=getElementAt("uniforms.input_shape","uniforms.axis",o),i=n.reverse?t+(n.exclusive?" + 1":""):"0",u=n.reverse?r:t+(n.exclusive?"":" + 1");return`
                ${e.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,a)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${a.offsetToIndices("global_idx")};
                  var sum = ${a.type.value}(0);
                  let first : i32 = ${i};
                  let last : i32 = ${u};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${a.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:l},...createTensorShapeVariables(t,t)]}),getShaderSource:d}},cumsum=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,i=e.inputs[1];e.compute(createCumsumProgramInfo(n,r,i,t),{inputs:[0]})},parseCumSumAttributes=e=>{let t=1===e.exclusive,r=1===e.reverse;return createAttributeWithCacheKey2({exclusive:t,reverse:r})}}}),init_depth_to_space2=__esm({"web/lib/wasm/jsep/webgpu/ops/depth-to-space.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs35=e=>{if(!e||1!==e.length)throw Error("DepthToSpace requires 1 input.");if(4!==e[0].dims.length)throw Error("DepthToSpace requires 4D input.")},permFunctionBody2=(e,t,r,n)=>{let i=[];i.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let n=0;n<t;++n)i.push(r.indicesSet("a",e[n],`i[${n}]`));return i.push("return a;}"),i.join("\n")},createDepthToSpaceProgramInfo=(e,t)=>{let r,n,i,o,s,a,u="NHWC"===t.format,l=t.blocksize,d="DCR"===t.mode;u?([r,n,i,o]=e.dims,s=d?[r,n,i,l,l,o/l**2]:[r,n,i,o/l**2,l,l],a=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,i,o]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=d?[r,l,l,o/l**2,n,i]:[r,o/l**2,l,l,n,i],a=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(s),c=p.dims.length,h=e.dataType,f=inputVariable("a",h,c),m=outputVariable("output",h,c),g=e=>`
  ${e.registerUniform("output_size","u32").declareVariables(f,m)}

  ${permFunctionBody2(a,c,f,m)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",f.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:e=>{let t=u?[r,n*l,i*l,o/l**2]:[r,o/l**2,n*l,i*l],s=ShapeUtil2.size(t),d=p.dims,c=ShapeUtil2.sortBasedOnPerm(d,a);return{outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...createTensorShapeVariables(d,c)]}},getShaderSource:g}},depthToSpace2=(e,t)=>{validateInputs35(e.inputs),e.compute(createDepthToSpaceProgramInfo(e.inputs[0],t))},parseDepthToSpaceAttributes2=e=>createAttributeWithCacheKey2({blocksize:e.blocksize,mode:e.mode,format:e.format})}}),init_einsum=__esm({"web/lib/wasm/jsep/webgpu/ops/einsum.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),termPatternOnly="^"+(termPattern="("+(symbolPattern="[a-zA-Z]|\\.\\.\\.")+")+")+"$",lhsPatternOnly="^"+("("+termPattern+",)*")+termPattern+"$",EinsumTerm=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);void 0===r?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},EinsumEquation=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[r,n]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(lhsPatternOnly)))throw Error("Invalid LHS term");if(r.split(",").forEach((t,r)=>{let n=e[r].dims.slice();if(!t.match(RegExp(termPatternOnly)))throw Error("Invalid LHS term");let i=this.processTerm(t,!0,n,r);this.lhs.push(i)}),""===n)n+=[...this.symbolToInfo.entries()].filter(([e,t])=>1===t.count||"..."===e).map(([e])=>e).join("");else if(!n.match(RegExp(termPattern)))throw Error("Invalid RHS");let i=n.match(RegExp(symbolPattern,"g"));i?.forEach(e=>{if("..."===e)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let t=this.symbolToInfo.get(e);if(void 0===t)throw Error("Invalid RHS symbol");this.outputDims.push(t.dimValue)}}),this.rhs=this.processTerm(n,!1,this.outputDims)}addSymbol(e,t,r){let n=this.symbolToInfo.get(e);if(void 0!==n)if(n.dimValue!==t&&1!==n.count)throw Error("Dimension mismatch");else n.count++,n.inputIndices.push(r);else n={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,n)}processTerm(e,t,r,n=-1){let i=r.length,o=!1,s=[],a=0;if(!e.match(RegExp(termPatternOnly))&&!t&&""!==e)throw Error("Invalid LHS term");let u=e.match(RegExp(symbolPattern,"g")),l=new EinsumTerm(n);return u?.forEach((e,d)=>{if("..."===e){if(o)throw Error("Only one ellipsis is allowed per input term");o=!0;let e=i-u.length+1;if(e<0)throw Error("Ellipsis out of bounds");if(s=r.slice(a,a+e),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw Error("Ellipsis must be specified in the LHS");for(let e=0;e<s.length;e++){let t=String.fromCharCode(48+e);l.addSymbol(t,d+e),this.addSymbol(t,r[a++],n)}}else l.addSymbol(e,d+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,r[a++],n)}),l}},appendMax=e=>e+"_max",createEinsumProgramInfo=(e,t,r,n)=>{let i=e.map(e=>e.length).map((e,r)=>inputVariable(`input${r}`,t,e)),o=ShapeUtil2.size(n),s=outputVariable("output",t,n.length),a=[...r.symbolToInfo.keys()].filter(e=>!r.rhs.symbolToIndices.has(e)),u=e=>{let t=[],n="var prod = 1.0;",o="var sum = 0.0;",u="sum += prod;",l=[],d=[],p=[],c=[],h=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((e,n)=>{if(r.rhs.symbolToIndices.has(n)){let o=r.rhs.symbolToIndices.get(n)?.[0];void 0!==o&&r.lhs.forEach((r,a)=>{if(e.inputIndices.includes(a)){let e=r.symbolToIndices.get(n);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{t.push(`${i[a].indicesSet(`input${a}Indices`,e,s.indicesGet("outputIndices",o))}`)})}})}else r.lhs.forEach((t,r)=>{if(e.inputIndices.includes(r)){let e=t.symbolToIndices.get(n);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{l.push(`${i[r].indicesSet(`input${r}Indices`,e,`${n}`)}`)}),c.push(`prod *= ${i[r].getByIndices(`input${r}Indices`)};`)}}),d.push(`for(var ${n}: u32 = 0; ${n} < uniforms.${appendMax(n)}; ${n}++) {`),p.push("}")});let f=h?[...t,`let sum = ${i.map((e,t)=>e.getByIndices(`input${t}Indices`)).join(" * ")};`]:[...t,o,...d,...l,n,...c,u,...p];return`
            ${e.registerUniforms(a.map(e=>({name:`${appendMax(e)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((e,t)=>`var input${t}Indices: ${i[t].type.indices};`).join("\n")}
            ${f.join("\n")};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let i=a.filter(e=>r.symbolToInfo.has(e)).map(e=>({type:12,data:r.symbolToInfo.get(e)?.dimValue||0}));i.push({type:12,data:o});let s=e.map((e,t)=>[...createTensorShapeVariables(e)]).reduce((e,t)=>e.concat(t),i);return s.push(...createTensorShapeVariables(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s}},getShaderSource:u}},einsum=(e,t)=>{let r=new EinsumEquation(e.inputs,t.equation),n=r.outputDims,i=e.inputs.map((e,t)=>e.dims);e.compute(createEinsumProgramInfo(i,e.inputs[0].dataType,r,n))},parseEinsumAttributes=e=>{let t=e.equation.replace(/\s+/g,"");return createAttributeWithCacheKey2({equation:t})}}}),init_expand=__esm({"web/lib/wasm/jsep/webgpu/ops/expand.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),validateInputs36=e=>{if(!e||2!==e.length)throw Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,i=t.length<r.length?0:t.length-r.length;for(;n<r.length&&i<t.length;++n,++i)if(r[n]!==t[i]&&1!==r[n]&&1!==t[i])throw Error("Expand requires shape to be broadcastable to input")},getAdjustedShape=(e,t)=>{let r=e.length-t.length,n=[];for(let t=0;t<r;++t)n.push(e[t]);for(let i=0;i<t.length;++i)n.push(1===t[i]?e[i+r]:t[i]);return n},calculateOutputShape3=(e,t)=>e.length>t.length?getAdjustedShape(e,t):getAdjustedShape(t,e),createExpandProgramInfo=e=>{let t=e[0].dims,r=calculateOutputShape3(t,Array.from(e[1].getBigInt64Array(),Number)),n=e[0].dataType,i=9===n||1===ShapeUtil2.size(t),o=9===n||t.length>0&&t[t.length-1]%4==0?4:1,s=i||r.length>0&&r[r.length-1]%4==0?4:1,a=Math.ceil(ShapeUtil2.size(r)/s),u=e=>{let i,a=inputVariable("input",n,t.length,o),u=outputVariable("output",n,r.length,s);if(9===n){let e=(e,t,r="")=>`
          let outputIndices${t} = ${u.offsetToIndices(`outputOffset + ${t}u`)};
          let offset${t} = ${a.broadcastedIndicesToOffset(`outputIndices${t}`,u)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${r}(${a.getByOffset(`index${t}`)}[component${t}]);
        `;i=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${e("data",0,"u32")}
        ${e("data",1,"u32")}
        ${e("data",2,"u32")}
        ${e("data",3,"u32")}
        ${u.setByOffset("global_idx","data")}
      }`}else i=`
        let outputIndices = ${u.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${a.broadcastedIndicesToOffset("outputIndices",u)};
        let data = ${u.type.value}(${a.getByOffset(`inputOffset / ${o}`)});
        ${u.setByOffset("global_idx","data")}
      }`;return`
    ${e.registerUniform("vec_size","u32").declareVariables(a,u)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${i}`},l=[{type:12,data:a},...createTensorShapeVariables(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${o}${s}`,inputDependencies:["rank"]},getShaderSource:u,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l})}},expand=e=>{validateInputs36(e.inputs),e.compute(createExpandProgramInfo(e.inputs),{inputs:[0]})}}}),init_fast_gelu=__esm({"web/lib/wasm/jsep/webgpu/ops/fast-gelu.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),init_unary_op2(),createFastGeluProgramInfo=e=>{let t=e[0].dataType,r=ShapeUtil2.size(e[0].dims),n=ShapeUtil2.size(e[1].dims),i=n%4==0,o=e=>{let r=inputVariable("x",t,[1],4),n=inputVariable("bias",t,[1],4),o=outputVariable("y",t,[1],4),s=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],a=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${n.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,u=i?`
      let bias = ${n.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${a(0)}${a(1)}${a(2)}${a(3)}
      let bias = ${r.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms(s).declareVariables(r,n,o)}

    ${fastGeluImpl(tensorTypeToWsglValueType(t))}

    ${e.mainStart(WORKGROUP_SIZE)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${r.getByOffset("global_idx")};
      ${u}
      let x_in = x + bias;
      ${o.setByOffset("global_idx",fastGeluExpression("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:o,getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/WORKGROUP_SIZE/4)}})}},fastGelu2=e=>{e.inputs.length<2||0===ShapeUtil2.size(e.inputs[1].dims)?fastGelu(e):e.compute(createFastGeluProgramInfo(e.inputs))}}}),init_gather2=__esm({"web/lib/wasm/jsep/webgpu/ops/gather.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs37=e=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.")},createGatherProgramInfo2=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r.length,o=ShapeUtil2.normalizeAxis(t.axis,i),s=r.slice(0);s.splice(o,1,...n);let a=r[o],u=9===e[0].dataType?4:1,l=Math.ceil(ShapeUtil2.size(s)/u),d=[{type:12,data:l},{type:6,data:a},{type:12,data:o},...createTensorShapeVariables(e[0].dims,e[1].dims,s)],p=t=>{let r,a=inputVariable("data",e[0].dataType,e[0].dims.length,u),l=inputVariable("inputIndices",e[1].dataType,e[1].dims.length),d=outputVariable("output",e[0].dataType,s.length,u),p=e=>{let t=n.length,r=`var indicesIndices${e}  = ${l.type.indices}(0);`;for(let n=0;n<t;n++)r+=`${t>1?`indicesIndices${e}[${n}]`:`indicesIndices${e}`} = ${s.length>1?`outputIndices${e}[uniforms.axis + ${n}]`:`outputIndices${e}`};`;r+=`
          var idx${e} = ${l.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${a.type.indices};
        `;for(let n=0,a=0;n<i;n++)n===o?(r+=`${i>1?`dataIndices${e}[${n}]`:`dataIndices${e}`} = u32(idx${e});`,a+=t):(r+=`${i>1?`dataIndices${e}[${n}]`:`dataIndices${e}`} = ${s.length>1?`outputIndices${e}[${a}]`:`outputIndices${e}`};`,a++);return r};if(9===e[0].dataType){let e=(e,t,r="")=>`
          let outputIndices${t} = ${d.offsetToIndices(`outputOffset + ${t}u`)};
          ${p(t)};
          let offset${t} = ${a.indicesToOffset(`dataIndices${t}`)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${r}(${a.getByOffset(`index${t}`)}[component${t}]);
        `;r=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${e("value",0,"u32")}
        ${e("value",1,"u32")}
        ${e("value",2,"u32")}
        ${e("value",3,"u32")}
        ${d.setByOffset("global_idx","value")}
      `}else r=`
      let outputIndices = ${d.offsetToIndices("global_idx")};
      ${p("")};
      let value = ${a.getByIndices("dataIndices")};
      ${d.setByOffset("global_idx","value")};
      `;return`
      ${t.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(a,l,d)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${r}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:p}},parseGatherAttributes2=e=>createAttributeWithCacheKey2({axis:e.axis}),gather2=(e,t)=>{validateInputs37(e.inputs),e.compute(createGatherProgramInfo2(e.inputs,t))}}}),init_gather_nd=__esm({"web/lib/wasm/jsep/webgpu/ops/gather-nd.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),computeSliceOffsets=(e,t,r,n,i,o,s,a,u)=>{let l=[{type:12,data:o},{type:12,data:n},{type:12,data:i},{type:12,data:r},{type:12,data:s},{type:12,data:a},{type:12,data:u}],d=[o];l.push(...createTensorShapeVariables(t.dims,d));let p=e=>{let n=[inputVariable("indices_data",t.dataType,t.dims.length),outputVariable("input_slice_offsets_data",12,1,1)],o=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:i.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${e.registerUniforms(o).declareVariables(...n)}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${i.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:p},{inputs:[t],outputs:[-1]})[0]},gatherND=(e,t)=>{let r=e.inputs,n=r[0].dims,i=r[0].dataType,o=r[1].dims,s=o[o.length-1],a=ShapeUtil2.sizeToDimension(o,o.length-1),u=ShapeUtil2.sizeFromDimension(n,t.batchDims+s),l=ShapeUtil2.sizeToDimension(n,t.batchDims),d=ShapeUtil2.sizeFromDimension(n,t.batchDims),p=a/l,c=Array(s),h=u;for(let e=0;e<s;++e)c[s-1-e]=h,h*=n[t.batchDims+s-1-e];let f=computeSliceOffsets(e,r[1],c,t.batchDims,n,a,p,d,s),m=t.batchDims+s;if(m>n.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let g=o.slice(0,-1).concat(n.slice(m)),b=ShapeUtil2.size(g),y=[{type:12,data:b},{type:12,data:u},...createTensorShapeVariables(r[0].dims,f.dims,g)],_=e=>{let t=inputVariable("data",r[0].dataType,r[0].dims.length),n=inputVariable("slice_offsets",12,f.dims.length),i=outputVariable("output",r[0].dataType,g.length);return`
          ${e.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(t,n,i)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:g,dataType:i}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:y}),getShaderSource:_},{inputs:[r[0],f]})},parseGatherNDAttributes=e=>({batchDims:e.batch_dims,cacheKey:""})}}),init_gather_block_quantized=__esm({"web/lib/wasm/jsep/webgpu/ops/gather-block-quantized.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs38=(e,t)=>{if(e.length<3||e.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=ShapeUtil2.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,i=e[0],o=e[2],s=4===e.length?e[3]:void 0;if(o.dims.length!==i.dims.length||!i.dims.map((e,t)=>t===r?Math.ceil(e/n)===o.dims[t]:e===o.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==i.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==o.dims.length||!s.dims.map((e,t)=>e===o.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},createGatherBlockQuantizedProgramInfo=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r.length,o=ShapeUtil2.normalizeAxis(t.gatherAxis,i),s=ShapeUtil2.normalizeAxis(t.quantizeAxis,i),a=r.slice(0);a.splice(o,1,...n);let u=ShapeUtil2.size(a),l=e[2].dataType,d=22===e[0].dataType,p=[{type:12,data:u},{type:12,data:s},{type:12,data:o},{type:12,data:t.blockSize},...createTensorShapeVariables(...e.map((e,t)=>e.dims),a)],c=t=>{let i=inputVariable("data",e[0].dataType,e[0].dims.length),s=inputVariable("inputIndices",e[1].dataType,e[1].dims.length),u=inputVariable("scales",e[2].dataType,e[2].dims.length),p=e.length>3?inputVariable("zeroPoint",e[3].dataType,e[3].dims.length):void 0,c=outputVariable("output",l,a.length),h=[i,s,u];p&&h.push(p);let f=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${t.registerUniforms(f).declareVariables(...h,c)}
        ${t.mainStart()}
        let output_indices = ${c.offsetToIndices("global_idx")};
        var indices_indices = ${s.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${c.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${s.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${c.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${i.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${c.indicesGet("output_indices","i")};
          ${i.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${s.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[o]};
        }
        ${i.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${a.length}; i++) {
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
        let dequantized_data = ${tensorTypeToWsglValueType(l)}(quantized_data - zero_point) * scale;
        ${c.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((e,t)=>1!==t).map(e=>e.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(e,t)=>"rank")},getRunData:()=>({outputs:[{dims:a,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:c}},gatherBlockQuantized=(e,t)=>{validateInputs38(e.inputs,t),e.compute(createGatherBlockQuantizedProgramInfo(e.inputs,t))},parseGatherBlockQuantizedAttributes=e=>createAttributeWithCacheKey2({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}}),init_gather_elements=__esm({"web/lib/wasm/jsep/webgpu/ops/gather-elements.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs39=e=>{if(!e||2!==e.length)throw Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},createGatherElementsProgramInfo=(e,t)=>{let r=e[0].dims,n=e[0].dataType,i=r.length,o=e[1].dims,s=e[1].dataType,a=ShapeUtil2.normalizeAxis(t.axis,i),u=r[a],l=o.slice(0),d=ShapeUtil2.size(l),p=inputVariable("input",n,i),c=inputVariable("indicesInput",s,o.length),h=outputVariable("output",n,l.length),f=[{type:12,data:d},{type:6,data:u},{type:12,data:a}];return f.push(...createTensorShapeVariables(r,o,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:e=>`
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
  }`}},parseGatherElementsAttributes=e=>createAttributeWithCacheKey2({axis:e.axis}),gatherElements=(e,t)=>{validateInputs39(e.inputs),e.compute(createGatherElementsProgramInfo(e.inputs,t))}}}),init_gemm2=__esm({"web/lib/wasm/jsep/webgpu/ops/gemm.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),validateInputs40=e=>{if(!e)throw Error("Input is missing");if(e.length<2||e.length>3)throw Error("Invaid input number.");if(3===e.length&&e[2].dims.length>2)throw Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||3===e.length&&e[0].dataType!==e[2].dataType)throw Error("Input types are mismatched")},createGemmProgramInfo2=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[i,o,s]=GemmUtil2.getShapeOfGemmResult(r,t.transA,n,t.transB,3===e.length?e[2].dims:void 0),a=[i,o];if(!a)throw Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(o/16),d=Math.ceil(i/16),p=!0,c=ShapeUtil2.size(a),h=[{type:12,data:p?l:c},{type:12,data:i},{type:12,data:o},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],f=["type","type"];3===e.length&&(h.push(...createTensorShapeVariables(e[2].dims)),f.push("rank")),h.push(...createTensorShapeVariables(a));let m=r=>{let n="";t.transA&&t.transB?n="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?n="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?n="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":t.transA||t.transB||(n="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let i=1===t.alpha?"":"value *= uniforms.alpha;",o=inputVariable("a",e[0].dataType,e[0].dims),s=inputVariable("b",e[1].dataType,e[1].dims),u=o.type.value,l=null,d=[o,s];3===e.length&&(l=inputVariable("c",e[2].dataType,e[2].dims.length),d.push(l));let p=outputVariable("output",e[0].dataType,a.length);d.push(p);let c=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${r.registerUniforms(c).declareVariables(...d)}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${u}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${n}
    }

    ${i}
    ${null!=l?`let cOffset = ${l.broadcastedIndicesToOffset("vec2(m, n)",p)}; value += ${u}(uniforms.beta) * ${l.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},g=r=>{let n=inputVariable("a",e[0].dataType,e[0].dims),i=inputVariable("b",e[1].dataType,e[1].dims),o=null,s=[n,i];3===e.length&&(o=inputVariable("c",e[2].dataType,e[2].dims.length),s.push(o));let l=outputVariable("output",e[0].dataType,a.length);s.push(l);let d=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],p="",c="";t.transA&&t.transB?(c=`
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
      `,p="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(c=`
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
      `,p="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(c=`
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
      `,p="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):t.transA||t.transB||(c=`
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
      `,p="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let h=1===t.alpha?"":"value *= uniforms.alpha;";return`
  ${r.registerUniforms(d).declareVariables(...s)}
  var<workgroup> tile_a: array<array<${n.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${i.type.storage}, ${u}>, ${u}>;
  ${r.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${l.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${c}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${p}
      }
      workgroupBarrier();
    }

    ${h}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${null!=o?`let cOffset = ${o.broadcastedIndicesToOffset("vec2(m, n)",l)}; value += ${l.type.value}(uniforms.beta) * ${o.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:l*d},programUniforms:h}),getShaderSource:g}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:m}},parseGemmAttributes2=e=>{let t=e.transA,r=e.transB;return{transA:t,transB:r,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${1===e.alpha}`}},gemm2=(e,t)=>{validateInputs40(e.inputs),e.compute(createGemmProgramInfo2(e.inputs,t))}}}),init_grid_sample=__esm({"web/lib/wasm/jsep/webgpu/ops/grid-sample.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),[idxN,idxC,idxH,idxW]=[0,1,2,3],validateInputs41=e=>{if(4!==e[0].dims.length)throw Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw Error("grid batch size must match input batch size")},gsGetCubicCoeffs=`
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
`,gsBicubicInterpolate=e=>`
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
`,gsDenormalize=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${0===e.alignCorners?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,gsReflect=e=>`
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
`,pixelAtGrid=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${idxN}] = batch;
     indices[${idxC}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${idxH}] = u32(r);
            indices[${idxW}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${idxH}] = u32(clamp(r, 0, H - 1));
          indices[${idxW}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${idxH}] = gs_reflect(r, border[1], border[3]);
          indices[${idxW}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,computePixel=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${idxN}], indices[${idxC}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${idxN}], indices[${idxC}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${idxN}], indices[${idxC}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${idxN}], indices[${idxC}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${idxN}], indices[${idxC}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${idxN}], indices[${idxC}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,createGridSampleProgramInfo=(e,t)=>{let r=inputVariable("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=inputVariable("grid",e[1].dataType,n.length,2),o=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];"NHWC"===t.format&&(o=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[idxN,idxC,idxH,idxW]=[0,3,1,2]);let s=outputVariable("output",e[0].dataType,o.length),a=r.type.value,u=[{type:12,data:ShapeUtil2.size(o)},...createTensorShapeVariables(e[0].dims,n,o)],l=e=>`
  ${e.registerUniform("output_size","u32").declareVariables(r,i,s)}
  ${gsGetCubicCoeffs}
  ${gsBicubicInterpolate(a)}
  ${gsDenormalize(t)}
  ${gsReflect(t)}
  ${pixelAtGrid(r,a,t)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${idxH}]);
      let W_in = i32(uniforms.x_shape[${idxW}]);

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
      var grid_indices = vec3<u32>(indices[${idxN}], indices[${idxH}], indices[${idxW}]);
      let nxy = ${i.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${computePixel(s,a,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:e=>{let t=ShapeUtil2.size(o);return{outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:u}},getShaderSource:l}},gridSample=(e,t)=>{validateInputs41(e.inputs),e.compute(createGridSampleProgramInfo(e.inputs,t))},parseGridSampleAttributes=e=>createAttributeWithCacheKey2({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}}),init_multihead_attention=__esm({"web/lib/wasm/jsep/webgpu/ops/multihead-attention.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_types2(),init_attention(),init_common(),init_transpose2(),getInput=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,validateInputs42=(e,t)=>{let r,n=e[0],i=getInput(e,1),o=getInput(e,2),s=getInput(e,3),a=getInput(e,4),u=getInput(e,5),l=getInput(e,6),d=getInput(e,7);if(3!==n.dims.length&&5!==n.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let p=n.dims[0],c=n.dims[1],h=3===n.dims.length?n.dims[2]:t.numHeads*n.dims[4],f=c,m=0,g=0,b=Math.floor(h/t.numHeads);if(l&&d&&ShapeUtil2.size(l.dims)&&ShapeUtil2.size(d.dims)){if(4!==l.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==p||l.dims[1]!==t.numHeads||l.dims[3]!==b)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==b)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==d.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');m=l.dims[2],g=l.dims[2]}else if(l&&ShapeUtil2.size(l.dims)||d&&ShapeUtil2.size(d.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(i&&ShapeUtil2.size(i.dims)>0){if(3!==n.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==i.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===i.dims.length){if(i.dims[2]!==n.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');r=2,f=i.dims[1]}else if(5===i.dims.length){if(i.dims[2]!==t.numHeads||2!==i.dims[3]||i.dims[4]!==b)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw Error('Expect "value" be none when "key" has packed kv format.');r=5,f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==b)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');r=0,f=i.dims[2]}}else{if(5!==n.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||3!==n.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');r=3}if(s&&ShapeUtil2.size(s.dims)>0){if(1!==s.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(i&&5===i.dims.length&&2===i.dims[3])throw Error("bias is not allowed for packed kv.")}let y=m+f,_=0;if(a&&ShapeUtil2.size(a.dims)>0){_=8;let e=a.dims;if(1===e.length?e[0]===p?_=1:e[0]===3*p+2&&(_=3):2===e.length&&e[0]===p&&e[1]===y&&(_=5),8===_)throw Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)');throw Error("Mask not supported")}let x=!1,v=h;if(o&&ShapeUtil2.size(o.dims)>0){if(3!==o.dims.length&&4!==o.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===o.dims.length){if(f!==o.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=o.dims[2]}else{if(f!==o.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');v=o.dims[1]*o.dims[3],x=!0}}let w=!1;if(a&&ShapeUtil2.size(a.dims)>0)throw Error("Key padding mask is not supported");if(u&&ShapeUtil2.size(u.dims)>0){if(4!==u.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==y)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:c,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:y,maxSequenceLength:g,inputHiddenSize:0,hiddenSize:h,vHiddenSize:v,headSize:b,vHeadSize:Math.floor(v/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:w,passPastInKv:x,qkvFormat:r}},parseMultiHeadAttentionAttributes=e=>createAttributeWithCacheKey2({...e}),weightTransposeAttribute2=createAttributeWithCacheKey2({perm:[0,2,1,3]}),addBiasTranspose=(e,t,r,n,i,o,s)=>{let a=[n,i,o],u=ShapeUtil2.size(a),l=[{type:12,data:u},{type:12,data:s},{type:12,data:o}],d=e=>{let n=outputVariable("qkv_with_bias",t.dataType,a),i=inputVariable("qkv",t.dataType,a),o=inputVariable("bias",r.dataType,a),s=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${e.registerUniforms(s).declareVariables(i,o,n)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:d},{inputs:[t,r],outputs:[-1]})[0]},maybeTransposeToBNSHAndAddBias=(e,t,r,n,i,o,s,a)=>{let u=o;if(s&&ShapeUtil2.size(s.dims)>0)if(1!==n)return(u=(u=addBiasTranspose(e,o,s,t,n,r*i,a)).reshape([t,n,r,i]),1===r||1===n)?u:e.compute(createTransposeProgramInfo2(u,weightTransposeAttribute2.perm),{inputs:[u],outputs:[-1]})[0];else throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return(3===o.dims.length&&(u=o.reshape([t,n,r,i])),1===r||1===n)?u:e.compute(createTransposeProgramInfo2(u,weightTransposeAttribute2.perm),{inputs:[u],outputs:[-1]})[0]},multiHeadAttention=(e,t)=>{let r=validateInputs42(e.inputs,t),n=e.inputs[0],i=getInput(e.inputs,1),o=getInput(e.inputs,2),s=getInput(e.inputs,3),a=getInput(e.inputs,4),u=getInput(e.inputs,5),l=getInput(e.inputs,6),d=getInput(e.inputs,7);if(5===n.dims.length)throw Error("Packed QKV is not implemented");if(i?.dims.length===5)throw Error("Packed KV is not implemented");let p=i&&o&&4===i.dims.length&&4===o.dims.length,c=maybeTransposeToBNSHAndAddBias(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,s,0);if(p)return applyAttention(e,c,i,o,a,void 0,l,d,u,r);if(!i||!o)throw Error("key and value must be provided");let h=maybeTransposeToBNSHAndAddBias(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,i,s,r.hiddenSize),f=maybeTransposeToBNSHAndAddBias(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,o,s,2*r.hiddenSize);applyAttention(e,c,h,f,a,void 0,l,d,u,r)}}}),init_split2=__esm({"web/lib/wasm/jsep/webgpu/ops/split.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs43=e=>{if(!e||e.length<1)throw Error("too few inputs")},createSplitAttributesFromInputs=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(e=>r.push(Number(e))),n=r.length),createAttributeWithCacheKey2({numOutputs:n,axis:t.axis,splitSizes:r})},calculateOutputIndexImpl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${getElementAt("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,writeBufferDataImpl=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let i=e[n].setByIndices("indices","input[global_idx]");1===t?r.push(i):0===n?r.push(`if (output_number == ${n}u) { ${i} }`):n===t-1?r.push(`else { ${i} }`):r.push(`else if (output_number == ${n}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join("\n")}
      }`},createSplitProgramInfo2=(e,t)=>{let r=e[0].dims,n=ShapeUtil2.size(r),i=e[0].dataType,o=ShapeUtil2.normalizeAxis(t.axis,r.length),s=Array(t.numOutputs),a=inputVariable("input",i,r.length),u=Array(t.numOutputs),l=[],d=[],p=0,c=[{type:12,data:n}];for(let n=0;n<t.numOutputs;n++){p+=t.splitSizes[n],u[n]=p;let a=r.slice();a[o]=t.splitSizes[n],d.push(a),s[n]=outputVariable(`output${n}`,i,a.length),l.push({dims:d[n],dataType:e[0].dataType})}c.push({type:12,data:u},...createTensorShapeVariables(r,...d));let h=e=>`
  ${e.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(a,...s)}
  ${calculateOutputIndexImpl(u.length)}
  ${writeBufferDataImpl(s)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${a.offsetToIndices("global_idx")};
    var index = ${a.indicesGet("indices",o)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${getElementAt("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${a.indicesSet("indices",o,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:h,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:c})}},split2=(e,t)=>{validateInputs43(e.inputs);let r=1===e.inputs.length?t:createSplitAttributesFromInputs(e.inputs,t);e.compute(createSplitProgramInfo2(e.inputs,r),{inputs:[0]})},parseSplitAttributes2=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw Error("numOutputs and splitSizes length must be equal");return createAttributeWithCacheKey2({axis:t,numOutputs:n,splitSizes:r})}}}),init_rotary_embedding=__esm({"web/lib/wasm/jsep/webgpu/ops/rotary-embedding.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs44=(e,t)=>{let[r,n,i,o]=e,{numHeads:s,rotaryEmbeddingDim:a}=t;if(3!==r.dims.length&&4!==r.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!ShapeUtil2.areEqual(n.dims,[])&&!ShapeUtil2.areEqual(n.dims,[1])&&2!==n.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(2!==i.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(2!==o.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(!ShapeUtil2.areEqual(i.dims,o.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(a>0&&0===s)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],l=r.dims[r.dims.length-2],d=i.dims[0],p=ShapeUtil2.sizeFromDimension(r.dims,1)/l,c=0===a?2*i.dims[1]:p/s;if(a>c)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===n.dims.length){if(u!==n.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(l!==n.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(c/2!==i.dims[1]&&a/2!==i.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`);if(l>d)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},createRotaryEmbeddingProgramInfo=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:i,scale:o}=t,s=e[0].dims[0],a=ShapeUtil2.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],l=a/u,d=e[2].dims[1],p=0===i?2*d:l/n,c=[s,u,l/p,p-d],h=ShapeUtil2.computeStrides(c),f=[{type:1,data:o},{type:12,data:c},{type:12,data:h},...3===e[0].dims.length?Array({type:12,data:[a,l,p,1]}):[],...4===e[0].dims.length?Array({type:12,data:[a,p,u*p,1]}):[],...createTensorShapeVariables(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],m=t=>{let n=inputVariable("input",e[0].dataType,e[0].dims.length),i=inputVariable("position_ids",e[1].dataType,e[1].dims.length),o=inputVariable("cos_cache",e[2].dataType,e[2].dims.length),s=inputVariable("sin_cache",e[3].dataType,e[3].dims.length),a=outputVariable("output",e[0].dataType,e[0].dims.length);return t.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:c.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${t.declareVariables(n,i,o,s,a)}

        ${t.mainStart(WORKGROUP_SIZE)}
          let half_rotary_emb_dim = uniforms.${o.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${i.broadcastedIndicesToOffset("bsnh.xy",outputVariable("",i.type.tensor,2))};
            let position_id =
                u32(${i.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${n.getByOffset("i")} * ${o.get("position_id","bsnh[3]")} -
                ${n.getByOffset("j")} * ${s.get("position_id","bsnh[3]")};
            ${a.setByOffset("i","re")}
            let im = ${n.getByOffset("i")} * ${s.get("position_id","bsnh[3]")} +
                ${n.getByOffset("j")} * ${o.get("position_id","bsnh[3]")};
            ${a.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${a.setByOffset("k",n.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:createAttributeWithCacheKey2({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(ShapeUtil2.size(c)/WORKGROUP_SIZE)},programUniforms:f})}},rotaryEmbedding=(e,t)=>{validateInputs44(e.inputs,t),e.compute(createRotaryEmbeddingProgramInfo(e.inputs,t))}}}),init_group_query_attention=__esm({"web/lib/wasm/jsep/webgpu/ops/group-query-attention.ts"(){"use strict";init_attribute_with_cache_key2(),init_wasm_common(),init_attention(),init_multihead_attention(),init_split2(),init_transpose2(),init_rotary_embedding(),init_common(),validateInputs45=(e,t)=>{if(t.doRotary&&e.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],i=e[2],o=e[3],s=e[4];if(0!==t.doRotary&&e.length<=7)throw Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(-1!==t.localWindowSize)throw Error("Local attention is not supported");if(0!==t.softcap)throw Error("Softcap is not supported");if(0!==t.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==r.dims.length&&5!==r.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let a=!1,u=r.dims[0],l=r.dims[1],d=3===r.dims.length?a?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],p=l,c=0,h=!n||0===n.dims.length,f=h?Math.floor(d/(t.numHeads+2*t.kvNumHeads)):Math.floor(d/t.numHeads);h&&(d=f*t.numHeads);let m=o&&0!==o.dims.length,g=s&&0!==s.dims.length;if(m&&4===o.dims.length&&o.dims[0]===u&&o.dims[1]!==t.kvNumHeads&&o.dims[2]===t.kvNumHeads&&o.dims[3]===f)throw Error("BSNH pastKey/pastValue is not supported");if(m&&g){if(4!==o.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==s.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');c=o.dims[2]}else if(m||g)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let b=1;if(n&&n.dims.length>0){if(3!==r.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===n.dims.length){if(r.dims[2]%n.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');p=n.dims[1]}else if(5===n.dims.length){if(n.dims[2]!==t.numHeads||2!==n.dims[3]||n.dims[4]!==f)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw Error('Expect "value" be none when "key" has packed kv format.');p=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==f)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=n.dims[2]}}else{if(3!==r.dims.length&&5!==r.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===r.dims.length&&(r.dims[2]!==t.numHeads||3!==r.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}let y=0,_=!1,x=t.kvNumHeads?f*t.kvNumHeads:d;if(i&&i.dims.length>0){if(3!==i.dims.length&&4!==i.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===i.dims.length){if(p!==i.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');x=i.dims[2]}else{if(p!==i.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');x=i.dims[1]*i.dims[3],_=!0}}let v=e.length>4?e[5]:void 0;if(v&&1!==v.dims.length&&v.dims[0]!==u)throw Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let w=!1;return{batchSize:u,sequenceLength:l,pastSequenceLength:c,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:d,vHiddenSize:x,headSize:f,vHeadSize:Math.floor(x/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:y,scale:t.scale,broadcastResPosBias:w,passPastInKv:_,qkvFormat:b}},weightTransposeAttribute3=createAttributeWithCacheKey2({perm:[0,2,1,3]}),maybeTransposeToBNSH=(e,t,r)=>{let n=t,i=r.kvNumHeads;return 3===t.dims.length&&0!==r.kvSequenceLength&&(n=t.reshape([r.batchSize,r.kvSequenceLength,i,r.headSize]),n=e.compute(createTransposeProgramInfo2(n,weightTransposeAttribute3.perm),{inputs:[n],outputs:[-1]})[0]),n},generatePositionIdsProgramInfo=(e,t,r,n)=>{let i=7,o=[e*t],s=e*t,a=[{type:12,data:s},{type:12,data:t},{type:12,data:e}];return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a}),getShaderSource:e=>{let t=inputVariable("seq_lens",r.dataType,r.dims),s=inputVariable("total_seq_lens",n.dataType,n.dims),a=outputVariable("pos_ids",i,o),u=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${e.registerUniforms(u).declareVariables(t,s,a)}
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
  `}}},groupQueryAttention=(e,t)=>{let r,n,i=validateInputs45(e.inputs,t);if(5===e.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let o=e.inputs[0],s=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,u=e.inputs[3]&&0!==e.inputs[3].dims.length?e.inputs[3]:void 0,l=e.inputs[4]&&0!==e.inputs[4].dims.length?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,c=i.kvNumHeads?i.kvNumHeads:i.numHeads,h=createAttributeWithCacheKey2({axis:2,numOutputs:3,splitSizes:[i.numHeads*i.headSize,c*i.headSize,c*i.headSize]}),[f,m,g]=s||a?[o,s,a]:e.compute(createSplitProgramInfo2([o],h),{inputs:[o],outputs:[-1,-1,-1]});if(t.doRotary){let o=e.compute(generatePositionIdsProgramInfo(i.batchSize,i.sequenceLength,d,p),{inputs:[d,p],outputs:[-1]})[0],s=e.inputs[7],a=e.inputs[8],u=createAttributeWithCacheKey2({interleaved:0!==t.rotaryInterleaved,numHeads:i.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),l=[f,o,s,a],c=[-1];r=e.compute(createRotaryEmbeddingProgramInfo(l,u),{inputs:l,outputs:c})[0],l.splice(0,1,m);let h=createAttributeWithCacheKey2({interleaved:0!==t.rotaryInterleaved,numHeads:i.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});n=e.compute(createRotaryEmbeddingProgramInfo(l,h),{inputs:l,outputs:c})[0]}let b=maybeTransposeToBNSHAndAddBias(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,t.doRotary?r:f,void 0,0),y=maybeTransposeToBNSH(e,t.doRotary?n:m,i),_=maybeTransposeToBNSH(e,g,i);applyAttention(e,b,y,_,void 0,void 0,u,l,void 0,i,d,p)}}}),init_instance_norm=__esm({"web/lib/wasm/jsep/webgpu/ops/instance-norm.ts"(){"use strict";init_wasm_common(),init_util2(),init_transpose2(),init_common(),computeChannelScaleShift=(e,t,r,n,i,o,s,a)=>{let u=getMaxComponents(o),l=1===u?"f32":`vec${u}f`,d=1===u?"vec2f":`mat2x${u}f`,p=i*s,c=64;1===p&&(c=256);let h=[i,s,o/u],f=[i,s,2],m=["rank","type","type"],g=[];g.push(...createTensorShapeVariables(h,f));let b=e=>{let i=inputVariable("x",t.dataType,3,u),o=[i,inputVariable("scale",r.dataType,r.dims),inputVariable("bias",n.dataType,n.dims),outputVariable("output",1,3,2)];return`
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
      let sum_final = ${sumVector("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${sumVector("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${a}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${a};${c}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:f,dataType:1}],dispatchGroup:{x:p},programUniforms:g}),getShaderSource:b},{inputs:[t,r,n],outputs:[-1]})[0]},createInstanceNormProgramInfo=(e,t,r)=>{let n=t[0].dims,i=n,o=2,s=n[0],a=n[1],u=ShapeUtil2.sizeFromDimension(n,o),l=getMaxComponents(u),d=ShapeUtil2.size(i)/l,p=computeChannelScaleShift(e,t[0],t[1],t[2],s,u,a,r.epsilon),c=[s,a,u/l],h=[s,a],f=["type","none"],m=e=>{let r=inputVariable("x",t[0].dataType,c.length,l),n=inputVariable("scale_shift",1,h.length,2),i=outputVariable("output",t[0].dataType,c.length,l),o=[r,n,i];return`
  ${e.registerUniform("output_size","u32").declareVariables(...o)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${i.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${n.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${r.getByOffset("global_idx")} * ${i.type.value}(scale_shift.x) + ${i.type.value}(scale_shift.y);
      ${i.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...createTensorShapeVariables(c,h,c)]}),getShaderSource:m},{inputs:[t[0],p]})},createInstanceNormNHWCProgramInfo=(e,t,r)=>{let n=t[0].dims,i=n,o=n[0],s=n[n.length-1],a=ShapeUtil2.sizeFromDimension(n,1)/s,u=getMaxComponents(s),l=ShapeUtil2.size(i)/u,d=[{type:12,data:a},{type:12,data:Math.floor(s/u)}],p=["type","type"],c=!1,h=[0,n.length-1];for(let e=0;e<n.length-2;e++)c=c||1!==n[e+1],h.push(e+1);let f=(c=c&&1!==n[n.length-1])?e.compute(createTransposeProgramInfo2(e.inputs[0],h),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},(e,t)=>n[h[t]])),m=computeChannelScaleShift(e,f,t[1],t[2],o,a,s,r.epsilon),g=e=>{let r=tensorTypeToWsglStorageType(t[0].dataType),n=1===u?"vec2f":`mat${u}x2f`,o=e=>{let t=0===e?"x":"y",n=1===u?"f32":`vec${u}f`;switch(u){case 1:return`${r}(${n}(scale.${t}))`;case 2:return`vec2<${r}>(${n}(scale[0].${t}, scale[1].${t}))`;case 4:return`vec4<${r}>(${n}(scale[0].${t}, scale[1].${t}, scale[2].${t}, scale[3].${t}))`;default:throw Error(`Not supported compoents ${u}`)}},s=inputVariable("input",t[0].dataType,t[0].dims,u),a=outputVariable("output",t[0].dataType,i,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${s.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${n}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${a.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${e.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${o(0)}, ${o(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:g},{inputs:[t[0],m]})},instanceNorm=(e,t)=>{"NHWC"===t.format?createInstanceNormNHWCProgramInfo(e,e.inputs,t):createInstanceNormProgramInfo(e,e.inputs,t)}}}),init_layer_norm=__esm({"web/lib/wasm/jsep/webgpu/ops/layer-norm.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),validateInputs46=e=>{if(!e||e.length<2)throw Error("layerNorm requires at least 2 inputs.")},createLayerNormProgramInfo=(e,t,r)=>{let n=t.simplified,i=e[0].dims,o=e[1],s=!n&&e[2],a=i,u=ShapeUtil2.normalizeAxis(t.axis,i.length),l=ShapeUtil2.sizeToDimension(i,u),d=ShapeUtil2.sizeFromDimension(i,u),p=ShapeUtil2.size(o.dims),c=s?ShapeUtil2.size(s.dims):0;if(p!==d||s&&c!==d)throw Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${c}`);let h=[];for(let e=0;e<i.length;++e)e<u?h.push(i[e]):h.push(1);let f=getMaxComponents(d),m=["type","type"],g=[{type:12,data:l},{type:1,data:d},{type:12,data:Math.floor(d/f)},{type:1,data:t.epsilon}];s&&m.push("type");let b=r>1,y=r>2,_=t=>{let r=tensorTypeToWsglStorageType(e[0].dataType),i=[inputVariable("x",e[0].dataType,e[0].dims,f),inputVariable("scale",o.dataType,o.dims,f)];s&&i.push(inputVariable("bias",s.dataType,s.dims,f)),i.push(outputVariable("output",e[0].dataType,a,f)),b&&i.push(outputVariable("mean_data_output",1,h)),y&&i.push(outputVariable("inv_std_output",1,h));let u=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${t.registerUniforms(u).declareVariables(...i)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${fillVector("f32",f)};
    var mean_square_vector = ${fillVector("f32",f)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${castToF32(r,f,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${sumVector("mean_vector",f)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${sumVector("mean_square_vector",f)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${castToF32(r,f,"x[j + offset]")};
      let f32scale = ${castToF32(r,f,"scale[j]")};
      output[j + offset] = ${i[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${castToF32(r,f,"bias[j]")}`:""}
      );
    }

    ${b?"mean_data_output[global_idx] = mean":""};
    ${y?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},x=[{dims:a,dataType:e[0].dataType}];return b&&x.push({dims:h,dataType:1}),y&&x.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${f};${r};${n}`,inputDependencies:m},getRunData:()=>({outputs:x,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:g}),getShaderSource:_}},layerNorm=(e,t)=>{validateInputs46(e.inputs),e.compute(createLayerNormProgramInfo(e.inputs,t,e.outputCount))}}}),init_matmul2=__esm({"web/lib/wasm/jsep/webgpu/ops/matmul.ts"(){"use strict";init_util2(),init_matmul_shaders(),init_matmul_packed_webgpu(),validateInputs47=e=>{if(!e||2!==e.length)throw Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw Error("shared dimension does not match.")},matMul2=e=>{validateInputs47(e.inputs);let t=BroadcastUtil2.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(createNaiveMatmulProgramInfo(e.inputs,{activation:""},t));else{let i=t[t.length-2],o=ShapeUtil2.size(e.inputs[0].dims.slice(0,-2)),s=ShapeUtil2.size(e.inputs[1].dims.slice(0,-2));if(1!==o&&1===i&&1===s){let i=e.inputs[0].reshape([1,o,n]),s=e.inputs[1].reshape([1,n,r]),a=[1,o,r],u=[i,s];e.compute(createMatmulProgramInfo2(u,{activation:""},t,a),{inputs:u})}else e.compute(createMatmulProgramInfo2(e.inputs,{activation:""},t))}}}}),init_matmulnbits=__esm({"web/lib/wasm/jsep/webgpu/ops/matmulnbits.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs48=(e,t)=>{if(e.length<3||e.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),o=t.blockSize/8*t.bits,s=e[1];if(!ShapeUtil2.areEqual(s.dims,[t.n,i,o]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let a=e[2].dims;if(ShapeUtil2.size(a)!==t.n*i)throw Error("scales input size error.");if(4===e.length){let r=e[3].dims,n=t.n*(8===t.bits?i:Math.floor((i*t.bits+7)/8));if(ShapeUtil2.size(r)!==n)throw Error("zeroPoints input size error.")}},createMatMulNBitsProgramInfo=(e,t)=>{let r=e[0].dims,n=r.length,i=r[n-2],o=t.k,s=t.n,a=r.slice(0,n-2),u=ShapeUtil2.size(a),l=e[1].dims[2]/4,d=e[0].dataType,p=getMaxComponents(t.k),c=getMaxComponents(l),h=getMaxComponents(s),f=a.concat([i,s]),m=i>1&&s/h%2==0?2:1,g=ShapeUtil2.size(f)/h/m,b=64,y=[],_=[u,i,o/p],x=ShapeUtil2.convertShape(e[1].dims).slice();x.splice(-1,1,l/c),y.push(...createTensorShapeVariables(_)),y.push(...createTensorShapeVariables(x)),y.push(...createTensorShapeVariables(e[2].dims)),4===e.length&&y.push(...createTensorShapeVariables(ShapeUtil2.convertShape(e[3].dims)));let v=[u,i,s/h];y.push(...createTensorShapeVariables(v));let w=r=>{let n=_.length,i=inputVariable("a",e[0].dataType,n,p),o=inputVariable("b",12,x.length,c),s=inputVariable("scales",e[2].dataType,e[2].dims.length),a=[i,o,s],u=4===e.length?inputVariable("zero_points",12,e[3].dims.length):void 0;u&&a.push(u);let d=v.length,f=outputVariable("output",e[0].dataType,d,h),g=tensorTypeToWsglStorageType(e[0].dataType),y=(()=>{switch(p){case 1:return`array<${g}, 8>`;case 2:return`mat4x2<${g}>`;case 4:return`mat2x4<${g}>`;default:throw Error(`${p}-component is not supported.`)}})(),w=()=>{let e=`
          // reuse a data
            var input_offset = ${i.indicesToOffset(`${i.type.indices}(batch, row, word_offset)`)};
            var a_data: ${y};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${i.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let t=0;t<h*m;t++)e+=`
            b_value = ${1===c?`b${t}_data`:`b${t}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${y}(${Array.from({length:4},(e,t)=>`${g}(b_value_lower[${t}]), ${g}(b_value_upper[${t}])`).join(", ")});
            b_dequantized_values = ${1===p?`${y}(${Array.from({length:8},(e,r)=>`(b_quantized_values[${r}] - ${u?`zero_point${t}`:"zero_point"}) * scale${t}`).join(", ")});`:`(b_quantized_values - ${y}(${Array(8).fill(`${u?`zero_point${t}`:"zero_point"}`).join(",")})) * scale${t};`};
            workgroup_shared[local_id.x * ${m} + ${Math.floor(t/h)}]${h>1?`[${t%h}]`:""} += ${Array.from({length:8/p},(e,t)=>`${1===p?`a_data[${t}] * b_dequantized_values[${t}]`:`dot(a_data[${t}], b_dequantized_values[${t}])`}`).join(" + ")};
          `;return e},$=()=>{let e=`
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
            let scale${t} = ${s.getByOffset("col_index * nBlocksPerCol + block")};
            ${u?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${u.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${t} = ${g}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return e},T=()=>{let e=`col_index = col * ${h};`;for(let t=0;t<h*m;t++)e+=`
            let b${t}_data = ${o.getByIndices(`${o.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return e+`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${y};
            var b_dequantized_values: ${y};`};return`
        var<workgroup> workgroup_shared: array<${f.type.value}, ${m*b}>;
        ${r.declareVariables(...a,f)}
        ${r.mainStart([b,1,1])}
          let output_indices = ${f.offsetToIndices(`(global_idx / ${b}) * ${m}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${b}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${$()}
            for (var word: u32 = 0; word < ${l}; word += ${c}) {
              ${T()}
              for (var i: u32 = 0; i < ${c}; i++) {
                ${w()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${m}) {
            var output_value: ${f.type.value} = ${f.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${b}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${m};
            }
            ${f.setByIndices(`${f.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${c};${h};${m};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:d}],dispatchGroup:{x:g},programUniforms:y}),getShaderSource:w}},createMatMulNBitsBlockSize32ProgramInfo=(e,t)=>{let r=e[0].dims,n=r.length,i=r[n-2],o=t.k,s=t.n,a=r.slice(0,n-2),u=ShapeUtil2.size(a),l=e[1].dims[2]/4,d=e[0].dataType,p=getMaxComponents(t.k),c=getMaxComponents(l),h=a.concat([i,s]),f=128,m=s%8==0?8:s%4==0?4:1,g=128/m,b=g*c*8,y=b/p,_=b/t.blockSize,x=ShapeUtil2.size(h)/m,v=[],w=[u,i,o/p],$=ShapeUtil2.convertShape(e[1].dims).slice();$.splice(-1,1,l/c),v.push(...createTensorShapeVariables(w)),v.push(...createTensorShapeVariables($)),v.push(...createTensorShapeVariables(e[2].dims)),4===e.length&&v.push(...createTensorShapeVariables(ShapeUtil2.convertShape(e[3].dims)));let T=[u,i,s];v.push(...createTensorShapeVariables(T));let I=r=>{let n=w.length,i=inputVariable("a",e[0].dataType,n,p),o=inputVariable("b",12,$.length,c),s=inputVariable("scales",e[2].dataType,e[2].dims.length),a=[i,o,s],u=4===e.length?inputVariable("zero_points",12,e[3].dims.length):void 0;u&&a.push(u);let l=T.length,d=outputVariable("output",e[0].dataType,l),h=tensorTypeToWsglStorageType(e[0].dataType),b=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${h}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${h}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${h}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${h}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${i.type.value}, ${y}>;
        var<workgroup> inter_results: array<array<${d.type.value}, ${g}>, ${m}>;
        ${r.declareVariables(...a,d)}
        ${r.mainStart([g,m,1])}
          let output_indices = ${d.offsetToIndices(`workgroup_index * ${m}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${_} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${y};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${y}; a_offset += ${f})
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
            let block = tile * ${_} + local_id.x;
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
            let scale = ${s.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${o.getByIndices(`${o.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${c}; i++) {
              ${b()}
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
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${c};${g};${m}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:d}],dispatchGroup:{x:x},programUniforms:v}),getShaderSource:I}},matMulNBits=(e,t)=>{validateInputs48(e.inputs,t),32===t.blockSize&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(createMatMulNBitsBlockSize32ProgramInfo(e.inputs,t)):e.compute(createMatMulNBitsProgramInfo(e.inputs,t))},parseMatMulNBitsAttributes=e=>createAttributeWithCacheKey2(e)}}),init_pad2=__esm({"web/lib/wasm/jsep/webgpu/ops/pad.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),validateInputs49=e=>{if(!e||e.length<1)throw Error("Too few inputs");if(1!==e[0].dataType&&10!==e[0].dataType)throw Error("Input type must be float or float16.");if(e.length>=2){let t=2*e[0].dims.length===e[1].dims[0];if(4===e.length&&(t=2*e[3].dims[0]===e[1].dims[0]),!t)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},getPadConstant2=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
            k = i32(${e.indicesGet("indices",i)}) - ${getElementAt("uniforms.pads",i,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${getElementAt("uniforms.x_shape",i,t)})) {
              break;
            }
            offset += k * i32(${getElementAt("uniforms.x_strides",i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},getPadReflect2=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${getElementAt("uniforms.pads",i,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${getElementAt("uniforms.x_shape",i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${getElementAt("uniforms.x_shape",i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${getElementAt("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},getPadEdge2=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${getElementAt("uniforms.pads",i,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${getElementAt("uniforms.x_shape",i,t)})) {
                  k = i32(${getElementAt("uniforms.x_shape",i,t)}) - 1;
                }
                offset += k * i32(${getElementAt("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},getPadWrap=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${getElementAt("uniforms.pads",i,r)};
                if (k < 0)  {
                  k += i32(${getElementAt("uniforms.x_shape",i,t)}]);
                }
                if (k >= i32(${getElementAt("uniforms.x_shape",i,t)})) {
                  k -= i32(${getElementAt("uniforms.x_shape",i,t)});
                }
                offset += k * i32(${getElementAt("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},getPadSnippet=(e,t,r)=>{switch(r.mode){case 0:return getPadConstant2(e,t,r.pads.length);case 1:return getPadReflect2(e,t,r.pads.length);case 2:return getPadEdge2(e,t,r.pads.length);case 3:return getPadWrap(e,t,r.pads.length);default:throw Error("Invalid mode")}},createPadProgramInfo2=(e,t)=>{let r=ShapeUtil2.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,i=[{type:12,data:ShapeUtil2.size(r)},{type:6,data:t.pads}],o=e.length>=3&&e[2].data;0===t.mode&&i.push({type:o?e[2].dataType:1,data:t.value}),i.push(...createTensorShapeVariables(e[0].dims,r));let s=["rank"],a=i=>{let s=outputVariable("output",e[0].dataType,r.length),a=inputVariable("x",e[0].dataType,n.length),u=a.type.value,l=getPadSnippet(s,n.length,t),d=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return 0===t.mode&&d.push({name:"constant_value",type:o?u:"f32"}),`
            ${i.registerUniforms(d).declareVariables(a,s)}
            ${i.mainStart()}
            ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${s.offsetToIndices("global_idx")};

            var value = ${u}(0);
            ${l}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${o}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(ShapeUtil2.size(r)/64)},programUniforms:i}),getShaderSource:a}},createPadAttributesFromInputs=(e,t)=>{if(!(e.length>1))return t;{let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?10===e[2].dataType?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,o=new Int32Array(2*i).fill(0);if(e.length>=4){let t=e[3].getBigInt64Array();for(let e=0;e<t.length;e++)o[Number(t[e])]=Number(r[e]),o[Number(t[e])+i]=Number(r[e+t.length])}else r.forEach((e,t)=>o[Number(t)]=Number(e));let s=[];return o.forEach(e=>s.push(e)),{mode:t.mode,value:n,pads:s}}},pad=(e,t)=>{validateInputs49(e.inputs);let r=createPadAttributesFromInputs(e.inputs,t);e.compute(createPadProgramInfo2(e.inputs,r),{inputs:[0]})}}}),init_pool2=__esm({"web/lib/wasm/jsep/webgpu/ops/pool.ts"(){"use strict";init_esm(),init_wasm_common(),init_util2(),init_common(),validateInputs50=e=>{if(env2.webgpu.validateInputContent&&(!e||1!==e.length))throw Error("Pool ops requires 1 input.")},getAdjustedPoolAttributesAndOutputShape2=(e,t,r)=>{let n="NHWC"===t.format,i=e.dims.slice();n&&i.splice(1,0,i.pop());let o=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),a=t.strides.slice(),u=o?t.dilations.slice():[],l=t.pads.slice();PoolConvUtil2.adjustPoolAttributes(r,i,s,a,u,l);let d=PoolConvUtil2.computePoolOutputShape(r,i,a,u,s,l,t.autoPad),p=Object.assign({},t);o?Object.assign(p,{kernelShape:s,strides:a,pads:l,dilations:u,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:s,strides:a,pads:l,cacheKey:t.cacheKey});let c=d.slice();return c.push(c.splice(1,1)[0]),[p,n?c:d]},getUniformAndPadInfo=(e,t)=>{let r="NHWC"===t.format,n=[{type:12,data:ShapeUtil2.size(e)},{type:12,data:ShapeUtil2.size(t.kernelShape)}],i=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let e=t.kernelShape[t.kernelShape.length-1],r=t.strides[t.strides.length-1],o=t.pads[t.pads.length/2-1],s=t.pads[t.pads.length-1],a=!!(o+s);n.push({type:12,data:e},{type:12,data:r},{type:12,data:o},{type:12,data:s}),i.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let u=!1;if(2===t.kernelShape.length){let e=t.kernelShape[t.kernelShape.length-2],r=t.strides[t.strides.length-2],o=t.pads[t.pads.length/2-2],s=t.pads[t.pads.length-2];u=!!(o+s),n.push({type:12,data:e},{type:12,data:r},{type:12,data:o},{type:12,data:s}),i.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,i,!0,a,u]}{if(r)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let e=ShapeUtil2.computeStrides(t.kernelShape);return n.push({type:12,data:e},{type:12,data:t.pads},{type:12,data:t.strides}),i.push({name:"kernelStrides",type:"u32",length:e.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length}),[n,i,!!t.pads.reduce((e,t)=>e+t),!1,!1]}},generatePoolingCode2=(e,t,r,n,i,o,s,a,u,l,d,p)=>{let c="NHWC"===i.format,h=t.type.value,f=outputVariable("output",t.type.tensor,n);if(i.kernelShape.length<=2){let n="",l="",m="",g=r-(c?2:1);if(n=d?`
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

              var value = ${h}(${a});
              var pad = 0;
              ${l}
              ${n}
              ${m}
              ${s}

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

              var value = ${h}(${a});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${n-1}u; j++) {
                  offsets[j] = offset / ${getElementAt("uniforms.kernelStrides","j",n)};
                  offset -= offsets[j] * ${getElementAt("uniforms.kernelStrides","j",n)};
                }
                offsets[${n-1}] = offset;

                isPad = false;
                for (var j = ${r-n}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${getElementAt("uniforms.strides",`j - ${r-n}u`,n)}
                    + offsets[j - ${r-n}u] - ${getElementAt("uniforms.pads","j - 2u",d)};
                  ${p}
              }
              ${s}

              output[global_idx] = value;
            }`}},createShaderKeyFromAttributes=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,createAveragePoolShaderKeyFromAttributes=e=>`${createShaderKeyFromAttributes(e)};${e.countIncludePad}`,createMaxPoolShaderKeyFromAttributes=e=>`${createShaderKeyFromAttributes(e)};${e.storageOrder};${e.dilations}`,parsePoolCommonAttributes=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),createAveragePoolProgramInfo2=(e,t,r,n)=>{let[i,o]=getAdjustedPoolAttributesAndOutputShape2(t,n,r),s=inputVariable("x",t.dataType,t.dims.length),a=s.type.value,u="value += x_val;",l="";i.countIncludePad?l+=`value /= ${a}(uniforms.kernelSize);`:l+=`value /= ${a}(i32(uniforms.kernelSize) - pad);`;let[d,p,c,h,f]=getUniformAndPadInfo(o,i);d.push(...createTensorShapeVariables(t.dims,o));let m=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${c};${h};${f}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(ShapeUtil2.size(o)/64)},programUniforms:d}),getShaderSource:e=>generatePoolingCode2(e,s,t.dims.length,o.length,i,u,l,0,p,c,h,f)}},parseAveragePoolAttributes2=e=>{let t=0!==e.count_include_pad,r=parsePoolCommonAttributes(e);if(0!==r.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:createAveragePoolShaderKeyFromAttributes(n)}},averagePool2=(e,t)=>{validateInputs50(e.inputs),e.compute(createAveragePoolProgramInfo2("AveragePool",e.inputs[0],!1,t))},globalPoolAttributes={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},parseGlobalAveragePoolAttributes2=e=>{let t=e.format;return{format:t,...globalPoolAttributes,cacheKey:t}},globalAveragePool2=(e,t)=>{validateInputs50(e.inputs),e.compute(createAveragePoolProgramInfo2("GlobalAveragePool",e.inputs[0],!0,t))},createMaxPoolProgramInfo2=(e,t,r,n)=>{let[i,o]=getAdjustedPoolAttributesAndOutputShape2(t,n,r),s=`
      value = max(x_val, value);
    `,a="",u=inputVariable("x",t.dataType,t.dims.length),l=["rank"],[d,p,c,h,f]=getUniformAndPadInfo(o,i);return d.push(...createTensorShapeVariables(t.dims,o)),{name:e,shaderCache:{hint:`${n.cacheKey};${c};${h};${f}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(ShapeUtil2.size(o)/64)},programUniforms:d}),getShaderSource:e=>generatePoolingCode2(e,u,t.dims.length,o.length,i,s,a,10===t.dataType?-65504:-1e5,p,c,h,f)}},maxPool2=(e,t)=>{validateInputs50(e.inputs),e.compute(createMaxPoolProgramInfo2("MaxPool",e.inputs[0],!1,t))},parseMaxPoolAttributes2=e=>{let t=e.storage_order,r=e.dilations,n=parsePoolCommonAttributes(e);if(0!==t)throw Error("column major storage order is not yet supported for MaxPool");if(0!==n.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let i={storageOrder:t,dilations:r,...n,cacheKey:""};return{...i,cacheKey:createMaxPoolShaderKeyFromAttributes(i)}},parseGlobalMaxPoolAttributes=e=>{let t=e.format;return{format:t,...globalPoolAttributes,cacheKey:t}},globalMaxPool2=(e,t)=>{validateInputs50(e.inputs),e.compute(createMaxPoolProgramInfo2("GlobalMaxPool",e.inputs[0],!0,t))}}}),init_quantize_linear=__esm({"web/lib/wasm/jsep/webgpu/ops/quantize-linear.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs51=(e,t)=>{if(e.length<2||e.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===e.length&&e[1].dims===e[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===e.length&&e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(6===e[0].dataType&&e.length>2)throw Error("In the case of dequantizing int32 there is no zero point.");if(0!==e[1].dims.length&&1!==e[1].dims.length&&e[1].dims.length!==e[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((t,r)=>t===e[2].dims[r]).reduce((e,t)=>e&&t,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(0===e[1].dims.length||1===e[1].dims.length&&1===e[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((r,n)=>n===t.axis||r===e[0].dims[n]).reduce((e,t)=>e&&t,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},createDequantizeLinearProgramInfo=(e,t)=>{let r=ShapeUtil2.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,i=3===n,o=e[0].dims,s=e[1].dataType,a=ShapeUtil2.size(o),u=3===n||2===n,l=u?[Math.ceil(ShapeUtil2.size(e[0].dims)/4)]:e[0].dims,d=e[1].dims,p=e.length>2?e[2]:void 0,c=p?u?[Math.ceil(ShapeUtil2.size(p.dims)/4)]:p.dims:void 0,h=0===d.length||1===d.length&&1===d[0],f=!1===h&&1===d.length,m=getMaxComponents(a),g=h&&(!u||4===m),b=g?m:1,y=g&&!u?m:1,_=inputVariable("input",u?12:n,l.length,y),x=inputVariable("scale",s,d.length),v=p?inputVariable("zero_point",u?12:n,c.length):void 0,w=outputVariable("output",s,o.length,b),$=[_,x];v&&$.push(v);let T=[l,d];p&&T.push(c);let I=[{type:12,data:a/b},{type:12,data:r},{type:12,data:t.blockSize},...createTensorShapeVariables(...T,o)],O=e=>{let t=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${e.registerUniforms(t).declareVariables(...$,w)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${w.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${_.getByOffset("global_idx / 4")};
            let x_vec = ${i?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===b?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${_.getByOffset("global_idx")};`};

          // Set scale input
          ${h?`let scale_value= ${x.getByOffset("0")}`:f?`
            let scale_index = ${w.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${x.getByOffset("scale_index")};`:`
            var scale_indices: ${x.type.indices} = output_indices;
            let index = ${x.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${x.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${x.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${(()=>{if(!v)return`let zero_point_value = ${u?i?"i32":"u32":_.type.value}(0);`;if(h)if(u)return`
                let zero_point_input = ${v.getByOffset("0")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`;else return`let zero_point_value = ${v.getByOffset("0")}`;if(f)if(u)return`
                let zero_point_index = ${w.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${v.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`;else return`
                let zero_point_index = ${w.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${v.getByOffset("zero_point_index")};`;if(u)return`
                let zero_point_offset = ${x.indicesToOffset("scale_indices")};
                let zero_point_input = ${v.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`;return`let zero_point_value = ${v.getByIndices("scale_indices")};`})()};
      // Compute and write output
      ${w.setByOffset("global_idx",`${w.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:v?["rank","rank","rank"]:["rank","rank"]},getShaderSource:O,getRunData:()=>({outputs:[{dims:o,dataType:s}],dispatchGroup:{x:Math.ceil(a/b/64),y:1,z:1},programUniforms:I})}},dequantizeLinear=(e,t)=>{validateInputs51(e.inputs,t),e.compute(createDequantizeLinearProgramInfo(e.inputs,t))},parseDequantizeLinearAttributes=e=>createAttributeWithCacheKey2({axis:e.axis,blockSize:e.blockSize})}}),init_range=__esm({"web/lib/wasm/jsep/webgpu/ops/range.ts"(){"use strict";init_esm(),init_wasm_common(),init_common(),validateInputsContent=(e,t,r)=>{let n=e===t,i=e<t&&r<0,o=e>t&&r>0;if(n||i||o)throw Error("Range these inputs' contents are invalid.")},createRangeProgramInfo=(e,t,r,n)=>{let i=Math.abs(Math.ceil((t-e)/r)),o=[i],s=i,a=[{type:12,data:s},{type:n,data:e},{type:n,data:r},...createTensorShapeVariables(o)],u=e=>{let t=outputVariable("output",n,o.length),r=t.type.value,i=[{name:"outputSize",type:"u32"},{name:"start",type:r},{name:"delta",type:r}];return`
        ${e.registerUniforms(i).declareVariables(t)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${r}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a})}},range=e=>{let t=0,r=0,n=0;6===e.inputs[0].dataType?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):1===e.inputs[0].dataType&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),env2.webgpu.validateInputContent&&validateInputsContent(t,r,n),e.compute(createRangeProgramInfo(t,r,n,e.inputs[0].dataType),{inputs:[]})}}}),init_scatter_nd=__esm({"web/lib/wasm/jsep/webgpu/ops/scatter-nd.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),atomicReductionSnippet=(e,t,r,n)=>{if("none"!==e&&"i32"!==n&&"u32"!==n&&"f32"!==n)throw Error(`Input ${n} is not supported with reduction ${e}.`);let i=`{
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
              }`;switch(e){case"none":return`${t}=${r};`;case"add":if("i32"===n||"u32"===n)return`atomicAdd(&${t}, bitcast<${n}>(${r}));`;return`
              ${i}bitcast<${n}>(oldValue) + (${r})${o}`;case"max":if("i32"===n||"u32"===n)return`atomicMax(&${t}, bitcast<${n}>(${r}));`;return`
                ${i}max(bitcast<f32>(oldValue), (${r}))${o}`;case"min":if("i32"===n||"u32"===n)return`atomicMin(&${t}, bitcast<${n}>(${r}));`;return`${i}min(bitcast<${n}>(oldValue), (${r}))${o}`;case"mul":return`${i}(bitcast<${n}>(oldValue) * (${r}))${o}`;default:throw Error(`Reduction ${e} is not supported.`)}},createScatterNDProgramInfo=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r,o=1,s=Math.ceil(ShapeUtil2.sizeToDimension(n,n.length-1)/o),a=n[n.length-1],u=ShapeUtil2.sizeFromDimension(r,a),l=[{type:12,data:s},{type:12,data:a},{type:12,data:u},...createTensorShapeVariables(e[1].dims,e[2].dims,i)],d=r=>{let n=inputVariable("indices",e[1].dataType,e[1].dims.length),s=inputVariable("updates",e[2].dataType,e[2].dims.length,o),a="none"!==t.reduction&&""!==t.reduction?atomicOutputVariable("output",e[0].dataType,i.length):outputVariable("output",e[0].dataType,i.length,o);return`
      ${r.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(n,s,a)}
      ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
    ${atomicReductionSnippet(t.reduction,"output[data_offset + i]","value",a.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:d}},parseScatterNDAttributes=e=>createAttributeWithCacheKey2({reduction:e.reduction}),scatterND=(e,t)=>{e.compute(createScatterNDProgramInfo(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}}),init_resize=__esm({"web/lib/wasm/jsep/webgpu/ops/resize.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateScales=(e,t)=>{if(e.every(e=>e>0||(()=>{throw Error("Resize requires scales input values to be positive")})),e.length>0){if("linear"===t.mode){if(2!==e.length&&3!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3])&&(5!==e.length||1!==e[0]||1!==e[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===t.mode&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},updateScales=(e,t,r)=>{t.every(e=>e>=0&&e<r||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")}));let n=Array(r).fill(1);return t.forEach((t,r)=>n[t]=e[r]),n},validateInputs52=(e,t,r,n,i,o)=>{let[s,a,u]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(e=>o.push(e));else if("tf_crop_and_resize"===t.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(a>0&&e.length>a&&1===e[a].dims.length&&e[a].dims[0]>0){if(e[a].getFloat32Array().forEach(e=>n.push(e)),0!==n.length&&n.length!==l&&r>=18&&n.length!==t.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");validateScales(n,t),t.axes.length>0&&updateScales(n,t.axes,l).forEach((e,t)=>n[t]=e)}if(u>0&&e.length>u&&1===e[u].dims.length&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(e=>i.push(Number(e))),0!==i.length&&i.length!==l&&r>=18&&i.length!==t.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(0!==n.length&&n.length!==t.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==i.length&&i.length!==t.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(void 0!==n&&void 0!==i&&n.length>0&&i.length>l)throw Error("Resize requires only of scales or sizes to be specified")},getSafeIntegerDivision=(e,t,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,getOriginalCoordinateFromResizedCoordinate=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${getSafeIntegerDivision("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${getSafeIntegerDivision("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",getNearestPixelFromOriginal=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${e} is not supported`)}})()+"}",updateRoI=(e,t,r)=>{let n=Array(r).fill(0).concat(Array(r).fill(1)),i=0===e.length?n:e.slice();return t.length>0?(t.forEach((e,o)=>{n[e]=i[o],n[o+r]=i[t.length+o]}),n):i},initOutputShape=(e,t,r,n)=>{let i=[];if(r.length>0)if(n.length>0){if(e.forEach(e=>i.push(e)),Math.max(...n)>e.length)throw Error("axes is out of bound");n.forEach((e,t)=>i[e]=r[t])}else r.forEach(e=>i.push(e));else if(0===t.length)throw Error("Resize requires either scales or sizes.");else i=e.map((e,r)=>Math.round(e*t[r]));return i},adjustOutputShape=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(e=>t[e]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(e=>t[e]),5e-324):Math.max(...t,5e-324);default:throw Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return r.axes.length>0?(r.axes.forEach(e=>t[e]=n),r.axes.forEach(r=>i[r]=Math.round(e[r]*t[r]))):(t.fill(n,0,t.length),i.forEach((e,r)=>i[r]=Math.round(e*t[r]))),i},calculateOriginalIndicesFromOutputIndices=(e,t,r,n,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${getElementAt("uniforms.scales","i",n)};
        var roi_low = ${getElementAt("uniforms.roi","i",i)};
        var roi_hi = ${getElementAt("uniforms.roi",`i + ${t.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${getElementAt("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${getElementAt("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,calculateInputIndicesFromOutputIndices=(e,t,r,n,i,o,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${getElementAt("uniforms.scales","i",i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${getElementAt("uniforms.roi","i",o)};
          var roi_hi = ${getElementAt("uniforms.roi",`i + ${r.length}`,o)};
          var input_shape_i = ${getElementAt("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${getElementAt("uniforms.output_shape","i",n.length)};
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
    }`,checkInputIndices=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${getElementAt("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,setChannelAndBatchIndices=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",bilinearInterpolation=(e,t,r,n,i)=>{let o=!0,[s,a,u,l]=2===r.length?[-1,0,1,-1]:o?[0,2,3,1]:[0,1,2,3],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${setChannelAndBatchIndices(e,l,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${a}];
      var col:${d} = originalIndices[${u}];
      ${n?`if (row < 0 || row > (${r[a]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${i};
      }`:""};
      row = max(0, min(row, ${r[a]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
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
    }`},bicubicInterpolation=(e,t,r,n,i,o,s,a,u,l)=>{let d=2===r.length,p=!0,[c,h]=d?[0,1]:p?[2,3]:[1,2],f=e.type.value,m=s=>{let d=s===c?"row":"col";return`
      fn ${d}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${f} {
        var output_index = ${t.indicesGet("output_indices",s)};
        var originalIdx: ${f} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[s]},
        ${n[s]}, ${r[s]}, ${o[s]}, ${o[s]} + ${r.length});
        var fractOriginalIdx: ${f} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${a} && (originalIdx < 0 || originalIdx > (${r[s]} - 1))) {
          return ${u};
        }
        var data: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${d}: ${f} = originalIdx + ${f}(i);
          if (${d} < 0 || ${d} >= ${r[s]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:a?`return ${u};`:`${d} = max(0, min(${d}, ${r[s]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",s,`u32(${d})`)};
          data[i + 1] = ${s===c?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${m(c)};
    ${m(h)};
  fn getCubicInterpolationCoefs(s: ${f}) -> array<${f}, 4> {
    var absS = abs(s);
    var coeffs: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${f} = 1.0 - absS;
    var twoMinusAbsS: ${f} = 2.0 - absS;
    var onePlusAbsS: ${f} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${f}, 4>, coefs: array<${f}, 4>) -> ${f} {
    var coefsSum: ${f} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${f} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},trilinearInterpolation=(e,t,r,n,i)=>{let o=!0,[s,a,u,l,d]=3===r.length?[-1,0,1,2,-1]:o?[0,2,3,4,1]:[0,1,2,3,4],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${setChannelAndBatchIndices(e,d,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${a}];
      var height:${p} = originalIndices[${u}];
      var width:${p} = originalIndices[${l}];
      ${n?`if (depth < 0 || depth > (${r[a]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${i};
        }`:""};

    depth = max(0, min(depth, ${r[a]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

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
    }`},createResizeProgramInfo=(e,t,r,n,i,o)=>{let s=e.dims,a=updateRoI(o,t.axes,s.length),u=initOutputShape(s,n,i,t.axes),l=n.slice();0===n.length&&(l=s.map((e,t)=>0===e?1:u[t]/e),"stretch"!==t.keepAspectRatioPolicy&&(u=adjustOutputShape(s,l,t)));let d=outputVariable("output",e.dataType,u.length),p=inputVariable("input",e.dataType,s.length),c=ShapeUtil2.size(u),h=s.length===u.length&&s.every((e,t)=>e===u[t]),f="tf_crop_and_resize"===t.coordinateTransformMode,m=t.extrapolationValue,g=p.type.value,b=e=>`
      ${h?"":`
      ${getOriginalCoordinateFromResizedCoordinate(t.coordinateTransformMode,g)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${checkInputIndices(p,s)};
              ${getNearestPixelFromOriginal(t.nearestMode,r,g)};
              ${calculateInputIndicesFromOutputIndices(p,d,s,u,l.length,a.length,f)};
              `;case"linear":return`
              ${calculateOriginalIndicesFromOutputIndices(d,s,u,l.length,a.length)};
              ${(()=>{if(2===s.length||4===s.length)return`${bilinearInterpolation(p,d,s,f,m)}`;if(3===s.length||5===s.length)return`${trilinearInterpolation(p,d,s,f,m)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===s.length||4===s.length)return`${bicubicInterpolation(p,d,s,u,l,a,t.cubicCoeffA,f,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${e.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",a.length).declareVariables(p,d)}
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
                }`;case"linear":return`output[global_idx] = ${2===s.length||4===s.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${l.length>0?"cubic"===t.mode?l:l.length:""}|${i.length>0?i:""}|${a.length>0?a:""}|${h}|${"nearest"===t.mode?s.length:s}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},{type:1,data:l},{type:1,data:a},...createTensorShapeVariables(s,u)]})}},getOpsetVersionFromCustomDataBuffer=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},resize2=(e,t)=>{let r=[],n=[],i=[],o=getOpsetVersionFromCustomDataBuffer(e);if(0!==t.antialias)throw Error("Only default value (0) for Antialias attribute is supported");validateInputs52(e.inputs,t,o,r,n,i),e.compute(createResizeProgramInfo(e.inputs[0],t,o,r,n,i),{inputs:[0]})},parseResizeAttributes=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,i=e.cubicCoeffA,o=0!==e.excludeOutside,s=e.extrapolationValue,a=e.keepAspectRatioPolicy,u=e.mode,l=""===e.nearestMode?"simple":e.nearestMode;return createAttributeWithCacheKey2({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:i,excludeOutside:o,extrapolationValue:s,keepAspectRatioPolicy:a,mode:u,nearestMode:l})}}}),init_skip_layer_norm=__esm({"web/lib/wasm/jsep/webgpu/ops/skip-layer-norm.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),validateInputs53=e=>{if(!e||e.length<3)throw Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw Error("All inputs must have the same data type");if(3!==t.dims.length&&2!==t.dims.length)throw Error("Input must be 2D or 3D");if(3!==r.dims.length&&2!==r.dims.length)throw Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],o=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==i)throw Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==o)throw Error("Skip must have the same sequence length as input");if(1!==n.dims.length)throw Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==i)throw Error("Gamma must have the same hidden size as input");if(e.length>3){let t=e[3];if(1!==t.dims.length)throw Error("Beta must be 1D");if(t.dims[t.dims.length-1]!==i)throw Error("Beta must have the same hidden size as input")}if(e.length>4){let t=e[4];if(1!==t.dims.length)throw Error("Bias must be 1D");if(t.dims[t.dims.length-1]!==i)throw Error("Bias must have the same hidden size as input")}},createSkipLayerNormProgramInfo=(e,t,r,n)=>{let i=t.simplified,o=e[0].dims,s=ShapeUtil2.size(o),a=o,u=s,l=o.slice(-1)[0],d=n?o.slice(0,-1).concat(1):[],p=!i&&e.length>3,c=e.length>4,h=n&&r>1,f=n&&r>2,m=r>3,g=64,b=getMaxComponents(l),y=[{type:12,data:u},{type:12,data:b},{type:12,data:l},{type:1,data:t.epsilon}],_=t=>{let r=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],n=[inputVariable("x",e[0].dataType,e[0].dims,b),inputVariable("skip",e[1].dataType,e[1].dims,b),inputVariable("gamma",e[2].dataType,e[2].dims,b)];p&&n.push(inputVariable("beta",e[3].dataType,e[3].dims,b)),c&&n.push(inputVariable("bias",e[4].dataType,e[4].dims,b)),n.push(outputVariable("output",e[0].dataType,a,b)),h&&n.push(outputVariable("mean_output",1,d)),f&&n.push(outputVariable("inv_std_output",1,d)),m&&n.push(outputVariable("input_skip_bias_sum",e[0].dataType,a,b));let o=tensorTypeToWsglStorageType(e[0].dataType),s=tensorTypeToWsglStorageType(1,b);return`

      ${t.registerUniforms(r).declareVariables(...n)}
      var<workgroup> sum_shared : array<${s}, ${g}>;
      var<workgroup> sum_squared_shared : array<${s}, ${g}>;

      ${t.mainStart([g,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${g};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${g};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${g-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${c?"bias[offset1d + i]":o+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${m?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${castToF32(o,b,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${g};
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
        let mean = ${sumVector("sum",b)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${sumVector("square_sum",b)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${h?"mean_output[global_idx] = mean;":""}
        ${f?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${o}(mean)`}) *
            ${o}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},x=[{dims:a,dataType:e[0].dataType}];return r>1&&x.push({dims:d,dataType:1}),r>2&&x.push({dims:d,dataType:1}),r>3&&x.push({dims:o,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${b};${h};${f};${m}`,inputDependencies:e.map((e,t)=>"type")},getShaderSource:_,getRunData:()=>({outputs:x,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:y})}},skipLayerNorm=(e,t)=>{let r=!1;validateInputs53(e.inputs);let n=[0];e.outputCount>1&&n.push(r?1:-3),e.outputCount>2&&n.push(r?2:-3),e.outputCount>3&&n.push(3),e.compute(createSkipLayerNormProgramInfo(e.inputs,t,e.outputCount,r),{outputs:n})}}}),init_slice2=__esm({"web/lib/wasm/jsep/webgpu/ops/slice.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_common(),validateInputs54=(e,t)=>{if(!e||e.length<1)throw Error("too few inputs");if(0!==t.axes.length){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw Error("starts and ends must have the same length");e.slice(1).forEach((t,r)=>{if(6!==e[r+1].dataType&&7!==e[r+1].dataType)throw Error(`Input ${r} must be an array of int32 or int64`)})},readInput=(e,t)=>{let r=[];if(e.length>t)if(7===e[t].dataType)e[t].getBigInt64Array().forEach(e=>r.push(Number(e)));else if(6===e[t].dataType)e[t].getInt32Array().forEach(e=>r.push(Number(e)));else throw Error(`Input ${t} must be an array of int32 or int64`);return r},createSliceAttributesFromInputs=(e,t)=>{if(!(e.length>1))return t;{let t=readInput(e,1),r=readInput(e,2),n=readInput(e,3);return 0===n.length&&(n=[...Array(e[0].dims.length).keys()]),createAttributeWithCacheKey2({starts:t,ends:r,axes:n})}},fixStartEndValues=(e,t,r,n,i)=>{let o=e;return(e<0&&(o+=r[n[t]]),i[t]<0)?Math.max(0,Math.min(o,r[n[t]]-1)):Math.max(0,Math.min(o,r[n[t]]))},calculateInputIndicesImpl=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${getElementAt("uniforms.input_shape","i",r.length)};
            let steps_i = ${getElementAt("uniforms.steps","i",r.length)};
            let signs_i = ${getElementAt("uniforms.signs","i",r.length)};
            let starts_i = ${getElementAt("uniforms.starts","i",r.length)};
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
      }`,createSliceProgramInfo2=(e,t)=>{let r=e[0].dims,n=ShapeUtil2.size(r),i=t.axes.length>0?ShapeUtil2.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],o=readInput(e,4);o.forEach(e=>0!==e||(()=>{throw Error("step cannot be 0")})),0===o.length&&(o=Array(i.length).fill(1));let s=t.starts.map((e,t)=>fixStartEndValues(e,t,r,i,o)),a=t.ends.map((e,t)=>fixStartEndValues(e,t,r,i,o));if(i.length!==s.length||i.length!==a.length)throw Error("start, ends and axes should have the same number of elements");if(i.length!==r.length)for(let e=0;e<r.length;++e)i.includes(e)||(s.splice(e,0,0),a.splice(e,0,r[e]),o.splice(e,0,1));let u=o.map(e=>Math.sign(e));o.forEach((e,t,r)=>{if(e<0){let n=(a[t]-s[t])/e,i=s[t],u=i+n*o[t];s[t]=u,a[t]=i,r[t]=-e}});let l=r.slice(0);i.forEach((e,t)=>{l[e]=Math.ceil((a[e]-s[e])/o[e])});let d={dims:l,dataType:e[0].dataType},p=outputVariable("output",e[0].dataType,l.length),c=inputVariable("input",e[0].dataType,e[0].dims.length),h=ShapeUtil2.size(l),f=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:o.length}],m=[{type:12,data:h},{type:12,data:s},{type:6,data:u},{type:12,data:o},...createTensorShapeVariables(e[0].dims,l)],g=e=>`
      ${e.registerUniforms(f).declareVariables(c,p)}
        ${calculateInputIndicesImpl(c,p,r)}
        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",c.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${o.length}`,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:m})}},slice2=(e,t)=>{validateInputs54(e.inputs,t);let r=createSliceAttributesFromInputs(e.inputs,t);e.compute(createSliceProgramInfo2(e.inputs,r),{inputs:[0]})},parseSliceAttributes2=e=>{let t=e.starts,r=e.ends,n=e.axes;return createAttributeWithCacheKey2({starts:t,ends:r,axes:n})}}}),init_softmax2=__esm({"web/lib/wasm/jsep/webgpu/ops/softmax.ts"(){"use strict";init_wasm_common(),init_util2(),init_attribute_with_cache_key2(),init_transpose2(),init_common(),validateInputs55=e=>{if(!e||1!==e.length)throw Error("Softmax op requires 1 input.")},createSoftmaxProgramInfo=(e,t)=>{let r,n=e.inputs[0],i=n.dims,o=ShapeUtil2.size(i),s=i.length,a=ShapeUtil2.normalizeAxis(t.axis,s),u=a<i.length-1,l=[];u?((l=Array.from({length:s},(e,t)=>t))[a]=s-1,l[s-1]=a,r=e.compute(createTransposeProgramInfo2(n,l),{inputs:[n],outputs:[-1]})[0]):r=n;let d=r.dims,p=d[s-1],c=o/p,h=getMaxComponents(p),f=p/h,m=64;1===c&&(m=256);let g=(e,t)=>4===t?`max(max(${e}.x, ${e}.y), max(${e}.z, ${e}.w))`:2===t?`max(${e}.x, ${e}.y)`:3===t?`max(max(${e}.x, ${e}.y), ${e}.z)`:e,b=inputVariable("x",r.dataType,r.dims,h),y=outputVariable("result",r.dataType,r.dims,h),_=b.type.value,x="f32"===tensorTypeToWsglStorageType(r.dataType)?`var threadMax = ${_}(-3.4028234663852886e+38f);`:`var threadMax = ${_}(-65504.0h);`,v=e=>`
      var<workgroup> rowMaxShared : ${_};
      var<workgroup> rowSumShared : ${_};
      var<workgroup> threadShared : array<${_}, ${m}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${_} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${_}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${e.registerUniform("packedCols","i32").declareVariables(b,y)}
      ${e.mainStart(m)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${m};
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
          rowMaxShared = ${_}(${g("threadShared[0]",h)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${_}(0.0);
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
          rowSumShared = ${_}(${sumVector("threadShared[0]",h)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${_}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,w=e.compute({name:"Softmax",shaderCache:{hint:`${h};${m}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:d,dataType:r.dataType}],dispatchGroup:{x:c},programUniforms:[{type:6,data:f}]}),getShaderSource:v},{inputs:[r],outputs:[u?-1:0]})[0];u&&e.compute(createTransposeProgramInfo2(w,l),{inputs:[w]})},softmax2=(e,t)=>{validateInputs55(e.inputs),createSoftmaxProgramInfo(e,t)},parseSoftmaxAttributes2=e=>createAttributeWithCacheKey2({axis:e.axis})}}),init_tile2=__esm({"web/lib/wasm/jsep/webgpu/ops/tile.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),getRepeats=e=>Array.from(e.getBigInt64Array(),Number),validateInputs56=e=>{if(!e||2!==e.length)throw Error("Tile requires 2 inputs.");if(1!==e[0].dataType&&10!==e[0].dataType&&6!==e[0].dataType&&12!==e[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==e[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==e[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(getRepeats(e[1]).length!==e[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},getOutputShape3=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},createTileProgramInfo2=(e,t)=>{let r=e[0].dims,n=null==t?getRepeats(e[1]):t,i=getOutputShape3(r,n),o=ShapeUtil2.size(i),s=e[0].dataType,a=inputVariable("input",s,r.length),u=outputVariable("output",s,i.length);return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},...createTensorShapeVariables(e[0].dims,i)]}),getShaderSource:e=>`
      const inputShape = ${a.indices(...r)};
      ${e.registerUniform("output_size","u32").declareVariables(a,u)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${a.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${a.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${a.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",a.getByIndices("input_indices"))}
    }`}},tile2=e=>{validateInputs56(e.inputs),e.compute(createTileProgramInfo2(e.inputs),{inputs:[0]})}}}),init_where=__esm({"web/lib/wasm/jsep/webgpu/ops/where.ts"(){"use strict";init_wasm_common(),init_util2(),init_common(),createWhereOpProgramShader=(e,t,r,n,i)=>{let o,s=outputVariable("output_data",i,r.length,4),a=inputVariable("a_data",t[1].dataType,t[1].dims.length,4),u=inputVariable("b_data",t[2].dataType,t[2].dims.length,4),l=inputVariable("c_data",t[0].dataType,t[0].dims.length,4),d=(e,t,r)=>`select(${t}, ${e}, ${r})`;if(n){let e=(e,t,r="")=>{let n=`a_data[index_a${t}][component_a${t}]`,i=`b_data[index_b${t}][component_b${t}]`,o=`bool(c_data[index_c${t}] & (0xffu << (component_c${t} * 8)))`;return`
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
            ${e}[${t}] = ${r}(${d(n,i,o)});
          `};o=9===i?`
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
          `}else o=s.setByOffset("global_idx",d(a.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,a,u,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${o}
      }`},createWhereOpProgramInfo=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,i=e[1].dataType,o=!(ShapeUtil2.areEqual(t,r)&&ShapeUtil2.areEqual(r,n)),s=t,a=ShapeUtil2.size(t);if(o){let e=BroadcastUtil2.calcShape(BroadcastUtil2.calcShape(t,r,!1),n,!1);if(!e)throw Error("Can't perform where op on the given tensors");s=e,a=ShapeUtil2.size(s)}let u=Math.ceil(a/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:t=>createWhereOpProgramShader(t,e,s,o,i),getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:u},...createTensorShapeVariables(n,t,r,s)]})}},where=e=>{e.compute(createWhereOpProgramInfo(e.inputs))}}}),init_op_resolve_rules2=__esm({"web/lib/wasm/jsep/webgpu/op-resolve-rules.ts"(){"use strict";init_argminmax(),init_attention(),init_batch_norm(),init_bias_add(),init_bias_split_gelu(),init_binary_op2(),init_concat2(),init_conv2(),init_conv_transpose2(),init_cumsum(),init_depth_to_space2(),init_einsum(),init_expand(),init_fast_gelu(),init_gather2(),init_gather_nd(),init_gather_block_quantized(),init_gather_elements(),init_gemm2(),init_grid_sample(),init_group_query_attention(),init_instance_norm(),init_layer_norm(),init_matmul2(),init_matmulnbits(),init_multihead_attention(),init_pad2(),init_pool2(),init_quantize_linear(),init_range(),init_scatter_nd(),init_reduce2(),init_resize(),init_rotary_embedding(),init_skip_layer_norm(),init_slice2(),init_softmax2(),init_split2(),init_tile2(),init_transpose2(),init_unary_op2(),init_where(),WEBGPU_OP_RESOLVE_RULES=new Map([["Abs",[abs2]],["Acos",[acos2]],["Acosh",[acosh]],["Add",[add3]],["ArgMax",[argMax,parseArgMinMaxAttributes]],["ArgMin",[argMin,parseArgMinMaxAttributes]],["Asin",[asin2]],["Asinh",[asinh]],["Atan",[atan2]],["Atanh",[atanh]],["Attention",[attention]],["AveragePool",[averagePool2,parseAveragePoolAttributes2]],["BatchNormalization",[batchNorm]],["BiasAdd",[biasAdd]],["BiasSplitGelu",[biasSplitGelu]],["Cast",[cast2,parseCastAttributes2]],["Ceil",[ceil2]],["Clip",[clip2]],["Concat",[concat2,parseConcatAttributes2]],["Conv",[conv2,parseConvAttributes2]],["ConvTranspose",[convTranspose2,parseConvTransposeAttributes2]],["Cos",[cos2]],["Cosh",[cosh]],["CumSum",[cumsum,parseCumSumAttributes]],["DepthToSpace",[depthToSpace2,parseDepthToSpaceAttributes2]],["DequantizeLinear",[dequantizeLinear,parseDequantizeLinearAttributes]],["Div",[div2]],["Einsum",[einsum,parseEinsumAttributes]],["Elu",[elu2,parseAlphaAttributes]],["Equal",[equal2]],["Erf",[erf]],["Exp",[exp2]],["Expand",[expand]],["FastGelu",[fastGelu2]],["Floor",[floor2]],["FusedConv",[conv2,parseConvAttributes2]],["Gather",[gather2,parseGatherAttributes2]],["GatherElements",[gatherElements,parseGatherElementsAttributes]],["GatherBlockQuantized",[gatherBlockQuantized,parseGatherBlockQuantizedAttributes]],["GatherND",[gatherND,parseGatherNDAttributes]],["Gelu",[gelu]],["Gemm",[gemm2,parseGemmAttributes2]],["GlobalAveragePool",[globalAveragePool2,parseGlobalAveragePoolAttributes2]],["GlobalMaxPool",[globalMaxPool2,parseGlobalMaxPoolAttributes]],["Greater",[greater2]],["GreaterOrEqual",[greaterOrEqual]],["GridSample",[gridSample,parseGridSampleAttributes]],["GroupQueryAttention",[groupQueryAttention]],["HardSigmoid",[hardSigmoid,parseHardSigmoidAttributes]],["InstanceNormalization",[instanceNorm]],["LayerNormalization",[layerNorm]],["LeakyRelu",[leakyRelu2,parseAlphaAttributes]],["Less",[less2]],["LessOrEqual",[lessOrEqual]],["Log",[log3]],["MatMul",[matMul2]],["MatMulNBits",[matMulNBits,parseMatMulNBitsAttributes]],["MaxPool",[maxPool2,parseMaxPoolAttributes2]],["Mul",[mul2]],["MultiHeadAttention",[multiHeadAttention,parseMultiHeadAttentionAttributes]],["Neg",[neg2]],["Not",[not3]],["Pad",[pad]],["Pow",[pow2]],["QuickGelu",[quickgelu,parseAlphaAttributes]],["Range",[range]],["Reciprocal",[reciprocal]],["ReduceMin",[reduceMin2]],["ReduceMean",[reduceMean2]],["ReduceMax",[reduceMax2]],["ReduceSum",[reduceSum2]],["ReduceProd",[reduceProd2]],["ReduceL1",[reduceL1]],["ReduceL2",[reduceL2]],["ReduceLogSum",[reduceLogSum2]],["ReduceLogSumExp",[reduceLogSumExp]],["ReduceSumSquare",[reduceSumSquare]],["Relu",[relu2]],["Resize",[resize2,parseResizeAttributes]],["RotaryEmbedding",[rotaryEmbedding]],["ScatterND",[scatterND,parseScatterNDAttributes]],["Sigmoid",[sigmoid2]],["Sin",[sin2]],["Sinh",[sinh]],["Slice",[slice2,parseSliceAttributes2]],["SkipLayerNormalization",[skipLayerNorm]],["Split",[split2,parseSplitAttributes2]],["Sqrt",[sqrt2]],["Softmax",[softmax2,parseSoftmaxAttributes2]],["Sub",[sub2]],["Tan",[tan2]],["Tanh",[tanh2]],["ThresholdedRelu",[thresholdedRelu,parseAlphaAttributes]],["Tile",[tile2]],["Transpose",[transpose2,parseTransposeAttributes2]],["Where",[where]]])}}),init_program_manager2=__esm({"web/lib/wasm/jsep/webgpu/program-manager.ts"(){"use strict";init_esm(),init_log(),init_common(),ProgramManager2=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,n,i){TRACE_FUNC_BEGIN(e.programInfo.name);let o=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let a=[];for(let e of t)a.push({binding:a.length,resource:{buffer:e.buffer}});for(let e of r)a.push({binding:a.length,resource:{buffer:e.buffer}});i&&a.push({binding:a.length,resource:i});let u=o.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:a,label:e.programInfo.name});if("capturing"===this.backend.sessionStatus){let t={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:n};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(t)}s.setPipeline(e.computePipeline),s.setBindGroup(0,u),s.dispatchWorkgroups(...n),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),TRACE_FUNC_END(e.programInfo.name)}dispose(){}build(e,t){TRACE_FUNC_BEGIN(e.name);let r=this.backend.device,n=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(e=>{r.features.has(e.feature)&&n.push(`enable ${e.extension};`)});let i=createShaderHelper(t,this.backend.device.limits),o=e.getShaderSource(i),s=`${n.join("\n")}
${i.additionalImplementations}
${o}`,a=r.createShaderModule({code:s,label:e.name});LOG_DEBUG("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let u=r.createComputePipeline({compute:{module:a,entryPoint:"main"},layout:"auto",label:e.name});return TRACE_FUNC_END(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t="number"==typeof e?e:e.x,r="number"==typeof e?1:e.y||1,n="number"==typeof e?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&r<=i&&n<=i)return[t,r,n];let o=t*r*n,s=Math.ceil(Math.sqrt(o));if(!(s>i))return[s,s,1];if((s=Math.ceil(Math.cbrt(o)))>i)throw Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}}}}),backend_webgpu_exports={};__export(backend_webgpu_exports,{WebGpuBackend:()=>WebGpuBackend});var init_backend_webgpu=__esm({"web/lib/wasm/jsep/backend-webgpu.ts"(){"use strict";init_esm(),init_wasm_common(),init_log(),init_tensor_view(),init_gpu_data_manager(),init_op_resolve_rules2(),init_program_manager2(),getProgramInputTensorInfoDependencyKey=(e,t)=>{if(t.length!==e.length)throw Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let i=e[n].dataType;switch(t[n]){case"none":r.push("");break;case"type":r.push(`${i}`);break;case"rank":{let t=e[n].dims.length;r.push(`${i};${t}`);break}case"dims":{let t=e[n].dims.join(",");r.push(`${i};${t}`);break}default:throw Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},getProgramInfoUniqueKey2=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${getProgramInputTensorInfoDependencyKey(t,e.shaderCache?.inputDependencies??Array(t.length).fill("dims"))}`},AdapterInfoImpl=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},WebGpuBackend=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],n={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},i=e=>t.features.has(e)&&r.push(e)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await t.requestDevice(n),this.adapterInfo=new AdapterInfoImpl(t.info||await t.requestAdapterInfo()),this.gpuDataManager=createGpuDataManager(this),this.programManager=new ProgramManager2(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,configureLogger(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){void 0!==this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};"at-passes"===this.queryType&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let e;this.commandEncoder&&(TRACE_FUNC_BEGIN(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),e=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let e=0;e<t.length/2;e++){let n=r[e],i=n.kernelId,o=this.kernels.get(i),s=o.kernelType,a=o.kernelName,u=n.programName,l=n.inputTensorViews,d=n.outputTensorViews,p=t[2*e],c=t[2*e+1];void 0===this.queryTimeBase&&(this.queryTimeBase=p);let h=Number(p-this.queryTimeBase),f=Number(c-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(f))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:l.map(e=>({dims:e.dims,dataType:tensorDataTypeEnumToString(e.dataType)})),outputsMetadata:d.map(e=>({dims:e.dims,dataType:tensorDataTypeEnumToString(e.dataType)})),kernelId:i,kernelType:s,kernelName:a,programName:u,startTime:h,endTime:f});else{let e="";l.forEach((t,r)=>{e+=`input[${r}]: [${t.dims}] | ${tensorDataTypeEnumToString(t.dataType)}, `});let t="";d.forEach((e,r)=>{t+=`output[${r}]: [${e.dims}] | ${tensorDataTypeEnumToString(e.dataType)}, `}),console.log(`[profiling] kernel "${i}|${s}|${a}|${u}" ${e}${t}start time: ${h} ns, execution time: ${f-h} ns`)}TRACE("GPU",`${u}::${p}::${c}`)}e.unmap(),this.pendingQueries.delete(e)}),TRACE_FUNC_END())}run(e,t,r,n,i,o){let s;TRACE_FUNC_BEGIN(e.name);let a=[];for(let e=0;e<t.length;++e){let r=t[e].data;if(0===r)continue;let n=this.gpuDataManager.get(r);if(!n)throw Error(`no GPU data for input: ${r}`);a.push(n)}let{outputs:u,dispatchGroup:l,programUniforms:d}=e.getRunData(t),p=0===r.length?u.map((e,t)=>t):r;if(p.length!==u.length)throw Error(`Output size ${p.length} must be equal to ${u.length}.`);let c=[],h=[];for(let e=0;e<u.length;++e){if(!Number.isInteger(p[e])||p[e]<-3||p[e]>=o)throw Error(`Invalid output index: ${p[e]}`);if(-3===p[e])continue;let t=-1===p[e],r=-2===p[e],s=t||r?i(u[e].dataType,u[e].dims):n(p[e],u[e].dataType,u[e].dims);if(c.push(s),0===s.data)continue;let a=this.gpuDataManager.get(s.data);if(!a)throw Error(`no GPU data for output: ${s.data}`);if(t&&this.temporaryData.push(a),r){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(a)}h.push(a)}if(a.length!==t.length||h.length!==c.length){if(0===h.length)return TRACE_FUNC_END(e.name),c;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(d){let e=0,t=[];d.forEach(r=>{let n,i,o="number"==typeof r.data?[r.data]:r.data;if(0===o.length)return;let s=10===r.type?2:4;10===r.type?(i=o.length>4?16:o.length>2?8:o.length*s,n=o.length>4?16:s*o.length):(i=o.length<=2?o.length*s:16,n=16),e=Math.ceil(e/i)*i,t.push(e);let a=10===r.type?8:4;e+=o.length>4?Math.ceil(o.length/a)*n:o.length*s});let r=new ArrayBuffer(e=16*Math.ceil(e/16));d.forEach((e,n)=>{let i=t[n],o="number"==typeof e.data?[e.data]:e.data;if(6===e.type)new Int32Array(r,i,o.length).set(o);else if(12===e.type)new Uint32Array(r,i,o.length).set(o);else if(10===e.type)new Uint16Array(r,i,o.length).set(o);else if(1===e.type)new Float32Array(r,i,o.length).set(o);else throw Error(`Unsupported uniform type: ${tensorDataTypeEnumToString(e.type)}`)});let n=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(n.buffer,0,r,0,e),this.gpuDataManager.release(n.id),s={offset:0,size:e,buffer:n.buffer}}let f=this.programManager.normalizeDispatchGroupSize(l),m=getProgramInfoUniqueKey2(e,t,1===f[1]&&1===f[2]),g=this.programManager.getArtifact(m);if(g||(g=this.programManager.build(e,f),this.programManager.setArtifact(m,g),LOG_DEBUG("info",()=>`[artifact] key: ${m}, programName: ${e.name}`)),d&&g.uniformVariablesInfo){if(d.length!==g.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${g.uniformVariablesInfo.length}, got ${d.length} in program "${g.programInfo.name}".`);for(let e=0;e<d.length;e++){let t=d[e],r=t.type,n="number"==typeof t.data?1:t.data.length,[i,o]=g.uniformVariablesInfo[e];if(r!==i||n!==o)throw Error(`Uniform variable ${e} mismatch: expect type ${i} with size ${o}, got type ${r} with size ${n} in program "${g.programInfo.name}".`)}}if(LOG_DEBUG("info",()=>`[ProgramManager] run "${e.name}" (key=${m}) with ${f[0]}x${f[1]}x${f[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let e={kernelId:this.currentKernelId,programName:g.programInfo.name,inputTensorViews:t,outputTensorViews:c};this.pendingKernels.push(e),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(g,a,h,f,s),TRACE_FUNC_END(e.name),c}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,n){let i=WEBGPU_OP_RESOLVE_RULES.get(e);if(!i)throw Error(`kernel not implemented: ${e}`);let o={kernelType:e,kernelName:n,kernelEntry:i[0],attributes:[i[1],r]};this.kernels.set(t,o)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let e of t)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let n=this.kernels.get(e);if(!n)throw Error(`kernel not created: ${e}`);let i=n.kernelType,o=n.kernelName,s=n.kernelEntry,a=n.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${i}] ${o}" is not allowed to be called recursively`);this.currentKernelId=e,a[0]&&(a[1]=a[0](a[1]),a[0]=void 0),LOG_DEBUG("info",()=>`[WebGPU] Start to run kernel "[${i}] ${o}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),s(t,a[1]),0}catch(e){return r.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${o}" failed. ${e}`)),1}finally{for(let e of(u&&r.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${i}] ${o}": ${e.message}`:null)),this.temporaryData))this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,n){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let o=i.get(t),s=this.gpuDataManager.registerExternalBuffer(r,n,o);return i.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let n=await downloadGpuData(this,e,t);return createView2(n.buffer,r)}}writeTimestamp(e){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(void 0===this.env.trace?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&void 0===this.querySet&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){LOG_DEBUG("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){LOG_DEBUG("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){LOG_DEBUG("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let n=0;n<r;n++){let r=this.getComputePassEncoder(),i=e[n];this.writeTimestamp(2*this.pendingDispatchNumber),r.setPipeline(i.computePipeline),r.setBindGroup(0,i.bindGroup),r.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(t[n]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}}),init_exports={};__export(init_exports,{init:()=>init});var init_init=__esm({"web/lib/wasm/jsep/init.ts"(){"use strict";init_wasm_common(),init_log(),init_util2(),init_backend_webnn(),TensorViewImpl=class e{constructor(e,t,r,n){this.module=e,this.dataType=t,this.data=r,this.dims=n}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let e=ShapeUtil2.size(this.dims);return 0===e?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let e=ShapeUtil2.size(this.dims);return 0===e?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let e=ShapeUtil2.size(this.dims);return 0===e?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let e=ShapeUtil2.size(this.dims);return 0===e?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(t){if(ShapeUtil2.size(t)!==ShapeUtil2.size(this.dims))throw Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},ComputeContextImpl=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let n=e.PTR_SIZE,i=r/e.PTR_SIZE,o=4===n?"i32":"i64";this.opKernelContext=Number(e.getValue(n*i++,o));let s=Number(e.getValue(n*i++,o));this.outputCount=Number(e.getValue(n*i++,o)),this.customDataOffset=Number(e.getValue(n*i++,"*")),this.customDataSize=Number(e.getValue(n*i++,o));let a=[];for(let t=0;t<s;t++){let t=Number(e.getValue(n*i++,o)),r=Number(e.getValue(n*i++,"*")),s=Number(e.getValue(n*i++,o)),u=[];for(let t=0;t<s;t++)u.push(Number(e.getValue(n*i++,o)));a.push(new TensorViewImpl(e,t,r,u))}this.inputs=a}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(e=>"number"==typeof e?this.inputs[e]:e)??this.inputs,n=t?.outputs??[],i=(e,t,r)=>new TensorViewImpl(this.module,t,this.output(e,r),r),o=(e,t)=>{let r=calculateTensorSizeInBytes(e,t);if(!r)throw Error(`Unsupported data type: ${e}`);let n=r>0?this.backend.gpuDataManager.create(r).id:0;return new TensorViewImpl(this.module,e,n,t)};return this.backend.run(e,r,n,i,o,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let r=this.module.PTR_SIZE,n=4===r?"i32":"i64",i=this.module.stackAlloc((1+t.length)*r);this.module.setValue(i,t.length,n);for(let e=0;e<t.length;e++)this.module.setValue(i+r*(e+1),t[e],n);return this.module._JsepOutput(this.opKernelContext,e,i)}catch(r){throw Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(r)}}},init=async(e,t,r,n)=>{let i=t.jsepInit;if(!i)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===e){let e=new(init_backend_webgpu(),__toCommonJS(backend_webgpu_exports)).WebGpuBackend;await e.initialize(r,n),i("webgpu",[e,t=>e.alloc(Number(t)),t=>e.free(t),(r,n,i,o=!1)=>{if(o)LOG_DEBUG("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(r)}, dst=${Number(n)}, size=${Number(i)}`),e.memcpy(Number(r),Number(n));else{LOG_DEBUG("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(r)}, gpuDataId=${Number(n)}, size=${Number(i)}`);let o=t.HEAPU8.subarray(Number(r>>>0),Number(r>>>0)+Number(i));e.upload(Number(n),o)}},async(r,n,i)=>{LOG_DEBUG("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${r}, dataOffset=${n}, size=${i}`),await e.download(Number(r),()=>t.HEAPU8.subarray(Number(n)>>>0,Number(n+i)>>>0))},(r,n,i)=>e.createKernel(r,Number(n),i,t.UTF8ToString(t._JsepGetNodeName(Number(n)))),t=>e.releaseKernel(t),(r,n,i,o)=>{LOG_DEBUG("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${i}, kernel=${r}, contextDataOffset=${n}`);let s=new ComputeContextImpl(t,e,Number(n));return e.computeKernel(Number(r),s,o)},()=>e.captureBegin(),()=>e.captureEnd(),()=>e.replay()])}else{let e=new WebNNBackend(r);i("webnn",[e,()=>e.reserveTensorId(),t=>e.releaseTensorId(t),async(t,r,n,i,o)=>e.ensureTensor(t,r,n,i,o),(t,r)=>{e.uploadTensor(t,r)},async(t,r)=>e.downloadTensor(t,r),(t,r)=>e.registerMLContext(t,r),!!r.trace])}}}}),init_wasm_core_impl=__esm({"web/lib/wasm/wasm-core-impl.ts"(){"use strict";init_esm(),init_run_options(),init_session_options(),init_wasm_common(),init_wasm_factory(),init_wasm_utils(),init_wasm_utils_load_file(),initOrt=(e,t)=>{0!==getInstance()._OrtInit(e,t)&&checkLastError("Can't initialize onnxruntime.")},initRuntime=async e=>{initOrt(e.wasm.numThreads,logLevelStringToEnum(e.logLevel))},initEp=async(e,t)=>{getInstance().asyncInit?.();let r=e.webgpu.adapter;if("webgpu"===t){if("u"<typeof navigator||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(r){if("object"!=typeof r.limits||"object"!=typeof r.features||"function"!=typeof r.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=e.webgpu.powerPreference;if(void 0!==t&&"low-power"!==t&&"high-performance"!==t)throw Error(`Invalid powerPreference setting: "${t}"`);let n=e.webgpu.forceFallbackAdapter;if(void 0!==n&&"boolean"!=typeof n)throw Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(!(r=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:n})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===t&&("u"<typeof navigator||!navigator.ml))throw Error("WebNN is not supported in current environment");{let n=(init_init(),__toCommonJS(init_exports)).init;"webgpu"===t&&await n("webgpu",getInstance(),e,r),"webnn"===t&&await n("webnn",getInstance(),e)}},activeSessions=new Map,getSessionInputOutputCount=e=>{let t=getInstance(),r=t.stackSave();try{let r=t.PTR_SIZE,n=t.stackAlloc(2*r),i=t._OrtGetInputOutputCount(e,n,n+r);0!==i&&checkLastError("Can't get session input/output count.");let o=4===r?"i32":"i64";return[Number(t.getValue(n,o)),Number(t.getValue(n+r,o))]}finally{t.stackRestore(r)}},getSessionInputOutputMetadata=(e,t)=>{let r=getInstance(),n=r.stackSave(),i=0;try{let n=r.PTR_SIZE,o=r.stackAlloc(2*n),s=r._OrtGetInputOutputMetadata(e,t,o,o+n);0!==s&&checkLastError("Can't get session input/output metadata.");let a=Number(r.getValue(o,"*"));i=Number(r.getValue(o+n,"*"));let u=r.HEAP32[i/4];if(0===u)return[a,0];let l=r.HEAPU32[i/4+1],d=[];for(let e=0;e<l;e++){let t=Number(r.getValue(i+8+e*n,"*"));d.push(0!==t?r.UTF8ToString(t):Number(r.getValue(i+8+(e+l)*n,"*")))}return[a,u,d]}finally{r.stackRestore(n),0!==i&&r._OrtFree(i)}},copyFromExternalBuffer=e=>{let t=getInstance(),r=t._malloc(e.byteLength);if(0===r)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},createSession=async(e,t)=>{let r,n,i=getInstance();Array.isArray(e)?[r,n]=e:e.buffer===i.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=copyFromExternalBuffer(e);let o=0,s=0,a=0,u=[],l=[],d=[];try{if([s,u]=await setSessionOptions(t),t?.externalData&&i.mountExternalData){let e=[];for(let r of t.externalData){let t="string"==typeof r?r:r.path;e.push(loadFile("string"==typeof r?r:r.data).then(e=>{i.mountExternalData(t,e)}))}await Promise.all(e)}for(let e of t?.executionProviders??[]){let t="string"==typeof e?e:e.name;if("webnn"===t){if(i.shouldTransferToMLTensor=!1,"string"!=typeof e){let t=e,r=t?.context,n=t?.gpuDevice,o=t?.deviceType,s=t?.powerPreference;r?i.currentContext=r:n?i.currentContext=await i.webnnCreateMLContext(n):i.currentContext=await i.webnnCreateMLContext({deviceType:o,powerPreference:s})}else i.currentContext=await i.webnnCreateMLContext();break}}o=await i._OrtCreateSession(r,n,s),i.webgpuOnCreateSession?.(o),0===o&&checkLastError("Can't create a session."),i.jsepOnCreateSession?.(),i.currentContext&&(i.webnnRegisterMLContext(o,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[e,p]=getSessionInputOutputCount(o),c=!!t?.enableGraphCapture,h=[],f=[],m=[],g=[],b=[];for(let t=0;t<e;t++){let[e,r,n]=getSessionInputOutputMetadata(o,t);0===e&&checkLastError("Can't get an input name."),l.push(e);let s=i.UTF8ToString(e);h.push(s),m.push(0===r?{name:s,isTensor:!1}:{name:s,isTensor:!0,type:tensorDataTypeEnumToString(r),shape:n})}for(let r=0;r<p;r++){let[n,s,a]=getSessionInputOutputMetadata(o,r+e);0===n&&checkLastError("Can't get an output name."),d.push(n);let u=i.UTF8ToString(n);f.push(u),g.push(0===s?{name:u,isTensor:!1}:{name:u,isTensor:!0,type:tensorDataTypeEnumToString(s),shape:a});{if(c&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let e="string"==typeof t?.preferredOutputLocation?t.preferredOutputLocation:t?.preferredOutputLocation?.[u]??"cpu",r=i.webnnIsGraphOutput;if("cpu"===e&&r&&r(o,u)){b.push("ml-tensor-cpu-output");continue}if("cpu"!==e&&"cpu-pinned"!==e&&"gpu-buffer"!==e&&"ml-tensor"!==e)throw Error(`Not supported preferred output location: ${e}.`);if(c&&"gpu-buffer"!==e)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(e)}}let y=null;return b.some(e=>"gpu-buffer"===e||"ml-tensor"===e||"ml-tensor-cpu-output"===e)&&(a=i._OrtCreateBinding(o),0===a&&checkLastError("Can't create IO binding."),y={handle:a,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(e=>"ml-tensor-cpu-output"===e?"ml-tensor":e).map(e=>dataLocationStringToEnum(e))}),activeSessions.set(o,[o,l,d,y,c,!1]),[o,h,f,m,g]}catch(e){throw l.forEach(e=>i._OrtFree(e)),d.forEach(e=>i._OrtFree(e)),0!==a&&0!==i._OrtReleaseBinding(a)&&checkLastError("Can't release IO binding."),0!==o&&0!==i._OrtReleaseSession(o)&&checkLastError("Can't release session."),e}finally{i._free(r),0!==s&&0!==i._OrtReleaseSessionOptions(s)&&checkLastError("Can't release session options."),u.forEach(e=>i._free(e)),i.unmountExternalData?.()}},releaseSession=e=>{let t=getInstance(),r=activeSessions.get(e);if(!r)throw Error(`cannot release session. invalid session id: ${e}`);let[n,i,o,s,a]=r;s&&(a&&0!==t._OrtClearBoundOutputs(s.handle)&&checkLastError("Can't clear bound outputs."),0!==t._OrtReleaseBinding(s.handle)&&checkLastError("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),i.forEach(e=>t._OrtFree(e)),o.forEach(e=>t._OrtFree(e)),0!==t._OrtReleaseSession(n)&&checkLastError("Can't release session."),activeSessions.delete(e)},prepareInputOutputTensor=async(e,t,r,n,i,o,s=!1)=>{let a,u;if(!e)return void t.push(0);let l=getInstance(),d=l.PTR_SIZE,p=e[0],c=e[1],h=e[3],f=h;if("string"===p&&("gpu-buffer"===h||"ml-tensor"===h))throw Error("String tensor is not supported on GPU.");if(s&&"gpu-buffer"!==h)throw Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if("gpu-buffer"===h){let t=e[2].gpuBuffer;u=calculateTensorSizeInBytes(tensorDataTypeStringToEnum(p),c);{let e=l.jsepRegisterBuffer;if(!e)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');a=e(n,o,t,u)}}else if("ml-tensor"===h){let t=e[2].mlTensor;u=calculateTensorSizeInBytes(tensorDataTypeStringToEnum(p),c);let r=l.webnnRegisterMLTensor;if(!r)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');a=r(n,t,tensorDataTypeStringToEnum(p),c)}else{let t=e[2];if(Array.isArray(t)){u=d*t.length,a=l._malloc(u),r.push(a);for(let e=0;e<t.length;e++){if("string"!=typeof t[e])throw TypeError(`tensor data at index ${e} is not a string`);l.setValue(a+e*d,allocWasmString(t[e],r),"*")}}else{let e=l.webnnIsGraphInput,o=l.webnnIsGraphOutput;if("string"!==p&&e&&o){let s=l.UTF8ToString(i);if(e(n,s)||o(n,s)){let e=tensorDataTypeStringToEnum(p);u=calculateTensorSizeInBytes(e,c),f="ml-tensor";let r=l.webnnCreateTemporaryTensor,i=l.webnnUploadTensor;if(!r||!i)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let o=await r(n,e,c);i(o,new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),a=o}else u=t.byteLength,a=l._malloc(u),r.push(a),l.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,u),a)}else u=t.byteLength,a=l._malloc(u),r.push(a),l.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,u),a)}}let m=l.stackSave(),g=l.stackAlloc(4*c.length);try{c.forEach((e,t)=>l.setValue(g+t*d,e,4===d?"i32":"i64"));let e=l._OrtCreateTensor(tensorDataTypeStringToEnum(p),a,u,g,c.length,dataLocationStringToEnum(f));0===e&&checkLastError(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(e)}finally{l.stackRestore(m)}},run=async(e,t,r,n,i,o)=>{let s=getInstance(),a=s.PTR_SIZE,u=activeSessions.get(e);if(!u)throw Error(`cannot run inference. invalid session id: ${e}`);let l=u[0],d=u[1],p=u[2],c=u[3],h=u[4],f=u[5],m=t.length,g=n.length,b=0,y=[],_=[],x=[],v=[],w=[],$=s.stackSave(),T=s.stackAlloc(m*a),I=s.stackAlloc(m*a),O=s.stackAlloc(g*a),S=s.stackAlloc(g*a);try{let u;[b,y]=setRunOptions(o),TRACE_EVENT_BEGIN("wasm prepareInputOutputTensor");for(let n=0;n<m;n++)await prepareInputOutputTensor(r[n],_,v,e,d[t[n]],t[n],h);for(let t=0;t<g;t++)await prepareInputOutputTensor(i[t],x,v,e,p[n[t]],m+n[t],h);TRACE_EVENT_END("wasm prepareInputOutputTensor");for(let e=0;e<m;e++)s.setValue(T+e*a,_[e],"*"),s.setValue(I+e*a,d[t[e]],"*");for(let e=0;e<g;e++)s.setValue(O+e*a,x[e],"*"),s.setValue(S+e*a,p[n[e]],"*");if(c&&!f){let{handle:r,outputPreferredLocations:o,outputPreferredLocationsEncoded:a}=c;if(d.length!==m)throw Error(`input count from feeds (${m}) is expected to be always equal to model's input count (${d.length}).`);TRACE_EVENT_BEGIN("wasm bindInputsOutputs");for(let n=0;n<m;n++){let i=t[n],o=await s._OrtBindInput(r,d[i],_[n]);0!==o&&checkLastError(`Can't bind input[${n}] for session=${e}.`)}for(let t=0;t<g;t++){let u=n[t];if(i[t]?.[3]){w.push(x[t]);let n=s._OrtBindOutput(r,p[u],x[t],0);0!==n&&checkLastError(`Can't bind pre-allocated output[${t}] for session=${e}.`)}else{let n=s._OrtBindOutput(r,p[u],0,a[u]);0!==n&&checkLastError(`Can't bind output[${t}] to ${o[t]} for session=${e}.`)}}TRACE_EVENT_END("wasm bindInputsOutputs"),activeSessions.set(e,[l,d,p,c,h,!0])}s.jsepOnRunStart?.(l),s.webnnOnRunStart?.(l),u=c?await s._OrtRunWithBinding(l,c.handle,g,O,b):await s._OrtRun(l,I,T,m,S,g,O,b),0!==u&&checkLastError("failed to call OrtRun().");let $=[],E=[];TRACE_EVENT_BEGIN("wasm ProcessOutputTensor");for(let t=0;t<g;t++){let r=Number(s.getValue(O+t*a,"*"));if(r===x[t]||w.includes(x[t])){$.push(i[t]),r!==x[t]&&0!==s._OrtReleaseTensor(r)&&checkLastError("Can't release tensor.");continue}let o=s.stackSave(),u=s.stackAlloc(4*a),l=!1,d,p=0;try{let i=s._OrtGetTensorData(r,u,u+a,u+2*a,u+3*a);0!==i&&checkLastError(`Can't access output tensor data on index ${t}.`);let o=4===a?"i32":"i64",h=Number(s.getValue(u,o));p=s.getValue(u+a,"*");let f=s.getValue(u+2*a,"*"),m=Number(s.getValue(u+3*a,o)),g=[];for(let e=0;e<m;e++)g.push(Number(s.getValue(f+e*a,o)));0!==s._OrtFree(f)&&checkLastError("Can't free memory for tensor dims.");let b=g.reduce((e,t)=>e*t,1);d=tensorDataTypeEnumToString(h);let y=c?.outputPreferredLocations[n[t]];if("string"===d){if("gpu-buffer"===y||"ml-tensor"===y)throw Error("String tensor is not supported on GPU.");let e=[];for(let t=0;t<b;t++){let r=s.getValue(p+t*a,"*"),n=s.getValue(p+(t+1)*a,"*"),i=t===b-1?void 0:n-r;e.push(s.UTF8ToString(r,i))}$.push([d,g,e,"cpu"])}else if("gpu-buffer"===y&&b>0){let e=s.jsepGetBuffer;if(!e)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let t=e(p),n=calculateTensorSizeInBytes(h,b);if(void 0===n||!isGpuBufferSupportedType(d))throw Error(`Unsupported data type: ${d}`);l=!0,$.push([d,g,{gpuBuffer:t,download:s.jsepCreateDownloader(t,n,d),dispose:()=>{0!==s._OrtReleaseTensor(r)&&checkLastError("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===y&&b>0){let t=s.webnnEnsureTensor,n=s.webnnIsGraphInputOutputTypeSupported;if(!t||!n)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');let i=calculateTensorSizeInBytes(h,b);if(void 0===i||!isMLTensorSupportedType(d))throw Error(`Unsupported data type: ${d}`);if(!n(e,d,!1))throw Error(`preferredLocation "ml-tensor" for ${d} output is not supported by current WebNN Context.`);let o=await t(e,p,h,g,!1);l=!0,$.push([d,g,{mlTensor:o,download:s.webnnCreateMLTensorDownloader(p,d),dispose:()=>{s.webnnReleaseTensorId(p),s._OrtReleaseTensor(r)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===y&&b>0){let e=s.webnnCreateMLTensorDownloader(p,d)(),t=$.length;l=!0,E.push((async()=>{let n=[t,await e];return s.webnnReleaseTensorId(p),s._OrtReleaseTensor(r),n})()),$.push([d,g,[],"cpu"])}else{let e=new(tensorTypeToTypedArrayConstructor(d))(b);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(s.HEAPU8.subarray(p,p+e.byteLength)),$.push([d,g,e,"cpu"])}}finally{s.stackRestore(o),"string"===d&&p&&s._free(p),l||s._OrtReleaseTensor(r)}}for(let[t,r]of(c&&!h&&(0!==s._OrtClearBoundOutputs(c.handle)&&checkLastError("Can't clear bound outputs."),activeSessions.set(e,[l,d,p,c,h,!1])),await Promise.all(E)))$[t][2]=r;return TRACE_EVENT_END("wasm ProcessOutputTensor"),$}finally{s.webnnOnRunEnd?.(l),s.stackRestore($),_.forEach(e=>s._OrtReleaseTensor(e)),x.forEach(e=>s._OrtReleaseTensor(e)),v.forEach(e=>s._free(e)),0!==b&&s._OrtReleaseRunOptions(b),y.forEach(e=>s._free(e))}},endProfiling=e=>{let t=getInstance(),r=activeSessions.get(e);if(!r)throw Error("invalid session id");let n=r[0],i=t._OrtEndProfiling(n);0===i&&checkLastError("Can't get an profile file name."),t._OrtFree(i)},extractTransferableBuffers=e=>{let t=[];for(let r of e){let e=r[2];!Array.isArray(e)&&"buffer"in e&&t.push(e.buffer)}return t}}}),init_proxy_wrapper=__esm({"web/lib/wasm/proxy-wrapper.ts"(){"use strict";init_esm(),init_wasm_core_impl(),init_wasm_factory(),init_wasm_utils_import(),isProxy=()=>!!env2.wasm.proxy&&"u">typeof document,initializing2=!1,initialized2=!1,aborted2=!1,queuedCallbacks=new Map,enqueueCallbacks=(e,t)=>{let r=queuedCallbacks.get(e);r?r.push(t):queuedCallbacks.set(e,[t])},ensureWorker=()=>{if(initializing2||!initialized2||aborted2||!proxyWorker)throw Error("worker not ready")},onProxyWorkerMessage=e=>{switch(e.data.type){case"init-wasm":initializing2=!1,e.data.err?(aborted2=!0,initWasmCallbacks[1](e.data.err)):(initialized2=!0,initWasmCallbacks[0]()),temporaryObjectUrl&&(URL.revokeObjectURL(temporaryObjectUrl),temporaryObjectUrl=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=queuedCallbacks.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out)}}},initializeWebAssemblyAndOrtRuntime=async()=>{if(!initialized2){if(initializing2)throw Error("multiple calls to 'initWasm()' detected.");if(aborted2)throw Error("previous call to 'initWasm()' failed.");if(initializing2=!0,isProxy())return new Promise((e,t)=>{proxyWorker?.terminate(),importProxyWorker().then(([r,n])=>{try{(proxyWorker=n).onerror=e=>t(e),proxyWorker.onmessage=onProxyWorkerMessage,initWasmCallbacks=[e,t];let i={type:"init-wasm",in:env2};if(!i.in.wasm.wasmPaths&&r){let e=inferWasmPathPrefixFromScriptSrc();e&&(i.in.wasm.wasmPaths=e)}proxyWorker.postMessage(i),temporaryObjectUrl=r}catch(e){t(e)}},t)});try{await initializeWebAssembly(env2.wasm),await initRuntime(env2),initialized2=!0}catch(e){throw aborted2=!0,e}finally{initializing2=!1}}},initializeOrtEp=async e=>{if(isProxy())return ensureWorker(),new Promise((t,r)=>{enqueueCallbacks("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:env2}};proxyWorker.postMessage(n)});await initEp(env2,e)},copyFromExternalBuffer2=async e=>isProxy()?(ensureWorker(),new Promise((t,r)=>{enqueueCallbacks("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};proxyWorker.postMessage(n,[e.buffer])})):copyFromExternalBuffer(e),createSession2=async(e,t)=>{if(!isProxy())return createSession(e,t);if(t?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return ensureWorker(),new Promise((r,n)=>{enqueueCallbacks("create",[r,n]);let i={type:"create",in:{model:e,options:{...t}}},o=[];e instanceof Uint8Array&&o.push(e.buffer),proxyWorker.postMessage(i,o)})},releaseSession2=async e=>{if(isProxy())return ensureWorker(),new Promise((t,r)=>{enqueueCallbacks("release",[t,r]);let n={type:"release",in:e};proxyWorker.postMessage(n)});releaseSession(e)},run2=async(e,t,r,n,i,o)=>{if(!isProxy())return run(e,t,r,n,i,o);if(r.some(e=>"cpu"!==e[3]))throw Error("input tensor on GPU is not supported for proxy.");if(i.some(e=>e))throw Error("pre-allocated output tensor is not supported for proxy.");return ensureWorker(),new Promise((i,s)=>{enqueueCallbacks("run",[i,s]);let a=r,u={type:"run",in:{sessionId:e,inputIndices:t,inputs:a,outputIndices:n,options:o}};proxyWorker.postMessage(u,extractTransferableBuffers(a))})},endProfiling2=async e=>{if(isProxy())return ensureWorker(),new Promise((t,r)=>{enqueueCallbacks("end-profiling",[t,r]);let n={type:"end-profiling",in:e};proxyWorker.postMessage(n)});endProfiling(e)}}}),init_session_handler_inference2=__esm({"web/lib/wasm/session-handler-inference.ts"(){"use strict";init_esm(),init_proxy_wrapper(),init_wasm_common(),init_wasm_utils_env(),init_wasm_utils_load_file(),encodeTensorMetadata=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${e.location} for ${t()}`)}},decodeTensorMetadata=e=>{switch(e[3]){case"cpu":return new Tensor2(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!isGpuBufferSupportedType(t))throw Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:i}=e[2];return Tensor2.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:i})}case"ml-tensor":{let t=e[0];if(!isMLTensorSupportedType(t))throw Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:i}=e[2];return Tensor2.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:i})}default:throw Error(`invalid data location: ${e[3]}`)}},OnnxruntimeWebAssemblySessionHandler=class{async fetchModelAndCopyToWasmMemory(e){return copyFromExternalBuffer2(await loadFile(e))}async loadModel(e,t){let r;TRACE_FUNC_BEGIN(),r="string"==typeof e?isNode?await loadFile(e):await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await createSession2(r,t),TRACE_FUNC_END()}async dispose(){return releaseSession2(this.sessionId)}async run(e,t,r){TRACE_FUNC_BEGIN();let n=[],i=[];Object.entries(e).forEach(e=>{let t=e[0],r=e[1],o=this.inputNames.indexOf(t);if(-1===o)throw Error(`invalid input '${t}'`);n.push(r),i.push(o)});let o=[],s=[];Object.entries(t).forEach(e=>{let t=e[0],r=e[1],n=this.outputNames.indexOf(t);if(-1===n)throw Error(`invalid output '${t}'`);o.push(r),s.push(n)});let a=n.map((e,t)=>encodeTensorMetadata(e,()=>`input "${this.inputNames[i[t]]}"`)),u=o.map((e,t)=>e?encodeTensorMetadata(e,()=>`output "${this.outputNames[s[t]]}"`):null),l=await run2(this.sessionId,i,a,s,u,r),d={};for(let e=0;e<l.length;e++)d[this.outputNames[s[e]]]=o[e]??decodeTensorMetadata(l[e]);return TRACE_FUNC_END(),d}startProfiling(){}endProfiling(){endProfiling2(this.sessionId)}}}}),backend_wasm_exports={};__export(backend_wasm_exports,{OnnxruntimeWebAssemblyBackend:()=>OnnxruntimeWebAssemblyBackend,initializeFlags:()=>initializeFlags,wasmBackend:()=>wasmBackend});var init_backend_wasm=__esm({"web/lib/backend-wasm.ts"(){"use strict";init_esm(),init_proxy_wrapper(),init_session_handler_inference2(),initializeFlags=()=>{("number"!=typeof env2.wasm.initTimeout||env2.wasm.initTimeout<0)&&(env2.wasm.initTimeout=0);let e=env2.wasm.simd;if("boolean"!=typeof e&&void 0!==e&&"fixed"!==e&&"relaxed"!==e&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),env2.wasm.simd=!1),"boolean"!=typeof env2.wasm.proxy&&(env2.wasm.proxy=!1),"boolean"!=typeof env2.wasm.trace&&(env2.wasm.trace=!1),"number"!=typeof env2.wasm.numThreads||!Number.isInteger(env2.wasm.numThreads)||env2.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)env2.wasm.numThreads=1;else{let e="u"<typeof navigator?__require("node:os").cpus().length:navigator.hardwareConcurrency;env2.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},wasmBackend=new(OnnxruntimeWebAssemblyBackend=class{async init(e){initializeFlags(),await initializeWebAssemblyAndOrtRuntime(),await initializeOrtEp(e)}async createInferenceSessionHandler(e,t){let r=new OnnxruntimeWebAssemblySessionHandler;return await r.loadModel(e,t),r}})}});init_esm(),init_esm(),init_esm();var version2="1.24.3",index_default=esm_exports;{let onnxjsBackend2=(init_backend_onnxjs(),__toCommonJS(backend_onnxjs_exports)).onnxjsBackend;registerBackend("webgl",onnxjsBackend2,-10)}{let wasmBackend2=(init_backend_wasm(),__toCommonJS(backend_wasm_exports)).wasmBackend;registerBackend("webgpu",wasmBackend2,5),registerBackend("webnn",wasmBackend2,5),registerBackend("cpu",wasmBackend2,10),registerBackend("wasm",wasmBackend2,10)}Object.defineProperty(env2.versions,"web",{value:version2,enumerable:!0});export{InferenceSession2 as InferenceSession,TRACE,TRACE_EVENT_BEGIN,TRACE_EVENT_END,TRACE_FUNC_BEGIN,TRACE_FUNC_END,Tensor2 as Tensor,index_default as default,env2 as env,registerBackend};