import { useCallback, useRef, useState, DragEvent, ChangeEvent } from 'react';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function validateFile(file: File): string | null {
  const isPDF =
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isPDF) return 'Only PDF files are supported.';
  if (file.size > MAX_SIZE) return 'File is too large — max 10MB.';
  return null;
}

interface UseCVUploadOptions {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function useCVUpload({
  onFileSelect,
  disabled = false,
}: UseCVUploadOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (candidate: File) => {
      const validationError = validateFile(candidate);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      onFileSelect(candidate);
    },
    [onFileSelect],
  );

  const openPicker = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const onDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled],
  );

  const onDragLeave = useCallback(() => setIsDragging(false), []);

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) handleFile(dropped);
    },
    [disabled, handleFile],
  );

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) handleFile(selected);
      e.target.value = '';
    },
    [handleFile],
  );

  return {
    inputRef,
    isDragging,
    error,
    openPicker,
    dropzoneProps: { onDragOver, onDragLeave, onDrop },
    inputProps: { onChange: onInputChange },
  };
}
