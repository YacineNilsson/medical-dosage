package com.examensarbete.doseringsapp.DoseCalc;

import lombok.Data;

@Data
public class DoseCalcRequestDTO {

    private Long medicineId; // används om useCustomValues = false
    private boolean useCustomValues;

    private double weight;     // alltid med
    private double height;     // används bara för BSA
    private String calculationMethod; // "weight" eller "bsa"

    // Används om useCustomValues = true
    private String medicineName;
    private String unit;
    private Double defaultDosePerKgPerDay;
    private Double defaultDosePerM2PerDay;
    private Double maxDose;


}
