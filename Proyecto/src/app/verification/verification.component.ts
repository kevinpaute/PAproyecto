import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { UsuarioService } from '../usuario.service';





@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
 



  constructor(public dialog: MatDialog, private personaService: UsuarioService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  


}
