package com.nosh.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data @AllArgsConstructor @RequiredArgsConstructor @Builder
@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    private String specialization;

    private String contactNumber;

    private String department;

    @ManyToMany(mappedBy = "doctors")
    private List<MedicalRecord> medicalRecords;
}
