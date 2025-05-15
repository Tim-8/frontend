import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";

export function authInterceptor(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('auth_token');

    if (token) {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(authReq);
    }
    
    return next.handle(req);
}