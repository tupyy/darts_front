import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

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

    private manuallyValueSet = false;
    matcher = new MyErrorStateMatcher();

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            shootControl: [null, [this.scoreValidator]]
        });

        this.form.get('shootControl').valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged())
            .subscribe((val) => {
                if (val == null) {
                    val = 0;
                }
                if (!this.manuallyValueSet) {
                    this.scoreChanged.emit([this.id, val]);
                }
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

    setValue(value: number, manually = false) {
        if (manually) {
            this.manuallyValueSet = true;
            this.form.get('shootControl').setValue(value);
            this.manuallyValueSet = false;
        }
    }

    getValue() {
        return this.form.get('shootControl').value;
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

