const db = {
    'user': [
        { id: "1", name: 'Erick' }
    ]
};

const list = async (table) => {
    return db[table] || [];
};

const get = async (table, id) => {
    let col = await list(table);
    return col.find(item => item.id === id) || null;
};

const upsert = async (table, data) => {
    if (!db[table]) {
        db[table] = [];
    }
    db[table].push(data);
};

const remove = async (table, id) => {
    return true;
};

const query = async (table, q) => {
    let col = await list(table);
    //Para filtrar la lista retornada según el query de entrada
    let keys = Object.keys(q);

    return col.find(item => 
        item[keys[0]] === q[keys[0]]
    );
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}