import { Component } from '@angular/core';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" />
        <button class="primary" type="button">Search</button>
      </form>
    </section>
  `,
styles: ['./home.component.css']
})
export class HomeComponent {
  title= 'Home'
}
