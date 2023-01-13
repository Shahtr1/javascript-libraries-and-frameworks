// Encapsulation

const makeNuclearButton = () => {
  let timeWithoutDestruction = 0;
  const passTime = () => timeWithoutDestruction++;
  const totalPeaceTime = () => timeWithoutDestruction;
  const launch = () => {
    timeWithoutDestruction = -1;
    return "boom";
  };
  setInterval(passTime, 1000);
  return {
    // launch, // we can hide it so people dont have access over it, so just comment it, hence encapsulation
    totalPeaceTime,
  };
};

const ohno = makeNuclearButton();
ohno.totalPeaceTime();
