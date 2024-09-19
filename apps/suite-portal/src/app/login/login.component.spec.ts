import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Import this
import { By } from '@angular/platform-browser';


class MockAuthService {
  isAuthenticated$ = of(false);
  login(id: string, password: string): boolean {
    return id === 'mockId' && password === 'mockPassword';
  }
  logout() {
    this.isAuthenticated$ = of(false);
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule 
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login form with ID and password fields', () => {
    const idField = fixture.debugElement.query(By.css('input[formControlName="id"]'));
    const passwordField = fixture.debugElement.query(By.css('input[formControlName="password"]'));

    expect(idField).toBeTruthy();
    expect(passwordField).toBeTruthy();
  });

  it('should navigate to admin on successful login', () => {
    spyOn(authService, 'login').and.callThrough();
    spyOn((component as any).router, 'navigate');
    
    component.loginForm.setValue({ id: 'mockId', password: 'mockPassword' });
    component.login();

    expect(authService.login).toHaveBeenCalledWith('mockId', 'mockPassword');
    expect((component as any).router.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should display an alert on failed login', () => {
    spyOn(authService, 'login').and.returnValue(false);
    spyOn(window, 'alert');
    
    component.loginForm.setValue({ id: 'wrongId', password: 'wrongPassword' });
    component.login();
    
    expect(window.alert).toHaveBeenCalledWith('Invalid ID or Password');
  });
});
