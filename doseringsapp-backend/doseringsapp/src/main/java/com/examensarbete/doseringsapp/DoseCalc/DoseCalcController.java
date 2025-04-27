package com.examensarbete.doseringsapp.DoseCalc;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doseCalc")
public class DoseCalcController {

    private final DoseCalcService doseCalcService;

    public DoseCalcController(DoseCalcService doseCalcService) {
        this.doseCalcService = doseCalcService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<DoseCalcRequestDTO> calculateDosage(@RequestBody DoseCalcRequestDTO request) {
        DoseCalcRequestDTO result = doseCalcService.calculateDosage(request);
        return ResponseEntity.ok(result);
    }
}
