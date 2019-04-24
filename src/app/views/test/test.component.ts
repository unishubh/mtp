import { Component, OnInit } from '@angular/core';
import {ContractsService} from '../../contracts.service';
import { CssSelector } from '@angular/compiler';
import { async } from 'q';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(public cs: ContractsService) { }

  ngOnInit() {
  }

  async checkUser() {
let t = this.cs.checkUser();
    //console.log(t);
  }

}
