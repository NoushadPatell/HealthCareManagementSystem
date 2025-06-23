package com.nosh.demo.service.impl;

import com.nosh.demo.dto.AddressDTO;
import com.nosh.demo.dto.DoctorDTO;
import com.nosh.demo.dto.MedicalRecordDTO;
import com.nosh.demo.dto.PatientDTO;
import com.nosh.demo.entity.Address;
import com.nosh.demo.entity.Doctor;
import com.nosh.demo.entity.MedicalRecord;
import com.nosh.demo.entity.Patient;
import com.nosh.demo.repository.DoctorRepository;
import com.nosh.demo.repository.MedicalRecordRepository;
import com.nosh.demo.repository.PatientRepository;
import com.nosh.demo.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final MedicalRecordRepository medicalRecordRepository;

    @Override
    public PatientDTO createPatient(PatientDTO dto) {
        Patient patient = mapToEntity(dto);
        patientRepository.save(patient);
        return mapToDTO(patient);
    }

    @Override
    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PatientDTO getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found !"));
        return mapToDTO(patient);
    }

    @Override
    public List<PatientDTO> searchByName(String name) {
        return patientRepository.findByFullNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<PatientDTO> searchByEmail(String email) {
        return patientRepository.findByEmailContainingIgnoreCase(email)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Page<PatientDTO> getPagedPatients(Pageable pageable) {
        return patientRepository.findAll(pageable)
                .map(this::mapToDTO);
    }


    private Patient mapToEntity(PatientDTO dto) {
        Address address = Address.builder()
                .street(dto.getAddress().getStreet())
                .city(dto.getAddress().getCity())
                .state(dto.getAddress().getState())
                .zipCode(dto.getAddress().getZipCode())
                .build();

        return Patient.builder()
                .id(dto.getId())
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .age(dto.getAge())
                .contactNumber(dto.getContactNumber())
                .gender(dto.getGender())
                .address(address)
                .build();
    }

    private PatientDTO mapToDTO(Patient patient) {
        List<MedicalRecordDTO> medicalRecords = medicalRecordRepository.findByPatientId(patient.getId())
                .stream()
                .map(this::mapToMedicalRecordDTO)
                .collect(Collectors.toList());

        return PatientDTO.builder()
                .id(patient.getId())
                .fullName(patient.getFullName())
                .email(patient.getEmail())
                .contactNumber(patient.getContactNumber())
                .age(patient.getAge())
                .gender(patient.getGender())
                .address(AddressDTO.builder()
                        .state(patient.getAddress().getState())
                        .city(patient.getAddress().getCity())
                        .street(patient.getAddress().getStreet())
                        .zipCode(patient.getAddress().getZipCode())
                        .build())
                .medicalRecords(medicalRecords)
                .build();

    }

    private MedicalRecordDTO mapToMedicalRecordDTO(MedicalRecord record) {

        List<DoctorDTO> doctors = record.getDoctors().stream()
                .map(doctor -> DoctorDTO.builder()
                        .fullName(doctor.getFullName())
                        .specialization(doctor.getSpecialization())
                        .contactNumber(doctor.getContactNumber())
                        .build())
                .collect(Collectors.toList());

        return MedicalRecordDTO.builder()
                .id(record.getId())
                .diagnosis(record.getDiagnosis())
                .treatment(record.getTreatment())
                .recordDate(record.getRecordDate())
//                .doctorsId(record.getDoctors().stream().map(d -> d.getId()).collect(Collectors.toList()))
                .doctors(doctors)
                .build();
    }

    private DoctorDTO mapToDoctorRecordDTO(Doctor doctor) {
        return DoctorDTO.builder()
                .fullName(doctor.getFullName())
                .specialization(doctor.getSpecialization())
                .contactNumber(doctor.getContactNumber())
                .build();
    }
}
