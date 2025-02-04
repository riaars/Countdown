import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit  {
  title= 'Frontend Challenge'

  eventName: string = "Christmas Eves"
  eventDate: string = "2025-12-24"
  timeLeft: string = ""

  timeInterval: any

  @ViewChild('titleElement') titleElement!: ElementRef;
  @ViewChild('counterElement') counterElement!: ElementRef;


  ngAfterViewInit() {
    this.loadFromStorage()
    setTimeout(() => this.adjustFontSizes(), 0);
    window.addEventListener('resize', this.adjustFontSizes.bind(this));
  }

  @HostListener('window:resize') onResize() {
    this.adjustFontSizes();
  }

  updateEvent (e: Event, field: string) {
    const value = (e.target as HTMLInputElement).value
    if (field === 'name') {
      this.eventName = value
    } else if (field === 'date') {
      this.eventDate = value
      
      this.startCountdown();
      
    }
    this.saveToStorage()
    setTimeout(() => this.adjustFontSizes(), 0)

  }

  saveToStorage() {
    localStorage.setItem('eventName', this.eventName)
    localStorage.setItem('eventDate', this.eventDate)
  }

  loadFromStorage() {
    this.eventName = localStorage.getItem('eventName') || ""
    this.eventDate = localStorage.getItem('eventDate') || ""
    this.startCountdown()
  }

  startCountdown() {
    if(this.timeInterval) {
      clearInterval(this.timeInterval)
    }

    this.timeInterval = setInterval(()=> {
      this.timeToEvent()
    }, 1000)

    this.timeToEvent()
  }


  timeToEvent() {
    if(!this.eventDate) return

    const eventDate = new Date(this.eventDate)
    const currentDate = new Date()
    const timeLeft = eventDate.getTime() - currentDate.getTime()

    if(timeLeft<0) {
      this.timeLeft = "Event has already happened"
    } else {     
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

      this.timeLeft = `${days} days, ${hours} h, ${minutes} m, ${seconds}s`
      
    }
  }

  adjustFontSizes() {
    this.adjustFontSize(this.titleElement);
    this.adjustFontSize(this.counterElement)
  }

  adjustFontSize(elementRef: ElementRef) {
    const parent = elementRef.nativeElement.parentElement;
    const text = elementRef.nativeElement;
    
    let fontSize = 100; 
    text.style.fontSize = `${fontSize}px`;

    while (text.scrollWidth > parent.clientWidth && fontSize > 10) {
      fontSize -= 1;
      text.style.fontSize = `${fontSize}px`;
    }

    while (text.scrollWidth < parent.clientWidth && fontSize < 300) {
      fontSize += 1;
      text.style.fontSize = `${fontSize}px`;

      if (text.scrollWidth > parent.clientWidth) {
        text.style.fontSize = `${fontSize - 1}px`;
        break;
      }
    }
  }

}
