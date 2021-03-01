import { Component, OnInit } from '@angular/core';

// Forms
import { FormGroup , FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-tramite-formulario',
  templateUrl: './tramite-formulario.page.html',
  styleUrls: ['./tramite-formulario.page.scss'],
})
export class TramiteFormularioPage implements OnInit {
  form: FormGroup;
  portafolios: FormArray;

  form_1_visible: boolean = false;
  form_2_visible: boolean = false;
  form_3_visible: boolean = true;
  form_4_visible: boolean = false;

  constructor () { }

  ngOnInit() {
    this.form = new FormGroup ({
      metodo_pago: new FormControl ('tarjeta', [Validators.required]),
      portafolios: new FormArray ([])
    });

    this.portafolios = this.form.get('portafolios') as FormArray
  }

  agregar_portafolio () {
    const control = new FormGroup ({
      tipo_portafolio: new FormControl ('audaz', [Validators.required]),
      porcentaje: new FormControl (0, [Validators.required]),
    });

    this.portafolios.push (control);
  }
}
