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

    public DoseCalcResponseDTO calculateDosage(DoseCalcRequestDTO request) {

        Medicine medicine = medicineRepository.findById(request.getMedicineId())
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        // dosberäkning: dos = vikt * defaultDosePerKg
        double calculatedDose = request.getWeight() * medicine.getDefaultDosePerKg();

        // 3. Se till att dosen inte överstiger medicinens maxdos
        if (medicine.getMaxDose() != null && calculatedDose > medicine.getMaxDose()) {
            calculatedDose = medicine.getMaxDose();
        }

        return DoseCalcResponseDTO.builder()
                .medicineName(medicine.getName())
                .calculatedDose(calculatedDose)
                .unit(medicine.getUnit())
                .build();
    }

}
