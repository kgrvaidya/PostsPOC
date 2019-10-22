import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContainerComponent } from "./main-container/main-container.component";
import {CommentsComponent } from "./comments/comments.component";


const routes: Routes = [
  {path : "", component : MainContainerComponent },
  {path : "posts", component : MainContainerComponent },
  {path : "comments", component : CommentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
