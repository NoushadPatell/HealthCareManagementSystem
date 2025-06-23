package com.nosh.demo.controller;

import com.nosh.demo.dto.PatientDTO;
import com.nosh.demo.service.impl.PatientServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@RestController @RequestMapping("/api/patients")
public class PatientController {
    private final PatientServiceImpl patientService;

    @PostMapping
    public ResponseEntity<PatientDTO> create(@Valid @RequestBody PatientDTO dto) {
        return ResponseEntity.ok(patientService.createPatient(dto));
    }

    @GetMapping
    public ResponseEntity<List<PatientDTO>> getAll() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<PatientDTO>> getPagedPatients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id,asc") String[] sort
    ) {
        Sort sortOrder = Sort.by(
                Arrays.stream(sort)
                        .map(s -> {
                            String[] parts = s.split(",");
                            String field = parts[0];
                            Sort.Direction direction = parts.length > 1
                                    ? Sort.Direction.fromString(parts[1])
                                    : Sort.Direction.ASC;
                            return new Sort.Order(direction, field);
                        })
                        .toList()
        );

        Pageable pageable = PageRequest.of(page, size, sortOrder);
        return ResponseEntity.ok(patientService.getPagedPatients(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO> getPatient(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<PatientDTO>> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email
    ) {
        if(name != null) {
            return ResponseEntity.ok(patientService.searchByName(name));
        } else if(email != null) {
            return ResponseEntity.ok(patientService.searchByEmail(email));
        }
        return ResponseEntity.badRequest().build();
    }
}
