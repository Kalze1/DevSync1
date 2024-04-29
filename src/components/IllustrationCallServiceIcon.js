import { useMemo } from "react";

const IllustrationCallServiceIcon = ({
  illustrationCallServiceIc,
  illustrationCallServiceIcWidth,
  illustrationCallServiceIcHeight,
  illustrationCallServiceIcPosition,
  illustrationCallServiceIcTop,
  illustrationCallServiceIcRight,
  illustrationCallServiceIcBottom,
  illustrationCallServiceIcLeft,
  illustrationCallServiceIcMaxHeight,
}) => {
  const illustrationCallServiceIconStyle = useMemo(() => {
    return {
      width: illustrationCallServiceIcWidth,
      height: illustrationCallServiceIcHeight,
      position: illustrationCallServiceIcPosition,
      top: illustrationCallServiceIcTop,
      right: illustrationCallServiceIcRight,
      bottom: illustrationCallServiceIcBottom,
      left: illustrationCallServiceIcLeft,
      maxHeight: illustrationCallServiceIcMaxHeight,
    };
  }, [
    illustrationCallServiceIcWidth,
    illustrationCallServiceIcHeight,
    illustrationCallServiceIcPosition,
    illustrationCallServiceIcTop,
    illustrationCallServiceIcRight,
    illustrationCallServiceIcBottom,
    illustrationCallServiceIcLeft,
    illustrationCallServiceIcMaxHeight,
  ]);

  return (
    <img
      className="w-[287px] max-w-full overflow-hidden h-[287px] object-cover"
      alt=""
      src={illustrationCallServiceIc}
      style={illustrationCallServiceIconStyle}
    />
  );
};

export default IllustrationCallServiceIcon;
