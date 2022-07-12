import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout-from',
  templateUrl: './checkout-from.component.html',
  styleUrls: ['./checkout-from.component.scss'],
})
export class CheckoutFromComponent implements OnInit {
  firstName!: string | null;
  totalPrice!: number;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.firstName = params.get('firstName');
      this.totalPrice = Number(params.get('totalPrice'));
    });
  }
}
