package com.employeemanagement.EmployeeManagement.repository;

import com.employeemanagement.EmployeeManagement.model.Salary;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface SalaryRepository extends JpaRepository<Salary, Long> {
    Optional<Salary> findByEmployee_Id(Long employeeId);
}
