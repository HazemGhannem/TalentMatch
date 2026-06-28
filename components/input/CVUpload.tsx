import { useCVUpload } from '@/hooks/usecvUpload';
import { formatSize } from '@/lib/utils';
import { Check, CircleAlert, Upload } from 'lucide-react';

interface CVUploadProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  error?: string | null;
}

export default function CVUpload({
  file,
  onFileSelect,
  disabled = false,
  error = null,
}: CVUploadProps) {
  const {
    inputRef,
    isDragging,
    error: localError,
    openPicker,
    dropzoneProps,
    inputProps,
  } = useCVUpload({
    onFileSelect,
    disabled,
  });

  const displayError = localError || error;

  return (
    <div className="flex flex-col gap-2">
      <div className="step-header">
        <span className="step-num">2</span>
        <span className="step-title">Upload your CV</span>
      </div>

      <div
        className={`upload-zone ${file ? 'has-file' : ''}`}
        onClick={openPicker}
        {...dropzoneProps}
        style={{
          borderColor: isDragging ? 'var(--color-accent)' : undefined,
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {file ? (
          <Check className="upload-icon" size={22} />
        ) : (
          <Upload className="upload-icon" size={22} />
        )}

        {file ? (
          <>
            <span className="upload-text">{file.name}</span>
            <span className="upload-sub">{formatSize(file.size)}</span>
          </>
        ) : (
          <>
            <span className="upload-text">
              Drop your CV here, or click to browse
            </span>
            <span className="upload-sub">PDF only · max 10MB</span>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          disabled={disabled}
          {...inputProps}
        />
      </div>

      {displayError && (
        <div className="result-item">
          <CircleAlert className="result-dot danger" size={14} />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
}
