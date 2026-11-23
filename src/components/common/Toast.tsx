import { useToast } from '../../context/ToastContext';

export function ToastViewport() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((item) => (
        <div key={item.id} className={`toast ${item.kind}`} onClick={() => dismiss(item.id)} role="status">
          {item.message}
        </div>
      ))}
    </div>
  );
}
