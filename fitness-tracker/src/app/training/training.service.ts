import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService
{
    private availableExercises: Exercise[]=[];
    private runningExercise: Exercise;
    exerciseChanged=new Subject<Exercise>();
    exercisesChanged=new Subject<Exercise[]>();
    finishedExercisesChanged=new Subject<Exercise[]>();
    private firebaseSubscriptions: Subscription[]=[];

    constructor(private db: AngularFirestore, private uiService: UIService){}

    fetchAvailableExercises()
    {
        this.uiService.loadingStateChanged.next(true);
        this.firebaseSubscriptions.push(this.db.collection('availableExercises').snapshotChanges()
        .pipe(map(docArray=>{
          return docArray.map(doc=>{
            return{
              id: doc.payload.doc.id,
              ...doc.payload.doc.data() as Exercise
            };
          });
        })).subscribe((exercises: Exercise[])=>{
            this.uiService.loadingStateChanged.next(false);
            this.availableExercises=exercises;
            this.exercisesChanged.next([...this.availableExercises]);
        }, error=>{
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar('Fetching exercise failed, try again later!', null, 3000);
            this.exercisesChanged.next(null);
        }));
    }

    startExercise(selectedId: string)
    {
        this.runningExercise=this.availableExercises.find(ex=>ex.id===selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    getRunningExercise()
    {
        return {...this.runningExercise};
    }

    completeExercise()
    {
        this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise=null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number)
    {
        this.addDataToDatabase({...this.runningExercise, 
                                date: new Date(), 
                                state: 'cancelled',
                                duration: this.runningExercise.duration*(progress/100),
                                calories: this.runningExercise.calories*(progress/100),
                            });
        this.runningExercise=null;
        this.exerciseChanged.next(null);
    }

    fetchCompletedOrCanceledExercises()
    {
        this.firebaseSubscriptions.push(this.db.collection('finishedExercises').valueChanges()
        .subscribe((exercises: Exercise[])=>{
            this.finishedExercisesChanged.next(exercises);
        }));
    }

    private addDataToDatabase(exercise: Exercise)
    {
        this.db.collection('finishedExercises').add(exercise);
    }

    cancelSubscriptions()
    {
        this.firebaseSubscriptions.forEach(subscription=>subscription.unsubscribe());
    }
}