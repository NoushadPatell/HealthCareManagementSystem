package com.nosh.demo.dto;

import com.nosh.demo.entity.Doctor;
import com.nosh.demo.entity.Patient;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class AppointmentDTO {
    private Long id;

    private LocalDateTime appointmentDateTime;

    private String reason;

    private Long patientId;

    private Long doctorId;
}
