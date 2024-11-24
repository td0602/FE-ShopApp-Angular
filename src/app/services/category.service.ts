import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Category } from '../models/category'
import { InsertCategoryDTO } from '../dtos/category/insert.category.dto'
import { UpdateCategoryDTO } from '../dtos/category/update.category.dto'
import { enviroment } from '../enviroments/enviroment'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiBaseUrl = enviroment.apiBaseUrl

  constructor(private http: HttpClient) {
  }

  getCategories(page: number, limit: number): Observable<Category[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
    return this.http.get<Category[]>(`${enviroment.apiBaseUrl}/categories`, {params})
  }

  getDetailCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiBaseUrl}/categories/${id}`)
  }

  deleteCategory(id: number): Observable<string> {
    // debugger
    return this.http.delete<string>(`${this.apiBaseUrl}/categories/${id}`)
  }

  updateCategory(id: number, updatedCategory: UpdateCategoryDTO): Observable<UpdateCategoryDTO> {
    return this.http.put<Category>(`${this.apiBaseUrl}/categories/${id}`, updatedCategory)
  }

  insertCategory(insertCategoryDTO: InsertCategoryDTO): Observable<any> {
    // Add a new category
    return this.http.post(`${this.apiBaseUrl}/categories`, insertCategoryDTO)
  }
}