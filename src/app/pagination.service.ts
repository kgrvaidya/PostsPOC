import { Injectable } from '@angular/core';

@Injectable({
    providedIn : "root",
})

export class Pagination {

    Data:any[] = [];
    pagesList:any[] = [];
    DataPerPage:number = 40;
    noOfPages:number = 1;
    currentPage:number = 1;
    newData:any[] = [];
    DataStart:number=1;
    DataEnd:number=this.DataStart+ this.DataPerPage - 1;
    listLength:number = 5; //Max 5 items are displayed at once in pagination

    constructor() { }
    
    ngOnInit() { }

    setData(data):number {
        this.Data = data;
        this.noOfPages = Math.ceil(this.Data.length / this.DataPerPage);
        return this.noOfPages;
    }

    paginate(clickedPage) : any[] {
        this.newData = this.Data.slice( (clickedPage-1)*this.DataPerPage, (clickedPage-1)*this.DataPerPage + this.DataPerPage );
        this.DataStart = ((clickedPage-1)*this.DataPerPage + 1);
        this.DataEnd = (clickedPage-1)*this.DataPerPage + this.DataPerPage;
        return this.newData;    
    }

    previousPage (page) {
        if(page > 1) {
            this.paginate(page-1)
        }
    }

    nextPage(page){
        if(page != this.pagesList[this.listLength-1]){
            this.paginate(page+1);
        }
    }

    getPageList(currPage) : any[] {
        console.log("Clicked Page : ", currPage);
        
        // If pages are more than 5, display set of 5 pages
        this.pagesList = [];
        
        if(this.noOfPages < this.listLength )
            for(let i=1; i<=this.noOfPages; i++){
                this.pagesList.push(i);
            }
        
        else {
            if((this.noOfPages - currPage) > 5) {   
                // console.log("Difference : ", (this.noOfPages - currPage), "Total Pages : ",this.noOfPages, "Current Page : ", currPage)             
                
                for(let i=0; i<this.listLength; i++){
                    this.pagesList.push(currPage + i);
                    // console.log("when there are atleast 5 pages b/w current page and last page");
                }
                // console.log(this.pagesList);
            }
            else {
                for(let i = (this.noOfPages - 5); i<=this.noOfPages; i++){
                    this.pagesList.push(i);
                }                
            }
            
        }
        return this.pagesList;

        
    }

    onClick(page){
        this.paginate(page);
        // this.getPageList(page);
    }
}