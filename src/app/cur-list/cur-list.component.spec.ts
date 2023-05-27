import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurListComponent } from './cur-list.component';

describe('CurListComponent', () => {
  let component: CurListComponent;
  let fixture: ComponentFixture<CurListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurListComponent]
    });
    fixture = TestBed.createComponent(CurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
