import { Component, OnInit } from '@angular/core';
import {Bicycle, Car, Transport} from "../../classes/permaculture/transport";

@Component({
  selector: 'app-transport-speed-calculator',
  templateUrl: './transport-speed-calculator.component.html',
  styleUrls: ['./transport-speed-calculator.component.scss']
})
export class TransportSpeedCalculatorComponent implements OnInit {

  car: Car
  bicycle: Bicycle
  private _currency: string = '€'

  constructor() { }

  ngOnInit() {
  }

}
