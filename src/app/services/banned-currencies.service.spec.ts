import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { BannedCurrenciesService, BannedCurrency } from './banned-currencies.service';
import { Constants } from '../utils/constants';


describe('BannedCurrenciesService', () => {
  let service: BannedCurrenciesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BannedCurrenciesService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(BannedCurrenciesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    const req = httpMock.expectOne(Constants.currBanList);
    req.flush({ bannedCurrencies: [] });

    expect(service).toBeTruthy();
  });

  it('should load banned currencies on initialization', () => {
    const mockBannedCurrencies: BannedCurrency[] = [
      { code: 'RUB' },
      { code: 'BYN' }
    ];

    const mockResponse = { bannedCurrencies: mockBannedCurrencies };

    // Simulate HTTP request
    const req = httpMock.expectOne(Constants.currBanList);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    // Check if banned currencies are set correctly
    const currencyBanlist = service.getCurrencyBanlist();
    expect(currencyBanlist.length).toBe(2);
    expect(currencyBanlist[0].code).toBe('RUB');
    expect(currencyBanlist[1].code).toBe('BYN');
  });

  it('should handle HTTP error when loading banned currencies', () => {
    // Spy on console.error to check error logging
    const consoleErrorSpy = spyOn(console, 'error');

    // Simulate HTTP error
    const req = httpMock.expectOne(Constants.currBanList);
    req.error(new ProgressEvent('Network error'));

    // Verify error handling
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error loading banned currencies:',
      jasmine.any(Object)
    );
  });

  it('should correctly identify banned currencies', () => {
    const mockBannedCurrencies: BannedCurrency[] = [
      { code: 'RUB' },
      { code: 'BYN' }
    ];

    const req = httpMock.expectOne(Constants.currBanList);
    req.flush({ bannedCurrencies: mockBannedCurrencies });

    // Test isCurrencyBanned method
    expect(service.isCurrencyBanned('RUB')).toBeTrue();
    expect(service.isCurrencyBanned('BYN')).toBeTrue();
    expect(service.isCurrencyBanned('GBP')).toBeFalse();
  });

  it('should return an empty list before currencies are loaded', () => {
    const req = httpMock.expectOne(Constants.currBanList);
    req.flush({ bannedCurrencies: [] });
    const currencyBanlist = service.getCurrencyBanlist();

    expect(currencyBanlist.length).toBe(0);
  });
});
