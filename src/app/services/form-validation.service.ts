import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  validateImageSelection(selection: number[], correctAnswer: number[]): boolean {
    if (!selection || selection.length === 0) return false;
    if (selection.length !== correctAnswer.length) return false;
    
    const sortedSelection = [...selection].sort((a, b) => a - b);
    const sortedCorrect = [...correctAnswer].sort((a, b) => a - b);
    
    return sortedSelection.every((val, idx) => val === sortedCorrect[idx]);
  }

  validateMathAnswer(userAnswer: number, correctAnswer: number): boolean {
    return Number(userAnswer) === Number(correctAnswer);
  }

  validateTextInput(input: string, expectedText: string): boolean {
    return input.trim().toUpperCase() === expectedText.toUpperCase();
  }

  // Custom validator for image selection
  imageSelectionValidator(minSelections: number = 1): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value || !Array.isArray(value) || value.length < minSelections) {
        return { minSelections: { required: minSelections, actual: value?.length || 0 } };
      }
      return null;
    };
  }

  // Custom validator for math answers
  mathAnswerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '') {
        return { required: true };
      }
      if (isNaN(Number(value))) {
        return { notANumber: true };
      }
      return null;
    };
  }

  // Custom validator for text input
  textInputValidator(minLength: number = 1): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value || value.trim().length < minLength) {
        return { minLength: { required: minLength, actual: value?.trim().length || 0 } };
      }
      return null;
    };
  }

  getErrorMessage(errorType: string, errorValue?: any): string {
    const errorMessages: { [key: string]: string } = {
      required: 'This field is required',
      minSelections: `Please select at least ${errorValue?.required || 1} image(s)`,
      notANumber: 'Please enter a valid number',
      minLength: `Please enter at least ${errorValue?.required || 1} character(s)`,
      imageSelection: 'Please select at least one image',
      mathAnswer: 'Please enter a valid answer',
      textInput: 'Please enter the text shown'
    };

    return errorMessages[errorType] || 'Invalid input';
  }

  isFormValid(value: any, challengeType: string): boolean {
    switch (challengeType) {
      case 'image_selection':
        return Array.isArray(value) && value.length > 0;
      case 'math':
        return value !== null && value !== undefined && !isNaN(Number(value));
      case 'text_input':
        return typeof value === 'string' && value.trim().length > 0;
      default:
        return false;
    }
  }
}
