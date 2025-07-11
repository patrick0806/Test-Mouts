export class ExceptionDetail {
  message: string;
  additionalProperties: Array<Record<string, any>>;

  constructor(
    message: string,
    additionalProperties: Array<Record<string, any>>,
  ) {
    this.message = message;
    this.additionalProperties = additionalProperties;
  }
}

export class ExceptionDTO {
  timestamp: string;
  status: number;
  error: string;
  path: string;
  message: string;
  code?: string;
  details?: ExceptionDetail[];

  constructor(
    status: number,
    error: string,
    path: string,
    message: string,
    details?: ExceptionDetail[],
  ) {
    this.timestamp = new Date().toISOString();
    this.status = status;
    this.error = error;
    this.path = path;
    this.message = message;
    this.details = details;
  }
}
