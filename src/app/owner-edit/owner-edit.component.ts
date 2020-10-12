import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit, OnDestroy {
  owner: any = {};
  sub: Subscription;
  id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.carService.getOwner(this.id).subscribe((owner: any) => {
          if (owner) {
            this.owner = owner;
            this.owner.href = owner._links.self.href;
          } else {
            console.log(`Car with id '${this.id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  save(form: NgForm) {
    if (this.id) {
      this.carService.updateOwner(form, this.id).subscribe(() => {
        this.gotoList();
      }, error => console.error(error));
    } else {
      this.carService.saveOwner(form).subscribe(() => {
        this.gotoList();
      }, error => console.error(error));
    }
  }

  remove(href) {
    this.carService.remove(href).subscribe(() => {
      this.gotoList();
    }, error => console.error(error));
  }
}

