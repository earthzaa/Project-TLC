const cal_pos = (tier = 0, level = 0) => {
  const init_pos = {
    x: 150,
    y: 100
  }
  const factor_pos = {
    x: 210,
    y: 200
  }

  return ({
    position: {
      x: init_pos.x + (factor_pos.x * parseInt(tier)),
      y: init_pos.y + (factor_pos.y * parseInt(level))
    }
  })
}

export const getStateProperty = (index = 0) => {
  switch(index) {
    default: 
    case 0:
      return({
        id: 'Idle',
        ...cal_pos(0, 1)
      })
    case 1:
      return({
        id: 'Size L',
        ...cal_pos(1, 0)
      })
    case 2:
      return({
        id: 'Size M',
        ...cal_pos(1, 1)
      })
    case 3:
      return({
        id: 'Size S',
        ...cal_pos(1, 2)
      })
    case 4:
      return({
        id: 'Noodle L',
        ...cal_pos(2, 0)
      })
    case 5:
      return({
        id: 'Noodle M',
        ...cal_pos(2, 1)
      })
    case 6:
      return({
        id: 'Noodle S',
        ...cal_pos(2, 2)
      })
    case 7:
      return({
        id: 'Top A+',
        ...cal_pos(3, 0)
      })
    case 8:
      return({
        id: 'Top B+',
        ...cal_pos(3, 1)
      })
    case 9:
      return({
        id: 'Top A-',
        ...cal_pos(4, 0)
      })
    case 10:
      return({
        id: 'Top B-',
        ...cal_pos(4, 1)
      })
    case 11:
      return({
        id: 'Submit',
        ...cal_pos(5, 0)
      })
  }
}