export const locKeys = {
  excelData: 'TI_userExcelData',
  userQuery: 'TI_userQuery',
  userProfl: 'SP_user-profl',
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
