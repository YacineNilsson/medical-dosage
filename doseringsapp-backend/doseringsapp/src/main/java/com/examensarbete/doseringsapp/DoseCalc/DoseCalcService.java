package com.examensarbete.doseringsapp.DoseCalc;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class DoseCalcService {

    private final ModelMapper modelMapper;

    public DoseCalcService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public DoseCalcRequestDTO calculateDosage(DoseCalcRequestDTO request) {
        // Here you would implement the actual dosage calculation logic
        // For now, we'll just return the request object as a placeholder
        return modelMapper.map(request, DoseCalcRequestDTO.class);
    }

}
