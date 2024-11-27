class IndexDB {
    private db?: IDBDatabase;
    readonly stores = [
        {
            name: 'last_generated',
            keyPath: 'id',
            indexes: [
                { name: 'date', key: 'date', options: { unique: false } },
                { name: 'data', key: 'data', options: { unique: false } }
            ]
        }
    ];

    constructor() {}

    async init(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open('quickcv', 1);

            request.onerror = (event) => {
                console.error("IndexedDB initialization error:", event);
                reject(new Error("Failed to initialize IndexedDB"));
            };

            request.onsuccess = (event) => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = request.result;
                this.stores.forEach(store => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        const objectStore = db.createObjectStore(store.name, { 
                            keyPath: store.keyPath, 
                            autoIncrement: true 
                        });
                        store.indexes.forEach(index => {
                            objectStore.createIndex(index.name, index.key, index.options);
                        });
                    }
                });
                this.db = db;
            };
        });
    }

    private ensureDBInitialized(): void {
        if (!this.db) {
            throw new Error('IndexedDB not initialized. Call init() first.');
        }
    }

    async get<T>(storeName: string, key: any): Promise<T | null> {
        this.ensureDBInitialized();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onerror = (event) => {
                console.error(`Error fetching from ${storeName}:`, event);
                reject(event);
            };

            request.onsuccess = (event) => {
                resolve(request.result as T | null);
            };
        });
    }

    async put<T>(storeName: string, data: T): Promise<IDBValidKey> {
        this.ensureDBInitialized();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onerror = (event) => {
                console.error(`Error putting data to ${storeName}:`, event);
                reject(event);
            };

            request.onsuccess = (event) => {
                resolve(request.result);
            };
        });
    }

    async add<T>(storeName: string, data: T): Promise<IDBValidKey> {
        this.ensureDBInitialized();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onerror = (event) => {
                console.error(`Error adding to ${storeName}:`, event);
                if (request.error?.name === 'ConstraintError') {
                    this.put(storeName, data)
                        .then(resolve)
                        .catch(reject);
                } else {
                    reject(event);
                }
            };

            request.onsuccess = (event) => {
                resolve(request.result);
            };
        });
    }
}

const indexdb = new IndexDB();
export default indexdb;