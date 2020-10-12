import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getAllOwners().subscribe(data => {
      this.owners = data._embedded.owners;
    });
  }
}
