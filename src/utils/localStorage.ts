function set(paramName: string, data: object) {
  try {
    localStorage.setItem(paramName, JSON.stringify(data));
  } catch (error) {
    console.error('Parse Error "set to session storage"', error);
  }
}

function get(paramName: string) {
  const data = localStorage.getItem(paramName);
  if (!data) return null;
  return JSON.parse(data);
}

const locStorage = {
  set,
  get,
};

export default locStorage;
