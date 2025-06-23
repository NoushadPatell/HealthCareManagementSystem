package com.nosh.demo.service.impl;

import com.nosh.demo.dto.MedicalRecordDTO;
import com.nosh.demo.entity.Doctor;
import com.nosh.demo.entity.MedicalRecord;
import com.nosh.demo.entity.Patient;
import com.nosh.demo.repository.DoctorRepository;
import com.nosh.demo.repository.MedicalRecordRepository;
import com.nosh.demo.repository.PatientRepository;
import com.nosh.demo.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {
    private final MedicalRecordRepository medicalRecordRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Override
    public MedicalRecordDTO create(MedicalRecordDTO dto) {
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found with provided id !"));

        List<Long> doctorIds = dto.getDoctorsId();
        if (doctorIds == null || doctorIds.isEmpty()) {
            throw new IllegalArgumentException("Doctor IDs must be provided.");
        }
        List<Doctor> doctors = doctorRepository.findAllById(doctorIds);


        MedicalRecord record = MedicalRecord.builder()
                .recordDate(dto.getRecordDate())
                .diagnosis(dto.getDiagnosis())
                .treatment(dto.getTreatment())
                .patient(patient)
                .doctors(doctors)
                .build();
        record = medicalRecordRepository.save(record);
        return mapToDTO(record);
    }

    @Override
    public List<MedicalRecordDTO> getAll() {
        return medicalRecordRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MedicalRecordDTO getById(Long id) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No record found !"));
        return mapToDTO(record);
    }

    private MedicalRecordDTO mapToDTO(MedicalRecord record) {
        return MedicalRecordDTO.builder()
                .id(record.getId())
                .diagnosis(record.getDiagnosis())
                .recordDate(record.getRecordDate())
                .treatment(record.getTreatment())
                .patientId(record.getPatient().getId())
                .doctorsId(record.getDoctors().stream().map(Doctor::getId).collect(Collectors.toList()))
                .build();
    }
}
