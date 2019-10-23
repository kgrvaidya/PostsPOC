import { Injectable } from '@angular/core';

@Injectable({
    providedIn : "root",
})

export class Pagination {

    Data:any[] = [];
    pagesList:any[] = [];
    DataPerPage:number = 20;
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

    paginate(clickedPage) {
        this.newData = this.Data.slice( (clickedPage-1)*this.DataPerPage, (clickedPage-1)*this.DataPerPage + this.DataPerPage );
        this.DataStart = ((clickedPage-1)*this.DataPerPage + 1);
        this.DataEnd = (clickedPage-1)*this.DataPerPage + this.DataPerPage;
        let data = {
            data : this.newData,
            start : this.DataStart,
            end : this.DataEnd
        }
        return data;    
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
        this.pagesList = []; //Initialise PageList to empty array;
        
        if(this.noOfPages < this.listLength ) // If pages are less than 5, display all of the pages
            for(let i=1; i<=this.noOfPages; i++){
                this.pagesList.push(i);
            }
        
        else {
                if((this.noOfPages - currPage) >= 5) {   //If there are more than 5 pages bewteen current page and last page
                    for(let i=0; i<this.listLength; i++){
                        this.pagesList.push(currPage + i);
                    }
                }
                else {
                    for(let i = (this.noOfPages - 4); i<=this.noOfPages; i++){  //Last 5 pages
                        this.pagesList.push(i);
                    }                
                }  
            }
        return this.pagesList;        
    }
}