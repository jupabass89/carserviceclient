import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { APP_URL } from '../shared/constants';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;
  cars: Array<any>;
  checkedOwners = [];

  constructor(
    private router: Router,
    private ownerService: OwnerService,
    private carService: CarService
  ) { }

  ngOnInit() {
    this.ownerService.getAllOwners().subscribe(data => {
      this.owners = data._embedded.owners;
      this.owners = this.owners.map(item => ({ ...item, checked: false }));
    });
    this.carService.getAll().subscribe(data => {
      this.cars = data;
    });
  }

  getCheckedOwners() {
    this.checkedOwners = this.owners.filter(x => x.checked === true);
  }

  getOwnerId(href) {
    return href.replace(APP_URL.MAIN + APP_URL.OWNER_ROUTE + '/', '');
  }

  onDelete() {
    // this.checkedOwners.forEach(owner => {
    //   const car = this.cars.find(item => item.ownerDni === owner.dni);
    //   car.ownerDni = null;
    //   console.log(car);
    //   this.carService.save(car).subscribe(() => {});
    // });
    const toDeleteOwners = this.checkedOwners.map(x => this.getOwnerId(x._links.owner.href));
    toDeleteOwners.forEach(ownerId => {
      this.ownerService.deleteOwner(ownerId).subscribe(() => { });
      this.owners = this.owners.filter(x => x.checked === false);
    });

  }

  onEdit(owner) {
    const ownerId = this.getOwnerId(owner._links.owner.href);
    this.router.navigate(['owner-edit/' + ownerId]);
  }
}
