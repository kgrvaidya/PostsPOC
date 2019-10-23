import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Pagination } from "../pagination.service";



@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  posts:any[] = [];
  newPosts : any[] = [];
  Pages : any[];
  totalPages:number;
  loaded:Boolean = false;
  currentPage:number = 1;
  pointedIndex = 0;
  start:number;
  end:number;

  constructor(private ps : DataService, private pagination:Pagination) { }
  
  ngOnInit() { 
    this.ps.getPosts().then((Posts) => {
      this.posts = Posts;
    })
    .then(() => {
      this.totalPages = this.pagination.setData(this.posts);
      this.currentPage = 1;
      this.setThingsOnPage(1);
    })

  }

  onClick(page){
    this.currentPage = this.Pages[page];
    this.setThingsOnPage(this.currentPage);
  }

  previous(){
    if (this.currentPage > 1) {
      this.setThingsOnPage(this.currentPage - 1);
      this.currentPage-=1;
    }
  }

  next(){
    if (this.currentPage < this.totalPages) {
        this.setThingsOnPage(this.currentPage + 1);
        this.currentPage+=1;
      }
  }
  
  firstPage(){
    this.setThingsOnPage(1);
    this.currentPage=1;
  }

  lastPage(){
    this.setThingsOnPage(this.totalPages);
    this.currentPage = this.totalPages;    
  }

  setThingsOnPage(pageNumber){
    this.loaded = false;
    let res = this.pagination.paginate(pageNumber);
    this.newPosts = res.data;
    this.start = res.start;
    this.end = res.end;
    this.Pages = this.pagination.getPageList(pageNumber);
    this.pointedIndex = this.Pages.indexOf(pageNumber);   
    this.loaded = true;
  }

}
