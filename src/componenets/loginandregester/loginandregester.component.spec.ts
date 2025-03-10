import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginandregesterComponent } from './loginandregester.component';

describe('LoginandregesterComponent', () => {
  let component: LoginandregesterComponent;
  let fixture: ComponentFixture<LoginandregesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginandregesterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginandregesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
