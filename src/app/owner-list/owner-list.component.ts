import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owners: Array<any>;
  checkedOwners = [];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getAllOwners().subscribe(data => {
      this.owners = data._embedded.owners;
      this.owners = this.owners.map(item => ({ ...item, checked: false }));
    });
  }

  getCheckedOwners() {
    this.checkedOwners = this.owners.filter(x => x.checked === true).map(x => x.name);
  }

  onDelete() {
    this.owners = this.owners.filter(x => x.checked === false);
    console.log(this.checkedOwners);
  }
}
