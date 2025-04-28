package com.examensarbete.doseringsapp.Medicines;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Medicinens namn, t.ex. "Amoxicillin"
    private String type; // t.ex. "Antibiotic"
    private String form; // t.ex. "Tablet", "Syrup"

    @Enumerated(EnumType.STRING)
    private CalculationMethod calculationMethod;

    private String unit; // Enhet för dosering, t.ex. "mg", "ml"
    private Double defaultDosePerKg; // Standarddos per kg kroppsvikt (kan vara 10 mg/kg)
    private Double maxDose; // Maximal dos (kan vara 500 mg)

    // Ev. metadata
    private String description;
}
