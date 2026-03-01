import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ScanOptionsModal.css';

interface ScanOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (file: File) => void;
}

export const ScanOptionsModal: React.FC<ScanOptionsModalProps> = ({
  isOpen,
  onClose,
  onSelectFile,
}) => {
  const { t } = useTranslation();
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    // Check for camera availability
    if (!navigator.mediaDevices?.enumerateDevices) {
      setHasCamera(false);
      return;
    }
    navigator.mediaDevices
      .enumerateDevices()
      .then(devices => {
        setHasCamera(devices.some(d => d.kind === 'videoinput'));
      })
      .catch(() => setHasCamera(false));
  }, [isOpen]);

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onSelectFile(file);
        onClose();
      }
      // Reset so the same file can be selected again
      e.target.value = '';
    },
    [onSelectFile, onClose]
  );

  const handlePhotoClick = useCallback(() => {
    photoInputRef.current?.click();
  }, []);

  const handleCameraClick = useCallback(() => {
    cameraInputRef.current?.click();
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="scan-options-overlay"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="scan-options-dialog">
        <h2>{t('scan.chooseSource')}</h2>

        {/* Hidden file inputs */}
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          onChange={handleFile}
        />

        <div className="scan-options-list">
          <button className="scan-option-btn" onClick={handlePhotoClick}>
            <span className="scan-option-icon">🖼️</span>
            <span className="scan-option-text">
              <span className="scan-option-title">{t('scan.fromPhoto')}</span>
              <span className="scan-option-desc">{t('scan.fromPhotoDesc')}</span>
            </span>
          </button>

          <button
            className="scan-option-btn"
            onClick={handleCameraClick}
            disabled={hasCamera === false}
            title={hasCamera === false ? t('scan.cameraNotAvailable') : undefined}
          >
            <span className="scan-option-icon">📷</span>
            <span className="scan-option-text">
              <span className="scan-option-title">{t('scan.fromCamera')}</span>
              <span className="scan-option-desc">
                {hasCamera === false ? t('scan.cameraNotAvailable') : t('scan.fromCameraDesc')}
              </span>
            </span>
          </button>
        </div>

        <div className="scan-options-cancel">
          <button onClick={onClose}>{t('cancel')}</button>
        </div>
      </div>
    </div>
  );
};
