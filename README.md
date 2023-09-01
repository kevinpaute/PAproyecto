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



  
