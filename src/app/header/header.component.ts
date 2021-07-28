import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    private userSub: Subscription;
    isAuthenticated = false;

    constructor(private dataStorage: DataStorageService,
                private authService: AuthService){}

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user => {
            if(user!=null){
                this.isAuthenticated = true;
            }
            console.log(this.isAuthenticated);
        });
    }

    onLogout(){
        this.authService.logout();
    }
    
    onSaveData(){
        this.dataStorage.storeRecipe();
    }

    onFetchData(){
        this.dataStorage.fetchRecipes().subscribe();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}