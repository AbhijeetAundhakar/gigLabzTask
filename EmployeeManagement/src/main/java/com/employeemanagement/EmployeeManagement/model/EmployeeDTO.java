package com.employeemanagement.EmployeeManagement.model;

public class EmployeeDTO {
    private Long id;
    private String name;
    private String designation;
    private double basicSalary;
    private Role role;
    private String username;
    private double grossSalary;
    private double taxDeduction;
    private double netSalary;

    public EmployeeDTO(Employee employee) {
        this.id = employee.getId();
        this.name = employee.getName();
        this.designation = employee.getDesignation();
        this.basicSalary = employee.getBasicSalary();
        this.role = employee.getRole();
        this.username = employee.getUser().getUsername();

        if (employee.getSalary() != null) {
            this.grossSalary = employee.getSalary().getGrossSalary();
            this.taxDeduction = employee.getSalary().getTaxDeduction();
            this.netSalary = employee.getSalary().getNetSalary();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public double getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(double basicSalary) {
        this.basicSalary = basicSalary;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
