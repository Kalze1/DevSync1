import IllustrationCallServiceIcon from "../components/IllustrationCallServiceIcon";
import SizeMIconStartFalseIcon from "../components/SizeMIconStartFalseIcon";
import VariantTextSizeLColorSe from "../components/VariantTextSizeLColorSe";
import GroupIcon from "../components/GroupIcon";

const EditProfile = () => {
  return (
    <div className="w-full relative rounded-11xl bg-background-light-01-default h-[982px] overflow-hidden text-left text-base text-black font-manrope">
      <div className="absolute h-[37.07%] w-[20.83%] top-[33.6%] right-[22.82%] bottom-[29.33%] left-[56.35%]">
        <IllustrationCallServiceIcon
          illustrationCallServiceIc="/illustrationcall-service@2x.png"
          illustrationCallServiceIcWidth="91.11%"
          illustrationCallServiceIcHeight="78.85%"
          illustrationCallServiceIcPosition="absolute"
          illustrationCallServiceIcTop="0%"
          illustrationCallServiceIcRight="8.89%"
          illustrationCallServiceIcBottom="21.15%"
          illustrationCallServiceIcLeft="0%"
          illustrationCallServiceIcMaxHeight="100%"
        />
        <div className="absolute top-[342px] left-[4px]">
          <b>{`Select a conversation or start a `}</b>
          <span className="[text-decoration:underline] font-extrabold text-cornflowerblue-200">
            new one
          </span>
        </div>
      </div>
      <div className="absolute top-[978px] left-[512px] box-border w-[1004px] h-2 border-t-[8px] border-solid border-cornflowerblue-200" />
      <div className="absolute top-[35px] left-[212px] text-13xl font-extrabold">
        Profile
      </div>
      <img
        className="absolute top-[40px] left-[154px] w-8 h-8 object-contain"
        alt=""
        src="/caretdown@2x.png"
      />
      <img
        className="absolute top-[137px] left-[257px] rounded-[100px] w-[121px] h-[121px] object-cover"
        alt=""
        src="/avatar@2x.png"
      />
      <SizeMIconStartFalseIcon
        text="Shreyansh shah"
        text1="Name"
        showText
        sizeMIconStartFalseIconBorder="2px solid #5b96f7"
        sizeMIconStartFalseIconPosition="absolute"
        sizeMIconStartFalseIconTop="308px"
        sizeMIconStartFalseIconLeft="170px"
        sizeMIconStartFalseIconHeight="56px"
        textColor="#5b96f7"
      />
      <div className="absolute top-[calc(50%_-_40px)] left-[181px] leading-[24px] font-caption text-text-color-light-01-text-primary">
        <p className="m-0">{`Full Stack Developer | WordPress `}</p>
        <p className="m-0">Developer| WordPress SEO |On Page SEO</p>
      </div>
      <div className="absolute top-[382px] left-[170px] text-sm font-semibold text-gray-100">
        This name is visible to your contacts
      </div>
      <VariantTextSizeLColorSe
        iconBase="/flagbanner.svg"
        text="Save"
        showIconBase={false}
        variantTextSizeLColorSeBorder="1px solid #5b96f7"
        variantTextSizeLColorSePosition="absolute"
        variantTextSizeLColorSeTop="919px"
        variantTextSizeLColorSeLeft="340px"
        variantTextSizeLColorSeWidth="150px"
        iconBaseOverflow="unset"
        textColor="#5b96f7"
      />
      <GroupIcon
        groupIconOverflow="unset"
        groupIconPosition="absolute"
        groupIconTop="0px"
        groupIconLeft="0px"
      />
      <SizeMIconStartFalseIcon
        text1="Github"
        showText
        sizeMIconStartFalseIconBorder="2px solid #5b96f7"
        sizeMIconStartFalseIconPosition="absolute"
        sizeMIconStartFalseIconTop="552px"
        sizeMIconStartFalseIconLeft="170px"
        sizeMIconStartFalseIconHeight="56px"
        textColor="#5b96f7"
      />
      <SizeMIconStartFalseIcon
        text="Shreyansh shah"
        text1="Facebook"
        showText={false}
        sizeMIconStartFalseIconBorder="2px solid #5b96f7"
        sizeMIconStartFalseIconPosition="absolute"
        sizeMIconStartFalseIconTop="642px"
        sizeMIconStartFalseIconLeft="170px"
        sizeMIconStartFalseIconHeight="56px"
        textColor="#5b96f7"
      />
      <SizeMIconStartFalseIcon
        text1="Twitter"
        showText
        sizeMIconStartFalseIconBorder="2px solid #5b96f7"
        sizeMIconStartFalseIconPosition="absolute"
        sizeMIconStartFalseIconTop="732px"
        sizeMIconStartFalseIconLeft="170px"
        sizeMIconStartFalseIconHeight="56px"
        textColor="#5b96f7"
      />
      <SizeMIconStartFalseIcon
        text1="Website"
        showText
        sizeMIconStartFalseIconBorder="2px solid #5b96f7"
        sizeMIconStartFalseIconPosition="absolute"
        sizeMIconStartFalseIconTop="822px"
        sizeMIconStartFalseIconLeft="170px"
        sizeMIconStartFalseIconHeight="56px"
        textColor="#5b96f7"
      />
      <SizeMIconStartFalseIcon
        text="Shreyansh shah"
        text1="About"
        showText={false}
        sizeMIconStartFalseIconBorder="2px solid #5b96f7"
        sizeMIconStartFalseIconPosition="absolute"
        sizeMIconStartFalseIconTop="438px"
        sizeMIconStartFalseIconLeft="170px"
        sizeMIconStartFalseIconHeight="80px"
        textColor="#5b96f7"
      />
    </div>
  );
};

export default EditProfile;
