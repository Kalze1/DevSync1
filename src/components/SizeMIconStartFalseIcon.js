import { useMemo } from "react";

const SizeMIconStartFalseIcon = ({
  text,
  text1,
  showText,
  sizeMIconStartFalseIconBorder,
  sizeMIconStartFalseIconPosition,
  sizeMIconStartFalseIconTop,
  sizeMIconStartFalseIconLeft,
  sizeMIconStartFalseIconHeight,
  textColor,
}) => {
  const sizeMIconStartFalseIconStyle = useMemo(() => {
    return {
      border: sizeMIconStartFalseIconBorder,
      position: sizeMIconStartFalseIconPosition,
      top: sizeMIconStartFalseIconTop,
      left: sizeMIconStartFalseIconLeft,
      height: sizeMIconStartFalseIconHeight,
    };
  }, [
    sizeMIconStartFalseIconBorder,
    sizeMIconStartFalseIconPosition,
    sizeMIconStartFalseIconTop,
    sizeMIconStartFalseIconLeft,
    sizeMIconStartFalseIconHeight,
  ]);

  const textStyle = useMemo(() => {
    return {
      color: textColor,
    };
  }, [textColor]);

  return (
    <div
      className="w-80 rounded-lg box-border h-14 text-left text-base text-text-color-light-01-text-primary font-caption border-[2px] border-solid border-primary-03-main"
      style={sizeMIconStartFalseIconStyle}
    >
      {showText && (
        <div className="absolute top-[calc(50%_-_12px)] left-[14px] leading-[24px]">
          {text}
        </div>
      )}
      <div className="absolute top-[-10px] left-[14px] bg-background-light-01-default flex flex-row items-center justify-start py-0 pr-0.5 pl-[3px] text-xs text-primary-03-main">
        <div className="relative leading-[18px]" style={textStyle}>
          {text1}
        </div>
      </div>
    </div>
  );
};

export default SizeMIconStartFalseIcon;
