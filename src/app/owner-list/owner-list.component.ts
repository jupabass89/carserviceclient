import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owners: Array<any>;
  checkedOwners = [];

  constructor(private carService: CarService, private router: Router) { }

  ngOnInit() {
    this.carService.getAllOwners().subscribe(data => {
      this.owners = data._embedded.owners;
      this.owners = this.owners.map(item => ({ ...item, checked: false }));
    });
  }

  getCheckedOwners() {
    this.checkedOwners = this.owners.filter(x => x.checked === true)
      .map(x => this.getOwnerId(x._links.owner.href));
  }

  getOwnerId(href) {
    return href.replace('http://thawing-chamber-47973.herokuapp.com/owners/', '');
  }

  onDelete() {
    try {
      console.log(this.checkedOwners);
      this.checkedOwners.forEach(ownerId => {
        this.carService.deleteOwners(ownerId).subscribe(() => { });
        this.owners = this.owners.filter(x => x.checked === false);
      });
    } catch (error) {
      console.log('Cant delete owners');
    }
  }

  onEdit(owner) {
    const ownerId = this.getOwnerId(owner._links.owner.href);
    this.router.navigate(['owner-edit/' + ownerId]);
  }
}
