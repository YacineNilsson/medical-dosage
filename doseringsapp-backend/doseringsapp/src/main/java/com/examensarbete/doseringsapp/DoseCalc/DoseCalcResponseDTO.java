package com.examensarbete.doseringsapp.DoseCalc;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoseCalcResponseDTO {
    private String medicineName;
    private Double calculatedDose;
    private String unit;
}
