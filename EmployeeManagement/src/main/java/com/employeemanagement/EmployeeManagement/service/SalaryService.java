package com.employeemanagement.EmployeeManagement.service;

import com.employeemanagement.EmployeeManagement.model.Employee;
import com.employeemanagement.EmployeeManagement.model.Salary;
import com.employeemanagement.EmployeeManagement.model.SalarySlipDTO;
import com.employeemanagement.EmployeeManagement.repository.EmployeeRepository;
import com.employeemanagement.EmployeeManagement.repository.SalaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class SalaryService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private SalaryRepository salaryRepository;

    public SalarySlipDTO getSalarySlip(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Salary salary = salaryRepository.findByEmployee_Id(employeeId)
                .orElseThrow(() -> new RuntimeException("Salary details not found"));

        double taxDeduction = salary.getGrossSalary() * 0.10;
        double netSalary = salary.getGrossSalary() - taxDeduction;

        return new SalarySlipDTO(
                employee.getId(),
                employee.getName(),
                employee.getDesignation(),
                salary.getGrossSalary(),
                taxDeduction,
                netSalary
        );
    }
}