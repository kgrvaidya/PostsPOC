import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Pagination } from "../pagination.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  Comments:any[] = [];
  slicedComments : any[] = [];
  Pages : any[];
  totalPages:number;
  loaded:Boolean = false;
  currentPage:number = 1;
  pointedIndex = 0;
  start:number;
  end:number;

  constructor(private ps : DataService, private pagination:Pagination) { }
  
  ngOnInit() { 
    this.ps.getComments().then((CommentsList) => {
      this.Comments = CommentsList;
    })
    .then(() => {
      this.totalPages = this.pagination.setData(this.Comments);
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
    this.slicedComments = res.data;
    this.start = res.start;
    this.end = res.end;
    this.Pages = this.pagination.getPageList(pageNumber);
    this.pointedIndex = this.Pages.indexOf(pageNumber);   
    this.loaded = true;
  }

}
