package com.examensarbete.doseringsapp.DoseCalc;

import com.examensarbete.doseringsapp.Medicines.Medicine;
import com.examensarbete.doseringsapp.Medicines.MedicineRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


@Service
public class DoseCalcService {

    private final ModelMapper modelMapper;
    private final MedicineRepository medicineRepository;

    public DoseCalcService(ModelMapper modelMapper, MedicineRepository medicineRepository) {
        this.modelMapper = modelMapper;
        this.medicineRepository = medicineRepository;
    }

    public DoseCalcResponseDTO calculateDose(DoseCalcRequestDTO request) {
        String name;
        String unit;
        double dosePerKg = 0;
        double dosePerM2 = 0;
        Double maxDose = null;

        if (request.isUseCustomValues()) {
            name = request.getMedicineName();
            unit = request.getUnit();
            dosePerKg = request.getNormalDosePerKgPerDay() != null ? request.getNormalDosePerKgPerDay() : 0;
            dosePerM2 = request.getNormalDosePerM2PerDay() != null ? request.getNormalDosePerM2PerDay() : 0;
            maxDose = request.getMaxDose();
        } else {
            Medicine medicine = medicineRepository.findById(request.getMedicineId())
                    .orElseThrow(() -> new RuntimeException("Medicine not found"));

            name = medicine.getName();
            unit = medicine.getUnit();
            dosePerKg = medicine.getDefaultDosePerKgPerDay();
            dosePerM2 = medicine.getNormalDosePerM2PerDay();
            maxDose = medicine.getMaxDose();
        }

        double calculatedDose;

        switch (request.getCalculationMethod().toLowerCase()) {
            case "weight":
                calculatedDose = request.getWeight() * dosePerKg;
                break;
            case "bsa":
                double bsa = Math.sqrt((request.getWeight() * request.getHeight()) / 3600);
                calculatedDose = bsa * dosePerM2;
                break;
            default:
                throw new IllegalArgumentException("Invalid calculation method: " + request.getCalculationMethod());
        }

        if (maxDose != null && calculatedDose > maxDose) {
            calculatedDose = maxDose;
        }

        return DoseCalcResponseDTO.builder()
                .medicineName(name)
                .calculatedDose(calculatedDose)
                .unit(unit)
                .build();
    }

}
