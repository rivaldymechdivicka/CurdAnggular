import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Position } from "../position";
import { PlayersService } from "../players.service";
import { PositionsService } from "../positions.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  positions: Position[] = [];
  createForm: FormGroup; // Define type

  constructor(
    public playersService: PlayersService,
    public positionsService: PositionsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.formBuilder.group({
      shirtNo: ['', Validators.required],
      name: ['', Validators.required],
      positionId: [''],
      appearances: [''],
      goals: [''],
    });
  }

  ngOnInit(): void {
    this.positionsService.getPositions().subscribe((data: Position[]) => {
      this.positions = data;
    });
  }

  onSubmit(formData: FormGroup) {
    if (this.createForm.valid) {
      this.playersService.createPlayer(this.createForm.value).subscribe(res => {
        this.router.navigateByUrl('players/list');
      });
    } else {
      // Handle form validation errors here
    }
  }
}
