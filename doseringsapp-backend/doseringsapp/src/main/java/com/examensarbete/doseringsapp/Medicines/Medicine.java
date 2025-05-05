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
@Table(name = "medicine")
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

    private Double defaultDosePerKgPerDay; // Standarddos per kg kroppsvikt per dag (kan vara 10 mg/kg/dag)
    private Double lowDosePerKgPerDay; // Lägstados per kg kroppsvikt (kan vara 10 mg/kg)
    private Double highDosePerKgPerDay; // Högstados per kg kroppsvikt (kan vara 10 mg/kg)

    private Double normalDosePerM2PerDay; // Standarddos per m2 kroppsyta (kan vara 10 mg/m2)
    private Double lowDosePerM2PerDay; // Lägstados per m2 kroppsyta (kan vara 10 mg/m2)
    private Double highDosePerM2PerDay; // Högstados per m2 kroppsyta (kan vara 10 mg/m2)

    private Double maxDose; // Maximal dos (kan vara 500 mg)

    // Ev. metadata
    private String description;
}
