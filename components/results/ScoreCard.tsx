import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ScoreCardProps {
  score: number;
  apply: boolean;
  size?: number;
}

export default function ScoreCard({ score, apply, size = 96 }: ScoreCardProps) {
  const isInvalid = typeof score !== 'number' || Number.isNaN(score);
  const clamped = isInvalid ? 0 : Math.max(0, Math.min(100, score));

  const color =
    clamped >= 75
      ? 'var(--color-success)'
      : clamped >= 50
        ? 'var(--color-warning)'
        : 'var(--color-danger)';

  return (
    <div className="score-row">
      {/* Ring */}
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <CircularProgressbar
          value={clamped}
          styles={buildStyles({
            pathColor: isInvalid ? 'var(--color-danger)' : color,
            trailColor: 'var(--surface-2, #e5e7eb)',
            strokeLinecap: 'round',
            pathTransitionDuration: 0.6,
          })}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isInvalid
              ? 'var(--color-danger)'
              : 'var(--color-text-primary)',
          }}
        >
          {isInvalid ? (
            <CircleAlert size={size * 0.35} strokeWidth={1.75} />
          ) : (
            <span
              style={{ fontSize: size * 0.32, fontWeight: 600, lineHeight: 1 }}
            >
              {clamped}
            </span>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="score-meta">
        <div className="score-label">Match score</div>
        <div className="score-value">{clamped}/100</div>

        {/* Apply badge */}
        {!isInvalid && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: 999,
              width: 'fit-content',
              color: apply ? 'var(--color-success)' : 'var(--color-danger)',
              background: apply
                ? 'var(--color-success-subtle, #f0fdf4)'
                : 'var(--color-danger-subtle, #fef2f2)',
            }}
          >
            {apply ? (
              <CircleCheck size={13} strokeWidth={2.5} />
            ) : (
              <CircleX size={13} strokeWidth={2.5} />
            )}
            {apply ? 'Apply' : "Don't Apply"}
          </div>
        )}

        <div className="score-desc">
          How well this CV matches the job description
        </div>
      </div>
    </div>
  );
}
