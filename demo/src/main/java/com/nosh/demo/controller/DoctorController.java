package com.nosh.demo.controller;

import com.nosh.demo.dto.DoctorDTO;
import com.nosh.demo.service.impl.DoctorServiceImpl;
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

@RestController @RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorServiceImpl doctorService;

    @PostMapping
    public ResponseEntity<DoctorDTO> create(@Valid @RequestBody DoctorDTO dto) {
        return ResponseEntity.ok(doctorService.createDoctor(dto));
    }

    @GetMapping
    public ResponseEntity<List<DoctorDTO>> getAll() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<DoctorDTO>> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String specialization
    ) {
        if(name != null) {
            return ResponseEntity.ok(doctorService.searchByName(name));
        } else if(specialization != null) {
            return ResponseEntity.ok(doctorService.searchBySpecialization(specialization));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<DoctorDTO>> getPageDoctors(
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
        return ResponseEntity.ok(doctorService.getPagedDoctors(pageable));
    }

}
