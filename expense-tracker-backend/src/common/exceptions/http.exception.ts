export class HttpException extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'HttpException';
  }
}

export class BadRequestException extends HttpException {
  constructor(message = '请求参数错误', errors?: Record<string, string[]>) {
    super(message, 400, errors);
    this.name = 'BadRequestException';
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = '未授权') {
    super(message, 401);
    this.name = 'UnauthorizedException';
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = '禁止访问') {
    super(message, 403);
    this.name = 'ForbiddenException';
  }
}

export class NotFoundException extends HttpException {
  constructor(message = '资源不存在') {
    super(message, 404);
    this.name = 'NotFoundException';
  }
} 