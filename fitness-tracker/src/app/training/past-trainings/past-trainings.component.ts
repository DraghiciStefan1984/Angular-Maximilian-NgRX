import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns=['name', 'calories', 'duration', 'state'];
  dataSource=new MatTableDataSource<Exercise>();
  private exercisesChangedSubscription: Subscription;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void 
  { 
    this.exercisesChangedSubscription=this.trainingService.finishedExercisesChanged
        .subscribe((exercises: Exercise[])=>this.dataSource.data=exercises);
    this.trainingService.fetchCompletedOrCanceledExercises();
  }

  ngAfterViewInit(): void 
  {
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

  doFilter(filterValue: string)
  {
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void 
  {
    if(this.exercisesChangedSubscription) this.exercisesChangedSubscription.unsubscribe();
  }
}
