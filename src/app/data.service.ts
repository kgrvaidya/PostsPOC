import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn:"root",
})

export class DataService {

    constructor( private http: HttpClient) { }
    
    getPosts() {
        return this.http.get<any[]>("https://jsonplaceholder.typicode.com/posts/").toPromise();
        // return new Promise(async (resolve, reject) => {
        //     let posts: any[] = [];
        //     const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
        //     posts = await response.json();
        //     console.log("Posts ",posts)

        //     // ;
        //     resolve(posts);
        // })
        
        
    }


    getComments() {
        return this.http.get<any[]>("https://jsonplaceholder.typicode.com/comments").toPromise()
    }
        
}