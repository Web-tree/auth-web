import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUnionComponent } from './select-union.component';

describe('SelectUnionComponent', () => {
  let component: SelectUnionComponent;
  let fixture: ComponentFixture<SelectUnionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectUnionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUnionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
