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
var CustomersComponent = (function () {
    function CustomersComponent(customerService, router) {
        this.customerService = customerService;
        this.router = router;
    }
    CustomersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerService.getCustomers().subscribe(function (customers) {
            _this.customers = customers;
        });
    };
    CustomersComponent.prototype.onDeleteClick = function (id) {
        var _this = this;
        this.customerService.deleteCustomer(id).subscribe(function (customer) {
            _this.router.navigate(['/']);
        });
    };
    return CustomersComponent;
}());
CustomersComponent = __decorate([
    Component({
        selector: 'app-customers',
        templateUrl: './customers.component.html',
        styleUrls: ['./customers.component.css']
    }),
    __metadata("design:paramtypes", [CustomerService, Router])
], CustomersComponent);
export { CustomersComponent };
//# sourceMappingURL=../../../../../src/app/components/customers/customers.component.js.map