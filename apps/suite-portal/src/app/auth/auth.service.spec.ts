import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user with correct credentials', () => {
    const result = service.login('mockId', 'mockPassword');
    expect(result).toBe(true);
    service.isAuthenticated$.subscribe(isAuthenticated => {
      expect(isAuthenticated).toBe(true);
    });
  });

  it('should not authenticate user with incorrect credentials', () => {
    const result = service.login('wrongId', 'wrongPassword');
    expect(result).toBe(false);
    service.isAuthenticated$.subscribe(isAuthenticated => {
      expect(isAuthenticated).toBe(false);
    });
  });

  it('should log out the user', () => {
   
    service.login('mockId', 'mockPassword');
    expect(service.isAuthenticated).toBe(true);

    
    service.logout();
    expect(service.isAuthenticated).toBe(false);
  });

  it('should correctly return authentication status', () => {
  
    expect(service.isAuthenticated).toBe(false);

    
    service.login('mockId', 'mockPassword');
    expect(service.isAuthenticated).toBe(true);

    service.logout();
    expect(service.isAuthenticated).toBe(false);
  });
});
