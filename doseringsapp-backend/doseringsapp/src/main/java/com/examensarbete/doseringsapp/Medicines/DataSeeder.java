package com.examensarbete.doseringsapp.Medicines;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final MedicineRepository medicineRepository;

    public DataSeeder(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public void run(String... args) {
        if (medicineRepository.count() == 0) {
            medicineRepository.save(Medicine.builder()
                    .name("Amoxicillin")
                    .type("Antibiotic")
                    .form("Tablet")
                    .unit("mg")
                    .defaultDosePerKg(20.0)
                    .maxDose(500.0)
                    .description("Used for bacterial infections.")
                    .build());

            medicineRepository.save(Medicine.builder()
                    .name("Cefotaxime")
                    .type("Antibiotic")
                    .form("Injection")
                    .unit("mg")
                    .defaultDosePerKg(50.0)
                    .maxDose(2000.0)
                    .description("Used for serious bacterial infections.")
                    .build());
            
        }
    }
}
