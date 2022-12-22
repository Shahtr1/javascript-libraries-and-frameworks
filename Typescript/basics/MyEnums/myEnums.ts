enum SeatChoice {
  AISLE = "aisle",
  MIDDLE = 3,
  WINDOW,
  FOURTH,
}

enum SeatChoiceError {
  AISLE = "aisle",
  MIDDLE,
  WINDOW,
  FOURTH,
}

// use const to avoid creating js code
// see IIFE.png and with_const.png

const enum SeatChoiceWithoutIIFE {
  AISLE = "aisle",
  MIDDLE = 3,
  WINDOW,
  FOURTH,
}

const hcSeat = SeatChoice.AISLE;
