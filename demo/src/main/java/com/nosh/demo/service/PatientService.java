package com.nosh.demo.service;

import com.nosh.demo.dto.PatientDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PatientService {
    PatientDTO createPatient(PatientDTO dto);
    List<PatientDTO> getAllPatients();
    PatientDTO getPatientById(Long id);

    List<PatientDTO> searchByName(String name);
    List<PatientDTO> searchByEmail(String email);

    Page<PatientDTO> getPagedPatients(Pageable pageable);
}
