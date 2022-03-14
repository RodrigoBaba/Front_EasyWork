import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    user: User = new User();

    confPassword: string;
    gen: string;
    userType: string;

    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit() {
        window.scroll(0, 0);
    }

    confirmPassword(event: any) {
        this.confPassword = event.target.value;
    }

    gender(event: any) {
        this.gen = event.target.value;
    }

    typeUser(event: any) {
        this.userType = event.target.value;
    }    

    register() {
        this.user.gender = this.gen
        this.user.type = this.userType

        if (this.confPassword != this.user.password) {
            alert('As senhas não conferem!\nDigite novamente');
        } else {
            this.auth.register(this.user).subscribe((resp: User) => {
                this.user = resp;
                this.router.navigate(['/login']);
                alert('Usuário cadastrado com sucesso!');
            });
        }
    }  	
}
