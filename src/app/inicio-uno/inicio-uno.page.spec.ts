import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InicioUnoPage } from './inicio-uno.page';

describe('InicioUnoPage', () => {
  let component: InicioUnoPage;
  let fixture: ComponentFixture<InicioUnoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioUnoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioUnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
