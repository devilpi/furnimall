import {Component} from "@angular/core";
@Component({
    selector: 'key-up1',
    template: `
        <input #box (keyup.enter)="values = box.value">
        <p>{{values}}</p>
    `
})

export class KeyUpComponent_v1 {
    values = '';

}
