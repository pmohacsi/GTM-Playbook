import type { RoleType } from "../data/gtmData";
import { ROLE_LABELS, ROLE_COLORS } from '../data/gtmData';

interface RoleBadgeProps {
  role: RoleType;
  size?: 'sm' | 'md';
}

export function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
  const colors = ROLE_COLORS[role];
  const label = ROLE_LABELS[role];
  const sizeClass = size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-1';

  return (
    <span
      className={`inline-flex items-center rounded font-medium ${sizeClass}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      {label}
    </span>
  );
}
