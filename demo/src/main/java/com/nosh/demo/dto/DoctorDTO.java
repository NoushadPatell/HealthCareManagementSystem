package com.nosh.demo.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor @Builder
public class DoctorDTO {
    private Long id;

    private String fullName;

    private String specialization;

    @Size(min = 10, max = 10)
    private String contactNumber;

    private String department;

}
