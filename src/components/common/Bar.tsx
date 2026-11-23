interface BarProps {
  label: string;
  display: string;
  width: number;
}

export function Bar({ label, display, width }: BarProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div className="row sm" style={{ justifyContent: 'space-between' }}>
        <span>{label}</span>
        <b className="num">{display}</b>
      </div>
      <div className="bar">
        <i style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
