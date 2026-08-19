
import RippleFFx from "./RippleFX";
export default function Button(props) {
  const { ffx, ffxMs, ffxClass, onClick, ...rest } = props;

  return (
    <RippleFFx ffx={ffx} ffxMs={ffxMs} ffxClass={ffxClass} onClick={onClick}>
      <button {...rest}>{props.children}</button>
    </RippleFFx>
  );
}