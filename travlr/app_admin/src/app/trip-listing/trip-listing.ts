import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripCardComponent } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripData]
})
export class TripListingComponent implements OnInit {

  trips!: Trip[];
  message: string = '';

  constructor(private tripDataService: TripData) {
    console.log('trip-listing constructor');
  }

  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          if (value.length > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          } else {
            this.message = 'There were no trips retrieved from the database';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}