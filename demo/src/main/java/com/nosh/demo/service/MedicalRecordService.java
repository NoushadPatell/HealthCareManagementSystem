package com.nosh.demo.service;

import com.nosh.demo.dto.MedicalRecordDTO;

import java.util.List;

public interface MedicalRecordService {
    MedicalRecordDTO create(MedicalRecordDTO dto);
    List<MedicalRecordDTO> getAll();
    MedicalRecordDTO getById(Long id);
}
