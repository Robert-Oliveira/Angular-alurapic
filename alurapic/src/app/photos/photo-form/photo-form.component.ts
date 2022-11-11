import { Router } from '@angular/router';
import { PhotoService } from './../photo/photo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  photoForm!: FormGroup;
  file!: File;
  preview!: string;
  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  //função para salvar a imagem
  upload() {
    const description = this.photoForm.get('description')!.value;
    const allowComments = this.photoForm.get('allowComments')!.value;
    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe(() => this.router.navigate(['']));
  }
  //função para ter o preview da imagem
  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target?.result);
    reader.readAsDataURL(file);
  }
}
