import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments/enviroment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiGetProducts = `${enviroment.apiBaseUrl}/products`;

    constructor(private http: HttpClient) {}

    getProducts(keyword: string, categoryId: number,
        page: number, limit: number): Observable<Product[]> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('categoryId', categoryId)
            .set('page', page.toString())
            .set('limit', limit.toString())
        return this.http.get<Product[]> (this.apiGetProducts, { params });
    }

    getDetailProduct(productId: number) {
        return this.http.get<Product>(`${enviroment.apiBaseUrl}/products/${productId}`);
    }

    getProductsByIds(productIds: number[]): Observable<Product[]> {
        // Chuyển danh sách ID thành một chuỗi và truyền vào params
        debugger
        const params = new HttpParams().set('ids', productIds.join(',')); 
        return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`, { params });
      }
}