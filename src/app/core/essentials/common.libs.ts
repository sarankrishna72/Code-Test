

/* Converting to Base 64 */
export const encryptBase64 = (name ?: any) => {
  return (btoa(name))
}

/* Decrypting to Base 64 */
export const decryptBase64 = (name ?: any) => {
  return (atob(name))
}

export const checkLocalStorage = (storageName: any) => {
  return getLocalStorageData(storageName) ? true : false
}

export const getLocalStorageData = (storageName: any) => {
  return (localStorage.getItem(storageName) ?  JSON.parse(localStorage.getItem(storageName)) : '');
}

export const setLocalStorageData = (storageName: any, data: any) => {
  localStorage.setItem(storageName, JSON.stringify(data))
}
