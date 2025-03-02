import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { userReducer } from "./user-store/user.reducer";
import { UserEffects } from "./user-store/user.effects";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot({ users: userReducer }),
        EffectsModule.forRoot([UserEffects]),
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {
}
