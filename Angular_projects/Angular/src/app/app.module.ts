import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ProductsState } from './state-ngxs/products-ngxs.state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductsNgrxModule } from './features/ngrx-demo/products-ngrx.module';
import { HasRoleDirective } from './shared/directives/has-role.directive';
import { FormsModule } from '@angular/forms';
import { SlotCardComponent } from './features/view-api/slot-card.component';

const devImports = [];
if (isDevMode()) {
  devImports.push(
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 400 }),
  );
}
// that’s because in Angular 15 with AOT, isDevMode() can’t be used directly in the module imports array
// since it’s a runtime call, not a compile-time constant.
// we’ll fix it by moving the conditional logic outside of the @NgModule metadata.

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ...devImports, // safe: computed before the decorator runs

    // NgXS
    NgxsModule.forRoot([ProductsState]),
    NgxsLoggerPluginModule.forRoot({ collapsed: true, disabled: false }),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    // NgRX
    StoreModule.forRoot({}, {}), // root (empty for now)
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    ProductsNgrxModule,

    HasRoleDirective,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
