import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CameraCapture.css';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        if (cancelled) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        if (!cancelled) setError(t('scan.cameraError'));
      });

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    };
  }, [t]);

  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      blob => {
        if (blob) {
          const file = new File([blob], `scan-${Date.now()}.jpg`, { type: 'image/jpeg' });
          // Stop the stream before handing off
          streamRef.current?.getTracks().forEach(t => t.stop());
          streamRef.current = null;
          onCapture(file);
        }
      },
      'image/jpeg',
      0.92
    );
  }, [onCapture]);

  const handleClose = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    onClose();
  }, [onClose]);

  return (
    <div className="camera-capture-overlay">
      <div className="camera-capture-dialog">
        <div className="camera-capture-video-wrap">
          {error ? (
            <div className="camera-capture-error">{error}</div>
          ) : (
            <video ref={videoRef} autoPlay playsInline muted />
          )}
        </div>

        <div className="camera-capture-controls">
          <button className="camera-capture-cancel" onClick={handleClose}>
            {t('cancel')}
          </button>
          {!error && (
            <button
              className="camera-capture-shutter"
              onClick={handleCapture}
              aria-label={t('scan.capturePhoto')}
            />
          )}
        </div>
      </div>
    </div>
  );
};
