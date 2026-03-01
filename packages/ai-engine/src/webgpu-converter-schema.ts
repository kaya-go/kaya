/**
 * ONNX Protobuf Schema for WebGPU Converter
 *
 * Minimal ONNX protobuf schema definitions used for parsing and re-encoding
 * ONNX models during WebGPU conversion. Uses protobufjs (bundled with onnxruntime-web).
 */

import protobuf from 'protobufjs';

// Minimal ONNX protobuf schema (only types needed for model conversion)
export const ONNX_SCHEMA = {
  nested: {
    onnx: {
      nested: {
        ModelProto: {
          fields: {
            irVersion: { type: 'int64', id: 1 },
            opsetImport: { rule: 'repeated', type: 'OperatorSetIdProto', id: 8 },
            producerName: { type: 'string', id: 2 },
            producerVersion: { type: 'string', id: 3 },
            domain: { type: 'string', id: 4 },
            modelVersion: { type: 'int64', id: 5 },
            docString: { type: 'string', id: 6 },
            graph: { type: 'GraphProto', id: 7 },
            metadataProps: { rule: 'repeated', type: 'StringStringEntryProto', id: 14 },
            trainingInfo: { rule: 'repeated', type: 'TrainingInfoProto', id: 20 },
            functions: { rule: 'repeated', type: 'FunctionProto', id: 25 },
          },
        },
        GraphProto: {
          fields: {
            node: { rule: 'repeated', type: 'NodeProto', id: 1 },
            name: { type: 'string', id: 2 },
            initializer: { rule: 'repeated', type: 'TensorProto', id: 5 },
            sparseInitializer: { rule: 'repeated', type: 'SparseTensorProto', id: 15 },
            docString: { type: 'string', id: 10 },
            input: { rule: 'repeated', type: 'ValueInfoProto', id: 11 },
            output: { rule: 'repeated', type: 'ValueInfoProto', id: 12 },
            valueInfo: { rule: 'repeated', type: 'ValueInfoProto', id: 13 },
            quantizationAnnotation: {
              rule: 'repeated',
              type: 'TensorAnnotation',
              id: 14,
            },
          },
        },
        NodeProto: {
          fields: {
            input: { rule: 'repeated', type: 'string', id: 1 },
            output: { rule: 'repeated', type: 'string', id: 2 },
            name: { type: 'string', id: 3 },
            opType: { type: 'string', id: 4 },
            domain: { type: 'string', id: 7 },
            attribute: { rule: 'repeated', type: 'AttributeProto', id: 5 },
            docString: { type: 'string', id: 6 },
          },
        },
        AttributeProto: {
          fields: {
            name: { type: 'string', id: 1 },
            refAttrName: { type: 'string', id: 21 },
            docString: { type: 'string', id: 13 },
            type: { type: 'int32', id: 20 },
            f: { type: 'float', id: 2 },
            i: { type: 'int64', id: 3 },
            s: { type: 'bytes', id: 4 },
            t: { type: 'TensorProto', id: 5 },
            g: { type: 'GraphProto', id: 6 },
            sparseTensor: { type: 'SparseTensorProto', id: 22 },
            tp: { type: 'TypeProto', id: 14 },
            floats: { rule: 'repeated', type: 'float', id: 7 },
            ints: { rule: 'repeated', type: 'int64', id: 8 },
            strings: { rule: 'repeated', type: 'bytes', id: 9 },
            tensors: { rule: 'repeated', type: 'TensorProto', id: 10 },
            graphs: { rule: 'repeated', type: 'GraphProto', id: 11 },
            sparseTensors: { rule: 'repeated', type: 'SparseTensorProto', id: 23 },
            typeProtos: { rule: 'repeated', type: 'TypeProto', id: 15 },
          },
        },
        TensorProto: {
          fields: {
            dims: { rule: 'repeated', type: 'int64', id: 1 },
            dataType: { type: 'int32', id: 2 },
            segment: { type: 'Segment', id: 3 },
            floatData: { rule: 'repeated', type: 'float', id: 4, options: { packed: true } },
            int32Data: { rule: 'repeated', type: 'int32', id: 5, options: { packed: true } },
            stringData: { rule: 'repeated', type: 'bytes', id: 6 },
            int64Data: { rule: 'repeated', type: 'int64', id: 7, options: { packed: true } },
            name: { type: 'string', id: 8 },
            docString: { type: 'string', id: 12 },
            rawData: { type: 'bytes', id: 9 },
            externalData: { rule: 'repeated', type: 'StringStringEntryProto', id: 13 },
            dataLocation: { type: 'int32', id: 14 },
            doubleData: { rule: 'repeated', type: 'double', id: 10, options: { packed: true } },
            uint64Data: {
              rule: 'repeated',
              type: 'uint64',
              id: 11,
              options: { packed: true },
            },
          },
          nested: {
            Segment: {
              fields: {
                begin: { type: 'int64', id: 1 },
                end: { type: 'int64', id: 2 },
              },
            },
          },
        },
        ValueInfoProto: {
          fields: {
            name: { type: 'string', id: 1 },
            type: { type: 'TypeProto', id: 2 },
            docString: { type: 'string', id: 3 },
          },
        },
        TypeProto: {
          oneofs: {
            value: {
              oneof: ['tensorType', 'sequenceType', 'mapType', 'optionalType', 'sparseTensorType'],
            },
          },
          fields: {
            tensorType: { type: 'Tensor', id: 1 },
            sequenceType: { type: 'Sequence', id: 4 },
            mapType: { type: 'Map', id: 5 },
            optionalType: { type: 'Optional', id: 9 },
            sparseTensorType: { type: 'SparseTensor', id: 8 },
            denotation: { type: 'string', id: 6 },
          },
          nested: {
            Tensor: {
              fields: {
                elemType: { type: 'int32', id: 1 },
                shape: { type: 'TensorShapeProto', id: 2 },
              },
            },
            Sequence: {
              fields: {
                elemType: { type: 'TypeProto', id: 1 },
              },
            },
            Map: {
              fields: {
                keyType: { type: 'int32', id: 1 },
                valueType: { type: 'TypeProto', id: 2 },
              },
            },
            Optional: {
              fields: {
                elemType: { type: 'TypeProto', id: 1 },
              },
            },
            SparseTensor: {
              fields: {
                elemType: { type: 'int32', id: 1 },
                shape: { type: 'TensorShapeProto', id: 2 },
              },
            },
          },
        },
        TensorShapeProto: {
          fields: {
            dim: { rule: 'repeated', type: 'Dimension', id: 1 },
          },
          nested: {
            Dimension: {
              oneofs: { value: { oneof: ['dimValue', 'dimParam'] } },
              fields: {
                dimValue: { type: 'int64', id: 1 },
                dimParam: { type: 'string', id: 2 },
                denotation: { type: 'string', id: 3 },
              },
            },
          },
        },
        SparseTensorProto: {
          fields: {
            dims: { rule: 'repeated', type: 'int64', id: 1 },
            indices: { type: 'TensorProto', id: 2 },
            values: { type: 'TensorProto', id: 3 },
          },
        },
        OperatorSetIdProto: {
          fields: {
            domain: { type: 'string', id: 1 },
            version: { type: 'int64', id: 2 },
          },
        },
        StringStringEntryProto: {
          fields: {
            key: { type: 'string', id: 1 },
            value: { type: 'string', id: 2 },
          },
        },
        TensorAnnotation: {
          fields: {
            tensorName: { type: 'string', id: 1 },
            quantParameterTensorNames: {
              rule: 'repeated',
              type: 'StringStringEntryProto',
              id: 2,
            },
          },
        },
        TrainingInfoProto: {
          fields: {
            initialization: { type: 'GraphProto', id: 1 },
            algorithm: { type: 'GraphProto', id: 2 },
            initializationBinding: {
              rule: 'repeated',
              type: 'StringStringEntryProto',
              id: 3,
            },
            updateBinding: { rule: 'repeated', type: 'StringStringEntryProto', id: 4 },
          },
        },
        FunctionProto: {
          fields: {
            name: { type: 'string', id: 1 },
            input: { rule: 'repeated', type: 'string', id: 4 },
            output: { rule: 'repeated', type: 'string', id: 5 },
            attribute: { rule: 'repeated', type: 'string', id: 6 },
            attributeProto: { rule: 'repeated', type: 'AttributeProto', id: 11 },
            node: { rule: 'repeated', type: 'NodeProto', id: 7 },
            docString: { type: 'string', id: 8 },
            opsetImport: { rule: 'repeated', type: 'OperatorSetIdProto', id: 9 },
            domain: { type: 'string', id: 10 },
          },
        },
      },
    },
  },
};

// ONNX TensorProto data types
export const ONNX_FLOAT = 1;
export const ONNX_FLOAT16 = 10;

// Lazily initialized protobuf root
let _root: protobuf.Root | null = null;
export function getRoot(): protobuf.Root {
  if (!_root) {
    _root = protobuf.Root.fromJSON(ONNX_SCHEMA);
  }
  return _root;
}
