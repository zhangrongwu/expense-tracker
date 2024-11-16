"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = exports.ForbiddenException = exports.UnauthorizedException = exports.BadRequestException = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, statusCode, errors) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
        this.name = 'HttpException';
    }
}
exports.HttpException = HttpException;
class BadRequestException extends HttpException {
    constructor(message = '请求参数错误', errors) {
        super(message, 400, errors);
        this.name = 'BadRequestException';
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends HttpException {
    constructor(message = '未授权') {
        super(message, 401);
        this.name = 'UnauthorizedException';
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends HttpException {
    constructor(message = '禁止访问') {
        super(message, 403);
        this.name = 'ForbiddenException';
    }
}
exports.ForbiddenException = ForbiddenException;
class NotFoundException extends HttpException {
    constructor(message = '资源不存在') {
        super(message, 404);
        this.name = 'NotFoundException';
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=http.exception.js.map