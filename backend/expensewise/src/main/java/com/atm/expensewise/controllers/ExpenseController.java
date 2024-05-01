package com.atm.expensewise.controllers;

import com.atm.expensewise.dao.ExpenseRepo;
import com.atm.expensewise.models.Expense;
import com.atm.expensewise.models.Income;
import com.fasterxml.jackson.databind.util.JSONPObject;
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

@RestController
public class ExpenseController {
    @Autowired
    ExpenseRepo expenseRepo;

    @PostMapping("/expense")
    public ResponseEntity<String> addIncome(@Valid @RequestBody Expense expense){
        expenseRepo.save(expense);
        return ResponseEntity.ok("expense added");
    }

    @GetMapping("/expense")
    public List<Expense> getExpenses(){
        return expenseRepo.findAll();
    }

    @DeleteMapping("/expense/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable String id){
        expenseRepo.deleteById(id);
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
