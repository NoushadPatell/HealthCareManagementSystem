package com.nosh.demo.service.impl;

import com.nosh.demo.dto.AppointmentDTO;
import com.nosh.demo.entity.Appointment;
import com.nosh.demo.entity.Doctor;
import com.nosh.demo.entity.Patient;
import com.nosh.demo.repository.AppointmentRepository;
import com.nosh.demo.repository.DoctorRepository;
import com.nosh.demo.repository.PatientRepository;
import com.nosh.demo.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Override
    public AppointmentDTO create(AppointmentDTO dto) {
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found with id you provided for appointment !"));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found with id provided for appointment !"));

        Appointment appointment = Appointment.builder()
                .appointmentDateTime(dto.getAppointmentDateTime())
                .reason(dto.getReason())
                .patient(patient)
                .doctor(doctor)
                .build();

        return mapToDTO(appointmentRepository.save(appointment));
    }

    @Override
    public List<AppointmentDTO> geteAll() {
        return appointmentRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AppointmentDTO getById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("There's no appointed with provided id"));

        return mapToDTO(appointment);
    }

    private AppointmentDTO mapToDTO(Appointment appointment) {
        return AppointmentDTO.builder()
                .id(appointment.getId())
                .appointmentDateTime(appointment.getAppointmentDateTime())
                .reason(appointment.getReason())
                .patientId(appointment.getPatient().getId())
                .doctorId(appointment.getDoctor().getId())
                .build();
    }
}
