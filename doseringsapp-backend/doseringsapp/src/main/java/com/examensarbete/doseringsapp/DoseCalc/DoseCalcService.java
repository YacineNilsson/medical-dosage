package com.examensarbete.doseringsapp.DoseCalc;

import com.examensarbete.doseringsapp.Medicines.Medicine;
import com.examensarbete.doseringsapp.Medicines.MedicineRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;


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
        Double dosePerKg = null;
        Double dosePerM2 = null;
        Double maxDose = null;
        String calculationMethod;

        // Hämta värden från request eller databas beroende på flagga
        if (request.isUseCustomValues()) {
            name = request.getMedicineName();
            unit = request.getUnit();
            dosePerKg = request.getDefaultDosePerKgPerDay();
            dosePerM2 = request.getDefaultDosePerM2PerDay();
            maxDose = request.getMaxDose();
            calculationMethod = request.getCalculationMethod();
        } else {
            Medicine medicine = medicineRepository.findById(request.getMedicineId())
                    .orElseThrow(() -> new RuntimeException("Medicine not found"));

            name = medicine.getName();
            unit = medicine.getUnit();
            dosePerKg = medicine.getDefaultDosePerKgPerDay();
            dosePerM2 = medicine.getDefaultDosePerM2PerDay();
            maxDose = medicine.getMaxDose();
            calculationMethod = medicine.getCalculationMethod().name().toLowerCase();
        }

        double calculatedDose;

        /*
         * Beräkningslogik baseras på valt metod (calculationMethod):
         *
         * - Om "weight":
         *     - Endast dosePerKg används.
         *     - dosePerM2 och height ignoreras.
         *
         * - Om "bsa":
         *     - Endast dosePerM2 och height används.
         *     - dosePerKg ignoreras.
         *
         * Detta förhindrar att null-värden används felaktigt vid beräkning.
         * Kontroll finns för att säkerställa att nödvändiga värden finns baserat på metod.
         */

        switch (calculationMethod.toLowerCase()) {
            case "weight":
                if (dosePerKg == null) {
                    throw new IllegalArgumentException("Dose per kg is required for weight-based calculation.");
                }
                calculatedDose = request.getWeight() * dosePerKg;
                break;

            case "bsa":
                if (dosePerM2 == null) {
                    throw new IllegalArgumentException("Dose per m2 is required for BSA-based calculation.");
                }
                double bsa = Math.sqrt((request.getWeight() * request.getHeight()) / 3600);
                calculatedDose = bsa * dosePerM2;
                break;

            default:
                throw new IllegalArgumentException("Invalid calculation method: " + calculationMethod);
        }

        // Tillämpa maxdos om satt
        if (maxDose != null && calculatedDose > maxDose) {
            calculatedDose = maxDose;
        }

        BigDecimal roundedDose = BigDecimal.valueOf(calculatedDose)
                .setScale(2, RoundingMode.HALF_UP);
        calculatedDose = roundedDose.doubleValue();

        return DoseCalcResponseDTO.builder()
                .medicineName(name)
                .calculatedDose(calculatedDose)
                .unit(unit)
                .build();
    }

}
