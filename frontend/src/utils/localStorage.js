import secureLocalStorage from "react-secure-storage";

/**
 * Initializes a state using the provided setState function with the data stored in local storage
 * under the given storage name.
 *
 * @param {string} storageName - The name of the storage item.
 * @param {Function} setState - The state setting function.
 */
export function getLocalStorage(storageName, setState) {
  const dataInStorage = secureLocalStorage.getItem(storageName);
  if (dataInStorage) setState(dataInStorage);
}

/**
 * Sets the data in local storage under the given storage name.
 *
 * @param {string} storageName - The name of the storage item.
 * @param {string} data - The data to store in local storage.
 */
export function setLocalStorage(storageName, data) {
  secureLocalStorage.setItem(storageName, data);
}
