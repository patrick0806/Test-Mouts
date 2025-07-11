import 'dotenv/config';
declare const _default: () => {
    application: {
        port: any;
        env: any;
    };
    database: {
        host: any;
        port: any;
        name: any;
        user: any;
        password: any;
    };
    redis: {
        host: any;
        port: any;
        ttl: any;
    };
    jwt: {
        secret: any;
        expiresIn: string;
    };
};
export default _default;
