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
import { Router, ActivatedRoute } from '@angular/router';
var EditCustomerComponent = (function () {
    function EditCustomerComponent(customerService, router, route) {
        this.customerService = customerService;
        this.router = router;
        this.route = route;
    }
    EditCustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.params['id'];
        this.customerService.getCustomer(this.id).subscribe(function (customer) {
            _this.first_name = customer.first_name;
            _this.last_name = customer.last_name;
            _this.company = customer.company;
            _this.email = customer.email;
            _this.phone = customer.phone;
            _this.street = customer.address.street;
            _this.city = customer.address.city;
            _this.state = customer.address.state;
            _this.zip = customer.address.zip;
        });
    };
    EditCustomerComponent.prototype.onEditSubmit = function () {
        var _this = this;
        var customer = {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            phone: this.phone,
            address: {
                street: this.street,
                city: this.city,
                state: this.state,
                zip: this.zip
            }
        };
        this.customerService.updateCustomer(this.id, customer).subscribe(function (customer) {
            _this.router.navigate(['/']);
        });
    };
    return EditCustomerComponent;
}());
EditCustomerComponent = __decorate([
    Component({
        selector: 'app-edit-customer',
        templateUrl: './edit-customer.component.html',
        styleUrls: ['./edit-customer.component.css']
    }),
    __metadata("design:paramtypes", [CustomerService, Router, ActivatedRoute])
], EditCustomerComponent);
export { EditCustomerComponent };
//# sourceMappingURL=../../../../../src/app/components/edit-customer/edit-customer.component.js.map