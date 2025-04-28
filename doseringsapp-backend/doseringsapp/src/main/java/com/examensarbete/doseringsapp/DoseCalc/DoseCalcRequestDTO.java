package com.examensarbete.doseringsapp.DoseCalc;

import lombok.Data;

@Data
public class DoseCalcRequestDTO {

    private Long medicineId;
    private Double weight;
    private Double height;
    private Double ageYears;
    private Double ageMonths;
    private Double ageDays;
    private String sex;


}
