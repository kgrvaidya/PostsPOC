import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  posts:any[] = [];
  pagesList:number[] = [];
  loaded:boolean = false;
  postsPerPage:number = 20;
  noOfPages:number = 1;
  currentPage:number=1;
  totalPosts=0;
  newPosts:any[] = [];
  postStart:number=1;
  postEnd:number=this.postStart+ this.postsPerPage - 1;

  constructor() { this.fetchData();}
  
  ngOnInit() { 
  }

  paginate(clickedPage) {
    this.newPosts = this.posts.slice( (clickedPage-1)*this.postsPerPage, (clickedPage-1)*this.postsPerPage + this.postsPerPage );
    this.postStart = ((clickedPage-1)*this.postsPerPage + 1);
    this.postEnd = (clickedPage-1)*this.postsPerPage + this.postsPerPage;
    this.currentPage = clickedPage;
  }

  getPageList(){
    this.noOfPages = Math.ceil(this.posts.length / this.postsPerPage);
    for(let i=1; i<=this.noOfPages; i++){
      this.pagesList.push(i);
    }
  }

  onClick(page){
    this.paginate(page);
  }

  fetchData(){
    fetch('https://jsonplaceholder.typicode.com/posts/')
    .then(response => response.json())
    .then(json => this.posts = json)
    .then(() => { 
      this.totalPosts = this.posts.length;
      this.getPageList();
      this.paginate(1);
      this.loaded = true;
    });
  }
  

}
