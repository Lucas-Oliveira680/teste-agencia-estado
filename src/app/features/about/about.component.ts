import { Component } from '@angular/core';
import {NzCollapseModule} from "ng-zorro-antd/collapse";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NzCollapseModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
