import { useSync } from '../../context/SyncContext';

export function SyncIndicator() {
  const { state, label, cycle } = useSync();

  return (
    <div className="sync" data-s={state} role="status" title="Click to cycle demo states" onClick={cycle}>
      <span className="dot" />
      <span className="t">{label}</span>
    </div>
  );
}
