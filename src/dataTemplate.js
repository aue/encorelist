export const account = {
  name: 'Jason',
  points: 19,
  listsIds: ['key1', 'key2'],
}

export const lists = {
  key1: {
    title: 'Today',
    activePoints: 2,
    inactivePoints: 1,
    items: {
      active: [{
        title: 'Pet a cat',
        points: 2,
      }, {
        title: 'Go to work',
        points: 0,
      }, {
        title: 'Adopt a cat',
        points: 0,
      }],
      inactive: [{
        title: 'Give the cat a treat',
        points: 1,
      }]
    }
  },
  key2: {
    title: 'Tommorrow',
    activePoints: 2,
    inactivePoints: 1,
    items: {
      active: [{
        title: 'Pet a cat',
        points: 2,
      }, {
        title: 'Go to work',
        points: 0,
      }, {
        title: 'Adopt a cat',
        points: 0,
      }],
      inactive: [{
        title: 'Give the cat a treat',
        points: 1,
      }]
    }
  }
}
