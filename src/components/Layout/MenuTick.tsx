export interface MenuTickProps {
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
}

export const MenuTick: React.VFC<MenuTickProps> = (props) => {
  const { className, style, strokeWidth = 8 } = props;

  return (
    <svg viewBox="0 0 36 60" width={36} className={className} style={style}>
      <line
        x1={32}
        y1={6}
        x2={6}
        y2={54}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};
