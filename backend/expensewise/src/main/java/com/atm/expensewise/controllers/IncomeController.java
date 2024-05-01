package com.atm.expensewise.controllers;

import com.atm.expensewise.dao.IncomeRepo;
import com.atm.expensewise.models.Income;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class IncomeController {

    @Autowired
    IncomeRepo incomeRepo;

    @PostMapping("/income")
    public ResponseEntity<String> addIncome(@Valid @RequestBody Income income){
        incomeRepo.save(income);
        return ResponseEntity.ok("income added");
    }

    @GetMapping("/income")
    public List<Income> getIncomes(){
        return incomeRepo.findAll();
    }

    @GetMapping("/income/{id}")
    public Optional<Income> getIncome(@PathVariable String id){
        return incomeRepo.findById(id);
    }

    @DeleteMapping("/income/{id}")
    public ResponseEntity<String> deleteIncome(@PathVariable String id){
        incomeRepo.deleteById(id);
        return ResponseEntity.ok("deleted");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
