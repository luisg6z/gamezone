import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class RpcCustomExceptionFilter extends BaseRpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const response = host.switchToHttp().getResponse();

    const rpcException = exception.getError();

    if (typeof rpcException === 'object' &&
        'statusCode' in rpcException &&
        'message' in rpcException
    ) {
      const statusCode = isNaN(+rpcException.statusCode) ? 400 : +rpcException.statusCode;

        return response.status(statusCode).json(rpcException);
    }

    response.status(401).json({
        statusCode: 400,
        message: rpcException,
    })
  }
}
