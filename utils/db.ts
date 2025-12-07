
const DB_NAME = 'NagorikAssetsDB';
const STORE_NAME = 'images';
const DB_VERSION = 1;

interface DBEntry {
  id: string;
  data: string; // Base64 string
  timestamp: number;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

export const saveImageToDB = async (id: string, data: string): Promise<void> => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.put({ id, data, timestamp: Date.now() });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error saving to DB:', err);
  }
};

export const getImageFromDB = async (id: string): Promise<string | null> => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => {
        const result = request.result as DBEntry | undefined;
        resolve(result ? result.data : null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error reading from DB:', err);
    return null;
  }
};
