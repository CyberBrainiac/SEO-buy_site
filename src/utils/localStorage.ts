export const locKeys = {
  userProfl: 'SP_userProfl',
  inputData: 'SP_inputData',
  excelColumnInfo: 'SP_excelColumnInfo',
  indexThematicityRequest: 'SP_indexThematicityRequest',
  linkInsertionRequest: 'SP_linkInsertionRequest',
};

function set(key: string, data: object) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Parse Error "set to session storage"', error);
  }
}

function get(key: string) {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data);
}

const locStorage = {
  set,
  get,
};

export default locStorage;
