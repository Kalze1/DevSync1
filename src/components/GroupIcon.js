import { useMemo } from "react";

const GroupIcon = ({
  groupIconOverflow,
  groupIconPosition,
  groupIconTop,
  groupIconLeft,
}) => {
  const groupIconStyle = useMemo(() => {
    return {
      overflow: groupIconOverflow,
      position: groupIconPosition,
      top: groupIconTop,
      left: groupIconLeft,
    };
  }, [groupIconOverflow, groupIconPosition, groupIconTop, groupIconLeft]);

  return (
    <img
      className="w-[129px] max-w-full overflow-hidden h-[982px]"
      alt=""
      src="/group-18.svg"
      style={groupIconStyle}
    />
  );
};

export default GroupIcon;
