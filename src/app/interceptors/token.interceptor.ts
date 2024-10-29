import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";


// phai dang ky Interceptor trong module
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    // inject
    constructor(private tokenService: TokenService) {

    }

    intercept( // trên đường truyền dữ liệu ta chèn thêm cái gì vào
        req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        if (token) {
            // them token vao headers, clone là vì ta không thể sủa trực tiếp được mà phải nhân bản nó
            // ra sửa trên bản sao rồi lấy thằng cũ tham chiếu tới thằng mới
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }
        return next.handle(req); // sau khi chen cho di tiep
    }

}