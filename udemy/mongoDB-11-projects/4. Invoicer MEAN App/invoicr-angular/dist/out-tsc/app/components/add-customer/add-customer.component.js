var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
var AddCustomerComponent = (function () {
    function AddCustomerComponent(customerService, router) {
        this.customerService = customerService;
        this.router = router;
    }
    AddCustomerComponent.prototype.ngOnInit = function () {
    };
    AddCustomerComponent.prototype.onAddSubmit = function () {
        var _this = this;
        var customer = {
            first_name: this.first_name,
            last_name: this.last_name,
            company: this.company,
            email: this.email,
            phone: this.phone,
            address: {
                street: this.street,
                city: this.city,
                state: this.state,
                zip: this.zip
            }
        };
        this.customerService.saveCustomer(customer).subscribe(function (customer) {
            _this.router.navigate(['/']);
        });
    };
    return AddCustomerComponent;
}());
AddCustomerComponent = __decorate([
    Component({
        selector: 'app-add-customer',
        templateUrl: './add-customer.component.html',
        styleUrls: ['./add-customer.component.css']
    }),
    __metadata("design:paramtypes", [CustomerService, Router])
], AddCustomerComponent);
export { AddCustomerComponent };
//# sourceMappingURL=../../../../../src/app/components/add-customer/add-customer.component.js.map