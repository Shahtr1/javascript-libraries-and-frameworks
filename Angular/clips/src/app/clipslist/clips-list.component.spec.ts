import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipslistComponent } from './clipslist.component';

describe('ClipslistComponent', () => {
  let component: ClipslistComponent;
  let fixture: ComponentFixture<ClipslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClipslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClipslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
