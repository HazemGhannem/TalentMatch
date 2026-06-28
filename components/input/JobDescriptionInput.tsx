interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}
export default function JobDescriptionInput({
  value,
  onChange,
  disabled = false,
}: JobDescriptionInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="step-header">
        <span className="step-num">1</span>
        <span className="step-title">Paste the job description</span>
      </div>

      <textarea
        className="textarea"
        rows={10}
        placeholder="Paste the full job posting here — responsibilities, requirements, nice-to-haves..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />

      <div className="flex justify-between items-center">
        <span className="upload-sub">{value.length} characters</span>
        {value.length > 0 && value.length < 100 && (
          <span className="badge badge-warning">
            Looks short — add more detail
          </span>
        )}
      </div>
    </div>
  );
}
