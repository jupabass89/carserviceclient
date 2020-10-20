import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService,  } from '../shared/car/car.service';
import { APP_URL } from '../shared/constants';
import { GiphyService } from '../shared/giphy/giphy.service';
import { OwnerService,  } from '../shared/owner/owner.service';

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
              private router: Router,
              private ownerService: OwnerService
    ) { }

  ngOnInit() {
    this.carService.getAll().subscribe(data => {
      this.cars = data;
      for (const car of this.cars) {
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      }
    });
    this.ownerService.getAllOwners().subscribe(data => {
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
        .replace(APP_URL.MAIN + APP_URL.OWNER_ROUTE + '/', '');
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


