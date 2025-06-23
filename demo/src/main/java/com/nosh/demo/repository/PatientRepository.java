package com.nosh.demo.repository;

import com.nosh.demo.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    boolean existsByEmail(String email);

    List<Patient> findByFullNameContainingIgnoreCase(String name);

    List<Patient> findByEmailContainingIgnoreCase(String email);
}
