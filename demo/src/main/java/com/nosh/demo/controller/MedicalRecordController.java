package com.nosh.demo.controller;

import com.nosh.demo.dto.MedicalRecordDTO;
import com.nosh.demo.entity.MedicalRecord;
import com.nosh.demo.service.MedicalRecordService;
import com.nosh.demo.service.impl.MedicalRecordServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController @RequestMapping("/api/medical-records")
public class MedicalRecordController {
    private final MedicalRecordService service;

    @PostMapping
    public ResponseEntity<MedicalRecordDTO> create(@Valid @RequestBody MedicalRecordDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<MedicalRecordDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecordDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }
}
