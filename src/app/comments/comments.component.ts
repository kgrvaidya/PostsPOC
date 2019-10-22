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
  loaded:Boolean = false;
  currentPage : 1;
  pointedIndex = 0;

  constructor(private ps : DataService, private pagination:Pagination) { }
  
  ngOnInit() { 
    this.ps.getComments().then((CommentsList) => {
      this.Comments = CommentsList;
    })
    .then(() => {
      this.pagination.setData(this.Comments);
      this.currentPage = 1;
      this.pointedIndex = 0;
      this.slicedComments = this.pagination.paginate(1);
      this.Pages = this.pagination.getPageList(1);
      this.loaded = true;
    })

  }

  onClick(page){
    this.loaded = false;
    this.slicedComments = this.pagination.paginate(this.Pages[page]);
    this.Pages = this.pagination.getPageList(this.Pages[page]);
    this.pointedIndex = this.Pages.indexOf(this.Pages[page]);
    this.currentPage = this.Pages[page];
    this.loaded = true;
    
  }

}
