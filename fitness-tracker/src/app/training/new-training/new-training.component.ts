import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy
{
  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  isLoading=false;
  private loadingSubscription: Subscription;

  constructor(private trainingService: TrainingService,
              private uService: UIService) { }

  ngOnInit(): void 
  { 
    this.loadingSubscription=this.uService.loadingStateChanged.subscribe(isLoading=>{
      this.isLoading=isLoading;
    });
    this.exerciseSubscription=this.trainingService.exercisesChanged.subscribe(exercises=>{
      this.exercises=exercises;
    });
    this.fetchExercises();
  }

  onStartTraining(form: NgForm)
  {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises()
  {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(): void 
  {
    if(this.exerciseSubscription) this.exerciseSubscription.unsubscribe();
    if(this.loadingSubscription) this.loadingSubscription.unsubscribe();
  }
}
