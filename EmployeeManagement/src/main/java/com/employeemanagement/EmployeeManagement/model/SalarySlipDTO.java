package com.employeemanagement.EmployeeManagement.model;

public class SalarySlipDTO {
    private Long employeeId;
    private String name;
    private String designation;
    private double grossSalary;
    private double taxDeduction;
    private double netSalary;

    public SalarySlipDTO(Long employeeId, String name, String designation, double grossSalary, double taxDeduction, double netSalary) {
        this.employeeId = employeeId;
        this.name = name;
        this.designation = designation;
        this.grossSalary = grossSalary;
        this.taxDeduction = taxDeduction;
        this.netSalary = netSalary;
    }

    public SalarySlipDTO() {
    }


    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public double getGrossSalary() {
        return grossSalary;
    }

    public void setGrossSalary(double grossSalary) {
        this.grossSalary = grossSalary;
    }

    public double getTaxDeduction() {
        return taxDeduction;
    }

    public void setTaxDeduction(double taxDeduction) {
        this.taxDeduction = taxDeduction;
    }

    public double getNetSalary() {
        return netSalary;
    }

    public void setNetSalary(double netSalary) {
        this.netSalary = netSalary;
    }
}
