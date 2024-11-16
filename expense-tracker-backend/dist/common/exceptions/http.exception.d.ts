export declare class HttpException extends Error {
    readonly message: string;
    readonly statusCode: number;
    readonly errors?: Record<string, string[]>;
    constructor(message: string, statusCode: number, errors?: Record<string, string[]>);
}
export declare class BadRequestException extends HttpException {
    constructor(message?: string, errors?: Record<string, string[]>);
}
export declare class UnauthorizedException extends HttpException {
    constructor(message?: string);
}
export declare class ForbiddenException extends HttpException {
    constructor(message?: string);
}
export declare class NotFoundException extends HttpException {
    constructor(message?: string);
}
