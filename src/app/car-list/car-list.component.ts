import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<any>;
  owners;

  constructor(private carService: CarService,
    private giphyService: GiphyService,
    private router: Router
    ) { }

  ngOnInit() {
    this.carService.getAll().subscribe(data => {
      this.cars = data;
      for (const car of this.cars) {
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      }
    });
    this.carService.getAllOwners().subscribe(data => {
      this.owners = data;
    });
  }

  getOwnersName(ownerDni): string {
    try {
      return this.owners._embedded.owners.find(item => item.dni === ownerDni).name;
    } catch (e) {
      return 'No owner';
    }
  }

  getOwnersId(ownerDni) {
    try {
      return this.owners._embedded.owners.find(item => item.dni === ownerDni)._links.owner.href
        .replace('http://thawing-chamber-47973.herokuapp.com/owners/', '');
    } catch (e) {
      return '';
    }
  }

  redirectTo(car) {
    if (this.getOwnersName(car.ownerDni) !== 'No owner') {
      this.router.navigate(['owner-edit/' + this.getOwnersId(car.ownerDni)]);
    }
  }
}


