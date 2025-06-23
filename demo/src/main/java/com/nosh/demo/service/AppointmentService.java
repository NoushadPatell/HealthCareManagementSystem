package com.nosh.demo.service;

import com.nosh.demo.dto.AppointmentDTO;

import java.util.List;

public interface AppointmentService {
    AppointmentDTO create(AppointmentDTO dto);
    List<AppointmentDTO> geteAll();
    AppointmentDTO getById(Long id);
}
