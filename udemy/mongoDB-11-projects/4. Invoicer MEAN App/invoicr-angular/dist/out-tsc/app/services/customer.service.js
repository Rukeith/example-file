var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
var CustomerService = (function () {
    function CustomerService(http) {
        this.http = http;
    }
    CustomerService.prototype.getCustomers = function () {
        return this.http.get('http://localhost:3000/api/customers')
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.getCustomer = function (id) {
        return this.http.get('http://localhost:3000/api/customers/' + id)
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.saveCustomer = function (customer) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/customers', customer, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.updateCustomer = function (id, customer) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3000/api/customers/' + id, customer, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.deleteCustomer = function (id) {
        return this.http.delete('http://localhost:3000/api/customers/' + id)
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.getInvoices = function (customer_id) {
        return this.http.get('http://localhost:3000/api/invoices/customer/' + customer_id)
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.markPaid = function (id, invoice) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3000/api/invoices/' + id, invoice, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    CustomerService.prototype.deleteInvoice = function (id) {
        return this.http.delete('http://localhost:3000/api/invoices/' + id)
            .map(function (res) { return res.json(); });
    };
    return CustomerService;
}());
CustomerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], CustomerService);
export { CustomerService };
//# sourceMappingURL=../../../../src/app/services/customer.service.js.map