import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartphoneContentComponent } from './smartphone-content.component';

describe('SmartphoneContentComponent', () => {
  let component: SmartphoneContentComponent;
  let fixture: ComponentFixture<SmartphoneContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartphoneContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartphoneContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
