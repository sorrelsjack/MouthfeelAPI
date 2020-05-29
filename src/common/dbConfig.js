export const config = {
    authentication: {
        options: {
            userName: process.env.SERVER_USERNAME,
            password: process.env.SERVER_PASSWORD,
        },
        type: 'default'
    },
    server: process.env.SERVER_NAME,
    options: {
        database: process.env.DATABASE_NAME,
        encrypt: true,
        rowCollectionOnDone: true
    }
};