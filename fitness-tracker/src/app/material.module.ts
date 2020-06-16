import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [MatButtonModule, MatIconModule, MatFormFieldModule],
    exports: [MatButtonModule, MatIconModule, MatFormFieldModule],
})
export class MaterialModule{}