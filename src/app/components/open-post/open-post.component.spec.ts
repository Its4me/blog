import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPostComponent } from './open-post.component';

describe('OpenPostComponent', () => {
  let component: OpenPostComponent;
  let fixture: ComponentFixture<OpenPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
