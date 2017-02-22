import store from 'react-native-simple-store';

export function setupAccount() {
  let data = {
    name: 'Jason',
    points: 0,
    listsIds: ['c4ltz3k7g3g5p32z9f6r', 'aufu0n3k5jri787d5cdi']
  };
  let list1 = {
    id: 'c4ltz3k7g3g5p32z9f6r',
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
  };
  let list2 = {
    id: 'aufu0n3k5jri787d5cdi',
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
  };

  return Promise
    .all([
      store.save('account', data),
      store.save('c4ltz3k7g3g5p32z9f6r', list1),
      store.save('aufu0n3k5jri787d5cdi', list2)
    ])
    .catch(error => {
      console.error(error.message);
    });
}

export function getAccount() {
  return store
    .get('account')
    .catch(error => {
      console.error(error.message);
    });
}

export function addList(title) {
  const id = Math.random().toString(36).substring(7);

  let data = {
    id,
    title: title,
    time: new Date().getTime(),
    activePoints: 0,
    inactivePoints: 0,
    items: {
      active: [],
      inactive: []
    }
  }

  return Promise
    .all([
      store.save(id, data),
      store.get('account').then((account) => {
        let listsIds = account.listsIds;
        return store.update('account', {listsIds: [...listsIds, id]});
      })
    ])
    .catch(error => {
      console.error(error.message);
    });
}

export function getList(id) {
  return store
    .get(id)
    .catch(error => {
      console.error(error.message);
    });
}
