package com.nosh.demo.service;

import com.nosh.demo.dto.DoctorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DoctorService {
    DoctorDTO createDoctor(DoctorDTO dto);
    List<DoctorDTO> getAllDoctors();
    DoctorDTO getDoctorById(Long id);

    List<DoctorDTO> searchByName(String name);
    List<DoctorDTO> searchBySpecialization(String specialization);

    Page<DoctorDTO> getPageDoctors(Pageable pageable);

    Page<DoctorDTO> getPagedDoctors(Pageable pageable);
}
