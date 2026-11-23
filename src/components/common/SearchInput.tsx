import type { IconName } from '../../utils/icons';
import { Icon } from './Icon';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  inputRef?: React.Ref<HTMLInputElement>;
}

export function SearchInput({ value, onChange, placeholder, label, inputRef }: SearchInputProps) {
  return (
    <input
      ref={inputRef}
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={label}
    />
  );
}

export function InlineSearchIcon({ name = 'search' }: { name?: IconName }) {
  return <Icon name={name} />;
}
