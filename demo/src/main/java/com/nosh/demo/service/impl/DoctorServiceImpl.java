package com.nosh.demo.service.impl;

import com.nosh.demo.dto.DoctorDTO;
import com.nosh.demo.entity.Doctor;
import com.nosh.demo.repository.DoctorRepository;
import com.nosh.demo.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;

    @Override
    public DoctorDTO createDoctor(DoctorDTO dto) {
        Doctor doctor = mapToEntity(dto);
        doctorRepository.save(doctor);
        return mapToDTO(doctor);
    }

    @Override
    public List<DoctorDTO> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DoctorDTO getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with the id you provided !"));
        return mapToDTO(doctor);
    }

    @Override
    public List<DoctorDTO> searchByName(String name) {
        return doctorRepository.findByFullNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DoctorDTO> searchBySpecialization(String specialization) {
        return doctorRepository.findBySpecializationContainingIgnoreCase(specialization)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<DoctorDTO> getPageDoctors(Pageable pageable) {
        return doctorRepository.findAll(pageable)
                .map(this::mapToDTO);
    }

    @Override
    public Page<DoctorDTO> getPagedDoctors(Pageable pageable) {
        return doctorRepository.findAll(pageable)
                .map(this::mapToDTO);
    }

    private Doctor mapToEntity(DoctorDTO dto) {
        return Doctor.builder()
                .id(dto.getId())
                .fullName(dto.getFullName())
                .contactNumber(dto.getContactNumber())
                .specialization(dto.getSpecialization())
                .department(dto.getDepartment())
                .build();
    }

    private DoctorDTO mapToDTO(Doctor doctor) {
        return DoctorDTO.builder()
                .id(doctor.getId())
                .fullName(doctor.getFullName())
                .contactNumber(doctor.getContactNumber())
                .specialization(doctor.getSpecialization())
                .department(doctor.getDepartment())
                .build();
    }
}
