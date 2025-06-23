package com.nosh.demo.dto;

import com.nosh.demo.entity.Doctor;
import com.nosh.demo.entity.Patient;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class MedicalRecordDTO {
    private Long id;

    private LocalDate recordDate;

    private String diagnosis;

    private String treatment;

    private Long patientId;
    private List<Long> doctorsId;

    private List<DoctorDTO> doctors;

}
