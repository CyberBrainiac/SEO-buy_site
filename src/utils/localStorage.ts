import localforage from 'localforage';

export const locKeys = {
  userProfl: 'SP_userProfl',
  inputData: 'SP_inputData',
  fileName: 'SP_fileName',
  excelColumnInfo: 'SP_excelColumnInfo',
  indexThematicityRequest: 'SP_indexThematicityRequest',
  linkInsertionRequest: 'SP_linkInsertionRequest',
};

async function set(key: string, data: object | string) {
  return localforage
    .setItem(key, data)
    .then(result => result)
    .catch(err => {
      console.error('Set from local forage error', err);
      return null;
    });
}

async function get(key: string) {
  return localforage
    .getItem(key)
    .then(result => result)
    .catch(err => {
      console.error('Get from local forage error', err);
      return null;
    });
}

async function remove(key: string) {
  return localforage
    .removeItem(key)
    .then(result => result)
    .catch(err => {
      console.error('Remove from local forage error', err);
      return null;
    });
}

async function clear() {
  return localforage
    .clear()
    .then(result => result)
    .catch(err => {
      console.error('Clear local forage error', err);
      return null;
    });
}

const locStorage = {
  set,
  get,
  remove,
  clear,
};

export default locStorage;

// function set(
//   key: string,
//   /* eslint-disable */
//   data: any
//   /* eslint-enable */
// ) {
//   try {
//     localStorage.setItem(key, JSON.stringify(data));
//   } catch (error) {
//     console.error('Parse Error "set to session storage"', error);
//   }
// }

// function get(key: string) {
//   const data = localStorage.getItem(key);
//   if (!data) return null;
//   return JSON.parse(data);
// }
