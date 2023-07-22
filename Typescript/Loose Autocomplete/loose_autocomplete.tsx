type IconType = "application" | "settings" | "user" | "trash" | (string & {}); // WTF
// with this & {} it deosnt collapses the union somehow

type IconProps = {
  icon: IconType;
};

const Icon = (props: IconProps) => {
  return null;
};

<>
<Icon icon="" />
</>
