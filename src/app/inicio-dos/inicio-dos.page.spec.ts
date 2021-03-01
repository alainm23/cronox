import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InicioDosPage } from './inicio-dos.page';

describe('InicioDosPage', () => {
  let component: InicioDosPage;
  let fixture: ComponentFixture<InicioDosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioDosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioDosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
