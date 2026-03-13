//! ONNX Runtime inference execution (fp32 and fp16 paths)

use half::f16;
use ndarray::{Array2, Array4};
use ort::value::Tensor;

use super::types::OnnxOutputs;
use super::OnnxEngine;

impl OnnxEngine {
    /// Run ONNX inference (dispatches to fp16 or fp32 path).
    /// Takes ownership of inputs to avoid cloning.
    pub(crate) fn run_inference(
        &mut self,
        bin_input: Array4<f32>,
        global_input: Array2<f32>,
    ) -> Result<OnnxOutputs, String> {
        if self.is_fp16 {
            self.run_inference_fp16(bin_input, global_input)
        } else {
            self.run_inference_fp32(bin_input, global_input)
        }
    }

    /// Run ONNX inference with fp32 tensors
    fn run_inference_fp32(
        &mut self,
        bin_input: Array4<f32>,
        global_input: Array2<f32>,
    ) -> Result<OnnxOutputs, String> {
        let bin_tensor = Tensor::from_array(bin_input)
            .map_err(|e| format!("Failed to create bin_input tensor: {}", e))?;

        let global_tensor = Tensor::from_array(global_input)
            .map_err(|e| format!("Failed to create global_input tensor: {}", e))?;

        let outputs = self
            .session
            .run(ort::inputs![bin_tensor, global_tensor])
            .map_err(|e| format!("Inference failed: {}", e))?;

        let (policy_shape, policy_data) = outputs["policy"]
            .try_extract_tensor::<f32>()
            .map_err(|e| format!("Failed to extract policy: {}", e))?;

        let (_value_shape, value_data) = outputs["value"]
            .try_extract_tensor::<f32>()
            .map_err(|e| format!("Failed to extract value: {}", e))?;

        let (_misc_shape, miscvalue_data) = outputs["miscvalue"]
            .try_extract_tensor::<f32>()
            .map_err(|e| format!("Failed to extract miscvalue: {}", e))?;

        let ownership = if outputs.contains_key("ownership") {
            let (_own_shape, own_data) = outputs["ownership"]
                .try_extract_tensor::<f32>()
                .map_err(|e| format!("Failed to extract ownership: {}", e))?;
            Some(own_data.to_vec())
        } else {
            None
        };

        let policy_dims: Vec<usize> = policy_shape.iter().map(|&d| d as usize).collect();

        Ok(OnnxOutputs {
            policy: policy_data.to_vec(),
            value: value_data.to_vec(),
            miscvalue: miscvalue_data.to_vec(),
            ownership,
            policy_dims,
        })
    }

    /// Run ONNX inference with fp16 tensors (converts f32 inputs to f16, runs inference, converts f16 outputs back to f32)
    fn run_inference_fp16(
        &mut self,
        bin_input: Array4<f32>,
        global_input: Array2<f32>,
    ) -> Result<OnnxOutputs, String> {
        let bin_fp16 = bin_input.mapv(|v| f16::from_f32(v));
        let global_fp16 = global_input.mapv(|v| f16::from_f32(v));

        let bin_tensor = Tensor::from_array(bin_fp16)
            .map_err(|e| format!("Failed to create bin_input f16 tensor: {}", e))?;

        let global_tensor = Tensor::from_array(global_fp16)
            .map_err(|e| format!("Failed to create global_input f16 tensor: {}", e))?;

        let outputs = self
            .session
            .run(ort::inputs![bin_tensor, global_tensor])
            .map_err(|e| format!("Inference failed: {}", e))?;

        let (policy_shape, policy_data) = outputs["policy"]
            .try_extract_tensor::<f16>()
            .map_err(|e| format!("Failed to extract policy: {}", e))?;

        let (_value_shape, value_data) = outputs["value"]
            .try_extract_tensor::<f16>()
            .map_err(|e| format!("Failed to extract value: {}", e))?;

        let (_misc_shape, miscvalue_data) = outputs["miscvalue"]
            .try_extract_tensor::<f16>()
            .map_err(|e| format!("Failed to extract miscvalue: {}", e))?;

        let ownership = if outputs.contains_key("ownership") {
            let (_own_shape, own_data) = outputs["ownership"]
                .try_extract_tensor::<f16>()
                .map_err(|e| format!("Failed to extract ownership: {}", e))?;
            Some(own_data.iter().map(|v| v.to_f32()).collect())
        } else {
            None
        };

        let policy_dims: Vec<usize> = policy_shape.iter().map(|&d| d as usize).collect();

        Ok(OnnxOutputs {
            policy: policy_data.iter().map(|v| v.to_f32()).collect(),
            value: value_data.iter().map(|v| v.to_f32()).collect(),
            miscvalue: miscvalue_data.iter().map(|v| v.to_f32()).collect(),
            ownership,
            policy_dims,
        })
    }
}
