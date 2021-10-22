import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/Tipo';
import { TiposService } from 'src/app/services/tipos.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['../listagem-categorias/listagem-categorias.component.css'],
})
export class NovaCategoriaComponent implements OnInit {
  formulario: any;
  tipos!: Tipo[];
  erros!: string[];

  constructor(
    private tiposService: TiposService,
    private categoriasService: CategoriasService,
    private router: Router,
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.erros = [];
    this.tiposService.PegarTodos().subscribe((resultado) => {
      this.tipos = resultado;
    });

    this.formulario = new FormGroup({
      nome: new FormControl(null),
      icone: new FormControl(null),
      tipoId: new FormControl(null),
    });
  }

  get propriedade() {
    return this.formulario.controls;
  }

  EnviarFormulario(): void {
    const categoria = this.formulario.value;
    this.erros = [];

    this.categoriasService.NovaCategoria(categoria).subscribe((resultado) => {
      this.router.navigate(['categorias/listagemcategorias']);
      this.snackBar.open(resultado.mensagem, '', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      });
    },
    (err) => {
      console.log(err);
      if (err.status === 400) {
        for(const campo in err.error.errors){
          if(err.error.errors.hasOwnProperty(campo)){
            console.log(err.error.errors[campo])
            this.erros.push(err.error.errors[campo]);
          }
        }
      }
    });
  }

  VoltarListagem() : void{
    this.router.navigate(['categorias/listagemcategorias'])
  };
}
