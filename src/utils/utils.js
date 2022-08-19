export function storeLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  export function getLocalStorage(key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  }
  
  export function clearLocalStorage() {
    localStorage.clear();
  }
  