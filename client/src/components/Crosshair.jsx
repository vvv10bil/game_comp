export function Crosshair({ size = 24, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="2" fill={color} />
      <path d="M16 2 V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 22 V30" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M2 16 H10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M22 16 H30" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
