package com.examensarbete.doseringsapp.DoseCalc;

import lombok.Data;

@Data
public class DoseCalcRequestDTO {

    Long medicineId;
    Double weight;
    Double height;
    Double ageYears;
    Double ageMonths;
    Double ageDays;
    String sex;


}
