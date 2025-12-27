export class ApiResponse {
  static success(data: any, message: string = 'Success') {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message: string, code: number = 400, details?: any) {
    return {
      success: false,
      message,
      code,
      details,
      timestamp: new Date().toISOString(),
    };
  }
}
