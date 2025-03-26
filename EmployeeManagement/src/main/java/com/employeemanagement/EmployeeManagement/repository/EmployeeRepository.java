package com.employeemanagement.EmployeeManagement.repository;

import com.employeemanagement.EmployeeManagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findByUser_Username(String username);
}