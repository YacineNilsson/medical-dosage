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
    public ResponseEntity<DoseCalcResponseDTO> calculateDose(@RequestBody DoseCalcRequestDTO request) {
        DoseCalcResponseDTO result = doseCalcService.calculateDose(request);
        return ResponseEntity.ok(result);
    }


}
