export declare function generateHash(password: string): string;
export declare function compareHash(password: string, hashedPassword: string): Promise<boolean>;
