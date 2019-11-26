import { Component, OnInit } from '@angular/core';
import { ProductosService } from './productos.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProductoApp';
  lista=null;
  prod = {
    _id: null,
    descripcion: null,
    precio: null,
    imagen: null
  }
  
  uploadedFiles: Array <File>;
  constructor(private productosServicio: ProductosService, private http: HttpClient) {}

  ngOnInit() {
    this.recuperarTodos();
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }
  recuperarTodos() {
    this.productosServicio.listar().subscribe(result => {
      this.lista = result;
    });
  }

  nuevo() {
    let formData = new FormData();
    for(let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('uploads[]', this.uploadedFiles[i], this.uploadedFiles[i].name);  
    }
    formData.append('descripcion', this.prod.descripcion);
    formData.append('precio', this.prod.precio);
    this.productosServicio.nuevo(formData).subscribe(result => {
      console.log(result)
      if (result) {
        this.limpiar();
        this.recuperarTodos();
      }
    });
  }

  eliminar(codigo) {
  	if(!confirm("Esta seguro que desea eliminar este registro?"))
  		return;
    this.productosServicio.eliminar(codigo).subscribe(result => {
      console.log(result)
      if (result=='OK') {
        this.recuperarTodos();
      }
    });
  }

  actualizar() {
    this.productosServicio.actualizar(this.prod).subscribe(result => {
      console.log(result)
      //@ts-ignore
      if (result.affectedRows == '1') {
        this.limpiar();
        this.recuperarTodos();
      }
    });
  }

  mostrar(codigo) {
    this.productosServicio.mostrar(codigo).subscribe(result => {
      console.log(result)
      //@ts-ignore
      this.prod = result[0]
    });
  }

  hayRegistros() {
    return true;
  }
  limpiar(){
    this.prod = {
      _id: null,
      descripcion: null,
      precio: null,
      imagen: null
    };
  }

}
