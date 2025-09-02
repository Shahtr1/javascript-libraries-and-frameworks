// src/app/features/state-ngrx/products-ngrx.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsBrowserNgrxComponent } from './products-browser-ngrx.component';
import { PRODUCTS_NGRX_FEATURE } from 'src/app/state-ngrx/products-ngrx.selectors';
import { ProductsNgrxEffects } from 'src/app/state-ngrx/products-ngrx.effects';
import { ToInrPipe } from 'src/app/shared/pipes/to-inr.pipe';
import { productsNgrxReducer } from 'src/app/state-ngrx/products-ngrx.reducer';

const routes: Routes = [{ path: '', component: ProductsBrowserNgrxComponent }];

@NgModule({
  declarations: [ProductsBrowserNgrxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToInrPipe, // standalone pipe can be imported into module
    RouterModule.forChild(routes),
    StoreModule.forFeature(PRODUCTS_NGRX_FEATURE, productsNgrxReducer),
    EffectsModule.forFeature([ProductsNgrxEffects]),
  ],
})
export class ProductsNgrxModule {}
