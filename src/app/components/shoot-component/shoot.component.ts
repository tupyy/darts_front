import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-shoot',
    templateUrl: './shoot.component.html',
    styleUrls: ['./shoot.component.css']
})
export class ShootComponent implements OnInit {
    form: FormGroup;
    @Input() shootLabel: string;
    @Input() id: number;
    @Output() scoreChanged = new EventEmitter<number[]>();

    private buttonsDisabled: boolean;
    private inputDone: boolean;
    matcher = new MyErrorStateMatcher();

    constructor(private fb: FormBuilder) {
        this.buttonsDisabled = false;
        this.inputDone = false;
        this.form = this.fb.group({
            shootControl: [null, [Validators.required, this.scoreValidator]]
        });


        this.form.get('shootControl').valueChanges.subscribe((val) => {
            this.scoreChanged.emit([this.id, val]);
        });
    }

    ngOnInit() {
    }

    onButtonClick(i: number): void {
        if (this.form.get('shootControl').value == null || this.form.get('shootControl').value === 0) {
            return;
        }
        this.inputDone = true;
        this.form.get('shootControl').setValue(i * this.form.get('shootControl').value);
        this.buttonsDisabled = true;
    }

    scoreValidator(c: FormControl) {
        const errors: ValidationErrors = {};

        if (c.value > 60) {
            errors.score = {message: 'Score cannot be greater than 60.'};
        }

        return Object.keys(errors).length ? errors : null;

    }
}

