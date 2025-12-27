import { NextResponse } from 'next/server';
import { ApiResponse } from '../utils/ApiResponse';

export abstract class BaseHandler {
  protected async handleWrapper(
    operation: () => Promise<any>
  ): Promise<NextResponse> {
    try {
      const data = await operation();
      return NextResponse.json(ApiResponse.success(data));
    } catch (error: any) {
      console.error('API Error:', error);
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      return NextResponse.json(
        ApiResponse.error(message, statusCode, error.details),
        { status: statusCode }
      );
    }
  }
}
