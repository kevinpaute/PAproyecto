# PAproyecto
# Proyecto Tercera Unidad 
# Integrantes
# Kevin Paute
# Jhon Zambrano
# Luis Olalla 
# Daniela Gonzalez 


    onFileSelected(event: any) {
        this.imagenSeleccionada = event.target.files[0] as File;
    
        if (this.imagenSeleccionada && this.imagenSeleccionada.type === 'image/png') {
          this.imagenSeleccionada = this.imagenSeleccionada;
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Por favor, selecciona una imagen en formato PNG.',
            icon: 'error'
          });
          this.imagenSeleccionada = null;
        }
    
      }

      async subirImagen() {
    if (this.imagenSeleccionada) {
      try {
        const imagenURL = await this.imagenService.subirImagen(this.imagenSeleccionada);
        console.log('Imagen cargada exitosamente:', imagenURL);
        // Realiza acciones adicionales después de guardar la imagen
      } catch (error) {
        console.log('Error al cargar la imagen:', error);
      }
    } else {
      console.log('Por favor, selecciona una imagen.');
    }
      }

    //Alertas
      mostrarAlerta() {
        Swal.fire({
          title: 'Imagen cargada correctamente',
          text: 'Aceptado',
          icon: 'success',
        }).then((result) => {
          // Este bloque de código se ejecutará después de que el usuario interactúe con la alerta
          if (result.isConfirmed) {
            // Redirige a la URL deseada
            window.location.href = 'http://localhost:4200/imagen';
          }
        });
      }
    
      recargar() {
        // Redirige a la URL deseada para recargar la página
        window.location.href = 'http://localhost:4200/imagen';
      }

      

      <h1>Cargar Imagen</h1>
    
      <form (submit)="subirImagen()" enctype="multipart/form-data">
        
        <input class="custom-file-input" type="file" (change)="onFileSelected($event)" accept="image/png">
    
        <div class="col-lg-4 col-md-4 flex-container">
          <button type="submit" [disabled]="imagenSeleccionada === null" (click)="mostrarAlerta()">Subir Imagen</button>
          <button type="submit" (click)="recargar()">Cancelar</button>
        </div>
    
      </form>
    
    </div>
        
    describe('AppComponent', () => {
      let fixture: ComponentFixture<ImagenComponent>;
    
      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [HttpClientModule],
          declarations: [AppComponent],
        }).compileComponents();
      });
    
      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [HttpClientModule],
          declarations: [AppComponent],
          providers: [UsuarioService],
        }).compileComponents();
      });
    }

    beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagenComponent],
    }).compileComponents();
      });
    
      beforeEach(() => {
        fixture = TestBed.createComponent(ImagenComponent);
        fixture.detectChanges();
      });


      it('debe tener un campo de entrada que acepte solo imágenes en formato PNG', () => {
        const inputDebugEl = fixture.debugElement.query(By.css('input[type=file]'));
        expect(inputDebugEl.nativeElement.accept).toBe('image/png');
      });
    });

      .container {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-top: 15%;
    }
    
    h1 {
      text-align: center;
    }
    
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
