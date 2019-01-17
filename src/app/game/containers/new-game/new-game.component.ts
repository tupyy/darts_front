import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GameType} from '../../engine/game-type';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-new-game',
    templateUrl: './new-game.component.html',
    styleUrls: ['./new-game.component.css'],
})
export class NewGameComponent implements OnInit {

    newGameForm: FormGroup;
    players: string[] = [];
    canAddPlayer: boolean;
    canDeletePlayer: boolean;
    canStart: boolean;
    selectedPlayers: [];
    gameTypes = GameType;
    gameTypeKeys = [];

    constructor(private gameService: GameService,
                private fb: FormBuilder,
                private router: Router,
                private authService: AuthService,
                private activatedRoute: ActivatedRoute) {
        this.canAddPlayer = false;
        this.canDeletePlayer = false;
        this.canStart = false;

        this.gameTypeKeys = Object.keys(this.gameTypes)
            .filter(f => !isNaN(Number(f)))
            .map(k => parseInt(k, 10));

        this.newGameForm = this.fb.group({
            gameTypeControl: [null, Validators.required],
            playerInput: [null, [Validators.required]],
            playersSelectionList: [{value: '', disabled: false}, [Validators.required]]
        });

        this.newGameForm.get('playerInput').valueChanges.subscribe(val => {
            this.canAddPlayer = val.length > 0;
        });

        this.newGameForm.get('playersSelectionList').valueChanges.subscribe(val => {
            this.canDeletePlayer = val.length > 0;
        });
    }

    ngOnInit() {
    }

    onSelectionChanged(selectedPlayers) {
        this.selectedPlayers = selectedPlayers;
    }

    addPlayer() {
        let playerName: string;
        playerName = this.newGameForm.get('playerInput').value;
        this.players.push(playerName);
        this.newGameForm.get('playerInput').setValue('');
        this.canStart = true;
    }

    removeSelectedPlayers() {
        for (const selectedPlayer of this.newGameForm.get('playersSelectionList').value) {
            const index = this.players.indexOf(selectedPlayer, 0);
            if (index > -1) {
                this.players.splice(index, 1);
            }
        }
        this.canStart = this.players.length > 0;
    }

    start() {
        this.gameService.startGame(this.newGameForm.get('gameTypeControl').value, this.players);
        this.router.navigate(['../play'], {relativeTo: this.activatedRoute});

    }

}
