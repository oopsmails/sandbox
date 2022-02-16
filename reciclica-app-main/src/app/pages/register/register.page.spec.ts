import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { UserRegister } from 'src/app/model/user/UserRegister';
import { LocationService } from 'src/app/services/location/location.service';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { register, registerFail, registerSuccess } from 'src/store/register/register.actions';
import { registerReducer } from 'src/store/register/register.reducers';
import { RegisterPageModule } from './register.module';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: "home", loadChildren: () => import('./../../pages/home/home.module').then( m => m.HomePageModule) }
        ]),
        ReactiveFormsModule,
        RegisterPageModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        StoreModule.forFeature("register", registerReducer)
      ]
    })
    .overrideProvider(Geolocation, {useValue: new GeolocationMock()})
    .overrideProvider(LocationService, {useValue: new LocationServiceMock()})
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should create register form on page init', () => {
    fixture.detectChanges();

    expect(component.registerForm).not.toBeUndefined();
  })

  it('should not be allowed to register with form invalid', () => {
    fixture.detectChanges();

    clickOnRegisterButton()

    store.select("register").subscribe(state => {
      expect(state.isRegistering).toBeFalsy();
    })
  })

  it('given form is valid, when user clicks on register, then register', () => {
    fixture.detectChanges();
    
    fillForm();
    
    clickOnRegisterButton();

    store.select("register").subscribe(state => {
      expect(state.isRegistering).toBeTruthy();
    })
  })

  it('given form is valid, when user clicks on register, then show loading', () => {
    fixture.detectChanges();
    
    fillForm();
    
    clickOnRegisterButton();

    store.select("loading").subscribe(state => {
      expect(state.show).toBeTruthy();
    })
  })

  it('given page init, when geolocation is enabled, then fill address details with user location', fakeAsync(() => {
    fixture.detectChanges();

    tick(10);

    expect(component.registerForm.getForm().value.address).toEqual({
      street: 'geocoded_street',
      number: 'geocoded_number',
      neighborhood: 'geocoded_neighborhood',
      zipCode: 'geocoded_zipCode',
      complement: '',
      state: 'geocoded_state',
      city: 'geocoded_city'
    })
  }))

  it('should hide loading component when registration successful', () => {
    fixture.detectChanges();

    store.dispatch(register({userRegister: new UserRegister()}));
    store.dispatch(registerSuccess());

    store.select('loading').subscribe(state => {
      expect(state.show).toBeFalsy();
    })
  })

  it('should login when registration successful', () => {
    fixture.detectChanges();

    store.dispatch(register({userRegister: new UserRegister()}));
    store.dispatch(registerSuccess());

    store.select('login').subscribe(state => {
      expect(state.isLoggingIn).toBeTruthy();
    })
  })

  it('should hide loading component when registration fails', () => {
    fixture.detectChanges();

    store.dispatch(register({userRegister: new UserRegister()}));
    store.dispatch(registerFail({error: {message: 'any message'}}));

    store.select('loading').subscribe(state => {
      expect(state.show).toBeFalsy();
    })
  })

  it('should show error when registration fails', () => {
    fixture.detectChanges();

    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    store.dispatch(register({userRegister: new UserRegister()}));
    store.dispatch(registerFail({error: {message: 'any message'}}));

    expect(toastController.create).toHaveBeenCalled();
  })

  function clickOnRegisterButton() {
    page.querySelector('ion-button').click();
  }

  function fillForm() {
    component.registerForm.getForm().get('name').setValue("anyName");
    component.registerForm.getForm().get('email').setValue("any@email.com");
    component.registerForm.getForm().get('password').setValue("anyPassword");
    component.registerForm.getForm().get('repeatPassword').setValue("anyPassword");
    component.registerForm.getForm().get('phone').setValue("anyPhone");
    component.registerForm.getForm().get('address').get('street').setValue("any street");
    component.registerForm.getForm().get('address').get('number').setValue("any number");
    component.registerForm.getForm().get('address').get('complement').setValue("any complement");
    component.registerForm.getForm().get('address').get('neighborhood').setValue("any neighborhood");
    component.registerForm.getForm().get('address').get('zipCode').setValue("any zip code");
    component.registerForm.getForm().get('address').get('city').setValue("any city");
    component.registerForm.getForm().get('address').get('state').setValue("any state");
  }

  class GeolocationMock {
    getCurrentPosition() {
      return Promise.resolve({
        coords: {
          latitude: 1,
          longitude: 2
        }
      })
    }
  }

  class LocationServiceMock {
    geocode(location) {
      return of({
        address_components: [
          {long_name: "geocoded_street", types: ["route"]},
          {long_name: "geocoded_number", types: ["street_number"]},
          {long_name: "geocoded_neighborhood", types: ["sublocality"]},
          {long_name: "geocoded_zipCode", types: ["postal_code"]},
          {short_name: "geocoded_state", types: ["administrative_area_level_1"]},
          {long_name: "geocoded_city", types: ["administrative_area_level_2"]},
        ]
      })
    }
  }

});
