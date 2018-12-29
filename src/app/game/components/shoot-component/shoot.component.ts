import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
    @Output() inputDone = new EventEmitter<number>();

    @ViewChild('inputShoot') inputShoot: ElementRef;

    matcher = new MyErrorStateMatcher();

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            shootControl: [null, [this.scoreValidator]]
        });

        this.form.get('shootControl').valueChanges.subscribe((val) => {
            if (val == null) {
                val = 0;
            }
            this.scoreChanged.emit([this.id, val]);
        });
    }

    ngOnInit() {
    }

    reset() {
        this.form.get('shootControl').setValue('');
    }

    receivedFocus() {
        this.inputShoot.nativeElement.focus();
    }

    doneInput() {
        if (this.hasValue() && !this.form.invalid) {
            this.inputDone.emit(this.id);
        }
    }

    isValid() {
        return !this.form.invalid;
    }

    hasValue() {
        return !(this.getValue() == null);
    }


    onButtonClick(i: number): void {
        if (!this.hasValue()) {
            return;
        }
        this.form.get('shootControl').setValue(i * this.form.get('shootControl').value);
    }

    getValue() {
        return this.form.get('shootControl').value;
    }

    scoreValidator(c: FormControl) {
        const errors: ValidationErrors = {};

        if (c.value > 60) {
            errors.score = {message: 'Score cannot be greater than 60.'};
        } else if (c.value < 0) {
            errors.score = {message: 'Score cannot be smaller than 0.'};
        }

        return Object.keys(errors).length ? errors : null;
    }
}

