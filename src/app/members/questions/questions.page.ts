import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router  } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  qsForm: FormGroup;
  alertMessage: string;
  isQuestsExist: boolean;

  singleChoice: any[] = [
    {
      nbr: '1',
      question: 'I feel cheerful and in good spirits.',
      choice1: 'At no time',
      choice2: 'Some of the time',
      choice3: 'Less than half of the time',
      choice4: 'More than half of the time',
      choice5: 'All of the time',
      choice: ''
    },{
      nbr: '2',
      question: 'I feel calm and relaxed.',
      choice1: 'At no time',
      choice2: 'Some of the time',
      choice3: 'Less than half of the time',
      choice4: 'More than half of the time',
      choice5: 'All of the time',
      choice: ''
    },{
      nbr: '3',
      question: 'I feel active and vigorous.',
      choice1: 'At no time',
      choice2: 'Some of the time',
      choice3: 'Less than half of the time',
      choice4: 'More than half of the time',
      choice5: 'All of the time',
      choice: ''
    },{
      nbr: '4',
      question: 'I feel fresh and rested.',
      choice1: 'At no time',
      choice2: 'Some of the time',
      choice3: 'Less than half of the time',
      choice4: 'More than half of the time',
      choice5: 'All of the time',
      choice: ''
    },{
      nbr: '5',
      question: 'My life is filled with things that interest me.',
      choice1: 'At no time',
      choice2: 'Some of the time',
      choice3: 'Less than half of the time',
      choice4: 'More than half of the time',
      choice5: 'All of the time',
      choice: ''
    },
    ];

  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private apiService: ApiService) { 
    this.qsForm = this.formBuilder.group({
      quests: this.formBuilder.array([
        this.initQuests()
      ])
    });

  }

  ngOnInit() {
    this.isQuestsExist = false;
    let self = this;
    this.apiService.getQuests().subscribe((quests:any) => {
      this.isQuestsExist = false;
      if(quests !== undefined){
        this.isQuestsExist = true; 
        for(let index = 0; index < quests.data.length; index++) {
          this.singleChoice[index].choice = quests.data[index];
        }
      }
      this.qsForm = this.formBuilder.group({
        quests: this.setQuest(this.singleChoice)
      });
    })
  }

  ionViewWillEnter() {
    this.alertMessage = "";
  }


  initQuests() {
    return this.formBuilder.group({
      nbr: '',
      question: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      choice5: '',
      choice: '',
    });
  }

  setQuest(quests: any) {
    const arr = new FormArray([]);
    quests.forEach((q: any) => {
      arr.push(this.formBuilder.group({
        nbr: q.nbr,
        question: q.question,
        choice1: q.choice1,
        choice2: q.choice2,
        choice3: q.choice3,
        choice4: q.choice4,
        choice5: q.choice5,
        choice: q.choice
      }));
    });
    return arr;
  }

  onSubmit() {
    const submitData: number[] = [];
    this.qsForm.value.quests.forEach((qu: any) => {
      if(qu.choice === undefined) {
        this.alertMessage = 'Please answer the all questions';
        return;
      }
      submitData.push(qu.choice);

      if(submitData.length === 5) {
        if(this.isQuestsExist) {
          this.apiService.updateQuests({data: submitData}).then(res => {
            this.router.navigate(['/members/map']);
          }, err => {
            this.alertMessage = err.message;
          });
        } else {
          this.apiService.createQuests({data: submitData}).then(res => {
            this.router.navigate(['/members/map']);
          }, err => {
            this.alertMessage = err.message;
          });
        }
      }
    });
  }

  skip() {
    this.router.navigate(['/members/map']);
  }
}
