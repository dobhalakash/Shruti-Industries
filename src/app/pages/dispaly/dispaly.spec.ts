import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dispaly } from './dispaly';

describe('Dispaly', () => {
  let component: Dispaly;
  let fixture: ComponentFixture<Dispaly>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dispaly]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dispaly);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
