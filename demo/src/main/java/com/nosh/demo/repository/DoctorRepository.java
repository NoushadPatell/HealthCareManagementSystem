package com.nosh.demo.repository;

import com.nosh.demo.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByFullNameContainingIgnoreCase(String name);
    List<Doctor> findBySpecializationContainingIgnoreCase(String specialization);
}
