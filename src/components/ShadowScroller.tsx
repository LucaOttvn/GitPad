interface ShadowScrollerProps {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  width?: string;
  height?: string;
  deg?: string
}

export default function ShadowScroller(props: ShadowScrollerProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: props.top,
        bottom: props.bottom,
        left: props.left,
        right: props.right,
        background: `linear-gradient(${props.deg || 0}deg, transparent 30%, var(--lightBlack) 80%)`,
        width: props.width,
        height: props.height,
      }}
    ></div>
  );
}
