import { useMemo } from "react";

const VariantTextSizeLColorSe = ({
  iconBase,
  text,
  showIconBase,
  variantTextSizeLColorSeBorder,
  variantTextSizeLColorSePosition,
  variantTextSizeLColorSeTop,
  variantTextSizeLColorSeLeft,
  variantTextSizeLColorSeWidth,
  iconBaseOverflow,
  textColor,
}) => {
  const variantTextSizeLColorSeStyle = useMemo(() => {
    return {
      border: variantTextSizeLColorSeBorder,
      position: variantTextSizeLColorSePosition,
      top: variantTextSizeLColorSeTop,
      left: variantTextSizeLColorSeLeft,
      width: variantTextSizeLColorSeWidth,
    };
  }, [
    variantTextSizeLColorSeBorder,
    variantTextSizeLColorSePosition,
    variantTextSizeLColorSeTop,
    variantTextSizeLColorSeLeft,
    variantTextSizeLColorSeWidth,
  ]);

  const iconBaseStyle = useMemo(() => {
    return {
      overflow: iconBaseOverflow,
    };
  }, [iconBaseOverflow]);

  const text1Style = useMemo(() => {
    return {
      color: textColor,
    };
  }, [textColor]);

  return (
    <div
      className="rounded-lg flex flex-row items-center justify-center py-[11px] px-3 gap-[8px] text-left text-mini text-secondary-03-main font-caption border-[1px] border-solid border-secondary-03-main"
      style={variantTextSizeLColorSeStyle}
    >
      {showIconBase && (
        <img
          className="w-6 relative h-6 overflow-hidden shrink-0 object-cover"
          alt=""
          src={iconBase}
          style={iconBaseStyle}
        />
      )}
      <b className="relative leading-[26px]" style={text1Style}>
        {text}
      </b>
    </div>
  );
};

export default VariantTextSizeLColorSe;
