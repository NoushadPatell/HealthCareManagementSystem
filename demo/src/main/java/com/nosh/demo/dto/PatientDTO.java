package com.nosh.demo.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class PatientDTO {
    private Long id;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @Email(message = "Invalid email") @NotBlank(message = "email is required")
    private String email;

    @Size(min = 10, max = 10, message = "Contact must be of 10 digits.")
    private String contactNumber;

    @Min(0) @Max(120)
    private Integer age;

    @NotBlank(message = "gender is required")
    private String gender;

    private AddressDTO address;

    private List<MedicalRecordDTO> medicalRecords;
}
